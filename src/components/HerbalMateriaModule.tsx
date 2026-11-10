import React, { useState, useMemo } from 'react';
import { HERBAL_MATERIA, Herb } from '../data/herbalMateria';
import { Search, BookCheck, ShieldAlert, Scale, Filter, BookOpen } from 'lucide-react';
import { HerbalVisualCard, getHerbVisualSpec } from './HerbalVisualCard';

export const HerbalMateriaModule: React.FC = () => {
  const [selectedHerb, setSelectedHerb] = useState<Herb | null>(null);

  const handleSelectHerb = (herb: Herb) => {
    setSelectedHerb((prev) => (prev?.id === herb.id ? null : herb));
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Extract unique categories from HERBAL_MATERIA database
  const categoriesList = useMemo(() => {
    const cats = Array.from(new Set(HERBAL_MATERIA.map((h) => h.category)));
    return ['ALL', ...cats];
  }, []);

  const filteredHerbs = useMemo(() => {
    return HERBAL_MATERIA.filter((h) => {
      const matchesCategory =
        selectedCategory === 'ALL' || h.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        h.vietnameseName.toLowerCase().includes(q) ||
        h.pinyinName.toLowerCase().includes(q) ||
        h.botanicalName.toLowerCase().includes(q) ||
        h.chineseCharacters.includes(q) ||
        h.category.toLowerCase().includes(q) ||
        h.actions.some((a) => a.toLowerCase().includes(q)) ||
        h.clinicalIndications.some((ind) => ind.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Botanical Hero Banner */}
      <div className="mb-6 rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center space-y-3">
            <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold">
              <span>Dược Điển Dan Bensky (3rd Edition)</span>
              <span aria-hidden="true">·</span>
              <span>Nam Dược Tuệ Tĩnh & Đỗ Tất Lợi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif tracking-tight">
              Toàn Bộ 19 Chương & Kho Vị Thuốc Cốt Lõi Dược Điển Bensky ({HERBAL_MATERIA.length} Vị Thuốc)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tích hợp chuẩn mực từ bộ dược điển <i>Chinese Herbal Medicine: Materia Medica</i> (Dan Bensky) và Nam dược Việt Nam: Hình ảnh dược liệu thực tế, Tên Pinyin, Tên Khoa Học Latin, Chữ Hán Cổ, Tính Vị Quy Kinh, Công Năng Chủ Trị, Liều Lượng Gram Chuẩn và Hoạt Chất Dược Lý.
            </p>
          </div>

          <div className="lg:col-span-5 relative min-h-[200px] bg-slate-900 overflow-hidden">
            <img
              src="/assets/images/herbal_bensky_materia_1794277324736.jpg"
              alt="Dược liệu Đông Y và Nam dược cổ truyền"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent flex flex-col justify-end p-4">
              <span className="text-xs font-serif font-bold text-white">
                Tinh Hoa Bản Thảo Học Đông Y & Nam Dược Việt Nam
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls: Search & Category Dropdown + Horizontal Pills */}
      <div className="space-y-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          {/* Category Dropdown */}
          <div className="flex items-center gap-2 min-w-[280px]">
            <BookOpen className="w-4 h-4 text-emerald-700 shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500 shadow-2xs"
            >
              <option value="ALL">Tất Cả 19 Chương Bensky ({HERBAL_MATERIA.length} Vị Thuốc)</option>
              {categoriesList.filter((c) => c !== 'ALL').map((cat) => {
                const count = HERBAL_MATERIA.filter((h) => h.category === cat).length;
                return (
                  <option key={cat} value={cat}>
                    {cat} ({count} vị)
                  </option>
                );
              })}
            </select>
          </div>

          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên vị thuốc, Pinyin (Ma Huang, Gui Zhi, Chai Hu, Ren Shen, Fu Zi...), tên Latin hoặc công năng..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-2xs"
            />
          </div>
        </div>

        {/* Horizontal Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-emerald-700 shrink-0 mr-1" />
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap border transition-all ${
              selectedCategory === 'ALL'
                ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50'
            }`}
          >
            Tất Cả ({HERBAL_MATERIA.length})
          </button>
          {categoriesList.filter((c) => c !== 'ALL').map((cat) => {
            const count = HERBAL_MATERIA.filter((h) => h.category === cat).length;
            const shortName = cat.split('(')[0].replace(/^\d+\.\s*/, '');
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap border transition-all ${
                  isActive
                    ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50'
                }`}
              >
                {shortName} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Herb Cards List with Immediate Inline Expansion */}
      <div className="space-y-3">
        <div className="space-y-3">
          {filteredHerbs.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
              Không tìm thấy vị thuốc phù hợp với từ khóa tra cứu.
            </div>
          ) : (
            filteredHerbs.map((herb) => {
              const isSelected = selectedHerb?.id === herb.id;
              const spec = getHerbVisualSpec(herb);
              return (
                <div key={herb.id} id={`herb-card-${herb.id}`} className="space-y-3">
                  {/* Herb Summary Card with Real Pharmacognosy Thumbnail */}
                  <div
                    onClick={() => handleSelectHerb(herb)}
                    className={`p-3.5 sm:p-4 rounded-2xl cursor-pointer border transition-all group ${
                      isSelected
                        ? 'bg-emerald-50/90 border-emerald-500 shadow-md ring-2 ring-emerald-400'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <HerbalVisualCard herb={herb} mode="thumbnail" />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
                          <span className="text-xs font-bold text-emerald-800 truncate">
                            {herb.pinyinName} ({herb.chineseCharacters})
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                              {herb.properties.nature}
                            </span>
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300">
                              {isSelected ? '▲ Thu gọn' : '▼ Chi tiết'}
                            </span>
                          </div>
                        </div>
                        <h3 className="font-bold text-slate-900 text-base font-serif leading-snug">
                          {herb.vietnameseName}
                        </h3>
                        <p className="text-xs text-slate-500 italic truncate">
                          {herb.botanicalName} · <span className="not-italic text-emerald-700 font-medium">{spec.partLabel}</span>
                        </p>
                        <div className="mt-1.5 text-[11px] text-slate-700 flex flex-wrap items-center justify-between gap-1">
                          <span className="truncate">
                            <strong className="text-emerald-800">Kinh: </strong>
                            {herb.properties.channels.join(', ')}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-semibold shrink-0">
                            {herb.dosageGram}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* INLINE EXPANDED DETAIL VIEW (Immediately under clicked card for mobile & instant viewing!) */}
                  {isSelected && (
                    <div className="bg-white rounded-3xl border-2 border-emerald-500 p-4 sm:p-6 shadow-lg animate-fadeIn my-2 overflow-x-hidden">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-4">
                        <div>
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 inline-block mb-1">
                            {herb.category}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif">
                            {herb.vietnameseName}{' '}
                            <span className="text-base font-normal text-emerald-800">
                              {herb.chineseCharacters} ({herb.pinyinName})
                            </span>
                          </h3>
                          <p className="text-xs text-slate-500 italic font-mono mt-0.5">
                            Pharmaceutical Latin: {herb.botanicalName}
                          </p>
                        </div>
                        <div className="text-left sm:text-right">
                          <span className="text-[11px] font-semibold text-slate-500">Liều Dùng Tiêu Chuẩn Bensky:</span>
                          <div className="text-xs font-extrabold text-emerald-800 font-mono flex items-center sm:justify-end gap-1 mt-0.5">
                            <Scale className="w-3.5 h-3.5 text-emerald-700" />
                            {herb.dosageGram}
                          </div>
                        </div>
                      </div>

                      {/* Real Pharmacognosy Specimen Photo Card */}
                      <HerbalVisualCard herb={herb} mode="expanded" />


                      {/* Properties (Always 1 row with 3 columns, full text wrap) */}
                      <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 my-4">
                        <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col justify-center">
                          <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500 block leading-none">Tứ Khí (Tính)</span>
                          <p className="text-[11px] sm:text-xs font-bold text-emerald-900 mt-1 leading-snug break-words">{herb.properties.nature}</p>
                        </div>
                        <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col justify-center">
                          <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500 block leading-none">Ngũ Vị</span>
                          <p className="text-[11px] sm:text-xs font-bold text-cyan-900 mt-1 leading-snug break-words">{herb.properties.flavors.join(', ')}</p>
                        </div>
                        <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col justify-center">
                          <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500 block leading-none">Quy Kinh</span>
                          <p className="text-[11px] sm:text-xs font-bold text-amber-900 mt-1 leading-snug break-words">{herb.properties.channels.join(', ')}</p>
                        </div>
                      </div>

                      {/* Actions & Indications */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                          <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2">
                            Công Năng Dược Lý
                          </h4>
                          <ul className="space-y-1 text-xs text-slate-800">
                            {herb.actions.map((act, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-emerald-700 font-bold">✔</span>
                                <span className="font-medium">{act}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                          <h4 className="text-xs font-bold text-cyan-900 uppercase tracking-wider mb-2">
                            Chủ Trị Lâm Sàng
                          </h4>
                          <ul className="space-y-1 text-xs text-slate-700">
                            {herb.clinicalIndications.map((ind, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-cyan-700 font-bold">•</span>
                                <span>{ind}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Contraindications & Dan Bensky Notes */}
                      <div className="space-y-3">
                        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs">
                          <div className="flex items-center gap-1.5 font-bold text-rose-800 mb-1">
                            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                            <span>Cấm Kỵ & Lưu Ý Độc Tính (Contraindications & Toxicity)</span>
                          </div>
                          <p className="text-rose-900 leading-relaxed font-medium">{herb.contraindications}</p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs">
                          <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
                            <BookCheck className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Phân Tích Chuyên Sâu từ Dan Bensky (Materia Medica 3rd Ed)</span>
                          </div>
                          <p className="text-slate-800 leading-relaxed italic">{herb.benskyNotes}</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedHerb(null);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                        >
                          ▲ Thu gọn chi tiết vị thuốc
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
