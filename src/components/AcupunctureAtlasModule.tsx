import React, { useState } from 'react';
import {
  TUNG_POINTS,
  TUNG_FORMULAS,
  WHO_EXTRA_POINTS,
  CLASSICAL_ACUPUNCTURE_PROTOCOLS,
  TUNG_APPENDICES,
  TungPoint,
  TungFormula,
  WhoExtraPoint,
  ClassicalProtocol
} from '../data/tungPoints';
import {
  AlertTriangle,
  Activity,
  Zap,
  Check,
  Search,
  Filter,
  BookOpen,
  Layers,
  HeartPulse,
  Droplet,
  Sparkles,
  Stethoscope,
  Compass,
  FileText,
  ExternalLink
} from 'lucide-react';
import { AcupointVisualDiagram } from './AcupointVisualDiagram';
import { Human3DMeridianViewer } from './Human3DMeridianViewer';

export const AcupunctureAtlasModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'meridians3d' | 'catalog' | 'formulas' | 'who_extra' | 'classical' | 'principles'>('meridians3d');
  const [selectedPoint, setSelectedPoint] = useState<TungPoint | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterZone, setFilterZone] = useState('all');

  // Formula states
  const [selectedFormulaCategory, setSelectedFormulaCategory] = useState('all');
  const [formulaSearch, setFormulaSearch] = useState('');
  const [selectedFormula, setSelectedFormula] = useState<TungFormula | null>(null);

  // WHO Extra Points states
  const [whoRegionFilter, setWhoRegionFilter] = useState('all');
  const [whoSearch, setWhoSearch] = useState('');
  const [selectedWhoPoint, setSelectedWhoPoint] = useState<WhoExtraPoint | null>(null);

  // Classical Protocols states
  const [selectedClassical, setSelectedClassical] = useState<ClassicalProtocol | null>(null);

  // PDF Reader state
  const pdfBooks = [
    {
      id: 'dong-thi-pdf',
      title: 'Sổ Tay Đổng Thị Kỳ Huyệt (Phùng Văn Chiến - 292 Trang)',
      url: '/assets/aistudio/So_tay_Dong_thi_ky_huyet_21b2e1ad.pdf',
      desc: 'Toàn văn 239 huyệt vị Đổng Thị, 295 phác đồ trị bệnh lâm sàng và phụ lục Luật Toàn Tức.'
    },
    {
      id: 'ngoai-kinh-pdf',
      title: 'Một Số Huyệt Ngoài Kinh Thường Dùng Theo WHO 1991 (66 Trang)',
      url: '/assets/aistudio/M_t_s__huy_t_ngo_i_kinh_f74787eb.pdf',
      desc: 'Vị trí, tác dụng và cách châm cứu 58 kỳ huyệt ngoài kinh chuẩn quốc tế WHO.'
    },
    {
      id: 'nguyen-tai-thu-pdf',
      title: 'Châm Cứu Chữa Bệnh (GS. Nguyễn Tài Thu - 211 Trang)',
      url: '/assets/aistudio/Ch_m_c_u_ch_a_b_nh_404967ad.pdf',
      desc: 'Giáo trình thực hành châm cứu và phác đồ điều trị các chứng bệnh nội - ngoại - thần kinh kinh điển của GS. Nguyễn Tài Thu.'
    },
    {
      id: 'luu-viem-pdf',
      title: 'Cẩm Nang Thực Hành Châm Cứu (Lưu Viêm - 338 Trang)',
      url: '/assets/aistudio/cam-nang-thuc-hanh-cham-cuu-luu-viem_c3cf5d2f.pdf',
      desc: 'Bách khoa thư thủ pháp châm cứu bổ tả, cứu ngải, định vị huyệt 14 kinh chính và biện chứng luận trị bằng châm cứu.'
    }
  ];
  const [activePdf, setActivePdf] = useState<typeof pdfBooks[0] | null>(null);

  const zonesList = [
    { id: 'all', label: `Tất Cả (${TUNG_POINTS.length} Huyệt)` },
    { id: 'Khu 11', label: 'Khu 11 (Ngón tay)' },
    { id: 'Khu 22', label: 'Khu 22 (Bàn tay)' },
    { id: 'Khu 33', label: 'Khu 33 (Cẳng tay)' },
    { id: 'Khu 44', label: 'Khu 44 (Cánh tay)' },
    { id: 'Khu 55', label: 'Khu 55 (Lòng bàn chân)' },
    { id: 'Khu 66', label: 'Khu 66 (Mu bàn chân)' },
    { id: 'Khu 77', label: 'Khu 77 (Cẳng chân)' },
    { id: 'Khu 88', label: 'Khu 88 (Đùi)' },
    { id: 'Khu 99', label: 'Khu 99 (Tai)' },
    { id: 'Khu 1010', label: 'Khu 1010 (Đầu mặt)' },
    { id: 'Khu Hậu Bối', label: 'Khu Hậu Bối (Lưng)' },
    { id: 'Khu Tiền Hung', label: 'Khu Tiền Hung (Ngực bụng)' },
  ];

  const formulaCategories = [
    { id: 'all', label: `Tất Cả (${TUNG_FORMULAS.length} Phác Đồ)` },
    { id: 'Cấp Cứu', label: 'Cấp Cứu' },
    { id: 'Cơ Xương Khớp & Liệt', label: 'Cơ Xương Khớp & Liệt' },
    { id: 'Cảm Mạo & Sốt', label: 'Cảm Mạo & Sốt' },
    { id: 'Ngũ Quan (Mắt, Mũi, Tai, Răng)', label: 'Mắt, Tai, Mũi, Răng' },
    { id: 'Đầu Mặt & Thần Kinh', label: 'Đầu Mặt & Thần Kinh' },
    { id: 'Hô Hấp & Hầu Họng', label: 'Hô Hấp & Phổi' },
    { id: 'Tim Mạch & Huyết Áp', label: 'Tim Mạch & Huyết Áp' },
    { id: 'Tiêu Hóa & Gan Mật & Bài Tiết', label: 'Tiêu Hóa & Gan Thận' },
    { id: 'Bệnh Ngoài Da', label: 'Bệnh Ngoài Da' },
    { id: 'Sản Phụ Khoa & Nam Khoa', label: 'Phụ Khoa & Nam Khoa' },
    { id: 'Bệnh Trẻ Em & Nhi Khoa', label: 'Nhi Khoa' },
    { id: 'Dưỡng Sinh & Bồi Bổ', label: 'Dưỡng Sinh & Bổ Thận' },
    { id: 'Bài Thuốc & Chứng Khác', label: 'Chứng Khác' },
  ];

  const whoRegions = [
    { id: 'all', label: `Tất Cả (${WHO_EXTRA_POINTS.length} Huyệt WHO)` },
    { id: 'Vùng Đầu – Mặt – Cổ', label: 'Đầu – Mặt – Cổ' },
    { id: 'Vùng Lưng', label: 'Vùng Lưng' },
    { id: 'Vùng Bụng', label: 'Vùng Bụng' },
    { id: 'Vùng Chi Trên', label: 'Tay & Chi Trên' },
    { id: 'Vùng Chi Dưới', label: 'Chân & Chi Dưới' },
    { id: 'Toàn Thân (Điểm Phản Ứng Đau)', label: 'Á Thị Huyệt' },
  ];

  const handleSelectPoint = (point: TungPoint) => {
    setSelectedPoint((prev) => (prev?.id === point.id ? null : point));
  };

  const handleSelectFormula = (formula: TungFormula) => {
    setSelectedFormula((prev) => (prev?.id === formula.id ? null : formula));
  };

  const handleSelectWhoPoint = (wp: WhoExtraPoint) => {
    setSelectedWhoPoint((prev) => (prev?.id === wp.id ? null : wp));
  };

  const handleSelectClassical = (proto: ClassicalProtocol) => {
    setSelectedClassical((prev) => (prev?.id === proto.id ? null : proto));
  };

  const filteredPoints = TUNG_POINTS.filter((p) => {
    const matchZone = filterZone === 'all' || p.zone.toLowerCase().includes(filterZone.toLowerCase());
    const q = searchQuery.toLowerCase().trim();
    const matchQuery =
      q === '' ||
      p.vietnameseName.toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.zone.toLowerCase().includes(q) ||
      p.indications.some((ind) => ind.toLowerCase().includes(q)) ||
      p.location.toLowerCase().includes(q) ||
      p.dongQiInstruction.toLowerCase().includes(q);
    return matchZone && matchQuery;
  });

  const filteredFormulas = TUNG_FORMULAS.filter((f) => {
    const matchCat = selectedFormulaCategory === 'all' || f.category === selectedFormulaCategory;
    const q = formulaSearch.toLowerCase().trim();
    const matchQuery =
      q === '' ||
      f.diseaseName.toLowerCase().includes(q) ||
      (f.chineseDisease && f.chineseDisease.toLowerCase().includes(q)) ||
      f.mainPoints.some((pt) => pt.toLowerCase().includes(q)) ||
      f.clinicalNotes.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  const filteredWhoPoints = WHO_EXTRA_POINTS.filter((wp) => {
    const matchReg = whoRegionFilter === 'all' || wp.region === whoRegionFilter;
    const q = whoSearch.toLowerCase().trim();
    const matchQuery =
      q === '' ||
      wp.name.toLowerCase().includes(q) ||
      wp.code.toLowerCase().includes(q) ||
      wp.location.toLowerCase().includes(q) ||
      wp.actions.toLowerCase().includes(q) ||
      wp.indications.some((ind) => ind.toLowerCase().includes(q));
    return matchReg && matchQuery;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 space-y-5 overflow-x-hidden">
      {/* Real Clinical Acupoint Hero Banner */}
      <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-5 sm:p-8 flex flex-col justify-center space-y-2.5">
            <div className="text-xs sm:text-sm text-cyan-800 font-bold">
              {TUNG_POINTS.length} Huyệt Đổng Thị · {TUNG_FORMULAS.length} Phác Đồ · {WHO_EXTRA_POINTS.length} Huyệt WHO
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Hình Ảnh Thực Tế Các Huyệt Đổng Thị, Huyệt WHO & Phác Đồ Châm Cứu
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Đã chuẩn hóa chính xác 100% mặt giải phẫu cho toàn bộ 239 huyệt Đổng Thị và 58 huyệt WHO: phân biệt rõ <strong>Mặt Lòng Bàn Tay</strong> với <strong>Mặt Lưng (Mu) Bàn Tay</strong>, <strong>Lòng Bàn Chân</strong> với <strong>Mu Bàn Chân</strong>, Cẳng tay, Đùi, Bụng ngực, Đầu mặt và Lưng.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 min-h-[190px] bg-slate-900 overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-200">
            <div className="relative overflow-hidden border-r border-slate-800">
              <img
                src="/assets/images/real_hand_palmar_1794279448548.jpg"
                alt="Ảnh chụp thực tế mặt lòng bàn tay"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-slate-950/80 p-2 text-center">
                <span className="text-[11px] sm:text-xs font-bold text-amber-300">
                  Mặt Lòng Bàn Tay
                </span>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <img
                src="/assets/images/real_hand_dorsal_1794279449692.jpg"
                alt="Ảnh chụp thực tế mặt lưng (mu) bàn tay"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-slate-950/80 p-2 text-center">
                <span className="text-[11px] sm:text-xs font-bold text-cyan-300">
                  Mặt Lưng (Mu) Bàn Tay
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Real Clinical Body Zone Photo Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 p-3.5 sm:p-4 bg-slate-50 border-t border-slate-200">
          <div
            onClick={() => {
              setActiveTab('catalog');
              setFilterZone('Khu 22');
            }}
            className="group relative h-28 sm:h-36 rounded-xl overflow-hidden border border-slate-200 cursor-pointer"
          >
            <img
              src="/assets/images/real_hand_palmar_1794279448548.jpg"
              alt="Ảnh thực tế Lòng bàn tay & Mu bàn tay"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-2.5">
              <span className="text-xs sm:text-sm font-bold text-white leading-snug">
                Lòng Bàn Tay & Mu Bàn Tay (Khu 11 - 22)
              </span>
            </div>
          </div>

          <div
            onClick={() => {
              setActiveTab('catalog');
              setFilterZone('Khu 33');
            }}
            className="group relative h-28 sm:h-36 rounded-xl overflow-hidden border border-slate-200 cursor-pointer"
          >
            <img
              src="/assets/images/real_acupoint_arm_forearm_1794278485426.jpg"
              alt="Ảnh thực tế vùng huyệt Cẳng tay và Cánh tay"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-2.5">
              <span className="text-xs sm:text-sm font-bold text-white leading-snug">
                Vùng Cẳng Tay & Cánh Tay (Khu 33 - 44)
              </span>
            </div>
          </div>

          <div
            onClick={() => {
              setActiveTab('catalog');
              setFilterZone('Khu 55');
            }}
            className="group relative h-28 sm:h-36 rounded-xl overflow-hidden border border-slate-200 cursor-pointer"
          >
            <img
              src="/assets/images/real_foot_plantar_dorsal_1794279452126.jpg"
              alt="Ảnh thực tế Lòng bàn chân và Mu bàn chân"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-2.5">
              <span className="text-xs sm:text-sm font-bold text-white leading-snug">
                Lòng Bàn Chân, Mu Chân & Đùi (Khu 55 - 88)
              </span>
            </div>
          </div>

          <div
            onClick={() => {
              setActiveTab('catalog');
              setFilterZone('Khu 1010');
            }}
            className="group relative h-28 sm:h-36 rounded-xl overflow-hidden border border-slate-200 cursor-pointer"
          >
            <img
              src="/assets/images/real_face_closeup_front_1794280802766.jpg"
              alt="Ảnh thực tế vùng huyệt Đầu mặt, Tai và Lưng bụng"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-2.5">
              <span className="text-xs sm:text-sm font-bold text-white leading-snug">
                Đầu Mặt, Tai, Ngực Bụng & Lưng (Khu 99 - 1010 & WHO)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation (Wraps cleanly inside phone screen) */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('meridians3d')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'meridians3d'
              ? 'bg-gradient-to-r from-cyan-800 to-emerald-800 text-white shadow-sm ring-2 ring-cyan-500'
              : 'bg-white text-slate-800 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
          <span>Mô Hình 3D Kinh Lạc & Huyệt Đạo (14 Kinh)</span>
        </button>

        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'catalog'
              ? 'bg-cyan-800 text-white shadow-xs'
              : 'bg-white text-slate-800 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4 shrink-0" />
          <span>1. Huyệt Đổng Thị ({TUNG_POINTS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('formulas')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'formulas'
              ? 'bg-cyan-800 text-white shadow-xs'
              : 'bg-white text-slate-800 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          <Stethoscope className="w-4 h-4 shrink-0" />
          <span>2. Phác Đồ Trị Bệnh ({TUNG_FORMULAS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('who_extra')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'who_extra'
              ? 'bg-cyan-800 text-white shadow-xs'
              : 'bg-white text-slate-800 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          <Compass className="w-4 h-4 shrink-0" />
          <span>3. Huyệt Ngoài Kinh WHO ({WHO_EXTRA_POINTS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('classical')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'classical'
              ? 'bg-cyan-800 text-white shadow-xs'
              : 'bg-white text-slate-800 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          <HeartPulse className="w-4 h-4 shrink-0" />
          <span>4. Phác Đồ Nguyễn Tài Thu & Lưu Viêm</span>
        </button>

        <button
          onClick={() => setActiveTab('principles')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'principles'
              ? 'bg-cyan-800 text-white shadow-xs'
              : 'bg-white text-slate-800 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4 shrink-0" />
          <span>5. Đọc Sách PDF Gốc</span>
        </button>
      </div>

      {/* TAB 3D: HUMAN 3D MERIDIAN & ACUPOINTS VIEWER */}
      {activeTab === 'meridians3d' && (
        <div className="space-y-4">
          <Human3DMeridianViewer />
        </div>
      )}

      {/* TAB 1: POINTS CATALOG */}
      {activeTab === 'catalog' && (
        <div className="space-y-4">
          {/* Quick Search & Zone Filters */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-2xs">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              {/* Zone Dropdown */}
              <div className="flex items-center gap-2 md:min-w-[260px]">
                <Filter className="w-4 h-4 text-cyan-800 shrink-0" />
                <select
                  value={filterZone}
                  onChange={(e) => setFilterZone(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:border-cyan-600 cursor-pointer"
                >
                  {zonesList.map((z) => {
                    const count =
                      z.id === 'all'
                        ? TUNG_POINTS.length
                        : TUNG_POINTS.filter((p) => p.zone.toLowerCase().includes(z.id.toLowerCase())).length;
                    return (
                      <option key={z.id} value={z.id}>
                        {z.label} ({count} huyệt)
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm tên huyệt, mã số (11.01, 22.05, Linh Cốt, Đại Bạch, Thận Quan...) hoặc bệnh..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-600 focus:bg-white"
                />
              </div>
            </div>

            {/* Wrapped Zone Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {zonesList.map((z) => {
                const isActive = filterZone === z.id;
                const shortLabel = z.id === 'all' ? 'Tất Cả 12 Khu' : z.id;
                return (
                  <button
                    key={z.id}
                    onClick={() => setFilterZone(z.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-cyan-800 text-white border-cyan-900'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-cyan-50'
                    }`}
                  >
                    {shortLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Points List with Real Photo Thumbnail & Immediate Inline Expansion */}
          <div className="space-y-3">
            {filteredPoints.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-700 text-base">
                Không tìm thấy huyệt phù hợp với từ khóa tra cứu.
              </div>
            ) : (
              filteredPoints.map((point) => {
                const isSelected = selectedPoint?.id === point.id;
                return (
                  <div key={point.id} id={`tung-card-${point.id}`} className="space-y-2 w-full">
                    <div
                      onClick={() => handleSelectPoint(point)}
                      className={`p-3.5 sm:p-5 rounded-2xl cursor-pointer border transition-all flex items-start gap-3.5 sm:gap-4 ${
                        isSelected
                          ? 'bg-cyan-50/90 border-cyan-600 shadow-sm ring-2 ring-cyan-400'
                          : 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs'
                      }`}
                    >
                      <AcupointVisualDiagram
                        code={point.code}
                        name={point.vietnameseName}
                        chineseName={point.chineseName}
                        zone={point.zone}
                        location={point.location}
                        needling={point.needlingMethod}
                        anatomy={point.anatomy}
                        mode="compact"
                      />

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="text-xs sm:text-sm font-bold text-cyan-900 bg-cyan-50 px-2.5 py-0.5 rounded-md border border-cyan-200">
                            Mã {point.code} · {point.zone}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-cyan-900 bg-cyan-100/80 px-3 py-1 rounded-lg border border-cyan-300">
                            {isSelected ? 'Thu gọn' : 'Xem chi tiết'}
                          </span>
                        </div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg break-words">
                          {point.vietnameseName}{' '}
                          <span className="text-sm font-normal text-slate-600">
                            ({point.chineseName})
                          </span>
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-700 line-clamp-2 leading-relaxed">
                          <strong>Vị trí: </strong>{point.location}
                        </p>
                        <div className="text-xs sm:text-sm text-emerald-900 font-bold">
                          Chủ trị: {point.indications.slice(0, 3).join(', ')}
                        </div>
                      </div>
                    </div>

                    {/* INLINE EXPANDED DETAIL VIEW */}
                    {isSelected && (
                      <div className="bg-white rounded-2xl border-2 border-cyan-600 p-4 sm:p-6 shadow-md space-y-4 overflow-hidden">
                        <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-200">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="px-3 py-1 rounded-lg text-xs sm:text-sm font-bold bg-cyan-100 text-cyan-950 border border-cyan-300">
                                Mã Huyệt: {point.code}
                              </span>
                              <span className="text-xs sm:text-sm text-slate-700 font-semibold">
                                {point.zoneDescription}
                              </span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1.5 break-words">
                              {point.vietnameseName} ({point.chineseName})
                            </h3>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPoint(null);
                            }}
                            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold cursor-pointer shrink-0"
                          >
                            Đóng
                          </button>
                        </div>

                        {/* Real Clinical Photograph for this Point */}
                        <AcupointVisualDiagram
                          code={point.code}
                          name={point.vietnameseName}
                          chineseName={point.chineseName}
                          zone={point.zone}
                          location={point.location}
                          needling={point.needlingMethod}
                          anatomy={point.anatomy}
                          mode="expanded"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm sm:text-base space-y-2">
                            <h4 className="font-bold text-cyan-900">
                              1. Vị Trí, Giải Phẫu & Quy Kinh
                            </h4>
                            <p className="text-slate-800 leading-relaxed">
                              <strong>Vị trí lấy huyệt: </strong>{point.location}
                            </p>
                            <p className="text-slate-700 leading-relaxed">
                              <strong>Giải phẫu & Quy kinh: </strong>{point.anatomy}
                            </p>
                          </div>

                          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm sm:text-base space-y-2">
                            <h4 className="font-bold text-emerald-900">
                              2. Cách Châm & Độ Sâu Mũi Kim
                            </h4>
                            <p className="text-slate-800 leading-relaxed">
                              {point.needlingMethod}
                            </p>
                            {point.contraindications && (
                              <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-900">
                                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                                <span><strong>Lưu ý cấm kỵ: </strong>{point.contraindications}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
                            3. Công Dụng & Chủ Trị Lâm Sàng
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {point.indications.map((ind, i) => (
                              <div key={i} className="flex items-start gap-2 text-sm text-slate-800 bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200">
                                <Check className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
                                <span className="font-medium leading-relaxed">{ind}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-cyan-50/70 border border-cyan-200 text-sm sm:text-base space-y-1.5">
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-cyan-800 shrink-0" />
                            <h4 className="font-bold text-cyan-950">
                              4. Ứng Dụng Lâm Sàng & Phối Huyệt Đặc Hiệu
                            </h4>
                          </div>
                          <p className="text-slate-800 leading-relaxed whitespace-pre-line">
                            {point.dongQiInstruction}
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm sm:text-base space-y-1.5">
                          <h4 className="font-bold text-purple-950 flex items-center gap-2">
                            <Activity className="w-4 h-4 text-purple-700 shrink-0" />
                            <span>5. Cơ Chế Thần Kinh Học Hiện Đại</span>
                          </h4>
                          <p className="text-slate-800 leading-relaxed">
                            {point.westernMechanism}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 2: CLINICAL FORMULAS DIRECTORY (295 FORMULAS) */}
      {activeTab === 'formulas' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-2xs">
            <div className="flex flex-wrap gap-1.5">
              {formulaCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedFormulaCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                    selectedFormulaCategory === cat.id
                      ? 'bg-cyan-800 text-white border-cyan-900'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-cyan-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={formulaSearch}
                onChange={(e) => setFormulaSearch(e.target.value)}
                placeholder="Tra cứu trong 295 phác đồ (đau lưng, gout, đột quỵ, viêm gan, mất ngủ...)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-600 focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredFormulas.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-700 text-base">
                Không tìm thấy phác đồ điều trị phù hợp với từ khóa.
              </div>
            ) : (
              filteredFormulas.map((formula) => {
                const isSelected = selectedFormula?.id === formula.id;
                return (
                  <div key={formula.id} className="space-y-2 w-full">
                    <div
                      onClick={() => handleSelectFormula(formula)}
                      className={`p-4 sm:p-5 rounded-2xl cursor-pointer border transition-all ${
                        isSelected
                          ? 'bg-cyan-50/90 border-cyan-600 shadow-sm ring-2 ring-cyan-400'
                          : 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 flex-wrap mb-1.5">
                        <span className="text-xs sm:text-sm font-bold px-2.5 py-0.5 rounded-md bg-cyan-100 text-cyan-950 border border-cyan-300">
                          {formula.category}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-cyan-900 bg-cyan-100/80 px-3 py-1 rounded-lg border border-cyan-300">
                          {isSelected ? 'Thu gọn' : 'Xem phác đồ'}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                        {formula.diseaseName}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-700 mt-1 line-clamp-2 leading-relaxed">
                        {formula.clinicalNotes}
                      </p>

                      <div className="mt-2.5 flex flex-wrap gap-1.5 items-center">
                        <span className="text-xs sm:text-sm font-bold text-slate-700">Huyệt chính:</span>
                        {formula.mainPoints.map((pt, i) => (
                          <span key={i} className="text-xs sm:text-sm font-bold text-cyan-950 bg-cyan-50 px-2.5 py-0.5 rounded-lg border border-cyan-200">
                            {pt}
                          </span>
                        ))}
                      </div>
                    </div>

                    {isSelected && (
                      <div className="bg-white rounded-2xl border-2 border-cyan-600 p-4 sm:p-6 shadow-md space-y-4 overflow-hidden">
                        <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-200">
                          <div>
                            <span className="px-3 py-1 rounded-lg text-xs sm:text-sm font-bold bg-cyan-100 text-cyan-950 border border-cyan-300">
                              {formula.category}
                            </span>
                            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                              {formula.diseaseName}
                            </h2>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFormula(null);
                            }}
                            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold cursor-pointer shrink-0"
                          >
                            Đóng
                          </button>
                        </div>

                        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-300 space-y-1.5">
                          <h4 className="text-sm sm:text-base font-bold text-emerald-950 flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-emerald-700 shrink-0" />
                            <span>Nội Dung Phác Đồ Nguyên Bản Trong Sách</span>
                          </h4>
                          <p className="text-sm sm:text-base text-slate-900 leading-relaxed">
                            {formula.clinicalNotes}
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-cyan-50/60 border border-cyan-200 space-y-2">
                          <h4 className="text-sm sm:text-base font-bold text-cyan-950 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-cyan-700 shrink-0" />
                            <span>Chủ Huyệt Đặc Hiệu Đổng Thị</span>
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {formula.mainPoints.map((pt, i) => (
                              <span key={i} className="px-3 py-1.5 rounded-xl bg-white text-cyan-950 font-bold text-xs sm:text-sm border border-cyan-300">
                                {pt}
                              </span>
                            ))}
                          </div>
                        </div>

                        {formula.adjunctPoints && formula.adjunctPoints.length > 0 && (
                          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                            <h4 className="text-sm sm:text-base font-bold text-slate-800">
                              Huyệt Phối Hợp Gia Giảm
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {formula.adjunctPoints.map((pt, i) => (
                                <span key={i} className="px-3 py-1 rounded-lg bg-white text-slate-800 text-xs sm:text-sm border border-slate-200 font-semibold">
                                  {pt}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {formula.bloodlettingPoints && formula.bloodlettingPoints.length > 0 && (
                          <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-200 space-y-1.5">
                            <h4 className="text-sm sm:text-base font-bold text-rose-900 flex items-center gap-2">
                              <Droplet className="w-4 h-4 text-rose-600 shrink-0" />
                              <span>Phối Hợp Trích Huyết Nặn Máu</span>
                            </h4>
                            <ul className="list-disc list-inside text-sm text-rose-900 leading-relaxed">
                              {formula.bloodlettingPoints.map((bp, i) => (
                                <li key={i}>{bp}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                          <h4 className="text-sm sm:text-base font-bold text-teal-950 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-teal-700 shrink-0" />
                            <span>Nguyên Tắc Vận Châm Đổng Thị</span>
                          </h4>
                          <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                            {formula.dongQiMethod}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 3: WHO 1991 EXTRA POINTS */}
      {activeTab === 'who_extra' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-2xs">
            <div className="flex flex-wrap gap-1.5">
              {whoRegions.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setWhoRegionFilter(reg.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                    whoRegionFilter === reg.id
                      ? 'bg-teal-800 text-white border-teal-900'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-teal-50'
                  }`}
                >
                  {reg.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={whoSearch}
                onChange={(e) => setWhoSearch(e.target.value)}
                placeholder="Tìm kỳ huyệt ngoài kinh (Tứ Thần Thông, Ấn Đường, Thái Dương, Hoa Đà Giáp Tích, Bát Tà...)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm placeholder-slate-500 focus:outline-none focus:border-teal-600 focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredWhoPoints.map((wp) => {
              const isSelected = selectedWhoPoint?.id === wp.id;
              return (
                <div key={wp.id} className="space-y-2 w-full">
                  <div
                    onClick={() => handleSelectWhoPoint(wp)}
                    className={`p-3.5 sm:p-5 rounded-2xl cursor-pointer border transition-all flex items-start gap-3.5 sm:gap-4 ${
                      isSelected
                        ? 'bg-teal-50/90 border-teal-600 shadow-sm ring-2 ring-teal-400'
                        : 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs'
                    }`}
                  >
                    <AcupointVisualDiagram
                      code={wp.code}
                      name={wp.name}
                      zone={wp.region}
                      location={wp.location}
                      needling={wp.needling}
                      mode="compact"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-xs sm:text-sm font-bold text-teal-900 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                          {wp.code} · {wp.region}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-teal-900 bg-teal-100/80 px-3 py-1 rounded-lg border border-teal-300">
                          {isSelected ? 'Thu gọn' : 'Xem chi tiết'}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-slate-900 text-base sm:text-lg">{wp.name}</h4>
                      <p className="text-xs sm:text-sm text-slate-700 line-clamp-2 leading-relaxed">
                        <strong>Vị trí: </strong>{wp.location}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="bg-white rounded-2xl border-2 border-teal-600 p-4 sm:p-6 shadow-md space-y-4 overflow-hidden">
                      <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-200">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-3 py-1 rounded-lg text-xs sm:text-sm font-bold bg-teal-100 text-teal-950 border border-teal-300">
                              Mã WHO: {wp.code}
                            </span>
                            <span className="text-xs sm:text-sm text-slate-700 font-semibold">{wp.region}</span>
                          </div>
                          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                            Huyệt {wp.name}
                          </h2>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedWhoPoint(null);
                          }}
                          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold cursor-pointer shrink-0"
                        >
                          Đóng
                        </button>
                      </div>

                      <AcupointVisualDiagram
                        code={wp.code}
                        name={wp.name}
                        zone={wp.region}
                        location={wp.location}
                        needling={wp.needling}
                        mode="expanded"
                      />

                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <h4 className="text-sm sm:text-base font-bold text-teal-900">
                          Vị Trí Định Huyệt Chuẩn
                        </h4>
                        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">{wp.location}</p>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                        <h4 className="text-sm sm:text-base font-bold text-emerald-950">
                          Tác Dụng Y Lý Cổ Truyền
                        </h4>
                        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">{wp.actions}</p>
                      </div>

                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
                          Ứng Dụng Điều Trị Lâm Sàng
                        </h4>
                        <div className="space-y-2">
                          {wp.indications.map((ind, i) => (
                            <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800">
                              <Check className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{ind}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-cyan-50/70 border border-cyan-200 space-y-1">
                        <h4 className="text-sm sm:text-base font-bold text-cyan-950">
                          Cách Châm Cứu & Độ Sâu Mũi Kim
                        </h4>
                        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">{wp.needling}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: CLASSICAL PROTOCOLS (GS. NGUYỄN TÀI THU & LƯU VIÊM) */}
      {activeTab === 'classical' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-indigo-50/80 border border-indigo-200">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Phác Đồ Châm Cứu Chữa Bệnh & Mãng Châm (GS. Nguyễn Tài Thu & Lưu Viêm)
            </h3>
            <p className="text-sm text-slate-700 mt-1 leading-relaxed">
              Tổng hợp các phác đồ biện chứng châm cứu, phối huyệt theo kinh lạc và kỹ thuật Trường châm xuyên huyệt (Mãng châm). Bấm vào từng phác đồ để mở chi tiết ngay tại chỗ.
            </p>
          </div>

          <div className="space-y-3">
            {CLASSICAL_ACUPUNCTURE_PROTOCOLS.map((proto) => {
              const isSelected = selectedClassical?.id === proto.id;
              return (
                <div key={proto.id} className="space-y-2">
                  <div
                    onClick={() => handleSelectClassical(proto)}
                    className={`p-4 sm:p-5 rounded-2xl cursor-pointer border transition-all ${
                      isSelected
                        ? 'bg-indigo-50/90 border-indigo-600 shadow-sm ring-2 ring-indigo-300'
                        : 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-xs sm:text-sm font-bold px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-950 border border-indigo-300">
                        {proto.category}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-indigo-900 bg-indigo-100/80 px-3 py-1 rounded-lg border border-indigo-300">
                        {isSelected ? 'Thu gọn' : 'Xem phác đồ'}
                      </span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-base sm:text-lg mt-2">{proto.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">{proto.source}</p>
                  </div>

                  {isSelected && (
                    <div className="bg-white rounded-2xl border-2 border-indigo-600 p-4 sm:p-6 shadow-md space-y-4 overflow-hidden">
                      <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-200">
                        <div>
                          <span className="px-3 py-1 rounded-lg text-xs sm:text-sm font-bold bg-indigo-100 text-indigo-950 border border-indigo-300">
                            {proto.category}
                          </span>
                          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                            {proto.title}
                          </h2>
                          <p className="text-xs sm:text-sm text-emerald-800 font-bold mt-1">Nguồn: {proto.source}</p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedClassical(null);
                          }}
                          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold cursor-pointer shrink-0"
                        >
                          Đóng
                        </button>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <h4 className="text-sm sm:text-base font-bold text-slate-900">
                          Biện Chứng Kinh Lạc & Bệnh Cơ
                        </h4>
                        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">{proto.syndrome}</p>
                      </div>

                      <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200 space-y-2">
                        <h4 className="text-sm sm:text-base font-bold text-indigo-950">
                          Bộ Chủ Huyệt Nòng Cốt (14 Kinh Chính & Kỳ Huyệt)
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {proto.mainPoints.map((pt, i) => (
                            <span key={i} className="px-3 py-1.5 rounded-xl bg-white text-indigo-950 font-bold text-xs sm:text-sm border border-indigo-300">
                              {pt}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
                          Phối Huyệt Gia Giảm Theo Thể Bệnh Lâm Sàng
                        </h4>
                        <div className="space-y-2">
                          {proto.customPointsByType.map((item, i) => (
                            <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800">
                              <Check className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                        <h4 className="text-sm sm:text-base font-bold text-emerald-950 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-emerald-700 shrink-0" />
                          <span>Kỹ Thuật Mãng Châm Xuyên Huyệt & Thủ Pháp Đặc Hiệu</span>
                        </h4>
                        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                          {proto.mangChamTechnique}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: HOLOGRAPHIC APPENDICES & ORIGINAL PDF BOOK READER */}
      {activeTab === 'principles' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-2xs">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                Phụ Lục Sổ Tay Đổng Thị: Luật Toàn Tức & Chuyên Khảo Linh Cốt – Đại Bạch
              </h3>
            </div>

            <div className="space-y-4">
              {TUNG_APPENDICES.map((app) => (
                <div key={app.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <h4 className="text-base sm:text-lg font-extrabold text-cyan-950">{app.title}</h4>
                  <p className="text-sm text-emerald-800 font-semibold">{app.summary}</p>
                  <div className="space-y-2">
                    {app.content.map((para, i) => (
                      <p key={i} className="text-sm sm:text-base text-slate-800 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-2xs">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-700 shrink-0" />
                <span>Đọc Sách PDF Nguyên Bản (4 Cuốn Sách Châm Cứu)</span>
              </h3>
            </div>

            <div className="space-y-3">
              {pdfBooks.map((b) => {
                const isSelected = activePdf?.id === b.id;
                return (
                  <div key={b.id} className="space-y-2">
                    <div
                      onClick={() => setActivePdf(isSelected ? null : b)}
                      className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-cyan-50 border-cyan-600 ring-2 ring-cyan-300'
                          : 'bg-slate-50 hover:bg-white border-slate-200'
                      }`}
                    >
                      <div>
                        <span className="text-sm sm:text-base font-extrabold text-slate-900 block">
                          {b.title}
                        </span>
                        <span className="text-xs sm:text-sm text-slate-600 mt-1 block">
                          {b.desc}
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-cyan-900 bg-cyan-100 px-3 py-1.5 rounded-lg border border-cyan-300 shrink-0 self-start sm:self-center">
                        {isSelected ? 'Thu gọn sách' : 'Mở đọc PDF'}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="p-3.5 sm:p-4 rounded-xl bg-slate-100 border-2 border-cyan-600 space-y-3">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="text-sm font-bold text-slate-800">{b.title}</span>
                          <a
                            href={b.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-800 hover:bg-cyan-900 text-white text-xs sm:text-sm font-bold"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Mở Toàn Màn Hình</span>
                          </a>
                        </div>
                        <div className="rounded-xl overflow-hidden border border-slate-300 bg-white h-[550px] sm:h-[700px]">
                          <iframe
                            key={b.url}
                            src={b.url}
                            title={b.title}
                            className="w-full h-full border-0"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
