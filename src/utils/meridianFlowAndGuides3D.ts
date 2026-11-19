import * as THREE from 'three';

export interface CunGuidesRig {
  group: THREE.Group;
  setVisible: (visible: boolean) => void;
  dispose: () => void;
}

export interface AcupunctureNeedlePointMeta {
  code?: string;
  name?: string;
  location?: string;
}

export interface AcupunctureNeedleRig {
  group: THREE.Group;
  setTarget: (
    pos: [number, number, number] | THREE.Vector3,
    normal: THREE.Vector3,
    depthText?: string,
    pointMeta?: AcupunctureNeedlePointMeta
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
 * Resolves the clinically safe 3D world-space insertion trajectory (`insertDir`), outward handle
 * direction (`handleDir`), and anatomical tissue depth (`insertDepthM`) relative to the skin
 * outward normal and underlying Zang-Fu organs / osteology.
 */
function resolveClinicalNeedlingPose(
  px: number,
  py: number,
  pz: number,
  outwardNormal: THREE.Vector3,
  depthText: string | undefined,
  pointMeta: AcupunctureNeedlePointMeta | undefined,
  outHandleDir: THREE.Vector3
): { contraindicated: boolean; insertDepthM: number } {
  const sideSign = px >= 0 ? 1 : -1;
  const isMidline = Math.abs(px) < 0.012;
  const text = (depthText || '').toLowerCase();
  const code = (pointMeta?.code || '').replace(/[^a-z0-9]/gi, '').toUpperCase();

  // Strictly non-needling landmark points (e.g., ST17 Nhũ Trung, CV8 Thần Khuyết)
  const contraindicated =
    code === 'ST17' ||
    code === 'CV8' ||
    (/tuyệt đối\s+cấm\s+châm/i.test(text) &&
      !/cấm\s+châm\s+(thẳng|sâu|hướng|trẻ|thai|mạnh|vào|quá|cho|người)/i.test(text));

  if (contraindicated) {
    outHandleDir.copy(outwardNormal).normalize();
    return { contraindicated: true, insertDepthM: 0 };
  }

  // Extract clinical depth range in Thốn (preferring final/working depth for two-stage needles like CV22)
  const thMatches = Array.from(
    text.matchAll(/(\d+(?:\.\d+)?)\s*(?:–|-|đến)?\s*(\d+(?:\.\d+)?)?\s*thốn/g)
  );
  let depthThon = 0.6;
  if (thMatches.length > 0) {
    const last = thMatches[thMatches.length - 1];
    const a = parseFloat(last[1]);
    const b = last[2] ? parseFloat(last[2]) : a;
    depthThon = THREE.MathUtils.clamp((a + b) * 0.5, 0.12, 2.0);
  } else if (/châm nông|trích|nặn máu/.test(text)) {
    depthThon = 0.15;
  }
  const insertDepthM = THREE.MathUtils.clamp(depthThon * 0.015, 0.004, 0.025);

  // Clean midline sagittal normal noise on CV / GV points
  const N = new THREE.Vector3(
    isMidline ? 0 : outwardNormal.x,
    outwardNormal.y,
    outwardNormal.z
  );
  if (N.lengthSq() < 1e-6) N.set(0, 0, pz >= 0 ? 1 : -1);
  N.normalize();

  const tangentOf = (wx: number, wy: number, wz: number): THREE.Vector3 | null => {
    const t = new THREE.Vector3(wx, wy, wz);
    t.addScaledVector(N, -t.dot(N));
    return t.lengthSq() > 1e-6 ? t.normalize() : null;
  };

  let tiltDeg = 0;
  let desiredTanWorld: [number, number, number] | null = null;
  let fixedInDir: THREE.Vector3 | null = null;

  // 1. Suboccipital & periauricular points guarding Brainstem / Medulla / Vertebral Artery
  if (code === 'GV15' || code === 'GV16') {
    // Tilt downward toward mandible, NEVER upward into foramen magnum / medulla oblongata
    tiltDeg = 18;
    desiredTanWorld = [0, -1, 0];
  } else if (code === 'GB20') {
    // Tilt medially-downward toward contralateral nose/cheek, safely inferior to cerebellum/brainstem
    tiltDeg = 22;
    desiredTanWorld = [-sideSign * 0.55, -0.82, 0];
  } else if (code === 'TE17') {
    tiltDeg = 18;
    desiredTanWorld = [-sideSign * 0.35, -0.15, 0.90];
  } else if (code === 'BL10') {
    tiltDeg = 26;
    desiredTanWorld = [0, -1, 0];
  }
  // 2. Orbital points guarding Eyeball
  else if (code === 'BL1') {
    fixedInDir = new THREE.Vector3(-sideSign * 0.20, 0.0, -1.0).normalize();
  } else if (code === 'ST1') {
    fixedInDir = new THREE.Vector3(0, -0.22, -1.0).normalize();
  }
  // 3. Neck / Trachea / Aortic Arch / Coccyx / Sacral safety
  else if (code === 'CV22') {
    // Glide inferiorly behind posterior manubrium border, clearing trachea & aortic arch
    fixedInDir = new THREE.Vector3(0, -0.94, -0.34).normalize();
  } else if (code === 'CV23') {
    // Oblique superiorly-posteriorly toward tongue root, clearing larynx & hyoid
    fixedInDir = new THREE.Vector3(0, 0.84, -0.54).normalize();
  } else if (code === 'GV1') {
    // Skim upward-posteriorly along anterior face of coccyx, avoiding rectum
    fixedInDir = new THREE.Vector3(0, 0.92, -0.39).normalize();
  }
  // 4. Anterior Sternum (CV16-CV21): tangential subcutaneous glide along sternum, clearing Heart/Pericardium
  else if (/dọc xương ức/.test(text) || /^CV(1[6-9]|20|21)$/.test(code)) {
    tiltDeg = 72;
    desiredTanWorld = [0, -1, 0];
  }
  // 5. Epigastrium (CV14-CV15): oblique INFERIORLY avoiding Heart apex & Liver left lobe
  else if (code === 'CV14' || code === 'CV15') {
    tiltDeg = 50;
    desiredTanWorld = [0, -1, 0];
  }
  // 6. Inframammary ST18: oblique SUPERIORLY along mammary fold avoiding left ventricle apex
  else if (code === 'ST18') {
    tiltDeg = 64;
    desiredTanWorld = [0, 1, 0];
  }
  // 7. Thoracic Apex & Supraclavicular & BL43 Scapula: oblique LATERALLY away from Lung Apex
  else if (
    /hướng ra (phía )?ngoài|xương bả vai/.test(text) ||
    /^(LU1|LU2|ST12|KI27|BL43)$/.test(code)
  ) {
    tiltDeg = /ngang/.test(text) ? 64 : 54;
    desiredTanWorld = [sideSign * 0.92, -0.38, 0];
  }
  // 8. Thoracic Back-Shu Inner & Outer lines: oblique MEDIALLY-INFERIORLY toward Spine, clearing Lung/Heart/Liver/Spleen
  else if (
    /cột sống/.test(text) ||
    /^BL(1[1-9]|20|21)$/.test(code) ||
    /^BL4[12456789]$/.test(code) ||
    code === 'BL50'
  ) {
    tiltDeg = 50;
    desiredTanWorld = [-sideSign * 0.86, -0.50, 0];
  }
  // 9. Lumbar Renal zone (BL22, BL23, BL52, GB25): subtle medial tilt away from Kidney cortex
  else if (/^(BL22|BL23|BL52|GB25)$/.test(code)) {
    tiltDeg = 18;
    desiredTanWorld = [-sideSign * 0.92, -0.30, 0];
  }
  // 10. Anterior/Lateral Intercostal Ribs & Hypochondrium: shallow tangential glide along rib curve (avoiding Lung/Liver/Spleen)
  else if (
    /^(LR14|GB22|GB23|GB24|SP1[7-9]|SP20|SP21|ST1[3-6]|KI2[2-6]|PC1)$/.test(code)
  ) {
    tiltDeg = 68;
    desiredTanWorld = isMidline ? [0, -1, 0] : [sideSign * 0.88, -0.45, 0];
  }
  // 11. 11th Rib Tip (LR13) & Subcostal KI21/SP16 over Liver/Gallbladder/Spleen
  else if (code === 'LR13') {
    tiltDeg = 35;
    desiredTanWorld = [0, -0.60, 0.80];
  } else if (code === 'KI21' || code === 'SP16') {
    tiltDeg = 28;
    desiredTanWorld = [0, -1, 0];
  }
  // 12. Dorsal Spinous Interspaces (GV3-GV14): oblique UPWARD between sloping spinous processes
  else if (/^GV([3-9]|1[0-4])$/.test(code)) {
    tiltDeg = 34;
    desiredTanWorld = [0, 1, 0];
  }
  // 13. General scalp, transverse/subcutaneous, or oblique directional instructions
  else if (/ngang|luồn dưới da|dưới da|khoang liên sườn/.test(text) || py > 1.74) {
    tiltDeg = 68;
    if (/xuống dưới|gốc mũi/.test(text)) desiredTanWorld = [0, -1, 0];
    else if (/lên trên|bách hội/.test(text)) desiredTanWorld = [0, 1, 0];
    else if (/hướng sang|thái dương|giáp xa|đầu lông mày/.test(text)) {
      desiredTanWorld = [sideSign, -0.2, -0.3];
    } else {
      desiredTanWorld = py > 1.73 ? [0, -0.15, -1] : [0, -1, 0];
    }
  } else if (/xiên|nghiêng|chếch/.test(text)) {
    tiltDeg = /hơi xiên|hơi nghiêng/.test(text) ? 24 : 42;
    if (/xuống dưới|xuống/.test(text)) desiredTanWorld = [0, -1, 0];
    else if (/lên trên|lên/.test(text)) desiredTanWorld = [0, 1, 0];
    else if (/hướng vào trong|tâm/.test(text)) desiredTanWorld = [-sideSign, 0, 0];
    else desiredTanWorld = [0, -1, 0];
  }

  const insertDir = new THREE.Vector3();
  if (fixedInDir) {
    insertDir.copy(fixedInDir).normalize();
  } else if (tiltDeg > 0 && desiredTanWorld) {
    const T =
      tangentOf(desiredTanWorld[0], desiredTanWorld[1], desiredTanWorld[2]) ||
      tangentOf(0, -1, 0) ||
      tangentOf(1, 0, 0);
    if (T) {
      const rad = THREE.MathUtils.degToRad(tiltDeg);
      insertDir
        .copy(N)
        .multiplyScalar(-Math.cos(rad))
        .addScaledVector(T, Math.sin(rad))
        .normalize();
    } else {
      insertDir.copy(N).negate();
    }
  } else {
    insertDir.copy(N).negate();
  }

  // Safety guarantee: inward trajectory must stay >= 10° inside skin tangent plane (never point outward)
  if (insertDir.dot(N) > -0.17) {
    const T = tangentOf(insertDir.x, insertDir.y, insertDir.z) || tangentOf(0, -1, 0);
    if (T) {
      const cosT = 0.20;
      const sinT = Math.sqrt(1 - cosT * cosT);
      insertDir
        .copy(N)
        .multiplyScalar(-cosT)
        .addScaledVector(T, sinT)
        .normalize();
    }
  }

  outHandleDir.copy(insertDir).negate().normalize();
  return { contraindicated: false, insertDepthM };
}

/**
 * Builds an interactive 3D Stainless-Steel & Copper-Handle Acupuncture Needle ("Hào Châm")
 * with an anatomical skin entry ring and clinical Zang-Fu organ safety trajectory preview.
 */
export function buildAcupunctureNeedle3D(): AcupunctureNeedleRig {
  const group = new THREE.Group();
  group.name = 'virtual-acupuncture-needle';
  group.visible = false;

  const needlePivot = new THREE.Group();
  group.add(needlePivot);

  // External sterile steel needle shaft (~36mm external length, tip sits cleanly at skin entry y=0)
  const shaftGeo = new THREE.CylinderGeometry(0.00055, 0.00028, 0.036, 10);
  shaftGeo.translate(0, 0.018, 0);
  const shaftMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.92,
    roughness: 0.18,
    depthTest: false,
  });
  const shaftMesh = new THREE.Mesh(shaftGeo, shaftMat);
  shaftMesh.renderOrder = 12;
  needlePivot.add(shaftMesh);

  // Inserted subcutaneous / intramuscular needle tip segment (y = 0..-1 unit, scaled to insertDepthM)
  // depthTest: true makes it realistically hidden beneath opaque skin while revealing exact organ-safe
  // trajectory inside Da+Xương / Xương / Tạng Phủ views!
  const subShaftGeo = new THREE.CylinderGeometry(0.00028, 0.00008, 1.0, 10);
  subShaftGeo.translate(0, -0.5, 0);
  const subShaftMat = new THREE.MeshBasicMaterial({
    color: 0x06b6d4,
    transparent: true,
    opacity: 0.92,
    depthTest: true,
    depthWrite: false,
  });
  const subShaftMesh = new THREE.Mesh(subShaftGeo, subShaftMat);
  subShaftMesh.renderOrder = 10;
  needlePivot.add(subShaftMesh);

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
  const tmpHandleDir = new THREE.Vector3();
  const invGroupQuat = new THREE.Quaternion();

  const setTarget = (
    pos: [number, number, number] | THREE.Vector3,
    normal: THREE.Vector3,
    depthText?: string,
    pointMeta?: AcupunctureNeedlePointMeta
  ) => {
    let px: number;
    let py: number;
    let pz: number;
    if (Array.isArray(pos)) {
      [px, py, pz] = pos;
      group.position.set(px, py, pz);
    } else {
      px = pos.x;
      py = pos.y;
      pz = pos.z;
      group.position.copy(pos);
    }

    tmpNorm.copy(normal).normalize();
    if (tmpNorm.lengthSq() < 0.001) tmpNorm.set(0, 0, 1);

    // Align target ring flat against skin outward normal
    group.quaternion.setFromUnitVectors(upVec, tmpNorm);

    // Solve exact world-space anatomical handle & inward tissue insertion trajectory
    const { contraindicated, insertDepthM } = resolveClinicalNeedlingPose(
      px,
      py,
      pz,
      tmpNorm,
      depthText,
      pointMeta,
      tmpHandleDir
    );

    if (contraindicated) {
      needlePivot.visible = false;
      ringMat.color.setHex(0xf59e0b); // Amber contraindication ring ("Cấm châm")
    } else {
      needlePivot.visible = true;
      ringMat.color.setHex(0xef4444);
      subShaftMesh.scale.set(1, insertDepthM, 1);

      // Convert desired world-space outward handle axis into group-local quaternion cleanly
      invGroupQuat.copy(group.quaternion).invert();
      tmpHandleDir.applyQuaternion(invGroupQuat).normalize();
      needlePivot.quaternion.setFromUnitVectors(upVec, tmpHandleDir);
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
      subShaftGeo.dispose();
      handleGeo.dispose();
      capGeo.dispose();
      ringGeo.dispose();
      shaftMat.dispose();
      subShaftMat.dispose();
      handleMat.dispose();
      ringMat.dispose();
      group.clear();
    },
  };
}
