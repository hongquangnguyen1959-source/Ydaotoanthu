import type { WesternDrug } from './westernDrugs';

export const EXTRA_ANTIBIOTICS_ANTI_INFLAMMATORIES: WesternDrug[] = [
  // =========================================================================
  // PHẦN 1: TẤT CẢ CÁC NHÓM THUỐC KHÁNG VIÊM (NHÓM A)
  // (Enzym kháng viêm, NSAIDs các thế hệ, Corticoid các nhóm & DMARDs/5-ASA)
  // =========================================================================
  {
    id: 'alpha-chymotrypsin',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Enzym kháng viêm, chống phù nề mô mềm & hậu phẫu',
    activeIngredient: 'Alpha-chymotrypsin (Chymotrypsin 4.2mg / 21 microkatal)',
    commonBrandNames: ['Alpha Choay', 'Alphachymotrypsin Choay', 'Chymotrypsin 4200 UI', 'Katrypsin'],
    indications: [
      'Kháng viêm, giảm phù nề, tụ máu sau chấn thương mô mềm (bong gân, bầm tím, gãy xương)',
      'Giảm sưng nề sau phẫu thuật, nhổ răng khôn, viêm họng, viêm xoang, viêm thanh quản cấp',
      'Hỗ trợ làm lỏng dịch tiết đường hô hấp trên trong viêm phế quản, viêm phổi, viêm tai giữa'
    ],
    mechanismOfAction: 'Enzym thủy phân protein giúp phân giải các sợi tơ huyết (Fibrin) và mảnh vụn hoại tử tại ổ viêm, làm giảm tính thấm thành mạch, tiêu dịch phù nề và cải thiện tuần hoàn vùng tổn thương.',
    standardDosage: 'Đường uống: 2 viên (8.4mg) x 3 - 4 lần/ngày. Ngậm dưới lưỡi: 4 - 6 viên/ngày chia đều nhiều lần (để tan từ từ dưới lưỡi không nhai).',
    administration: 'Uống nguyên viên với nhiều nước (ít nhất 240ml) giúp tăng hoạt tính enzym hoặc ngậm tan từ từ dưới lưỡi.',
    contraindications: [
      'Quá mẫn Alpha-chymotrypsin',
      'Bệnh nhân giảm Alpha-1 antitrypsin (người bị COPD nặng, khí phế thũng, hội chứng thận hư)',
      'Rối loạn đông máu di truyền (Hemophilia), chuẩn bị phẫu thuật lớn trong vòng 24-48h'
    ],
    cautions: ['Không dùng chung thuốc chống đông (Warfarin, Rivaroxaban) do tăng nhẹ nguy cơ chảy máu; rất êm dịu với dạ dày so với NSAID.'],
    brandVariants: [
      {
        variantName: 'Alphachymotrypsin Choay (Sanofi - Pháp)',
        manufacturer: 'Sanofi (Pháp)',
        ingredients: 'Chymotrypsin 21 microkatal (tương đương 4.2mg / 5000 đơn vị Armour)',
        specialEffect: 'Biệt dược gốc tiêu sưng giảm phù nề mô mềm, bầm tím và sưng nề răng hàm mặt phổ biến nhất tại Việt Nam.'
      }
    ],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'Vidal Việt Nam']
  },
  {
    id: 'serratiopeptidase',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Enzym kháng viêm, tiêu dịch mủ & giảm sưng',
    activeIngredient: 'Serratiopeptidase (Serrapeptase)',
    commonBrandNames: ['Danzen 5mg', 'Serratiopeptidase 10mg', 'Serpeptase'],
    indications: [
      'Giảm viêm sưng sau phẫu thuật, chấn thương, tụ máu',
      'Viêm xoang mạn, viêm họng, tắc tia sữa, hỗ trợ long đờm mủ đường hô hấp'
    ],
    mechanismOfAction: 'Enzym phân giải protein tách lọc mô chết và các chất trung gian gây viêm (Bradykinin), làm loãng dịch tiết nhầy mủ mà không làm tổn thương mô sống.',
    standardDosage: '10mg x 3 lần/ngày sau bữa ăn.',
    administration: 'Nuốt nguyên viên bao tan trong ruột (không nhai nghiền) sau ăn.',
    contraindications: ['Rối loạn đông máu, đang dùng thuốc chống đông/chống kết tập tiểu cầu'],
    cautions: ['Ngưng trước phẫu thuật ít nhất 2 tuần; hiếm gặp nổi ban dị ứng.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'MIMS']
  },
  {
    id: 'aceclofenac',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Kháng viêm NSAID nhóm Phenylacetic (Êm dạ dày hơn Diclofenac)',
    activeIngredient: 'Aceclofenac',
    commonBrandNames: ['Airtal 100mg', 'Hifenac 100mg', 'Zerodol', 'Aceclofenac Stada'],
    indications: [
      'Thoái hóa khớp gối/háng/cột sống, viêm khớp dạng thấp, viêm cột sống dính khớp',
      'Đau thắt lưng, đau vai gáy, đau răng, đau sau chấn thương'
    ],
    mechanismOfAction: 'Ức chế COX-2 ưu thế hơn COX-1 tại ổ khớp viêm, ức chế tổng hợp PGE2 và kích thích tổng hợp Glycosaminoglycan của tế bào sụn khớp.',
    standardDosage: '100mg x 2 lần/ngày (sáng - tối).',
    administration: 'Uống nguyên viên với nước trong hoặc ngay sau bữa ăn.',
    contraindications: ['Loét/xuất huyết dạ dày tá tràng tiến triển', 'Suy tim nặng, bệnh mạch vành, suy gan/thận nặng', 'Phụ nữ mang thai 3 tháng cuối'],
    cautions: ['Dung nạp đường tiêu hóa tốt hơn Diclofenac cổ điển nhưng vẫn cần thận trọng ở người có tiền sử đau dạ dày hoặc bệnh tim mạch.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'MIMS Việt Nam']
  },
  {
    id: 'ketoprofen',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Kháng viêm NSAID dẫn xuất Propionic (Viên uống & Gel bôi)',
    activeIngredient: 'Ketoprofen',
    commonBrandNames: ['Profenid 100mg / LP 200mg', 'Fastum Gel 2.5%', 'Ketoprofen 50mg'],
    indications: [
      'Viêm khớp dạng thấp, thoái hóa khớp, viêm cột sống dính khớp, đau thần kinh tọa',
      'Đau cơ gân khớp cấp do chấn thương thể thao (Fastum Gel bôi tại chỗ)'
    ],
    mechanismOfAction: 'Ức chế mạnh tổng hợp Prostaglandin (COX-1/COX-2) và ức chế đường Lipoxygenase, ổn định màng tiêu thể tại ổ viêm khớp.',
    standardDosage: 'Uống: 50mg - 100mg x 2 lần/ngày (hoặc viên LP 200mg x 1 lần/ngày); Gel 2.5%: bôi 2-3 lần/ngày.',
    administration: 'Viên uống dùng ngay trong bữa ăn; dạng gel bôi tránh phơi nắng trực tiếp lên vùng da vừa bôi trong suốt thời gian điều trị và 2 tuần sau đó.',
    contraindications: ['Loét dạ dày tá tràng tiến triển', 'Tiền sử dị ứng ánh sáng khi bôi Ketoprofen/Fenofibrate', 'Suy gan/thận/tim nặng, thai kỳ 3 tháng cuối'],
    cautions: ['Không băng kín vùng bôi Fastum Gel và rửa sạch tay sau khi thoa.'],
    referenceSources: ['Vidal Việt Nam', 'BNF']
  },
  {
    id: 'dexketoprofen',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Kháng viêm giảm đau NSAID đồng phân tinh khiết tác dụng nhanh',
    activeIngredient: 'Dexketoprofen trometamol',
    commonBrandNames: ['Enantyum 25mg', 'Dexketoprofen 25mg', 'Keral'],
    indications: ['Giảm đau cấp tính mức độ nhẹ đến trung bình: đau cơ xương khớp cấp, đau bụng kinh, đau răng, đau sau tiểu phẫu'],
    mechanismOfAction: 'Đồng phân S-(+) có hoạt tính duy nhất của Ketoprofen, muối Trometamol tan cực nhanh giúp đạt đỉnh giảm đau sau 30 phút với liều chỉ bằng một nửa Ketoprofen.',
    standardDosage: '12.5mg mỗi 4-6 giờ hoặc 25mg mỗi 8 giờ (tối đa 75mg/ngày, chỉ dùng ngắn hạn).',
    administration: 'Khi đau cấp dữ dội có thể uống trước bữa ăn 30 phút để hấp thu tức thì; người nhạy cảm dạ dày uống sau ăn.',
    contraindications: ['Loét dạ dày tá tràng tiến triển, suy tim nặng, suy thận trung bình - nặng, phụ nữ có thai 3 tháng cuối'],
    cautions: ['Chỉ dùng điều trị đợt đau cấp (không dùng dài ngày).'],
    referenceSources: ['BNF', 'MIMS Việt Nam']
  },
  {
    id: 'ketorolac',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'NSAID giảm đau cực mạnh ngắn hạn (Thay thế Opioid sau mổ)',
    activeIngredient: 'Ketorolac tromethamine',
    commonBrandNames: ['Toradol 10mg / 30mg tiêm', 'Ketorolac 10mg', 'Acular (nhỏ mắt kháng viêm)'],
    indications: [
      'Điều trị ngắn hạn cơn đau cấp từ trung bình đến nặng sau phẫu thuật, cơn đau quặn thận, chấn thương chỉnh hình',
      'Dung dịch nhỏ mắt (Acular) chống viêm sau mổ đục thủy tinh thể và ngứa mắt dị ứng'
    ],
    mechanismOfAction: 'Ức chế cực mạnh COX-1 và COX-2 tạo hiệu lực giảm đau ngoại vi tương đương Morphin liều nhẹ nhưng không gây nghiện hay ức chế hô hấp.',
    standardDosage: 'Uống: 10mg mỗi 4 - 6 giờ (tối đa 40mg/ngày). Tiêm bắp/tĩnh mạch: 30mg mỗi 6 giờ. TỔNG THỜI GIAN DÙNG KHÔNG QUÁ 5 NGÀY.',
    administration: 'Uống sau ăn no; tuân thủ nghiêm ngặt giới hạn tối đa 5 ngày.',
    contraindications: [
      'Tiền sử loét/thủng dạ dày, đang xuất huyết hoặc nghi ngờ xuất huyết não',
      'Suy thận trung bình - nặng, giảm thể tích tuần hoàn, đang dùng NSAID khác hoặc Aspirin',
      'Phụ nữ có thai, chuyển dạ sinh con (gây chảy máu nặng) và cho con bú'
    ],
    cautions: ['CẢNH BÁO: Nguy cơ xuất huyết tiêu hóa và suy thận cấp tăng rất cao nếu dùng vượt quá 5 ngày.'],
    referenceSources: ['FDA Boxed Warning', 'Goodman & Gilman’s', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'piroxicam',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Kháng viêm NSAID nhóm Oxicam tác dụng kéo dài',
    activeIngredient: 'Piroxicam',
    commonBrandNames: ['Feldene 20mg', 'Brexin 20mg', 'Piroxicam 20mg', 'Feldene Gel 0.5%'],
    indications: [
      'Viêm khớp dạng thấp, thoái hóa khớp, viêm cột sống dính khớp (hàng thứ hai khi các NSAID khác không đáp ứng)',
      'Gel bôi giảm đau viêm gân, bong gân tại chỗ'
    ],
    mechanismOfAction: 'Ức chế COX và ức chế di chuyển bạch cầu đa nhân trung tính vào dịch khớp, thời gian bán thải rất dài (~50 giờ).',
    standardDosage: 'Tối đa 20mg x 1 lần/ngày (đợt cấp ngắn hạn <= 14 ngày nếu có thể).',
    administration: 'Uống ngay sau bữa ăn no với nhiều nước.',
    contraindications: ['Tiền sử loét/xuất huyết tiêu hóa, tiền sử phản ứng da nặng (SJS/TEN), suy tim/gan/thận nặng, dùng chung thuốc chống đông'],
    cautions: ['Tỷ lệ kích ứng dạ dày cao hơn Celecoxib/Meloxicam -> bắt buộc phối hợp PPI ở người > 65 tuổi hoặc có yếu tố nguy cơ.'],
    referenceSources: ['EMA Safety Review', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'tenoxicam',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Kháng viêm NSAID nhóm Oxicam (Viêm khớp & Viêm gân)',
    activeIngredient: 'Tenoxicam',
    commonBrandNames: ['Tilcotil 20mg', 'Tenoxicam 20mg', 'Tenoksan'],
    indications: ['Viêm khớp dạng thấp, thoái hóa khớp, viêm quanh khớp vai, viêm gân, Gout cấp'],
    mechanismOfAction: 'Ức chế tổng hợp Prostaglandin và giảm tích tụ bạch cầu tại ổ khớp viêm, thời gian bán thải 60-72 giờ.',
    standardDosage: '20mg x 1 lần/ngày vào cùng một giờ mỗi ngày.',
    administration: 'Uống trong hoặc ngay sau bữa ăn.',
    contraindications: ['Loét dạ dày tá tràng tiến triển, suy gan/thận nặng, suy tim nặng, 3 tháng cuối thai kỳ'],
    cautions: ['Dùng liều thấp nhất trong thời gian ngắn nhất có thể; kết hợp PPI nếu dùng trên 1 tuần.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'Vidal']
  },
  {
    id: 'lornoxicam',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Kháng viêm NSAID nhóm Oxicam thế hệ mới (Thải trừ nhanh)',
    activeIngredient: 'Lornoxicam',
    commonBrandNames: ['Xefo 8mg', 'Xefo Rapid 8mg', 'Lornoxicam 8mg'],
    indications: ['Đau cấp tính từ nhẹ đến trung bình (đau lưng, đau thần kinh tọa, đau sau nhổ răng/phẫu thuật)', 'Viêm khớp dạng thấp, thoái hóa khớp'],
    mechanismOfAction: 'Ức chế cân bằng COX-1 và COX-2 cực mạnh nhưng thời gian bán thải ngắn (3-4 giờ), giúp giảm tích lũy độc tính ở dạ dày và thận so với Oxicam cổ điển.',
    standardDosage: '8mg - 16mg/ngày chia 2 lần (tối đa 16mg/ngày).',
    administration: 'Uống trước bữa ăn (dạng Rapid) khi cần giảm đau nhanh hoặc sau ăn để bảo vệ dạ dày.',
    contraindications: ['Loét dạ dày tá tràng, giảm tiểu cầu, suy tim nặng, suy gan/thận nặng, thai kỳ 3 tháng cuối'],
    cautions: ['Thận trọng ở người cao tuổi hoặc đang dùng thuốc lợi tiểu/ACEi.'],
    referenceSources: ['Vidal Việt Nam', 'MIMS']
  },
  {
    id: 'indomethacin',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Kháng viêm NSAID cổ điển mạnh (Gout cấp & Viêm cột sống dính khớp)',
    activeIngredient: 'Indomethacin',
    commonBrandNames: ['Indocin 25mg', 'Indomethacin 25mg', 'Indocid (viên đặt hậu môn)'],
    indications: [
      'Cơn Gout cấp tính nặng, viêm cột sống dính khớp, viêm khớp vảy nến',
      'Đau đầu kịch phát nửa đầu mạn tính (Paroxysmal hemicrania)'
    ],
    mechanismOfAction: 'Ức chế rất mạnh COX và ức chế khả năng thực bào tinh thể Urat của bạch cầu trung tính.',
    standardDosage: 'Gout cấp: 25mg - 50mg x 3 lần/ngày trong vài ngày cho tới khi giảm đau rồi ngưng ngay.',
    administration: 'Uống ngay trong hoặc sau bữa ăn no (kèm PPI bảo vệ dạ dày).',
    contraindications: ['Loét dạ dày tá tràng, rối loạn tâm thần/động kinh nặng, suy tim/thận nặng, phụ nữ có thai'],
    cautions: ['Hay gây đau đầu vùng trán, chóng mặt và kích ứng dạ dày mạnh -> hiện ưu tiên Etoricoxib/Colchicine nếu có sẵn.'],
    referenceSources: ['ACR Gout Guidelines', 'Goodman & Gilman’s']
  },
  {
    id: 'mefenamic-acid',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Kháng viêm giảm đau chuyên biệt Đau Bụng Kinh & Đau Răng',
    activeIngredient: 'Mefenamic acid',
    commonBrandNames: ['Ponstan 500mg', 'Dolfenal 500mg', 'Mefenamic 250mg / 500mg'],
    indications: [
      'Đau bụng kinh nguyên phát, cường kinh (giảm lượng máu kinh nhờ ức chế PGF2-alpha tử cung)',
      'Đau răng, đau đầu, đau cơ khớp nhẹ đến trung bình ngắn hạn (<= 7 ngày)'
    ],
    mechanismOfAction: 'Ức chế enzym Cyclooxygenase VÀ đối kháng trực tiếp tại thụ thể Prostaglandin trên cơ trơn tử cung, cắt co thắt tử cung.',
    standardDosage: 'Người lớn & trẻ >= 14 tuổi: 500mg x 3 lần/ngày trong 2-3 ngày hành kinh (tối đa 7 ngày).',
    administration: 'Uống ngay trong hoặc sau bữa ăn.',
    contraindications: ['Loét dạ dày tá tràng, bệnh viêm ruột (Crohn/viêm loét đại tràng), suy thận/gan/tim nặng, thai kỳ'],
    cautions: ['Ngưng thuốc ngay nếu xuất hiện tiêu chảy hoặc nổi mẩn đỏ khi đang uống.'],
    referenceSources: ['BNF', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'diacerein',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Kháng viêm tác dụng chậm đặc hiệu Thoái Hóa Khớp (Ức chế IL-1beta)',
    activeIngredient: 'Diacerein',
    commonBrandNames: ['Artrodar 50mg', 'Diacerein 50mg', 'Diacerin Stella'],
    indications: ['Điều trị triệu chứng thoái hóa khớp gối, khớp háng tiến triển chậm (không hại dạ dày như NSAID)'],
    mechanismOfAction: 'Ức chế tổng hợp và hoạt tính Cytokine tiền viêm Interleukin-1 beta (IL-1b) — tác nhân chính gây phá hủy sụn khớp và viêm màng hoạt dịch.',
    standardDosage: 'Khởi đầu 50mg x 1 lần/ngày vào bữa tối trong 2-4 tuần đầu, sau đó tăng lên 50mg x 2 lần/ngày (sáng - tối).',
    administration: 'Uống nguyên viên ngay trong bữa ăn chính.',
    contraindications: [
      'Bệnh nhân >= 65 tuổi (khuyến cáo mới tránh tiêu chảy mất nước), tiền sử bệnh gan, bệnh viêm ruột tắc ruột',
      'Phụ nữ có thai và cho con bú'
    ],
    cautions: ['Thường làm nước tiểu sậm màu vàng nâu (bình thường); có thể gây phân lỏng nhẹ trong 2 tuần đầu nên phải bắt đầu 1 viên/ngày; kiểm tra men gan định kỳ.'],
    referenceSources: ['EMA Pharmacovigilance Review', 'ESCEO Guidelines']
  },
  {
    id: 'hydrocortisone',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Corticoid tự nhiên tác dụng ngắn (Suy thượng thận & Dị ứng da)',
    activeIngredient: 'Hydrocortisone (uống / tiêm / kem bôi 1%)',
    commonBrandNames: ['Hydrocortison 10mg', 'Solu-Cortef 100mg tiêm', 'Hydrocortisone Cream 1% (Eumovate/Fucidin-H)'],
    indications: [
      'Liệu pháp thay thế sinh lý trong suy vỏ thượng thận mạn/cấp (bệnh Addison, suy tuyến yên)',
      'Sốc phản vệ, cơn hen ác tính nặng (tiêm tĩnh mạch)',
      'Kem bôi 1% dịu nhẹ trị chàm (Eczema), hăm tã, viêm da cơ địa ở mặt và trẻ em'
    ],
    mechanismOfAction: 'Glucocorticoid nội sinh chuẩn (Cortisol) có hoạt lực kháng viêm nhẹ và giữ muối nước nhẹ, thời gian tác dụng 8-12 giờ.',
    standardDosage: 'Thay thế suy thượng thận: 15-25mg/ngày chia 2-3 lần (liều lớn nhất buổi sáng); Kem 1%: bôi mỏng 1-2 lần/ngày <= 7 ngày.',
    administration: 'Uống sau bữa ăn sáng/trưa; không bôi kem lên vùng da nhiễm trùng/nấm chưa điều trị.',
    contraindications: ['Nhiễm nấm toàn thân chưa kiểm soát', 'Vết thương da do virus (Herpes, thủy đậu) đối với dạng bôi'],
    cautions: ['Bệnh nhân suy thượng thận dùng Hydrocortisone phải tăng gấp 2-3 lần liều khi bị sốt cao, nhiễm trùng nặng hoặc phẫu thuật ("Quy tắc ngày ốm").'],
    referenceSources: ['Endocrine Society Adrenal Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'betamethasone',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Corticoid tổng hợp tác dụng kéo dài (Khớp, Dị ứng & Sản khoa)',
    activeIngredient: 'Betamethasone (đường uống / tiêm khớp / kem bôi)',
    commonBrandNames: ['Celestone 0.5mg', 'Diprospan ống tiêm 7mg/ml', 'Diprosone 0.05% kem bôi'],
    indications: [
      'Viêm khớp, viêm quanh gân, hội chứng ống cổ tay (tiêm tại chỗ Diprospan theo chỉ định chuyên khoa)',
      'Dị ứng nặng, viêm da cơ địa kháng trị, bệnh tự miễn',
      'Tiêm bắp cho mẹ dọa sinh non (24-34 tuần) giúp trưởng thành phổi thai nhi'
    ],
    mechanismOfAction: 'Glucocorticoid cực mạnh (gấp ~25-30 lần Hydrocortisone), hầu như không giữ Natri, thời gian tác dụng sinh học kéo dài 36-54 giờ.',
    standardDosage: 'Đường uống: 0.5mg - 5mg/ngày tùy bệnh (giảm dần tới liều duy trì thấp nhất); Diprospan tiêm bắp/khớp 1ml mỗi 2-4 tuần do bác sĩ thực hiện.',
    administration: 'Uống vào buổi sáng sau ăn; kem bôi chỉ thoa lớp mỏng ngắn ngày.',
    contraindications: ['Nhiễm khuẩn/nhiễm nấm toàn thân chưa dùng kháng sinh đặc hiệu', 'Tuyệt đối không tiêm vào gân Achilles (nguy cơ đứt gân) hoặc khớp đang nhiễm trùng'],
    cautions: ['Tránh lạm dụng các thuốc tiêm kéo dài hoặc thuốc uống chứa Betamethasone không rõ nguồn gốc (gây hội chứng Cushing, mục xương, suy tuyến thượng thận, xuất huyết tiêu hóa).'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'Goodman & Gilman’s']
  },
  {
    id: 'triamcinolone',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Corticoid trung bình (Bôi nhiệt miệng, Tiêm sẹo lồi, Xịt mũi & Khớp)',
    activeIngredient: 'Triamcinolone acetonide',
    commonBrandNames: ['Orrepaste / Kenalog in Orabase 0.1% (bôi miệng)', 'Kenacort Retard 40mg', 'Nasacort AQ (xịt mũi)'],
    indications: [
      'Kem dính niêm mạc miệng (Orrepaste) điều trị nhiệt miệng (loét áp-tơ), viêm lợi, lichen phẳng khoang miệng',
      'Tiêm nội sẹo điều trị sẹo lồi, tiêm nội khớp viêm khớp vô khuẩn',
      'Xịt mũi trị viêm mũi dị ứng'
    ],
    mechanismOfAction: 'Kháng viêm Corticoid mạnh gấp 5 lần Hydrocortisone, kết hợp tá dược dính niêm mạc miệng tạo màng bảo vệ vết loét khỏi ma sát.',
    standardDosage: 'Bôi nhiệt miệng: chấm 1 lượng nhỏ bằng hạt đậu lên vết loét x 2-3 lần/ngày (tốt nhất sau ăn và trước khi đi ngủ).',
    administration: 'Khi bôi nhiệt miệng, KHÔNG xoa chà mạnh (chỉ chấm nhẹ để thuốc bám thành lớp màng nhầy) và không ăn uống trong 30 phút.',
    contraindications: ['Nhiễm nấm Candida khoang miệng, loét miệng do virus Herpes/lao', 'Khớp nhiễm trùng'],
    cautions: ['Không tiêm bắp Kenacort lặp lại nhiều lần do nguy cơ teo cơ, lõm da tại chỗ tiêm và suy thượng thận kéo dài.'],
    referenceSources: ['Vidal Việt Nam', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'deflazacort',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Corticoid thế hệ mới (Ít gây loãng xương & tăng đường huyết hơn)',
    activeIngredient: 'Deflazacort',
    commonBrandNames: ['Calcort 6mg', 'Deflazacort 6mg', 'Decort'],
    indications: [
      'Viêm khớp dạng thấp, bệnh tự miễn, hen phế quản, dị ứng nặng cần dùng Corticoid dài ngày',
      'Loạn dưỡng cơ Duchenne (FDA phê duyệt giúp bảo tồn sức cơ)'
    ],
    mechanismOfAction: 'Dẫn xuất Oxazoline của Prednisolone (6mg Deflazacort tương đương 5mg Prednisolone) nhưng ít gây mất Calci xương và ít làm tăng đường huyết hơn.',
    standardDosage: '6mg - 18mg/ngày uống buổi sáng (đợt cấp có thể cao hơn theo bác sĩ).',
    administration: 'Uống vào buổi sáng sau ăn no.',
    contraindications: ['Nhiễm khuẩn/nhiễm nấm toàn thân chưa điều trị, đang tiêm vaccin sống'],
    cautions: ['Vẫn cần giảm liều từ từ nếu uống trên 2 tuần và theo dõi nhãn áp nếu dùng kéo dài.'],
    referenceSources: ['BNF', 'MIMS Việt Nam']
  },
  {
    id: 'methotrexate',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Kháng viêm điều chỉnh bệnh khớp nền tảng (DMARD hàng đầu)',
    activeIngredient: 'Methotrexate (Liều thấp khớp học)',
    commonBrandNames: ['Methotrexate 2.5mg', 'Metoject bút tiêm', 'Trexall'],
    indications: [
      'Thuốc nền tảng số 1 điều trị Viêm khớp dạng thấp (RA), viêm khớp vảy nến, vảy nến thể mảng nặng, Lupus ban đỏ'
    ],
    mechanismOfAction: 'Ở liều thấp khớp học (7.5-25mg/tuần), Methotrexate làm tăng phóng thích Adenosine nội sinh kháng viêm mạnh và điều hòa đáp ứng tế bào lympho T/B tại màng hoạt dịch khớp.',
    standardDosage: 'QUY TẮC SỐNG CÒN: Chỉ uống/tiêm 1 LẦN DUY NHẤT MỖI TUẦN (thường 7.5mg - 20mg vào một ngày cố định trong tuần), TUYỆT ĐỐI KHÔNG UỐNG HÀNG NGÀY! Luôn uống kèm Acid Folic 5mg vào ngày khác trong tuần.',
    administration: 'Chọn cố định 1 ngày trong tuần (ví dụ: mỗi Chủ Nhật); uống Acid Folic sau đó 24-48 giờ.',
    contraindications: ['PHỤ NỮ CÓ THAI & CHO CON BÚ (cấm tuyệt đối vì gây sảy thai và dị tật nặng)', 'Suy gan/xơ gan, suy thận nặng (eGFR < 30), giảm bạch cầu/tiểu cầu nặng'],
    cautions: ['CẢNH BÁO AN TOÀN QUAN TRỌNG: Uống nhầm hàng ngày thay vì hàng tuần gây ngộ độc tủy xương tử vong. Theo dõi men gan AST/ALT và công thức máu mỗi 1-3 tháng; kiêng rượu bia tuyệt đối.'],
    referenceSources: ['EULAR / ACR Rheumatoid Arthritis Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'sulfasalazine',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Kháng viêm ruột & Bệnh khớp cột sống (DMARD / 5-ASA)',
    activeIngredient: 'Sulfasalazine',
    commonBrandNames: ['Salazopyrin EN 500mg', 'Sulfasalazin 500mg'],
    indications: [
      'Viêm khớp dạng thấp, viêm cột sống dính khớp thể ngoại biên (khớp gối/cổ chân)',
      'Viêm loét đại tràng chảy máu và bệnh Crohn thể nhẹ - vừa'
    ],
    mechanismOfAction: 'Vi khuẩn đại tràng cắt thành Sulfapyridine (điều hòa miễn dịch khớp) và Mesalazine 5-ASA (kháng viêm trực tiếp niêm mạc đại tràng).',
    standardDosage: 'Khởi đầu 500mg/ngày, tăng dần mỗi tuần tới liều duy trì 1000mg x 2 lần/ngày.',
    administration: 'Nuốt nguyên viên bao tan trong ruột (Salazopyrin EN) sau bữa ăn với nhiều nước.',
    contraindications: ['Dị ứng Sulfonamide hoặc Salicylate (Aspirin)', 'Thiếu men G6PD, tắc ruột/tắc đường tiết niệu, trẻ < 2 tuổi'],
    cautions: ['Thuốc làm nước tiểu và kính áp tròng có màu vàng cam (vô hại); có thể làm giảm số lượng tinh trùng tạm thời ở nam giới (hồi phục sau khi ngưng).'],
    referenceSources: ['EULAR Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'mesalazine',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Kháng viêm niêm mạc ruột đặc hiệu (5-ASA — Không chứa Sulfa)',
    activeIngredient: 'Mesalazine (Mesalamine / 5-Aminosalicylic acid)',
    commonBrandNames: ['Pentasa 500mg / 1g / Gói 2g / Đạn đặt 1g', 'Salofalk 500mg', 'Asacol'],
    indications: [
      'Điều trị tấn công và duy trì lui bệnh trong Viêm loét đại tràng chảy máu (UC)',
      'Bệnh Crohn đại tràng thể nhẹ - trung bình'
    ],
    mechanismOfAction: 'Ức chế COX, Lipoxygenase và yếu tố NF-kappaB tại chỗ trực tiếp trên niêm mạc đại tràng - trực tràng, dập tắt ổ viêm loét ruột mà ít tác dụng phụ toàn thân.',
    standardDosage: 'Đợt cấp: 2g - 4g/ngày; Duy trì: 1.5g - 2g/ngày (kết hợp viên đặt hậu môn 1g nếu tổn thương vùng trực tràng).',
    administration: 'Nuốt nguyên viên hoặc đổ hạt vi nang Pentasa vào nước uống (không nhai nát hạt).',
    contraindications: ['Dị ứng Salicylate (Aspirin)', 'Suy gan hoặc suy thận nặng'],
    cautions: ['Kiểm tra chức năng thận (Creatinine, tổng phân tích nước tiểu) định kỳ 6-12 tháng một lần.'],
    referenceSources: ['ECCO Ulcerative Colitis Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'hydroxychloroquine',
    category: 'A',
    categoryName: 'A. Chứng Đau, Sốt, Viêm & Cơ Xương Khớp',
    groupName: 'Kháng viêm điều hòa miễn dịch (Lupus ban đỏ & Viêm khớp)',
    activeIngredient: 'Hydroxychloroquine sulfate',
    commonBrandNames: ['Plaquenil 200mg', 'HCQ 200mg'],
    indications: [
      'Thuốc nền tảng bắt buộc cho mọi bệnh nhân Lupus ban đỏ hệ thống (SLE) và Lupus da dạng đĩa',
      'Viêm khớp dạng thấp thể nhẹ, hội chứng Sjogren'
    ],
    mechanismOfAction: 'Kiềm hóa lysosome tế bào trình diện kháng nguyên, ức chế thụ thể TLR-7/9 ngăn giải phóng Interferon gây viêm tự miễn mà không gây suy giảm miễn dịch nặng.',
    standardDosage: '200mg - 400mg/ngày (tối đa <= 5 mg/kg cân nặng thực/ngày để bảo vệ võng mạc mắt).',
    administration: 'Uống ngay trong hoặc sau bữa ăn (hoặc với 1 ly sữa) để tránh xót dạ dày.',
    contraindications: ['Bệnh lý hoàng điểm võng mạc có sẵn', 'Quá mẫn dẫn xuất 4-Aminoquinoline'],
    cautions: ['Khám chuyên khoa Mắt (đo thị trường & chụp OCT hoàng điểm) lúc ban đầu và định kỳ hàng năm sau 5 năm điều trị để phòng độc tính võng mạc hiếm gặp.'],
    referenceSources: ['EULAR 2023 SLE Guidelines', 'Dược thư Quốc gia Việt Nam']
  },

  // =========================================================================
  // PHẦN 2: TẤT CẢ CÁC NHÓM THUỐC KHÁNG SINH (NHÓM D)
  // (Penicillin, Cephalosporin 1-4, Carbapenem, Macrolide, Aminoglycoside,
  //  Quinolon, Tetracycline, Glycopeptide, Linezolid, Nitrofurantoin, Rifaximin...)
  // =========================================================================
  {
    id: 'ampicillin-sulbactam',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh Penicillin + Ức chế Beta-lactamase (Đường tiêm & uống)',
    activeIngredient: 'Ampicillin + Sulbactam (hoặc Sultamicillin đường uống)',
    commonBrandNames: ['Unasyn 1.5g / 3g tiêm', 'Unasyn 375mg viên', 'Ampisul'],
    indications: [
      'Viêm phổi cộng đồng, áp xe phổi, nhiễm khuẩn ổ bụng và vùng chậu phụ khoa',
      'Nhiễm khuẩn da mô mềm do tụ cầu/liên cầu/kỵ khí, nhiễm khuẩn đường tiết niệu'
    ],
    mechanismOfAction: 'Ampicillin diệt khuẩn qua ức chế vách tế bào; Sulbactam bất hoạt enzym Beta-lactamase và có hoạt tính nội tại tiêu diệt *Acinetobacter baumannii* (khi dùng liều cao bệnh viện).',
    standardDosage: 'Đường tiêm: 1.5g - 3g mỗi 6 giờ. Đường uống (Sultamicillin): 375mg - 750mg x 2 lần/ngày.',
    administration: 'Viên uống dùng không phụ thuộc bữa ăn; dạng tiêm truyền tĩnh mạch chậm trong 15-30 phút.',
    contraindications: ['Dị ứng Penicillin hoặc tiền sử vàng da ứ mật do Ampicillin/Sulbactam'],
    cautions: ['Chỉnh liều ở suy thận (CrCl < 30 ml/phút); không dùng điều trị nhiễm trực khuẩn mủ xanh *Pseudomonas*.'],
    referenceSources: ['The Sanford Guide', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'oxacillin-cloxacillin',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Penicillin kháng Penicillinase (Đặc trị Tụ cầu vàng MSSA)',
    activeIngredient: 'Oxacillin / Cloxacillin',
    commonBrandNames: ['Oxacillin 500mg / 1g', 'Cloxacillin 500mg', 'Bristopen'],
    indications: [
      'Nhiễm khuẩn da mô mềm, nhọt cụm hậu bối, áp xe vú, viêm mô tế bào do Tụ cầu vàng nhạy Methicillin (MSSA)',
      'Viêm xương tủy xương, viêm nội tâm mạc, nhiễm khuẩn huyết do MSSA (dạng tiêm tĩnh mạch)'
    ],
    mechanismOfAction: 'Cấu trúc cồng kềnh bảo vệ vòng Beta-lactam khỏi bị enzym Penicillinase của Tụ cầu vàng phá hủy.',
    standardDosage: 'Đường uống (Cloxacillin/Oxacillin): 500mg x 4 lần/ngày (cách mỗi 6 giờ). Tiêm TM: 1g - 2g mỗi 4-6 giờ.',
    administration: 'Đường uống BẮT BUỘC uống lúc BỤNG ĐÓI (trước ăn 1 giờ hoặc sau ăn 2 giờ) với 1 ly nước đầy.',
    contraindications: ['Tiền sử dị ứng Penicillin'],
    cautions: ['Không có tác dụng với Tụ cầu vàng kháng Methicillin (MRSA — phải dùng Vancomycin/Linezolid).'],
    referenceSources: ['The Sanford Guide', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'piperacillin-tazobactam',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Penicillin phổ cực rộng bệnh viện (Diệt trực khuẩn mủ xanh Pseudomonas)',
    activeIngredient: 'Piperacillin + Tazobactam',
    commonBrandNames: ['Tazocin 4.5g', 'Piptaz 4.5g', 'Zosyn'],
    indications: [
      'Viêm phổi bệnh viện / viêm phổi thở máy, nhiễm khuẩn huyết, sốt giảm bạch cầu hạt',
      'Nhiễm khuẩn ổ bụng phức tạp (viêm phúc mạc, viêm đường mật nặng), nhiễm khuẩn bàn chân tiểu đường nặng'
    ],
    mechanismOfAction: 'Ureidopenicillin phổ cực rộng phủ *Pseudomonas aeruginosa*, vi khuẩn Gram âm đường ruột và vi khuẩn kỵ khí *Bacteroides*; Tazobactam bảo vệ khỏi nhiều Beta-lactamase.',
    standardDosage: 'Truyền tĩnh mạch 4.5g mỗi 6 - 8 giờ (truyền kéo dài 30 phút hoặc 3-4 giờ để tối ưu hiệu quả diệt khuẩn).',
    administration: 'Sử dụng đường truyền tĩnh mạch tại bệnh viện (không pha trộn chung ống truyền với Aminoglycoside hoặc Vancomycin nếu không kiểm tra tương hợp).',
    contraindications: ['Dị ứng Penicillin, Cephalosporin hoặc chất ức chế Beta-lactamase'],
    cautions: ['Lưu ý tăng nguy cơ tổn thương thận cấp (AKI) khi phối hợp với Vancomycin kéo dài -> cân nhắc Cefepime nếu cần phối hợp Vancomycin.'],
    referenceSources: ['IDSA Hospital Pneumonia Guidelines', 'The Sanford Guide']
  },
  {
    id: 'benzathine-penicillin',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Penicillin G tác dụng kéo dài & Penicillin V đường uống',
    activeIngredient: 'Benzathine Benzylpenicillin (hoặc Phenoxymethylpenicillin V)',
    commonBrandNames: ['Extencilline 1.2 MUI / 2.4 MUI', 'Ospen 1000 / 1500 (Penicillin V)'],
    indications: [
      'Điều trị chuẩn vàng bệnh Giang mai (Syphilis) mọi giai đoạn (tiêm bắp 2.4 MUI)',
      'Dự phòng thứ phát bệnh Thấp tim (viêm khớp, hở van tim do Liên cầu tan huyết beta nhóm A)',
      'Penicillin V uống trị viêm họng do Liên cầu A (tuyệt đối chưa kháng Penicillin)'
    ],
    mechanismOfAction: 'Gắn chặt PBPs ngăn tổng hợp vách vi khuẩn *Treponema pallidum* (xoắn khuẩn giang mai) và *Streptococcus pyogenes* với nồng độ duy trì liên tục 3-4 tuần sau 1 mũi tiêm bắp.',
    standardDosage: 'Giang mai sớm: 2.4 MUI tiêm bắp sâu 1 liều duy nhất; Phòng thấp tim: 1.2 MUI tiêm bắp sâu mỗi 3 - 4 tuần.',
    administration: 'Dạng tiêm bắp sâu (KHÔNG BAO GIỜ tiêm tĩnh mạch!); thử test lẩy da hoặc theo dõi sát phản vệ 30 phút sau tiêm.',
    contraindications: ['Tiền sử sốc phản vệ hoặc dị ứng Penicillin'],
    cautions: ['Trong điều trị Giang mai có thể xảy ra phản ứng Jarisch-Herxheimer thoáng qua (sốt nhẹ, rét run trong 24h đầu do xoắn khuẩn vỡ hàng loạt — điều trị hạ sốt nâng đỡ, không phải dị ứng thuốc).'],
    referenceSources: ['CDC STI Treatment Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'cefazolin',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Cephalosporin Thế hệ 1 đường tiêm (Chuẩn vàng dự phòng phẫu thuật)',
    activeIngredient: 'Cefazolin sodium',
    commonBrandNames: ['Cefazolin 1g', 'Kefzol 1g'],
    indications: [
      'Kháng sinh dự phòng nhiễm khuẩn vết mổ hàng đầu trong hầu hết các cuộc phẫu thuật sạch/sạch-nhiễm',
      'Nhiễm khuẩn da mô mềm, viêm mô tế bào, viêm nội tâm mạc hoặc nhiễm khuẩn huyết do tụ cầu MSSA & liên cầu'
    ],
    mechanismOfAction: 'Ức chế tổng hợp vách tế bào vi khuẩn Gram dương (đặc biệt MSSA, *Streptococcus*) và một số *E. coli, Klebsiella*.',
    standardDosage: 'Dự phòng mổ: tiêm tĩnh mạch 2g (3g nếu >= 120kg) trong vòng 30 - 60 phút trước khi rạch da. Điều trị: 1g - 2g mỗi 8 giờ.',
    administration: 'Tiêm tĩnh mạch chậm hoặc truyền ngắn 30 phút.',
    contraindications: ['Tiền sử sốc phản vệ với Cefazolin hoặc Cephalosporin'],
    cautions: ['Cấu trúc mạch nhánh R1 của Cefazolin hoàn toàn khác Penicillin nên ít dị ứng chéo với Penicillin nhất trong các Cephalosporin.'],
    referenceSources: ['ASHP Surgical Prophylaxis Guidelines', 'Sanford Guide']
  },
  {
    id: 'cefadroxil',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Cephalosporin Thế hệ 1 đường uống (Ngày chỉ 1-2 lần)',
    activeIngredient: 'Cefadroxil',
    commonBrandNames: ['Duricef 500mg', 'Cefadroxil 500mg', 'Oracefal'],
    indications: ['Viêm họng, viêm amidan do liên cầu, nhiễm khuẩn da mô mềm (nhọt, chốc), nhiễm khuẩn tiết niệu nhẹ'],
    mechanismOfAction: 'Ức chế tổng hợp vách tế bào vi khuẩn tương tự Cephalexin nhưng có thời gian bán thải dài hơn giúp giảm số lần uống.',
    standardDosage: '500mg - 1000mg x 2 lần/ngày (cách 12 giờ) hoặc 1000mg x 1 lần/ngày.',
    administration: 'Uống cùng hoặc xa bữa ăn đều hấp thu tốt.',
    contraindications: ['Dị ứng Cephalosporin'],
    cautions: ['Giảm số lần dùng nếu suy thận (CrCl < 50 ml/phút).'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'BNF']
  },
  {
    id: 'cefaclor',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Cephalosporin Thế hệ 2 đường uống phổ biến TMH & Nhi khoa',
    activeIngredient: 'Cefaclor',
    commonBrandNames: ['Ceclor 250mg / 500mg / 375mg MR', 'Ceclor gói cốm 125mg / 250mg', 'Cefaclor Stella'],
    indications: [
      'Viêm tai giữa cấp, viêm xoang cấp, viêm họng, viêm amidan',
      'Nhiễm khuẩn đường hô hấp dưới (viêm phế quản cấp/mạn), nhiễm khuẩn da nhẹ'
    ],
    mechanismOfAction: 'Ức chế tổng hợp vách tế bào vi khuẩn, có hoạt lực tốt trên *Haemophilus influenzae*, *Streptococcus pneumoniae* và *Moraxella catarrhalis*.',
    standardDosage: 'Người lớn: 250mg - 500mg x 3 lần/ngày (hoặc viên phóng thích kéo dài Ceclor MR 375mg - 750mg x 2 lần/ngày). Trẻ em: 20-40mg/kg/ngày chia 2-3 lần.',
    administration: 'Dạng thông thường uống lúc đói hoặc sau ăn; viên Ceclor MR uống trong hoặc sau bữa ăn (không nhai bẻ).',
    contraindications: ['Dị ứng Cephalosporin'],
    cautions: ['Hiếm gặp phản ứng giống bệnh huyết thanh (nổi ban, sưng đau khớp nhẹ) ở trẻ em dùng lặp lại nhiều đợt -> ngưng thuốc nếu xuất hiện.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'MIMS Việt Nam']
  },
  {
    id: 'cefdinir',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Cephalosporin Thế hệ 3 đường uống (Nhiễm khuẩn hô hấp & TMH)',
    activeIngredient: 'Cefdinir',
    commonBrandNames: ['Omnicef 300mg', 'Cefdinir 300mg / Gói 100mg / Hỗn dịch 125mg/5ml'],
    indications: [
      'Viêm xoang cấp, viêm tai giữa cấp, viêm họng tái phát, đợt cấp viêm phế quản mạn, viêm phổi cộng đồng nhẹ - vừa',
      'Nhiễm khuẩn da không biến chứng'
    ],
    mechanismOfAction: 'Cephalosporin thế hệ 3 phổ rộng bền vững với Beta-lactamase, phủ tốt cả Tụ cầu/Liên cầu và vi khuẩn Gram âm hô hấp (*H. influenzae*, *M. catarrhalis*).',
    standardDosage: 'Người lớn: 300mg x 2 lần/ngày (cách 12h) hoặc 600mg x 1 lần/ngày trong 5 - 10 ngày. Trẻ em: 14mg/kg/ngày.',
    administration: 'Uống không phụ thuộc bữa ăn; cách xa viên Sắt và Antacid chứa Nhôm/Magie tối thiểu 2 giờ.',
    contraindications: ['Quá mẫn Cephalosporin'],
    cautions: ['CHÚ Ý NHẬN BIẾT: Khi dùng chung chế phẩm/sữa giàu Sắt, Cefdinir tạo phức có thể làm phân có màu ĐỎ GỈ SẮT (hoàn toàn vô hại, KHÔNG phải chảy máu tiêu hóa).'],
    referenceSources: ['AAP Pediatric Infectious Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'ceftazidime',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Cephalosporin Thế hệ 3 diệt Trực khuẩn mủ xanh (Pseudomonas)',
    activeIngredient: 'Ceftazidime',
    commonBrandNames: ['Fortum 1g / 2g', 'Ceftazidim 1g', 'Zavicefta (phối hợp Avibactam)'],
    indications: [
      'Viêm phổi bệnh viện, nhiễm khuẩn huyết, viêm màng não, nhiễm khuẩn tiết niệu nặng do *Pseudomonas aeruginosa*',
      'Bệnh Melioidosis (Whitmore do *Burkholderia pseudomallei* — đặc hiệu giai đoạn tấn công tại Việt Nam!)'
    ],
    mechanismOfAction: 'Ái lực cao với PBP-3 của trực khuẩn Gram âm đặc biệt *Pseudomonas aeruginosa* và *Burkholderia*, thấm tốt qua hàng rào máu não.',
    standardDosage: 'Tiêm/truyền tĩnh mạch 1g - 2g mỗi 8 giờ (tối đa 6g/ngày trong viêm màng não / Whitmore).',
    administration: 'Đường tiêm truyền tại bệnh viện; điều chỉnh liều nghiêm ngặt theo mức lọc cầu thận eGFR.',
    contraindications: ['Quá mẫn Cephalosporin'],
    cautions: ['Hoạt lực trên cầu khuẩn Gram dương (tụ cầu/liên cầu) yếu hơn Ceftriaxone -> chỉ dùng khi nghi ngờ hoặc cấy ra *Pseudomonas* / Whitmore.'],
    referenceSources: ['Phác đồ Whitmore Bộ Y Tế', 'The Sanford Guide']
  },
  {
    id: 'cefoperazone-sulbactam',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Cephalosporin Thế hệ 3 + Sulbactam (Ổ bụng, Đường mật & Phổi)',
    activeIngredient: 'Cefoperazone + Sulbactam',
    commonBrandNames: ['Sulperazon 1g / 2g', 'Cefoperazon/Sulbactam 1g/1g'],
    indications: [
      'Viêm đường mật, viêm túi mật, viêm phúc mạc, nhiễm khuẩn ổ bụng (thải trừ mạnh qua mật)',
      'Viêm phổi bệnh viện, nhiễm khuẩn huyết, nhiễm khuẩn tiết niệu hoặc phụ khoa nặng'
    ],
    mechanismOfAction: 'Cefoperazone phủ rộng Gram âm kể cả *Pseudomonas*; Sulbactam ức chế Beta-lactamase mở rộng phổ sang vi khuẩn kháng thuốc và *Acinetobacter*.',
    standardDosage: 'Truyền tĩnh mạch 2g - 4g/ngày (tổng hợp chất) chia 2 lần mỗi 12 giờ; trường hợp nặng có thể lên tới 8g/ngày.',
    administration: 'Truyền tĩnh mạch ngắt quãng tại cơ sở y tế.',
    contraindications: ['Dị ứng Penicillin/Cephalosporin/Sulbactam'],
    cautions: ['CẢNH BÁO: Gây hiệu ứng giống Disulfiram (đỏ mặt, nôn ói, tụt áp) nếu uống rượu bia trong vòng 72 giờ và dễ gây giảm Prothrombin (bổ sung Vitamin K nếu ăn kém hoặc có bệnh gan).'],
    referenceSources: ['The Sanford Guide', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'cefotaxime',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Cephalosporin Thế hệ 3 tiêm (An toàn cho Trẻ sơ sinh & Viêm màng não)',
    activeIngredient: 'Cefotaxime sodium',
    commonBrandNames: ['Claforan 1g', 'Cefotaxim 1g'],
    indications: [
      'Viêm màng não mủ, nhiễm khuẩn huyết ở trẻ sơ sinh (KHÔNG gây vàng da nhân như Ceftriaxone)',
      'Viêm phổi nặng, nhiễm khuẩn tiết niệu, viêm nắp thanh quản, nhiễm khuẩn sản khoa'
    ],
    mechanismOfAction: 'Ức chế tổng hợp vách vi khuẩn Gram âm/Gram dương, qua hàng rào máu não tốt khi màng não bị viêm và không tranh chấp gắn Bilirubin trên Albumin.',
    standardDosage: 'Người lớn: 1g - 2g mỗi 6 - 8 giờ tiêm bắp hoặc truyền tĩnh mạch.',
    administration: 'Tiêm/truyền tĩnh mạch tại bệnh viện (ưu tiên dùng thay Ceftriaxone ở trẻ sơ sinh < 28 ngày tuổi hoặc khi cần truyền cùng dung dịch có Calci).',
    contraindications: ['Quá mẫn Cephalosporin'],
    cautions: ['Thải trừ qua thận nên cần giảm liều khi eGFR < 20 ml/phút.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'Red Book AAP']
  },
  {
    id: 'cefepime',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Cephalosporin Thế hệ 4 (Phổ cực rộng Gram âm & Pseudomonas)',
    activeIngredient: 'Cefepime HCl',
    commonBrandNames: ['Maxipime 1g / 2g', 'Cefepim Kabi 1g'],
    indications: [
      'Sốt giảm bạch cầu hạt (lựa chọn hàng đầu theo IDSA)',
      'Viêm phổi bệnh viện, nhiễm khuẩn tiết niệu biến chứng, nhiễm khuẩn huyết do *Pseudomonas* hoặc trực khuẩn Gram âm tiết men AmpC (*Enterobacter*, *Serratia*)'
    ],
    mechanismOfAction: 'Cấu trúc lưỡng cực giúp xuyên nhanh màng ngoài vi khuẩn Gram âm và bền vững trước cả enzym AmpC lẫn một số Beta-lactamase, giữ nguyên hoạt lực mạnh trên cầu khuẩn Gram dương.',
    standardDosage: 'Truyền tĩnh mạch 1g - 2g mỗi 8 - 12 giờ.',
    administration: 'Truyền tĩnh mạch trong 30 phút (hoặc truyền kéo dài 3 giờ); bắt buộc chỉnh liều ở bệnh nhân suy thận.',
    contraindications: ['Dị ứng Cephalosporin hoặc L-Arginine'],
    cautions: ['Nếu không chỉnh liều ở người suy thận có thể gây độc thần kinh (lú lẫn, rung giật cơ, trạng thái động kinh không co giật).'],
    referenceSources: ['IDSA AMR Guidance', 'The Sanford Guide']
  },
  {
    id: 'meropenem',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh Carbapenem dự trữ mạnh (Vi khuẩn đa kháng ESBL / AmpC)',
    activeIngredient: 'Meropenem',
    commonBrandNames: ['Meronem 500mg / 1g', 'Meropenem Kabi 1g'],
    indications: [
      'Lựa chọn ưu tiên hàng đầu cho nhiễm khuẩn nặng do vi khuẩn Gram âm tiết men ESBL (kháng hầu hết Cephalosporin)',
      'Viêm màng não bệnh viện, sốc nhiễm khuẩn, viêm phúc mạc nặng, viêm phổi thở máy'
    ],
    mechanismOfAction: 'Kháng sinh nhóm Carbapenem bền vững tuyệt đối trước hầu hết mọi Beta-lactamase (kể cả ESBL & AmpC), diệt nhanh vi khuẩn Gram dương, Gram âm (kể cả *Pseudomonas*) và kỵ khí.',
    standardDosage: 'Truyền tĩnh mạch 1g mỗi 8 giờ (viêm màng não: 2g mỗi 8 giờ).',
    administration: 'Truyền tĩnh mạch tại bệnh viện (15-30 phút hoặc truyền kéo dài 3 giờ trong hồi sức ICU).',
    contraindications: ['Quá mẫn Carbapenem hoặc sốc phản vệ nặng với Beta-lactam'],
    cautions: ['TƯƠNG TÁC QUAN TRỌNG: Làm tụt nồng độ Valproic acid (Depakine) trong máu xuống 60-90% gây bùng phát cơn co giật -> tránh phối hợp nếu có thể.'],
    referenceSources: ['IDSA AMR Treatment Guidance', 'The Sanford Guide']
  },
  {
    id: 'imipenem-cilastatin',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh Carbapenem phổ rộng (Nhiễm khuẩn đa kháng nặng)',
    activeIngredient: 'Imipenem + Cilastatin',
    commonBrandNames: ['Tienam 500mg/500mg', 'Imipenem/Cilastatin Kabi'],
    indications: [
      'Nhiễm khuẩn nặng đa kháng tại bệnh viện: ổ bụng, hô hấp dưới, tiết niệu, phụ khoa, xương khớp, nhiễm khuẩn huyết'
    ],
    mechanismOfAction: 'Imipenem diệt khuẩn phổ rất rộng; Cilastatin ức chế enzym DHP-1 ở ống thận ngăn Imipenem bị phân hủy tạo chất độc thận.',
    standardDosage: 'Truyền tĩnh mạch 500mg mỗi 6 giờ (hoặc 1g mỗi 8 giờ ở nhiễm khuẩn nặng còn nhạy).',
    administration: 'Truyền tĩnh mạch chậm 30 - 60 phút tại bệnh viện; KHÔNG dùng điều trị viêm màng não (ưu tiên Meropenem).',
    contraindications: ['Quá mẫn Imipenem/Cilastatin', 'Thận trọng tối đa ở bệnh nhân có tổn thương não/tiền sử động kinh'],
    cautions: ['Nguy cơ gây co giật cao hơn Meropenem nếu truyền quá nhanh hoặc không giảm liều ở bệnh nhân suy thận; tránh dùng chung Valproic acid.'],
    referenceSources: ['The Sanford Guide', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'ertapenem',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Carbapenem tác dụng kéo dài (Ngày tiêm 1 lần — Không phủ Pseudomonas)',
    activeIngredient: 'Ertapenem sodium',
    commonBrandNames: ['Invanz 1g'],
    indications: [
      'Nhiễm khuẩn tiết niệu phức tạp, ổ bụng, bàn chân tiểu đường hoặc viêm phổi do vi khuẩn đường ruột tiết ESBL (*E. coli*, *Klebsiella*) không kèm nhiễm *Pseudomonas*'
    ],
    mechanismOfAction: 'Carbapenem gắn protein huyết tương cao kéo dài thời gian bán thải cho phép dùng 1 lần/ngày, giúp bảo tồn Meropenem/Imipenem cho *Pseudomonas*.',
    standardDosage: '1g x 1 lần duy nhất mỗi ngày (truyền tĩnh mạch 30 phút hoặc tiêm bắp).',
    administration: 'Điều chỉnh còn 500mg/ngày nếu CrCl <= 30 ml/phút.',
    contraindications: ['Quá mẫn Carbapenem hoặc Lidocain (nếu pha tiêm bắp với Lidocain)'],
    cautions: ['KHÔNG có tác dụng trên *Pseudomonas aeruginosa* và *Acinetobacter*; tránh dùng cùng Valproic acid.'],
    referenceSources: ['IDSA AMR Guidance', 'The Sanford Guide']
  },
  {
    id: 'spiramycin-rodogyl',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh Macrolide đặc hiệu Răng Hàm Mặt & Thai kỳ (Rovamycine / Rodogyl)',
    activeIngredient: 'Spiramycin (đơn độc hoặc phối hợp Metronidazole)',
    commonBrandNames: ['Rovamycine 3 MUI / 1.5 MUI', 'Rodogyl (Spiramycin 750.000 UI + Metronidazole 125mg)', 'Birodogyl'],
    indications: [
      'Rovamycine: Viêm họng, viêm amidan, viêm xoang; đặc biệt ĐẦU TAY phòng lây truyền ký sinh trùng *Toxoplasma* từ mẹ sang con ở phụ nữ mang thai',
      'Rodogyl / Birodogyl: Điều trị chuẩn các nhiễm khuẩn răng miệng cấp/mạn (áp xe răng, viêm lợi, viêm nha chu, viêm tuyến nước bọt)'
    ],
    mechanismOfAction: 'Spiramycin đạt nồng độ cực cao trong mô tuyến nước bọt, nướu răng và nhau thai (tác dụng kìm/diệt khuẩn tại chỗ); khi phối hợp Metronidazole trong Rodogyl tạo hiệp đồng diệt cả vi khuẩn hiếu khí lẫn kỵ khí khoang miệng.',
    standardDosage: 'Rovamycine 3 MUI: 1 viên x 2 - 3 lần/ngày. Rodogyl: 2 viên x 2 - 3 lần/ngày (tối đa 6 viên/ngày); Birodogyl hàm lượng gấp đôi: 1 viên x 2-3 lần/ngày.',
    administration: 'Uống trong hoặc ngay sau bữa ăn với nhiều nước.',
    contraindications: ['Quá mẫn Spiramycin hoặc Imidazole (với Rodogyl)', 'Trẻ em < 6 tuổi (đối với viên Rodogyl); kiêng rượu tuyệt đối khi dùng Rodogyl'],
    cautions: ['Rất ít tương tác gan CYP3A4 hơn Erythromycin/Clarithromycin; Rodogyl có chứa Metronidazole nên có thể gây vị kim loại nhẹ và cấm uống rượu bia.'],
    brandVariants: [
      {
        variantName: 'Rodogyl / Birodogyl (Sanofi - Pháp)',
        manufacturer: 'Sanofi (Pháp)',
        ingredients: 'Rodogyl: Spiramycin 0.75 MUI + Metronidazole 125mg (Birodogyl: gấp đôi hàm lượng)',
        specialEffect: 'Phác đồ phối hợp kinh điển số 1 tại nha khoa Việt Nam cho đau nhức sưng nướu, áp xe chân răng và sau nhổ răng khôn.'
      }
    ],
    referenceSources: ['Vidal Việt Nam', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'roxithromycin',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh Macrolide hô hấp trên & sinh dục',
    activeIngredient: 'Roxithromycin',
    commonBrandNames: ['Rulid 150mg', 'Roxithromycin 150mg'],
    indications: ['Viêm họng, viêm xoang, viêm phế quản, viêm phổi không điển hình, nhiễm Chlamydia sinh dục'],
    mechanismOfAction: 'Gắn 50S ribosom vi khuẩn ngăn tổng hợp protein tương tự Erythromycin nhưng hấp thu ổn định hơn và ít đau bụng hơn.',
    standardDosage: 'Người lớn: 150mg x 2 lần/ngày (sáng - tối) hoặc 300mg x 1 lần/ngày.',
    administration: 'Uống TRƯỚC bữa ăn 15 - 30 phút để đạt hấp thu tối ưu.',
    contraindications: ['Dùng đồng thời dẫn xuất Ergotamine (thuốc trị Migraine mạch máu)', 'Suy gan nặng'],
    cautions: ['Giảm nửa liều ở người suy gan nặng.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'MIMS']
  },
  {
    id: 'tetracycline',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh Tetracycline cổ điển (Phác đồ 4 thuốc diệt H. pylori)',
    activeIngredient: 'Tetracycline HCl',
    commonBrandNames: ['Tetracyclin 500mg', 'Pylera (phối hợp Bismuth + Metronidazole)'],
    indications: [
      'Thành phần BẮT BUỘC trong phác đồ 4 thuốc có Bismuth tiệt trừ vi khuẩn dạ dày *H. pylori* kháng Clarithromycin tại Việt Nam',
      'Bệnh tả, dịch hạch, đau mắt hột (dạng mỡ tra mắt 1%), trứng cá'
    ],
    mechanismOfAction: 'Gắn tiểu đơn vị 30S ribosom ức chế tổng hợp protein vi khuẩn; tỷ lệ kháng *H. pylori* đối với Tetracycline cực kỳ thấp (< 1-2%).',
    standardDosage: 'Phác đồ *H. pylori*: 500mg x 4 lần/ngày trong 14 ngày phối hợp PPI + Bismuth + Metronidazole.',
    administration: 'Uống với nhiều nước ở tư thế ĐỨNG/NGỒI THẲNG; uống cách xa sữa, Canxi, Sắt và Bismuth ít nhất 1-2 giờ nếu không phải viên phối hợp sẵn.',
    contraindications: ['Phụ nữ mang thai, cho con bú và trẻ em < 8 tuổi (gây sạm men răng vĩnh viễn)', 'Suy thận nặng (khác Doxycycline!)'],
    cautions: ['Tuyệt đối không dùng thuốc Tetracycline hết hạn (nguy cơ gây hội chứng Fanconi tổn thương ống thận nặng).'],
    referenceSources: ['Đồng thuận Maastricht VI H. pylori', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'amikacin',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh Aminoglycoside diệt Gram âm đa kháng (Đường tiêm)',
    activeIngredient: 'Amikacin sulfate',
    commonBrandNames: ['Amikin 500mg/2ml', 'Amikacin Kabi 500mg'],
    indications: [
      'Nhiễm khuẩn nặng đe dọa tính mạng do trực khuẩn Gram âm đa kháng (*Pseudomonas*, *Acinetobacter*, *Klebsiella* tiết ESBL kháng Gentamicin/Tobramycin)',
      'Viêm thận bể thận nặng, nhiễm khuẩn huyết, lao đa kháng (phối hợp)'
    ],
    mechanismOfAction: 'Gắn không thuận nghịch tiểu đơn vị 30S ribosom gây đọc sai mã mRNA diệt khuẩn phụ thuộc nồng độ cực nhanh.',
    standardDosage: '15mg/kg/ngày dùng 1 LẦN DUY NHẤT mỗi ngày (truyền tĩnh mạch 30-60 phút hoặc tiêm bắp sâu).',
    administration: 'Dùng ngắn ngày (thường <= 5-7 ngày) tại bệnh viện; hiệu chỉnh liều theo cân nặng lý tưởng và độ thanh thải Creatinine.',
    contraindications: ['Quá mẫn Aminoglycoside', 'Bệnh nhược cơ (Myasthenia gravis)'],
    cautions: ['ĐỘC TÍNH THẬN VÀ ĐỘC TÍNH TAI (ù tai, điếc không hồi phục): theo dõi Creatinine máu mỗi 2-3 ngày và không phối hợp với Furosemide liều cao hoặc Vancomycin nếu không cần thiết.'],
    referenceSources: ['The Sanford Guide', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'gentamicin',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh Aminoglycoside (Tiêm phối hợp & Nhỏ mắt/Bôi da)',
    activeIngredient: 'Gentamicin sulfate',
    commonBrandNames: ['Gentamicin 80mg/2ml ống tiêm', 'Gentamicin 0.3% nhỏ mắt', 'Kem bôi phối hợp Silkron/Gentrisone'],
    indications: [
      'Phối hợp với Penicillin/Ampicillin tạo hiệp đồng diệt khuẩn trong viêm nội tâm mạc, nhiễm khuẩn huyết sơ sinh',
      'Nhiễm khuẩn Gram âm nặng đường tiết niệu, ổ bụng; nhỏ mắt trị viêm kết mạc do vi khuẩn'
    ],
    mechanismOfAction: 'Ức chế tổng hợp protein tại tiểu đơn vị 30S ribosom và làm thủng màng tế bào vi khuẩn Gram âm ái khí.',
    standardDosage: 'Tiêm truyền người lớn: 5mg/kg/ngày chia 1 lần (hoặc 3mg/kg/ngày chia 3 lần khi hiệp đồng viêm nội tâm mạc).',
    administration: 'Đường tiêm dùng tại bệnh viện; đường nhỏ mắt/bôi da không dùng kéo dài quá 10 ngày.',
    contraindications: ['Nhược cơ, quá mẫn Aminoglycoside'],
    cautions: ['Dạng tiêm có nguy cơ độc thận và tổn thương tiền đình ốc tai tương tự Amikacin; KHÔNG nhỏ dạng có Gentamicin vào tai nghi ngờ thủng màng nhĩ.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'BNF']
  },
  {
    id: 'ofloxacin',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh Fluoroquinolon thế hệ 2 (Đường uống & Nhỏ mắt)',
    activeIngredient: 'Ofloxacin',
    commonBrandNames: ['Oflocet 200mg', 'Tarivid 200mg', 'Oflovid 0.3% (nhỏ mắt)'],
    indications: [
      'Nhiễm khuẩn đường tiết niệu, viêm tuyến tiền liệt, bệnh lậu/Chlamydia vùng chậu',
      'Nhiễm khuẩn hô hấp dưới, da mô mềm; tra mắt trị viêm loét giác mạc do vi khuẩn (Oflovid)'
    ],
    mechanismOfAction: 'Hỗn hợp racemic ức chế DNA gyrase và Topoisomerase IV của vi khuẩn.',
    standardDosage: 'Uống: 200mg x 2 lần/ngày (cách 12 giờ); Tra mắt Oflovid: nhỏ 1 giọt x 3-4 lần/ngày.',
    administration: 'Uống với nhiều nước, cách xa Canxi, Sắt, Kẽm, Antacid 2 giờ.',
    contraindications: ['Trẻ em < 18 tuổi (đường toàn thân), phụ nữ mang thai/cho con bú, tiền sử đứt gân do Quinolon, động kinh'],
    cautions: ['Tránh nắng gắt; ngưng ngay nếu đau sưng gân gót chân.'],
    referenceSources: ['Dược thư Quốc gia Việt Nam', 'Vidal']
  },
  {
    id: 'norfloxacin',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Fluoroquinolon đặc hiệu Đường Tiết Niệu & Tiêu Hóa',
    activeIngredient: 'Norfloxacin',
    commonBrandNames: ['Noroxin 400mg', 'Norfloxacin 400mg', 'Chibroxin (nhỏ mắt)'],
    indications: [
      'Nhiễm khuẩn đường tiết niệu dưới (viêm bàng quang, viêm niệu đạo)',
      'Tiêu chảy nhiễm khuẩn du lịch, dự phòng viêm phúc mạc nhiễm khuẩn tự phát ở bệnh nhân xơ gan cổ trướng'
    ],
    mechanismOfAction: 'Ức chế DNA gyrase vi khuẩn Gram âm đường ruột và tiết niệu (*E. coli*, *Proteus*, *Shigella*), đạt nồng độ rất cao tại nước tiểu và lòng ruột.',
    standardDosage: '400mg x 2 lần/ngày (viêm bàng quang 3-7 ngày).',
    administration: 'Uống lúc BỤNG ĐÓI (trước ăn 1 giờ hoặc sau ăn 2 giờ) với nhiều nước, cách xa sữa/Antacid/Sắt 2 giờ.',
    contraindications: ['Trẻ em < 18 tuổi, phụ nữ có thai/cho con bú, tiền sử viêm đứt gân do Quinolon'],
    cautions: ['KHÔNG dùng cho viêm phổi hoặc nhiễm khuẩn huyết toàn thân (do nồng độ trong máu và mô phổi thấp).'],
    referenceSources: ['AASLD Cirrhosis Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'vancomycin',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh Glycopeptide (Đặc trị MRSA & Viêm đại tràng C. difficile)',
    activeIngredient: 'Vancomycin HCl',
    commonBrandNames: ['Vancocin 500mg / 1g', 'Vancomycin Kabi', 'Edicin'],
    indications: [
      'Lựa chọn trụ cột truyền tĩnh mạch trị nhiễm khuẩn nặng do Tụ cầu vàng kháng Methicillin (MRSA), *Enterococcus* và viêm màng não phế cầu kháng thuốc',
      'ĐƯỜNG UỐNG: Lựa chọn ĐẦU TAY trị Viêm đại tràng giả mạc do *Clostridioides difficile* (vì uống không hấp thu vào máu, tập trung diệt khuẩn trong lòng đại tràng)'
    ],
    mechanismOfAction: 'Gắn vào đầu D-Ala-D-Ala của chuỗi tiền chất Peptidoglycan ngăn tổng hợp vách vi khuẩn Gram dương.',
    standardDosage: 'Truyền tĩnh mạch: 15 - 20mg/kg mỗi 8 - 12 giờ (theo dõi nồng độ đáy/AUC). Đường uống trị *C. difficile*: 125mg x 4 lần/ngày x 10 ngày.',
    administration: 'TRUYỀN TĨNH MẠCH CHẬM ít nhất 60 - 120 phút (nếu truyền nhanh gây hội chứng "Người Đỏ" — đỏ bừng ngứa vùng cổ mặt do phóng thích Histamin).',
    contraindications: ['Quá mẫn Vancomycin'],
    cautions: ['Theo dõi sát chức năng thận Creatinine và nồng độ thuốc trong máu TDM đặc biệt khi dùng kèm Piperacillin/Tazobactam hoặc Aminoglycoside.'],
    referenceSources: ['IDSA MRSA & C. difficile Guidelines', 'The Sanford Guide']
  },
  {
    id: 'linezolid',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh Oxazolidinone (Uống/Tiêm đặc trị MRSA & VRE đa kháng)',
    activeIngredient: 'Linezolid',
    commonBrandNames: ['Zyvox 600mg viên / truyền', 'Linezolid 600mg'],
    indications: [
      'Viêm phổi bệnh viện và nhiễm khuẩn da mô mềm biến chứng do tụ cầu MRSA (sinh khả dụng đường uống đạt ~100% tương đương truyền tĩnh mạch!)',
      'Nhiễm khuẩn do *Enterococcus* kháng Vancomycin (VRE), lao đa kháng XDR/MDR'
    ],
    mechanismOfAction: 'Gắn tiểu đơn vị 50S ribosom ngăn hình thành phức hợp khởi đầu 70S tổng hợp protein vi khuẩn Gram dương; thấm vào mô phổi tốt hơn Vancomycin.',
    standardDosage: 'Người lớn: 600mg x 2 lần/ngày (uống hoặc truyền TM mỗi 12 giờ), thường 10 - 14 ngày (không cần chỉnh liều suy thận!).',
    administration: 'Viên uống dùng cùng hoặc xa bữa ăn.',
    contraindications: ['Đang dùng hoặc mới ngưng thuốc ức chế MAO trong 14 ngày; tăng huyết áp chưa kiểm soát'],
    cautions: ['CẢNH BÁO: Linezolid ức chế MAO yếu -> tránh phối hợp thuốc trầm cảm SSRI/SNRI (nguy cơ hội chứng Serotonin) và kiêng thức ăn quá giàu Tyramine (phô mai ủ lâu, bia tươi); theo dõi tiểu cầu hàng tuần nếu dùng > 10-14 ngày.'],
    referenceSources: ['IDSA Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'nitrofurantoin',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh đầu tay thế giới trị Viêm Bàng Quang Cấp không biến chứng',
    activeIngredient: 'Nitrofurantoin (Macrocrystals / Monohydrate)',
    commonBrandNames: ['Macrobid 100mg', 'Macrodantin', 'Furadantin'],
    indications: [
      'Lựa chọn ĐẦU TAY (cùng với Fosfomycin) trong điều trị Viêm bàng quang cấp không biến chứng (tiểu buốt, tiểu rắt do *E. coli*)',
      'Dự phòng nhiễm khuẩn tiết niệu tái phát nhiều lần'
    ],
    mechanismOfAction: 'Bị khử bởi enzym vi khuẩn trong nước tiểu thành chất trung gian làm hỏng DNA, RNA và protein vi khuẩn cùng lúc nên tỷ lệ kháng thuốc cực thấp.',
    standardDosage: 'Dạng giải phóng chậm (Macrobid): 100mg x 2 lần/ngày trong 5 ngày.',
    administration: 'Uống ngay trong hoặc sau bữa ăn (thức ăn giúp tăng hấp thu tới 40% và giảm buồn nôn).',
    contraindications: [
      'Suy thận (eGFR < 30 ml/phút — thuốc không đạt đủ nồng độ trong nước tiểu và tăng độc thần kinh)',
      'Thiếu men G6PD, phụ nữ mang thai đủ tháng (38-42 tuần) và trẻ sơ sinh < 1 tháng tuổi'
    ],
    cautions: ['Chỉ dùng điều trị nhiễm khuẩn bàng quang dưới, KHÔNG dùng cho viêm thận bể thận có sốt cao đau hông lưng; làm nước tiểu ngả màu vàng nâu sậm (vô hại).'],
    referenceSources: ['IDSA / EAU Cystitis Guidelines', 'BNF']
  },
  {
    id: 'tinidazole',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng kỵ khí & Ký sinh trùng nhóm Nitroimidazole thế hệ mới',
    activeIngredient: 'Tinidazole',
    commonBrandNames: ['Fasigyn 500mg', 'Tinidazol 500mg'],
    indications: [
      'Viêm âm đạo do *Trichomonas vaginalis*, viêm âm đạo tạp khuẩn (*Gardnerella*), nhiễm *Giardia lamblia* (chỉ cần 1 liều duy nhất!)',
      'Lỵ amip ruột/áp xe gan amip, nhiễm khuẩn kỵ khí, dự phòng mổ đại trực tràng, phác đồ cứu vãn *H. pylori*'
    ],
    mechanismOfAction: 'Tương tự Metronidazole nhưng thời gian bán thải dài gấp đôi (~12-14 giờ) và ít tác dụng phụ đắng miệng buồn nôn hơn.',
    standardDosage: '*Trichomonas / Giardia*: 2g (4 viên 500mg) uống 1 LIỀU DUY NHẤT (điều trị đồng thời cho bạn tình trong Trichomonas).',
    administration: 'Uống trong hoặc ngay sau bữa ăn.',
    contraindications: ['Phụ nữ mang thai 3 tháng đầu, bệnh thần kinh thực thể tiến triển, rối loạn tạo máu'],
    cautions: ['TUYỆT ĐỐI kiêng rượu bia trong thời gian uống thuốc và ít nhất 72 giờ sau khi ngưng thuốc để tránh phản ứng Disulfiram (đỏ mặt, nôn mửa, tụt huyết áp).'],
    referenceSources: ['CDC STI Guidelines', 'Dược thư Quốc gia Việt Nam']
  },
  {
    id: 'rifaximin',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh KHÔNG hấp thu đặc hiệu Đường Ruột & Bệnh Não Gan',
    activeIngredient: 'Rifaximin',
    commonBrandNames: ['Xifaxan 200mg / 550mg', 'Normix 200mg', 'Rifaximin 550mg'],
    indications: [
      'Dự phòng tái phát Bệnh não gan (phối hợp Lactulose ở bệnh nhân xơ gan)',
      'Hội chứng ruột kích thích thể tiêu chảy (IBS-D) và hội chứng phát triển quá mức vi khuẩn ruột non (SIBO)',
      'Tiêu chảy nhiễm khuẩn du lịch không kèm sốt/máu'
    ],
    mechanismOfAction: 'Ức chế RNA polymerase phụ thuộc DNA của vi khuẩn; < 0.4% hấp thu qua niêm mạc ruột nên tập trung tiêu diệt vi khuẩn sinh độc tố và sinh Amoniac ngay trong lòng ruột mà không gây hại toàn thân.',
    standardDosage: 'Tiêu chảy du lịch: 200mg x 3 lần/ngày x 3 ngày. Bệnh não gan: 550mg x 2 lần/ngày. IBS-D: 550mg x 3 lần/ngày x 14 ngày.',
    administration: 'Uống cùng hoặc xa bữa ăn đều được.',
    contraindications: ['Tiêu chảy có sốt cao hoặc phân có máu nhầy (nghi *Campylobacter/Salmonella* xâm lấn)', 'Tắc ruột, quá mẫn dẫn xuất Rifamycin'],
    cautions: ['Rất ít tương tác thuốc và hầu như không gây loạn khuẩn nặng toàn thân; có thể làm nước tiểu hơi ánh đỏ cam nhẹ.'],
    referenceSources: ['AASLD Hepatic Encephalopathy Guidelines', 'ACG IBS Guidelines']
  },
  {
    id: 'colistin',
    category: 'D',
    categoryName: 'D. Bệnh Nhiễm Khuẩn, Nhiễm Nấm, Virus & Ký Sinh Trùng',
    groupName: 'Kháng sinh Polymyxin dự trữ cuối cùng (Siêu kháng Carbapenem)',
    activeIngredient: 'Colistin (Colistimethate sodium)',
    commonBrandNames: ['Colomycin 1 MUI / 2 MUI', 'Colistin Kabi', 'Promixin'],
    indications: [
      'Nhiễm khuẩn bệnh viện nặng đe dọa tính mạng do trực khuẩn Gram âm siêu kháng thuốc (kháng Carbapenem): *Acinetobacter baumannii*, *Pseudomonas*, *Klebsiella* (CRE)',
      'Dạng khí dung hỗ trợ viêm phổi thở máy hoặc giãn phế quản nhiễm *Pseudomonas* mạn'
    ],
    mechanismOfAction: 'Hoạt động như chất diện hoạt cation phá vỡ màng ngoài LPS và màng trong tế bào vi khuẩn Gram âm đa kháng thuốc.',
    standardDosage: 'Liều nạp 9 MUI truyền tĩnh mạch (chậm 30-60 phút), sau đó duy trì 4.5 MUI mỗi 12 giờ (bắt buộc hiệu chỉnh theo chức năng thận eGFR và quy đổi chuẩn CBA/MUI).',
    administration: 'Chỉ sử dụng tại khoa Hồi sức Cấp cứu / Truyền nhiễm bệnh viện dưới giám sát chặt chẽ.',
    contraindications: ['Bệnh nhược cơ (Myasthenia gravis)', 'Quá mẫn Polymyxin B / Colistin'],
    cautions: ['ĐỘC TÍNH THẬN CAO (tới 30-50%) và độc thần kinh (tê quanh môi, yếu cơ, ngưng thở): theo dõi Creatinine hàng ngày và tránh phối hợp thuốc độc thận khác nếu có lựa chọn thay thế mới (như Ceftazidime-Avibactam).'],
    referenceSources: ['International Colistin Consensus Guidelines', 'Phác đồ Hồi sức Bộ Y Tế']
  }
];
