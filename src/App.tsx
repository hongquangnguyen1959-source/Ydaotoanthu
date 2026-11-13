import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { SymptomCheckerModule } from './components/SymptomCheckerModule';
import { DiagnosisModule } from './components/DiagnosisModule';
import { BookVaultModule } from './components/BookVaultModule';
import { AcupunctureAtlasModule } from './components/AcupunctureAtlasModule';
import { HerbalMateriaModule } from './components/HerbalMateriaModule';
import { PhysiologyNutritionModule } from './components/PhysiologyNutritionModule';
import { ClinicalChatModule } from './components/ClinicalChatModule';
import { WesternPharmacologyModule } from './components/WesternPharmacologyModule';
import { DiagnosisResult } from './types';
import { BookOpen, ShieldAlert, Pill, Compass } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('symptom');
  const [chatContext, setChatContext] = useState<DiagnosisResult | null>(null);
  const [pendingChatQuery, setPendingChatQuery] = useState<string>('');

  const handleOpenChatWithContext = (result: DiagnosisResult) => {
    setChatContext(result);
    if (result.westernAssessment?.provisionalDiagnosis) {
      setPendingChatQuery(
        `Phân tích chuyên sâu hướng điều trị Đông - Tây Y cho chẩn đoán: ${result.westernAssessment.provisionalDiagnosis} (${result.easternAssessment?.syndromePattern || ''})`
      );
    }
    setActiveTab('chat');
  };

  const handleOpenChatWithQuery = (query: string) => {
    setPendingChatQuery(query);
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F7F6F2] text-stone-900 flex flex-col font-sans selection:bg-[#0F3D2E] selection:text-white">
      {/* Main Navigation & Instant Omnibox */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        caseCount={4}
        onQuickConsult={handleOpenChatWithQuery}
      />

      {/* Main Dynamic Clinical Viewport */}
      <main className="flex-1 w-full overflow-x-hidden">
        {activeTab === 'symptom' && (
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5">
            <SymptomCheckerModule onOpenChatWithQuery={handleOpenChatWithQuery} />
          </div>
        )}
        {activeTab === 'diagnose' && (
          <DiagnosisModule
            onOpenChatWithContext={handleOpenChatWithContext}
            onSwitchToSymptomTab={() => setActiveTab('symptom')}
          />
        )}
        {activeTab === 'pharmacology' && <WesternPharmacologyModule />}
        {activeTab === 'library' && <BookVaultModule />}
        {activeTab === 'acupuncture' && <AcupunctureAtlasModule />}
        {activeTab === 'herbal' && <HerbalMateriaModule />}
        {activeTab === 'physiology' && <PhysiologyNutritionModule />}
        {activeTab === 'chat' && (
          <ClinicalChatModule
            initialQuery={pendingChatQuery}
            onClearInitialQuery={() => setPendingChatQuery('')}
            context={chatContext}
          />
        )}
      </main>

      {/* Clean Scientific Medical Footer */}
      <footer className="bg-[#FAF9F5] border-t border-stone-200 text-sm text-stone-700 py-8 px-4 sm:px-6 lg:px-8 mt-10 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto space-y-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-stone-200/70">
            <div>
              <div className="font-serif font-bold text-base sm:text-lg text-stone-900">
                Y Đạo Toàn Thư · Hệ Thống Y Học Lâm Sàng Đông – Tây Y Kết Hợp
              </div>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
                Tích hợp dữ liệu chuyên khảo từ 65 tác phẩm y điển kinh điển và 4 bộ sách PDF nguyên bản: 239 Kỳ huyệt Đổng Thị, 295 Phác đồ lâm sàng, 58 Kỳ huyệt WHO, Châm cứu GS. Nguyễn Tài Thu và Lưu Viêm, Dược điển Dan Bensky, Nam dược Tuệ Tĩnh và Đỗ Tất Lợi, Dược thư Quốc gia Việt Nam.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('acupuncture')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-stone-200 hover:border-emerald-800/30 hover:bg-emerald-50/40 text-stone-800 text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                <Compass className="w-4 h-4 text-[#0F3D2E]" />
                <span>239 Huyệt Đổng Thị</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('pharmacology')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-stone-200 hover:border-emerald-800/30 hover:bg-emerald-50/40 text-stone-800 text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                <Pill className="w-4 h-4 text-cyan-800" />
                <span>Thuốc Tây Y A-Z</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('library')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-stone-200 hover:border-emerald-800/30 hover:bg-emerald-50/40 text-stone-800 text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4 text-[#0F3D2E]" />
                <span>Kho 65 Sách Y</span>
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs sm:text-sm text-amber-950 flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Lưu ý chuyên môn: </strong>
              Hệ thống phục vụ tra cứu lâm sàng, học tập và đối chiếu y văn Đông – Tây Y. Không tự ý ngưng thuốc điều trị chuyên khoa khi chưa có chỉ định của bác sĩ.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
