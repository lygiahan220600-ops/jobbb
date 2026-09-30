import React, { useState } from 'react';
import {
  Send,
  Clock,
  CheckCircle2,
  Calendar,
  MapPin,
  MessageSquare,
  FileText,
  AlertCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Application, ApplicationStatus, Job, Language } from '../../types/job';
import { TRANSLATIONS } from '../../utils/i18n';

interface ApplicationsViewProps {
  applications: Application[];
  jobs: Job[];
  onSelectJob: (job: Job) => void;
  onStartChat: (job: Job) => void;
  lang?: Language;
}

export const ApplicationsView: React.FC<ApplicationsViewProps> = ({
  applications,
  jobs,
  onSelectJob,
  onStartChat,
  lang = 'vi',
}) => {
  const t = TRANSLATIONS[lang];
  const [statusFilter, setStatusFilter] = useState<'all' | ApplicationStatus>('all');

  const stageLabels = {
    vi: {
      submitted: 'Đã ứng tuyển',
      reviewing: 'Đang xem xét',
      interview: 'Phỏng vấn',
      accepted: 'Kết quả',
    },
    en: {
      submitted: 'Submitted',
      reviewing: 'Under Review',
      interview: 'Interview',
      accepted: 'Outcome',
    },
    ko: {
      submitted: '서류 접수',
      reviewing: '서류 검토',
      interview: '면접 전형',
      accepted: '최종 결과',
    },
  }[lang];

  // Stages configuration
  const stages: { key: ApplicationStatus; label: string; count: number }[] = [
    {
      key: 'submitted',
      label: stageLabels.submitted,
      count: applications.filter((a) => a.status === 'submitted').length,
    },
    {
      key: 'reviewing',
      label: stageLabels.reviewing,
      count: applications.filter((a) => a.status === 'reviewing').length,
    },
    {
      key: 'interview',
      label: stageLabels.interview,
      count: applications.filter((a) => a.status === 'interview').length,
    },
    {
      key: 'accepted',
      label: stageLabels.accepted,
      count: applications.filter((a) => a.status === 'accepted' || a.status === 'rejected').length,
    },
  ];

  const filtered = applications.filter((app) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'accepted') return app.status === 'accepted' || app.status === 'rejected';
    return app.status === statusFilter;
  });

  const getStageIndex = (status: ApplicationStatus) => {
    switch (status) {
      case 'submitted':
        return 0;
      case 'reviewing':
        return 1;
      case 'interview':
        return 2;
      case 'accepted':
      case 'rejected':
        return 3;
      default:
        return 0;
    }
  };

  const getLocalizedStatusText = (status: ApplicationStatus) => {
    switch (status) {
      case 'submitted':
        return stageLabels.submitted;
      case 'reviewing':
        return stageLabels.reviewing;
      case 'interview':
        return lang === 'ko' ? '면접 제안' : lang === 'en' ? 'Invited to Interview' : 'Mời phỏng vấn';
      case 'accepted':
        return lang === 'ko' ? '최종 합격' : lang === 'en' ? 'Offer Extended' : 'Trúng tuyển';
      case 'rejected':
        return lang === 'ko' ? '불합격' : lang === 'en' ? 'Declined' : 'Chưa phù hợp';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 4-Stage Visual Pipeline Overview Header */}
      <div className="bg-white p-5 rounded-2xl border border-[#EDE6D6] shadow-sm space-y-4">
        <div>
          <h2 className="text-sm font-bold text-[#1B2C24]">{t.appTitle}</h2>
          <p className="text-xs text-[#4A7D5C] mt-0.5">
            {t.appSubtitle}
          </p>
        </div>

        {/* 4 Steps Stepper Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-2">
          {stages.map((stage, idx) => {
            const isActiveFilter = statusFilter === stage.key;
            return (
              <button
                key={stage.key}
                onClick={() => setStatusFilter(isActiveFilter ? 'all' : stage.key)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isActiveFilter
                    ? 'bg-[#2D4738] text-white border-[#2D4738] shadow-sm'
                    : 'bg-[#FBF9F4] text-[#1B2C24] border-[#EDE6D6] hover:bg-[#F5F1E8]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    isActiveFilter ? 'text-emerald-300' : 'text-[#4A7D5C]'
                  }`}>
                    {lang === 'ko' ? `단계 ${idx + 1}` : lang === 'en' ? `Step ${idx + 1}` : `Bước ${idx + 1}`}
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full font-mono tabular-nums ${
                    isActiveFilter ? 'bg-white/20 text-white' : 'bg-[#EDE6D6] text-[#2D4738]'
                  }`}>
                    {stage.count}
                  </span>
                </div>
                <div className="text-xs font-bold mt-1.5">{stage.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-[#EDE6D6] space-y-2">
            <Send className="w-8 h-8 mx-auto text-neutral-400" />
            <h3 className="text-sm font-bold text-[#1B2C24]">{t.emptyAppsTitle}</h3>
            <p className="text-xs text-neutral-500">
              {t.emptyAppsDesc}
            </p>
            <button
              onClick={() => setStatusFilter('all')}
              className="mt-2 px-4 py-1.5 rounded-lg bg-[#2D4738] text-white text-xs font-semibold"
            >
              {lang === 'ko' ? `전체 지원 내역 보기 (${applications.length})` : lang === 'en' ? `View all applications (${applications.length})` : `Xem tất cả hồ sơ (${applications.length})`}
            </button>
          </div>
        ) : (
          filtered.map((app) => {
            const job = jobs.find((j) => j.id === app.jobId);
            const currentStep = getStageIndex(app.status);
            const displayJobTitle = (job?.titles && job.titles[lang]) || app.jobTitle;

            return (
              <div
                key={app.id}
                className="bg-white rounded-2xl border border-[#EDE6D6] p-5 shadow-sm space-y-4"
              >
                {/* Top Company & Status Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F5F1E8]">
                  <div className="flex items-center gap-3">
                    <img
                      src={app.companyLogo}
                      alt={app.companyName}
                      className="w-12 h-12 rounded-xl object-cover border border-[#EDE6D6]"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div>
                      <h3 className="text-sm font-bold text-[#1B2C24] leading-snug">{displayJobTitle}</h3>
                      <p className="text-xs font-semibold text-[#4A7D5C]">{app.companyName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="text-[11px] text-neutral-400 font-mono">
                      {t.appliedDateLabel} {app.appliedDate}
                    </span>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        app.status === 'accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.status === 'interview'
                          ? 'bg-amber-100 text-amber-800'
                          : app.status === 'reviewing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-[#EDE6D6] text-[#2D4738]'
                      }`}
                    >
                      {getLocalizedStatusText(app.status)}
                    </span>
                  </div>
                </div>

                {/* 4-Step Progress Indicator */}
                <div className="py-2">
                  <div className="grid grid-cols-4 gap-2 relative">
                    {[
                      stageLabels.submitted,
                      stageLabels.reviewing,
                      stageLabels.interview,
                      stageLabels.accepted,
                    ].map((stepLabel, sIdx) => {
                      const isCompleted = sIdx < currentStep;
                      const isCurrent = sIdx === currentStep;
                      return (
                        <div key={sIdx} className="space-y-1.5 text-center">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              isCompleted || isCurrent
                                ? 'bg-emerald-600'
                                : 'bg-[#EDE6D6]'
                            }`}
                          />
                          <span
                            className={`text-[11px] block font-medium ${
                              isCurrent
                                ? 'text-emerald-800 font-bold'
                                : isCompleted
                                ? 'text-[#2D4738]'
                                : 'text-neutral-400'
                            }`}
                          >
                            {stepLabel}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Conditional Alert / Details Box */}
                {app.interviewDate && (
                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-2">
                    <div className="flex items-center gap-2 text-amber-900 font-bold">
                      <Calendar className="w-4 h-4 text-amber-700" />
                      <span>{t.interviewDetails} {app.interviewDate}</span>
                    </div>
                    {app.interviewLocation && (
                      <p className="text-amber-800 flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                        <span>{app.interviewLocation}</span>
                      </p>
                    )}
                  </div>
                )}

                {app.hrNotes && (
                  <div className="p-3.5 rounded-xl bg-[#FBF9F4] border border-[#F5F1E8] text-xs text-neutral-700 leading-relaxed">
                    <span className="font-bold text-[#1B2C24] block mb-1">{t.hrNotesLabel}</span>
                    {app.hrNotes}
                  </div>
                )}

                {/* Bottom Row Actions */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-neutral-500 font-mono">
                    <FileText className="w-3.5 h-3.5 text-[#385A45]" />
                    <span>{t.cvAttachedLabel} {app.cvAttachedName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {job && (
                      <button
                        onClick={() => onSelectJob(job)}
                        className="px-3 py-1.5 rounded-lg border border-[#DED3BD] hover:bg-[#F5F1E8] text-[#1B2C24] font-medium"
                      >
                        {t.viewDetails}
                      </button>
                    )}

                    {job && (
                      <button
                        onClick={() => onStartChat(job)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2D4738] hover:bg-[#385A45] text-white font-semibold shadow-sm"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{t.chatWithRecruiter}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
