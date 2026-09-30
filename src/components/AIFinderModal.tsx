import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Send,
  Loader2,
  CheckCircle,
  Briefcase,
  Clock,
  ArrowRight,
  BellRing,
  Lightbulb
} from 'lucide-react';
import { Job, NotificationItem, Language } from '../types/job';
import { TRANSLATIONS } from '../utils/i18n';

interface AIFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobs: Job[];
  onSelectJob: (job: Job) => void;
  onAddNotification: (notification: NotificationItem) => void;
  lang?: Language;
}

interface SuggestedRole {
  role: string;
  fitScore: number;
  scheduleMatch: string;
  reason: string;
  recommendedIndustries?: string[];
}

interface AIResult {
  summary: string;
  suggestedRoles: SuggestedRole[];
  advice: string;
  searchKeywords: string[];
}

export const AIFinderModal: React.FC<AIFinderModalProps> = ({
  isOpen,
  onClose,
  jobs,
  onSelectJob,
  onAddNotification,
  lang = 'vi',
}) => {
  const t = TRANSLATIONS[lang];

  const defaultPrompt = {
    vi: 'Tôi là sinh viên năm 2 ngành tiếng Hàn, chưa có kinh nghiệm, muốn tìm việc part-time vào buổi tối.',
    en: 'I am a 2nd-year Korean language student with no prior experience, looking for an evening part-time job.',
    ko: '저는 한국어 전공 2학년 학생이며, 강의/실무 경력은 없지만 저녁 파트타임 일자리를 구하고 싶습니다.',
  }[lang];

  const [prompt, setPrompt] = useState(defaultPrompt);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIResult | null>(null);
  const [notificationSent, setNotificationSent] = useState(false);

  // Sync default prompt when language changes
  React.useEffect(() => {
    setPrompt(defaultPrompt);
  }, [lang]);

  if (!isOpen) return null;

  const quickPrompts = {
    vi: [
      'Tôi là sinh viên năm 2 ngành tiếng Hàn, chưa có kinh nghiệm, muốn tìm việc part-time vào buổi tối.',
      'Tôi học chuyên ngành Marketing, có thể quay dựng TikTok cơ bản, muốn tìm việc linh hoạt.',
      'Tôi là sinh viên CNTT năm cuối, nắm vững React và TypeScript, tìm việc Junior/Intern gần Quận 1 hoặc Thủ Đức.',
      'Tôi thích giao tiếp, thích pha chế cà phê, muốn tìm việc Barista/phục vụ ca gãy tại Quận 3.',
    ],
    en: [
      'I am a 2nd-year Korean language student with no prior experience, looking for an evening part-time job.',
      'I study Marketing and can shoot and edit basic TikTok videos, seeking a flexible role.',
      'Final-year CS student proficient in React and TypeScript, seeking Junior/Intern roles near District 1.',
      'I enjoy interpersonal communication and coffee craft, looking for a part-time Barista job in District 3.',
    ],
    ko: [
      '저는 한국어 전공 2학년 학생이며, 경력은 없지만 저녁 파트타임 일자리를 구하고 싶습니다.',
      '마케팅 전공자이며 틱톡 영상 편집이 가능합니다. 유연한 단기/파트타임 직무를 찾고 있습니다.',
      '컴퓨터공학 전공자로 React와 TypeScript에 능숙하며, 1군 근처 주니어/인턴 개발자를 찾습니다.',
      '커뮤니케이션과 카페 음료 제조를 좋아하여 3군 부근 파트타임 바리스타/서빙을 희망합니다.',
    ],
  }[lang];

  const handleAnalyze = async (textToAnalyze?: string) => {
    const input = textToAnalyze || prompt;
    if (!input.trim()) return;

    setLoading(true);
    setNotificationSent(false);

    try {
      const response = await fetch('/api/ai/match-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input, lang }),
      });

      const json = await response.json();
      if (json.success && json.data) {
        setResult(json.data);

        const rolesList = json.data.suggestedRoles
          ?.map((r: SuggestedRole) => r.role)
          .slice(0, 3)
          .join(', ');

        const notifTitle = lang === 'ko'
          ? 'AI 맞춤 직무 분석 및 추천 완료'
          : lang === 'en'
          ? 'AI recommended top career matches for you'
          : 'AI đã đề xuất các công việc phù hợp nhất với bạn';

        const notifMsg = lang === 'ko'
          ? `입력하신 조건을 바탕으로 ${rolesList} 등의 추천 직무와 주변 채용공고를 매칭했습니다.`
          : lang === 'en'
          ? `Based on your request, AI suggested: ${rolesList} along with curated job openings.`
          : `Dựa trên yêu cầu của bạn, AI đề xuất các vai trò: ${rolesList}... Cùng mẹo ứng tuyển và việc làm sẵn có gần bạn!`;

        const newNotification: NotificationItem = {
          id: `notif-ai-${Date.now()}`,
          title: notifTitle,
          message: notifMsg,
          type: 'ai_match',
          timestamp: lang === 'ko' ? '방금 전' : lang === 'en' ? 'Just now' : 'Vừa xong',
          read: false,
        };

        onAddNotification(newNotification);
        setNotificationSent(true);
      }
    } catch (err) {
      console.error('Error analyzing prompt:', err);
    } finally {
      setLoading(false);
    }
  };

  const findMatchingJobForRole = (roleName: string) => {
    const rLower = roleName.toLowerCase();
    return jobs.find((j) => {
      const tLower = j.title.toLowerCase();
      if ((rLower.includes('trợ giảng') || rLower.includes('teaching') || rLower.includes('강사') || rLower.includes('조교')) &&
          (tLower.includes('trợ giảng') || tLower.includes('teaching') || tLower.includes('강사') || tLower.includes('조교'))) return true;
      if ((rLower.includes('cskh') || rLower.includes('support') || rLower.includes('고객')) &&
          (tLower.includes('cskh') || tLower.includes('chăm sóc') || tLower.includes('support') || tLower.includes('cs'))) return true;
      if ((rLower.includes('dịch') || rLower.includes('translat') || rLower.includes('번역')) &&
          (tLower.includes('dịch') || tLower.includes('translat') || tLower.includes('번역'))) return true;
      if ((rLower.includes('phục vụ') || rLower.includes('server') || rLower.includes('서빙')) &&
          (tLower.includes('phục vụ') || tLower.includes('서빙'))) return true;
      if ((rLower.includes('bán hàng') || rLower.includes('retail') || rLower.includes('판매')) &&
          (tLower.includes('bán hàng') || tLower.includes('판매'))) return true;
      if ((rLower.includes('react') || rLower.includes('developer') || rLower.includes('개발')) &&
          (tLower.includes('react') || tLower.includes('developer') || tLower.includes('개발'))) return true;
      return false;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF8F2] w-full max-w-3xl rounded-2xl shadow-2xl border border-[#DED3BD] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#1B2C24] text-white flex items-center justify-between border-b border-[#2D4738]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight text-[#FAF8F2]">
                {lang === 'ko' ? 'AI 스마트 구직 매칭' : lang === 'en' ? 'AI Smart Career Matcher' : 'Tìm việc thông minh bằng AI'}
              </h3>
              <p className="text-xs text-[#9EBFB5]">
                {lang === 'ko' ? '학업 상태, 희망 교대, 어학 능력을 입력하면 AI가 최적의 공고를 분석합니다' : lang === 'en' ? 'Describe your schedule and background, AI analyzes matches instantly' : 'Nhập tình trạng học vấn, mong muốn ca làm, AI sẽ phân tích ngay'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#9EBFB5] hover:text-white hover:bg-[#2D4738] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Prompt input card */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-[#1B2C24] flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t.aiSearchLabel}</span>
            </label>
            <div className="relative">
              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t.aiSearchPlaceholder}
                className="w-full p-3.5 text-xs bg-white text-[#1B2C24] rounded-xl border border-[#DED3BD] focus:outline-none focus:ring-2 focus:ring-[#385A45] focus:border-transparent placeholder-[#9EBFB5] shadow-inner leading-relaxed"
              />
            </div>

            {/* Quick prompt suggestions */}
            <div>
              <span className="text-[11px] font-medium text-[#4A7D5C] block mb-1.5">
                {lang === 'ko' ? '인기 추천 예시 문장:' : lang === 'en' ? 'Popular sample prompts:' : 'Câu gợi ý mẫu phổ biến:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((qp, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setPrompt(qp);
                      handleAnalyze(qp);
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-[#EDE6D6] hover:bg-[#DED3BD] text-[#2D4738] transition-colors text-left truncate max-w-full"
                  >
                    "{qp.slice(0, 48)}..."
                  </button>
                ))}
              </div>
            </div>

            {/* Submit button */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-[#6F9C7F]">
                {lang === 'ko' ? 'Gemini 3.8 Flash AI 분석 엔진 구동' : lang === 'en' ? 'Powered by Gemini AI Engine' : 'Hỗ trợ phân tích chuyên sâu bởi Gemini AI'}
              </span>
              <button
                onClick={() => handleAnalyze()}
                disabled={loading || !prompt.trim()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2D4738] hover:bg-[#385A45] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-300" />
                    <span>{lang === 'ko' ? 'AI 심층 분석 중...' : lang === 'en' ? 'Analyzing with AI...' : 'Đang phân tích dữ liệu...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-300" />
                    <span>{lang === 'ko' ? 'AI 분석 & 일자리 매칭' : lang === 'en' ? 'Analyze & Find Jobs' : 'Phân tích & Tìm việc ngay'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Notification Alert Banner when analyzed */}
          {notificationSent && (
            <div className="p-3.5 rounded-xl bg-[#E3ECE6] border border-[#9EBFB5] flex items-center justify-between animate-in fade-in duration-300">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <BellRing className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1B2C24]">
                    {lang === 'ko' ? '맞춤 채용공고 알림이 생성되었습니다!' : lang === 'en' ? 'Personalized job match alert generated!' : 'Đã gửi thông báo chi tiết đến ứng viên!'}
                  </p>
                  <p className="text-[11px] text-[#2D4738]">
                    {lang === 'ko' ? '매칭된 추천 직무가 알림 목록에 저장되었습니다.' : lang === 'en' ? 'Matched roles have been saved to your notifications.' : 'Hệ thống đã lưu các vị trí phù hợp vào danh mục thông báo.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Results Display */}
          {result && (
            <div className="space-y-4 pt-2 border-t border-[#DED3BD]">
              {/* Summary */}
              <div className="p-4 rounded-xl bg-white border border-[#EDE6D6] shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#385A45] mb-1">
                  {lang === 'ko' ? 'AI 종합 분석 소견:' : lang === 'en' ? 'AI Profile Evaluation:' : 'Đánh giá tổng quan từ AI:'}
                </h4>
                <p className="text-xs text-[#1B2C24] leading-relaxed">{result.summary}</p>
                <div className="mt-2.5 pt-2.5 border-t border-[#F5F1E8] flex items-center gap-1.5 text-xs text-[#2D4738] bg-[#F5F1E8] p-2 rounded-lg">
                  <Lightbulb className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="text-[11px]">
                    <strong>{lang === 'ko' ? '합격 전략 팁:' : lang === 'en' ? 'Actionable Advice:' : 'Lời khuyên:'}</strong> {result.advice}
                  </span>
                </div>
              </div>

              {/* Suggested Roles list */}
              <div>
                <h4 className="text-xs font-bold text-[#1B2C24] mb-2 flex items-center justify-between">
                  <span>
                    {lang === 'ko' ? `AI 추천 직무 (${result.suggestedRoles.length}개):` : lang === 'en' ? `AI Recommended Roles (${result.suggestedRoles.length}):` : `Các công việc được đề xuất (${result.suggestedRoles.length} vị trí):`}
                  </span>
                  <span className="text-[11px] font-normal text-[#4A7D5C]">
                    {lang === 'ko' ? '적합도 순' : lang === 'en' ? 'Sorted by fit' : 'Xếp theo độ phù hợp'}
                  </span>
                </h4>

                <div className="space-y-2.5">
                  {result.suggestedRoles.map((item, idx) => {
                    const matchedJob = findMatchingJobForRole(item.role);
                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-white border border-[#EDE6D6] hover:border-[#6F9C7F] transition-all shadow-sm group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-[#EDE6D6] text-[#2D4738] font-bold text-[10px] flex items-center justify-center shrink-0">
                                {idx + 1}
                              </span>
                              <h5 className="text-xs font-bold text-[#1B2C24] truncate group-hover:text-[#385A45] transition-colors">
                                {item.role}
                              </h5>
                              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-mono tabular-nums">
                                {lang === 'ko' ? `적합도 ${item.fitScore}%` : lang === 'en' ? `Fit ${item.fitScore}%` : `Phù hợp ${item.fitScore}%`}
                              </span>
                            </div>

                            <p className="text-[11px] text-[#4A7D5C] mt-1 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#6F9C7F] shrink-0" />
                              <span>{item.scheduleMatch}</span>
                            </p>

                            <p className="text-[11px] text-neutral-600 mt-1.5 leading-relaxed bg-[#FBF9F4] p-2 rounded-lg">
                              {item.reason}
                            </p>
                          </div>

                          {matchedJob && (
                            <button
                              onClick={() => {
                                onSelectJob(matchedJob);
                                onClose();
                              }}
                              className="shrink-0 flex items-center gap-1 px-3 py-2 rounded-lg bg-[#2D4738] hover:bg-[#385A45] text-white text-xs font-semibold shadow-sm transition-all"
                            >
                              <span>{t.viewDetails}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#F5F1E8] border-t border-[#DED3BD] flex items-center justify-between text-xs text-[#4A7D5C]">
          <span>
            {lang === 'ko' ? '베트남 및 한국 주요 도시의 실제 채용 데이터 기반' : lang === 'en' ? 'Grounded in live job databases across Vietnam & Korea' : 'Gợi ý dựa trên cơ sở dữ liệu việc làm thực tế tại TP.HCM & Hà Nội'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white border border-[#DED3BD] text-[#1B2C24] hover:bg-[#EDE6D6] font-medium transition-colors"
          >
            {t.closeLightbox}
          </button>
        </div>
      </div>
    </div>
  );
};
