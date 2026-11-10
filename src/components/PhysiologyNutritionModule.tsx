import React, { useState } from 'react';
import { WESTERN_DISEASES, WesternDisease } from '../data/westernDiseases';
import { Activity, Apple, BookOpen, AlertOctagon, Search } from 'lucide-react';

export const PhysiologyNutritionModule: React.FC = () => {
  const [selectedDisease, setSelectedDisease] = useState<WesternDisease | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectDisease = (d: WesternDisease) => {
    setSelectedDisease((prev) => (prev?.id === d.id ? null : d));
  };

  const filteredDiseases = WESTERN_DISEASES.filter((d) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      q === '' ||
      d.nameVi.toLowerCase().includes(q) ||
      d.nameEn.toLowerCase().includes(q) ||
      d.icd10.toLowerCase().includes(q) ||
      d.guytonPhysiology.system.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold mb-3 border border-cyan-300 shadow-2xs">
          <Activity className="w-3.5 h-3.5 text-cyan-700" />
          <span>Guyton & Hall (15th Ed) • Essentials of Nutrition • Thuật Ngữ Y Khoa</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif tracking-tight">
          Sinh Lý Học Lâm Sàng & Dinh Dưỡng Trị Liệu Tây Y
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
          Giải thích cơ chế bệnh học tế bào & nội môi (Homeostasis), đối chiếu thuật ngữ song ngữ Anh - Việt (BS. Nguyễn Thái Duy) và phác đồ dinh dưỡng lâm sàng không dùng thuốc.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mb-6">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo bệnh danh Tây Y, mã ICD-10 (Hypertension, GERD, Sciatica...)"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-cyan-500 shadow-2xs"
          />
        </div>
      </div>

      {/* Disease Cards List with Immediate Inline Expansion */}
      <div className="space-y-3">
        <div className="space-y-3">
          {filteredDiseases.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
              Không tìm thấy bệnh lý phù hợp với từ khóa tra cứu.
            </div>
          ) : (
            filteredDiseases.map((d) => {
              const isSelected = selectedDisease?.id === d.id;
              return (
                <div key={d.id} id={`disease-card-${d.id}`} className="space-y-3">
                  {/* Summary Card */}
                  <div
                    onClick={() => handleSelectDisease(d)}
                    className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                      isSelected
                        ? 'bg-cyan-50/90 border-cyan-500 shadow-md ring-2 ring-cyan-400'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-cyan-800 font-mono">
                        ICD-10: {d.icd10}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                          Tây Y
                        </span>
                        <span className="text-[11px] font-bold text-cyan-700 bg-cyan-100/80 px-2 py-0.5 rounded-full border border-cyan-300">
                          {isSelected ? '▲ Thu gọn' : '▼ Xem chi tiết'}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base font-serif">{d.nameVi}</h3>
                    <p className="text-xs text-slate-500 italic mt-0.5">{d.nameEn}</p>
                    <div className="mt-2 text-[11px] text-emerald-800 font-bold">
                      ☯ Đông y tương ứng: {d.tcmSyndromeCorrespondence.split('/')[0]}
                    </div>
                  </div>

                  {/* INLINE EXPANDED DETAIL VIEW (Immediately under clicked card for mobile & instant viewing!) */}
                  {isSelected && (
                    <div className="bg-white rounded-3xl border-2 border-cyan-500 p-5 sm:p-6 shadow-lg animate-fadeIn my-2 space-y-5">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                        <div>
                          <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-900 border border-cyan-300 inline-block mb-1">
                            Mã ICD-10: {d.icd10}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif">
                            {d.nameVi}
                          </h3>
                          <p className="text-xs text-cyan-800 italic font-medium mt-0.5">
                            {d.nameEn}
                          </p>
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                          <span className="text-slate-500 block text-[10px]">Đông Y Đối Chiếu:</span>
                          <span className="text-emerald-800 font-bold text-xs">{d.tcmSyndromeCorrespondence}</span>
                        </div>
                      </div>

                      {/* Medical Roots */}
                      <div>
                        <h4 className="text-xs font-bold text-cyan-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-cyan-700" />
                          Giải Mã Thuật Ngữ Y Khoa (BS. Nguyễn Thái Duy)
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {d.medicalRoots.map((root, i) => (
                            <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                              <span className="font-bold text-slate-900 font-mono">{root.term}</span>
                              <p className="text-[10px] text-cyan-800 font-medium mt-0.5">{root.etymology}</p>
                              <p className="text-slate-600 text-[10px] mt-0.5">{root.meaning}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Guyton Physiology */}
                      <div className="p-4 rounded-2xl bg-cyan-50/60 border border-cyan-200 text-xs">
                        <div className="flex items-center gap-2 mb-2 font-bold text-cyan-900 uppercase tracking-wider">
                          <Activity className="w-3.5 h-3.5 text-cyan-700" />
                          <span>Sinh Lý Bệnh Học & Nội Môi (Guyton & Hall 15th Ed)</span>
                        </div>
                        <p className="font-bold text-slate-900 mb-1.5">
                          Hệ cơ quan: <span className="text-cyan-800">{d.guytonPhysiology.system}</span>
                        </p>
                        <p className="text-slate-800 leading-relaxed mb-2">
                          <strong className="text-cyan-900">Rối loạn nội môi: </strong>
                          {d.guytonPhysiology.homeostasisDisruption}
                        </p>
                        <p className="text-slate-700 leading-relaxed">
                          <strong className="text-cyan-900">Cơ chế tế bào & huyết động: </strong>
                          {d.guytonPhysiology.cellularHemodynamicMechanism}
                        </p>

                        {/* Clinical Parameters */}
                        <div className="mt-3 pt-3 border-t border-cyan-200">
                          <span className="font-bold text-slate-700 uppercase tracking-wider block mb-1.5 text-[10px]">
                            Ngưỡng Lâm Sàng Theo Dõi
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {d.guytonPhysiology.clinicalParameters.map((param, i) => (
                              <div key={i} className="p-2 rounded-lg bg-white border border-cyan-100 text-[11px] shadow-2xs">
                                <span className="font-bold text-slate-900 block">{param.name}</span>
                                <span className="text-emerald-800 font-bold block">Chuẩn: {param.normalRange}</span>
                                <span className="text-rose-700 font-semibold block">Cảnh báo: {param.criticalWarning}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Nutrition */}
                      <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 text-xs">
                        <div className="flex items-center gap-2 mb-2 font-bold text-emerald-900 uppercase tracking-wider">
                          <Apple className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Dinh Dưỡng Lâm Sàng Trị Liệu (Essentials of Nutrition)</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                          <div>
                            <h5 className="font-bold text-emerald-900 mb-1 text-[11px]">Món Ăn & Vi Chất Nên Dùng</h5>
                            <ul className="space-y-1 text-slate-800">
                              {d.essentialsOfNutrition.foodsToPrioritize.map((food, i) => (
                                <li key={i} className="flex items-center gap-1.5 font-medium">
                                  <span className="text-emerald-700">✓</span> {food}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-bold text-rose-900 mb-1 text-[11px]">Thực Phẩm Cần Kiêng Khem</h5>
                            <ul className="space-y-1 text-slate-700">
                              {d.essentialsOfNutrition.foodsToAvoid.map((food, i) => (
                                <li key={i} className="flex items-center gap-1.5">
                                  <span className="text-rose-600 font-bold">✗</span> {food}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {d.essentialsOfNutrition.drugNutrientInteractions.length > 0 && (
                          <div className="mt-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                            <strong className="text-amber-950 block mb-0.5">Tương Tác Thuốc - Thức Ăn:</strong>
                            {d.essentialsOfNutrition.drugNutrientInteractions.map((inter, i) => (
                              <p key={i}>• {inter}</p>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Red Flags */}
                      <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900">
                        <div className="flex items-center gap-2 font-bold text-rose-800 mb-1.5">
                          <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
                          <span>Cảnh Báo Cấp Cứu Khẩn Cấp (Red Flags)</span>
                        </div>
                        <ul className="space-y-1">
                          {d.redFlags.map((flag, i) => (
                            <li key={i} className="flex items-start gap-1.5 font-medium">
                              <span className="text-rose-600 font-bold">!</span>
                              <span>{flag}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDisease(null);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                        >
                          ▲ Thu gọn chi tiết bệnh lý
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
