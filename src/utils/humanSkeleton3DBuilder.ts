import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

/**
 * Converts any GLTF geometry (including InterleavedBufferAttribute / mixed Uint16/Uint32 indices)
 * into a clean, uniform indexed BufferGeometry with smooth welded vertex normals.
 */
function toSmoothIndexedGeometry(
  src: THREE.BufferGeometry,
  worldMatrix?: THREE.Matrix4
): THREE.BufferGeometry {
  const dst = new THREE.BufferGeometry();
  const posAttr = src.attributes.position;
  const count = posAttr.count;
  const posArr = new Float32Array(count * 3);
  const v = new THREE.Vector3();

  for (let i = 0; i < count; i++) {
    v.set(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
    if (worldMatrix) v.applyMatrix4(worldMatrix);
    posArr[i * 3] = v.x;
    posArr[i * 3 + 1] = v.y;
    posArr[i * 3 + 2] = v.z;
  }
  dst.setAttribute('position', new THREE.BufferAttribute(posArr, 3));

  if (src.index) {
    const idxAttr = src.index;
    const idxCount = idxAttr.count;
    const idxArr = new Uint32Array(idxCount);
    for (let i = 0; i < idxCount; i++) {
      idxArr[i] = idxAttr.getX(i);
    }
    dst.setIndex(new THREE.BufferAttribute(idxArr, 1));
  } else {
    const idxArr = new Uint32Array(count);
    for (let i = 0; i < count; i++) idxArr[i] = i;
    dst.setIndex(new THREE.BufferAttribute(idxArr, 1));
  }

  // Compute smooth vertex normals while indexed so shared vertices average face normals seamlessly
  dst.computeVertexNormals();
  return dst;
}

/**
 * Generates a subtle, high-resolution cortical bone periosteal micro-grain bump texture
 */
function createCorticalBoneBumpTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const img = ctx.createImageData(size, size);
  const data = img.data;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const n1 = Math.sin(x * 0.31 + y * 0.09) * Math.cos(y * 0.37 - x * 0.07);
      const n2 = Math.sin(x * 1.15 + y * 0.28) * 0.28;
      const hash = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
      const grain = hash - Math.floor(hash) - 0.5;
      const v = Math.max(
        0,
        Math.min(255, Math.round(128 + n1 * 14 + n2 * 10 + grain * 16))
      );
      data[idx] = v;
      data[idx + 1] = v;
      data[idx + 2] = v;
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 6);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Builds a complete, anatomically accurate 32-tooth Upper & Lower Dental Arch in closed occlusion
 * (16 maxillary teeth + 16 mandibular teeth nestled into the alveolar sockets of the skull & closed mandible).
 */
function createClosedDentalArchesGeometry(): THREE.BufferGeometry[] {
  const toothGeos: THREE.BufferGeometry[] = [];

  const toothSpecs = [
    { tCenter: 0.075, w: 0.0038, d: 0.0030, hUp: 0.0068, hLow: 0.0060, incisal: 0.45 }, // Central incisor
    { tCenter: 0.225, w: 0.0033, d: 0.0029, hUp: 0.0064, hLow: 0.0058, incisal: 0.48 }, // Lateral incisor
    { tCenter: 0.375, w: 0.0036, d: 0.0035, hUp: 0.0072, hLow: 0.0065, incisal: 0.35 }, // Canine (cuspid)
    { tCenter: 0.535, w: 0.0037, d: 0.0042, hUp: 0.0062, hLow: 0.0058, incisal: 0.72 }, // 1st Premolar
    { tCenter: 0.700, w: 0.0038, d: 0.0045, hUp: 0.0060, hLow: 0.0056, incisal: 0.76 }, // 2nd Premolar
    { tCenter: 0.885, w: 0.0046, d: 0.0052, hUp: 0.0058, hLow: 0.0055, incisal: 0.85 }, // 1st Molar
    { tCenter: 1.085, w: 0.0044, d: 0.0050, hUp: 0.0055, hLow: 0.0052, incisal: 0.85 }, // 2nd Molar
    { tCenter: 1.275, w: 0.0040, d: 0.0046, hUp: 0.0052, hLow: 0.0050, incisal: 0.85 }, // 3rd Molar
  ];

  const occlusalY = 1.6488;

  for (const side of [-1, 1]) {
    for (let idx = 0; idx < toothSpecs.length; idx++) {
      const spec = toothSpecs[idx];
      const t = spec.tCenter;

      const archX = side * 0.0232 * Math.sin(t);
      const archZ = 0.1135 + 0.0282 * Math.cos(t);
      const yaw = side * t * 0.88;

      for (const isUpper of [true, false]) {
        const h = isUpper ? spec.hUp : spec.hLow;
        const rawCyl = new THREE.CylinderGeometry(
          isUpper ? spec.w * 0.46 : spec.w * 0.46 * spec.incisal,
          isUpper ? spec.w * 0.46 * spec.incisal : spec.w * 0.44,
          h,
          10,
          2
        );

        const rawPos = rawCyl.attributes.position;
        for (let i = 0; i < rawPos.count; i++) {
          let vx = rawPos.getX(i);
          const vy = rawPos.getY(i);
          let vz = rawPos.getZ(i) * (spec.d / spec.w);

          const normY = (vy + h * 0.5) / h;
          const crownBulge = Math.sin(normY * Math.PI) * 0.0005;
          if (vz > 0) vz += crownBulge;

          const rx = vx * Math.cos(yaw) + vz * Math.sin(yaw);
          const rz = -vx * Math.sin(yaw) + vz * Math.cos(yaw);

          const zOffset = isUpper ? 0.0004 : -0.0004;
          const yCenter = isUpper
            ? occlusalY + h * 0.46
            : occlusalY - h * 0.46;

          rawPos.setXYZ(i, archX + rx, yCenter + vy, archZ + rz + zOffset);
        }

        const toothGeo = toSmoothIndexedGeometry(rawCyl);
        rawCyl.dispose();

        const pos = toothGeo.attributes.position;
        const colors = new Float32Array(pos.count * 3);
        for (let i = 0; i < pos.count; i++) {
          const vy = pos.getY(i);
          const distFromOcclusal = Math.min(1, Math.abs(vy - occlusalY) / 0.0065);
          const r = 0.975 - distFromOcclusal * 0.085;
          const g = 0.955 - distFromOcclusal * 0.105;
          const b = 0.895 - distFromOcclusal * 0.145;
          colors[i * 3] = r;
          colors[i * 3 + 1] = g;
          colors[i * 3 + 2] = b;
        }
        toothGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        toothGeos.push(toothGeo);
      }
    }
  }

  return toothGeos;
}

/**
 * Computes smooth, organic anatomical vertex colors for each CT-scanned bone mesh
 */
function applyRealisticBoneVertexColors(
  geo: THREE.BufferGeometry,
  boneName: string
): void {
  const pos = geo.attributes.position;
  const nrm = geo.attributes.normal;
  if (!pos) return;

  geo.computeBoundingBox();
  const bbox = geo.boundingBox!;
  const center = new THREE.Vector3();
  bbox.getCenter(center);
  const size = new THREE.Vector3();
  bbox.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z, 0.01);

  const count = pos.count;
  const colors = new Float32Array(count * 3);

  const isSkullOrJaw =
    boneName.includes('frontal') ||
    boneName.includes('parietal') ||
    boneName.includes('occipital') ||
    boneName.includes('temporal') ||
    boneName.includes('zygomatic') ||
    boneName.includes('maxilla') ||
    boneName.includes('mandible') ||
    boneName.includes('nasal') ||
    boneName.includes('sphenoid') ||
    boneName.includes('ethmoid') ||
    boneName.includes('lacrimal') ||
    boneName.includes('vomer') ||
    boneName.includes('palatine');

  const isInternalCranial =
    boneName.includes('sphenoid') ||
    boneName.includes('ethmoid') ||
    boneName.includes('lacrimal') ||
    boneName.includes('vomer') ||
    boneName.includes('palatine') ||
    boneName.includes('concha');

  const isVertebraOrSacrum =
    boneName.includes('vertebra') ||
    boneName.includes('atlas') ||
    boneName.includes('axis') ||
    boneName.includes('sacrum') ||
    boneName.includes('coccyx');

  for (let i = 0; i < count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);

    const ny = nrm ? nrm.getY(i) : 1;
    const nz = nrm ? nrm.getZ(i) : 0;

    const distFromCenter = Math.min(
      1,
      Math.hypot(x - center.x, y - center.y, z - center.z) / (maxDim * 0.5)
    );

    const upwardLight = 0.5 + 0.5 * ny;
    const forwardLight = 0.5 + 0.5 * Math.abs(nz);
    const cavityShade = 0.82 + 0.18 * distFromCenter;

    let r = 0.945 * cavityShade;
    let g = 0.908 * cavityShade;
    let b = 0.822 * cavityShade;

    if (isInternalCranial) {
      r *= 0.86;
      g *= 0.84;
      b *= 0.80;
    }

    if (!isSkullOrJaw && !isVertebraOrSacrum && distFromCenter > 0.76) {
      r -= 0.022;
      g -= 0.030;
      b -= 0.042;
    }

    if (isVertebraOrSacrum) {
      const groove = 0.93 + 0.07 * forwardLight;
      r *= groove;
      g *= groove * 0.99;
      b *= groove * 0.97;
    }

    if (
      (boneName.includes('maxilla') && y < 1.662 && z > 0.112) ||
      (boneName.includes('mandible') && y > 1.638 && z > 0.112)
    ) {
      r = Math.min(0.97, r + 0.045);
      g = Math.min(0.95, g + 0.052);
      b = Math.min(0.89, b + 0.068);
    }

    const shade = 0.94 + 0.06 * upwardLight;
    colors[i * 3] = Math.min(1, Math.max(0, r * shade));
    colors[i * 3 + 1] = Math.min(1, Math.max(0, g * shade));
    colors[i * 3 + 2] = Math.min(1, Math.max(0, b * shade));
  }

  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
}

/**
 * Loads the real 242-bone CT-scanned medical human skeleton (`/models/skeleton.glb` from BodyParts3D),
 * with de-interleaved smooth welded vertex normals and a closed mandible + complete 32-tooth dental arch.
 */
export function buildCompleteAnatomicalSkeleton3D(): THREE.Group {
  const skeletonGroup = new THREE.Group();
  skeletonGroup.name = 'AnatomicalSkeleton242Group';

  const bumpTex = createCorticalBoneBumpTexture();

  const corticalBoneMat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    bumpMap: bumpTex,
    bumpScale: 0.00032,
    roughness: 0.42,
    metalness: 0.02,
    side: THREE.DoubleSide,
  });

  const cartilageMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#c8d8e4'),
    roughness: 0.34,
    metalness: 0.02,
    transparent: true,
    opacity: 0.92,
    side: THREE.DoubleSide,
  });

  const loader = new GLTFLoader();
  loader.load(
    '/models/skeleton.glb',
    (gltf) => {
      const boneGeos: THREE.BufferGeometry[] = [];
      const cartilageGeos: THREE.BufferGeometry[] = [];

      gltf.scene.updateMatrixWorld(true);
      gltf.scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh && obj.geometry) {
          const name = (obj.name || obj.parent?.name || '').toLowerCase();
          const isCartilage =
            name.includes('cartilage') || name.includes('intervertebral-disc');

          // Convert InterleavedBufferAttribute to standard Float32 BufferAttribute while keeping Uint32 index for smooth normals
          const g = toSmoothIndexedGeometry(obj.geometry, obj.matrixWorld);

          if (isCartilage) {
            cartilageGeos.push(g);
          } else {
            applyRealisticBoneVertexColors(g, name);
            boneGeos.push(g);
          }
        }
      });

      // Add closed 32-tooth upper & lower dental arches to the skull/mandible
      const dentalGeos = createClosedDentalArchesGeometry();
      boneGeos.push(...dentalGeos);

      if (boneGeos.length > 0) {
        const mergedBones = mergeGeometries(boneGeos, false);
        if (mergedBones) {
          const boneMesh = new THREE.Mesh(mergedBones, corticalBoneMat);
          boneMesh.name = 'RealMedicalCorticalSkeleton242';
          boneMesh.renderOrder = 1;
          skeletonGroup.add(boneMesh);
        }
        boneGeos.forEach((g) => g.dispose());
      }

      if (cartilageGeos.length > 0) {
        const mergedCartilage = mergeGeometries(cartilageGeos, false);
        if (mergedCartilage) {
          const cartilageMesh = new THREE.Mesh(mergedCartilage, cartilageMat);
          cartilageMesh.name = 'RealMedicalCartilageSkeleton';
          cartilageMesh.renderOrder = 1;
          skeletonGroup.add(cartilageMesh);
        }
        cartilageGeos.forEach((g) => g.dispose());
      }
    },
    undefined,
    (err) => {
      console.error('Error loading real medical 3D skeleton GLB:', err);
    }
  );

  return skeletonGroup;
}
