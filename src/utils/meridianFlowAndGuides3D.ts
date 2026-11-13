import * as THREE from 'three';

export interface CunGuidesRig {
  group: THREE.Group;
  setVisible: (visible: boolean) => void;
  dispose: () => void;
}

export interface AcupunctureNeedleRig {
  group: THREE.Group;
  setTarget: (
    pos: [number, number, number] | THREE.Vector3,
    normal: THREE.Vector3,
    depthText?: string
  ) => void;
  setVisible: (visible: boolean) => void;
  dispose: () => void;
}

export interface QiBeadTrack {
  curve: THREE.CatmullRomCurve3;
  color: THREE.Color;
  phaseOffset: number;
  lengthWeight: number;
}

/**
 * Checks whether an acupoint holds a special clinical category (Nguyên, Lạc, Khích, Du, Mộ, Ngũ Du, Bát Hội, Giao Hội, Tứ Tổng, Đổng Thị).
 */
export function isSpecialAcupoint(specialRole?: string): boolean {
  if (!specialRole) return false;
  return /nguyên|lạc huyệt|khích|bối du|mộ huyệt|tỉnh|huỳnh|du\s|kinh\s|hợp\s|bát hội|giao hội|tổng huyệt|huyệt khai|tứ quan|đổng thị|tuyệt kỹ|cội nguồn/i.test(
    specialRole
  );
}

/**
 * Extracts critical anatomical needling cautions for clinical safety display.
 */
export function extractClinicalSafetyWarning(depth?: string): string | null {
  if (!depth) return null;
  if (
    /tuyệt đối|chống chỉ định|có thai|hành tủy|đỉnh phổi|phổi|tràn khí|động mạch|gan|lách|thận|tủy sống|mắt|nhãn cầu|không đâm sâu|cấm châm/i.test(
      depth
    )
  ) {
    return depth;
  }
  return null;
}

/**
 * Snaps an approximate anchor coordinate directly onto the nearest vertex of the loaded MakeHuman mesh
 * and offsets +1.3mm along the outward vertex normal so points never float or sink inside skin.
 */
export function snapAnchorToHumanMesh(
  anchor: [number, number, number],
  positions: Float32Array | null,
  normals: Float32Array | null
): { pos: [number, number, number]; normal: [number, number, number] } {
  if (!positions || positions.length < 3) {
    return { pos: anchor, normal: [0, 0, 1] };
  }

  const [ax, ay, az] = anchor;
  let bestIdx = 0;
  let bestDistSq = Infinity;

  for (let i = 0; i < positions.length; i += 3) {
    const dx = positions[i] - ax;
    const dy = positions[i + 1] - ay;
    const dz = positions[i + 2] - az;
    const d2 = dx * dx + dy * dy + dz * dz;
    if (d2 < bestDistSq) {
      bestDistSq = d2;
      bestIdx = i;
    }
  }

  let nx = normals ? normals[bestIdx] : 0;
  let ny = normals ? normals[bestIdx + 1] : 0;
  let nz = normals ? normals[bestIdx + 2] : 1;
  const nLen = Math.hypot(nx, ny, nz) || 1;
  nx /= nLen;
  ny /= nLen;
  nz /= nLen;

  const offset = 0.0013;
  return {
    pos: [
      positions[bestIdx] + nx * offset,
      positions[bestIdx + 1] + ny * offset,
      positions[bestIdx + 2] + nz * offset,
    ],
    normal: [nx, ny, nz],
  };
}

/**
 * Builds subtle anatomical midline axes (Nhâm-Đốc sagittal guide) and classic Cun (Thốn)
 * body-proportion landmark rings at key reference levels.
 */
export function buildCunGuides3D(): CunGuidesRig {
  const group = new THREE.Group();
  group.name = 'cun-anatomical-guides';
  group.visible = false;

  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];

  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x0284c7,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
  });
  materials.push(ringMat);

  const axisMat = new THREE.LineBasicMaterial({
    color: 0x0369a1,
    transparent: true,
    opacity: 0.52,
  });
  materials.push(axisMat);

  // Horizontal anatomical proportion rings [y, rx, rz, centerZ]
  const rings: [number, number, number, number][] = [
    [1.500, 0.068, 0.062, 0.045], // Thiên Đột / Cổ (Jugular notch)
    [1.325, 0.162, 0.128, 0.048], // Đản Trung / Ngực 8 thốn
    [1.111, 0.138, 0.114, 0.048], // Thần Khuyết / Rốn
    [0.985, 0.168, 0.118, 0.038], // Khúc Cốt / Xương mu (5 thốn dưới rốn)
    [0.502, 0.066, 0.066, 0.025], // Ngang Độc Tỵ / Khớp gối (left side ring offset below)
  ];

  rings.forEach(([y, rx, rz, cz], idx) => {
    const pts: THREE.Vector3[] = [];
    const segs = 48;
    const cx = idx === 4 ? 0.178 : 0;
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      pts.push(new THREE.Vector3(cx + Math.cos(a) * rx, y, cz + Math.sin(a) * rz));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    geometries.push(geo);
    const line = new THREE.Line(geo, axisMat);
    line.renderOrder = 3;
    group.add(line);

    if (idx === 4) {
      // Mirror knee ring on right knee (-X)
      const ptsR = pts.map((p) => new THREE.Vector3(-p.x, p.y, p.z));
      const geoR = new THREE.BufferGeometry().setFromPoints(ptsR);
      geometries.push(geoR);
      const lineR = new THREE.Line(geoR, axisMat);
      lineR.renderOrder = 3;
      group.add(lineR);
    }
  });

  // Median sagittal guideline (X = 0) along torso & head
  const sagittalPts = [
    new THREE.Vector3(0, 0.90, 0.15),
    new THREE.Vector3(0, 1.11, 0.165),
    new THREE.Vector3(0, 1.33, 0.175),
    new THREE.Vector3(0, 1.50, 0.135),
    new THREE.Vector3(0, 1.74, 0.185),
    new THREE.Vector3(0, 1.86, 0.04),
    new THREE.Vector3(0, 1.66, -0.06),
    new THREE.Vector3(0, 1.48, -0.055),
    new THREE.Vector3(0, 1.10, -0.045),
    new THREE.Vector3(0, 0.90, -0.095),
  ];
  const sagittalGeo = new THREE.BufferGeometry().setFromPoints(sagittalPts);
  geometries.push(sagittalGeo);
  const sagittalLine = new THREE.Line(sagittalGeo, axisMat);
  sagittalLine.renderOrder = 3;
  group.add(sagittalLine);

  return {
    group,
    setVisible: (visible: boolean) => {
      group.visible = visible;
    },
    dispose: () => {
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      group.clear();
    },
  };
}

/**
 * Builds an interactive 3D Stainless-Steel & Copper-Handle Acupuncture Needle ("Hào Châm")
 * with an anatomical insertion target ring on the skin surface.
 */
export function buildAcupunctureNeedle3D(): AcupunctureNeedleRig {
  const group = new THREE.Group();
  group.name = 'virtual-acupuncture-needle';
  group.visible = false;

  const needlePivot = new THREE.Group();
  group.add(needlePivot);

  // Needle shaft (~36mm external visual length, fine metallic sheen)
  const shaftGeo = new THREE.CylinderGeometry(0.00055, 0.00025, 0.036, 10);
  shaftGeo.translate(0, 0.018, 0); // Tip sits cleanly at origin (0,0,0)
  const shaftMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.92,
    roughness: 0.18,
    depthTest: false,
  });
  const shaftMesh = new THREE.Mesh(shaftGeo, shaftMat);
  shaftMesh.renderOrder = 12;
  needlePivot.add(shaftMesh);

  // Coiled Copper-Gold Handle (Đốc kim đồng vàng)
  const handleGeo = new THREE.CylinderGeometry(0.00145, 0.00125, 0.022, 12);
  handleGeo.translate(0, 0.047, 0);
  const handleMat = new THREE.MeshStandardMaterial({
    color: 0xd97706,
    metalness: 0.78,
    roughness: 0.28,
    depthTest: false,
  });
  const handleMesh = new THREE.Mesh(handleGeo, handleMat);
  handleMesh.renderOrder = 12;
  needlePivot.add(handleMesh);

  // Handle top loop cap
  const capGeo = new THREE.SphereGeometry(0.0016, 10, 10);
  capGeo.translate(0, 0.058, 0);
  const capMesh = new THREE.Mesh(capGeo, handleMat);
  capMesh.renderOrder = 12;
  needlePivot.add(capMesh);

  // Surface Entry Target Ring flush against skin normal
  const ringGeo = new THREE.RingGeometry(0.0052, 0.0074, 24);
  ringGeo.rotateX(-Math.PI / 2);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0xef4444,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.92,
    depthTest: false,
  });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.renderOrder = 11;
  group.add(ringMesh);

  const upVec = new THREE.Vector3(0, 1, 0);
  const tmpNorm = new THREE.Vector3();
  const tiltQuat = new THREE.Quaternion();
  const tangentAxis = new THREE.Vector3();

  const setTarget = (
    pos: [number, number, number] | THREE.Vector3,
    normal: THREE.Vector3,
    depthText?: string
  ) => {
    if (Array.isArray(pos)) {
      group.position.set(pos[0], pos[1], pos[2]);
    } else {
      group.position.copy(pos);
    }

    tmpNorm.copy(normal).normalize();
    if (tmpNorm.lengthSq() < 0.001) tmpNorm.set(0, 0, 1);

    // Align target ring flat against skin outward normal
    group.quaternion.setFromUnitVectors(upVec, tmpNorm);

    // Tilt needle pivot according to clinical needling angle:
    // - Ngang / luồn dưới da (~70° tilt from normal, ~20° to skin)
    // - Xiên / chếch (~42° tilt)
    // - Thẳng (~0° perpendicular to skin)
    let tiltRad = 0;
    if (depthText) {
      if (/ngang|luồn dưới da/i.test(depthText)) {
        tiltRad = THREE.MathUtils.degToRad(68);
      } else if (/xiên|chếch|hướng/i.test(depthText)) {
        tiltRad = THREE.MathUtils.degToRad(40);
      }
    }

    if (tiltRad > 0) {
      tangentAxis.set(1, 0, 0);
      tiltQuat.setFromAxisAngle(tangentAxis, tiltRad);
      needlePivot.quaternion.copy(tiltQuat);
    } else {
      needlePivot.quaternion.identity();
    }
  };

  return {
    group,
    setTarget,
    setVisible: (visible: boolean) => {
      group.visible = visible;
    },
    dispose: () => {
      shaftGeo.dispose();
      handleGeo.dispose();
      capGeo.dispose();
      ringGeo.dispose();
      shaftMat.dispose();
      handleMat.dispose();
      ringMat.dispose();
      group.clear();
    },
  };
}
