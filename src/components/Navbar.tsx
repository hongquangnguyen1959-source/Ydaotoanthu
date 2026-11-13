import React, { useState, useRef, useEffect } from 'react';
import {
  Stethoscope,
  BookOpen,
  Compass,
  Activity,
  Leaf,
  BrainCircuit,
  MessageSquare,
  Pill,
  Search,
  X,
  ArrowUpRight
} from 'lucide-react';
import { searchGlobalMedicalIndex, GlobalSearchItem } from '../utils/scientificMedicalEngine';
import { PWAInstallButton } from './PWAInstallButton';

export type ActiveTab =
  | 'symptom'
  | 'diagnose'
  | 'pharmacology'
  | 'library'
  | 'acupuncture'
  | 'herbal'
  | 'physiology'
  | 'chat';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  caseCount: number;
  onQuickConsult?: (prompt: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onQuickConsult
}) => {
  const [searchText, setSearchText] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const navItems: { id: ActiveTab; label: string; shortLabel: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'symptom', label: 'Khám Triệu Chứng', shortLabel: 'Khám Bệnh', icon: MessageSquare },
    { id: 'chat', label: 'Bác Sĩ AI Tư Vấn', shortLabel: 'Hội Chẩn AI', icon: BrainCircuit },
    { id: 'acupuncture', label: 'Huyệt Vị Thực Tế', shortLabel: 'Các Huyệt', icon: Compass },
    { id: 'pharmacology', label: 'Thuốc Tây Y A-Z', shortLabel: 'Thuốc Tây', icon: Pill },
    { id: 'herbal', label: 'Đông - Nam Dược', shortLabel: 'Đông Dược', icon: Leaf },
    { id: 'diagnose', label: 'Bệnh Án Tứ Chẩn', shortLabel: 'Bệnh Án', icon: Stethoscope },
    { id: 'library', label: 'Kho 65 Sách Y', shortLabel: '65 Sách Y', icon: BookOpen },
    { id: 'physiology', label: 'Sinh Lý & Dinh Dưỡng', shortLabel: 'Sinh Lý', icon: Activity },
  ];

  const searchResults: GlobalSearchItem[] = searchText.trim().length >= 2
    ? searchGlobalMedicalIndex(searchText)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectResult = (item: GlobalSearchItem, mode: 'consult' | 'navigate') => {
    setIsSearchOpen(false);
    setSearchText('');
    if (mode === 'consult' && onQuickConsult) {
      onQuickConsult(item.chatPrompt);
    } else {
      setActiveTab(item.targetTab);
    }
  };

  const [heroImgFailed, setHeroImgFailed] = useState(false);

  return (
    <header className="z-40 bg-[#FAF9F5] border-b border-stone-200 text-stone-900 w-full overflow-x-hidden">
      {/* Dignified Editorial Medical & Apothecary Header */}
      <div className="bg-gradient-to-br from-[#0A1A14] via-[#0F261D] to-[#08140F] text-[#F7F4EE] border-b border-emerald-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-stretch">
            {/* Editorial Title, Scope & Quiet Tabular Overview */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] uppercase tracking-[0.16em] font-semibold text-amber-300/90">
                    Đông · Tây Y Kết Hợp &nbsp;/&nbsp; Y Điển Lâm Sàng
                  </span>
                  <PWAInstallButton />
                </div>

                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl lg:text-[2.15rem] font-bold tracking-tight text-[#FAF7F2] leading-tight text-balance">
                    Y Đạo Toàn Thư
                  </h1>
                  <p className="text-sm sm:text-base font-medium text-emerald-100/90 mt-1 text-balance">
                    Chẩn Trị Lâm Sàng · Huyệt Đạo Thực Chứng · Dược Điển Toàn Tập
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-stone-300/90 leading-relaxed max-w-2xl">
                  Nền tảng tra cứu và đối chiếu chuyên sâu giữa Y học Cổ truyền và Y học Hiện đại — tích hợp hình ảnh thực tế, giải phẫu kinh lạc, hoạt chất Tây y và y văn kinh điển.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-300 tabular-nums">
                <span>
                  <strong className="text-amber-200 font-semibold">297</strong> Huyệt vị Đổng Thị &amp; WHO
                </span>
                <span aria-hidden="true" className="text-white/25">·</span>
                <span>
                  <strong className="text-amber-200 font-semibold">285</strong> Vị thuốc Đông dược
                </span>
                <span aria-hidden="true" className="text-white/25">·</span>
                <span>
                  <strong className="text-amber-200 font-semibold">Thuốc Tây Y</strong> A–Z
                </span>
                <span aria-hidden="true" className="text-white/25">·</span>
                <span>
                  <strong className="text-amber-200 font-semibold">65</strong> Y điển chọn lọc
                </span>
              </div>
            </div>

            {/* Single Symbolic Apothecary & Medical Craft Image */}
            <div className="lg:col-span-5">
              <button
                type="button"
                onClick={() => setActiveTab('herbal')}
                aria-label="Khám phá kho Dược Điển Đông - Nam Dược"
                className="group relative w-full h-44 sm:h-52 lg:h-full lg:min-h-[188px] rounded-2xl overflow-hidden border border-white/15 bg-[#122B22] shadow-lg cursor-pointer text-left block focus-visible:outline-2 focus-visible:outline-amber-300"
              >
                {!heroImgFailed ? (
                  <img
                    src="/assets/images/herbal_bensky_materia_1794277324736.jpg"
                    alt="Cân tiểu ly đồng và dược liệu cổ truyền tượng trưng cho nghề y dược"
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImgFailed(true)}
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#133025] to-[#0A1A14]">
                    <Leaf className="w-8 h-8 text-amber-300 mb-2" />
                    <span className="font-serif text-base font-bold text-[#FAF7F2]">
                      Tinh Hoa Y Dược Cổ Truyền &amp; Hiện Đại
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07130E]/90 via-[#07130E]/20 to-transparent flex flex-col justify-end p-4">
                  <span className="text-[10px] uppercase tracking-[0.14em] text-amber-300/90 font-semibold">
                    Y Đạo &amp; Bản Thảo Học
                  </span>
                  <div className="flex items-center justify-between gap-2 mt-0.5">
                    <span className="font-serif text-sm sm:text-base font-semibold text-white leading-snug">
                      Tinh hoa nghề thuốc Đông – Tây Y kết hợp
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-amber-200 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Search & Clean Architectural Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-3">
        {/* Omnibox Search Bar + Primary AI Consult CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div ref={searchContainerRef} className="relative flex-1">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchText}
                onFocus={() => setIsSearchOpen(true)}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setIsSearchOpen(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchText.trim()) {
                    setIsSearchOpen(false);
                    if (onQuickConsult) onQuickConsult(searchText.trim());
                    setSearchText('');
                  }
                }}
                placeholder="Tra cứu nhanh triệu chứng, huyệt vị, thuốc Tây Y, vị thuốc Đông y..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-stone-300/90 focus:border-[#0F3D2E] focus:ring-2 focus:ring-[#0F3D2E]/10 text-sm text-stone-900 placeholder-stone-400 focus:outline-none transition-all shadow-2xs"
              />
              {searchText && (
                <button
                  type="button"
                  onClick={() => setSearchText('')}
                  aria-label="Xóa từ khóa tìm kiếm"
                  className="absolute right-3 text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Instant Search Results Dropdown */}
            {isSearchOpen && searchText.trim().length >= 2 && (
              <div className="absolute left-0 right-0 mt-1.5 bg-white rounded-xl border border-stone-200 shadow-xl overflow-hidden z-50 max-h-96 overflow-y-auto">
                <div className="px-3.5 py-2.5 bg-stone-50 border-b border-stone-200 flex items-center justify-between text-xs sm:text-sm text-stone-700">
                  <span className="font-semibold tabular-nums">Kết quả tra cứu ({searchResults.length})</span>
                  <button
                    type="button"
                    onClick={() => {
                      const q = searchText.trim();
                      setIsSearchOpen(false);
                      setSearchText('');
                      if (onQuickConsult) onQuickConsult(q);
                    }}
                    className="text-[#0F3D2E] font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Hỏi Bác sĩ AI</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {searchResults.length === 0 ? (
                  <div className="p-4 text-center text-sm text-stone-700 space-y-2.5">
                    <p>Bấm nút bên dưới để Bác sĩ AI phân tích trực tiếp câu hỏi này.</p>
                    <button
                      type="button"
                      onClick={() => {
                        const q = searchText.trim();
                        setIsSearchOpen(false);
                        setSearchText('');
                        if (onQuickConsult) onQuickConsult(q);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#0F3D2E] text-white font-semibold text-sm cursor-pointer hover:bg-[#14523E] transition-colors"
                    >
                      Hỏi Bác sĩ AI: &ldquo;{searchText.trim()}&rdquo;
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-stone-100">
                    {searchResults.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 hover:bg-stone-50 transition-colors flex items-center justify-between gap-2"
                      >
                        <div
                          onClick={() => handleSelectResult(item, 'navigate')}
                          className="flex-1 min-w-0 cursor-pointer"
                        >
                          <div className="text-xs font-semibold text-emerald-800">
                            {item.category}
                          </div>
                          <div className="text-sm font-bold text-stone-900 truncate">
                            {item.title}
                          </div>
                          <div className="text-xs text-stone-600 truncate">
                            {item.subtitle}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleSelectResult(item, 'navigate')}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 cursor-pointer"
                          >
                            Xem
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSelectResult(item, 'consult')}
                            className="px-3 py-1.5 rounded-lg bg-[#0F3D2E] hover:bg-[#14523E] text-white text-xs font-semibold cursor-pointer"
                          >
                            Hỏi AI
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('chat')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F3D2E] hover:bg-[#15523E] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shrink-0 whitespace-nowrap shadow-2xs"
          >
            <BrainCircuit className="w-4 h-4 text-amber-300" />
            <span>Hội Chẩn AI</span>
          </button>
        </div>

        {/* Clean Segmented Navigation Tabs */}
        <nav
          aria-label="Điều hướng chuyên khoa"
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer whitespace-nowrap border ${
                  isActive
                    ? 'bg-[#0F3D2E] text-white border-[#0F3D2E] shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200/90 hover:border-emerald-800/30 hover:bg-emerald-50/40 hover:text-emerald-950'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-300' : 'text-emerald-800/75'}`} />
                <span className="truncate">{item.shortLabel}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
