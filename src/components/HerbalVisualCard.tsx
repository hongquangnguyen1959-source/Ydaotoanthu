import React, { useEffect, useState } from 'react';
import { Herb } from '../data/herbalMateria';
import { HERB_EXACT_PHOTOS } from '../data/herbExactPhotos';
import { HERB_PREPARED_UNIQUE } from '../data/herbPreparedUnique';

export interface HerbVisualSpec {
  imageUrl: string;
  speciesPhotoUrl: string;
  taxonName: string;
  partLabel: string;
  processingNote: string;
  hasExactSlicePhoto: boolean;
  isHerbariumSpecimen: boolean;
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
    partLabel: 'Hoàng Kỳ & Sơn Đậu Căn (Rễ Thái Phiến Vàng Nhạt)',
    processingNote: 'Rễ củ thái vát dài phơi khô hoặc chích mật ong chuẩn Bensky',
    ids: ['huang-qi', 'shan-dou-gen']
  },
  {
    file: 'kushen_slices.jpg',
    partLabel: 'Khổ Sâm Phiến (Lát Cắt Rễ Khổ Sâm Vỏ Nâu Vàng Ruột Kem)',
    processingNote: 'Rễ Khổ sâm thái lát xéo vỏ mỏng vàng nâu mặt cắt trắng ngà có tia tâm thanh nhiệt táo thấp sát trùng',
    ids: ['ku-shen']
  },
  {
    file: 'ban_lan_gen.jpg',
    partLabel: 'Bản Lam Căn (Phiến Tròn Rễ Chàm Kim Tỉnh Ngọc Lan)',
    processingNote: 'Rễ cây Tùng lam thái lát xéo vỏ xám vàng lõi vàng nhạt vòng trắng kem thanh nhiệt giải độc lương huyết lợi yết',
    ids: ['ban-lan-gen']
  },
  {
    file: 'niuxi_achyranthes.jpg',
    partLabel: 'Ngưu Tất (Đoạn Rễ Cỏ Xước Trụ Vàng Nâu Đốt Vòng Mạch)',
    processingNote: 'Rễ Hoài ngưu tất cắt đoạn trụ vàng nâu mặt cắt nhiều vòng bó mạch đồng tâm hoạt huyết bổ can thận mạnh gân cốt',
    ids: ['niu-xi']
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
    partLabel: 'Đương Quy & Nhóm Rễ Thơm Bổ Huyết Trừ Phong',
    processingNote: 'Rễ củ thái lát mỏng trắng ngà giàu tinh dầu thơm dưỡng huyết hoặc khu phong chỉ thống',
    ids: ['dang-gui', 'du-huo', 'tien-ho', 'jie-geng', 'yuan-zhi', 'phong-ky']
  },
  {
    file: 'bai_shao_white_peony.jpg',
    partLabel: 'Bạch Thược Phiến (Lát Thược Dược Bỏ Vỏ Đồ Chín Trắng Ngà)',
    processingNote: 'Rễ Thược dược cạo sạch vỏ ngoài đồ chín phơi khô thái phiến tròn mỏng trắng kem dưỡng huyết liễm âm nhu can chỉ thống',
    ids: ['bai-shao']
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
    partLabel: 'Thục Địa Hoàng & Hoàng Tinh Cửu Chưng (Củ Chế Rượu Đen Bóng)',
    processingNote: 'Chưng chế rượu / sa nhân (Cửu chưng cửu sái) đen bóng tư bổ Can Thận dưỡng âm ích tinh',
    ids: ['shu-di-huang', 'huang-jing']
  },
  {
    file: 'shengdi_rehmannia.jpg',
    partLabel: 'Sinh Địa Hoàng Phiến (Củ Địa Hoàng Khô Sống Nhăn Xám Đen)',
    processingNote: 'Rễ củ Sinh địa sấy khô nguyên bản không đồ rượu, vỏ nhăn xám nâu mặt cắt nâu đen dẻo nhựa thanh nhiệt lương huyết sinh tân',
    ids: ['sheng-di-huang']
  },
  {
    file: 'xuanshen_scrophularia.jpg',
    partLabel: 'Huyền Sâm Phiến (Lát Xéo Rễ Huyền Sâm Vỏ Xám Ruột Đen Tuyền)',
    processingNote: 'Rễ Huyền sâm ủ đen bên trong (thịt đen vỏ xám nứt tia) thái vát thanh nhiệt lương huyết tư âm giải độc tán kết',
    ids: ['xuan-shen']
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
    partLabel: 'Đan Sâm, Địa Du, Tục Đoạn & Ba Kích (Rễ Nâu Đỏ Hoạt Huyết / Bổ Thận)',
    processingNote: 'Đoạn rễ vỏ nâu đỏ hoặc rút lõi gỗ, sao rượu thông huyết mạch bổ thận',
    ids: ['dan-shen', 'di-yu', 'tuc-doan', 'ba-ji-tian']
  },
  {
    file: 'chishao_red_peony.jpg',
    partLabel: 'Xích Thược Phiến (Lát Cắt Rễ Thược Dược Còn Vỏ Vân Hoa Cúc Hồng Kem)',
    processingNote: 'Rễ Xích thược để nguyên vỏ nâu thô thái phiến tròn ruột trắng hồng nổi rõ tia gỗ hình hoa cúc thanh nhiệt lương huyết tán ứ chỉ thống',
    ids: ['chi-shao']
  },
  {
    file: 'zicao_lithospermum.jpg',
    partLabel: 'Tử Thảo (Vỏ Rễ Xoắn Màu Tím Đậm Bong Lớp Mỏng)',
    processingNote: 'Rễ Tử thảo Tân Cương rỗng xoắn nhiều lớp vỏ mỏng màu tím tía đậm chứa Shikonin thanh nhiệt lương huyết hoạt huyết giải độc thấu chẩn',
    ids: ['zi-cao']
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
    processingNote: 'Thân rễ cắt lát xéo phơi khô hoặc tẩm rượu/giấm bào chế',
    ids: ['mu-xiang', 'sheng-ma', 'cot-toai-bo', 'tan-giao', 'wei-ling-xian', 'long-dan-cao', 'shi-chang-pu', 'qian-nian-jian', 'she-gan', 'gan-sui', 'bai-tou-weng', 'tu-uyen', 'bai-wei', 'xian-mao']
  },
  {
    file: 'lugen_reed_rhizome.jpg',
    partLabel: 'Lô Căn (Đoạn Thân Rễ Cây Sậy Vàng Ngà Rỗng Giữa Có Đốt Vòng)',
    processingNote: 'Thân rễ Sậy cạo vỏ cắt khúc trụ tròn rỗng ruột màu vàng rơm bóng nhẹ thanh Phế Vị nhiệt sinh tân chỉ khát chỉ ẩu',
    ids: ['lu-gen']
  },
  {
    file: 'zhimu_anemarrhena.jpg',
    partLabel: 'Tri Mẫu Phiến (Lát Thân Rễ Dẹt Vàng Nâu Phủ Lông Tơ Mao Tri Mẫu)',
    processingNote: 'Thân rễ Tri mẫu thái phiến mỏng mặt cắt vàng trắng viền mép giữ rìa lông tơ vàng nâu thanh nhiệt tả hỏa tư âm nhuận táo',
    ids: ['zhi-mu']
  },
  {
    file: 'xi_xin_asarum.jpg',
    partLabel: 'Tế Tân (Bó Rễ Chùm Nhỏ Thon Mảnh Màu Xám Nâu Thơm Cay)',
    processingNote: 'Toàn phần rễ chùm tơ mảnh bó gọn kèm thân rễ có đốt nhăn mùi cay thơm nồng giải biểu tán hàn khu phong chỉ thống ôn phế hóa ẩm',
    ids: ['xi-xin']
  },
  {
    file: 'chai_hu_bupleurum.jpg',
    partLabel: 'Sài Hồ (Đoạn Rễ Phân Nhánh Nâu Đất Cắt Khúc Sơ Can Thấu Biểu)',
    processingNote: 'Rễ Sài hồ phân nhánh màu nâu xám cắt khúc ngắn mặt cắt xơ trắng vàng hòa giải thiếu dương sơ can giải uất thăng dương',
    ids: ['chai-hu']
  },
  {
    file: 'xiang_fu_cyperus.jpg',
    partLabel: 'Hương Phụ (Thân Củ Hình Thoi Nâu Đen Có Đốt Vòng Tứ Chế)',
    processingNote: 'Thân củ Cỏ gấu bỏ lông rễ mài sạch hoặc thái đôi lộ lõi sáp vàng nâu sơ can lý khí điều kinh chỉ thống',
    ids: ['xiang-fu']
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
    partLabel: 'Diệp Phiến Cắt Đoạn (Tỳ Bà Diệp / Trắc Bách Diệp / Actiso)',
    processingNote: 'Lá xanh cắt đoạn chải sạch lông tơ thanh phế lương huyết',
    ids: ['trac-bach-diep', 'pi-pa-ye', 'actiso']
  },
  {
    file: 'danzhuye_lophatherum.jpg',
    partLabel: 'Đạm Trúc Diệp (Lá Cỏ Lông Heo Gân Song Song & Thân Rỗng Xanh)',
    processingNote: 'Thân lá Đạm trúc diệp bó lọn phơi khô xanh nhạt thanh tâm trừ phiền lợi niệu thông lâm',
    ids: ['dan-zhu-ye']
  },
  {
    file: 'ngai_diep_new.jpg',
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
    partLabel: 'Toàn Thảo Cắt Khúc (Kinh Giới / Hương Nhu / Ích Mẫu / Kế)',
    processingNote: 'Toàn cây trên mặt đất cắt khúc phơi khô chuẩn Dược điển Bensky',
    ids: ['jing-jie', 'xiang-ru', 'yi-mu-cao', 'xian-he-cao', 'da-ji-thao', 'xiao-ji', 'lac-tien', 'rau-meo']
  },
  {
    file: 'pugongying_dandelion.jpg',
    partLabel: 'Bồ Công Anh (Toàn Thảo Lá Răng Cưa Kèm Hoa Vàng & Rễ Cái)',
    processingNote: 'Toàn cây Bồ công anh phơi âm can giữ nguyên lá xẻ thùy sâu và cụm hoa vàng khô thanh nhiệt giải độc tiêu ung tán kết thông sữa',
    ids: ['pu-gong-ying']
  },
  {
    file: 'zihuadiding_violet.jpg',
    partLabel: 'Tử Hoa Địa Đinh (Cây Hoa Tím Lá Thon Dài Kèm Rễ Trắng)',
    processingNote: 'Toàn cây Tử hoa địa đinh phơi khô giữ nguyên hoa tím đặc trưng thanh nhiệt giải độc lương huyết tiêu đinh nhọt rắn cắn',
    ids: ['zi-hua-di-ding']
  },
  {
    file: 'chuanxinlian_andrographis.jpg',
    partLabel: 'Xuyên Tâm Liên (Thân Vuông Xanh Cắt Khúc Kèm Lá Thon Nhọn)',
    processingNote: 'Phần trên mặt đất thân vuông xanh cắt khúc giàu Andrographolide rất đắng thanh nhiệt giải độc táo thấp tiêu thũng',
    ids: ['chuan-xin-lian']
  },
  {
    file: 'yuxingcao_houttuynia.jpg',
    partLabel: 'Ngư Tinh Thảo / Diếp Cá (Lá Hình Tim Mặt Dưới Tím Đỏ & Bông Hoa Vàng)',
    processingNote: 'Toàn thân lá Giấp cá phơi âm can giữ lá hình tim và bông hoa vàng thanh nhiệt giải độc tiêu ung bài nùng phế ung',
    ids: ['yu-xing-cao']
  },
  {
    file: 'qinghao_artemisia.jpg',
    partLabel: 'Thanh Hao (Cành Lá Xanh Lục Xẻ Thùy Lông Chim Mịn Thơm)',
    processingNote: 'Phần trên mặt đất Thanh hao hoa vàng phơi râm giàu Artemisinin thanh hư nhiệt trừ cốt chưng giải thử cắt sốt rét',
    ids: ['qing-hao']
  },
  {
    file: 'yinchenhao_capillaris.jpg',
    partLabel: 'Nhân Trần Hao / Miên Nhân Trần (Chồi Non Lông Tơ Trắng Bạc)',
    processingNote: 'Chồi non mùa xuân phủ lớp lông nhung trắng xám mịn thanh nhiệt lợi thấp thoái hoàng chuyên trị vàng da',
    ids: ['yin-chen-hao']
  },
  {
    file: 'prunella_spica_xiakucao.jpg',
    partLabel: 'Hạ Khô Thảo (Cụm Hoa Bông Khô Nâu Đỏ Thanh Can Tán Kết)',
    processingNote: 'Cụm hoa hình bông (Spica Prunellae) thu hái mùa hạ lúc chuyển nâu đỏ thanh can hỏa tán uất kết',
    ids: ['xia-ku-cao']
  },
  {
    file: 'small_leaf_herbs.jpg',
    partLabel: 'Thảo Dược Lá Nhỏ (Diệp Hạ Châu / Bán Biên Liên / Biển Súc)',
    processingNote: 'Thảo mộc thân mảnh lá nhỏ thanh nhiệt giải độc lợi niệu tán ứ',
    ids: ['diep-ha-chau', 'ban-bian-lian', 'ban-zhi-lian', 'bien-suc', 'han-lien-thao']
  },
  {
    file: 'jin_qian_cao.jpg',
    partLabel: 'Kim Tiền Thảo (Dây Thân Mảnh Mang Lá Tròn Hình Đồng Tiền)',
    processingNote: 'Toàn thân dây Kim tiền thảo phơi khô mang cặp lá tròn đối xứng lợi thấp thoái hoàng lợi niệu thông lâm bài thạch',
    ids: ['jin-qian-cao']
  },
  {
    file: 'bai_hua_she_she_cao.jpg',
    partLabel: 'Bạch Hoa Xà Thiệt Thảo (Thân Mảnh Lá Kim Kèm Quả Nang Nhỏ)',
    processingNote: 'Toàn cây Bạch hoa xà thiệt thảo thân mảnh lá hình dải nhọn mang quả nang đôi thanh nhiệt giải độc tiêu ung tán kết lợi thấp',
    ids: ['bai-hua-she-she-cao']
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
    partLabel: 'Mộc Bì (Vỏ Thân Cây Tần Bì / Hợp Hoan Bì / Hải Đồng Bì)',
    processingNote: 'Vỏ cây dày xù xì thái dải thanh nhiệt táo thấp hoặc giải uất an thần',
    ids: ['qin-pi', 'hop-hoan-bi', 'hai-tong-pi']
  },
  {
    file: 'huangbai_phellodendron.jpg',
    partLabel: 'Hoàng Bá (Phiến Vỏ Cây Vàng Tươi Nhiều Sợi Dẻo Cạo Bần)',
    processingNote: 'Vỏ thân cây Hoàng bá cạo sạch vỏ bần xù xì còn lớp vỏ giữa màu vàng chanh tươi giàu Berberine thanh nhiệt táo thấp tả tướng hỏa',
    ids: ['huang-bai']
  },
  {
    file: 'areca_peel_daiphucbi.jpg',
    partLabel: 'Đại Phúc Bì (Xơ Vỏ Quả Cau Vàng Nâu Hạ Khí Hành Thủy)',
    processingNote: 'Vỏ quả cau già xé tơi phơi khô thành bó sợi vàng nâu hành khí khoan trung hạ khí lợi thủy tiêu thũng',
    ids: ['dai-phuc-bi']
  },
  {
    file: 'rou_gui.jpg',
    partLabel: 'Nhục Quế (Vỏ Thân Quế Dày Giàu Tinh Dầu Ôn Bổ Mệnh Môn)',
    processingNote: 'Vỏ thân quế dày nhiều dầu mùi thơm nồng bổ hỏa trợ dương dẫn hỏa quy nguyên',
    ids: ['rou-gui']
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
    file: 'hong_hua_new.jpg',
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

const DEDICATED_LOCAL_90: Record<string, string> = {
  'day-dau-xuong': 'day_dau_xuong_tinospora.jpg',
  'hai-feng-teng': 'hai_feng_teng_kadsura.jpg',
  'luo-shi-teng': 'luo_shi_teng_trachelospermum.jpg',
  'la-lot': 'la_lot_piper_lolot.jpg',
  'xi-he-liu': 'xi_he_liu_tamarisk.jpg',
  'gao-ben': 'gao_ben_ligusticum.jpg',
  'ju-ye': 'ju_ye_chrysanthemum_leaf.jpg',
  'bo-he': 'bo_he_mint.jpg',
  'sang-ye': 'sang_ye_mulberry_leaf.jpg',
  'cu-chai-hu': 'cu_chai_hu.jpg',
  'e-bu-shi-cao': 'e_bu_shi_cao.jpg',
  'xiang-ru': 'xiang_ru.jpg',
  'tu-jing-jie': 'tu_jing_jie.jpg',
  'mu-zei': 'mu_zei.jpg',
  'wei-jiang': 'wei_jiang.jpg',
  'hu-sui': 'hu_sui.jpg',
  'ye-ju-hua': 'ye_ju_hua.jpg',
  'he-ye-di': 'he_ye_di.jpg',
  'bach-cap': 'bach_cap.jpg',
  'bai-mao-gen': 'bai_mao_gen.jpg',
  'chuan-niu-xi': 'chuan_niu_xi.jpg',
  'da-ji-thao': 'da_ji_thao.jpg',
  'dan-shen': 'dan_shen_new.jpg',
  'di-huang-tan': 'di_huang_tan.jpg',
  'di-yu': 'di_yu.jpg',
  'di-yu-tan': 'di_yu_tan.jpg',
  'gan-qi': 'gan_qi.jpg',
  'hong-hua': 'hong_hua_new.jpg',
  'hua-rui-shi': 'hua_rui_shi.jpg',
  'huai-jiao': 'huai_jiao.jpg',
  'juan-bai': 'juan_bai.jpg',
  'ling-xiao-hua': 'ling_xiao_hua.jpg',
  'liu-ji-nu': 'liu_ji_nu.jpg',
  'meng-chong': 'meng_chong.jpg',
  'nga-truat': 'nga_truat.jpg',
  'ngai-diep': 'ngai_diep_new.jpg',
  'ou-jie': 'ou_jie.jpg',
  'pao-jiang': 'pao_jiang.jpg',
  'qian-cao': 'qian_cao.jpg',
  'ru-xiang': 'ru_xiang_new.jpg',
  'shui-zhi': 'shui_zhi.jpg',
  'tam-lang': 'tam_lang.jpg',
  'tao-ren': 'tao_ren.jpg',
  'trac-bach-diep': 'trac_bach_diep.jpg',
  'tu-bie-chong': 'tu_bie_chong.jpg',
  'wang-bu-liu-xing': 'wang_bu_liu_xing.jpg',
  'wang-bu-liu-xing-ch10': 'wang_bu_liu_xing_ch10.jpg',
  'xia-tian-wu': 'xia_tian_wu.jpg',
  'xian-he-cao': 'xian_he_cao.jpg',
  'xian-he-cao-zi-zhu': 'xian_he_cao_zi_zhu.jpg',
  'xiao-ji': 'xiao_ji.jpg',
  'xue-jie': 'xue_jie.jpg',
  'yi-mu-cao': 'yi_mu_cao.jpg',
  'yu-jin': 'yu_jin.jpg',
  'gao-liang-jiang': 'gao_liang_jiang.jpg',
  'hong-dou-kou': 'hong_dou_kou.jpg',
  'hu-jiao': 'hu_jiao.jpg',
  'rou-gui': 'rou_gui.jpg',
  'ba-ji-tian': 'ba_ji_tian.jpg',
  'bai-bian-dou': 'bai_bian_dou.jpg',
  'bei-sha-shen': 'bei_sha_shen.jpg',
  'bie-jia-jiao': 'bie_jia_jiao.jpg',
  'bu-gu-zhi': 'bu_gu_zhi.jpg',
  'chao-bai-zhu': 'chao_bai_zhu.jpg',
  'ci-wu-jia': 'ci_wu_jia.jpg',
  'cot-toai-bo': 'cot_toai_bo.jpg',
  'dan-shen-jiu': 'dan_shen_jiu_heshouwu.jpg',
  'dang-gui': 'dang_gui_new.jpg',
  'dinh-lang': 'dinh_lang.jpg',
  'dong-chong-substitute': 'dong_chong_sub.jpg',
  'du-zhong': 'du_zhong_new.jpg',
  'feng-mi': 'feng_mi.jpg',
  'gou-qi-ye': 'gou_qi_ye.jpg',
  'gou-qi-zi': 'gou_qi_zi_new.jpg',
  'gui-ban-jiao': 'gui_ban_jiao.jpg',
  'hai-long': 'hai_long.jpg',
  'hai-ma': 'hai_ma.jpg',
  'han-lien-thao': 'han_lien_thao.jpg',
  'hei-dou': 'hei_dou.jpg',
  'hei-zhi-ma': 'hei_zhi_ma.jpg',
  'hong-jing-tian': 'hong_jing_tian.jpg',
  'ming-dang-shen': 'ming_dang_shen.jpg',
  'nan-sha-shen': 'nan_sha_shen.jpg',
  'sha-yuan-zi': 'sha_yuan_zi.jpg',
  'shan-yao': 'shan_yao_new.jpg',
  'shu-di-huang': 'shu_di_huang_new.jpg',
  'suo-yang': 'suo_yang.jpg',
  'tai-zi-shen': 'tai_zi_shen.jpg',
  'tho-ty-tu': 'tho_ty_tu.jpg',
  'tian-men-dong': 'tian_men_dong.jpg',
};

for (const [id, file] of Object.entries(DEDICATED_LOCAL_90)) {
  HERB_SPEC_MAP[id] = {
    file: `/assets/images/herbs/${file}`,
    variantClass: '',
    partLabel: '',
    processingNote: 'Mẫu dược liệu bào chế chuẩn Dược điển Bensky & Dược điển Việt Nam',
    isDedicatedSingle: true,
  };
}

// 46 classic TCM herbs restored to their exact dedicated studio white-background specimen photos
const RIGHTFUL_STUDIO_OWNERS: Record<string, string> = {
  'thach-quyet-minh': 'abalone_shell_thachquyetminh.jpg',
  'fu-zi': 'aconite_fuzi.jpg',
  'xing-ren': 'apricot_peach_kernels.jpg',
  'dai-phuc-bi': 'areca_peel_daiphucbi.jpg',
  'truc-nhu': 'bamboo_shavings_trucnhu.jpg',
  'zhi-shi': 'bitter_orange_round_fruits.jpg',
  'ci-shi': 'black_magnetite_cishi.jpg',
  'o-mai': 'black_smoked_plums.jpg',
  'bing-pian': 'borneol_bingpian.jpg',
  'yin-yang-huo': 'broad_leaf_herbs.jpg',
  'hou-po': 'curved_dark_bark.jpg',
  'pi-pa-ye': 'cut_bamboo_lotus_leaves.jpg',
  'phan-ta-diep': 'cut_green_mint_mulberry.jpg',
  'tram-huong': 'dark_agarwood_tramhuong.jpg',
  'huang-jing': 'dark_black_cured_roots.jpg',
  'thao-qua': 'dark_tsaoko_pods.jpg',
  'di-long': 'dried_earthworms.jpg',
  'quan-xie': 'dried_scorpion_quanxie.jpg',
  'long-gu': 'fossil_dragon_bone.jpg',
  'chuan-xiong': 'gnarled_chuanxiong_slices.jpg',
  'huang-lian': 'golden_yellow_rhizomes.jpg',
  'jin-yin-hua': 'honeysuckle_flower_buds.jpg',
  'bai-he': 'lily_bulb_baihe.jpg',
  'lian-xin': 'lotus_plumule_lianxin.jpg',
  'ma-qian-zi': 'nux_vomica_maqianzi.jpg',
  'mu-li': 'oyster_abalone_shells.jpg',
  'huang-qi': 'pale_sliced_roots.jpg',
  'tru-linh': 'polyporus_trulinh_slices.jpg',
  'zhu-sha': 'red_cinnabar_zhusha.jpg',
  'shan-zhu-yu': 'red_goji_berries.jpg',
  'qin-pi': 'rough_tree_bark.jpg',
  'hua-jiao': 'sichuan_pepper_huajiao.jpg',
  'jie-geng': 'sliced_angelica_peony.jpg',
  'shan-zha': 'sliced_hawthorn_rings.jpg',
  'hoa-hoe': 'sophora_bud_hoahoe.jpg',
  'mai-men-dong': 'translucent_ophiopogon_tubers.jpg',
  'hu-tao-rou': 'walnut_hutaorou.jpg',
  'chuan-bei-mu': 'white_fritillaria_bulbs.jpg',
  'lien-tu': 'white_lotus_seeds.jpg',
  'ban-xia': 'white_pinellia_tubers.jpg',
  'bai-jiang-can': 'white_silkworms.jpg',
  'ke-huyet-dang': 'woody_liana_slices.jpg',
  'kha-tu': 'wrinkled_chebula_khatu.jpg',
  'wu-ling-zhi': 'wulingzhi_resin_grains.jpg',
  'bo-hoang': 'yellow_pollen_bohoang.jpg',
  'liu-huang': 'yellow_sulfur_liuhuang.jpg',
};

for (const [id, file] of Object.entries(RIGHTFUL_STUDIO_OWNERS)) {
  const prev = HERB_SPEC_MAP[id];
  HERB_SPEC_MAP[id] = {
    file: `/assets/images/herbs/${file}`,
    variantClass: '',
    partLabel: prev?.isDedicatedSingle ? prev.partLabel : '',
    processingNote: prev?.isDedicatedSingle
      ? prev.processingNote
      : 'Mẫu dược liệu bào chế chuẩn Dược điển Bensky & Dược điển Việt Nam',
    isDedicatedSingle: true,
  };
}

function getExactBotanicalPartLabel(herb: Herb): string {
  const bot = herb.botanicalName.toLowerCase();
  const vn = herb.vietnameseName.toLowerCase();

  let partDesc = '';

  if (/\bcarbonisat(a|um|us)\b/.test(bot) || vn.includes('thán')) {
    partDesc = 'Dược Liệu Sao Thán (Cháy Đen Tồn Tính Chỉ Huyết)';
  } else if (bot.includes('cum melle') || vn.includes('chích mật')) {
    partDesc = 'Chích Mật Ong Bổ Tỳ Nhuận Phế';
  } else if (bot.includes('radix') && bot.includes('rhizoma')) {
    partDesc = 'Rễ & Thân Rễ Thái Phiến Bào Chế Khô';
  } else if (bot.includes('extremitas radicis')) {
    partDesc = 'Đuôi Rễ Thái Lát Hoạt Huyết Phá Ứ';
  } else if (bot.includes('radix') || bot.includes('pseudobulbus')) {
    partDesc = 'Rễ Củ Thái Phiến Bào Chế Khô';
  } else if (bot.includes('nodus') && bot.includes('rhizomatis')) {
    partDesc = 'Đốt Ngó Rễ Phơi Khô Chỉ Huyết';
  } else if (bot.includes('rhizoma')) {
    partDesc = 'Thân Rễ Thái Lát Phơi Sấy Khô';
  } else if (bot.includes('folium')) {
    partDesc = 'Lá Thu Hái Phơi Âm Can (Diệp Phiến)';
  } else if (bot.includes('flos') || bot.includes('plumula')) {
    partDesc = 'Nụ Hoa / Tâm Mầm Sấy Khô Giữ Tinh Dầu';
  } else if (bot.includes('stamen')) {
    partDesc = 'Nhị Hoa Phơi Mát Giữ Hương Cố Sáp';
  } else if (bot.includes('receptaculum')) {
    partDesc = 'Đài / Gương Sen Già Phơi Khô';
  } else if (bot.includes('spica')) {
    partDesc = 'Cụm Hoa Bông Khô Thu Hái Sấy Khô';
  } else if (bot.includes('pollen')) {
    partDesc = 'Bột Phấn Hoa Mịn Thu Hái Sấy Khô';
  } else if (bot.includes('exocarpium') || bot.includes('pericarpium') || bot.includes('testa')) {
    partDesc = 'Vỏ Quả / Vỏ Hạt Phơi Khô Bào Chế';
  } else if (bot.includes('retinervus')) {
    partDesc = 'Xơ Múi Quả Quýt Phơi Khô Thông Lạc';
  } else if (bot.includes('calyx') || bot.includes('pedicellus')) {
    partDesc = 'Đài Quả / Cuống Quả Thu Hái Sấy Khô';
  } else if (bot.includes('stigma')) {
    partDesc = 'Vòi Nhụy Phơi Mát Sấy Khô';
  } else if (bot.includes('fructus')) {
    partDesc = 'Quả Chín Thu Hái Sấy Khô / Sao Chế';
  } else if (bot.includes('semen')) {
    partDesc = 'Hạt Già Chọn Lọc Phơi Khô / Sao Thơm';
  } else if (/\bspora\b/.test(bot)) {
    partDesc = 'Bào Tử Mịn Rây Sạch Lợi Niệu Thông Lâm';
  } else if (bot.includes('cortex')) {
    partDesc = 'Vỏ Thân / Vỏ Rễ Cạo Bần Bào Chế';
  } else if (bot.includes('cacumen')) {
    partDesc = 'Ngọn Cành Mang Lá Thái Đoạn Phơi Khô';
  } else if (bot.includes('medulla')) {
    partDesc = 'Lõi Thân Trắng Xốp Thái Phiến';
  } else if (bot.includes('petiolus')) {
    partDesc = 'Cuống Lá / Bẹ Lá Phơi Khô Thái Đoạn';
  } else if (bot.includes('spina')) {
    partDesc = 'Gai Thân Cây Thái Phiến Sấy Khô';
  } else if (bot.includes('caulis') || bot.includes('ramulus') || bot.includes('lignum')) {
    partDesc = 'Thân Cành / Lõi Gỗ / Dây Đằng Thái Phiến Phơi Khô';
  } else if (bot.includes('bulbus')) {
    partDesc = 'Vảy Thân Hành Tách Rời Đồ Sấy Khô';
  } else if (
    bot.includes('sclerotium') ||
    bot.includes('polyporus') ||
    bot.includes('poria') ||
    bot.includes('ganoderma') ||
    bot.includes('tremella') ||
    bot.includes('omphalia') ||
    bot.includes('lasiosphaera') ||
    bot.includes('galla')
  ) {
    partDesc = 'Thể Quả Nấm / Ngũ Bội Tử Bào Chế Khô';
  } else if (bot.includes('herba')) {
    partDesc = 'Toàn Thảo Cắt Đoạn Phơi Khô';
  } else if (bot.includes('thallus') || bot.includes('sargassum')) {
    partDesc = 'Tảo Biển Phơi Khô Rửa Sạch Muối';
  } else if (bot.includes('cornu')) {
    partDesc = 'Sừng / Nhung Bào Phiến Mỏng Sắc Trước';
  } else if (bot.includes('colla')) {
    partDesc = 'Cao Dược Liệu Cô Đặc Hòa Tan Nước Thuốc Nóng';
  } else if (bot.includes('endothelium')) {
    partDesc = 'Màng Trong Mề Gà Sao Cát Nở Vàng Tiêu Thực';
  } else if (bot.includes('squama') || bot.includes('corium')) {
    partDesc = 'Vảy / Da Động Vật Bào Chế Chế Cát (Nhóm Hạn Chế Bảo Tồn)';
  } else if (
    bot.includes('carapax') ||
    bot.includes('plastrum') ||
    bot.includes('concha') ||
    bot.includes('endoconcha') ||
    bot.includes('margarita')
  ) {
    partDesc = 'Mai / Yếm / Vỏ Xác Nung Giã Vụn Chích Giấm';
  } else if (bot.includes('os ') || bot.includes('ossis') || bot.includes('fossilia') || bot.includes('dens')) {
    partDesc = 'Xương / Răng Hóa Thạch Đập Vụn Trọng Trấn';
  } else if (bot.includes('periostracum')) {
    partDesc = 'Vỏ Xác Lột Làm Sạch Sao Thơm';
  } else if (
    bot.includes('bungarus') ||
    bot.includes('zaocys') ||
    bot.includes('hippocampus') ||
    bot.includes('syngnathus') ||
    bot.includes('eupolyphaga') ||
    bot.includes('hirudo') ||
    bot.includes('tabanus') ||
    bot.includes('aspongopus') ||
    bot.includes('bombyx') ||
    bot.includes('mylabris') ||
    bot.includes('pheretima') ||
    bot.includes('scorpio') ||
    bot.includes('nidus')
  ) {
    partDesc = 'Côn Trùng / Động Vật Dược Dùng Phơi Sấy Sao Chế';
  } else if (bot.includes('faeces')) {
    partDesc = 'Phân Động Vật Dược Dụng Sao Thơm Bào Chế';
  } else if (bot.includes('crinis')) {
    partDesc = 'Tóc Đốt Thành Than Huyết Dư Thán Chỉ Huyết';
  } else if (bot.includes('fel ')) {
    partDesc = 'Mật Động Vật Cô Đặc (Hạn Chế Bảo Tồn CITES)';
  } else if (bot.includes('venenum')) {
    partDesc = 'Nhựa Độc Động Vật Tinh Chế Vi Lượng (Độc Mạnh)';
  } else if (
    bot.includes('gypsum') ||
    bot.includes('mirabilit') ||
    bot.includes('natrii') ||
    bot.includes('talc') ||
    bot.includes('alumen') ||
    bot.includes('borax') ||
    bot.includes('magnetit') ||
    bot.includes('haematit') ||
    bot.includes('cinnabar') ||
    bot.includes('sulfur') ||
    bot.includes('calcit') ||
    bot.includes('pumex') ||
    bot.includes('chloriti') ||
    bot.includes('pyrit') ||
    bot.includes('halloysit') ||
    bot.includes('limonit') ||
    bot.includes('ophicalcit') ||
    bot.includes('actinolit') ||
    bot.includes('fluorit') ||
    bot.includes('realgar') ||
    bot.includes('calamina') ||
    bot.includes('calomelas') ||
    bot.includes('chalcanthit') ||
    bot.includes('arsenolit') ||
    bot.includes('minium') ||
    bot.includes('hydrargyrum') ||
    bot.includes('lithargyrum') ||
    bot.includes('sal ammoniacus') ||
    bot.includes('frusta') ||
    bot.includes('terra')
  ) {
    partDesc = 'Khoáng Thạch / Thổ Dược Nung Đỏ, Thủy Phi Hoặc Sắc Trước';
  } else if (
    bot.includes('olibanum') ||
    bot.includes('myrrha') ||
    bot.includes('moschus') ||
    bot.includes('succinum') ||
    bot.includes('aloe') ||
    bot.includes('resina') ||
    bot.includes('sanguis') ||
    bot.includes('styrax') ||
    bot.includes('benzoinum') ||
    bot.includes('camphora') ||
    bot.includes('borneol') ||
    bot.includes('catechu') ||
    bot.includes('concretio')
  ) {
    partDesc = 'Nhựa Thơm / Cao Nhựa / Hương Dược Tinh Chế';
  } else if (bot.includes('indigo')) {
    partDesc = 'Bột Chàm Lọc Mịn Thủy Phi (Thanh Đại)';
  } else if (bot.includes('succus') || /\bmel\b/.test(bot) || bot.includes('saccharum') || bot.includes('cera')) {
    partDesc = 'Dịch Chiết / Mật Đường / Sáp Ong Dược Dụng';
  } else {
    partDesc = 'Dược Liệu Bào Chế Chuẩn Dược Điển Bensky';
  }

  return `${herb.vietnameseName} (${herb.chineseCharacters}) — ${partDesc}`;
}

function resolveFallbackSpecimenPhoto(herb: Herb): { file: string; variantClass: string } {
  const bot = herb.botanicalName.toLowerCase();
  const vn = herb.vietnameseName.toLowerCase();
  const id = herb.id;
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  const variantClass = VARIANT_CLASSES[hash % VARIANT_CLASSES.length];

  // Specific prepared form overrides (matched by actual pharmacological identity, not placeholder IDs)
  const SPECIFIC_PREPARED_FILE: Record<string, string> = {
    'zhi-gan-cao': 'licorice_gancao.jpg',
    'chao-bai-zhu': 'atractylodes_baizhu.jpg',
    'cu-yan-hu-suo': 'aconite_fuzi.jpg', // Dan Fu Pian (Pao Fu Zi)
    'zhu-ru-jiang': 'aconite_fuzi.jpg', // Sheng Cao Wu
    'dan-shen-jiu': 'cured_heshouwu.jpg', // Zhi He Shou Wu
    'jiu-huang-jing': 'dark_black_cured_roots.jpg', // Jiu Huang Jing
    'jiu-huang-qin': 'scutellaria_huangqin.jpg',
    'jiu-da-huang': 'rhubarb_dahuang.jpg',
    'hong-shen': 'hong_shen_red_ginseng.jpg',
    'cu-chai-hu': 'chai_hu_bupleurum.jpg',
    'chuan-niu-xi': 'niuxi_achyranthes.jpg',
    'zhu-ye': 'danzhuye_lophatherum.jpg',
    'zhu-ye-juan-xin': 'danzhuye_lophatherum.jpg',
    'dong-chong-substitute': 'whole_ginseng_roots.jpg', // Ren Shen Xu
    'sha-chao-ji-nei-jin': 'golden_gizzard_lining.jpg',
    'shu-shan-zha': 'sliced_hawthorn_rings.jpg',
    'da-ji-mu': 'fibrous_cyperus_rhizomes.jpg', // Wei Mu Xiang
    'sheng-di-gu-pi': 'xiang_fu_cyperus.jpg', // Si Zhi Xiang Fu
    'jiu-dang-gui': 'sliced_angelica_peony.jpg', // Dang Gui Wei
    'mi-ma-huang': 'green_ephedra_stems.jpg',
    'mi-bai-bu': 'translucent_ophiopogon_tubers.jpg',
    'mi-pi-pa-ye': 'cut_bamboo_lotus_leaves.jpg',
    'zhu-li': 'bamboo_shavings_trucnhu.jpg',
    'tian-zhu-huang': 'bamboo_shavings_trucnhu.jpg',
    'deng-xin-cao': 'white_pith_thongthao.jpg',
    'lian-fang': 'lotus_plumule_lianxin.jpg',
    'lian-xu': 'corn_silk_yumixu.jpg',
    'he-geng': 'cut_bamboo_lotus_leaves.jpg',
    'ou-jie': 'fibrous_cyperus_rhizomes.jpg',
    'lu-jiao-jiao': 'black_donkey_gelatin.jpg',
    'gui-ban-jiao': 'black_donkey_gelatin.jpg',
    'bie-jia-jiao': 'black_donkey_gelatin.jpg',
    'she-chuang-zi-ch18': 'white_gypsum_crystals.jpg', // Ku Fan
    'hai-fu-shi': 'fossil_dragon_bone.jpg',
    'hua-rui-shi': 'black_magnetite_cishi.jpg',
    'yang-qi-shi': 'abalone_shell_thachquyetminh.jpg',
    'zhu-jie-shen': 'notoginseng_sanqi.jpg',
    'hu-huang-lian': 'golden_yellow_rhizomes.jpg',
    'ling-zhi': 'polyporus_trulinh_slices.jpg',
    'yin-er': 'white_poria_cubes.jpg',
    'qing-dai': 'black_aloe_luhui.jpg',
    'feng-mi': 'golden_frankincense_resin.jpg',
    'yi-tang': 'golden_frankincense_resin.jpg',
    'feng-jiao': 'yellow_sulfur_liuhuang.jpg',
    'gua-di': 'persimmon_calyx_shidi.jpg',
    'ya-zhi-cao': 'small_leaf_herbs.jpg',
    'ming-dang-shen': 'codonopsis_dangshen.jpg',
    'nan-sha-shen': 'codonopsis_dangshen.jpg',
    'xu-chang-qing': 'codonopsis_dangshen.jpg',
    'ji-xue-cao': 'fresh_centella_leaves.jpg',
  };

  if (SPECIFIC_PREPARED_FILE[id]) {
    return {
      file: `/assets/images/herbs/${SPECIFIC_PREPARED_FILE[id]}`,
      variantClass
    };
  }

  let file = 'pale_sliced_roots.jpg';

  // 0. Charred / Carbonized Herbs (Sao thán)
  if (/\bcarbonisat(a|um|us)\b/.test(bot) || vn.includes('thán')) {
    file = 'dark_black_cured_roots.jpg';
  }
  // 1. Flowers / Spica / Buds / Pollen
  else if (bot.includes('flos') || bot.includes('spica') || bot.includes('plumula') || bot.includes('pollen')) {
    if (bot.includes('lonicera') || bot.includes('buddleja') || bot.includes('albizia') || bot.includes('pueraria')) {
      file = 'honeysuckle_flower_buds.jpg';
    } else if (bot.includes('magnolia') || bot.includes('genkwa') || bot.includes('farfara') || bot.includes('datura')) {
      file = 'magnolia_bud_xinyi.jpg';
    } else if (bot.includes('rosa') || bot.includes('campsis') || bot.includes('carthamus') || bot.includes('celosiae')) {
      file = 'hong_hua_new.jpg';
    } else if (bot.includes('mume') || bot.includes('sophora') || bot.includes('caryophylli')) {
      file = 'sophora_bud_hoahoe.jpg';
    } else if (bot.includes('spica')) {
      file = 'prunella_spica_xiakucao.jpg';
    } else {
      file = 'chrysanthemum_flowers.jpg';
    }
  }
  // 2. Bulbs / Allium
  else if (bot.includes('bulbus') || bot.includes('allii')) {
    if (bot.includes('lilii') || bot.includes('macrostemi') || bot.includes('sativi')) {
      file = 'lily_bulb_baihe.jpg';
    } else {
      file = 'white_fritillaria_bulbs.jpg';
    }
  }
  // 3. Leaves
  else if (bot.includes('folium') || bot.includes('cacumen')) {
    if (bot.includes('perilla') || bot.includes('isatidis') || bot.includes('callicarpa') || bot.includes('rhododendri')) {
      file = 'dark_perilla_leaves.jpg';
    } else if (bot.includes('bambusa') || bot.includes('nelumbinis') || bot.includes('platycladi') || bot.includes('eriobotrya')) {
      file = 'cut_bamboo_lotus_leaves.jpg';
    } else if (bot.includes('artemisiae') || bot.includes('pyrrosiae') || bot.includes('sennae')) {
      file = 'ngai_diep_new.jpg';
    } else if (bot.includes('apocyni') || bot.includes('lycii') || bot.includes('ju-ye')) {
      file = 'fresh_aromatic_leaves.jpg';
    } else {
      file = 'cut_green_mint_mulberry.jpg';
    }
  }
  // 4. Bark & Fruit Peel & Seed Coat
  else if (bot.includes('cortex') || bot.includes('pericarpium') || bot.includes('exocarpium') || bot.includes('testa')) {
    if (bot.includes('citri') || bot.includes('aurantii')) {
      file = 'dried_tangerine_peel.jpg';
    } else if (bot.includes('benincasae') || bot.includes('citrulli') || bot.includes('trichosanthis')) {
      file = 'bitter_orange_round_fruits.jpg';
    } else if (bot.includes('granati') || bot.includes('papaveris') || bot.includes('arecae') || bot.includes('phaseoli')) {
      file = 'areca_peel_daiphucbi.jpg';
    } else if (bot.includes('poriae')) {
      file = 'white_poria_cubes.jpg';
    } else if (bot.includes('mori') || bot.includes('cinnamomi')) {
      file = 'rou_gui.jpg';
    } else if (bot.includes('dictamni') || bot.includes('moutan') || bot.includes('pseudolaricis')) {
      file = 'moutan_bark_mudanpi.jpg';
    } else if (bot.includes('ailanthi') || bot.includes('acanthopanacis') || bot.includes('meliae') || bot.includes('schizophragmatis')) {
      file = 'curved_dark_bark.jpg';
    } else {
      file = 'rough_tree_bark.jpg';
    }
  }
  // 5. Stems / Twigs / Wood / Pith / Petiole / Liana / Spines
  else if (
    bot.includes('caulis') ||
    bot.includes('ramulus') ||
    bot.includes('lignum') ||
    bot.includes('medulla') ||
    bot.includes('retinervus') ||
    bot.includes('petiolus') ||
    bot.includes('spina')
  ) {
    if (bot.includes('medulla')) {
      file = 'white_pith_thongthao.jpg';
    } else if (bot.includes('santali') || bot.includes('aquilariae') || bot.includes('pini nodi') || bot.includes('dalbergiae')) {
      file = 'dark_agarwood_tramhuong.jpg';
    } else if (bot.includes('caesalpiniae') || bot.includes('sappan')) {
      file = 'red_sappan_wood_sumu.jpg';
    } else if (bot.includes('bambusae') || bot.includes('luffae')) {
      file = 'bamboo_shavings_trucnhu.jpg';
    } else if (bot.includes('mori') || bot.includes('perillae') || bot.includes('spina') || bot.includes('cinnamomi')) {
      file = 'cut_woody_twigs.jpg';
    } else {
      file = 'woody_liana_slices.jpg';
    }
  }
  // 6. Fungi / Poria / Ganoderma / Tremella / Puffball / Galls
  else if (
    bot.includes('ganoderma') ||
    bot.includes('tremella') ||
    bot.includes('omphalia') ||
    bot.includes('lasiosphaera') ||
    bot.includes('polyporus') ||
    bot.includes('poria') ||
    bot.includes('galla')
  ) {
    if (bot.includes('tremella') || bot.includes('omphalia')) {
      file = 'white_poria_cubes.jpg';
    } else {
      file = 'polyporus_trulinh_slices.jpg';
    }
  }
  // 7. Shells / Horn / Bone / Gelatin / Tooth / Carapace / Scales
  else if (
    bot.includes('concha') ||
    bot.includes('cornu') ||
    bot.includes('colla') ||
    bot.includes('plastrum') ||
    bot.includes('carapax') ||
    /\bos\b/.test(bot) ||
    bot.includes('dens') ||
    bot.includes('squama') ||
    bot.includes('corium') ||
    bot.includes('margarita')
  ) {
    if (bot.includes('haliotidis') || bot.includes('margaritifera')) {
      file = 'abalone_shell_thachquyetminh.jpg';
    } else if (bot.includes('concha') || bot.includes('margarita')) {
      file = 'oyster_abalone_shells.jpg';
    } else if (bot.includes('colla')) {
      file = 'black_donkey_gelatin.jpg';
    } else if (bot.includes('carapax') || bot.includes('plastrum')) {
      file = 'softshell_turtle_biejia.jpg';
    } else if (bot.includes('cornu')) {
      file = bot.includes('saigae') || bot.includes('bubali') || bot.includes('caprae') || bot.includes('naemorhedi')
        ? 'buffalo_horn_slices.jpg'
        : 'velvet_antler_slices.jpg';
    } else {
      file = 'fossil_dragon_bone.jpg';
    }
  }
  // 8. Minerals / Earth / Sulfur / Arsenic / Lead / Mercury
  else if (
    bot.includes('calcit') ||
    bot.includes('natrii') ||
    bot.includes('alumen') ||
    bot.includes('fluorit') ||
    bot.includes('chalcanthit') ||
    bot.includes('calamina') ||
    bot.includes('calomelas') ||
    bot.includes('sal ammoniacus') ||
    bot.includes('realgar') ||
    bot.includes('arsenolit') ||
    bot.includes('lithargyrum') ||
    bot.includes('minium') ||
    bot.includes('hydrargyrum') ||
    bot.includes('chloriti') ||
    bot.includes('pumex') ||
    bot.includes('pyrit') ||
    bot.includes('halloysit') ||
    bot.includes('limonit') ||
    bot.includes('actinolit') ||
    bot.includes('terra') ||
    bot.includes('ophicalcit') ||
    bot.includes('frusta') ||
    bot.includes('borax') ||
    bot.includes('talcum')
  ) {
    if (bot.includes('minium') || bot.includes('halloysit') || bot.includes('hydrargyrum') || bot.includes('realgar')) {
      file = 'red_cinnabar_zhusha.jpg';
    } else if (bot.includes('chloriti') || bot.includes('frusta') || bot.includes('pyrit') || bot.includes('limonit')) {
      file = 'black_magnetite_cishi.jpg';
    } else if (bot.includes('lithargyrum') || bot.includes('terra')) {
      file = 'yellow_sulfur_liuhuang.jpg';
    } else if (bot.includes('natrii') || bot.includes('borax') || bot.includes('alumen') || bot.includes('sal ammoniacus')) {
      file = 'borneol_bingpian.jpg';
    } else {
      file = 'white_gypsum_crystals.jpg';
    }
  }
  // 9. Resins / Honey (word boundary!) / Sugar / Wax / Bile / Venoms / Camphor / Carbon
  else if (
    bot.includes('resina') ||
    bot.includes('styrax') ||
    bot.includes('benzoinum') ||
    bot.includes('sanguis') ||
    bot.includes('camphora') ||
    bot.includes('catechu') ||
    bot.includes('venenum') ||
    bot.includes('cera') ||
    /\bmel\b/.test(bot) ||
    bot.includes('saccharum') ||
    /\bfel\b/.test(bot) ||
    bot.includes('indigo') ||
    bot.includes('crinis')
  ) {
    if (bot.includes('camphora')) {
      file = 'borneol_bingpian.jpg';
    } else if (bot.includes('cera') || /\bmel\b/.test(bot) || bot.includes('saccharum') || bot.includes('ferulae')) {
      file = 'golden_frankincense_resin.jpg';
    } else if (bot.includes('indigo') || bot.includes('crinis')) {
      file = 'black_aloe_luhui.jpg';
    } else if (bot.includes('sanguis') || bot.includes('styrax') || bot.includes('benzoinum')) {
      file = 'amber_hupo.jpg';
    } else {
      file = 'myrrh_moyao.jpg';
    }
  }
  // 10. Animals / Insects / Worms / Snakes / Seahorse / Wasp nest
  else if (
    bot.includes('bungarus') ||
    bot.includes('zaocys') ||
    bot.includes('periostracum') ||
    bot.includes('eupolyphaga') ||
    bot.includes('hirudo') ||
    bot.includes('tabanus') ||
    bot.includes('aspongopus') ||
    bot.includes('hippocampus') ||
    bot.includes('syngnathus') ||
    bot.includes('mylabris') ||
    bot.includes('bombyx') ||
    bot.includes('faeces') ||
    bot.includes('vespae')
  ) {
    if (bot.includes('bombyx') || bot.includes('periostracum')) {
      file = 'white_silkworms.jpg';
    } else if (bot.includes('faeces')) {
      file = 'wulingzhi_resin_grains.jpg';
    } else if (bot.includes('vespae')) {
      file = 'mantis_egg_sangpiaoxiao.jpg';
    } else if (bot.includes('hippocampus') || bot.includes('syngnathus')) {
      file = 'dried_gecko_gejie.jpg';
    } else if (bot.includes('hirudo') || bot.includes('bungarus') || bot.includes('zaocys')) {
      file = 'dried_earthworms.jpg';
    } else {
      file = 'dried_scorpion_quanxie.jpg';
    }
  }
  // 11. Seeds / Kernels / Spores
  else if (bot.includes('semen') || /\bspora\b/.test(bot)) {
    if (bot.includes('sojae nigrum') || bot.includes('celosiae') || bot.includes('allii')) {
      file = 'black_sesame_seeds.jpg';
    } else if (bot.includes('pini') || bot.includes('benincasae') || bot.includes('trigonellae') || bot.includes('nelumbinis') || bot.includes('euryales') || bot.includes('coicis')) {
      file = 'white_lotus_seeds.jpg';
    } else if (bot.includes('sterculiae') || bot.includes('momordicae') || bot.includes('hydnocarpi') || bot.includes('torreyae')) {
      file = 'walnut_hutaorou.jpg';
    } else if (bot.includes('canavaliae') || bot.includes('phaseoli') || bot.includes('pruni') || bot.includes('armeniacae')) {
      file = 'apricot_peach_kernels.jpg';
    } else if (bot.includes('oroxyli') || bot.includes('strychni')) {
      file = 'nux_vomica_maqianzi.jpg';
    } else if (/\bspora\b/.test(bot)) {
      file = 'yellow_pollen_bohoang.jpg';
    } else if (bot.includes('sojae preparatum')) {
      file = 'fermented_soy_dandouchi.jpg';
    } else {
      file = 'small_brown_seeds.jpg';
    }
  }
  // 12. Fruits / Pods / Calyx / Pedicellus
  else if (bot.includes('fructus') || bot.includes('calyx') || bot.includes('pedicellus') || bot.includes('receptaculum')) {
    if (bot.includes('galangae') || bot.includes('bruceae') || bot.includes('crataegi') || bot.includes('rosae laevigatae') || bot.includes('lycii')) {
      file = 'red_goji_berries.jpg';
    } else if (bot.includes('tritici')) {
      file = 'sprouted_barley_malt.jpg';
    } else if (bot.includes('gleditsiae') || bot.includes('ulmi') || bot.includes('mume') || bot.includes('aristolochiae')) {
      file = 'black_smoked_plums.jpg';
    } else if (bot.includes('aurantii') || bot.includes('citri') || bot.includes('trichosanthis') || bot.includes('siraitiae') || bot.includes('citrulli')) {
      file = 'bitter_orange_round_fruits.jpg';
    } else if (bot.includes('kochia') || bot.includes('piperis') || bot.includes('litseae') || bot.includes('anisi') || bot.includes('carpesii')) {
      file = 'sichuan_pepper_huajiao.jpg';
    } else if (bot.includes('forsythiae') || bot.includes('amomi') || bot.includes('tsaoko') || bot.includes('liquidambaris') || bot.includes('gardeniae')) {
      file = 'dark_tsaoko_pods.jpg';
    } else if (bot.includes('silybi') || bot.includes('sophorae') || bot.includes('polygoni')) {
      file = 'small_brown_seeds.jpg';
    } else if (bot.includes('xanthii')) {
      file = 'spiny_xanthium_cangerzi.jpg';
    } else {
      file = 'wrinkled_chebula_khatu.jpg';
    }
  }
  // 13. Whole Herbs (Herba)
  else if (bot.includes('herba')) {
    if (bot.includes('ephedrae') || bot.includes('cynomorii') || bot.includes('lycopodii') || bot.includes('orostachydis') || bot.includes('selaginellae') || bot.includes('artemisiae scopariae')) {
      file = 'green_ephedra_stems.jpg';
    } else if (bot.includes('portulacae') || bot.includes('commelinae') || bot.includes('hydrocotyles') || bot.includes('sedi') || bot.includes('duchesneae') || bot.includes('androsaces')) {
      file = 'small_leaf_herbs.jpg';
    } else if (bot.includes('ajugae') || bot.includes('leonuri') || bot.includes('menthae') || bot.includes('violae') || bot.includes('prunellae')) {
      file = 'prunella_spica_xiakucao.jpg';
    } else if (bot.includes('gynostemmatis') || bot.includes('ardisiae') || bot.includes('lycopi')) {
      file = 'broad_leaf_herbs.jpg';
    } else {
      file = 'cut_stem_herbs.jpg';
    }
  }
  // 14. Rhizomes & Tubers & Roots
  else if (bot.includes('rhizoma') || bot.includes('radix') || bot.includes('pseudobulbus')) {
    if (bot.includes('picrorhizae') || bot.includes('berberidis') || bot.includes('curcumae') || bot.includes('kaempferiae') || bot.includes('coptidis')) {
      file = 'golden_yellow_rhizomes.jpg';
    } else if (bot.includes('polygoni') || bot.includes('rubiae') || bot.includes('rhodiolae') || bot.includes('bistortae') || bot.includes('rhei')) {
      file = 'red_salvia_roots.jpg';
    } else if (bot.includes('aconiti')) {
      file = 'aconite_fuzi.jpg';
    } else if (bot.includes('pinelliae') || bot.includes('typhonii') || bot.includes('paridis') || bot.includes('cremastrae') || bot.includes('hemsleyae')) {
      file = 'white_pinellia_tubers.jpg';
    } else if (bot.includes('puerariae') || bot.includes('trichosanthis') || bot.includes('smilacis') || bot.includes('oryzae')) {
      file = 'white_yam_slices.jpg';
    } else if (bot.includes('adenophorae') || bot.includes('changii') || bot.includes('ginseng') || bot.includes('acanthopanacis')) {
      file = 'codonopsis_dangshen.jpg';
    } else if (bot.includes('phragmitis') || bot.includes('imperatae') || bot.includes('stemonae')) {
      file = 'translucent_ophiopogon_tubers.jpg';
    } else if (bot.includes('angelicae') || bot.includes('peucedani') || bot.includes('atractylodis') || bot.includes('ampelopsis') || bot.includes('dichroae')) {
      file = 'sliced_angelica_peony.jpg';
    } else if (bot.includes('notopterygii') || bot.includes('saposhnikoviae') || bot.includes('gentianae macrophyllae') || bot.includes('ligustici')) {
      file = 'fangfeng_root.jpg';
    } else if (bot.includes('stellariae') || bot.includes('bupleuri') || bot.includes('cyperi') || bot.includes('nardostachyos') || bot.includes('dioscoreae') || bot.includes('inulae') || bot.includes('euphorbiae')) {
      file = 'fibrous_cyperus_rhizomes.jpg';
    } else if (vn.includes('gừng') || bot.includes('zingiberis')) {
      file = 'dried_ginger_ganjiang.jpg';
    } else if (bot.includes('rhizoma')) {
      file = 'gnarled_chuanxiong_slices.jpg';
    } else {
      file = 'pale_sliced_roots.jpg';
    }
  }

  return {
    file: `/assets/images/herbs/${file}`,
    variantClass
  };
}

export function getHerbVisualSpec(herb: Herb): HerbVisualSpec & { variantClass?: string } {
  const uniquePrepared = HERB_PREPARED_UNIQUE[herb.id];
  const mapped = HERB_SPEC_MAP[herb.id];
  const exact = HERB_EXACT_PHOTOS[herb.id];
  const fallback = (uniquePrepared || mapped) ? null : resolveFallbackSpecimenPhoto(herb);

  const baseFile = uniquePrepared?.url || mapped?.file || fallback!.file;
  const partLabel = (!uniquePrepared && mapped?.isDedicatedSingle && mapped.partLabel)
    ? mapped.partLabel
    : getExactBotanicalPartLabel(herb);

  const cleanBensky = (herb.benskyNotes || '')
    .replace(/^Dan Bensky(\s*3rd Ed)?:\s*/i, '')
    .replace(/\.$/, '');
  const processingNote = uniquePrepared
    ? `${herb.vietnameseName} (${herb.botanicalName}): ${uniquePrepared.source}${cleanBensky ? ` — ${cleanBensky}` : ''}`
    : (mapped?.isDedicatedSingle && mapped.partLabel
      ? mapped.processingNote
      : `${herb.vietnameseName} (${herb.botanicalName}): ${mapped?.processingNote || 'Bào chế chuẩn Dược điển'}${cleanBensky ? ` — ${cleanBensky}` : ''}`);

  const isHerbariumSpecimen = Boolean(
    uniquePrepared && /GBIF|Tiêu bản khô/i.test(uniquePrepared.source)
  );

  return {
    imageUrl: baseFile,
    speciesPhotoUrl: exact?.url || baseFile,
    taxonName: exact?.taxonName || herb.botanicalName,
    partLabel,
    processingNote,
    hasExactSlicePhoto: !isHerbariumSpecimen,
    isHerbariumSpecimen,
    variantClass: uniquePrepared ? '' : (mapped?.variantClass || fallback?.variantClass || '')
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

  useEffect(() => {
    setNaturalImgFailed(false);
    setPreparedImgFailed(false);
  }, [herb.id]);

  if (mode === 'thumbnail') {
    return (
      <div className="relative w-24 h-16 sm:w-28 sm:h-20 rounded-2xl overflow-hidden border border-slate-200 shadow-xs shrink-0 bg-white grid grid-cols-2 gap-px">
        {/* Left half: 100% unique living biological species photo */}
        <div className="relative w-full h-full bg-emerald-950 overflow-hidden">
          {!naturalImgFailed ? (
            <img
              src={spec.speciesPhotoUrl}
              alt={`Dạng tự nhiên ${herb.vietnameseName}`}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setNaturalImgFailed(true)}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-emerald-900 text-[9px] font-bold text-emerald-200 text-center px-1">
              Tự nhiên
            </div>
          )}
          <span className="absolute top-1 left-1 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-white/80 shadow-xs" title="Dạng tự nhiên" />
        </div>

        {/* Right half: Prepared dried pharmacognosy herb OR museum herbarium specimen */}
        <div className="relative w-full h-full bg-white overflow-hidden">
          {!preparedImgFailed ? (
            <img
              src={spec.imageUrl}
              alt={spec.isHerbariumSpecimen ? `Tiêu bản khô định danh ${herb.vietnameseName}` : `Sau bào chế ${herb.vietnameseName}`}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setPreparedImgFailed(true)}
              className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${spec.variantClass || ''}`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-amber-50 text-[9px] font-bold text-amber-800 text-center px-1">
              {spec.isHerbariumSpecimen ? 'Tiêu bản' : 'Bào chế'}
            </div>
          )}
          <span
            className={`absolute top-1 right-1 w-2 h-2 rounded-full ring-1 ring-white/80 shadow-xs ${spec.isHerbariumSpecimen ? 'bg-sky-400' : 'bg-amber-400'}`}
            title={spec.isHerbariumSpecimen ? 'Tiêu bản khô định danh (GBIF)' : 'Sau bào chế (Ẩm phiến)'}
          />
        </div>

        {/* Hanzi badge across bottom */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent px-1.5 py-0.5 flex items-end justify-between pointer-events-none">
          <span className="text-[9px] sm:text-[10px] font-serif font-bold text-amber-200 leading-none drop-shadow">
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

            {/* Photo 2: Prepared Dried Pharmacognosy Herb OR Herbarium Specimen */}
            <div
              onClick={() => setInspectModal('prepared')}
              className={`group relative rounded-xl overflow-hidden bg-white min-h-[195px] sm:min-h-[220px] border cursor-pointer flex flex-col justify-between ${spec.isHerbariumSpecimen ? 'border-sky-700/40' : 'border-amber-800/40'}`}
              title={spec.isHerbariumSpecimen ? 'Nhấp để phóng to đối chiếu Tiêu Bản Thực Vật Khô' : 'Nhấp để phóng to đối chiếu Dạng Sau Khi Bào Chế'}
            >
              {!preparedImgFailed ? (
                <img
                  src={spec.imageUrl}
                  alt={spec.isHerbariumSpecimen ? `Tiêu bản thực vật khô định danh ${herb.vietnameseName}` : `Vị thuốc sau khi bào chế ${herb.vietnameseName}`}
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
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-950/95 text-[9px] sm:text-[10px] font-bold border backdrop-blur-xs ${spec.isHerbariumSpecimen ? 'text-sky-300 border-sky-500/40' : 'text-amber-300 border-amber-500/40'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${spec.isHerbariumSpecimen ? 'bg-sky-400' : 'bg-amber-400'}`}></span>
                  {spec.isHerbariumSpecimen ? '2. Tiêu Bản Khô' : '2. Sau Bào Chế'}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-black/70 text-[9px] text-white/90 font-mono flex items-center gap-0.5 backdrop-blur-xs">
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Xem
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent p-2 z-10 pointer-events-none">
                <span className={`text-[10px] font-serif font-bold block truncate ${spec.isHerbariumSpecimen ? 'text-sky-300' : 'text-amber-300'}`}>
                  {herb.chineseCharacters} ({herb.pinyinName})
                </span>
                <span className="text-[9px] text-slate-200 block truncate">
                  {spec.isHerbariumSpecimen ? 'Tiêu bản bảo tàng định danh loài (GBIF)' : spec.partLabel}
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
                  <strong className={spec.isHerbariumSpecimen ? 'text-sky-300' : 'text-amber-300'}>
                    {spec.isHerbariumSpecimen ? '🍂 Bào Chế & Tiêu Bản: ' : '🍂 Sau Khi Bào Chế: '}
                  </strong>
                  {spec.partLabel}. {spec.processingNote}.
                  {spec.isHerbariumSpecimen && (
                    <span className="block mt-1 text-[11px] text-sky-300/90 italic">
                      Lưu ý: Ô ảnh 2 hiện hiển thị tiêu bản thực vật ép khô định danh bảo tàng (GBIF), không phải ảnh ẩm phiến cắt lát thương phẩm.
                    </span>
                  )}
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

                {/* Panel 2: Sau Khi Bào Chế OR Tiêu Bản Khô Định Danh */}
                <div className={`rounded-2xl overflow-hidden border bg-slate-900 flex flex-col ${spec.isHerbariumSpecimen ? 'border-sky-700/50' : 'border-amber-700/50'}`}>
                  <div className={`p-2.5 border-b flex items-center justify-between ${spec.isHerbariumSpecimen ? 'bg-sky-950/80 border-sky-800/40' : 'bg-amber-950/80 border-amber-800/40'}`}>
                    <span className={`text-xs font-bold flex items-center gap-1.5 ${spec.isHerbariumSpecimen ? 'text-sky-300' : 'text-amber-300'}`}>
                      <span className={`w-2 h-2 rounded-full ${spec.isHerbariumSpecimen ? 'bg-sky-400' : 'bg-amber-400'}`}></span>
                      {spec.isHerbariumSpecimen
                        ? '2. TIÊU BẢN THỰC VẬT KHÔ (ĐỊNH DANH LOÀI)'
                        : '2. DẠNG SAU BÀO CHẾ (DƯỢC LIỆU DƯỢC ĐIỂN)'}
                    </span>
                    <span className={`text-[10px] font-mono ${spec.isHerbariumSpecimen ? 'text-sky-400/90' : 'text-amber-400/90'}`}>
                      {spec.isHerbariumSpecimen ? 'Herbarium Specimen' : 'Prepared Herb'}
                    </span>
                  </div>
                  <div className="relative aspect-4/3 sm:aspect-16/11 bg-white flex items-center justify-center overflow-hidden p-3">
                    <img
                      src={spec.imageUrl}
                      alt={spec.isHerbariumSpecimen ? `Tiêu bản thực vật khô ${herb.vietnameseName}` : `Dược liệu bào chế ${herb.vietnameseName}`}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-contain max-h-[350px] ${spec.variantClass || ''}`}
                    />
                  </div>
                  <div className="p-3 bg-slate-900 text-xs text-slate-300 space-y-1">
                    <div className={`font-semibold ${spec.isHerbariumSpecimen ? 'text-sky-300' : 'text-amber-300'}`}>{spec.partLabel}</div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{spec.processingNote}</p>
                    {spec.isHerbariumSpecimen && (
                      <p className="text-[11px] text-sky-300/90 italic pt-1">
                        Ảnh mẫu ép khô định danh từ bảo tàng thực vật học (GBIF) — dùng tham khảo hình thái loài khi chưa có ảnh ẩm phiến cắt lát chụp trực tiếp.
                      </p>
                    )}
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
