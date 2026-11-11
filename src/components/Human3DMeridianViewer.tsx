import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MERIDIANS_3D_DATA, Meridian3D, Acupoint3D } from '../data/meridians3dData';
import {
  RotateCcw,
  Eye,
  Zap,
  Activity,
  Layers,
  Search,
  X,
  Compass,
  Sparkles,
  Maximize2,
  ChevronDown,
  ChevronUp,
  Info,
  Sliders,
  ShieldAlert
} from 'lucide-react';

export const Human3DMeridianViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  // UI Selection States
  const [selectedMeridianId, setSelectedMeridianId] = useState<string>('all');
  const [selectedPoint, setSelectedPoint] = useState<Acupoint3D | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'yin' | 'yang' | 'vessels'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isTranslucent, setIsTranslucent] = useState<boolean>(true);
  const [showPoints, setShowPoints] = useState<boolean>(true);
  const [animateFlow, setAnimateFlow] = useState<boolean>(true);
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);

  // References for Three.js internals
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const bodyMeshGroupRef = useRef<THREE.Group | null>(null);
  const meridiansGroupRef = useRef<THREE.Group | null>(null);
  const pointsGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number>(0);
  const pulseParticlesRef = useRef<{ mesh: THREE.InstancedMesh; count: number; offsets: Float32Array; curves: THREE.CatmullRomCurve3[] }[]>([]);

  // Filtered list of meridians based on category
  const filteredMeridians = useMemo(() => {
    return MERIDIANS_3D_DATA.filter((m) => {
      const matchSearch =
        searchQuery === '' ||
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.vietnameseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.points.some((p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.indications.some((ind) => ind.toLowerCase().includes(searchQuery.toLowerCase()))
        );

      if (!matchSearch) return false;

      if (filterType === 'all') return true;
      if (filterType === 'yin') return m.yinYang === 'Âm' && m.limb !== 'Mạch Kỳ';
      if (filterType === 'yang') return m.yinYang === 'Dương' && m.limb !== 'Mạch Kỳ';
      if (filterType === 'vessels') return m.limb === 'Mạch Kỳ';
      return true;
    });
  }, [filterType, searchQuery]);

  // Camera presets
  const setCameraView = (type: 'front' | 'back' | 'head' | 'torso' | 'arms' | 'legs') => {
    if (!cameraRef.current || !controlsRef.current) return;
    const controls = controlsRef.current;
    const camera = cameraRef.current;

    switch (type) {
      case 'front':
        camera.position.set(0, 0, 3.8);
        controls.target.set(0, 0, 0);
        break;
      case 'back':
        camera.position.set(0, 0, -3.8);
        controls.target.set(0, 0, 0);
        break;
      case 'head':
        camera.position.set(0, 1.5, 1.4);
        controls.target.set(0, 1.5, 0);
        break;
      case 'torso':
        camera.position.set(0, 0.6, 2.0);
        controls.target.set(0, 0.6, 0);
        break;
      case 'arms':
        camera.position.set(1.2, 0.4, 1.8);
        controls.target.set(0.6, 0.4, 0);
        break;
      case 'legs':
        camera.position.set(0, -1.1, 2.2);
        controls.target.set(0, -1.1, 0);
        break;
    }
    controls.update();
  };

  // Helper function to build stylized anatomical human body
  const createProceduralHumanModel = (translucent: boolean) => {
    const group = new THREE.Group();
    group.name = 'humanBodyMannequin';

    // Materials
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e293b, // slate-800
      emissive: 0x0f172a,
      roughness: 0.4,
      metalness: 0.15,
      transparent: translucent,
      opacity: translucent ? 0.35 : 0.95,
      depthWrite: !translucent,
    });

    const jointMaterial = new THREE.MeshStandardMaterial({
      color: 0x334155, // slate-700
      roughness: 0.5,
      metalness: 0.2,
      transparent: translucent,
      opacity: translucent ? 0.45 : 1.0,
    });

    // 1. Head (Cranium + Jaw contour)
    const cranium = new THREE.Mesh(new THREE.SphereGeometry(0.18, 24, 24), bodyMaterial);
    cranium.position.set(0, 1.55, 0.02);
    group.add(cranium);

    const face = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.22, 16), bodyMaterial);
    face.position.set(0, 1.42, 0.05);
    face.rotation.x = Math.PI;
    group.add(face);

    // 2. Neck
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.16, 16), bodyMaterial);
    neck.position.set(0, 1.32, 0.0);
    group.add(neck);

    // 3. Torso (Chest + Abdomen + Pelvis)
    // Upper chest & shoulders
    const chest = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.26, 0.42, 20), bodyMaterial);
    chest.position.set(0, 1.05, 0.02);
    group.add(chest);

    // Abdomen / waist tapering
    const abdomen = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.28, 0.48, 20), bodyMaterial);
    abdomen.position.set(0, 0.65, 0.02);
    group.add(abdomen);

    // Pelvis / Hips
    const pelvis = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.24, 0.35, 20), bodyMaterial);
    pelvis.position.set(0, 0.24, 0.0);
    group.add(pelvis);

    // 4. Arms (Left & Right)
    [-1, 1].forEach((side) => {
      // Shoulder joint
      const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), jointMaterial);
      shoulder.position.set(side * 0.44, 1.2, 0.0);
      group.add(shoulder);

      // Upper arm
      const upperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.065, 0.45, 16), bodyMaterial);
      upperArm.position.set(side * 0.56, 0.98, 0.02);
      upperArm.rotation.z = side * -0.22;
      group.add(upperArm);

      // Elbow joint
      const elbow = new THREE.Mesh(new THREE.SphereGeometry(0.065, 16, 16), jointMaterial);
      elbow.position.set(side * 0.67, 0.76, 0.03);
      group.add(elbow);

      // Forearm
      const forearm = new THREE.Mesh(new THREE.CylinderGeometry(0.062, 0.05, 0.46, 16), bodyMaterial);
      forearm.position.set(side * 0.74, 0.48, 0.02);
      forearm.rotation.z = side * -0.15;
      group.add(forearm);

      // Wrist & Hand
      const wrist = new THREE.Mesh(new THREE.SphereGeometry(0.048, 12, 12), jointMaterial);
      wrist.position.set(side * 0.79, 0.22, 0.02);
      group.add(wrist);

      const hand = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.18, 0.09), bodyMaterial);
      hand.position.set(side * 0.83, 0.08, 0.02);
      hand.rotation.z = side * -0.1;
      group.add(hand);
    });

    // 5. Legs (Left & Right)
    [-1, 1].forEach((side) => {
      // Hip joint
      const hip = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), jointMaterial);
      hip.position.set(side * 0.18, 0.08, 0.0);
      group.add(hip);

      // Thigh
      const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.085, 0.75, 18), bodyMaterial);
      thigh.position.set(side * 0.22, -0.35, 0.02);
      thigh.rotation.z = side * -0.05;
      group.add(thigh);

      // Knee joint
      const knee = new THREE.Mesh(new THREE.SphereGeometry(0.085, 16, 16), jointMaterial);
      knee.position.set(side * 0.23, -0.82, 0.04);
      group.add(knee);

      // Calf / Shin
      const calf = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.06, 0.72, 18), bodyMaterial);
      calf.position.set(side * 0.23, -1.24, 0.02);
      group.add(calf);

      // Ankle joint
      const ankle = new THREE.Mesh(new THREE.SphereGeometry(0.06, 14, 14), jointMaterial);
      ankle.position.set(side * 0.23, -1.62, 0.02);
      group.add(ankle);

      // Foot (Heel + Instep + Toes)
      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.08, 0.24), bodyMaterial);
      foot.position.set(side * 0.23, -1.72, 0.07);
      group.add(foot);
    });

    // Contact Ground Shadow
    const shadowGeo = new THREE.PlaneGeometry(2.4, 2.4);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x020617,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -1.78;
    group.add(shadow);

    return group;
  };

  // Re-render meridians & points when selection or filters change
  const buildMeridiansAndPoints = (activeMeridianId: string) => {
    if (!meridiansGroupRef.current || !pointsGroupRef.current) return;

    // Clear previous
    while (meridiansGroupRef.current.children.length > 0) {
      const obj = meridiansGroupRef.current.children[0] as THREE.Mesh;
      obj.geometry?.dispose();
      if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
      else obj.material?.dispose();
      meridiansGroupRef.current.remove(obj);
    }
    while (pointsGroupRef.current.children.length > 0) {
      const obj = pointsGroupRef.current.children[0] as THREE.Mesh;
      obj.geometry?.dispose();
      if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
      else obj.material?.dispose();
      pointsGroupRef.current.remove(obj);
    }

    pulseParticlesRef.current = [];

    const activeList = activeMeridianId === 'all'
      ? filteredMeridians
      : MERIDIANS_3D_DATA.filter((m) => m.id === activeMeridianId);

    activeList.forEach((meridian) => {
      const isSelected = activeMeridianId !== 'all' && activeMeridianId === meridian.id;
      const baseRadius = isSelected ? 0.012 : 0.007;

      // Handle Bilateral (right + left mirrored) or Midline (single)
      const sides = meridian.isBilateral ? [1, -1] : [1];

      sides.forEach((sideSign) => {
        // Build 3D points for CatmullRom spline
        const vPoints = meridian.pathCoords.map(
          (c) => new THREE.Vector3(c[0] * sideSign, c[1], c[2])
        );

        if (vPoints.length >= 2) {
          const curve = new THREE.CatmullRomCurve3(vPoints, false, 'catmullrom', 0.2);
          const tubeGeo = new THREE.TubeGeometry(curve, 64, baseRadius, 8, false);

          const tubeMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color(meridian.color),
            emissive: new THREE.Color(meridian.glowColor),
            emissiveIntensity: isSelected ? 0.9 : 0.45,
            roughness: 0.2,
            metalness: 0.3,
          });

          const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
          tubeMesh.userData = { type: 'meridian', meridianId: meridian.id };
          meridiansGroupRef.current?.add(tubeMesh);

          // Animated energy flow pulses
          const pulseCount = 12;
          const sphereGeo = new THREE.SphereGeometry(baseRadius * 1.6, 8, 8);
          const sphereMat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(meridian.glowColor),
          });
          const instancedMesh = new THREE.InstancedMesh(sphereGeo, sphereMat, pulseCount);
          const offsets = new Float32Array(pulseCount);
          for (let i = 0; i < pulseCount; i++) {
            offsets[i] = i / pulseCount;
          }

          meridiansGroupRef.current?.add(instancedMesh);
          pulseParticlesRef.current.push({
            mesh: instancedMesh,
            count: pulseCount,
            offsets,
            curves: [curve],
          });
        }

        // Build Acupoint Spheres
        if (showPoints) {
          meridian.points.forEach((pt) => {
            const posX = pt.position[0] * sideSign;
            const posY = pt.position[1];
            const posZ = pt.position[2];

            const ptGeo = new THREE.SphereGeometry(0.024, 16, 16);
            const isPointSelected = selectedPoint?.id === pt.id;

            const ptMat = new THREE.MeshStandardMaterial({
              color: isPointSelected ? 0xffffff : new THREE.Color(meridian.glowColor),
              emissive: isPointSelected ? 0xffffff : new THREE.Color(meridian.color),
              emissiveIntensity: isPointSelected ? 1.0 : 0.7,
              roughness: 0.2,
              metalness: 0.4,
            });

            const pointMesh = new THREE.Mesh(ptGeo, ptMat);
            pointMesh.position.set(posX, posY, posZ);
            pointMesh.userData = { type: 'acupoint', point: pt, meridianId: meridian.id };

            // Outer pulse halo ring for selected point or key point
            const haloGeo = new THREE.RingGeometry(0.03, 0.045, 16);
            const haloMat = new THREE.MeshBasicMaterial({
              color: new THREE.Color(meridian.glowColor),
              side: THREE.DoubleSide,
              transparent: true,
              opacity: isPointSelected ? 0.95 : 0.4,
            });
            const halo = new THREE.Mesh(haloGeo, haloMat);
            halo.lookAt(new THREE.Vector3(0, 0, 1));
            pointMesh.add(halo);

            pointsGroupRef.current?.add(pointMesh);
          });
        }
      });
    });
  };

  // Main Three.js Initialization & Lifecycle
  useEffect(() => {
    if (!mountRef.current) return;

    // Detect software WebGL from canvas probe
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = mountRef.current.clientWidth || 800;
    const height = mountRef.current.clientHeight || 620;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a0f1d); // deep medical slate-dark
    scene.fog = new THREE.FogExp2(0x0a0f1d, 0.12);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 0.1, 3.8);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting Rig (3-Point Studio Lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x0f172a, 0.85);
    hemiLight.position.set(0, 5, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 1.3);
    keyLight.position.set(3, 4, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x06b6d4, 0.85);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);

    // 5. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 0.8;
    controls.maxDistance = 6.5;
    controls.target.set(0, 0.0, 0);
    controlsRef.current = controls;

    // 6. Groups
    const bodyGroup = createProceduralHumanModel(isTranslucent);
    bodyMeshGroupRef.current = bodyGroup;
    scene.add(bodyGroup);

    const meridiansGroup = new THREE.Group();
    meridiansGroupRef.current = meridiansGroup;
    scene.add(meridiansGroup);

    const pointsGroup = new THREE.Group();
    pointsGroupRef.current = pointsGroup;
    scene.add(pointsGroup);

    // Initial build
    buildMeridiansAndPoints(selectedMeridianId);

    // 7. Raycasting for Click Selection on Acupoints
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      if (!mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      if (pointsGroupRef.current) {
        const intersects = raycaster.intersectObjects(pointsGroupRef.current.children, true);
        if (intersects.length > 0) {
          let topObj = intersects[0].object;
          while (topObj && !topObj.userData?.point && topObj.parent) {
            topObj = topObj.parent as THREE.Object3D;
          }
          if (topObj && topObj.userData?.point) {
            setSelectedPoint(topObj.userData.point as Acupoint3D);
          }
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    // 8. Resize Handler
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 9. Animation Loop
    const dummy = new THREE.Object3D();
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      if (controlsRef.current) {
        controlsRef.current.autoRotate = autoRotate;
        controlsRef.current.autoRotateSpeed = 1.2;
        controlsRef.current.update();
      }

      // Animate energy pulses along meridians
      if (animateFlow) {
        pulseParticlesRef.current.forEach((pulse) => {
          const { mesh, count, offsets, curves } = pulse;
          const curve = curves[0];
          if (!curve) return;

          for (let i = 0; i < count; i++) {
            offsets[i] = (offsets[i] + delta * 0.18) % 1.0;
            const pt = curve.getPointAt(offsets[i]);
            dummy.position.copy(pt);
            dummy.scale.setScalar(0.9 + Math.sin(elapsedTime * 4 + i) * 0.25);
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
          }
          mesh.instanceMatrix.needsUpdate = true;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      renderer.dispose();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update body translucency
  useEffect(() => {
    if (!sceneRef.current || !bodyMeshGroupRef.current) return;
    sceneRef.current.remove(bodyMeshGroupRef.current);

    const newBody = createProceduralHumanModel(isTranslucent);
    bodyMeshGroupRef.current = newBody;
    sceneRef.current.add(newBody);
  }, [isTranslucent]);

  // Update meridians & points when active filter or selection changes
  useEffect(() => {
    buildMeridiansAndPoints(selectedMeridianId);
  }, [selectedMeridianId, filteredMeridians, showPoints]);

  return (
    <div className="w-full rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-xl overflow-hidden flex flex-col">
      {/* Top Header Bar */}
      <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-cyan-600/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                Mô Hình 3D Kinh Lạc & Huyệt Đạo Cơ Thể Người
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold">
                14 Kinh Lạc Chuẩn
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Xoay 360°, phóng to/thu nhỏ, tương tác trực tiếp trên 14 đường kinh và huyệt đạo giải phẫu 3D.
            </p>
          </div>
        </div>

        {/* Quick Viewport Action Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              autoRotate ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tự Xoay 360°</span>
          </button>

          <button
            type="button"
            onClick={() => setIsTranslucent(!isTranslucent)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              isTranslucent ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isTranslucent ? 'Xuyên Thấu' : 'Đặc Thân'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowPoints(!showPoints)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              showPoints ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Huyệt Đạo</span>
          </button>

          <button
            type="button"
            onClick={() => setAnimateFlow(!animateFlow)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              animateFlow ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Khí Lưu</span>
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Viewport Container */}
      <div className="relative w-full h-[580px] sm:h-[680px] bg-slate-950 overflow-hidden select-none">
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Camera Quick-View Angles Floating Pills (Top Left) */}
        <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-1 max-w-xs sm:max-w-md bg-slate-900/85 p-1.5 rounded-xl border border-slate-800 shadow-md">
          <span className="text-[11px] font-bold text-slate-400 px-2 py-1 flex items-center">
            Góc Nhìn:
          </span>
          <button
            type="button"
            onClick={() => setCameraView('front')}
            className="px-2 py-1 rounded-md text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-all cursor-pointer"
          >
            Trước
          </button>
          <button
            type="button"
            onClick={() => setCameraView('back')}
            className="px-2 py-1 rounded-md text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-all cursor-pointer"
          >
            Sau (Lưng)
          </button>
          <button
            type="button"
            onClick={() => setCameraView('head')}
            className="px-2 py-1 rounded-md text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-all cursor-pointer"
          >
            Đầu Mặt
          </button>
          <button
            type="button"
            onClick={() => setCameraView('torso')}
            className="px-2 py-1 rounded-md text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-all cursor-pointer"
          >
            Ngực Bụng
          </button>
          <button
            type="button"
            onClick={() => setCameraView('arms')}
            className="px-2 py-1 rounded-md text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-all cursor-pointer"
          >
            Tay
          </button>
          <button
            type="button"
            onClick={() => setCameraView('legs')}
            className="px-2 py-1 rounded-md text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-all cursor-pointer"
          >
            Chân
          </button>
        </div>

        {/* Category Filter Pills (Top Right) */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-slate-900/85 p-1 rounded-xl border border-slate-800 shadow-md">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterType === 'all' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tất Cả 14 Kinh
          </button>
          <button
            type="button"
            onClick={() => setFilterType('yang')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterType === 'yang' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            6 Kinh Dương
          </button>
          <button
            type="button"
            onClick={() => setFilterType('yin')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterType === 'yin' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            6 Kinh Âm
          </button>
          <button
            type="button"
            onClick={() => setFilterType('vessels')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterType === 'vessels' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Nhâm - Đốc
          </button>
        </div>

        {/* Selected Acupoint Detail Card (Floating overlay when an acupoint is clicked) */}
        {selectedPoint && (
          <div className="absolute top-16 left-3 sm:left-4 z-30 max-w-sm w-full bg-slate-900/95 border border-cyan-500/50 rounded-2xl p-4 shadow-2xl backdrop-blur-md space-y-3 animate-fade-in text-white">
            <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-2.5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold">
                    {selectedPoint.code}
                  </span>
                  <h4 className="text-base font-extrabold text-white">
                    {selectedPoint.name}
                  </h4>
                  <span className="text-xs text-slate-400 font-serif">
                    {selectedPoint.chineseName}
                  </span>
                </div>
                <div className="text-xs font-semibold text-emerald-400 mt-0.5">
                  {selectedPoint.meridianName}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPoint(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800">
                <span className="font-bold text-amber-300">Đặc tính: </span>
                <span className="text-slate-200">{selectedPoint.specialRole}</span>
              </div>

              <div>
                <span className="font-bold text-cyan-400">Vị trí: </span>
                <span className="text-slate-300">{selectedPoint.location}</span>
              </div>

              <div>
                <span className="font-bold text-cyan-400">Giải phẫu: </span>
                <span className="text-slate-300">{selectedPoint.anatomy}</span>
              </div>

              <div>
                <span className="font-bold text-cyan-400">Tác dụng: </span>
                <span className="text-slate-300">{selectedPoint.actions}</span>
              </div>

              <div>
                <span className="font-bold text-cyan-400">Châm cứu: </span>
                <span className="text-slate-300">{selectedPoint.depth}</span>
              </div>

              <div className="space-y-1 pt-1 border-t border-slate-800">
                <span className="font-bold text-amber-400">Chủ trị lâm sàng:</span>
                <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                  {selectedPoint.indications.map((ind, i) => (
                    <li key={i}>{ind}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Unified Bottom Control Dock (Follows 3D skill layout: zero viewport occlusion) */}
        <div
          className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[96%] max-w-4xl transition-all duration-300 ${
            isDockCollapsed ? 'translate-y-[calc(100%-38px)]' : 'translate-y-0'
          }`}
        >
          <div className="bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl p-3 space-y-2.5 backdrop-blur-md">
            {/* Collapse / Expand Toggle Tab */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span className="font-bold">Danh Sách 14 Kinh Lạc & Điểm Huyệt 3D</span>
                <span className="text-slate-500">
                  ({filteredMeridians.length} Kinh mạch khả dụng)
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsDockCollapsed(!isDockCollapsed)}
                className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 cursor-pointer"
              >
                {isDockCollapsed ? (
                  <>
                    <ChevronUp className="w-3.5 h-3.5" />
                    <span>Mở Bảng Chọn</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3.5 h-3.5" />
                    <span>Thu Gọn</span>
                  </>
                )}
              </button>
            </div>

            {/* Horizontal Meridian Selector Carousel */}
            {!isDockCollapsed && (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMeridianId('all');
                      setSelectedPoint(null);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                      selectedMeridianId === 'all'
                        ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Xem Cùng Lúc 14 Kinh
                  </button>

                  {filteredMeridians.map((m) => {
                    const isSelected = selectedMeridianId === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setSelectedMeridianId(m.id);
                          setSelectedPoint(null);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                          isSelected
                            ? 'ring-2 ring-cyan-400 shadow-md font-bold'
                            : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700'
                        }`}
                        style={{
                          backgroundColor: isSelected ? m.color : undefined,
                          color: isSelected ? '#ffffff' : undefined,
                        }}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: m.color }}
                        />
                        <span>{m.name}</span>
                        <span className="text-[10px] opacity-80">({m.totalPoints} huyệt)</span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Meridian Info Bar */}
                {selectedMeridianId !== 'all' && (
                  (() => {
                    const activeM = MERIDIANS_3D_DATA.find((m) => m.id === selectedMeridianId);
                    if (!activeM) return null;
                    return (
                      <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span
                              className="px-2 py-0.5 rounded text-[11px] font-bold text-white"
                              style={{ backgroundColor: activeM.color }}
                            >
                              {activeM.code}
                            </span>
                            <span className="font-extrabold text-white text-sm">
                              {activeM.name} ({activeM.vietnameseName})
                            </span>
                            <span className="text-slate-400">· Ngũ hành: {activeM.element}</span>
                            <span className="text-cyan-400">· Giờ vượng: {activeM.flowTime}</span>
                          </div>

                          <div className="text-[11px] text-slate-400">
                            Bấm huyệt bên dưới để định vị 3D:
                          </div>
                        </div>

                        {/* List of Acupoints on this meridian for quick click */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {activeM.points.map((pt) => {
                            const isPtActive = selectedPoint?.id === pt.id;
                            return (
                              <button
                                key={pt.id}
                                type="button"
                                onClick={() => setSelectedPoint(pt)}
                                className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                  isPtActive
                                    ? 'bg-amber-400 text-slate-950 font-bold ring-2 ring-white'
                                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                                }`}
                              >
                                {pt.code} - {pt.name}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
