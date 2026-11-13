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
  },
  {
    id: 'than-am-hu',
    name: 'Thận Âm Hư (Chân Âm Bất Túc)',
    sinoVietnamese: '腎陰虛',
    englishName: 'Kidney Yin Deficiency',
    category: 'tang_phu',
    keyEtiology: 'Bẩm thụ tiên thiên bất túc, bệnh mạn tính lâu ngày hao tổn chân âm, lao lực phòng dục quá độ, thức khuya kéo dài hoặc sau bệnh nhiệt thương âm.',
    tongueSigns: {
      body: 'Lưỡi thon nhỏ, khô ít tân dịch, có thể có vết nứt giữa lưỡi',
      coating: 'Ít rêu hoặc không có rêu (lưỡi trơn láng như gương)',
      color: 'Sắc lưỡi đỏ tươi (Red peeled tongue)'
    },
    pulseSigns: {
      type: 'Mạch Tế Sác (Nhỏ và nhanh)',
      description: 'Mạch đi nhỏ như sợi chỉ, đập nhanh (> 85 lần/phút), bộ Xích ấn vào thấy vô lực; chủ về âm hư sinh nội nhiệt.'
    },
    fourExaminations: {
      vong: 'Người gầy khô, hai gò má ửng hồng về chiều (lưỡng quyền triều hồng), da khô tóc rụng sớm bạc tóc, mắt thâm trũng.',
      van: 'Giọng nói khô khàn nhẹ, đôi khi ù tai tiếng nhỏ như ve kêu.',
      van_ask: 'Đau mỏi thắt lưng và hai đầu gối, lòng bàn tay bàn chân nóng bức (ngũ tâm phiền nhiệt), sốt nhẹ về chiều (triều nhiệt), ra mồ hôi trộm ban đêm (đạo hãn), họng khô khát về đêm, hoa mắt chóng mặt, mất ngủ hay quên, nam giới di tinh mộng tinh, nữ giới kinh ít hoặc bế kinh.',
      thiet: 'Lòng bàn tay bàn chân nóng hơn mu tay chân, ấn vùng huyệt Thận Du và Quan Nguyên thấy mềm yếu.'
    },
    treatmentPrinciple: 'Tư bổ Thận âm, điền tinh ích tủy, giáng hư hỏa.',
    primaryHerbalFormula: {
      name: 'Lục Vị Địa Hoàng Hoàn (Tiểu Nhi Dược Chứng Trực Quyết - Tiền Ất & Hải Thượng Y Tông)',
      sourceBook: 'Hải Thượng Y Tông Tâm Lĩnh & Dan Bensky Formulas',
      composition: [
        { herb: 'Thục Địa Hoàng', grams: 24, role: 'Quân', note: 'Đại bổ chân âm Thận tinh, điền tinh sinh tủy' },
        { herb: 'Sơn Thù Du', grams: 12, role: 'Thần', note: 'Bổ Can sáp tinh, giữ chân âm không thoát' },
        { herb: 'Sơn Dược (Hoài Sơn)', grams: 12, role: 'Thần', note: 'Kiện Tỳ cố Thận, bổ hậu thiên nuôi tiên thiên' },
        { herb: 'Trạch Tả', grams: 9, role: 'Tá', note: 'Thanh tiết Thận hỏa, chống nê trệ của Thục Địa' },
        { herb: 'Mẫu Đơn Bì', grams: 9, role: 'Tá', note: 'Thanh tả Can hỏa, lương huyết tán ứ' },
        { herb: 'Phục Linh', grams: 9, role: 'Tá', note: 'Thẩm thấp kiện Tỳ, trợ Sơn Dược vận hóa' }
      ],
      preparation: 'Sắc 800ml còn 250ml chia 2 lần uống ấm trước ăn 30 phút, hoặc dùng dạng hoàn 12g/lần x 2 lần/ngày với nước muối nhạt loãng.',
      modifications: [
        'Nếu âm hư hỏa vượng nặng (đạo hãn nhiều, xương đau nhức, di tinh): Thêm Tri Mẫu 10g, Hoàng Bá 10g (Tri Bá Địa Hoàng Hoàn).',
        'Nếu mắt mờ, khô mắt, hoa mắt (Can Thận âm hư): Thêm Kỷ Tử 12g, Cúc Hoa 10g (Kỷ Cúc Địa Hoàng Hoàn).',
        'Nếu ho khan, gầy sút (Phế Thận âm hư): Thêm Mạch Môn 12g, Ngũ Vị Tử 6g (Mạch Vị Địa Hoàng Hoàn).'
      ]
    },
    acupuncturePrescription: {
      classicalPoints: ['Thái Khê (KI-3 - Bổ)', 'Phục Lưu (KI-7)', 'Tam Âm Giao (SP-6)', 'Thận Du (BL-23)', 'Chiếu Hải (KI-6)'],
      tungPoints: ['Hạ Tam Hoàng (77.17 Thiên Hoàng, 77.19 Địa Hoàng, 77.21 Nhân Hoàng)', 'Thận Quan (77.18)'],
      nguyenTaiThuTechnique: 'Châm bổ nhẹ lưu kim 20-25 phút, không cứu ngải vùng nhiệt; phối hợp Thái Khê và Tam Âm Giao tư thủy hàm mộc.',
      moxibustion: false
    },
    westernCorrelations: {
      diseases: ['Suy nhược cơ thể & Hội chứng tiền mãn kinh', 'Đái tháo đường type 2 giai đoạn âm hư', 'Bệnh thận mạn giai đoạn đầu', 'Loãng xương & Thoái hóa khớp mạn tính'],
      guytonPhysiology: 'Suy giảm Estrogen/Testosterone nội sinh kèm tăng hoạt tính trục giao cảm ban đêm, giảm giữ nước nội bào và tăng nồng độ chất chuyển hóa gây tăng sinh nhiệt nhẹ về chiều.',
      nutritionAdvice: [
        'Ưu tiên thực phẩm tư âm dưỡng huyết: vừng đen, đậu đen, kỷ tử, mộc nhĩ trắng, hải sâm, cá chép.',
        'Kiêng tuyệt đối đồ cay nóng (ớt, tiêu, rượu mạnh) và tránh thức khuya sau 23h.'
      ]
    }
  },
  {
    id: 'than-duong-hu',
    name: 'Thận Dương Hư (Mệnh Môn Hỏa Suy)',
    sinoVietnamese: '腎陽虛',
    englishName: 'Kidney Yang Deficiency',
    category: 'tang_phu',
    keyEtiology: 'Tuổi cao nguyên dương suy yếu, bẩm tố hư hàn, bệnh mạn tính lâu ngày tổn dương hoặc hàn thấp xâm nhập làm Mệnh môn hỏa suy giảm chức năng ôn ấm toàn thân.',
    tongueSigns: {
      body: 'Lưỡi to bệu nhợt, hằn vết răng hai bên',
      coating: 'Rêu lưỡi trắng ướt trơn nhuận',
      color: 'Sắc lưỡi nhợt trắng (Pale swollen tongue)'
    },
    pulseSigns: {
      type: 'Mạch Trầm Tế Nhược hoặc Trì Nhược',
      description: 'Mạch chìm sâu, nhỏ yếu, đặc biệt bộ Xích hai tay rất yếu vô lực; chủ về dương khí hư suy không cổ động được huyết mạch.'
    },
    fourExaminations: {
      vong: 'Sắc mặt trắng bệch hoặc tối xạm (lê hắc), tinh thần uể oải, hai mắt thâm sạm, chân tay lạnh cóng, phù nhẹ hai chi dưới ấn lõm.',
      van: 'Tiếng thở nhỏ yếu, ngại nói, hơi thở nhẹ.',
      van_ask: 'Sợ lạnh kinh niên, từ thắt lưng trở xuống lạnh buốt như ngâm nước, đau mỏi lưng gối, tiểu đêm nhiều lần nước tiểu trong dài hoặc tiểu ít phù thũng, đi ngoài lỏng lúc 4-5h sáng (ngũ canh tả), suy giảm sinh lý, liệt dương, lãnh cảm.',
      thiet: 'Vùng bụng dưới rốn và hai bàn chân lạnh buốt, ấn sâu bụng dưới thấy mềm lạnh.'
    },
    treatmentPrinciple: 'Ôn bổ Thận dương, ích tinh điền tủy, hóa khí hành thủy.',
    primaryHerbalFormula: {
      name: 'Thận Khí Hoàn / Hữu Quy Hoàn (Kim Quỹ Yếu Lược & Cảnh Nhạc Toàn Thư)',
      sourceBook: 'Kim Quỹ Yếu Lược (Trương Trọng Cảnh) & Cảnh Nhạc Toàn Thư',
      composition: [
        { herb: 'Thục Địa Hoàng', grams: 24, role: 'Quân', note: 'Thiện bổ âm trung cầu dương, bồi bổ Thận tinh' },
        { herb: 'Sơn Dược', grams: 12, role: 'Thần', note: 'Kiện Tỳ cố tinh' },
        { herb: 'Sơn Thù Du', grams: 12, role: 'Thần', note: 'Bổ Can Thận sáp tinh' },
        { herb: 'Phụ Tử Chế', grams: 6, role: 'Quân', note: 'Đại ôn Mệnh môn hỏa, hồi dương tán hàn' },
        { herb: 'Nhục Quế', grams: 4, role: 'Thần', note: 'Ôn bổ Thận dương, dẫn hỏa quy nguyên' },
        { herb: 'Trạch Tả, Phục Linh, Đan Bì', grams: 9, role: 'Tá', note: 'Tam tả thẩm thấp thanh hư trọc, phối hợp âm dương cân bằng' }
      ],
      preparation: 'Phụ tử chế sắc trước 30 phút để khử độc aconitine; sắc chung còn 250ml uống ấm sau ăn.',
      modifications: [
        'Nếu phù thũng toàn thân, tiểu ít (Thận dương hư thủy phiếm): Thêm Ngưu Tất 12g, Xa Tiền Tử 12g (Tế Sinh Thận Khí Hoàn).',
        'Nếu ngũ canh tả sáng sớm: Phối hợp Tứ Thần Hoàn (Bổ Cốt Chỉ 12g, Ngô Thù Du 6g, Nhục Đậu Khấu 10g, Ngũ Vị Tử 8g).'
      ]
    },
    acupuncturePrescription: {
      classicalPoints: ['Mệnh Môn (GV-4 - Cứu ấm)', 'Quan Nguyên (CV-4 - Cứu)', 'Khí Hải (CV-6)', 'Thận Du (BL-23)', 'Thái Khê (KI-3)', 'Túc Tam Lý (ST-36)'],
      tungPoints: ['Thận Quan (77.18)', 'Linh Cốt (22.05) bổ dương khí toàn thân'],
      nguyenTaiThuTechnique: 'Ôn châm và cứu ngải điếu trực tiếp trên các huyệt Mệnh Môn, Quan Nguyên, Thận Du mỗi huyệt 10-15 phút để phục hồi Mệnh môn chân hỏa.',
      moxibustion: true
    },
    westernCorrelations: {
      diseases: ['Suy giáp nguyên phát (Hypothyroidism)', 'Suy tuyến thượng thận mạn', 'Bệnh thận mạn giai đoạn phù giữ nước', 'Rối loạn cương dương & Phì đại tiền liệt tuyến'],
      guytonPhysiology: 'Giảm chuyển hóa cơ bản (BMR), giảm hoạt tính bơm Na+/K+ ATPase sinh nhiệt và suy giảm đáp ứng trục Hạ đồi - Tuyến yên - Thượng thận/Tuyến giáp.',
      nutritionAdvice: [
        'Ưu tiên thức ăn tính ấm bổ dương: thịt cừu, tôm đồng, hẹ, gừng nướng, quế, hồ đào, hạt dẻ.',
        'Tuyệt đối tránh đồ sống lạnh, nước đá, hải sản tính hàn (cua, ốc, hến).'
      ]
    }
  },
  {
    id: 'ty-than-duong-hu',
    name: 'Tỳ Thận Dương Hư (Ngũ Canh Tả)',
    sinoVietnamese: '脾腎陽虛',
    englishName: 'Spleen & Kidney Yang Deficiency',
    category: 'tang_phu',
    keyEtiology: 'Tỳ dương hư lâu ngày làm liên lụy Thận dương (hậu thiên bất dưỡng tiên thiên), hoặc Thận dương hư không ôn ấm được Tỳ thổ (Mệnh môn hỏa bất sinh Tỳ thổ).',
    tongueSigns: {
      body: 'Lưỡi nhợt bệu mềm, có hằn răng rõ hai bên',
      coating: 'Rêu trắng dày trơn ướt',
      color: 'Nhợt trắng hoặc hơi xám ẩm'
    },
    pulseSigns: {
      type: 'Mạch Trầm Trì Tế Nhược',
      description: 'Mạch sâu, chậm và yếu ớt ở cả bộ Quan và bộ Xích.'
    },
    fourExaminations: {
      vong: 'Mặt trắng nhợt phù nhẹ, mệt mỏi rã rời, thích cuộn người sưởi ấm, chân tay lạnh buốt.',
      van: 'Tiếng nói nhỏ thều thào, bụng sôi ọc ọc trước khi đi ngoài.',
      van_ask: 'Đau bụng quặn nhẹ quanh rốn vào lúc tảng sáng 4-5h sáng (Ngũ canh tả / Kê minh tả), đi ngoài phân lỏng nát lẫn thức ăn chưa tiêu, đi xong thấy đỡ đau, ăn kém đầy bụng, sợ lạnh, phù thũng chi dưới.',
      thiet: 'Da bụng mát lạnh, ấn vùng Trung Quản và Thiên Xu thấy mềm nhão dễ chịu khi chườm ấm.'
    },
    treatmentPrinciple: 'Ôn bổ Tỳ Thận, sáp trường chỉ tả.',
    primaryHerbalFormula: {
      name: 'Tứ Thần Hoàn hợp Phụ Tử Lý Trung Thang (Chứng Trị Chuẩn Thằng & Thương Hàn Luận)',
      sourceBook: 'Thương Hàn Luận & Phương Thang YHCT',
      composition: [
        { herb: 'Bổ Cốt Chỉ', grams: 12, role: 'Quân', note: 'Ôn bổ Thận dương, sáp trường chỉ tả đặc hiệu' },
        { herb: 'Nhục Đậu Khấu', grams: 10, role: 'Thần', note: 'Ôn Tỳ Vị, sáp đại trường cầm tiêu chảy' },
        { herb: 'Ngô Thù Du', grams: 6, role: 'Tá', note: 'Ôn trung tán hàn, trừ hàn thấp tỳ vị' },
        { herb: 'Ngũ Vị Tử', grams: 8, role: 'Tá', note: 'Thu liễm cố sáp đại trường, bổ Thận' },
        { herb: 'Can Khương, Bạch Truật, Đảng Sâm', grams: 10, role: 'Tá', note: 'Kiện Tỳ ôn trung, phục hồi vận hóa' }
      ],
      preparation: 'Sắc 700ml còn 250ml, chia 2 lần uống ấm trước ăn hoặc buổi tối trước khi ngủ.',
      modifications: [
        'Nếu phù thũng chi dưới nhiều: Thêm Phục Linh 15g, Quế Chi 8g, Trư Linh 12g.',
        'Nếu sa trực tràng (trĩ sa): Thêm Hoàng Kỳ 16g, Thăng Ma 8g, Sài Hồ 8g.'
      ]
    },
    acupuncturePrescription: {
      classicalPoints: ['Thần Khuyết (CV-8 - Cứu cách muối/gừng)', 'Thiên Xu (ST-25)', 'Túc Tam Lý (ST-36)', 'Tỳ Du (BL-20)', 'Thận Du (BL-23)', 'Mệnh Môn (GV-4)'],
      tungPoints: ['Trường Môn (33.10)', 'Môn Kim (66.05)', 'Thận Quan (77.18)'],
      nguyenTaiThuTechnique: 'Cứu cách gừng tại Thần Khuyết và Thiên Xu kết hợp ôn châm Túc Tam Lý để cắt cơn tiêu chảy tảng sáng.',
      moxibustion: true
    },
    westernCorrelations: {
      diseases: ['Viêm đại tràng mạn tính thể lỏng', 'Hội chứng ruột kích thích thể tiêu chảy (IBS-D)', 'Bệnh Crohn hoặc kém hấp thu mạn', 'Suy giáp kèm phù ngoại biên'],
      guytonPhysiology: 'Rối loạn nhịp sinh học nhu động đại tràng (Gastrocolic & Circadian colonic motility reflex) vào rạng sáng do tăng trương lực phó giao cảm và suy giảm hấp thu nước - điện giải tại biểu mô đại tràng.',
      nutritionAdvice: [
        'Ăn chín uống sôi, chia nhỏ bữa ăn dễ tiêu: cháo gừng thịt nạc, củ mài (hoài sơn), hạt sen.',
        'Kiêng sữa tươi có lactose, đồ ăn lạnh sống, gỏi, rau sống và đồ nhiều dầu mỡ.'
      ]
    }
  },
  {
    id: 'tam-ty-luong-hu',
    name: 'Tâm Tỳ Lưỡng Hư',
    sinoVietnamese: '心脾兩虛',
    englishName: 'Heart & Spleen Dual Deficiency',
    category: 'khi_huyet',
    keyEtiology: 'Lo nghĩ quá độ (tư lự thương Tỳ), làm việc trí óc căng thẳng kéo dài, hoặc mất máu mạn tính dẫn đến Tâm huyết bất túc và Tỳ khí hư suy không sinh huyết.',
    tongueSigns: {
      body: 'Lưỡi nhợt nhỏ hoặc hơi bệu, có vết hằn răng nhẹ',
      coating: 'Rêu trắng mỏng',
      color: 'Nhợt nhạt thiếu huyết sắc'
    },
    pulseSigns: {
      type: 'Mạch Tế Nhược (Nhỏ và yếu)',
      description: 'Mạch nhỏ yếu ở cả hai bộ Thốn và Quan bên phải - trái, phản ánh khí huyết đều bất túc.'
    },
    fourExaminations: {
      vong: 'Sắc mặt vàng bủng hoặc trắng nhợt không tươi, môi nhợt, thần sắc mệt mỏi, hay thẫn thờ.',
      van: 'Giọng nói nhỏ nhẹ hụt hơi, dễ thở dốc khi leo cầu thang.',
      van_ask: 'Mất ngủ triền miên, ngủ không sâu hay mộng mị, hồi hộp đánh trống ngực (kinh quý chính xung), hay quên, hoa mắt chóng mặt khi đứng lên, ăn uống kém ngon, đầy bụng sau ăn, đại tiện nát, phụ nữ rong kinh hoặc kinh nhạt màu ít.',
      thiet: 'Da cơ mềm nhão, ấn huyệt Nội Quan và Túc Tam Lý thấy hơi rỗng yếu.'
    },
    treatmentPrinciple: 'Ích khí kiện Tỳ, bổ huyết dưỡng Tâm an thần.',
    primaryHerbalFormula: {
      name: 'Quy Tỳ Thang (Tế Sinh Phương - Nghiêm Dụng Hòa)',
      sourceBook: 'Phương Thang YHCT & Dan Bensky Formulas',
      composition: [
        { herb: 'Hoàng Kỳ', grams: 16, role: 'Quân', note: 'Đại bổ Tỳ Phế khí, sinh huyết nhiếp huyết' },
        { herb: 'Nhân Sâm (hoặc Đảng Sâm)', grams: 12, role: 'Quân', note: 'Ích khí bổ Tỳ, định tâm an thần' },
        { herb: 'Long Nhãn Nhục', grams: 12, role: 'Thần', note: 'Bổ Tâm huyết, dưỡng Tỳ an thần' },
        { herb: 'Toan Táo Nhân (sao đen)', grams: 12, role: 'Thần', note: 'Dưỡng Tâm can huyết, ninh tâm liễm hãn' },
        { herb: 'Đương Quy', grams: 10, role: 'Tá', note: 'Bổ huyết hòa vinh, phối Hoàng Kỳ tăng tạo hồng cầu' },
        { herb: 'Bạch Truật, Phục Thần, Viễn Chí', grams: 10, role: 'Tá', note: 'Kiện Tỳ trừ thấp, giao thông Tâm Thận, an thần định chí' },
        { herb: 'Mộc Hương & Chích Cam Thảo', grams: 6, role: 'Sứ', note: 'Lý khí tỉnh Tỳ chống nê trệ, điều hòa phương thuốc' }
      ],
      preparation: 'Sắc với 3 lát Sinh Khương và 3 quả Đại Táo, chia 2 lần uống ấm sau ăn.',
      modifications: [
        'Nếu rong kinh, xuất huyết dưới da (Tỳ bất thống huyết): Thêm A Giao 10g (hòa tan), Ngải Diệp 10g, Bồ Hoàng sao 10g.',
        'Nếu mất ngủ kèm bồn chồn nóng trong: Thêm Bá Tử Nhân 12g, Mạch Môn 12g.'
      ]
    },
    acupuncturePrescription: {
      classicalPoints: ['Thần Môn (HT-7)', 'Nội Quan (PC-6)', 'Tâm Du (BL-15)', 'Tỳ Du (BL-20)', 'Tam Âm Giao (SP-6)', 'Túc Tam Lý (ST-36)'],
      tungPoints: ['Thông Quan (88.01)', 'Thông Sơn (88.02)', 'Trấn Tĩnh (1010.08)'],
      nguyenTaiThuTechnique: 'Châm bổ Thần Môn, Tam Âm Giao kết hợp cứu ấm Tỳ Du, Túc Tam Lý mỗi ngày 1 lần trong 10-14 ngày.',
      moxibustion: true
    },
    westernCorrelations: {
      diseases: ['Mất ngủ mạn tính & Suy nhược thần kinh', 'Thiếu máu thiếu sắt / Thiếu máu mạn', 'Rối loạn thần kinh tim & Hạ huyết áp tư thế', 'Xuất huyết giảm tiểu cầu mạn mức độ nhẹ'],
      guytonPhysiology: 'Thiếu hụt Hemoglobin làm giảm vận chuyển Oxy đến vỏ não và cơ tim gây nhịp tim nhanh bù trừ, kết hợp giảm tổng hợp Serotonin/GABA từ tiền chất Tryptophan do kém hấp thu ruột.',
      nutritionAdvice: [
        'Bổ sung thực phẩm giàu sắt Heme, Vitamin B12, Acid Folic và Tryptophan: thịt bò nạc, táo đỏ, hạt sen, long nhãn, trứng gà.',
        'Uống trà tâm sen - long nhãn - hoa cúc buổi tối; tránh trà đặc, cà phê làm cản trở hấp thu sắt.'
      ]
    }
  },
  {
    id: 'tam-than-bat-giao',
    name: 'Tâm Thận Bất Giao (Âm Hư Hỏa Vượng)',
    sinoVietnamese: '心腎不交',
    englishName: 'Heart & Kidney Not Harmonized',
    category: 'tang_phu',
    keyEtiology: 'Thận thủy suy hư không thăng lên tư dưỡng chế ước được Tâm hỏa (Thủy bất tế Hỏa), khiến Tâm hỏa độc kháng bốc cháy ở thượng tiêu gây mất ngủ bứt rứt.',
    tongueSigns: {
      body: 'Đầu lưỡi đỏ tươi (vùng Tâm), chất lưỡi thon khô',
      coating: 'Ít rêu hoặc không rêu, giữa lưỡi có rãnh nứt',
      color: 'Đỏ rực đặc biệt ở chóp lưỡi'
    },
    pulseSigns: {
      type: 'Mạch Tế Sác',
      description: 'Mạch nhỏ và nhanh, bộ Thốn phù sác nhưng bộ Xích trầm tế vô lực.'
    },
    fourExaminations: {
      vong: 'Sắc mặt hốc hác, hai gò má đỏ nhẹ, bồn chồn đứng ngồi không yên, có thể có vết loét nhiệt ở đầu lưỡi.',
      van: 'Giọng nói nhanh hơi gấp gáp, hay thở dài bứt rứt.',
      van_ask: 'Khó vào giấc ngủ hoặc thức trắng cả đêm, tâm phiền bứt rứt khó chịu trong lồng ngực, hồi hộp trống ngực, ù tai chóng mặt, hay quên, lòng bàn tay chân nóng, đạo hãn về đêm, đau lưng mỏi gối, di tinh, tiểu vàng rắt.',
      thiet: 'Đầu lưỡi nóng đỏ, huyệt Dũng Tuyền lạnh hoặc khô nóng, ấn Nội Quan thấy mạch căng nhỏ.'
    },
    treatmentPrinciple: 'Tư âm giáng hỏa, giao thông Tâm Thận.',
    primaryHerbalFormula: {
      name: 'Thiên Vương Bổ Tâm Đan / Giao Thái Hoàn (Nhiếp Sinh Bí Phẩu & Hàn Thị Y Thông)',
      sourceBook: 'Phương Thang YHCT & Dan Bensky Formulas',
      composition: [
        { herb: 'Hoàng Liên', grams: 6, role: 'Quân', note: 'Thanh tả Tâm hỏa trực tiếp vùng thượng tiêu' },
        { herb: 'Nhục Quế', grams: 2, role: 'Thần', note: 'Ôn Thận dương dẫn hỏa quy nguyên (tạo cặp Giao Thái Hoàn kinh điển)' },
        { herb: 'Sinh Địa Hoàng & Huyền Sâm', grams: 16, role: 'Quân', note: 'Tư bổ Thận âm, thanh nhiệt lương huyết' },
        { herb: 'Mạch Môn Đông & Thiên Môn Đông', grams: 12, role: 'Thần', note: 'Dưỡng âm thanh tâm trừ phiền' },
        { herb: 'Toan Táo Nhân & Bá Tử Nhân', grams: 12, role: 'Tá', note: 'Dưỡng tâm an thần liễm hãn' },
        { herb: 'Đương Quy, Đan Sâm & Viễn Chí', grams: 10, role: 'Tá', note: 'Hoạt huyết dưỡng tâm, khai khiếu định chí' }
      ],
      preparation: 'Sắc uống ngày 1 thang, ưu tiên uống một nửa vào chiều muộn và một nửa trước ngủ 1.5 giờ.',
      modifications: [
        'Nếu loét miệng lưỡi nhiều: Phối hợp Đạo Xích Tán (Mộc Thông 6g, Trúc Diệp 10g, Sinh Địa 16g, Cam Thảo Tiêu 6g).',
        'Nếu hồi hộp nặng: Thêm Long Cốt 15g, Mẫu Lệ 15g sắc trước.'
      ]
    },
    acupuncturePrescription: {
      classicalPoints: ['Thần Môn (HT-7)', 'Thái Khê (KI-3)', 'Dũng Tuyền (KI-1 - Cứu hoặc xoa ấm dẫn hỏa quy nguyên)', 'Tam Âm Giao (SP-6)', 'Nội Quan (PC-6)'],
      tungPoints: ['Trấn Tĩnh (1010.08)', 'Tâm Linh (33.17)', 'Thận Quan (77.18)'],
      nguyenTaiThuTechnique: 'Châm tả nhẹ Thần Môn kết hợp châm bổ Thái Khê, đồng thời bấm day huyệt Dũng Tuyền dưới lòng bàn chân mỗi tối 5 phút.',
      moxibustion: false
    },
    westernCorrelations: {
      diseases: ['Rối loạn giấc ngủ mạn tính & Lo âu mãn', 'Hội chứng rối loạn tiền mãn kinh (bốc hỏa, mất ngủ)', 'Cường giao cảm mạn tính & Nhiệt miệng tái phát'],
      guytonPhysiology: 'Tăng hoạt tính hệ lưới hoạt hóa truyền lên (ARAS) và Cortisol buổi tối kèm sụt giảm Melatonin tuyến tùng và ức chế GABA vỏ não.',
      nutritionAdvice: [
        'Ăn hạt sen, củ cải trắng, lê hấp, đậu đen, rau dền, trà hoa cúc - tâm sen lượng vừa phải.',
        'Ngâm chân nước ấm pha muối gừng lúc 21h để giãn mạch ngoại vi, hạ nhiệt trung tâm não bộ giúp dễ vào giấc.'
      ]
    }
  },
  {
    id: 'can-dam-thap-nhiet',
    name: 'Can Đởm Thấp Nhiệt',
    sinoVietnamese: '肝膽濕熱',
    englishName: 'Liver & Gallbladder Damp-Heat',
    category: 'tang_phu',
    keyEtiology: 'Cảm thụ ngoại tà thấp nhiệt, uống nhiều rượu bia đồ béo ngọt cay nóng làm thấp nhiệt uất kết tại Can Đởm, khiến Đởm trấp tràn ra ngoài sinh vàng da và thấp nhiệt rót xuống hạ tiêu.',
    tongueSigns: {
      body: 'Chất lưỡi đỏ, hai rìa lưỡi đỏ đậm',
      coating: 'Rêu lưỡi vàng dày nhớt (Yellow greasy coating)',
      color: 'Đỏ rực kèm rêu vàng bẩn'
    },
    pulseSigns: {
      type: 'Mạch Huyền Hoạt Sác',
      description: 'Mạch căng như dây đàn (Can), trơn trượt (Đàm thấp) và đập nhanh có lực (Nhiệt).'
    },
    fourExaminations: {
      vong: 'Củng mạc mắt vàng, da vàng tươi như màu quả cam (Dương hoàng), mặt đỏ dầu nhờn hay nổi mụn nhọt.',
      van: 'Hơi thở hôi nồng, hay ợ hơi mùi chua đắng.',
      van_ask: 'Đau căng tức vùng hạ sườn phải, miệng đắng họng khô, buồn nôn sợ mùi dầu mỡ, ăn kém chướng bụng, nước tiểu vàng sậm ít, táo bón hoặc phân dính nhớt thối; nam giới sưng đau ẩm ngứa bìu dái, nữ giới khí hư vàng hôi ngứa âm đạo.',
      thiet: 'Ấn vùng hạ sườn phải (Kỳ Môn, Nhật Nguyệt) đau nhói phản ứng (Murphy dương tính nếu viêm túi mật).'
    },
    treatmentPrinciple: 'Thanh lợi Can Đởm thấp nhiệt, sơ can lợi đởm.',
    primaryHerbalFormula: {
      name: 'Long Đởm Tả Can Thang / Nhân Trần Cao Thang (Y Phương Tập Giải & Thương Hàn Luận)',
      sourceBook: 'Thương Hàn Luận & Phương Thang YHCT - Dan Bensky',
      composition: [
        { herb: 'Long Đởm Thảo', grams: 8, role: 'Quân', note: 'Đại đắng đại hàn, tả thực hỏa ở Can Đởm và thanh thấp nhiệt hạ tiêu' },
        { herb: 'Nhân Trần Cao', grams: 24, role: 'Quân', note: 'Thanh lợi thấp nhiệt Can Đởm, thoái hoàng (giảm Bilirubin) đặc hiệu' },
        { herb: 'Hoàng Cầm & Chi Tử', grams: 10, role: 'Thần', note: 'Thanh nhiệt tả hỏa tam tiêu, giải độc gan mật' },
        { herb: 'Sài Hồ & Đương Quy', grams: 10, role: 'Tá', note: 'Sơ can dưỡng huyết, tránh thuốc đắng lạnh làm thương Can âm' },
        { herb: 'Xa Tiền Tử, Trạch Tả, Sinh Địa', grams: 12, role: 'Tá', note: 'Lợi thấp thông lâm dẫn nhiệt ra đường tiểu' }
      ],
      preparation: 'Sắc uống ấm chia 2 lần sau ăn; uống thành đợt 10-14 ngày, khi hết rêu vàng nhớt thì giảm liều thuốc đắng lạnh.',
      modifications: [
        'Nếu sỏi mật, đau quặn hạ sườn phải: Thêm Kim Tiền Thảo 20g, Uất Kim 12g, Chỉ Xác 10g.',
        'Nếu men gan tăng cao (viêm gan): Thêm Diệp Hạ Châu 16g, Cà Gai Leo 16g, Ngũ Vị Tử 8g.'
      ]
    },
    acupuncturePrescription: {
      classicalPoints: ['Dương Lăng Tuyền (GB-34 - Hợp huyệt Đởm)', 'Thái Xung (LR-3)', 'Kỳ Môn (LR-14)', 'Đởm Du (BL-19)', 'Âm Lăng Tuyền (SP-9)', 'Khúc Trì (LI-11)'],
      tungPoints: ['Thượng Tam Hoàng (88.12 - 88.14 - Đặc hiệu trị viêm gan/men gan cao)', 'Can Môn (33.11)', 'Mộc Viêm (11.10)'],
      nguyenTaiThuTechnique: 'Châm tả Dương Lăng Tuyền, Thái Xung kết hợp điện châm hạ men gan và giãn cơ vòng Oddi dẫn lưu mật.',
      moxibustion: false
    },
    westernCorrelations: {
      diseases: ['Viêm gan virus B/C cấp & mạn đợt tiến triển', 'Gan nhiễm mỡ có viêm (MASH/NASH) tăng AST/ALT', 'Viêm túi mật, Sỏi mật', 'Viêm đường tiết niệu / Viêm phần phụ cấp'],
      guytonPhysiology: 'Hoại tử tế bào gan giải phóng AST/ALT và giảm liên hợp/bài tiết Bilirubin tại tiểu quản mật gây vàng da tắc mật và kích hoạt đáp ứng viêm Cytokine tại nhu mô gan - đường mật.',
      nutritionAdvice: [
        'Tuyệt đối kiêng rượu bia, mỡ động vật, nội tạng, lòng đỏ trứng và đồ chiên xào cay nóng.',
        'Ăn thanh đạm giàu rau xanh (rau má, atiso, cải đắng), trái cây giàu Vitamin C và uống đủ nước.'
      ]
    }
  },
  {
    id: 'phe-am-hu',
    name: 'Phế Âm Hư (Táo Nhiệt Thương Phế)',
    sinoVietnamese: '肺陰虛',
    englishName: 'Lung Yin Deficiency',
    category: 'tang_phu',
    keyEtiology: 'Ho kéo dài hao tổn phế âm, cảm phải táo nhiệt ngoại tà, hút thuốc lá lâu năm, hoặc Thận âm hư không nuôi dưỡng được Phế kim (Kim Thủy tương sinh suy giảm).',
    tongueSigns: {
      body: 'Chất lưỡi đỏ khô, vùng đầu lưỡi (Phế) đỏ và mỏng',
      coating: 'Ít rêu hoặc rêu trắng khô tróc',
      color: 'Đỏ khô ít tân dịch'
    },
    pulseSigns: {
      type: 'Mạch Tế Sác',
      description: 'Mạch nhỏ, nhanh, đặc biệt bộ Thốn bên phải hơi phù mà không có lực khi ấn sâu.'
    },
    fourExaminations: {
      vong: 'Người gầy gò, da khô, hai gò má ửng đỏ về chiều, giọng khàn hoặc mất tiếng.',
      van: 'Ho khan từng cơn ngắn, tiếng ho đục hoặc không có đờm, hoặc đờm rất ít đặc dính khó khạc, đôi khi lẫn tia máu.',
      van_ask: 'Khô họng ngứa cổ họng nhiều về chiều tối và đêm, sốt nhẹ về chiều, mồ hôi trộm ban đêm, lòng bàn tay bàn chân nóng bức, hay khát nước.',
      thiet: 'Da vùng ngực khô nóng, ấn huyệt Trung Phủ và Phế Du thấy hơi tức nhẹ.'
    },
    treatmentPrinciple: 'Dưỡng âm nhuận Phế, thanh nhiệt chỉ khái.',
    primaryHerbalFormula: {
      name: 'Bách Hợp Cố Kim Thang / Sa Sâm Mạch Đông Thang (Y Phương Tập Giải & Ôn Bệnh Điều Biện)',
      sourceBook: 'Ôn Bệnh Điều Biện (Ngô Cúc Thông) & Phương Thang YHCT',
      composition: [
        { herb: 'Bách Hợp', grams: 12, role: 'Quân', note: 'Nhuận Phế thanh tâm, dưỡng âm chỉ khái' },
        { herb: 'Sinh Địa & Thục Địa', grams: 16, role: 'Quân', note: 'Tư bổ Thận thủy để Kim Thủy tương sinh dưỡng Phế' },
        { herb: 'Mạch Môn Đông & Bắc Sa Sâm', grams: 12, role: 'Thần', note: 'Sinh tân dịch, dưỡng Phế Vị âm' },
        { herb: 'Bối Mẫu (Xuyên Bối Mẫu)', grams: 10, role: 'Tá', note: 'Nhuận phế hóa đờm dính, chỉ khái' },
        { herb: 'Huyền Sâm, Đương Quy, Bạch Thược', grams: 10, role: 'Tá', note: 'Tư âm lương huyết, chế ức hư hỏa' },
        { herb: 'Cát Cánh & Cam Thảo', grams: 6, role: 'Sứ', note: 'Tuyên phế lợi yết hầu, dẫn thuốc đi lên Phế' }
      ],
      preparation: 'Sắc nhỏ lửa 800ml còn 250ml uống ấm làm 2 lần trong ngày; tránh dùng thuốc phát tán cay nóng.',
      modifications: [
        'Nếu khạc đờm lẫn tia máu: Thêm Bạch Cập 10g, A Giao 10g, Tiên Hạc Thảo 15g.',
        'Nếu đạo hãn nhiều: Thêm Ngũ Vị Tử 6g, Địa Cốt Bì 12g.'
      ]
    },
    acupuncturePrescription: {
      classicalPoints: ['Thái Uyên (LU-9)', 'Xích Trạch (LU-5)', 'Phế Du (BL-13)', 'Thái Khê (KI-3)', 'Liệt Khuyết (LU-7)'],
      tungPoints: ['Tứ Mã (88.17 - 88.19 - Đặc hiệu bệnh Phổi/Phế)', 'Thủy Kim (1010.19) & Thủy Thông (1010.20)'],
      nguyenTaiThuTechnique: 'Châm bổ Thái Uyên và Thái Khê (Kim Thủy tương sinh), châm bình bổ bình tả Liệt Khuyết, Xích Trạch; tuyệt đối không cứu nóng.',
      moxibustion: false
    },
    westernCorrelations: {
      diseases: ['Viêm họng/Viêm thanh quản teo mạn tính', 'Ho khan kéo dài sau nhiễm siêu vi', 'Giãn phế quản / Lao phổi ổn định cần phục hồi', 'Hen phế quản thể khô ở người lớn tuổi'],
      guytonPhysiology: 'Tổn thương lớp chất nhầy lông chuyển (Mucociliary escalator) và teo tuyến tiết nhầy niêm mạc khí phế quản làm bộc lộ các thụ thể ho (Irritant receptors), gây phản xạ ho khan dai dẳng về đêm.',
      nutritionAdvice: [
        'Dùng lê hấp đường phèn, cháo bách hợp hạt sen, mật ong chưng quất/bối mẫu, sữa hạnh nhân, mộc nhĩ trắng.',
        'Kiêng thuốc lá, thuốc lào, khói bụi, đồ nướng chiên giòn cay nóng.'
      ]
    }
  },
  {
    id: 'dam-nhiet-ung-phe',
    name: 'Đàm Nhiệt Ủng Phế (Viêm Đường Hô Hấp Cấp)',
    sinoVietnamese: '痰熱壅肺',
    englishName: 'Phlegm-Heat Obstructing the Lung',
    category: 'tang_phu',
    keyEtiology: 'Phong nhiệt ngoại cảm xâm nhập Phế hóa hỏa hun đốt tân dịch thành đờm đặc, hoặc phong hàn hóa nhiệt uất kết trong Phế làm Phế mất chức năng tuyên phát túc giáng.',
    tongueSigns: {
      body: 'Chất lưỡi đỏ sẫm đặc biệt vùng đầu lưỡi',
      coating: 'Rêu lưỡi vàng dày nhớt (Thick yellow greasy coating)',
      color: 'Đỏ rực'
    },
    pulseSigns: {
      type: 'Mạch Hoạt Sác (Trơn và nhanh)',
      description: 'Mạch đi tròn trơn như hòn bi lăn (đờm thấp) và nhanh có lực (nhiệt thịnh).'
    },
    fourExaminations: {
      vong: 'Mặt đỏ, cánh mũi phập phồng khi khó thở, bứt rứt, khạc nhổ đờm vàng xanh đặc.',
      van: 'Tiếng ho sù sụ vang to, thở khò khè có tiếng ran ngáy ran ẩm.',
      van_ask: 'Sốt cao, ho nhiều khạc đờm vàng hoặc xanh đặc dính, đau tức ngực khi ho, khó thở thở gấp, miệng khô khát thích uống nước mát, nước tiểu vàng ít, đại tiện táo.',
      thiet: 'Da nóng bức, vùng ngực ức ấn đau tức nhẹ, nghe phổi thấy ran nổ hoặc ran ẩm.'
    },
    treatmentPrinciple: 'Thanh nhiệt hóa đờm, tuyên phế bình suyễn.',
    primaryHerbalFormula: {
      name: 'Ma Hạnh Thạch Cam Thang hợp Thanh Khí Hóa Đàm Hoàn (Thương Hàn Luận & Y Phương Khảo)',
      sourceBook: 'Thương Hàn Luận (Trương Trọng Cảnh) & Ôn Bệnh Điều Biện',
      composition: [
        { herb: 'Thạch Cao (Sống)', grams: 24, role: 'Quân', note: 'Thanh tiết Phế Vị nhiệt, hạ sốt sinh tân' },
        { herb: 'Ma Hoàng', grams: 6, role: 'Quân', note: 'Tuyên phế bình suyễn, mở lỗ chân lông tiết nhiệt (tỷ lệ Ma Hoàng:Thạch Cao = 1:4)' },
        { herb: 'Khổ Hạnh Nhân', grams: 10, role: 'Thần', note: 'Giáng Phế khí chỉ khái bình suyễn' },
        { herb: 'Hoàng Cầm & Tang Bạch Bì', grams: 12, role: 'Thần', note: 'Thanh tả Phế hỏa, giáng khí trừ đờm' },
        { herb: 'Qua Lâu Nhân & Đởm Nam Tinh / Bối Mẫu', grams: 12, role: 'Tá', note: 'Thanh nhiệt hóa đờm đặc, thông khoan lồng ngực' },
        { herb: 'Ngư Tinh Thảo (Diếp Cá)', grams: 20, role: 'Tá', note: 'Thanh nhiệt giải độc Phế ung, kháng khuẩn đường hô hấp cực mạnh' },
        { herb: 'Cam Thảo', grams: 6, role: 'Sứ', note: 'Hòa trung ích khí, điều hòa tính hàn lương' }
      ],
      preparation: 'Thạch Cao đập vụn sắc trước 20 phút rồi cho các vị khác vào sắc 15 phút; uống khi còn ấm.',
      modifications: [
        'Nếu sốt cao họng sưng đau (Viêm phổi / Viêm amidan mủ): Thêm Kim Ngân Hoa 16g, Liên Kiều 12g, Bản Lam Căn 15g.',
        'Nếu táo bón nhiệt kết (Phế Đại Trường biểu lý): Thêm Đại Hoàng 6g, Chỉ Thực 8g (Tuyên Bạch Thừa Khí Thang).'
      ]
    },
    acupuncturePrescription: {
      classicalPoints: ['Xích Trạch (LU-5 - Thanh Phế nhiệt)', 'Khổng Tối (LU-6)', 'Đản Trung (CV-17)', 'Phong Long (ST-40 - Hóa đờm)', 'Đại Chùy (GV-14)', 'Hợp Cốc (LI-4)'],
      tungPoints: ['Tứ Mã (88.17 - 88.19)', 'Thủy Kim & Thủy Thông', 'Chích lể Thiếu Thương (LU-11) nặn 2-3 giọt máu hạ sốt giải độc hầu họng'],
      nguyenTaiThuTechnique: 'Châm tả Xích Trạch, Phong Long và Đại Chùy để hạ sốt, giãn phế quản và tống xuất đờm mủ; không cứu ngải.',
      moxibustion: false
    },
    westernCorrelations: {
      diseases: ['Viêm phế quản cấp bội nhiễm', 'Viêm phổi cộng đồng (CAP)', 'Đợt cấp COPD / Hen phế quản bội nhiễm (GOLD 2025)'],
      guytonPhysiology: 'Nhiễm khuẩn hoặc virus kích hoạt bạch cầu trung tính và đại thực bào phế nang giải phóng IL-6, TNF-alpha và dịch rỉ viêm giàu mucin làm tắc nghẽn tiểu phế quản, giảm trao đổi khí O2/CO2 (shunt sinh lý).',
      nutritionAdvice: [
        'Uống nhiều nước ấm (2.5 lít/ngày) để loãng đờm; ăn súp ấm, nước ép lê, củ cải trắng, rau diếp cá.',
        'Kiêng sữa bò đặc, đường ngọt, đồ chiên xào nhiều mỡ làm tăng tiết đờm nhầy.'
      ]
    }
  },
  {
    id: 'phong-han-thap-ty',
    name: 'Phong Hàn Thấp Tý (Đau Khớp Gối & Viêm Khớp Mạn)',
    sinoVietnamese: '風寒濕痺',
    englishName: 'Wind-Cold-Damp Bi Syndrome',
    category: 'khi_huyet',
    keyEtiology: 'Chính khí Can Thận suy giảm, vệ khí bất cố, gặp phải tà khí Phong - Hàn - Thấp xâm nhập lưu trệ tại kinh lạc, gân cơ, khớp xương làm khí huyết vận hành bế tắc sinh đau mỏi co cứng.',
    tongueSigns: {
      body: 'Chất lưỡi nhợt hoặc hơi tối',
      coating: 'Rêu lưỡi trắng mỏng hoặc trắng nhớt ướt',
      color: 'Hồng nhợt hoặc hơi tím nhẹ'
    },
    pulseSigns: {
      type: 'Mạch Phù Khẩn hoặc Huyền Hoãn Hoạt',
      description: 'Mạch căng chặt (Hàn), trơn nặng (Thấp) hoặc phù rải rác (Phong).'
    },
    fourExaminations: {
      vong: 'Khớp đau không sưng nóng đỏ (hoặc sưng nề màu da bình thường), cử động gượng gạo cứng đơ buổi sáng, dáng đi khập khiễng.',
      van: 'Tiếng khớp kêu lạo xạo lục cục khi co duỗi hoặc bước cầu thang.',
      van_ask: 'Đau nhức xương khớp nặng nề tê buốt, đau tăng rõ rệt khi trời mưa ẩm, gió lạnh hoặc về đêm sáng sớm, chườm ấm thì dễ chịu hẳn (thiện ôn). Nếu thiên Phong thì đau chạy nhiều khớp (Hành tý); thiên Hàn thì đau buốt cố định dữ dội (Thống tý); thiên Thấp thì chân tay nặng trĩu sưng tê (Trước tý).',
      thiet: 'Sờ khớp thấy mát lạnh, co duỗi hạn chế biên độ, ấn các huyệt quanh khớp thấy điểm đau nhức nhưng thích xoa bóp.'
    },
    treatmentPrinciple: 'Khu phong tán hàn, trừ thấp thông lạc, bổ Can Thận cường cân cốt.',
    primaryHerbalFormula: {
      name: 'Độc Hoạt Ký Sinh Thang (Bị Cấp Thiên Kim Yếu Phương - Tôn Tư Mạo)',
      sourceBook: 'Phương Thang YHCT & Dan Bensky Formulas',
      composition: [
        { herb: 'Độc Hoạt', grams: 12, role: 'Quân', note: 'Sưu phong tán hàn trừ thấp ở hạ tiêu và khớp sâu' },
        { herb: 'Tang Ký Sinh, Đỗ Trọng & Ngưu Tất', grams: 12, role: 'Thần', note: 'Bổ Can Thận, mạnh gân cốt, dẫn thuốc xuống chi dưới' },
        { herb: 'Tần Giao & Phòng Phong', grams: 10, role: 'Thần', note: 'Khu phong trừ thấp, thư cân hoạt lạc' },
        { herb: 'Quế Chi & Tế Tân', grams: 6, role: 'Tá', note: 'Ôn kinh tán hàn, thông dương chỉ thống (dùng Tế Tân đúng liều an toàn 3-4g)' },
        { herb: 'Đương Quy, Bạch Thược, Xuyên Khung, Thục Địa', grams: 10, role: 'Tá', note: 'Tứ Vật Thang bổ huyết hoạt huyết theo nguyên tắc "Trị phong tiên trị huyết"' },
        { herb: 'Đảng Sâm, Phục Linh, Cam Thảo', grams: 10, role: 'Sứ', note: 'Kiện Tỳ ích khí trừ thấp, điều hòa chư dược' }
      ],
      preparation: 'Sắc 1000ml còn 300ml chia 2 lần uống ấm sau bữa ăn; kiêng tắm nước lạnh ban đêm.',
      modifications: [
        'Nếu đau vùng vai gáy - chi trên (Kiên tý): Thay Độc Hoạt bằng Khương Hoạt 10g, thêm Khương Hoàng 10g, Quế Chi 10g (Quyên Tý Thang).',
        'Nếu khớp sưng nóng đỏ chuyển thể Nhiệt tý: Bỏ Quế Chi, Tế Tân, thêm Thạch Cao 20g, Tri Mẫu 12g, Nhẫn Đông Đằng 15g (Bạch Hổ Gia Quế Chi Thang).'
      ]
    },
    acupuncturePrescription: {
      classicalPoints: ['Độc Tỵ (ST-35)', 'Nội Tất Nhãn (EX-LE4)', 'Dương Lăng Tuyền (GB-34)', 'Âm Lăng Tuyền (SP-9)', 'Túc Tam Lý (ST-36)', 'Huyết Hải (SP-10)'],
      tungPoints: ['Tâm Đầu (11.08)', 'Kiên Trung (44.06)', 'Thận Quan (77.18)', 'Chích lể gân xanh vùng khoeo Ủy Trung nếu ứ huyết lâu năm'],
      nguyenTaiThuTechnique: 'Ôn châm (đốt ngải cứu trên đốc kim) tại Độc Tỵ, Tất Nhãn và Dương Lăng Tuyền để đuổi hàn thấp ra khỏi ổ khớp.',
      moxibustion: true
    },
    westernCorrelations: {
      diseases: ['Thoái hóa khớp gối / khớp háng / cột sống (OA)', 'Viêm quanh khớp vai thể đông cứng', 'Viêm khớp dạng thấp giai đoạn ổn định không sốt'],
      guytonPhysiology: 'Bào mòn lớp sụn khớp hyaline, giảm tiết dịch nhầy Hyaluronic acid nội khớp, tăng áp lực lên xương dưới sụn kèm co mạch vi tuần hoàn bao hoạt dịch khi gặp lạnh làm tăng độ nhớt dịch khớp và nhạy cảm thụ thể đau.',
      nutritionAdvice: [
        'Bổ sung thực phẩm giàu Collagen type II, Omega-3 (cá hồi, cá thu), nghệ curcumin, gừng ấm, đậu bắp, mồng tơi.',
        'Kiêng đồ lạnh, bia rượu, dưa cà muối chua nhiều muối.'
      ]
    }
  },
  {
    id: 'thap-nhiet-ha-tieu',
    name: 'Thấp Nhiệt Hạ Tiêu (Lâm Chứng / Tiết Niệu)',
    sinoVietnamese: '濕熱下注 (淋證)',
    englishName: 'Damp-Heat in the Lower Jiao',
    category: 'tang_phu',
    keyEtiology: 'Vệ sinh kém hoặc thấp nhiệt ngoại tà xâm nhập Bàng quang, hoặc ăn uống cay nóng rượu bia tích tụ thấp nhiệt chảy xuống hạ tiêu làm Bàng quang mất chức năng khí hóa.',
    tongueSigns: {
      body: 'Chất lưỡi đỏ, đặc biệt phần gốc lưỡi (vùng Thận/Bàng quang) đỏ sẫm',
      coating: 'Rêu lưỡi vàng dày nhớt ở vùng gốc lưỡi',
      color: 'Đỏ kèm rêu vàng bẩn vùng cuống lưỡi'
    },
    pulseSigns: {
      type: 'Mạch Hoạt Sác hoặc Nhu Sác',
      description: 'Mạch đi trơn và nhanh, bộ Xích hai bên ấn có lực biểu thị thực nhiệt và thấp trệ vùng hạ tiêu.'
    },
    fourExaminations: {
      vong: 'Sắc mặt hơi vàng đỏ, bứt rứt, nước tiểu đục vàng sẫm hoặc lẫn cặn sỏi/hồng cầu.',
      van: 'Nước tiểu có mùi khai nồng bất thường.',
      van_ask: 'Tiểu buốt, tiểu rắt nhiều lần, mỗi lần đi được rất ít, cảm giác nóng rát đường niệu đạo, đau tức nặng vùng bụng dưới hoặc đau thắt lưng lan xuống bẹn, khát nước nhưng uống không hết.',
      thiet: 'Ấn huyệt Trung Cực và Khúc Cốt vùng hạ vị đau tức khó chịu; vỗ vùng hố thắt lưng có thể đau (nếu viêm đài bể thận/sỏi thận).'
    },
    treatmentPrinciple: 'Thanh nhiệt lợi thấp, thông lâm bài thạch.',
    primaryHerbalFormula: {
      name: 'Bát Chính Tán / Thạch Vi Tán (Thái Bình Huệ Dân Hòa Tễ Cục Phương)',
      sourceBook: 'Phương Thang YHCT & Dan Bensky Formulas',
      composition: [
        { herb: 'Xa Tiền Tử (Hạt Mã Đề)', grams: 15, role: 'Quân', note: 'Thanh nhiệt lợi niệu thông lâm' },
        { herb: 'Cù Mạch & Biển Súc', grams: 12, role: 'Quân', note: 'Lợi thấp nhiệt Bàng quang, tiêu trừ tiểu buốt rắt' },
        { herb: 'Hoạt Thạch', grams: 15, role: 'Thần', note: 'Thanh nhiệt lợi khiếu, làm trơn niệu đạo' },
        { herb: 'Chi Tử & Đại Hoàng (chế)', grams: 8, role: 'Tá', note: 'Tả thực hỏa tam tiêu và thông tiện dẫn nhiệt ra đại tiểu tiện' },
        { herb: 'Kim Tiền Thảo & Râu Mèo', grams: 20, role: 'Tá', note: 'Lợi tiểu kiềm hóa nước tiểu, bào mòn và tống sỏi tiết niệu' },
        { herb: 'Cam Thảo Tiêu', grams: 6, role: 'Sứ', note: 'Thanh nhiệt giải độc đường niệu, hòa hoãn thuốc' }
      ],
      preparation: 'Xa Tiền Tử và Hoạt Thạch bọc vải thưa khi sắc; uống làm 2-3 lần/ngày kết hợp uống nhiều nước lọc.',
      modifications: [
        'Nếu tiểu ra máu (Huyết lâm): Thêm Tiểu Kế 15g, Bạch Mao Căn (Rễ Cỏ Tranh) 20g, Bồ Hoàng sao 10g.',
        'Nếu có sỏi thận, sỏi niệu quản (Thạch lâm): Tăng Kim Tiền Thảo 30g, thêm Hải Kim Sa 12g, Kê Nội Kim 10g.'
      ]
    },
    acupuncturePrescription: {
      classicalPoints: ['Trung Cực (CV-3)', 'Âm Lăng Tuyền (SP-9)', 'Tam Âm Giao (SP-6)', 'Bàng Quang Du (BL-28)', 'Ủy Dương (BL-39)', 'Thủy Đạo (ST-28)'],
      tungPoints: ['Hạ Tam Hoàng (77.17, 77.19, 77.21)', 'Thông Thận (88.09)', 'Mã Khoái Thủy (1010.14 - Đặc hiệu tiểu buốt/sỏi niệu quản)'],
      nguyenTaiThuTechnique: 'Châm tả Trung Cực, Âm Lăng Tuyền và Bàng Quang Du (tránh châm quá sâu khi bàng quang căng đầy nước tiểu).',
      moxibustion: false
    },
    westernCorrelations: {
      diseases: ['Nhiễm trùng đường tiết niệu (UTI) / Viêm bàng quang cấp', 'Sỏi thận & Sỏi niệu quản (Nephrolithiasis)', 'Viêm tuyến tiền liệt cấp/mạn do vi khuẩn'],
      guytonPhysiology: 'Vi khuẩn E. coli bám dính biểu mô niệu đạo kích hoạt phản ứng viêm tiết IL-8 huy động bạch cầu đa nhân, hoặc tinh thể Calcium Oxalate/Urate kết tụ gây co thắt cơ trơn niệu quản (Cơn đau quặn thận).',
      nutritionAdvice: [
        'Uống 2.5 - 3 lít nước ấm/ngày; uống nước chanh pha loãng giàu Citrate hoặc nước việt quất (Cranberry).',
        'Kiêng ớt cay, tiêu, rượu bia, cà phê, đồ quá mặn và rau giàu oxalate (rau bina, măng, chè đặc nếu sỏi oxalate).'
      ]
    }
  },
  {
    id: 'tam-huyet-u-tro',
    name: 'Tâm Huyết Ứ Trở (Hung Tý / Mạch Vành)',
    sinoVietnamese: '心血瘀阻 (胸痺)',
    englishName: 'Heart Blood Stasis',
    category: 'khi_huyet',
    keyEtiology: 'Tâm khí hư lâu ngày không thúc đẩy được huyết hành, hoặc hàn ngưng đàm trọc kết tụ, hoặc tình chí uất ức làm huyết ứ bít tắc tâm mạch gây đau thắt ngực.',
    tongueSigns: {
      body: 'Chất lưỡi tím tối, rìa hoặc đầu lưỡi có điểm ứ huyết tím đen, tĩnh mạch dưới lưỡi phồng to tím sẫm',
      coating: 'Rêu mỏng trắng hoặc hơi nhớt',
      color: 'Tím ám (Purplish dark tongue)'
    },
    pulseSigns: {
      type: 'Mạch Sáp hoặc Kết Đại (Không đều)',
      description: 'Mạch đi rít khó khăn (Huyết ứ) hoặc có nhịp nghỉ ngắt quãng bất thường (Loạn nhịp/Ngoại tâm thu).'
    },
    fourExaminations: {
      vong: 'Môi và đầu ngón tay tím tái nhẹ (Cyanosis), sắc mặt xám tối, vẻ mặt lo âu khi gắng sức.',
      van: 'Thở ngắn hụt hơi khi đi bộ nhanh hoặc leo dốc, hồi hộp trống ngực.',
      van_ask: 'Đau thắt hoặc đau nhói như kim châm sau xương ức hoặc vùng trước tim, có thể lan lên vai trái, bờ trong cánh tay trái đến ngón út; cơn đau xuất hiện khi gắng sức, xúc động hoặc gặp lạnh, đỡ khi nghỉ ngơi.',
      thiet: 'Đầu chi hơi lạnh, ấn vùng Đản Trung và Tâm Du tức đau, kiểm tra nhịp tim có thể thấy mạch nhanh chậm không đều.'
    },
    treatmentPrinciple: 'Hoạt huyết hóa ứ, thông mạch chỉ thống, ích khí ôn dương.',
    primaryHerbalFormula: {
      name: 'Huyết Phủ Trục Ứ Thang / Đan Sâm Ẩm (Y Lâm Cải Thác - Vương Thanh Nhiệm)',
      sourceBook: 'Y Lâm Cải Thác & Phương Thang YHCT - Dan Bensky',
      composition: [
        { herb: 'Đan Sâm', grams: 16, role: 'Quân', note: 'Hoạt huyết hóa ứ, dưỡng tâm an thần, giãn động mạch vành' },
        { herb: 'Đào Nhân & Hồng Hoa', grams: 10, role: 'Quân', note: 'Phá huyết trục ứ, khai thông vi tuần hoàn mạch máu' },
        { herb: 'Đương Quy, Xuyên Khung & Xích Thược', grams: 10, role: 'Thần', note: 'Hành khí hoạt huyết, giảm độ nhớt máu và đau ngực' },
        { herb: 'Tam Thất Bắc (bột)', grams: 4, role: 'Tá', note: 'Hóa ứ chỉ thống đặc hiệu cho thiếu máu cơ tim (uống chiêu với nước thuốc)' },
        { herb: 'Chỉ Xác, Cát Cánh & Sài Hồ', grams: 8, role: 'Tá', note: 'Khoan hung lý khí, nâng hạ khí cơ vùng lồng ngực' },
        { herb: 'Ngưu Tất & Cam Thảo', grams: 10, role: 'Sứ', note: 'Dẫn huyết hạ hành chống ứ trệ thượng tiêu, hòa hoãn phương' }
      ],
      preparation: 'Sắc uống ấm chia 2 lần sau ăn; cẩn trọng theo dõi nếu đang dùng thuốc chống đông/chống kết tập tiểu cầu Tây y (giảm liều Đào Nhân/Hồng Hoa).',
      modifications: [
        'Nếu kèm ngực lạnh đau dữ dội khi gặp gió rét (Hàn ngưng): Thêm Quế Chi 10g, Qua Lâu 12g, Giới Bạch 10g.',
        'Nếu hụt hơi mệt mỏi (Khí hư huyết ứ): Thêm Hoàng Kỳ 20g, Đảng Sâm 12g (Thành Bổ Dương Hoàn Ngũ Thang gia giảm).'
      ]
    },
    acupuncturePrescription: {
      classicalPoints: ['Nội Quan (PC-6)', 'Đản Trung (CV-17)', 'Khích Môn (PC-4)', 'Tâm Du (BL-15)', 'Cách Du (BL-17)', 'Thần Môn (HT-7)'],
      tungPoints: ['Tâm Thường (11.19)', 'Tâm Môn (33.12)', 'Thông Quan (88.01) - Thông Sơn (88.02) - Thông Thiên (88.03)'],
      nguyenTaiThuTechnique: 'Châm nhẹ nhàng huyệt Nội Quan và Đản Trung (châm ngang dưới da 0.5-1 thốn) điều hòa nhịp tim và giãn mạch vành.',
      moxibustion: false
    },
    westernCorrelations: {
      diseases: ['Bệnh tim thiếu máu cục bộ mạn tính (CCS - ESC 2024)', 'Đau thắt ngực ổn định', 'Rối loạn nhịp tim & Tăng huyết áp có biến chứng mạch vành'],
      guytonPhysiology: 'Hẹp lòng động mạch vành do mảng xơ vữa làm giảm dự trữ lưu lượng vành (CFR), gây thiếu oxy cơ tim khi tăng nhu cầu, chuyển hóa yếm khí tạo Acid Lactic và Adenosine kích thích thụ thể đau vùng ngực T1-T5.',
      nutritionAdvice: [
        'Chế độ ăn Địa Trung Hải (ESC 2024): Cá béo giàu Omega-3, dầu ô liu Extra Virgin, tỏi đen, yến mạch, rau xanh đậm.',
        'Cảnh báo: Đan Sâm và Hồng Hoa có thể tăng tác dụng thuốc chống đông (Warfarin, Aspirin, Clopidogrel) -> cần kiểm tra INR và dấu hiệu bầm tím.'
      ]
    }
  },
  {
    id: 'can-phong-noi-dong',
    name: 'Can Phong Nội Động (Trúng Phong / Đột Quỵ)',
    sinoVietnamese: '肝風內動 (中風)',
    englishName: 'Internal Liver Wind',
    category: 'tang_phu',
    keyEtiology: 'Do 3 căn nguyên chính: (1) Can Thận âm hư làm Can dương hóa phong (Dương cang hóa phong); (2) Nhiệt cực sinh phong; (3) Huyết hư sinh phong. Gặp gió lạnh, tức giận, gắng sức làm khí huyết nghịch loạn xung lên não.',
    tongueSigns: {
      body: 'Lưỡi đỏ sẫm hoặc tím, thè lưỡi ra bị run rẩy hoặc lệch sang một bên',
      coating: 'Rêu lưỡi vàng dày hoặc trắng nhớt (nếu kiêm phong đờm)',
      color: 'Đỏ sẫm hoặc tím thẫm'
    },
    pulseSigns: {
      type: 'Mạch Huyền Kính Hữu Lực hoặc Huyền Tế Sác',
      description: 'Mạch căng cứng như dây thép đập mạnh bật ngón tay; trong đột quỵ cấp kèm đàm trọc thì mạch Huyền Hoạt Đại.'
    },
    fourExaminations: {
      vong: 'Mặt đỏ bừng, mắt trợn nhìn lệch, méo miệng (nhân trung lệch), nói ngọng hoặc mất ngôn ngữ, liệt vận động nửa người, dáng đi loạng choạng.',
      van: 'Thở khò khè nhiều đờm dãi (nếu trúng phong tạng phủ), nói ngọng khó nghe.',
      van_ask: 'Chóng mặt xoay tròn dữ dội như đi thuyền, run tay chân, tê bì nửa người hoặc đầu ngón tay ngón chân (dấu hiệu báo trước trúng phong), nhức đầu vùng đỉnh chẩm dữ dội.',
      thiet: 'Huyết áp tăng vọt (>= 160-180/100 mmHg), cơ lực nửa người giảm (0/5 đến 3/5), phản xạ gân xương tăng hoặc mất.'
    },
    treatmentPrinciple: 'Bình can tức phong, tiềm dương tư âm, hóa đờm khai khiếu (nếu cấp), ích khí hoạt huyết thông lạc (giai đoạn phục hồi).',
    primaryHerbalFormula: {
      name: 'Trấn Can Tức Phong Thang (Y Học Trung Trung Tham Tây Lục - Trương Tích Thuần)',
      sourceBook: 'Y Học Trung Trung Tham Tây Lục & Phương Thang YHCT',
      composition: [
        { herb: 'Hoài Ngưu Tất', grams: 24, role: 'Quân', note: 'Dẫn huyết hạ hành mạnh mẽ, bổ Can Thận, bình xung nghịch' },
        { herb: 'Đại Giả Thạch & Long Cốt, Mẫu Lệ', grams: 20, role: 'Quân', note: 'Trọng trấn tiềm dương, tức Can phong giáng nghịch khí (sắc trước 30 phút)' },
        { herb: 'Quy Bản & Bạch Thược & Huyền Sâm', grams: 15, role: 'Thần', note: 'Tư dưỡng chân âm, nhu can tức phong' },
        { herb: 'Thiên Môn Đông', grams: 12, role: 'Thần', note: 'Thanh Phế giáng nghịch để Kim chế Mộc' },
        { herb: 'Nhân Trần, Xuyên Luyện Tử, Mạch Nha', grams: 10, role: 'Tá', note: 'Sơ can lý khí thanh nhiệt, chống thuốc trọng trấn đè nặng trung tiêu' },
        { herb: 'Cam Thảo', grams: 6, role: 'Sứ', note: 'Điều hòa trung tiêu và chư dược' }
      ],
      preparation: 'Khoáng vật sắc trước 30 phút; giai đoạn cấp cứu đột quỵ phải chuyển bệnh viện cấp cứu Tây y tiêu sợi huyết/can thiệp mạch trước, Đông y phối hợp phục hồi chức năng.',
      modifications: [
        'Nếu di chứng liệt nửa người sau qua giai đoạn cấp (Khí hư huyết ứ): Chuyển sang Bổ Dương Hoàn Ngũ Thang (Hoàng Kỳ 40-60g, Đương Quy Vĩ 12g, Xích Thược 10g, Địa Long 10g, Đào Nhân 8g, Hồng Hoa 8g, Xuyên Khung 8g).',
        'Nếu đàm mê tâm khiếu: Phối hợp An Cung Ngưu Hoàng Hoàn (chỉ dùng thể Bế nhiệt chứng, CẤM dùng thể Thoát hoặc xuất huyết não chưa cầm).'
      ]
    },
    acupuncturePrescription: {
      classicalPoints: ['Bách Hội (GV-20)', 'Phong Trì (GB-20)', 'Hợp Cốc (LI-4)', 'Khúc Trì (LI-11)', 'Túc Tam Lý (ST-36)', 'Dương Lăng Tuyền (GB-34)', 'Thái Xung (LR-3)'],
      tungPoints: ['Linh Cốt (22.05) + Đại Bạch (22.04) bên lành', 'Thận Quan (77.18)', 'Chính Cân (77.01) & Chính Tông (77.02) phục hồi co cứng gân chi dưới'],
      nguyenTaiThuTechnique: 'Mãng châm xuyên thấu huyệt GS. Nguyễn Tài Thu phục hồi vận động sau đột quỵ: Kiên Ngung thấu Tý Nhu, Khúc Trì thấu Thiếu Hải, Hoàn Khiêu thấu Phong Thị, Dương Lăng Tuyền thấu Huyền Chung.',
      moxibustion: false
    },
    westernCorrelations: {
      diseases: ['Tai biến mạch máu não (Nhồi máu não / Xuất huyết não)', 'Cơn tăng huyết áp cấp cứu', 'Bệnh Parkinson & Run vô căn', 'Rối loạn tiền đình trung ương / Migraine'],
      guytonPhysiology: 'Tăng huyết áp kịch phát phá vỡ cơ chế tự điều hòa lưu lượng máu não (Cerebral Autoregulation) hoặc huyết khối gây tắc mạch động mạch não giữa (MCA), tạo vùng lõi hoại tử và vùng tranh tối tranh sáng (Penumbra) cần phục hồi dẻo dai thần kinh (Neuroplasticity).',
      nutritionAdvice: [
        'Tuân thủ chế độ ít muối DASH (< 5g muối/ngày), kiểm soát huyết áp < 130/80 mmHg và LDL-C < 1.4-1.8 mmol/L.',
        'Trong giai đoạn liệt nuốt: Chế biến thức ăn đặc sệt (nhuyễn) tránh sặc phổi.'
      ]
    }
  }
];

