import { PatientInfo, Vitals, Symptoms, FourExaminations } from '../types';

export interface PresetCase {
  id: string;
  title: string;
  badge: string;
  patientInfo: PatientInfo;
  vitals: Vitals;
  symptoms: Symptoms;
  fourExaminations: FourExaminations;
}

export const PRESET_CASES: PresetCase[] = [
  {
    id: 'case-sciatica',
    title: 'Ca 1: Đau Thần Kinh Tọa Lan Chân Trái - Thoát Vị L4-L5',
    badge: 'Cơ Xương Khớp & Thần Kinh',
    patientInfo: {
      name: 'Nguyễn Văn Hùng',
      age: 48,
      gender: 'Nam',
      occupation: 'Lái xe tải đường dài',
      contact: '0912-345-678'
    },
    vitals: {
      bloodPressure: '130/85',
      heartRate: '76',
      temperature: '36.7',
      spO2: '98',
      bloodGlucose: '5.6'
    },
    symptoms: {
      mainComplaint: 'Đau thắt lưng dữ dội lan dọc mông trái xuống mặt sau đùi, cẳng chân ngoài đến mu bàn chân, kèm tê bì ngón chân cái.',
      onset: 'Khởi phát cách đây 2 tuần sau khi cúi người khiêng lốp xe nặng, đau tăng dữ dội khi ho hoặc hắt hơi, cúi người không được.',
      painCharacteristics: 'Đau buốt nhói như điện giật kèm cảm giác tê rần bỏng rát, đau cố định một chỗ, đau tăng nhiều về đêm.',
      painScale: 8,
      pastMedicalHistory: 'Thoái hóa cột sống thắt lưng 3 năm, không có tiền sử chấn thương gãy xương, dạ dày thỉnh thoảng ợ chua.'
    },
    fourExaminations: {
      vong: 'Dáng đi tập tễnh lệch người sang phải để tránh đau, nét mặt nhăn nhó thống khổ. Lưng co cứng khối cơ cạnh sống bên trái.',
      tongue: 'Chất lưỡi tím ám, hai bên rìa có điểm ứ huyết tím đen. Rêu lưỡi trắng mỏng hơi nhớt.',
      van: 'Tiếng thở dài, rên khẽ khi trở mình trên giường khám. Hơi thở bình thường không hôi.',
      van_ask: 'Sợ lạnh vùng thắt lưng, chân trái lạnh buốt hơn chân phải. Đại tiện ngày 1 lần phân thành khuôn, tiểu đêm 1 lần, mất ngủ do đau nhức ban đêm.',
      thiet: 'Mạch Trầm Huyền Sáp (ấn sâu mới thấy, mạch căng rít khó đi). Nghiệm pháp Lasegue chân trái 40 độ (+) chói buốt. Điểm Valleix (Hoàn Khiêu, Ủy Trung) ấn đau chói thấu xương.'
    }
  },
  {
    id: 'case-hypertension',
    title: 'Ca 2: Tăng Huyết Áp Kịch Phát - Hoa Mắt Chóng Mặt Căng Thẳng',
    badge: 'Tim Mạch & Thần Kinh',
    patientInfo: {
      name: 'Trần Thị Mai',
      age: 56,
      gender: 'Nữ',
      occupation: 'Kế toán trưởng (áp lực công việc cao)',
      contact: '0983-221-443'
    },
    vitals: {
      bloodPressure: '165/100',
      heartRate: '92',
      temperature: '37.0',
      spO2: '97',
      bloodGlucose: '6.4'
    },
    symptoms: {
      mainComplaint: 'Đau căng trướng hai thái dương và đỉnh đầu như búa bổ, hoa mắt chóng mặt xây xẩm khi đứng dậy, mắt đỏ vằn tia máu.',
      onset: 'Xuất hiện sau đợt thức khuya hoàn thành báo cáo tài chính và cãi cọ căng thẳng trong gia đình.',
      painCharacteristics: 'Đau đầu kiểu căng trướng nảy mạch theo nhịp tim, cảm giác nóng bốc lên mặt và cổ.',
      painScale: 7,
      pastMedicalHistory: 'Tăng huyết áp 4 năm uống Amlodipine 5mg không đều; rối loạn mỡ máu nhẹ.'
    },
    fourExaminations: {
      vong: 'Mặt đỏ gay, mắt có tia máu, nét mặt cáu kỉnh bồn chồn đứng ngồi không yên.',
      tongue: 'Chất lưỡi đỏ sẫm, đầu lưỡi và rìa lưỡi đỏ gai rộp. Rêu lưỡi vàng khô mỏng.',
      van: 'Giọng nói to gắt gỏng, tiếng thở thô ráp, hơi thở nóng.',
      van_ask: 'Miệng đắng, họng khô khát muốn uống nước mát. Thắt lưng và đầu gối hay mỏi yếu. Khó vào giấc ngủ, trằn trọc mộng mị nhiều. Hay bực dọc cáu gắt vô cớ.',
      thiet: 'Mạch Huyền Sác hữu lực ở bộ Quan (căng nảy nhanh 92 lần/phút), bộ Xích trầm tế vô lực. Trán nóng hổi nhưng hai mu bàn chân hơi lạnh.'
    }
  },
  {
    id: 'case-gerd',
    title: 'Ca 3: Trào Ngược Dạ Dày Thực Quản - Đau Thượng Vị Hư Hàn',
    badge: 'Tiêu Hóa & Chuyển Hóa',
    patientInfo: {
      name: 'Lê Hoàng Nam',
      age: 38,
      gender: 'Nam',
      occupation: 'Kỹ sư phần mềm máy tính',
      contact: '0905-112-987'
    },
    vitals: {
      bloodPressure: '115/75',
      heartRate: '68',
      temperature: '36.4',
      spO2: '99',
      bloodGlucose: '5.1'
    },
    symptoms: {
      mainComplaint: 'Ợ chua, ợ hơi liên tục, nóng rát sau xương ức, cảm giác nghẹn vướng cổ họng như mắc cục đờm nuốt không trôi, đau âm ỉ vùng thượng vị đói no đều khó chịu.',
      onset: 'Kéo dài 6 tháng nay, tăng nặng khi ăn đồ dầu mỡ, uống cà phê sáng hoặc thức khuya làm việc.',
      painCharacteristics: 'Đau râm ran âm ỉ vùng chấn thủy, kèm cồn cào rát buốt, thích lấy tay xoa bụng hoặc chườm nước ấm.',
      painScale: 5,
      pastMedicalHistory: 'Nội soi dạ dày 3 tháng trước: Viêm trợt niêm mạc hang vị dạ dày, trào ngược dịch vị độ A.'
    },
    fourExaminations: {
      vong: 'Sắc diện vàng nhạt thiếu tươi nhuận, thể trạng gầy gò, môi nhạt màu.',
      tongue: 'Lưỡi to bệu có hằn vết răng sâu ở hai bên rìa lưỡi. Rêu lưỡi trắng nhớt dính ướt.',
      van: 'Hay ợ hơi phát ra tiếng rõ, giọng nói có phần trầm khàn do dịch vị trào ngược gây viêm thanh quản.',
      van_ask: 'Thích uống nước ấm, sợ uống nước đá lạnh (uống vào là đau quặn bụng và tiêu chảy ngay). Phân nát sống phân, bụng hay sôi ùng ục, mệt mỏi vào buổi chiều.',
      thiet: 'Mạch Trầm Trì Nhược (chậm 68 lần/phút, ấn sâu mới thấy mềm yếu). Sờ da bụng mát lạnh, ấn sâu vùng Trung Quản thấy bệnh nhân thở phào dễ chịu (thiện án).'
    }
  },
  {
    id: 'case-insomnia',
    title: 'Ca 4: Mất Ngủ Mạn Tính & Hồi Hộp Lo Âu - Tâm Tỳ Hư Suy',
    badge: 'Tâm Thần Kinh & Dưỡng Sinh',
    patientInfo: {
      name: 'Phạm Thanh Thảo',
      age: 42,
      gender: 'Nữ',
      occupation: 'Giáo viên trung học',
      contact: '0938-776-554'
    },
    vitals: {
      bloodPressure: '105/70',
      heartRate: '82',
      temperature: '36.6',
      spO2: '98',
      bloodGlucose: '5.3'
    },
    symptoms: {
      mainComplaint: 'Mất ngủ kéo dài hơn 1 năm, trằn trọc 2-3 tiếng mới chợp mắt được, ngủ chập chờn dễ giật mình tỉnh giấc lúc 2-3h sáng rồi thức trắng đến sáng; hồi hộp đánh trống ngực.',
      onset: 'Sau một biến cố tang gia và áp lực thi cử của học sinh, suy nghĩ lo lắng triền miên.',
      painCharacteristics: 'Không đau nhức dữ dội, chỉ thấy nặng đầu vùng đỉnh và gáy, người lúc nào cũng mệt mỏi hụt hơi.',
      painScale: 4,
      pastMedicalHistory: 'Huyết áp thấp tư thế, thiếu máu thiếu sắt nhẹ, từng dùng Rotunda thảo dược nhưng gần đây mất tác dụng.'
    },
    fourExaminations: {
      vong: 'Mắt thâm quầng mệt mỏi, da mặt tái nhợt không bóng bẩy, thần thái uể oải.',
      tongue: 'Chất lưỡi nhạt bợt (pale tongue), rìa lưỡi có dấu răng, rêu lưỡi trắng mỏng khô.',
      van: 'Nói năng nhỏ nhẹ, nói nhiều thì đuối sức hụt hơi, thở nông ngắn.',
      van_ask: 'Ăn uống kém ngon miệng, hay quên việc vặt, hay lo âu sợ sệt vô cớ, kinh nguyệt lượng ít sắc nhạt kéo dài 2 ngày là hết. Thường xuyên mơ thấy ác mộng rượt đuổi.',
      thiet: 'Mạch Tế Nhược (nhỏ như sợi tơ, ấn vào thấy yếu ớt). Ấn huyệt Tâm Du, Cách Du, Tỳ Du thấy hơi ê tức.'
    }
  }
];
