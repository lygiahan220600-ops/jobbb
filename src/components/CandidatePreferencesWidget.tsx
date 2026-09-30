import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  DollarSign,
  Briefcase,
  Layers,
  Sparkles,
  Plus,
  X,
  AlertCircle,
  Save,
  ArrowRight
} from 'lucide-react';
import {
  CandidatePreferences,
  Currency,
  Language,
  UserProfile
} from '../types/job';
import { TRANSLATIONS } from '../utils/i18n';
import { convertCurrency, formatCurrencyAmount } from '../utils/currency';

interface CandidatePreferencesWidgetProps {
  user: UserProfile;
  lang?: Language;
  onSavePreferences: (prefs: CandidatePreferences) => void;
  onApplyAsFilter?: (prefs: CandidatePreferences) => void;
}

const PREDEFINED_ROLES = [
  { vi: 'Trợ giảng tiếng Hàn', en: 'Korean Teaching Assistant', ko: '한국어 강사/조교' },
  { vi: 'Nhân viên CSKH tiếng Hàn', en: 'Korean Customer Support', ko: '한국어 고객상담/CS' },
  { vi: 'Biên dịch viên tiếng Hàn', en: 'Korean Translator', ko: '한국어 번역/통역' },
  { vi: 'Frontend React Developer', en: 'Frontend React Developer', ko: '프론트엔드 개발자' },
  { vi: 'Content Creator / Marketing', en: 'Content Creator / Marketing', ko: '콘텐츠 마케터' },
  { vi: 'Nhân viên Phục vụ F&B', en: 'F&B Service Crew', ko: 'F&B 레스토랑 서빙' },
  { vi: 'Thực tập sinh IT', en: 'IT Intern', ko: 'IT 인턴' },
];

export const CandidatePreferencesWidget: React.FC<CandidatePreferencesWidgetProps> = ({
  user,
  lang = 'vi',
  onSavePreferences,
  onApplyAsFilter,
}) => {
  const t = TRANSLATIONS[lang];

  // Initialize from user.preferences or sensible defaults
  const initialPrefs: CandidatePreferences = user.preferences || {
    workTypes: ['Bán thời gian (Part-time)', 'Làm việc từ xa (Remote)', 'Linh hoạt'],
    desiredPositions: [
      lang === 'ko' ? '한국어 강사/조교' : lang === 'en' ? 'Korean Teaching Assistant' : 'Trợ giảng tiếng Hàn',
      lang === 'ko' ? '한국어 번역/통역' : lang === 'en' ? 'Korean Translator' : 'Biên dịch viên tiếng Hàn',
    ],
    expectedSalary: {
      min: 6,
      max: 12,
      currency: 'VND', // in millions if VND, standard if USD/KRW
    },
  };

  const [workTypes, setWorkTypes] = useState<CandidatePreferences['workTypes']>(
    initialPrefs.workTypes
  );
  const [desiredPositions, setDesiredPositions] = useState<string[]>(
    initialPrefs.desiredPositions
  );
  const [salaryMin, setSalaryMin] = useState<number>(initialPrefs.expectedSalary.min);
  const [salaryMax, setSalaryMax] = useState<number>(initialPrefs.expectedSalary.max);
  const [salaryCurrency, setSalaryCurrency] = useState<Currency>(
    initialPrefs.expectedSalary.currency
  );
  const [customPositionInput, setCustomPositionInput] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Toggle work type
  const toggleWorkType = (type: 'Toàn thời gian' | 'Bán thời gian (Part-time)' | 'Làm việc từ xa (Remote)' | 'Linh hoạt') => {
    setWorkTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Add position (enforce max 3)
  const handleAddPosition = (pos: string) => {
    const trimmed = pos.trim();
    if (!trimmed) return;
    if (desiredPositions.includes(trimmed)) return;
    if (desiredPositions.length >= 3) {
      setValidationError(t.positionsLimitReached);
      setTimeout(() => setValidationError(null), 3000);
      return;
    }
    setDesiredPositions((prev) => [...prev, trimmed]);
    setCustomPositionInput('');
    setValidationError(null);
  };

  // Remove position
  const handleRemovePosition = (pos: string) => {
    setDesiredPositions((prev) => prev.filter((p) => p !== pos));
    setValidationError(null);
  };

  // Currency change handler with converted initial values
  const handleCurrencyChange = (newCurrency: Currency) => {
    if (newCurrency === salaryCurrency) return;

    if (salaryCurrency === 'VND' && newCurrency === 'USD') {
      setSalaryMin(Math.round(convertCurrency(salaryMin * 1_000_000, 'VND', 'USD')));
      setSalaryMax(Math.round(convertCurrency(salaryMax * 1_000_000, 'VND', 'USD')));
    } else if (salaryCurrency === 'VND' && newCurrency === 'KRW') {
      setSalaryMin(Math.round(convertCurrency(salaryMin * 1_000_000, 'VND', 'KRW') / 10_000));
      setSalaryMax(Math.round(convertCurrency(salaryMax * 1_000_000, 'VND', 'KRW') / 10_000));
    } else if (salaryCurrency === 'USD' && newCurrency === 'VND') {
      setSalaryMin(Math.round(convertCurrency(salaryMin, 'USD', 'VND') / 1_000_000));
      setSalaryMax(Math.round(convertCurrency(salaryMax, 'USD', 'VND') / 1_000_000));
    } else if (salaryCurrency === 'USD' && newCurrency === 'KRW') {
      setSalaryMin(Math.round(convertCurrency(salaryMin, 'USD', 'KRW') / 10_000));
      setSalaryMax(Math.round(convertCurrency(salaryMax, 'USD', 'KRW') / 10_000));
    } else if (salaryCurrency === 'KRW' && newCurrency === 'VND') {
      setSalaryMin(Math.round(convertCurrency(salaryMin * 10_000, 'KRW', 'VND') / 1_000_000));
      setSalaryMax(Math.round(convertCurrency(salaryMax * 10_000, 'KRW', 'VND') / 1_000_000));
    } else if (salaryCurrency === 'KRW' && newCurrency === 'USD') {
      setSalaryMin(Math.round(convertCurrency(salaryMin * 10_000, 'KRW', 'USD')));
      setSalaryMax(Math.round(convertCurrency(salaryMax * 10_000, 'KRW', 'USD')));
    }

    setSalaryCurrency(newCurrency);
  };

  // Convert current values to USD / KRW / VND for live comparison preview
  const getSalaryConversionPreview = () => {
    let minVnd = salaryMin * 1_000_000;
    let maxVnd = salaryMax * 1_000_000;

    if (salaryCurrency === 'USD') {
      minVnd = convertCurrency(salaryMin, 'USD', 'VND');
      maxVnd = convertCurrency(salaryMax, 'USD', 'VND');
    } else if (salaryCurrency === 'KRW') {
      minVnd = convertCurrency(salaryMin * 10_000, 'KRW', 'VND');
      maxVnd = convertCurrency(salaryMax * 10_000, 'KRW', 'VND');
    }

    const minUSD = Math.round(convertCurrency(minVnd, 'VND', 'USD'));
    const maxUSD = Math.round(convertCurrency(maxVnd, 'VND', 'USD'));
    const minKRW = Math.round(convertCurrency(minVnd, 'VND', 'KRW') / 10_000);
    const maxKRW = Math.round(convertCurrency(maxVnd, 'VND', 'KRW') / 10_000);
    const minVndMillion = Math.round(minVnd / 1_000_000);
    const maxVndMillion = Math.round(maxVnd / 1_000_000);

    return `≈ ${minVndMillion} - ${maxVndMillion} triệu VND · $${minUSD} - $${maxUSD} USD · ${minKRW}만 - ${maxKRW}만 KRW`;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const prefs: CandidatePreferences = {
      workTypes,
      desiredPositions,
      expectedSalary: {
        min: salaryMin,
        max: salaryMax,
        currency: salaryCurrency,
      },
    };
    onSavePreferences(prefs);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleApplyFilter = () => {
    const prefs: CandidatePreferences = {
      workTypes,
      desiredPositions,
      expectedSalary: {
        min: salaryMin,
        max: salaryMax,
        currency: salaryCurrency,
      },
    };
    onSavePreferences(prefs);
    if (onApplyAsFilter) {
      onApplyAsFilter(prefs);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EDE6D6] p-5 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F5F1E8] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#2D4738] text-white">
            <Compass className="w-4 h-4 text-emerald-300" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#1B2C24]">
              {t.candidatePreferencesTitle}
            </h3>
            <p className="text-xs text-neutral-500">
              {t.candidatePreferencesSubtitle}
            </p>
          </div>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold animate-in fade-in duration-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.preferencesSaved}</span>
          </div>
        )}
      </div>

      {validationError && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Form Area */}
      <form onSubmit={handleSave} className="space-y-5 text-xs">
        {/* 1. Work Types */}
        <div>
          <label className="font-bold text-[#2D4738] uppercase tracking-wider block mb-2">
            1. {t.prefWorkTypes}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'Toàn thời gian', label: t.fullTime },
              { id: 'Bán thời gian (Part-time)', label: t.partTime },
              { id: 'Làm việc từ xa (Remote)', label: t.remote },
              { id: 'Linh hoạt', label: t.hybrid },
            ].map((item) => {
              const isSelected = workTypes.includes(item.id as any);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleWorkType(item.id as any)}
                  className={`p-2.5 rounded-xl border text-center font-medium transition-all ${
                    isSelected
                      ? 'bg-[#2D4738] text-white border-[#2D4738] shadow-xs'
                      : 'bg-[#FBF9F4] hover:bg-[#F5F1E8] text-[#1B2C24] border-[#DED3BD]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Desired Positions (Max 3) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-bold text-[#2D4738] uppercase tracking-wider block">
              2. {t.prefDesiredPositions}
            </label>
            <span className="text-[11px] font-mono text-neutral-500 tabular-nums">
              {desiredPositions.length}/3 {lang === 'ko' ? '선택됨' : lang === 'en' ? 'selected' : 'đã chọn'}
            </span>
          </div>

          <p className="text-[11px] text-neutral-500 mb-2.5">
            {t.maxPositionsHint}
          </p>

          {/* Selected Positions Chips */}
          <div className="flex flex-wrap gap-2 mb-3">
            {desiredPositions.map((pos) => (
              <span
                key={pos}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2D4738] text-white text-xs font-semibold shadow-xs"
              >
                <span>{pos}</span>
                <button
                  type="button"
                  onClick={() => handleRemovePosition(pos)}
                  className="p-0.5 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {desiredPositions.length === 0 && (
              <span className="text-neutral-400 italic">
                {lang === 'ko' ? '선택된 희망 직무가 없습니다' : lang === 'en' ? 'No position selected yet' : 'Chưa có vị trí nào được chọn'}
              </span>
            )}
          </div>

          {/* Quick add predefined tag suggestions */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {PREDEFINED_ROLES.map((role) => {
              const label = role[lang] || role.vi;
              const isAdded = desiredPositions.includes(label);
              return (
                <button
                  key={label}
                  type="button"
                  disabled={isAdded || desiredPositions.length >= 3}
                  onClick={() => handleAddPosition(label)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors ${
                    isAdded
                      ? 'opacity-40 bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed'
                      : desiredPositions.length >= 3
                      ? 'opacity-50 bg-[#F5F1E8] border-[#DED3BD] text-neutral-400 cursor-not-allowed'
                      : 'bg-[#F5F1E8] hover:bg-[#EDE6D6] text-[#1B2C24] border-[#DED3BD]'
                  }`}
                >
                  + {label}
                </button>
              );
            })}
          </div>

          {/* Custom position text input */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={lang === 'ko' ? '직접 직무명 입력...' : lang === 'en' ? 'Or enter custom role...' : 'Hoặc nhập vị trí bạn mong muốn...'}
              value={customPositionInput}
              disabled={desiredPositions.length >= 3}
              onChange={(e) => setCustomPositionInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddPosition(customPositionInput);
                }
              }}
              className="flex-1 p-2 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
            />
            <button
              type="button"
              disabled={!customPositionInput.trim() || desiredPositions.length >= 3}
              onClick={() => handleAddPosition(customPositionInput)}
              className="px-3.5 py-2 bg-[#F5F1E8] hover:bg-[#EDE6D6] disabled:opacity-40 text-[#1B2C24] font-semibold rounded-xl border border-[#DED3BD] transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{lang === 'ko' ? '추가' : lang === 'en' ? 'Add' : 'Thêm'}</span>
            </button>
          </div>
        </div>

        {/* 3. Expected Salary & Currency Switcher */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-bold text-[#2D4738] uppercase tracking-wider block">
              3. {t.prefExpectedSalary}
            </label>

            {/* Currency Switcher */}
            <div className="flex items-center bg-[#F5F1E8] p-1 rounded-lg border border-[#DED3BD]">
              {(['VND', 'USD', 'KRW'] as Currency[]).map((curr) => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => handleCurrencyChange(curr)}
                  className={`px-2.5 py-0.5 text-[11px] font-bold rounded-md transition-all ${
                    salaryCurrency === curr
                      ? 'bg-[#2D4738] text-white shadow-xs'
                      : 'text-neutral-600 hover:text-[#1B2C24]'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-2">
            <div>
              <span className="text-[11px] text-neutral-500 block mb-1">
                {t.minSalary} ({salaryCurrency === 'VND' ? 'Triệu / tháng' : salaryCurrency === 'KRW' ? '만 KRW / 월' : 'USD / mo'}):
              </span>
              <input
                type="number"
                min={0}
                value={salaryMin}
                onChange={(e) => setSalaryMin(Number(e.target.value))}
                className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl font-mono tabular-nums focus:outline-none focus:ring-1 focus:ring-[#385A45]"
              />
            </div>
            <div>
              <span className="text-[11px] text-neutral-500 block mb-1">
                {t.maxSalary} ({salaryCurrency === 'VND' ? 'Triệu / tháng' : salaryCurrency === 'KRW' ? '만 KRW / 월' : 'USD / mo'}):
              </span>
              <input
                type="number"
                min={salaryMin}
                value={salaryMax}
                onChange={(e) => setSalaryMax(Number(e.target.value))}
                className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl font-mono tabular-nums focus:outline-none focus:ring-1 focus:ring-[#385A45]"
              />
            </div>
          </div>

          {/* Live Currency Equivalent Badge */}
          <div className="p-2.5 rounded-xl bg-[#F5F1E8] border border-[#DED3BD] flex items-center gap-2 text-[11px] text-neutral-600 font-mono">
            <DollarSign className="w-3.5 h-3.5 text-[#385A45] shrink-0" />
            <span>{getSalaryConversionPreview()}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#2D4738] hover:bg-[#385A45] text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{lang === 'ko' ? '희망 조건 저장' : lang === 'en' ? 'Save Preferences' : 'Lưu nguyện vọng'}</span>
          </button>

          {onApplyAsFilter && (
            <button
              type="button"
              onClick={handleApplyFilter}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#4A7D5C] hover:bg-[#385A45] text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
              <span>{t.applyPreferencesFilter}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
