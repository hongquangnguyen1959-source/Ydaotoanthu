export interface Acupoint3D {
  id: string;
  code: string;
  name: string;
  vietnameseName: string;
  chineseName: string;
  meridianId: string;
  meridianName: string;
  position: [number, number, number]; // [x, y, z] for right or midline
  isBilateral: boolean; // if true, mirrored on -x
  location: string;
  depth: string;
  anatomy: string;
  actions: string;
  indications: string[];
  specialRole: string; // e.g., 'Huyệt Nguyên', 'Huyệt Hợp', 'Huyệt Lạc', 'Khích Huyệt', 'Mộ Huyệt', 'Du Huyệt'
}

export interface MeridianFlowMeta {
  id: string;
  category: 'chinh_kinh' | 'ky_kinh';
  cycleOrder?: number; // 1..12 in the 24-hour Tử Ngọ Lưu Chú organ clock
  prevMeridianId?: string;
  nextMeridianId?: string;
  flowTime: string;
  yinYang: 'Âm' | 'Dương';
  element: 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ' | 'Âm Dương';
  flowDirectionType: 'Ngực → Tay (Ly tâm)' | 'Tay → Đầu (Hướng tâm)' | 'Đầu → Chân (Ly tâm)' | 'Chân → Ngực (Hướng tâm)' | 'Đáy chậu → Đầu mặt (Thăng dương)' | 'Đáy chậu → Ngực mặt (Nhâm mạch)' | 'Kỳ Kinh Bát Mạch';
  originPointName: string;
  terminalPointName: string;
  flowDirectionSummary: string;
  pairedZangFu: string;
  openingPointCode?: string;
  openingPointName?: string;
  memberPointCodes?: string[];
}

export interface Meridian3D {
  id: string;
  code: string;
  name: string;
  vietnameseName: string;
  element: 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ' | 'Âm Dương';
  yinYang: 'Âm' | 'Dương';
  limb: 'Thủ' | 'Túc' | 'Mạch Kỳ';
  color: string;
  glowColor: string;
  flowTime: string; // e.g. '3h - 5h (Giờ Dần)'
  totalPoints: number;
  description: string;
  pathWayDescription: string;
  // 3D coordinate control points for spline curve (right side, mirror for left if bilateral)
  pathCoords: [number, number, number][];
  isBilateral: boolean;
  points: Acupoint3D[];
}

export const MERIDIANS_3D_DATA: Meridian3D[] = [
  // 1. THỦ THÁI ÂM PHẾ KINH (LU)
  {
    id: 'LU',
    code: 'LU',
    name: 'Thủ Thái Âm Phế Kinh',
    vietnameseName: 'Kinh Phế (Phổi)',
    element: 'Kim',
    yinYang: 'Âm',
    limb: 'Thủ',
    color: '#38bdf8',
    glowColor: '#7dd3fc',
    flowTime: '3h - 5h (Giờ Dần)',
    totalPoints: 11,
    isBilateral: true,
    description: 'Chủ về khí toàn thân, hô hấp, bì mao, điều hòa thủy đạo và giọng nói.',
    pathWayDescription: 'Khởi từ trung tiêu (vùng dạ dày), xuống đại trường, vòng lên qua môn vị, cơ hoành vào phổi, lên họng, đi ngang ra bờ ngoài ngực (Trung Phủ), chạy xuống mặt trước ngoài cánh tay, cẳng tay, qua cổ tay và tận cùng ở góc móng ngón tay cái (Thiếu Thương).',
    pathCoords: [
      [0.32, 1.05, 0.22],  // LU1 Trung Phủ
      [0.34, 1.15, 0.2],   // LU2 Vân Môn
      [0.55, 0.95, 0.08],  // LU3 Thiên Phủ
      [0.6, 0.82, 0.06],   // LU4 Hiệp Bạch
      [0.66, 0.68, 0.04],  // LU5 Xích Trạch (nếp khuỷu)
      [0.72, 0.5, 0.03],   // LU6 Khổng Tối
      [0.76, 0.32, 0.02],  // LU7 Liệt Khuyết
      [0.78, 0.22, 0.02],  // LU8 Kinh Cừ
      [0.8, 0.14, 0.02],   // LU9 Thái Uyên (lằn cổ tay)
      [0.83, 0.05, 0.02],  // LU10 Ngư Tế
      [0.86, -0.06, 0.02]  // LU11 Thiếu Thương (đầu ngón cái)
    ],
    points: [
      {
        id: 'LU1',
        code: 'LU1',
        name: 'Trung Phủ',
        vietnameseName: 'Trung Phủ (Mộ Huyệt của Phế)',
        chineseName: '中府',
        meridianId: 'LU',
        meridianName: 'Thủ Thái Âm Phế Kinh',
        position: [0.32, 1.05, 0.22],
        isBilateral: true,
        location: 'Khoang liên sườn 1, dưới xương đòn khoảng 1 thốn, cách đường giữa ngực 6 thốn.',
        depth: 'Châm nghiêng ra ngoài 0.5 - 0.8 thốn (Tránh đâm sâu trúng đỉnh phổi).',
        anatomy: 'Cơ ngực to, cơ ngực bé, dây thần kinh ngực trên.',
        actions: 'Tuyên thông phế khí, thanh tả thượng tiêu hỏa, chỉ khái bình suyễn.',
        indications: ['Hen phế quản, viêm phế quản', 'Ho, khó thở, tức ngực', 'Đau vai gáy'],
        specialRole: 'Mộ huyệt của Phế Kinh, Hội của Phế và Tỳ'
      },
      {
        id: 'LU5',
        code: 'LU5',
        name: 'Xích Trạch',
        vietnameseName: 'Xích Trạch (Hợp Thủy Huyệt)',
        chineseName: '尺泽',
        meridianId: 'LU',
        meridianName: 'Thủ Thái Âm Phế Kinh',
        position: [0.66, 0.68, 0.04],
        isBilateral: true,
        location: 'Trên nếp gấp khuỷu tay, ở bờ ngoài gân cơ nhị đầu cánh tay.',
        depth: 'Châm thẳng 0.5 - 1.0 thốn hoặc trích huyết hạ sốt cao.',
        anatomy: 'Gân cơ nhị đầu cánh tay, tĩnh mạch đầu, thần kinh quay.',
        actions: 'Thanh tiết Phế nhiệt, giáng nghịch khí, làm dịu ho ra máu, thanh họng.',
        indications: ['Viêm họng cấp, sốt cao', 'Ho khan, ho ra máu', 'Đau khớp khuỷu'],
        specialRole: 'Hợp huyệt thuộc Thủy'
      },
      {
        id: 'LU7',
        code: 'LU7',
        name: 'Liệt Khuyết',
        vietnameseName: 'Liệt Khuyết (Lạc Huyệt & Bát Mạch Giao Hội)',
        chineseName: '列缺',
        meridianId: 'LU',
        meridianName: 'Thủ Thái Âm Phế Kinh',
        position: [0.76, 0.32, 0.02],
        isBilateral: true,
        location: 'Trên lằn chỉ cổ tay 1.5 thốn, ở chỗ lõm mỏm trâm quay.',
        depth: 'Châm chếch lên trên 0.3 - 0.5 thốn.',
        anatomy: 'Gân cơ dạng dài ngón cái, nhánh nông thần kinh quay.',
        actions: 'Tuyên thông Phế khí, khu phong chỉ thống, thông Nhâm mạch.',
        indications: ['Đau đầu phong hàn, nghẹt mũi', 'Liệt mặt ngoại biên', 'Đau cổ gáy, ho gió'],
        specialRole: 'Lạc huyệt, Bát mạch giao hội huyệt (thông Nhâm Mạch)'
      },
      {
        id: 'LU9',
        code: 'LU9',
        name: 'Thái Uyên',
        vietnameseName: 'Thái Uyên (Nguyên Huyệt & Hội Huyệt Mạch)',
        chineseName: '太渊',
        meridianId: 'LU',
        meridianName: 'Thủ Thái Âm Phế Kinh',
        position: [0.8, 0.14, 0.02],
        isBilateral: true,
        location: 'Tại lằn chỉ cổ tay, chỗ lõm bờ ngoài động mạch quay.',
        depth: 'Châm thẳng 0.2 - 0.3 thốn, tránh đâm xuyên động mạch.',
        anatomy: 'Bên ngoài động mạch quay, cơ dạng dài ngón cái.',
        actions: 'Bổ phế ích khí, hóa đàm chỉ khái, lý khí chỉ thống, thông mạch.',
        indications: ['Phế hư ho khan kéo dài', 'Viêm mạch máu, mất mạch', 'Đau cổ tay'],
        specialRole: 'Nguyên huyệt, Du Thổ huyệt, Hội huyệt của Mạch'
      },
      {
        id: 'LU11',
        code: 'LU11',
        name: 'Thiếu Thương',
        vietnameseName: 'Thiếu Thương (Tỉnh Mộc Huyệt)',
        chineseName: '少商',
        meridianId: 'LU',
        meridianName: 'Thủ Thái Âm Phế Kinh',
        position: [0.86, -0.06, 0.02],
        isBilateral: true,
        location: 'Góc ngoài chân móng ngón tay cái cách móng 0.1 thốn.',
        depth: 'Chích nặn máu hoặc châm nông 0.1 thốn.',
        anatomy: 'Mạng lưới thần kinh ngón tay số 1.',
        actions: 'Khai khiếu tỉnh thần, tiết hỏa thanh hầu họng cực mạnh.',
        indications: ['Hôn mê, ngất, co giật', 'Sưng đau họng cấp, viêm amidan sốt cao', 'Cảm mạo phong nhiệt'],
        specialRole: 'Tỉnh huyệt thuộc Mộc'
      }
    ]
  },

  // 2. THỦ DƯƠNG MINH ĐẠI TRƯỜNG KINH (LI)
  {
    id: 'LI',
    code: 'LI',
    name: 'Thủ Dương Minh Đại Trường Kinh',
    vietnameseName: 'Kinh Đại Trường (Ruột Già)',
    element: 'Kim',
    yinYang: 'Dương',
    limb: 'Thủ',
    color: '#fb923c',
    glowColor: '#fdba74',
    flowTime: '5h - 7h (Giờ Mão)',
    totalPoints: 20,
    isBilateral: true,
    description: 'Chủ về sự bài tiết cặn bã, tiếp nhận và chuyển hóa, liên kết mật thiết với vùng đầu mặt và răng miệng.',
    pathWayDescription: 'Khởi từ góc ngoài ngón trỏ (Thương Dương), dọc bờ ngoài ngón trỏ qua kẽ xương bàn tay 1-2 (Hợp Cốc), lên mặt ngoài cẳng tay qua nếp khuỷu (Khúc Trì), lên vai (Kiên Ngung), qua cổ lên mặt bắt chéo sang mép mũi bên đối diện (Nghênh Hương).',
    pathCoords: [
      [0.85, -0.05, 0.0],
      [0.82, 0.08, 0.01],  // LI4 Hợp Cốc
      [0.78, 0.2, 0.01],   // LI5 Dương Khê
      [0.72, 0.45, 0.02],  // LI10 Thủ Tam Lý
      [0.67, 0.66, 0.03],  // LI11 Khúc Trì
      [0.55, 0.95, -0.02], // LI14 Tý Nhu
      [0.48, 1.22, 0.0],   // LI15 Kiên Ngung
      [0.25, 1.35, 0.05],  // LI18 Phù Đột
      [0.08, 1.48, 0.24]   // LI20 Nghênh Hương
    ],
    points: [
      {
        id: 'LI4',
        code: 'LI4',
        name: 'Hợp Cốc',
        vietnameseName: 'Hợp Cốc (Tổng Huyệt Vùng Đầu Mặt)',
        chineseName: '合谷',
        meridianId: 'LI',
        meridianName: 'Thủ Dương Minh Đại Trường Kinh',
        position: [0.82, 0.08, 0.01],
        isBilateral: true,
        location: 'Khép ngón cái và ngón trỏ, huyệt ở điểm cao nhất của cơ khép ngón cái.',
        depth: 'Châm thẳng 0.5 - 1.0 thốn. Đắc khí căng tức lan ra ngón tay.',
        anatomy: 'Cơ khép ngón cái, cơ gian cốt mu tay 1, thần kinh quay.',
        actions: 'Trấn thống toàn thân, khu phong giải biểu, thông khiếu thanh nhiệt đầu mặt.',
        indications: ['Đau răng, liệt mặt, đau đầu, viêm xoang', 'Sốt cao, cảm mạo phong nhiệt', 'Bế kinh, đau bụng kinh'],
        specialRole: 'Nguyên huyệt, Tứ tổng huyệt chủ trị vùng Đầu Mặt'
      },
      {
        id: 'LI11',
        code: 'LI11',
        name: 'Khúc Trì',
        vietnameseName: 'Khúc Trì (Hợp Thổ Huyệt - Huyệt Thanh Nhiệt Cơ Thể)',
        chineseName: '曲池',
        meridianId: 'LI',
        meridianName: 'Thủ Dương Minh Đại Trường Kinh',
        position: [0.67, 0.66, 0.03],
        isBilateral: true,
        location: 'Gấp khuỷu tay 90 độ, huyệt ở chỗ lõm tận cùng phía ngoài nếp gấp khuỷu.',
        depth: 'Châm thẳng 1.0 - 1.5 thốn.',
        anatomy: 'Cơ ngửa dài, cơ quay 1, nhánh thần kinh quay.',
        actions: 'Thanh nhiệt giải độc, sơ phong lợi thấp, hạ huyết áp, tiêu viêm da mẩn ngứa.',
        indications: ['Tăng huyết áp, sốt cao', 'Viêm khớp khuỷu, liệt chi trên', 'Dị ứng, mề đay, chàm ngứa'],
        specialRole: 'Hợp huyệt thuộc Thổ'
      },
      {
        id: 'LI15',
        code: 'LI15',
        name: 'Kiên Ngung',
        vietnameseName: 'Kiên Ngung (Chủ Trị Khớp Vai)',
        chineseName: '肩髃',
        meridianId: 'LI',
        meridianName: 'Thủ Dương Minh Đại Trường Kinh',
        position: [0.48, 1.22, 0.0],
        isBilateral: true,
        location: 'Dang cánh tay ra ngang, xuất hiện 2 chỗ lõm ở mỏm cùng vai, huyệt ở chỗ lõm phía trước.',
        depth: 'Châm thẳng hoặc xiên xuống dưới 1.0 - 1.5 thốn.',
        anatomy: 'Cơ delta, mỏm cùng vai, thần kinh nách.',
        actions: 'Thông kinh hoạt lạc, sơ tán phong thấp khớp vai.',
        indications: ['Viêm quanh khớp vai, đông cứng khớp vai', 'Liệt tay sau tai biến', 'Đau mỏi cổ vai'],
        specialRole: 'Hội huyệt của Kinh Dương Minh và Dương Kiều Mạch'
      },
      {
        id: 'LI20',
        code: 'LI20',
        name: 'Nghênh Hương',
        vietnameseName: 'Nghênh Hương (Thông Mũi Khứu Giác)',
        chineseName: '迎香',
        meridianId: 'LI',
        meridianName: 'Thủ Dương Minh Đại Trường Kinh',
        position: [0.08, 1.48, 0.24],
        isBilateral: true,
        location: 'Cách cánh mũi 0.5 thốn, trong rãnh mũi má.',
        depth: 'Châm xiên chếch hướng lên trên 0.3 - 0.5 thốn.',
        anatomy: 'Cơ nâng môi trên và cánh mũi, dây thần kinh mặt số 7.',
        actions: 'Tuyên thông phế khí, thông tỵ khiếu, tán phong nhiệt.',
        indications: ['Nghẹt mũi, chảy nước mũi, viêm mũi dị ứng, viêm xoang', 'Mất khứu giác', 'Liệt mặt'],
        specialRole: 'Hội huyệt của Đại Trường và Vị Kinh'
      }
    ]
  },

  // 3. TÚC DƯƠNG MINH VỊ KINH (ST)
  {
    id: 'ST',
    code: 'ST',
    name: 'Túc Dương Minh Vị Kinh',
    vietnameseName: 'Kinh Vị (Dạ Dày)',
    element: 'Thổ',
    yinYang: 'Dương',
    limb: 'Túc',
    color: '#facc15',
    glowColor: '#fde047',
    flowTime: '7h - 9h (Giờ Thìn)',
    totalPoints: 45,
    isBilateral: true,
    description: 'Chủ về tiêu hóa, nạp và ngấu nhừ thủy cốc, biển của khí huyết dinh dưỡng toàn thân.',
    pathWayDescription: 'Khởi từ cạnh mũi (Thừa Khấp), chạy vòng quanh miệng, lên góc hàm (Hạ Quan), xuống cổ, ngực, bụng (cách đường giữa 2 thốn), qua bẹn xuống mặt trước ngoài đùi, qua gối (Độc Tỵ), cẳng chân (Túc Tam Lý, Phong Long), qua mu bàn chân và tận cùng ở góc ngoài móng ngón chân thứ hai (Lệ Đoái).',
    pathCoords: [
      [0.08, 1.5, 0.24],   // ST1 Thừa Khấp
      [0.18, 1.42, 0.16],  // ST6 Giáp Xa
      [0.2, 1.25, 0.1],    // ST9 Nhân Nghênh
      [0.22, 1.0, 0.2],    // ST16 Ưng Song
      [0.15, 0.5, 0.22],   // ST25 Thiên Xu
      [0.18, 0.1, 0.18],   // ST30 Khí Xung
      [0.26, -0.35, 0.1],  // ST31 Bễ Quan
      [0.25, -0.7, 0.1],   // ST34 Lương Khâu
      [0.24, -0.85, 0.11], // ST35 Độc Tỵ
      [0.24, -1.05, 0.1],  // ST36 Túc Tam Lý
      [0.24, -1.25, 0.08], // ST40 Phong Long
      [0.23, -1.58, 0.06], // ST41 Giải Khê
      [0.22, -1.72, 0.14]  // ST44 Nội Đình & ST45 Lệ Đoái
    ],
    points: [
      {
        id: 'ST25',
        code: 'ST25',
        name: 'Thiên Xu',
        vietnameseName: 'Thiên Xu (Mộ Huyệt của Đại Trường)',
        chineseName: '天枢',
        meridianId: 'ST',
        meridianName: 'Túc Dương Minh Vị Kinh',
        position: [0.15, 0.5, 0.22],
        isBilateral: true,
        location: 'Ngang rốn ra 2 thốn.',
        depth: 'Châm thẳng 1.0 - 1.5 thốn.',
        anatomy: 'Cơ thẳng to của bụng, thần kinh liên sườn 10.',
        actions: 'Điều lý tỳ vị, hóa thấp trệ, lý khí điều trường, chỉ tả thông tiện.',
        indications: ['Đau bụng, tiêu chảy, kiết lỵ, táo bón', 'Viêm đại tràng mạn tính', 'Rối loạn kinh nguyệt'],
        specialRole: 'Mộ huyệt của Đại Trường Kinh'
      },
      {
        id: 'ST36',
        code: 'ST36',
        name: 'Túc Tam Lý',
        vietnameseName: 'Túc Tam Lý (Huyệt Trường Thọ & Kiện Tỳ Vị Bậc Nhất)',
        chineseName: '足三里',
        meridianId: 'ST',
        meridianName: 'Túc Dương Minh Vị Kinh',
        position: [0.24, -1.05, 0.1],
        isBilateral: true,
        location: 'Dưới mắt gối ngoài (Độc Tỵ) 3 thốn, cách mào xương chày 1 khoát ngón tay.',
        depth: 'Châm thẳng 1.0 - 2.0 thốn. Cảm giác căng tức chạy xuống bàn chân.',
        anatomy: 'Cơ chày trước, cơ duỗi chung các ngón chân, thần kinh mác sâu.',
        actions: 'Đại bổ nguyên khí, kiện tỳ hóa thấp, điều hòa khí huyết, tăng cường miễn dịch.',
        indications: ['Đau dạ dày, viêm loét tiêu hóa, đầy bụng nôn mửa', 'Mệt mỏi, suy nhược toàn thân, thiếu máu', 'Liệt chi dưới'],
        specialRole: 'Hợp Thổ huyệt, Tứ tổng huyệt vùng Bụng Trên'
      },
      {
        id: 'ST40',
        code: 'ST40',
        name: 'Phong Long',
        vietnameseName: 'Phong Long (Chuyên Hóa Đàm Trọc Toàn Thân)',
        chineseName: '丰隆',
        meridianId: 'ST',
        meridianName: 'Túc Dương Minh Vị Kinh',
        position: [0.24, -1.25, 0.08],
        isBilateral: true,
        location: 'Trên mắt cá ngoài 8 thốn, cách bờ mào xương chày ra ngoài 2 khoát ngón tay.',
        depth: 'Châm thẳng 1.0 - 1.5 thốn.',
        anatomy: 'Cơ mác bên ngắn, thần kinh mác nông.',
        actions: 'Hóa đàm trừ thấp, hòa vị giáng nghịch, an thần định chí.',
        indications: ['Rối loạn lipid máu, béo phì mỡ máu', 'Ho nhiều đờm đặc, hen suyễn', 'Đau đầu chóng mặt do đàm trọc'],
        specialRole: 'Lạc huyệt nối sang Tỳ Kinh'
      },
      {
        id: 'ST44',
        code: 'ST44',
        name: 'Nội Đình',
        vietnameseName: 'Nội Đình (Huyệt Thanh Vị Hỏa Cấp)',
        chineseName: '内庭',
        meridianId: 'ST',
        meridianName: 'Túc Dương Minh Vị Kinh',
        position: [0.22, -1.72, 0.14],
        isBilateral: true,
        location: 'Trong kẽ giữa ngón chân thứ 2 và thứ 3, sát bờ màng da nối hai ngón.',
        depth: 'Châm thẳng 0.3 - 0.5 thốn.',
        anatomy: 'Nhánh thần kinh mu chân của thần kinh mác nông.',
        actions: 'Thanh tiết Vị hỏa, thông trường giáng nhiệt, trấn thống tiêu viêm.',
        indications: ['Đau nhức răng do vị nhiệt, sưng lợi', 'Chảy máu cam, ợ chua nóng rát', 'Sốt cao không lui'],
        specialRole: 'Huỳnh Thủy huyệt của Vị Kinh'
      }
    ]
  },

  // 4. TÚC THÁI ÂM TỲ KINH (SP)
  {
    id: 'SP',
    code: 'SP',
    name: 'Túc Thái Âm Tỳ Kinh',
    vietnameseName: 'Kinh Tỳ (Lá Lách - Vận Hóa)',
    element: 'Thổ',
    yinYang: 'Âm',
    limb: 'Túc',
    color: '#fbbf24',
    glowColor: '#fde68a',
    flowTime: '9h - 11h (Giờ Tỵ)',
    totalPoints: 21,
    isBilateral: true,
    description: 'Chủ về vận hóa thủy cốc, thống nhiếp huyết dịch, chủ cơ nhục và tứ chi.',
    pathWayDescription: 'Khởi từ góc trong móng ngón chân cái (Ẩn Bạch), chạy dọc bờ trong mu bàn chân, qua mắt cá trong (Thương Khâu), mặt trong cẳng chân (Tam Âm Giao, Âm Lăng Tuyền), mặt trong đùi (Huyết Hải), lên bụng (cách đường giữa 4 thốn), qua ngực và tận cùng ở khoang liên sườn 6 (Đại Bao).',
    pathCoords: [
      [0.2, -1.75, 0.12],  // SP1 Ẩn Bạch
      [0.18, -1.68, 0.08], // SP3 Thái Bạch
      [0.17, -1.58, 0.02], // SP5 Thương Khâu
      [0.18, -1.35, 0.02], // SP6 Tam Âm Giao
      [0.18, -1.15, 0.02], // SP8 Địa Cơ
      [0.2, -0.88, 0.03],  // SP9 Âm Lăng Tuyền
      [0.22, -0.65, 0.06], // SP10 Huyết Hải
      [0.24, 0.25, 0.2],   // SP15 Đại Hoành
      [0.34, 0.85, 0.15]   // SP21 Đại Bao
    ],
    points: [
      {
        id: 'SP6',
        code: 'SP6',
        name: 'Tam Âm Giao',
        vietnameseName: 'Tam Âm Giao (Giao Hội 3 Kinh Âm Chân: Can - Tỳ - Thận)',
        chineseName: '三阴交',
        meridianId: 'SP',
        meridianName: 'Túc Thái Âm Tỳ Kinh',
        position: [0.18, -1.35, 0.02],
        isBilateral: true,
        location: 'Trên đỉnh mắt cá trong 3 thốn, sát bờ sau trong xương chày.',
        depth: 'Châm thẳng 1.0 - 1.5 thốn. (Chống chỉ định tuyệt đối phụ nữ có thai).',
        anatomy: 'Cơ gấp dài các ngón chân, cơ chày sau, động mạch và thần kinh chày sau.',
        actions: 'Kiện tỳ ích vị, tư bổ Can Thận, điều hòa huyết mạch, thông bế kinh lạc sinh dục.',
        indications: ['Rối loạn kinh nguyệt, đau bụng kinh, hiếm muộn', 'Mất ngủ, suy nhược thần kinh', 'Bí tiểu, đái dầm, viêm đường tiết niệu'],
        specialRole: 'Hội huyệt của 3 kinh Túc Tam Âm (Tỳ, Can, Thận)'
      },
      {
        id: 'SP9',
        code: 'SP9',
        name: 'Âm Lăng Tuyền',
        vietnameseName: 'Âm Lăng Tuyền (Hợp Thủy Huyệt - Trục Thủy Trừ Phù)',
        chineseName: '阴陵泉',
        meridianId: 'SP',
        meridianName: 'Túc Thái Âm Tỳ Kinh',
        position: [0.2, -0.88, 0.03],
        isBilateral: true,
        location: 'Ở chỗ lõm dưới lồi củ trong xương chày, mặt trong cẳng chân.',
        depth: 'Châm thẳng 1.0 - 1.5 thốn.',
        anatomy: 'Bờ dưới lồi củ trong xương chày, thần kinh hiển.',
        actions: 'Vận tỳ hóa thấp, thông lợi thủy đạo, tiêu thũng trướng.',
        indications: ['Phù nề hai chi dưới, tiểu ít', 'Viêm ruột tiêu chảy mạn', 'Đau khớp gối'],
        specialRole: 'Hợp Thủy huyệt'
      },
      {
        id: 'SP10',
        code: 'SP10',
        name: 'Huyết Hải',
        vietnameseName: 'Huyết Hải (Biển Của Huyết - Trị Các Bệnh Huyết)',
        chineseName: '血海',
        meridianId: 'SP',
        meridianName: 'Túc Thái Âm Tỳ Kinh',
        position: [0.22, -0.65, 0.06],
        isBilateral: true,
        location: 'Gấp đầu gối, mặt trước trong đùi, bờ trên trong xương bánh chè đo lên 2 thốn.',
        depth: 'Châm thẳng 1.0 - 1.5 thốn.',
        anatomy: 'Cơ rộng trong, nhánh thần kinh đùi.',
        actions: 'Hóa ứ sinh tân, lương huyết thanh nhiệt, điều kinh hoạt huyết.',
        indications: ['Bế kinh, kinh nguyệt không đều, rong kinh', 'Mẩn ngứa da, mề đay dị ứng', 'Đau khớp gối'],
        specialRole: 'Huyệt đặc trị bệnh về Huyết của Tỳ Kinh'
      }
    ]
  },

  // 5. THỦ THIẾU ÂM TÂM KINH (HT)
  {
    id: 'HT',
    code: 'HT',
    name: 'Thủ Thiếu Âm Tâm Kinh',
    vietnameseName: 'Kinh Tâm (Tim)',
    element: 'Hỏa',
    yinYang: 'Âm',
    limb: 'Thủ',
    color: '#f43f5e',
    glowColor: '#fb7185',
    flowTime: '11h - 13h (Giờ Ngọ)',
    totalPoints: 9,
    isBilateral: true,
    description: 'Chủ về huyết mạch và tàng Thần, quân chủ của lục phủ ngũ tạng.',
    pathWayDescription: 'Khởi từ trong tim, xuống tiểu trường, vòng lên họng tới mắt; nhánh nổi từ nách (Cực Tuyền) chạy dọc bờ trong mặt trước cánh tay, qua nếp khuỷu (Thiếu Hải), cổ tay (Thần Môn) ra tận cùng góc trong móng ngón tay út (Thiếu Xung).',
    pathCoords: [
      [0.38, 1.05, 0.05], // HT1 Cực Tuyền
      [0.55, 0.85, 0.02],
      [0.64, 0.65, -0.01], // HT3 Thiếu Hải
      [0.72, 0.35, 0.0],
      [0.76, 0.16, 0.0],  // HT7 Thần Môn
      [0.82, -0.06, 0.0]  // HT9 Thiếu Xung
    ],
    points: [
      {
        id: 'HT7',
        code: 'HT7',
        name: 'Thần Môn',
        vietnameseName: 'Thần Môn (Nguyên Huyệt - Cửa Của Thần Chí)',
        chineseName: '神门',
        meridianId: 'HT',
        meridianName: 'Thủ Thiếu Âm Tâm Kinh',
        position: [0.76, 0.16, 0.0],
        isBilateral: true,
        location: 'Trên lằn chỉ cổ tay, chỗ lõm sát bờ ngoài gân cơ gấp cổ tay trụ.',
        depth: 'Châm thẳng 0.3 - 0.5 thốn.',
        anatomy: 'Gân cơ gấp cổ tay trụ, bờ ngoài xương đậu, thần kinh trụ.',
        actions: 'Dưỡng tâm an thần, thanh tâm nhiệt, điều hòa tâm khí, định chí.',
        indications: ['Mất ngủ kinh niên, hay hồi hộp lo âu, hay quên', 'Rối loạn nhịp tim, đánh trống ngực', 'Đau thắt ngực'],
        specialRole: 'Nguyên huyệt, Du Thổ huyệt'
      }
    ]
  },

  // 6. THỦ THÁI DƯƠNG TIỂU TRƯỜNG KINH (SI)
  {
    id: 'SI',
    code: 'SI',
    name: 'Thủ Thái Dương Tiểu Trường Kinh',
    vietnameseName: 'Kinh Tiểu Trường (Ruột Non)',
    element: 'Hỏa',
    yinYang: 'Dương',
    limb: 'Thủ',
    color: '#fb7185',
    glowColor: '#fda4af',
    flowTime: '13h - 15h (Giờ Mùi)',
    totalPoints: 19,
    isBilateral: true,
    description: 'Chủ về thu nhận và phân tách thanh trọc thủy dịch, liên quan mật thiết đến vùng bả vai, cổ gáy và tai.',
    pathWayDescription: 'Khởi từ góc ngoài ngón út (Thiếu Trạch), qua bờ trụ bàn tay (Hậu Khê), mỏm trâm trụ (Dương Cốc), dọc sau ngoài cẳng tay, qua khuỷu (Tiểu Hải), lên bả vai (Thiên Tông), qua cổ lên gò má và tận đầu trước tai (Thính Cung).',
    pathCoords: [
      [0.85, -0.08, -0.02], // SI1 Thiếu Trạch
      [0.8, 0.08, -0.03],   // SI3 Hậu Khê
      [0.75, 0.2, -0.03],   // SI5 Dương Cốc
      [0.65, 0.65, -0.04],  // SI8 Tiểu Hải
      [0.35, 1.05, -0.2],   // SI11 Thiên Tông
      [0.18, 1.35, 0.0],    // SI17 Thiên Dung
      [0.15, 1.48, 0.15]    // SI19 Thính Cung
    ],
    points: [
      {
        id: 'SI3',
        code: 'SI3',
        name: 'Hậu Khê',
        vietnameseName: 'Hậu Khê (Bát Mạch Giao Hội Thông Đốc Mạch)',
        chineseName: '后溪',
        meridianId: 'SI',
        meridianName: 'Thủ Thái Dương Tiểu Trường Kinh',
        position: [0.8, 0.08, -0.03],
        isBilateral: true,
        location: 'Khép nhẹ bàn tay, huyệt ở đầu nếp gấp ngang sau khớp bàn - ngón út.',
        depth: 'Châm thẳng 0.5 - 1.0 thốn.',
        anatomy: 'Cơ dạng ngón út, nhánh nông thần kinh trụ.',
        actions: 'Sơ phong thanh nhiệt, thông Đốc mạch, trấn thống vùng cổ gáy lưng.',
        indications: ['Cứng cổ gáy, thoái hóa đốt sống cổ', 'Đau thắt lưng cấp, vẹo cổ cấp', 'Động kinh, co giật'],
        specialRole: 'Du Mộc huyệt, Bát mạch giao hội huyệt (thông Đốc Mạch)'
      },
      {
        id: 'SI19',
        code: 'SI19',
        name: 'Thính Cung',
        vietnameseName: 'Thính Cung (Cung Điện Của Thính Giác)',
        chineseName: '听宫',
        meridianId: 'SI',
        meridianName: 'Thủ Thái Dương Tiểu Trường Kinh',
        position: [0.15, 1.48, 0.15],
        isBilateral: true,
        location: 'Hơi há miệng, huyệt ở chỗ lõm ngay giữa nắp tai (tragus) và khớp thái dương hàm.',
        depth: 'Châm thẳng 0.5 - 1.0 thốn khi bệnh nhân đang há nhẹ miệng.',
        anatomy: 'Tuyến mang tai, nhánh thần kinh tai - thái dương.',
        actions: 'Tuyên thông nhĩ khiếu, thanh tiết can đởm hỏa.',
        indications: ['Ù tai, điếc tai, nghe kém', 'Viêm tai giữa cấp và mạn', 'Liệt mặt'],
        specialRole: 'Hội huyệt của Tiểu Trường, Tam Tiêu và Đởm'
      }
    ]
  },

  // 7. TÚC THÁI DƯƠNG BÀNG QUANG KINH (BL)
  {
    id: 'BL',
    code: 'BL',
    name: 'Túc Thái Dương Bàng Quang Kinh',
    vietnameseName: 'Kinh Bàng Quang (Kinh Lạc Dài Nhất - 67 Huyệt)',
    element: 'Thủy',
    yinYang: 'Dương',
    limb: 'Túc',
    color: '#3b82f6',
    glowColor: '#60a5fa',
    flowTime: '15h - 17h (Giờ Thân)',
    totalPoints: 67,
    isBilateral: true,
    description: 'Chủ về chứa và bài tiết nước tiểu, toàn bộ hệ thống Du Huyệt tạng phủ ở lưng, vệ khí phòng chống ngoại tà toàn thân.',
    pathWayDescription: 'Khởi từ khóe mắt trong (Tình Minh), lên trán qua đỉnh đầu (Bách Hội), vào não, ra sau gáy (Thiên Trụ), chia 2 nhánh chạy dọc hai bên cột sống lưng (chứa toàn bộ Du huyệt: Phế du, Tâm du, Can du, Tỳ du, Thận du...), xuống mông, nếp gấp khoeo chân (Ủy Trung), cẳng chân (Thừa Sơn), vòng sau mắt cá ngoài (Côn Lôn) đến góc ngoài ngón út chân (Chí Âm).',
    pathCoords: [
      [0.03, 1.53, 0.24],  // BL1 Tình Minh
      [0.1, 1.35, -0.16],  // BL10 Thiên Trụ
      [0.12, 1.15, -0.21], // BL13 Phế Du
      [0.12, 0.95, -0.22], // BL15 Tâm Du
      [0.12, 0.75, -0.22], // BL18 Can Du
      [0.12, 0.58, -0.22], // BL20 Tỳ Du
      [0.12, 0.42, -0.22], // BL23 Thận Du
      [0.15, 0.1, -0.2],   // BL31 Bát Liêu
      [0.18, -0.3, -0.16], // BL36 Thừa Phù
      [0.2, -0.85, -0.1],  // BL40 Ủy Trung
      [0.2, -1.2, -0.08],  // BL57 Thừa Sơn
      [0.22, -1.58, -0.04],// BL60 Côn Lôn
      [0.24, -1.75, 0.08]  // BL67 Chí Âm
    ],
    points: [
      {
        id: 'BL23',
        code: 'BL23',
        name: 'Thận Du',
        vietnameseName: 'Thận Du (Bổ Thận Ích Tinh & Cốt Tủy)',
        chineseName: '肾俞',
        meridianId: 'BL',
        meridianName: 'Túc Thái Dương Bàng Quang Kinh',
        position: [0.12, 0.42, -0.22],
        isBilateral: true,
        location: 'Dưới gai đốt sống thắt lưng 2 (L2) đo ngang ra 1.5 thốn (ngang Mệnh Môn).',
        depth: 'Châm thẳng 1.0 - 1.5 thốn hoặc cứu ngải ấm.',
        anatomy: 'Cơ lưng to, khối cơ chung thắt lưng, thần kinh sống thắt lưng 2.',
        actions: 'Tư âm tráng dương, bổ Thận ích tinh, tráng cân cốt, lợi thủy thông nhĩ.',
        indications: ['Đau lưng mỏi gối, thoái hóa thắt lưng', 'Di tinh, liệt dương, xuất tinh sớm, vô sinh', 'Ù tai, tiểu đêm, phù thũng'],
        specialRole: 'Bối Du huyệt của Thận Tạng'
      },
      {
        id: 'BL40',
        code: 'BL40',
        name: 'Ủy Trung',
        vietnameseName: 'Ủy Trung (Tổng Huyệt Vùng Thắt Lưng Cùng)',
        chineseName: '委中',
        meridianId: 'BL',
        meridianName: 'Túc Thái Dương Bàng Quang Kinh',
        position: [0.2, -0.85, -0.1],
        isBilateral: true,
        location: 'Tại điểm chính giữa nếp gấp khoeo chân.',
        depth: 'Châm thẳng 1.0 - 1.5 thốn hoặc trích xuất máu đen trị đau lưng cấp.',
        anatomy: 'Chính giữa trám khoeo, tĩnh mạch khoeo, thần kinh chày.',
        actions: 'Thanh nhiệt giải độc, thư cân hoạt lạc, thông điều thắt lưng.',
        indications: ['Đau thần kinh tọa, thoát vị đĩa đệm, đau lưng cấp', 'Liệt chi dưới', 'Trúng nắng, sốt cao co giật'],
        specialRole: 'Hợp Thổ huyệt, Tứ tổng huyệt chủ trị Vùng Thắt Lưng Cột Sống'
      },
      {
        id: 'BL60',
        code: 'BL60',
        name: 'Côn Lôn',
        vietnameseName: 'Côn Lôn (Huyệt Trục Phong Hàn Cột Sống)',
        chineseName: '昆仑',
        meridianId: 'BL',
        meridianName: 'Túc Thái Dương Bàng Quang Kinh',
        position: [0.22, -1.58, -0.04],
        isBilateral: true,
        location: 'Ở chỗ lõm giữa điểm cao nhất của mắt cá ngoài và bờ ngoài gân gót (Achilles).',
        depth: 'Châm thẳng 0.5 - 0.8 thốn (Thận trọng với phụ nữ có thai).',
        anatomy: 'Giữa mắt cá ngoài và gân gót, thần kinh bắp chân.',
        actions: 'Thư cân hoạt lạc, thanh nhiệt hóa thấp, trục phong hàn cột sống gáy lưng.',
        indications: ['Đau cổ gáy, đau đầu vùng chẩm', 'Đau thắt lưng và đau thần kinh tọa', 'Đau gót chân'],
        specialRole: 'Kinh Hỏa huyệt của Bàng Quang'
      }
    ]
  },

  // 8. TÚC THIẾU ÂM THẬN KINH (KI)
  {
    id: 'KI',
    code: 'KI',
    name: 'Túc Thiếu Âm Thận Kinh',
    vietnameseName: 'Kinh Thận (Tiên Thiên Chi Bản)',
    element: 'Thủy',
    yinYang: 'Âm',
    limb: 'Túc',
    color: '#6366f1',
    glowColor: '#818cf8',
    flowTime: '17h - 19h (Giờ Dậu)',
    totalPoints: 27,
    isBilateral: true,
    description: 'Chủ về tàng tinh, chủ cốt tủy, sinh tinh dưỡng não, nạp khí và chủ thủy toàn thân.',
    pathWayDescription: 'Khởi từ lòng bàn chân (Dũng Tuyền), qua mặt trong gót chân (Thái Khê), vòng sau mắt cá trong lên cẳng chân, mặt trong đùi, lên vùng bụng (cách đường giữa 0.5 thốn), lên ngực (cách đường giữa 2 thốn) và tận cùng dưới xương đòn (Du Phủ).',
    pathCoords: [
      [0.2, -1.78, 0.05],  // KI1 Dũng Tuyền (lòng bàn chân)
      [0.17, -1.6, -0.02], // KI3 Thái Khê
      [0.16, -1.45, 0.0],  // KI6 Chiếu Hải
      [0.17, -1.2, 0.01],  // KI9 Trúc Tân
      [0.19, -0.85, 0.02], // KI10 Âm Cốc
      [0.08, 0.1, 0.18],   // KI11 Hoành Cốt
      [0.08, 0.45, 0.2],   // KI16 Hoang Du (ngang rốn)
      [0.12, 1.15, 0.18]   // KI27 Du Phủ
    ],
    points: [
      {
        id: 'KI1',
        code: 'KI1',
        name: 'Dũng Tuyền',
        vietnameseName: 'Dũng Tuyền (Huyệt Cấp Cứu & Trấn Dương Dưới Lòng Bàn Chân)',
        chineseName: '涌泉',
        meridianId: 'KI',
        meridianName: 'Túc Thiếu Âm Thận Kinh',
        position: [0.2, -1.78, 0.05],
        isBilateral: true,
        location: 'Ở chỗ lõm dưới lòng bàn chân, điểm 1/3 trước đường nối từ kẽ ngón 2-3 đến gót chân.',
        depth: 'Châm thẳng 0.5 - 1.0 thốn hoặc cứu ngải/xoa bóp dầu nóng.',
        anatomy: 'Cân gan chân, nhánh thần kinh gan chân trong.',
        actions: 'Giáng nghịch khí hạ hỏa, khai khiếu tỉnh thần, tư Thận âm, thanh nhiệt não bộ.',
        indications: ['Hôn mê, trúng phong, ngất', 'Tăng huyết áp kịch phát, đau đỉnh đầu', 'Mất ngủ kinh niên, bốc hỏa tiền mãn kinh'],
        specialRole: 'Tỉnh Mộc huyệt của Thận Kinh'
      },
      {
        id: 'KI3',
        code: 'KI3',
        name: 'Thái Khê',
        vietnameseName: 'Thái Khê (Nguyên Huyệt - Nguồn Nước Sống Của Thận Tạng)',
        chineseName: '太溪',
        meridianId: 'KI',
        meridianName: 'Túc Thiếu Âm Thận Kinh',
        position: [0.17, -1.6, -0.02],
        isBilateral: true,
        location: 'Tại chỗ lõm giữa đỉnh mắt cá trong và gân gót chân.',
        depth: 'Châm thẳng 0.5 - 1.0 thốn.',
        anatomy: 'Giữa mắt cá trong và gân gót, động mạch và thần kinh chày sau.',
        actions: 'Tư Thận âm, bổ Thận dương, tráng cốt ích tủy, thanh hư nhiệt.',
        indications: ['Ù tai, suy giảm thính lực, rụng tóc sớm', 'Đau mỏi thắt lưng gối', 'Họng khô rát, ho khan do thận âm hư'],
        specialRole: 'Nguyên huyệt, Du Thổ huyệt của Thận'
      }
    ]
  },

  // 9. THỦ QUYẾT ÂM TÂM BÀO KINH (PC)
  {
    id: 'PC',
    code: 'PC',
    name: 'Thủ Quyết Âm Tâm Bào Kinh',
    vietnameseName: 'Kinh Tâm Bào (Màng Tim)',
    element: 'Hỏa',
    yinYang: 'Âm',
    limb: 'Thủ',
    color: '#ec4899',
    glowColor: '#f472b6',
    flowTime: '19h - 21h (Giờ Tuất)',
    totalPoints: 9,
    isBilateral: true,
    description: 'Chủ về bảo vệ quân chủ (Tâm tạng), thay tim chịu đựng tà khí, chủ về huyết quản và cảm xúc.',
    pathWayDescription: 'Khởi từ trong ngực, qua cơ hoành xuống tam tiêu; nhánh nổi từ cạnh ngực (Thiên Trì) lên nách, chạy dọc chính giữa mặt trong cánh tay, nếp khuỷu (Khúc Trạch), cẳng tay (Nội Quan, Gian Sử), qua gan bàn tay (Lao Cung) đến đầu ngón tay giữa (Trung Xung).',
    pathCoords: [
      [0.34, 1.02, 0.18],  // PC1 Thiên Trì
      [0.55, 0.85, 0.05],
      [0.65, 0.67, 0.01],  // PC3 Khúc Trạch
      [0.72, 0.45, 0.0],
      [0.76, 0.25, 0.01],  // PC6 Nội Quan
      [0.79, 0.14, 0.01],  // PC7 Đại Lăng
      [0.82, 0.05, 0.01],  // PC8 Lao Cung
      [0.84, -0.08, 0.01]  // PC9 Trung Xung
    ],
    points: [
      {
        id: 'PC6',
        code: 'PC6',
        name: 'Nội Quan',
        vietnameseName: 'Nội Quan (Tổng Huyệt Vùng Ngực & Dạ Dày - Say Xe)',
        chineseName: '内关',
        meridianId: 'PC',
        meridianName: 'Thủ Quyết Âm Tâm Bào Kinh',
        position: [0.76, 0.25, 0.01],
        isBilateral: true,
        location: 'Trên lằn chỉ cổ tay 2 thốn, giữa hai gân cơ gan tay lớn và gân cơ gan tay bé.',
        depth: 'Châm thẳng 0.5 - 1.0 thốn. Cảm giác tê lan xuống ngón tay.',
        anatomy: 'Giữa gân cơ gan tay lớn và bé, dây thần kinh giữa.',
        actions: 'Khoan hung lý khí, định tâm an thần, hòa vị chỉ ẩu, trấn thống tim mạch.',
        indications: ['Buồn nôn, nôn mửa, say tàu xe, nấc cụt', 'Đau thắt ngực, đánh trống ngực, hồi hộp', 'Mất ngủ, trầm cảm, căng thẳng thần kinh'],
        specialRole: 'Lạc huyệt của Tâm Bào, Bát mạch giao hội huyệt (thông Âm Duy Mạch), Tứ tổng huyệt vùng Ngực'
      }
    ]
  },

  // 10. THỦ THIẾU DƯƠNG TAM TIÊU KINH (TE/TB)
  {
    id: 'TE',
    code: 'TE',
    name: 'Thủ Thiếu Dương Tam Tiêu Kinh',
    vietnameseName: 'Kinh Tam Tiêu (Thượng - Trung - Hạ Tiêu)',
    element: 'Hỏa',
    yinYang: 'Dương',
    limb: 'Thủ',
    color: '#a855f7',
    glowColor: '#c084fc',
    flowTime: '21h - 23h (Giờ Hợi)',
    totalPoints: 23,
    isBilateral: true,
    description: 'Chủ về thông hành nguyên khí, điều tiết con đường lưu thông nước (thủy đạo) của toàn bộ 3 khoang cơ thể.',
    pathWayDescription: 'Khởi từ góc ngoài móng ngón áp út (Quan Xung), dọc mu bàn tay (Trung Chữ), qua nếp gấp cổ tay sau (Dương Trì), mặt sau cẳng tay (Ngoại Quan), qua khuỷu (Thiên Tỉnh), vai (Kiên Liêu), cổ, vòng quanh tai (Ế Phong) đến đuôi lông mày (Ti Mạch / Ti Trúc Không).',
    pathCoords: [
      [0.84, -0.07, -0.01],
      [0.8, 0.07, -0.02],   // TE3 Trung Chữ
      [0.76, 0.16, -0.02],  // TE4 Dương Trì
      [0.74, 0.26, -0.02],  // TE5 Ngoại Quan
      [0.65, 0.65, -0.03],  // TE10 Thiên Tỉnh
      [0.48, 1.22, -0.05],  // TE14 Kiên Liêu
      [0.15, 1.38, 0.05],   // TE17 Ế Phong
      [0.12, 1.54, 0.2]     // TE23 Ti Trúc Không
    ],
    points: [
      {
        id: 'TE5',
        code: 'TE5',
        name: 'Ngoại Quan',
        vietnameseName: 'Ngoại Quan (Lạc Huyệt - Giải Biểu Khu Phong Toàn Thân)',
        chineseName: '外关',
        meridianId: 'TE',
        meridianName: 'Thủ Thiếu Dương Tam Tiêu Kinh',
        position: [0.74, 0.26, -0.02],
        isBilateral: true,
        location: 'Trên lằn sau cổ tay 2 thốn, giữa xương quay và xương trụ (đối diện huyệt Nội Quan).',
        depth: 'Châm thẳng 0.5 - 1.0 thốn.',
        anatomy: 'Giữa xương quay và xương trụ, thần kinh gian cốt sau.',
        actions: 'Giải biểu nhiệt, sơ phong thông lạc, thanh can đởm hỏa, sáng mắt thông tai.',
        indications: ['Sốt cao, cảm mạo đau đầu', 'Ù tai, điếc tai, đau mắt đỏ', 'Đau cứng cổ gáy, liệt chi trên'],
        specialRole: 'Lạc huyệt, Bát mạch giao hội huyệt (thông Dương Duy Mạch)'
      },
      {
        id: 'TE17',
        code: 'TE17',
        name: 'Ế Phong',
        vietnameseName: 'Ế Phong (Huyệt Trị Bệnh Tai & Liệt Dây Thần Kinh Số 7)',
        chineseName: '翳风',
        meridianId: 'TE',
        meridianName: 'Thủ Thiếu Dương Tam Tiêu Kinh',
        position: [0.15, 1.38, 0.05],
        isBilateral: true,
        location: 'Ở chỗ lõm sau dái tai, giữa xương chũm và góc hàm dưới.',
        depth: 'Châm thẳng hơi hướng lên trên và vào trong 0.8 - 1.2 thốn.',
        anatomy: 'Tuyến mang tai, dây thần kinh mặt số 7 xuất phát ra lỗ trâm chũm.',
        actions: 'Thông nhĩ khai khiếu, tán phong tà, sơ thông kinh lạc vùng mặt tai.',
        indications: ['Liệt dây thần kinh 7 ngoại biên méo miệng', 'Ù tai, điếc đột ngột, viêm tai giữa', 'Đau khớp thái dương hàm'],
        specialRole: 'Hội huyệt của Tam Tiêu và Đởm Kinh'
      }
    ]
  },

  // 11. TÚC THIẾU DƯƠNG ĐỞM KINH (GB)
  {
    id: 'GB',
    code: 'GB',
    name: 'Túc Thiếu Dương Đởm Kinh',
    vietnameseName: 'Kinh Đởm (Túi Mật - Chủ Quyết Đoán)',
    element: 'Mộc',
    yinYang: 'Dương',
    limb: 'Túc',
    color: '#10b981',
    glowColor: '#34d399',
    flowTime: '23h - 1h (Giờ Tý)',
    totalPoints: 44,
    isBilateral: true,
    description: 'Chủ về sự quyết đoán, chứa mật dịch giúp tiêu hóa chất béo, điều hòa khí cơ hai bên hông sườn.',
    pathWayDescription: 'Khởi từ đuôi mắt (Đồng Tử Liêu), chạy ngoằn ngoèo vòng quanh đầu và tai (Suất Cốc, Phong Trì), xuống vai (Kiên Tỉnh), qua nách chạy dọc sườn hông (Nhật Nguyệt), mông (Hoàn Khiêu), mặt ngoài đùi (Phong Thị), gối (Dương Lăng Tuyền), cẳng chân (Huyền Chung), qua mắt cá ngoài (Khâu Khư) ra đầu ngón chân thứ tư (Túc Khiếu Âm).',
    pathCoords: [
      [0.12, 1.54, 0.22],  // GB1 Đồng Tử Liêu
      [0.16, 1.58, 0.05],  // GB8 Suất Cốc
      [0.12, 1.36, -0.12], // GB20 Phong Trì
      [0.32, 1.24, -0.05], // GB21 Kiên Tỉnh
      [0.3, 0.72, 0.12],   // GB24 Nhật Nguyệt
      [0.26, 0.45, 0.1],   // GB26 Đới Mạch
      [0.28, 0.1, -0.1],   // GB30 Hoàn Khiêu
      [0.3, -0.45, 0.04],  // GB31 Phong Thị
      [0.28, -0.85, 0.04], // GB34 Dương Lăng Tuyền
      [0.26, -1.35, 0.03], // GB39 Huyền Chung
      [0.24, -1.6, 0.04],  // GB40 Khâu Khư
      [0.23, -1.72, 0.1]   // GB41 Túc Lâm Khấp & GB44 Túc Khiếu Âm
    ],
    points: [
      {
        id: 'GB20',
        code: 'GB20',
        name: 'Phong Trì',
        vietnameseName: 'Phong Trì (Ao Của Gió - Trừ Phong Đầu Mặt Cổ)',
        chineseName: '风池',
        meridianId: 'GB',
        meridianName: 'Túc Thiếu Dương Đởm Kinh',
        position: [0.12, 1.36, -0.12],
        isBilateral: true,
        location: 'Ở chỗ lõm phía dưới xương chẩm, giữa cơ thang và cơ ức đòn chũm.',
        depth: 'Châm hướng mũi kim về phía mắt đối diện 0.8 - 1.2 thốn (Tránh đâm sâu trúng hành tủy).',
        anatomy: 'Cơ thang, cơ gối đầu, dây thần kinh chẩm lớn.',
        actions: 'Khu phong giải biểu, thanh đầu mục, sáng mắt thông tai, tức phong chỉ thống.',
        indications: ['Đau đầu, đau nửa đầu (Migraine), hoa mắt chóng mặt', 'Cảm mạo phong hàn sốt cao, cứng cổ gáy', 'Tăng huyết áp, mất ngủ'],
        specialRole: 'Hội huyệt của Đởm, Tam Tiêu và Dương Duy Mạch'
      },
      {
        id: 'GB30',
        code: 'GB30',
        name: 'Hoàn Khiêu',
        vietnameseName: 'Hoàn Khiêu (Đặc Trị Đau Thần Kinh Tọa & Liệt Chân)',
        chineseName: '环跳',
        meridianId: 'GB',
        meridianName: 'Túc Thiếu Dương Đởm Kinh',
        position: [0.28, 0.1, -0.1],
        isBilateral: true,
        location: 'Nằm nghiêng co chân trên, huyệt ở điểm nối 1/3 ngoài và 2/3 trong của đường nối từ mấu chuyển lớn xương đùi tới mỏm cùng xương cùng.',
        depth: 'Châm thẳng 2.0 - 3.5 thốn. Cảm giác đắc khí phóng như điện giật xuống bàn chân.',
        anatomy: 'Cơ mông to, cơ hình lê, dây thần kinh tọa to (Sciatic nerve).',
        actions: 'Khu phong hóa thấp, thông kinh hoạt lạc vùng hông mông và chi dưới.',
        indications: ['Đau thần kinh tọa kinh niên', 'Thoát vị đĩa đệm thắt lưng', 'Liệt nửa người sau đột quỵ'],
        specialRole: 'Hội huyệt của Đởm và Bàng Quang Kinh'
      },
      {
        id: 'GB34',
        code: 'GB34',
        name: 'Dương Lăng Tuyền',
        vietnameseName: 'Dương Lăng Tuyền (Hội Huyệt Của Gân Cốt Toàn Thân)',
        chineseName: '阳陵泉',
        meridianId: 'GB',
        meridianName: 'Túc Thiếu Dương Đởm Kinh',
        position: [0.28, -0.85, 0.04],
        isBilateral: true,
        location: 'Ở chỗ lõm phía trước dưới đầu nhỏ xương mác ngoài cẳng chân.',
        depth: 'Châm thẳng 1.0 - 1.5 thốn.',
        anatomy: 'Đầu nhỏ xương mác, cơ mác bên dài, thần kinh mác chung.',
        actions: 'Sơ can lợi đởm, thư cân hoạt lạc, thanh nhiệt hóa thấp hạ chi.',
        indications: ['Co rút gân cơ, viêm gân, cứng khớp gối', 'Đau thần kinh tọa, đau mạn sườn', 'Viêm túi mật, giun chui ống mật'],
        specialRole: 'Hợp Thổ huyệt của Đởm, Bát Hội Huyệt chủ về CÂN (Gân)'
      }
    ]
  },

  // 12. TÚC QUYẾT ÂM CAN KINH (LR)
  {
    id: 'LR',
    code: 'LR',
    name: 'Túc Quyết Âm Can Kinh',
    vietnameseName: 'Kinh Can (Gan - Tàng Huyết & Sơ Tiết)',
    element: 'Mộc',
    yinYang: 'Âm',
    limb: 'Túc',
    color: '#059669',
    glowColor: '#10b981',
    flowTime: '1h - 3h (Giờ Sửu)',
    totalPoints: 14,
    isBilateral: true,
    description: 'Chủ về sơ tiết điều hòa khí huyết, tàng huyết, chủ cân cốt, khai khiếu ra mắt, liên quan tới tính khí và gân cơ.',
    pathWayDescription: 'Khởi từ góc ngoài móng ngón chân cái (Đại Đôn), qua kẽ ngón 1-2 (Hành Gian, Thái Xung), trước mắt cá trong (Trung Phong), mặt trong cẳng chân (Tam Âm Giao, Lãi Câu), nếp trong gối (Khúc Tuyền), đùi, qua bộ phận sinh dục ngoài, lên bụng (Chương Môn) và tận cùng dưới núm vú ở khoang liên sườn 6 (Kỳ Môn).',
    pathCoords: [
      [0.2, -1.75, 0.12],  // LR1 Đại Đôn
      [0.21, -1.7, 0.11],  // LR2 Hành Gian
      [0.2, -1.63, 0.09],  // LR3 Thái Xung
      [0.18, -1.58, 0.04], // LR4 Trung Phong
      [0.18, -1.3, 0.02],  // LR5 Lãi Câu
      [0.19, -0.85, 0.03], // LR8 Khúc Tuyền
      [0.24, 0.45, 0.12],  // LR13 Chương Môn
      [0.18, 0.88, 0.18]   // LR14 Kỳ Môn
    ],
    points: [
      {
        id: 'LR3',
        code: 'LR3',
        name: 'Thái Xung',
        vietnameseName: 'Thái Xung (Nguyên Huyệt - Bình Can Tức Phong & Hạ Huyết Áp)',
        chineseName: '太冲',
        meridianId: 'LR',
        meridianName: 'Túc Quyết Âm Can Kinh',
        position: [0.2, -1.63, 0.09],
        isBilateral: true,
        location: 'Trên mu bàn chân, từ kẽ ngón chân 1 và 2 đo lên 1.5 thốn ở chỗ lõm giữa hai xương bàn chân.',
        depth: 'Châm thẳng 0.5 - 1.0 thốn.',
        anatomy: 'Khe giữa gân cơ duỗi dài ngón cái và ngón chân, thần kinh mác sâu.',
        actions: 'Bình can tức phong, sơ can giải uất, thanh nhiệt tức hỏa, điều hòa khí huyết.',
        indications: ['Tăng huyết áp, đau đầu căng thẳng, cáu gắt mất ngủ', 'Rối loạn kinh nguyệt, đau bụng kinh do can khí uất', 'Đau mắt đỏ, hoa mắt chóng mặt'],
        specialRole: 'Nguyên huyệt, Du Thổ huyệt của Can, Tứ Quan Huyệt (kết hợp Hợp Cốc)'
      },
      {
        id: 'LR14',
        code: 'LR14',
        name: 'Kỳ Môn',
        vietnameseName: 'Kỳ Môn (Mộ Huyệt Của Can Tạng)',
        chineseName: '期门',
        meridianId: 'LR',
        meridianName: 'Túc Quyết Âm Can Kinh',
        position: [0.18, 0.88, 0.18],
        isBilateral: true,
        location: 'Tại khoang liên sườn 6, thẳng dưới núm vú, cách đường giữa ngực 4 thốn.',
        depth: 'Châm xiên ngang 0.5 - 0.8 thốn (Tuyệt đối không đâm sâu tránh thủng gan, phổi).',
        anatomy: 'Cơ liên sườn 6, thần kinh liên sườn 6.',
        actions: 'Sơ can hạ khí, hóa ứ thông lạc, lý khí khoan hung.',
        indications: ['Viêm gan, đau hạ sườn phải, gan nhiễm mỡ', 'Ợ chua, nấc, đau dạ dày', 'Sốt rét, trầm cảm uất ức'],
        specialRole: 'Mộ huyệt của Can Tạng'
      }
    ]
  },

  // 13. ĐỐC MẠCH (GV / DU MAI)
  {
    id: 'GV',
    code: 'GV',
    name: 'Đốc Mạch (Kỳ Kinh Bát Mạch)',
    vietnameseName: 'Đốc Mạch (Biển Của Tất Cả Kinh Dương - Cột Sống)',
    element: 'Âm Dương',
    yinYang: 'Dương',
    limb: 'Mạch Kỳ',
    color: '#d97706',
    glowColor: '#fbbf24',
    flowTime: 'Lưu thông nguyên khí Dương toàn thân',
    totalPoints: 28,
    isBilateral: false,
    description: 'Chạy dọc chính giữa cột sống lưng lên đỉnh đầu tới môi trên, thống soái và quản lý toàn bộ kinh khí của tất cả các kinh Dương.',
    pathWayDescription: 'Khởi từ huyệt Trường Cường (dưới đáy xương cụt), chạy ngược dọc giữa cột sống (Mệnh Môn, Tích Trung, Đại Chùy), lên gáy (Phong Phủ), đỉnh đầu (Bách Hội), trán (Ấn Đường), mũi đến môi trên (Nhân Trung, Ngân Giao).',
    pathCoords: [
      [0.0, 0.05, -0.15],  // GV1 Trường Cường
      [0.0, 0.22, -0.2],   // GV3 Yêu Dương Quan
      [0.0, 0.45, -0.22],  // GV4 Mệnh Môn
      [0.0, 0.82, -0.22],  // GV9 Chí Dương
      [0.0, 1.25, -0.2],   // GV14 Đại Chùy
      [0.0, 1.38, -0.16],  // GV16 Phong Phủ
      [0.0, 1.72, 0.02],   // GV20 Bách Hội
      [0.0, 1.55, 0.26],   // EX-HN3 Ấn Đường
      [0.0, 1.45, 0.24]    // GV26 Nhân Trung
    ],
    points: [
      {
        id: 'GV4',
        code: 'GV4',
        name: 'Mệnh Môn',
        vietnameseName: 'Mệnh Môn (Cửa Của Sinh Mệnh & Hỏa Chân Dương)',
        chineseName: '命门',
        meridianId: 'GV',
        meridianName: 'Đốc Mạch',
        position: [0.0, 0.45, -0.22],
        isBilateral: false,
        location: 'Tại chỗ lõm dưới mỏm gai đốt sống thắt lưng 2 (L2), đối diện rốn ở phía trước.',
        depth: 'Châm thẳng hoặc hơi xiên lên 0.5 - 1.0 thốn; đặc biệt rất thích hợp cứu ngải.',
        anatomy: 'Dây chằng trên gai, màng cứng ống tủy sống.',
        actions: 'Bồi bổ chân hỏa, tráng dương ích thận, cố tinh sáp niệu, ấm tỳ dương.',
        indications: ['Liệt dương, xuất tinh sớm, vô sinh nam nữ', 'Đau thắt lưng lạnh, tê lạnh tay chân', 'Tiêu chảy sáng sớm (Ngũ canh tả)'],
        specialRole: 'Huyệt cội nguồn sinh mệnh của Đốc Mạch'
      },
      {
        id: 'GV14',
        code: 'GV14',
        name: 'Đại Chùy',
        vietnameseName: 'Đại Chùy (Hội Tụ Của 6 Kinh Dương Toàn Thân)',
        chineseName: '大椎',
        meridianId: 'GV',
        meridianName: 'Đốc Mạch',
        position: [0.0, 1.25, -0.2],
        isBilateral: false,
        location: 'Tại chỗ lõm dưới gai đốt sống cổ thứ 7 (C7) - đốt sống gồ to nhất khi cúi cổ.',
        depth: 'Châm hơi xiên lên trên 0.5 - 1.0 thốn. Tuyệt đối không đâm sâu quá 1.5 thốn.',
        anatomy: 'Dây chằng trên gai gáy, nhánh sau thần kinh sống cổ 8.',
        actions: 'Giải biểu thoái nhiệt cực mạnh, thông dương ích khí, định suyễn, trị phong.',
        indications: ['Sốt cao co giật, cảm mạo phong nhiệt', 'Hen phế quản khó thở', 'Đau cứng cổ gáy gù lưng'],
        specialRole: 'Hội huyệt của Đốc Mạch với 6 Kinh Dương'
      },
      {
        id: 'GV20',
        code: 'GV20',
        name: 'Bách Hội',
        vietnameseName: 'Bách Hội (Trăm Kinh Hội Tụ - Đỉnh Đầu)',
        chineseName: '百会',
        meridianId: 'GV',
        meridianName: 'Đốc Mạch',
        position: [0.0, 1.72, 0.02],
        isBilateral: false,
        location: 'Tại đỉnh đầu, giao điểm của đường nối hai đỉnh vành tai với đường chính giữa dọc trán gáy.',
        depth: 'Châm luồn dưới da (châm xiên) 0.5 - 0.8 thốn.',
        anatomy: 'Cân sọ, mạng mạch máu thần kinh chẩm lớn và trán.',
        actions: 'Thăng dương cử hãm, khai khiếu định thần, bình can tức phong, thông kinh lạc.',
        indications: ['Sa trực tràng, sa tử cung, trĩ (Thăng khí)', 'Đau đầu, hoa mắt chóng mặt, huyết áp thấp hoặc cao', 'Hôn mê sau đột quỵ, mất ngủ'],
        specialRole: 'Hội huyệt của Đốc Mạch với Can, Bàng Quang và Tam Dương'
      },
      {
        id: 'GV26',
        code: 'GV26',
        name: 'Nhân Trung',
        vietnameseName: 'Nhân Trung (Huyệt Cấp Cứu Hồi Sinh Đệ Nhất)',
        chineseName: '人中',
        meridianId: 'GV',
        meridianName: 'Đốc Mạch',
        position: [0.0, 1.45, 0.24],
        isBilateral: false,
        location: 'Trên rãnh nhân trung, tại điểm nối 1/3 trên và 2/3 dưới rãnh nhân trung.',
        depth: 'Châm chếch lên trên 0.3 - 0.5 thốn hoặc bấm móng tay mạnh cấp cứu.',
        anatomy: 'Cơ vòng môi, nhánh thần kinh mặt và thần kinh dưới ổ mắt.',
        actions: 'Khai khiếu tỉnh thần cực mạnh, hồi dương cứu nghịch, giải co giật.',
        indications: ['Ngất, hôn mê, say nắng, đột quỵ cấp', 'Co giật động kinh, sốt cao mê sảng', 'Đau thắt lưng cấp tính'],
        specialRole: 'Hội huyệt của Đốc Mạch, Đại Trường và Vị Kinh'
      }
    ]
  },

  // 14. NHÂM MẠCH (CV / REN MAI)
  {
    id: 'CV',
    code: 'CV',
    name: 'Nhâm Mạch (Kỳ Kinh Bát Mạch)',
    vietnameseName: 'Nhâm Mạch (Biển Của Tất Cả Kinh Âm - Mặt Trước)',
    element: 'Âm Dương',
    yinYang: 'Âm',
    limb: 'Mạch Kỳ',
    color: '#8b5cf6',
    glowColor: '#a78bfa',
    flowTime: 'Lưu thông tinh huyết, nuôi dưỡng thai sản toàn thân',
    totalPoints: 24,
    isBilateral: false,
    description: 'Chạy dọc chính giữa mặt trước cơ thể từ đáy chậu lên qua bụng, ngực, cổ tới cằm dưới môi, chủ quản toàn bộ kinh mạch Âm và sự sinh sản.',
    pathWayDescription: 'Khởi từ Hội Âm, qua xương mu (Khúc Cốt), dọc giữa bụng (Quan Nguyên, Khí Hải, Thần Khuyết), lên ngực (Trung Quản, Đản Trung), cổ (Thiên Đột) và kết thúc ở môi dưới (Thừa Tương).',
    pathCoords: [
      [0.0, 0.0, 0.0],     // CV1 Hội Âm
      [0.0, 0.1, 0.18],    // CV2 Khúc Cốt
      [0.0, 0.22, 0.2],    // CV3 Trung Cực
      [0.0, 0.3, 0.21],    // CV4 Quan Nguyên
      [0.0, 0.38, 0.22],   // CV6 Khí Hải (Đan Điền)
      [0.0, 0.45, 0.22],   // CV8 Thần Khuyết (Rốn)
      [0.0, 0.75, 0.22],   // CV12 Trung Quản
      [0.0, 1.05, 0.2],    // CV17 Đản Trung
      [0.0, 1.25, 0.14],   // CV22 Thiên Đột
      [0.0, 1.4, 0.22]     // CV24 Thừa Tương
    ],
    points: [
      {
        id: 'CV4',
        code: 'CV4',
        name: 'Quan Nguyên',
        vietnameseName: 'Quan Nguyên (Cửa Của Nguyên Khí - Đan Điền Dưới)',
        chineseName: '关元',
        meridianId: 'CV',
        meridianName: 'Nhâm Mạch',
        position: [0.0, 0.3, 0.21],
        isBilateral: false,
        location: 'Trên đường giữa bụng dưới, cách dưới rốn 3 thốn (ngang bờ trên xương mu 2 thốn).',
        depth: 'Châm thẳng 1.0 - 1.5 thốn sau khi bệnh nhân đã đi tiểu (Tránh bàng quang căng). Cứu ngải rất tốt.',
        anatomy: 'Đường trắng giữa bụng, thần kinh liên sườn 12.',
        actions: 'Đại bổ nguyên âm nguyên dương, bồi thận cố bản, điều kinh chỉ đới, hồi dương.',
        indications: ['Hư lao suy nhược, sợ lạnh, tay chân lạnh ngắt', 'Di tinh, liệt dương, xuất tinh sớm, tiểu đêm', 'Rối loạn kinh nguyệt, thống kinh, vô sinh'],
        specialRole: 'Mộ huyệt của Tiểu Trường, Hội của Nhâm Mạch với 3 kinh Âm chân'
      },
      {
        id: 'CV6',
        code: 'CV6',
        name: 'Khí Hải',
        vietnameseName: 'Khí Hải (Biển Của Khí Toàn Thân)',
        chineseName: '气海',
        meridianId: 'CV',
        meridianName: 'Nhâm Mạch',
        position: [0.0, 0.38, 0.22],
        isBilateral: false,
        location: 'Trên đường giữa bụng dưới, cách dưới rốn 1.5 thốn.',
        depth: 'Châm thẳng 1.0 - 1.5 thốn hoặc cứu ngải.',
        anatomy: 'Đường trắng giữa bụng, thần kinh liên sườn 11.',
        actions: 'Ích khí bổ thận, điều hòa khí huyết, sinh cơ trục trệ.',
        indications: ['Khí hư đoản hơi, mệt mỏi đuối sức', 'Sa dạ con, trĩ, sa trực tràng', 'Đầy bụng tiêu chảy mạn'],
        specialRole: 'Huyệt gốc chứa Chân Khí toàn thân'
      },
      {
        id: 'CV12',
        code: 'CV12',
        name: 'Trung Quản',
        vietnameseName: 'Trung Quản (Mộ Huyệt Vị Tạng & Bát Hội Của Phủ)',
        chineseName: '中脘',
        meridianId: 'CV',
        meridianName: 'Nhâm Mạch',
        position: [0.0, 0.75, 0.22],
        isBilateral: false,
        location: 'Trên đường giữa bụng trên, từ rốn đo lên 4 thốn (chính giữa rốn và góc ức).',
        depth: 'Châm thẳng 1.0 - 1.5 thốn.',
        anatomy: 'Đường trắng giữa bụng, thần kinh liên sườn 7 và 8.',
        actions: 'Hòa vị kiện tỳ, giáng nghịch hóa trệ, điều khí chỉ thống.',
        indications: ['Đau dạ dày cấp mạn tính, viêm loét hành tá tràng', 'Trào ngược dạ dày thực quản, ợ chua, nôn mửa', 'Đầy trướng bụng ăn không tiêu'],
        specialRole: 'Mộ huyệt của Vị Kinh, Bát Hội Huyệt chủ về PHỦ'
      },
      {
        id: 'CV17',
        code: 'CV17',
        name: 'Đản Trung',
        vietnameseName: 'Đản Trung (Hội Huyệt Của Khí & Mộ Huyệt Tâm Bào)',
        chineseName: '膻中',
        meridianId: 'CV',
        meridianName: 'Nhâm Mạch',
        position: [0.0, 1.05, 0.2],
        isBilateral: false,
        location: 'Tại điểm chính giữa xương ức, ngang khoang liên sườn 4 (đường nối giữa 2 núm vú nam giới).',
        depth: 'Châm luồn dưới da (châm xiên) 0.3 - 0.5 thốn.',
        anatomy: 'Thân xương ức, thần kinh liên sườn 4.',
        actions: 'Khoan hung lý khí, thông kinh lạc, chỉ khái bình suyễn, hạ khí khai uất.',
        indications: ['Hen suyễn, khó thở tức ngực, đau thắt ngực', 'Ho đờm, viêm phế quản', 'Thiếu sữa sau sinh, viêm tuyến vú'],
        specialRole: 'Mộ huyệt của Tâm Bào, Bát Hội Huyệt chủ về KHÍ'
      }
    ]
  }
];

/**
 * Chuẩn hóa vòng tuần hoàn khí huyết 12 Chính Kinh (Tử Ngọ Lưu Chú) & 8 Kỳ Kinh Bát Mạch:
 * Phế -> Đại Trường -> Vị -> Tỳ -> Tâm -> Tiểu Trường -> Bàng Quang -> Thận -> Tâm Bào -> Tam Tiêu -> Đởm -> Can -> (quay lại Phế)
 */
export const MERIDIAN_FLOW_META: Record<string, MeridianFlowMeta> = {
  LU: {
    id: 'LU',
    category: 'chinh_kinh',
    cycleOrder: 1,
    prevMeridianId: 'LR',
    nextMeridianId: 'LI',
    flowTime: '3h - 5h (Giờ Dần)',
    yinYang: 'Âm',
    element: 'Kim',
    flowDirectionType: 'Ngực → Tay (Ly tâm)',
    originPointName: 'LU-1 Trung Phủ (Vùng ngực trên)',
    terminalPointName: 'LU-11 Thiếu Thương (Đầu ngón tay cái)',
    flowDirectionSummary: 'Ngực (Trung Phủ) → Mặt trước ngoài cánh tay, cẳng tay → Cổ tay → Đầu ngón cái (Thiếu Thương), giao tiếp sang Kinh Đại Trường.',
    pairedZangFu: 'Tạng Phế (Biểu lý với Đại Trường)',
  },
  LI: {
    id: 'LI',
    category: 'chinh_kinh',
    cycleOrder: 2,
    prevMeridianId: 'LU',
    nextMeridianId: 'ST',
    flowTime: '5h - 7h (Giờ Mão)',
    yinYang: 'Dương',
    element: 'Kim',
    flowDirectionType: 'Tay → Đầu (Hướng tâm)',
    originPointName: 'LI-1 Thương Dương (Góc móng ngón trỏ)',
    terminalPointName: 'LI-20 Nghênh Hương (Cạnh cánh mũi)',
    flowDirectionSummary: 'Ngón trỏ (Thương Dương) → Hợp Cốc → Dọc bờ ngoài cẳng tay, cánh tay → Vai, cổ → Bắt chéo nhân trung sang cạnh mũi đối diện (Nghênh Hương), nối sang Kinh Vị.',
    pairedZangFu: 'Phủ Đại Trường (Biểu lý với Phế)',
  },
  ST: {
    id: 'ST',
    category: 'chinh_kinh',
    cycleOrder: 3,
    prevMeridianId: 'LI',
    nextMeridianId: 'SP',
    flowTime: '7h - 9h (Giờ Thìn)',
    yinYang: 'Dương',
    element: 'Thổ',
    flowDirectionType: 'Đầu → Chân (Ly tâm)',
    originPointName: 'ST-1 Thừa Khấp (Dưới bờ mi mắt)',
    terminalPointName: 'ST-45 Lệ Đoái (Đầu ngón chân thứ 2)',
    flowDirectionSummary: 'Vùng mặt (Thừa Khấp) → Quanh hàm, lên góc trán (Đầu Duy) & đi xuống cổ, ngực, bụng → Mặt trước ngoài đùi, cẳng chân (Túc Tam Lý) → Ngón chân thứ 2 (Lệ Đoái).',
    pairedZangFu: 'Phủ Vị (Biểu lý với Tỳ)',
  },
  SP: {
    id: 'SP',
    category: 'chinh_kinh',
    cycleOrder: 4,
    prevMeridianId: 'ST',
    nextMeridianId: 'HT',
    flowTime: '9h - 11h (Giờ Tỵ)',
    yinYang: 'Âm',
    element: 'Thổ',
    flowDirectionType: 'Chân → Ngực (Hướng tâm)',
    originPointName: 'SP-1 Ẩn Bạch (Góc trong ngón chân cái)',
    terminalPointName: 'SP-21 Đại Bao (Thành ngực bên liên sườn 6)',
    flowDirectionSummary: 'Ngón chân cái (Ẩn Bạch) → Trước mắt cá trong → Mặt trong cẳng chân (Tam Âm Giao), đùi → Bụng, ngực → Tận cùng ở Đại Bao (nách/liên sườn 6), nối sang Kinh Tâm.',
    pairedZangFu: 'Tạng Tỳ (Biểu lý với Vị)',
  },
  HT: {
    id: 'HT',
    category: 'chinh_kinh',
    cycleOrder: 5,
    prevMeridianId: 'SP',
    nextMeridianId: 'SI',
    flowTime: '11h - 13h (Giờ Ngọ)',
    yinYang: 'Âm',
    element: 'Hỏa',
    flowDirectionType: 'Ngực → Tay (Ly tâm)',
    originPointName: 'HT-1 Cực Tuyền (Chính giữa hố nách)',
    terminalPointName: 'HT-9 Thiếu Xung (Đầu ngón tay út)',
    flowDirectionSummary: 'Hố nách (Cực Tuyền) → Dọc bờ trong mặt trước cánh tay, cẳng tay → Cổ tay (Thần Môn) → Góc trong móng ngón út (Thiếu Xung), giao tiếp Kinh Tiểu Trường.',
    pairedZangFu: 'Tạng Tâm (Biểu lý với Tiểu Trường)',
  },
  SI: {
    id: 'SI',
    category: 'chinh_kinh',
    cycleOrder: 6,
    prevMeridianId: 'HT',
    nextMeridianId: 'BL',
    flowTime: '13h - 15h (Giờ Mùi)',
    yinYang: 'Dương',
    element: 'Hỏa',
    flowDirectionType: 'Tay → Đầu (Hướng tâm)',
    originPointName: 'SI-1 Thiếu Trạch (Góc ngoài ngón út)',
    terminalPointName: 'SI-19 Thính Cung (Trước nắp bình tai)',
    flowDirectionSummary: 'Ngón út (Thiếu Trạch) → Bờ trụ bàn tay (Hậu Khê) → Mặt sau ngoài cẳng tay, cánh tay → Bả vai (Thiên Tông) → Cổ, gò má → Trước tai (Thính Cung), nối sang Kinh Bàng Quang.',
    pairedZangFu: 'Phủ Tiểu Trường (Biểu lý với Tâm)',
  },
  BL: {
    id: 'BL',
    category: 'chinh_kinh',
    cycleOrder: 7,
    prevMeridianId: 'SI',
    nextMeridianId: 'KI',
    flowTime: '15h - 17h (Giờ Thân)',
    yinYang: 'Dương',
    element: 'Thủy',
    flowDirectionType: 'Đầu → Chân (Ly tâm)',
    originPointName: 'BL-1 Tình Minh (Khóe mắt trong)',
    terminalPointName: 'BL-67 Chí Âm (Đầu ngón chân út)',
    flowDirectionSummary: 'Khóe mắt trong (Tình Minh) → Trán, đỉnh đầu ra sau gáy → Chia 2 nhánh song song dọc cột sống (hệ Du huyệt tạng phủ) → Mông, sau đùi, khoeo chân (Ủy Trung), bắp chân → Sau mắt cá ngoài → Ngón chân út (Chí Âm).',
    pairedZangFu: 'Phủ Bàng Quang (Biểu lý với Thận)',
  },
  KI: {
    id: 'KI',
    category: 'chinh_kinh',
    cycleOrder: 8,
    prevMeridianId: 'BL',
    nextMeridianId: 'PC',
    flowTime: '17h - 19h (Giờ Dậu)',
    yinYang: 'Âm',
    element: 'Thủy',
    flowDirectionType: 'Chân → Ngực (Hướng tâm)',
    originPointName: 'KI-1 Dũng Tuyền (Giữa gan bàn chân)',
    terminalPointName: 'KI-27 Du Phủ (Dưới xương đòn)',
    flowDirectionSummary: 'Gan bàn chân (Dũng Tuyền) → Vòng sau mắt cá trong (Thái Khê) → Mặt sau trong cẳng chân, đùi → Bụng, ngực sát đường giữa → Dưới xương đòn (Du Phủ), nối sang Kinh Tâm Bào.',
    pairedZangFu: 'Tạng Thận (Biểu lý với Bàng Quang)',
  },
  PC: {
    id: 'PC',
    category: 'chinh_kinh',
    cycleOrder: 9,
    prevMeridianId: 'KI',
    nextMeridianId: 'TE',
    flowTime: '19h - 21h (Giờ Tuất)',
    yinYang: 'Âm',
    element: 'Hỏa',
    flowDirectionType: 'Ngực → Tay (Ly tâm)',
    originPointName: 'PC-1 Thiên Trì (Ngực ngoài núm vú)',
    terminalPointName: 'PC-9 Trung Xung (Đầu ngón tay giữa)',
    flowDirectionSummary: 'Thành ngực (Thiên Trì) → Đường giữa mặt trước cánh tay, nếp khuỷu (Khúc Trạch), giữa 2 gân cẳng tay (Nội Quan) → Gan bàn tay (Lao Cung) → Đầu ngón giữa (Trung Xung).',
    pairedZangFu: 'Tâm Bào Lạc (Biểu lý với Tam Tiêu)',
  },
  TE: {
    id: 'TE',
    category: 'chinh_kinh',
    cycleOrder: 10,
    prevMeridianId: 'PC',
    nextMeridianId: 'GB',
    flowTime: '21h - 23h (Giờ Hợi)',
    yinYang: 'Dương',
    element: 'Hỏa',
    flowDirectionType: 'Tay → Đầu (Hướng tâm)',
    originPointName: 'TE-1 Quan Xung (Góc ngón áp út)',
    terminalPointName: 'TE-23 Ty Trúc Không (Đuôi lông mày)',
    flowDirectionSummary: 'Ngón áp út (Quan Xung) → Mu bàn tay, giữa 2 xương cẳng tay sau (Ngoại Quan) → Khuỷu, mặt ngoài vai → Cổ → Vòng quanh vành tai (Ế Phong) → Đuôi lông mày (Ty Trúc Không), nối Kinh Đởm.',
    pairedZangFu: 'Phủ Tam Tiêu (Biểu lý với Tâm Bào)',
  },
  GB: {
    id: 'GB',
    category: 'chinh_kinh',
    cycleOrder: 11,
    prevMeridianId: 'TE',
    nextMeridianId: 'LR',
    flowTime: '23h - 1h (Giờ Tý)',
    yinYang: 'Dương',
    element: 'Mộc',
    flowDirectionType: 'Đầu → Chân (Ly tâm)',
    originPointName: 'GB-1 Đồng Tử Liêu (Khóe mắt ngoài)',
    terminalPointName: 'GB-44 Túc Khiếu Âm (Ngón chân thứ 4)',
    flowDirectionSummary: 'Khóe mắt ngoài → Ziczac vùng thái dương, sau tai → Vai (Kiên Tỉnh) → Dọc mạn sườn, hông (Hoàn Khiêu) → Mặt ngoài đùi, cẳng chân (Dương Lăng Tuyền) → Trước mắt cá ngoài → Ngón chân thứ 4 (Túc Khiếu Âm).',
    pairedZangFu: 'Phủ Đởm (Biểu lý với Can)',
  },
  LR: {
    id: 'LR',
    category: 'chinh_kinh',
    cycleOrder: 12,
    prevMeridianId: 'GB',
    nextMeridianId: 'LU',
    flowTime: '1h - 3h (Giờ Sửu)',
    yinYang: 'Âm',
    element: 'Mộc',
    flowDirectionType: 'Chân → Ngực (Hướng tâm)',
    originPointName: 'LR-1 Đại Đôn (Góc ngoài ngón chân cái)',
    terminalPointName: 'LR-14 Kỳ Môn (Khoang liên sườn 6)',
    flowDirectionSummary: 'Ngón chân cái (Đại Đôn) → Mu bàn chân (Thái Xung) → Bắt chéo phía trong cẳng chân (Tam Âm Giao), đùi → Bộ phận sinh dục ngoài → Hạ sườn (Chương Môn, Kỳ Môn), kết thúc vòng tuần hoàn quay về Phế.',
    pairedZangFu: 'Tạng Can (Biểu lý với Đởm)',
  },
  GV: {
    id: 'GV',
    category: 'ky_kinh',
    flowTime: 'Tổng quản Dương khí 6 kinh Dương',
    yinYang: 'Dương',
    element: 'Âm Dương',
    flowDirectionType: 'Đáy chậu → Đầu mặt (Thăng dương)',
    originPointName: 'GV-1 Trường Cường (Đầu chóp xương cụt)',
    terminalPointName: 'GV-28 Ngân Giao / GV-29 Ấn Đường',
    flowDirectionSummary: 'Đáy chậu xương cụt (Trường Cường) → Chạy ngược thẳng lên dọc chính giữa cột sống (Mệnh Môn, Đại Chùy) → Gáy (Phong Phủ) → Đỉnh đầu (Bách Hội) → Trán, mũi, nhân trung xuống lợi trên.',
    pairedZangFu: 'Não Tủy & Cột Sống (Dương Mạch Chi Hải)',
    openingPointCode: 'SI3',
    openingPointName: 'Hậu Khê (Thông Đốc Mạch)',
  },
  CV: {
    id: 'CV',
    category: 'ky_kinh',
    flowTime: 'Tổng quản Âm huyết 6 kinh Âm & Thai sản',
    yinYang: 'Âm',
    element: 'Âm Dương',
    flowDirectionType: 'Đáy chậu → Ngực mặt (Nhâm mạch)',
    originPointName: 'CV-1 Hội Âm (Đáy chậu)',
    terminalPointName: 'CV-24 Thừa Tương (Hõm dưới môi dưới)',
    flowDirectionSummary: 'Hội Âm → Vượt bờ trên xương mu → Dọc đường trắng giữa bụng (Quan Nguyên, Khí Hải, Thần Khuyết, Trung Quản) → Xương ức (Đản Trung) → Hõm cổ (Thiên Đột) → Tận ở môi dưới (Thừa Tương).',
    pairedZangFu: 'Bào Cung & Tam Tiêu (Âm Mạch Chi Hải)',
    openingPointCode: 'LU7',
    openingPointName: 'Liệt Khuyết (Thông Nhâm Mạch)',
  },
  CHONG: {
    id: 'CHONG',
    category: 'ky_kinh',
    flowTime: 'Thập Nhị Kinh Chi Hải (Biển của 12 Kinh & Huyết Hải)',
    yinYang: 'Âm',
    element: 'Âm Dương',
    flowDirectionType: 'Kỳ Kinh Bát Mạch',
    originPointName: 'CV-1 Hội Âm / ST-30 Khí Xung',
    terminalPointName: 'KI-21 U Môn & Lên Họng Miệng',
    flowDirectionSummary: 'Từ bào cung xuống Hội Âm, ra Khí Xung rồi nhập vào Kinh Thận chạy thẳng lên hai bên rốn tới ngực (KI-11 → KI-21); nhánh xuống đi vào mặt trong đùi và bàn chân.',
    pairedZangFu: 'Thận - Tỳ Vị & Bào Cung (Huyết Hải)',
    openingPointCode: 'SP4',
    openingPointName: 'Công Tôn (Thông Xung Mạch)',
    memberPointCodes: ['CV1', 'ST30', 'KI11', 'KI12', 'KI13', 'KI14', 'KI15', 'KI16', 'KI17', 'KI18', 'KI19', 'KI20', 'KI21', 'SP4'],
  },
  DAI: {
    id: 'DAI',
    category: 'ky_kinh',
    flowTime: 'Ước thúc các kinh dọc chạy quanh thắt lưng',
    yinYang: 'Dương',
    element: 'Âm Dương',
    flowDirectionType: 'Kỳ Kinh Bát Mạch',
    originPointName: 'LR-13 Chương Môn (Dưới sườn cụt)',
    terminalPointName: 'Vòng quanh eo lưng (GB-26, GB-27, GB-28)',
    flowDirectionSummary: 'Khởi từ dưới sườn cụt vùng Can-Đởm (Chương Môn), chạy nghiêng xuống huyệt Đới Mạch (GB-26), Ngũ Khu, Duy Đạo rồi thắt vòng ngang quanh thắt lưng như chiếc đai.',
    pairedZangFu: 'Can Đởm & Hạ Tiêu Đới Hạ',
    openingPointCode: 'GB41',
    openingPointName: 'Túc Lâm Khấp (Thông Đới Mạch)',
    memberPointCodes: ['LR13', 'GB26', 'GB27', 'GB28', 'GB41'],
  },
  YINQIAO: {
    id: 'YINQIAO',
    category: 'ky_kinh',
    flowTime: 'Điều tiết Âm khí hai chi dưới & giấc ngủ (Khép mi)',
    yinYang: 'Âm',
    element: 'Âm Dương',
    flowDirectionType: 'Kỳ Kinh Bát Mạch',
    originPointName: 'KI-6 Chiếu Hải / KI-2 Nhiên Cốc',
    terminalPointName: 'BL-1 Tình Minh (Khóe mắt trong)',
    flowDirectionSummary: 'Từ dưới mắt cá trong (Chiếu Hải), lên Giao Tín, chạy dọc mặt trong đùi qua sinh dục, lên ngực vào Khuyết Bồn, lên cổ qua Nhân Nghênh và tận ở khóe mắt trong (Tình Minh).',
    pairedZangFu: 'Thận & Nhãn Cầu (Hợp mi ngủ)',
    openingPointCode: 'KI6',
    openingPointName: 'Chiếu Hải (Thông Âm Kiều)',
    memberPointCodes: ['KI2', 'KI6', 'KI8', 'ST12', 'ST9', 'BL1'],
  },
  YANGQIAO: {
    id: 'YANGQIAO',
    category: 'ky_kinh',
    flowTime: 'Điều tiết Dương khí vận động chi dưới & tỉnh táo (Mở mi)',
    yinYang: 'Dương',
    element: 'Âm Dương',
    flowDirectionType: 'Kỳ Kinh Bát Mạch',
    originPointName: 'BL-62 Thân Mạch (Dưới mắt cá ngoài)',
    terminalPointName: 'BL-1 Tình Minh → GB-20 Phong Trì',
    flowDirectionSummary: 'Từ mắt cá ngoài (Thân Mạch, Bộc Tham), dọc mặt ngoài chân qua Cự Liêu đùi lên sườn, vai (Nhu Du, Kiên Ngung, Cự Cốt), qua khóe miệng lên khóe mắt trong (Tình Minh) và vòng ra gáy (Phong Trì).',
    pairedZangFu: 'Bàng Quang & Cân Cơ Chi Dưới',
    openingPointCode: 'BL62',
    openingPointName: 'Thân Mạch (Thông Dương Kiều)',
    memberPointCodes: ['BL62', 'BL61', 'BL59', 'GB29', 'SI10', 'LI15', 'LI16', 'ST4', 'ST3', 'ST1', 'BL1', 'GB20'],
  },
  YINWEI: {
    id: 'YINWEI',
    category: 'ky_kinh',
    flowTime: 'Liên kết toàn bộ các Kinh Âm (Chủ vùng Tâm - Ngực - Vị)',
    yinYang: 'Âm',
    element: 'Âm Dương',
    flowDirectionType: 'Kỳ Kinh Bát Mạch',
    originPointName: 'KI-9 Trúc Tân (Mặt trong cẳng chân)',
    terminalPointName: 'CV-22 Thiên Đột → CV-23 Liêm Tuyền',
    flowDirectionSummary: 'Khởi từ hội của tam âm ở cẳng chân (Trúc Tân KI-9), lên mặt trong đùi vào bụng dưới (Phủ Xá, Đại Hoành, Phúc Ai), lên hông sườn (Kỳ Môn) rồi nhập Nhâm Mạch tới yết hầu (Thiên Đột, Liêm Tuyền).',
    pairedZangFu: 'Tâm - Tâm Bào & Các Kinh Âm',
    openingPointCode: 'PC6',
    openingPointName: 'Nội Quan (Thông Âm Duy)',
    memberPointCodes: ['KI9', 'SP13', 'SP15', 'SP16', 'LR14', 'CV22', 'CV23', 'PC6'],
  },
  YANGWEI: {
    id: 'YANGWEI',
    category: 'ky_kinh',
    flowTime: 'Liên kết toàn bộ các Kinh Dương (Chủ biểu hàn nhiệt)',
    yinYang: 'Dương',
    element: 'Âm Dương',
    flowDirectionType: 'Kỳ Kinh Bát Mạch',
    originPointName: 'BL-63 Kim Môn (Bờ ngoài bàn chân)',
    terminalPointName: 'GV-16 Phong Phủ → GV-15 Á Môn',
    flowDirectionSummary: 'Từ Kim Môn (BL-63) dọc mặt ngoài chân qua Dương Giao (GB-35), lên hông vai (Nhu Du, Thiên Liêu, Kiên Tỉnh), vòng lên trán đầu (Bản Thần, Dương Bạch → Phong Trì) rồi nhập Đốc Mạch tại Phong Phủ, Á Môn.',
    pairedZangFu: 'Biểu Phận & 6 Kinh Dương',
    openingPointCode: 'TE5',
    openingPointName: 'Ngoại Quan (Thông Dương Duy)',
    memberPointCodes: ['BL63', 'GB35', 'SI10', 'TE15', 'GB21', 'GB13', 'GB14', 'GB15', 'GB16', 'GB17', 'GB18', 'GB19', 'GB20', 'GV16', 'GV15', 'TE5'],
  },
};

export interface ExtraordinaryVesselCardInfo {
  id: 'CHONG' | 'DAI' | 'YINQIAO' | 'YANGQIAO' | 'YINWEI' | 'YANGWEI';
  shortLabel: string;
  enName: string;
  viShort: string;
  name: string;
  lineColor: string;
  description: string;
}

export const EXTRAORDINARY_VESSELS_META: ExtraordinaryVesselCardInfo[] = [
  {
    id: 'CHONG',
    shortLabel: 'Xung',
    enName: 'Chong Mai',
    viShort: 'Xung Mạch',
    name: 'Xung Mạch (Huyết Hải)',
    lineColor: '#be123c',
    description: 'Biển của 12 kinh mạch và huyết dịch; thông với huyệt Công Tôn (SP-4).',
  },
  {
    id: 'DAI',
    shortLabel: 'Đới',
    enName: 'Dai Mai',
    viShort: 'Đới Mạch',
    name: 'Đới Mạch (Thắt Lưng)',
    lineColor: '#0d9488',
    description: 'Đường kinh duy nhất chạy ngang thắt lưng ước thúc các kinh dọc; thông Túc Lâm Khấp (GB-41).',
  },
  {
    id: 'YINQIAO',
    shortLabel: 'Â.Kiều',
    enName: 'Yin Qiao',
    viShort: 'Âm Kiều',
    name: 'Âm Kiều Mạch',
    lineColor: '#6d28d9',
    description: 'Chủ điều hòa vận động bên trong chi dưới và đóng mở mi mắt (ngủ ngon); thông Chiếu Hải (KI-6).',
  },
  {
    id: 'YANGQIAO',
    shortLabel: 'D.Kiều',
    enName: 'Yang Qiao',
    viShort: 'Dương Kiều',
    name: 'Dương Kiều Mạch',
    lineColor: '#0369a1',
    description: 'Chủ vận động bên ngoài chi dưới và sự tỉnh táo; thông Thân Mạch (BL-62).',
  },
  {
    id: 'YINWEI',
    shortLabel: 'Â.Duy',
    enName: 'Yin Wei',
    viShort: 'Âm Duy',
    name: 'Âm Duy Mạch',
    lineColor: '#9d174d',
    description: 'Kết nối toàn bộ kinh Âm, đặc trị vùng ngực tim vị quản; thông Nội Quan (PC-6).',
  },
  {
    id: 'YANGWEI',
    shortLabel: 'D.Duy',
    enName: 'Yang Wei',
    viShort: 'Dương Duy',
    name: 'Dương Duy Mạch',
    lineColor: '#b45309',
    description: 'Kết nối toàn bộ kinh Dương, chủ chứng biểu hàn nhiệt phát sốt; thông Ngoại Quan (TE-5).',
  },
];

export interface Tung3DAnchorSpec {
  code: string;
  anchor: [number, number, number]; // Snap-refined onto human-learning.glb at runtime
  isBilateral: boolean;
}

/**
 * 36 Huyệt Đổng Thị Kỳ Huyệt Kinh Điển nhất định vị trực tiếp trên lưới giải phẫu người 3D
 * (kết hợp dữ liệu chi tiết từ 239 huyệt Đổng Thị trong TUNG_POINTS).
 */
export const TUNG_3D_ANCHOR_SPECS: Tung3DAnchorSpec[] = [
  // Khu 11 (Ngón tay)
  { code: '11.01', anchor: [0.614, 1.028, 0.045], isBilateral: true }, // Đại Gian
  { code: '11.06', anchor: [0.578, 0.990, 0.052], isBilateral: true }, // Hoàn Sào
  { code: '11.10', anchor: [0.620, 0.968, 0.064], isBilateral: true }, // 4 Mộc Hỏa
  { code: '11.17', anchor: [0.606, 1.024, 0.048], isBilateral: true }, // Mộc

  // Khu 22 (Bàn tay)
  { code: '22.01', anchor: [0.556, 1.076, 0.044], isBilateral: true }, // Trọng Tử
  { code: '22.02', anchor: [0.541, 1.084, 0.043], isBilateral: true }, // Trọng Tiên
  { code: '22.04', anchor: [0.592, 1.056, 0.021], isBilateral: true }, // Đại Bạch
  { code: '22.05', anchor: [0.552, 1.088, 0.008], isBilateral: true }, // Linh Cốt
  { code: '22.06', anchor: [0.532, 1.042, 0.014], isBilateral: true }, // Trung Bạch
  { code: '22.07', anchor: [0.524, 1.058, 0.009], isBilateral: true }, // Hạ Bạch
  { code: '22.08', anchor: [0.520, 1.044, 0.015], isBilateral: true }, // Uyển Thuận 1
  { code: '22.10', anchor: [0.538, 1.032, 0.052], isBilateral: true }, // Thủ Giải

  // Khu 33 (Cẳng tay)
  { code: '33.04', anchor: [0.465, 1.152, -0.012], isBilateral: true }, // Hỏa Xuyến
  { code: '33.12', anchor: [0.402, 1.275, -0.028], isBilateral: true }, // Tâm Môn
  { code: '33.13', anchor: [0.478, 1.174, 0.040], isBilateral: true }, // Nhân Sĩ
  { code: '33.14', anchor: [0.444, 1.224, 0.045], isBilateral: true }, // Địa Sĩ
  { code: '33.15', anchor: [0.410, 1.272, 0.044], isBilateral: true }, // Thiên Sĩ

  // Khu 66 (Mu bàn chân)
  { code: '66.03', anchor: [0.230, 0.038, 0.165], isBilateral: true }, // Hỏa Ngạnh
  { code: '66.04', anchor: [0.224, 0.046, 0.141], isBilateral: true }, // Hỏa Chủ
  { code: '66.05', anchor: [0.256, 0.038, 0.138], isBilateral: true }, // Môn Kim

  // Khu 77 (Cẳng chân)
  { code: '77.01', anchor: [0.244, 0.105, -0.032], isBilateral: true }, // Chính Cân
  { code: '77.02', anchor: [0.235, 0.148, -0.042], isBilateral: true }, // Chính Tông
  { code: '77.05', anchor: [0.270, 0.150, 0.025], isBilateral: true }, // Tam Trọng 1
  { code: '77.06', anchor: [0.264, 0.205, 0.028], isBilateral: true }, // Tam Trọng 2
  { code: '77.07', anchor: [0.258, 0.260, 0.031], isBilateral: true }, // Tam Trọng 3
  { code: '77.08', anchor: [0.205, 0.416, 0.067], isBilateral: true }, // Tứ Hoa Thượng
  { code: '77.09', anchor: [0.224, 0.295, 0.052], isBilateral: true }, // Tứ Hoa Trung
  { code: '77.11', anchor: [0.235, 0.218, 0.042], isBilateral: true }, // Tứ Hoa Hạ
  { code: '77.18', anchor: [0.141, 0.408, 0.028], isBilateral: true }, // Thận Quan
  { code: '77.19', anchor: [0.182, 0.275, 0.016], isBilateral: true }, // Địa Hoàng
  { code: '77.21', anchor: [0.202, 0.175, 0.008], isBilateral: true }, // Nhân Hoàng

  // Khu 88 (Đùi)
  { code: '88.01', anchor: [0.145, 0.652, 0.115], isBilateral: true }, // Thông Quan
  { code: '88.02', anchor: [0.136, 0.706, 0.118], isBilateral: true }, // Thông Sơn
  { code: '88.03', anchor: [0.128, 0.760, 0.120], isBilateral: true }, // Thông Thiên
  { code: '88.12', anchor: [0.108, 0.715, 0.055], isBilateral: true }, // Minh Hoàng
  { code: '88.13', anchor: [0.100, 0.790, 0.055], isBilateral: true }, // Thiên Hoàng
  { code: '88.14', anchor: [0.118, 0.640, 0.055], isBilateral: true }, // Kỳ Hoàng
  { code: '88.17', anchor: [0.205, 0.718, 0.072], isBilateral: true }, // Tứ Mã Trung

  // Khu 1010 (Đầu mặt)
  { code: '1010.01', anchor: [0.0, 1.843, 0.015], isBilateral: false }, // Chính Hội
  { code: '1010.07', anchor: [0.0, 1.612, -0.014], isBilateral: false }, // Tổng Khu
];

