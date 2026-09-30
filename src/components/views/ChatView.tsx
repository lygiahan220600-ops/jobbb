import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Paperclip,
  CheckCheck,
  Building,
  UserCheck,
  Phone,
  Mail,
  FileText,
  Briefcase,
  Sparkles
} from 'lucide-react';
import { Conversation, ChatMessage, Job, UserProfile, Language } from '../../types/job';
import { TRANSLATIONS } from '../../utils/i18n';

interface ChatViewProps {
  conversations: Conversation[];
  onSendMessage: (conversationId: string, text: string, attachment?: { name: string; size: string }) => void;
  jobs: Job[];
  onSelectJob: (job: Job) => void;
  user: UserProfile;
  lang?: Language;
}

export const ChatView: React.FC<ChatViewProps> = ({
  conversations,
  onSendMessage,
  jobs,
  onSelectJob,
  user,
  lang = 'vi',
}) => {
  const t = TRANSLATIONS[lang];
  const [selectedConvId, setSelectedConvId] = useState<string>(
    conversations[0]?.id || ''
  );
  const [inputText, setInputText] = useState('');

  const currentConv = conversations.find((c) => c.id === selectedConvId) || conversations[0];
  const relatedJob = currentConv ? jobs.find((j) => j.id === currentConv.jobId) : null;
  const displayJobTitle = (relatedJob?.titles && relatedJob.titles[lang]) || currentConv?.jobTitle;

  const quickTemplates = {
    vi: [
      'Dạ em chào anh/chị, em rất quan tâm đến vị trí này và sẵn sàng nhận việc ạ!',
      'Dạ em có thể tham gia phỏng vấn trực tiếp vào chiều Thứ Năm lúc 14:30 ạ.',
      'Em xin gửi đính kèm bản CV chi tiết để anh/chị xem xét thêm ạ.',
      'Em có thể linh hoạt sắp xếp ca tối 18:00 - 22:00 theo yêu cầu của công ty.',
    ],
    en: [
      'Hello, I am very enthusiastic about this opening and ready to start!',
      'I am available for an in-person or online interview this Thursday at 2:30 PM.',
      'Please find my attached updated resume for your review.',
      'I can flexibly accommodate the evening shift from 6:00 PM to 10:00 PM.',
    ],
    ko: [
      '안녕하세요! 본 채용공고에 많은 관심이 있어 지원 문의드립니다.',
      '이번 주 목요일 오후 2시 30분에 온/오프라인 면접 참여 가능합니다.',
      '최신 경력 및 자격증이 포함된 국/영문 이력서를 첨부하여 전송합니다.',
      '회사 일정에 맞춰 야간 교대(18:00 - 22:00) 유연하게 근무 가능합니다.',
    ],
  }[lang];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || !currentConv) return;
    onSendMessage(currentConv.id, text);
    setInputText('');
  };

  const handleSendCV = () => {
    if (!currentConv) return;
    const msg = lang === 'ko'
      ? '최신 이력서(ATS CV)를 첨부하여 전송합니다.'
      : lang === 'en'
      ? 'Please find my latest ATS resume attached for your consideration.'
      : 'Dạ em gửi đính kèm bản CV cá nhân cập nhật mới nhất của em ạ.';

    onSendMessage(
      currentConv.id,
      msg,
      {
        name: `CV_${user.fullName.replace(/\s+/g, '')}_2026.pdf`,
        size: '1.4 MB',
      }
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EDE6D6] shadow-sm overflow-hidden flex flex-col md:flex-row h-[calc(100vh-140px)] min-h-[500px]">
      {/* Left Pane: Conversations List (1/3 width) */}
      <div className="w-full md:w-80 lg:w-96 border-r border-[#EDE6D6] flex flex-col shrink-0 bg-[#FBF9F4]">
        {/* Top Header */}
        <div className="p-4 border-b border-[#EDE6D6] bg-white">
          <h2 className="text-sm font-bold text-[#1B2C24] flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#385A45]" />
            <span>{t.chatTitle} ({conversations.length})</span>
          </h2>
          <p className="text-[11px] text-[#4A7D5C] mt-0.5">{t.chatSubtitle}</p>
        </div>

        {/* List of chat threads */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#EDE6D6]">
          {conversations.map((conv) => {
            const isSelected = conv.id === selectedConvId;
            const convJob = jobs.find((j) => j.id === conv.jobId);
            const title = (convJob?.titles && convJob.titles[lang]) || conv.jobTitle;

            return (
              <div
                key={conv.id}
                onClick={() => setSelectedConvId(conv.id)}
                className={`p-4 cursor-pointer transition-colors flex items-start gap-3 ${
                  isSelected ? 'bg-[#E3ECE6]' : 'hover:bg-white'
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={conv.recruiter.avatar}
                    alt={conv.recruiter.name}
                    className="w-11 h-11 rounded-full object-cover border border-[#4F755D]"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {conv.recruiter.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#1B2C24] truncate">{conv.recruiter.name}</h4>
                    <span className="text-[10px] text-neutral-400 font-mono">{conv.lastMessageTime}</span>
                  </div>
                  <p className="text-[11px] text-[#4A7D5C] font-semibold truncate">{conv.companyName}</p>
                  <p className="text-xs text-neutral-600 truncate mt-1">{conv.lastMessage}</p>
                  <span className="inline-block mt-1 text-[10px] bg-[#FAF8F2] border border-[#DED3BD] text-[#2D4738] px-1.5 py-0.5 rounded truncate max-w-full">
                    {title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Pane: Active Conversation */}
      {currentConv ? (
        <div className="flex-1 flex flex-col h-full bg-[#FDFCF9]">
          {/* Active Conversation Top Bar */}
          <div className="p-4 border-b border-[#EDE6D6] bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={currentConv.recruiter.avatar}
                alt={currentConv.recruiter.name}
                className="w-10 h-10 rounded-full object-cover border border-[#385A45]"
              />
              <div>
                <h3 className="text-sm font-bold text-[#1B2C24]">{currentConv.recruiter.name}</h3>
                <p className="text-xs text-[#4A7D5C]">
                  {currentConv.recruiter.position} · {currentConv.companyName}
                </p>
              </div>
            </div>

            {relatedJob && (
              <button
                onClick={() => onSelectJob(relatedJob)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DED3BD] hover:bg-[#F5F1E8] text-xs font-semibold text-[#1B2C24]"
              >
                <Briefcase className="w-3.5 h-3.5 text-[#385A45]" />
                <span>{t.viewDetails}</span>
              </button>
            )}
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentConv.messages.map((msg) => {
              const isUser = msg.senderType === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[10px] text-neutral-400 mb-1 px-1">
                    {msg.senderName} · {msg.timestamp}
                  </span>
                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                      isUser
                        ? 'bg-[#2D4738] text-white rounded-br-xs'
                        : 'bg-white border border-[#EDE6D6] text-neutral-800 rounded-bl-xs shadow-xs'
                    }`}
                  >
                    {msg.text}

                    {msg.cvAttachment && (
                      <div className="mt-2.5 p-2.5 rounded-xl bg-black/10 border border-white/20 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-emerald-300" />
                          <div>
                            <p className="font-bold text-[11px]">{msg.cvAttachment.name}</p>
                            <p className="text-[9px] opacity-80">{msg.cvAttachment.size}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Reply Prompts Chips */}
          <div className="px-4 py-2 bg-[#FBF9F4] border-t border-[#EDE6D6] flex items-center gap-1.5 overflow-x-auto text-[11px]">
            <span className="text-neutral-500 shrink-0 font-medium">{lang === 'ko' ? '빠른 답변:' : lang === 'en' ? 'Quick replies:' : 'Gợi ý nhanh:'}</span>
            {quickTemplates.map((tpl, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(tpl)}
                className="shrink-0 px-2.5 py-1 rounded-full bg-white hover:bg-[#EDE6D6] border border-[#DED3BD] text-[#1B2C24] transition-colors"
              >
                {tpl}
              </button>
            ))}
          </div>

          {/* Message Input Bottom Bar */}
          <div className="p-3 bg-white border-t border-[#EDE6D6] flex items-center gap-2">
            <button
              type="button"
              onClick={handleSendCV}
              className="p-2 rounded-xl border border-[#DED3BD] hover:bg-[#F5F1E8] text-[#385A45] flex items-center gap-1.5 text-xs font-semibold shrink-0"
              title={t.attachCVBtn}
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">{t.attachCVBtn}</span>
            </button>

            <input
              type="text"
              placeholder={t.chatPlaceholder}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1 p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#385A45]"
            />

            <button
              type="button"
              onClick={() => handleSend()}
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-[#2D4738] hover:bg-[#385A45] disabled:opacity-40 text-white transition-colors shrink-0"
              title={t.sendBtn}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8 text-neutral-400 text-xs">
          {t.selectChatHint}
        </div>
      )}
    </div>
  );
};
