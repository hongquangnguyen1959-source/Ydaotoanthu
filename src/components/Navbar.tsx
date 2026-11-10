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

  return (
    <header className="z-40 bg-white border-b border-slate-200 text-slate-900 w-full overflow-x-hidden">
      {/* Top Visual Banner with Real Clinical & Pharmaceutical Photos */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-center">
            {/* Brand Title & Clear Description */}
            <div className="lg:col-span-5 space-y-1.5">
              <div className="flex flex-wrap items-center justify-between sm:justify-start gap-2">
                <div className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-600 text-white text-xs font-bold">
                  Hệ Thống Y Học Đông - Tây Y Kết Hợp
                </div>
                <PWAInstallButton />
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                Y Đạo Toàn Thư · Chẩn Trị & Dược Điển
              </h1>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Tra cứu hình ảnh thật 297 Huyệt vị (Đổng Thị & WHO), Thuốc Tây Y A-Z, Thảo dược và 65 Sách Y khoa.
              </p>
            </div>

            {/* 3 Real Photographic Quick-Switch Cards (Acupoints & Herbs, No Western Drug Photos) */}
            <div className="lg:col-span-7 grid grid-cols-3 gap-2 sm:gap-3">
              <div
                onClick={() => setActiveTab('acupuncture')}
                className="group relative h-20 sm:h-24 rounded-xl overflow-hidden border border-slate-700 cursor-pointer"
              >
                <img
                  src="/assets/images/real_hand_palmar_1794279448548.jpg"
                  alt="Hình ảnh thật huyệt bàn tay và tứ chi"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-2">
                  <span className="text-xs sm:text-sm font-bold text-white leading-tight">
                    Huyệt Tay & Chân
                  </span>
                </div>
              </div>

              <div
                onClick={() => setActiveTab('acupuncture')}
                className="group relative h-20 sm:h-24 rounded-xl overflow-hidden border border-slate-700 cursor-pointer"
              >
                <img
                  src="/assets/images/real_face_closeup_front_1794280802766.jpg"
                  alt="Hình ảnh thật huyệt đầu mặt và thân mình"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-2">
                  <span className="text-xs sm:text-sm font-bold text-white leading-tight">
                    Huyệt Đầu Mặt & Thân
                  </span>
                </div>
              </div>

              <div
                onClick={() => setActiveTab('herbal')}
                className="group relative h-20 sm:h-24 rounded-xl overflow-hidden border border-slate-700 cursor-pointer"
              >
                <img
                  src="/assets/images/herbal_bensky_materia_1794277324736.jpg"
                  alt="Hình ảnh thật Đông Nam dược"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-2">
                  <span className="text-xs sm:text-sm font-bold text-white leading-tight">
                    Hình Thảo Dược
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Search & Navigation Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 space-y-2.5">
        {/* Search Bar + Primary AI Doctor Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div ref={searchContainerRef} className="relative flex-1">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
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
                placeholder="Tìm nhanh bệnh, huyệt, thuốc Tây, vị thuốc..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-100 focus:bg-white border border-slate-300 focus:border-emerald-600 text-sm text-slate-900 placeholder-slate-500 focus:outline-none transition-all"
              />
              {searchText && (
                <button
                  type="button"
                  onClick={() => setSearchText('')}
                  className="absolute right-3 text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Instant Search Results Dropdown */}
            {isSearchOpen && searchText.trim().length >= 2 && (
              <div className="absolute left-0 right-0 mt-1.5 bg-white rounded-xl border border-slate-300 shadow-xl overflow-hidden z-50 max-h-96 overflow-y-auto">
                <div className="px-3.5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs sm:text-sm text-slate-700">
                  <span className="font-semibold">Kết quả tra cứu ({searchResults.length})</span>
                  <button
                    type="button"
                    onClick={() => {
                      const q = searchText.trim();
                      setIsSearchOpen(false);
                      setSearchText('');
                      if (onQuickConsult) onQuickConsult(q);
                    }}
                    className="text-emerald-800 font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Hỏi Bác sĩ AI</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {searchResults.length === 0 ? (
                  <div className="p-4 text-center text-sm text-slate-700 space-y-2.5">
                    <p>Bấm nút bên dưới để Bác sĩ AI trả lời trực tiếp câu hỏi này.</p>
                    <button
                      type="button"
                      onClick={() => {
                        const q = searchText.trim();
                        setIsSearchOpen(false);
                        setSearchText('');
                        if (onQuickConsult) onQuickConsult(q);
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-sm cursor-pointer hover:bg-emerald-800"
                    >
                      Hỏi Bác sĩ AI: "{searchText.trim()}"
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {searchResults.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 hover:bg-slate-50 transition-colors flex items-center justify-between gap-2"
                      >
                        <div
                          onClick={() => handleSelectResult(item, 'navigate')}
                          className="flex-1 min-w-0 cursor-pointer"
                        >
                          <div className="text-xs font-bold text-emerald-800">
                            {item.category}
                          </div>
                          <div className="text-sm font-bold text-slate-900 truncate">
                            {item.title}
                          </div>
                          <div className="text-xs text-slate-600 truncate">
                            {item.subtitle}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleSelectResult(item, 'navigate')}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer"
                          >
                            Xem
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSelectResult(item, 'consult')}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-bold cursor-pointer"
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
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer shrink-0"
          >
            <BrainCircuit className="w-4 h-4" />
            <span>Hội Chẩn AI</span>
          </button>
        </div>

        {/* Mobile-Fitted Navigation Grid (Wraps cleanly inside phone screen without horizontal scroll) */}
        <nav
          aria-label="Điều hướng chuyên khoa"
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 pt-1"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.shortLabel}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
