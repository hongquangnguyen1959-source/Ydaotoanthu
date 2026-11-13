import * as THREE from 'three';

export interface ZangFuOrganInfo {
  id: string;
  name: string;
  chineseName: string;
  category: 'Tạng (Âm)' | 'Phủ (Dương)' | 'Phủ Kỳ Hằng';
  meridianIds: string[];
  physiology: string;
  clinicalNotes: string;
  baseColor: string;
}

export const ZANG_FU_ORGANS_INFO: Record<string, ZangFuOrganInfo> = {
  LU: {
    id: 'LU',
    name: 'Phế (Hai Lá Phổi & Khí Quản)',
    chineseName: '肺',
    category: 'Tạng (Âm)',
    meridianIds: ['LU'],
    physiology:
      'Chủ khí, ty hô hấp, thông điều thủy đạo, triều bách mạch, chủ bì mao và khai khiếu ra mũi.',
    clinicalNotes:
      'Nằm trong lồng ngực (Thượng tiêu), hai bên tim. Phế phải 3 thùy, phế trái 2 thùy nhường chỗ cho mỏm tim.',
    baseColor: '#f29ea6',
  },
  HT: {
    id: 'HT',
    name: 'Tâm (Tim)',
    chineseName: '心',
    category: 'Tạng (Âm)',
    meridianIds: ['HT', 'PC'],
    physiology:
      'Quân chủ chi quan: chủ huyết mạch, tàng Thần, khai khiếu ra lưỡi, vinh nhuận ra mặt.',
    clinicalNotes:
      'Nằm trong trung thất giữa hai lá phổi, hơi lệch sang trái (+X), mỏm tim hướng xuống dưới ra trước.',
    baseColor: '#b92b3a',
  },
  PC: {
    id: 'PC',
    name: 'Tâm Bào Lạc (Màng Ngoài Tim)',
    chineseName: '心包络',
    category: 'Tạng (Âm)',
    meridianIds: ['PC', 'HT'],
    physiology:
      'Màng bọc bảo vệ Tâm tạng, đại diện Tâm tiếp nhận ngoại tà xâm phạm và điều hòa huyết quản.',
    clinicalNotes:
      'Bao bọc xung quanh tim, biểu lý với Tam Tiêu.',
    baseColor: '#e06488',
  },
  LR: {
    id: 'LR',
    name: 'Can (Gan)',
    chineseName: '肝',
    category: 'Tạng (Âm)',
    meridianIds: ['LR'],
    physiology:
      'Chủ sơ tiết điều đạt khí cơ toàn thân, tàng huyết, chủ cân (gân cơ), khai khiếu ra mắt.',
    clinicalNotes:
      'Nằm ở hạ sườn phải (-X) ngay dưới vòm hoành, vắt ngang nhẹ sang vùng thượng vị.',
    baseColor: '#7f2d27',
  },
  GB: {
    id: 'GB',
    name: 'Đởm (Túi Mật)',
    chineseName: '胆',
    category: 'Phủ (Dương)',
    meridianIds: ['GB'],
    physiology:
      'Tàng trữ và bài tiết tinh chất mật dịch hỗ trợ tiêu hóa, chủ quyết đoán, phối hợp chặt với Can.',
    clinicalNotes:
      'Nằm ẩn dưới bờ dưới gan bên phải (-X), biểu lý với Can.',
    baseColor: '#1f8a5b',
  },
  ST: {
    id: 'ST',
    name: 'Vị (Dạ Dày)',
    chineseName: '胃',
    category: 'Phủ (Dương)',
    meridianIds: ['ST'],
    physiology:
      'Thái thương chi quan: chủ thu nạp và ngấu nhừ thủy cốc, lấy thông giáng làm thuận.',
    clinicalNotes:
      'Nằm ở thượng vị và hạ sườn trái (+X), trên rốn và dưới cơ hoành.',
    baseColor: '#d98c6c',
  },
  SP: {
    id: 'SP',
    name: 'Tỳ (Lá Lách)',
    chineseName: '脾',
    category: 'Tạng (Âm)',
    meridianIds: ['SP'],
    physiology:
      'Chủ vận hóa thủy cốc và thủy thấp, thống nhiếp huyết dịch, chủ cơ nhục tứ chi, thăng thanh.',
    clinicalNotes:
      'Nằm ở hạ sườn trái (+X) phía sau dạ dày dưới vòm sườn 9-11.',
    baseColor: '#8d3b52',
  },
  KI: {
    id: 'KI',
    name: 'Thận (Hai Quả Thận & Niệu Quản)',
    chineseName: '腎',
    category: 'Tạng (Âm)',
    meridianIds: ['KI'],
    physiology:
      'Tiên thiên chi bản: tàng tinh, chủ thủy, chủ nạp khí, chủ cốt tủy sinh não, khai khiếu ra tai và nhị âm.',
    clinicalNotes:
      'Nằm sau phúc mạc hai bên cột sống L1-L3 (ngang vùng huyệt Thận Du BL-23 & Mệnh Môn GV-4). Thận phải (-X) thấp hơn thận trái khoảng 1cm.',
    baseColor: '#8a353b',
  },
  LI: {
    id: 'LI',
    name: 'Đại Trường (Ruột Già)',
    chineseName: '大腸',
    category: 'Phủ (Dương)',
    meridianIds: ['LI'],
    physiology:
      'Truyền đạo chi quan: tiếp nhận cặn bã từ Tiểu Trường, hấp thu thủy dịch còn lại và bài tiết phân.',
    clinicalNotes:
      'Gồm manh tràng, kết tràng lên (-X), kết tràng ngang, kết tràng xuống (+X) và đại tràng sigma.',
    baseColor: '#c98873',
  },
  SI: {
    id: 'SI',
    name: 'Tiểu Trường (Ruột Non)',
    chineseName: '小腸',
    category: 'Phủ (Dương)',
    meridianIds: ['SI'],
    physiology:
      'Thụ thịnh chi quan: tiếp nhận đồ ăn từ Vị, phân biệt thanh trọc để hấp thu tinh chất và đưa xuống Bàng Quang/Đại Trường.',
    clinicalNotes:
      'Cuộn thành nhiều quai ruột vùng quanh rốn (hạ vị và trung vị), biểu lý với Tâm.',
    baseColor: '#e2a38d',
  },
  BL: {
    id: 'BL',
    name: 'Bàng Quang',
    chineseName: '膀胱',
    category: 'Phủ (Dương)',
    meridianIds: ['BL'],
    physiology:
      'Châu đô chi quan: chứa đựng nước tiểu và nhờ Thận khí hóa để bài tiết ra ngoài.',
    clinicalNotes:
      'Nằm sâu trong tiểu khung ngay sau xương mu (vùng huyệt Trung Cực CV-3 & Quan Nguyên CV-4).',
    baseColor: '#d99e63',
  },
  TE: {
    id: 'TE',
    name: 'Tam Tiêu (Cơ Hoành & Đường Thủy Đạo)',
    chineseName: '三焦',
    category: 'Phủ (Dương)',
    meridianIds: ['TE'],
    physiology:
      'Quyết độc chi quan: tổng quản nguyên khí và đường lưu thông thủy dịch qua Thượng Tiêu (Ngực) - Trung Tiêu (Bụng trên) - Hạ Tiêu (Bụng dưới).',
    clinicalNotes:
      'Biểu thị qua vòm cơ hoành phân chia Thượng - Trung tiêu và màng liên kết toàn khoang tạng phủ.',
    baseColor: '#b983d8',
  },
};

export interface ZangFuOrgansRig {
  group: THREE.Group;
  organMeshes: THREE.Mesh[];
  highlightMeridians: (activeIds: string[]) => void;
  setVisible: (visible: boolean) => void;
  dispose: () => void;
}

/**
 * Helper to create a smooth sculpted organic geometry by deforming a sphere with analytic shaping.
 */
function createOrganicLobeGeo(
  rx: number,
  ry: number,
  rz: number,
  deformer: (x: number, y: number, z: number, nx: number, ny: number, nz: number) => [number, number, number],
  widthSeg = 24,
  heightSeg = 18
): THREE.BufferGeometry {
  const geo = new THREE.SphereGeometry(1, widthSeg, heightSeg);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const nx = pos.getX(i);
    const ny = pos.getY(i);
    const nz = pos.getZ(i);
    const [dx, dy, dz] = deformer(nx * rx, ny * ry, nz * rz, nx, ny, nz);
    pos.setXYZ(i, dx, dy, dz);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

/**
 * Builds anatomically proportioned 3D Zang-Fu Internal Organs aligned inside `/models/skeleton.glb`:
 * - Ribcage bounds: X in [-0.135, +0.135], Y in [1.13, 1.51], Z in [-0.035, 0.14]
 * - Vertebrae T1-L5: X in [-0.04, +0.04], Y in [1.01, 1.52], Z in [-0.04, 0.05]
 * - Pelvis / Pubis: Y ~ [0.87, 1.03], Z ~ [-0.04, 0.09]
 * Note: +X is Anatomical LEFT, -X is Anatomical RIGHT.
 */
export function buildZangFuOrgans3D(): ZangFuOrgansRig {
  const group = new THREE.Group();
  group.name = 'zang-fu-organs-3d';
  group.visible = false;

  const organMeshes: THREE.Mesh[] = [];
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.MeshPhysicalMaterial[] = [];

  const registerMesh = (
    geo: THREE.BufferGeometry,
    organKey: string,
    colorHex: string,
    opacity = 0.86,
    roughness = 0.34,
    clearcoat = 0.52
  ): THREE.Mesh => {
    geometries.push(geo);
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(colorHex),
      emissive: new THREE.Color('#000000'),
      emissiveIntensity: 0,
      roughness,
      metalness: 0.02,
      clearcoat,
      clearcoatRoughness: 0.28,
      sheen: 0.3,
      sheenRoughness: 0.5,
      sheenColor: new THREE.Color('#ffd6cc'),
      transparent: true,
      opacity,
      depthWrite: opacity > 0.7,
    });
    materials.push(mat);

    const mesh = new THREE.Mesh(geo, mat);
    mesh.renderOrder = 2;
    const info = ZANG_FU_ORGANS_INFO[organKey];
    mesh.userData = {
      type: 'organ',
      organKey,
      organInfo: info,
      baseColor: new THREE.Color(colorHex),
      baseOpacity: opacity,
    };
    organMeshes.push(mesh);
    group.add(mesh);
    return mesh;
  };

  // 1. TRACHEA & MAIN BRONCHI + LEFT/RIGHT LUNGS (Phế - LU)
  const tracheaCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 1.56, 0.068),
    new THREE.Vector3(0, 1.49, 0.060),
    new THREE.Vector3(0, 1.43, 0.052),
  ]);
  const tracheaGeo = new THREE.TubeGeometry(tracheaCurve, 12, 0.0085, 12, false);
  registerMesh(tracheaGeo, 'LU', '#eab8bf', 0.86, 0.42, 0.35);

  const leftBronchus = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1.435, 0.052),
      new THREE.Vector3(0.036, 1.41, 0.048),
    ]),
    8,
    0.006,
    10,
    false
  );
  registerMesh(leftBronchus, 'LU', '#eab8bf', 0.86, 0.42, 0.35);

  const rightBronchus = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1.435, 0.052),
      new THREE.Vector3(-0.036, 1.415, 0.048),
    ]),
    8,
    0.0065,
    10,
    false
  );
  registerMesh(rightBronchus, 'LU', '#eab8bf', 0.86, 0.42, 0.35);

  // Right Lung (-X, slightly broader & higher inferior border over liver dome)
  const rightLungGeo = createOrganicLobeGeo(0.044, 0.095, 0.046, (x, y, z, nx, ny, nz) => {
    const taperTop = ny > 0 ? 1 - ny * 0.46 : 1 + Math.abs(ny) * 0.14;
    const flatMedial = nx > 0.2 ? x * 0.55 : x * taperTop;
    const concaveBase = ny < -0.55 ? y + (-ny - 0.55) * 0.025 : y;
    return [flatMedial, concaveBase, z * (ny > 0 ? 1 - ny * 0.25 : 1.05)];
  });
  const rightLung = registerMesh(rightLungGeo, 'LU', '#f29ea6', 0.82, 0.46, 0.4);
  rightLung.position.set(-0.058, 1.385, 0.042);

  // Left Lung (+X, narrower anteromedially for cardiac notch)
  const leftLungGeo = createOrganicLobeGeo(0.041, 0.096, 0.045, (x, y, z, nx, ny, nz) => {
    const taperTop = ny > 0 ? 1 - ny * 0.46 : 1 + Math.abs(ny) * 0.12;
    let modX = nx < -0.1 ? x * 0.52 : x * taperTop;
    // Cardiac notch indent
    if (nx < 0.0 && ny < 0.15 && ny > -0.85 && nz > 0) {
      modX += 0.012 * (1 - Math.abs(ny + 0.3));
    }
    return [modX, y, z * (ny > 0 ? 1 - ny * 0.25 : 1.04)];
  });
  const leftLung = registerMesh(leftLungGeo, 'LU', '#f29ea6', 0.82, 0.46, 0.4);
  leftLung.position.set(0.059, 1.382, 0.040);

  // 2. HEART (Tâm - HT) & PERICARDIUM SHEATH (Tâm Bào - PC)
  const heartGeo = createOrganicLobeGeo(0.032, 0.043, 0.031, (x, y, z, nx, ny, nz) => {
    // Taper apex downward & slightly toward left-anterior (+X, -Y, +Z)
    const apexT = ny < 0 ? 1 + ny * 0.52 : 1 - ny * 0.12;
    const apexShiftX = ny < 0 ? -ny * 0.014 : 0;
    const apexShiftZ = ny < 0 ? -ny * 0.008 : 0;
    return [x * apexT + apexShiftX, y, z * apexT + apexShiftZ];
  });
  const heartMesh = registerMesh(heartGeo, 'HT', '#b92b3a', 0.94, 0.26, 0.72);
  heartMesh.position.set(0.016, 1.348, 0.068);
  heartMesh.rotation.z = -0.22;

  // Aortic arch
  const aortaGeo = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.012, 1.38, 0.065),
      new THREE.Vector3(0.008, 1.425, 0.056),
      new THREE.Vector3(0.014, 1.405, 0.032),
      new THREE.Vector3(0.006, 1.24, 0.025),
    ]),
    18,
    0.007,
    10,
    false
  );
  registerMesh(aortaGeo, 'HT', '#c9333f', 0.9, 0.28, 0.65);

  // Translucent Pericardial Sac (Tâm Bào - PC) wrapping the heart gently
  const periGeo = createOrganicLobeGeo(0.037, 0.049, 0.036, (x, y, z, _nx, ny) => {
    const apexT = ny < 0 ? 1 + ny * 0.45 : 1 - ny * 0.1;
    return [x * apexT + (ny < 0 ? -ny * 0.013 : 0), y, z * apexT + (ny < 0 ? -ny * 0.007 : 0)];
  });
  const periMesh = registerMesh(periGeo, 'PC', '#f082a4', 0.28, 0.2, 0.85);
  periMesh.position.copy(heartMesh.position);
  periMesh.rotation.copy(heartMesh.rotation);

  // 3. DIAPHRAGM & SANJIAO PARTITION (Tam Tiêu - TE)
  const diaphragmGeo = new THREE.SphereGeometry(0.112, 26, 12, 0, Math.PI * 2, 0, Math.PI * 0.36);
  const dPos = diaphragmGeo.attributes.position;
  for (let i = 0; i < dPos.count; i++) {
    dPos.setY(i, dPos.getY(i) * 0.35);
    dPos.setZ(i, dPos.getZ(i) * 0.62);
  }
  dPos.needsUpdate = true;
  diaphragmGeo.computeVertexNormals();
  const diaphragmMesh = registerMesh(diaphragmGeo, 'TE', '#c796eb', 0.26, 0.3, 0.6);
  diaphragmMesh.position.set(0, 1.248, 0.046);

  // 4. LIVER (Can - LR) — Anatomical right (-X) arching smoothly across midline
  const liverGeo = createOrganicLobeGeo(0.068, 0.042, 0.046, (x, y, z, nx, ny) => {
    // Wedge shaped: bulky on anatomical right (nx < 0 -> -X), tapering steeply toward +X
    const wedge = nx > 0 ? Math.max(0.22, 1 - nx * 0.72) : 1 + Math.abs(nx) * 0.08;
    const flatBottom = ny < 0 ? y * 0.65 + nx * 0.024 : y * wedge;
    return [x, flatBottom, z * wedge];
  });
  const liverMesh = registerMesh(liverGeo, 'LR', '#7f2d27', 0.90, 0.28, 0.68);
  liverMesh.position.set(-0.036, 1.228, 0.065);

  // 5. GALLBLADDER (Đởm - GB) — Pear sac tucked under inferior liver margin (-X)
  const gbGeo = createOrganicLobeGeo(0.013, 0.022, 0.013, (x, y, z, _nx, ny) => {
    const bulb = ny < 0 ? 1.18 : Math.max(0.35, 1 - ny * 0.6);
    return [x * bulb, y, z * bulb];
  }, 16, 14);
  const gbMesh = registerMesh(gbGeo, 'GB', '#1f8a5b', 0.94, 0.25, 0.75);
  gbMesh.position.set(-0.044, 1.186, 0.086);
  gbMesh.rotation.z = 0.35;

  // 6. STOMACH (Vị - ST) — J-curve in left upper quadrant (+X)
  const stomachCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.016, 1.258, 0.056), // Cardia
    new THREE.Vector3(0.052, 1.242, 0.066), // Fundus
    new THREE.Vector3(0.054, 1.202, 0.076), // Body
    new THREE.Vector3(0.026, 1.174, 0.080), // Antrum
    new THREE.Vector3(-0.008, 1.186, 0.066), // Pylorus
  ]);
  const stomachGeo = new THREE.TubeGeometry(stomachCurve, 26, 0.023, 14, false);
  const sPos = stomachGeo.attributes.position;
  for (let i = 0; i < sPos.count; i++) {
    const px = sPos.getX(i);
    const py = sPos.getY(i);
    // Taper ends (cardia & pylorus) while keeping fundus/body fuller
    if (px < 0.008) {
      const k = THREE.MathUtils.clamp((0.008 - px) / 0.024, 0, 1);
      sPos.setY(i, THREE.MathUtils.lerp(py, 1.186, k * 0.45));
    }
  }
  sPos.needsUpdate = true;
  stomachGeo.computeVertexNormals();
  registerMesh(stomachGeo, 'ST', '#d98c6c', 0.88, 0.34, 0.55);

  // 7. SPLEEN (Tỳ - SP) — Posterior lateral left (+X) under ribs 9-11
  const spleenGeo = createOrganicLobeGeo(0.019, 0.032, 0.025, (x, y, z) => [x, y, z], 18, 14);
  const spleenMesh = registerMesh(spleenGeo, 'SP', '#8d3b52', 0.92, 0.30, 0.65);
  spleenMesh.position.set(0.086, 1.216, 0.016);
  spleenMesh.rotation.set(0.22, -0.35, 0.25);

  // 8. KIDNEYS & URETERS (Thận - KI) — Retroperitoneal at T12-L3 (y ~ 1.14..1.16)
  const kidneyOffsets: [number, number, number][] = [
    [-0.044, 1.148, 0.012], // Right kidney (slightly lower due to liver)
    [0.044, 1.162, 0.012],  // Left kidney
  ];
  kidneyOffsets.forEach(([kx, ky, kz], sideIdx) => {
    const kSign = sideIdx === 0 ? -1 : 1;
    const kGeo = createOrganicLobeGeo(0.017, 0.028, 0.015, (x, y, z, nx) => {
      // Bean indent on medial side (toward spine)
      const medialDir = -kSign * nx;
      const hilumIndent = medialDir > 0.2 ? (1 - Math.abs(y / 0.028)) * 0.006 * kSign : 0;
      return [x + hilumIndent, y, z];
    }, 18, 14);
    const kMesh = registerMesh(kGeo, 'KI', '#8a353b', 0.92, 0.30, 0.65);
    kMesh.position.set(kx, ky, kz);

    // Ureter descending from renal hilum to urinary bladder
    const ureterGeo = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(kx - kSign * 0.012, ky, kz + 0.004),
        new THREE.Vector3(kx * 0.72, 1.05, 0.028),
        new THREE.Vector3(kSign * 0.014, 0.955, 0.068),
      ]),
      14,
      0.0032,
      8,
      false
    );
    registerMesh(ureterGeo, 'KI', '#c9938e', 0.84, 0.38, 0.4);
  });

  // 9. LARGE INTESTINE (Đại Trường - LI) — Framing colon around abdomen
  const colonCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.072, 1.005, 0.065), // Cecum
    new THREE.Vector3(-0.078, 1.135, 0.056), // Ascending colon -> hepatic flexure
    new THREE.Vector3(-0.042, 1.148, 0.088),
    new THREE.Vector3(0.0, 1.132, 0.098),    // Transverse colon
    new THREE.Vector3(0.058, 1.156, 0.076),  // Splenic flexure
    new THREE.Vector3(0.078, 1.125, 0.052),
    new THREE.Vector3(0.074, 1.002, 0.058),  // Descending colon
    new THREE.Vector3(0.036, 0.962, 0.044),  // Sigmoid
    new THREE.Vector3(0.0, 0.935, 0.028),    // Rectum
  ]);
  const colonGeo = new THREE.TubeGeometry(colonCurve, 44, 0.0155, 12, false);
  // Add gentle haustra bulges along the colon
  const cPos = colonGeo.attributes.position;
  for (let i = 0; i < cPos.count; i++) {
    const vx = cPos.getX(i);
    const vy = cPos.getY(i);
    const vz = cPos.getZ(i);
    const haustra = 1 + 0.08 * Math.sin(vx * 180 + vy * 180);
    cPos.setXYZ(i, vx * haustra, vy, vz);
  }
  cPos.needsUpdate = true;
  colonGeo.computeVertexNormals();
  registerMesh(colonGeo, 'LI', '#c98873', 0.85, 0.38, 0.45);

  // 10. SMALL INTESTINE (Tiểu Trường - SI) — Coiled loops in umbilical region
  const siCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.022, 1.115, 0.068),
    new THREE.Vector3(0.036, 1.105, 0.074),
    new THREE.Vector3(-0.040, 1.078, 0.082),
    new THREE.Vector3(0.042, 1.062, 0.084),
    new THREE.Vector3(-0.038, 1.036, 0.082),
    new THREE.Vector3(0.032, 1.016, 0.076),
    new THREE.Vector3(-0.018, 0.996, 0.072),
    new THREE.Vector3(-0.056, 1.005, 0.066),
  ]);
  const siGeo = new THREE.TubeGeometry(siCurve, 48, 0.0115, 10, false);
  registerMesh(siGeo, 'SI', '#e2a38d', 0.85, 0.38, 0.45);

  // 11. URINARY BLADDER (Bàng Quang - BL) — Pelvis anterior to rectum, behind pubis
  const bladderGeo = createOrganicLobeGeo(0.024, 0.021, 0.022, (x, y, z) => [x, y, z], 18, 14);
  const bladderMesh = registerMesh(bladderGeo, 'BL', '#d99e63', 0.88, 0.32, 0.55);
  bladderMesh.position.set(0, 0.946, 0.068);

  const highlightMeridians = (activeIds: string[]) => {
    const activeSet = new Set(activeIds);
    const hasFilter = activeSet.size > 0;

    for (let i = 0; i < organMeshes.length; i++) {
      const mesh = organMeshes[i];
      const mat = mesh.material as THREE.MeshPhysicalMaterial;
      const info = mesh.userData.organInfo as ZangFuOrganInfo | undefined;
      const baseOpacity = (mesh.userData.baseOpacity as number) || 0.86;
      const baseColor = mesh.userData.baseColor as THREE.Color;

      if (!info) continue;
      const isPaired = info.meridianIds.some((mid) => activeSet.has(mid));

      if (!hasFilter) {
        mat.emissive.setHex(0x000000);
        mat.emissiveIntensity = 0;
        mat.opacity = baseOpacity;
      } else if (isPaired) {
        mat.emissive.copy(baseColor);
        mat.emissiveIntensity = 0.48;
        mat.opacity = Math.min(0.98, baseOpacity + 0.12);
      } else {
        mat.emissive.setHex(0x000000);
        mat.emissiveIntensity = 0;
        mat.opacity = Math.max(0.18, baseOpacity * 0.38);
      }
      mat.needsUpdate = true;
    }
  };

  const setVisible = (visible: boolean) => {
    group.visible = visible;
  };

  const dispose = () => {
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
    group.clear();
  };

  return {
    group,
    organMeshes,
    highlightMeridians,
    setVisible,
    dispose,
  };
}
