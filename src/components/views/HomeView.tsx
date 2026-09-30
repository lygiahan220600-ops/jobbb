import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  Search,
  ArrowRight,
  Sliders,
  TrendingUp,
  Clock,
  Compass,
  Briefcase,
  Award,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Users2,
  Building2,
  Globe2
} from 'lucide-react';
import { Currency, Job, Language, UserProfile, WorkType } from '../../types/job';
import { JobCard } from '../JobCard';
import { NavScreen } from '../Sidebar';
import { TRANSLATIONS, getLocalizedIndustry } from '../../utils/i18n';

interface HomeViewProps {
  jobs: Job[];
  user: UserProfile;
  savedJobIds: Set<string>;
  onToggleSave: (jobId: string) => void;
  onSelectJob: (job: Job) => void;
  onStartChat: (job: Job) => void;
  onNavigate: (screen: NavScreen) => void;
  onOpenAIFinder: () => void;
  onUpdateRadius: (radius: number) => void;
  lang?: Language;
  currency?: Currency;
}

export const HomeView: React.FC<HomeViewProps> = ({
  jobs,
  user,
  savedJobIds,
  onToggleSave,
  onSelectJob,
  onStartChat,
  onNavigate,
  onOpenAIFinder,
  onUpdateRadius,
  lang = 'vi',
  currency = 'VND',
}) => {
  const t = TRANSLATIONS[lang];
  const [selectedRadius, setSelectedRadius] = useState<number>(user.radiusKm || 5);
  const [quickInput, setQuickInput] = useState('');

  // Jobs nearby within radius
  const nearbyJobs = jobs
    .filter((j) => j.distanceKm <= selectedRadius)
    .sort((a, b) => a.distanceKm - b.distanceKm);

  // AI Recommended jobs (sorted by matchScore)
  const aiRecommendedJobs = [...jobs].sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0)).slice(0, 4);

  const handleRadiusChange = (radius: number) => {
    setSelectedRadius(radius);
    onUpdateRadius(radius);
  };

  const popularCategories = [
    { vi: 'Giáo dục & Ngôn ngữ', en: 'Education & Languages', ko: '교육 및 어학', icon: Globe2, count: 18 },
    { vi: 'Chăm sóc khách hàng', en: 'Customer Support (CS)', ko: '고객상담 및 CS', icon: Users2, count: 24 },
    { vi: 'Công nghệ thông tin', en: 'Information Technology', ko: 'IT / 소프트웨어', icon: Briefcase, count: 32 },
    { vi: 'Biên phiên dịch & Ngôn ngữ', en: 'Translation & Media', ko: '통번역 및 미디어', icon: Sparkles, count: 15 },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Hero Banner in Moss Green & Cream */}
      <section className="relative overflow-hidden rounded-2xl bg-[#1B2C24] text-white shadow-xl border border-[#2D4738]">
        {/* Background photo overlay with measured contrast */}
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="/src/assets/images/hero_job_workspace_1790732853663.jpg"
            alt="Workspace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B2C24] via-[#1B2C24]/90 to-transparent" />
        </div>

        <div className="relative z-10 p-5 sm:p-6 md:p-8 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#385A45]/80 border border-[#4F755D] text-[11px] font-semibold text-[#EDE6D6] mb-2.5">
            <Sparkles className="w-3 h-3 text-emerald-300" />
            <span>{t.heroBadge}</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#FAF8F2] tracking-tight leading-snug">
            {t.heroTitle}
          </h1>

          <p className="mt-1.5 text-xs text-[#C7D9CC] leading-relaxed max-w-lg">
            {t.heroSubtitle} {user.city || 'TP. Hồ Chí Minh'}.
          </p>

          {/* Compact Slim AI Prompt Bar */}
          <div className="mt-3.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-lg">
            <div className="relative flex-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                placeholder="Gợi ý việc bằng AI: ca tối, gần tôi, lương..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white text-[#1B2C24] placeholder-neutral-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-2xs"
              />
            </div>
            <button
              onClick={onOpenAIFinder}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-2xs transition-all flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap"
            >
              <Sparkles className="w-3 h-3" />
              <span>Gợi ý việc AI</span>
            </button>
          </div>

          {/* Subtle Quick Filter Pills */}
          <div className="mt-2 flex flex-wrap items-center gap-1 text-[10px]">
            <button
              type="button"
              onClick={onOpenAIFinder}
              className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[#EDE6D6] transition-colors"
            >
              Trợ giảng tiếng Hàn
            </button>
            <button
              type="button"
              onClick={onOpenAIFinder}
              className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[#EDE6D6] transition-colors"
            >
              Part-time ca tối
            </button>
            <button
              type="button"
              onClick={() => onNavigate('test')}
              className="px-2 py-0.5 rounded bg-emerald-700/50 hover:bg-emerald-700/70 text-emerald-200 transition-colors flex items-center gap-1"
            >
              <Award className="w-2.5 h-2.5" />
              <span>Trắc nghiệm (10 Qs)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="grid grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-xl border border-[#EDE6D6] text-center">
          <p className="text-lg md:text-xl font-extrabold text-[#2D4738] font-mono tabular-nums">1,200+</p>
          <p className="text-xs text-neutral-500 font-medium">{t.statsJobs}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#EDE6D6] text-center">
          <p className="text-lg md:text-xl font-extrabold text-[#2D4738] font-mono tabular-nums">450+</p>
          <p className="text-xs text-neutral-500 font-medium">{t.statsCompanies}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#EDE6D6] text-center">
          <p className="text-lg md:text-xl font-extrabold text-emerald-700 font-mono tabular-nums">98%</p>
          <p className="text-xs text-neutral-500 font-medium">{t.statsMatchRate}</p>
        </div>
      </section>

      {/* 2. Section: Popular Categories */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-[#1B2C24] flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#385A45]" />
          <span>{t.quickCategoriesTitle}</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {popularCategories.map((cat, i) => {
            const Icon = cat.icon;
            const label = cat[lang] || cat.vi;
            return (
              <div
                key={i}
                onClick={() => onNavigate('search')}
                className="p-3.5 rounded-xl bg-white border border-[#EDE6D6] hover:border-[#385A45] hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="w-8 h-8 rounded-lg bg-[#F5F1E8] text-[#2D4738] flex items-center justify-center mb-2">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#1B2C24] line-clamp-1">{label}</h3>
                  <p className="text-[11px] text-neutral-500 font-mono mt-0.5">{cat.count} {t.resultsCount}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Section: Việc làm gần bạn (Radius Radar) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#EDE6D6]">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#EDE6D6] text-[#2D4738] flex items-center justify-center">
                <MapPin className="w-4 h-4 text-[#385A45]" />
              </div>
              <h2 className="text-sm font-bold text-[#1B2C24]">{t.nearbyRadiusTitle}</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono tabular-nums">
                {nearbyJobs.length} {lang === 'ko' ? '개' : 'jobs'}
              </span>
            </div>
            <p className="text-xs text-[#4A7D5C] mt-1">
              {lang === 'ko'
                ? `현재 설정된 위치: ${user.district}, ${user.city} 반경 내`
                : lang === 'en'
                ? `Displaying opportunities around ${user.district}, ${user.city}`
                : `Hiển thị các cơ hội việc làm xung quanh khu vực ${user.district}, ${user.city}`}
            </p>
          </div>

          {/* Radius selector buttons */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-neutral-500 mr-1 hidden md:inline">{t.radiusLabel}:</span>
            {[1, 3, 5, 10, 20].map((km) => (
              <button
                key={km}
                type="button"
                onClick={() => handleRadiusChange(km)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedRadius === km
                    ? 'bg-[#2D4738] text-white shadow-xs'
                    : 'bg-[#F5F1E8] text-[#2D4738] hover:bg-[#EDE6D6]'
                }`}
              >
                ≤ {km} km
              </button>
            ))}
          </div>
        </div>

        {/* Nearby Jobs Grid */}
        {nearbyJobs.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-[#EDE6D6] space-y-2">
            <MapPin className="w-8 h-8 mx-auto text-neutral-400" />
            <p className="text-xs font-bold text-[#1B2C24]">
              {lang === 'ko'
                ? `${selectedRadius}km 반경 내 일자리가 없습니다`
                : lang === 'en'
                ? `No jobs found within ${selectedRadius} km`
                : `Không có việc làm trong bán kính ${selectedRadius} km`}
            </p>
            <p className="text-xs text-neutral-500">
              {lang === 'ko'
                ? '반경을 10km 이상으로 확장해보세요.'
                : lang === 'en'
                ? 'Try expanding your radius to 10 km to see more opportunities.'
                : 'Hãy thử mở rộng bán kính lên 10 km để xem nhiều vị trí hơn.'}
            </p>
            <button
              onClick={() => handleRadiusChange(10)}
              className="mt-2 px-4 py-2 rounded-lg bg-[#2D4738] text-white text-xs font-bold"
            >
              {lang === 'ko'
                ? '반경 10km로 확장'
                : lang === 'en'
                ? 'Expand to 10 km'
                : 'Mở rộng bán kính lên 10 km'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nearbyJobs.slice(0, 6).map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={savedJobIds.has(job.id)}
                onToggleSave={onToggleSave}
                onSelectJob={onSelectJob}
                onStartChat={onStartChat}
                lang={lang}
                displayCurrency={currency}
              />
            ))}
          </div>
        )}
      </section>

      {/* 4. Section: AI Gợi ý việc làm theo ngành học & kinh nghiệm */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#1B2C24] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>{t.recommendedTitle} {user.major ? `(${user.major})` : '(Phù hợp với bạn)'}</span>
            </h2>
            <p className="text-xs text-[#4A7D5C] mt-0.5">
              {lang === 'ko'
                ? `${user.fullName || '회원'} 님의 어학 능력 및 지원 선호도 맞춤 분석 결과`
                : lang === 'en'
                ? `Matched according to ${user.fullName || 'your'} language skills, schedule, and preferences`
                : `Phân tích theo kỹ năng, lịch rảnh và định hướng của ${user.fullName || 'bạn'}`}
            </p>
          </div>
          <button
            onClick={() => onNavigate('search')}
            className="text-xs font-semibold text-[#2D4738] hover:underline flex items-center gap-1"
          >
            <span>{t.viewAllJobs}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiRecommendedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={savedJobIds.has(job.id)}
              onToggleSave={onToggleSave}
              onSelectJob={onSelectJob}
              onStartChat={onStartChat}
              lang={lang}
              displayCurrency={currency}
            />
          ))}
        </div>
      </section>

      {/* 5. Career Tools Ribbon (CV Builder & Assessment Test) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          onClick={() => onNavigate('cv')}
          className="p-6 rounded-2xl bg-gradient-to-br from-[#2D4738] to-[#1B2C24] text-white shadow-md cursor-pointer hover:shadow-lg transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white mb-3 group-hover:scale-105 transition-transform">
            <Briefcase className="w-5 h-5 text-emerald-300" />
          </div>
          <h3 className="text-base font-bold text-[#FAF8F2]">{t.cvBuilderTitle}</h3>
          <p className="text-xs text-[#C7D9CC] mt-1.5 leading-relaxed">
            {t.cvBuilderSubtitle}
          </p>
          <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-300 group-hover:translate-x-1 transition-transform">
            <span>{lang === 'ko' ? '이력서 작성 시작하기' : lang === 'en' ? 'Start Building Resume' : 'Bắt đầu tạo CV ngay'}</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        <div
          onClick={() => onNavigate('test')}
          className="p-6 rounded-2xl bg-[#EDE6D6] text-[#1B2C24] border border-[#DED3BD] shadow-sm cursor-pointer hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#2D4738] flex items-center justify-center text-white mb-3 group-hover:scale-105 transition-transform">
            <Award className="w-5 h-5 text-emerald-300" />
          </div>
          <h3 className="text-base font-bold text-[#1B2C24]">{t.testTitle}</h3>
          <p className="text-xs text-[#4A7D5C] mt-1.5 leading-relaxed">
            {t.testSubtitle}
          </p>
          <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#2D4738] group-hover:translate-x-1 transition-transform">
            <span>{lang === 'ko' ? '적성 검사 시작' : lang === 'en' ? 'Take Career Quiz' : 'Bắt đầu trắc nghiệm'}</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us Trust Section */}
      <section className="bg-white p-6 rounded-2xl border border-[#EDE6D6] space-y-4">
        <h2 className="text-sm font-bold text-[#1B2C24] text-center">
          {t.whyChooseTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#FBF9F4] border border-[#EDE6D6] space-y-1.5">
            <h4 className="font-bold text-[#2D4738] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>{t.whyCard1Title}</span>
            </h4>
            <p className="text-neutral-600 leading-relaxed">{t.whyCard1Desc}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#FBF9F4] border border-[#EDE6D6] space-y-1.5">
            <h4 className="font-bold text-[#2D4738] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>{t.whyCard2Title}</span>
            </h4>
            <p className="text-neutral-600 leading-relaxed">{t.whyCard2Desc}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#FBF9F4] border border-[#EDE6D6] space-y-1.5">
            <h4 className="font-bold text-[#2D4738] flex items-center gap-1.5">
              <Users2 className="w-4 h-4 text-emerald-700" />
              <span>{t.whyCard3Title}</span>
            </h4>
            <p className="text-neutral-600 leading-relaxed">{t.whyCard3Desc}</p>
          </div>
        </div>
      </section>
    </div>
  );
};
