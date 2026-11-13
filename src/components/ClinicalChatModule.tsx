import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  User,
  Bot,
  Trash2,
  ArrowRight,
  Copy,
  Check,
  ImagePlus,
  X,
  FileImage,
  ZoomIn,
  Plus,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  generatePreciseScientificAnswer,
  cleanMedicalText,
  getSuggestedFollowUpQuestions
} from '../utils/scientificMedicalEngine';
import { DiagnosisResult } from '../types';

const MAX_UPLOAD_IMAGES = 6;

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  content: string;
  timestamp: string;
  questionAsked?: string;
  imageUrls?: string[];
}

interface PendingImage {
  id: string;
  dataUrl: string;
  mimeType: string;
  fileName: string;
}

async function compressPrescriptionImage(file: File): Promise<PendingImage> {
  const uid = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const readAsDataUrl = (f: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = () => reject(new Error('Không thể đọc tệp ảnh.'));
      reader.readAsDataURL(f);
    });

  const rawDataUrl = await readAsDataUrl(file);
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const maxDim = 1600;
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        const ratio = Math.min(maxDim / width, maxDim / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve({
          id: uid,
          dataUrl: rawDataUrl,
          mimeType: file.type || 'image/jpeg',
          fileName: file.name,
        });
        return;
      }
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      const compressed = canvas.toDataURL('image/jpeg', 0.88);
      resolve({
        id: uid,
        dataUrl: compressed,
        mimeType: 'image/jpeg',
        fileName: file.name,
      });
    };
    img.onerror = () =>
      resolve({
        id: uid,
        dataUrl: rawDataUrl,
        mimeType: file.type || 'image/jpeg',
        fileName: file.name,
      });
    img.src = rawDataUrl;
  });
}

interface ClinicalChatModuleProps {
  initialQuery?: string;
  onClearInitialQuery?: () => void;
  context?: DiagnosisResult | null;
}

function renderFormattedDoctorMessage(rawContent: string) {
  const cleaned = cleanMedicalText(rawContent);
  const lines = cleaned.split('\n');

  return (
    <div className="space-y-1.5 leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        // Main Consultation Header
        if (
          trimmed.startsWith('TRẢ LỜI TRỰC TIẾP') ||
          trimmed.startsWith('BÁC SĨ HỘI CHẨN') ||
          trimmed.startsWith('HỘI CHẨN') ||
          trimmed.startsWith('PHÂN TÍCH KHOA HỌC')
        ) {
          return (
            <div
              key={idx}
              className="font-bold text-emerald-950 bg-emerald-50/90 border border-emerald-200 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm mb-2"
            >
              {trimmed}
            </div>
          );
        }

        // Section Header (e.g., "1. ĐỊNH NGHĨA...", "A. Phác đồ...")
        if (
          /^(\d+\.|[A-Z]\.|I+\.)\s+[A-ZĐÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴ]/.test(
            trimmed
          ) &&
          trimmed.length < 135
        ) {
          return (
            <div
              key={idx}
              className="font-bold text-slate-900 pt-3 pb-1 border-b border-slate-100 text-xs sm:text-sm"
            >
              {trimmed}
            </div>
          );
        }

        // Bullet lines ("• Label: Content")
        if (trimmed.startsWith('•')) {
          const isIndented = /^\s{2,}•/.test(line);
          const bodyAfterBullet = trimmed.replace(/^•\s*/, '');
          const colonIdx = bodyAfterBullet.indexOf(':');

          if (colonIdx > 0 && colonIdx < 70) {
            const label = bodyAfterBullet.slice(0, colonIdx + 1);
            const rest = bodyAfterBullet.slice(colonIdx + 1);
            return (
              <div
                key={idx}
                className={`flex items-start gap-2 ${
                  isIndented ? 'pl-4 text-slate-700' : 'text-slate-800'
                }`}
              >
                <span className="text-emerald-700 font-bold shrink-0">•</span>
                <div>
                  <span className="font-semibold text-slate-900">{label}</span>
                  <span>{rest}</span>
                </div>
              </div>
            );
          }

          return (
            <div
              key={idx}
              className={`flex items-start gap-2 ${
                isIndented ? 'pl-4 text-slate-700' : 'text-slate-800'
              }`}
            >
              <span className="text-emerald-700 font-bold shrink-0">•</span>
              <span>{bodyAfterBullet}</span>
            </div>
          );
        }

        // Numbered item with colon ("1. Giai đoạn 1: ...", "1. Colchicine 1mg: ...")
        const numMatch = trimmed.match(/^(\d+\.)\s+(.+)$/);
        if (numMatch) {
          const restText = numMatch[2];
          const colonIdx = restText.indexOf(':');
          if (colonIdx > 0 && colonIdx < 80) {
            return (
              <div key={idx} className="text-slate-800 pt-1">
                <span className="font-semibold text-emerald-900">
                  {numMatch[1]} {restText.slice(0, colonIdx + 1)}
                </span>
                <span>{restText.slice(colonIdx + 1)}</span>
              </div>
            );
          }
        }

        return (
          <div key={idx} className="text-slate-800">
            {trimmed}
          </div>
        );
      })}
    </div>
  );
}

export const ClinicalChatModule: React.FC<ClinicalChatModuleProps> = ({
  initialQuery,
  onClearInitialQuery,
  context
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      content:
        'Xin chào, tôi là Bác sĩ Hội Chẩn Đông - Tây Y. Mời bạn nhập câu hỏi chuyên môn, triệu chứng cần tư vấn hoặc tải ảnh đơn thuốc lên để tôi đọc và phân tích chi tiết.',
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedTopicGroup, setSelectedTopicGroup] = useState<'noi_khoa' | 'xuong_khop' | 'ky_huyet' | 'duoc_ly'>('noi_khoa');
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);
  const [zoomedGallery, setZoomedGallery] = useState<{ urls: string[]; index: number } | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const topicGroups: Record<
    'noi_khoa' | 'xuong_khop' | 'ky_huyet' | 'duoc_ly',
    { label: string; questions: string[] }
  > = {
    noi_khoa: {
      label: 'Bệnh Nội Khoa & Chuyển Hóa',
      questions: [
        'Bệnh Gout là gì? Nguyên nhân, có bao nhiêu giai đoạn và cách chữa trị?',
        'Bệnh Tiểu đường Type 2 có mấy giai đoạn? Phác đồ Đông - Tây Y kiểm soát HbA1c?',
        'Phân biệt chứng Can Dương Thượng Kháng với Tăng huyết áp nguyên phát Tây Y?',
        'Bệnh lý Tuyến giáp (Cường giáp Basedow & Nhân tuyến giáp) điều trị Đông - Tây Y thế nào?'
      ]
    },
    xuong_khop: {
      label: 'Cơ Xương Khớp & Thần Kinh',
      questions: [
        'Thoát vị đĩa đệm chèn ép thần kinh tọa có mấy giai đoạn và phác đồ điều trị?',
        'Thoái hóa khớp gối 4 giai đoạn Kellgren-Lawrence và phác đồ Độc Hoạt Tang Ký Sinh?',
        'Hội chứng cổ vai gáy chèn ép rễ thần kinh C5-C7 và huyệt đặc trị?',
        'Kỹ thuật mãng châm Nguyễn Tài Thu trong điều trị di chứng tai biến mạch máu não?'
      ]
    },
    ky_huyet: {
      label: 'Kỳ Huyệt Đổng Thị & WHO',
      questions: [
        'Vị trí giải phẫu, chủ trị và cách châm huyệt Linh Cốt (22.05) & Đại Bạch (22.04)?',
        'Tổ hợp Hạ Tam Hoàng (77.17, 77.19, 77.21) định vị và chủ trị những bệnh gì?',
        'Tổ hợp Thượng Tam Hoàng (88.12, 88.13, 88.14) điều trị bệnh gan mật thế nào?',
        'Định vị và cách châm huyệt Tứ Hoa (77.08 - 77.11) và Tam Trọng (77.05 - 77.07)?'
      ]
    },
    duoc_ly: {
      label: 'Bài Thuốc & Dược Lý',
      questions: [
        'Giải thích cơ chế bài thuốc Tiêu Dao Tán và đối chiếu với trục Não - Ruột theo Guyton?',
        'Phân tích cấu trúc Quân - Thần - Tá - Sứ bài Lục Vị Địa Hoàng Hoàn và Bát Vị?',
        'Cơ chế dược lý của Colchicine và Febuxostat đối chiếu vị thuốc Thổ Phục Linh?',
        'Nguyên tắc phối hợp thuốc Tây y và thuốc sắc Đông y để tránh tương tác dược lý?'
      ]
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText(cleanMedicalText(text));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleProcessFiles = async (files: File[]) => {
    setImageError(null);
    if (files.length === 0) return;

    const validFiles: File[] = [];
    let hasInvalidType = false;
    let hasOversized = false;

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        hasInvalidType = true;
        continue;
      }
      if (file.size > 15 * 1024 * 1024) {
        hasOversized = true;
        continue;
      }
      validFiles.push(file);
    }

    const remainingSlots = Math.max(0, MAX_UPLOAD_IMAGES - pendingImages.length);
    if (remainingSlots === 0 && validFiles.length > 0) {
      setImageError(`Mỗi lượt gửi tối đa ${MAX_UPLOAD_IMAGES} hình ảnh. Vui lòng gửi trước hoặc gỡ bớt ảnh.`);
      return;
    }

    const acceptedFiles = validFiles.slice(0, remainingSlots);
    const errors: string[] = [];
    if (hasInvalidType) {
      errors.push('Có tệp không phải hình ảnh (chỉ hỗ trợ JPG, PNG, WEBP).');
    }
    if (hasOversized) {
      errors.push('Có ảnh vượt quá 15MB đã bị bỏ qua.');
    }
    if (validFiles.length > remainingSlots) {
      errors.push(`Mỗi lượt gửi tối đa ${MAX_UPLOAD_IMAGES} ảnh (đã thêm ${acceptedFiles.length} ảnh).`);
    }

    if (acceptedFiles.length > 0) {
      try {
        const processed = await Promise.all(
          acceptedFiles.map((f) => compressPrescriptionImage(f))
        );
        setPendingImages((prev) => [...prev, ...processed].slice(0, MAX_UPLOAD_IMAGES));
      } catch {
        errors.push('Không thể xử lý một số tệp ảnh vừa chọn.');
      }
    }

    if (errors.length > 0) {
      setImageError(errors.join(' '));
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      await handleProcessFiles(files);
    }
    e.target.value = '';
  };

  const handlePasteImage = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    const pastedFiles: File[] = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        const file = items[i].getAsFile();
        if (file) pastedFiles.push(file);
      }
    }
    if (pastedFiles.length > 0) {
      e.preventDefault();
      await handleProcessFiles(pastedFiles);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const imagesToSend = pendingImages;
    const hasImages = imagesToSend.length > 0;
    const rawQuestion = (textToSend ?? input).trim();
    if ((!rawQuestion && !hasImages) || loading) return;

    const question =
      rawQuestion ||
      (imagesToSend.length > 1
        ? `Hãy đọc và phân tích chi tiết toàn bộ ${imagesToSend.length} hình ảnh đơn thuốc/tài liệu đính kèm: tên từng thuốc, hoạt chất, công dụng, cách uống đúng, kiểm tra trùng thuốc và cảnh báo tương tác thuốc cần lưu ý.`
        : 'Hãy đọc và giải thích chi tiết đơn thuốc trong hình ảnh này: tên từng thuốc, hoạt chất, công dụng, cách uống đúng, tác dụng phụ và cảnh báo tương tác thuốc cần lưu ý.');

    const nowTime = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content:
        rawQuestion ||
        (imagesToSend.length > 1
          ? `Đọc và phân tích ${imagesToSend.length} hình ảnh đơn thuốc đính kèm`
          : 'Đọc và phân tích hình ảnh đơn thuốc đính kèm'),
      timestamp: nowTime,
      imageUrls: hasImages ? imagesToSend.map((img) => img.dataUrl) : undefined,
    };

    const botMsgId = `bot-${Date.now() + 1}`;
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    if (hasImages) {
      setPendingImages([]);
      setImageError(null);
    }
    setLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), hasImages ? 70000 : 45000);

    try {
      const historyToSend = [...messages.filter((m) => m.id !== 'welcome'), userMsg].map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          messages: historyToSend,
          query: question,
          context: context || undefined,
          images: hasImages
            ? imagesToSend.map((img) => ({
                base64: img.dataUrl,
                mimeType: img.mimeType,
              }))
            : undefined,
        }),
      });

      clearTimeout(timeoutId);
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        const cleanedServerReply = cleanMedicalText(data?.reply || '');
        if (cleanedServerReply.length > 30) {
          setMessages((prev) => [
            ...prev,
            {
              id: botMsgId,
              sender: 'bot',
              content: cleanedServerReply,
              timestamp: nowTime,
              questionAsked: question,
            },
          ]);
          return;
        }
      } else if (hasImages) {
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            sender: 'bot',
            content:
              data?.error ||
              'Không thể đọc hình ảnh đơn thuốc lúc này. Vui lòng chụp lại rõ nét hơn và gửi lại.',
            timestamp: nowTime,
          },
        ]);
        return;
      }
    } catch {
      clearTimeout(timeoutId);
      if (hasImages) {
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            sender: 'bot',
            content:
              'Kết nối máy chủ bị gián đoạn khi phân tích ảnh đơn thuốc. Vui lòng thử gửi lại ảnh sau giây lát.',
            timestamp: nowTime,
          },
        ]);
        return;
      }
    } finally {
      setLoading(false);
    }

    // Offline or static deployment fallback using verified Scientific Medical Engine (text queries only)
    const verifiedReply = cleanMedicalText(generatePreciseScientificAnswer(question));
    setMessages((prev) => [
      ...prev,
      {
        id: botMsgId,
        sender: 'bot',
        content: verifiedReply,
        timestamp: nowTime,
        questionAsked: question,
      },
    ]);
  };

  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSend(initialQuery.trim());
      if (onClearInitialQuery) onClearInitialQuery();
    }
  }, [initialQuery]);

  const lastBotMsg = [...messages].reverse().find((m) => m.sender === 'bot' && m.questionAsked);
  const followUpSuggestions = lastBotMsg?.questionAsked
    ? getSuggestedFollowUpQuestions(lastBotMsg.questionAsked)
    : [];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
      {/* Compact Clinical Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 mb-3 pb-2.5 border-b border-slate-200">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
            Phòng Hội Chẩn Bác Sĩ Chuyên Khoa Đông - Tây Y
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Chẩn đoán bệnh học, biện chứng Đông - Tây Y kinh điển & hiện đại, trả lời sát câu chữ từ 82+ Y Điển
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            title="Tải ảnh đơn thuốc lên để Bác sĩ AI đọc và giải thích"
          >
            <FileImage className="w-3.5 h-3.5" />
            <span>Tải ảnh đơn thuốc</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMessages([
                {
                  id: 'welcome',
                  sender: 'bot',
                  content:
                    'Xin chào, tôi là Bác sĩ Hội Chẩn Đông - Tây Y. Mời bạn nhập câu hỏi chuyên môn, triệu chứng cần tư vấn hoặc tải ảnh đơn thuốc lên để tôi đọc và phân tích chi tiết.',
                  timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
                },
              ]);
              setPendingImages([]);
              setImageError(null);
            }}
            className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors text-xs font-medium flex items-center gap-1.5 cursor-pointer"
            title="Xóa lịch sử trò chuyện"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Làm mới</span>
          </button>
        </div>
      </div>

      {/* Categorized Quick Clinical Topic Tabs */}
      <div className="mb-3 space-y-1.5">
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg w-fit max-w-full overflow-x-auto scrollbar-none">
          {(Object.keys(topicGroups) as Array<keyof typeof topicGroups>).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedTopicGroup(key)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                selectedTopicGroup === key
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {topicGroups[key].label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {topicGroups[selectedTopicGroup].questions.map((q, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(q)}
              className="text-left text-xs px-3 py-2 rounded-lg bg-white hover:bg-emerald-50/70 text-slate-700 hover:text-emerald-950 border border-slate-200 hover:border-emerald-300 transition-colors flex items-center justify-between gap-2 cursor-pointer font-medium"
            >
              <span className="truncate">{q}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Main Consultation Viewport - Dynamic content-adapted height with drag-drop & paste image upload */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingOver(true);
        }}
        onDragLeave={() => setIsDraggingOver(false)}
        onDrop={async (e) => {
          e.preventDefault();
          setIsDraggingOver(false);
          const files = Array.from(e.dataTransfer?.files || []);
          if (files.length > 0) await handleProcessFiles(files);
        }}
        className={`bg-white rounded-2xl border overflow-hidden flex flex-col shadow-xs transition-colors ${
          isDraggingOver ? 'border-emerald-600 ring-2 ring-emerald-200' : 'border-slate-200'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Messages Stream: fits content compactly, smoothly expands up to 60vh when discussing */}
        <div className="overflow-y-auto p-3 sm:p-4 space-y-3 bg-slate-50/40 min-h-[90px] max-h-[60vh]">
          {messages.map((m) => {
            const isBot = m.sender === 'bot';
            return (
              <div
                key={m.id}
                className={`flex gap-2.5 sm:gap-3 w-full animate-fadeIn ${
                  isBot ? '' : 'flex-row-reverse'
                }`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 text-xs mt-0.5 ${
                    isBot
                      ? 'bg-emerald-800 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div
                  className={`p-3.5 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isBot
                      ? 'flex-1 bg-white border border-slate-200 text-slate-800'
                      : 'bg-emerald-800 text-white rounded-tr-none max-w-[85%] ml-auto'
                  }`}
                >
                  {m.imageUrls && m.imageUrls.length > 0 && (
                    <div
                      className={`mb-2.5 grid gap-2 ${
                        m.imageUrls.length === 1
                          ? 'grid-cols-1'
                          : m.imageUrls.length === 2
                            ? 'grid-cols-2'
                            : 'grid-cols-2 sm:grid-cols-3'
                      }`}
                    >
                      {m.imageUrls.map((url, imgIdx) => (
                        <button
                          key={imgIdx}
                          type="button"
                          onClick={() =>
                            setZoomedGallery({ urls: m.imageUrls!, index: imgIdx })
                          }
                          className="group relative inline-block rounded-xl overflow-hidden border border-white/25 bg-black/10 cursor-pointer"
                          title={`Bấm để phóng to ảnh ${imgIdx + 1}`}
                        >
                          <img
                            src={url}
                            alt={`Ảnh đơn thuốc ${imgIdx + 1}`}
                            className={`${
                              m.imageUrls!.length === 1
                                ? 'max-h-48 sm:max-h-56 w-auto'
                                : 'h-28 sm:h-36 w-full object-cover'
                            } rounded-lg`}
                          />
                          {m.imageUrls!.length > 1 && (
                            <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-slate-900/75 text-white text-[10px] font-bold">
                              Ảnh {imgIdx + 1}
                            </span>
                          )}
                          <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-md bg-slate-900/75 text-white text-[10px] font-medium flex items-center gap-1 opacity-90 group-hover:opacity-100">
                            <ZoomIn className="w-3 h-3" />
                            <span>Phóng to</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {isBot ? (
                    renderFormattedDoctorMessage(m.content)
                  ) : (
                    <div className="whitespace-pre-line break-words leading-relaxed">{m.content}</div>
                  )}

                  <div
                    className={`flex items-center justify-between gap-2 mt-2.5 pt-2 border-t ${
                      isBot
                        ? 'border-slate-100 text-slate-400'
                        : 'border-emerald-700/60 text-emerald-100'
                    } text-[11px]`}
                  >
                    <span className="tabular-nums">{m.timestamp}</span>
                    {isBot && m.id !== 'welcome' && (
                      <button
                        type="button"
                        onClick={() => handleCopy(m.id, m.content)}
                        className="inline-flex items-center gap-1 text-slate-500 hover:text-emerald-800 font-medium cursor-pointer transition-colors"
                      >
                        {copiedId === m.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700">Đã sao chép</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Sao chép phác đồ</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-2.5 sm:gap-3 w-full">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-600 flex items-center gap-2.5">
                <span className="w-4 h-4 border-2 border-emerald-700 border-t-transparent rounded-full animate-spin shrink-0" />
                <span>Bác sĩ AI đang phân tích dữ liệu lâm sàng &amp; đọc đơn thuốc...</span>
              </div>
            </div>
          )}

          {/* Contextual Follow-up Questions */}
          {!loading && followUpSuggestions.length > 0 && (
            <div className="pl-9 sm:pl-11 space-y-1.5 pt-1">
              <span className="text-[11px] font-semibold text-slate-500 block">
                Câu hỏi chuyên sâu liên quan:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {followUpSuggestions.map((fq, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(fq)}
                    className="text-left text-xs px-3 py-1.5 rounded-lg bg-emerald-50/80 hover:bg-emerald-100 text-emerald-950 border border-emerald-200 transition-colors cursor-pointer font-medium flex items-center gap-1.5"
                  >
                    <span>{fq}</span>
                    <ArrowRight className="w-3 h-3 text-emerald-700 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Uploaded Prescription Images Preview Strip (Multi-image) */}
        {(pendingImages.length > 0 || imageError) && (
          <div className="px-3 sm:px-4 pt-3 pb-2 border-t border-slate-100 bg-emerald-50/40 space-y-2.5">
            {imageError && (
              <div className="text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-1.5 flex items-center justify-between gap-2">
                <span>{imageError}</span>
                <button
                  type="button"
                  onClick={() => setImageError(null)}
                  className="text-rose-500 hover:text-rose-700 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {pendingImages.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-bold text-emerald-950">
                    Đã chọn {pendingImages.length}/{MAX_UPLOAD_IMAGES} ảnh đơn thuốc
                  </span>
                  <div className="flex items-center gap-2">
                    {pendingImages.length < MAX_UPLOAD_IMAGES && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-2 py-1 rounded-md bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Thêm ảnh</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setPendingImages([])}
                      className="px-2 py-1 rounded-md text-slate-600 hover:text-rose-700 hover:bg-rose-50 font-medium text-[11px] cursor-pointer transition-colors"
                    >
                      Xóa hết
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                  {pendingImages.map((img, idx) => (
                    <div
                      key={img.id}
                      className="relative shrink-0 bg-white border border-emerald-200 rounded-xl p-1.5 shadow-2xs w-20"
                    >
                      <img
                        src={img.dataUrl}
                        alt={`Ảnh ${idx + 1}`}
                        className="w-full h-16 object-cover rounded-lg border border-slate-100"
                      />
                      <span className="block text-[10px] font-semibold text-slate-600 text-center mt-1 truncate">
                        Ảnh {idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setPendingImages((prev) => prev.filter((p) => p.id !== img.id))
                        }
                        title="Gỡ ảnh này"
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-rose-100 text-slate-600 hover:text-rose-700 flex items-center justify-center cursor-pointer transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Đọc & giải thích từng thuốc trong các ảnh này',
                    'Kiểm tra trùng hoạt chất, tương tác thuốc & giờ uống chuẩn',
                    'Các đơn này có dùng chung được với thuốc Đông Y không?',
                  ].map((promptPreset) => (
                    <button
                      key={promptPreset}
                      type="button"
                      onClick={() => setInput(promptPreset)}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-medium cursor-pointer transition-colors"
                    >
                      {promptPreset}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-slate-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              title="Tải nhiều ảnh đơn thuốc (JPG, PNG) lên để xem & phân tích"
              className="relative px-3 py-2.5 sm:py-3 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-300 hover:border-emerald-300 text-slate-700 font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
            >
              <ImagePlus className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="hidden sm:inline">
                {pendingImages.length > 0 ? `Ảnh (${pendingImages.length})` : 'Ảnh đơn thuốc'}
              </span>
              {pendingImages.length > 0 && (
                <span className="sm:hidden px-1.5 py-0.5 rounded-full bg-emerald-700 text-white text-[10px] font-bold leading-none">
                  {pendingImages.length}
                </span>
              )}
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPaste={handlePasteImage}
              placeholder={
                pendingImages.length > 0
                  ? `Nhập câu hỏi thêm cho ${pendingImages.length} ảnh (hoặc bấm Hội chẩn ngay)...`
                  : 'Nhập tên bệnh, triệu chứng, bài thuốc hoặc tải nhiều ảnh đơn thuốc...'
              }
              className="flex-1 min-w-0 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 focus:bg-white border border-slate-300 focus:border-emerald-700 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={loading || (!input.trim() && pendingImages.length === 0)}
              className="px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
              <span>Hội chẩn</span>
            </button>
          </form>
        </div>
      </div>

      {/* In-app Lightbox for Zooming & Switching Prescription Photos */}
      {zoomedGallery && zoomedGallery.urls[zoomedGallery.index] && (
        <div
          onClick={() => setZoomedGallery(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
          >
            <button
              type="button"
              onClick={() => setZoomedGallery(null)}
              className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-white text-slate-900 shadow-lg flex items-center justify-center hover:bg-slate-100 cursor-pointer z-10"
              title="Đóng ảnh"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={zoomedGallery.urls[zoomedGallery.index]}
              alt={`Ảnh đơn thuốc ${zoomedGallery.index + 1}`}
              className="max-h-[80vh] max-w-full object-contain rounded-2xl shadow-2xl bg-white"
            />

            {zoomedGallery.urls.length > 1 && (
              <div className="mt-3 flex items-center gap-3 bg-white/95 px-3 py-1.5 rounded-full shadow-lg text-xs font-bold text-slate-800">
                <button
                  type="button"
                  onClick={() =>
                    setZoomedGallery((g) =>
                      g
                        ? {
                            ...g,
                            index: (g.index - 1 + g.urls.length) % g.urls.length,
                          }
                        : null
                    )
                  }
                  className="p-1 rounded-full hover:bg-slate-200 cursor-pointer"
                  title="Ảnh trước"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span>
                  Ảnh {zoomedGallery.index + 1} / {zoomedGallery.urls.length}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setZoomedGallery((g) =>
                      g ? { ...g, index: (g.index + 1) % g.urls.length } : null
                    )
                  }
                  className="p-1 rounded-full hover:bg-slate-200 cursor-pointer"
                  title="Ảnh tiếp"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
