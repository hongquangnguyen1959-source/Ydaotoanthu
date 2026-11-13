import React, { useState } from 'react';
import { Herb } from '../data/herbalMateria';
import { HERB_EXACT_PHOTOS } from '../data/herbExactPhotos';

export interface HerbVisualSpec {
  imageUrl: string;
  speciesPhotoUrl: string;
  taxonName: string;
  partLabel: string;
  processingNote: string;
  hasExactSlicePhoto: boolean;
}

interface SpecimenGroup {
  file: string;
  partLabel: string;
  processingNote: string;
  ids: string[];
}

const SPECIMEN_GROUPS: SpecimenGroup[] = [
  {
    file: 'pale_sliced_roots.jpg',
    partLabel: 'Hoàng Kỳ & Rễ Thái Phiến Vàng Nhạt',
    processingNote: 'Rễ củ thái vát dài phơi khô hoặc chích mật ong chuẩn Bensky',
    ids: ['huang-qi', 'ku-shen', 'ban-lan-gen', 'shan-dou-gen', 'niu-xi']
  },
  {
    file: 'licorice_gancao.jpg',
    partLabel: 'Cam Thảo Phiến (Lát Cắt Rễ Cam Thảo Vỏ Đỏ Ruột Vàng)',
    processingNote: 'Rễ Cam thảo thái lát dày vỏ nâu đỏ ruột vàng tươi vân tia cúc hoa tâm, dùng sống hoặc chích mật',
    ids: ['gan-cao']
  },
  {
    file: 'codonopsis_dangshen.jpg',
    partLabel: 'Đảng Sâm (Đoạn Rễ Củ Nhăn Dài Vàng Nâu)',
    processingNote: 'Rễ Đảng sâm phơi khô có nếp nhăn ngang đầu sư tử cắt đoạn 3-4cm kiện tỳ ích phế',
    ids: ['dang-shen']
  },
  {
    file: 'whole_ginseng_roots.jpg',
    partLabel: 'Nhân Sâm & Sâm Củ Nguyên Bản',
    processingNote: 'Rễ sâm nguyên củ kèm rễ phụ giàu Saponin Ginsenoside',
    ids: ['ren-shen', 'xi-yang-shen', 'tai-zi-shen', 'dinh-lang']
  },
  {
    file: 'notoginseng_sanqi.jpg',
    partLabel: 'Tam Thất Bắc (Củ Tam Thất Hình Con Quay & Lát Cắt)',
    processingNote: 'Củ cái Tam thất bắc vỏ xám nâu có u sần (đầu tam thất), ruột xanh vàng tán ứ chỉ huyết',
    ids: ['san-qi']
  },
  {
    file: 'sliced_angelica_peony.jpg',
    partLabel: 'Đương Quy & Bạch Thược (Phiến Rễ Bổ Huyết)',
    processingNote: 'Rễ củ thái lát mỏng trắng ngà giàu tinh dầu thơm dưỡng huyết nhu can',
    ids: ['dang-gui', 'bai-shao', 'du-huo', 'tien-ho', 'jie-geng', 'yuan-zhi', 'phong-ky']
  },
  {
    file: 'atractylodes_baizhu.jpg',
    partLabel: 'Bạch Truật Phiến (Lát Cắt Thân Rễ Bạch Truật Vân Điểm Dầu)',
    processingNote: 'Thân rễ Bạch truật thái lát dày hình đám mây màu trắng ngà điểm chấm tinh dầu nâu sao cám kiện tỳ',
    ids: ['bai-zhu']
  },
  {
    file: 'golden_yellow_rhizomes.jpg',
    partLabel: 'Hoàng Liên & Thân Rễ Vàng (Rhizoma)',
    processingNote: 'Thân rễ sắc vàng cam thái lát giàu Berberine / Curcumin / Tinh dầu ấm',
    ids: ['huang-lian', 'yu-jin', 'nga-truat', 'gao-liang-jiang']
  },
  {
    file: 'scutellaria_huangqin.jpg',
    partLabel: 'Hoàng Cầm Phiến (Lát Rễ Vàng Nâu Giữa Rỗng Khô Cầm)',
    processingNote: 'Rễ Hoàng cầm thái vát dài màu vàng sẫm có lõi giữa nâu đen (khô cầm) tẩm rượu sao thanh Phế hỏa',
    ids: ['huang-qin']
  },
  {
    file: 'rhubarb_dahuang.jpg',
    partLabel: 'Đại Hoàng Phiến (Phiến Củ Đại Hoàng Vân Cẩm Thạch Sao Điểm)',
    processingNote: 'Thân rễ Đại hoàng thái phiến to màu cam nâu nổi vân trắng hình sao (cẩm văn) tả hạ công tích',
    ids: ['da-huang']
  },
  {
    file: 'dried_ginger_ganjiang.jpg',
    partLabel: 'Can Khương (Củ Gừng Già Phơi Khô Trắng Phấn)',
    processingNote: 'Thân rễ gừng già phơi khô mặt cắt trắng vàng nhiều bột cay ấm ôn trung hồi dương',
    ids: ['gan-jiang']
  },
  {
    file: 'turmeric_jianghuang.jpg',
    partLabel: 'Khương Hoàng Phiến (Lát Cắt Củ Nghệ Vàng Đậm)',
    processingNote: 'Thân rễ Khương hoàng thái lát màu vàng cam sẫm có vòng đồng tâm phá huyết hành khí thông kinh',
    ids: ['jiang-huang']
  },
  {
    file: 'corydalis_dienhosach.jpg',
    partLabel: 'Diên Hồ Sách (Thân Củ Tròn Vàng Sao Giấm Hành Khí Chỉ Thống)',
    processingNote: 'Thân củ hình cầu dẹt màu vàng nâu mặt cắt vàng sáp chế giấm tăng tác dụng giảm đau',
    ids: ['dien-ho-sach']
  },
  {
    file: 'dark_black_cured_roots.jpg',
    partLabel: 'Thục Địa, Sinh Địa & Huyền Sâm (Rễ Củ Cửu Chưng Đen Nâu)',
    processingNote: 'Chưng chế rượu / sa nhân (Cửu chưng cửu sái) đen bóng tư bổ Can Thận dưỡng âm',
    ids: ['shu-di-huang', 'sheng-di-huang', 'xuan-shen', 'huang-jing']
  },
  {
    file: 'cured_heshouwu.jpg',
    partLabel: 'Hà Thủ Ô Đỏ Chế (Miếng Củ Cửu Chưng Đậu Đen Nâu Đen)',
    processingNote: 'Củ Hà thủ ô đỏ nấu cùng nước đậu đen 9 lần thái miếng vuông đen bóng bổ can thận đen tóc',
    ids: ['he-shou-wu']
  },
  {
    file: 'aconite_fuzi.jpg',
    partLabel: 'Hắc Phụ Tử Phiến (Lát Phụ Tử Chế Hình Tam Giác Có Sừng)',
    processingNote: 'Củ con Ô đầu bào chế muối diêm tiêu thái lát mỏng hình tam giác nâu xám hồi dương cứu nghịch',
    ids: ['fu-zi']
  },
  {
    file: 'cistanche_roucongrong.jpg',
    partLabel: 'Nhục Thung Dung Phiến (Lát Thân Thịt Nâu Đen Vân Chấm Sóng)',
    processingNote: 'Thân thịt có vảy chưng rượu thái lát dày lộ vòng bó mạch lượn sóng ôn thận ích tinh nhuận tràng',
    ids: ['rou-cong-rong']
  },
  {
    file: 'white_yam_slices.jpg',
    partLabel: 'Hoài Sơn & Thiên Hoa Phấn (Củ Trắng Phấn Mịn)',
    processingNote: 'Củ gọt vỏ thái lát trắng tinh giàu tinh bột và chất nhầy bổ tỳ phế thận sinh tân',
    ids: ['shan-yao', 'tian-hua-fen']
  },
  {
    file: 'kudzu_gegen.jpg',
    partLabel: 'Cát Căn Đinh (Khối Củ Sắn Dây Thái Vuông Trắng Xơ)',
    processingNote: 'Củ sắn dây gọt vỏ cắt khối vuông trắng phấn nhiều xơ giải cơ thoái nhiệt sinh tân thấu chẩn',
    ids: ['ge-gen']
  },
  {
    file: 'angelica_baizhi.jpg',
    partLabel: 'Bạch Chỉ Phiến (Lát Cắt Tròn Trắng Có Vòng Điểm Tinh Dầu)',
    processingNote: 'Rễ Bạch chỉ thái lát tròn trắng tinh có vòng chấm tuyến dầu màu nâu giải biểu thông khiếu chỉ thống',
    ids: ['bai-zhi']
  },
  {
    file: 'lily_bulb_baihe.jpg',
    partLabel: 'Bách Hợp (Vảy Hành Trắng Ngà Hình Thuyền Nhuận Phế An Thần)',
    processingNote: 'Vảy thân hành Bách hợp tách rời phơi khô cong hình thuyền trắng ngà bán trong suốt dưỡng âm thanh tâm',
    ids: ['bai-he']
  },
  {
    file: 'white_fritillaria_bulbs.jpg',
    partLabel: 'Lân Kinh (Thân Hành Bối Mẫu Trắng)',
    processingNote: 'Thân hành trắng hình ôm quả tim (Hoài trung bão nguyệt) thanh phế hóa đờm',
    ids: ['chuan-bei-mu', 'zhe-bei-mu']
  },
  {
    file: 'white_pinellia_tubers.jpg',
    partLabel: 'Khối Củ Tròn Trắng (Bán Hạ / Thiên Nam Tinh / Bạch Cập)',
    processingNote: 'Thân củ bóc vỏ bào chế gừng/phèn chua khử độc táo thấp hóa đờm',
    ids: ['ban-xia', 'tian-nan-xing', 'bach-cap']
  },
  {
    file: 'gastrodia_tianma.jpg',
    partLabel: 'Thiên Ma Phiến (Lát Thân Củ Vàng Trong Như Sừng)',
    processingNote: 'Củ Thiên ma đồ chín thái lát mỏng bầu dục bán trong suốt như sừng bình can tức phong định kinh',
    ids: ['tian-ma']
  },
  {
    file: 'translucent_ophiopogon_tubers.jpg',
    partLabel: 'Củ Hình Thoi Trong Mờ (Dưỡng Âm Nhuận Phế)',
    processingNote: 'Rễ củ hình thoi dẻo màu vàng ngà bán trong suốt tư âm sinh tân',
    ids: ['mai-men-dong', 'tian-men-dong', 'bei-sha-shen', 'yu-zhu', 'bai-bu']
  },
  {
    file: 'red_salvia_roots.jpg',
    partLabel: 'Hồng Căn (Rễ Nâu Đỏ Hoạt Huyết / Bổ Thận)',
    processingNote: 'Đoạn rễ vỏ nâu đỏ hoặc tím sẫm rút lõi, sao rượu thông huyết mạch',
    ids: ['dan-shen', 'chi-shao', 'zi-cao', 'di-yu', 'tuc-doan', 'ba-ji-tian']
  },
  {
    file: 'gnarled_chuanxiong_slices.jpg',
    partLabel: 'Phiến Thân Rễ Vân Xoắn (Xuyên Khung / Thương Truật)',
    processingNote: 'Thân rễ thái lát vân hoa cúc / cánh bướm giàu tinh dầu khu phong hành khí',
    ids: ['chuan-xiong', 'cang-zhu', 'gao-ben', 'tu-fu-ling', 'ty-giai', 'o-duoc', 'tam-lang', 'ze-xie']
  },
  {
    file: 'fangfeng_root.jpg',
    partLabel: 'Phòng Phong Phiến (Rễ Nhăn Xám Nâu Vân Cúc Hoa Tâm)',
    processingNote: 'Rễ Phòng phong vỏ nâu xám có vân ngang (đầu sâu róm), mặt cắt trắng vàng nổi vân tia cúc hoa tâm đặc trưng trừ phong giải biểu',
    ids: ['fang-feng']
  },
  {
    file: 'qianghuo_rhizome.jpg',
    partLabel: 'Khương Hoạt (Thân Rễ Đốt Tằm Khương Nâu Đen Có Điểm Chu Sa)',
    processingNote: 'Thân rễ Khương hoạt đốt vòng dày giống con tằm (tằm khương), lát cắt vỏ nâu cam lộ nhiều điểm tinh dầu đỏ (chu sa điểm) khu phong thắng thấp',
    ids: ['qiang-huo']
  },
  {
    file: 'fibrous_cyperus_rhizomes.jpg',
    partLabel: 'Thân Rễ & Rễ Nâu Sơ Can / Trừ Phong',
    processingNote: 'Thân rễ cắt lát xéo phơi khô hoặc tứ chế giấm/rượu/muối',
    ids: ['chai-hu', 'xiang-fu', 'mu-xiang', 'sheng-ma', 'zhi-mu', 'cot-toai-bo', 'tan-giao', 'wei-ling-xian', 'long-dan-cao', 'xi-xin', 'shi-chang-pu', 'qian-nian-jian', 'lu-gen', 'she-gan', 'gan-sui', 'bai-tou-weng', 'tu-uyen', 'bai-wei', 'xian-mao']
  },
  {
    file: 'golden_cibotium_rhizome.jpg',
    partLabel: 'Thân Rễ Cẩu Tích (Lông Cu Li Vàng Kim)',
    processingNote: 'Thân rễ phủ lớp lông tơ vàng óng, cạo lông thái phiến bổ can thận mạnh lưng',
    ids: ['gou-ji']
  },
  {
    file: 'dark_perilla_leaves.jpg',
    partLabel: 'Tử Tô Diệp (Lá Tía Tô Tím)',
    processingNote: 'Lá mép khía răng cưa màu tím lục phơi âm can giữ tinh dầu Perillaldehyde',
    ids: ['zi-su-ye']
  },
  {
    file: 'cut_green_mint_mulberry.jpg',
    partLabel: 'Lá Thuốc Khô Xanh (Tang Diệp / Bạc Hà / Phan Tả Diệp)',
    processingNote: 'Lá bánh tẻ thu hái phơi râm giữ nguyên màu xanh diệp lục và hoạt chất',
    ids: ['bo-he', 'sang-ye', 'phan-ta-diep', 'vong-nem', 'trinh-nu-hoang-cung', 'xa-den']
  },
  {
    file: 'cut_bamboo_lotus_leaves.jpg',
    partLabel: 'Diệp Phiến Cắt Đoạn (Trúc Diệp / Tỳ Bà Diệp / Trắc Bách)',
    processingNote: 'Lá xanh cắt đoạn chải sạch lông tơ thanh phế lương huyết',
    ids: ['dan-zhu-ye', 'trac-bach-diep', 'pi-pa-ye', 'actiso']
  },
  {
    file: 'silvery_mugwort_leaves.jpg',
    partLabel: 'Ngải Diệp (Lá Ngải Cứu Lông Trắng Bạc)',
    processingNote: 'Lá ngải cứu khô mặt dưới phủ lông nhung trắng bạc ôn kinh chỉ huyết',
    ids: ['ngai-diep']
  },
  {
    file: 'green_ephedra_stems.jpg',
    partLabel: 'Thảo Ma Hoàng & Thân Đốt Tròn Mảnh',
    processingNote: 'Thân thảo hình trụ có đốt cắt đoạn 2-3cm phát hãn tuyên phế lợi thủy',
    ids: ['ma-huang', 'mu-zei']
  },
  {
    file: 'white_pith_thongthao.jpg',
    partLabel: 'Thông Thảo Phiến (Lõi Thân Trắng Xốp Thái Lát)',
    processingNote: 'Lõi thân cây Thông thảo trắng tinh xốp nhẹ thái lát tròn thanh nhiệt lợi niệu thông sữa',
    ids: ['thong-thao']
  },
  {
    file: 'broad_leaf_herbs.jpg',
    partLabel: 'Thảo Dược Lá Rộng (Dâm Dương Hoắc / Hoắc Hương)',
    processingNote: 'Thân lá trên mặt đất thu hái lúc đang hoa, phơi khô hoặc sao mỡ dê',
    ids: ['yin-yang-huo', 'huo-xiang', 'pei-lan', 'hy-thiem', 'ca-gai-leo']
  },
  {
    file: 'cut_stem_herbs.jpg',
    partLabel: 'Toàn Thảo Cắt Khúc (Herba Thanh Nhiệt / Giải Biểu)',
    processingNote: 'Toàn cây trên mặt đất cắt khúc phơi khô chuẩn Dược điển Bensky',
    ids: ['jing-jie', 'xiang-ru', 'yi-mu-cao', 'pu-gong-ying', 'zi-hua-di-ding', 'chuan-xin-lian', 'yu-xing-cao', 'yin-chen-hao', 'qing-hao', 'xian-he-cao', 'da-ji-thao', 'xiao-ji', 'lac-tien', 'rau-meo']
  },
  {
    file: 'prunella_spica_xiakucao.jpg',
    partLabel: 'Hạ Khô Thảo (Cụm Hoa Bông Khô Nâu Đỏ Thanh Can Tán Kết)',
    processingNote: 'Cụm hoa hình bông (Spica Prunellae) thu hái mùa hạ lúc chuyển nâu đỏ thanh can hỏa tán uất kết',
    ids: ['xia-ku-cao']
  },
  {
    file: 'small_leaf_herbs.jpg',
    partLabel: 'Thảo Dược Lá Nhỏ (Kim Tiền Thảo / Diệp Hạ Châu / Bạch Hoa Xà)',
    processingNote: 'Thảo mộc thân mảnh lá nhỏ thanh nhiệt giải độc lợi niệu bài thạch',
    ids: ['jin-qian-cao', 'diep-ha-chau', 'bai-hua-she-she-cao', 'ban-bian-lian', 'ban-zhi-lian', 'bien-suc', 'han-lien-thao']
  },
  {
    file: 'dried_duckweed_fuping.jpg',
    partLabel: 'Phù Bình (Cánh Bèo Tấm Khô Xanh Lục)',
    processingNote: 'Toàn cây bèo tấm vớt mùa hạ phơi khô mặt trên xanh mặt dưới tím phát hãn hành thủy',
    ids: ['fu-ping']
  },
  {
    file: 'cinnamon_twigs.jpg',
    partLabel: 'Quế Chi (Cành Quế Non Thơm Ấm)',
    processingNote: 'Cành quế non phơi khô giàu Cinnamaldehyde ôn thông kinh mạch',
    ids: ['gui-zhi']
  },
  {
    file: 'woody_liana_slices.jpg',
    partLabel: 'Đằng Mộc Phiến (Lát Cắt Dây Đằng Vân Đồng Tâm)',
    processingNote: 'Thân dây leo cổ thụ thái lát tròn lộ vân vòng đồng tâm đỏ nâu thông lạc',
    ids: ['ke-huyet-dang', 'day-dau-xuong', 'da-giao-dang', 'hai-feng-teng', 'luo-shi-teng']
  },
  {
    file: 'cut_woody_twigs.jpg',
    partLabel: 'Chi Mộc (Cành Dâu Tang Chi / Tang Ký Sinh / Tây Hà Liễu)',
    processingNote: 'Cành gỗ thái vát phơi khô khu phong thông lạc lợi khớp',
    ids: ['tang-chi', 'sang-ji-sheng', 'xi-he-liu']
  },
  {
    file: 'dendrobium_shihu.jpg',
    partLabel: 'Thạch Hộc (Thân Lan Hoàng Thảo Rãnh Vàng & Phong Đấu Tư Âm)',
    processingNote: 'Thân lan Thạch hộc phơi khô rãnh dọc vàng xanh hoặc quấn lò xo (Phong đấu thạch hộc) tư âm ích vị sinh tân',
    ids: ['shi-hu']
  },
  {
    file: 'hooked_uncaria_gouteng.jpg',
    partLabel: 'Câu Đằng (Đoạn Cành Có Gai Móc Câu Đối Xứng)',
    processingNote: 'Đoạn thân cành màu nâu đỏ có 2 gai cong hình lưỡi câu bình can tức phong định kinh',
    ids: ['gou-teng']
  },
  {
    file: 'bamboo_shavings_trucnhu.jpg',
    partLabel: 'Trúc Nhự (Phoi Bào Lớp Giữa Thân Tre Xanh Vàng)',
    processingNote: 'Lớp mô giữa thân tre cạo vỏ xanh bào thành sợi mỏng thanh nhiệt hóa đờm chỉ ẩu',
    ids: ['truc-nhu']
  },
  {
    file: 'corn_silk_yumixu.jpg',
    partLabel: 'Râu Ngô / Ngọc Mễ Tu (Sợi Vòi Nhụy Khô Vàng Nâu Lợi Thủy)',
    processingNote: 'Vòi nhụy hoa cái cây ngô (Stigma Maydis) thu hái phơi râm giữ sợi mềm lợi thủy tiêu thũng lợi đởm',
    ids: ['yu-mi-xu']
  },
  {
    file: 'red_sappan_wood_sumu.jpg',
    partLabel: 'Tô Mộc (Lõi Gỗ Vang Thái Dải Đỏ Cam)',
    processingNote: 'Lõi gỗ cây Tô mộc chẻ mỏng màu đỏ cam hoạt huyết khứ ứ tiêu sưng giảm đau',
    ids: ['su-mu']
  },
  {
    file: 'dark_agarwood_tramhuong.jpg',
    partLabel: 'Trầm Hương (Khối Gỗ Trầm Nhiều Dầu Nâu Đen)',
    processingNote: 'Gỗ chứa nhựa thơm màu nâu đen bóng giáng khí ôn trung nạp thận bình suyễn',
    ids: ['tram-huong']
  },
  {
    file: 'curved_dark_bark.jpg',
    partLabel: 'Bì Dược Cuộn Ống (Đỗ Trọng / Hậu Phác / Địa Cốt Bì)',
    processingNote: 'Vỏ thân và vỏ rễ cuộn ống màu nâu sẫm, cạo vỏ bần sao tẩm muối/gừng',
    ids: ['du-zhong', 'hou-po', 'di-gu-pi', 'ngu-gia-bi']
  },
  {
    file: 'moutan_bark_mudanpi.jpg',
    partLabel: 'Mẫu Đơn Bì (Vỏ Rễ Mẫu Đơn Cuộn Ống Lòng Trắng Phấn)',
    processingNote: 'Vỏ rễ cây Mẫu đơn rút lõi gỗ cuộn ống vỏ ngoài xám nâu mặt trong trắng hồng thanh huyết nhiệt tán ứ',
    ids: ['mu-dan-pi']
  },
  {
    file: 'rough_tree_bark.jpg',
    partLabel: 'Mộc Bì (Vỏ Thân Cây Hoàng Bá / Tần Bì / Hợp Hoan Bì)',
    processingNote: 'Vỏ cây dày xù xì thái dải thanh nhiệt táo thấp hoặc giải uất an thần',
    ids: ['huang-bai', 'qin-pi', 'hop-hoan-bi', 'hai-tong-pi']
  },
  {
    file: 'areca_peel_daiphucbi.jpg',
    partLabel: 'Đại Phúc Bì (Xơ Vỏ Quả Cau Vàng Nâu Hạ Khí Hành Thủy)',
    processingNote: 'Vỏ quả cau già xé tơi phơi khô thành bó sợi vàng nâu hành khí khoan trung hạ khí lợi thủy tiêu thũng',
    ids: ['dai-phuc-bi']
  },
  {
    file: 'smooth_cinnamon_bark.jpg',
    partLabel: 'Nhục Quế & Tang Bạch Bì (Vỏ Quế / Vỏ Rễ Dâu)',
    processingNote: 'Vỏ thân quế dày nhiều dầu hoặc vỏ trắng rễ dâu tằm cạo sạch lớp bần',
    ids: ['rou-gui', 'tang-bach-bi']
  },
  {
    file: 'honeysuckle_flower_buds.jpg',
    partLabel: 'Kim Ngân Hoa (Nụ Hoa Kim Ngân Sấy Khô Thanh Nhiệt)',
    processingNote: 'Nụ hoa Kim ngân thu hái lúc chớm nở sấy nhẹ giữ nguyên tinh dầu và Chlorogenic acid',
    ids: ['jin-yin-hua']
  },
  {
    file: 'magnolia_bud_xinyi.jpg',
    partLabel: 'Tân Di Hoa (Nụ Hoa Mộc Lan Phủ Lông Bạc Như Bút Lông)',
    processingNote: 'Nụ hoa Tân di hình đầu bút lông phủ lớp lông tơ trắng bạc tán phong hàn thông tỷ khiếu',
    ids: ['xin-yi']
  },
  {
    file: 'sophora_bud_hoahoe.jpg',
    partLabel: 'Hòe Hoa / Hòe Mễ (Nụ Hoa Hòe Xanh Vàng Giàu Rutin)',
    processingNote: 'Nụ hoa Hòe chưa nở phơi khô hoặc sao cháy (Hòe hoa thán) lương huyết chỉ huyết hạ áp',
    ids: ['hoa-hoe']
  },
  {
    file: 'lotus_plumule_lianxin.jpg',
    partLabel: 'Liên Tâm / Tâm Sen (Mầm Xanh Giữa Hạt Sen Thanh Tâm Hỏa)',
    processingNote: 'Chồi mầm màu lục sẫm lấy từ giữa hạt sen già phơi khô thanh tâm khứ nhiệt an thần',
    ids: ['lian-xin']
  },
  {
    file: 'coltsfoot_khoandonghoa.jpg',
    partLabel: 'Khoản Đông Hoa (Nụ Hoa Tím Hồng Chích Mật Nhuận Phế)',
    processingNote: 'Nụ hoa Khoản đông hình chùy màu tím hồng có vảy bắc và tơ trắng chích mật chỉ khái hóa đờm',
    ids: ['khoan-dong-hoa']
  },
  {
    file: 'chrysanthemum_flowers.jpg',
    partLabel: 'Hoa Cúc & Cụm Hoa Vàng Trắng (Cúc Hoa / Toàn Phúc Hoa)',
    processingNote: 'Đầu hoa nở sấy khô thanh can minh mục sơ tán phong nhiệt',
    ids: ['ju-hua', 'xuan-fu-hua', 'gu-jing-cao']
  },
  {
    file: 'yellow_pollen_bohoang.jpg',
    partLabel: 'Bồ Hoàng (Bột Phấn Hoa Cỏ Nến Vàng Tươi)',
    processingNote: 'Phấn hoa đực cây Cỏ nến màu vàng óng mịn dùng sống hoạt huyết hoặc sao đen chỉ huyết',
    ids: ['bo-hoang']
  },
  {
    file: 'red_safflower.jpg',
    partLabel: 'Hồng Hoa (Cánh Hoa Đỏ Thẫm Hoạt Huyết)',
    processingNote: 'Cánh hoa hình ống màu đỏ tươi thu hái lúc mới chuyển đỏ thông kinh khứ ứ',
    ids: ['hong-hua']
  },
  {
    file: 'red_goji_berries.jpg',
    partLabel: 'Quả Chín Đỏ Dưỡng Huyết Tư Âm (Kỷ Tử / Sơn Thù / Ngũ Vị)',
    processingNote: 'Quả chín đỏ mọng sấy khô tư bổ Can Thận ích tinh minh mục',
    ids: ['gou-qi-zi', 'shan-zhu-yu', 'wu-wei-zi', 'fu-pen-zi']
  },
  {
    file: 'nu_zhen_zi.jpg',
    partLabel: 'Nữ Trinh Tử (Quả Chín Khô Tím Đen Nhăn Bổ Can Thận)',
    processingNote: 'Quả chín cây Nữ trinh (Fructus Ligustri Lucidi) đồ rượu phơi khô màu tím đen nhăn tư bổ Can Thận minh mục',
    ids: ['nu-zhen-zi']
  },
  {
    file: 'dried_mulberry_sangshen.jpg',
    partLabel: 'Tang Thầm (Quả Dâu Tằm Chín Đen Tím Sấy Khô)',
    processingNote: 'Quả dâu tằm chín mọng phơi khô màu tím đen tư âm bổ huyết sinh tân nhuận tràng',
    ids: ['sang-shen']
  },
  {
    file: 'red_jujube_dates.jpg',
    partLabel: 'Đại Táo & Kim Anh Tử (Quả Chín Đỏ Bổ Tỳ Cố Tinh)',
    processingNote: 'Quả chín vỏ đỏ nhăn thịt dày vị ngọt ấm bổ trung ích khí dưỡng huyết',
    ids: ['da-zao', 'kim-anh-tu']
  },
  {
    file: 'dried_longan_longyanrou.jpg',
    partLabel: 'Long Nhãn Nhục (Cùi Nhãn Sấy Khô Nâu Vàng Dẻo)',
    processingNote: 'Áo hạt nhãn bóc vỏ sấy khô màu nâu vàng óng ánh bổ tâm tỳ dưỡng huyết an thần',
    ids: ['long-yan-rou']
  },
  {
    file: 'sliced_hawthorn_rings.jpg',
    partLabel: 'Sơn Tra & Mộc Qua (Quả Thái Khoanh Tròn)',
    processingNote: 'Quả chín thái lát ngang hình bánh xe tiêu thực hóa tích hoạt huyết',
    ids: ['shan-zha', 'moc-qua']
  },
  {
    file: 'dried_tangerine_peel.jpg',
    partLabel: 'Trần Bì & Thanh Bì (Vỏ Quýt Lâu Năm Lý Khí)',
    processingNote: 'Vỏ quả phơi khô để lâu năm (Trần cửu giả lương) lý khí kiện tỳ hóa đờm',
    ids: ['chen-pi', 'thanh-bi']
  },
  {
    file: 'sliced_finger_citron_foshou.jpg',
    partLabel: 'Phật Thủ Phiến (Lát Quả Phật Thủ Thái Mỏng Viền Vàng)',
    processingNote: 'Quả Phật thủ thái lát mỏng phơi khô viền vàng ruột trắng sơ can lý khí hòa vị',
    ids: ['fo-shou']
  },
  {
    file: 'bitter_orange_round_fruits.jpg',
    partLabel: 'Chỉ Thực & Chỉ Xác (Quả Cam Đắng Khô Thái Lát Phá Khí)',
    processingNote: 'Quả non hoặc quả già sấy khô thái lát sao cám phá khí tiêu tích hóa đờm',
    ids: ['zhi-shi', 'chi-xac']
  },
  {
    file: 'vitex_fruit_manjingzi.jpg',
    partLabel: 'Mạn Kinh Tử (Quả Tròn Khô Nâu Xám Có Đài Mỏng Tán Phong Nhiệt)',
    processingNote: 'Quả chín hình cầu nhỏ 4-6mm màu nâu xám bọc đài hoa mỏng sao thơm giã dập sơ tán phong nhiệt minh mục',
    ids: ['man-jing-zi']
  },
  {
    file: 'clove_dinhhuong.jpg',
    partLabel: 'Đinh Hương (Nụ Hoa Khô Hình Đinh Giàu Eugenol Ôn Trung)',
    processingNote: 'Nụ hoa Đinh hương phơi khô màu nâu đỏ hình chiếc đinh thơm nồng ôn trung giáng nghịch trợ dương',
    ids: ['dinh-huong']
  },
  {
    file: 'sichuan_pepper_huajiao.jpg',
    partLabel: 'Hoa Tiêu / Xuyên Tiêu (Vỏ Quả Nứt Đỏ Nâu Ôn Trung Trừ Hàn)',
    processingNote: 'Vỏ quả chín màu đỏ nâu có nốt sần tinh dầu tách miệng lộ hạt đen ôn trung chỉ thống sát trùng',
    ids: ['hua-jiao']
  },
  {
    file: 'evodia_wuzhuyu.jpg',
    partLabel: 'Ngô Thù Du (Quả Khô Đỉnh Ngôi Sao 5 Cánh Tán Hàn Giáng Nghịch)',
    processingNote: 'Quả nhỏ màu nâu lục đỉnh có khe nứt hình ngôi sao 5 cánh chích nước Cam thảo ôn can chỉ thống',
    ids: ['wu-zhu-yu']
  },
  {
    file: 'toosendan_chuanlianzi.jpg',
    partLabel: 'Xuyên Luyện Tử (Quả Xoan Vàng Nâu & Lát Cắt Hạt Hình Sao)',
    processingNote: 'Quả chín vỏ vàng nâu nhăn, thái lát lộ hạch cứng nhiều ngăn hình sao sơ can tiết nhiệt hành khí',
    ids: ['chuan-lian-zi']
  },
  {
    file: 'spiny_xanthium_cangerzi.jpg',
    partLabel: 'Thương Nhĩ Tử (Quả Ké Đầu Ngựa Có Gai Móc Sao Thơm)',
    processingNote: 'Quả hình thoi có gai móc sao vàng khử gai thông tỷ khiếu khu phong thấp',
    ids: ['cang-er-zi']
  },
  {
    file: 'white_cardamom_pods.jpg',
    partLabel: 'Bạch Đậu Khấu (Quả Nang Tròn Trắng Ngà Hóa Thấp Hành Khí)',
    processingNote: 'Quả nang hình cầu màu trắng vàng có 3 múi giàu tinh dầu thơm hóa thấp ôn trung chỉ ẩu',
    ids: ['bach-dau-khau']
  },
  {
    file: 'amomum_sharen.jpg',
    partLabel: 'Sa Nhân (Quả Nang Gai Nâu Đỏ & Khối Hạt Thơm Hóa Thấp)',
    processingNote: 'Quả Sa nhân vỏ nâu có gai mềm, bóc vỏ lấy khối hạt thơm đập dập hóa thấp hành khí an thai',
    ids: ['sha-ren']
  },
  {
    file: 'fennel_tieuhoihuong.jpg',
    partLabel: 'Tiểu Hồi Hương (Hạt Thì Là Có Gờ Dọc Xanh Vàng Tán Hàn)',
    processingNote: 'Quả bế đôi hình bầu dục nhỏ có 5 gờ dọc màu xanh vàng sao muối tán hàn chỉ thống lý khí',
    ids: ['tieu-hoi-huong']
  },
  {
    file: 'forsythia_pods_lianqiao.jpg',
    partLabel: 'Liên Kiều (Vỏ Quả Khô Tách Đôi Hình Mỏ Chim)',
    processingNote: 'Quả già nứt thành 2 mảnh cong hình thuyền màu nâu thanh nhiệt giải độc tán kết',
    ids: ['lian-qiao']
  },
  {
    file: 'persimmon_calyx_shidi.jpg',
    partLabel: 'Thị Đế (Đài Quả Hồng 4 Cánh Nâu Giáng Nghịch Chỉ Ách)',
    processingNote: 'Đài quả hồng chín (Calyx Kaki) 4 cánh gỗ dày màu nâu đỏ phơi khô giáng khí chỉ ách trị nấc cụt',
    ids: ['shi-di']
  },
  {
    file: 'orange_gardenia_zhizi.jpg',
    partLabel: 'Chi Tử (Quả Dành Dành Chín Đỏ Cam Có 6 Cạnh)',
    processingNote: 'Quả chín khô màu vàng cam đỏ có 6 gờ dọc tả hỏa trừ phiền lương huyết lợi đởm',
    ids: ['zhi-zi']
  },
  {
    file: 'dark_tsaoko_pods.jpg',
    partLabel: 'Thảo Quả & Nhục Đậu Khấu (Quả Bầu Dục Vân Khía)',
    processingNote: 'Quả hình cầu dài vỏ nâu xám có rãnh dọc ôn trung táo thấp sáp tràng',
    ids: ['thao-qua', 'rou-dou-kou']
  },
  {
    file: 'spindle_quisqualis_suquantu.jpg',
    partLabel: 'Sử Quân Tử (Quả Hình Thoi 5 Cạnh Nhọn Nâu Đen)',
    processingNote: 'Quả chín khô hình thoi có 5 gờ dọc rõ rệt, lấy nhân sao thơm sát trùng kiện tỳ',
    ids: ['su-quan-tu']
  },
  {
    file: 'wrinkled_chebula_khatu.jpg',
    partLabel: 'Kha Tử (Quả Chiêu Liêu Hình Trứng Có 5 Gờ Vàng Nâu)',
    processingNote: 'Quả già phơi khô màu vàng nâu có 5 cạnh dọc và vân nhăn liễm phế sáp tràng',
    ids: ['kha-tu']
  },
  {
    file: 'white_poria_cubes.jpg',
    partLabel: 'Bạch Phục Linh & Phục Thần (Khối Nấm Thái Vuông Trắng)',
    processingNote: 'Thể quả nấm Phục linh ký sinh rễ thông cắt khối vuông trắng kiện tỳ an thần',
    ids: ['fu-ling', 'fu-shen']
  },
  {
    file: 'polyporus_trulinh_slices.jpg',
    partLabel: 'Trư Linh Phiến (Lát Nấm Trư Linh Vỏ Đen Ruột Trắng)',
    processingNote: 'Hạch nấm Trư linh thái lát mỏng có lớp vỏ ngoài đen nhăn và ruột trắng ngà lợi thủy',
    ids: ['tru-linh']
  },
  {
    file: 'fermented_massa_shenqu.jpg',
    partLabel: 'Lục Thần Khúc (Bánh Men Thuốc Khối Vuông Vàng Nâu)',
    processingNote: 'Bột mì và cám ủ lên men cùng Thanh hao, Rau răm, Hạnh nhân cắt khối vuông tiêu thực',
    ids: ['shen-qu']
  },
  {
    file: 'white_lotus_seeds.jpg',
    partLabel: 'Liên Tử, Khiếm Thực & Bạch Biển Đậu (Hạt Tròn Trắng Ngà)',
    processingNote: 'Hạt tròn màu trắng kem giàu dinh dưỡng kiện tỳ chỉ tả ích thận cố tinh',
    ids: ['lien-tu', 'khiem-thuc', 'bai-bian-dou']
  },
  {
    file: 'ginkgo_nut_baiguo.jpg',
    partLabel: 'Bạch Quả / Ngân Hạnh (Hạt Vỏ Trắng Ngà Nhân Vàng Liễm Phế)',
    processingNote: 'Hạt Bạch quả vỏ cứng trắng nhẵn có 2 gờ cạnh, đập vỏ lấy nhân vàng liễm phế định suyễn sáp niệu',
    ids: ['bai-guo']
  },
  {
    file: 'white_coix_barley.jpg',
    partLabel: 'Ý Dĩ Nhân (Hạt Bo Bo Trắng Có Rãnh)',
    processingNote: 'Nhân hạt Ý dĩ trắng đục có rãnh dọc ở bụng lợi thủy thẩm thấp kiện tỳ',
    ids: ['yi-yi-ren']
  },
  {
    file: 'apricot_peach_kernels.jpg',
    partLabel: 'Hạnh Nhân, Đào Nhân, Úc Lý Nhân & Qua Lâu Nhân',
    processingNote: 'Nhân hạt hình tim dẹt đầu nhọn giàu dầu béo chỉ khái bình suyễn hoạt huyết nhuận tràng',
    ids: ['xing-ren', 'tao-ren', 'yu-li-ren', 'gua-lou-ren']
  },
  {
    file: 'walnut_hutaorou.jpg',
    partLabel: 'Hồ Đào Nhục (Nhân Quả Óc Chó Vân Nhăn Vàng Nâu Bổ Thận)',
    processingNote: 'Nhân hạt Hồ đào hình khối uốn lượn như bán cầu não giàu dầu béo bổ thận cố tinh định suyễn',
    ids: ['hu-tao-rou']
  },
  {
    file: 'pumpkin_seed_namquatu.jpg',
    partLabel: 'Nam Qua Tử (Hạt Bí Ngô Dẹt Trắng Ngà Có Viền Mép Sát Trùng)',
    processingNote: 'Hạt bí ngô già phơi khô hình bầu dục dẹt màu trắng kem có gờ viền quanh mép trừ sán dây',
    ids: ['nam-qua-tu']
  },
  {
    file: 'red_brown_jujube_seeds.jpg',
    partLabel: 'Toan Táo Nhân & Bá Tử Nhân (Hạt Nâu Đỏ Bóng An Thần)',
    processingNote: 'Hạt dẹt vỏ bóng màu nâu tía, sao đen giã dập dưỡng tâm can huyết an thần',
    ids: ['suan-zao-ren', 'ba-tu-nhan']
  },
  {
    file: 'lychee_seed_lizhihe.jpg',
    partLabel: 'Lệ Chi Hạch (Hạt Vải Tròn Bóng Nâu Đỏ Rốn Tròn Hành Khí)',
    processingNote: 'Hạt quả vải chín vỏ cứng bóng màu nâu hạt dẻ có rốn hạt tròn phẳng hành khí tán kết chỉ thống',
    ids: ['li-zhi-he']
  },
  {
    file: 'fermented_soy_dandouchi.jpg',
    partLabel: 'Đạm Đậu Xị (Hạt Đậu Đen Ủ Lên Men Nhăn Đen Giải Biểu Trừ Phiền)',
    processingNote: 'Hạt đậu đen hấp chín ủ lên men cùng Thanh hao và Tang diệp phơi khô giải biểu tuyên uất trừ phiền',
    ids: ['dan-dou-chi']
  },
  {
    file: 'nux_vomica_maqianzi.jpg',
    partLabel: 'Mã Tiền Tử (Hạt Tròn Dẹt Hình Cúc Áo Phủ Lông Ánh Bạc)',
    processingNote: 'Hạt Mã tiền hình đĩa tròn dẹt như chiếc cúc áo phủ lông mượt ánh bạc, chế cát/dầu thông lạc chỉ thống',
    ids: ['ma-qian-zi']
  },
  {
    file: 'small_brown_seeds.jpg',
    partLabel: 'Chủng Tử Hạt Nâu (Quyết Minh Tử / Thỏ Ty Tử / Ngưu Bàng Tử)',
    processingNote: 'Hạt chín sao thơm giã dập thanh can minh mục hoặc bổ thận cố tinh',
    ids: ['jue-ming-zi', 'huo-ma-ren', 'bach-gioi-tu', 'tho-ty-tu', 'yi-zhi-ren', 'niu-bang-zi', 'lai-phuc-tu', 'she-chuang-zi', 'bach-tat-le', 'ting-li-zi']
  },
  {
    file: 'black_sesame_seeds.jpg',
    partLabel: 'Hắc Chủng Tử (Mè Đen / Bổ Cốt Chỉ / Xa Tiền Tử / Tô Tử)',
    processingNote: 'Hạt màu đen nhánh sao muối hoặc sao thơm đi thẳng vào kinh Thận',
    ids: ['hei-zhi-ma', 'bu-gu-zhi', 'che-qian-zi', 'to-tu', 'qian-niu-zi', 'wang-bu-liu-xing']
  },
  {
    file: 'golden_cordyceps.jpg',
    partLabel: 'Đông Trùng Hạ Thảo Nguyên Con (Cordyceps Sinensis)',
    processingNote: 'Thể nấm Ophiocordyceps mọc từ sâu non mùa đông, bổ Phế Thận ích tinh tủy',
    ids: ['dong-chong-xia-cao']
  },
  {
    file: 'velvet_antler_slices.jpg',
    partLabel: 'Lộc Nhung Phiến (Lát Cắt Nhung Hươu Non)',
    processingNote: 'Sừng non hươu sao thái lát tròn xốp mịn đại bổ nguyên dương sinh tinh huyết',
    ids: ['lu-rong']
  },
  {
    file: 'buffalo_horn_slices.jpg',
    partLabel: 'Thủy Ngưu Giác Phiến (Lát Sừng Trâu Bào Mỏng Đen Bóng)',
    processingNote: 'Sừng trâu bào thành phiến mỏng bán trong suốt sắc trước thanh nhiệt lương huyết giải độc',
    ids: ['shui-niu-jiao', 'xi-jiao-shui-niu-jiao']
  },
  {
    file: 'white_gypsum_crystals.jpg',
    partLabel: 'Khoáng Thạch Trắng (Thạch Cao / Mang Tiêu / Hoạt Thạch)',
    processingNote: 'Khoáng vật tinh thể sợi trắng trong thanh nhiệt tả hỏa ở Khí phận',
    ids: ['shi-gao', 'mang-xiao', 'hoat-thach', 'bai-fan', 'peng-sha']
  },
  {
    file: 'borneol_bingpian.jpg',
    partLabel: 'Băng Phiến / Mai Phiến (Tinh Thể Mảnh Trong Suốt Như Băng)',
    processingNote: 'Tinh thể Borneol trắng trong suốt mỏng giòn như mảnh băng vụn mùi thơm mát khai khiếu tỉnh thần',
    ids: ['bing-pian']
  },
  {
    file: 'red_cinnabar_zhusha.jpg',
    partLabel: 'Chu Sa / Thần Sa (Khoáng Thạch Thủy Ngân Đỏ Thẫm)',
    processingNote: 'Quặng Cinnabar (HgS) màu đỏ tươi thủy phi mịn trấn tâm an thần thanh nhiệt giải độc',
    ids: ['zhu-sha']
  },
  {
    file: 'yellow_sulfur_liuhuang.jpg',
    partLabel: 'Lưu Huỳnh Chế (Khối Lưu Huỳnh Kết Tinh Vàng Chanh)',
    processingNote: 'Lưu huỳnh nấu chế với đậu phụ khử độc giải độc sát trùng tráng dương thông tiện',
    ids: ['liu-huang']
  },
  {
    file: 'black_magnetite_cishi.jpg',
    partLabel: 'Từ Thạch & Đại Giả Thạch (Quặng Sắt Từ Tính Trọng Trấn)',
    processingNote: 'Quặng Magnetit đen xám và Hematit nâu đỏ nung đỏ nhúng giấm tiềm dương nạp khí',
    ids: ['ci-shi', 'dai-zhe-shi']
  },
  {
    file: 'oyster_abalone_shells.jpg',
    partLabel: 'Mẫu Lệ (Vỏ Hàu Biển Xếp Lớp Nung Giã Vụn Tiềm Dương)',
    processingNote: 'Vỏ hàu biển dày xếp lớp nung đỏ hoặc dùng sống giã vụn sắc trước bình can tiềm dương sáp tinh',
    ids: ['mu-li']
  },
  {
    file: 'abalone_shell_thachquyetminh.jpg',
    partLabel: 'Thạch Quyết Minh (Vỏ Bào Ngư Có Hàng Lỗ & Xà Cừ Óng Ánh)',
    processingNote: 'Vỏ ốc cửu khổng (bào ngư) hình vành tai có hàng lỗ thở và lớp xà cừ ngũ sắc bình can minh mục',
    ids: ['thach-quyet-minh']
  },
  {
    file: 'fossil_dragon_bone.jpg',
    partLabel: 'Long Cốt (Xương Hóa Thạch Trắng Xám Trọng Trấn)',
    processingNote: 'Xương động vật cổ đại hóa thạch xốp hút nước đập vụn sắc trước trấn kinh cố sáp',
    ids: ['long-gu']
  },
  {
    file: 'black_donkey_gelatin.jpg',
    partLabel: 'A Giao (Miếng Cao Da Lừa Đen Bóng Bổ Huyết)',
    processingNote: 'Miếng cao A giao đen bóng (hoà tan vào nước thuốc nóng) bổ huyết tư âm chỉ huyết',
    ids: ['e-jiao']
  },
  {
    file: 'black_aloe_luhui.jpg',
    partLabel: 'Lô Hội Dược Liệu (Khối Nhựa Lô Hội Cô Đặc Đen Nâu)',
    processingNote: 'Dịch nhựa lá Lô hội cô đặc thành khối đen bóng vị đắng lạnh tả nhiệt thông tiện',
    ids: ['lu-hui']
  },
  {
    file: 'golden_frankincense_resin.jpg',
    partLabel: 'Nhũ Hương (Giọt Nhựa Thơm Vàng Trong Hoạt Huyết Sinh Cơ)',
    processingNote: 'Giọt nhựa cây Nhũ hương trắng vàng bán trong suốt sao giấm khử dầu hoạt huyết định thống sinh cơ',
    ids: ['ru-xiang']
  },
  {
    file: 'musk_shexiang.jpg',
    partLabel: 'Xạ Hương (Chất Tiết Túi Xạ Dạng Hạt Nâu Thẫm Khai Khiếu)',
    processingNote: 'Hương dược lấy từ túi xạ hươu xạ màu nâu đỏ sẫm dạng hạt thơm nồng khai khiếu tỉnh thần hoạt huyết thông kinh',
    ids: ['she-xiang']
  },
  {
    file: 'myrrh_moyao.jpg',
    partLabel: 'Một Dược (Khối Nhựa Thơm Nâu Đỏ Tán Huyết Khứ Ứ Chỉ Thống)',
    processingNote: 'Khối nhựa cây Một dược màu nâu đỏ sẫm có lớp bụi vàng mịn tán huyết tiêu sưng sinh cơ',
    ids: ['mo-yao']
  },
  {
    file: 'amber_hupo.jpg',
    partLabel: 'Hổ Phách (Khối Nhựa Thông Hóa Thạch Vàng Cam Trong Suốt)',
    processingNote: 'Nhựa thông cổ đại hóa thạch màu vàng cam trong suốt tán ứ thông lâm trấn kinh an thần',
    ids: ['hu-po']
  },
  {
    file: 'bezoar_niuhuang.jpg',
    partLabel: 'Ngưu Hoàng (Viên Sỏi Mật Bò Vàng Nghệ Có Vân Đồng Tâm)',
    processingNote: 'Sỏi túi mật bò hình cầu màu vàng nghệ mặt vỡ có nhiều lớp đồng tâm thanh tâm khai khiếu tức phong',
    ids: ['niu-huang']
  },
  {
    file: 'black_kelp_strips.jpg',
    partLabel: 'Côn Bố & Hải Tảo (Tảo Biển Nhuyễn Kiên Tán Kết)',
    processingNote: 'Dải tảo biển phơi khô giàu Iod làm mềm khối bướu cổ và hạch đờm',
    ids: ['kun-bu', 'hai-zao']
  },
  {
    file: 'cicada_sloughs.jpg',
    partLabel: 'Thuyền Thoái (Xác Ve Sầu Vàng Trong Nhẹ Xốp)',
    processingNote: 'Vỏ xác lột của ấu trùng ve sầu rửa sạch phơi khô sơ tán phong nhiệt thấu chẩn tức phong',
    ids: ['chan-tui']
  },
  {
    file: 'dried_scorpion_quanxie.jpg',
    partLabel: 'Toàn Yết (Bọ Cạp Bào Chế Khô Nguyên Con)',
    processingNote: 'Bọ cạp nguyên con ngâm nước muối nhạt đun sôi sấy khô tức phong chỉ kinh thông lạc',
    ids: ['quan-xie']
  },
  {
    file: 'dried_centipede_wugong.jpg',
    partLabel: 'Ngô Công (Rết Dược Liệu Sấy Khô Bào Chế)',
    processingNote: 'Rết bắt mùa xuân căng thẳng bằng que tre phơi khô sao vàng tức phong giải độc tán kết',
    ids: ['wu-gong']
  },
  {
    file: 'dried_gecko_gejie.jpg',
    partLabel: 'Cáp Giới (Đôi Tắc Kè Khô Căng Phẳng Trên Nẹp Tre)',
    processingNote: 'Tắc kè mổ bụng bỏ nội tạng căng trên nẹp tre phơi khô (tinh hoa ở đuôi) bổ Phế Thận nạp khí',
    ids: ['ge-jie']
  },
  {
    file: 'mantis_egg_sangpiaoxiao.jpg',
    partLabel: 'Tang Phiêu Tiêu (Tổ Bọ Ngựa Trên Cây Dâu Đun Chín)',
    processingNote: 'Bọc trứng bọ ngựa hình bầu dục xốp nhẹ màu nâu vàng hấp chín phơi khô cố tinh súc niệu',
    ids: ['sang-piao-xiao']
  },
  {
    file: 'dried_earthworms.jpg',
    partLabel: 'Địa Long (Giun Đất Chế Thông Kinh Hoạt Lạc)',
    processingNote: 'Địa long mổ bụng rửa sạch phơi khô chứa Lumbrokinase tiêu huyết khối',
    ids: ['di-long']
  },
  {
    file: 'wulingzhi_resin_grains.jpg',
    partLabel: 'Ngũ Linh Chi (Hạt Dược Liệu Sao Giấm Hoạt Huyết Hóa Ứ)',
    processingNote: 'Ngũ linh chi sao tẩm giấm màu nâu đen bóng thông lợi huyết mạch chỉ thống',
    ids: ['wu-ling-zhi']
  },
  {
    file: 'white_silkworms.jpg',
    partLabel: 'Bạch Cương Tàm (Tằm Vôi Trắng Khứ Phong Hóa Đờm)',
    processingNote: 'Con tằm vôi cứng màu trắng phấn sao cám tức phong hóa đờm tán kết',
    ids: ['bai-jiang-can']
  },
  {
    file: 'dried_placenta_ziheche.jpg',
    partLabel: 'Tử Hà Sa (Nhau Thai Sấy Khô Vàng Nâu Ôn Thận Ích Tinh)',
    processingNote: 'Tử hà sa rửa sạch mạch máu chưng rượu sấy khô màu vàng nâu đại bổ khí huyết tinh tủy',
    ids: ['zi-he-che']
  },
  {
    file: 'white_cuttlebone.jpg',
    partLabel: 'Ô Tặc Cốt / Hải Phiêu Tiêu (Mai Mực Trắng Chế Toan)',
    processingNote: 'Mai cá mực hình bầu dục trắng xốp giàu CaCO3 trung hòa acid dạ dày cầm máu',
    ids: ['wu-zei-gu']
  },
  {
    file: 'turtle_plastron_shell.jpg',
    partLabel: 'Quy Bản (Yếm Rùa Chích Giấm Tư Âm Tiềm Dương Ích Thận)',
    processingNote: 'Yếm bụng rùa có đường khớp răng cưa chích giấm sắc trước đại bổ chân âm mạnh gân cốt',
    ids: ['gui-ban']
  },
  {
    file: 'softshell_turtle_biejia.jpg',
    partLabel: 'Miết Giáp (Mai Lưng Ba Ba Xanh Xám Chích Giấm Nhuyễn Kiên)',
    processingNote: 'Mai lưng ba ba hình bầu dục màu lục xám lộ vân xương sườn chích giấm tư âm thanh nhiệt tán kết',
    ids: ['bie-jia']
  },
  {
    file: 'golden_gizzard_lining.jpg',
    partLabel: 'Kê Nội Kim (Màng Mề Gà Vàng Tiêu Thực Hòa Vị)',
    processingNote: 'Lớp màng trong mề gà màu vàng óng nhiều nếp nhăn tiêu thực tích và sỏi',
    ids: ['ji-nei-jin']
  },
  {
    file: 'fresh_ginger_slices.jpg',
    partLabel: 'Sinh Khương (Củ Gừng Tươi Thái Lát Giải Biểu Chỉ Ẩu)',
    processingNote: 'Củ gừng tươi thái lát vàng thơm phát hãn giải biểu ôn vị chỉ ẩu giải độc Bán hạ',
    ids: ['sheng-jiang']
  },
  {
    file: 'scallion_bulb_congbai.jpg',
    partLabel: 'Thông Bạch (Gốc Hành Hoa Trắng Kèm Rễ Chùm Thông Dương Phát Hãn)',
    processingNote: 'Đoạn gốc trắng của cây hành hoa kèm chùm rễ trắng phát hãn giải biểu thông dương tán hàn',
    ids: ['cong-bai']
  },
  {
    file: 'fresh_centella_leaves.jpg',
    partLabel: 'Tích Tuyết Thảo & Tất Bát Diệp (Lá Rau Má / Lá Lốt)',
    processingNote: 'Lá tươi hình quạt hoặc hình tim dùng tươi hoặc phơi mát thanh nhiệt / trừ thấp',
    ids: ['rau-ma', 'la-lot']
  },
  {
    file: 'fresh_aromatic_leaves.jpg',
    partLabel: 'Húng Chanh & Hương Nhu Tía (Lá Thơm Kháng Khuẩn Hô Hấp)',
    processingNote: 'Lá dày mọng nước mép khía răng cưa giàu tinh dầu Carvacrol / Eugenol trị ho cảm',
    ids: ['hung-chanh', 'huong-nhu-tia']
  },
  {
    file: 'sprouted_barley_malt.jpg',
    partLabel: 'Mạch Nha & Cốc Nha (Hạt Lúa Mạch / Thóc Nảy Mầm)',
    processingNote: 'Hạt đại mạch và hạt thóc ủ nảy mầm phơi khô giàu enzyme Amylase tiêu tinh bột',
    ids: ['mai-ya', 'gu-ya']
  },
  {
    file: 'sliced_betel_nut.jpg',
    partLabel: 'Binh Lang Phiến (Hạt Cau Thái Lát Vân Cẩm Thạch)',
    processingNote: 'Hạt cau già thái lát mỏng có vân cẩm thạch nâu trắng sát trùng hành khí',
    ids: ['bing-lang']
  },
  {
    file: 'black_smoked_plums.jpg',
    partLabel: 'Ô Mai (Quả Mơ Muối Hun Khói Đen Liễm Phế Sinh Tân)',
    processingNote: 'Quả mơ xanh hun khói đen nhăn vị chua chát liễm phế chỉ khái sinh tân an hồi',
    ids: ['o-mai']
  }
];

const VARIANT_CLASSES = [
  '',
  'scale-105 brightness-102 saturate-105',
  'scale-105 -scale-x-105 contrast-102',
  'scale-108 brightness-98 saturate-108',
  'scale-106 -scale-x-106 brightness-103'
];

const HERB_SPEC_MAP: Record<string, { file: string; variantClass: string; partLabel: string; processingNote: string; isDedicatedSingle: boolean }> = {};
for (const group of SPECIMEN_GROUPS) {
  const isSingle = group.ids.length === 1;
  group.ids.forEach((id, idx) => {
    HERB_SPEC_MAP[id] = {
      file: `/assets/images/herbs/${group.file}`,
      variantClass: isSingle ? '' : VARIANT_CLASSES[idx % VARIANT_CLASSES.length],
      partLabel: group.partLabel,
      processingNote: group.processingNote,
      isDedicatedSingle: isSingle
    };
  });
}

function getExactBotanicalPartLabel(herb: Herb): string {
  const bot = herb.botanicalName.toLowerCase();
  let partDesc = 'Dược Liệu Bào Chế Chuẩn Dược Điển';
  if (bot.includes('radix') && bot.includes('rhizoma')) {
    partDesc = 'Rễ & Thân Rễ Thái Phiến Bào Chế Khô';
  } else if (bot.includes('radix')) {
    partDesc = 'Rễ Củ Thái Phiến Bào Chế Khô';
  } else if (bot.includes('rhizoma')) {
    partDesc = 'Thân Rễ Thái Lát Phơi Sấy Khô';
  } else if (bot.includes('folium')) {
    partDesc = 'Lá Thu Hái Phơi Âm Can (Diệp Phiến)';
  } else if (bot.includes('flos') || bot.includes('plumula')) {
    partDesc = 'Nụ Hoa / Tâm Mầm Sấy Khô Giữ Tinh Dầu';
  } else if (bot.includes('spica')) {
    partDesc = 'Cụm Hoa Bông Khô Thu Hái Sấy Khô';
  } else if (bot.includes('pericarpium')) {
    partDesc = 'Vỏ Quả / Xơ Quả Phơi Khô Trần Cửu';
  } else if (bot.includes('calyx')) {
    partDesc = 'Đài Quả (Thị Đế) Thu Hái Sấy Khô';
  } else if (bot.includes('stigma')) {
    partDesc = 'Vòi Nhụy (Ngọc Mễ Tu) Phơi Mát Sấy Khô';
  } else if (bot.includes('fructus')) {
    partDesc = 'Quả Chín Thu Hái Sấy Khô / Sao Chế';
  } else if (bot.includes('semen')) {
    partDesc = 'Hạt Già Chọn Lọc Phơi Khô / Sao Thơm';
  } else if (bot.includes('cortex')) {
    partDesc = 'Vỏ Thân / Vỏ Rễ Cạo Bần Bào Chế';
  } else if (bot.includes('cacumen')) {
    partDesc = 'Ngọn Cành Mang Lá Thái Đoạn Phơi Khô';
  } else if (bot.includes('caulis') || bot.includes('ramulus') || bot.includes('lignum')) {
    partDesc = 'Thân Cành / Dây Đằng Thái Phiến Phơi Khô';
  } else if (bot.includes('bulbus')) {
    partDesc = 'Vảy Thân Hành Tách Rời Đồ Sấy Khô';
  } else if (bot.includes('sclerotium') || bot.includes('polyporus') || bot.includes('poria')) {
    partDesc = 'Thể Hạch Nấm Thái Khối / Lát Bào Chế';
  } else if (bot.includes('herba')) {
    partDesc = 'Toàn Thảo Cắt Đoạn Phơi Khô';
  } else if (bot.includes('thallus') || bot.includes('sargassum')) {
    partDesc = 'Tảo Biển Phơi Khô Rửa Sạch Muối';
  } else if (bot.includes('cornu')) {
    partDesc = 'Sừng Bào Phiến Mỏng Sắc Trước';
  } else if (bot.includes('carapax') || bot.includes('plastrum') || bot.includes('concha') || bot.includes('endoconcha')) {
    partDesc = 'Mai / Yếm / Vỏ Xác Nung Giã Vụn Chích Giấm';
  } else if (
    bot.includes('gypsum') ||
    bot.includes('mirabilit') ||
    bot.includes('natrii sulfas') ||
    bot.includes('talc') ||
    bot.includes('alumen') ||
    bot.includes('borax') ||
    bot.includes('magnetit') ||
    bot.includes('haematit') ||
    bot.includes('cinnabar') ||
    bot.includes('sulfur')
  ) {
    partDesc = 'Khoáng Thạch Dược Dụng Nung / Thủy Phi';
  } else if (bot.includes('olibanum') || bot.includes('myrrha') || bot.includes('moschus') || bot.includes('succinum') || bot.includes('aloe')) {
    partDesc = 'Nhựa Thơm / Hương Dược Tinh Chế';
  }
  return `${herb.vietnameseName} (${herb.chineseCharacters}) — ${partDesc}`;
}

export function getHerbVisualSpec(herb: Herb): HerbVisualSpec & { variantClass?: string } {
  const mapped = HERB_SPEC_MAP[herb.id];
  const exact = HERB_EXACT_PHOTOS[herb.id];

  const baseFile = mapped?.file || '/assets/images/herbs/pale_sliced_roots.jpg';
  const partLabel = mapped?.isDedicatedSingle
    ? mapped.partLabel
    : getExactBotanicalPartLabel(herb);

  const cleanBensky = (herb.benskyNotes || '')
    .replace(/^Dan Bensky(\s*3rd Ed)?:\s*/i, '')
    .replace(/\.$/, '');
  const processingNote = mapped?.isDedicatedSingle
    ? mapped.processingNote
    : `${herb.vietnameseName} (${herb.botanicalName}): ${mapped?.processingNote || 'Bào chế chuẩn Dược điển'}${cleanBensky ? ` — ${cleanBensky}` : ''}`;

  return {
    imageUrl: baseFile,
    speciesPhotoUrl: exact?.url || baseFile,
    taxonName: exact?.taxonName || herb.botanicalName,
    partLabel,
    processingNote,
    hasExactSlicePhoto: true,
    variantClass: mapped?.variantClass || ''
  };
}

interface HerbalVisualCardProps {
  herb: Herb;
  mode: 'thumbnail' | 'expanded';
}

export const HerbalVisualCard: React.FC<HerbalVisualCardProps> = ({ herb, mode }) => {
  const spec = getHerbVisualSpec(herb);
  const [naturalImgFailed, setNaturalImgFailed] = useState(false);
  const [preparedImgFailed, setPreparedImgFailed] = useState(false);
  const [inspectModal, setInspectModal] = useState<null | 'natural' | 'prepared' | 'compare'>(null);

  if (mode === 'thumbnail') {
    return (
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-slate-200 shadow-xs shrink-0 bg-slate-100">
        <img
          src={spec.imageUrl}
          alt={`Hình thực tế vị thuốc ${herb.vietnameseName}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent px-1.5 py-1 flex items-end justify-between">
          <span className="text-[10px] font-serif font-bold text-amber-200 leading-none drop-shadow">
            {herb.chineseCharacters}
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 rounded-2xl overflow-hidden border border-emerald-300/60 bg-slate-950 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Dual Real Visual Gallery: [1] Living Biological Species + [2] Prepared Pharmacognosy Herb */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-2 p-2.5 bg-slate-900/90">
            {/* Photo 1: Living Plant / Animal / Mineral Species in Nature (Dạng Tự Nhiên) */}
            <div
              onClick={() => setInspectModal('natural')}
              className="group relative rounded-xl overflow-hidden bg-slate-950 min-h-[195px] sm:min-h-[220px] border border-emerald-800/40 cursor-pointer flex flex-col justify-between"
              title="Nhấp để phóng to đối chiếu Dạng Tự Nhiên"
            >
              {!naturalImgFailed ? (
                <img
                  src={spec.speciesPhotoUrl}
                  alt={`Cây / Vị thuốc sống tự nhiên ${herb.vietnameseName} (${spec.taxonName})`}
                  referrerPolicy="no-referrer"
                  onError={() => setNaturalImgFailed(true)}
                  className="w-full h-full object-cover max-h-[240px] transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                /* Dedicated Botanical Specimen Fallback - Never duplicates the sliced photo */
                <div className="w-full h-full min-h-[195px] flex flex-col items-center justify-center p-3 text-center bg-gradient-to-b from-emerald-950 to-slate-950 border border-emerald-700/30">
                  <div className="w-12 h-12 rounded-full bg-emerald-900/60 border border-emerald-500/40 flex items-center justify-center mb-2 text-emerald-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                    Loài Định Danh Tự Nhiên
                  </span>
                  <span className="text-xs font-serif font-bold text-white mt-0.5">
                    {spec.taxonName}
                  </span>
                  <span className="text-[10px] text-emerald-200/80 mt-1 italic">
                    Mẫu cây/vật sống nguyên sinh
                  </span>
                </div>
              )}

              {/* Badges and Caption */}
              <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none z-10">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-950/95 text-[9px] sm:text-[10px] font-bold text-emerald-300 border border-emerald-500/40 backdrop-blur-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  1. Dạng Tự Nhiên
                </span>
                <span className="px-1.5 py-0.5 rounded bg-black/70 text-[9px] text-white/90 font-mono flex items-center gap-0.5 backdrop-blur-xs">
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Xem
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent p-2 z-10 pointer-events-none">
                <span className="text-[10px] sm:text-[11px] font-bold text-white block truncate">
                  {herb.vietnameseName} (Cây/Vật sống)
                </span>
                <span className="text-[9px] sm:text-[10px] italic text-emerald-300 block truncate font-serif">
                  {spec.taxonName}
                </span>
              </div>
            </div>

            {/* Photo 2: Prepared Dried Pharmacognosy Herb (Sau Khi Bào Chế) */}
            <div
              onClick={() => setInspectModal('prepared')}
              className="group relative rounded-xl overflow-hidden bg-white min-h-[195px] sm:min-h-[220px] border border-amber-800/40 cursor-pointer flex flex-col justify-between"
              title="Nhấp để phóng to đối chiếu Dạng Sau Khi Bào Chế"
            >
              {!preparedImgFailed ? (
                <img
                  src={spec.imageUrl}
                  alt={`Vị thuốc sau khi bào chế ${herb.vietnameseName}`}
                  referrerPolicy="no-referrer"
                  onError={() => setPreparedImgFailed(true)}
                  className={`w-full h-full object-contain p-2 bg-white max-h-[240px] transition-transform duration-300 group-hover:scale-105 ${spec.variantClass || ''}`}
                />
              ) : (
                <div className="w-full h-full min-h-[195px] flex flex-col items-center justify-center p-3 text-center bg-slate-900 text-amber-200">
                  <span className="text-xs font-bold">{spec.partLabel}</span>
                  <span className="text-[10px] text-slate-400 mt-1">{spec.processingNote}</span>
                </div>
              )}

              {/* Badges and Caption */}
              <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none z-10">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-950/95 text-[9px] sm:text-[10px] font-bold text-amber-300 border border-amber-500/40 backdrop-blur-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  2. Sau Bào Chế
                </span>
                <span className="px-1.5 py-0.5 rounded bg-black/70 text-[9px] text-white/90 font-mono flex items-center gap-0.5 backdrop-blur-xs">
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Xem
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent p-2 z-10 pointer-events-none">
                <span className="text-[10px] font-serif font-bold text-amber-300 block truncate">
                  {herb.chineseCharacters} ({herb.pinyinName})
                </span>
                <span className="text-[9px] text-slate-200 block truncate">
                  {spec.partLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Pharmacognosy & Preparation Metadata */}
          <div className="lg:col-span-6 p-4 sm:p-5 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white flex flex-col justify-between space-y-3">
            <div>
              <div className="flex flex-wrap items-center gap-1.5 mb-2">
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Đối Chiếu 2 Thể Dược Liệu Chuẩn Bensky
                </span>
                <button
                  type="button"
                  onClick={() => setInspectModal('compare')}
                  className="text-[10px] font-bold text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 px-2.5 py-0.5 rounded border border-amber-400/40 cursor-pointer flex items-center gap-1 transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  So sánh phóng to 2 ảnh
                </button>
              </div>

              <h4 className="text-base sm:text-lg font-serif font-bold text-white leading-snug">
                {herb.vietnameseName} — <span className="text-emerald-300 font-normal italic text-xs sm:text-sm">{herb.botanicalName}</span>
              </h4>

              <div className="mt-2 space-y-1.5 text-xs text-slate-300 leading-relaxed bg-white/5 p-2.5 rounded-xl border border-white/10">
                <p>
                  <strong className="text-emerald-300">🌱 Dạng Tự Nhiên: </strong>
                  Loài sinh học định danh <i>{spec.taxonName}</i>. Khai thác đúng bộ phận dùng nguyên bản.
                </p>
                <p>
                  <strong className="text-amber-300">🍂 Sau Khi Bào Chế: </strong>
                  {spec.processingNote}. Đạt tiêu chuẩn dược dụng Bensky & Dược điển Việt Nam.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[11px]">
              <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                <span className="text-[9px] uppercase text-slate-400 font-bold block">Tính Vị Đặc Trưng</span>
                <span className="text-emerald-200 font-semibold mt-0.5 block break-words">
                  Tính {herb.properties.nature} · Vị {herb.properties.flavors.join(', ')}
                </span>
              </div>
              <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                <span className="text-[9px] uppercase text-slate-400 font-bold block">Kinh Mạch Quy Hướng</span>
                <span className="text-amber-200 font-semibold mt-0.5 block break-words">
                  Kinh {herb.properties.channels.join(', ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* High-Resolution Comparison / Zoom Modal */}
      {inspectModal && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6"
          onClick={() => setInspectModal(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-white">
              <div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Đối Chiếu Vị Thuốc: {herb.vietnameseName} ({herb.chineseCharacters} - {herb.pinyinName})
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Tên khoa học: <i className="text-emerald-300">{spec.taxonName}</i> · Họ dược liệu: {herb.botanicalName}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setInspectModal(null)}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-colors cursor-pointer"
              >
                ✕ Đóng
              </button>
            </div>

            {/* Modal Content: Side-by-Side High-Res Inspection */}
            <div className="p-4 overflow-y-auto flex-1 bg-slate-950 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Panel 1: Dạng Tự Nhiên */}
                <div className="rounded-2xl overflow-hidden border border-emerald-700/50 bg-slate-900 flex flex-col">
                  <div className="p-2.5 bg-emerald-950/80 border-b border-emerald-800/40 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      1. MẪU DẠNG TỰ NHIÊN (CÂY/CON/KHOÁNG VẬT)
                    </span>
                    <span className="text-[10px] text-emerald-400/90 font-mono">Living Taxon</span>
                  </div>
                  <div className="relative aspect-4/3 sm:aspect-16/11 bg-black flex items-center justify-center overflow-hidden">
                    {!naturalImgFailed ? (
                      <img
                        src={spec.speciesPhotoUrl}
                        alt={`Mẫu cây sống ${herb.vietnameseName}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain max-h-[350px]"
                      />
                    ) : (
                      <div className="p-6 text-center text-emerald-200">
                        <span className="text-base font-bold block mb-1">Mẫu Tự Nhiên Nguyên Sinh</span>
                        <span className="text-xs italic block">{spec.taxonName}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-slate-900 text-xs text-slate-300 space-y-1">
                    <div className="text-white font-semibold">Định danh thực vật/động vật học:</div>
                    <div className="text-emerald-300 italic">{spec.taxonName}</div>
                    <p className="text-[11px] text-slate-400">Thu hái đúng thời vụ sinh trưởng để đảm bảo hàm lượng hoạt chất tối ưu.</p>
                  </div>
                </div>

                {/* Panel 2: Sau Khi Bào Chế */}
                <div className="rounded-2xl overflow-hidden border border-amber-700/50 bg-slate-900 flex flex-col">
                  <div className="p-2.5 bg-amber-950/80 border-b border-amber-800/40 flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      2. DẠNG SAU BÀO CHẾ (DƯỢC LIỆU DƯỢC ĐIỂN)
                    </span>
                    <span className="text-[10px] text-amber-400/90 font-mono">Prepared Herb</span>
                  </div>
                  <div className="relative aspect-4/3 sm:aspect-16/11 bg-white flex items-center justify-center overflow-hidden p-3">
                    <img
                      src={spec.imageUrl}
                      alt={`Dược liệu bào chế ${herb.vietnameseName}`}
                      className={`w-full h-full object-contain max-h-[350px] ${spec.variantClass || ''}`}
                    />
                  </div>
                  <div className="p-3 bg-slate-900 text-xs text-slate-300 space-y-1">
                    <div className="text-amber-300 font-semibold">{spec.partLabel}</div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{spec.processingNote}</p>
                  </div>
                </div>
              </div>

              {/* Identification & Pharmacopoeial Notes */}
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-amber-400">❖</span>
                  Tiêu Chuẩn Nhận Diện Dược Điển & Tác Dụng:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <strong className="text-emerald-300">Công năng chủ trị: </strong>
                    <span>{herb.actions.join(', ')}</span>
                  </div>
                  <div>
                    <strong className="text-amber-300">Liều dùng tiêu chuẩn: </strong>
                    <span>{herb.dosageGram} (Sắc, tán hoàn hoặc ngâm tẩm theo đơn)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Được đối chiếu chuẩn hóa theo Dược điển Bensky & Dược điển Việt Nam</span>
              <button
                type="button"
                onClick={() => setInspectModal(null)}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer"
              >
                Hoàn tất đối chiếu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
