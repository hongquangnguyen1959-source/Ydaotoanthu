import React, { useMemo } from 'react';
import { DiagnosisResult, PatientInfo, Vitals, Symptoms, FourExaminations } from '../types';
import { Printer, X, ShieldAlert, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { analyzeHerbDrugInteractions } from '../utils/herbDrugInteractions';

interface ClinicalReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: DiagnosisResult;
  patient: PatientInfo;
  vitals: Vitals;
  symptoms: Symptoms;
  exam: FourExaminations;
}

export const ClinicalReportModal: React.FC<ClinicalReportModalProps> = ({
  isOpen,
  onClose,
  result,
  patient,
  vitals,
}) => {
  if (!isOpen) return null;

  const herbs = useMemo(() => {
    return result?.integratedTreatmentPlan?.herbalPrescription?.composition?.map(c => c.herb) || [];
  }, [result]);

  const drugs = useMemo(() => {
    return result?.integratedTreatmentPlan?.westernPrescription?.medications?.map(m => ({
      name: m.drugName,
      activeIngredient: m.activeIngredient,
      group: m.group
    })) || [];
  }, [result]);

  const interactionReport = useMemo(() => {
    return analyzeHerbDrugInteractions(herbs, drugs);
  }, [herbs, drugs]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-white text-slate-900 w-full max-w-4xl rounded-3xl print:rounded-none border border-slate-200 print:border-none shadow-2xl overflow-hidden my-8">
        {/* Modal Top Actions (Hidden in Print) */}
        <div className="flex items-center justify-between p-4 bg-slate-50 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-emerald-800">Hồ Sơ Chẩn Trị Đông - Tây Y Kết Hợp</span>
            <span className="text-xs text-slate-500">| Chuẩn Y Điển Toàn Thư</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>In Bệnh Án / Lưu PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 space-y-6 text-xs sm:text-sm">
          {/* Document Header */}
          <div className="border-b-2 border-emerald-600 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-serif font-bold text-emerald-800">
                  ☯ Y ĐẠO TOÀN THƯ
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                  ĐÔNG - TÂY Y LIÊN HỢP
                </span>
              </div>
              <p className="text-slate-600 text-xs mt-1">
                Trung Tâm Hỗ Trợ Chẩn Trị Y Học Tích Hợp (Maciocia, Dan Bensky, Đổng Thị, Guyton & Hall)
              </p>
            </div>
            <div className="text-right text-xs text-slate-600">
              <p>Mã Bệnh Án: <strong className="text-slate-900">YD-{Date.now().toString().slice(-6)}</strong></p>
              <p>Ngày khám: {new Date().toLocaleDateString('vi-VN')}</p>
            </div>
          </div>

          {/* Patient Info & Vitals */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <span className="text-slate-500 text-[11px] block">Họ và tên:</span>
              <strong className="text-slate-900">{patient.name || 'Người bệnh'}</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[11px] block">Tuổi / Giới:</span>
              <strong className="text-slate-900">{patient.age || '—'} tuổi / {patient.gender}</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[11px] block">Huyết áp / Nhịp tim:</span>
              <strong className="text-slate-900">{vitals.bloodPressure || '—'} mmHg / {vitals.heartRate || '—'} bpm</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[11px] block">Nhiệt độ / SpO2:</span>
              <strong className="text-slate-900">{vitals.temperature || '—'} °C / {vitals.spO2 || '—'}%</strong>
            </div>
          </div>

          {/* Clinical Summary */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <h4 className="font-bold text-emerald-900 text-xs uppercase mb-1">
              Kết Luận Chẩn Đoán Tổng Thể
            </h4>
            <p className="text-slate-800 leading-relaxed font-medium">{result.summary}</p>
          </div>

          {/* Dual Diagnoses (West & East) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Western */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-cyan-900 uppercase tracking-wider block">
                1. Chẩn Đoán Tây Y (Allopathic)
              </span>
              <p className="text-sm font-bold text-slate-900 font-serif">
                {result.westernAssessment.provisionalDiagnosis}{' '}
                <span className="text-xs font-mono font-normal text-cyan-800">
                  (ICD-10: {result.westernAssessment.icd10})
                </span>
              </p>
              <div className="text-xs text-slate-700">
                <strong className="text-slate-900">Sinh lý Guyton: </strong>{result.westernAssessment.guytonMechanism}
              </div>
            </div>

            {/* Eastern */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                2. Biện Chứng Đông Y (TCM Syndromes)
              </span>
              <p className="text-sm font-bold text-slate-900 font-serif">
                {result.easternAssessment.syndromePattern}
              </p>
              <div className="text-xs text-slate-700">
                <strong className="text-slate-900">Bát Cương: </strong>{result.easternAssessment.batCuong}
              </div>
              <div className="text-xs text-slate-700">
                <strong className="text-slate-900">Thiệt & Mạch chẩn: </strong>{result.easternAssessment.thietChanAnalysis}
              </div>
            </div>
          </div>

          {/* Prescription: Western Medicine (Dược thư Quốc gia VN, BV Bạch Mai, DiPiro) */}
          {result.integratedTreatmentPlan.westernPrescription && (
            <div className="p-4 rounded-2xl bg-cyan-50/40 border border-cyan-200">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 mb-2 pb-1.5 border-b border-cyan-200">
                <h4 className="font-bold text-cyan-950 text-xs uppercase flex items-center gap-1.5">
                  <span>3. Đơn Thuốc Tây Y Chuẩn Lâm Sàng (Dược Thư QG, Bạch Mai & DiPiro)</span>
                </h4>
                <span className="text-[11px] font-bold text-cyan-900 bg-cyan-100 px-2 py-0.5 rounded border border-cyan-300">
                  {result.integratedTreatmentPlan.westernPrescription.protocolName}
                </span>
              </div>

              <div className="space-y-2 mb-2">
                {result.integratedTreatmentPlan.westernPrescription.medications.map((m, i) => (
                  <div key={i} className="p-2.5 rounded bg-white text-xs border border-slate-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <strong className="text-cyan-950">{i + 1}. {m.drugName}</strong>
                        <span className="text-[11px] text-slate-500 ml-1">({m.activeIngredient} - {m.group})</span>
                      </div>
                      <span className="font-mono font-bold text-slate-800 text-[11px]">{m.dosage}</span>
                    </div>
                    <div className="text-[11px] text-slate-600 mt-1">
                      <span className="text-emerald-800 font-medium">Uống: {m.timing}</span> | <span>Cơ chế: {m.mechanism}</span>
                    </div>
                    {m.contraindications && (
                      <div className="text-[10px] text-rose-700 mt-0.5">
                        Lưu ý: {m.contraindications}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {result.integratedTreatmentPlan.westernPrescription.clinicalCautions?.length > 0 && (
                <div className="text-[11px] text-amber-900 bg-amber-50 p-2 rounded border border-amber-200">
                  <strong>Cảnh báo lâm sàng: </strong>
                  {result.integratedTreatmentPlan.westernPrescription.clinicalCautions.join(' • ')}
                </div>
              )}
            </div>
          )}

          {/* Prescription: Herbal Formula */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-emerald-900 text-xs uppercase">
                4. Đơn Thuốc Thảo Dược Cổ Phương (Dan Bensky & Phương Thang YHCT)
              </h4>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                {result.integratedTreatmentPlan.herbalPrescription.formulaName}
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-2">
              Pháp trị: <strong className="text-slate-900">{result.integratedTreatmentPlan.phapTri}</strong>
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              {result.integratedTreatmentPlan.herbalPrescription.composition.map((c, i) => (
                <div key={i} className="p-2 rounded bg-white text-xs border border-slate-200 shadow-2xs">
                  <div className="flex justify-between">
                    <strong className="text-slate-900">{c.herb}</strong>
                    <span className="text-emerald-800 font-bold">{c.grams}g</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block">{c.role} - {c.purpose}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              <strong className="text-slate-900">Hướng dẫn sắc: </strong>{result.integratedTreatmentPlan.herbalPrescription.decoctionGuide}
            </p>
          </div>

          {/* Kiểm soát Tương Tác Thuốc Đông - Tây Y */}
          <div className={`p-4 rounded-2xl border space-y-2 ${
            interactionReport.dangerCount > 0 
              ? 'bg-rose-50 border-rose-300 text-rose-950' 
              : interactionReport.warningCount > 0 
              ? 'bg-amber-50 border-amber-300 text-amber-950' 
              : 'bg-emerald-50 border-emerald-300 text-emerald-950'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {interactionReport.dangerCount > 0 ? (
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                ) : interactionReport.warningCount > 0 ? (
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                )}
                <h4 className="font-bold text-xs uppercase">
                  Kiểm Soát Tương Tác Dược Lý Đông - Tây Y (Dược Thư Quốc Gia & Stockley)
                </h4>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-white border border-slate-300">
                {interactionReport.matches.length > 0 
                  ? `${interactionReport.matches.length} Tương tác ghi nhận` 
                  : 'An Toàn Phối Hợp'}
              </span>
            </div>

            <div className="text-xs leading-relaxed space-y-1.5">
              <p className="font-medium">
                <strong>Quy tắc thời gian uống: </strong>{interactionReport.goldenRule}
              </p>
              {interactionReport.matches.map((m, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-white text-xs border border-slate-200">
                  <div className="font-bold text-slate-900">• {m.herbName} ⇄ {m.drugName}: {m.title}</div>
                  <div className="text-slate-600 text-[11px] mt-0.5">{m.mechanism}</div>
                  <div className="text-emerald-900 font-semibold text-[11px] mt-0.5">Lời dặn: {m.recommendation}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Prescription: Acupuncture & Tung's Points */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-cyan-900 text-xs uppercase mb-2">
              5. Phác Đồ Châm Cứu & Đổng Thị Kỳ Huyệt (Tung’s & Nguyễn Tài Thu)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
              <div>
                <strong className="text-xs text-cyan-900 block mb-1">Huyệt Kinh Điển:</strong>
                <ul className="space-y-1 text-xs text-slate-700">
                  {result.integratedTreatmentPlan.acupuncturePrescription.classicPoints.map((p, i) => (
                    <li key={i}>• <strong className="text-slate-900">{p.point}: </strong>{p.purpose} ({p.technique})</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong className="text-xs text-emerald-900 block mb-1">Đổng Thị Kỳ Huyệt:</strong>
                <ul className="space-y-1 text-xs text-slate-700">
                  {result.integratedTreatmentPlan.acupuncturePrescription.tungPoints.map((p, i) => (
                    <li key={i}>• <strong className="text-slate-900">{p.point}: </strong>{p.purpose} (Động khí: {p.dongQiInstructions})</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-2">
              <strong className="text-slate-900">Kinh nghiệm Nguyễn Tài Thu: </strong>{result.integratedTreatmentPlan.acupuncturePrescription.nguyenTaiThuGuidance}
            </p>
          </div>

          {/* Nutrition & Qigong */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <strong className="text-xs text-emerald-900 block mb-1">Dinh Dưỡng Lâm Sàng (Essentials of Nutrition):</strong>
              <p className="text-xs text-slate-700">{result.integratedTreatmentPlan.clinicalNutrition.dietaryTherapy}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <strong className="text-xs text-cyan-900 block mb-1">Khí Công Y Đạo & Dưỡng Sinh:</strong>
              <p className="text-xs text-slate-700">{result.integratedTreatmentPlan.qigongAndLifestyle}</p>
            </div>
          </div>

          {/* Footer & Signature */}
          <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-xs text-slate-600">
            <div>
              <p>Trích dẫn từ 60+ y điển & Nam dược: {result.referencedBooks?.slice(0, 3).join(', ')}...</p>
              <p className="text-[10px] text-slate-500 mt-1">Lưu ý: Bệnh án điện tử hỗ trợ chẩn trị lâm sàng. Tái khám sau 5-7 ngày.</p>
            </div>
            <div className="text-center w-48">
              <p className="font-bold text-slate-900">Bác Sĩ / Thầy Thuốc Chẩn Trị</p>
              <div className="h-12 flex items-center justify-center italic text-emerald-800 font-serif font-bold">
                Đã ký duyệt điện tử
              </div>
              <p className="text-[11px] text-slate-500">(Ký và ghi rõ họ tên)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
