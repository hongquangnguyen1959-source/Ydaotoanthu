import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  MERIDIANS_3D_DATA,
  Acupoint3D,
  MERIDIAN_FLOW_META,
  EXTRAORDINARY_VESSELS_META,
  TUNG_3D_ANCHOR_SPECS,
} from '../data/meridians3dData';
import { TUNG_POINTS } from '../data/tungPoints';
import { COMPLETE_ACUPOINT_CLINICAL_DB } from '../data/acupoints';
import { buildCompleteAnatomicalSkeleton3D } from '../utils/humanSkeleton3DBuilder';
import {
  buildZangFuOrgans3D,
  ZangFuOrgansRig,
  ZangFuOrganInfo,
} from '../utils/zangFuOrgans3DBuilder';
import {
  buildCunGuides3D,
  CunGuidesRig,
  buildAcupunctureNeedle3D,
  AcupunctureNeedleRig,
  QiBeadTrack,
  isSpecialAcupoint,
  extractClinicalSafetyWarning,
  snapAnchorToHumanMesh,
} from '../utils/meridianFlowAndGuides3D';
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
  Bone,
  Navigation,
  Heart,
  Ruler,
  Filter,
  AlertTriangle,
  ArrowRight,
  Pause,
  Play,
  Syringe,
} from 'lucide-react';

export interface AtlasBarItem {
  id: string;
  shortLabel: string;
  enName: string;
  viShort: string;
  lineColor: string;
  pointPrefix: string;
  maxIndex: number;
  category: 'main' | 'extra_vessel' | 'special';
}

// Complete Bottom Bar items: 14 Main/Ren-Du + 6 Extraordinary Vessels + 58 WHO Extra Points + Đổng Thị 3D
const ACU_ATLAS_BAR_ITEMS: AtlasBarItem[] = [
  { id: 'LU', shortLabel: 'Lu', enName: 'Lung', viShort: 'Phế', lineColor: '#2563eb', pointPrefix: 'Lu', maxIndex: 11, category: 'main' },
  { id: 'LI', shortLabel: 'Li', enName: 'Large Intestine', viShort: 'Đại Trường', lineColor: '#c25e1a', pointPrefix: 'LI', maxIndex: 20, category: 'main' },
  { id: 'ST', shortLabel: 'St', enName: 'Stomach', viShort: 'Vị', lineColor: '#d97706', pointPrefix: 'ST', maxIndex: 45, category: 'main' },
  { id: 'SP', shortLabel: 'Sp', enName: 'Spleen', viShort: 'Tỳ', lineColor: '#ea580c', pointPrefix: 'SP', maxIndex: 21, category: 'main' },
  { id: 'HT', shortLabel: 'He', enName: 'Heart', viShort: 'Tâm', lineColor: '#dc2626', pointPrefix: 'He', maxIndex: 9, category: 'main' },
  { id: 'SI', shortLabel: 'Si', enName: 'Small Intestine', viShort: 'Tiểu Trường', lineColor: '#e11d48', pointPrefix: 'SI', maxIndex: 19, category: 'main' },
  { id: 'BL', shortLabel: 'Bl', enName: 'Bladder', viShort: 'Bàng Quang', lineColor: '#1d4ed8', pointPrefix: 'BL', maxIndex: 67, category: 'main' },
  { id: 'KI', shortLabel: 'Ki', enName: 'Kidney', viShort: 'Thận', lineColor: '#4f46e5', pointPrefix: 'KI', maxIndex: 27, category: 'main' },
  { id: 'PC', shortLabel: 'Pc', enName: 'Pericardium', viShort: 'Tâm Bào', lineColor: '#db2777', pointPrefix: 'PC', maxIndex: 9, category: 'main' },
  { id: 'TE', shortLabel: 'Tb', enName: 'Triple Burner', viShort: 'Tam Tiêu', lineColor: '#9333ea', pointPrefix: 'TB', maxIndex: 23, category: 'main' },
  { id: 'GB', shortLabel: 'Gb', enName: 'Gallbladder', viShort: 'Đởm', lineColor: '#059669', pointPrefix: 'GB', maxIndex: 44, category: 'main' },
  { id: 'LR', shortLabel: 'Lv', enName: 'Liver', viShort: 'Can', lineColor: '#047857', pointPrefix: 'LV', maxIndex: 14, category: 'main' },
  { id: 'GV', shortLabel: 'Du', enName: 'Governing', viShort: 'Đốc Mạch', lineColor: '#b45309', pointPrefix: 'DU', maxIndex: 29, category: 'main' },
  { id: 'CV', shortLabel: 'Rn', enName: 'Conception', viShort: 'Nhâm Mạch', lineColor: '#7c3aed', pointPrefix: 'RN', maxIndex: 24, category: 'main' },
  // 6 Kỳ Kinh Bát Mạch còn lại
  ...EXTRAORDINARY_VESSELS_META.map((v) => ({
    id: v.id,
    shortLabel: v.shortLabel,
    enName: v.enName,
    viShort: v.viShort,
    lineColor: v.lineColor,
    pointPrefix: v.id,
    maxIndex: 0,
    category: 'extra_vessel' as const,
  })),
  // 58 Kỳ Huyệt WHO + 40 Đổng Thị Kỳ Huyệt 3D
  { id: 'EX', shortLabel: 'Ex', enName: 'Extra Points', viShort: '58 Kỳ Huyệt', lineColor: '#e11d48', pointPrefix: 'EX', maxIndex: 58, category: 'special' },
  { id: 'DT', shortLabel: 'ĐT', enName: 'Master Tung', viShort: 'Đổng Thị 3D', lineColor: '#0f766e', pointPrefix: 'ĐT', maxIndex: 40, category: 'special' },
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
  snappedNormal?: [number, number, number];
  isSpecial?: boolean;
  detail: Acupoint3D;
}

/**
 * Generate a crisp, fine-grained 1024x1024 epidermal micro-texture bump map
 * and matching micro-roughness map (Langer lines + rhomboid skin micro-furrows + follicular pores).
 */
function createHighDefSkinBumpTexture(): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const img = ctx.createImageData(size, size);
  const data = img.data;
  const twoPi = Math.PI * 2;

  for (let y = 0; y < size; y++) {
    const ny = (y / size) * twoPi;
    for (let x = 0; x < size; x++) {
      const nx = (x / size) * twoPi;
      // Primary & secondary rhomboid epidermal sulcus network (cristae cutis & sulci cutis)
      const furrow1 =
        Math.sin(nx * 46 + ny * 38) * Math.cos(nx * 38 - ny * 46);
      const furrow2 =
        Math.sin(nx * 96 - ny * 82) * Math.cos(nx * 82 + ny * 96) * 0.55;
      // Fine follicular pore pits
      const poreGrid =
        Math.sin(nx * 148 + Math.cos(ny * 32) * 1.8) *
        Math.sin(ny * 148 - Math.sin(nx * 32) * 1.8);
      const poreIndent = poreGrid > 0.72 ? -(poreGrid - 0.72) * 48 : 0;

      const hash = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
      const grain = hash - Math.floor(hash) - 0.5;

      const val = Math.max(
        0,
        Math.min(
          255,
          Math.round(128 + furrow1 * 11 + furrow2 * 8 + poreIndent + grain * 14)
        )
      );
      const idx = (y * size + x) * 4;
      data[idx] = val;
      data[idx + 1] = val;
      data[idx + 2] = val;
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(18, 18);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Generates a high-resolution 512x512 photorealistic human eye texture
 * with an anti-aliased pupil, radial iris stroma fibers, iris crypts, collarette ring,
 * dark limbal ring, upper eyelid cast shadow, medial lacrimal caruncle warmth, and dual studio catchlights.
 */
function createPhotorealisticEyeTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(size, size);
  const data = img.data;

  // Normalized radius in UV space where R_ball = 0.0126 maps to 0.50
  // Iris radius = 0.0056m -> rNorm = 0.0056 / 0.0126 = 0.444
  // Pupil radius = 0.00195m -> rNorm = 0.00195 / 0.0126 = 0.155
  const rPupil = 0.152;
  const rCollarette = 0.265;
  const rIris = 0.442;

  for (let py = 0; py < size; py++) {
    // dy > 0 is upper eye, dy < 0 is lower eye
    const dy = (0.5 - py / size) * 2.0;
    for (let px = 0; px < size; px++) {
      const dx = (px / size - 0.5) * 2.0;
      const r = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx);

      let R = 247;
      let G = 244;
      let B = 240;

      if (r < rIris + 0.018) {
        if (r < rPupil) {
          // Deep velvet-black pupil with subtle sphincter transition
          const edgeT = Math.max(0, (r - (rPupil - 0.018)) / 0.018);
          R = Math.round(8 + edgeT * 28);
          G = Math.round(9 + edgeT * 18);
          B = Math.round(13 + edgeT * 12);
        } else {
          // Multi-layered human brown-amber iris with radial stroma fibers & crypts
          const tIris = Math.min(1, (r - rPupil) / (rIris - rPupil));
          const fiber1 = Math.sin(angle * 64 + Math.cos(r * 28) * 1.4);
          const fiber2 = Math.cos(angle * 112 - Math.sin(r * 42) * 1.1);
          const crypt = Math.sin(angle * 19 + 1.2) * Math.cos(r * 36);
          const radialDetail = fiber1 * 0.48 + fiber2 * 0.32 + crypt * 0.20;

          // Collarette ring highlight around rCollarette
          const collarette = Math.exp(-Math.pow((r - rCollarette) / 0.048, 2));

          // Base warm espresso-chestnut iris
          let ir = 82 + collarette * 36 + radialDetail * 22 - tIris * 26;
          let ig = 49 + collarette * 22 + radialDetail * 14 - tIris * 18;
          let ib = 28 + collarette * 10 + radialDetail * 8 - tIris * 11;

          // Dark limbal ring at outer edge of iris (tIris > 0.78)
          if (tIris > 0.76) {
            const limbalT = Math.min(1, (tIris - 0.76) / 0.24);
            const limbalDark = 1 - limbalT * 0.68;
            ir *= limbalDark;
            ig *= limbalDark;
            ib *= limbalDark;
          }

          // Smooth anti-aliased transition from iris to sclera
          if (r > rIris - 0.012) {
            const scleralBlend = Math.min(1, (r - (rIris - 0.012)) / 0.030);
            ir = ir * (1 - scleralBlend) + 242 * scleralBlend;
            ig = ig * (1 - scleralBlend) + 239 * scleralBlend;
            ib = ib * (1 - scleralBlend) + 236 * scleralBlend;
          }

          R = Math.round(ir);
          G = Math.round(ig);
          B = Math.round(ib);
        }
      } else {
        // Sclera with subtle peripheral vascular warmth and ambient curvature shading
        const scleralDist = Math.min(1, (r - rIris) / 0.56);
        const veinNoise =
          Math.max(0, Math.sin(angle * 23 + r * 18) * Math.cos(angle * 37 - r * 24)) *
          scleralDist;
        R = Math.round(247 - scleralDist * 14 + veinNoise * 6);
        G = Math.round(244 - scleralDist * 20 - veinNoise * 5);
        B = Math.round(240 - scleralDist * 22 - veinNoise * 6);
      }

      // Natural upper-eyelid ambient occlusion & cast shadow across top of eye (dy > 0.14)
      if (dy > 0.12) {
        const lidShadow = Math.min(0.52, Math.pow((dy - 0.12) / 0.55, 1.35) * 0.58);
        R = Math.round(R * (1 - lidShadow * 0.82));
        G = Math.round(G * (1 - lidShadow * 0.86));
        B = Math.round(B * (1 - lidShadow * 0.88));
      }
      // Subtle lower-lid tear meniscus warmth
      if (dy < -0.28) {
        const lowerT = Math.min(0.28, (-dy - 0.28) * 0.45);
        R = Math.round(R * (1 - lowerT * 0.22));
        G = Math.round(G * (1 - lowerT * 0.30));
        B = Math.round(B * (1 - lowerT * 0.32));
      }

      // Primary crisp corneal window catchlight (upper-right of pupil)
      const dCatch1 = Math.hypot((dx - 0.115) * 1.1, (dy - 0.125) * 0.95);
      if (dCatch1 < 0.068) {
        const c1 = Math.pow(1 - dCatch1 / 0.068, 0.55);
        R = Math.round(R + (255 - R) * c1);
        G = Math.round(G + (255 - G) * c1);
        B = Math.round(B + (255 - B) * c1);
      }

      // Secondary soft lower-left corneal catchlight
      const dCatch2 = Math.hypot(dx + 0.125, dy + 0.115);
      if (dCatch2 < 0.036) {
        const c2 = (1 - dCatch2 / 0.036) * 0.72;
        R = Math.round(R + (255 - R) * c2);
        G = Math.round(G + (255 - G) * c2);
        B = Math.round(B + (255 - B) * c2);
      }

      const idx = (py * size + px) * 4;
      data[idx] = Math.max(0, Math.min(255, R));
      data[idx + 1] = Math.max(0, Math.min(255, G));
      data[idx + 2] = Math.max(0, Math.min(255, B));
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  tex.needsUpdate = true;
  return tex;
}

/**
 * Create a high-resolution 3D anatomical eyeball pair (left & right)
 * positioned inside the eye sockets at (±0.0345, 1.7158, 0.1432) with radius 0.0126m,
 * plus sculpted 3D corneal bulge and medial lacrimal caruncle shading.
 */
function createRealistic3DEyeballGeometry(): THREE.BufferGeometry {
  const baseSphere = new THREE.SphereGeometry(0.0126, 56, 40);
  const posAttr = baseSphere.attributes.position;
  const vCount = posAttr.count;
  const idxArray = baseSphere.index!.array;

  const totalVerts = vCount * 2;
  const positions = new Float32Array(totalVerts * 3);
  const normals = new Float32Array(totalVerts * 3);
  const uvs = new Float32Array(totalVerts * 2);
  const colors = new Float32Array(totalVerts * 3);
  const indices = new Uint32Array(idxArray.length * 2);

  const cWhite = new THREE.Color('#ffffff');
  const cCaruncle = new THREE.Color('#de837b');
  const tmp = new THREE.Color();

  const eyeCenters: [number, number, number][] = [
    [-0.0345, 1.7158, 0.1432],
    [0.0345, 1.7158, 0.1432],
  ];

  eyeCenters.forEach(([cx, cy, cz], sideIdx) => {
    const vOffset = sideIdx * vCount;
    for (let i = 0; i < vCount; i++) {
      const lx = posAttr.getX(i);
      const ly = posAttr.getY(i);
      let lz = posAttr.getZ(i);

      // Subtle anatomical corneal dome bulge over the anterior iris (r < 0.0058)
      const rAnt = Math.hypot(lx, ly);
      if (lz > 0 && rAnt < 0.0060) {
        const dome = Math.cos((rAnt / 0.0060) * Math.PI * 0.5);
        lz += 0.00055 * dome * dome;
      }

      const wx = cx + lx;
      const wy = cy + ly;
      const wz = cz + lz;

      positions[(vOffset + i) * 3] = wx;
      positions[(vOffset + i) * 3 + 1] = wy;
      positions[(vOffset + i) * 3 + 2] = wz;

      const invR = 1 / Math.hypot(lx, ly, lz);
      normals[(vOffset + i) * 3] = lx * invR;
      normals[(vOffset + i) * 3 + 1] = ly * invR;
      normals[(vOffset + i) * 3 + 2] = lz * invR;

      // Planar frontal UV projection onto the 512x512 eye texture
      const u = THREE.MathUtils.clamp(0.5 + lx / (2 * 0.0126), 0.01, 0.99);
      const v = THREE.MathUtils.clamp(0.5 + ly / (2 * 0.0126), 0.01, 0.99);
      uvs[(vOffset + i) * 2] = u;
      uvs[(vOffset + i) * 2 + 1] = v;

      // Medial canthus lacrimal caruncle tint at inner corner of eye
      tmp.copy(cWhite);
      const medialX = sideIdx === 0 ? lx : -lx;
      if (lz > 0 && medialX > 0.0078) {
        tmp.lerp(cCaruncle, Math.min(0.82, (medialX - 0.0078) * 210));
      }

      colors[(vOffset + i) * 3] = tmp.r;
      colors[(vOffset + i) * 3 + 1] = tmp.g;
      colors[(vOffset + i) * 3 + 2] = tmp.b;
    }

    const iOffset = sideIdx * idxArray.length;
    for (let j = 0; j < idxArray.length; j++) {
      indices[iOffset + j] = idxArray[j] + vOffset;
    }
  });

  baseSphere.dispose();

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.setIndex(new THREE.BufferAttribute(indices, 1));
  return geo;
}

/**
 * Clean, High-Definition Anatomical Skin Sculpting & Dermatological Shading for `/models/human-learning.glb`:
 * 1. Removes 100% of the internal oral pouch via exact topological BFS hop-distance from the throat seed
 *    and seamlessly closes the upper & lower lip inner rims along a natural Cupid's-bow parting line.
 * 2. Sculpts subtle, realistic 3D musculoskeletal & surface landmarks:
 *    - Clavicles, sternocleidomastoid (SCM) muscles, suprasternal jugular notch, pectorals, linea alba, rectus abdominis
 *    - Posterior vertebral furrow (Đốc Mạch), scapular spine & medial border, erector spinae, sacral dimples (Yêu Nhãn)
 *    - Palmar flexion creases (thenar, transverse palmar, wrist creases), finger joint creases, extensor tendons, and fingernails
 * 3. Applies lifelike multi-chromophore human skin shading with hair-stroke eyebrows, ciliary lash lines, and vascular zones.
 */
function enhanceAndColorHumanGeometry(geometry: THREE.BufferGeometry) {
  const posAttr = geometry.attributes.position;
  let normAttr = geometry.attributes.normal;
  if (!normAttr) {
    geometry.computeVertexNormals();
    normAttr = geometry.attributes.normal;
  }

  const count = posAttr.count;
  const idxAttr = geometry.index;
  const cavity = new Float32Array(count);

  if (idxAttr) {
    const rawIdxArray = idxAttr.array;

    // Build full vertex adjacency on original mesh
    const rawAdj: number[][] = Array.from({ length: count }, () => []);
    for (let t = 0; t < rawIdxArray.length; t += 3) {
      const a = rawIdxArray[t];
      const b = rawIdxArray[t + 1];
      const c = rawIdxArray[t + 2];
      rawAdj[a].push(b, c);
      rawAdj[b].push(a, c);
      rawAdj[c].push(a, b);
    }

    // --- STEP 1: Exact Topological BFS from Throat Seed to Strip 100% of Internal Oral Pouch ---
    // In human-learning.glb:
    //   hop 0..10: Internal throat & oral mucosal cavity (z <= 0.1682)
    //   hop 11: Innermost lip rim (upper lip v=474 at y=1.6409, lower inner mucosa v=557 at y=1.6374)
    //   hop 12: Upper lip lower roll (v=468 at y=1.6433) and lower inner lip (v=540 at y=1.6402)
    //   hop 13: Upper lip tubercle (v=509 at y=1.6454) and lower lip inner edge (v=523 at y=1.6406)
    //   hop 14: Upper lip Cupid's bow (v=467 at y=1.6479) and lower lip top edge (v=493 at y=1.6401)
    const hopDist = new Int32Array(count).fill(-1);
    let oralSeed = -1;
    for (let i = 0; i < count; i++) {
      if (
        Math.abs(posAttr.getX(i)) < 0.005 &&
        posAttr.getY(i) > 1.65 &&
        posAttr.getY(i) < 1.67 &&
        posAttr.getZ(i) > 0.07 &&
        posAttr.getZ(i) < 0.09
      ) {
        oralSeed = i;
        break;
      }
    }

    if (oralSeed !== -1) {
      const queue: number[] = [oralSeed];
      hopDist[oralSeed] = 0;
      while (queue.length > 0) {
        const u = queue.shift()!;
        const nbs = rawAdj[u];
        for (let k = 0; k < nbs.length; k++) {
          const v = nbs[k];
          if (hopDist[v] === -1) {
            hopDist[v] = hopDist[u] + 1;
            queue.push(v);
          }
        }
      }
    }

    // Remove internal oral cavity triangles (hopDist <= 10, plus deep lower mucosal ring hopDist <= 11 with z < 0.1685)
    const isInternalOralVertex = new Uint8Array(count);
    for (let i = 0; i < count; i++) {
      const d = hopDist[i];
      if (d >= 0 && (d <= 10 || (d === 11 && posAttr.getZ(i) < 0.1685))) {
        isInternalOralVertex[i] = 1;
      }
    }

    const filteredIndices: number[] = [];
    for (let t = 0; t < rawIdxArray.length; t += 3) {
      const a = rawIdxArray[t];
      const b = rawIdxArray[t + 1];
      const c = rawIdxArray[t + 2];
      if (
        isInternalOralVertex[a] ||
        isInternalOralVertex[b] ||
        isInternalOralVertex[c]
      ) {
        continue;
      }
      filteredIndices.push(a, b, c);
    }
    geometry.setIndex(
      new THREE.BufferAttribute(new Uint32Array(filteredIndices), 1)
    );

    // --- STEP 2: Seamlessly Seal Upper & Lower Lip Rims into Natural Plump Occlusion ---
    for (let i = 0; i < count; i++) {
      const d = hopDist[i];
      if (d >= 11 && d <= 15) {
        const x = posAttr.getX(i);
        let y = posAttr.getY(i);
        let z = posAttr.getZ(i);
        const absX = Math.abs(x);
        if (absX < 0.0245 && z > 0.145) {
          const widthFade = Math.max(0, 1 - Math.pow(absX / 0.024, 2));
          // Natural Cupid's bow lip parting curve
          const lipSeamY = 1.6409 + Math.pow(absX / 0.023, 2) * 0.0005;
          const lipSeamZ = 0.1736 - Math.pow(absX / 0.024, 2) * 0.0175;

          if (d === 11) {
            // Innermost upper lip rim (e.g. v=474): seal directly onto the lip parting seam
            y = THREE.MathUtils.lerp(y, lipSeamY, 0.95 * widthFade);
            z = Math.max(z, THREE.MathUtils.lerp(z, lipSeamZ, 0.85 * widthFade));
          } else if (d === 12) {
            if (y > 1.6415) {
              // Upper lip lower roll (v=468 at y=1.6433): roll smoothly down to meet lower lip
              y = THREE.MathUtils.lerp(y, lipSeamY + 0.0005, 0.78 * widthFade);
            } else {
              // Lower inner lip rim (v=540): bring up and forward to tuck seamlessly behind upper lip
              y = THREE.MathUtils.lerp(y, lipSeamY, 0.95 * widthFade);
              z = Math.max(z, THREE.MathUtils.lerp(z, lipSeamZ - 0.0003, 0.90 * widthFade));
            }
          } else if (d === 13) {
            if (y < 1.6425) {
              // Lower lip inner edge (v=523): bring up to lip parting seam
              y = THREE.MathUtils.lerp(y, lipSeamY - 0.0001, 0.92 * widthFade);
              z = Math.max(z, THREE.MathUtils.lerp(z, lipSeamZ - 0.0001, 0.85 * widthFade));
            } else {
              // Upper lip tubercle (v=509 at y=1.6454): subtle plumpness
              y = THREE.MathUtils.lerp(y, lipSeamY + 0.0028, 0.35 * widthFade);
              z += 0.0005 * widthFade;
            }
          } else if (d === 14 && y < 1.6415) {
            // Lower lip top border (v=493 at y=1.6401): touch upper lip roll with zero gap
            y = THREE.MathUtils.lerp(y, lipSeamY - 0.0002, 0.85 * widthFade);
            z += 0.0012 * widthFade;
          } else if (d === 15 && y < 1.6400) {
            // Lower lip upper cushion (v=494 at y=1.6387): plump forward slightly
            y = THREE.MathUtils.lerp(y, lipSeamY - 0.0014, 0.45 * widthFade);
            z += 0.0008 * widthFade;
          }
          posAttr.setXYZ(i, x, y, z);
        }
      }
    }

    // Build clean adjacency after oral pouch removal
    const idxArray = geometry.index!.array;
    const adj: number[][] = Array.from({ length: count }, () => []);
    for (let t = 0; t < idxArray.length; t += 3) {
      const a = idxArray[t];
      const b = idxArray[t + 1];
      const c = idxArray[t + 2];
      adj[a].push(b, c);
      adj[b].push(a, c);
      adj[c].push(a, b);
    }

    const posArr = posAttr.array as Float32Array;
    const tmpArr = new Float32Array(posArr.length);

    // Gentle 2-pass Taubin fairing ONLY on rigging transition zones ( preserves clavicles, muscles, face & hands! )
    const smoothPass = (factor: number) => {
      tmpArr.set(posArr);
      for (let i = 0; i < count; i++) {
        const x = Math.abs(posArr[i * 3]);
        const y = posArr[i * 3 + 1];
        // Never blur face/ears (y > 1.585), hands/wrists (x > 0.46), or feet/toes (y < 0.07)
        if (y > 1.585 || x > 0.46 || y < 0.070) continue;

        const nb = adj[i];
        const nLen = nb.length;
        if (nLen === 0) continue;

        let sx = 0;
        let sy = 0;
        let sz = 0;
        for (let k = 0; k < nLen; k++) {
          const j = nb[k] * 3;
          sx += posArr[j];
          sy += posArr[j + 1];
          sz += posArr[j + 2];
        }
        const inv = 1 / nLen;

        // Moderate fairing on elbow/axilla rigging seams; light fairing on torso so muscles stay defined
        let weight = 0.22;
        if (x > 0.24 && x < 0.42) {
          weight = 0.52;
        }
        const f = factor * weight;
        tmpArr[i * 3] = posArr[i * 3] + f * (sx * inv - posArr[i * 3]);
        tmpArr[i * 3 + 1] = posArr[i * 3 + 1] + f * (sy * inv - posArr[i * 3 + 1]);
        tmpArr[i * 3 + 2] = posArr[i * 3 + 2] + f * (sz * inv - posArr[i * 3 + 2]);
      }
      posArr.set(tmpArr);
    };

    for (let iter = 0; iter < 2; iter++) {
      smoothPass(0.42);
      smoothPass(-0.435);
    }

    // --- STEP 3: Sculpt Realistic 3D Musculoskeletal & Surface Landmarks ---
    geometry.computeVertexNormals();
    normAttr = geometry.attributes.normal;

    for (let i = 0; i < count; i++) {
      let x = posArr[i * 3];
      let y = posArr[i * 3 + 1];
      let z = posArr[i * 3 + 2];
      const absX = Math.abs(x);
      const nx = normAttr.getX(i);
      const ny = normAttr.getY(i);
      const nz = normAttr.getZ(i);

      let disp = 0; // Normal displacement in meters

      // A. ANTERIOR NECK, CLAVICLES, CHEST & ABDOMEN (z > 0.02, y in 0.94..1.58)
      if (z > 0.02 && y > 0.94 && y < 1.58 && absX < 0.175) {
        // 1. Suprasternal jugular notch (Hõm ức Thiên Đột CV-22 at x=0, y=1.500)
        const dNotch = Math.hypot(x / 0.015, (y - 1.500) / 0.014);
        if (dNotch < 1.5) {
          disp -= 0.0022 * Math.exp(-dNotch * dNotch * 1.4);
        }

        // 2. Sternocleidomastoid (SCM) muscle columns (Cơ ức đòn chũm)
        if (y >= 1.495 && y <= 1.585) {
          const tScm = (y - 1.495) / 0.090;
          const scmCenterX = 0.015 + tScm * 0.036;
          const dScm = Math.abs(absX - scmCenterX);
          if (dScm < 0.014) {
            disp += 0.0014 * Math.cos((dScm / 0.014) * Math.PI * 0.5) * Math.sin(tScm * Math.PI);
          }
        }

        // 3. Clavicular bone ridge (Xương đòn) & supraclavicular fossa (Hố thượng đòn ST-12)
        if (absX >= 0.016 && absX <= 0.148 && y >= 1.465 && y <= 1.530) {
          const clavT = (absX - 0.016) / 0.132;
          const clavY = 1.493 + 0.011 * Math.sin(clavT * Math.PI * 0.75);
          const dyClav = y - clavY;
          const envX = Math.sin(clavT * Math.PI);
          // Prominent bony ridge along clavicle
          disp += 0.0019 * Math.exp(-Math.pow(dyClav / 0.0075, 2)) * envX;
          // Supraclavicular hollow just above clavicle
          disp -= 0.0014 * Math.exp(-Math.pow((dyClav - 0.012) / 0.0085, 2)) * envX;
        }

        // 4. Median sternal furrow (Rãnh ức Đản Trung CV-17) & Pectoral contour
        if (y >= 1.295 && y <= 1.465 && absX < 0.025) {
          const sternalEnv = Math.sin(((y - 1.295) / 0.170) * Math.PI);
          disp -= 0.0013 * Math.exp(-Math.pow(x / 0.011, 2)) * sternalEnv;
        }

        // 5. Linea alba (Đường trắng giữa bụng CV-14 -> CV-8 -> CV-4)
        if (y >= 0.990 && y <= 1.290 && absX < 0.018) {
          const albaEnv = Math.sin(((y - 0.990) / 0.300) * Math.PI);
          disp -= 0.0015 * Math.exp(-Math.pow(x / 0.0075, 2)) * albaEnv;
        }

        // 6. Linea semilunaris & Rectus abdominis muscular relief
        if (y >= 1.040 && y <= 1.275 && absX >= 0.008 && absX <= 0.082) {
          const absEnvY = Math.sin(((y - 1.040) / 0.235) * Math.PI);
          // Lateral border of rectus abdominis (linea semilunaris at absX ~ 0.064)
          disp -= 0.0010 * Math.exp(-Math.pow((absX - 0.064) / 0.009, 2)) * absEnvY;
          // Subtle rectus belly fullness between x=0.014 and x=0.052
          if (absX > 0.010 && absX < 0.056) {
            const bellyX = Math.sin(((absX - 0.010) / 0.046) * Math.PI);
            // Tendinous intersections at y = 1.238, 1.178, 1.120
            const tendinous =
              Math.exp(-Math.pow((y - 1.238) / 0.007, 2)) +
              Math.exp(-Math.pow((y - 1.178) / 0.007, 2)) +
              Math.exp(-Math.pow((y - 1.120) / 0.007, 2));
            disp += (0.0011 - 0.0009 * tendinous) * bellyX * absEnvY;
          }
        }
      }

      // B. POSTERIOR BACK, SPINE, SCAPULAE & SACRAL DIMPLES (z < -0.01, y in 0.96..1.53)
      if (z < -0.01 && y > 0.96 && y < 1.53 && absX < 0.175) {
        // 1. C7 Vertebra Prominens (Huyệt Đại Chùy GV-14 at x=0, y=1.505)
        const dC7 = Math.hypot(x / 0.012, (y - 1.505) / 0.012);
        if (dC7 < 1.4) {
          disp += 0.0018 * Math.exp(-dC7 * dC7 * 1.5);
        }

        // 2. Median posterior vertebral furrow (Rãnh cột sống Đốc Mạch) & Erector Spinae columns
        if (y >= 0.995 && y <= 1.485 && absX < 0.065) {
          const spineEnv = Math.sin(((y - 0.995) / 0.490) * Math.PI);
          // Central spinal groove
          disp -= 0.0022 * Math.exp(-Math.pow(x / 0.0105, 2)) * spineEnv;
          // Paravertebral erector spinae muscle columns (absX ~ 0.030, Kinh Bàng Quang)
          disp += 0.0015 * Math.exp(-Math.pow((absX - 0.030) / 0.014, 2)) * spineEnv;
        }

        // 3. Scapular spine (Gai xương bả vai) & Medial scapular border (Bờ trong xương bả vai)
        if (y >= 1.300 && y <= 1.475 && absX >= 0.048 && absX <= 0.155) {
          // Scapular spine running obliquely from (0.055, 1.432) to (0.145, 1.458)
          const spineLineY = 1.432 + ((absX - 0.055) / 0.090) * 0.026;
          const dScapSpine = Math.abs(y - spineLineY);
          const scapEnvX = Math.sin(
            THREE.MathUtils.clamp((absX - 0.050) / 0.100, 0, 1) * Math.PI
          );
          disp += 0.0016 * Math.exp(-Math.pow(dScapSpine / 0.009, 2)) * scapEnvX;

          // Medial border of scapula (absX ~ 0.058 + (1.44 - y) * 0.08)
          if (y >= 1.315 && y <= 1.445) {
            const medX = 0.058 + (1.445 - y) * 0.09;
            const medEnvY = Math.sin(((y - 1.315) / 0.130) * Math.PI);
            disp += 0.0013 * Math.exp(-Math.pow((absX - medX) / 0.0085, 2)) * medEnvY;
          }
        }

        // 4. Lumbar Sacral Dimples (Hõm Yêu Nhãn EX-B7 / PSIS at absX=0.039, y=1.010)
        const dDimple = Math.hypot((absX - 0.039) / 0.011, (y - 1.010) / 0.011);
        if (dDimple < 1.5) {
          disp -= 0.0020 * Math.exp(-dDimple * dDimple * 1.5);
        }
      }

      // C. HANDS, PALMS, WRISTS & FINGERS (absX > 0.48)
      if (absX > 0.48) {
        // 1. Wrist flexion crease (Lằn chỉ cổ tay Thái Uyên LU-9 / Đại Lăng PC-7 / Thần Môn HT-7)
        const wristLine = y - (1.1009 + 0.71 * (absX - 0.5076));
        if (absX < 0.532 && Math.abs(wristLine) < 0.0055 && nz > 0.05) {
          disp -= 0.00065 * Math.exp(-Math.pow(wristLine / 0.0022, 2));
        }

        // 2. Palmar flexion creases (Đường sinh đạo, trí đạo, tâm đạo lòng bàn tay)
        if (absX >= 0.525 && absX <= 0.595 && y >= 1.008 && y <= 1.102 && nz > 0.15) {
          // Thenar crease (life line) curving around thumb base
          const thenarDist = Math.abs(
            Math.hypot(absX - 0.538, y - 1.098) - 0.036
          );
          if (thenarDist < 0.004) {
            disp -= 0.00065 * Math.exp(-Math.pow(thenarDist / 0.0015, 2));
          }
          // Proximal transverse palmar crease (head line through Lao Cung PC-8)
          const headLine = y - (1.062 - 0.48 * (absX - 0.542));
          if (absX >= 0.538 && absX <= 0.590 && Math.abs(headLine) < 0.004) {
            disp -= 0.00060 * Math.exp(-Math.pow(headLine / 0.0015, 2));
          }
          // Distal transverse palmar crease (heart line through Thiếu Phủ HT-8)
          const heartLine = y - (1.022 + 0.42 * (absX - 0.540));
          if (absX >= 0.536 && absX <= 0.588 && Math.abs(heartLine) < 0.004) {
            disp -= 0.00060 * Math.exp(-Math.pow(heartLine / 0.0015, 2));
          }
        }

        // 3. Dorsal hand extensor tendons (Gân duỗi mu bàn tay)
        if (absX >= 0.518 && absX <= 0.582 && y >= 1.015 && y <= 1.085 && nz < -0.10) {
          const wristDx = absX - 0.512;
          const wristDy = y - 1.092;
          const rayAngle = Math.atan2(wristDy, wristDx);
          // 4 extensor tendon rays at angles ~ -0.78, -0.95, -1.12, -1.28 rad
          const tendonWave = Math.cos((rayAngle + 0.78) * 18.5);
          if (tendonWave > 0.4 && rayAngle < -0.68 && rayAngle > -1.36) {
            const radialEnv = Math.sin(((absX - 0.518) / 0.064) * Math.PI);
            disp += 0.00065 * Math.pow((tendonWave - 0.4) / 0.6, 1.5) * radialEnv;
          }
        }
      }

      if (disp !== 0) {
        x += nx * disp;
        y += ny * disp;
        z += nz * disp;
        posArr[i * 3] = x;
        posArr[i * 3 + 1] = y;
        posArr[i * 3 + 2] = z;
      }
    }

    posAttr.needsUpdate = true;
    geometry.computeVertexNormals();
    normAttr = geometry.attributes.normal;

    // Compute local mean curvature (cavity) for fine detail enhancement
    for (let i = 0; i < count; i++) {
      const nb = adj[i];
      const nLen = nb.length;
      if (nLen === 0) continue;
      let sx = 0;
      let sy = 0;
      let sz = 0;
      for (let k = 0; k < nLen; k++) {
        const j = nb[k] * 3;
        sx += posArr[j];
        sy += posArr[j + 1];
        sz += posArr[j + 2];
      }
      const inv = 1 / nLen;
      const dx = sx * inv - posArr[i * 3];
      const dy = sy * inv - posArr[i * 3 + 1];
      const dz = sz * inv - posArr[i * 3 + 2];
      const dot =
        dx * normAttr.getX(i) + dy * normAttr.getY(i) + dz * normAttr.getZ(i);
      cavity[i] = THREE.MathUtils.clamp(dot * 320, -1.0, 1.0);
    }
  }

  // --- STEP 4: Singularity-Free Continuous 3D Anatomical UV Projection ---
  const uvs = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    const x = posAttr.getX(i);
    const y = posAttr.getY(i);
    const z = posAttr.getZ(i);
    uvs[i * 2] = x * 3.6 + z * 2.4;
    uvs[i * 2 + 1] = y * 3.6 - z * 1.5;
  }
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

  // --- STEP 5: Lifelike Multi-Chromophore Human Skin & Anatomical Feature Coloring ---
  const colors = new Float32Array(count * 3);

  const cSkinBase = new THREE.Color('#eabaa3');      // Natural living warm peach-ivory complexion
  const cSkinLuminous = new THREE.Color('#f7dfd4');  // Soft upward-facing dermal highlight
  const cSkinContour = new THREE.Color('#c88e76');   // Smooth anatomical muscle/groove contour
  const cVascularRosy = new THREE.Color('#de8070');  // Capillary hemoglobin oxygenation (cheeks, palms, knees, joints)
  const cSkinCrease = new THREE.Color('#b0745f');    // Palmar creases, finger joint folds, philtrum & facial creases
  const cLipsUpper = new THREE.Color('#bd5f59');
  const cLipsLower = new THREE.Color('#d4726b');
  const cLipHighlight = new THREE.Color('#eb9b94');
  const cLipLine = new THREE.Color('#783431');
  const cBrow = new THREE.Color('#3b271e');
  const cEyelidLine = new THREE.Color('#472a20');
  const cNipple = new THREE.Color('#b8685b');
  const cAreola = new THREE.Color('#cf8476');
  const cNavel = new THREE.Color('#8f5746');
  const cNailPlate = new THREE.Color('#f4dad2');
  const cNailLunula = new THREE.Color('#fbf0ec');

  const tmp = new THREE.Color();

  // Exact fingertip & joint coordinates for all 5 fingers (symmetrical in absX)
  const fingerRays = [
    // [tipX, tipY, tipZ, pipX, pipY, mcpX, mcpY]
    [0.624, 1.090, 0.084, 0.600, 1.055, 0.576, 1.068], // Thumb
    [0.652, 1.011, 0.056, 0.618, 1.012, 0.582, 1.028], // Index
    [0.633, 0.958, 0.072, 0.604, 0.992, 0.568, 1.018], // Middle
    [0.589, 0.954, 0.055, 0.582, 0.986, 0.552, 1.014], // Ring
    [0.557, 0.965, 0.056, 0.555, 0.988, 0.536, 1.015], // Little
  ];

  for (let i = 0; i < count; i++) {
    const x = posAttr.getX(i);
    const y = posAttr.getY(i);
    const z = posAttr.getZ(i);
    const absX = Math.abs(x);

    const nx = normAttr.getX(i);
    const ny = normAttr.getY(i);
    const nz = normAttr.getZ(i);
    const cav = cavity[i];

    // 1. Living Base Complexion with smooth directional normal luminance
    tmp.copy(cSkinBase);
    const upwardFacing = THREE.MathUtils.clamp(ny * 0.55 + Math.abs(nz) * 0.25, -0.6, 0.7);
    if (upwardFacing > 0) {
      tmp.lerp(cSkinLuminous, upwardFacing * 0.27);
    } else {
      tmp.lerp(cSkinContour, -upwardFacing * 0.30);
    }

    // 2. Smooth 3D Gaussian Vascular (Hemoglobin) Zones across the body
    const cheekFlush =
      Math.exp(
        -(Math.pow((absX - 0.042) / 0.024, 2) + Math.pow((y - 1.682) / 0.024, 2))
      ) * THREE.MathUtils.clamp((z - 0.11) * 18, 0, 1);
    const noseTipFlush =
      Math.exp(
        -(Math.pow(absX / 0.018, 2) + Math.pow((y - 1.672) / 0.016, 2))
      ) * THREE.MathUtils.clamp((z - 0.15) * 25, 0, 1);
    const earFlush =
      Math.exp(-Math.pow((y - 1.702) / 0.036, 2)) *
      THREE.MathUtils.clamp((absX - 0.072) * 45, 0, 1);
    const shoulderWarmth =
      Math.exp(
        -(Math.pow((absX - 0.175) / 0.055, 2) + Math.pow((y - 1.485) / 0.048, 2))
      ) * 0.32;
    const elbowWarmth =
      Math.exp(
        -(Math.pow((absX - 0.345) / 0.038, 2) + Math.pow((y - 1.245) / 0.038, 2))
      ) * 0.26;
    const kneeWarmth =
      Math.exp(-Math.pow((y - 0.495) / 0.048, 2)) *
      THREE.MathUtils.clamp((z - 0.035) * 16, 0, 1) *
      0.42;
    const handWarmth = THREE.MathUtils.smoothstep(absX, 0.48, 0.58) * 0.48;
    const footWarmth = (1 - THREE.MathUtils.smoothstep(y, 0.015, 0.085)) * 0.42;

    const totalVascular = Math.min(
      0.60,
      cheekFlush * 0.48 +
        noseTipFlush * 0.42 +
        earFlush * 0.45 +
        shoulderWarmth +
        elbowWarmth +
        kneeWarmth +
        handWarmth +
        footWarmth
    );
    if (totalVascular > 0.005) {
      tmp.lerp(cVascularRosy, totalVascular);
    }

    // 3. Subtle Musculoskeletal Chiaroscuro (Clavicles, SCM, Linea Alba, Spinal Groove, Scapulae)
    if (z > 0.02 && y > 0.94 && y < 1.58 && absX < 0.175) {
      // Suprasternal notch shadow (CV-22)
      const dNotch = Math.hypot(x / 0.015, (y - 1.500) / 0.014);
      if (dNotch < 1.3) {
        tmp.lerp(cSkinContour, Math.exp(-dNotch * dNotch * 1.6) * 0.42);
      }
      // Clavicular highlight & supraclavicular shadow
      if (absX >= 0.016 && absX <= 0.148 && y >= 1.465 && y <= 1.530) {
        const clavT = (absX - 0.016) / 0.132;
        const clavY = 1.493 + 0.011 * Math.sin(clavT * Math.PI * 0.75);
        const dyClav = y - clavY;
        const envX = Math.sin(clavT * Math.PI);
        tmp.lerp(cSkinLuminous, Math.exp(-Math.pow(dyClav / 0.007, 2)) * envX * 0.28);
        tmp.lerp(cSkinContour, Math.exp(-Math.pow((dyClav - 0.012) / 0.008, 2)) * envX * 0.34);
      }
      // Linea alba & semilunaris subtle abdominal definition
      if (y >= 0.990 && y <= 1.290) {
        const albaEnv = Math.sin(((y - 0.990) / 0.300) * Math.PI);
        if (absX < 0.016) {
          tmp.lerp(cSkinContour, Math.exp(-Math.pow(x / 0.007, 2)) * albaEnv * 0.28);
        }
        if (absX > 0.048 && absX < 0.080) {
          tmp.lerp(cSkinContour, Math.exp(-Math.pow((absX - 0.064) / 0.009, 2)) * albaEnv * 0.22);
        }
      }
    } else if (z < -0.01 && y > 0.96 && y < 1.53 && absX < 0.175) {
      // Posterior spinal furrow & sacral dimples
      if (y >= 0.995 && y <= 1.485 && absX < 0.025) {
        const spineEnv = Math.sin(((y - 0.995) / 0.490) * Math.PI);
        tmp.lerp(cSkinContour, Math.exp(-Math.pow(x / 0.010, 2)) * spineEnv * 0.35);
      }
      const dDimple = Math.hypot((absX - 0.039) / 0.011, (y - 1.010) / 0.011);
      if (dDimple < 1.4) {
        tmp.lerp(cSkinContour, Math.exp(-dDimple * dDimple * 1.6) * 0.40);
      }
    }

    // 4. Palmar Creases, Finger Joint Folds & Realistic Fingernails (absX > 0.48)
    if (absX > 0.48) {
      // Fine mesh cavity shading on fingers/ears/toes
      if (cav > 0) {
        tmp.lerp(cSkinCrease, Math.min(0.42, cav * 0.38));
      } else if (cav < 0) {
        tmp.lerp(cSkinLuminous, Math.min(0.22, -cav * 0.20));
      }

      // Wrist flexion crease shading
      const wristLine = y - (1.1009 + 0.71 * (absX - 0.5076));
      if (absX < 0.532 && Math.abs(wristLine) < 0.0045 && nz > 0.05) {
        tmp.lerp(cSkinCrease, Math.exp(-Math.pow(wristLine / 0.0018, 2)) * 0.46);
      }

      // Palmar flexion lines (thenar, head line, heart line)
      if (absX >= 0.525 && absX <= 0.595 && y >= 1.008 && y <= 1.102 && nz > 0.15) {
        const thenarDist = Math.abs(Math.hypot(absX - 0.538, y - 1.098) - 0.036);
        const headLine = Math.abs(y - (1.062 - 0.48 * (absX - 0.542)));
        const heartLine = Math.abs(y - (1.022 + 0.42 * (absX - 0.540)));
        const palmLineStrength = Math.max(
          Math.exp(-Math.pow(thenarDist / 0.0014, 2)),
          absX >= 0.538 ? Math.exp(-Math.pow(headLine / 0.0014, 2)) : 0,
          absX >= 0.536 ? Math.exp(-Math.pow(heartLine / 0.0014, 2)) : 0
        );
        if (palmLineStrength > 0.05) {
          tmp.lerp(cSkinCrease, palmLineStrength * 0.52);
        }
      }

      // Finger PIP/MCP joint creases & Fingernail plates with pale lunula
      for (let f = 0; f < fingerRays.length; f++) {
        const [tipX, tipY, tipZ, pipX, pipY, mcpX, mcpY] = fingerRays[f];
        const dTip = Math.hypot(absX - tipX, y - tipY, z - tipZ);
        // Dorsal fingernail plate near fingertip
        if (dTip < 0.0095 && (nz < 0.15 || ny > 0.15)) {
          const nailT = THREE.MathUtils.smoothstep(0.0095 - dTip, 0, 0.003);
          tmp.lerp(cNailPlate, nailT * 0.72);
          // Pale half-moon lunula at proximal base of nail (dTip in 0.0065..0.0088)
          if (dTip > 0.0062 && dTip < 0.0088) {
            tmp.lerp(cNailLunula, 0.45);
          }
        }
        // PIP & MCP joint flexion/knuckle creases
        const dPip = Math.hypot(absX - pipX, y - pipY);
        const dMcp = Math.hypot(absX - mcpX, y - mcpY);
        if (dPip < 0.0065) {
          tmp.lerp(cSkinCrease, Math.exp(-Math.pow(dPip / 0.0035, 2)) * 0.34);
        }
        if (dMcp < 0.0075) {
          tmp.lerp(cSkinCrease, Math.exp(-Math.pow(dMcp / 0.0040, 2)) * 0.28);
        }
      }
    }

    // Toenail beds on distal dorsal toe tips
    if (y < 0.028 && z > 0.162 && ny > 0.22) {
      tmp.lerp(cNailPlate, 0.62);
    }

    // 5. Realistic Nipple & Areola (ST-17 landmark: [±0.0905, 1.3252, 0.1764])
    const distNipple = Math.hypot(absX - 0.0905, y - 1.3252);
    if (z > 0.14 && distNipple < 0.0165) {
      const areolaT = THREE.MathUtils.smoothstep(0.0165 - distNipple, 0, 0.008);
      tmp.lerp(cAreola, areolaT * 0.58);
      if (distNipple < 0.0065) {
        const papillaT = 1 - distNipple / 0.0065;
        tmp.lerp(cNipple, papillaT * 0.82);
      }
    }

    // 6. Umbilical Navel (CV-8 landmark: [0, 1.1114, 0.1542])
    const distNavel = Math.hypot(x, y - 1.1114);
    if (z > 0.12 && distNavel < 0.0115) {
      const t = Math.pow(1 - distNavel / 0.0115, 1.45);
      tmp.lerp(cNavel, t * 0.76);
    }

    // 7. Detailed Facial Features (Nostrils, Philtrum, Vermilion Lips, Ciliary Eyelashes, Hair-Stroke Eyebrows)
    if (y > 1.585 && z > 0.08) {
      if (cav > 0) {
        tmp.lerp(cSkinCrease, Math.min(0.36, cav * 0.32));
      } else if (cav < 0) {
        tmp.lerp(cSkinLuminous, Math.min(0.20, -cav * 0.18));
      }

      // Nostrils cavity under nose tip
      const distNostril = Math.hypot(absX - 0.011, y - 1.663);
      if (z > 0.162 && ny < -0.15 && distNostril < 0.008) {
        tmp.lerp(cLipLine, 0.78);
      }

      // Philtrum groove (Nhân Trung GV-26 between nose base y=1.659 and Cupid's bow y=1.648)
      if (y >= 1.6475 && y <= 1.660 && absX < 0.0075 && z > 0.168) {
        const philEnv = Math.sin(((y - 1.6475) / 0.0125) * Math.PI);
        if (absX < 0.0032) {
          tmp.lerp(cSkinContour, (1 - absX / 0.0032) * philEnv * 0.32);
        } else {
          // Philtrum ridges
          tmp.lerp(cSkinLuminous, Math.exp(-Math.pow((absX - 0.0045) / 0.0018, 2)) * philEnv * 0.25);
        }
      }

      // Multi-tone Vermilion Lips with Cupid's bow, vertical tubercular micro-striations & glossy lower cushion
      const lipPartY = 1.6409 + Math.pow(absX / 0.023, 2) * 0.0005;
      const cupidBowY =
        1.6485 -
        0.0016 * Math.exp(-Math.pow(absX / 0.0035, 2)) +
        0.0012 * Math.exp(-Math.pow((absX - 0.0065) / 0.0045, 2)) -
        0.0065 * Math.pow(absX / 0.0245, 2.1);
      const lowerBorderY = 1.6318 + 0.0088 * Math.pow(absX / 0.0245, 2.0);

      if (z > 0.152 && absX < 0.0248 && y >= lowerBorderY - 0.001 && y <= cupidBowY + 0.001) {
        const distParting = Math.abs(y - lipPartY);
        const xFade = THREE.MathUtils.smoothstep(0.0248 - absX, 0, 0.004);
        // Subtle vertical vermilion lip striation
        const lipStria = 1 + 0.04 * Math.sin(absX * 1450);

        if (distParting < 0.00095 && absX < 0.0225) {
          tmp.lerp(cLipLine, 0.72 * (1 - distParting / 0.00095) * xFade);
        } else if (y >= lipPartY) {
          const upperT = THREE.MathUtils.clamp((cupidBowY - y) / Math.max(0.001, cupidBowY - lipPartY), 0, 1);
          const rimFactor = THREE.MathUtils.smoothstep(upperT, 0, 0.25) * xFade;
          tmp.lerp(cLipsUpper, rimFactor * 0.88 * lipStria);
          // White roll highlight along Cupid's bow border
          if (upperT < 0.18) {
            tmp.lerp(cSkinLuminous, (1 - upperT / 0.18) * xFade * 0.24);
          }
        } else {
          const lowerT = THREE.MathUtils.clamp((y - lowerBorderY) / Math.max(0.001, lipPartY - lowerBorderY), 0, 1);
          const rimFactor = THREE.MathUtils.smoothstep(lowerT, 0, 0.25) * xFade;
          tmp.lerp(cLipsLower, rimFactor * 0.90 * lipStria);
          // Natural lower-lip cushion highlight
          const cushion =
            Math.exp(-Math.pow((y - 1.6358) / 0.0026, 2)) *
            Math.exp(-Math.pow(absX / 0.014, 2));
          tmp.lerp(cLipHighlight, cushion * 0.44);
        }
      }

      // Eyelid ciliary lash rim & crisp upper palpebral fold (supratarsal crease)
      const dxEye = absX - 0.0345;
      const dyEye = y - 1.7158;
      const eyeEllipse =
        Math.pow(dxEye / 0.0136, 2) + Math.pow(dyEye / 0.0055, 2);
      if (z > 0.146 && eyeEllipse >= 0.68 && eyeEllipse <= 1.24) {
        // Fine eyelash fringe modulation along upper and lower lid margins
        const lashAngle = Math.atan2(dyEye, dxEye);
        const lashFringe = 0.78 + 0.22 * Math.sin(lashAngle * 48);
        tmp.lerp(cEyelidLine, (dyEye > 0 ? 0.84 : 0.48) * lashFringe);
      } else if (
        z > 0.144 &&
        dyEye > 0.0062 &&
        dyEye < 0.0098 &&
        Math.abs(dxEye) < 0.0145
      ) {
        // Supratarsal double-eyelid crease
        const foldArch = 0.0078 - Math.pow(dxEye / 0.014, 2) * 0.0016;
        const dFold = Math.abs(dyEye - foldArch);
        if (dFold < 0.0014) {
          tmp.lerp(cSkinCrease, (1 - dFold / 0.0014) * 0.42);
        }
      }

      // Realistic Hair-Stroke Tapered Eyebrows
      const browArchX = (absX - 0.013) / 0.043; // 0 at medial head -> 1 at lateral tail
      if (z > 0.140 && browArchX >= 0 && browArchX <= 1.0) {
        const browCenterY =
          1.7345 +
          0.0028 * Math.sin(browArchX * Math.PI * 0.82) -
          0.0032 * Math.pow(Math.max(0, browArchX - 0.55) / 0.45, 1.8);
        const browHalfThick =
          0.0040 * (1 - 0.55 * Math.pow(browArchX, 1.6)) * Math.sin(Math.pow(browArchX, 0.45) * Math.PI);
        const dBrowY = Math.abs(y - browCenterY);
        if (dBrowY < browHalfThick && browHalfThick > 0.0004) {
          const yProfile = Math.cos((dBrowY / browHalfThick) * Math.PI * 0.5);
          // Oblique hair-follicle stroke pattern
          const hairStroke =
            0.72 +
            0.28 *
              Math.sin((absX * 1650 - (y - browCenterY) * 950) + Math.cos(y * 1200));
          tmp.lerp(cBrow, 0.82 * yProfile * hairStroke);
        }
      }
    }

    // Subtle lateral silhouette contour richness
    if (Math.abs(nx) > 0.75 && y > 0.85 && y < 1.55) {
      tmp.lerp(cSkinContour, (Math.abs(nx) - 0.75) * 0.25);
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
    // Legs & feet (angled A-stance axis from hip absX=0.11 down to ankle absX=0.25)
    const legCenterX = signX * (0.264 - THREE.MathUtils.clamp(y, 0.05, 0.82) * 0.185);
    const legCenterZ = y < 0.10 ? 0.045 : y > 0.50 ? 0.032 : 0.008;
    nx = x - legCenterX;
    ny = y < 0.08 ? 0.25 : 0;
    nz = z - legCenterZ;
  } else {
    // Arms, forearms & hands
    const t = THREE.MathUtils.clamp((absX - 0.165) / 0.415, 0, 1);
    const armCenterX = signX * (0.165 + t * 0.415);
    const armCenterY = 1.44 - t * 0.42;
    const armCenterZ = 0.01 + t * 0.045;
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

// Shared sphere & flow geometries to avoid repeated GPU allocations
const SHARED_PIN_GEO_NORMAL = new THREE.SphereGeometry(0.0035, 10, 10);
const SHARED_PIN_GEO_SPECIAL = new THREE.SphereGeometry(0.0044, 12, 12);
const SHARED_PIN_GEO_SELECTED = new THREE.SphereGeometry(0.0064, 14, 14);
const SHARED_FLOW_ARROW_GEO = new THREE.ConeGeometry(0.0031, 0.0092, 10);
const SHARED_QI_BEAD_GEO = new THREE.SphereGeometry(0.0038, 10, 10);

export const Human3DMeridianViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  // Active meridians: Default to empty array [] so the 3D body opens cleanly without all 14 meridians cluttered;
  // meridians only appear when the user selects them!
  const [activeMeridianIds, setActiveMeridianIds] = useState<string[]>([]);
  const [multiSelectMode, setMultiSelectMode] = useState<boolean>(false);
  const [selectedPoint, setSelectedPoint] = useState<Acupoint3D | null>(null);
  const [selectedOrgan, setSelectedOrgan] = useState<ZangFuOrganInfo | null>(null);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [showFlowArrows, setShowFlowArrows] = useState<boolean>(true);
  const [qiFlowSpeed, setQiFlowSpeed] = useState<number>(1.0); // 0 = paused, 0.6 = slow, 1.0 = normal, 1.8 = fast
  const [showOrgans, setShowOrgans] = useState<boolean>(false);
  const [showNeedle, setShowNeedle] = useState<boolean>(true);
  const [showCunGuides, setShowCunGuides] = useState<boolean>(false);
  const [pointFilterMode, setPointFilterMode] = useState<'all' | 'special'>('all');
  const [vesselCategoryTab, setVesselCategoryTab] = useState<
    'all' | 'main' | 'extra_vessel' | 'special'
  >('all');
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
  const [humanMeshBuffers, setHumanMeshBuffers] = useState<{
    positions: Float32Array;
    normals: Float32Array;
  } | null>(null);

  // Three.js references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const skinMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const eyeballMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const skinDepthMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const bodyGroupRef = useRef<THREE.Group | null>(null);
  const skeletonGroupRef = useRef<THREE.Group | null>(null);
  const organsRigRef = useRef<ZangFuOrgansRig | null>(null);
  const cunGuidesRigRef = useRef<CunGuidesRig | null>(null);
  const needleRigRef = useRef<AcupunctureNeedleRig | null>(null);
  const meridiansGroupRef = useRef<THREE.Group | null>(null);
  const flowArrowsGroupRef = useRef<THREE.Group | null>(null);
  const qiBeadsMeshRef = useRef<THREE.InstancedMesh | null>(null);
  const qiTracksRef = useRef<QiBeadTrack[]>([]);
  const qiFlowSpeedRef = useRef<number>(1.0);
  const showFlowArrowsRef = useRef<boolean>(true);
  const showOrgansRef = useRef<boolean>(false);
  const pointsGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number>(0);
  const isTranslucentSkinRef = useRef<boolean>(false);
  const occlusionDirtyRef = useRef<boolean>(true);
  const tubeScaleUniformRef = useRef<{ value: number }>({ value: 1.0 });
  const camFlightRef = useRef<{
    active: boolean;
    camPos: THREE.Vector3;
    target: THREE.Vector3;
  }>({
    active: false,
    camPos: new THREE.Vector3(0, 1.02, 2.28),
    target: new THREE.Vector3(0, 0.96, 0),
  });

  useEffect(() => {
    qiFlowSpeedRef.current = qiFlowSpeed;
  }, [qiFlowSpeed]);

  useEffect(() => {
    showFlowArrowsRef.current = showFlowArrows;
    if (flowArrowsGroupRef.current) {
      flowArrowsGroupRef.current.visible = showFlowArrows;
    }
  }, [showFlowArrows]);

  useEffect(() => {
    showOrgansRef.current = showOrgans;
  }, [showOrgans]);

  // Build complete 3D acupoint catalog:
  // 362 classical (including GV29 Ấn Đường) + 58 WHO Extra + 6 Kỳ Kinh Bát Mạch member sets + 40 Đổng Thị Kỳ Huyệt 3D
  const allPlottedPoints = useMemo(() => {
    if (!surfaceData) return [];
    const list: PlottedPoint3D[] = [];
    const basePointByCode = new Map<string, PlottedPoint3D>();

    // Helper to resolve surface position cleanly (including GV29 -> GV24+ fallback)
    const resolveSurfacePos = (code: string): [number, number, number] | undefined =>
      surfaceData.points[code] ||
      (code === 'GV29' ? surfaceData.points['GV24+'] : undefined);

    // 1. First build the 14 classic meridians (LU..CV) + 58 WHO Extra Points (EX)
    ACU_ATLAS_BAR_ITEMS.forEach((barItem) => {
      if (barItem.id === 'EX') {
        Object.entries(EXTRA_POINT_VIETNAMESE_NAMES).forEach(([exCode, exViName]) => {
          const pos = resolveSurfacePos(exCode);
          if (!pos) return;
          const isMidline = Math.abs(pos[0]) < 0.004;
          const clinical = COMPLETE_ACUPOINT_CLINICAL_DB[exCode];
          const specialRole =
            clinical?.specialRole || `Kinh Ngoại Kỳ Huyệt (${exViName})`;
          const detail: Acupoint3D = {
            id: exCode,
            code: exCode,
            name: exViName,
            vietnameseName: `${exViName} (Kinh Ngoại Kỳ Huyệt)`,
            chineseName: clinical?.chineseName || exCode,
            meridianId: 'EX',
            meridianName: 'Kinh Ngoại Kỳ Huyệt (58 Kỳ Huyệt Đặc Hiệu)',
            position: pos,
            isBilateral: !isMidline,
            location:
              clinical?.location ||
              `Kinh ngoại kỳ huyệt ${exViName} (${exCode}) định vị chuẩn giải phẫu trên cơ thể 3D.`,
            depth:
              clinical?.depth ||
              'Châm thẳng hoặc xiên 0.3 - 1.0 thốn tùy vị trí giải phẫu.',
            anatomy:
              clinical?.anatomy ||
              'Vùng giải phẫu đặc hiệu của Kinh Ngoại Kỳ Huyệt.',
            actions:
              clinical?.actions ||
              `Đặc trị vùng bệnh tại chỗ và toàn thân theo công năng của huyệt ${exViName}.`,
            indications: clinical?.indications || [
              `Chủ trị chuyên biệt tại vùng huyệt ${exViName}`,
              'Điều hòa khí huyết và giảm đau đặc hiệu',
            ],
            specialRole,
          };
          const item: PlottedPoint3D = {
            code: exCode,
            displayCode: exCode,
            meridianId: 'EX',
            position: pos,
            isSpecial: true,
            detail,
          };
          list.push(item);
          basePointByCode.set(exCode, item);
        });
        return;
      }

      if (barItem.category !== 'main') return;

      const mData = MERIDIANS_3D_DATA.find((m) => m.id === barItem.id);
      if (!mData) return;
      const viNames = VIETNAMESE_POINT_NAMES[barItem.id] || [];

      for (let idx = 1; idx <= barItem.maxIndex; idx++) {
        const code = `${barItem.id}${idx}`;
        const displayCode = `${barItem.pointPrefix}-${idx}`;
        const pos = resolveSurfacePos(code);
        if (!pos) continue;

        const existingDetail = mData.points.find(
          (p) => p.code.toUpperCase() === code.toUpperCase()
        );
        const clinical = COMPLETE_ACUPOINT_CLINICAL_DB[code];
        const pointViName = viNames[idx - 1] || existingDetail?.name || displayCode;
        const specialRole =
          clinical?.specialRole ||
          existingDetail?.specialRole ||
          `Huyệt ${pointViName} thuộc ${mData.vietnameseName}`;

        const detail: Acupoint3D = {
          id: code,
          code: displayCode,
          name: pointViName,
          vietnameseName: `${pointViName} (${mData.vietnameseName})`,
          chineseName: clinical?.chineseName || existingDetail?.chineseName || code,
          meridianId: mData.id,
          meridianName: mData.name,
          position: pos,
          isBilateral: mData.isBilateral,
          location:
            clinical?.location ||
            existingDetail?.location ||
            `Huyệt ${pointViName} (huyệt thứ ${idx} trên ${mData.vietnameseName}).`,
          depth:
            clinical?.depth ||
            existingDetail?.depth ||
            'Châm thẳng hoặc xiên 0.3 - 1.2 thốn tùy độ dày cơ giải phẫu tại vùng huyệt.',
          anatomy:
            clinical?.anatomy ||
            existingDetail?.anatomy ||
            `Nằm trên lộ trình giải phẫu của ${mData.vietnameseName}.`,
          actions:
            clinical?.actions ||
            existingDetail?.actions ||
            `Thông kinh hoạt lạc ${mData.vietnameseName}, điều hòa khí huyết tạng phủ.`,
          indications:
            clinical?.indications ||
            existingDetail?.indications || [
              `Đau nhức hoặc rối loạn cảm giác dọc lộ trình ${mData.vietnameseName}`,
              mData.description,
            ],
          specialRole,
        };

        const item: PlottedPoint3D = {
          code: code === 'GV29' && !surfaceData.points['GV29'] ? 'GV24+' : code,
          displayCode,
          meridianId: barItem.id,
          position: pos,
          isSpecial: isSpecialAcupoint(specialRole),
          detail,
        };
        list.push(item);
        basePointByCode.set(code, item);
      }
    });

    // 2. Plot member + opening points for the 6 Extraordinary Vessels (Kỳ Kinh Bát Mạch)
    EXTRAORDINARY_VESSELS_META.forEach((vessel) => {
      const flowMeta = MERIDIAN_FLOW_META[vessel.id];
      const memberCodes = flowMeta?.memberPointCodes || [];
      memberCodes.forEach((memberCode) => {
        const base = basePointByCode.get(memberCode);
        if (!base) return;
        const isOpening = flowMeta?.openingPointCode === memberCode;
        const detail: Acupoint3D = {
          ...base.detail,
          id: `${vessel.id}_${memberCode}`,
          meridianId: vessel.id,
          meridianName: `${vessel.name} (${flowMeta?.openingPointName || ''})`,
          specialRole: isOpening
            ? `Huyệt Khai ${vessel.name} (${flowMeta?.openingPointName})`
            : `Huyệt giao hội thuộc ${vessel.name}`,
        };
        list.push({
          code: base.code,
          displayCode: base.displayCode,
          meridianId: vessel.id,
          position: base.position,
          isSpecial: true,
          detail,
        });
      });
    });

    // 3. Plot 40 Đổng Thị Kỳ Huyệt 3D snapped directly onto MakeHuman skin vertices
    TUNG_3D_ANCHOR_SPECS.forEach((spec) => {
      const tungData = TUNG_POINTS.find((tp) => tp.code === spec.code);
      if (!tungData) return;
      const snapped = snapAnchorToHumanMesh(
        spec.anchor,
        humanMeshBuffers?.positions || null,
        humanMeshBuffers?.normals || null
      );
      const detail: Acupoint3D = {
        id: `DT_${tungData.code}`,
        code: `ĐT ${tungData.code}`,
        name: tungData.name,
        vietnameseName: `${tungData.vietnameseName} (Đổng Thị Kỳ Huyệt)`,
        chineseName: tungData.chineseName,
        meridianId: 'DT',
        meridianName: `Đổng Thị Kỳ Huyệt — ${tungData.zone}`,
        position: snapped.pos,
        isBilateral: spec.isBilateral,
        location: tungData.location,
        depth: tungData.needlingMethod,
        anatomy: tungData.anatomy,
        actions: tungData.dongQiInstruction || tungData.westernMechanism,
        indications: tungData.indications,
        specialRole: `Đổng Thị Kỳ Huyệt (${tungData.zone})`,
      };
      list.push({
        code: `DT_${tungData.code}`,
        displayCode: `ĐT ${tungData.code}`,
        meridianId: 'DT',
        position: snapped.pos,
        snappedNormal: snapped.normal,
        isSpecial: true,
        detail,
      });
    });

    return list;
  }, [surfaceData, humanMeshBuffers]);

  // Search filter across all classic, extraordinary, WHO extra & Master Tung points
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return allPlottedPoints.slice(0, 32);
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

  // Smooth damped camera presets calibrated to the 0..1.85m MakeHuman 3D body mesh
  const setCameraView = useCallback(
    (preset: 'front' | 'leftArm' | 'rightArm' | 'sideProfile' | 'back' | 'head' | 'legs') => {
      if (!cameraRef.current || !controlsRef.current) return;
      const flight = camFlightRef.current;

      switch (preset) {
        case 'front':
          flight.camPos.set(0, 1.02, 2.28);
          flight.target.set(0, 0.96, 0);
          setActivePresetLabel('Chính diện');
          break;
        case 'leftArm':
          flight.camPos.set(0.18, 1.12, 1.78);
          flight.target.set(0.18, 1.06, 0.02);
          setActivePresetLabel('Tay Trái');
          break;
        case 'rightArm':
          flight.camPos.set(-0.18, 1.12, 1.78);
          flight.target.set(-0.18, 1.06, 0.02);
          setActivePresetLabel('Tay Phải');
          break;
        case 'sideProfile':
          flight.camPos.set(2.08, 1.06, 0.48);
          flight.target.set(0.04, 1.02, 0.02);
          setActivePresetLabel('Nghiêng');
          break;
        case 'back':
          flight.camPos.set(0, 1.02, -2.28);
          flight.target.set(0, 0.96, 0);
          setActivePresetLabel('Sau Lưng');
          break;
        case 'head':
          flight.camPos.set(0, 1.66, 0.68);
          flight.target.set(0, 1.65, 0.06);
          setActivePresetLabel('Đầu Mặt');
          break;
        case 'legs':
          flight.camPos.set(0, 0.48, 1.58);
          flight.target.set(0, 0.46, 0);
          setActivePresetLabel('Hai Chân');
          break;
      }
      flight.active = true;
      occlusionDirtyRef.current = true;
    },
    []
  );

  // Smoothly fly camera to a specific acupoint on the 3D MakeHuman skin
  const focusOnPoint = useCallback((pt: Acupoint3D) => {
    setSelectedPoint(pt);
    setSelectedOrgan(null);
    if (!cameraRef.current || !controlsRef.current) return;
    const [x, y, z] = pt.position;
    const zDir = z >= -0.01 ? 1 : -1;
    camFlightRef.current.camPos.set(x * 1.15, y + 0.03, z + zDir * 0.68);
    camFlightRef.current.target.set(x * 0.6, y, z * 0.6);
    camFlightRef.current.active = true;
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

    // 5. Responsive OrbitControls (restricted to interactions ON the 3D human body so outside touches scroll the page!)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.16;
    controls.rotateSpeed = 0.95;
    controls.zoomSpeed = 1.1;
    controls.minDistance = 0.32;
    controls.maxDistance = 4.2;
    controls.target.set(0, 0.96, 0);
    // Cancel camera flight immediately if user drags/rotates manually
    const onControlsStart = () => {
      camFlightRef.current.active = false;
    };
    controls.addEventListener('start', onControlsStart);
    // Allow vertical page scrolling by default when touching outside the 3D human figure
    renderer.domElement.style.touchAction = 'pan-y';
    controlsRef.current = controls;

    // 6. Groups (Complete 242-Bone 3D Skeleton + Zang-Fu Organs + Cun Guides + Skin + Meridians + Flow Arrows + Needles + Acupoints)
    const skeletonGroup = buildCompleteAnatomicalSkeleton3D();
    skeletonGroupRef.current = skeletonGroup;
    scene.add(skeletonGroup);

    const organsRig = buildZangFuOrgans3D();
    organsRigRef.current = organsRig;
    scene.add(organsRig.group);

    const cunGuidesRig = buildCunGuides3D();
    cunGuidesRigRef.current = cunGuidesRig;
    scene.add(cunGuidesRig.group);

    const bodyGroup = new THREE.Group();
    bodyGroupRef.current = bodyGroup;
    scene.add(bodyGroup);

    const meridiansGroup = new THREE.Group();
    meridiansGroupRef.current = meridiansGroup;
    scene.add(meridiansGroup);

    const flowArrowsGroup = new THREE.Group();
    flowArrowsGroupRef.current = flowArrowsGroup;
    flowArrowsGroup.visible = showFlowArrowsRef.current;
    scene.add(flowArrowsGroup);

    const pointsGroup = new THREE.Group();
    pointsGroupRef.current = pointsGroup;
    scene.add(pointsGroup);

    const needleRig = buildAcupunctureNeedle3D();
    needleRigRef.current = needleRig;
    scene.add(needleRig.group);

    // 7. Load Real MakeHuman GLB Mesh (`/models/human-learning.glb`) with Depth Pre-pass + PBR Skin Material
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

    const skinMat = new THREE.MeshPhysicalMaterial({
      vertexColors: true,
      bumpMap: bumpTex,
      bumpScale: 0.00058,
      roughnessMap: bumpTex,
      roughness: 0.46,
      metalness: 0.0,
      clearcoat: 0.09,
      clearcoatRoughness: 0.46,
      reflectivity: 0.52,
      sheen: 0.36,
      sheenRoughness: 0.45,
      sheenColor: new THREE.Color('#ffe6d9'),
      transparent: true,
      opacity: 0.52,
      depthWrite: false,
      depthTest: true,
      depthFunc: THREE.LessEqualDepth,
      side: THREE.FrontSide,
      polygonOffset: true,
      polygonOffsetFactor: 1.2,
      polygonOffsetUnits: 1.2,
    });
    // Real-time Dual-Lobe Dermal Subsurface Scattering (SSS) + Fresnel Rim Presence
    skinMat.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <lights_fragment_end>',
          `#include <lights_fragment_end>
          vec3 sssViewDir = normalize(vViewPosition);
          float sssNoV = clamp(dot(geometryNormal, sssViewDir), 0.0, 1.0);
          float sssLum = dot(reflectedLight.directDiffuse, vec3(0.333));
          float terminatorBand = smoothstep(0.01, 0.38, sssLum) * (1.0 - smoothstep(0.38, 0.88, sssLum));
          vec3 dermalScatter = vec3(0.98, 0.35, 0.22) * diffuseColor.rgb * (terminatorBand * 0.32 + 0.05);
          float grazingSheen = pow(1.0 - sssNoV, 2.6) * 0.14;
          reflectedLight.directDiffuse += dermalScatter;
          reflectedLight.indirectDiffuse += diffuseColor.rgb * vec3(1.06, 0.94, 0.88) * grazingSheen;
          `
        )
        .replace(
          '#include <opaque_fragment>',
          `if (diffuseColor.a < 0.99) {
            float rimPresence = pow(1.0 - clamp(dot(geometryNormal, normalize(vViewPosition)), 0.0, 1.0), 1.55);
            diffuseColor.a = clamp(diffuseColor.a * 0.72 + rimPresence * 0.44, 0.24, 0.86);
          }
          #include <opaque_fragment>`
        );
    };
    skinMat.customProgramCacheKey = () => 'lifelike_dermal_sss_physical_v4';
    skinMaterialRef.current = skinMat;

    // Dedicated glossy corneal tear-film material for the 3D Eyeballs with 512x512 photorealistic iris texture
    const eyeTex = createPhotorealisticEyeTexture();
    const eyeballMat = new THREE.MeshPhysicalMaterial({
      map: eyeTex,
      vertexColors: true,
      roughness: 0.06,
      metalness: 0.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      reflectivity: 0.9,
      transparent: true,
      opacity: 0.88,
      depthWrite: false,
      depthTest: true,
      depthFunc: THREE.LessEqualDepth,
      side: THREE.FrontSide,
    });
    eyeballMaterialRef.current = eyeballMat;

    // Keep reference to the 3D human body meshes so hit-testing works in all anatomical modes (including skeleton_only)
    const skinHitMeshes: THREE.Object3D[] = [];

    const loader = new GLTFLoader();
    loader.load(
      '/models/human-learning.glb',
      (gltf) => {
        if (disposed) return;
        const depthClones: THREE.Mesh[] = [];
        let capturedPos: Float32Array | null = null;
        let capturedNorm: Float32Array | null = null;
        gltf.scene.traverse((obj) => {
          if (obj instanceof THREE.Mesh && obj.geometry) {
            enhanceAndColorHumanGeometry(obj.geometry);
            if (!capturedPos && obj.geometry.attributes.position && obj.geometry.attributes.normal) {
              capturedPos = new Float32Array(
                obj.geometry.attributes.position.array as Float32Array
              );
              capturedNorm = new Float32Array(
                obj.geometry.attributes.normal.array as Float32Array
              );
            }
            obj.material = skinMat;
            obj.renderOrder = 3;
            skinHitMeshes.push(obj);

            const depthMesh = new THREE.Mesh(obj.geometry, skinDepthMat);
            depthMesh.position.copy(obj.position);
            depthMesh.rotation.copy(obj.rotation);
            depthMesh.scale.copy(obj.scale);
            depthMesh.renderOrder = 2;
            depthClones.push(depthMesh);
          }
        });

        // Add high-definition 3D Eyeball pair inside the open eyelid sockets
        const eyeballGeo = createRealistic3DEyeballGeometry();
        const eyeballDepthMesh = new THREE.Mesh(eyeballGeo, skinDepthMat);
        eyeballDepthMesh.renderOrder = 2;
        const eyeballColorMesh = new THREE.Mesh(eyeballGeo, eyeballMat);
        eyeballColorMesh.renderOrder = 3;
        depthClones.push(eyeballDepthMesh);
        bodyGroup.add(eyeballColorMesh);
        skinHitMeshes.push(eyeballColorMesh);

        depthClones.forEach((dm) => bodyGroup.add(dm));
        bodyGroup.add(gltf.scene);
        if (capturedPos && capturedNorm) {
          setHumanMeshBuffers({ positions: capturedPos, normals: capturedNorm });
        }
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

    // 8. Body-Only Touch/Mouse Interaction & Acupoint Click Raycasting
    // Touching/dragging ON the 3D human body rotates/flips/zooms; touching OUTSIDE scrolls the page!
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const samplePt = new THREE.Vector2();
    let downPos = { x: 0, y: 0 };
    let isInteractingWithBody = false;

    const hitTestHumanBody = (clientX: number, clientY: number): boolean => {
      if (!mountRef.current) return false;
      const rect = mountRef.current.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return false;
      const baseX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const baseY = -((clientY - rect.top) / rect.height) * 2 + 1;

      // Check center point plus a small ~7px cross neighborhood so fingers/edges/acupoints are easy to grab
      const offsets: [number, number][] = [
        [0, 0],
        [0.024, 0],
        [-0.024, 0],
        [0, 0.024],
        [0, -0.024],
      ];

      for (let i = 0; i < offsets.length; i++) {
        samplePt.set(baseX + offsets[i][0], baseY + offsets[i][1]);
        raycaster.setFromCamera(samplePt, camera);

        if (skinHitMeshes.length > 0) {
          const hits = raycaster.intersectObjects(skinHitMeshes, false);
          if (hits.length > 0) return true;
        } else if (skeletonGroupRef.current) {
          const skelHits = raycaster.intersectObjects(
            skeletonGroupRef.current.children,
            true
          );
          if (skelHits.length > 0) return true;
        }

        if (pointsGroupRef.current && pointsGroupRef.current.children.length > 0) {
          const ptHits = raycaster
            .intersectObjects(pointsGroupRef.current.children, false)
            .filter((h) => h.object.visible);
          if (ptHits.length > 0) return true;
        }

        if (showOrgansRef.current && organsRigRef.current) {
          const organHits = raycaster.intersectObjects(
            organsRigRef.current.organMeshes,
            false
          );
          if (organHits.length > 0) return true;
        }
      }
      return false;
    };

    const onTouchStartCapture = (e: TouchEvent) => {
      let hitBody = false;
      for (let i = 0; i < e.touches.length; i++) {
        if (hitTestHumanBody(e.touches[i].clientX, e.touches[i].clientY)) {
          hitBody = true;
          break;
        }
      }
      isInteractingWithBody = hitBody;
      if (hitBody) {
        controls.enabled = true;
        renderer.domElement.style.touchAction = 'none';
        if (e.cancelable) e.preventDefault();
      } else {
        controls.enabled = false;
        renderer.domElement.style.touchAction = 'pan-y';
        e.stopImmediatePropagation();
      }
    };

    const onTouchMoveCapture = (e: TouchEvent) => {
      if (isInteractingWithBody) {
        if (e.cancelable) e.preventDefault();
      } else {
        e.stopImmediatePropagation();
      }
    };

    const onTouchEndCapture = () => {
      isInteractingWithBody = false;
      renderer.domElement.style.touchAction = 'pan-y';
    };

    const onPointerDownCapture = (e: PointerEvent) => {
      downPos = { x: e.clientX, y: e.clientY };
      const hitBody =
        e.pointerType === 'touch'
          ? isInteractingWithBody || hitTestHumanBody(e.clientX, e.clientY)
          : hitTestHumanBody(e.clientX, e.clientY);
      isInteractingWithBody = hitBody;

      if (hitBody) {
        controls.enabled = true;
        renderer.domElement.style.touchAction = 'none';
      } else {
        controls.enabled = false;
        renderer.domElement.style.touchAction = 'pan-y';
        e.stopImmediatePropagation();
      }
    };

    const onWheelCapture = (e: WheelEvent) => {
      const hitBody = hitTestHumanBody(e.clientX, e.clientY);
      if (hitBody) {
        controls.enabled = true;
      } else {
        controls.enabled = false;
        // Stop OrbitControls from zooming so the browser scrolls the webpage vertically!
        e.stopImmediatePropagation();
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      renderer.domElement.style.touchAction = 'pan-y';
      if (Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y) > 6 || !mountRef.current) {
        return;
      }
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      let handledHit = false;
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
            setSelectedOrgan(null);
            handledHit = true;
          }
        }
      }

      if (!handledHit && showOrgansRef.current && organsRigRef.current) {
        const organHits = raycaster.intersectObjects(
          organsRigRef.current.organMeshes,
          false
        );
        if (organHits.length > 0) {
          const info = organHits[0].object.userData?.organInfo as
            | ZangFuOrganInfo
            | undefined;
          if (info) {
            setSelectedOrgan(info);
            setSelectedPoint(null);
          }
        }
      }
    };

    renderer.domElement.addEventListener('touchstart', onTouchStartCapture, {
      capture: true,
      passive: false,
    });
    renderer.domElement.addEventListener('touchmove', onTouchMoveCapture, {
      capture: true,
      passive: false,
    });
    renderer.domElement.addEventListener('touchend', onTouchEndCapture, {
      capture: true,
    });
    renderer.domElement.addEventListener('pointerdown', onPointerDownCapture, {
      capture: true,
    });
    renderer.domElement.addEventListener('wheel', onWheelCapture, {
      capture: true,
      passive: false,
    });
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

    // Pre-allocated scratch math for zero-allocation Qi bead streaming in animate()
    const _beadPos = new THREE.Vector3();
    const _beadQuat = new THREE.Quaternion();
    const _beadScale = new THREE.Vector3();
    const _beadMat = new THREE.Matrix4();
    let lastFrameTime = performance.now();
    let qiPhase = 0;

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
      const now = performance.now();
      const dt = Math.min(0.05, Math.max(0.001, (now - lastFrameTime) * 0.001));
      lastFrameTime = now;

      // Smooth damped camera flight transitions when clicking presets or acupoints
      const flight = camFlightRef.current;
      if (flight.active) {
        const lerpAlpha = 1 - Math.exp(-9.5 * dt);
        camera.position.lerp(flight.camPos, lerpAlpha);
        controls.target.lerp(flight.target, lerpAlpha);
        if (
          camera.position.distanceToSquared(flight.camPos) < 0.00008 &&
          controls.target.distanceToSquared(flight.target) < 0.00008
        ) {
          camera.position.copy(flight.camPos);
          controls.target.copy(flight.target);
          flight.active = false;
        }
      }

      controls.update();

      // Update flowing Qi pulses strictly in physiological direction (origin -> terminal)
      const qiMesh = qiBeadsMeshRef.current;
      const tracks = qiTracksRef.current;
      const flowSpeed = qiFlowSpeedRef.current;
      if (qiMesh && tracks.length > 0) {
        if (!showFlowArrowsRef.current || flowSpeed <= 0) {
          qiMesh.visible = false;
        } else {
          qiMesh.visible = true;
          qiPhase = (qiPhase + dt * 0.24 * flowSpeed) % 1000;
          const beadZoomScale = Math.pow(
            THREE.MathUtils.clamp(
              camera.position.distanceTo(controls.target) / 2.1,
              0.22,
              1.1
            ),
            0.85
          );
          _beadScale.setScalar(beadZoomScale);
          _beadQuat.identity();

          for (let i = 0; i < tracks.length; i++) {
            const tr = tracks[i];
            const u = (qiPhase * tr.lengthWeight + tr.phaseOffset) % 1;
            tr.curve.getPointAt(u, _beadPos);
            _beadMat.compose(_beadPos, _beadQuat, _beadScale);
            qiMesh.setMatrixAt(i, _beadMat);
          }
          qiMesh.instanceMatrix.needsUpdate = true;
        }
      }

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
      renderer.domElement.removeEventListener('touchstart', onTouchStartCapture, {
        capture: true,
      } as EventListenerOptions);
      renderer.domElement.removeEventListener('touchmove', onTouchMoveCapture, {
        capture: true,
      } as EventListenerOptions);
      renderer.domElement.removeEventListener('touchend', onTouchEndCapture, {
        capture: true,
      } as EventListenerOptions);
      renderer.domElement.removeEventListener('pointerdown', onPointerDownCapture, {
        capture: true,
      } as EventListenerOptions);
      renderer.domElement.removeEventListener('wheel', onWheelCapture, {
        capture: true,
      } as EventListenerOptions);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      controls.removeEventListener('start', onControlsStart);
      organsRig.dispose();
      cunGuidesRig.dispose();
      needleRig.dispose();
      bumpTex.dispose();
      eyeTex.dispose();
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
          ? 0.32
          : anatomicalMode === 'skin_skeleton'
          ? 0.52
          : 1.0;
      skinMaterialRef.current.depthWrite = !skinIsTranslucent;
      skinMaterialRef.current.depthTest = true;
      skinMaterialRef.current.depthFunc = THREE.LessEqualDepth;
      skinMaterialRef.current.side = skinIsTranslucent
        ? THREE.FrontSide
        : THREE.DoubleSide;
      skinMaterialRef.current.needsUpdate = true;
    }

    if (eyeballMaterialRef.current) {
      eyeballMaterialRef.current.transparent = skinIsTranslucent;
      eyeballMaterialRef.current.opacity =
        anatomicalMode === 'xray_all'
          ? 0.55
          : anatomicalMode === 'skin_skeleton'
          ? 0.88
          : 1.0;
      eyeballMaterialRef.current.depthWrite = !skinIsTranslucent;
      eyeballMaterialRef.current.needsUpdate = true;
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

    if (flowArrowsGroupRef.current) {
      flowArrowsGroupRef.current.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          const mat = child.material as THREE.MeshBasicMaterial;
          if (mat) {
            mat.depthTest = !showAllPointsThroughBody;
            mat.depthWrite = !showAllPointsThroughBody;
            mat.transparent = showAllPointsThroughBody;
            mat.opacity = showAllPointsThroughBody ? 0.92 : 1.0;
            mat.needsUpdate = true;
          }
        }
      });
    }
  }, [anatomicalMode]);

  // Sync Zang-Fu 3D internal organs visibility & meridian pairing highlight
  useEffect(() => {
    const rig = organsRigRef.current;
    if (!rig) return;
    rig.setVisible(showOrgans);
    if (showOrgans) {
      rig.highlightMeridians(activeMeridianIds);
    }
  }, [showOrgans, activeMeridianIds]);

  // Sync anatomical Cun & Midline reference guides visibility
  useEffect(() => {
    cunGuidesRigRef.current?.setVisible(showCunGuides);
  }, [showCunGuides]);

  // Sync 3D virtual acupuncture needle target & insertion angle on selected point
  useEffect(() => {
    const needle = needleRigRef.current;
    if (!needle) return;
    if (!showNeedle || !selectedPoint) {
      needle.setVisible(false);
      return;
    }

    const plotted = allPlottedPoints.find(
      (p) => p.detail.id === selectedPoint.id || p.displayCode === selectedPoint.code
    );
    const exactNorm =
      (plotted?.snappedNormal) ||
      (plotted && surfaceData?.normals?.[plotted.code]);
    const [px, py, pz] = selectedPoint.position;
    const outwardNormal = exactNorm
      ? new THREE.Vector3(exactNorm[0], exactNorm[1], exactNorm[2]).normalize()
      : computeOutwardSurfaceNormal(px, py, pz);

    needle.setTarget(selectedPoint.position, outwardNormal, selectedPoint.depth);
    needle.setVisible(true);
  }, [selectedPoint, showNeedle, allPlottedPoints, surfaceData]);

  // Render Surface-Registered Meridian Curves, Flow Direction Arrows, Qi Beads, & Acupoint Pins + Labels
  useEffect(() => {
    if (
      !surfaceData ||
      !meridiansGroupRef.current ||
      !pointsGroupRef.current ||
      !flowArrowsGroupRef.current
    )
      return;

    const currentTranslucent = isTranslucentSkinRef.current;

    // Clear previous meridian tubes, directional flow arrows, Qi beads, & acupoint pins
    while (meridiansGroupRef.current.children.length > 0) {
      const obj = meridiansGroupRef.current.children[0] as THREE.Mesh;
      obj.geometry?.dispose();
      if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
      else obj.material?.dispose();
      meridiansGroupRef.current.remove(obj);
    }
    while (flowArrowsGroupRef.current.children.length > 0) {
      const obj = flowArrowsGroupRef.current.children[0] as THREE.Mesh;
      // Do not dispose shared cone/bead geometries
      if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
      else obj.material?.dispose();
      flowArrowsGroupRef.current.remove(obj);
    }
    qiBeadsMeshRef.current = null;
    qiTracksRef.current = [];

    while (pointsGroupRef.current.children.length > 0) {
      const obj = pointsGroupRef.current.children[0] as any;
      // Do not dispose shared pin geometries or cached sprite textures
      if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose());
      else obj.material?.dispose();
      pointsGroupRef.current.remove(obj);
    }

    const arrowTransforms: { mat: THREE.Matrix4; color: THREE.Color }[] = [];
    const qiTracks: QiBeadTrack[] = [];
    const upAxis = new THREE.Vector3(0, 1, 0);
    const tmpPos = new THREE.Vector3();
    const tmpTangent = new THREE.Vector3();
    const tmpQuat = new THREE.Quaternion();
    const tmpScale = new THREE.Vector3(1, 1, 1);

    ACU_ATLAS_BAR_ITEMS.forEach((barItem, meridianIdx) => {
      if (!activeMeridianIds.includes(barItem.id)) return;

      // Note: GV, CV are midline; DAI surfaceData.routes already includes left, right, and full belt loop
      const isBilateralCurves = !['GV', 'CV', 'DAI'].includes(barItem.id);
      const curveSides = isBilateralCurves ? [1, -1] : [1];
      const isBilateralPoints = !['GV', 'CV'].includes(barItem.id);
      const pointSides = isBilateralPoints ? [1, -1] : [1];

      const routeSegments =
        barItem.id === 'EX' || barItem.id === 'DT'
          ? []
          : surfaceData.routes[barItem.id] || [];
      const lineColor = new THREE.Color(barItem.lineColor);
      const arrowColor = lineColor.clone().lerp(new THREE.Color('#ffffff'), 0.32);

      // 1. Render exact surface-bound meridian curves + directional arrowheads + Qi bead tracks
      curveSides.forEach((sideSign) => {
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

          // Sample curve length to place equally spaced directional arrowheads & Qi energy beads
          const segLen = Math.max(0.06, curve.getLength());
          const numArrows = Math.max(2, Math.min(18, Math.floor(segLen / 0.14)));
          for (let a = 0; a < numArrows; a++) {
            const u = (a + 0.5) / numArrows;
            curve.getPointAt(u, tmpPos);
            curve.getTangentAt(u, tmpTangent).normalize();
            tmpQuat.setFromUnitVectors(upAxis, tmpTangent);
            const mat = new THREE.Matrix4().compose(tmpPos, tmpQuat, tmpScale);
            arrowTransforms.push({ mat, color: arrowColor });
          }

          // Spawn 2..6 traveling Qi pulses per spline segment moving strictly origin -> terminal
          const numBeads = Math.max(2, Math.min(6, Math.round(segLen / 0.25)));
          const speedWeight = THREE.MathUtils.clamp(0.55 / segLen, 0.35, 1.45);
          for (let b = 0; b < numBeads; b++) {
            qiTracks.push({
              curve,
              color: arrowColor,
              phaseOffset: b / numBeads,
              lengthWeight: speedWeight,
            });
          }
        });
      });

      // 2. Render acupoints along this meridian (classic, extraordinary vessels, WHO extra & Đổng Thị 3D)
      const meridianPoints = allPlottedPoints.filter(
        (pt) => pt.meridianId === barItem.id
      );

      pointSides.forEach((sideSign) => {
        meridianPoints.forEach((pt, ptIdx) => {
          // Avoid duplicating midline points (like Ấn Đường) on both +1 and -1 sides
          if (sideSign === -1 && Math.abs(pt.position[0]) < 0.004) return;

          const isSelected =
            selectedPoint?.id === pt.detail.id || selectedPoint?.code === pt.displayCode;
          const isSpecial = Boolean(pt.isSpecial);

          if (pointFilterMode === 'special' && !isSpecial && !isSelected) {
            return;
          }

          const posX = pt.position[0] * sideSign;
          const posY = pt.position[1];
          const posZ = pt.position[2];

          const exactNorm = pt.snappedNormal || surfaceData.normals?.[pt.code];
          const outwardNormal = exactNorm
            ? new THREE.Vector3(exactNorm[0] * sideSign, exactNorm[1], exactNorm[2]).normalize()
            : computeOutwardSurfaceNormal(posX, posY, posZ);

          // Align pin center cleanly along meridian tube / skin offset
          const pinX = posX + outwardNormal.x * 0.0004;
          const pinY = posY + outwardNormal.y * 0.0004;
          const pinZ = posZ + outwardNormal.z * 0.0004;
          const anchorPos = new THREE.Vector3(pinX, pinY, pinZ);

          const pinGeo = isSelected
            ? SHARED_PIN_GEO_SELECTED
            : isSpecial
              ? SHARED_PIN_GEO_SPECIAL
              : SHARED_PIN_GEO_NORMAL;
          const pinColor = isSelected
            ? 0xef4444
            : barItem.id === 'DT'
              ? 0x14b8a6
              : isSpecial
                ? 0xf97316
                : 0xfacc15;
          const pinMat = new THREE.MeshBasicMaterial({
            color: pinColor,
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
            isSelected,
            isSpecial,
          };
          pointsGroupRef.current?.add(pinMesh);

          // Floating Vietnamese Acupoint Name Label
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

    // Build GPU-instanced directional arrowheads along all active meridians
    if (arrowTransforms.length > 0 && flowArrowsGroupRef.current) {
      const arrowMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        depthTest: !currentTranslucent,
        depthWrite: !currentTranslucent,
        transparent: currentTranslucent,
        opacity: currentTranslucent ? 0.92 : 1.0,
      });
      const arrowInstanced = new THREE.InstancedMesh(
        SHARED_FLOW_ARROW_GEO,
        arrowMat,
        arrowTransforms.length
      );
      arrowInstanced.frustumCulled = false;
      arrowInstanced.renderOrder = 5;
      for (let i = 0; i < arrowTransforms.length; i++) {
        arrowInstanced.setMatrixAt(i, arrowTransforms[i].mat);
        arrowInstanced.setColorAt(i, arrowTransforms[i].color);
      }
      arrowInstanced.instanceMatrix.needsUpdate = true;
      if (arrowInstanced.instanceColor) arrowInstanced.instanceColor.needsUpdate = true;
      flowArrowsGroupRef.current.add(arrowInstanced);
    }

    // Build GPU-instanced flowing Qi energy beads
    if (qiTracks.length > 0 && flowArrowsGroupRef.current) {
      const beadMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        depthTest: !currentTranslucent,
        depthWrite: false,
        transparent: true,
        opacity: 0.95,
      });
      const qiInstanced = new THREE.InstancedMesh(
        SHARED_QI_BEAD_GEO,
        beadMat,
        qiTracks.length
      );
      qiInstanced.frustumCulled = false;
      qiInstanced.renderOrder = 6;
      const initMat = new THREE.Matrix4();
      const initPos = new THREE.Vector3();
      const initQuat = new THREE.Quaternion();
      const initScale = new THREE.Vector3(1, 1, 1);
      for (let i = 0; i < qiTracks.length; i++) {
        qiTracks[i].curve.getPointAt(qiTracks[i].phaseOffset, initPos);
        initMat.compose(initPos, initQuat, initScale);
        qiInstanced.setMatrixAt(i, initMat);
        qiInstanced.setColorAt(i, qiTracks[i].color.clone().lerp(new THREE.Color('#fef08a'), 0.45));
      }
      qiInstanced.instanceMatrix.needsUpdate = true;
      if (qiInstanced.instanceColor) qiInstanced.instanceColor.needsUpdate = true;
      qiBeadsMeshRef.current = qiInstanced;
      qiTracksRef.current = qiTracks;
      flowArrowsGroupRef.current.add(qiInstanced);
    }

    occlusionDirtyRef.current = true;
  }, [
    surfaceData,
    activeMeridianIds,
    allPlottedPoints,
    selectedPoint,
    showLabels,
    pointFilterMode,
  ]);

  // Toggle meridian selection (clicking an active meridian toggles it off; clicking a new one opens it)
  const handleToggleMeridian = (id: string) => {
    setSelectedPoint(null);
    setSelectedOrgan(null);
    if (multiSelectMode) {
      setActiveMeridianIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setActiveMeridianIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  const handleCycleMeridian = (targetId: string) => {
    setSelectedPoint(null);
    setSelectedOrgan(null);
    setActiveMeridianIds([targetId]);
  };

  const primaryActiveId =
    activeMeridianIds.length > 0
      ? activeMeridianIds[activeMeridianIds.length - 1]
      : null;
  const primaryActiveItem = primaryActiveId
    ? ACU_ATLAS_BAR_ITEMS.find((i) => i.id === primaryActiveId) || null
    : null;
  const primaryFlowMeta = primaryActiveId
    ? MERIDIAN_FLOW_META[primaryActiveId] || null
    : null;
  const nextFlowItem =
    primaryFlowMeta?.nextMeridianId
      ? ACU_ATLAS_BAR_ITEMS.find((i) => i.id === primaryFlowMeta.nextMeridianId) || null
      : null;

  const filteredBarItems = useMemo(() => {
    if (vesselCategoryTab === 'all') return ACU_ATLAS_BAR_ITEMS;
    return ACU_ATLAS_BAR_ITEMS.filter((item) => item.category === vesselCategoryTab);
  }, [vesselCategoryTab]);

  const safetyWarningText = useMemo(
    () => (selectedPoint ? extractClinicalSafetyWarning(selectedPoint.depth) : null),
    [selectedPoint]
  );

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
            title="Tìm nhanh trong 460+ huyệt đạo & 20 đường kinh"
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
              <div className="mt-2 w-76 sm:w-88 max-h-[72vh] overflow-y-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 p-3 text-slate-800 space-y-2.5 animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Tuỳ Chỉnh Giải Phẫu & Kinh Lạc 3D
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

                {/* Flow Direction Arrows & Qi Velocity Controls */}
                <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200/70 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-extrabold text-rose-900">
                      <Navigation className="w-3.5 h-3.5 text-rose-600" />
                      Chiều Đi Kinh Lạc & Dòng Khí
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowFlowArrows(!showFlowArrows)}
                      className={`px-2 py-0.5 rounded-full text-[11px] font-bold cursor-pointer ${
                        showFlowArrows
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {showFlowArrows ? 'Đang Bật' : 'Đã Tắt'}
                    </button>
                  </div>
                  {showFlowArrows && (
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-bold text-slate-600 mr-1">
                        Tốc độ khí:
                      </span>
                      {[
                        { val: 0, label: 'Dừng' },
                        { val: 0.6, label: 'Chậm' },
                        { val: 1.0, label: 'Vừa' },
                        { val: 1.8, label: 'Nhanh' },
                      ].map((spd) => (
                        <button
                          key={spd.label}
                          type="button"
                          onClick={() => setQiFlowSpeed(spd.val)}
                          className={`flex-1 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                            qiFlowSpeed === spd.val
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'bg-white text-slate-700 hover:bg-rose-100 border border-rose-200/60'
                          }`}
                        >
                          {spd.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Anatomical Extras: Internal Organs, Virtual Needle, Cun Guides, Special Point Filter */}
                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      const next = !showOrgans;
                      setShowOrgans(next);
                      if (next && anatomicalMode === 'opaque_skin') {
                        setAnatomicalMode('skin_skeleton');
                      }
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-rose-600" />
                      Nội Tạng Tạng Phủ 3D (Click xem kinh)
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] ${
                        showOrgans
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {showOrgans ? 'Đang Bật' : 'Tắt'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowNeedle(!showNeedle)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Syringe className="w-4 h-4 text-amber-600" />
                      Kim Châm 3D mô phỏng góc & hướng châm
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] ${
                        showNeedle
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {showNeedle ? 'Đang Bật' : 'Tắt'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowCunGuides(!showCunGuides)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-sky-600" />
                      Trục Giữa & Mốc Đo Thốn (Cun)
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] ${
                        showCunGuides
                          ? 'bg-sky-100 text-sky-700'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {showCunGuides ? 'Đang Bật' : 'Tắt'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setPointFilterMode(pointFilterMode === 'all' ? 'special' : 'all')
                    }
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-orange-600" />
                      Lọc Huyệt (Nguyên, Lạc, Du, Mộ, Khích...)
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] ${
                        pointFilterMode === 'special'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {pointFilterMode === 'special' ? 'Đặc Hiệu' : 'Tất Cả'}
                    </span>
                  </button>

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
                        showLabels
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-200 text-slate-600'
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
                        multiSelectMode
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {multiSelectMode ? 'Nhiều kinh' : 'Đơn kinh'}
                    </span>
                  </button>
                </div>

                <div className="pt-1 flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMeridianIds(
                        ACU_ATLAS_BAR_ITEMS.filter((i) => i.category === 'main').map(
                          (i) => i.id
                        )
                      );
                      setShowToolPopover(false);
                    }}
                    className="flex-1 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 cursor-pointer"
                  >
                    Bật 14 Kinh Chính
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMeridianIds([]);
                      setSelectedPoint(null);
                      setSelectedOrgan(null);
                      setShowToolPopover(false);
                    }}
                    className="flex-1 py-1.5 rounded-lg bg-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-300 cursor-pointer"
                  >
                    Ẩn Tất Cả
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
                { id: 'front', label: 'Chính diện (Toàn thân trước)', match: 'Chính diện' },
                { id: 'leftArm', label: 'Cánh tay & Bàn tay Trái', match: 'Tay Trái' },
                { id: 'rightArm', label: 'Cánh tay & Bàn tay Phải', match: 'Tay Phải' },
                { id: 'sideProfile', label: 'Nghiêng Bên (Vai - Cánh tay)', match: 'Nghiêng' },
                { id: 'back', label: 'Sau Lưng (Cột sống - Du huyệt)', match: 'Sau Lưng' },
                { id: 'head', label: 'Cận cảnh Đầu - Mặt - Cổ', match: 'Đầu Mặt' },
                { id: 'legs', label: 'Hai Chân & Bàn chân', match: 'Hai Chân' },
              ].map((v) => {
                const isActive = activePresetLabel === v.match;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => {
                      setCameraView(v.id as any);
                      setShowCameraPopover(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-rose-50 text-rose-700'
                        : 'text-slate-700 hover:bg-rose-50 hover:text-rose-700'
                    }`}
                  >
                    <span>{v.label}</span>
                    {isActive ? (
                      <Check className="w-3.5 h-3.5 text-rose-600" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
          </div>
        </div>

        {/* Quick Toggle Chips directly below top bar (Tạng Phủ, Chiều Đi Khí, Đặc Hiệu, Thốn) */}
        <div className="absolute top-14 sm:top-16 right-2.5 sm:right-4 z-10 flex flex-col items-end gap-1.5 pointer-events-none">
          <div className="pointer-events-auto flex flex-wrap justify-end gap-1">
            <button
              type="button"
              onClick={() => setShowFlowArrows(!showFlowArrows)}
              title="Bật/Tắt mũi tên chỉ chiều đi kinh lạc và dòng Khí lưu chuyển"
              className={`px-2 py-1 rounded-lg text-[10px] sm:text-xs font-bold shadow-sm border transition-all flex items-center gap-1 cursor-pointer ${
                showFlowArrows
                  ? 'bg-rose-600 text-white border-rose-700'
                  : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white'
              }`}
            >
              <Navigation className="w-3 h-3" />
              <span>Chiều Khí</span>
            </button>
            {showFlowArrows && (
              <button
                type="button"
                onClick={() => setQiFlowSpeed((s) => (s > 0 ? 0 : 1.0))}
                title={qiFlowSpeed > 0 ? 'Tạm dừng dòng khí' : 'Chạy dòng khí tuần hoàn'}
                className="px-2 py-1 rounded-lg text-[10px] sm:text-xs font-bold shadow-sm bg-white/90 hover:bg-white text-slate-800 border border-slate-200 flex items-center gap-1 cursor-pointer"
              >
                {qiFlowSpeed > 0 ? (
                  <Pause className="w-3 h-3 text-rose-600" />
                ) : (
                  <Play className="w-3 h-3 text-emerald-600" />
                )}
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                const next = !showOrgans;
                setShowOrgans(next);
                if (next && anatomicalMode === 'opaque_skin') {
                  setAnatomicalMode('skin_skeleton');
                }
              }}
              title="Hiển thị 3D Tạng Phủ (Tim, Phổi, Gan, Dạ Dày, Thận, Bàng Quang...)"
              className={`px-2 py-1 rounded-lg text-[10px] sm:text-xs font-bold shadow-sm border transition-all flex items-center gap-1 cursor-pointer ${
                showOrgans
                  ? 'bg-rose-700 text-white border-rose-800'
                  : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white'
              }`}
            >
              <Heart className="w-3 h-3" />
              <span>Tạng Phủ</span>
            </button>
            <button
              type="button"
              onClick={() => setShowCunGuides(!showCunGuides)}
              title="Hiện/Ẩn đường giữa Nhâm-Đốc & vòng mốc đo Thốn (Cun)"
              className={`px-2 py-1 rounded-lg text-[10px] sm:text-xs font-bold shadow-sm border transition-all hidden sm:flex items-center gap-1 cursor-pointer ${
                showCunGuides
                  ? 'bg-sky-600 text-white border-sky-700'
                  : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white'
              }`}
            >
              <Ruler className="w-3 h-3" />
              <span>Mốc Thốn</span>
            </button>
            <button
              type="button"
              onClick={() =>
                setPointFilterMode(pointFilterMode === 'all' ? 'special' : 'all')
              }
              title="Chỉ hiện các Huyệt Đặc Hiệu (Nguyên, Lạc, Khích, Du, Mộ, Ngũ Du, Bát Hội...)"
              className={`px-2 py-1 rounded-lg text-[10px] sm:text-xs font-bold shadow-sm border transition-all flex items-center gap-1 cursor-pointer ${
                pointFilterMode === 'special'
                  ? 'bg-orange-600 text-white border-orange-700'
                  : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white'
              }`}
            >
              <Filter className="w-3 h-3" />
              <span>{pointFilterMode === 'special' ? 'Đặc Hiệu' : 'Tất Cả'}</span>
            </button>
          </div>
        </div>

        {/* Active Meridian Qi Flow Direction & Tử Ngọ Lưu Chú HUD Card */}
        {primaryFlowMeta && primaryActiveItem && !showMenuDrawer && !selectedPoint && !selectedOrgan && (
          <div className="absolute bottom-3 sm:bottom-4 left-2.5 sm:left-4 z-10 max-w-[310px] sm:max-w-sm bg-white/92 backdrop-blur-md border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 shadow-xl text-slate-900 space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: primaryActiveItem.lineColor }}
                />
                <span className="text-xs font-extrabold text-slate-900 truncate">
                  {primaryActiveItem.viShort}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold shrink-0">
                  {primaryFlowMeta.flowDirectionType}
                </span>
              </div>
              {nextFlowItem && (
                <button
                  type="button"
                  onClick={() => handleCycleMeridian(nextFlowItem.id)}
                  title={`Chuyển tiếp vòng tuần hoàn Tý Ngọ Lưu Chú sang ${nextFlowItem.viShort}`}
                  className="px-2 py-0.5 rounded-lg bg-slate-900 hover:bg-rose-700 text-white text-[10px] font-bold flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
                >
                  <span>Tiếp: {nextFlowItem.viShort}</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </button>
              )}
            </div>
            <div className="text-[11px] font-semibold text-slate-700 flex flex-wrap gap-x-2 gap-y-0.5">
              <span>• Giờ vượng: {primaryFlowMeta.flowTime}</span>
              <span>• {primaryFlowMeta.pairedZangFu}</span>
            </div>
            <p className="text-[11px] leading-snug text-slate-600">
              <span className="font-bold text-slate-800">Chiều kinh: </span>
              {primaryFlowMeta.originPointName} → {primaryFlowMeta.terminalPointName}
            </p>
          </div>
        )}

        {/* ===================================================================
            SEARCH MODAL OVERLAY (Triggered by top-left 🔍 button)
           =================================================================== */}
        {showSearchModal && (
          <div className="absolute top-16 left-3 sm:left-4 z-30 w-80 sm:w-96 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 p-3.5 text-slate-900 animate-fade-in">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2.5">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm trong 460+ huyệt (LU-1, ĐT 22.05, Hợp Cốc, Ấn Đường)..."
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
          <div className="absolute top-16 left-3 sm:left-4 z-30 max-w-sm w-[calc(100%-1.5rem)] max-h-[68vh] overflow-y-auto bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-2xl text-slate-900 space-y-2.5 animate-fade-in">
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
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
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowNeedle(!showNeedle)}
                  title="Bật/Tắt Kim Châm 3D mô phỏng hướng & góc châm"
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer border ${
                    showNeedle
                      ? 'bg-amber-50 border-amber-300 text-amber-800'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <Syringe className="w-3 h-3" />
                  <span>{showNeedle ? 'Kim 3D' : 'Tắt kim'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPoint(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-1.5 text-xs leading-relaxed">
              {selectedPoint.specialRole && (
                <div className="px-2.5 py-1.5 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-900">
                  <span className="font-bold">Đặc tính huyệt: </span>
                  <span>{selectedPoint.specialRole}</span>
                </div>
              )}
              {safetyWarningText && (
                <div className="px-2.5 py-1.5 rounded-lg bg-rose-50 border border-rose-300 text-rose-900 flex items-start gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <span>
                    <span className="font-bold">Lưu ý an toàn giải phẫu: </span>
                    {safetyWarningText}
                  </span>
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
            SELECTED 3D ZANG-FU INTERNAL ORGAN CARD
           =================================================================== */}
        {selectedOrgan && !selectedPoint && (
          <div className="absolute top-16 left-3 sm:left-4 z-30 max-w-sm w-[calc(100%-1.5rem)] bg-white/95 backdrop-blur-md border border-rose-200 rounded-2xl p-4 shadow-2xl text-slate-900 space-y-2.5 animate-fade-in">
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: selectedOrgan.baseColor }}
                  />
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                    {selectedOrgan.name}
                  </h4>
                  <span className="text-xs text-slate-500 font-serif">
                    ({selectedOrgan.chineseName})
                  </span>
                </div>
                <p className="text-[11px] font-bold text-rose-700 mt-0.5">
                  {selectedOrgan.category} • Tương ứng Kinh {selectedOrgan.meridianIds.join(' / ')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrgan(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5 text-xs leading-relaxed">
              <div>
                <span className="font-bold text-slate-900">• Công năng Tạng Phủ: </span>
                <span className="text-slate-700">{selectedOrgan.physiology}</span>
              </div>
              <div>
                <span className="font-bold text-slate-900">• Định vị giải phẫu: </span>
                <span className="text-slate-700">{selectedOrgan.clinicalNotes}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setActiveMeridianIds(selectedOrgan.meridianIds);
                setSelectedOrgan(null);
              }}
              className="w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Hiện Đường Kinh & Chiều Khí Của {selectedOrgan.id}</span>
            </button>
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
                  Hệ Thống 20 Kinh Mạch & 460+ Huyệt 3D
                </h3>
                <p className="text-[11px] text-slate-500">
                  14 Kinh Chính + 6 Kỳ Kinh Bát Mạch + 58 Kỳ Huyệt + 40 Đổng Thị 3D
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
                onClick={() =>
                  setActiveMeridianIds(
                    ACU_ATLAS_BAR_ITEMS.filter((i) => i.category === 'main').map(
                      (m) => m.id
                    )
                  )
                }
                className="flex-1 py-1.5 rounded-lg bg-[#d93829] text-white text-xs font-bold hover:bg-rose-700 cursor-pointer"
              >
                Hiện 14 Kinh Chính
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveMeridianIds([]);
                  setSelectedPoint(null);
                  setSelectedOrgan(null);
                }}
                className="flex-1 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-bold hover:bg-slate-200 cursor-pointer"
              >
                Ẩn Tất Cả
              </button>
            </div>

            <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
              {ACU_ATLAS_BAR_ITEMS.map((item) => {
                const isChecked = activeMeridianIds.includes(item.id);
                const mPoints = allPlottedPoints.filter((p) => p.meridianId === item.id);
                const flow = MERIDIAN_FLOW_META[item.id];
                return (
                  <div key={item.id} className="py-2">
                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggleMeridian(item.id)}
                        className="flex items-center gap-2 text-left cursor-pointer min-w-0"
                      >
                        <span
                          className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                            isChecked
                              ? 'bg-[#d93829] border-[#d93829] text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-extrabold text-slate-900 truncate">
                            {item.shortLabel.toUpperCase()} — {item.viShort}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate">
                            {flow ? `${flow.flowDirectionType} • ${flow.flowTime}` : item.enName}
                          </div>
                        </div>
                      </button>
                      <span className="text-[11px] font-bold text-slate-400 shrink-0">
                        {mPoints.length} huyệt
                      </span>
                    </div>

                    {isChecked && mPoints.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5 pl-6">
                        {mPoints.map((sp) => (
                          <button
                            key={`${item.id}-${sp.code}`}
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
          CATEGORY FILTER STRIP + BOTTOM WHITE ACU ATLAS 3D MERIDIAN BAR
         ===================================================================== */}
      <div className="w-full bg-slate-100 border-t border-slate-300 px-2.5 py-1.5 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {[
          { id: 'all', label: `Tất cả (${ACU_ATLAS_BAR_ITEMS.length})` },
          { id: 'main', label: '14 Kinh Chính & Nhâm-Đốc' },
          { id: 'extra_vessel', label: 'Kỳ Kinh Bát Mạch (6)' },
          { id: 'special', label: 'Kỳ Huyệt WHO & Đổng Thị 3D' },
        ].map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setVesselCategoryTab(cat.id as any)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
              vesselCategoryTab === cat.id
                ? 'bg-[#d83427] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="w-full bg-[#f5f5f5] border-t border-slate-200 flex items-stretch h-20 sm:h-22">
        {/* Left Hamburger Button (☰) */}
        <button
          type="button"
          onClick={() => setShowMenuDrawer(!showMenuDrawer)}
          title="Mở danh sách chi tiết 20 Kinh Mạch & 460+ Huyệt vị"
          className="w-16 sm:w-20 shrink-0 flex flex-col items-center justify-center border-r border-slate-300 hover:bg-slate-200/70 text-slate-600 transition-colors cursor-pointer"
        >
          <Menu className="w-7 h-7 stroke-[2]" />
          <span className="text-[10px] font-semibold text-slate-500 mt-0.5">
            20 Kinh
          </span>
        </button>

        {/* Horizontal Scrollable Meridian Code Tabs */}
        <div className="flex-1 flex items-stretch overflow-x-auto scrollbar-thin divide-x divide-slate-200/70">
          {filteredBarItems.map((item) => {
            const isActive = activeMeridianIds.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleToggleMeridian(item.id)}
                className={`min-w-[68px] sm:min-w-[84px] px-2.5 flex flex-col items-center justify-center transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-white shadow-inner'
                    : 'bg-[#f5f5f5] hover:bg-white/70'
                }`}
              >
                <span
                  className={`text-xl sm:text-[26px] font-extrabold tracking-tight leading-none ${
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
                  className={`text-[9px] leading-none mt-0.5 whitespace-nowrap ${
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
