import type { Herb } from './herbalMateria';

export const HERBAL_MATERIA_BENSKY_PART2: Herb[] = [
  {
    "id": "tan-xiang",
    "vietnameseName": "Đàn hương (Gỗ đàn hương trắng)",
    "pinyinName": "Tan Xiang",
    "botanicalName": "Lignum Santali Albi",
    "chineseCharacters": "檀香",
    "category": "9. Thuốc Lý Khí (Regulate Qi)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Cay"
      ],
      "channels": [
        "Tỳ",
        "Vị",
        "Phế"
      ]
    },
    "dosageGram": "1.5 - 4.5g (Sắc sau hoặc mài uống)",
    "actions": [
      "Hành khí ôn trung",
      "Khai vị chỉ thống vùng tâm vị"
    ],
    "clinicalIndications": [
      "Đau tức thượng vị vùng ngực tâm phế quản (Đan Sâm Ẩm) do hàn ngưng khí trệ",
      "Nôn khan chán ăn đầy bụng"
    ],
    "contraindications": "Âm hư hỏa vượng thực nhiệt xuất huyết tránh dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Đi cùng Đan sâm và Sa nhân trong bài Đan Sâm Ẩm (Thời Phương Ca Quát) trị đau dạ dày mạn và đau thắt ngực."
  },
  {
    "id": "xiang-yuan",
    "vietnameseName": "Hương duyên (Quả thanh yên)",
    "pinyinName": "Xiang Yuan",
    "botanicalName": "Fructus Citri",
    "chineseCharacters": "香櫞",
    "category": "9. Thuốc Lý Khí (Regulate Qi)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Cay",
        "Hơi đắng",
        "Chua"
      ],
      "channels": [
        "Can",
        "Tỳ",
        "Phế"
      ]
    },
    "dosageGram": "3 - 9g",
    "actions": [
      "Sơ can lý khí",
      "Khoan trung hóa đờm"
    ],
    "clinicalIndications": [
      "Đau tức ngực sườn thượng vị ợ hơi nôn khan do Can Vị khí trệ",
      "Ho lâu ngày nhiều đờm trắng"
    ],
    "contraindications": "Âm hư táo nhiệt không dùng nhiều.",
    "benskyNotes": "Dan Bensky 3rd Ed: Họ hàng gần gũi với Phật thủ, công năng sơ Can lý khí hòa Vị đồng nhất nhưng hóa đờm Phế nhỉnh hơn nhẹ."
  },
  {
    "id": "mei-gui-hua",
    "vietnameseName": "Mân côi hoa (Nụ hoa hồng đỏ)",
    "pinyinName": "Mei Gui Hua",
    "botanicalName": "Flos Rosae Rugosae",
    "chineseCharacters": "玫瑰花",
    "category": "9. Thuốc Lý Khí (Regulate Qi)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Ngọt",
        "Hơi đắng"
      ],
      "channels": [
        "Can",
        "Tỳ"
      ]
    },
    "dosageGram": "1.5 - 6g",
    "actions": [
      "Hành khí giải uất (điều hòa Can Tỳ rất êm)",
      "Hòa huyết tán ứ chỉ thống"
    ],
    "clinicalIndications": [
      "Đau tức ngực sườn căng thẳng tinh thần ăn kém ợ hơi",
      "Kinh nguyệt không đều đau căng tức ngực trước kỳ kinh",
      "Chấn thương tụ máu"
    ],
    "contraindications": "Âm hư nội nhiệt hoặc kinh nguyệt quá nhiều tránh dùng quá liều.",
    "benskyNotes": "Dan Bensky 3rd Ed: \"Tính ôn hòa mà không táo, lý khí mà không phá âm\" — rất phù hợp pha trà cho phụ nữ khí uất huyết ứ nhẹ."
  },
  {
    "id": "lu-e-mei",
    "vietnameseName": "Lục ngạc mai (Hoa mơ trắng)",
    "pinyinName": "Lu E Mei (Bai Mei Hua)",
    "botanicalName": "Flos Mume",
    "chineseCharacters": "綠萼梅",
    "category": "9. Thuốc Lý Khí (Regulate Qi)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Hơi chua",
        "Chát"
      ],
      "channels": [
        "Can",
        "Vị",
        "Phế"
      ]
    },
    "dosageGram": "3 - 6g",
    "actions": [
      "Sơ can giải uất",
      "Hòa trung hóa đờm",
      "Trị chứng Mai hạch khí (nuốt vướng cổ họng)"
    ],
    "clinicalIndications": [
      "Chứng Mai hạch khí (cảm giác nghẹn vướng hạt mận trong cổ họng do đờm khí giao kết)",
      "Đau tức thượng vị ợ chua ăn kém, tràng nhạc hạch cổ"
    ],
    "contraindications": "Hầu như không có; an toàn cao.",
    "benskyNotes": "Dan Bensky 3rd Ed: Đặc hiệu cho chứng \"Mai hạch khí\" (globus pharyngeus) nhờ khả năng sơ can khai uất mà tính bình không gây khô táo."
  },
  {
    "id": "xie-bai",
    "vietnameseName": "Giới bạch (Củ kiệu khô)",
    "pinyinName": "Xie Bai",
    "botanicalName": "Bulbus Allii Macrostemi",
    "chineseCharacters": "薤白",
    "category": "9. Thuốc Lý Khí (Regulate Qi)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Cay",
        "Đắng"
      ],
      "channels": [
        "Phế",
        "Vị",
        "Đại tràng"
      ]
    },
    "dosageGram": "4.5 - 9g",
    "actions": [
      "Thông dương tán kết (khai thông lồng ngực)",
      "Hành khí đạo trệ (xuống đại tràng trị mót rặn)"
    ],
    "clinicalIndications": [
      "Đau thắt ngực tức ngực lan sau lưng khó thở do Hung tý đờm trọc bế tắc (Qua Lâu Giới Bạch Bạch Tửu Thang)",
      "Kiết lỵ đau quặn mót rặn nặng hậu môn"
    ],
    "contraindications": "Khí hư không có hàn ẩm ngưng trệ hoặc vị nhiệt không dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Chủ vị cổ phương trị Hung Tý (bệnh mạch vành đau thắt ngực thể hàn đờm) của Trương Trọng Cảnh."
  },
  {
    "id": "ju-he",
    "vietnameseName": "Quất hạch (Hạt quýt)",
    "pinyinName": "Ju He",
    "botanicalName": "Semen Citri Reticulatae",
    "chineseCharacters": "橘核",
    "category": "9. Thuốc Lý Khí (Regulate Qi)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Đắng"
      ],
      "channels": [
        "Can"
      ]
    },
    "dosageGram": "3 - 9g (Sao muối giã dập)",
    "actions": [
      "Lý khí tán kết chỉ thống mạnh tại kinh Can"
    ],
    "clinicalIndications": [
      "Viêm tinh hoàn sưng đau sa ruột thoát vị bẹn (Sán khí - Quất Hạch Hoàn)",
      "Viêm tuyến vú sưng đau kết cục"
    ],
    "contraindications": "Âm hư không có khí trệ thực kết không dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Hạt quýt đi thẳng vào Can kinh hạ tiêu (tinh hoàn, bìu, tuyến vú) để tán kết chỉ thống."
  },
  {
    "id": "ju-luo",
    "vietnameseName": "Quất lạc (Xơ múi quýt)",
    "pinyinName": "Ju Luo",
    "botanicalName": "Retinervus Citri Reticulatae",
    "chineseCharacters": "橘絡",
    "category": "9. Thuốc Lý Khí (Regulate Qi)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Đắng",
        "Ngọt"
      ],
      "channels": [
        "Can",
        "Phế"
      ]
    },
    "dosageGram": "3 - 6g",
    "actions": [
      "Hành khí thông lạc",
      "Hóa đờm chỉ khái"
    ],
    "clinicalIndications": [
      "Ho đờm nhiều tức đau lan mạn sườn do đờm trọc trở trệ kinh lạc",
      "Đau mỏi khớp do đờm ứ kinh lạc"
    ],
    "contraindications": "Ít chống chỉ định; tránh dùng khi ho khan âm hư thuần túy.",
    "benskyNotes": "Dan Bensky 3rd Ed: Mạng lưới sợi dẫn khí đi vào các đường lạc mạch nhỏ quanh phổi và mạn sườn."
  },
  {
    "id": "ju-hong",
    "vietnameseName": "Hóa quất hồng / Quất hồng (Lớp vỏ đỏ ngoài quả bưởi đào / quýt)",
    "pinyinName": "Ju Hong (Hua Ju Hong)",
    "botanicalName": "Exocarpium Citri Grandis",
    "chineseCharacters": "化橘紅",
    "category": "9. Thuốc Lý Khí (Regulate Qi)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Cay",
        "Đắng"
      ],
      "channels": [
        "Phế",
        "Tỳ"
      ]
    },
    "dosageGram": "3 - 9g",
    "actions": [
      "Lý khí khoan trung",
      "Táo thấp hóa đờm mạnh hơn Trần bì"
    ],
    "clinicalIndications": [
      "Ho đờm trắng dính số lượng lớn, nôn mửa chướng bụng do hàn đờm thấp ẩm nặng"
    ],
    "contraindications": "Âm hư ho khan phế táo cấm dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Bỏ hết lớp cùi trắng (\"Quất bạch\") giữ lại lớp vỏ đỏ giàu tinh dầu nên tính cay ấm táo đờm mạnh hơn Trần bì rất nhiều."
  },
  {
    "id": "gan-song",
    "vietnameseName": "Cam tùng (Cam tùng hương)",
    "pinyinName": "Gan Song",
    "botanicalName": "Radix et Rhizoma Nardostachyos",
    "chineseCharacters": "甘松",
    "category": "9. Thuốc Lý Khí (Regulate Qi)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Cay",
        "Ngọt"
      ],
      "channels": [
        "Tỳ",
        "Vị"
      ]
    },
    "dosageGram": "3 - 6g",
    "actions": [
      "Lý khí chỉ thống",
      "Khai uất tỉnh tỳ",
      "Trừ thấp tiêu thũng (dùng ngoài)"
    ],
    "clinicalIndications": [
      "Đầy tức ngực bụng chán ăn nôn khan",
      "Loạn nhịp tim thể nhẹ, đau răng tê chân cước khí (ngâm rửa)"
    ],
    "contraindications": "Khí hư huyết nhiệt không dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Vừa tỉnh Tỳ khai uất lại điều hòa nhịp tim tự nhiên (chứa Valeranone tương tự họ Nữ lang)."
  },
  {
    "id": "dao-dou",
    "vietnameseName": "Đao đậu (Đậu rựa)",
    "pinyinName": "Dao Dou",
    "botanicalName": "Semen Canavaliae",
    "chineseCharacters": "刀豆",
    "category": "9. Thuốc Lý Khí (Regulate Qi)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Ngọt"
      ],
      "channels": [
        "Vị",
        "Thận"
      ]
    },
    "dosageGram": "9 - 15g",
    "actions": [
      "Ôn trung hạ khí chỉ ách (trị nấc cụt do hư hàn)",
      "Bổ thận trợ dương"
    ],
    "clinicalIndications": [
      "Nấc cụt kéo dài nôn khan do Tỳ Vị Thận hư hàn (phối Thị đế, Đinh hương)",
      "Đau lưng mỏi gối do thận hư"
    ],
    "contraindications": "Vị nhiệt nấc cụt cấp không dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Chú ý Đao đậu ôn hạ giáng nghịch rất tốt cho nấc cụt mạn ở người già suy kiệt mà không cay táo."
  },
  {
    "id": "zi-su-geng",
    "vietnameseName": "Tử tô ngạnh (Cành tía tô)",
    "pinyinName": "Zi Su Geng",
    "botanicalName": "Caulis Perillae",
    "chineseCharacters": "紫蘇梗",
    "category": "9. Thuốc Lý Khí (Regulate Qi)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Cay",
        "Ngọt"
      ],
      "channels": [
        "Phế",
        "Tỳ",
        "Vị"
      ]
    },
    "dosageGram": "4.5 - 9g",
    "actions": [
      "Lý khí khoan trung",
      "Chỉ thống an thai êm dịu"
    ],
    "clinicalIndications": [
      "Thai động bất an kèm tức ngực buồn nôn ốm nghén đầy bụng khó tiêu ở thai phụ",
      "Tức ngực mạn sườn nhẹ"
    ],
    "contraindications": "Ít chống chỉ định; rất an toàn trong thai kỳ.",
    "benskyNotes": "Dan Bensky 3rd Ed: Khác Lá tía tô (Tử tô diệp) thiên phát hãn giải biểu, cành Tô ngạnh không làm ra mồ hôi mà chuyên lý khí khoan trung an thai."
  },
  {
    "id": "bai-mao-gen",
    "vietnameseName": "Bạch mao căn (Rễ cỏ tranh)",
    "pinyinName": "Bai Mao Gen",
    "botanicalName": "Rhizoma Imperatae",
    "chineseCharacters": "白茅根",
    "category": "10. Thuốc Lý Huyết (Regulate Blood)",
    "properties": {
      "nature": "Hàn",
      "flavors": [
        "Ngọt"
      ],
      "channels": [
        "Phế",
        "Vị",
        "Bàng quang"
      ]
    },
    "dosageGram": "15 - 30g (Tươi: 30 - 60g)",
    "actions": [
      "Lương huyết chỉ huyết (không gây lưu ứ)",
      "Thanh nhiệt sinh tân chỉ khát",
      "Lợi niệu thông lâm"
    ],
    "clinicalIndications": [
      "Tiểu ra máu (Huyết lâm), chảy máu cam, ho nôn ra máu do huyết nhiệt",
      "Sốt cao phiền khát, viêm cầu thận cấp phù thũng tiểu ít"
    ],
    "contraindications": "Tỳ vị hư hàn tiểu nhiều không khát tránh dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Vị ngọt hàn cực kỳ êm ái, vừa cầm máu do nhiệt vừa thanh Phế Vị nhiệt và lợi tiểu cho bệnh nhân thận cấp."
  },
  {
    "id": "qian-cao",
    "vietnameseName": "Thiến thảo (Cây thiên thảo)",
    "pinyinName": "Qian Cao",
    "botanicalName": "Radix et Rhizoma Rubiae",
    "chineseCharacters": "茜草",
    "category": "10. Thuốc Lý Huyết (Regulate Blood)",
    "properties": {
      "nature": "Hàn",
      "flavors": [
        "Đắng"
      ],
      "channels": [
        "Can"
      ]
    },
    "dosageGram": "6 - 12g",
    "actions": [
      "Lương huyết chỉ huyết",
      "Khứ ứ thông kinh (\"Chỉ huyết nhi bất lưu ứ\")"
    ],
    "clinicalIndications": [
      "Nôn ra máu, chảy máu cam, rong kinh băng huyết có lẫn cục máu đông",
      "Kinh bế ứ huyết, chấn thương tụ máu sưng đau"
    ],
    "contraindications": "Tỳ vị hư hàn không có huyết ứ huyết nhiệt tránh dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Điểm quý nhất là dùng sống vừa cầm máu vừa tan cục ứ huyết (cầm máu không gây bít tắc mạch); sao thán thiên cầm máu."
  },
  {
    "id": "ou-jie",
    "vietnameseName": "Ngẫu tiết (Đốt ngó sen)",
    "pinyinName": "Ou Jie",
    "botanicalName": "Nodus Nelumbinis Rhizomatis",
    "chineseCharacters": "藕節",
    "category": "10. Thuốc Lý Huyết (Regulate Blood)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Ngọt",
        "Chát"
      ],
      "channels": [
        "Can",
        "Phế",
        "Vị"
      ]
    },
    "dosageGram": "9 - 15g",
    "actions": [
      "Thu liễm chỉ huyết nhẹ nhàng mà hóa ứ"
    ],
    "clinicalIndications": [
      "Ho ra máu, nôn ra máu, chảy máu cam, tiểu ra máu (dùng phối Bạch mao căn, Trắc bách diệp)"
    ],
    "contraindications": "Hầu như không có chống chỉ định.",
    "benskyNotes": "Dan Bensky 3rd Ed: Dùng sống tiêu ứ nhẹ, sao cháy (Ngẫu tiết thán) tăng lực thu liễm cầm máu ở Phế và Vị."
  },
  {
    "id": "huai-jiao",
    "vietnameseName": "Hòe giác (Quả hòe)",
    "pinyinName": "Huai Jiao",
    "botanicalName": "Fructus Sophorae",
    "chineseCharacters": "槐角",
    "category": "10. Thuốc Lý Huyết (Regulate Blood)",
    "properties": {
      "nature": "Hàn",
      "flavors": [
        "Đắng"
      ],
      "channels": [
        "Can",
        "Đại tràng"
      ]
    },
    "dosageGram": "6 - 12g",
    "actions": [
      "Thanh nhiệt tả hỏa",
      "Lương huyết chỉ huyết (thiên về phần Đại tràng hạ tiêu)"
    ],
    "clinicalIndications": [
      "Trĩ nội trĩ ngoại sưng đau chảy máu tươi (Hòe Giác Hoàn)",
      "Tăng huyết áp chóng mặt đỏ mắt do can nhiệt"
    ],
    "contraindications": "Tỳ vị hư hàn hoặc phụ nữ có thai cẩn trọng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Quả hòe đi sâu vào hạ tiêu đại tràng hơn hoa hòe một chút nên cực kỳ phổ biến trong các bài hoàn trị trĩ xuất huyết."
  },
  {
    "id": "pao-jiang",
    "vietnameseName": "Bào khương (Gừng khô bào đen ruột vàng)",
    "pinyinName": "Pao Jiang",
    "botanicalName": "Rhizoma Zingiberis Praeparatum",
    "chineseCharacters": "炮薑",
    "category": "10. Thuốc Lý Huyết (Regulate Blood)",
    "properties": {
      "nature": "Đại nhiệt",
      "flavors": [
        "Đắng",
        "Chát"
      ],
      "channels": [
        "Tỳ",
        "Thận"
      ]
    },
    "dosageGram": "3 - 9g",
    "actions": [
      "Ôn kinh chỉ huyết (chỉ huyết hư hàn cực mạnh)",
      "Ôn trung chỉ thống chỉ tả"
    ],
    "clinicalIndications": [
      "Băng huyết rong kinh xuất huyết tiêu hóa phân đen do Tỳ bất thống huyết hư hàn",
      "Đau bụng ỉa chảy lạnh bụng sau sinh"
    ],
    "contraindications": "Âm hư hỏa vượng xuất huyết đỏ tươi cấm dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Quá trình sao cát già làm mất tính tán biểu cay nóng của Can khương, chuyển thành đắng sáp giữ chặt phần huyết ở kinh mạch."
  },
  {
    "id": "zao-xin-tu",
    "vietnameseName": "Táo tâm thổ / Phục long can (Đất lòng bếp nung lâu)",
    "pinyinName": "Zao Xin Tu / Fu Long Can",
    "botanicalName": "Terra Flava Usta",
    "chineseCharacters": "灶心土 (伏龍肝)",
    "category": "10. Thuốc Lý Huyết (Regulate Blood)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Cay"
      ],
      "channels": [
        "Tỳ",
        "Vị"
      ]
    },
    "dosageGram": "15 - 30g (Sắc lấy nước trong lắng cặn dùng để sắc các vị khác)",
    "actions": [
      "Ôn trung chỉ huyết (Hoàng Thổ Thang)",
      "Ôn vị chỉ ẩu chỉ tả"
    ],
    "clinicalIndications": [
      "Nôn ra máu, đi ngoài phân đen xuất huyết tiêu hóa hoặc băng huyết do Tỳ khí hư hàn (Hoàng Thổ Thang)",
      "Nôn nghén thai kỳ và tiêu chảy mãn"
    ],
    "contraindications": "Huyết nhiệt hoặc âm hư xuất huyết cấm dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Chủ vị bài Hoàng Thổ Thang của Trương Trọng Cảnh (Kim Quỹ Yếu Lược); phải sắc trước gạn lấy nước trong."
  },
  {
    "id": "xian-he-cao-zi-zhu",
    "vietnameseName": "Tử châu thảo (Nàng nàng / Tử châu diệp)",
    "pinyinName": "Zi Zhu",
    "botanicalName": "Folium Callicarpae",
    "chineseCharacters": "紫珠",
    "category": "10. Thuốc Lý Huyết (Regulate Blood)",
    "properties": {
      "nature": "Lương",
      "flavors": [
        "Đắng",
        "Chát"
      ],
      "channels": [
        "Can",
        "Tỳ",
        "Vị"
      ]
    },
    "dosageGram": "9 - 15g",
    "actions": [
      "Thu liễm chỉ huyết mạnh",
      "Thanh nhiệt giải độc tiêu thũng"
    ],
    "clinicalIndications": [
      "Xuất huyết tiêu hóa dạ dày tá tràng, ho ra máu, chảy máu cam, rong kinh",
      "Vết thương chảy máu, bỏng lửa (rắc bột ngoài)"
    ],
    "contraindications": "Không có nhiệt ứ xuất huyết nhẹ dùng vừa đủ.",
    "benskyNotes": "Dan Bensky 3rd Ed: Làm tăng mạnh số lượng tiểu cầu và rút ngắn thời gian đông máu cực kỳ rõ rệt trên lâm sàng xuất huyết nội tạng."
  },
  {
    "id": "xue-jie",
    "vietnameseName": "Huyết kiệt (Nhựa cây máu rồng)",
    "pinyinName": "Xue Jie",
    "botanicalName": "Sanguis Draconis",
    "chineseCharacters": "血竭",
    "category": "10. Thuốc Lý Huyết (Regulate Blood)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Ngọt",
        "Mặn"
      ],
      "channels": [
        "Tâm",
        "Can"
      ]
    },
    "dosageGram": "1 - 1.5g (Hoàn tán uống trực tiếp, không sắc)",
    "actions": [
      "Hoạt huyết định thống (chỉ thống chấn thương cực nhanh)",
      "Hóa ứ chỉ huyết",
      "Liễm sang sinh cơ dùng ngoài"
    ],
    "clinicalIndications": [
      "Chấn thương ngã đụng tụ máu sưng đau gãy xương (Thất Ly Tán)",
      "Đau bụng ứ huyết, loét dạ dày xuất huyết, vết thương hở lâu liền miệng"
    ],
    "contraindications": "Cấm phụ nữ có thai và người không có huyết ứ.",
    "benskyNotes": "Dan Bensky 3rd Ed: Nằm trong Thất Ly Tán lừng danh chấn thương ngoại khoa — vừa hoạt huyết tiêu bầm tụ lại sinh cơ làm kín miệng vết thương rất nhanh."
  },
  {
    "id": "ze-lan",
    "vietnameseName": "Trạch lan (Mần tưới bắc)",
    "pinyinName": "Ze Lan",
    "botanicalName": "Herba Lycopi",
    "chineseCharacters": "澤蘭",
    "category": "10. Thuốc Lý Huyết (Regulate Blood)",
    "properties": {
      "nature": "Hơi ôn",
      "flavors": [
        "Đắng",
        "Cay"
      ],
      "channels": [
        "Can",
        "Tỳ"
      ]
    },
    "dosageGram": "6 - 12g",
    "actions": [
      "Hoạt huyết điều kinh (rất êm không hại chính khí)",
      "Lợi thủy tiêu thũng (đặc biệt phù thũng sau sinh / ứ huyết)"
    ],
    "clinicalIndications": [
      "Kinh bế đau bụng kinh sản hậu ứ huyết đau bụng",
      "Phù thũng sau sinh hoặc cổ trướng nhẹ do huyết ứ thủy đình",
      "Mụn nhọt chấn thương"
    ],
    "contraindications": "Huyết hư không có ứ huyết hoặc phụ nữ có thai thận trọng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Khác Ích mẫu thảo tính hơi hàn, Trạch lan tính hơi ấm và lợi thủy tiêu phù kèm ứ huyết sau sinh rất hiệu quả."
  },
  {
    "id": "chuan-niu-xi",
    "vietnameseName": "Xuyên ngưu tất",
    "pinyinName": "Chuan Niu Xi",
    "botanicalName": "Radix Cyathulae",
    "chineseCharacters": "川牛膝",
    "category": "10. Thuốc Lý Huyết (Regulate Blood)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Ngọt",
        "Hơi đắng"
      ],
      "channels": [
        "Can",
        "Thận"
      ]
    },
    "dosageGram": "4.5 - 9g",
    "actions": [
      "Hoạt huyết thông kinh mạnh (hơn Hoài ngưu tất ở phần phá ứ)",
      "Trừ phong thấp lợi khớp"
    ],
    "clinicalIndications": [
      "Kinh bế ứ huyết khối kết vùng bụng dưới, sót nhau đẻ khó",
      "Đau nhức khớp gối chi dưới phong thấp, tiểu buốt tiểu máu"
    ],
    "contraindications": "Cấm dùng cho phụ nữ có thai và người băng huyết.",
    "benskyNotes": "Dan Bensky 3rd Ed: Phân biệt: Hoài ngưu tất (Achyranthes) thiên về bổ Can Thận mạnh gân cốt; Xuyên ngưu tất (Cyathula) thiên về hoạt huyết khứ ứ thông kinh lợi khớp."
  },
  {
    "id": "tu-bie-chong",
    "vietnameseName": "Thổ miết trùng / Giá trùng (Con bọ rùa đất khô)",
    "pinyinName": "Tu Bie Chong (Zhe Chong)",
    "botanicalName": "Eupolyphaga seu Steleophaga",
    "chineseCharacters": "土鼈蟲 (䗪蟲)",
    "category": "10. Thuốc Lý Huyết (Regulate Blood)",
    "properties": {
      "nature": "Hàn",
      "flavors": [
        "Mặn",
        "Hơi độc"
      ],
      "channels": [
        "Can"
      ]
    },
    "dosageGram": "3 - 9g (Tán bột uống 1 - 1.5g)",
    "actions": [
      "Phá huyết trục ứ mạnh",
      "Tục cân tiếp cốt (nối liền gân xương bị gãy nhanh nhất)"
    ],
    "clinicalIndications": [
      "Gãy xương chấn thương đứt dây chằng bầm tụ nặng",
      "Kinh bế lâu ngày khối u xơ bụng dưới (Đại Hoàng Giá Trùng Hoàn)"
    ],
    "contraindications": "CẤM tuyệt đối cho phụ nữ có thai và người âm huyết hư không có thực ứ.",
    "benskyNotes": "Dan Bensky 3rd Ed: \"Huyết nhục hữu tình chi phẩm\" chuyên nối gân liền xương gãy cực nhanh trong các bài thuốc võ thuật cổ truyền."
  },
  {
    "id": "shui-zhi",
    "vietnameseName": "Thủy điệt (Con đỉa khô sao hoạt thạch)",
    "pinyinName": "Shui Zhi",
    "botanicalName": "Hirudo",
    "chineseCharacters": "水蛭",
    "category": "10. Thuốc Lý Huyết (Regulate Blood)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Mặn",
        "Đắng",
        "Hơi độc"
      ],
      "channels": [
        "Can"
      ]
    },
    "dosageGram": "1.5 - 3g (Tán bột cho vào viên nang uống 0.3 - 0.5g sẽ rất hiệu quả)",
    "actions": [
      "Phá huyết thông kinh tiêu trưng cực mạnh (tiêu cục máu đông kinh niên)"
    ],
    "clinicalIndications": [
      "Đột quỵ nhồi máu não huyết khối lâu ngày, bệnh mạch vành tắc nghẽn (Thông Tâm Lạc)",
      "U xơ tử cung, xơ gan cổ trướng, kinh bế ngoan cố (Để Đương Thang)"
    ],
    "contraindications": "CẤM tuyệt đối cho phụ nữ có thai, người xuất huyết giảm tiểu cầu hoặc đang dùng thuốc chống đông liều cao.",
    "benskyNotes": "Dan Bensky 3rd Ed: Hirudin tự nhiên không bị phá hủy hoàn toàn ở bột sao nhẹ, làm tiêu huyết khối rất tốt nhưng tính bình không làm hao tổn tân huyết."
  },
  {
    "id": "meng-chong",
    "vietnameseName": "Manh trùng (Con mòng trâu sao bỏ cánh chân)",
    "pinyinName": "Meng Chong",
    "botanicalName": "Tabanus",
    "chineseCharacters": "虻蟲",
    "category": "10. Thuốc Lý Huyết (Regulate Blood)",
    "properties": {
      "nature": "Hơi hàn",
      "flavors": [
        "Đắng",
        "Hơi độc"
      ],
      "channels": [
        "Can"
      ]
    },
    "dosageGram": "1 - 1.5g (Dạng hoàn tán 0.3g)",
    "actions": [
      "Phá huyết trục ứ cực liệt (Để Đương Thang)"
    ],
    "clinicalIndications": [
      "Chứng súc huyết phát cuồng ở hạ tiêu, kinh bế khối kết ngoan cố",
      "Chấn thương tụ máu nội tạng"
    ],
    "contraindications": "CẤM phụ nữ có thai và người suy kiệt.",
    "benskyNotes": "Dan Bensky 3rd Ed: Thường cặp đôi cùng Thủy điệt trong Để Đương Thang (Thương Hàn Luận); tác dụng nhanh mạnh hơn Thủy điệt nhưng dễ hại khí hơn."
  },
  {
    "id": "zi-ran-tong",
    "vietnameseName": "Tự nhiên đồng (Quặng Pyrit sắt)",
    "pinyinName": "Zi Ran Tong",
    "botanicalName": "Pyritum",
    "chineseCharacters": "自然銅",
    "category": "10. Thuốc Lý Huyết (Regulate Blood)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Cay"
      ],
      "channels": [
        "Can"
      ]
    },
    "dosageGram": "3 - 9g (Nung đỏ nhúng giấm 7 lần — Tôi giấm, sắc trước hoặc tán bột 0.3g)",
    "actions": [
      "Tán ứ chỉ thống",
      "Tiếp cốt liệu thương (liền xương gãy cực nhanh)"
    ],
    "clinicalIndications": [
      "Gãy xương chấn thương sưng đau tụ máu bầm tím (Thất Ly Tán / Tiếp Cốt Đan)"
    ],
    "contraindications": "Không dùng dạng sống chưa tôi giấm; âm hư hỏa vượng không có ứ chấn thương tránh dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Khoáng chất đầu bảng trong chỉnh hình Đông y giúp kích thích can xương mọc nhanh và giảm sưng đau chỗ gãy."
  },
  {
    "id": "liu-ji-nu",
    "vietnameseName": "Lưu ký nô (Cúc ngải dại)",
    "pinyinName": "Liu Ji Nu",
    "botanicalName": "Herba Artemisiae Anomalae",
    "chineseCharacters": "劉寄奴",
    "category": "10. Thuốc Lý Huyết (Regulate Blood)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Đắng"
      ],
      "channels": [
        "Tâm",
        "Tỳ"
      ]
    },
    "dosageGram": "3 - 9g",
    "actions": [
      "Phá huyết thông kinh chỉ thống",
      "Liễm sang tiêu thũng",
      "Tiêu thực đạo trệ"
    ],
    "clinicalIndications": [
      "Chấn thương ngã đụng bầm tím đau nhức, vết thương chảy máu (đắp bột)",
      "Kinh bế đau bụng kinh sau sinh, đầy bụng thực tích"
    ],
    "contraindications": "Cấm dùng cho phụ nữ có thai và khí huyết hư ỉa chảy.",
    "benskyNotes": "Dan Bensky 3rd Ed: Vừa hoạt huyết tiêu chấn thương vừa tiêu thực tích ở Tỳ Vị."
  },
  {
    "id": "yue-ji-hua",
    "vietnameseName": "Nguyệt quý hoa (Hoa hồng tàu nở quanh năm)",
    "pinyinName": "Yue Ji Hua",
    "botanicalName": "Flos Rosae Chinensis",
    "chineseCharacters": "月季花",
    "category": "10. Thuốc Lý Huyết (Regulate Blood)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Ngọt"
      ],
      "channels": [
        "Can"
      ]
    },
    "dosageGram": "3 - 6g",
    "actions": [
      "Hoạt huyết điều kinh",
      "Sơ can giải uất tiêu thũng"
    ],
    "clinicalIndications": [
      "Kinh nguyệt không đều thống kinh bế kinh ở phụ nữ",
      "Hạch cổ tràng nhạc, sưng đau tuyến vú"
    ],
    "contraindications": "Phụ nữ có thai và rong kinh dùng thận trọng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Tên \"Nguyệt quý\" vì ra hoa hàng tháng, thường cặp với Mân côi hoa để điều hòa chu kỳ kinh nguyệt rất êm."
  },
  {
    "id": "ling-xiao-hua",
    "vietnameseName": "Lăng tiêu hoa",
    "pinyinName": "Ling Xiao Hua",
    "botanicalName": "Flos Campsis",
    "chineseCharacters": "凌霄花",
    "category": "10. Thuốc Lý Huyết (Regulate Blood)",
    "properties": {
      "nature": "Hơi hàn",
      "flavors": [
        "Cay",
        "Chua"
      ],
      "channels": [
        "Can",
        "Tâm bào"
      ]
    },
    "dosageGram": "4.5 - 9g",
    "actions": [
      "Hoạt huyết thông kinh",
      "Lương huyết khứ phong chỉ ngứa"
    ],
    "clinicalIndications": [
      "Kinh bế u cục bụng dưới sau sinh",
      "Nổi mẩn ngứa mề đay trứng cá đỏ mặt (Tửu tra tỷ) do huyết nhiệt ứ trệ"
    ],
    "contraindications": "Cấm dùng cho phụ nữ có thai và người khí huyết hư không có ứ.",
    "benskyNotes": "Dan Bensky 3rd Ed: Khác đa số thuốc hoạt huyết tính ấm, Lăng tiêu hoa tính hơi hàn nên rất hợp chứng kinh bế kèm huyết nhiệt phát ban ngứa."
  },
  {
    "id": "wang-bu-liu-xing-ch10",
    "vietnameseName": "Thủy hồng hoa tử (Hạt nghể hồng)",
    "pinyinName": "Shui Hong Hua Zi",
    "botanicalName": "Fructus Polygoni Orientalis",
    "chineseCharacters": "水紅花子",
    "category": "10. Thuốc Lý Huyết (Regulate Blood)",
    "properties": {
      "nature": "Hơi hàn",
      "flavors": [
        "Mặn"
      ],
      "channels": [
        "Can",
        "Vị"
      ]
    },
    "dosageGram": "15 - 30g (Giã dập sắc)",
    "actions": [
      "Tán huyết tiêu trưng (tiêu khối cứng gan lách to)",
      "Lợi thủy tiêu trướng",
      "Giải độc"
    ],
    "clinicalIndications": [
      "Xơ gan cổ trướng gan lách to khối tích cứng bụng",
      "Hạch cổ bướu tràng nhạc, loét dạ dày"
    ],
    "contraindications": "Phụ nữ có thai cấm dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Vị mặn hàn làm mềm và tan khối u cục gan lách to kèm dịch cổ trướng rất hay."
  },
  {
    "id": "gan-qi",
    "vietnameseName": "Can tất (Nhựa cây sơn ta chế khô)",
    "pinyinName": "Gan Qi",
    "botanicalName": "Resina Toxicodendri",
    "chineseCharacters": "乾漆",
    "category": "10. Thuốc Lý Huyết (Regulate Blood)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Cay",
        "Độc"
      ],
      "channels": [
        "Can",
        "Tỳ"
      ]
    },
    "dosageGram": "2 - 4.5g (PHẢI sao khói cháy hết nhựa sống cho vào hoàn tán)",
    "actions": [
      "Phá huyết trục ứ tiêu trưng mạnh",
      "Sát trùng"
    ],
    "clinicalIndications": [
      "Kinh bế lâu ngày khối u cục ổ bụng ngoan cố (Đại Hoàng Giá Trùng Hoàn)",
      "Trùng tích đau bụng"
    ],
    "contraindications": "CẤM phụ nữ có thai và người dễ dị ứng nhựa sơn (Urushiol).",
    "benskyNotes": "Dan Bensky 3rd Ed: Phải nung đốt hết khói độc để loại Urushiol gây dị ứng phồng rộp niêm mạc."
  },
  {
    "id": "bi-bo",
    "vietnameseName": "Tất bạt (Tiêu lốt)",
    "pinyinName": "Bi Bo",
    "botanicalName": "Fructus Piperis Longi",
    "chineseCharacters": "蓽茇",
    "category": "11. Thuốc Ôn Lý Trừ Hàn (Warm Interior & Expel Cold)",
    "properties": {
      "nature": "Nhiệt",
      "flavors": [
        "Cay"
      ],
      "channels": [
        "Vị",
        "Đại tràng"
      ]
    },
    "dosageGram": "1.5 - 3g",
    "actions": [
      "Ôn trung tán hàn",
      "Hạ khí chỉ thống (đau dạ dày, đau răng, đau tim hàn)"
    ],
    "clinicalIndications": [
      "Đau thắt vùng thượng vị nôn nước chua tiêu chảy lạnh bụng",
      "Đau nhức răng do hàn (ngậm hoặc bôi bột), đau đầu do hàn ẩm"
    ],
    "contraindications": "Thực nhiệt âm hư hỏa vượng răng lợi sưng nóng đỏ đau cấm dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Chứa Piperine cay nóng hơn Hồ tiêu; rất hay phối với Cao lương khương thành bài Lương Phụ Hoàn trị đau dạ dày thể hàn."
  },
  {
    "id": "bi-cheng-qie",
    "vietnameseName": "Tất trừng gia (Màng tang)",
    "pinyinName": "Bi Cheng Qie",
    "botanicalName": "Fructus Litseae",
    "chineseCharacters": "蓽澄茄",
    "category": "11. Thuốc Ôn Lý Trừ Hàn (Warm Interior & Expel Cold)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Cay"
      ],
      "channels": [
        "Tỳ",
        "Vị",
        "Thận",
        "Bàng quang"
      ]
    },
    "dosageGram": "1.5 - 3g",
    "actions": [
      "Ôn trung tán hàn hành khí chỉ thống",
      "Ôn thận hóa khí (trị tiểu đục tiểu dầm hàn thấp)"
    ],
    "clinicalIndications": [
      "Đau bụng lạnh đầy hơi nấc cụt nôn nước trong do Tỳ Vị hư hàn",
      "Tiểu đục lạnh buốt tiểu dầm do Bàng quang hàn thấp"
    ],
    "contraindications": "Âm hư nội nhiệt cấm dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Vừa làm ấm Vị ngừng nấc nôn vừa ôn ấm hạ tiêu Bàng quang cầm tiểu nhiều tiểu đục."
  },
  {
    "id": "hu-jiao",
    "vietnameseName": "Hồ tiêu (Hạt tiêu đen / tiêu sọ)",
    "pinyinName": "Hu Jiao",
    "botanicalName": "Fructus Piperis",
    "chineseCharacters": "胡椒",
    "category": "11. Thuốc Ôn Lý Trừ Hàn (Warm Interior & Expel Cold)",
    "properties": {
      "nature": "Nhiệt",
      "flavors": [
        "Cay"
      ],
      "channels": [
        "Vị",
        "Đại tràng"
      ]
    },
    "dosageGram": "1.5 - 3g (Tán bột uống 0.5 - 1g)",
    "actions": [
      "Ôn trung tán hàn",
      "Hạ khí tiêu đờm chỉ tả"
    ],
    "clinicalIndications": [
      "Đau bụng lạnh dữ dội nôn mửa tiêu chảy không ngừng do Vị hàn (Đại Bán Hạ + Hồ tiêu)",
      "Chứng động kinh nhiều đờm trắng lỏng (phối Bạch phàn)"
    ],
    "contraindications": "Âm hư hỏa vượng, loét dạ dày thực nhiệt, xuất huyết, trĩ nóng cấm dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Sẵn có trong mọi căn bếp nhưng là vị ôn lý rất mạnh trị lạnh bụng nôn thốc và giải độc thức ăn lạnh tính."
  },
  {
    "id": "ba-jiao-hui-xiang",
    "vietnameseName": "Bát giác hồi hương (Hoa đại hồi)",
    "pinyinName": "Ba Jiao Hui Xiang",
    "botanicalName": "Fructus Anisi Stellati",
    "chineseCharacters": "八角茴香",
    "category": "11. Thuốc Ôn Lý Trừ Hàn (Warm Interior & Expel Cold)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Cay"
      ],
      "channels": [
        "Can",
        "Thận",
        "Tỳ",
        "Vị"
      ]
    },
    "dosageGram": "3 - 6g",
    "actions": [
      "Ôn dương tán hàn",
      "Lý khí chỉ thống vùng eo lưng và bụng dưới"
    ],
    "clinicalIndications": [
      "Đau bụng lạnh nôn mửa, thoát vị bẹn sưng đau tinh hoàn",
      "Đau thắt lưng do Thận dương hư hàn thấp, giảm bạch cầu (acid Shikimic)"
    ],
    "contraindications": "Âm hư hỏa vượng cấm dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Nguồn cung cấp Acid Shikimic nguyên liệu bán tổng hợp thuốc kháng virus cúm và tán hàn sán hiệu quả."
  },
  {
    "id": "hong-dou-kou",
    "vietnameseName": "Hồng đậu khấu (Quả riềng ấm)",
    "pinyinName": "Hong Dou Kou",
    "botanicalName": "Fructus Galangae",
    "chineseCharacters": "紅豆蔻",
    "category": "11. Thuốc Ôn Lý Trừ Hàn (Warm Interior & Expel Cold)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Cay"
      ],
      "channels": [
        "Tỳ",
        "Phế"
      ]
    },
    "dosageGram": "3 - 6g",
    "actions": [
      "Tán hàn táo thấp",
      "Ôn trung tỉnh tỳ tiêu thực",
      "Giải tửu độc"
    ],
    "clinicalIndications": [
      "Đau bụng đầy hơi buồn nôn tiêu chảy do hàn thấp thực tích",
      "Say rượu lạnh bụng nôn khan"
    ],
    "contraindications": "Âm hư huyết táo hỏa vượng không dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Là quả chín của cây Cao lương khương; tác dụng ôn trung tiêu thực trừ đờm ẩm tương đồng nhưng thơm nhẹ hơn."
  },
  {
    "id": "hong-shen",
    "vietnameseName": "Hồng sâm (Nhân sâm hấp sấy đỏ)",
    "pinyinName": "Hong Shen",
    "botanicalName": "Radix et Rhizoma Ginseng Rubra",
    "chineseCharacters": "紅參",
    "category": "12. Thuốc Bổ Ích (Tonifying Herbs)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Ngọt",
        "Hơi đắng"
      ],
      "channels": [
        "Tỳ",
        "Phế",
        "Tâm",
        "Thận"
      ]
    },
    "dosageGram": "3 - 9g (Hầm cách thủy riêng)",
    "actions": [
      "Đại bổ nguyên khí",
      "Phục mạch cố thoát",
      "Ích khí nhiếp huyết (rất ấm, chuyên dương hư)"
    ],
    "clinicalIndications": [
      "Trụy mạch tay chân lạnh vã mồ hôi lạnh (vong dương), suy tim khí dương lưỡng hư",
      "Phụ nữ băng huyết khí hư không nhiếp được huyết, người cao tuổi sợ lạnh suy nhược"
    ],
    "contraindications": "PHẢN Lê lô, Ngũ linh chi; Úy Lai phục tử; cấm dùng khi sốt thực nhiệt hoặc tăng huyết áp chưa kiểm soát thể can dương vượng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Nhân sâm tươi đồ chín thành Hồng sâm làm tăng tính ÔN và sinh ra Ginsenoside Rg3 chống mệt mỏi phục dương mạnh."
  },
  {
    "id": "hong-jing-tian",
    "vietnameseName": "Hồng cảnh thiên",
    "pinyinName": "Hong Jing Tian",
    "botanicalName": "Radix et Rhizoma Rhodiolae",
    "chineseCharacters": "紅景天",
    "category": "12. Thuốc Bổ Ích (Tonifying Herbs)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Ngọt",
        "Đắng"
      ],
      "channels": [
        "Phế",
        "Tâm"
      ]
    },
    "dosageGram": "3 - 6g",
    "actions": [
      "Ích khí hoạt huyết",
      "Thông mạch bình suyễn (tăng chịu đựng thiếu oxy)"
    ],
    "clinicalIndications": [
      "Mệt mỏi suy nhược thiếu oxy vùng núi cao khó thở tức ngực",
      "Thiếu máu cơ tim, di chứng tai biến mạch máu não, suy giảm trí nhớ"
    ],
    "contraindications": "Phụ nữ có thai và người đang sốt cao thận trọng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Chứa Salidroside vừa bổ khí vừa hoạt huyết thông mạch mà không gây háo nhiệt, rất nổi tiếng tăng khả năng thích nghi."
  },
  {
    "id": "jiao-gu-lan",
    "vietnameseName": "Giảo cổ lam (Ngũ diệp sâm)",
    "pinyinName": "Jiao Gu Lan",
    "botanicalName": "Herba Gynostemmatis",
    "chineseCharacters": "絞股藍",
    "category": "12. Thuốc Bổ Ích (Tonifying Herbs)",
    "properties": {
      "nature": "Hàn",
      "flavors": [
        "Đắng",
        "Ngọt"
      ],
      "channels": [
        "Phế",
        "Tỳ",
        "Thận"
      ]
    },
    "dosageGram": "10 - 20g",
    "actions": [
      "Ích khí kiện tỳ",
      "Hóa đờm chỉ khái",
      "Thanh nhiệt giải độc hạ mỡ máu"
    ],
    "clinicalIndications": [
      "Tăng mỡ máu xơ vữa động mạch tiểu đường type 2 mệt mỏi suy nhược",
      "Viêm phế quản mạn tính, gan nhiễm mỡ"
    ],
    "contraindications": "Người tỳ vị hư hàn ỉa chảy lạnh bụng không nên uống lúc đói.",
    "benskyNotes": "Dan Bensky 3rd Ed: Chứa Gypenosides có cấu trúc tương tự Saponin Nhân sâm nhưng tính mát giúp bổ khí tiêu đờm mỡ máu rất tốt."
  },
  {
    "id": "ci-wu-jia",
    "vietnameseName": "Thích ngũ gia (Sâm Tây Bá Lợi Á)",
    "pinyinName": "Ci Wu Jia",
    "botanicalName": "Radix et Rhizoma Acanthopanacis Senticosi",
    "chineseCharacters": "刺五加",
    "category": "12. Thuốc Bổ Ích (Tonifying Herbs)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Cay",
        "Hơi đắng"
      ],
      "channels": [
        "Tỳ",
        "Thận",
        "Tâm"
      ]
    },
    "dosageGram": "9 - 27g",
    "actions": [
      "Ích khí kiện tỳ",
      "Bổ thận an thần (mạnh hơn Ngũ gia bì về an thần tăng lực)"
    ],
    "clinicalIndications": [
      "Suy nhược thần kinh mất ngủ hồi hộp hay quên mệt mỏi mãn tính",
      "Đau lưng mỏi gối phong thấp ở người Tỳ Thận lưỡng hư"
    ],
    "contraindications": "Âm hư hỏa vượng mất ngủ do thực hỏa tránh dùng liều cao.",
    "benskyNotes": "Dan Bensky 3rd Ed: \"Adaptogen\" kinh điển nâng cao sức bền tinh thần và thể chất nhưng giữ Tâm thần ổn định không gây bứt rứt."
  },
  {
    "id": "feng-mi",
    "vietnameseName": "Phong mật (Mật ong nguyên chất)",
    "pinyinName": "Feng Mi",
    "botanicalName": "Mel",
    "chineseCharacters": "蜂蜜",
    "category": "12. Thuốc Bổ Ích (Tonifying Herbs)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Ngọt"
      ],
      "channels": [
        "Phế",
        "Tỳ",
        "Đại tràng"
      ]
    },
    "dosageGram": "15 - 30g (Hòa nước thuốc đã sắc hoặc dùng luyện thuốc hoàn & chích thuốc)",
    "actions": [
      "Bổ trung hoãn cấp chỉ thống",
      "Nhuận phế chỉ khái",
      "Nhuận tràng thông tiện giải độc (giải độc Ô đầu)"
    ],
    "clinicalIndications": [
      "Đau dạ dày mạn tính thể hư nhược",
      "Ho khan ít đờm khản giọng do Phế táo",
      "Táo bón tân dịch khô ở người già và phụ nữ sau sinh"
    ],
    "contraindications": "TUYỆT ĐỐI KHÔNG cho trẻ dưới 1 tuổi uống mật ong sống (nguy cơ nha bào Clostridium botulinum); người thấp trệ đầy bụng ỉa chảy tránh dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Tá dược chích thuốc số 1 (Mật chích Hoàng kỳ, Cam thảo, Tỳ bà diệp, Bách bộ) để tăng quy kinh Tỳ Phế và giảm tính khô."
  },
  {
    "id": "yi-tang",
    "vietnameseName": "Di đường (Mạch nha đường)",
    "pinyinName": "Yi Tang",
    "botanicalName": "Saccharum Granorum",
    "chineseCharacters": "飴糖",
    "category": "12. Thuốc Bổ Ích (Tonifying Herbs)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Ngọt"
      ],
      "channels": [
        "Tỳ",
        "Vị",
        "Phế"
      ]
    },
    "dosageGram": "30 - 60g (Hòa tan vào nước thuốc nóng, không sắc)",
    "actions": [
      "Bổ tỳ ích khí",
      "Hoãn cấp chỉ thống (giảm đau co thắt dạ dày cực hay)",
      "Nhuận phế chỉ khái"
    ],
    "clinicalIndications": [
      "Đau bụng vùng thượng vị thích xoa bóp ấm do Tỳ Vị hư hàn (\"Tiểu Kiến Trung Thang\")",
      "Ho khan suy kiệt mệt mỏi"
    ],
    "contraindications": "Thấp nhiệt đầy bụng nôn mửa thực tích hoặc tiểu đường không dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Quân dược trong Tiểu Kiến Trung Thang của Trương Trọng Cảnh (\"Kiến lập trung khí\" dưỡng Tỳ Vị rất êm ái)."
  },
  {
    "id": "nan-sha-shen",
    "vietnameseName": "Nam sa sâm",
    "pinyinName": "Nan Sha Shen",
    "botanicalName": "Radix Adenophorae",
    "chineseCharacters": "南沙參",
    "category": "12. Thuốc Bổ Ích (Tonifying Herbs)",
    "properties": {
      "nature": "Hơi hàn",
      "flavors": [
        "Ngọt"
      ],
      "channels": [
        "Phế",
        "Vị"
      ]
    },
    "dosageGram": "9 - 15g",
    "actions": [
      "Dưỡng âm thanh phế",
      "Ích vị sinh tân",
      "Hóa đờm ích khí (hơn Bắc sa sâm ở điểm vừa bổ âm vừa hóa đờm và ích khí nhẹ)"
    ],
    "clinicalIndications": [
      "Ho khan kéo dài khản giọng hoặc ho có đờm dính ít khó khạc do Phế âm hư",
      "Khô miệng họng khát nước sau sốt"
    ],
    "contraindications": "PHẢN Lê lô (Thập bát phản); ngoại cảm phong hàn tránh dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Bắc sa sâm (Glehnia) thiên về tư âm thuần túy hơn; Nam sa sâm (Adenophora) tuy nhẹ lực tư âm hơn nhưng kiêm hóa đờm và ích Phế khí."
  },
  {
    "id": "ming-dang-shen",
    "vietnameseName": "Minh đảng sâm",
    "pinyinName": "Ming Dang Shen",
    "botanicalName": "Radix Changii",
    "chineseCharacters": "明黨參",
    "category": "12. Thuốc Bổ Ích (Tonifying Herbs)",
    "properties": {
      "nature": "Hơi hàn",
      "flavors": [
        "Ngọt",
        "Hơi đắng"
      ],
      "channels": [
        "Phế",
        "Tỳ",
        "Can"
      ]
    },
    "dosageGram": "6 - 12g",
    "actions": [
      "Nhuận phế hóa đờm",
      "Dưỡng âm hòa vị",
      "Bình can giải độc"
    ],
    "clinicalIndications": [
      "Ho khan đờm dính chóng mặt ù tai do Can dương và Phế âm bất túc",
      "Khô miệng ăn kém buồn nôn sau bệnh nhiệt"
    ],
    "contraindications": "Tỳ vị hư hàn tránh dùng nhiều.",
    "benskyNotes": "Dan Bensky 3rd Ed: Vừa thanh Phế dưỡng âm hòa Vị vừa hóa đờm bình Can nhẹ, thường dùng cho bệnh nhân hậu Covid hoặc hậu nhiệt bệnh."
  },
  {
    "id": "lu-jiao",
    "vietnameseName": "Lộc giác (Sừng hươu già)",
    "pinyinName": "Lu Jiao",
    "botanicalName": "Cornu Cervi",
    "chineseCharacters": "鹿角",
    "category": "12. Thuốc Bổ Ích (Tonifying Herbs)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Mặn"
      ],
      "channels": [
        "Can",
        "Thận"
      ]
    },
    "dosageGram": "6 - 15g (Bào vụn sắc trước)",
    "actions": [
      "Ôn thận tráng dương",
      "Cường cân cốt",
      "Hành huyết tiêu thũng (tiêu ứ vú sưng nhọt âm hư)"
    ],
    "clinicalIndications": [
      "Liệt dương di tinh đau lưng lạnh gối do Thận dương hư",
      "Áp xe vú sưng cứng giai đoạn sớm, nhọt âm thư (Dương Hòa Thang)",
      "Ứ huyết đau bụng chấn thương"
    ],
    "contraindications": "Âm hư hỏa vượng không có dương hư hàn trệ cấm dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: So với Lộc nhung đại bổ tinh huyết, Lộc giác thiên về hoạt huyết hành ứ tiêu ung nhọt âm thư (nhọt không sưng nóng) mạnh hơn."
  },
  {
    "id": "lu-jiao-jiao",
    "vietnameseName": "Lộc giác giao (Cao ban long)",
    "pinyinName": "Lu Jiao Jiao",
    "botanicalName": "Colla Cornus Cervi",
    "chineseCharacters": "鹿角膠",
    "category": "12. Thuốc Bổ Ích (Tonifying Herbs)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Ngọt",
        "Mặn"
      ],
      "channels": [
        "Can",
        "Thận"
      ]
    },
    "dosageGram": "3 - 9g (Hòa tan trong nước thuốc nóng)",
    "actions": [
      "Ôn bổ Can Thận dương",
      "Ích tinh dưỡng huyết chỉ huyết mạnh"
    ],
    "clinicalIndications": [
      "Tinh huyết suy kiệt hiếm muộn vô sinh lạnh tử cung đau lưng mỏi gối (Hữu Quy Hoàn)",
      "Băng huyết nôn ra máu xuất huyết do dương hư"
    ],
    "contraindications": "Âm hư hỏa vượng hoặc Tỳ Vị đờm thấp đình trệ không dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Cao nấu từ sừng hươu già; bổ tinh huyết ấm dương không thua Lộc nhung nhưng giá thành hợp lý và ôn nhu hơn."
  },
  {
    "id": "lu-jiao-shuang",
    "vietnameseName": "Lộc giác sương (Bã sừng hươu sau nấu cao)",
    "pinyinName": "Lu Jiao Shuang",
    "botanicalName": "Cornu Cervi Degelatinatum",
    "chineseCharacters": "鹿角霜",
    "category": "12. Thuốc Bổ Ích (Tonifying Herbs)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Mặn"
      ],
      "channels": [
        "Can",
        "Thận"
      ]
    },
    "dosageGram": "9 - 15g (Bọc túi vải sắc trước)",
    "actions": [
      "Ôn thận trợ dương",
      "Thu liễm cố sáp (chủ trị băng lậu khí hư di niệu)"
    ],
    "clinicalIndications": [
      "Tỳ Thận dương hư kém ăn nôn nước trong tiêu chảy mạn",
      "Băng lậu khí hư trắng loãng, tiểu dầm di tinh, mụn nhọt lâu vỡ"
    ],
    "contraindications": "Âm hư nội nhiệt cấm dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Không nê trệ Tỳ Vị như Cao ban long nhờ đã rút hết keo dính; còn thêm tính thu liễm cố sáp rất tốt."
  },
  {
    "id": "suo-yang",
    "vietnameseName": "Tỏa dương (Nấm ngọc cẩu bắc)",
    "pinyinName": "Suo Yang",
    "botanicalName": "Herba Cynomorii",
    "chineseCharacters": "鎖陽",
    "category": "12. Thuốc Bổ Ích (Tonifying Herbs)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Ngọt"
      ],
      "channels": [
        "Can",
        "Thận",
        "Đại tràng"
      ]
    },
    "dosageGram": "4.5 - 9g",
    "actions": [
      "Bổ thận dương ích tinh huyết",
      "Nhuận tràng thông tiện"
    ],
    "clinicalIndications": [
      "Liệt dương xuất tinh sớm yếu chân mỏi gối (Tử Địa Hoàn / Hổ Tiềm Hoàn)",
      "Táo bón phân khô ở người cao tuổi dương hư"
    ],
    "contraindications": "Âm hư hỏa vượng, tỳ hư tiêu chảy cấm dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Tương tự Nhục thung dung nhưng tính ÔN bổ Thận dương mạnh hơn một chút, nhuận tràng nhẹ hơn một chút."
  },
  {
    "id": "sha-yuan-zi",
    "vietnameseName": "Sa uyển tử (Đồng tật lê)",
    "pinyinName": "Sha Yuan Zi",
    "botanicalName": "Semen Astragali Complanati",
    "chineseCharacters": "沙苑子",
    "category": "12. Thuốc Bổ Ích (Tonifying Herbs)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Ngọt"
      ],
      "channels": [
        "Can",
        "Thận"
      ]
    },
    "dosageGram": "9 - 15g",
    "actions": [
      "Bổ thận cố tinh (cực hay trị di tinh hoạt tinh)",
      "Dưỡng can minh mục"
    ],
    "clinicalIndications": [
      "Di tinh hoạt tinh xuất tinh sớm tiểu nhiều lần khí hư bạch đới (Kim Tỏa Cố Tinh Hoàn)",
      "Đau mỏi thắt lưng hoa mắt mờ mắt do Can Thận hư"
    ],
    "contraindications": "Thận âm hư hỏa vượng tiểu buốt nước tiểu sẫm tránh dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Quân dược bài Kim Tỏa Cố Tinh Hoàn; vừa bổ dương tinh lại thu sáp giữ chặt tinh quan không gây bốc hỏa."
  },
  {
    "id": "jiu-cai-zi",
    "vietnameseName": "Cửu thái tử (Hạt hẹ)",
    "pinyinName": "Jiu Cai Zi",
    "botanicalName": "Semen Allii Tuberosi",
    "chineseCharacters": "韭菜子",
    "category": "12. Thuốc Bổ Ích (Tonifying Herbs)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Cay",
        "Ngọt"
      ],
      "channels": [
        "Can",
        "Thận"
      ]
    },
    "dosageGram": "3 - 9g",
    "actions": [
      "Ôn bổ can thận tráng dương",
      "Cố tinh súc niệu"
    ],
    "clinicalIndications": [
      "Liệt dương di tinh tảo tiết đau lạnh thắt lưng đầu gối",
      "Tiểu nhiều lần ban đêm tiểu dầm khí hư trắng loãng"
    ],
    "contraindications": "Âm hư hỏa vượng không dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Sao muối ăn giúp tăng tác dụng ôn Thận sáp tinh tương tự Sa uyển tử."
  },
  {
    "id": "hai-ma",
    "vietnameseName": "Hải mã (Cá ngựa khô)",
    "pinyinName": "Hai Ma",
    "botanicalName": "Hippocampus",
    "chineseCharacters": "海馬",
    "category": "12. Thuốc Bổ Ích (Tonifying Herbs)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Ngọt",
        "Mặn"
      ],
      "channels": [
        "Can",
        "Thận"
      ]
    },
    "dosageGram": "3 - 9g (Tán bột uống 1 - 1.5g hoặc ngâm rượu)",
    "actions": [
      "Ôn thận tráng dương",
      "Tán kết tiêu thũng hoạt huyết (đẻ khó, khối u cục)"
    ],
    "clinicalIndications": [
      "Liệt dương suy giảm sinh lý hiếm muộn tiểu đêm nhiều",
      "Hen suyễn mạn do Thận bất nạp khí",
      "Khối kết ổ bụng nhọt sưng đinh độc (bên ngoài)"
    ],
    "contraindications": "Phụ nữ có thai và người âm hư hỏa vượng CẤM dùng (lưu ý bảo tồn CITES).",
    "benskyNotes": "Dan Bensky 3rd Ed: Độc đáo vừa tráng dương ích tinh vừa hoạt huyết tán khối kết; lưu ý nguồn nuôi trồng hợp pháp tuân thủ bảo vệ biển."
  },
  {
    "id": "yang-qi-shi",
    "vietnameseName": "Dương khởi thạch",
    "pinyinName": "Yang Qi Shi",
    "botanicalName": "Actinolitum",
    "chineseCharacters": "陽起石",
    "category": "12. Thuốc Bổ Ích (Tonifying Herbs)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Mặn"
      ],
      "channels": [
        "Thận"
      ]
    },
    "dosageGram": "3 - 9g (Nung tẩm rượu, bọc vải sắc trước)",
    "actions": [
      "Ôn thận tráng dương (tán hàn ở mệnh môn và bào cung)"
    ],
    "clinicalIndications": [
      "Liệt dương xuất tinh sớm lạnh tinh dịch",
      "Phụ nữ tử cung lạnh hiếm muộn vô sinh đau bụng dưới kéo dài"
    ],
    "contraindications": "Âm hư hỏa vượng cấm dùng; không dùng dài ngày vì là khoáng thạch silicat.",
    "benskyNotes": "Dan Bensky 3rd Ed: Khoáng chất ôn bổ mệnh môn hỏa kinh điển dùng ngắn hạn trong các bài hoàn bổ dương trị tử cung lạnh."
  },
  {
    "id": "yin-er",
    "vietnameseName": "Ngân nhĩ (Mộc nhĩ trắng / Tuyết nhĩ)",
    "pinyinName": "Yin Er (Bai Mu Er)",
    "botanicalName": "Tremella",
    "chineseCharacters": "銀耳 (白木耳)",
    "category": "12. Thuốc Bổ Ích (Tonifying Herbs)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Ngọt",
        "Nhạt"
      ],
      "channels": [
        "Phế",
        "Vị",
        "Thận"
      ]
    },
    "dosageGram": "6 - 15g (Hầm mềm ăn cả bã)",
    "actions": [
      "Tư âm nhuận phế",
      "Dưỡng vị sinh tân"
    ],
    "clinicalIndications": [
      "Ho khan ho ra máu đờm lẫn máu do Phế âm hư",
      "Khô họng táo bón sau hóa xạ trị hoặc sốt nhiệt"
    ],
    "contraindications": "Phong hàn mới ho hoặc thấp đờm nhiều không dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: \"Bình dân yến sào\" — giàu polysaccharide dưỡng Phế Vị âm không thua tổ yến, rất an toàn cho người cao tuổi."
  },
  {
    "id": "hei-dou",
    "vietnameseName": "Hắc đậu (Đậu đen xanh lòng)",
    "pinyinName": "Hei Dou",
    "botanicalName": "Semen Sojae Nigrum",
    "chineseCharacters": "黑豆",
    "category": "12. Thuốc Bổ Ích (Tonifying Herbs)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Ngọt"
      ],
      "channels": [
        "Tỳ",
        "Thận"
      ]
    },
    "dosageGram": "9 - 30g",
    "actions": [
      "Ích tinh minh mục dưỡng huyết",
      "Khu phong lợi thủy",
      "Giải bách độc dược thảo (nấu cùng Hà thủ ô, Phụ tử)"
    ],
    "clinicalIndications": [
      "Thận hư đau lưng ù tai rụng tóc bạc sớm, đạo hãn",
      "Phù thũng chân cước khí, giải độc Phụ tử Ô đầu và bào chế Hà thủ ô"
    ],
    "contraindications": "Đầy trướng bụng khó tiêu không nên ăn nguyên hạt quá nhiều.",
    "benskyNotes": "Dan Bensky 3rd Ed: Phụ liệu bào chế số 1 khử độc tính khô táo của Hà thủ ô đỏ và cân bằng độc tính thuốc nhiệt."
  },
  {
    "id": "ma-huang-gen",
    "vietnameseName": "Ma hoàng căn (Rễ cây Ma hoàng)",
    "pinyinName": "Ma Huang Gen",
    "botanicalName": "Radix et Rhizoma Ephedrae",
    "chineseCharacters": "麻黃根",
    "category": "13. Thuốc Cố Sáp (Stabilize and Bind)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Ngọt"
      ],
      "channels": [
        "Phế"
      ]
    },
    "dosageGram": "3 - 9g (Hoặc nghiền bột trộn Mẫu lệ xoa ngoài da)",
    "actions": [
      "Cố biểu chỉ hãn chuyên biệt (cầm vã mồ hôi trộm và tự hãn)"
    ],
    "clinicalIndications": [
      "Tự hãn (vã mồ hôi ban ngày do khí hư) và đạo hãn (ra mồ hôi trộm ban đêm do âm hư - Mẫu Lệ Tán)"
    ],
    "contraindications": "Ngoại cảm biểu tà còn sốt cần phát hãn CẤM dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Ví dụ kinh điển cùng một cây khác bộ phận khác công dụng: Thân Ma hoàng phát hãn giải biểu; Rễ Ma hoàng chỉ hãn cố biểu."
  },
  {
    "id": "fu-xiao-mai",
    "vietnameseName": "Phù tiểu mạch (Hạt lúa mì lép nổi trên nước)",
    "pinyinName": "Fu Xiao Mai",
    "botanicalName": "Fructus Tritici Levis",
    "chineseCharacters": "浮小麥",
    "category": "13. Thuốc Cố Sáp (Stabilize and Bind)",
    "properties": {
      "nature": "Lương",
      "flavors": [
        "Ngọt"
      ],
      "channels": [
        "Tâm"
      ]
    },
    "dosageGram": "15 - 30g",
    "actions": [
      "Cố biểu chỉ hãn (cầm tự hãn đạo hãn cực tốt)",
      "Ích khí trừ nhiệt (hư nhiệt cốt chưng)"
    ],
    "clinicalIndications": [
      "Tự hãn đạo hãn ở người suy nhược sau ốm (Mẫu Lệ Tán)",
      "Cốt chưng lao nhiệt, bứt rứt mất ngủ mồ hôi trộm tiền mãn kinh"
    ],
    "contraindications": "Ngoại cảm thực hãn không dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Phải chọn hạt lúa mì lép nhẹ nổi lên mặt nước (\"Phù\") mới có lực đi ra cơ biểu cầm mồ hôi và liễm Tâm khí."
  },
  {
    "id": "nuo-dao-gen-xu",
    "vietnameseName": "Nhu đạo căn tu (Rễ chùm lúa nếp)",
    "pinyinName": "Nuo Dao Gen Xu",
    "botanicalName": "Radix Oryzae Glutinosae",
    "chineseCharacters": "糯稻根鬚",
    "category": "13. Thuốc Cố Sáp (Stabilize and Bind)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Ngọt"
      ],
      "channels": [
        "Tâm",
        "Phế",
        "Can"
      ]
    },
    "dosageGram": "15 - 30g",
    "actions": [
      "Cố biểu chỉ hãn (đặc biệt đạo hãn)",
      "Ích vị sinh tân thoái hư nhiệt"
    ],
    "clinicalIndications": [
      "Mồ hôi trộm ban đêm ở trẻ em và người bệnh lao phổi suy nhược",
      "Khát nước miệng khô hư nhiệt nhẹ"
    ],
    "contraindications": "Ngoại cảm phong hàn sốt chưa giải không dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Thảo dược cực kỳ bình dị rẻ tiền mà hiệu nghiệm cầm mồ hôi trộm cho trẻ em suy nhược."
  },
  {
    "id": "shi-liu-pi",
    "vietnameseName": "Thạch lựu bì (Vỏ quả lựu)",
    "pinyinName": "Shi Liu Pi",
    "botanicalName": "Pericarpium Granati",
    "chineseCharacters": "石榴皮",
    "category": "13. Thuốc Cố Sáp (Stabilize and Bind)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Chua",
        "Chát"
      ],
      "channels": [
        "Đại tràng"
      ]
    },
    "dosageGram": "3 - 9g",
    "actions": [
      "Sáp tràng chỉ tả cực mạnh",
      "Chỉ huyết cố đới",
      "Khu trùng (trừ sán dây, giun đũa)"
    ],
    "clinicalIndications": [
      "Tiêu chảy lỵ mãn tính lâu ngày không cầm, sa trực tràng",
      "Đại tiện ra máu, băng huyết bạch đới, nhiễm sán dây (vỏ rễ lựu mạnh hơn về khu sán)"
    ],
    "contraindications": "Kiết lỵ mới mắc do thực nhiệt tích trệ cấm dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Hàm lượng Tanin và Pelletierine rất cao, vừa thu sáp niêm mạc ruột vừa làm liệt sán ký sinh."
  },
  {
    "id": "chi-shi-zhi",
    "vietnameseName": "Xích thạch chi (Đất sét đỏ kaolin)",
    "pinyinName": "Chi Shi Zhi",
    "botanicalName": "Halloysitum Rubrum",
    "chineseCharacters": "赤石脂",
    "category": "13. Thuốc Cố Sáp (Stabilize and Bind)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Ngọt",
        "Chua",
        "Chát"
      ],
      "channels": [
        "Đại tràng",
        "Vị"
      ]
    },
    "dosageGram": "9 - 18g (Đập vụn bọc vải sắc trước)",
    "actions": [
      "Sáp tràng chỉ tả mạnh (Đào Hoa Thang)",
      "Cố băng chỉ huyết",
      "Liễm sang sinh cơ dùng ngoài"
    ],
    "clinicalIndications": [
      "Tiêu chảy kiết lỵ mãn tính ra máu mủ do Tỳ Thận dương hư không cầm (\"Hoạt thoát\" - Đào Hoa Thang)",
      "Sa trực tràng, băng lậu bạch đới, vết loét lâu lành"
    ],
    "contraindications": "ÚY NHỤC QUẾ (Thập cửu úy); cấm dùng khi thực tích thấp nhiệt mới lỵ và phụ nữ có thai.",
    "benskyNotes": "Dan Bensky 3rd Ed: Chủ dược bài Đào Hoa Thang của Trương Trọng Cảnh; lớp khoáng silicat phủ bọc và hàn gắn ổ loét xuất huyết đại tràng."
  },
  {
    "id": "yu-yu-liang",
    "vietnameseName": "Vũ dư lương (Quặng Limonit sắt ngậm nước)",
    "pinyinName": "Yu Yu Liang",
    "botanicalName": "Limonitum",
    "chineseCharacters": "禹餘糧",
    "category": "13. Thuốc Cố Sáp (Stabilize and Bind)",
    "properties": {
      "nature": "Hơi hàn",
      "flavors": [
        "Ngọt",
        "Chát"
      ],
      "channels": [
        "Vị",
        "Đại tràng"
      ]
    },
    "dosageGram": "9 - 18g (Nung đập vụn bọc vải sắc trước)",
    "actions": [
      "Sáp tràng chỉ tả mạnh (\"Xích Thạch Chi Vũ Dư Lương Thang\")",
      "Cố băng chỉ đới chỉ huyết"
    ],
    "clinicalIndications": [
      "Tiêu chảy kiết lỵ mãn lâu năm không khỏi",
      "Băng lậu khí hư kéo dài ở phụ nữ"
    ],
    "contraindications": "Phụ nữ có thai và người thực tích thấp nhiệt không dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Luôn đi cặp đôi Xích thạch chi trong bài Xích Thạch Chi Vũ Dư Lương Thang chuyên chữa chứng tiêu chảy mãn trượt thoát hạ tiêu."
  },
  {
    "id": "ying-su-ke",
    "vietnameseName": "Anh túc xác (Vỏ quả thuốc phiện đã lấy nhựa)",
    "pinyinName": "Ying Su Ke",
    "botanicalName": "Pericarpium Papaveris",
    "chineseCharacters": "罌粟殼",
    "category": "13. Thuốc Cố Sáp (Stabilize and Bind)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Chua",
        "Chát",
        "Độc (Gây nghiện)"
      ],
      "channels": [
        "Phế",
        "Đại tràng",
        "Thận"
      ]
    },
    "dosageGram": "3 - 6g (Chế giấm hoặc mật ong; KIỂM SOÁT CHẶT THEO LUẬT DƯỢC)",
    "actions": [
      "Liễm phế chỉ khái cực mạnh",
      "Sáp tràng chỉ tả",
      "Chỉ thống giảm đau nội tạng"
    ],
    "clinicalIndications": [
      "Ho khan mãn tính kéo dài không ngủ được (chỉ dùng khi đã sạch đờm)",
      "Tiêu chảy mãn sa trực tràng nặng, đau quặn nội tạng kháng trị"
    ],
    "contraindications": "CHẤT GÂY NGHIỆN kiểm soát pháp lý nghiêm ngặt; cấm tuyệt đối dùng khi ho mới mắc nhiều đờm, trẻ em, phụ nữ mang thai hoặc dùng kéo dài.",
    "benskyNotes": "Dan Bensky 3rd Ed: Chỉ định nghiêm ngặt trong Bensky cho chứng ho khan và tiêu chảy ngoan cố giai đoạn cuối khi không còn tà khí; cấm lạm dụng."
  },
  {
    "id": "chun-pi",
    "vietnameseName": "Xuân bì (Vỏ rễ cây thanh thất)",
    "pinyinName": "Chun Pi",
    "botanicalName": "Cortex Ailanthi",
    "chineseCharacters": "椿皮",
    "category": "13. Thuốc Cố Sáp (Stabilize and Bind)",
    "properties": {
      "nature": "Hàn",
      "flavors": [
        "Đắng",
        "Chát"
      ],
      "channels": [
        "Đại tràng",
        "Vị",
        "Can"
      ]
    },
    "dosageGram": "6 - 9g",
    "actions": [
      "Thanh nhiệt táo thấp",
      "Sáp tràng chỉ tả",
      "Chỉ huyết cố đới sát trùng"
    ],
    "clinicalIndications": [
      "Khí hư bạch đới vàng đặc hôi do thấp nhiệt, băng huyết rong kinh nhiệt",
      "Kiết lỵ nhiệt mãn tính đại tiện ra máu, nhiễm trùng roi âm đạo"
    ],
    "contraindications": "Tỳ vị hư hàn nên thận trọng (nên sao cám).",
    "benskyNotes": "Dan Bensky 3rd Ed: Khác các vị cố sáp tính ấm hoặc bình khác, Xuân bì tính ĐẮNG HÀN nên trị khí hư và lỵ kéo dài kèm THẤP NHIỆT cực chuẩn."
  },
  {
    "id": "lian-xu",
    "vietnameseName": "Liên tu (Nhị hoa sen khô)",
    "pinyinName": "Lian Xu",
    "botanicalName": "Stamen Nelumbinis",
    "chineseCharacters": "蓮鬚",
    "category": "13. Thuốc Cố Sáp (Stabilize and Bind)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Ngọt",
        "Chát"
      ],
      "channels": [
        "Tâm",
        "Thận"
      ]
    },
    "dosageGram": "3 - 6g",
    "actions": [
      "Cố thận sáp tinh",
      "Thanh tâm chỉ huyết"
    ],
    "clinicalIndications": [
      "Di tinh hoạt tinh xuất tinh sớm (Kim Tỏa Cố Tinh Hoàn)",
      "Tiểu nhiều lần, khí hư, nôn ra máu nhẹ"
    ],
    "contraindications": "Tiểu bí tiểu buốt thấp nhiệt hoặc táo bón không dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Cùng Long cốt, Mẫu lệ, Khiếm thực, Sa uyển tử tạo thành công thức Kim Tỏa Cố Tinh Hoàn cố sáp thận tinh hàng đầu."
  },
  {
    "id": "lian-fang",
    "vietnameseName": "Liên phòng (Gương sen / Đài sen già)",
    "pinyinName": "Lian Fang",
    "botanicalName": "Receptaculum Nelumbinis",
    "chineseCharacters": "蓮房",
    "category": "13. Thuốc Cố Sáp (Stabilize and Bind)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Đắng",
        "Chát"
      ],
      "channels": [
        "Can"
      ]
    },
    "dosageGram": "4.5 - 9g (Sao cháy tồn tính để cầm máu)",
    "actions": [
      "Hóa ứ chỉ huyết (cầm xuất huyết tử cung rất nhạy)"
    ],
    "clinicalIndications": [
      "Băng huyết rong kinh kéo dài, đi tiểu ra máu, trĩ xuất huyết",
      "Sản hậu ứ huyết đau bụng dưới"
    ],
    "contraindications": "Phụ nữ có thai thận trọng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Sao cháy đen (Liên phòng thán) là vị thuốc cầm băng lậu huyết ứ rất phổ biến trong phụ khoa."
  },
  {
    "id": "wu-bei-zi",
    "vietnameseName": "Ngũ bội tử (Tổ sâu trên lá cây muối)",
    "pinyinName": "Wu Bei Zi",
    "botanicalName": "Galla Chinensis",
    "chineseCharacters": "五倍子",
    "category": "13. Thuốc Cố Sáp (Stabilize and Bind)",
    "properties": {
      "nature": "Hàn",
      "flavors": [
        "Chua",
        "Chát"
      ],
      "channels": [
        "Phế",
        "Đại tràng",
        "Thận"
      ]
    },
    "dosageGram": "1.5 - 6g (Hoặc tán bột rắc/bôi ngoài)",
    "actions": [
      "Liễm phế giáng hỏa",
      "Sáp tràng chỉ tả",
      "Cố tinh chỉ hãn",
      "Liễm sang chỉ huyết dùng ngoài cực mạnh"
    ],
    "clinicalIndications": [
      "Ho khan kéo dài khạc ra máu do Phế hư",
      "Tiêu chảy mạn sa trực tràng, di tinh tự hãn đạo hãn (dán bột vào rốn cầm mồ hôi ban đêm rất hay)",
      "Loét miệng vết thương chảy máu trĩ"
    ],
    "contraindications": "Thực tích thấp nhiệt mới ho nhiều đờm hoặc mới lỵ cấm dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Giàu Acid Tannic (50-70%), đứng đầu về tính thu liễm cố sáp trên cả 3 tạng Phế, Đại tràng và Thận."
  },
  {
    "id": "he-huan-hua",
    "vietnameseName": "Hợp hoan hoa (Nụ hoa hợp hoan)",
    "pinyinName": "He Huan Hua",
    "botanicalName": "Flos Albiziae",
    "chineseCharacters": "合歡花",
    "category": "14. Thuốc An Thần (Calm the Spirit)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Ngọt"
      ],
      "channels": [
        "Tâm",
        "Can"
      ]
    },
    "dosageGram": "4.5 - 9g",
    "actions": [
      "Sơ can giải uất",
      "Ninh tâm an thần êm dịu (hơn vỏ cây ở mặt giải uất nhẹ nhàng)"
    ],
    "clinicalIndications": [
      "Stress lo âu tức ngực thở dài mất ngủ mộng mị hay quên"
    ],
    "contraindications": "Hầu như không có chống chỉ định.",
    "benskyNotes": "Dan Bensky 3rd Ed: Hoa tính nhẹ nhàng bay bổng chuyên khai uất vùng Tâm Phế và giảm lo âu mất ngủ nhẹ hơn Hợp hoan bì (bì thiên hoạt huyết)."
  },
  {
    "id": "long-chi",
    "vietnameseName": "Long xỉ (Răng động vật cổ đại hóa thạch)",
    "pinyinName": "Long Chi",
    "botanicalName": "Dens Draconis",
    "chineseCharacters": "龍齒",
    "category": "14. Thuốc An Thần (Calm the Spirit)",
    "properties": {
      "nature": "Lương",
      "flavors": [
        "Chát",
        "Ngọt"
      ],
      "channels": [
        "Tâm",
        "Can"
      ]
    },
    "dosageGram": "9 - 15g (Đập vụn sắc trước)",
    "actions": [
      "Trấn kinh an thần mạnh hơn Long cốt (chuyên trị điên cuồng kinh giật ác mộng)"
    ],
    "clinicalIndications": [
      "Đánh trống ngực hồi hộp hoảng loạn mất ngủ hay gặp ác mộng điên cuồng động kinh (An Thần Định Chí Hoàn)"
    ],
    "contraindications": "Không có thực chứng kinh hoảng kéo dài tránh dùng đơn độc.",
    "benskyNotes": "Dan Bensky 3rd Ed: \"Long cốt thiện thu sáp tinh hãn, Long xỉ thiện trấn kinh định chí\" — mạnh về bình ổn thần chí hơn Long cốt."
  },
  {
    "id": "ling-zhi",
    "vietnameseName": "Linh chi (Nấm linh chi đỏ)",
    "pinyinName": "Ling Zhi",
    "botanicalName": "Ganoderma",
    "chineseCharacters": "靈芝",
    "category": "14. Thuốc An Thần (Calm the Spirit)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Ngọt"
      ],
      "channels": [
        "Tâm",
        "Phế",
        "Can",
        "Thận"
      ]
    },
    "dosageGram": "6 - 12g (Sắc kỹ hoặc dùng bột bào tử 1.5 - 3g)",
    "actions": [
      "Bổ khí an thần",
      "Chỉ khái bình suyễn",
      "Phù chính cố bản tăng miễn dịch"
    ],
    "clinicalIndications": [
      "Mất ngủ hồi hộp suy nhược thần kinh chóng mặt hay quên",
      "Ho suyễn đờm nhiều thở ngắn hơi do Phế Thận khí hư",
      "Suy giảm miễn dịch hậu bệnh nặng"
    ],
    "contraindications": "Không dùng lúc ngoại cảm thực tà đang sốt cao cấp tính.",
    "benskyNotes": "Dan Bensky 3rd Ed: \"Tiên thảo\" trong Thần Nông Bản Thảo Kinh; triterpenoid và beta-glucan vừa an thần vừa điều hòa miễn dịch rất an toàn."
  },
  {
    "id": "zhen-zhu",
    "vietnameseName": "Trân châu (Ngọc trai nghiền thủy phi)",
    "pinyinName": "Zhen Zhu",
    "botanicalName": "Margarita",
    "chineseCharacters": "珍珠",
    "category": "14. Thuốc An Thần (Calm the Spirit)",
    "properties": {
      "nature": "Hàn",
      "flavors": [
        "Ngọt",
        "Mặn"
      ],
      "channels": [
        "Tâm",
        "Can"
      ]
    },
    "dosageGram": "0.1 - 0.3g (Thủy phi cực mịn cho vào viên hoàn hoặc uống trực tiếp, không sắc)",
    "actions": [
      "An thần định kinh",
      "Thanh can trừ ế minh mục",
      "Giải độc sinh cơ dùng ngoài"
    ],
    "clinicalIndications": [
      "Trẻ em kinh phong co giật, hồi hộp mất ngủ động kinh (Trân Châu Mẫu Hoàn)",
      "Mờ mắt có màng mộng, nhiệt miệng vết loét lâu lành"
    ],
    "contraindications": "Cấm dùng cho người không có thực nhiệt đờm hỏa hoặc phụ nữ có thai thận trọng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Ngọc trai tán siêu mịn (Thủy phi) làm dịu hưng phấn vỏ não tức thì và thúc đẩy tái tạo biểu mô niêm mạc."
  },
  {
    "id": "zi-shi-ying",
    "vietnameseName": "Tử thạch anh (Khoáng đá Fluorit tím)",
    "pinyinName": "Zi Shi Ying",
    "botanicalName": "Fluoritum",
    "chineseCharacters": "紫石英",
    "category": "14. Thuốc An Thần (Calm the Spirit)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Ngọt"
      ],
      "channels": [
        "Tâm",
        "Can",
        "Phế"
      ]
    },
    "dosageGram": "9 - 15g (Đập vụn sắc trước)",
    "actions": [
      "Trấn tâm an thần",
      "Ôn phế bình suyễn",
      "Ôn ấm bào cung chữa vô sinh"
    ],
    "clinicalIndications": [
      "Hồi hộp đánh trống ngực hoảng sợ mất ngủ (Tử Thạch Anh Thang)",
      "Tử cung lạnh hiếm muộn vô sinh lãnh cảm",
      "Ho suyễn do Phế Thận hư hàn"
    ],
    "contraindications": "Âm hư hỏa vượng cấm dùng; không dùng quá liều dài ngày (chứa Fluor).",
    "benskyNotes": "Dan Bensky 3rd Ed: Khoáng chất trọng trấn an thần duy nhất mang tính ÔN nên cực hay để làm ấm tử cung chữa vô sinh kèm lo âu."
  },
  {
    "id": "su-he-xiang",
    "vietnameseName": "Tô hợp hương (Nhựa cây tô hợp)",
    "pinyinName": "Su He Xiang",
    "botanicalName": "Styrax",
    "chineseCharacters": "蘇合香",
    "category": "15. Thuốc Phương Hương Khai Khiếu (Open Orifices)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Cay"
      ],
      "channels": [
        "Tâm",
        "Tỳ"
      ]
    },
    "dosageGram": "0.3 - 1g (Cho vào hoàn tán, KHÔNG sắc)",
    "actions": [
      "Phương hương khai khiếu tỉnh thần (chuyên dùng cho Hàn bế)",
      "Hành khí chỉ thống giải uất vùng ngực tim"
    ],
    "clinicalIndications": [
      "Đột quỵ ngất xỉu trúng phong HÀN BẾ (mặt nhợt chân tay lạnh mạch trầm tế - Tô Hợp Hương Hoàn)",
      "Đau thắt ngực tim mạch vành đau đột ngột do hàn ngưng khí trệ"
    ],
    "contraindications": "Cấm dùng cho chứng Nhiệt bế (mặt đỏ sốt cao), Thoát chứng (tay xòe tiểu dầm ra mồ hôi lạnh) và phụ nữ có thai.",
    "benskyNotes": "Dan Bensky 3rd Ed: Trụ cột số 1 cho Hàn bế đối lập với Ngưu hoàng / Băng phiến trị Nhiệt bế (Tô Hợp Hương Hoàn vs An Cung Ngưu Hoàng Hoàn)."
  },
  {
    "id": "an-xi-xiang",
    "vietnameseName": "An tức hương (Nhựa cánh kiến trắng)",
    "pinyinName": "An Xi Xiang",
    "botanicalName": "Benzoinum",
    "chineseCharacters": "安息香",
    "category": "15. Thuốc Phương Hương Khai Khiếu (Open Orifices)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Cay",
        "Đắng"
      ],
      "channels": [
        "Tâm",
        "Tỳ"
      ]
    },
    "dosageGram": "0.6 - 1.5g (Vào hoàn tán, không sắc)",
    "actions": [
      "Khai khiếu tỉnh thần",
      "Hành khí hoạt huyết chỉ thống"
    ],
    "clinicalIndications": [
      "Ngất xỉu co giật trẻ em kinh phong trúng khí trệ",
      "Đau thắt ngực mạch vành, đau bụng sản hậu huyết vựng"
    ],
    "contraindications": "Âm hư hỏa vượng hoặc khí hư thoát chứng cấm dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Tính bình nên kết hợp được cùng cả Tô hợp hương và Băng phiến trong các viên hoàn cấp cứu đau thắt ngực."
  },
  {
    "id": "zhen-zhu-mu",
    "vietnameseName": "Trân châu mẫu (Vỏ trai ngọc)",
    "pinyinName": "Zhen Zhu Mu",
    "botanicalName": "Concha Margaritifera Usta",
    "chineseCharacters": "珍珠母",
    "category": "16. Thuốc Bình Can Tức Phong (Extinguish Wind)",
    "properties": {
      "nature": "Hàn",
      "flavors": [
        "Mặn"
      ],
      "channels": [
        "Can",
        "Tâm"
      ]
    },
    "dosageGram": "10 - 25g (Đập vụn sắc trước)",
    "actions": [
      "Bình can tiềm dương",
      "Trấn tâm an thần định kinh",
      "Thanh can minh mục"
    ],
    "clinicalIndications": [
      "Chóng mặt ù tai đau đầu tăng huyết áp hồi hộp mất ngủ khó ngủ (Can dương kèm Tâm thần bất an)",
      "Mờ mắt quáng gà sợ ánh sáng"
    ],
    "contraindications": "Tỳ vị hư hàn tránh dùng dạng sống.",
    "benskyNotes": "Dan Bensky 3rd Ed: Tác dụng tương tự Thạch quyết minh nhưng kiêm thêm lực Trọng Trấn An Thần giúp ngủ sâu hơn."
  },
  {
    "id": "ling-yang-jiao",
    "vietnameseName": "Linh dương giác (Sừng linh dương — Bảo tồn CITES / Thay bằng Thủy ngưu giác & Câu đằng)",
    "pinyinName": "Ling Yang Jiao",
    "botanicalName": "Cornu Saigae Tataricae",
    "chineseCharacters": "羚羊角",
    "category": "16. Thuốc Bình Can Tức Phong (Extinguish Wind)",
    "properties": {
      "nature": "Hàn",
      "flavors": [
        "Mặn"
      ],
      "channels": [
        "Can",
        "Tâm"
      ]
    },
    "dosageGram": "1 - 3g (Bào mỏng sắc riêng) — KHUYẾN CÁO DÙNG THAY THẾ BẰNG Câu đằng + Thủy ngưu giác",
    "actions": [
      "Bình can tức phong cực mạnh",
      "Thanh can minh mục",
      "Tán huyết giải độc thanh nhiệt định kinh"
    ],
    "clinicalIndications": [
      "Sốt cao co giật kinh phong trẻ em, sản giật cao huyết áp kịch phát (Linh Giác Câu Đằng Thang)",
      "Sốt cao mê sảng phát cuồng"
    ],
    "contraindications": "Loài Saiga tatarica thuộc danh mục bảo vệ CITES Phụ lục II — Bensky khuyến cáo thay thế bằng Sơn dương giác (Cornu Naemorhedi) hoặc phối Câu đằng + Thiên ma + Thủy ngưu giác.",
    "benskyNotes": "Dan Bensky 3rd Ed: Có thể thay thế hoàn toàn bằng Sơn dương giác liều 10-15g hoặc tăng liều Câu đằng + Thủy ngưu giác để bảo vệ động vật hoang dã."
  },
  {
    "id": "luo-bu-ma-ye",
    "vietnameseName": "La bố ma diệp",
    "pinyinName": "Luo Bu Ma Ye",
    "botanicalName": "Folium Apocyni Veneti",
    "chineseCharacters": "羅布麻葉",
    "category": "16. Thuốc Bình Can Tức Phong (Extinguish Wind)",
    "properties": {
      "nature": "Lương",
      "flavors": [
        "Ngọt",
        "Đắng"
      ],
      "channels": [
        "Can"
      ]
    },
    "dosageGram": "6 - 12g",
    "actions": [
      "Bình can an thần hạ huyết áp",
      "Thanh nhiệt lợi thủy"
    ],
    "clinicalIndications": [
      "Tăng huyết áp đau đầu chóng mặt bứt rứt mất ngủ do Can dương vượng hoặc Can hỏa",
      "Phù thũng tiểu ít suy tim nhẹ"
    ],
    "contraindications": "Tỳ vị hư hàn hoặc huyết áp thấp không dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Uống hãm trà hàng ngày giúp hạ huyết áp êm ái và cải thiện giấc ngủ rất được ưa chuộng ở lâm sàng hiện đại."
  },
  {
    "id": "zi-bei-chi",
    "vietnameseName": "Tử bối xỉ (Vỏ ốc sứ tím)",
    "pinyinName": "Zi Bei Chi",
    "botanicalName": "Concha Mauritiae",
    "chineseCharacters": "紫貝齒",
    "category": "16. Thuốc Bình Can Tức Phong (Extinguish Wind)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Mặn"
      ],
      "channels": [
        "Can"
      ]
    },
    "dosageGram": "9 - 15g (Đập vụn sắc trước)",
    "actions": [
      "Trấn kinh an thần",
      "Thanh can minh mục"
    ],
    "clinicalIndications": [
      "Trẻ em kinh giật sợ hãi khóc đêm mất ngủ hoảng loạn",
      "Mắt đỏ sưng mộng mắt mờ mắt"
    ],
    "contraindications": "Tỳ vị hư hàn cẩn trọng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Dùng nhiều trong nhi khoa trấn kinh hồi hộp mất ngủ hoặc thay thế một phần Tê giác / Linh dương giác."
  },
  {
    "id": "sheng-tie-luo",
    "vietnameseName": "Sinh thiết lạc (Mạt sắt nung sạch tạp chất)",
    "pinyinName": "Sheng Tie Luo",
    "botanicalName": "Frusta Ferri",
    "chineseCharacters": "生鐵落",
    "category": "16. Thuốc Bình Can Tức Phong (Extinguish Wind)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Cay"
      ],
      "channels": [
        "Tâm",
        "Can"
      ]
    },
    "dosageGram": "30 - 60g (Rửa sạch nung đỏ bọc túi vải sắc trước)",
    "actions": [
      "Trấn tâm bình can cực mạnh (hạ nghịch đờm hỏa vùng tâm thần)"
    ],
    "clinicalIndications": [
      "Rối loạn tâm thần cấp điên cuồng đập phá la hét mất ngủ nặng do đờm hỏa mê tâm (Sinh Thiết Lạc Ẩm)"
    ],
    "contraindications": "Không dùng dạng uống khi Tỳ Vị hư hàn không có đờm hỏa thực chứng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Tác phẩm Kinh Nghiệm Biện Phương ghi Sinh Thiết Lạc Ẩm là bài thuốc trấn tâm điên cuồng kinh điển."
  },
  {
    "id": "ku-lian-pi",
    "vietnameseName": "Khổ luyện bì (Vỏ rễ cây xoan)",
    "pinyinName": "Ku Lian Pi",
    "botanicalName": "Cortex Meliae",
    "chineseCharacters": "苦楝皮",
    "category": "17. Thuốc Khu Trùng (Expel Parasites)",
    "properties": {
      "nature": "Hàn",
      "flavors": [
        "Đắng",
        "Độc"
      ],
      "channels": [
        "Can",
        "Tỳ",
        "Vị"
      ]
    },
    "dosageGram": "3 - 6g (Dạng khô sắc kỹ)",
    "actions": [
      "Sát trùng (giun đũa, giun móc, giun tóc)",
      "Thanh thấp nhiệt trị ghẻ nấm ngoài da"
    ],
    "clinicalIndications": [
      "Nhiễm giun đũa giun kim đau bụng giun chui ống mật",
      "Nấm da đầu ghẻ ngứa eczema (nấu nước đặc gội bôi)"
    ],
    "contraindications": "Có độc trên gan và thần kinh (Toosendanin); CẤM phụ nữ có thai, trẻ suy dinh dưỡng nặng, bệnh nhân gan thận yếu hoặc thiếu máu nặng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Khô và bỏ hết lớp vỏ thô ngoài để giảm độc tố; luôn dùng đúng liều ngắn ngày và phối thuốc tả nhẹ tống xác giun."
  },
  {
    "id": "he-shi",
    "vietnameseName": "Hạc sắt (Quả thiên danh tinh)",
    "pinyinName": "He Shi",
    "botanicalName": "Fructus Carpesii",
    "chineseCharacters": "鶴蝨",
    "category": "17. Thuốc Khu Trùng (Expel Parasites)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Đắng",
        "Cay",
        "Hơi độc"
      ],
      "channels": [
        "Tỳ",
        "Vị"
      ]
    },
    "dosageGram": "3 - 9g",
    "actions": [
      "Sát trùng tiêu tích (giun đũa, giun kim, sán dây)"
    ],
    "clinicalIndications": [
      "Đau bụng giun đũa giun kim hoặc trẻ em cam tích giun"
    ],
    "contraindications": "Phụ nữ có thai thận trọng; người tỳ hư không có ký sinh trùng không dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Thường phối hợp với Sử quân tử, Binh lang, Khổ luyện bì tăng hiệu lực tẩy giun."
  },
  {
    "id": "lei-wan",
    "vietnameseName": "Lôi hoàn (Thể hạch nấm ký sinh tre)",
    "pinyinName": "Lei Wan",
    "botanicalName": "Omphalia",
    "chineseCharacters": "雷丸",
    "category": "17. Thuốc Khu Trùng (Expel Parasites)",
    "properties": {
      "nature": "Hơi hàn",
      "flavors": [
        "Đắng"
      ],
      "channels": [
        "Vị",
        "Đại tràng"
      ]
    },
    "dosageGram": "6 - 15g (BẮT BUỘC tán bột uống với nước nguội dưới 60°C — KHÔNG SẮC NÓNG vì enzyme tiêu đạm bị phá hủy)",
    "actions": [
      "Sát trùng tiêu tích cực mạnh (diệt sán dây, giun đũa, giun móc)"
    ],
    "clinicalIndications": [
      "Nhiễm sán dây (Thủy cừu trùng), giun móc, giun đũa đau bụng kéo dài"
    ],
    "contraindications": "Không được sắc ở nhiệt độ cao (mất hoạt lực hoàn toàn); tỳ vị hư hàn tránh dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Hoạt chất Omphalin là một enzyme protease phân giải lớp vỏ kitin của sán dây nên tuyệt đối không được đun nấu!"
  },
  {
    "id": "fei-zi",
    "vietnameseName": "Phỉ tử (Hạt cây phỉ bắc)",
    "pinyinName": "Fei Zi",
    "botanicalName": "Semen Torreyae",
    "chineseCharacters": "榧子",
    "category": "17. Thuốc Khu Trùng (Expel Parasites)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Ngọt"
      ],
      "channels": [
        "Phế",
        "Vị",
        "Đại tràng"
      ]
    },
    "dosageGram": "9 - 15g (hoặc ăn hạt rang 15 - 30g)",
    "actions": [
      "Sát trùng tiêu tích (không làm tổn thương Tỳ Vị)",
      "Nhuận phế chỉ khái nhuận tràng"
    ],
    "clinicalIndications": [
      "Nhiễm sán dây, giun móc, giun đũa, sán lá gừng ở trẻ em thể yếu",
      "Ho khan táo bón nhẹ"
    ],
    "contraindications": "Đại tiện lỏng do tỳ vị hư hàn không nên ăn nhiều.",
    "benskyNotes": "Dan Bensky 3rd Ed: Rất an toàn và vị ngọt thơm dễ chịu, phù hợp tẩy ký sinh trùng cho bệnh nhân gầy yếu."
  },
  {
    "id": "guan-zhong",
    "vietnameseName": "Quán chúng (Thân rễ ráng / Cốt khí thái)",
    "pinyinName": "Guan Zhong",
    "botanicalName": "Rhizoma Dryopteris Crassirhizomatis",
    "chineseCharacters": "貫眾",
    "category": "17. Thuốc Khu Trùng (Expel Parasites)",
    "properties": {
      "nature": "Hơi hàn",
      "flavors": [
        "Đắng",
        "Hơi độc"
      ],
      "channels": [
        "Can",
        "Tỳ"
      ]
    },
    "dosageGram": "4.5 - 9g",
    "actions": [
      "Khu trùng (sán dây, giun đũa, giun móc)",
      "Thanh nhiệt giải độc phòng ôn dịch (cúm, sởi, quai bị)",
      "Chỉ huyết (sao thán trị băng lậu xuất huyết)"
    ],
    "clinicalIndications": [
      "Nhiễm ký sinh trùng đường ruột sán dây",
      "Phòng chống cúm dịch sốt phát ban quai bị sưng họng",
      "Rong kinh băng huyết đi ngoài ra máu (dùng Quán chúng thán)"
    ],
    "contraindications": "Cấm dùng cho phụ nữ có thai và người Tỳ Vị hư hàn; không uống chung dầu thầu dầu khi tẩy giun.",
    "benskyNotes": "Dan Bensky 3rd Ed: Hai mặt công dụng nổi bật: dùng sống sát trùng & kháng virus ôn dịch, sao cháy đen lại chỉ huyết phụ khoa rất hay."
  },
  {
    "id": "wu-yi",
    "vietnameseName": "Vu di (Quả du lên men)",
    "pinyinName": "Wu Yi",
    "botanicalName": "Fructus Ulmi Macrocarpae Praeparatus",
    "chineseCharacters": "蕪荑",
    "category": "17. Thuốc Khu Trùng (Expel Parasites)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Cay",
        "Đắng"
      ],
      "channels": [
        "Tỳ",
        "Vị"
      ]
    },
    "dosageGram": "3 - 9g",
    "actions": [
      "Sát trùng tiêu cam tích trẻ em"
    ],
    "clinicalIndications": [
      "Trẻ em bụng to gầy còm cam tích nhiễm giun sán, ghẻ ngứa ngoài da"
    ],
    "contraindications": "Tỳ vị hư yếu không có thực tích ký sinh trùng không dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Chế bằng cách lên men bột quả cây Du, mùi hăng nhưng rất nhạy với chứng cam tích bụng chướng ở trẻ nhỏ."
  },
  {
    "id": "da-suan",
    "vietnameseName": "Đại toán (Củ tỏi ta)",
    "pinyinName": "Da Suan",
    "botanicalName": "Bulbus Allii Sativi",
    "chineseCharacters": "大蒜",
    "category": "17. Thuốc Khu Trùng (Expel Parasites)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Cay"
      ],
      "channels": [
        "Tỳ",
        "Vị",
        "Phế"
      ]
    },
    "dosageGram": "6 - 12g (Hoặc 2 - 5 tép tươi; dùng ngoài giã đắp)",
    "actions": [
      "Giải độc tiêu thũng",
      "Sát trùng chỉ lỵ (lỵ amip, trực khuẩn, giun móc)",
      "Ôn tỳ noãn vị phòng cúm"
    ],
    "clinicalIndications": [
      "Kiết lỵ amip tiêu chảy nhiễm khuẩn đường ruột, giun kim giun móc",
      "Ho gà, nấm âm đạo Trichomonas (thụt rửa ngoài)",
      "Mụn nhọt sưng tấy rắn rết cắn"
    ],
    "contraindications": "Âm hư hỏa vượng, đau mắt đỏ, lở miệng lưỡi, loét dạ dày cấp tránh dùng sống.",
    "benskyNotes": "Dan Bensky 3rd Ed: Allicin trong tỏi đập dập tiêu diệt mạnh amip, vi khuẩn lao và nấm Candida; chú ý không đắp trực tiếp lên da mỏng quá lâu gây phỏng."
  },
  {
    "id": "xiong-huang",
    "vietnameseName": "Hùng hoàng (Khoáng thạch Asen sunfua)",
    "pinyinName": "Xiong Huang",
    "botanicalName": "Realgar",
    "chineseCharacters": "雄黃",
    "category": "18. Thuốc Dùng Ngoài / Ngoại Khoa (Topical)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Đắng",
        "Độc"
      ],
      "channels": [
        "Can",
        "Vị",
        "Đại tràng"
      ]
    },
    "dosageGram": "ƯU TIÊN DÙNG NGOÀI (0.05 - 0.1g thủy phi nếu dùng trong ngắn hạn theo chuyên khoa nghiêm ngặt; TUYỆT ĐỐI KHÔNG ĐUN NÓNG / ĐỐT)",
    "actions": [
      "Giải độc sát trùng trừ tà",
      "Táo thấp khu đờm cắt cơn sốt rét (khi chế luyện đúng chuẩn)"
    ],
    "clinicalIndications": [
      "Mụn nhọt ung thư rắn độc cắn rết cắn ghẻ lở nấm da chàm chảy nước (bôi ngoài)",
      "Thủy phi dùng trong rất thận trọng ở các bài hoàn kinh điển như An Cung Ngưu Hoàng Hoàn"
    ],
    "contraindications": "CHẤT ĐỘC ASEN SUNFUA: CẤM tuyệt đối đun lửa hoặc sắc nóng (tạo As2O3 thạch tín cực độc!); cấm phụ nữ có thai và bệnh gan thận.",
    "benskyNotes": "Dan Bensky 3rd Ed: Cảnh báo sinh tử: \"Kiến hỏa như độc\" — tuyệt đối không được nung hay sắc nóng Hùng hoàng vì sẽ biến thành Thạch tín (As2O3)."
  },
  {
    "id": "lu-gan-shi",
    "vietnameseName": "Lô cam thạch (Khoáng Kẽm cacbonat tự nhiên)",
    "pinyinName": "Lu Gan Shi",
    "botanicalName": "Calamina",
    "chineseCharacters": "爐甘石",
    "category": "18. Thuốc Dùng Ngoài / Ngoại Khoa (Topical)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Ngọt"
      ],
      "channels": [
        "Vị"
      ]
    },
    "dosageGram": "CHỈ DÙNG NGOÀI (Nung đỏ tôi nước Hoàng liên rồi thủy phi tán siêu mịn)",
    "actions": [
      "Giải độc minh mục thoái ế",
      "Thu thấp chỉ ngứa liễm sang sinh cơ"
    ],
    "clinicalIndications": [
      "Đau mắt đỏ loét bờ mi có màng mộng chảy nước mắt (bôi/nhỏ mắt dạng hỗn dịch tinh chế)",
      "Chàm eczema chảy nước vàng, lở loét da thịt lâu không lên da non"
    ],
    "contraindications": "Chỉ dùng ngoài da và niêm mạc mắt, không uống trong.",
    "benskyNotes": "Dan Bensky 3rd Ed: Sau khi nung tôi nước Hoàng liên, kẽm oxit tinh khiết làm dịu ngứa và khô vết loét chảy nước ngoài da an toàn tuyệt đối."
  },
  {
    "id": "tu-jing-pi",
    "vietnameseName": "Thổ kinh bì (Vỏ rễ thông rụng lá)",
    "pinyinName": "Tu Jing Pi",
    "botanicalName": "Cortex Pseudolaricis",
    "chineseCharacters": "土荊皮",
    "category": "18. Thuốc Dùng Ngoài / Ngoại Khoa (Topical)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Cay",
        "Độc"
      ],
      "channels": [
        "Phế",
        "Tỳ"
      ]
    },
    "dosageGram": "CHỈ DÙNG NGOÀI (Ngâm rượu/giấm bôi chỗ nấm)",
    "actions": [
      "Sát trùng chống nấm chỉ ngứa cực mạnh"
    ],
    "clinicalIndications": [
      "Nấm chân nước ăn chân, hắc lào lang ben nấm móng nấm đầu eczema mãn (ngâm cồn/giấm bôi)"
    ],
    "contraindications": "CHỈ DÙNG NGOÀI DA, không uống trong; tránh bôi lên vùng da đang lở loét chảy máu hở.",
    "benskyNotes": "Dan Bensky 3rd Ed: Pseudolaric acid trong vỏ cây ức chế mạnh các chủng nấm da Trichophyton ngoan cố hơn nhiều thuốc bôi thông thường."
  },
  {
    "id": "zhang-nao",
    "vietnameseName": "Chương não (Long não tự nhiên)",
    "pinyinName": "Zhang Nao",
    "botanicalName": "Camphora",
    "chineseCharacters": "樟腦",
    "category": "18. Thuốc Dùng Ngoài / Ngoại Khoa (Topical)",
    "properties": {
      "nature": "Nhiệt",
      "flavors": [
        "Cay",
        "Độc nhẹ"
      ],
      "channels": [
        "Tâm",
        "Tỳ"
      ]
    },
    "dosageGram": "Chủ yếu DÙNG NGOÀI (0.1 - 0.2g nếu phối hoàn cấp cứu)",
    "actions": [
      "Trừ thấp sát trùng chỉ ngứa",
      "Ôn tán tiêu thũng chỉ thống",
      "Khai khiếu tỉnh thần"
    ],
    "clinicalIndications": [
      "Ghẻ lở hắc lào chàm ngứa, cước lạnh tay chân mùa đông",
      "Chấn thương bầm tím đau nhức khớp sâu răng (pha cồn xoa bóp)"
    ],
    "contraindications": "Cấm dùng cho phụ nữ có thai, trẻ sơ sinh (nguy cơ co giật / thiếu men G6PD); tránh bôi vết thương hở diện rộng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Long não tính NHIỆT (đối lập Băng phiến tính HƠI HÀN); xoa bóp giãn mạch giảm đau chấn thương hàn thấp rất nhạy."
  },
  {
    "id": "chan-su",
    "vietnameseName": "Thiềm tô (Nhựa tuyến mang tai cóc khô)",
    "pinyinName": "Chan Su",
    "botanicalName": "Venenum Bufonis",
    "chineseCharacters": "蟾酥",
    "category": "18. Thuốc Dùng Ngoài / Ngoại Khoa (Topical)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Ngọt",
        "Cay",
        "Độc"
      ],
      "channels": [
        "Tâm"
      ]
    },
    "dosageGram": "0.015 - 0.03g (Cực nhỏ trong viên hoàn Lục Thần Hoàn hoặc dùng ngoài)",
    "actions": [
      "Giải độc tiêu thũng chỉ thống cực mạnh",
      "Khai khiếu tỉnh thần",
      "Cường tim nâng huyết áp (tính Digitalis)"
    ],
    "clinicalIndications": [
      "Viêm họng sưng amygdal cấp có mủ, đinh râu nhọt độc (Lục Thần Hoàn)",
      "Đau răng sâu, trụy tim mạch (theo chế phẩm chuẩn hóa)"
    ],
    "contraindications": "ĐỘC MẠNH TRÊN TIM (Bufadienolides tương tự Digitalis); CẤM phụ nữ có thai, người đang dùng Digoxin; tránh dây vào mắt gây mù tạm thời.",
    "benskyNotes": "Dan Bensky 3rd Ed: Thành phần linh hồn của Lục Thần Hoàn trị viêm họng mủ và đinh nhọt sưng đau dữ dội nhưng đòi hỏi liều miligam chính xác."
  },
  {
    "id": "mu-bie-zi",
    "vietnameseName": "Mộc miết tử (Hạt gấc)",
    "pinyinName": "Mu Bie Zi",
    "botanicalName": "Semen Momordicae",
    "chineseCharacters": "木鼈子",
    "category": "18. Thuốc Dùng Ngoài / Ngoại Khoa (Topical)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Đắng",
        "Hơi ngọt",
        "Độc"
      ],
      "channels": [
        "Can",
        "Tỳ",
        "Vị"
      ]
    },
    "dosageGram": "CHỦ YẾU DÙNG NGOÀI (Mài giấm hoặc rượu bôi chỗ sưng; uống trong 0.9 - 1.2g cực kỳ thận trọng)",
    "actions": [
      "Tán kết tiêu thũng cực mạnh",
      "Công độc trị sưng tấy trĩ eczema"
    ],
    "clinicalIndications": [
      "Quai bị sưng má, áp xe vú giai đoạn chưa mưng mủ, đinh nhọt tràng nhạc hạch cổ (mài giấm đắp ngoài)",
      "Trĩ lở loét chai chân"
    ],
    "contraindications": "Có độc (Momordin); phụ nữ có thai và người thể hư cấm dùng.",
    "benskyNotes": "Dan Bensky 3rd Ed: Kinh nghiệm dân gian lẫn Dược điển Bensky đánh giá cao hạt gấc mài giấm đắp tan quai bị và sưng tấy áp xe."
  },
  {
    "id": "feng-fang",
    "vietnameseName": "Phong phòng (Tổ ong vò vẽ)",
    "pinyinName": "Feng Fang",
    "botanicalName": "Nidus Vespae",
    "chineseCharacters": "蜂房 (露蜂房)",
    "category": "18. Thuốc Dùng Ngoài / Ngoại Khoa (Topical)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Ngọt",
        "Hơi độc"
      ],
      "channels": [
        "Vị"
      ]
    },
    "dosageGram": "3 - 5g (Sắc uống) hoặc 10 - 30g nấu nước súc miệng/rửa ngoài",
    "actions": [
      "Công độc sát trùng tiêu thũng",
      "Khu phong chỉ thống (đau răng phong thấp)"
    ],
    "clinicalIndications": [
      "Sâu răng sưng nướu đau răng do phong nhiệt độc (nấu nước súc miệng)",
      "Nhọt độc trĩ rò hậu môn nấm da ngứa, đau khớp phong thấp"
    ],
    "contraindications": "Không dùng uống khi khí huyết hư không có độc tích; thận trọng ở bệnh nhân dị ứng nọc ong.",
    "benskyNotes": "Dan Bensky 3rd Ed: Rất hiệu quả trong nha khoa sưng nướu và làm sạch ổ nhiễm trùng mạn nhờ các hợp chất kháng khuẩn từ sáp keo ong."
  },
  {
    "id": "er-cha",
    "vietnameseName": "Nhi trà (Cao keo cây cau / Keo catechu)",
    "pinyinName": "Er Cha",
    "botanicalName": "Catechu",
    "chineseCharacters": "兒茶",
    "category": "18. Thuốc Dùng Ngoài / Ngoại Khoa (Topical)",
    "properties": {
      "nature": "Hơi hàn",
      "flavors": [
        "Đắng",
        "Chát"
      ],
      "channels": [
        "Phế"
      ]
    },
    "dosageGram": "1 - 3g (Gói vải hoặc dùng ngoài rắc vết loét)",
    "actions": [
      "Thu thấp liễm sang sinh cơ (dùng ngoài rất nhanh khô vết loét)",
      "Thanh phế hóa đờm chỉ huyết sinh tân"
    ],
    "clinicalIndications": [
      "Loét miệng nhiệt miệng, eczema chảy nước, vết thương hở chảy máu lâu liền (dùng ngoài)",
      "Ho đờm nhiệt nôn máu chảy máu tiêu chảy"
    ],
    "contraindications": "Hàn thấp không dùng đường uống.",
    "benskyNotes": "Dan Bensky 3rd Ed: Rất giàu Catechin và Acid Tannic tạo màng bảo vệ vết loét niêm mạc miệng và da chảy nước tức thì."
  },
  {
    "id": "da-feng-zi",
    "vietnameseName": "Đại phong tử (Hạt chùm bao lớn)",
    "pinyinName": "Da Feng Zi",
    "botanicalName": "Semen Hydnocarpi",
    "chineseCharacters": "大風子",
    "category": "18. Thuốc Dùng Ngoài / Ngoại Khoa (Topical)",
    "properties": {
      "nature": "Nhiệt",
      "flavors": [
        "Cay",
        "Độc"
      ],
      "channels": [
        "Can",
        "Tỳ",
        "Thận"
      ]
    },
    "dosageGram": "CHỈ DÙNG NGOÀI (Giã hoặc ép dầu bôi)",
    "actions": [
      "Khu phong táo thấp",
      "Sát trùng công độc (trị bệnh phong cùi & nấm ghẻ ngoan cố)"
    ],
    "clinicalIndications": [
      "Bệnh phong cùi (Lệ phong), ghẻ lở nấm da vảy nến trứng cá đỏ lâu năm"
    ],
    "contraindications": "KHÔNG UỐNG TRONG (gây độc gan thận, tán huyết, nôn mửa nặng).",
    "benskyNotes": "Dan Bensky 3rd Ed: Chứa Chaulmoogric acid là thuốc đặc trị cổ truyền cho trực khuẩn Hansen (bệnh phong) trước khi có kháng sinh."
  },
  {
    "id": "qing-fen",
    "vietnameseName": "Khinh phấn (Thủy ngân I Clorua - Calomelas)",
    "pinyinName": "Qing Fen",
    "botanicalName": "Calomelas",
    "chineseCharacters": "輕粉",
    "category": "18. Thuốc Dùng Ngoài / Ngoại Khoa (Topical)",
    "properties": {
      "nature": "Hàn",
      "flavors": [
        "Cay",
        "Đại độc"
      ],
      "channels": [
        "Đại tràng",
        "Tiểu tràng"
      ]
    },
    "dosageGram": "CHỈ DÙNG NGOÀI CỰC ÍT (Tuyệt đối tránh bôi diện rộng hoặc vết thương hở)",
    "actions": [
      "Công độc sát trùng liễm sang (làm khô vết loét giang mai ghẻ)"
    ],
    "clinicalIndications": [
      "Vết loét giang mai, ghẻ lở nấm da đầu eczema mãn (thuốc mỡ ngoài da liều cực thấp)"
    ],
    "contraindications": "ĐỘC THỦY NGÂN (Hg2Cl2): CẤM uống trong trong Y học hiện đại; phụ nữ có thai và bệnh nhân thận tuyệt đối tránh xa.",
    "benskyNotes": "Dan Bensky 3rd Ed: Xếp vào nhóm khoáng chất độc dùng ngoài cực kỳ hạn chế và khuyến cáo thay thế bằng thuốc kháng sinh/kháng nấm an toàn."
  },
  {
    "id": "gua-di",
    "vietnameseName": "Qua đế (Cuống quả dưa bở / dưa lê) [Thổ Dược - Emetics]",
    "pinyinName": "Gua Di",
    "botanicalName": "Pedicellus Melo",
    "chineseCharacters": "瓜蒂",
    "category": "18. Thuốc Dùng Ngoài / Ngoại Khoa (Topical)",
    "properties": {
      "nature": "Hàn",
      "flavors": [
        "Đắng",
        "Độc"
      ],
      "channels": [
        "Vị"
      ]
    },
    "dosageGram": "2.5 - 5g (Thuốc gây nôn cấp cứu; hoặc tán bột thổi mũi trị vàng da thấp nhiệt)",
    "actions": [
      "Dũng thổ đờm thực (gây nôn tống đờm dãi thức ăn tích tụ thượng tiêu - Qua Đế Tán)",
      "Thối hoàng lợi thấp"
    ],
    "clinicalIndications": [
      "Thức ăn ứ trệ vùng dạ dày hoặc đờm dãi bít tắc vùng ngực gây điên cuồng động kinh khó thở thực chứng (Qua Đế Tán)",
      "Vàng da thấp nhiệt (hít bột cực nhỏ vào mũi làm chảy nước vàng)"
    ],
    "contraindications": "CẤM dùng cho người suy kiệt, bệnh tim mạch, tăng huyết áp, xuất huyết tiêu hóa, ho ra máu và phụ nữ có thai.",
    "benskyNotes": "Dan Bensky 3rd Ed (Mục Emetics): Một trong 3 vị Thổ dược kinh điển của Bensky dùng gây nôn cấp cứu thực tích/đờm tắc thực chứng."
  },
  {
    "id": "chang-shan",
    "vietnameseName": "Thường sơn (Rễ cây thường sơn) [Thổ Dược / Tiệt Ngược]",
    "pinyinName": "Chang Shan",
    "botanicalName": "Radix Dichroae",
    "chineseCharacters": "常山",
    "category": "18. Thuốc Dùng Ngoài / Ngoại Khoa (Topical)",
    "properties": {
      "nature": "Hàn",
      "flavors": [
        "Đắng",
        "Cay",
        "Độc"
      ],
      "channels": [
        "Phế",
        "Tâm",
        "Can"
      ]
    },
    "dosageGram": "4.5 - 9g (Sao rượu giúp giảm tác dụng phụ gây nôn)",
    "actions": [
      "Dũng thổ đờm ẩm (gây nôn trục đờm)",
      "Tiệt ngược (diệt ký sinh trùng sốt rét cực mạnh)"
    ],
    "clinicalIndications": [
      "Bệnh sốt rét cơn dai dẳng (Thường Sơn Ẩm)",
      "Đờm ẩm tụ ở vùng ngực gây tức ngực khó thở"
    ],
    "contraindications": "Không dùng cho người thể trạng suy yếu, phụ nữ có thai và người hay nôn.",
    "benskyNotes": "Dan Bensky 3rd Ed: Chứa Febrifugine trị sốt rét mạnh gấp nhiều lần Quinine nhưng dễ gây buồn nôn; sao tẩm rượu giúp giảm kích ứng dạ dày."
  },
  {
    "id": "guan-mu-tong",
    "vietnameseName": "Quan mộc thông [CẤM LƯU HÀNH — Thay bằng Xuyên mộc thông / Thông thảo]",
    "pinyinName": "Guan Mu Tong",
    "botanicalName": "Caulis Aristolochiae Manshuriensis (RESTRICTED)",
    "chineseCharacters": "關木通",
    "category": "19. Nhóm Vị Thuốc Hạn Chế & Thay Thế (Obsolete)",
    "properties": {
      "nature": "Hàn",
      "flavors": [
        "Đắng",
        "Độc thận (Acid Aristolochic)"
      ],
      "channels": [
        "Tâm",
        "Tiểu tràng",
        "Bàng quang"
      ]
    },
    "dosageGram": "KHÔNG SỬ DỤNG TRONG LÂM SÀNG (Thay thế bằng Xuyên mộc thông Clematis hoặc Thông thảo)",
    "actions": [
      "Tả tâm hỏa thông lâm lợi niệu (công năng cổ điển trước khi bị cấm)"
    ],
    "clinicalIndications": [
      "BỊ CẤM TOÀN CẦU vì chứa Aristolochic Acid gây suy thận không hồi phục (Bệnh thận do thảo dược) và ung thư đường tiết niệu"
    ],
    "contraindications": "CẤM TUYỆT ĐỐI SỬ DỤNG. Kiểm tra nghiêm ngặt nhãn mác để tránh nhầm lẫn vào bài Đạo Xích Tán hoặc Long Đởm Tả Can Thang.",
    "benskyNotes": "Dan Bensky 3rd Ed: Đưa vào Chương Obsolete/Restricted với cảnh báo đỏ về Aristolochic acid; bắt buộc thay thế hoàn toàn bằng Xuyên mộc thông (Caulis Clematidis Armandii)."
  },
  {
    "id": "guang-fang-ji",
    "vietnameseName": "Quảng phòng kỷ [CẤM LƯU HÀNH — Thay bằng Phấn phòng kỷ]",
    "pinyinName": "Guang Fang Ji",
    "botanicalName": "Radix Aristolochiae Fangchi (RESTRICTED)",
    "chineseCharacters": "廣防己",
    "category": "19. Nhóm Vị Thuốc Hạn Chế & Thay Thế (Obsolete)",
    "properties": {
      "nature": "Hàn",
      "flavors": [
        "Đắng",
        "Cay",
        "Độc thận (Acid Aristolochic)"
      ],
      "channels": [
        "Bàng quang",
        "Thận",
        "Tỳ"
      ]
    },
    "dosageGram": "KHÔNG SỬ DỤNG TRONG LÂM SÀNG (Thay thế bằng Phấn phòng kỷ Stephania tetrandra)",
    "actions": [
      "Khu phong trừ thấp lợi thủy (công năng cổ điển trước khi bị cấm)"
    ],
    "clinicalIndications": [
      "Nguyên nhân gây vụ ngộ độc suy thận hàng loạt tại Bỉ thập niên 1990 do nhầm lẫn Quảng phòng kỷ thay Phấn phòng kỷ"
    ],
    "contraindications": "CẤM TUYỆT ĐỐI LƯU HÀNH VÀ KÊ ĐƠN vì chứa Aristolochic Acid gây xơ hóa kẽ thận và ung thư biểu mô niệu.",
    "benskyNotes": "Dan Bensky 3rd Ed: Nhấn mạnh phải kiểm nghiệm sắc ký loại trừ Aristolochic Acid khi kê đơn Phòng Kỷ Hoàng Kỳ Thang bằng Phấn phòng kỷ an toàn."
  },
  {
    "id": "qing-mu-xiang",
    "vietnameseName": "Thanh mộc hương [CẤM LƯU HÀNH — Thay bằng Mộc hương / Xuyên mộc hương]",
    "pinyinName": "Qing Mu Xiang",
    "botanicalName": "Radix Aristolochiae (RESTRICTED)",
    "chineseCharacters": "青木香",
    "category": "19. Nhóm Vị Thuốc Hạn Chế & Thay Thế (Obsolete)",
    "properties": {
      "nature": "Hàn",
      "flavors": [
        "Cay",
        "Đắng",
        "Độc thận (Acid Aristolochic)"
      ],
      "channels": [
        "Can",
        "Vị"
      ]
    },
    "dosageGram": "KHÔNG SỬ DỤNG TRONG LÂM SÀNG (Thay bằng Mộc hương Radix Aucklandiae hoặc Thổ mộc hương)",
    "actions": [
      "Hành khí chỉ thống giải độc (công năng cũ)"
    ],
    "clinicalIndications": [
      "Đã bị loại khỏi Dược điển Trung Quốc và thế giới vì chứa Aristolochic Acid gây suy thận và ung thư"
    ],
    "contraindications": "CẤM TUYỆT ĐỐI SỬ DỤNG DƯỚI MỌI HÌNH THỨC.",
    "benskyNotes": "Dan Bensky 3rd Ed: Bị thay thế 100% bằng Mộc hương (Aucklandia lappa) an toàn không chứa acid Aristolochic."
  },
  {
    "id": "ma-dou-ling",
    "vietnameseName": "Mã đậu linh [CẤM LƯU HÀNH — Thay bằng Tỳ bà diệp / Qua lâu]",
    "pinyinName": "Ma Dou Ling",
    "botanicalName": "Fructus Aristolochiae (RESTRICTED)",
    "chineseCharacters": "馬兜鈴",
    "category": "19. Nhóm Vị Thuốc Hạn Chế & Thay Thế (Obsolete)",
    "properties": {
      "nature": "Hơi hàn",
      "flavors": [
        "Đắng",
        "Hơi cay",
        "Độc thận (Acid Aristolochic)"
      ],
      "channels": [
        "Phế",
        "Đại tràng"
      ]
    },
    "dosageGram": "KHÔNG SỬ DỤNG TRONG LÂM SÀNG (Thay thế bằng Tỳ bà diệp, Khoản đông hoa, Tang bạch bì)",
    "actions": [
      "Thanh phế giáng khí chỉ khái bình suyễn (công năng cũ)"
    ],
    "clinicalIndications": [
      "Đã bị cấm kê đơn nội khoa do chứa Aristolochic Acid gây độc thận không hồi phục"
    ],
    "contraindications": "CẤM TUYỆT ĐỐI KÊ ĐƠN UỐNG TRONG.",
    "benskyNotes": "Dan Bensky 3rd Ed: Trong bài Bổ Phế A Giao Thang cổ điển nay thay thế Mã đậu linh bằng Tỳ bà diệp + Qua lâu bì + Tử uyển."
  },
  {
    "id": "tian-xian-teng",
    "vietnameseName": "Thiên tiên đằng [CẤM LƯU HÀNH — Thay bằng Tang ký sinh / Kê huyết đằng]",
    "pinyinName": "Tian Xian Teng",
    "botanicalName": "Herba Aristolochiae (RESTRICTED)",
    "chineseCharacters": "天仙藤",
    "category": "19. Nhóm Vị Thuốc Hạn Chế & Thay Thế (Obsolete)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Đắng",
        "Độc thận (Acid Aristolochic)"
      ],
      "channels": [
        "Can",
        "Tỳ",
        "Thận"
      ]
    },
    "dosageGram": "KHÔNG SỬ DỤNG TRONG LÂM SÀNG (Thay bằng Tử tô ngạnh + Phục linh bì cho phù thai kỳ)",
    "actions": [
      "Hành khí hoạt huyết lợi thủy tiêu thũng (công năng cũ)"
    ],
    "clinicalIndications": [
      "Trước đây dùng trong Thiên Tiên Đằng Tán trị phù thai kỳ nhưng nay bị cấm hoàn toàn do độc tố thận và đột biến gen"
    ],
    "contraindications": "CẤM TUYỆT ĐỐI SỬ DỤNG ĐẶC BIỆT Ở PHỤ NỮ CÓ THAI.",
    "benskyNotes": "Dan Bensky 3rd Ed: Khuyến cáo thay bằng Tử tô ngạnh, Trần bì, Đại phúc bì, Tang bạch bì trong điều trị phù thũng thai kỳ."
  },
  {
    "id": "hu-gu",
    "vietnameseName": "Hổ cốt [CẤM BẢO TỒN CITES — Thay bằng Tục đoạn / Cẩu tích / Thấu cốt thảo]",
    "pinyinName": "Hu Gu",
    "botanicalName": "Os Tigris (CITES Appendix I BANNED)",
    "chineseCharacters": "虎骨",
    "category": "19. Nhóm Vị Thuốc Hạn Chế & Thay Thế (Obsolete)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Cay"
      ],
      "channels": [
        "Can",
        "Thận"
      ]
    },
    "dosageGram": "BỊ CẤM HOÀN TOÀN THEO CÔNG ƯỚC CITES (Thay bằng Tắc kè đá, Tục đoạn, Ngưu tất, Tang ký sinh hoặc Xương lợn/cừu bổ sung)",
    "actions": [
      "Khu phong chỉ thống",
      "Cường cân kiện cốt (công năng lịch sử)"
    ],
    "clinicalIndications": [
      "Đau nhức xương khớp yếu chân (lịch sử dùng trong Hổ Tiềm Hoàn — nay cải biên thành \"Báo Cốt\" hoặc hoàn toàn thảo mộc)"
    ],
    "contraindications": "CẤM TUYỆT ĐỐI SĂN BẮT BUÔN BÁN VÀ SỬ DỤNG THEO LUẬT PHÁP QUỐC TẾ.",
    "benskyNotes": "Dan Bensky 3rd Ed: Hổ Tiềm Hoàn ngày nay loại bỏ hoàn toàn Hổ cốt, thay bằng Tục đoạn + Cẩu tích + Ngưu tất + Đỗ trọng vẫn đạt hiệu lực lâm sàng."
  },
  {
    "id": "xiong-dan",
    "vietnameseName": "Hùng đảm [HẠN CHẾ NHÂN ĐẠO & BẢO TỒN — Thay bằng Long đởm thảo / Hoàng liên]",
    "pinyinName": "Xiong Dan",
    "botanicalName": "Fel Ursi (CONSERVATION RESTRICTED)",
    "chineseCharacters": "熊膽",
    "category": "19. Nhóm Vị Thuốc Hạn Chế & Thay Thế (Obsolete)",
    "properties": {
      "nature": "Hàn",
      "flavors": [
        "Đắng"
      ],
      "channels": [
        "Can",
        "Đởm",
        "Tâm"
      ]
    },
    "dosageGram": "KHÔNG KHUYẾN KHÍCH SỬ DỤNG (Thay thế bằng Tổng hợp UDCA / Long đởm thảo + Hoàng liên + Khổ sâm)",
    "actions": [
      "Thanh nhiệt giải độc",
      "Bình can minh mục tức phong định kinh"
    ],
    "clinicalIndications": [
      "Viêm gan túi mật, sốt cao kinh giật, mắt đỏ màng mộng (nay thay bằng Acid Ursodeoxycholic tổng hợp hoặc thảo mộc thanh Can Đởm)"
    ],
    "contraindications": "Cần thay thế hoàn toàn bằng thảo dược hoặc UDCA tổng hợp để chấm dứt khai thác gấu.",
    "benskyNotes": "Dan Bensky 3rd Ed: Nghiên cứu chứng minh phối hợp Long đởm thảo + Hoàng liên + Trư đảm (hoặc UDCA sinh học) thay thế hoàn toàn Hùng đảm."
  },
  {
    "id": "chuan-shan-jia",
    "vietnameseName": "Xuyên sơn giáp [CẤM BẢO TỒN CITES — Thay bằng Tạo giác thích / Vương bất lưu hành]",
    "pinyinName": "Chuan Shan Jia",
    "botanicalName": "Squama Manis (CITES Appendix I BANNED)",
    "chineseCharacters": "穿山甲",
    "category": "19. Nhóm Vị Thuốc Hạn Chế & Thay Thế (Obsolete)",
    "properties": {
      "nature": "Hơi hàn",
      "flavors": [
        "Mặn"
      ],
      "channels": [
        "Can",
        "Vị"
      ]
    },
    "dosageGram": "BỊ CẤM THEO CÔNG ƯỚC CITES (Thay bằng Vương bất lưu hành 12g + Tạo giác thích 9g + Lộ lộ thông 9g)",
    "actions": [
      "Hoạt huyết tiêu trưng thông kinh",
      "Thông nhũ (xuống sữa)",
      "Tiêu thũng bài nùng (làm vỡ mủ nhọt)"
    ],
    "clinicalIndications": [
      "Tắc tia sữa, kinh bế ứ huyết, áp xe nhọt sưng cứng (nay dùng tổ hợp thảo dược thay thế an toàn)"
    ],
    "contraindications": "Tê tê đang đứng trước nguy cơ tuyệt chủng cực nghiêm trọng; CẤM sử dụng và buôn bán theo CITES Phụ lục I.",
    "benskyNotes": "Dan Bensky 3rd Ed: Dùng Tạo giác thích (để phá mủ) và Vương bất lưu hành + Lộ lộ thông (để thông sữa hoạt huyết) thay thế 100% vảy Tê tê."
  },
  {
    "id": "pi-shuang",
    "vietnameseName": "Tỳ sương / Thạch tín [CỰC ĐỘC ASEN — Hạn chế tuyệt đối]",
    "pinyinName": "Pi Shuang",
    "botanicalName": "Arsenolitum (HIGHLY TOXIC)",
    "chineseCharacters": "砒霜",
    "category": "19. Nhóm Vị Thuốc Hạn Chế & Thay Thế (Obsolete)",
    "properties": {
      "nature": "Đại nhiệt",
      "flavors": [
        "Cay",
        "Chua",
        "Cực độc"
      ],
      "channels": [
        "Phế",
        "Can",
        "Đại tràng"
      ]
    },
    "dosageGram": "CẤM SỬ DỤNG TỰ DO (Chỉ định truyền tĩnh mạch As2O3 chuẩn hóa bệnh viện trong điều trị ung thư bạch cầu tủy cấp APL)",
    "actions": [
      "Ăn mòn tổ chức hoại tử dùng ngoài",
      "Tiêu ngoan đờm hỏa trong chứng suyễn lâu năm (lịch sử)"
    ],
    "clinicalIndications": [
      "Y học hiện đại tách chiết Asen trioxide (As2O3) tiêm truyền tĩnh mạch điều trị thành công bệnh bạch cầu tiền tủy bào cấp (APL)"
    ],
    "contraindications": "LIỀU GÂY TỬ VONG RẤT THẤP (0.06 - 0.2g đã tử vong); CẤM tuyệt đối kê đơn thảo dược uống hoặc rắc ngoài tự phát.",
    "benskyNotes": "Dan Bensky 3rd Ed: Ghi nhận giá trị lịch sử trong phát hiện Asen trioxide chữa ung thư máu APL tại Trung Quốc nhưng tuyệt đối không dùng thô ngoài bệnh viện."
  },
  {
    "id": "qian-dan",
    "vietnameseName": "Duyên đơn / Hoàng đơn (Chì Oxit Pb3O4) [ĐỘC CHÌ - HẠN CHẾ]",
    "pinyinName": "Qian Dan",
    "botanicalName": "Minium (TOXIC HEAVY METAL)",
    "chineseCharacters": "鉛丹",
    "category": "19. Nhóm Vị Thuốc Hạn Chế & Thay Thế (Obsolete)",
    "properties": {
      "nature": "Hơi hàn",
      "flavors": [
        "Cay",
        "Độc chì"
      ],
      "channels": [
        "Tâm",
        "Can"
      ]
    },
    "dosageGram": "KHÔNG UỐNG TRONG (Lịch sử chỉ dùng làm cao dán ngoài da; nay thay thế bằng cao dán thảo mộc không chì)",
    "actions": [
      "Giải độc sinh cơ thu ẩm (ngoài da)",
      "Trụy đờm trấn kinh (lịch sử)"
    ],
    "clinicalIndications": [
      "Trước đây nấu với dầu mè làm \"Hắc cao dược\" dán nhọt, nay cấm vì nguy cơ nhiễm độc chì mạn tính"
    ],
    "contraindications": "Gây ngộ độc chì (hại não, thiếu máu, suy thận, dị tật thai nhi); cấm dùng nội khoa và tránh làm cao dán có chì.",
    "benskyNotes": "Dan Bensky 3rd Ed: Cảnh báo nguy cơ ngộ độc kim loại nặng khi dùng cao dán Hắc cao cổ truyền chứa Duyên đơn hoặc Khinh phấn."
  },
  {
    "id": "shui-yin",
    "vietnameseName": "Thủy ngân (Kim loại lỏng Hg) [ĐỘC THỦY NGÂN - CẤM DÙNG]",
    "pinyinName": "Shui Yin",
    "botanicalName": "Hydrargyrum (TOXIC HEAVY METAL)",
    "chineseCharacters": "水銀",
    "category": "19. Nhóm Vị Thuốc Hạn Chế & Thay Thế (Obsolete)",
    "properties": {
      "nature": "Hàn",
      "flavors": [
        "Cay",
        "Cực độc"
      ],
      "channels": [
        "Can",
        "Thận"
      ]
    },
    "dosageGram": "CẤM DÙNG TRONG LÂM SÀNG",
    "actions": [
      "Sát trùng công độc (lịch sử luyện đan ngoại khoa)"
    ],
    "clinicalIndications": [
      "Đã loại bỏ hoàn toàn do độc tính nặng trên hệ thần kinh trung ương và hoại tử ống thận"
    ],
    "contraindications": "CẤM TUYỆT ĐỐI DÙNG NGOÀI VÀ UỐNG TRONG.",
    "benskyNotes": "Dan Bensky 3rd Ed: Liệt kê trong mục cảnh báo lịch sử để y bác sĩ nhận diện và loại bỏ các đơn cổ chứa thủy ngân kim loại."
  },
  {
    "id": "ban-mao",
    "vietnameseName": "Ban miêu (Bọ sâu ban miêu) [ĐỘC BÀO TỬ THẬN - HẠN CHẾ]",
    "pinyinName": "Ban Mao",
    "botanicalName": "Mylabris (HIGHLY TOXIC)",
    "chineseCharacters": "斑蝥",
    "category": "19. Nhóm Vị Thuốc Hạn Chế & Thay Thế (Obsolete)",
    "properties": {
      "nature": "Đại nhiệt",
      "flavors": [
        "Cay",
        "Đại độc"
      ],
      "channels": [
        "Đại tràng",
        "Tiểu tràng",
        "Can",
        "Thận"
      ]
    },
    "dosageGram": "CHỈ DÙNG NGOÀI PHỎNG RỘP CỤC BỘ (\"Thiên cứu\") HOẶC CHẾ PHẨM UNG THƯ CHUẨN HÓA (0.03g sao gạo nếp bỏ đầu chân cánh)",
    "actions": [
      "Phá huyết tiêu trưng tán kết",
      "Công độc ăn mòn (rất mạnh)"
    ],
    "clinicalIndications": [
      "Nghiên cứu Cantharidin bán tổng hợp (Norcantharidin) hỗ trợ điều trị ung thư gan nguyên phát",
      "Kích ứng da làm rộp mủ trị rụng tóc mảng / đau khớp cố tật"
    ],
    "contraindications": "Cực độc gây hoại tử niêm mạc đường tiết niệu đi tiểu ra máu và suy thận cấp; CẤM phụ nữ có thai và người bệnh thận.",
    "benskyNotes": "Dan Bensky 3rd Ed: Phải bỏ đầu chân cánh và sao vàng cùng gạo nếp (\"Mễ sao\") để giảm bớt độc tố Cantharidin, và tuyệt đối thận trọng đường uống."
  },
  {
    "id": "lang-du",
    "vietnameseName": "Lang độc [ĐỘC MẠNH - HẠN CHẾ]",
    "pinyinName": "Lang Du",
    "botanicalName": "Radix Euphorbiae Fischerianae",
    "chineseCharacters": "狼毒",
    "category": "19. Nhóm Vị Thuốc Hạn Chế & Thay Thế (Obsolete)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Đắng",
        "Cay",
        "Đại độc"
      ],
      "channels": [
        "Phế",
        "Tỳ",
        "Can"
      ]
    },
    "dosageGram": "CHỦ YẾU DÙNG NGOÀI (0.9 - 2.4g chế giấm rất thận trọng nếu dùng trong)",
    "actions": [
      "Trục thủy khư đờm phá tích tụ",
      "Sát trùng công độc ngoài da (trị nấm ghẻ tràng nhạc)"
    ],
    "clinicalIndications": [
      "Cổ trướng xơ gan tràn dịch màng phổi ngoan cố",
      "Hạch cổ tràng nhạc, nấm da đầu vảy nến ghẻ lở (dùng ngoài)"
    ],
    "contraindications": "ỦY MẬT ĐÀ TĂNG (Thập cửu úy); CẤM phụ nữ có thai và người suy nhược.",
    "benskyNotes": "Dan Bensky 3rd Ed: Rất dễ gây nôn ói bỏng rát dạ dày ruột nếu dùng đường uống; thường ưu tiên dùng ngoài hoặc thay thế bằng thuốc trục thủy an toàn hơn."
  },
  {
    "id": "li-lu",
    "vietnameseName": "Lê lô [THỔ DƯỢC CỰC ĐỘC - KHÔNG DÙNG VỚI CÁC NHÓM NHÂN SÂM / TẾ TÂN / THƯỢC DƯỢC]",
    "pinyinName": "Li Lu",
    "botanicalName": "Rhizoma et Radix Veratri",
    "chineseCharacters": "藜蘆",
    "category": "19. Nhóm Vị Thuốc Hạn Chế & Thay Thế (Obsolete)",
    "properties": {
      "nature": "Hàn",
      "flavors": [
        "Đắng",
        "Cay",
        "Đại độc"
      ],
      "channels": [
        "Phế",
        "Vị",
        "Can"
      ]
    },
    "dosageGram": "KHÔNG KHUYẾN KHÍCH UỐNG TRONG (Thổi mũi lượng cực nhỏ 0.3g gây hắt hơi khai khiếu hoặc pha thuốc mỡ bôi ghẻ)",
    "actions": [
      "Dũng thổ đờm dãi phong bế",
      "Sát trùng trừ ghẻ ngứa"
    ],
    "clinicalIndications": [
      "Lịch sử dùng gây nôn tống đờm trong trúng phong đàm tắc (Tam Thánh Tán)",
      "Ghẻ lở chấy rận ngoài da"
    ],
    "contraindications": "PHẢN Nhân sâm, Đảng sâm, Đan sâm, Huyền sâm, Khổ sâm, Sa sâm, Bạch thược, Xích thược, Tế tân (Thập bát phản); gây tụt huyết áp chậm nhịp tim ngưng thở.",
    "benskyNotes": "Dan Bensky 3rd Ed: Nổi tiếng nhất trong bài ca \"Thập Bát Phản\" (\"Chư Sâm Tân Thược phản Lê lô\"); ngày nay gần như ngừng uống trong do độc tính tim mạch."
  }
];
