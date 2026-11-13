export interface Herb {
  id: string;
  vietnameseName: string;
  pinyinName: string;
  botanicalName: string;
  chineseCharacters: string;
  category: string;
  properties: {
    nature: string;
    flavors: string[];
    channels: string[];
  };
  dosageGram: string;
  actions: string[];
  clinicalIndications: string[];
  contraindications: string;
  benskyNotes: string;
}

export const HERBAL_MATERIA: Herb[] = [
  {
    id: 'ma-huang',
    vietnameseName: 'Ma hoàng',
    pinyinName: 'Ma Huang',
    botanicalName: 'Herba Ephedrae',
    chineseCharacters: '麻黃',
    category: '1. Thuốc Giải Biểu (Release Exterior)',
    properties: {
      nature: 'Ôn',
      flavors: ["Tân", "Khổ"],
      channels: ["Phế", "Bàng quang"]
    },
    dosageGram: '2 - 9g',
    actions: ["Phát hãn giải biểu mạnh", "Tuyên phế bình suyễn", "Lợi thủy tiêu thũng"],
    clinicalIndications: ["Cảm phong hàn biểu thực không mồ hôi", "Hen phế quản đờm khò khè", "Phù thũng phong thủy"],
    contraindications: 'Cấm dùng cao huyết áp, tự hãn, âm hư hỏa vượng; thận trọng ở phụ nữ có thai.',
    benskyNotes: 'Dan Bensky 3rd Ed: Ephedrine kích thích phế quản; chích mật nhuận phế.'
  },
  {
    id: 'gui-zhi',
    vietnameseName: 'Quế chi',
    pinyinName: 'Gui Zhi',
    botanicalName: 'Ramulus Cinnamomi',
    chineseCharacters: '桂枝',
    category: '1. Thuốc Giải Biểu (Release Exterior)',
    properties: {
      nature: 'Ôn',
      flavors: ["Tân", "Cam"],
      channels: ["Tâm", "Phế", "Bàng quang"]
    },
    dosageGram: '3 - 10g',
    actions: ["Phát hãn giải cơ", "Ôn thông kinh mạch", "Trợ tâm dương"],
    clinicalIndications: ["Cảm phong hàn tự hãn", "Đau nhức khớp vai tay", "Đau bụng kinh do hàn ngưng"],
    contraindications: 'Thận trọng sốt cao biểu nhiệt, mang thai.',
    benskyNotes: 'Dan Bensky: Phát tán kinh mạch chi trên, ấm mạch máu.'
  },
  {
    id: 'zi-su-ye',
    vietnameseName: 'Tử tô diệp',
    pinyinName: 'Zi Su Ye',
    botanicalName: 'Folium Perillae',
    chineseCharacters: '紫蘇葉',
    category: '1. Thuốc Giải Biểu (Release Exterior)',
    properties: {
      nature: 'Ôn',
      flavors: ["Tân"],
      channels: ["Phế", "Tỳ"]
    },
    dosageGram: '5 - 10g',
    actions: ["Phát tán phong hàn", "Lý khí hòa vị", "An thai giải độc hải sản"],
    clinicalIndications: ["Cảm phong hàn ho đờm", "Buồn nôn Tỳ trệ", "Thai động, ngộ độc cá cua"],
    contraindications: 'Thận trọng khi ho khô âm hư.',
    benskyNotes: 'Dan Bensky: Giải phong hàn kết hợp hòa vị an thai.'
  },
  {
    id: 'jing-jie',
    vietnameseName: 'Kinh giới',
    pinyinName: 'Jing Jie',
    botanicalName: 'Herba Schizonepetae',
    chineseCharacters: '荊芥',
    category: '1. Thuốc Giải Biểu (Release Exterior)',
    properties: {
      nature: 'Hơi ôn',
      flavors: ["Tân"],
      channels: ["Phế", "Can"]
    },
    dosageGram: '5 - 10g',
    actions: ["Giải biểu khứ phong", "Thấu chẩn mọc ban ngứa", "Chỉ huyết (sao thán)"],
    clinicalIndications: ["Cảm hắt hơi sổ mũi", "Mề đay dị ứng, sởi", "Chảy máu cam, rong kinh"],
    contraindications: 'Tránh mụn nhọt vỡ mủ.',
    benskyNotes: 'Dan Bensky: Dược liệu khứ phong dịu nhẹ; sao thán cầm máu.'
  },
  {
    id: 'fang-feng',
    vietnameseName: 'Phòng phong',
    pinyinName: 'Fang Feng',
    botanicalName: 'Radix Saposhnikoviae',
    chineseCharacters: '防風',
    category: '1. Thuốc Giải Biểu (Release Exterior)',
    properties: {
      nature: 'Hơi ôn',
      flavors: ["Tân", "Cam"],
      channels: ["Bàng quang", "Can", "Tỳ"]
    },
    dosageGram: '5 - 10g',
    actions: ["Khứ phong giải biểu", "Thắng thấp chỉ thống", "Chỉ kinh co giật"],
    clinicalIndications: ["Đau đầu phong hàn", "Đau nhức khớp phong thấp", "Uốn ván co giật"],
    contraindications: 'Không dùng cho co giật huyết hư.',
    benskyNotes: 'Dan Bensky: Phong dược trung chi tiên, khứ phong không hại tân dịch.'
  },
  {
    id: 'qiang-huo',
    vietnameseName: 'Khương hoạt',
    pinyinName: 'Qiang Huo',
    botanicalName: 'Rhizoma et Radix Notopterygii',
    chineseCharacters: '羌活',
    category: '1. Thuốc Giải Biểu (Release Exterior)',
    properties: {
      nature: 'Ôn',
      flavors: ["Tân", "Khổ"],
      channels: ["Bàng quang", "Thận"]
    },
    dosageGram: '3 - 9g',
    actions: ["Tán phong hàn thấp", "Chỉ thống đặc trị đau gáy cổ"],
    clinicalIndications: ["Cảm phong hàn đau cứng gáy cổ", "Đau nhức khớp vai lưng chi trên"],
    contraindications: 'Kỵ huyết hư đau nhức.',
    benskyNotes: 'Dan Bensky: Dẫn thuốc đi lên nửa thân trên và gáy cổ.'
  },
  {
    id: 'bai-zhi',
    vietnameseName: 'Bạch chỉ',
    pinyinName: 'Bai Zhi',
    botanicalName: 'Radix Angelicae Dahuricae',
    chineseCharacters: '白芷',
    category: '1. Thuốc Giải Biểu (Release Exterior)',
    properties: {
      nature: 'Ôn',
      flavors: ["Tân"],
      channels: ["Vị", "Phế", "Đại tràng"]
    },
    dosageGram: '3 - 9g',
    actions: ["Tán phong giải biểu", "Thông quan khai khiếu", "Tiêu thũng bài nùng"],
    clinicalIndications: ["Đau đầu trán chân mày Dương minh", "Viêm xoang chảy mũi hôi", "Đau răng, mụn nhọt"],
    contraindications: 'Kỵ âm hư hỏa vượng.',
    benskyNotes: 'Dan Bensky: Vị thuốc số 1 trị đau đầu kinh Dương minh.'
  },
  {
    id: 'xi-xin',
    vietnameseName: 'Tế tân',
    pinyinName: 'Xi Xin',
    botanicalName: 'Radix et Rhizoma Asari',
    chineseCharacters: '細辛',
    category: '1. Thuốc Giải Biểu (Release Exterior)',
    properties: {
      nature: 'Ôn',
      flavors: ["Tân"],
      channels: ["Phế", "Thận", "Tâm"]
    },
    dosageGram: '1 - 3g',
    actions: ["Khứ phong tán hàn", "Thông khiếu chỉ thống", "Ôn phế hóa đàm ẩm"],
    clinicalIndications: ["Đau đầu dữ dội, đau răng sâu", "Viêm xoang nghẹt mũi", "Hen phế quản đờm lạnh lỏng"],
    contraindications: 'Không dùng quá 3g (nguy cơ độc tính). Kỵ Lê Lô.',
    benskyNotes: 'Dan Bensky: Thấu suốt xương tủy và phế âm, vượt quá 3g nguy hiểm.'
  },
  {
    id: 'sheng-jiang',
    vietnameseName: 'Sinh khương',
    pinyinName: 'Sheng Jiang',
    botanicalName: 'Rhizoma Zingiberis Recens',
    chineseCharacters: '生姜',
    category: '1. Thuốc Giải Biểu (Release Exterior)',
    properties: {
      nature: 'Hơi ôn',
      flavors: ["Tân"],
      channels: ["Phế", "Tỳ", "Vị"]
    },
    dosageGram: '3 - 10g',
    actions: ["Phát hãn giải biểu", "Ôn trung chỉ ẩu", "Giải độc Bán hạ Phụ tử"],
    clinicalIndications: ["Cảm mạo phong hàn", "Buồn nôn nôn mửa do lạnh vị", "Ho đờm lạnh"],
    contraindications: 'Thận trọng nhiệt thực âm hư.',
    benskyNotes: 'Dan Bensky: Thánh dược chống nôn mửa.'
  },
  {
    id: 'xiang-ru',
    vietnameseName: 'Hương nhu',
    pinyinName: 'Xiang Ru',
    botanicalName: 'Herba Moslae',
    chineseCharacters: '香薷',
    category: '1. Thuốc Giải Biểu (Release Exterior)',
    properties: {
      nature: 'Ôn',
      flavors: ["Tân"],
      channels: ["Phế", "Vị"]
    },
    dosageGram: '3 - 9g',
    actions: ["Phát hãn giải thử", "Hòa trung hóa thấp", "Lợi thủy tiêu thũng"],
    clinicalIndications: ["Cảm nắng mùa hè", "Đau bụng nôn mửa tiêu chảy mùa hè", "Phù thũng"],
    contraindications: 'Kỵ tự hãn biểu hư.',
    benskyNotes: 'Dan Bensky: Ma hoàng của mùa hè.'
  },
  {
    id: 'xin-yi',
    vietnameseName: 'Tân di hoa',
    pinyinName: 'Xin Yi',
    botanicalName: 'Flos Magnoliae',
    chineseCharacters: '辛夷',
    category: '1. Thuốc Giải Biểu (Release Exterior)',
    properties: {
      nature: 'Ôn',
      flavors: ["Tân"],
      channels: ["Phế", "Vị"]
    },
    dosageGram: '3 - 9g',
    actions: ["Phát phong hàn", "Thông tỵ khiếu đặc trị viêm xoang"],
    clinicalIndications: ["Viêm xoang mạn tính nghẹt mũi", "Chảy nước mũi hôi tắc bít"],
    contraindications: 'Âm hư hỏa vượng cần phối ngũ.',
    benskyNotes: 'Dan Bensky: Tinh dầu thông thoáng đường xoang mũi.'
  },
  {
    id: 'cang-er-zi',
    vietnameseName: 'Thương nhĩ tử',
    pinyinName: 'Cang Er Zi',
    botanicalName: 'Fructus Xanthii',
    chineseCharacters: '蒼耳子',
    category: '1. Thuốc Giải Biểu (Release Exterior)',
    properties: {
      nature: 'Ôn (Độc nhẹ)',
      flavors: ["Tân", "Khổ"],
      channels: ["Phế"]
    },
    dosageGram: '3 - 9g',
    actions: ["Tán phong trừ thấp", "Thông tỵ khiếu chỉ thống"],
    clinicalIndications: ["Viêm xoang nghẹt mũi", "Nhức đầu ngứa da mề đay"],
    contraindications: 'Sao vàng giã nát bỏ gai giảm độc.',
    benskyNotes: 'Dan Bensky: Phối hợp Tân Di Hoa trị viêm xoang.'
  },
  {
    id: 'cong-bai',
    vietnameseName: 'Thông bạch',
    pinyinName: 'Cong Bai',
    botanicalName: 'Bulbus Allii Fistulosi',
    chineseCharacters: '蔥白',
    category: '1. Thuốc Giải Biểu (Release Exterior)',
    properties: {
      nature: 'Ôn',
      flavors: ["Tân"],
      channels: ["Phế", "Vị"]
    },
    dosageGram: '3 - 10g',
    actions: ["Phát hãn giải biểu", "Thông dương tán kết"],
    clinicalIndications: ["Cảm mạo sợ lạnh", "Đau bụng lạnh mụn nhọt"],
    contraindications: 'Thận trọng tự hãn.',
    benskyNotes: 'Dan Bensky: Củ hành trắng thông dương khí giải cảm nhẹ.'
  },
  {
    id: 'bo-he',
    vietnameseName: 'Bạc hà',
    pinyinName: 'Bo He',
    botanicalName: 'Herba Menthae',
    chineseCharacters: '薄荷',
    category: '1. Thuốc Giải Biểu (Release Exterior)',
    properties: {
      nature: 'Lương',
      flavors: ["Tân"],
      channels: ["Phế", "Can"]
    },
    dosageGram: '3 - 6g',
    actions: ["Tán phong nhiệt", "Thanh lợi đầu mắt", "Thấu chẩn sơ can"],
    clinicalIndications: ["Cảm phong nhiệt sốt đau họng", "Đau mắt đỏ đau đầu", "Kinh nguyệt không đều"],
    contraindications: 'Tránh sắc lâu bay Menthol.',
    benskyNotes: 'Dan Bensky: Menthol làm mát họng và thanh nhẹ đầu mắt.'
  },
  {
    id: 'niu-bang-zi',
    vietnameseName: 'Ngưu bàng tử',
    pinyinName: 'Niu Bang Zi',
    botanicalName: 'Fructus Arctii',
    chineseCharacters: '牛蒡子',
    category: '1. Thuốc Giải Biểu (Release Exterior)',
    properties: {
      nature: 'Hàn',
      flavors: ["Tân", "Khổ"],
      channels: ["Phế", "Vị"]
    },
    dosageGram: '6 - 12g',
    actions: ["Sơ tán phong nhiệt", "Tuyên phế thấu chẩn", "Giải độc lợi yết"],
    clinicalIndications: ["Viêm họng cấp sưng đau nuốt vướng", "Sởi nổi không đều", "Mụn nhọt độc"],
    contraindications: 'Kỵ tỳ vị hư hàn.',
    benskyNotes: 'Dan Bensky: Thông sưng họng và giải độc Phế Vị.'
  },
  {
    id: 'chan-tui',
    vietnameseName: 'Thuyền thoái',
    pinyinName: 'Chan Tui',
    botanicalName: 'Periostracum Cicadae',
    chineseCharacters: '蟬蛻',
    category: '1. Thuốc Giải Biểu (Release Exterior)',
    properties: {
      nature: 'Hàn',
      flavors: ["Ngọt"],
      channels: ["Phế", "Can"]
    },
    dosageGram: '3 - 6g',
    actions: ["Tán phong nhiệt", "Lợi yết khai âm mất tiếng", "Tức phong chỉ kinh"],
    clinicalIndications: ["Viêm họng khàn tiếng mất giọng", "Trẻ em sốt cao co giật khóc đêm", "Mề đay ngứa"],
    contraindications: 'Mang thai thận trọng.',
    benskyNotes: 'Dan Bensky: Xác ve thiền thoái thông giọng mất tiếng và dịu co giật.'
  },
  {
    id: 'sang-ye',
    vietnameseName: 'Tang diệp',
    pinyinName: 'Sang Ye',
    botanicalName: 'Folium Mori',
    chineseCharacters: '桑葉',
    category: '1. Thuốc Giải Biểu (Release Exterior)',
    properties: {
      nature: 'Hàn',
      flavors: ["Khổ", "Cam"],
      channels: ["Phế", "Can"]
    },
    dosageGram: '5 - 10g',
    actions: ["Tán phong nhiệt Phế Can", "Thanh phế nhuận táo", "Thanh can sáng mắt"],
    clinicalIndications: ["Cảm phong nhiệt ho khô", "Đau mắt đỏ sưng đau", "Bốc hỏa nhức đầu"],
    contraindications: 'Thận trọng phế hàn.',
    benskyNotes: 'Dan Bensky: Lá dâu tằm thanh Phế hỏa và nhuận mắt.'
  },
  {
    id: 'ju-hua',
    vietnameseName: 'Cúc hoa',
    pinyinName: 'Ju Hua',
    botanicalName: 'Flos Chrysanthemi',
    chineseCharacters: '菊花',
    category: '1. Thuốc Giải Biểu (Release Exterior)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ["Cam", "Khổ"],
      channels: ["Phế", "Can"]
    },
    dosageGram: '6 - 12g',
    actions: ["Tán phong thanh nhiệt", "Bình can minh mục sáng mắt", "Giải độc tiêu thũng"],
    clinicalIndications: ["Đau mắt đỏ mắt mờ hoa mắt", "Tăng huyết áp bốc hỏa", "Mụn nhọt sưng đau"],
    contraindications: 'Bạch cúc sáng mắt; Hoàng cúc giải độc.',
    benskyNotes: 'Dan Bensky: Dưỡng mắt và bình Can hỏa hàng đầu.'
  },
  {
    id: 'man-jing-zi',
    vietnameseName: 'Mạn kinh tử',
    pinyinName: 'Man Jing Zi',
    botanicalName: 'Fructus Viticis',
    chineseCharacters: '蔓荊子',
    category: '1. Thuốc Giải Biểu (Release Exterior)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ["Tân", "Khổ"],
      channels: ["Can", "Vị", "Bàng quang"]
    },
    dosageGram: '6 - 10g',
    actions: ["Sơ tán phong nhiệt", "Thanh lợi đầu mắt chỉ thống"],
    clinicalIndications: ["Đau đầu thái dương phong nhiệt", "Đau mắt đỏ nước mắt sống"],
    contraindications: 'Kỵ huyết hư đau đầu.',
    benskyNotes: 'Dan Bensky: Hạt mạn kinh dẫn thuốc thanh nhẹ lên đầu mặt mắt.'
  },
  {
    id: 'dan-dou-chi',
    vietnameseName: 'Đạm đậu xị',
    pinyinName: 'Dan Dou Chi',
    botanicalName: 'Semen Sojae Praeparatum',
    chineseCharacters: '淡豆豉',
    category: '1. Thuốc Giải Biểu (Release Exterior)',
    properties: {
      nature: 'Bình',
      flavors: ["Khổ", "Tân"],
      channels: ["Phế", "Vị"]
    },
    dosageGram: '6 - 12g',
    actions: ["Giải biểu trừ phiền", "Hòa trung giải độc"],
    clinicalIndications: ["Cảm mạo sốt phiền rạo rực", "Mất ngủ trằn trọc sau sốt"],
    contraindications: 'An hòa cho mọi thể trạng.',
    benskyNotes: 'Dan Bensky: Đậu nành lên men giải phiền nhiệt ngực sườn.'
  },
  {
    id: 'chai-hu',
    vietnameseName: 'Sài hồ',
    pinyinName: 'Chai Hu',
    botanicalName: 'Radix Bupleuri',
    chineseCharacters: '柴胡',
    category: '1. Thuốc Giải Biểu (Release Exterior)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ["Khổ", "Tân"],
      channels: ["Can", "Đởm"]
    },
    dosageGram: '3 - 10g',
    actions: ["Hòa giải thiếu dương", "Sơ can giải uất", "Thăng cử thanh dương"],
    clinicalIndications: ["Sốt lúc nóng lúc lạnh", "Can uất ngực sườn đầy trướng", "Sa tử cung dạ dày"],
    contraindications: 'Thận trọng Can dương vượng.',
    benskyNotes: 'Dan Bensky: Chìa khóa sơ can giải uất khai mở Thiếu dương.'
  },
  {
    id: 'ge-gen',
    vietnameseName: 'Cát căn',
    pinyinName: 'Ge Gen',
    botanicalName: 'Radix Puerariae',
    chineseCharacters: '葛根',
    category: '1. Thuốc Giải Biểu (Release Exterior)',
    properties: {
      nature: 'Bình',
      flavors: ["Cam", "Tân"],
      channels: ["Tỳ", "Vị"]
    },
    dosageGram: '9 - 20g',
    actions: ["Giải cơ hạ sốt cứng gáy", "Sinh tân chỉ khát", "Thăng dương chỉ tả"],
    clinicalIndications: ["Sốt cao đau cứng gáy cổ vai", "Đái tháo đường khát nước", "Tiêu chảy tỳ hư"],
    contraindications: 'Thận trọng tỳ vị hư hàn.',
    benskyNotes: 'Dan Bensky: Puerarin Isoflavone giãn mạch brain và giải đờ cơ gáy cổ.'
  },
  {
    id: 'sheng-ma',
    vietnameseName: 'Thăng ma',
    pinyinName: 'Sheng Ma',
    botanicalName: 'Rhizoma Cimicifugae',
    chineseCharacters: '升麻',
    category: '1. Thuốc Giải Biểu (Release Exterior)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ["Tân", "Cam"],
      channels: ["Phế", "Tỳ", "Vị", "Đại tràng"]
    },
    dosageGram: '3 - 9g',
    actions: ["Phát biểu thấu chẩn", "Thanh nhiệt giải độc", "Thăng cử dương khí nội tạng"],
    clinicalIndications: ["Sa trực tràng tử cung (Bổ Trung Ích Khí)", "Lở miệng đau răng do Vị nhiệt", "Sởi mọc không thấu"],
    contraindications: 'Tránh âm hư hỏa vượng.',
    benskyNotes: 'Dan Bensky: Kéo dương khí sụp đổ từ dưới đáy chậu lên thượng tiêu.'
  },
  {
    id: 'fu-ping',
    vietnameseName: 'Phù bình',
    pinyinName: 'Fu Ping',
    botanicalName: 'Herba Spirodelae',
    chineseCharacters: '浮萍',
    category: '1. Thuốc Giải Biểu (Release Exterior)',
    properties: {
      nature: 'Hàn',
      flavors: ["Tân"],
      channels: ["Phế", "Bàng quang"]
    },
    dosageGram: '3 - 9g',
    actions: ["Tuyên phế phát hãn", "Thấu chẩn chỉ ngứa", "Lợi thủy tiêu thũng"],
    clinicalIndications: ["Sốt cao không mồ hôi", "Mề đay sởi ngứa", "Phù thũng phong thủy"],
    contraindications: 'Kỵ biểu hư tự hãn.',
    benskyNotes: 'Dan Bensky: Bèo cái nổi mặt nước phát hãn lợi thủy rất nhanh.'
  },
  {
    id: 'mu-zei',
    vietnameseName: 'Mộc tặc',
    pinyinName: 'Mu Zei',
    botanicalName: 'Herba Equiseti Hiemalis',
    chineseCharacters: '木賊',
    category: '1. Thuốc Giải Biểu (Release Exterior)',
    properties: {
      nature: 'Bình',
      flavors: ["Cam", "Khổ"],
      channels: ["Phế", "Can"]
    },
    dosageGram: '3 - 9g',
    actions: ["Tán phong nhiệt", "Thanh can mộng mắt"],
    clinicalIndications: ["Mộng thịt ở mắt, đục thủy tinh thể nhẹ", "Đau mắt đỏ chảy nước mắt"],
    contraindications: 'Kỵ khí hư huyết hư.',
    benskyNotes: 'Dan Bensky: Bào mòn mộng thịt và màng đục ở mắt.'
  },
  {
    id: 'shi-gao',
    vietnameseName: 'Thạch cao',
    pinyinName: 'Shi Gao',
    botanicalName: 'Gypsum Fibrosum',
    chineseCharacters: '石膏',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Rất hàn',
      flavors: ["Cam", "Tân"],
      channels: ["Phế", "Vị"]
    },
    dosageGram: '15 - 60g',
    actions: ["Thanh nhiệt tả hỏa đại nhiệt", "Thanh Phế hỏa định suyễn", "Thanh Vị hỏa đau răng"],
    clinicalIndications: ["Sốt cao khát nước vã mồ hôi mạch đại", "Đau răng dữ dội do Vị hỏa", "Viêm phổi sốt cao"],
    contraindications: 'Cấm sốt do âm hư hoặc tỳ vị hư hàn.',
    benskyNotes: 'Dan Bensky: Calcium Sulfate Dihydrate dập ngọn lửa đại nhiệt kinh Vị Phế.'
  },
  {
    id: 'zhi-mu',
    vietnameseName: 'Tri mẫu',
    pinyinName: 'Zhi Mu',
    botanicalName: 'Rhizoma Anemarrhenae',
    chineseCharacters: '知母',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hàn',
      flavors: ["Khổ", "Cam"],
      channels: ["Phế", "Vị", "Thận"]
    },
    dosageGram: '6 - 12g',
    actions: ["Thanh nhiệt tả hỏa", "Tư âm nhuận táo", "Thanh nhiệt hư hỏa Thận"],
    clinicalIndications: ["Sốt cao phiền khát", "Triều nhiệt mồ hôi trộm Thận âm hư", "Ho khô tiểu đường"],
    contraindications: 'Kỵ tỳ vị hư hàn tiêu chảy.',
    benskyNotes: 'Dan Bensky: Vừa tả hỏa vừa tư âm nhuận táo không khô rát.'
  },
  {
    id: 'zhi-zi',
    vietnameseName: 'Chi tử',
    pinyinName: 'Zhi Zi',
    botanicalName: 'Fructus Gardeniae',
    chineseCharacters: '栀子',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hàn',
      flavors: ["Khổ"],
      channels: ["Tâm", "Phế", "Vị", "Can", "Tam tiêu"]
    },
    dosageGram: '6 - 12g',
    actions: ["Thanh nhiệt trừ phiền", "Tả hỏa tam tiêu", "Lợi thấp thanh nhiệt hoàng đản"],
    clinicalIndications: ["Mất ngủ phiền rạo rực", "Viêm gan vàng da", "Huyết nhiệt nôn ra máu"],
    contraindications: 'Kỵ tỳ vị hư hàn.',
    benskyNotes: 'Dan Bensky: Thông tả ngọn lửa hư thực nhiệt ở tam tiêu.'
  },
  {
    id: 'tian-hua-fen',
    vietnameseName: 'Thiên hoa phấn',
    pinyinName: 'Tian Hua Fen',
    botanicalName: 'Radix Trichosanthis',
    chineseCharacters: '天花粉',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ["Cam", "Hơi khổ"],
      channels: ["Phế", "Vị"]
    },
    dosageGram: '10 - 15g',
    actions: ["Thanh nhiệt sinh tân chỉ khát", "Tiêu thũng bài nùng"],
    clinicalIndications: ["Đái tháo đường khát nước", "Ho khô phế nhiệt", "Sưng vú áp xe nhọt độc"],
    contraindications: 'Mang thai thận trọng.',
    benskyNotes: 'Dan Bensky: Trichosanthin tiêu sưng và chỉ khát cực hay.'
  },
  {
    id: 'lu-gen',
    vietnameseName: 'Lô căn',
    pinyinName: 'Lu Gen',
    botanicalName: 'Rhizoma Phragmitis',
    chineseCharacters: '蘆根',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hàn',
      flavors: ["Cam"],
      channels: ["Phế", "Vị"]
    },
    dosageGram: '15 - 30g',
    actions: ["Thanh nhiệt sinh tân", "Thanh phế ho nhiệt", "Thanh vị nôn nhiệt"],
    clinicalIndications: ["Khát nước sốt cao", "Ho đờm vàng hôi phế áp xe", "Nôn mửa Vị nhiệt"],
    contraindications: 'Kỵ tỳ vị hư hàn.',
    benskyNotes: 'Dan Bensky: Rễ sậy tươi mọng nước dập Vị Phế nhiệt rất êm.'
  },
  {
    id: 'dan-zhu-ye',
    vietnameseName: 'Đạm trúc diệp',
    pinyinName: 'Dan Zhu Ye',
    botanicalName: 'Herba Lophatheri',
    chineseCharacters: '淡竹葉',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hàn',
      flavors: ["Cam", "Đạm"],
      channels: ["Tâm", "Vị", "Bàng quang"]
    },
    dosageGram: '6 - 12g',
    actions: ["Thanh nhiệt trừ phiền", "Lợi niệu thông lâm đái buốt"],
    clinicalIndications: ["Tâm hỏa bùng phát lở loét miệng", "Viêm bàng quang đái buốt đái đỏ"],
    contraindications: 'Phụ nữ mang thai dùng cẩn trọng.',
    benskyNotes: 'Dan Bensky: Lá trúc nhạt thông tả Tâm hỏa qua đường tiểu.'
  },
  {
    id: 'xia-ku-cao',
    vietnameseName: 'Hạ khô thảo',
    pinyinName: 'Xia Ku Cao',
    botanicalName: 'Spica Prunellae',
    chineseCharacters: '夏枯草',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hàn',
      flavors: ["Khổ", "Tân"],
      channels: ["Can", "Đởm"]
    },
    dosageGram: '9 - 15g',
    actions: ["Thanh can tả hỏa", "Tán kết tiêu thũng hạch bướu cổ"],
    clinicalIndications: ["Tăng huyết áp Can hỏa", "Sưng hạch cổ, bướu cổ, u tuyến vú", "Đau mắt đỏ"],
    contraindications: 'Kỵ tỳ vị hư yếu.',
    benskyNotes: 'Dan Bensky: Đánh tan các khối u hạch do Can hỏa nung nấu.'
  },
  {
    id: 'jue-ming-zi',
    vietnameseName: 'Quyết minh tử',
    pinyinName: 'Jue Ming Zi',
    botanicalName: 'Semen Cassiae',
    chineseCharacters: '決明子',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ["Cam", "Khổ", "Mặn"],
      channels: ["Can", "Đại tràng"]
    },
    dosageGram: '9 - 15g',
    actions: ["Thanh can minh mục sáng mắt", "Bình can hạ áp", "Nhuận tràng thông tiện"],
    clinicalIndications: ["Đau mắt đỏ mắt mờ do Can hỏa", "Tăng huyết áp mỡ máu", "Táo bón mạn tính"],
    contraindications: 'Kỵ tỳ vị hư hàn tiêu chảy.',
    benskyNotes: 'Dan Bensky: Hạt muồng sao thơm làm sáng mắt hạ áp nhuận tràng.'
  },
  {
    id: 'gu-jing-cao',
    vietnameseName: 'Cốc tinh thảo',
    pinyinName: 'Gu Jing Cao',
    botanicalName: 'Flos Eriocauli',
    chineseCharacters: '谷精草',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Lương',
      flavors: ["Tân", "Cam"],
      channels: ["Can", "Phế"]
    },
    dosageGram: '6 - 12g',
    actions: ["Sơ tán phong nhiệt", "Thanh can minh mục mộng mắt"],
    clinicalIndications: ["Mộc mộng ở mắt, đục thủy tinh thể", "Đau mắt đỏ chảy nước mắt sống"],
    contraindications: 'Kỵ Can hư không có phong nhiệt.',
    benskyNotes: 'Dan Bensky: Bông hoa cốc tinh hoa thanh nhẹ chuyên trị mắt.'
  },
  {
    id: 'sheng-di-huang',
    vietnameseName: 'Sinh địa hoàng',
    pinyinName: 'Sheng Di Huang',
    botanicalName: 'Radix Rehmanniae',
    chineseCharacters: '生地黃',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hàn',
      flavors: ["Cam", "Khổ"],
      channels: ["Tâm", "Can", "Thận"]
    },
    dosageGram: '10 - 30g',
    actions: ["Thanh nhiệt lương huyết", "Dưỡng âm sinh tân chỉ khát", "Chỉ huyết cầm máu"],
    clinicalIndications: ["Sốt cao xâm nhập dinh huyết ban chẩn", "Đái tháo đường miệng khô", "Táo bón âm hư"],
    contraindications: 'Kỵ tỳ hư có thấp tiêu chảy.',
    benskyNotes: 'Dan Bensky: Sinh địa tư âm mát máu tuyệt vời.'
  },
  {
    id: 'xuan-shen',
    vietnameseName: 'Huyền sâm',
    pinyinName: 'Xuan Shen',
    botanicalName: 'Radix Scrophulariae',
    chineseCharacters: '玄參',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ["Khổ", "Cam", "Mặn"],
      channels: ["Phế", "Vị", "Thận"]
    },
    dosageGram: '9 - 15g',
    actions: ["Thanh nhiệt lương huyết", "Tư âm hạ hỏa", "Giải độc tán kết tiêu hạch"],
    clinicalIndications: ["Sốt cao huyết nhiệt mê cuồng", "Sưng hạch cổ viêm họng lở miệng", "Táo bón âm hư"],
    contraindications: 'Kỵ Lê Lô. Kỵ tỳ hư tiêu chảy.',
    benskyNotes: 'Dan Bensky: Rễ đen tuyền tư âm giải độc mát máu tiêu hạch.'
  },
  {
    id: 'mu-dan-pi',
    vietnameseName: 'Mẫu đơn bì',
    pinyinName: 'Mu Dan Pi',
    botanicalName: 'Cortex Moutan',
    chineseCharacters: '牡丹皮',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ["Khổ", "Tân"],
      channels: ["Tâm", "Can", "Thận"]
    },
    dosageGram: '6 - 12g',
    actions: ["Thanh nhiệt lương huyết", "Hoạt huyết khứ ứ", "Thanh ẩn nhiệt xương cốt"],
    clinicalIndications: ["Sốt về đêm sáng lui âm hư", "Bế kinh đau bụng kinh ứ huyết", "Chấn thương bầm ứ"],
    contraindications: 'Kỵ mang thai ra máu nhiều.',
    benskyNotes: 'Dan Bensky: Vỏ rễ mẫu đơn mát máu không gây trệ máu ứ.'
  },
  {
    id: 'chi-shao',
    vietnameseName: 'Xích thược',
    pinyinName: 'Chi Shao',
    botanicalName: 'Radix Paeoniae Rubra',
    chineseCharacters: '赤芍',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ["Khổ"],
      channels: ["Can"]
    },
    dosageGram: '6 - 12g',
    actions: ["Thanh nhiệt lương huyết", "Tán ứ chỉ thống"],
    clinicalIndications: ["Nôn ra máu chảy máu cam huyết nhiệt", "Đau tức sườn bụng ứ huyết", "Đau mắt đỏ mụn nhọt"],
    contraindications: 'Phản Lê lô (Thập bát phản); thận trọng âm hư huyết hư.',
    benskyNotes: 'Dan Bensky: Chuyên thanh Can hỏa và làm tan ứ máu mạnh.'
  },
  {
    id: 'zi-cao',
    vietnameseName: 'Tử thảo',
    pinyinName: 'Zi Cao',
    botanicalName: 'Radix Arnebiae',
    chineseCharacters: '紫草',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hàn',
      flavors: ["Cam", "Mặn"],
      channels: ["Tâm", "Gan"]
    },
    dosageGram: '3 - 9g',
    actions: ["Thanh nhiệt lương huyết", "Hoạt huyết thấu chẩn mọc ban", "Giải độc tiêu ung"],
    clinicalIndications: ["Thủy đậu, sởi mọc không thấu do huyết nhiệt", "Mề đay eczema, bỏng da"],
    contraindications: 'Kỵ tỳ hư tiêu chảy.',
    benskyNotes: 'Dan Bensky: Rễ màu tím thấu chẩn mọc ban và trị bỏng da.'
  },
  {
    id: 'di-gu-pi',
    vietnameseName: 'Địa cốt bì',
    pinyinName: 'Di Gu Pi',
    botanicalName: 'Cortex Lycii',
    chineseCharacters: '地骨皮',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hàn',
      flavors: ["Cam"],
      channels: ["Phế", "Thận"]
    },
    dosageGram: '9 - 15g',
    actions: ["Thanh nhiệt lương huyết", "Thanh hư nhiệt ở tủy xương", "Thanh Phế hỏa chỉ ho"],
    clinicalIndications: ["Sốt triều nhiệt âm hư mồ hôi trộm", "Ho ra máu do Phế nhiệt", "Đái tháo đường"],
    contraindications: 'Kỵ ngoại cảm phong hàn.',
    benskyNotes: 'Dan Bensky: Vỏ rễ kỷ tử dập tắt ngọn lửa hư nhiệt ẩn trong tủy xương.'
  },
  {
    id: 'shui-niu-jiao',
    vietnameseName: 'Thủy ngưu giác',
    pinyinName: 'Shui Niu Jiao',
    botanicalName: 'Cornu Bubali',
    chineseCharacters: '水牛角',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Rất hàn',
      flavors: ["Khổ", "Mặn"],
      channels: ["Tâm", "Can"]
    },
    dosageGram: '15 - 30g',
    actions: ["Thanh nhiệt lương huyết đại nhiệt", "Giải độc định kinh co giật", "Thay thế Tê giác"],
    clinicalIndications: ["Sốt cao mê cuồng xuất huyết ban chẩn", "Viêm màng não sốt co giật"],
    contraindications: 'Kỵ tỳ vị hư hàn; phụ nữ có thai dùng thận trọng.',
    benskyNotes: 'Dan Bensky 3rd Ed: Sừng trâu chính thức thay thế Tê giác bảo tồn hoang dã.'
  },
  {
    id: 'bai-wei',
    vietnameseName: 'Bạch vi',
    pinyinName: 'Bai Wei',
    botanicalName: 'Radix Cynanchi Atrati',
    chineseCharacters: '白薇',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ["Khổ", "Mặn"],
      channels: ["Can", "Vị", "Thận"]
    },
    dosageGram: '6 - 12g',
    actions: ["Thanh nhiệt lương huyết", "Lợi niệu thông lâm đái buốt", "Giải độc liệu mụn nhọt"],
    clinicalIndications: ["Sốt kéo dài sau sinh, sốt âm hư", "Viêm đường tiết niệu đái buốt đái máu"],
    contraindications: 'Kỵ tỳ vị hư hàn đại tiện lỏng.',
    benskyNotes: 'Dan Bensky: Rễ bạch vi mát máu mà không trệ kinh mạch.'
  },
  {
    id: 'huang-qin',
    vietnameseName: 'Hoàng cầm',
    pinyinName: 'Huang Qin',
    botanicalName: 'Radix Scutellariae',
    chineseCharacters: '黃芩',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hàn',
      flavors: ["Khổ"],
      channels: ["Phế", "Vị", "Đại tràng", "Đởm"]
    },
    dosageGram: '3 - 10g',
    actions: ["Thanh nhiệt táo thấp Phế Đại tràng", "Tả Phế hỏa ho đờm vàng", "Lương huyết an thai"],
    clinicalIndications: ["Viêm phế quản viêm phổi đờm vàng", "Mang thai huyết nhiệt thai động", "Tăng huyết áp Can hỏa"],
    contraindications: 'Kỵ Phế hàn hoặc tỳ vị hư hàn.',
    benskyNotes: 'Dan Bensky: Baicalin chống viêm ức chế Histamin, tả Phế hỏa thượng tiêu.'
  },
  {
    id: 'huang-lian',
    vietnameseName: 'Hoàng liên',
    pinyinName: 'Huang Lian',
    botanicalName: 'Rhizoma Coptidis',
    chineseCharacters: '黃連',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Rất hàn',
      flavors: ["Rất đắng"],
      channels: ["Tâm", "Vị", "Can", "Đại tràng"]
    },
    dosageGram: '2 - 6g',
    actions: ["Thanh nhiệt táo thấp trung tiêu", "Tả Tâm hỏa trừ phiền cuồng", "Giảm độc diệt lỵ"],
    clinicalIndications: ["Tiêu chảy mủ máu, lỵ trực trùng cấp", "Lở loét miệng lưỡi mất ngủ Tâm hỏa", "Đái tháo đường vị nhiệt"],
    contraindications: 'Rất đắng lạnh tổn tỳ vị.',
    benskyNotes: 'Dan Bensky: Berberine kháng khuẩn ruột cực rộng, tả Tâm hỏa Vị nhiệt độc.'
  },
  {
    id: 'huang-bai',
    vietnameseName: 'Hoàng bá',
    pinyinName: 'Huang Bai',
    botanicalName: 'Cortex Phellodendri',
    chineseCharacters: '黃柏',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hàn',
      flavors: ["Khổ"],
      channels: ["Thận", "Bàng quang"]
    },
    dosageGram: '3 - 10g',
    actions: ["Thanh nhiệt táo thấp hạ tiêu", "Tư âm hạ hỏa trừ tướng hỏa", "Giải độc mụn nhọt"],
    clinicalIndications: ["Viêm đường tiết niệu đái buốt khí hư vàng", "Thận âm hư triều nhiệt mồ hôi trộm", "Eczema mụn nhọt"],
    contraindications: 'Kỵ tỳ vị hư hàn.',
    benskyNotes: 'Dan Bensky: Dập bớt ngọn lửa tướng hỏa ở kinh Thận hạ tiêu.'
  },
  {
    id: 'long-dan-cao',
    vietnameseName: 'Long đởm thảo',
    pinyinName: 'Long Dan Cao',
    botanicalName: 'Radix Gentianae',
    chineseCharacters: '龍膽草',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Rất hàn',
      flavors: ["Rất đắng"],
      channels: ["Can", "Đởm"]
    },
    dosageGram: '3 - 6g',
    actions: ["Tả Can Đởm thực hỏa (Bài Long Đởm Tả Can Thang)", "Thanh nhiệt táo thấp hạ tiêu"],
    clinicalIndications: ["Viêm gan cấp vàng da mắt đỏ tai ù đắng miệng", "Khí hư màu vàng hôi ngứa âm đạo", "Co giật Can hỏa"],
    contraindications: 'Cấm tỳ vị hư hàn.',
    benskyNotes: 'Dan Bensky: Vị đắng lạnh tả ngọn lửa Can Đởm bùng phát cực kỳ mãnh liệt.'
  },
  {
    id: 'ku-shen',
    vietnameseName: 'Khổ sâm',
    pinyinName: 'Ku Shen',
    botanicalName: 'Radix Sophorae Flavescentis',
    chineseCharacters: '苦參',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hàn',
      flavors: ["Rất đắng"],
      channels: ["Tâm", "Can", "Vị", "Đại tràng", "Bàng quang"]
    },
    dosageGram: '6 - 12g',
    actions: ["Thanh nhiệt táo thấp", "Sát trùng chỉ ngứa eczema ngứa ngáy", "Lợi niệu"],
    clinicalIndications: ["Ngứa âm đạo eczema nấm da mề đay", "Lỵ trực trùng đái buốt"],
    contraindications: 'Phản Lê lô (Thập bát phản); cấm tỳ vị hư hàn.',
    benskyNotes: 'Dan Bensky: Rễ khổ sâm diệt nấm ngứa ngoài da và viêm âm đạo.'
  },
  {
    id: 'jin-yin-hua',
    vietnameseName: 'Kim ngân hoa',
    pinyinName: 'Jin Yin Hua',
    botanicalName: 'Flos Lonicerae',
    chineseCharacters: '金銀花',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hàn',
      flavors: ["Cam"],
      channels: ["Phế", "Vị", "Tâm"]
    },
    dosageGram: '10 - 20g',
    actions: ["Thanh nhiệt giải độc kháng sinh Đông y", "Tán phong nhiệt biểu", "Thanh nhiệt trừ lỵ"],
    clinicalIndications: ["Mụn nhọt áp xe viêm họng cấp", "Cảm phong nhiệt sốt cao đau họng", "Lỵ trực trùng nhiệt"],
    contraindications: 'Thận trọng tỳ vị hư hàn.',
    benskyNotes: 'Dan Bensky: Kháng sinh tự nhiên phổ rộng diệt tụ cầu và liên cầu trùng.'
  },
  {
    id: 'lian-qiao',
    vietnameseName: 'Liên kiều',
    pinyinName: 'Lian Qiao',
    botanicalName: 'Fructus Forsythiae',
    chineseCharacters: '連翹',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ["Khổ"],
      channels: ["Phế", "Tâm", "Đởm"]
    },
    dosageGram: '6 - 15g',
    actions: ["Thanh nhiệt giải độc tán kết", "Tán phong nhiệt thượng tiêu", "Thanh Tâm hỏa trừ phiền"],
    clinicalIndications: ["Hạch cổ, sưng tuyến vú, mụn nhọt", "Cảm sốt nổi ban ngứa", "Sốt cao mê loạn"],
    contraindications: 'Kỵ ung nhọt vỡ mủ.',
    benskyNotes: 'Dan Bensky: Đánh tan các khối sưng hạch bạch huyết nung mủ.'
  },
  {
    id: 'pu-gong-ying',
    vietnameseName: 'Bồ công anh',
    pinyinName: 'Pu Gong Ying',
    botanicalName: 'Herba Taraxaci',
    chineseCharacters: '蒲公英',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hàn',
      flavors: ["Khổ", "Cam"],
      channels: ["Can", "Vị"]
    },
    dosageGram: '10 - 30g',
    actions: ["Thanh nhiệt giải độc tiêu nhọt", "Thanh can sáng mắt", "Lợi thấp thông sữa"],
    clinicalIndications: ["Viêm tuyến vú sưng tắc sữa", "Viêm dạ dày viêm gan vàng da", "Đau mắt đỏ mụn nhọt"],
    contraindications: 'Kỵ tỳ vị hư hàn.',
    benskyNotes: 'Dan Bensky: Vị thuốc số 1 tiêu sưng tuyến vú và khơi thông tia sữa.'
  },
  {
    id: 'zi-hua-di-ding',
    vietnameseName: 'Tử hoa địa đinh',
    pinyinName: 'Zi Hua Di Ding',
    botanicalName: 'Herba Violae',
    chineseCharacters: '紫花地丁',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hàn',
      flavors: ["Khổ", "Tân"],
      channels: ["Can", "Tâm"]
    },
    dosageGram: '10 - 20g',
    actions: ["Thanh nhiệt giải độc tiêu nhọt độc", "Lương huyết tiêu thũng"],
    clinicalIndications: ["Mụn nhọt độc, nhọt mủ sưng đau đỏ rát", "Sưng hạch đinh nhọt độc"],
    contraindications: 'Kỵ thể ung nhọt hư hàn.',
    benskyNotes: 'Dan Bensky: Đặc trị nhọt đinh nhọt mủ sưng đau cấp tính.'
  },
  {
    id: 'ban-lan-gen',
    vietnameseName: 'Bản lam căn',
    pinyinName: 'Ban Lan Gen',
    botanicalName: 'Radix Isatidis',
    chineseCharacters: '板藍根',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hàn',
      flavors: ["Khổ"],
      channels: ["Tâm", "Phế", "Vị"]
    },
    dosageGram: '10 - 20g',
    actions: ["Thanh nhiệt giải độc kháng virus", "Lương huyết lợi yết sưng họng"],
    clinicalIndications: ["Cúm siêu vi, viêm họng cấp sưng đau, quai bị", "Sốt cao nổi ban mề đay"],
    contraindications: 'Kỵ tỳ vị hư hàn tiêu chảy.',
    benskyNotes: 'Dan Bensky: Kháng sinh & kháng virus cúm quai bị nổi tiếng Đông y.'
  },
  {
    id: 'chuan-xin-lian',
    vietnameseName: 'Xuyên tâm liên',
    pinyinName: 'Chuan Xin Lian',
    botanicalName: 'Herba Andrographitis',
    chineseCharacters: '穿心蓮',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hàn',
      flavors: ["Rất đắng"],
      channels: ["Phế", "Vị", "Đại tràng"]
    },
    dosageGram: '6 - 12g',
    actions: ["Thanh nhiệt giải độc kháng sinh", "Táo thấp chỉ tả"],
    clinicalIndications: ["Viêm họng cấp, viêm phế quản, viêm phổi", "Viêm ruột lỵ trực trùng"],
    contraindications: 'Dùng liều cao hại tỳ vị.',
    benskyNotes: 'Dan Bensky: Vị đắng xuyên tâm kháng khuẩn đường hô hấp & tiêu hóa.'
  },
  {
    id: 'yu-xing-cao',
    vietnameseName: 'Ngư tinh thảo',
    pinyinName: 'Yu Xing Cao',
    botanicalName: 'Herba Houttuyniae',
    chineseCharacters: '魚腥草',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ["Tân"],
      channels: ["Phế"]
    },
    dosageGram: '15 - 30g',
    actions: ["Thanh nhiệt giải độc tiêu mủ", "Lợi niệu thông lâm"],
    clinicalIndications: ["Phế áp xe ho ra mủ máu đờm hôi", "Viêm phế quản viêm đường tiết niệu"],
    contraindications: 'Kỵ phế hàn hư hàn.',
    benskyNotes: 'Dan Bensky: Rau diếp cá tiêu mủ phế áp xe và kháng khuẩn cực rộng.'
  },
  {
    id: 'bai-hua-she-she-cao',
    vietnameseName: 'Bạch hoa xà thiệt thảo',
    pinyinName: 'Bai Hua She She Cao',
    botanicalName: 'Herba Hedyotidis Diffusae',
    chineseCharacters: '白花蛇舌草',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hàn',
      flavors: ["Khổ", "Cam"],
      channels: ["Vị", "Đại tràng", "Tiểu tràng"]
    },
    dosageGram: '30 - 60g',
    actions: ["Thanh nhiệt giải độc tiêu u báng", "Lợi thấp bài thạch"],
    clinicalIndications: ["Hỗ trợ điều trị ung thư u xơ u lành", "Viêm ruột thừa cấp, viêm đường tiết niệu"],
    contraindications: 'Kỵ thai phụ.',
    benskyNotes: 'Dan Bensky: Thảo dược tiêu khối u và hỗ trợ ung thư nổi tiếng.'
  },
  {
    id: 'tu-fu-ling',
    vietnameseName: 'Thổ phục linh',
    pinyinName: 'Tu Fu Ling',
    botanicalName: 'Rhizoma Smilacis Glabrae',
    chineseCharacters: '土茯苓',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Bình',
      flavors: ["Cam", "Đạm"],
      channels: ["Gan", "Vị"]
    },
    dosageGram: '15 - 60g',
    actions: ["Giải độc trừ thấp", "Thông lợi khớp xương chỉ thống (Gout)", "Giải độc Thủy ngân"],
    clinicalIndications: ["Bệnh Gout cấp mạn tính sưng khớp", "Mụn nhọt giang mai eczema", "Giải độc kim loại nặng"],
    contraindications: 'Kỵ uống chung với Trà đặc.',
    benskyNotes: 'Dan Bensky: Vị thuốc số 1 đào thải Acid Uric điều trị bệnh Gout.'
  },
  {
    id: 'qing-hao',
    vietnameseName: 'Thanh hao',
    pinyinName: 'Qing Hao',
    botanicalName: 'Herba Artemisiae Annuae',
    chineseCharacters: '青蒿',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hàn',
      flavors: ["Khổ", "Tân"],
      channels: ["Can", "Đởm"]
    },
    dosageGram: '6 - 12g',
    actions: ["Thanh nhiệt giải thử", "Trừ âm hư phát nhiệt sốt về đêm", "Cắt cơn sốt rét (Artemisinin)"],
    clinicalIndications: ["Sốt rét cơn Artemisinin", "Sốt về đêm sáng lui âm hư", "Cảm nắng mùa hè"],
    contraindications: 'Kỵ tiêu chảy tỳ hư.',
    benskyNotes: 'Dan Bensky: Artemisinin đoạt giải Nobel y học cắt dứt ký sinh trùng sốt rét.'
  },
  {
    id: 'da-huang',
    vietnameseName: 'Đại hoàng',
    pinyinName: 'Da Huang',
    botanicalName: 'Rhei Radix et Rhizoma',
    chineseCharacters: '大黃',
    category: '3. Thuốc Tả Hạ (Downward-Draining)',
    properties: {
      nature: 'Hàn',
      flavors: ["Khổ"],
      channels: ["Tỳ", "Vị", "Can", "Tâm", "Đại tràng"]
    },
    dosageGram: '3 - 12g',
    actions: ["Tả hạ thông tiện mạnh", "Thanh nhiệt tả hỏa giải độc", "Hoạt huyết khứ ứ thông kinh"],
    clinicalIndications: ["Táo bón phân khô bế tắc sốt cao", "Nôn ra máu do hỏa bùng phát", "Chấn thương bầm ứ, bế kinh"],
    contraindications: 'Cấm phụ nữ mang thai, cho con bú, tỳ vị hư hàn.',
    benskyNotes: 'Dan Bensky: Anthraquinone kích thích nhu động đại tràng xả bế tắc nhiệt.'
  },
  {
    id: 'mang-xiao',
    vietnameseName: 'Mang tiêu',
    pinyinName: 'Mang Xiao',
    botanicalName: 'Natrii Sulfas',
    chineseCharacters: '芒硝',
    category: '3. Thuốc Tả Hạ (Downward-Draining)',
    properties: {
      nature: 'Rất hàn',
      flavors: ["Mặn", "Khổ"],
      channels: ["Vị", "Đại tràng"]
    },
    dosageGram: '6 - 12g',
    actions: ["Tả hạ nhuận phân", "Nhuận táo mộc kiên làm mềm phân cứng", "Thanh nhiệt tiêu thũng"],
    clinicalIndications: ["Táo bón kết vón phân cứng ngắc", "Sưng đau họng vú lở miệng"],
    contraindications: 'Úy Tam lăng (Thập cửu úy); cấm phụ nữ mang thai.',
    benskyNotes: 'Dan Bensky: Muối Natri Sulfat hút nước vào lòng ruột làm mềm phân tích tụ.'
  },
  {
    id: 'huo-ma-ren',
    vietnameseName: 'Hỏa ma nhân',
    pinyinName: 'Huo Ma Ren',
    botanicalName: 'Semen Cannabis',
    chineseCharacters: '火麻仁',
    category: '3. Thuốc Tả Hạ (Downward-Draining)',
    properties: {
      nature: 'Bình',
      flavors: ["Cam"],
      channels: ["Tỳ", "Vị", "Đại tràng"]
    },
    dosageGram: '9 - 15g',
    actions: ["Nhuận tràng thông tiện êm dịu", "Dưỡng âm bổ hư"],
    clinicalIndications: ["Táo bón mạn tính người già, phụ nữ sau sinh", "Âm hư tân dịch khô kiệt đại tiện khó"],
    contraindications: 'Thận trọng tiêu chảy lỏng.',
    benskyNotes: 'Dan Bensky: Hạt ma sa chứa dầu béo bôi trơn đường ruột êm ái.'
  },
  {
    id: 'fu-ling',
    vietnameseName: 'Phục linh',
    pinyinName: 'Fu Ling',
    botanicalName: 'Poria',
    chineseCharacters: '茯苓',
    category: '4. Thuốc Lợi Thủy Thẩm Thấp (Drain Dampness)',
    properties: {
      nature: 'Bình',
      flavors: ["Cam", "Đạm"],
      channels: ["Tâm", "Phế", "Tỳ", "Thận"]
    },
    dosageGram: '9 - 15g',
    actions: ["Lợi thủy thẩm thấp", "Kiện tỳ ích khí", "Ninh tâm an thần"],
    clinicalIndications: ["Phù thũng, tiểu tiện khó, tiểu đục", "Tỳ hư biếng ăn tiêu chảy phân lỏng", "Mất ngủ hồi hộp hay quên"],
    contraindications: 'Thận trọng niệu nhiều.',
    benskyNotes: 'Dan Bensky: Nấm Phục linh lợi thủy không làm tổn thương chính khí.'
  },
  {
    id: 'ze-xie',
    vietnameseName: 'Trạch tả',
    pinyinName: 'Ze Xie',
    botanicalName: 'Rhizoma Alismatis',
    chineseCharacters: '澤瀉',
    category: '4. Thuốc Lợi Thủy Thẩm Thấp (Drain Dampness)',
    properties: {
      nature: 'Hàn',
      flavors: ["Cam", "Đạm"],
      channels: ["Thận", "Bàng quang"]
    },
    dosageGram: '6 - 12g',
    actions: ["Lợi thủy thẩm thấp hạ tiêu", "Thanh nhiệt Thận kinh", "Hạ mỡ máu dịch thể"],
    clinicalIndications: ["Phù thũng, viêm đường tiết niệu, đái buốt", "Hoa mắt chóng mặt do đờm ẩm", "Tăng mỡ máu"],
    contraindications: 'Kỵ Thận hư hỏa suy.',
    benskyNotes: 'Dan Bensky: Thông rửa nhiệt thấp ở thận và hạ chỉ số mỡ máu.'
  },
  {
    id: 'yi-yi-ren',
    vietnameseName: 'Ý dĩ nhân',
    pinyinName: 'Yi Yi Ren',
    botanicalName: 'Semen Coicis',
    chineseCharacters: '薏苡仁',
    category: '4. Thuốc Lợi Thủy Thẩm Thấp (Drain Dampness)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ["Cam", "Đạm"],
      channels: ["Tỳ", "Vị", "Phế"]
    },
    dosageGram: '15 - 30g',
    actions: ["Lợi thủy thẩm thấp", "Kiện tỳ chỉ tả", "Trừ phong thấp đau khớp", "Thanh nhiệt bài nùng"],
    clinicalIndications: ["Phù thũng tiêu chảy tỳ hư", "Đau nhức cơ xương khớp thấp trệ", "Phế áp xe, mụn nhọt da"],
    contraindications: 'Thận trọng mang thai liều cao.',
    benskyNotes: 'Dan Bensky: Hạt ý dĩ kiện tỳ bài thấp êm dịu hàng ngày.'
  },
  {
    id: 'che-qian-zi',
    vietnameseName: 'Xa tiền tử',
    pinyinName: 'Che Qian Zi',
    botanicalName: 'Semen Plantaginis',
    chineseCharacters: '車前子',
    category: '4. Thuốc Lợi Thủy Thẩm Thấp (Drain Dampness)',
    properties: {
      nature: 'Hàn',
      flavors: ["Cam"],
      channels: ["Can", "Thận", "Phế", "Bàng quang"]
    },
    dosageGram: '9 - 15g',
    actions: ["Lợi thủy thông lâm đái buốt", "Thanh nhiệt Can minh mục", "Thanh phế hóa đờm chỉ tả"],
    clinicalIndications: ["Viêm bàng quang đái buốt đái dắt", "Đau mắt đỏ mắt mờ do Can nhiệt", "Tiêu chảy phân nước"],
    contraindications: 'Thận trọng Thận hư di tinh.',
    benskyNotes: 'Dan Bensky: Hạt mã đề bọc vải lợi đái mát Can sáng mắt cực nhanh.'
  },
  {
    id: 'jin-qian-cao',
    vietnameseName: 'Kim tiền thảo',
    pinyinName: 'Jin Qian Cao',
    botanicalName: 'Herba Desmodii Styracifolii',
    chineseCharacters: '金錢草',
    category: '4. Thuốc Lợi Thủy Thẩm Thấp (Drain Dampness)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ["Cam", "Đạm"],
      channels: ["Gan", "Đởm", "Thận", "Bàng quang"]
    },
    dosageGram: '15 - 60g',
    actions: ["Thanh nhiệt lợi thấp", "Thông lâm bài thạch (Thánh dược trị sỏi)", "Thanh gan lợi mật"],
    clinicalIndications: ["Sỏi thận, sỏi bàng quang, sỏi niệu quản đái buốt", "Sỏi mật, viêm gan vàng da"],
    contraindications: 'Thận trọng tỳ vị hư hàn lâu ngày.',
    benskyNotes: 'Dan Bensky: Vị thuốc hàng đầu bào mòn và tống khứ sỏi đường tiết niệu & mật.'
  },
  {
    id: 'yin-chen-hao',
    vietnameseName: 'Nhân trần hao',
    pinyinName: 'Yin Chen Hao',
    botanicalName: 'Herba Artemisiae Scopariae',
    chineseCharacters: '茵陳蒿',
    category: '4. Thuốc Lợi Thủy Thẩm Thấp (Drain Dampness)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ["Khổ", "Tân"],
      channels: ["Gan", "Đởm", "Tỳ", "Vị"]
    },
    dosageGram: '9 - 30g',
    actions: ["Thanh nhiệt lợi thấp", "Thanh Can lợi mật thoái hoàng (Trị vàng da)"],
    clinicalIndications: ["Viêm gan cấp & mạn tính vàng da mắt vàng", "Eczema ngứa ngứa thấp nhiệt"],
    contraindications: 'Kỵ vàng da do âm hàn.',
    benskyNotes: 'Dan Bensky: Vị thuốc chủ dược trị viêm gan vàng da thể thấp nhiệt.'
  },
  {
    id: 'du-huo',
    vietnameseName: 'Độc hoạt',
    pinyinName: 'Du Huo',
    botanicalName: 'Radix Angelicae Pubescentis',
    chineseCharacters: '獨活',
    category: '5. Thuốc Khu Phong Trừ Thấp (Dispel Wind-Dampness)',
    properties: {
      nature: 'Ôn',
      flavors: ["Tân", "Khổ"],
      channels: ["Thận", "Bàng quang"]
    },
    dosageGram: '3 - 10g',
    actions: ["Khứ phong trừ thấp hạ tiêu", "Chỉ thống đặc trị đau khớp háng gối lưng chân"],
    clinicalIndications: ["Viêm khớp thắt lưng cột sống thoái hóa", "Đau thần kinh tọa rễ thắt lưng"],
    contraindications: 'Thận trọng âm hư huyết hư.',
    benskyNotes: 'Dan Bensky: Chuyên biệt khu phong thấp nửa thân dưới.'
  },
  {
    id: 'wei-ling-xian',
    vietnameseName: 'Uy linh tiên',
    pinyinName: 'Wei Ling Xian',
    botanicalName: 'Radix et Rhizoma Clematidis',
    chineseCharacters: '威靈仙',
    category: '5. Thuốc Khu Phong Trừ Thấp (Dispel Wind-Dampness)',
    properties: {
      nature: 'Ôn',
      flavors: ["Tân", "Mặn"],
      channels: ["Bàng quang"]
    },
    dosageGram: '6 - 12g',
    actions: ["Khứ phong thấp thông kinh lạc chỉ thống", "Hóa hóc xương cá ở họng"],
    clinicalIndications: ["Đau nhức cơ xương khớp toàn thân", "Tê bì chân tay", "Hóc xương cá họng"],
    contraindications: 'Tránh dùng lâu gây hao khí huyết.',
    benskyNotes: 'Dan Bensky: Tính chất đả thông kinh lạc cực kỳ mãnh liệt.'
  },
  {
    id: 'sang-ji-sheng',
    vietnameseName: 'Tang ký sinh',
    pinyinName: 'Sang Ji Sheng',
    botanicalName: 'Herba Taxilli',
    chineseCharacters: '桑寄生',
    category: '5. Thuốc Khu Phong Trừ Thấp (Dispel Wind-Dampness)',
    properties: {
      nature: 'Bình',
      flavors: ["Khổ", "Cam"],
      channels: ["Can", "Thận"]
    },
    dosageGram: '9 - 15g',
    actions: ["Khứ phong thấp cường gân cốt", "Bổ can thận", "Dưỡng huyết an thai"],
    clinicalIndications: ["Đau lưng mỏi gối do Can Thận hư", "Tăng huyết áp người già", "Dọa sảy thai chảy máu thai kỳ"],
    contraindications: 'An hòa không có cấm kỵ.',
    benskyNotes: 'Dan Bensky: Tầm gửi cây dâu vừa khu phong thấp vừa bổ Can Thận an thai.'
  },
  {
    id: 'qian-nian-jian',
    vietnameseName: 'Thiên niên kiện',
    pinyinName: 'Qian Nian Jian',
    botanicalName: 'Rhizoma Homalomenae',
    chineseCharacters: '千年健',
    category: '5. Thuốc Khu Phong Trừ Thấp (Dispel Wind-Dampness)',
    properties: {
      nature: 'Ôn',
      flavors: ["Tân", "Khổ"],
      channels: ["Can", "Thận"]
    },
    dosageGram: '5 - 10g',
    actions: ["Khứ phong thấp cường gân cốt", "Giảm đau khớp người già"],
    clinicalIndications: ["Thoái hóa khớp gối, đau lưng mỏi gối chân tay co quắp", "Đau thần kinh ngoại biên"],
    contraindications: 'Kỵ âm hư hỏa vượng.',
    benskyNotes: 'Dan Bensky: Sức khỏe ngàn năm sưởi ấm gân gót gân cốt yếu suy.'
  },
  {
    id: 'ban-xia',
    vietnameseName: 'Bán hạ',
    pinyinName: 'Ban Xia',
    botanicalName: 'Rhizoma Pinelliae',
    chineseCharacters: '半夏',
    category: '6. Thuốc Hóa Đàm Chỉ Khái Bình Suyễn (Transform Phlegm & Relieve Cough)',
    properties: {
      nature: 'Ôn (Độc khi sống)',
      flavors: ["Tân"],
      channels: ["Tỳ", "Vị", "Phế"]
    },
    dosageGram: '4.5 - 9g',
    actions: ["Táo thấp hóa đờm", "Giáng nghịch chỉ ẩu cắt nôn trào ngược", "Tiêu nán tán kết"],
    clinicalIndications: ["Ho đờm trắng lỏng nhiều", "Buồn nôn nôn mửa trào ngược GERD", "Vướng nghẹn cổ họng Mai hạch khí"],
    contraindications: 'Phản Ô đầu, Phụ tử (Thập bát phản); cấm Bán Hạ sống; kỵ ho khô âm hư; phụ nữ có thai dùng thận trọng.',
    benskyNotes: 'Dan Bensky: Bán hạ chế gừng dập nôn trào ngược dạ dày và đờm ẩm cực hay.'
  },
  {
    id: 'jie-geng',
    vietnameseName: 'Cát cánh',
    pinyinName: 'Jie Geng',
    botanicalName: 'Radix Platycodonis',
    chineseCharacters: '桔梗',
    category: '6. Thuốc Hóa Đàm Chỉ Khái Bình Suyễn (Transform Phlegm & Relieve Cough)',
    properties: {
      nature: 'Bình',
      flavors: ["Tân", "Khổ"],
      channels: ["Phế"]
    },
    dosageGram: '3 - 9g',
    actions: ["Tuyên phế khứ đờm chỉ ho", "Lợi yết khai âm thông giọng", "Dẫn thuốc đi lên thượng tiêu Phế"],
    clinicalIndications: ["Ho đờm khó khạc khàn tiếng sưng họng", "Phế áp xe ho ra mủ máu"],
    contraindications: 'Kỵ ho ra máu do Âm hư hỏa vượng.',
    benskyNotes: 'Dan Bensky: Thuyền chở thuốc dẫn toàn bộ phương thang lên Phế.'
  },
  {
    id: 'chuan-bei-mu',
    vietnameseName: 'Xuyên bối mẫu',
    pinyinName: 'Chuan Bei Mu',
    botanicalName: 'Bulbus Fritillariae Cirrhosae',
    chineseCharacters: '川貝母',
    category: '6. Thuốc Hóa Đàm Chỉ Khái Bình Suyễn (Transform Phlegm & Relieve Cough)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ["Cam", "Khổ"],
      channels: ["Phế", "Tâm"]
    },
    dosageGram: '3 - 9g',
    actions: ["Nhuận phế hóa đờm chỉ ho", "Thanh nhiệt tán kết tiêu hạch"],
    clinicalIndications: ["Ho khô lâu ngày ho lao phế nhiệt đờm dính", "Sưng hạch cổ u tuyến vú"],
    contraindications: 'Kỵ ho đờm hàn. Kỵ Ô Đầu Phụ Tử.',
    benskyNotes: 'Dan Bensky: Rễ nhỏ tròn quý giá nhuận Phế dập ho khô xuất sắc.'
  },
  {
    id: 'xing-ren',
    vietnameseName: 'Hạnh nhân',
    pinyinName: 'Xing Ren',
    botanicalName: 'Semen Armeniacae',
    chineseCharacters: '杏仁',
    category: '6. Thuốc Hóa Đàm Chỉ Khái Bình Suyễn (Transform Phlegm & Relieve Cough)',
    properties: {
      nature: 'Hơi ôn (Độc nhẹ)',
      flavors: ["Khổ"],
      channels: ["Phế", "Đại tràng"]
    },
    dosageGram: '3 - 9g',
    actions: ["Chỉ khái bình suyễn dập ho cắt hen", "Nhuận tràng thông tiện"],
    clinicalIndications: ["Ho do mọi nguyên nhân", "Hen phế quản", "Táo bón người già"],
    contraindications: 'Không dùng liều quá cao.',
    benskyNotes: 'Dan Bensky: Amygdalin ức chế trung tâm ho ở não bộ, giáng phế khí.'
  },
  {
    id: 'bai-bu',
    vietnameseName: 'Bách bộ',
    pinyinName: 'Bai Bu',
    botanicalName: 'Radix Stemonae',
    chineseCharacters: '百部',
    category: '6. Thuốc Hóa Đàm Chỉ Khái Bình Suyễn (Transform Phlegm & Relieve Cough)',
    properties: {
      nature: 'Hơi ôn',
      flavors: ["Cam", "Khổ"],
      channels: ["Phế"]
    },
    dosageGram: '3 - 9g',
    actions: ["Ôn phế nhuận phế chỉ ho", "Sát trùng diệt giung kim diệt chấy rận"],
    clinicalIndications: ["Ho lao, ho gà ho dai dẳng mạn tính", "Ngứa da chấy rận giun kim"],
    contraindications: 'Thận trọng tỳ hư tiêu chảy.',
    benskyNotes: 'Dan Bensky: Vị thuốc đặc trị ho gà và ho lao kéo dài lâu năm.'
  },
  {
    id: 'cang-zhu',
    vietnameseName: 'Thương truật',
    pinyinName: 'Cang Zhu',
    botanicalName: 'Rhizoma Atractylodis',
    chineseCharacters: '蒼朮',
    category: '7. Thuốc Phương Hương Hóa Thấp (Aromatic Transform Dampness)',
    properties: {
      nature: 'Ôn',
      flavors: ["Tân", "Khổ"],
      channels: ["Tỳ", "Vị"]
    },
    dosageGram: '3 - 9g',
    actions: ["Táo thấp kiện tỳ mạnh", "Khứ phong thấp chỉ thống", "Minh mục trị quáng gà"],
    clinicalIndications: ["Bụng trướng đầy tiêu chảy đờm thấp", "Đau nhức xương khớp thấp trệ", "Quáng gà thị lực kém"],
    contraindications: 'Kỵ âm hư mồ hôi nhiều.',
    benskyNotes: 'Dan Bensky: Mùi thơm hăng cay làm khô ráo đờm thấp trung tiêu.'
  },
  {
    id: 'hou-po',
    vietnameseName: 'Hậu phác',
    pinyinName: 'Hou Po',
    botanicalName: 'Cortex Magnoliae Officinalis',
    chineseCharacters: '厚樸',
    category: '7. Thuốc Phương Hương Hóa Thấp (Aromatic Transform Dampness)',
    properties: {
      nature: 'Ôn',
      flavors: ["Khổ", "Tân"],
      channels: ["Tỳ", "Vị", "Phế", "Đại tràng"]
    },
    dosageGram: '3 - 9g',
    actions: ["Hành khí tiêu trướng", "Táo thấp hóa đờm", "Giáng nghịch bình suyễn"],
    clinicalIndications: ["Bụng trướng đau bế tắc phân tích tụ", "Ho hen đờm nhiều trào ngược Vị khí"],
    contraindications: 'Phụ nữ mang thai dùng cẩn trọng.',
    benskyNotes: 'Dan Bensky: Vỏ hậu phác đả thông khí trệ gây trướng bụng chật chội.'
  },
  {
    id: 'huo-xiang',
    vietnameseName: 'Hoắc hương',
    pinyinName: 'Huo Xiang',
    botanicalName: 'Herba Pogostemonis',
    chineseCharacters: '藿香',
    category: '7. Thuốc Phương Hương Hóa Thấp (Aromatic Transform Dampness)',
    properties: {
      nature: 'Hơi ôn',
      flavors: ["Tân"],
      channels: ["Tỳ", "Vị", "Phế"]
    },
    dosageGram: '3 - 9g',
    actions: ["Hóa thấp hòa trung", "Giải thử giải biểu", "Chỉ ẩu dập nôn mửa"],
    clinicalIndications: ["Cảm nắng cảm thấp mùa hè nôn mửa tiêu chảy", "Sốt phiền rạo rực nôn nao"],
    contraindications: 'Thận trọng âm hư nhiệt trệ.',
    benskyNotes: 'Dan Bensky: Mùi thơm tươi mát giải cảm thấp mùa hè và dập nôn mửa.'
  },
  {
    id: 'sha-ren',
    vietnameseName: 'Sa nhân',
    pinyinName: 'Sha Ren',
    botanicalName: 'Fructus Amomi',
    chineseCharacters: '砂仁',
    category: '7. Thuốc Phương Hương Hóa Thấp (Aromatic Transform Dampness)',
    properties: {
      nature: 'Ôn',
      flavors: ["Tân"],
      channels: ["Tỳ", "Vị", "Thận"]
    },
    dosageGram: '3 - 6g',
    actions: ["Hóa thấp hành khí", "Ôn trung chỉ tả dập tiêu chảy", "An thai gia vị"],
    clinicalIndications: ["Bụng trướng đau tiêu chảy lạnh bụng", "Thai động nghén nôn mửa"],
    contraindications: 'Kỵ âm hư nội nhiệt.',
    benskyNotes: 'Dan Bensky: Hạt sa nhân thơm nồng ấm vị an thai dập nôn nghén.'
  },
  {
    id: 'shan-zha',
    vietnameseName: 'Sơn tra',
    pinyinName: 'Shan Zha',
    botanicalName: 'Fructus Crataegi',
    chineseCharacters: '山楂',
    category: '8. Thuốc Tiêu Đạo (Relieve Food Stagnation)',
    properties: {
      nature: 'Hơi ôn',
      flavors: ["Toan", "Cam"],
      channels: ["Tỳ", "Vị", "Can"]
    },
    dosageGram: '9 - 15g',
    actions: ["Tiêu thực hóa tích đặc trị thịt thà mỡ", "Hoạt huyết khứ ứ", "Hạ mỡ máu huyết áp"],
    clinicalIndications: ["Ăn uống bội thực thịt thà đau bụng tiêu chảy", "Tăng mỡ máu xơ vữa động mạch", "Đau bụng kinh ứ huyết"],
    contraindications: 'Kỵ viêm loét dạ dày tăng tiết acid.',
    benskyNotes: 'Dan Bensky: Enzyme lipolytic cắt nhỏ mỡ thịt béo ngậy.'
  },
  {
    id: 'shen-qu',
    vietnameseName: 'Thần khúc',
    pinyinName: 'Shen Qu',
    botanicalName: 'Massa Medicata Fermentata',
    chineseCharacters: '神麴',
    category: '8. Thuốc Tiêu Đạo (Relieve Food Stagnation)',
    properties: {
      nature: 'Ôn',
      flavors: ["Cam", "Tân"],
      channels: ["Tỳ", "Vị"]
    },
    dosageGram: '6 - 15g',
    actions: ["Tiêu thực hòa vị", "Lý khí tiêu trướng"],
    clinicalIndications: ["Chậm tiêu đầy bụng do ăn uống ngũ cốc đồ nếp", "Tiêu chảy phân sống"],
    contraindications: 'Kỵ vị nhiệt khô rát.',
    benskyNotes: 'Dan Bensky: Bánh men thảo dược tiêu hóa thức ăn tinh bột đình trệ.'
  },
  {
    id: 'mai-ya',
    vietnameseName: 'Mạch nha',
    pinyinName: 'Mai Ya',
    botanicalName: 'Fructus Hordei Germinatus',
    chineseCharacters: '麥芽',
    category: '8. Thuốc Tiêu Đạo (Relieve Food Stagnation)',
    properties: {
      nature: 'Bình',
      flavors: ["Cam"],
      channels: ["Tỳ", "Vị", "Can"]
    },
    dosageGram: '9 - 15g',
    actions: ["Tiêu thực hòa trung đặc trị tinh bột", "Sơ can tiêu trướng", "Thôi nhũ cắt sữa cai sữa"],
    clinicalIndications: ["Bội thực cơm cháo tinh bột", "Cai sữa phụ nữ trướng đau tuyến vú", "Can vị bất hòa"],
    contraindications: 'Phụ nữ cho con bú không dùng liều cao.',
    benskyNotes: 'Dan Bensky: Amylase nảy mầm tiêu hóa carbohydrate tinh bột.'
  },
  {
    id: 'ji-nei-jin',
    vietnameseName: 'Kê nội kim',
    pinyinName: 'Ji Nei Jin',
    botanicalName: 'Endothelium Corneum Gigeriae Galli',
    chineseCharacters: '雞內金',
    category: '8. Thuốc Tiêu Đạo (Relieve Food Stagnation)',
    properties: {
      nature: 'Bình',
      flavors: ["Cam"],
      channels: ["Tỳ", "Vị", "Tiểu tràng", "Bàng quang"]
    },
    dosageGram: '3 - 9g',
    actions: ["Mạnh tỳ tiêu tích hóa sỏi sỏi mật sỏi thận", "Cố sáp chỉ di niệu"],
    clinicalIndications: ["Tích trệ thức ăn bụng cứng đờ", "Sỏi thận sỏi mật bào mòn", "Trẻ em đái dầm"],
    contraindications: 'An hòa không cấm kỵ.',
    benskyNotes: 'Dan Bensky: Màng mề gà chọi tiêu hóa mọi thức ăn bế tắc và bào mòn sỏi.'
  },
  {
    id: 'chen-pi',
    vietnameseName: 'Trần bì',
    pinyinName: 'Chen Pi',
    botanicalName: 'Pericarpium Citri Reticulatae',
    chineseCharacters: '陳皮',
    category: '9. Thuốc Lý Khí (Regulate Qi)',
    properties: {
      nature: 'Ôn',
      flavors: ["Tân", "Khổ"],
      channels: ["Tỳ", "Phế"]
    },
    dosageGram: '3 - 10g',
    actions: ["Lý khí kiện tỳ", "Táo thấp hóa đờm", "Giáng nghịch chỉ ẩu"],
    clinicalIndications: ["Bụng đầy trướng ợ hơi chậm tiêu", "Ho đờm dính đặc béo ngậy", "Buồn nôn do Tỳ hư"],
    contraindications: 'Thận trọng ho khô âm hư.',
    benskyNotes: 'Dan Bensky: Vỏ quýt cổ càng lâu năm tinh dầu càng êm mát điều hòa khí.'
  },
  {
    id: 'xiang-fu',
    vietnameseName: 'Hương phụ',
    pinyinName: 'Xiang Fu',
    botanicalName: 'Rhizoma Cyperi',
    chineseCharacters: '香附',
    category: '9. Thuốc Lý Khí (Regulate Qi)',
    properties: {
      nature: 'Bình',
      flavors: ["Tân", "Khổ", "Cam"],
      channels: ["Can", "Tam tiêu"]
    },
    dosageGram: '6 - 12g',
    actions: ["Sơ can giải uất Nữ khoa chủ dược", "Lý khí điều kinh", "Vị quản chỉ thống"],
    clinicalIndications: ["Can khí uất trệ: Đau căng vú, đau bụng kinh", "Đau dạ dày co thắt do căng thẳng", "Kinh nguyệt không đều"],
    contraindications: 'Thận trọng âm hư huyết nhiệt.',
    benskyNotes: 'Dan Bensky: Nữ khoa thánh dược giải tỏa uất nghẹn ngực sườn Can khí.'
  },
  {
    id: 'mu-xiang',
    vietnameseName: 'Mộc hương',
    pinyinName: 'Mu Xiang',
    botanicalName: 'Radix Aucklandiae',
    chineseCharacters: '木香',
    category: '9. Thuốc Lý Khí (Regulate Qi)',
    properties: {
      nature: 'Ôn',
      flavors: ["Tân", "Khổ"],
      channels: ["Tỳ", "Vị", "Đại tràng", "Đởm"]
    },
    dosageGram: '3 - 9g',
    actions: ["Hành khí chỉ thống đặc trị đau ruột dạ dày", "Kiện tỳ tiêu tích"],
    clinicalIndications: ["Đau bụng trướng mót rượt đi ngoài", "Đau dạ dày co thắt khí trệ", "Ăn chậm tiêu"],
    contraindications: 'Thận trọng âm hư mồ hôi nhiều.',
    benskyNotes: 'Dan Bensky: Đả thông khí trệ đường ruột cắt dứt cơn mót rượt đi ngoài.'
  },
  {
    id: 'zhi-shi',
    vietnameseName: 'Chỉ thực',
    pinyinName: 'Zhi Shi',
    botanicalName: 'Fructus Aurantii Immaturus',
    chineseCharacters: '枳實',
    category: '9. Thuốc Lý Khí (Regulate Qi)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ["Khổ", "Tân"],
      channels: ["Tỳ", "Vị", "Đại tràng"]
    },
    dosageGram: '3 - 9g',
    actions: ["Phá khí tiêu tích mạnh", "Hóa đờm trừ trướng đầy"],
    clinicalIndications: ["Táo bón bế tắc phân cứng bụng trướng căng", "Tỳ hư trệ tích tụ đồ ăn"],
    contraindications: 'Cấm phụ nữ mang thai.',
    benskyNotes: 'Dan Bensky: Vỏ cam non phá tan khối bế tắc trướng bụng cứng đờ.'
  },
  {
    id: 'chuan-xiong',
    vietnameseName: 'Xuyên khung',
    pinyinName: 'Chuan Xiong',
    botanicalName: 'Rhizoma Chuanxiong',
    chineseCharacters: '川芎',
    category: '10. Thuốc Lý Huyết (Regulate Blood)',
    properties: {
      nature: 'Ôn',
      flavors: ["Tân"],
      channels: ["Can", "Đởm", "Tâm bào"]
    },
    dosageGram: '3 - 10g',
    actions: ["Hoạt huyết hành khí", "Khứ phong chỉ thống thánh dược đau đầu"],
    clinicalIndications: ["Đau đầu nửa đầu, đau gáy cổ", "Bế kinh, đau bụng kinh sản hậu ứ huyết", "Đau nhức cơ xương khớp"],
    contraindications: 'Cấm xuất huyết cấp, mang thai liều cao.',
    benskyNotes: 'Dan Bensky: Thấu đạt lên đỉnh đầu xuống bàn chân, thông tuần hoàn máu brain.'
  },
  {
    id: 'dan-shen',
    vietnameseName: 'Đan sâm',
    pinyinName: 'Dan Shen',
    botanicalName: 'Radix Salviae Miltiorrhizae',
    chineseCharacters: '丹參',
    category: '10. Thuốc Lý Huyết (Regulate Blood)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ["Khổ"],
      channels: ["Tâm", "Can"]
    },
    dosageGram: '9 - 15g',
    actions: ["Hoạt huyết khứ ứ", "Lương huyết tiêu thũng", "An thần"],
    clinicalIndications: ["Đau thắt ngực xơ vữa động mạch vành", "Rối loạn kinh nguyệt u xơ tử cung", "Mất ngủ hồi hộp do huyết nhiệt"],
    contraindications: 'Kỵ Lê Lô. Thận trọng thuốc chống đông.',
    benskyNotes: 'Dan Bensky: Tanshinone IIA giãn động mạch vành bảo vệ cơ tim.'
  },
  {
    id: 'san-qi',
    vietnameseName: 'Tam thất',
    pinyinName: 'San Qi',
    botanicalName: 'Radix Notoginseng',
    chineseCharacters: '三七',
    category: '10. Thuốc Lý Huyết (Regulate Blood)',
    properties: {
      nature: 'Hơi ôn',
      flavors: ["Cam", "Khổ"],
      channels: ["Can", "Vị"]
    },
    dosageGram: '3 - 9g',
    actions: ["Hóa ứ cầm máu không gây trệ ứ", "Tiêu thũng định thống tức thì", "Bổ huyết sinh huyết mới"],
    clinicalIndications: ["Xuất huyết tiêu hóa, ho ra máu, chấn thương bầm", "Đau thắt ngực", "Suy nhược sản hậu u xơ tử cung"],
    contraindications: 'Cấm phụ nữ mang thai.',
    benskyNotes: 'Dan Bensky: Ginsenosides cầm máu vừa tan cục máu đông kỳ diệu.'
  },
  {
    id: 'tao-ren',
    vietnameseName: 'Đào nhân',
    pinyinName: 'Tao Ren',
    botanicalName: 'Semen Persicae',
    chineseCharacters: '桃仁',
    category: '10. Thuốc Lý Huyết (Regulate Blood)',
    properties: {
      nature: 'Bình',
      flavors: ["Khổ", "Cam"],
      channels: ["Tâm", "Gan", "Phế", "Đại tràng"]
    },
    dosageGram: '6 - 10g',
    actions: ["Hoạt huyết khứ ứ mạnh", "Nhuận tràng thông tiện", "Chỉ ho bình suyễn"],
    clinicalIndications: ["Bế kinh, đau bụng kinh tích tụ khối u ứ huyết", "Táo bón khô ruột người già", "Chấn thương chấn thương dập bầm"],
    contraindications: 'Cấm phụ nữ mang thai.',
    benskyNotes: 'Dan Bensky: Hạt đào phá tan khối huyết ứ cứng ngắc ở hạ tiêu.'
  },
  {
    id: 'hong-hua',
    vietnameseName: 'Hồng hoa',
    pinyinName: 'Hong Hua',
    botanicalName: 'Flos Carthami',
    chineseCharacters: '紅花',
    category: '10. Thuốc Lý Huyết (Regulate Blood)',
    properties: {
      nature: 'Ôn',
      flavors: ["Tân"],
      channels: ["Tâm", "Can"]
    },
    dosageGram: '3 - 9g',
    actions: ["Hoạt huyết thông kinh", "Khứ ứ chỉ thống giảm đau"],
    clinicalIndications: ["Kinh nguyệt bế tắc, đau bụng kinh dữ dội", "Đau thắt ngực nhồi máu cơ tim", "Chấn thương bầm tím"],
    contraindications: 'Cấm phụ nữ mang thai và ra máu nhiều.',
    benskyNotes: 'Dan Bensky: Phối hợp Đào Nhân thành cặp đôi Đào Hồng thông kinh khứ ứ.'
  },
  {
    id: 'niu-xi',
    vietnameseName: 'Ngưu tất',
    pinyinName: 'Niu Xi',
    botanicalName: 'Radix Achyranthis Bidentatae',
    chineseCharacters: '牛膝',
    category: '10. Thuốc Lý Huyết (Regulate Blood)',
    properties: {
      nature: 'Bình',
      flavors: ["Khổ", "Mặn"],
      channels: ["Can", "Thận"]
    },
    dosageGram: '6 - 12g',
    actions: ["Bổ can thận cường gân cốt", "Hoạt huyết thông kinh", "Dẫn huyết hạ hành hạ áp hạ đường"],
    clinicalIndications: ["Đau lưng mỏi gối gân cốt yếu", "Tăng huyết áp bốc hỏa, chảy máu cam", "Đau bụng kinh bế kinh"],
    contraindications: 'Cấm phụ nữ mang thai.',
    benskyNotes: 'Dan Bensky: Kéo ngọn lửa hỏa vượng từ đầu xuống bàn chân.'
  },
  {
    id: 'yi-mu-cao',
    vietnameseName: 'Ích mẫu thảo',
    pinyinName: 'Yi Mu Cao',
    botanicalName: 'Herba Leonuri',
    chineseCharacters: '益母草',
    category: '10. Thuốc Lý Huyết (Regulate Blood)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ["Khổ", "Tân"],
      channels: ["Tâm", "Can", "Bàng quang"]
    },
    dosageGram: '9 - 30g',
    actions: ["Hoạt huyết điều kinh thánh dược sản khoa", "Lợi thủy tiêu thũng"],
    clinicalIndications: ["Rối loạn kinh nguyệt bế kinh sản hậu dịch ứ", "Phù thũng viêm thận cấp"],
    contraindications: 'Cấm thai phụ.',
    benskyNotes: 'Dan Bensky: Thảo dược số 1 tống khứ máu sản dịch sau sinh.'
  },
  {
    id: 'fu-zi',
    vietnameseName: 'Phụ tử',
    pinyinName: 'Fu Zi',
    botanicalName: 'Radix Aconiti Lateralis Praeparata',
    chineseCharacters: '附子',
    category: '11. Thuốc Ôn Lý Trừ Hàn (Warm Interior & Expel Cold)',
    properties: {
      nature: 'Rất nhiệt (Độc)',
      flavors: ["Tân", "Khổ"],
      channels: ["Tâm", "Thận", "Tỳ"]
    },
    dosageGram: '3 - 15g',
    actions: ["Hồi dương cứu nghịch", "Bổ hỏa trợ dương", "Tán hàn chỉ thống"],
    clinicalIndications: ["Chân tay lạnh ngắt thoát dương cấp", "Thận dương hư suy đau lưng sợ lạnh liệt dương", "Đau khớp gối lạnh nhức"],
    contraindications: 'Phản Bán hạ, Qua lâu, Bối mẫu, Bạch liễm, Bạch cập (Thập bát phản); cấm phụ nữ mang thai, chân nhiệt giả hàn.',
    benskyNotes: 'Dan Bensky: Aconitine trong Phụ tử chế giải phóng ngọn lửa Mệnh môn hỏa.'
  },
  {
    id: 'rou-gui',
    vietnameseName: 'Nhục quế',
    pinyinName: 'Rou Gui',
    botanicalName: 'Cortex Cinnamomi',
    chineseCharacters: '肉桂',
    category: '11. Thuốc Ôn Lý Trừ Hàn (Warm Interior & Expel Cold)',
    properties: {
      nature: 'Rất nhiệt',
      flavors: ["Tân", "Cam"],
      channels: ["Thận", "Tỳ", "Tâm", "Can"]
    },
    dosageGram: '1 - 4.5g',
    actions: ["Bổ Mệnh môn hỏa trợ dương", "Ôn trung chỉ thống", "Dẫn hỏa quy nguyên"],
    clinicalIndications: ["Liệt dương tử cung lạnh đại tiện lỏng sáng sớm", "Đau bụng lạnh cuộn nôn mửa", "Hư hỏa bốc lên lở miệng chân lạnh"],
    contraindications: 'Úy Xích thạch chi (Thập cửu úy); cấm phụ nữ mang thai, âm hư hỏa vượng.',
    benskyNotes: 'Dan Bensky: Tinh dầu Cinnamaldehyde sưởi ấm vùng hạ tiêu Mệnh môn hỏa.'
  },
  {
    id: 'gan-jiang',
    vietnameseName: 'Can khương',
    pinyinName: 'Gan Jiang',
    botanicalName: 'Rhizoma Zingiberis',
    chineseCharacters: '干姜',
    category: '11. Thuốc Ôn Lý Trừ Hàn (Warm Interior & Expel Cold)',
    properties: {
      nature: 'Rất nhiệt',
      flavors: ["Tân"],
      channels: ["Tỳ", "Vị", "Tâm", "Phế"]
    },
    dosageGram: '3 - 10g',
    actions: ["Ôn trung khứ hàn ấm tỳ vị", "Hồi dương thông mạch", "Ôn phế hóa đàm ẩm ho lạnh"],
    clinicalIndications: ["Đau bụng lạnh cuộn tiêu chảy phân lỏng", "Chân tay lạnh ngắt mạch vi", "Ho đờm lỏng trắng như nước"],
    contraindications: 'Kỵ âm hư nội nhiệt, xuất huyết.',
    benskyNotes: 'Dan Bensky: Củ gừng khô sưởi ấm toàn bộ vùng bụng trung tiêu tỳ vị.'
  },
  {
    id: 'wu-zhu-yu',
    vietnameseName: 'Ngô thù du',
    pinyinName: 'Wu Zhu Yu',
    botanicalName: 'Fructus Evodiae',
    chineseCharacters: '吳茱萸',
    category: '11. Thuốc Ôn Lý Trừ Hàn (Warm Interior & Expel Cold)',
    properties: {
      nature: 'Rất nhiệt (Độc nhẹ)',
      flavors: ["Tân", "Khổ"],
      channels: ["Can", "Tỳ", "Vị", "Thận"]
    },
    dosageGram: '2 - 5g',
    actions: ["Tán hàn chỉ thống", "Giáng nghịch chỉ ẩu dập nôn chua", "Trợ dương chỉ tả"],
    clinicalIndications: ["Đau đầu đỉnh đầu Quyết âm", "Trào ngược dạ dày nôn ra nước chua", "Tiêu chảy Ngũ canh tả sáng sớm"],
    contraindications: 'Kỵ âm hư nội nhiệt.',
    benskyNotes: 'Dan Bensky: Dập tắt cơn trào ngược nước chua dạ dày cực mạnh.'
  },
  {
    id: 'ren-shen',
    vietnameseName: 'Nhân sâm',
    pinyinName: 'Ren Shen',
    botanicalName: 'Radix et Rhizoma Ginseng',
    chineseCharacters: '人參',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Hơi ôn',
      flavors: ["Cam", "Hơi đắng"],
      channels: ["Tỳ", "Phế", "Tâm"]
    },
    dosageGram: '3 - 9g',
    actions: ["Đại bổ nguyên khí", "Bổ tỳ ích phế", "Sinh tân chỉ khát", "An thần ích trí"],
    clinicalIndications: ["Kiệt sức mạch vi vã mồ hôi", "Suy nhược cơ thể kéo dài", "Đái tháo đường liệt dương"],
    contraindications: 'Phản Lê lô (Thập bát phản); úy Ngũ linh chi (Thập cửu úy); cấm thực nhiệt, cảm mạo, cao huyết áp kịch phát.',
    benskyNotes: 'Dan Bensky: Ginsenosides đại bổ sức sống toàn thân.'
  },
  {
    id: 'xi-yang-shen',
    vietnameseName: 'Tây dương sâm',
    pinyinName: 'Xi Yang Shen',
    botanicalName: 'Radix Panacis Quinquefolii',
    chineseCharacters: '西洋參',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Mát (Lương)',
      flavors: ["Cam", "Hơi khổ"],
      channels: ["Tâm", "Phế", "Thận"]
    },
    dosageGram: '3 - 6g',
    actions: ["Bổ khí dưỡng âm", "Thanh hỏa sinh tân chỉ khát"],
    clinicalIndications: ["Suy nhược cơ thể kèm bốc hỏa ho khô khát nước", "Tiểu đường sốt lâu ngày mất sức"],
    contraindications: 'Kỵ tỳ vị hư hàn tiêu chảy.',
    benskyNotes: 'Dan Bensky: Sâm Bắc Mỹ bổ khí mà không gây nóng bốc hỏa.'
  },
  {
    id: 'dang-shen',
    vietnameseName: 'Đảng sâm',
    pinyinName: 'Dang Shen',
    botanicalName: 'Radix Codonopsis',
    chineseCharacters: '黨參',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Bình',
      flavors: ["Cam"],
      channels: ["Tỳ", "Phế"]
    },
    dosageGram: '9 - 30g',
    actions: ["Bổ trung ích khí", "Kiện tỳ ích phế", "Dưỡng huyết sinh tân"],
    clinicalIndications: ["Tỳ vị hư yếu thở ngắn mệt mỏi", "Thiếu máu da xanh xao", "Khát nước âm hư"],
    contraindications: 'Phản Lê lô (Thập bát phản); kỵ thực chứng nhiệt.',
    benskyNotes: 'Dan Bensky: Thay thế Nhân Sâm êm dịu hàng ngày.'
  },
  {
    id: 'huang-qi',
    vietnameseName: 'Hoàng kỳ',
    pinyinName: 'Huang Qi',
    botanicalName: 'Radix Astragali',
    chineseCharacters: '黃芪',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Hơi ôn',
      flavors: ["Cam"],
      channels: ["Tỳ", "Phế"]
    },
    dosageGram: '9 - 30g',
    actions: ["Bổ khí thăng dương", "Cố biểu chỉ hãn", "Thác độc sinh cơ", "Lợi thủy tiêu thũng"],
    clinicalIndications: ["Tỳ phế khí hư mệt mỏi đuối sức", "Tự hãn đổ mồ hôi dễ cảm mạo", "Liệt nửa người sau tai biến"],
    contraindications: 'Cấm cảm mạo phong nhiệt, thực chứng.',
    benskyNotes: 'Dan Bensky: Astragalosides kích thích tủy xương tạo máu và tế bào miễn dịch T.'
  },
  {
    id: 'bai-zhu',
    vietnameseName: 'Bạch truật',
    pinyinName: 'Bai Zhu',
    botanicalName: 'Rhizoma Atractylodis Macrocephalae',
    chineseCharacters: '白朮',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Ôn',
      flavors: ["Khổ", "Cam"],
      channels: ["Tỳ", "Vị"]
    },
    dosageGram: '6 - 15g',
    actions: ["Kiện tỳ ích khí", "Táo thấp lợi thủy", "Cố biểu chỉ hãn an thai"],
    clinicalIndications: ["Tỳ hư biếng ăn bụng đầy tiêu chảy", "Đờm ẩm chóng mặt phù thũng", "Thai động không yên tỳ hư"],
    contraindications: 'Kỵ âm hư nội nhiệt tân dịch kiệt.',
    benskyNotes: 'Dan Bensky: Bạch truật nuôi dưỡng Tỳ Thổ, sao cám kiện tỳ sao sống lợi thủy.'
  },
  {
    id: 'gan-cao',
    vietnameseName: 'Cam thảo',
    pinyinName: 'Gan Cao',
    botanicalName: 'Radix Glycyrrhizae',
    chineseCharacters: '甘草',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Bình',
      flavors: ["Cam"],
      channels: ["12 Kinh mạch"]
    },
    dosageGram: '2 - 10g',
    actions: ["Bổ tỳ ích khí", "Nhuận phế chỉ ho", "Hòa hoãn cấp bách giảm đau co thắt", "Giải độc các vị thuốc"],
    clinicalIndications: ["Tỳ vị hư yếu ho hắng đờm nhiều", "Đau co thắt dạ dày đau bụng", "Ngộ độc thuốc ngộ độc ăn uống"],
    contraindications: 'Phản Cam toại, Đại kích, Nguyên hoa, Hải tảo (Thập bát phản); không dùng liều cao kéo dài ở người cao huyết áp phù thũng.',
    benskyNotes: 'Dan Bensky: Glycyrrhizin điều hòa độc tính của 100 vị thuốc.'
  },
  {
    id: 'dang-gui',
    vietnameseName: 'Đương quy',
    pinyinName: 'Dang Gui',
    botanicalName: 'Radix Angelicae Sinensis',
    chineseCharacters: '當歸',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Ôn',
      flavors: ["Cam", "Tân"],
      channels: ["Tâm", "Can", "Tỳ"]
    },
    dosageGram: '6 - 15g',
    actions: ["Bổ huyết hoạt huyết", "Điều kinh chỉ thống", "Nhuận tràng thông tiện"],
    clinicalIndications: ["Huyết hư da xanh hoa mắt hồi hộp", "Bế kinh đau bụng kinh", "Táo bón huyết hư"],
    contraindications: 'Kỵ tỳ hư tiêu chảy.',
    benskyNotes: 'Dan Bensky: Quy đầu bổ huyết, Quy thân dưỡng huyết, Quy vĩ hoạt huyết tiêu ứ.'
  },
  {
    id: 'shu-di-huang',
    vietnameseName: 'Thục địa hoàng',
    pinyinName: 'Shu Di Huang',
    botanicalName: 'Radix Rehmanniae Praeparata',
    chineseCharacters: '熟地黃',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Hơi ôn',
      flavors: ["Cam"],
      channels: ["Tâm", "Can", "Thận"]
    },
    dosageGram: '10 - 30g',
    actions: ["Bổ huyết tư âm", "Ích tinh điền tủy", "Bổ Thận âm hư triều nhiệt"],
    clinicalIndications: ["Huyết hư nặng da xanh kinh ít", "Can thận âm hư đau lưng ù tai tóc bạc", "Triều nhiệt mồ hôi trộm"],
    contraindications: 'Tính trệ gây đầy bụng. Kỵ tỳ hư đờm thấp.',
    benskyNotes: 'Dan Bensky: Địa hoàng chưng cất rượu gừng 9 lần biến lạnh thành ấm bổ thận tinh tủy.'
  },
  {
    id: 'bai-shao',
    vietnameseName: 'Bạch thược',
    pinyinName: 'Bai Shao',
    botanicalName: 'Radix Paeoniae Alba',
    chineseCharacters: '白芍',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ["Khổ", "Toan"],
      channels: ["Can", "Tỳ"]
    },
    dosageGram: '6 - 15g',
    actions: ["Dưỡng huyết điều kinh", "Liễm âm chỉ hãn", "Nhu can chỉ thống hoãn cấp giãn cơ", "Bình ức Can dương"],
    clinicalIndications: ["Huyết hư kinh nguyệt không đều", "Can khí bất hòa đau sườn dạ dày chuột rút", "Đau đầu Can dương"],
    contraindications: 'Kỵ Lê Lô. Thận trọng tỳ vị hư hàn.',
    benskyNotes: 'Dan Bensky: Paeoniflorin ức chế canxi thần kinh - cơ vân, giãn cơ giảm đau tức thì.'
  },
  {
    id: 'he-shou-wu',
    vietnameseName: 'Hà thủ ô',
    pinyinName: 'He Shou Wu',
    botanicalName: 'Radix Polygoni Multiflori',
    chineseCharacters: '何首烏',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Hơi ôn',
      flavors: ["Khổ", "Cam", "Sáp"],
      channels: ["Can", "Thận"]
    },
    dosageGram: '10 - 20g',
    actions: ["Bổ can thận ích tinh huyết", "Ô tu phát làm đen tóc", "Giải độc nhuận tràng"],
    clinicalIndications: ["Can thận hư tóc bạc sớm di tinh mỏi gối", "Thiếu máu hoa mắt chóng mặt", "Táo bón mạn tính"],
    contraindications: 'Bắt buộc chế đậu đen rượu để khử độc.',
    benskyNotes: 'Dan Bensky: Chưng đậu đen cửu sái làm đen râu tóc và trẻ hóa tế bào.'
  },
  {
    id: 'e-jiao',
    vietnameseName: 'A giao',
    pinyinName: 'E Jiao',
    botanicalName: 'Colla Corii Asini',
    chineseCharacters: '阿膠',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Bình',
      flavors: ["Cam"],
      channels: ["Tâm", "Can", "Thận"]
    },
    dosageGram: '5 - 10g',
    actions: ["Bổ huyết tư âm", "Chỉ huyết cầm máu xuất huyết", "Nhuận phế an thai"],
    clinicalIndications: ["Thiếu máu nặng suy nhược thần kinh", "Chảy máu cam ho ra máu xuất huyết dạ dày", "Dọa sảy thai"],
    contraindications: 'Tính trệ khó tiêu. Kỵ tỳ vị hư hàn tiêu chảy.',
    benskyNotes: 'Dan Bensky: Keo da lừa bổ huyết tư âm chỉ huyết kỳ diệu.'
  },
  {
    id: 'long-yan-rou',
    vietnameseName: 'Long nhãn nhục',
    pinyinName: 'Long Yan Rou',
    botanicalName: 'Arillus Longan',
    chineseCharacters: '龍眼肉',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Ôn',
      flavors: ["Cam"],
      channels: ["Tâm", "Tỳ"]
    },
    dosageGram: '9 - 15g',
    actions: ["Bổ tâm tỳ ích khí huyết", "An thần định chí"],
    clinicalIndications: ["Suy nhược thần kinh mất ngủ hồi hộp hay quên", "Tỳ hư mệt mỏi thiếu máu"],
    contraindications: 'Kỵ đờm hỏa trệ đầy bụng.',
    benskyNotes: 'Dan Bensky: Áo long nhãn bổ Tâm Tỳ dưỡng huyết an thần ngọt mát.'
  },
  {
    id: 'lu-rong',
    vietnameseName: 'Lộc nhung',
    pinyinName: 'Lu Rong',
    botanicalName: 'Cornu Cervi Pantotrichum',
    chineseCharacters: '鹿茸',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Ôn',
      flavors: ["Cam", "Mặn"],
      channels: ["Thận", "Can"]
    },
    dosageGram: '1 - 3g',
    actions: ["Đại bổ thận dương", "Ích tinh huyết cường gân cốt", "Thang điều nhâm xung"],
    clinicalIndications: ["Thận dương hư suy liệt dương tử cung lạnh", "Trẻ em chậm lớn còi xương", "Suy nhược nặng thần kinh"],
    contraindications: 'Cấm âm hư hỏa vượng, cao huyết áp kịch phát.',
    benskyNotes: 'Dan Bensky: Nhung hươu nai tươi kích thích sản sinh Testosterone.'
  },
  {
    id: 'du-zhong',
    vietnameseName: 'Đỗ trọng',
    pinyinName: 'Du Zhong',
    botanicalName: 'Cortex Eucommiae',
    chineseCharacters: '杜仲',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Ôn',
      flavors: ["Cam"],
      channels: ["Can", "Thận"]
    },
    dosageGram: '9 - 15g',
    actions: ["Bổ can thận cường gân cốt", "An thai", "Hạ huyết áp"],
    clinicalIndications: ["Đau lưng mỏi gối gân cốt yếu", "Tăng huyết áp thai kỳ", "Dọa sảy thai dọa sinh non"],
    contraindications: 'Thận trọng âm hư hỏa vượng.',
    benskyNotes: 'Dan Bensky: Tinh chất mủ đỗ trọng làm vững chắc dây chằng đốt sống thắt lưng.'
  },
  {
    id: 'rou-cong-rong',
    vietnameseName: 'Nhục thung dung',
    pinyinName: 'Rou Cong Rong',
    botanicalName: 'Herba Cistanches',
    chineseCharacters: '肉蓯蓉',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Ôn',
      flavors: ["Cam", "Mặn"],
      channels: ["Thận", "Đại tràng"]
    },
    dosageGram: '9 - 15g',
    actions: ["Bổ thận dương ích tinh huyết", "Nhuận tràng thông tiện đặc trị người già"],
    clinicalIndications: ["Liệt dương di tinh hiếm muộn", "Đau lưng mỏi gối chân tay lạnh", "Táo bón bàng quang tân dịch kiệt"],
    contraindications: 'Kỵ tỳ hư tiêu chảy, âm hư hỏa vượng.',
    benskyNotes: 'Dan Bensky: Bổ dương không gây khô rát, nhuận tràng tuyệt vời.'
  },
  {
    id: 'yin-yang-huo',
    vietnameseName: 'Dâm dương hoắc',
    pinyinName: 'Yin Yang Huo',
    botanicalName: 'Herba Epimedii',
    chineseCharacters: '淫羊藿',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Ôn',
      flavors: ["Tân", "Cam"],
      channels: ["Can", "Thận"]
    },
    dosageGram: '6 - 15g',
    actions: ["Bổ thận dương cường gân cốt", "Khứ phong thấp tê dại"],
    clinicalIndications: ["Liệt dương xuất tinh sớm ham muốn giảm", "Đau nhức khớp xương tay chân lạnh", "Tăng huyết áp mãn kinh"],
    contraindications: 'Kỵ âm hư hỏa vượng khát nước.',
    benskyNotes: 'Dan Bensky: Icariin kích thích giãn mạch thể hang tăng sinh lý nam nữ.'
  },
  {
    id: 'ba-ji-tian',
    vietnameseName: 'Ba kích thiên',
    pinyinName: 'Ba Ji Tian',
    botanicalName: 'Radix Morindae Officinalis',
    chineseCharacters: '巴戟天',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Ôn',
      flavors: ["Cam", "Tân"],
      channels: ["Thận", "Can"]
    },
    dosageGram: '6 - 12g',
    actions: ["Bổ thận dương cường gân cốt", "Khứ phong thấp chỉ thống"],
    clinicalIndications: ["Liệt dương di tinh hiếm muộn tử cung lạnh", "Đau lưng mỏi gối gân cốt yếu phong thấp"],
    contraindications: 'Kỵ âm hư hỏa vượng tiểu đỏ.',
    benskyNotes: 'Dan Bensky: Rễ ba kích tím bổ Thận dương vững gân cốt.'
  },
  {
    id: 'dong-chong-xia-cao',
    vietnameseName: 'Đông trùng hạ thảo',
    pinyinName: 'Dong Chong Xia Cao',
    botanicalName: 'Cordyceps',
    chineseCharacters: '冬蟲夏草',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Ôn',
      flavors: ["Cam"],
      channels: ["Phế", "Thận"]
    },
    dosageGram: '3 - 9g',
    actions: ["Bổ phế ích thận chỉ huyết hóa đờm", "Bổ dưỡng tinh khí phục hồi thể lực"],
    clinicalIndications: ["Thận hư đau lưng di tinh liệt dương", "Phế hư ho hen ho ra máu mạn tính", "Suy nhược sau bệnh nặng"],
    contraindications: 'Thận trọng khi ngoại cảm sốt cấp.',
    benskyNotes: 'Dan Bensky: Cordycepin bổ kép Phế Thận tăng lượng oxy hô hấp tế bào.'
  },
  {
    id: 'mai-men-dong',
    vietnameseName: 'Mạch môn đông',
    pinyinName: 'Mai Men Dong',
    botanicalName: 'Radix Ophiopogonis',
    chineseCharacters: '麥門冬',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ["Cam", "Khổ"],
      channels: ["Tâm", "Phế", "Vị"]
    },
    dosageGram: '6 - 15g',
    actions: ["Dưỡng âm nhuận phế", "Thanh tâm trừ phiền", "Sinh tân chỉ khát nhuận tràng"],
    clinicalIndications: ["Ho khô Phế âm hư", "Mất ngủ rạo rực Tâm âm hư", "Táo bón đái tháo đường"],
    contraindications: 'Thận trọng phế hàn ho đờm lỏng tỳ hư.',
    benskyNotes: 'Dan Bensky: Tư dưỡng tân dịch Thượng trung tiêu xoa dịu ho rát cổ.'
  },
  {
    id: 'gou-qi-zi',
    vietnameseName: 'Câu kỷ tử',
    pinyinName: 'Gou Qi Zi',
    botanicalName: 'Fructus Lycii',
    chineseCharacters: '枸杞子',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Bình',
      flavors: ["Cam"],
      channels: ["Can", "Thận"]
    },
    dosageGram: '6 - 15g',
    actions: ["Tư bổ can thận tinh huyết", "Ích tinh sáng mắt Minh mục", "Nhuận phế chỉ ho"],
    clinicalIndications: ["Thị lực suy giảm mắt mờ khô", "Đau lưng mỏi gối di tinh hiếm muộn", "Đái tháo đường"],
    contraindications: 'Tránh dùng tỳ vị thấp nhiệt tiêu chảy.',
    benskyNotes: 'Dan Bensky: Zeaxanthin bảo vệ hoàng điểm võng mạc và gan.'
  },
  {
    id: 'huang-jing',
    vietnameseName: 'Hoàng tinh',
    pinyinName: 'Huang Jing',
    botanicalName: 'Rhizoma Polygonati',
    chineseCharacters: '黃精',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Bình',
      flavors: ["Cam"],
      channels: ["Tỳ", "Phế", "Thận"]
    },
    dosageGram: '9 - 15g',
    actions: ["Bổ khí dưỡng âm", "Kiện tỳ nhuận phế ích thận"],
    clinicalIndications: ["Tỳ vị hư yếu mệt mỏi biếng ăn", "Ho khô ho lao phế âm hư", "Thận hư tóc bạc sớm đái tháo đường"],
    contraindications: 'Kỵ đờm thấp trệ đầy bụng tiêu chảy.',
    benskyNotes: 'Dan Bensky: Vị thuốc trường thọ dưỡng âm bổ khí ba tạng Tỳ Phế Thận.'
  },
  {
    id: 'wu-wei-zi',
    vietnameseName: 'Ngũ vị tử',
    pinyinName: 'Wu Wei Zi',
    botanicalName: 'Fructus Schisandrae',
    chineseCharacters: '五味子',
    category: '13. Thuốc Cố Sáp (Stabilize and Bind)',
    properties: {
      nature: 'Ôn',
      flavors: ["Chua", "Ngọt", "Đắng", "Cay", "Mặn"],
      channels: ["Phế", "Tâm", "Thận"]
    },
    dosageGram: '3 - 9g',
    actions: ["Liễm phế chỉ ho", "Tư thận sáp tinh", "Sinh tân chỉ hãn", "Ninh tâm an thần"],
    clinicalIndications: ["Ho mạn tính phế hư", "Di tinh mộng tinh đái dầm Thận hư", "Mồ hôi trộm trằn trọc mất ngủ"],
    contraindications: 'Kỵ cảm mạo mới phát.',
    benskyNotes: 'Dan Bensky: Hạt ngũ vị chứa đủ 5 vị khóa chặt tinh khí.'
  },
  {
    id: 'shan-zhu-yu',
    vietnameseName: 'Sơn thù du',
    pinyinName: 'Shan Zhu Yu',
    botanicalName: 'Fructus Corni',
    chineseCharacters: '山茱萸',
    category: '13. Thuốc Cố Sáp (Stabilize and Bind)',
    properties: {
      nature: 'Hơi ôn',
      flavors: ["Toan", "Sáp"],
      channels: ["Can", "Thận"]
    },
    dosageGram: '6 - 12g',
    actions: ["Bổ can thận", "Cố sáp tinh khí chỉ hãn", "Cứu thoát khí âm"],
    clinicalIndications: ["Can thận hư đau lưng mỏi gối ù tai di tinh", "Tự hãn đạo hãn mồ hôi vọt", "Rong kinh rong huyết"],
    contraindications: 'Kỵ đái buốt thấp nhiệt.',
    benskyNotes: 'Dan Bensky: Khóa chặt thận tinh không cho thoát vọt ra ngoài.'
  },
  {
    id: 'zhu-sha',
    vietnameseName: 'Chu sa',
    pinyinName: 'Zhu Sha',
    botanicalName: 'Cinnabaris',
    chineseCharacters: '朱砂',
    category: '14. Thuốc An Thần (Calm the Spirit)',
    properties: {
      nature: 'Hàn (Có độc Thủy ngân)',
      flavors: ["Cam"],
      channels: ["Tâm"]
    },
    dosageGram: '0.1 - 0.5g',
    actions: ["Trọng trấn an thần", "Thanh tâm trấn kinh", "Giải độc tiêu thũng"],
    clinicalIndications: ["Sốt cao mê cuồng co giật", "Mất ngủ cuồng loạn cuồng sảng Tâm hỏa"],
    contraindications: 'Có độc Thủy ngân (HgS); cấm dùng lâu ngày, không đun nấu nhiệt độ cao; cấm phụ nữ có thai.',
    benskyNotes: 'Dan Bensky 3rd Ed: Khoáng vật Thủy ngân sulfide trấn an tâm thần cực mạnh.'
  },
  {
    id: 'long-gu',
    vietnameseName: 'Long cốt',
    pinyinName: 'Long Gu',
    botanicalName: 'Fossilia Ossis Mastodi',
    chineseCharacters: '龍骨',
    category: '14. Thuốc An Thần (Calm the Spirit)',
    properties: {
      nature: 'Bình',
      flavors: ["Cam", "Sáp"],
      channels: ["Tâm", "Can", "Thận"]
    },
    dosageGram: '15 - 30g',
    actions: ["Trọng trấn an thần", "Bình can tiềm dương", "Thụ sáp cố tinh chỉ hãn"],
    clinicalIndications: ["Mất ngủ giật mình hoảng sợ cuồng sảng", "Hoa mắt chóng mặt Can dương vượng", "Di tinh mồ hôi trộm"],
    contraindications: 'Kỵ thực nhiệt tích tụ.',
    benskyNotes: 'Dan Bensky: Xương hóa thạch động vật trấn tĩnh tâm thần và giữ chặt tinh khí.'
  },
  {
    id: 'mu-li',
    vietnameseName: 'Mẫu lệ',
    pinyinName: 'Mu Li',
    botanicalName: 'Concha Ostreae',
    chineseCharacters: '牡蠣',
    category: '14. Thuốc An Thần (Calm the Spirit)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ["Mặn", "Sáp"],
      channels: ["Can", "Thận"]
    },
    dosageGram: '15 - 30g',
    actions: ["Trọng trấn an thần", "Bình can tiềm dương", "Nhuyễn kiên tán kết tiêu u hạch", "Chế vị chỉ thống"],
    clinicalIndications: ["Mất ngủ chóng mặt bốc hỏa tăng huyết áp", "Sưng hạch cổ, bướu cổ, u xơ", "Trào ngược dạ dày thừa acid"],
    contraindications: 'Kỵ hư hàn.',
    benskyNotes: 'Dan Bensky: Vỏ hàu biển dập bốc hỏa, bào mòn hạch u và trung hòa acid dạ dày.'
  },
  {
    id: 'suan-zao-ren',
    vietnameseName: 'Toan táo nhân',
    pinyinName: 'Suan Zao Ren',
    botanicalName: 'Semen Ziziphi Spinosae',
    chineseCharacters: '酸棗仁',
    category: '14. Thuốc An Thần (Calm the Spirit)',
    properties: {
      nature: 'Bình',
      flavors: ["Cam", "Toan"],
      channels: ["Tâm", "Can", "Đởm"]
    },
    dosageGram: '9 - 15g',
    actions: ["Dưỡng tâm âm ích can huyết", "An thần định chí", "Liễm hãn chỉ hãn"],
    clinicalIndications: ["Mất ngủ mạn tính giật mình trằn trọc", "Mồ hôi trộm âm hư", "Suy nhược thần kinh lo âu"],
    contraindications: 'Thận trọng tiêu chảy.',
    benskyNotes: 'Dan Bensky: Jujuboside sao đen tái lập giấc ngủ sinh lý êm dịu.'
  },
  {
    id: 'yuan-zhi',
    vietnameseName: 'Viễn chí',
    pinyinName: 'Yuan Zhi',
    botanicalName: 'Radix Polygalae',
    chineseCharacters: '遠志',
    category: '14. Thuốc An Thần (Calm the Spirit)',
    properties: {
      nature: 'Hơi ôn',
      flavors: ["Khổ", "Tân"],
      channels: ["Tâm", "Phế"]
    },
    dosageGram: '3 - 10g',
    actions: ["Ninh tâm an thần tăng trí nhớ", "Khứ đờm khai khiếu", "Tiêu thũng tán kết"],
    clinicalIndications: ["Hay quên suy giảm trí nhớ thần trí mơ hồ", "Ho đờm dính khó khạc", "Sưng tuyến vú mụn nhọt"],
    contraindications: 'Thận trọng viêm loét dạ dày.',
    benskyNotes: 'Dan Bensky: Thông suốt trí nhớ và xua tan sương mù đờm trệ.'
  },
  {
    id: 'she-xiang',
    vietnameseName: 'Xạ hương',
    pinyinName: 'She Xiang',
    botanicalName: 'Moschus',
    chineseCharacters: '麝香',
    category: '15. Thuốc Phương Hương Khai Khiếu (Open Orifices)',
    properties: {
      nature: 'Ôn',
      flavors: ["Tân"],
      channels: ["Tâm", "Tỳ"]
    },
    dosageGram: '0.03 - 0.1g',
    actions: ["Khai khiếu thông quan đặc trị hôn mê bế chứng", "Thấu kinh thông lạc chỉ thống", "Hoạt huyết tiêu thũng bài nùng"],
    clinicalIndications: ["Hôn mê tai biến đột quỵ bế chứng (An Cung Ngưu Hoàng)", "Đau thắt ngực nhồi máu cơ tim cấp", "Chấn thương dập bầm"],
    contraindications: 'Tuyệt đối cấm phụ nữ mang thai.',
    benskyNotes: 'Dan Bensky: Túi xạ hươu xạ thấu suốt 12 kinh mạch khai mở brain.'
  },
  {
    id: 'shi-chang-pu',
    vietnameseName: 'Thạch xương bồ',
    pinyinName: 'Shi Chang Pu',
    botanicalName: 'Rhizoma Acori Tatarinowii',
    chineseCharacters: '石菖蒲',
    category: '15. Thuốc Phương Hương Khai Khiếu (Open Orifices)',
    properties: {
      nature: 'Hơi ôn',
      flavors: ["Tân", "Khổ"],
      channels: ["Tâm", "Vị"]
    },
    dosageGram: '3 - 9g',
    actions: ["Khai khiếu hóa đờm ninh tâm an thần", "Hóa thấp hòa vị chỉ thống"],
    clinicalIndications: ["Lú lẫn suy giảm trí nhớ đờm bế brain", "Ù tai điếc tai ngực trướng đầy đờm ẩm"],
    contraindications: 'Kỵ âm hư ho ra máu.',
    benskyNotes: 'Dan Bensky: Tinh dầu xương bồ xua tan sương mù đờm trệ brain.'
  },
  {
    id: 'niu-huang',
    vietnameseName: 'Ngưu hoàng',
    pinyinName: 'Niu Huang',
    botanicalName: 'Calculus Bovis',
    chineseCharacters: '牛黃',
    category: '15. Thuốc Phương Hương Khai Khiếu (Open Orifices)',
    properties: {
      nature: 'Lương',
      flavors: ["Khổ", "Cam"],
      channels: ["Tâm", "Gan"]
    },
    dosageGram: '0.15 - 0.35g',
    actions: ["Thanh tâm giải độc", "Hóa đờm khai khiếu", "Tức phong chỉ kinh co giật"],
    clinicalIndications: ["Sốt cao co giật hôn mê sảng cuồng (An Cung Ngưu Hoàng)", "Viêm họng lở miệng mụn nhọt độc"],
    contraindications: 'Cấm phụ nữ mang thai.',
    benskyNotes: 'Dan Bensky: Sỏi mật bò thanh nhiệt độc kinh Tâm dập co giật cấp cứu.'
  },
  {
    id: 'tian-ma',
    vietnameseName: 'Thiên ma',
    pinyinName: 'Tian Ma',
    botanicalName: 'Rhizoma Gastrodiae',
    chineseCharacters: '天麻',
    category: '16. Thuốc Bình Can Tức Phong (Extinguish Wind)',
    properties: {
      nature: 'Bình',
      flavors: ["Cam"],
      channels: ["Can"]
    },
    dosageGram: '3 - 10g',
    actions: ["Tức phong chỉ kinh", "Bình can tiềm dương chỉ huyễn vựng", "Khứ phong thông lạc chỉ thống"],
    clinicalIndications: ["Hoa mắt chóng mặt rối loạn tiền đình", "Đau nửa đầu Migraine", "Co giật kinh phong tai biến liệt"],
    contraindications: 'Huyết hư cần bổ âm.',
    benskyNotes: 'Dan Bensky: Gastrodin bảo vệ tế bào thần kinh dứt chóng mặt số 1.'
  },
  {
    id: 'gou-teng',
    vietnameseName: 'Câu đằng',
    pinyinName: 'Gou Teng',
    botanicalName: 'Ramulus cum Uncis Uncariae',
    chineseCharacters: '鉤藤',
    category: '16. Thuốc Bình Can Tức Phong (Extinguish Wind)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ["Cam", "Khổ"],
      channels: ["Can", "Tâm"]
    },
    dosageGram: '6 - 15g',
    actions: ["Thanh nhiệt bình can", "Tức phong chỉ kinh co giật", "Hạ huyết áp"],
    clinicalIndications: ["Trẻ em sốt cao co giật", "Tăng huyết áp Can hỏa bốc hỏa", "Đau nửa đầu"],
    contraindications: 'Tránh sắc quá 20 phút.',
    benskyNotes: 'Dan Bensky: Rhynchophylline hạ huyết áp và dập co giật nhanh chóng.'
  },
  {
    id: 'bing-lang',
    vietnameseName: 'Binh lang',
    pinyinName: 'Bing Lang',
    botanicalName: 'Semen Arecae',
    chineseCharacters: '檳榔',
    category: '17. Thuốc Khu Trùng (Expel Parasites)',
    properties: {
      nature: 'Ôn',
      flavors: ["Khổ", "Tân"],
      channels: ["Vị", "Đại tràng"]
    },
    dosageGram: '3 - 10g',
    actions: ["Sát trùng tiêu tích đặc trị sán dây & giun", "Hành khí lợi thủy giáng nghịch"],
    clinicalIndications: ["Nhiễm giun sán dây sán lợn bụng trướng", "Táo bón bế khí ruột", "Phù thũng chân tay"],
    contraindications: 'Thận trọng trung khí suy yếu và phụ nữ có thai.',
    benskyNotes: 'Dan Bensky: Arecoline làm tê liệt cơ bắp giun sán dây để xả sạch.'
  },
  {
    id: 'she-chuang-zi',
    vietnameseName: 'Xà sàng tử',
    pinyinName: 'She Chuang Zi',
    botanicalName: 'Fructus Cnidii',
    chineseCharacters: '蛇床子',
    category: '18. Thuốc Dùng Ngoài / Ngoại Khoa (Topical)',
    properties: {
      nature: 'Ôn',
      flavors: ["Tân", "Khổ"],
      channels: ["Thận"]
    },
    dosageGram: '3 - 9g',
    actions: ["Ôn thận trợ dương", "Táo thấp sát trùng chỉ ngứa dùng ngoài"],
    clinicalIndications: ["Eczema, nấm âm đạo Trichomonas ngứa vùng kín", "Liệt dương âm tiễn lạnh rát"],
    contraindications: 'Kỵ âm hư hỏa vượng.',
    benskyNotes: 'Dan Bensky: Osthole kháng nấm âm đạo ngứa ngáy vùng kín cực hay.'
  },
  {
    id: 'xi-jiao-shui-niu-jiao',
    vietnameseName: 'Tê giác (Thủy ngưu giác thay)',
    pinyinName: 'Xi Jiao / Shui Niu Jiao',
    botanicalName: 'Cornu Rhinocerotis / Bubali',
    chineseCharacters: '犀角/水牛角',
    category: '19. Nhóm Vị Thuốc Hạn Chế & Thay Thế (Obsolete)',
    properties: {
      nature: 'Rất hàn',
      flavors: ["Khổ", "Mặn"],
      channels: ["Tâm", "Can"]
    },
    dosageGram: '15 - 30g',
    actions: ["Thanh nhiệt lương huyết đại nhiệt", "Giải độc định kinh co giật", "Thay thế Tê giác bị cấm"],
    clinicalIndications: ["Sốt cao mê cuồng xuất huyết ban chẩn", "Viêm màng brain sốt co giật cấp"],
    contraindications: 'Cấm săn bắn Tê giác. Dùng Sừng trâu thay thế.',
    benskyNotes: 'Dan Bensky 3rd Ed: Tê giác cấm quốc tế. Dùng Thủy ngưu giác thay thế.'
  },
  {
    id: 'ma-qian-zi',
    vietnameseName: 'Mã tiền tử',
    pinyinName: 'Ma Qian Zi',
    botanicalName: 'Semen Strychni',
    chineseCharacters: '馬錢子',
    category: '19. Nhóm Vị Thuốc Hạn Chế & Thay Thế (Obsolete)',
    properties: {
      nature: 'Ôn (Cực độc)',
      flavors: ["Khổ"],
      channels: ["Can", "Tỳ"]
    },
    dosageGram: '0.3 - 0.6g',
    actions: ["Thông lạc chỉ thống giảm đau xương khớp mạnh", "Tán kết tiêu thũng"],
    clinicalIndications: ["Đau nhức cơ xương khớp phong thấp mạn tính", "Liệt cơ bắp sau tai biến"],
    contraindications: 'Chứa Strychnine cực độc gây co giật tử vong; cấm tuyệt đối phụ nữ có thai và không dùng quá liều quy định.',
    benskyNotes: 'Dan Bensky 3rd Ed: Strychnine kích thích tủy sống nhưng khoảng liều an toàn rất hẹp.'
  },
  {
    "id": "ke-huyet-dang",
    "vietnameseName": "Kê huyết đằng",
    "pinyinName": "Ji Xue Teng",
    "botanicalName": "Caulis Spatholobi",
    "chineseCharacters": "雞血藤",
    "category": "5. Thuốc Khu Phong Trừ Thấp (Dispel Wind-Dampness)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Đắng",
        "Ngọt"
      ],
      "channels": [
        "Can",
        "Thận"
      ]
    },
    "dosageGram": "10 - 30g",
    "actions": [
      "Hành huyết bổ huyết",
      "Thư cân hoạt lạc",
      "Thông kinh chỉ thống"
    ],
    "clinicalIndications": [
      "Đau nhức khớp phong thấp tý thống",
      "Tê bì chân tay, gân mạch co rút",
      "Kinh nguyệt không đều, huyết hư bế kinh"
    ],
    "contraindications": "Thận trọng phụ nữ có thai ra nhiều huyết.",
    "benskyNotes": "Dan Bensky: Vị thuốc vừa bổ huyết vừa hành huyết, chuyên trị đau nhức xương khớp và tê bại thần kinh."
  },
  {
    "id": "ngu-gia-bi",
    "vietnameseName": "Ngũ gia bì",
    "pinyinName": "Wu Jia Pi",
    "botanicalName": "Cortex Acanthopanacis",
    "chineseCharacters": "五加皮",
    "category": "5. Thuốc Khu Phong Trừ Thấp (Dispel Wind-Dampness)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Cay",
        "Đắng"
      ],
      "channels": [
        "Can",
        "Thận"
      ]
    },
    "dosageGram": "5 - 12g",
    "actions": [
      "Khứ phong thấp",
      "Bổ can thận cường cân cốt",
      "Lợi thủy tiêu thũng"
    ],
    "clinicalIndications": [
      "Phong hàn thấp tý đau mỏi gối lưng",
      "Chân tay yếu mềm, trẻ em chậm biết đi",
      "Phù thũng tiểu tiện bất lợi"
    ],
    "contraindications": "Kỵ âm hư hỏa vượng, sốt cao do thực nhiệt.",
    "benskyNotes": "Dan Bensky: Bổ can thận tráng gân xương, dùng rất hay cho người già đau lưng mỏi gối suy nhược."
  },
  {
    "id": "hy-thiem",
    "vietnameseName": "Hy thiêm thảo",
    "pinyinName": "Xi Xian Cao",
    "botanicalName": "Herba Siegesbeckiae",
    "chineseCharacters": "豨莶草",
    "category": "5. Thuốc Khu Phong Trừ Thấp (Dispel Wind-Dampness)",
    "properties": {
      "nature": "Hàn",
      "flavors": [
        "Đắng",
        "Cay"
      ],
      "channels": [
        "Can",
        "Thận"
      ]
    },
    "dosageGram": "9 - 15g",
    "actions": [
      "Khứ phong thấp lợi khớp",
      "Thanh nhiệt giải độc",
      "Hạ huyết áp và thông kinh lạc"
    ],
    "clinicalIndications": [
      "Viêm khớp dạng thấp sưng nóng đỏ đau",
      "Bán thân bất toại méo miệng sau đột quỵ",
      "Cao huyết áp, mụn nhọt ngứa da"
    ],
    "contraindications": "Tránh dùng khi huyết hư không có phong thấp nhiệt.",
    "benskyNotes": "Dan Bensky & Đỗ Tất Lợi: Dược thảo kinh điển Nam y trị phong thấp tý và hạ huyết áp mao mạch."
  },
  {
    "id": "tan-giao",
    "vietnameseName": "Tần giao",
    "pinyinName": "Qin Jiao",
    "botanicalName": "Radix Gentianae Macrophyllae",
    "chineseCharacters": "秦艽",
    "category": "5. Thuốc Khu Phong Trừ Thấp (Dispel Wind-Dampness)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Đắng",
        "Cay"
      ],
      "channels": [
        "Vị",
        "Can",
        "Đởm"
      ]
    },
    "dosageGram": "5 - 10g",
    "actions": [
      "Khứ phong thấp thư cân lạc",
      "Thanh hư nhiệt",
      "Lợi thấp thoái hoàng"
    ],
    "clinicalIndications": [
      "Phong thấp khớp co quắp cứng nhắc",
      "Cốt chưng triều nhiệt, sốt chiều mồ hôi trộm",
      "Vàng da do thấp nhiệt"
    ],
    "contraindications": "Kỵ tỳ hư tiêu chảy, tiểu đêm nhiều.",
    "benskyNotes": "Dan Bensky: Vị thuốc trừ phong thấp trong nhóm thanh nhiệt; không táo nhiệt, nhuận kinh lạc."
  },
  {
    "id": "phong-ky",
    "vietnameseName": "Phòng kỷ",
    "pinyinName": "Fang Ji",
    "botanicalName": "Radix Stephaniae Tetrandrae",
    "chineseCharacters": "防己",
    "category": "5. Thuốc Khu Phong Trừ Thấp (Dispel Wind-Dampness)",
    "properties": {
      "nature": "Hàn",
      "flavors": [
        "Đắng",
        "Cay"
      ],
      "channels": [
        "Bàng quang",
        "Tỳ",
        "Thận"
      ]
    },
    "dosageGram": "5 - 10g",
    "actions": [
      "Lợi thủy tiêu thũng",
      "Khứ phong thấp chỉ thống",
      "Thanh nhiệt bài nùng"
    ],
    "clinicalIndications": [
      "Phù thũng chi dưới, bụng trướng thủy thũng",
      "Phong thấp nhiệt tý khớp sưng nóng",
      "Cước khí phù chân"
    ],
    "contraindications": "Tỳ vị hư hàn cấm dùng liều cao.",
    "benskyNotes": "Dan Bensky: Hán phòng kỷ (Tetrandra) lợi thủy tiêu thũng mạnh nhất; cấm nhầm với Quảng phòng kỷ."
  },
  {
    "id": "tang-chi",
    "vietnameseName": "Tang chi (Cành dâu)",
    "pinyinName": "Sang Zhi",
    "botanicalName": "Ramulus Mori",
    "chineseCharacters": "桑枝",
    "category": "5. Thuốc Khu Phong Trừ Thấp (Dispel Wind-Dampness)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Hơi đắng"
      ],
      "channels": [
        "Can"
      ]
    },
    "dosageGram": "15 - 30g",
    "actions": [
      "Khứ phong thấp thông kinh lạc",
      "Lợi quan tiết tiêu phù",
      "Dẫn thuốc lên chi trên"
    ],
    "clinicalIndications": [
      "Đau nhức khớp vai cánh tay, co quắp ngón tay",
      "Phong thấp đau khắp cơ thể",
      "Phù nề tiểu ít"
    ],
    "contraindications": "Không có chống chỉ định nghiêm ngặt.",
    "benskyNotes": "Dan Bensky: Chuyên kinh chi trên, là sứ dược dẫn thuốc trị đau vai gáy và cánh tay."
  },
  {
    "id": "moc-qua",
    "vietnameseName": "Mộc qua",
    "pinyinName": "Mu Gua",
    "botanicalName": "Fructus Chaenomelis",
    "chineseCharacters": "木瓜",
    "category": "5. Thuốc Khu Phong Trừ Thấp (Dispel Wind-Dampness)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Chua"
      ],
      "channels": [
        "Can",
        "Tỳ"
      ]
    },
    "dosageGram": "6 - 12g",
    "actions": [
      "Thư cân hoạt lạc",
      "Hóa thấp hòa vị",
      "Tiêu thực giải khát"
    ],
    "clinicalIndications": [
      "Chuột rút bắp chân co quắp gân",
      "Thổ tả nôn mửa tiêu chảy chuyển cân",
      "Phong thấp tý thống tê mỏi gối"
    ],
    "contraindications": "Kỵ tích nhiệt tiểu buốt tiểu rắt rát buốt niệu đạo.",
    "benskyNotes": "Dan Bensky: Vị chua nhập Can sinh tân thư cân, thánh dược trị co rút gân cơ và chuột rút bắp chân."
  },
  {
    "id": "tru-linh",
    "vietnameseName": "Trư linh",
    "pinyinName": "Zhu Ling",
    "botanicalName": "Polyporus",
    "chineseCharacters": "豬苓",
    "category": "4. Thuốc Lợi Thủy Thẩm Thấp (Drain Dampness)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Ngọt",
        "Nhạt"
      ],
      "channels": [
        "Thận",
        "Bàng quang"
      ]
    },
    "dosageGram": "6 - 15g",
    "actions": [
      "Lợi thủy thẩm thấp mạnh",
      "Thông lâm bài thạch",
      "Tiêu thũng trừ thấp"
    ],
    "clinicalIndications": [
      "Phù thũng nặng tiểu tiện bất lợi",
      "Sỏi tiết niệu, đái buốt đái đục",
      "Tiêu chảy do thấp trệ ứ trệ"
    ],
    "contraindications": "Kỵ chứng âm hư tân dịch hao tổn không có thấp.",
    "benskyNotes": "Dan Bensky: Tác dụng lợi tiểu thẩm thấp mạnh hơn Phục linh, chuyên trục thủy ứ đọng trong cơ thể."
  },
  {
    "id": "ty-giai",
    "vietnameseName": "Tỳ giải",
    "pinyinName": "Bi Xie",
    "botanicalName": "Rhizoma Dioscoreae Hypoglaucae",
    "chineseCharacters": "萆薢",
    "category": "4. Thuốc Lợi Thủy Thẩm Thấp (Drain Dampness)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Đắng"
      ],
      "channels": [
        "Thận",
        "Vị"
      ]
    },
    "dosageGram": "9 - 15g",
    "actions": [
      "Lợi thấp phân thanh",
      "Khứ phong trừ thấp chỉ thống",
      "Đào thải acid uric"
    ],
    "clinicalIndications": [
      "Cao lâm tiểu đục như nước vo gạo",
      "Bệnh Gout lắng đọng tinh thể Urat",
      "Khí hư bạch đới, đau lưng phong thấp"
    ],
    "contraindications": "Kỵ âm hư hỏa vượng, thận hư không có thấp nhiệt.",
    "benskyNotes": "Dan Bensky: Phân thanh khứ trọc hàng đầu trong Đông y; phác đồ số 1 đào thải Acid Uric trong Gout."
  },
  {
    "id": "hoat-thach",
    "vietnameseName": "Hoạt thạch",
    "pinyinName": "Hua Shi",
    "botanicalName": "Talcum",
    "chineseCharacters": "滑石",
    "category": "4. Thuốc Lợi Thủy Thẩm Thấp (Drain Dampness)",
    "properties": {
      "nature": "Hàn",
      "flavors": [
        "Ngọt",
        "Nhạt"
      ],
      "channels": [
        "Vị",
        "Bàng quang"
      ]
    },
    "dosageGram": "10 - 20g",
    "actions": [
      "Lợi niệu thông lâm thanh nhiệt",
      "Thanh nhiệt giải thử",
      "Thu liễm trừ rôm sẩy dùng ngoài"
    ],
    "clinicalIndications": [
      "Nhiệt lâm tiểu buốt đái rắt sỏi niệu",
      "Say nắng sốt mùa hè khát nước",
      "Rôm sẩy eczema lở loét ẩm ướt"
    ],
    "contraindications": "Thận trọng phụ nữ có thai, kỵ tỳ hư hoạt tinh.",
    "benskyNotes": "Dan Bensky: Tinh thể Talc thanh nhiệt giải thử và bào mòn tống sỏi tiết niệu niệu đạo ra ngoài."
  },
  {
    "id": "thong-thao",
    "vietnameseName": "Thông thảo",
    "pinyinName": "Tong Cao",
    "botanicalName": "Medulla Tetrapanacis",
    "chineseCharacters": "通草",
    "category": "4. Thuốc Lợi Thủy Thẩm Thấp (Drain Dampness)",
    "properties": {
      "nature": "Hơi hàn",
      "flavors": [
        "Ngọt",
        "Nhạt"
      ],
      "channels": [
        "Phế",
        "Vị"
      ]
    },
    "dosageGram": "3 - 6g",
    "actions": [
      "Thanh nhiệt lợi thủy",
      "Thông tuyến sữa (hạ nhũ)",
      "Tuyên thông kinh lạc"
    ],
    "clinicalIndications": [
      "Sản phụ tắc sữa, thiếu sữa sau sinh",
      "Thủy thũng tiểu tiện buốt rắt",
      "Sốt cao bứt rứt khát nước"
    ],
    "contraindications": "Kỵ phụ nữ đang mang thai.",
    "benskyNotes": "Dan Bensky: Vị nhạt tính hàn nhẹ, thông hành cửu khiếu và kích thích tiết sữa cho phụ nữ nuôi con."
  },
  {
    "id": "bien-suc",
    "vietnameseName": "Biển súc (Rau đắng đất)",
    "pinyinName": "Bian Xu",
    "botanicalName": "Herba Polygoni Avicularis",
    "chineseCharacters": "萹蓄",
    "category": "4. Thuốc Lợi Thủy Thẩm Thấp (Drain Dampness)",
    "properties": {
      "nature": "Hơi hàn",
      "flavors": [
        "Đắng"
      ],
      "channels": [
        "Bàng quang"
      ]
    },
    "dosageGram": "9 - 15g",
    "actions": [
      "Lợi niệu thông lâm thanh nhiệt",
      "Sát trùng chỉ ngứa",
      "Tiêu thũng gián giun"
    ],
    "clinicalIndications": [
      "Viêm bàng quang cấp tiểu ra máu",
      "Nhiễm trùng đường tiết niệu tiểu rắt",
      "Ngứa âm đạo, giun kim trẻ em"
    ],
    "contraindications": "Kỵ tỳ vị hư hàn tiêu chảy kéo dài.",
    "benskyNotes": "Dan Bensky & Tuệ Tĩnh: Nam dược trị viêm tiết niệu và ngứa lở ngoài da cực kỳ công hiệu."
  },
  {
    "id": "tang-bach-bi",
    "vietnameseName": "Tang bạch bì (Vỏ rễ dâu)",
    "pinyinName": "Sang Bai Pi",
    "botanicalName": "Cortex Mori",
    "chineseCharacters": "桑白皮",
    "category": "6. Thuốc Hóa Đàm Chỉ Khái Bình Suyễn (Transform Phlegm & Relieve Cough)",
    "properties": {
      "nature": "Hàn",
      "flavors": [
        "Ngọt"
      ],
      "channels": [
        "Phế"
      ]
    },
    "dosageGram": "6 - 12g",
    "actions": [
      "Tả phế bình suyễn",
      "Lợi thủy tiêu thũng",
      "Hạ huyết áp"
    ],
    "clinicalIndications": [
      "Phế nhiệt ho suyễn thở khò khè",
      "Phù thũng ứ nước mặt nặng mi sưng",
      "Tăng huyết áp do can phế hỏa"
    ],
    "contraindications": "Kỵ phế hàn ho đờm loãng trong hoặc không có phù nhiệt.",
    "benskyNotes": "Dan Bensky: Tả phế hỏa và trục thủy ở thượng tiêu cực kỳ êm dịu, bảo bối trị hen suyễn cấp."
  },
  {
    "id": "to-tu",
    "vietnameseName": "Tô tử (Hạt tía tô)",
    "pinyinName": "Zi Su Zi",
    "botanicalName": "Fructus Perillae",
    "chineseCharacters": "紫蘇子",
    "category": "6. Thuốc Hóa Đàm Chỉ Khái Bình Suyễn (Transform Phlegm & Relieve Cough)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Cay"
      ],
      "channels": [
        "Phế",
        "Đại trường"
      ]
    },
    "dosageGram": "5 - 10g",
    "actions": [
      "Giáng khí hóa đàm",
      "Chỉ khái bình suyễn",
      "Nhuận tràng thông tiện"
    ],
    "clinicalIndications": [
      "Đờm tắc phế khí ho thở dốc",
      "Hen phế quản đờm dãi nghẽn cổ",
      "Người già táo bón kèm ho suyễn"
    ],
    "contraindications": "Kỵ ho do âm hư hoặc tiêu chảy phân lỏng.",
    "benskyNotes": "Dan Bensky: Tinh dầu giáng phế khí nghịch hạ đờm tiêu suyễn, làm ấm phế quản."
  },
  {
    "id": "khoan-dong-hoa",
    "vietnameseName": "Khoản đông hoa",
    "pinyinName": "Kuan Dong Hua",
    "botanicalName": "Flos Farfarae",
    "chineseCharacters": "款冬花",
    "category": "6. Thuốc Hóa Đàm Chỉ Khái Bình Suyễn (Transform Phlegm & Relieve Cough)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Cay",
        "Hơi đắng"
      ],
      "channels": [
        "Phế"
      ]
    },
    "dosageGram": "5 - 10g",
    "actions": [
      "Nhuận phế hạ khí",
      "Hóa đàm chỉ khái",
      "Bình suyễn trừ đờm"
    ],
    "clinicalIndications": [
      "Ho lâu ngày không dứt, ho suyễn",
      "Ho ra máu, lao phổi ho khan ho đờm",
      "Viêm phế quản mạn tính"
    ],
    "contraindications": "Thận trọng phế nhiệt sốt cao đờm vàng đặc quánh.",
    "benskyNotes": "Dan Bensky: Vị thuốc chỉ khái ôn nhuận không táo, dùng được cho cả ho hàn lẫn ho nhiệt."
  },
  {
    "id": "tu-uyen",
    "vietnameseName": "Tử uyển",
    "pinyinName": "Zi Wan",
    "botanicalName": "Radix Asteris",
    "chineseCharacters": "紫菀",
    "category": "6. Thuốc Hóa Đàm Chỉ Khái Bình Suyễn (Transform Phlegm & Relieve Cough)",
    "properties": {
      "nature": "Hơi ôn",
      "flavors": [
        "Đắng",
        "Cay"
      ],
      "channels": [
        "Phế"
      ]
    },
    "dosageGram": "5 - 10g",
    "actions": [
      "Nhuận phế giáng khí",
      "Tiêu đàm chỉ khái",
      "Khai thông phế bế"
    ],
    "clinicalIndications": [
      "Tân khái ngoại cảm ho gió ho khan",
      "Cửu khái ho lâu năm hư lao",
      "Ho đờm lẫn tơ máu"
    ],
    "contraindications": "Kỵ sốt cao thực nhiệt đờm nghẹt.",
    "benskyNotes": "Dan Bensky: Luôn phối hợp cùng Khoản đông hoa tạo thành cặp bài trùng trị ho kinh điển."
  },
  {
    "id": "tien-ho",
    "vietnameseName": "Tiền hồ",
    "pinyinName": "Qian Hu",
    "botanicalName": "Radix Peucedani",
    "chineseCharacters": "前胡",
    "category": "6. Thuốc Hóa Đàm Chỉ Khái Bình Suyễn (Transform Phlegm & Relieve Cough)",
    "properties": {
      "nature": "Hơi hàn",
      "flavors": [
        "Đắng",
        "Cay"
      ],
      "channels": [
        "Phế"
      ]
    },
    "dosageGram": "5 - 10g",
    "actions": [
      "Giáng khí hóa đàm",
      "Tuyên tán phong nhiệt",
      "Chỉ khái bình suyễn"
    ],
    "clinicalIndications": [
      "Ho đờm vàng đặc phong nhiệt phạm phế",
      "Tức ngực khó thở do phế khí bế",
      "Cảm mạo sốt ho đờm dính"
    ],
    "contraindications": "Kỵ ho hàn đờm loãng trong hoặc âm hư ho khan.",
    "benskyNotes": "Dan Bensky: Giáng đờm khí nghịch xuống mà vẫn sơ tán tà khí ở biểu mô."
  },
  {
    "id": "bach-gioi-tu",
    "vietnameseName": "Bạch giới tử (Hạt cải trắng)",
    "pinyinName": "Bai Jie Zi",
    "botanicalName": "Semen Sinapis Albae",
    "chineseCharacters": "白芥子",
    "category": "6. Thuốc Hóa Đàm Chỉ Khái Bình Suyễn (Transform Phlegm & Relieve Cough)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Cay"
      ],
      "channels": [
        "Phế"
      ]
    },
    "dosageGram": "3 - 9g",
    "actions": [
      "Ôn phế hóa đàm",
      "Trừ đàm ẩm lưu trệ ở kinh lạc",
      "Tán kết tiêu thũng chỉ thống"
    ],
    "clinicalIndications": [
      "Đờm lạnh ủng tắc phế hen suyễn",
      "Đau nhức khớp mạn tính do đàm thấp lưu trệ",
      "Hạch đàm, viêm màng phổi tràn dịch"
    ],
    "contraindications": "Kỵ loét dạ dày tá tràng, âm hư ho khan.",
    "benskyNotes": "Dan Bensky: Xuyên qua kinh lạc quét sạch đàm ẩm sâu trong xương tủy và màng ngực sườn."
  },
  {
    "id": "truc-nhu",
    "vietnameseName": "Trúc nhự (Tinh tre)",
    "pinyinName": "Zhu Ru",
    "botanicalName": "Caulis Bambusae in Taenia",
    "chineseCharacters": "竹茹",
    "category": "6. Thuốc Hóa Đàm Chỉ Khái Bình Suyễn (Transform Phlegm & Relieve Cough)",
    "properties": {
      "nature": "Hơi hàn",
      "flavors": [
        "Ngọt"
      ],
      "channels": [
        "Phế",
        "Vị",
        "Can"
      ]
    },
    "dosageGram": "5 - 10g",
    "actions": [
      "Thanh nhiệt hóa đàm",
      "Trừ phiền chỉ ẩu",
      "Lương huyết an thai"
    ],
    "clinicalIndications": [
      "Đờm nhiệt ho suyễn đờm vàng",
      "Vị nhiệt nôn mửa nấc cụt dữ dội",
      "Mất ngủ bồn chồn, nôn nghén có thai"
    ],
    "contraindications": "Kỵ nôn mửa do vị hư hàn.",
    "benskyNotes": "Dan Bensky: Trừ nhiệt đàm ở Tâm Phế và thanh vị nhiệt chỉ nôn, vị thuốc thanh nhã tuyệt vời."
  },
  {
    "id": "dien-ho-sach",
    "vietnameseName": "Diên hồ sách (Huyền hồ)",
    "pinyinName": "Yan Hu Suo",
    "botanicalName": "Rhizoma Corydalis",
    "chineseCharacters": "延胡索",
    "category": "10. Thuốc Lý Huyết (Regulate Blood)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Cay",
        "Đắng"
      ],
      "channels": [
        "Can",
        "Tỳ"
      ]
    },
    "dosageGram": "3 - 10g",
    "actions": [
      "Hoạt huyết hành khí",
      "Chỉ thống giảm đau toàn thân",
      "Hóa ứ sinh cơ"
    ],
    "clinicalIndications": [
      "Đau thắt ngực cơ tim, đau ngực sườn",
      "Đau bụng kinh dữ dội, bế kinh huyết ứ",
      "Đau dạ dày co thắt, đau chấn thương đụng dập"
    ],
    "contraindications": "Phụ nữ có thai cấm dùng.",
    "benskyNotes": "Dan Bensky: Chứa alkaloid Corydaline giảm đau mạnh ngang dẫn xuất Opiate mà không gây nghiện; sao giấm tăng lực giảm đau."
  },
  {
    "id": "hoa-hoe",
    "vietnameseName": "Hoa hòe",
    "pinyinName": "Huai Hua",
    "botanicalName": "Flos Sophorae",
    "chineseCharacters": "槐花",
    "category": "10. Thuốc Lý Huyết (Regulate Blood)",
    "properties": {
      "nature": "Hơi hàn",
      "flavors": [
        "Đắng"
      ],
      "channels": [
        "Can",
        "Đại trường"
      ]
    },
    "dosageGram": "6 - 15g",
    "actions": [
      "Lương huyết chỉ huyết cầm máu",
      "Thanh can tả hỏa",
      "Làm bền thành mạch hạ huyết áp"
    ],
    "clinicalIndications": [
      "Bệnh trĩ chảy máu, đại tiện ra máu",
      "Chảy máu cam, xuất huyết dưới da",
      "Cao huyết áp xơ cứng động mạch, đau mắt đỏ"
    ],
    "contraindications": "Kỵ tỳ vị hư hàn đi ngoài lỏng.",
    "benskyNotes": "Dan Bensky: Chứa hàm lượng Rutin cực cao bảo vệ mao mạch và cầm máu đại tràng trực tràng."
  },
  {
    "id": "trac-bach-diep",
    "vietnameseName": "Trắc bách diệp",
    "pinyinName": "Ce Bai Ye",
    "botanicalName": "Cacumen Platycladi",
    "chineseCharacters": "側柏葉",
    "category": "10. Thuốc Lý Huyết (Regulate Blood)",
    "properties": {
      "nature": "Hàn",
      "flavors": [
        "Đắng",
        "Chát"
      ],
      "channels": [
        "Phế",
        "Can",
        "Đại trường"
      ]
    },
    "dosageGram": "6 - 12g",
    "actions": [
      "Lương huyết chỉ huyết",
      "Hóa đàm chỉ khái",
      "Sinh phát mọc tóc đen râu"
    ],
    "clinicalIndications": [
      "Các chứng xuất huyết nhiệt nôn ra máu, ho ra máu",
      "Băng lậu rong huyết",
      "Rụng tóc từng mảng, hói đầu tóc bạc sớm"
    ],
    "contraindications": "Tránh dùng kéo dài khi không có xuất huyết.",
    "benskyNotes": "Dan Bensky: Sao cháy tăng lực cầm máu; dùng tươi ngâm cồn bôi ngoài kích thích mọc tóc mọc lông mày."
  },
  {
    "id": "bach-cap",
    "vietnameseName": "Bạch cập",
    "pinyinName": "Bai Ji",
    "botanicalName": "Rhizoma Bletillae",
    "chineseCharacters": "白及",
    "category": "10. Thuốc Lý Huyết (Regulate Blood)",
    "properties": {
      "nature": "Hơi hàn",
      "flavors": [
        "Đắng",
        "Ngọt",
        "Chát"
      ],
      "channels": [
        "Phế",
        "Can",
        "Vị"
      ]
    },
    "dosageGram": "3 - 10g",
    "actions": [
      "Thu liễm chỉ huyết",
      "Tiêu thũng sinh cơ liền sẹo",
      "Bảo vệ niêm mạc loét"
    ],
    "clinicalIndications": [
      "Xuất huyết dạ dày tá tràng ho ra máu",
      "Vết loét dạ dày lâu lành",
      "Nứt nẻ da chân tay, bỏng lửa lở loét"
    ],
    "contraindications": "Tương phản Ô đầu, Phụ tử.",
    "benskyNotes": "Dan Bensky: Chất nhầy Bletilla bao phủ ổ loét dạ dày cầm máu và kích thích mô hạt tái sinh cực nhanh."
  },
  {
    "id": "ngai-diep",
    "vietnameseName": "Ngải diệp (Ngải cứu)",
    "pinyinName": "Ai Ye",
    "botanicalName": "Folium Artemisiae Argyi",
    "chineseCharacters": "艾葉",
    "category": "10. Thuốc Lý Huyết (Regulate Blood)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Cay",
        "Đắng"
      ],
      "channels": [
        "Can",
        "Tỳ",
        "Thận"
      ]
    },
    "dosageGram": "3 - 9g",
    "actions": [
      "Ôn kinh chỉ huyết",
      "Tán hàn chỉ thống",
      "An thai và chế cứu ngải"
    ],
    "clinicalIndications": [
      "Hư hàn băng lậu rong kinh rong huyết",
      "Đau bụng kinh do hàn ngưng trệ",
      "Dọa sẩy thai đau bụng ra máu, mồi ngải cứu huyệt"
    ],
    "contraindications": "Kỵ âm hư huyết nhiệt ra máu tươi đỏ.",
    "benskyNotes": "Dan Bensky: Vị thuốc ôn kinh cầm máu số 1 sản phụ khoa; nguyên liệu chế ngải nhung trong châm cứu cứu ngải."
  },
  {
    "id": "nga-truat",
    "vietnameseName": "Nga truật (Nghệ đen)",
    "pinyinName": "E Zhu",
    "botanicalName": "Rhizoma Curcumae Ezhu",
    "chineseCharacters": "莪朮",
    "category": "10. Thuốc Lý Huyết (Regulate Blood)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Cay",
        "Đắng"
      ],
      "channels": [
        "Can",
        "Tỳ"
      ]
    },
    "dosageGram": "3 - 9g",
    "actions": [
      "Phá huyết trục ứ",
      "Hành khí tiêu tích",
      "Chỉ thống tiêu ung bướu"
    ],
    "clinicalIndications": [
      "Hòn cục tích tụ ở bụng (Trưng hà tích tụ)",
      "Bế kinh đau bụng kinh co thắt",
      "Ung thư bướu khối, ăn không tiêu trướng bụng"
    ],
    "contraindications": "Phụ nữ có thai và rong kinh kinh nguyệt quá nhiều cấm dùng.",
    "benskyNotes": "Dan Bensky: Phá huyết tiêu tích tụ khối u; tác dụng phá huyết mạnh hơn Tam lăng."
  },
  {
    "id": "tam-lang",
    "vietnameseName": "Tam lăng",
    "pinyinName": "San Leng",
    "botanicalName": "Rhizoma Sparganii",
    "chineseCharacters": "三稜",
    "category": "10. Thuốc Lý Huyết (Regulate Blood)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Cay",
        "Đắng"
      ],
      "channels": [
        "Can",
        "Tỳ"
      ]
    },
    "dosageGram": "3 - 9g",
    "actions": [
      "Phá huyết tán ứ",
      "Hành khí tiêu tích",
      "Chỉ thống hóa kết"
    ],
    "clinicalIndications": [
      "Bế kinh huyết ứ kết tụ thành hòn cục",
      "Khối u vùng bụng, gan lách to",
      "Đau bụng trướng tức do thực tích"
    ],
    "contraindications": "Úy Mang tiêu (Thập cửu úy); phụ nữ có thai cấm dùng.",
    "benskyNotes": "Dan Bensky: Luôn phối hợp cùng Nga truật tạo thành cặp Tam lăng - Nga truật phá khối u bướu huyết tích."
  },
  {
    "id": "bo-hoang",
    "vietnameseName": "Bồ hoàng (Phấn hoa cỏ nến)",
    "pinyinName": "Pu Huang",
    "botanicalName": "Pollen Typhae",
    "chineseCharacters": "蒲黃",
    "category": "10. Thuốc Lý Huyết (Regulate Blood)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Ngọt"
      ],
      "channels": [
        "Can",
        "Tâm bào"
      ]
    },
    "dosageGram": "3 - 10g",
    "actions": [
      "Chỉ huyết cầm máu (dùng sao)",
      "Hóa ứ hoạt huyết (dùng sống)",
      "Lợi niệu thông lâm"
    ],
    "clinicalIndications": [
      "Xuất huyết các loại: Thổ huyết, nục huyết, băng lậu",
      "Đau bụng ứ huyết sau sinh, đau thắt ngực",
      "Tiểu ra máu, đái buốt"
    ],
    "contraindications": "Phụ nữ mang thai cấm dùng dạng sống.",
    "benskyNotes": "Dan Bensky: Dùng sống thì hoạt huyết thông ứ; sao đen thán thì thu liễm chỉ huyết cầm máu tức thì."
  },
  {
    "id": "chi-xac",
    "vietnameseName": "Chỉ xác",
    "pinyinName": "Zhi Qiao",
    "botanicalName": "Fructus Aurantii",
    "chineseCharacters": "枳殼",
    "category": "9. Thuốc Lý Khí (Regulate Qi)",
    "properties": {
      "nature": "Hơi hàn",
      "flavors": [
        "Đắng",
        "Cay",
        "Chua"
      ],
      "channels": [
        "Tỳ",
        "Vị"
      ]
    },
    "dosageGram": "3 - 10g",
    "actions": [
      "Lý khí khoan hung",
      "Hành khí tiêu trướng",
      "Nâng tạng phủ sa giáng"
    ],
    "clinicalIndications": [
      "Ngực sườn đầy trướng ách tức",
      "Ăn uống chậm tiêu trướng bụng ợ hơi",
      "Sa dạ dày, sa trực tràng, sa tử cung"
    ],
    "contraindications": "Phụ nữ có thai và tỳ vị hư nhược dùng cẩn trọng.",
    "benskyNotes": "Dan Bensky: Quả già của cây Citrus aurantium, tính êm dịu hơn Chỉ thực, chuyên thư giãn khoang ngực."
  },
  {
    "id": "thanh-bi",
    "vietnameseName": "Thanh bì (Vỏ quýt non)",
    "pinyinName": "Qing Pi",
    "botanicalName": "Pericarpium Citri Reticulatae Viride",
    "chineseCharacters": "青皮",
    "category": "9. Thuốc Lý Khí (Regulate Qi)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Đắng",
        "Cay"
      ],
      "channels": [
        "Can",
        "Đởm",
        "Vị"
      ]
    },
    "dosageGram": "3 - 10g",
    "actions": [
      "Sơ can phá khí",
      "Tiêu tích hóa trệ",
      "Tán kết chỉ thống"
    ],
    "clinicalIndications": [
      "Can khí uất trệ đau tức hai mạng sườn",
      "Viêm tuyến vú, u xơ tuyến vú đau tức",
      "Sán khí đau tinh hoàn, thực tích hòn cục"
    ],
    "contraindications": "Khí hư không có trệ trướng cấm dùng.",
    "benskyNotes": "Dan Bensky: Lực phá khí sơ can mạnh hơn Trần bì rất nhiều, chuyên khai thông can khí uất kết."
  },
  {
    "id": "o-duoc",
    "vietnameseName": "Ô dược",
    "pinyinName": "Wu Yao",
    "botanicalName": "Radix Linderae",
    "chineseCharacters": "烏藥",
    "category": "9. Thuốc Lý Khí (Regulate Qi)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Cay"
      ],
      "channels": [
        "Phế",
        "Tỳ",
        "Thận",
        "Bàng quang"
      ]
    },
    "dosageGram": "3 - 10g",
    "actions": [
      "Hành khí chỉ thống",
      "Ôn thận tán hàn",
      "Sáp niệu chỉ di"
    ],
    "clinicalIndications": [
      "Khí trệ hàn ngưng đau bụng dưới, sán khí",
      "Đau bụng kinh hư hàn",
      "Bàng quang hư hàn đái dầm tiểu đêm nhiều lần"
    ],
    "contraindications": "Kỵ khí hư huyết nhiệt.",
    "benskyNotes": "Dan Bensky: Ôn thận bàng quang và hành khí thông kinh mạch vùng hạ tiêu."
  },
  {
    "id": "tram-huong",
    "vietnameseName": "Trầm hương",
    "pinyinName": "Chen Xiang",
    "botanicalName": "Lignum Aquilariae",
    "chineseCharacters": "沉香",
    "category": "9. Thuốc Lý Khí (Regulate Qi)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Cay",
        "Đắng"
      ],
      "channels": [
        "Tỳ",
        "Vị",
        "Thận"
      ]
    },
    "dosageGram": "1 - 5g",
    "actions": [
      "Hành khí chỉ thống",
      "Ôn trung giáng nghịch",
      "Nạp khí bình suyễn"
    ],
    "clinicalIndications": [
      "Tỳ vị hư hàn đau dạ dày nôn mửa",
      "Nấc cụt liên tục không dứt",
      "Thận hư không nạp phế khí hen suyễn khó thở"
    ],
    "contraindications": "Kỵ khí hư hạ hãm và âm hư hỏa vượng.",
    "benskyNotes": "Dan Bensky: Dược liệu quý hiếm giáng khí nghịch nạp vào thận, mài nước uống khi thuốc thang đã sắc."
  },
  {
    "id": "dai-phuc-bi",
    "vietnameseName": "Đại phúc bì (Vỏ quả cau)",
    "pinyinName": "Da Fu Pi",
    "botanicalName": "Pericarpium Arecae",
    "chineseCharacters": "大腹皮",
    "category": "9. Thuốc Lý Khí (Regulate Qi)",
    "properties": {
      "nature": "Hơi ôn",
      "flavors": [
        "Cay"
      ],
      "channels": [
        "Tỳ",
        "Vị",
        "Đại trường"
      ]
    },
    "dosageGram": "5 - 10g",
    "actions": [
      "Hạ khí khoan trung",
      "Hành khí đạo trệ",
      "Lợi thủy tiêu thũng"
    ],
    "clinicalIndications": [
      "Ngực bụng đầy trướng ách tức đại tiện bí",
      "Phù thũng bụng to báng nước cước khí",
      "Ăn không tiêu bụng óc ách nước"
    ],
    "contraindications": "Kỵ khí hư không có tích trệ thủy thấp.",
    "benskyNotes": "Dan Bensky: Vừa hành khí vừa lợi thủy tiêu thũng, trị trướng bụng phù nề cực hay."
  },
  {
    "id": "bach-dau-khau",
    "vietnameseName": "Bạch đậu khấu",
    "pinyinName": "Bai Dou Kou",
    "botanicalName": "Fructus Amomi Kravanh",
    "chineseCharacters": "白豆蔻",
    "category": "7. Thuốc Phương Hương Hóa Thấp (Aromatic Transform Dampness)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Cay"
      ],
      "channels": [
        "Phế",
        "Tỳ",
        "Vị"
      ]
    },
    "dosageGram": "3 - 6g",
    "actions": [
      "Hóa thấp hành khí",
      "Ôn trung chỉ ẩu",
      "Khai vị tiêu thực"
    ],
    "clinicalIndications": [
      "Thấp trọc trở trệ tỳ vị nôn mửa",
      "Đầy bụng sôi ruột biếng ăn",
      "Nấc cụt lạnh dạ dày ợ hơi chua"
    ],
    "contraindications": "Kỵ âm hư huyết táo không có thấp.",
    "benskyNotes": "Dan Bensky: Tinh dầu phương hương khai vị phá thấp thượng tiêu và trung tiêu; cho vào sau khi sắc thuốc."
  },
  {
    "id": "thao-qua",
    "vietnameseName": "Thảo quả",
    "pinyinName": "Cao Guo",
    "botanicalName": "Fructus Tsaoko",
    "chineseCharacters": "草果",
    "category": "7. Thuốc Phương Hương Hóa Thấp (Aromatic Transform Dampness)",
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
    "dosageGram": "3 - 6g",
    "actions": [
      "Táo thấp ôn trung",
      "Tiệt ngược sốt rét",
      "Trừ đờm tích tiêu hàn"
    ],
    "clinicalIndications": [
      "Sốt rét hàn nhiệt vãng lai do đàm thấp",
      "Lạnh bụng đau quặn nôn mửa tiêu chảy",
      "Đờm ẩm đình trệ ăn không tiêu đầy trướng"
    ],
    "contraindications": "Kỵ khí huyết hư không có hàn thấp thực nhiệt.",
    "benskyNotes": "Dan Bensky: Đặc hiệu trừ đàm ngược sốt rét và sưởi ấm tỳ vị hư hàn tích trệ."
  },
  {
    "id": "tieu-hoi-huong",
    "vietnameseName": "Tiểu hồi hương",
    "pinyinName": "Xiao Hui Xiang",
    "botanicalName": "Fructus Foeniculi",
    "chineseCharacters": "小茴香",
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
    "dosageGram": "3 - 8g",
    "actions": [
      "Tán hàn chỉ thống",
      "Lý khí hòa vị",
      "Ôn can thận chỉ sán"
    ],
    "clinicalIndications": [
      "Sán khí đau sa tinh hoàn co thắt",
      "Đau bụng kinh do hư hàn lạnh tử cung",
      "Đau dạ dày do lạnh nôn mửa kém ăn"
    ],
    "contraindications": "Kỵ âm hư hỏa vượng sốt cao.",
    "benskyNotes": "Dan Bensky: Đi thẳng vào Can kinh vùng hạ tiêu sưởi ấm tinh hoàn và tử cung hàn lạnh."
  },
  {
    "id": "dinh-huong",
    "vietnameseName": "Đinh hương",
    "pinyinName": "Ding Xiang",
    "botanicalName": "Flos Caryophylli",
    "chineseCharacters": "丁香",
    "category": "11. Thuốc Ôn Lý Trừ Hàn (Warm Interior & Expel Cold)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Cay"
      ],
      "channels": [
        "Tỳ",
        "Vị",
        "Thận"
      ]
    },
    "dosageGram": "1 - 3g",
    "actions": [
      "Ôn trung giáng nghịch",
      "Bổ thận trợ dương",
      "Tán hàn chỉ thống chỉ nấc"
    ],
    "clinicalIndications": [
      "Nấc cụt hư hàn liên tục không ngừng",
      "Nôn mửa tiêu chảy do tỳ vị lạnh buốt",
      "Liệt dương xuất tinh sớm do thận dương hư"
    ],
    "contraindications": "Tương phản Uất kim; kỵ nhiệt chứng.",
    "benskyNotes": "Dan Bensky: Thánh dược trị nấc cụt do vị hàn (phối Hợp Đinh hương - Thị đế); tinh dầu Eugenol gây tê giảm đau răng."
  },
  {
    "id": "lien-tu",
    "vietnameseName": "Liên tử (Hạt sen)",
    "pinyinName": "Lian Zi",
    "botanicalName": "Semen Nelumbinis",
    "chineseCharacters": "蓮子",
    "category": "13. Thuốc Cố Sáp (Stabilize and Bind)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Ngọt",
        "Chát"
      ],
      "channels": [
        "Tỳ",
        "Thận",
        "Tâm"
      ]
    },
    "dosageGram": "8 - 15g",
    "actions": [
      "Bổ tỳ chỉ tả",
      "Ích thận sáp tinh",
      "Dưỡng tâm an thần"
    ],
    "clinicalIndications": [
      "Tỳ hư tiêu chảy mạn tính biếng ăn",
      "Thận hư di tinh mộng tinh hoạt tinh",
      "Tâm quý hồi hộp mất ngủ lo âu"
    ],
    "contraindications": "Kỵ táo bón đầy trướng bụng do nhiệt.",
    "benskyNotes": "Dan Bensky: Vừa bổ Tỳ Thận vừa liễm sáp an thần, món ăn vị thuốc dưỡng sinh hàng đầu."
  },
  {
    "id": "khiem-thuc",
    "vietnameseName": "Khiếm thực (Củ súng)",
    "pinyinName": "Qian Shi",
    "botanicalName": "Semen Euryales",
    "chineseCharacters": "芡實",
    "category": "13. Thuốc Cố Sáp (Stabilize and Bind)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Ngọt",
        "Chát"
      ],
      "channels": [
        "Tỳ",
        "Thận"
      ]
    },
    "dosageGram": "10 - 20g",
    "actions": [
      "Ích thận cố tinh",
      "Kiện tỳ chỉ tả",
      "Trừ thấp chỉ đới"
    ],
    "clinicalIndications": [
      "Di tinh hoạt tinh tiểu đêm nhiều lần",
      "Tiêu chảy mạn tính phân sống do tỳ hư",
      "Khí hư bạch đới ở phụ nữ do thấp nhiệt đọng"
    ],
    "contraindications": "Kỵ đại tiện bí táo, đầy bụng khó tiêu.",
    "benskyNotes": "Dan Bensky: Bổ tỳ trừ thấp mà cố tinh sáp niệu, phối Liên tử và Kim anh tử tăng hiệu quả cố sáp."
  },
  {
    "id": "kim-anh-tu",
    "vietnameseName": "Kim anh tử",
    "pinyinName": "Jin Ying Zi",
    "botanicalName": "Fructus Rosae Laevigatae",
    "chineseCharacters": "金櫻子",
    "category": "13. Thuốc Cố Sáp (Stabilize and Bind)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Chua",
        "Chát"
      ],
      "channels": [
        "Thận",
        "Bàng quang",
        "Đại trường"
      ]
    },
    "dosageGram": "6 - 12g",
    "actions": [
      "Cố tinh sáp niệu",
      "Sáp trường chỉ tả",
      "Thu liễm chỉ đới"
    ],
    "clinicalIndications": [
      "Di tinh di niệu đái dầm đái đêm",
      "Tiêu chảy kéo dài không cầm",
      "Băng lậu rong huyết, bạch đới khí hư"
    ],
    "contraindications": "Kỵ thực tà tích trệ và cảm sốt mới phát.",
    "benskyNotes": "Dan Bensky: Vị chua chát thuần túy thu liễm cố sáp tinh khí và chất dịch rò rỉ của cơ thể."
  },
  {
    "id": "kha-tu",
    "vietnameseName": "Kha tử (Kha lê)",
    "pinyinName": "He Zi",
    "botanicalName": "Fructus Chebulae",
    "chineseCharacters": "訶子",
    "category": "13. Thuốc Cố Sáp (Stabilize and Bind)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Đắng",
        "Chua",
        "Chát"
      ],
      "channels": [
        "Phế",
        "Đại trường"
      ]
    },
    "dosageGram": "3 - 9g",
    "actions": [
      "Liễm phế chỉ khái",
      "Khai âm lợi hầu họng",
      "Sáp trường chỉ tả"
    ],
    "clinicalIndications": [
      "Ho lâu ngày khản tiếng mất giọng",
      "Viêm họng mạn tính đau rát cổ",
      "Tiêu chảy mạn tính kiết lỵ sa trực tràng"
    ],
    "contraindications": "Kỵ cảm mạo ngoại tà và thực nhiệt mới phát.",
    "benskyNotes": "Dan Bensky: Ngậm Kha tử thông giọng chữa khàn tiếng và liễm phế chỉ khái cực tốt."
  },
  {
    "id": "o-mai",
    "vietnameseName": "Ô mai (Mơ muối)",
    "pinyinName": "Wu Mei",
    "botanicalName": "Fructus Mume",
    "chineseCharacters": "烏梅",
    "category": "13. Thuốc Cố Sáp (Stabilize and Bind)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Chua",
        "Chát"
      ],
      "channels": [
        "Can",
        "Tỳ",
        "Phế",
        "Đại trường"
      ]
    },
    "dosageGram": "3 - 10g",
    "actions": [
      "Liễm phế chỉ khái",
      "Sáp trường chỉ tả",
      "Sinh tân chỉ khát",
      "An hồi định thống"
    ],
    "clinicalIndications": [
      "Ho lâu ngày rách phổi khản giọng",
      "Tiêu chảy kéo dài kiết lỵ mạn",
      "Tiêu khát đái tháo đường khát nước",
      "Giun chui ống mật đau quặn bụng"
    ],
    "contraindications": "Kỵ thực tích và ngoại tà chưa giải.",
    "benskyNotes": "Dan Bensky: Vị chua sinh tân dịch và làm dịu giun (an hồi); chủ vị bài Ô Mai Hoàn trị giun chui ống mật."
  },
  {
    "id": "bach-tat-le",
    "vietnameseName": "Bạch tật lê",
    "pinyinName": "Bai Ji Li",
    "botanicalName": "Fructus Tribuli",
    "chineseCharacters": "白蒺藜",
    "category": "16. Thuốc Bình Can Tức Phong (Extinguish Wind)",
    "properties": {
      "nature": "Hơi ôn",
      "flavors": [
        "Đắng",
        "Cay"
      ],
      "channels": [
        "Can"
      ]
    },
    "dosageGram": "6 - 10g",
    "actions": [
      "Bình can tiềm dương",
      "Sơ can giải uất",
      "Khứ phong minh mục chỉ ngứa"
    ],
    "clinicalIndications": [
      "Đau đầu chóng mặt do can dương thượng kháng",
      "Đau tức ngực sườn tắc tia sữa",
      "Mắt đỏ nhiều ghèn mộng thịt ngứa da mề đay"
    ],
    "contraindications": "Kỵ huyết hư không có phong nhiệt và phụ nữ có thai.",
    "benskyNotes": "Dan Bensky: Bình can hạ huyết áp đồng thời trừ phong chỉ ngứa trên da mặt và mắt."
  },
  {
    "id": "thach-quyet-minh",
    "vietnameseName": "Thạch quyết minh (Vỏ bào ngư)",
    "pinyinName": "Shi Jue Ming",
    "botanicalName": "Concha Haliotidis",
    "chineseCharacters": "石決明",
    "category": "16. Thuốc Bình Can Tức Phong (Extinguish Wind)",
    "properties": {
      "nature": "Hàn",
      "flavors": [
        "Mặn"
      ],
      "channels": [
        "Can"
      ]
    },
    "dosageGram": "15 - 30g",
    "actions": [
      "Bình can tiềm dương",
      "Thanh can minh mục",
      "Thu liễm sinh cơ"
    ],
    "clinicalIndications": [
      "Cao huyết áp chóng mặt hoa mắt giật mí mắt",
      "Mắt đỏ sưng đau mờ mắt mộng thịt",
      "Đau đầu dữ dội do can hỏa vượng"
    ],
    "contraindications": "Kỵ tỳ vị hư hàn tiêu chảy.",
    "benskyNotes": "Dan Bensky: Sắc trước 20 phút để hòa tan muối canxi và khoáng chất hạ áp sáng mắt."
  },
  {
    "id": "ba-tu-nhan",
    "vietnameseName": "Bá tử nhân (Hạt trắc bách)",
    "pinyinName": "Bai Zi Ren",
    "botanicalName": "Semen Platycladi",
    "chineseCharacters": "柏子仁",
    "category": "14. Thuốc An Thần (Calm the Spirit)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Ngọt"
      ],
      "channels": [
        "Tâm",
        "Thận",
        "Đại trường"
      ]
    },
    "dosageGram": "6 - 12g",
    "actions": [
      "Dưỡng tâm an thần",
      "Nhuận tràng thông tiện",
      "Chỉ hãn cầm mồ hôi trộm"
    ],
    "clinicalIndications": [
      "Huyết hư mất ngủ hồi hộp giật mình",
      "Hay quên hay mơ ngủ không sâu",
      "Người già huyết hư khô tân dịch táo bón"
    ],
    "contraindications": "Kỵ tiêu chảy phân sống lỏng nát đờm nhiều.",
    "benskyNotes": "Dan Bensky: Giàu chất béo nhuận tràng đồng thời dưỡng huyết an thần nuôi dưỡng cơ tim."
  },
  {
    "id": "hop-hoan-bi",
    "vietnameseName": "Hợp hoan bì (Vỏ cây hợp hoan)",
    "pinyinName": "He Huan Pi",
    "botanicalName": "Cortex Albiziae",
    "chineseCharacters": "合歡皮",
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
    "dosageGram": "6 - 12g",
    "actions": [
      "Giải uất an thần",
      "Hoạt huyết chỉ thống",
      "Tiêu ung thũng"
    ],
    "clinicalIndications": [
      "Trầm cảm lo âu u uất phiền muộn",
      "Mất ngủ hay quên đau tức ngực sườn",
      "Chấn thương đụng dập bầm tím áp xe phổi"
    ],
    "contraindications": "Thận trọng phụ nữ có thai.",
    "benskyNotes": "Dan Bensky: Cây hoan hỷ thư thái tinh thần, chuyên trị hội chứng suy nhược thần kinh lo âu trầm cảm."
  },
  {
    "id": "da-giao-dang",
    "vietnameseName": "Dạ giao đằng (Dây hà thủ ô)",
    "pinyinName": "Ye Jiao Teng",
    "botanicalName": "Caulis Polygoni Multiflori",
    "chineseCharacters": "夜交藤",
    "category": "14. Thuốc An Thần (Calm the Spirit)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Ngọt",
        "Hơi đắng"
      ],
      "channels": [
        "Tâm",
        "Can"
      ]
    },
    "dosageGram": "10 - 30g",
    "actions": [
      "Dưỡng tâm an thần",
      "Khứ phong thông kinh lạc",
      "Chỉ ngứa ngoài da"
    ],
    "clinicalIndications": [
      "Âm hư huyết hư mất ngủ đa mộng",
      "Đau nhức khớp chân tay tê bì",
      "Ngứa ngáy ngoài da mẩn đỏ dị ứng"
    ],
    "contraindications": "Không có độc tính hay kỵ chứng nặng.",
    "benskyNotes": "Dan Bensky: Ban đêm hai dây quấn giao nhau (dạ giao), biểu tượng của giấc ngủ sâu và thông suốt kinh lạc."
  },
  {
    "id": "cot-toai-bo",
    "vietnameseName": "Cốt toái bổ",
    "pinyinName": "Gu Sui Bu",
    "botanicalName": "Rhizoma Drynariae",
    "chineseCharacters": "骨碎補",
    "category": "12. Thuốc Bổ Ích (Tonifying Herbs)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Đắng"
      ],
      "channels": [
        "Can",
        "Thận"
      ]
    },
    "dosageGram": "6 - 15g",
    "actions": [
      "Bổ thận cường cốt",
      "Tục cân tiếp cốt liền xương",
      "Hoạt huyết chỉ thống"
    ],
    "clinicalIndications": [
      "Thận hư đau lưng mỏi gối ù tai điếc tai",
      "Gãy xương chấn thương bong gân",
      "Răng lung lay rụng răng chảy máu chân răng"
    ],
    "contraindications": "Kỵ âm hư nội nhiệt không có ứ huyết.",
    "benskyNotes": "Dan Bensky: Tăng sinh tế bào xương và hấp thu canxi, đứng đầu trong các vị thuốc liền xương gãy."
  },
  {
    "id": "tuc-doan",
    "vietnameseName": "Tục đoạn",
    "pinyinName": "Xu Duan",
    "botanicalName": "Radix Dipsaci",
    "chineseCharacters": "續斷",
    "category": "12. Thuốc Bổ Ích (Tonifying Herbs)",
    "properties": {
      "nature": "Hơi ôn",
      "flavors": [
        "Đắng",
        "Cay"
      ],
      "channels": [
        "Can",
        "Thận"
      ]
    },
    "dosageGram": "6 - 15g",
    "actions": [
      "Bổ can thận mạnh gân xương",
      "Thông huyết mạch liền gân xương",
      "An thai chỉ lậu"
    ],
    "clinicalIndications": [
      "Thoái hóa khớp đau lưng mỏi gối",
      "Gãy xương chấn thương đụng dập",
      "Dọa sẩy thai động thai rong huyết có thai"
    ],
    "contraindications": "Tránh dùng khi có thực nhiệt uất hỏa.",
    "benskyNotes": "Dan Bensky: Nối liền gân xương đứt gãy và an thai vững chắc cho phụ nữ có thai."
  },
  {
    "id": "tho-ty-tu",
    "vietnameseName": "Thỏ ty tử",
    "pinyinName": "Tu Si Zi",
    "botanicalName": "Semen Cuscutae",
    "chineseCharacters": "菟絲子",
    "category": "12. Thuốc Bổ Ích (Tonifying Herbs)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Cay",
        "Ngọt"
      ],
      "channels": [
        "Can",
        "Thận",
        "Tỳ"
      ]
    },
    "dosageGram": "6 - 15g",
    "actions": [
      "Bổ can thận",
      "Cố tinh sáp niệu",
      "Minh mục chỉ tả an thai"
    ],
    "clinicalIndications": [
      "Liệt dương di tinh xuất tinh sớm",
      "Tiểu nhiều lần tiểu đêm không tự chủ",
      "Mắt mờ hoa mắt tỳ hư tiêu chảy động thai"
    ],
    "contraindications": "Kỵ đại tiện bí kết âm hư hỏa vượng.",
    "benskyNotes": "Dan Bensky: Bổ dương mà không táo, bổ âm mà không nê trệ, vị thuốc bổ thận bình hòa nhất."
  },
  {
    "id": "han-lien-thao",
    "vietnameseName": "Hạn liên thảo (Cỏ mực)",
    "pinyinName": "Mo Han Lian",
    "botanicalName": "Herba Ecliptae",
    "chineseCharacters": "旱蓮草",
    "category": "12. Thuốc Bổ Ích (Tonifying Herbs)",
    "properties": {
      "nature": "Hàn",
      "flavors": [
        "Ngọt",
        "Chua"
      ],
      "channels": [
        "Can",
        "Thận"
      ]
    },
    "dosageGram": "6 - 15g",
    "actions": [
      "Tư bổ can thận âm",
      "Lương huyết chỉ huyết",
      "Làm đen râu tóc"
    ],
    "clinicalIndications": [
      "Can thận âm hư chóng mặt hoa mắt râu tóc bạc sớm",
      "Các chứng xuất huyết nhiệt thổ huyết nục huyết",
      "Tiểu ra máu rong kinh rong huyết"
    ],
    "contraindications": "Kỵ tỳ vị hư hàn tiêu chảy phân lỏng.",
    "benskyNotes": "Dan Bensky & Tuệ Tĩnh: Nam dược bổ can thận và cầm máu an toàn cực kỳ quen thuộc của Việt Nam."
  },
  {
    "id": "lai-phuc-tu",
    "vietnameseName": "Lai phục tử (Hạt củ cải)",
    "pinyinName": "Lai Fu Zi",
    "botanicalName": "Semen Raphani",
    "chineseCharacters": "萊菔子",
    "category": "8. Thuốc Tiêu Đạo (Relieve Food Stagnation)",
    "properties": {
      "nature": "Bình",
      "flavors": [
        "Cay",
        "Ngọt"
      ],
      "channels": [
        "Tỳ",
        "Vị",
        "Phế"
      ]
    },
    "dosageGram": "5 - 10g",
    "actions": [
      "Tiêu thực trừ trướng",
      "Giáng khí hóa đàm",
      "Thông tiện hạ khí"
    ],
    "clinicalIndications": [
      "Thực tích đầy bụng trướng hơi ợ chua",
      "Ăn không tiêu nôn mửa tiêu chảy",
      "Ho suyễn đờm nghẽn khó thở tức ngực"
    ],
    "contraindications": "Khí hư không có tích trệ cấm dùng nhiều; không dùng chung Nhân sâm.",
    "benskyNotes": "Dan Bensky: Vừa tiêu thực tích ở Vị vừa giáng đờm khí ở Phế; phá khí mạnh làm giảm tác dụng bổ của Nhân sâm."
  },
  {
    "id": "phan-ta-diep",
    "vietnameseName": "Phan tả diệp",
    "pinyinName": "Fan Xie Ye",
    "botanicalName": "Folium Sennae",
    "chineseCharacters": "番瀉葉",
    "category": "3. Thuốc Tả Hạ (Downward-Draining)",
    "properties": {
      "nature": "Hàn",
      "flavors": [
        "Ngọt",
        "Đắng"
      ],
      "channels": [
        "Đại trường"
      ]
    },
    "dosageGram": "1.5 - 6g",
    "actions": [
      "Tả nhiệt thông tiện",
      "Tiêu tích đạo trệ",
      "Hạ khí thông đường ruột"
    ],
    "clinicalIndications": [
      "Táo bón do nhiệt tích trướng bụng đầy hơi",
      "Chuẩn bị ruột trước nội soi đại tràng",
      "Tích trệ thức ăn không tiêu"
    ],
    "contraindications": "Phụ nữ có thai đang cho con bú và rong kinh cấm dùng; không sắc lâu.",
    "benskyNotes": "Dan Bensky: Chứa Sennoside A và B kích thích nhu động đại tràng tống phân ra ngoài; hãm nước sôi 5 phút uống."
  },
  {
    "id": "su-quan-tu",
    "vietnameseName": "Sử quân tử",
    "pinyinName": "Shi Jun Zi",
    "botanicalName": "Fructus Quisqualis",
    "chineseCharacters": "使君子",
    "category": "17. Thuốc Khu Trùng (Expel Parasites)",
    "properties": {
      "nature": "Ôn",
      "flavors": [
        "Ngọt"
      ],
      "channels": [
        "Tỳ",
        "Vị"
      ]
    },
    "dosageGram": "6 - 12g",
    "actions": [
      "Sát trùng tẩy giun sán",
      "Tiêu tích đạo trệ",
      "Kiện tỳ ích vị"
    ],
    "clinicalIndications": [
      "Nhiễm giun đũa giun kim trẻ em",
      "Trẻ em cam tích bụng ỏng đít teo biếng ăn",
      "Đau bụng do giun"
    ],
    "contraindications": "Kỵ uống cùng nước chè nóng gây nấc cụt nôn mửa.",
    "benskyNotes": "Dan Bensky: Vị ngọt thơm trẻ em dễ uống, vị thuốc tẩy giun đũa an toàn kinh điển."
  },
  {
    id: 'shan-yao',
    vietnameseName: 'Hoài sơn (Củ mài)',
    pinyinName: 'Shan Yao',
    botanicalName: 'Rhizoma Dioscoreae Oppositae',
    chineseCharacters: '山藥',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Bình',
      flavors: ['Ngọt'],
      channels: ['Tỳ', 'Phế', 'Thận']
    },
    dosageGram: '10 - 30g',
    actions: [
      'Bổ tỳ dưỡng vị sinh tân',
      'Bổ phế ích thận cố tinh',
      'Chỉ tả chỉ đới trị tiêu khát'
    ],
    clinicalIndications: [
      'Tỳ vị hư nhược ăn kém tiêu chảy mạn tính',
      'Phế hư ho hen lâu ngày thở ngắn',
      'Thận hư di tinh đái dầm bạch đới, đái tháo đường (Tiêu khát)'
    ],
    contraindications: 'Kỵ thực tà tích trệ đầy bụng táo bón.',
    benskyNotes: 'Dan Bensky: Tam bổ Tỳ - Phế - Thận vừa là thực phẩm dưỡng sinh vừa là chủ vị Lục Vị Địa Hoàng Hoàn.'
  },
  {
    id: 'da-zao',
    vietnameseName: 'Đại táo (Táo tàu đỏ)',
    pinyinName: 'Da Zao',
    botanicalName: 'Fructus Jujubae',
    chineseCharacters: '大棗',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Ôn',
      flavors: ['Ngọt'],
      channels: ['Tỳ', 'Vị']
    },
    dosageGram: '6 - 15g (3 - 12 quả)',
    actions: [
      'Bổ trung ích khí kiện tỳ',
      'Dưỡng huyết an thần',
      'Điều hòa tính liệt của các vị thuốc khác'
    ],
    clinicalIndications: [
      'Tỳ vị khí hư mệt mỏi kém ăn phân lỏng',
      'Tạng táo phụ nữ buồn bực khóc lóc mất ngủ (Cam Mạch Đại Táo Thang)',
      'Dị ứng ban xuất huyết giảm tiểu cầu'
    ],
    contraindications: 'Kỵ đờm thấp đầy bụng trướng hơi, sâu răng đau răng.',
    benskyNotes: 'Dan Bensky: Luôn phối Sinh khương để điều hòa Vinh - Vệ và bảo vệ niêm mạc dạ dày.'
  },
  {
    id: 'bai-bian-dou',
    vietnameseName: 'Bạch biển đậu (Đậu ván trắng)',
    pinyinName: 'Bai Bian Dou',
    botanicalName: 'Semen Lablab Album',
    chineseCharacters: '白扁豆',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Hơi ôn',
      flavors: ['Ngọt'],
      channels: ['Tỳ', 'Vị']
    },
    dosageGram: '9 - 30g',
    actions: [
      'Kiện tỳ hóa thấp',
      'Hòa trung tiêu thử chỉ tả',
      'Giải độc thức ăn'
    ],
    clinicalIndications: [
      'Tỳ hư thấp trệ tiêu chảy mùa hè nôn mửa',
      'Phụ nữ khí hư bạch đới do tỳ hư thấp',
      'Trẻ em suy dinh dưỡng tiêu hóa kém (Sâm Linh Bạch Truật Tán)'
    ],
    contraindications: 'Kỵ ngoại cảm hàn nhiệt đang sốt cao.',
    benskyNotes: 'Dan Bensky: Kiện tỳ trừ thấp mà không gây táo nhiệt, đặc hiệu trị tiêu chảy mùa nắng nóng.'
  },
  {
    id: 'tai-zi-shen',
    vietnameseName: 'Thái tử sâm (Hài nhi sâm)',
    pinyinName: 'Tai Zi Shen',
    botanicalName: 'Radix Pseudostellariae',
    chineseCharacters: '太子參',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Bình',
      flavors: ['Ngọt', 'Hơi đắng'],
      channels: ['Tỳ', 'Phế']
    },
    dosageGram: '9 - 30g',
    actions: [
      'Ích khí kiện tỳ thanh bổ',
      'Sinh tân nhuận phế',
      'Phục hồi sức khỏe sau ốm sốt'
    ],
    clinicalIndications: [
      'Trẻ em suy nhược cơ thể mồ hôi trộm biếng ăn',
      'Khí âm lưỡng hư sau bệnh sốt cao miệng khô khát',
      'Phế hư ho khan mệt mỏi hồi hộp'
    ],
    contraindications: 'Kỵ tà thực biểu chứng chưa giải.',
    benskyNotes: 'Dan Bensky: Thanh bổ khí âm êm dịu không bốc hỏa, cực kỳ thích hợp cho trẻ nhỏ và người già yếu.'
  },
  {
    id: 'dinh-lang',
    vietnameseName: 'Đinh lăng (Nam dương sâm)',
    pinyinName: 'Nam Duong Sam',
    botanicalName: 'Radix Polysciacis Fruticosae',
    chineseCharacters: '南洋參',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Mát',
      flavors: ['Ngọt', 'Hơi đắng'],
      channels: ['Phế', 'Tỳ', 'Thận', 'Tâm']
    },
    dosageGram: '10 - 20g',
    actions: [
      'Đại bổ nguyên khí tăng sức dẻo dai',
      'Hoạt huyết dưỡng não tăng tuần hoàn máu não',
      'Thông tia sữa và giải độc lợi tiểu'
    ],
    clinicalIndications: [
      'Thiểu năng tuần hoàn não rối loạn tiền đình mất ngủ',
      'Suy nhược cơ thể mệt mỏi suy giảm trí nhớ',
      'Sản phụ tắc tia sữa ít sữa, đau mỏi cơ khớp'
    ],
    contraindications: 'Không dùng liều quá cao gây say mệt do Saponin.',
    benskyNotes: 'GS. Đỗ Tất Lợi: Nhân sâm của người Việt, giàu Saponin triterpenoid tăng biên độ sóng não và sức bền thể lực.'
  },
  {
    id: 'bei-sha-shen',
    vietnameseName: 'Bắc sa sâm',
    pinyinName: 'Bei Sha Shen',
    botanicalName: 'Radix Glehniae',
    chineseCharacters: '北沙參',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ['Ngọt', 'Hơi đắng'],
      channels: ['Phế', 'Vị']
    },
    dosageGram: '6 - 15g',
    actions: [
      'Dưỡng âm thanh phế',
      'Ích vị sinh tân',
      'Trừ hư nhiệt chỉ khái'
    ],
    clinicalIndications: [
      'Phế âm hư ho khan ít đờm họng khô khản tiếng',
      'Vị âm hư lưỡi đỏ bóng không rêu khát nước đau rát thượng vị',
      'Da khô táo bón sau bệnh nhiệt'
    ],
    contraindications: 'Kỵ phong hàn ho đờm trắng loãng; phản Lê lô.',
    benskyNotes: 'Dan Bensky: Chủ vị bài Nhất Quán Tiễn và Sa Sâm Mạch Đông Thang dưỡng Phế Vị âm.'
  },
  {
    id: 'yu-zhu',
    vietnameseName: 'Ngọc trúc',
    pinyinName: 'Yu Zhu',
    botanicalName: 'Rhizoma Polygonati Odorati',
    chineseCharacters: '玉竹',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ['Ngọt'],
      channels: ['Phế', 'Vị']
    },
    dosageGram: '6 - 15g',
    actions: [
      'Dưỡng âm nhuận táo',
      'Sinh tân chỉ khát',
      'Dưỡng âm giải biểu cho người âm hư cảm mạo'
    ],
    clinicalIndications: [
      'Phế vị táo nhiệt ho khan họng rát',
      'Đái tháo đường tiêu khát đói nhiều uống nhiều',
      'Người âm hư bị cảm phong nhiệt sốt ho mồ hôi ít'
    ],
    contraindications: 'Kỵ tỳ hư đờm thấp ứ trệ bụng đầy.',
    benskyNotes: 'Dan Bensky: Tư âm nhuận phế mà không gây lưu tà, số 1 để trị ngoại cảm trên nền cơ địa âm hư.'
  },
  {
    id: 'tian-men-dong',
    vietnameseName: 'Thiên môn đông (Thiên đông)',
    pinyinName: 'Tian Men Dong',
    botanicalName: 'Radix Asparagi',
    chineseCharacters: '天門冬',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Rất hàn',
      flavors: ['Ngọt', 'Đắng'],
      channels: ['Phế', 'Thận']
    },
    dosageGram: '6 - 15g',
    actions: [
      'Tư âm nhuận táo thanh phế giáng hỏa',
      'Tư thận âm sinh tân dịch',
      'Nhuận tràng thông tiện'
    ],
    clinicalIndications: [
      'Phế thận âm hư ho khan khạc máu sốt chiều',
      'Tiêu khát đái tháo đường họng khô khát',
      'Tân dịch khô cạn táo bón'
    ],
    contraindications: 'Kỵ tỳ vị hư hàn ăn kém tiêu chảy phân nát.',
    benskyNotes: 'Dan Bensky: Mạch môn đi vào Phế Tâm Vị, còn Thiên môn đi sâu vào Phế Thận thanh hỏa mạnh hơn.'
  },
  {
    id: 'shi-hu',
    vietnameseName: 'Thạch hộc',
    pinyinName: 'Shi Hu',
    botanicalName: 'Herba Dendrobii',
    chineseCharacters: '石斛',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ['Ngọt'],
      channels: ['Vị', 'Thận']
    },
    dosageGram: '6 - 15g (Sắc trước)',
    actions: [
      'Ích vị sinh tân',
      'Tư âm thanh hư nhiệt',
      'Minh mục cường yêu tất'
    ],
    clinicalIndications: [
      'Bệnh nhiệt làm cạn vị âm miệng khô lưỡi đỏ tía nôn khan',
      'Thận âm hư sốt âm ỉ về chiều mờ mắt',
      'Đau lưng mỏi gối nhược cơ chân'
    ],
    contraindications: 'Kỵ bệnh ôn nhiệt thời kỳ đầu chưa hóa táo.',
    benskyNotes: 'Dan Bensky: Cửu đại tiên thảo Trung Hoa, chuyên cứu nguy dịch vị và thận âm cạn kiệt.'
  },
  {
    id: 'bai-he',
    vietnameseName: 'Bách hợp',
    pinyinName: 'Bai He',
    botanicalName: 'Bulbus Lilii',
    chineseCharacters: '百合',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ['Ngọt'],
      channels: ['Phế', 'Tâm']
    },
    dosageGram: '10 - 30g',
    actions: [
      'Nhuận phế chỉ khái thanh phế nhiệt',
      'Thanh tâm an thần định chí',
      'Dưỡng âm trừ phiền'
    ],
    clinicalIndications: [
      'Phế táo ho khan lâu ngày ho có tơ máu',
      'Bệnh Bách hợp: Thần chí hoảng hốt bồn chồn mất ngủ sau ốm sốt',
      'Hồi hộp đánh trống ngực tâm phiền'
    ],
    contraindications: 'Kỵ ho do phong hàn hoặc tỳ hư tiêu chảy.',
    benskyNotes: 'Dan Bensky: Vừa nhuận phổi trị ho khan vừa làm dịu thần kinh Tâm Phế sau các đợt sốt nhiễm trùng.'
  },
  {
    id: 'nu-zhen-zi',
    vietnameseName: 'Nữ trinh tử',
    pinyinName: 'Nu Zhen Zi',
    botanicalName: 'Fructus Ligustri Lucidi',
    chineseCharacters: '女貞子',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Lương',
      flavors: ['Ngọt', 'Đắng'],
      channels: ['Can', 'Thận']
    },
    dosageGram: '6 - 15g',
    actions: [
      'Tư bổ can thận âm',
      'Ô phát minh mục (Đen tóc sáng mắt)',
      'Thanh hư nhiệt'
    ],
    clinicalIndications: [
      'Can thận âm hư choáng váng ù tai lưng gối mỏi yếu',
      'Tóc bạc sớm rụng tóc thị lực giảm sút',
      'Phối Hạn liên thảo thành bài Nhị Chí Hoàn kinh điển'
    ],
    contraindications: 'Kỵ tỳ vị hư hàn tiêu chảy và dương hư.',
    benskyNotes: 'Dan Bensky: Bổ âm thanh khiết không gây nê trệ, tăng bạch cầu và miễn dịch tế bào.'
  },
  {
    id: 'bie-jia',
    vietnameseName: 'Miết giáp (Mai ba ba)',
    pinyinName: 'Bie Jia',
    botanicalName: 'Carapax Trionycis',
    chineseCharacters: '鱉甲',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Hàn',
      flavors: ['Mặn'],
      channels: ['Can', 'Thận']
    },
    dosageGram: '9 - 24g (Sắc trước)',
    actions: [
      'Tư âm tiềm dương tức phong',
      'Thoái nhiệt trừ cốt chưng',
      'Nhuyễn kiên tán kết tiêu u'
    ],
    clinicalIndications: [
      'Âm hư phát nhiệt sốt về chiều ra mồ hôi trộm (Thanh Hao Miết Giáp Thang)',
      'Âm hư phong động co giật tay chân run',
      'Gan lách to xơ gan khối u vùng bụng'
    ],
    contraindications: 'Cấm phụ nữ có thai và tỳ vị hư hàn tiêu chảy.',
    benskyNotes: 'Dan Bensky: Tẩm giấm nướng (Chích miết giáp) đi thẳng vào Can kinh làm mềm khối xơ gan lách to.'
  },
  {
    id: 'gui-ban',
    vietnameseName: 'Quy bản (Yếm rùa)',
    pinyinName: 'Gui Ban',
    botanicalName: 'Plastrum Testudinis',
    chineseCharacters: '龜板',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Hàn',
      flavors: ['Mặn', 'Ngọt'],
      channels: ['Thận', 'Can', 'Tâm']
    },
    dosageGram: '9 - 24g (Sắc trước)',
    actions: [
      'Tư âm tiềm dương',
      'Ích thận kiện cốt thông nhâm mạch',
      'Dưỡng huyết bổ tâm cố kinh chỉ băng'
    ],
    clinicalIndications: [
      'Thận âm hư cốt chưng đạo hãn lưng gối mềm yếu trẻ chậm khép thóp',
      'Tâm thận bất giao mất ngủ hay quên',
      'Băng lậu rong huyết do âm hư huyết nhiệt'
    ],
    contraindications: 'Cấm phụ nữ có thai và tỳ vị hư hàn.',
    benskyNotes: 'Dan Bensky: Quy bản đại bổ Nhâm mạch và Thận âm mạnh hơn Miết giáp; nấu cao Quy bản bổ gân cốt tuyệt đỉnh.'
  },
  {
    id: 'sang-shen',
    vietnameseName: 'Tang thầm (Quả dâu chín)',
    pinyinName: 'Sang Shen',
    botanicalName: 'Fructus Mori',
    chineseCharacters: '桑椹',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Hàn',
      flavors: ['Ngọt', 'Chua'],
      channels: ['Can', 'Thận', 'Tâm']
    },
    dosageGram: '9 - 15g',
    actions: [
      'Tư âm bổ huyết',
      'Sinh tân chỉ khát',
      'Nhuận tràng thông tiện làm đen râu tóc'
    ],
    clinicalIndications: [
      'Huyết hư âm hư chóng mặt hoa mắt ù tai mất ngủ',
      'Tóc bạc sớm do can thận suy',
      'Tân dịch khô khát táo bón người già'
    ],
    contraindications: 'Kỵ tỳ vị hư hàn đi ngoài phân lỏng.',
    benskyNotes: 'Dan Bensky: Giàu Anthocyanin chống oxy hóa, dưỡng Can Thận huyết và nhuận tràng êm dịu.'
  },
  {
    id: 'hei-zhi-ma',
    vietnameseName: 'Hắc chi ma (Mè đen / Vừng đen)',
    pinyinName: 'Hei Zhi Ma',
    botanicalName: 'Semen Sesami Nigrum',
    chineseCharacters: '黑芝麻',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Bình',
      flavors: ['Ngọt'],
      channels: ['Can', 'Thận', 'Đại tràng']
    },
    dosageGram: '9 - 30g',
    actions: [
      'Bổ can thận ích tinh huyết',
      'Nhuận ngũ tạng thông đại tiện',
      'Dưỡng huyết lợi sữa đen tóc'
    ],
    clinicalIndications: [
      'Can thận tinh huyết hư đầu váng mắt hoa tai ù râu tóc bạc sớm',
      'Huyết hư tân khô táo bón sau sinh hoặc người cao tuổi',
      'Da khô sần tê bì chân tay'
    ],
    contraindications: 'Kỵ tiêu chảy mạn tính do tỳ hư.',
    benskyNotes: 'Dan Bensky: Phối Tang diệp làm bài Tang Ma Hoàn dưỡng Can Thận sáng mắt đen tóc.'
  },
  {
    id: 'xian-mao',
    vietnameseName: 'Tiên mao (Sâm cau)',
    pinyinName: 'Xian Mao',
    botanicalName: 'Rhizoma Curculiginis',
    chineseCharacters: '仙茅',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Nhiệt (Hơi có độc)',
      flavors: ['Cay'],
      channels: ['Thận', 'Can', 'Tỳ']
    },
    dosageGram: '3 - 9g',
    actions: [
      'Ôn thận tráng dương tán hàn',
      'Khứ hàn thấp cường cân cốt',
      'Ôn tỳ chỉ tả'
    ],
    clinicalIndications: [
      'Mệnh môn hỏa suy liệt dương tinh lạnh vô sinh lãnh cảm',
      'Hàn thấp lưng gối đau lạnh tê bại',
      'Hội chứng tiền mãn kinh cao huyết áp dương hư (Nhị Tiên Thang)'
    ],
    contraindications: 'Cấm dùng khi âm hư hỏa vượng.',
    benskyNotes: 'Dan Bensky: Phối Dâm dương hoắc trong bài Nhị Tiên Thang điều hòa nội tiết tuyến yên - sinh dục.'
  },
  {
    id: 'bu-gu-zhi',
    vietnameseName: 'Bổ cốt chỉ (Phá cố chỉ)',
    pinyinName: 'Bu Gu Zhi',
    botanicalName: 'Fructus Psoraleae',
    chineseCharacters: '補骨脂',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Đại ôn',
      flavors: ['Cay', 'Đắng'],
      channels: ['Thận', 'Tỳ']
    },
    dosageGram: '5 - 10g',
    actions: [
      'Bổ thận tráng dương cố tinh sáp niệu',
      'Ôn tỳ chỉ tả',
      'Nạp khí bình suyễn và trị bạch biến'
    ],
    clinicalIndications: [
      'Thận dương hư liệt dương di tinh đái dầm tiểu đêm',
      'Tỳ thận dương hư ngũ canh tả (tiêu chảy lúc rạng sáng - Tứ Thần Hoàn)',
      'Thận hư suyễn thở, bôi ngoài trị bệnh bạch biến'
    ],
    contraindications: 'Kỵ âm hư hỏa vượng và táo bón.',
    benskyNotes: 'Dan Bensky: Bổ Mệnh môn hỏa để sinh Tỳ thổ, chủ vị trị tiêu chảy mạn tính lúc 5 giờ sáng.'
  },
  {
    id: 'yi-zhi-ren',
    vietnameseName: 'Ích trí nhân',
    pinyinName: 'Yi Zhi Ren',
    botanicalName: 'Fructus Alpiniae Oxyphyllae',
    chineseCharacters: '益智仁',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Ôn',
      flavors: ['Cay'],
      channels: ['Tỳ', 'Thận']
    },
    dosageGram: '3 - 9g',
    actions: [
      'Ôn thận cố tinh sáp niệu',
      'Ôn tỳ chỉ tả nhiếp diên (cầm chảy nước bọt)',
      'Tăng cường trí nhớ'
    ],
    clinicalIndications: [
      'Thận khí hư hàn đái dầm trẻ em tiểu đêm người già (Súc Tuyền Hoàn)',
      'Di tinh mộng tinh',
      'Tỳ hàn tiêu chảy miệng chảy nhiều nước dãi trong'
    ],
    contraindications: 'Kỵ âm hư hỏa vượng hoặc di tinh đái rắt do thấp nhiệt.',
    benskyNotes: 'Dan Bensky: Phối Ô dược và Hoài sơn trong Súc Tuyền Hoàn đặc trị đái dầm và bàng quang tăng hoạt.'
  },
  {
    id: 'ge-jie',
    vietnameseName: 'Cáp giới (Tắc kè)',
    pinyinName: 'Ge Jie',
    botanicalName: 'Gecko',
    chineseCharacters: '蛤蚧',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Bình',
      flavors: ['Mặn'],
      channels: ['Phế', 'Thận']
    },
    dosageGram: '3 - 6g (Tán bột 1 - 1.5g)',
    actions: [
      'Bổ phế khí định suyễn khái',
      'Trợ thận dương nạp khí quy nguyên',
      'Ích tinh huyết tráng dương'
    ],
    clinicalIndications: [
      'Phế thận lưỡng hư hen suyễn mạn tính thở dốc hít vào khó (Nhân Sâm Cáp Giới Tán)',
      'Ho lao lâu ngày khạc máu suy kiệt',
      'Thận dương hư liệt dương di tinh'
    ],
    contraindications: 'Kỵ ho suyễn do ngoại cảm phong hàn hoặc thực nhiệt.',
    benskyNotes: 'Dan Bensky: Tinh lực tập trung ở phần đuôi, chuyên nạp Phế khí về Thận trị hen phế quản mạn tính.'
  },
  {
    id: 'hu-tao-rou',
    vietnameseName: 'Hồ đào nhục (Quả óc chó)',
    pinyinName: 'Hu Tao Rou',
    botanicalName: 'Semen Juglandis',
    chineseCharacters: '胡桃肉',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Ôn',
      flavors: ['Ngọt'],
      channels: ['Thận', 'Phế', 'Đại tràng']
    },
    dosageGram: '10 - 30g',
    actions: [
      'Bổ thận ôn phế định suyễn',
      'Cường yêu tất cố tinh',
      'Nhuận tràng thông tiện bổ não'
    ],
    clinicalIndications: [
      'Thận dương hư đau mỏi thắt lưng chân gối yếu liệt dương',
      'Phế thận hư hàn ho suyễn thở ngắn',
      'Táo bón người già và suy giảm trí nhớ'
    ],
    contraindications: 'Kỵ âm hư hỏa vượng đờm nhiệt tiêu chảy.',
    benskyNotes: 'Dan Bensky: Giàu Omega-3 thực vật, vừa ôn Phế Thận trị suyễn vừa nhuận đại tràng.'
  },
  {
    id: 'zi-he-che',
    vietnameseName: 'Tử hà sa (Nhau thai chế)',
    pinyinName: 'Zi He Che',
    botanicalName: 'Placenta Hominis',
    chineseCharacters: '紫河車',
    category: '12. Thuốc Bổ Ích (Tonifying Herbs)',
    properties: {
      nature: 'Ôn',
      flavors: ['Ngọt', 'Mặn'],
      channels: ['Phế', 'Can', 'Thận']
    },
    dosageGram: '2 - 4g (Tán bột uống)',
    actions: [
      'Ôn thận bổ tinh',
      'Đại bổ khí huyết',
      'Nạp khí bình suyễn trị hư lao'
    ],
    clinicalIndications: [
      'Thận tinh suy kiệt vô sinh hiếm muộn tử cung nhi tính',
      'Hư lao gầy mòn thiếu máu suy tủy',
      'Phế thận hư hen suyễn mạn tính động kinh'
    ],
    contraindications: 'Kỵ âm hư hỏa vượng thực tà.',
    benskyNotes: 'Dan Bensky: Huyết nhục hữu tình chi phẩm đại bổ Tiên thiên Tinh Huyết.'
  },
  {
    id: 'ban-bian-lian',
    vietnameseName: 'Bán biên liên',
    pinyinName: 'Ban Bian Lian',
    botanicalName: 'Herba Lobeliae Chinensis',
    chineseCharacters: '半邊蓮',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hàn',
      flavors: ['Cay', 'Ngọt'],
      channels: ['Tâm', 'Tiểu tràng', 'Phế']
    },
    dosageGram: '15 - 30g',
    actions: [
      'Thanh nhiệt giải độc kháng ung bướu',
      'Lợi thủy tiêu thũng trục cổ trướng',
      'Trị rắn độc cắn và mụn nhọt'
    ],
    clinicalIndications: [
      'Xơ gan cổ trướng phù thũng tiểu ít',
      'Ung thư gan, ung thư dạ dày, ung thư phổi (phối Bạch hoa xà thiệt thảo, Bán chi liên)',
      'Mụn nhọt sưng độc rắn cắn'
    ],
    contraindications: 'Kỵ phù thũng do tỳ thận hư hàn.',
    benskyNotes: 'Dan Bensky: Một trong bộ ba kháng u kinh điển (Bạch hoa xà thiệt thảo - Bán chi liên - Bán biên liên).'
  },
  {
    id: 'ban-zhi-lian',
    vietnameseName: 'Bán chi liên (Hoàng cầm râu)',
    pinyinName: 'Ban Zhi Lian',
    botanicalName: 'Herba Scutellariae Barbatae',
    chineseCharacters: '半枝蓮',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hàn',
      flavors: ['Cay', 'Đắng'],
      channels: ['Phế', 'Can', 'Thận']
    },
    dosageGram: '15 - 30g',
    actions: [
      'Thanh nhiệt giải độc tiêu u bướu',
      'Hoạt huyết hóa ứ chỉ thống',
      'Lợi thủy tiêu thũng'
    ],
    clinicalIndications: [
      'Hỗ trợ điều trị khối u bướu ác tính (Phổi, Gan, Dạ dày, Trực tràng)',
      'Viêm gan cấp mạn tính xơ gan cổ trướng',
      'Đinh nhọt áp xe chấn thương tụ máu'
    ],
    contraindications: 'Phụ nữ có thai và huyết hư cấm dùng.',
    benskyNotes: 'Dan Bensky: Chứa Scutellarin và Flavonoid ức chế tăng sinh mạch máu khối u và giải độc gan.'
  },
  {
    id: 'she-gan',
    vietnameseName: 'Xạ can (Rẻ quạt)',
    pinyinName: 'She Gan',
    botanicalName: 'Rhizoma Belamcandae',
    chineseCharacters: '射干',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hàn',
      flavors: ['Đắng'],
      channels: ['Phế']
    },
    dosageGram: '3 - 10g',
    actions: [
      'Thanh nhiệt giải độc lợi hầu họng',
      'Khứ đờm khai âm bình suyễn',
      'Tán kết tiêu thũng amidan'
    ],
    clinicalIndications: [
      'Viêm họng cấp, viêm amidan hốc mủ sưng đau nghẹn họng',
      'Đờm nhiệt tắc phế ho suyễn khò khè như tiếng ếch kêu (Xạ Can Ma Hoàng Thang)',
      'Khản tiếng mất tiếng do đờm hỏa'
    ],
    contraindications: 'Cấm phụ nữ có thai và tỳ vị hư hàn.',
    benskyNotes: 'Dan Bensky & Tuệ Tĩnh: Thánh dược trị viêm họng sưng amidan và hen phế quản đờm rít.'
  },
  {
    id: 'shan-dou-gen',
    vietnameseName: 'Sơn đậu căn',
    pinyinName: 'Shan Dou Gen',
    botanicalName: 'Radix Sophorae Tonkinensis',
    chineseCharacters: '山豆根',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hàn (Hơi có độc)',
      flavors: ['Đắng'],
      channels: ['Phế', 'Vị']
    },
    dosageGram: '3 - 6g',
    actions: [
      'Thanh nhiệt giải độc cực mạnh',
      'Lợi hầu tiêu thũng giảm đau họng',
      'Kháng viêm kháng khuẩn vùng hầu họng'
    ],
    clinicalIndications: [
      'Viêm họng mủ, viêm amidan cấp sốt cao sưng bít cổ họng',
      'Sưng đau nướu răng loét miệng lưỡi do nhiệt độc',
      'Mụn nhọt thấp nhiệt vàng da'
    ],
    contraindications: 'Không dùng quá 9g vì gây buồn nôn chóng mặt; kỵ tỳ vị hư hàn.',
    benskyNotes: 'Dan Bensky: Vị đắng lạnh bậc nhất chuyên dập hỏa độc vùng hầu họng và nướu răng.'
  },
  {
    id: 'bai-tou-weng',
    vietnameseName: 'Bạch đầu ông',
    pinyinName: 'Bai Tou Weng',
    botanicalName: 'Radix Pulsatillae',
    chineseCharacters: '白頭翁',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hàn',
      flavors: ['Đắng'],
      channels: ['Vị', 'Đại tràng']
    },
    dosageGram: '6 - 15g',
    actions: [
      'Thanh nhiệt giải độc lương huyết',
      'Chỉ lỵ đặc trị kiết lỵ amip và trực khuẩn',
      'Táo thấp sát trùng Trichomonas'
    ],
    clinicalIndications: [
      'Nhiệt độc huyết lỵ đi cầu phân nhầy máu mủ mót rặn đau quặn (Bạch Đầu Ông Thang)',
      'Viêm đại tràng xuất huyết cấp tính',
      'Viêm âm đạo ngứa do trùng roi'
    ],
    contraindications: 'Kỵ kiết lỵ tiêu chảy do hư hàn.',
    benskyNotes: 'Dan Bensky: Chủ vị bài Bạch Đầu Ông Thang của Trương Trọng Cảnh đặc trị lỵ trực khuẩn và lỵ amip.'
  },
  {
    id: 'qin-pi',
    vietnameseName: 'Tần bì',
    pinyinName: 'Qin Pi',
    botanicalName: 'Cortex Fraxini',
    chineseCharacters: '秦皮',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hàn',
      flavors: ['Đắng', 'Chát'],
      channels: ['Can', 'Đởm', 'Đại tràng']
    },
    dosageGram: '6 - 12g',
    actions: [
      'Thanh nhiệt táo thấp thu sáp chỉ lỵ',
      'Thanh can minh mục tiêu màng mộng',
      'Bình suyễn chỉ đới'
    ],
    clinicalIndications: [
      'Thấp nhiệt kiết lỵ tiêu chảy nhiễm khuẩn',
      'Đau mắt đỏ sưng nề chảy nước mắt kéo màng',
      'Viêm phần phụ bạch đới vàng hôi, đào thải acid uric'
    ],
    contraindications: 'Kỵ tỳ vị hư hàn.',
    benskyNotes: 'Dan Bensky: Chứa Aesculin kháng khuẩn lỵ, chống viêm kết mạc và tăng bài tiết acid uric qua thận.'
  },
  {
    id: 'lu-hui',
    vietnameseName: 'Lô hội (Nha đam chế)',
    pinyinName: 'Lu Hui',
    botanicalName: 'Aloe',
    chineseCharacters: '蘆薈',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hàn',
      flavors: ['Đắng'],
      channels: ['Can', 'Vị', 'Đại tràng']
    },
    dosageGram: '1 - 2g (Uống viên hoàn, không sắc)',
    actions: [
      'Tả hạ thông tiện thanh trường',
      'Thanh can tả hỏa định kinh',
      'Sát trùng trị cam tích'
    ],
    clinicalIndications: [
      'Nhiệt kết táo bón kèm đau đầu mắt đỏ cáu gắt mất ngủ (Đương Quy Long Hội Hoàn)',
      'Can hỏa vượng chóng mặt ù tai kinh phong co giật',
      'Trẻ em cam tích giun đũa, gel tươi bôi bỏng liền da'
    ],
    contraindications: 'Cấm phụ nữ có thai đang hành kinh và tỳ vị hư hàn.',
    benskyNotes: 'Dan Bensky: Nhựa cô đặc chứa Aloin tả Can hỏa và kích thích đại tràng mạnh.'
  },
  {
    id: 'diep-ha-chau',
    vietnameseName: 'Diệp hạ châu (Chó đẻ răng cưa)',
    pinyinName: 'Ye Xia Zhu',
    botanicalName: 'Herba Phyllanthi Urinariae',
    chineseCharacters: '葉下珠',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Lương',
      flavors: ['Đắng', 'Hơi ngọt'],
      channels: ['Can', 'Đởm', 'Thận']
    },
    dosageGram: '10 - 20g',
    actions: [
      'Thanh can minh mục giải độc gan',
      'Lợi thủy thông lâm thoái hoàng',
      'Tiêu tích sát trùng kháng virus viêm gan B'
    ],
    clinicalIndications: [
      'Viêm gan virus B cấp và mạn tính, men gan cao, vàng da',
      'Mụn nhọt đinh râu lở ngứa ngoài da',
      'Sỏi mật sỏi thận phù thũng tiểu buốt'
    ],
    contraindications: 'Kỵ phụ nữ mang thai và người huyết áp thấp thể hàn dùng dài ngày.',
    benskyNotes: 'Đỗ Tất Lợi & Bensky: Hoạt chất Phyllanthin ức chế DNA polymerase của virus HBV và hạ men gan nhanh.'
  },
  {
    id: 'ca-gai-leo',
    vietnameseName: 'Cà gai leo',
    pinyinName: 'Ca Gai Leo',
    botanicalName: 'Herba Solani Procumbentis',
    chineseCharacters: '茄荊藤',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hơi ôn',
      flavors: ['Hơi the', 'Đắng'],
      channels: ['Can', 'Thận']
    },
    dosageGram: '15 - 30g',
    actions: [
      'Bảo vệ tế bào gan và ức chế xơ gan',
      'Khứ phong thấp thông kinh lạc chỉ thống',
      'Giải độc rượu và tiêu đờm trừ ho'
    ],
    clinicalIndications: [
      'Viêm gan B, xơ gan, gan nhiễm mỡ, men gan tăng cao',
      'Đau nhức xương khớp phong thấp đau lưng nhức mỏi',
      'Giải rượu chống say rượu, rắn cắn'
    ],
    contraindications: 'Thận trọng phụ nữ có thai.',
    benskyNotes: 'Dược Điển Việt Nam: Glycoalkaloid trong Cà gai leo ngăn chặn quá trình tạo sợi Collagen gây xơ gan.'
  },
  {
    id: 'rau-ma',
    vietnameseName: 'Rau má (Tích tuyết thảo)',
    pinyinName: 'Ji Xue Cao',
    botanicalName: 'Herba Centellae Asiaticae',
    chineseCharacters: '積雪草',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hàn',
      flavors: ['Đắng', 'Cay'],
      channels: ['Can', 'Tỳ', 'Thận']
    },
    dosageGram: '15 - 30g (Tươi 30 - 60g)',
    actions: [
      'Thanh nhiệt lợi thấp giải độc',
      'Hoạt huyết tiêu thũng liền sẹo',
      'Bền thành mạch giảm suy giãn tĩnh mạch'
    ],
    clinicalIndications: [
      'Nóng trong người rôm sẩy mụn nhọt vàng da tiểu buốt',
      'Suy giãn tĩnh mạch chi dưới, vết thương lâu lành sẹo lồi',
      'Sốt xuất huyết chảy máu cam'
    ],
    contraindications: 'Kỵ tỳ vị hư hàn lạnh bụng tiêu chảy.',
    benskyNotes: 'Dan Bensky & Tuệ Tĩnh: Asiaticoside kích thích tái tạo biểu mô liền sẹo và bảo vệ tĩnh mạch.'
  },
  {
    id: 'trinh-nu-hoang-cung',
    vietnameseName: 'Trinh nữ hoàng cung',
    pinyinName: 'Trinh Nu Hoang Cung',
    botanicalName: 'Folium Crini Latifolii',
    chineseCharacters: '貞女皇宮',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Mát',
      flavors: ['Đắng', 'Chát'],
      channels: ['Can', 'Thận']
    },
    dosageGram: '3 - 5 lá khô (10 - 15g)',
    actions: [
      'Hoạt huyết tán ứ tiêu u bướu',
      'Thanh nhiệt giải độc kháng sinh tự nhiên',
      'Ức chế tăng sinh u xơ lành tính và ác tính'
    ],
    clinicalIndications: [
      'U xơ tử cung, u nang buồng trứng, u xơ tuyến vú ở nữ giới',
      'Phì đại lành tính tuyến tiền liệt tiểu đêm tiểu khó ở nam giới',
      'Đau khớp chấn thương tụ máu'
    ],
    contraindications: 'Cấm phụ nữ có thai; tránh nhầm với cây Náng hoa trắng gây nôn ngộ độc.',
    benskyNotes: 'Dược Điển Việt Nam: Chứa Crinafolidine và Lycorine ức chế sự phân bào của tế bào khối u tử cung và tiền liệt tuyến.'
  },
  {
    id: 'xa-den',
    vietnameseName: 'Xạ đen',
    pinyinName: 'Xa Den',
    botanicalName: 'Herba Celastri Hindsii',
    chineseCharacters: '射黑藤',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Hàn',
      flavors: ['Đắng', 'Chát'],
      channels: ['Can', 'Phế']
    },
    dosageGram: '20 - 40g',
    actions: [
      'Thanh nhiệt giải độc tiêu ung thũng',
      'Hoạt huyết hóa ứ kháng oxy hóa tế bào u',
      'An thần giảm đau hạ men gan'
    ],
    clinicalIndications: [
      'Hỗ trợ điều trị ung bướu, u hạch, bướu cổ',
      'Viêm gan mạn tính, máu nhiễm mỡ, cao huyết áp',
      'Mụn nhọt lở loét mất ngủ suy nhược'
    ],
    contraindications: 'Phụ nữ có thai và người huyết áp thấp thận trọng.',
    benskyNotes: 'Nam Dược Việt Nam: Chứa Maytenfolone A, Flavonoid và Quinone ức chế phát triển tế bào u bướu.'
  },
  {
    id: 'actiso',
    vietnameseName: 'Actiso (Atisô)',
    pinyinName: 'A Ti So',
    botanicalName: 'Folium et Flos Cynarae Scolymi',
    chineseCharacters: '朝鮮薊',
    category: '2. Thuốc Thanh Nhiệt (Clear Heat)',
    properties: {
      nature: 'Mát',
      flavors: ['Đắng', 'Ngọt hậu'],
      channels: ['Can', 'Đởm', 'Thận']
    },
    dosageGram: '10 - 20g',
    actions: [
      'Thanh can lợi mật giải độc gan',
      'Hạ Cholesterol và Triglycerid máu',
      'Lợi tiểu thanh nhiệt mát máu'
    ],
    clinicalIndications: [
      'Viêm gan thiểu năng gan vàng da dị ứng mẩn ngứa',
      'Rối loạn lipid máu xơ vữa động mạch gan nhiễm mỡ',
      'Tiểu ít phù nề táo bón nóng trong'
    ],
    contraindications: 'Kỵ tỳ vị hư hàn đầy bụng lạnh bụng.',
    benskyNotes: 'Dược Điển Việt Nam: Hoạt chất Cynarin tăng bài tiết mật gấp 4 lần và hạ lipid máu rõ rệt.'
  },
  {
    id: 'gao-ben',
    vietnameseName: 'Cảo bản',
    pinyinName: 'Gao Ben',
    botanicalName: 'Rhizoma et Radix Ligustici',
    chineseCharacters: '藁本',
    category: '1. Thuốc Giải Biểu (Release the Exterior)',
    properties: {
      nature: 'Ôn',
      flavors: ['Cay'],
      channels: ['Bàng quang']
    },
    dosageGram: '3 - 10g',
    actions: [
      'Phát tán phong hàn giải biểu',
      'Thắng thấp chỉ thống chuyên trị đau đỉnh đầu',
      'Thông kinh lạc'
    ],
    clinicalIndications: [
      'Đau đỉnh đầu (Điên đỉnh thống) lan xuống gáy và răng má do phong hàn',
      'Cảm mạo phong hàn thấp đau nhức mình mẩy',
      'Phong thấp đau khớp'
    ],
    contraindications: 'Kỵ đau đầu do huyết hư can dương vượng.',
    benskyNotes: 'Dan Bensky: Sứ dược dẫn thuốc lên đỉnh đầu (huyệt Bách Hội) theo kinh Thái Dương Bàng Quang.'
  },
  {
    id: 'huong-nhu-tia',
    vietnameseName: 'Hương nhu tía (É tía)',
    pinyinName: 'Huong Nhu Tia',
    botanicalName: 'Herba Ocimi Sancti',
    chineseCharacters: '紫香薷',
    category: '1. Thuốc Giải Biểu (Release the Exterior)',
    properties: {
      nature: 'Ôn',
      flavors: ['Cay', 'Thơm'],
      channels: ['Phế', 'Vị']
    },
    dosageGram: '6 - 12g',
    actions: [
      'Phát hãn giải biểu tán hàn',
      'Hóa thấp hòa trung giải thử mùa hè',
      'Lợi thủy tiêu thũng và kháng khuẩn'
    ],
    clinicalIndications: [
      'Cảm nắng cảm lạnh mùa hè sốt không mồ hôi đau đầu buồn nôn tiêu chảy',
      'Phù thũng tiểu ít cước khí',
      'Súc miệng trị hôi miệng, nấu nước gội đầu mọc tóc'
    ],
    contraindications: 'Kỵ biểu hư ra mồ hôi nhiều và trúng nắng nhiệt cực.',
    benskyNotes: 'Tuệ Tĩnh & Đỗ Tất Lợi: Được mệnh danh là Ma hoàng của mùa hè; giàu tinh dầu Eugenol kháng khuẩn.'
  },
  {
    id: 'xi-he-liu',
    vietnameseName: 'Tây hà liễu (Cành liễu tơ)',
    pinyinName: 'Xi He Liu',
    botanicalName: 'Cacumen Tamarixis',
    chineseCharacters: '西河柳',
    category: '1. Thuốc Giải Biểu (Release the Exterior)',
    properties: {
      nature: 'Bình',
      flavors: ['Cay', 'Ngọt'],
      channels: ['Phế', 'Vị', 'Tâm']
    },
    dosageGram: '3 - 10g',
    actions: [
      'Phát biểu thấu chẩn thúc sởi mọc',
      'Khứ phong trừ thấp chỉ ngứa',
      'Thanh nhiệt giải độc'
    ],
    clinicalIndications: [
      'Trẻ em lên sởi mọc không đều sốt cao bứt rứt',
      'Mề đay mẩn ngứa dị ứng ngoài da (uống và nấu nước tắm)',
      'Đau nhức khớp phong thấp'
    ],
    contraindications: 'Sởi đã mọc thấu hoàn toàn thì không dùng.',
    benskyNotes: 'Dan Bensky: Tuyên thông bì mao giúp ban sởi thoát nhanh ra ngoài mà không làm tổn thương tân dịch.'
  },
  {
    id: 'yu-li-ren',
    vietnameseName: 'Úc lý nhân',
    pinyinName: 'Yu Li Ren',
    botanicalName: 'Semen Pruni',
    chineseCharacters: '郁李仁',
    category: '3. Thuốc Tả Hạ (Downward-Draining)',
    properties: {
      nature: 'Bình',
      flavors: ['Cay', 'Đắng', 'Ngọt'],
      channels: ['Đại tràng', 'Tiểu tràng', 'Tỳ']
    },
    dosageGram: '6 - 12g (Giã dập)',
    actions: [
      'Nhuận tràng thông tiện hạ khí',
      'Lợi thủy tiêu thũng',
      'Phá khí trệ đường ruột'
    ],
    clinicalIndications: [
      'Táo bón do khí trệ đại tràng khô ráo (Ngũ Nhân Hoàn)',
      'Phù thũng bụng trướng cổ trướng chân phù cước khí',
      'Tiểu tiện khó khăn'
    ],
    contraindications: 'Phụ nữ có thai và âm hư tân dịch kiệt dùng thận trọng.',
    benskyNotes: 'Dan Bensky: Nhuận tràng mạnh hơn Hỏa ma nhân nhờ kiềm hành khí và lợi thủy.'
  },
  {
    id: 'qian-niu-zi',
    vietnameseName: 'Khiên ngưu tử (Hạt bìm bìm)',
    pinyinName: 'Qian Niu Zi',
    botanicalName: 'Semen Pharbitidis',
    chineseCharacters: '牽牛子',
    category: '3. Thuốc Tả Hạ (Downward-Draining)',
    properties: {
      nature: 'Hàn (Có độc)',
      flavors: ['Đắng'],
      channels: ['Phế', 'Thận', 'Đại tràng']
    },
    dosageGram: '3 - 6g (Tán bột 1.5 - 3g)',
    actions: [
      'Tả thủy thông tiện trục ẩm',
      'Khứ đờm tiêu tích',
      'Sát trùng tẩy giun đũa sán dây'
    ],
    clinicalIndications: [
      'Thủy thũng báng bụng trướng đầy khó thở đại tiểu tiện bí',
      'Đờm ẩm tắc phế hen suyễn thực chứng',
      'Táo bón thực tích và nhiễm giun sán'
    ],
    contraindications: 'Cấm phụ nữ có thai; không dùng chung Ba đậu.',
    benskyNotes: 'Dan Bensky: Tác dụng trục thủy nhẹ hơn Cam toại nhưng thông đại tiểu tiện rất nhanh.'
  },
  {
    id: 'gan-sui',
    vietnameseName: 'Cam toại',
    pinyinName: 'Gan Sui',
    botanicalName: 'Radix Kansui',
    chineseCharacters: '甘遂',
    category: '3. Thuốc Tả Hạ (Downward-Draining)',
    properties: {
      nature: 'Hàn (Có độc)',
      flavors: ['Đắng', 'Ngọt'],
      channels: ['Phế', 'Thận', 'Đại tràng']
    },
    dosageGram: '0.5 - 1.5g (Dùng bột chế giấm, không sắc)',
    actions: [
      'Tả thủy trục ẩm cực mạnh',
      'Tiêu thũng tán kết',
      'Khai đờm thông khiếu'
    ],
    clinicalIndications: [
      'Tràn dịch màng phổi, tràn dịch màng bụng cổ trướng nặng (Thập Táo Thang)',
      'Phù thũng toàn thân thực chứng',
      'Phong đờm động kinh'
    ],
    contraindications: 'Phản Cam thảo (Thập bát phản); cấm tuyệt đối phụ nữ có thai và người hư nhược.',
    benskyNotes: 'Dan Bensky: Thuốc tuấn hạ trục thủy mạnh nhất, chỉ dùng ngắn ngày cùng Đại táo để bảo vệ vị khí.'
  },
  {
    id: 'yu-mi-xu',
    vietnameseName: 'Râu ngô (Ngọc mễ tu)',
    pinyinName: 'Yu Mi Xu',
    botanicalName: 'Stigma Maydis',
    chineseCharacters: '玉米鬚',
    category: '4. Thuốc Lợi Thủy Thẩm Thấp (Drain Dampness)',
    properties: {
      nature: 'Bình',
      flavors: ['Ngọt', 'Nhạt'],
      channels: ['Bàng quang', 'Can', 'Đởm']
    },
    dosageGram: '15 - 60g',
    actions: [
      'Lợi thủy tiêu thũng thông lâm',
      'Lợi đởm thoái hoàng',
      'Hạ huyết áp và hạ đường huyết nhẹ'
    ],
    clinicalIndications: [
      'Viêm thận cấp mạn phù thũng tiểu ít protein niệu',
      'Sỏi thận sỏi bàng quang đái buốt đái rắt',
      'Viêm túi mật sỏi mật vàng da, cao huyết áp đái tháo đường'
    ],
    contraindications: 'Không có độc tính, an toàn cho mọi lứa tuổi.',
    benskyNotes: 'Dan Bensky & Tuệ Tĩnh: Tăng lượng nước tiểu gấp 3-5 lần mà không làm mất cân bằng điện giải.'
  },
  {
    id: 'rau-meo',
    vietnameseName: 'Râu mèo (Bông bạc)',
    pinyinName: 'Mao Xu Cao',
    botanicalName: 'Herba Orthosiphonis Spiralis',
    chineseCharacters: '貓鬚草',
    category: '4. Thuốc Lợi Thủy Thẩm Thấp (Drain Dampness)',
    properties: {
      nature: 'Mát',
      flavors: ['Ngọt', 'Nhạt', 'Hơi đắng'],
      channels: ['Thận', 'Bàng quang', 'Đởm']
    },
    dosageGram: '15 - 30g',
    actions: [
      'Thanh nhiệt lợi niệu bài thạch (Bào mòn sỏi thận)',
      'Đào thải Ure, Acid Uric và Chloride qua nước tiểu',
      'Lợi mật tiêu viêm đường tiết niệu'
    ],
    clinicalIndications: [
      'Sỏi thận, sỏi niệu quản, sỏi bàng quang và sỏi túi mật',
      'Bệnh Gout (Thống phong) tăng acid uric máu',
      'Viêm thận phù thũng viêm bàng quang tiểu buốt'
    ],
    contraindications: 'Thận trọng dùng liều cao kéo dài ở người suy thận mất điện giải.',
    benskyNotes: 'Dược Điển Việt Nam: Muối Kali và Orthosiphonin giữ acid uric và oxalat ở dạng hòa tan chống kết tinh sỏi.'
  },
  {
    id: 'gou-ji',
    vietnameseName: 'Cẩu tích (Lông cu li)',
    pinyinName: 'Gou Ji',
    botanicalName: 'Rhizoma Cibotii',
    chineseCharacters: '狗脊',
    category: '5. Thuốc Khu Phong Trừ Thấp (Dispel Wind-Dampness)',
    properties: {
      nature: 'Ôn',
      flavors: ['Đắng', 'Ngọt'],
      channels: ['Can', 'Thận']
    },
    dosageGram: '6 - 15g',
    actions: [
      'Bổ can thận cường yêu tất (mạnh cột sống thắt lưng)',
      'Khứ phong thấp thông kinh lạc',
      'Cố thận sáp niệu chỉ đới'
    ],
    clinicalIndications: [
      'Đau cột sống thắt lưng cứng đờ khó cúi ngửa, thoát vị đĩa đệm',
      'Phong hàn thấp tý chân gối yếu mỏi tê bì',
      'Thận hư tiểu nhiều lần bạch đới, lông vàng cầm máu vết thương'
    ],
    contraindications: 'Kỵ âm hư nội nhiệt tiểu buốt đỏ.',
    benskyNotes: 'Dan Bensky: Hình dáng giống xương sống chó nên đi thẳng vào mạch Đốc và cột sống thắt lưng.'
  },
  {
    id: 'day-dau-xuong',
    vietnameseName: 'Dây đau xương (Khoan cân đằng)',
    pinyinName: 'Kuan Jin Teng',
    botanicalName: 'Caulis Tinosporae Sinensis',
    chineseCharacters: '寬筋藤',
    category: '5. Thuốc Khu Phong Trừ Thấp (Dispel Wind-Dampness)',
    properties: {
      nature: 'Mát',
      flavors: ['Đắng'],
      channels: ['Can', 'Tỳ']
    },
    dosageGram: '12 - 24g',
    actions: [
      'Khứ phong thấp thư cân hoạt lạc',
      'Thanh nhiệt tiêu viêm giảm đau khớp',
      'Hoạt huyết tan máu bầm'
    ],
    clinicalIndications: [
      'Đau nhức xương khớp, thoái hóa khớp gối, đau thần kinh tọa',
      'Co rút gân cơ tê bại chân tay sau tai biến',
      'Chấn thương bong gân sai khớp sưng bầm'
    ],
    contraindications: 'Phụ nữ có thai dùng thận trọng.',
    benskyNotes: 'Nam Dược Tuệ Tĩnh & Đỗ Tất Lợi: Dược liệu đầu bảng của Y học cổ truyền Việt Nam làm giãn cơ và giảm đau khớp.'
  },
  {
    id: 'la-lot',
    vietnameseName: 'Lá lốt (Tất bát diệp)',
    pinyinName: 'Jia Ju',
    botanicalName: 'Herba Piperis Lolot',
    chineseCharacters: '假蒟',
    category: '5. Thuốc Khu Phong Trừ Thấp (Dispel Wind-Dampness)',
    properties: {
      nature: 'Ôn',
      flavors: ['Cay', 'Thơm'],
      channels: ['Tỳ', 'Vị', 'Can', 'Đởm']
    },
    dosageGram: '8 - 16g (Tươi 20 - 30g)',
    actions: [
      'Ôn trung tán hàn hạ khí chỉ thống',
      'Khứ phong hàn thấp giảm đau nhức xương khớp',
      'Trừ phong hàn thấp ở bàn tay bàn chân (ra mồ hôi tay chân)'
    ],
    clinicalIndications: [
      'Phong hàn thấp tý đau nhức xương khớp khi trời trở lạnh',
      'Chứng phong tê thấp ra nhiều mồ hôi lòng bàn tay bàn chân (ngâm và uống)',
      'Đau bụng lạnh tiêu chảy buồn nôn đau răng'
    ],
    contraindications: 'Kỵ nhiệt thịnh táo bón lở miệng.',
    benskyNotes: 'Tuệ Tĩnh & Đỗ Tất Lợi: Vị thuốc Nam kinh điển trị đau nhức khớp mùa lạnh và chứng thấp khớp bàn chân tay.'
  },
  {
    id: 'hai-feng-teng',
    vietnameseName: 'Hải phong đằng',
    pinyinName: 'Hai Feng Teng',
    botanicalName: 'Caulis Piperis Kadsurae',
    chineseCharacters: '海風藤',
    category: '5. Thuốc Khu Phong Trừ Thấp (Dispel Wind-Dampness)',
    properties: {
      nature: 'Hơi ôn',
      flavors: ['Cay', 'Đắng'],
      channels: ['Can']
    },
    dosageGram: '6 - 12g',
    actions: [
      'Khứ phong thấp thông kinh lạc',
      'Chỉ tý thống giảm đau khớp',
      'Hòa vị hành khí'
    ],
    clinicalIndications: [
      'Phong hàn thấp tý đau nhức khớp co duỗi khó khăn',
      'Đau mỏi vai gáy thắt lưng tê bì tứ chi',
      'Chấn thương đụng dập đau nhức'
    ],
    contraindications: 'Kỵ âm hư hỏa vượng.',
    benskyNotes: 'Dan Bensky: Chuyên thông suốt kinh lạc bị phong hàn thấp làm tắc nghẽn.'
  },
  {
    id: 'luo-shi-teng',
    vietnameseName: 'Lạc thạch đằng (Dây cổ thần thông)',
    pinyinName: 'Luo Shi Teng',
    botanicalName: 'Caulis Trachelospermi',
    chineseCharacters: '絡石藤',
    category: '5. Thuốc Khu Phong Trừ Thấp (Dispel Wind-Dampness)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ['Đắng'],
      channels: ['Tâm', 'Can']
    },
    dosageGram: '6 - 15g',
    actions: [
      'Khứ phong thông lạc lương huyết',
      'Tiêu thũng lợi hầu họng',
      'Giảm co rút gân cơ nhiệt tý'
    ],
    clinicalIndications: [
      'Nhiệt tý viêm khớp cấp sưng nóng đỏ đau gân cơ co rút',
      'Viêm họng sưng đau tắc nghẽn hầu họng',
      'Mụn nhọt ung thũng sưng tấy'
    ],
    contraindications: 'Kỵ dương hư sợ lạnh tiêu chảy.',
    benskyNotes: 'Dan Bensky: Trong khi Hải phong đằng ôn thông hàn tý thì Lạc thạch đằng lương thông nhiệt tý.'
  },
  {
    id: 'hai-tong-pi',
    vietnameseName: 'Hải đồng bì (Vỏ cây vông nem)',
    pinyinName: 'Hai Tong Pi',
    botanicalName: 'Cortex Erythrinae',
    chineseCharacters: '海桐皮',
    category: '5. Thuốc Khu Phong Trừ Thấp (Dispel Wind-Dampness)',
    properties: {
      nature: 'Bình',
      flavors: ['Đắng', 'Cay'],
      channels: ['Can', 'Tỳ']
    },
    dosageGram: '6 - 12g',
    actions: [
      'Khứ phong thấp thông kinh lạc chỉ thống',
      'Sát trùng chỉ ngứa ngoài da',
      'Lợi thấp tiêu thũng'
    ],
    clinicalIndications: [
      'Phong thấp đau nhức lưng gối đặc biệt đau lan từ thắt lưng xuống hai chân',
      'Ghẻ lở hắc lào eczema nấm da ngứa ngáy (rửa ngoài)',
      'Đau răng sâu răng (ngậm nước sắc)'
    ],
    contraindications: 'Kỵ huyết hư đau mỏi.',
    benskyNotes: 'Dan Bensky: Chuyên trị đau khớp chi dưới và đầu gối.'
  },
  {
    id: 'zhe-bei-mu',
    vietnameseName: 'Triết bối mẫu',
    pinyinName: 'Zhe Bei Mu',
    botanicalName: 'Bulbus Fritillariae Thunbergii',
    chineseCharacters: '浙貝母',
    category: '6. Thuốc Hóa Đàm Chỉ Khái Bình Suyễn (Transform Phlegm & Relieve Cough)',
    properties: {
      nature: 'Hàn',
      flavors: ['Đắng'],
      channels: ['Phế', 'Tâm']
    },
    dosageGram: '4.5 - 10g',
    actions: [
      'Thanh nhiệt hóa đờm khai uất',
      'Tán kết tiêu ung bướu hạch',
      'Chỉ khái ngoại cảm phong nhiệt'
    ],
    clinicalIndications: [
      'Phong nhiệt phạm phế hoặc đờm nhiệt ho gắt đờm vàng đặc',
      'Bướu cổ (Anh lựu), tràng nhạc hạch cổ, nhân tuyến giáp',
      'Áp xe phổi, áp xe vú mụn nhọt sưng tấy'
    ],
    contraindications: 'Phản Ô đầu, Phụ tử (Thập bát phản); kỵ hàn đờm.',
    benskyNotes: 'Dan Bensky: Xuyên bối mẫu nhuận phế trị ho hư lao, còn Triết bối mẫu tả hỏa tán kết bướu hạch mạnh hơn nhiều.'
  },
  {
    id: 'gua-lou-ren',
    vietnameseName: 'Qua lâu nhân (Hạt qua lâu)',
    pinyinName: 'Gua Lou Ren',
    botanicalName: 'Semen Trichosanthis',
    chineseCharacters: '瓜蔞仁',
    category: '6. Thuốc Hóa Đàm Chỉ Khái Bình Suyễn (Transform Phlegm & Relieve Cough)',
    properties: {
      nature: 'Hàn',
      flavors: ['Ngọt', 'Đắng'],
      channels: ['Phế', 'Vị', 'Đại tràng']
    },
    dosageGram: '9 - 15g',
    actions: [
      'Thanh nhiệt hóa đờm khoan hung',
      'Nhuận tràng thông tiện',
      'Tán kết tiêu ung'
    ],
    clinicalIndications: [
      'Đờm nhiệt ho khan đờm dính khó khạc ngực sườn đau tức (Tiểu Hãm Hung Thang)',
      'Đau thắt ngực bệnh mạch vành do đờm trọc bế tắc',
      'Táo bón kèm đờm nhiệt ở phổi'
    ],
    contraindications: 'Phản Ô đầu, Phụ tử; kỵ tỳ hư tiêu chảy.',
    benskyNotes: 'Dan Bensky: Mở rộng lồng ngực quét đờm nhiệt và thông đại tràng.'
  },
  {
    id: 'tian-nan-xing',
    vietnameseName: 'Thiên nam tinh (Chế nam tinh)',
    pinyinName: 'Tian Nan Xing',
    botanicalName: 'Rhizoma Arisaematis',
    chineseCharacters: '天南星',
    category: '6. Thuốc Hóa Đàm Chỉ Khái Bình Suyễn (Transform Phlegm & Relieve Cough)',
    properties: {
      nature: 'Ôn (Có độc)',
      flavors: ['Đắng', 'Cay'],
      channels: ['Phế', 'Can', 'Tỳ']
    },
    dosageGram: '3 - 9g (Chỉ dùng dạng đã bào chế)',
    actions: [
      'Táo thấp hóa đờm cực mạnh',
      'Khứ phong đờm chỉ kinh co giật',
      'Tán kết tiêu thũng chỉ thống'
    ],
    clinicalIndications: [
      'Phong đờm trúng phong tai biến méo miệng liệt nửa người động kinh',
      'Đờm thấp ho suyễn tức ngực đờm nhiều',
      'Chế với mật bò thành Đởm nam tinh trị sốt cao co giật đờm nhiệt'
    ],
    contraindications: 'Cấm phụ nữ có thai và âm hư táo đờm; củ sống gây bỏng rát họng.',
    benskyNotes: 'Dan Bensky: Bán hạ trị đờm ở Tỳ Vị, còn Thiên nam tinh chuyên trị Phong đờm ở kinh lạc gây liệt và co giật.'
  },
  {
    id: 'kun-bu',
    vietnameseName: 'Côn bố',
    pinyinName: 'Kun Bu',
    botanicalName: 'Thallus Laminariae',
    chineseCharacters: '昆布',
    category: '6. Thuốc Hóa Đàm Chỉ Khái Bình Suyễn (Transform Phlegm & Relieve Cough)',
    properties: {
      nature: 'Hàn',
      flavors: ['Mặn'],
      channels: ['Can', 'Vị', 'Thận']
    },
    dosageGram: '6 - 15g',
    actions: [
      'Tiêu đờm nhuyễn kiên tán kết',
      'Lợi thủy tiêu thũng',
      'Thu nhỏ bướu giáp và hạch lympho'
    ],
    clinicalIndications: [
      'Bướu cổ (Anh lựu), nhân tuyến giáp, tràng nhạc hạch cổ',
      'Sưng đau tinh hoàn, phù nề cước khí',
      'Cao huyết áp xơ vữa mạch máu'
    ],
    contraindications: 'Thận trọng ở bệnh nhân cường giáp Basedow thừa Iod.',
    benskyNotes: 'Dan Bensky: Vị mặn làm mềm khối cứng (Hàm năng nhuyễn kiên), luôn phối Hải tảo.'
  },
  {
    id: 'hai-zao',
    vietnameseName: 'Hải tảo (Rong mơ)',
    pinyinName: 'Hai Zao',
    botanicalName: 'Sargassum',
    chineseCharacters: '海藻',
    category: '6. Thuốc Hóa Đàm Chỉ Khái Bình Suyễn (Transform Phlegm & Relieve Cough)',
    properties: {
      nature: 'Hàn',
      flavors: ['Đắng', 'Mặn'],
      channels: ['Can', 'Vị', 'Thận']
    },
    dosageGram: '6 - 15g',
    actions: [
      'Tiêu đờm nhuyễn kiên tán kết bướu',
      'Lợi thủy tiêu thũng',
      'Thanh nhiệt hóa kết'
    ],
    clinicalIndications: [
      'Bướu cổ đơn thuần, u nang tuyến giáp (Hải Tảo Ngọc Hồ Thang)',
      'Viêm hạch bạch huyết cổ, sưng tinh hoàn sán khí',
      'Phù thũng tiểu ít'
    ],
    contraindications: 'Phản Cam thảo (Thập bát phản); kỵ tỳ vị hư hàn.',
    benskyNotes: 'Dan Bensky: Hải tảo tán đờm kết khối u mạnh hơn Côn bố, Côn bố làm mềm khối xơ gan lách mạnh hơn.'
  },
  {
    id: 'pi-pa-ye',
    vietnameseName: 'Tỳ bà diệp (Lá nhót tây)',
    pinyinName: 'Pi Pa Ye',
    botanicalName: 'Folium Eriobotryae',
    chineseCharacters: '枇杷葉',
    category: '6. Thuốc Hóa Đàm Chỉ Khái Bình Suyễn (Transform Phlegm & Relieve Cough)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ['Đắng'],
      channels: ['Phế', 'Vị']
    },
    dosageGram: '6 - 12g (Chải sạch lông tơ trước khi dùng)',
    actions: [
      'Thanh phế hóa đờm chỉ khái bình suyễn',
      'Hòa vị giáng nghịch chỉ ẩu',
      'Sinh tân chỉ khát'
    ],
    clinicalIndications: [
      'Phế nhiệt ho khan ho đờm vàng đặc khó thở',
      'Vị nhiệt nôn mửa nấc cụt ợ hơi khát nước',
      'Chế cao Tỳ bà lộ trị ho viêm phế quản'
    ],
    contraindications: 'Phải cạo sạch lông tơ mặt dưới lá để không kích ứng gây ngứa rát họng.',
    benskyNotes: 'Dan Bensky: Chích mật ong thì chuyên nhuận phế chỉ ho; sao gừng thì chuyên hòa vị cầm nôn.'
  },
  {
    id: 'bai-guo',
    vietnameseName: 'Bạch quả (Hạt ngân hạnh)',
    pinyinName: 'Bai Guo',
    botanicalName: 'Semen Ginkgo',
    chineseCharacters: '白果',
    category: '6. Thuốc Hóa Đàm Chỉ Khái Bình Suyễn (Transform Phlegm & Relieve Cough)',
    properties: {
      nature: 'Bình (Hơi có độc)',
      flavors: ['Ngọt', 'Đắng', 'Chát'],
      channels: ['Phế', 'Thận']
    },
    dosageGram: '4.5 - 9g (Đập dập nấu chín)',
    actions: [
      'Liễm phế định suyễn hóa đờm',
      'Chỉ đới sáp niệu',
      'Lá Bạch quả (Ngân hạnh diệp) hoạt huyết tăng tuần hoàn não'
    ],
    clinicalIndications: [
      'Hen phế quản ho suyễn nhiều đờm khò khè (Định Suyễn Thang)',
      'Phụ nữ bạch đới khí hư, tiểu đêm đái dầm tiểu đục',
      'Thiểu năng tuần hoàn não suy giảm trí nhớ ù tai (dùng lá)'
    ],
    contraindications: 'Không ăn hạt sống hoặc quá liều ở trẻ em.',
    benskyNotes: 'Dan Bensky: Vừa thu liễm Phế khí vừa hóa đờm thấp, chủ vị bài Định Suyễn Thang trị hen cấp.'
  },
  {
    id: 'ting-li-zi',
    vietnameseName: 'Đình lịch tử',
    pinyinName: 'Ting Li Zi',
    botanicalName: 'Semen Descurainiae / Lepidii',
    chineseCharacters: '葶藶子',
    category: '6. Thuốc Hóa Đàm Chỉ Khái Bình Suyễn (Transform Phlegm & Relieve Cough)',
    properties: {
      nature: 'Đại hàn',
      flavors: ['Đắng', 'Cay'],
      channels: ['Phế', 'Bàng quang']
    },
    dosageGram: '3 - 10g (Bọc vải sắc)',
    actions: [
      'Tả phế bình suyễn trục đờm ẩm',
      'Lợi thủy tiêu thũng',
      'Giảm áp lực tuần hoàn phổi'
    ],
    clinicalIndications: [
      'Đờm ẩm tràn dịch màng phổi, phù phổi, tâm phế mạn khó thở không nằm được (Đình Lịch Đại Táo Tả Phế Thang)',
      'Phù thũng mặt và ngực bụng tiểu tiện bí',
      'Suy tim ứ huyết khó thở'
    ],
    contraindications: 'Kỵ ho suyễn do phế khí hư.',
    benskyNotes: 'Dan Bensky: Tả Phế thủy mạnh hơn Tang bạch bì, chứa glycosid trợ tim nhẹ giúp giảm phù phổi.'
  },
  {
    id: 'xuan-fu-hua',
    vietnameseName: 'Toàn phúc hoa',
    pinyinName: 'Xuan Fu Hua',
    botanicalName: 'Flos Inulae',
    chineseCharacters: '旋覆花',
    category: '6. Thuốc Hóa Đàm Chỉ Khái Bình Suyễn (Transform Phlegm & Relieve Cough)',
    properties: {
      nature: 'Hơi ôn',
      flavors: ['Đắng', 'Cay', 'Mặn'],
      channels: ['Phế', 'Tỳ', 'Vị', 'Đại tràng']
    },
    dosageGram: '3 - 9g (Bọc túi vải sắc)',
    actions: [
      'Tiêu đờm hành thủy',
      'Giáng khí chỉ ẩu cầm nấc',
      'Bình suyễn'
    ],
    clinicalIndications: [
      'Đờm ẩm tắc phế ho suyễn nhiều đờm',
      'Vị khí thượng nghịch ợ hơi nấc cụt nôn đờm dãi (Toàn Phúc Đại Giả Thang)',
      'Ngực sườn đầy tức'
    ],
    contraindications: 'Phải bọc túi vải khi sắc để lông hoa không gây kích ứng cổ họng.',
    benskyNotes: 'Dan Bensky: Câu quyết kinh điển: Chư hoa giai thăng, Toàn phúc độc giáng (Các hoa đều đi lên, chỉ mình Toàn phúc hoa giáng khí đi xuống).'
  },
  {
    id: 'hung-chanh',
    vietnameseName: 'Húng chanh (Tần dày lá)',
    pinyinName: 'Dao Shou Xiang',
    botanicalName: 'Folium Plectranthi Amboinici',
    chineseCharacters: '到手香',
    category: '6. Thuốc Hóa Đàm Chỉ Khái Bình Suyễn (Transform Phlegm & Relieve Cough)',
    properties: {
      nature: 'Ôn',
      flavors: ['Cay', 'Thơm', 'Hơi chua'],
      channels: ['Phế', 'Tỳ']
    },
    dosageGram: '10 - 20g lá tươi',
    actions: [
      'Tuyên phế giải cảm tán phong hàn',
      'Tiêu đờm chỉ khái lợi hầu họng',
      'Kháng sinh tự nhiên đường hô hấp'
    ],
    clinicalIndications: [
      'Ho gió ho đờm viêm họng khản tiếng ở trẻ em và người lớn (chưng đường phèn hoặc quất)',
      'Cảm cúm sốt không ra mồ hôi',
      'Rết cắn ong đốt dị ứng mề đay (giã đắp)'
    ],
    contraindications: 'An toàn cho trẻ sơ sinh và phụ nữ mang thai.',
    benskyNotes: 'GS. Đỗ Tất Lợi: Tinh dầu Carvacrol và Colein kháng khuẩn mạnh đối với vi khuẩn vùng hầu họng và phế quản.'
  },
  {
    id: 'pei-lan',
    vietnameseName: 'Bội lan (Mần tưới)',
    pinyinName: 'Pei Lan',
    botanicalName: 'Herba Eupatorii',
    chineseCharacters: '佩蘭',
    category: '7. Thuốc Phương Hương Hóa Thấp (Aromatic Transform Dampness)',
    properties: {
      nature: 'Bình',
      flavors: ['Cay', 'Thơm'],
      channels: ['Tỳ', 'Vị', 'Phế']
    },
    dosageGram: '5 - 10g (Không sắc lâu)',
    actions: [
      'Phương hương hóa thấp tỉnh tỳ',
      'Giải thử thanh nhiệt mùa hè',
      'Khử mùi hôi miệng do tỳ vị thấp nhiệt'
    ],
    clinicalIndications: [
      'Thấp trọc trở trung tiêu miệng ngọt dính lưỡi rêu dày hôi miệng (Tỳ Đan)',
      'Cảm nắng mùa hè đầu nặng ngực tức buồn nôn',
      'Luôn phối Hoắc hương để hóa thấp giải thử'
    ],
    contraindications: 'Kỵ âm hư vị táo.',
    benskyNotes: 'Dan Bensky: Đặc trị chứng Tỳ đan (miệng ngọt nhạt nhiều nước bọt hôi miệng do thấp nhiệt ở Tỳ).'
  },
  {
    id: 'gu-ya',
    vietnameseName: 'Cốc nha (Mầm thóc lúa)',
    pinyinName: 'Gu Ya',
    botanicalName: 'Fructus Oryzae Germinatus',
    chineseCharacters: '穀芽',
    category: '8. Thuốc Tiêu Đạo (Relieve Food Stagnation)',
    properties: {
      nature: 'Bình',
      flavors: ['Ngọt'],
      channels: ['Tỳ', 'Vị']
    },
    dosageGram: '10 - 15g',
    actions: [
      'Tiêu thực hòa trung',
      'Kiện tỳ khai vị kích thích thèm ăn',
      'Tiêu hóa tinh bột cơm gạo'
    ],
    clinicalIndications: [
      'Tỳ vị hư nhược ăn cơm bột không tiêu đầy bụng chán ăn',
      'Trẻ em suy dinh dưỡng biếng ăn sau ốm',
      'Phối Mạch nha để tăng lực tiêu thực dưỡng vị'
    ],
    contraindications: 'Không làm mất sữa như Mạch nha liều cao.',
    benskyNotes: 'Dan Bensky: Mạch nha tiêu tích mạnh hơn, nhưng Cốc nha kiện tỳ dưỡng vị êm dịu hơn.'
  },
  {
    id: 'fo-shou',
    vietnameseName: 'Phật thủ',
    pinyinName: 'Fo Shou',
    botanicalName: 'Fructus Citri Sarcodactylis',
    chineseCharacters: '佛手',
    category: '9. Thuốc Lý Khí (Regulate Qi)',
    properties: {
      nature: 'Ôn',
      flavors: ['Cay', 'Đắng', 'Chua'],
      channels: ['Can', 'Tỳ', 'Vị', 'Phế']
    },
    dosageGram: '3 - 10g',
    actions: [
      'Sơ can lý khí giải uất',
      'Hòa vị chỉ thống cầm nôn',
      'Táo thấp hóa đờm chỉ khái'
    ],
    clinicalIndications: [
      'Can vị bất hòa đau dạ dày trướng tức hai mạng sườn ợ hơi buồn nôn',
      'Viêm dạ dày mạn tính ăn kém',
      'Ho lâu ngày nhiều đờm tức ngực'
    ],
    contraindications: 'Kỵ âm hư hỏa vượng không có khí trệ.',
    benskyNotes: 'Dan Bensky: Hành khí giảm đau dạ dày mà không gây khô táo tổn thương âm dịch.'
  },
  {
    id: 'chuan-lian-zi',
    vietnameseName: 'Xuyên luyện tử',
    pinyinName: 'Chuan Lian Zi',
    botanicalName: 'Fructus Toosendan',
    chineseCharacters: '川楝子',
    category: '9. Thuốc Lý Khí (Regulate Qi)',
    properties: {
      nature: 'Hàn (Hơi có độc)',
      flavors: ['Đắng'],
      channels: ['Can', 'Vị', 'Tiểu tràng', 'Bàng quang']
    },
    dosageGram: '4.5 - 9g',
    actions: [
      'Sơ can tiết nhiệt hành khí chỉ thống',
      'Sát trùng tẩy giun',
      'Trị nấm đầu ngoài da'
    ],
    clinicalIndications: [
      'Can uất hóa hỏa đau tức mạng sườn đau thượng vị ợ chua đắng miệng (Kim Linh Tử Tán)',
      'Sán khí đau tinh hoàn do nhiệt',
      'Đau bụng giun đũa'
    ],
    contraindications: 'Kỵ tỳ vị hư hàn; không dùng quá liều gây hại gan.',
    benskyNotes: 'Dan Bensky: Vị thuốc lý khí duy nhất có tính Hàn, phối Diên hồ sách thành bài Kim Linh Tử Tán giảm đau kinh điển.'
  },
  {
    id: 'li-zhi-he',
    vietnameseName: 'Lệ chi hạch (Hạt vải)',
    pinyinName: 'Li Zhi He',
    botanicalName: 'Semen Litchi',
    chineseCharacters: '荔枝核',
    category: '9. Thuốc Lý Khí (Regulate Qi)',
    properties: {
      nature: 'Ôn',
      flavors: ['Ngọt', 'Hơi đắng'],
      channels: ['Can', 'Vị']
    },
    dosageGram: '6 - 15g (Đập dập)',
    actions: [
      'Hành khí tán kết',
      'Tán hàn chỉ thống',
      'Đặc trị sán khí và đau bụng kinh'
    ],
    clinicalIndications: [
      'Hàn sán đau sưng tinh hoàn thoát vị bẹn',
      'Can khí uất trệ huyết ứ đau bụng kinh đau sau sinh',
      'Đau vùng thượng vị do hàn khí trệ'
    ],
    contraindications: 'Kỵ không có hàn thấp khí trệ.',
    benskyNotes: 'Dan Bensky: Đi chuyên biệt vào quyết âm Can kinh giải quyết đau tinh hoàn và đau bụng dưới.'
  },
  {
    id: 'shi-di',
    vietnameseName: 'Thị đế (Tai quả hồng)',
    pinyinName: 'Shi Di',
    botanicalName: 'Calyx Kaki',
    chineseCharacters: '柿蒂',
    category: '9. Thuốc Lý Khí (Regulate Qi)',
    properties: {
      nature: 'Bình',
      flavors: ['Đắng', 'Chát'],
      channels: ['Vị']
    },
    dosageGram: '4.5 - 9g',
    actions: [
      'Giáng nghịch hạ khí',
      'Đặc trị nấc cụt (Ách nghịch)',
      'Chỉ ợ hơi buồn nôn'
    ],
    clinicalIndications: [
      'Nấc cụt do vị hàn (phối Đinh hương, Sinh khương - Đinh Hương Thị Đế Thang)',
      'Nấc cụt do vị nhiệt (phối Trúc nhự, Lô căn)',
      'Ợ hơi trào ngược dạ dày'
    ],
    contraindications: 'Không có độc tính.',
    benskyNotes: 'Dan Bensky: Thuốc chuyên khoa số 1 Đông y để cắt cơn co thắt cơ hoành gây nấc cụt.'
  },
  {
    id: 'jiang-huang',
    vietnameseName: 'Khương hoàng (Nghệ vàng)',
    pinyinName: 'Jiang Huang',
    botanicalName: 'Rhizoma Curcumae Longae',
    chineseCharacters: '薑黃',
    category: '10. Thuốc Lý Huyết (Regulate Blood)',
    properties: {
      nature: 'Ôn',
      flavors: ['Cay', 'Đắng'],
      channels: ['Tỳ', 'Can']
    },
    dosageGram: '3 - 10g',
    actions: [
      'Phá huyết hành khí thông kinh',
      'Chỉ thống chuyên trị đau khớp vai và dạ dày',
      'Liền sẹo loét dạ dày và lợi mật'
    ],
    clinicalIndications: [
      'Viêm loét dạ dày tá tràng đau thượng vị (phối Ô tặc cốt hoặc Mật ong)',
      'Phong thấp đau nhức khớp vai cánh tay không giơ lên được (Quyên Tý Thang)',
      'Bế kinh đau bụng kinh chấn thương tụ máu'
    ],
    contraindications: 'Thận trọng phụ nữ có thai.',
    benskyNotes: 'Dan Bensky & Đỗ Tất Lợi: Hoạt chất Curcumin kháng viêm mạnh, dẫn thuốc ra khớp vai và làm lành ổ loét dạ dày.'
  },
  {
    id: 'yu-jin',
    vietnameseName: 'Uất kim (Củ nghệ nhánh)',
    pinyinName: 'Yu Jin',
    botanicalName: 'Radix Curcumae',
    chineseCharacters: '鬱金',
    category: '10. Thuốc Lý Huyết (Regulate Blood)',
    properties: {
      nature: 'Hàn',
      flavors: ['Cay', 'Đắng'],
      channels: ['Can', 'Đởm', 'Tâm']
    },
    dosageGram: '6 - 12g',
    actions: [
      'Hoạt huyết chỉ thống hành khí giải uất',
      'Thanh tâm lương huyết chỉ huyết',
      'Lợi đởm thoái hoàng bài sỏi mật'
    ],
    clinicalIndications: [
      'Can khí uất kết huyết ứ đau ngực sườn đau bụng kinh u xơ vú',
      'Huyết nhiệt thổ huyết chảy máu cam kinh nguyệt ra máu cục nóng',
      'Viêm túi mật sỏi mật vàng da, đờm bế tâm khiếu động kinh'
    ],
    contraindications: 'Úy Đinh hương (Thập cửu úy); thận trọng phụ nữ có thai.',
    benskyNotes: 'Dan Bensky: Khác với Khương hoàng tính Ôn, Uất kim tính Hàn vừa hành khí hoạt huyết vừa thanh Tâm Can nhiệt.'
  },
  {
    id: 'ru-xiang',
    vietnameseName: 'Nhũ hương',
    pinyinName: 'Ru Xiang',
    botanicalName: 'Olibanum',
    chineseCharacters: '乳香',
    category: '10. Thuốc Lý Huyết (Regulate Blood)',
    properties: {
      nature: 'Ôn',
      flavors: ['Cay', 'Đắng'],
      channels: ['Tâm', 'Can', 'Tỳ']
    },
    dosageGram: '3 - 9g (Sao giấm)',
    actions: [
      'Hoạt huyết hành khí chỉ thống',
      'Tiêu thũng sinh cơ liền vết thương',
      'Thư cân hoạt lạc'
    ],
    clinicalIndications: [
      'Chấn thương đụng dập tụ máu sưng đau dữ dội (Thất Ly Tán)',
      'Đau dạ dày đau bụng kinh đau khớp phong thấp co cứng',
      'Mụn nhọt vỡ loét lâu lành (dùng trong và rắc ngoài)'
    ],
    contraindications: 'Cấm phụ nữ có thai; vị đắng hắc dễ gây buồn nôn ở người vị yếu.',
    benskyNotes: 'Dan Bensky: Nhũ hương thiên về hành khí giãn cân, Một dược thiên về tán huyết ứ; hai vị luôn đi đôi.'
  },
  {
    id: 'mo-yao',
    vietnameseName: 'Một dược',
    pinyinName: 'Mo Yao',
    botanicalName: 'Myrrha',
    chineseCharacters: '沒藥',
    category: '10. Thuốc Lý Huyết (Regulate Blood)',
    properties: {
      nature: 'Bình',
      flavors: ['Đắng', 'Cay'],
      channels: ['Tâm', 'Can', 'Tỳ']
    },
    dosageGram: '3 - 9g (Sao giấm)',
    actions: [
      'Tán huyết khứ ứ chỉ thống cực mạnh',
      'Tiêu thũng sinh cơ',
      'Thông kinh hoạt lạc'
    ],
    clinicalIndications: [
      'Đau nhức do chấn thương gãy xương bong gân máu tụ',
      'Khối u cục vùng bụng đau nhói cố định, đau thắt ngực',
      'Ung nhọt lở loét trĩ sưng đau'
    ],
    contraindications: 'Cấm phụ nữ có thai và người đau dạ dày nhạy cảm.',
    benskyNotes: 'Dan Bensky: Cặp Nhũ hương - Một dược (Nhũ Một) là trụ cột giảm đau ngoại khoa và chấn thương chỉnh hình Đông y.'
  },
  {
    id: 'su-mu',
    vietnameseName: 'Tô mộc (Gỗ vang)',
    pinyinName: 'Su Mu',
    botanicalName: 'Lignum Sappan',
    chineseCharacters: '蘇木',
    category: '10. Thuốc Lý Huyết (Regulate Blood)',
    properties: {
      nature: 'Bình',
      flavors: ['Ngọt', 'Mặn', 'Cay'],
      channels: ['Tâm', 'Can', 'Tỳ']
    },
    dosageGram: '3 - 9g',
    actions: [
      'Hoạt huyết khứ ứ thông kinh',
      'Tiêu thũng chỉ thống',
      'Kháng khuẩn cầm tiêu chảy nhiễm trùng'
    ],
    clinicalIndications: [
      'Chấn thương té ngã gãy xương bầm tím sưng đau',
      'Bế kinh đau bụng kinh đau bụng ứ huyết sau sinh',
      'Tiêu chảy kiết lỵ nhiễm khuẩn đường ruột (Nam dược)'
    ],
    contraindications: 'Cấm phụ nữ có thai và huyết hư không có ứ.',
    benskyNotes: 'Dan Bensky & Tuệ Tĩnh: Lõi gỗ màu đỏ sẫm đi thẳng vào huyết phận tan máu bầm và kháng khuẩn Shigella.'
  },
  {
    id: 'wu-ling-zhi',
    vietnameseName: 'Ngũ linh chi',
    pinyinName: 'Wu Ling Zhi',
    botanicalName: 'Faeces Trogopterori',
    chineseCharacters: '五靈脂',
    category: '10. Thuốc Lý Huyết (Regulate Blood)',
    properties: {
      nature: 'Ôn',
      flavors: ['Đắng', 'Ngọt'],
      channels: ['Can', 'Tỳ']
    },
    dosageGram: '3 - 9g (Bọc túi vải sắc)',
    actions: [
      'Hoạt huyết tán ứ chỉ thống',
      'Chỉ huyết hóa ứ (dùng sao)',
      'Giải độc rắn rết cắn'
    ],
    clinicalIndications: [
      'Đau thắt ngực tâm vị thống, đau bụng kinh, đau bụng sau sinh (Thất Tiếu Tán)',
      'Băng lậu rong huyết có máu cục tím đen',
      'Trẻ em cam tích'
    ],
    contraindications: 'Úy Nhân sâm (Thập cửu úy); cấm phụ nữ có thai.',
    benskyNotes: 'Dan Bensky: Phối Bồ hoàng tỷ lệ 1:1 thành bài Thất Tiếu Tán trị đau thắt ngực và đau bụng huyết ứ.'
  },
  {
    id: 'wang-bu-liu-xing',
    vietnameseName: 'Vương bất lưu hành',
    pinyinName: 'Wang Bu Liu Xing',
    botanicalName: 'Semen Vaccariae',
    chineseCharacters: '王不留行',
    category: '10. Thuốc Lý Huyết (Regulate Blood)',
    properties: {
      nature: 'Bình',
      flavors: ['Đắng'],
      channels: ['Can', 'Vị']
    },
    dosageGram: '4.5 - 9g',
    actions: [
      'Hoạt huyết thông kinh',
      'Hạ nhũ thông tia sữa tiêu sưng vú',
      'Lợi niệu thông lâm và dán Nhĩ châm'
    ],
    clinicalIndications: [
      'Sản phụ tắc tia sữa, viêm tuyến vú sưng đau ít sữa',
      'Bế kinh đau bụng kinh do huyết ứ',
      'Sỏi tiết niệu và dùng hạt dán huyệt loa tai (Nhĩ áp)'
    ],
    contraindications: 'Cấm phụ nữ có thai.',
    benskyNotes: 'Dan Bensky: Tính đi rất nhanh dù mệnh vua cũng không giữ lại được; hạt tròn cứng dùng dán huyệt Nhĩ châm.'
  },
  {
    id: 'da-ji-thao',
    vietnameseName: 'Đại kế (Cây ô rô cạn)',
    pinyinName: 'Da Ji',
    botanicalName: 'Herba Cirsii Japonici',
    chineseCharacters: '大薊',
    category: '10. Thuốc Lý Huyết (Regulate Blood)',
    properties: {
      nature: 'Lương',
      flavors: ['Ngọt', 'Đắng'],
      channels: ['Tâm', 'Can']
    },
    dosageGram: '9 - 15g (Tươi 30 - 60g)',
    actions: [
      'Lương huyết chỉ huyết cầm máu',
      'Tán ứ giải độc tiêu ung thũng',
      'Hạ huyết áp và lợi mật'
    ],
    clinicalIndications: [
      'Huyết nhiệt vọng hành thổ huyết, khạc máu, chảy máu cam, băng huyết, tiểu ra máu',
      'Mụn nhọt áp xe sưng nóng (uống và đắp tươi)',
      'Cao huyết áp viêm gan vàng da'
    ],
    contraindications: 'Kỵ tỳ vị hư hàn.',
    benskyNotes: 'Dan Bensky: Vừa cầm máu vừa tan máu ứ và tiêu nhọt độc.'
  },
  {
    id: 'xiao-ji',
    vietnameseName: 'Tiểu kế',
    pinyinName: 'Xiao Ji',
    botanicalName: 'Herba Cirsii',
    chineseCharacters: '小薊',
    category: '10. Thuốc Lý Huyết (Regulate Blood)',
    properties: {
      nature: 'Lương',
      flavors: ['Ngọt', 'Đắng'],
      channels: ['Tâm', 'Can']
    },
    dosageGram: '9 - 15g (Tươi 30 - 60g)',
    actions: [
      'Lương huyết chỉ huyết',
      'Lợi niệu thông lâm đặc trị tiểu ra máu',
      'Tán ứ tiêu thũng'
    ],
    clinicalIndications: [
      'Huyết lâm tiểu ra máu tươi đái buốt viêm cầu thận cấp (Tiểu Kế Ẩm Tử)',
      'Chảy máu cam ho ra máu xuất huyết tử cung',
      'Vết thương chảy máu'
    ],
    contraindications: 'Kỵ tỳ vị hư hàn.',
    benskyNotes: 'Dan Bensky: Đại kế tiêu ung nhọt mạnh hơn, còn Tiểu kế lợi niệu cầm máu đường tiết niệu mạnh hơn.'
  },
  {
    id: 'di-yu',
    vietnameseName: 'Địa du',
    pinyinName: 'Di Yu',
    botanicalName: 'Radix Sanguisorbae',
    chineseCharacters: '地榆',
    category: '10. Thuốc Lý Huyết (Regulate Blood)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ['Đắng', 'Chua', 'Chát'],
      channels: ['Can', 'Vị', 'Đại tràng']
    },
    dosageGram: '9 - 15g',
    actions: [
      'Lương huyết chỉ huyết cầm máu hạ tiêu',
      'Giải độc liễm sang trị bỏng và lở loét',
      'Chỉ tả lỵ'
    ],
    clinicalIndications: [
      'Trĩ chảy máu tươi, đại tiện ra máu, kiết lỵ ra máu, băng lậu',
      'Bỏng nước sôi bỏng lửa diện rộng (bột Địa du trộn dầu vừng bôi giảm tiết dịch chống nhiễm trùng)',
      'Eczema loét da'
    ],
    contraindications: 'Không bôi bột Địa du lên vết bỏng quá rộng có nguy cơ hấp thu Tanin.',
    benskyNotes: 'Dan Bensky: Sao Hòe hoa và Địa du thán là cặp đôi số 1 trị chảy máu trĩ và xuất huyết đại trực tràng.'
  },
  {
    id: 'xian-he-cao',
    vietnameseName: 'Tiên hạc thảo (Long nha thảo)',
    pinyinName: 'Xian He Cao',
    botanicalName: 'Herba Agrimoniae',
    chineseCharacters: '仙鶴草',
    category: '10. Thuốc Lý Huyết (Regulate Blood)',
    properties: {
      nature: 'Bình',
      flavors: ['Đắng', 'Chát'],
      channels: ['Phế', 'Can', 'Tỳ']
    },
    dosageGram: '9 - 15g (Cấp cứu 30g)',
    actions: [
      'Thu liễm chỉ huyết toàn thân',
      'Bổ hư cường tráng chống mệt mỏi (Thoát lực thảo)',
      'Chỉ lỵ triệt ngược sát trùng'
    ],
    clinicalIndications: [
      'Mọi chứng xuất huyết dù hàn hay nhiệt: Ho ra máu, nôn ra máu, đại tiểu tiện ra máu, rong kinh',
      'Lao lực quá độ kiệt sức mệt mỏi (phối Đại táo sắc uống)',
      'Kiết lỵ mạn tính và viêm âm đạo Trichomonas'
    ],
    contraindications: 'Không có chống chỉ định nghiêm ngặt.',
    benskyNotes: 'Dan Bensky: Cầm máu mà không gây ứ huyết, dùng được cho cả Hàn, Nhiệt, Hư, Thực.'
  },
  {
    id: 'gao-liang-jiang',
    vietnameseName: 'Cao lương khương (Củ riềng ấm)',
    pinyinName: 'Gao Liang Jiang',
    botanicalName: 'Rhizoma Alpiniae Officinarum',
    chineseCharacters: '高良薑',
    category: '11. Thuốc Ôn Lý Trừ Hàn (Warm Interior & Expel Cold)',
    properties: {
      nature: 'Nhiệt',
      flavors: ['Cay'],
      channels: ['Tỳ', 'Vị']
    },
    dosageGram: '3 - 9g',
    actions: [
      'Ôn vị tán hàn',
      'Chỉ thống giảm đau dạ dày cấp',
      'Chỉ ẩu tiêu thực'
    ],
    clinicalIndications: [
      'Vị hàn đau quặn thượng vị đột ngột gặp ấm thì đỡ (Lương Phụ Hoàn: Cao lương khương + Hương phụ)',
      'Nôn mửa nước trong nấc cụt tiêu chảy do lạnh bụng',
      'Ăn đồ sống lạnh đau bụng'
    ],
    contraindications: 'Kỵ vị hỏa đau rát dạ dày.',
    benskyNotes: 'Dan Bensky: Bài Lương Phụ Hoàn là danh phương kinh điển trị đau dạ dày do hàn ngưng khí trệ.'
  },
  {
    id: 'hua-jiao',
    vietnameseName: 'Hoa tiêu (Xuyên tiêu)',
    pinyinName: 'Hua Jiao',
    botanicalName: 'Pericarpium Zanthoxyli',
    chineseCharacters: '花椒',
    category: '11. Thuốc Ôn Lý Trừ Hàn (Warm Interior & Expel Cold)',
    properties: {
      nature: 'Nhiệt (Hơi có độc)',
      flavors: ['Cay'],
      channels: ['Tỳ', 'Vị', 'Thận']
    },
    dosageGram: '2 - 5g',
    actions: [
      'Ôn trung tán hàn chỉ thống',
      'Trừ thấp chỉ tả',
      'Sát trùng an hồi trị đau bụng giun và ngứa da'
    ],
    clinicalIndications: [
      'Tỳ vị đại hàn đau quặn bụng sôi bụng nôn mửa (Đại Kiến Trung Thang)',
      'Đau bụng do giun đũa',
      'Ngứa âm hộ, eczema ghẻ lở (nấu nước xông rửa)'
    ],
    contraindications: 'Kỵ âm hư hỏa vượng và phụ nữ có thai.',
    benskyNotes: 'Dan Bensky: Cay nóng làm tê giảm đau tại chỗ và sưởi ấm trung tiêu cực mạnh.'
  },
  {
    id: 'rou-dou-kou',
    vietnameseName: 'Nhục đậu khấu',
    pinyinName: 'Rou Dou Kou',
    botanicalName: 'Semen Myristicae',
    chineseCharacters: '肉豆蔻',
    category: '13. Thuốc Cố Sáp (Stabilize and Bind)',
    properties: {
      nature: 'Ôn',
      flavors: ['Cay'],
      channels: ['Tỳ', 'Vị', 'Đại tràng']
    },
    dosageGram: '3 - 9g (Nướng cám cho bớt dầu)',
    actions: [
      'Ôn trung sáp tràng chỉ tả',
      'Hành khí tiêu thực hòa vị',
      'Cầm tiêu chảy mạn tính'
    ],
    clinicalIndications: [
      'Tỳ thận hư hàn tiêu chảy mạn tính ngũ canh tả (Tứ Thần Hoàn)',
      'Đau bụng lạnh đầy hơi nôn mửa ăn kém',
      'Trẻ em tiêu chảy phân sống'
    ],
    contraindications: 'Cấm dùng trong tiêu chảy cấp và kiết lỵ do thấp nhiệt nhiễm khuẩn.',
    benskyNotes: 'Dan Bensky: Phải nướng trong bột mì hoặc cám để hút bớt dầu béo trước khi làm thuốc cầm tiêu chảy.'
  },
  {
    id: 'fu-pen-zi',
    vietnameseName: 'Phúc bồn tử (Quả mâm xôi)',
    pinyinName: 'Fu Pen Zi',
    botanicalName: 'Fructus Rubi',
    chineseCharacters: '覆盆子',
    category: '13. Thuốc Cố Sáp (Stabilize and Bind)',
    properties: {
      nature: 'Hơi ôn',
      flavors: ['Ngọt', 'Chua'],
      channels: ['Can', 'Thận']
    },
    dosageGram: '6 - 12g',
    actions: [
      'Ích thận cố tinh súc niệu',
      'Bổ can thận minh mục',
      'Trợ dương điều kinh thụ thai'
    ],
    clinicalIndications: [
      'Thận hư di tinh hoạt tinh xuất tinh sớm liệt dương vô sinh (Ngũ Tử Diễn Tông Hoàn)',
      'Tiểu nhiều lần đái dầm tiểu đêm',
      'Can thận hư mờ mắt'
    ],
    contraindications: 'Kỵ âm hư hỏa vượng tiểu rắt tiểu đỏ.',
    benskyNotes: 'Dan Bensky: Tên gọi Phúc bồn nghĩa là làm úp ngược bô nước tiểu vì công hiệu giảm tiểu đêm tuyệt vời.'
  },
  {
    id: 'sang-piao-xiao',
    vietnameseName: 'Tang phiêu tiêu (Tổ bọ ngựa trên cây dâu)',
    pinyinName: 'Sang Piao Xiao',
    botanicalName: 'Ootheca Mantidis',
    chineseCharacters: '桑螵蛸',
    category: '13. Thuốc Cố Sáp (Stabilize and Bind)',
    properties: {
      nature: 'Bình',
      flavors: ['Ngọt', 'Mặn'],
      channels: ['Can', 'Thận']
    },
    dosageGram: '4.5 - 9g',
    actions: [
      'Bổ thận trợ dương',
      'Cố tinh súc niệu chỉ đới',
      'Đặc trị đái dầm trẻ em'
    ],
    clinicalIndications: [
      'Thận dương hư đái dầm trẻ em tiểu không tự chủ tiểu đêm (Tang Phiêu Tiêu Tán)',
      'Di tinh hoạt tinh liệt dương',
      'Bạch đới khí hư loãng'
    ],
    contraindications: 'Kỵ âm hư hỏa vượng hoặc bàng quang thấp nhiệt tiểu buốt.',
    benskyNotes: 'Dan Bensky: Vừa bổ Thận dương vừa cố sáp bàng quang, thuốc đầu bảng trị đái dầm.'
  },
  {
    id: 'wu-zei-gu',
    vietnameseName: 'Ô tặc cốt (Mai mực / Hải phiêu tiêu)',
    pinyinName: 'Hai Piao Xiao / Wu Zei Gu',
    botanicalName: 'Endoconcha Sepiae',
    chineseCharacters: '烏賊骨',
    category: '13. Thuốc Cố Sáp (Stabilize and Bind)',
    properties: {
      nature: 'Hơi ôn',
      flavors: ['Mặn', 'Chát'],
      channels: ['Can', 'Thận', 'Vị']
    },
    dosageGram: '6 - 12g (Tán bột 1.5 - 3g)',
    actions: [
      'Thu liễm chỉ huyết cầm máu',
      'Chế toan chỉ thống (Trung hòa acid dịch vị dạ dày)',
      'Cố tinh chỉ đới và thu thấp liền loét'
    ],
    clinicalIndications: [
      'Viêm loét dạ dày tá tràng ợ chua nóng rát xuất huyết tiêu hóa (Ô Bối Tán: Ô tặc cốt + Triết bối mẫu)',
      'Băng lậu rong huyết chảy máu cam vết thương chảy máu',
      'Di tinh bạch đới, loét da chảy nước vàng'
    ],
    contraindications: 'Dùng lâu ngày có thể gây táo bón nên phối thêm vị nhuận.',
    benskyNotes: 'Dan Bensky: Giàu Calcium carbonate và Chitin trung hòa HCl dạ dày và bao phủ ổ loét tức thì.'
  },
  {
    id: 'lac-tien',
    vietnameseName: 'Lạc tiên (Nhãn lồng)',
    pinyinName: 'Xi Fan Lian',
    botanicalName: 'Herba Passiflorae Foetidae',
    chineseCharacters: '西番蓮',
    category: '14. Thuốc An Thần (Calm the Spirit)',
    properties: {
      nature: 'Mát',
      flavors: ['Ngọt', 'Hơi đắng'],
      channels: ['Tâm', 'Can']
    },
    dosageGram: '15 - 30g',
    actions: [
      'Dưỡng tâm an thần gây ngủ tự nhiên',
      'Thanh can giải nhiệt bình can',
      'Thư giãn cơ trơn giảm hồi hộp lo âu'
    ],
    clinicalIndications: [
      'Mất ngủ khó vào giấc ngủ hay mơ tỉnh giấc giữa đêm',
      'Suy nhược thần kinh tim đập nhanh hồi hộp bứt rứt',
      'Đau đầu chóng mặt nóng trong người'
    ],
    contraindications: 'Không gây quen thuốc hay mệt mỏi khi thức dậy.',
    benskyNotes: 'GS. Đỗ Tất Lợi: Chứa Alcaloid nhóm Harmane và Flavonoid an thần êm dịu, thường phối Lá vông và Tâm sen.'
  },
  {
    id: 'vong-nem',
    vietnameseName: 'Lá vông nem',
    pinyinName: 'Ci Tong Ye',
    botanicalName: 'Folium Erythrinae Variegatae',
    chineseCharacters: '刺桐葉',
    category: '14. Thuốc An Thần (Calm the Spirit)',
    properties: {
      nature: 'Bình',
      flavors: ['Đắng', 'Hơi chát'],
      channels: ['Tâm', 'Can', 'Đại tràng']
    },
    dosageGram: '8 - 16g',
    actions: [
      'Ức chế thần kinh trung ương an thần gây ngủ',
      'Hạ huyết áp nhẹ và trấn tĩnh',
      'Thu liễm sát trùng co búi trĩ'
    ],
    clinicalIndications: [
      'Mất ngủ kinh niên trằn trọc lo âu',
      'Trẻ em đổ mồ hôi trộm quấy khóc đêm',
      'Sa búi trĩ đại tiện ra máu (uống và đắp lá tươi hơ nóng)'
    ],
    contraindications: 'Thận trọng dùng liều quá cao do Alcaloid Erythrin.',
    benskyNotes: 'Dược Điển Việt Nam: Vị thuốc an thần cổ truyền kết hợp Lạc tiên - Lá vông - Tâm sen nổi tiếng Việt Nam.'
  },
  {
    id: 'lian-xin',
    vietnameseName: 'Liên tâm (Tâm sen)',
    pinyinName: 'Lian Zi Xin',
    botanicalName: 'Plumula Nelumbinis',
    chineseCharacters: '蓮子心',
    category: '14. Thuốc An Thần (Calm the Spirit)',
    properties: {
      nature: 'Hàn',
      flavors: ['Đắng'],
      channels: ['Tâm', 'Thận']
    },
    dosageGram: '1.5 - 5g (Sao vàng khử tính hàn)',
    actions: [
      'Thanh tâm hỏa an thần trị mất ngủ',
      'Giao thông Tâm - Thận cố tinh',
      'Hạ huyết áp và chỉ huyết'
    ],
    clinicalIndications: [
      'Tâm hỏa vượng mất ngủ bứt rứt miệng lưỡi lở loét khát nước',
      'Cao huyết áp đánh trống ngực nhịp tim nhanh',
      'Mộng tinh di tinh do tâm hỏa động thận'
    ],
    contraindications: 'Người huyết áp thấp và tỳ vị hư hàn phải sao kỹ và không dùng dài ngày.',
    benskyNotes: 'Dan Bensky: Chứa Nelumbine thanh nhiệt ở Tâm bào và làm giãn mạch vành hạ áp.'
  },
  {
    id: 'fu-shen',
    vietnameseName: 'Phục thần',
    pinyinName: 'Fu Shen',
    botanicalName: 'Sclerotium Poriae Pararadicis',
    chineseCharacters: '茯神',
    category: '14. Thuốc An Thần (Calm the Spirit)',
    properties: {
      nature: 'Bình',
      flavors: ['Ngọt', 'Nhạt'],
      channels: ['Tâm', 'Tỳ']
    },
    dosageGram: '9 - 15g',
    actions: [
      'Ninh tâm an thần định kinh',
      'Kiện tỳ lợi thấp',
      'Cải thiện trí nhớ'
    ],
    clinicalIndications: [
      'Tâm tỳ hư mất ngủ hay quên hồi hộp dễ giật mình kinh sợ',
      'Trẻ em ngủ giật mình khóc đêm',
      'Suy nhược thần kinh ăn kém'
    ],
    contraindications: 'Kỵ thận hư đa niệu.',
    benskyNotes: 'Dan Bensky: Khối nấm Phục linh ôm quanh rễ thông, chuyên đi vào kinh Tâm để an thần mạnh hơn Bạch phục linh.'
  },
  {
    id: 'ci-shi',
    vietnameseName: 'Từ thạch (Đá nam châm)',
    pinyinName: 'Ci Shi',
    botanicalName: 'Magnetitum',
    chineseCharacters: '磁石',
    category: '14. Thuốc An Thần (Calm the Spirit)',
    properties: {
      nature: 'Hàn',
      flavors: ['Mặn'],
      channels: ['Can', 'Tâm', 'Thận']
    },
    dosageGram: '9 - 30g (Đập vụn sắc trước)',
    actions: [
      'Trọng trấn an thần định kinh',
      'Bình can tiềm dương',
      'Thông nhĩ minh mục và nạp khí bình suyễn'
    ],
    clinicalIndications: [
      'Âm hư dương cang hồi hộp mất ngủ chóng mặt ù tai điếc tai mờ mắt (Nhĩ Lung Tả Từ Hoàn)',
      'Cao huyết áp đau đầu giật cơ',
      'Thận bất nạp khí hen suyễn'
    ],
    contraindications: 'Không uống dạng bột nhiều gây nặng bụng khó tiêu.',
    benskyNotes: 'Dan Bensky: Trong khi Chu sa trấn Tâm hỏa ở thượng tiêu thì Từ thạch đi xuống Thận tiềm nạp phù dương.'
  },
  {
    id: 'hu-po',
    vietnameseName: 'Hổ phách',
    pinyinName: 'Hu Po',
    botanicalName: 'Succinum',
    chineseCharacters: '琥珀',
    category: '14. Thuốc An Thần (Calm the Spirit)',
    properties: {
      nature: 'Bình',
      flavors: ['Ngọt'],
      channels: ['Tâm', 'Can', 'Bàng quang']
    },
    dosageGram: '1.5 - 3g (Tán bột uống chiêu nước thuốc, không sắc)',
    actions: [
      'Trấn kinh an thần',
      'Hoạt huyết tán ứ',
      'Lợi niệu thông lâm'
    ],
    clinicalIndications: [
      'Đánh trống ngực mất ngủ kinh phong co giật trẻ em',
      'Bế kinh đau bụng kinh khối máu tụ đau thắt ngực',
      'Sỏi tiết niệu huyết lâm tiểu ra máu đái buốt'
    ],
    contraindications: 'Không sắc trong siêu thuốc vì nhựa thông hóa thạch sẽ tan chảy dính đáy nồi.',
    benskyNotes: 'Dan Bensky: Nhựa thông hóa thạch ngàn năm vừa định thần vừa phá huyết ứ thông niệu đạo.'
  },
  {
    id: 'bing-pian',
    vietnameseName: 'Băng phiến (Long não hương)',
    pinyinName: 'Bing Pian',
    botanicalName: 'Borneolum Syntheticum / Dryobalanops',
    chineseCharacters: '冰片',
    category: '15. Thuốc Phương Hương Khai Khiếu (Open Orifices)',
    properties: {
      nature: 'Hơi hàn',
      flavors: ['Cay', 'Đắng'],
      channels: ['Tâm', 'Tỳ', 'Phế']
    },
    dosageGram: '0.15 - 0.3g (Pha vào thuốc hoàn tán, không sắc)',
    actions: [
      'Khai khiếu tỉnh thần thanh nhiệt',
      'Chỉ thống giảm đau mạch vành',
      'Thanh nhiệt tiêu thũng minh mục sinh cơ (dùng ngoài)'
    ],
    clinicalIndications: [
      'Trúng phong đột quỵ hôn mê sốt cao co giật (An Cung Ngưu Hoàng Hoàn)',
      'Đau thắt ngực nhồi máu cơ tim (Phục Phương Đan Sâm Tức Hiệu Cứu Tâm Hoàn)',
      'Đau mắt đỏ, viêm họng loét miệng, bỏng loét da'
    ],
    contraindications: 'Cấm phụ nữ có thai.',
    benskyNotes: 'Dan Bensky: Tinh thể Borneol giúp các hoạt chất thuốc xuyên qua hàng rào máu não (Blood-Brain Barrier) nhanh gấp nhiều lần.'
  },
  {
    id: 'di-long',
    vietnameseName: 'Địa long (Giun đất chế)',
    pinyinName: 'Di Long',
    botanicalName: 'Pheretima',
    chineseCharacters: '地龍',
    category: '16. Thuốc Bình Can Tức Phong (Extinguish Wind)',
    properties: {
      nature: 'Hàn',
      flavors: ['Mặn'],
      channels: ['Can', 'Tỳ', 'Bàng quang']
    },
    dosageGram: '4.5 - 12g',
    actions: [
      'Thanh nhiệt tức phong định kinh',
      'Thông kinh hoạt lạc tiêu huyết khối',
      'Bình suyễn và lợi niệu hạ huyết áp'
    ],
    clinicalIndications: [
      'Di chứng tai biến mạch máu não liệt nửa người méo miệng (Bổ Dương Hoàn Ngũ Thang)',
      'Sốt cao co giật động kinh, cao huyết áp',
      'Hen phế quản co thắt và viêm khớp nhiệt tý'
    ],
    contraindications: 'Kỵ tỳ vị hư hàn.',
    benskyNotes: 'Dan Bensky: Chứa enzyme Lumbrokinase làm tan sợi huyết (Fibrinolytic) thông tắc mạch máu não sau đột quỵ.'
  },
  {
    id: 'quan-xie',
    vietnameseName: 'Toàn yết (Bọ cạp chế)',
    pinyinName: 'Quan Xie',
    botanicalName: 'Scorpio',
    chineseCharacters: '全蠍',
    category: '16. Thuốc Bình Can Tức Phong (Extinguish Wind)',
    properties: {
      nature: 'Bình (Có độc)',
      flavors: ['Cay'],
      channels: ['Can']
    },
    dosageGram: '3 - 6g (Tán bột 0.6 - 1g)',
    actions: [
      'Tức phong trấn kinh chống co giật cực mạnh',
      'Thông lạc chỉ thống',
      'Công độc tán kết'
    ],
    clinicalIndications: [
      'Co giật kinh phong uốn ván, động kinh, liệt dây thần kinh mặt số VII (Khiên Chính Tán)',
      'Đau nửa đầu Migraine ngoan cố, đau dây thần kinh tam thoa',
      'Viêm khớp dạng thấp biến dạng khớp'
    ],
    contraindications: 'Cấm phụ nữ có thai và huyết hư sinh phong.',
    benskyNotes: 'Dan Bensky: Thuốc côn trùng sưu phong thông lạc đi vào những nhánh lạc mạch sâu nhất mà thảo mộc không tới được.'
  },
  {
    id: 'wu-gong',
    vietnameseName: 'Ngô công (Rết chế)',
    pinyinName: 'Wu Gong',
    botanicalName: 'Scolopendra',
    chineseCharacters: '蜈蚣',
    category: '16. Thuốc Bình Can Tức Phong (Extinguish Wind)',
    properties: {
      nature: 'Ôn (Có độc)',
      flavors: ['Cay'],
      channels: ['Can']
    },
    dosageGram: '1 - 3 con (1 - 3g, bỏ đầu chân nướng)',
    actions: [
      'Tức phong trấn kinh chống co giật',
      'Thông lạc chỉ thống',
      'Công độc tán kết tiêu u'
    ],
    clinicalIndications: [
      'Co giật uốn ván động kinh liệt mặt méo miệng (phối Toàn yết)',
      'Đau đầu kinh niên không dứt, đau khớp ngoan cố',
      'Hạch lao rắn cắn ung nhọt độc'
    ],
    contraindications: 'Cấm tuyệt đối phụ nữ có thai.',
    benskyNotes: 'Dan Bensky: Phối Toàn yết thành cặp Chỉ Kinh Tán làm tăng hiệu lực chống co giật và giảm đau thần kinh gấp bội.'
  },
  {
    id: 'bai-jiang-can',
    vietnameseName: 'Bạch cương tàm (Tằm vôi)',
    pinyinName: 'Bai Jiang Can',
    botanicalName: 'Bombyx Batryticatus',
    chineseCharacters: '白殭蠶',
    category: '16. Thuốc Bình Can Tức Phong (Extinguish Wind)',
    properties: {
      nature: 'Bình',
      flavors: ['Mặn', 'Cay'],
      channels: ['Can', 'Phế', 'Vị']
    },
    dosageGram: '3 - 10g',
    actions: [
      'Tức phong chỉ kinh hóa đờm',
      'Khứ phong chỉ thống lợi hầu họng',
      'Chỉ ngứa và tán kết hạch'
    ],
    clinicalIndications: [
      'Liệt mặt ngoại biên méo miệng mắt nhắm không kín (Khiên Chính Tán: Bạch phụ tử - Bạch cương tàm - Toàn yết)',
      'Trẻ em kinh phong co giật đờm khò khè',
      'Viêm họng sưng đau mất tiếng, mề đay ngứa da, hạch cổ'
    ],
    contraindications: 'Thận trọng ở người dị ứng protein tằm.',
    benskyNotes: 'Dan Bensky: Vừa trừ nội phong vừa tán ngoại phong kèm hóa đờm kết.'
  },
  {
    id: 'dai-zhe-shi',
    vietnameseName: 'Đại giả thạch',
    pinyinName: 'Dai Zhe Shi',
    botanicalName: 'Haematitum',
    chineseCharacters: '代赭石',
    category: '16. Thuốc Bình Can Tức Phong (Extinguish Wind)',
    properties: {
      nature: 'Hàn',
      flavors: ['Đắng'],
      channels: ['Can', 'Tâm', 'Vị', 'Phế']
    },
    dosageGram: '9 - 30g (Đập vụn sắc trước)',
    actions: [
      'Bình can tiềm dương hạ huyết áp',
      'Trọng trấn giáng nghịch (cầm nôn, cầm nấc, bình suyễn)',
      'Lương huyết chỉ huyết'
    ],
    clinicalIndications: [
      'Can dương thượng kháng tăng huyết áp đau đầu chóng mặt ù tai (Trấn Can Tức Phong Thang)',
      'Vị khí thượng nghịch nôn mửa ợ hơi nấc cụt không dứt (Toàn Phúc Đại Giả Thang)',
      'Huyết nhiệt thổ huyết chảy máu cam'
    ],
    contraindications: 'Cấm phụ nữ có thai.',
    benskyNotes: 'Dan Bensky: Giàu Fe2O3 trấn áp khí nghịch của Can Vị Phế đi xuống cực kỳ vững chắc.'
  },
  {
    id: 'nam-qua-tu',
    vietnameseName: 'Nam qua tử (Hạt bí ngô)',
    pinyinName: 'Nan Gua Zi',
    botanicalName: 'Semen Cucurbitae',
    chineseCharacters: '南瓜子',
    category: '17. Thuốc Khu Trùng (Expel Parasites)',
    properties: {
      nature: 'Bình',
      flavors: ['Ngọt'],
      channels: ['Vị', 'Đại tràng']
    },
    dosageGram: '60 - 120g (Ăn cả nhân lúc đói)',
    actions: [
      'Sát trùng đặc trị sán dây (Sán xơ mít)',
      'Hoạt động hiệp đồng cùng Binh lang',
      'Bảo vệ tuyến tiền liệt và lợi sữa'
    ],
    clinicalIndications: [
      'Nhiễm sán dây bò, sán dây lợn (Ăn Hạt bí ngô trước để làm liệt phần đầu sán, 2 giờ sau uống nước sắc Binh lang làm liệt thân sán rồi uống Mang tiêu sổ ra nguyên con)',
      'Phì đại lành tính tuyến tiền liệt tiểu khó',
      'Sản phụ thiếu sữa'
    ],
    contraindications: 'Hoàn toàn không độc, dùng được cho phụ nữ có thai và trẻ nhỏ.',
    benskyNotes: 'Dan Bensky: Hoạt chất Cucurbitine làm tê liệt giác bám của đầu sán dây vào thành ruột.'
  },
  {
    id: 'liu-huang',
    vietnameseName: 'Lưu hoàng (Diêm sinh chế)',
    pinyinName: 'Liu Huang',
    botanicalName: 'Sulfur',
    chineseCharacters: '硫黃',
    category: '18. Thuốc Dùng Ngoài / Ngoại Khoa (Topical)',
    properties: {
      nature: 'Nhiệt (Có độc)',
      flavors: ['Chua'],
      channels: ['Thận', 'Đại tràng']
    },
    dosageGram: '1 - 3g (Dùng ngoài lượng vừa đủ)',
    actions: [
      'Giải độc sát trùng chỉ ngứa đặc trị ghẻ lở nấm da',
      'Bổ hỏa trợ dương thông tiện (dùng trong)',
      'Tiêu mụn trứng cá viêm nang lông'
    ],
    clinicalIndications: [
      'Bệnh ghẻ (Scabies), hắc lào, lang ben, viêm da tiết bã (bôi ngoài)',
      'Mệnh môn hỏa suy liệt dương hen suyễn lạnh chân tay',
      'Táo bón do hư hàn ở người già (Bán Lưu Hoàn: Bán hạ + Lưu hoàng)'
    ],
    contraindications: 'Cấm phụ nữ có thai và âm hư hỏa vượng.',
    benskyNotes: 'Dan Bensky: Phải nấu với đậu phụ (Chế lưu hoàng) trước khi dùng đường uống.'
  },
  {
    id: 'bai-fan',
    vietnameseName: 'Bạch phàn (Phèn chua / Khô phàn)',
    pinyinName: 'Bai Fan / Ku Fan',
    botanicalName: 'Alumen',
    chineseCharacters: '白礬',
    category: '18. Thuốc Dùng Ngoài / Ngoại Khoa (Topical)',
    properties: {
      nature: 'Hàn',
      flavors: ['Chua', 'Chát'],
      channels: ['Phế', 'Can', 'Tỳ', 'Đại tràng']
    },
    dosageGram: '0.6 - 1.5g (Dùng ngoài không kể liều)',
    actions: [
      'Giải độc sát trùng táo thấp chỉ ngứa (dùng ngoài)',
      'Chỉ huyết chỉ tả (dùng trong)',
      'Khử đờm nhiệt khai khiếu'
    ],
    clinicalIndications: [
      'Nấm kẽ chân, nước ăn chân, eczema chảy nước, viêm tai giữa chảy mủ, viêm âm đạo (rửa ngoài hoặc rắc bột Khô phàn)',
      'Chảy máu cam, loét miệng, sa trực tràng',
      'Đờm nhiệt động kinh điên cuồng'
    ],
    contraindications: 'Không uống quá liều gây kích ứng dạ dày.',
    benskyNotes: 'Dan Bensky: Nung cạn nước kết tinh thành Khô phàn giúp hút dịch mủ và làm khô vết loét cực nhanh.'
  },
  {
    id: 'peng-sha',
    vietnameseName: 'Bằng sa (Hàn the dược dụng)',
    pinyinName: 'Peng Sha',
    botanicalName: 'Borax',
    chineseCharacters: '硼砂',
    category: '18. Thuốc Dùng Ngoài / Ngoại Khoa (Topical)',
    properties: {
      nature: 'Lương',
      flavors: ['Ngọt', 'Mặn'],
      channels: ['Phế', 'Vị']
    },
    dosageGram: 'Chỉ dùng ngoài thổi họng hoặc súc miệng',
    actions: [
      'Thanh nhiệt giải độc tiêu thũng',
      'Sát khuẩn niêm mạc miệng họng',
      'Hóa đờm khai âm'
    ],
    clinicalIndications: [
      'Viêm họng cấp sưng đau, viêm amidan, nhiệt miệng loét lợi (Băng Bằng Tán: Băng phiến + Bằng sa + Chu sa + Huyền minh phấn thổi vào họng)',
      'Tưa lưỡi nấm miệng trẻ em',
      'Đau mắt đỏ'
    ],
    contraindications: 'Chỉ dùng ngoài niêm mạc hoặc súc miệng nhổ đi, không uống trong.',
    benskyNotes: 'Dan Bensky: Chủ vị bài Băng Bằng Tán thổi họng kinh điển trị viêm loét miệng họng cấp tính.'
  }
];


