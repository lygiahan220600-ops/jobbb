import React, { useState, useEffect } from 'react';
import {
  MapPin,
  CheckCircle,
  Save,
  LogOut,
  Compass,
  DollarSign,
  Briefcase,
  Layers,
  Sparkles,
  Plus,
  X,
  AlertCircle
} from 'lucide-react';
import {
  CandidatePreferences,
  Currency,
  Language,
  UserProfile
} from '../../types/job';
import { DISTRICTS_HCM } from '../../data/mockJobs';
import { INITIAL_USER_PROFILE } from '../../data/mockUserData';
import { TRANSLATIONS } from '../../utils/i18n';
import { convertCurrency } from '../../utils/currency';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  onOpenAuth: () => void;
  onLogout?: () => void;
  lang?: Language;
}

const PREDEFINED_ROLES = [
  'Trợ giảng tiếng Hàn',
  'Nhân viên CSKH tiếng Hàn',
  'Biên dịch viên tiếng Hàn',
  'Frontend React Developer',
  'Content Creator / Marketing',
  'Nhân viên Phục vụ F&B',
  'Thực tập sinh IT',
];

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onUpdateUser,
  onOpenAuth,
  onLogout,
  lang = 'vi',
}) => {
  const t = TRANSLATIONS[lang];

  const [formData, setFormData] = useState<UserProfile>(() => ({
    ...INITIAL_USER_PROFILE,
    ...user,
    fullName: user.fullName || INITIAL_USER_PROFILE.fullName,
    email: user.email || INITIAL_USER_PROFILE.email,
    phone: user.phone || INITIAL_USER_PROFILE.phone,
    address: user.address || INITIAL_USER_PROFILE.address,
    district: user.district || INITIAL_USER_PROFILE.district,
    city: user.city || INITIAL_USER_PROFILE.city,
    studentStatus: user.studentStatus || INITIAL_USER_PROFILE.studentStatus,
    major: user.major || INITIAL_USER_PROFILE.major,
    university: user.university || INITIAL_USER_PROFILE.university,
    bio: user.bio || INITIAL_USER_PROFILE.bio,
    skills: (user.skills && user.skills.length > 0) ? user.skills : INITIAL_USER_PROFILE.skills,
    languages: (user.languages && user.languages.length > 0) ? user.languages : INITIAL_USER_PROFILE.languages,
    preferredSchedule: user.preferredSchedule || INITIAL_USER_PROFILE.preferredSchedule,
    preferredSalary: user.preferredSalary || INITIAL_USER_PROFILE.preferredSalary,
    preferences: user.preferences || {
      workTypes: ['Bán thời gian (Part-time)', 'Làm việc từ xa (Remote)', 'Linh hoạt'],
      desiredPositions: ['Trợ giảng tiếng Hàn', 'Biên dịch viên tiếng Hàn'],
      expectedSalary: { min: 6, max: 12, currency: 'VND' },
    },
  }));

  // Candidate preference local edit state
  const [prefWorkTypes, setPrefWorkTypes] = useState<CandidatePreferences['workTypes']>(
    formData.preferences?.workTypes || ['Bán thời gian (Part-time)', 'Làm việc từ xa (Remote)']
  );
  const [prefPositions, setPrefPositions] = useState<string[]>(
    formData.preferences?.desiredPositions || ['Trợ giảng tiếng Hàn']
  );
  const [prefSalaryMin, setPrefSalaryMin] = useState<number>(
    formData.preferences?.expectedSalary?.min || 6
  );
  const [prefSalaryMax, setPrefSalaryMax] = useState<number>(
    formData.preferences?.expectedSalary?.max || 12
  );
  const [prefCurrency, setPrefCurrency] = useState<Currency>(
    formData.preferences?.expectedSalary?.currency || 'VND'
  );
  const [customPosition, setCustomPosition] = useState('');
  const [prefError, setPrefError] = useState<string | null>(null);

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [logoutNotice, setLogoutNotice] = useState(false);

  useEffect(() => {
    setFormData({
      ...INITIAL_USER_PROFILE,
      ...user,
      preferences: user.preferences || {
        workTypes: ['Bán thời gian (Part-time)', 'Làm việc từ xa (Remote)', 'Linh hoạt'],
        desiredPositions: ['Trợ giảng tiếng Hàn', 'Biên dịch viên tiếng Hàn'],
        expectedSalary: { min: 6, max: 12, currency: 'VND' },
      },
    });
    if (user.preferences) {
      setPrefWorkTypes(user.preferences.workTypes);
      setPrefPositions(user.preferences.desiredPositions);
      setPrefSalaryMin(user.preferences.expectedSalary.min);
      setPrefSalaryMax(user.preferences.expectedSalary.max);
      setPrefCurrency(user.preferences.expectedSalary.currency);
    }
  }, [user]);

  // Handle adding position (max 3)
  const handleAddPosition = (role: string) => {
    const trimmed = role.trim();
    if (!trimmed) return;
    if (prefPositions.includes(trimmed)) return;
    if (prefPositions.length >= 3) {
      setPrefError(t.positionsLimitReached);
      setTimeout(() => setPrefError(null), 3000);
      return;
    }
    setPrefPositions([...prefPositions, trimmed]);
    setCustomPosition('');
    setPrefError(null);
  };

  const handleRemovePosition = (role: string) => {
    setPrefPositions(prefPositions.filter((p) => p !== role));
  };

  const toggleWorkType = (wt: 'Toàn thời gian' | 'Bán thời gian (Part-time)' | 'Làm việc từ xa (Remote)' | 'Linh hoạt') => {
    setPrefWorkTypes((prev) =>
      prev.includes(wt) ? prev.filter((w) => w !== wt) : [...prev, wt]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProfile: UserProfile = {
      ...formData,
      preferences: {
        workTypes: prefWorkTypes,
        desiredPositions: prefPositions,
        expectedSalary: {
          min: prefSalaryMin,
          max: prefSalaryMax,
          currency: prefCurrency,
        },
      },
    };
    onUpdateUser(updatedProfile);
    try {
      localStorage.setItem('job_user_profile', JSON.stringify(updatedProfile));
    } catch (err) {
      console.error(err);
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    } else {
      onUpdateUser(INITIAL_USER_PROFILE);
      try {
        localStorage.removeItem('job_user_profile');
      } catch (e) {
        console.error(e);
      }
    }
    setFormData(INITIAL_USER_PROFILE);
    setLogoutNotice(true);
    setTimeout(() => setLogoutNotice(false), 3000);
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      {/* Profile Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-[#EDE6D6] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {formData.avatar ? (
            <img
              src={formData.avatar}
              alt={formData.fullName || 'Avatar'}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#2D4738]"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[#EDE6D6] border-2 border-dashed border-[#9EBFB5] flex flex-col items-center justify-center text-neutral-400">
              <User className="w-7 h-7 text-[#4A7D5C]" />
              <span className="text-[9px] font-bold text-neutral-500 mt-0.5">Ảnh trống</span>
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#1B2C24]">
                {formData.fullName || 'Hồ sơ chưa có tên'}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EDE6D6] text-[#2D4738]">
                {formData.role === 'recruiter' ? 'Nhà tuyển dụng' : 'Ứng viên'}
              </span>
            </div>
            <p className="text-xs font-semibold text-[#385A45]">
              {formData.studentStatus || 'Chưa cập nhật học vấn'} {formData.major ? `· ${formData.major}` : ''}
            </p>
            <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#4A7D5C]" />
              {formData.district || 'Quận 1'}, {formData.city || 'TP.HCM'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleLogoutClick}
            className="px-4 py-2 rounded-xl border border-[#DED3BD] hover:bg-[#F5F1E8] text-[#1B2C24] text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{lang === 'ko' ? '로그아웃' : lang === 'en' ? 'Log out' : 'Đăng xuất'}</span>
          </button>
          <button
            type="button"
            onClick={onOpenAuth}
            className="px-4 py-2 rounded-xl bg-[#2D4738] hover:bg-[#385A45] text-white text-xs font-semibold transition-colors"
          >
            {lang === 'ko' ? '계정 전환' : lang === 'en' ? 'Switch Account' : 'Đổi tài khoản'}
          </button>
        </div>
      </div>

      {logoutNotice && (
        <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Đã đăng xuất! Hồ sơ đã được đưa về trạng thái trống mặc định.</span>
        </div>
      )}

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{t.preferencesSaved}</span>
        </div>
      )}

      {/* Profile Edit Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-[#EDE6D6] shadow-sm space-y-7 text-xs">
        {/* Section 1: Thông tin cá nhân & Học vấn */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D4738] border-b border-[#F5F1E8] pb-2 mb-4">
            1. {lang === 'ko' ? '개인 정보 및 학력' : lang === 'en' ? 'Personal Information & Education' : 'Thông tin cá nhân & Học vấn'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-neutral-700 block mb-1">
                {lang === 'ko' ? '성명:' : lang === 'en' ? 'Full Name:' : 'Họ và tên:'}
              </label>
              <input
                type="text"
                placeholder="Nhập họ và tên..."
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
              />
            </div>
            <div>
              <label className="font-semibold text-neutral-700 block mb-1">Email:</label>
              <input
                type="email"
                placeholder="Nhập địa chỉ email..."
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
              />
            </div>
            <div>
              <label className="font-semibold text-neutral-700 block mb-1">
                {lang === 'ko' ? '전화번호:' : lang === 'en' ? 'Phone:' : 'Số điện thoại:'}
              </label>
              <input
                type="tel"
                placeholder="Nhập số điện thoại..."
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
              />
            </div>
            <div>
              <label className="font-semibold text-neutral-700 block mb-1">
                Ảnh đại diện (để trống hoặc dán link ảnh):
              </label>
              <input
                type="text"
                placeholder="Để trống hoặc dán link URL ảnh đại diện..."
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
              />
            </div>
            <div>
              <label className="font-semibold text-neutral-700 block mb-1">
                {lang === 'ko' ? '학업 상태:' : lang === 'en' ? 'Status:' : 'Tình trạng học vấn:'}
              </label>
              <input
                type="text"
                placeholder="Ví dụ: Sinh viên năm 2 / Đã tốt nghiệp..."
                value={formData.studentStatus}
                onChange={(e) => setFormData({ ...formData, studentStatus: e.target.value })}
                className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
              />
            </div>
            <div>
              <label className="font-semibold text-neutral-700 block mb-1">
                {lang === 'ko' ? '출신/재학 대학교:' : lang === 'en' ? 'University:' : 'Trường đang học:'}
              </label>
              <input
                type="text"
                placeholder="Ví dụ: ĐH Khoa học Xã hội & Nhân văn..."
                value={formData.university}
                onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-semibold text-neutral-700 block mb-1">
                {lang === 'ko' ? '전공:' : lang === 'en' ? 'Major:' : 'Chuyên ngành chính:'}
              </label>
              <input
                type="text"
                placeholder="Ví dụ: Ngôn ngữ Hàn, Quản trị, Marketing, CNTT..."
                value={formData.major}
                onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Vị trí & Bán kính */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D4738] border-b border-[#F5F1E8] pb-2 mb-4">
            2. {lang === 'ko' ? '근무 희망 위치 및 반경' : lang === 'en' ? 'Location & Radius' : 'Vị trí & Bán kính tìm việc quanh bạn'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold text-neutral-700 block mb-1">
                {t.districtLabel}:
              </label>
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
              >
                {DISTRICTS_HCM.filter((d) => d !== 'Tất cả khu vực').map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-semibold text-neutral-700 block mb-1">
                {t.cityLabel}:
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
              />
            </div>
            <div>
              <label className="font-semibold text-neutral-700 block mb-1">
                {t.radiusLabel} ({formData.radiusKm} km):
              </label>
              <select
                value={formData.radiusKm}
                onChange={(e) => setFormData({ ...formData, radiusKm: Number(e.target.value) })}
                className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
              >
                <option value={1}>1 km (Đi bộ / Gần nhà)</option>
                <option value={3}>3 km (Xe đạp / Xe máy gần)</option>
                <option value={5}>5 km (Nội quận lân cận)</option>
                <option value={10}>10 km (Bán kính trung bình)</option>
                <option value={20}>20 km (Toàn thành phố)</option>
              </select>
            </div>
          </div>
          <div className="mt-3">
            <label className="font-semibold text-neutral-700 block mb-1">
              {lang === 'ko' ? '상세 주소:' : lang === 'en' ? 'Address:' : 'Địa chỉ chi tiết:'}
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
            />
          </div>
        </div>

        {/* Section 3: MODULE 4 CANDIDATE PREFERENCES */}
        <div className="p-4 rounded-xl bg-[#FAF8F2] border border-[#DED3BD] space-y-4">
          <div className="flex items-center justify-between border-b border-[#EDE6D6] pb-2">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#385A45]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D4738]">
                3. {t.candidatePreferencesTitle}
              </h3>
            </div>
            <span className="text-[11px] text-neutral-500 font-mono">
              Module 4 Settings
            </span>
          </div>

          {prefError && (
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-medium flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{prefError}</span>
            </div>
          )}

          {/* 3.1 Work Types */}
          <div>
            <label className="font-semibold text-neutral-700 block mb-2">
              {t.prefWorkTypes}:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'Toàn thời gian', label: t.fullTime },
                { id: 'Bán thời gian (Part-time)', label: t.partTime },
                { id: 'Làm việc từ xa (Remote)', label: t.remote },
                { id: 'Linh hoạt', label: t.hybrid },
              ].map((item) => {
                const isSelected = prefWorkTypes.includes(item.id as any);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleWorkType(item.id as any)}
                    className={`p-2 rounded-xl border text-center font-medium transition-all ${
                      isSelected
                        ? 'bg-[#2D4738] text-white border-[#2D4738] shadow-2xs'
                        : 'bg-white text-neutral-700 border-[#DED3BD] hover:bg-[#F5F1E8]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3.2 Desired Positions (Max 3) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-semibold text-neutral-700 block">
                {t.prefDesiredPositions}:
              </label>
              <span className="text-[11px] font-mono text-neutral-500 tabular-nums">
                {prefPositions.length}/3 {lang === 'ko' ? '선택됨' : lang === 'en' ? 'selected' : 'đã chọn'}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-2">
              {prefPositions.map((pos) => (
                <span
                  key={pos}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#2D4738] text-white font-semibold text-xs shadow-2xs"
                >
                  <span>{pos}</span>
                  <button
                    type="button"
                    onClick={() => handleRemovePosition(pos)}
                    className="p-0.5 rounded-full hover:bg-white/20"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Quick add roles */}
            <div className="flex flex-wrap gap-1 mb-2">
              {PREDEFINED_ROLES.map((role) => (
                <button
                  key={role}
                  type="button"
                  disabled={prefPositions.includes(role) || prefPositions.length >= 3}
                  onClick={() => handleAddPosition(role)}
                  className="px-2 py-0.5 rounded-md text-[10px] font-medium border bg-white border-[#DED3BD] hover:bg-[#F5F1E8] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  + {role}
                </button>
              ))}
            </div>

            {/* Custom input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={lang === 'ko' ? '기타 희망 직무 입력...' : lang === 'en' ? 'Enter target role...' : 'Nhập vị trí khác...'}
                value={customPosition}
                disabled={prefPositions.length >= 3}
                onChange={(e) => setCustomPosition(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddPosition(customPosition);
                  }
                }}
                className="flex-1 p-2 bg-white border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
              />
              <button
                type="button"
                disabled={!customPosition.trim() || prefPositions.length >= 3}
                onClick={() => handleAddPosition(customPosition)}
                className="px-3.5 py-2 bg-white hover:bg-[#F5F1E8] disabled:opacity-40 text-[#1B2C24] font-semibold rounded-xl border border-[#DED3BD] flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{lang === 'ko' ? '추가' : lang === 'en' ? 'Add' : 'Thêm'}</span>
              </button>
            </div>
          </div>

          {/* 3.3 Expected Salary with Currency */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-semibold text-neutral-700 block">
                {t.prefExpectedSalary}:
              </label>

              {/* Currency Selector */}
              <div className="flex items-center bg-white p-0.5 rounded-lg border border-[#DED3BD]">
                {(['VND', 'USD', 'KRW'] as Currency[]).map((curr) => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => setPrefCurrency(curr)}
                    className={`px-2 py-0.5 text-[11px] font-bold rounded-md transition-all ${
                      prefCurrency === curr
                        ? 'bg-[#2D4738] text-white shadow-2xs'
                        : 'text-neutral-600 hover:text-[#1B2C24]'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] text-neutral-500 block mb-1">
                  {t.minSalary} ({prefCurrency}):
                </span>
                <input
                  type="number"
                  min={0}
                  value={prefSalaryMin}
                  onChange={(e) => setPrefSalaryMin(Number(e.target.value))}
                  className="w-full p-2 bg-white border border-[#DED3BD] rounded-xl font-mono tabular-nums focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                />
              </div>
              <div>
                <span className="text-[11px] text-neutral-500 block mb-1">
                  {t.maxSalary} ({prefCurrency}):
                </span>
                <input
                  type="number"
                  min={prefSalaryMin}
                  value={prefSalaryMax}
                  onChange={(e) => setPrefSalaryMax(Number(e.target.value))}
                  className="w-full p-2 bg-white border border-[#DED3BD] rounded-xl font-mono tabular-nums focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Kỹ năng & Ngoại ngữ */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D4738] border-b border-[#F5F1E8] pb-2 mb-4">
            4. {lang === 'ko' ? '보유 기술 및 어학 자격증' : lang === 'en' ? 'Skills & Language Certificates' : 'Kỹ năng & Ngoại ngữ (phân cách bằng dấu phẩy)'}
          </h3>
          <div className="space-y-3">
            <div>
              <label className="font-semibold text-neutral-700 block mb-1">
                {lang === 'ko' ? '보유 기술 (Hard/Soft Skills):' : lang === 'en' ? 'Skills:' : 'Kỹ năng:'}
              </label>
              <input
                type="text"
                value={formData.skills.join(', ')}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    skills: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                  })
                }
                className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
              />
            </div>
            <div>
              <label className="font-semibold text-neutral-700 block mb-1">
                {lang === 'ko' ? '어학 능력 및 자격증 (TOPIK, IELTS, TOEIC):' : lang === 'en' ? 'Language Qualifications:' : 'Ngoại ngữ & Chứng chỉ:'}
              </label>
              <input
                type="text"
                value={formData.languages.join(', ')}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    languages: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                  })
                }
                className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
              />
            </div>
          </div>
        </div>

        {/* Section 5: Giới thiệu bản thân */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D4738] border-b border-[#F5F1E8] pb-2 mb-4">
            5. {lang === 'ko' ? '자기소개서 (Bio)' : lang === 'en' ? 'Professional Bio' : 'Giới thiệu bản thân'}
          </h3>
          <textarea
            rows={4}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#385A45]"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-2.5 rounded-xl bg-[#2D4738] hover:bg-[#385A45] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{lang === 'ko' ? '프로필 및 희망 조건 저장' : lang === 'en' ? 'Save Profile & Preferences' : 'Lưu thay đổi hồ sơ & nguyện vọng'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
