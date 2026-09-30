import React, { useState } from 'react';
import {
  X,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  CheckCircle,
  Bookmark,
  BookmarkCheck,
  Send,
  MessageSquare,
  Building,
  UserCheck,
  FileText,
  AlertCircle,
  Globe2
} from 'lucide-react';
import { Job, UserProfile, Application, Language, Currency } from '../types/job';
import { CompanyEnvironmentShowcase } from './CompanyEnvironmentShowcase';
import { JobRequirementsDisplay } from './JobRequirementsDisplay';
import { TRANSLATIONS } from '../utils/i18n';
import { formatSalaryRange } from '../utils/currency';

interface JobDetailModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (jobId: string) => void;
  hasApplied: boolean;
  onApplyJob: (job: Job, cvName: string, coverNote: string) => void;
  onStartChat: (job: Job) => void;
  user: UserProfile;
  lang?: Language;
  defaultCurrency?: Currency;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
  hasApplied,
  onApplyJob,
  onStartChat,
  user,
  lang = 'vi',
  defaultCurrency = 'VND',
}) => {
  const t = TRANSLATIONS[lang];
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(defaultCurrency);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [selectedCv, setSelectedCv] = useState(`CV_${user.fullName.replace(/\s+/g, '')}_2026.pdf`);
  const [coverNote, setCoverNote] = useState(
    lang === 'ko'
      ? `안녕하세요, ${user.fullName}입니다. 공고를 보고 적극 지원하게 되었습니다.`
      : lang === 'en'
      ? `Dear Hiring Team, I am enthusiastic about this opportunity and look forward to contributing.`
      : 'Em là sinh viên năm 2 rất quan tâm đến vị trí này, có khả năng làm việc ca tối và tinh thần học hỏi cao ạ.'
  );
  const [applySuccess, setApplySuccess] = useState(false);

  if (!isOpen || !job) return null;

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyJob(job, selectedCv, coverNote);
    setApplySuccess(true);
    setTimeout(() => {
      setShowApplyForm(false);
      setApplySuccess(false);
    }, 1800);
  };

  const displayTitle = job.titles?.[lang] || job.title;
  const displayDescription = job.descriptions?.[lang] || job.description;
  const displaySalary = selectedCurrency === 'VND'
    ? job.salaryRange
    : formatSalaryRange(job.salaryMin, job.salaryMax, selectedCurrency, lang);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF8F2] w-full max-w-4xl rounded-2xl shadow-2xl border border-[#DED3BD] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="px-6 py-4 bg-white border-b border-[#EDE6D6] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-12 h-12 rounded-xl object-cover border border-[#EDE6D6]"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div>
              <h2 className="text-base font-bold text-[#1B2C24] leading-tight">{displayTitle}</h2>
              <p className="text-xs text-[#4A7D5C] font-semibold">{job.company}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Currency Selector */}
            <div className="hidden sm:flex items-center bg-[#F5F1E8] p-1 rounded-lg border border-[#DED3BD] mr-2">
              {(['VND', 'USD', 'KRW'] as Currency[]).map((curr) => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => setSelectedCurrency(curr)}
                  className={`px-2 py-0.5 text-[11px] font-bold rounded-md transition-all ${
                    selectedCurrency === curr
                      ? 'bg-[#2D4738] text-white shadow-xs'
                      : 'text-neutral-600 hover:text-[#1B2C24]'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>

            <button
              onClick={() => onToggleSave(job.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isSaved
                  ? 'bg-[#EDE6D6] border-[#DED3BD] text-[#2D4738]'
                  : 'bg-white border-[#EDE6D6] text-neutral-400 hover:text-[#2D4738]'
              }`}
              title={isSaved ? t.saved : t.saveJob}
            >
              {isSaved ? <BookmarkCheck className="w-5 h-5 fill-[#2D4738]" /> : <Bookmark className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-neutral-400 hover:text-[#1B2C24] hover:bg-[#F5F1E8] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-7 flex-1 text-xs">
          {/* Key Facts Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-[#EDE6D6]">
            <div>
              <span className="text-[11px] text-neutral-500 block">
                {lang === 'ko' ? '급여:' : lang === 'en' ? 'Salary:' : 'Mức lương:'}
              </span>
              <span className="font-bold text-[#2D4738] text-sm">{displaySalary}</span>
            </div>
            <div>
              <span className="text-[11px] text-neutral-500 block">
                {lang === 'ko' ? '거리:' : lang === 'en' ? 'Distance:' : 'Khoảng cách:'}
              </span>
              <span className="font-bold text-emerald-800 text-sm font-mono tabular-nums">
                {job.distanceKm.toFixed(1)} km
              </span>
            </div>
            <div>
              <span className="text-[11px] text-neutral-500 block">
                {lang === 'ko' ? '근무 형태:' : lang === 'en' ? 'Arrangement:' : 'Hình thức làm việc:'}
              </span>
              <span className="font-semibold text-[#1B2C24]">{job.workType}</span>
            </div>
            <div>
              <span className="text-[11px] text-neutral-500 block">
                {lang === 'ko' ? '경력 요건:' : lang === 'en' ? 'Experience:' : 'Kinh nghiệm:'}
              </span>
              <span className="font-semibold text-[#1B2C24]">{job.experienceLevel}</span>
            </div>
          </div>

          {/* Location details */}
          <div className="p-3.5 rounded-xl bg-[#F5F1E8] border border-[#DED3BD] flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#385A45] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#1B2C24] block">
                {lang === 'ko' ? '근무지 주소:' : lang === 'en' ? 'Workplace Address:' : 'Địa điểm làm việc:'}
              </span>
              <span className="text-neutral-700 leading-relaxed">{job.location.fullAddress}</span>
              <span className="block text-[11px] text-[#4A7D5C] mt-0.5 font-medium">
                {lang === 'ko'
                  ? `(현재 사용자 등록 위치: ${user.district}, ${user.city}에서 출퇴근 편리)`
                  : lang === 'en'
                  ? `(Convenient commute from your location: ${user.district}, ${user.city})`
                  : `(Rất thuận tiện di chuyển từ khu vực ${user.district}, ${user.city} của bạn)`}
              </span>
            </div>
          </div>

          {/* Working Schedule details */}
          <div className="p-3.5 rounded-xl bg-white border border-[#EDE6D6] flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-[#385A45] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#1B2C24] block">
                {lang === 'ko' ? '근무 시간 및 교대 일정:' : lang === 'en' ? 'Working Schedule & Shifts:' : 'Chi tiết thời gian & ca làm việc:'}
              </span>
              <span className="text-neutral-700 leading-relaxed">{job.scheduleDetails}</span>
            </div>
          </div>

          {/* MODULE 2: Company Photos & Environment */}
          {job.companyPhotos && job.companyPhotos.length > 0 && (
            <div className="p-4 bg-white rounded-xl border border-[#EDE6D6]">
              <CompanyEnvironmentShowcase
                photos={job.companyPhotos}
                companyName={job.company}
                lang={lang}
              />
            </div>
          )}

          {/* Job Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D4738]">
              {lang === 'ko' ? '직무 상세 내용' : lang === 'en' ? 'Job Description' : 'Mô tả công việc'}
            </h4>
            <p className="text-neutral-700 leading-relaxed bg-white p-4 rounded-xl border border-[#EDE6D6]">
              {displayDescription}
            </p>
          </div>

          {/* MODULE 3: Job Requirements & Qualifications */}
          <div className="p-4 bg-white rounded-xl border border-[#EDE6D6]">
            <JobRequirementsDisplay
              structuredRequirements={job.structuredRequirements}
              generalRequirements={job.requirements}
              user={user}
              lang={lang}
            />
          </div>

          {/* Benefits */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D4738]">
              {lang === 'ko' ? '복리후생 및 혜택' : lang === 'en' ? 'Benefits & Perks' : 'Quyền lợi & Đãi ngộ'}
            </h4>
            <div className="bg-white p-4 rounded-xl border border-[#EDE6D6] space-y-2">
              {job.benefits.map((ben, i) => (
                <div key={i} className="flex items-start gap-2 text-neutral-700 leading-relaxed">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{ben}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recruiter Information Card */}
          <div className="p-4 rounded-xl bg-[#E3ECE6]/50 border border-[#9EBFB5] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={job.recruiter.avatar}
                  alt={job.recruiter.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#4F755D]"
                />
                {job.recruiter.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </div>
              <div>
                <h5 className="font-bold text-[#1B2C24]">{job.recruiter.name}</h5>
                <p className="text-[11px] text-[#4A7D5C]">{job.recruiter.position}</p>
                <p className="text-[10px] text-neutral-500">
                  {lang === 'ko' ? '보통 2시간 이내 빠른 피드백' : lang === 'en' ? 'Typically responds within 2 hours' : 'Phản hồi hồ sơ thường trong 2 giờ'}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onStartChat(job);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#4A7D5C] text-[#2D4738] hover:bg-[#2D4738] hover:text-white font-semibold transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t.chatWithRecruiter}</span>
            </button>
          </div>

          {/* Application Form Drawer (when clicking Nộp đơn) */}
          {showApplyForm && (
            <div className="bg-white p-5 rounded-2xl border-2 border-[#385A45] shadow-lg animate-in slide-in-from-bottom duration-300">
              <h4 className="text-sm font-bold text-[#1B2C24] mb-3 flex items-center gap-2">
                <Send className="w-4 h-4 text-[#385A45]" />
                <span>{lang === 'ko' ? '온라인 입사 지원서 제출' : lang === 'en' ? 'Submit Application' : 'Xác nhận nộp hồ sơ ứng tuyển'}</span>
              </h4>

              {applySuccess ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>
                    {lang === 'ko'
                      ? '지원이 성공적으로 접수되었습니다!'
                      : lang === 'en'
                      ? 'Application submitted successfully!'
                      : 'Hồ sơ của bạn đã được gửi thành công đến nhà tuyển dụng!'}
                  </span>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-4">
                  <div>
                    <label className="font-semibold text-neutral-700 block mb-1">
                      {lang === 'ko' ? '첨부 이력서 (CV):' : lang === 'en' ? 'Attached CV:' : 'Chọn CV nộp:'}
                    </label>
                    <select
                      value={selectedCv}
                      onChange={(e) => setSelectedCv(e.target.value)}
                      className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                    >
                      <option value={`CV_${user.fullName.replace(/\s+/g, '')}_2026.pdf`}>
                        CV_{user.fullName.replace(/\s+/g, '')}_2026.pdf ({lang === 'ko' ? '기본 ATS 양식' : lang === 'en' ? 'Standard ATS' : 'Mẫu ATS chuẩn'})
                      </option>
                      <option value="CV_TiengHan_ChuanChuyenNganh.pdf">
                        CV_Korean_Language_Pro.pdf ({lang === 'ko' ? '한국어 특화 이력서' : lang === 'en' ? 'Korean Specialized' : 'Bản chuyên môn tiếng Hàn'})
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-neutral-700 block mb-1">
                      {lang === 'ko' ? '인사담당자에게 남길 메시지:' : lang === 'en' ? 'Cover Note for HR:' : 'Lời nhắn gửi đến nhà tuyển dụng (Cover note):'}
                    </label>
                    <textarea
                      rows={3}
                      value={coverNote}
                      onChange={(e) => setCoverNote(e.target.value)}
                      className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                      placeholder={lang === 'ko' ? '간단한 인사말과 강점을 작성하세요...' : 'Nhập lời nhắn ngắn gọn...'}
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowApplyForm(false)}
                      className="px-4 py-2 rounded-xl text-neutral-500 hover:text-neutral-700"
                    >
                      {lang === 'ko' ? '취소' : lang === 'en' ? 'Cancel' : 'Hủy'}
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#2D4738] hover:bg-[#385A45] text-white font-bold transition-all shadow-md flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{lang === 'ko' ? '지원서 전송' : lang === 'en' ? 'Confirm Apply' : 'Gửi hồ sơ ngay'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="px-6 py-4 bg-white border-t border-[#EDE6D6] flex items-center justify-between">
          <div className="text-xs text-neutral-500 hidden sm:block">
            {hasApplied ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                {lang === 'ko' ? '이미 지원 완료된 공고입니다' : lang === 'en' ? 'You have applied for this job' : 'Bạn đã nộp hồ sơ cho công việc này'}
              </span>
            ) : (
              <span>{lang === 'ko' ? '빠른 검토 후 인터뷰 일정이 안내됩니다' : lang === 'en' ? 'HR reviews usually within 24-48 hours' : 'Hồ sơ sẽ được chuyển trực tiếp đến HR'}</span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onStartChat(job);
              }}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-[#385A45] text-[#2D4738] hover:bg-[#F5F1E8] font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.chatWithRecruiter}</span>
            </button>

            {hasApplied ? (
              <button
                disabled
                className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs cursor-default flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{t.applied}</span>
              </button>
            ) : (
              <button
                onClick={() => setShowApplyForm(true)}
                className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-[#2D4738] hover:bg-[#385A45] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{t.applyNow}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
