import type { WesternDrug } from './westernDrugs';

export const EXTRA_INJECTABLES_AND_ANTI_INFLAMMATORIES: WesternDrug[] = [
  // =========================================================================
  // PHẦN 1: BỔ SUNG ĐẦY ĐỦ THUỐC KHÁNG VIÊM CHUYÊN BIỆT (NHÓM A)
  // (NSAID ít hại dạ dày, Viên ngậm/xịt kháng viêm họng, Enzym thực vật,
  //  DMARDs miễn dịch, Kem kháng viêm không Corticoid & Kháng viêm sinh học)
  // =========================================================================
  {
    id: 'etodolac',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Kháng viêm NSAID ưu thế COX-2 (Ít hại dạ dày)',
    activeIngredient: 'Etodolac',
    commonBrandNames: ['Lodine 200mg / 400mg', 'Etogesic', 'Etodolac 200mg'],
    indications: [
      'Thoái hóa khớp, viêm khớp dạng thấp, viêm gân, viêm bao hoạt dịch',
      'Đau cấp tính cơ xương khớp, đau sau tiểu phẫu nha khoa'
    ],
    mechanismOfAction: 'Ức chế ưu thế enzym COX-2 tại ổ viêm hơn COX-1 ở niêm mạc dạ dày và tiểu cầu.',
    standardDosage: 'Người lớn: 200mg - 400mg x 2 lần/ngày (tối đa 1000-1200mg/ngày).',
    administration: 'Uống trong hoặc ngay sau bữa ăn với nhiều nước.',
    contraindications: ['Loét/xuất huyết dạ dày tá tràng tiến triển, suy tim nặng, suy gan/thận nặng, thai kỳ 3 tháng cuối'],
    cautions: ['Theo dõi chức năng thận và huyết áp ở người cao tuổi.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'BNF']
  },
  {
    id: 'nabumetone',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Tiền chất NSAID không mang tính Acid (Rất dịu dạ dày)',
    activeIngredient: 'Nabumetone',
    commonBrandNames: ['Relafen 500mg', 'Nabumetone 500mg', 'Mebutan'],
    indications: ['Viêm khớp dạng thấp và thoái hóa khớp cần điều trị kéo dài ở người nhạy cảm dạ dày'],
    mechanismOfAction: 'Tiền chất KHÔNG mang tính acid nên không kích ứng trực tiếp niêm mạc dạ dày khi nuốt; qua gan chuyển hóa thành 6-MNA ức chế ưu thế COX-2 kéo dài 24 giờ.',
    standardDosage: '1000mg (2 viên 500mg) x 1 lần/ngày vào buổi tối trước ngủ (có thể tăng thêm 500mg buổi sáng).',
    administration: 'Uống cùng thức ăn hoặc sữa.',
    contraindications: ['Loét dạ dày tá tràng hoạt động, suy gan/thận/tim nặng, phụ nữ có thai 3 tháng cuối'],
    cautions: ['Tỷ lệ loét tiêu hóa thấp hơn rõ rệt so với NSAID cổ điển nhưng vẫn cần lưu ý nguy cơ tim mạch chung của nhóm NSAID.'],
    referenceSources: ['Goodman & Gilman’s', 'BNF']
  },
  {
    id: 'flurbiprofen',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Kháng viêm giảm đau họng & Nhãn khoa (Viên ngậm / Xịt / Nhỏ mắt)',
    activeIngredient: 'Flurbiprofen / Benzydamine (Kháng viêm tại chỗ vùng họng)',
    commonBrandNames: ['Strepsils Intensive (Flurbiprofen 8.75mg)', 'Tantum Verde (Benzydamine)', 'Ocufen nhỏ mắt'],
    indications: [
      'Viêm họng cấp sưng đau nuốt rát nặng (ngậm tan chậm giảm viêm niêm mạc họng trong 15 phút)',
      'Viêm loét miệng, đau sau nhổ răng hoặc thủ thuật nha khoa'
    ],
    mechanismOfAction: 'Ức chế COX tại chỗ trực tiếp trên niêm mạc hầu họng đang sưng phù (Flurbiprofen), giảm đau rát và phù nề nhanh mà ít hấp thu toàn thân.',
    standardDosage: 'Ngậm tan chậm 1 viên Strepsils Intensive mỗi 3 - 6 giờ, tối đa 5 viên/24 giờ (không dùng quá 3 ngày).',
    administration: 'Ngậm di chuyển đều trong miệng cho tới khi tan hoàn toàn (KHÔNG nhai hoặc nuốt chửng).',
    contraindications: ['Trẻ em < 12 tuổi (với viên ngậm Flurbiprofen), tiền sử hen/loét dạ dày do NSAID, thai kỳ 3 tháng cuối'],
    cautions: ['Nếu kèm sốt cao hoặc amidan có mủ trắng cần đi khám để đánh giá dùng kháng sinh phù hợp.'],
    referenceSources: ['BNF', 'MIMS Việt Nam']
  },
  {
    id: 'naproxen-esomeprazole',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Kháng viêm NSAID phối hợp sẵn PPI bảo vệ dạ dày',
    activeIngredient: 'Naproxen 500mg + Esomeprazole 20mg',
    commonBrandNames: ['Vimovo 500/20mg', 'Naproxen/Esomeprazole'],
    indications: [
      'Thoái hóa khớp, viêm khớp dạng thấp, viêm cột sống dính khớp ở bệnh nhân có nguy cơ cao loét dạ dày tá tràng do NSAID'
    ],
    mechanismOfAction: 'Lớp vỏ ngoài giải phóng tức thì Esomeprazole 20mg nâng pH dạ dày bảo vệ niêm mạc, sau đó lõi bên trong mới giải phóng Naproxen 500mg kháng viêm.',
    standardDosage: '1 viên x 2 lần/ngày (sáng - tối).',
    administration: 'Uống nguyên viên (KHÔNG bẻ/nhai) TRƯỚC bữa ăn ít nhất 30 phút.',
    contraindications: ['Loét/xuất huyết tiêu hóa đang tiến triển, suy gan/thận/tim nặng, thai kỳ 3 tháng cuối'],
    cautions: ['Tiện lợi vì không cần uống tách riêng 2 loại thuốc kháng viêm và bảo vệ dạ dày.'],
    referenceSources: ['NICE Osteoarthritis Guidelines', 'Vidal Việt Nam']
  },
  {
    id: 'bromelain',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Enzym kháng viêm thực vật (Giảm phù nề xoang & mô mềm)',
    activeIngredient: 'Bromelain (Enzym chiết xuất thân quả Dứa)',
    commonBrandNames: ['Ananase 40mg', 'Bromanase', 'Edemase'],
    indications: [
      'Phù nề sưng tấy phần mềm sau chấn thương, phẫu thuật, tụ máu bầm tím',
      'Viêm xoang cấp/mạn có ứ dịch phù nề cuốn mũi, sưng nề sau nhổ răng'
    ],
    mechanismOfAction: 'Phân giải protein bất thường và Fibrin ở ổ viêm, ức chế Bradykinin gây sưng đau và giảm kết tụ tiểu cầu tại vi mạch.',
    standardDosage: '40mg - 80mg (1-2 viên) x 3 lần/ngày.',
    administration: 'Nuốt nguyên viên bao tan trong ruột với nước giữa các bữa ăn (lúc bụng tương đối đói để phát huy tác dụng kháng viêm toàn thân thay vì tiêu hóa thức ăn).',
    contraindications: ['Dị ứng quả Dứa/thơm, rối loạn đông máu nặng, đang dùng thuốc chống đông máu'],
    cautions: ['Ngưng trước phẫu thuật ít nhất 2 tuần; có thể làm tăng hấp thu một số kháng sinh (Amoxicillin, Tetracycline).'],
    referenceSources: ['Vidal', 'Natural Medicines Comprehensive Database']
  },
  {
    id: 'leflunomide',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Kháng viêm điều trị Viêm khớp dạng thấp (DMARD)',
    activeIngredient: 'Leflunomide',
    commonBrandNames: ['Arava 10mg / 20mg', 'Leflunomid 20mg'],
    indications: ['Viêm khớp dạng thấp (RA) hoạt động và viêm khớp vảy nến ở người lớn (thay thế hoặc phối hợp khi không đáp ứng Methotrexate)'],
    mechanismOfAction: 'Ức chế enzym DHODH ngăn tổng hợp Pyrimidine, làm ngừng tăng sinh tế bào lympho T hoạt hóa gây phá hủy khớp.',
    standardDosage: 'Duy trì chuẩn: 20mg x 1 lần/ngày (hoặc 10mg/ngày nếu gặp tác dụng phụ).',
    administration: 'Uống 1 lần mỗi ngày, cùng hoặc xa bữa ăn đều được.',
    contraindications: ['PHỤ NỮ CÓ THAI & CHO CON BÚ (gây quái thai cực nặng — tồn lưu trong máu tới 2 năm, phải dùng quy trình thải trừ Cholestyramine trước khi muốn có thai!)', 'Suy gan nặng, suy giảm miễn dịch nặng, giảm bạch cầu/tiểu cầu nặng'],
    cautions: ['Theo dõi men gan AST/ALT, công thức máu và huyết áp hàng tháng trong 6 tháng đầu.'],
    referenceSources: ['EULAR RA Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'azathioprine',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Kháng viêm ức chế miễn dịch (Bệnh tự miễn, Viêm ruột & Thận)',
    activeIngredient: 'Azathioprine',
    commonBrandNames: ['Imuran 50mg', 'Azathioprin 50mg'],
    indications: [
      'Viêm khớp dạng thấp nặng, Lupus ban đỏ hệ thống, viêm gan tự miễn, bệnh nhược cơ',
      'Duy trì lui bệnh trong Bệnh Crohn / Viêm loét đại tràng nặng; chống thải ghép tạng'
    ],
    mechanismOfAction: 'Tiền chất chuyển hóa thành 6-Mercaptopurine (6-MP) ức chế tổng hợp purine và DNA của tế bào miễn dịch T và B.',
    standardDosage: '1 - 2.5 mg/kg/ngày (thường 50mg - 150mg/ngày) chia 1 - 2 lần.',
    administration: 'Uống ngay sau bữa ăn để giảm buồn nôn.',
    contraindications: ['Thiếu hụt men TPMT/NUDT15 (nguy cơ suy tủy tử vong)', 'Quá mẫn 6-MP/Azathioprine'],
    cautions: ['CẢNH BÁO TƯƠNG TÁC TỬ VONG: TUYỆT ĐỐI tránh phối hợp với Allopurinol/Febuxostat (hoặc phải giảm 75% liều Azathioprine) vì ức chế Xanthine Oxidase làm tích tụ độc tính suy tủy cấp!'],
    referenceSources: ['BSG IBD Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'tacrolimus-topical',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Thuốc mỡ kháng viêm da KHÔNG chứa Corticoid (Ức chế Calcineurin)',
    activeIngredient: 'Tacrolimus monohydrate 0.03% / 0.1% (hoặc Pimecrolimus 1%)',
    commonBrandNames: ['Protopic 0.03% (Trẻ em) / 0.1% (Người lớn)', 'Elidel 1% (Pimecrolimus)'],
    indications: [
      'Viêm da cơ địa (Chàm/Eczema), bạch biến, vảy nến vùng da mặt, mí mắt, cổ, nếp gấp (nơi KHÔNG được bôi Corticoid dài ngày)'
    ],
    mechanismOfAction: 'Ức chế Calcineurin ngăn tế bào T giải phóng Cytokine viêm (IL-2, IL-4, IL-5) mà KHÔNG làm mỏng teo da hay giãn mao mạch như Corticoid.',
    standardDosage: 'Bôi lớp mỏng ngày 2 lần (sáng - tối) lên vùng tổn thương cho tới khi sạch sang thương.',
    administration: 'Chỉ bôi ngoài da khô sạch; trẻ 2-15 tuổi chỉ dùng nồng độ 0.03%.',
    contraindications: ['Trẻ em < 2 tuổi', 'Vùng da nhiễm virus/nấm/vi khuẩn đang tiến triển chưa điều trị'],
    cautions: ['Có thể gây cảm giác nóng rát nhẹ 15-20 phút trong 3-5 ngày đầu bôi rồi tự hết; tránh phơi nắng mạnh lên vùng da bôi.'],
    referenceSources: ['AAD Atopic Dermatitis Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'adalimumab',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Thuốc kháng viêm sinh học (Kháng thể đơn dòng ức chế TNF-alpha)',
    activeIngredient: 'Adalimumab (Kháng thể đơn dòng tái tổ hợp)',
    commonBrandNames: ['Humira 40mg/0.4ml', 'Amgevita / Hyrimoz (Biosimilar)'],
    indications: [
      'Viêm khớp dạng thấp, viêm cột sống dính khớp, viêm khớp vảy nến mức độ nặng kháng DMARD cổ điển',
      'Bệnh vảy nến mảng nặng, bệnh Crohn và viêm loét đại tràng nặng'
    ],
    mechanismOfAction: 'Kháng thể đơn dòng người gắn đặc hiệu và trung hòa yếu tố hoại tử u TNF-alpha — chất trung gian cốt lõi phá hủy khớp và gây viêm ruột.',
    standardDosage: 'Viêm khớp: 40mg tiêm dưới da (bụng hoặc đùi) MỖI 2 TUẦN 1 LẦN.',
    administration: 'Bút tiêm nạp sẵn tiêm dưới da; bảo quản ngăn mát tủ lạnh 2-8°C (không lắc, không đông đá).',
    contraindications: ['Bệnh lao hoạt động hoặc lao tiềm ẩn chưa điều trị dự phòng', 'Nhiễm trùng nặng đang tiến triển, suy tim nặng NYHA III-IV'],
    cautions: ['BẮT BUỘC tầm soát Lao (QuantiFERON/X-quang phổi) và Viêm gan B (HBsAg, Anti-HBc) trước khi khởi trị thuốc sinh học.'],
    referenceSources: ['EULAR Biological DMARD Guidelines', 'UpToDate']
  },

  // =========================================================================
  // PHẦN 2: NHÓM J — KHO THUỐC TIÊM CHÍCH, TRUYỀN TĨNH MẠCH & CẤP CỨU BỆNH VIỆN
  // =========================================================================
  {
    id: 'parecoxib-injection',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'Tiêm kháng viêm giảm đau sau phẫu thuật (COX-2 tiêm TM/Bắp)',
    activeIngredient: 'Parecoxib sodium (Tiền chất Valdecoxib tiêm)',
    commonBrandNames: ['Dynastat 40mg lọ bột pha tiêm', 'Parecoxib 40mg'],
    indications: ['Điều trị ngắn hạn cơn đau cấp tính sau phẫu thuật (giảm 30-50% nhu cầu Morphin hậu phẫu)'],
    mechanismOfAction: 'Tiền chất tiêm tĩnh mạch/tiêm bắp đầu tiên của nhóm ức chế chọn lọc COX-2, khởi phát giảm đau nhanh sau 7-13 phút và kéo dài 12 giờ mà không ức chế kết tập tiểu cầu.',
    standardDosage: 'Người lớn: Khởi đầu 40mg tiêm tĩnh mạch (IV) hoặc tiêm bắp sâu (IM), sau đó 20-40mg mỗi 6-12 giờ (tối đa 80mg/ngày, tối đa 3-5 ngày).',
    administration: 'Pha 40mg với 2ml NaCl 0.9% tiêm IV trực tiếp hoặc tiêm IM sâu.',
    contraindications: [
      'TUYỆT ĐỐI CHỐNG CHỈ ĐỊNH sau phẫu thuật bắc cầu động mạch vành (CABG)',
      'Dị ứng Sulfonamid, loét/xuất huyết tiêu hóa tiến triển, suy gan nặng, bệnh mạch vành/đột quỵ, thai kỳ 3 tháng cuối'
    ],
    cautions: ['Người >= 65 tuổi cân nặng < 50kg bắt đầu liều tối đa bằng một nửa (20mg mỗi 12h).'],
    brandVariants: [
      {
        variantName: 'Dynastat 40mg (Pfizer - Mỹ)',
        manufacturer: 'Pfizer',
        ingredients: 'Parecoxib sodium 40mg lọ bột đông khô pha tiêm IV/IM',
        specialEffect: 'Giảm đau kháng viêm hậu phẫu mạnh mẽ mà không làm chảy máu vết mổ và không gây suy hô hấp như Morphin.'
      }
    ],
    referenceSources: ['ESA Postoperative Pain Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'paracetamol-iv',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'Truyền tĩnh mạch hạ sốt & giảm đau cấp cứu',
    activeIngredient: 'Paracetamol 10mg/ml (Lọ/Túi truyền tĩnh mạch)',
    commonBrandNames: ['Perfalgan 1g/100ml', 'Paracetamol Kabi 1000mg/100ml', 'Perfusalgan'],
    indications: [
      'Hạ sốt cao cấp cứu hoặc giảm đau cấp tính sau mổ khi bệnh nhân chưa uống được hoặc nôn ói nhiều'
    ],
    mechanismOfAction: 'Đưa trực tiếp Paracetamol vào tuần hoàn trung ương qua đường truyền tĩnh mạch 15 phút, đạt đỉnh giảm đau hạ sốt chỉ sau 15-30 phút.',
    standardDosage: 'Người lớn >= 50kg: truyền 1000mg (100ml) mỗi 6 giờ (tối đa 4g/24h). Người < 50kg: 15mg/kg/lần (tối đa 60mg/kg/24h).',
    administration: 'Truyền tĩnh mạch ĐÚNG TRONG 15 PHÚT tại cơ sở y tế.',
    contraindications: ['Suy gan nặng hoặc bệnh gan đang tiến triển nặng, quá mẫn Paracetamol'],
    cautions: ['Tính tổng liều Paracetamol từ mọi đường dùng (truyền + uống + đặt hậu môn) không vượt quá 4g/ngày để tránh hoại tử gan.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'BNF']
  },
  {
    id: 'morphine-injection',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'Tiêm giảm đau Opioid bậc 3 & Cấp cứu Phù phổi cấp / Nhồi máu cơ tim',
    activeIngredient: 'Morphine sulfate / hydrochloride (Ống tiêm)',
    commonBrandNames: ['Morphin 10mg/1ml ống tiêm', 'Morphine Sulfate IV/SC'],
    indications: [
      'Đau cấp tính cực độ: nhồi máu cơ tim cấp, đa chấn thương nặng, bỏng nặng, sau đại phẫu',
      'Cấp cứu phù phổi cấp huyết động (giãn tĩnh mạch giảm tiền tải và giảm khó thở lo âu)',
      'Đau ung thư giai đoạn nặng (tiêm dưới da/tĩnh mạch khi không uống được)'
    ],
    mechanismOfAction: 'Chủ vận mạnh thụ thể Mu-opioid ở não và tủy sống, chặn hoàn toàn dẫn truyền đau và làm dịu trung tâm hô hấp/lo âu.',
    standardDosage: 'Cấp cứu đau / nhồi máu: Pha loãng 10mg trong 10ml NaCl 0.9%, tiêm tĩnh mạch chậm 2 - 5mg mỗi 5-15 phút theo đáp ứng (liều tiêm bắp/dưới da 5-10mg mỗi 4h).',
    administration: 'Thuốc Gây Nghiện quản lý đặc biệt: Chỉ tiêm tại bệnh viện có sẵn bóng bóp oxy và thuốc giải độc Naloxone.',
    contraindications: ['Suy hô hấp nặng không có máy thở, hen phế quản cấp nặng, chấn thương sọ não tăng áp lực nội sọ chưa đánh giá, liệt ruột'],
    cautions: ['Theo dõi sát nhịp thở (nếu < 10-12 lần/phút chuẩn bị Naloxone), huyết áp và đồng tử co nhỏ như đầu đinh ghim.'],
    referenceSources: ['ESC STEMI Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'fentanyl-injection',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'Tiêm giảm đau gây mê Opioid cực mạnh (Khởi phát < 2 phút)',
    activeIngredient: 'Fentanyl citrate (Ống tiêm)',
    commonBrandNames: ['Fentanyl 0.1mg/2ml', 'Fentanyl 0.5mg/10ml', 'Sublimaze'],
    indications: [
      'Giảm đau trong gây mê toàn thân, đặt nội khí quản, thở máy hồi sức ICU',
      'Cắt cơn đau cấp dữ dội ngắn (ít gây phóng thích Histamin tụt huyết áp hơn Morphin)'
    ],
    mechanismOfAction: 'Opioid tổng hợp ái lực cực cao trên thụ thể Mu (mạnh gấp 50-100 lần Morphin), qua hàng rào máu não trong 1-2 phút và tác dụng ngắn 30-60 phút.',
    standardDosage: 'Giảm đau cấp cứu: 25 - 100 mcg (0.5 - 1 mcg/kg) tiêm tĩnh mạch chậm trong 1-2 phút (liều gây mê cao hơn theo bác sĩ Gây mê Hồi sức).',
    administration: 'Chỉ sử dụng trong phòng mổ, cấp cứu, hồi sức ICU có theo dõi SpO2 và phương tiện hỗ trợ hô hấp.',
    contraindications: ['Suy hô hấp nặng không thông khí hỗ trợ, đang dùng MAOi trong 14 ngày'],
    cautions: ['Tiêm tĩnh mạch quá nhanh có thể gây hội chứng "Cứng thành ngực" (Wooden chest) làm không bóp bóng được -> luôn tiêm chậm; giải độc bằng Naloxone.'],
    referenceSources: ['Miller’s Anesthesia', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'pethidine-injection',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'Tiêm giảm đau Opioid (Cơn đau quặn mật, Viêm tụy cấp & Chuyển dạ)',
    activeIngredient: 'Pethidine HCl (Meperidine)',
    commonBrandNames: ['Dolosal 100mg/2ml', 'Pethidine 100mg/2ml', 'Demerol'],
    indications: [
      'Giảm đau cấp tính trong cơn đau quặn mật, viêm tụy cấp (ít gây co thắt cơ vòng Oddi hơn Morphin)',
      'Giảm đau trong chuyển dạ sản khoa và cắt cơn rét run sau gây mê/truyền máu (liều thấp 25mg IV)'
    ],
    mechanismOfAction: 'Chủ vận thụ thể Mu-opioid kèm tác dụng kháng Cholinergic nhẹ giống Atropine giúp ít co thắt cơ trơn đường mật.',
    standardDosage: '25mg - 100mg tiêm bắp hoặc tiêm dưới da mỗi 4 giờ (tiêm TM chậm 25-50mg pha loãng).',
    administration: 'Chỉ dùng ngắn hạn tối đa 48 giờ; quản lý theo quy chế Thuốc Gây Nghiện.',
    contraindications: ['Đang dùng thuốc ức chế MAO (gây phản ứng tăng thân nhiệt co giật chết người!)', 'Suy thận nặng (tích lũy Normeperidine gây co giật)'],
    cautions: ['Không dùng điều trị đau mạn tính do chất chuyển hóa Normeperidine gây kích thích co giật thần kinh trung ương.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'BNF']
  },
  {
    id: 'lidocaine-injection',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'Tiêm gây tê tại chỗ, Tiểu phẫu & Chống loạn nhịp thất cấp cứu',
    activeIngredient: 'Lidocaine HCl (Ống tiêm gây tê / Chống loạn nhịp)',
    commonBrandNames: ['Lidocain 2% (40mg/2ml / 200mg/10ml)', 'Xylocaine 2%', 'Xylocaine + Adrenaline (Nha khoa)'],
    indications: [
      'Gây tê thấm tại chỗ khâu vết thương, nhổ răng, rạch áp xe, sinh thiết, phong bế thần kinh',
      'Tiêm tĩnh mạch cấp cứu nhịp nhanh thất / rung thất trơ với sốc điện (khi không có Amiodarone)'
    ],
    mechanismOfAction: 'Chẹn kênh Natri phụ thuộc điện thế trên màng sợi thần kinh cảm giác (ngăn dẫn truyền xung đau) và trên sợi Purkinje cơ tim (loạn nhịp nhóm IB).',
    standardDosage: 'Gây tê: tối đa 4.5 mg/kg (không quá 300mg) nếu không pha Adrenaline; tối đa 7 mg/kg (500mg) nếu có Adrenaline. Loạn nhịp: 1 - 1.5 mg/kg tiêm TM.',
    administration: 'TUYỆT ĐỐI kiểm tra hút ngược piston xi-lanh trước khi bơm gây tê để chắc chắn KHÔNG bơm nhầm vào mạch máu; KHÔNG dùng loại có Adrenaline tiêm ở đầu ngón tay/chân, mũi, tai, dương vật (nguy cơ hoại tử!).',
    contraindications: ['Block nhĩ thất độ II-III (trừ khi có máy tạo nhịp), hội chứng Stokes-Adams, quá mẫn thuốc tê nhóm Amid'],
    cautions: ['Ngộ độc thuốc tê toàn thân (LAST): dấu hiệu sớm tê lưỡi, vị kim loại, ù tai, nói lắp -> ngưng bơm ngay và truyền cấp cứu nhũ tương Lipid 20% (Intralipid)!'],
    referenceSources: ['AHA ACLS Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'sodium-hyaluronate-intraarticular',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'Tiêm nội khớp Acid Hyaluronic ("Bổ sung chất nhờn khớp gối")',
    activeIngredient: 'Sodium Hyaluronate (Bơm tiêm nạp sẵn nội khớp)',
    commonBrandNames: ['Go-On 25mg/2.5ml', 'Synvisc / Synvisc-One', 'Hyalgan 20mg/2ml', 'Ostenil'],
    indications: [
      'Thoái hóa khớp gối, khớp háng mức độ nhẹ đến trung bình (KL độ II-III) đau dai dẳng không đáp ứng đủ với thuốc uống và vật lý trị liệu'
    ],
    mechanismOfAction: 'Bổ sung trực tiếp Acid Hyaluronic trọng lượng phân tử cao vào ổ khớp, phục hồi độ nhớt - đàn hồi của dịch khớp, giảm ma sát sụn khớp và ức chế thụ thể đau tại bao hoạt dịch.',
    standardDosage: 'Tiêm nội khớp gối 1 ống/tuần trong 3 - 5 tuần liên tiếp (hoặc 1 mũi duy nhất loại liên kết chéo Synvisc-One 6ml); hiệu quả giảm đau kéo dài 6 - 12 tháng.',
    administration: 'BẮT BUỘC do bác sĩ Chấn thương Chỉnh hình / Cơ Xương Khớp tiêm trong điều kiện vô khuẩn tuyệt đối; hút hết dịch tràn khớp (nếu có) trước khi bơm.',
    contraindications: ['Nhiễm khuẩn khớp hoặc nhiễm trùng da vùng quanh khớp gối, dị ứng protein gia cầm (với một số chế phẩm nguồn gốc mào gà)'],
    cautions: ['Nghỉ ngơi hạn chế đi bộ leo cầu thang mạnh trong 24-48 giờ đầu sau mũi tiêm.'],
    referenceSources: ['OARSI / ESCEO Guidelines', 'Phác đồ Khớp BV Bạch Mai']
  },
  {
    id: 'adrenaline-epinephrine',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'CẤP CỨU SỐ 1: Sốc Phản Vệ & Ngừng Tuần Hoàn (Adrenaline)',
    activeIngredient: 'Epinephrine (Adrenaline 1mg/1ml)',
    commonBrandNames: ['Adrenalin 1mg/1ml ống tiêm', 'EpiPen 0.3mg (bút tiêm phản vệ)'],
    indications: [
      'THUỐC SỐ 1 CẤP CỨU SỐC PHẢN VỆ (độ II trở lên) theo Thông tư 51/2017/TT-BYT — tiêm bắp ngay lập tức!',
      'Ngừng tim / ngừng tuần hoàn (phác đồ CPR nâng cao), sốc tim/nhiễm khuẩn nặng, khí dung co thắt thanh quản nặng (Croup)'
    ],
    mechanismOfAction: 'Kích thích mạnh cả Alpha-1 (co mạch nâng huyết áp, giảm phù nề thanh quản), Beta-1 (tăng nhịp và sức co bóp tim) và Beta-2 (giãn phế quản, ức chế dưỡng bào phóng thích Histamin).',
    standardDosage: 'PHẢN VỆ (Thông tư 51 BYT): Tiêm BẮP (mặt trước bên đùi) 0.5mg (1/2 ống 1mg/1ml) ở người lớn; trẻ em 0.01mg/kg (tối đa 0.3mg) — có thể nhắc lại mỗi 3-5 phút đến khi ổn định. NGỪNG TIM: 1mg tiêm tĩnh mạch mỗi 3-5 phút.',
    administration: 'Phản vệ độ II-III: TIÊM BẮP MẶT TRƯỚC NGOÀI ĐÙI ngay tại chỗ (tuyệt đối KHÔNG tiêm thẳng 1 ống chưa pha vào tĩnh mạch khi tim còn đập vì gây rung thất/xuất huyết não!).',
    contraindications: ['KHÔNG có chống chỉ định tuyệt đối trong cấp cứu sốc phản vệ hoặc ngừng tuần hoàn!'],
    cautions: ['Gây tim đập nhanh, run tay, tăng huyết áp thoáng qua; luôn dự phòng tối thiểu 2-3 ống Adrenalin 1mg/1ml trong hộp chống sốc phản vệ tại mọi phòng khám.'],
    referenceSources: ['Thông tư 51/2017/TT-BYT Phản Vệ', 'AHA CPR Guidelines']
  },
  {
    id: 'noradrenaline-injection',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'Thuốc vận mạch đầu tay cấp cứu Sốc Nhiễm Khuẩn (Hồi sức ICU)',
    activeIngredient: 'Norepinephrine (Noradrenaline bitartrate)',
    commonBrandNames: ['Noradrenalin 4mg/4ml', 'Levophed 4mg/4ml'],
    indications: [
      'Thuốc vận mạch LỰA CHỌN ĐẦU TAY nâng huyết áp trung bình (MAP >= 65 mmHg) trong Sốc nhiễm khuẩn (Septic Shock) và sốc phân bố nặng'
    ],
    mechanismOfAction: 'Chủ vận Alpha-1 cực mạnh gây co mạch ngoại biên nâng sức cản hệ thống và huyết áp, kèm tác dụng Beta-1 nhẹ duy trì cung lượng tim ít gây nhịp nhanh loạn nhịp hơn Dopamine.',
    standardDosage: 'Pha truyền bơm tiêm điện tĩnh mạch liên tục: khởi đầu 0.05 - 0.1 mcg/kg/phút, chuẩn độ tăng dần theo huyết áp động mạch xâm lấn/monitor.',
    administration: 'BẮT BUỘC truyền qua bơm tiêm điện vào Catheter tĩnh mạch trung tâm (CVC); không ngưng đột ngột.',
    contraindications: ['Tụt huyết áp do thiếu thể tích tuần hoàn chưa được bù dịch (trừ cấp cứu đe dọa tử vong trong lúc đang truyền dịch)'],
    cautions: ['Thoát mạch ra mô dưới da gây hoại tử mô nặng -> xử trí bằng tiêm tại chỗ Phentolamine nếu xảy ra.'],
    referenceSources: ['Surviving Sepsis Campaign 2021', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'atropine-injection',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'Tiêm cấp cứu Nhịp Chậm & Giải độc Thuốc Trừ Sâu Phospho Hữu Cơ',
    activeIngredient: 'Atropine sulfate (Ống tiêm 0.25mg/1ml)',
    commonBrandNames: ['Atropin Sulfat 0.25mg/1ml'],
    indications: [
      'Nhịp tim chậm xoang có triệu chứng tụt huyết áp/ngất (xử trí cấp cứu nhịp chậm ACLS)',
      'Giải độc đặc hiệu ngộ độc thuốc trừ sâu Phospho hữu cơ / Carbamate và ngộ độc nấm độc Muscarine',
      'Tiền mê giảm tiết đờm dãi đường hô hấp'
    ],
    mechanismOfAction: 'Đối kháng cạnh tranh Acetylcholine tại thụ thể Muscarinic (phó giao cảm), tăng dẫn truyền nút xoang - nút nhĩ thất và làm khô dịch tiết phế quản.',
    standardDosage: 'Nhịp chậm cấp: 0.5mg - 1mg tiêm tĩnh mạch nhanh mỗi 3-5 phút (tối đa 3mg). Ngộ độc phospho hữu cơ: 2 - 5mg IV mỗi 5-15 phút cho đến khi đạt dấu hiệu "Thấm Atropin" (phổi hết ran ẩm, da ấm khô, nhịp > 80-100).',
    administration: 'Tiêm tĩnh mạch nhanh hoặc tiêm bắp/dưới da; KHÔNG tiêm liều quá nhỏ (< 0.5mg) tĩnh mạch vì có thể gây nhịp chậm nghịch lý.',
    contraindications: ['Tăng nhãn áp góc đóng, phì đại tiền liệt tuyến bí tiểu, hẹp môn vị (không chống chỉ định trong cấp cứu ngộ độc/nhịp chậm đe dọa tính mạng)'],
    cautions: ['Quá liều gây sảng, sốt cao đỏ da, giãn đồng tử hoàn toàn, bí tiểu.'],
    referenceSources: ['AHA Bradycardia ACLS', 'Phác đồ Chống Độc BV Bạch Mai']
  },
  {
    id: 'dobutamine-dopamine',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'Truyền tĩnh mạch trợ tim tăng co bóp (Sốc tim & Suy tim mất bù)',
    activeIngredient: 'Dobutamine HCl / Dopamine HCl (Lọ/Ống truyền TM)',
    commonBrandNames: ['Dobutrex 250mg/20ml', 'Dopamin 200mg/5ml'],
    indications: [
      'Dobutamine: Suy tim cấp mất bù cung lượng tim thấp, sốc tim có huyết áp tâm thu >= 85-90 mmHg',
      'Dopamine: Nhịp chậm có triệu chứng trơ Atropin hoặc tụt huyết áp tạm thời'
    ],
    mechanismOfAction: 'Dobutamine chủ vận mạnh Beta-1 tăng sức co bóp cơ tim và cung lượng tim mà ít tăng nhịp/huyết áp; Dopamine tác động phụ thuộc liều lên thụ thể Dopaminergic, Beta-1 và Alpha-1.',
    standardDosage: 'Truyền bơm tiêm điện liên tục: Dobutamine 2.5 - 10 mcg/kg/phút (tối đa 20); Dopamine 2 - 20 mcg/kg/phút.',
    administration: 'Pha loãng trong NaCl 0.9% hoặc Glucose 5%, truyền liên tục qua bơm tiêm điện có Monitor ECG liên tục.',
    contraindications: ['Bệnh cơ tim phì đại tắc nghẽn đường ra thất trái (HOCM), u tủy thượng thận (Pheochromocytoma), rung thất chưa kiểm soát'],
    cautions: ['Không pha chung với dung dịch kiềm Natri Bicarbonate (gây bất hoạt thuốc); theo dõi sát nhịp nhanh thất/ngoại tâm thu thất.'],
    referenceSources: ['ESC Acute Heart Failure Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'nicardipine-iv',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'Truyền tĩnh mạch hạ huyết áp Cấp Cứu (Cơn Tăng HA Ác Tính)',
    activeIngredient: 'Nicardipine HCl (Ống tiêm truyền 10mg/10ml)',
    commonBrandNames: ['Loxen 10mg/10ml', 'Nicardipine Aguettant'],
    indications: [
      'Cơn tăng huyết áp cấp cứu có tổn thương cơ quan đích: xuất huyết não, bóc tách động mạch chủ, tiền sản giật/sản giật nặng, phù phổi cấp do tăng HA'
    ],
    mechanismOfAction: 'Chẹn kênh Calci nhóm Dihydropyridine đường tĩnh mạch tác dụng nhanh trong 5-15 phút, giãn động mạch chọn lọc giúp chỉnh từng mmHg huyết áp chính xác mà không làm chậm nhịp tim.',
    standardDosage: 'Pha truyền bơm tiêm điện khởi đầu 2 - 5 mg/giờ, tăng dần 2.5 mg/giờ mỗi 5-15 phút (tối đa 15 mg/giờ) cho tới khi đạt huyết áp mục tiêu.',
    administration: 'Truyền tĩnh mạch liên tục qua bơm tiêm điện; đổi vị trí kim luồn ngoại vi mỗi 12 giờ (hoặc truyền CVC) vì dễ gây viêm tĩnh mạch tại chỗ.',
    contraindications: ['Hẹp van động mạch chủ nặng'],
    cautions: ['CẢNH BÁO: Trong tăng huyết áp cấp cứu không hạ huyết áp quá nhanh > 25% trong giờ đầu (trừ bóc tách ĐMC) để tránh thiếu máu não/thận.'],
    referenceSources: ['ESC 2024 Hypertension Emergency Guidelines', 'Phác đồ Đột Quỵ Bộ Y Tế']
  },
  {
    id: 'magnesium-sulfate-iv',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'Tiêm truyền Cấp cứu Sản Giật, Xoắn Đỉnh & Bảo vệ não thai nhi',
    activeIngredient: 'Magnesium sulfate (MgSO4 15% ống 10ml = 1.5g)',
    commonBrandNames: ['Magie Sulfat 15%', 'Magnesium Sulfate 1.5g/10ml'],
    indications: [
      'Lựa chọn SỐ 1 cắt và phòng ngừa co giật trong Tiền sản giật nặng & Sản giật ở phụ nữ mang thai',
      'Cấp cứu rối loạn nhịp tim Xoắn đỉnh (Torsades de pointes), hạ Magie máu nặng, cơn hen phế quản ác tính kháng trị'
    ],
    mechanismOfAction: 'Chẹn kênh Calci và thụ thể NMDA tại thần kinh trung ương giúp chống co giật sản khoa, ổn định màng tế bào cơ tim và giãn cơ trơn phế quản.',
    standardDosage: 'Sản giật: Liều nạp 4g pha loãng truyền TM chậm 15-20 phút, sau đó duy trì 1 - 2g/giờ qua bơm tiêm điện. Xoắn đỉnh: 2g IV trong 10-15 phút.',
    administration: 'Truyền tĩnh mạch kiểm soát tốc độ chặt chẽ; luôn chuẩn bị sẵn ống Calcium Gluconate 10% bên cạnh để giải độc ngay nếu ngộ độc Magie.',
    contraindications: ['Block tim nặng, nhược cơ nặng, suy thận vô niệu (thải hoàn toàn qua thận)'],
    cautions: ['Theo dõi sát 3 dấu hiệu lâm sàng mỗi giờ khi truyền: Phản xạ gân xương bánh chè (mất phản xạ là dấu hiệu sớm của ngộ độc!), nhịp thở (>= 16 l/p) và lượng nước tiểu (>= 30ml/h).'],
    referenceSources: ['ACOG Preeclampsia Guidelines', 'AHA ACLS Guidelines']
  },
  {
    id: 'calcium-chloride-gluconate-iv',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'Tiêm cấp cứu Bảo vệ Tim khi Tăng Kali Máu & Hạ Calci Co Giật',
    activeIngredient: 'Calcium gluconate 10% / Calcium chloride 10%',
    commonBrandNames: ['Calci Clorid 0.5g/5ml', 'Calcium Gluconate 10% 10ml'],
    indications: [
      'CẤP CỨU SỐ 1 bảo vệ cơ tim khi Tăng Kali máu nặng có biến đổi điện tâm đồ (sóng T cao nhọn, giãn rộng QRS)',
      'Cơn co giật Tetany hạ Calci máu cấp (sau cắt tuyến giáp), ngộ độc Magie Sulfat hoặc quá liều thuốc chẹn kênh Calci'
    ],
    mechanismOfAction: 'Đối kháng trực tiếp tình trạng tăng Kali máu bằng cách phục hồi chênh lệch điện thế ngưỡng màng tế bào cơ tim ngay lập tức trong 1-3 phút (lưu ý không làm hạ nồng độ Kali máu — cần phối hợp Insulin+Glucose/Salbutamol để hạ Kali).',
    standardDosage: 'Calcium Gluconate 10% 10 - 20ml (1-2g) hoặc Calci Clorid 10% 5-10ml tiêm tĩnh mạch CHẬM trong 3-5 phút dưới monitor ECG.',
    administration: 'BẮT BUỘC tiêm tĩnh mạch rất chậm (Calci Clorid phải tiêm qua tĩnh mạch lớn/trung tâm vì thoát mạch gây hoại tử da rất nặng!). KHÔNG pha chung với Ceftriaxone hay dung dịch Bicarbonat.',
    contraindications: ['Ngộ độc Digoxin (tiêm Calci gây ngừng tim đột ngột — "Stone heart"!), rung thất khi chưa bù thiếu, tăng Calci máu nặng'],
    cautions: ['Theo dõi nhịp tim liên tục khi tiêm; tiêm nhanh gây nóng bừng mặt, tụt huyết áp hoặc ngừng tim chậm.'],
    referenceSources: ['KDIGO Hyperkalemia Emergency', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'naloxone-injection',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'Thuốc giải độc đặc hiệu Quá liều Morphin / Fentanyl / Heroin',
    activeIngredient: 'Naloxone HCl (Ống tiêm 0.4mg/1ml)',
    commonBrandNames: ['Naloxon 0.4mg/1ml', 'Narcan'],
    indications: ['Cấp cứu đảo ngược tình trạng ức chế hô hấp, ngừng thở, hôn mê do quá liều Opioid (Morphin, Fentanyl, Codein, Tramadol, Heroin)'],
    mechanismOfAction: 'Đối kháng cạnh tranh cực mạnh không chọn lọc tại các thụ thể Opioid (Mu, Kappa, Delta) đẩy phân tử Opioid ra khỏi não chỉ sau 1-2 phút.',
    standardDosage: '0.4mg - 2mg tiêm tĩnh mạch (hoặc tiêm bắp/xịt mũi) mỗi 2-3 phút cho đến khi bệnh nhân tự thở đều trở lại.',
    administration: 'Tiêm tĩnh mạch chậm/chuẩn độ liều nhỏ (0.04-0.4mg) ở người bệnh đang phụ thuộc Opioid để tránh bùng phát hội chứng cai đau đớn dữ dội.',
    contraindications: ['Quá mẫn Naloxone'],
    cautions: ['Thời gian tác dụng của Naloxone rất ngắn (30-90 phút) trong khi Morphin/Methadone kéo dài 4-24 giờ -> BẮT BUỘC theo dõi bệnh nhân ít nhất 4-6 giờ sau khi tỉnh vì có thể tái suy hô hấp!'],
    referenceSources: ['WHO Opioid Overdose Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'diphenhydramine-injection',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'Tiêm kháng Histamin H1 cấp cứu Dị ứng, Phản vệ & Ngoại tháp',
    activeIngredient: 'Diphenhydramine HCl / Promethazine HCl (Ống tiêm)',
    commonBrandNames: ['Dimedrol 10mg/1ml', 'Pipolphen 50mg/2ml (Promethazine)', 'Benadryl IV'],
    indications: [
      'Dị ứng cấp, mày đay phù mạch nặng; thuốc hỗ trợ hàng thứ 2 sau Adrenalin trong phác đồ Sốc phản vệ Bộ Y Tế',
      'Giải độc nhanh hội chứng ngoại tháp (cứng hàm, vẹo cổ, trợn mắt) do Metoclopramide (Primperan) hoặc thuốc chống loạn thần'
    ],
    mechanismOfAction: 'Chẹn mạnh thụ thể Histamin H1 trung ương/ngoại vi kèm hoạt tính kháng Cholinergic cắt nhanh co thắt ngoại tháp.',
    standardDosage: 'Dimedrol (Diphenhydramine): người lớn tiêm bắp hoặc tĩnh mạch chậm 10 - 50mg mỗi 4-6 giờ. Promethazine: 25mg tiêm bắp sâu.',
    administration: 'Dạng tiêm TM pha loãng tiêm chậm; Promethazine ưu tiên tiêm bắp sâu (tránh tiêm dưới da hoặc động mạch gây hoại tử mô).',
    contraindications: ['Cơn hen phế quản cấp đặc đờm, trẻ sơ sinh, ngộ độc thuốc ức chế TKTW'],
    cautions: ['Gây buồn ngủ mạnh; KHÔNG thay thế Adrenaline trong xử trí cấp cứu sốc phản vệ đe dọa tính mạng!'],
    referenceSources: ['Thông tư 51/2017/TT-BYT', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'diazepam-midazolam-injection',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'Tiêm cấp cứu Cắt cơn Co giật / Động kinh liên tục & An thần',
    activeIngredient: 'Diazepam / Midazolam (Ống tiêm Benzodiazepine)',
    commonBrandNames: ['Seduxen 10mg/2ml (Diazepam)', 'Midazolam 5mg/5ml (Dormicum)', 'Valium tiêm'],
    indications: [
      'Lựa chọn SỐ 1 cắt cơn động kinh liên tục (Status epilepticus) hoặc co giật sốt cao kéo dài > 5 phút',
      'Tiền mê, an thần làm thủ thuật (nội soi), sảng rượu cấp, uốn ván co cứng cơ'
    ],
    mechanismOfAction: 'Tăng cường hoạt tính chất dẫn truyền ức chế GABA tại thụ thể GABA-A làm tăng tần suất mở kênh Cl-, dập tắt ngay ổ phóng điện co giật não.',
    standardDosage: 'Cắt cơn co giật người lớn: Diazepam 10mg tiêm tĩnh mạch chậm (<= 5mg/phút) hoặc Midazolam 10mg tiêm bắp/IV; có thể nhắc lại 1 lần sau 5-10 phút nếu còn giật.',
    administration: 'Thuốc Hướng Thần kiểm soát đặc biệt: Không pha loãng Diazepam với nước truyền thông thường vì kết tủa trắng đục (tiêm TM chậm nguyên ống vào dây truyền chảy tốt); sẵn sàng bóng bóp oxy.',
    contraindications: ['Suy hô hấp nặng, hội chứng ngưng thở khi ngủ, bệnh nhược cơ nặng, glôcôm góc đóng cấp'],
    cautions: ['Nguy cơ ức chế hô hấp ngừng thở đặc biệt khi tiêm nhanh hoặc phối hợp với Opioid; giải độc bằng Flumazenil (thận trọng ở bệnh nhân động kinh).'],
    referenceSources: ['AES Status Epilepticus Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'enoxaparin-sc',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'Tiêm dưới da chống đông Heparin TLPT thấp (LMWH)',
    activeIngredient: 'Enoxaparin sodium (Bơm tiêm nạp sẵn dưới da)',
    commonBrandNames: ['Lovenox 40mg (4000 UI)/0.4ml', 'Lovenox 60mg/0.6ml', 'Lovenox 80mg', 'Fraxiparine (Nadroparin)'],
    indications: [
      'Dự phòng và điều trị Huyết khối tĩnh mạch sâu (DVT) và Thuyên tắc phổi (PE)',
      'Hội chứng mạch vành cấp (nhồi máu cơ tim không ST chênh / ST chênh)',
      'Dự phòng sảy thai liên tiếp do hội chứng kháng Phospholipid (tiêm suốt thai kỳ an toàn hơn Warfarin!)'
    ],
    mechanismOfAction: 'Gắn Antithrombin III tăng bất hoạt chọn lọc yếu tố Xa (tỷ lệ anti-Xa / anti-IIa ~ 4:1), chống đông hiệu quả ổn định không cần xét nghiệm aPTT thường quy.',
    standardDosage: 'Dự phòng huyết khối: 40mg (4000 UI) tiêm dưới da x 1 lần/ngày. Điều trị DVT/PE/Vành cấp: 1mg/kg (100 UI/kg) tiêm dưới da mỗi 12 giờ.',
    administration: 'TIÊM DƯỚI DA VÙNG BỤNG (cách rốn ít nhất 5cm, luân phiên trái/phải mỗi ngày); KHÔNG ĐUỔI BỌT KHÍ trong bơm tiêm nạp sẵn Lovenox và KHÔNG xoa bóp chỗ tiêm sau khi rút kim (tránh bầm máu)!',
    contraindications: ['Đang xuất huyết lớn (xuất huyết não, tiêu hóa), giảm tiểu cầu do Heparin (HIT), gây tê tủy sống trong vòng 12-24h gần liều tiêm'],
    cautions: ['Giảm liều còn 1 lần/ngày nếu suy thận nặng (CrCl < 30 ml/phút); theo dõi công thức tiểu cầu.'],
    brandVariants: [
      {
        variantName: 'Lovenox 40mg / 60mg / 80mg (Sanofi - Pháp)',
        manufacturer: 'Sanofi (Pháp)',
        ingredients: 'Enoxaparin sodium bơm tiêm định liều nạp sẵn',
        specialEffect: 'Tiêu chuẩn vàng chống đông đường tiêm dưới da phòng huyết khối mạch vành, phổi, tĩnh mạch chân và bảo vệ thai kỳ.'
      }
    ],
    referenceSources: ['ESC ACS & VTE Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'heparin-ufh',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'Tiêm truyền chống đông Heparin không phân đoạn (Lọc máu & Cấp cứu)',
    activeIngredient: 'Heparin sodium (Heparin chuẩn / UFH)',
    commonBrandNames: ['Heparin 25.000 UI/5ml', 'Heparin Leo'],
    indications: [
      'Chống đông tức thì trong can thiệp mạch vành qua da, phẫu thuật tim phổi nhân tạo, chạy thận nhân tạo (lọc máu)',
      'Thuyên tắc phổi nặng đe dọa tính mạng hoặc ở bệnh nhân suy thận nặng CrCl < 15 ml/phút (do không thải qua thận)'
    ],
    mechanismOfAction: 'Hoạt hóa Antithrombin III bất hoạt đồng thời yếu tố Xa và Thrombin (IIa), tác dụng tức thì sau tiêm tĩnh mạch và hết tác dụng nhanh sau 1-2 giờ khi ngưng.',
    standardDosage: 'Tiêm bolus tĩnh mạch 60-80 UI/kg, sau đó truyền liên tục 12-18 UI/kg/giờ chỉnh theo xét nghiệm aPTT (mục tiêu 1.5 - 2.5 lần chứng).',
    administration: 'Chỉ truyền tĩnh mạch qua bơm tiêm điện hoặc tiêm dưới da; giải độc khẩn cấp bằng Protamine Sulfate (1mg trung hòa 100 UI Heparin).',
    contraindications: ['Tiền sử giảm tiểu cầu do Heparin (HIT), đang xuất huyết nặng, tăng huyết áp ác tính chưa kiểm soát'],
    cautions: ['Xét nghiệm aPTT mỗi 6 giờ và kiểm tra số lượng tiểu cầu phát hiện sớm hội chứng HIT.'],
    referenceSources: ['CHEST Antithrombotic Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'vitamin-k1-injection',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'Tiêm giải độc quá liều thuốc chống đông & Phòng xuất huyết não sơ sinh',
    activeIngredient: 'Phytomenadione (Vitamin K1)',
    commonBrandNames: ['Vitamin K1 10mg/1ml', 'Vitamin K1 1mg/0.5ml (Sơ sinh)', 'Konakion MM'],
    indications: [
      'Dự phòng xuất huyết não - màng não ở mọi trẻ sơ sinh ngay sau đẻ (tiêm bắp 1mg)',
      'Giải độc quá liều thuốc chống đông kháng Vitamin K (Warfarin, Acenocoumarol/Sintrom) khi INR > 10 hoặc đang chảy máu',
      'Rối loạn đông máu do suy gan, tắc mật, thiếu Vitamin K'
    ],
    mechanismOfAction: 'Cung cấp co-factor Vitamin K1 giúp gan tổng hợp trở lại các yếu tố đông máu II, VII, IX, X.',
    standardDosage: 'Sơ sinh: 1mg tiêm bắp 1 liều duy nhất trong 6 giờ đầu sau sinh. Quá liều Sintrom/Warfarin có xuất huyết: 5 - 10mg truyền tĩnh mạch thật chậm (>= 30 phút).',
    administration: 'CẢNH BÁO: Tránh tiêm tĩnh mạch nhanh (nguy cơ phản vệ tử vong); ưu tiên uống hoặc truyền tĩnh mạch pha loãng chảy chậm >= 30 phút.',
    contraindications: ['Quá mẫn Phytomenadione'],
    cautions: ['Người mang van tim cơ học nếu quá liều nhẹ không chảy máu chỉ dùng Vitamin K1 liều rất nhỏ đường uống (1-2.5mg) để tránh kẹt van do mất tác dụng chống đông kéo dài nhiều ngày.'],
    referenceSources: ['ASH Anticoagulation Reversal Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'epoetin-injection',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'Tiêm kích thích tạo hồng cầu (Thiếu máu Suy Thận Mạn)',
    activeIngredient: 'Epoetin alfa / beta / Darbepoetin (EPO tái tổ hợp)',
    commonBrandNames: ['Eprex 2000 UI / 4000 UI', 'Epiao', 'Recormon', 'Mircera'],
    indications: [
      'Điều trị thiếu máu mạn tính có triệu chứng ở bệnh nhân Bệnh thận mạn (chạy thận nhân tạo hoặc chưa lọc máu)',
      'Thiếu máu do hóa trị ung thư'
    ],
    mechanismOfAction: 'Hormone Erythropoietin tái tổ hợp kích thích trực tiếp tế bào gốc dòng hồng cầu tại tủy xương tăng sinh và trưởng thành thành hồng cầu.',
    standardDosage: '50 - 100 UI/kg tiêm dưới da hoặc tiêm tĩnh mạch x 1 - 3 lần/tuần (giữ Hemoglobin mục tiêu 10 - 11.5 g/dL, KHÔNG đẩy vượt 12 g/dL).',
    administration: 'Bơm tiêm nạp sẵn tiêm dưới da; bảo quản ngăn mát tủ lạnh 2-8°C (tuyệt đối không lắc mạnh làm biến tính protein).',
    contraindications: ['Tăng huyết áp chưa kiểm soát', 'Bất sản hồng cầu đơn thuần (PRCA) do kháng thể kháng EPO'],
    cautions: ['BẮT BUỘC bổ sung đủ Sắt (Ferritin > 100-200 ng/mL, TSAT > 20%) thì EPO mới tạo máu hiệu quả; theo dõi huyết áp vì EPO hay làm tăng huyết áp.'],
    referenceSources: ['KDIGO Anemia in CKD Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'ppi-iv',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'Tiêm truyền ức chế bơm Proton cấp cứu Xuất Huyết Tiêu Hóa',
    activeIngredient: 'Esomeprazole / Pantoprazole (Lọ bột pha tiêm truyền 40mg)',
    commonBrandNames: ['Nexium IV 40mg', 'Pantoloc IV 40mg', 'Esomeprazol Kabi 40mg IV'],
    indications: [
      'Cấp cứu Xuất huyết tiêu hóa trên do loét dạ dày tá tràng (nôn ra máu, đi cầu phân đen) để giữ pH dạ dày > 6 giúp ổn định cục máu đông',
      'Dự phòng loét do stress tại hồi sức ICU hoặc bệnh nhân GERD nặng không uống được'
    ],
    mechanismOfAction: 'Ức chế ngay lập tức bơm H+/K+-ATPase trên toàn bộ tế bào thành dạ dày qua đường máu, ngăn acid và pepsin hòa tan cục máu đông đang bịt mạch máu ổ loét.',
    standardDosage: 'Xuất huyết tiêu hóa: Bolus tĩnh mạch 80mg trong 30 phút, sau đó truyền bơm tiêm điện liên tục 8 mg/giờ trong 72 giờ (hoặc 40mg IV mỗi 12 giờ sau cầm máu nội soi).',
    administration: 'Pha lọ 40mg với NaCl 0.9% tiêm chậm hoặc truyền TM tại bệnh viện.',
    contraindications: ['Quá mẫn PPI hoặc Benzimidazole'],
    cautions: ['Chuyển sang đường uống ngay khi bệnh nhân ăn uống lại được và nguy cơ tái xuất huyết đã qua; ưu tiên Pantoprazole IV nếu bệnh nhân đang dùng Clopidogrel.'],
    referenceSources: ['ACG Upper GI Bleeding Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'octreotide-injection',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'Tiêm cấp cứu Vỡ Giãn Tĩnh Mạch Thực Quản (Xơ gan xuất huyết)',
    activeIngredient: 'Octreotide acetate (Ống tiêm 0.1mg/1ml)',
    commonBrandNames: ['Sandostatin 0.1mg/1ml', 'Octreotide 0.1mg'],
    indications: [
      'Cấp cứu xuất huyết tiêu hóa do vỡ giãn tĩnh mạch thực quản - dạ dày ở bệnh nhân xơ gan tăng áp lực tĩnh mạch cửa',
      'Viêm tụy cấp nặng, rò tụy, tiêu chảy mất nước nặng do u nội tiết / hóa trị'
    ],
    mechanismOfAction: 'Chất tương tự Somatostatin tác dụng kéo dài, ức chế giải phóng các hormon giãn mạch tạng (Glucagon), làm co mạch tạng chọn lọc giúp giảm ngay áp lực tĩnh mạch cửa và giảm tiết dịch tụy.',
    standardDosage: 'Vỡ giãn TMTQ: Tiêm TM 50 mcg bolus, sau đó truyền liên tục 50 mcg/giờ trong 2 - 5 ngày kết hợp nội soi thắt tĩnh mạch và kháng sinh dự phòng.',
    administration: 'Dùng đường tiêm dưới da hoặc truyền bơm tiêm điện tại bệnh viện; bảo quản tủ lạnh 2-8°C.',
    contraindications: ['Quá mẫn Octreotide'],
    cautions: ['Theo dõi đường huyết (có thể gây hạ hoặc tăng đường huyết thoáng qua) và nhịp tim chậm.'],
    referenceSources: ['Baveno VII Portal Hypertension Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'ondansetron-injection',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'Tiêm chống nôn cấp cứu mạnh nhất (Không gây rối loạn ngoại tháp)',
    activeIngredient: 'Ondansetron HCl (Ống tiêm 4mg/2ml hoặc 8mg/4ml)',
    commonBrandNames: ['Zofran 4mg / 8mg', 'Ondansetron Kabi', 'Setron'],
    indications: [
      'Chống nôn cấp cứu do viêm dạ dày ruột nặng, nôn sau phẫu thuật (PONV), nôn do hóa trị/xạ trị ung thư'
    ],
    mechanismOfAction: 'Đối kháng chọn lọc thụ thể Serotonin 5-HT3 ở cả đầu tận dây thần kinh phế vị ruột non và vùng kích thích hóa thụ thể (CTZ) thân não.',
    standardDosage: 'Người lớn: 4mg - 8mg tiêm tĩnh mạch chậm (trong 2-5 phút) hoặc tiêm bắp mỗi 8 giờ.',
    administration: 'KHÔNG tiêm quá nhanh liều cao 16mg vì nguy cơ rối loạn nhịp tim; ưu việt hơn Primperan vì không gây cứng hàm/xoắn vặn ngoại tháp.',
    contraindications: ['Dùng đồng thời Apomorphine (gây tụt áp mất ý thức nặng)', 'Hội chứng khoảng QT kéo dài bẩm sinh'],
    cautions: ['Thận trọng nếu phối hợp với thuốc làm kéo dài QT khác (Amiodarone, Levofloxacin); có thể gây táo bón hoặc đau đầu nhẹ.'],
    referenceSources: ['ASCO Antiemetic Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'hyoscine-injection',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'Tiêm cắt cơn Đau Quặn Bụng, Đau Quặn Thận & Đường Mật',
    activeIngredient: 'Hyoscine butylbromide (Scopolamine butylbromide)',
    commonBrandNames: ['Buscopan 20mg/1ml ống tiêm', 'Spasmagil', 'Buscopan 10mg viên uống'],
    indications: [
      'Cắt nhanh cơn co thắt cơ trơn cấp tính đường tiêu hóa, cơn đau quặn mật, cơn đau quặn thận (phối hợp Diclofenac/Ketorolac)',
      'Giảm nhu động ruột khi chụp X-quang / nội soi tiêu hóa'
    ],
    mechanismOfAction: 'Đối kháng Muscarinic ngoại vi chuyên biệt trên đám rối thần kinh thành ruột và cơ trơn tạng rỗng (không qua hàng rào máu não nên không gây buồn ngủ).',
    standardDosage: 'Cơn đau quặn cấp: Tiêm bắp hoặc tiêm tĩnh mạch chậm 20mg (1 ống), có thể lặp lại sau 30 phút (tối đa 100mg/ngày).',
    administration: 'Tiêm tĩnh mạch chậm hoặc tiêm bắp; theo dõi nhịp tim.',
    contraindications: ['Bệnh nhược cơ, phình đại tràng nhiễm độc, tăng nhãn áp góc đóng, nhịp tim nhanh bệnh lý, bí tiểu do phì đại tuyến tiền liệt'],
    cautions: ['Thường gây khô miệng nhẹ và nhịp tim hơi nhanh thoáng qua sau mũi tiêm TM.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'BNF']
  },
  {
    id: 'oxytocin-injection',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'Tiêm Sản Khoa: Dự phòng & Cấp cứu Băng Huyết Sau Sinh',
    activeIngredient: 'Oxytocin (Ống tiêm 5 UI/1ml hoặc 10 UI/1ml)',
    commonBrandNames: ['Oxytocin 5 UI', 'Syntocinon'],
    indications: [
      'Xử trí tích cực giai đoạn 3 chuyển dạ dự phòng và điều trị Băng huyết sau sinh do đờ tử cung (khuyến cáo SỐ 1 của WHO)',
      'Khởi phát chuyển dạ hoặc thúc cơn co tử cung khi chuyển dạ đình trệ'
    ],
    mechanismOfAction: 'Kích thích thụ thể Oxytocin trên cơ trơn tử cung làm tăng co bóp nhịp nhàng và co hồi chặt tử cung bóp nghẹt các mạch máu vị trí nhau bám để cầm máu.',
    standardDosage: 'Phòng băng huyết sau sinh: Tiêm bắp 10 UI ngay sau khi sổ thai. Khởi phát chuyển dạ: pha 5 UI trong 500ml dịch truyền nhỏ giọt đếm giọt/bơm tiêm điện chỉnh theo cơn co.',
    administration: 'TUYỆT ĐỐI KHÔNG tiêm tĩnh mạch trực tiếp nguyên ống nhanh (gây tụt huyết áp trụy mạch nặng!); bảo quản tủ lạnh 2-8°C.',
    contraindications: ['Bất tương xứng khung chậu - thai nhi, ngôi thai bất thường, tiền sử mổ lấy thai nhiều lần/nguy cơ vỡ tử cung, suy thai cấp (trong khi chưa sinh)'],
    cautions: ['Khi truyền thúc đẻ phải theo dõi liên tục tim thai và cơn co tử cung bằng máy Monitoring sản khoa (cảnh giác cơn co cường tính và ngộ độc nước khi truyền liều rất cao).'],
    referenceSources: ['WHO PPH Prevention Guidelines', 'Hướng dẫn Sản Khoa Bộ Y Tế']
  },
  {
    id: 'thiamine-b1-injection',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'Tiêm Vitamin B1 liều cao (Cấp cứu Bệnh não Wernicke & Beriberi)',
    activeIngredient: 'Thiamine HCl (Vitamin B1 ống tiêm 100mg/1ml)',
    commonBrandNames: ['Vitamin B1 100mg ống tiêm', 'Thiamine 100mg/ml'],
    indications: [
      'Cấp cứu Bệnh não Wernicke / Hội chứng Korsakoff (lú lẫn, đi loạng choạng, rung giật nhãn cầu ở người nghiện rượu mạn hoặc nôn nghén nặng)',
      'Suy tim ẩm Beriberi, viêm đa dây thần kinh thiếu B1 nặng'
    ],
    mechanismOfAction: 'Là coenzyme bắt buộc (Thiamine Pyrophosphate) cho chu trình chuyển hóa Glucose tạo năng lượng ATP của tế bào thần kinh não.',
    standardDosage: 'Nghi ngờ bệnh não Wernicke: 200 - 500mg truyền tĩnh mạch chậm (trong 30 phút) x 3 lần/ngày trong 3-5 ngày.',
    administration: 'QUY TẮC CẤP CỨU: Ở người nghiện rượu/suy kiệt, PHẢI TIÊM VITAMIN B1 TRƯỚC KHI TRUYỀN ĐƯỜNG GLUCOSE vì truyền Glucose trước sẽ tiêu cạn kiệt lượng B1 ít ỏi còn lại và kích hoạt tổn thương não vĩnh viễn!',
    contraindications: ['Tiền sử sốc phản vệ với Vitamin B1 dạng tiêm'],
    cautions: ['Dù rất hiếm nhưng có thể gây phản vệ khi tiêm tĩnh mạch nhanh -> pha loãng truyền chậm 30 phút và sẵn sàng hộp chống sốc.'],
    referenceSources: ['EFNS Wernicke Encephalopathy Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'cerebrolysin-iv',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'Tiêm truyền Peptid bảo vệ tế bào thần kinh (Đột quỵ & Chấn thương não)',
    activeIngredient: 'Cerebrolysin (Hỗn hợp Peptid dinh dưỡng thần kinh trọng lượng thấp)',
    commonBrandNames: ['Cerebrolysin 5ml / 10ml / 20ml', 'Cerebrovin'],
    indications: [
      'Phục hồi chức năng vận động và nhận thức sau đột quỵ thiếu máu não cấp, chấn thương sọ não',
      'Sa sút trí tuệ mạch máu và bệnh Alzheimer'
    ],
    mechanismOfAction: 'Cung cấp các đoạn peptid giống yếu tố dinh dưỡng thần kinh (BDNF/NGF) đi qua hàng rào máu não, bảo vệ neuron khỏi chết theo chương trình và thúc đẩy tái tạo synap thần kinh.',
    standardDosage: 'Đột quỵ / Chấn thương sọ não: 20 - 30ml (tới 50ml) pha trong 100ml NaCl 0.9% truyền tĩnh mạch chậm trong 15 - 60 phút x 1 lần/ngày trong 10 - 21 ngày.',
    administration: 'Liều <= 5ml có thể tiêm bắp; liều >= 10ml pha truyền tĩnh mạch chậm tại cơ sở y tế.',
    contraindications: ['Động kinh nặng hoặc trạng thái động kinh (có thể làm tăng tần suất co giật)', 'Suy thận nặng', 'Quá mẫn Cerebrolysin'],
    cautions: ['Không truyền quá nhanh vì có thể gây cảm giác nóng bừng, chóng mặt hoặc sốt nhẹ thoáng qua.'],
    referenceSources: ['EAN Neurorehabilitation Guidelines', 'Vidal Việt Nam']
  },
  {
    id: 'sat-vat-tetanus',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'Tiêm Huyết Thanh & Vắc Xin phòng Uốn Ván khẩn cấp (Vết thương hở)',
    activeIngredient: 'Huyết thanh kháng độc tố uốn ván (SAT) + Giải độc tố uốn ván (VAT)',
    commonBrandNames: ['SAT 1500 UI (Huyết thanh)', 'Vắc xin VAT (TT)', 'Tetagam P (TIG người 250 UI)'],
    indications: [
      'Dự phòng khẩn cấp bệnh uốn ván khi bị vết thương hở bẩn dính đất cát, dẫm đinh gỉ sét, tai nạn giao thông, súc vật cắn hoặc bỏng sâu'
    ],
    mechanismOfAction: 'SAT / TIG cung cấp kháng thể thụ động trung hòa ngay độc tố uốn ván lưu hành (hiệu lực tức thì 2-3 tuần); Vắc xin VAT kích thích cơ thể tự tạo miễn dịch chủ động lâu dài.',
    standardDosage: 'Vết thương có nguy cơ uốn ván (chưa tiêm đủ VAT trong 5-10 năm qua): Tiêm SAT 1500 UI (1 ống) tiêm bắp + Tiêm đồng thời 1 mũi vắc xin VAT 0.5ml ở vị trí cánh tay đối diện (dùng 2 bơm tiêm riêng biệt).',
    administration: 'BẮT BUỘC làm test lẩy da giải mẫn cảm (Besredka) trước khi tiêm SAT từ ngựa vì tỷ lệ dị ứng phản vệ cao; theo dõi tại phòng tiêm ít nhất 30 phút.',
    contraindications: ['Tiền sử dị ứng nặng huyết thanh ngựa (chuyển sang dùng Globulin miễn dịch uốn ván người Tetagam P 250 UI nếu có sẵn)'],
    cautions: ['Không tiêm SAT và vắc xin VAT vào cùng một bên tay hay trộn chung một bơm kim tiêm vì kháng thể SAT sẽ trung hòa luôn vắc xin!'],
    referenceSources: ['Hướng dẫn Tiêm Chủng Bộ Y Tế', 'CDC Tetanus Prophylaxis']
  },
  {
    id: 'iv-fluids-albumin',
    category: 'J',
    categoryName: 'J. Thuốc Tiêm Chích, Truyền Tĩnh Mạch & Cấp Cứu Lâm Sàng',
    groupName: 'Dịch truyền đẳng trương & Dung dịch keo Hồi sức (NaCl 0.9%, Ringer Lactate, Albumin)',
    activeIngredient: 'Natri Clorid 0.9% / Ringer Lactate / Human Albumin 20%',
    commonBrandNames: ['Natri Clorid 0.9% 500ml', 'Ringer Lactate 500ml', 'Human Albumin 20% 50ml / 100ml'],
    indications: [
      'NaCl 0.9% / Ringer Lactate: Bù dịch cấp cứu mất nước, tụt huyết áp, sốc giảm thể tích, bỏng, sốt xuất huyết nặng, làm dung môi pha thuốc tiêm truyền',
      'Human Albumin 20%: Bù Albumin máu giảm nặng (< 20-25 g/L), cổ trướng xơ gan chọc tháo dịch lượng lớn (> 5 lít), hội chứng gan thận, sốc giảm áp lực keo'
    ],
    mechanismOfAction: 'Dịch tinh thể đẳng trương nhanh chóng mở rộng thể tích lòng mạch và khoang kẽ; Albumin 20% tăng áp lực keo huyết tương kéo dịch phù từ mô kẽ và ổ bụng vào lại mạch máu.',
    standardDosage: 'Bù dịch sốc: bolus 500ml Ringer Lactate/NaCl 0.9% đánh giá lại đáp ứng. Chọc tháo cổ trướng xơ gan: truyền 6 - 8g Albumin cho mỗi 1 lít dịch cổ trướng rút ra (nếu rút >= 5 lít).',
    administration: 'Truyền tĩnh mạch có kiểm soát tốc độ; thận trọng quá tải dịch gây phù phổi cấp ở người suy tim hoặc vô niệu.',
    contraindications: [
      'Phù phổi cấp sung huyết, suy tim mất bù nặng, suy thận vô niệu (không truyền dịch tràn lan)',
      'Ringer Lactate: Tăng Kali máu nặng hoặc không truyền chung dây truyền với máu chứa Citrate'
    ],
    cautions: ['Không tự ý truyền dịch tại nhà khi mệt mỏi thông thường vì nguy cơ sốc phản vệ, nhiễm khuẩn huyết và quá tải tuần hoàn phổi.'],
    referenceSources: ['NICE IV Fluid Therapy Guidelines', 'EASL Cirrhosis Guidelines']
  }
];
