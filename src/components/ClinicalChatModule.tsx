import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  User,
  Bot,
  Trash2,
  ArrowRight,
  Copy,
  Check
} from 'lucide-react';
import {
  generatePreciseScientificAnswer,
  cleanMedicalText,
  getSuggestedFollowUpQuestions
} from '../utils/scientificMedicalEngine';
import { DiagnosisResult } from '../types';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  content: string;
  timestamp: string;
  questionAsked?: string;
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
        'Xin chào, tôi là Bác sĩ Hội Chẩn Đông - Tây Y. Mời bạn nhập câu hỏi chuyên môn hoặc triệu chứng cần tư vấn.',
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedTopicGroup, setSelectedTopicGroup] = useState<'noi_khoa' | 'xuong_khop' | 'ky_huyet' | 'duoc_ly'>('noi_khoa');
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const handleSend = async (textToSend?: string) => {
    const question = (textToSend || input).trim();
    if (!question || loading) return;

    const nowTime = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: question,
      timestamp: nowTime,
    };

    const botMsgId = `bot-${Date.now() + 1}`;
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 14000);

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
        }),
      });

      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        const cleanedServerReply = cleanMedicalText(data?.reply || '');
        if (cleanedServerReply.length > 60) {
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
      }
    } catch {
      clearTimeout(timeoutId);
    } finally {
      setLoading(false);
    }

    // Offline or static deployment (e.g. Vercel static SPA) fallback using verified 65-Book Scientific Medical Engine
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
      <div className="flex items-center justify-between gap-4 mb-3 pb-2.5 border-b border-slate-200">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
            Phòng Hội Chẩn Bác Sĩ Chuyên Khoa Đông - Tây Y
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Chẩn đoán bệnh học, phân tích nguyên nhân, các giai đoạn lâm sàng và phác đồ điều trị từ 65 Y Điển
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setMessages([
              {
                id: 'welcome',
                sender: 'bot',
                content:
                  'Xin chào, tôi là Bác sĩ Hội Chẩn Đông - Tây Y. Mời bạn nhập câu hỏi chuyên môn hoặc triệu chứng cần tư vấn.',
                timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
              },
            ])
          }
          className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors text-xs font-medium flex items-center gap-1.5 cursor-pointer shrink-0"
          title="Xóa lịch sử trò chuyện"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Làm mới</span>
        </button>
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

      {/* Main Consultation Viewport - Dynamic content-adapted height without excessive vertical blank space */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col shadow-xs">
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

          {/* Contextual Follow-up Questions */}
          {followUpSuggestions.length > 0 && (
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

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-slate-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tên bệnh (VD: Gout, Tiểu đường, Tuyến giáp), triệu chứng, bài thuốc hoặc mã huyệt..."
              className="flex-1 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 focus:bg-white border border-slate-300 focus:border-emerald-700 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
              <span>Hội chẩn</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
