import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  MapPin,
  DollarSign,
  Clock,
  Briefcase,
  RotateCcw,
  Sparkles,
  SlidersHorizontal,
  ChevronDown,
  Navigation,
  Globe,
  Sliders,
  Compass,
  CheckCircle2
} from 'lucide-react';
import {
  Job,
  WorkType,
  Language,
  Currency,
  UserProfile,
  CandidatePreferences
} from '../../types/job';
import {
  INDUSTRIES_LIST,
  WORK_TYPES_LIST,
  DISTRICTS_HCM,
  CITIES_LIST
} from '../../data/mockJobs';
import { JobCard } from '../JobCard';
import { CandidatePreferencesWidget } from '../CandidatePreferencesWidget';
import { TRANSLATIONS, getExpandedSearchTerms } from '../../utils/i18n';
import { convertCurrency, formatCurrencyAmount } from '../../utils/currency';

interface JobSearchViewProps {
  jobs: Job[];
  savedJobIds: Set<string>;
  onToggleSave: (jobId: string) => void;
  onSelectJob: (job: Job) => void;
  onStartChat: (job: Job) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  lang?: Language;
  currency?: Currency;
  onCurrencyChange?: (c: Currency) => void;
}

export const JobSearchView: React.FC<JobSearchViewProps> = ({
  jobs,
  savedJobIds,
  onToggleSave,
  onSelectJob,
  onStartChat,
  searchQuery,
  onSearchChange,
  user,
  onUpdateUser,
  lang = 'vi',
  currency = 'VND',
  onCurrencyChange,
}) => {
  const t = TRANSLATIONS[lang];

  // Local state for filters
  const [selectedCity, setSelectedCity] = useState('Tất cả thành phố');
  const [selectedIndustry, setSelectedIndustry] = useState('Tất cả ngành nghề');
  const [selectedDistrict, setSelectedDistrict] = useState('Tất cả khu vực');
  const [selectedWorkType, setSelectedWorkType] = useState<WorkType>('Tất cả');
  
  // Salary filter state
  const [activeCurrency, setActiveCurrency] = useState<Currency>(currency);
  const [salaryMin, setSalaryMin] = useState<number>(0);
  const [salaryMax, setSalaryMax] = useState<number>(50); // in millions if VND, or respective if USD/KRW

  // Distance & Location filter
  const [maxDistanceKm, setMaxDistanceKm] = useState<number>(30);
  const [useCurrentLocationGps, setUseCurrentLocationGps] = useState(false);

  // Sorting
  const [sortBy, setSortBy] = useState<'match' | 'distance' | 'salary' | 'recent'>('match');

  // Candidate preferences collapsible drawer
  const [showPreferencesWidget, setShowPreferencesWidget] = useState(false);

  const handleCurrencySwitch = (newCurr: Currency) => {
    if (newCurr === activeCurrency) return;
    if (activeCurrency === 'VND' && newCurr === 'USD') {
      setSalaryMin(Math.round(convertCurrency(salaryMin * 1_000_000, 'VND', 'USD')));
      setSalaryMax(Math.round(convertCurrency(salaryMax * 1_000_000, 'VND', 'USD')));
    } else if (activeCurrency === 'VND' && newCurr === 'KRW') {
      setSalaryMin(Math.round(convertCurrency(salaryMin * 1_000_000, 'VND', 'KRW') / 10_000));
      setSalaryMax(Math.round(convertCurrency(salaryMax * 1_000_000, 'VND', 'KRW') / 10_000));
    } else if (activeCurrency === 'USD' && newCurr === 'VND') {
      setSalaryMin(Math.round(convertCurrency(salaryMin, 'USD', 'VND') / 1_000_000));
      setSalaryMax(Math.round(convertCurrency(salaryMax, 'USD', 'VND') / 1_000_000));
    } else if (activeCurrency === 'USD' && newCurr === 'KRW') {
      setSalaryMin(Math.round(convertCurrency(salaryMin, 'USD', 'KRW') / 10_000));
      setSalaryMax(Math.round(convertCurrency(salaryMax, 'USD', 'KRW') / 10_000));
    } else if (activeCurrency === 'KRW' && newCurr === 'VND') {
      setSalaryMin(Math.round(convertCurrency(salaryMin * 10_000, 'KRW', 'VND') / 1_000_000));
      setSalaryMax(Math.round(convertCurrency(salaryMax * 10_000, 'KRW', 'VND') / 1_000_000));
    } else if (activeCurrency === 'KRW' && newCurr === 'USD') {
      setSalaryMin(Math.round(convertCurrency(salaryMin * 10_000, 'KRW', 'USD')));
      setSalaryMax(Math.round(convertCurrency(salaryMax * 10_000, 'KRW', 'USD')));
    }
    setActiveCurrency(newCurr);
    if (onCurrencyChange) {
      onCurrencyChange(newCurr);
    }
  };

  // Save Candidate Preferences
  const handleSavePreferences = (prefs: CandidatePreferences) => {
    const updatedUser = {
      ...user,
      preferences: prefs,
    };
    onUpdateUser(updatedUser);
  };

  // 1-Click apply preferences to search filters
  const handleApplyPreferencesAsFilter = (prefs: CandidatePreferences) => {
    if (prefs.workTypes && prefs.workTypes.length > 0) {
      setSelectedWorkType(prefs.workTypes[0] as WorkType);
    }
    if (prefs.desiredPositions && prefs.desiredPositions.length > 0) {
      onSearchChange(prefs.desiredPositions[0]);
    }
    if (prefs.expectedSalary) {
      handleCurrencySwitch(prefs.expectedSalary.currency);
      setSalaryMin(prefs.expectedSalary.min);
      setSalaryMax(prefs.expectedSalary.max);
    }
    setShowPreferencesWidget(false);
  };

  // Filter logic with multilingual cross-search expansion
  const filteredJobs = useMemo(() => {
    // Expand search keywords across Korean, English, Vietnamese
    const expandedTerms = getExpandedSearchTerms(searchQuery);

    // Convert filter salary bounds into base VND Million
    let filterMinVndMillion = 0;
    let filterMaxVndMillion = 9999;
    if (salaryMin > 0) {
      if (activeCurrency === 'VND') {
        filterMinVndMillion = salaryMin;
      } else if (activeCurrency === 'USD') {
        filterMinVndMillion = convertCurrency(salaryMin, 'USD', 'VND') / 1_000_000;
      } else if (activeCurrency === 'KRW') {
        filterMinVndMillion = convertCurrency(salaryMin * 10_000, 'KRW', 'VND') / 1_000_000;
      }
    }
    if (salaryMax < (activeCurrency === 'VND' ? 50 : activeCurrency === 'USD' ? 2000 : 300)) {
      if (activeCurrency === 'VND') {
        filterMaxVndMillion = salaryMax;
      } else if (activeCurrency === 'USD') {
        filterMaxVndMillion = convertCurrency(salaryMax, 'USD', 'VND') / 1_000_000;
      } else if (activeCurrency === 'KRW') {
        filterMaxVndMillion = convertCurrency(salaryMax * 10_000, 'KRW', 'VND') / 1_000_000;
      }
    }

    return jobs.filter((job) => {
      // 1. Multilingual Search Query
      if (searchQuery.trim()) {
        const titleVi = (job.titles?.vi || job.title).toLowerCase();
        const titleEn = (job.titles?.en || '').toLowerCase();
        const titleKo = (job.titles?.ko || '').toLowerCase();
        const company = job.company.toLowerCase();
        const descVi = (job.descriptions?.vi || job.description).toLowerCase();
        const descEn = (job.descriptions?.en || '').toLowerCase();
        const descKo = (job.descriptions?.ko || '').toLowerCase();
        const reqStr = job.requirements.join(' ').toLowerCase();

        // Check against expanded synonym terms
        const hasMatch = expandedTerms.some((term) => {
          return (
            titleVi.includes(term) ||
            titleEn.includes(term) ||
            titleKo.includes(term) ||
            company.includes(term) ||
            descVi.includes(term) ||
            descEn.includes(term) ||
            descKo.includes(term) ||
            reqStr.includes(term)
          );
        });

        if (!hasMatch) return false;
      }

      // 2. City Filter
      if (selectedCity !== 'Tất cả thành phố' && !job.location.city.toLowerCase().includes(selectedCity.toLowerCase())) {
        return false;
      }

      // 3. District Filter
      if (selectedDistrict !== 'Tất cả khu vực' && job.location.district !== selectedDistrict) {
        return false;
      }

      // 4. Industry Filter
      if (selectedIndustry !== 'Tất cả ngành nghề' && job.industry !== selectedIndustry) {
        return false;
      }

      // 5. Work Type Filter
      if (selectedWorkType !== 'Tất cả' && job.workType !== selectedWorkType) {
        return false;
      }

      // 6. Salary Range Filter
      if (filterMinVndMillion > 0 && job.salaryMax < filterMinVndMillion) {
        return false;
      }
      if (filterMaxVndMillion < 9999 && job.salaryMin > filterMaxVndMillion) {
        return false;
      }

      // 7. Distance / GPS radius
      if (job.distanceKm > maxDistanceKm) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      if (sortBy === 'salary') return b.salaryMax - a.salaryMax;
      if (sortBy === 'match') return (b.matchScore || 0) - (a.matchScore || 0);
      return 0; // recent
    });
  }, [
    jobs,
    searchQuery,
    selectedCity,
    selectedDistrict,
    selectedIndustry,
    selectedWorkType,
    salaryMin,
    salaryMax,
    activeCurrency,
    maxDistanceKm,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setSelectedCity('Tất cả thành phố');
    setSelectedDistrict('Tất cả khu vực');
    setSelectedIndustry('Tất cả ngành nghề');
    setSelectedWorkType('Tất cả');
    setSalaryMin(0);
    setSalaryMax(activeCurrency === 'VND' ? 50 : activeCurrency === 'USD' ? 2000 : 300);
    setMaxDistanceKm(30);
    setUseCurrentLocationGps(false);
    onSearchChange('');
  };

  const hasActiveFilters =
    selectedCity !== 'Tất cả thành phố' ||
    selectedDistrict !== 'Tất cả khu vực' ||
    selectedIndustry !== 'Tất cả ngành nghề' ||
    selectedWorkType !== 'Tất cả' ||
    salaryMin > 0 ||
    maxDistanceKm < 30 ||
    searchQuery.trim() !== '';

  return (
    <div className="space-y-6 pb-12">
      {/* MODULE 4 QUICK PREFERENCES BANNER */}
      <div className="bg-[#FAF8F2] rounded-2xl border border-[#DED3BD] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#2D4738] text-white">
            <Compass className="w-4 h-4 text-emerald-300" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#1B2C24]">
              {t.candidatePreferencesTitle}
            </h3>
            <p className="text-[11px] text-neutral-500">
              {user.preferences?.desiredPositions?.length
                ? `${lang === 'ko' ? '설정된 희망 직무' : lang === 'en' ? 'Target roles' : 'Vị trí ưu tiên'}: ${user.preferences.desiredPositions.join(', ')}`
                : t.candidatePreferencesSubtitle}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowPreferencesWidget(!showPreferencesWidget)}
          className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#F5F1E8] border border-[#DED3BD] text-xs font-semibold text-[#1B2C24] transition-all self-start sm:self-auto flex items-center gap-1.5"
        >
          <Sliders className="w-3.5 h-3.5 text-[#385A45]" />
          <span>{showPreferencesWidget ? (lang === 'ko' ? '희망 조건 닫기' : lang === 'en' ? 'Close Preferences' : 'Đóng tùy chọn') : (lang === 'ko' ? '희망 조건 설정 및 필터링' : lang === 'en' ? 'Configure Preferences' : 'Tùy chỉnh mong muốn')}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showPreferencesWidget ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Expanded Candidate Preferences Drawer */}
      {showPreferencesWidget && (
        <div className="animate-in slide-in-from-top-2 duration-200">
          <CandidatePreferencesWidget
            user={user}
            lang={lang}
            onSavePreferences={handleSavePreferences}
            onApplyAsFilter={handleApplyPreferencesAsFilter}
          />
        </div>
      )}

      {/* MODULE 1: SEARCH BAR & MULTI-FILTER CONTROL PANEL */}
      <div className="bg-white p-5 rounded-2xl border border-[#EDE6D6] shadow-sm space-y-4">
        {/* Main Search Bar with Cross-Language Support */}
        <div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#4A7D5C] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#FBF9F4] text-[#1B2C24] border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#385A45]"
              />
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-500 whitespace-nowrap">{t.sortBy}:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 text-xs bg-[#F5F1E8] text-[#1B2C24] border border-[#DED3BD] rounded-xl font-medium focus:outline-none"
              >
                <option value="match">{t.sortBestMatch}</option>
                <option value="distance">{t.sortDistance}</option>
                <option value="salary">{t.sortSalaryHigh}</option>
                <option value="recent">{t.sortRecent}</option>
              </select>
            </div>
          </div>

          <p className="text-[11px] text-[#4A7D5C] mt-1.5 flex items-center gap-1.5">
            <Globe className="w-3 h-3 text-[#385A45]" />
            <span>{t.keywordHelper} (Ví dụ: "개발자", "Developer", "Lập trình viên", "CSKH", "한국어")</span>
          </p>
        </div>

        {/* Filter Rows Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-[#F5F1E8] text-xs">
          {/* 1. Location (City) */}
          <div>
            <label className="text-[11px] font-semibold text-neutral-600 block mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#385A45]" />
              {t.cityLabel}:
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2 bg-[#FBF9F4] text-[#1B2C24] border border-[#DED3BD] rounded-lg focus:outline-none"
            >
              {CITIES_LIST.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Location (District) */}
          <div>
            <label className="text-[11px] font-semibold text-neutral-600 block mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#385A45]" />
              {t.districtLabel}:
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2 bg-[#FBF9F4] text-[#1B2C24] border border-[#DED3BD] rounded-lg focus:outline-none"
            >
              {DISTRICTS_HCM.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Work Type */}
          <div>
            <label className="text-[11px] font-semibold text-neutral-600 block mb-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#385A45]" />
              {t.workTypeTitle}:
            </label>
            <select
              value={selectedWorkType}
              onChange={(e) => setSelectedWorkType(e.target.value as WorkType)}
              className="w-full px-3 py-2 bg-[#FBF9F4] text-[#1B2C24] border border-[#DED3BD] rounded-lg focus:outline-none"
            >
              {WORK_TYPES_LIST.map((wt) => (
                <option key={wt} value={wt}>
                  {wt}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Industry */}
          <div>
            <label className="text-[11px] font-semibold text-neutral-600 block mb-1 flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-[#385A45]" />
              {t.industryTitle}:
            </label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full px-3 py-2 bg-[#FBF9F4] text-[#1B2C24] border border-[#DED3BD] rounded-lg focus:outline-none"
            >
              {INDUSTRIES_LIST.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Currency & Salary Filter Section */}
        <div className="p-3.5 rounded-xl bg-[#FAF8F2] border border-[#EDE6D6] space-y-2 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#385A45]" />
              <span className="font-bold text-[#1B2C24]">{t.salaryFilterTitle}</span>
              <span className="text-[11px] text-neutral-500 font-mono">
                ({salaryMin} - {salaryMax} {activeCurrency === 'VND' ? 'triệu VND' : activeCurrency === 'KRW' ? '만 KRW' : 'USD'})
              </span>
            </div>

            {/* Currency Selector (VND / USD / KRW) */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <span className="text-[11px] text-neutral-500">{t.currencyLabel}:</span>
              <div className="flex items-center bg-white p-0.5 rounded-lg border border-[#DED3BD]">
                {(['VND', 'USD', 'KRW'] as Currency[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleCurrencySwitch(c)}
                    className={`px-2 py-0.5 text-[11px] font-bold rounded-md transition-all ${
                      activeCurrency === c
                        ? 'bg-[#2D4738] text-white shadow-xs'
                        : 'text-neutral-600 hover:text-[#1B2C24]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Salary Min / Max Input controls */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <div>
              <span className="text-[10px] text-neutral-500 block mb-0.5">{t.minSalary}:</span>
              <input
                type="number"
                min={0}
                value={salaryMin}
                onChange={(e) => setSalaryMin(Math.max(0, Number(e.target.value)))}
                className="w-full p-1.5 bg-white border border-[#DED3BD] rounded-lg font-mono tabular-nums text-xs"
              />
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 block mb-0.5">{t.maxSalary}:</span>
              <input
                type="number"
                min={salaryMin}
                value={salaryMax}
                onChange={(e) => setSalaryMax(Math.max(salaryMin, Number(e.target.value)))}
                className="w-full p-1.5 bg-white border border-[#DED3BD] rounded-lg font-mono tabular-nums text-xs"
              />
            </div>
            <div className="col-span-2 flex items-center pt-3 text-[11px] text-neutral-500 font-mono">
              <span>
                ≈ {activeCurrency === 'VND'
                  ? `${Math.round(convertCurrency(salaryMin * 1_000_000, 'VND', 'USD'))} - ${Math.round(convertCurrency(salaryMax * 1_000_000, 'VND', 'USD'))} USD`
                  : activeCurrency === 'USD'
                  ? `${Math.round(convertCurrency(salaryMin, 'USD', 'VND') / 1_000_000)} - ${Math.round(convertCurrency(salaryMax, 'USD', 'VND') / 1_000_000)} triệu VND`
                  : `${Math.round(convertCurrency(salaryMin * 10_000, 'KRW', 'VND') / 1_000_000)} - ${Math.round(convertCurrency(salaryMax * 10_000, 'KRW', 'VND') / 1_000_000)} triệu VND`}
              </span>
            </div>
          </div>
        </div>

        {/* Location Radius & Simulated GPS Current Location */}
        <div className="pt-2 border-t border-[#F5F1E8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[11px] font-semibold text-neutral-600 flex items-center gap-1">
              <Navigation className="w-3.5 h-3.5 text-emerald-700" />
              {t.radiusLabel}:
            </span>
            <div className="flex items-center gap-1">
              {[2, 5, 10, 20, 50].map((km) => (
                <button
                  key={km}
                  type="button"
                  onClick={() => setMaxDistanceKm(km)}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                    maxDistanceKm === km
                      ? 'bg-[#2D4738] text-white'
                      : 'bg-[#F5F1E8] text-[#2D4738] hover:bg-[#EDE6D6]'
                  }`}
                >
                  ≤ {km} km
                </button>
              ))}
            </div>

            {/* GPS Toggle */}
            <button
              type="button"
              onClick={() => {
                setUseCurrentLocationGps(!useCurrentLocationGps);
                if (!useCurrentLocationGps) {
                  setMaxDistanceKm(10);
                }
              }}
              className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-md border transition-colors ${
                useCurrentLocationGps
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-white text-neutral-600 border-[#DED3BD] hover:bg-[#F5F1E8]'
              }`}
            >
              <MapPin className="w-3 h-3 text-emerald-600" />
              <span>{useCurrentLocationGps ? t.usingCurrentLocation : t.currentLocation}</span>
            </button>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-[11px] text-[#4A7D5C] hover:text-[#2D4738] font-semibold transition-colors self-end sm:self-auto"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t.resetFilters}</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs">
        <div className="text-[#1B2C24] font-semibold">
          <span className="font-bold text-[#2D4738] font-mono tabular-nums text-sm">
            {filteredJobs.length}
          </span>{' '}
          {t.resultsCount}
        </div>
        <div className="text-neutral-500 text-[11px]">
          {lang === 'ko' ? '15분마다 실시간 채용공고 갱신' : lang === 'en' ? 'Live updates every 15 mins' : 'Cập nhật việc làm mới mỗi 15 phút'}
        </div>
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-[#EDE6D6] space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#F5F1E8] text-neutral-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-[#1B2C24]">
            {lang === 'ko' ? '조건에 일치하는 채용공고가 없습니다' : lang === 'en' ? 'No matching jobs found' : 'Không tìm thấy công việc nào thỏa mãn'}
          </h3>
          <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
            {lang === 'ko'
              ? '검색 반경을 넓히거나 다른 키워드 또는 전체 직무를 선택해보세요.'
              : lang === 'en'
              ? 'Try widening the search radius, switching keywords, or selecting all industries.'
              : 'Hãy thử nới lỏng bán kính khoảng cách, chọn "Tất cả ngành nghề" hoặc giảm bớt tiêu chí lọc để xem thêm cơ hội việc làm.'}
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-[#2D4738] text-white text-xs font-bold shadow-xs"
          >
            {t.resetFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={savedJobIds.has(job.id)}
              onToggleSave={onToggleSave}
              onSelectJob={onSelectJob}
              onStartChat={onStartChat}
              lang={lang}
              displayCurrency={activeCurrency}
            />
          ))}
        </div>
      )}
    </div>
  );
};
