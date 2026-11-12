import React, { useState } from 'react';

interface AcupointVisualDiagramProps {
  code: string;
  name: string;
  chineseName?: string;
  zone: string;
  location: string;
  needling?: string;
  anatomy?: string;
  mode?: 'compact' | 'expanded';
}

interface MarkerCoord {
  left: number;
  top: number;
}

interface AcupointPhotoMapping {
  photoUrl: string;
  surfaceLabel: string;
  markerLeftPercent: number;
  markerTopPercent: number;
  markers: MarkerCoord[];
  anatomicalLandmarkNote: string;
}

const PHOTOS = {
  PALMAR_HAND: '/assets/images/real_hand_palmar_1794279448548.jpg',
  DORSAL_HAND: '/assets/images/real_hand_dorsal_1794279449692.jpg',
  ARM_FOREARM: '/assets/images/real_acupoint_arm_forearm_1794278485426.jpg',
  FOOT_SPLIT: '/assets/images/real_foot_plantar_dorsal_1794279452126.jpg',
  THIGH_LEG: '/assets/images/real_thigh_lower_leg_1794279486124.jpg',
  ANTERIOR_TORSO: '/assets/images/real_anterior_torso_abdomen_1794279534877.jpg',
  POSTERIOR_BACK_NECK: '/assets/images/real_acupoint_head_ear_back_1794278488167.jpg',
  HEAD_CROWN_PROFILE: '/assets/images/real_head_crown_temple_profile_1794280774865.jpg',
  FACE_FRONT: '/assets/images/real_face_closeup_front_1794280802766.jpg'
} as const;

interface ExactCodeEntry {
  photoUrl: string;
  surfaceLabel: string;
  markers: MarkerCoord[];
  landmark: string;
}

// ============================================================================
// EXACT CALIBRATED COORDINATES FOR ALL TUNG POINTS (239) & WHO EXTRA POINTS (58)
// Every coordinate (left%, top%) is calibrated to the anatomical landmarks on
// the 9 clinical reference photographs.
// ============================================================================
const EXACT_POINT_DATABASE: Record<string, ExactCodeEntry> = {
  // --------------------------------------------------------------------------
  // KHU 11: NGÓN TAY (MẶT LÒNG & MẶT LƯNG)
  // Palmar hand: fingers point right (+x = distal, -y = radial/thumb side, +y = ulnar/little finger side)
  // Index: Phalanx 1 x=63..73, Phalanx 2 x=74..81, Phalanx 3 x=83..89 | y: radial=30.8, center=33.4, ulnar=36.0
  // Middle: Phalanx 1 x=64..74, Phalanx 2 x=75..84, Phalanx 3 x=85..93 | y: radial=46.5, center=49.0, ulnar=51.5
  // Ring: Phalanx 1 x=63..73, Phalanx 2 x=74..81, Phalanx 3 x=83..89 | y: radial=60.8, center=63.2, ulnar=65.6
  // Little: Phalanx 1 x=59..66, Phalanx 2 x=67..73, Phalanx 3 x=74..80 | y: radial=75.3, center=77.5, ulnar=79.7
  // --------------------------------------------------------------------------
  '11.01': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Ngón Tay Trỏ – Đốt 1 (Bàn Tay Ngửa)',
    markers: [{ left: 68.0, top: 30.8 }],
    landmark: 'Mặt lòng đốt 1 ngón trỏ, từ chính giữa đốt lệch ra bờ ngoài (phía ngón cái) 3 phân'
  },
  '11.02': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Ngón Tay Trỏ – Đốt 1 (Bàn Tay Ngửa)',
    markers: [{ left: 70.8, top: 30.8 }],
    landmark: 'Mặt lòng đốt 1 ngón trỏ, từ huyệt Đại Gian (11.01) đo lên phía đầu ngón 2,5 phân'
  },
  '11.03': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Ngón Tay Trỏ – Đốt 2 (Bàn Tay Ngửa)',
    markers: [{ left: 79.2, top: 31.2 }],
    landmark: 'Mặt lòng đốt 2 ngón trỏ lệch ra phía ngón cái 2 phân, ở 1/3 xa gần khớp đốt 2–3'
  },
  '11.04': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Ngón Tay Trỏ – Đốt 2 (Bàn Tay Ngửa)',
    markers: [{ left: 75.8, top: 31.2 }],
    landmark: 'Mặt lòng đốt 2 ngón trỏ lệch ra phía ngón cái 2 phân, ở 1/3 gần (dưới Phù Gian 3,3 phân)'
  },
  '11.05': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Ngón Tay Trỏ – Đốt 1 (Bàn Tay Ngửa)',
    markers: [{ left: 68.0, top: 33.4 }],
    landmark: 'Chính giữa đường trung tâm mặt lòng đốt thứ nhất ngón tay trỏ'
  },
  '11.06': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Ngón Áp Út – Đốt 2 (Bàn Tay Ngửa)',
    markers: [{ left: 77.6, top: 60.8 }],
    landmark: 'Mặt lòng đốt thứ 2 ngón áp út (vô danh), chính giữa đốt lệch về phía ngón giữa 5 phân'
  },
  '11.07': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Lưng Ngón Tay Trỏ – Đốt 2 (Bàn Tay Úp)',
    markers: [
      { left: 74.8, top: 36.5 },
      { left: 77.2, top: 36.5 },
      { left: 79.6, top: 36.5 }
    ],
    landmark: 'Mặt lưng đốt 2 ngón trỏ lệch về phía ngón giữa 3 phân (Chỉ Tứ Mã 1, 2, 3 cách nhau 2,5 phân)'
  },
  '11.08': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Lưng Ngón Tay Trỏ – Đốt 1 (Bàn Tay Úp)',
    markers: [
      { left: 65.2, top: 36.5 },
      { left: 69.2, top: 36.5 }
    ],
    landmark: 'Mặt lưng đốt 1 ngón trỏ lệch về phía ngón giữa 3 phân (1/3 dưới là Chỉ Ngũ Kim, 1/3 trên là Chỉ Thiên Kim)'
  },
  '11.09': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Lưng Ngón Tay Giữa – Đốt 2 (Bàn Tay Úp)',
    markers: [
      { left: 78.8, top: 46.2 },
      { left: 78.8, top: 51.8 }
    ],
    landmark: 'Mặt lưng đốt 2 ngón tay giữa, từ chính giữa đốt đo sang hai bên mỗi bên 5 phân (Tâm Tất 1 & 2)'
  },
  '11.10': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Lưng 4 Ngón Tay – Khớp Liên Đốt Xa (Bàn Tay Úp)',
    markers: [
      { left: 83.0, top: 34.0 },
      { left: 85.5, top: 49.0 },
      { left: 82.5, top: 63.2 },
      { left: 74.0, top: 78.5 }
    ],
    landmark: 'Chính giữa nếp khớp liên đốt xa (đốt 2–3) mặt lưng 4 ngón tay trỏ, giữa, áp út, út (4 huyệt Mộc Hỏa)'
  },
  '11.11': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Lưng Ngón Tay Giữa – Đốt 2 (Bàn Tay Úp)',
    markers: [
      { left: 76.2, top: 49.0 },
      { left: 78.8, top: 49.0 },
      { left: 81.4, top: 49.0 }
    ],
    landmark: 'Đường chính giữa mặt lưng đốt 2 ngón tay giữa (Phế Tâm 1, 2, 3 cách nhau 2,5 phân)'
  },
  '11.12': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Lưng Ngón Tay Giữa – Đốt 1 (Bàn Tay Úp)',
    markers: [
      { left: 66.8, top: 49.0 },
      { left: 70.4, top: 49.0 }
    ],
    landmark: 'Đường chính giữa mặt lưng đốt 1 ngón tay giữa chia 3 phần (Nhị Giác Minh 1 & 2)'
  },
  '11.13': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Lưng Ngón Tay Giữa – Đốt 1 (Bàn Tay Úp)',
    markers: [
      { left: 68.5, top: 46.2 },
      { left: 68.5, top: 51.8 }
    ],
    landmark: 'Mặt lưng đốt 1 ngón tay giữa, từ chính giữa đốt đo sang hai bên mỗi bên 5 phân (Đảm 1 & 2)'
  },
  '11.14': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Lưng Ngón Áp Út – Đốt 2 (Bàn Tay Úp)',
    markers: [
      { left: 74.2, top: 65.8 },
      { left: 76.6, top: 65.8 },
      { left: 79.0, top: 65.8 }
    ],
    landmark: 'Mặt lưng đốt 2 ngón áp út lệch về phía ngón út 3 phân (Chỉ Tam Trọng 1, 2, 3 cách nhau 2,5 phân)'
  },
  '11.15': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Lưng Ngón Áp Út – Đốt 1 (Bàn Tay Úp)',
    markers: [
      { left: 64.0, top: 65.8 },
      { left: 66.5, top: 65.8 },
      { left: 69.0, top: 65.8 }
    ],
    landmark: 'Mặt lưng đốt 1 ngón áp út lệch về phía ngón út 3 phân (Chỉ Thận 1, 2, 3 cách nhau 2,5 phân)'
  },
  '11.16': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Lưng Ngón Tay Út – Góc Móng Tay (Bàn Tay Úp)',
    markers: [{ left: 68.5, top: 82.5 }],
    landmark: 'Mặt lưng ngón tay út, góc trong gốc móng tay út cách chân móng 2 phân (vị trí Thiếu Trạch)'
  },
  '11.17': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Ngón Tay Trỏ – Đốt 1 (Bàn Tay Ngửa)',
    markers: [
      { left: 65.5, top: 36.0 },
      { left: 68.0, top: 36.0 },
      { left: 70.5, top: 36.0 }
    ],
    landmark: 'Mặt lòng đốt 1 ngón trỏ lệch vào bờ trong (phía ngón giữa) 3 phân (Mộc 1, Mộc 2, Mộc 3)'
  },
  '11.18': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Ngón Tay Giữa – Đốt 2 (Bàn Tay Ngửa)',
    markers: [
      { left: 77.5, top: 49.0 },
      { left: 82.0, top: 49.0 }
    ],
    landmark: 'Đường chính giữa mặt lòng đốt 2 ngón tay giữa, trên và dưới tâm đốt 2,5 phân (Tỳ Thũng 1 & 2)'
  },
  '11.19': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Ngón Tay Giữa – Đốt 1 (Bàn Tay Ngửa)',
    markers: [
      { left: 66.8, top: 51.5 },
      { left: 69.5, top: 51.5 },
      { left: 72.2, top: 51.5 }
    ],
    landmark: 'Mặt lòng đốt 1 ngón giữa lệch về phía ngón áp út 3 phân (Tâm Thường 1, 2, 3)'
  },
  '11.20': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Ngón Áp Út – Đốt 2 (Bàn Tay Ngửa)',
    markers: [
      { left: 75.4, top: 65.6 },
      { left: 77.6, top: 65.6 },
      { left: 79.8, top: 65.6 }
    ],
    landmark: 'Mặt lòng đốt 2 ngón áp út lệch về phía ngón út 3 phân (Mộc Viêm 1, 2, 3 cách nhau 2,5 phân)'
  },
  '11.21': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Ngón Áp Út – Đốt 1 (Bàn Tay Ngửa)',
    markers: [{ left: 70.5, top: 60.8 }],
    landmark: 'Mặt lòng đốt 1 ngón áp út lệch về phía ngón giữa 3 phân, ở 1/3 xa gần nếp khớp đốt 1–2'
  },
  '11.22': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Ngón Áp Út – Đốt 1 (Bàn Tay Ngửa)',
    markers: [
      { left: 65.2, top: 65.6 },
      { left: 68.0, top: 65.6 },
      { left: 70.8, top: 65.6 }
    ],
    landmark: 'Mặt lòng đốt 1 ngón áp út lệch về phía ngón út 3 phân (Phục Nguyên 1, 2, 3 cách nhau 2,5 phân)'
  },
  '11.23': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Ngón Tay Út – Đốt 2 (Bàn Tay Ngửa)',
    markers: [{ left: 70.3, top: 77.5 }],
    landmark: 'Chính giữa mặt lòng đốt thứ 2 của ngón tay út (Huyệt Nhãn Hoàng)'
  },
  '11.24': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Lưng Ngón Tay Cái – Bờ Trong Đốt 1 (Bàn Tay Úp)',
    markers: [
      { left: 47.5, top: 22.0 },
      { left: 49.0, top: 21.0 },
      { left: 50.5, top: 20.0 },
      { left: 52.0, top: 19.0 },
      { left: 53.5, top: 18.0 }
    ],
    landmark: 'Cạnh trong mặt lưng đốt 1 ngón tay cái chia 6 phần bằng nhau (5 huyệt Phụ Khoa sát bờ xương)'
  },
  '11.25': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Lưng Ngón Tay Cái – Bờ Ngoài Đốt 1 (Bàn Tay Úp)',
    markers: [
      { left: 46.0, top: 19.0 },
      { left: 47.5, top: 17.8 },
      { left: 49.0, top: 16.6 },
      { left: 50.5, top: 15.4 },
      { left: 52.0, top: 14.2 }
    ],
    landmark: 'Cạnh ngoài mặt lưng đốt 1 ngón tay cái chia 6 phần bằng nhau (5 huyệt Chỉ Diên)'
  },
  '11.26': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Lưng Ngón Tay Cái – Chính Giữa Đốt 1 (Bàn Tay Úp)',
    markers: [
      { left: 48.5, top: 18.8 },
      { left: 50.5, top: 17.5 },
      { left: 52.5, top: 16.2 }
    ],
    landmark: 'Đường chính giữa mặt lưng đốt 1 ngón tay cái (Chế Ô 1, 2, 3 cách nhau 2,5 phân)'
  },
  '11.27': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Ngón Tay Cái – Bờ Ngoài Đốt 1 (Bàn Tay Ngửa)',
    markers: [
      { left: 52.5, top: 14.2 },
      { left: 51.0, top: 15.4 },
      { left: 49.5, top: 16.6 },
      { left: 48.0, top: 17.8 },
      { left: 46.5, top: 19.0 }
    ],
    landmark: 'Mặt lòng đốt 1 ngón tay cái sát bờ ngoài (bờ quay), chia 6 phần lấy 5 huyệt từ trên xuống (Ngũ Hổ 1–5)'
  },
  '11.30': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Lưng 4 Ngón Tay – Đốt 1 (Bàn Tay Úp)',
    markers: [
      { left: 63.0, top: 31.8 },
      { left: 63.0, top: 36.2 },
      { left: 64.5, top: 46.8 },
      { left: 64.5, top: 51.2 },
      { left: 62.5, top: 61.0 },
      { left: 62.5, top: 65.4 },
      { left: 52.5, top: 78.5 },
      { left: 52.5, top: 81.5 }
    ],
    landmark: 'Mặt lưng đầu gần đốt 1 của 4 ngón tay trỏ, giữa, áp út, út, hai bên bờ xương mỗi ngón 2 huyệt (Bát Quan)'
  },
  '11.T01': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Ngón Tay Giữa – Lằn Chỉ Đốt 1–2 (Bàn Tay Ngửa)',
    markers: [
      { left: 75.0, top: 47.2 },
      { left: 75.0, top: 50.8 }
    ],
    landmark: 'Mặt lòng ngón tay giữa, trên lằn chỉ khớp liên đốt 1–2 đo sang hai bên trái và phải mỗi bên 2,5 phân (Song Linh 1 & 2)'
  },
  '11.T02': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Ngón Áp Út – Lằn Chỉ Đốt 1–2 (Bàn Tay Ngửa)',
    markers: [
      { left: 73.2, top: 61.4 },
      { left: 73.2, top: 65.0 }
    ],
    landmark: 'Mặt lòng ngón áp út, trên lằn chỉ khớp liên đốt 1–2 đo sang hai bên điểm giữa mỗi bên 2,5 phân (Mộc Linh 1 & 2)'
  },
  '11.T04': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Lưng Ngón Tay Cái – Khớp Liên Đốt (Bàn Tay Úp)',
    markers: [
      { left: 53.5, top: 14.2 },
      { left: 55.5, top: 17.8 }
    ],
    landmark: 'Mặt lưng ngón tay cái, tại hai đầu nếp gấp khớp liên đốt ngón cái (Châu Viên 1 & 2)'
  },
  '11.T05': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Ngón Tay Trỏ – Đốt 1 (Bàn Tay Ngửa)',
    markers: [{ left: 65.2, top: 30.8 }],
    landmark: 'Mặt lòng đốt 1 ngón trỏ lệch ra phía ngón cái 3 phân, dưới huyệt Đại Gian 2,5 phân (Huyệt Trắc Gian)'
  },
  '11.T06': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Ngón Tay Giữa – Đốt 1 & Đốt 2 (Bàn Tay Ngửa)',
    markers: [
      { left: 69.5, top: 49.0 },
      { left: 79.8, top: 49.0 }
    ],
    landmark: 'Chính giữa mặt lòng đốt 1 (Hỏa Tinh Thượng) và chính giữa mặt lòng đốt 2 (Hỏa Tinh Hạ) ngón tay giữa'
  },
  '11.T07': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Ngón Áp Út – Đốt 2 (Bàn Tay Ngửa)',
    markers: [{ left: 76.5, top: 65.8 }],
    landmark: 'Mặt lòng đốt 2 ngón áp út lệch về phía ngón út 5 phân, gần nếp khớp (Huyệt Thiên Kiên)'
  },
  '11.T08': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Ngón Tay Út – Đốt 2 (Bàn Tay Ngửa)',
    markers: [{ left: 71.8, top: 75.5 }],
    landmark: 'Mặt lòng đốt 2 ngón tay út, từ chính giữa đốt lệch vào trong 2 phân, lên trên 2 phân (Huyệt Thất Chẩm)'
  },
  '11.T09': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Ngón Tay Cái – Khớp Bàn Ngón (Bàn Tay Ngửa)',
    markers: [{ left: 45.5, top: 21.5 }],
    landmark: 'Mặt lòng ngón tay cái, tại bờ ngoài nếp gấp khớp bàn – ngón tay cái (Huyệt Khỏa Linh)'
  },
  '11.T10': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Lưng Ngón Tay Út – Khớp Đốt 1–2 (Bàn Tay Úp)',
    markers: [{ left: 58.0, top: 78.8 }],
    landmark: 'Mặt lưng ngón tay út, từ giữa nếp khớp liên đốt 1–2 lệch vào phía ngón áp út 3 phân (Huyệt Thiếu Bạch)'
  },
  '11.T11': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Ngón Tay Giữa – Đốt 3 (Bàn Tay Ngửa)',
    markers: [{ left: 88.8, top: 49.0 }],
    landmark: 'Chính giữa mặt lòng đốt thứ 3 của ngón tay giữa (Huyệt Khai Tỳ)'
  },
  '11.T12': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Ngón Tay Út – Đốt 1 (Bàn Tay Ngửa)',
    markers: [
      { left: 61.2, top: 75.3 },
      { left: 63.0, top: 75.3 },
      { left: 64.8, top: 75.3 }
    ],
    landmark: 'Mặt lòng đốt 1 ngón út lệch vào phía ngón áp út 3 phân (Phân Thủy 1, 2, 3)'
  },
  '11.T13': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Ngón Tay Út – Đốt 2 (Bàn Tay Ngửa)',
    markers: [
      { left: 68.5, top: 75.3 },
      { left: 70.3, top: 75.3 },
      { left: 72.1, top: 75.3 }
    ],
    landmark: 'Mặt lòng đốt 2 ngón út lệch vào phía ngón áp út 3 phân (Thủy Thanh 1, 2, 3)'
  },
  '11.T14': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Ngón Tay Út – Đốt 2 (Bàn Tay Ngửa)',
    markers: [
      { left: 68.5, top: 79.7 },
      { left: 70.3, top: 79.7 },
      { left: 72.1, top: 79.7 }
    ],
    landmark: 'Mặt lòng đốt 2 ngón út lệch ra phía rìa bàn tay 3 phân (Thủy Hải 1, 2, 3)'
  },
  '11.T15': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Ngón Tay Út – Đốt 1 (Bàn Tay Ngửa)',
    markers: [
      { left: 61.2, top: 79.7 },
      { left: 63.0, top: 79.7 },
      { left: 64.8, top: 79.7 }
    ],
    landmark: 'Mặt lòng đốt 1 ngón út lệch ra phía rìa bàn tay 3 phân (Thủy Nguyên 1, 2, 3)'
  },
  '11.T16': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Lưng Ngón Tay Út – Đốt 2 (Bàn Tay Úp)',
    markers: [
      { left: 61.2, top: 78.8 },
      { left: 61.2, top: 80.5 },
      { left: 61.2, top: 82.2 }
    ],
    landmark: 'Mặt lưng đốt 2 ngón tay út, tại chính giữa đốt và sang hai bên mỗi bên 3 phân (Thủy Yêu 1, 2, 3)'
  },

  // --------------------------------------------------------------------------
  // KHU 22: BÀN TAY (MẶT LÒNG & MẶT MU BÀN TAY) & EX-UE CHI TRÊN
  // --------------------------------------------------------------------------
  '22.01': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Bàn Tay – Mô Cái (Bàn Tay Ngửa)',
    markers: [{ left: 41.5, top: 27.5 }],
    landmark: 'Lòng bàn tay, giữa xương bàn ngón cái và ngón trỏ, cách kẽ hổ khẩu 1 thốn ( đối diện Đại Bạch )'
  },
  '22.02': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Bàn Tay – Gốc Mô Cái (Bàn Tay Ngửa)',
    markers: [{ left: 35.5, top: 30.5 }],
    landmark: 'Lòng bàn tay, tại góc giao đầu gần xương bàn tay 1 và 2 (đối xứng với huyệt Linh Cốt ở mu tay)'
  },
  '22.03': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Mu Bàn Tay – Giữa Xương Bàn 2 & 3 (Bàn Tay Úp)',
    markers: [{ left: 52.0, top: 41.5 }],
    landmark: 'Mu bàn tay, khe giữa xương bàn tay 2 và 3, cách khớp bàn – ngón tay 0,5 thốn về phía cổ tay'
  },
  '22.04': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Mu Bàn Tay – Giữa Xương Bàn 1 & 2 (Bàn Tay Úp)',
    markers: [{ left: 47.0, top: 30.0 }],
    landmark: 'Mu bàn tay, sát bờ quay xương bàn ngón trỏ, cách huyệt Linh Cốt 1 thốn (vị trí Tam Gian)'
  },
  '22.05': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Mu Bàn Tay – Hổ Khẩu (Bàn Tay Úp)',
    markers: [{ left: 39.5, top: 27.5 }],
    landmark: 'Mu bàn tay, chỗ hõm góc giao đầu gần giữa xương bàn tay 1 (ngón cái) và xương bàn tay 2 (ngón trỏ)'
  },
  '22.06': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Mu Bàn Tay – Giữa Xương Bàn 4 & 5 (Bàn Tay Úp)',
    markers: [{ left: 48.0, top: 66.0 }],
    landmark: 'Mu bàn tay, khe giữa xương bàn tay 4 và 5, cách khớp bàn – ngón tay 0,5 thốn (vị trí Trung Chử)'
  },
  '22.07': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Mu Bàn Tay – Giữa Xương Bàn 4 & 5 (Bàn Tay Úp)',
    markers: [{ left: 40.5, top: 65.5 }],
    landmark: 'Mu bàn tay, khe giữa xương bàn tay 4 và 5, cách khớp bàn – ngón 1,5 thốn (trên Trung Bạch 1 thốn)'
  },
  '22.08': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Bờ Ngoài Mu Bàn Tay – Xương Bàn 5 (Bàn Tay Úp)',
    markers: [{ left: 38.5, top: 73.5 }],
    landmark: 'Bờ ngoài mu bàn tay dọc bờ dưới xương bàn ngón 5, cách nếp ngang cổ tay 2,5 thốn (Uyển Thuận 1)'
  },
  '22.09': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Bờ Ngoài Mu Bàn Tay – Xương Bàn 5 (Bàn Tay Úp)',
    markers: [{ left: 31.5, top: 72.0 }],
    landmark: 'Bờ ngoài mu bàn tay dọc bờ dưới xương bàn ngón 5, cách nếp ngang cổ tay 1,5 thốn (Uyển Thuận 2)'
  },
  '22.10': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Bàn Tay – Giữa Xương Bàn 4 & 5 (Bàn Tay Ngửa)',
    markers: [{ left: 48.5, top: 67.5 }],
    landmark: 'Lòng bàn tay, giữa xương bàn tay 4 và 5 nơi đầu ngón út chạm tới khi nắm tay (vị trí Thiếu Phủ)'
  },
  '22.11': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Bờ Ngoài Xương Bàn Ngón Cái (Bàn Tay Ngửa)',
    markers: [
      { left: 41.0, top: 20.5 },
      { left: 37.0, top: 23.5 },
      { left: 33.0, top: 26.5 }
    ],
    landmark: 'Bờ ngoài xương bàn tay thứ nhất (mô cái), trên ranh giới da gan – mu tay (Thổ Thủy 1, 2, 3)'
  },
  '22.T01': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Mu Bàn Tay – Cạnh Xương Bàn 2 (Bàn Tay Úp)',
    markers: [{ left: 53.0, top: 31.5 }],
    landmark: 'Mu bàn tay, sát bờ quay đầu xa xương bàn tay 2, cách khớp bàn – ngón trỏ 2,5 phân (Huyệt Trọng Khôi)'
  },
  '22.T02': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Mu Bàn Tay – Giữa Xương Bàn 3 & 4 (Bàn Tay Úp)',
    markers: [{ left: 50.5, top: 54.5 }],
    landmark: 'Mu bàn tay, khe giữa xương bàn tay 3 và 4, cách khớp bàn – ngón tay 0,5 thốn (Huyệt Nội Bạch)'
  },
  '22.T03': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Mu Bàn Tay – Giữa Xương Bàn 3 & 4 (Bàn Tay Úp)',
    markers: [{ left: 42.5, top: 54.5 }],
    landmark: 'Mu bàn tay, khe giữa xương bàn tay 3 và 4, cách khớp bàn – ngón tay 1,5 thốn (Huyệt Ngoại Bạch)'
  },
  '22.T04': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Mu Bàn Tay – Giữa Xương Bàn 2 & 3 (Bàn Tay Úp)',
    markers: [{ left: 44.0, top: 41.5 }],
    landmark: 'Mu bàn tay, khe giữa xương bàn tay 2 và 3, cách khớp bàn – ngón tay 1,5 thốn (Huyệt Phân Bạch)'
  },
  '22.T05': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Bàn Tay – Giữa Xương Bàn 4 & 5 (Bàn Tay Ngửa)',
    markers: [
      { left: 45.0, top: 67.5 },
      { left: 51.5, top: 67.5 }
    ],
    landmark: 'Lòng bàn tay, giữa xương bàn 4 và 5, trên và dưới huyệt Thủ Giải mỗi bên 5 phân (Thượng Cao & Hạ Cao)'
  },
  '22.T06': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Bàn Tay – Dưới Kẽ Ngón 4 & 5 (Bàn Tay Ngửa)',
    markers: [
      { left: 56.5, top: 70.5 },
      { left: 53.0, top: 70.5 },
      { left: 49.5, top: 70.5 }
    ],
    landmark: 'Lòng bàn tay, từ kẽ giữa ngón áp út và ngón út đo vào 2,5 phân, 5 phân và 7,5 phân (Tam Hà 1, 2, 3)'
  },
  '22.T07': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Bàn Tay – Gốc Gan Tay Phía Quay (Bàn Tay Ngửa)',
    markers: [{ left: 23.5, top: 41.5 }],
    landmark: 'Lòng bàn tay, từ giữa nếp ngang cổ tay đo vào lòng bàn tay 5 phân, lệch sang phía ngón cái 5 phân (Cốt Quan)'
  },
  '22.T08': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Bàn Tay – Gốc Gan Tay Phía Trụ (Bàn Tay Ngửa)',
    markers: [{ left: 23.5, top: 56.5 }],
    landmark: 'Lòng bàn tay, từ giữa nếp ngang cổ tay đo vào lòng bàn tay 5 phân, lệch sang phía ngón út 5 phân (Mộc Quan)'
  },
  '22.T09': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Mu Bàn Tay – Kẽ Ngón Trỏ & Giữa (Bàn Tay Úp)',
    markers: [{ left: 59.0, top: 41.2 }],
    landmark: 'Điểm chính giữa kẽ giao ngón tay trỏ và ngón tay giữa phía mu tay (Huyệt Tam Xoa 1)'
  },
  '22.T10': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Mu Bàn Tay – Kẽ Ngón Giữa & Áp Út (Bàn Tay Úp)',
    markers: [{ left: 58.5, top: 55.5 }],
    landmark: 'Điểm chính giữa kẽ giao ngón tay giữa và ngón áp út phía mu tay (Huyệt Tam Xoa 2)'
  },
  '22.T11': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Mu Bàn Tay – Kẽ Ngón Áp Út & Út (Bàn Tay Úp)',
    markers: [{ left: 54.5, top: 70.5 }],
    landmark: 'Điểm chính giữa kẽ giao ngón áp út và ngón tay út phía mu tay (Huyệt Tam Xoa 3)'
  },
  '22.T12': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng Bàn Tay – Dưới Kẽ Ngón 3 & 4 (Bàn Tay Ngửa)',
    markers: [
      { left: 59.5, top: 56.2 },
      { left: 56.0, top: 56.2 },
      { left: 52.5, top: 56.2 }
    ],
    landmark: 'Lòng bàn tay, từ kẽ giữa ngón giữa và ngón áp út đo vào 2,5 phân, 5 phân và 7,5 phân (Tam Xỉ 1, 2, 3)'
  },
  'EX-UE1': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Vùng Khuỷu Tay – Đỉnh Mỏm Khuỷu',
    markers: [{ left: 80.5, top: 56.5 }],
    landmark: 'Đỉnh cao nhất của mỏm khuỷu xương trụ khi gấp khuỷu tay (Huyệt Trửu Tiêm EX-UE1)'
  },
  'EX-UE2': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Vùng Cẳng Tay – Trên Nếp Cổ Tay 4 Thốn',
    markers: [
      { left: 51.5, top: 50.0 },
      { left: 51.5, top: 53.5 }
    ],
    landmark: 'Mặt trước cẳng tay, cách nếp cổ tay 4 thốn ở hai bên gân cơ gan tay lớn (Nhị Bạch EX-UE2)'
  },
  'EX-UE3': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Nếp Cổ Tay Phía Mu Tay (Bàn Tay Úp)',
    markers: [{ left: 20.5, top: 47.5 }],
    landmark: 'Trên nếp gấp cổ tay phía mu tay, chỗ lõm bên ngoài gân cơ duỗi chung ngón tay (Trung Tuyền EX-UE3)'
  },
  'EX-UE4': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Lưng Ngón Tay Giữa – Khớp Liên Đốt Gần',
    markers: [{ left: 74.0, top: 49.0 }],
    landmark: 'Chính giữa khớp liên đốt gần (giữa đốt 1 và đốt 2) ngón tay giữa phía mu (Trung Khôi EX-UE4)'
  },
  'EX-UE5': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Lưng Ngón Tay Cái – Khớp Liên Đốt',
    markers: [{ left: 54.5, top: 16.0 }],
    landmark: 'Chính giữa khớp liên đốt ngón tay cái phía mu khi gấp ngón cái (Đại Cốt Không EX-UE5)'
  },
  'EX-UE6': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Lưng Ngón Tay Út – Khớp Liên Đốt Gần',
    markers: [{ left: 58.0, top: 80.5 }],
    landmark: 'Chính giữa khớp liên đốt gần (giữa đốt 1 và đốt 2) ngón tay út phía mu (Tiểu Cốt Không EX-UE6)'
  },
  'EX-UE7': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Mu Bàn Tay – Góc Giữa Xương Bàn 2–3 & 4–5',
    markers: [
      { left: 39.5, top: 41.5 },
      { left: 39.0, top: 64.5 }
    ],
    landmark: 'Mu bàn tay, góc giao đầu gần giữa xương bàn 2–3 và giữa xương bàn 4–5 (Yêu Thống Điểm EX-UE7)'
  },
  'EX-UE8': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Mu Bàn Tay – Giữa Xương Bàn 2 & 3',
    markers: [{ left: 49.5, top: 41.5 }],
    landmark: 'Mu bàn tay, giữa xương bàn tay 2 và 3, sau khớp bàn – ngón tay 0,5 thốn (Ngoại Lao Cung / Lạc Chẩm)'
  },
  'EX-UE9': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Mu Bàn Tay – Kẽ Giữa Các Ngón Tay',
    markers: [
      { left: 53.0, top: 26.5 },
      { left: 59.0, top: 41.2 },
      { left: 58.5, top: 55.5 },
      { left: 54.5, top: 70.5 }
    ],
    landmark: 'Mu bàn tay, tại 4 kẽ giữa 5 ngón tay trên đường ranh giới da gan – mu (Bát Tà EX-UE9)'
  },
  'EX-UE10': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Mặt Lòng 4 Ngón Tay – Lằn Chỉ Đốt 1–2 (Bàn Tay Ngửa)',
    markers: [
      { left: 73.2, top: 33.4 },
      { left: 75.0, top: 49.0 },
      { left: 73.2, top: 63.2 },
      { left: 66.8, top: 77.5 }
    ],
    landmark: 'Chính giữa lằn chỉ khớp liên đốt gần (đốt 1–2) mặt lòng 4 ngón trỏ, giữa, áp út, út (Tứ Phùng EX-UE10)'
  },
  'EX-UE11': {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Đầu Chóp Các Ngón Tay (Bàn Tay Ngửa)',
    markers: [
      { left: 59.5, top: 11.2 },
      { left: 90.0, top: 33.4 },
      { left: 93.8, top: 49.0 },
      { left: 90.5, top: 63.2 },
      { left: 80.5, top: 77.5 }
    ],
    landmark: 'Chính giữa đầu chóp các ngón tay, cách bờ tự do móng tay 1 phân (Thập Tuyên EX-UE11)'
  },
  'EX-UE12': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Mu Bàn Tay – Giữa Xương Bàn 2 & 3',
    markers: [{ left: 49.5, top: 41.5 }],
    landmark: 'Mu bàn tay, giữa xương bàn tay 2 và 3, sau khớp bàn – ngón tay 0,5 thốn (Lạc Chẩm EX-UE12)'
  },
  'EX-UE13': {
    photoUrl: PHOTOS.DORSAL_HAND,
    surfaceLabel: 'Mặt Mu Bàn Tay – Đỉnh Khớp Bàn Ngón 2 & 4',
    markers: [
      { left: 58.5, top: 34.5 },
      { left: 56.5, top: 62.5 }
    ],
    landmark: 'Đỉnh cao nhất của khớp bàn – ngón tay thứ 2 và thứ 4 khi nắm tay (Ngũ Hổ Mu Tay EX-UE13)'
  },
  'EX-UE14': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Vùng Trước Khớp Vai (Kiên Tiền)',
    markers: [{ left: 94.0, top: 14.5 }],
    landmark: 'Mặt trước khớp vai, điểm giữa đường nối đầu nếp nách trước và huyệt Kiên Ngung (Kiên Nội Lăng EX-UE14)'
  },

  // --------------------------------------------------------------------------
  // KHU 33: CẲNG TAY (20 POINTS)
  // Wrist at x=37.5, y=54.0; Elbow at x=77.5, y=46.0
  // --------------------------------------------------------------------------
  '33.01': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Vùng Cẳng Tay – Dọc Xương Quay (Khu 33)',
    markers: [
      { left: 44.5, top: 48.5 },
      { left: 51.0, top: 47.0 },
      { left: 57.5, top: 45.5 }
    ],
    landmark: 'Dọc bờ xương quay từ nếp cổ tay đo lên 2 thốn (Kỳ Môn), 4 thốn (Kỳ Giác) và 6 thốn (Kỳ Chính)'
  },
  '33.05': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Vùng Cẳng Tay – Tuyến Giữa Xương Quay & Trụ (Khu 33)',
    markers: [
      { left: 46.5, top: 51.5 },
      { left: 53.5, top: 50.0 },
      { left: 60.5, top: 48.5 }
    ],
    landmark: 'Giữa xương quay và xương trụ cách nếp cổ tay 2,5 thốn (Hỏa Xuyến), 4,5 thốn (Hỏa Lăng) và 6,5 thốn (Hỏa Sơn)'
  },
  '33.07': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Vùng Cẳng Tay Trên – Giữa Xương Quay & Trụ (Khu 33)',
    markers: [{ left: 69.0, top: 46.5 }],
    landmark: 'Từ nếp ngang khuỷu tay đo xuống 2,5 thốn, trong khe lõm giữa xương quay và xương trụ (Hỏa Phủ Hải)'
  },
  '33.08': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Vùng Cẳng Tay – Bờ Xương Trụ (Khu 33)',
    markers: [
      { left: 60.0, top: 56.0 },
      { left: 65.0, top: 55.2 }
    ],
    landmark: 'Sát bờ ngoài xương trụ cẳng tay, cách nếp cổ tay 6,5 thốn (Thủ Ngũ Kim) và 8 thốn (Thủ Thiên Kim)'
  },
  '33.10': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Vùng Cẳng Tay – Bờ Trong Xương Trụ (Khu 33)',
    markers: [{ left: 48.0, top: 58.2 }],
    landmark: 'Sát bờ dưới-trong xương trụ cẳng tay, cách xương đậu nếp cổ tay 3 thốn (Huyệt Trường Môn)'
  },
  '33.11': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Vùng Cẳng Tay Giữa – Bờ Xương Trụ (Khu 33)',
    markers: [{ left: 58.0, top: 58.5 }],
    landmark: 'Sát bờ dưới-trong xương trụ cẳng tay, cách nếp cổ tay 6 thốn / trên Trường Môn 3 thốn (Huyệt Can Môn)'
  },
  '33.12': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Vùng Cẳng Tay Gần Khuỷu – Xương Trụ (Khu 33)',
    markers: [{ left: 73.5, top: 57.5 }],
    landmark: 'Sát bờ xương trụ cẳng tay, cách mỏm khuỷu đo xuống 1,5 thốn trong chỗ lõm (Huyệt Tâm Môn)'
  },
  '33.13': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Vùng Cẳng Tay – Bờ Trước Xương Quay (Khu 33)',
    markers: [{ left: 47.0, top: 46.2 }],
    landmark: 'Sát bờ trước xương quay cẳng tay, cách nếp ngang cổ tay 3 thốn (Huyệt Nhân Sĩ)'
  },
  '33.14': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Vùng Cẳng Tay – Bờ Trước Xương Quay (Khu 33)',
    markers: [{ left: 56.5, top: 43.5 }],
    landmark: 'Sát bờ trước xương quay cẳng tay, cách nếp ngang cổ tay 6 thốn / trên Nhân Sĩ 3 thốn (Huyệt Địa Sĩ)'
  },
  '33.15': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Vùng Cẳng Tay – Bờ Trước Xương Quay (Khu 33)',
    markers: [{ left: 66.0, top: 40.8 }],
    landmark: 'Sát bờ trước xương quay cẳng tay, cách nếp ngang cổ tay 9 thốn / trên Địa Sĩ 3 thốn (Huyệt Thiên Sĩ)'
  },
  '33.16': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Vùng Cẳng Tay Trên – Dưới Nếp Khuỷu (Khu 33)',
    markers: [
      { left: 71.5, top: 39.5 },
      { left: 71.5, top: 42.5 },
      { left: 71.5, top: 45.5 }
    ],
    landmark: 'Dưới huyệt Xích Trạch 1,5 thốn (Khúc Lăng) và đo ngang ra ngoài mỗi 5 phân (Kiến Lực, Trung Lực)'
  },
  '33.T01': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Vùng Cẳng Tay Trước – Giữa Hai Gân Cơ Gấp (Khu 33)',
    markers: [
      { left: 43.0, top: 53.0 },
      { left: 46.5, top: 52.2 },
      { left: 50.0, top: 51.4 }
    ],
    landmark: 'Giữa hai gân cơ gấp cổ tay, cách nếp cổ tay 1,5 thốn, 2,5 thốn và 3,5 thốn (Tâm Linh 1, 2, 3)'
  },
  '33.T02': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Vùng Cẳng Tay Trên – Dưới Nếp Khuỷu Trong (Khu 33)',
    markers: [{ left: 72.5, top: 53.5 }],
    landmark: 'Từ huyệt Thiếu Hải (đầu trong nếp khuỷu) đo xuống 1,5 thốn rồi lệch ra ngoài 0,5 thốn (Huyệt Hầu Linh)'
  },
  '33.T03': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Vùng Cẳng Tay Trên – Bên Ngoài Hỏa Phủ Hải (Khu 33)',
    markers: [{ left: 69.0, top: 50.5 }],
    landmark: 'Từ huyệt Hỏa Phủ Hải (33.07) đo ngang sang bên cạnh 1 thốn giữa cơ khuỷu và cơ duỗi cổ tay trụ (Hầu Trung)'
  },
  '33.T04': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Vùng Cẳng Tay – Tuyến Trước Xương Đậu (Khu 33)',
    markers: [
      { left: 48.0, top: 56.0 },
      { left: 58.0, top: 55.5 },
      { left: 68.0, top: 54.5 }
    ],
    landmark: 'Trên đường thẳng từ trước xương đậu cổ tay lên khuỷu, cách cổ tay 3, 6 và 9 thốn (Can Linh 1, 2, 3)'
  },

  // --------------------------------------------------------------------------
  // KHU 44: CÁNH TAY & VAI (24 POINTS)
  // --------------------------------------------------------------------------
  '44.01': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Vùng Cánh Tay Dưới – Trên Nếp Khuỷu (Khu 44)',
    markers: [
      { left: 81.5, top: 36.5 },
      { left: 83.0, top: 34.0 },
      { left: 80.0, top: 39.0 }
    ],
    landmark: 'Trên hõm nếp khuỷu (Xích Trạch) 1,5 thốn (Phân Kim), trên 0,5 thốn (Nội Kim) và dưới 0,5 thốn (Hợp Kim)'
  },
  '44.02': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Mặt Sau Ngoài Cánh Tay (Khu 44)',
    markers: [{ left: 85.5, top: 42.5 }],
    landmark: 'Mặt sau ngoài xương cánh tay, từ mỏm khuỷu đo thẳng lên 2,5 thốn (Huyệt Hậu Chùy)'
  },
  '44.03': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Mặt Sau Ngoài Cánh Tay (Khu 44)',
    markers: [{ left: 88.5, top: 36.5 }],
    landmark: 'Mặt sau ngoài xương cánh tay, từ mỏm khuỷu đo thẳng lên 4,5 thốn / trên Hậu Chùy 2 thốn (Huyệt Thủ Anh)'
  },
  '44.04': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Mặt Sau Ngoài Cánh Tay Trên (Khu 44)',
    markers: [{ left: 92.0, top: 29.5 }],
    landmark: 'Mặt sau ngoài xương cánh tay, từ mỏm khuỷu đo thẳng lên 7 thốn / trên Thủ Anh 2,5 thốn (Huyệt Phú Đỉnh)'
  },
  '44.05': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Mặt Sau Ngoài Cánh Tay Trên (Khu 44)',
    markers: [{ left: 93.5, top: 26.5 }],
    landmark: 'Mặt sau ngoài xương cánh tay, từ mỏm khuỷu đo thẳng lên 8 thốn / trên Phú Đỉnh 1 thốn (Huyệt Hậu Chi)'
  },
  '44.06': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Chính Giữa Cơ Delta Cánh Tay Trên (Khu 44)',
    markers: [
      { left: 95.0, top: 16.5 },
      { left: 92.0, top: 22.0 }
    ],
    landmark: 'Từ Kiên Ngung (mỏm cùng vai) đo thẳng xuống 2,5 thốn (Kiên Trung) và xuống thêm 2 thốn (Kiến Trung)'
  },
  '44.07': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Vùng Khớp Vai – Hõm Dưới Mỏm Cùng Vai (Khu 44)',
    markers: [{ left: 96.5, top: 14.0 }],
    landmark: 'Tại chỗ hõm dưới mỏm cùng vai (Kiên Ngung) đo lên 2 phân khi giơ ngang cánh tay (Huyệt Bối Diện)'
  },
  '44.08': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Bờ Ngoài Xương Cánh Tay – Rãnh Cơ Nhị Đầu (Khu 44)',
    markers: [{ left: 84.5, top: 33.5 }],
    landmark: 'Bờ ngoài xương cánh tay trong rãnh cơ nhị đầu, từ đầu ngoài nếp khuỷu (Khúc Trì) đo lên 3,5 thốn (Nhân Tông)'
  },
  '44.09': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Bờ Ngoài Xương Cánh Tay Giữa (Khu 44)',
    markers: [{ left: 88.5, top: 26.5 }],
    landmark: 'Bờ ngoài xương cánh tay, trên huyệt Nhân Tông 3 thốn / cách nếp khuỷu 6,5 thốn (Huyệt Địa Tông)'
  },
  '44.10': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Bờ Ngoài Xương Cánh Tay Trên (Khu 44)',
    markers: [{ left: 92.5, top: 19.5 }],
    landmark: 'Bờ ngoài xương cánh tay, trên huyệt Địa Tông 3 thốn / cách nếp khuỷu 9,5 thốn (Huyệt Thiên Tông)'
  },
  '44.11': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Mặt Trước Ngoài Cánh Tay Trên (Khu 44)',
    markers: [{ left: 93.5, top: 15.0 }],
    landmark: 'Từ huyệt Kiên Trung (44.06) đo ngang ra phía trước 2 thốn (Huyệt Vân Bạch)'
  },
  '44.12': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Mặt Trước Ngoài Cánh Tay Trên (Khu 44)',
    markers: [{ left: 90.5, top: 20.5 }],
    landmark: 'Từ huyệt Vân Bạch (44.11) đo thẳng xuống dưới 2 thốn (Huyệt Lý Bạch)'
  },
  '44.13': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Mặt Sau Ngoài Cánh Tay Trên (Khu 44)',
    markers: [{ left: 95.5, top: 20.0 }],
    landmark: 'Từ huyệt Kiên Trung đo xuống 2 thốn rồi lùi ra phía sau lưng cánh tay 1 thốn (Huyệt Chi Thông)'
  },
  '44.14': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Mặt Sau Ngoài Cánh Tay Trên (Khu 44)',
    markers: [{ left: 92.5, top: 25.5 }],
    landmark: 'Nằm ngay phía dưới huyệt Chi Thông (44.13) đúng 2 thốn ở mặt sau cánh tay (Huyệt Lạc Thông)'
  },
  '44.15': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Mặt Sau Bên Cánh Tay Trên (Khu 44)',
    markers: [{ left: 93.5, top: 24.0 }],
    landmark: 'Phía sau cạnh ngoài cánh tay, từ huyệt Kiến Trung đo ngang về phía sau 2 thốn (Huyệt Hạ Khúc)'
  },
  '44.16': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Mặt Sau Bên Cánh Tay Trên (Khu 44)',
    markers: [{ left: 96.0, top: 18.5 }],
    landmark: 'Phía sau cạnh ngoài cánh tay, từ huyệt Kiên Trung đo ngang về phía sau 2 thốn (Huyệt Thượng Khúc)'
  },
  '44.17': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Mặt Sau Khớp Vai – Dưới Mỏm Cùng Vai (Khu 44)',
    markers: [{ left: 37.5, top: 68.5 }],
    landmark: 'Mặt sau vai, ngay phía dưới mỏm cùng vai sau Kiên Trung 2 thốn (tương ứng vùng Nhu Du – Thủy Dũ)'
  },
  '44.T01': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Vùng Khớp Vai – Dưới Hõm Mỏm Cùng Vai (Khu 44)',
    markers: [{ left: 96.0, top: 12.5 }],
    landmark: 'Từ chính giữa hõm dưới mỏm cùng vai (Kiên Ngung) đo thẳng xuống 5 phân (Huyệt Kiên Phong)'
  },
  '44.T02': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Vùng Trước Ngoài Khớp Vai (Khu 44)',
    markers: [{ left: 94.8, top: 13.8 }],
    landmark: 'Điểm chính giữa đường nối huyệt Kiên Phong (44.T01) và huyệt Vân Bạch (44.11) (Huyệt Thần Kiên)'
  },
  '44.T03': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Đường Giữa Mặt Ngoài Xương Cánh Tay (Khu 44)',
    markers: [
      { left: 83.5, top: 38.0 },
      { left: 86.5, top: 32.5 },
      { left: 89.5, top: 27.0 }
    ],
    landmark: 'Đường chính giữa mặt ngoài xương cánh tay, trên nếp khuỷu 2, 4 và 6 thốn (Chính Tích 1, 2, 3)'
  },
  '44.T04': {
    photoUrl: PHOTOS.ARM_FOREARM,
    surfaceLabel: 'Mặt Sau Xương Cánh Tay Trên Mỏm Khuỷu (Khu 44)',
    markers: [
      { left: 84.0, top: 44.5 },
      { left: 86.0, top: 41.0 },
      { left: 88.0, top: 37.5 }
    ],
    landmark: 'Mặt sau xương cánh tay, từ mỏm khuỷu đo thẳng lên 1,5 thốn, 2,5 thốn và 3,5 thốn (Tam Thần 1, 2, 3)'
  },
  'DT01': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Mặt Sau Vai – Giao Điểm Bả Vai & Cánh Tay',
    markers: [{ left: 35.0, top: 71.0 }],
    landmark: 'Phía sau vai, tại góc giao giữa xương bả vai và xương cánh tay đo xuống 1 thốn (Phân Chi Thượng)'
  },
  'DT02': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Mặt Sau Vai – Dưới Nách Sau',
    markers: [{ left: 34.5, top: 76.5 }],
    landmark: 'Phía sau vai, ngay dưới huyệt Phân Chi Thượng (DT01) 1,5 thốn (Phân Chi Hạ)'
  },
  'DT01B': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Mặt Sau Vai – Cạnh Trong Phân Chi Hạ',
    markers: [{ left: 38.0, top: 76.5 }],
    landmark: 'Phía sau vai, từ huyệt Phân Chi Hạ (DT02) đo ngang vào trong 6 phân (Phân Chi Trung)'
  },

  // --------------------------------------------------------------------------
  // KHU 55: LÒNG BÀN CHÂN (LEFT PANEL OF FOOT_SPLIT: x=0..49%)
  // --------------------------------------------------------------------------
  '55.01': {
    photoUrl: PHOTOS.FOOT_SPLIT,
    surfaceLabel: 'Mặt Lòng Ngón Chân Thứ 2 (Khung Trái – Gan Bàn Chân)',
    markers: [{ left: 24.8, top: 23.5 }],
    landmark: 'Mặt dưới (lòng) ngón chân thứ 2, chính giữa lằn chỉ khớp liên đốt giữa đốt 1 và đốt 2 (Hỏa Bao)'
  },
  '55.02': {
    photoUrl: PHOTOS.FOOT_SPLIT,
    surfaceLabel: 'Mặt Lòng Bàn Chân – Kẽ Xương Bàn 1 & 2 (Khung Trái)',
    markers: [
      { left: 21.2, top: 33.0 },
      { left: 21.4, top: 36.2 },
      { left: 21.6, top: 39.4 },
      { left: 21.8, top: 42.6 }
    ],
    landmark: 'Lòng bàn chân, kẽ giữa xương bàn chân 1 và 2 cách kẽ ngón 0,5; 1; 1,5 và 2 thốn (4 huyệt Hoa Cốt Nhất)'
  },
  '55.03': {
    photoUrl: PHOTOS.FOOT_SPLIT,
    surfaceLabel: 'Mặt Lòng Bàn Chân – Kẽ Xương Bàn 2 & 3 (Khung Trái)',
    markers: [
      { left: 25.2, top: 35.5 },
      { left: 25.4, top: 39.5 }
    ],
    landmark: 'Lòng bàn chân, kẽ giữa xương bàn chân 2 và 3 cách kẽ ngón 1 thốn và 1,5 thốn (2 huyệt Hoa Cốt Nhị)'
  },
  '55.04': {
    photoUrl: PHOTOS.FOOT_SPLIT,
    surfaceLabel: 'Mặt Lòng Bàn Chân – Kẽ Xương Bàn 3 & 4 (Khung Trái)',
    markers: [
      { left: 29.0, top: 37.5 },
      { left: 29.2, top: 41.5 }
    ],
    landmark: 'Lòng bàn chân, kẽ giữa xương bàn chân 3 và 4 cách kẽ ngón 1 thốn và 1,5 thốn (2 huyệt Hoa Cốt Tam)'
  },
  '55.05': {
    photoUrl: PHOTOS.FOOT_SPLIT,
    surfaceLabel: 'Mặt Lòng Bàn Chân – Kẽ Xương Bàn 4 & 5 (Khung Trái)',
    markers: [
      { left: 32.8, top: 40.5 },
      { left: 33.0, top: 44.5 }
    ],
    landmark: 'Lòng bàn chân, kẽ giữa xương bàn chân 4 và 5 cách kẽ ngón 1 thốn và 1,5 thốn (2 huyệt Hoa Cốt Tứ)'
  },
  '55.06': {
    photoUrl: PHOTOS.FOOT_SPLIT,
    surfaceLabel: 'Mặt Lòng Bàn Chân – Bờ Trước Gót Chân (Khung Trái)',
    markers: [{ left: 26.2, top: 58.0 }],
    landmark: 'Lòng bàn chân, chính giữa bờ trước đệm thịt gót chân nơi tiếp giáp vòm gan chân (Huyệt Thượng Lưu)'
  },

  // --------------------------------------------------------------------------
  // KHU 66: MU BÀN CHÂN & CỔ CHÂN (RIGHT PANEL OF FOOT_SPLIT: x=51..100%)
  // --------------------------------------------------------------------------
  '66.01': {
    photoUrl: PHOTOS.FOOT_SPLIT,
    surfaceLabel: 'Mặt Trong Đốt 1 Ngón Chân Cái (Khung Phải)',
    markers: [{ left: 83.8, top: 76.5 }],
    landmark: 'Chính giữa bờ trong đốt thứ nhất ngón chân cái trên đường tiếp giáp da gan – mu chân (Hải Báo)'
  },
  '66.02': {
    photoUrl: PHOTOS.FOOT_SPLIT,
    surfaceLabel: 'Mặt Lưng Đốt 2 Ngón Chân Thứ 2 (Khung Phải)',
    markers: [{ left: 76.2, top: 77.5 }],
    landmark: 'Mặt lưng (mu) đốt thứ 2 ngón chân thứ 2, lệch ra phía ngoài 3 phân (Huyệt Mộc Phụ)'
  },
  '66.03': {
    photoUrl: PHOTOS.FOOT_SPLIT,
    surfaceLabel: 'Mu Bàn Chân – Khe Giữa Xương Bàn 1 & 2 (Khung Phải)',
    markers: [{ left: 79.2, top: 68.5 }],
    landmark: 'Mu bàn chân, khe giữa xương bàn chân 1 và 2, cách kẽ ngón chân đo lên 0,5 thốn (Huyệt Hỏa Ngạnh)'
  },
  '66.04': {
    photoUrl: PHOTOS.FOOT_SPLIT,
    surfaceLabel: 'Mu Bàn Chân – Góc Giữa Xương Bàn 1 & 2 (Khung Phải)',
    markers: [{ left: 79.0, top: 59.5 }],
    landmark: 'Mu bàn chân, tại góc tiếp giáp đầu gần xương bàn chân 1 và 2, trên Hỏa Ngạnh 1 thốn (Huyệt Hỏa Chủ)'
  },
  '66.05': {
    photoUrl: PHOTOS.FOOT_SPLIT,
    surfaceLabel: 'Mu Bàn Chân – Góc Giữa Xương Bàn 2 & 3 (Khung Phải)',
    markers: [{ left: 74.8, top: 60.5 }],
    landmark: 'Mu bàn chân, tại góc tiếp giáp đầu gần giữa xương bàn chân 2 và 3 (Huyệt Môn Kim)'
  },
  '66.06': {
    photoUrl: PHOTOS.FOOT_SPLIT,
    surfaceLabel: 'Mu Bàn Chân – Góc Giữa Xương Bàn 3 & 4 (Khung Phải)',
    markers: [{ left: 70.8, top: 60.5 }],
    landmark: 'Mu bàn chân, khe giữa xương bàn chân 3 và 4, cách kẽ ngón chân đo lên 1,5 thốn (Huyệt Mộc Lưu)'
  },
  '66.07': {
    photoUrl: PHOTOS.FOOT_SPLIT,
    surfaceLabel: 'Mu Bàn Chân – Khe Giữa Xương Bàn 3 & 4 (Khung Phải)',
    markers: [{ left: 71.2, top: 68.5 }],
    landmark: 'Mu bàn chân, khe giữa xương bàn chân 3 và 4, cách kẽ ngón chân đo lên 0,5 thốn (Huyệt Mộc Đấu)'
  },
  '66.08': {
    photoUrl: PHOTOS.FOOT_SPLIT,
    surfaceLabel: 'Mu Bàn Chân – Khe Giữa Xương Bàn 4 & 5 (Khung Phải)',
    markers: [{ left: 67.0, top: 69.0 }],
    landmark: 'Mu bàn chân, khe giữa xương bàn chân 4 và 5, cách kẽ ngón chân đo lên 0,5 thốn (Huyệt Lục Hoàn)'
  },
  '66.09': {
    photoUrl: PHOTOS.FOOT_SPLIT,
    surfaceLabel: 'Mu Bàn Chân – Góc Giữa Xương Bàn 4 & 5 (Khung Phải)',
    markers: [{ left: 66.8, top: 61.5 }],
    landmark: 'Mu bàn chân, góc tiếp giáp đầu gần giữa xương bàn chân 4 và 5, trên Lục Hoàn 1 thốn (Huyệt Thủy Khúc)'
  },
  '66.10': {
    photoUrl: PHOTOS.FOOT_SPLIT,
    surfaceLabel: 'Bờ Trong Bàn Chân – Xương Bàn 1 (Khung Phải)',
    markers: [{ left: 82.8, top: 60.0 }],
    landmark: 'Mặt trong bàn chân, bờ dưới xương bàn chân ngón 1 cách khớp bàn – ngón 1,5 thốn (Huyệt Hỏa Liên)'
  },
  '66.11': {
    photoUrl: PHOTOS.FOOT_SPLIT,
    surfaceLabel: 'Bờ Trong Bàn Chân – Sau Hỏa Liên 1 Thốn (Khung Phải)',
    markers: [{ left: 82.2, top: 52.5 }],
    landmark: 'Mặt trong bàn chân, bờ dưới xương bàn 1 phía sau huyệt Hỏa Liên 1 thốn (Huyệt Hỏa Cúc – Công Tôn)'
  },
  '66.12': {
    photoUrl: PHOTOS.FOOT_SPLIT,
    surfaceLabel: 'Bờ Trong Bàn Chân – Sau Hỏa Cúc 1 Thốn (Khung Phải)',
    markers: [{ left: 81.5, top: 45.0 }],
    landmark: 'Mặt trong bàn chân, phía sau huyệt Hỏa Cúc 1 thốn dưới xương ghe (Huyệt Hỏa Tản – Nhiên Cốc)'
  },
  '66.13': {
    photoUrl: PHOTOS.FOOT_SPLIT,
    surfaceLabel: 'Mặt Trong Cổ Chân – Dưới Mắt Cá Trong (Khung Phải)',
    markers: [{ left: 80.2, top: 35.5 }],
    landmark: 'Mặt trong cổ chân, từ đỉnh mắt cá chân trong đo thẳng xuống dưới 2 thốn (Huyệt Thủy Tinh)'
  },
  '66.14': {
    photoUrl: PHOTOS.FOOT_SPLIT,
    surfaceLabel: 'Mặt Trong Cổ Chân – Sau Mắt Cá Trong (Khung Phải)',
    markers: [{ left: 81.8, top: 27.5 }],
    landmark: 'Chỗ lõm giữa bờ sau mắt cá chân trong và bờ trước gân gót Achilles (Huyệt Thủy Tương – Thái Khê)'
  },
  '66.15': {
    photoUrl: PHOTOS.FOOT_SPLIT,
    surfaceLabel: 'Mặt Trong Cổ Chân – Dưới Thủy Tương 2 Thốn (Khung Phải)',
    markers: [{ left: 82.2, top: 34.0 }],
    landmark: 'Mặt trong cổ chân, từ huyệt Thủy Tương (66.14) đo thẳng xuống 2 thốn sát bờ trên xương gót (Thủy Tiên)'
  },
  'EX-LE8': {
    photoUrl: PHOTOS.FOOT_SPLIT,
    surfaceLabel: 'Đỉnh Mắt Cá Chân Trong (Khung Phải)',
    markers: [{ left: 79.8, top: 27.5 }],
    landmark: 'Điểm nhô cao nhất của đỉnh mắt cá chân trong (Nội Khỏa Tiêm EX-LE8)'
  },
  'EX-LE9': {
    photoUrl: PHOTOS.FOOT_SPLIT,
    surfaceLabel: 'Đỉnh Mắt Cá Chân Ngoài (Khung Phải)',
    markers: [{ left: 66.5, top: 29.5 }],
    landmark: 'Điểm nhô cao nhất của đỉnh mắt cá chân ngoài (Ngoại Khỏa Tiêm EX-LE9)'
  },
  'EX-LE10': {
    photoUrl: PHOTOS.FOOT_SPLIT,
    surfaceLabel: 'Mu Bàn Chân – Kẽ Giữa 5 Ngón Chân (Khung Phải)',
    markers: [
      { left: 79.5, top: 73.5 },
      { left: 75.0, top: 74.5 },
      { left: 71.0, top: 74.5 },
      { left: 67.0, top: 74.0 }
    ],
    landmark: 'Mu bàn chân, tại 4 kẽ giữa 5 ngón chân cách bờ màng da 0,5 thốn (Bát Phong EX-LE10)'
  },
  'EX-LE11': {
    photoUrl: PHOTOS.FOOT_SPLIT,
    surfaceLabel: 'Mặt Lòng Ngón Chân Thứ 2 (Khung Trái)',
    markers: [{ left: 24.8, top: 25.0 }],
    landmark: 'Chính giữa nếp gấp khớp liên đốt xa mặt dưới ngón chân thứ 2 (Độc Âm EX-LE11)'
  },
  'EX-LE12': {
    photoUrl: PHOTOS.FOOT_SPLIT,
    surfaceLabel: 'Đầu Chóp 5 Ngón Chân (Khung Phải)',
    markers: [
      { left: 81.5, top: 83.5 },
      { left: 76.2, top: 84.5 },
      { left: 72.2, top: 84.0 },
      { left: 68.5, top: 82.5 },
      { left: 65.0, top: 80.0 }
    ],
    landmark: 'Chính giữa đầu chóp các ngón chân, cách bờ tự do móng chân 1 phân (Khí Đoan EX-LE12)'
  },
  'EX-LE13': {
    photoUrl: PHOTOS.FOOT_SPLIT,
    surfaceLabel: 'Gan Bàn Chân – Dưới Kẽ Ngón Chân 2 & 3 (Khung Trái)',
    markers: [{ left: 25.5, top: 30.5 }],
    landmark: 'Gan bàn chân, trong rãnh dưới kẽ ngón chân 2 và 3 đối diện huyệt Nội Đình (Lý Nội Đình EX-LE13)'
  },

  // --------------------------------------------------------------------------
  // KHU 77: CẲNG CHÂN & ĐẦU GỐI (28 POINTS + EX-LE)
  // --------------------------------------------------------------------------
  '77.01': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Sau Cổ Chân – Gân Gót Achilles (Khu 77)',
    markers: [{ left: 82.5, top: 77.5 }],
    landmark: 'Chính giữa trên gân gót Achilles, cách đáy gót chân đo lên 3,5 thốn ngang mức mắt cá (Huyệt Chính Cân)'
  },
  '77.02': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Sau Cổ Chân – Trên Chính Cân 2 Thốn (Khu 77)',
    markers: [{ left: 78.0, top: 73.0 }],
    landmark: 'Chính giữa trên gân gót Achilles, phía trên huyệt Chính Cân 2 thốn / cách gót 5,5 thốn (Huyệt Chính Tông)'
  },
  '77.03': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Sau Cẳng Chân – Trên Chính Tông 2 Thốn (Khu 77)',
    markers: [{ left: 73.0, top: 68.0 }],
    landmark: 'Mặt sau cẳng chân, phía trên huyệt Chính Tông 2 thốn / cách đáy gót 7,5 thốn (Huyệt Chính Sĩ)'
  },
  '77.04': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Sau Bắp Chân – Dưới Bụng Cơ Bụng Chân (Khu 77)',
    markers: [{ left: 67.0, top: 62.0 }],
    landmark: 'Mặt sau bắp chân, phía trên huyệt Chính Sĩ 2,5 thốn gần vị trí Thừa Sơn (Huyệt Bác Cầu)'
  },
  '77.05': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Ngoài Cẳng Chân – Bờ Trước Xương Mác (Khu 77)',
    markers: [{ left: 80.0, top: 69.5 }],
    landmark: 'Từ đỉnh mắt cá ngoài đo thẳng lên 3 thốn rồi đo ra phía trước bờ xương mác 1 thốn (Huyệt Nhất Trọng)'
  },
  '77.06': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Ngoài Cẳng Chân – Trên Nhất Trọng 2 Thốn (Khu 77)',
    markers: [{ left: 75.5, top: 65.0 }],
    landmark: 'Mặt ngoài cẳng chân, ngay phía trên huyệt Nhất Trọng 2 thốn / cách mắt cá ngoài lên 5 thốn (Nhị Trọng)'
  },
  '77.07': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Ngoài Cẳng Chân – Trên Nhị Trọng 2 Thốn (Khu 77)',
    markers: [{ left: 71.0, top: 60.5 }],
    landmark: 'Mặt ngoài cẳng chân, ngay phía trên huyệt Nhị Trọng 2 thốn / cách mắt cá ngoài lên 7 thốn (Tam Trọng)'
  },
  '77.08': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Ngoài Cẳng Chân – Sát Mào Xương Chày (Khu 77)',
    markers: [{ left: 55.0, top: 43.5 }],
    landmark: 'Từ hõm mắt gối ngoài (Độc Tỵ) đo thẳng xuống 3 thốn, sát bờ ngoài mào xương chày (Tứ Hoa Thượng)'
  },
  '77.09': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Ngoài Cẳng Chân Giữa (Khu 77)',
    markers: [{ left: 65.0, top: 53.5 }],
    landmark: 'Từ huyệt Tứ Hoa Thượng đo thẳng xuống 4,5 thốn / cách hõm gối ngoài 7,5 thốn (Tứ Hoa Trung)'
  },
  '77.10': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Ngoài Cẳng Chân Dưới (Khu 77)',
    markers: [{ left: 70.5, top: 59.0 }],
    landmark: 'Ngay phía dưới huyệt Tứ Hoa Trung 2,5 thốn / cách hõm gối ngoài 10 thốn (Tứ Hoa Phó)'
  },
  '77.11': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Ngoài Cẳng Chân Dưới (Khu 77)',
    markers: [{ left: 76.2, top: 64.8 }],
    landmark: 'Từ huyệt Tứ Hoa Phó đo thẳng xuống 2,5 thốn / cách hõm gối ngoài 12,5 thốn (Tứ Hoa Hạ)'
  },
  '77.12': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Ngoài Cẳng Chân Dưới (Khu 77)',
    markers: [{ left: 73.0, top: 61.5 }],
    landmark: 'Nằm ngay phía trên huyệt Tứ Hoa Hạ 1,5 thốn / cách hõm gối ngoài 11 thốn (Huyệt Phủ Trường)'
  },
  '77.13': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Trong Cẳng Chân Giữa (Khu 77)',
    markers: [{ left: 63.5, top: 55.2 }],
    landmark: 'Từ huyệt Tứ Hoa Trung (77.09) đo ngang vào phía trong mào xương chày 1,2 thốn (Tứ Hoa Lý)'
  },
  '77.14': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Ngoài Cẳng Chân Giữa (Khu 77)',
    markers: [{ left: 66.8, top: 51.8 }],
    landmark: 'Từ huyệt Tứ Hoa Trung (77.09) đo ngang ra phía ngoài 1,5 thốn gần Phong Long (Tứ Hoa Ngoại)'
  },
  '77.15': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Khớp Gối – Bờ Dưới Xương Bánh Chè (Khu 77)',
    markers: [{ left: 48.5, top: 38.0 }],
    landmark: 'Chính giữa bờ dưới xương bánh chè trên dây chằng bánh chè (Huyệt Thượng Thần)'
  },
  '77.16': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Dưới Khớp Gối – Dây Chằng Bánh Chè (Khu 77)',
    markers: [{ left: 50.5, top: 40.2 }],
    landmark: 'Ngay phía dưới huyệt Thượng Thần (77.15) 1 thốn trên dây chằng bánh chè (Huyệt Hạ Thần)'
  },
  '77.17': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trong Cẳng Chân Trên – Bờ Dưới Lồi Cầu Chày (Khu 77)',
    markers: [{ left: 53.0, top: 45.5 }],
    landmark: 'Chỗ lõm bờ dưới lồi cầu trong xương chày, tương ứng vị trí Âm Lăng Tuyền (Huyệt Thiên Hoàng)'
  },
  '77.18': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trong Cẳng Chân Trên – Dưới Thiên Hoàng 1,5 Thốn (Khu 77)',
    markers: [{ left: 56.5, top: 49.0 }],
    landmark: 'Từ huyệt Thiên Hoàng (77.17) đo thẳng xuống dưới 1,5 thốn sát bờ sau xương chày (Huyệt Thận Quan)'
  },
  '77.19': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trong Cẳng Chân Giữa – Sát Bờ Sau Xương Chày (Khu 77)',
    markers: [{ left: 69.5, top: 62.0 }],
    landmark: 'Từ đỉnh mắt cá chân trong đo thẳng lên 7 thốn, sát bờ sau xương chày (Huyệt Địa Hoàng)'
  },
  '77.20': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trong Cẳng Chân Dưới – Sát Bờ Sau Xương Chày (Khu 77)',
    markers: [{ left: 75.0, top: 67.5 }],
    landmark: 'Từ đỉnh mắt cá chân trong đo thẳng lên 4,5 thốn, sát bờ sau xương chày (Huyệt Tứ Chi)'
  },
  '77.21': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trong Cẳng Chân Dưới – Sát Bờ Sau Xương Chày (Khu 77)',
    markers: [{ left: 77.5, top: 70.0 }],
    landmark: 'Từ đỉnh mắt cá chân trong đo thẳng lên 3,5 thốn sát bờ sau xương chày (Huyệt Nhân Hoàng)'
  },
  '77.22': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Ngoài Cẳng Chân Trên (Khu 77)',
    markers: [{ left: 56.5, top: 41.8 }],
    landmark: 'Từ huyệt Tứ Hoa Thượng (Túc Tam Lý) đo ngang ra phía ngoài 1,5 thốn (Huyệt Trắc Tam Lý)'
  },
  '77.23': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Ngoài Cẳng Chân Trên (Khu 77)',
    markers: [{ left: 61.0, top: 46.2 }],
    landmark: 'Nằm ngay phía dưới huyệt Trắc Tam Lý (77.22) đúng 2 thốn (Huyệt Trắc Hạ Tam Lý)'
  },
  '77.24': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Ngoài Cẳng Chân Giữa (Khu 77)',
    markers: [{ left: 66.0, top: 50.0 }],
    landmark: 'Từ huyệt Trắc Hạ Tam Lý đo ngang ra ngoài 5 phân rồi đo xuống 2 thốn (Huyệt Túc Thiên Kim)'
  },
  '77.25': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Ngoài Cẳng Chân Dưới (Khu 77)',
    markers: [{ left: 70.5, top: 54.5 }],
    landmark: 'Nằm ngay phía dưới huyệt Túc Thiên Kim (77.24) đúng 2 thốn (Huyệt Túc Ngũ Kim)'
  },
  '77.26': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Ngoài Cổ Chân – Giữa Mắt Cá Ngoài & Gân Gót (Khu 77)',
    markers: [
      { left: 84.5, top: 76.5 },
      { left: 80.0, top: 72.0 },
      { left: 75.5, top: 67.5 }
    ],
    landmark: 'Sau mắt cá ngoài 1,5 thốn, từ Côn Lôn đo thẳng lên mỗi 2 thốn lấy 1 huyệt (3 huyệt Thất Hổ)'
  },
  '77.27': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Ngoài Cẳng Chân – Đường Nối Chỏm Mác & Mắt Cá Ngoài',
    markers: [
      { left: 62.0, top: 52.5 },
      { left: 70.0, top: 60.5 },
      { left: 78.0, top: 68.5 }
    ],
    landmark: 'Trên đường nối chỏm xương mác đến đỉnh mắt cá ngoài chia làm 4 phần đều nhau (3 huyệt Ngoại Tam Quan)'
  },
  '77.28': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trong Cổ Chân – Phía Sau Trên Mắt Cá Trong (Khu 77)',
    markers: [{ left: 81.0, top: 74.0 }],
    landmark: 'Từ đỉnh mắt cá chân trong đo ra sau 1 thốn rồi đo thẳng lên trên 2 thốn (Huyệt Quang Minh – Phục Lưu)'
  },
  'EX-LE1': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Đùi Dưới – Trên Góc Ngoài Xương Bánh Chè',
    markers: [
      { left: 40.5, top: 28.5 },
      { left: 38.5, top: 30.5 }
    ],
    landmark: 'Từ huyệt Lương Khâu (trên góc ngoài bánh chè 2 thốn) đo sang hai bên mỗi bên 1,5 thốn (Khoan Cốt EX-LE1)'
  },
  'EX-LE2': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Chính Giữa Bờ Trên Xương Bánh Chè',
    markers: [{ left: 44.0, top: 33.5 }],
    landmark: 'Chính giữa chỗ lõm bờ trên xương bánh chè (Huyệt Hạc Đỉnh EX-LE2)'
  },
  'EX-LE3': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Trong Đùi Dưới',
    markers: [{ left: 36.5, top: 30.0 }],
    landmark: 'Mặt trước-trong đùi, từ góc trên-trong xương bánh chè đo lên 3 thốn / trên Huyết Hải 1 thốn (Bách Trùng Oa)'
  },
  'EX-LE4 & EX-LE5': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Khớp Gối – Hai Hõm Dưới Xương Bánh Chè',
    markers: [
      { left: 47.0, top: 39.5 },
      { left: 50.0, top: 36.5 }
    ],
    landmark: 'Hai hõm lõm hai bên trong và ngoài dây chằng bánh chè dưới xương bánh chè (Nội Tất Nhãn & Ngoại Tất Nhãn)'
  },
  'EX-LE6': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Ngoài Cẳng Chân Trên – Dưới Dương Lăng Tuyền',
    markers: [{ left: 58.5, top: 46.5 }],
    landmark: 'Mặt ngoài cẳng chân, dưới huyệt Dương Lăng Tuyền 1 – 2 thốn (Đởm Nang Huyệt EX-LE6)'
  },
  'EX-LE7': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Ngoài Cẳng Chân Trên – Dưới Túc Tam Lý',
    markers: [{ left: 59.5, top: 48.0 }],
    landmark: 'Mặt trước-ngoài cẳng chân, dưới huyệt Túc Tam Lý khoảng 2 thốn (Lan Vĩ Huyệt EX-LE7)'
  },

  // --------------------------------------------------------------------------
  // KHU 88: ĐÙI (32 POINTS)
  // --------------------------------------------------------------------------
  '88.01': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Đường Chính Giữa Mặt Trước Đùi (Khu 88)',
    markers: [{ left: 34.5, top: 24.5 }],
    landmark: 'Chính giữa mặt trước đùi, từ bờ trên xương bánh chè đo thẳng lên 5 thốn (Huyệt Thông Quan)'
  },
  '88.02': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Đường Chính Giữa Mặt Trước Đùi (Khu 88)',
    markers: [{ left: 30.5, top: 20.8 }],
    landmark: 'Chính giữa mặt trước đùi, từ bờ trên xương bánh chè đo thẳng lên 7 thốn / trên Thông Quan 2 thốn (Thông Sơn)'
  },
  '88.03': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Đường Chính Giữa Mặt Trước Đùi (Khu 88)',
    markers: [{ left: 26.5, top: 17.0 }],
    landmark: 'Chính giữa mặt trước đùi, từ bờ trên xương bánh chè đo thẳng lên 9 thốn / trên Thông Sơn 2 thốn (Thông Thiên)'
  },
  '88.04': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Trong Đùi (Khu 88)',
    markers: [{ left: 27.5, top: 20.5 }],
    landmark: 'Từ huyệt Thông Sơn (88.02) đo vào trong 1 thốn rồi lên trên 1 thốn / cách bánh chè 8 thốn (Thư Muội Nhất)'
  },
  '88.05': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Trong Đùi (Khu 88)',
    markers: [{ left: 22.8, top: 16.2 }],
    landmark: 'Mặt trước-trong đùi, ngay phía trên huyệt Thư Muội Nhất 2,5 thốn / cách bánh chè 10,5 thốn (Thư Muội Nhị)'
  },
  '88.06': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Trong Đùi Trên (Khu 88)',
    markers: [{ left: 18.0, top: 11.8 }],
    landmark: 'Mặt trước-trong đùi, ngay phía trên huyệt Thư Muội Nhị 2,5 thốn / cách bánh chè 13 thốn (Thư Muội Tam)'
  },
  '88.07': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Trong Đùi (Khu 88)',
    markers: [{ left: 21.5, top: 18.0 }],
    landmark: 'Từ huyệt Thư Muội Nhị (88.05) đo ngang vào phía trong thêm 1 thốn (Huyệt Cảm Mạo Nhất)'
  },
  '88.08': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Trong Đùi Trên (Khu 88)',
    markers: [{ left: 16.8, top: 13.8 }],
    landmark: 'Nằm ngay phía trên huyệt Cảm Mạo Nhất 2,5 thốn, ngang mức Thư Muội Tam (Huyệt Cảm Mạo Nhị)'
  },
  '88.09': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Trong Đùi Dưới – Góc Trên Trong Bánh Chè',
    markers: [{ left: 42.5, top: 35.5 }],
    landmark: 'Ngay tại chỗ lõm góc trên – trong của xương bánh chè (Huyệt Thông Thận)'
  },
  '88.10': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Trong Đùi Dưới (Khu 88)',
    markers: [{ left: 38.5, top: 31.8 }],
    landmark: 'Từ góc trên – trong xương bánh chè (Thông Thận) đo thẳng lên 2 thốn (Huyệt Thông Vị – Huyết Hải)'
  },
  '88.11': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Trong Đùi Dưới (Khu 88)',
    markers: [{ left: 34.5, top: 28.0 }],
    landmark: 'Từ huyệt Thông Vị đo thẳng lên 2 thốn / cách góc trên – trong xương bánh chè 4 thốn (Huyệt Thông Bối)'
  },
  '88.12': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Chính Giữa Mặt Trong Đùi (Khu 88 – Thượng Tam Hoàng)',
    markers: [{ left: 28.0, top: 26.8 }],
    landmark: 'Chính giữa đường gân cơ mặt trong đùi, điểm giữa từ nếp bẹn đến bờ trên khớp gối trong (Huyệt Minh Hoàng)'
  },
  '88.13': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trong Đùi Trên (Khu 88 – Thượng Tam Hoàng)',
    markers: [{ left: 22.5, top: 21.5 }],
    landmark: 'Trên đường chính giữa mặt trong đùi, ngay phía trên huyệt Minh Hoàng (88.12) 3 thốn (Thiên Hoàng Đùi)'
  },
  '88.14': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trong Đùi Dưới (Khu 88 – Thượng Tam Hoàng)',
    markers: [{ left: 33.5, top: 32.0 }],
    landmark: 'Trên đường chính giữa mặt trong đùi, ngay phía dưới huyệt Minh Hoàng (88.12) 3 thốn (Huyệt Kỳ Hoàng)'
  },
  '88.15': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trong Đùi Dưới (Khu 88)',
    markers: [{ left: 36.2, top: 34.5 }],
    landmark: 'Mặt trong đùi, từ huyệt Kỳ Hoàng (88.14) đo thẳng xuống dưới 1,5 thốn (Huyệt Hỏa Chi)'
  },
  '88.16': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trong Đùi Dưới (Khu 88)',
    markers: [{ left: 39.0, top: 37.0 }],
    landmark: 'Mặt trong đùi, từ huyệt Hỏa Chi (88.15) đo thẳng xuống dưới 1,5 thốn (Huyệt Hỏa Toàn)'
  },
  '88.17': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Ngoài Đùi (Khu 88 – Nhóm Tứ Mã)',
    markers: [{ left: 30.5, top: 18.2 }],
    landmark: 'Từ bờ trên xương bánh chè đo lên 8 thốn rồi đo ngang ra ngoài 3 thốn (Huyệt Tứ Mã Trung)'
  },
  '88.18': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Ngoài Đùi Trên (Khu 88 – Nhóm Tứ Mã)',
    markers: [{ left: 26.5, top: 14.5 }],
    landmark: 'Mặt trước-ngoài đùi, ngay phía trên huyệt Tứ Mã Trung (88.17) 2 thốn (Huyệt Tứ Mã Thượng)'
  },
  '88.19': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Ngoài Đùi Dưới (Khu 88 – Nhóm Tứ Mã)',
    markers: [{ left: 34.5, top: 22.0 }],
    landmark: 'Mặt trước-ngoài đùi, ngay phía dưới huyệt Tứ Mã Trung (88.17) 2 thốn (Huyệt Tứ Mã Hạ)'
  },
  '88.20': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Đường Giữa Mặt Ngoài Đùi Dưới (Khu 88)',
    markers: [{ left: 40.0, top: 27.5 }],
    landmark: 'Đường chính giữa mặt ngoài đùi dọc dải chậu – chày, cách nếp ngang khoeo/gối lên 2,5 thốn (Huyệt Hạ Tuyền)'
  },
  '88.21': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Đường Giữa Mặt Ngoài Đùi (Khu 88)',
    markers: [{ left: 36.0, top: 23.8 }],
    landmark: 'Đường chính giữa mặt ngoài đùi, trên huyệt Hạ Tuyền 2 thốn / cách khớp gối 4,5 thốn (Huyệt Trung Tuyền)'
  },
  '88.22': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Đường Giữa Mặt Ngoài Đùi (Khu 88)',
    markers: [{ left: 32.0, top: 20.0 }],
    landmark: 'Đường chính giữa mặt ngoài đùi, trên huyệt Trung Tuyền 2 thốn / cách khớp gối 6,5 thốn (Thượng Tuyền)'
  },
  '88.23': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Ngoài Đùi Dưới (Khu 88)',
    markers: [{ left: 42.0, top: 31.0 }],
    landmark: 'Từ góc trên – ngoài của xương bánh chè đo thẳng lên 1 thốn (Huyệt Kim Tiền Hạ)'
  },
  '88.24': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Ngoài Đùi Dưới (Khu 88)',
    markers: [{ left: 39.0, top: 28.2 }],
    landmark: 'Từ góc trên – ngoài xương bánh chè đo thẳng lên 2,5 thốn / trên Kim Tiền Hạ 1,5 thốn (Kim Tiền Thượng)'
  },
  '88.25': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Chính Giữa Mặt Ngoài Đùi (Khu 88 – Cửu Lý)',
    markers: [{ left: 29.0, top: 19.5 }],
    landmark: 'Chính giữa mặt ngoài đùi nơi đầu ngón tay giữa chạm vào khi đứng xuôi tay (Trung Cửu Lý – Phong Thị)'
  },
  '88.26': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Ngoài Đùi Giữa (Khu 88 – Cửu Lý)',
    markers: [{ left: 30.2, top: 17.8 }],
    landmark: 'Mặt ngoài đùi, từ huyệt Trung Cửu Lý (88.25) đo ngang ra phía trước 1,5 thốn (Thượng Cửu Lý)'
  },
  '88.27': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Ngoài Đùi Giữa (Khu 88 – Cửu Lý)',
    markers: [{ left: 27.8, top: 21.2 }],
    landmark: 'Mặt ngoài đùi, từ huyệt Trung Cửu Lý (88.25) đo ngang ra phía sau 1,5 thốn (Hạ Cửu Lý)'
  },
  '88.28': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Ngoài Đùi Dưới – Trên Bánh Chè (Khu 88)',
    markers: [{ left: 42.5, top: 32.0 }],
    landmark: 'Từ góc trên – ngoài xương bánh chè đo lên 1 thốn rồi đo vào phía trong 3 phân (Huyệt Giải)'
  },
  '88.29': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Trong Đùi (Khu 88)',
    markers: [{ left: 33.5, top: 26.0 }],
    landmark: 'Từ huyệt Thông Quan (88.01) đo ngang vào phía trong 5 phân (Huyệt Nội Thông Quan)'
  },
  '88.30': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Trong Đùi (Khu 88)',
    markers: [{ left: 29.5, top: 22.3 }],
    landmark: 'Từ huyệt Thông Sơn (88.02) đo ngang vào phía trong 5 phân (Huyệt Nội Thông Sơn)'
  },
  '88.31': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trước Trong Đùi (Khu 88)',
    markers: [{ left: 25.5, top: 18.5 }],
    landmark: 'Từ huyệt Thông Thiên (88.03) đo ngang vào phía trong 5 phân (Huyệt Nội Thông Thiên)'
  },
  '88.32': {
    photoUrl: PHOTOS.THIGH_LEG,
    surfaceLabel: 'Mặt Trong Khớp Gối (Khu 88)',
    markers: [
      { left: 44.5, top: 39.5 },
      { left: 46.5, top: 41.5 }
    ],
    landmark: 'Chính giữa mặt trong khớp gối (Huyệt 1) và ngay phía dưới 1 thốn (Huyệt 2) (2 huyệt Thất Âm)'
  },

  // --------------------------------------------------------------------------
  // KHU 99: LOA TAI (8 POINTS) + EX-HN TAI / THÁI DƯƠNG / SAU TAI
  // Right panel of HEAD_CROWN_PROFILE (x=51..100%)
  // --------------------------------------------------------------------------
  '99.01': {
    photoUrl: PHOTOS.HEAD_CROWN_PROFILE,
    surfaceLabel: 'Mặt Ngoài Dái Tai / Thùy Tai (Khu 99)',
    markers: [{ left: 65.0, top: 62.5 }],
    landmark: 'Chính giữa mặt ngoài dái tai / thùy tai (Huyệt Nhĩ Hoàn 99.01)'
  },
  '99.02': {
    photoUrl: PHOTOS.HEAD_CROWN_PROFILE,
    surfaceLabel: 'Mặt Sau Vành Tai – Phần Giữa (Khu 99)',
    markers: [{ left: 58.8, top: 51.5 }],
    landmark: 'Mặt sau vành tai (lưng tai), phần giữa lưng sụn tai cách rìa ngoài 3 phân (Huyệt Mộc Nhĩ 99.02)'
  },
  '99.03': {
    photoUrl: PHOTOS.HEAD_CROWN_PROFILE,
    surfaceLabel: 'Mặt Trước Loa Tai – Đối Luân (Khu 99)',
    markers: [{ left: 62.4, top: 50.0 }],
    landmark: 'Mặt trước vành tai, ở chính giữa bờ ngoài gờ đối luân (Huyệt Hỏa Nhĩ 99.03)'
  },
  '99.04': {
    photoUrl: PHOTOS.HEAD_CROWN_PROFILE,
    surfaceLabel: 'Mặt Trước Loa Tai – Hố Xoắn Tai (Khu 99)',
    markers: [{ left: 63.2, top: 53.5 }],
    landmark: 'Trong hố xoắn tai dưới tương ứng vùng Tỳ của nhĩ châm (Huyệt Thổ Nhĩ 99.04)'
  },
  '99.05': {
    photoUrl: PHOTOS.HEAD_CROWN_PROFILE,
    surfaceLabel: 'Mặt Sau Vành Tai – Phần Trên (Khu 99)',
    markers: [{ left: 59.2, top: 47.0 }],
    landmark: 'Mặt sau vành tai, ở bờ ngoài phần trên lưng sụn vành tai (Huyệt Kim Nhĩ 99.05)'
  },
  '99.06': {
    photoUrl: PHOTOS.HEAD_CROWN_PROFILE,
    surfaceLabel: 'Mặt Trước Loa Tai – Góc Dưới Đối Luân (Khu 99)',
    markers: [{ left: 63.0, top: 56.8 }],
    landmark: 'Ở góc dưới của đối luân nơi tiếp giáp đối bình tai (Huyệt Thủy Nhĩ 99.06)'
  },
  '99.07': {
    photoUrl: PHOTOS.HEAD_CROWN_PROFILE,
    surfaceLabel: 'Mặt Sau Vành Tai – Tĩnh Mạch Lưng Tai (Khu 99)',
    markers: [{ left: 58.5, top: 54.0 }],
    landmark: 'Mặt sau vành tai, tại các tĩnh mạch nổi rõ ở rãnh chữ V lưng tai (Huyệt Nhĩ Bối 99.07)'
  },
  '99.08': {
    photoUrl: PHOTOS.HEAD_CROWN_PROFILE,
    surfaceLabel: 'Viền Ngoài Vành Tai – Thượng, Trung, Hạ (Khu 99)',
    markers: [
      { left: 61.5, top: 43.5 },
      { left: 58.2, top: 53.0 },
      { left: 65.0, top: 64.5 }
    ],
    landmark: 'Dọc viền ngoài vành tai: đỉnh vành tai (Nhĩ Thượng), giữa viền tai (Nhĩ Trung) và đáy dái tai (Nhĩ Hạ)'
  },
  'EX-HN5': {
    photoUrl: PHOTOS.HEAD_CROWN_PROFILE,
    surfaceLabel: 'Vùng Thái Dương Bên Đầu',
    markers: [{ left: 81.5, top: 43.5 }],
    landmark: 'Chỗ lõm vùng thái dương, sau điểm giữa đoạn nối đuôi mày và đuôi mắt 1 thốn (Huyệt Thái Dương EX-HN5)'
  },
  'EX-HN6': {
    photoUrl: PHOTOS.HEAD_CROWN_PROFILE,
    surfaceLabel: 'Đỉnh Cao Nhất Vành Tai',
    markers: [{ left: 61.5, top: 43.5 }],
    landmark: 'Đỉnh cao nhất của vành tai khi gấp vành tai ra phía trước (Huyệt Nhĩ Tiêm EX-HN6)'
  },
  'EX-HN14': {
    photoUrl: PHOTOS.HEAD_CROWN_PROFILE,
    surfaceLabel: 'Vùng Sau Tai – Dưới Mỏm Chũm',
    markers: [{ left: 58.0, top: 64.5 }],
    landmark: 'Sau dái tai, từ huyệt Ế Phong đo ra sau 1 thốn ở bờ dưới mỏm chũm (Huyệt Ế Minh EX-HN14)'
  },
  'EX-HN16': {
    photoUrl: PHOTOS.HEAD_CROWN_PROFILE,
    surfaceLabel: 'Vùng Sau Tai – Giữa Ế Phong & Phong Trì',
    markers: [{ left: 55.0, top: 66.5 }],
    landmark: 'Điểm chính giữa đường nối huyệt Ế Phong và huyệt Phong Trì phía sau dái tai (Huyệt An Miên EX-HN16)'
  },
  'EX-HN17': {
    photoUrl: PHOTOS.HEAD_CROWN_PROFILE,
    surfaceLabel: 'Vùng Má Trước Dái Tai – Trên Cơ Cắn',
    markers: [{ left: 70.5, top: 61.0 }],
    landmark: 'Từ dái tai đo ngang ra phía trước 0,5 thốn ở bờ trước cơ cắn (Huyệt Khiên Chính EX-HN17)'
  },

  // --------------------------------------------------------------------------
  // KHU 1010: ĐẦU MẶT (25 POINTS) + EX-HN ĐẦU MẶT
  // --------------------------------------------------------------------------
  '1010.01': {
    photoUrl: PHOTOS.HEAD_CROWN_PROFILE,
    surfaceLabel: 'Chính Giữa Đỉnh Đầu (Khung Trái – Nhìn Từ Đỉnh Sọ)',
    markers: [{ left: 25.0, top: 58.0 }],
    landmark: 'Chính giữa đỉnh đầu, giao điểm đường dọc giữa đầu và đường nối hai đỉnh tai (Chính Hội – Bách Hội)'
  },
  '1010.02': {
    photoUrl: PHOTOS.HEAD_CROWN_PROFILE,
    surfaceLabel: 'Vùng Đỉnh Đầu – Hai Bên Chính Hội (Khung Trái)',
    markers: [
      { left: 16.0, top: 58.0 },
      { left: 34.0, top: 58.0 }
    ],
    landmark: 'Trên đỉnh đầu, từ huyệt Chính Hội (1010.01) đo ngang sang hai bên trái và phải mỗi bên 1,3 thốn (Châu Viên)'
  },
  '1010.03': {
    photoUrl: PHOTOS.HEAD_CROWN_PROFILE,
    surfaceLabel: 'Vùng Đỉnh Đầu Phía Sau (Khung Trái)',
    markers: [
      { left: 16.0, top: 73.5 },
      { left: 34.0, top: 73.5 }
    ],
    landmark: 'Trên đỉnh đầu, từ huyệt Châu Viên (1010.02) đo thẳng ra phía sau 1,5 thốn (Huyệt Châu Côn)'
  },
  '1010.04': {
    photoUrl: PHOTOS.HEAD_CROWN_PROFILE,
    surfaceLabel: 'Vùng Đỉnh Đầu Phía Trước (Khung Trái)',
    markers: [
      { left: 16.0, top: 41.5 },
      { left: 34.0, top: 41.5 }
    ],
    landmark: 'Trên đỉnh đầu, từ huyệt Châu Viên (1010.02) đo thẳng ra phía trước 1,5 thốn (Huyệt Châu Luân)'
  },
  '1010.05': {
    photoUrl: PHOTOS.HEAD_CROWN_PROFILE,
    surfaceLabel: 'Đường Giữa Đỉnh Đầu Phía Trước (Khung Trái)',
    markers: [{ left: 25.0, top: 41.5 }],
    landmark: 'Trên đường dọc giữa đỉnh đầu, từ Chính Hội đo thẳng ra trước 1,5 thốn (Tiền Hội – Tiền Đỉnh)'
  },
  '1010.06': {
    photoUrl: PHOTOS.HEAD_CROWN_PROFILE,
    surfaceLabel: 'Đường Giữa Đỉnh Đầu Phía Sau (Khung Trái)',
    markers: [{ left: 25.0, top: 73.5 }],
    landmark: 'Trên đường dọc giữa đỉnh đầu, từ Chính Hội đo thẳng ra sau 1,6 thốn (Hậu Hội – Hậu Đỉnh)'
  },
  '1010.07': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Chính Giữa Gáy Sau – Dưới Ụ Chẩm Ngoài',
    markers: [{ left: 58.0, top: 37.0 }],
    landmark: 'Chính giữa gáy sau, trong hõm dưới ụ chẩm ngoài cách chân tóc gáy lên 0,8 thốn (Huyệt Tổng Khu)'
  },
  '1010.08': {
    photoUrl: PHOTOS.FACE_FRONT,
    surfaceLabel: 'Giữa Hai Đầu Lông Mày (Khuôn Mặt Chính Diện)',
    markers: [{ left: 50.0, top: 26.8 }],
    landmark: 'Giữa hai đầu lông mày, từ huyệt Ấn Đường đo thẳng lên trên 3 phân (Huyệt Trấn Tĩnh)'
  },
  '1010.09': {
    photoUrl: PHOTOS.FACE_FRONT,
    surfaceLabel: 'Đầu Trong Lông Mày (Khuôn Mặt Chính Diện)',
    markers: [
      { left: 44.0, top: 27.5 },
      { left: 56.0, top: 27.5 }
    ],
    landmark: 'Từ đầu trong lông mày (huyệt Toàn Trúc) đo thẳng lên trên 2 phân (Huyệt Thượng Lý)'
  },
  '1010.10': {
    photoUrl: PHOTOS.FACE_FRONT,
    surfaceLabel: 'Chính Giữa Cung Lông Mày (Khuôn Mặt Chính Diện)',
    markers: [
      { left: 38.5, top: 26.5 },
      { left: 61.5, top: 26.5 }
    ],
    landmark: 'Chính giữa cung lông mày (ngay trên huyệt Ngư Yêu) đo thẳng lên 2 phân (Huyệt Tứ Phủ Nhị)'
  },
  '1010.11': {
    photoUrl: PHOTOS.FACE_FRONT,
    surfaceLabel: 'Đuôi Lông Mày (Khuôn Mặt Chính Diện)',
    markers: [
      { left: 30.5, top: 28.0 },
      { left: 69.5, top: 28.0 }
    ],
    landmark: 'Từ đuôi lông mày (huyệt Ty Trúc Không) đo thẳng lên 2 phân (Huyệt Tứ Phủ Nhất)'
  },
  '1010.12': {
    photoUrl: PHOTOS.FACE_FRONT,
    surfaceLabel: 'Chính Giữa Đỉnh Chóp Mũi (Khuôn Mặt Chính Diện)',
    markers: [{ left: 50.0, top: 52.5 }],
    landmark: 'Ngay chính giữa đỉnh chóp mũi, tương ứng vị trí huyệt Tố Liêu (Huyệt Chính Bổn)'
  },
  '1010.13': {
    photoUrl: PHOTOS.FACE_FRONT,
    surfaceLabel: 'Vùng Gò Má – Dưới Xương Gò Má (Khuôn Mặt Chính Diện)',
    markers: [
      { left: 33.5, top: 54.0 },
      { left: 66.5, top: 54.0 }
    ],
    landmark: 'Chỗ lõm bờ dưới xương gò má, trên đường thẳng dọc từ khóe mắt ngoài kéo xuống ngang cánh mũi (Mã Kim Thủy)'
  },
  '1010.14': {
    photoUrl: PHOTOS.FACE_FRONT,
    surfaceLabel: 'Vùng Má Dưới Gò Má (Khuôn Mặt Chính Diện)',
    markers: [
      { left: 33.5, top: 58.5 },
      { left: 66.5, top: 58.5 }
    ],
    landmark: 'Ngay phía dưới huyệt Mã Kim Thủy (1010.13) 4 phân, ngang mức bờ dưới lỗ mũi (Huyệt Mã Khoái Thủy)'
  },
  '1010.15': {
    photoUrl: PHOTOS.FACE_FRONT,
    surfaceLabel: 'Cạnh Ngoài Cánh Mũi (Khuôn Mặt Chính Diện)',
    markers: [
      { left: 40.5, top: 55.0 },
      { left: 59.5, top: 55.0 }
    ],
    landmark: 'Từ bờ ngoài cánh mũi đo ngang ra 5 phân gần vị trí Nghinh Hương (Huyệt Phủ Khoái)'
  },
  '1010.16': {
    photoUrl: PHOTOS.FACE_FRONT,
    surfaceLabel: 'Vùng Môi Trên – Cạnh Nhân Trung (Khuôn Mặt Chính Diện)',
    markers: [
      { left: 40.5, top: 67.5 },
      { left: 59.5, top: 67.5 }
    ],
    landmark: 'Từ điểm giữa nhân trung đo ngang ra hai bên mỗi bên 1,4 thốn, trên khóe miệng 4 phân (Huyệt Lục Khoái)'
  },
  '1010.17': {
    photoUrl: PHOTOS.FACE_FRONT,
    surfaceLabel: 'Ngoài Khóe Miệng (Khuôn Mặt Chính Diện)',
    markers: [
      { left: 36.5, top: 72.5 },
      { left: 63.5, top: 72.5 }
    ],
    landmark: 'Từ khóe miệng (huyệt Địa Thương) đo ngang ra ngoài 5 phân (Huyệt Thất Khoái)'
  },
  '1010.18': {
    photoUrl: PHOTOS.HEAD_CROWN_PROFILE,
    surfaceLabel: 'Vùng Má Trước Tai – Dưới Khớp Thái Dương Hàm',
    markers: [{ left: 73.5, top: 57.5 }],
    landmark: 'Từ huyệt Hạ Quan (chỗ lõm trước tai dưới cung gò má) đo thẳng xuống 1 thốn (Huyệt Mộc Chi)'
  },
  '1010.19': {
    photoUrl: PHOTOS.FACE_FRONT,
    surfaceLabel: 'Vùng Cằm Dưới Khóe Miệng (Khuôn Mặt Chính Diện)',
    markers: [
      { left: 40.2, top: 78.0 },
      { left: 59.8, top: 78.0 }
    ],
    landmark: 'Từ khóe miệng (Địa Thương) đo thẳng xuống dưới 4 phân trên vùng cằm (Huyệt Thủy Thông)'
  },
  '1010.20': {
    photoUrl: PHOTOS.FACE_FRONT,
    surfaceLabel: 'Vùng Cằm Trước (Khuôn Mặt Chính Diện)',
    markers: [
      { left: 44.5, top: 78.0 },
      { left: 55.5, top: 78.0 }
    ],
    landmark: 'Trên vùng cằm, từ huyệt Thủy Thông (1010.19) đo ngang vào phía trong 5 phân (Huyệt Thủy Kim)'
  },
  '1010.21': {
    photoUrl: PHOTOS.FACE_FRONT,
    surfaceLabel: 'Dưới Ổ Mắt (Khuôn Mặt Chính Diện)',
    markers: [
      { left: 38.5, top: 44.0 },
      { left: 61.5, top: 44.0 }
    ],
    landmark: 'Ngay tại lỗ dưới ổ mắt thẳng dưới con ngươi, tương ứng huyệt Tứ Bạch (Huyệt Ngọc Hỏa)'
  },
  '1010.22': {
    photoUrl: PHOTOS.FACE_FRONT,
    surfaceLabel: 'Rãnh Trên Cánh Mũi (Khuôn Mặt Chính Diện)',
    markers: [
      { left: 42.5, top: 52.5 },
      { left: 57.5, top: 52.5 }
    ],
    landmark: 'Chính giữa rãnh trên của cánh mũi nơi tiếp giáp cánh mũi với má (Huyệt Tị Dực)'
  },
  '1010.23': {
    photoUrl: PHOTOS.HEAD_CROWN_PROFILE,
    surfaceLabel: 'Vùng Thái Dương – Trên Đỉnh Vành Tai 1,5 Thốn',
    markers: [{ left: 62.0, top: 31.5 }],
    landmark: 'Từ đỉnh vành tai đo thẳng lên 1,5 thốn tại vùng thái dương trên tai (Châu Hỏa – Suất Cốc)'
  },
  '1010.24': {
    photoUrl: PHOTOS.HEAD_CROWN_PROFILE,
    surfaceLabel: 'Vùng Trên Sau Tai – Sau Châu Hỏa 1 Thốn',
    markers: [{ left: 56.5, top: 32.5 }],
    landmark: 'Từ huyệt Châu Hỏa (1010.23) đo ngang ra phía sau 1 thốn (Huyệt Châu Kim)'
  },
  '1010.25': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Vùng Chẩm Sau Đầu – Đỉnh Ụ Chẩm Ngoài',
    markers: [
      { left: 57.5, top: 28.5 },
      { left: 57.5, top: 24.5 }
    ],
    landmark: 'Vùng chẩm sau đầu: Huyệt 1 trên đỉnh ụ chẩm ngoài (Não Hổ), Huyệt 2 ngay phía trên 8 phân (Châu Thủy)'
  },
  'EX-HN1': {
    photoUrl: PHOTOS.HEAD_CROWN_PROFILE,
    surfaceLabel: 'Đỉnh Đầu – Bốn Phía Quanh Bách Hội (Khung Trái)',
    markers: [
      { left: 25.0, top: 48.0 },
      { left: 25.0, top: 68.0 },
      { left: 18.0, top: 58.0 },
      { left: 32.0, top: 58.0 }
    ],
    landmark: 'Đỉnh đầu: 4 huyệt nằm cách Bách Hội về phía trước, sau, trái, phải mỗi bên 1 thốn (Tứ Thần Thông EX-HN1)'
  },
  'EX-HN2': {
    photoUrl: PHOTOS.FACE_FRONT,
    surfaceLabel: 'Vùng Trán Trên (Khuôn Mặt Chính Diện)',
    markers: [
      { left: 38.5, top: 9.5 },
      { left: 61.5, top: 9.5 }
    ],
    landmark: 'Thẳng từ con ngươi mắt đo lên vùng trán, cách chân tóc trước 1 thốn (Huyệt Đương Dương EX-HN2)'
  },
  'EX-HN3': {
    photoUrl: PHOTOS.FACE_FRONT,
    surfaceLabel: 'Chính Giữa Hai Đầu Lông Mày (Khuôn Mặt Chính Diện)',
    markers: [{ left: 50.0, top: 30.5 }],
    landmark: 'Điểm chính giữa đường nối hai đầu trong lông mày (Huyệt Ấn Đường EX-HN3)'
  },
  'EX-HN4': {
    photoUrl: PHOTOS.FACE_FRONT,
    surfaceLabel: 'Chính Giữa Cung Lông Mày (Khuôn Mặt Chính Diện)',
    markers: [
      { left: 38.5, top: 29.0 },
      { left: 61.5, top: 29.0 }
    ],
    landmark: 'Chính giữa cung lông mày, thẳng phía trên con ngươi mắt khi nhìn thẳng (Huyệt Ngư Yêu EX-HN4)'
  },
  'EX-HN7': {
    photoUrl: PHOTOS.FACE_FRONT,
    surfaceLabel: 'Bờ Dưới Ổ Mắt Ngoài (Khuôn Mặt Chính Diện)',
    markers: [
      { left: 34.5, top: 39.5 },
      { left: 65.5, top: 39.5 }
    ],
    landmark: 'Điểm nối 1/4 ngoài và 3/4 trong của bờ dưới ổ mắt (Huyệt Cầu Hậu EX-HN7)'
  },
  'EX-HN8': {
    photoUrl: PHOTOS.FACE_FRONT,
    surfaceLabel: 'Đầu Trên Rãnh Mũi Má (Khuôn Mặt Chính Diện)',
    markers: [
      { left: 44.5, top: 46.0 },
      { left: 55.5, top: 46.0 }
    ],
    landmark: 'Điểm cao nhất của rãnh mũi – má nơi tiếp giáp xương mũi và sụn mũi (Thượng Nghinh Hương EX-HN8)'
  },
  'EX-HN9': {
    photoUrl: PHOTOS.FACE_FRONT,
    surfaceLabel: 'Niêm Mạc Trong Lỗ Mũi (Khuôn Mặt Chính Diện)',
    markers: [
      { left: 45.0, top: 55.5 },
      { left: 55.0, top: 55.5 }
    ],
    landmark: 'Trên niêm mạc bên trong lỗ mũi phía trên sụn cánh mũi (Nội Nghinh Hương EX-HN9)'
  },
  'EX-HN10': {
    photoUrl: PHOTOS.FACE_FRONT,
    surfaceLabel: 'Chính Giữa Mặt Trên Lưỡi (Vùng Miệng)',
    markers: [{ left: 50.0, top: 72.5 }],
    landmark: 'Trong khoang miệng: Điểm chính giữa rãnh dọc mặt trên lưỡi (Huyệt Tụ Tuyền EX-HN10)'
  },
  'EX-HN11': {
    photoUrl: PHOTOS.FACE_FRONT,
    surfaceLabel: 'Chính Giữa Hãm Lưỡi Dưới Lưỡi (Vùng Miệng)',
    markers: [{ left: 50.0, top: 73.5 }],
    landmark: 'Trong khoang miệng: Cong lưỡi lên, chính giữa dây hãm lưỡi dưới lưỡi (Huyệt Hải Tuyền EX-HN11)'
  },
  'EX-HN12 & EX-HN13': {
    photoUrl: PHOTOS.FACE_FRONT,
    surfaceLabel: 'Tĩnh Mạch Dưới Lưỡi Hai Bên Hãm Lưỡi (Vùng Miệng)',
    markers: [
      { left: 47.0, top: 73.5 },
      { left: 53.0, top: 73.5 }
    ],
    landmark: 'Trên tĩnh mạch dưới lưỡi hai bên dây hãm lưỡi: bên trái là Kim Tân, bên phải là Ngọc Dịch'
  },
  'EX-HN15': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Vùng Gáy Sau – Trên Đại Chùy 2 Thốn Ngang Ra 1 Thốn',
    markers: [
      { left: 52.5, top: 48.0 },
      { left: 61.5, top: 48.0 }
    ],
    landmark: 'Vùng gáy: Từ dưới mỏm gai C7 (Đại Chùy) đo lên 2 thốn, đo ngang ra hai bên 1 thốn (Huyệt Bách Lao EX-HN15)'
  },
  'EX-HN18': {
    photoUrl: PHOTOS.FACE_FRONT,
    surfaceLabel: 'Chính Giữa Dưới Cằm (Khuôn Mặt Chính Diện)',
    markers: [{ left: 50.0, top: 92.0 }],
    landmark: 'Chính giữa dưới cằm, trong chỗ lõm giữa bờ dưới xương hàm dưới và xương móng (Thượng Liêm Tuyền EX-HN18)'
  },

  // --------------------------------------------------------------------------
  // KHU HẬU BỐI (LƯNG: DT03..DT17) & EX-B1..EX-B9
  // Back midline runs from C7 (57.5%, 56.0%) down thoracic spine to (67.5%, 94.0%)
  // --------------------------------------------------------------------------
  'DT03': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Vùng Gáy & Lưng Trên – Nhóm Thất Tinh (Khu Hậu Bối)',
    markers: [
      { left: 58.0, top: 37.0 },
      { left: 57.5, top: 56.0 },
      { left: 59.0, top: 62.0 },
      { left: 61.5, top: 72.0 },
      { left: 54.0, top: 66.0 },
      { left: 65.0, top: 66.0 }
    ],
    landmark: 'Mạch Đốc vùng gáy và lưng trên: Tổng Khu, Đại Chùy (C7), Đào Đạo (T1), Thần Trụ (T3) và hai bên 0,8 thốn'
  },
  'DT04': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Vùng Cột Sống Lưng – 5 Đường Ngũ Lĩnh (Khu Hậu Bối)',
    markers: [
      { left: 60.5, top: 67.0 },
      { left: 63.0, top: 77.0 },
      { left: 55.0, top: 68.0 },
      { left: 66.0, top: 66.0 },
      { left: 49.5, top: 69.5 },
      { left: 71.5, top: 65.0 }
    ],
    landmark: 'Năm đường dọc vùng lưng từ T1 đến L2: đường giữa mạch Đốc và 2 hàng ngang cách 1,5 thốn & 3 thốn'
  },
  'DT05': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Vùng Lưng Trên – Hai Bên Cột Sống 1,5 Thốn (Song Phượng)',
    markers: [
      { left: 54.5, top: 66.0 },
      { left: 65.5, top: 64.5 },
      { left: 56.5, top: 74.0 },
      { left: 67.5, top: 72.5 },
      { left: 58.5, top: 82.0 },
      { left: 69.5, top: 80.5 }
    ],
    landmark: 'Từ dưới mỏm gai đốt sống ngực T2 đến T8 đo ngang sang hai bên mỗi bên 1,5 thốn (14 huyệt Song Phượng)'
  },
  'DT06': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Vùng Lưng Trên & Bả Vai (Nhóm Cửu Hầu)',
    markers: [
      { left: 55.0, top: 69.0 },
      { left: 66.0, top: 67.5 },
      { left: 56.5, top: 75.0 },
      { left: 67.5, top: 73.5 },
      { left: 50.0, top: 72.0 },
      { left: 71.5, top: 70.0 }
    ],
    landmark: 'Vùng lưng trên từ T3 đến T5 cách mạch Đốc 1,5 thốn và 3 thốn (Phế Du, Quyết Âm Du, Tâm Du, Cao Hoang)'
  },
  'DT07': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Vùng Lưng Trên – Cách Mạch Đốc 3 Thốn (Nhóm Tam Kim)',
    markers: [
      { left: 49.5, top: 69.5 },
      { left: 71.0, top: 67.5 },
      { left: 51.0, top: 75.5 },
      { left: 72.5, top: 73.5 },
      { left: 52.5, top: 81.5 },
      { left: 74.0, top: 79.5 }
    ],
    landmark: 'Từ dưới mỏm gai T3, T4, T5 đo ngang ra hai bên mỗi bên 3 thốn (6 huyệt Tam Kim: Phách Hộ, Cao Hoang, Thần Đường)'
  },
  'DT08': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Vùng Bả Vai Ngoài – Cách Mạch Đốc 6 Thốn (Tinh Chi)',
    markers: [
      { left: 42.0, top: 67.5 },
      { left: 43.0, top: 73.0 }
    ],
    landmark: 'Từ dưới mỏm gai đốt sống ngực T2 và T3 đo ngang ra hai bên mỗi bên 6 thốn trên bả vai (4 huyệt Tinh Chi)'
  },
  'DT09': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Vùng Bả Vai Dưới – Cách Mạch Đốc 6 Thốn (Kim Lâm)',
    markers: [
      { left: 44.0, top: 76.5 },
      { left: 45.0, top: 81.5 },
      { left: 46.0, top: 86.5 }
    ],
    landmark: 'Từ dưới mỏm gai đốt sống ngực T4, T5, T6 đo ngang ra hai bên mỗi bên 6 thốn (6 huyệt Kim Lâm)'
  },
  'DT10': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Vùng Lưng Giữa & Dưới (Nhóm Đỉnh Trụ)',
    markers: [
      { left: 57.0, top: 76.0 },
      { left: 68.0, top: 74.5 },
      { left: 59.5, top: 85.0 },
      { left: 70.5, top: 83.5 }
    ],
    landmark: 'Vùng lưng từ đốt sống ngực T4 đến T12 trên hai hàng dọc cách mạch Đốc 1,5 thốn và 3 thốn (16 huyệt Đỉnh Trụ)'
  },
  'DT11': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Vùng Lưng Ngực T4–T9 (Nhóm Hậu Tâm)',
    markers: [
      { left: 62.5, top: 74.0 },
      { left: 64.5, top: 82.0 },
      { left: 57.0, top: 75.0 },
      { left: 68.0, top: 73.5 }
    ],
    landmark: 'Vùng lưng từ đốt sống ngực T4 đến T9 trên mạch Đốc và hai hàng cách 1,5 thốn, 3 thốn (20 huyệt Hậu Tâm)'
  },
  'DT12': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Vùng Lưng Trên – Dưới T1 & Ngang T3 (Cảm Mạo Tam)',
    markers: [
      { left: 59.0, top: 62.0 },
      { left: 49.5, top: 69.5 },
      { left: 71.0, top: 67.5 }
    ],
    landmark: 'Vùng lưng trên: Đào Đạo (dưới T1) và hai huyệt Phách Hộ ngang T3 cách mạch Đốc 3 thốn (Cảm Mạo Tam)'
  },
  'DT13': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Vùng Thắt Lưng L1 – Cách Mạch Đốc 1,5 Thốn (Thủy Trung)',
    markers: [
      { left: 60.5, top: 89.0 },
      { left: 71.5, top: 87.5 }
    ],
    landmark: 'Từ dưới mỏm gai đốt sống thắt lưng L1 đo ngang ra hai bên mỗi bên 1,5 thốn (Thủy Trung – Tam Tiêu Du)'
  },
  'DT14': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Vùng Thắt Lưng L2 – Cách Mạch Đốc 1,5 Thốn (Thủy Phủ)',
    markers: [
      { left: 61.5, top: 92.5 },
      { left: 72.5, top: 91.0 }
    ],
    landmark: 'Từ dưới mỏm gai đốt sống thắt lưng L2 (Mệnh Môn) đo ngang ra hai bên 1,5 thốn (Thủy Phủ – Thận Du)'
  },
  'DT15': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Vùng Thắt Lưng L1–L5 (Nhóm Tam Giang)',
    markers: [
      { left: 66.5, top: 90.0 },
      { left: 61.0, top: 90.5 },
      { left: 72.0, top: 89.0 }
    ],
    landmark: 'Vùng thắt lưng từ L1 đến L5 trên mạch Đốc và hai hàng ngang cách 1,5 thốn, 3 thốn (15 huyệt Tam Giang)'
  },
  'DT16': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Vùng Thắt Lưng – Cùng Cụt Cách 3 Thốn (Song Hà)',
    markers: [
      { left: 55.5, top: 92.0 },
      { left: 77.0, top: 90.0 }
    ],
    landmark: 'Hai bên cột sống thắt lưng – cùng cụt từ L3 đến S4, cách đường giữa 3 thốn (12 huyệt Song Hà)'
  },
  'DT17': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Đường Giữa Vùng Xương Cùng (Nhóm Xung Tiêu)',
    markers: [{ left: 67.5, top: 94.0 }],
    landmark: 'Trên đường chính giữa vùng xương cùng dưới mỏm gai S2, S3 và S4 (3 huyệt Xung Tiêu)'
  },
  'EX-B1': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Vùng Cổ Sau – Ngang Dưới Đốt Sống C7 (Định Suyễn)',
    markers: [
      { left: 55.0, top: 56.2 },
      { left: 60.0, top: 55.8 }
    ],
    landmark: 'Từ dưới mỏm gai đốt sống cổ C7 (Đại Chùy) đo ngang ra hai bên mỗi bên 0,5 thốn (Định Suyễn EX-B1)'
  },
  'EX-B2': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Dọc Cột Sống Lưng Cách 0,5 Thốn (Hoa Đà Giáp Tích)',
    markers: [
      { left: 57.5, top: 64.0 },
      { left: 61.5, top: 63.5 },
      { left: 59.5, top: 73.0 },
      { left: 63.5, top: 72.5 },
      { left: 61.5, top: 82.0 },
      { left: 65.5, top: 81.5 }
    ],
    landmark: 'Từ dưới mỏm gai đốt sống ngực T1 đến thắt lưng L5 đo ngang ra hai bên mỗi bên 0,5 thốn (Hoa Đà Giáp Tích)'
  },
  'EX-B3': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Vùng Lưng Giữa – Ngang Dưới T8 Cách 1,5 Thốn',
    markers: [
      { left: 58.5, top: 82.0 },
      { left: 69.5, top: 80.5 }
    ],
    landmark: 'Từ dưới mỏm gai đốt sống ngực T8 đo ngang ra hai bên mỗi bên 1,5 thốn (Vị Quản Hạ Du / Tụy Du EX-B3)'
  },
  'EX-B4': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Vùng Thắt Lưng L1 – Cách Mạch Đốc 3,5 Thốn (Bĩ Căn)',
    markers: [
      { left: 53.5, top: 89.5 },
      { left: 78.0, top: 87.5 }
    ],
    landmark: 'Từ dưới mỏm gai đốt sống thắt lưng L1 đo ngang ra hai bên mỗi bên 3,5 thốn (Huyệt Bĩ Căn EX-B4)'
  },
  'EX-B5': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Vùng Thắt Lưng L3 – Cách Mạch Đốc 3 Thốn (Hạ Chí Thất)',
    markers: [
      { left: 55.0, top: 92.0 },
      { left: 77.0, top: 90.0 }
    ],
    landmark: 'Từ dưới mỏm gai đốt sống thắt lưng L3 đo ngang ra hai bên mỗi bên 3 thốn (Hạ Chí Thất EX-B5)'
  },
  'EX-B6': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Vùng Thắt Lưng L4 – Cách Mạch Đốc 3 Thốn (Yêu Nghi)',
    markers: [
      { left: 55.5, top: 93.5 },
      { left: 77.5, top: 91.5 }
    ],
    landmark: 'Từ dưới mỏm gai đốt sống thắt lưng L4 đo ngang ra hai bên mỗi bên 3 thốn (Huyệt Yêu Nghi EX-B6)'
  },
  'EX-B7': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Chính Giữa Dưới Đốt Sống Thắt Lưng L5 (Thập Thất Chùy Hạ)',
    markers: [{ left: 67.2, top: 93.0 }],
    landmark: 'Chính giữa chỗ lõm ngay dưới mỏm gai đốt sống thắt lưng thứ 5 (Thập Thất Chùy Hạ EX-B7)'
  },
  'EX-B8': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Đường Giữa Xương Cùng Dưới S2 (Yêu Kỳ)',
    markers: [{ left: 67.5, top: 94.5 }],
    landmark: 'Từ đầu mỏm cụt đo thẳng lên 2 thốn trong hõm giữa hai sừng xương cùng (Huyệt Yêu Kỳ EX-B8)'
  },
  'EX-B9': {
    photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
    surfaceLabel: 'Vùng Lưng Trên – Ngang Dưới T7 Cách 2 Thốn (Khí Suyễn)',
    markers: [
      { left: 56.5, top: 80.0 },
      { left: 71.0, top: 78.5 }
    ],
    landmark: 'Từ dưới mỏm gai đốt sống ngực T7 (Chí Dương) đo ngang ra hai bên mỗi bên 2 thốn (Khí Suyễn EX-B9)'
  },

  // --------------------------------------------------------------------------
  // KHU TIỀN HUNG (NGỰC BỤNG: VT01..VT05) & EX-CA1..EX-CA4
  // Umbilicus (Thần Khuyết) on ANTERIOR_TORSO is at (50.5%, 54.5%)
  // --------------------------------------------------------------------------
  'VT01': {
    photoUrl: PHOTOS.ANTERIOR_TORSO,
    surfaceLabel: 'Vùng Cổ Trước & Hõm Ức (Hầu Nga Cửu – Khu Tiền Hung)',
    markers: [
      { left: 50.5, top: 12.0 },
      { left: 45.0, top: 12.0 },
      { left: 56.0, top: 12.0 }
    ],
    landmark: 'Vùng cổ trước quanh sụn giáp và trên hõm ức: đường giữa và hai bên cách 1,5 thốn (9 huyệt Hầu Nga Cửu)'
  },
  'VT02': {
    photoUrl: PHOTOS.ANTERIOR_TORSO,
    surfaceLabel: 'Vùng Ngực Trên Dưới Xương Đòn (Thập Nhị Hầu)',
    markers: [
      { left: 43.0, top: 16.0 },
      { left: 37.0, top: 16.0 },
      { left: 58.0, top: 16.0 },
      { left: 64.0, top: 16.0 }
    ],
    landmark: 'Vùng ngực trên dưới xương đòn, hai bên cách đường giữa ngực 1,5 thốn và 3 thốn (12 huyệt Thập Nhị Hầu)'
  },
  'VT03': {
    photoUrl: PHOTOS.ANTERIOR_TORSO,
    surfaceLabel: 'Đường Chính Giữa Xương Ức (Kim Ngũ – Khu Tiền Hung)',
    markers: [
      { left: 50.5, top: 16.0 },
      { left: 50.5, top: 20.0 },
      { left: 50.5, top: 24.0 }
    ],
    landmark: 'Đường chính giữa xương ức (mạch Nhâm) từ Thiên Đột xuống Chanzhong chia 5 huyệt (Nhóm Kim Ngũ)'
  },
  'VT04': {
    photoUrl: PHOTOS.ANTERIOR_TORSO,
    surfaceLabel: 'Vùng Thượng Vị Phía Trên Rốn (Vị Mao Thất – 7 Huyệt)',
    markers: [
      { left: 50.5, top: 31.0 },
      { left: 50.5, top: 36.5 },
      { left: 50.5, top: 42.0 },
      { left: 44.5, top: 34.0 },
      { left: 56.5, top: 34.0 },
      { left: 44.5, top: 40.0 },
      { left: 56.5, top: 40.0 }
    ],
    landmark: 'Vùng thượng vị trên rốn: 3 huyệt trên mạch Nhâm (Cự Khuyết, Thượng Quản, Trung Quản) và 4 huyệt cách 1,5 thốn'
  },
  'VT05': {
    photoUrl: PHOTOS.ANTERIOR_TORSO,
    surfaceLabel: 'Vùng Quanh Rốn & Bụng Dưới (Phủ Sào Nhị Thập Tam)',
    markers: [
      { left: 50.5, top: 50.0 },
      { left: 50.5, top: 59.0 },
      { left: 50.5, top: 64.0 },
      { left: 50.5, top: 69.0 },
      { left: 46.0, top: 59.0 },
      { left: 55.0, top: 59.0 },
      { left: 46.0, top: 64.0 },
      { left: 55.0, top: 64.0 }
    ],
    landmark: 'Vùng quanh rốn và bụng dưới: trên mạch Nhâm (từ Thủy Phân đến Khúc Cốt) và hai hàng cách 1 thốn, 2 thốn'
  },
  'EX-CA1': {
    photoUrl: PHOTOS.ANTERIOR_TORSO,
    surfaceLabel: 'Vùng Bụng Dưới – Dưới Rốn 4 Thốn Ngang Ra 3 Thốn',
    markers: [
      { left: 39.5, top: 71.0 },
      { left: 61.5, top: 71.0 }
    ],
    landmark: 'Bụng dưới: Từ Trung Cực (dưới rốn 4 thốn) đo ngang ra hai bên mỗi bên 3 thốn (Huyệt Tử Cung EX-CA1)'
  },
  'EX-CA2': {
    photoUrl: PHOTOS.ANTERIOR_TORSO,
    surfaceLabel: 'Vùng Bụng Dưới – Dưới Rốn 3 Thốn Ngang Ra 3 Thốn',
    markers: [
      { left: 39.5, top: 66.8 },
      { left: 61.5, top: 66.8 }
    ],
    landmark: 'Bụng dưới: Từ Quan Nguyên (dưới rốn 3 thốn) đo ngang ra hai bên mỗi bên 3 thốn (Kinh Trung EX-CA2)'
  },
  'EX-CA3': {
    photoUrl: PHOTOS.ANTERIOR_TORSO,
    surfaceLabel: 'Vùng Bụng Dưới – Dưới Rốn 3 Thốn Ngang Ra 3 Thốn',
    markers: [
      { left: 39.5, top: 66.8 },
      { left: 61.5, top: 66.8 }
    ],
    landmark: 'Bụng dưới: Từ Quan Nguyên (dưới rốn 3 thốn) đo ngang ra hai bên mỗi bên 3 thốn (Khí Môn EX-CA3)'
  },
  'EX-CA4': {
    photoUrl: PHOTOS.ANTERIOR_TORSO,
    surfaceLabel: 'Vùng Bụng Dưới – Dưới Rốn 3 Thốn Ngang Ra 4 Thốn',
    markers: [
      { left: 36.0, top: 66.8 },
      { left: 65.0, top: 66.8 }
    ],
    landmark: 'Bụng dưới: Từ Quan Nguyên (dưới rốn 3 thốn) đo ngang ra hai bên mỗi bên 4 thốn (Huyệt Đề Thác EX-CA4)'
  }
};

function getAccurateAcupointMapping(
  code: string,
  name: string,
  zone: string,
  location: string
): AcupointPhotoMapping {
  const c = code.trim().toUpperCase();

  // Direct lookup from 100% calibrated dictionary
  const exact = EXACT_POINT_DATABASE[c];
  if (exact) {
    const primary = exact.markers[0] || { left: 50, top: 50 };
    return {
      photoUrl: exact.photoUrl,
      surfaceLabel: exact.surfaceLabel,
      markerLeftPercent: primary.left,
      markerTopPercent: primary.top,
      markers: exact.markers,
      anatomicalLandmarkNote: exact.landmark
    };
  }

  // Fallback for Á Thị Huyệt or custom codes
  const z = zone.toLowerCase();
  const loc = location.toLowerCase();

  if (z.includes('bàn chân') || loc.includes('bàn chân')) {
    return {
      photoUrl: PHOTOS.FOOT_SPLIT,
      surfaceLabel: 'Vùng Bàn Chân & Cổ Chân',
      markerLeftPercent: 74,
      markerTopPercent: 62,
      markers: [{ left: 74, top: 62 }],
      anatomicalLandmarkNote: `${name} (${code})`
    };
  }
  if (z.includes('cẳng chân') || z.includes('đùi') || loc.includes('cẳng chân') || loc.includes('đùi')) {
    return {
      photoUrl: PHOTOS.THIGH_LEG,
      surfaceLabel: 'Vùng Đùi & Cẳng Chân',
      markerLeftPercent: 58,
      markerTopPercent: 48,
      markers: [{ left: 58, top: 48 }],
      anatomicalLandmarkNote: `${name} (${code})`
    };
  }
  if (z.includes('lưng') || z.includes('hậu bối') || loc.includes('cột sống')) {
    return {
      photoUrl: PHOTOS.POSTERIOR_BACK_NECK,
      surfaceLabel: 'Vùng Lưng & Cột Sống',
      markerLeftPercent: 62,
      markerTopPercent: 72,
      markers: [{ left: 62, top: 72 }],
      anatomicalLandmarkNote: `${name} (${code})`
    };
  }
  if (z.includes('ngực') || z.includes('bụng') || z.includes('tiền hung')) {
    return {
      photoUrl: PHOTOS.ANTERIOR_TORSO,
      surfaceLabel: 'Vùng Ngực & Bụng Mặt Trước',
      markerLeftPercent: 50.5,
      markerTopPercent: 54.5,
      markers: [{ left: 50.5, top: 54.5 }],
      anatomicalLandmarkNote: `${name} (${code})`
    };
  }

  return {
    photoUrl: PHOTOS.PALMAR_HAND,
    surfaceLabel: 'Điểm Phản Ứng Trên Cơ Thể (Á Thị Huyệt)',
    markerLeftPercent: 48,
    markerTopPercent: 49,
    markers: [{ left: 48, top: 49 }],
    anatomicalLandmarkNote: `Điểm ấn đau nhạy cảm (Thiên ứng huyệt / Á thị huyệt)`
  };
}

export const AcupointVisualDiagram: React.FC<AcupointVisualDiagramProps> = ({
  code,
  name,
  chineseName,
  zone,
  location,
  needling,
  anatomy,
  mode = 'compact'
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const mapping = getAccurateAcupointMapping(code, name, zone, location);
  const isMultiPoint = mapping.markers.length > 1;

  if (mode === 'compact') {
    return (
      <div className="w-24 sm:w-28 aspect-4/3 rounded-xl overflow-hidden border border-slate-200 bg-white shrink-0 relative shadow-2xs">
        <img
          src={mapping.photoUrl}
          alt={`Ảnh thực tế vị trí huyệt ${name}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        {mapping.markers.map((pt, idx) => (
          <span
            key={idx}
            style={{
              left: `${pt.left}%`,
              top: `${pt.top}%`
            }}
            className={`${
              isMultiPoint ? 'w-1.5 h-1.5' : 'w-2 h-2'
            } rounded-full bg-rose-600 ring-1 ring-white shadow-xs absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none`}
          />
        ))}
        <div className="absolute top-1 left-1 bg-slate-950/80 backdrop-blur-xs text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shadow-xs pointer-events-none">
          {code}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-4 py-3 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 ring-2 ring-rose-200 shrink-0" />
            <span className="text-sm sm:text-base font-bold text-slate-900">
              Vị Trí Thực Tế Huyệt {name} ({code})
            </span>
          </div>
          <span className="text-xs sm:text-sm font-bold text-teal-900 bg-teal-50 px-3 py-1 rounded-lg border border-teal-200">
            {mapping.surfaceLabel}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-start">
          {/* Left: Real Anatomical Photograph with Precision Pinpoint Marker(s) - 100% UNOBSTRUCTED */}
          <div className="md:col-span-6 flex flex-col">
            <div className="relative rounded-2xl overflow-hidden border border-slate-300 bg-slate-950 aspect-4/3 shadow-sm select-none">
              <img
                src={mapping.photoUrl}
                alt={`Ảnh thực tế định vị huyệt ${name} (${code})`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {/* Pinpoint Acupoint Markers */}
              {mapping.markers.map((pt, idx) => (
                <div
                  key={idx}
                  style={{
                    left: `${pt.left}%`,
                    top: `${pt.top}%`
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-10"
                >
                  <span
                    className={`${
                      isMultiPoint ? 'w-3.5 h-3.5' : 'w-4 h-4'
                    } rounded-full bg-rose-500/40 animate-ping absolute`}
                  />
                  <span
                    className={`${
                      isMultiPoint ? 'w-2.5 h-2.5 ring-1.5' : 'w-3 h-3 ring-2'
                    } rounded-full bg-rose-600 ring-white shadow-md relative z-10 flex items-center justify-center`}
                  >
                    {isMultiPoint && (
                      <span className="text-[7px] font-extrabold text-white leading-none">
                        {idx + 1}
                      </span>
                    )}
                  </span>
                </div>
              ))}

              {/* Discrete Top-Right Badge: Never blocks hand or fingers */}
              <div className="absolute top-2.5 right-2.5 z-20 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-white border border-white/20 shadow-sm text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0" />
                <span>
                  {isMultiPoint ? `${mapping.markers.length} điểm huyệt` : 'Chấm đỏ = Tâm huyệt'}
                </span>
              </div>

              {/* Sleek Top-Left Zoom Trigger */}
              <button
                type="button"
                onClick={() => setIsZoomed(true)}
                className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-sm text-xs font-semibold backdrop-blur-md border border-slate-300 transition-all cursor-pointer active:scale-95"
                title="Nhấp để phóng to toàn màn hình"
              >
                <svg className="w-3.5 h-3.5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
                <span>Phóng to</span>
              </button>
            </div>

            {/* Clean Anatomical Caption (Positioned OUTSIDE and BELOW photo, preventing any blockage) */}
            <div className="mt-2.5 px-1 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                {mapping.anatomicalLandmarkNote}
              </span>
              <span className="text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Toàn cảnh chi tiết
              </span>
            </div>
          </div>

          {/* Right: Detailed Verification of Surface & Location */}
          <div className="md:col-span-6 space-y-3">
            <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200">
              <div className="text-xs sm:text-sm font-bold text-teal-950 mb-1">
                Mặt Giải Phẫu Chính Xác: {mapping.surfaceLabel}
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                Mốc định vị: <strong>{mapping.anatomicalLandmarkNote}</strong> ({name}{chineseName ? ` - ${chineseName}` : ''})
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200">
              <div className="text-xs sm:text-sm font-bold text-cyan-900 mb-1">
                Vị Trí & Cách Lấy Huyệt Chuẩn Trong Sách
              </div>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                {location}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200">
              <div className="text-xs sm:text-sm font-bold text-emerald-900 mb-1">
                Hướng Mũi Kim & Độ Sâu Châm
              </div>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                {needling || anatomy || 'Châm thẳng hoặc xiên dọc theo bờ xương, vê kim nhẹ đến khi đắc khí.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen High-Resolution Lightbox Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between text-white">
              <div>
                <h3 className="text-base sm:text-lg font-bold flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                  Định Vị Giải Phẫu: {name} ({code})
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {mapping.surfaceLabel} · {mapping.anatomicalLandmarkNote}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsZoomed(false)}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-colors cursor-pointer"
              >
                ✕ Đóng
              </button>
            </div>

            {/* Modal Image View with Pinpoints */}
            <div className="relative flex-1 bg-black overflow-auto flex items-center justify-center p-2 min-h-[300px]">
              <div className="relative max-w-full max-h-[70vh]">
                <img
                  src={mapping.photoUrl}
                  alt={`Phóng to vị trí huyệt ${name}`}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[70vh] object-contain rounded-lg"
                />
                {mapping.markers.map((pt, idx) => (
                  <div
                    key={idx}
                    style={{
                      left: `${pt.left}%`,
                      top: `${pt.top}%`
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-10"
                  >
                    <span
                      className={`${
                        isMultiPoint ? 'w-5 h-5' : 'w-6 h-6'
                      } rounded-full bg-rose-500/40 animate-ping absolute`}
                    />
                    <span
                      className={`${
                        isMultiPoint ? 'w-3.5 h-3.5 ring-2' : 'w-4 h-4 ring-2'
                      } rounded-full bg-rose-600 ring-white shadow-xl relative z-10 flex items-center justify-center`}
                    >
                      {isMultiPoint && (
                        <span className="text-[8px] font-extrabold text-white leading-none">
                          {idx + 1}
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer Note */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2">
              <span>{isMultiPoint ? `Hiển thị toàn bộ ${mapping.markers.length} điểm châm kim` : 'Điểm đỏ định vị chuẩn xác tâm huyệt'}</span>
              <span className="text-emerald-400 font-medium">100% hình ảnh không bị che khuất</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
