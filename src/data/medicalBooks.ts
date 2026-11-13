export interface MedicalBook {
  id: string;
  title: string;
  originalTitle?: string;
  author: string;
  publisherYear?: string;
  category: 'dong_y_ly_luan' | 'cham_cuu_vn' | 'cham_cuu_qt' | 'tay_y_co_so' | 'duoc_thu_vn' | 'duoc_lam_sang_qt' | 'nam_duoc_vn';
  categoryLabel: string;
  summary: string;
  coreConcepts: string[];
  clinicalValue: string;
  featuredQuote?: string;
  coverImage?: string;
  keyTopics: string[];
}

export const MEDICAL_BOOKS: MedicalBook[] = [
  // Nhóm 1: Sách Đông Y (Lý luận & Dược học)
  {
    id: 'foundations-chinese-medicine',
    title: 'The Foundations of Chinese Medicine: A Comprehensive Text',
    originalTitle: 'The Foundations of Chinese Medicine (3rd Edition)',
    author: 'Giovanni Maciocia',
    publisherYear: 'Elsevier / Churchill Livingstone',
    category: 'dong_y_ly_luan',
    categoryLabel: 'Đông Y Kinh Điển & Lý Luận',
    summary: 'Bộ giáo trình kinh điển chuẩn mực quốc tế về lý luận nền tảng Y Học Cổ Truyền: Âm Dương, Ngũ Hành, Tinh - Khí - Huyết - Tân Dịch, Tạng Phủ, Bát Cương, Tứ Chẩn và hệ thống Kinh Lạc.',
    coreConcepts: [
      'Âm Dương biến hóa và quy luật tương khắc ngũ hành',
      'Học thuyết Tạng Phủ (Zang-Fu): Sinh lý & bệnh lý chi tiết của 12 tạng phủ',
      'Tứ Chẩn: Vọng (nhìn thần, sắc, hình, thiệt chẩn), Văn (nghe, ngửi), Vấn (hỏi bệnh), Thiết (bắt mạch 28 mạch tượng)',
      'Bát Cương biện chứng: Âm - Dương, Biểu - Lý, Hàn - Nhiệt, Hư - Thực'
    ],
    clinicalValue: 'Cung cấp nền tảng tư duy chẩn đoán chuẩn xác, giúp người thầy thuốc quy tụ mọi triệu chứng hỗn tạp về đúng gốc rễ căn nguyên của Tạng Phủ và Khí Huyết.',
    featuredQuote: 'Trị bệnh tất cầu kỳ bản - Muốn chữa bệnh phải tìm đến đúng gốc rễ nguyên nhân.',
    coverImage: '/assets/aistudio/Screenshot_20261108_225741_Google_7058ea3a.jpg',
    keyTopics: ['Tạng Phủ Học Thuyết', 'Thiệt Chẩn & Mạch Chẩn', 'Bát Cương Biện Chứng', 'Kinh Lạc Khí Hóa']
  },
  {
    id: 'practice-chinese-medicine',
    title: 'The Practice of Chinese Medicine: Treatment of Diseases',
    originalTitle: 'The Practice of Chinese Medicine: Treatment of Diseases with Acupuncture and Chinese Herbs',
    author: 'Giovanni Maciocia',
    publisherYear: 'Elsevier Health Sciences',
    category: 'dong_y_ly_luan',
    categoryLabel: 'Đông Y Kinh Điển & Lý Luận',
    summary: 'Cẩm nang điều trị thực hành cho hàng trăm chứng bệnh thường gặp và nan y: Đau đầu, mất ngủ, trầm cảm, hen suyễn, viêm khớp, cao huyết áp, rối loạn tiêu hóa, bệnh tự miễn.',
    coreConcepts: [
      'Biện chứng luận trị cụ thể cho từng thể bệnh lâm sàng',
      'Kết hợp song hành giữa phác đồ châm cứu và bài thuốc thảo dược',
      'Phân tích ca lâm sàng thực tế và các biến chứng gia giảm vị thuốc'
    ],
    clinicalValue: 'Cầu nối từ lý thuyết hàn lâm sang thực tiễn giường bệnh; đưa ra phác đồ châm cứu và thang thuốc tối ưu cho từng giai đoạn cấp - mạn.',
    keyTopics: ['Thần kinh & Tâm thần', 'Hô hấp & Tim mạch', 'Tiêu hóa & Chuyển hóa', 'Cơ xương khớp']
  },
  {
    id: 'chinese-herbal-medicine-materia-medica',
    title: 'Chinese Herbal Medicine: Materia Medica',
    author: 'Dan Bensky, Steven Clavey, Erich Stöger',
    publisherYear: 'Eastland Press (Portable 3rd Edition)',
    category: 'dong_y_ly_luan',
    categoryLabel: 'Dược Học Cổ Truyền Kinh Điển',
    summary: 'Bách khoa toàn thư dược liệu YHCT uy tín nhất toàn cầu, nghiên cứu chuyên sâu hơn 530 vị thuốc thảo mộc, khoáng vật, động vật với tính vị, quy kinh, liều lượng, độc tính và phối ngũ.',
    coreConcepts: [
      'Tứ Khí (Hàn, Nhiệt, Ôn, Lương) & Ngũ Vị (Tân, Cam, Toan, Khổ, Hàm)',
      'Quy Kinh: Vị thuốc dẫn khí vào tạng phủ nào',
      'Quy tắc phối ngũ Quân - Thần - Tá - Sứ kinh điển',
      'Cấm kỵ phối ngũ: Thập Bát Phản, Thập Cửu Úy, độc tính và xử lý tương kỵ'
    ],
    clinicalValue: 'Chuẩn hóa định lượng dược liệu tính theo gram chuẩn khoa học, đảm bảo an toàn tuyệt đối, tránh ngộ độc và tối đa hóa dược lực trị liệu.',
    coverImage: '/assets/aistudio/Screenshot_20261108_225741_Google_7058ea3a.jpg',
    keyTopics: ['Giải biểu', 'Thanh nhiệt', 'Hóa đờm chỉ khái', 'Bổ khí huyết', 'Hoạt huyết hóa ứ']
  },
  {
    id: 'phuong-thang-y-hoc-co-truyen',
    title: 'Phương Thang Y Học Cổ Truyền',
    author: 'Trần Gia Kỳ, Hoàng Trọng Quang',
    publisherYear: 'NXB Đà Nẵng / Sách Khai Phóng',
    category: 'dong_y_ly_luan',
    categoryLabel: 'Dược Học Cổ Truyền Kinh Điển',
    summary: 'Công trình tổng hợp trên 10.000 bài thuốc cổ phương và hiện đại, phân loại theo công năng: Giải biểu, Tả hạ, Hòa giải, Thanh nhiệt, Khứ hàn, Bổ ích, Cố sáp, An thần, Khai khiếu, Lý khí, Lý huyết, Trừ phong, Khứ thấp, Nhuận táo, Hóa đờm, Tiêu đạo.',
    coreConcepts: [
      'Cấu trúc phương tễ hoàn chỉnh: Quân - Thần - Tá - Sứ',
      'Nguyên tắc gia giảm bài thuốc theo chính khí và tà khí người bệnh',
      'Bí quyết bào chế và sắc thuốc chuẩn để đạt dược tính cao nhất'
    ],
    clinicalValue: 'Tra cứu tức thì các phương thang kinh điển (Quế Chi Thang, Lục Vị Địa Hoàng, Bát Trân Thang, Tiêu Dao Tán, Bổ Trung Ích Khí...) và hướng dẫn gia giảm theo thể trạng.',
    coverImage: '/assets/aistudio/Screenshot_20261108_225741_Google_7058ea3a.jpg',
    keyTopics: ['Cổ phương danh tiếng', 'Gia giảm thang tễ', 'Pháp trị 8 phép (Hãn, Thổ, Hạ, Hòa, Ôn, Thanh, Tiêu, Bổ)']
  },
  {
    id: 'y-hoc-co-truyen-nguyen-manh-tri',
    title: 'Y Học Cổ Truyền (Tái Bản 2022)',
    author: 'BS.CKII. Nguyễn Mạnh Trí',
    publisherYear: 'ĐH Y Khoa Phạm Ngọc Thạch',
    category: 'dong_y_ly_luan',
    categoryLabel: 'Giáo Trình Y Khoa Viện Trường',
    summary: 'Giáo trình đào tạo bác sĩ Y Học Cổ Truyền chuẩn mực của Đại học Y khoa Phạm Ngọc Thạch, cập nhật phương pháp tiếp cận hiện đại, khoa học hóa lý luận Đông y phù hợp lâm sàng thực tế.',
    coreConcepts: [
      'Chuẩn hóa thuật ngữ Y học cổ truyền theo tiêu chuẩn đào tạo Bộ Y Tế',
      'Quy trình chẩn đoán lâm sàng tích hợp Đông - Tây Y tại bệnh viện',
      'Định lượng và chỉ định điều trị an toàn cho bệnh nhân'
    ],
    clinicalValue: 'Giúp phác đồ chẩn trị có tính pháp lý y khoa, thực tế tại hệ thống bệnh viện Việt Nam.',
    coverImage: '/assets/aistudio/Screenshot_20261108_225741_Google_7058ea3a.jpg',
    keyTopics: ['Đào tạo bác sĩ lâm sàng', 'Tiêu chuẩn Bộ Y Tế', 'Chẩn đoán kết hợp']
  },
  {
    id: 'nhi-khoa-y-hoc-co-truyen-tran-thuy',
    title: 'Nhi Khoa Y Học Cổ Truyền',
    author: 'GS. Trần Thúy',
    publisherYear: 'Đại Học Y Hà Nội / NXB Y Học',
    category: 'dong_y_ly_luan',
    categoryLabel: 'Chuyên Khoa Nhi Cổ Truyền',
    summary: 'Bộ cẩm nang chuyên sâu về sinh lý trẻ em: "Thuần dương vô âm", tạng phủ non nớt, khí huyết chưa đầy đủ. Chẩn đoán và trị liệu các bệnh cam tích, kinh phong, viêm phế quản, tưa lưỡi, tiêu chảy bằng thuốc thang và bấm huyệt nhi.',
    coreConcepts: [
      'Đặc điểm sinh lý và bệnh lý trẻ em theo Đông y',
      'Vọng chẩn vân tay (chỉ văn) ở ngón trỏ trẻ nhỏ (Phong quan, Khí quan, Mệnh quan)',
      'Liều lượng và cách dùng thuốc nhẹ nhàng, an toàn cho trẻ'
    ],
    clinicalValue: 'Đặc trị các bệnh nhi khoa không lạm dụng kháng sinh; phác đồ xoa bóp day bấm huyệt êm dịu cho trẻ.',
    coverImage: '/assets/aistudio/Screenshot_20261108_225741_Google_7058ea3a.jpg',
    keyTopics: ['Chỉ văn vọng chẩn', 'Cam tích & Biếng ăn', 'Kinh phong', 'Hô hấp nhi khoa']
  },

  // Nhóm 2: Sách Châm Cứu Tiếng Việt
  {
    id: 'cham-cuu-giap-at-kinh',
    title: 'Châm Cứu Giáp Ất Kinh',
    originalTitle: 'Huangfu Mi - Zhen Jiu Jia Yi Jing',
    author: 'Hoàng Phủ Mật (Hoàng Phủ Mi - Tấn triều)',
    publisherYear: 'Y Điển Cổ Kim',
    category: 'cham_cuu_vn',
    categoryLabel: 'Châm Cứu Tiếng Việt & Cổ Điển',
    summary: 'Tác phẩm châm cứu toàn diện đầu tiên trong lịch sử nhân loại, hệ thống hóa 349 huyệt vị cơ bản, quy định nghiêm ngặt vị trí thốn, góc châm, độ sâu và các cấm châm cấm cứu.',
    coreConcepts: [
      'Khởi nguồn của hệ thống huyệt vị toàn thân',
      'Nguyên tắc điều khí: Hư bổ thực tả, đón đầu tà khí',
      'Quy chuẩn các cấm huyệt nguy hiểm tránh tai biến'
    ],
    clinicalValue: 'Gốc rễ y học đảm bảo tính chuẩn xác ngàn năm của các mốc giải phẫu huyệt đạo.',
    keyTopics: ['Cổ pháp châm cứu', '349 Huyệt vị', 'Cấm châm cấm cứu']
  },
  {
    id: 'cham-cuu-dong-thi-co-so-ly-thuyet',
    title: 'Châm Cứu Đổng Thị Cơ Sở Lý Thuyết Huyệt Vị Và Cơ Chế Tác Dụng',
    author: 'Tung’s Acupuncture System Research Group',
    publisherYear: 'Nghiên cứu lâm sàng ứng dụng',
    category: 'cham_cuu_vn',
    categoryLabel: 'Châm Cứu Đổng Thị Kỳ Huyệt',
    summary: 'Khám phá hệ thống Đổng Thị Kỳ Huyệt (Tung’s Acupuncture) nổi tiếng của tôn sư Đổng Cảnh Xương. Hiệu ứng cắt cơn đau tức thì, sử dụng huyệt xa tổn thương, nguyên lý Động Khí Châm Pháp.',
    coreConcepts: [
      'Đổng Thị Kỳ Huyệt phân khu từ 11 đến 1010',
      'Động Khí Châm Pháp: Châm huyệt xa đồng thời bảo bệnh nhân vận động vùng đau',
      'Đại ứng huyệt: Linh Cốt - Đại Bạch (trị đau thắt lưng, thần kinh tọa, suy nhược)',
      'Huyệt Tứ Mã (trị bệnh phổi, da dị ứng, mũi)',
      'Trọng Tử - Trọng Tiên (trị đau lưng trên, đau cổ vai gáy cấp)'
    ],
    clinicalValue: 'Khả năng giảm đau và giải quyết bệnh chứng cực kỳ ngoạn mục ngay trong 1-3 phút châm hoặc day bấm.',
    keyTopics: ['Linh Cốt - Đại Bạch', 'Tứ Mã', 'Trọng Tử Trọng Tiên', 'Động Khí Châm Pháp']
  },
  {
    id: 'cham-cuu-hoc-dhyd-tphcm',
    title: 'Châm Cứu Học - ĐH Y Dược TP.HCM',
    author: 'Bộ môn Châm cứu - ĐH Y Dược TP.HCM',
    publisherYear: 'NXB Y Học',
    category: 'cham_cuu_vn',
    categoryLabel: 'Giáo Trình Châm Cứu Viện Trường',
    summary: 'Giáo trình chuẩn mực đại học và sau đại học về 14 đường kinh, hệ thống huyệt đặc hiệu (Ngũ Du, Nguyên, Lạc, Khích, Bối Du, Mộ, Bát Hội) và các phác đồ điều trị thường quy.',
    coreConcepts: [
      'Hệ thống 12 kinh chính + 2 mạch Nhâm Đốc',
      'Ngũ Du Huyệt (Tỉnh, Huỳnh, Du, Kinh, Hợp) tương ứng Kim - Mộc - Thủy - Hỏa - Thổ',
      'Kỹ thuật châm kim, đắc khí, cứu ấm, điện châm, thủy châm'
    ],
    clinicalValue: 'Nền tảng chuẩn đoán và kỹ thuật thao tác kim vô trùng, an toàn cho bác sĩ.',
    keyTopics: ['14 Đường Kinh Lạc', 'Ngũ Du Huyệt', 'Điện châm', 'Thủy châm']
  },
  {
    id: 'cham-cuu-chua-benh-nguyen-tai-thu',
    title: 'Châm Cứu Chữa Bệnh',
    author: 'GS. Nguyễn Tài Thu (Bậc thầy Châm cứu Thế giới)',
    publisherYear: 'NXB Y Học',
    category: 'cham_cuu_vn',
    categoryLabel: 'Châm Cứu Lâm Sàng Việt Nam',
    summary: 'Kinh nghiệm lâm sàng vô giá của Giáo sư Nguyễn Tài Thu trong điều trị liệt dây VII ngoại biên, di chứng tai biến mạch máu não (bán thân bất toại), đau thần kinh tọa, cắt cơn nghiện và giảm đau phẫu thuật.',
    coreConcepts: [
      'Phác đồ châm phục hồi di chứng tai biến mạch máu não thần tốc',
      'Phác đồ điều trị liệt mặt ngoại vi (Dây VII)',
      'Kỹ thuật vê kim đắc khí mãnh liệt để đánh thức dẫn truyền thần kinh'
    ],
    clinicalValue: 'Kinh nghiệm thực tiễn đã cứu chữa cho hàng vạn bệnh nhân bại liệt tại Việt Nam và quốc tế.',
    keyTopics: ['Liệt dây thần kinh VII', 'Di chứng tai biến', 'Đau dây thần kinh', 'Điện châm điều trị']
  },
  {
    id: 'mang-cham-nguyen-tai-thu',
    title: 'Mãng Châm',
    author: 'GS. Nguyễn Tài Thu',
    publisherYear: 'NXB Y Học Hà Nội',
    category: 'cham_cuu_vn',
    categoryLabel: 'Châm Cứu Lâm Sàng Việt Nam',
    summary: 'Phương pháp đặc dị dùng kim dài (từ 15cm đến 60cm) châm xuyên từ huyệt này sang huyệt khác (thấu huyệt) tạo xung kích thông kinh hoạt lạc cực mạnh để điều trị chứng bại liệt nặng, teo cơ, câm điếc.',
    coreConcepts: [
      'Kỹ thuật luồn kim mãng châm dưới da và vào khe cơ an toàn',
      'Phương pháp Thấu Huyệt (ví dụ: Dương Lăng Tuyền thấu Âm Lăng Tuyền, Địa Thương thấu Giáp Xa)',
      'Kích thích thần kinh sâu để phục hồi chức năng vận động'
    ],
    clinicalValue: 'Vũ khí châm cứu tối thượng của YHCT Việt Nam trong điều trị các chứng nan y mà kim châm thông thường không đủ kích thích.',
    keyTopics: ['Kim dài mãng châm', 'Kỹ thuật Thấu Huyệt', 'Bại liệt & Teo cơ']
  },
  {
    id: 'phuong-cach-dinh-vi-huyet',
    title: 'Phương Cách Định Vị Và Vận Dụng Huyệt Châm Cứu',
    author: 'Chuyên gia Châm cứu Lâm sàng',
    category: 'cham_cuu_vn',
    categoryLabel: 'Châm Cứu Thực Hành',
    summary: 'Phương pháp đo thốn chính xác theo đồng thân thốn và mốc giải phẫu xương, gân, cơ, mạch máu. Cách vận dụng phối huyệt thông minh giảm bớt số kim mà tăng hiệu quả.',
    coreConcepts: [
      'Xác định thốn cơ thể: Thốn ngón tay & Thốn phân đoạn xương',
      'Mốc giải phẫu bất di bất dịch',
      'Nguyên tắc phối huyệt: Trên - Dưới, Trước - Sau, Trong - Ngoài'
    ],
    clinicalValue: 'Giúp người thực hành không bao giờ châm lệch huyệt, dù thể trạng bệnh nhân béo hay gầy.',
    keyTopics: ['Đo thốn chuẩn xác', 'Giải phẫu bề mặt', 'Phối huyệt tinh giản']
  },
  {
    id: 'khi-cong-y-dao-so-tay-tim-huyet',
    title: 'Khí Công Y Đạo - Sổ Tay Tìm Huyệt',
    author: 'Thầy Đỗ Đức Ngọc',
    category: 'cham_cuu_vn',
    categoryLabel: 'Khí Công Y Đạo & Dưỡng Sinh',
    summary: 'Phương pháp chẩn đoán bằng máy đo huyết áp và đường huyết trước và sau khi kích thích huyệt đạo để kiểm chứng định lượng sự chuyển hóa Khí - Huyết và Ngũ Tạng.',
    coreConcepts: [
      'Định lượng tình trạng Khí - Huyết thông qua số đo Huyết Áp 3 số (Khí lực, Huyết lượng, Nhịp tim/Hàn nhiệt)',
      'Tập khí công và day ấn huyệt điều chỉnh huyết áp, đường huyết tự nhiên'
    ],
    clinicalValue: 'Tạo cầu nối trực quan đo lường được hiệu quả của châm cứu bấm huyệt bằng dụng cụ y khoa hiện đại.',
    keyTopics: ['Đo huyết áp ngũ hành', 'Kiểm chứng đường huyết', 'Tự điều khí']
  },
  {
    id: 'duong-khi-huyet-tao-khi-chat',
    title: 'Dưỡng Khí Huyết Tạo Khí Chất',
    author: 'Chuyên gia Dưỡng sinh YHCT',
    category: 'cham_cuu_vn',
    categoryLabel: 'Dưỡng Sinh & Khí Huyết',
    summary: 'Chuyên luận về phương pháp nuôi dưỡng khí huyết từ ăn uống, giấc ngủ, tập luyện và xoa bóp kinh lạc để tạo nền tảng miễn dịch bền vững đẩy lùi bách bệnh.',
    coreConcepts: [
      'Nguyên lý Tinh sinh Khí, Khí dưỡng Thần',
      'Đả thông kinh mạch mỗi sớm và tối',
      'Thực dưỡng điều hòa khí huyết'
    ],
    clinicalValue: 'Giúp bệnh nhân phòng ngừa tái phát bệnh và duy trì sinh lực sau điều trị.',
    keyTopics: ['Dưỡng sinh nội công', 'Nuôi dưỡng khí huyết', 'Lối sống trường thọ']
  },

  // Nhóm 3: Sách Châm Cứu Quốc Tế
  {
    id: 'chinese-acupuncture-moxibustion',
    title: 'Chinese Acupuncture and Moxibustion (CAM)',
    author: 'Cheng Xinnong (Chief Editor)',
    publisherYear: 'Foreign Languages Press Beijing',
    category: 'cham_cuu_qt',
    categoryLabel: 'Châm Cứu Quốc Tế Kinh Điển',
    summary: 'Tác phẩm chuẩn mực được Tổ chức Y tế Thế giới (WHO) và các ủy ban châm cứu quốc tế công nhận toàn cầu, tiêu chuẩn vàng cho đào tạo châm cứu tại hơn 100 quốc gia.',
    coreConcepts: [
      'Tiêu chuẩn quốc tế danh pháp kinh huyệt',
      'Quy chuẩn kỹ thuật châm kim và cứu ngải (Moxibustion)',
      'Phác đồ điều trị 43 chứng bệnh được WHO khuyến nghị'
    ],
    clinicalValue: 'Tính chuẩn mực quốc tế cao nhất cho mọi chẩn đoán và phác đồ châm cứu.',
    keyTopics: ['Tiêu chuẩn WHO', 'Danh pháp quốc tế', 'Kỹ thuật châm và cứu']
  },
  {
    id: 'manual-of-acupuncture-deadman',
    title: 'A Manual of Acupuncture',
    author: 'Peter Deadman, Mazin Al-Khafaji, Kevin Baker',
    publisherYear: 'Journal of Chinese Medicine Publications',
    category: 'cham_cuu_qt',
    categoryLabel: 'Châm Cứu Quốc Tế Kinh Điển',
    summary: 'Bộ cẩm nang huyệt vị chi tiết và đẹp nhất thế giới: từng huyệt được minh họa giải phẫu 3D sắc nét, đường đi mạch máu - dây thần kinh, chiều sâu đâm kim an toàn và trích dẫn kinh điển.',
    coreConcepts: [
      'Mô tả giải phẫu từng lớp mô từ nông đến sâu của 361 huyệt chính kinh',
      'Các cảnh báo nguy hiểm: Màng phổi (Phế du, Khuyết bồn), động mạch, tủy sống',
      'Tổ hợp phối huyệt kinh điển qua các thời đại'
    ],
    clinicalValue: 'Bảo chứng an toàn tuyệt đối tránh châm tràn khí màng phổi hoặc tổn thương bó mạch thần kinh.',
    keyTopics: ['Giải phẫu lớp mô', 'Cảnh báo cấu trúc nguy hiểm', 'Tổ hợp huyệt kinh điển']
  },
  {
    id: 'lectures-tung-acupuncture-points',
    title: 'Lectures on Tung’s Acupuncture: Points Study',
    author: 'Dr. Wei-Chieh Young (Dương Duy Kiệt)',
    publisherYear: 'American College of Traditional Chinese Medicine',
    category: 'cham_cuu_qt',
    categoryLabel: 'Hệ Thống Đổng Thị Chuyên Sâu',
    summary: 'Nghiên cứu uyên thâm nhất về từng huyệt vị Đổng Thị của học trò xuất sắc nhất của Tôn sư Đổng Cảnh Xương. Giải mã lý thuyết Ứng Xương Bổ Xương, Ứng Nhục Bổ Nhục và phân vùng cơ thể.',
    coreConcepts: [
      'Thái Cực Toàn Tức Luật (Holographic correspondency)',
      'Khu 11 (Ngón tay) liên hệ toàn thân',
      'Khu 77 (Cẳng chân) giải phóng cột sống cổ và thắt lưng',
      'Khu 88 (Đùi) điều trị nội tạng'
    ],
    clinicalValue: 'Hiểu bản chất tại sao huyệt Đổng Thị lại có tác dụng tức thì chứ không chỉ ghi nhớ máy móc.',
    keyTopics: ['Toàn tức đồ', 'Vùng huyệt 11-88', 'Thái cực tương ứng']
  },
  {
    id: 'lectures-tung-acupuncture-therapeutic',
    title: 'Lectures on Tung’s Acupuncture: Therapeutic System',
    author: 'Dr. Wei-Chieh Young',
    publisherYear: 'American College of Traditional Chinese Medicine',
    category: 'cham_cuu_qt',
    categoryLabel: 'Hệ Thống Đổng Thị Chuyên Sâu',
    summary: 'Hệ thống hóa phác đồ điều trị lâm sàng theo Đổng Thị cho hàng trăm chứng bệnh: Từ viêm khớp thoái hóa, đau thần kinh tọa, đau đầu migraine đến tai biến và tim mạch.',
    coreConcepts: [
      'Phép chọn huyệt đối bên (Tả bệnh hữu thủ, Hữu bệnh tả thủ)',
      'Phép Động Khí: Bệnh nhân cử động vùng đau khi đang lưu kim',
      'Trích huyết liệu pháp (Bleeding technique) giải ứ trệ kinh lạc'
    ],
    clinicalValue: 'Cung cấp công thức điều trị "điểm huyệt" dứt điểm cơn đau nhanh nhất trong châm cứu học.',
    keyTopics: ['Chọn huyệt đối bên', 'Trích huyết liệu pháp', 'Chữa đau cấp tính']
  },
  {
    id: 'advanced-tung-acupuncture-vol8-orthopedics',
    title: 'Advanced Tung Style Acupuncture Vol. 8: Orthopedics',
    author: 'James H. Maher',
    publisherYear: 'MC Press',
    category: 'cham_cuu_qt',
    categoryLabel: 'Hệ Thống Đổng Thị Chuyên Sâu',
    summary: 'Chuyên sâu cơ xương khớp theo Đổng Thị: Thoát vị đĩa đệm, gai cột sống, viêm khớp gối, đông cứng khớp vai (Frozen shoulder), hội chứng ống cổ tay, đau gân gót Achilles.',
    coreConcepts: [
      'Phác đồ huyệt Thận Quan, Quang Minh trị khớp gối',
      'Tổ hợp Linh Cốt - Đại Bạch kết hợp Trung Cửu Lý trị thoát vị thắt lưng',
      'Định hướng châm phân theo tầng cân - cơ - màng xương'
    ],
    clinicalValue: 'Cứu cánh cho các ca bệnh cơ xương khớp mãn tính tái đi tái lại nhiều năm.',
    keyTopics: ['Thoát vị đĩa đệm', 'Thoái hóa khớp gối', 'Đông cứng khớp vai']
  },
  {
    id: 'advanced-tung-acupuncture-vol4-neurology',
    title: 'Advanced Tung Style Acupuncture Vol. 4: Neurology',
    author: 'James H. Maher',
    publisherYear: 'MC Press',
    category: 'cham_cuu_qt',
    categoryLabel: 'Hệ Thống Đổng Thị Chuyên Sâu',
    summary: 'Chuyên sâu thần kinh học theo Đổng Thị: Liệt mặt ngoại biên Bell’s Palsy, đau dây thần kinh tam thoa V, run Parkinson, di chứng đột quỵ liệt nửa người, chứng mất ngủ kinh niên.',
    coreConcepts: [
      'Khu huyệt Tam Trọng giải trừ ứ huyết thần kinh trung ương',
      'Huyệt Chính Hội, Tiền Hội định thần',
      'Cơ chế tái lập dẫn truyền thần kinh vận động'
    ],
    clinicalValue: 'Tối ưu hóa khả năng hồi phục tế bào thần kinh sau tổn thương.',
    keyTopics: ['Liệt thần kinh', 'Parkinson', 'Đau dây V', 'Di chứng đột quỵ']
  },
  {
    id: 'manuel-clinique-acupuncture-tung',
    title: 'Manuel Clinique d’Acupuncture Tung',
    author: 'Henry McCann & Hans-Georg Ross',
    publisherYear: 'Editions Haug',
    category: 'cham_cuu_qt',
    categoryLabel: 'Hệ Thống Đổng Thị Chuyên Sâu',
    summary: 'Tác phẩm nghiên cứu lâm sàng Đổng Thị bằng tiếng Pháp và Đức, kiểm nghiệm trên hàng ngàn bệnh nhân châu Âu với đánh giá khoa học khắt khe.',
    coreConcepts: [
      'Chuẩn hóa bản đồ huyệt Đổng Thị theo giải phẫu phương Tây',
      'Phác đồ châm cứu điều trị các bệnh lý lối sống hiện đại'
    ],
    clinicalValue: 'Chứng minh hiệu quả vượt biên giới của trường phái Đổng Thị trên người phương Tây.',
    keyTopics: ['Lâm sàng châu Âu', 'Giải phẫu đối chiếu', 'Chuẩn hóa thực nghiệm']
  },
  {
    id: 'principles-practice-acupuncture',
    title: 'Principles and Practice of Acupuncture',
    author: 'Felix Mann',
    publisherYear: 'Butterworth-Heinemann',
    category: 'cham_cuu_qt',
    categoryLabel: 'Châm Cứu Quốc Tế Kinh Điển',
    summary: 'Nghiên cứu của bác sĩ Felix Mann (Chủ tịch Hội Châm cứu Y khoa Hoàng gia Anh), người tiên phong diễn giải châm cứu dưới lăng kính phản xạ thần kinh của y học hiện đại.',
    coreConcepts: [
      'Phản xạ tạng - da (Viscero-somatic reflex)',
      'Điểm đau Trigger Points và mối liên hệ với A thị huyệt',
      'Kích thích thần kinh ngoại biên điều biến thần kinh tự chủ'
    ],
    clinicalValue: 'Cung cấp góc nhìn y khoa phương Tây giải thích tại sao châm huyệt lại tạo nên thay đổi sinh lý.',
    keyTopics: ['Trigger Points', 'Phản xạ thần kinh', 'Điều hòa thực vật']
  },
  {
    id: 'clinical-acupuncture-with-chart',
    title: 'Clinical Acupuncture With Chart',
    author: 'Anton Jayasuriya',
    publisherYear: 'Medicina Alternativa International',
    category: 'cham_cuu_qt',
    categoryLabel: 'Châm Cứu Quốc Tế Kinh Điển',
    summary: 'Tác phẩm thực hành lâm sàng nổi tiếng của GS. Anton Jayasuriya (Sri Lanka), đào tạo hơn 20.000 bác sĩ khắp năm châu về phác đồ phối hợp huyệt điều trị nhanh chóng.',
    coreConcepts: [
      'Sơ đồ châm cứu trực quan cho 100 bệnh chứng cấp bách',
      'Liệu pháp phản xạ tai (Nhĩ châm) phối hợp thể châm',
      'Kỹ thuật ấn huyệt cấp cứu'
    ],
    clinicalValue: 'Cực kỳ tiện lợi trong tra cứu cấp cứu lâm sàng và xử trí tức thời.',
    keyTopics: ['Bản đồ châm cứu', 'Xử trí cấp bách', 'Nhĩ châm']
  },
  {
    id: 'celestial-lancets',
    title: 'Celestial Lancets: A History and Rationale of Acupuncture and Moxa',
    author: 'Lu Gwei-Djen & Joseph Needham',
    publisherYear: 'Cambridge University Press',
    category: 'cham_cuu_qt',
    categoryLabel: 'Lịch Sử & Cơ Sở Khoa Học Cambridge',
    summary: 'Công trình vĩ đại của Đại học Cambridge, khảo cứu toàn diện lịch sử, triết học và cơ chế khoa học của châm cứu từ thời kỳ đồ đá, đồ đồng đến y học phân tử thế kỷ 20.',
    coreConcepts: [
      'Lịch sử hình thành hệ thống kinh lạc qua các triều đại',
      'Cơ sở triết học và vật lý của học thuyết Khí (Qi)',
      'Sự công nhận của khoa học phương Tây đối với châm cứu cổ truyền'
    ],
    clinicalValue: 'Khẳng định vị thế y học thực thụ và tính bác học sâu sắc của châm cứu trước cộng đồng y khoa thế giới.',
    keyTopics: ['Nghiên cứu Cambridge', 'Lịch sử khoa học YHCT', 'Bản chất của Khí']
  },
  {
    id: 'western-medical-acupuncture',
    title: 'An Introduction to Western Medical Acupuncture',
    author: 'Adrian White, Mike Cummings, Jacqueline Filshie',
    publisherYear: 'Elsevier Health Sciences',
    category: 'cham_cuu_qt',
    categoryLabel: 'Châm Cứu Y Khoa Phương Tây Thực Chứng',
    summary: 'Giáo trình chuẩn của Hội Châm Cứu Y Khoa Anh Quốc (BMAS): ứng dụng châm cứu dựa trên bằng chứng khoa học thần kinh (Evidence-Based Medicine), giải phóng endorphin, ức chế tín hiệu đau qua sừng sau tủy sống.',
    coreConcepts: [
      'Thuyết Cổng Kiểm Soát Đau (Gate Control Theory của Melzack & Wall)',
      'Giải phóng Opioid nội sinh: Endorphin, Enkephalin, Dynorphin',
      'Ức chế dẫn truyền qua sợi C truyền đau mạn tính',
      'Châm cơ bắp (Dry Needling) giải cơ co thắt'
    ],
    clinicalValue: 'Giúp các bác sĩ Tây y tự tin áp dụng châm cứu trong bệnh viện như một liệu pháp y khoa thực chứng không tác dụng phụ.',
    keyTopics: ['Gate Control Theory', 'Opioid nội sinh', 'Dry Needling', 'Thực chứng EBM']
  },
  {
    id: 'medical-acupuncture-western-approach',
    title: 'Medical Acupuncture: A Western Scientific Approach',
    author: 'Jacqueline Filshie, Adrian White, Mike Cummings',
    publisherYear: 'Elsevier',
    category: 'cham_cuu_qt',
    categoryLabel: 'Châm Cứu Y Khoa Phương Tây Thực Chứng',
    summary: 'Chuyên khảo toàn diện nhất về cơ chế thần kinh - thể dịch, hình ảnh học thần kinh fMRI não bộ khi châm kim, điều biến hệ thần kinh tự chủ giao cảm và phó giao cảm.',
    coreConcepts: [
      'fMRI ghi nhận sự thay đổi tưới máu vỏ não tại các vùng tương ứng khi kích thích huyệt',
      'Giảm nồng độ các chất trung gian gây viêm: IL-6, TNF-alpha, Substance P',
      'Điều hòa trục dưới đồi - tuyến yên - tuyến thượng thận (HPA axis)'
    ],
    clinicalValue: 'Giải thích cặn kẽ mọi câu hỏi "Tại sao châm kim lại có tác dụng?" bằng ngôn ngữ sinh học phân tử hiện đại.',
    keyTopics: ['fMRI não bộ', 'Giảm cytokine viêm', 'Trục HPA', 'Điều biến thần kinh']
  },
  {
    id: 'acupuncture-traditionnelle-chinoise',
    title: 'Acupuncture Traditionnelle Chinoise',
    author: 'Georges Soulié de Morant & GS. Chamfrault',
    publisherYear: 'Editions Maloine / Paris',
    category: 'cham_cuu_qt',
    categoryLabel: 'Châm Cứu Quốc Tế Kinh Điển',
    summary: 'Bộ chuyên khảo đồ sộ đưa nghệ thuật châm cứu phương Đông vào phương Tây sớm nhất thế kỷ 20, chuẩn hóa hệ thống đường kinh và chuyển ngữ chuẩn xác các khái niệm Khí, Huyết, Tinh, Thần sang hệ thống danh pháp khoa học Pháp.',
    coreConcepts: [
      'Khởi nguồn châm cứu học châu Âu từ thế kỷ 20',
      'Định vị chính xác hệ thống 12 chính kinh và kỳ kinh bát mạch theo mốc giải phẫu châu Âu',
      'Quy luật bù trừ năng lượng và tương ứng thần kinh tự chủ'
    ],
    clinicalValue: 'Chuẩn hóa nền tảng châm cứu học cho các hiệp hội y khoa Pháp, Thụy Sĩ và châu Âu.',
    keyTopics: ['Châm cứu châu Âu', 'Bát mạch kỳ kinh', 'Dẫn truyền năng lượng']
  },
  {
    id: 'coloured-atlas-acupressure',
    title: 'Coloured Atlas Of Acupressure',
    author: 'Dr. Roger Dalet',
    publisherYear: 'B. Jain Publishers / Sterling Publishers',
    category: 'cham_cuu_qt',
    categoryLabel: 'Bấm Huyệt & Tự Trị Liệu Không Kim',
    summary: 'Atlas ảnh màu giải phẫu thực hành bấm huyệt, chỉ rõ các vị trí huyệt yếu đạo trên cơ thể để bệnh nhân hoặc bác sĩ ấn huyệt trị đau đầu, mất ngủ, khó tiêu, đau lưng mà không cần kim châm.',
    coreConcepts: [
      'Bản đồ ảnh màu trực quan định vị huyệt vị trên cơ thể người thật',
      'Kỹ thuật day, ấn, bấm huyệt với lực thốn phù hợp',
      'Phác đồ tự cấp cứu: Hợp Cốc hạ sốt, Nội Quan chống buồn nôn say xe'
    ],
    clinicalValue: 'Cẩm nang trực quan cho bệnh nhân tự thực hành trị liệu an toàn tại nhà sau khi ra viện.',
    keyTopics: ['Atlas ảnh màu', 'Bấm huyệt không kim', 'Tự trị liệu gia đình']
  },
  {
    id: 'le-livre-pratique-acupression',
    title: 'Le livre pratique de l’acupression',
    author: 'Gérard Marx & Dr. Roger Dalet',
    publisherYear: 'Editions Marabout / Jouvence',
    category: 'cham_cuu_qt',
    categoryLabel: 'Bấm Huyệt & Tự Trị Liệu Không Kim',
    summary: 'Hướng dẫn thực hành bấm huyệt trị liệu lâm sàng bằng tiếng Pháp cho hơn 80 triệu chứng bệnh thường nhật: Căng thẳng, trầm cảm nhẹ, mỏi mắt, rối loạn tiêu hóa, đau bụng kinh.',
    coreConcepts: [
      'Phương pháp Shiatsu và Acupressure phối hợp Đông - Tây Y',
      'Định thời gian kích thích huyệt vị (30 giây - 2 phút)',
      'Điều hòa nhịp thở trong lúc ấn huyệt để tăng lưu lượng tuần hoàn máu'
    ],
    clinicalValue: 'Giúp giải quyết nhanh các cơn đau cấp tính mà không gây sợ hãi kim châm cho người bệnh.',
    keyTopics: ['Thực hành Acupressure', 'Cắt cơn đau cấp', 'Thư giãn cơ bắp']
  },

  // Nhóm 4: Sách Tây Y & Y Khoa Cơ Sở
  {
    id: 'guyton-and-hall-physiology',
    title: 'Guyton and Hall Textbook of Medical Physiology',
    originalTitle: 'Guyton and Hall Textbook of Medical Physiology (15th Edition)',
    author: 'John E. Hall, Michael E. Hall',
    publisherYear: 'Elsevier (15th Edition)',
    category: 'tay_y_co_so',
    categoryLabel: 'Tây Y & Sinh Lý Học Lâm Sàng',
    summary: 'Kinh thánh sinh lý học của y khoa hiện đại toàn thế giới: Cơ chế hoạt động của tế bào, màng điện thế, điện giải, huyết động học tim mạch, cơ chế hô hấp, lọc cầu thận, nội tiết và điều hòa nội môi (Homeostasis).',
    coreConcepts: [
      'Khái niệm Nội Môi (Homeostasis) - Tương đồng tuyệt đối với thế cân bằng Âm Dương của Đông Y',
      'Huyết động học: Cung lượng tim, tiền tải, hậu tải, sức cản ngoại vi',
      'Cơ chế vận chuyển màng và cân bằng điện giải Natri - Kali - Canxi',
      'Hệ thần kinh tự chủ giao cảm - phó giao cảm và điều hòa huyết áp',
      'Cân bằng toan kiềm máu (pH 7.35 - 7.45)'
    ],
    clinicalValue: 'Cung cấp cơ sở khoa học chính xác để kiểm soát sinh hiệu, hiểu rõ diễn tiến bệnh lý và tránh các chỉ định sai lầm gây rối loạn nội môi tử vong.',
    coverImage: '/assets/aistudio/Screenshot_20261108_225807_Google_291b1329.jpg',
    keyTopics: ['Cân bằng nội môi Homeostasis', 'Huyết động học', 'Thần kinh tự chủ', 'Sinh lý thận & Điện giải']
  },
  {
    id: 'essentials-of-nutrition',
    title: 'Essentials of Nutrition in Medicine and Healthcare: A Practical Guide',
    author: 'Sumantra Ray, Mariana Markell',
    publisherYear: 'Elsevier ASIA',
    category: 'tay_y_co_so',
    categoryLabel: 'Tây Y & Dinh Dưỡng Lâm Sàng',
    summary: 'Hướng dẫn thực hành dinh dưỡng y khoa chuyên sâu: Chuyển hóa chất đạm, béo, đường, vi chất dinh dưỡng, dinh dưỡng trị liệu cho tiểu đường, suy thận, bệnh tim mạch, viêm ruột và tương tác giữa thuốc và thực phẩm.',
    coreConcepts: [
      'Chỉ số đường huyết GI & Tải lượng đường GL trong kiểm soát đái tháo đường',
      'Cân bằng Natri/Kali/Magiê trong kiểm soát tăng huyết áp',
      'Hệ vi sinh đường ruột (Gut Microbiome) và trục Não - Ruột (Gut-Brain Axis)',
      'Tương tác nguy hiểm giữa dược liệu/thuốc Tây và các nhóm thực phẩm'
    ],
    clinicalValue: 'Hoàn thiện phác đồ trị liệu "Y thực đồng nguyên": Kết hợp món ăn bài thuốc Đông y với tính toán calo và vi chất Tây y hiện đại.',
    coverImage: '/assets/aistudio/Screenshot_20261108_225807_Google_291b1329.jpg',
    keyTopics: ['Chỉ số GI/GL', 'Trục Não - Ruột', 'Tương tác thuốc - thức ăn', 'Dinh dưỡng lâm sàng']
  },
  {
    id: 'thuat-ngu-tieng-anh-chuyen-nganh-y-khoa',
    title: 'Thuật Ngữ Tiếng Anh Chuyên Ngành Y Khoa Cho Người Mới Bắt Đầu',
    author: 'ThS. BS. Nguyễn Thái Duy',
    publisherYear: 'NXB Y Học',
    category: 'tay_y_co_so',
    categoryLabel: 'Tây Y & Thuật Ngữ Y Khoa Quốc Tế',
    summary: 'Cẩm nang giải mã cấu trúc thuật ngữ Y khoa quốc tế (Tiền tố Prefix, Gốc từ Root, Hậu tố Suffix). Giúp tra cứu triệu chứng, bệnh án quốc tế, mã ICD-10 và đối chiếu chuẩn xác với thuật ngữ Y học cổ truyền (TCM vs Allopathic Medicine).',
    coreConcepts: [
      'Quy luật ghép từ y khoa quốc tế theo gốc Hy Lạp và Latinh',
      'Thuật ngữ giải phẫu học, triệu chứng học và danh pháp bệnh học quốc tế',
      'Đối chiếu chuẩn song ngữ các hội chứng: Hypertensive urgency vs Can dương thượng kháng; Gastritis vs Tỳ vị hư hàn'
    ],
    clinicalValue: 'Giúp y bác sĩ đọc hiểu tài liệu quốc tế, liên thông kết quả khám Tây Y và Đông Y mà không bị nhầm lẫn thuật ngữ.',
    coverImage: '/assets/aistudio/Screenshot_20261108_225807_Google_291b1329.jpg',
    keyTopics: ['Cấu trúc từ Y khoa', 'Mã ICD-10', 'Đối chiếu Đông - Tây Y', 'Anh ngữ lâm sàng']
  },

  // --- NHÓM 5: SÁCH THUỐC TÂY Y THEO TỪNG CHỨNG BỆNH (TIẾNG VIỆT) ---
  {
    id: 'duoc-thu-quoc-gia-viet-nam',
    title: 'Dược thư Quốc gia Việt Nam',
    originalTitle: 'Vietnamese National Pharmacopoeia (Ban hành bởi Bộ Y tế)',
    author: 'Hội đồng Dược thư Quốc gia Việt Nam - Bộ Y tế',
    publisherYear: 'NXB Y Học (Tái bản có sửa đổi bổ sung)',
    category: 'duoc_thu_vn',
    categoryLabel: 'Sách Thuốc Tây Y Tiếng Việt',
    summary: 'Bộ văn bản pháp quy khoa học y dược chính thống và cao nhất của Việt Nam do Bộ Y tế ban hành, chuẩn hóa toàn diện thông tin về hoạt chất, chỉ định, liều lượng, cách dùng, chống chỉ định, tương tác thuốc và xử trí ngộ độc.',
    coreConcepts: [
      'Chỉ định và chống chỉ định tuyệt đối theo luật khám chữa bệnh Việt Nam',
      'Liều lượng chuẩn cho người lớn, trẻ em và người suy giảm chức năng gan/thận',
      'Bảng tương tác thuốc lâm sàng phân mức độ (chống chỉ định, thận trọng, theo dõi)',
      'Dược động học: Sinh khả dụng, gắn kết protein huyết tương, chuyển hóa gan CYP450 và bài xuất thận'
    ],
    clinicalValue: 'Chuẩn mực tối thượng cho việc kê đơn thuốc Tây y an toàn tại mọi bệnh viện và phòng khám tại Việt Nam.',
    coverImage: '/assets/aistudio/Screenshot_20261109_000117_Google_98d5fc36.jpg',
    keyTopics: ['Dược thư quốc gia', 'Hoạt chất thiết yếu', 'Tương tác thuốc', 'Liều dùng chuẩn']
  },
  {
    id: 'duoc-lam-sang-va-dieu-tri-khoi-trang',
    title: 'Dược lâm sàng và Điều trị',
    author: 'PGS. TS. Nguyễn Ngọc Khôi, TS. Đặng Nguyễn Đoan Trang',
    publisherYear: 'NXB Y Học - Khoa Dược ĐH Y Dược TP.HCM',
    category: 'duoc_thu_vn',
    categoryLabel: 'Sách Thuốc Tây Y Tiếng Việt',
    summary: 'Giáo trình thực hành dược lâm sàng hiện đại đào tạo dược sĩ chuyên khoa: Đánh giá ca bệnh, xây dựng kế hoạch chăm sóc dược, tối ưu hóa nồng độ thuốc trị liệu (TDM) và giải quyết các vấn đề liên quan đến thuốc (DRPs).',
    coreConcepts: [
      'Quy trình đánh giá ca bệnh SOAP và quản lý trị liệu bằng thuốc (MTM)',
      'Phác đồ cá thể hóa liều dùng cho bệnh nhân đặc biệt (suy thận, người cao tuổi, phụ nữ có thai)',
      'Nhận diện và phòng ngừa phản ứng có hại của thuốc (ADR)'
    ],
    clinicalValue: 'Giúp chuyển đổi kiến thức dược lý lý thuyết thành phác đồ dùng thuốc cụ thể, giảm tối đa tác dụng phụ trên giường bệnh.',
    coverImage: '/assets/aistudio/Screenshot_20261109_000117_Google_98d5fc36.jpg',
    keyTopics: ['Dược lâm sàng', 'Kế hoạch chăm sóc dược', 'Cá thể hóa liều dùng', 'Quản lý DRPs']
  },
  {
    id: 'duoc-lam-sang-hoang-thi-kim-huyen',
    title: 'Dược lâm sàng',
    author: 'GS. TS. Hoàng Thị Kim Huyền',
    publisherYear: 'NXB Y Học - ĐH Dược Hà Nội',
    category: 'duoc_thu_vn',
    categoryLabel: 'Sách Thuốc Tây Y Tiếng Việt',
    summary: 'Bộ sách giáo khoa nền tảng hàng đầu về Dược lâm sàng tại Việt Nam, phân tích chi tiết cơ chế tác dụng, dược động học lâm sàng và nguyên tắc phối hợp thuốc an toàn, hợp lý, hiệu quả.',
    coreConcepts: [
      'Nguyên tắc sử dụng thuốc hợp lý theo WHO',
      'Dược động học lâm sàng ứng dụng: Thể tích phân bố Vd, độ thanh thải Cl, nửa đời thải trừ t1/2',
      'Sử dụng kháng sinh hợp lý và quản lý đề kháng kháng sinh (Antimicrobial Stewardship)'
    ],
    clinicalValue: 'Cung cấp cơ sở khoa học để lựa chọn đúng thuốc cho đúng người bệnh với chi phí tối ưu nhất.',
    coverImage: '/assets/aistudio/Screenshot_20261109_000117_Google_98d5fc36.jpg',
    keyTopics: ['Dược lâm sàng cơ bản', 'Nguyên tắc sử dụng thuốc', 'Dược động học ứng dụng']
  },
  {
    id: 'duoc-ly-hoc-dai-hoc-y-ha-noi',
    title: 'Dược lý học (Đào tạo Bác sĩ đa khoa) - Đại học Y Hà Nội',
    author: 'GS. TS. Đào Văn Phan (Chủ biên)',
    publisherYear: 'NXB Y Học',
    category: 'duoc_thu_vn',
    categoryLabel: 'Sách Thuốc Tây Y Tiếng Việt',
    summary: 'Giáo trình cốt lõi giảng dạy Dược lý học cho các thế hệ Bác sĩ đa khoa Đại học Y Hà Nội: Phân loại nhóm thuốc, thụ thể phân tử, tác dụng dược lý, độc tính và áp dụng điều trị lâm sàng.',
    coreConcepts: [
      'Cơ chế tác động lên thụ thể phân tử: Thụ thể liên kết G-protein, kênh ion, enzym kinase',
      'Dược lý thần kinh tự chủ: Thuốc cường/hủy giao cảm, thuốc cường/hủy phó giao cảm',
      'Dược lý hệ tim mạch, nội tiết, kháng sinh và thuốc giảm đau kháng viêm NSAID/Corticoid'
    ],
    clinicalValue: 'Trang bị tư duy dược lý học cơ bản vững chắc để bác sĩ hiểu sâu sắc vì sao một loại thuốc lại chữa được bệnh và gây ra những phản ứng phụ nào.',
    coverImage: '/assets/aistudio/Screenshot_20261109_000117_Google_98d5fc36.jpg',
    keyTopics: ['Dược lý học ĐH Y Hà Nội', 'Cơ chế phân tử', 'Hệ thần kinh thực vật', 'Dược lý tim mạch & Kháng sinh']
  },
  {
    id: 'duoc-ly-hoc-dai-hoc-y-duoc-tphcm',
    title: 'Dược lý học - Đại học Y Dược TP.HCM',
    author: 'PGS. TS. Mai Phương Mai (Chủ biên)',
    publisherYear: 'NXB Y Học',
    category: 'duoc_thu_vn',
    categoryLabel: 'Sách Thuốc Tây Y Tiếng Việt',
    summary: 'Giáo trình dược lý kinh điển của Đại học Y Dược TP.HCM, cập nhật kiến thức dược lý hiện đại theo xu hướng quốc tế, phân tích sâu các nhóm thuốc tim mạch, chuyển hóa, thần kinh và hóa trị liệu ung thư.',
    coreConcepts: [
      'Dược lý học đại cương và chuyên khoa',
      'Các đích tác dụng phân tử của thuốc và biến đổi biểu hiện gen',
      'Độc chất học lâm sàng và xử trí cấp cứu quá liều thuốc'
    ],
    clinicalValue: 'Hỗ trợ thực hành lâm sàng cho bác sĩ đa khoa và chuyên khoa các tỉnh phía Nam theo chuẩn quốc tế.',
    coverImage: '/assets/aistudio/Screenshot_20261109_000117_Google_98d5fc36.jpg',
    keyTopics: ['Dược lý ĐHYD TP.HCM', 'Đích phân tử', 'Dược lý chuyên khoa']
  },
  {
    id: 'huong-dan-dieu-tri-noi-khoa-bach-mai',
    title: 'Hướng dẫn chẩn đoán và điều trị bệnh nội khoa - Bệnh viện Bạch Mai',
    author: 'Hội đồng Khoa học Bệnh viện Bạch Mai',
    publisherYear: 'NXB Y Học (Tái bản cập nhật)',
    category: 'duoc_thu_vn',
    categoryLabel: 'Sách Thuốc Tây Y Tiếng Việt',
    summary: 'Bộ cẩm nang thực hành lâm sàng của bệnh viện đa khoa tuyến cuối lớn nhất miền Bắc: Hướng dẫn chẩn đoán phân biệt, chỉ định cận lâm sàng và phác đồ điều trị chi tiết theo từng ngày nằm viện cho các bệnh lý tim mạch, hô hấp, tiêu hóa, thận tiết niệu, cơ xương khớp.',
    coreConcepts: [
      'Phác đồ điều trị theo từng bước (Step-by-step guideline) của tuyến Trung ương',
      'Tiêu chuẩn nhập viện, xuất viện và chuyển tuyến',
      'Phác đồ kháng sinh kinh nghiệm và điều trị đích các bệnh lý nan y'
    ],
    clinicalValue: 'Kim chỉ nam thực tiễn cứu sống người bệnh trong các ca bệnh nặng, cấp cứu và phức tạp.',
    coverImage: '/assets/aistudio/Screenshot_20261109_000117_Google_98d5fc36.jpg',
    keyTopics: ['Phác đồ BV Bạch Mai', 'Nội khoa tuyến cuối', 'Điều trị nội trú', 'Cấp cứu nội khoa']
  },
  {
    id: 'phac-do-dieu-tri-cho-ray',
    title: 'Phác đồ điều trị Nội khoa - Bệnh viện Chợ Rẫy',
    author: 'Hội đồng Khoa học Bệnh viện Chợ Rẫy TP.HCM',
    publisherYear: 'NXB Y Học',
    category: 'duoc_thu_vn',
    categoryLabel: 'Sách Thuốc Tây Y Tiếng Việt',
    summary: 'Phác đồ điều trị chuẩn mực của trung tâm y tế hàng đầu phía Nam: Hướng dẫn điều trị cơn tăng huyết áp cấp cứu, sốc nhiễm khuẩn, viêm tụy cấp, đột quỵ thiếu máu não cấp, xuất huyết tiêu hóa và suy thận cấp.',
    coreConcepts: [
      'Quy trình hồi sức cấp cứu và xử trí giờ vàng',
      'Liều lượng thuốc tĩnh mạch liên tục và hiệu chỉnh theo khí máu động học',
      'Đa mô thức phối hợp thuốc trong bệnh viện đa khoa'
    ],
    clinicalValue: 'Cung cấp hướng dẫn hành động nhanh, chuẩn xác và giảm tỷ lệ tử vong tối đa trong điều trị nội khoa.',
    coverImage: '/assets/aistudio/Screenshot_20261109_000117_Google_98d5fc36.jpg',
    keyTopics: ['Phác đồ BV Chợ Rẫy', 'Hồi sức cấp cứu', 'Giờ vàng đột quỵ & tim mạch']
  },
  {
    id: 'mims-viet-nam',
    title: 'Sổ tay Sử dụng thuốc MIMS Việt Nam',
    originalTitle: 'Monthly Index of Medical Specialities (MIMS Vietnam)',
    author: 'MIMS Asia Editorial Board',
    publisherYear: 'MIMS Publishing (Cập nhật định kỳ)',
    category: 'duoc_thu_vn',
    categoryLabel: 'Sách Thuốc Tây Y Tiếng Việt',
    summary: 'Cẩm nang tra cứu thuốc biệt dược và hoạt chất lưu hành phổ biến nhất tại Việt Nam: Tên biệt dược, nhà sản xuất, dạng bào chế, hàm lượng, chỉ định, liều dùng và chống chỉ định tóm tắt nhanh tại giường bệnh.',
    coreConcepts: [
      'Tra cứu nhanh tên thương mại và hoạt chất lưu hành tại các nhà thuốc Việt Nam',
      'Dạng bào chế đặc biệt: Phóng thích kéo dài XR, bao tan ở ruột EC, viên sủi',
      'Thông tin bảo hiểm y tế và phân loại nhóm thuốc'
    ],
    clinicalValue: 'Giúp y bác sĩ kê đơn nhanh với tên biệt dược thực tế có bán tại các nhà thuốc và bệnh viện.',
    coverImage: '/assets/aistudio/Screenshot_20261109_000117_Google_98d5fc36.jpg',
    keyTopics: ['MIMS Việt Nam', 'Biệt dược lưu hành', 'Tra cứu nhanh', 'Dạng bào chế']
  },
  {
    id: 'vidal-viet-nam',
    title: 'Từ điển thuốc Vidal Việt Nam',
    originalTitle: 'Dictionnaire Vidal Vietnam',
    author: 'Vidal Group',
    publisherYear: 'NXB Y Học / Vidal',
    category: 'duoc_thu_vn',
    categoryLabel: 'Sách Thuốc Tây Y Tiếng Việt',
    summary: 'Bộ từ điển dược phẩm chuyên khảo toàn diện tiêu chuẩn Pháp - Việt: Chuyên luận chi tiết từng biệt dược lưu hành tại Việt Nam, thông số dược động học, thử nghiệm lâm sàng và cảnh báo an toàn thuốc.',
    coreConcepts: [
      'Chuyên luận đầy đủ theo tiêu chuẩn Dược điển Châu Âu và Việt Nam',
      'Cảnh báo tương kỵ thuốc dạng tiêm truyền',
      'Độ an toàn trên phụ nữ mang thai (Phân loại FDA thai kỳ: A, B, C, D, X)'
    ],
    clinicalValue: 'Nguồn tham chiếu tin cậy tuyệt đối khi cần kiểm tra chuyên sâu về một biệt dược cụ thể.',
    coverImage: '/assets/aistudio/Screenshot_20261109_000117_Google_98d5fc36.jpg',
    keyTopics: ['Từ điển Vidal', 'Chuyên luận biệt dược', 'An toàn thai kỳ', 'Dược điển Châu Âu']
  },

  // --- NHÓM 6: SÁCH THUỐC TÂY Y THEO TỪNG CHỨNG BỆNH (QUỐC TẾ) ---
  {
    id: 'dipiro-pharmacotherapy',
    title: 'Pharmacotherapy: A Pathophysiologic Approach',
    originalTitle: 'Pharmacotherapy: A Pathophysiologic Approach (12th Edition)',
    author: 'Joseph T. DiPiro, Gary C. Yee, L. Michael Posey et al.',
    publisherYear: 'McGraw-Hill Medical (12th Edition)',
    category: 'duoc_lam_sang_qt',
    categoryLabel: 'Sách Thuốc Tây Y Quốc Tế',
    summary: 'Được mệnh danh là "Kinh thánh của Dược lý điều trị học" thế giới: Tích hợp chặt chẽ giữa sinh lý bệnh học (Pathophysiology) với lựa chọn thuốc điều trị dựa trên y học chứng cứ (Evidence-based medicine) cho mọi hệ cơ quan.',
    coreConcepts: [
      'Mối liên hệ nhân quả giữa cơ chế bệnh sinh học tế bào và điểm đích điều trị của thuốc',
      'Phác đồ điều trị bậc thang và tiêu chí đánh giá đáp ứng lâm sàng',
      'Dược cảnh giác (Pharmacovigilance) và quản lý kết quả điều trị của bệnh nhân'
    ],
    clinicalValue: 'Chuẩn mực đào tạo Dược trị liệu tại tất cả các trường Y Dược hàng đầu thế giới.',
    coverImage: '/assets/aistudio/Screenshot_20261109_000130_Google_cc8e860a.jpg',
    keyTopics: ['DiPiro Pharmacotherapy', 'Dược trị liệu học', 'Y học chứng cứ', 'Sinh lý bệnh học điều trị']
  },
  {
    id: 'koda-kimble-applied-therapeutics',
    title: "Koda-Kimble and Young's Applied Therapeutics: The Clinical Use of Drugs",
    originalTitle: "Koda-Kimble and Young's Applied Therapeutics (11th Edition)",
    author: 'Brian K. Alldredge, Robin L. Corelli, Michael E. Ernst et al.',
    publisherYear: 'Wolters Kluwer Health',
    category: 'duoc_lam_sang_qt',
    categoryLabel: 'Sách Thuốc Tây Y Quốc Tế',
    summary: 'Bộ sách Dược trị liệu ứng dụng kinh điển trình bày hoàn toàn dưới dạng "Hỏi - Đáp ca lâm sàng thực tế" (Case-based Approach): Hướng dẫn giải quyết các bài toán dùng thuốc nan giải và phức tạp trên từng bệnh nhân cụ thể.',
    coreConcepts: [
      'Phương pháp học tập dựa trên tình huống lâm sàng (Problem-based learning)',
      'Giải quyết xung đột giữa các bệnh lý đồng mắc (Multimorbidity)',
      'Kế hoạch theo dõi điều trị (Monitoring plan) với các chỉ số mục tiêu cụ thể'
    ],
    clinicalValue: 'Dạy cho người thầy thuốc nghệ thuật ứng biến lâm sàng khi bệnh nhân mắc nhiều bệnh cùng lúc.',
    coverImage: '/assets/aistudio/Screenshot_20261109_000130_Google_cc8e860a.jpg',
    keyTopics: ['Applied Therapeutics', 'Koda-Kimble', 'Ca lâm sàng thực tế', 'Đa bệnh lý đồng mắc']
  },
  {
    id: 'goodman-and-gilman-pharmacology',
    title: "Goodman & Gilman's: The Pharmacological Basis of Therapeutics",
    originalTitle: "Goodman & Gilman's: The Pharmacological Basis of Therapeutics (14th Edition)",
    author: 'Laurence L. Brunton, Randa Hilal-Dandan, Björn C. Knollmann',
    publisherYear: 'McGraw-Hill Medical (14th Edition)',
    category: 'duoc_lam_sang_qt',
    categoryLabel: 'Sách Thuốc Tây Y Quốc Tế',
    summary: 'Tác phẩm đỉnh cao được tôn vinh là "Blue Bible" (Kinh thánh xanh) của ngành Dược lý học toàn cầu kể từ năm 1941: Phân tích cơ chế tác động của thuốc ở cấp độ thụ thể, phân tử, sinh học cấu trúc và di truyền học dược lý (Pharmacogenomics).',
    coreConcepts: [
      'Tương tác thuốc - thụ thể ở mức độ tinh vi nhất (Agonist, Antagonist, Inverse agonist)',
      'Di truyền học dược lý: Đột biến gen chuyển hóa thuốc (CYP2D6, CYP2C19) ảnh hưởng đến hiệu quả thuốc',
      'Động học phân tử và quá trình phát triển thuốc mới'
    ],
    clinicalValue: 'Nguồn tài liệu tham khảo sâu sắc nhất giúp giải thích tận gốc rễ cơ chế của từng phân tử thuốc.',
    coverImage: '/assets/aistudio/Screenshot_20261109_000130_Google_cc8e860a.jpg',
    keyTopics: ['Goodman & Gilman', 'Dược lý phân tử', 'Di truyền học dược lý', 'Kinh thánh dược lý']
  },
  {
    id: 'katzung-basic-and-clinical-pharmacology',
    title: 'Basic and Clinical Pharmacology',
    originalTitle: 'Basic and Clinical Pharmacology (15th Edition)',
    author: 'Bertram G. Katzung, Todd W. Vanderah',
    publisherYear: 'McGraw-Hill / Lange Medical',
    category: 'duoc_lam_sang_qt',
    categoryLabel: 'Sách Thuốc Tây Y Quốc Tế',
    summary: 'Giáo trình Dược lý học cơ bản và lâm sàng phổ biến nhất trong hệ thống đào tạo y khoa Hoa Kỳ và USMLE: Bảng tóm tắt nhóm thuốc sắc bén, sơ đồ cơ chế rõ ràng và nhấn mạnh vào ứng dụng điều trị trực tiếp.',
    coreConcepts: [
      'Nguyên lý Dược lực học (Pharmacodynamics) và Dược động học (Pharmacokinetics)',
      'Hệ thống bảng tóm tắt thuốc (Summary tables) với liều lượng và độc tính chính',
      'Ứng dụng thi chứng chỉ hành nghề y khoa quốc tế USMLE Step 1 & Step 2'
    ],
    clinicalValue: 'Cực kỳ súc tích, dễ nhớ, phục vụ đắc lực cho việc đưa ra quyết định kê đơn lâm sàng nhanh.',
    coverImage: '/assets/aistudio/Screenshot_20261109_000130_Google_cc8e860a.jpg',
    keyTopics: ['Katzung Pharmacology', 'Lange Medical', 'USMLE Review', 'Dược lực học & Động học']
  },
  {
    id: 'lippincott-illustrated-pharmacology',
    title: 'Lippincott Illustrated Reviews: Pharmacology',
    originalTitle: 'Lippincott Illustrated Reviews: Pharmacology (8th Edition)',
    author: 'Karen Whalen',
    publisherYear: 'Wolters Kluwer (8th Edition)',
    category: 'duoc_lam_sang_qt',
    categoryLabel: 'Sách Thuốc Tây Y Quốc Tế',
    summary: 'Tác phẩm nổi tiếng với hàng nghìn sơ đồ minh họa cơ chế trực quan sinh động màu sắc, giúp thị giác hóa các con đường chuyển hóa, cơ chế thụ thể và tác dụng phụ của thuốc trong cơ thể con người.',
    coreConcepts: [
      'Minh họa hình ảnh trực quan cơ chế tác dụng sinh học',
      'Sơ đồ đường đi của thuốc trong các cơ quan đích',
      'Ghi nhớ nhanh các điểm mấu chốt lâm sàng (Clinical Pearl)'
    ],
    clinicalValue: 'Giúp người đọc thấu hiểu tức thì cơ chế hoạt động phức tạp của thuốc chỉ qua một ánh nhìn.',
    coverImage: '/assets/aistudio/Screenshot_20261109_000130_Google_cc8e860a.jpg',
    keyTopics: ['Lippincott Pharmacology', 'Minh họa trực quan', 'Sơ đồ cơ chế', 'Thị giác hóa dược lý']
  },
  {
    id: 'rang-and-dale-pharmacology',
    title: "Rang & Dale's Pharmacology",
    originalTitle: "Rang & Dale's Pharmacology (9th Edition)",
    author: 'Humphrey P. Rang, James M. Ritter, Rod J. Flower, Graeme Henderson',
    publisherYear: 'Elsevier Health Sciences',
    category: 'duoc_lam_sang_qt',
    categoryLabel: 'Sách Thuốc Tây Y Quốc Tế',
    summary: 'Tác phẩm Dược lý học hàng đầu của Vương quốc Anh và Châu Âu: Nổi tiếng với văn phong khoa học uyên bác, phân tích sâu các kênh ion, hệ miễn dịch học và dược lý sinh học hiện đại.',
    coreConcepts: [
      'Kênh ion và vận chuyển màng sinh học',
      'Dược lý miễn dịch và thuốc sinh học (Biologics, kháng thể đơn dòng Monoclonal antibodies)',
      'Hệ thống truyền tin nội bào thứ hai (cAMP, IP3/DAG, cGMP)'
    ],
    clinicalValue: 'Chuẩn mực châu Âu về dược lý học tích hợp giữa nghiên cứu cơ bản và ứng dụng giường bệnh.',
    coverImage: '/assets/aistudio/Screenshot_20261109_000130_Google_cc8e860a.jpg',
    keyTopics: ['Rang & Dale', 'Dược lý Anh Quốc', 'Thuốc sinh học Biologics', 'Kênh ion']
  },
  {
    id: 'the-washington-manual-therapeutics',
    title: 'The Washington Manual of Medical Therapeutics',
    originalTitle: 'The Washington Manual of Medical Therapeutics (36th Edition)',
    author: 'Zachary Crees, Cassandra Fritz, et al. (Washington University in St. Louis)',
    publisherYear: 'Wolters Kluwer',
    category: 'duoc_lam_sang_qt',
    categoryLabel: 'Sách Thuốc Tây Y Quốc Tế',
    summary: 'Cuốn sổ tay áo blouse trắng bỏ túi không thể thiếu của các bác sĩ nội trú Mỹ và quốc tế: Cung cấp thuật toán điều trị nhanh, liều dùng cụ thể từng loại thuốc trong cấp cứu và điều trị nội khoa tại giường bệnh.',
    coreConcepts: [
      'Thuật toán chẩn đoán và điều trị nhanh tại khoa cấp cứu và ICU',
      'Phác đồ truyền dịch, cân bằng điện giải và kiểm soát sốc',
      'Bảng liều thuốc cấp cứu chính xác đến từng milligram'
    ],
    clinicalValue: 'Công cụ tra cứu thực chiến số 1 khi đối mặt với các tình huống cấp cứu khẩn cấp.',
    coverImage: '/assets/aistudio/Screenshot_20261109_000130_Google_cc8e860a.jpg',
    keyTopics: ['Washington Manual', 'Bác sĩ nội trú Mỹ', 'Thuật toán điều trị', 'Cấp cứu nội khoa']
  },
  {
    id: 'the-sanford-guide-antimicrobial',
    title: 'The Sanford Guide to Antimicrobial Therapy',
    author: 'David N. Gilbert, Henry F. Chambers, Michael S. Saag et al.',
    publisherYear: 'Antimicrobial Therapy, Inc. (54th Edition)',
    category: 'duoc_lam_sang_qt',
    categoryLabel: 'Sách Thuốc Tây Y Quốc Tế',
    summary: 'Cẩm nang hướng dẫn điều trị kháng sinh, kháng nấm, kháng virus và ký sinh trùng uy tín và chuẩn mực nhất toàn cầu, được các bệnh viện khắp thế giới sử dụng để chống lại vi khuẩn đa kháng thuốc.',
    coreConcepts: [
      'Lựa chọn kháng sinh ban đầu theo kinh nghiệm (Empiric antimicrobial therapy)',
      'Kháng sinh đồ (Antibiogram) và cơ chế kháng kháng sinh (MRSA, VRE, ESBL, CRE)',
      'Hiệu chỉnh liều kháng sinh theo chức năng lọc cầu thận (eGFR) và lọc máu liên tục (CRRT)'
    ],
    clinicalValue: 'Vũ khí quyết định trong cuộc chiến chống nhiễm trùng và cứu sống bệnh nhân nhiễm trùng huyết.',
    coverImage: '/assets/aistudio/Screenshot_20261109_000130_Google_cc8e860a.jpg',
    keyTopics: ['Sanford Guide', 'Kháng sinh liệu pháp', 'Chống vi khuẩn đa kháng', 'Nhiễm khuẩn huyết']
  },
  {
    id: 'lexicomp-drug-information-handbook',
    title: 'Lexicomp Drug Information Handbook',
    author: 'American Pharmacists Association (APhA) / Wolters Kluwer',
    publisherYear: 'Wolters Kluwer Clinical Drug Information',
    category: 'duoc_lam_sang_qt',
    categoryLabel: 'Sách Thuốc Tây Y Quốc Tế',
    summary: 'Cơ sở dữ liệu dược học lâm sàng tra cứu toàn diện được tích hợp trong phần mềm UpToDate: Chuyên luận từng hoạt chất với mức độ bằng chứng cao nhất về tương tác thuốc, độc tính và điều chỉnh liều suy tạng.',
    coreConcepts: [
      'Hệ thống phân loại mức độ tương tác thuốc Lexicomp (Thang điểm A, B, C, D, X)',
      'Dược động học chi tiết và nồng độ thuốc trong huyết tương',
      'Độ an toàn thuốc trong thai kỳ và thời kỳ cho con bú theo chuẩn LactMed'
    ],
    clinicalValue: 'Công cụ tra cứu tương tác thuốc tin cậy nhất được bác sĩ và dược sĩ lâm sàng toàn cầu tra cứu hàng ngày.',
    coverImage: '/assets/aistudio/Screenshot_20261109_000130_Google_cc8e860a.jpg',
    keyTopics: ['Lexicomp', 'UpToDate Dược học', 'Tương tác thuốc A-B-C-D-X', 'An toàn dùng thuốc']
  },
  {
    id: 'british-national-formulary-bnf',
    title: 'British National Formulary (BNF)',
    author: 'Joint Formulary Committee (British Medical Association & Royal Pharmaceutical Society)',
    publisherYear: 'BMJ Group and Pharmaceutical Press (BNF 87)',
    category: 'duoc_lam_sang_qt',
    categoryLabel: 'Sách Thuốc Tây Y Quốc Tế',
    summary: 'Dược thư Quốc gia Anh Quốc - Tiêu chuẩn vàng độc lập về hướng dẫn kê đơn và sử dụng thuốc của hệ thống Y tế Quốc gia Anh (NHS): Thẩm định nghiêm ngặt về hiệu quả lâm sàng, tính an toàn và chi phí điều trị.',
    coreConcepts: [
      'Hướng dẫn kê đơn lâm sàng dựa trên bằng chứng của Dịch vụ Y tế Quốc gia Anh (NHS)',
      'Chỉ số an toàn, tác dụng không mong muốn và chống chỉ định',
      'Cảnh báo an toàn dược phẩm khẩn cấp của Cơ quan Quản lý Dược phẩm Anh (MHRA)'
    ],
    clinicalValue: 'Tiêu chuẩn thực hành y khoa độc lập, minh bạch và khoa học bậc nhất Châu Âu.',
    coverImage: '/assets/aistudio/Screenshot_20261109_000130_Google_cc8e860a.jpg',
    keyTopics: ['British National Formulary', 'Dược thư Anh Quốc BNF', 'NHS Guidelines', 'Kê đơn an toàn']
  },

  // Bổ sung các Dược Thư & Sách Thuốc Tây Y Chuyên Sâu Theo Yêu Cầu
  {
    id: 'tra-cuu-thuoc-thong-dung-100000-biet-duoc',
    title: 'Tra Cứu Thuốc Thông Dụng Và Biệt Dược (100.000 Tên Thuốc)',
    originalTitle: 'Tra Cứu Thuốc Thông Dụng Và Biệt Dược (100.000 Tên Thuốc)',
    author: 'NXB Y Học & Các Dược Sĩ Lâm Sàng',
    publisherYear: 'NXB Y Học',
    category: 'duoc_thu_vn',
    categoryLabel: 'Dược Thư & Sách Thuốc Tây Y',
    summary: 'Bộ cẩm nang tra cứu khổng lồ chứa hơn 100.000 tên thuốc và biệt dược lưu hành tại Việt Nam và quốc tế. Tra cứu nhanh công năng, hoạt chất, hàm lượng, dạng bào chế và phác đồ phối hợp.',
    coreConcepts: [
      'Hệ thống 100.000+ tên thuốc, biệt dược và hoạt chất',
      'Tra cứu công năng chỉ định, liều dùng và cách dùng',
      'Phác đồ phối hợp thuốc trong điều trị nội khoa'
    ],
    clinicalValue: 'Công cụ tra cứu biệt dược đầy đủ nhất cho bác sĩ và dược sĩ kê đơn.',
    coverImage: '/assets/aistudio/Screenshot_20261109_000130_Google_cc8e860a.jpg',
    keyTopics: ['100.000 Biệt Dược', 'Tra Cứu Thuốc', 'Công Năng Chỉ Định', 'Phối Hợp Thuốc']
  },
  {
    id: 'thuoc-biet-duoc-va-cach-su-dung',
    title: 'Thuốc Biệt Dược Và Cách Sử Dụng',
    originalTitle: 'Thuốc Biệt Dược Và Cách Sử Dụng (Tái Bản Mới Nhất)',
    author: 'DS. Phạm Thiệp & DS. Đào Xuân Vinh',
    publisherYear: 'NXB Y Học',
    category: 'duoc_thu_vn',
    categoryLabel: 'Dược Thư & Sách Thuốc Tây Y',
    summary: 'Cẩm nang gối đầu giường tra cứu chi tiết biệt dược, nhóm dược lý, cơ chế tác dụng, chỉ định, liều dùng, tác dụng phụ và cách phối hợp thuốc an toàn trong thực hành điều trị.',
    coreConcepts: [
      'Chuyên luận biệt dược Việt Nam & Quốc tế',
      'Hướng dẫn phối hợp thuốc hợp lý, tránh tương tác',
      'Liều lượng tiêu chuẩn theo từng lứa tuổi và tình trạng bệnh'
    ],
    clinicalValue: 'Hướng dẫn thực hành kê đơn và bán thuốc chuẩn xác cho nhà thuốc và bệnh viện.',
    coverImage: '/assets/aistudio/Screenshot_20261109_000130_Google_cc8e860a.jpg',
    keyTopics: ['Phạm Thiệp', 'Thuốc Biệt Dược', 'Hướng Dẫn Sử Dụng Thuốc', 'Phác Đồ Phối Hợp']
  },
  {
    id: 'giao-trinh-duoc-ly-hoc-BYT',
    title: 'Giáo Trình Dược Lý Học (Bộ Y Tế)',
    originalTitle: 'Dược Lý Học Viện Trường (ĐH Y Hà Nội / ĐH Y Dược TP.HCM)',
    author: 'GS.TS. Đào Văn Phan & Bộ Y Tế',
    publisherYear: 'NXB Y Học',
    category: 'duoc_thu_vn',
    categoryLabel: 'Giáo Trình Y Khoa Viện Trường',
    summary: 'Giáo trình đào tạo chính thống của Bộ Y Tế về dược lý học: Dược động học (hấp thu, phân bố, chuyển hóa, thải trừ), Dược lực học, cơ chế phân tử và nguyên tắc phối hợp thuốc.',
    coreConcepts: [
      'Dược động học & Dược lực học chuẩn y khoa',
      'Cơ chế tác động lên thụ thể (Receptors) và enzyme',
      'Nguyên tắc phối hợp thuốc đồng công & đối kháng'
    ],
    clinicalValue: 'Cung cấp lý luận dược lý nền tảng chuẩn mực cho y bác sĩ lâm sàng.',
    coverImage: '/assets/aistudio/Screenshot_20261109_000130_Google_cc8e860a.jpg',
    keyTopics: ['Dược Lý Học', 'Bộ Y Tế', 'Dược Động Học', 'Cơ Chế Thụ Thể']
  },
  {
    id: 'giao-trinh-hoa-duoc-BYT',
    title: 'Giáo Trình Hóa Dược (Bộ Y Tế)',
    originalTitle: 'Hóa Dược Học - Bộ Y Tế',
    author: 'Bộ Y Tế & Hội Dược Học Việt Nam',
    publisherYear: 'NXB Y Học',
    category: 'duoc_thu_vn',
    categoryLabel: 'Giáo Trình Y Khoa Viện Trường',
    summary: 'Bộ giáo trình chuyên sâu về cấu trúc hóa học, mối liên quan giữa cấu trúc và hoạt tính sinh học (SAR), độ ổn định, đường chuyển hóa và cơ chế tác dụng phân tử của các nhóm thuốc.',
    coreConcepts: [
      'Cấu trúc hóa học và liên quan hoạt tính SAR',
      'Cơ chế tác dụng mức độ tế bào và enzym',
      'Độ tan, pKa và tính chọn lọc dược lý'
    ],
    clinicalValue: 'Giải thích sâu sắc nguồn gốc hóa học và lý do tại sao các thuốc cùng nhóm lại có tác dụng và độc tính khác nhau.',
    coverImage: '/assets/aistudio/Screenshot_20261109_000130_Google_cc8e860a.jpg',
    keyTopics: ['Hóa Dược', 'Bộ Y Tế', 'Cấu Trúc Hóa Học', 'Liên Quan Cấu Trúc Hoạt Tính SAR']
  },
  {
    id: 'cam-nang-tra-cuu-tuong-tac-thuoc-lam-sang',
    title: 'Cẩm Nang Tra Cứu Tương Tác Thuốc Cần Lưu Ý Trong Thực Hành Lâm Sàng',
    originalTitle: 'Cẩm Nang Tra Cứu Tương Tác Thuốc Lâm Sàng',
    author: 'Bộ Y Tế & Hội Dược Sĩ Lâm Sàng Việt Nam',
    publisherYear: 'NXB Y Học',
    category: 'duoc_thu_vn',
    categoryLabel: 'Cẩm Nang Tra Cứu Tương Tác Thuốc',
    summary: 'Tài liệu hướng dẫn lâm sàng cảnh báo hàng ngàn cặp tương tác thuốc bất lợi nguy hiểm, cơ chế tương tác, mức độ nghiêm trọng và giải pháp thay thế / chỉnh liều khi phối hợp thuốc.',
    coreConcepts: [
      'Tra cứu cặp tương tác thuốc dính nguy hiểm',
      'Cơ chế tương tác dược động học & dược lực học',
      'Giải pháp xử trí lâm sàng và lựa chọn thay thế'
    ],
    clinicalValue: 'Bảo vệ bệnh nhân khỏi các tai biến biến cố bất lợi (ADR) do phối hợp thuốc không hợp lý.',
    coverImage: '/assets/aistudio/Screenshot_20261109_000130_Google_cc8e860a.jpg',
    keyTopics: ['Tương Tác Thuốc', 'Lâm Sàng', 'Cảnh Báo ADR', 'Xử Trí Phối Hợp']
  },

  // Nhóm 7: Nam Dược & Thuốc Nam Việt Nam (Thêm 9 Sách Nam Y Dân Gian)
  {
    id: 'nam-duoc-than-hieu',
    title: 'Nam Dược Thần Hiệu',
    originalTitle: 'Nam Dược Thần Hiệu (11 Tập)',
    author: 'Thiền Sư Tuệ Tĩnh (Đại Y Thiền Sư)',
    publisherYear: 'NXB Y Học / Bộ Y Tế Việt Nam',
    category: 'nam_duoc_vn',
    categoryLabel: 'Nam Dược & Thuốc Nam Việt Nam',
    summary: 'Bộ tác phẩm y học Việt Nam bất hủ gồm 11 tập với 499 vị thuốc Nam và 3.873 phương thuốc trị 184 chứng bệnh. Đặt nền móng cho triết lý "Nam dược trị Nam nhân" (Thuốc Nam chữa bệnh cho người Nam).',
    coreConcepts: [
      'Triết lý Y học dân tộc "Nam dược trị Nam nhân"',
      'Hệ thống 499 vị thuốc Nam thuần Việt tính vị quy kinh rõ ràng',
      '3.873 phương thuốc nghiệm phương điều trị 184 chứng bệnh lâm sàng',
      'Kỹ thuật thu hái, bảo quản và sắc uống dược liệu bản địa'
    ],
    clinicalValue: 'Báu vật y học cổ truyền Việt Nam, cung cấp vô số phương thuốc Nam dễ kiếm, hiệu quả cao, chi phí rẻ cho người bệnh.',
    coverImage: '/assets/aistudio/Screenshot_20261108_225741_Google_7058ea3a.jpg',
    keyTopics: ['Tuệ Tĩnh', 'Nam Dược Thần Hiệu', 'Thuốc Nam', '499 Vị Thuốc Nam', '3.873 Bài Thuốc']
  },
  {
    id: 'hanh-gian-tran-nhu',
    title: 'Hành Giản Trân Nhu',
    originalTitle: 'Hành Giản Trân Nhu (Tuệ Tĩnh)',
    author: 'Thiền Sư Tuệ Tĩnh (Đại Y Thiền Sư)',
    publisherYear: 'NXB Y Học Việt Nam',
    category: 'nam_duoc_vn',
    categoryLabel: 'Nam Dược & Thuốc Nam Việt Nam',
    summary: 'Tác phẩm y học dân gian quý giá ghi chép các bài thuốc Nam đơn giản, dễ kiếm, ít tốn kém nhưng có tác dụng thần kỳ trong cứu chữa bệnh tật cho nhân dân.',
    coreConcepts: [
      'Bài thuốc nam nghiệm phương giản tiện trong nhân dân',
      'Tận dụng triệt để thảo dược dã sinh và cây trồng quanh nhà',
      'Phương pháp ứng cứu bệnh cấp bách bằng gừng, hành, tỏi, lá tía tô, lá lốt...'
    ],
    clinicalValue: 'Cẩm nang ứng phó bệnh tật cấp bách tại vùng xa, nơi thiếu thốn y tế thông qua cây thuốc dân dã.',
    coverImage: '/assets/aistudio/Screenshot_20261108_225741_Google_7058ea3a.jpg',
    keyTopics: ['Hành Giản Trân Nhu', 'Tuệ Tĩnh', 'Thuốc Nam Dân Gian', 'Ứng Cứu Bệnh Cấp Bách']
  },
  {
    id: 'nhung-cay-thuoc-va-vi-thuoc-viet-nam',
    title: 'Những Cây Thuốc Và Vị Thuốc Việt Nam',
    originalTitle: 'Những Cây Thuốc Và Vị Thuốc Việt Nam (Tái bản 2023)',
    author: 'GS.TS. Đỗ Tất Lợi',
    publisherYear: 'NXB Y Học (Giải Thưởng Hồ Chí Minh)',
    category: 'nam_duoc_vn',
    categoryLabel: 'Nam Dược & Thuốc Nam Việt Nam',
    summary: 'Công trình bách khoa dược liệu đồ sộ kinh điển nhất Việt Nam, nghiên cứu tỉ mỉ hơn 750 cây thuốc, vị thuốc và động vật làm thuốc về đặc điểm thực vật, thành phần hóa học, tác dụng dược lý và bài thuốc ứng dụng.',
    coreConcepts: [
      'Đặc điểm phân bố, hình thái & phân loại 750+ cây thuốc Việt Nam',
      'Phân tích thành phần hóa học hiện đại (Alcaloid, Flavonoid, Saponin, Tinh dầu...)',
      'Tác dụng dược lý được chứng minh qua thực nghiệm lâm sàng',
      'Bài thuốc Nam Đông-Tây y kết hợp chuẩn mực'
    ],
    clinicalValue: 'Tài liệu gối đầu giường không thể thiếu của mọi bác sĩ, dược sĩ và nhà nghiên cứu dược liệu tại Việt Nam.',
    coverImage: '/assets/aistudio/Screenshot_20261108_225741_Google_7058ea3a.jpg',
    keyTopics: ['Đỗ Tất Lợi', 'Những Cây Thuốc Việt Nam', 'Dược Liệu Học', 'Thành Phần Hóa Học', '750+ Cây Thuốc']
  },
  {
    id: 'cay-thuoc-va-dong-vat-lam-thuoc-o-viet-nam',
    title: 'Cây Thuốc Và Động Vật Làm Thuốc Ở Việt Nam (2 Tập)',
    originalTitle: 'Cây Thuốc Và Động Vật Làm Thuốc Ở Việt Nam',
    author: 'Viện Dược Liệu - Bộ Y Tế',
    publisherYear: 'NXB Khoa Học Và Kỹ Thuật (2 Tập)',
    category: 'nam_duoc_vn',
    categoryLabel: 'Nam Dược & Thuốc Nam Việt Nam',
    summary: 'Bộ sách tra cứu khoa học cấp quốc gia gồm 2 tập do Viện Dược liệu biên soạn, tổng hợp kiến thức toàn diện về hàng ngàn loài cây thuốc và động vật làm thuốc tại Việt Nam kèm hình ảnh, bản đồ phân bố và độc tính.',
    coreConcepts: [
      'Đặc điểm sinh học và sinh thái dược liệu Việt Nam',
      'Bản đồ vùng trồng và bảo tồn cây thuốc quốc gia',
      'Nghiên cứu dược lý hiện đại, thử nghiệm độc tính cấp & mạn',
      'Ứng dụng trong y học cổ truyền và công nghiệp dược phẩm'
    ],
    clinicalValue: 'Cung cấp cơ sở khoa học hiện đại vững chắc cho việc bảo tồn và khai thác dược liệu Việt Nam.',
    coverImage: '/assets/aistudio/Screenshot_20261108_225741_Google_7058ea3a.jpg',
    keyTopics: ['Viện Dược Liệu', 'Bộ Y Tế', 'Động Vật Làm Thuốc', 'Bảo Tồn Dược Liệu', 'Dược Lý Lâm Sàng']
  },
  {
    id: 'tu-dien-cay-thuoc-viet-nam',
    title: 'Từ Điển Cây Thuốc Việt Nam (2 Tập)',
    originalTitle: 'Từ Điển Cây Thuốc Việt Nam (Tái bản mở rộng)',
    author: 'GS.TS. Võ Văn Chi',
    publisherYear: 'NXB Y Học (2 Tập)',
    category: 'nam_duoc_vn',
    categoryLabel: 'Nam Dược & Thuốc Nam Việt Nam',
    summary: 'Bộ từ điển dược thực vật học Việt Nam đầy đủ nhất với hơn 4.500 loài cây thuốc. Cung cấp tên khoa học, tên dân gian, bộ phận dùng, tính vị công năng và bài thuốc trị bệnh.',
    coreConcepts: [
      'Phân loại học 4.500+ loài thực vật làm thuốc Việt Nam',
      'Tên gọi đa dạng theo các dân tộc Việt Nam (Kinh, Tày, Nùng, Dao, Thái, H\'Mông...)',
      'Tính vị quy kinh & công năng chủ trị',
      'Kinh nghiệm chữa bệnh dân gian toàn quốc'
    ],
    clinicalValue: 'Công cụ tra cứu tra định danh cây thuốc Nam đồ sộ và toàn diện nhất.',
    coverImage: '/assets/aistudio/Screenshot_20261108_225741_Google_7058ea3a.jpg',
    keyTopics: ['Võ Văn Chi', 'Từ Điển Cây Thuốc', '4.500 Loài Cây Thuốc', 'Thực Vật Học Y Khoa']
  },
  {
    id: 'so-tay-huong-dan-cay-thuoc-nam-BYT',
    title: 'Sổ Tay Hướng Dẫn Sử Dụng Cây Thuốc Nam Trong Chăm Sóc Sức Khỏe Ban Đầu',
    originalTitle: 'Sổ Tay Cây Thuốc Nam Thiết Yếu (Bộ Y Tế)',
    author: 'Bộ Y Tế Việt Nam (Cục Quản Lý Y Dược Cổ Truyền)',
    publisherYear: 'NXB Y Học',
    category: 'nam_duoc_vn',
    categoryLabel: 'Nam Dược & Thuốc Nam Việt Nam',
    summary: 'Tài liệu chuẩn hóa quốc gia hướng dẫn người dân và y tế cơ sở nhận biết, trồng và sử dụng 70+ cây thuốc Nam thiết yếu trong vườn thuốc gia đình để phòng và chữa các bệnh thông thường.',
    coreConcepts: [
      'Mô hình Vườn thuốc Nam gia đình & Trạm y tế cơ sở',
      '70+ cây thuốc Nam chủ lực thiết yếu dễ trồng',
      'Hướng dẫn tự chăm sóc sức khỏe ban đầu không dùng hóa dược',
      'Quy chuẩn liều lượng và cách dùng an toàn'
    ],
    clinicalValue: 'Hướng dẫn chuẩn mực y tế cộng đồng, giúp mọi gia đình chủ động ứng dụng thuốc Nam chăm sóc sức khỏe.',
    coverImage: '/assets/aistudio/Screenshot_20261108_225741_Google_7058ea3a.jpg',
    keyTopics: ['Bộ Y Tế', 'Sổ Tay Thuốc Nam', 'Chăm Sóc Sức Khỏe Ban Đầu', '70 Cây Thuốc Thiết Yếu']
  },
  {
    id: 'cay-thuoc-quanh-nha',
    title: 'Cây Thuốc Quanh Nhà',
    originalTitle: 'Cây Thuốc Quanh Nhà & Kinh Nghiệm Trị Bệnh',
    author: 'Hội Đông Y Việt Nam & Cục Y Học Cổ Truyền',
    publisherYear: 'NXB Y Học',
    category: 'nam_duoc_vn',
    categoryLabel: 'Nam Dược & Thuốc Nam Việt Nam',
    summary: 'Cẩm nang tổng hợp các loài cây quen thuộc dễ tìm quanh sân vườn (Đinh lăng, Rau má, Ngải cứu, Lá lốt, Gừng, Tỏi, Sả...) với bí quyết sắc uống, đắp ngoài và ngâm trị bệnh hiệu quả cao.',
    coreConcepts: [
      'Biến cây cỏ quanh vườn thành thuốc chữa bệnh',
      'Các bài thuốc chườm, đắp, xông, uống dân dã',
      'Trị nhanh chứng cảm sốt, đau khớp, nhức mỏi, tiêu chảy, đau bụng'
    ],
    clinicalValue: 'Mang y học cổ truyền vào đời sống hàng ngày một cách đơn giản, tiện lợi và tiết kiệm nhất.',
    coverImage: '/assets/aistudio/Screenshot_20261108_225741_Google_7058ea3a.jpg',
    keyTopics: ['Cây Thuốc Quanh Nhà', 'Thuốc Nam Sân Vườn', 'Kinh Nghiệm Dân Gian', 'Đinh Lăng Ngải Cứu']
  },
  {
    id: 'mon-an-bai-thuoc-dan-gian',
    title: 'Món Ăn Bài Thuốc Dân Gian',
    originalTitle: 'Món Ăn Bài Thuốc Dân Gian & Dược Thiện Nam Y',
    author: 'Các Chuyên Gia Dược Thiện YHCT Việt Nam',
    publisherYear: 'NXB Y Học',
    category: 'nam_duoc_vn',
    categoryLabel: 'Nam Dược & Thuốc Nam Việt Nam',
    summary: 'Cuốn sách độc đáo về Dược Thiện (thức ăn làm thuốc), hướng dẫn chế biến các món ăn bài thuốc dân gian vừa ngon miệng vừa bổ dưỡng tạng phủ, chữa bệnh mạn tính.',
    coreConcepts: [
      'Học thuyết Dược Thiện (Ẩm thực trị liệu Nam y)',
      'Chế biến món ăn bổ khí huyết, kiện tỳ vị, dưỡng thận',
      'Nguyên tắc ăn uống kết hợp điều trị bệnh lý',
      'Nâng cao thể trạng và đề kháng cho người bệnh'
    ],
    clinicalValue: 'Phương pháp chữa bệnh không dùng thuốc thông qua thực phẩm hàng ngày, phù hợp cho phục hồi sức khỏe.',
    coverImage: '/assets/aistudio/Screenshot_20261108_225741_Google_7058ea3a.jpg',
    keyTopics: ['Món Ăn Bài Thuốc', 'Dược Thiện', 'Ẩm Thực Trị Liệu', 'Bồi Bổ Tạng Phủ']
  },
  {
    id: 'cay-co-quanh-ta-tri-benh',
    title: 'Cây Cỏ Quanh Ta Trị Bệnh',
    originalTitle: 'Cây Cỏ Quanh Ta Trị Bệnh & Tri Thức Dân Dã',
    author: 'Sưu Tầm & Biên Soạn Y Học Dân Tộc Việt Nam',
    publisherYear: 'NXB Kim Đồng / NXB Y Học',
    category: 'nam_duoc_vn',
    categoryLabel: 'Nam Dược & Thuốc Nam Việt Nam',
    summary: 'Tập hợp phong phú các cây cỏ dại, thảo mộc dễ kiếm trong tự nhiên (Cỏ mần trầu, Cỏ nhọ nồi, Chó đẻ răng cưa, Bồ công anh...) và bài thuốc ứng dụng thực tế.',
    coreConcepts: [
      'Tối ưu hóa nguồn dược liệu tự nhiên dã sinh phong phú',
      'Bài thuốc dân gian giải độc, hạ men gan, thanh nhiệt, cầm máu',
      'Xử lý các tình huống dị ứng, mụn nhọt, viêm họng, côn trùng cắn'
    ],
    clinicalValue: 'Giúp người dân nhận diện giá trị chữa bệnh vô giá của các loài cây cỏ tự nhiên xung quanh.',
    coverImage: '/assets/aistudio/Screenshot_20261108_225741_Google_7058ea3a.jpg',
    keyTopics: ['Cây Cỏ Quanh Ta', 'Cỏ Nhọ Nồi', 'Diệp Hạ Châu', 'Giải Độc Dân Gian']
  },

  // --- NHÓM 8: TỨ ĐẠI KINH ĐIỂN ĐÔNG Y, Y TÔNG VIỆT NAM & HƯỚNG DẪN TÂY Y HIỆN ĐẠI CẬP NHẬT ---
  {
    id: 'hoang-de-noi-kinh-to-van-linh-khu',
    title: 'Hoàng Đế Nội Kinh (Tố Vấn & Linh Khu)',
    originalTitle: 'Huangdi Neijing (Suwen & Lingshu)',
    author: 'Y Gia Cổ Đại (Kỳ Bá - Hoàng Đế)',
    publisherYear: 'Kinh Điển Tối Thượng YHCT',
    category: 'dong_y_ly_luan',
    categoryLabel: 'Đông Y Kinh Điển & Lý Luận',
    summary: 'Bộ sách gốc rễ lâu đời và uyên thâm nhất của Y Học Cổ Truyền: Hệ thống hóa học thuyết Âm Dương, Ngũ Hành, Tạng Tượng, Kinh Lạc, Khí Huyết - Tân Dịch, Vận Khí, Chẩn Mạch và Cửu Châm.',
    coreConcepts: [
      'Âm bình dương bí, tinh thần nãi trị (Cân bằng Âm Dương là gốc của sự sống)',
      'Trị vị bệnh (Phòng bệnh trước khi phát, trị bệnh khi mới manh nha)',
      'Tạng tượng học thuyết: Tâm chủ thần minh, Can tàng huyết, Tỳ chủ vận hóa, Phế chủ khí, Thận tàng tinh',
      'Linh Khu: Căn kết kinh mạch, Bổ tả châm pháp, Doanh Vệ khí hành'
    ],
    clinicalValue: 'Mọi biện chứng luận trị Tạng Phủ và Châm Cứu đều phải quy chiếu về nguyên lý gốc của Nội Kinh.',
    featuredQuote: 'Thánh nhân bất trị dĩ bệnh trị vị bệnh, bất trị dĩ loạn trị vị loạn.',
    keyTopics: ['Hoàng Đế Nội Kinh', 'Tố Vấn', 'Linh Khu', 'Trị Vị Bệnh', 'Tạng Tượng Kinh Lạc']
  },
  {
    id: 'thuong-han-luan-truong-trong-canh',
    title: 'Thương Hàn Luận (Biện Chứng Lục Kinh)',
    originalTitle: 'Shang Han Lun (Treatise on Cold Damage Disorders)',
    author: 'Y Thánh Trương Trọng Cảnh (Đời Đông Hán)',
    publisherYear: 'Kinh Điển Phương Tễ YHCT',
    category: 'dong_y_ly_luan',
    categoryLabel: 'Đông Y Kinh Điển & Lý Luận',
    summary: 'Tác phẩm đặt nền móng cho Biện Chứng Luận Trị lâm sàng với Hệ thống Lục Kinh Biện Chứng (Thái Dương, Dương Minh, Thiếu Dương, Thái Âm, Thiếu Âm, Quyết Âm) và 113 cổ phương tinh diệu (Kinh Phương).',
    coreConcepts: [
      'Lục Kinh Biện Chứng: Phản ánh 6 tầng nông sâu, hàn nhiệt, hư thực của bệnh biến ngoại cảm và nội thương',
      'Kinh phương mẫu mực: Quế Chi Thang, Ma Hoàng Thang, Tiểu Sài Hồ Thang, Bạch Hổ Thang, Thừa Khí Thang, Lý Trung Thang, Tứ Nghịch Thang',
      'Quy tắc "Hữu thị chứng, dụng thị phương" (Có chứng này tất dùng bài thuốc này — Sát từng triệu chứng)',
      'Ngăn chặn truyền kinh và nhận biết hoại bệnh do chẩn trị sai (ngộ hãn, ngộ hạ)'
    ],
    clinicalValue: 'Cung cấp tư duy chẩn đoán sắc bén theo từng triệu chứng vi tế (ố phong vs ố hàn, hữu hãn vs vô hãn, khát vs bất khát) để chọn đúng 1 bài thuốc trúng đích.',
    featuredQuote: 'Quan kỳ mạch chứng, tri phạm hà nghịch, tùy chứng trị chi.',
    keyTopics: ['Thương Hàn Luận', 'Trương Trọng Cảnh', 'Lục Kinh Biện Chứng', 'Kinh Phương', 'Quế Chi Thang']
  },
  {
    id: 'kim-quy-yeu-luoc',
    title: 'Kim Quỹ Yếu Lược (Tạp Bệnh Nội Khoa)',
    originalTitle: 'Jin Gui Yao Lue (Essential Prescriptions from the Golden Cabinet)',
    author: 'Y Thánh Trương Trọng Cảnh',
    publisherYear: 'Kinh Điển Nội Khoa YHCT',
    category: 'dong_y_ly_luan',
    categoryLabel: 'Đông Y Kinh Điển & Lý Luận',
    summary: 'Kiệt tác đầu tiên về Biện chứng Tạp bệnh Nội khoa mạn tính, Phụ khoa và cấp cứu: Hung Tý Tâm Thống (mạch vành), Thống Phong - Lịch Tiết (Gout/viêm khớp), Tiêu Khát (tiểu đường), Thủy Thũng (bệnh thận), Đàm Ẩm, Huyết Tý.',
    coreConcepts: [
      'Biện chứng tạp bệnh lấy Tạng Phủ - Kinh Lạc làm trục cốt lõi',
      'Bài thuốc đặc trị mạn tính: Thận Khí Hoàn (Bát Vị), Quế Chi Phục Linh Hoàn, Đương Quy Thược Dược Tán, Bán Hạ Hậu Phác Thang',
      'Phác đồ Hung tý (Qua lâu giới bạch bán hạ thang) trị đau thắt ngực',
      'Phác đồ Thận khí hoàn trị Tiêu khát, tiểu đêm, suy giảm chức năng thận'
    ],
    clinicalValue: 'Khuôn vàng thước ngọc cho điều trị các bệnh mạn tính nội khoa, tim mạch, chuyển hóa và khớp.',
    keyTopics: ['Kim Quỹ Yếu Lược', 'Tạp Bệnh Nội Khoa', 'Hung Tý', 'Thận Khí Hoàn', 'Lịch Tiết Phong']
  },
  {
    id: 'on-benh-dieu-bien-ngo-cuc-thong',
    title: 'Ôn Bệnh Điều Biện (Vệ Khí Dinh Huyết & Tam Tiêu)',
    originalTitle: 'Wen Bing Tiao Bian',
    author: 'Ngô Cúc Thông (Đời Thanh)',
    publisherYear: 'Kinh Điển Ôn Bệnh Học',
    category: 'dong_y_ly_luan',
    categoryLabel: 'Đông Y Kinh Điển & Lý Luận',
    summary: 'Đỉnh cao lý luận điều trị các bệnh nhiễm trùng cấp tính, sốt cao, viêm phổi, sốt xuất huyết và dịch bệnh theo hệ thống Tam Tiêu (Thượng - Trung - Hạ tiêu) và 4 tầng Vệ - Khí - Dinh - Huyết.',
    coreConcepts: [
      'Biện chứng Vệ - Khí - Dinh - Huyết theo mức độ xâm nhập từ nông đến sâu của nhiệt độc',
      'Tân lương giải biểu (Ngân Kiều Tán, Tang Cúc Ẩm) cho giai đoạn Vệ phần (cảm cúm nhiệt, viêm họng cấp)',
      'Thanh dinh lương huyết (Thanh Dinh Thang, Tê Giác Địa Hoàng Thang) bảo vệ tân dịch và huyết mạch trong sốt cao xuất huyết',
      'Bảo tồn Âm dịch (Tăng Dịch Thang) trong hồi phục sau sốt nhiễm khuẩn'
    ],
    clinicalValue: 'Bổ khuyết hoàn hảo cho Thương Hàn Luận trong điều trị các bệnh lý nhiễm trùng - viêm cấp có sốt cao, nhiễm độc.',
    keyTopics: ['Ôn Bệnh Điều Biện', 'Ngô Cúc Thông', 'Vệ Khí Dinh Huyết', 'Ngân Kiều Tán', 'Tam Tiêu Biện Chứng']
  },
  {
    id: 'hai-thuong-y-tong-tam-linh',
    title: 'Hải Thượng Y Tông Tâm Lĩnh (28 Tập, 66 Quyển)',
    originalTitle: 'Hải Thượng Y Tông Tâm Lĩnh Toàn Thư',
    author: 'Đại Danh Y Hải Thượng Lãn Ông Lê Hữu Trác',
    publisherYear: 'NXB Y Học Việt Nam',
    category: 'nam_duoc_vn',
    categoryLabel: 'Nam Dược & Thuốc Nam Việt Nam',
    summary: 'Bộ bách khoa toàn thư vĩ đại nhất của nền Y học Cổ truyền Việt Nam: Đúc kết hơn 30 năm thực nghiệm lâm sàng trên cơ địa người Việt với Nội kinh yếu chỉ, Y gia quan niệm, Ngoại cảm thông trị, Y dương án, Y âm án và Bách gia trân tàng.',
    coreConcepts: [
      'Học thuyết coi trọng Thủy - Hỏa Chân Âm (Lục Vị) và Mệnh Môn Chân Dương (Bát Vị) trên thể trạng người Việt',
      'Y Dương Án & Y Âm Án: 120 bệnh án ghi chép chân thực từng lần gia giảm thuốc và kinh nghiệm cứu chữa ca nan y',
      'Lĩnh Nam Bản Thảo: 496 vị thuốc Nam bản địa và tính vị quy kinh theo thực tế khí hậu nhiệt đới Việt Nam',
      'Y Huấn Cách Ngôn: 9 điều răn y đức bất hủ của người thầy thuốc'
    ],
    clinicalValue: 'Chỉnh lý lý luận Đông y phù hợp hoàn toàn với khí hậu nóng ẩm và thể chất người Việt Nam.',
    featuredQuote: 'Không có thuốc gì quý bằng giữ cho Chân Âm và Chân Dương điều hòa.',
    keyTopics: ['Hải Thượng Lãn Ông', 'Y Dương Án', 'Y Âm Án', 'Lĩnh Nam Bản Thảo', 'Thủy Hỏa Mệnh Môn']
  },
  {
    id: 'ty-vi-luan-ly-dong-vien',
    title: 'Tỳ Vị Luận (Học Thuyết Thổ Mạch Hậu Thiên)',
    originalTitle: 'Pi Wei Lun (Treatise on the Spleen and Stomach)',
    author: 'Lý Đông Viên (Kim Nguyên Tứ Đại Gia)',
    publisherYear: 'Kinh Điển Tiêu Hóa & Miễn Dịch YHCT',
    category: 'dong_y_ly_luan',
    categoryLabel: 'Đông Y Kinh Điển & Lý Luận',
    summary: 'Tác phẩm sáng lập Bổ Thổ Phái với luận điểm nổi tiếng "Nội thương Tỳ Vị, bách bệnh do sinh". Khai sinh pháp trị Cam Ôn Trừ Đại Nhiệt và danh phương Bổ Trung Ích Khí Thang.',
    coreConcepts: [
      'Tỳ Vị là cội nguồn hậu thiên sinh hóa Khí Huyết và Chính Khí (tương ứng hệ miễn dịch niêm mạc ruột & chuyển hóa)',
      'Cơ chế "Âm Hỏa" sinh ra do Tỳ Khí hư hãm xuống hạ tiêu làm sinh nhiệt giả (khác thực nhiệt)',
      'Phương thang chủ lực: Bổ Trung Ích Khí Thang (Hoàng kỳ, Nhân sâm, Bạch truật, Sài hồ, Thăng ma)'
    ],
    clinicalValue: 'Chìa khóa điều trị các chứng mệt mỏi mạn tính, sa tạng phủ, suy nhược, tiêu chảy mạn và sốt kéo dài do khí hư.',
    keyTopics: ['Lý Đông Viên', 'Tỳ Vị Luận', 'Bổ Trung Ích Khí', 'Âm Hỏa', 'Thăng Dương Ích Khí']
  },
  {
    id: 'canh-nhac-toan-thu',
    title: 'Cảnh Nhạc Toàn Thư (Bát Cương & Chân Âm Chân Dương)',
    originalTitle: 'Jing Yue Quan Shu',
    author: 'Trương Cảnh Nhạc (Đời Minh)',
    publisherYear: 'Kinh Điển Biện Chứng YHCT',
    category: 'dong_y_ly_luan',
    categoryLabel: 'Đông Y Kinh Điển & Lý Luận',
    summary: 'Bộ toàn thư hoàn chỉnh hệ thống Bát Cương (Âm Dương - Biểu Lý - Hàn Nhiệt - Hư Thực) thành chuẩn mực chẩn đoán Đông Y và sáng tạo Tả Quy Hoàn, Hữu Quy Hoàn, Thập Toàn Đại Bổ gia giảm.',
    coreConcepts: [
      'Chuẩn hóa Lục Biến trong Biện chứng: Biểu, Lý, Hàn, Nhiệt, Hư, Thực dưới thống lĩnh của Âm Dương',
      'Ôn Bổ Phái: Bảo vệ Mệnh môn Hỏa (Dương khí) và Thận Thủy (Chân Âm)',
      'Tả Quy Hoàn (bổ chân âm không tiết tả) và Hữu Quy Hoàn (ôn bổ thận dương không táo)'
    ],
    clinicalValue: 'Nâng tầm khả năng phân biệt "Chân Hàn Giả Nhiệt" và "Chân Nhiệt Giả Hàn" tránh sai lầm chết người khi kê đơn.',
    keyTopics: ['Trương Cảnh Nhạc', 'Bát Cương Biện Chứng', 'Tả Quy Hoàn', 'Hữu Quy Hoàn', 'Chân Hàn Giả Nhiệt']
  },
  {
    id: 'ban-thao-cuong-muc-ly-thoi-tran',
    title: 'Bản Thảo Cương Mục (Dược Thực Vật Học Kinh Điển)',
    originalTitle: 'Ben Cao Gang Mu (Compendium of Materia Medica)',
    author: 'Lý Thời Trân (Đời Minh)',
    publisherYear: 'Di Sản Ký Ức Thế Giới UNESCO',
    category: 'dong_y_ly_luan',
    categoryLabel: 'Dược Học Cổ Truyền Kinh Điển',
    summary: 'Tác phẩm dược học vĩ đại nhất phương Đông ghi chép 1.892 vị thuốc thảo mộc, khoáng vật, động vật và 11.096 phương thuốc kèm quy trình bào chế, khử độc và nhận diện dược liệu thật giả.',
    coreConcepts: [
      'Phân loại 16 bộ 60 loại từ Thủy, Hỏa, Thổ, Kim Thạch đến Thảo, Mộc, Cầm, Thú',
      'Kỹ thuật bào chế (Pao Zhi) thay đổi tính vị quy kinh: Sao đen chỉ huyết, chích mật nhuận phế, sao rượu dẫn kinh lên trên',
      'Nhận diện tính độc và giải độc dược liệu chính xác'
    ],
    clinicalValue: 'Cơ sở đối chiếu cảm quan thực vật học và quy trình bào chế giảm độc tính trong Dược điển hiện đại.',
    keyTopics: ['Lý Thời Trân', 'Bản Thảo Cương Mục', '1.892 Vị Thuốc', 'Kỹ Thuật Bào Chế']
  },
  {
    id: 'harrisons-principles-internal-medicine',
    title: "Harrison's Principles of Internal Medicine (21st Edition)",
    originalTitle: "Harrison's Principles of Internal Medicine (21st Ed.)",
    author: 'Joseph Loscalzo, Anthony S. Fauci, Dennis L. Kasper, Stephen L. Hauser, Dan L. Longo',
    publisherYear: 'McGraw Hill Medical',
    category: 'tay_y_co_so',
    categoryLabel: 'Tây Y & Sinh Lý Học Lâm Sàng',
    summary: 'Sách giáo khoa Nội khoa uy tín và toàn diện nhất thế giới: Hệ thống hóa tiếp cận triệu chứng học, chẩn đoán phân biệt đa cơ quan, cơ chế sinh lý bệnh phân tử - miễn dịch - di truyền và tiêu chuẩn điều trị nội khoa hiện đại.',
    coreConcepts: [
      'Sơ đồ tiếp cận chẩn đoán phân biệt từ từng triệu chứng than phiền (Differential Diagnosis Algorithms)',
      'Sinh lý bệnh học phân tử các bệnh lý Tim mạch, Hô hấp, Tiêu hóa, Thận, Nội tiết, Khớp và Thần kinh',
      'Ngưỡng chỉ định cận lâm sàng chính xác (Lab values, Imaging, Biomarkers)',
      'Y học thực chứng (Evidence-Based Medicine) và nhận diện Red Flags cấp cứu'
    ],
    clinicalValue: 'Tiêu chuẩn vàng toàn cầu để bác sĩ không bao giờ bỏ sót chẩn đoán phân biệt nguy hiểm khi luận bệnh.',
    keyTopics: ['Harrison 21st Ed', 'Nội Khoa Tổng Hợp', 'Chẩn Đoán Phân Biệt', 'Cơ Chế Phân Tử']
  },
  {
    id: 'uptodate-bmj-clinical-guidelines',
    title: 'UpToDate & BMJ Best Practice Clinical Decision Guidelines',
    originalTitle: 'UpToDate Evidence-Based Clinical Decision Support (2024-2025)',
    author: 'Wolters Kluwer / British Medical Journal Group',
    publisherYear: 'Cập Nhật Liên Tục 2024–2025',
    category: 'duoc_lam_sang_qt',
    categoryLabel: 'Sách Thuốc Tây Y Quốc Tế',
    summary: 'Hệ thống hướng dẫn ra quyết định lâm sàng dựa trên bằng chứng cập nhật nhất (Grade 1A/1B): Cung cấp phác đồ điều trị bước 1 - bước 2, tiêu chuẩn chẩn đoán mới nhất và bảng chỉnh liều theo độ lọc cầu thận eGFR & Child-Pugh.',
    coreConcepts: [
      'Khuyến cáo điều trị phân bậc theo mức độ bằng chứng khoa học (GRADE System)',
      'Lựa chọn phác đồ đầu tay (First-line) vs thay thế (Second-line) khi thất bại điều trị',
      'Tiêu chuẩn chuyển tuyến chuyên khoa và chỉ định nhập viện khẩn cấp'
    ],
    clinicalValue: 'Đảm bảo phác đồ Tây Y luôn bám sát khuyến cáo mới nhất đang áp dụng tại các bệnh viện tuyến đầu.',
    keyTopics: ['UpToDate', 'BMJ Best Practice', 'Evidence-Based Medicine', 'Phác Đồ Bước 1-2']
  },
  {
    id: 'esc-cardiovascular-guidelines-2024',
    title: 'ESC Guidelines on Cardiovascular Diseases (2024 Update)',
    originalTitle: 'European Society of Cardiology Guidelines 2023–2024',
    author: 'European Society of Cardiology (ESC) / Hội Tim Mạch Học VN (VNHA)',
    publisherYear: 'European Heart Journal (2024)',
    category: 'duoc_lam_sang_qt',
    categoryLabel: 'Sách Thuốc Tây Y Quốc Tế',
    summary: 'Bộ khuyến cáo Tim mạch mới nhất của Hội Tim mạch Châu Âu & Việt Nam: Phân loại Huyết áp mới (Elevated BP 120-139/70-89 mmHg), 4 trụ cột điều trị Suy tim HFrEF/HFpEF, Rung nhĩ (thang điểm CHA2DS2-VA) và Hội chứng vành mạn.',
    coreConcepts: [
      'Hướng dẫn Tăng huyết áp 2024: Mục tiêu huyết áp tâm thu 120–129 mmHg nếu dung nạp tốt, ưu tiên phối hợp viên cố định liều sớm',
      '4 Trụ cột vàng điều trị Suy tim HFrEF: ARNI/ACEi + Chẹn Beta chọn lọc + Kháng Aldosterone (MRA) + Ức chế SGLT2 (Dapagliflozin/Empagliflozin)',
      'Đánh giá nguy cơ đột quỵ ở bệnh nhân Rung nhĩ bằng thang điểm CHA2DS2-VA và thuốc kháng đông đường uống NOACs'
    ],
    clinicalValue: 'Chuẩn hóa phác đồ Tim mạch giúp giảm tử vong và nhập viện tái phát vượt trội.',
    keyTopics: ['ESC 2024', 'Tăng Huyết Áp', 'Suy Tim 4 Trụ Cột', 'SGLT2i', 'Rung Nhĩ']
  },
  {
    id: 'ada-diabetes-standards-2025',
    title: 'ADA Standards of Care in Diabetes (2025 Update)',
    originalTitle: 'American Diabetes Association Standards of Care 2025',
    author: 'American Diabetes Association (ADA)',
    publisherYear: 'Diabetes Care (2025)',
    category: 'duoc_lam_sang_qt',
    categoryLabel: 'Sách Thuốc Tây Y Quốc Tế',
    summary: 'Tiêu chuẩn vàng cập nhật 2025 về chẩn đoán và điều trị Đái tháo đường: Cá thể hóa mục tiêu HbA1c (<7.0%) & TIR (>70%), ưu tiên SGLT2i và GLP-1 RA bảo vệ tim-thận sớm độc lập với HbA1c, và kiểm soát Gan nhiễm mỡ chuyển hóa (MASLD).',
    coreConcepts: [
      'Bảo vệ cơ quan đích tim-thận-gan (Cardiorenal-Metabolic approach) bên cạnh hạ đường huyết',
      'Thuốc chủ lực thế hệ mới: Metformin + SGLT2i (Empagliflozin, Dapagliflozin) + GLP-1 RA (Semaglutide, Liraglutide)',
      'Theo dõi biến chứng thần kinh ngoại biên, võng mạc và Albumin/Creatinine niệu (uACR) định kỳ'
    ],
    clinicalValue: 'Giúp người bệnh tiểu đường không chỉ đẹp chỉ số đường huyết mà còn bảo vệ toàn vẹn tim, thận, mắt và bàn chân.',
    keyTopics: ['ADA 2025', 'Tiểu Đường Type 2', 'HbA1c & TIR', 'SGLT2i & GLP-1 RA', 'MASLD']
  },
  {
    id: 'kdigo-2024-ckd-guidelines',
    title: 'KDIGO 2024 Clinical Practice Guideline for Chronic Kidney Disease',
    originalTitle: 'KDIGO 2024 CKD Evaluation and Management Guideline',
    author: 'Kidney Disease: Improving Global Outcomes (KDIGO)',
    publisherYear: 'Kidney International (2024)',
    category: 'duoc_lam_sang_qt',
    categoryLabel: 'Sách Thuốc Tây Y Quốc Tế',
    summary: 'Hướng dẫn thực hành Thận học quốc tế 2024 về phân tầng nguy cơ Bệnh thận mạn (G1–G5 theo eGFR và A1–A3 theo uACR), bảo vệ cầu thận 4 lớp (ACEi/ARB, SGLT2i, Finerenone, Statin) và cảnh báo thuốc/thảo dược độc thận.',
    coreConcepts: [
      'Đánh giá kép bắt buộc: eGFR (mL/phút/1.73m²) + Tỷ số Albumin/Creatinine niệu (uACR)',
      'Bộ khung bảo vệ thận mới: Ức chế hệ RAAS + SGLT2i (giảm áp lực lọc cầu thận) + Finerenone (nếu kèm ĐTĐ)',
      'Cảnh báo an toàn: Tránh NSAIDs, thuốc cản quang và thảo dược chứa Aristolochic acid gây suy thận cấp/mạn'
    ],
    clinicalValue: 'Ngăn ngừa tiến triển suy thận mạn giai đoạn cuối phải chạy thận nhân tạo.',
    keyTopics: ['KDIGO 2024', 'Bệnh Thận Mạn CKD', 'eGFR & uACR', 'Bảo Vệ Cầu Thận']
  },
  {
    id: 'gold-2025-gina-2024-respiratory',
    title: 'GOLD 2025 (COPD) & GINA 2024 (Hen Phế Quản) Guidelines',
    originalTitle: 'Global Strategy for Diagnosis, Management & Prevention of COPD / Asthma',
    author: 'GOLD Science Committee & GINA Global Initiative',
    publisherYear: '2024–2025 Update',
    category: 'duoc_lam_sang_qt',
    categoryLabel: 'Sách Thuốc Tây Y Quốc Tế',
    summary: 'Hướng dẫn hô hấp toàn cầu mới nhất: Phân nhóm COPD theo A-B-E dựa trên đợt cấp và điểm mMRC/CAT, liệu pháp hít LABA+LAMA/Triple ICS, và chiến lược Track 1 (ICS-Formoterol cắt cơn & duy trì MART) trong Hen phế quản.',
    coreConcepts: [
      'COPD: Chẩn đoán xác định bằng Hô hấp ký (FEV1/FVC < 0.7 sau test giãn phế quản) và phân tầng ABE',
      'Hen phế quản (GINA 2024): Khuyến cáo KHÔNG dùng SABA đơn độc (Salbutamol) để cắt cơn vì tăng nguy cơ đợt cấp nặng; ưu tiên ICS-Formoterol (Symbicort)',
      'Kỹ thuật sử dụng bình hít định liều, bình hít bột khô và phục hồi chức năng hô hấp'
    ],
    clinicalValue: 'Cập nhật thay đổi mang tính cách mạng trong xử trí Hen phế quản và COPD, giảm tỷ lệ nhập viện vì suy hô hấp.',
    keyTopics: ['GOLD 2025', 'GINA 2024', 'COPD Nhóm ABE', 'ICS-Formoterol', 'Hô Hấp Ký']
  },
  {
    id: 'acr-eular-acg-specialty-guidelines',
    title: 'ACR/EULAR (Cơ Xương Khớp) & ACG/Maastricht VI (Tiêu Hóa)',
    originalTitle: 'ACR/EULAR Rheumatology & Maastricht VI H. pylori / Rome IV Guidelines',
    author: 'ACR, EULAR, ACG & European Helicobacter Study Group',
    publisherYear: '2022–2025 Guidelines',
    category: 'duoc_lam_sang_qt',
    categoryLabel: 'Sách Thuốc Tây Y Quốc Tế',
    summary: 'Chuẩn mực quốc tế mới nhất về Cơ xương khớp (Gout Treat-to-Target Uric < 360 µmol/L, Viêm khớp dạng thấp sớm dùng Methotrexate/DMARDs) và Tiêu hóa (Đồng thuận Maastricht VI tiệt trừ H. pylori phác đồ 4 thuốc có Bismuth 14 ngày & tiêu chuẩn Rome IV chẩn đoán IBS).',
    coreConcepts: [
      'Maastricht VI: Khuyến cáo phác đồ 4 thuốc có Bismuth (PPI + Bismuth + Tetracycline + Metronidazole) trong 14 ngày tại vùng kháng Clarithromycin cao như Việt Nam',
      'Rome IV: Tiêu chuẩn phân biệt IBS-D, IBS-C, IBS-M với Bệnh viêm ruột mạn (IBD)',
      'ACR/EULAR Gout: Chiến lược "Treat-to-Target" duy trì Acid Uric < 360 µmol/L (hoặc < 300 µmol/L nếu có hạt Tophi)'
    ],
    clinicalValue: 'Khắc phục tình trạng kháng kháng sinh diệt HP và tái phát cơn Gout dai dẳng tại Việt Nam.',
    keyTopics: ['Maastricht VI', 'Tiệt Trừ H. pylori', 'Rome IV IBS', 'ACR/EULAR Gout & RA']
  },
  {
    id: 'duoc-dien-viet-nam-v-byt',
    title: 'Dược Điển Việt Nam V & Phác Đồ Bộ Y Tế Cập Nhật',
    originalTitle: 'Pharmacopoeia Vietnamica V (2 Tập)',
    author: 'Hội Đồng Dược Điển Việt Nam - Bộ Y Tế',
    publisherYear: 'Bộ Y Tế (Xuất Bản Lần Thứ 5)',
    category: 'duoc_thu_vn',
    categoryLabel: 'Dược Thư & Điều Trị VN',
    summary: 'Bộ tiêu chuẩn quốc gia cao nhất về chất lượng thuốc Tân dược và Dược liệu Đông y (300+ chuyên luận dược liệu, phương pháp định lượng hoạt chất HPLC, giới hạn kim loại nặng/độc tố Aflatoxin và tiêu chuẩn bào chế).',
    coreConcepts: [
      'Tiêu chuẩn kiểm nghiệm định tính - định lượng hoạt chất sinh học trong dược liệu Việt Nam',
      'Quy chuẩn chế biến cổ truyền (Sao tẩm, Chưng, Thủy phi, Khử độc Phụ tử/Bán hạ/Mã tiền)',
      'Giới hạn an toàn kim loại nặng, dư lượng thuốc bảo vệ thực vật và vi sinh vật'
    ],
    clinicalValue: 'Bảo chứng chất lượng, độ tinh khiết và hiệu lực dược lý chuẩn xác của mọi vị thuốc Đông - Nam Y và Tân dược.',
    keyTopics: ['Dược Điển Việt Nam V', 'Kiểm Nghiệm Dược Liệu', 'Tiêu Chuẩn Bào Chế', 'Bộ Y Tế']
  }
];


