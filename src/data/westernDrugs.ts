export interface DrugCombinationProtocol {
  diseaseName: string;
  combinedWith: string[];
  clinicalRationale: string;
}

export interface BrandVariant {
  variantName: string;
  manufacturer: string;
  ingredients: string;
  specialEffect: string;
}

export interface WesternDrug {
  id: string;
  category: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  categoryName: string;
  groupName: string;
  activeIngredient: string;
  commonBrandNames: string[];
  indications: string[];
  mechanismOfAction: string;
  standardDosage: string;
  administration: string;
  contraindications: string[];
  cautions: string[];
  brandVariants?: BrandVariant[];
  combinationProtocols?: DrugCombinationProtocol[];
  referenceSources: string[];
}

export const WESTERN_DRUGS_DATABASE: WesternDrug[] = [
  // --- NHÓM A: Chứng Đau, Sốt, Viêm & Cơ Xương Khớp ---
  {
    id: 'paracetamol',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Hạ sốt, giảm đau thông thường',
    activeIngredient: 'Paracetamol (Acetaminophen)',
    commonBrandNames: ['Panadol', 'Efferalgan', 'Hapacol', 'Tylenol', 'Panadol Extra', 'Decolgen', 'Alaxan'],
    indications: ['Hạ sốt do nhiễm khuẩn, siêu vi, sau tiêm chủng', 'Giảm đau đầu, đau răng, đau mỏi cơ xương khớp, đau bụng kinh nhẹ - vừa'],
    mechanismOfAction: 'Ức chế tổng hợp Prostaglandin tại hệ thần kinh trung ương (ức chế chọn lọc enzym COX trung ương) và tác động lên trung tâm điều nhiệt ở vùng dưới đồi.',
    standardDosage: 'Người lớn: 500mg - 1000mg / lần, cách mỗi 4 - 6 giờ. Tối đa không quá 4g/24 giờ.',
    administration: 'Uống sau bữa ăn hoặc khi đau sốt. Dạng sủi: hòa tan 150ml nước ấm.',
    contraindications: ['Suy gan nặng, viêm gan cấp tính', 'Thiếu hụt men G6PD'],
    cautions: ['Không uống rượu bia khi dùng thuốc do tăng hoại tử tế bào gan.'],
    brandVariants: [
      {
        variantName: '1. Biệt Dược Panadol (GSK - Anh Quốc)',
        manufacturer: 'GlaxoSmithKline (GSK)',
        ingredients: 'Paracetamol 500mg (Panadol Xanh) / Paracetamol 500mg + Caffeine 65mg (Panadol Extra Đỏ) / Phenylephrine 5mg (Panadol Cảm Cúm Xanh Lá)',
        specialEffect: 'Panadol Extra tăng hiệu quả giảm đau 30% nhờ Caffeine. Panadol Cảm Cúm thêm Phenylephrine chống nghẹt mũi. Công nghệ Optizorb tan viên thuốc trong 5 phút.'
      },
      {
        variantName: '2. Biệt Dược Efferalgan (UPSA - Pháp)',
        manufacturer: 'UPSA (Pháp)',
        ingredients: 'Efferalgan 500mg Viên Sủi / Efferalgan Codeine (Paracetamol 500mg + Codein Phosphate 30mg)',
        specialEffect: 'Dạng sủi bọt tan nhanh trong 150ml nước giúp hấp thu cực nhanh. Dạng Efferalgan Codeine phối hợp giảm đau trung ương mạnh cho đau đợt cấp, đau sau phẫu thuật.'
      },
      {
        variantName: '3. Biệt Dược Hapacol (DHG Pharma - Việt Nam)',
        manufacturer: 'Dược Hậu Giang (DHG Pharma)',
        ingredients: 'Hapacol 650mg / Hapacol Extra / Hapacol 250 - 150 (Gói Bột Trẻ Em)',
        specialEffect: 'Hapacol 650mg tối ưu liều cho thể trọng người Việt (50-65kg). Dạng gói sủi bọt hương cam ngọt nhẹ chuyên dùng cho trẻ em sốt mọc răng, sốt siêu vi.'
      },
      {
        variantName: '4. Biệt Dược Tylenol (Johnson & Johnson - Mỹ)',
        manufacturer: 'Kenvue / Johnson & Johnson (Mỹ)',
        ingredients: 'Acetaminophen (Paracetamol) 500mg (Tylenol Extra Strength)',
        specialEffect: 'Thương hiệu giảm đau hạ sốt bán chạy số 1 tại Mỹ. Tác dụng êm dịu tuyệt đối với niêm mạc dạ dày, thích hợp cho người có tiền sử viêm loét.'
      },
      {
        variantName: '5. Biệt Dược Decolgen (United Pharma)',
        manufacturer: 'United Pharma',
        ingredients: 'Paracetamol 500mg + Phenylephrine HCl 10mg + Chlorpheniramine Maleate 2mg (Decolgen Forte 3 màu)',
        specialEffect: 'Thuốc điều trị cảm cúm phối hợp 3 tác dụng: Paracetamol hạ sốt giảm đau + Phenylephrine co mạch thông mũi + Chlorpheniramine cắt cơn hắt hơi chảy nước mũi.'
      },
      {
        variantName: '6. Biệt Dược Alaxan (United Pharma)',
        manufacturer: 'United Pharma',
        ingredients: 'Paracetamol 325mg + Ibuprofen 200mg (Alaxan FR Viên Đỏ Trắng)',
        specialEffect: 'Phối hợp giảm đau kép 2 cơ chế (Paracetamol trung ương + Ibuprofen ngoại vi), trị đau nhức cơ xương khớp, căng cơ cấp tính và đau răng nặng.'
      }
    ],
    combinationProtocols: [
      {
        diseaseName: 'Cảm cúm sốt cao kèm đau nhức thân mình',
        combinedWith: ['Ibuprofen 400mg', 'Vitamin C 500mg'],
        clinicalRationale: 'Phối hợp hạ sốt hai cơ chế trung ương (Paracetamol) và ngoại vi (Ibuprofen) giúp hạ nhiệt êm dịu.'
      },
      {
        diseaseName: 'Đau đầu căng thẳng, đau dây thần kinh',
        combinedWith: ['Caffeine 65mg (Panadol Extra)', 'Codein 30mg (Efferalgan Codeine)'],
        clinicalRationale: 'Caffeine làm co mạch não bị giãn, tăng hiệu đồng công giảm đau của Paracetamol lên 30%.'
      }
    ],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'Goodman & Gilman’s', 'Tra Cứu Thuốc 100.000 Biệt Dược']
  },
  {
    id: 'ibuprofen',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Kháng viêm không steroid (NSAID dẫn xuất Axit Propionic)',
    activeIngredient: 'Ibuprofen',
    commonBrandNames: ['Gofen', 'Advil', 'Brufen', 'Alaxan', 'Ibuprofen 400mg'],
    indications: ['Hạ sốt kháng viêm', 'Đau răng, đau bụng kinh, đau chấn thương phần mềm', 'Viêm khớp gối, viêm gân'],
    mechanismOfAction: 'Ức chế không chọn lọc COX-1 và COX-2, làm giảm tổng hợp Prostaglandin E2 và F2a.',
    standardDosage: '200mg - 400mg x 3 lần/ngày sau ăn.',
    administration: 'Uống ngay sau khi ăn no với 1 ly nước đầy.',
    contraindications: ['Loét dạ dày tiến triển', 'Suy thận nặng', 'Phụ nữ có thai 3 tháng cuối'],
    cautions: ['Thận trọng ở bệnh nhân có tiền sử đau dạ dày, hen phế quản.'],
    brandVariants: [
      {
        variantName: 'Gofen 400mg (Nang Mềm Clearcap)',
        manufacturer: 'Mega We Care',
        ingredients: 'Ibuprofen 400mg dạng dung dịch lỏng trong viên nang mềm',
        specialEffect: 'Dịch lỏng hấp thu nhanh hơn viên nén gấp 2 lần, cắt cơn đau sưng răng và đau bụng kinh tức thì.'
      },
      {
        variantName: 'Advil Liqui-Gels (Mỹ)',
        manufacturer: 'Haleon / Pfizer (Mỹ)',
        ingredients: 'Solubilized Ibuprofen 200mg',
        specialEffect: 'Thương hiệu NSAID bán chạy hàng đầu thế giới, giảm sưng viêm dây thần kinh hiệu quả.'
      },
      {
        variantName: 'Brufen Syrup (Dạng Si-rô)',
        manufacturer: 'Abbott',
        ingredients: 'Ibuprofen 100mg/5ml',
        specialEffect: 'Dạng si-rô ngọt mát cho trẻ em sốt cao không đáp ứng Paracetamol.'
      },
      {
        variantName: 'Alaxan FR (Viên Phối Hợp)',
        manufacturer: 'United Pharma',
        ingredients: 'Ibuprofen 200mg + Paracetamol 325mg',
        specialEffect: 'Phối hợp tác dụng giảm đau trung ương và chống viêm ngoại vi mạnh mẽ.'
      }
    ],
    combinationProtocols: [
      {
        diseaseName: 'Đau nhức răng cấp tính / Sưng nướu',
        combinedWith: ['Amoxicillin 500mg', 'Paracetamol 500mg'],
        clinicalRationale: 'Ibuprofen chống sưng viêm dây thần kinh quanh răng, Amoxicillin diệt vi khuẩn ổ mủ.'
      }
    ],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'Lippincott Illustrated Reviews']
  },
  {
    id: 'diclofenac',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Kháng viêm không steroid mạnh (NSAID dẫn xuất Phenylacetic)',
    activeIngredient: 'Diclofenac Sodium / Potassium',
    commonBrandNames: ['Voltaren', 'Cataflam', 'Diclofenac 50mg', 'Voltaren Emulgel'],
    indications: ['Đợt cấp viêm khớp dạng thấp, Gout cấp', 'Cơn đau quặn thận, đau sau phẫu thuật'],
    mechanismOfAction: 'Ức chế mạnh COX-1 và COX-2, giảm phóng thích leucotriene tại ổ viêm.',
    standardDosage: '50mg x 2 - 3 lần/ngày hoặc Voltaren 75mg tiêm bắp.',
    administration: 'Uống trong hoặc sau bữa ăn no.',
    contraindications: ['Loét dạ dày tá tràng tiến triển', 'Suy tim sung huyết nặng'],
    cautions: ['Nguy cơ biến cố tim mạch khi dùng liều cao dài ngày.'],
    brandVariants: [
      {
        variantName: 'Voltaren 50mg / 75mg (Novartis - Thụy Sĩ)',
        manufacturer: 'Novartis (Thụy Sĩ)',
        ingredients: 'Diclofenac Sodium 50mg / 75mg viên nén bao tan trong ruột',
        specialEffect: 'Dạng muối Natri giải phóng kéo dài, tác dụng chống viêm khớp sưng đau sâu mạn tính.'
      },
      {
        variantName: 'Cataflam 25mg / 50mg (Novartis)',
        manufacturer: 'Novartis (Thụy Sĩ)',
        ingredients: 'Diclofenac Potassium (Diclofenac Kali) 25mg / 50mg',
        specialEffect: 'Dạng muối Kali tan và hòa tan cực nhanh, khởi phát tác dụng giảm đau trong 15-30 phút.'
      },
      {
        variantName: 'Voltaren Emulgel 1.16%',
        manufacturer: 'Haleon / GSK',
        ingredients: 'Diclofenac Diethylamine gel 1.16%',
        specialEffect: 'Gel bôi ngoài da thấm trực tiếp qua màng bao khớp, giảm đau tại chỗ không hại dạ dày.'
      }
    ],
    referenceSources: ['Giáo Trình Dược Lý Học BYT', 'Goodman & Gilman’s']
  },
  {
    id: 'meloxicam',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Kháng viêm ưu thế chọn lọc COX-2 (Oxicam)',
    activeIngredient: 'Meloxicam',
    commonBrandNames: ['Mobic', 'Melocox', 'Camrox', 'Mobium'],
    indications: ['Thoái hóa khớp gối, cột sống thắt lưng', 'Viêm cột sống dính khớp', 'Viêm khớp dạng thấp'],
    mechanismOfAction: 'Ưu tiên ức chế chọn lọc enzym COX-2 hơn COX-1, giảm tổng hợp prostaglandin tại bao hoạt dịch.',
    standardDosage: '7.5mg - 15mg x 1 lần/ngày.',
    administration: 'Uống ngay sau bữa ăn no.',
    contraindications: ['Loét dạ dày tá tràng tiến triển', 'Suy tim nặng, suy thận nặng'],
    cautions: ['Bắt buộc dùng kèm PPI nếu có tiền sử loét dạ dày.'],
    brandVariants: [
      {
        variantName: 'Mobic 7.5mg / 15mg (Boehringer Ingelheim - Đức)',
        manufacturer: 'Boehringer Ingelheim (Đức)',
        ingredients: 'Meloxicam 7.5mg / 15mg',
        specialEffect: 'Biệt dược gốc chuẩn Đức. Dùng 1 lần duy nhất trong ngày, bảo vệ niêm mạc dạ dày tốt hơn NSAID cổ điển.'
      }
    ],
    combinationProtocols: [
      {
        diseaseName: 'Thoái hóa khớp gối đau cấp tính',
        combinedWith: ['Nexium 20mg (Esomeprazole)', 'Glucosamine 1500mg', 'Myonal 50mg'],
        clinicalRationale: 'Meloxicam giảm viêm khớp cấp, Nexium bảo vệ dạ dày, Myonal giãn cơ.'
      }
    ],
    referenceSources: ['Dược lý học - ĐH Y Hà Nội', 'Katzung Basic & Clinical Pharmacology']
  },
  {
    id: 'celecoxib',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Kháng viêm chuyên biệt COX-2 (ít hại dạ dày)',
    activeIngredient: 'Celecoxib',
    commonBrandNames: ['Celebrex', 'Cadicef', 'Celosti', 'Cobix'],
    indications: ['Thoái hóa khớp', 'Viêm khớp dạng thấp', 'Đau cấp tính chấn thương'],
    mechanismOfAction: 'Ức chế chọn lọc chuyên biệt enzym COX-2, bảo tồn COX-1 ở niêm mạc dạ dày.',
    standardDosage: '200mg x 1 lần/ngày hoặc 100mg x 2 lần/ngày.',
    administration: 'Uống sau bữa ăn no.',
    contraindications: ['Tiền sử dị ứng Sulfonamid', 'Bệnh tim thiếu máu cục bộ, tiền sử đột quỵ'],
    cautions: ['Thận trọng ở bệnh nhân có tiền sử tim mạch.'],
    brandVariants: [
      {
        variantName: 'Celebrex 200mg (Pfizer - Mỹ)',
        manufacturer: 'Pfizer (Mỹ)',
        ingredients: 'Celecoxib 200mg nang cứng',
        specialEffect: 'Biệt dược gốc chọn lọc COX-2 hàng đầu thế giới, giảm thiểu tác tác dụng phụ gây viêm loét xuất huyết dạ dày.'
      }
    ],
    referenceSources: ['DiPiro Pharmacotherapy', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'methylprednisolone',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Kháng viêm Corticoid mạnh',
    activeIngredient: 'Methylprednisolone',
    commonBrandNames: ['Medrol', 'Solu-Medrol', 'Metilpred'],
    indications: ['Đợt cấp viêm khớp dạng thấp', 'Viêm dây thần kinh, liệt mặt Bell’s Palsy', 'Hen suyễn cấp, sốc phản vệ'],
    mechanismOfAction: 'Ức chế phospholipase A2 qua lipocortin-1, ngăn giải phóng acid arachidonic và cytokin gây viêm.',
    standardDosage: '4mg - 16mg/ngày uống 8h sáng.',
    administration: 'Uống 1 liều duy nhất vào 8h sáng sau ăn no.',
    contraindications: ['Nhiễm nấm toàn thân', 'Đang tiêm vaccin virus sống'],
    cautions: ['Không ngừng thuốc đột ngột khi dùng trên 2 tuần.'],
    brandVariants: [
      {
        variantName: 'Medrol 4mg / 16mg (Pfizer - Ý)',
        manufacturer: 'Pfizer (Ý)',
        ingredients: 'Methylprednisolone 4mg / 16mg viên nén',
        specialEffect: 'Viên nén định liều chuẩn dùng trong phác đồ giảm liều dần điều trị viêm dây thần kinh và đợt cấp viêm khớp.'
      },
      {
        variantName: 'Solu-Medrol 40mg / 125mg / 500mg Tiêm Truyền',
        manufacturer: 'Pfizer',
        ingredients: 'Methylprednisolone Sodium Succinate',
        specialEffect: 'Dạng tiêm tĩnh mạch cấp cứu chống sốc phản vệ, đợt cấp hen phế quản nặng.'
      }
    ],
    combinationProtocols: [
      {
        diseaseName: 'Liệt dây thần kinh VII ngoại biên cấp (Bell’s Palsy)',
        combinedWith: ['Acyclovir 800mg x 5', 'Methycobal 500mcg', 'Nexium 20mg'],
        clinicalRationale: 'Methylprednisolone giảm phù rễ thần kinh, Acyclovir diệt HSV tái hoạt.'
      }
    ],
    referenceSources: ['BV Bạch Mai', 'Goodman & Gilman’s', 'Cẩm Nang MIMS']
  },
  {
    id: 'prednisolone',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Kháng viêm Glucocorticoid trung bình',
    activeIngredient: 'Prednisolone',
    commonBrandNames: ['Prednisolon 5mg', 'Solupred 20mg', 'Prednisone'],
    indications: ['Viêm khớp, dị ứng nặng, bệnh tự miễn lupus, hen phế quản đợt cấp'],
    mechanismOfAction: 'Gắn thụ thể nhân tế bào, ức chế transcription gen cytokine viêm.',
    standardDosage: '5mg - 60mg/ngày tùy mức độ bệnh.',
    administration: 'Uống buổi sáng sau ăn.',
    contraindications: ['Nhiễm trùng chưa kiểm soát'],
    cautions: ['Theo dõi đường huyết và mật độ xương.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'colchicine',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Bệnh Gout (Thống phong) cấp tính',
    activeIngredient: 'Colchicine',
    commonBrandNames: ['Colchicine Stella', 'Colchimax'],
    indications: ['Cắt cơn Gout cấp tính', 'Dự phòng đợt cấp khi bắt đầu Allopurinol/Febuxostat'],
    mechanismOfAction: 'Gắn vào tubulin ngăn cản trùng hợp vi ống, ức chế sự di chuyển của bạch cầu.',
    standardDosage: 'Cơn cấp: 1mg ngay khi khởi phát, sau 1 giờ uống thêm 0.5mg.',
    administration: 'Uống sau ăn no với nhiều nước.',
    contraindications: ['Suy thận nặng (eGFR < 30)', 'Suy gan nặng'],
    cautions: ['Theo dõi tác dụng phụ tiêu chảy.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'BNF']
  },
  {
    id: 'allopurinol',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Hạ Acid Uric máu điều trị Gout mạn',
    activeIngredient: 'Allopurinol',
    commonBrandNames: ['Zyloric', 'Allopurinol 100mg', 'Allopurinol 300mg'],
    indications: ['Tăng acid uric máu mạn tính ở bệnh nhân Gout', 'Dự phòng sỏi urat thận'],
    mechanismOfAction: 'Ức chế enzym Xanthine Oxidase, ngăn chuyển Hypoxanthine thành Acid Uric.',
    standardDosage: '100mg - 300mg x 1 lần/ngày sau ăn.',
    administration: 'Uống sau bữa ăn với nhiều nước (2-3 lít/ngày).',
    contraindications: ['Dị ứng nặng với Allopurinol (hội chứng DRESS/SCAR)'],
    cautions: ['Dùng kèm Colchicine dự phòng trong 3-6 tháng đầu.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'DiPiro Pharmacotherapy']
  },
  {
    id: 'febuxostat',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Hạ Acid Uric thế hệ mới (Non-purine)',
    activeIngredient: 'Febuxostat',
    commonBrandNames: ['Feburic', 'Zurig', 'Febustat'],
    indications: ['Tăng acid uric máu mạn tính ở bệnh nhân Gout không dung nạp Allopurinol'],
    mechanismOfAction: 'Ức chế chọn lọc non-purine mạnh trên Xanthine Oxidase.',
    standardDosage: '40mg - 80mg x 1 lần/ngày.',
    administration: 'Uống không phụ thuộc bữa ăn.',
    contraindications: ['Bệnh tim thiếu máu cục bộ nặng'],
    cautions: ['Theo dõi tim mạch.'],
    referenceSources: ['Goodman & Gilman’s', 'Cẩm Nang MIMS']
  },
  {
    id: 'gabapentin',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Đau thần kinh chuyên biệt (thần kinh tọa, Zona)',
    activeIngredient: 'Gabapentin',
    commonBrandNames: ['Neurontin', 'Gabantin', 'Neugaba'],
    indications: ['Đau thần kinh tọa rễ L4-L5-S1', 'Đau dây thần kinh sau Zona', 'Đau dây V'],
    mechanismOfAction: 'Gắn tiểu đơn vị alpha-2-delta kênh Calci neuron trung ương, giảm Glutamate.',
    standardDosage: 'Khởi đầu 300mg/ngày, tăng dần đến 300mg x 3 lần/ngày.',
    administration: 'Uống nguyên viên cùng hoặc không cùng thức ăn.',
    contraindications: ['Quá mẫn Gabapentin'],
    cautions: ['Chỉnh liều ở bệnh nhân suy thận.'],
    referenceSources: ['The Washington Manual', 'DiPiro Pharmacotherapy']
  },
  {
    id: 'pregabalin',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Đau thần kinh & Rối loạn lo âu thế hệ mới',
    activeIngredient: 'Pregabalin',
    commonBrandNames: ['Lyrica', 'Pregabalin 75mg', 'Prelica'],
    indications: ['Đau thần kinh do đái tháo đường, Zona, chèn ép tủy thắt lưng', 'Rối loạn lo âu lan tỏa (GAD)'],
    mechanismOfAction: 'Ái lực cao với kênh Calci alpha-2-delta, ức chế giải phóng chất dẫn truyền thần kinh đau.',
    standardDosage: '75mg - 150mg x 2 lần/ngày.',
    administration: 'Uống không phụ thuộc bữa ăn.',
    contraindications: ['Quá mẫn Pregabalin'],
    cautions: ['Có thể gây chóng mặt, buồn ngủ nhẹ khi mới bắt đầu.'],
    referenceSources: ['BNF', 'Goodman & Gilman’s']
  },

  // --- NHÓM B: Bệnh Lý Tiêu Hóa - Dạ Dày - Gan Mật ---
  {
    id: 'esomeprazole',
    category: 'B',
    categoryName: 'B. Bệnh Lý Tiêu Hóa - Dạ Dày - Gan Mật',
    groupName: 'Ức chế bơm proton (PPI thế hệ mới)',
    activeIngredient: 'Esomeprazole',
    commonBrandNames: ['Nexium', 'Esomez', 'Amebazol', 'Nexpro'],
    indications: ['Trào ngược dạ dày thực quản (GERD)', 'Viêm loét dạ dày tá tràng', 'Diệt vi khuẩn H. pylori'],
    mechanismOfAction: 'Ức chế H+/K+-ATPase tại tế bào thành dạ dày.',
    standardDosage: '20mg - 40mg x 1 lần/ngày.',
    administration: 'Uống trước ăn sáng 30 - 60 phút, nuốt nguyên viên.',
    contraindications: ['Quá mẫn PPI'],
    cautions: ['Dùng dài ngày bổ sung B12, Canxi.'],
    brandVariants: [
      {
        variantName: '1. Nexium MUPS 20mg / 40mg (AstraZeneca - Thụy Điển)',
        manufacturer: 'AstraZeneca (Thụy Điển)',
        ingredients: 'Esomeprazole vi hạt kháng acid dạ dày',
        specialEffect: 'Biệt dược gốc MUPS chứa hạt vi nang tan tại ruột, bảo vệ thuốc không bị acid dạ dày phân hủy, chống trào ngược GERD mạnh mẽ.'
      },
      {
        variantName: '2. Esomez / Nexpro / Amebazol',
        manufacturer: 'Các hãng Dược phẩm Việt Nam & Quốc tế',
        ingredients: 'Esomeprazole Magnesium 20mg / 40mg',
        specialEffect: 'Dạng tương đương sinh học giá thành hợp lý hơn cho đợt điều trị viêm loét kéo dài 4-8 tuần.'
      }
    ],
    combinationProtocols: [
      {
        diseaseName: 'Phác đồ 4 thuốc diệt vi khuẩn H. pylori',
        combinedWith: ['Amoxicillin 1000mg x 2', 'Clarithromycin 500mg x 2', 'Bismuth 120mg x 4'],
        clinicalRationale: 'Nexium nâng pH > 6 để kháng sinh đạt hiệu lực tối đa.'
      }
    ],
    referenceSources: ['Dược lâm sàng ĐH Y Dược', 'BNF', 'Dược Thư QG']
  },
  {
    id: 'omeprazole',
    category: 'B',
    categoryName: 'B. Bệnh Lý Tiêu Hóa - Dạ Dày - Gan Mật',
    groupName: 'Ức chế bơm proton (PPI cổ điển)',
    activeIngredient: 'Omeprazole',
    commonBrandNames: ['Losec', 'Omez', 'Omeprazol 20mg'],
    indications: ['Viêm loét dạ dày tá tràng', 'Hội chứng Zollinger-Ellison'],
    mechanismOfAction: 'Ức chế bơm H+/K+-ATPase ở tế bào thành dạ dày.',
    standardDosage: '20mg x 1 - 2 lần/ngày trước ăn sáng.',
    administration: 'Nuốt nguyên viên trước ăn 30 phút.',
    contraindications: ['Quá mẫn omeprazole'],
    cautions: ['Thận trọng khi dùng cùng Clopidogrel.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'pantoprazole',
    category: 'B',
    categoryName: 'B. Bệnh Lý Tiêu Hóa - Dạ Dày - Gan Mật',
    groupName: 'Ức chế bơm proton (PPI ít tương tác nhất)',
    activeIngredient: 'Pantoprazole',
    commonBrandNames: ['Pantoloc', 'Controloc', 'Panocid'],
    indications: ['Viêm loét dạ dày tá tràng, GERD', 'An toàn khi dùng chung Clopidogrel/Aspirin'],
    mechanismOfAction: 'Ức chế bơm proton tế bào thành dạ dày ít ảnh hưởng hệ CYP450.',
    standardDosage: '40mg x 1 lần/ngày.',
    administration: 'Uống trước bữa ăn 30 phút.',
    contraindications: ['Quá mẫn pantoprazole'],
    cautions: ['Thuốc ưu tiên cho bệnh nhân dùng Clopidogrel.'],
    referenceSources: ['DiPiro Pharmacotherapy', 'MIMS']
  },
  {
    id: 'rabeprazole',
    category: 'B',
    categoryName: 'B. Bệnh Lý Tiêu Hóa - Dạ Dày - Gan Mật',
    groupName: 'Ức chế bơm proton (PPI tác dụng cực nhanh)',
    activeIngredient: 'Rabeprazole Sodium',
    commonBrandNames: ['Pariet', 'Rabeloc', 'Rabeprazol 20mg'],
    indications: ['GERD trào ngược dạ dày, cắt cơn đau nóng rát thượng vị tức thì'],
    mechanismOfAction: 'Chuyển hóa nhanh nhất thành dạng có hoạt tính ức chế bơm H+/K+-ATPase.',
    standardDosage: '20mg x 1 lần/ngày.',
    administration: 'Uống trước ăn sáng 30 phút.',
    contraindications: ['Quá mẫn rabeprazole'],
    cautions: ['An toàn ở bệnh nhân suy thận.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'phosphalugel',
    category: 'B',
    categoryName: 'B. Bệnh Lý Tiêu Hóa - Dạ Dày - Gan Mật',
    groupName: 'Trung hòa acid & Bao phủ niêm mạc dạ dày',
    activeIngredient: 'Nhôm phosphat (Aluminum phosphate gel 20%)',
    commonBrandNames: ['Phosphalugel (Gói P vàng)', 'Gastergel'],
    indications: ['Cắt cơn đau dạ dày tức thì, ợ chua, nóng rát thượng vị'],
    mechanismOfAction: 'Trung hòa HCl dạ dày, tạo màng gel nhầy bảo vệ niêm mạc.',
    standardDosage: '1 - 2 gói x 2 - 3 lần/ngày khi có cơn đau.',
    administration: 'Uống trực tiếp hoặc pha chút nước.',
    contraindications: ['Suy thận nặng'],
    cautions: ['Uống cách xa các thuốc khác 2 giờ.'],
    referenceSources: ['Vidal Việt Nam', 'Dược thư Quốc gia']
  },
  {
    id: 'yumangel',
    category: 'B',
    categoryName: 'B. Bệnh Lý Tiêu Hóa - Dạ Dày - Gan Mật',
    groupName: 'Trung hòa acid & Chống trào ngược (Hỗn dịch chữ Y)',
    activeIngredient: 'Almagate 1.00g',
    commonBrandNames: ['Yumangel (Gói chữ Y xanh)', 'Yumangel F'],
    indications: ['Ợ nóng, trào ngược dạ dày, đau thượng vị cấp'],
    mechanismOfAction: 'Trung hòa acid nhanh chóng, ức chế pepsin và gắn kết acid mật.',
    standardDosage: '1 gói x 4 lần/ngày (sau ăn 1-2h và trước khi ngủ).',
    administration: 'Uống trực tiếp từ gói.',
    contraindications: ['Mẫn cảm almagate'],
    cautions: ['Uống xa thuốc khác.'],
    referenceSources: ['Tra Cứu Thuốc 100.000 Biệt Dược']
  },
  {
    id: 'drotaverine',
    category: 'B',
    categoryName: 'B. Bệnh Lý Tiêu Hóa - Dạ Dày - Gan Mật',
    groupName: 'Chống co thắt cơ trơn bụng, thận, mật',
    activeIngredient: 'Drotaverine HCl',
    commonBrandNames: ['No-Spa', 'Drotusc', 'Spasmonavin'],
    indications: ['Cơn đau quặn thận, co thắt đường mật, đau dạ dày ruột, đau bụng kinh'],
    mechanismOfAction: 'Ức chế chọn lọc PDE-IV làm tăng cAMP nội bào, giãn cơ trơn.',
    standardDosage: '40mg - 80mg x 2 - 3 lần/ngày.',
    administration: 'Uống sau ăn.',
    contraindications: ['Suy gan, thận, tim nặng'],
    cautions: ['Thận trọng hạ huyết áp.'],
    brandVariants: [
      {
        variantName: 'No-Spa 40mg (Sanofi - Pháp)',
        manufacturer: 'Sanofi (Pháp)',
        ingredients: 'Drotaverine Hydrochloride 40mg',
        specialEffect: 'Biệt dược gốc chống co thắt cơ trơn đường ruột, ống mật và niệu quản không gây tác dụng phụ atropinic.'
      }
    ],
    referenceSources: ['MIMS Việt Nam', 'Dược Lý Học BYT']
  },
  {
    id: 'domperidone',
    category: 'B',
    categoryName: 'B. Bệnh Lý Tiêu Hóa - Dạ Dày - Gan Mật',
    groupName: 'Thuốc điều hòa vận động dạ dày (Chống nôn)',
    activeIngredient: 'Domperidone',
    commonBrandNames: ['Motilium', 'Motilium-M', 'Domperidon 10mg'],
    indications: ['Đầy bụng, ăn chậm tiêu, buồn nôn, trào ngược dạ dày'],
    mechanismOfAction: 'Kháng thụ thể Dopamin D2 ngoại vi, tăng tháo rỗng dạ dày.',
    standardDosage: '10mg x 3 lần/ngày trước ăn 15 - 30 phút.',
    administration: 'Uống trước các bữa ăn.',
    contraindications: ['Xuất huyết tiêu hóa, thủng ruột'],
    cautions: ['Không dùng quá 7 ngày.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'BNF']
  },
  {
    id: 'metoclopramide',
    category: 'B',
    categoryName: 'B. Bệnh Lý Tiêu Hóa - Dạ Dày - Gan Mật',
    groupName: 'Chống nôn & Tăng co bóp dạ dày',
    activeIngredient: 'Metoclopramide HCl',
    commonBrandNames: ['Primperan', 'Primperan 10mg'],
    indications: ['Buồn nôn và nôn do mọi nguyên nhân, trào ngược dạ dày ruột'],
    mechanismOfAction: 'Kháng Dopamine D2 trung ương & ngoại vi, kích thích giải phóng Acetylcholine ở ruột.',
    standardDosage: '10mg x 3 lần/ngày trước ăn.',
    administration: 'Uống trước bữa ăn.',
    contraindications: ['Xuất huyết tiêu hóa, u tủy thượng thận'],
    cautions: ['Có thể gây hội chứng ngoại tháp nhẹ.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'smecta',
    category: 'B',
    categoryName: 'B. Bệnh Lý Tiêu Hóa - Dạ Dày - Gan Mật',
    groupName: 'Thuốc cầm tiêu chảy & Đắm niêm mạc',
    activeIngredient: 'Diosmectite (Dioctahedral Smectite)',
    commonBrandNames: ['Smecta', 'Smecta Cam Thảo', 'Diosmectite Stella'],
    indications: ['Tiêu chảy cấp và mạn tính, giảm đau dạ dày ruột'],
    mechanismOfAction: 'Bao phủ niêm mạc ruột, hấp phụ độc tố vi khuẩn và virus.',
    standardDosage: '1 gói x 3 lần/ngày.',
    administration: 'Hòa tan vào 50ml nước ấm.',
    contraindications: ['Mẫn cảm diosmectite'],
    cautions: ['Cần phối hợp bù nước Oresol.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'Vidal']
  },
  {
    id: 'silymarin',
    category: 'B',
    categoryName: 'B. Bệnh Lý Tiêu Hóa - Dạ Dày - Gan Mật',
    groupName: 'Bảo vệ tế bào gan & Hạ men gan',
    activeIngredient: 'Silymarin (Cây Kế Sữa)',
    commonBrandNames: ['Boganic', 'Lipotropic', 'Silybum', 'Hepanox'],
    indications: ['Gan nhiễm mỡ, tăng men gan AST/ALT, tổn thương gan do rượu'],
    mechanismOfAction: 'Bảo vệ màng tế bào gan, trung hòa gốc tự do ROS.',
    standardDosage: '140mg x 2 - 3 lần/ngày.',
    administration: 'Uống sau bữa ăn.',
    contraindications: ['Quá mẫn Silymarin'],
    cautions: ['Hỗ trợ điều trị gan.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam']
  },

  // --- NHÓM C: Bệnh Lý Hô Hấp & Dị Ứng ---
  {
    id: 'acetylcysteine',
    category: 'C',
    categoryName: 'C. Bệnh Lý Hô Hấp & Dị Ứng',
    groupName: 'Tiêu nhầy, long đờm (ho có đờm)',
    activeIngredient: 'Acetylcysteine (N-Acetylcysteine)',
    commonBrandNames: ['Acemuc', 'Fluimucil', 'Mitux'],
    indications: ['Viêm phế quản, viêm xoang có đờm đặc; giải độc Paracetamol'],
    mechanismOfAction: 'Bẻ gãy cầu nối disulfide (-S-S-) trong mucoprotein.',
    standardDosage: '200mg x 3 lần/ngày hoặc 600mg x 1 lần/ngày.',
    administration: 'Hòa tan vào nước ấm uống sau ăn.',
    contraindications: ['Tiền sử hen phế quản', 'Trẻ em < 2 tuổi'],
    cautions: ['Thận trọng khi dùng cùng thuốc ức chế ho.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'Rang & Dale’s']
  },
  {
    id: 'fexofenadine',
    category: 'C',
    categoryName: 'C. Bệnh Lý Hô Hấp & Dị Ứng',
    groupName: 'Kháng Histamin H1 thế hệ 2 (ít buồn ngủ)',
    activeIngredient: 'Fexofenadine HCl',
    commonBrandNames: ['Telfast', 'Fexophar', 'Allegra'],
    indications: ['Viêm mũi dị ứng, hắt hơi, mề đay mạn tính'],
    mechanismOfAction: 'Kháng chọn lọc thụ thể H1 ngoại vi thế hệ 2.',
    standardDosage: '60mg x 2 lần/ngày hoặc 120mg/180mg x 1 lần/ngày.',
    administration: 'Uống trước bữa ăn.',
    contraindications: ['Quá mẫn fexofenadine'],
    cautions: ['Tránh uống cùng nước ép trái cây.'],
    brandVariants: [
      {
        variantName: 'Telfast 60mg / 120mg / 180mg (Sanofi - Pháp)',
        manufacturer: 'Sanofi (Pháp)',
        ingredients: 'Fexofenadine HCl 60mg / 120mg / 180mg',
        specialEffect: 'Kháng histamine thế hệ 2 không qua hàng rào máu não, hoàn toàn không gây buồn ngủ hay ảnh hưởng lái xe.'
      }
    ],
    referenceSources: ['Dược lâm sàng Hoàng Thị Kim Huyền', 'BNF']
  },
  {
    id: 'cetirizine',
    category: 'C',
    categoryName: 'C. Bệnh Lý Hô Hấp & Dị Ứng',
    groupName: 'Kháng Histamin H1 thế hệ 2',
    activeIngredient: 'Cetirizine dihydrochloride',
    commonBrandNames: ['Zyrtec', 'Cetirizin 10mg'],
    indications: ['Viêm mũi dị ứng theo mùa, ngứa mắt, mề đay'],
    mechanismOfAction: 'Chẹn thụ thể Histamin H1 ngoại vi.',
    standardDosage: '10mg x 1 lần/ngày vào buổi tối.',
    administration: 'Uống không phụ thuộc bữa ăn.',
    contraindications: ['Suy thận nặng'],
    cautions: ['Buồn ngủ nhẹ ở người nhạy cảm.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'loratadine',
    category: 'C',
    categoryName: 'C. Bệnh Lý Hô Hấp & Dị Ứng',
    groupName: 'Kháng Histamin H1 thế hệ 2 êm dịu',
    activeIngredient: 'Loratadine',
    commonBrandNames: ['Clarityne', 'Loratadin 10mg'],
    indications: ['Viêm mũi dị ứng, viêm kết mạc dị ứng, mề đay dị ứng'],
    mechanismOfAction: 'Kháng chọn lọc thụ thể Histamin H1 ngoại vi kéo dài 24h.',
    standardDosage: '10mg x 1 lần/ngày.',
    administration: 'Uống không phụ thuộc bữa ăn.',
    contraindications: ['Quá mẫn loratadine'],
    cautions: ['Thận trọng suy gan nặng.'],
    referenceSources: ['BNF', 'Dược thư QG']
  },
  {
    id: 'salbutamol',
    category: 'C',
    categoryName: 'C. Bệnh Lý Hô Hấp & Dị Ứng',
    groupName: 'Giãn phế quản cắt cơn hen cấp (SABA)',
    activeIngredient: 'Salbutamol (Albuterol)',
    commonBrandNames: ['Ventolin Inhaler', 'Ventolin Evohaler', 'Salbutamol 2mg'],
    indications: ['Cắt cơn phế quản co thắt trong Hen phế quản và COPD'],
    mechanismOfAction: 'Kích thích chọn lọc thụ thể Beta-2, giãn cơ trơn phế quản.',
    standardDosage: 'Xịt hít: 1 - 2 nhát khi khó thở.',
    administration: 'Xịt hít định liều MDI nín thở 10 giây.',
    contraindications: ['Dọa sảy thai 6 tháng đầu'],
    cautions: ['Có thể gây run tay nhẹ.'],
    brandVariants: [
      {
        variantName: 'Ventolin Evohaler 100mcg (GSK)',
        manufacturer: 'GSK',
        ingredients: 'Salbutamol 100mcg / nhát xịt (200 liều)',
        specialEffect: 'Bình xịt định liều MDI cắt cơn khó thở hen suyễn cấp tốc trong 3 - 5 phút.'
      }
    ],
    referenceSources: ['Sanford Guide', 'Dược thư Quốc gia']
  },
  {
    id: 'symbicort',
    category: 'C',
    categoryName: 'C. Bệnh Lý Hô Hấp & Dị Ứng',
    groupName: 'Thuốc xịt kết hợp Hen/COPD (ICS + LABA)',
    activeIngredient: 'Budesonide + Formoterol fumarate',
    commonBrandNames: ['Symbicort Turbuhaler', 'Vannair'],
    indications: ['Duy trì và cắt cơn hen phế quản theo GINA, COPD nặng'],
    mechanismOfAction: 'Budesonide chống viêm + Formoterol giãn phế quản tác dụng kéo dài.',
    standardDosage: 'Hít 1 - 2 nhát x 2 lần/ngày.',
    administration: 'Hít sâu qua Turbuhaler, súc miệng bằng nước sạch sau hít.',
    contraindications: ['Mẫn cảm Budesonide/Formoterol'],
    cautions: ['Súc miệng kỹ tránh nấm Candida miệng.'],
    referenceSources: ['GINA Guidelines', 'Goodman & Gilman’s']
  },
  {
    id: 'montelukast',
    category: 'C',
    categoryName: 'C. Bệnh Lý Hô Hấp & Dị Ứng',
    groupName: 'Thuốc đối kháng thụ thể Leukotriene',
    activeIngredient: 'Montelukast Sodium',
    commonBrandNames: ['Singulair', 'Montair', 'Montelukast 10mg'],
    indications: ['Dự phòng hen phế quản, giảm viêm mũi dị ứng'],
    mechanismOfAction: 'Chẹn chọn lọc thụ thể CysLT1 của cysteinyl leukotriene.',
    standardDosage: '10mg x 1 lần/ngày vào buổi tối.',
    administration: 'Uống buổi tối trước khi đi ngủ.',
    contraindications: ['Mẫn cảm Montelukast'],
    cautions: ['Theo dõi hành vi và tâm thần.'],
    brandVariants: [
      {
        variantName: 'Singulair 10mg / 4mg / 5mg (MSD - Mỹ)',
        manufacturer: 'Merck Sharp & Dohme (MSD)',
        ingredients: 'Montelukast Sodium 10mg viên nén / 4mg-5mg viên nhai',
        specialEffect: 'Dự phòng đợt cấp hen phế quản co thắt do thời tiết hoặc vận động gắng sức.'
      }
    ],
    referenceSources: ['DiPiro Pharmacotherapy', 'MIMS']
  },

  // --- NHÓM D: Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng ---
  {
    id: 'amoxicillin-clavulanate',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh Penicillin kháng Beta-lactamase',
    activeIngredient: 'Amoxicillin + Clavulanic acid',
    commonBrandNames: ['Augmentin', 'Klamentin', 'Curam', 'Amoksiklav'],
    indications: ['Viêm tai giữa, viêm xoang, viêm phế quản, viêm phổi, nhiễm khuẩn tiết niệu'],
    mechanismOfAction: 'Amoxicillin diệt khuẩn thành + Clavulanate ức chế enzym Beta-lactamase.',
    standardDosage: '625mg hoặc 1000mg x 2 lần/ngày cách 12h.',
    administration: 'Uống đầu bữa ăn chính.',
    contraindications: ['Dị ứng Penicillin', 'Tiền sử vàng da do Augmentin'],
    cautions: ['Uống đủ đợt 7-10 ngày.'],
    brandVariants: [
      {
        variantName: 'Augmentin 625mg / 1000mg / Augmentin Duo (GSK)',
        manufacturer: 'GSK (Anh Quốc)',
        ingredients: 'Amoxicillin + Acid Clavulanic tỷ lệ 7:1 (875mg/125mg)',
        specialEffect: 'Kháng sinh diệt khuẩn phổ rộng mạnh mẽ diệt các chủng vi khuẩn kháng thuốc tiết Beta-lactamase.'
      },
      {
        variantName: 'Klamentin 875/125 (DHG Pharma)',
        manufacturer: 'Dược Hậu Giang',
        ingredients: 'Amoxicillin 875mg + Acid Clavulanic 125mg',
        specialEffect: 'Kháng sinh phối hợp chất lượng cao sản xuất tại Việt Nam theo chuẩn GMP-WHO.'
      }
    ],
    referenceSources: ['The Sanford Guide', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'cefuroxime',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh Cephalosporin Thế hệ 2',
    activeIngredient: 'Cefuroxime axetil',
    commonBrandNames: ['Zinnat', 'Ceftum', 'Zinmax'],
    indications: ['Viêm họng, viêm xoang, viêm tai giữa, nhiễm khuẩn tiết niệu'],
    mechanismOfAction: 'Ức chế tổng hợp vách tế bào vi khuẩn Gram (+) và (-).',
    standardDosage: '250mg - 500mg x 2 lần/ngày.',
    administration: 'Uống ngay sau bữa ăn.',
    contraindications: ['Dị ứng Cephalosporin'],
    cautions: ['Dị ứng chéo Penicillin (5-10%).'],
    brandVariants: [
      {
        variantName: 'Zinnat 250mg / 500mg (GSK - Anh Quốc)',
        manufacturer: 'GSK (Anh)',
        ingredients: 'Cefuroxime axetil 250mg / 500mg',
        specialEffect: 'Biệt dược gốc diệt khuẩn hô hấp và tiết niệu an toàn cho cả phụ nữ mang thai (nhóm B).'
      }
    ],
    referenceSources: ['Sanford Guide', 'Phác đồ Chợ Rẫy']
  },
  {
    id: 'cefixime',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh Cephalosporin Thế hệ 3',
    activeIngredient: 'Cefixime',
    commonBrandNames: ['Meiact', 'Cefixim 200mg', 'Fixim'],
    indications: ['Viêm phổi, viêm phế quản, nhiễm khuẩn tiết niệu'],
    mechanismOfAction: 'Ức chế tổng hợp vách vi khuẩn Gram âm mạnh mẽ.',
    standardDosage: '200mg x 2 lần/ngày.',
    administration: 'Uống sau bữa ăn.',
    contraindications: ['Dị ứng Cephalosporin'],
    cautions: ['Giảm liều ở suy thận.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'ceftriaxone',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh Cephalosporin Thế hệ 3 (Tiêm truyền)',
    activeIngredient: 'Ceftriaxone Sodium',
    commonBrandNames: ['Rocephin', 'Ceftriaxon 1g'],
    indications: ['Viêm màng brain, nhiễm khuẩn huyết, viêm phổi nặng mắc phải cộng đồng'],
    mechanismOfAction: 'Ức chế vách vi khuẩn với thời gian bán thải dài (uống 1 lần/ngày tiêm).',
    standardDosage: '1g - 2g/ngày tiêm bắp hoặc truyền tĩnh mạch.',
    administration: 'Dùng đường tiêm truyền tại cơ sở y tế.',
    contraindications: ['Trẻ sơ sinh tăng bilirubin máu'],
    cautions: ['Không pha chung với dung dịch chứa Canxi.'],
    referenceSources: ['Sanford Guide', 'Dược thư Quốc gia']
  },
  {
    id: 'ciprofloxacin',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh Fluoroquinolon',
    activeIngredient: 'Ciprofloxacin',
    commonBrandNames: ['Ciprobay', 'Ciprolet', 'Ciprofloxacin 500mg'],
    indications: ['Nhiễm khuẩn đường tiết niệu, viêm tuyến tiền liệt, tiêu chảy nhiễm khuẩn'],
    mechanismOfAction: 'Ức chế DNA gyrase và Topoisomerase IV.',
    standardDosage: '500mg x 2 lần/ngày.',
    administration: 'Uống cách xa Antacid, Canxi, Sắt 2h.',
    contraindications: ['Trẻ em < 18 tuổi, phụ nữ có thai'],
    cautions: ['Cảnh báo viêm đứt gân Achilles.'],
    referenceSources: ['Sanford Guide', 'Goodman & Gilman’s']
  },
  {
    id: 'azithromycin',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh Macrolide kéo dài',
    activeIngredient: 'Azithromycin',
    commonBrandNames: ['Zithromax', 'Azitrocin', 'Azithromycin 500mg'],
    indications: ['Viêm đường hô hấp, viêm xoang, viêm phổi Mycoplasma, Chlamydia'],
    mechanismOfAction: 'Gắn 50S ribosom vi khuẩn, ức chế tổng hợp protein.',
    standardDosage: '500mg x 1 lần/ngày trong 3 ngày.',
    administration: 'Uống 1h trước ăn hoặc 2h sau ăn.',
    contraindications: ['Dị ứng Macrolide'],
    cautions: ['Thận trọng khoảng QT kéo dài.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'Sanford Guide']
  },
  {
    id: 'metronidazole',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng kỵ khí & Ký sinh trùng',
    activeIngredient: 'Metronidazole',
    commonBrandNames: ['Flagyl', 'Klion', 'Metronidazol 250mg'],
    indications: ['Nhiễm kỵ khí ổ bụng, Amip, Giardia, Trichomonas, diệt H. pylori'],
    mechanismOfAction: 'Dạng khử làm gãy chuỗi DNA vi khuẩn kỵ khí.',
    standardDosage: '250mg - 500mg x 2 - 3 lần/ngày.',
    administration: 'Uống trong hoặc sau bữa ăn.',
    contraindications: ['Phụ nữ mang thai 3 tháng đầu', 'Tuyệt đối cấm uống rượu bia'],
    cautions: ['Gây vị kim loại trong miệng.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'fluconazole',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Thuốc kháng nấm Triazole',
    activeIngredient: 'Fluconazole',
    commonBrandNames: ['Diflucan', 'Flucozal', 'Fluconazol 150mg'],
    indications: ['Nhiễm nấm Candida âm đạo, nấm miệng, nấm móng'],
    mechanismOfAction: 'Ức chế lanosterol 14-alpha-demethylase, ngăn tổng hợp ergosterol màng nấm.',
    standardDosage: 'Nấm âm đạo: 150mg 1 liều duy nhất.',
    administration: 'Uống không phụ thuộc bữa ăn.',
    contraindications: ['Dùng đồng thời Terfenadine'],
    cautions: ['Theo dõi men gan.'],
    referenceSources: ['Sanford Guide', 'Dược thư Quốc gia']
  },
  {
    id: 'acyclovir',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Thuốc kháng Virus Herpes & Zona',
    activeIngredient: 'Acyclovir',
    commonBrandNames: ['Zovirax', 'Acyclovir 800mg', 'Acyclovir 200mg'],
    indications: ['Nhiễm Virus Herpes simplex (HSV-1, HSV-2), Zona thần kinh (VZV), Thủy đậu'],
    mechanismOfAction: 'Biến đổi thành Acyclovir triphosphate ức chế chọn lọc DNA polymerase của virus.',
    standardDosage: 'Zona: 800mg x 5 lần/ngày trong 7 - 10 ngày.',
    administration: 'Uống cùng với 1 cốc nước lớn.',
    contraindications: ['Quá mẫn Acyclovir'],
    cautions: ['Uống nhiều nước để tránh kết tinh tinh thể tại ống thận.'],
    referenceSources: ['Sanford Guide', 'Dược Thư Quốc Gia Việt Nam']
  },

  // --- NHÓM E: Bệnh Lý Tim Mạch, Huyết Áp & Mỡ Máu ---
  {
    id: 'amlodipine',
    category: 'E',
    categoryName: 'E. Bệnh Lý Tim Mạch, Huyết Áp & Mỡ Máu',
    groupName: 'Chẹn kênh Calci (CCB hạ huyết áp)',
    activeIngredient: 'Amlodipine besylate',
    commonBrandNames: ['Norvasc', 'Amlor', 'Ambelin'],
    indications: ['Tăng huyết áp vô căn, đau thắt ngực ổn định'],
    mechanismOfAction: 'Ức chế dòng Calci vào cơ trơn mạch máu, giãn tiểu động mạch.',
    standardDosage: '5mg - 10mg x 1 lần/ngày.',
    administration: 'Uống cố định 1 giờ buổi sáng.',
    contraindications: ['Hạ huyết áp nặng, sốc tim'],
    cautions: ['Phù mắt cá chân nhẹ.'],
    brandVariants: [
      {
        variantName: 'Norvasc 5mg / 10mg (Pfizer - Mỹ)',
        manufacturer: 'Pfizer (Mỹ)',
        ingredients: 'Amlodipine besylate 5mg / 10mg',
        specialEffect: 'Biệt dược gốc chẹn kênh calcium êm dịu kéo dài 24 giờ, bảo vệ biến cố đột quỵ mạch máu não.'
      }
    ],
    combinationProtocols: [
      {
        diseaseName: 'Tăng huyết áp độ 2',
        combinedWith: ['Telmisartan 40mg', 'Hydrochlorothiazide 12.5mg'],
        clinicalRationale: 'Giãn mạch (Amlodipine) + ức chế RAAS (Telmisartan) triệt tiêu phù chân.'
      }
    ],
    referenceSources: ['Guyton and Hall', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'nifedipine',
    category: 'E',
    categoryName: 'E. Bệnh Lý Tim Mạch, Huyết Áp & Mỡ Máu',
    groupName: 'Chẹn kênh Calci phóng thích kéo dài (Tăng huyết áp)',
    activeIngredient: 'Nifedipine',
    commonBrandNames: ['Adalat LA 30mg', 'Adalat CC', 'Nifedipin T20'],
    indications: ['Tăng huyết áp, hội chứng Raynaud, dự phòng đau thắt ngực'],
    mechanismOfAction: 'Giãn động mạch ngoại vi giảm hậu tải tim.',
    standardDosage: '30mg - 60mg x 1 lần/ngày dạng LA.',
    administration: 'Nuốt nguyên viên không nhai bẻ.',
    contraindications: ['Sốc do tim, hẹp van động mạch chủ nặng'],
    cautions: ['Không dùng dạng nhỏ dưới lưỡi cắt cơn áp vì nguy cơ đột quỵ.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'ESC']
  },
  {
    id: 'telmisartan',
    category: 'E',
    categoryName: 'E. Bệnh Lý Tim Mạch, Huyết Áp & Mỡ Máu',
    groupName: 'Chẹn thụ thể Angiotensin II (ARB bảo vệ thận)',
    activeIngredient: 'Telmisartan',
    commonBrandNames: ['Micardis', 'Pritor', 'Telma'],
    indications: ['Tăng huyết áp nguyên phát, bảo vệ thận tiểu đường'],
    mechanismOfAction: 'Chẹn chọn lọc thụ thể AT1 của Angiotensin II.',
    standardDosage: '40mg - 80mg x 1 lần/ngày.',
    administration: 'Uống nguyên viên không phụ thuộc bữa ăn.',
    contraindications: ['Phụ nữ có thai 3 tháng giữa và cuối'],
    cautions: ['Kiểm tra Kali máu định kỳ.'],
    brandVariants: [
      {
        variantName: 'Micardis 40mg / 80mg / Micardis Plus (Boehringer Ingelheim)',
        manufacturer: 'Boehringer Ingelheim (Đức)',
        ingredients: 'Telmisartan 40mg/80mg (Plus: + Hydrochlorothiazide 12.5mg)',
        specialEffect: 'Biệt dược ARB kiểm soát huyết áp bền bỉ 24h, bảo vệ tổn thương cơ quan đích ở thận và tim.'
      }
    ],
    referenceSources: ['Koda-Kimble Applied Therapeutics', 'BNF']
  },
  {
    id: 'losartan',
    category: 'E',
    categoryName: 'E. Bệnh Lý Tim Mạch, Huyết Áp & Mỡ Máu',
    groupName: 'Chẹn thụ thể Angiotensin II (ARB thế hệ đầu)',
    activeIngredient: 'Losartan Potassium',
    commonBrandNames: ['Cozaar', 'Losartan 50mg', 'Zaar'],
    indications: ['Tăng huyết áp, giảm nguy cơ đột quỵ ở bệnh nhân phì đại thất trái'],
    mechanismOfAction: 'Chẹn thụ thể AT1, hạ huyết áp và tăng bài tiết acid uric nhẹ qua nước tiểu.',
    standardDosage: '50mg - 100mg x 1 lần/ngày.',
    administration: 'Uống không phụ thuộc bữa ăn.',
    contraindications: ['Phụ nữ có thai'],
    cautions: ['Theo dõi nồng độ kali máu.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'enalapril',
    category: 'E',
    categoryName: 'E. Bệnh Lý Tim Mạch, Huyết Áp & Mỡ Máu',
    groupName: 'Ức chế enzym chuyển (ACEi - Hạ áp & Suy tim)',
    activeIngredient: 'Enalapril maleate',
    commonBrandNames: ['Renitec', 'Enalapril 5mg', 'Renivace'],
    indications: ['Tăng huyết áp, suy tim sung huyết, bảo vệ thận đái tháo đường'],
    mechanismOfAction: 'Ức chế ACE ngăn chuyển Angiotensin I thành II, giảm phân hủy Bradykinin.',
    standardDosage: '5mg - 20mg x 1 - 2 lần/ngày.',
    administration: 'Uống cùng hoặc xa bữa ăn.',
    contraindications: ['Tiền sử phù mạch do ACEi, phụ nữ có thai'],
    cautions: ['Tác dụng phụ ho khàn khan dai dẳng do tích tụ Bradykinin.'],
    referenceSources: ['Goodman & Gilman’s', 'Dược thư QG']
  },
  {
    id: 'bisoprolol',
    category: 'E',
    categoryName: 'E. Bệnh Lý Tim Mạch, Huyết Áp & Mỡ Máu',
    groupName: 'Chẹn Beta-1 chọn lọc tim (Hạ áp, trị suy tim)',
    activeIngredient: 'Bisoprolol fumarate',
    commonBrandNames: ['Concor', 'Bisostad', 'Concor COR 2.5mg'],
    indications: ['Tăng huyết áp, đau thắt ngực, suy tim mạn tính ổn định'],
    mechanismOfAction: 'Chẹn Beta-1 adrenergic ở tim, giảm nhịp tim và tiết Renin.',
    standardDosage: '2.5mg - 5mg - 10mg x 1 lần/ngày.',
    administration: 'Uống vào buổi sáng sau ăn.',
    contraindications: ['Nhịp chậm < 50 nhịp/phút, block nhĩ thất độ II-III, hen phế quản nặng'],
    cautions: ['Không ngưng thuốc đột ngột.'],
    brandVariants: [
      {
        variantName: 'Concor 5mg / 10mg (Merck - Đức)',
        manufacturer: 'Merck (Đức)',
        ingredients: 'Bisoprolol fumarate 5mg / 10mg',
        specialEffect: 'Biệt dược chẹn Beta-1 chuẩn chọn lọc tim, hạ huyết áp và kiểm soát nhịp tim nhanh.'
      },
      {
        variantName: 'Concor COR 2.5mg (Trị Suy Tim)',
        manufacturer: 'Merck (Đức)',
        ingredients: 'Bisoprolol fumarate 2.5mg',
        specialEffect: 'Viên hình trái tim chia liều chuẩn dùng trong phác đồ 4 thuốc điều trị suy tim mạn tính ổn định.'
      }
    ],
    referenceSources: ['ESC Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'atorvastatin',
    category: 'E',
    categoryName: 'E. Bệnh Lý Tim Mạch, Huyết Áp & Mỡ Máu',
    groupName: 'Hạ mỡ máu (Statin thế hệ mạnh)',
    activeIngredient: 'Atorvastatin calcium',
    commonBrandNames: ['Lipitor', 'Atorlip', 'Torvast'],
    indications: ['Rối loạn mỡ máu, tăng Cholesterol, dự phòng nhồi máu cơ tim'],
    mechanismOfAction: 'Ức chế HMG-CoA Reductase, giảm tổng hợp cholesterol ở gan.',
    standardDosage: '10mg - 20mg - 40mg x 1 lần/ngày buổi tối.',
    administration: 'Uống vào buổi tối trước khi đi ngủ.',
    contraindications: ['Bệnh gan hoạt động, phụ nữ mang thai'],
    cautions: ['Theo dõi men gan và đau cơ.'],
    brandVariants: [
      {
        variantName: 'Lipitor 10mg / 20mg / 40mg (Viatris / Pfizer)',
        manufacturer: 'Pfizer / Viatris (Mỹ)',
        ingredients: 'Atorvastatin calcium 10mg / 20mg / 40mg',
        specialEffect: 'Biệt dược gốc hạ Cholesterol LDL mạnh mẽ nhất và ổn định vỏ mảng xơ vữa động mạch vành.'
      }
    ],
    combinationProtocols: [
      {
        diseaseName: 'Rối loạn mỡ máu hỗn hợp',
        combinedWith: ['Ezetimibe 10mg', 'CoQ10 100mg'],
        clinicalRationale: 'Atorvastatin giảm tổng hợp mỡ ở gan, Ezetimibe ức chế hấp thu mỡ tại ruột.'
      }
    ],
    referenceSources: ['Goodman & Gilman’s', 'Phác đồ Chợ Rẫy']
  },
  {
    id: 'rosuvastatin',
    category: 'E',
    categoryName: 'E. Bệnh Lý Tim Mạch, Huyết Áp & Mỡ Máu',
    groupName: 'Hạ mỡ máu (Statin hiệu lực mạnh nhất)',
    activeIngredient: 'Rosuvastatin calcium',
    commonBrandNames: ['Crestor', 'Rosavel', 'Rosuvastatin 10mg'],
    indications: ['Tăng cholesterol máu nặng, dự phòng biến cố xơ vữa động mạch'],
    mechanismOfAction: 'Ức chế HMG-CoA Reductase mạnh mẽ nhất.',
    standardDosage: '10mg - 20mg x 1 lần/ngày.',
    administration: 'Uống không phụ thuộc bữa ăn.',
    contraindications: ['Suy gan nặng, suy thận nặng'],
    cautions: ['Theo dõi triệu chứng đau cơ.'],
    brandVariants: [
      {
        variantName: 'Crestor 10mg / 20mg (AstraZeneca)',
        manufacturer: 'AstraZeneca (Anh - Thụy Điển)',
        ingredients: 'Rosuvastatin calcium 10mg / 20mg',
        specialEffect: 'Statin mạnh nhất giảm nồng độ mỡ xấu LDL-C tới 55%.'
      }
    ],
    referenceSources: ['DiPiro Pharmacotherapy', 'MIMS']
  },
  {
    id: 'aspirin-81',
    category: 'E',
    categoryName: 'E. Bệnh Lý Tim Mạch, Huyết Áp & Mỡ Máu',
    groupName: 'Chống kết tập tiểu cầu (Dự phòng huyết khối)',
    activeIngredient: 'Aspirin (Acid Acetylsalicylic 81mg)',
    commonBrandNames: ['Aspirin 81mg', 'Aspirin pH8'],
    indications: ['Dự phòng nhồi máu cơ tim, đột quỵ thiếu máu brain, bệnh mạch vành'],
    mechanismOfAction: 'Ức chế không thuận nghịch COX-1 tiểu cầu.',
    standardDosage: '81mg - 100mg x 1 lần/ngày.',
    administration: 'Uống ngay sau bữa ăn sáng.',
    contraindications: ['Loét dạ dày tá tràng, dị ứng aspirin'],
    cautions: ['Tránh dùng chung NSAIDs.'],
    referenceSources: ['Dược Thư Quốc Gia Việt Nam', 'Goodman & Gilman’s']
  },
  {
    id: 'clopidogrel',
    category: 'E',
    categoryName: 'E. Bệnh Lý Tim Mạch, Huyết Áp & Mỡ Máu',
    groupName: 'Chống kết tập tiểu cầu (Chẹn thụ thể P2Y12)',
    activeIngredient: 'Clopidogrel bisulfate',
    commonBrandNames: ['Plavix', 'Freego', 'Clopidogrel 75mg'],
    indications: ['Dự phòng huyết khối sau Stent mạch vành, đột quỵ'],
    mechanismOfAction: 'Chẹn không thuận nghịch thụ thể P2Y12 ADP.',
    standardDosage: '75mg x 1 lần/ngày.',
    administration: 'Uống không phụ thuộc bữa ăn.',
    contraindications: ['Đang có xuất huyết cấp tính'],
    cautions: ['Tránh dùng chung Omeprazole.'],
    brandVariants: [
      {
        variantName: 'Plavix 75mg (Sanofi - Pháp)',
        manufacturer: 'Sanofi (Pháp)',
        ingredients: 'Clopidogrel bisulfate 75mg',
        specialEffect: 'Biệt dược gốc ngăn ngừa tắc stent mạch vành và dự phòng tái phát đột quỵ não.'
      }
    ],
    referenceSources: ['ACC/AHA Guidelines', 'Dược thư Quốc gia']
  },
  {
    id: 'rivaroxaban',
    category: 'E',
    categoryName: 'E. Bệnh Lý Tim Mạch, Huyết Áp & Mỡ Máu',
    groupName: 'Thuốc chống đông đường uống thế hệ mới (NOAC / DOAC)',
    activeIngredient: 'Rivaroxaban',
    commonBrandNames: ['Xarelto', 'Rivaroxaban 15mg', 'Rivaroxaban 20mg'],
    indications: ['Dự phòng đột quỵ ở bệnh nhân rung nhĩ không do bệnh van tim', 'Điều trị & dự phòng huyết khối tĩnh mạch sâu (DVT) và thuyên tắc phổi (PE)'],
    mechanismOfAction: 'Ức chế chọn lọc trực tiếp Yếu tố Xa (Factor Xa) trong chuỗi đông máu.',
    standardDosage: '15mg - 20mg x 1 lần/ngày.',
    administration: 'Uống cùng với bữa ăn để đạt hấp thu tối đa.',
    contraindications: ['Đang có chảy máu cấp tính nghiêm trọng, bệnh gan kèm rối loạn đông máu'],
    cautions: ['Theo dõi sát các dấu hiệu chảy máu dưới da hoặc tiêu hóa.'],
    brandVariants: [
      {
        variantName: 'Xarelto 10mg / 15mg / 20mg (Bayer - Đức)',
        manufacturer: 'Bayer (Đức)',
        ingredients: 'Rivaroxaban 10mg / 15mg / 20mg',
        specialEffect: 'Thuốc chống đông đường uống thế hệ mới không cần xét nghiệm theo dõi chỉ số INR như Warfarin.'
      }
    ],
    referenceSources: ['Chest Guidelines', 'DiPiro Pharmacotherapy']
  },

  // --- NHÓM F: Bệnh Lý Nội Tiết & Chuyển Hóa ---
  {
    id: 'metformin',
    category: 'F',
    categoryName: 'F. Bệnh Lý Nội Tiết & Chuyển Hóa',
    groupName: 'Đái tháo đường Type 2 (Lựa chọn đầu tay ADA)',
    activeIngredient: 'Metformin HCl',
    commonBrandNames: ['Glucophage', 'Glucophage XR', 'Panfor'],
    indications: ['Đái tháo đường Tuýp 2 ở người thừa cân, béo phì'],
    mechanismOfAction: 'Kích hoạt AMPK gan, giảm tân tạo glucose ở gan, tăng nhạy cảm insulin.',
    standardDosage: '500mg - 850mg x 1-2 lần/ngày sau ăn.',
    administration: 'Uống trong hoặc ngay sau bữa ăn.',
    contraindications: ['Suy thận nặng (eGFR < 30)', 'Toan lactic'],
    cautions: ['Tạm ngưng 48h trước chụp CT tiêm cản quang.'],
    brandVariants: [
      {
        variantName: 'Glucophage 500mg / 850mg / 1000mg (Merck - Đức)',
        manufacturer: 'Merck (Đức)',
        ingredients: 'Metformin HCl 500mg / 850mg / 1000mg viên nén',
        specialEffect: 'Biệt dược gốc hạ đường huyết chuẩn ADA, không gây hạ đường huyết đơn độc.'
      },
      {
        variantName: 'Glucophage XR 500mg / 750mg / 1000mg (Phóng Thích Kéo Dài)',
        manufacturer: 'Merck (Đức)',
        ingredients: 'Metformin HCl dạng XR (Extended Release)',
        specialEffect: 'Công nghệ phóng thích kéo dài giúp giảm tối đa tác dụng phụ tiêu chảy, buồn nôn, uống 1 lần duy nhất vào buổi tối.'
      }
    ],
    combinationProtocols: [
      {
        diseaseName: 'Đái tháo đường Tuýp 2 HbA1c > 8%',
        combinedWith: ['Jardiance 10mg (Empagliflozin SGLT2i)', 'Januvia 100mg'],
        clinicalRationale: 'Metformin giảm tạo đường ở gan, Jardiance tăng thải đường qua nước tiểu.'
      }
    ],
    referenceSources: ['ADA Standards of Care', 'Dược thư Quốc gia']
  },
  {
    id: 'gliclazide',
    category: 'F',
    categoryName: 'F. Bệnh Lý Nội Tiết & Chuyển Hóa',
    groupName: 'Đái tháo đường kích thích tụy tiết Insulin (Sulfonylurea thế hệ 2)',
    activeIngredient: 'Gliclazide',
    commonBrandNames: ['Diamicron MR 30mg', 'Diamicron MR 60mg', 'Gliclazid Stada'],
    indications: ['Đái tháo đường Tuýp 2 khi Metformin không đủ kiểm soát đường huyết'],
    mechanismOfAction: 'Gắn thụ thể SUR1 trên tế bào beta tụy, chẹn kênh K+ phụ thuộc ATP, kích thích giải phóng Insulin sinh lý.',
    standardDosage: '30mg - 120mg x 1 lần/ngày vào bữa ăn sáng.',
    administration: 'Uống nguyên viên ngay đầu bữa ăn sáng.',
    contraindications: ['Đái tháo đường Tuýp 1, nhiễm toan ceton, suy gan suy thận nặng'],
    cautions: ['Nguy cơ hạ đường huyết (cần mang theo viên đường phòng ăn).'],
    brandVariants: [
      {
        variantName: 'Diamicron MR 30mg / 60mg (Servier - Pháp)',
        manufacturer: 'Servier (Pháp)',
        ingredients: 'Gliclazide 30mg / 60mg dạng MR (Modified Release)',
        specialEffect: 'Công nghệ phóng thích điều chỉnh phóng thích nồng độ thuốc phù hợp với nhịp tiết insulin sinh lý bữa ăn.'
      }
    ],
    referenceSources: ['ADA Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'empagliflozin',
    category: 'F',
    categoryName: 'F. Bệnh Lý Nội Tiết & Chuyển Hóa',
    groupName: 'Đái tháo đường & Bảo vệ Tim/Thận (Ức chế SGLT2)',
    activeIngredient: 'Empagliflozin',
    commonBrandNames: ['Jardiance', 'Jardiance Duo'],
    indications: ['Đái tháo đường Tuýp 2, suy tim HFrEF, bệnh thận mạn'],
    mechanismOfAction: 'Ức chế SGLT2 ống lượn gần, tăng đào thải đường qua nước tiểu.',
    standardDosage: '10mg - 25mg x 1 lần/ngày.',
    administration: 'Uống vào buổi sáng.',
    contraindications: ['Chạy thận nhân tạo'],
    cautions: ['Vệ sinh vùng kín tránh nấm sinh dục.'],
    brandVariants: [
      {
        variantName: 'Jardiance 10mg / 25mg (Boehringer Ingelheim)',
        manufacturer: 'Boehringer Ingelheim (Đức)',
        ingredients: 'Empagliflozin 10mg / 25mg',
        specialEffect: 'Thuốc bảo vệ tim thận đột phá, giảm 38% tử vong do biến cố tim mạch ở người tiểu đường.'
      }
    ],
    referenceSources: ['EMPA-REG OUTCOME Study', 'ADA Guidelines']
  },
  {
    id: 'levothyroxine',
    category: 'F',
    categoryName: 'F. Bệnh Lý Nội Tiết & Chuyển Hóa',
    groupName: 'Hormone tuyến giáp thay thế (Trị suy giáp)',
    activeIngredient: 'Levothyroxine Sodium (Synthetic T4)',
    commonBrandNames: ['Synthroid', 'Euthyrox', 'Berlthyrox'],
    indications: ['Suy giáp nguyên phát/thứ phát, suy giáp Hashimoto, sau cắt giáp'],
    mechanismOfAction: 'Cung cấp T4 ngoại sinh chuyển thành T3 sinh học.',
    standardDosage: '25mcg - 100mcg x 1 lần/ngày.',
    administration: 'Uống sáng sớm lúc đói trước ăn sáng 30 - 60 phút với 1 ly nước.',
    contraindications: ['Nhiễm độc giáp chưa điều trị', 'Nhồi máu cơ tim cấp'],
    cautions: ['Uống xa Canxi, Sắt 4 giờ.'],
    brandVariants: [
      {
        variantName: 'Euthyrox 25mcg / 50mcg / 100mcg (Merck - Đức)',
        manufacturer: 'Merck (Đức)',
        ingredients: 'Levothyroxine Sodium 25mcg / 50mcg / 100mcg',
        specialEffect: 'Biệt dược chuẩn chỉnh liều hormone T4 chính xác microgram cho bệnh nhân suy giáp.'
      }
    ],
    referenceSources: ['Dược Thư Quốc Gia Việt Nam', 'Goodman & Gilman’s']
  },

  // --- NHÓM G: Bệnh Lý Thần Kinh, Tiền Đình & Giấc Ngủ ---
  {
    id: 'tanganil',
    category: 'G',
    categoryName: 'G. Bệnh Lý Thần Kinh, Tiền Đình & Giấc Ngủ',
    groupName: 'Rối loạn tiền đình, chóng mặt kịch phát',
    activeIngredient: 'Acetyl-DL-leucine',
    commonBrandNames: ['Tanganil 500mg', 'Tanganil tiêm', 'N-Leucin'],
    indications: ['Chóng mặt kịch phát do mọi nguyên nhân, BPPV, Meniere'],
    mechanismOfAction: 'Tái lập điện thế màng nơ-ron nhân tiền đình trung ương.',
    standardDosage: '500mg x 3 - 4 viên/ngày.',
    administration: 'Uống vào bữa ăn.',
    contraindications: ['Quá mẫn Acetyl-DL-leucine'],
    cautions: ['Nếu chóng mặt kéo dài > 5 ngày cần chụp MRI sọ脑.'],
    brandVariants: [
      {
        variantName: 'Tanganil 500mg Viên Nén (Pierre Fabre - Pháp)',
        manufacturer: 'Pierre Fabre (Pháp)',
        ingredients: 'Acetyl-DL-leucine 500mg',
        specialEffect: 'Biệt dược gốc điều trị dứt cơn chóng mặt chao đảo tư thế kịch phát lành tính.'
      },
      {
        variantName: 'Tanganil 500mg/5ml Ống Tiêm Truyền Tĩnh Mạch',
        manufacturer: 'Pierre Fabre (Pháp)',
        ingredients: 'Acetyl-DL-leucine 500mg/5ml dung dịch tiêm',
        specialEffect: 'Cắt cơn chóng mặt dữ dội kèm nôn ói cấp cứu tại bệnh viện.'
      }
    ],
    combinationProtocols: [
      {
        diseaseName: 'Rối loạn tiền đình cấp nôn nao quay cuồng',
        combinedWith: ['Sibelium 5mg (Flunarizine)', 'Primperan 10mg'],
        clinicalRationale: 'Tanganil dập tắt chóng mặt nhân tiền đình, Flunarizine chẹn kênh canxi mạch brain.'
      }
    ],
    referenceSources: ['Vidal Việt Nam', 'Phác đồ Chợ Rẫy']
  },
  {
    id: 'flunarizine',
    category: 'G',
    categoryName: 'G. Bệnh Lý Thần Kinh, Tiền Đình & Giấc Ngủ',
    groupName: 'Dự phòng đau đầu Migraine & Tiền đình',
    activeIngredient: 'Flunarizine dihydrochloride',
    commonBrandNames: ['Sibelium', 'Flunarizin 5mg', 'Seftil'],
    indications: ['Dự phòng đau đầu Migraine, điều trị chóng mặt tiền đình'],
    mechanismOfAction: 'Chẹn kênh Calci chọn lọc ở tế bào cơ trơn mạch máu não.',
    standardDosage: '5mg - 10mg x 1 lần/ngày vào buổi tối.',
    administration: 'Uống trước khi đi ngủ.',
    contraindications: ['Triệu chứng Parkinson, trầm cảm nặng'],
    cautions: ['Tăng cân nhẹ, thèm ăn.'],
    brandVariants: [
      {
        variantName: 'Sibelium 5mg (Janssen - Bỉ)',
        manufacturer: 'Janssen-Cilag (Bỉ)',
        ingredients: 'Flunarizine dihydrochloride 5mg',
        specialEffect: 'Biệt dược gốc ngăn ngừa các đợt bùng phát đau nửa đầu Migraine dai dẳng.'
      }
    ],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'MIMS']
  },
  {
    id: 'ginkgo-biloba',
    category: 'G',
    categoryName: 'G. Bệnh Lý Thần Kinh, Tiền Đình & Giấc Ngủ',
    groupName: 'Tuần hoàn brain & Cải thiện trí nhớ',
    activeIngredient: 'Cao chuẩn hóa lá Ginkgo biloba (EGb 761)',
    commonBrandNames: ['Tanakan', 'Tebonin', 'Ginkor Fort', 'Cerecaps'],
    indications: ['Thiểu năng tuần hoàn brain, đau đầu, ù tai, suy giảm trí nhớ'],
    mechanismOfAction: 'Flavonoid & Terpenoid trung hòa gốc tự do, tăng tưới máu vi mạch não.',
    standardDosage: '40mg - 80mg x 2 - 3 lần/ngày hoặc 120mg x 1-2 lần/ngày.',
    administration: 'Uống trong hoặc sau bữa ăn.',
    contraindications: ['Đang xuất huyết cấp', 'Chuẩn bị phẫu thuật'],
    cautions: ['Thận trọng khi dùng chung thuốc chống đông.'],
    brandVariants: [
      {
        variantName: 'Tanakan 40mg (Ipsen - Pháp)',
        manufacturer: 'Ipsen (Pháp)',
        ingredients: 'Cao lá Bạch quả EGb 761 chuẩn hóa 40mg',
        specialEffect: 'Cao chiết xuất EGb 761 tiêu chuẩn y học Pháp tăng lưu thông máu não và bảo vệ tế bào thần kinh.'
      },
      {
        variantName: 'Tebonin 120mg (Dr. Willmar Schwabe - Đức)',
        manufacturer: 'Dr. Willmar Schwabe (Đức)',
        ingredients: 'Chiết xuất Ginkgo biloba EGb 761 120mg',
        specialEffect: 'Hàm lượng cao 120mg dùng 1-2 lần/ngày trị ù tai, hoa mắt chóng mặt suy giảm trí nhớ.'
      }
    ],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'MIMS']
  },
  {
    id: 'rotundin',
    category: 'G',
    categoryName: 'G. Bệnh Lý Thần Kinh, Tiền Đình & Giấc Ngủ',
    groupName: 'Mất ngủ & An thần Đông Tây Y kết hợp',
    activeIngredient: 'Rotundin (L-Tetrahydropalmatine củ bình vôi)',
    commonBrandNames: ['Rotundin 30mg', 'Stilux-60', 'Rotunda'],
    indications: ['Mất ngủ, giấc ngủ chập chờn, lo âu căng thẳng'],
    mechanismOfAction: 'Ức chế thụ thể Dopamine D2 trung ương, tạo giấc ngủ sinh lý.',
    standardDosage: '30mg - 60mg trước khi đi ngủ 30-60 phút.',
    administration: 'Uống với nước ấm trước đi ngủ.',
    contraindications: ['Quá mẫn Rotundin', 'Trẻ em < 1 tuổi'],
    cautions: ['Không uống chung rượu bia.'],
    brandVariants: [
      {
        variantName: 'Stilux-60 (Dược Hậu Giang - DHG)',
        manufacturer: 'DHG Pharma',
        ingredients: 'L-Tetrahydropalmatine (Rotundin) 60mg',
        specialEffect: 'Hàm lượng 60mg chuyên dùng cho người mất ngủ mạn tính, hỗ trợ đi vào giấc ngủ tự nhiên nhẹ nhàng.'
      }
    ],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'Thuốc Biệt Dược Phạm Thiệp']
  },
  {
    id: 'sertraline',
    category: 'G',
    categoryName: 'G. Bệnh Lý Thần Kinh, Tiền Đình & Giấc Ngủ',
    groupName: 'Thuốc chống trầm cảm & Khống chế lo âu (SSRI)',
    activeIngredient: 'Sertraline HCl',
    commonBrandNames: ['Zoloft', 'Sertraline 50mg', 'Serlin'],
    indications: ['Trầm cảm mạn tính, rối loạn lo âu lan tỏa, rối loạn hoảng sợ, rối loạn ám ảnh cưỡng chế (OCD)'],
    mechanismOfAction: 'Ức chế chọn lọc tái hấp thu Serotonin (SSRI) tại khe synap thần kinh trung ương.',
    standardDosage: '50mg x 1 lần/ngày vào buổi sáng hoặc tối.',
    administration: 'Uống cùng bữa ăn.',
    contraindications: ['Dùng đồng thời thuốc ức chế MAO trong 14 ngày'],
    cautions: ['Tác dụng điều trị xuất hiện rõ sau 2 - 4 tuần.'],
    brandVariants: [
      {
        variantName: 'Zoloft 50mg (Pfizer - Mỹ)',
        manufacturer: 'Pfizer (Mỹ)',
        ingredients: 'Sertraline HCl 50mg',
        specialEffect: 'Biệt dược gốc SSRI chống trầm cảm và giải tỏa hội chứng rối loạn lo âu hoảng sợ hàng đầu.'
      }
    ],
    referenceSources: ['Goodman & Gilman’s', 'DiPiro Pharmacotherapy']
  }
];
