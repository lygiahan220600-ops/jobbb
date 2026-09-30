import React from 'react';
import { BookmarkCheck, Trash2, ArrowRight, Briefcase } from 'lucide-react';
import { Currency, Job, Language } from '../../types/job';
import { JobCard } from '../JobCard';
import { NavScreen } from '../Sidebar';
import { TRANSLATIONS } from '../../utils/i18n';

interface SavedJobsViewProps {
  jobs: Job[];
  savedJobIds: Set<string>;
  onToggleSave: (jobId: string) => void;
  onSelectJob: (job: Job) => void;
  onStartChat: (job: Job) => void;
  onNavigate: (screen: NavScreen) => void;
  lang?: Language;
  currency?: Currency;
}

export const SavedJobsView: React.FC<SavedJobsViewProps> = ({
  jobs,
  savedJobIds,
  onToggleSave,
  onSelectJob,
  onStartChat,
  onNavigate,
  lang = 'vi',
  currency = 'VND',
}) => {
  const t = TRANSLATIONS[lang];
  const savedJobs = jobs.filter((j) => savedJobIds.has(j.id));

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-[#EDE6D6] shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-[#1B2C24] flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-[#385A45]" />
            <span>{t.savedTitle} ({savedJobs.length})</span>
          </h2>
          <p className="text-xs text-[#4A7D5C] mt-0.5">
            {t.savedSubtitle}
          </p>
        </div>

        {savedJobs.length > 0 && (
          <button
            onClick={() => onNavigate('search')}
            className="text-xs font-semibold text-[#2D4738] hover:underline"
          >
            {t.searchJobs}
          </button>
        )}
      </div>

      {savedJobs.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-[#EDE6D6] space-y-3">
          <BookmarkCheck className="w-10 h-10 mx-auto text-neutral-300" />
          <h3 className="text-sm font-bold text-[#1B2C24]">{t.emptySavedTitle}</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
            {t.emptySavedDesc}
          </p>
          <button
            onClick={() => onNavigate('search')}
            className="px-5 py-2 rounded-xl bg-[#2D4738] text-white text-xs font-bold shadow-sm"
          >
            {t.exploreJobsBtn}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={true}
              onToggleSave={onToggleSave}
              onSelectJob={onSelectJob}
              onStartChat={onStartChat}
              lang={lang}
              displayCurrency={currency}
            />
          ))}
        </div>
      )}
    </div>
  );
};
