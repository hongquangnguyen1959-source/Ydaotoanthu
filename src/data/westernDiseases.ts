export interface WesternDisease {
  id: string;
  nameVi: string;
  nameEn: string;
  icd10: string;
  medicalRoots: {
    term: string;
    etymology: string; // From BS. Nguyen Thai Duy's Medical Terminology
    meaning: string;
  }[];
  guytonPhysiology: {
    system: string;
    homeostasisDisruption: string;
    cellularHemodynamicMechanism: string;
    clinicalParameters: {
      name: string;
      normalRange: string;
      criticalWarning: string;
    }[];
  };
  essentialsOfNutrition: {
    keyNutrients: string[];
    foodsToPrioritize: string[];
    foodsToAvoid: string[];
    drugNutrientInteractions: string[];
  };
  redFlags: string[]; // Cảnh báo nguy hiểm cấp cứu Tây Y
  tcmSyndromeCorrespondence: string; // Tương ứng Đông y
}

export const WESTERN_DISEASES: WesternDisease[] = [
  // 1. Tăng Huyết Áp
  {
    id: 'essential-hypertension',
    nameVi: 'Tăng Huyết Áp Nguyên Phát',
    nameEn: 'Essential Hypertension',
    icd10: 'I10',
    medicalRoots: [
      { term: 'Hyper-', etymology: 'Tiền tố Hy Lạp: Quá mức, vượt ngưỡng', meaning: 'Cao, tăng vượt giới hạn sinh lý' },
      { term: '-tension', etymology: 'Gốc Latin: Tensio (căng, áp lực)', meaning: 'Áp lực tác động lên thành động mạch' },
      { term: 'Arteri/o', etymology: 'Gốc từ: Động mạch', meaning: 'Hệ thống mạch máu mang máu từ tim đi nuôi cơ thể' }
    ],
    guytonPhysiology: {
      system: 'Hệ Tim Mạch & Điều Hòa Huyết Áp (Cardiovascular & Renal Hemodynamics)',
      homeostasisDisruption: 'Rối loạn điểm đặt áp suất (Pressure set-point) tại trung tâm vận mạch hành não và cơ chế bài xuất Natri của cầu thận theo Guyton & Hall.',
      cellularHemodynamicMechanism: 'Huyết áp = Cung lượng tim (CO) x Sức cản ngoại vi (TPR). Sự tăng trương lực cơ trơn tiểu động mạch thông qua dòng ion Ca2+ nội bào làm co thắt mạch, kết hợp hệ Renin-Angiotensin-Aldosterone (RAAS) giữ muối nước làm tăng thể tích tuần hoàn hiệu dụng.',
      clinicalParameters: [
        { name: 'Huyết áp tâm thu (Systolic)', normalRange: '90 - 120 mmHg', criticalWarning: '>= 180 mmHg (Cơn tăng huyết áp cấp cứu)' },
        { name: 'Huyết áp tâm trương (Diastolic)', normalRange: '60 - 80 mmHg', criticalWarning: '>= 120 mmHg (Nguy cơ xuất huyết não)' },
        { name: 'Độ lọc cầu thận eGFR', normalRange: '90 - 120 mL/min/1.73m2', criticalWarning: '< 60 mL/min (Tổn thương cơ quan đích thận)' }
      ]
    },
    essentialsOfNutrition: {
      keyNutrients: ['Kali (Potassium)', 'Magie (Magnesium)', 'Canxi (Calcium)', 'Omega-3 EPA/DHA', 'Nitric Oxide tiền chất'],
      foodsToPrioritize: ['Rau chân vịt, cải xoăn', 'Cần tây, củ dền (giàu nitrat tự nhiên làm giãn mạch)', 'Quả bơ, chuối tây', 'Cá hồi, hạt chia', 'Yến mạch nguyên cám'],
      foodsToAvoid: ['Muối ăn (> 5g/ngày), mắm tôm, cá khô, dưa cà muối xổi', 'Thịt xông khói, xúc xích', 'Rượu bia, nước tăng lực', 'Mỡ lợn, phủ tạng động vật'],
      drugNutrientInteractions: [
        'Thuốc ức chế men chuyển (ACEi) hoặc ARB kết hợp chế phẩm bổ sung Kali liều cao có thể gây tăng Kali máu nguy hiểm loạn nhịp tim.',
        'Thuốc chẹn kênh Canxi (Amlodipine) tương tác với nước ép bưởi chùm (Grapefruit) làm tăng nồng độ thuốc đột biến.'
      ]
    },
    redFlags: [
      'Đau đầu dữ dội đột ngột, nôn vọt, nhìn mờ một bên mắt',
      'Đau thắt ngực lan lên cằm hoặc cánh tay trái (Nghi ngờ nhồi máu cơ tim)',
      'Yếu liệt nửa người, méo miệng, nói ngọng đột ngột (Dấu hiệu FAST đột quỵ脑)'
    ],
    tcmSyndromeCorrespondence: 'Can Dương Thượng Kháng / Can Thận Âm Hư / Đàm Trệ Can Hỏa'
  },

  // 2. GERD & Loét dạ dày
  {
    id: 'gerd-peptic-ulcer',
    nameVi: 'Trào Ngược Dạ Dày Thực Quản & Viêm Loét Dạ Dày Tá Tràng',
    nameEn: 'Gastroesophageal Reflux Disease (GERD) & Peptic Ulcer Disease',
    icd10: 'K21.0 / K25',
    medicalRoots: [
      { term: 'Gastr/o', etymology: 'Gốc Hy Lạp: Dạ dày (Stomach)', meaning: 'Dạ dày, vùng thượng vị' },
      { term: 'Esophag/o', etymology: 'Gốc từ: Thực quản', meaning: 'Ống dẫn thức ăn từ miệng xuống dạ dày' },
      { term: '-itis', etymology: 'Hậu tố: Tình trạng viêm', meaning: 'Phản ứng viêm sưng nóng đỏ đau' }
    ],
    guytonPhysiology: {
      system: 'Hệ Tiêu Hóa & Bài Tiết Dịch Vị (Gastrointestinal Physiology)',
      homeostasisDisruption: 'Mất cân bằng giữa yếu tố tấn công (Acid HCl, Pepsin, nhiễm khuẩn Helicobacter pylori, stress) và yếu tố bảo vệ (Chất nhầy Mucin, Bicarbonate HCO3-, lưu lượng máu nuôi niêm mạc).',
      cellularHemodynamicMechanism: 'Bơm Proton H+/K+ ATPase ở tế bào thành bị kích thích liên tục qua các thụ thể Histamine H2, Gastrin và Acetylcholine (dây X phế vị). Cơ thắt thực quản dưới (LES) bị giãn bất thường gây trào ngược acid dịch vị vào lòng thực quản không có lớp chất nhầy bảo vệ.',
      clinicalParameters: [
        { name: 'Độ pH dạ dày', normalRange: '1.5 - 3.5', criticalWarning: 'Trào ngược lên thực quản pH < 4 kéo dài > 4% thời gian trong ngày' },
        { name: 'Hemoglobin (Hb)', normalRange: '12 - 16 g/dL', criticalWarning: '< 8 g/dL (Cảnh báo xuất huyết tiêu hóa do loét thủng)' }
      ]
    },
    essentialsOfNutrition: {
      keyNutrients: ['Kẽm Carnosine (Zinc-L-Carnosine)', 'L-Glutamine', 'Curcuminoids', 'DGL (Licorice khử Glycyrrhizin)', 'Chất xơ hòa tan Pectin'],
      foodsToPrioritize: ['Cháo hoa gạo lứt nấu gừng', 'Khoai lang hấp chín mềm', 'Bột sắn dây quấy chín', 'Nước ép bắp cải tươi (chứa Vitamin U)', 'Súp gà hầm củ sen'],
      foodsToAvoid: ['Cà phê đặc, trà đen lúc đói', 'Ớt cay, tiêu, mù tạt, giấm chua', 'Nước ngọt có ga, bia rượu', 'Đồ chiên rán ngập dầu mỡ, sô cô la (làm nhão cơ vòng thực quản dưới)'],
      drugNutrientInteractions: [
        'Dùng thuốc ức chế bơm Proton (PPI: Omeprazole, Esomeprazole) kéo dài làm giảm hấp thu Vitamin B12, Magie và Canxi, tăng nguy cơ loãng xương và thiếu máu.',
        'Antacid chứa Nhôm/Magie cản trở hấp thu sắt và kháng sinh Tetracycline.'
      ]
    },
    redFlags: [
      'Nôn ra máu tươi hoặc máu nâu đen như bã cà phê',
      'Đại tiện phân đen bóng như nhựa đường, mùi khắm tanh',
      'Đau bụng thượng vị dữ dội đột ngột như dao đâm, bụng gồng cứng như gỗ (Nghi thủng dạ dày)'
    ],
    tcmSyndromeCorrespondence: 'Can Khí Phạm Vị / Tỳ Vị Hư Hàn / Tỳ Vị Thấp Nhiệt'
  },

  // 3. Đau thần kinh tọa
  {
    id: 'sciatica-lumbar-herniation',
    nameVi: 'Đau Thần Kinh Tọa & Thoát Vị Đĩa Đệm Cột Sống Thắt Lưng',
    nameEn: 'Sciatica & Lumbar Intervertebral Disc Herniation',
    icd10: 'M51.1 / M54.3',
    medicalRoots: [
      { term: 'Sciat-', etymology: 'Gốc Latin: Ischiadicus (Vùng hông, mông)', meaning: 'Dây thần kinh ngồi / thần kinh hông to' },
      { term: 'Radicul/o', etymology: 'Gốc từ: Rễ thần kinh (Nerve root)', meaning: 'Bệnh lý rễ thần kinh tủy sống' },
      { term: '-pathy', etymology: 'Hậu tố: Tình trạng bệnh lý', meaning: 'Rối loạn hoặc suy thoái mô thần kinh' }
    ],
    guytonPhysiology: {
      system: 'Hệ Cơ Xương Khớp & Dẫn Truyền Thần Kinh Tủy Sống (Neuro-Musculoskeletal System)',
      homeostasisDisruption: 'Mất tính toàn vẹn vòng xơ annulus fibrosus của đĩa đệm, nhân nhầy nucleus pulposus thoát vị chèn ép cơ học và gây viêm hóa học lên rễ thần kinh L4, L5, S1.',
      cellularHemodynamicMechanism: 'Chèn ép cơ học làm giảm tưới máu vi mạch nuôi dây thần kinh (Vasa nervorum), dẫn đến thiếu máu cục bộ, rối loạn bơm Na+/K+ qua màng sợi trục thần kinh, phát sinh xung động lạc chỗ đau nhức bỏng rát lan tỏa dọc chi dưới.',
      clinicalParameters: [
        { name: 'Góc nâng chân thẳng Lasegue', normalRange: '80 - 90 độ', criticalWarning: '< 30 độ (Chèn ép rễ thần kinh cấp tính nặng)' },
        { name: 'Trương lực cơ cơ thắt hậu môn', normalRange: 'Bình thường', criticalWarning: 'Mất trương lực + đại tiểu tiện không tự chủ (Hội chứng chùm đuôi ngựa Cauda Equina - Cấp cứu ngoại khoa)' }
      ]
    },
    essentialsOfNutrition: {
      keyNutrients: ['Collagen Peptide Type II', 'Chondroitin Sulfate', 'Glucosamine', 'Vitamin B1, B6, B12', 'Magiê Malate'],
      foodsToPrioritize: ['Nước hầm xương giàu Collagen thiên nhiên', 'Cá hồi, cá trích giàu EPA/DHA', 'Hạt lanh, quả óc chó', 'Gừng ấm, bột nghệ nguyên chất'],
      foodsToAvoid: ['Đường tinh luyện, bánh kẹo ngọt công nghiệp (gây phản ứng Glycation hóa sụn đĩa đệm)', 'Chất béo chuyển hóa (Trans fats)', 'Rượu bia'],
      drugNutrientInteractions: [
        'Thuốc chống viêm không steroid (NSAIDs như Celecoxib, Meloxicam) dùng lâu ngày gây loét dạ dày và độc cho thận; cần dùng sau bữa no và theo dõi chức năng thận.'
      ]
    },
    redFlags: [
      'Bí tiểu đột ngột hoặc mất kiểm soát tiểu tiện/đại tiện',
      'Mất cảm giác vùng đáy chậu, mông (Mất cảm giác yên ngựa - Saddle anesthesia)',
      'Bàn chân rủ (Foot drop) không thể đi bằng gót chân hoặc mũi chân do liệt vận động cơ chày trước'
    ],
    tcmSyndromeCorrespondence: 'Tọa Cốt Phong (Khí Trệ Huyết Ứ / Phong Hàn Thấp Tý / Can Thận Hư Suy)'
  },

  // 4. Mất ngủ mạn tính
  {
    id: 'chronic-insomnia-anxiety',
    nameVi: 'Mất Ngủ Mạn Tính & Rối Loạn Lo Âu Thần Kinh Thể Nhẹ',
    nameEn: 'Chronic Insomnia & Mild Generalized Anxiety Disorder',
    icd10: 'G47.0 / F41.1',
    medicalRoots: [
      { term: 'In-', etymology: 'Tiền tố: Không, mất, phủ định', meaning: 'Không có, thiếu hụt' },
      { term: '-somnia', etymology: 'Gốc Latin: Somnus (Giấc ngủ)', meaning: 'Rối loạn liên quan đến giấc ngủ' },
      { term: 'Neur/o', etymology: 'Gốc Hy Lạp: Thần kinh', meaning: 'Hệ thống tế bào não bộ và dây thần kinh' }
    ],
    guytonPhysiology: {
      system: 'Hệ Thần Kinh Trung Ương & Nhịp Sinh Học Ngày - Đêm (Circadian Rhythm & Neurotransmitters)',
      homeostasisDisruption: 'Suy giảm nồng độ GABA (chất dẫn truyền thần kinh ức chế chính) và Serotonin tại vỏ脳; rối loạn chu kỳ tiết Melatonin của tuyến tùng do ánh sáng xanh và căng thẳng nội môi.',
      cellularHemodynamicMechanism: 'Tăng hoạt tính hệ thống kích hoạt lưới truyền lên (Ascending Reticular Activating System - ARAS), nồng độ Orexin và Cortisol ban đêm ở mức cao khiến tế bào thần kinh vỏ não không chuyển được sang trạng thái sóng Delta chậm phục hồi.',
      clinicalParameters: [
        { name: 'Thời gian tiềm phục giấc ngủ (Sleep Latency)', normalRange: '< 20 phút', criticalWarning: '> 60 phút không ngủ được kéo dài trên 3 tháng' },
        { name: 'Tổng thời lượng ngủ sâu NREM giai đoạn 3-4', normalRange: '15 - 25% tổng giấc ngủ', criticalWarning: '< 5% (Dẫn đến suy giảm miễn dịch và teo hồi hải mã trí nhớ)' }
      ]
    },
    essentialsOfNutrition: {
      keyNutrients: ['L-Theanine (từ trà xanh)', 'L-Tryptophan (tiền chất serotonin)', 'Magie Glycinate', 'Vitamin B6 (Pyridoxine)', 'Hoa cúc (Apigenin kết nối thụ thể GABA)'],
      foodsToPrioritize: ['Hạt sen, củ sen, tâm sen hãm trà', 'Yến mạch, chuối chín (giàu Tryptophan)', 'Quả anh đào chua Montmorency (chứa Melatonin tự nhiên)', 'Sữa ấm trước khi đi ngủ 45 phút'],
      foodsToAvoid: ['Caffeine sau 14h chiều (trà sữa, cà phê, nước ngọt có ga)', 'Rượu bia trước khi ngủ (gây phân mảnh giấc ngủ REM)', 'Bữa ăn thịnh soạn nhiều đạm béo sau 20h tối'],
      drugNutrientInteractions: [
        'Thuốc an thần nhóm Benzodiazepine hoặc Zolpidem kết hợp với rượu cồn có thể ức chế hô hấp dẫn đến ngừng thở khi ngủ.'
      ]
    },
    redFlags: [
      'Có ý nghĩ tự sát hoặc tự làm tổn thương bản thân',
      'Ảo giác thị giác hoặc thính giác, hoang tưởng hoảng sợ cực độ',
      'Mất ngủ cấp tính sau chấn thương đầu hoặc nhiễm trùng hệ thần kinh trung ương'
    ],
    tcmSyndromeCorrespondence: 'Tâm Tỳ Lưỡng Hư / Tâm Thận Bất Giao / Can Khí Uất Hóa Hỏa Nhiễu Thần'
  },

  // 5. Bệnh Gout
  {
    id: 'gout-hyperuricemia',
    nameVi: 'Bệnh Gout (Gút) Cấp & Mạn Tính & Tăng Acid Uric Máu',
    nameEn: 'Acute & Chronic Gouty Arthritis & Hyperuricemia',
    icd10: 'M10.0 / E79.0',
    medicalRoots: [
      { term: 'Hyper-', etymology: 'Tiền tố: Tăng cao, quá mức', meaning: 'Vượt ngưỡng bình thường' },
      { term: 'Uric/o', etymology: 'Gốc từ: Acid Uric', meaning: 'Sản phẩm chuyển hóa purin trong cơ thể' },
      { term: '-emia', etymology: 'Hậu tố: Trong máu', meaning: 'Tình trạng hiện diện trong máu' }
    ],
    guytonPhysiology: {
      system: 'Hệ Chuyển Hóa Purin & Khớp Hoạt Dịch (Purine Metabolism & Joint Hemodynamics)',
      homeostasisDisruption: 'Tăng sản xuất acid uric do chế độ ăn nhiều purin / khiếm khuyết enzym hPRT, hoặc giảm bài tiết acid uric qua ống thận (chiếm 90% trường hợp).',
      cellularHemodynamicMechanism: 'Khi nồng độ acid uric máu > 6.8 mg/dL (ngưỡng bão hòa sinh lý ở 37°C), tinh thể Monosodium Urat (MSU) kết tủa tại bao hoạt dịch khớp. Tinh thể MSU kích hoạt dòng thác miễn dịch NLRP3 inflammasome trong bạch cầu đa nhân trung tính, phóng thích IL-1beta, TNF-alpha gây đợt viêm khớp cấp dữ dội.',
      clinicalParameters: [
        { name: 'Nồng độ Urate huyết thanh', normalRange: '3.5 - 6.0 mg/dL (200 - 360 umol/L)', criticalWarning: '>= 9.0 mg/dL (Nguy cơ bùng phát cơn gout cấp và lắng đọng hạt Tophis)' },
        { name: 'Acid Uric niệu 24 giờ', normalRange: '250 - 750 mg/24h', criticalWarning: '> 800 mg/24h (Tăng đào thải, dễ gây sỏi urat tại thận)' }
      ]
    },
    essentialsOfNutrition: {
      keyNutrients: ['Vitamin C (hạ acid uric niệu)', 'Anthocyanins (từ quả mọng)', 'Nước kiềm khoáng thiên nhiên', 'Tart Cherry Extract', 'Bicarbonate'],
      foodsToPrioritize: ['Quả anh đào (Cherry), dâu tây, việt quất', 'Sữa tươi tách béo, sữa chua ít đường', 'Rau xanh (cải bẹ xanh, dưa chuột, bí đao)', 'Uống đủ 2.5 - 3 lít nước ấm mỗi ngày'],
      foodsToAvoid: ['Nội tạng động vật (gan, thận, tim, óc)', 'Hải sản (sò, điệp, cua, tôm, cá ngừ)', 'Bia hơi, bia chai (giàu guanosine làm tăng acid uric gấp đôi)', 'Nước ngọt giàu đường Fructose công nghiệp'],
      drugNutrientInteractions: [
        'Thuốc hạ acid uric Allopurinol tương tác với Azathioprine / 6-MP gây độc tủy xương nặng.',
        'Thuốc lợi tiểu Thiazide (Hydrochlorothiazide) cạnh tranh bài tiết làm tăng acid uric máu.'
      ]
    },
    redFlags: [
      'Khớp sưng nóng đỏ dữ dội kèm sốt cao > 38.5°C (Nghi ngờ nhiễm trùng khớp kết hợp)',
      'Hạt Tophis bị loét chảy dịch trắng như phấn vôi kèm mủ',
      'Thiểu niệu, vô niệu hoặc đau quặn thận do sỏi urat tắc nghẽn'
    ],
    tcmSyndromeCorrespondence: 'Thống Phong (Phong Thấp Nhiệt Tý / Đàm Nhiệt Ứ Trệ Hóa Hỏa / Thận Khí Hư Suy)'
  },

  // 6. Đái Tháo Đường Tuýp 2
  {
    id: 'type-2-diabetes',
    nameVi: 'Đái Tháo Đường Tuýp 2 & Hội Chứng Chuyển Hóa',
    nameEn: 'Type 2 Diabetes Mellitus & Metabolic Syndrome',
    icd10: 'E11 / E88.81',
    medicalRoots: [
      { term: 'Dia-', etymology: 'Tiền tố: Xuyên qua, chảy qua', meaning: 'Xuyên qua' },
      { term: '-betes', etymology: 'Gốc Hy Lạp: Đi qua (Syphon)', meaning: 'Tiểu nhiều, đi tiểu liên tục' },
      { term: 'Mellitus', etymology: 'Gốc Latin: Ngọt như mật', meaning: 'Nước tiểu có đường' }
    ],
    guytonPhysiology: {
      system: 'Hệ Nội Tiết & Chuyển Hóa Glucose Tế Bào (Endocrine & Carbohydrate Metabolism)',
      homeostasisDisruption: 'Kháng Insulin tại mô đích (cơ vân, mô mỡ, gan) kết hợp suy giảm chức năng tiết Insulin tiến triển của tế bào beta tụy.',
      cellularHemodynamicMechanism: 'Thụ thể GLUT-4 tại màng tế bào giảm nhạy cảm với Insulin do độc tính mỡ (Lipotoxicity) và viêm mạn tính mức độ thấp. Sự tăng tân tạo glucose tại gan cùng giảm thu nhận glucose tại cơ làm glucose máu tăng cao. Đường huyết tăng mãn tính sinh ra các sản phẩm glycation hóa nâng cao (AGEs) làm tổn thương nội mạc mạch máu nhỏ (võng mạc, thận, thần kinh) và mạch máu lớn (vành, não).',
      clinicalParameters: [
        { name: 'Chỉ số HbA1c', normalRange: '< 5.7 %', criticalWarning: '>= 6.5 % (Chẩn đoán ĐTĐ) / > 9.0% (Kiểm soát kém, nguy cơ biến chứng)' },
        { name: 'Glucose máu lúc đói (FPG)', normalRange: '70 - 99 mg/dL (3.9 - 5.5 mmol/L)', criticalWarning: '>= 126 mg/dL (Chẩn đoán ĐTĐ)' }
      ]
    },
    essentialsOfNutrition: {
      keyNutrients: ['Crom Picolinate', 'Axit Alpha-Lipoic (ALA)', 'Chất xơ hòa tan Inulin/Beta-glucan', 'Magiê', 'Berberine'],
      foodsToPrioritize: ['Gạo lứt, yến mạch, hạt quinoa', 'Các loại đậu (đậu đen, xanh, đỏ, nành)', 'Rau xanh đậm (cải búp, súp lơ xanh)', 'Quả bơ, dâu tây, ổi tươi', 'Cá hồi, ức gà'],
      foodsToAvoid: ['Đường kính trắng, bánh kẹo, chè ngọt', 'Nước ngọt đóng chai, nước ép hoa quả đóng hộp', 'Bánh mì trắng, xôi nếp, bún phở quá nhiều', 'Mỡ động vật, đồ chiên rán'],
      drugNutrientInteractions: [
        'Dùng Metformin lâu năm làm suy giảm nghiêm trọng hấp thu Vitamin B12 tại ruột non, dễ gây tổn thương thần kinh ngoại biên; cần bổ sung B12 định kỳ.'
      ]
    },
    redFlags: [
      'Lơ mơ, thở nhanh sâu mùi táo chín (Nhiễm toan Ceton đái tháo đường DKA)',
      'Hôn mê, vã mồ hôi lạnh, run tay chân, vã mồ hôi do hạ đường huyết < 70 mg/dL',
      'Vết thương nhỏ ở bàn chân bị hoại tử đen, loét rộng không lành (Bàn chân đái tháo đường)'
    ],
    tcmSyndromeCorrespondence: 'Tiêu Khát (Thượng Tiêu Phế Nhiệt / Trung Tiêu Vị Hỏa / Hạ Tiêu Thận Âm Hư)'
  },

  // 7. Rối Loạn Lipid Máu
  {
    id: 'dyslipidemia-atherosclerosis',
    nameVi: 'Rối Loạn Lipid Máu & Xơ Vữa Động Mạch',
    nameEn: 'Dyslipidemia & Atherosclerosis',
    icd10: 'E78.5 / I70',
    medicalRoots: [
      { term: 'Dys-', etymology: 'Tiền tố: Bất thường, khó khăn', meaning: 'Rối loạn, sai lệch' },
      { term: 'Lipid/o', etymology: 'Gốc từ: Chất béo, mỡ', meaning: 'Chất béo trong cơ thể' },
      { term: '-emia', etymology: 'Hậu tố: Trong máu', meaning: 'Hiện diện trong dòng máu' }
    ],
    guytonPhysiology: {
      system: 'Hệ Chuyển Hóa Lipoprotein & Nội Mạc Mạch Máu (Vascular Endothelium)',
      homeostasisDisruption: 'Mất cân bằng giữa Lipoprotein tỷ trọng thấp (LDL-C - vận chuyển cholesterol đến mô) và Lipoprotein tỷ trọng cao (HDL-C - dọn dẹp cholesterol về gan).',
      cellularHemodynamicMechanism: 'Phân tử LDL-C xâm nhập lớp dưới nội mạc động mạch, bị oxy hóa thành oxLDL. Tế bào đại thực bào nuốt oxLDL trở thành Tế bào bọt (Foam cells), giải phóng cytokine viêm và hình thành vệt mỡ (Fatty streak). Theo thời gian, bao xơ bao bọc lõi hoại tử hình thành mảng xơ vữa (Atherosclerotic plaque) làm hẹp lòng mạch và dễ nứt vỡ gây huyết khối tắc mạch.',
      clinicalParameters: [
        { name: 'LDL-Cholesterol', normalRange: '< 100 mg/dL (2.6 mmol/L)', criticalWarning: '>= 190 mg/dL (Tăng cholesterol gia đình / Nguy cơ tim mạch rất cao)' },
        { name: 'Triglyceride', normalRange: '< 150 mg/dL (1.7 mmol/L)', criticalWarning: '>= 500 mg/dL (Nguy cơ viêm tụy cấp nguy hiểm tính mạng)' }
      ]
    },
    essentialsOfNutrition: {
      keyNutrients: ['Phytosterols / Plant Stanols', 'Omega-3 EPA & DHA', 'Chất xơ Beta-Glucan', 'Coenzyme Q10', 'Niacin (Vitamin B3)'],
      foodsToPrioritize: ['Yến mạch, cám gạo lứt', 'Táo, lê, cam tươi (giàu Pectin)', 'Cá béo (cá thu, cá trích, cá hồi)', 'Hạt óc chó, hạnh nhân, hạt bưởi', 'Dầu oliu nguyên chất Extra Virgin'],
      foodsToAvoid: ['Mỡ lợn, mỡ bò, bơ mộng', 'Lòng đỏ trứng gà quá 3 quả/tuần', 'Phủ tạng động vật (óc, gan, lòng)', 'Bánh ngọt chứa chất béo hydro hóa (Trans fat)'],
      drugNutrientInteractions: [
        'Thuốc hạ mỡ máu nhóm Statin (Atorvastatin, Rosuvastatin) làm sụt giảm tổng hợp Coenzyme Q10 nội sinh tại cơ, gây đau mỏi cơ vân; nên bổ sung CoQ10 100mg/ngày.'
      ]
    },
    redFlags: [
      'Đau thắt ngực đè nặng sau xương ức xuất hiện khi gắng sức hoặc nghỉ ngơi',
      'Đau cách hồi cẳng chân khi đi bộ (Xơ vữa động mạch chi dưới)',
      'Tê bì nữa mặt, nói ngọng chốc thoáng (Thiếu máu não cục bộ thoáng qua TIA)'
    ],
    tcmSyndromeCorrespondence: 'Đàm Ứ Huyết Trệ / Tỳ Thận Hư Suy / Can Uất Tỳ Hư'
  },

  // 8. Viêm Mũi Xoang
  {
    id: 'allergic-rhinitis-sinusitis',
    nameVi: 'Viêm Mũi Xoang Dị Ứng & Viêm Xoang Mạn Tính',
    nameEn: 'Allergic Rhinitis & Chronic Rhinosinusitis',
    icd10: 'J30.4 / J32',
    medicalRoots: [
      { term: 'Rhin/o', etymology: 'Gốc Hy Lạp: Mũi (Nose)', meaning: 'Mũi, hốc mũi' },
      { term: 'Sinus/o', etymology: 'Gốc Latin: Xoang, hốc rỗng', meaning: 'Các hốc xoang cạnh mũi' },
      { term: '-itis', etymology: 'Hậu tố: Viêm', meaning: 'Phản ứng viêm sung huyết' }
    ],
    guytonPhysiology: {
      system: 'Hệ Hô Hấp Trên & Miễn Dịch Quá Mẫn Thể I (Upper Respiratory Immunity)',
      homeostasisDisruption: 'Phản ứng đáp ứng quá mẫn tuýp I trung gian qua kháng thể IgE tại niêm mạc hô hấp trên khi tiếp xúc với dị nguyên (phấn hoa, bụi nhà, lông thú, nấm mốc).',
      cellularHemodynamicMechanism: 'Dị nguyên gắn lên IgE trên bề mặt Dưỡng bào (Mast cell) gây thoát hạt giải phóng Histamine, Leukotrienes và Prostaglandin. Kích thích gây co mạch / phù nề niêm mạc cuốn mũi, giãn mạch vi tuần hoàn, tắc nghẽn lỗ thông xoang (Ostium) dẫn đến ứ đọng dịch nhầy và nhiễm khuẩn thứ phát.',
      clinicalParameters: [
        { name: 'Bạch cầu toan tính (Eosinophil)', normalRange: '1 - 4 %', criticalWarning: '> 8% (Phản ứng dị ứng mức độ nặng)' },
        { name: 'Nồng độ IgE toàn phần', normalRange: '< 100 IU/mL', criticalWarning: '> 300 IU/mL (Cơ địa dị ứng mạn tính)' }
      ]
    },
    essentialsOfNutrition: {
      keyNutrients: ['Quercetin (từ hành tây)', 'Vitamin C', 'Kẽm (Zinc)', 'Bromelain (từ dứa tươi)', 'Probiotics chủng Lactobacillus'],
      foodsToPrioritize: ['Dứa tươi (chứa Bromelain chống viêm)', 'Gừng, tỏi, tía tô, húng quế', 'Nước ấm hầm xương, súp ấm', 'Trà hoa cúc ấm'],
      foodsToAvoid: ['Sữa bò và chế phẩm từ sữa (tăng tiết dịch nhầy đặc)', 'Nước đá lạnh, kem lạnh', 'Bia rượu, hải sản dễ dị ứng', 'Đồ ăn cay nóng quá mức'],
      drugNutrientInteractions: [
        'Kháng sinh điều trị viêm xoang (Augmentin) dùng kéo dài gây loạn khuẩn ruột nghiêm trọng; cần bổ sung men vi sinh Probiotics sau khi ngưng kháng sinh 2 giờ.'
      ]
    },
    redFlags: [
      'Sưng đỏ, đau nhức lan lên vùng hốc mắt hoặc trán, nhìn đôi / nhìn mờ',
      'Sốt cao kèm cứng gáy, đau đầu dữ dội (Cảnh báo biến chứng viêm màng não)',
      'Chảy mủ xanh thối một bên mũi kèm chảy máu mũi (Cảnh báo dị vật hoặc u xoang)'
    ],
    tcmSyndromeCorrespondence: 'Tỵ Uyên (Phế Khí Hư / Phong Hàn Uất Nhiệt / Tỳ Hư Thấp Thịnh)'
  },

  // 9. Thoái Hóa Khớp Gối
  {
    id: 'knee-osteoarthritis',
    nameVi: 'Thoái Hóa Khớp Gối & Viêm Khớp Mạn Tính',
    nameEn: 'Knee Osteoarthritis & Chronic Arthropathy',
    icd10: 'M17.9',
    medicalRoots: [
      { term: 'Oste/o', etymology: 'Gốc Hy Lạp: Xương (Bone)', meaning: 'Mô xương' },
      { term: 'Arthr/o', etymology: 'Gốc từ: Khớp (Joint)', meaning: 'Hệ thống khớp xương' },
      { term: '-itis', etymology: 'Hậu tố: Viêm', meaning: 'Tình trạng thoái hóa và viêm khớp' }
    ],
    guytonPhysiology: {
      system: 'Hệ Vận Động & Màng Hoạt Dịch Khớp (Joint Cartilage & Synovial Physiology)',
      homeostasisDisruption: 'Mất cân bằng giữa quá trình tổng hợp và thoái hóa sụn khớp do lão hóa, chịu tải trọng thừa cân hoặc chấn thương.',
      cellularHemodynamicMechanism: 'Tế bào sụn (Chondrocyte) giảm sản xuất Collagen Type II và Proteoglycan, đồng thời tăng tiết các enzym tiêu đạm MMPs (Matrix Metalloproteinases) và Aggrecanase. Sụn khớp bị bào mòn rạn nứt, hẹp khe khớp, xơ hóa xương dưới sụn và hình thành gai xương (Osteophytes) gây cọ xát đau khi vận động.',
      clinicalParameters: [
        { name: 'Khoảng cách khe khớp gối trên X-quang', normalRange: '4 - 6 mm', criticalWarning: '< 2 mm (Thoái hóa độ 3-4 nặng, hẹp khe khớp rõ rệt)' },
        { name: 'Tốc độ máu lắng ESR', normalRange: '< 20 mm/h', criticalWarning: '> 50 mm/h (Viêm khớp hoạt động mạnh)' }
      ]
    },
    essentialsOfNutrition: {
      keyNutrients: ['Glucosamine Sulfate tinh thể', 'Chondroitin', 'MSM (Methylsulfonylmethane)', 'Curcumin', 'Vitamin D3 & K2'],
      foodsToPrioritize: ['Rau mồng tơi, đậu bắp (chứa chất nhớn tự nhiên)', 'Nước hầm sụn gà, cá hồi', 'Quả bơ, dầu oliu', 'Nước ép cam, ổi tươi giàu Vitamin C'],
      foodsToAvoid: ['Cà pháo, măng chua, dưa muối', 'Thịt đỏ chứa purin và sắt cao gây viêm', 'Rượu bia, đồ uống có cước ngọt', 'Thức ăn chiên ngập dầu'],
      drugNutrientInteractions: [
        'Glucosamine có thể làm tăng nhẹ chỉ số đường huyết ở người đái tháo đường; cần theo dõi glucose máu khi bắt đầu dùng.'
      ]
    },
    redFlags: [
      'Khớp gối sưng nóng đỏ dữ dội kèm sốt cao (Nghi ngờ viêm khớp mủ tràn dịch cấp)',
      'Kẹt khớp hoàn toàn, không thể co duỗi du cho dùng lực',
      'Biến dạng lệch trục khớp gối nặng (Chân chữ O hoặc chữ X) làm mất khả năng đi lại'
    ],
    tcmSyndromeCorrespondence: 'Hạc Tất Phong / Khớp Tý (Can Thận Hư Suy / Phong Hàn Thấp Tý / Khí Trệ Huyết Ứ)'
  },

  // 10. Sỏi Thận & Nhiễm Trùng Tiết Niệu
  {
    id: 'nephrolithiasis-uti',
    nameVi: 'Bệnh Sỏi Thận & Nhiễm Trùng Đường Tiết Niệu',
    nameEn: 'Nephrolithiasis & Urinary Tract Infection (UTI)',
    icd10: 'N20.0 / N39.0',
    medicalRoots: [
      { term: 'Nephr/o', etymology: 'Gốc Hy Lạp: Thận (Kidney)', meaning: 'Thận và đơn vị Nephron' },
      { term: 'Lith/o', etymology: 'Gốc từ: Sỏi, đá (Stone)', meaning: 'Mảng kết tinh cứng' },
      { term: '-iasis', etymology: 'Hậu tố: Tình trạng hình thành sỏi', meaning: 'Bệnh lý hình thành sỏi' }
    ],
    guytonPhysiology: {
      system: 'Hệ Tế Bào Thận & Dẫn Truyền Nước Tiểu (Renal & Urinary Tract System)',
      homeostasisDisruption: 'Quá bão hòa các muối khoáng (Calcium Oxalate, Urate, Struvite) trong nước tiểu kết hợp suy giảm các chất chế tiết chống tạo sỏi (Citrate, Pyrophosphate).',
      cellularHemodynamicMechanism: 'Nước tiểu cô đặc làm các mầm tinh thể kết tụ tại mảng Randall niêm mạc đài bể thận, phát triển thành viên sỏi. Sỏi di chuyển xuống niệu quản gây co thắt nhu động niệu quản sinh cơn đau quặn thận. Sự ứ đọng nước tiểu là môi trường thuận lợi cho vi khuẩn Escherichia coli bám dính gây nhiễm trùng đường tiết niệu.',
      clinicalParameters: [
        { name: 'Tỷ trọng nước tiểu (Specific Gravity)', normalRange: '1.010 - 1.025', criticalWarning: '> 1.030 (Cảnh báo cô đặc nước tiểu nguy cơ kết tinh sỏi)' },
        { name: 'Bạch cầu nước tiểu (Leukocyte Esterase)', normalRange: 'Âm tính (-)', criticalWarning: 'Dương tính (+++) kèm vi khuẩn (Nhiễm trùng tiết niệu)' }
      ]
    },
    essentialsOfNutrition: {
      keyNutrients: ['Citrate (từ chanh, cam)', 'Magiê B6', 'Cranberry Extract (Proanthocyanidins)', 'Nước khoáng kiềm', 'Vitamin B6'],
      foodsToPrioritize: ['Nước chanh tươi pha ấm (giàu Citrate ức chế kết tinh sỏi Oxalate)', 'Quả việt quất (Cranberry)', 'Rau ngô, râu mèo, mã đề hãm nước', 'Uống 2.5 - 3.0 lít nước chia đều cả ngày'],
      foodsToAvoid: ['Rau rau mót, rau rau dền, chè đặc, sô cô la (rất giàu Oxalate)', 'Muối ăn mặn (> 5g/ngày làm tăng đào thải Canxi vào nước tiểu)', 'Protein động vật quá nhiều', 'Nước ngọt đóng chai'],
      drugNutrientInteractions: [
        'Thuốc kali citrate làm kiềm hóa nước tiểu hòa tan sỏi Urat nhưng chống chỉ định khi suy thận hoặc dùng thuốc giữ kali.'
      ]
    },
    redFlags: [
      'Cơn đau quặn thận dữ dội lan xuống vùng bẹn sinh dục kèm nôn vọt',
      'Sốt cao rét run > 38.5°C kèm đau lưng hông (Cảnh báo viêm đài bể thận cấp)',
      'Đái ra máu tươi hoặc đái mủ đục kèm bí tiểu hoàn toàn'
    ],
    tcmSyndromeCorrespondence: 'Lâm Chứng / Sỏi Thận (Thấp Nhiệt Hạ Tiêu / Thận Hư Khí Trệ / Huyết Lâm)'
  },

  // 11. Suy Giáp
  {
    id: 'hypothyroidism-hashimoto',
    nameVi: 'Suy Giáp & Viêm Tuyến Giáp Tự Miễn Hashimoto',
    nameEn: 'Hypothyroidism & Hashimoto’s Thyroiditis',
    icd10: 'E03.9 / E06.3',
    medicalRoots: [
      { term: 'Hypo-', etymology: 'Tiền tố: Giảm, dưới mức', meaning: 'Thiếu hụt, suy giảm' },
      { term: 'Thyr/o', etymology: 'Gốc Hy Lạp: Tuyến giáp (Thyroid)', meaning: 'Tuyến nội tiết vùng cổ' },
      { term: '-oid', etymology: 'Hậu tố: Có dạng, giống như', meaning: 'Có hình dạng cái khiên' }
    ],
    guytonPhysiology: {
      system: 'Hệ Trục Hạ Đồi - Tuyến Yên - Tuyến Giáp (HPT Axis)',
      homeostasisDisruption: 'Tuyến giáp không sản xuất đủ hormone Thyroxine (T4) và Triiodothyronine (T3) do sự phá hủy mô tự miễn bởi kháng thể TPOAb và TgAb trong bệnh Hashimoto.',
      cellularHemodynamicMechanism: 'Thiếu T3/T4 làm sụt giảm hoạt tính của bơm Na+/K+ ATPase trong mọi tế bào cơ thể, giảm sản sinh nhiệt (Thermogenesis), giảm chuyển hóa cơ bản (BMR). Tích tụ Glycosaminoglycans ở mô liên kết gây phù niêm (Myxedema), nhịp tim chậm, táo bón và chậm chạp tâm thần vận động.',
      clinicalParameters: [
        { name: 'Nồng độ TSH (Thyroid Stimulating Hormone)', normalRange: '0.4 - 4.0 mIU/L', criticalWarning: '> 10.0 mIU/L (Suy giáp lâm sàng cần điều trị hormone thay thế)' },
        { name: 'FT4 (Free Thyroxine)', normalRange: '0.8 - 1.8 ng/dL', criticalWarning: '< 0.5 ng/dL (Thiếu hụt T4 nghiêm trọng)' }
      ]
    },
    essentialsOfNutrition: {
      keyNutrients: ['I-ốt (Iodine)', 'Selen (Selenium)', 'Kẽm (Zinc)', 'Vitamin D3', 'Tyrosine'],
      foodsToPrioritize: ['Rong biển, tảo bẹ (vừa phải)', 'Hạt dẻ cười, hạt điều (giàu Selen)', 'Cá biển tươi, tôm hùm', 'Trứng gà tươi', 'Rau xanh chín nướng'],
      foodsToAvoid: ['Rau họ Cải sống (Bắp cải, súp lơ, su hào chứa Goitrogen cản trở hấp thu I-ốt)', 'Đậu nành sống và mầm đậu nành', 'Thực phẩm chế biến sẵn quá giàu Gluten'],
      drugNutrientInteractions: [
        'Thuốc hormone tuyến giáp Levothyroxine (Synthroid) phải uống vào buổi sáng sớm lúc đói trước ăn 30-60 phút; cản trở hấp thu bởi Canxi, Sắt và Sữa.'
      ]
    },
    redFlags: [
      'Hôn mê phù niêm (Myxedema coma): Hạ thân nhiệt < 35°C, chậm nhịp tim, lơ mơ',
      'Khó thở, khó nuốt nặng do bướu cổ to chèn ép khí quản thực quản',
      'Trầm cảm nặng kèm suy giảm trí nhớ trầm trọng'
    ],
    tcmSyndromeCorrespondence: 'Thận Dương Hư Suy / Tỳ Thận Dương Hư / Đàm Thấp Trệ'
  },

  // 12. Cường Giáp
  {
    id: 'hyperthyroidism-basedow',
    nameVi: 'Cường Giáp & Bệnh Basedow / Graves',
    nameEn: 'Hyperthyroidism & Graves’ Disease',
    icd10: 'E05.0',
    medicalRoots: [
      { term: 'Hyper-', etymology: 'Tiền tố: Tăng cao, dư thừa', meaning: 'Vượt mức sinh lý' },
      { term: 'Thyr/o', etymology: 'Gốc từ: Tuyến giáp', meaning: 'Tuyến giáp trạng' },
      { term: '-ism', etymology: 'Hậu tố: Tình trạng bệnh lý', meaning: 'Hội chứng dư thừa hormone' }
    ],
    guytonPhysiology: {
      system: 'Hệ Nội Tiết & Chuyển Hóa Cơ Bản (HPT Axis & Basal Metabolic Rate)',
      homeostasisDisruption: 'Kháng thể tự miễn TRAb (TSH Receptor Antibody) kích thích liên tục thụ thể TSH trên tế bào tuyến giáp, gây tăng tiết hormone T3 và T4 quá mức ngoài sự kiểm soát của tuyến yên.',
      cellularHemodynamicMechanism: 'Dư thừa T3/T4 làm tăng tốc độ chuyển hóa cơ bản (BMR), tăng số lượng thụ thể Beta-adrenergic tại tim làm tim đập nhanh, vã mồ hôi, gầy sút cân dù ăn nhiều, run tay tần số cao và lồi mắt do thâm nhiễm mô hốc mắt.',
      clinicalParameters: [
        { name: 'Nồng độ TSH', normalRange: '0.4 - 4.0 mIU/L', criticalWarning: '< 0.01 mIU/L (Ức chế hoàn toàn do cường giáp nặng)' },
        { name: 'FT3 & FT4', normalRange: 'FT3: 2.0 - 4.4 pg/mL', criticalWarning: 'Tăng gấp 2-3 lần bình thường (Nguy cơ bão giáp Thyroid storm)' }
      ]
    },
    essentialsOfNutrition: {
      keyNutrients: ['L-Carnitine (ức chế tác động hormone giáp vào tế bào)', 'Canxi & Vitamin D3', 'Magie', 'Chất chống oxy hóa CoQ10'],
      foodsToPrioritize: ['Rau họ Cải (Bắp cải, súp lơ, bông cải xanh luộc giúp ức chế tổng hợp T4)', 'Các loại hạt chứa Canxi', 'Nước dừa tươi, dưa hấu', 'Cháo đậu xanh, cháo hạt sen'],
      foodsToAvoid: ['Rong biển, hải sản biển, muối I-ốt (dư thừa I-ốt làm bùng phát cường giáp)', 'Cà phê đặc, trà đặc, nước tăng lực', 'Bia rượu, ớt cay'],
      drugNutrientInteractions: [
        'Thuốc kháng giáp synthetic (Methimazole / PTU) có thể gây giảm bạch cầu hạt nghiêm trọng; cần xét nghiệm công thức máu nếu sốt đau họng.'
      ]
    },
    redFlags: [
      'Cơn bão giáp (Thyroid Storm): Sốt cao > 39-40°C, tim đập rất nhanh > 140 nhịp/phút, kích động, lú lẫn, sụp tuần hoàn',
      'Loạn nhịp tim rung nhĩ (Atrial fibrillation) nguy cơ tắc mạch não',
      'Mắt lồi nặng không nhắm kín được gây viêm loét giác mạc'
    ],
    tcmSyndromeCorrespondence: 'Anh Lựu / Can Hỏa Xung Thịnh / Âm Hư Hỏa Vượng / Tâm Can Hỏa Thịnh'
  },

  // 13. COPD & Hen Phế Quản
  {
    id: 'copd-asthma',
    nameVi: 'Bệnh Phổi Tắc Nghẽn Mạn Tính (COPD) & Hen Phế Quản',
    nameEn: 'Chronic Obstructive Pulmonary Disease (COPD) & Bronchial Asthma',
    icd10: 'J44 / J45',
    medicalRoots: [
      { term: 'Bronch/o', etymology: 'Gốc Hy Lạp: Phế quản (Bronchus)', meaning: 'Đường dẫn khí vào phổi' },
      { term: 'Pneum/o', etymology: 'Gốc từ: Phổi, không khí', meaning: 'Phổi và hô hấp' },
      { term: '-spasm', etymology: 'Hậu tố: Co thắt cơ trơn', meaning: 'Cơn co thắt đột ngột' }
    ],
    guytonPhysiology: {
      system: 'Hệ Hô Hấp & Thông Khí Phế Nang (Pulmonary Ventilation & Gas Exchange)',
      homeostasisDisruption: 'Tắc nghẽn luồng khí thở ra không hồi phục hoàn toàn (COPD do khói thuốc/bụi mịn) hoặc co thắt đường thở hồi phục (Hen phế quản do viêm mạn tính).',
      cellularHemodynamicMechanism: 'Viêm mạn tính gây xơ hóa tiểu phế quản tận, phá hủy phế nang làm giảm diện tích khuếch tán khí O2/CO2 (Khí thũng - Emphysema). Trong hen phế quản, sự co thắt cơ trơn phế quản trung gian qua Leukotriene và Histamine gây bẫy khí (Air trapping), tăng công hô hấp và giảm PaO2 máu.',
      clinicalParameters: [
        { name: 'Chỉ số FEV1/FVC (Hô hấp ký)', normalRange: '>= 70 %', criticalWarning: '< 70% sau thử thuốc giãn phế quản (Tắc nghẽn đường thở mạn tính)' },
        { name: 'Độ bão hòa Oxy SpO2', normalRange: '95 - 100 %', criticalWarning: '< 90 % (Suy hô hấp cấp / mạn tính)' }
      ]
    },
    essentialsOfNutrition: {
      keyNutrients: ['N-Acetylcysteine (NAC - tiêu đờm & glutathione)', 'Omega-3', 'Vitamin D3', 'Magiê', 'Vitamin C'],
      foodsToPrioritize: ['Nước ấm (2.0 - 2.5 lít/ngày giúp loãng đờm)', 'Cá béo, dầu hạt lanh', 'Súp gà hầm gừng hành', 'Rau xanh đậm, quả mọng'],
      foodsToAvoid: ['Thực phẩm sinh hơi nhiều (bắp cải sống, nước ngọt có ga gây chèn ép cơ hoành)', 'Thức ăn giàu Muối (gây ứ nước)', 'Thức ăn nhiều chất bảo quản Sulfite (dễ kích ứng cơn hen)'],
      drugNutrientInteractions: [
        'Corticoid đường uống hoặc xịt liều cao kéo dài gây nguy cơ loãng xương và tăng đường huyết; cần bổ sung Canxi D3 và theo dõi HbA1c.'
      ]
    },
    redFlags: [
      'Khó thở dữ dội, nói không thành câu, co kéo cơ hô hấp phụ',
      'Tím tái môi và đầu ngón tay ngón chân (SpO2 < 88%)',
      'Lơ mơ, ngủ gà do tăng CO2 máu (Cấp cứu hô hấp khẩn cấp)'
    ],
    tcmSyndromeCorrespondence: 'Khái Thấu / Suyễn Chứng (Phế Khí Hư / Thận Bất Nạp Khí / Đàm Ứ Hóa Nhiệt)'
  },

  // 14. Gan Nhiễm Mỡ & Viêm Gan
  {
    id: 'fatty-liver-hepatitis',
    nameVi: 'Bệnh Gan Nhiễm Mỡ (MASLD/NAFLD) & Viêm Gan Mạn Tính',
    nameEn: 'Metabolic Dysfunction-Associated Steatotic Liver Disease & Hepatitis',
    icd10: 'K76.0 / K73.9',
    medicalRoots: [
      { term: 'Hepat/o', etymology: 'Gốc Hy Lạp: Gan (Liver)', meaning: 'Nhu mô gan' },
      { term: 'Steat/o', etymology: 'Gốc từ: Mỡ, mỡ đọng', meaning: 'Tích tụ mỡ triglyceride' },
      { term: '-itis', etymology: 'Hậu tố: Viêm', meaning: 'Tình trạng hoại tử tế bào gan' }
    ],
    guytonPhysiology: {
      system: 'Hệ Chuyển Hóa Gan & Khử Độc (Hepatic Metabolism & Clearance)',
      homeostasisDisruption: 'Tích tụ Triglyceride quá 5% trọng lượng gan do kháng insulin, tăng lipolysis tại mô mỡ và giảm oxy hóa axit béo tại ty thể tế bào gan (Hepatocyte).',
      cellularHemodynamicMechanism: 'Mỡ tích tụ gây stress oxy hóa tại ty thể và lưới nội chất, giải phóng ROS (Reactive Oxygen Species). Kích thích tế bào Kupffer và tế bào Tinh thể Stellate tăng sản xuất Collagen gây xơ hóa nhu mô gan tiến triển thành xơ gan (Cirrhosis).',
      clinicalParameters: [
        { name: 'Men gan AST & ALT', normalRange: '10 - 40 U/L', criticalWarning: '> 3-5 lần bình thường (Hoại tử tế bào gan tiến triển)' },
        { name: 'Chỉ số xơ hóa gan FibroScan (CAP / E)', normalRange: 'CAP < 248 dB/m', criticalWarning: 'E > 11.5 kPa (Xơ gan F3-F4)' }
      ]
    },
    essentialsOfNutrition: {
      keyNutrients: ['Silymarin (từ Cây Kế Sữa Milk Thistle)', 'Choline', 'L-Glutathione', 'Vitamin E (dAlpha-Tocopherol)', 'Silybin'],
      foodsToPrioritize: ['Ati-sô, nhân trần, diệp hạ châu hãm nước', 'Trà xanh (giàu EGCG chống oxy hóa)', 'Rau cải đắng, rau má', 'Cá biển béo, hạt hạnh nhân'],
      foodsToAvoid: ['Tuyệt đối kiêng Rượu, bia, cồn', 'Đường Fructose công nghiệp (nước ngọt, siro)', 'Mỡ động vật, nội tạng, đồ chiên đi chiên lại', 'Thực phẩm bị nấm mốc (chứa Aflatoxin gây ung thư gan)'],
      drugNutrientInteractions: [
        'Tránh lạm dụng Paracetamol / Acetaminophen > 2g/ngày ở người có bệnh gan vì dễ gây hoại tử tế bào gan cấp tính.'
      ]
    },
    redFlags: [
      'Vàng mắt, vàng da sậm màu kèm nước tiểu vàng như nước vối',
      'Bụng trướng to chứa dịch (Cổ trướng / Ascites) kèm phù hai chân',
      'Nôn ra máu tươi do vỡ tĩnh mạch thực quản (Cấp cứu xơ gan)'
    ],
    tcmSyndromeCorrespondence: 'Can Đởm Thấp Nhiệt / Can Khí Uất Trệ / Tỳ Hư Đàm Thấp'
  },

  // 15. Hội Chứng Ruột Kích Thích (IBS)
  {
    id: 'ibs-irritable-bowel',
    nameVi: 'Hội Chứng Ruột Kích Thích (IBS) & Co Thắt Đại Tràng',
    nameEn: 'Irritable Bowel Syndrome (IBS)',
    icd10: 'K58.9',
    medicalRoots: [
      { term: 'Enter/o', etymology: 'Gốc Hy Lạp: Ruột (Intestine)', meaning: 'Ruột non, ruột già' },
      { term: 'Col/o', etymology: 'Gốc từ: Đại tràng (Colon)', meaning: 'Ruột già' },
      { term: '-spasm', etymology: 'Hậu tố: Co thắt bất thường', meaning: 'Co bóp đau quặn' }
    ],
    guytonPhysiology: {
      system: 'Trục Não - Ruột & Nhu Động Ruột (Brain-Gut Axis & Enteric Nervous System)',
      homeostasisDisruption: 'Rối loạn tương tác giữa hệ thần kinh trung ương và hệ thần kinh ruột (ENS); tăng cảm giác tạng (Visceral hypersensitivity) và tăng nhu động ruột do căng thẳng thần kinh.',
      cellularHemodynamicMechanism: 'Mất cân bằng các chất dẫn truyền thần kinh tại ruột (90% Serotonin cơ thể sản xuất tại ruột). Sự biến đổi vi quầng ruột (Microbiota dysbiosis) gây viêm niêm mạc mức độ tế bào, làm thay đổi tần số co bóp cơ trơn đại tràng sinh đau bụng quặn, trướng hơi và rối loạn phân (tiêu chảy / táo bón thay đổi).',
      clinicalParameters: [
        { name: 'Calprotectin trong phân', normalRange: '< 50 ug/g', criticalWarning: '> 200 ug/g (Cảnh báo bệnh viêm ruột IBD như Crohn / Viêm loét đại tràng)' },
        { name: 'Nội soi đại tràng', normalRange: 'Niêm mạc láng mịn bình thường', criticalWarning: 'Có loét, polyp hoặc u gồ (Không phải IBS lành tính)' }
      ]
    },
    essentialsOfNutrition: {
      keyNutrients: ['Probiotics (Lactobacillus & Bifidobacterium)', 'Tinh dầu Bạc Hà (Peppermint Oil enteric-coated)', 'Chất xơ Psyllium Husk', 'L-Glutamine'],
      foodsToPrioritize: ['Chế độ ăn Low-FODMAP (ít đường lên men)', 'Cháo gạo lứt, khoai tây luộc', 'Thịt gà hấp, cá hấp', 'Nước gừng ấm, trà hoa cúc', 'Sữa chua men sống Probiotics'],
      foodsToAvoid: ['Sữa bò giàu Lactose', 'Hành tây, tỏi sống, súp lơ (nhóm FODMAP cao sinh hơi)', 'Thức ăn cay nóng, chiên rán nhiều mỡ', 'Rượu bia, cà phê, đồ uống có ga'],
      drugNutrientInteractions: [
        'Thuốc chống co thắt cơ trơn (Mebeverine, Trimebutine) nên uống trước bữa ăn 15-30 phút để đạt hiệu quả điều hòa nhu động tốt nhất.'
      ]
    },
    redFlags: [
      'Sút cân nhanh không rõ nguyên nhân (> 5 kg trong 1-2 tháng)',
      'Đi ngoài phân có máu tươi hoặc phân đen bẩn',
      'Đau bụng dữ dội tỉnh giấc ban đêm hoặc sốt dai dẳng'
    ],
    tcmSyndromeCorrespondence: 'Tiêu Sưu / Phúc Thống (Can Mộc Khắc Tỳ Thổ / Tỳ Vị Hư Hàn / Tỳ Hư Thấp Trệ)'
  },

  // 16. Thiếu Máu Do Thiếu Sắt
  {
    id: 'iron-deficiency-anemia',
    nameVi: 'Thiếu Máu Do Thiếu Sắt & Dinh Dưỡng',
    nameEn: 'Iron Deficiency Anemia',
    icd10: 'D50.9',
    medicalRoots: [
      { term: 'An-', etymology: 'Tiền tố: Mất, thiếu hụt', meaning: 'Không có, suy giảm' },
      { term: '-emia', etymology: 'Gốc Hy Lạp: Haema (Máu)', meaning: 'Tình trạng dòng máu' },
      { term: 'Hemo-', etymology: 'Gốc từ: Huyết sắc tố', meaning: 'Sắc tố vận chuyển oxy' }
    ],
    guytonPhysiology: {
      system: 'Hệ Tạo Máu & Vận Chuyển Oxy (Hematopoiesis & Oxygen Transport)',
      homeostasisDisruption: 'Cạn kiệt kho dự trữ sắt (Ferritin) do mất máu mạn tính (rong kinh, loét tiêu hóa) hoặc cung cấp dinh dưỡng không đủ.',
      cellularHemodynamicMechanism: 'Sắt là nhân nhân Heme của phân tử Hemoglobin trong hồng cầu. Thiếu sắt khiến tủy xương không tổng hợp đủ Hemoglobin, tế bào hồng cầu sinh ra bị nhỏ kích thước (Microcytic) và nhạt màu (Hypochromic), giảm khả năng vận chuyển O2 tới các mô tổ chức gây thiếu máu toàn thân.',
      clinicalParameters: [
        { name: 'Nồng độ Hemoglobin (Hb)', normalRange: 'Nam: 13-17 g/dL; Nữ: 12-15 g/dL', criticalWarning: '< 8.0 g/dL (Thiếu máu nặng cần truyền máu hoặc sắt tĩnh mạch)' },
        { name: 'Ferritin huyết thanh (Kho trữ sắt)', normalRange: '30 - 200 ng/mL', criticalWarning: '< 15 ng/mL (Cạn kiệt hoàn toàn dự trữ sắt)' }
      ]
    },
    essentialsOfNutrition: {
      keyNutrients: ['Sắt Hữu Cơ (Iron Bisglycinate / Fumarate)', 'Vitamin C (tăng hấp thu sắt)', 'Axit Folic (Vitamin B9)', 'Vitamin B12 (Cobalamin)', 'Đồng (Copper)'],
      foodsToPrioritize: ['Thịt bò nạc, gan lợn (sắt Heme hấp thu cao)', 'Huyết lợn, lòng đỏ trứng', 'Rau dền đỏ, cải song, đậu đen', 'Cam, bưởi, ổi tươi giàu Vitamin C uống cùng thuốc sắt'],
      foodsToAvoid: ['Trà mạn đặc, cà phê (chứa Tannin ức chế hấp thu sắt tới 70%)', 'Sữa tươi và viên bổ sung Canxi (uống cùng lúc với sắt sẽ cạnh tranh hấp thu)'],
      drugNutrientInteractions: [
        'Viên Sắt bắt buộc phải uống cách viên Canxi, sữa và trà/cà phê ít nhất 2 giờ để tránh kết tủa không hấp thu được.'
      ]
    },
    redFlags: [
      'Hoa mắt chóng mặt sụp đổ, ngất xỉu khi thay đổi tư thế',
      'Đau ngực, khó thở khi gắng sức nhẹ (Thiếu máu cơ tim do thiếu máu cấp)',
      'Đi ngoài phân đen bóng như nhựa đường (Nghi ngờ xuất huyết rỉ rả đường tiêu hóa)'
    ],
    tcmSyndromeCorrespondence: 'Huyết Hư / Tâm Tỳ Lưỡng Hư (Khí Huyết Lưỡng Hư / Tỳ Vị Hư Nhược)'
  }
];
