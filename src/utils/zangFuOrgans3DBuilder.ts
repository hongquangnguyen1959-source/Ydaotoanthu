import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export interface ZangFuOrganInfo {
  id: string;
  shortLabel: string;
  name: string;
  chineseName: string;
  category: 'Ngũ Tạng (Âm)' | 'Lục Phủ (Dương)' | 'Phủ Kỳ Hằng' | 'Nội Tiết & Tiêu Hóa';
  meridianIds: string[];
  physiology: string;
  clinicalNotes: string;
  baseColor: string;
  focusTarget: [number, number, number];
  focusCameraOffset: [number, number, number];
}

export const ZANG_FU_ORGANS_INFO: Record<string, ZangFuOrganInfo> = {
  // === NGŨ TẠNG + TÂM BÀO (6 TẠNG) ===
  LU: {
    id: 'LU',
    shortLabel: 'Phế',
    name: 'Phế (Hai Lá Phổi & Cây Khí – Phế Quản)',
    chineseName: '肺',
    category: 'Ngũ Tạng (Âm)',
    meridianIds: ['LU'],
    physiology:
      'Chủ khí, ty hô hấp, thông điều thủy đạo, triều bách mạch, chủ bì mao và khai khiếu ra mũi.',
    clinicalNotes:
      'Gồm sụn thanh – khí quản có vòng sụn chữ C, carina chia hai phế quản gốc và các phân thùy phổi giải phẫu thật. Phổi phải 3 thùy (rãnh ngang & rãnh chéo), phổi trái 2 thùy nhường khuyết tim.',
    baseColor: '#e8909d',
    focusTarget: [0, 1.38, 0.05],
    focusCameraOffset: [0, 0.04, 0.70],
  },
  HT: {
    id: 'HT',
    shortLabel: 'Tâm',
    name: 'Tâm (Trái Tim 4 Buồng & Động Mạch Vành)',
    chineseName: '心',
    category: 'Ngũ Tạng (Âm)',
    meridianIds: ['HT', 'PC'],
    physiology:
      'Quân chủ chi quan: chủ huyết mạch, tàng Thần, khai khiếu ra lưỡi, vinh nhuận ra sắc mặt.',
    clinicalNotes:
      'Nằm trong trung thất giữa, mỏm tim chếch xuống trái (+X) ra trước tới khoang liên sườn V. Đầy đủ tâm nhĩ – tâm thất giải phẫu, động mạch vành phải/trái và xoang tĩnh mạch vành.',
    baseColor: '#b92b3a',
    focusTarget: [0.02, 1.35, 0.06],
    focusCameraOffset: [0.06, 0.03, 0.44],
  },
  PC: {
    id: 'PC',
    shortLabel: 'Tâm Bào',
    name: 'Tâm Bào Lạc (Túi Màng Ngoài Tim)',
    chineseName: '心包络',
    category: 'Ngũ Tạng (Âm)',
    meridianIds: ['PC', 'HT'],
    physiology:
      'Lớp màng xơ – thanh mạc bao bọc bảo vệ Tâm tạng, đại diện Tâm tiếp nhận ngoại tà và điều hòa mạch lạc.',
    clinicalNotes:
      'Màng ngoài tim ôm sát đáy, mặt sau và mặt hoành của tim (được mở cửa sổ phía trước để quan sát rõ cơ tim & mạch vành), biểu lý với Tam Tiêu.',
    baseColor: '#d97092',
    focusTarget: [0.02, 1.34, 0.06],
    focusCameraOffset: [0.16, 0.02, 0.45],
  },
  LR: {
    id: 'LR',
    shortLabel: 'Can',
    name: 'Can (Gan Thùy Phải/Trái & Dây Chằng Liềm)',
    chineseName: '肝',
    category: 'Ngũ Tạng (Âm)',
    meridianIds: ['LR'],
    physiology:
      'Chủ sơ tiết điều đạt khí cơ toàn thân, tàng huyết, chủ cân (gân cơ), khai khiếu ra mắt.',
    clinicalNotes:
      'Nằm sát dưới vòm cơ hoành phải (-X), ngăn cách thùy phải lớn và thùy trái thuôn nhọn bởi dây chằng liềm & rãnh cửa gan, bờ dưới ôm cung sườn phải.',
    baseColor: '#7b2822',
    focusTarget: [-0.035, 1.24, 0.06],
    focusCameraOffset: [-0.10, 0.02, 0.54],
  },
  SP: {
    id: 'SP',
    shortLabel: 'Tỳ',
    name: 'Tỳ (Lá Lách & Cuống Mạch Tỳ)',
    chineseName: '脾',
    category: 'Ngũ Tạng (Âm)',
    meridianIds: ['SP'],
    physiology:
      'Hậu thiên chi bản: chủ vận hóa thủy cốc và thủy thấp, thống nhiếp huyết dịch, chủ cơ nhục tứ chi, chủ thăng thanh.',
    clinicalNotes:
      'Tạng đặc hình hạt cà phê có khía bờ trước, ẩn sâu vùng hạ sườn trái (+X) dưới vòm sườn 9–11, liên kết sát đuôi tuyến tụy và đáy dạ dày.',
    baseColor: '#87334c',
    focusTarget: [0.07, 1.24, 0.015],
    focusCameraOffset: [0.40, 0.04, 0.34],
  },
  KI: {
    id: 'KI',
    shortLabel: 'Thận',
    name: 'Thận (Hai Quả Thận, Cuống Mạch & Niệu Quản)',
    chineseName: '腎',
    category: 'Ngũ Tạng (Âm)',
    meridianIds: ['KI'],
    physiology:
      'Tiên thiên chi bản: tàng tinh, chủ thủy, chủ nạp khí, chủ cốt tủy sinh não, khai khiếu ra tai và nhị âm.',
    clinicalNotes:
      'Nằm sau phúc mạc hai bên cột sống T12–L3 với rốn thận, bể thận và hai niệu quản đổ xuống mặt sau bàng quang. Thận phải (-X) thấp hơn thận trái (+X) dưới áp lực gan.',
    baseColor: '#8a2d36',
    focusTarget: [0, 1.16, 0.02],
    focusCameraOffset: [0, 0.04, -0.56],
  },

  // === LỤC PHỦ (6 PHỦ) ===
  GB: {
    id: 'GB',
    shortLabel: 'Đởm',
    name: 'Đởm (Túi Mật & Đường Mật Ngoài Gan)',
    chineseName: '胆',
    category: 'Lục Phủ (Dương)',
    meridianIds: ['GB'],
    physiology:
      'Trung chính chi quan: tàng trữ và bài tiết tinh chất mật dịch hỗ trợ tiêu hóa, chủ quyết đoán, đồng thời thuộc Phủ Kỳ Hằng.',
    clinicalNotes:
      'Túi mật hình quả lê ló đáy dưới bờ trước gan (-X) ngang sụn sườn IX (huyệt Nhật Nguyệt GB-24), nối ống túi mật, ống gan chung và ống mật chủ đổ vào tá tràng.',
    baseColor: '#247f56',
    focusTarget: [-0.055, 1.22, 0.07],
    focusCameraOffset: [-0.14, 0.01, 0.44],
  },
  ST: {
    id: 'ST',
    shortLabel: 'Vị',
    name: 'Vị (Dạ Dày & Khung Tá Tràng)',
    chineseName: '胃',
    category: 'Lục Phủ (Dương)',
    meridianIds: ['ST'],
    physiology:
      'Thái thương chi quan: chủ thu nạp và ngấu nhừ thủy cốc ("Vị dĩ thông giáng vi hòa").',
    clinicalNotes:
      'Hình chữ J đặc trưng với tâm vị, phình vị lớn vồng dưới vòm hoành trái (+X), bờ cong lớn/nhỏ, hang vị môn vị và hành tá tràng.',
    baseColor: '#d48468',
    focusTarget: [0.03, 1.22, 0.06],
    focusCameraOffset: [0.08, 0.03, 0.52],
  },
  SI: {
    id: 'SI',
    shortLabel: 'Tiểu Trường',
    name: 'Tiểu Trường (Các Quai Hỗng – Hồi Tràng)',
    chineseName: '小腸',
    category: 'Lục Phủ (Dương)',
    meridianIds: ['SI'],
    physiology:
      'Thụ thịnh chi quan: tiếp nhận đồ ăn từ Vị, phân biệt thanh trọc để hấp thu tinh chất và đưa cặn xuống Đại Trường / nước xuống Bàng Quang.',
    clinicalNotes:
      'Gồm các quai hỗng tràng – hồi tràng uốn lượn dày đặc trong khung đại tràng quanh vùng rốn (Thiên Xu ST-25, Quan Nguyên CV-4), tận hết ở van hồi manh tràng.',
    baseColor: '#dfa08c',
    focusTarget: [0.01, 1.07, 0.07],
    focusCameraOffset: [0, 0.02, 0.56],
  },
  LI: {
    id: 'LI',
    shortLabel: 'Đại Trường',
    name: 'Đại Trường (Kết Tràng Bướu Phình, Dải Cơ Dọc & Trực Tràng)',
    chineseName: '大腸',
    category: 'Lục Phủ (Dương)',
    meridianIds: ['LI'],
    physiology:
      'Truyền đạo chi quan: tiếp nhận cặn bã từ Tiểu Trường, tái hấp thu thủy dịch và bài tiết phân.',
    clinicalNotes:
      'Đầy đủ manh tràng (-X), đại tràng lên, góc gan, đại tràng ngang, góc lách, đại tràng xuống, đại tràng sigma và trực tràng với các bướu kết tràng (Haustra) rõ nét.',
    baseColor: '#c4836e',
    focusTarget: [0, 1.07, 0.06],
    focusCameraOffset: [0, 0.03, 0.60],
  },
  BL: {
    id: 'BL',
    shortLabel: 'Bàng Quang',
    name: 'Bàng Quang (Túi Chứa Tân Dịch Hạ Tiêu)',
    chineseName: '膀胱',
    category: 'Lục Phủ (Dương)',
    meridianIds: ['BL'],
    physiology:
      'Châu đô chi quan: chứa đựng tân dịch thải trừ (nước tiểu) và nhờ Thận khí hóa để bài tiết ra ngoài.',
    clinicalNotes:
      'Nằm sâu trong khoang tiểu khung ngay sau khớp mu (huyệt Trung Cực CV-3), đáy tiếp nhận hai niệu quản.',
    baseColor: '#d4965b',
    focusTarget: [0, 0.89, 0.06],
    focusCameraOffset: [0, 0.06, 0.46],
  },
  TE: {
    id: 'TE',
    shortLabel: 'Tam Tiêu',
    name: 'Tam Tiêu (Vòm Cơ Hoành & Gân Trung Tâm)',
    chineseName: '三焦',
    category: 'Lục Phủ (Dương)',
    meridianIds: ['TE'],
    physiology:
      'Quyết độc chi quan: tổng quản nguyên khí và lưu thông thủy dịch qua Thượng Tiêu (Tim–Phổi) – Trung Tiêu (Tỳ–Vị) – Hạ Tiêu (Thận–Bàng Quang).',
    clinicalNotes:
      'Vòm cơ hoành hai đỉnh không đối xứng (vòm phải cao hơn trên gan, vòm trái dưới tim) với dải gân trung tâm hình lá chẻ ba và thớ cơ vân tỏa ra cung sườn.',
    baseColor: '#a4569e',
    focusTarget: [0, 1.29, 0.05],
    focusCameraOffset: [0, 0.05, 0.58],
  },

  // === PHỦ KỲ HẰNG & CƠ QUAN NỘI TIẾT - TIÊU HÓA CHỦ CHỐT ===
  BR: {
    id: 'BR',
    shortLabel: 'Não Bộ',
    name: 'Não Bộ (Đại Não Có Hồi/Rãnh Não, Tiểu Não & Thân Não)',
    chineseName: '脑 (髓海)',
    category: 'Phủ Kỳ Hằng',
    meridianIds: ['GV', 'HT', 'KI', 'BL'],
    physiology:
      'Phủ Kỳ Hằng ("Não vi tủy chi hải" — Nguyên Thần chi phủ): tàng chứa tinh tủy do Thận tinh hóa sinh, phối hợp Tâm chủ Thần minh điều khiển tư duy và ngũ quan.',
    clinicalNotes:
      'Nằm gọn trong hộp sọ: hai bán cầu đại não chia rãnh dọc giữa với hồi/rãnh não giải phẫu thật (Sylvius, Rolando), tiểu não có lá tiểu não ngang và cầu não – hành tủy.',
    baseColor: '#e2aeb4',
    focusTarget: [0, 1.75, 0.055],
    focusCameraOffset: [0.22, 0.04, 0.42],
  },
  MAR: {
    id: 'MAR',
    shortLabel: 'Tủy Sống',
    name: 'Tủy Sống, Rễ Thần Kinh Gai & Đuôi Ngựa',
    chineseName: '脊髓',
    category: 'Phủ Kỳ Hằng',
    meridianIds: ['GV', 'KI', 'BL'],
    physiology:
      'Phủ Kỳ Hằng: do Thận tinh sinh Tủy, nuôi dưỡng xương cốt và thông thẳng lên Não qua cột sống Đốc Mạch.',
    clinicalNotes:
      'Chạy chính xác bên trong ống sống (sau thân đốt sống C1–L2) với hai đoạn phình cổ & thắt lưng, rễ thần kinh gai phân đốt, nón tủy và chùm đuôi ngựa xuống xương cùng.',
    baseColor: '#e7cf98',
    focusTarget: [0, 1.34, 0.0],
    focusCameraOffset: [0, 0.05, -0.66],
  },
  VES: {
    id: 'VES',
    shortLabel: 'Mạch Phủ',
    name: 'Mạch Phủ (Hệ Động – Tĩnh Mạch Chủ & Nhánh Tạng)',
    chineseName: '脉 (血府)',
    category: 'Phủ Kỳ Hằng',
    meridianIds: ['HT', 'PC', 'LR', 'LU'],
    physiology:
      'Phủ Kỳ Hằng ("Mạch giả huyết chi phủ"): ống dẫn vận chuyển Khí Huyết toàn thân nhờ Tâm khí đẩy đi và Phế khí triều bách mạch.',
    clinicalNotes:
      'Quai động mạch chủ, thân cánh tay đầu, ĐM cảnh/dưới đòn, ĐM chủ ngực–bụng, ĐM/TM thận, thân tạng – mạc treo – tĩnh mạch cửa gan và hệ TM chủ trên/dưới.',
    baseColor: '#b3394f',
    focusTarget: [0, 1.29, 0.04],
    focusCameraOffset: [0.06, 0.05, 0.64],
  },
  THY: {
    id: 'THY',
    shortLabel: 'Tuyến Giáp',
    name: 'Tuyến Giáp & Sụn Thanh Quản (Giáp – Nhẫn)',
    chineseName: '甲状腺 (瘿)',
    category: 'Nội Tiết & Tiêu Hóa',
    meridianIds: ['ST', 'LR', 'CV', 'TE'],
    physiology:
      'Liên quan vùng Yết hầu ("Anh khí"): chịu chi phối trực tiếp bởi sơ tiết Can Đởm, Vị kinh và Nhâm Mạch; Tây y điều hòa chuyển hóa toàn thân.',
    clinicalNotes:
      'Nằm ngay dưới sụn giáp – thanh quản cổ (ngang Nhân Nghênh ST-9 & Thiên Đột CV-22): hai thùy giáp giàu mạch máu nối bởi eo giáp trước sụn khí quản và thùy tháp nhỏ.',
    baseColor: '#c46552',
    focusTarget: [0, 1.53, 0.07],
    focusCameraOffset: [0.08, 0.02, 0.36],
  },
  ESO: {
    id: 'ESO',
    shortLabel: 'Thực Quản',
    name: 'Thực Quản (Ống Cơ Dẫn Thủy Cốc)',
    chineseName: '食管',
    category: 'Nội Tiết & Tiêu Hóa',
    meridianIds: ['ST', 'CV', 'SP'],
    physiology:
      'Đường thông giáng đầu tiên đưa thủy cốc từ hầu họng qua khe thực quản cơ hoành vào tâm vị Dạ Dày.',
    clinicalNotes:
      'Đi sát phía sau khí quản dọc trước thân đốt sống ngực, xuyên qua lỗ thực quản của cơ hoành đổ vào tâm vị dạ dày.',
    baseColor: '#cc7a70',
    focusTarget: [0, 1.40, 0.04],
    focusCameraOffset: [0.26, 0.02, 0.44],
  },
  PAN: {
    id: 'PAN',
    shortLabel: 'Tuyến Tụy',
    name: 'Tuyến Tụy (Cấu Trúc Tiểu Thùy Đầu – Thân – Đuôi)',
    chineseName: '胰腺',
    category: 'Nội Tiết & Tiêu Hóa',
    meridianIds: ['SP', 'ST'],
    physiology:
      'Trong Đông Y học thuyết Tỳ ("Tán tinh" / Tỳ chủ vận hóa) bao hàm phần lớn chức năng nội tiết (Insulin) và ngoại tiết tiêu hóa của Tuyến Tụy.',
    clinicalNotes:
      'Nằm vắt ngang sau dạ dày với bề mặt chia múi tiểu thùy: đầu tụy + mỏm móc ôm gọn quai tá tràng (-X), thân vắt qua cột sống L1, đuôi áp sát rốn lách (+X).',
    baseColor: '#dca952',
    focusTarget: [0.015, 1.21, 0.04],
    focusCameraOffset: [0.04, 0.02, 0.46],
  },
  ADR: {
    id: 'ADR',
    shortLabel: 'Thượng Thận',
    name: 'Tuyến Thượng Thận (Mệnh Môn Hỏa Hai Bên)',
    chineseName: '肾上腺',
    category: 'Nội Tiết & Tiêu Hóa',
    meridianIds: ['KI', 'GV'],
    physiology:
      'Ứng với Thận Dương & Mệnh Môn Hỏa trong Đông y: tiết Cortisol, Adrenaline, Aldosterone duy trì huyết áp, sức chống đỡ stress và dương khí.',
    clinicalNotes:
      'Tuyến bên phải hình tháp tam giác, tuyến bên trái hình bán nguyệt có rãnh vỏ gấp nếp vàng cam úp sát cực trên hai quả thận (T12–L1).',
    baseColor: '#d49a35',
    focusTarget: [0, 1.22, 0.02],
    focusCameraOffset: [0, 0.04, -0.50],
  },
};

export const ZANG_FU_ORDER: string[] = [
  'LU', 'HT', 'PC', 'LR', 'SP', 'KI',
  'GB', 'ST', 'SI', 'LI', 'BL', 'TE',
  'BR', 'MAR', 'VES', 'THY', 'ESO', 'PAN', 'ADR',
];

export interface ZangFuOrgansRig {
  group: THREE.Group;
  organMeshes: THREE.Mesh[];
  highlightMeridians: (activeIds: string[], focusedOrganId?: string | null) => void;
  setVisible: (visible: boolean) => void;
  dispose: () => void;
}

const COLOR_WHITE = new THREE.Color(0xffffff);

// ============================================================================
// PROCEDURAL HIGH-RES ANATOMICAL TISSUE TEXTURE LIBRARY (Bump + Roughness)
// ============================================================================
type TissueTextureKind = 'brain' | 'lung' | 'parenchyma' | 'serosa' | 'pancreas';

interface OrganTexturePack {
  colorMap: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
  roughnessMap: THREE.CanvasTexture;
}

function fract(v: number): number {
  return v - Math.floor(v);
}

function hash2D(ix: number, iy: number): number {
  return fract(Math.sin(ix * 127.1 + iy * 311.7) * 43758.5453123);
}

function valueNoise2D(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash2D(ix, iy);
  const b = hash2D(ix + 1, iy);
  const c = hash2D(ix, iy + 1);
  const d = hash2D(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

function tileableVoronoiEdge(u: number, v: number, cells: number): number {
  const gx = u * cells;
  const gy = v * cells;
  const ix = Math.floor(gx);
  const iy = Math.floor(gy);
  let f1 = 99;
  let f2 = 99;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const cx = (ix + dx + cells) % cells;
      const cy = (iy + dy + cells) % cells;
      const ox = ix + dx + 0.18 + 0.64 * hash2D(cx * 13, cy * 29);
      const oy = iy + dy + 0.18 + 0.64 * hash2D(cx * 37, cy * 17);
      const dist = Math.hypot(gx - ox, gy - oy);
      if (dist < f1) {
        f2 = f1;
        f1 = dist;
      } else if (dist < f2) {
        f2 = dist;
      }
    }
  }
  return Math.min(1, f2 - f1);
}

function createProceduralTissuePack(kind: TissueTextureKind): OrganTexturePack {
  const size = 512;
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = size;
  colorCanvas.height = size;
  const cCtx = colorCanvas.getContext('2d')!;
  const cImg = cCtx.createImageData(size, size);

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bCtx = bumpCanvas.getContext('2d')!;
  const bImg = bCtx.createImageData(size, size);

  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = size;
  roughCanvas.height = size;
  const rCtx = roughCanvas.getContext('2d')!;
  const rImg = rCtx.createImageData(size, size);

  for (let y = 0; y < size; y++) {
    const v = y / size;
    const tv = v * Math.PI * 2;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const tu = u * Math.PI * 2;
      const idx = (y * size + x) * 4;

      let height = 0.5;
      let rough = 0.4;
      let colR = 1.0;
      let colG = 1.0;
      let colB = 1.0;

      if (kind === 'brain') {
        const warpX = Math.sin(tv * 4 + Math.cos(tu * 3) * 1.1) * 0.85;
        const warpY = Math.cos(tu * 4 - Math.sin(tv * 3) * 1.1) * 0.85;
        const s1 = Math.abs(Math.sin(tu * 6 + warpX + Math.cos(tv * 5 + warpY)));
        const s2 = valueNoise2D(u * 20, v * 20);
        const crest = Math.pow(s1, 0.45);
        // Fine pial capillary network in gyral folds
        const capWave = Math.abs(Math.sin(tu * 11 + Math.sin(tv * 9) * 1.6 + s2 * 2.4));
        const vessel = Math.max(0, 1 - capWave * 9.5);
        height = 0.22 + 0.64 * crest + 0.14 * s2;
        rough = 0.34 + (1 - crest) * 0.30;
        const lum = 0.90 + crest * 0.10 - vessel * 0.16;
        colR = Math.min(1, lum + vessel * 0.08);
        colG = lum - vessel * 0.14;
        colB = lum - vessel * 0.12;
      } else if (kind === 'lung') {
        // Polygonal pulmonary secondary lobule mosaic with realistic anthracotic interlobular septa
        const edgeDist = tileableVoronoiEdge(u, v, 9);
        const microEdge = tileableVoronoiEdge(u, v, 20);
        const septa = edgeDist < 0.095 ? edgeDist / 0.095 : 1.0;
        const grain = valueNoise2D(u * 36, v * 36) * 0.20;
        height = 0.20 + 0.58 * septa + 0.12 * microEdge + grain;
        rough = 0.48 + (1 - septa) * 0.26 + grain * 0.30;
        const septaTint = 0.72 + 0.28 * septa;
        const microTint = 0.92 + 0.08 * microEdge;
        colR = septaTint * microTint;
        colG = (septaTint * 0.96 + 0.02) * microTint;
        colB = (septaTint * 0.98 + 0.01) * microTint;
      } else if (kind === 'pancreas') {
        // Crisp acinar grape-like lobular clusters with interlobular cleft darkening
        const f1 = tileableVoronoiEdge(u, v, 11);
        const f2 = tileableVoronoiEdge(u, v, 24);
        const lob = Math.pow(Math.min(1, f1 * 1.45), 0.52) * 0.68 + Math.min(1, f2 * 1.4) * 0.26;
        height = 0.14 + lob;
        rough = 0.36 + (1 - lob) * 0.28;
        const shade = 0.76 + 0.24 * Math.min(1, lob * 1.1);
        colR = shade;
        colG = shade * 0.96;
        colB = shade * 0.91;
      } else if (kind === 'serosa') {
        // Fine muscle striae + arborizing subserosal capillary vessels
        const fiber =
          0.5 +
          0.26 * Math.sin(tv * 18 + Math.sin(tu * 4) * 1.4) +
          0.16 * Math.sin(tv * 38 - Math.cos(tu * 7) * 0.8);
        const micro = valueNoise2D(u * 28, v * 28);
        const capBranch1 = Math.abs(Math.sin(tu * 9 + Math.cos(tv * 7) * 1.9 + micro * 2.2));
        const capBranch2 = Math.abs(Math.cos(tv * 13 - Math.sin(tu * 11) * 1.5 + micro * 1.8));
        const vessel = Math.max(
          Math.max(0, 1 - capBranch1 * 12.0),
          Math.max(0, 1 - capBranch2 * 14.0) * 0.75
        );
        height = 0.22 + fiber * 0.56 + micro * 0.16 + vessel * 0.08;
        rough = 0.28 + (1 - fiber) * 0.24;
        const baseShade = 0.90 + fiber * 0.10;
        colR = Math.min(1, baseShade + vessel * 0.04);
        colG = Math.max(0.55, baseShade - vessel * 0.20);
        colB = Math.max(0.55, baseShade - vessel * 0.20);
      } else {
        // Glisson / renal capsule micro-lobular parenchymal pattern
        const n1 = valueNoise2D(u * 14, v * 14);
        const n2 = valueNoise2D(u * 36, v * 36);
        const pore = tileableVoronoiEdge(u, v, 20);
        height = 0.28 + n1 * 0.30 + n2 * 0.20 + pore * 0.18;
        rough = 0.22 + (1 - n1) * 0.20 + (1 - pore) * 0.16;
        const shade = 0.84 + 0.10 * n1 + 0.06 * Math.min(1, pore * 1.5);
        colR = shade;
        colG = shade * 0.95;
        colB = shade * 0.94;
      }

      cImg.data[idx] = Math.max(0, Math.min(255, Math.round(colR * 255)));
      cImg.data[idx + 1] = Math.max(0, Math.min(255, Math.round(colG * 255)));
      cImg.data[idx + 2] = Math.max(0, Math.min(255, Math.round(colB * 255)));
      cImg.data[idx + 3] = 255;

      const bVal = Math.max(0, Math.min(255, Math.round(height * 255)));
      const rVal = Math.max(0, Math.min(255, Math.round(rough * 255)));
      bImg.data[idx] = bVal;
      bImg.data[idx + 1] = bVal;
      bImg.data[idx + 2] = bVal;
      bImg.data[idx + 3] = 255;

      rImg.data[idx] = rVal;
      rImg.data[idx + 1] = rVal;
      rImg.data[idx + 2] = rVal;
      rImg.data[idx + 3] = 255;
    }
  }

  cCtx.putImageData(cImg, 0, 0);
  bCtx.putImageData(bImg, 0, 0);
  rCtx.putImageData(rImg, 0, 0);

  const rep = kind === 'lung' ? 3.8 : 4.2;

  const colorMap = new THREE.CanvasTexture(colorCanvas);
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.wrapS = THREE.RepeatWrapping;
  colorMap.wrapT = THREE.RepeatWrapping;
  colorMap.repeat.set(rep, rep);

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.set(rep, rep);

  const roughnessMap = new THREE.CanvasTexture(roughCanvas);
  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.repeat.set(rep, rep);

  return { colorMap, bumpMap, roughnessMap };
}

// ============================================================================
// WELDED NORMAL + LAPLACIAN SULCUS CURVATURE ENGINE + SEAMLESS UV PROJECTION
// ============================================================================

/**
 * Welds coincident seams, performs optional light Taubin smoothing (never shrinking fine scans),
 * computes area-weighted normals, estimates signed local mean curvature (`cavity` in [-1,+1]),
 * and synthesizes seam-free organic UV coordinates for micro-tissue bump & roughness sampling.
 */
function smoothAndAnalyzeOrganGeometry(
  geo: THREE.BufferGeometry,
  smoothIterations = 0,
  curvatureGain = 4.2
): Float32Array {
  const posAttr = geo.attributes.position;
  if (!posAttr) return new Float32Array(0);
  const vCount = posAttr.count;

  const precision = 20000; // 0.05mm weld tolerance
  const map = new Map<number, number>();
  const repOf = new Int32Array(vCount);
  const reps: number[] = [];

  for (let i = 0; i < vCount; i++) {
    const ix = Math.round(posAttr.getX(i) * precision) + 65536;
    const iy = Math.round(posAttr.getY(i) * precision) + 65536;
    const iz = Math.round(posAttr.getZ(i) * precision) + 65536;
    const key = (ix * 131072 + iy) * 131072 + iz;
    let r = map.get(key);
    if (r === undefined) {
      r = reps.length;
      map.set(key, r);
      reps.push(i);
    }
    repOf[i] = r;
  }

  const uCount = reps.length;
  const uPos = new Float32Array(uCount * 3);
  for (let r = 0; r < uCount; r++) {
    const idx = reps[r];
    uPos[r * 3] = posAttr.getX(idx);
    uPos[r * 3 + 1] = posAttr.getY(idx);
    uPos[r * 3 + 2] = posAttr.getZ(idx);
  }

  const adj: number[][] = Array.from({ length: uCount }, () => []);
  const indexAttr = geo.index;
  const triCount = indexAttr ? indexAttr.count / 3 : Math.floor(vCount / 3);
  const addEdge = (a: number, b: number) => {
    const listA = adj[a];
    for (let k = 0; k < listA.length; k++) {
      if (listA[k] === b) return;
    }
    listA.push(b);
    adj[b].push(a);
  };

  for (let t = 0; t < triCount; t++) {
    const i0 = indexAttr ? indexAttr.getX(t * 3) : t * 3;
    const i1 = indexAttr ? indexAttr.getX(t * 3 + 1) : t * 3 + 1;
    const i2 = indexAttr ? indexAttr.getX(t * 3 + 2) : t * 3 + 2;
    const r0 = repOf[i0];
    const r1 = repOf[i1];
    const r2 = repOf[i2];
    if (r0 !== r1) addEdge(r0, r1);
    if (r1 !== r2) addEdge(r1, r2);
    if (r2 !== r0) addEdge(r2, r0);
  }

  if (smoothIterations > 0) {
    const tempPos = new Float32Array(uCount * 3);
    const applyStep = (src: Float32Array, dst: Float32Array, weight: number) => {
      for (let r = 0; r < uCount; r++) {
        const nbs = adj[r];
        const len = nbs.length;
        const r3 = r * 3;
        if (len < 2) {
          dst[r3] = src[r3];
          dst[r3 + 1] = src[r3 + 1];
          dst[r3 + 2] = src[r3 + 2];
          continue;
        }
        let sx = 0;
        let sy = 0;
        let sz = 0;
        for (let k = 0; k < len; k++) {
          const nb3 = nbs[k] * 3;
          sx += src[nb3];
          sy += src[nb3 + 1];
          sz += src[nb3 + 2];
        }
        const inv = 1 / len;
        dst[r3] = src[r3] + weight * (sx * inv - src[r3]);
        dst[r3 + 1] = src[r3 + 1] + weight * (sy * inv - src[r3 + 1]);
        dst[r3 + 2] = src[r3 + 2] + weight * (sz * inv - src[r3 + 2]);
      }
    };
    const lambda = 0.30;
    const mu = -0.315;
    for (let iter = 0; iter < smoothIterations; iter++) {
      applyStep(uPos, tempPos, lambda);
      applyStep(tempPos, uPos, mu);
    }
    for (let i = 0; i < vCount; i++) {
      const r3 = repOf[i] * 3;
      posAttr.setXYZ(i, uPos[r3], uPos[r3 + 1], uPos[r3 + 2]);
    }
    posAttr.needsUpdate = true;
  }

  // Welded area-weighted smooth normals
  const uNorm = new Float32Array(uCount * 3);
  const pA = new THREE.Vector3();
  const pB = new THREE.Vector3();
  const pC = new THREE.Vector3();
  const cb = new THREE.Vector3();
  const ab = new THREE.Vector3();

  for (let t = 0; t < triCount; t++) {
    const i0 = indexAttr ? indexAttr.getX(t * 3) : t * 3;
    const i1 = indexAttr ? indexAttr.getX(t * 3 + 1) : t * 3 + 1;
    const i2 = indexAttr ? indexAttr.getX(t * 3 + 2) : t * 3 + 2;
    const r0 = repOf[i0];
    const r1 = repOf[i1];
    const r2 = repOf[i2];

    pA.set(uPos[r0 * 3], uPos[r0 * 3 + 1], uPos[r0 * 3 + 2]);
    pB.set(uPos[r1 * 3], uPos[r1 * 3 + 1], uPos[r1 * 3 + 2]);
    pC.set(uPos[r2 * 3], uPos[r2 * 3 + 1], uPos[r2 * 3 + 2]);

    cb.subVectors(pC, pB);
    ab.subVectors(pA, pB);
    cb.cross(ab);

    uNorm[r0 * 3] += cb.x;
    uNorm[r0 * 3 + 1] += cb.y;
    uNorm[r0 * 3 + 2] += cb.z;
    uNorm[r1 * 3] += cb.x;
    uNorm[r1 * 3 + 1] += cb.y;
    uNorm[r1 * 3 + 2] += cb.z;
    uNorm[r2 * 3] += cb.x;
    uNorm[r2 * 3 + 1] += cb.y;
    uNorm[r2 * 3 + 2] += cb.z;
  }

  for (let r = 0; r < uCount; r++) {
    const r3 = r * 3;
    const len = Math.hypot(uNorm[r3], uNorm[r3 + 1], uNorm[r3 + 2]) || 1;
    uNorm[r3] /= len;
    uNorm[r3 + 1] /= len;
    uNorm[r3 + 2] /= len;
  }

  const normals = new Float32Array(vCount * 3);
  for (let i = 0; i < vCount; i++) {
    const r3 = repOf[i] * 3;
    normals[i * 3] = uNorm[r3];
    normals[i * 3 + 1] = uNorm[r3 + 1];
    normals[i * 3 + 2] = uNorm[r3 + 2];
  }
  geo.setAttribute('normal', new THREE.BufferAttribute(normals, 3));

  // Seam-free continuous world-metric UV projection for micro-bump & roughness textures (~4cm repeat scale)
  if (!geo.attributes.uv) {
    const uvs = new Float32Array(vCount * 2);
    const uvScale = 18.0;
    for (let i = 0; i < vCount; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const z = posAttr.getZ(i);
      uvs[i * 2] = (x * 0.88 + z * 0.48) * uvScale;
      uvs[i * 2 + 1] = (y * 0.92 - z * 0.36) * uvScale;
    }
    geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  }

  // Laplacian local mean curvature in [-1, +1] (negative = sulci/fissures/crevices, positive = gyri/lobes)
  const cavity = new Float32Array(vCount);
  const uCavity = new Float32Array(uCount);
  for (let r = 0; r < uCount; r++) {
    const nbs = adj[r];
    const len = nbs.length;
    if (len < 2) continue;
    const r3 = r * 3;
    let dx = 0;
    let dy = 0;
    let dz = 0;
    let avgEdge = 0;
    for (let k = 0; k < len; k++) {
      const nb3 = nbs[k] * 3;
      const ex = uPos[nb3] - uPos[r3];
      const ey = uPos[nb3 + 1] - uPos[r3 + 1];
      const ez = uPos[nb3 + 2] - uPos[r3 + 2];
      dx += ex;
      dy += ey;
      dz += ez;
      avgEdge += Math.hypot(ex, ey, ez);
    }
    const inv = 1 / len;
    dx *= inv;
    dy *= inv;
    dz *= inv;
    avgEdge = Math.max(0.0005, avgEdge * inv);
    const dot = dx * uNorm[r3] + dy * uNorm[r3 + 1] + dz * uNorm[r3 + 2];
    uCavity[r] = Math.max(-1, Math.min(1, (-dot / avgEdge) * curvatureGain));
  }
  for (let i = 0; i < vCount; i++) {
    cavity[i] = uCavity[repOf[i]];
  }
  return cavity;
}

interface TissueVisualSpec {
  organKey: string;
  baseHex: string;
  ridgeHex: string;
  sulcusHex: string;
  sulcusStrength: number;
  ridgeStrength: number;
  mottleAmp: number;
  roughness: number;
  clearcoat: number;
  bumpScale: number;
  sheenColor: string;
  packKey: TissueTextureKind;
  smoothIters: number;
  side?: THREE.Side;
  envIntensity?: number;
}

const GLB_TISSUE_SPECS: Record<string, TissueVisualSpec> = {
  organ_BR_cortex: {
    organKey: 'BR',
    baseHex: '#d69d9b',
    ridgeHex: '#ecc0ba',
    sulcusHex: '#6e2e38',
    sulcusStrength: 0.90,
    ridgeStrength: 0.36,
    mottleAmp: 0.022,
    roughness: 0.40,
    clearcoat: 0.32,
    bumpScale: 0.0026,
    sheenColor: '#f2ccc8',
    packKey: 'brain',
    smoothIters: 0,
    envIntensity: 0.48,
  },
  organ_BR_cerebellum: {
    organKey: 'BR',
    baseHex: '#c7858c',
    ridgeHex: '#dfabb1',
    sulcusHex: '#6b303b',
    sulcusStrength: 0.80,
    ridgeStrength: 0.30,
    mottleAmp: 0.018,
    roughness: 0.42,
    clearcoat: 0.26,
    bumpScale: 0.0022,
    sheenColor: '#e8c4c8',
    packKey: 'brain',
    smoothIters: 0,
    envIntensity: 0.45,
  },
  organ_BR_stem: {
    organKey: 'BR',
    baseHex: '#dfc5ba',
    ridgeHex: '#eedbd2',
    sulcusHex: '#a38076',
    sulcusStrength: 0.55,
    ridgeStrength: 0.25,
    mottleAmp: 0.012,
    roughness: 0.40,
    clearcoat: 0.28,
    bumpScale: 0.0014,
    sheenColor: '#f0dfd5',
    packKey: 'serosa',
    smoothIters: 0,
    envIntensity: 0.45,
  },
  organ_MAR: {
    organKey: 'MAR',
    baseHex: '#dfc283',
    ridgeHex: '#f0d8a1',
    sulcusHex: '#9e8048',
    sulcusStrength: 0.62,
    ridgeStrength: 0.28,
    mottleAmp: 0.015,
    roughness: 0.40,
    clearcoat: 0.26,
    bumpScale: 0.0015,
    sheenColor: '#f2e1b6',
    packKey: 'serosa',
    smoothIters: 0,
    envIntensity: 0.42,
  },
  organ_LU_lung: {
    organKey: 'LU',
    baseHex: '#c96f7c',
    ridgeHex: '#df8c98',
    sulcusHex: '#6b2d3b',
    sulcusStrength: 0.78,
    ridgeStrength: 0.34,
    mottleAmp: 0.042,
    roughness: 0.54,
    clearcoat: 0.14,
    bumpScale: 0.0032,
    sheenColor: '#efc4ca',
    packKey: 'lung',
    smoothIters: 1,
    side: THREE.FrontSide,
    envIntensity: 0.38,
  },
  organ_LU_cartilage: {
    organKey: 'LU',
    baseHex: '#b5c4cc',
    ridgeHex: '#d2dfe6',
    sulcusHex: '#6b7e88',
    sulcusStrength: 0.64,
    ridgeStrength: 0.30,
    mottleAmp: 0.012,
    roughness: 0.34,
    clearcoat: 0.32,
    bumpScale: 0.0012,
    sheenColor: '#dcebf2',
    packKey: 'serosa',
    smoothIters: 0,
    side: THREE.DoubleSide,
    envIntensity: 0.50,
  },
  organ_LU_trachea: {
    organKey: 'LU',
    baseHex: '#ba686e',
    ridgeHex: '#d4898e',
    sulcusHex: '#7d383e',
    sulcusStrength: 0.60,
    ridgeStrength: 0.26,
    mottleAmp: 0.016,
    roughness: 0.40,
    clearcoat: 0.28,
    bumpScale: 0.0016,
    sheenColor: '#eab8bc',
    packKey: 'serosa',
    smoothIters: 0,
    side: THREE.DoubleSide,
    envIntensity: 0.45,
  },
  organ_HT_myo: {
    organKey: 'HT',
    baseHex: '#9e202c',
    ridgeHex: '#c23643',
    sulcusHex: '#4f0c13',
    sulcusStrength: 0.76,
    ridgeStrength: 0.34,
    mottleAmp: 0.024,
    roughness: 0.32,
    clearcoat: 0.52,
    bumpScale: 0.0020,
    sheenColor: '#eba8ae',
    packKey: 'serosa',
    smoothIters: 0,
    side: THREE.FrontSide,
    envIntensity: 0.58,
  },
  organ_HT_atria: {
    organKey: 'HT',
    baseHex: '#7d1a2d',
    ridgeHex: '#a12940',
    sulcusHex: '#420a15',
    sulcusStrength: 0.70,
    ridgeStrength: 0.30,
    mottleAmp: 0.020,
    roughness: 0.34,
    clearcoat: 0.48,
    bumpScale: 0.0016,
    sheenColor: '#de9ba8',
    packKey: 'serosa',
    smoothIters: 0,
    side: THREE.FrontSide,
    envIntensity: 0.54,
  },
  organ_HT_artery: {
    organKey: 'HT',
    baseHex: '#c71e2c',
    ridgeHex: '#e33b49',
    sulcusHex: '#700c14',
    sulcusStrength: 0.54,
    ridgeStrength: 0.28,
    mottleAmp: 0.010,
    roughness: 0.28,
    clearcoat: 0.56,
    bumpScale: 0.0011,
    sheenColor: '#f5b0b6',
    packKey: 'serosa',
    smoothIters: 0,
    envIntensity: 0.58,
  },
  organ_HT_vein: {
    organKey: 'HT',
    baseHex: '#2b5299',
    ridgeHex: '#4672bd',
    sulcusHex: '#142c57',
    sulcusStrength: 0.54,
    ridgeStrength: 0.28,
    mottleAmp: 0.010,
    roughness: 0.30,
    clearcoat: 0.50,
    bumpScale: 0.0011,
    sheenColor: '#a4bfe8',
    packKey: 'serosa',
    smoothIters: 0,
    envIntensity: 0.55,
  },
  organ_VES_artery: {
    organKey: 'VES',
    baseHex: '#ba1f2c',
    ridgeHex: '#d63846',
    sulcusHex: '#660c14',
    sulcusStrength: 0.54,
    ridgeStrength: 0.28,
    mottleAmp: 0.012,
    roughness: 0.30,
    clearcoat: 0.52,
    bumpScale: 0.0012,
    sheenColor: '#f0b0b5',
    packKey: 'serosa',
    smoothIters: 0,
    side: THREE.DoubleSide,
    envIntensity: 0.55,
  },
  organ_VES_vein: {
    organKey: 'VES',
    baseHex: '#2a5096',
    ridgeHex: '#436ebe',
    sulcusHex: '#132a54',
    sulcusStrength: 0.54,
    ridgeStrength: 0.28,
    mottleAmp: 0.012,
    roughness: 0.32,
    clearcoat: 0.48,
    bumpScale: 0.0012,
    sheenColor: '#a6c0eb',
    packKey: 'serosa',
    smoothIters: 0,
    side: THREE.DoubleSide,
    envIntensity: 0.52,
  },
  organ_LR_liver: {
    organKey: 'LR',
    baseHex: '#7f2419',
    ridgeHex: '#9e392c',
    sulcusHex: '#3d0c07',
    sulcusStrength: 0.78,
    ridgeStrength: 0.32,
    mottleAmp: 0.024,
    roughness: 0.26,
    clearcoat: 0.58,
    bumpScale: 0.0018,
    sheenColor: '#d48d85',
    packKey: 'parenchyma',
    smoothIters: 1,
    envIntensity: 0.60,
  },
  organ_LR_ligament: {
    organKey: 'LR',
    baseHex: '#dfd1c5',
    ridgeHex: '#efe5dc',
    sulcusHex: '#a39182',
    sulcusStrength: 0.52,
    ridgeStrength: 0.24,
    mottleAmp: 0.012,
    roughness: 0.38,
    clearcoat: 0.36,
    bumpScale: 0.0012,
    sheenColor: '#f5ece4',
    packKey: 'serosa',
    smoothIters: 0,
    side: THREE.DoubleSide,
    envIntensity: 0.45,
  },
  organ_GB: {
    organKey: 'GB',
    baseHex: '#1b6643',
    ridgeHex: '#2d8a5e',
    sulcusHex: '#0a3320',
    sulcusStrength: 0.66,
    ridgeStrength: 0.30,
    mottleAmp: 0.020,
    roughness: 0.26,
    clearcoat: 0.58,
    bumpScale: 0.0015,
    sheenColor: '#8cd4b0',
    packKey: 'serosa',
    smoothIters: 0,
    side: THREE.DoubleSide,
    envIntensity: 0.58,
  },
  organ_ST: {
    organKey: 'ST',
    baseHex: '#b85c4b',
    ridgeHex: '#d47e6d',
    sulcusHex: '#612219',
    sulcusStrength: 0.80,
    ridgeStrength: 0.34,
    mottleAmp: 0.026,
    roughness: 0.36,
    clearcoat: 0.30,
    bumpScale: 0.0024,
    sheenColor: '#f0beb2',
    packKey: 'serosa',
    smoothIters: 0,
    side: THREE.DoubleSide,
    envIntensity: 0.45,
  },
  organ_PAN: {
    organKey: 'PAN',
    baseHex: '#c49135',
    ridgeHex: '#e3b55b',
    sulcusHex: '#734d11',
    sulcusStrength: 0.86,
    ridgeStrength: 0.36,
    mottleAmp: 0.030,
    roughness: 0.42,
    clearcoat: 0.28,
    bumpScale: 0.0028,
    sheenColor: '#edd095',
    packKey: 'pancreas',
    smoothIters: 0,
    envIntensity: 0.42,
  },
  organ_SP: {
    organKey: 'SP',
    baseHex: '#6b1b35',
    ridgeHex: '#8c2c4b',
    sulcusHex: '#380918',
    sulcusStrength: 0.72,
    ridgeStrength: 0.30,
    mottleAmp: 0.022,
    roughness: 0.28,
    clearcoat: 0.54,
    bumpScale: 0.0018,
    sheenColor: '#cf91a5',
    packKey: 'parenchyma',
    smoothIters: 1,
    envIntensity: 0.56,
  },
  organ_KI_kidney: {
    organKey: 'KI',
    baseHex: '#8a2b32',
    ridgeHex: '#ad464e',
    sulcusHex: '#4a1015',
    sulcusStrength: 0.74,
    ridgeStrength: 0.32,
    mottleAmp: 0.022,
    roughness: 0.26,
    clearcoat: 0.55,
    bumpScale: 0.0018,
    sheenColor: '#db9399',
    packKey: 'parenchyma',
    smoothIters: 1,
    envIntensity: 0.58,
  },
  organ_KI_ureter: {
    organKey: 'KI',
    baseHex: '#c7887f',
    ridgeHex: '#dba59d',
    sulcusHex: '#8a4e46',
    sulcusStrength: 0.55,
    ridgeStrength: 0.26,
    mottleAmp: 0.012,
    roughness: 0.38,
    clearcoat: 0.34,
    bumpScale: 0.0014,
    sheenColor: '#ebc8c3',
    packKey: 'serosa',
    smoothIters: 0,
    envIntensity: 0.45,
  },
  organ_LI: {
    organKey: 'LI',
    baseHex: '#b36b58',
    ridgeHex: '#cf8b76',
    sulcusHex: '#5e291e',
    sulcusStrength: 0.92,
    ridgeStrength: 0.38,
    mottleAmp: 0.028,
    roughness: 0.38,
    clearcoat: 0.28,
    bumpScale: 0.0024,
    sheenColor: '#e8bab0',
    packKey: 'serosa',
    smoothIters: 0,
    side: THREE.DoubleSide,
    envIntensity: 0.44,
  },
  organ_SI: {
    organKey: 'SI',
    baseHex: '#c77a68',
    ridgeHex: '#df9987',
    sulcusHex: '#6b2c22',
    sulcusStrength: 0.90,
    ridgeStrength: 0.36,
    mottleAmp: 0.026,
    roughness: 0.36,
    clearcoat: 0.28,
    bumpScale: 0.0022,
    sheenColor: '#edc0b5',
    packKey: 'serosa',
    smoothIters: 0,
    side: THREE.DoubleSide,
    envIntensity: 0.44,
  },
  organ_BL: {
    organKey: 'BL',
    baseHex: '#c27948',
    ridgeHex: '#db9667',
    sulcusHex: '#78401a',
    sulcusStrength: 0.68,
    ridgeStrength: 0.30,
    mottleAmp: 0.018,
    roughness: 0.34,
    clearcoat: 0.36,
    bumpScale: 0.0018,
    sheenColor: '#edc29f',
    packKey: 'serosa',
    smoothIters: 1,
    side: THREE.DoubleSide,
    envIntensity: 0.48,
  },
};

function applyAnatomicalOrganVertexColors(
  geo: THREE.BufferGeometry,
  spec: TissueVisualSpec,
  cavity: Float32Array
): void {
  const posAttr = geo.attributes.position;
  const normAttr = geo.attributes.normal;
  const vCount = posAttr.count;
  const colors = new Float32Array(vCount * 3);

  const cBase = new THREE.Color(spec.baseHex);
  const cRidge = new THREE.Color(spec.ridgeHex);
  const cSulcus = new THREE.Color(spec.sulcusHex);
  const cPialVein = new THREE.Color('#8f3442');
  const tmp = new THREE.Color();

  for (let i = 0; i < vCount; i++) {
    const x = posAttr.getX(i);
    const y = posAttr.getY(i);
    const z = posAttr.getZ(i);
    const ny = normAttr ? normAttr.getY(i) : 0;
    const nz = normAttr ? normAttr.getZ(i) : 0;
    const cav = cavity[i] || 0;

    tmp.copy(cBase);

    if (cav < 0) {
      tmp.lerp(cSulcus, Math.min(0.88, -cav * spec.sulcusStrength));
    } else if (cav > 0) {
      tmp.lerp(cRidge, Math.min(0.65, cav * spec.ridgeStrength));
    }

    // Subtle organic vascular / lobular surface variation
    if (spec.mottleAmp > 0) {
      const mottle =
        Math.sin(x * 165 + y * 115 + z * 145) *
        Math.cos(y * 195 - z * 135) *
        spec.mottleAmp;
      tmp.offsetHSL(0, 0, mottle);
    }

    // Extra deep sulcal capillary tint for brain sulci & pulmonary lobar fissures
    if (spec.organKey === 'BR' && cav < -0.38) {
      tmp.lerp(cPialVein, 0.24);
    }
    if (spec.organKey === 'LU' && Math.abs(x) < 0.036) {
      // Slightly deeper plum-pink near medial pulmonary hilum
      tmp.lerp(cSulcus, (1 - Math.abs(x) / 0.036) * 0.25);
    }

    // Soft natural underside & posterior self-ambient occlusion
    const ao = (ny < 0 ? -ny * 0.09 : 0) + (nz < 0 ? -nz * 0.06 : 0);
    tmp.multiplyScalar(1 - ao);

    colors[i * 3] = tmp.r;
    colors[i * 3 + 1] = tmp.g;
    colors[i * 3 + 2] = tmp.b;
  }

  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
}

// ============================================================================
// SURGICAL PROCEDURAL HELPERS FOR COMPLEMENTARY ORGANS (THY, ESO, TE, ADR, PC)
// ============================================================================
function buildSweptOrganTube(
  points: THREE.Vector3[],
  tubularSegments: number,
  radialSegments: number,
  radiusAt: (t: number, angle: number, pos: THREE.Vector3) => [number, number],
  colorAt: (
    t: number,
    angle: number,
    pos: THREE.Vector3,
    radialNorm: THREE.Vector3,
    outColor: THREE.Color
  ) => void,
  capEnds = true
): THREE.BufferGeometry {
  const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal');
  const ringCount = tubularSegments + 1;
  const stride = radialSegments + 1;

  const centers: THREE.Vector3[] = [];
  const tangents: THREE.Vector3[] = [];
  for (let i = 0; i < ringCount; i++) {
    const t = i / tubularSegments;
    centers.push(curve.getPointAt(t));
    tangents.push(curve.getTangentAt(t).normalize());
  }

  const normals: THREE.Vector3[] = [];
  const binormals: THREE.Vector3[] = [];
  const ref = Math.abs(tangents[0].y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
  const n0 = new THREE.Vector3().crossVectors(tangents[0], ref).normalize();
  const b0 = new THREE.Vector3().crossVectors(tangents[0], n0).normalize();
  normals.push(n0);
  binormals.push(b0);

  const rotAxis = new THREE.Vector3();
  const q = new THREE.Quaternion();
  for (let i = 1; i < ringCount; i++) {
    const prevT = tangents[i - 1];
    const currT = tangents[i];
    const dot = THREE.MathUtils.clamp(prevT.dot(currT), -1, 1);
    const prevN = normals[i - 1].clone();
    if (dot < 0.99999) {
      rotAxis.crossVectors(prevT, currT);
      if (rotAxis.lengthSq() > 1e-10) {
        rotAxis.normalize();
        q.setFromAxisAngle(rotAxis, Math.acos(dot));
        prevN.applyQuaternion(q).normalize();
      }
    }
    const currB = new THREE.Vector3().crossVectors(currT, prevN).normalize();
    normals.push(prevN);
    binormals.push(currB);
  }

  const positions: number[] = [];
  const uvs: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];

  const vPos = new THREE.Vector3();
  const rDir = new THREE.Vector3();
  const cTmp = new THREE.Color();

  for (let i = 0; i < ringCount; i++) {
    const t = i / tubularSegments;
    const c = centers[i];
    const N = normals[i];
    const B = binormals[i];
    const endTaper = capEnds
      ? i === 0 || i === tubularSegments
        ? 0.08
        : i === 1 || i === tubularSegments - 1
          ? 0.72
          : 1.0
      : 1.0;

    for (let j = 0; j <= radialSegments; j++) {
      const uFrac = j / radialSegments;
      const angle = uFrac * Math.PI * 2;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      rDir.set(N.x * cosA + B.x * sinA, N.y * cosA + B.y * sinA, N.z * cosA + B.z * sinA);
      const [rx, ry] = radiusAt(t, angle, c);
      const ox = (N.x * cosA * rx + B.x * sinA * ry) * endTaper;
      const oy = (N.y * cosA * rx + B.y * sinA * ry) * endTaper;
      const oz = (N.z * cosA * rx + B.z * sinA * ry) * endTaper;

      vPos.set(c.x + ox, c.y + oy, c.z + oz);
      positions.push(vPos.x, vPos.y, vPos.z);
      uvs.push(uFrac * 2, t * 4);

      colorAt(t, angle, vPos, rDir, cTmp);
      colors.push(cTmp.r, cTmp.g, cTmp.b);
    }
  }

  for (let i = 0; i < tubularSegments; i++) {
    for (let j = 0; j < radialSegments; j++) {
      const a = i * stride + j;
      const b = (i + 1) * stride + j;
      const c = (i + 1) * stride + (j + 1);
      const d = i * stride + (j + 1);
      indices.push(a, b, d, b, c, d);
    }
  }

  if (capEnds) {
    const startCenterIdx = positions.length / 3;
    positions.push(centers[0].x, centers[0].y, centers[0].z);
    uvs.push(0.5, 0);
    colorAt(0, 0, centers[0], tangents[0].clone().negate(), cTmp);
    colors.push(cTmp.r, cTmp.g, cTmp.b);
    for (let j = 0; j < radialSegments; j++) {
      indices.push(startCenterIdx, j + 1, j);
    }
    const lastOffset = tubularSegments * stride;
    const endCenterIdx = positions.length / 3;
    const lastC = centers[tubularSegments];
    positions.push(lastC.x, lastC.y, lastC.z);
    uvs.push(0.5, 1);
    colorAt(1, 0, lastC, tangents[tubularSegments], cTmp);
    colors.push(cTmp.r, cTmp.g, cTmp.b);
    for (let j = 0; j < radialSegments; j++) {
      indices.push(endCenterIdx, lastOffset + j, lastOffset + j + 1);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.setIndex(indices);
  smoothAndAnalyzeOrganGeometry(geo, 0, 3.0);
  return geo;
}

function colorizeSphereOrgan(
  rx: number,
  ry: number,
  rz: number,
  deformer: (x: number, y: number, z: number, nx: number, ny: number, nz: number) => [number, number, number],
  colorer: (nx: number, ny: number, nz: number, x: number, y: number, z: number, outColor: THREE.Color) => void,
  widthSeg = 32,
  heightSeg = 24
): THREE.BufferGeometry {
  const geo = new THREE.SphereGeometry(1, widthSeg, heightSeg);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const tmpColor = new THREE.Color();

  for (let i = 0; i < pos.count; i++) {
    const nx = pos.getX(i);
    const ny = pos.getY(i);
    const nz = pos.getZ(i);
    const [dx, dy, dz] = deformer(nx * rx, ny * ry, nz * rz, nx, ny, nz);
    pos.setXYZ(i, dx, dy, dz);

    colorer(nx, ny, nz, dx, dy, dz, tmpColor);
    colors[i * 3] = tmpColor.r;
    colors[i * 3 + 1] = tmpColor.g;
    colors[i * 3 + 2] = tmpColor.b;
  }
  pos.needsUpdate = true;
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  smoothAndAnalyzeOrganGeometry(geo, 0, 3.2);
  return geo;
}

// ============================================================================
// CACHED VISCERA GLB TEMPLATE + COMPLEMENTARY BUILDER
// ============================================================================
interface CachedTemplateMesh {
  geometry: THREE.BufferGeometry;
  organKey: string;
  spec: TissueVisualSpec;
}

let cachedGlbMeshes: CachedTemplateMesh[] | null = null;
let cachedPackSet: Record<TissueTextureKind, OrganTexturePack> | null = null;
let loadingCallbacks: Array<() => void> | null = null;

function getSharedTexturePacks(): Record<TissueTextureKind, OrganTexturePack> {
  if (!cachedPackSet) {
    cachedPackSet = {
      brain: createProceduralTissuePack('brain'),
      lung: createProceduralTissuePack('lung'),
      parenchyma: createProceduralTissuePack('parenchyma'),
      serosa: createProceduralTissuePack('serosa'),
      pancreas: createProceduralTissuePack('pancreas'),
    };
  }
  return cachedPackSet;
}

function loadVisceraTemplateOnce(onReady: () => void): void {
  if (cachedGlbMeshes) {
    onReady();
    return;
  }
  if (loadingCallbacks) {
    loadingCallbacks.push(onReady);
    return;
  }
  loadingCallbacks = [onReady];

  const loader = new GLTFLoader();
  loader.load(
    '/models/viscera-organs.glb',
    (gltf) => {
      const processed: CachedTemplateMesh[] = [];
      gltf.scene.traverse((child) => {
        if (!(child as THREE.Mesh).isMesh) return;
        const mesh = child as THREE.Mesh;
        const geo = mesh.geometry;
        if (!geo || !geo.attributes.position) return;

        // Material or mesh name starts with 'organ_...'
        const matName =
          !Array.isArray(mesh.material) && mesh.material?.name ? mesh.material.name : '';
        const rawTag = matName.startsWith('organ_')
          ? matName
          : (mesh.name || mesh.parent?.name || '').replace(/_\d+$/, '');
        const spec = GLB_TISSUE_SPECS[rawTag];
        if (!spec) return;

        mesh.updateWorldMatrix(true, false);
        if (!mesh.matrixWorld.equals(new THREE.Matrix4())) {
          geo.applyMatrix4(mesh.matrixWorld);
        }

        // Smooth anatomical containment inside bony thoracic cage & true pelvis (prevents bone clipping or protrusion)
        const rampDown = (v: number, low: number, high: number) =>
          1 - THREE.MathUtils.smoothstep(v, low, high);

        if (rawTag === 'organ_LU_cartilage' || rawTag === 'organ_LU_trachea') {
          const p = geo.attributes.position;
          for (let i = 0; i < p.count; i++) {
            const x = p.getX(i);
            const y = p.getY(i);
            let z = p.getZ(i);
            if (y > 1.43) {
              const neckT = THREE.MathUtils.smoothstep(y, 1.43, 1.525);
              z -= 0.0155 * neckT;
              if (rawTag === 'organ_LU_cartilage' && y > 1.52 && z > 0.054) {
                z = 0.054 + (z - 0.054) * 0.78;
              }
              p.setXYZ(i, x, y, z);
            }
          }
          p.needsUpdate = true;
        } else if (rawTag === 'organ_BL') {
          // Seat urinary bladder inside retropubic true pelvis posterior to pubic symphysis and above pelvic floor
          const p = geo.attributes.position;
          for (let i = 0; i < p.count; i++) {
            const x = p.getX(i);
            const y = p.getY(i);
            const z = p.getZ(i);
            p.setXYZ(
              i,
              (x + 0.0086) * 0.85,
              0.903 + (y - 0.883) * 0.86,
              0.015 + (z - 0.052) * 0.76
            );
          }
          p.needsUpdate = true;
        } else if (rawTag === 'organ_KI_ureter') {
          // Keep distal ureters connected cleanly into the posterolateral bladder base
          const p = geo.attributes.position;
          for (let i = 0; i < p.count; i++) {
            const x = p.getX(i);
            const y = p.getY(i);
            const z = p.getZ(i);
            const distT = rampDown(y, 0.885, 0.960);
            p.setXYZ(
              i,
              x * (1 - 0.14 * distT),
              y + 0.011 * distT,
              z - 0.028 * distT
            );
          }
          p.needsUpdate = true;
        } else if (rawTag === 'organ_LI') {
          // Compact ascending/transverse/descending colon inside lower costal arch & iliac wings, lift low perineal tip
          const p = geo.attributes.position;
          for (let i = 0; i < p.count; i++) {
            const x = p.getX(i);
            const y = p.getY(i);
            const z = p.getZ(i);
            const pelvicT = rampDown(y, 0.865, 0.960);
            p.setXYZ(
              i,
              x * 0.855,
              y + 0.024 * pelvicT,
              0.036 + (z - 0.045) * 0.85
            );
          }
          p.needsUpdate = true;
        } else if (rawTag === 'organ_SI') {
          // Compact small intestinal coils neatly within the abdominal & pelvic brim envelope
          const p = geo.attributes.position;
          for (let i = 0; i < p.count; i++) {
            const x = p.getX(i);
            const y = p.getY(i);
            const z = p.getZ(i);
            p.setXYZ(
              i,
              0.002 + (x - 0.008) * 0.835,
              1.095 + (y - 1.095) * 0.96,
              0.055 + (z - 0.070) * 0.81
            );
          }
          p.needsUpdate = true;
        } else if (rawTag === 'organ_LU_lung') {
          // Provide 4-6mm pleural clearance inside ribs 1-8 and sternum
          const p = geo.attributes.position;
          for (let i = 0; i < p.count; i++) {
            const x = p.getX(i);
            const y = p.getY(i);
            const z = p.getZ(i);
            p.setXYZ(
              i,
              x * 0.905,
              1.385 + (y - 1.385) * 0.96,
              0.038 + (z - 0.042) * 0.905
            );
          }
          p.needsUpdate = true;
        } else if (
          rawTag === 'organ_LR_liver' ||
          rawTag === 'organ_LR_ligament' ||
          rawTag === 'organ_GB'
        ) {
          // Tuck liver & gallbladder smoothly inside right ribs 6-10 and subcostal arch
          const p = geo.attributes.position;
          for (let i = 0; i < p.count; i++) {
            const x = p.getX(i);
            const y = p.getY(i);
            const z = p.getZ(i);
            p.setXYZ(
              i,
              -0.012 + (x + 0.012) * 0.865,
              1.258 + (y - 1.255) * 0.94,
              0.040 + (z - 0.048) * 0.865
            );
          }
          p.needsUpdate = true;
        } else if (rawTag === 'organ_ST' || rawTag === 'organ_SP') {
          // Tuck stomach & spleen cleanly inside left costal arch and posterior 9-11 ribs
          const p = geo.attributes.position;
          for (let i = 0; i < p.count; i++) {
            const x = p.getX(i);
            const y = p.getY(i);
            const z = p.getZ(i);
            p.setXYZ(
              i,
              x * 0.860,
              y,
              0.042 + (z - 0.042) * 0.90
            );
          }
          p.needsUpdate = true;
        }

        const cavity = smoothAndAnalyzeOrganGeometry(geo, spec.smoothIters, 4.2);
        applyAnatomicalOrganVertexColors(geo, spec, cavity);
        geo.computeBoundingBox();
        geo.computeBoundingSphere();

        processed.push({
          geometry: geo,
          organKey: spec.organKey,
          spec,
        });
      });

      cachedGlbMeshes = processed;
      const cbs = loadingCallbacks || [];
      loadingCallbacks = null;
      cbs.forEach((cb) => cb());
    },
    undefined,
    (err) => {
      console.error('Failed to load /models/viscera-organs.glb:', err);
      loadingCallbacks = null;
    }
  );
}

// ============================================================================
// MAIN ANATOMICAL 19-ORGAN BUILDER
// Loads `/models/viscera-organs.glb` (14 real scanned Visible Human Male organs)
// and attaches 5 surgical-precision complementary organs (`THY`, `ESO`, `TE`,
// `ADR`, `PC`) + lumbosacral `MAR` cauda equina calibrated directly to VH bounds.
// ============================================================================
export function buildZangFuOrgans3D(onLoaded?: () => void): ZangFuOrgansRig {
  const group = new THREE.Group();
  group.name = 'zang-fu-organs-3d';
  group.visible = false;

  const organMeshes: THREE.Mesh[] = [];
  const localGeometries: THREE.BufferGeometry[] = [];
  const localMaterials: THREE.MeshPhysicalMaterial[] = [];
  const packs = getSharedTexturePacks();

  let lastActiveIds: string[] = [];
  let lastFocusedOrganId: string | null = null;
  let isDisposed = false;

  const createPhysicalMaterialForSpec = (spec: {
    roughness: number;
    clearcoat: number;
    bumpScale: number;
    sheenColor: string;
    packKey: TissueTextureKind;
    side?: THREE.Side;
    envIntensity?: number;
  }) => {
    const pack = packs[spec.packKey];
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xffffff),
      map: pack.colorMap,
      vertexColors: true,
      emissive: new THREE.Color('#000000'),
      emissiveIntensity: 0,
      roughness: spec.roughness,
      roughnessMap: pack.roughnessMap,
      bumpMap: pack.bumpMap,
      bumpScale: spec.bumpScale,
      metalness: 0.0,
      clearcoat: spec.clearcoat,
      clearcoatRoughness: 0.28,
      reflectivity: 0.42,
      envMapIntensity: spec.envIntensity ?? 0.48,
      sheen: 0.22,
      sheenRoughness: 0.52,
      sheenColor: new THREE.Color(spec.sheenColor),
      transparent: false,
      depthWrite: true,
      depthTest: true,
      side: spec.side ?? THREE.FrontSide,
    });
    localMaterials.push(mat);
    return mat;
  };

  const registerProceduralMesh = (
    geo: THREE.BufferGeometry,
    organKey: string,
    opts: {
      roughness?: number;
      clearcoat?: number;
      bumpScale?: number;
      sheenColor?: string;
      packKey?: TissueTextureKind;
      side?: THREE.Side;
    } = {}
  ): THREE.Mesh => {
    localGeometries.push(geo);
    const info = ZANG_FU_ORGANS_INFO[organKey];
    const mat = createPhysicalMaterialForSpec({
      roughness: opts.roughness ?? 0.34,
      clearcoat: opts.clearcoat ?? 0.48,
      bumpScale: opts.bumpScale ?? 0.0014,
      sheenColor: opts.sheenColor ?? '#ffdcd4',
      packKey: opts.packKey ?? 'serosa',
      side: opts.side,
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.renderOrder = 0;
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    mesh.userData = {
      type: 'organ',
      organKey,
      organInfo: info,
      highlightTint: new THREE.Color(info.baseColor),
    };
    organMeshes.push(mesh);
    group.add(mesh);
    return mesh;
  };

  // --------------------------------------------------------------------------
  // COMPLEMENTARY ORGAN 1: CAUDA EQUINA & LUMBAR NERVE ROOTS FOR MAR (L2 -> Sacrum)
  // Real VH spinal_cord.glb terminates at Conus Medullaris (Y = 1.154, Z = -0.006)
  // --------------------------------------------------------------------------
  [-0.005, -0.002, 0.002, 0.005].forEach((ox) => {
    const caudaGeo = buildSweptOrganTube(
      [
        new THREE.Vector3(-0.006 + ox * 0.4, 1.158, -0.004),
        new THREE.Vector3(-0.005 + ox * 1.4, 1.078, 0.002),
        new THREE.Vector3(-0.004 + ox * 2.1, 0.992, -0.004),
      ],
      14,
      6,
      () => [0.0014, 0.0014],
      (_t, _a, _p, _n, out) => out.set('#ead298')
    );
    registerProceduralMesh(caudaGeo, 'MAR', { packKey: 'serosa', roughness: 0.40, clearcoat: 0.32 });
  });

  // --------------------------------------------------------------------------
  // COMPLEMENTARY ORGAN 2: THYROID GLAND (Tuyến Giáp - THY)
  // Anchored around real VH larynx & trachea: X[-0.025, 0.014], Y[1.49..1.57], Z[0.056..0.082]
  // --------------------------------------------------------------------------
  [-1, 1].forEach((sideSign) => {
    const lobeGeo = colorizeSphereOrgan(
      0.011,
      0.021,
      0.012,
      (x, y, z, nx, ny) => {
        const taper = ny > 0 ? 1 - ny * 0.38 : 1 - Math.abs(ny) * 0.14;
        const hug = -sideSign * nx > 0.15 ? 0.80 : 1.04;
        const lobule = 1 + 0.045 * Math.sin(ny * 20 + nx * 16);
        return [x * taper * hug * lobule, y * lobule, z * taper * lobule];
      },
      (nx, ny, _nz, _x, _y, _z, out) => {
        const fold = 0.5 + 0.5 * Math.sin(ny * 20 + nx * 16);
        out.set('#964236').lerp(new THREE.Color('#c86857'), 0.42 + fold * 0.52);
      },
      22,
      18
    );
    const lobeMesh = registerProceduralMesh(lobeGeo, 'THY', {
      packKey: 'pancreas',
      roughness: 0.32,
      clearcoat: 0.52,
      bumpScale: 0.0014,
    });
    lobeMesh.position.set(-0.005 + sideSign * 0.017, 1.522, 0.050);
    lobeMesh.rotation.set(0.08, 0, -sideSign * 0.14);
  });

  const isthmusGeo = buildSweptOrganTube(
    [
      new THREE.Vector3(-0.018, 1.518, 0.054),
      new THREE.Vector3(-0.005, 1.518, 0.063),
      new THREE.Vector3(0.010, 1.518, 0.054),
    ],
    14,
    10,
    () => [0.0052, 0.0040],
    (_t, _a, _p, _n, out) => out.set('#bd5f4e')
  );
  registerProceduralMesh(isthmusGeo, 'THY', { packKey: 'pancreas', roughness: 0.32, clearcoat: 0.52 });

  const pyramidalGeo = buildSweptOrganTube(
    [
      new THREE.Vector3(-0.002, 1.522, 0.062),
      new THREE.Vector3(-0.001, 1.538, 0.062),
      new THREE.Vector3(0.000, 1.552, 0.060),
    ],
    8,
    8,
    (t) => [THREE.MathUtils.lerp(0.0030, 0.0012, t), THREE.MathUtils.lerp(0.0024, 0.0012, t)],
    (_t, _a, _p, _n, out) => out.set('#c46858')
  );
  registerProceduralMesh(pyramidalGeo, 'THY', { packKey: 'pancreas', roughness: 0.32, clearcoat: 0.52 });

  // --------------------------------------------------------------------------
  // COMPLEMENTARY ORGAN 3: ESOPHAGUS (Thực Quản - ESO)
  // Descends behind real VH trachea -> posterior mediastinum -> real VH stomach cardia (0.012, 1.278, 0.056)
  // --------------------------------------------------------------------------
  const esoGeo = buildSweptOrganTube(
    [
      new THREE.Vector3(-0.005, 1.572, 0.048),
      new THREE.Vector3(-0.004, 1.472, 0.036),
      new THREE.Vector3(0.000, 1.355, 0.032),
      new THREE.Vector3(0.012, 1.278, 0.056),
    ],
    28,
    12,
    (t, angle) => {
      const flute = 1 + 0.06 * Math.sin(angle * 6);
      const r = THREE.MathUtils.lerp(0.0060, 0.0078, Math.pow(t, 2)) * flute;
      return [r, r * 0.85];
    },
    (_t, angle, _p, _n, out) => {
      const stria = 0.5 + 0.5 * Math.sin(angle * 6);
      out.set('#b46258').lerp(new THREE.Color('#da8b7f'), stria * 0.72);
    }
  );
  registerProceduralMesh(esoGeo, 'ESO', { packKey: 'serosa', roughness: 0.34, clearcoat: 0.48 });

  // --------------------------------------------------------------------------
  // COMPLEMENTARY ORGAN 4: DIAPHRAGM (Tam Tiêu - TE)
  // Asymmetric musculotendinous dome arching smoothly over real liver (maxY 1.337) & stomach (maxY 1.288)
  // --------------------------------------------------------------------------
  const diaphragmGeo = new THREE.SphereGeometry(0.104, 48, 20, 0, Math.PI * 2, 0, Math.PI * 0.28);
  const dPos = diaphragmGeo.attributes.position;
  const dColors = new Float32Array(dPos.count * 3);
  const cTendon = new THREE.Color('#e3cfd6');
  const cMuscle = new THREE.Color('#9c4460');
  const cMuscleDark = new THREE.Color('#6e273f');
  const tmpDia = new THREE.Color();

  for (let i = 0; i < dPos.count; i++) {
    const vx = dPos.getX(i);
    const vy = dPos.getY(i);
    const vz = dPos.getZ(i);
    const r = Math.hypot(vx, vz) / 0.104;
    const ang = Math.atan2(vz, vx);
    // Asymmetric double dome matching VH Liver on right (-X, high dome) & Stomach on left (+X)
    const rightLift = vx < 0 ? 0.015 * Math.exp(-Math.pow((vx + 0.052) / 0.040, 2)) : 0;
    const leftLift = vx > 0 ? 0.006 * Math.exp(-Math.pow((vx - 0.048) / 0.038, 2)) : 0;
    const centralDip = -0.008 * Math.exp(-Math.pow(r / 0.30, 2));
    const ribStriation = 0.0014 * Math.sin(ang * 30) * Math.max(0, r - 0.35);

    dPos.setXYZ(i, vx * 0.96, vy * 0.28 + rightLift + leftLift + centralDip + ribStriation, vz * 0.54);

    const cloverT = 0.38 + 0.08 * Math.cos(ang * 3 - 0.4);
    const tendonBlend = THREE.MathUtils.clamp(1 - (r - 0.14) / cloverT, 0, 1);
    const fiber = 0.5 + 0.5 * Math.sin(ang * 30);
    tmpDia
      .copy(cMuscleDark)
      .lerp(cMuscle, fiber * 0.85)
      .lerp(cTendon, Math.pow(tendonBlend, 1.25));

    dColors[i * 3] = tmpDia.r;
    dColors[i * 3 + 1] = tmpDia.g;
    dColors[i * 3 + 2] = tmpDia.b;
  }
  dPos.needsUpdate = true;
  diaphragmGeo.setAttribute('color', new THREE.BufferAttribute(dColors, 3));
  smoothAndAnalyzeOrganGeometry(diaphragmGeo, 0, 3.0);
  const diaphragmMesh = registerProceduralMesh(diaphragmGeo, 'TE', {
    packKey: 'serosa',
    roughness: 0.36,
    clearcoat: 0.46,
    side: THREE.DoubleSide,
  });
  diaphragmMesh.position.set(0, 1.278, 0.041);

  // --------------------------------------------------------------------------
  // COMPLEMENTARY ORGAN 5: BILATERAL ADRENAL GLANDS (Thượng Thận - ADR)
  // Perched atop real VH Kidneys:
  //   Left KI (+X):  X[0.026..0.092], Y_top 1.231, Z_mid 0.018
  //   Right KI (-X): X[-0.089..-0.031], Y_top 1.215, Z_mid 0.028
  // --------------------------------------------------------------------------
  const adrenalSpecs: { pos: [number, number, number]; sign: -1 | 1 }[] = [
    { pos: [-0.048, 1.217, 0.028], sign: -1 },
    { pos: [0.048, 1.232, 0.020], sign: 1 },
  ];
  adrenalSpecs.forEach(({ pos: [ax, ay, az], sign }) => {
    const adrGeo = colorizeSphereOrgan(
      0.012,
      0.010,
      0.009,
      (x, y, z, nx, ny) => {
        const shape = sign < 0 ? (ny > 0 ? 1 - ny * 0.68 : 1.08) : 1 - Math.abs(nx) * 0.25;
        const sulcus = 1 + 0.11 * Math.sin(nx * 24 + ny * 18);
        return [x * shape * sulcus, y * (1 + 0.06 * Math.cos(nx * 20)), z * shape * sulcus];
      },
      (nx, ny, _nz, _x, _y, _z, out) => {
        const fold = 0.5 + 0.5 * Math.sin(nx * 24 + ny * 18);
        out.set('#b0781e').lerp(new THREE.Color('#e6ae44'), fold * 0.9);
      },
      22,
      18
    );
    const adrMesh = registerProceduralMesh(adrGeo, 'ADR', {
      packKey: 'pancreas',
      roughness: 0.36,
      clearcoat: 0.50,
      bumpScale: 0.0018,
    });
    adrMesh.position.set(ax, ay, az);
  });

  // --------------------------------------------------------------------------
  // COMPLEMENTARY ORGAN 6: SEROUS PERICARDIUM WINDOW CRADLE (Tâm Bào Lạc - PC)
  // Wraps posterior, inferior & lateral cradle around real VH Heart (X[-0.04..0.067], Y[1.30..1.415], Z[0.028..0.110])
  // --------------------------------------------------------------------------
  const periCradleGeo = new THREE.SphereGeometry(0.056, 36, 26, Math.PI * 0.65, Math.PI * 1.48, 0.22, Math.PI * 0.72);
  const pPos = periCradleGeo.attributes.position;
  const pCols = new Float32Array(pPos.count * 3);
  const cPeri = new THREE.Color('#df9ab0');
  const cPeriRim = new THREE.Color('#f2cdd9');
  const tmpPeri = new THREE.Color();

  for (let i = 0; i < pPos.count; i++) {
    const px = pPos.getX(i);
    const py = pPos.getY(i);
    const pz = pPos.getZ(i);
    // Elongate toward cardiac apex (+X, -Y, +Z) leaving anterior chamber window open
    const flatZ = pz * 0.78;
    const widenX = px * (py < 0 ? 1.08 : 0.94);
    pPos.setXYZ(i, widenX, py * 1.02, flatZ);

    const rim = Math.max(0, pz / 0.052);
    tmpPeri.copy(cPeri).lerp(cPeriRim, Math.min(1, rim * 0.78));
    pCols[i * 3] = tmpPeri.r;
    pCols[i * 3 + 1] = tmpPeri.g;
    pCols[i * 3 + 2] = tmpPeri.b;
  }
  pPos.needsUpdate = true;
  periCradleGeo.setAttribute('color', new THREE.BufferAttribute(pCols, 3));
  smoothAndAnalyzeOrganGeometry(periCradleGeo, 0, 2.5);
  const periMesh = registerProceduralMesh(periCradleGeo, 'PC', {
    packKey: 'serosa',
    roughness: 0.28,
    clearcoat: 0.68,
    bumpScale: 0.0009,
    sheenColor: '#f7d9e4',
    side: THREE.DoubleSide,
  });
  periMesh.position.set(0.015, 1.352, 0.062);

  // --------------------------------------------------------------------------
  // PRESERVE AUTHENTIC ORGAN COLORS (Never dim or glow-tint organs on touch)
  // --------------------------------------------------------------------------
  const highlightMeridians = (activeIds: string[], focusedOrganId: string | null = null) => {
    lastActiveIds = activeIds;
    lastFocusedOrganId = focusedOrganId;

    for (let i = 0; i < organMeshes.length; i++) {
      const mesh = organMeshes[i];
      const mat = mesh.material as THREE.MeshPhysicalMaterial;
      if (!mat) continue;
      if (!mat.color.equals(COLOR_WHITE) || mat.emissiveIntensity !== 0) {
        mat.color.copy(COLOR_WHITE);
        mat.emissive.setHex(0x000000);
        mat.emissiveIntensity = 0;
        mat.needsUpdate = true;
      }
    }
  };

  // Attach real scanned Visible Human organs asynchronously once `/models/viscera-organs.glb` loads
  loadVisceraTemplateOnce(() => {
    if (isDisposed || !cachedGlbMeshes) return;

    for (const item of cachedGlbMeshes) {
      const info = ZANG_FU_ORGANS_INFO[item.organKey];
      const mat = createPhysicalMaterialForSpec(item.spec);
      const mesh = new THREE.Mesh(item.geometry, mat);
      mesh.renderOrder = 0;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = {
        type: 'organ',
        organKey: item.organKey,
        organInfo: info,
        highlightTint: new THREE.Color(info.baseColor),
      };
      organMeshes.push(mesh);
      group.add(mesh);
    }

    // Re-apply active filter/focus state immediately so GLB organs match selection
    highlightMeridians(lastActiveIds, lastFocusedOrganId);
    onLoaded?.();
  });

  const setVisible = (visible: boolean) => {
    group.visible = visible;
  };

  const dispose = () => {
    isDisposed = true;
    localGeometries.forEach((g) => g.dispose());
    localMaterials.forEach((m) => m.dispose());
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
