export interface TcmSyndrome {
  id: string;
  name: string;
  sinoVietnamese: string;
  englishName: string;
  category: 'tang_phu' | 'bat_cuong' | 'khi_huyet';
  keyEtiology: string;
  tongueSigns: {
    body: string;
    coating: string;
    color: string;
  };
  pulseSigns: {
    type: string;
    description: string;
  };
  fourExaminations: {
    vong: string; // Looking / Inspection
    van: string;  // Listening & Smelling / Auscultation
    van_ask: string; // Inquiring / Interrogation
    thiet: string; // Palpation / Feeling
  };
  treatmentPrinciple: string; // Pháp trị
  primaryHerbalFormula: {
    name: string;
    sourceBook: string;
    composition: { herb: string; grams: number; role: 'Quân' | 'Thần' | 'Tá' | 'Sứ'; note: string }[];
    preparation: string;
    modifications: string[];
  };
  acupuncturePrescription: {
    classicalPoints: string[];
    tungPoints: string[];
    nguyenTaiThuTechnique: string;
    moxibustion: boolean;
  };
  westernCorrelations: {
    diseases: string[];
    guytonPhysiology: string;
    nutritionAdvice: string[];
  };
}

export const TCM_SYNDROMES: TcmSyndrome[] = [
  {
    id: 'can-khi-uat-ket',
    name: 'Can Khí Uất Kết',
    sinoVietnamese: '肝氣鬱結',
    englishName: 'Liver Qi Stagnation',
    category: 'tang_phu',
    keyEtiology: 'Tình chí uất ức kéo dài (stress, tức giận không phát tiết), thất tình nội thương làm chức năng sơ tiết của tạng Can bị trở trệ, khí cơ toàn thân mất thông suốt.',
    tongueSigns: {
      body: 'Lưỡi thon hoặc bình thường, hai rìa lưỡi đỏ hoặc hơi sưng phồng',
      coating: 'Rêu lưỡi trắng mỏng hoặc hơi khô',
      color: 'Sắc chất lưỡi đỏ nhạt hoặc đỏ tía nhẹ ở rìa Can Đởm'
    },
    pulseSigns: {
      type: 'Mạch Huyền (Mạch căng như dây đàn)',
      description: 'Mạch căng tròn, nắn vào thấy thẳng và dài như ấn trên dây đàn guitar, chủ về đau, khí trệ và bệnh thuộc Can.'
    },
    fourExaminations: {
      vong: 'Sắc mặt ủ rũ, nét mặt căng thẳng, hay cau mày, mắt có thể hơi vằn đỏ hoặc thâm quầng do thiếu ngủ.',
      van: 'Hay thở dài sườn sượt để giải tỏa uất kết, giọng nói gắt gỏng hoặc trầm buồn, hay ợ hơi liên tục.',
      van_ask: 'Ngực sườn đầy tức, đau nhói hai mạng sườn, cảm giác nghẹn ở họng như có hột mận nuốt không vào khạc không ra (Mai hạch khí - Globus pharyngeus). Phụ nữ đau căng tức ngực trước kỳ kinh, kinh nguyệt rối loạn, thống kinh bế kinh.',
      thiet: 'Ấn đau tức điểm huyệt Can Du, Kỳ Môn, Chương Môn, Thái Xung; bụng trên căng trướng mềm.'
    },
    treatmentPrinciple: 'Sơ can giải uất, lý khí chỉ thống, điều hòa khí cơ.',
    primaryHerbalFormula: {
      name: 'Tiêu Dao Tán (Thái Bình Huệ Dân Hòa Tễ Cục Phương)',
      sourceBook: 'Phương Thang Y Học Cổ Truyền - Trần Gia Kỳ & Dan Bensky',
      composition: [
        { herb: 'Sài Hồ', grams: 12, role: 'Quân', note: 'Sơ can giải uất, thấu đạt tà khí sơ tiết can mộc' },
        { herb: 'Đương Quy', grams: 12, role: 'Thần', note: 'Dưỡng huyết hòa vinh, nhu can bổ âm' },
        { herb: 'Bạch Thược', grams: 12, role: 'Thần', note: 'Dưỡng huyết liễm âm, hoãn cấp chỉ thống' },
        { herb: 'Bạch Truật', grams: 12, role: 'Tá', note: 'Kiện tỳ ích khí, ngăn ngừa can mộc khắc tỳ thổ' },
        { herb: 'Phục Linh', grams: 12, role: 'Tá', note: 'Kiện tỳ trừ thấp, an thần định chí' },
        { herb: 'Sinh Khương', grams: 6, role: 'Tá', note: 'Hòa vị giáng nghịch, chỉ ẩu ôn trung' },
        { herb: 'Bạc Hà', grams: 6, role: 'Tá', note: 'Hỗ trợ sài hồ tuyên tiết uất nhiệt' },
        { herb: 'Cam Thảo (chích)', grams: 6, role: 'Sứ', note: 'Điều hòa bách dược, hoãn cấp hòa trung' }
      ],
      preparation: 'Sắc với 800ml nước còn 250ml, chia 2 lần uống ấm trong ngày sau ăn 1 giờ.',
      modifications: [
        'Nếu can uất hóa hỏa (miệng đắng, mắt đỏ, dễ nổi cáu): Thêm Đan Bì 10g, Chi Tử 10g (Thành Đan Chi Tiêu Dao Tán).',
        'Nếu đau tức ngực sườn dữ dội: Thêm Hương Phụ 10g, Uất Kim 10g để tăng hành khí giảm đau.',
        'Nếu mất ngủ bồn chồn: Thêm Toan Táo Nhân 15g, Dạ Giao Đằng 15g.'
      ]
    },
    acupuncturePrescription: {
      classicalPoints: ['Thái Xung (Liv-3 - Tả)', 'Hành Gian (Liv-2)', 'Kỳ Môn (Liv-14)', 'Đản Trung (Ren-17)', 'Nội Quan (PC-6)', 'Tam Âm Giao (SP-6)'],
      tungPoints: ['Linh Cốt (22.05) kết hợp Thái Xung để khai tứ quan dẫn khí hành khắp châu thân.', 'Chính Hội (1010.01) thư giãn vỏ não.'],
      nguyenTaiThuTechnique: 'Châm tả mạnh Thái Xung kết hợp lưu kim 20 phút kích thích tần số 2Hz ngắt quãng làm giải phóng co thắt cơ hoành và cơ trơn tiêu hóa.',
      moxibustion: false
    },
    westernCorrelations: {
      diseases: ['Hội chứng ruột kích thích (IBS)', 'Rối loạn lo âu lan tỏa (GAD)', 'Trào ngược dạ dày thực quản (GERD)', 'Hội chứng tiền kinh nguyệt (PMS)', 'Đau dây thần kinh liên sườn'],
      guytonPhysiology: 'Căng thẳng tâm lý kích hoạt quá mức hệ thần kinh giao cảm (Sympathetic nervous system) và trục Dưới đồi - Tuyến yên - Tuyến thượng thận (HPA axis), làm tăng Cortisol và Catecholamine huyết tương gây co thắt cơ trơn mạch máu mạc treo và cơ trơn ống tiêu hóa.',
      nutritionAdvice: [
        'Bổ sung Magie (300-400mg/ngày) từ rau lá xanh đậm, hạt bí, hạnh nhân để thư giãn cơ bắp và thụ thể GABA não bộ.',
        'Tránh caffeine, rượu bia, đồ cay nóng làm kích thích hưng phấn thần kinh thực vật.',
        'Uống trà thảo mộc hoa cúc, tâm sen, bạc hà mỗi buổi chiều.'
      ]
    }
  },
  {
    id: 'ty-vi-hu-han',
    name: 'Tỳ Vị Hư Hàn',
    sinoVietnamese: '脾胃虛寒',
    englishName: 'Spleen-Stomach Deficient Cold',
    category: 'tang_phu',
    keyEtiology: 'Ăn uống đồ sống lạnh, lạm dụng thuốc kháng sinh, lao lực quá độ hoặc tỳ dương vốn suy yếu làm dương khí tỳ vị không đủ sưởi ấm và vận hóa thủy cốc.',
    tongueSigns: {
      body: 'Lưỡi to bệu, có dấu ấn răng ở rìa lưỡi (tooth marks)',
      coating: 'Rêu lưỡi trắng trơn ướt (trơn nhuận) hoặc trắng dày',
      color: 'Sắc chất lưỡi nhợt nhạt (pale tongue)'
    },
    pulseSigns: {
      type: 'Mạch Trầm Nhược hoặc Mạch Trì Hoãn',
      description: 'Ấn sâu mới thấy mạch, lực mạch yếu ớt, nhịp đập chậm (dưới 60 lần/phút) chủ về dương hư âm hàn sinh nội thấp.'
    },
    fourExaminations: {
      vong: 'Sắc mặt vàng nhợt (Hoàng hoàng), tay chân lạnh ngắt, thân thể mệt mỏi rã rời, thích nằm co ro.',
      van: 'Tiếng nói nhỏ yếu đứt quãng, thở yếu lười nói, hay sôi bụng ọc ọc trong bụng (tràng minh).',
      van_ask: 'Đau bụng âm ỉ, đau dạ dày thích được chườm ấm và xoa bóp (thiện án). Ăn đồ sống lạnh vào là đi ngoài phân lỏng sống phân ngay. Miệng nhạt không khát, sợ lạnh, tiểu tiện trong dài.',
      thiet: 'Sờ vào bụng thấy da bụng mát lạnh, ấn sâu vào bụng cảm thấy êm ái dễ chịu, chân tay lạnh dưới mức nhiệt kế 36 độ C.'
    },
    treatmentPrinciple: 'Ôn trung kiện tỳ, tán hàn chỉ thống.',
    primaryHerbalFormula: {
      name: 'Lý Trung Thang (Thương Hàn Luận - Trương Trọng Cảnh)',
      sourceBook: 'Phương Thang Y Học Cổ Truyền & Dan Bensky',
      composition: [
        { herb: 'Can Khương', grams: 12, role: 'Quân', note: 'Đại ôn trung tiêu, trừ hàn tỳ vị, hồi phục dương khí' },
        { herb: 'Nhân Sâm (hoặc Đảng Sâm)', grams: 12, role: 'Thần', note: 'Đại bổ nguyên khí, kiện tỳ ích khí' },
        { herb: 'Bạch Truật', grams: 12, role: 'Tá', note: 'Kiện tỳ táo thấp, giúp tỳ vận hóa thủy thấp' },
        { herb: 'Cam Thảo (chích)', grams: 6, role: 'Sứ', note: 'Ôn tỳ hòa trung, điều hòa chư dược' }
      ],
      preparation: 'Sắc với 1000ml nước còn 300ml, uống nóng sau bữa ăn.',
      modifications: [
        'Nếu nôn mửa nhiều: Thêm Bán Hạ chế 10g, Sinh Khương 3 lát để giáng nghịch cầm nôn.',
        'Nếu đầy trướng bụng: Thêm Sa Nhân 6g, Mộc Hương 6g để hành khí hóa thấp.',
        'Nếu đại tiện lỏng nhiều, thận dương hư: Thêm Phụ Tử chế 8g, Nhục Quế 4g (Thành Phụ Tử Lý Trung Thang).'
      ]
    },
    acupuncturePrescription: {
      classicalPoints: ['Trung Quản (Ren-12)', 'Túc Tam Lý (ST-36 - Cứu ấm)', 'Tỳ Du (BL-20)', 'Vị Du (BL-21)', 'Khí Hải (Ren-6)', 'Quan Nguyên (Ren-4)'],
      tungPoints: ['Thận Quan (77.18) bồi bổ nguyên dương', 'Tứ Mã (88.17-19) trợ dương hóa khí'],
      nguyenTaiThuTechnique: 'Ôn châm (gắn ngải nhung lên đốc kim châm) hoặc cứu ngải cách gừng tại Túc Tam Lý và Thần Khuyết (Rốn) để hồi dương cứu nghịch.',
      moxibustion: true
    },
    westernCorrelations: {
      diseases: ['Viêm dạ dày mạn tính thể teo', 'Hội chứng kém hấp thu (Malabsorption)', 'Hạ thân nhiệt mạn tính', 'Suy dinh dưỡng thiếu đạm', 'Hội chứng rò rỉ ruột (Leaky Gut)'],
      guytonPhysiology: 'Giảm tiết Acid dịch vị HCl và men tiêu hóa Pepsinogen, giảm nhu động co bóp nhào trộn của dạ dày - ruột theo Guyton & Hall; giảm tưới máu vi tuần hoàn mao mạch niêm mạc ruột non dẫn đến kém hấp thu chất béo và vitamin tan trong dầu.',
      nutritionAdvice: [
        'Ăn thức ăn ấm nóng, nấu chín mềm, bổ sung gừng, tiêu lốt, quế hồi vào món ăn.',
        'Tuyệt đối kiêng nước đá, kem lạnh, gỏi cá sống, rau sống, đồ hộp công nghiệp lạnh.',
        'Bổ sung men vi sinh Probiotics có chủng Lactobacillus rhamnosus & Bifidobacterium để phục hồi hàng rào nhung mao ruột.'
      ]
    }
  },
  {
    id: 'can-duong-thuong-khang',
    name: 'Can Dương Thượng Kháng',
    sinoVietnamese: '肝陽上亢',
    englishName: 'Liver Yang Rising (Hypertension & Vertigo)',
    category: 'tang_phu',
    keyEtiology: 'Can thận âm hư không kiềm chế được Can dương, dương khí vượng thịnh bốc ngược lên đầu não gây hoa mắt chóng mặt và tăng huyết áp kịch phát.',
    tongueSigns: {
      body: 'Chất lưỡi đỏ, đầu lưỡi và rìa lưỡi đỏ tươi',
      coating: 'Rêu lưỡi vàng mỏng hoặc khô ráp',
      color: 'Sắc lưỡi đỏ sẫm (Crimson red)'
    },
    pulseSigns: {
      type: 'Mạch Huyền Sác hoặc Mạch Huyền Tế Sác',
      description: 'Mạch căng như dây đàn, đập nhanh trên 85-90 lần/phút, có lực ở bộ Quan nhưng vô lực ở bộ Xích (chủ về hạ hư thượng thực).'
    },
    fourExaminations: {
      vong: 'Mặt đỏ gay, mắt đỏ xung huyết tia máu, dáng đi vội vã dễ cáu gắt giận dữ đùng đùng.',
      van: 'Tiếng nói to vang, thở mạnh, thở khò khè bốc hỏa.',
      van_ask: 'Đầu căng trướng dữ dội như muốn nổ tung, hoa mắt chóng mặt xây xẩm mặt mày, ù tai như tiếng ve kêu, mất ngủ nhiều mộng mị, miệng đắng họng khô, thắt lưng và đầu gối mỏi yếu.',
      thiet: 'Sờ trán nóng bức, hai bàn chân lạnh; huyết áp đo được thường cao từ 140/90 mmHg đến 180/100 mmHg.'
    },
    treatmentPrinciple: 'Bình can tiềm dương, tư âm giáng hỏa, trấn kinh an thần.',
    primaryHerbalFormula: {
      name: 'Thiên Ma Câu Đằng Ẩm (Tạp Bệnh Chứng Trị Tân Nghĩa)',
      sourceBook: 'Phương Thang Y Học Cổ Truyền & Dan Bensky',
      composition: [
        { herb: 'Thiên Ma', grams: 10, role: 'Quân', note: 'Bình can tức phong, định huyễn vựng' },
        { herb: 'Câu Đằng', grams: 12, role: 'Quân', note: 'Thanh can nhiệt, tức phong giáng nghịch (cho vào sau)' },
        { herb: 'Thạch Quyết Minh', grams: 20, role: 'Thần', note: 'Bình can tiềm dương, giáng hỏa (sắc trước)' },
        { herb: 'Chi Tử', grams: 10, role: 'Tá', note: 'Thanh nhiệt tả hỏa, thanh tâm trừ phiền' },
        { herb: 'Hoàng Cầm', grams: 10, role: 'Tá', note: 'Tả phế can hỏa, thanh nhiệt táo thấp' },
        { herb: 'Ngưu Tất', grams: 12, role: 'Tá', note: 'Dẫn huyết hạ hành, bổ can thận, hoạt huyết' },
        { herb: 'Ích Mẫu Thảo', grams: 12, role: 'Tá', note: 'Hoạt huyết lợi thủy hạ huyết áp' },
        { herb: 'Tang Ký Sinh', grams: 15, role: 'Tá', note: 'Bổ can thận, dưỡng huyết trừ phong thấp' },
        { herb: 'Dạ Giao Đằng', grams: 15, role: 'Tá', note: 'Dưỡng tâm an thần định chí' },
        { herb: 'Phục Thần', grams: 12, role: 'Sứ', note: 'Ninh tâm kiện tỳ hóa ẩm' }
      ],
      preparation: 'Thạch Quyết Minh đập vụn sắc trước 20 phút, Câu Đằng cho vào sau cùng trước khi bắc thuốc ra 5 phút. Sắc uống ngày 1 thang.',
      modifications: [
        'Nếu nhức đầu nặng bốc hỏa dữ dội: Thêm Cúc Hoa 10g, Hạ Khô Thảo 12g.',
        'Nếu táo bón nhiệt kết: Thêm Đại Hoàng chế 6g để tả hỏa thông tiện giáng nghịch.'
      ]
    },
    acupuncturePrescription: {
      classicalPoints: ['Thái Xung (Liv-3 - Tả mạnh)', 'Khúc Trì (LI-11)', 'Phong Trì (GB-20)', 'Bách Hội (Du-20 - Châm luồn ra sau)', 'Dũng Tuyền (KID-1 - Dẫn hỏa quy nguyên)', 'Thái Khê (KID-3)'],
      tungPoints: ['Chính Hội (1010.01)', 'Hạ Tam Hoàng (77.18 Thận Quan + Địa Hoàng + Thiên Hoàng) tiềm dương', 'Trích huyết Nhĩ tiêm (Đỉnh vành tai nặn 3-5 giọt máu hạ huyết áp tức thì)'],
      nguyenTaiThuTechnique: 'Châm tả xuyên thấu Phong Trì hướng về phía mắt bên đối diện, kết hợp bấm huyệt Thái Xung và Dũng Tuyền ngâm chân nước ấm.',
      moxibustion: false
    },
    westernCorrelations: {
      diseases: ['Tăng huyết áp nguyên phát (Essential Hypertension)', 'Cơn đau thắt ngực do co mạch', 'Rối loạn tiền đình (Vestibular Neuritis)', 'Thiểu năng tuần hoàn não (Cerebral Insufficiency)'],
      guytonPhysiology: 'Theo Guyton & Hall: Tăng hoạt tính giao cảm dẫn đến phóng thích Norepinephrine gây co thắt tiểu động mạch ngoại vi, tăng sức cản mạch máu ngoại vi (Total Peripheral Resistance - TPR) và tăng hậu tải thất trái.',
      nutritionAdvice: [
        'Chế độ ăn DASH (Dietary Approaches to Stop Hypertension): Hạn chế Natri dưới 2g/ngày (< 5g muối ăn), tăng thực phẩm giàu Kali (chuối, khoai lang, rau chân vịt) và Canxi.',
        'Bổ sung Coenzyme Q10 (100mg/ngày) và Omega-3 EPA/DHA (2000mg/ngày) để cải thiện độ đàn hồi thành mạch.',
        'Tuyệt đối tránh thuốc lá, rượu mạnh, đồ nướng chiên rán nhiều mỡ động vật.'
      ]
    }
  },
  {
    id: 'khi-tre-huyet-u-than-kinh-toa',
    name: 'Khí Trệ Huyết Ứ (Tọa Cốt Phong)',
    sinoVietnamese: '氣滯血瘀 (坐骨風)',
    englishName: 'Qi Stagnation & Blood Stasis (Sciatica / Lumbar Herniation)',
    category: 'khi_huyet',
    keyEtiology: 'Chấn thương thể thao, mang vác nặng sai tư thế, thoái hóa cột sống hoặc nhiễm phong hàn thấp làm bế tắc kinh lạc Bàng quang và Đởm, khí huyết ứ đọng thành khối đau nhức buốt.',
    tongueSigns: {
      body: 'Chất lưỡi tím ám (Purple tongue), hoặc có các điểm ứ huyết màu tím đen (ứ ban, ứ điểm)',
      coating: 'Rêu lưỡi trắng mỏng hoặc xám nhạt',
      color: 'Sắc lưỡi tím tối (Cyanotic / Dark purple)'
    },
    pulseSigns: {
      type: 'Mạch Sáp (Mạch rít khó đi) hoặc Mạch Huyền Sáp',
      description: 'Mạch đi lại khó khăn như dao cạo nhẹ vào thân tre, mạch rít không trơn tru, chủ về huyết ứ, đau nhức cố định.'
    },
    fourExaminations: {
      vong: 'Dáng đi nghiêng vẹo sang một bên để tránh đau, lưng cứng đơ mất đường cong sinh lý, chống tay vào đùi khi đứng lên.',
      van: 'Tiếng rên rỉ khi đổi tư thế, ho hoặc hắt hơi làm đau chói lan xuống chân dữ dội (Dấu hiệu Dejerine dương tính).',
      van_ask: 'Đau thắt lưng lan xuống mông, mặt sau đùi, cẳng chân đến mu chân hoặc ngón chân út. Đau như dao đâm, đau cố định một chỗ, đau tăng về đêm, chân tê bì như kiến bò, giảm cảm giác.',
      thiet: 'Nghiệm pháp Lasegue (nâng thẳng chân) dương tính < 60 độ. Ấn các điểm Valleix dọc đường đi thần kinh tọa (Hoàn Khiêu, Trật Biên, Ân Môn, Ủy Trung) đau thấu xương.'
    },
    treatmentPrinciple: 'Hoạt huyết hóa ứ, thông kinh chỉ thống, thư cân hoạt lạc.',
    primaryHerbalFormula: {
      name: 'Thân Thống Trục Ứ Thang (Y Lâm Cải Thác - Vương Thanh Nhiệm)',
      sourceBook: 'Phương Thang Y Học Cổ Truyền & Dan Bensky',
      composition: [
        { herb: 'Đương Quy', grams: 12, role: 'Quân', note: 'Hoạt huyết dưỡng huyết, tiêu sưng chỉ thống' },
        { herb: 'Xuyên Khung', grams: 10, role: 'Quân', note: 'Hành khí trong huyết, thông kinh lạc thấu suốt đầu chân' },
        { herb: 'Đào Nhân', grams: 10, role: 'Thần', note: 'Phá huyết tiêu ứ, nhuận táo thông kinh' },
        { herb: 'Hồng Hoa', grams: 8, role: 'Thần', note: 'Hoạt huyết thông kinh, khứ ứ chỉ thống' },
        { herb: 'Một Dược', grams: 8, role: 'Tá', note: 'Tán ứ tiêu thũng, sinh cơ chỉ thống cực mạnh' },
        { herb: 'Ngũ Linh Chi', grams: 8, role: 'Tá', note: 'Thông lợi huyết mạch, chỉ thống' },
        { herb: 'Ngưu Tất', grams: 12, role: 'Tá', note: 'Dẫn dược quy hạ tiêu, tráng gân cốt, thông khớp' },
        { herb: 'Địa Long', grams: 10, role: 'Tá', note: 'Thông kinh hoạt lạc, tiêu trừ đờm ứ' },
        { herb: 'Tần Giao', grams: 10, role: 'Tá', note: 'Trừ phong thấp, thư cân hoạt lạc' },
        { herb: 'Khương Hoạt', grams: 8, role: 'Tá', note: 'Tán phong hàn, chỉ thống' },
        { herb: 'Hương Phụ', grams: 8, role: 'Tá', note: 'Lý khí hành trệ, chỉ thống' },
        { herb: 'Cam Thảo', grams: 6, role: 'Sứ', note: 'Điều hòa các vị thuốc' }
      ],
      preparation: 'Sắc 3 chén nước còn 1 chén, uống ấm sau bữa ăn.',
      modifications: [
        'Nếu phong hàn nặng (chân lạnh buốt, gặp rét đau tăng): Thêm Quế Chi 10g, Tế Tân 4g, Phụ Tử chế 6g.',
        'Nếu can thận hư lâu ngày (teo cơ, lưng gối mỏi rũ): Thêm Đỗ Trọng 12g, Cẩu Tích 12g, Tang Ký Sinh 15g.'
      ]
    },
    acupuncturePrescription: {
      classicalPoints: ['Hoàn Khiêu (GB-30 - Châm sâu 2-3 thốn)', 'Trật Biên (BL-54)', 'Đại Trường Du (BL-25)', 'Ủy Trung (BL-40 - Trích huyết nặn máu)', 'Côn Lôn (BL-60)', 'Dương Lăng Tuyền (GB-34)'],
      tungPoints: ['Linh Cốt (22.05) thấu Trọng Tiên', 'Đại Bạch (22.04)', 'Trung Cửu Lý (88.25) châm sâu 2.5 thốn bên đối diện', 'Thận Quan (77.18)'],
      nguyenTaiThuTechnique: 'Mãng châm Nguyễn Tài Thu: Dùng kim dài 20cm xuyên thấu từ Đại Trường Du xuống Bát Liêu, hoặc từ Hoàn Khiêu thấu Phong Thị kết hợp máy điện châm bước sóng thưa mau 15-20Hz.',
      moxibustion: true
    },
    westernCorrelations: {
      diseases: ['Thoát vị đĩa đệm cột sống thắt lưng L4-L5, L5-S1', 'Hội chứng cơ hình lê (Piriformis Syndrome)', 'Hẹp ống sống thắt lưng (Lumbar Spinal Stenosis)', 'Thoái hóa cột sống thắt lưng'],
      guytonPhysiology: 'Nhân nhầy đĩa đệm thoát vị chèn ép vào rễ thần kinh tủy sống L4, L5 hoặc S1, giải phóng Phospholipase A2 và Prostaglandin E2 gây phản ứng viêm vô khuẩn, phù nề rễ thần kinh và thiếu máu cục bộ sợi trục thần kinh (Axonal ischemia).',
      nutritionAdvice: [
        'Bổ sung Glucosamine Sulfate (1500mg) và Chondroitin (1200mg) hỗ trợ sụn khớp.',
        'Bổ sung Vitamin B complex (B1, B6, B12 liều cao) để nuôi dưỡng bao Myelin của dây thần kinh bị chèn ép.',
        'Nghệ Curcumin dạng Phytosome (500mg 2 lần/ngày) để ức chế COX-2 tự nhiên giảm viêm không hại dạ dày.'
      ]
    }
  }
];
