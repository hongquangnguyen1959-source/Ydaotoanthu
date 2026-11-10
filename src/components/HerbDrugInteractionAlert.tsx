/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * COMPONENT: CẢNH BÁO TƯƠNG TÁC THUỐC ĐÔNG - TÂY Y
 * Trực quan hóa tương tác dược lý giữa thảo dược cổ phương và tân dược
 */

import React, { useState, useMemo } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Info, 
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Pill,
  Leaf
} from 'lucide-react';
import { 
  analyzeHerbDrugInteractions, 
  HERB_DRUG_RULES, 
  HerbDrugMatch, 
  InteractionSeverity 
} from '../utils/herbDrugInteractions';

interface HerbDrugInteractionAlertProps {
  herbs: (string | { name: string; amount?: string })[];
  drugs: (string | { name: string; activeIngredient?: string; group?: string })[];
  formulaName?: string;
  protocolName?: string;
  compact?: boolean;
}

export const HerbDrugInteractionAlert: React.FC<HerbDrugInteractionAlertProps> = ({
  herbs,
  drugs,
  formulaName,
  protocolName,
  compact = false,
}) => {
  const [showDetails, setShowDetails] = useState<boolean>(true);
  const [showCustomTester, setShowCustomTester] = useState<boolean>(false);

  // Custom quick tester state
  const [customHerb, setCustomHerb] = useState<string>('Đương Quy');
  const [customDrug, setCustomDrug] = useState<string>('Aspirin 81mg (Kháng kết tập tiểu cầu)');
  const [customResult, setCustomResult] = useState<HerbDrugMatch | null>(null);

  // Run analysis on current regimen
  const analysis = useMemo(() => {
    return analyzeHerbDrugInteractions(herbs, drugs);
  }, [herbs, drugs]);

  // Handle custom interactive test
  const handleRunCustomTest = () => {
    if (!customHerb.trim() || !customDrug.trim()) return;
    const testRes = analyzeHerbDrugInteractions([customHerb], [customDrug]);
    if (testRes.matches.length > 0) {
      setCustomResult(testRes.matches[0]);
    } else {
      setCustomResult({
        herbName: customHerb,
        drugName: customDrug,
        severity: 'safe',
        title: 'KHÔNG PHÁT HIỆN TƯƠNG TÁC ĐỐI KHÁNG ĐẶC HIỆU',
        mechanism: 'Chưa ghi nhận tương tác đối kháng dược lý bất lợi trực tiếp giữa hai thành phần này trong Dược thư Quốc gia VN và Stockley.',
        clinicalRisk: 'Nguy cơ thấp. Có thể dùng phối hợp an toàn.',
        recommendation: 'Tuân thủ quy tắc giãn cách thời gian: Uống thuốc Đông y cách thuốc Tây y ít nhất 1.5 - 2 giờ để tránh cạnh tranh hấp thu tại dạ dày - ruột.',
        evidenceSource: 'Dược thư Quốc gia Việt Nam & Lexicomp Drug Interactions'
      });
    }
  };

  const samplePairs = [
    { herb: 'Đương Quy', drug: 'Aspirin 81mg (Thuốc chống đông)' },
    { herb: 'Cam Thảo', drug: 'Furosemide 40mg (Thuốc lợi tiểu)' },
    { herb: 'Cam Thảo', drug: 'Telmisartan 40mg (Thuốc hạ huyết áp)' },
    { herb: 'Bạch Quả', drug: 'Meloxicam 15mg (Thuốc giảm đau NSAID)' },
    { herb: 'Thạch Cao', drug: 'Ciprofloxacin 500mg (Kháng sinh Quinolone)' },
    { herb: 'Nhân Sâm', drug: 'Metformin 850mg (Thuốc tiểu đường)' },
    { herb: 'Bạch Thược', drug: 'Eperisone 50mg (Thuốc giãn cơ)' },
    { herb: 'Bạch Truật', drug: 'Meloxicam 15mg (Thuốc NSAID)' }
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all">
      {/* Banner Header */}
      <div 
        className={`p-5 sm:p-6 border-b transition-colors ${
          analysis.dangerCount > 0 
            ? 'bg-rose-50/80 border-rose-200' 
            : analysis.warningCount > 0 
            ? 'bg-amber-50/80 border-amber-200' 
            : analysis.synergyCount > 0
            ? 'bg-emerald-50/80 border-emerald-200'
            : 'bg-slate-50 border-slate-200'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div 
              className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                analysis.dangerCount > 0 
                  ? 'bg-rose-600 text-white animate-pulse' 
                  : analysis.warningCount > 0 
                  ? 'bg-amber-500 text-white' 
                  : analysis.synergyCount > 0
                  ? 'bg-emerald-600 text-white'
                  : 'bg-teal-600 text-white'
              }`}
            >
              {analysis.dangerCount > 0 ? (
                <ShieldAlert className="w-6 h-6" />
              ) : analysis.warningCount > 0 ? (
                <AlertTriangle className="w-6 h-6" />
              ) : analysis.synergyCount > 0 ? (
                <Sparkles className="w-6 h-6" />
              ) : (
                <ShieldCheck className="w-6 h-6" />
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span 
                  className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    analysis.dangerCount > 0 
                      ? 'bg-rose-100 text-rose-900 border-rose-300' 
                      : analysis.warningCount > 0 
                      ? 'bg-amber-100 text-amber-900 border-amber-300' 
                      : analysis.synergyCount > 0
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : 'bg-teal-100 text-teal-900 border-teal-300'
                  }`}
                >
                  {analysis.dangerCount > 0 
                    ? 'Phát hiện cảnh báo tương tác nguy cơ cao' 
                    : analysis.warningCount > 0 
                    ? 'Cần theo dõi & điều chỉnh khoảng cách' 
                    : analysis.synergyCount > 0
                    ? 'Hiệp đồng Đông - Tây Y có lợi' 
                    : 'Độ tương thích cao • An toàn'}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  (Dược thư Quốc gia VN, Stockley & DiPiro)
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-extrabold text-slate-900 font-serif">
                Hệ Thống Kiểm Soát Tương Tác Dược Lý Đông - Tây Y
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Đã quét tự động <strong>{analysis.totalHerbsChecked} vị thuốc</strong> ({formulaName || 'Thang thuốc'}) với <strong>{analysis.totalDrugsChecked} tân dược</strong> ({protocolName || 'Đơn thuốc Tây'}).
              </p>
            </div>
          </div>

          {/* Action pills & toggle */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => setShowCustomTester(!showCustomTester)}
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span>Tra cứu vị thuốc khác</span>
            </button>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="p-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-600 border border-slate-300 transition-all cursor-pointer"
              title="Thu gọn / Mở rộng"
            >
              {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Counter badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-3 border-t border-slate-200/60">
          <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
              <span className="text-xs font-bold text-slate-700">Nguy hiểm / Chống chỉ định:</span>
            </div>
            <span className={`text-xs font-mono font-extrabold px-2 py-0.5 rounded-md ${analysis.dangerCount > 0 ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-500'}`}>
              {analysis.dangerCount}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="text-xs font-bold text-slate-700">Thận trọng theo dõi:</span>
            </div>
            <span className={`text-xs font-mono font-extrabold px-2 py-0.5 rounded-md ${analysis.warningCount > 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'}`}>
              {analysis.warningCount}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <span className="text-xs font-bold text-slate-700">Hiệp đồng có lợi:</span>
            </div>
            <span className={`text-xs font-mono font-extrabold px-2 py-0.5 rounded-md ${analysis.synergyCount > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
              {analysis.synergyCount}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
              <span className="text-xs font-bold text-slate-700">Phối hợp an toàn:</span>
            </div>
            <span className="text-xs font-mono font-extrabold px-2 py-0.5 rounded-md bg-teal-50 text-teal-800">
              {analysis.safeCount} cặp
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {showDetails && (
        <div className="p-5 sm:p-6 space-y-5 bg-white">
          {/* Golden Spacing Rule */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200 text-amber-950 flex items-start gap-3 shadow-2xs">
            <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm">
              <strong className="text-amber-900 block font-bold">
                QUY TẮC VÀNG VỀ THỜI GIAN UỐNG THUỐC ĐÔNG - TÂY Y (Dược Thư Quốc Gia):
              </strong>
              <p className="text-amber-900/90 leading-relaxed text-xs">
                {analysis.goldenRule}
              </p>
            </div>
          </div>

          {/* Matches List */}
          {analysis.matches.length > 0 ? (
            <div className="space-y-4">
              <h5 className="font-extrabold text-slate-900 text-xs sm:text-sm uppercase tracking-wide flex items-center gap-2">
                <span>Chi Tiết Các Tương Tác Dược Lý Được Phát Hiện Trong Đơn:</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
                  {analysis.matches.length} tương tác
                </span>
              </h5>

              <div className="space-y-3.5">
                {analysis.matches.map((item, idx) => {
                  const isDanger = item.severity === 'danger';
                  const isWarning = item.severity === 'warning';
                  const isSynergy = item.severity === 'synergy';

                  return (
                    <div 
                      key={idx}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-3 shadow-2xs ${
                        isDanger 
                          ? 'bg-rose-50/50 border-rose-300' 
                          : isWarning 
                          ? 'bg-amber-50/50 border-amber-300' 
                          : 'bg-emerald-50/50 border-emerald-300'
                      }`}
                    >
                      {/* Pair title */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-200/80">
                        <div className="flex items-center gap-2">
                          <span 
                            className={`px-2.5 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wider ${
                              isDanger 
                                ? 'bg-rose-600 text-white' 
                                : isWarning 
                                ? 'bg-amber-600 text-white' 
                                : 'bg-emerald-700 text-white'
                            }`}
                          >
                            {isDanger ? 'Nguy Hiểm' : isWarning ? 'Cần Theo Dõi' : 'Hiệp Đồng Tốt'}
                          </span>
                          <h6 className="font-extrabold text-slate-900 text-sm">
                            {item.title}
                          </h6>
                        </div>

                        <span className="text-[11px] text-slate-500 font-medium">
                          Nguồn: {item.evidenceSource}
                        </span>
                      </div>

                      {/* Herb & Drug Badges */}
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-300 shadow-2xs text-slate-800">
                          <Leaf className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Vị thuốc: <strong>{item.herbName}</strong></span>
                        </div>
                        <span className="text-slate-400 font-bold">⇄</span>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-300 shadow-2xs text-slate-800">
                          <Pill className="w-3.5 h-3.5 text-cyan-700" />
                          <span>Thuốc Tây: <strong>{item.drugName}</strong></span>
                        </div>
                      </div>

                      {/* Mechanism and clinical details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                          <strong className="text-slate-900 block text-[11px] font-bold">
                            Cơ chế tương tác phân tử:
                          </strong>
                          <p className="text-slate-700 leading-relaxed text-xs">
                            {item.mechanism}
                          </p>
                        </div>

                        <div className={`p-3 rounded-xl border space-y-1 ${
                          isDanger 
                            ? 'bg-rose-100/60 border-rose-200 text-rose-950' 
                            : isWarning 
                            ? 'bg-amber-100/60 border-amber-200 text-amber-950' 
                            : 'bg-emerald-100/60 border-emerald-200 text-emerald-950'
                        }`}>
                          <strong className="block text-[11px] font-bold">
                            {isSynergy ? 'Lợi ích điều trị:' : 'Hậu quả lâm sàng tiềm tàng:'}
                          </strong>
                          <p className="leading-relaxed text-xs">
                            {item.clinicalRisk}
                          </p>
                        </div>
                      </div>

                      {/* Actionable recommendation */}
                      <div className="p-3 rounded-xl bg-slate-900 text-white text-xs flex items-start gap-2.5 shadow-xs">
                        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-300 font-bold block mb-0.5">
                            Khuyến cáo điều chỉnh của Dược sĩ Lâm sàng:
                          </strong>
                          <p className="text-slate-200 leading-relaxed">
                            {item.recommendation}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 text-teal-950 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0" />
              <div className="text-xs sm:text-sm">
                <strong className="text-teal-900 block font-bold">
                  Không ghi nhận tương tác bất lợi trực tiếp giữa các vị thuốc và tân dược trong đơn này.
                </strong>
                <p className="text-teal-800 text-xs mt-0.5">
                  Các vị thuốc cổ phương và thuốc Tây trong phác đồ có độ tương thích cao. Bệnh nhân chỉ cần duy trì khoảng cách uống 1.5 - 2 giờ để tối ưu sinh khả dụng.
                </p>
              </div>
            </div>
          )}

          {/* Interactive Quick Herb-Drug Tester Tool */}
          {showCustomTester && (
            <div className="p-5 rounded-3xl bg-slate-50 border border-slate-300 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-emerald-700" />
                  <h6 className="font-extrabold text-slate-900 text-sm">
                    Công Cụ Tra Cứu Tương Tác Đông - Tây Y Tự Do (Dược Thư 60 Y Điển)
                  </h6>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">
                  Kiểm tra tức thì bất kỳ vị thuốc & tân dược nào
                </span>
              </div>

              {/* Sample Quick Chips */}
              <div>
                <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
                  Các cặp phối hợp hay gặp cần lưu ý trên lâm sàng:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {samplePairs.map((p, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setCustomHerb(p.herb);
                        setCustomDrug(p.drug);
                        const res = analyzeHerbDrugInteractions([p.herb], [p.drug]);
                        if (res.matches.length > 0) setCustomResult(res.matches[0]);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200 text-xs transition-colors cursor-pointer shadow-2xs font-medium"
                    >
                      {p.herb} + {p.drug.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Vị thuốc Đông y (nhập tên tiếng Việt / Hán Việt):
                  </label>
                  <input
                    type="text"
                    value={customHerb}
                    onChange={(e) => setCustomHerb(e.target.value)}
                    placeholder="VD: Đương quy, Cam thảo, Bạch quả, Thạch cao..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-emerald-600 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Thuốc Tây y (nhập tên biệt dược / hoạt chất):
                  </label>
                  <input
                    type="text"
                    value={customDrug}
                    onChange={(e) => setCustomDrug(e.target.value)}
                    placeholder="VD: Aspirin, Furosemide, Meloxicam, Ciprofloxacin..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-cyan-600 shadow-2xs"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleRunCustomTest}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm cursor-pointer transition-all"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  <span>Quét Tương Tác Dược Lý Ngay</span>
                </button>
              </div>

              {/* Custom Result Display */}
              {customResult && (
                <div 
                  className={`p-4 rounded-2xl border space-y-2.5 animate-fadeIn ${
                    customResult.severity === 'danger'
                      ? 'bg-rose-50 border-rose-300 text-rose-950'
                      : customResult.severity === 'warning'
                      ? 'bg-amber-50 border-amber-300 text-amber-950'
                      : customResult.severity === 'synergy'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-teal-50 border-teal-300 text-teal-950'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase">
                      Kết quả quét: {customResult.herbName} ⇄ {customResult.drugName}
                    </span>
                    <span 
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                        customResult.severity === 'danger'
                          ? 'bg-rose-600 text-white'
                          : customResult.severity === 'warning'
                          ? 'bg-amber-600 text-white'
                          : customResult.severity === 'synergy'
                          ? 'bg-emerald-700 text-white'
                          : 'bg-teal-700 text-white'
                      }`}
                    >
                      {customResult.severity === 'danger'
                        ? 'CẢNH BÁO NGUY HIỂM'
                        : customResult.severity === 'warning'
                        ? 'THẬN TRỌNG'
                        : customResult.severity === 'synergy'
                        ? 'HIỆP ĐỒNG CÓ LỢI'
                        : 'AN TOÀN'}
                    </span>
                  </div>

                  <p className="text-xs font-bold">{customResult.title}</p>
                  <p className="text-xs leading-relaxed opacity-90">{customResult.mechanism}</p>
                  
                  <div className="p-2.5 rounded-xl bg-white/80 border border-slate-200 text-xs">
                    <strong>Khuyến cáo: </strong>{customResult.recommendation}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
