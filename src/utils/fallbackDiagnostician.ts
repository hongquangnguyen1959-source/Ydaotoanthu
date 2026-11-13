import { DiagnosisResult, PatientInfo, Vitals, Symptoms, FourExaminations } from '../types';
import { generateDynamicDiagnosisResult } from './scientificMedicalEngine';

export function runOfflineDiagnosis(
  patient: PatientInfo,
  vitals: Vitals,
  symptoms: Symptoms,
  exam: FourExaminations
): DiagnosisResult {
  const patientName = patient.name || 'Người bệnh';
  const age = patient.age || 45;
  const pText = `${symptoms.mainComplaint} ${symptoms.onset} ${symptoms.painCharacteristics} ${symptoms.pastMedicalHistory} ${exam.vong} ${exam.tongue} ${exam.van} ${exam.van_ask} ${exam.thiet}`.toLowerCase();

  // Scoring function
  const score = (keywords: string[]) => {
    let s = 0;
    for (const kw of keywords) {
      if (pText.includes(kw)) {
        s += kw.length > 5 ? 3 : 2;
      }
    }
    return s;
  };

  // Extract BP numbers
  const bpMatch = vitals.bloodPressure?.match(/(\d+)\s*\/\s*(\d+)/);
  const systolic = bpMatch ? parseInt(bpMatch[1], 10) : 0;

  const scores = {
    gout: score(['gout', 'gút', 'thống phong', 'acid uric', 'uric', 'ngón chân cái', 'khớp bàn ngón chân', 'podagra', 'colchicine', 'febuxostat', 'allopurinol', 'tam diệu']),
    diabetes: score(['tiểu đường', 'đái tháo đường', 'đường huyết', 'tiêu khát', 'metformin', 'hba1c', 'khát nước']),
    sciatica: score(['thần kinh tọa', 'tọa cốt phong', 'thoát vị', 'đau thắt lưng', 'thắt lưng', 'cẳng chân', 'mông', 'cúi người', 'l4-l5', 'l5-s1', 'rễ thần kinh', 'lasegue', 'valleix', 'lan dọc', 'buốt nhói như điện', 'tê rần']),
    hypertension: score(['huyết áp', 'can dương thượng kháng', 'thái dương', 'đỉnh đầu', 'vằn tia máu', 'búa bổ', 'hoa mắt chóng mặt', 'xây xẩm', 'mặt đỏ gay', 'nảy mạch', 'áp lực công việc cao', 'amlodipine', 'cáu gắt']),
    gerd: score(['ợ chua', 'ợ hơi', 'trào ngược', 'thực quản', 'thượng vị', 'dạ dày', 'hang vị', 'chấn thủy', 'nóng rát sau xương ức', 'nghẹn', 'sợ uống nước đá', 'sôi bụng', 'thiện án', 'trung quản']),
    insomnia: score(['mất ngủ', 'ngủ chập chờn', 'thức trắng', 'giật mình lúc 2', 'giật mình lúc 3', 'hồi hộp', 'đánh trống ngực', 'tâm tỳ', 'hay quên', 'ác mộng', 'mệt mỏi hụt hơi', 'mạch tế nhược', 'thần môn']),
    knee: score(['khớp gối', 'đầu gối', 'lục cục', 'leo cầu thang', 'cứng khớp', 'thoái hóa khớp', 'sụn khớp', 'hạc tất phong', 'độc tỵ', 'tất nhãn']),
    bellsPalsy: score(['liệt mặt', 'méo miệng', 'mắt nhắm không kín', 'dây thần kinh vii', 'dây số 7', 'trúng gió lạnh', 'không huýt sáo', 'rãnh mũi má', 'khẩu nhãn oa tà', 'địa thương', 'giáp xa']),
    neckShoulder: score(['cổ vai gáy', 'vai gáy', 'cứng cổ', 'vẹo cổ', 'cột sống cổ', 'quay cổ', 'đau mỏi vai', 'lan xuống cánh tay', 'kiên ngung', 'kiên tỉnh'])
  };

  if (systolic >= 140) scores.hypertension += 6;

  // Find max category
  let maxCat = '';
  let maxScore = -1;
  (Object.keys(scores) as (keyof typeof scores)[]).forEach((cat) => {
    if (scores[cat] > maxScore) {
      maxScore = scores[cat];
      maxCat = cat;
    }
  });

  if (maxScore < 2) {
    return generateDynamicDiagnosisResult(patient, vitals, symptoms, exam);
  }

  // 0. Bệnh Gout / Thống Phong / Tăng Acid Uric Máu
  if (maxCat === 'gout') {
    return {
      summary: `Bệnh nhân ${patientName} (${age} tuổi) được chẩn đoán mắc Viêm khớp Gout cấp tính (Podagra) do đợt bùng phát lắng đọng tinh thể Monosodium Urat tại khớp, Đông y biện chứng thuộc thể Thống Phong (Đàm Nhiệt Ứ Trệ Hóa Hỏa / Phong Thấp Nhiệt Tý).`,
      westernAssessment: {
        provisionalDiagnosis: 'Viêm khớp Gout cấp tính (Acute Gouty Arthritis) / Tăng Acid Uric máu mạn tính',
        icd10: 'M10.0',
        differentialDiagnoses: ['Viêm khớp giả Gout (Pseudogout - lắng đọng Pyrophosphate)', 'Viêm khớp nhiễm khuẩn (Septic Arthritis)', 'Viêm mô tế bào bàn chân'],
        guytonMechanism: 'Theo Guyton & Hall Physiology (15th ed): Nồng độ Acid Uric huyết thanh vượt ngưỡng bão hòa (360 umol/L) kết tinh thành các tinh thể Monosodium Urat dạng kim nhọn lắng đọng tại màng hoạt dịch khớp (đặc biệt khớp ngón chân cái 1). Tinh thể này kích hoạt đại thực bào phóng thích Cytokine viêm IL-1beta và huy động ồ ạt bạch cầu trung tính, giải phóng các enzyme tiêu thể làm bùng phát cơn đau buốt sưng nóng đỏ dữ dội.',
        investigationsNeeded: ['Định lượng Acid Uric máu, C-Reactive Protein (CRP), Tốc độ lắng máu ESR', 'Siêu âm khớp tìm dấu hiệu "đường đôi" (Double contour sign) tại bề mặt sụn', 'X-quang bàn chân phát hiện khuyết xương hình đục lỗ (Punched-out erosions)'],
        redFlags: ['Khớp sưng vỡ mủ hoặc vỡ hạt Tophi dọa nhiễm trùng huyết', 'Sốt cao rét run, lạnh run toàn thân', 'Bí tiểu hoặc đau quặn thận do sỏi urat']
      },
      easternAssessment: {
        syndromePattern: 'Thống Phong - Thể Đàm Nhiệt Ứ Trệ Hóa Hỏa (Phong Thấp Nhiệt Tý)',
        batCuong: 'Lý chứng, Thực nhiệt chứng, Phong thấp nhiệt bế tắc',
        tangPhu: 'Tỳ hư mất vận hóa sinh đàm thấp, Vị nhiệt thiêu đốt, Thận suy giảm đào thải',
        khiHuyet: 'Đàm nhiệt và huyết ứ kết tụ làm tắc nghẽn kinh mạch túc dương minh vị và túc thái âm tỳ, bất thông tắc thống',
        thietChanAnalysis: 'Chất lưỡi đỏ sẫm, rêu lưỡi vàng dính dầy; Mạch Huyền Sác hữu lực hoặc Mạch Nhu Sác thể hiện đàm nhiệt và hỏa uất rất mạnh theo Maciocia.'
      },
      integratedTreatmentPlan: {
        phapTri: 'Thanh nhiệt táo thấp, tư âm lợi thấp, hóa ứ tiêu thũng, thông lạc chỉ thống.',
        herbalPrescription: {
          formulaName: 'Tam Diệu Tán hợp Tứ Diệu Tán gia giảm (Đan Khê Tâm Pháp & Dan Bensky)',
          composition: [
            { herb: 'Hoàng Bá', grams: 12, role: 'Quân', purpose: 'Thanh nhiệt táo thấp hạ tiêu, tả tướng hỏa' },
            { herb: 'Thương Truật', grams: 12, role: 'Quân', purpose: 'Kiện tỳ táo thấp, trừ phong thấp' },
            { herb: 'Thổ Phục Linh', grams: 20, role: 'Thần', purpose: 'Đặc hiệu giải độc, tiêu thũng, đào thải acid uric' },
            { herb: 'Ý Dĩ Nhân', grams: 20, role: 'Thần', purpose: 'Thẩm thấp kiện tỳ, trừ tý' },
            { herb: 'Ngưu Tất', grams: 12, role: 'Tá', purpose: 'Dẫn thuốc quy kinh chi dưới, bổ can thận' },
            { herb: 'Trạch Tả', grams: 12, role: 'Sứ', purpose: 'Lợi thủy thẩm thấp hạ tiêu' }
          ],
          decoctionGuide: 'Sắc ngày 1 thang với 4 bát nước lấy 1 bát rưỡi, uống ấm sau ăn. Uống nhiều nước kiềm ấm trong ngày.',
          modifications: ['Nếu sưng đỏ dữ dội gia Kim ngân hoa 15g, Bồ công anh 15g', 'Nếu đau buốt nhiều gia Ngũ linh脂 10g, Bộc hoàng 10g']
        },
        acupuncturePrescription: {
          classicPoints: [
            { point: 'Thái Bạch (SP-3)', location: 'Bờ trong bàn chân, chỗ lõm sau khớp bàn ngón chân cái', technique: 'Châm tả vê nhẹ 0.5 thốn', purpose: 'Nguyên huyệt kinh Tỳ, thanh tỳ nhiệt tiêu sưng' },
            { point: 'Hành Gian (Liv-2)', location: 'Khe ngón chân 1-2 mu chân', technique: 'Châm tả thấu Thái Xung', purpose: 'Huỳnh huyệt kinh Can, hạ can hỏa dập tắt đau buốt' },
            { point: 'Tam Âm Giao (SP-6)', location: 'Trên mắt cá trong 3 thốn', technique: 'Châm bổ', purpose: 'Giao hội kinh âm, lợi thấp bài độc' }
          ],
          tungPoints: [
            { point: 'Hạ Tam Hoàng (77.17, 77.19, 77.21)', code: 'Mặt trong cẳng chân', dongQiInstructions: 'Day ấn mặt trong cẳng chân 3 phút', purpose: 'Cường thận bài tiết uric acid' }
          ],
          nguyenTaiThuGuidance: 'Kinh nghiệm GS. Nguyễn Tài Thu: Châm tả các huyệt nguyên lạc kết hợp chích nặn máu các huyệt Tỉnh (Ẩn Bạch, Đại Độn) giải sưng tấy đau nhói.',
          westernNeuroscience: 'Châm cứu kích thích thụ thể cảm giác bản thể, phóng thích endorphin và ức chế các con đường truyền tín hiệu NF-kB và NLRP3 inflammasome.'
        },
        clinicalNutrition: {
          dietaryTherapy: 'Chế độ ăn nhân Purin cực thấp (< 100mg/ngày), tăng cường uống nước kiềm (pH 8.5) theo Essentials of Nutrition.',
          foodsToEat: ['Uống 2.5 - 3.0 lít nước ấm/ngày', 'Dưa hấu, dưa chuột, rau cần tây', 'Sữa tươi tách béo, sữa chua', 'Ổi, cam giàu Vitamin C'],
          foodsToAvoid: ['Tuyệt đối cấm bia rượu, nước ngọt Fructose', 'Hải sản (tôm, cua, mực), phủ tạng động vật, thịt đỏ', 'Nước hầm xương đậm đặc, măng tây, nấm'],
          drugNutrientInteractions: ['Khi dùng Colchicine, tránh ăn bưởi chùm vì làm tăng độc tính của Colchicine.']
        },
        qigongAndLifestyle: 'Kê cao chân bị sưng đau khi nằm nghỉ; chườm mát quanh vùng sưng (tránh chườm đá lạnh trực tiếp); không vận động mạnh khi đang có cơn cấp.',
        westernPrescription: {
          protocolName: 'Phác đồ điều trị Gout cấp & Hạ Acid Uric máu (Hướng dẫn BV Bạch Mai, ACR/EULAR & DiPiro)',
          sourceGuidelines: [
            'Dược thư Quốc gia Việt Nam',
            'Hướng dẫn chẩn đoán và điều trị bệnh nội khoa - BV Bạch Mai',
            'Pharmacotherapy: A Pathophysiologic Approach - DiPiro',
            'Sổ tay Sử dụng thuốc MIMS Việt Nam'
          ],
          medications: [
            {
              drugName: 'Colchicine 1mg',
              activeIngredient: 'Colchicine 1mg',
              group: 'Thuốc chống Gout đặc hiệu',
              dosage: 'Ngày 1: Uống 1mg ngay khi khởi phát, sau 1 giờ uống 0.5mg. Ngày 2 trở đi: 0.5mg x 1-2 lần/ngày',
              timing: 'Uống sau bữa ăn với 1 cốc nước lớn',
              mechanism: 'Ức chế sự trùng hợp vi ống của bạch cầu trung tính, ngăn cản sự di chuyển và thực bào tinh thể urat, cắt dập phản ứng viêm cấp tính.',
              contraindications: 'Suy gan/thận nặng, phụ nữ mang thai.'
            },
            {
              drugName: 'Arcoxia 90mg (hoặc Mobic 15mg)',
              activeIngredient: 'Etoricoxib 90mg',
              group: 'NSAID ức chế ưu thế COX-2',
              dosage: '90mg x 1 viên/ngày (trong 5-7 ngày)',
              timing: 'Uống ngay sau bữa ăn no',
              mechanism: 'Ức chế tổng hợp Prostaglandin tại bao khớp, giảm sưng đau đỏ rát.',
              contraindications: 'Tiền sử bệnh tim mạch tiến triển, suy thận.'
            },
            {
              drugName: 'Feburic 40mg (hoặc Allopurinol 100mg)',
              activeIngredient: 'Febuxostat 40mg',
              group: 'Thuốc ức chế Xanthine Oxidase (Hạ Acid Uric)',
              dosage: '40mg x 1 viên/ngày (bắt đầu sau khi hết cơn đau cấp 1-2 tuần)',
              timing: 'Uống vào buổi sáng',
              mechanism: 'Ức chế enzym Xanthine Oxidase, giảm tổng hợp Acid Uric máu.',
              contraindications: 'Đang trong đỉnh điểm cơn Gout cấp tính.'
            },
            {
              drugName: 'Nexium 20mg',
              activeIngredient: 'Esomeprazole 20mg',
              group: 'PPI bảo vệ dạ dày',
              dosage: '20mg x 1 viên/ngày',
              timing: 'Uống trước ăn sáng 30 phút',
              mechanism: 'Bảo vệ niêm mạc dạ dày khi dùng NSAID và Colchicine.',
              contraindications: 'Quá mẫn với esomeprazole.'
            }
          ],
          clinicalCautions: ['Uống tối thiểu 2.5 lít nước/ngày để kiềm hóa nước tiểu và phòng ngừa sỏi thận Urat.'],
          monitoringParameters: ['Acid Uric máu mục tiêu < 360 umol/L (hoặc < 300 umol/L nếu có hạt tophi)', 'Chức năng thận eGFR']
        }
      },
      referencedBooks: [
        'The Practice of Chinese Medicine - Giovanni Maciocia',
        'Chinese Herbal Medicine: Materia Medica - Dan Bensky',
        'Phương Thang Y Học Cổ Truyền - Trần Gia Kỳ',
        'Guyton and Hall Textbook of Medical Physiology',
        'Dược thư Quốc gia Việt Nam',
        'Hướng dẫn BV Bạch Mai'
      ]
    };
  }

  // 1. Đau Thần Kinh Tọa / Thoát Vị Đĩa Đệm L4-L5
  if (maxCat === 'sciatica') {
    return {
      summary: `Bệnh nhân ${patientName} (${age} tuổi) được chẩn đoán mắc Hội chứng chèn ép rễ thần kinh thắt lưng (Đau thần kinh tọa / Tọa Cốt Phong) do tổn thương cơ học đĩa đệm L4-L5, Đông y biện chứng thuộc thể Khí Trệ Huyết Ứ bế tắc kinh lạc.`,
      westernAssessment: {
        provisionalDiagnosis: 'Chèn ép rễ thần kinh thắt lưng (L4-L5 / L5-S1) / Đau thần kinh tọa do thoát vị đĩa đệm',
        icd10: 'M51.1 / M54.3',
        differentialDiagnoses: ['Hội chứng cơ hình lê (Piriformis syndrome)', 'Hẹp ống sống thắt lưng thoái hóa', 'Viêm khớp cùng chậu'],
        guytonMechanism: 'Theo Guyton & Hall Physiology (15th ed): Khối nhân nhầy đĩa đệm thoát vị gây áp lực chèn ép cơ học trực tiếp lên bao rễ thần kinh, đồng thời kích hoạt chuỗi phản ứng viêm vô khuẩn phóng thích Phospholipase A2, TNF-alpha và Prostaglandin E2, dẫn tới thiếu máu nuôi sợi trục thần kinh hông to và gây xung điện đau buốt dọc chi dưới.',
        investigationsNeeded: ['Chụp cộng hưởng từ MRI cột sống thắt lưng xác định tầng đĩa đệm', 'Điện cơ đồ EMG chi dưới đánh giá tổn thương sợi thần kinh vận động/cảm giác', 'X-quang cột sống thắt lưng 4 tư thế (thẳng, nghiêng, cúi, ưỡn)'],
        redFlags: ['Hội chứng chùm đuôi ngựa: Bí tiểu đột ngột hoặc mất tự chủ đại tiểu tiện', 'Tê bì mất cảm giác hoàn toàn vùng yên ngựa đáy chậu', 'Liệt vận động bàn chân (bàn chân rủ foot drop không nhấc mũi chân được)']
      },
      easternAssessment: {
        syndromePattern: 'Tọa Cốt Phong - Thể Khí Trệ Huyết Ứ kiêm Phong Hàn Thấp',
        batCuong: 'Lý chứng, Thực chứng (kiêm Hư ở Can Thận), Thiên Hàn',
        tangPhu: 'Can chủ cân suy giảm, Thận chủ cốt tủy hư tổn, Kinh Bàng quang và Đởm bị ứ trệ',
        khiHuyet: 'Khí trệ huyết ứ kết tụ thành khối đau buốt cố định dọc đường kinh, bất thông tắc thống',
        thietChanAnalysis: 'Chất lưỡi tím ám, có điểm ứ huyết tại rìa lưỡi; Mạch Trầm Huyền Sáp thể hiện mạch đạo tắc nghẽn, huyết hành ngưng trệ điển hình theo Maciocia.'
      },
      integratedTreatmentPlan: {
        phapTri: 'Hoạt huyết hóa ứ, thông kinh hoạt lạc, thư cân chỉ thống, ôn kinh tán hàn.',
        herbalPrescription: {
          formulaName: 'Thân Thống Trục Ứ Thang gia giảm (Y Lâm Cải Thác & Dan Bensky)',
          composition: [
            { herb: 'Đương Quy', grams: 12, role: 'Quân', purpose: 'Hoạt huyết dưỡng huyết, hóa ứ tiêu phù' },
            { herb: 'Xuyên Khung', grams: 10, role: 'Thần', purpose: 'Hành khí trong huyết, thông kinh lạc chi dưới' },
            { herb: 'Đào Nhân', grams: 10, role: 'Thần', purpose: 'Phá huyết tiêu ứ sưng đau' },
            { herb: 'Hồng Hoa', grams: 8, role: 'Tá', purpose: 'Thông kinh chỉ thống' },
            { herb: 'Ngưu Tất', grams: 12, role: 'Sứ', purpose: 'Dẫn thuốc quy kinh chi dưới, bổ can thận cường gân cốt' },
            { herb: 'Địa Long', grams: 10, role: 'Tá', purpose: 'Thông kinh hoạt lạc giải co thắt' }
          ],
          decoctionGuide: 'Sắc ngày 1 thang với 3 bát nước (750ml) còn 1 bát (250ml), uống ấm sau bữa ăn 1 giờ. Nếu trời lạnh đau tăng gia Quế chi 10g, Can khương 6g.',
          modifications: ['Nếu tê bì nhiều gia Mộc qua 12g, Kê huyết đằng 16g', 'Nếu đau buốt dữ dội gia Huyền hồ 10g, Nhũ hương 6g']
        },
        acupuncturePrescription: {
          classicPoints: [
            { point: 'Hoàn Khiêu (GB-30)', location: 'Chỗ lõm sau ngoài mấu chuyển lớn xương đùi', technique: 'Châm sâu 2.5 - 3.5 thốn, đắc khí chạy tê xuống bàn chân', purpose: 'Giải phóng chèn ép rễ thần kinh tại cơ hình lê' },
            { point: 'Ủy Trung (BL-40)', location: 'Chính giữa nếp gấp khoeo chân', technique: 'Châm sâu 1 - 1.5 thốn hoặc chích nặn máu ứ', purpose: 'Đặc hiệu chữa đau lưng ("Yêu bối Ủy Trung cầu")' },
            { point: 'Dương Lăng Tuyền (GB-34)', location: 'Chỗ lõm trước dưới đầu xương mác', technique: 'Châm sâu 1.0 - 1.5 thốn', purpose: 'Hội của Cân, giải co thắt cơ cẳng chân' }
          ],
          tungPoints: [
            { point: 'Linh Cốt (22.05) & Đại Bạch (22.04)', code: 'Khu 22 Mu tay', dongQiInstructions: 'Châm bên đối diện chân đau, kích thích đắc khí mạnh đồng thời bảo bệnh nhân đi lại xoay thắt lưng nhẹ nhàng để cắt cơn đau tức thì.', purpose: 'Ức chế xung đau tủy sống cực mạnh qua cơ chế Gate Control' }
          ],
          nguyenTaiThuGuidance: 'Áp dụng kỹ thuật Mãng Châm của GS. Nguyễn Tài Thu: Dùng kim dài 20-30cm thấu huyệt từ Đại Trường Du xuyên xuống Bát Liêu, kích thích điện châm tần số thưa mau 20Hz trong 25 phút.',
          westernNeuroscience: 'Châm cứu kích thích sợi thần kinh A-beta ức chế dẫn truyền của sợi C tại sừng sau tủy sống (Melzack & Wall Gate Control), kích thích vùng chất xám quanh cống não (PAG) tiết Beta-Endorphin và Enkephalin làm giãn cơ thắt lưng.'
        },
        clinicalNutrition: {
          dietaryTherapy: 'Chế độ ăn giàu Collagen Type II, Omega-3 và Magie giảm viêm mạn tính theo Essentials of Nutrition.',
          foodsToEat: ['Cá béo (cá hồi, cá thu) giàu EPA/DHA', 'Nước hầm xương chậm giàu glucosamine tự nhiên', 'Nghệ vàng ngâm mật ong hoặc Curcumin', 'Rau lá xanh đậm giàu Magie'],
          foodsToAvoid: ['Đường tinh luyện và bánh ngọt (gây phản ứng glycat hóa xơ cứng đĩa đệm)', 'Thịt mỡ động vật, rượu bia, nước đá lạnh'],
          drugNutrientInteractions: ['Nếu dùng thuốc chống viêm NSAID (Meloxicam/Celecoxib), uống sau bữa ăn no để ngừa viêm loét dạ dày.']
        },
        qigongAndLifestyle: 'Nằm nghỉ trên đệm phẳng cứng vừa phải; chườm ấm vùng thắt lưng 20 phút mỗi tối; tập bài Khí công y đạo Kéo Ép Gối Thở Ra Làm Mềm Bụng mỗi ngày 100-200 lần sau bữa ăn.',
        westernPrescription: {
          protocolName: 'Phác đồ điều trị Đau thần kinh tọa / Thoát vị đĩa đệm (Hướng dẫn BV Bạch Mai & DiPiro Pharmacotherapy)',
          sourceGuidelines: [
            'Dược thư Quốc gia Việt Nam - Bộ Y tế',
            'Hướng dẫn chẩn đoán và điều trị bệnh nội khoa - BV Bạch Mai',
            'Pharmacotherapy: A Pathophysiologic Approach - DiPiro',
            'Sổ tay Sử dụng thuốc MIMS Việt Nam'
          ],
          medications: [
            {
              drugName: 'Celebrex 200mg (hoặc Mobic 15mg)',
              activeIngredient: 'Celecoxib 200mg',
              group: 'Kháng viêm không steroid (NSAID ức chế chọn lọc COX-2)',
              dosage: '200mg x 1 viên/ngày (hoặc 100mg x 2 lần/ngày)',
              timing: 'Uống ngay sau bữa ăn no',
              mechanism: 'Ức chế chọn lọc COX-2 theo DiPiro & Katzung, làm giảm tổng hợp Prostaglandin E2 tại bao rễ thần kinh bị chèn ép, hạ sốt giảm đau kháng viêm mạnh mẽ.',
              contraindications: 'Tiền sử dị ứng Sulfonamid, bệnh mạch vành, đột quỵ, loét dạ dày tá tràng tiến triển.'
            },
            {
              drugName: 'Myonal 50mg',
              activeIngredient: 'Eperisone HCl 50mg',
              group: 'Thuốc giãn cơ vân trung ương',
              dosage: '50mg x 3 lần/ngày (sáng, trưa, tối)',
              timing: 'Uống sau bữa ăn chính',
              mechanism: 'Làm giãn cơ vân cột sống thắt lưng qua ức chế phản xạ tủy và giảm tính hưng phấn của thoi cơ, giải phóng chèn ép cơ học.',
              contraindications: 'Quá mẫn với Eperisone, phụ nữ cho con bú.'
            },
            {
              drugName: 'Neurontin 300mg',
              activeIngredient: 'Gabapentin 300mg',
              group: 'Thuốc giảm đau thần kinh (Neuropathic pain agent)',
              dosage: '300mg x 1 viên vào buổi tối trước khi ngủ (tăng dần 300mg x 2-3 lần/ngày nếu đau buốt nhiều)',
              timing: 'Uống trước khi đi ngủ 30 phút',
              mechanism: 'Gắn tiểu đơn vị alpha-2-delta kênh Calci phụ thuộc điện thế, giảm giải phóng Glutamate và Substance P dẫn truyền xung đau dọc rễ thần kinh hông to.',
              contraindications: 'Quá mẫn với Gabapentin; hiệu chỉnh liều khi suy thận (eGFR < 60).'
            },
            {
              drugName: 'Nexium 20mg',
              activeIngredient: 'Esomeprazole 20mg',
              group: 'Ức chế bơm proton (PPI bảo vệ dạ dày)',
              dosage: '20mg x 1 viên/ngày vào buổi sáng',
              timing: 'Uống trước bữa ăn sáng 30 - 60 phút',
              mechanism: 'Ức chế bơm H+/K+-ATPase tại tế bào thành, bảo vệ niêm mạc dạ dày khi phối hợp thuốc kháng viêm NSAID.',
              contraindications: 'Quá mẫn với dẫn chất benzimidazol.'
            }
          ],
          clinicalCautions: [
            'Không phối hợp đồng thời 2 loại thuốc NSAID với nhau vì không tăng tác dụng giảm đau mà làm tăng gấp 4 lần nguy cơ loét dạ dày.',
            'Uống thuốc với một cốc nước đầy (200ml), tránh nằm ngay sau khi uống thuốc.'
          ],
          monitoringParameters: ['Chức năng thận (Creatinin, eGFR)', 'Huyết áp động mạch', 'Dấu hiệu phân đen hoặc cồn cào dạ dày']
        }
      },
      referencedBooks: [
        'The Practice of Chinese Medicine - Giovanni Maciocia',
        'Chinese Herbal Medicine: Materia Medica - Dan Bensky',
        'Phương Thang Y Học Cổ Truyền - Trần Gia Kỳ',
        'Lectures on Tung’s Acupuncture - Dr. Wei-Chieh Young',
        'Mãng Châm - GS. Nguyễn Tài Thu',
        'Guyton and Hall Textbook of Medical Physiology (15th ed)',
        'Dược thư Quốc gia Việt Nam - Bộ Y tế',
        'Pharmacotherapy: A Pathophysiologic Approach - DiPiro',
        'Sổ tay Sử dụng thuốc MIMS Việt Nam'
      ]
    };
  }

  // 2. Tăng Huyết Áp Kịch Phát / Can Dương Thượng Kháng
  if (maxCat === 'hypertension') {
    return {
      summary: `Bệnh nhân ${patientName} (${age} tuổi) có biểu hiện Tăng huyết áp động mạch kịch phát (HA: ${vitals.bloodPressure || '165/100'} mmHg), Đông y biện chứng thuộc thể Can Dương Thượng Kháng hóa hỏa do Can Thận âm hư không tiềm được dương, nguy cơ tai biến mạch máu não cần kiểm soát huyết áp cấp.`,
      westernAssessment: {
        provisionalDiagnosis: 'Tăng Huyết Áp Giai Đoạn 2 (Độ 2 theo ISH/ESC) / Cơn tăng huyết áp khẩn cấp',
        icd10: 'I10',
        differentialDiagnoses: ['Cơn thiếu máu não thoáng qua (TIA)', 'Rối loạn tiền đình ngoại biên', 'Đau đầu vận mạch Migraine kịch phát'],
        guytonMechanism: 'Theo Guyton & Hall: Tăng trương lực hệ thần kinh giao cảm gây co thắt các tiểu động mạch ngoại vi (tăng tổng trở mạch máu ngoại biên SVR). Sự quá tải áp lực làm giãn căng các nhánh động mạch màng não gây đau đầu búa bổ nhịp nảy, tăng nguy cơ xuất huyết não do vỡ phình vi mạch Charcot-Bouchard.',
        investigationsNeeded: ['Đo điện tâm đồ ECG 12 chuyển đạo tìm phì đại thất trái', 'Xét nghiệm sinh hóa máu: Creatinine, eGFR, Điện giải đồ Na+/K+, Lipid máu toàn phần', 'Chụp MRI mạch máu não MRA loại trừ phình mạch hoặc hẹp động mạch cảnh'],
        redFlags: ['Huyết áp tâm thu >= 180 mmHg hoặc tâm trương >= 120 mmHg', 'Đau đầu dữ dội nôn vọt, nhìn mờ hoặc nhìn đôi', 'Méo miệng, nói đớ, yếu liệt đột ngột một bên tay chân (Dấu hiệu đột quỵ FAST)']
      },
      easternAssessment: {
        syndromePattern: 'Can Dương Thượng Kháng - Thượng Thực Hạ Hư',
        batCuong: 'Thực nhiệt ở trên (Can hỏa), Hư hàn ở dưới (Thận âm hư)',
        tangPhu: 'Can mộc dương vượng xung nghịch, Thận thủy suy hư không hàm dưỡng Can mộc',
        khiHuyet: 'Huyết hỏa thượng nghịch bốc ngược lên thanh khiếu vùng đầu mặt gây căng nhức đỏ mắt',
        thietChanAnalysis: 'Chất lưỡi đỏ sẫm, rìa lưỡi gai rộp; Mạch Huyền Sác hữu lực ở bộ Quan (thể hiện Can hỏa bốc mạnh), bộ Xích trầm tế vô lực theo Maciocia.'
      },
      integratedTreatmentPlan: {
        phapTri: 'Bình can tiềm dương, thanh nhiệt tức phong, tư bổ can thận âm.',
        herbalPrescription: {
          formulaName: 'Thiên Ma Câu Đằng Ẩm (Tạp Bệnh Chứng Trị Tân Nghĩa & Dan Bensky)',
          composition: [
            { herb: 'Thiên Ma', grams: 10, role: 'Quân', purpose: 'Bình can tức phong, định huyễn vựng' },
            { herb: 'Câu Đằng', grams: 12, role: 'Quân', purpose: 'Thanh nhiệt tức phong, hạ huyết áp' },
            { herb: 'Thạch Quyết Minh', grams: 20, role: 'Thần', purpose: 'Bình can tiềm dương, trấn kinh' },
            { herb: 'Chi Tử', grams: 8, role: 'Tá', purpose: 'Thanh tả can kinh uất hỏa' },
            { herb: 'Hoàng Cầm', grams: 10, role: 'Tá', purpose: 'Thanh phế nhiệt, thanh hỏa ở thượng tiêu' },
            { herb: 'Ngưu Tất', grams: 12, role: 'Sứ', purpose: 'Dẫn huyết hỏa đi xuống dưới, hạ áp' }
          ],
          decoctionGuide: 'Thạch quyết minh sắc trước 20 phút. Câu đằng cho vào sau cùng sắc thêm 10 phút để tránh bay mất hoạt chất alkaloid hạ áp.',
          modifications: ['Nếu mất ngủ nhiều gia Dạ giao đằng 15g, Toan táo nhân 12g', 'Nếu đắng miệng khát nước gia Huyền sâm 12g, Tri mẫu 10g']
        },
        acupuncturePrescription: {
          classicPoints: [
            { point: 'Thái Xung (Liv-3)', location: 'Chỗ lõm giữa khe xương bàn chân 1 và 2 đo lên 1.5 thốn', technique: 'Châm tả vê kim mạnh hướng mũi kim xuống gót chân', purpose: 'Nguyên huyệt của Can, hạ can hỏa tức phong' },
            { point: 'Phong Trì (GB-20)', location: 'Chỗ lõm dưới đáy hộp sọ ngoài cơ thang', technique: 'Châm hướng mũi kim về mắt đối diện sâu 0.8 - 1 thốn', purpose: 'Thanh nhiệt đầu mục, giảm căng nhức thái dương' },
            { point: 'Dũng Tuyền (KID-1)', location: 'Chỗ lõm 1/3 trước lòng bàn chân', technique: 'Day bấm mạnh hoặc dán cao hạ áp', purpose: 'Dẫn hỏa quy nguyên, kéo hỏa bốc về lại bể thận' }
          ],
          tungPoints: [
            { point: 'Chính Hội (1010.01)', code: '1010.01', dongQiInstructions: 'Châm nông 0.1 - 0.2 thốn hoặc day bấm đỉnh đầu kết hợp thở chậm sâu', purpose: 'Bình ổn sóng não, điều hòa huyết động trung khu' },
            { point: 'Nhĩ Tiêm (Đỉnh vành tai)', code: 'Tai', dongQiInstructions: 'Gấp vành tai lại, dùng kim tam lăng trích nặn ra 3-5 giọt máu sẫm', purpose: 'Hạ huyết áp cấp cứu nhanh 10-20 mmHg trong 5 phút' }
          ],
          nguyenTaiThuGuidance: 'Kinh nghiệm GS. Nguyễn Tài Thu: Châm tả mạnh Thái Xung kết hợp Khúc Trì; cho bệnh nhân ngâm hai bàn chân vào chậu nước ấm 40 độ C để phân tán lưu lượng máu từ não bộ xuống ngoại vi.',
          westernNeuroscience: 'Kích thích thụ cảm áp lực xoang cảnh (Baroreceptors) và hoạt hóa dây X (phó giao cảm), ức chế phóng điện noradrenaline giao cảm, làm giãn mạch máu ngoại vi.'
        },
        clinicalNutrition: {
          dietaryTherapy: 'Chế độ ăn kiêng muối nghiêm ngặt (DASH diet) giàu Kali, Canxi và Magie theo Essentials of Nutrition.',
          foodsToEat: ['Rau cần tây luộc hoặc ép nước tươi uống mỗi sáng', 'Củ dền đỏ hấp chín', 'Chuối chín giàu kali', 'Trà hoa cúc, hạt muồng sao thơm'],
          foodsToAvoid: ['Muối ăn (> 3g/ngày), mắm tôm, cá khô, đồ muối chua', 'Thịt xông khói, đồ đóng hộp, bột ngọt', 'Cà phê đặc, rượu bia, thuốc lá'],
          drugNutrientInteractions: ['Không uống thuốc Amlodipine chung với nước bưởi chùm vì làm tăng nồng độ thuốc quá mức gây tụt huyết áp đột ngột.']
        },
        qigongAndLifestyle: 'Nghỉ ngơi phòng yên tĩnh; tập thở êm sâu chậm (4 giây hít vào, 6 giây thở ra bụng phình xẹp) 15 phút mỗi sáng và tối giúp kích hoạt thần kinh phó giao cảm.',
        westernPrescription: {
          protocolName: 'Phác đồ kiểm soát Tăng Huyết Áp Giai Đoạn 2 (Hướng dẫn BV Bạch Mai, Chợ Rẫy & BNF)',
          sourceGuidelines: [
            'Dược thư Quốc gia Việt Nam',
            'Phác đồ điều trị Nội khoa - BV Chợ Rẫy',
            'British National Formulary (BNF)',
            'Koda-Kimble and Young’s Applied Therapeutics'
          ],
          medications: [
            {
              drugName: 'Norvasc 5mg',
              activeIngredient: 'Amlodipine besylate 5mg',
              group: 'Chẹn kênh Calci DHP (CCB - hạ huyết áp, giãn mạch ngoại vi)',
              dosage: '5mg x 1 viên/ngày vào buổi sáng',
              timing: 'Uống lúc 8h sáng hàng ngày cố định',
              mechanism: 'Giãn trực tiếp tiểu động mạch ngoại vi, giảm sức cản ngoại vi SVR, hạ áp êm dịu duy trì 24 giờ.',
              contraindications: 'Hạ huyết áp nặng, sốc tim, hẹp van động mạch chủ khít.'
            },
            {
              drugName: 'Micardis 40mg',
              activeIngredient: 'Telmisartan 40mg',
              group: 'Chẹn thụ thể Angiotensin II (ARB - hạ áp, bảo vệ tim thận)',
              dosage: '40mg x 1 viên/ngày vào buổi sáng',
              timing: 'Uống cùng lúc với Amlodipine',
              mechanism: 'Chẹn thụ thể AT1 của Angiotensin II, ngăn tái hấp thu natri và co mạch, bảo vệ chức năng thận.',
              contraindications: 'Phụ nữ có thai, tắc mật, suy gan nặng.'
            },
            {
              drugName: 'Lipitor 20mg',
              activeIngredient: 'Atorvastatin 20mg',
              group: 'Thuốc hạ mỡ máu nhóm Statin (HMG-CoA Reductase Inhibitor)',
              dosage: '20mg x 1 viên/ngày vào buổi tối',
              timing: 'Uống trước khi đi ngủ',
              mechanism: 'Ổn định mảng xơ vữa động mạch, hạ LDL-Cholesterol, phòng ngừa tai biến mạch máu não và nhồi máu cơ tim.',
              contraindications: 'Bệnh gan hoạt động, tăng men gan kéo dài không rõ nguyên nhân, phụ nữ mang thai.'
            }
          ],
          clinicalCautions: [
            'Đo huyết áp hàng ngày vào buổi sáng sau thức dậy 30 phút và ghi vào nhật ký huyết áp.',
            'Không tự ý ngừng thuốc hạ áp khi thấy huyết áp đã về bình thường để tránh cơn tăng huyết áp bùng phát.'
          ],
          monitoringParameters: ['Huyết áp mục tiêu < 130/80 mmHg', 'Điện giải đồ (Kali máu)', 'Men gan AST/ALT sau 4-8 tuần']
        }
      },
      referencedBooks: [
        'The Foundations of Chinese Medicine - Giovanni Maciocia',
        'Phương Thang Y Học Cổ Truyền - Trần Gia Kỳ',
        'Chinese Herbal Medicine: Materia Medica - Dan Bensky',
        'Châm Cứu Chữa Bệnh - GS. Nguyễn Tài Thu',
        'Guyton and Hall Textbook of Medical Physiology',
        'Dược thư Quốc gia Việt Nam',
        'Phác đồ điều trị Nội khoa - BV Chợ Rẫy',
        'British National Formulary (BNF)'
      ]
    };
  }

  // 3. Trào Ngược Dạ Dày Thực Quản / Tỳ Vị Hư Hàn
  if (maxCat === 'gerd') {
    return {
      summary: `Bệnh nhân ${patientName} (${age} tuổi) có biểu hiện Trào ngược dạ dày thực quản (GERD) kết hợp viêm trợt niêm mạc dạ dày, Đông y biện chứng thuộc thể Tỳ Vị Hư Hàn kiêm Can Khí Phạm Vị, cần ôn trung kiện tỳ hòa vị giáng nghịch.`,
      westernAssessment: {
        provisionalDiagnosis: 'Bệnh trào ngược dạ dày thực quản (GERD Độ A/B) / Viêm dạ dày trợt hang vị',
        icd10: 'K21.9 / K29.6',
        differentialDiagnoses: ['Loét dạ dày tá tràng tá tràng thể hoạt động', 'Co thắt tâm vị (Achalasia)', 'Rối loạn tiêu hóa chức năng (Functional dyspepsia)'],
        guytonMechanism: 'Theo Guyton & Hall: Suy giảm trương lực cơ thắt thực quản dưới (LES) do rối loạn điều hòa thần kinh ruột qua dây thần kinh X, khiến dịch vị acid chlohydric và pepsin trào ngược lên biểu mô vảy thực quản gây viêm rát bỏng và phản xạ nghẹn vướng.',
        investigationsNeeded: ['Nội soi thực quản - dạ dày - tá tràng (EGD) đánh giá niêm mạc', 'Test thở Ure (Urea Breath Test) tìm vi khuẩn Helicobacter Pylori', 'Đo pH thực quản 24 giờ nếu triệu chứng trào ngược dai dẳng'],
        redFlags: ['Nôn ra máu tươi hoặc dịch màu bã cà phê', 'Đi ngoài phân đen nhánh mùi tanh khắm', 'Nuốt nghẹn ngày càng tăng hoặc sụt cân nhanh không rõ nguyên nhân (> 3kg/tháng)']
      },
      easternAssessment: {
        syndromePattern: 'Tỳ Vị Hư Hàn kiêm Can Khí Phạm Vị',
        batCuong: 'Lý chứng, Hư chứng kiêm Thực trệ, Thiên Hàn',
        tangPhu: 'Tỳ dương hư không vận hóa, Vị khí nghịch không giáng, Can khí hoành nghịch',
        khiHuyet: 'Trung tiêu hư hàn, khí trệ đờm nhớt nghẽn trở ở cổ họng (Mai hạch khí)',
        thietChanAnalysis: 'Chất lưỡi to bệu có hằn vết răng, sắc nhạt; Rêu lưỡi trắng nhớt; Mạch Trầm Trì Nhược thể hiện Tỳ Vị dương hư khí bạc theo Maciocia.'
      },
      integratedTreatmentPlan: {
        phapTri: 'Ôn trung kiện tỳ, hòa vị giáng nghịch, sơ can lý khí chỉ thống.',
        herbalPrescription: {
          formulaName: 'Hoàng Kỳ Kiến Trung Thang hợp Bán Hạ Hậu Phác Thang (Kim Quỹ Yếu Lược & Dan Bensky)',
          composition: [
            { herb: 'Hoàng Kỳ', grams: 16, role: 'Quân', purpose: 'Đại bổ tỳ khí, làm ấm trung tiêu' },
            { herb: 'Bạch Thược', grams: 12, role: 'Thần', purpose: 'Nhu can chỉ thống, giảm co thắt dạ dày' },
            { herb: 'Bán Hạ Chế', grams: 10, role: 'Thần', purpose: 'Giáng nghịch chỉ ẩu, tiêu đờm nhớt ứ trệ' },
            { herb: 'Hậu Phác', grams: 10, role: 'Tá', purpose: 'Hạ khí tiêu đầy trướng bụng' },
            { herb: 'Can Khương', grams: 6, role: 'Tá', purpose: 'Ôn trung tán hàn, chỉ ẩu' },
            { herb: 'Chích Cam Thảo', grams: 6, role: 'Sứ', purpose: 'Hòa hoãn trung tiêu, điều hòa bách dược' }
          ],
          decoctionGuide: 'Sắc 4 bát nước lấy 1 bát rưỡi, chia 2 lần uống ấm trước hoặc sau bữa ăn 1 giờ. Tuyệt đối không uống thuốc nguội lạnh.',
          modifications: ['Nếu ợ chua nóng rát nhiều gia Ô tặc cốt 15g, Ngõa lăng tử 12g', 'Nếu nghẹn vướng cổ nhiều gia Tô diệp 10g, Phục linh 12g']
        },
        acupuncturePrescription: {
          classicPoints: [
            { point: 'Trung Quản (Ren-12)', location: 'Trên rốn 4 thốn trên đường giữa bụng', technique: 'Châm thẳng 1 - 1.5 thốn kết hợp cứu ngải ấm', purpose: 'Mộ huyệt của Vị, ôn bổ trung tiêu hòa vị' },
            { point: 'Nội Quan (PC-6)', location: 'Trên nếp gấp cổ tay 2 thốn giữa 2 gân cơ gan tay', technique: 'Châm sâu 0.8 - 1.2 thốn', purpose: 'Hòa vị giáng nghịch, hết buồn nôn, thư thái lồng ngực' },
            { point: 'Túc Tam Lý (ST-36)', location: 'Dưới mắt đầu gối ngoài 3 thốn cách mào chày 1 khoát ngón tay', technique: 'Châm bổ hoặc cứu ngải', purpose: 'Hợp huyệt của kinh Vị, cường tráng Tỳ Vị' }
          ],
          tungPoints: [
            { point: 'Trọng Tử (11.01) & Trọng Tiên (11.02)', code: 'Khu 11 Lòng bàn tay', dongQiInstructions: 'Day bấm mạnh kẽ ngón tay cái và trỏ lòng bàn tay kết hợp nuốt nước bọt sâu', purpose: 'Thông khí cơ ngực họng, giải trừ nghẹn vướng mai hạch khí' }
          ],
          nguyenTaiThuGuidance: 'Kinh nghiệm GS. Nguyễn Tài Thu: Châm phối hợp Trung Quản thấu Hạ Quản kết hợp cứu điếu ngải cứu ấm vùng bụng 15 phút giúp dạ dày co bóp êm ấm và triệt tiêu cơn đau lạnh.',
          westernNeuroscience: 'Kích thích thần kinh giữa (PC-6) truyền tín hiệu lên nhân thực vật thân não, điều hòa trương lực phó giao cảm giúp tăng co thắt cơ vòng thực quản dưới LES, ngăn chặn trào ngược.'
        },
        clinicalNutrition: {
          dietaryTherapy: 'Chế độ ăn mềm, ấm nóng, chia nhỏ bữa ăn và trung hòa acid dạ dày theo Essentials of Nutrition.',
          foodsToEat: ['Cháo gạo lứt hoa cúc, súp hạt sen củ sen', 'Bột sắn dây nấu chín ấm', 'Nước ép bắp cải ấm giàu Vitamin U lành vết loét', 'Khoai lang luộc'],
          foodsToAvoid: ['Nước đá lạnh, kem, đồ uống có ga', 'Thức ăn chua cay, giấm ớt, tiêu tỏi sống', 'Cà phê đặc, sô-cô-la, đồ nướng chiên rán nhiều mỡ', 'Ăn đêm sát giờ đi ngủ (cần cách ít nhất 3 giờ)'],
          drugNutrientInteractions: ['Nếu uống thuốc ức chế bơm proton PPI (Nexium/Pantoprazole), cần uống trước bữa ăn sáng 30-60 phút.']
        },
        qigongAndLifestyle: 'Kê cao đầu giường 15-20 độ khi ngủ; sau bữa ăn tuyệt đối không nằm ngay; thực hành xoa bụng theo chiều kim đồng hồ quanh rốn 50-100 vòng mỗi tối.',
        westernPrescription: {
          protocolName: 'Phác đồ điều trị Trào Ngược Dạ Dày Thực Quản & Viêm Trợt Hang Vị (BV Bạch Mai & DiPiro)',
          sourceGuidelines: [
            'Dược thư Quốc gia Việt Nam',
            'Hướng dẫn chẩn đoán và điều trị bệnh nội khoa - BV Bạch Mai',
            'Pharmacotherapy: A Pathophysiologic Approach - DiPiro',
            'Vidal Việt Nam'
          ],
          medications: [
            {
              drugName: 'Nexium 40mg',
              activeIngredient: 'Esomeprazole 40mg',
              group: 'Ức chế bơm proton (PPI)',
              dosage: '40mg x 1 viên/ngày',
              timing: 'Uống trước bữa ăn sáng 30 - 60 phút, nuốt nguyên viên',
              mechanism: 'Ức chế chuyên biệt enzym H+/K+-ATPase tại tế bào thành, dập tắt bài tiết acid dịch vị tạo điều kiện lành niêm mạc thực quản.',
              contraindications: 'Quá mẫn với dẫn chất benzimidazol.'
            },
            {
              drugName: 'Phosphalugel (Gói chữ P vàng)',
              activeIngredient: 'Aluminum phosphate gel 20%',
              group: 'Antacid trung hòa acid & tráng bao niêm mạc',
              dosage: '1 gói x 2 - 3 lần/ngày khi có cơn đau rát hoặc sau ăn 2 giờ',
              timing: 'Uống trực tiếp khi đau rát hoặc trước khi đi ngủ',
              mechanism: 'Trung hòa acid tự do, tạo màng gel nhầy bảo vệ bề mặt niêm mạc thực quản khỏi dịch vị trào ngược.',
              contraindications: 'Suy thận nặng.'
            },
            {
              drugName: 'Motilium 10mg',
              activeIngredient: 'Domperidone 10mg',
              group: 'Thuốc điều hòa nhu động ruột, tăng trương lực cơ vòng (Prokinetic)',
              dosage: '10mg x 2 - 3 lần/ngày (dùng 7 - 14 ngày)',
              timing: 'Uống trước bữa ăn 15 - 30 phút',
              mechanism: 'Kháng Dopamine D2 ngoại biên, làm tăng trương lực cơ vòng thực quản dưới LES và tăng tốc độ tống rỗng dạ dày.',
              contraindications: 'Xuất huyết tiêu hóa, tắc ruột, kéo dài khoảng QT trên ECG.'
            }
          ],
          clinicalCautions: [
            'Dùng đợt thuốc PPI liên tục 4 - 8 tuần theo chỉ định, không ngắt quãng.',
            'Uống thuốc dạ dày cách xa các thuốc khác ít nhất 2 giờ.'
          ],
          monitoringParameters: ['Mức độ ợ chua, nghẹn cổ', 'Nội soi dạ dày kiểm tra lại sau 8 tuần']
        }
      },
      referencedBooks: [
        'The Foundations of Chinese Medicine - Giovanni Maciocia',
        'The Practice of Chinese Medicine - Giovanni Maciocia',
        'Phương Thang Y Học Cổ Truyền - Trần Gia Kỳ',
        'Chinese Herbal Medicine: Materia Medica - Dan Bensky',
        'Essentials of Nutrition in Medicine and Healthcare',
        'Guyton and Hall Textbook of Medical Physiology',
        'Dược thư Quốc gia Việt Nam',
        'Hướng dẫn chẩn đoán và điều trị bệnh nội khoa - BV Bạch Mai',
        'Vidal Việt Nam'
      ]
    };
  }

  // 4. Mất Ngủ Mạn Tính / Tâm Tỳ Hư Suy
  if (maxCat === 'insomnia') {
    return {
      summary: `Bệnh nhân ${patientName} (${age} tuổi) mắc Hội chứng mất ngủ mạn tính (Insomnia) kết hợp suy nhược thần kinh, Đông y biện chứng thuộc thể Tâm Tỳ Lưỡng Hư (Tâm huyết hư không dưỡng tâm thần, Tỳ khí suy không sinh huyết), cần ích khí kiện tỳ dưỡng tâm an thần.`,
      westernAssessment: {
        provisionalDiagnosis: 'Rối loạn mất ngủ mạn tính (Chronic Insomnia Disorder) / Rối loạn lo âu nhẹ',
        icd10: 'G47.0 / F41.2',
        differentialDiagnoses: ['Hội chứng ngưng thở khi ngủ do tắc nghẽn (OSA)', 'Trầm cảm phản ứng', 'Hội chứng chân không yên (Restless Legs Syndrome)'],
        guytonMechanism: 'Theo Guyton & Hall: Rối loạn chu kỳ ngày - đêm tại nhân trên chéo (Suprachiasmatic nucleus) của vùng dưới đồi làm giảm tiết hormone Melatonin tuyến tùng vào ban đêm, kết hợp tăng hoạt động hệ lưới hoạt hóa truyền lên (ARAS) làm vỏ não luôn trong trạng thái thức tỉnh, nhịp tim nhanh và khó duy trì giấc ngủ sâu NREM.',
        investigationsNeeded: ['Xét nghiệm công thức máu toàn bộ CBC tìm thiếu máu vi thể', 'Định lượng Ferritin huyết thanh và Hormon tuyến giáp TSH, FT4', 'Đo đa ký giấc ngủ (Polysomnography) nếu có ngáy to ngưng thở'],
        redFlags: ['Cơn hoảng loạn kịch phát dữ dội kèm tức nghẹn ngực lan vai trái', 'Ý tưởng tiêu cực chán sống hoặc trầm cảm nặng', 'Ngủ gật ban ngày gây nguy hiểm khi lái xe']
      },
      easternAssessment: {
        syndromePattern: 'Tâm Tỳ Lưỡng Hư - Thần Bất Thủ Xá',
        batCuong: 'Lý chứng, Hư chứng, Khí huyết bất túc',
        tangPhu: 'Tâm tạng chủ thần minh suy giảm, Tỳ tạng chủ sinh hóa khí huyết hư tổn',
        khiHuyet: 'Huyết hư không dưỡng được tâm, tâm thần phiêu bạt không nơi nương tựa sinh ra trằn trọc mộng mị',
        thietChanAnalysis: 'Chất lưỡi nhạt bợt có dấu răng ở hai rìa; Rêu lưỡi trắng mỏng; Mạch Tế Nhược vô lực (nhỏ yếu như sợi tơ) phản ánh khí huyết lưỡng hư chuẩn xác theo Maciocia.'
      },
      integratedTreatmentPlan: {
        phapTri: 'Ích khí kiện tỳ, dưỡng tâm an thần, bổ huyết định chí.',
        herbalPrescription: {
          formulaName: 'Quy Tỳ Thang gia giảm (Tế Sinh Phương & Dan Bensky)',
          composition: [
            { herb: 'Bạch Truật', grams: 12, role: 'Quân', purpose: 'Kiện tỳ ích khí, sinh hóa nguồn khí huyết' },
            { herb: 'Hoàng Kỳ', grams: 14, role: 'Quân', purpose: 'Bổ tỳ phế khí, cố biểu' },
            { herb: 'Đương Quy', grams: 10, role: 'Thần', purpose: 'Dưỡng huyết hòa dinh, dưỡng tâm' },
            { herb: 'Toan Táo Nhân (sao đen)', grams: 12, role: 'Thần', purpose: 'Dưỡng tâm an thần, trị mất ngủ giật mình' },
            { herb: 'Long Nhãn', grams: 12, role: 'Tá', purpose: 'Bổ tâm tỳ, dưỡng huyết an thần' },
            { herb: 'Viễn Chí', grams: 8, role: 'Tá', purpose: 'Thông tâm thận, định thần trí' },
            { herb: 'Phục Thần', grams: 10, role: 'Tá', purpose: 'Ninh tâm an thần' }
          ],
          decoctionGuide: 'Toan táo nhân giã dập sao đen trước khi sắc. Sắc ngày 1 thang uống ấm trước khi đi ngủ 1-2 giờ.',
          modifications: ['Nếu hồi hộp bồn chồn nhiều gia Bá tử nhân 10g, Dạ giao đằng 15g', 'Nếu sốt nhẹ về chiều gia Sinh địa 12g, Tri mẫu 8g']
        },
        acupuncturePrescription: {
          classicPoints: [
            { point: 'Thần Môn (HT-7)', location: 'Trên nếp gấp cổ tay phía ngón út, chỗ lõm bờ ngoài gân cơ gấp cổ tay trụ', technique: 'Châm sâu 0.5 thốn vê nhẹ', purpose: 'Nguyên huyệt của Tâm, định tâm an thần tức thì' },
            { point: 'Tam Âm Giao (SP-6)', location: 'Trên đỉnh mắt cá trong chân 3 thốn sau bờ xương chày', technique: 'Châm sâu 1 - 1.5 thốn', purpose: 'Giao hội của 3 kinh âm Tỳ - Can - Thận, dưỡng huyết điều kinh an thần' },
            { point: 'An Miên (Kỳ huyệt)', location: 'Giữa huyệt Ế Phong và Phong Trì sau tai', technique: 'Châm sâu 0.8 - 1.2 thốn', purpose: 'Kỳ huyệt đặc hiệu trị mất ngủ kinh niên' }
          ],
          tungPoints: [
            { point: 'Trấn Tĩnh (Huyệt giữa trán)', code: 'Trán', dongQiInstructions: 'Day ấn nhẹ kết hợp nhắm mắt thả lỏng cơ mặt', purpose: 'Ổn định sóng não Alpha, đưa người bệnh vào giấc ngủ tự nhiên' },
            { point: 'Thận Quan (77.18)', code: '77.18', dongQiInstructions: 'Châm bổ mặt trong cẳng chân', purpose: 'Bổ thận thủy thông tâm hỏa, trị mất ngủ tiểu đêm' }
          ],
          nguyenTaiThuGuidance: 'Kinh nghiệm GS. Nguyễn Tài Thu: Châm phối hợp Nội Quan, Thần Môn và Tam Âm Giao, lưu kim 30 phút với xung điện tần số ru ngủ 2Hz tạo cảm giác êm dịu toàn thân.',
          westernNeuroscience: 'Châm cứu kích thích tăng nồng độ chất dẫn truyền thần kinh ức chế GABA và serotonin tại vỏ não, tái lập nồng độ melatonin sinh lý ban đêm.'
        },
        clinicalNutrition: {
          dietaryTherapy: 'Thực phẩm giàu L-Tryptophan, Magie và Vitamin nhóm B theo Essentials of Nutrition.',
          foodsToEat: ['Chè hạt sen long nhãn táo đỏ', 'Trà tim sen hoa cúc ấm uống lúc 20h', 'Chuối chín, quả óc chó, hạnh nhân', 'Canh củ sen hầm sườn non'],
          foodsToAvoid: ['Cà phê, trà xanh đặc sau 14h chiều', 'Rượu bia (gây thức giấc nửa đêm do phản ứng dội)', 'Bữa ăn tối quá no nhiều chất béo gây nặng bụng khó ngủ'],
          drugNutrientInteractions: ['Tránh lạm dụng thuốc an thần nhóm Benzodiazepine dài ngày vì gây quen thuốc và suy giảm trí nhớ.']
        },
        qigongAndLifestyle: 'Giữ phòng ngủ tối hoàn toàn và mát mẻ (24-26 độ C); ngâm chân nước gừng ấm 15 phút trước khi đi ngủ; không sử dụng điện thoại màn hình xanh trên giường ngủ.',
        westernPrescription: {
          protocolName: 'Phác đồ điều trị Rối Loạn Giấc Ngủ Mạn Tính & Lo Âu (Dược lâm sàng & DiPiro)',
          sourceGuidelines: [
            'Dược thư Quốc gia Việt Nam',
            'Dược lâm sàng - Hoàng Thị Kim Huyền',
            'The Washington Manual of Medical Therapeutics',
            'MIMS Việt Nam'
          ],
          medications: [
            {
              drugName: 'Stilux-60 (hoặc Rotundin 30mg)',
              activeIngredient: 'Rotundin (L-Tetrahydropalmatine) 60mg',
              group: 'Thuốc an thần thảo dược chiết xuất củ bình vôi',
              dosage: '60mg x 1 viên vào buổi tối',
              timing: 'Uống trước khi đi ngủ 30 - 60 phút với nước ấm',
              mechanism: 'Ức chế thụ thể Dopamine D2 trung ương, tạo giấc ngủ êm dịu tự nhiên, không gây nghiện và không làm đảo lộn cấu trúc giấc ngủ.',
              contraindications: 'Quá mẫn với Rotundin, phụ nữ mang thai và cho con bú.'
            },
            {
              drugName: 'Melatonin 3mg',
              activeIngredient: 'Melatonin 3mg',
              group: 'Hormone điều hòa nhịp sinh học giấc ngủ',
              dosage: '3mg x 1 viên',
              timing: 'Uống lúc 21h tối (trước khi ngủ 1 giờ)',
              mechanism: 'Gắn thụ thể MT1 và MT2 tại nhân trên chéo của vùng dưới đồi, tái lập nhịp ngày đêm tự nhiên cho cơ thể.',
              contraindications: 'Bệnh tự miễn thể hoạt động.'
            },
            {
              drugName: 'Tanakan 40mg',
              activeIngredient: 'Cao chuẩn hóa Ginkgo biloba (EGb 761) 40mg',
              group: 'Thuốc tăng cường tuần hoàn não',
              dosage: '40mg x 2 viên/ngày chia sáng - trưa',
              timing: 'Uống sau bữa ăn sáng và trưa',
              mechanism: 'Tăng tưới máu vi mạch não, bảo vệ tế bào thần kinh khỏi gốc tự do, giảm nặng đầu hoa mắt.',
              contraindications: 'Đang có xuất huyết cấp tính, chuẩn bị phẫu thuật.'
            }
          ],
          clinicalCautions: [
            'Hạn chế lạm dụng các thuốc ngủ ức chế thần kinh nhóm Benzodiazepin (Seduxen/Lexomil) kéo dài để tránh quen thuốc và lú lẫn.',
            'Kết hợp liệu pháp vệ sinh giấc ngủ (Sleep hygiene).'
          ],
          monitoringParameters: ['Nhật ký giấc ngủ (thời gian vào giấc, số lần thức giấc giữa đêm)', 'Độ tỉnh táo vào ban ngày']
        }
      },
      referencedBooks: [
        'The Foundations of Chinese Medicine - Giovanni Maciocia',
        'Phương Thang Y Học Cổ Truyền - Trần Gia Kỳ',
        'Chinese Herbal Medicine: Materia Medica - Dan Bensky',
        'Châm Cứu Chữa Bệnh - GS. Nguyễn Tài Thu',
        'Essentials of Nutrition in Medicine and Healthcare',
        'Dược thư Quốc gia Việt Nam',
        'The Washington Manual of Medical Therapeutics',
        'Dược lâm sàng - Hoàng Thị Kim Huyền'
      ]
    };
  }

  // 5. Thoái Hóa Khớp Gối / Hạc Tất Phong (Knee Osteoarthritis)
  if (maxCat === 'knee') {
    return {
      summary: `Bệnh nhân ${patientName} (${age} tuổi) mắc Thoái hóa khớp gối nguyên phát (Knee Osteoarthritis) kèm viêm màng hoạt dịch, Đông y biện chứng thuộc chứng Tý (Hạc Tất Phong) thể Hàn Thấp Trở Lạc kiêm Can Thận Hư Tổn.`,
      westernAssessment: {
        provisionalDiagnosis: 'Thoái hóa khớp gối nguyên phát hai bên (Giai đoạn 2-3 theo Kellgren-Lawrence)',
        icd10: 'M17.0',
        differentialDiagnoses: ['Rách sụn chêm thoái hóa', 'Viêm khớp dạng thấp (RA)', 'Gout thể khớp gối'],
        guytonMechanism: 'Theo Guyton & Hall: Bào mòn lớp sụn khớp hyaline và mất chất căn bản proteoglycan làm hẹp khe khớp, xơ hóa xương dưới sụn và hình thành gai xương rìa khớp cọ xát cơ học gây tiếng lạo xạo và viêm phản ứng bao hoạt dịch.',
        investigationsNeeded: ['Chụp X-quang khớp gối thẳng - nghiêng đứng chịu lực', 'Siêu âm khớp gối tìm dịch và đo độ dày sụn khớp', 'Xét nghiệm máu: Tốc độ máu lắng ESR, CRP, Acid Uric loại trừ viêm khớp hệ thống'],
        redFlags: ['Khớp gối sưng nóng đỏ dữ dội kèm sốt cao (Viêm khớp nhiễm khuẩn)', 'Khớp gối bị kẹt cứng hoàn toàn không thể co duỗi', 'Mất vững khớp gối ngã quỵ khi dồn trọng lượng']
      },
      easternAssessment: {
        syndromePattern: 'Hạc Tất Phong - Thể Phong Hàn Thấp Tý kiêm Can Thận Hư',
        batCuong: 'Bản hư tiêu thực, Hàn thấp thắng',
        tangPhu: 'Can chủ cân suy yếu, Thận chủ cốt tủy hư thoái, kinh Túc tam âm tam dương bế tắc',
        khiHuyet: 'Phong hàn thấp tà thừa hư xâm nhập đọng lại tại khớp gối, khí huyết ngưng trệ',
        thietChanAnalysis: 'Chất lưỡi nhạt ám, rêu lưỡi trắng dính; Mạch Trầm Trì hoặc Trầm Huyền phản ánh hàn thấp ngưng trệ gân xương theo Maciocia.'
      },
      integratedTreatmentPlan: {
        phapTri: 'Khu phong tán hàn, trừ thấp thông lạc, bổ can thận, cường cân cốt.',
        herbalPrescription: {
          formulaName: 'Độc Hoạt Ký Sinh Thang (Thiên Kim Yếu Phương & Dan Bensky)',
          composition: [
            { herb: 'Độc Hoạt', grams: 10, role: 'Quân', purpose: 'Trừ phong thấp chi dưới, chỉ thống' },
            { herb: 'Tang Ký Sinh', grams: 16, role: 'Quân', purpose: 'Bổ can thận, mạnh gân cốt, trừ phong thấp' },
            { herb: 'Ngưu Tất', grams: 12, role: 'Thần', purpose: 'Dẫn thuốc xuống khớp gối, bổ can thận' },
            { herb: 'Đỗ Trọng', grams: 12, role: 'Thần', purpose: 'Bổ thận tráng cốt' },
            { herb: 'Bạch Thược', grams: 12, role: 'Tá', purpose: 'Dưỡng huyết nhu can chỉ thống' },
            { herb: 'Tần Giao', grams: 10, role: 'Tá', purpose: 'Thư cân hoạt lạc trừ thấp' }
          ],
          decoctionGuide: 'Sắc ngày 1 thang chia làm 2 lần uống ấm sau ăn 45 phút.',
          modifications: ['Nếu khớp gối lạnh nhiều gia Phụ tử chế 6g, Quế chi 8g', 'Nếu có dịch khớp sưng phù gia Ý dĩ 20g, Tỳ giải 12g']
        },
        acupuncturePrescription: {
          classicPoints: [
            { point: 'Độc Tỵ (ST-35) & Tất Nhãn (Kỳ huyệt)', location: 'Chỗ lõm hai bên gân bánh chè đầu gối', technique: 'Châm sâu 1.0 - 1.5 thốn hướng về phía sau', purpose: 'Thông kinh lạc cục bộ khớp gối, tiêu viêm giảm sưng' },
            { point: 'Dương Lăng Tuyền (GB-34)', location: 'Trước dưới đầu xương mác', technique: 'Châm sâu 1.2 thốn', purpose: 'Hội của Cân, thư giãn dây chằng khớp gối' },
            { point: 'Huyết Hải (SP-10)', location: 'Bờ trên trong xương bánh chè đo lên 2 thốn', technique: 'Châm bổ', purpose: 'Hoạt huyết hóa ứ, thông huyết mạch' }
          ],
          tungPoints: [
            { point: 'Tâm Đầu (Khu 11)', code: '11.08', dongQiInstructions: 'Châm mặt lòng ngón giữa kết hợp co duỗi khớp gối', purpose: 'Cắt cơn đau khớp gối tức thì theo Tung style' }
          ],
          nguyenTaiThuGuidance: 'Kỹ thuật cứu ngải khớp gối của GS. Nguyễn Tài Thu: Dùng điếu ngải cứu xoay tròn quanh huyệt Độc Tỵ và Dương Lăng Tuyền 20 phút xua tan hàn thấp làm ấm khớp.',
          westernNeuroscience: 'Kích thích thụ thể cơ học nội khớp tăng sản sinh acid hyaluronic nội sinh trong dịch khớp, ức chế enzyme thoái hóa sụn MMP-13.'
        },
        clinicalNutrition: {
          dietaryTherapy: 'Bổ sung Glucosamine, Chondroitin tự nhiên và Collagen Type II theo Essentials of Nutrition.',
          foodsToEat: ['Canh xương hầm nhừ, sụn ức gà', 'Đậu bắp, rau mồng tơi giàu chất nhờn tự nhiên', 'Cá hồi, quả bơ, dầu oliu nguyên chất'],
          foodsToAvoid: ['Cà pháo, măng chua, dưa muối', 'Rượu bia, thịt chó, thịt thú rừng giàu purin', 'Tránh thừa cân béo phì (mỗi 1kg cân nặng giảm giúp giảm 4kg tải trọng lên gối)'],
          drugNutrientInteractions: ['Nếu dùng Glucosamine sulfat, cần duy trì liên tục ít nhất 3 tháng để đạt hiệu quả tái tạo sụn.']
        },
        qigongAndLifestyle: 'Tránh ngồi xổm, tránh leo cầu thang nhiều; tập bài gập duỗi gối trên giường hoặc đạp xe tại chỗ nhẹ nhàng 20 phút mỗi ngày.',
        westernPrescription: {
          protocolName: 'Phác đồ điều trị Thoái Hóa Khớp Gối (Hướng dẫn BV Bạch Mai & EULAR)',
          sourceGuidelines: [
            'Dược thư Quốc gia Việt Nam',
            'Hướng dẫn chẩn đoán và điều trị bệnh nội khoa - BV Bạch Mai',
            'Basic and Clinical Pharmacology - Katzung',
            'MIMS Việt Nam'
          ],
          medications: [
            {
              drugName: 'Mobic 15mg (hoặc Arcoxia 60mg)',
              activeIngredient: 'Meloxicam 15mg',
              group: 'Kháng viêm không steroid (NSAID)',
              dosage: '15mg x 1 viên/ngày (sau 1-2 tuần giảm còn 7.5mg/ngày)',
              timing: 'Uống ngay sau bữa ăn trưa hoặc tối',
              mechanism: 'Ức chế chọn lọc COX-2, làm giảm prostaglandin tại bao hoạt dịch khớp gối, giảm sưng cứng khớp buổi sáng.',
              contraindications: 'Loét dạ dày tá tràng tiến triển, suy gan thận nặng.'
            },
            {
              drugName: 'Paracetamol 500mg',
              activeIngredient: 'Paracetamol 500mg',
              group: 'Giảm đau thông thường',
              dosage: '500mg x 2 - 3 lần/ngày khi có cơn đau',
              timing: 'Uống cách nhau tối thiểu 4 - 6 giờ',
              mechanism: 'Ức chế dẫn truyền cảm giác đau tại hệ thần kinh trung ương.',
              contraindications: 'Suy gan nặng.'
            },
            {
              drugName: 'Viartril-S 1500mg',
              activeIngredient: 'Glucosamine sulfate tinh khiết 1500mg',
              group: 'Thuốc tác dụng chậm trong thoái hóa khớp (SYSADOA)',
              dosage: '1500mg x 1 gói/ngày',
              timing: 'Pha với 1 ly nước uống trong hoặc sau bữa ăn',
              mechanism: 'Kích thích tế bào sụn khớp tổng hợp proteoglycan và collagen, ức chế enzyme phá hủy sụn.',
              contraindications: 'Dị ứng đồ biển giáp xác (tôm, cua).'
            }
          ],
          clinicalCautions: ['Dùng NSAID liều thấp nhất có hiệu quả trong thời gian ngắn nhất; kiểm tra định kỳ men gan và chức năng thận.'],
          monitoringParameters: ['Thang điểm đau VAS khớp gối', 'Thời gian cứng khớp buổi sáng (phút)']
        }
      },
      referencedBooks: [
        'The Practice of Chinese Medicine - Giovanni Maciocia',
        'Chinese Herbal Medicine: Materia Medica - Dan Bensky',
        'Phương Thang Y Học Cổ Truyền - Trần Gia Kỳ',
        'Châm Cứu Chữa Bệnh - GS. Nguyễn Tài Thu',
        'Guyton and Hall Textbook of Medical Physiology',
        'Dược thư Quốc gia Việt Nam',
        'Hướng dẫn BV Bạch Mai',
        'MIMS Việt Nam'
      ]
    };
  }

  // 6. Liệt Dây Thần Kinh VII Ngoại Biên (Liệt Mặt do Trúng Gió Lạnh)
  if (maxCat === 'bellsPalsy') {
    return {
      summary: `Bệnh nhân ${patientName} (${age} tuổi) mắc Liệt dây thần kinh số VII ngoại biên cấp tính (Bell's Palsy) do nhiễm lạnh, Đông y biện chứng thuộc chứng Khẩu Nhãn Oa Tà thể Phong Hàn Phạm Lạc, cần khu phong tán hàn thông kinh hoạt lạc vùng mặt.`,
      westernAssessment: {
        provisionalDiagnosis: 'Liệt dây thần kinh mặt (dây VII) ngoại biên cấp tính (Bell’s Palsy Độ IV theo House-Brackmann)',
        icd10: 'G51.0',
        differentialDiagnoses: ['Đột quỵ tai biến mạch máu não (Liệt trung ương - còn nếp nhăn trán)', 'Hội chứng Ramsay Hunt (Zona hạch gối)', 'Viêm tai giữa biến chứng'],
        guytonMechanism: 'Theo Guyton & Hall: Nhiễm lạnh đột ngột làm co thắt mạch máu nuôi dây thần kinh mặt trong xương đá hẹp, gây thiếu máu phù nề cục bộ dẫn đến mất dẫn truyền xung động đến các cơ bám da mặt bên liệt.',
        investigationsNeeded: ['Khám nghiệm cơ mặt toàn diện đánh giá nếp nhăn trán và dấu hiệu Charles Bell', 'Đo điện cơ EMG cơ mặt đánh giá mức độ thoái hóa sợi trục', 'Nội soi tai mũi họng loại trừ tổn thương màng nhĩ và tai giữa'],
        redFlags: ['Liệt mặt kèm yếu tay chân cùng bên hoặc đối bên (Đột quỵ não cấp)', 'Nổi mụn nước đau rát ở ống tai ngoài (Hội chứng Ramsay Hunt)', 'Mắt nhắm không kín kéo dài gây viêm loét giác mạc hoại tử']
      },
      easternAssessment: {
        syndromePattern: 'Khẩu Nhãn Oa Tà - Thể Phong Hàn Phạm Lạc',
        batCuong: 'Biểu chứng, Thực chứng, Thiên Hàn',
        tangPhu: 'Vệ khí bất túc, kinh Thủ Túc Dương Minh (Đại trường, Vị) bị phong hàn xâm nhập',
        khiHuyet: 'Khí huyết vùng mặt ngưng trệ, cơ nhục mất nuôi dưỡng bị kéo lệch sang bên lành',
        thietChanAnalysis: 'Chất lưỡi nhạt, rêu lưỡi trắng mỏng; Mạch Phù Khẩn phản ánh phong hàn tà tại biểu theo Maciocia.'
      },
      integratedTreatmentPlan: {
        phapTri: 'Khu phong tán hàn, hoạt huyết thông lạc, điều hòa khí huyết cơ mặt.',
        herbalPrescription: {
          formulaName: 'Đại Tần Giao Thang hợp Khiên Chính Tán (Dương Thị Gia Tàng & Dan Bensky)',
          composition: [
            { herb: 'Bạch Phụ Tử', grams: 6, role: 'Quân', purpose: 'Khu phong đàm chỉ thống đặc hiệu vùng mặt' },
            { herb: 'Bạch Cương Tàm', grams: 10, role: 'Thần', purpose: 'Tức phong hóa đờm thông lạc' },
            { herb: 'Toàn Yết', grams: 4, role: 'Thần', purpose: 'Tức phong chỉ kinh giải co giật' },
            { herb: 'Tần Giao', grams: 12, role: 'Tá', purpose: 'Trừ phong thấp thư cân hoạt lạc' },
            { herb: 'Đương Quy', grams: 10, role: 'Tá', purpose: 'Hoạt huyết dưỡng huyết ("Huyết hành phong tất diệt")' },
            { herb: 'Phòng Phong', grams: 10, role: 'Sứ', purpose: 'Khu phong giải biểu dẫn thuốc vùng đầu mặt' }
          ],
          decoctionGuide: 'Sắc uống ngày 1 thang chia 2 lần uống ấm. Giữ ấm vùng mặt cổ tránh gió lùa.',
          modifications: ['Nếu mới trúng gió sợ lạnh nhiều gia Quế chi 10g, Can khương 6g', 'Nếu bệnh kéo dài trên 1 tháng gia Kê huyết đằng 16g, Đan sâm 12g']
        },
        acupuncturePrescription: {
          classicPoints: [
            { point: 'Địa Thương thấu Giáp Xa', location: 'Từ khóe miệng châm luồn kim dưới da hướng về góc hàm', technique: 'Châm luồn kim nông 1.5 - 2 thốn bên liệt', purpose: 'Thông kinh lạc cơ vòng miệng và cơ cắn' },
            { point: 'Dương Bạch thấu Ngư Yêu', location: 'Trên cung mày châm thấu xuống giữa lông mày', technique: 'Châm dưới da nông 1 thốn', purpose: 'Khôi phục nếp nhăn trán và nâng cung mày' },
            { point: 'Toản Trúc, Ty Trúc Không, Thái Dương', location: 'Xung quanh hốc mắt', technique: 'Châm nông day ấn nhẹ', purpose: 'Phục hồi cơ vòng mi giúp mắt nhắm kín' },
            { point: 'Hợp Cốc (LI-4) bên đối diện', location: 'Kẽ xương bàn ngón tay 1-2', technique: 'Châm tả mạnh', purpose: 'Đặc hiệu bệnh vùng đầu mặt ("Diện khẩu Hợp Cốc thu")' }
          ],
          tungPoints: [
            { point: 'Tứ Mã (88.17-19)', code: '88.17-19', dongQiInstructions: 'Châm 3 kim liên tiếp ở mặt ngoài đùi đồng thời nhăn trán cười mở mắt', purpose: 'Đặc hiệu điều trị liệt mặt và bệnh dị ứng thần kinh của Đổng Thị' }
          ],
          nguyenTaiThuGuidance: 'Phác đồ cứu tinh liệt mặt của GS. Nguyễn Tài Thu: Châm cứu ngay trong 3 ngày đầu kết hợp điện châm xung tần số 1-2Hz kích thích co cơ nhẹ nhàng, tuyệt đối không kích thích quá mạnh gây co cứng mặt.',
          westernNeuroscience: 'Điện châm kích thích tái sinh sợi trục thần kinh (Axonal sprouting) và phóng thích yếu tố tăng trưởng thần kinh NGF, ngăn chặn teo cơ bám da mặt.'
        },
        clinicalNutrition: {
          dietaryTherapy: 'Bổ sung Vitamin nhóm B liều cao (B1, B6, B12) hỗ trợ phục hồi bao myelin theo Essentials of Nutrition.',
          foodsToEat: ['Thịt nạc, trứng gà, cá nước ngọt', 'Đậu đỏ, ngũ cốc nguyên hạt giàu Vitamin B', 'Rau xanh nấu chín, nước ấm'],
          foodsToAvoid: ['Thức ăn lạnh, kem, nước đá lạnh', 'Tránh gió quạt thốc thẳng vào mặt, không tắm nước lạnh ban đêm'],
          drugNutrientInteractions: ['Trong 72 giờ đầu, kết hợp Corticoid (Prednisolone) theo chỉ định Tây Y để chống phù nề bao rễ thần kinh nhanh nhất.']
        },
        qigongAndLifestyle: 'Đeo kính râm khi ra ngoài và nhỏ nước muối sinh lý/nước mắt nhân tạo bảo vệ giác mạc; dùng tay xoa bóp vuốt cơ mặt từ khóe miệng lên thái dương ngày 3 lần.',
        westernPrescription: {
          protocolName: 'Phác đồ điều trị Liệt mặt Bell’s Palsy cấp (BV Bạch Mai & The Washington Manual)',
          sourceGuidelines: [
            'Dược thư Quốc gia Việt Nam',
            'Hướng dẫn chẩn đoán và điều trị bệnh nội khoa - BV Bạch Mai',
            'The Washington Manual of Medical Therapeutics',
            'Lippincott Illustrated Reviews: Pharmacology'
          ],
          medications: [
            {
              drugName: 'Medrol 16mg',
              activeIngredient: 'Methylprednisolone 16mg',
              group: 'Kháng viêm Corticoid toàn thân',
              dosage: '32mg (2 viên 16mg) x 1 lần/ngày vào lúc 8h sáng trong 5 ngày đầu, sau đó giảm liều dần trong 5 ngày tiếp theo',
              timing: 'Uống duy nhất 1 lần vào buổi sáng sau ăn no',
              mechanism: 'Chống phù nề cấp tính bao dây thần kinh mặt trong xương đá hẹp, ngăn chặn hoại tử thiếu máu sợi trục.',
              contraindications: 'Nhiễm nấm toàn thân, loét dạ dày tá tràng nặng.'
            },
            {
              drugName: 'Neurobion (hoặc 3B)',
              activeIngredient: 'Vitamin B1 (100mg) + B6 (200mg) + B12 (200mcg)',
              group: 'Vitamin dinh dưỡng thần kinh',
              dosage: '1 viên x 2 lần/ngày sau ăn',
              timing: 'Uống sau bữa ăn sáng và trưa',
              mechanism: 'Tham gia tổng hợp bao myelin và dẫn truyền xung động thần kinh cơ.',
              contraindications: 'Quá mẫn với cobalamin.'
            },
            {
              drugName: 'Tear Balance 0.1% (hoặc Sanlein)',
              activeIngredient: 'Sodium hyaluronate 0.1%',
              group: 'Nước mắt nhân tạo bảo vệ giác mạc',
              dosage: 'Nhỏ mắt bên liệt 1 giọt x 4 - 6 lần/ngày',
              timing: 'Nhỏ đều trong ngày và dùng gel bôi trơn mắt trước khi ngủ',
              mechanism: 'Giữ ẩm và tạo màng bảo vệ giác mạc khỏi khô rát và loét giác mạc do mắt nhắm không kín (Charles Bell).',
              contraindications: 'Quá mẫn với thành phần thuốc nhỏ mắt.'
            }
          ],
          clinicalCautions: ['Bắt đầu dùng Corticoid càng sớm càng tốt (tốt nhất trong 72 giờ đầu khởi phát liệt) để đạt tỷ lệ hồi phục hoàn toàn cao nhất (> 85%).'],
          monitoringParameters: ['Mức độ nhắm kín mắt', 'Nếp nhăn trán và độ cân đối rãnh mũi má']
        }
      },
      referencedBooks: [
        'Châm Cứu Chữa Bệnh - GS. Nguyễn Tài Thu',
        'Lectures on Tung’s Acupuncture - Dr. Wei-Chieh Young',
        'The Practice of Chinese Medicine - Giovanni Maciocia',
        'Chinese Herbal Medicine: Materia Medica - Dan Bensky',
        'Guyton and Hall Textbook of Medical Physiology',
        'Dược thư Quốc gia Việt Nam',
        'The Washington Manual of Medical Therapeutics'
      ]
    };
  }

  // 7. Mặc định & các chuyên khoa mở rộng (Tiểu đường, Hô hấp, Xoang, Tim mạch, Tuyến giáp, Nhãn khoa, Tiết niệu, Phụ khoa, Da liễu...): dùng Engine Y Học Khoa Học thống nhất
  return generateDynamicDiagnosisResult(patient, vitals, symptoms, exam);
}
