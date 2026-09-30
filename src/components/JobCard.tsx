import React from 'react';
import {
  MapPin,
  Clock,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  ArrowRight,
  MessageSquare,
  ImageIcon
} from 'lucide-react';
import { Currency, Job, Language } from '../types/job';
import { formatSalaryRange } from '../utils/currency';
import { TRANSLATIONS, getLocalizedIndustry, getLocalizedWorkType, getLocalizedPostedTime } from '../utils/i18n';

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onToggleSave: (jobId: string) => void;
  onSelectJob: (job: Job) => void;
  onStartChat?: (job: Job) => void;
  lang?: Language;
  displayCurrency?: Currency;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  isSaved,
  onToggleSave,
  onSelectJob,
  onStartChat,
  lang = 'vi',
  displayCurrency = 'VND',
}) => {
  const t = TRANSLATIONS[lang];
  const displayTitle = job.titles?.[lang] || job.title;
  const displaySalary = displayCurrency === 'VND'
    ? job.salaryRange
    : formatSalaryRange(job.salaryMin, job.salaryMax, displayCurrency, lang);

  const photoCount = job.companyPhotos?.length || 0;
  const localizedWorkType = getLocalizedWorkType(job.workType, lang);
  const localizedIndustry = getLocalizedIndustry(job.industry, lang);
  const localizedPostedTime = getLocalizedPostedTime(job.postedTime, lang);

  return (
    <div
      onClick={() => onSelectJob(job)}
      className="group relative bg-white rounded-xl border border-[#EDE6D6] hover:border-[#6F9C7F] hover:shadow-md transition-all duration-200 p-5 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top Company & Save Bar */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-11 h-11 rounded-lg object-cover border border-[#EDE6D6] shrink-0"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="min-w-0">
              <h4 className="text-xs font-semibold text-[#4A7D5C] truncate tracking-tight">
                {job.company}
              </h4>
              <h3 className="text-sm font-bold text-[#1B2C24] group-hover:text-[#385A45] transition-colors line-clamp-1 mt-0.5">
                {displayTitle}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(job.id);
            }}
            className={`p-2 rounded-lg transition-colors shrink-0 ${
              isSaved
                ? 'text-[#2D4738] bg-[#EDE6D6]'
                : 'text-neutral-400 hover:text-[#2D4738] hover:bg-[#F5F1E8]'
            }`}
            title={isSaved ? t.saved : t.saveJob}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 fill-[#2D4738]" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

        {/* Salary & Distance Row */}
        <div className="mt-3.5 flex items-baseline justify-between">
          <span className="text-sm font-bold text-[#2D4738]">
            {displaySalary}
          </span>
          <span className="text-xs font-mono tabular-nums font-semibold text-emerald-800 bg-[#E3ECE6] px-2 py-0.5 rounded">
            {job.distanceKm.toFixed(1)} km
          </span>
        </div>

        {/* Unboxed Metadata Line (Zero-Pill Rule) */}
        <div className="mt-2.5 flex items-center flex-wrap gap-x-2 gap-y-1 text-xs text-[#4A7D5C]">
          <span>{job.location.district}</span>
          <span aria-hidden="true">·</span>
          <span>{localizedWorkType}</span>
          <span aria-hidden="true">·</span>
          <span>{localizedIndustry}</span>
          {photoCount > 0 && (
            <>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 text-neutral-600">
                <ImageIcon className="w-3 h-3 text-[#385A45]" />
                {photoCount} {t.officePhotosCount}
              </span>
            </>
          )}
        </div>

        {/* Short schedule / summary info */}
        <p className="mt-2 text-xs text-neutral-600 line-clamp-2 leading-relaxed bg-[#FBF9F4] p-2.5 rounded-lg border border-[#F5F1E8]">
          <span className="font-semibold text-[#1B2C24]">
            {t.scheduleDetailsLabel}:
          </span>{' '}
          {job.descriptions?.[lang] || job.scheduleDetails}
        </p>
      </div>

      {/* Card Action Footer */}
      <div className="mt-4 pt-3 border-t border-[#F5F1E8] flex items-center justify-between text-xs">
        <span className="text-neutral-400 text-[11px]">{localizedPostedTime}</span>

        <div className="flex items-center gap-2">
          {onStartChat && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onStartChat(job);
              }}
              className="p-1.5 rounded-lg text-[#385A45] hover:bg-[#EDE6D6] transition-colors"
              title={t.chatWithRecruiter}
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          )}
          <span className="font-bold text-[#385A45] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
            <span>{t.viewDetails}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
