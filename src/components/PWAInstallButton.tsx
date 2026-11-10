import React, { useState } from 'react';
import { Download, Smartphone, X, CheckCircle2, Share2, MoreVertical } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState(false);

  if (isInstalled) {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      const accepted = await install();
      if (!accepted) {
        setShowGuideModal(true);
      }
    } else {
      setShowGuideModal(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-extrabold shadow-sm transition-colors cursor-pointer shrink-0"
      >
        <Download className="w-4 h-4 stroke-[2.5]" />
        <span>Tải App Về Máy</span>
      </button>

      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white text-slate-900 p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                    Cài Đặt App Y Đạo Toàn Thư Về Máy
                  </h3>
                  <p className="text-xs text-slate-600">
                    Mở nhanh từ màn hình chính như ứng dụng độc lập
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isIOS ? (
              <div className="space-y-3 text-sm text-slate-700">
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                  <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                    <Share2 className="w-4 h-4 text-emerald-700" />
                    <span>Hướng dẫn cho iPhone / iPad (Safari):</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm text-slate-800">
                    <li>
                      Mở trang <strong>ydaotoanthu.vercel.app</strong> bằng trình duyệt <strong>Safari</strong>.
                    </li>
                    <li>
                      Bấm nút <strong>Chia sẻ (Share)</strong> ở thanh công cụ dưới cùng.
                    </li>
                    <li>
                      Cuộn xuống chọn <strong>"Thêm vào MH chính" (Add to Home Screen)</strong> rồi bấm <strong>Thêm</strong>.
                    </li>
                  </ol>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-sm text-slate-700">
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                  <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                    <MoreVertical className="w-4 h-4 text-emerald-700" />
                    <span>Cách 1 — Cài App lên Điện Thoại Android / Máy Tính:</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm text-slate-800">
                    <li>
                      Mở trang <strong>ydaotoanthu.vercel.app</strong> trên trình duyệt <strong>Chrome</strong>.
                    </li>
                    <li>
                      Bấm biểu tượng <strong>3 chấm (⋮)</strong> ở góc trên bên phải trình duyệt.
                    </li>
                    <li>
                      Chọn <strong>"Cài đặt ứng dụng" (Install app)</strong> hoặc <strong>"Thêm vào màn hình chính"</strong>.
                    </li>
                  </ol>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Cách 2 — Tải Mã Nguồn (ZIP) Về Máy Tính:</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dung lượng dự án đã được rút gọn xuống chỉ còn ~5 MB. Bạn có thể bấm nút <strong>Download App</strong> trên thanh công cụ hoặc tải trực tiếp từ kho <strong>GitHub</strong> của bạn (chọn <strong>Code → Download ZIP</strong>).
                  </p>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowGuideModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold transition-colors cursor-pointer"
            >
              Đã hiểu
            </button>
          </div>
        </div>
      )}
    </>
  );
};
