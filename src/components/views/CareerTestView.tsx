import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Briefcase,
  TrendingUp,
  Compass,
  Lightbulb,
  Loader2,
  DollarSign
} from 'lucide-react';
import { getAssessmentQuestions } from '../../data/assessmentQuestions';
import { AssessmentResult, Currency, Job, Language } from '../../types/job';
import { TRANSLATIONS } from '../../utils/i18n';

interface CareerTestViewProps {
  jobs: Job[];
  onSelectJob: (job: Job) => void;
  onStartChat: (job: Job) => void;
  lang?: Language;
  currency?: Currency;
}

export const CareerTestView: React.FC<CareerTestViewProps> = ({
  jobs,
  onSelectJob,
  onStartChat,
  lang = 'vi',
  currency = 'VND',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const t = TRANSLATIONS[lang];
  const questions = getAssessmentQuestions(lang);
  const currentQ = questions[currentIndex] || questions[0];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  const L = {
    vi: {
      headerTitle: 'Trắc Nghiệm Định Hướng Nghề Nghiệp (10 Câu Hỏi)',
      headerDesc: 'Dựa trên mô hình tâm lý hướng nghiệp kết hợp AI phân tích kỹ năng, sở thích và đề xuất Top việc làm phù hợp nhất',
      retakeBtn: 'Làm lại bài Test',
      loadingTitle: 'Hệ thống AI đang phân tích hồ sơ tính cách của bạn...',
      loadingDesc: 'Tổng hợp dữ liệu từ 10 câu trả lời, đối chiếu năng lực và đo lường tỷ lệ tương thích với thị trường tuyển dụng.',
      questionStep: `Câu hỏi ${currentIndex + 1} / ${questions.length}`,
      completed: 'Hoàn thành',
      traitPrefix: 'Thiên hướng:',
      prevBtn: 'Câu trước',
      nextBtn: 'Câu tiếp theo',
      viewResultBtn: 'Xem Kết Quả',
      skillsTitle: 'Kỹ năng nổi trội',
      interestsTitle: 'Sở thích cốt lõi',
      industriesTitle: 'Ngành nghề phù hợp',
      topJobsTitle: 'Top Công việc phù hợp với bạn',
      topJobsDesc: 'Xếp hạng theo độ phù hợp từ cao xuống thấp và liên kết trực tiếp với cơ hội việc làm thực tế',
      fitScore: 'Phù hợp',
      whyFitLabel: 'Vì sao phù hợp:',
      strengthsLabel: 'Điểm mạnh:',
      viewAndApply: 'Xem việc & Ứng tuyển',
      updatingJobs: 'Đang cập nhật việc mới',
      expertAdvice: 'Lời khuyên phát triển từ chuyên gia:',
    },
    en: {
      headerTitle: 'Career Orientation Assessment (10 Questions)',
      headerDesc: 'Psychology-grounded career assessment powered by AI to analyze skills, passions, and pinpoint your optimal job matches',
      retakeBtn: 'Retake Test',
      loadingTitle: 'AI system is analyzing your personality & skill matrix...',
      loadingDesc: 'Synthesizing responses from all 10 questions, benchmarking competencies, and mapping market relevance.',
      questionStep: `Question ${currentIndex + 1} of ${questions.length}`,
      completed: 'Complete',
      traitPrefix: 'Career Trait:',
      prevBtn: 'Previous Question',
      nextBtn: 'Next Question',
      viewResultBtn: 'View Assessment Results',
      skillsTitle: 'Distinctive Skills',
      interestsTitle: 'Core Passions',
      industriesTitle: 'Target Sectors',
      topJobsTitle: 'Top Recommended Career Roles',
      topJobsDesc: 'Ranked from highest compatibility to lowest, directly connected to active job openings',
      fitScore: 'Match',
      whyFitLabel: 'Why you fit:',
      strengthsLabel: 'Key Strengths:',
      viewAndApply: 'View & Apply',
      updatingJobs: 'New openings coming soon',
      expertAdvice: 'Strategic Advice from Career Experts:',
    },
    ko: {
      headerTitle: '진로 적성 및 직무 추천 종합 검사 (10문항)',
      headerDesc: '심리학 기반 진로 검사와 AI 분석을 결합하여 강점과 적성을 진단하고 최적의 일자리를 매칭합니다',
      retakeBtn: '검사 다시하기',
      loadingTitle: 'AI 모델이 응답 데이터를 종합 분석 중입니다...',
      loadingDesc: '10개 문항 응답을 취합하여 직무 적합도, 잠재 역량 및 채용 시장 매칭률을 정밀 산출합니다.',
      questionStep: `문항 ${currentIndex + 1} / ${questions.length}`,
      completed: '진행률',
      traitPrefix: '성향 키워드:',
      prevBtn: '이전 문항',
      nextBtn: '다음 문항',
      viewResultBtn: '결과 확인하기',
      skillsTitle: '주요 보유 역량',
      interestsTitle: '핵심 관심 분야',
      industriesTitle: '추천 업종 및 직군',
      topJobsTitle: '나에게 가장 적합한 추천 직무',
      topJobsDesc: '적합도 순으로 정렬되었으며 플랫폼 내 실제 구인 공고와 바로 연결됩니다',
      fitScore: '일치율',
      whyFitLabel: '적합 사유:',
      strengthsLabel: '핵심 강점:',
      viewAndApply: '공고 확인 및 지원',
      updatingJobs: '신규 공고 준비 중',
      expertAdvice: '커리어 전문가의 전략적 조언:',
    },
  }[lang];

  const handleSelectOption = (value: string) => {
    setAnswers({
      ...answers,
      [currentQ.id]: value,
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleCompleteTest();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleCompleteTest = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai/career-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, lang }),
      });
      const json = await response.json();
      if (json.success && json.data) {
        setResult(json.data);
      }
    } catch (err) {
      console.error('Error analyzing test:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);
  };

  // Find job in catalog that matches top job titles
  const findJobInCatalog = (title: string) => {
    const tLower = title.toLowerCase();
    return jobs.find((j) => {
      const jTitleVi = j.title.toLowerCase();
      const jTitleEn = (j.titles?.en || '').toLowerCase();
      const jTitleKo = (j.titles?.ko || '').toLowerCase();
      const match = (str: string) =>
        tLower.includes(str) || jTitleVi.includes(str) || jTitleEn.includes(str) || jTitleKo.includes(str);

      if (match('trợ giảng') || match('teaching assistant') || match('강사') || match('조교')) return true;
      if (match('cskh') || match('customer support') || match('상담') || match('고객')) return true;
      if (match('dịch thuật') || match('translator') || match('번역')) return true;
      if (match('content') || match('nội dung') || match('콘텐츠')) return true;
      if (match('phục vụ') || match('barista') || match('서빙') || match('f&b')) return true;
      if (match('lập trình') || match('developer') || match('개발')) return true;
      return false;
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-[#EDE6D6] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#1B2C24] flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-700" />
            <span>{L.headerTitle}</span>
          </h2>
          <p className="text-xs text-[#4A7D5C] mt-0.5">
            {L.headerDesc}
          </p>
        </div>

        {result && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#DED3BD] hover:bg-[#F5F1E8] text-[#1B2C24] text-xs font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{L.retakeBtn}</span>
          </button>
        )}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="bg-white p-12 rounded-2xl border border-[#EDE6D6] text-center space-y-3">
          <Loader2 className="w-10 h-10 animate-spin text-emerald-700 mx-auto" />
          <h3 className="text-sm font-bold text-[#1B2C24]">{L.loadingTitle}</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            {L.loadingDesc}
          </p>
        </div>
      )}

      {/* In-Progress Test Questionnaire */}
      {!loading && !result && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EDE6D6] shadow-sm space-y-6">
          {/* Progress Indicator */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#2D4738]">
                {L.questionStep}
              </span>
              <span className="font-semibold text-emerald-700 font-mono tabular-nums">
                {progressPercent}% {L.completed}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#EDE6D6] overflow-hidden">
              <div
                className="h-full bg-[#2D4738] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Scenario & Question */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A7D5C]">
              {currentQ.scenario}
            </span>
            <h3 className="text-base font-bold text-[#1B2C24] leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Options List */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, oIdx) => {
              const isSelected = answers[currentQ.id] === opt.value;
              return (
                <div
                  key={oIdx}
                  onClick={() => handleSelectOption(opt.value)}
                  className={`p-4 rounded-xl border text-xs cursor-pointer transition-all duration-150 flex items-start gap-3 ${
                    isSelected
                      ? 'bg-[#E3ECE6] border-[#385A45] shadow-sm'
                      : 'bg-[#FBF9F4] border-[#EDE6D6] hover:bg-white hover:border-[#9EBFB5]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? 'border-[#2D4738] bg-[#2D4738] text-white'
                        : 'border-neutral-300 bg-white'
                    }`}
                  >
                    {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-[#1B2C24] leading-relaxed block">
                      {opt.label}
                    </span>
                    <span className="text-[11px] text-[#4A7D5C] mt-1 block">
                      {L.traitPrefix} {opt.trait}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stepper Navigation */}
          <div className="pt-4 border-t border-[#F5F1E8] flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#DED3BD] hover:bg-[#F5F1E8] text-[#1B2C24] text-xs font-semibold disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{L.prevBtn}</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!answers[currentQ.id]}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#2D4738] hover:bg-[#385A45] text-white text-xs font-bold shadow-md transition-all disabled:opacity-40 disabled:pointer-events-none"
            >
              <span>{currentIndex === questions.length - 1 ? L.viewResultBtn : L.nextBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Completed Test Results Dashboard */}
      {result && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Section 1: Summary Matrix (Skills, Interests, Industries) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Kỹ năng nổi trội */}
            <div className="p-5 rounded-2xl bg-white border border-[#EDE6D6] shadow-sm space-y-2.5">
              <div className="flex items-center gap-2 text-[#2D4738] font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{L.skillsTitle}</span>
              </div>
              <ul className="space-y-1.5 text-xs text-neutral-700">
                {result.skills.map((skill, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#385A45] mt-1.5 shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Sở thích cốt lõi */}
            <div className="p-5 rounded-2xl bg-white border border-[#EDE6D6] shadow-sm space-y-2.5">
              <div className="flex items-center gap-2 text-[#2D4738] font-bold text-xs uppercase tracking-wider">
                <Compass className="w-4 h-4 text-emerald-600" />
                <span>{L.interestsTitle}</span>
              </div>
              <ul className="space-y-1.5 text-xs text-neutral-700">
                {result.interests.map((interest, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#385A45] mt-1.5 shrink-0" />
                    <span>{interest}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Ngành nghề phù hợp */}
            <div className="p-5 rounded-2xl bg-white border border-[#EDE6D6] shadow-sm space-y-2.5">
              <div className="flex items-center gap-2 text-[#2D4738] font-bold text-xs uppercase tracking-wider">
                <Briefcase className="w-4 h-4 text-emerald-600" />
                <span>{L.industriesTitle}</span>
              </div>
              <ul className="space-y-1.5 text-xs text-neutral-700">
                {result.matchedIndustries.map((ind, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#385A45] mt-1.5 shrink-0" />
                    <span className="font-semibold text-[#1B2C24]">{ind}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 2: Top Công việc phù hợp nhất */}
          <div className="bg-white p-6 rounded-2xl border border-[#EDE6D6] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#1B2C24] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>{L.topJobsTitle}</span>
                </h3>
                <p className="text-xs text-[#4A7D5C] mt-0.5">
                  {L.topJobsDesc}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {result.topJobs.map((item, idx) => {
                const matchedJob = findJobInCatalog(item.title);
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#FBF9F4] border border-[#EDE6D6] hover:border-[#6F9C7F] transition-all space-y-2.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-[#2D4738] text-white font-bold text-xs flex items-center justify-center">
                          #{idx + 1}
                        </span>
                        <h4 className="text-sm font-bold text-[#1B2C24]">{item.title}</h4>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                          {L.fitScore} {item.matchPercentage}%
                        </span>
                        <span className="text-xs font-semibold text-[#2D4738] bg-[#EDE6D6] px-2.5 py-0.5 rounded-full">
                          {item.startingSalary}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-700 leading-relaxed bg-white p-3 rounded-lg border border-[#F5F1E8]">
                      <span className="font-semibold text-[#1B2C24]">{L.whyFitLabel}</span> {item.whyFit}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                      <div className="flex items-center gap-1.5 flex-wrap text-xs">
                        <span className="text-[11px] text-neutral-500 font-semibold">{L.strengthsLabel}</span>
                        {item.keyStrengths?.map((st, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[11px] px-2 py-0.5 rounded bg-white text-[#2D4738] border border-[#EDE6D6]"
                          >
                            {st}
                          </span>
                        ))}
                      </div>

                      {matchedJob ? (
                        <button
                          onClick={() => onSelectJob(matchedJob)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2D4738] hover:bg-[#385A45] text-white text-xs font-bold transition-all shadow-sm shrink-0"
                        >
                          <span>{L.viewAndApply}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <span className="text-[11px] text-neutral-400">{L.updatingJobs}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Roadmap Action Tip */}
          <div className="p-4 rounded-xl bg-[#E3ECE6] border border-[#9EBFB5] flex items-start gap-3 text-xs">
            <Lightbulb className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#1B2C24] block mb-0.5">{L.expertAdvice}</span>
              <p className="text-neutral-700 leading-relaxed">{result.roadmapTip}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
