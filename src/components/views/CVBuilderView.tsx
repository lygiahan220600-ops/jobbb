import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Printer,
  Download,
  Plus,
  Trash2,
  CheckCircle,
  Loader2,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Award,
  Globe
} from 'lucide-react';
import { CVData, Language, UserProfile } from '../../types/job';

interface CVBuilderViewProps {
  cvData: CVData;
  onUpdateCV: (newCV: CVData) => void;
  user: UserProfile;
  lang?: Language;
}

export const CVBuilderView: React.FC<CVBuilderViewProps> = ({
  cvData,
  onUpdateCV,
  user,
  lang = 'vi',
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'education' | 'experience' | 'skills'>('info');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [aiTips, setAiTips] = useState<string | null>(null);

  const L = {
    vi: {
      title: 'Trình tạo & Quản lý CV Cá nhân',
      subtitle: 'Nhập thông tin bên trái — Bản xem trước CV chuẩn ATS tông màu rêu & kem tự động cập nhật ngay bên phải',
      aiEnhance: 'AI Tối ưu hóa CV',
      aiEnhanceTitle: 'Sử dụng AI tối ưu hóa văn phong và kỹ năng chuẩn ATS',
      printPdf: 'In / Xuất PDF',
      closeTips: 'Đóng',
      tabInfo: 'Cơ bản',
      tabEdu: 'Học vấn',
      tabExp: 'Kinh nghiệm',
      tabSkills: 'Kỹ năng',
      fullName: 'Họ và tên:',
      targetJob: 'Vị trí / Mục tiêu ứng tuyển:',
      email: 'Email:',
      phone: 'Số điện thoại:',
      address: 'Địa chỉ cư trú:',
      objective: 'Tóm tắt mục tiêu nghề nghiệp:',
      addEdu: 'Thêm học vấn',
      schoolName: 'Tên trường (Đại học / Cao đẳng)',
      major: 'Ngành học / Chuyên ngành',
      period: 'Thời gian (ví dụ: 2024 - 2028)',
      gpa: 'Điểm GPA hoặc xếp loại',
      schoolNum: 'Trường học #',
      addExp: 'Thêm kinh nghiệm / Hoạt động',
      expRole: 'Vị trí công việc',
      expCompany: 'Tên công ty hoặc CLB',
      expPeriod: 'Thời gian (ví dụ: 09/2024 - Hiện tại)',
      expDesc: 'Mô tả công việc và đóng góp cụ thể...',
      activityNum: 'Hoạt động / Việc làm #',
      skillsLabel: 'Danh sách kỹ năng (mỗi kỹ năng một dòng):',
      certsLabel: 'Chứng chỉ & Giải thưởng (mỗi dòng một chứng chỉ):',
      previewObjective: 'MỤC TIÊU NGHỀ NGHIỆP',
      previewEdu: 'HỌC VẤN',
      previewExp: 'KINH NGHIỆM LÀM VIỆC & HOẠT ĐỘNG',
      previewSkills: 'KỸ NĂNG & NGÔN NGỮ',
      previewSpecialtySkills: 'Kỹ năng chuyên môn:',
      previewLangs: 'Ngoại ngữ:',
      previewCerts: 'CHỨNG CHỈ & THÀNH TÍCH NỔI BẬT',
    },
    en: {
      title: 'ATS Resume Builder & Editor',
      subtitle: 'Edit details on the left — Real-time ATS resume preview automatically synchronizes on the right',
      aiEnhance: 'AI Optimize CV',
      aiEnhanceTitle: 'Use AI to optimize tone, wording, and ATS keywords',
      printPdf: 'Print / Export PDF',
      closeTips: 'Close',
      tabInfo: 'Basic Info',
      tabEdu: 'Education',
      tabExp: 'Experience',
      tabSkills: 'Skills & Certs',
      fullName: 'Full Name:',
      targetJob: 'Target Position / Objective:',
      email: 'Email:',
      phone: 'Phone Number:',
      address: 'Address / City:',
      objective: 'Professional Career Summary:',
      addEdu: 'Add Education',
      schoolName: 'School / University',
      major: 'Major / Field of Study',
      period: 'Period (e.g. 2024 - 2028)',
      gpa: 'GPA or Honors',
      schoolNum: 'School #',
      addExp: 'Add Experience / Activity',
      expRole: 'Job Title / Position',
      expCompany: 'Company or Club Name',
      expPeriod: 'Period (e.g. 09/2024 - Present)',
      expDesc: 'Job responsibilities and key achievements...',
      activityNum: 'Activity / Role #',
      skillsLabel: 'Key skills list (one skill per line):',
      certsLabel: 'Certificates & Awards (one per line):',
      previewObjective: 'CAREER OBJECTIVE',
      previewEdu: 'EDUCATION',
      previewExp: 'WORK EXPERIENCE & ACTIVITIES',
      previewSkills: 'SKILLS & LANGUAGES',
      previewSpecialtySkills: 'Professional Skills:',
      previewLangs: 'Languages:',
      previewCerts: 'CERTIFICATIONS & AWARDS',
    },
    ko: {
      title: 'ATS 표준 영/국문 이력서 빌더',
      subtitle: '좌측에서 정보를 입력하면 우측의 올리브 & 크림 ATS 이력서가 실시간으로 자동 렌더링됩니다',
      aiEnhance: 'AI 이력서 최적화',
      aiEnhanceTitle: 'AI를 활용하여 문장을 정돈하고 ATS 채용 핵심 키워드를 보강합니다',
      printPdf: '인쇄 / PDF 저장',
      closeTips: '닫기',
      tabInfo: '기본 정보',
      tabEdu: '학력 사항',
      tabExp: '경력/활동',
      tabSkills: '기술/자격증',
      fullName: '성명 (Full Name):',
      targetJob: '희망 직무 / 지원 분야:',
      email: '이메일:',
      phone: '전화번호:',
      address: '거주지 주소:',
      objective: '직무 요약 및 자기소개:',
      addEdu: '학력 사항 추가',
      schoolName: '학교명 (대학교/대학원)',
      major: '전공 / 세부 학과',
      period: '재학 기간 (예: 2024 - 2028)',
      gpa: '학점 및 석차 (예: GPA 3.5/4.0)',
      schoolNum: '학력 사항 #',
      addExp: '경력 / 대외활동 추가',
      expRole: '담당 직무 / 역할',
      expCompany: '회사명 / 단체명',
      expPeriod: '활동 기간 (예: 2024.09 - 현재)',
      expDesc: '담당 업무 내용 및 주요 성과...',
      activityNum: '경력 및 프로젝트 #',
      skillsLabel: '보유 핵심 기술 목록 (한 줄에 하나씩):',
      certsLabel: '자격증 및 수상 내역 (한 줄에 하나씩):',
      previewObjective: '직무 목표 및 핵심 역량',
      previewEdu: '학력 사항',
      previewExp: '경력 사항 및 대외 활동',
      previewSkills: '전문 기술 및 외국어',
      previewSpecialtySkills: '전문 기술:',
      previewLangs: '외국어 능력:',
      previewCerts: '자격증 및 수상 내역',
    },
  }[lang];

  // Form field handlers
  const handleBasicChange = (field: keyof CVData, val: any) => {
    onUpdateCV({
      ...cvData,
      [field]: val,
    });
  };

  // Education handlers
  const handleAddEducation = () => {
    onUpdateCV({
      ...cvData,
      education: [
        ...cvData.education,
        {
          school: '',
          major: '',
          period: '2024 - 2028',
          gpa: 'GPA: 3.2 / 4.0',
        },
      ],
    });
  };

  const handleUpdateEducation = (index: number, field: string, val: string) => {
    const updated = [...cvData.education];
    updated[index] = { ...updated[index], [field]: val };
    onUpdateCV({ ...cvData, education: updated });
  };

  const handleRemoveEducation = (index: number) => {
    const updated = cvData.education.filter((_, i) => i !== index);
    onUpdateCV({ ...cvData, education: updated });
  };

  // Experience handlers
  const handleAddExperience = () => {
    onUpdateCV({
      ...cvData,
      experience: [
        ...cvData.experience,
        {
          role: lang === 'ko' ? '인턴 / 보조' : lang === 'en' ? 'Associate / Assistant' : 'Cộng tác viên / Trợ lý',
          company: lang === 'ko' ? '신규 프로젝트' : lang === 'en' ? 'New Project / Company' : 'Đơn vị / Dự án mới',
          period: lang === 'ko' ? '2025 - 현재' : lang === 'en' ? '2025 - Present' : '2025 - Hiện tại',
          description: lang === 'ko' ? '주요 업무 내용 및 담당 기여도를 기술합니다.' : lang === 'en' ? 'Brief description of roles and key accomplishments.' : 'Mô tả ngắn gọn công việc và kết quả đạt được.',
        },
      ],
    });
  };

  const handleUpdateExperience = (index: number, field: string, val: string) => {
    const updated = [...cvData.experience];
    updated[index] = { ...updated[index], [field]: val };
    onUpdateCV({ ...cvData, experience: updated });
  };

  const handleRemoveExperience = (index: number) => {
    const updated = cvData.experience.filter((_, i) => i !== index);
    onUpdateCV({ ...cvData, experience: updated });
  };

  // Skills input handler (comma separated)
  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const list = e.target.value
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    onUpdateCV({ ...cvData, skills: list });
  };

  // AI CV Enhancer call
  const handleAIEnhance = async () => {
    setIsEnhancing(true);
    setAiTips(null);
    try {
      const res = await fetch('/api/ai/enhance-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvData, lang }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        onUpdateCV({
          ...cvData,
          objective: data.data.professionalSummary || cvData.objective,
          skills: data.data.highlightSkills?.length ? data.data.highlightSkills : cvData.skills,
        });
        setAiTips(data.data.improvementTips || (lang === 'ko' ? '이력서가 성공적으로 최적화되었습니다!' : lang === 'en' ? 'Resume successfully optimized by AI!' : 'CV đã được chuẩn hóa câu chữ thành công!'));
      }
    } catch (err) {
      console.error('Enhance error:', err);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Action Header */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#EDE6D6] shadow-sm">
        <div>
          <h2 className="text-base font-bold text-[#1B2C24] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#385A45]" />
            <span>{L.title}</span>
          </h2>
          <p className="text-xs text-[#4A7D5C] mt-0.5">
            {L.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAIEnhance}
            disabled={isEnhancing}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-700 to-[#2D4738] hover:from-emerald-600 hover:to-[#385A45] text-white text-xs font-bold shadow-sm transition-all disabled:opacity-50"
            title={L.aiEnhanceTitle}
          >
            {isEnhancing ? (
              <Loader2 className="w-4 h-4 animate-spin text-emerald-300" />
            ) : (
              <Sparkles className="w-4 h-4 text-emerald-300" />
            )}
            <span>{L.aiEnhance}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2D4738] hover:bg-[#385A45] text-white text-xs font-bold shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>{L.printPdf}</span>
          </button>
        </div>
      </div>

      {aiTips && (
        <div className="no-print p-3.5 rounded-xl bg-[#E3ECE6] border border-[#9EBFB5] flex items-center justify-between text-xs text-[#1B2C24]">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{aiTips}</span>
          </div>
          <button onClick={() => setAiTips(null)} className="text-[#385A45] font-semibold hover:underline">
            {L.closeTips}
          </button>
        </div>
      )}

      {/* Main Split: Form on Left, CV Live Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Editor (5 cols) */}
        <div className="no-print lg:col-span-5 bg-white p-5 rounded-2xl border border-[#EDE6D6] shadow-sm space-y-4">
          {/* Editor Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#F5F1E8] rounded-xl text-xs font-medium">
            <button
              onClick={() => setActiveTab('info')}
              className={`flex-1 py-1.5 rounded-lg transition-colors ${
                activeTab === 'info' ? 'bg-white text-[#1B2C24] font-bold shadow-sm' : 'text-neutral-600'
              }`}
            >
              {L.tabInfo}
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`flex-1 py-1.5 rounded-lg transition-colors ${
                activeTab === 'education' ? 'bg-white text-[#1B2C24] font-bold shadow-sm' : 'text-neutral-600'
              }`}
            >
              {L.tabEdu}
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`flex-1 py-1.5 rounded-lg transition-colors ${
                activeTab === 'experience' ? 'bg-white text-[#1B2C24] font-bold shadow-sm' : 'text-neutral-600'
              }`}
            >
              {L.tabExp}
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`flex-1 py-1.5 rounded-lg transition-colors ${
                activeTab === 'skills' ? 'bg-white text-[#1B2C24] font-bold shadow-sm' : 'text-neutral-600'
              }`}
            >
              {L.tabSkills}
            </button>
          </div>

          {/* Tab 1: Basic Info */}
          {activeTab === 'info' && (
            <div className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-neutral-600 block mb-1">{L.fullName}</label>
                <input
                  type="text"
                  value={cvData.fullName}
                  onChange={(e) => handleBasicChange('fullName', e.target.value)}
                  className="w-full p-2 bg-[#FBF9F4] border border-[#DED3BD] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-600 block mb-1">{L.targetJob}</label>
                <input
                  type="text"
                  value={cvData.jobTitle}
                  onChange={(e) => handleBasicChange('jobTitle', e.target.value)}
                  className="w-full p-2 bg-[#FBF9F4] border border-[#DED3BD] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-neutral-600 block mb-1">{L.email}</label>
                  <input
                    type="email"
                    value={cvData.email}
                    onChange={(e) => handleBasicChange('email', e.target.value)}
                    className="w-full p-2 bg-[#FBF9F4] border border-[#DED3BD] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-600 block mb-1">{L.phone}</label>
                  <input
                    type="text"
                    value={cvData.phone}
                    onChange={(e) => handleBasicChange('phone', e.target.value)}
                    className="w-full p-2 bg-[#FBF9F4] border border-[#DED3BD] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-neutral-600 block mb-1">{L.address}</label>
                <input
                  type="text"
                  value={cvData.address}
                  onChange={(e) => handleBasicChange('address', e.target.value)}
                  className="w-full p-2 bg-[#FBF9F4] border border-[#DED3BD] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-600 block mb-1">{L.objective}</label>
                <textarea
                  rows={4}
                  value={cvData.objective}
                  onChange={(e) => handleBasicChange('objective', e.target.value)}
                  className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#385A45] leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* Tab 2: Education */}
          {activeTab === 'education' && (
            <div className="space-y-4 text-xs">
              {cvData.education.map((edu, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#FBF9F4] border border-[#EDE6D6] space-y-2 relative">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#2D4738]">{L.schoolNum}{idx + 1}</span>
                    {cvData.education.length > 1 && (
                      <button
                        onClick={() => handleRemoveEducation(idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder={L.schoolName}
                    value={edu.school}
                    onChange={(e) => handleUpdateEducation(idx, 'school', e.target.value)}
                    className="w-full p-2 bg-white border border-[#DED3BD] rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder={L.major}
                    value={edu.major}
                    onChange={(e) => handleUpdateEducation(idx, 'major', e.target.value)}
                    className="w-full p-2 bg-white border border-[#DED3BD] rounded-lg"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder={L.period}
                      value={edu.period}
                      onChange={(e) => handleUpdateEducation(idx, 'period', e.target.value)}
                      className="p-2 bg-white border border-[#DED3BD] rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder={L.gpa}
                      value={edu.gpa || ''}
                      onChange={(e) => handleUpdateEducation(idx, 'gpa', e.target.value)}
                      className="p-2 bg-white border border-[#DED3BD] rounded-lg"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddEducation}
                className="w-full py-2 rounded-lg border border-dashed border-[#385A45] text-[#2D4738] font-semibold hover:bg-[#F5F1E8] flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{L.addEdu}</span>
              </button>
            </div>
          )}

          {/* Tab 3: Experience */}
          {activeTab === 'experience' && (
            <div className="space-y-4 text-xs">
              {cvData.experience.map((exp, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#FBF9F4] border border-[#EDE6D6] space-y-2 relative">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#2D4738]">{L.activityNum}{idx + 1}</span>
                    {cvData.experience.length > 1 && (
                      <button
                        onClick={() => handleRemoveExperience(idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder={L.expRole}
                    value={exp.role}
                    onChange={(e) => handleUpdateExperience(idx, 'role', e.target.value)}
                    className="w-full p-2 bg-white border border-[#DED3BD] rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder={L.expCompany}
                    value={exp.company}
                    onChange={(e) => handleUpdateExperience(idx, 'company', e.target.value)}
                    className="w-full p-2 bg-white border border-[#DED3BD] rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder={L.expPeriod}
                    value={exp.period}
                    onChange={(e) => handleUpdateExperience(idx, 'period', e.target.value)}
                    className="w-full p-2 bg-white border border-[#DED3BD] rounded-lg"
                  />
                  <textarea
                    rows={3}
                    placeholder={L.expDesc}
                    value={exp.description}
                    onChange={(e) => handleUpdateExperience(idx, 'description', e.target.value)}
                    className="w-full p-2 bg-white border border-[#DED3BD] rounded-lg"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddExperience}
                className="w-full py-2 rounded-lg border border-dashed border-[#385A45] text-[#2D4738] font-semibold hover:bg-[#F5F1E8] flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{L.addExp}</span>
              </button>
            </div>
          )}

          {/* Tab 4: Skills & Certificates */}
          {activeTab === 'skills' && (
            <div className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-neutral-600 block mb-1">
                  {L.skillsLabel}
                </label>
                <textarea
                  rows={5}
                  value={cvData.skills.join('\n')}
                  onChange={handleSkillsChange}
                  className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-lg leading-relaxed"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-600 block mb-1">
                  {L.certsLabel}
                </label>
                <textarea
                  rows={3}
                  value={cvData.certificates.join('\n')}
                  onChange={(e) =>
                    onUpdateCV({
                      ...cvData,
                      certificates: e.target.value.split('\n').filter(Boolean),
                    })
                  }
                  className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-lg leading-relaxed"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Column: ATS Live CV Document Preview (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#EDE6D6] shadow-xl p-8 sm:p-10 font-sans text-neutral-800 cv-document">
          {/* CV Header: Moss Green Accent Band */}
          <div className="border-b-2 border-[#2D4738] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-[#1B2C24] tracking-tight uppercase">
                {cvData.fullName}
              </h1>
              <p className="text-xs font-bold text-[#385A45] tracking-wide uppercase mt-1">
                {cvData.jobTitle}
              </p>
              {/* Contact metadata */}
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-600">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#385A45]" />
                  {cvData.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#385A45]" />
                  {cvData.phone}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#385A45]" />
                  {cvData.address}
                </span>
              </div>
            </div>

            {/* Avatar thumbnail */}
            {cvData.avatarUrl && (
              <img
                src={cvData.avatarUrl}
                alt={cvData.fullName}
                className="w-20 h-20 rounded-xl object-cover border-2 border-[#2D4738] shadow-sm shrink-0"
              />
            )}
          </div>

          {/* Section: Mục tiêu nghề nghiệp */}
          <div className="mt-5 space-y-1.5">
            <h2 className="text-xs font-bold tracking-wider uppercase text-[#2D4738] border-b border-[#EDE6D6] pb-1">
              {L.previewObjective}
            </h2>
            <p className="text-xs text-neutral-700 leading-relaxed pt-1">
              {cvData.objective}
            </p>
          </div>

          {/* Section: Học vấn */}
          <div className="mt-5 space-y-2">
            <h2 className="text-xs font-bold tracking-wider uppercase text-[#2D4738] border-b border-[#EDE6D6] pb-1">
              {L.previewEdu}
            </h2>
            <div className="space-y-2.5 pt-1">
              {cvData.education.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-start text-xs">
                  <div>
                    <h3 className="font-bold text-[#1B2C24]">{edu.school}</h3>
                    <p className="text-neutral-700 font-medium">{edu.major}</p>
                    {edu.gpa && <p className="text-neutral-500 text-[11px]">{edu.gpa}</p>}
                  </div>
                  <span className="text-[11px] font-mono tabular-nums text-neutral-500 shrink-0">
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Kinh nghiệm & Hoạt động */}
          <div className="mt-5 space-y-2">
            <h2 className="text-xs font-bold tracking-wider uppercase text-[#2D4738] border-b border-[#EDE6D6] pb-1">
              {L.previewExp}
            </h2>
            <div className="space-y-3 pt-1">
              {cvData.experience.map((exp, idx) => (
                <div key={idx} className="text-xs space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-[#1B2C24]">{exp.role}</h3>
                    <span className="text-[11px] font-mono tabular-nums text-neutral-500">
                      {exp.period}
                    </span>
                  </div>
                  <p className="font-semibold text-[#385A45] text-[11px]">{exp.company}</p>
                  <p className="text-neutral-700 leading-relaxed text-[11px] whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Kỹ năng & Ngôn ngữ */}
          <div className="mt-5 space-y-2">
            <h2 className="text-xs font-bold tracking-wider uppercase text-[#2D4738] border-b border-[#EDE6D6] pb-1">
              {L.previewSkills}
            </h2>
            <div className="pt-1 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <h4 className="font-bold text-neutral-800 text-[11px] mb-1">{L.previewSpecialtySkills}</h4>
                <ul className="space-y-1 text-neutral-700 text-[11px]">
                  {cvData.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#385A45] mt-1.5 shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-neutral-800 text-[11px] mb-1">{L.previewLangs}</h4>
                <div className="space-y-1 text-neutral-700 text-[11px]">
                  {cvData.languages.map((item, lIdx) => (
                    <div key={lIdx} className="flex justify-between">
                      <span className="font-medium">{item.language}:</span>
                      <span className="text-neutral-500">{item.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section: Chứng chỉ & Thành tích */}
          {cvData.certificates.length > 0 && (
            <div className="mt-5 space-y-2">
              <h2 className="text-xs font-bold tracking-wider uppercase text-[#2D4738] border-b border-[#EDE6D6] pb-1">
                {L.previewCerts}
              </h2>
              <ul className="pt-1 space-y-1 text-neutral-700 text-xs">
                {cvData.certificates.map((cert, cIdx) => (
                  <li key={cIdx} className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
