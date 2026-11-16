import type { WesternDrug } from './westernDrugs';

export const EXTRA_WESTERN_DRUGS: WesternDrug[] = [
  // =========================================================================
  // NHÓM A (BỔ SUNG): Đau, Sốt, Viêm, Giãn Cơ, Xương Khớp & Loãng Xương
  // =========================================================================
  {
    id: 'etoricoxib',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Kháng viêm chọn lọc COX-2 thế hệ mới (Coxib)',
    activeIngredient: 'Etoricoxib',
    commonBrandNames: ['Arcoxia 60mg', 'Arcoxia 90mg', 'Arcoxia 120mg', 'Etorix'],
    indications: [
      'Thoái hóa khớp gối, khớp háng, cột sống thắt lưng',
      'Viêm khớp dạng thấp, viêm cột sống dính khớp',
      'Cắt cơn đau sưng Gout cấp tính (120mg/ngày tối đa 8 ngày)',
      'Đau cấp tính sau phẫu thuật nha khoa hoặc chấn thương cơ xương khớp'
    ],
    mechanismOfAction: 'Ức chế chọn lọc rất cao enzym COX-2 ở ổ viêm gấp >100 lần COX-1, ngăn tổng hợp Prostaglandin gây đau sưng mà ít kích ứng niêm mạc dạ dày.',
    standardDosage: 'Thoái hóa khớp: 30-60mg x 1 lần/ngày; Viêm khớp dạng thấp: 60-90mg/ngày; Gout cấp: 120mg x 1 lần/ngày trong 5-8 ngày.',
    administration: 'Uống nguyên viên 1 lần/ngày, cùng hoặc xa bữa ăn đều được.',
    contraindications: [
      'Tăng huyết áp chưa kiểm soát (> 140/90 mmHg)',
      'Bệnh tim thiếu máu cục bộ, suy tim sung huyết NYHA II-IV, tiền sử đột quỵ',
      'Loét dạ dày tá tràng tiến triển, suy gan/thận nặng (eGFR < 30)'
    ],
    cautions: ['Theo dõi huyết áp và giữ nước phù chân khi sử dụng kéo dài; ưu tiên liều thấp nhất có hiệu quả.'],
    brandVariants: [
      {
        variantName: 'Arcoxia 60mg / 90mg / 120mg (MSD / Organon)',
        manufacturer: 'MSD / Organon',
        ingredients: 'Etoricoxib 60mg (viên xanh) / 90mg (viên trắng) / 120mg (viên xanh đậm)',
        specialEffect: 'Khởi phát giảm đau khớp nhanh trong 24 phút, dùng 1 viên duy nhất kiểm soát đau viêm cả 24 giờ.'
      }
    ],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'DiPiro Pharmacotherapy', 'ACR Gout Guidelines']
  },
  {
    id: 'naproxen',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Kháng viêm NSAID ít nguy cơ tim mạch nhất',
    activeIngredient: 'Naproxen / Naproxen Sodium',
    commonBrandNames: ['Naprosyn', 'Aleve', 'Apranax 550mg'],
    indications: [
      'Viêm khớp dạng thấp, thoái hóa khớp, viêm cột sống dính khớp',
      'Đau nửa đầu Migraine, đau bụng kinh nguyên phát',
      'Đau gân cơ, bong gân, cơn Gout cấp'
    ],
    mechanismOfAction: 'Ức chế không chọn lọc thuận nghịch COX-1 và COX-2, thời gian tác dụng kéo dài 12 giờ.',
    standardDosage: '250mg - 500mg x 2 lần/ngày (hoặc Naproxen Sodium 275mg - 550mg x 2 lần/ngày).',
    administration: 'Uống trong hoặc ngay sau bữa ăn với 1 ly nước đầy.',
    contraindications: ['Loét/xuất huyết tiêu hóa tiến triển', 'Suy thận nặng', '3 tháng cuối thai kỳ'],
    cautions: ['Là NSAID cổ điển ít làm tăng nguy cơ huyết khối tim mạch hơn các nhóm khác nhưng vẫn cần phối hợp PPI nếu có nguy cơ dạ dày.'],
    referenceSources: ['BNF', 'Goodman & Gilman’s']
  },
  {
    id: 'tramadol-paracetamol',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Giảm đau bậc 2 phối hợp (Opioid yếu + Paracetamol)',
    activeIngredient: 'Tramadol HCl + Paracetamol',
    commonBrandNames: ['Ultracet', 'Tramadol 37.5/325mg', 'Zaldiar'],
    indications: [
      'Đau mức độ trung bình đến nặng không đáp ứng với thuốc giảm đau thông thường',
      'Đau do thoát vị đĩa đệm cột sống, chèn ép rễ thần kinh tọa',
      'Đau sau phẫu thuật chấn thương chỉnh hình, đau ung thư giai đoạn sớm'
    ],
    mechanismOfAction: 'Tramadol gắn thụ thể Mu-opioid trung ương đồng thời ức chế tái hấp thu Serotonin và Noradrenaline, hiệp đồng với Paracetamol ức chế đường dẫn truyền đau.',
    standardDosage: '1 - 2 viên mỗi 4 - 6 giờ khi đau, tối đa 8 viên/ngày (không quá 300mg Tramadol/ngày).',
    administration: 'Uống nguyên viên không phụ thuộc bữa ăn.',
    contraindications: [
      'Ngộ độc rượu cấp, thuốc ngủ, opioid',
      'Đang dùng thuốc ức chế MAO trong 14 ngày',
      'Suy hô hấp nặng, động kinh chưa kiểm soát, suy gan nặng'
    ],
    cautions: ['Có thể gây buồn nôn, chóng mặt, táo bón; không tự ý lái xe và không vượt liều Paracetamol từ các nguồn khác.'],
    brandVariants: [
      {
        variantName: 'Ultracet (Janssen - Mỹ)',
        manufacturer: 'Janssen-Cilag',
        ingredients: 'Tramadol HCl 37.5mg + Paracetamol 325mg',
        specialEffect: 'Phối hợp giảm đau bậc 2 chuẩn quốc tế cắt nhanh cơn đau rễ thần kinh và đau sau phẫu thuật mà vẫn giảm được liều từng thành phần.'
      }
    ],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'WHO Pain Ladder']
  },
  {
    id: 'eperisone',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Thuốc giãn cơ vân tác dụng trung ương',
    activeIngredient: 'Eperisone HCl',
    commonBrandNames: ['Myonal 50mg', 'Eperisone 50mg', 'Eperison Stella'],
    indications: [
      'Co cứng cơ cổ vai gáy, đau lưng thắt lưng cấp và mạn tính',
      'Viêm quanh khớp vai, hội chứng đốt sống cổ',
      'Liệt cứng sau đột quỵ não hoặc bệnh lý tủy sống'
    ],
    mechanismOfAction: 'Ức chế phản xạ tủy sống và giảm nhạy cảm thoi cơ qua trung ương, đồng thời giãn mạch cải thiện vi tuần hoàn tại bó cơ co thắt.',
    standardDosage: 'Người lớn: 50mg x 3 lần/ngày sau các bữa ăn.',
    administration: 'Uống ngay sau bữa ăn sáng, trưa, tối.',
    contraindications: ['Mẫn cảm với Eperisone HCl'],
    cautions: ['Có thể gây yếu mỏi cơ nhẹ hoặc buồn ngủ thoáng qua; thận trọng ở người suy gan.'],
    brandVariants: [
      {
        variantName: 'Myonal 50mg (Eisai - Nhật Bản)',
        manufacturer: 'Eisai (Nhật Bản)',
        ingredients: 'Eperisone hydrochloride 50mg viên nén bao đường',
        specialEffect: 'Giãn cơ vân êm dịu hàng đầu giúp cắt vòng xoắn bệnh lý "Đau -> Co cứng cơ -> Thiếu máu cục bộ -> Đau hơn".'
      }
    ],
    referenceSources: ['MIMS Việt Nam', 'Phác đồ Cơ Xương Khớp BV Bạch Mai']
  },
  {
    id: 'tolperisone',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Thuốc giãn cơ vân không gây buồn ngủ',
    activeIngredient: 'Tolperisone HCl',
    commonBrandNames: ['Mydocalm 150mg', 'Mydocalm 50mg', 'Tolperison 150mg'],
    indications: [
      'Tăng trương lực cơ, co thắt cơ vân trong bệnh lý cột sống cổ - thắt lưng',
      'Co cứng cơ sau tai biến mạch máu não, đa xơ cứng',
      'Rối loạn tuần hoàn ngoại biên kèm co thắt mạch (hội chứng Raynaud)'
    ],
    mechanismOfAction: 'Ổn định màng tế bào thần kinh tại thân não và tủy sống (chẹn kênh Na+ và Ca2+ phụ thuộc điện thế), giảm phóng thích chất dẫn truyền kích thích phản xạ co cơ.',
    standardDosage: '150mg x 3 lần/ngày (tối đa 450mg/ngày) sau ăn.',
    administration: 'Uống ngay sau bữa ăn (thức ăn giúp tăng sinh khả dụng gấp đôi).',
    contraindications: ['Bệnh nhược cơ (Myasthenia gravis)', 'Quá mẫn Tolperisone'],
    cautions: ['Ít gây buồn ngủ hơn thuốc giãn cơ khác; ngưng ngay nếu nổi mẩn ngứa, khó thở dị ứng.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'Vidal']
  },
  {
    id: 'glucosamine-sulfate',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Chống thoái hóa khớp tác dụng chậm (SYSADOA)',
    activeIngredient: 'Glucosamine Sulfate (dạng tinh thể)',
    commonBrandNames: ['Viartril-S 1500mg', 'Glucosamin 1500mg', 'Jex Max'],
    indications: [
      'Thoái hóa khớp gối, khớp háng, khớp bàn tay, cột sống thể nhẹ đến vừa',
      'Khô khớp kêu lục cục khi vận động, hỗ trợ tái tạo sụn và dịch khớp'
    ],
    mechanismOfAction: 'Cung cấp nguyên liệu sinh tổng hợp Glycosaminoglycan và Proteoglycan cấu tạo nên chất nền sụn khớp, đồng thời ức chế enzym tiêu hủy sụn (MMP).',
    standardDosage: '1500mg x 1 lần/ngày liên tục tối thiểu 2 - 3 tháng.',
    administration: 'Pha 1 gói bột 1500mg vào 150ml nước uống trong bữa ăn.',
    contraindications: ['Dị ứng nặng với hải sản có vỏ (tôm, cua)', 'Phụ nữ mang thai và cho con bú'],
    cautions: ['Hiệu quả khởi phát chậm sau 2 - 4 tuần; kiểm tra đường huyết định kỳ ở bệnh nhân đái tháo đường và lưu ý tăng INR nếu dùng chung Warfarin.'],
    referenceSources: ['ESCEO Osteoarthritis Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'alendronate',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Điều trị loãng xương (Nhóm Bisphosphonate)',
    activeIngredient: 'Alendronate Sodium (+ Cholecalciferol D3)',
    commonBrandNames: ['Fosamax Plus 70mg/5600IU', 'Fosamax 70mg', 'Alendronat 70mg'],
    indications: [
      'Điều trị loãng xương ở phụ nữ sau mãn kinh (T-score <= -2.5)',
      'Loãng xương ở nam giới và loãng xương do dùng Corticoid kéo dài',
      'Giảm nguy cơ gãy xương đốt sống và cổ xương đùi'
    ],
    mechanismOfAction: 'Gắn chặt vào tinh thể Hydroxyapatite trên bề mặt xương, ức chế hoạt động hủy cốt bào (Osteoclast) làm giảm tiêu xương và tăng mật độ khoáng xương.',
    standardDosage: '70mg x 1 viên duy nhất mỗi tuần (chọn cố định 1 ngày trong tuần).',
    administration: 'QUAN TRỌNG: Uống vào sáng sớm ngay khi thức dậy, bụng hoàn toàn đói với 200ml nước lọc tinh khiết. Tuyệt đối KHÔNG nằm xuống hoặc ăn uống gì trong ít nhất 30 phút sau khi uống để tránh loét thực quản.',
    contraindications: ['Hẹp hoặc co thắt thực quản', 'Không thể ngồi/đứng thẳng tối thiểu 30 phút', 'Hạ Calci máu chưa điều chỉnh', 'Suy thận nặng eGFR < 35'],
    cautions: ['Bổ sung đủ Canxi và Vitamin D hàng ngày (uống cách xa giờ uống Alendronate); khám nha khoa trước điều trị để phòng hoại tử xương hàm.'],
    referenceSources: ['NOF Osteoporosis Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'dexamethasone',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Corticoid tác dụng kéo dài & Kháng viêm cực mạnh',
    activeIngredient: 'Dexamethasone',
    commonBrandNames: ['Dexamethason 0.5mg', 'Dexa tiêm 4mg/ml', 'Decadron'],
    indications: [
      'Phù não do u não, chấn thương sọ não, viêm màng não vi khuẩn',
      'Viêm thanh quản rít (Croup) ở trẻ em, suy hô hấp nặng cần thở oxy',
      'Phản ứng dị ứng nặng, sốc phản vệ, dự phòng nôn do hóa trị'
    ],
    mechanismOfAction: 'Glucocorticoid tổng hợp mạnh gấp ~25-30 lần Hydrocortisone, hầu như không giữ muối nước, tác dụng kháng viêm ức chế miễn dịch kéo dài 36-54 giờ.',
    standardDosage: 'Đường uống: 0.5mg - 9mg/ngày tùy chỉ định; Cấp cứu/phù não: tiêm tĩnh mạch 4-8mg theo phác đồ bệnh viện.',
    administration: 'Uống sau bữa ăn sáng; giảm liều từ từ nếu dùng quá 7-10 ngày.',
    contraindications: ['Nhiễm nấm toàn thân chưa điều trị', 'Loét dạ dày xuất huyết tiến triển (trừ cấp cứu đe dọa tính mạng)'],
    cautions: ['Không lạm dụng cho đau khớp thông thường vì nguy cơ loãng xương, suy thượng thận, tăng đường huyết và hội chứng Cushing.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'Goodman & Gilman’s']
  },

  // =========================================================================
  // NHÓM B (BỔ SUNG): Dạ Dày, Ruột, Tiêu Chảy, Táo Bón, Gan Mật & Bù Nước
  // =========================================================================
  {
    id: 'lansoprazole',
    category: 'B',
    categoryName: 'B. Bệnh Lý Tiêu Hóa - Dạ Dày - Gan Mật',
    groupName: 'Ức chế bơm proton (PPI)',
    activeIngredient: 'Lansoprazole',
    commonBrandNames: ['Lanzor 30mg', 'Prevacid', 'Lansoprazol Stada'],
    indications: [
      'Loét dạ dày tá tràng tiến triển, trào ngược dạ dày thực quản (GERD)',
      'Phối hợp kháng sinh tiệt trừ Helicobacter pylori',
      'Dự phòng loét tiêu hóa do NSAID'
    ],
    mechanismOfAction: 'Ức chế không thuận nghịch bơm H+/K+-ATPase tại tế bào thành dạ dày, giảm tiết acid cơ bản và acid kích thích sau ăn.',
    standardDosage: '30mg x 1 lần/ngày trong 4-8 tuần (loét tá tràng/dạ dày).',
    administration: 'Uống trước bữa ăn sáng 30 phút, nuốt nguyên viên nang.',
    contraindications: ['Quá mẫn Lansoprazole', 'Đang dùng Rilpivirine hoặc Atazanavir'],
    cautions: ['Thận trọng ở người suy gan nặng; không bẻ nghiền hạt vi nang kháng acid.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'BNF']
  },
  {
    id: 'famotidine',
    category: 'B',
    categoryName: 'B. Bệnh Lý Tiêu Hóa - Dạ Dày - Gan Mật',
    groupName: 'Kháng thụ thể Histamin H2 (Giảm acid dạ dày)',
    activeIngredient: 'Famotidine',
    commonBrandNames: ['Quamatel 20mg/40mg', 'Pepcid', 'Famotidin 40mg'],
    indications: [
      'Ợ nóng, trào ngược acid về đêm (uống buổi tối trước ngủ)',
      'Viêm loét dạ dày tá tràng mức độ nhẹ đến trung bình',
      'Lựa chọn thay thế an toàn khi cần tránh tương tác PPI với Clopidogrel'
    ],
    mechanismOfAction: 'Đối kháng cạnh tranh chọn lọc trên thụ thể H2 tại tế bào thành dạ dày, ức chế tiết acid dạ dày đặc biệt hiệu quả vào ban đêm.',
    standardDosage: '20mg x 2 lần/ngày hoặc 40mg x 1 lần vào buổi tối trước khi đi ngủ.',
    administration: 'Uống không phụ thuộc bữa ăn.',
    contraindications: ['Quá mẫn Famotidine hoặc thuốc kháng H2 khác'],
    cautions: ['Giảm 50% liều ở bệnh nhân suy thận (CrCl < 50 ml/phút); không ức chế enzym gan CYP450 nên rất ít tương tác thuốc.'],
    referenceSources: ['Goodman & Gilman’s', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'bismuth-subcitrate',
    category: 'B',
    categoryName: 'B. Bệnh Lý Tiêu Hóa - Dạ Dày - Gan Mật',
    groupName: 'Bảo vệ niêm mạc & Diệt H. pylori (Phác đồ 4 thuốc)',
    activeIngredient: 'Bismuth subcitrate / Bismuth subsalicylate',
    commonBrandNames: ['Trymo 120mg', 'Bismuth 120mg', 'Pepto-Bismol'],
    indications: [
      'Thành phần cốt lõi trong phác đồ 4 thuốc có Bismuth tiệt trừ vi khuẩn H. pylori kháng thuốc',
      'Viêm loét dạ dày tá tràng, tiêu chảy du lịch, rối loạn tiêu hóa'
    ],
    mechanismOfAction: 'Tạo lớp phức hợp glycoprotein bảo vệ ổ loét khỏi acid và pepsin, kích thích tiết Prostaglandin E2 nhầy bảo vệ và diệt trực tiếp màng tế bào vi khuẩn H. pylori (không bị kháng thuốc).',
    standardDosage: '120mg x 4 lần/ngày (hoặc 240mg x 2 lần/ngày) trong 14 ngày phối hợp PPI + Tetracycline + Metronidazole.',
    administration: 'Uống trước bữa ăn 30 phút và trước khi đi ngủ.',
    contraindications: ['Suy thận nặng', 'Phụ nữ mang thai và cho con bú', 'Trẻ em < 12 tuổi (với dạng subsalicylate)'],
    cautions: ['Thuốc làm phân có màu đen sẫm và hơi sậm màu lưỡi (hiện tượng vô hại do tạo Bismuth sulfide, cần phân biệt với xuất huyết tiêu hóa).'],
    referenceSources: ['Đồng thuận Maastricht VI H. pylori', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'sucralfate',
    category: 'B',
    categoryName: 'B. Bệnh Lý Tiêu Hóa - Dạ Dày - Gan Mật',
    groupName: 'Thuốc băng se ổ loét dạ dày tá tràng',
    activeIngredient: 'Sucralfate (Nhôm sucrose octasulfate)',
    commonBrandNames: ['Ulcar 1g', 'Sucrate Gel', 'Gastrogel-S'],
    indications: [
      'Viêm loét dạ dày tá tràng cấp và mạn tính',
      'Trào ngược dạ dày thực quản ở phụ nữ mang thai (hấp thu toàn thân cực thấp)'
    ],
    mechanismOfAction: 'Trong môi trường acid pH < 4, Sucralfate tạo chất nhầy kết dính chọn lọc vào đáy ổ loét (mang điện tích dương), tạo hàng rào vật lý ngăn acid và pepsin.',
    standardDosage: '1g x 4 lần/ngày lúc bụng đói (trước ăn 1 giờ và trước khi đi ngủ).',
    administration: 'Hòa tan gói hỗn dịch hoặc nhai/uống với nước khi đói; uống cách các thuốc khác tối thiểu 2 giờ.',
    contraindications: ['Suy thận nặng lọc máu (nguy cơ tích lũy nhôm)'],
    cautions: ['Có thể gây táo bón nhẹ và làm giảm hấp thu kháng sinh Fluoroquinolone, Levothyroxine, Digoxin nếu uống cùng lúc.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'UpToDate']
  },
  {
    id: 'loperamide',
    category: 'B',
    categoryName: 'B. Bệnh Lý Tiêu Hóa - Dạ Dày - Gan Mật',
    groupName: 'Giảm nhu động ruột cầm tiêu chảy cấp',
    activeIngredient: 'Loperamide HCl',
    commonBrandNames: ['Imodium 2mg', 'Loperamid 2mg'],
    indications: [
      'Tiêu chảy cấp không do nhiễm khuẩn xâm lấn (không sốt, không phân nhầy máu)',
      'Tiêu chảy mạn tính do hội chứng ruột kích thích hoặc sau cắt đoạn ruột'
    ],
    mechanismOfAction: 'Kích thích thụ thể Mu-opioid ở đám rối thần kinh thành ruột (không qua hàng rào máu não), làm giảm nhu động đẩy và tăng hấp thu nước điện giải.',
    standardDosage: 'Người lớn: Khởi đầu 4mg (2 viên), sau đó 2mg sau mỗi lần đi phân lỏng; tối đa 16mg/ngày.',
    administration: 'Uống cùng nước lọc; phối hợp bù nước Oresol.',
    contraindications: [
      'Lỵ trực khuẩn, tiêu chảy có sốt cao hoặc phân có máu/nhầy mủ (nguy cơ phình đại tràng nhiễm độc)',
      'Viêm đại tràng giả mạc do kháng sinh (C. difficile)',
      'Trẻ em < 2 tuổi (chống chỉ định tuyệt đối)'
    ],
    cautions: ['Ngưng thuốc sau 48 giờ nếu triệu chứng không cải thiện và đi khám bác sĩ.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'BNF']
  },
  {
    id: 'racecadotril',
    category: 'B',
    categoryName: 'B. Bệnh Lý Tiêu Hóa - Dạ Dày - Gan Mật',
    groupName: 'Chống tăng tiết dịch ruột an toàn (Kháng Enkephalinase)',
    activeIngredient: 'Racecadotril',
    commonBrandNames: ['Hidrasec 100mg', 'Hidrasec Trẻ em 10mg / 30mg', 'Racestad'],
    indications: [
      'Điều trị triệu chứng tiêu chảy cấp ở người lớn và trẻ em (từ 3 tháng tuổi) kết hợp Oresol'
    ],
    mechanismOfAction: 'Ức chế enzym Enkephalinase ngoại vi, bảo vệ Enkephalin nội sinh giúp giảm bài tiết nước và điện giải quá mức vào lòng ruột mà KHÔNG làm liệt nhu động ruột.',
    standardDosage: 'Người lớn: 100mg x 3 lần/ngày trước các bữa ăn chính (tối đa 7 ngày). Trẻ em: 1.5mg/kg/lần x 3 lần/ngày.',
    administration: 'Uống nguyên viên (người lớn) hoặc pha gói cốm vào ít nước/sữa cho trẻ uống ngay.',
    contraindications: ['Suy gan hoặc suy thận nặng', 'Tiêu chảy kèm máu và sốt cao kéo dài chưa rõ nguyên nhân'],
    cautions: ['Ưu điểm vượt trội Loperamide là không gây táo bón phản ứng và không giữ độc tố vi khuẩn trong lòng ruột.'],
    referenceSources: ['ESPGHAN Diarrhea Guidelines', 'Vidal Việt Nam']
  },
  {
    id: 'trimebutine',
    category: 'B',
    categoryName: 'B. Bệnh Lý Tiêu Hóa - Dạ Dày - Gan Mật',
    groupName: 'Điều hòa nhu động ruột (Hội chứng ruột kích thích IBS)',
    activeIngredient: 'Trimebutine maleate',
    commonBrandNames: ['Debridat 100mg', 'Debridat 200mg', 'Trimebutin Stella'],
    indications: [
      'Hội chứng ruột kích thích (IBS): đau quặn bụng, đầy hơi, xen kẽ táo bón và tiêu chảy',
      'Rối loạn chức năng đường tiêu hóa, trào ngược dạ dày ruột, liệt ruột sau mổ'
    ],
    mechanismOfAction: 'Điều hòa hai chiều lên thụ thể Enkephalinergic đường ruột: kích thích nhu động khi ruột giảm trương lực (táo bón) và ức chế khi ruột co thắt quá mức (đau quặn, tiêu chảy).',
    standardDosage: '100mg - 200mg x 3 lần/ngày trước bữa ăn.',
    administration: 'Uống trước bữa ăn 15 - 30 phút.',
    contraindications: ['Quá mẫn Trimebutine', 'Không dùng cho phụ nữ mang thai 3 tháng đầu'],
    cautions: ['Hiếm gặp chóng mặt hoặc buồn ngủ nhẹ.'],
    referenceSources: ['Rome IV Criteria', 'MIMS Việt Nam']
  },
  {
    id: 'lactulose',
    category: 'B',
    categoryName: 'B. Bệnh Lý Tiêu Hóa - Dạ Dày - Gan Mật',
    groupName: 'Nhuận tràng thẩm thấu (Trị táo bón & Bệnh não gan)',
    activeIngredient: 'Lactulose',
    commonBrandNames: ['Duphalac 667mg/ml', 'Duphalac gói 15ml', 'Lactulose Stada'],
    indications: [
      'Táo bón mạn tính ở người già, phụ nữ mang thai và trẻ em',
      'Dự phòng và điều trị bệnh não gan (tăng Amoniac máu ở bệnh nhân xơ gan)'
    ],
    mechanismOfAction: 'Disaccharide tổng hợp không bị tiêu hóa ở ruột non; xuống đại tràng được vi khuẩn phân giải thành acid hữu cơ hút nước làm mềm phân và acid hóa đại tràng giữ NH3 đào thải ra ngoài.',
    standardDosage: 'Táo bón người lớn: 15 - 45ml/ngày (1-3 gói), sau đó duy trì 15-30ml. Bệnh não gan: 30-45ml x 3-4 lần/ngày để đạt 2-3 lần phân mềm/ngày.',
    administration: 'Uống 1 lần vào buổi sáng, có thể pha với nước lọc hoặc nước ép.',
    contraindications: ['Tắc ruột cơ học, thủng ruột', 'Rối loạn dung nạp Galactose máu'],
    cautions: ['Tác dụng xuất hiện sau 24 - 48 giờ; cần uống đủ nước trong ngày; có thể gây đầy hơi nhẹ những ngày đầu.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'AASLD Hepatic Encephalopathy Guidelines']
  },
  {
    id: 'macrogol',
    category: 'B',
    categoryName: 'B. Bệnh Lý Tiêu Hóa - Dạ Dày - Gan Mật',
    groupName: 'Nhuận tràng thẩm thấu trơ (Chuẩn vàng trị táo bón)',
    activeIngredient: 'Macrogol 4000 (Polyethylene Glycol / PEG 4000)',
    commonBrandNames: ['Forlax 10g', 'Forlax 4g (Trẻ em)', 'Macrogol 4000'],
    indications: [
      'Điều trị triệu chứng táo bón chức năng ở người lớn và trẻ em từ 6 tháng tuổi'
    ],
    mechanismOfAction: 'Polymer cao phân tử trơ gắn kết các phân tử nước qua liên kết hydro trong lòng đại tràng, làm tăng lượng nước trong phân và kích thích nhu động ruột sinh lý tự nhiên không bị lên men.',
    standardDosage: 'Người lớn & trẻ > 8 tuổi: 1 - 2 gói 10g/ngày uống vào buổi sáng.',
    administration: 'Hòa tan 1 gói vào 1 cốc nước (~50-100ml) uống vào buổi sáng.',
    contraindications: ['Bệnh viêm ruột nặng (Crohn, viêm loét đại tràng nặng)', 'Tắc ruột hoặc đau bụng chưa rõ nguyên nhân'],
    cautions: ['Ít gây chướng bụng sinh hơi hơn Lactulose và an toàn dùng kéo dài nhiều tháng.'],
    referenceSources: ['WGO Constipation Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'ursodeoxycholic-acid',
    category: 'B',
    categoryName: 'B. Bệnh Lý Tiêu Hóa - Dạ Dày - Gan Mật',
    groupName: 'Thuốc tan sỏi mật & Bảo vệ tế bào đường mật',
    activeIngredient: 'Ursodeoxycholic acid (UDCA)',
    commonBrandNames: ['Ursofalk 250mg', 'Ursomax', 'Ursolvan'],
    indications: [
      'Xơ gan mật nguyên phát (PBC), viêm gan ứ mật, ứ mật thai kỳ',
      'Làm tan sỏi mật cholesterol không cản quang (< 15mm, túi mật còn hoạt động)',
      'Hỗ trợ bảo vệ tế bào gan nhiễm mỡ và viêm đường mật'
    ],
    mechanismOfAction: 'Acid mật thân nước thay thế các acid mật kỵ nước độc hại, ức chế hấp thu cholesterol tại ruột và bảo vệ màng tế bào gan - biểu mô ống mật khỏi tổn thương.',
    standardDosage: '10 - 15 mg/kg/ngày chia 2 lần (hoặc uống 1 lần buổi tối đối với làm tan sỏi mật).',
    administration: 'Nuốt nguyên viên với nước trong bữa ăn tối hoặc chia sáng/tối.',
    contraindications: ['Viêm túi mật cấp, tắc đường mật hoàn toàn', 'Sỏi mật vôi hóa cản quang'],
    cautions: ['Siêu âm kiểm tra kích thước sỏi mỗi 6 tháng; không dùng đồng thời với Cholestyramine hay Antacid chứa nhôm.'],
    brandVariants: [
      {
        variantName: 'Ursofalk 250mg / 500mg (Dr. Falk Pharma - Đức)',
        manufacturer: 'Dr. Falk Pharma (Đức)',
        ingredients: 'Acid Ursodeoxycholic 250mg viên nang / 500mg viên nén',
        specialEffect: 'Biệt dược chuẩn Đức hàng đầu điều trị bệnh gan ứ mật và bào mòn sỏi bùn - sỏi cholesterol túi mật.'
      }
    ],
    referenceSources: ['EASL Cholestatic Liver Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'probiotic-clausii-boulardii',
    category: 'B',
    categoryName: 'B. Bệnh Lý Tiêu Hóa - Dạ Dày - Gan Mật',
    groupName: 'Men vi sinh kháng kháng sinh & Phục hồi hệ vi sinh ruột',
    activeIngredient: 'Bacillus clausii / Saccharomyces boulardii',
    commonBrandNames: ['Enterogermina 2 tỷ / 4 tỷ bào tử', 'Bioflor 250mg'],
    indications: [
      'Phòng ngừa và điều trị loạn khuẩn đường ruột, tiêu chảy do dùng kháng sinh',
      'Hỗ trợ điều trị tiêu chảy cấp trẻ em và người lớn, hội chứng ruột kích thích'
    ],
    mechanismOfAction: 'Bào tử Bacillus clausii hoặc nấm men Saccharomyces boulardii sống sót qua acid dạ dày và nhiều kháng sinh thông thường, cạnh tranh chỗ bám và ức chế độc tố vi khuẩn gây hại.',
    standardDosage: 'Enterogermina 2 tỷ: Người lớn 2-3 ống/ngày; trẻ em 1-2 ống/ngày. Bioflor: 1-2 gói/vỉ/ngày.',
    administration: 'Lắc kỹ ống trước khi uống trực tiếp hoặc pha sữa/nước nguội (không pha nước sôi).',
    contraindications: ['Bệnh nhân đặt catheter tĩnh mạch trung tâm hoặc suy giảm miễn dịch nặng (đối với Saccharomyces boulardii)'],
    cautions: ['Nếu đang uống kháng sinh, nên uống Enterogermina xen kẽ giữa 2 lần uống kháng sinh.'],
    referenceSources: ['WGO Probiotics Guidelines', 'Vidal Việt Nam']
  },
  {
    id: 'oresol',
    category: 'B',
    categoryName: 'B. Bệnh Lý Tiêu Hóa - Dạ Dày - Gan Mật',
    groupName: 'Dung dịch bù nước và điện giải đường uống (ORS)',
    activeIngredient: 'Natri clorid + Kali clorid + Natri citrat + Glucose khan (Áp lực thẩm thấu thấp)',
    commonBrandNames: ['Oresol 245', 'Hydrite', 'Oresol Cam'],
    indications: [
      'Bù nước và điện giải trong tiêu chảy cấp, nôn ói, sốt cao, sốt xuất huyết, mất mồ hôi do lao động nắng nóng'
    ],
    mechanismOfAction: 'Đồng vận chuyển SGLT-1 tại vi nhung mao ruột non hấp thu chủ động Na+ kèm Glucose theo tỷ lệ 1:1, kéo nước vào tuần hoàn nhanh chóng ngay cả khi đang tiêu chảy.',
    standardDosage: 'Pha ĐÚNG 1 gói với đúng lượng nước ghi trên bao bì (200ml hoặc 1000ml); uống từng ngụm nhỏ liên tục.',
    administration: 'Pha bằng nước đun sôi để nguội; dung dịch đã pha chỉ dùng trong 24 giờ.',
    contraindications: ['Vô niệu, tắc ruột, liệt ruột, nôn không kiểm soát hoặc sốc nặng cần truyền tĩnh mạch'],
    cautions: ['CẢNH BÁO QUAN TRỌNG: Tuyệt đối KHÔNG pha nửa gói vào nửa cốc nước hoặc pha đặc hơn hướng dẫn vì gây tăng Natri máu co giật ở trẻ em.'],
    referenceSources: ['WHO / UNICEF ORS Standard', 'Dược thư Quốc gia Việt Nam']
  },

  // =========================================================================
  // NHÓM C (BỔ SUNG): Hô Hấp, Long Đờm, Giảm Ho, Xịt Mũi & COPD
  // =========================================================================
  {
    id: 'ambroxol',
    category: 'C',
    categoryName: 'C. Bệnh Lý Hô Hấp & Dị Ứng',
    groupName: 'Tiêu nhầy, long đờm & Kích thích thanh thải phế quản',
    activeIngredient: 'Ambroxol HCl',
    commonBrandNames: ['Mucosolvan 30mg', 'Mucosolvan Si-rô', 'Ambroxol Stella'],
    indications: [
      'Viêm phế quản cấp và mạn tính có đờm đặc quánh',
      'Giãn phế quản, COPD, viêm mũi xoang tiết dịch nhầy'
    ],
    mechanismOfAction: 'Chất chuyển hóa hoạt động của Bromhexine; cắt đứt sợi mucopolysaccharide của đờm, kích thích tế bào phế nang loại II tiết Surfactant làm trơn niêm mạc phế quản.',
    standardDosage: 'Người lớn: 30mg x 3 lần/ngày (hoặc viên phóng thích kéo dài 75mg x 1 lần/ngày).',
    administration: 'Uống sau bữa ăn với nhiều nước ấm để giúp loãng đờm tốt hơn.',
    contraindications: ['Loét dạ dày tá tràng tiến triển', 'Quá mẫn Ambroxol'],
    cautions: ['Không phối hợp đồng thời với thuốc ức chế phản xạ ho (Codein, Dextromethorphan) gây ứ đọng đờm.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'MIMS']
  },
  {
    id: 'bromhexine',
    category: 'C',
    categoryName: 'C. Bệnh Lý Hô Hấp & Dị Ứng',
    groupName: 'Long đờm tiêu chất nhầy phổ biến',
    activeIngredient: 'Bromhexine HCl',
    commonBrandNames: ['Bisolvon 8mg', 'Bromhexin 8mg', 'Bisolvon Kids'],
    indications: ['Rối loạn tiết dịch phế quản trong viêm phế quản cấp/mạn, bụi phổi, viêm xoang'],
    mechanismOfAction: 'Thủy phân các sợi mucoprotein acid làm giảm độ nhớt đờm và tăng hoạt động nhung mao đường hô hấp.',
    standardDosage: '8mg - 16mg x 3 lần/ngày ở người lớn.',
    administration: 'Uống ngay sau bữa ăn, uống nhiều nước.',
    contraindications: ['Quá mẫn Bromhexine', 'Thận trọng loét dạ dày'],
    cautions: ['Tăng nhẹ nồng độ một số kháng sinh (Amoxicillin, Cefuroxime) tại nhu mô phổi khi dùng kèm.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'dextromethorphan',
    category: 'C',
    categoryName: 'C. Bệnh Lý Hô Hấp & Dị Ứng',
    groupName: 'Giảm ho khan tác dụng trung ương (Không gây nghiện)',
    activeIngredient: 'Dextromethorphan HBr',
    commonBrandNames: ['Atussin', 'Methorphan', 'Toplexil (phối hợp)', 'Decolsin'],
    indications: ['Ho khan, ho kích ứng họng không có đờm do cảm lạnh hoặc hít khói bụi'],
    mechanismOfAction: 'Tác động lên trung tâm ho ở hành não nâng ngưỡng phản xạ ho mà không gây ức chế hô hấp ở liều điều trị.',
    standardDosage: '10mg - 20mg mỗi 4 giờ hoặc 30mg mỗi 6-8 giờ; tối đa 120mg/ngày.',
    administration: 'Uống không phụ thuộc bữa ăn.',
    contraindications: [
      'Ho có nhiều đờm (cấm dùng vì ứ đờm gây bít tắc phổi)',
      'Đang dùng thuốc ức chế MAO trong 14 ngày',
      'Trẻ em < 2 tuổi'
    ],
    cautions: ['Thận trọng khi dùng chung thuốc SSRI/SNRI (nguy cơ hội chứng Serotonin).'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'BNF']
  },
  {
    id: 'terpin-codein',
    category: 'C',
    categoryName: 'C. Bệnh Lý Hô Hấp & Dị Ứng',
    groupName: 'Giảm ho khan dai dẳng (Opioid yếu + Terpin)',
    activeIngredient: 'Codein + Terpin hydrat',
    commonBrandNames: ['Terpin Codein', 'Neo-Codion', 'Terpicodein'],
    indications: ['Ho khan, ho kích thích nhiều về đêm ở người lớn'],
    mechanismOfAction: 'Codein ức chế trực tiếp trung tâm ho ở hành tủy; Terpin hydrat làm dịu niêm mạc hô hấp.',
    standardDosage: 'Người lớn: 1 - 2 viên x 2 - 3 lần/ngày (tối đa 5 ngày).',
    administration: 'Uống sau bữa ăn.',
    contraindications: [
      'Trẻ em < 12 tuổi (và < 18 tuổi vừa cắt amidan/nạo VA)',
      'Suy hô hấp, hen phế quản cấp, ho có đờm nhiều',
      'Phụ nữ đang cho con bú'
    ],
    cautions: ['Gây buồn ngủ, táo bón; không lái xe hoặc vận hành máy móc sau khi uống.'],
    referenceSources: ['Cục Quản lý Dược Bộ Y Tế', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'desloratadine',
    category: 'C',
    categoryName: 'C. Bệnh Lý Hô Hấp & Dị Ứng',
    groupName: 'Kháng Histamin H1 thế hệ 2 (Chất chuyển hóa hoạt tính)',
    activeIngredient: 'Desloratadine',
    commonBrandNames: ['Aerius 5mg', 'Aerius Si-rô', 'Desloratadin 5mg'],
    indications: ['Viêm mũi dị ứng quanh năm và theo mùa', 'Mề đay tự phát mạn tính'],
    mechanismOfAction: 'Chất chuyển hóa chính có hoạt tính của Loratadine, ái lực chọn lọc gấp 15 lần với thụ thể H1 ngoại vi và hoàn toàn không gây buồn ngủ.',
    standardDosage: 'Người lớn & trẻ >= 12 tuổi: 5mg x 1 lần/ngày.',
    administration: 'Uống cùng hoặc xa bữa ăn đều được.',
    contraindications: ['Mẫn cảm Desloratadine hoặc Loratadine'],
    cautions: ['Điều chỉnh liều cách ngày nếu suy thận hoặc suy gan nặng.'],
    referenceSources: ['ARIA Allergic Rhinitis Guidelines', 'MIMS']
  },
  {
    id: 'levocetirizine',
    category: 'C',
    categoryName: 'C. Bệnh Lý Hô Hấp & Dị Ứng',
    groupName: 'Kháng Histamin H1 thế hệ mới (Đồng phân R của Cetirizine)',
    activeIngredient: 'Levocetirizine dihydrochloride',
    commonBrandNames: ['Xyzal 5mg', 'Levocetirizin 5mg', 'Lertazine'],
    indications: ['Viêm mũi dị ứng dai dẳng, mề đay, ngứa da dị ứng'],
    mechanismOfAction: 'Đồng phân có hoạt tính gấp đôi Cetirizine trên thụ thể H1 ngoại vi, khởi phát nhanh trong 1 giờ và kéo dài 24 giờ.',
    standardDosage: '5mg x 1 lần/ngày vào buổi tối.',
    administration: 'Uống nguyên viên trước hoặc sau ăn.',
    contraindications: ['Suy thận giai đoạn cuối (eGFR < 10 ml/phút)'],
    cautions: ['Ít buồn ngủ hơn Cetirizine nhưng vẫn cần thận trọng với người lái xe nếu dùng lần đầu.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'BNF']
  },
  {
    id: 'fluticasone-nasal',
    category: 'C',
    categoryName: 'C. Bệnh Lý Hô Hấp & Dị Ứng',
    groupName: 'Corticoid xịt mũi điều trị viêm mũi xoang dị ứng',
    activeIngredient: 'Fluticasone furoate / Fluticasone propionate',
    commonBrandNames: ['Avamys 27.5mcg', 'Flixonase 50mcg', 'Nasonex (Mometasone)'],
    indications: [
      'Viêm mũi dị ứng quanh năm hoặc theo mùa (nghẹt mũi, chảy nước mũi, ngứa mũi)',
      'Viêm mũi xoang mạn tính, dự phòng tái phát polyp mũi'
    ],
    mechanismOfAction: 'Kháng viêm Corticoid tại chỗ trên niêm mạc hốc mũi với sinh khả dụng toàn thân cực thấp (< 0.5%), giảm phù nề cuốn mũi.',
    standardDosage: 'Xịt mỗi bên mũi 1 - 2 nhát x 1 lần/ngày vào buổi sáng.',
    administration: 'Xì sạch mũi, lắc kỹ lọ, hướng đầu vòi xịt chếch ra phía cánh mũi ngoài (tránh xịt thẳng vào vách ngăn mũi).',
    contraindications: ['Nhiễm nấm/lao vùng mũi chưa điều trị, chảy máu cam tái diễn'],
    cautions: ['Cần xịt đều hàng ngày; hiệu quả tối đa đạt được sau 3-7 ngày sử dụng liên tục.'],
    brandVariants: [
      {
        variantName: 'Avamys 27.5mcg (GSK - Anh Quốc)',
        manufacturer: 'GSK',
        ingredients: 'Fluticasone furoate 27.5mcg/nhát xịt',
        specialEffect: 'Đầu xịt sương mịn lực nhẹ không gây sặc họng, giảm đồng thời triệu chứng nghẹt mũi và ngứa chảy nước mắt dị ứng.'
      }
    ],
    referenceSources: ['ARIA Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'budesonide-neb',
    category: 'C',
    categoryName: 'C. Bệnh Lý Hô Hấp & Dị Ứng',
    groupName: 'Corticoid khí dung đường hô hấp (ICS)',
    activeIngredient: 'Budesonide (Hỗn dịch khí dung)',
    commonBrandNames: ['Pulmicort Respules 0.5mg/2ml', 'Pulmicort 0.25mg', 'Budecort'],
    indications: [
      'Hen phế quản ở trẻ em và người lớn cần khí dung tại chỗ',
      'Viêm thanh khí phế quản cấp (Croup) có tiếng thở rít ở trẻ nhỏ'
    ],
    mechanismOfAction: 'Giảm phù nề niêm mạc thanh quản - phế quản và ức chế tế bào viêm đường thở tại chỗ qua máy phun khí dung.',
    standardDosage: 'Hen duy trì: 0.25 - 0.5mg x 2 lần/ngày; Đợt cấp/Croup: 1 - 2mg khí dung theo chỉ định bác sĩ.',
    administration: 'Đổ ống thuốc vào cốc máy khí dung (không dùng máy siêu âm); rửa mặt và súc miệng sạch sau khi xông.',
    contraindications: ['Mẫn cảm Budesonide'],
    cautions: ['Dùng mặt nạ vừa khít khuôn mặt trẻ và lau mặt sạch sau xông để tránh kích ứng da mặt hoặc nấm miệng.'],
    referenceSources: ['GINA Guidelines', 'Vidal Việt Nam']
  },
  {
    id: 'tiotropium',
    category: 'C',
    categoryName: 'C. Bệnh Lý Hô Hấp & Dị Ứng',
    groupName: 'Giãn phế quản tác dụng kéo dài (LAMA) cho COPD',
    activeIngredient: 'Tiotropium bromide',
    commonBrandNames: ['Spiriva Respimat 2.5mcg', 'Spiriva HandiHaler 18mcg'],
    indications: [
      'Điều trị duy trì bệnh phổi tắc nghẽn mạn tính (COPD) giúp giảm khó thở và đợt cấp',
      'Điều trị phối hợp hen phế quản nặng chưa kiểm soát với ICS/LABA'
    ],
    mechanismOfAction: 'Đối kháng cạnh tranh kéo dài thụ thể Muscarinic M3 trên cơ trơn phế quản, giữ đường thở giãn mở suốt 24 giờ.',
    standardDosage: 'Spiriva Respimat: Hít 2 nhát liên tiếp x 1 lần duy nhất mỗi ngày.',
    administration: 'Hít vào cùng 1 giờ mỗi ngày bằng ống hít chuyên dụng Respimat hoặc HandiHaler (tuyệt đối không nuốt viên nang).',
    contraindications: ['Quá mẫn Atropin hoặc dẫn xuất Ipratropium/Tiotropium'],
    cautions: ['Thận trọng ở bệnh nhân tăng nhãn áp góc đóng, phì đại tuyến tiền liệt hoặc bí tiểu.'],
    referenceSources: ['GOLD 2025 COPD Guidelines', 'BNF']
  },

  // =========================================================================
  // NHÓM D (BỔ SUNG): Kháng Sinh, Kháng Nấm, Virus & Ký Sinh Trùng
  // =========================================================================
  {
    id: 'amoxicillin',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh Aminopenicillin phổ biến nhất',
    activeIngredient: 'Amoxicillin',
    commonBrandNames: ['Amoxil', 'Amoxicillin 500mg', 'Ospamox'],
    indications: [
      'Viêm họng liên cầu, viêm amidan, viêm tai giữa cấp',
      'Viêm phổi cộng đồng nhẹ, áp xe răng miệng',
      'Phác đồ tiệt trừ H. pylori (1000mg x 2 lần/ngày)'
    ],
    mechanismOfAction: 'Gắn protein gắn Penicillin (PBPs) ức chế tổng hợp vách Peptidoglycan làm ly giải vi khuẩn.',
    standardDosage: '500mg x 3 lần/ngày (hoặc 1000mg x 2 lần/ngày trong H. pylori/viêm phổi).',
    administration: 'Uống trước hoặc sau ăn đều được.',
    contraindications: ['Tiền sử dị ứng Penicillin hoặc Cephalosporin nặng'],
    cautions: ['Có thể gây phát ban nếu bệnh nhân đang nhiễm tăng bạch cầu đơn nhân nhiễm khuẩn (EBV); không dùng cho vi khuẩn tiết Beta-lactamase (cần phối hợp Clavulanic).'],
    referenceSources: ['The Sanford Guide', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'cephalexin',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh Cephalosporin Thế hệ 1',
    activeIngredient: 'Cephalexin',
    commonBrandNames: ['Keflex', 'Ospexin 500mg', 'Cephalexin 500mg'],
    indications: [
      'Nhiễm khuẩn da và mô mềm (nhọt, viêm mô tế bào nhẹ, chốc lở do tụ cầu/liên cầu)',
      'Viêm họng, viêm đường tiết niệu không biến chứng (an toàn thai kỳ)'
    ],
    mechanismOfAction: 'Ức chế tổng hợp vách tế bào vi khuẩn, ưu thế mạnh trên cầu khuẩn Gram dương nhạy cảm.',
    standardDosage: '500mg x 2 - 4 lần/ngày (cách mỗi 6-12 giờ) trong 7 ngày.',
    administration: 'Uống lúc đói hoặc sau ăn nhẹ nếu kích ứng dạ dày.',
    contraindications: ['Dị ứng Cephalosporin hoặc tiền sử sốc phản vệ do Penicillin'],
    cautions: ['Điều chỉnh khoảng cách liều ở người suy thận nặng.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'Sanford Guide']
  },
  {
    id: 'cefpodoxime',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh Cephalosporin Thế hệ 3 đường uống',
    activeIngredient: 'Cefpodoxime proxetil',
    commonBrandNames: ['Orelox 100mg', 'Cefpodoxim 200mg', 'Hapuxin'],
    indications: [
      'Viêm phổi mắc phải cộng đồng, đợt cấp viêm phế quản mạn, viêm xoang cấp',
      'Nhiễm khuẩn đường tiết niệu, viêm họng tái phát'
    ],
    mechanismOfAction: 'Tiền chất hấp thu đường ruột chuyển thành Cefpodoxime ức chế vách tế bào vi khuẩn Gram âm và Gram dương bền vững với Beta-lactamase.',
    standardDosage: '100mg - 200mg x 2 lần/ngày (cách mỗi 12 giờ).',
    administration: 'BẮT BUỘC uống ngay sau bữa ăn để thức ăn và acid dạ dày giúp hấp thu thuốc tối ưu.',
    contraindications: ['Dị ứng Cephalosporin'],
    cautions: ['Không uống đồng thời với Antacid hoặc thuốc giảm acid mạnh lúc đói vì làm giảm hấp thu.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'MIMS']
  },
  {
    id: 'clarithromycin',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh Macrolide diệt H. pylori & Viêm phổi không điển hình',
    activeIngredient: 'Clarithromycin',
    commonBrandNames: ['Klacid 500mg', 'Klacid MR', 'Clarithromycin Stada'],
    indications: [
      'Phác đồ diệt vi khuẩn dạ dày Helicobacter pylori',
      'Viêm phổi do Mycoplasma, Chlamydia, Legionella',
      'Viêm xoang, viêm amidan, nhiễm khuẩn da mô mềm ở người dị ứng Penicillin'
    ],
    mechanismOfAction: 'Gắn tiểu đơn vị 50S ribosom vi khuẩn ngăn tổng hợp chuỗi peptid.',
    standardDosage: '250mg - 500mg x 2 lần/ngày (cách mỗi 12 giờ).',
    administration: 'Uống cùng hoặc không cùng thức ăn; viên MR uống sau ăn.',
    contraindications: [
      'Đang dùng Simvastatin, Lovastatin, Colchicine (ở bệnh nhân suy gan/thận), Terfenadine, Domperidone',
      'Tiền sử kéo dài khoảng QT hoặc rối loạn nhịp thất'
    ],
    cautions: ['Ức chế cực mạnh CYP3A4 gây tương tác với nhiều thuốc tim mạch và Statin; thường gây vị đắng miệng nhẹ.'],
    referenceSources: ['The Sanford Guide', 'Goodman & Gilman’s']
  },
  {
    id: 'levofloxacin',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh Fluoroquinolon hô hấp & tiết niệu',
    activeIngredient: 'Levofloxacin',
    commonBrandNames: ['Tavanic 500mg', 'Cravit 500mg', 'Levofloxacin 500mg'],
    indications: [
      'Viêm phổi mắc phải cộng đồng (kể cả vi khuẩn không điển hình)',
      'Viêm thận bể thận cấp, viêm tuyến tiền liệt nhiễm khuẩn, nhiễm khuẩn tiết niệu phức tạp'
    ],
    mechanismOfAction: 'Đồng phân tả truyền của Ofloxacin; ức chế đồng thời DNA gyrase và Topoisomerase IV ngăn nhân đôi DNA vi khuẩn.',
    standardDosage: '500mg - 750mg x 1 lần/ngày.',
    administration: 'Uống cách xa sắt, kẽm, canxi, sucralfate và thuốc dạ dày chữ Y/P tối thiểu 2 giờ.',
    contraindications: ['Trẻ em < 18 tuổi, phụ nữ có thai hoặc đang cho con bú', 'Tiền sử đứt gân do Quinolon, bệnh nhược cơ'],
    cautions: ['Ngưng thuốc ngay nếu đau sưng gân gót chân Achilles, tê bì dây thần kinh hoặc hạ/tăng đường huyết bất thường.'],
    referenceSources: ['IDSA Pneumonia Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'doxycycline',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh Tetracycline phổ rộng thế hệ 2',
    activeIngredient: 'Doxycycline',
    commonBrandNames: ['Vibramycin 100mg', 'Doxycyclin 100mg', 'Doxy Stada'],
    indications: [
      'Nhiễm Chlamydia đường sinh dục, bệnh lây truyền qua đường tình dục',
      'Mụn trứng cá viêm mức độ trung bình - nặng',
      'Sốt mò (Orientia tsutsugamushi), bệnh Lyme, dự phòng sốt rét'
    ],
    mechanismOfAction: 'Gắn tiểu đơn vị 30S ribosom ngăn gắn tRNA mang acid amin vào chuỗi protein vi khuẩn.',
    standardDosage: '100mg x 2 lần/ngày (hoặc 100mg x 1 lần/ngày trị mụn trứng cá theo đợt).',
    administration: 'QUAN TRỌNG: Uống ở tư thế ĐỨNG hoặc NGỒI THẲNG với 1 ly nước đầy (~250ml), tuyệt đối không nằm xuống ngay trong 30 phút để tránh loét thực quản.',
    contraindications: ['Phụ nữ có thai (gây vàng răng, ức chế xương thai nhi)', 'Trẻ em < 8 tuổi'],
    cautions: ['Tránh nắng gắt khi dùng thuốc vì dễ gây bỏng nắng nhạy cảm ánh sáng; uống cách xa sữa và sắt/canxi 2 giờ.'],
    referenceSources: ['CDC STI Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'clindamycin',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh Lincosamide (Áp xe răng, da & kỵ khí)',
    activeIngredient: 'Clindamycin',
    commonBrandNames: ['Dalacin C 300mg', 'Clindamycin 300mg', 'Clindacin'],
    indications: [
      'Nhiễm khuẩn răng hàm mặt nặng, viêm tủy xương, áp xe quanh răng',
      'Nhiễm khuẩn da mô mềm do tụ cầu/liên cầu (người dị ứng Penicillin)',
      'Nhiễm khuẩn kỵ khí vùng chậu hoặc ổ bụng'
    ],
    mechanismOfAction: 'Gắn 50S ribosom ức chế tổng hợp protein vi khuẩn Gram dương và kỵ khí, thấm rất tốt vào mô xương và ổ áp xe.',
    standardDosage: '150mg - 300mg mỗi 6 giờ (hoặc 300mg x 3 lần/ngày).',
    administration: 'Uống với một ly nước đầy và giữ tư thế thẳng 30 phút để tránh kích ứng thực quản.',
    contraindications: ['Tiền sử viêm đại tràng do kháng sinh / Clostridium difficile'],
    cautions: ['Ngưng thuốc và đi khám ngay nếu xuất hiện tiêu chảy nhiều nước hoặc phân có máu.'],
    referenceSources: ['The Sanford Guide', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'fosfomycin',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh đặc hiệu đường tiểu (Liều duy nhất)',
    activeIngredient: 'Fosfomycin trometamol',
    commonBrandNames: ['Monurol 3g', 'Fosfomycin 3g'],
    indications: [
      'Viêm bàng quang cấp không biến chứng (tiểu buốt, tiểu rắt do E. coli) ở phụ nữ, kể cả phụ nữ có thai'
    ],
    mechanismOfAction: 'Ức chế enzym MurA ở bước đầu tiên tổng hợp vách vi khuẩn, đạt nồng độ diệt khuẩn cực cao và duy trì > 48 giờ trong nước tiểu.',
    standardDosage: 'Uống 1 gói 3g LIỀU DUY NHẤT.',
    administration: 'Hòa tan 1 gói vào 1 cốc nước, uống lúc bụng đói trước khi đi ngủ (sau khi đã đi tiểu sạch bàng quang).',
    contraindications: ['Suy thận nặng (CrCl < 10 ml/phút)'],
    cautions: ['Ít kháng thuốc và rất tiện lợi vì chỉ cần uống 1 lần duy nhất.'],
    referenceSources: ['EAU Urological Infections Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'oseltamivir',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Thuốc kháng virus Cúm A / B',
    activeIngredient: 'Oseltamivir phosphate',
    commonBrandNames: ['Tamiflu 75mg', 'Fluhalt 75mg', 'Oseltamivir Stada'],
    indications: [
      'Điều trị cúm A (H1N1, H3N2) và cúm B trong vòng 48 giờ đầu kể từ khi khởi phát sốt',
      'Dự phòng sau phơi nhiễm cúm cho người nguy cơ cao'
    ],
    mechanismOfAction: 'Ức chế enzym Neuraminidase của virus cúm, ngăn cản giải phóng hạt virus mới từ tế bào nhiễm sang tế bào lành.',
    standardDosage: 'Điều trị người lớn (>= 40kg): 75mg x 2 lần/ngày trong 5 ngày; Dự phòng: 75mg x 1 lần/ngày trong 7-10 ngày.',
    administration: 'Uống ngay trong hoặc sau bữa ăn để giảm buồn nôn.',
    contraindications: ['Mẫn cảm Oseltamivir'],
    cautions: ['Hiệu quả cao nhất khi uống sớm trong 48 giờ đầu sốt ho; giảm liều nếu CrCl < 60 ml/phút.'],
    brandVariants: [
      {
        variantName: 'Tamiflu 75mg (Roche - Thụy Sĩ)',
        manufacturer: 'Roche (Thụy Sĩ)',
        ingredients: 'Oseltamivir phosphate 75mg',
        specialEffect: 'Thuốc kháng virus cúm chuẩn toàn cầu giúp rút ngắn thời gian sốt và giảm nguy cơ biến chứng viêm phổi do cúm A/B.'
      }
    ],
    referenceSources: ['CDC Influenza Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'valacyclovir',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Thuốc kháng virus Zona & Herpes sinh khả dụng cao',
    activeIngredient: 'Valacyclovir HCl',
    commonBrandNames: ['Valtrex 500mg', 'Valacyclovir 500mg', 'Zelavir'],
    indications: [
      'Bệnh Zona thần kinh (Herpes zoster) — giảm nhanh mụn nước và nguy cơ đau dây thần kinh sau Zona',
      'Herpes môi và Herpes sinh dục tái phát'
    ],
    mechanismOfAction: 'Tiền chất L-valyl ester của Acyclovir cho sinh khả dụng đường uống cao gấp 3-5 lần Acyclovir, giảm số lần uống trong ngày.',
    standardDosage: 'Zona thần kinh: 1000mg (2 viên 500mg) x 3 lần/ngày trong 7 ngày; Herpes môi: 2000mg x 2 lần cách nhau 12h trong 1 ngày.',
    administration: 'Uống với nhiều nước, khởi đầu càng sớm càng tốt trong vòng 72 giờ kể từ khi nổi ban.',
    contraindications: ['Quá mẫn Valacyclovir hoặc Acyclovir'],
    cautions: ['Uống đủ 2 lít nước/ngày để tránh kết tinh thuốc tại ống thận; chỉnh liều ở người suy thận.'],
    referenceSources: ['DiPiro Pharmacotherapy', 'BNF']
  },
  {
    id: 'itraconazole',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Thuốc kháng nấm phổ rộng (Nấm da, lang ben, nấm móng)',
    activeIngredient: 'Itraconazole',
    commonBrandNames: ['Sporal 100mg', 'Itraconazol 100mg', 'Canditral'],
    indications: [
      'Nấm móng tay/chân, hắc lào, lang ben, nấm kẽ chân dai dẳng',
      'Nấm Candida âm đạo hoặc thực quản tái phát'
    ],
    mechanismOfAction: 'Ức chế enzym 14-alpha-demethylase phụ thuộc Cytochrome P450 của tế bào nấm, làm cạn kiệt Ergosterol màng tế bào nấm.',
    standardDosage: 'Lang ben: 200mg x 1 lần/ngày x 7 ngày; Nấm móng: liệu trình xung 200mg x 2 lần/ngày x 7 ngày/tháng (2-3 đợt).',
    administration: 'Viên nang Sporal BẮT BUỘC uống ngay sau bữa ăn no đầy đủ (môi trường acid giúp hấp thu).',
    contraindications: ['Suy tim sung huyết', 'Đang dùng Simvastatin, Atorvastatin liều cao, Quinidine, Midazolam đường uống', 'Phụ nữ có thai'],
    cautions: ['Theo dõi men gan định kỳ nếu điều trị nấm móng kéo dài; nhiều tương tác thuốc qua CYP3A4.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'MIMS']
  },
  {
    id: 'albendazole',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Thuốc tẩy giun sán phổ rộng',
    activeIngredient: 'Albendazole',
    commonBrandNames: ['Zentel 400mg', 'Albendazol 400mg', 'Fugacar (Mebendazole 500mg)'],
    indications: [
      'Tẩy giun đũa, giun kim, giun móc, giun tóc định kỳ mỗi 6 tháng',
      'Điều trị nhiễm sán dây, ấu trùng sán lợn thần kinh, giun lươn (phác đồ kéo dài)'
    ],
    mechanismOfAction: 'Gắn vào Beta-tubulin của ký sinh trùng ức chế trùng hợp vi ống và chặn hấp thu Glucose, làm ký sinh trùng cạn năng lượng chết.',
    standardDosage: 'Tẩy giun thông thường (người lớn & trẻ >= 2 tuổi): 400mg (1 viên) liều duy nhất.',
    administration: 'Nhai kỹ viên thuốc rồi uống với nước, dùng sau bữa ăn sáng hoặc tối.',
    contraindications: ['Phụ nữ đang mang thai hoặc nghi ngờ có thai', 'Trẻ em < 1 tuổi'],
    cautions: ['Nên tẩy giun đồng thời cho cả gia đình đối với nhiễm giun kim; tránh có thai ít nhất 1 tháng sau khi uống.'],
    referenceSources: ['WHO Deworming Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'tenofovir-tdf',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Thuốc kháng virus Viêm Gan B mạn tính (Đầu tay)',
    activeIngredient: 'Tenofovir disoproxil fumarate (TDF) / Tenofovir alafenamide (TAF)',
    commonBrandNames: ['Viread 300mg', 'Vemlidy 25mg (TAF)', 'Tenohealth', 'Getofir'],
    indications: [
      'Điều trị Viêm gan virus B (HBV) mạn tính ở người lớn và trẻ >= 12 tuổi có tăng men gan hoặc xơ hóa gan',
      'Dự phòng lây truyền HBV mẹ sang con trong 3 tháng cuối thai kỳ (chỉ định theo bác sĩ)'
    ],
    mechanismOfAction: 'Chất tương tự Nucleotid ức chế cạnh tranh enzym sao chép ngược DNA Polymerase của virus HBV, cắt đứt chuỗi tổng hợp DNA virus với hàng rào kháng thuốc cực cao.',
    standardDosage: 'TDF: 300mg x 1 lần/ngày (hoặc TAF 25mg x 1 lần/ngày). Uống liên tục đúng giờ hàng ngày, không tự ý ngưng thuốc.',
    administration: 'TDF: uống cùng hoặc xa bữa ăn đều được; TAF (Vemlidy): uống cùng thức ăn.',
    contraindications: ['Quá mẫn Tenofovir', 'Cẩn trọng suy thận nặng (với TDF, chuyển sang TAF)'],
    cautions: ['TUYỆT ĐỐI KHÔNG tự ý bỏ thuốc vì có thể gây bùng phát viêm gan B cấp dữ dội; xét nghiệm định kỳ HBV-DNA, AST/ALT, Creatinine thận.'],
    referenceSources: ['Phác đồ Viêm Gan B Bộ Y Tế', 'AASLD / EASL HBV Guidelines']
  },

  // =========================================================================
  // NHÓM E (BỔ SUNG): Tim Mạch, Huyết Áp, Suy Tim, Lợi Tiểu & Mỡ Máu
  // =========================================================================
  {
    id: 'perindopril',
    category: 'E',
    categoryName: 'E. Bệnh Lý Tim Mạch, Huyết Áp & Mỡ Máu',
    groupName: 'Ức chế men chuyển (ACEi) bảo vệ tim mạch hàng đầu',
    activeIngredient: 'Perindopril arginine',
    commonBrandNames: ['Coversyl 5mg', 'Coversyl 10mg', 'Coversyl Plus', 'Coveram'],
    indications: [
      'Tăng huyết áp nguyên phát',
      'Bệnh động mạch vành ổn định (giảm nguy cơ nhồi máu cơ tim)',
      'Suy tim mạn tính có triệu chứng'
    ],
    mechanismOfAction: 'Ức chế enzym chuyển Angiotensin (ACE) làm giảm Angiotensin II co mạch và Aldosterone, giúp giãn mạch êm dịu 24 giờ và bảo vệ nội mô mạch máu.',
    standardDosage: '5mg - 10mg x 1 lần/ngày vào buổi sáng.',
    administration: 'Uống 1 lần vào buổi sáng trước bữa ăn để hấp thu tốt nhất.',
    contraindications: ['Phụ nữ mang thai', 'Tiền sử phù mạch do ACEi', 'Hẹp động mạch thận hai bên'],
    cautions: ['Có thể gây ho khan kích ứng họng (chuyển sang ARB như Telmisartan/Valsartan nếu ho nhiều); theo dõi Kali máu và Creatinine.'],
    brandVariants: [
      {
        variantName: 'Coversyl 5mg / 10mg & Coveram (Servier - Pháp)',
        manufacturer: 'Servier (Pháp)',
        ingredients: 'Perindopril arginine 5mg/10mg (Coveram phối hợp thêm Amlodipine)',
        specialEffect: 'Viên ACEi được kê đơn phổ biến nhất tại Việt Nam giúp kiểm soát huyết áp ổn định 24h và bảo vệ mạch vành.'
      }
    ],
    referenceSources: ['ESC 2024 Hypertension Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'valsartan',
    category: 'E',
    categoryName: 'E. Bệnh Lý Tim Mạch, Huyết Áp & Mỡ Máu',
    groupName: 'Chẹn thụ thể Angiotensin II (ARB) cho Huyết áp & Suy tim',
    activeIngredient: 'Valsartan',
    commonBrandNames: ['Diovan 80mg / 160mg', 'Co-Diovan', 'Exforge (phối hợp Amlodipine)'],
    indications: [
      'Tăng huyết áp (đơn trị hoặc phối hợp Amlodipine/HCTZ)',
      'Suy tim mạn tính hoặc sau nhồi máu cơ tim có rối loạn chức năng thất trái'
    ],
    mechanismOfAction: 'Chẹn chọn lọc thụ thể AT1 của Angiotensin II, giãn tiểu động mạch giảm hậu tải mà không gây ho khan như nhóm ACEi.',
    standardDosage: '80mg - 160mg x 1 lần/ngày (hoặc tối đa 320mg/ngày chia 1-2 lần).',
    administration: 'Uống cố định 1 giờ mỗi ngày, không phụ thuộc bữa ăn.',
    contraindications: ['Phụ nữ mang thai', 'Suy gan nặng xơ gan ứ mật'],
    cautions: ['Kiểm tra Kali máu và chức năng thận định kỳ; không phối hợp thêm với thuốc ức chế men chuyển hoặc Aliskiren.'],
    referenceSources: ['ESC Heart Failure Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'sacubitril-valsartan',
    category: 'E',
    categoryName: 'E. Bệnh Lý Tim Mạch, Huyết Áp & Mỡ Máu',
    groupName: 'Ức chế thụ thể Angiotensin - Neprilysin (ARNI - Trụ cột Suy Tim)',
    activeIngredient: 'Sacubitril + Valsartan',
    commonBrandNames: ['Entresto 50mg', 'Entresto 100mg', 'Entresto 200mg'],
    indications: [
      'Điều trị suy tim mạn tính có phân suất tống máu giảm (HFrEF) giúp giảm nhập viện và tử vong rõ rệt'
    ],
    mechanismOfAction: 'Sacubitril ức chế Neprilysin làm tăng các peptid lợi niệu nội sinh (ANP/BNP) gây giãn mạch thải muối; Valsartan chẹn thụ thể AT1 ngăn kích hoạt hệ RAAS.',
    standardDosage: 'Khởi đầu 50mg x 2 lần/ngày (hoặc 100mg x 2 lần/ngày), tăng dần mỗi 2-4 tuần tới liều đích 200mg x 2 lần/ngày nếu dung nạp.',
    administration: 'Uống 2 lần/ngày (sáng - tối), không phụ thuộc bữa ăn.',
    contraindications: [
      'BẮT BUỘC ngưng thuốc ức chế men chuyển (ACEi như Enalapril, Perindopril) ít nhất 36 GIỜ trước khi uống Entresto để tránh phù mạch đe dọa tính mạng',
      'Phụ nữ có thai, suy gan nặng'
    ],
    cautions: ['Theo dõi huyết áp (tránh tụt áp tư thế), Kali máu và eGFR sau mỗi lần tăng liều.'],
    referenceSources: ['PARADIGM-HF Trial', 'ESC Heart Failure Guidelines']
  },
  {
    id: 'carvedilol',
    category: 'E',
    categoryName: 'E. Bệnh Lý Tim Mạch, Huyết Áp & Mỡ Máu',
    groupName: 'Chẹn Beta không chọn lọc + Chẹn Alpha-1 (Suy tim & Tăng HA)',
    activeIngredient: 'Carvedilol',
    commonBrandNames: ['Dilatrend 6.25mg / 12.5mg / 25mg', 'Talliton', 'Carvedilol Stella'],
    indications: [
      'Suy tim mạn tính ổn định mọi mức độ (tăng phân suất tống máu EF)',
      'Tăng huyết áp, đau thắt ngực ổn định, sau nhồi máu cơ tim'
    ],
    mechanismOfAction: 'Chẹn Beta-1 giảm nhịp tim, chẹn Alpha-1 giãn mạch ngoại vi giảm sức cản ngoại biên và có hoạt tính chống oxy hóa bảo vệ cơ tim.',
    standardDosage: 'Suy tim khởi đầu rất thấp 3.125mg x 2 lần/ngày, tăng gấp đôi mỗi 2 tuần tới 25mg x 2 lần/ngày.',
    administration: 'Uống ngay trong bữa ăn để làm chậm hấp thu và giảm nguy cơ tụt huyết áp tư thế.',
    contraindications: ['Hen phế quản/co thắt phế quản', 'Nhịp tim chậm < 50 lần/phút, block nhĩ thất độ II-III', 'Suy tim mất bù đang phải truyền vận mạch'],
    cautions: ['Tuyệt đối không ngưng thuốc đột ngột vì gây cơn đau thắt ngực hoặc nhịp nhanh dội ngược.'],
    referenceSources: ['ESC Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'furosemide',
    category: 'E',
    categoryName: 'E. Bệnh Lý Tim Mạch, Huyết Áp & Mỡ Máu',
    groupName: 'Thuốc lợi tiểu quai thải nước mạnh (Suy tim, Phù, Suy thận)',
    activeIngredient: 'Furosemide',
    commonBrandNames: ['Lasix 40mg', 'Furosemid 40mg', 'Lasix tiêm 20mg/2ml'],
    indications: [
      'Phù phổi cấp, ứ dịch sung huyết trong suy tim mạn/cấp',
      'Phù nặng do xơ gan cổ trướng, hội chứng thận hư, suy thận mạn',
      'Cơn tăng huyết áp kèm quá tải dịch'
    ],
    mechanismOfAction: 'Ức chế đồng vận chuyển Na+-K+-2Cl- ở nhánh lên dày quai Henle, gây thải nhanh lượng lớn nước, Na+, K+, Cl- qua thận.',
    standardDosage: 'Uống 20mg - 80mg/ngày (sáng, hoặc sáng + trưa).',
    administration: 'Uống vào buổi sáng (hoặc trước 15h chiều) để tránh tiểu đêm gây mất ngủ.',
    contraindications: ['Vô niệu, mất nước giảm thể tích nặng', 'Hạ Kali máu hoặc hạ Natri máu nặng'],
    cautions: ['Gây mất Kali và Magie máu -> hay phối hợp Spironolactone hoặc bổ sung Kali; theo dõi cân nặng, điện giải đồ và axit uric.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'Goodman & Gilman’s']
  },
  {
    id: 'spironolactone',
    category: 'E',
    categoryName: 'E. Bệnh Lý Tim Mạch, Huyết Áp & Mỡ Máu',
    groupName: 'Lợi tiểu giữ Kali / Kháng Aldosterone (MRA)',
    activeIngredient: 'Spironolactone',
    commonBrandNames: ['Aldactone 25mg', 'Verospiron 25mg / 50mg', 'Spiromide (phối hợp)'],
    indications: [
      'Trụ cột điều trị suy tim phân suất tống máu giảm (HFrEF)',
      'Xơ gan cổ trướng phù bụng (phối hợp Furosemide)',
      'Tăng huyết áp kháng trị, cường Aldosterone nguyên phát, mụn trứng cá nội tiết'
    ],
    mechanismOfAction: 'Đối kháng cạnh tranh với Aldosterone tại ống lượn xa và ống góp, tăng thải Na+ và nước nhưng GIỮ lại Kali, đồng thời chống xơ hóa cơ tim.',
    standardDosage: 'Suy tim: 25mg x 1 lần/ngày; Cổ trướng xơ gan: 50-100mg/ngày.',
    administration: 'Uống sau bữa ăn sáng hoặc trưa.',
    contraindications: ['Tăng Kali máu (> 5.0 mmol/L)', 'Suy thận nặng (eGFR < 30 ml/phút)', 'Bệnh Addison'],
    cautions: ['Theo dõi sát Kali máu đặc biệt khi phối hợp ACEi/ARB; có thể gây căng tức hoặc to tuyến vú ở nam giới khi dùng kéo dài.'],
    referenceSources: ['ESC Heart Failure Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'indapamide',
    category: 'E',
    categoryName: 'E. Bệnh Lý Tim Mạch, Huyết Áp & Mỡ Máu',
    groupName: 'Lợi tiểu Thiazide-like hạ áp êm dịu cho người cao tuổi',
    activeIngredient: 'Indapamide',
    commonBrandNames: ['Natrilix SR 1.5mg', 'Indapamid Stada', 'Coversyl Plus (phối hợp)'],
    indications: ['Tăng huyết áp nguyên phát (rất hiệu quả ở người cao tuổi tăng huyết áp tâm thu đơn độc)'],
    mechanismOfAction: 'Ức chế tái hấp thu Na+/Cl- ở ống lượn xa kết hợp giãn mạch tiểu động mạch trực tiếp, ít ảnh hưởng đường huyết và mỡ máu hơn HCTZ.',
    standardDosage: 'Natrilix SR: 1.5mg (1 viên) x 1 lần duy nhất vào buổi sáng.',
    administration: 'Nuốt nguyên viên vào buổi sáng, không nhai bẻ.',
    contraindications: ['Suy thận nặng, bệnh não gan, hạ Kali máu nặng', 'Dị ứng Sulfonamide'],
    cautions: ['Kiểm tra Natri và Kali máu định kỳ ở người cao tuổi.'],
    referenceSources: ['ESC Hypertension Guidelines', 'Vidal']
  },
  {
    id: 'fenofibrate',
    category: 'E',
    categoryName: 'E. Bệnh Lý Tim Mạch, Huyết Áp & Mỡ Máu',
    groupName: 'Hạ Triglyceride máu chuyên biệt (Nhóm Fibrate)',
    activeIngredient: 'Fenofibrate',
    commonBrandNames: ['Lipanthyl 145mg (NT)', 'Lipanthyl 200M', 'Lipanthyl Supra 160mg'],
    indications: [
      'Tăng Triglyceride máu nặng (nguy cơ viêm tụy cấp khi TG > 5.6 mmol/L)',
      'Rối loạn lipid máu hỗn hợp, phòng ngừa biến chứng vi mạch võng mạc ở người tiểu đường'
    ],
    mechanismOfAction: 'Hoạt hóa thụ thể nhân PPAR-alpha, kích thích enzym Lipoprotein Lipase thủy phân mạnh Triglyceride giàu VLDL và tăng cholesterol tốt HDL-C.',
    standardDosage: '145mg (NT) hoặc 160mg/200mg x 1 lần/ngày.',
    administration: 'Lipanthyl 145mg NT uống bất kỳ lúc nào; dạng 200M/160mg Supra uống ngay trong bữa ăn chính.',
    contraindications: ['Suy thận nặng, bệnh gan/túi mật hoạt động (sỏi mật)', 'Tiền sử dị ứng ánh sáng với Ketoprofen/Fibrate'],
    cautions: ['Nếu cần phối hợp Statin, ưu tiên Rosuvastatin/Atorvastatin liều vừa và theo dõi đau cơ/CK, Creatinine.'],
    referenceSources: ['ESC/EAS Dyslipidemia Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'ezetimibe',
    category: 'E',
    categoryName: 'E. Bệnh Lý Tim Mạch, Huyết Áp & Mỡ Máu',
    groupName: 'Ức chế hấp thu Cholesterol tại ruột non',
    activeIngredient: 'Ezetimibe',
    commonBrandNames: ['Ezetrol 10mg', 'Vytorin (phối hợp Simvastatin)', 'Rosuzet (phối hợp Rosuvastatin)'],
    indications: [
      'Phối hợp với Statin khi chưa đạt mục tiêu LDL-C (< 1.4 - 1.8 mmol/L)',
      'Thay thế khi bệnh nhân không dung nạp hoặc đau cơ do Statin'
    ],
    mechanismOfAction: 'Ức chế chọn lọc protein vận chuyển NPC1L1 tại bờ bàn chải ruột non, ngăn hấp thu Cholesterol từ thức ăn và mật về gan.',
    standardDosage: '10mg x 1 lần/ngày.',
    administration: 'Uống bất kỳ thời điểm nào trong ngày, cùng hoặc xa bữa ăn.',
    contraindications: ['Bệnh gan tiến triển khi phối hợp với Statin', 'Phụ nữ mang thai/cho con bú (khi phối hợp Statin)'],
    cautions: ['Rất ít tác dụng phụ; dùng phối hợp Statin giúp giảm LDL-C thêm 20-25% mà không cần tăng Statin lên liều tối đa.'],
    referenceSources: ['ESC Dyslipidemia Guidelines', 'DiPiro Pharmacotherapy']
  },
  {
    id: 'nitroglycerin',
    category: 'E',
    categoryName: 'E. Bệnh Lý Tim Mạch, Huyết Áp & Mỡ Máu',
    groupName: 'Giãn mạch vành cắt cơn đau thắt ngực cấp (Nitrat)',
    activeIngredient: 'Nitroglycerin (Glyceryl trinitrate)',
    commonBrandNames: ['Nitromint 0.4mg xịt dưới lưỡi', 'Nitrostat 0.5mg ngậm', 'Nitroglycerin'],
    indications: ['Cắt cơn đau thắt ngực cấp tính do thiếu máu cơ tim cục bộ / bệnh mạch vành'],
    mechanismOfAction: 'Giải phóng Nitric Oxide (NO) kích thích Guanylyl cyclase giãn tĩnh mạch giảm tiền tải và giãn trực tiếp động mạch vành trong 1-3 phút.',
    standardDosage: 'Ngậm/xịt dưới lưỡi 1 liều (0.4-0.5mg) khi đau ngực. Nếu sau 5 phút chưa đỡ có thể lặp lại lần 2; tối đa 3 liều trong 15 phút -> GỌI CẤP CỨU 115 ngay nếu vẫn đau.',
    administration: 'PHẢI NGỒI HOẶC NẰM trước khi xịt/ngậm dưới lưỡi để tránh ngất do tụt huyết áp.',
    contraindications: [
      'TUYỆT ĐỐI CẤM dùng chung Sildenafil (Viagra), Tadalafil (Cialis) trong vòng 24-48 giờ (gây tụt huyết áp tử vong)',
      'Huyết áp thấp < 90/60 mmHg, nhồi máu thất phải, hẹp van ĐMC nặng'
    ],
    cautions: ['Thường gây đau đầu bừng mặt nhẹ do giãn mạch não; bảo quản lọ thủy tinh tối màu đậy kín.'],
    referenceSources: ['ESC Chronic Coronary Syndromes', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'trimetazidine',
    category: 'E',
    categoryName: 'E. Bệnh Lý Tim Mạch, Huyết Áp & Mỡ Máu',
    groupName: 'Bảo vệ chuyển hóa tế bào cơ tim thiếu máu',
    activeIngredient: 'Trimetazidine dihydrochloride',
    commonBrandNames: ['Vastarel MR 35mg', 'Vastarel OD 80mg', 'Trimetazidin 35mg'],
    indications: ['Điều trị bổ sung cơn đau thắt ngực ổn định khi các thuốc đầu tay không kiểm soát đủ'],
    mechanismOfAction: 'Ức chế enzym 3-KAT chuyển chuyển hóa cơ tim từ oxy hóa acid béo (tốn oxy) sang oxy hóa glucose (tiết kiệm oxy), duy trì ATP khi thiếu máu cục bộ mà không hạ huyết áp.',
    standardDosage: 'Vastarel MR 35mg: 1 viên x 2 lần/ngày (hoặc 80mg x 1 lần/ngày).',
    administration: 'Uống ngay trong bữa ăn sáng và tối.',
    contraindications: ['Bệnh Parkinson, hội chứng chân không yên, run', 'Suy thận nặng (CrCl < 30 ml/phút)'],
    cautions: ['Ngưng thuốc ngay nếu xuất hiện run tay chân hoặc cứng đơ vận động giống Parkinson.'],
    referenceSources: ['EMA / Cục QLD Guidelines', 'ESC Guidelines']
  },
  {
    id: 'warfarin-acenocoumarol',
    category: 'E',
    categoryName: 'E. Bệnh Lý Tim Mạch, Huyết Áp & Mỡ Máu',
    groupName: 'Thuốc chống đông kháng Vitamin K (Van tim cơ học)',
    activeIngredient: 'Acenocoumarol / Warfarin',
    commonBrandNames: ['Sintrom 4mg', 'Aceronko 1mg', 'Coumadin / Warfarin 2mg-5mg'],
    indications: [
      'Phòng ngừa huyết khối ở bệnh nhân thay van tim cơ học, hẹp van hai lá rung nhĩ',
      'Huyết khối tĩnh mạch sâu, thuyên tắc phổi'
    ],
    mechanismOfAction: 'Ức chế enzym Vitamin K epoxide reductase ở gan, ngăn hoạt hóa các yếu tố đông máu II, VII, IX, X phụ thuộc Vitamin K.',
    standardDosage: 'Cá thể hóa hoàn toàn theo chỉ số xét nghiệm máu INR mục tiêu (thường INR 2.0 - 3.0 hoặc 2.5 - 3.5 ở van hai lá cơ học).',
    administration: 'Uống cố định 1 giờ mỗi ngày (thường vào buổi chiều/tối).',
    contraindications: ['Đang xuất huyết tiêu hóa/não', 'Tăng huyết áp ác tính chưa kiểm soát', 'Phụ nữ mang thai (nhất là 3 tháng đầu)'],
    cautions: ['CỰC KỲ NHIỀU TƯƠNG TÁC: rau xanh giàu Vitamin K (bông cải, cải bó xôi - cần ăn ổn định không bỏ hẳn cũng không ăn đột biến), Đan sâm, Bạch quả, Nhân sâm, NSAID đều làm biến động INR mạnh.'],
    referenceSources: ['ESC Valvular Heart Disease Guidelines', 'Dược thư Quốc gia Việt Nam']
  },

  // =========================================================================
  // NHÓM F (BỔ SUNG): Nội Tiết, Tiểu Đường (DPP-4i, SGLT2i, Insulin) & Tuyến Giáp
  // =========================================================================
  {
    id: 'dapagliflozin',
    category: 'F',
    categoryName: 'F. Bệnh Lý Nội Tiết & Chuyển Hóa',
    groupName: 'Ức chế SGLT2 (Tiểu đường, Suy Tim & Bảo vệ Thận KDIGO)',
    activeIngredient: 'Dapagliflozin',
    commonBrandNames: ['Forxiga 10mg', 'Xigduo XR (phối hợp Metformin)', 'Dapaflozin'],
    indications: [
      'Đái tháo đường Tuýp 2',
      'Suy tim mạn tính (cả phân suất tống máu giảm HFrEF và bảo tồn HFpEF)',
      'Bệnh thận mạn (CKD) giúp làm chậm suy giảm eGFR bất kể có tiểu đường hay không'
    ],
    mechanismOfAction: 'Ức chế chọn lọc kênh đồng vận chuyển Na+-Glucose SGLT2 tại ống lượn gần thận, thải 70g glucose/ngày qua nước tiểu và điều hòa áp lực cầu thận.',
    standardDosage: '10mg x 1 lần/ngày vào buổi sáng.',
    administration: 'Uống 1 viên buổi sáng, cùng hoặc xa bữa ăn đều được.',
    contraindications: ['Đái tháo đường Tuýp 1, nhiễm toan ceton do đái tháo đường', 'Quá mẫn Dapagliflozin'],
    cautions: ['Uống đủ nước, vệ sinh vùng kín sạch sẽ phòng nhiễm nấm sinh dục; tạm ngưng trước phẫu thuật lớn 3 ngày phòng toan ceton đường huyết bình thường.'],
    brandVariants: [
      {
        variantName: 'Forxiga 10mg (AstraZeneca)',
        manufacturer: 'AstraZeneca (Thụy Điển)',
        ingredients: 'Dapagliflozin 10mg viên bao phim',
        specialEffect: 'Thuốc đa năng trụ cột cho cả 3 chuyên khoa Nội tiết - Tim mạch - Thận học theo ADA 2025 và KDIGO 2024.'
      }
    ],
    referenceSources: ['ADA Standards of Care 2025', 'KDIGO 2024 CKD Guidelines']
  },
  {
    id: 'sitagliptin',
    category: 'F',
    categoryName: 'F. Bệnh Lý Nội Tiết & Chuyển Hóa',
    groupName: 'Ức chế DPP-4 (Hạ đường huyết êm dịu không gây tụt đường)',
    activeIngredient: 'Sitagliptin phosphate',
    commonBrandNames: ['Januvia 100mg / 50mg', 'Janumet 50/1000mg (phối hợp Metformin)'],
    indications: [
      'Đái tháo đường Tuýp 2 (đơn trị hoặc phối hợp Metformin/SGLT2i)',
      'Rất phù hợp người cao tuổi do không gây hạ đường huyết và không tăng cân'
    ],
    mechanismOfAction: 'Ức chế enzym DPP-4 làm kéo dài thời gian tác dụng của hormone Incretin (GLP-1 và GIP), chỉ kích thích tụy tiết Insulin khi đường huyết tăng sau ăn.',
    standardDosage: '100mg x 1 lần/ngày (giảm còn 50mg nếu eGFR 30-45; 25mg nếu eGFR < 30).',
    administration: 'Uống cố định 1 lần/ngày, cùng hoặc xa bữa ăn.',
    contraindications: ['Đái tháo đường Tuýp 1', 'Tiền sử viêm tụy cấp'],
    cautions: ['Ngưng thuốc và đi khám ngay nếu đau bụng thượng vị dữ dội lan ra sau lưng (dấu hiệu viêm tụy cấp hiếm gặp).'],
    referenceSources: ['ADA Standards of Care 2025', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'vildagliptin',
    category: 'F',
    categoryName: 'F. Bệnh Lý Nội Tiết & Chuyển Hóa',
    groupName: 'Ức chế DPP-4 (Kiểm soát đường huyết sau ăn)',
    activeIngredient: 'Vildagliptin',
    commonBrandNames: ['Galvus 50mg', 'Galvus Met 50/850 - 50/1000mg', 'Vildastad'],
    indications: ['Đái tháo đường Tuýp 2 phối hợp Metformin, Sulfonylurea hoặc Insulin'],
    mechanismOfAction: 'Ức chế chọn lọc và thuận nghịch enzym DPP-4, tăng nồng độ GLP-1 nội sinh, cải thiện độ nhạy cảm tế bào beta tụy và ức chế tiết Glucagon.',
    standardDosage: '50mg x 2 lần/ngày (sáng - tối); hoặc 50mg x 1 lần/ngày nếu phối hợp Sulfonylurea hoặc suy thận trung bình - nặng.',
    administration: 'Uống không phụ thuộc bữa ăn (Galvus Met uống cùng bữa ăn để êm dạ dày).',
    contraindications: ['Suy gan hoặc men gan AST/ALT > 3 lần giới hạn trên bình thường'],
    cautions: ['Kiểm tra men gan trước khi điều trị và mỗi 3 tháng trong năm đầu tiên.'],
    referenceSources: ['ADA Guidelines', 'MIMS Việt Nam']
  },
  {
    id: 'linagliptin',
    category: 'F',
    categoryName: 'F. Bệnh Lý Nội Tiết & Chuyển Hóa',
    groupName: 'Ức chế DPP-4 an toàn mọi mức độ suy thận',
    activeIngredient: 'Linagliptin',
    commonBrandNames: ['Trajenta 5mg', 'Trajenta Duo (phối hợp Metformin)'],
    indications: ['Đái tháo đường Tuýp 2 đặc biệt ưu tiên ở bệnh nhân suy giảm chức năng thận'],
    mechanismOfAction: 'Ức chế mạnh enzym DPP-4 và thải trừ chủ yếu qua đường mật/phân (> 80%), chỉ < 5% qua thận nên KHÔNG cần chỉnh liều dù suy thận nặng.',
    standardDosage: '5mg x 1 lần/ngày cho mọi mức độ chức năng thận và gan.',
    administration: 'Uống bất kỳ lúc nào trong ngày, cùng hoặc không cùng thức ăn.',
    contraindications: ['Đái tháo đường Tuýp 1, nhiễm toan ceton'],
    cautions: ['Theo dõi triệu chứng đau khớp nặng hiếm gặp hoặc viêm tụy cấp.'],
    referenceSources: ['KDIGO Diabetes Guidelines', 'DiPiro Pharmacotherapy']
  },
  {
    id: 'glimepiride',
    category: 'F',
    categoryName: 'F. Bệnh Lý Nội Tiết & Chuyển Hóa',
    groupName: 'Sulfonylurea thế hệ mới kích thích tiết Insulin 1 lần/ngày',
    activeIngredient: 'Glimepiride',
    commonBrandNames: ['Amaryl 2mg / 4mg', 'Glimepirid Stada 2mg', 'Amaryl M (phối hợp Metformin)'],
    indications: ['Đái tháo đường Tuýp 2 khi chế độ ăn và Metformin chưa đủ kiểm soát HbA1c'],
    mechanismOfAction: 'Gắn thụ thể SUR1 trên tế bào beta đảo tụy, đóng kênh K+ nhạy ATP, mở kênh Ca2+ kích thích giải phóng Insulin và tăng nhạy cảm mô ngoại vi.',
    standardDosage: '1mg - 4mg x 1 lần/ngày (tối đa 6-8mg/ngày).',
    administration: 'BẮT BUỘC uống ngay trước hoặc trong bữa ăn sáng đầu tiên trong ngày, tuyệt đối không bỏ bữa sau khi uống.',
    contraindications: ['Đái tháo đường Tuýp 1, nhiễm toan ceton', 'Suy gan nặng, suy thận nặng', 'Phụ nữ mang thai/cho con bú'],
    cautions: ['Nguy cơ tụt đường huyết (run tay, vã mồ hôi lạnh, đói cồn cào) nếu ăn muộn hoặc bỏ bữa — luôn mang theo kẹo ngọt.'],
    referenceSources: ['ADA Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'insulin-glargine',
    category: 'F',
    categoryName: 'F. Bệnh Lý Nội Tiết & Chuyển Hóa',
    groupName: 'Insulin nền tác dụng kéo dài 24 giờ',
    activeIngredient: 'Insulin Glargine (100 UI/ml hoặc 300 UI/ml)',
    commonBrandNames: ['Lantus SoloStar', 'Toujeo SoloStar', 'Basaglar'],
    indications: [
      'Đái tháo đường Tuýp 1',
      'Đái tháo đường Tuýp 2 không kiểm soát bằng thuốc uống (HbA1c > 9-10% hoặc có biến chứng suy gan/thận/nhiễm trùng nặng)'
    ],
    mechanismOfAction: 'Tạo kết tủa vi tinh thể dưới da ở pH sinh lý, phóng thích Insulin ổn định không đỉnh suốt 24 giờ giúp kiểm soát đường huyết đói êm dịu.',
    standardDosage: 'Khởi đầu thường 10 UI hoặc 0.1 - 0.2 UI/kg x 1 lần/ngày, chỉnh tăng 2 UI mỗi 3 ngày theo đường huyết đói buổi sáng.',
    administration: 'Tiêm dưới da vùng bụng, đùi hoặc cánh tay vào CÙNG 1 GIỜ CỐ ĐỊNH mỗi ngày (luân phiên vị trí tiêm); KHÔNG tiêm tĩnh mạch và KHÔNG trộn chung xi lanh.',
    contraindications: ['Đang bị hạ đường huyết cấp tính'],
    cautions: ['Bút tiêm chưa mở bảo quản ngăn mát tủ lạnh 2-8°C (không để ngăn đá); bút đang sử dụng để nhiệt độ phòng < 30°C tối đa 28 ngày.'],
    referenceSources: ['ADA Standards of Care 2025', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'thiamazole',
    category: 'F',
    categoryName: 'F. Bệnh Lý Nội Tiết & Chuyển Hóa',
    groupName: 'Kháng giáp tổng hợp (Điều trị Cường giáp / Basedow)',
    activeIngredient: 'Thiamazole (Methimazole)',
    commonBrandNames: ['Thyrozol 5mg', 'Thyrozol 10mg', 'Tapazole'],
    indications: [
      'Điều trị cường giáp, bệnh Basedow (Graves)',
      'Chuẩn bị trước phẫu thuật cắt tuyến giáp hoặc điều trị I-ốt phóng xạ'
    ],
    mechanismOfAction: 'Ức chế enzym Thyroid Peroxidase, ngăn gắn I-ốt vào Tyrosine và ngăn tổng hợp hormone tuyến giáp T3, T4.',
    standardDosage: 'Khởi đầu 10mg - 40mg/ngày tùy mức độ cường giáp, duy trì 5mg - 15mg/ngày theo xét nghiệm TSH và FT4.',
    administration: 'Nuốt nguyên viên sau bữa ăn.',
    contraindications: ['Tiền sử giảm bạch cầu hạt nặng hoặc viêm gan nặng do Thiamazole', 'Ứ mật có sẵn'],
    cautions: ['CẢNH BÁO QUAN TRỌNG: Ngưng thuốc và xét nghiệm công thức máu khẩn cấp nếu bị sốt cao, đau họng, loét miệng (nguy cơ mất bạch cầu hạt hiếm gặp); ưu tiên chuyển sang PTU trong 3 tháng đầu thai kỳ.'],
    referenceSources: ['ATA Hyperthyroidism Guidelines', 'Dược thư Quốc gia Việt Nam']
  },

  // =========================================================================
  // NHÓM G (BỔ SUNG): Thần Kinh, Tiền Đình, Đột Quỵ, Parkinson & Giấc Ngủ
  // =========================================================================
  {
    id: 'betahistine',
    category: 'G',
    categoryName: 'G. Bệnh Lý Thần Kinh, Tiền Đình & Giấc Ngủ',
    groupName: 'Rối loạn tiền đình, bệnh Meniere & Ù tai',
    activeIngredient: 'Betahistine dihydrochloride',
    commonBrandNames: ['Betaserc 16mg / 24mg', 'Betaserc 8mg', 'Betahistin Stella'],
    indications: [
      'Hội chứng Meniere (chóng mặt xoay tròn, ù tai, nghe kém tiến triển)',
      'Chóng mặt nguồn gốc tiền đình mạn tính, thiểu năng tuần hoàn hệ sống nền'
    ],
    mechanismOfAction: 'Chủ vận thụ thể Histamin H1 và đối kháng mạnh thụ thể H3 tại tiền đình và ốc tai, làm giãn cơ vòng tiền mao mạch tăng lưu lượng máu tai trong.',
    standardDosage: '24mg - 48mg/ngày (thường Betaserc 16mg x 3 lần/ngày hoặc 24mg x 2 lần/ngày).',
    administration: 'Uống ngay trong hoặc sau bữa ăn để tránh xót dạ dày.',
    contraindications: ['U tủy thượng thận (Pheochromocytoma)', 'Loét dạ dày tá tràng tiến triển'],
    cautions: ['Không dùng đồng thời với thuốc kháng Histamin H1 vì làm triệt tiêu tác dụng của nhau; thận trọng bệnh nhân hen phế quản.'],
    brandVariants: [
      {
        variantName: 'Betaserc 16mg / 24mg (Abbott - Hà Lan)',
        manufacturer: 'Abbott',
        ingredients: 'Betahistine dihydrochloride 16mg / 24mg',
        specialEffect: 'Thuốc đặc hiệu tiền đình dùng duy trì dài ngày giúp ổn định áp lực nội dịch tai trong, cắt ù tai và tái phát chóng mặt.'
      }
    ],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'MIMS']
  },
  {
    id: 'cinnarizine',
    category: 'G',
    categoryName: 'G. Bệnh Lý Thần Kinh, Tiền Đình & Giấc Ngủ',
    groupName: 'Chống say tàu xe & Rối loạn tuần hoàn tiền đình',
    activeIngredient: 'Cinnarizine',
    commonBrandNames: ['Stugeron 25mg', 'Cinnarizin 25mg'],
    indications: [
      'Phòng ngừa say tàu xe, máy bay, tàu thủy',
      'Rối loạn tiền đình (chóng mặt, ù tai, buồn nôn), thiểu năng tuần hoàn ngoại biên'
    ],
    mechanismOfAction: 'Chẹn kênh Calci tại tế bào lông mê đạo tiền đình kết hợp kháng Histamin H1 giảm kích thích trung tâm nôn.',
    standardDosage: 'Tiền đình: 25mg x 3 lần/ngày; Say tàu xe: 25mg uống trước khi khởi hành 2 giờ.',
    administration: 'Uống sau bữa ăn.',
    contraindications: ['Bệnh Parkinson, rối loạn ngoại tháp', 'Trẻ em < 5 tuổi'],
    cautions: ['Gây buồn ngủ nhẹ; không dùng kéo dài hàng năm ở người cao tuổi vì có thể khởi phát hội chứng Parkinson thứ phát.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'BNF']
  },
  {
    id: 'piracetam',
    category: 'G',
    categoryName: 'G. Bệnh Lý Thần Kinh, Tiền Đình & Giấc Ngủ',
    groupName: 'Tăng chuyển hóa tế bào thần kinh (Nootropic)',
    activeIngredient: 'Piracetam',
    commonBrandNames: ['Nootropil 800mg / 1200mg', 'Piracetam 400mg', 'Lucetam'],
    indications: [
      'Chóng mặt do rối loạn tuần hoàn não, di chứng thiếu máu não sau đột quỵ',
      'Suy giảm trí nhớ, tập trung ở người cao tuổi; rung giật cơ vỏ não'
    ],
    mechanismOfAction: 'Tăng sử dụng oxy và glucose ở tế bào thần kinh thiếu máu, tăng tính dẻo màng hồng cầu giúp cải thiện vi tuần hoàn não và dẫn truyền synap.',
    standardDosage: '800mg x 3 lần/ngày (hoặc 1200mg x 2 lần/ngày), uống vào sáng và trưa.',
    administration: 'Uống trước hoặc sau ăn; tránh uống muộn vào buổi tối vì dễ gây khó ngủ kích thích nhẹ.',
    contraindications: ['Xuất huyết não cấp tính', 'Suy thận nặng (CrCl < 20 ml/phút)', 'Bệnh múa giật Huntington'],
    cautions: ['Chỉnh liều ở người cao tuổi có suy giảm chức năng thận.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'Vidal']
  },
  {
    id: 'citicoline',
    category: 'G',
    categoryName: 'G. Bệnh Lý Thần Kinh, Tiền Đình & Giấc Ngủ',
    groupName: 'Tái tạo màng tế bào thần kinh sau Đột quỵ & Chấn thương não',
    activeIngredient: 'Citicoline (CDP-Choline)',
    commonBrandNames: ['Somazina 500mg', 'Cebroton', 'Citicolin 500mg'],
    indications: [
      'Phục hồi thần kinh sau tai biến mạch máu não (nhồi máu não) và chấn thương sọ não',
      'Suy giảm nhận thức mạch máu, rối loạn trí nhớ tuổi già'
    ],
    mechanismOfAction: 'Cung cấp tiền chất sinh tổng hợp Phosphatidylcholine cấu tạo màng neuron thần kinh và tăng tổng hợp Acetylcholine, Dopamine giúp phục hồi dẫn truyền não.',
    standardDosage: '500mg x 1 - 2 lần/ngày.',
    administration: 'Uống cùng hoặc xa bữa ăn.',
    contraindications: ['Tăng trương lực hệ thần kinh phó giao cảm nặng'],
    cautions: ['Dung nạp tốt, ít tác dụng phụ; tránh dùng quá muộn buổi tối ở người nhạy cảm.'],
    referenceSources: ['Phác đồ Đột Quỵ Bộ Y Tế', 'MIMS']
  },
  {
    id: 'escitalopram',
    category: 'G',
    categoryName: 'G. Bệnh Lý Thần Kinh, Tiền Đình & Giấc Ngủ',
    groupName: 'Chống trầm cảm & Rối loạn lo âu dung nạp tốt nhất (SSRI)',
    activeIngredient: 'Escitalopram oxalate',
    commonBrandNames: ['Lexapro 10mg', 'Escitalopram 10mg', 'Esram'],
    indications: [
      'Rối loạn trầm cảm chủ yếu, rối loạn lo âu lan tỏa (GAD)',
      'Rối loạn hoảng sợ, rối loạn lo âu xã hội, ám ảnh cưỡng chế (OCD)'
    ],
    mechanismOfAction: 'Đồng phân S có hoạt tính tinh khiết của Citalopram, ức chế chọn lọc rất cao tái hấp thu Serotonin tại khe synap não và rất ít tương tác thuốc.',
    standardDosage: '10mg x 1 lần/ngày (tối đa 20mg/ngày ở người < 65 tuổi; người >= 65 tuổi tối đa 10mg/ngày).',
    administration: 'Uống 1 lần buổi sáng hoặc tối, cùng hoặc xa bữa ăn.',
    contraindications: ['Dùng chung thuốc ức chế MAO', 'Khoảng QT kéo dài bẩm sinh hoặc đang dùng thuốc kéo dài QT (Amiodarone, Domperidone)'],
    cautions: ['Cần 2-4 tuần để phát huy hiệu quả tối đa; KHÔNG ngưng đột ngột mà phải giảm liều dần để tránh hội chứng cai thuốc.'],
    referenceSources: ['APA Depression Guidelines', 'DiPiro Pharmacotherapy']
  },
  {
    id: 'amitriptyline',
    category: 'G',
    categoryName: 'G. Bệnh Lý Thần Kinh, Tiền Đình & Giấc Ngủ',
    groupName: 'Đau thần kinh mạn, Dự phòng Migraine & Mất ngủ (TCA)',
    activeIngredient: 'Amitriptyline HCl',
    commonBrandNames: ['Amitriptylin 25mg', 'Elavil', 'Laroxyl'],
    indications: [
      'Đau thần kinh mạn tính (đau rễ thần kinh tọa, đau sau Zona, đau xơ cơ Fibromyalgia)',
      'Dự phòng đau đầu Migraine và đau đầu căng thẳng mạn tính',
      'Trầm cảm kèm mất ngủ nặng'
    ],
    mechanismOfAction: 'Ức chế tái hấp thu Noradrenaline và Serotonin ở đường dẫn truyền ức chế đau đi xuống từ thân não xuống sừng sau tủy sống.',
    standardDosage: 'Giảm đau thần kinh / dự phòng Migraine: liều thấp 10mg - 25mg x 1 lần vào buổi tối trước ngủ.',
    administration: 'Uống vào buổi tối trước khi đi ngủ 1-2 giờ.',
    contraindications: ['Mới nhồi máu cơ tim cấp, block nhĩ thất nặng', 'Tăng nhãn áp góc đóng, bí tiểu do phì đại tiền liệt tuyến'],
    cautions: ['Gây khô miệng, táo bón, buồn ngủ sáng hôm sau nếu mới dùng; thận trọng ở người cao tuổi.'],
    referenceSources: ['NICE Neuropathic Pain Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'zolpidem',
    category: 'G',
    categoryName: 'G. Bệnh Lý Thần Kinh, Tiền Đình & Giấc Ngủ',
    groupName: 'Thuốc gây ngủ tác dụng nhanh ngắn hạn (Nhóm Z-drug)',
    activeIngredient: 'Zolpidem tartrate',
    commonBrandNames: ['Stilnox 10mg', 'Zolpidem 10mg'],
    indications: ['Mất ngủ cấp tính nặng gây suy kiệt (chỉ dùng ngắn hạn 2-4 tuần khi liệu pháp hành vi không đủ)'],
    mechanismOfAction: 'Gắn chọn lọc tiểu đơn vị Alpha-1 của thụ thể GABA-A giúp khởi phát giấc ngủ nhanh trong 15-30 phút mà ít giãn cơ và ít gây nghiện hơn Benzodiazepine.',
    standardDosage: 'Người lớn: 10mg trước khi đi ngủ; Phụ nữ và người cao tuổi (>= 65 tuổi): khởi đầu 5mg.',
    administration: 'Uống NGAY TRƯỚC KHI LÊN GIƯỜNG NGỦ khi đã chắc chắn có đủ 7-8 giờ để ngủ.',
    contraindications: ['Hội chứng ngưng thở khi ngủ nặng, suy hô hấp nặng, nhược cơ, suy gan nặng'],
    cautions: ['Cấm tuyệt đối uống cùng rượu bia; lưu ý nguy cơ mộng du làm việc vô thức ban đêm hoặc buồn ngủ sáng hôm sau nếu ngủ không đủ 7 giờ.'],
    referenceSources: ['AASM Insomnia Guidelines', 'BNF']
  },
  {
    id: 'melatonin',
    category: 'G',
    categoryName: 'G. Bệnh Lý Thần Kinh, Tiền Đình & Giấc Ngủ',
    groupName: 'Hormone điều hòa nhịp sinh học giấc ngủ tự nhiên',
    activeIngredient: 'Melatonin',
    commonBrandNames: ['Circadin 2mg (phóng thích kéo dài)', 'Melatonin 3mg / 5mg', 'Natrol Melatonin'],
    indications: [
      'Khó vào giấc ngủ, rối loạn nhịp thức ngủ do làm ca đêm hoặc lệch múi giờ (Jet lag)',
      'Mất ngủ ở người trên 55 tuổi do suy giảm tiết Melatonin nội sinh'
    ],
    mechanismOfAction: 'Kích thích thụ thể MT1 và MT2 tại nhân trên giao thoa thị giác (SCN) ở vùng dưới đồi, phát tín hiệu đồng bộ hóa chu kỳ ngủ - thức sinh học.',
    standardDosage: '1mg - 5mg (hoặc Circadin 2mg) trước khi đi ngủ 30 - 60 phút.',
    administration: 'Uống trước ngủ 30-60 phút trong không gian tắt đèn tối dịu.',
    contraindications: ['Bệnh tự miễn nặng chưa kiểm soát (thận trọng)', 'Quá mẫn Melatonin'],
    cautions: ['Không gây nghiện hoặc lờn thuốc như thuốc ngủ; hạn chế ánh sáng xanh điện thoại sau khi uống.'],
    referenceSources: ['AASM Guidelines', 'BNF']
  },
  {
    id: 'carbamazepine',
    category: 'G',
    categoryName: 'G. Bệnh Lý Thần Kinh, Tiền Đình & Giấc Ngủ',
    groupName: 'Đặc trị Đau Dây Thần Kinh Số V & Chống Động Kinh',
    activeIngredient: 'Carbamazepine',
    commonBrandNames: ['Tegretol 200mg', 'Tegretol CR 200mg / 400mg', 'Carbamazepin 200mg'],
    indications: [
      'Lựa chọn đầu tay đặc trị Đau dây thần kinh sinh ba (dây V - đau giật như điện giật nửa mặt)',
      'Động kinh cục bộ và cơn co cứng co giật toàn thể, rối loạn lưỡng cực'
    ],
    mechanismOfAction: 'Chẹn kênh Natri phụ thuộc điện thế ở trạng thái bất hoạt trên màng sợi thần kinh, ngăn phóng xung động đau kịch phát và ổ phát sóng động kinh.',
    standardDosage: 'Đau dây V: khởi đầu 100mg x 2 lần/ngày, tăng chậm tới 200mg x 2-3 lần/ngày đến khi hết đau.',
    administration: 'Uống trong hoặc sau bữa ăn (dạng CR nuốt nguyên viên không nhai).',
    contraindications: ['Block nhĩ thất, suy tủy xương, đang dùng MAOi', 'CẢNH BÁO DI TRUYỀN NGƯỜI VIỆT NAM: Người mang alen HLA-B*1502 có nguy cơ rất cao phản ứng da chết người Stevens-Johnson/TEN'],
    cautions: ['Khuyến cáo xét nghiệm gen HLA-B*1502 trước khi khởi trị cho bệnh nhân gốc Á/Việt Nam; cảm ứng men gan cực mạnh làm giảm hiệu lực nhiều thuốc khác.'],
    referenceSources: ['AAN Trigeminal Neuralgia Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'levodopa-benserazide',
    category: 'G',
    categoryName: 'G. Bệnh Lý Thần Kinh, Tiền Đình & Giấc Ngủ',
    groupName: 'Điều trị bệnh Parkinson (Bổ sung Dopamine não)',
    activeIngredient: 'Levodopa + Benserazide / Carbidopa',
    commonBrandNames: ['Madopar 250mg (200/50mg)', 'Sinemet 25/250mg', 'Madopar HBS'],
    indications: ['Bệnh Parkinson và hội chứng Parkinson (run tay khi nghỉ, cứng đơ cơ, chậm vận động)'],
    mechanismOfAction: 'Levodopa qua hàng rào máu não chuyển hóa thành Dopamine bù đắp thiếu hụt tại liềm đen; Benserazide/Carbidopa ức chế men chuyển ngoại biên giúp giảm buồn nôn và tăng lượng thuốc vào não.',
    standardDosage: 'Khởi đầu nửa viên (125mg Madopar) x 2 - 3 lần/ngày, chỉnh tăng dần từ từ theo đáp ứng vận động.',
    administration: 'Uống cách bữa ăn giàu đạm (thịt, cá, trứng) 30 - 60 phút vì acid amin đạm cạnh tranh hấp thu Levodopa qua thành ruột và vào não.',
    contraindications: ['Tăng nhãn áp góc đóng', 'Đang dùng thuốc ức chế MAO không chọn lọc', 'Loạn thần nặng'],
    cautions: ['Không ngưng thuốc đột ngột (nguy cơ hội chứng ác tính); không uống kèm Vitamin B6 liều cao nếu thuốc không có chất ức chế men chuyển ngoại vi.'],
    referenceSources: ['MDS Parkinson Guidelines', 'Dược thư Quốc gia Việt Nam']
  },

  // =========================================================================
  // NHÓM H (MỚI): Tiết Niệu, Thận, Tuyến Tiền Liệt, Thiếu Máu & Sản Phụ Khoa
  // =========================================================================
  {
    id: 'tamsulosin',
    category: 'H',
    categoryName: 'H. Tiết Niệu, Tuyến Tiền Liệt & Huyết Học - Sản Khoa',
    groupName: 'Chẹn Alpha-1A chọn lọc (Phì đại tuyến tiền liệt & Tống sỏi niệu quản)',
    activeIngredient: 'Tamsulosin HCl',
    commonBrandNames: ['Harnal Ocas 0.4mg', 'Xatral XL 10mg (Alfuzosin)', 'Tamsulosin Stada'],
    indications: [
      'Tăng sản lành tính tuyến tiền liệt (BPH): tiểu khó, tiểu yếu, tiểu nhiều lần ban đêm ở nam giới',
      'Hỗ trợ giãn niệu quản giúp đẩy nhanh sỏi niệu quản đoạn dưới (< 10mm)'
    ],
    mechanismOfAction: 'Chẹn chọn lọc thụ thể Alpha-1A adrenergic tại cơ trơn tuyến tiền liệt, cổ bàng quang và đoạn cuối niệu quản, giúp mở rộng đường tiểu thông thoáng mà rất ít gây tụt huyết áp.',
    standardDosage: '0.4mg x 1 lần duy nhất mỗi ngày.',
    administration: 'Harnal Ocas nuốt nguyên viên (không nhai bẻ) bất kỳ lúc nào; các dạng viên thường uống sau bữa ăn sáng 30 phút.',
    contraindications: ['Tiền sử hạ huyết áp tư thế nặng', 'Suy gan nặng'],
    cautions: ['Đứng dậy từ từ tránh choáng nhẹ; thông báo cho bác sĩ mắt trước khi phẫu thuật đục thủy tinh thể (hội chứng mống mắt mềm).'],
    brandVariants: [
      {
        variantName: 'Harnal Ocas 0.4mg (Astellas - Nhật Bản)',
        manufacturer: 'Astellas Pharma (Nhật Bản)',
        ingredients: 'Tamsulosin HCl 0.4mg viên giải phóng kiểm soát đường uống OCAS',
        specialEffect: 'Công nghệ OCAS giải phóng đều thuốc suốt đại tràng giúp giảm tiểu đêm rõ rệt và hạn chế tối đa tụt huyết áp tư thế.'
      }
    ],
    referenceSources: ['EAU BPH Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'finasteride',
    category: 'H',
    categoryName: 'H. Tiết Niệu, Tuyến Tiền Liệt & Huyết Học - Sản Khoa',
    groupName: 'Thuốc thu nhỏ kích thước tuyến tiền liệt (Ức chế 5-alpha reductase)',
    activeIngredient: 'Finasteride',
    commonBrandNames: ['Proscar 5mg', 'Finasterid 5mg', 'Propecia 1mg (Rụng tóc nam)'],
    indications: [
      'Phì đại lành tính tuyến tiền liệt thể tích lớn (> 30-40ml) giúp thu nhỏ kích thước tuyến và giảm nguy cơ bí tiểu cấp',
      'Hàm lượng 1mg dùng điều trị rụng tóc kiểu hói đầu do nội tiết tố nam (Androgenetic alopecia)'
    ],
    mechanismOfAction: 'Ức chế enzym 5-alpha reductase type II ngăn chuyển Testosterone thành Dihydrotestosterone (DHT) gây tăng sinh mô tuyến tiền liệt và teo nang tóc.',
    standardDosage: 'Phì đại tiền liệt tuyến: 5mg x 1 lần/ngày (đánh giá hiệu quả sau 3-6 tháng); Rụng tóc nam: 1mg x 1 lần/ngày.',
    administration: 'Uống cùng hoặc xa bữa ăn đều được.',
    contraindications: ['Phụ nữ mang thai hoặc có khả năng mang thai TUYỆT ĐỐI KHÔNG uống hoặc chạm vào viên thuốc nghiền vỡ (gây dị tật cơ quan sinh dục thai nhi nam)'],
    cautions: ['Làm giảm ~50% nồng độ chỉ số PSA xét nghiệm máu (cần nhân đôi kết quả PSA khi tầm soát ung thư tiền liệt tuyến).'],
    referenceSources: ['EAU Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'solifenacin',
    category: 'H',
    categoryName: 'H. Tiết Niệu, Tuyến Tiền Liệt & Huyết Học - Sản Khoa',
    groupName: 'Bàng quang tăng hoạt (Trị tiểu gấp, tiểu són, tiểu đêm nhiều lần)',
    activeIngredient: 'Solifenacin succinate',
    commonBrandNames: ['Vesicare 5mg / 10mg', 'Solifenacin Stada'],
    indications: ['Hội chứng bàng quang tăng hoạt (OAB): tiểu gấp, tiểu nhiều lần, tiểu không tự chủ'],
    mechanismOfAction: 'Đối kháng cạnh tranh chọn lọc thụ thể Muscarinic M3 tại cơ chóp bàng quang, làm giãn cơ bàng quang và tăng dung tích chứa nước tiểu.',
    standardDosage: '5mg x 1 lần/ngày (có thể tăng 10mg nếu cần).',
    administration: 'Nuốt nguyên viên với nước, cùng hoặc xa bữa ăn.',
    contraindications: ['Bí tiểu cấp', 'Tăng nhãn áp góc đóng chưa kiểm soát', 'Bệnh nhược cơ, phình đại tràng nhiễm độc'],
    cautions: ['Có thể gây khô miệng, táo bón hoặc nhìn mờ nhẹ; không dùng khi đang có tắc nghẽn đường tiểu nặng chưa giải quyết.'],
    referenceSources: ['EAU Urinary Incontinence Guidelines', 'MIMS']
  },
  {
    id: 'tadalafil',
    category: 'H',
    categoryName: 'H. Tiết Niệu, Tuyến Tiền Liệt & Huyết Học - Sản Khoa',
    groupName: 'Ức chế PDE5 (Rối loạn cương dương & Triệu chứng đường tiểu dưới)',
    activeIngredient: 'Tadalafil / Sildenafil',
    commonBrandNames: ['Cialis 5mg / 20mg', 'Viagra 50mg / 100mg (Sildenafil)', 'Tadalafil Stella'],
    indications: [
      'Rối loạn cương dương ở nam giới trưởng thành',
      'Tadalafil 5mg hàng ngày điều trị đồng thời rối loạn cương và phì đại tuyến tiền liệt (BPH)',
      'Tăng áp động mạch phổi (theo chỉ định chuyên khoa Tim mạch)'
    ],
    mechanismOfAction: 'Ức chế enzym Phosphodiesterase type 5 (PDE5), bảo tồn cGMP do Nitric Oxide tạo ra làm giãn cơ trơn thể hang dương vật và tiền liệt tuyến khi có kích thích tình dục.',
    standardDosage: 'Tadalafil theo nhu cầu: 10-20mg trước quan hệ 30-60 phút (tác dụng kéo dài đến 36h); hoặc 5mg mỗi ngày. Sildenafil: 50mg trước quan hệ 1 giờ lúc bụng không quá no.',
    administration: 'Không lạm dụng quá 1 liều trong 24 giờ.',
    contraindications: ['TUYỆT ĐỐI CẤM dùng chung bất kỳ thuốc nhóm Nitrat nào (Nitroglycerin, Isosorbide) vì gây tụt huyết áp đột ngột tử vong', 'Mới đột quỵ hoặc nhồi máu cơ tim < 6 tháng'],
    cautions: ['Đi cấp cứu ngay nếu cương cứng đau kéo dài quá 4 giờ; tránh uống quá nhiều rượu bia.'],
    referenceSources: ['EAU Sexual Health Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'ferrous-folic',
    category: 'H',
    categoryName: 'H. Tiết Niệu, Tuyến Tiền Liệt & Huyết Học - Sản Khoa',
    groupName: 'Bổ sung Sắt & Acid Folic điều trị thiếu máu',
    activeIngredient: 'Sắt (II) Fumarate / Sulfate + Acid Folic (Vitamin B9)',
    commonBrandNames: ['Tardyferon B9', 'Ferrovit', 'Chela-Ferr Forte', 'Maltofer Fol'],
    indications: [
      'Thiếu máu thiếu sắt (da xanh, hoa mắt chóng mặt, MCV/MCH/Ferritin thấp)',
      'Dự phòng thiếu máu và dị tật ống thần kinh thai nhi cho phụ nữ mang thai, phụ nữ sau sinh, rong kinh'
    ],
    mechanismOfAction: 'Cung cấp sắt nguyên tố tái tổng hợp Hemoglobin vận chuyển oxy hồng cầu và Acid Folic tổng hợp DNA tạo tế bào máu mới.',
    standardDosage: 'Dự phòng thai kỳ: 1 viên/ngày (30-60mg sắt nguyên tố + 400mcg Acid Folic); Thiếu máu rõ: 100-200mg sắt nguyên tố/ngày.',
    administration: 'Sắt hữu cơ/Sulfate hấp thu tốt nhất lúc bụng đói với nước lọc hoặc nước cam giàu Vitamin C; UỐNG CÁCH XA Canxi, sữa, trà, cà phê, thuốc dạ dày tối thiểu 2 giờ.',
    contraindications: ['Bệnh thừa sắt (Hemochromatosis), thiếu máu tan máu (Thalassemia chưa có thiếu sắt)'],
    cautions: ['Thuốc làm phân có màu đen hoặc xanh sẫm (bình thường) và có thể gây táo bón nhẹ (nên ăn nhiều rau xanh và uống đủ nước).'],
    referenceSources: ['WHO Anemia Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'tranexamic-acid',
    category: 'H',
    categoryName: 'H. Tiết Niệu, Tuyến Tiền Liệt & Huyết Học - Sản Khoa',
    groupName: 'Thuốc cầm máu chống tiêu sợi huyết',
    activeIngredient: 'Tranexamic acid',
    commonBrandNames: ['Transamin 500mg / 250mg', 'Cyklokapron', 'Tranexamic Stella'],
    indications: [
      'Cầm máu trong rong kinh, cường kinh, chảy máu cam kéo dài, nhổ răng, sau phẫu thuật',
      'Xuất huyết tiêu hóa cấp, chấn thương chảy máu nặng (theo phác đồ bệnh viện)'
    ],
    mechanismOfAction: 'Ức chế cạnh tranh sự hoạt hóa Plasminogen thành Plasmin, ngăn phân hủy cục máu đông Fibrin giúp cầm máu ổn định.',
    standardDosage: 'Rong kinh: 1000mg (2 viên 500mg) x 3 lần/ngày trong 3-4 ngày đầu hành kinh.',
    administration: 'Uống nguyên viên sau bữa ăn.',
    contraindications: ['Đang có hoặc tiền sử huyết khối tĩnh mạch sâu, thuyên tắc phổi, huyết khối động mạch', 'Tiểu máu đại thể từ đường tiết niệu trên (nguy cơ cục máu bít tắc niệu quản)'],
    cautions: ['Giảm liều ở bệnh nhân suy thận; ngưng ngay nếu thấy rối loạn nhìn màu sắc.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'BNF']
  },
  {
    id: 'progesterone-utrogestan',
    category: 'H',
    categoryName: 'H. Tiết Niệu, Tuyến Tiền Liệt & Huyết Học - Sản Khoa',
    groupName: 'Nội tiết tố Progesterone tự nhiên (Dưỡng thai & Điều kinh)',
    activeIngredient: 'Progesterone tự nhiên vi hạt hóa',
    commonBrandNames: ['Utrogestan 100mg / 200mg', 'Cyclogest 400mg', 'Duphaston 10mg (Dydrogesterone)'],
    indications: [
      'Dọa sảy thai, phòng sinh non do cổ tử cung ngắn hoặc suy hoàng thể',
      'Hỗ trợ pha hoàng thể trong thụ tinh ống nghiệm IVF',
      'Rối loạn kinh nguyệt, vô kinh thứ phát do thiếu Progesterone'
    ],
    mechanismOfAction: 'Gắn thụ thể Progesterone tạo màng rụng nội mạc tử cung thuận lợi cho phôi làm tổ và làm giảm co bóp cơ tử cung.',
    standardDosage: 'Đặt âm đạo hoặc uống: 200mg - 400mg/ngày chia 1-2 lần theo đúng đơn bác sĩ Sản phụ khoa.',
    administration: 'Đặt sâu âm đạo vào buổi tối (khi dùng dưỡng thai giúp ít gây chóng mặt và hấp thu tại tử cung cao) hoặc uống xa bữa ăn trước khi ngủ.',
    contraindications: ['Xuất huyết âm đạo chưa rõ nguyên nhân', 'Suy gan nặng, huyết khối tĩnh mạch đang tiến triển, ung thư vú/sinh dục phụ thuộc hormone'],
    cautions: ['Đường uống dễ gây chóng mặt buồn ngủ thoáng qua sau 1-3 giờ (nên uống lúc chuẩn bị ngủ).'],
    referenceSources: ['Hướng dẫn Sản Phụ Khoa Bộ Y Tế', 'RCOG Guidelines']
  },

  // =========================================================================
  // NHÓM I (MỚI): Da Liễu, Mắt, Tai Mũi Họng & Vitamin - Khoáng Chất Thiết Yếu
  // =========================================================================
  {
    id: 'silkron-topical-combo',
    category: 'I',
    categoryName: 'I. Da Liễu, Mắt - Tai Mũi Họng & Vitamin Khoáng Chất',
    groupName: 'Kem bôi da 3 tác dụng (Kháng viêm + Kháng nấm + Kháng khuẩn)',
    activeIngredient: 'Betamethasone dipropionate + Clotrimazole + Gentamicin',
    commonBrandNames: ['Silkron', 'Gentrisone', 'Trangala', 'Diprosalic (Betamethasone + Salicylic)'],
    indications: [
      'Viêm da dị ứng, chàm (Eczema), hăm kẽ có bội nhiễm nấm hoặc vi khuẩn',
      'Nấm da thân, nấm bẹn có kèm sưng viêm ngứa rát nhiều (chỉ dùng ngắn ngày)'
    ],
    mechanismOfAction: 'Betamethasone chống viêm giảm ngứa; Clotrimazole diệt nấm da/Candida; Gentamicin diệt vi khuẩn bội nhiễm tại chỗ.',
    standardDosage: 'Bôi 1 lớp thật mỏng lên vùng da tổn thương x 2 lần/ngày (sáng - tối), tối đa 7 - 10 ngày.',
    administration: 'Rửa sạch lau khô vùng da, bôi lớp mỏng và rửa tay sạch sau khi bôi.',
    contraindications: ['Tổn thương da do virus (Herpes, Zona, thủy đậu), lao da, trứng cá đỏ', 'Không bôi lên mắt, niêm mạc miệng hoặc vết thương hở rộng'],
    cautions: ['KHÔNG lạm dụng bôi kéo dài lên mặt hoặc vùng da mỏng ở trẻ sơ sinh vì corticoid mạnh gây teo da, rạn da, bùng phát nấm nặng hơn.'],
    referenceSources: ['Hướng dẫn Da Liễu BV Da Liễu TW', 'MIMS']
  },
  {
    id: 'mupirocin',
    category: 'I',
    categoryName: 'I. Da Liễu, Mắt - Tai Mũi Họng & Vitamin Khoáng Chất',
    groupName: 'Kháng sinh mỡ bôi ngoài da đặc hiệu Tụ Cầu Vàng',
    activeIngredient: 'Mupirocin 2%',
    commonBrandNames: ['Bactroban 2% (GSK)', 'Fucidin 2% (Acid Fusidic)', 'Mupirocin 2%'],
    indications: [
      'Chốc lở (Impetigo), viêm nang lông, nhọt nhỏ, vết trầy xước hoặc vết khâu nhiễm khuẩn bề mặt',
      'Tiêu diệt tụ cầu vàng kháng Methicillin (MRSA) cư trú ở tiền đình mũi'
    ],
    mechanismOfAction: 'Ức chế chọn lọc enzym Isoleucyl-tRNA synthetase của vi khuẩn Gram dương (đặc biệt Staphylococcus aureus và Streptococcus), không đề kháng chéo kháng sinh khác.',
    standardDosage: 'Bôi 1 lớp mỏng lên vùng da nhiễm khuẩn x 3 lần/ngày trong 5 - 10 ngày.',
    administration: 'Làm sạch mủ vảy tiết bằng nước muối sinh lý trước khi bôi.',
    contraindications: ['Quá mẫn Mupirocin hoặc tá dược Polyethylene glycol (không bôi vết bỏng diện rộng ở người suy thận)'],
    cautions: ['Chỉ dùng ngoài da; tránh dây vào mắt; hoàn thành đủ 5-7 ngày để tránh kháng thuốc.'],
    referenceSources: ['IDSA Skin Infection Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'isotretinoin',
    category: 'I',
    categoryName: 'I. Da Liễu, Mắt - Tai Mũi Họng & Vitamin Khoáng Chất',
    groupName: 'Retinoid đường uống đặc trị mụn trứng cá bọc nặng',
    activeIngredient: 'Isotretinoin',
    commonBrandNames: ['Acnotin 10mg / 20mg', 'Roaccutane', 'Curacne'],
    indications: [
      'Mụn trứng cá bọc, mụn nang nốt nặng có nguy cơ để lại sẹo rỗ không đáp ứng kháng sinh đường uống'
    ],
    mechanismOfAction: 'Làm teo nhỏ tuyến bã nhờn giảm >80% tiết dầu, điều hòa sừng hóa cổ nang lông và giảm gián tiếp vi khuẩn C. acnes.',
    standardDosage: '0.5mg - 1mg/kg/ngày (thường 10-40mg/ngày) uống theo tổng liều tích lũy bác sĩ Da liễu.',
    administration: 'Uống ngay trong bữa ăn có chất béo để hấp thu tối đa.',
    contraindications: [
      'CHỐNG CHỈ ĐỊNH TUYỆT ĐỐI Ở PHỤ NỮ MANG THAI (gây quái thai cực nặng — phải tránh thai nghiêm ngặt trước 1 tháng, trong suốt thời gian uống và sau khi ngưng ít nhất 1-3 tháng)',
      'Suy gan, tăng mỡ máu nặng, đang uống kháng sinh Tetracycline/Doxycycline (nguy cơ tăng áp lực nội sọ lành tính)'
    ],
    cautions: ['Gây khô môi, khô mắt, khô da rõ rệt; theo dõi men gan và Triglyceride máu mỗi 1-2 tháng; không hiến máu trong thời gian dùng thuốc.'],
    referenceSources: ['AAD Acne Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'tobramycin-dexamethasone',
    category: 'I',
    categoryName: 'I. Da Liễu, Mắt - Tai Mũi Họng & Vitamin Khoáng Chất',
    groupName: 'Thuốc nhỏ mắt Kháng sinh + Kháng viêm',
    activeIngredient: 'Tobramycin 0.3% + Dexamethasone 0.1%',
    commonBrandNames: ['Tobrex (chỉ kháng sinh Tobramycin)', 'Tobradex (phối hợp Dexa)', 'Maxitrol'],
    indications: [
      'Viêm kết mạc có mủ ghèn, viêm bờ mi, viêm giác mạc nông đáp ứng Corticoid sau khi đã loại trừ tổn thương virus/nấm',
      'Phòng nhiễm khuẩn và chống viêm sau phẫu thuật mắt (mổ đục thủy tinh thể, Lasik)'
    ],
    mechanismOfAction: 'Tobramycin diệt vi khuẩn Gram âm/dương tại mắt; Dexamethasone giảm sưng đỏ, cộm mắt.',
    standardDosage: 'Nhỏ 1 - 2 giọt vào mắt bệnh mỗi 4 - 6 giờ (không tự ý dùng quá 7 - 10 ngày).',
    administration: 'Kéo nhẹ mí dưới xuống, nhỏ vào túi kết mạc (không để đầu lọ chạm vào lông mi); đậy kín nắp.',
    contraindications: [
      'Viêm giác mạc do virus Herpes, thủy đậu, nấm mắt hoặc lao mắt (Corticoid làm thủng giác mạc!)',
      'Dị ứng Aminoglycoside'
    ],
    cautions: ['Lọ đã mở nắp chỉ dùng tối đa 15 - 28 ngày; nhỏ kéo dài không có theo dõi nhãn áp dễ gây tăng nhãn áp (Glôcôm) và đục thủy tinh thể.'],
    referenceSources: ['Hướng dẫn BV Mắt TW', 'Vidal Việt Nam']
  },
  {
    id: 'artificial-tears',
    category: 'I',
    categoryName: 'I. Da Liễu, Mắt - Tai Mũi Họng & Vitamin Khoáng Chất',
    groupName: 'Nước mắt nhân tạo làm dịu & Bảo vệ bề mặt nhãn cầu',
    activeIngredient: 'Sodium Hyaluronate 0.1%-0.3% / Polyethylene Glycol + Propylene Glycol',
    commonBrandNames: ['Systane Ultra', 'Sanlein 0.1% / 0.3%', 'Refresh Tears', 'Hylo-Comod'],
    indications: [
      'Hội chứng khô mắt do làm việc máy tính, điều hòa, đeo kính áp tròng',
      'Cộm rát mắt, chảy nước mắt sống do khô, hỗ trợ phục hồi biểu mô giác mạc sau mổ mắt'
    ],
    mechanismOfAction: 'Bổ sung lớp màng nhầy và độ ẩm sinh lý giữ nước trên bề mặt giác mạc, giảm ma sát chớp mắt và ổn định phim nước mắt.',
    standardDosage: 'Nhỏ 1 - 2 giọt vào mỗi mắt x 3 - 6 lần/ngày khi thấy mỏi hoặc khô rát mắt.',
    administration: 'Nếu dùng kèm thuốc nhỏ mắt khác, nhỏ cách nhau ít nhất 5 - 10 phút (nhỏ nước mắt nhân tạo sau cùng nếu dạng gel).',
    contraindications: ['Mẫn cảm với thành phần của thuốc'],
    cautions: ['Người nhỏ nhiều hơn 4 lần/ngày hoặc đeo kính áp tròng nên ưu tiên loại KHÔNG chứa chất bảo quản (tép đơn liều hoặc van một chiều).'],
    referenceSources: ['TFOS DEWS II Dry Eye Guidelines', 'MIMS']
  },
  {
    id: 'ofloxacin-otic',
    category: 'I',
    categoryName: 'I. Da Liễu, Mắt - Tai Mũi Họng & Vitamin Khoáng Chất',
    groupName: 'Thuốc nhỏ tai kháng sinh an toàn ngay cả khi thủng màng nhĩ',
    activeIngredient: 'Ofloxacin 0.3% (hoặc Ciprofloxacin + Dexamethasone)',
    commonBrandNames: ['Ofloxacin 0.3% nhỏ tai', 'Ciprodex', 'Polydexa nhỏ tai (KHÔNG dùng khi thủng nhĩ)'],
    indications: [
      'Viêm tai ngoài cấp do vi khuẩn',
      'Viêm tai giữa cấp/mạn tính có chảy mủ qua ống thông khí hoặc thủng màng nhĩ'
    ],
    mechanismOfAction: 'Fluoroquinolon diệt mạnh trực khuẩn mủ xanh (Pseudomonas aeruginosa) và tụ cầu vàng tại chỗ mà KHÔNG gây độc ốc tai (không điếc).',
    standardDosage: 'Người lớn: nhỏ 5 - 10 giọt vào tai bệnh x 2 lần/ngày trong 7 - 10 ngày.',
    administration: 'Nắm ấm lọ thuốc trong lòng bàn tay 1-2 phút (tránh chóng mặt do nhỏ lạnh), nằm nghiêng tai lên trời, nhỏ xong giữ yên tư thế 3-5 phút.',
    contraindications: ['Dị ứng Fluoroquinolone'],
    cautions: ['CHÚ Ý: Các thuốc nhỏ tai chứa Neomycin/Gentamicin (như Polydexa, Otipax có Lidocain) KHÔNG được nhỏ khi nghi thủng màng nhĩ; chỉ Quinolone như Ofloxacin/Ciprofloxacin mới an toàn tuyệt đối.'],
    referenceSources: ['AAO-HNS Otitis Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'vitamin-b1-b6-b12',
    category: 'I',
    categoryName: 'I. Da Liễu, Mắt - Tai Mũi Họng & Vitamin Khoáng Chất',
    groupName: 'Vitamin nhóm B hướng thần kinh (Bổ dây thần kinh ngoại biên)',
    activeIngredient: 'Vitamin B1 (Thiamin) + B6 (Pyridoxin) + B12 (Cyanocobalamin / Methylcobalamin)',
    commonBrandNames: ['Neurobion (100mg/200mg/200mcg)', 'Methycobal 500mcg', '3B Medi', 'Nevramin'],
    indications: [
      'Viêm đau dây thần kinh tọa, đau cổ vai gáy, tê bì chân tay (đặc biệt do tiểu đường hoặc nghiện rượu)',
      'Hỗ trợ phục hồi liệt dây thần kinh mặt số VII, đau dây thần kinh sau Zona',
      'Dự phòng thiếu B12 khi dùng Metformin hoặc PPI kéo dài'
    ],
    mechanismOfAction: 'B1 tạo năng lượng ATP cho sợi trục; B6 tổng hợp chất dẫn truyền thần kinh; B12 / Methylcobalamin tổng hợp bao Myelin bọc dây thần kinh tăng tốc độ dẫn truyền.',
    standardDosage: 'Neurobion: 1 viên x 1 - 3 lần/ngày; Methycobal 500mcg: 1 viên x 3 lần/ngày.',
    administration: 'Uống nguyên viên sau bữa ăn.',
    contraindications: ['U ác tính đang tiến triển (Vitamin B12 kích thích tăng sinh mô)', 'Dị ứng Cobalamin'],
    cautions: ['Không dùng Vitamin B6 liều quá cao (> 200mg/ngày) liên tục nhiều tháng vì nghịch lý có thể gây bệnh lý thần kinh cảm giác.'],
    brandVariants: [
      {
        variantName: 'Neurobion (P&G Health / Merck - Đức)',
        manufacturer: 'P&G Health / Merck',
        ingredients: 'Vitamin B1 100mg + Vitamin B6 200mg + Vitamin B12 200mcg',
        specialEffect: 'Phối hợp Vitamin hướng thần kinh chuẩn lâm sàng phục hồi bao myelin và giảm tê bì châm chích rễ thần kinh.'
      },
      {
        variantName: 'Methycobal 500mcg (Eisai - Nhật Bản)',
        manufacturer: 'Eisai (Nhật Bản)',
        ingredients: 'Mecobalamin (Methylcobalamin - Coenzyme B12 hoạt động) 500mcg',
        specialEffect: 'Dạng B12 hoạt tính đi thẳng vào mô thần kinh mà không cần chuyển hóa qua gan, tái tạo bao myelin mạnh mẽ.'
      }
    ],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'MIMS']
  },
  {
    id: 'calcium-vitamin-d3',
    category: 'I',
    categoryName: 'I. Da Liễu, Mắt - Tai Mũi Họng & Vitamin Khoáng Chất',
    groupName: 'Bổ sung Canxi & Vitamin D3 (Xương khớp, Thai kỳ & Loãng xương)',
    activeIngredient: 'Calcium (Carbonate / Citrate / Glucoheptonate) + Cholecalciferol (Vitamin D3)',
    commonBrandNames: ['Calci-D', 'Corbiere (Calcium Corbiere ống 10ml)', 'Ostelin Calcium & Vitamin D3', 'Briozcal'],
    indications: [
      'Phòng và hỗ trợ điều trị loãng xương, còi xương, chuột rút hạ calci nhẹ',
      'Tăng nhu cầu Canxi ở phụ nữ mang thai, cho con bú và thiếu niên tuổi dậy thì'
    ],
    mechanismOfAction: 'Vitamin D3 tăng cường tổng hợp protein gắn Calci ở ruột non giúp hấp thu tối đa Canxi vào máu và lắng đọng vào khung xương.',
    standardDosage: '500mg - 1000mg Canxi nguyên tố/ngày (+ 400-800 UI Vitamin D3), chia 1-2 lần (không quá 500mg Canxi nguyên tố/lần uống).',
    administration: 'Uống vào buổi SÁNG hoặc TRƯA ngay sau ăn (Calcium Carbonate cần acid dạ dày; uống ban ngày đủ nước tránh lắng sỏi thận buổi tối); uống CÁCH XA viên Sắt, Levothyroxine và kháng sinh Quinolon/Tetracycline tối thiểu 2 giờ.',
    contraindications: ['Tăng Calci máu, tăng Calci niệu nặng', 'Sỏi thận Calci đang tiến triển', 'Ngộ độc Vitamin D'],
    cautions: ['Bệnh nhân suy thận mạn hoặc từng sỏi thận nên ưu tiên dạng Canxi Citrate hoặc hỏi ý kiến bác sĩ về liều tối đa.'],
    referenceSources: ['Institute of Medicine Calcium Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'zinc-vitamin-c',
    category: 'I',
    categoryName: 'I. Da Liễu, Mắt - Tai Mũi Họng & Vitamin Khoáng Chất',
    groupName: 'Vi chất Kẽm & Vitamin C (Miễn dịch, Tiêu chảy trẻ em & Da liễu)',
    activeIngredient: 'Kẽm (Zinc gluconate / sulfate) + Acid Ascorbic (Vitamin C)',
    commonBrandNames: ['ZinC 10mg / 20mg', 'Farzincol 70mg', 'Redoxon / Upsa-C 1000mg', 'Berocca'],
    indications: [
      'Hỗ trợ phác đồ WHO điều trị tiêu chảy cấp ở trẻ em (rút ngắn thời gian tiêu chảy và tái phát)',
      'Tăng cường miễn dịch đường hô hấp, rút ngắn cảm cúm, hỗ trợ lành thương da & mụn trứng cá'
    ],
    mechanismOfAction: 'Kẽm là đồng yếu tố của >300 enzym miễn dịch và tái tạo biểu mô ruột/da; Vitamin C chống oxy hóa, tăng tổng hợp Collagen và hỗ trợ hấp thu Sắt.',
    standardDosage: 'Tiêu chảy trẻ >= 6 tháng: Kẽm nguyên tố 20mg/ngày x 10-14 ngày; Trẻ < 6 tháng: 10mg/ngày. Vitamin C người lớn: 250-1000mg/ngày (không lạm dụng >2000mg/ngày).',
    administration: 'Kẽm uống sau ăn 1 giờ (tránh uống bụng rỗng dễ gây nôn nao); Vitamin C uống buổi sáng hoặc trưa sau ăn.',
    contraindications: ['Tiền sử sỏi thận Oxalat hoặc bệnh thiếu men G6PD (đối với Vitamin C liều cao > 1000mg/ngày)'],
    cautions: ['Viên sủi Vitamin C/Berocca chứa nhiều Natri nên thận trọng ở người tăng huyết áp hoặc suy tim.'],
    referenceSources: ['WHO Diarrhea Zinc Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  // --- BỔ SUNG ĐỢT 2: Thuốc Thiết Yếu Đa Chuyên Khoa ---
  {
    id: 'simethicone',
    category: 'B',
    categoryName: 'B. Bệnh Lý Tiêu Hóa - Dạ Dày - Gan Mật',
    groupName: 'Chống đầy hơi, chướng bụng, ợ hơi',
    activeIngredient: 'Simethicone',
    commonBrandNames: ['Espumisan 40mg / L', 'Air-X', 'Pepsane (phối hợp)'],
    indications: ['Đầy hơi, chướng bụng, sình bụng sau ăn, đau quặn bụng do ứ hơi ở trẻ sơ sinh và người lớn', 'Chuẩn bị trước nội soi/siêu âm ổ bụng'],
    mechanismOfAction: 'Làm giảm sức căng bề mặt các bóng khí nhầy trong đường tiêu hóa, giúp phá vỡ bọt khí lớn thành khí tự do dễ tống xuất qua ợ hơi hoặc trung tiện mà không hấp thu vào máu.',
    standardDosage: 'Người lớn: 80mg x 3 - 4 lần/ngày sau ăn và trước ngủ.',
    administration: 'Nhai kỹ viên (Air-X) hoặc nuốt nang mềm sau bữa ăn.',
    contraindications: ['Thủng ruột hoặc tắc ruột cơ học nghi ngờ'],
    cautions: ['Thuốc hoàn toàn trơ về mặt sinh học, an toàn cho trẻ sơ sinh và phụ nữ mang thai.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'Vidal']
  },
  {
    id: 'mebeverine',
    category: 'B',
    categoryName: 'B. Bệnh Lý Tiêu Hóa - Dạ Dày - Gan Mật',
    groupName: 'Chống co thắt cơ trơn đại tràng (Hội chứng ruột kích thích IBS)',
    activeIngredient: 'Mebeverine HCl',
    commonBrandNames: ['Duspatalin 135mg', 'Duspatalin Retard 200mg', 'Mebeverin Stella'],
    indications: ['Đau quặn bụng, co thắt đại tràng, rối loạn phân trong Hội chứng ruột kích thích (IBS)'],
    mechanismOfAction: 'Giãn trực tiếp cơ trơn đường tiêu hóa (chẹn kênh Na+ và ức chế tích tụ Ca2+) mà không gây tác dụng phụ kháng Cholinergic như khô miệng, bí tiểu.',
    standardDosage: 'Duspatalin Retard 200mg: 1 viên x 2 lần/ngày (sáng - tối); hoặc 135mg x 3 lần/ngày.',
    administration: 'Nuốt nguyên viên với 1 ly nước đầy trước bữa ăn 20 phút.',
    contraindications: ['Liệt ruột, quá mẫn Mebeverine'],
    cautions: ['Không nhai nát viên nang phóng thích kéo dài 200mg.'],
    referenceSources: ['NICE IBS Guidelines', 'BNF']
  },
  {
    id: 'chlorpheniramine',
    category: 'C',
    categoryName: 'C. Bệnh Lý Hô Hấp & Dị Ứng',
    groupName: 'Kháng Histamin H1 thế hệ 1 (Cắt chảy nước mũi, ngứa cấp)',
    activeIngredient: 'Chlorpheniramine maleate',
    commonBrandNames: ['Chlorpheniramin 4mg', 'Allerest', 'Có trong Decolgen / Tiffy'],
    indications: ['Sổ mũi, hắt hơi, chảy nước mũi do cảm lạnh, viêm mũi dị ứng cấp, ngứa mề đay'],
    mechanismOfAction: 'Chẹn thụ thể Histamin H1 kèm tác dụng kháng Cholinergic giúp làm khô nhanh dịch tiết mũi họng.',
    standardDosage: 'Người lớn: 4mg mỗi 4 - 6 giờ (tối đa 24mg/ngày).',
    administration: 'Uống sau bữa ăn hoặc trước khi đi ngủ.',
    contraindications: ['Cơn hen cấp, phì đại tuyến tiền liệt bí tiểu, tăng nhãn áp góc đóng, hẹp môn vị'],
    cautions: ['GÂY BUỒN NGỦ RÕ RỆT — tuyệt đối không lái xe hoặc vận hành máy móc sau khi uống.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'BNF']
  },
  {
    id: 'carbocisteine',
    category: 'C',
    categoryName: 'C. Bệnh Lý Hô Hấp & Dị Ứng',
    groupName: 'Điều hòa chất nhầy phế quản & Viêm tai tiết dịch',
    activeIngredient: 'Carbocisteine',
    commonBrandNames: ['Rhinathiol', 'Muciclar', 'Carbocistein 375mg'],
    indications: ['COPD, viêm phế quản mạn có đờm đặc, viêm tai giữa ứ dịch keo ở trẻ em'],
    mechanismOfAction: 'Điều chỉnh tỷ lệ Sialomucin / Fucomucin giúp dịch nhầy trở nên loãng và đàn hồi sinh lý dễ tống xuất.',
    standardDosage: 'Người lớn: 750mg x 3 lần/ngày, sau đó giảm xuống 375mg x 4 lần/ngày.',
    administration: 'Uống sau bữa ăn.',
    contraindications: ['Loét dạ dày tá tràng đang tiến triển', 'Trẻ em < 2 tuổi'],
    cautions: ['Không phối hợp với thuốc giảm ho hoặc thuốc làm khô dịch tiết phế quản.'],
    referenceSources: ['GOLD COPD Guidelines', 'BNF']
  },
  {
    id: 'salmeterol-fluticasone',
    category: 'C',
    categoryName: 'C. Bệnh Lý Hô Hấp & Dị Ứng',
    groupName: 'Thuốc hít kiểm soát Hen phế quản & COPD (ICS + LABA)',
    activeIngredient: 'Salmeterol + Fluticasone propionate',
    commonBrandNames: ['Seretide Evohaler 25/125 - 25/250', 'Seretide Accuhaler 50/250 - 50/500'],
    indications: ['Điều trị dự phòng duy trì hen phế quản (bậc 3-5) và bệnh phổi tắc nghẽn mạn tính (COPD)'],
    mechanismOfAction: 'Fluticasone chống viêm mạn tính đường thở; Salmeterol giãn phế quản kéo dài 12 giờ.',
    standardDosage: 'Seretide Evohaler: xịt 2 nhát x 2 lần/ngày (sáng - tối); Accuhaler: hít 1 liều x 2 lần/ngày.',
    administration: 'BẮT BUỘC súc miệng và khò họng bằng nước sạch (nhổ bỏ) ngay sau khi hít để tránh nấm Candida họng và khàn tiếng.',
    contraindications: ['Quá mẫn Salmeterol hoặc Fluticasone (KHÔNG dùng để cắt cơn hen cấp tính đột ngột — cơn cấp phải dùng Ventolin)'],
    cautions: ['Phải dùng đều mỗi ngày kể cả khi thấy hết khó thở.'],
    referenceSources: ['GINA 2024 Guidelines', 'GOLD 2025 Guidelines']
  },
  {
    id: 'erythromycin',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh Macrolide cổ điển (An toàn thai kỳ)',
    activeIngredient: 'Erythromycin (stearate / ethylsuccinate)',
    commonBrandNames: ['Erythromycin 500mg', 'Ery-500', 'Erylik / Eryfluid (bôi mụn)'],
    indications: ['Nhiễm khuẩn hô hấp, ho gà, Chlamydia ở phụ nữ mang thai hoặc người dị ứng Penicillin'],
    mechanismOfAction: 'Gắn 50S ribosom vi khuẩn ức chế tổng hợp protein; dạng bôi ngoài da diệt C. acnes trị mụn.',
    standardDosage: 'Người lớn: 250mg - 500mg mỗi 6 giờ (hoặc 500mg x 2-4 lần/ngày).',
    administration: 'Uống trước bữa ăn 1 giờ hoặc trong bữa ăn nếu đau bụng.',
    contraindications: ['Đang dùng Simvastatin, Lovastatin, Terfenadine, Cisapride, Domperidone', 'Suy gan nặng (với dạng Estolate)'],
    cautions: ['Thường gây cồn cào co thắt dạ dày; ức chế CYP3A4 mạnh.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'Sanford Guide']
  },
  {
    id: 'moxifloxacin',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh Fluoroquinolon hô hấp thế hệ 4',
    activeIngredient: 'Moxifloxacin HCl',
    commonBrandNames: ['Avelox 400mg', 'Vigamox 0.5% (nhỏ mắt)', 'Moxifloxacin Stada'],
    indications: [
      'Viêm phổi mắc phải cộng đồng mức độ vừa - nặng, đợt cấp COPD do vi khuẩn, viêm xoang cấp kháng thuốc',
      'Nhiễm khuẩn ổ bụng hoặc vùng chậu phức tạp; nhỏ mắt trị viêm kết mạc mủ (Vigamox)'
    ],
    mechanismOfAction: 'Ức chế mạnh DNA gyrase và Topoisomerase IV trên cả vi khuẩn Gram dương (phế cầu kháng Penicillin), Gram âm, vi khuẩn không điển hình và kỵ khí.',
    standardDosage: 'Uống 400mg x 1 lần duy nhất mỗi ngày.',
    administration: 'Uống cách xa thuốc chứa Sắt, Kẽm, Canxi, Antacid ít nhất 4 giờ.',
    contraindications: ['Trẻ em < 18 tuổi, phụ nữ có thai/cho con bú', 'Khoảng QT kéo dài, rối loạn nhịp tim, hạ Kali máu chưa bù', 'Tiền sử viêm đứt gân do Quinolon'],
    cautions: ['Không dùng điều trị nhiễm khuẩn tiết niệu (do nồng độ thải qua nước tiểu thấp, tiết niệu dùng Levofloxacin/Ciprofloxacin).'],
    referenceSources: ['IDSA Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'cotrimoxazole',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh phối hợp Sulfonamide + Trimethoprim',
    activeIngredient: 'Sulfamethoxazole 400mg + Trimethoprim 80mg (Co-trimoxazole)',
    commonBrandNames: ['Biseptol 480mg', 'Bactrim 480mg / Forte 960mg', 'Cotrim 480mg'],
    indications: [
      'Nhiễm khuẩn tiết niệu, viêm tuyến tiền liệt, tiêu chảy nhiễm khuẩn (Shigella)',
      'Nhiễm trùng da tụ cầu MRSA ngoài cộng đồng, dự phòng viêm phổi Pneumocystis jirovecii (PCP)'
    ],
    mechanismOfAction: 'Ức chế tuần tự hai bước liên tiếp tổng hợp Acid Folic thiết yếu để tổng hợp DNA của vi khuẩn.',
    standardDosage: 'Người lớn: 960mg (2 viên 480mg) x 2 lần/ngày (sáng - tối).',
    administration: 'Uống sau ăn với nhiều nước (2 - 2.5 lít/ngày) để tránh kết tinh tinh thể ở thận.',
    contraindications: ['Dị ứng Sulfonamide', 'Thiếu men G6PD (gây tan máu)', 'Suy gan/thận nặng, trẻ < 2 tháng tuổi, phụ nữ mang thai 3 tháng cuối'],
    cautions: ['Ngưng thuốc ngay nếu nổi ban đỏ da/loét niêm mạc (hội chứng Stevens-Johnson); làm tăng mạnh INR của Warfarin và gây tăng Kali máu khi dùng chung ACEi/ARB.'],
    referenceSources: ['The Sanford Guide', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'entecavir',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Thuốc kháng virus Viêm Gan B mạn tính (An toàn thận - xương)',
    activeIngredient: 'Entecavir',
    commonBrandNames: ['Baraclude 0.5mg / 1mg', 'Entecavir Stada 0.5mg'],
    indications: [
      'Điều trị Viêm gan B (HBV) mạn tính ở người lớn (đặc biệt ưu tiên ở bệnh nhân cao tuổi có loãng xương hoặc suy giảm chức năng thận)'
    ],
    mechanismOfAction: 'Chất tương tự Guanosine ức chế cả 3 pha sao chép của HBV DNA Polymerase với hàng rào kháng thuốc cực cao ở người chưa từng dùng Lamivudine.',
    standardDosage: '0.5mg x 1 lần/ngày (1mg/ngày nếu từng kháng Lamivudine hoặc xơ gan mất bù).',
    administration: 'BẮT BUỘC uống lúc BỤNG ĐÓI (trước ăn ít nhất 2 giờ hoặc sau ăn ít nhất 2 giờ) vì thức ăn làm giảm hấp thu thuốc tới 50%.',
    contraindications: ['Quá mẫn Entecavir', 'Không dùng ở phụ nữ mang thai nếu ưu tiên được Tenofovir'],
    cautions: ['Uống đều hàng ngày không tự ý bỏ thuốc (tránh bùng phát viêm gan bùng nổ); chỉnh liều theo eGFR nếu CrCl < 50 ml/phút.'],
    referenceSources: ['Phác đồ Viêm Gan B Bộ Y Tế', 'EASL HBV Guidelines']
  },
  {
    id: 'ketoconazole',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Thuốc kháng nấm tại chỗ trị Gàu, Viêm da tiết bã & Lang ben',
    activeIngredient: 'Ketoconazole 2% (Dầu gội / Kem bôi)',
    commonBrandNames: ['Nizoral Shampoo 2%', 'Nizoral Cream 2%', 'Ketoconazol 2%'],
    indications: [
      'Viêm da tiết bã vùng da đầu và mặt (gàu nặng, bong vảy đỏ ngứa)',
      'Lang ben (Malassezia), nấm thân, nấm bẹn ngoài da'
    ],
    mechanismOfAction: 'Ức chế tổng hợp Ergosterol màng tế bào nấm Malassezia và nấm sợi Dermatophyte.',
    standardDosage: 'Dầu gội: Gội 2 lần/tuần trong 2-4 tuần (ủ bọt trên da đầu 3-5 phút trước khi xả). Kem bôi: Bôi ngày 1-2 lần.',
    administration: 'Chỉ dùng ngoài da và da đầu (hiện nay hạn chế tối đa dạng uống do độc tính gan).',
    contraindications: ['Quá mẫn Ketoconazole', 'Không bôi vào mắt hoặc vết thương hở'],
    cautions: ['Sau khi hết gàu/lang ben có thể duy trì gội 1 lần/tuần hoặc mỗi 2 tuần để chống tái phát.'],
    referenceSources: ['AAD Seborrheic Dermatitis Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'metoprolol',
    category: 'E',
    categoryName: 'E. Bệnh Lý Tim Mạch, Huyết Áp & Mỡ Máu',
    groupName: 'Chẹn Beta-1 chọn lọc tim (Nhịp nhanh, Đau thắt ngực & Suy tim)',
    activeIngredient: 'Metoprolol succinate (ER) / tartrate',
    commonBrandNames: ['Betaloc ZOK 25mg / 50mg / 100mg', 'Betaloc 50mg'],
    indications: [
      'Tăng huyết áp, nhịp tim nhanh xoang / kiểm soát tần số thất trong rung nhĩ',
      'Đau thắt ngực ổn định, sau nhồi máu cơ tim cấp, suy tim mạn HFrEF (chỉ dùng dạng Succinate ZOK)'
    ],
    mechanismOfAction: 'Chẹn chọn lọc thụ thể Beta-1 giao cảm tại nút xoang, nút nhĩ thất và cơ tim, làm chậm nhịp tim và giảm tiêu thụ oxy cơ tim.',
    standardDosage: 'Betaloc ZOK: 25mg - 100mg (tối đa 200mg) x 1 lần/ngày vào buổi sáng.',
    administration: 'Nuốt nguyên viên với nước (có thể bẻ đôi theo vạch chia trên viên Betaloc ZOK nhưng không nghiền nhai).',
    contraindications: ['Nhịp chậm xoang < 50 lần/phút, block nhĩ thất độ II-III, sốc tim, hen phế quản nặng'],
    cautions: ['Không ngưng thuốc đột ngột (giảm liều dần trong 1-2 tuần); theo dõi nhịp tim và huyết áp.'],
    referenceSources: ['ESC Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'irbesartan',
    category: 'E',
    categoryName: 'E. Bệnh Lý Tim Mạch, Huyết Áp & Mỡ Máu',
    groupName: 'Chẹn thụ thể Angiotensin II (ARB bảo vệ thận tiểu đường)',
    activeIngredient: 'Irbesartan',
    commonBrandNames: ['Aprovel 150mg / 300mg', 'CoAprovel (phối hợp HCTZ)', 'Irbepharm'],
    indications: [
      'Tăng huyết áp nguyên phát',
      'Bệnh thận mạn do đái tháo đường Tuýp 2 có tăng huyết áp và tiểu đạm (Albumin niệu)'
    ],
    mechanismOfAction: 'Chẹn chọn lọc thụ thể AT1 của Angiotensin II, giãn tiểu động mạch đi cầu thận giúp giảm áp lực lọc cầu thận và giảm đạm niệu.',
    standardDosage: '150mg - 300mg x 1 lần/ngày.',
    administration: 'Uống cùng hoặc xa bữa ăn.',
    contraindications: ['Phụ nữ mang thai (gây độc thận thai nhi)', 'Phối hợp Aliskiren ở người tiểu đường'],
    cautions: ['Kiểm tra Kali máu và Creatinine sau 2 tuần khởi trị hoặc tăng liều.'],
    referenceSources: ['KDIGO Diabetes Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'ticagrelor',
    category: 'E',
    categoryName: 'E. Bệnh Lý Tim Mạch, Huyết Áp & Mỡ Máu',
    groupName: 'Chống kết tập tiểu cầu mạnh thế hệ mới (Hội chứng vành cấp)',
    activeIngredient: 'Ticagrelor',
    commonBrandNames: ['Brilinta 90mg', 'Brilinta 60mg'],
    indications: [
      'Phối hợp Aspirin 81mg phòng huyết khối sau nhồi máu cơ tim cấp, đau thắt ngực không ổn định hoặc đặt Stent mạch vành'
    ],
    mechanismOfAction: 'Chẹn thuận nghịch trực tiếp thụ thể P2Y12 trên tiểu cầu mà KHÔNG cần gan chuyển hóa hoạt hóa (tác dụng nhanh, ổn định và không bị kháng thuốc do gen CYP2C19 như Clopidogrel).',
    standardDosage: 'Nạp 180mg, duy trì 90mg x 2 lần/ngày (sáng - tối) trong 12 tháng đầu sau đặt Stent, phối hợp Aspirin <= 100mg/ngày.',
    administration: 'Uống đều 2 lần/ngày cách 12 giờ.',
    contraindications: ['Đang xuất huyết tiến triển, tiền sử xuất huyết nội sọ', 'Suy gan nặng', 'Dùng chung thuốc ức chế mạnh CYP3A4 (Ketoconazole, Clarithromycin)'],
    cautions: ['Không phối hợp với Aspirin liều > 100mg/ngày; có thể gây cảm giác hụt hơi thoáng qua lành tính hoặc tăng nhẹ Acid Uric.'],
    referenceSources: ['ESC ACS Guidelines', 'DiPiro Pharmacotherapy']
  },
  {
    id: 'digoxin',
    category: 'E',
    categoryName: 'E. Bệnh Lý Tim Mạch, Huyết Áp & Mỡ Máu',
    groupName: 'Glycoside trợ tim & Kiểm soát nhịp thất trong Rung nhĩ',
    activeIngredient: 'Digoxin',
    commonBrandNames: ['Digoxin 0.25mg', 'Lanoxin 0.25mg'],
    indications: [
      'Rung nhĩ, cuồng nhĩ đáp ứng thất nhanh (làm chậm nhịp thất)',
      'Suy tim mạn có phân suất tống máu giảm còn triệu chứng dù đã tối ưu phác đồ nền'
    ],
    mechanismOfAction: 'Ức chế bơm Na+/K+-ATPase cơ tim làm tăng co bóp cơ tim và tăng trương lực dây thần kinh phế vị (dây X) làm chậm dẫn truyền qua nút nhĩ thất.',
    standardDosage: '0.125mg - 0.25mg x 1 lần/ngày (người cao tuổi hoặc suy thận dùng 0.0625 - 0.125mg/ngày).',
    administration: 'Uống cố định 1 giờ mỗi ngày.',
    contraindications: ['Block nhĩ thất độ II-III, nhịp nhanh thất/rung thất, hội chứng WPW', 'Ngộ độc Digoxin, hạ Kali máu nặng chưa bù'],
    cautions: ['KHOẢNG TRỊ LIỆU RẤT HẸP: Hạ Kali máu (do Furosemide) hoặc suy thận dễ gây ngộ độc Digoxin (buồn nôn, nhìn thấy quầng vàng xanh, loạn nhịp tim nguy hiểm).'],
    referenceSources: ['ESC AF & HF Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'amiodarone',
    category: 'E',
    categoryName: 'E. Bệnh Lý Tim Mạch, Huyết Áp & Mỡ Máu',
    groupName: 'Thuốc chống loạn nhịp tim nhóm III phổ rộng',
    activeIngredient: 'Amiodarone HCl',
    commonBrandNames: ['Cordarone 200mg', 'Amiodaron 200mg'],
    indications: [
      'Dự phòng và điều trị các rối loạn nhịp thất nguy hiểm (nhịp nhanh thất, rung thất)',
      'Rung nhĩ kịch phát / dai dẳng, nhịp nhanh trên thất kháng các thuốc khác'
    ],
    mechanismOfAction: 'Kéo dài thời gian điện thế hoạt động và thời kỳ trơ của mô dẫn truyền cơ tim qua chẹn kênh Kali, Natri, Calci và thụ thể Beta.',
    standardDosage: 'Tấn công: 200mg x 3 lần/ngày x 1 tuần -> 200mg x 2 lần/ngày x 1 tuần -> duy trì 100 - 200mg/ngày (hoặc 5 ngày/tuần).',
    administration: 'Uống trong hoặc ngay sau bữa ăn.',
    contraindications: ['Nhịp xoang chậm nặng, block nhĩ thất khi chưa đặt máy tạo nhịp', 'Rối loạn chức năng tuyến giáp, dị ứng I-ốt, phụ nữ có thai/cho con bú'],
    cautions: ['Thời gian bán thải rất dài (25-100 ngày); dùng lâu dài cần theo dõi định kỳ chức năng tuyến giáp (TSH), men gan (AST/ALT), X-quang phổi (xơ phổi) và khám mắt.'],
    referenceSources: ['ESC Arrhythmia Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'propylthiouracil',
    category: 'F',
    categoryName: 'F. Bệnh Lý Nội Tiết & Chuyển Hóa',
    groupName: 'Kháng giáp tổng hợp ưu tiên 3 tháng đầu thai kỳ & Cơn bão giáp',
    activeIngredient: 'Propylthiouracil (PTU)',
    commonBrandNames: ['PTU 50mg', 'Propycil 50mg'],
    indications: [
      'Điều trị cường giáp ở phụ nữ mang thai 3 tháng đầu (giảm nguy cơ dị tật bẩm sinh so với Thiamazole)',
      'Cơn bão giáp (Thyroid storm) cấp cứu nhờ ức chế chuyển T4 thành T3 ngoại vi'
    ],
    mechanismOfAction: 'Ức chế enzym Thyroid Peroxidase tại tuyến giáp ĐỒNG THỜI ức chế enzym 5-deiodinase ngoại vi ngăn chuyển hormone T4 thành dạng hoạt động mạnh T3.',
    standardDosage: '50mg - 100mg x 3 lần/ngày (cách mỗi 8 giờ) theo hướng dẫn bác sĩ Nội tiết.',
    administration: 'Chia đều các cử trong ngày sau ăn.',
    contraindications: ['Quá mẫn PTU, tiền sử tổn thương gan nặng hoặc mất bạch cầu hạt do PTU'],
    cautions: ['Chuyển từ PTU sang Thiamazole từ tam cá nguyệt thứ 2 thai kỳ để giảm độc tính gan cho mẹ; khám ngay nếu vàng da, nước tiểu sậm màu hoặc sốt đau họng.'],
    referenceSources: ['ATA Pregnancy Thyroid Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'valproic-acid',
    category: 'G',
    categoryName: 'G. Bệnh Lý Thần Kinh, Tiền Đình & Giấc Ngủ',
    groupName: 'Chống động kinh phổ rộng, Ổn định khí sắc & Dự phòng Migraine',
    activeIngredient: 'Sodium Valproate + Valproic acid',
    commonBrandNames: ['Depakine Chrono 500mg', 'Depakine 200mg / Si-rô', 'Encorate Chrono'],
    indications: [
      'Động kinh toàn thể (cơn vắng ý thức, giật cơ, co cứng co giật) và động kinh cục bộ',
      'Rối loạn lưỡng cực (pha hưng cảm), dự phòng đau đầu Migraine nặng'
    ],
    mechanismOfAction: 'Tăng nồng độ chất dẫn truyền ức chế GABA trong não (ức chế GABA transaminase) đồng thời chẹn kênh Natri và kênh Calci T-type.',
    standardDosage: 'Người lớn: 500mg - 1500mg/ngày chia 1 - 2 lần (dạng Chrono uống 1-2 lần/ngày).',
    administration: 'Nuốt nguyên viên Depakine Chrono (không nhai nghiền) ngay trong hoặc sau bữa ăn.',
    contraindications: [
      'Viêm gan cấp/mạn, rối loạn chu trình Urê, bệnh ty thể (POLG)',
      'CHỐNG CHỈ ĐỊNH Ở PHỤ NỮ ĐANG MANG THAI hoặc phụ nữ độ tuổi sinh đẻ nếu có thuốc thay thế (nguy cơ cao dị tật ống thần kinh và chậm phát triển trí tuệ thai nhi)'
    ],
    cautions: ['Theo dõi men gan, công thức máu (tiểu cầu) và cân nặng định kỳ; không phối hợp với kháng sinh Carbapenem (làm tụt nồng độ Valproat đột ngột gây tái phát cơn co giật).'],
    referenceSources: ['ILAE Epilepsy Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'donepezil',
    category: 'G',
    categoryName: 'G. Bệnh Lý Thần Kinh, Tiền Đình & Giấc Ngủ',
    groupName: 'Điều trị sa sút trí tuệ & Bệnh Alzheimer',
    activeIngredient: 'Donepezil HCl',
    commonBrandNames: ['Aricept 5mg / 10mg', 'Aricept Evess (viên tan trong miệng)', 'Donepezil Stella'],
    indications: ['Sa sút trí tuệ mức độ nhẹ, vừa và nặng trong bệnh Alzheimer và sa sút trí tuệ mạch máu'],
    mechanismOfAction: 'Ức chế chọn lọc và thuận nghịch enzym Acetylcholinesterase tại não, làm tăng nồng độ Acetylcholine tại các synap vỏ não - hồi hải mã giúp cải thiện trí nhớ và nhận thức.',
    standardDosage: 'Khởi đầu 5mg x 1 lần/ngày vào buổi tối trong ít nhất 4 tuần, có thể tăng lên 10mg x 1 lần/ngày.',
    administration: 'Uống 1 lần vào buổi tối ngay trước khi đi ngủ (nếu gây mất ngủ hoặc ác mộng có thể chuyển sang uống buổi sáng).',
    contraindications: ['Quá mẫn Donepezil hoặc dẫn xuất Piperidine'],
    cautions: ['Thận trọng ở người có hội chứng suy nút xoang, nhịp tim chậm (< 55 l/p), tiền sử loét dạ dày hoặc hen phế quản/COPD nặng.'],
    referenceSources: ['EAN Dementia Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'ketosteril',
    category: 'H',
    categoryName: 'H. Tiết Niệu, Tuyến Tiền Liệt & Huyết Học - Sản Khoa',
    groupName: 'Acid amin thiết yếu cho Bệnh Thận Mạn (Giảm Urê huyết)',
    activeIngredient: 'Các Keto-acid & Acid amin thiết yếu không chứa Nitơ',
    commonBrandNames: ['Ketosteril', 'Nefrocare', 'Ketoamin'],
    indications: [
      'Phòng ngừa và điều trị rối loạn chuyển hóa đạm ở bệnh nhân Bệnh thận mạn (CKD giai đoạn 3-5, eGFR < 25-45 ml/phút) kết hợp chế độ ăn giảm đạm để làm chậm tiến triển tới lọc máu'
    ],
    mechanismOfAction: 'Các chất tương tự Keto-acid thu giữ nhóm amin (NH2) từ lượng Urê dư thừa trong máu để chuyển hóa thành acid amin thiết yếu nuôi cơ thể, giúp giảm Urê máu mà không tạo thêm gánh nặng nitơ cho thận.',
    standardDosage: 'Người lớn (70kg): 4 - 8 viên x 3 lần/ngày (tính theo 1 viên / 5kg cân nặng/ngày chia 3 lần).',
    administration: 'Nuốt nguyên viên (không nhai vì rất đắng) NGAY TRONG BỮA ĂN để hấp thu và chuyển hóa tối đa.',
    contraindications: ['Tăng Calci máu', 'Rối loạn chuyển hóa acid amin (Phenylceton niệu)'],
    cautions: ['Mỗi viên chứa ~50mg Calci nguyên tố -> cần kiểm tra Calci máu định kỳ và giảm liều thuốc gắn phosphat chứa Calci hoặc Vitamin D nếu Calci tăng.'],
    referenceSources: ['KDIGO 2024 CKD Nutrition Guidelines', 'Vidal Việt Nam']
  },
  {
    id: 'potassium-chloride',
    category: 'H',
    categoryName: 'H. Tiết Niệu, Tuyến Tiền Liệt & Huyết Học - Sản Khoa',
    groupName: 'Bù Kali điện giải đường uống (Phòng rối loạn nhịp tim)',
    activeIngredient: 'Potassium chloride (Kali clorid)',
    commonBrandNames: ['Kaleorid LP 600mg / 1000mg', 'Kalium Chloratum', 'Panangin (Kali + Magie)'],
    indications: [
      'Điều trị và dự phòng hạ Kali máu (K+ < 3.5 mmol/L) do dùng lợi tiểu quai/thiazide (Lasix), tiêu chảy, nôn ói kéo dài hoặc dùng Corticoid liều cao'
    ],
    mechanismOfAction: 'Bổ sung ion K+ nội bào thiết yếu duy trì điện thế màng nghỉ tế bào cơ tim, cơ vân và dẫn truyền thần kinh.',
    standardDosage: 'Dự phòng: 600mg - 1200mg/ngày; Điều trị hạ Kali nhẹ - vừa: 1200mg - 2400mg/ngày chia 2 lần.',
    administration: 'BẮT BUỘC nuốt nguyên viên Kaleorid LP với 1 ly nước đầy NGAY SAU BỮA ĂN (tuyệt đối không nhai bẻ viên phóng thích kéo dài vì giải phóng ồ ạt gây loét thủng ruột).',
    contraindications: ['Tăng Kali máu (> 5.0 mmol/L)', 'Suy thận nặng thiểu/vô niệu, bệnh Addison chưa điều trị', 'Đang dùng chung Spironolactone/ACEi mà K+ đã cao'],
    cautions: ['Theo dõi điện giải đồ định kỳ; phần vỏ sáp khung viên Kaleorid LP có thể thấy đi nguyên vẹn ra ngoài theo phân là hiện tượng bình thường (thuốc đã ngấm hết).'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'BNF']
  },
  {
    id: 'magnesium-b6',
    category: 'I',
    categoryName: 'I. Da Liễu, Mắt - Tai Mũi Họng & Vitamin Khoáng Chất',
    groupName: 'Khoáng chất Magie & Vitamin B6 (Chống chuột rút, Dịu thần kinh)',
    activeIngredient: 'Magie lactat / pidolat + Pyridoxin HCl (Vitamin B6)',
    commonBrandNames: ['Magne-B6 Corbiere', 'Magnesi B6', 'Magne-B6 Extra'],
    indications: [
      'Thiếu Magie gây chuột rút bắp chân, co giật mí mắt, tê bì châm chích',
      'Căng thẳng thần kinh, mệt mỏi, hồi hộp đánh trống ngực nhẹ, phụ nữ mang thai hay bị co cứng cơ'
    ],
    mechanismOfAction: 'Magie là chất chẹn kênh Calci tự nhiên giúp giãn sợi cơ vân và ổn định dẫn truyền thần kinh; Vitamin B6 làm tăng vận chuyển Magie vào tế bào.',
    standardDosage: 'Người lớn: 2 - 4 viên/ngày (hoặc ống uống 2-3 ống/ngày) chia 2 - 3 lần.',
    administration: 'Uống cùng 1 cốc nước lớn ngay trong bữa ăn.',
    contraindications: ['Suy thận nặng (CrCl < 30 ml/phút)', 'Đang dùng Levodopa đơn độc (B6 phá hủy Levodopa ngoại vi)'],
    cautions: ['Uống cách xa viên Canxi, Sắt và kháng sinh Tetracycline/Fluoroquinolone ít nhất 2 giờ; liều quá cao có thể gây phân lỏng nhẹ.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'Vidal Việt Nam']
  },
  {
    id: 'clotrimazole-topical',
    category: 'I',
    categoryName: 'I. Da Liễu, Mắt - Tai Mũi Họng & Vitamin Khoáng Chất',
    groupName: 'Kháng nấm đơn thuần ngoài da & Phụ khoa (Không chứa Corticoid)',
    activeIngredient: 'Clotrimazole 1% (Kem bôi) / 100mg - 500mg (Viên đặt)',
    commonBrandNames: ['Canesten 1% Cream', 'Canesten 500mg / 100mg Viên đặt', 'Candid'],
    indications: [
      'Nấm da thân (hắc lào), nấm bẹn, nấm kẽ chân (nước ăn chân), lang ben (bôi ngoài)',
      'Viêm âm đạo do nấm Candida albicans (khí hư vón cục như bã đậu, ngứa rát âm hộ)'
    ],
    mechanismOfAction: 'Ức chế tổng hợp Ergosterol màng tế bào nấm gây rò rỉ nội bào và tiêu diệt nấm tại chỗ mà không gây teo da như thuốc phối hợp Corticoid.',
    standardDosage: 'Kem bôi 1%: Bôi mỏng ngày 2 lần (tiếp tục bôi thêm 2 tuần sau khi sạch vết đỏ). Viên đặt phụ khoa: 500mg đặt 1 viên duy nhất buổi tối (hoặc 100mg x 6 đêm).',
    administration: 'Vệ sinh sạch và lau khô kỹ trước khi bôi/đặt sâu âm đạo trước khi đi ngủ.',
    contraindications: ['Quá mẫn Clotrimazole hoặc nhóm Imidazole'],
    cautions: ['Chế phẩm kem/đặt gốc dầu có thể làm giảm độ bền bao cao su Latex; tránh quan hệ trong thời gian đặt thuốc phụ khoa.'],
    referenceSources: ['CDC STI Guidelines', 'Dược thư Quốc gia Việt Nam']
  }
];

