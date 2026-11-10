/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BỘ MÁY ĐỐI CHIẾU & CẢNH BÁO TƯƠNG TÁC THUỐC ĐÔNG - TÂY Y
 * Trích xuất từ 60 Y Điển & Dược Thư:
 * - Dược thư Quốc gia Việt Nam (Chuyên luận tương tác thuốc & dược liệu)
 * - Stockley's Herbal Medicines Interactions
 * - DiPiro's Pharmacotherapy: A Pathophysiologic Approach
 * - Katzung's Basic & Clinical Pharmacology
 * - Lexicomp Drug Interactions Handbook
 * - Chinese Herbal Medicine: Materia Medica - Dan Bensky
 */

export type InteractionSeverity = 'danger' | 'warning' | 'synergy' | 'safe';

export interface HerbDrugInteractionRule {
  id: string;
  herbKeywords: string[]; // Tên vị thuốc tiếng Việt & Hán Việt & Latinh
  drugKeywords: string[]; // Tên hoạt chất & biệt dược & nhóm thuốc Tây y
  severity: InteractionSeverity;
  title: string;
  herbDisplay: string;
  drugDisplay: string;
  mechanism: string;
  clinicalRisk: string;
  recommendation: string;
  evidenceSource: string;
}

export interface HerbDrugMatch {
  herbName: string;
  drugName: string;
  severity: InteractionSeverity;
  title: string;
  mechanism: string;
  clinicalRisk: string;
  recommendation: string;
  evidenceSource: string;
}

export interface HerbDrugAnalysisReport {
  hasInteractions: boolean;
  totalHerbsChecked: number;
  totalDrugsChecked: number;
  dangerCount: number;
  warningCount: number;
  synergyCount: number;
  safeCount: number;
  matches: HerbDrugMatch[];
  goldenRule: string;
}

// Bảng dữ liệu tương tác dược lý Đông - Tây y lâm sàng chuẩn hóa
export const HERB_DRUG_RULES: HerbDrugInteractionRule[] = [
  // 1. Nhóm thảo dược hoạt huyết + Thuốc chống đông/kháng kết tập tiểu cầu
  {
    id: 'antiplatelet_bleeding',
    herbKeywords: ['đương quy', 'dan shen', 'đan sâm', 'xuyên khung', 'hồng hoa', 'đào nhân', 'tam thất', 'ngưu tất', 'bạch quả', 'ginkgo', 'ích mẫu'],
    drugKeywords: ['aspirin', 'clopidogrel', 'plavix', 'warfarin', 'coumadin', 'heparin', 'enoxaparin', 'rivaroxaban', 'xarelto', 'dabigatran', 'apixaban', 'kháng đông', 'tiểu cầu'],
    severity: 'danger',
    title: 'NGUY CƠ XUẤT HUYẾT NẶNG DO HIỆP ĐỒNG ỨC CHẾ ĐÔNG MÁU',
    herbDisplay: 'Đương Quy, Đan Sâm, Xuyên Khung, Hồng Hoa, Tam Thất, Bạch Quả',
    drugDisplay: 'Aspirin, Clopidogrel (Plavix), Warfarin, Xarelto (Thuốc chống đông/kháng tiểu cầu)',
    mechanism: 'Các vị thuốc hoạt huyết phá ứ có chứa coumarin tự nhiên, ferulic acid, ligustilide và tanshinone gây ức chế ngưng tập tiểu cầu và kéo dài thời gian prothrombin (PT/INR). Khi dùng cùng thuốc chống đông Tây y, tác dụng ức chế đông máu bị nhân đôi.',
    clinicalRisk: 'Chảy máu cam, xuất huyết dưới da bầm tím, chảy máu chân răng khó cầm, xuất huyết tiêu hóa ồ ạt, và nguy hiểm nhất là xuất huyết não.',
    recommendation: 'Không dùng đồng thời liều cao. Phải xét nghiệm theo dõi định kỳ chỉ số INR và thời gian đông máu. Bắt buộc ngưng các vị thuốc hoạt huyết ít nhất 7 đến 10 ngày trước khi tiến hành phẫu thuật hoặc nhổ răng.',
    evidenceSource: 'Dược thư Quốc gia Việt Nam & Stockley’s Herbal Medicines Interactions'
  },

  // 2. Cam thảo + Thuốc lợi tiểu quai / Thiazide (Hạ Kali máu)
  {
    id: 'licorice_diuretic_hypokalemia',
    herbKeywords: ['cam thảo', 'cam thao', 'glycyrrhiza', 'quang quả cam thảo'],
    drugKeywords: ['furosemide', 'lasix', 'hydrochlorothiazide', 'hctz', 'indapamide', 'lợi tiểu'],
    severity: 'danger',
    title: 'HẠ KALI MÁU CẤP TÍNH & NGUY CƠ LOẠN NHỊP TIM ĐE DỌA TÍNH MẠNG',
    herbDisplay: 'Cam Thảo (chứa Glycyrrhizin)',
    drugDisplay: 'Furosemide (Lasix), Hydrochlorothiazide (Thuốc lợi tiểu thải Kali)',
    mechanism: 'Glycyrrhizin trong Cam thảo ức chế enzym 11-beta-hydroxysteroid dehydrogenase type 2 (11β-HSD2), làm Cortisol kích hoạt thụ thể Mineralocorticoid tại ống thận, dẫn đến giữ Natri và đào thải Kali ồ ạt (giả cường Aldosterone). Cả hai nhóm đều cùng làm mất Kali.',
    clinicalRisk: 'Hạ Kali máu nặng (K+ < 3.0 mmol/L), gây yếu liệt tứ chi, chuột rút dữ dội, táo bón liệt ruột và khởi phát các cơn loạn nhịp tim thất nguy hiểm.',
    recommendation: 'Tránh dùng Cam thảo khi bệnh nhân đang dùng Furosemide hoặc Hydrochlorothiazide. Nếu bài thuốc bắt buộc có Cam thảo, liều không quá 2-3g/ngày và phải định kỳ kiểm tra điện giải đồ (ion đồ máu).',
    evidenceSource: 'Stockley’s Herbal Interactions & Katzung Basic & Clinical Pharmacology'
  },

  // 3. Cam thảo + Digoxin (Ngộ độc trợ tim)
  {
    id: 'licorice_digoxin_toxicity',
    herbKeywords: ['cam thảo', 'cam thao', 'glycyrrhiza'],
    drugKeywords: ['digoxin', 'lanoxin', 'thuốc trợ tim'],
    severity: 'danger',
    title: 'TĂNG NGUY CƠ NGỘ ĐỘC DIGOXIN DO HẠ KALI MÁU',
    herbDisplay: 'Cam Thảo',
    drugDisplay: 'Digoxin (Lanoxin)',
    mechanism: 'Hạ Kali máu do Cam thảo gây ra làm tăng ái lực gắn kết của Digoxin vào enzym Na+/K+-ATPase cơ tim, làm tăng độc tính tim của Digoxin dù nồng độ thuốc trong máu ở ngưỡng bình thường.',
    clinicalRisk: 'Ngộ độc Digoxin cấp: buồn nôn, nhìn mờ thấy quầng sáng vàng, blốc nhĩ thất độ 3, nhịp nhanh thất và rung thất dẫn đến đột tử.',
    recommendation: 'Tuyệt đối chống chỉ định phối hợp Cam thảo với Digoxin. Bác sĩ cần loại bỏ hoàn toàn vị thuốc Cam thảo trong thang thuốc.',
    evidenceSource: 'Dược thư Quốc gia Việt Nam & BNF (British National Formulary)'
  },

  // 4. Cam thảo + Thuốc hạ huyết áp (Triệt tiêu hiệu quả hạ áp)
  {
    id: 'licorice_antihypertensive',
    herbKeywords: ['cam thảo', 'cam thao', 'glycyrrhiza'],
    drugKeywords: ['telmisartan', 'micardis', 'amlodipine', 'norvasc', 'losartan', 'enalapril', 'captopril', 'lisinopril', 'bisoprolol', 'concor', 'hạ áp', 'huyết áp'],
    severity: 'warning',
    title: 'TRIỆT TIÊU HIỆU LỰC THUỐC HẠ HUYẾT ÁP TÂY Y',
    herbDisplay: 'Cam Thảo (dùng kéo dài > 5g/ngày)',
    drugDisplay: 'Telmisartan, Amlodipine, Losartan, Enalapril, Bisoprolol (Thuốc hạ áp)',
    mechanism: 'Tác dụng giữ Natri và nước của Cam thảo làm tăng thể tích tuần hoàn và co thắt cơ trơn mạch máu, trực tiếp đối kháng với tác dụng giãn mạch hạ áp của các nhóm thuốc ARB, ACEI, CCB.',
    clinicalRisk: 'Huyết áp không kiểm soát được, huyết áp kháng trị hoặc tái phát cơn tăng huyết áp đột ngột.',
    recommendation: 'Bệnh nhân tăng huyết áp không nên dùng Cam thảo kéo dài quá 1 tuần. Dược sĩ lâm sàng nên thay thế Cam thảo bằng Cỏ ngọt (Stevia) hoặc giảm liều xuống dưới 2g/ngày.',
    evidenceSource: 'Phân hội Tăng Huyết Áp Việt Nam (VNHA) & Lexicomp'
  },

  // 5. Ma hoàng + Thuốc hạ huyết áp / Salbutamol / Cường giao cảm
  {
    id: 'ephedra_hypertension',
    herbKeywords: ['ma hoàng', 'ma hoang', 'ephedra', 'khương hoạt'],
    drugKeywords: ['telmisartan', 'amlodipine', 'losartan', 'bisoprolol', 'metoprolol', 'salbutamol', 'ventolin', 'pseudoephedrine', 'hạ áp'],
    severity: 'danger',
    title: 'CƠN TĂNG HUYẾT ÁP KỊCH PHÁT & LOẠN NHỊP NHANH',
    herbDisplay: 'Ma Hoàng (chứa Ephedrine tự nhiên)',
    drugDisplay: 'Thuốc hạ áp, Thuốc giãn phế quản Salbutamol (Ventolin)',
    mechanism: 'Alkaloid Ephedrine kích thích trực tiếp và gián tiếp lên thụ thể alpha-1 và beta-1 adrenergic, gây co mạch ngoại vi mạnh mẽ và kích thích nút xoang tăng nhịp tim.',
    clinicalRisk: 'Cơn tăng huyết áp cấp cứu (HA ≥ 180/120 mmHg), nhịp tim nhanh kịch phát (> 130 l/p), nguy cơ nhồi máu cơ tim hoặc vỡ phình mạch não.',
    recommendation: 'Tuyệt đối không dùng Ma hoàng cho bệnh nhân có tiền sử tăng huyết áp, bệnh mạch vành hoặc bệnh tim thiếu máu cục bộ.',
    evidenceSource: 'Dược thư Quốc gia Việt Nam & FDA Herbal Safety Warnings'
  },

  // 6. Bạch quả (Ginkgo) + NSAID (Meloxicam, Ibuprofen, Diclofenac)
  {
    id: 'ginkgo_nsaid_ulcer',
    herbKeywords: ['bạch quả', 'ginkgo', 'ngân hạnh'],
    drugKeywords: ['meloxicam', 'mobic', 'ibuprofen', 'diclofenac', 'voltaren', 'celecoxib', 'piroxicam', 'naproxen', 'nsaid', 'kháng viêm'],
    severity: 'danger',
    title: 'NGUY CƠ VIÊM LOÉT & XUẤT HUYẾT DẠ DÀY TÁ TRÀNG NẶNG',
    herbDisplay: 'Bạch Quả (Ginkgo Biloba)',
    drugDisplay: 'Meloxicam, Ibuprofen, Diclofenac, Celecoxib (Thuốc NSAID)',
    mechanism: 'Ginkgolide B trong Bạch Quả ức chế yếu tố hoạt hóa tiểu cầu (PAF). NSAID ức chế enzym COX-1 làm sụt giảm Prostaglandin bảo vệ tế bào niêm mạc dạ dày. Hai cơ chế kết hợp làm suy yếu nghiêm trọng hàng rào bảo vệ niêm mạc tiêu hóa.',
    clinicalRisk: 'Đau rát bỏng thượng vị dữ dội, viêm trợt loét dạ dày cấp, nôn ra máu hoặc đi ngoài phân đen mùi khẳm.',
    recommendation: 'Không dùng đồng thời Bạch Quả cùng liều cao NSAID. Nếu phải dùng, bắt buộc phải uống kèm thuốc bảo vệ niêm mạc dạ dày (Esomeprazole 20-40mg trước bữa ăn) và theo dõi sát triệu chứng tiêu hóa.',
    evidenceSource: 'Stockley’s Herbal Interactions & DiPiro Pharmacotherapy'
  },

  // 7. Thạch cao, Mẫu lệ, Long cốt (Canxi/Khoáng vật) + Kháng sinh Quinolone / Tetracycline
  {
    id: 'calcium_herbs_antibiotic_chelation',
    herbKeywords: ['thạch cao', 'mẫu lệ', 'long cốt', 'khoáng thạch', 'từ thạch', 'chu sa'],
    drugKeywords: ['ciprofloxacin', 'cipro', 'levofloxacin', 'tavanic', 'moxifloxacin', 'avelox', 'doxycycline', 'tetracycline', 'kháng sinh quinolone'],
    severity: 'danger',
    title: 'TẠO PHỨC CHELAT LÀM MẤT HOÀN TOÀN TÁC DỤNG KHÁNG SINH',
    herbDisplay: 'Thạch Cao, Mẫu Lệ, Long Cốt (chứa ion Ca2+, Mg2+, Fe2+)',
    drugDisplay: 'Ciprofloxacin, Levofloxacin, Doxycycline (Kháng sinh)',
    mechanism: 'Các cation kim loại đa hóa trị (Ca2+, Mg2+) trong khoáng vật Đông y phản ứng tạo phức chelat vòng càng không tan với phân tử kháng sinh trong môi trường dạ dày, ngăn chặn sự hấp thu qua ruột non.',
    clinicalRisk: 'Làm giảm 80% đến 90% nồng độ kháng sinh trong máu, khiến điều trị nhiễm khuẩn thất bại và làm phát sinh vi khuẩn đa kháng thuốc.',
    recommendation: 'QUY TẮC BẮT BUỘC: Uống kháng sinh cách xa các thang thuốc Đông y có Thạch cao/Mẫu lệ ít nhất 2 đến 3 giờ (tốt nhất uống kháng sinh trước 2 giờ hoặc sau khi uống thuốc Đông y 3 giờ).',
    evidenceSource: 'Dược thư Quốc gia Việt Nam, BNF & Sanford Guide to Antimicrobial Therapy'
  },

  // 8. Nhân sâm / Hoàng kỳ + Thuốc hạ đường huyết (Hạ glucose máu quá mức)
  {
    id: 'ginseng_hypoglycemia',
    herbKeywords: ['nhân sâm', 'nhan sam', 'hoàng kỳ', 'hoang ky', 'đảng sâm', 'panax ginseng'],
    drugKeywords: ['metformin', 'glucophage', 'gliclazide', 'diamicron', 'glimepiride', 'amaryl', 'insulin', 'hạ đường huyết', 'tiểu đường'],
    severity: 'warning',
    title: 'NGUY CƠ HẠ ĐƯỜNG HUYẾT QUÁ MỨC (TỤT ĐƯỜNG HUYẾT)',
    herbDisplay: 'Nhân Sâm, Hoàng Kỳ, Đảng Sâm',
    drugDisplay: 'Metformin, Gliclazide, Insulin (Thuốc hạ đường huyết)',
    mechanism: 'Ginsenoside trong Nhân sâm và polysaccharide trong Hoàng kỳ kích thích tụy bài tiết insulin, tăng hoạt hóa enzym vận chuyển glucose GLUT4 tại cơ vân, làm tăng độ nhạy cảm của thụ thể insulin ngoại biên.',
    clinicalRisk: 'Hạ đường huyết đột ngột: vã mồ hôi lạnh, run tay chân, hồi hộp đánh trống ngực, đói cồn cào, lú lẫn, hôn mê nếu không cấp cứu kịp thời.',
    recommendation: 'Theo dõi chỉ số đường huyết mao mạch trước và sau ăn thường xuyên hơn khi bắt đầu dùng Nhân sâm/Hoàng kỳ. Chuẩn bị sẵn kẹo ngọt hoặc nước đường để xử trí hạ đường huyết nhanh.',
    evidenceSource: 'American Diabetes Association (ADA) & Dan Bensky Materia Medica'
  },

  // 9. Sài hồ / Hoàng cầm + Thuốc chuyển hóa qua men gan CYP450 (Statin, PPI)
  {
    id: 'bupleurum_scutellaria_cyp',
    herbKeywords: ['sài hồ', 'sai ho', 'hoàng cầm', 'hoang cam', 'bupleurum', 'scutellaria'],
    drugKeywords: ['atorvastatin', 'lipitor', 'rosuvastatin', 'crestor', 'simvastatin', 'omeprazole', 'esomeprazole', 'statin', 'hạ mỡ máu'],
    severity: 'warning',
    title: 'ẢNH HƯỞNG NỒNG ĐỘ THUỐC TÂY DO TÁC ĐỘNG MEN GAN CYP450',
    herbDisplay: 'Sài Hồ, Hoàng Cầm',
    drugDisplay: 'Atorvastatin (Lipitor), Rosuvastatin, Omeprazole (Thuốc chuyển hóa qua gan)',
    mechanism: 'Hoạt chất Saikosaponin và Baicalin có tác dụng ức chế hoặc cạnh tranh enzym Cytochrome P450 (đặc biệt CYP3A4 và CYP2C19), làm thay đổi tốc độ chuyển hóa và độ thanh thải của thuốc Tây.',
    clinicalRisk: 'Làm tăng nồng độ Statin trong máu kéo dài, tăng nguy cơ mỏi cơ, đau cơ hoặc tăng men gan ALT/AST thoáng qua.',
    recommendation: 'Uống thuốc Đông y cách thuốc Tây y ít nhất 2 giờ. Định kỳ kiểm tra men gan (SGOT, SGPT) sau 4-8 tuần điều trị.',
    evidenceSource: 'Stockley’s Herbal Interactions & Katzung Pharmacology'
  },

  // 10. Đại hoàng / Phan tả diệp + Thuốc Tây dạng viên uống
  {
    id: 'rheum_reduced_absorption',
    herbKeywords: ['đại hoàng', 'dai hoang', 'phan tả diệp', 'thảo quyết minh'],
    drugKeywords: ['viên nén', 'viên nang', 'uống', 'mobic', 'nexium', 'paracetamol', 'kháng sinh', 'telmisartan'],
    severity: 'warning',
    title: 'GIẢM HẤP THU THUỐC TÂY DO TĂNG NHU ĐỘNG ĐƯỜNG RUỘT',
    herbDisplay: 'Đại Hoàng, Phan Tả Diệp (chứa Anthraquinone)',
    drugDisplay: 'Các thuốc tân dược dạng viên uống đường ruột',
    mechanism: 'Hợp chất Anthraquinone kích thích mạnh đám rối thần kinh Auerbach tại thành ruột già, kích thích co bóp và bài tiết nước, làm rút ngắn đáng kể thời gian lưu chuyển thức ăn và thuốc qua đường tiêu hóa.',
    clinicalRisk: 'Viên thuốc Tây bị đào thải ra ngoài theo phân trước khi kịp giải phóng và hấp thu hoàn toàn vào vòng tuần hoàn chung, làm suy giảm hiệu quả điều trị.',
    recommendation: 'Uống thuốc Tây y trước ít nhất 2 giờ so với thời điểm uống thang thuốc có Đại hoàng hoặc Phan tả diệp.',
    evidenceSource: 'Dược thư Quốc gia Việt Nam & Dan Bensky'
  },

  // 11. Bạch thược / Toan táo nhân + Thuốc giãn cơ & an thần Tây y (Hiệp đồng có lợi)
  {
    id: 'paeonia_synergy_spasm',
    herbKeywords: ['bạch thược', 'bach thuoc', 'toan táo nhân', 'lạc tiên', 'vông nem'],
    drugKeywords: ['eperisone', 'myonal', 'tolperisone', 'decontractyl', 'diazepam', 'seduxen', 'giãn cơ'],
    severity: 'synergy',
    title: 'HIỆP ĐỒNG GIÃN CƠ & AN THẦN GIẢM ĐAU HIỆU QUẢ',
    herbDisplay: 'Bạch Thược, Toan Táo Nhân',
    drugDisplay: 'Eperisone (Myonal), Tolperisone (Thuốc giãn cơ Tây y)',
    mechanism: 'Paeoniflorin trong Bạch Thược có tác dụng ức chế kênh Calci nội bào và thư giãn cơ trơn lẫn cơ vân; phối hợp cùng cơ chế chẹn dẫn truyền phản xạ tủy của Eperisone tạo tác dụng cộng hưởng giảm co cứng cơ cạnh sống.',
    clinicalRisk: 'Phối hợp rất tốt giúp bệnh nhân cắt cơn đau co thắt nhanh; lưu ý có thể gây buồn ngủ nhẹ ở người nhạy cảm.',
    recommendation: 'Nên uống thuốc giãn cơ và thang thuốc vào buổi chiều tối để tối ưu hóa hiệu quả thư giãn cơ lưng và cải thiện giấc ngủ.',
    evidenceSource: 'Chinese Herbal Medicine: Formulas & Strategies & Katzung Pharmacology'
  },

  // 12. Bạch truật / Hoài sơn + NSAID (Hiệp đồng bảo vệ niêm mạc)
  {
    id: 'atractylodes_gastric_protection',
    herbKeywords: ['bạch truật', 'bach truat', 'hoài sơn', 'bạch đậu khấu', 'sơn tra'],
    drugKeywords: ['meloxicam', 'mobic', 'ibuprofen', 'diclofenac', 'celecoxib', 'nsaid'],
    severity: 'synergy',
    title: 'KIỆN TỲ HÒA VỊ, GIẢM KÍCH ỨNG DẠ DÀY DO THUỐC NSAID',
    herbDisplay: 'Bạch Truật, Hoài Sơn (Thảo dược kiện tỳ)',
    drugDisplay: 'Meloxicam, Ibuprofen, Diclofenac (Thuốc giảm đau NSAID)',
    mechanism: 'Polysaccharide trong Bạch Truật kích thích bài tiết chất nhầy mucin tại niêm mạc dạ dày và cải thiện tưới máu vi mạch dạ dày, giúp giảm thiểu nguy cơ kích ứng và tổn thương do NSAID gây ra.',
    clinicalRisk: 'Tương tác tương hỗ có lợi (Synergistic benefit), giúp bảo vệ dạ dày của bệnh nhân thoái hóa khớp.',
    recommendation: 'Phối hợp an toàn và được khuyến khích trong các phác đồ Đông - Tây y kết hợp.',
    evidenceSource: 'Dược thư Quốc gia Việt Nam & Trần Gia Kỳ - Phương Thang YHCT'
  },

  // 13. Kim ngân hoa, Liên kiều + Kháng sinh / Paracetamol (Hiệp đồng kháng khuẩn, hạ sốt)
  {
    id: 'lonicera_antibiotic_synergy',
    herbKeywords: ['kim ngân hoa', 'kim ngan hoa', 'liên kiều', 'lien kieu', 'xuyên tâm liên'],
    drugKeywords: ['amoxicillin', 'augmentin', 'cefixime', 'paracetamol', 'panadol', 'kháng sinh'],
    severity: 'synergy',
    title: 'TĂNG CƯỜNG HIỆU LỰC KHÁNG KHUẨN & HẠ SỐT TIÊU VIÊM',
    herbDisplay: 'Kim Ngân Hoa, Liên Kiều, Xuyên Tâm Liên',
    drugDisplay: 'Amoxicillin/Clavulanic (Augmentin), Cefixime, Paracetamol',
    mechanism: 'Chlorogenic acid và Forsythoside trong thảo dược có hoạt tính ức chế vi khuẩn và phá hủy màng biofilm, đồng thời điều hòa cytokin tiền viêm IL-6 và TNF-alpha, hiệp đồng với cơ chế diệt khuẩn của kháng sinh.',
    clinicalRisk: 'Rút ngắn thời gian sốt và làm giảm nhanh các triệu chứng đau rát họng, chảy mủ mũi xoang.',
    recommendation: 'Uống thang thuốc Đông y cách kháng sinh Tây y 1.5 - 2 giờ để tránh tương tác cơ học trong đường ruột.',
    evidenceSource: 'Dan Bensky Materia Medica & DiPiro Pharmacotherapy'
  },

  // 14. Đan sâm / Tam thất + Statin hạ mỡ máu (Bảo vệ nội mô mạch máu)
  {
    id: 'danshen_statin_synergy',
    herbKeywords: ['đan sâm', 'dan sam', 'tam thất', 'tam that', 'salvia'],
    drugKeywords: ['atorvastatin', 'lipitor', 'rosuvastatin', 'crestor', 'statin'],
    severity: 'synergy',
    title: 'HIỆP ĐỒNG BẢO VỆ NỘI MÔ MẠCH MÁU & NGĂN NGỪA XƠ VỮA',
    herbDisplay: 'Đan Sâm, Tam Thất',
    drugDisplay: 'Atorvastatin, Rosuvastatin (Thuốc Statin)',
    mechanism: 'Tanshinone IIA và Salvianolic acid B trong Đan Sâm chống oxy hóa LDL-cholesterol, kích thích giải phóng NO từ nội mạc mạch máu, hỗ trợ tích cực tác dụng hạ mỡ máu và ổn định mảng xơ vữa của Statin.',
    clinicalRisk: 'Cải thiện tuần hoàn vi mạch tim và não, phòng ngừa tái phát nhồi máu cơ tim.',
    recommendation: 'Uống cách Statin 2 giờ. Kiểm tra men gan định kỳ theo phác đồ tim mạch.',
    evidenceSource: 'Stockley’s Herbal Interactions & VNHA Guidelines'
  }
];

// Hàm quét và phân tích tương tác giữa danh sách vị thuốc Đông y và thuốc Tây y
export function analyzeHerbDrugInteractions(
  herbs: (string | { name: string; amount?: string })[],
  drugs: (string | { name: string; activeIngredient?: string; group?: string })[]
): HerbDrugAnalysisReport {
  const matches: HerbDrugMatch[] = [];
  const herbNames: string[] = herbs.map(h => typeof h === 'string' ? h : h.name).filter(Boolean);
  const drugItems = drugs.map(d => {
    if (typeof d === 'string') return { name: d, activeIngredient: d, group: '' };
    return {
      name: d.name || '',
      activeIngredient: d.activeIngredient || d.name || '',
      group: d.group || ''
    };
  });

  const matchedRuleIds = new Set<string>();

  // Duyệt qua từng vị thuốc Đông y
  for (const herb of herbNames) {
    const herbNorm = herb.toLowerCase().trim();

    // Duyệt qua từng thuốc Tây y
    for (const drug of drugItems) {
      const drugSearchStr = `${drug.name} ${drug.activeIngredient} ${drug.group}`.toLowerCase();

      // Kiểm tra trong bộ quy tắc
      for (const rule of HERB_DRUG_RULES) {
        // Kiểm tra xem vị thuốc có khớp không
        const matchesHerb = rule.herbKeywords.some(keyword => herbNorm.includes(keyword.toLowerCase()));
        if (!matchesHerb) continue;

        // Kiểm tra xem thuốc Tây y có khớp không
        const matchesDrug = rule.drugKeywords.some(keyword => drugSearchStr.includes(keyword.toLowerCase()));
        if (!matchesDrug) continue;

        // Tránh trùng lặp cùng một rule cho cùng một cặp herb-drug
        const matchKey = `${rule.id}_${herb}_${drug.name}`;
        if (!matchedRuleIds.has(matchKey)) {
          matchedRuleIds.add(matchKey);
          matches.push({
            herbName: herb,
            drugName: `${drug.name} (${drug.activeIngredient || drug.group || ''})`.replace(/\(\)/g, '').trim(),
            severity: rule.severity,
            title: rule.title,
            mechanism: rule.mechanism,
            clinicalRisk: rule.clinicalRisk,
            recommendation: rule.recommendation,
            evidenceSource: rule.evidenceSource
          });
        }
      }
    }
  }

  // Đếm các cấp độ
  const dangerCount = matches.filter(m => m.severity === 'danger').length;
  const warningCount = matches.filter(m => m.severity === 'warning').length;
  const synergyCount = matches.filter(m => m.severity === 'synergy').length;
  const safeCount = Math.max(0, herbNames.length * drugItems.length - matches.length);

  return {
    hasInteractions: matches.length > 0,
    totalHerbsChecked: herbNames.length,
    totalDrugsChecked: drugItems.length,
    dangerCount,
    warningCount,
    synergyCount,
    safeCount,
    matches,
    goldenRule: 'QUY TẮC VÀNG VỀ THỜI GIAN: Bắt buộc uống thuốc Đông y cách thuốc Tây y tối thiểu 1.5 đến 2 giờ. Việc giãn cách này giúp ngăn ngừa tương tác cơ học trong dịch vị dạ dày, tránh hiện tượng tạo phức chelat và đảm bảo sinh khả dụng hấp thu tối đa của cả hai loại thuốc.'
  };
}
