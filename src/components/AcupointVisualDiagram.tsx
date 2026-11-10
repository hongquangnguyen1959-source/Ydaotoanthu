import React from 'react';

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

interface AcupointPhotoMapping {
  photoUrl: string;
  surfaceLabel: string;
  markerLeftPercent: number;
  markerTopPercent: number;
  anatomicalLandmarkNote: string;
}

// 100% verified Palmar vs Dorsal code sets from tungPoints.ts
const VERIFIED_PALMAR_HAND_CODES = new Set([
  '11.01', '11.02', '11.03', '11.04', '11.05', '11.06',
  '11.17', '11.18', '11.19', '11.20', '11.21', '11.22', '11.23', '11.27',
  '11.T01', '11.T02', '11.T05', '11.T06', '11.T07', '11.T08', '11.T09',
  '11.T11', '11.T12', '11.T13', '11.T14', '11.T15',
  '22.01', '22.02', '22.10', '22.11',
  '22.T05', '22.T06', '22.T07', '22.T08', '22.T12',
  'EX-UE10', 'EX-UE11'
]);

const VERIFIED_DORSAL_HAND_CODES = new Set([
  '11.07', '11.08', '11.09', '11.10', '11.11', '11.12', '11.13', '11.14', '11.15', '11.16',
  '11.24', '11.25', '11.26', '11.30', '11.T04', '11.T10', '11.T16',
  '22.03', '22.04', '22.05', '22.06', '22.07', '22.08', '22.09',
  '22.T01', '22.T02', '22.T03', '22.T04', '22.T09', '22.T10', '22.T11',
  'EX-UE3', 'EX-UE4', 'EX-UE5', 'EX-UE6', 'EX-UE7', 'EX-UE8', 'EX-UE9'
]);

function getAccurateAcupointMapping(
  code: string,
  name: string,
  zone: string,
  location: string
): AcupointPhotoMapping {
  const c = code.trim().toUpperCase();
  const loc = location.toLowerCase();
  const z = zone.toLowerCase();

  // =========================================================================
  // 1. KHU 11 (NGÓN TAY) & KHU 22 (BÀN TAY) & EX-UE (CHI TRÊN)
  // =========================================================================
  const isHandOrFinger =
    c.startsWith('11.') ||
    c.startsWith('22.') ||
    c.startsWith('EX-UE') ||
    z.includes('ngón tay') ||
    z.includes('bàn tay');

  if (isHandOrFinger) {
    // Forearm / Elbow WHO points (EX-UE1 Trửu Tiêm, EX-UE2 Nhị Bạch)
    if (c === 'EX-UE1' || c === 'EX-UE2') {
      const isElbow = c === 'EX-UE1';
      return {
        photoUrl: '/assets/images/real_acupoint_arm_forearm_1794278485426.jpg',
        surfaceLabel: isElbow ? 'Vùng Khuỷu Tay (Mỏm Khuỷu)' : 'Vùng Cẳng Tay (Trên Nếp Cổ Tay 4 Thốn)',
        markerLeftPercent: isElbow ? 74 : 44,
        markerTopPercent: isElbow ? 48 : 54,
        anatomicalLandmarkNote: isElbow ? 'Đỉnh mỏm khuỷu tay khi gấp khuỷu' : 'Mặt trước cẳng tay, cách nếp cổ tay 4 thốn'
      };
    }

    const firstClause = loc.split(',')[0] || loc;
    const isPalmar =
      VERIFIED_PALMAR_HAND_CODES.has(c) ||
      (!VERIFIED_DORSAL_HAND_CODES.has(c) &&
        (firstClause.includes('lòng bàn tay') ||
          firstClause.includes('mặt lòng') ||
          firstClause.includes('bàn tay ngửa')));

    if (isPalmar) {
      let left = 45;
      let top = 50;
      let landmark = 'Mặt lòng bàn tay (Bàn tay ngửa)';

      const isPollex = loc.includes('ngón cái') || loc.includes('ngón tay cái');
      const isIndex = loc.includes('ngón trỏ') || loc.includes('ngón tay trỏ');
      const isMiddle = loc.includes('ngón giữa') || loc.includes('ngón tay giữa');
      const isRing = loc.includes('vô danh') || loc.includes('áp út');
      const isLittle = loc.includes('ngón út') || loc.includes('ngón tay út');

      const isPhalanx3 = loc.includes('đốt thứ 3') || loc.includes('đốt thứ ba') || loc.includes('đốt 3');
      const isPhalanx2 = loc.includes('đốt thứ 2') || loc.includes('đốt thứ hai') || loc.includes('đốt thứ nhì') || loc.includes('đốt 2');

      if (c === '22.01') {
        left = 40;
        top = 28;
        landmark = 'Lòng bàn tay - Mô cái giữa xương bàn 1 và 2 (Huyệt Trọng Tử)';
      } else if (c === '22.02') {
        left = 35;
        top = 31;
        landmark = 'Lòng bàn tay - Giao điểm xương bàn 1 và 2 (Huyệt Trọng Tiên)';
      } else if (c === '22.11') {
        left = 38;
        top = 23;
        landmark = 'Lòng bàn tay - Bờ ngoài xương bàn ngón cái (Huyệt Thổ Thủy)';
      } else if (c === '22.10' || c === '22.T05') {
        left = 48;
        top = 67;
        landmark = 'Lòng bàn tay - Giữa xương bàn tay 4 và 5 (Thủ Giải / Thượng Hạ Cao)';
      } else if (c === '22.T06' || c === '22.T12') {
        left = 55;
        top = c === '22.T06' ? 70 : 56;
        landmark = 'Lòng bàn tay - Phía dưới kẽ ngón tay 2,5 phân (Tam Hà / Tam Xỉ)';
      } else if (c === '22.T07' || c === '22.T08') {
        left = 23;
        top = c === '22.T07' ? 42 : 58;
        landmark = 'Lòng bàn tay - Trên nếp ngang cổ tay 5 phân (Cốt Quan / Mộc Quan)';
      } else if (c === '11.27' || c === '11.T09' || isPollex) {
        left = c === '11.T09' ? 45 : 51;
        top = c === '11.T09' ? 21 : 17;
        landmark = 'Mặt lòng đốt 1 ngón tay cái (Ngũ Hổ / Khỏa Linh)';
      } else if (c === '11.T01') {
        left = 75;
        top = 49;
        landmark = 'Mặt lòng ngón tay giữa - Hai bên lằn chỉ khớp đốt 1 và đốt 2 (Song Linh)';
      } else if (c === '11.T02') {
        left = 72;
        top = 63;
        landmark = 'Mặt lòng ngón áp út - Hai bên lằn chỉ khớp đốt 1 và đốt 2 (Mộc Linh)';
      } else if (c === 'EX-UE10') {
        left = 74;
        top = 49;
        landmark = 'Mặt lòng 4 ngón tay - Chính giữa lằn chỉ khớp đốt 1 và 2 (Tứ Phùng)';
      } else if (c === 'EX-UE11') {
        left = 90;
        top = 49;
        landmark = 'Đầu chóp 10 ngón tay (Huyệt Thập Tuyên)';
      } else if (isIndex) {
        left = isPhalanx3 ? 85 : isPhalanx2 ? 77 : 68;
        top = c === '11.17' ? 37 : 33;
        landmark = `Mặt lòng ngón tay trỏ - ${isPhalanx3 ? 'Đốt 3' : isPhalanx2 ? 'Đốt 2' : 'Đốt 1'} (${name})`;
      } else if (isMiddle) {
        left = isPhalanx3 ? 89 : isPhalanx2 ? 80 : 70;
        top = 49;
        landmark = `Mặt lòng ngón tay giữa - ${isPhalanx3 ? 'Đốt 3' : isPhalanx2 ? 'Đốt 2' : 'Đốt 1'} (${name})`;
      } else if (isRing) {
        left = isPhalanx3 ? 85 : isPhalanx2 ? 77 : 68;
        top = 63;
        landmark = `Mặt lòng ngón áp út / vô danh - ${isPhalanx3 ? 'Đốt 3' : isPhalanx2 ? 'Đốt 2' : 'Đốt 1'} (${name})`;
      } else if (isLittle) {
        left = isPhalanx3 ? 76 : isPhalanx2 ? 70 : 63;
        top = 77;
        landmark = `Mặt lòng ngón tay út - ${isPhalanx3 ? 'Đốt 3' : isPhalanx2 ? 'Đốt 2' : 'Đốt 1'} (${name})`;
      }

      return {
        photoUrl: '/assets/images/real_hand_palmar_1794279448548.jpg',
        surfaceLabel: 'Mặt Lòng Bàn Tay (Bàn Tay Ngửa)',
        markerLeftPercent: left,
        markerTopPercent: top,
        anatomicalLandmarkNote: landmark
      };
    }

    // DORSAL HAND & DORSAL FINGERS
    let left = 46;
    let top = 48;
    let landmark = 'Mặt lưng / mu bàn tay (Bàn tay úp)';

    const isPollex = loc.includes('ngón cái') || loc.includes('ngón tay cái');
    const isIndex = loc.includes('ngón trỏ') || loc.includes('ngón tay trỏ');
    const isMiddle = loc.includes('ngón giữa') || loc.includes('ngón tay giữa');
    const isRing = loc.includes('vô danh') || loc.includes('áp út');
    const isLittle = loc.includes('ngón út') || loc.includes('ngón tay út');
    const isPhalanx2 = loc.includes('đốt thứ 2') || loc.includes('đốt thứ hai') || loc.includes('đốt thứ nhì') || loc.includes('đốt 2');

    if (c === '22.05') {
      left = 38;
      top = 29;
      landmark = 'Mu bàn tay - Chỗ giao xương bàn ngón cái và ngón trỏ (Huyệt Linh Cốt)';
    } else if (c === '22.04' || c === '22.T01') {
      left = 46;
      top = 31;
      landmark = 'Mu bàn tay - Giữa xương bàn 1 và 2, cách Linh Cốt 1 thốn (Huyệt Đại Bạch)';
    } else if (c === '22.03' || c === '22.T04' || c === 'EX-UE8') {
      left = c === '22.T04' ? 42 : 49;
      top = 41;
      landmark = 'Mu bàn tay - Khoảng giữa xương bàn tay 2 và 3 (Thượng Bạch / Lạc Chẩm)';
    } else if (c === '22.T02' || c === '22.T03') {
      left = c === '22.T03' ? 41 : 48;
      top = 54;
      landmark = 'Mu bàn tay - Khoảng giữa xương bàn tay 3 và 4 (Nội Bạch / Ngoại Bạch)';
    } else if (c === '22.06' || c === '22.07') {
      left = c === '22.06' ? 47 : 40;
      top = 66;
      landmark = 'Mu bàn tay - Khoảng giữa xương bàn tay 4 và 5 (Trung Bạch / Hạ Bạch)';
    } else if (c === '22.08' || c === '22.09') {
      left = c === '22.08' ? 36 : 30;
      top = 73;
      landmark = 'Bờ ngoài mu bàn tay - Dọc bờ xương bàn ngón út (Uyển Thuận 1 & 2)';
    } else if (c === '22.T09' || c === '22.T10' || c === '22.T11' || c === 'EX-UE9') {
      left = 58;
      top = c === '22.T09' ? 41 : c === '22.T10' ? 55 : c === '22.T11' ? 69 : 48;
      landmark = 'Mu bàn tay - Khe kẽ giữa các ngón tay (Tam Xoa / Bát Tà)';
    } else if (c === '11.10') {
      left = 82;
      top = 48;
      landmark = 'Mặt lưng 4 ngón tay - Chính giữa khớp liên đốt xa (Tứ Mộc Hỏa)';
    } else if (c === '11.30') {
      left = 64;
      top = 48;
      landmark = 'Mặt lưng đốt 1 của 4 ngón tay (Huyệt Bát Quan)';
    } else if (isPollex || c === 'EX-UE5') {
      left = 51;
      top = c === '11.24' ? 21 : c === '11.25' ? 15 : 18;
      landmark = 'Mặt lưng ngón tay cái (Phụ Khoa / Chỉ Diên / Chế Ô)';
    } else if (isIndex) {
      left = isPhalanx2 ? 76 : 66;
      top = 33;
      landmark = `Mặt lưng ngón tay trỏ - ${isPhalanx2 ? 'Đốt 2' : 'Đốt 1'} (${name})`;
    } else if (isMiddle || c === 'EX-UE4') {
      left = isPhalanx2 ? 78 : 67;
      top = 48;
      landmark = `Mặt lưng ngón tay giữa - ${isPhalanx2 ? 'Đốt 2' : 'Đốt 1'} (${name})`;
    } else if (isRing) {
      left = isPhalanx2 ? 75 : 65;
      top = 62;
      landmark = `Mặt lưng ngón áp út - ${isPhalanx2 ? 'Đốt 2' : 'Đốt 1'} (${name})`;
    } else if (isLittle || c === 'EX-UE6') {
      left = c === '11.16' ? 62 : 55;
      top = 80;
      landmark = `Mặt lưng ngón tay út (${name})`;
    } else if (c === 'EX-UE3') {
      left = 20;
      top = 46;
      landmark = 'Nếp gấp cổ tay phía mu tay (Huyệt Trung Tuyền)';
    }

    return {
      photoUrl: '/assets/images/real_hand_dorsal_1794279449692.jpg',
      surfaceLabel: 'Mặt Lưng / Mu Bàn Tay (Bàn Tay Úp)',
      markerLeftPercent: left,
      markerTopPercent: top,
      anatomicalLandmarkNote: landmark
    };
  }

  // =========================================================================
  // 2. KHU 33 (CẲNG TAY) & KHU 44 (CÁNH TAY)
  // =========================================================================
  if (c.startsWith('33.') || c.startsWith('44.') || z.includes('cẳng tay') || z.includes('cánh tay')) {
    const isUpperArm = c.startsWith('44.') || z.includes('cánh tay');
    if (isUpperArm) {
      const isNearShoulder = loc.includes('vai') || loc.includes('mỏm cùng') || c === '44.06' || c === '44.07' || c === '44.11' || c === '44.17' || c === '44.T01';
      return {
        photoUrl: '/assets/images/real_acupoint_arm_forearm_1794278485426.jpg',
        surfaceLabel: 'Vùng Cánh Tay & Khớp Vai (Khu 44)',
        markerLeftPercent: isNearShoulder ? 91 : 84,
        markerTopPercent: isNearShoulder ? 20 : 34,
        anatomicalLandmarkNote: isNearShoulder
          ? 'Phần trên cánh tay dưới mỏm cùng vai (Kiên Trung / Vân Bạch)'
          : 'Mặt ngoài / sau xương cánh tay trên khuỷu tay (Khu 44)'
      };
    }

    const isNearElbow = loc.includes('khuỷu') || loc.includes('xích trạch') || loc.includes('thiếu hải') || c === '33.07' || c === '33.12' || c === '33.16' || c === '33.T02';
    const isNearWrist = loc.includes('1,5 thốn') || loc.includes('2 thốn') || loc.includes('2,5 thốn') || loc.includes('3 thốn') || c === '33.01' || c === '33.05' || c === '33.10' || c === '33.13' || c === '33.T01' || c === '33.T04';
    return {
      photoUrl: '/assets/images/real_acupoint_arm_forearm_1794278485426.jpg',
      surfaceLabel: 'Vùng Cẳng Tay Từ Cổ Tay Đến Khuỷu Tay (Khu 33)',
      markerLeftPercent: isNearElbow ? 70 : isNearWrist ? 43 : 56,
      markerTopPercent: isNearElbow ? 47 : isNearWrist ? 55 : 52,
      anatomicalLandmarkNote: isNearElbow
        ? 'Phần trên cẳng tay gần nếp khuỷu tay'
        : isNearWrist
        ? 'Phần dưới cẳng tay cách nếp cổ tay 1,5 - 3 thốn'
        : 'Đoạn giữa cẳng tay dọc xương quay - xương trụ'
    };
  }

  // =========================================================================
  // 3. KHU 55 (LÒNG BÀN CHÂN) vs KHU 66 (MU BÀN CHÂN & CỔ CHÂN)
  // =========================================================================
  if (
    c.startsWith('55.') ||
    c.startsWith('66.') ||
    z.includes('lòng bàn chân') ||
    z.includes('mu bàn chân') ||
    c === 'EX-LE10' ||
    c === 'EX-LE11' ||
    c === 'EX-LE12'
  ) {
    const isPlantarFoot = c.startsWith('55.') || z.includes('lòng bàn chân') || c === 'EX-LE11';

    if (isPlantarFoot) {
      let left = 26;
      let top = 40;
      let landmark = 'Mặt lòng bàn chân / Gan bàn chân (Khu 55)';

      if (c === '55.01') {
        left = 25;
        top = 24;
        landmark = 'Mặt lòng ngón chân thứ 2 - Chính giữa lằn chỉ đốt 1 và 2 (Hỏa Bao)';
      } else if (c === '55.02') {
        left = 21;
        top = 36;
        landmark = 'Lòng bàn chân - Kẽ giữa xương bàn chân 1 và 2 (Hoa Cốt Nhất)';
      } else if (c === '55.03') {
        left = 25;
        top = 37;
        landmark = 'Lòng bàn chân - Kẽ giữa xương bàn chân 2 và 3 (Hoa Cốt Nhị)';
      } else if (c === '55.04') {
        left = 29;
        top = 39;
        landmark = 'Lòng bàn chân - Kẽ giữa xương bàn chân 3 và 4 (Hoa Cốt Tam)';
      } else if (c === '55.05') {
        left = 33;
        top = 42;
        landmark = 'Lòng bàn chân - Kẽ giữa xương bàn chân 4 và 5 (Hoa Cốt Tư)';
      } else if (c === '55.06') {
        left = 26;
        top = 56;
        landmark = 'Lòng bàn chân - Chính giữa bờ trước đệm gót chân (Thượng Lưu)';
      }

      return {
        photoUrl: '/assets/images/real_foot_plantar_dorsal_1794279452126.jpg',
        surfaceLabel: 'Mặt Lòng Bàn Chân / Gan Bàn Chân (Khu 55)',
        markerLeftPercent: left,
        markerTopPercent: top,
        anatomicalLandmarkNote: landmark
      };
    }

    // DORSAL & MEDIAL FOOT (Khu 66 & EX-LE10)
    let left = 74;
    let top = 62;
    let landmark = 'Mặt mu bàn chân (Khu 66)';

    if (c === '66.01') {
      left = 83;
      top = 77;
      landmark = 'Mặt trong đốt 1 ngón chân cái (Huyệt Hải Báo)';
    } else if (c === '66.02') {
      left = 76;
      top = 77;
      landmark = 'Mặt lưng đốt 2 ngón chân thứ 2 (Huyệt Mộc Phụ)';
    } else if (c === '66.03' || c === '66.04') {
      left = 79;
      top = c === '66.03' ? 67 : 59;
      landmark = 'Mu bàn chân - Khe giữa xương bàn chân 1 và 2 (Hỏa Ngạnh / Hỏa Chủ)';
    } else if (c === '66.05') {
      left = 75;
      top = 61;
      landmark = 'Mu bàn chân - Khe giữa xương bàn chân 2 và 3 (Huyệt Môn Kim)';
    } else if (c === '66.06' || c === '66.07') {
      left = 71;
      top = c === '66.07' ? 66 : 59;
      landmark = 'Mu bàn chân - Khe giữa xương bàn chân 3 và 4 (Mộc Lưu / Mộc Đấu)';
    } else if (c === '66.08' || c === '66.09') {
      left = 66;
      top = c === '66.08' ? 67 : 60;
      landmark = 'Mu bàn chân - Khe giữa xương bàn chân 4 và 5 (Lục Hoàn / Thủy Khúc)';
    } else if (c === '66.10' || c === '66.11' || c === '66.12') {
      left = 82;
      top = c === '66.10' ? 58 : c === '66.11' ? 50 : 42;
      landmark = 'Bờ trong bàn chân - Bờ dưới xương bàn ngón 1 (Hỏa Liên - Hỏa Cúc - Hỏa Tản)';
    } else if (c === '66.13' || c === '66.14' || c === '66.15') {
      left = 80;
      top = 30;
      landmark = 'Mặt trong cổ chân quanh mắt cá trong (Thủy Tinh - Thủy Tương - Thủy Tiên)';
    } else if (c === 'EX-LE10') {
      left = 73;
      top = 75;
      landmark = 'Mu bàn chân - Kẽ giữa 5 ngón chân (Huyệt Bát Phong)';
    }

    return {
      photoUrl: '/assets/images/real_foot_plantar_dorsal_1794279452126.jpg',
      surfaceLabel: 'Mặt Mu Bàn Chân & Cổ Chân (Khu 66)',
      markerLeftPercent: left,
      markerTopPercent: top,
      anatomicalLandmarkNote: landmark
    };
  }

  // =========================================================================
  // 4. KHU 77 (CẲNG CHÂN) & KHU 88 (ĐÙI) & EX-LE (CHI DƯỚI)
  // =========================================================================
  if (
    c.startsWith('77.') ||
    c.startsWith('88.') ||
    c.startsWith('EX-LE') ||
    z.includes('cẳng chân') ||
    z.includes('đùi') ||
    z.includes('chi dưới')
  ) {
    if (c.startsWith('88.') || z.includes('đùi')) {
      let left = 32;
      let top = 26;
      let landmark = 'Vùng đùi (Khu 88)';

      if (c === '88.01' || c === '88.02' || c === '88.03' || c === '88.29' || c === '88.30' || c === '88.31') {
        left = c === '88.01' || c === '88.29' ? 35 : c === '88.02' || c === '88.30' ? 30 : 25;
        top = c === '88.01' || c === '88.29' ? 30 : c === '88.02' || c === '88.30' ? 25 : 20;
        landmark = 'Đường chính giữa mặt trước đùi (Thông Quan - Thông Sơn - Thông Thiên)';
      } else if (c === '88.09' || c === '88.10' || c === '88.11' || c === '88.32') {
        left = 41;
        top = 31;
        landmark = 'Mặt trước-trong đùi - Góc trên-trong xương bánh chè (Thông Thận - Thông Vị - Thông Bối)';
      } else if (
        c === '88.12' || c === '88.13' || c === '88.14' || c === '88.15' || c === '88.16' ||
        c === '88.04' || c === '88.05' || c === '88.06' || c === '88.07' || c === '88.08'
      ) {
        left = 33;
        top = 18;
        landmark = 'Mặt trong đùi (Thiên Hoàng - Minh Hoàng - Kỳ Hoàng)';
      } else {
        left = 26;
        top = 33;
        landmark = 'Mặt trước-ngoài đùi (Nhóm huyệt Tứ Mã / Thượng Trung Hạ Cửu Lý)';
      }

      return {
        photoUrl: '/assets/images/real_thigh_lower_leg_1794279486124.jpg',
        surfaceLabel: 'Vùng Đùi & Trên Khớp Gối (Khu 88)',
        markerLeftPercent: left,
        markerTopPercent: top,
        anatomicalLandmarkNote: landmark
      };
    }

    let left = 62;
    let top = 54;
    let landmark = 'Vùng cẳng chân (Khu 77)';

    if (c === '77.15' || c === '77.16' || c === 'EX-LE2' || c === 'EX-LE4' || c === 'EX-LE5' || loc.includes('bánh chè')) {
      left = 46;
      top = 38;
      landmark = 'Vùng khớp gối và quanh xương bánh chè';
    } else if (c === '77.17' || c === '77.18') {
      left = c === '77.17' ? 54 : 58;
      top = c === '77.17' ? 43 : 46;
      landmark = 'Mặt trong cẳng chân - Dưới lồi cầu trong xương chày (Thiên Hoàng / Thận Quan)';
    } else if (c === '77.19' || c === '77.20' || c === '77.21' || c === '77.28') {
      left = 72;
      top = 56;
      landmark = 'Mặt trong cẳng chân - Sát bờ sau xương chày (Địa Hoàng / Nhân Hoàng)';
    } else if (c === '77.01' || c === '77.02' || c === '77.03' || c === '77.04' || c === '77.26') {
      left = 83;
      top = 72;
      landmark = 'Vùng cổ chân và gân gót Achilles (Chính Cân - Chính Tông)';
    } else {
      left = 63;
      top = 54;
      landmark = 'Mặt trước-ngoài cẳng chân (Tứ Hoa / Tam Trọng / Trắc Tam Lý)';
    }

    return {
      photoUrl: '/assets/images/real_thigh_lower_leg_1794279486124.jpg',
      surfaceLabel: 'Vùng Đầu Gối & Cẳng Chân (Khu 77)',
      markerLeftPercent: left,
      markerTopPercent: top,
      anatomicalLandmarkNote: landmark
    };
  }

  // =========================================================================
  // 5. KHU TIỀN HUNG (NGỰC BỤNG) & EX-CA (VÙNG BỤNG)
  // =========================================================================
  if (
    c.startsWith('VT') ||
    c.startsWith('EX-CA') ||
    z.includes('tiền hung') ||
    z.includes('ngực') ||
    z.includes('bụng')
  ) {
    let left = 50;
    let top = 52;
    let landmark = 'Vùng ngực bụng mặt trước (Khu Tiền Hung)';

    if (c === 'VT01' || c === 'VT02' || c === 'VT03') {
      left = 50;
      top = 24;
      landmark = 'Vùng ngực trên và đường giữa xương ức';
    } else if (c === 'VT04') {
      left = 50;
      top = 38;
      landmark = 'Vùng thượng vị phía trên rốn (Vị Mao Thất)';
    } else if (c === 'VT05' || c === 'EX-CA1') {
      left = c === 'EX-CA1' ? 56 : 50;
      top = 66;
      landmark = 'Vùng quanh rốn và bụng dưới (Phủ Sào / Huyệt Tử Cung)';
    }

    return {
      photoUrl: '/assets/images/real_anterior_torso_abdomen_1794279534877.jpg',
      surfaceLabel: 'Vùng Ngực & Bụng Mặt Trước (Khu Tiền Hung)',
      markerLeftPercent: left,
      markerTopPercent: top,
      anatomicalLandmarkNote: landmark
    };
  }

  // =========================================================================
  // 6. KHU HẬU BỐI (LƯNG) & EX-B (VÙNG LƯNG) & VÙNG GÁY CHẨM SAU
  // =========================================================================
  const isBackOrPosteriorNeck =
    c.startsWith('DT') ||
    c.startsWith('EX-B') ||
    z.includes('hậu bối') ||
    z.includes('lưng') ||
    c === '1010.07' ||
    c === '1010.25' ||
    c === 'EX-HN15';

  if (isBackOrPosteriorNeck) {
    const isPosteriorNeck = c === '1010.07' || c === '1010.25' || c === 'EX-HN15';
    return {
      photoUrl: '/assets/images/real_acupoint_head_ear_back_1794278488167.jpg',
      surfaceLabel: isPosteriorNeck ? 'Vùng Gáy Sau & Ụ Chẩm' : 'Vùng Cột Sống Lưng & Giáp Tích (Khu Hậu Bối)',
      markerLeftPercent: isPosteriorNeck ? (c === '1010.25' ? 56 : 58) : 68,
      markerTopPercent: isPosteriorNeck ? (c === '1010.25' ? 28 : c === '1010.07' ? 37 : 48) : 68,
      anatomicalLandmarkNote:
        c === '1010.25'
          ? 'Đỉnh ụ chẩm ngoài phía sau đầu (Huyệt Châu Thủy)'
          : c === '1010.07'
          ? 'Chính giữa gáy sau, trong hõm dưới ụ chẩm ngoài (Huyệt Tổng Khu)'
          : c === 'EX-HN15'
          ? 'Vùng gáy: Từ Đại Chùy (C7) đo lên 2 thốn, ngang ra 1 thốn (Huyệt Bách Lao)'
          : 'Dọc hai bên cột sống lưng và Hoa Đà Giáp Tích (Khu Hậu Bối)'
    };
  }

  // =========================================================================
  // 7. VÙNG ĐỈNH ĐẦU (CROWN / VERTEX) & VÙNG THÁI DƯƠNG - LOA TAI - SAU TAI
  // Uses split clinical photo: real_head_crown_temple_profile_1794280774865.jpg
  // Left panel (x: 0..49%) = Top-down Crown of Head (Đỉnh đầu)
  // Right panel (x: 51..100%) = Lateral Profile of Temple, Ear, Mastoid & Cheek
  // =========================================================================
  const isCrownVertex =
    c === '1010.01' ||
    c === '1010.02' ||
    c === '1010.03' ||
    c === '1010.04' ||
    c === '1010.05' ||
    c === '1010.06' ||
    c === 'EX-HN1';

  if (isCrownVertex) {
    let left = 25;
    let top = 58;
    let landmark = 'Chính giữa đỉnh đầu - Giao điểm đường dọc giữa đầu và đường nối hai đỉnh tai (Chính Hội 1010.01)';

    if (c === '1010.05') {
      left = 25;
      top = 41;
      landmark = 'Đỉnh đầu - Từ Chính Hội đo thẳng ra phía trước 1,5 thốn (Tiền Hội 1010.05)';
    } else if (c === '1010.06') {
      left = 25;
      top = 74;
      landmark = 'Đỉnh đầu - Từ Chính Hội đo thẳng ra phía sau 1,6 thốn (Hậu Hội 1010.06)';
    } else if (c === '1010.02') {
      left = 16;
      top = 58;
      landmark = 'Đỉnh đầu - Từ Chính Hội đo ngang sang hai bên trái/phải 1,3 thốn (Châu Viên 1010.02)';
    } else if (c === '1010.04') {
      left = 16;
      top = 41;
      landmark = 'Đỉnh đầu - Từ Châu Viên đo thẳng ra phía trước 1,5 thốn (Châu Luân 1010.04)';
    } else if (c === '1010.03') {
      left = 16;
      top = 74;
      landmark = 'Đỉnh đầu - Từ Châu Viên đo thẳng ra phía sau 1,5 thốn (Châu Côn 1010.03)';
    } else if (c === 'EX-HN1') {
      left = 25;
      top = 55;
      landmark = 'Đỉnh đầu - 4 huyệt cách Bách Hội trước, sau, trái, phải mỗi bên 1 thốn (Tứ Thần Thông EX-HN1)';
    }

    return {
      photoUrl: '/assets/images/real_head_crown_temple_profile_1794280774865.jpg',
      surfaceLabel: 'Mặt Nhìn Từ Trên Đỉnh Đầu Xuống (Đỉnh Sọ)',
      markerLeftPercent: left,
      markerTopPercent: top,
      anatomicalLandmarkNote: landmark
    };
  }

  const isLateralHeadOrEar =
    c.startsWith('99.') ||
    z.includes('tai') ||
    c === '1010.18' ||
    c === '1010.23' ||
    c === '1010.24' ||
    c === 'EX-HN5' ||
    c === 'EX-HN6' ||
    c === 'EX-HN14' ||
    c === 'EX-HN16' ||
    c === 'EX-HN17';

  if (isLateralHeadOrEar) {
    let left = 62.5;
    let top = 53;
    let landmark = 'Vùng loa tai và thái dương bên đầu';

    if (c === '99.01') {
      left = 65;
      top = 62.5;
      landmark = 'Chính giữa mặt ngoài dái tai / thùy tai (Nhĩ Hoàn 99.01)';
    } else if (c === '99.08' || c === 'EX-HN6') {
      left = 61.5;
      top = 43.5;
      landmark = 'Đỉnh cao nhất của vành tai (Nhĩ Tiêm EX-HN6 / Nhĩ Tam 99.08)';
    } else if (c === '99.02' || c === '99.05' || c === '99.07') {
      left = 58.5;
      top = c === '99.05' ? 47 : 52;
      landmark = `Mặt sau lưng vành tai (${name} - ${c})`;
    } else if (c === '99.03' || c === '99.04' || c === '99.06') {
      left = 62.5;
      top = c === '99.03' ? 50 : c === '99.04' ? 53 : 56;
      landmark = `Mặt trước loa tai / đối luân (${name} - ${c})`;
    } else if (c === '1010.23') {
      left = 62;
      top = 31.5;
      landmark = 'Vùng thái dương trên tai - Từ đỉnh vành tai đo thẳng lên 1,5 thốn (Châu Hỏa 1010.23)';
    } else if (c === '1010.24') {
      left = 56.5;
      top = 32.5;
      landmark = 'Vùng trên-sau tai - Từ Châu Hỏa đo ngang ra phía sau 1 thốn (Châu Kim 1010.24)';
    } else if (c === 'EX-HN5') {
      left = 81.5;
      top = 43.5;
      landmark = 'Chỗ lõm xương thái dương, sau điểm giữa đuôi mày và đuôi mắt 1 thốn (Huyệt Thái Dương)';
    } else if (c === '1010.18') {
      left = 73.5;
      top = 57.5;
      landmark = 'Vùng má trước tai - Dưới khớp thái dương hàm / huyệt Hạ Quan 1 thốn (Mộc Chi 1010.18)';
    } else if (c === 'EX-HN17') {
      left = 70.5;
      top = 61;
      landmark = 'Từ dái tai đo ra trước 0,5 thốn trên cơ cắn (Huyệt Khiên Chính EX-HN17)';
    } else if (c === 'EX-HN14') {
      left = 58;
      top = 64.5;
      landmark = 'Vùng sau tai - Từ Ế Phong đo ra sau 1 thốn dưới mỏm chũm (Huyệt Ế Minh EX-HN14)';
    } else if (c === 'EX-HN16') {
      left = 55;
      top = 66.5;
      landmark = 'Vùng sau dái tai - Điểm giữa đường nối Ế Phong và Phong Trì (Huyệt An Miên EX-HN16)';
    }

    return {
      photoUrl: '/assets/images/real_head_crown_temple_profile_1794280774865.jpg',
      surfaceLabel: 'Mặt Nghiêng Đầu – Thái Dương – Loa Tai & Sau Tai',
      markerLeftPercent: left,
      markerTopPercent: top,
      anatomicalLandmarkNote: landmark
    };
  }

  // =========================================================================
  // 8. KHUÔN MẶT CHÍNH DIỆN (CLOSE-UP FRONT FACE: KHU 1010 & EX-HN)
  // Uses close-up symmetrical face photo: real_face_closeup_front_1794280802766.jpg
  // =========================================================================
  let left = 50;
  let top = 30.5;
  let landmark = 'Vùng khuôn mặt chính diện (Khu 1010)';

  if (c === 'EX-HN2') {
    left = 38.5;
    top = 9;
    landmark = 'Từ thẳng con ngươi mắt đo lên vùng trán, cách chân tóc trước 1 thốn (Đương Dương EX-HN2)';
  } else if (c === 'EX-HN3') {
    left = 50;
    top = 30.5;
    landmark = 'Chính giữa điểm nối hai đầu trong lông mày (Huyệt Ấn Đường EX-HN3)';
  } else if (c === '1010.08') {
    left = 50;
    top = 26.5;
    landmark = 'Giữa hai đầu lông mày, từ Ấn Đường đo thẳng lên 3 phân (Trấn Tĩnh 1010.08)';
  } else if (c === '1010.09') {
    left = 44;
    top = 27.5;
    landmark = 'Từ đầu trong lông mày (Toàn Trúc) đo thẳng lên 2 phân (Thượng Lý 1010.09)';
  } else if (c === 'EX-HN4') {
    left = 38.5;
    top = 29;
    landmark = 'Chính giữa cung lông mày, thẳng phía trên con ngươi mắt (Ngư Yêu EX-HN4)';
  } else if (c === '1010.10') {
    left = 38.5;
    top = 26.5;
    landmark = 'Chính giữa cung lông mày (Ngư Yêu) đo thẳng lên 2 phân (Tứ Phủ Nhị 1010.10)';
  } else if (c === '1010.11') {
    left = 30.5;
    top = 28;
    landmark = 'Từ đuôi lông mày (Ty Trúc Không) đo thẳng lên 2 phân (Tứ Phủ Nhất 1010.11)';
  } else if (c === 'EX-HN7') {
    left = 34.5;
    top = 39.5;
    landmark = 'Điểm nối 1/4 ngoài và 3/4 trong của bờ dưới ổ mắt (Huyệt Cầu Hậu EX-HN7)';
  } else if (c === '1010.21') {
    left = 38.5;
    top = 44;
    landmark = 'Ngay tại lỗ dưới ổ mắt, thẳng dưới con ngươi (Ngọc Hỏa 1010.21 / Tứ Bạch)';
  } else if (c === 'EX-HN8') {
    left = 44.5;
    top = 46;
    landmark = 'Điểm cao nhất của rãnh mũi - má, nơi tiếp giáp xương mũi và sụn mũi (Thượng Nghinh Hương EX-HN8)';
  } else if (c === '1010.12') {
    left = 50;
    top = 52.5;
    landmark = 'Ngay chính giữa đỉnh chóp mũi (Chính Bổn 1010.12 / Tố Liêu)';
  } else if (c === '1010.22') {
    left = 42.5;
    top = 52.5;
    landmark = 'Chính giữa rãnh trên của cánh mũi nơi tiếp giáp với má (Tị Dực 1010.22)';
  } else if (c === 'EX-HN9') {
    left = 44.5;
    top = 55.5;
    landmark = 'Trên niêm mạc bên trong lỗ mũi phía trên sụn cánh mũi (Nội Nghinh Hương EX-HN9)';
  } else if (c === '1010.15') {
    left = 40.5;
    top = 55;
    landmark = 'Từ bờ ngoài cánh mũi đo ngang ra 5 phân gần Nghinh Hương (Phủ Khoái 1010.15)';
  } else if (c === '1010.13') {
    left = 33.5;
    top = 54;
    landmark = 'Chỗ lõm bờ dưới xương gò má, thẳng từ khóe mắt ngoài kéo xuống ngang cánh mũi (Mã Kim Thủy 1010.13)';
  } else if (c === '1010.14') {
    left = 33.5;
    top = 58.5;
    landmark = 'Ngay phía dưới huyệt Mã Kim Thủy 4 phân, ngang bờ dưới lỗ mũi (Mã Khoái Thủy 1010.14)';
  } else if (c === '1010.16') {
    left = 40.5;
    top = 67.5;
    landmark = 'Từ giữa nhân trung đo ngang ra 1,4 thốn, nằm phía trên khóe miệng 4 phân (Lục Khoái 1010.16)';
  } else if (c === '1010.17') {
    left = 36.5;
    top = 72.5;
    landmark = 'Từ khóe miệng (Địa Thương) đo ngang ra ngoài 5 phân (Thất Khoái 1010.17)';
  } else if (c === '1010.19') {
    left = 40.2;
    top = 78;
    landmark = 'Dưới khóe miệng (Địa Thương) đo thẳng xuống 4 phân trên vùng cằm (Thủy Thông 1010.19)';
  } else if (c === '1010.20') {
    left = 44.5;
    top = 78;
    landmark = 'Trên vùng cằm, từ Thủy Thông đo ngang vào phía trong 5 phân (Thủy Kim 1010.20)';
  } else if (c === 'EX-HN18') {
    left = 50;
    top = 92;
    landmark = 'Chính giữa dưới cằm, chỗ lõm giữa bờ dưới hàm dưới và xương móng (Thượng Liêm Tuyền EX-HN18)';
  } else if (c === 'EX-HN10' || c === 'EX-HN11' || c.includes('EX-HN12') || c.includes('EX-HN13')) {
    left = 50;
    top = 72.5;
    landmark =
      c === 'EX-HN10'
        ? 'Trong khoang miệng: Chính giữa mặt trên lưỡi (Huyệt Tụ Tuyền EX-HN10)'
        : c === 'EX-HN11'
        ? 'Trong khoang miệng: Cong lưỡi lên, chính giữa dây hãm lưỡi dưới lưỡi (Hải Tuyền EX-HN11)'
        : 'Trong khoang miệng: Cong lưỡi lên, trên tĩnh mạch dưới lưỡi hai bên hãm lưỡi (Kim Tân & Ngọc Dịch)';
  }

  return {
    photoUrl: '/assets/images/real_face_closeup_front_1794280802766.jpg',
    surfaceLabel: 'Khuôn Mặt Chính Diện Cận Cảnh (Khu 1010 & EX-HN)',
    markerLeftPercent: left,
    markerTopPercent: top,
    anatomicalLandmarkNote: landmark
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
  const mapping = getAccurateAcupointMapping(code, name, zone, location);

  if (mode === 'compact') {
    return (
      <div className="w-24 sm:w-28 aspect-4/3 rounded-xl overflow-hidden border border-slate-200 bg-white shrink-0 relative shadow-2xs">
        <img
          src={mapping.photoUrl}
          alt={`Ảnh thực tế vị trí huyệt ${name}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <span
          style={{
            left: `${mapping.markerLeftPercent}%`,
            top: `${mapping.markerTopPercent}%`
          }}
          className="w-3.5 h-3.5 rounded-full bg-rose-600 border-2 border-white shadow-md absolute -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute bottom-0 inset-x-0 bg-slate-900/85 text-white text-[10px] font-bold text-center py-0.5 truncate px-1">
          {code}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden shadow-xs">
      <div className="px-4 py-3 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-rose-600 shrink-0" />
          <span className="text-sm sm:text-base font-bold text-slate-900">
            Vị Trí Thực Tế Huyệt {name} ({code})
          </span>
        </div>
        <span className="text-xs sm:text-sm font-bold text-teal-900 bg-teal-50 px-3 py-1 rounded-lg border border-teal-200">
          {mapping.surfaceLabel}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center">
        {/* Left: Real Anatomical Photograph with Exact Surface & Coordinate Marker */}
        <div className="md:col-span-6 relative rounded-xl overflow-hidden border border-slate-300 bg-white aspect-4/3">
          <img
            src={mapping.photoUrl}
            alt={`Ảnh thực tế định vị huyệt ${name} (${code})`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div
            style={{
              left: `${mapping.markerLeftPercent}%`,
              top: `${mapping.markerTopPercent}%`
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
          >
            <span className="w-9 h-9 rounded-full bg-rose-500/45 animate-ping absolute" />
            <span className="w-4 h-4 rounded-full bg-rose-600 border-2 border-white shadow-lg relative z-10" />
          </div>

          <div className="absolute bottom-2 left-2 right-2 bg-slate-900/90 text-white px-3 py-2 rounded-lg flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs sm:text-sm font-bold">
              {mapping.anatomicalLandmarkNote}
            </span>
            <span className="text-xs font-bold bg-rose-600 text-white px-2 py-0.5 rounded shrink-0">
              Chấm đỏ = Tâm huyệt
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
  );
};
