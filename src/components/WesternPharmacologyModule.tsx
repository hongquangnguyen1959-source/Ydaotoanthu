import React, { useState, useMemo } from 'react';
import { WESTERN_DRUGS_DATABASE, WesternDrug } from '../data/westernDrugs';
import {
  Pill,
  Search,
  Sparkles,
  ShieldAlert,
  Activity,
  Send,
  Bookmark,
  X,
  Book,
  Grid,
  ListFilter,
  Zap,
  Building2
} from 'lucide-react';
import { HerbDrugInteractionAlert } from './HerbDrugInteractionAlert';

export const WesternPharmacologyModule: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDrug, setSelectedDrug] = useState<WesternDrug | null>(null);
  const [pharmacistQuestion, setPharmacistQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isAsking, setIsAsking] = useState(false);
  const [viewMode, setViewMode] = useState<'DICTIONARY' | 'CARDS'>('DICTIONARY');

  const alphabetList = ['ALL', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'V', 'Z'];

  const categories = [
    { id: 'ALL', code: 'Tất Cả', label: 'Tất Cả 7 Nhóm', count: WESTERN_DRUGS_DATABASE.length },
    { id: 'A', code: 'Nhóm A', label: 'Đau, Sốt, Viêm & Khớp', count: WESTERN_DRUGS_DATABASE.filter(d => d.category === 'A').length },
    { id: 'B', code: 'Nhóm B', label: 'Dạ Dày, Tiêu Hóa & Gan', count: WESTERN_DRUGS_DATABASE.filter(d => d.category === 'B').length },
    { id: 'C', code: 'Nhóm C', label: 'Hô Hấp & Dị Ứng', count: WESTERN_DRUGS_DATABASE.filter(d => d.category === 'C').length },
    { id: 'D', code: 'Nhóm D', label: 'Kháng Sinh, Nấm & Virus', count: WESTERN_DRUGS_DATABASE.filter(d => d.category === 'D').length },
    { id: 'E', code: 'Nhóm E', label: 'Tim Mạch, Huyết Áp & Mỡ Máu', count: WESTERN_DRUGS_DATABASE.filter(d => d.category === 'E').length },
    { id: 'F', code: 'Nhóm F', label: 'Nội Tiết & Tiểu Đường', count: WESTERN_DRUGS_DATABASE.filter(d => d.category === 'F').length },
    { id: 'G', code: 'Nhóm G', label: 'Thần Kinh, Tiền Đình & Ngủ', count: WESTERN_DRUGS_DATABASE.filter(d => d.category === 'G').length },
  ];

  const popularBrandShortcuts = [
    'Panadol', 'Nexium', 'Augmentin', 'Voltaren', 'Zinnat', 'Concor',
    'Lipitor', 'Glucophage', 'Tanganil', 'Singulair', 'Mobic', 'No-Spa'
  ];

  const filteredDrugs = useMemo(() => {
    return WESTERN_DRUGS_DATABASE.filter(drug => {
      const matchCategory = selectedCategory === 'ALL' || drug.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchQuery =
        query === '' ||
        drug.activeIngredient.toLowerCase().includes(query) ||
        drug.groupName.toLowerCase().includes(query) ||
        drug.commonBrandNames.some(b => b.toLowerCase().includes(query)) ||
        drug.indications.some(ind => ind.toLowerCase().includes(query)) ||
        drug.mechanismOfAction.toLowerCase().includes(query);

      const matchLetter =
        selectedLetter === 'ALL' ||
        drug.activeIngredient.toUpperCase().startsWith(selectedLetter) ||
        drug.commonBrandNames.some(b => b.toUpperCase().startsWith(selectedLetter));

      return matchCategory && matchQuery && matchLetter;
    });
  }, [selectedCategory, searchQuery, selectedLetter]);

  const matchedBrand = useMemo(() => {
    if (!selectedDrug || !searchQuery.trim()) return null;
    const query = searchQuery.trim().toLowerCase();
    return selectedDrug.commonBrandNames.find(b => b.toLowerCase().includes(query)) || null;
  }, [selectedDrug, searchQuery]);

  const displayVariants = useMemo(() => {
    if (!selectedDrug) return [];
    if (selectedDrug.brandVariants && selectedDrug.brandVariants.length > 0) {
      return selectedDrug.brandVariants;
    }
    return selectedDrug.commonBrandNames.map((brand, idx) => ({
      variantName: `${idx + 1}. Biệt Dược ${brand}`,
      manufacturer: `Hãng Dược Phẩm (${brand})`,
      ingredients: `Hoạt chất chính: ${selectedDrug.activeIngredient}`,
      specialEffect: `Biệt dược chứa hoạt chất ${selectedDrug.activeIngredient} theo chuẩn Dược thư Quốc gia, điều trị hiệu quả ${selectedDrug.indications[0] || 'bệnh lý lâm sàng'}.`
    }));
  }, [selectedDrug]);

  const handleSelectDrug = (drug: WesternDrug) => {
    if (selectedDrug?.id === drug.id) {
      setSelectedDrug(null);
    } else {
      setSelectedDrug(drug);
      setAiAnswer(null);
      setPharmacistQuestion('');
    }
  };

  const handleAskPharmacist = async () => {
    if (!pharmacistQuestion.trim() || !selectedDrug) return;
    setIsAsking(true);
    setAiAnswer(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);

    try {
      const { cleanMedicalText } = await import('../utils/scientificMedicalEngine');
      const res = await fetch('/api/ask-library', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          query: `Về thuốc ${selectedDrug.activeIngredient} (${selectedDrug.commonBrandNames.join(', ')}): ${pharmacistQuestion}`,
          bookId: `Dược thư Quốc gia Việt Nam & DiPiro Pharmacotherapy`,
        }),
      });
      clearTimeout(timeoutId);
      const data = await res.json();
      if (data.answer) {
        setAiAnswer(cleanMedicalText(data.answer));
      } else {
        setAiAnswer(
          `Theo Dược thư Quốc gia: ${selectedDrug.activeIngredient} (${selectedDrug.commonBrandNames.join(', ')}) thuộc nhóm ${selectedDrug.groupName}. Cơ chế: ${selectedDrug.mechanismOfAction}. Liều chuẩn: ${selectedDrug.standardDosage}. Cách dùng: ${selectedDrug.administration}. Chống chỉ định: ${selectedDrug.contraindications.join('; ')}.`
        );
      }
    } catch {
      clearTimeout(timeoutId);
      setAiAnswer(
        `Dược thư Quốc gia Việt Nam: ${selectedDrug.activeIngredient} có cơ chế ${selectedDrug.mechanismOfAction}. Lưu ý an toàn: ${selectedDrug.cautions.join('; ')}.`
      );
    } finally {
      setIsAsking(false);
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedLetter('ALL');
  };

  const renderExpandedDrugDetail = (drug: WesternDrug) => (
    <div className="w-full bg-white rounded-2xl border-2 border-cyan-600 p-4 sm:p-6 shadow-md space-y-4 overflow-hidden">
      {matchedBrand && (
        <div className="p-3.5 rounded-xl bg-cyan-50 border border-cyan-200 text-sm text-slate-800 leading-relaxed">
          Bạn đang xem chi tiết biệt dược <strong>{matchedBrand}</strong> với hoạt chất gốc là <strong>{drug.activeIngredient}</strong>.
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-lg bg-cyan-100 text-cyan-950 border border-cyan-300">
              {drug.categoryName}
            </span>
            <span className="text-xs sm:text-sm text-slate-700 font-semibold">
              {drug.groupName}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 break-words">
            {drug.activeIngredient}
          </h3>
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span className="text-xs sm:text-sm text-slate-600 font-semibold">Biệt dược:</span>
            {drug.commonBrandNames.map((bn, i) => (
              <span
                key={i}
                className="text-xs sm:text-sm font-bold px-2.5 py-0.5 rounded-lg border text-emerald-950 bg-emerald-50 border-emerald-200"
              >
                {bn}
              </span>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedDrug(null);
          }}
          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold cursor-pointer shrink-0"
        >
          Đóng
        </button>
      </div>

      {/* Indications */}
      <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
        <h4 className="text-sm sm:text-base font-bold text-emerald-950">
          1. Công Dụng & Chỉ Định Điều Trị
        </h4>
        <ul className="space-y-1.5 text-sm sm:text-base text-slate-800 leading-relaxed list-disc list-inside">
          {drug.indications.map((ind, i) => (
            <li key={i}>{ind}</li>
          ))}
        </ul>
      </div>

      {/* Dosage & Administration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <div className="text-xs sm:text-sm font-bold text-cyan-900 uppercase">
            2. Liều Dùng Chuẩn (Dược Thư Quốc Gia)
          </div>
          <p className="text-sm sm:text-base text-slate-900 font-semibold leading-relaxed">
            {drug.standardDosage}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <div className="text-xs sm:text-sm font-bold text-emerald-900 uppercase">
            3. Cách Uống & Thời Điểm Dùng Thuốc
          </div>
          <p className="text-sm sm:text-base text-slate-900 font-semibold leading-relaxed">
            {drug.administration}
          </p>
        </div>
      </div>

      {/* Mechanism of Action */}
      <div className="p-4 rounded-xl bg-cyan-50/60 border border-cyan-200 space-y-1.5">
        <h4 className="text-sm sm:text-base font-bold text-cyan-950">
          4. Cơ Chế Tác Dụng Dược Lý
        </h4>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          {drug.mechanismOfAction}
        </p>
      </div>

      {/* Brand Variants with Real Medicine Photos */}
      <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-3">
        <div className="flex items-center gap-2 font-bold text-indigo-950 text-sm sm:text-base">
          <Zap className="w-4 h-4 text-indigo-700 shrink-0" />
          <span>5. Chi Tiết Các Biệt Dược Thương Mại ({drug.commonBrandNames.length} Biệt Dược)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {displayVariants.map((bv, i) => (
            <div key={i} className="p-3.5 bg-white rounded-xl border border-indigo-100 shadow-2xs flex items-start gap-3">
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-bold text-indigo-950 text-sm sm:text-base break-words">
                    {bv.variantName}
                  </span>
                  <span className="text-xs font-semibold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-indigo-600 shrink-0" />
                    <span>{bv.manufacturer.split(' ')[0]}</span>
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-slate-700">
                  Thành phần: <strong className="text-slate-900">{bv.ingredients}</strong>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {bv.specialEffect}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contraindications & Cautions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-200 space-y-2">
          <div className="flex items-center gap-2 font-bold text-rose-900 text-sm sm:text-base">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Chống Chỉ Định</span>
          </div>
          <ul className="space-y-1.5 text-sm text-slate-800 leading-relaxed list-disc list-inside">
            {drug.contraindications.map((ct, i) => (
              <li key={i}>{ct}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-900 text-sm sm:text-base">
            <Activity className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Thận Trọng & Tác Dụng Phụ</span>
          </div>
          <ul className="space-y-1.5 text-sm text-slate-800 leading-relaxed list-disc list-inside">
            {drug.cautions.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Combination Protocols */}
      {drug.combinationProtocols && drug.combinationProtocols.length > 0 && (
        <div className="p-4 rounded-xl bg-teal-50/80 border border-teal-200 space-y-3">
          <div className="flex items-center gap-2 font-bold text-teal-950 text-sm sm:text-base">
            <Bookmark className="w-4 h-4 text-teal-700 shrink-0" />
            <span>Phác Đồ Phối Hợp Thuốc Điều Trị</span>
          </div>
          <div className="space-y-2.5">
            {drug.combinationProtocols.map((proto, i) => (
              <div key={i} className="p-3.5 bg-white rounded-xl border border-teal-100 space-y-1.5">
                <div className="font-bold text-slate-900 text-sm sm:text-base">
                  Bệnh lý: <span className="text-teal-900">{proto.diseaseName}</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm">
                  <span className="font-semibold text-slate-700">Phối hợp:</span>
                  {proto.combinedWith.map((cw, j) => (
                    <span
                      key={j}
                      className="bg-slate-100 text-slate-900 font-bold px-2.5 py-0.5 rounded-lg border border-slate-200"
                    >
                      {cw}
                    </span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-1 border-t border-slate-100">
                  <strong className="text-teal-950">Cơ chế phối hợp: </strong>
                  {proto.clinicalRationale}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Herb-Drug Interaction Alert */}
      <HerbDrugInteractionAlert
        herbs={['Đương Quy', 'Cam Thảo', 'Bạch Quả', 'Bạch Truật', 'Thạch Cao', 'Nhân Sâm', 'Ma Hoàng', 'Đan Sâm', 'Bạch Thược', 'Đại Hoàng']}
        drugs={[{
          name: drug.commonBrandNames[0] || drug.activeIngredient,
          activeIngredient: drug.activeIngredient,
          group: drug.groupName
        }]}
        protocolName={drug.activeIngredient}
      />

      {/* Ask Pharmacist AI */}
      <div className="pt-3 border-t border-slate-200 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-700 shrink-0" />
          <h4 className="text-sm sm:text-base font-bold text-slate-900">
            Hỏi Bác Sĩ / Dược Sĩ AI Về Thuốc Này
          </h4>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={pharmacistQuestion}
            onChange={(e) => setPharmacistQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAskPharmacist()}
            placeholder={`Nhập câu hỏi về thuốc ${drug.activeIngredient}...`}
            className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-600"
          />
          <button
            onClick={handleAskPharmacist}
            disabled={isAsking || !pharmacistQuestion.trim()}
            className="px-5 py-3 rounded-xl bg-cyan-800 hover:bg-cyan-900 disabled:opacity-50 text-white text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            {isAsking ? (
              <span>Đang trả lời...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Gửi câu hỏi</span>
              </>
            )}
          </button>
        </div>
        {aiAnswer && (
          <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-200 text-sm sm:text-base text-slate-800 leading-relaxed whitespace-pre-line">
            <div className="font-bold text-cyan-950 mb-1.5">
              Giải đáp chuyên môn từ Dược thư Quốc gia:
            </div>
            {aiAnswer}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 space-y-5 overflow-x-hidden">
      {/* Clean Clinical Header Banner (No Western Drug Photos) */}
      <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-xs p-5 sm:p-8 space-y-2">
        <div className="text-xs sm:text-sm text-cyan-800 font-bold">
          Dược Thư Quốc Gia Việt Nam · Từ Điển Thuốc & Biệt Dược A - Z
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
          Kho Từ Điển Thuốc Tây Y & Biệt Dược Lâm Sàng
        </h2>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Tra cứu chi tiết hoạt chất, biệt dược thương mại, công dụng, liều dùng chuẩn và cảnh báo tương tác thuốc. Thiết kế tự động thu gọn vừa khít màn hình điện thoại, bấm vào thuốc nào sẽ mở chi tiết ngay tại chỗ.
        </p>
      </div>

      {/* Search & Filter Controls (100% Mobile-Fitted, No Horizontal Overflow) */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-4">
        {/* Search Input */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Nhập tên thuốc hoặc biệt dược (Panadol, Nexium, Augmentin, Paracetamol...)"
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-cyan-600 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-200 cursor-pointer"
              title="Xóa tìm kiếm"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Popular Brand Shortcuts (Wrap cleanly on phone) */}
        <div className="space-y-1.5">
          <div className="text-xs sm:text-sm font-bold text-slate-700">
            Biệt dược tra cứu nhanh:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {popularBrandShortcuts.map((brand) => (
              <button
                key={brand}
                onClick={() => {
                  setSearchQuery(brand);
                  setSelectedLetter('ALL');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  searchQuery.toLowerCase() === brand.toLowerCase()
                    ? 'bg-cyan-800 text-white'
                    : 'bg-slate-100 text-slate-800 hover:bg-cyan-50 border border-slate-200'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Alphabet Filter A -> Z (Wraps cleanly inside phone screen) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5">
              <ListFilter className="w-4 h-4 text-cyan-700" />
              <span>Chọn chữ cái đầu tên thuốc (A - Z):</span>
            </span>
            {selectedLetter !== 'ALL' && (
              <button
                onClick={() => setSelectedLetter('ALL')}
                className="text-xs sm:text-sm text-cyan-800 font-bold underline cursor-pointer"
              >
                Hiện tất cả A-Z
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {alphabetList.map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedLetter === letter
                    ? 'bg-cyan-800 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-800 hover:bg-cyan-50 border border-slate-200'
                }`}
              >
                {letter === 'ALL' ? 'Tất Cả' : letter}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Buttons (Wraps cleanly inside phone screen) */}
        <div className="space-y-1.5 pt-1 border-t border-slate-100">
          <div className="text-xs sm:text-sm font-bold text-slate-700">
            Chọn nhóm bệnh lý điều trị:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === c.id
                    ? 'bg-cyan-800 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-800 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {c.code}: {c.label} ({c.count})
              </button>
            ))}
          </div>
        </div>

        {/* View Mode & Result Count Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('DICTIONARY')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                viewMode === 'DICTIONARY'
                  ? 'bg-cyan-800 text-white'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Book className="w-4 h-4" />
              <span>Danh Sách A-Z Gọn</span>
            </button>
            <button
              onClick={() => setViewMode('CARDS')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                viewMode === 'CARDS'
                  ? 'bg-cyan-800 text-white'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>Thẻ Chi Tiết</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-700">
            <span>
              Hiển thị <strong className="text-cyan-900 font-extrabold">{filteredDrugs.length}</strong> thuốc
            </span>
            {(searchQuery || selectedLetter !== 'ALL' || selectedCategory !== 'ALL') && (
              <button
                onClick={resetFilters}
                className="text-sm text-rose-700 font-bold underline cursor-pointer"
              >
                Xóa lọc
              </button>
            )}
          </div>
        </div>
      </div>

      {/* DRUG LIST (100% Mobile Responsive - Fits Inside Phone Viewport Without Horizontal Scroll) */}
      {filteredDrugs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
          <Pill className="w-10 h-10 text-slate-400 mx-auto" />
          <p className="text-base text-slate-700 font-medium">
            Không tìm thấy thuốc phù hợp với từ khóa đang chọn.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2.5 rounded-xl bg-cyan-800 text-white text-sm font-bold cursor-pointer hover:bg-cyan-900"
          >
            Xem toàn bộ danh sách thuốc A-Z
          </button>
        </div>
      ) : (
        <div className="space-y-3 w-full">
          {filteredDrugs.map((drug) => {
            const isSelected = selectedDrug?.id === drug.id;
            return (
              <div key={drug.id} className="w-full space-y-2">
                {/* Mobile-Fitted Drug Row / Card */}
                <div
                  onClick={() => handleSelectDrug(drug)}
                  className={`w-full p-3.5 sm:p-5 rounded-2xl cursor-pointer border transition-all flex items-start gap-3.5 sm:gap-4 ${
                    isSelected
                      ? 'bg-cyan-50/90 border-cyan-600 shadow-sm ring-2 ring-cyan-400'
                      : 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs'
                  }`}
                >
                  {/* Content - Wraps Cleanly Inside Phone Screen */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-cyan-100 text-cyan-950 border border-cyan-200">
                        {drug.categoryName.split('.')[0] || `Nhóm ${drug.category}`}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-cyan-900 bg-cyan-100/80 px-3 py-1 rounded-lg border border-cyan-300">
                        {isSelected ? 'Thu gọn' : 'Xem chi tiết'}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-base sm:text-lg break-words">
                      {drug.activeIngredient}
                    </h3>

                    {/* Brand Names */}
                    <div className="flex flex-wrap gap-1.5">
                      {drug.commonBrandNames.map((brand, i) => {
                        const isMatch =
                          searchQuery && brand.toLowerCase().includes(searchQuery.trim().toLowerCase());
                        return (
                          <span
                            key={i}
                            className={`text-xs sm:text-sm font-bold px-2.5 py-0.5 rounded-lg border ${
                              isMatch
                                ? 'bg-amber-100 text-amber-950 border-amber-400 ring-2 ring-amber-300'
                                : 'text-emerald-950 bg-emerald-50 border-emerald-200'
                            }`}
                          >
                            {brand}
                          </span>
                        );
                      })}
                    </div>

                    {/* Indications & Dosage Summary */}
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <strong>Công dụng: </strong>
                      {drug.indications.slice(0, 2).join('; ')}
                    </p>

                    {viewMode === 'CARDS' ? (
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <strong>Liều chuẩn: </strong>
                        {drug.standardDosage}
                      </p>
                    ) : (
                      <p className="text-xs sm:text-sm text-slate-600">
                        <strong>Nhóm: </strong>
                        {drug.groupName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Inline Expanded Drug Detail (Fits 100% Inside Phone Screen) */}
                {isSelected && renderExpandedDrugDetail(drug)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
