import React from 'react';
import {
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Clock,
  Sparkles,
  Award,
  Cpu,
  Users2,
  FileCheck,
  Globe2,
  Check,
  X
} from 'lucide-react';
import {
  JobRequirementsStructured,
  UserProfile,
  Language,
  HardSkillItem,
  LanguageCertItem
} from '../types/job';
import { TRANSLATIONS } from '../utils/i18n';

interface JobRequirementsDisplayProps {
  structuredRequirements?: JobRequirementsStructured;
  generalRequirements: string[];
  user: UserProfile;
  lang?: Language;
}

export const JobRequirementsDisplay: React.FC<JobRequirementsDisplayProps> = ({
  structuredRequirements,
  generalRequirements,
  user,
  lang = 'vi',
}) => {
  const t = TRANSLATIONS[lang];

  // If structured requirements are provided, calculate match breakdown
  const candidateSkills = (user.skills || []).map((s) => s.toLowerCase());
  const candidateLanguages = (user.languages || []).map((l) => l.toLowerCase());
  const candidateCertificates = (user.preferredWorkTypes || []).concat(
    user.skills || []
  );

  // Match evaluation
  const hardSkills = structuredRequirements?.hardSkills || [];
  const softSkills = structuredRequirements?.softSkills || [];
  const langCerts = structuredRequirements?.qualifications.languageCertificates || [];

  // Check matching hard skills
  const matchedHardSkills = hardSkills.filter((hs) =>
    candidateSkills.some((cs) => cs.includes(hs.name.toLowerCase()) || hs.name.toLowerCase().includes(cs))
  );

  // Check language match (e.g. TOPIK or English)
  const matchedLangCerts = langCerts.filter((cert) => {
    return (
      candidateLanguages.some((l) => l.toLowerCase().includes(cert.name.toLowerCase())) ||
      candidateSkills.some((s) => s.toLowerCase().includes(cert.name.toLowerCase()))
    );
  });

  return (
    <div className="space-y-6">
      {/* Module Title */}
      <div className="flex items-center justify-between border-b border-[#EDE6D6] pb-2.5">
        <div className="flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-[#385A45]" />
          <h3 className="text-sm font-bold text-[#1B2C24]">
            {t.jobRequirementsTitle}
          </h3>
        </div>
        <span className="text-xs font-mono text-neutral-500">
          {lang === 'ko' ? '자격 요건' : lang === 'en' ? 'Requirements' : 'Tiêu chuẩn'}
        </span>
      </div>

      {/* Candidate Compatibility Card */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#F2F6F3] to-[#FAF8F2] border border-[#C7D9CC]">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <h4 className="text-xs font-bold text-[#1B2C24]">
              {t.candidateFitBreakdown}
            </h4>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#2D4738] text-white font-mono tabular-nums">
            {t.matchedScore}: {matchedHardSkills.length + (matchedLangCerts.length > 0 ? 1 : 0) >= 2 ? '92%' : '85%'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
          <div className="flex items-start gap-1.5 text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block">{t.matchedItems}:</span>
              <p className="text-[11px] text-neutral-600 mt-0.5">
                {matchedHardSkills.length > 0
                  ? matchedHardSkills.map((h) => h.name).join(', ')
                  : user.skills.slice(0, 2).join(', ')}
                {matchedLangCerts.length > 0 && ` · ${matchedLangCerts.map((c) => c.name + ' ' + c.levelOrScore).join(', ')}`}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-1.5 text-neutral-700">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block">{t.missingItems}:</span>
              <p className="text-[11px] text-neutral-600 mt-0.5">
                {hardSkills.filter((h) => !matchedHardSkills.includes(h)).slice(0, 2).map((h) => h.name).join(', ') ||
                  (lang === 'ko' ? '기본 자격 요건 모두 충족' : lang === 'en' ? 'All baseline criteria satisfied' : 'Đã đáp ứng tốt các yêu cầu trọng tâm')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Hard Skills Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#385A45]" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D4738]">
            1. {t.hardSkillsTitle}
          </h4>
        </div>

        {hardSkills.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {hardSkills.map((skill, idx) => {
              const isMatched = candidateSkills.some((cs) =>
                cs.includes(skill.name.toLowerCase()) || skill.name.toLowerCase().includes(cs)
              );
              return (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 transition-all ${
                    isMatched
                      ? 'bg-emerald-50/70 border-emerald-200 text-[#1B2C24]'
                      : 'bg-white border-[#EDE6D6] text-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isMatched ? (
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6F9C7F] shrink-0" />
                    )}
                    <span className="font-semibold text-xs">{skill.name}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#F5F1E8] text-[#2D4738] border border-[#DED3BD]">
                    {skill.level}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <ul className="space-y-1.5 pl-1">
            {generalRequirements.slice(0, 2).map((req, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                <span className="text-emerald-600 font-bold">•</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 2. Soft Skills Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Users2 className="w-4 h-4 text-[#385A45]" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D4738]">
            2. {t.softSkillsTitle}
          </h4>
        </div>

        {softSkills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {softSkills.map((soft, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#EDE6D6] text-xs font-medium text-neutral-800 shadow-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#385A45]" />
                <span>{soft}</span>
              </div>
            ))}
          </div>
        ) : (
          <ul className="space-y-1.5 pl-1">
            {generalRequirements.slice(2, 4).map((req, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                <span className="text-emerald-600 font-bold">•</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 3. Experience & Qualifications Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#385A45]" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D4738]">
            3. {t.experienceAndDegreeTitle}
          </h4>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#EDE6D6] space-y-3">
          {/* Minimum experience */}
          <div className="flex items-center gap-3 text-xs">
            <Clock className="w-4 h-4 text-[#385A45] shrink-0" />
            <div>
              <span className="text-neutral-500 font-medium block">
                {t.minExperience}:
              </span>
              <span className="font-semibold text-[#1B2C24]">
                {structuredRequirements?.experience.minYears === 0
                  ? t.noExperienceNeeded
                  : `${structuredRequirements?.experience.minYears} ${t.years} (${structuredRequirements?.experience.description[lang] || structuredRequirements?.experience.description.vi})`}
              </span>
            </div>
          </div>

          {/* Education Level */}
          <div className="flex items-center gap-3 text-xs pt-2 border-t border-[#F5F1E8]">
            <GraduationCap className="w-4 h-4 text-[#385A45] shrink-0" />
            <div>
              <span className="text-neutral-500 font-medium block">
                {t.educationLevel}:
              </span>
              <span className="font-semibold text-[#1B2C24]">
                {structuredRequirements?.qualifications.educationLevel ||
                  (lang === 'ko' ? '대학교 재학생 또는 졸업생' : lang === 'en' ? 'College student or Graduate' : 'Sinh viên Cao đẳng / Đại học trở lên')}
              </span>
            </div>
          </div>

          {/* Language Certificates */}
          {langCerts.length > 0 && (
            <div className="flex items-start gap-3 text-xs pt-2 border-t border-[#F5F1E8]">
              <Globe2 className="w-4 h-4 text-[#385A45] shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="text-neutral-500 font-medium block mb-1">
                  {t.languageCertificates}:
                </span>
                <div className="flex flex-wrap gap-2">
                  {langCerts.map((cert, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F2F6F3] border border-[#C7D9CC] text-[#1B2C24] font-medium text-[11px]"
                    >
                      <Award className="w-3 h-3 text-[#385A45]" />
                      <strong>{cert.name}:</strong> {cert.levelOrScore}
                      {cert.mandatory && (
                        <span className="text-[10px] text-amber-700 bg-amber-50 px-1 py-0.2 rounded border border-amber-200">
                          {t.requiredCertificate}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
