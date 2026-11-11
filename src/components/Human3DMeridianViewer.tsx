import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MERIDIANS_3D_DATA, Acupoint3D } from '../data/meridians3dData';
import { buildCompleteAnatomicalSkeleton3D } from '../utils/humanSkeleton3DBuilder';
import {
  Search,
  X,
  Crosshair,
  Pencil,
  Menu,
  Eye,
  Tag,
  Sparkles,
  Check,
  ChevronRight,
  Bone
} from 'lucide-react';

// Bottom Bar items matching Acu Atlas 3D
const ACU_ATLAS_BAR_ITEMS: {
  id: string;
  shortLabel: string;
  enName: string;
  viShort: string;
  lineColor: string;
  pointPrefix: string;
  maxIndex: number;
}[] = [
  { id: 'LU', shortLabel: 'Lu', enName: 'Lung', viShort: 'Phế', lineColor: '#2563eb', pointPrefix: 'Lu', maxIndex: 11 },
  { id: 'LI', shortLabel: 'Li', enName: 'Large Intestine', viShort: 'Đại Trường', lineColor: '#c25e1a', pointPrefix: 'LI', maxIndex: 20 },
  { id: 'ST', shortLabel: 'St', enName: 'Stomach', viShort: 'Vị', lineColor: '#d97706', pointPrefix: 'ST', maxIndex: 45 },
  { id: 'SP', shortLabel: 'Sp', enName: 'Spleen', viShort: 'Tỳ', lineColor: '#ea580c', pointPrefix: 'SP', maxIndex: 21 },
  { id: 'HT', shortLabel: 'He', enName: 'Heart', viShort: 'Tâm', lineColor: '#dc2626', pointPrefix: 'He', maxIndex: 9 },
  { id: 'SI', shortLabel: 'Si', enName: 'Small Intestine', viShort: 'Tiểu Trường', lineColor: '#e11d48', pointPrefix: 'SI', maxIndex: 19 },
  { id: 'BL', shortLabel: 'Bl', enName: 'Bladder', viShort: 'Bàng Quang', lineColor: '#1d4ed8', pointPrefix: 'BL', maxIndex: 67 },
  { id: 'KI', shortLabel: 'Ki', enName: 'Kidney', viShort: 'Thận', lineColor: '#4f46e5', pointPrefix: 'KI', maxIndex: 27 },
  { id: 'PC', shortLabel: 'Pc', enName: 'Pericardium', viShort: 'Tâm Bào', lineColor: '#db2777', pointPrefix: 'PC', maxIndex: 9 },
  { id: 'TE', shortLabel: 'Tb', enName: 'Triple Burner', viShort: 'Tam Tiêu', lineColor: '#9333ea', pointPrefix: 'TB', maxIndex: 23 },
  { id: 'GB', shortLabel: 'Gb', enName: 'Gallbladder', viShort: 'Đởm', lineColor: '#059669', pointPrefix: 'GB', maxIndex: 44 },
  { id: 'LR', shortLabel: 'Lv', enName: 'Liver', viShort: 'Can', lineColor: '#047857', pointPrefix: 'LV', maxIndex: 14 },
  { id: 'GV', shortLabel: 'Du', enName: 'Governing', viShort: 'Đốc Mạch', lineColor: '#b45309', pointPrefix: 'DU', maxIndex: 29 },
  { id: 'CV', shortLabel: 'Rn', enName: 'Conception', viShort: 'Nhâm Mạch', lineColor: '#7c3aed', pointPrefix: 'RN', maxIndex: 24 },
  { id: 'EX', shortLabel: 'Ex', enName: 'Extra Points', viShort: 'Kỳ Huyệt', lineColor: '#e11d48', pointPrefix: 'EX', maxIndex: 58 },
];

// Complete Sino-Vietnamese names for all 362 classical acupoints across the 14 meridians
const VIETNAMESE_POINT_NAMES: Record<string, string[]> = {
  LU: ['Trung Phủ', 'Vân Môn', 'Thiên Phủ', 'Hiệp Bạch', 'Xích Trạch', 'Khổng Tối', 'Liệt Khuyết', 'Kinh Cừ', 'Thái Uyên', 'Ngư Tế', 'Thiếu Thương'],
  LI: ['Thương Dương', 'Nhị Gian', 'Tam Gian', 'Hợp Cốc', 'Dương Khê', 'Thiên Lịch', 'Ôn Lưu', 'Hạ Liêm', 'Thượng Liêm', 'Thủ Tam Lý', 'Khúc Trì', 'Trửu Liêu', 'Thủ Ngũ Lý', 'Tý Nhu', 'Kiên Ngung', 'Cự Cốt', 'Thiên Đỉnh', 'Phù Đột', 'Hòa Liêu', 'Nghênh Hương'],
  ST: ['Thừa Khấp', 'Tứ Bạch', 'Cự Liêu', 'Địa Thương', 'Đại Nghênh', 'Giáp Xa', 'Hạ Quan', 'Đầu Duy', 'Nhân Nghênh', 'Thủy Đột', 'Khí Xá', 'Khuyết Bồn', 'Khí Hộ', 'Khố Phòng', 'Ốc Ế', 'Ưng Song', 'Nhũ Trung', 'Nhũ Căn', 'Bất Dung', 'Thừa Mãn', 'Lương Môn', 'Quan Môn', 'Thái Ất', 'Hoạt Nhục Môn', 'Thiên Xu', 'Ngoại Lăng', 'Đại Cự', 'Thủy Đạo', 'Quy Lai', 'Khí Xung', 'Bễ Quan', 'Phục Thỏ', 'Âm Thị', 'Lương Khâu', 'Độc Tỵ', 'Túc Tam Lý', 'Thượng Cự Hư', 'Điều Khẩu', 'Hạ Cự Hư', 'Phong Long', 'Giải Khê', 'Xung Dương', 'Hãm Cốc', 'Nội Đình', 'Lệ Đoái'],
  SP: ['Ẩn Bạch', 'Đại Đô', 'Thái Bạch', 'Công Tôn', 'Thương Khâu', 'Tam Âm Giao', 'Lậu Cốc', 'Địa Cơ', 'Âm Lăng Tuyền', 'Huyết Hải', 'Cơ Môn', 'Xung Môn', 'Phủ Xá', 'Phúc Kết', 'Đại Hoành', 'Phúc Ai', 'Thực Đậu', 'Thiên Khê', 'Hung Hương', 'Chu Vinh', 'Đại Bao'],
  HT: ['Cực Tuyền', 'Thanh Linh', 'Thiếu Hải', 'Linh Đạo', 'Thông Lý', 'Âm Khích', 'Thần Môn', 'Thiếu Phủ', 'Thiếu Xung'],
  SI: ['Thiếu Trạch', 'Tiền Cốc', 'Hậu Khê', 'Uyển Cốt', 'Dương Cốc', 'Dưỡng Lão', 'Chi Chính', 'Tiểu Hải', 'Kiên Trinh', 'Nhu Du', 'Thiên Tông', 'Bỉnh Phong', 'Khúc Viên', 'Kiên Ngoại Du', 'Kiên Trung Du', 'Thiên Song', 'Thiên Dung', 'Quyền Liêu', 'Thính Cung'],
  BL: ['Tinh Minh', 'Toản Trúc', 'Mi Xung', 'Khúc Sai', 'Ngũ Xứ', 'Thừa Quang', 'Thông Thiên', 'Lạc Khước', 'Ngọc Chẩm', 'Thiên Trụ', 'Đại Trử', 'Phong Môn', 'Phế Du', 'Quyết Âm Du', 'Tâm Du', 'Đốc Du', 'Cách Du', 'Can Du', 'Đởm Du', 'Tỳ Du', 'Vị Du', 'Tam Tiêu Du', 'Thận Du', 'Khí Hải Du', 'Đại Trường Du', 'Quan Nguyên Du', 'Tiểu Trường Du', 'Bàng Quang Du', 'Trung Lữ Du', 'Bạch Hoàn Du', 'Thượng Liêu', 'Thứ Liêu', 'Trung Liêu', 'Hạ Liêu', 'Hội Dương', 'Thừa Phù', 'Ân Môn', 'Phù Khích', 'Ủy Dương', 'Ủy Trung', 'Phụ Phân', 'Phách Hộ', 'Cao Hoang', 'Thần Đường', 'Y Hy', 'Cách Quan', 'Hồn Môn', 'Dương Cương', 'Ý Xá', 'Vị Thương', 'Hoang Môn', 'Chí Thất', 'Bào Hoang', 'Trật Biên', 'Hợp Dương', 'Thừa Cân', 'Thừa Sơn', 'Phi Dương', 'Phụ Dương', 'Côn Lôn', 'Bộc Tham', 'Thân Mạch', 'Kim Môn', 'Kinh Cốt', 'Thúc Cốt', 'Túc Thông Cốc', 'Chí Âm'],
  KI: ['Dũng Tuyền', 'Nhiên Cốc', 'Thái Khê', 'Đại Chung', 'Thủy Tuyền', 'Chiếu Hải', 'Phục Lưu', 'Giao Tín', 'Trúc Tân', 'Âm Cốc', 'Hoành Cốt', 'Đại Hách', 'Khí Huyệt', 'Tứ Mãn', 'Trung Chú', 'Hoang Du', 'Thương Khúc', 'Thạch Quan', 'Âm Đô', 'Phúc Thông Cốc', 'U Môn', 'Bộ Lang', 'Thần Phong', 'Linh Khư', 'Thần Tàng', 'Hoắc Trung', 'Du Phủ'],
  PC: ['Thiên Trì', 'Thiên Tuyền', 'Khúc Trạch', 'Khích Môn', 'Gian Sử', 'Nội Quan', 'Đại Lăng', 'Lao Cung', 'Trung Xung'],
  TE: ['Quan Xung', 'Dịch Môn', 'Trung Chữ', 'Dương Trì', 'Ngoại Quan', 'Chi Cấu', 'Hội Tông', 'Tam Dương Lạc', 'Tứ Độc', 'Thiên Tỉnh', 'Thanh Lãnh Uyên', 'Tiêu Lạc', 'Nhu Hội', 'Kiên Liêu', 'Thiên Liêu', 'Thiên Dũ', 'Ế Phong', 'Khế Mạch', 'Lư Tức', 'Giác Tôn', 'Nhĩ Môn', 'Hòa Liêu', 'Ty Trúc Không'],
  GB: ['Đồng Tử Liêu', 'Thính Hội', 'Thượng Quan', 'Hàm Yến', 'Huyền Lư', 'Huyền Ly', 'Khúc Tân', 'Suất Cốc', 'Thiên Xung', 'Phù Bạch', 'Đầu Khiếu Âm', 'Hoàn Cốt', 'Bản Thần', 'Dương Bạch', 'Đầu Lâm Khấp', 'Mục Song', 'Chính Doanh', 'Thừa Linh', 'Não Không', 'Phong Trì', 'Kiên Tỉnh', 'Uyên Dịch', 'Triếp Cân', 'Nhật Nguyệt', 'Kinh Môn', 'Đới Mạch', 'Ngũ Khu', 'Duy Đạo', 'Cự Liêu', 'Hoàn Khiêu', 'Phong Thị', 'Trung Độc', 'Tất Dương Quan', 'Dương Lăng Tuyền', 'Dương Giao', 'Ngoại Khâu', 'Quang Minh', 'Dương Phụ', 'Huyền Chung', 'Khâu Khư', 'Túc Lâm Khấp', 'Địa Ngũ Hội', 'Hiệp Khê', 'Túc Khiếu Âm'],
  LR: ['Đại Đôn', 'Hành Gian', 'Thái Xung', 'Trung Phong', 'Lãi Câu', 'Trung Đô', 'Tất Quan', 'Khúc Tuyền', 'Âm Bao', 'Túc Ngũ Lý', 'Âm Liêm', 'Cấp Mạch', 'Chương Môn', 'Kỳ Môn'],
  GV: ['Trường Cường', 'Yêu Du', 'Yêu Dương Quan', 'Mệnh Môn', 'Huyền Khu', 'Tích Trung', 'Trung Khu', 'Cân Súc', 'Chí Dương', 'Linh Đài', 'Thần Đạo', 'Thân Trụ', 'Đào Đạo', 'Đại Chùy', 'Á Môn', 'Phong Phủ', 'Não Hộ', 'Cường Gian', 'Hậu Đỉnh', 'Bách Hội', 'Tiền Đỉnh', 'Thinh Hội', 'Thượng Tinh', 'Thần Đình', 'Tố Liêu', 'Nhân Trung', 'Đoài Đoan', 'Ngân Giao', 'Ấn Đường'],
  CV: ['Hội Âm', 'Khúc Cốt', 'Trung Cực', 'Quan Nguyên', 'Thạch Môn', 'Khí Hải', 'Âm Giao', 'Thần Khuyết', 'Thủy Phân', 'Hạ Quản', 'Kiến Lý', 'Trung Quản', 'Thượng Quản', 'Cự Khuyết', 'Cưu Vĩ', 'Trung Đình', 'Đản Trung', 'Ngọc Đường', 'Tử Cung', 'Hoa Cái', 'Toàn Cơ', 'Thiên Đột', 'Liêm Tuyền', 'Thừa Tương'],
};

// Complete Sino-Vietnamese names for the 58 Extra Acupoints (Kinh Ngoại Kỳ Huyệt)
const EXTRA_POINT_VIETNAMESE_NAMES: Record<string, string> = {
  'GV24+': 'Ấn Đường',
  'EX-HN1': 'Tứ Thần Thông',
  'EX-HN2': 'Đương Dương',
  'EX-HN4': 'Ngư Yêu',
  'EX-HN5': 'Thái Dương',
  'EX-HN6': 'Nhĩ Tiêm',
  'EX-HN7': 'Cầu Hậu',
  'EX-HN8': 'Thượng Nghênh Hương',
  'EX-HN9': 'Nội Nghênh Hương',
  'EX-HN10': 'Tụ Tuyền',
  'EX-HN11': 'Hải Tuyền',
  'EX-HN12': 'Kim Tân - Ngọc Dịch',
  'EX-HN14': 'Ế Minh',
  'EX-HN15': 'Cảnh Bách Lao',
  'N-HN54': 'An Miên',
  'N-HN20': 'Khiên Chính',
  'M-HN18': 'Giáp Thừa Tương',
  'M-HN21': 'Thượng Liêm Tuyền',
  'EXTRA-XINSHE': 'Tân Thiết',
  'EXTRA-XUEYADIAN': 'Huyết Áp Điểm',
  'EXTRA-TITUO': 'Đề Thác',
  'EX-CA1': 'Tử Cung Huyệt',
  'EX-B1': 'Định Suyễn',
  'EX-B2': 'Hoa Đà Giáp Tích',
  'EX-B3': 'Vị Quản Hạ Du',
  'EX-B4': 'Bỉ Căn',
  'EX-B6': 'Yêu Nghi',
  'EX-B7': 'Yêu Nhãn',
  'EX-B8': 'Thập Thất Chùy',
  'EX-B9': 'Yêu Kỳ',
  'EXTRA-JIEJI': 'Kết Hạch Điểm',
  'M-BW34': 'Tọa Cốt',
  'M-UE48': 'Kiên Nội Lăng',
  'M-UE30': 'Quăng Trung',
  'EX-UE1': 'Trửu Tiêm',
  'EX-UE2': 'Nhị Bạch',
  'EX-UE3': 'Trung Tuyền',
  'EX-UE4': 'Trung Khôi',
  'EX-UE5': 'Đại Cốt Không',
  'EX-UE6': 'Tiểu Cốt Không',
  'EX-UE7': 'Yêu Thống Điểm',
  'EX-UE8': 'Ngoại Lao Cung',
  'EX-UE9': 'Bát Tà',
  'EX-UE10': 'Tứ Phùng',
  'EX-UE11': 'Thập Tuyên',
  'EX-LE1': 'Khoan Cốt',
  'EX-LE2': 'Hạc Đỉnh',
  'EX-LE3': 'Bách Trùng Oa',
  'EX-LE4': 'Nội Tất Nhãn',
  'EX-LE5': 'Tất Nhãn',
  'EX-LE6': 'Đởm Nang Huyệt',
  'EX-LE7': 'Lan Vĩ Huyệt',
  'EX-LE8': 'Nội Hỏa Chuẩn',
  'EX-LE9': 'Ngoại Hỏa Chuẩn',
  'EX-LE10': 'Bát Phong',
  'EX-LE11': 'Độc Âm',
  'EX-LE12': 'Khí Đoan',
  'EXTRA-LINEITING': 'Lý Nội Đình',
};

interface SurfaceDataJSON {
  landmarks: {
    navelY: number;
    pubicUpperY: number;
    xiphoidY: number;
    notchY: number;
    nippleX: number;
    nippleY: number;
  };
  eyes: {
    l: [number, number, number];
    r: [number, number, number];
  };
  lips: {
    upper: [number, number, number];
    lower: [number, number, number];
  };
  points: Record<string, [number, number, number]>;
  normals?: Record<string, [number, number, number]>;
  routes: Record<string, [number, number, number][][]>;
}

interface PlottedPoint3D {
  code: string;
  displayCode: string;
  meridianId: string;
  position: [number, number, number];
  detail: Acupoint3D;
}

/**
 * Generate a high-definition 1024x1024 dermal pore & micro-skin bump map
 * so the 3D body surface has crisp micro-texture under directional studio light
 */
function createHighDefSkinBumpTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 512, 512);

  // Deterministic pseudo-random dermal pore & fine skin grain
  let seed = 1337;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let i = 0; i < 14000; i++) {
    const x = rand() * 512;
    const y = rand() * 512;
    const r = 0.6 + rand() * 1.4;
    const bright = rand() > 0.45 ? 155 : 102;
    ctx.fillStyle = `rgb(${bright},${bright},${bright})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(14, 14);
  return tex;
}

/**
 * Compute Discrete Mean Curvature (Cavity / Ridge Map) + Anatomical Muscle Sculpting +
 * High-Definition Vertex Colors on the 13,380-vertex MakeHuman 3D mesh:
 * - Enhances muscular definition (pectorals, clavicles, 6-pack abs, linea alba, deltoids, biceps, quads, calves, spine groove)
 * - Computes exact triangle-neighbor cavity occlusion so eyelids, nostrils, lips, ears, fingers, toes, and muscle grooves are razor-sharp
 */
function enhanceAndColorHumanGeometry(geometry: THREE.BufferGeometry) {
  const posAttr = geometry.attributes.position;
  let normAttr = geometry.attributes.normal;
  if (!normAttr) {
    geometry.computeVertexNormals();
    normAttr = geometry.attributes.normal;
  }

  const count = posAttr.count;

  // 1. Generate cylindrical/triplanar UV coordinates for dermal micro-bump texture
  const uvs = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    const x = posAttr.getX(i);
    const y = posAttr.getY(i);
    const z = posAttr.getZ(i);
    const angle = Math.atan2(x, z) / (Math.PI * 2) + 0.5;
    uvs[i * 2] = angle * 3.0;
    uvs[i * 2 + 1] = y * 2.5;
  }
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

  // 2. Build vertex adjacency from index buffer to compute true 3D surface curvature (cavity & ridge map)
  const cavity = new Float32Array(count);
  const idxAttr = geometry.index;
  if (idxAttr) {
    const neighborSumX = new Float32Array(count);
    const neighborSumY = new Float32Array(count);
    const neighborSumZ = new Float32Array(count);
    const neighborCount = new Uint16Array(count);

    const idxArray = idxAttr.array;
    const addEdge = (a: number, b: number) => {
      neighborSumX[a] += posAttr.getX(b);
      neighborSumY[a] += posAttr.getY(b);
      neighborSumZ[a] += posAttr.getZ(b);
      neighborCount[a]++;
    };

    for (let t = 0; t < idxArray.length; t += 3) {
      const i0 = idxArray[t];
      const i1 = idxArray[t + 1];
      const i2 = idxArray[t + 2];
      addEdge(i0, i1);
      addEdge(i0, i2);
      addEdge(i1, i0);
      addEdge(i1, i2);
      addEdge(i2, i0);
      addEdge(i2, i1);
    }

    for (let i = 0; i < count; i++) {
      const deg = neighborCount[i];
      if (deg === 0) continue;
      const avgX = neighborSumX[i] / deg - posAttr.getX(i);
      const avgY = neighborSumY[i] / deg - posAttr.getY(i);
      const avgZ = neighborSumZ[i] / deg - posAttr.getZ(i);

      const nx = normAttr.getX(i);
      const ny = normAttr.getY(i);
      const nz = normAttr.getZ(i);

      // Dot product > 0 means neighbors lie in front of vertex along normal => CONCAVE CREASE / CAVITY
      // Dot product < 0 means vertex protrudes outward relative to neighbors => CONVEX RIDGE
      const dot = avgX * nx + avgY * ny + avgZ * nz;
      cavity[i] = THREE.MathUtils.clamp(dot * 420, -1.0, 1.0);
    }
  }

  // 3. Subtle anatomical muscle-relief normal perturbation & high-definition vertex coloring
  const colors = new Float32Array(count * 3);

  const cSkinBase = new THREE.Color('#ddb09a');
  const cSkinHighlight = new THREE.Color('#efd0c0');
  const cSkinCavity = new THREE.Color('#9c6854');
  const cSkinWarm = new THREE.Color('#cf8772');
  const cLips = new THREE.Color('#bc6862');
  const cLipLine = new THREE.Color('#7a3834');
  const cBrow = new THREE.Color('#543b2c');
  const cSclera = new THREE.Color('#f1f5f9');
  const cIris = new THREE.Color('#466f84');
  const cPupil = new THREE.Color('#0f172a');
  const cEyelidLine = new THREE.Color('#6e4639');
  const cNipple = new THREE.Color('#a85d52');
  const cNavel = new THREE.Color('#7d4b3b');

  const tmp = new THREE.Color();

  for (let i = 0; i < count; i++) {
    const x = posAttr.getX(i);
    const y = posAttr.getY(i);
    const z = posAttr.getZ(i);
    const absX = Math.abs(x);

    const ny = normAttr.getY(i);
    const nz = normAttr.getZ(i);
    const cav = cavity[i]; // +1 in deep creases, -1 on sharp ridges

    // Base skin color across the entire body (100% seamless natural human skin, no dark briefs)
    tmp.copy(cSkinBase);

    // Apply real 3D mesh cavity occlusion & ridge highlight (makes nose, eyelids, ears, fingers, toes & muscles super sharp!)
    if (cav > 0) {
      tmp.lerp(cSkinCavity, Math.min(0.78, cav * 0.72));
    } else if (cav < 0) {
      tmp.lerp(cSkinHighlight, Math.min(0.38, -cav * 0.34));
    }

    // Natural downward-facing anatomical shadow (under chin, under pecs, under glutes, between thighs)
    if (ny < -0.1) {
      tmp.lerp(cSkinCavity, Math.min(0.42, (-ny - 0.1) * 0.48));
    }

    // Grazing side-edge definition (Fresnel contour darkening so silhouette & limbs stand out crisply against studio backdrop)
    const sideGrazing = 1.0 - Math.abs(nz);
    if (sideGrazing > 0.65) {
      tmp.lerp(cSkinCavity, (sideGrazing - 0.65) * 0.42);
    }

    // Sculpted anatomical muscle shading on torso & limbs (matching Acu Atlas 3D screenshots):
    // A. Lower pectoral fold & central sternal cleavage
    if (z > 0.10 && y > 1.28 && y < 1.38 && absX > 0.015 && absX < 0.125) {
      const pecCurve = 1.305 + Math.pow((absX - 0.068) * 9.5, 2) * 0.035;
      const distPecFold = Math.abs(y - pecCurve);
      if (distPecFold < 0.012) {
        tmp.lerp(cSkinCavity, (1 - distPecFold / 0.012) * 0.36);
      }
    }
    // B. Central Linea Alba & 6-Pack Rectus Abdominis intersections
    if (z > 0.11 && y > 1.02 && y < 1.32 && absX < 0.085) {
      // Vertical linea alba groove
      if (absX < 0.008) {
        tmp.lerp(cSkinCavity, (1 - absX / 0.008) * 0.32);
      }
      // Lateral semilunaris border of abs
      const distSemilunaris = Math.abs(absX - 0.068);
      if (distSemilunaris < 0.009) {
        tmp.lerp(cSkinCavity, (1 - distSemilunaris / 0.009) * 0.28);
      }
      // Tendinous intersections at y = 1.24, 1.18, 1.115
      for (const ty of [1.245, 1.178, 1.112]) {
        const distTendon = Math.abs(y - ty);
        if (absX > 0.006 && absX < 0.068 && distTendon < 0.007) {
          tmp.lerp(cSkinCavity, (1 - distTendon / 0.007) * 0.26);
        }
      }
    }
    // C. Clavicle ridge & supraclavicular hollow
    if (z > 0.06 && y > 1.46 && y < 1.52 && absX > 0.025 && absX < 0.135) {
      const clavY = 1.485 + (absX - 0.03) * 0.14;
      const dClav = y - clavY;
      if (Math.abs(dClav) < 0.008) {
        tmp.lerp(cSkinHighlight, 0.25);
      } else if (dClav > 0.008 && dClav < 0.020) {
        tmp.lerp(cSkinCavity, 0.28);
      }
    }
    // D. Posterior median spinal furrow (DU channel) & Scapular borders
    if (z < -0.02 && y > 1.00 && y < 1.52 && absX < 0.015) {
      tmp.lerp(cSkinCavity, (1 - absX / 0.015) * 0.38);
    }

    // Subtle vascular warmth on cheeks, nose, fingertips, knuckles, knees & toes
    if (
      (y > 1.62 && z > 0.10) ||
      absX > 0.48 ||
      (y > 0.44 && y < 0.54) ||
      y < 0.08
    ) {
      tmp.lerp(cSkinWarm, 0.22);
    }

    // Nipples (ST-17 landmark: [±0.0905, 1.3252, 0.1764])
    const distNipple = Math.hypot(absX - 0.0905, y - 1.3252);
    if (z > 0.14 && distNipple < 0.014) {
      const t = 1 - distNipple / 0.014;
      tmp.lerp(cNipple, Math.min(1, t * 1.45));
    }

    // Umbilical Navel (CV-8 landmark: [0, 1.1114, 0.1542])
    const distNavel = Math.hypot(x, y - 1.1114);
    if (z > 0.12 && distNavel < 0.011) {
      const t = 1 - distNavel / 0.011;
      tmp.lerp(cNavel, Math.min(1, t * 1.55));
    }

    // High-Definition Facial Features (Eyes, Eyelids, Iris, Pupil, Eyebrows, Nostrils, Lips)
    if (y > 1.58 && z > 0.08) {
      // Nostrils dark cavity under nose tip
      const distNostril = Math.hypot(absX - 0.011, y - 1.663);
      if (z > 0.162 && ny < -0.15 && distNostril < 0.0085) {
        tmp.lerp(cLipLine, 0.75);
      }

      // Lips & Mouth parting line
      const lipCheck =
        Math.pow(x / 0.026, 2) + Math.pow((y - 1.638) / 0.0115, 2);
      if (z > 0.152 && lipCheck <= 1.0) {
        const distParting = Math.abs(y - 1.6385);
        if (distParting < 0.0018 && absX < 0.022) {
          tmp.lerp(cLipLine, 0.85);
        } else {
          tmp.lerp(cLips, Math.min(1, (1 - lipCheck) * 1.65));
        }
      }

      // Eyes (Centers at [±0.03418, 1.71594, 0.15458])
      const dxEye = absX - 0.0342;
      const dyEye = y - 1.7159;
      const eyeEllipse = Math.pow(dxEye / 0.0145, 2) + Math.pow(dyEye / 0.006, 2);
      if (z > 0.144 && eyeEllipse <= 1.18) {
        if (eyeEllipse > 0.92) {
          // Crisp lash/eyelid rim
          tmp.lerp(cEyelidLine, 0.72);
        } else {
          const rIris = Math.hypot(dxEye, dyEye);
          if (rIris < 0.0026) {
            tmp.copy(cPupil);
          } else if (rIris < 0.0064) {
            tmp.copy(cIris);
            // Outer limbal ring of iris
            if (rIris > 0.0052) tmp.lerp(cPupil, 0.45);
          } else {
            tmp.copy(cSclera);
          }
        }
      }

      // Defined Eyebrows
      const browY = 1.736 - Math.pow((absX - 0.036) * 4.5, 2) * 0.006;
      if (
        z > 0.142 &&
        absX >= 0.015 &&
        absX <= 0.057 &&
        Math.abs(y - browY) < 0.0046
      ) {
        tmp.lerp(cBrow, 0.78);
      }
    }

    colors[i * 3] = tmp.r;
    colors[i * 3 + 1] = tmp.g;
    colors[i * 3 + 2] = tmp.b;
  }

  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
}

// Fast outward anatomical surface normal for any 3D acupoint on the MakeHuman body
function computeOutwardSurfaceNormal(x: number, y: number, z: number): THREE.Vector3 {
  const absX = Math.abs(x);
  const signX = x >= 0 ? 1 : -1;
  let nx = x;
  let ny = 0;
  let nz = z;

  if (y >= 1.50) {
    // Head & neck
    nx = x;
    ny = (y - 1.66) * 0.25;
    nz = z - 0.055;
  } else if (absX < 0.165 && y >= 0.82) {
    // Torso & pelvis
    nx = x * 0.85;
    ny = 0;
    nz = z - 0.032;
  } else if (y < 0.82) {
    // Legs & feet
    const legCenterX = signX * 0.082;
    const legCenterZ = y < 0.10 ? 0.045 : 0.012;
    nx = x - legCenterX;
    ny = y < 0.08 ? 0.25 : 0;
    nz = z - legCenterZ;
  } else {
    // Arms, forearms & hands
    const t = THREE.MathUtils.clamp((absX - 0.165) / 0.415, 0, 1);
    const armCenterX = signX * (0.165 + t * 0.415);
    const armCenterY = 1.44 - t * 0.53;
    const armCenterZ = 0.01 + t * 0.11;
    nx = (x - armCenterX) * 0.55;
    ny = (y - armCenterY) * 0.35;
    nz = z - armCenterZ;
  }

  const len = Math.hypot(nx, ny, nz) || 1;
  return new THREE.Vector3(nx / len, ny / len, nz / len);
}

// Cache label textures so switching meridians or skin modes never recreates HTML5 canvases
const SPRITE_TEXTURE_CACHE = new Map<string, THREE.CanvasTexture>();
const SPRITE_WIDTH_RATIO_CACHE = new Map<string, number>();

// Create ultra-crisp Retina 3D sprite label for Vietnamese acupoint name ("Trung Phủ", "Hợp Cốc", etc.)
function createPointCodeSprite(
  text: string,
  isHighlighted: boolean,
  isTranslucent: boolean
): THREE.Sprite {
  const cacheKey = `${text}_${isHighlighted ? '1' : '0'}_clean`;
  let texture = SPRITE_TEXTURE_CACHE.get(cacheKey);
  let widthRatio = SPRITE_WIDTH_RATIO_CACHE.get(cacheKey);

  if (!texture || widthRatio === undefined) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, 512, 128);
    const fontSize = isHighlighted
      ? text.length > 13
        ? 52
        : 60
      : text.length > 13
        ? 46
        : 54;
    ctx.font = `${isHighlighted ? 900 : 800} ${fontSize}px Inter, system-ui, -apple-system, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Measure exact rendered pixel width (including stroke halo) for 100% accurate anti-overlap boxes
    const measuredPx = ctx.measureText(text).width + 24;
    widthRatio = Math.min(0.98, Math.max(0.26, measuredPx / 512));
    SPRITE_WIDTH_RATIO_CACHE.set(cacheKey, widthRatio);

    // Pure floating text with crisp halo stroke (NO dark box/pill around the text!)
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;
    ctx.lineWidth = 11;
    ctx.strokeStyle = 'rgba(15, 12, 10, 0.94)';
    ctx.strokeText(text, 256, 64);

    ctx.fillStyle = isHighlighted ? '#fde047' : '#ffffff';
    ctx.fillText(text, 256, 64);

    texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    SPRITE_TEXTURE_CACHE.set(cacheKey, texture);
  }

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(material);
  const baseW = 0.160;
  const baseH = 0.039;
  sprite.scale.set(baseW, baseH, 1);
  sprite.renderOrder = 10;
  sprite.userData.textWidthRatio = widthRatio;
  return sprite;
}

// Shared sphere geometries for acupoint pins to avoid repeated geometry allocations
const SHARED_PIN_GEO_NORMAL = new THREE.SphereGeometry(0.0035, 10, 10);
const SHARED_PIN_GEO_SELECTED = new THREE.SphereGeometry(0.0062, 14, 14);

export const Human3DMeridianViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  // Active meridians: Default to ALL meridians so all acupoint positions & Vietnamese names are visible immediately!
  const [activeMeridianIds, setActiveMeridianIds] = useState<string[]>(() =>
    ACU_ATLAS_BAR_ITEMS.map((item) => item.id)
  );
  const [multiSelectMode, setMultiSelectMode] = useState<boolean>(true);
  const [selectedPoint, setSelectedPoint] = useState<Acupoint3D | null>(null);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  // 4 Anatomical Modes:
  // - 'skin_skeleton': Translucent real skin + Complete 206-bone 3D skeleton inside + Front-facing acupoints (Default!)
  // - 'skeleton_only': Pure 206-bone 3D skeleton + Meridians & Acupoints
  // - 'opaque_skin'  : 100% Solid opaque real skin (no see-through)
  // - 'xray_all'     : Full see-through skin + 3D skeleton + All front & back meridians/acupoints
  const [anatomicalMode, setAnatomicalMode] = useState<
    'skin_skeleton' | 'skeleton_only' | 'opaque_skin' | 'xray_all'
  >('skin_skeleton');
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [showMenuDrawer, setShowMenuDrawer] = useState<boolean>(false);
  const [showToolPopover, setShowToolPopover] = useState<boolean>(false);
  const [showCameraPopover, setShowCameraPopover] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePresetLabel, setActivePresetLabel] = useState<string>('Chính diện');
  const [surfaceData, setSurfaceData] = useState<SurfaceDataJSON | null>(null);
  const [modelLoaded, setModelLoaded] = useState<boolean>(false);

  // Three.js references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const skinMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const skinDepthMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const bodyGroupRef = useRef<THREE.Group | null>(null);
  const skeletonGroupRef = useRef<THREE.Group | null>(null);
  const meridiansGroupRef = useRef<THREE.Group | null>(null);
  const pointsGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number>(0);
  const isTranslucentSkinRef = useRef<boolean>(false);
  const occlusionDirtyRef = useRef<boolean>(true);
  const tubeScaleUniformRef = useRef<{ value: number }>({ value: 1.0 });

  // Build complete 419-point lookup (361 classical + 58 extra acupoints) with full Vietnamese names
  const allPlottedPoints = useMemo(() => {
    if (!surfaceData) return [];
    const list: PlottedPoint3D[] = [];

    ACU_ATLAS_BAR_ITEMS.forEach((barItem) => {
      if (barItem.id === 'EX') {
        Object.entries(EXTRA_POINT_VIETNAMESE_NAMES).forEach(([exCode, exViName]) => {
          const pos = surfaceData.points[exCode];
          if (!pos) return;
          const isMidline = Math.abs(pos[0]) < 0.004;
          const detail: Acupoint3D = {
            id: exCode,
            code: exCode,
            name: exViName,
            vietnameseName: `${exViName} (Kinh Ngoại Kỳ Huyệt)`,
            chineseName: exCode,
            meridianId: 'EX',
            meridianName: 'Kinh Ngoại Kỳ Huyệt & Kỳ Kinh Bát Mạch',
            position: pos,
            isBilateral: !isMidline,
            location: `Kinh ngoại kỳ huyệt ${exViName} (${exCode}) định vị chuẩn giải phẫu trên cơ thể 3D.`,
            depth: 'Châm thẳng hoặc xiên 0.3 - 1.0 thốn tùy vị trí giải phẫu.',
            anatomy: 'Vùng giải phẫu đặc hiệu của Kinh Ngoại Kỳ Huyệt.',
            actions: `Đặc trị vùng bệnh tại chỗ và toàn thân theo công năng của huyệt ${exViName}.`,
            indications: [
              `Chủ trị chuyên biệt tại vùng huyệt ${exViName}`,
              'Điều hòa khí huyết và giảm đau đặc hiệu',
            ],
            specialRole: `Kinh Ngoại Kỳ Huyệt (${exViName})`,
          };
          list.push({
            code: exCode,
            displayCode: exCode,
            meridianId: 'EX',
            position: pos,
            detail,
          });
        });
        return;
      }

      const mData = MERIDIANS_3D_DATA.find((m) => m.id === barItem.id);
      if (!mData) return;
      const viNames = VIETNAMESE_POINT_NAMES[barItem.id] || [];

      for (let idx = 1; idx <= barItem.maxIndex; idx++) {
        const code = `${barItem.id}${idx}`;
        const displayCode = `${barItem.pointPrefix}-${idx}`;
        const pos = surfaceData.points[code];
        if (!pos) continue;

        const existingDetail = mData.points.find(
          (p) => p.code.toUpperCase() === code.toUpperCase()
        );
        const pointViName = viNames[idx - 1] || existingDetail?.name || displayCode;

        const detail: Acupoint3D = existingDetail
          ? {
              ...existingDetail,
              name: pointViName,
              position: pos,
            }
          : {
              id: code,
              code: displayCode,
              name: pointViName,
              vietnameseName: `${pointViName} (${mData.vietnameseName})`,
              chineseName: code,
              meridianId: mData.id,
              meridianName: mData.name,
              position: pos,
              isBilateral: mData.isBilateral,
              location: `Huyệt ${pointViName} (huyệt thứ ${idx} trên ${mData.vietnameseName}). Định vị giải phẫu chuẩn WHO trên bề mặt cơ thể 3D.`,
              depth: 'Châm thẳng hoặc xiên 0.3 - 1.2 thốn tùy độ dày cơ giải phẫu tại vùng huyệt.',
              anatomy: `Nằm trên lộ trình giải phẫu của ${mData.vietnameseName} (${mData.pathWayDescription})`,
              actions: `Thông kinh hoạt lạc ${mData.vietnameseName}, điều hòa khí huyết tạng phủ (${mData.element}).`,
              indications: [
                `Đau nhức hoặc rối loạn cảm giác dọc lộ trình ${mData.vietnameseName}`,
                mData.description,
              ],
              specialRole: `Huyệt ${pointViName} thuộc ${mData.vietnameseName}`,
            };

        list.push({
          code,
          displayCode,
          meridianId: barItem.id,
          position: pos,
          detail,
        });
      }
    });

    return list;
  }, [surfaceData]);

  // Search filter across all 361 surface-registered acupoints
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return allPlottedPoints.slice(0, 30);
    return allPlottedPoints.filter(
      (pt) =>
        pt.code.toLowerCase().includes(q) ||
        pt.displayCode.toLowerCase().includes(q) ||
        pt.detail.name.toLowerCase().includes(q) ||
        pt.detail.vietnameseName.toLowerCase().includes(q) ||
        pt.detail.location.toLowerCase().includes(q) ||
        pt.detail.indications.some((ind) => ind.toLowerCase().includes(q))
    );
  }, [allPlottedPoints, searchQuery]);

  // Camera Presets calibrated to the 0..1.85m MakeHuman 3D body mesh (matching all 5 user screenshots!)
  const setCameraView = useCallback(
    (preset: 'front' | 'leftArm' | 'rightArm' | 'sideProfile' | 'back' | 'head' | 'legs') => {
      if (!cameraRef.current || !controlsRef.current) return;
      const camera = cameraRef.current;
      const controls = controlsRef.current;

      switch (preset) {
        case 'front':
          camera.position.set(0, 1.02, 2.28);
          controls.target.set(0, 0.96, 0);
          setActivePresetLabel('Chính diện');
          break;
        case 'leftArm':
          camera.position.set(0.18, 1.12, 1.78);
          controls.target.set(0.18, 1.06, 0.02);
          setActivePresetLabel('Tay Trái');
          break;
        case 'rightArm':
          camera.position.set(-0.18, 1.12, 1.78);
          controls.target.set(-0.18, 1.06, 0.02);
          setActivePresetLabel('Tay Phải');
          break;
        case 'sideProfile':
          camera.position.set(2.08, 1.06, 0.48);
          controls.target.set(0.04, 1.02, 0.02);
          setActivePresetLabel('Nghiêng');
          break;
        case 'back':
          camera.position.set(0, 1.02, -2.28);
          controls.target.set(0, 0.96, 0);
          setActivePresetLabel('Sau Lưng');
          break;
        case 'head':
          camera.position.set(0, 1.66, 0.68);
          controls.target.set(0, 1.65, 0.06);
          setActivePresetLabel('Đầu Mặt');
          break;
        case 'legs':
          camera.position.set(0, 0.48, 1.58);
          controls.target.set(0, 0.46, 0);
          setActivePresetLabel('Hai Chân');
          break;
      }
      controls.update();
      occlusionDirtyRef.current = true;
    },
    []
  );

  // Fly camera to a specific acupoint on the 3D MakeHuman skin
  const focusOnPoint = useCallback((pt: Acupoint3D) => {
    setSelectedPoint(pt);
    if (!cameraRef.current || !controlsRef.current) return;
    const [x, y, z] = pt.position;
    const zDir = z >= -0.01 ? 1 : -1;
    cameraRef.current.position.set(x * 1.15, y + 0.03, z + zDir * 0.72);
    controlsRef.current.target.set(x * 0.6, y, z * 0.6);
    controlsRef.current.update();
    occlusionDirtyRef.current = true;
  }, []);

  // Load surface registration JSON & MakeHuman GLB model
  useEffect(() => {
    if (!mountRef.current) return;
    let disposed = false;

    const width = mountRef.current.clientWidth || 800;
    const height = mountRef.current.clientHeight || 680;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera framed on the 1.85m MakeHuman anatomical body
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.05, 25);
    camera.position.set(0, 1.02, 2.28);
    cameraRef.current = camera;

    // 3. High-Performance WebGLRenderer (60fps smooth dragging on both mobile & desktop GPUs)
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.98;
    renderer.shadowMap.enabled = false;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. High-Contrast Sculptural Studio Lighting Rig (Zero shadow-map overhead, instant 60fps!)
    const ambientLight = new THREE.AmbientLight(0xfff5ee, 0.42);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xfff8f4, 0x3b3032, 0.52);
    hemiLight.position.set(0, 3.5, 0);
    scene.add(hemiLight);

    // Primary Key Light from top-right-front
    const keyLight = new THREE.DirectionalLight(0xfffaf4, 1.38);
    keyLight.position.set(1.6, 2.5, 2.8);
    scene.add(keyLight);

    // Soft Fill Light from left
    const fillLight = new THREE.DirectionalLight(0xe5d5d0, 0.42);
    fillLight.position.set(-2.4, 1.0, 1.6);
    scene.add(fillLight);

    // Back Key Light so Posterior View is equally crisp and sculpted
    const backKeyLight = new THREE.DirectionalLight(0xfff7f0, 1.25);
    backKeyLight.position.set(-1.2, 2.3, -2.8);
    scene.add(backKeyLight);

    // 5. Responsive OrbitControls (snappy damping so dragging/rotating feels instant)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.16;
    controls.rotateSpeed = 0.95;
    controls.zoomSpeed = 1.1;
    controls.minDistance = 0.32;
    controls.maxDistance = 4.2;
    controls.target.set(0, 0.96, 0);
    controlsRef.current = controls;

    // 6. Groups (Complete 206-Bone 3D Skeleton + Skin Body + Meridians + Acupoints)
    const skeletonGroup = buildCompleteAnatomicalSkeleton3D();
    skeletonGroupRef.current = skeletonGroup;
    scene.add(skeletonGroup);

    const bodyGroup = new THREE.Group();
    bodyGroupRef.current = bodyGroup;
    scene.add(bodyGroup);

    const meridiansGroup = new THREE.Group();
    meridiansGroupRef.current = meridiansGroup;
    scene.add(meridiansGroup);

    const pointsGroup = new THREE.Group();
    pointsGroupRef.current = pointsGroup;
    scene.add(pointsGroup);

    // 7. Load Real MakeHuman GLB Mesh (`/models/human-learning.glb`) with Depth Pre-pass + PBR Skin Material
    // Stage 1 (renderOrder=1): 242-Bone CT-scanned Medical Skeleton (opaque, self-occluding)
    // Stage 2 (renderOrder=2): Skin Depth Pre-pass (colorWrite=false, depthWrite=true) -> locks depth buffer to front-most skin surface!
    // Stage 3 (renderOrder=3): Skin Color Pass (opacity=0.45, depthFunc=LessEqualDepth) -> blends lifelike skin over skeleton with ZERO eye/lip self-bleeding!
    const bumpTex = createHighDefSkinBumpTexture();
    const skinDepthMat = new THREE.MeshBasicMaterial({
      colorWrite: false,
      depthWrite: true,
      depthTest: true,
      side: THREE.FrontSide,
      polygonOffset: true,
      polygonOffsetFactor: 1.5,
      polygonOffsetUnits: 1.5,
    });
    skinDepthMaterialRef.current = skinDepthMat;

    const skinMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      bumpMap: bumpTex,
      bumpScale: 0.0008,
      roughness: 0.45,
      metalness: 0.02,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
      depthTest: true,
      depthFunc: THREE.LessEqualDepth,
      side: THREE.FrontSide,
      polygonOffset: true,
      polygonOffsetFactor: 1.2,
      polygonOffsetUnits: 1.2,
    });
    skinMaterialRef.current = skinMat;

    const loader = new GLTFLoader();
    loader.load(
      '/models/human-learning.glb',
      (gltf) => {
        if (disposed) return;
        const depthClones: THREE.Mesh[] = [];
        gltf.scene.traverse((obj) => {
          if (obj instanceof THREE.Mesh && obj.geometry) {
            enhanceAndColorHumanGeometry(obj.geometry);
            obj.material = skinMat;
            obj.renderOrder = 3;

            const depthMesh = new THREE.Mesh(obj.geometry, skinDepthMat);
            depthMesh.position.copy(obj.position);
            depthMesh.rotation.copy(obj.rotation);
            depthMesh.scale.copy(obj.scale);
            depthMesh.renderOrder = 2;
            depthClones.push(depthMesh);
          }
        });
        depthClones.forEach((dm) => bodyGroup.add(dm));
        bodyGroup.add(gltf.scene);
        occlusionDirtyRef.current = true;
        setModelLoaded(true);
      },
      undefined,
      (err) => {
        console.error('Error loading 3D human model:', err);
      }
    );

    fetch('/models/meridian-surface-data.json')
      .then((res) => res.json())
      .then((json: SurfaceDataJSON) => {
        if (!disposed) {
          setSurfaceData(json);
        }
      })
      .catch((err) => console.error('Error loading meridian surface data:', err));

    // 8. Raycasting for Clicking Visible Acupoint Pins or Labels on Skin
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let downPos = { x: 0, y: 0 };

    const onPointerDown = (e: PointerEvent) => {
      downPos = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = (e: PointerEvent) => {
      if (Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y) > 6 || !mountRef.current) {
        return;
      }
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      if (pointsGroupRef.current) {
        // Only intersect visible points (back-facing points are already hidden in "Da thật" mode!)
        const hits = raycaster
          .intersectObjects(pointsGroupRef.current.children, true)
          .filter((h) => h.object.visible);

        if (hits.length > 0) {
          let obj: THREE.Object3D | null = hits[0].object;
          while (obj && !obj.userData?.point && obj.parent) {
            obj = obj.parent;
          }
          if (obj?.userData?.point) {
            setSelectedPoint(obj.userData.point as Acupoint3D);
          }
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    // 9. Resize Handler
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
      occlusionDirtyRef.current = true;
    };
    window.addEventListener('resize', handleResize);

    // 10. Ultra-Fast 60fps Render Loop with Zoom-Adaptive Label Shrinking + Real-Time 2D Screen-Space Anti-Overlap
    const lastCamPos = new THREE.Vector3(999, 999, 999);
    const lastTargetPos = new THREE.Vector3(999, 999, 999);
    const toCam = new THREE.Vector3();
    const projVec = new THREE.Vector3();
    const camRight = new THREE.Vector3();
    const camUp = new THREE.Vector3();
    const camForward = new THREE.Vector3();
    const halfTanFov = Math.tan((35 * 0.5 * Math.PI) / 180);

    interface ScreenPinObstacle {
      sx: number;
      sy: number;
      hw: number;
      hh: number;
    }

    interface ScreenLabelItem {
      sprite: THREE.Sprite;
      anchorPos: THREE.Vector3;
      dist: number;
      pinSx: number;
      pinSy: number;
      sx: number;
      sy: number;
      hw: number;
      hh: number;
      ownPinHw: number;
      ownPinHh: number;
      preferDir: number;
    }

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      controls.update();

      const camMoved =
        lastCamPos.distanceToSquared(camera.position) > 0.00001 ||
        lastTargetPos.distanceToSquared(controls.target) > 0.00001;

      if ((camMoved || occlusionDirtyRef.current) && pointsGroupRef.current) {
        lastCamPos.copy(camera.position);
        lastTargetPos.copy(controls.target);
        occlusionDirtyRef.current = false;

        // Dynamically scale meridian line thickness based on camera zoom distance
        const camTargetDist = camera.position.distanceTo(controls.target);
        tubeScaleUniformRef.current.value = Math.pow(
          THREE.MathUtils.clamp(camTargetDist / 2.1, 0.15, 1.1),
          0.92
        );

        camera.updateMatrixWorld();
        camera.matrixWorld.extractBasis(camRight, camUp, camForward);
        const aspect = camera.aspect || 1;

        const translucent = isTranslucentSkinRef.current;
        const pointChildren = pointsGroupRef.current.children;
        const visiblePins: ScreenPinObstacle[] = [];
        const visibleLabels: ScreenLabelItem[] = [];

        for (let i = 0; i < pointChildren.length; i++) {
          const obj = pointChildren[i];
          const anchorPos: THREE.Vector3 | undefined = obj.userData?.anchorPos;
          const outwardNormal: THREE.Vector3 | undefined = obj.userData?.outwardNormal;

          if (!anchorPos || !outwardNormal) {
            obj.visible = true;
            continue;
          }

          if (translucent) {
            obj.visible = true;
          } else {
            toCam.subVectors(camera.position, anchorPos).normalize();
            // 1. Surface normal facing check: hide points that face away from camera
            const normalFacing = toCam.dot(outwardNormal) > 0.16;
            if (!normalFacing) {
              obj.visible = false;
              continue;
            }

            // 2. Anatomical volume occlusion check:
            // When viewing from above the head or at steep vertical angles, points on the lower body
            // (chest, abdomen, back, legs) must NOT show through the head or torso volume!
            // Crucial: Points on the head/face (Y >= 1.58) must NEVER be self-occluded when zooming in!
            let occludedByBody = false;

            if (anchorPos.y < 1.58 && camera.position.y > anchorPos.y + 0.15) {
              const dy = anchorPos.y - camera.position.y;

              // Check intersection with Head volume if camera is above head (Y > 1.75) and point is below head (Y < 1.62)
              if (camera.position.y > 1.75 && anchorPos.y < 1.62) {
                const tHead = (1.72 - camera.position.y) / dy;
                if (tHead > 0.02 && tHead < 0.98) {
                  const xHead = camera.position.x + (anchorPos.x - camera.position.x) * tHead;
                  const zHead = camera.position.z + (anchorPos.z - camera.position.z) * tHead;
                  if (Math.hypot(xHead, zHead - 0.045) < 0.10) {
                    occludedByBody = true;
                  }
                }
              }

              // Check intersection with Torso volume if point is below torso (e.g. legs / feet)
              if (!occludedByBody && camera.position.y > 1.45 && anchorPos.y < 1.15) {
                const tTorso = (1.35 - camera.position.y) / dy;
                if (tTorso > 0.02 && tTorso < 0.98) {
                  const xTorso = camera.position.x + (anchorPos.x - camera.position.x) * tTorso;
                  const zTorso = camera.position.z + (anchorPos.z - camera.position.z) * tTorso;
                  if (Math.hypot(xTorso, zTorso - 0.045) < 0.16) {
                    occludedByBody = true;
                  }
                }
              }
            }

            obj.visible = !occludedByBody;
          }

          if (!obj.visible) continue;

          // Distance from camera to this specific acupoint
          const dist = camera.position.distanceTo(anchorPos);
          const screenFactorY = 1 / Math.max(0.005, dist * halfTanFov);
          const screenFactorX = screenFactorY / aspect;
          const pinScale = Math.pow(
            THREE.MathUtils.clamp(dist / 2.1, 0.14, 1.1),
            0.92
          );

          if (obj instanceof THREE.Mesh) {
            // Smoothly shrink yellow acupoint pin circles as user zooms in (0.14x at close-up -> 1.0x at full body)
            obj.scale.setScalar(pinScale);

            projVec.copy(anchorPos).project(camera);
            if (Math.abs(projVec.x) < 1.18 && Math.abs(projVec.y) < 1.18) {
              const rWorld = (obj.userData?.isSelected ? 0.0062 : 0.0035) * pinScale;
              // Safety halo around every yellow pin dot so text NEVER touches or overlaps any yellow circle
              visiblePins.push({
                sx: projVec.x,
                sy: projVec.y,
                hw: rWorld * 1.55 * screenFactorX,
                hh: rWorld * 1.55 * screenFactorY,
              });
            }
          } else if (obj instanceof THREE.Sprite) {
            // Larger readable labels at full-screen view (2x scale for maximum readability) & auto-balanced smaller size when zooming in
            const labelScale = Math.pow(
              THREE.MathUtils.clamp(dist / 2.1, 0.14, 1.12),
              0.88
            );
            const isSel = Boolean(obj.userData?.isSelected);
            const wWorld = (isSel ? 0.184 : 0.160) * labelScale;
            const hWorld = (isSel ? 0.045 : 0.039) * labelScale;
            obj.scale.set(wWorld, hWorld, 1);

            // Project the acupoint's exact pin anchor into 2D Screen NDC [-1..1]
            projVec.copy(anchorPos).project(camera);
            if (Math.abs(projVec.x) < 1.18 && Math.abs(projVec.y) < 1.18) {
              const textWidthRatio: number = obj.userData?.textWidthRatio ?? 0.65;
              // Exact NDC half-width and half-height of the rendered Vietnamese text
              const hw = wWorld * textWidthRatio * 0.54 * screenFactorX;
              const hh = hWorld * 0.56 * screenFactorY;

              const rPinWorld = (isSel ? 0.0062 : 0.0035) * pinScale;
              const ownPinHw = rPinWorld * 1.55 * screenFactorX;
              const ownPinHh = rPinWorld * 1.55 * screenFactorY;
              const baseOffset: THREE.Vector3 | undefined = obj.userData?.baseOffset;
              const preferDir = baseOffset && baseOffset.x < 0 ? -1 : 1;

              visibleLabels.push({
                sprite: obj,
                anchorPos,
                dist,
                pinSx: projVec.x,
                pinSy: projVec.y,
                sx: projVec.x,
                sy: projVec.y,
                hw,
                hh,
                ownPinHw,
                ownPinHh,
                preferDir,
              });
            }
          }
        }

        // Deterministic Non-Overlapping Slot Placement:
        // 1. Every label is placed outside its yellow pin circle (never covering the dot!)
        // 2. Collisions are checked against ALL visible yellow pin dots AND all already-placed labels!
        const nLabels = visibleLabels.length;
        if (nLabels > 0) {
          visibleLabels.sort((a, b) => b.pinSy - a.pinSy || a.pinSx - b.pinSx);
          const placed: ScreenLabelItem[] = [];

          for (let i = 0; i < nLabels; i++) {
            const item = visibleLabels[i];
            // Outward horizontal clearance so the inner edge of the text starts strictly outside the yellow pin circle
            const dxSide = item.ownPinHw + item.hw + 0.004;
            // Vertical clearance when placed directly above or below the yellow pin circle
            const dyVert = item.ownPinHh + item.hh + 0.003;
            // Full row height for vertical stacking of close acupoints
            const rowStep = item.hh * 2.12;
            const s =
              item.pinSx > 0.002
                ? 1
                : item.pinSx < -0.002
                  ? -1
                  : item.preferDir;

            const candidateCoords: [number, number][] = [
              [item.pinSx + s * dxSide, item.pinSy],
              [item.pinSx - s * dxSide, item.pinSy],
              [item.pinSx + s * dxSide, item.pinSy + rowStep * 0.68],
              [item.pinSx + s * dxSide, item.pinSy - rowStep * 0.68],
              [item.pinSx, item.pinSy + dyVert],
              [item.pinSx, item.pinSy - dyVert],
              [item.pinSx - s * dxSide, item.pinSy + rowStep * 0.68],
              [item.pinSx - s * dxSide, item.pinSy - rowStep * 0.68],
              [item.pinSx + s * dxSide, item.pinSy + rowStep * 1.32],
              [item.pinSx + s * dxSide, item.pinSy - rowStep * 1.32],
              [item.pinSx - s * dxSide, item.pinSy + rowStep * 1.32],
              [item.pinSx - s * dxSide, item.pinSy - rowStep * 1.32],
              [item.pinSx, item.pinSy + dyVert + rowStep],
              [item.pinSx, item.pinSy - (dyVert + rowStep)],
              [item.pinSx + s * (dxSide + item.hw * 0.8), item.pinSy],
              [item.pinSx - s * (dxSide + item.hw * 0.8), item.pinSy],
              [item.pinSx + s * dxSide, item.pinSy + rowStep * 2.0],
              [item.pinSx + s * dxSide, item.pinSy - rowStep * 2.0],
              [item.pinSx - s * dxSide, item.pinSy + rowStep * 2.0],
              [item.pinSx - s * dxSide, item.pinSy - rowStep * 2.0],
              [item.pinSx, item.pinSy + dyVert + rowStep * 2.0],
              [item.pinSx, item.pinSy - (dyVert + rowStep * 2.0)],
              [item.pinSx + s * (dxSide + item.hw * 1.1), item.pinSy + rowStep],
              [item.pinSx - s * (dxSide + item.hw * 1.1), item.pinSy + rowStep],
              [item.pinSx + s * (dxSide + item.hw * 1.1), item.pinSy - rowStep],
              [item.pinSx - s * (dxSide + item.hw * 1.1), item.pinSy - rowStep],
            ];

            let bestX = candidateCoords[0][0];
            let bestY = candidateCoords[0][1];
            let minPenalty = Infinity;

            for (let c = 0; c < candidateCoords.length; c++) {
              const [cx, cy] = candidateCoords[c];
              let maxOverlap = 0;

              // 1. Check collision against ALL visible yellow acupoint pin circles
              for (let k = 0; k < visiblePins.length; k++) {
                const pin = visiblePins[k];
                const ox = item.hw + pin.hw - Math.abs(cx - pin.sx);
                const oy = item.hh + pin.hh - Math.abs(cy - pin.sy);
                if (ox > 0 && oy > 0) {
                  maxOverlap = Math.max(maxOverlap, ox * oy * 3.0);
                }
              }

              // 2. Check collision against ALL already-placed acupoint name labels
              for (let p = 0; p < placed.length; p++) {
                const other = placed[p];
                const ox = item.hw + other.hw - Math.abs(cx - other.sx);
                const oy = item.hh + other.hh - Math.abs(cy - other.sy);
                if (ox > 0 && oy > 0) {
                  maxOverlap = Math.max(maxOverlap, ox * oy);
                }
              }

              if (maxOverlap === 0) {
                bestX = cx;
                bestY = cy;
                break;
              }

              const penalty = c * 0.0001 + maxOverlap * 100;
              if (penalty < minPenalty) {
                minPenalty = penalty;
                bestX = cx;
                bestY = cy;
              }
            }

            item.sx = bestX;
            item.sy = bestY;
            placed.push(item);

            // Convert final non-overlapping 2D NDC offset (dSx, dSy) back to 3D world offset from anchorPos
            const dSx = item.sx - item.pinSx;
            const dSy = item.sy - item.pinSy;
            const worldSpanY = item.dist * halfTanFov;
            const worldSpanX = worldSpanY * aspect;
            item.sprite.position
              .copy(item.anchorPos)
              .addScaledVector(camRight, dSx * worldSpanX)
              .addScaledVector(camUp, dSy * worldSpanY)
              .addScaledVector(camForward, -0.003);
          }
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      bumpTex.dispose();
      renderer.dispose();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Switch between the 4 anatomical modes in-place (0ms overhead):
  // - 'skin_skeleton': Translucent skin + 3D Skeleton visible inside + Front-facing acupoints
  // - 'skeleton_only': Hide skin, show 100% 3D Skeleton + Front-facing acupoints
  // - 'opaque_skin'  : Solid opaque real skin (hide skeleton, no see-through)
  // - 'xray_all'     : Translucent skin + 3D Skeleton + See-through all front & back acupoints
  useEffect(() => {
    const showAllPointsThroughBody = anatomicalMode === 'xray_all';
    isTranslucentSkinRef.current = showAllPointsThroughBody;
    occlusionDirtyRef.current = true;

    const showSkin = anatomicalMode !== 'skeleton_only';
    const showSkeleton = anatomicalMode !== 'opaque_skin';
    const skinIsTranslucent =
      anatomicalMode === 'skin_skeleton' || anatomicalMode === 'xray_all';

    if (bodyGroupRef.current) {
      bodyGroupRef.current.visible = showSkin;
    }
    if (skeletonGroupRef.current) {
      skeletonGroupRef.current.visible = showSkeleton;
    }

    if (skinDepthMaterialRef.current) {
      skinDepthMaterialRef.current.depthWrite = showSkin && !showAllPointsThroughBody;
      skinDepthMaterialRef.current.needsUpdate = true;
    }

    if (skinMaterialRef.current) {
      skinMaterialRef.current.transparent = skinIsTranslucent;
      skinMaterialRef.current.opacity =
        anatomicalMode === 'xray_all'
          ? 0.28
          : anatomicalMode === 'skin_skeleton'
          ? 0.45
          : 1.0;
      skinMaterialRef.current.depthWrite = !skinIsTranslucent;
      skinMaterialRef.current.depthTest = true;
      skinMaterialRef.current.depthFunc = THREE.LessEqualDepth;
      skinMaterialRef.current.side = skinIsTranslucent
        ? THREE.FrontSide
        : THREE.DoubleSide;
      skinMaterialRef.current.needsUpdate = true;
    }

    // Update meridian lines and acupoint pin depth testing immediately without rebuilding geometries
    if (meridiansGroupRef.current) {
      meridiansGroupRef.current.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshBasicMaterial;
        if (mat) {
          mat.depthTest = !showAllPointsThroughBody;
          mat.depthWrite = !showAllPointsThroughBody;
          mat.transparent = showAllPointsThroughBody;
          mat.opacity = showAllPointsThroughBody ? 0.85 : 1.0;
          mat.needsUpdate = true;
        }
      });
    }

    if (pointsGroupRef.current) {
      pointsGroupRef.current.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          const mat = child.material as THREE.Material;
          if (mat) {
            mat.depthTest = !showAllPointsThroughBody;
            mat.needsUpdate = true;
          }
        }
      });
    }
  }, [anatomicalMode]);

  // Render Surface-Registered Meridian Curves & 361 Acupoint Pins + Labels
  useEffect(() => {
    if (!surfaceData || !meridiansGroupRef.current || !pointsGroupRef.current) return;

    const currentTranslucent = isTranslucentSkinRef.current;

    // Clear previous meridian tubes & acupoint pins
    while (meridiansGroupRef.current.children.length > 0) {
      const obj = meridiansGroupRef.current.children[0] as THREE.Mesh;
      obj.geometry?.dispose();
      if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
      else obj.material?.dispose();
      meridiansGroupRef.current.remove(obj);
    }
    while (pointsGroupRef.current.children.length > 0) {
      const obj = pointsGroupRef.current.children[0] as any;
      // Do not dispose shared pin geometries or cached sprite textures
      if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose());
      else obj.material?.dispose();
      pointsGroupRef.current.remove(obj);
    }

    ACU_ATLAS_BAR_ITEMS.forEach((barItem, meridianIdx) => {
      if (!activeMeridianIds.includes(barItem.id)) return;

      const isBilateral = !['GV', 'CV'].includes(barItem.id);
      const sides = isBilateral ? [1, -1] : [1];
      const routeSegments =
        barItem.id === 'EX' ? [] : surfaceData.routes[barItem.id] || [];
      const lineColor = new THREE.Color(barItem.lineColor);

      sides.forEach((sideSign) => {
        // 1. Render exact surface-bound meridian pathway curves with GPU zoom-adaptive radius
        routeSegments.forEach((seg) => {
          if (seg.length < 2) return;
          const vPoints = seg.map(
            (p) => new THREE.Vector3(p[0] * sideSign, p[1], p[2])
          );
          const curve = new THREE.CatmullRomCurve3(vPoints, false, 'centripetal');
          const tubeGeo = new THREE.TubeGeometry(
            curve,
            Math.max(48, seg.length * 2),
            0.0016,
            8,
            false
          );
          const tubeMat = new THREE.MeshBasicMaterial({
            color: lineColor,
            depthTest: !currentTranslucent,
            depthWrite: !currentTranslucent,
            transparent: currentTranslucent,
            opacity: currentTranslucent ? 0.85 : 1.0,
          });
          tubeMat.onBeforeCompile = (shader) => {
            shader.uniforms.uTubeScale = tubeScaleUniformRef.current;
            shader.vertexShader =
              `uniform float uTubeScale;\n` +
              shader.vertexShader.replace(
                '#include <begin_vertex>',
                `vec3 transformed = vec3( position ) + normal * ((uTubeScale - 1.0) * 0.0016);`
              );
          };
          const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
          tubeMesh.renderOrder = 4;
          meridiansGroupRef.current?.add(tubeMesh);
        });

        // 2. Render every acupoint along this meridian with yellow-gold pin & Vietnamese name label
        const meridianPoints = allPlottedPoints.filter(
          (pt) => pt.meridianId === barItem.id
        );

        meridianPoints.forEach((pt, ptIdx) => {
          // Avoid duplicating midline extra points (like Ấn Đường) on both +1 and -1 sides
          if (sideSign === -1 && Math.abs(pt.position[0]) < 0.004) return;

          const posX = pt.position[0] * sideSign;
          const posY = pt.position[1];
          const posZ = pt.position[2];

          // Use exact 3D mesh normal from human-learning.glb (`surfaceData.normals`)
          const exactNorm = surfaceData.normals?.[pt.code];
          const outwardNormal = exactNorm
            ? new THREE.Vector3(exactNorm[0] * sideSign, exactNorm[1], exactNorm[2]).normalize()
            : computeOutwardSurfaceNormal(posX, posY, posZ);

          // Align pin center directly with the meridian tube centerline (already 1.2mm above skin + 0.4mm = 1.6mm)
          const pinX = posX + outwardNormal.x * 0.0004;
          const pinY = posY + outwardNormal.y * 0.0004;
          const pinZ = posZ + outwardNormal.z * 0.0004;
          const anchorPos = new THREE.Vector3(pinX, pinY, pinZ);

          const isSelected =
            selectedPoint?.id === pt.detail.id || selectedPoint?.code === pt.displayCode;

          // Yellow-gold pinhead sphere (matching Acu Atlas 3D)
          const pinGeo = isSelected ? SHARED_PIN_GEO_SELECTED : SHARED_PIN_GEO_NORMAL;
          const pinMat = new THREE.MeshBasicMaterial({
            color: isSelected ? 0xef4444 : 0xfacc15,
            depthTest: !currentTranslucent,
            depthWrite: !currentTranslucent,
          });
          const pinMesh = new THREE.Mesh(pinGeo, pinMat);
          pinMesh.position.set(pinX, pinY, pinZ);
          pinMesh.renderOrder = 5;
          pinMesh.userData = {
            type: 'acupoint',
            point: pt.detail,
            meridianId: barItem.id,
            anchorPos,
            outwardNormal,
          };
          pointsGroupRef.current?.add(pinMesh);

          // Floating Vietnamese Acupoint Name Label ("Trung Phủ", "Xích Trạch", "Khổng Tối", "Liệt Khuyết", "Kinh Cừ", "Thái Uyên", "Ngư Tế", "Thiếu Thương"...)
          if (showLabels) {
            const labelText =
              pt.code === 'EX_HN12'
                ? sideSign === 1
                  ? 'Kim Tân'
                  : 'Ngọc Dịch'
                : pt.detail.name;
            const sprite = createPointCodeSprite(
              labelText,
              isSelected,
              currentTranslucent
            );
            // Alternate left/right & slight vertical offset for consecutive points so densely packed wrist/ankle/face points fan out cleanly
            const altSign = ptIdx % 2 === 0 ? 1 : -1;
            const staggerX =
              posX === 0
                ? altSign * 0.016
                : sideSign * (0.011 + altSign * 0.005) + ((meridianIdx % 3) - 1) * 0.003;
            const staggerY = 0.004 + altSign * 0.003;
            const staggerZ = outwardNormal.z * 0.009;
            const baseOffset = new THREE.Vector3(staggerX, staggerY, staggerZ);

            sprite.position.copy(anchorPos).add(baseOffset);
            sprite.userData = {
              ...sprite.userData,
              type: 'acupoint',
              point: pt.detail,
              meridianId: barItem.id,
              anchorPos,
              outwardNormal,
              baseOffset,
              isSelected,
            };
            pointsGroupRef.current?.add(sprite);
          }
        });
      });
    });

    occlusionDirtyRef.current = true;
  }, [
    surfaceData,
    activeMeridianIds,
    allPlottedPoints,
    selectedPoint,
    showLabels,
  ]);

  // Toggle meridian selection
  const handleToggleMeridian = (id: string) => {
    setSelectedPoint(null);
    if (multiSelectMode) {
      setActiveMeridianIds((prev) =>
        prev.includes(id)
          ? prev.length > 1
            ? prev.filter((item) => item !== id)
            : prev
          : [...prev, id]
      );
    } else {
      setActiveMeridianIds([id]);
    }
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-slate-300 shadow-2xl flex flex-col select-none bg-[#b8b0b3]">
      {/* Main 3D Studio Viewport (Exact Acu Atlas 3D taupe studio backdrop & floating buttons) */}
      <div
        className="relative w-full h-[640px] sm:h-[750px] overflow-hidden"
        style={{
          background:
            'radial-gradient(circle at 50% 38%, #d2c8ca 0%, #b8aeb0 52%, #8e8386 100%)',
        }}
      >
        {/* Three.js Canvas Mount */}
        <div
          ref={mountRef}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        />

        {/* Loading indicator while 643KB MakeHuman GLB mesh loads */}
        {!modelLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/15 backdrop-blur-xs z-10 pointer-events-none">
            <div className="px-4 py-2.5 rounded-xl bg-white/95 shadow-lg text-xs font-bold text-slate-800 flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-rose-600 border-t-transparent rounded-full animate-spin" />
              Đang tải mô hình giải phẫu người 3D độ nét cao...
            </div>
          </div>
        )}

        {/* ===================================================================
            UNIFIED TOP BAR (Left: Search | Center: Anatomical Mode Pill | Right: Camera Target)
            Uses a single Flexbox container so buttons NEVER overlap on mobile screens!
           =================================================================== */}
        <div className="absolute top-3 inset-x-2.5 sm:inset-x-4 z-20 flex items-start justify-between gap-1.5 pointer-events-none">
          {/* LEFT: SEARCH BUTTON */}
          <button
            type="button"
            onClick={() => {
              setShowSearchModal(!showSearchModal);
              setShowToolPopover(false);
              setShowCameraPopover(false);
            }}
            title="Tìm nhanh trong 361 huyệt đạo & 14 đường kinh"
            className="pointer-events-auto shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white/95 hover:bg-white text-slate-900 shadow-lg border border-slate-200/80 flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.4]" />
          </button>

          {/* CENTER: ANATOMICAL MODE BAR + TOOL POPOVER */}
          <div className="pointer-events-auto flex flex-col items-center min-w-0">
            <div className="flex items-center gap-0.5 sm:gap-1 bg-white/95 backdrop-blur-md p-1 rounded-full shadow-lg border border-slate-200/90">
              <button
                type="button"
                onClick={() => {
                  setShowToolPopover(!showToolPopover);
                  setShowSearchModal(false);
                  setShowCameraPopover(false);
                }}
                title="Tuỳ chỉnh hiển thị Nhãn tên huyệt, Khung xương 3D & Chế độ chọn kinh"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#5ba4cf] hover:bg-[#4995c2] text-slate-900 shadow-sm border border-[#3b82a6] flex items-center justify-center transition-transform active:scale-95 cursor-pointer shrink-0"
              >
                <Pencil className="w-3.5 h-3.5 stroke-[2.2]" />
              </button>

              <button
                type="button"
                onClick={() => setAnatomicalMode('skin_skeleton')}
                title="Hiển thị Lớp Da bán trong suốt kết hợp Khung Xương Giải Phẫu 3D (242 cấu trúc xương) bên trong"
                className={`h-7 sm:h-8 px-2 sm:px-2.5 rounded-full text-[10px] sm:text-xs font-extrabold transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                  anatomicalMode === 'skin_skeleton'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Bone className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                <span>Da+Xương</span>
              </button>

              <button
                type="button"
                onClick={() => setAnatomicalMode('skeleton_only')}
                title="Chỉ hiển thị Khung Xương Giải Phẫu 3D đầy đủ và hệ Kinh Huyệt"
                className={`h-7 sm:h-8 px-2 sm:px-2.5 rounded-full text-[10px] sm:text-xs font-extrabold transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                  anatomicalMode === 'skeleton_only'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Bone className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                <span className="sm:hidden">Xương</span>
                <span className="hidden sm:inline">Khung Xương</span>
              </button>

              <button
                type="button"
                onClick={() => setAnatomicalMode('opaque_skin')}
                title="Chế độ Da Thật 100% (chắn kín không nhìn xuyên qua cơ thể)"
                className={`h-7 sm:h-8 px-2 sm:px-2.5 rounded-full text-[10px] sm:text-xs font-extrabold transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                  anatomicalMode === 'opaque_skin'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                <span>Da Thật</span>
              </button>

              <button
                type="button"
                onClick={() => setAnatomicalMode('xray_all')}
                title="Chế độ Xuyên Thấu toàn bộ: Nhìn xuyên cả khung xương và toàn bộ huyệt mặt trước + mặt sau"
                className={`h-8 px-2.5 rounded-full text-xs font-extrabold transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap hidden md:flex ${
                  anatomicalMode === 'xray_all'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Xuyên Thấu</span>
              </button>
            </div>

            {showToolPopover && (
              <div className="mt-2 w-72 sm:w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 p-3 text-slate-800 space-y-2.5 animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Tuỳ Chỉnh Giải Phẫu & Khung Xương 3D
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowToolPopover(false)}
                    className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setAnatomicalMode('skin_skeleton')}
                    className={`px-2.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border cursor-pointer ${
                      anatomicalMode === 'skin_skeleton'
                        ? 'bg-amber-50 border-amber-400 text-amber-900'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Bone className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Da + Khung Xương</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnatomicalMode('skeleton_only')}
                    className={`px-2.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border cursor-pointer ${
                      anatomicalMode === 'skeleton_only'
                        ? 'bg-slate-900 border-slate-900 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Bone className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Chỉ Khung Xương</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnatomicalMode('opaque_skin')}
                    className={`px-2.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border cursor-pointer ${
                      anatomicalMode === 'opaque_skin'
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Eye className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Da Thật (Kín)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnatomicalMode('xray_all')}
                    className={`px-2.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border cursor-pointer ${
                      anatomicalMode === 'xray_all'
                        ? 'bg-sky-50 border-sky-400 text-sky-900'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Eye className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Xuyên Thấu 360°</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowLabels(!showLabels)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-sky-600" />
                    Hiện tên huyệt trên 3D (Trung Phủ, Hợp Cốc...)
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] ${
                      showLabels ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {showLabels ? 'Đang Bật' : 'Tắt'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setMultiSelectMode(!multiSelectMode)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-rose-600" />
                    Chọn gộp nhiều đường kinh
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] ${
                      multiSelectMode ? 'bg-rose-100 text-rose-700' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {multiSelectMode ? 'Nhiều kinh' : 'Đơn kinh'}
                  </span>
                </button>

                <div className="pt-1 flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMeridianIds(ACU_ATLAS_BAR_ITEMS.map((i) => i.id));
                      setShowToolPopover(false);
                    }}
                    className="flex-1 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 cursor-pointer"
                  >
                    Bật Tất Cả Kinh
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMeridianIds(['LU', 'LI']);
                      setShowToolPopover(false);
                    }}
                    className="flex-1 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 cursor-pointer"
                  >
                    Cặp Phế - Đại Trường
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: CAMERA TARGET BUTTON */}
          <div className="pointer-events-auto shrink-0 flex flex-col items-end">
            <button
              type="button"
              onClick={() => {
                setShowCameraPopover(!showCameraPopover);
                setShowSearchModal(false);
                setShowToolPopover(false);
              }}
              title="Chọn góc nhìn giải phẫu (Chính diện, Cánh tay, Nghiêng, Sau lưng...)"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white/95 hover:bg-white text-slate-900 shadow-lg border border-slate-200/80 flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
            >
              <Crosshair className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
            </button>

          {showCameraPopover && (
            <div className="mt-2 w-56 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 p-2.5 text-slate-800 space-y-1 animate-fade-in">
              <div className="px-2 py-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                Góc Nhìn Giải Phẫu 3D
              </div>
              {[
                { id: 'front', label: 'Chính diện (Toàn thân trước)' },
                { id: 'leftArm', label: 'Cánh tay & Bàn tay Trái' },
                { id: 'rightArm', label: 'Cánh tay & Bàn tay Phải' },
                { id: 'sideProfile', label: 'Nghiêng Bên (Vai - Cánh tay)' },
                { id: 'back', label: 'Sau Lưng (Cột sống - Du huyệt)' },
                { id: 'head', label: 'Cận cảnh Đầu - Mặt - Cổ' },
                { id: 'legs', label: 'Hai Chân & Bàn chân' },
              ].map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => {
                    setCameraView(v.id as any);
                    setShowCameraPopover(false);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-rose-50 hover:text-rose-700 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>{v.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              ))}
            </div>
          )}
          </div>
        </div>

        {/* Quick View Pills along bottom-right above the white bar */}
        <div className="absolute bottom-4 right-4 z-10 flex flex-wrap justify-end gap-1.5">
          {[
            { id: 'front', label: 'Chính diện' },
            { id: 'leftArm', label: 'Tay Trái' },
            { id: 'rightArm', label: 'Tay Phải' },
            { id: 'sideProfile', label: 'Nghiêng' },
            { id: 'back', label: 'Sau Lưng' },
            { id: 'head', label: 'Đầu Mặt' },
            { id: 'legs', label: 'Hai Chân' },
          ].map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => setCameraView(btn.id as any)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm transition-all cursor-pointer ${
                activePresetLabel === btn.label
                  ? 'bg-[#d93829] text-white shadow-md'
                  : 'bg-white/85 hover:bg-white text-slate-800 border border-slate-200/70'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* ===================================================================
            SEARCH MODAL OVERLAY (Triggered by top-left 🔍 button)
           =================================================================== */}
        {showSearchModal && (
          <div className="absolute top-20 left-4 z-30 w-80 sm:w-96 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 p-3.5 text-slate-900 animate-fade-in">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2.5">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm trong 361 huyệt (VD: Lu-1, LI-4, ST-36, Hợp Cốc)..."
                className="w-full text-xs sm:text-sm font-medium bg-transparent focus:outline-none text-slate-900 placeholder:text-slate-400"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowSearchModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 mt-2">
              {searchResults.map((item) => (
                <button
                  key={`${item.meridianId}-${item.code}`}
                  type="button"
                  onClick={() => {
                    if (!activeMeridianIds.includes(item.meridianId)) {
                      setActiveMeridianIds((prev) => [...prev, item.meridianId]);
                    }
                    focusOnPoint(item.detail);
                    setShowSearchModal(false);
                  }}
                  className="w-full text-left py-2 px-2 hover:bg-rose-50 rounded-lg transition-colors flex items-center justify-between gap-2 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded bg-rose-600 text-white font-mono text-[11px] font-bold">
                        {item.displayCode}
                      </span>
                      <span className="text-xs font-bold text-slate-900">
                        {item.detail.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {item.detail.location}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================
            SELECTED ACUPOINT CLINICAL DETAIL CARD
           =================================================================== */}
        {selectedPoint && (
          <div className="absolute top-20 left-4 z-30 max-w-sm w-[calc(100%-2rem)] bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-2xl text-slate-900 space-y-2.5 animate-fade-in">
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-[#d93829] text-white font-mono text-xs font-extrabold">
                    {selectedPoint.code}
                  </span>
                  <h4 className="text-base font-extrabold text-slate-900">
                    {selectedPoint.name}
                  </h4>
                  {selectedPoint.chineseName &&
                    selectedPoint.chineseName !== selectedPoint.code && (
                      <span className="text-xs text-slate-500 font-serif">
                        ({selectedPoint.chineseName})
                      </span>
                    )}
                </div>
                <p className="text-xs font-bold text-rose-700 mt-0.5">
                  {selectedPoint.meridianName}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPoint(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5 text-xs leading-relaxed">
              {selectedPoint.specialRole && (
                <div className="px-2.5 py-1.5 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-900">
                  <span className="font-bold">Đặc tính huyệt: </span>
                  <span>{selectedPoint.specialRole}</span>
                </div>
              )}
              <div>
                <span className="font-bold text-slate-900">• Vị trí giải phẫu: </span>
                <span className="text-slate-700">{selectedPoint.location}</span>
              </div>
              <div>
                <span className="font-bold text-slate-900">• Giải phẫu thần kinh - cơ: </span>
                <span className="text-slate-700">{selectedPoint.anatomy}</span>
              </div>
              <div>
                <span className="font-bold text-slate-900">• Công năng: </span>
                <span className="text-slate-700">{selectedPoint.actions}</span>
              </div>
              <div>
                <span className="font-bold text-slate-900">• Kỹ thuật châm: </span>
                <span className="text-slate-700">{selectedPoint.depth}</span>
              </div>
              {selectedPoint.indications && selectedPoint.indications.length > 0 && (
                <div className="pt-1 border-t border-slate-100">
                  <span className="font-bold text-rose-700">• Chủ trị lâm sàng: </span>
                  <span className="text-slate-700">
                    {selectedPoint.indications.join('; ')}.
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================================================================
            LEFT MENU DRAWER (Triggered by ☰ button on bottom bar)
           =================================================================== */}
        {showMenuDrawer && (
          <div className="absolute bottom-2 left-2 z-30 w-80 sm:w-96 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 p-4 text-slate-900 space-y-3 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Danh Sách 14 Đường Kinh & 361 Huyệt Vị 3D
                </h3>
                <p className="text-[11px] text-slate-500">
                  Định vị chính xác từng milimet trên lưới cơ thể người 3D
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowMenuDrawer(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => setActiveMeridianIds(ACU_ATLAS_BAR_ITEMS.map((m) => m.id))}
                className="flex-1 py-1.5 rounded-lg bg-[#d93829] text-white text-xs font-bold hover:bg-rose-700 cursor-pointer"
              >
                Hiện Cả 14 Kinh
              </button>
              <button
                type="button"
                onClick={() => setActiveMeridianIds(['LU', 'LI'])}
                className="flex-1 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-bold hover:bg-slate-200 cursor-pointer"
              >
                Cặp Phế - Đại Trường
              </button>
            </div>

            <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
              {MERIDIANS_3D_DATA.map((m) => {
                const isChecked = activeMeridianIds.includes(m.id);
                const mPoints = allPlottedPoints.filter((p) => p.meridianId === m.id);
                return (
                  <div key={m.id} className="py-2">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleToggleMeridian(m.id)}
                        className="flex items-center gap-2 text-left cursor-pointer"
                      >
                        <span
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isChecked
                              ? 'bg-[#d93829] border-[#d93829] text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </span>
                        <div>
                          <div className="text-xs font-extrabold text-slate-900">
                            {m.code} — {m.vietnameseName}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {m.name} • {m.flowTime}
                          </div>
                        </div>
                      </button>
                      <span className="text-[11px] font-bold text-slate-400">
                        {mPoints.length} huyệt
                      </span>
                    </div>

                    {isChecked && mPoints.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5 pl-6">
                        {mPoints.map((sp) => (
                          <button
                            key={sp.code}
                            type="button"
                            onClick={() => {
                              focusOnPoint(sp.detail);
                              setShowMenuDrawer(false);
                            }}
                            className="px-2 py-0.5 rounded bg-slate-100 hover:bg-rose-100 hover:text-rose-800 text-[10px] font-bold text-slate-700 cursor-pointer"
                          >
                            {sp.detail.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* =====================================================================
          BOTTOM WHITE ACU ATLAS 3D MERIDIAN BAR (☰ | Lu | Li | St | Sp | He | Si | Bl | Ki | Pc | Tb | Gb | Lv | Du | Rn)
         ===================================================================== */}
      <div className="w-full bg-[#f5f5f5] border-t border-slate-300 flex items-stretch h-20 sm:h-22">
        {/* Left Hamburger Button (☰) */}
        <button
          type="button"
          onClick={() => setShowMenuDrawer(!showMenuDrawer)}
          title="Mở danh sách chi tiết 14 Kinh Mạch & 361 Huyệt vị"
          className="w-16 sm:w-20 shrink-0 flex flex-col items-center justify-center border-r border-slate-300 hover:bg-slate-200/70 text-slate-600 transition-colors cursor-pointer"
        >
          <Menu className="w-7 h-7 stroke-[2]" />
          <span className="text-[10px] font-semibold text-slate-500 mt-0.5">
            14 Kinh
          </span>
        </button>

        {/* Horizontal Scrollable Meridian Code Tabs */}
        <div className="flex-1 flex items-stretch overflow-x-auto scrollbar-thin divide-x divide-slate-200/70">
          {ACU_ATLAS_BAR_ITEMS.map((item) => {
            const isActive = activeMeridianIds.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleToggleMeridian(item.id)}
                className={`min-w-[68px] sm:min-w-[82px] px-2.5 flex flex-col items-center justify-center transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-white shadow-inner'
                    : 'bg-[#f5f5f5] hover:bg-white/70'
                }`}
              >
                <span
                  className={`text-2xl sm:text-[28px] font-extrabold tracking-tight leading-none ${
                    isActive ? 'text-[#d83427]' : 'text-[#686868]'
                  }`}
                >
                  {item.shortLabel}
                </span>
                <span
                  className={`text-[11px] font-medium mt-1 leading-tight whitespace-nowrap ${
                    isActive ? 'text-slate-900 font-bold' : 'text-slate-600'
                  }`}
                >
                  {item.enName}
                </span>
                <span
                  className={`text-[9px] leading-none mt-0.5 ${
                    isActive ? 'text-[#d83427] font-semibold' : 'text-slate-400'
                  }`}
                >
                  {item.viShort}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
