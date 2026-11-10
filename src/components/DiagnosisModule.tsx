import React, { useState } from 'react';
import { PatientInfo, Vitals, Symptoms, FourExaminations, DiagnosisResult } from '../types';
import { PRESET_CASES, PresetCase } from '../data/presetCases';
import { runOfflineDiagnosis } from '../utils/fallbackDiagnostician';
import { ClinicalReportModal } from './ClinicalReportModal';
import { 
  Stethoscope, 
  Sparkles, 
  Activity, 
  ShieldAlert, 
  Printer, 
  Flame, 
  Zap, 
  Leaf, 
  BookOpen, 
  Apple, 
  CheckCircle2, 
  RotateCcw,
  Camera,
  ChevronRight,
  MessageSquare,
  Pill,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { SymptomCheckerModule } from './SymptomCheckerModule';
import { HerbDrugInteractionAlert } from './HerbDrugInteractionAlert';

interface DiagnosisModuleProps {
  onOpenChatWithContext?: (result: DiagnosisResult) => void;
  onSwitchToSymptomTab?: () => void;
}

export const DiagnosisModule: React.FC<DiagnosisModuleProps> = ({ onOpenChatWithContext, onSwitchToSymptomTab }) => {
  const [activeTabMode, setActiveTabMode] = useState<'symptom' | 'intake'>('intake');
  // Patient State
  const [patient, setPatient] = useState<PatientInfo>({
    name: 'Nguyễn Văn Hùng',
    age: 48,
    gender: 'Nam',
    occupation: 'Tài xế đường dài',
    contact: '0912-345-678'
  });

  // Vitals State
  const [vitals, setVitals] = useState<Vitals>({
    bloodPressure: '135/85',
    heartRate: '78',
    temperature: '36.8',
    spO2: '98',
    bloodGlucose: '5.6'
  });

  // Symptoms State
  const [symptoms, setSymptoms] = useState<Symptoms>({
    mainComplaint: 'Đau thắt lưng lan dọc mông trái xuống cẳng chân và bàn chân, kèm tê bì ngón chân cái.',
    onset: 'Khởi phát cách đây 2 tuần sau khi bê lốp xe nặng, đau tăng dữ dội khi ho hoặc cúi người.',
    painCharacteristics: 'Đau buốt nhói như điện giật, đau cố định, tăng về đêm khi trời trở lạnh.',
    painScale: 8,
    pastMedicalHistory: 'Thoái hóa cột sống thắt lưng 3 năm, thỉnh thoảng đau thượng vị.'
  });

  // Four Examinations State
  const [exam, setExam] = useState<FourExaminations>({
    vong: 'Dáng đi lệch nghiêng người sang phải, nét mặt thống khổ, cơ thắt lưng co cứng.',
    tongue: 'Chất lưỡi tím ám, hai rìa có điểm ứ huyết tím đen. Rêu lưỡi trắng mỏng hơi nhớt.',
    van: 'Tiếng thở dài, rên khẽ khi trở mình, giọng nói bình thường.',
    van_ask: 'Chân trái lạnh buốt hơn chân phải, sợ gió lạnh. Đêm trằn trọc mất ngủ vì đau buốt.',
    thiet: 'Mạch Trầm Huyền Sáp (ấn sâu mới thấy, mạch căng rít). Điểm Valleix và Lasegue 40 độ (+).'
  });

  const [tongueImageBase64, setTongueImageBase64] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [, setActiveStep] = useState<'intake' | 'result'>('intake');

  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);

  // Load preset case & show inline right beneath the clicked card
  const handleLoadPreset = (preset: PresetCase) => {
    setPatient(preset.patientInfo);
    setVitals(preset.vitals);
    setSymptoms(preset.symptoms);
    setExam(preset.fourExaminations);
    setTongueImageBase64(null);
    if (selectedPresetId === preset.id) {
      setSelectedPresetId(null);
    } else {
      setSelectedPresetId(preset.id);
      const instantRes = runOfflineDiagnosis(
        preset.patientInfo,
        preset.vitals,
        preset.symptoms,
        preset.fourExaminations
      );
      setResult(instantRes);
      setActiveStep('result');
    }
  };

  // Reset form
  const handleReset = () => {
    setPatient({ name: '', age: '', gender: 'Nam', occupation: '', contact: '' });
    setVitals({ bloodPressure: '', heartRate: '', temperature: '', spO2: '', bloodGlucose: '' });
    setSymptoms({ mainComplaint: '', onset: '', painCharacteristics: '', painScale: 5, pastMedicalHistory: '' });
    setExam({ vong: '', tongue: '', van: '', van_ask: '', thiet: '' });
    setTongueImageBase64(null);
    setResult(null);
    setSelectedPresetId(null);
  };

  // Run diagnosis
  const handleDiagnose = async () => {
    if (!symptoms.mainComplaint.trim()) {
      return;
    }

    setSelectedPresetId(null);
    const instantRes = runOfflineDiagnosis(patient, vitals, symptoms, exam);
    setResult(instantRes);
    setActiveStep('result');
    setIsLoading(false);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          patientInfo: patient,
          symptoms,
          vitals,
          fourExaminations: exam,
          tongueDescription: exam.tongue,
          tongueImageBase64
        }),
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.diagnosis) {
          setResult(data.diagnosis);
        }
      }
    } catch {
      clearTimeout(timeoutId);
    }
  };

  // Handle tongue image upload
  const handleTongueUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTongueImageBase64(reader.result as string);
        setExam(prev => ({
          ...prev,
          tongue: prev.tongue ? `${prev.tongue} (Đã đính kèm ảnh lưỡi chụp thực tế)` : 'Đã đính kèm ảnh chụp lưỡi trực tiếp'
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Sub-mode Tab Switcher: Nêu Triệu Chứng vs Hồ Sơ Bệnh Án Chuyên Sâu */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 p-2 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl">
          <button
            onClick={() => setActiveTabMode('symptom')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTabMode === 'symptom'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Nêu Triệu Chứng (Bác Sĩ AI Trả Lời Ngay)</span>
          </button>
          <button
            onClick={() => setActiveTabMode('intake')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTabMode === 'intake'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>Phiếu Bệnh Án Chuyên Sâu (Tứ Chẩn)</span>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 pr-2">
          <span className="font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            ✓ Trí tuệ 65 Y Điển Đông - Nam - Tây Y
          </span>
        </div>
      </div>

      {activeTabMode === 'symptom' ? (
        <SymptomCheckerModule />
      ) : (
        <>
          {/* Preset Cases Fast Selector with Immediate Inline Expansion */}
          <div className="mb-6 p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Ca Bệnh Mẫu Điển Hình (Bấm vào ô để xem ngay bệnh án & phác đồ tại chỗ)
                </span>
              </div>
              <button
                onClick={handleReset}
                className="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Xóa trắng form</span>
              </button>
            </div>

            <div className="space-y-3">
              {PRESET_CASES.map((preset) => {
                const isSelected = selectedPresetId === preset.id;
                return (
                  <div key={preset.id} className="space-y-2">
                    <button
                      type="button"
                      onClick={() => handleLoadPreset(preset)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all text-xs group cursor-pointer shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300'
                          : 'bg-slate-50 hover:bg-emerald-50/80 border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      <div>
                        <span className="text-[10px] font-bold text-emerald-700 block mb-0.5">
                          {preset.badge}
                        </span>
                        <p className="font-bold text-slate-900 text-sm font-serif">
                          {preset.title.split(':')[1] || preset.title}
                        </p>
                        <p className="text-xs text-slate-600 mt-1">
                          {preset.patientInfo.name} ({preset.patientInfo.age} tuổi) — {preset.symptoms.mainComplaint}
                        </p>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 shrink-0 self-start sm:self-center">
                        {isSelected ? '▲ Thu gọn' : '▼ Xem bệnh án ngay tại đây'}
                      </span>
                    </button>

                    {isSelected && result && (
                      <div className="p-5 sm:p-6 rounded-3xl bg-white border-2 border-emerald-500 shadow-lg space-y-4 animate-fadeIn">
                        <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                          <div>
                            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                              Chẩn Đoán & Phác Đồ Tức Thì Cho Ca Bệnh: {preset.patientInfo.name}
                            </span>
                            <h4 className="text-base sm:text-lg font-bold text-slate-900 font-serif mt-1">
                              {result.summary}
                            </h4>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedPresetId(null)}
                            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer shrink-0"
                          >
                            ✕ Đóng
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div className="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200 space-y-1.5">
                            <span className="font-bold text-cyan-900 uppercase block">1. Chẩn Đoán Tây Y ({result.westernAssessment.icd10})</span>
                            <p className="font-bold text-slate-900 text-sm font-serif">{result.westernAssessment.provisionalDiagnosis}</p>
                            <p className="text-slate-700 leading-relaxed">{result.westernAssessment.guytonMechanism}</p>
                          </div>
                          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                            <span className="font-bold text-emerald-900 uppercase block">2. Biện Chứng Đông Y ({result.easternAssessment.batCuong})</span>
                            <p className="font-bold text-slate-900 text-sm font-serif">{result.easternAssessment.syndromePattern}</p>
                            <p className="text-slate-700 leading-relaxed">{result.easternAssessment.thietChanAnalysis}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                            <span className="font-bold text-emerald-900 uppercase block">
                              3. Bài Thuốc Đông Y: {result.integratedTreatmentPlan.herbalPrescription.formulaName}
                            </span>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {result.integratedTreatmentPlan.herbalPrescription.composition.map((c, i) => (
                                <span key={i} className="px-2 py-1 rounded-lg bg-white border border-slate-200 font-medium text-slate-800">
                                  <b>{c.herb}</b> ({c.grams}g - {c.role})
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                            <span className="font-bold text-cyan-900 uppercase block">
                              4. Phác Đồ Đổng Thị Kỳ Huyệt & Thể Châm
                            </span>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {result.integratedTreatmentPlan.acupuncturePrescription.tungPoints.map((tp, i) => (
                                <span key={i} className="px-2 py-1 rounded-lg bg-cyan-50 border border-cyan-200 font-bold text-cyan-900">
                                  {tp.point} ({tp.code})
                                </span>
                              ))}
                              {result.integratedTreatmentPlan.acupuncturePrescription.classicPoints.map((cp, i) => (
                                <span key={i} className="px-2 py-1 rounded-lg bg-white border border-slate-200 font-medium text-slate-800">
                                  {cp.point}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

      {/* Main Intake Form */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100/70 border border-emerald-300/60 flex items-center justify-center text-emerald-700">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif">
                Phiếu Khám Bệnh Song Y Đạo (Integrative Clinical Intake)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Thu thập triệu chứng Tây Y kết hợp Tứ Chẩn Đông Y (Vọng, Văn, Vấn, Thiết)
              </p>
            </div>
          </div>

          {result && (
            <div className="hidden sm:flex gap-2">
              <button
                onClick={() => setIsReportOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-300 transition-all cursor-pointer shadow-xs"
              >
                <Printer className="w-3.5 h-3.5 text-emerald-700" />
                <span>Xem Bệnh Án</span>
              </button>
            </div>
          )}
        </div>

        {/* 3 Main Form Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Column 1: Patient info & Western Symptoms (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Patient Demographics */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                1. Hành Chính & Sinh Hiệu
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-600 font-medium block mb-1">Họ tên người bệnh</label>
                  <input
                    type="text"
                    value={patient.name}
                    onChange={(e) => setPatient({ ...patient, name: e.target.value })}
                    placeholder="VD: Nguyễn Văn Hùng"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-500 shadow-2xs"
                  />
                </div>
                <div>
                  <label className="text-slate-600 font-medium block mb-1">Tuổi & Giới tính</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={patient.age}
                      onChange={(e) => setPatient({ ...patient, age: e.target.value })}
                      placeholder="Tuổi"
                      className="w-16 px-2.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-500 text-center shadow-2xs"
                    />
                    <select
                      value={patient.gender}
                      onChange={(e) => setPatient({ ...patient, gender: e.target.value as any })}
                      className="flex-1 px-2.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-500 shadow-2xs"
                    >
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Vitals */}
              <div className="pt-2 border-t border-slate-200">
                <span className="text-[11px] font-bold text-slate-700 block mb-2">Sinh hiệu đo được:</span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-500 block">Huyết áp (mmHg)</label>
                    <input
                      type="text"
                      value={vitals.bloodPressure}
                      onChange={(e) => setVitals({ ...vitals, bloodPressure: e.target.value })}
                      placeholder="130/85"
                      className="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-center font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block">Mạch (bpm)</label>
                    <input
                      type="text"
                      value={vitals.heartRate}
                      onChange={(e) => setVitals({ ...vitals, heartRate: e.target.value })}
                      placeholder="76"
                      className="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-center font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block">Nhiệt độ (°C)</label>
                    <input
                      type="text"
                      value={vitals.temperature}
                      onChange={(e) => setVitals({ ...vitals, temperature: e.target.value })}
                      placeholder="36.8"
                      className="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-center font-mono font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Western Symptoms & Pain VAS */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold text-cyan-800 uppercase tracking-wider">
                2. Triệu Chứng Tây Y & Bệnh Sử
              </h3>

              <div className="text-xs">
                <label className="text-slate-700 font-semibold block mb-1">
                  Lý do khám / Triệu chứng chính <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  value={symptoms.mainComplaint}
                  onChange={(e) => setSymptoms({ ...symptoms, mainComplaint: e.target.value })}
                  placeholder="VD: Đau thắt lưng lan xuống chân trái, tê bì ngón chân..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-cyan-600 shadow-2xs"
                />
              </div>

              <div className="text-xs">
                <label className="text-slate-700 font-semibold block mb-1">Khởi phát & Diễn tiến</label>
                <input
                  type="text"
                  value={symptoms.onset}
                  onChange={(e) => setSymptoms({ ...symptoms, onset: e.target.value })}
                  placeholder="VD: Cách đây 2 tuần sau khi mang vác nặng..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-cyan-600 shadow-2xs"
                />
              </div>

              <div className="text-xs">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-slate-700 font-semibold">Mức độ đau theo thang điểm VAS (1 - 10):</label>
                  <span className="font-extrabold text-amber-700 font-mono text-sm">{symptoms.painScale}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={symptoms.painScale}
                  onChange={(e) => setSymptoms({ ...symptoms, painScale: Number(e.target.value) })}
                  className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>1-3: Nhẹ</span>
                  <span>4-6: Vừa</span>
                  <span>7-8: Nặng</span>
                  <span>9-10: Dữ dội</span>
                </div>
              </div>

              <div className="text-xs">
                <label className="text-slate-700 font-semibold block mb-1">Tiền sử bệnh lý & Thuốc đang dùng</label>
                <input
                  type="text"
                  value={symptoms.pastMedicalHistory}
                  onChange={(e) => setSymptoms({ ...symptoms, pastMedicalHistory: e.target.value })}
                  placeholder="VD: Đau dạ dày, thoái hóa khớp, từng uống giảm đau NSAID..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-cyan-600 shadow-2xs"
                />
              </div>
            </div>
          </div>

          {/* Column 2: Eastern Medicine - Tứ Chẩn Toàn Diện (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-2">
                  <span>3. Tứ Chẩn Đông Y (Vọng - Văn - Vấn - Thiết)</span>
                </h3>
                <span className="text-[11px] text-slate-500 italic font-serif">Theo giáo trình Giovanni Maciocia & GS. Nguyễn Tài Thu</span>
              </div>

              {/* Vọng Chẩn & Thiệt Chẩn */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    👁 Vọng Chẩn (Thần sắc, hình thể, cử chỉ)
                  </label>
                  <textarea
                    rows={2}
                    value={exam.vong}
                    onChange={(e) => setExam({ ...exam, vong: e.target.value })}
                    placeholder="Mặt đỏ/nhợt, dáng đi tập tễnh, co cứng cơ lưng..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-amber-600 shadow-2xs"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-slate-700 font-semibold">👅 Thiệt Chẩn (Xem Lưỡi & Rêu Lưỡi)</label>
                    <label className="text-[11px] text-emerald-700 font-semibold cursor-pointer flex items-center gap-1 hover:underline">
                      <Camera className="w-3.5 h-3.5" />
                      <span>Đính ảnh lưỡi</span>
                      <input type="file" accept="image/*" onChange={handleTongueUpload} className="hidden" />
                    </label>
                  </div>
                  <textarea
                    rows={2}
                    value={exam.tongue}
                    onChange={(e) => setExam({ ...exam, tongue: e.target.value })}
                    placeholder="Lưỡi bệu/thon, sắc đỏ/nhạt/tím ám; rêu trắng mỏng/vàng dày..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-amber-600 shadow-2xs"
                  />
                  {tongueImageBase64 && (
                    <div className="mt-2 flex items-center gap-2 p-2 bg-emerald-100/80 border border-emerald-300 rounded-lg text-[11px] text-emerald-900 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Đã tải ảnh lưỡi thành công để AI đối chiếu thiệt chẩn</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Văn Chẩn & Vấn Chẩn */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    👂 Văn Chẩn (Âm thanh, tiếng thở, hơi thở)
                  </label>
                  <textarea
                    rows={2}
                    value={exam.van}
                    onChange={(e) => setExam({ ...exam, van: e.target.value })}
                    placeholder="Tiếng rên rỉ khi trở mình, thở yếu, giọng khàn..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-amber-600 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    ❓ Vấn Chẩn (Thập Vấn Ca: Hàn nhiệt, mồ hôi, tiểu tiện, giấc ngủ)
                  </label>
                  <textarea
                    rows={2}
                    value={exam.van_ask}
                    onChange={(e) => setExam({ ...exam, van_ask: e.target.value })}
                    placeholder="Sợ lạnh, chân buốt, đại tiện lỏng, tiểu đêm, mất ngủ..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-amber-600 shadow-2xs"
                  />
                </div>
              </div>

              {/* Thiết Chẩn (Mạch chẩn & Xúc chẩn) */}
              <div className="text-xs">
                <label className="text-slate-700 font-semibold block mb-1">
                  🩺 Thiết Chẩn (Mạch tượng 28 loại mạch & Ấn huyệt/Bụng)
                </label>
                <input
                  type="text"
                  value={exam.thiet}
                  onChange={(e) => setExam({ ...exam, thiet: e.target.value })}
                  placeholder="Mạch Trầm Huyền Sáp / Mạch Phù / Mạch Sác / Điểm Valleix (+)..."
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-amber-600 font-mono shadow-2xs"
                />
              </div>

              {/* Quick Tongue / Pulse Helper chips */}
              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] text-slate-500 block mb-1.5 font-bold">Gợi ý mạch tượng nhanh:</span>
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {['Mạch Huyền (Can uất/đau)', 'Mạch Trầm (Bệnh ở Lý)', 'Mạch Sáp (Huyết ứ)', 'Mạch Tế Nhược (Khí huyết hư)', 'Mạch Sác (Nhiệt chứng)', 'Mạch Hoạt (Đờm thấp)'].map((p, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setExam(prev => ({ ...prev, thiet: prev.thiet ? `${prev.thiet}, ${p}` : p }))}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-300 transition-colors cursor-pointer shadow-2xs"
                    >
                      + {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Diagnose Button */}
            <div className="pt-2">
              <button
                onClick={handleDiagnose}
                disabled={isLoading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 hover:from-emerald-700 hover:to-cyan-800 disabled:opacity-50 text-white font-extrabold text-base shadow-lg shadow-emerald-700/25 flex items-center justify-center gap-3 transition-all active:scale-[0.99] cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Đang nạp tri thức 60 Y Điển & hội chẩn đa chiều...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-200 animate-pulse" />
                    <span>Khám & Biện Chứng Đông - Tây Y Tối Ưu</span>
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Diagnosis Results Section */}
      {result && (
        <div id="diagnosis-results" className="space-y-8 animate-fadeIn">
          {/* Top Banner Alert / Summary */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border border-emerald-200 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-300">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                    Kết Quả Chẩn Đoán & Biện Chứng Lâm Sàng Hoàn Chỉnh
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif mt-0.5">
                    {result.summary}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <button
                  onClick={() => setIsReportOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Xuất Bệnh Án / In PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* Dual Diagnoses: Western vs Eastern Comparison (2 columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 1. Western Allopathic Assessment */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-cyan-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-700" />
                  <h3 className="text-base font-extrabold text-slate-900 font-serif">1. Chẩn Đoán Y Học Hiện Đại (Tây Y)</h3>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-900 border border-cyan-300">
                  ICD-10: {result.westernAssessment.icd10}
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-500 block mb-0.5">Bệnh danh xác định:</span>
                <p className="text-lg font-bold text-cyan-900 font-serif">
                  {result.westernAssessment.provisionalDiagnosis}
                </p>
              </div>

              {/* Guyton Physiology */}
              <div className="p-4 rounded-2xl bg-cyan-50/60 border border-cyan-100 text-xs">
                <strong className="text-cyan-900 block mb-1">
                  Cơ chế sinh lý học tế bào & nội môi (Guyton & Hall):
                </strong>
                <p className="text-slate-700 leading-relaxed">
                  {result.westernAssessment.guytonMechanism}
                </p>
              </div>

              {/* Investigations Needed */}
              {result.westernAssessment.investigationsNeeded?.length > 0 && (
                <div className="text-xs">
                  <span className="text-slate-700 font-bold block mb-1.5">Cận lâm sàng đề xuất:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {result.westernAssessment.investigationsNeeded.map((inv, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
                        {inv}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Red flags */}
              {result.westernAssessment.redFlags?.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900">
                  <div className="flex items-center gap-1.5 font-bold text-rose-700 mb-1">
                    <ShieldAlert className="w-4 h-4 text-rose-600" />
                    <span>Dấu Hiệu Cảnh Báo Nguy Hiểm (Red Flags)</span>
                  </div>
                  <ul className="space-y-0.5">
                    {result.westernAssessment.redFlags.map((flag, i) => (
                      <li key={i}>• {flag}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* 2. Eastern Traditional Assessment */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-emerald-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-emerald-700" />
                  <h3 className="text-base font-extrabold text-slate-900 font-serif">2. Biện Chứng Y Học Cổ Truyền (Đông Y)</h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                  Maciocia / YHCT
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-500 block mb-0.5">Hội chứng thể bệnh (Syndrome):</span>
                <p className="text-lg font-bold text-emerald-900 font-serif">
                  {result.easternAssessment.syndromePattern}
                </p>
              </div>

              {/* Bát Cương & Tạng Phủ */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Bát Cương Biện Chứng</span>
                  <p className="text-slate-800 font-bold mt-1">{result.easternAssessment.batCuong}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Tạng Phủ & Khí Huyết</span>
                  <p className="text-slate-800 font-bold mt-1">{result.easternAssessment.tangPhu}</p>
                </div>
              </div>

              {/* Thiệt & Mạch chẩn */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-xs">
                <strong className="text-emerald-900 block mb-1">
                  Biện giải Mạch tượng & Thiệt chẩn (Giovanni Maciocia):
                </strong>
                <p className="text-slate-700 leading-relaxed">
                  {result.easternAssessment.thietChanAnalysis}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                <strong className="text-emerald-800">Khí huyết tân dịch: </strong>
                {result.easternAssessment.khiHuyet}
              </div>
            </div>
          </div>

          {/* Integrated Master Treatment Protocols */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                Phác Đồ Trị Liệu Tối Ưu Tích Hợp
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 font-serif mt-2">
                Phác Đồ Đơn Thuốc Tây Y & Phương Thang Đông Y Tích Hợp
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Pháp trị: <strong className="text-emerald-800 font-bold">{result.integratedTreatmentPlan.phapTri}</strong>
              </p>
            </div>

            {/* CẢNH BÁO TƯƠNG TÁC THUỐC ĐÔNG - TÂY Y (HERB-DRUG INTERACTION ALERT) */}
            <HerbDrugInteractionAlert 
              herbs={result.integratedTreatmentPlan.herbalPrescription.composition.map(c => c.herb)}
              drugs={result.integratedTreatmentPlan.westernPrescription?.medications.map(m => ({ 
                name: m.drugName, 
                activeIngredient: m.activeIngredient, 
                group: m.group 
              })) || []}
              formulaName={result.integratedTreatmentPlan.herbalPrescription.formulaName}
              protocolName={result.integratedTreatmentPlan.westernPrescription?.protocolName}
            />

            {/* Section 1: Western Medicine Prescription (Dược thư Quốc gia VN, BV Bạch Mai, DiPiro, MIMS) */}
            {result.integratedTreatmentPlan.westernPrescription && (
              <div className="space-y-4 p-5 rounded-3xl bg-cyan-50/40 border border-cyan-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-cyan-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold">
                      <Pill className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900 font-serif">
                        1. Đơn Thuốc Tây Y Chuẩn Lâm Sàng (Pharmacotherapy Protocol)
                      </h4>
                      <p className="text-[11px] text-cyan-900 font-medium">
                        Phác đồ: <strong className="font-bold">{result.integratedTreatmentPlan.westernPrescription.protocolName}</strong>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {result.integratedTreatmentPlan.westernPrescription.sourceGuidelines.map((src, i) => (
                      <span key={i} className="text-[10px] font-bold text-cyan-900 bg-cyan-100 px-2.5 py-0.5 rounded-full border border-cyan-300">
                        ✓ {src}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Medications Table / Cards */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                        <th className="py-2.5 px-3 font-bold">Thuốc & Biệt Dược</th>
                        <th className="py-2.5 px-3 font-bold">Hoạt Chất & Nhóm Dược Lý</th>
                        <th className="py-2.5 px-3 font-bold">Liều Dùng & Đường Uống</th>
                        <th className="py-2.5 px-3 font-bold">Thời Điểm Dùng</th>
                        <th className="py-2.5 px-3 font-bold">Cơ Chế Phân Tử (DiPiro/Katzung)</th>
                        <th className="py-2.5 px-3 font-bold">Chống Chỉ Định & Lưu Ý</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {result.integratedTreatmentPlan.westernPrescription.medications.map((med, i) => (
                        <tr key={i} className="hover:bg-cyan-50/30 transition-colors">
                          <td className="py-2.5 px-3 font-bold text-cyan-950">
                            <span className="font-mono text-emerald-800 mr-1.5">{i + 1}.</span>
                            {med.drugName}
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="font-medium text-slate-900">{med.activeIngredient}</div>
                            <span className="text-[10px] text-slate-500">{med.group}</span>
                          </td>
                          <td className="py-2.5 px-3 font-mono font-bold text-slate-800">
                            {med.dosage}
                          </td>
                          <td className="py-2.5 px-3 font-medium text-emerald-800">
                            {med.timing}
                          </td>
                          <td className="py-2.5 px-3 text-slate-600 max-w-xs text-[11px] leading-relaxed">
                            {med.mechanism}
                          </td>
                          <td className="py-2.5 px-3 text-rose-700 max-w-xs text-[11px] leading-relaxed">
                            {med.contraindications}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Clinical cautions and monitoring parameters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  {result.integratedTreatmentPlan.westernPrescription.clinicalCautions?.length > 0 && (
                    <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-amber-800">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Cảnh Báo Lâm Sàng & Tương Tác Thuốc (Dược Thư QG / MIMS):</span>
                      </div>
                      <ul className="space-y-0.5 text-[11px] text-amber-950">
                        {result.integratedTreatmentPlan.westernPrescription.clinicalCautions.map((c, i) => (
                          <li key={i}>• {c}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.integratedTreatmentPlan.westernPrescription.monitoringParameters?.length > 0 && (
                    <div className="p-3.5 rounded-2xl bg-cyan-100/50 border border-cyan-200 text-xs text-cyan-950 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-cyan-900">
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-700" />
                        <span>Chỉ Số Sinh Hóa Cần Theo Dõi (Monitoring):</span>
                      </div>
                      <ul className="space-y-0.5 text-[11px] text-slate-700">
                        {result.integratedTreatmentPlan.westernPrescription.monitoringParameters.map((m, i) => (
                          <li key={i}>• {m}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Section 2: Herbal Formula (Dan Bensky & Phương Thang YHCT) */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-emerald-700" />
                  <h4 className="text-base font-extrabold text-slate-900 font-serif">
                    2. Bài Thuốc Cổ Phương Tuyển Chọn (Dan Bensky & Phương Thang YHCT)
                  </h4>
                </div>
                <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-3 py-1 rounded-xl border border-emerald-300">
                  {result.integratedTreatmentPlan.herbalPrescription.formulaName}
                </span>
              </div>

              {/* Composition Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                      <th className="py-2.5 px-3 font-bold">Vị Thuốc Thảo Dược</th>
                      <th className="py-2.5 px-3 font-bold">Liều Lượng (Gram chuẩn)</th>
                      <th className="py-2.5 px-3 font-bold">Vai Trò Phối Ngũ</th>
                      <th className="py-2.5 px-3 font-bold">Công Năng / Tác Dụng</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {result.integratedTreatmentPlan.herbalPrescription.composition.map((c, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-bold text-slate-900">{c.herb}</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-emerald-800">{c.grams}g</td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              c.role === 'Quân'
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : c.role === 'Thần'
                                ? 'bg-cyan-100 text-cyan-900 border border-cyan-300'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {c.role}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-600">{c.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <p className="text-slate-800">
                  <strong className="text-emerald-800">Cách sắc & Dùng thuốc: </strong>
                  {result.integratedTreatmentPlan.herbalPrescription.decoctionGuide}
                </p>
                {result.integratedTreatmentPlan.herbalPrescription.modifications?.length > 0 && (
                  <div>
                    <strong className="text-amber-800 block mb-1">Gia giảm bài thuốc theo biến chứng:</strong>
                    <ul className="space-y-0.5 text-slate-600">
                      {result.integratedTreatmentPlan.herbalPrescription.modifications.map((mod, i) => (
                        <li key={i}>• {mod}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Section 3: Acupuncture, Tung Points & Nguyen Tai Thu */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-700" />
                <h4 className="text-base font-extrabold text-slate-900 font-serif">
                  3. Phác Đồ Châm Cứu & Đổng Thị Kỳ Huyệt (Cắt Cơn Đau Tức Thì)
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Classic Points */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
                  <h5 className="font-bold text-cyan-900 uppercase tracking-wider">
                    Huyệt Thể Châm Kinh Điển (Peter Deadman & WHO)
                  </h5>
                  <div className="space-y-2">
                    {result.integratedTreatmentPlan.acupuncturePrescription.classicPoints.map((p, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                        <div className="flex justify-between font-bold text-slate-900 mb-0.5">
                          <span>{p.point}</span>
                          <span className="text-[10px] text-cyan-800 font-medium">{p.technique}</span>
                        </div>
                        <p className="text-[11px] text-slate-500">{p.location}</p>
                        <p className="text-[11px] text-emerald-800 font-medium mt-1">Tác dụng: {p.purpose}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tung's Points */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
                  <h5 className="font-bold text-emerald-900 uppercase tracking-wider flex items-center justify-between">
                    <span>Hệ Thống Đổng Thị Kỳ Huyệt (Tung’s Points)</span>
                    <span className="text-[10px] text-emerald-800 lowercase font-mono">Động khí châm pháp</span>
                  </h5>
                  <div className="space-y-2">
                    {result.integratedTreatmentPlan.acupuncturePrescription.tungPoints.map((p, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                        <div className="flex justify-between font-bold text-slate-900 mb-0.5">
                          <span>{p.point}</span>
                          <span className="text-[10px] font-mono font-bold text-cyan-800">{p.code}</span>
                        </div>
                        <p className="text-[11px] text-emerald-800 font-medium">Tác dụng: {p.purpose}</p>
                        <div className="mt-1 p-1.5 rounded bg-emerald-50/70 border border-emerald-200 text-[10px] text-slate-700">
                          <strong className="text-emerald-900">Động khí: </strong>{p.dongQiInstructions}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* GS Nguyen Tai Thu Technique & Western Neuroscience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                  <strong className="text-amber-900 block mb-1">
                    Kỹ thuật Mãng Châm & Thấu Huyệt (GS. Nguyễn Tài Thu):
                  </strong>
                  <p className="text-slate-700 leading-relaxed">
                    {result.integratedTreatmentPlan.acupuncturePrescription.nguyenTaiThuGuidance}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                  <strong className="text-purple-900 block mb-1">
                    Cơ chế Thần kinh - Thể dịch (Western Medical Acupuncture):
                  </strong>
                  <p className="text-slate-700 leading-relaxed">
                    {result.integratedTreatmentPlan.acupuncturePrescription.westernNeuroscience}
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4: Nutrition & Qigong */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Apple className="w-5 h-5 text-emerald-700" />
                <h4 className="text-base font-extrabold text-slate-900 font-serif">
                  4. Dinh Dưỡng Lâm Sàng & Khí Công Dưỡng Sinh
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <strong className="text-emerald-900 block">
                    Liệu pháp dinh dưỡng (Essentials of Nutrition):
                  </strong>
                  <p className="text-slate-800">{result.integratedTreatmentPlan.clinicalNutrition.dietaryTherapy}</p>
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-emerald-800 block mb-1">Nên ăn:</span>
                    <p className="text-slate-600">{result.integratedTreatmentPlan.clinicalNutrition.foodsToEat.join(', ')}</p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-rose-800 block mb-1">Hạn chế:</span>
                    <p className="text-slate-600">{result.integratedTreatmentPlan.clinicalNutrition.foodsToAvoid.join(', ')}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <strong className="text-cyan-900 block">
                    Bài tập Khí Công Y Đạo & Tự Bấm Huyệt Tại Nhà:
                  </strong>
                  <p className="text-slate-800 leading-relaxed">
                    {result.integratedTreatmentPlan.qigongAndLifestyle}
                  </p>
                </div>
              </div>
            </div>

            {/* Referenced Books Footnote */}
            {result.referencedBooks?.length > 0 && (
              <div className="pt-4 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Trích dẫn y điển nền tảng cho phác đồ này:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {result.referencedBooks.map((book, i) => (
                    <span key={i} className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-emerald-700" />
                      {book}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Printable Clinical Report Modal */}
      {result && (
        <ClinicalReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          result={result}
          patient={patient}
          vitals={vitals}
          symptoms={symptoms}
          exam={exam}
        />
      )}
        </>
      )}
    </div>
  );
};
