import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  Search,
  MessageSquare,
  FileText,
  Mail,
  Phone,
  Building,
  ChevronRight,
  Filter,
  Eye,
  Send,
  X,
  AlertCircle,
  Video,
  MapPin,
  ExternalLink,
  PauseCircle,
  PlayCircle
} from 'lucide-react';
import { Job, Application, Conversation, UserProfile, Language, WorkType, ExperienceLevel } from '../../types/job';
import { DISTRICTS_HCM } from '../../data/mockJobs';

interface RecruiterDashboardViewProps {
  jobs: Job[];
  applications: Application[];
  conversations: Conversation[];
  user: UserProfile;
  onPostJob: (jobData: Partial<Job>) => void;
  onToggleJobStatus: (jobId: string) => void;
  onUpdateApplicationStatus: (appId: string, status: Application['status'], notes?: string, interviewDetails?: { date: string; format: 'Online Google Meet' | 'Trực tiếp tại văn phòng'; location: string }) => void;
  onSendMessageToCandidate: (candidateName: string, text: string, jobId?: string) => void;
  onNavigateToCandidateChat: (convId?: string) => void;
  lang?: Language;
}

export type RecruiterTab = 'overview' | 'post_job' | 'review_applications' | 'interview_messages' | 'company_profile';

export const RecruiterDashboardView: React.FC<RecruiterDashboardViewProps> = ({
  jobs,
  applications,
  conversations,
  user,
  onPostJob,
  onToggleJobStatus,
  onUpdateApplicationStatus,
  onSendMessageToCandidate,
  onNavigateToCandidateChat,
  lang = 'vi',
}) => {
  const [activeTab, setActiveTab] = useState<RecruiterTab>('overview');

  // Job creation form modal state
  const [showPostModal, setShowPostModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newWorkType, setNewWorkType] = useState<WorkType>('Toàn thời gian');
  const [newDistrict, setNewDistrict] = useState('Quận 1');
  const [newAddress, setNewAddress] = useState(user.companyAddress || '142 Đinh Tiên Hoàng, Quận 1');
  const [newSalaryMin, setNewSalaryMin] = useState(8);
  const [newSalaryMax, setNewSalaryMax] = useState(15);
  const [newExperience, setNewExperience] = useState<ExperienceLevel>('Chưa có kinh nghiệm');
  const [newSchedule, setNewSchedule] = useState('Ca tối 18:00 - 22:00 hoặc linh hoạt');
  const [newDescription, setNewDescription] = useState('');
  const [newRequirements, setNewRequirements] = useState('');
  const [newBenefits, setNewBenefits] = useState('');
  const [postSuccess, setPostSuccess] = useState(false);

  // Application review state
  const [selectedJobFilter, setSelectedJobFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewingCVApp, setViewingCVApp] = useState<Application | null>(null);

  // Interview invitation modal state
  const [interviewApp, setInterviewApp] = useState<Application | null>(null);
  const [interviewDate, setInterviewDate] = useState('14:30 - Thứ Năm (02/10/2026)');
  const [interviewFormat, setInterviewFormat] = useState<'Online Google Meet' | 'Trực tiếp tại văn phòng'>('Trực tiếp tại văn phòng');
  const [interviewLocation, setInterviewLocation] = useState('Văn phòng tuyển dụng - 142 Đinh Tiên Hoàng, P. Đa Kao, Quận 1');
  const [interviewNote, setInterviewNote] = useState('Hồ sơ của bạn rất phù hợp. Mời bạn tham gia buổi phỏng vấn trao đổi chi tiết về công việc.');

  // Direct candidate message state
  const [selectedChatCandidate, setSelectedChatCandidate] = useState<string>(
    conversations[0]?.candidateName || applications[0]?.candidateName || ''
  );
  const [chatInputText, setChatInputText] = useState('');
  const [chatSuccessToast, setChatSuccessToast] = useState<string | null>(null);

  // Filtered applications
  const filteredApps = applications.filter((app) => {
    if (selectedJobFilter !== 'all' && app.jobId !== selectedJobFilter) return false;
    if (statusFilter !== 'all' && app.status !== statusFilter) return false;
    return true;
  });

  // Calculate statistics
  const activeJobsCount = jobs.filter((j) => j.status !== 'paused').length;
  const newAppsCount = applications.filter((a) => a.status === 'submitted').length;
  const interviewCount = applications.filter((a) => a.status === 'interview').length;
  const acceptedCount = applications.filter((a) => a.status === 'accepted').length;

  // Handle submit post job
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onPostJob({
      title: newTitle,
      company: user.companyName || 'Công ty Tuyển dụng',
      companyLogo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=120&auto=format&fit=crop&q=80',
      workType: newWorkType,
      experienceLevel: newExperience,
      salaryMin: newSalaryMin,
      salaryMax: newSalaryMax,
      salaryRange: `${newSalaryMin} - ${newSalaryMax} triệu`,
      location: {
        district: newDistrict,
        city: 'TP. Hồ Chí Minh',
        fullAddress: newAddress,
      },
      scheduleDetails: newSchedule,
      description: newDescription || `Tuyển dụng vị trí ${newTitle} với chế độ đãi ngộ hấp dẫn.`,
      requirements: newRequirements ? newRequirements.split('\n').filter(Boolean) : ['Giao tiếp tốt', 'Nhiệt tình, có trách nhiệm'],
      benefits: newBenefits ? newBenefits.split('\n').filter(Boolean) : ['Lương thưởng cạnh tranh', 'Môi trường thân thiện, chuyên nghiệp'],
      postedTime: 'Vừa xong',
      status: 'active',
      applicantCount: 0,
      urgent: true,
      recruiter: {
        id: user.id || 'rec-01',
        name: user.fullName || 'Bộ phận Tuyển dụng',
        position: user.recruiterPosition || 'Trưởng phòng Nhân sự',
        avatar: user.avatar || '',
        online: true,
        email: user.email || 'hr@company.com',
        phone: user.phone || '0903 821 445',
      },
    });

    setPostSuccess(true);
    setTimeout(() => {
      setPostSuccess(false);
      setShowPostModal(false);
      // Reset form
      setNewTitle('');
      setNewDescription('');
      setNewRequirements('');
      setNewBenefits('');
    }, 1200);
  };

  // Handle schedule interview
  const handleSendInterview = () => {
    if (!interviewApp) return;

    onUpdateApplicationStatus(interviewApp.id, 'interview', interviewNote, {
      date: interviewDate,
      format: interviewFormat,
      location: interviewLocation,
    });

    // Also auto send an interview message
    const candidateName = interviewApp.candidateName || 'Ứng viên';
    const inviteMsg = `[THƯ MỜI PHỎNG VẤN]\nChào bạn ${candidateName},\nChúng tôi trân trọng mời bạn tham dự buổi phỏng vấn cho vị trí "${interviewApp.jobTitle}".\n• Thời gian: ${interviewDate}\n• Hình thức: ${interviewFormat}\n• Địa điểm: ${interviewLocation}\n• Ghi chú: ${interviewNote}\nVui lòng phản hồi xác nhận tham gia. Trân trọng!`;
    
    onSendMessageToCandidate(candidateName, inviteMsg, interviewApp.jobId);

    setChatSuccessToast(`Đã gửi thư mời phỏng vấn đến ứng viên ${candidateName}!`);
    setTimeout(() => setChatSuccessToast(null), 3000);
    setInterviewApp(null);
  };

  // Handle fast message send in chat tab
  const handleSendChat = (templateText?: string) => {
    const textToSend = templateText || chatInputText;
    if (!textToSend.trim() || !selectedChatCandidate) return;

    onSendMessageToCandidate(selectedChatCandidate, textToSend);
    setChatInputText('');
    setChatSuccessToast(`Đã gửi tin nhắn đến ${selectedChatCandidate}!`);
    setTimeout(() => setChatSuccessToast(null), 2500);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Welcome & Navigation Tabs */}
      <div className="bg-white p-5 rounded-2xl border border-[#EDE6D6] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-1">
            <Building className="w-3.5 h-3.5" />
            <span>Cổng Nhà Tuyển Dụng & Doanh Nghiệp</span>
          </div>
          <h1 className="text-xl font-extrabold text-[#1B2C24]">
            {user.companyName ? user.companyName : 'Hệ thống Quản lý Tuyển dụng'}
          </h1>
          <p className="text-xs text-[#4A7D5C] mt-0.5">
            Người phụ trách: <span className="font-semibold text-[#1B2C24]">{user.fullName || 'Chưa cập nhật'}</span> {user.recruiterPosition ? `(${user.recruiterPosition})` : ''} · {user.district || 'TP.HCM'}
          </p>
        </div>

        {/* Action Button: Post Job */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPostModal(true)}
            className="px-4 py-2.5 rounded-xl bg-[#2D4738] hover:bg-[#385A45] text-white text-xs font-bold shadow-sm hover:shadow transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>+ Đăng bài tuyển dụng</span>
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-wrap gap-2 border-b border-[#EDE6D6] pb-3">
        {[
          { id: 'overview', label: '📊 Tổng quan', count: null },
          { id: 'post_job', label: '📝 Quản lý tin tuyển dụng', count: jobs.length },
          { id: 'review_applications', label: '👥 Duyệt ứng tuyển', count: applications.length },
          { id: 'interview_messages', label: '💬 Gửi tin nhắn phỏng vấn', count: conversations.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as RecruiterTab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-[#2D4738] text-white shadow-sm'
                : 'bg-white text-neutral-600 hover:text-[#1B2C24] border border-[#DED3BD]'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== null && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${activeTab === tab.id ? 'bg-[#385A45] text-white' : 'bg-neutral-100 text-neutral-700'}`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Toast Alert */}
      {chatSuccessToast && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{chatSuccessToast}</span>
        </div>
      )}

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* 4 Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-[#EDE6D6] shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                <Briefcase className="w-4 h-4" />
              </div>
              <p className="text-2xl font-bold font-mono text-[#1B2C24]">{activeJobsCount}</p>
              <p className="text-xs text-neutral-500 font-medium">Tin tuyển dụng hoạt động</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#EDE6D6] shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-2">
                <Users className="w-4 h-4" />
              </div>
              <p className="text-2xl font-bold font-mono text-[#1B2C24]">{newAppsCount}</p>
              <p className="text-xs text-neutral-500 font-medium">Hồ sơ ứng tuyển mới</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#EDE6D6] shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-2">
                <Calendar className="w-4 h-4" />
              </div>
              <p className="text-2xl font-bold font-mono text-amber-800">{interviewCount}</p>
              <p className="text-xs text-neutral-500 font-medium">Lịch phỏng vấn đã xếp</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#EDE6D6] shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center mb-2">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <p className="text-2xl font-bold font-mono text-purple-800">{acceptedCount}</p>
              <p className="text-xs text-neutral-500 font-medium">Ứng viên đã trúng tuyển</p>
            </div>
          </div>

          {/* Quick Action Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              onClick={() => setShowPostModal(true)}
              className="p-5 rounded-2xl bg-gradient-to-br from-[#2D4738] to-[#1B2C24] text-white cursor-pointer hover:shadow-md transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white mb-3 group-hover:scale-105 transition-transform">
                <Plus className="w-5 h-5 text-emerald-300" />
              </div>
              <h3 className="text-sm font-bold">Đăng bài tuyển dụng mới</h3>
              <p className="text-xs text-[#C7D9CC] mt-1">Tạo tin tuyển dụng nhanh, tiếp cận hàng nghìn ứng viên tiềm năng.</p>
            </div>

            <div
              onClick={() => setActiveTab('review_applications')}
              className="p-5 rounded-2xl bg-white border border-[#EDE6D6] hover:border-[#385A45] cursor-pointer hover:shadow-md transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#1B2C24]">Duyệt ứng tuyển ({applications.length})</h3>
              <p className="text-xs text-neutral-500 mt-1">Xem chi tiết CV, duyệt hồ sơ và gửi lịch mời phỏng vấn.</p>
            </div>

            <div
              onClick={() => setActiveTab('interview_messages')}
              className="p-5 rounded-2xl bg-white border border-[#EDE6D6] hover:border-[#385A45] cursor-pointer hover:shadow-md transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#1B2C24]">Tin nhắn phỏng vấn ({conversations.length})</h3>
              <p className="text-xs text-neutral-500 mt-1">Gửi thư mời phỏng vấn trực tiếp hoặc Online Google Meet.</p>
            </div>
          </div>

          {/* Recent Applications Pipeline */}
          <div className="bg-white rounded-2xl border border-[#EDE6D6] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#1B2C24] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#385A45]" />
                <span>Hồ sơ ứng tuyển mới nhất</span>
              </h3>
              <button
                onClick={() => setActiveTab('review_applications')}
                className="text-xs text-[#385A45] hover:underline font-semibold flex items-center gap-1"
              >
                <span>Xem tất cả ({applications.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-[#F5F1E8]">
              {applications.slice(0, 4).map((app) => (
                <div key={app.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#EDE6D6] text-[#2D4738] font-bold text-xs flex items-center justify-center shrink-0">
                      {app.candidateName ? app.candidateName.charAt(0) : 'U'}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#1B2C24]">{app.candidateName || 'Ứng viên ẩn danh'}</h4>
                      <p className="text-[11px] text-[#385A45]">{app.jobTitle}</p>
                      <p className="text-[10px] text-neutral-400 mt-0.5">Ngày nộp: {app.appliedDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        app.status === 'interview'
                          ? 'bg-amber-100 text-amber-800'
                          : app.status === 'accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.status === 'rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {app.statusText}
                    </span>

                    <button
                      onClick={() => setInterviewApp(app)}
                      className="px-3 py-1.5 rounded-lg bg-[#2D4738] hover:bg-[#385A45] text-white text-[11px] font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Calendar className="w-3 h-3" />
                      <span>Mời PV</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: POST & MANAGE JOBS */}
      {activeTab === 'post_job' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#1B2C24]">Danh sách tin tuyển dụng đã đăng ({jobs.length})</h2>
              <p className="text-xs text-neutral-500">Quản lý trạng thái nhận hồ sơ và lượt ứng tuyển của từng tin</p>
            </div>
            <button
              onClick={() => setShowPostModal(true)}
              className="px-4 py-2 rounded-xl bg-[#2D4738] hover:bg-[#385A45] text-white text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Đăng tin mới</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.map((job) => {
              const isPaused = job.status === 'paused';
              const jobAppsCount = applications.filter((a) => a.jobId === job.id).length;

              return (
                <div key={job.id} className="bg-white p-4 rounded-xl border border-[#EDE6D6] shadow-2xs space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isPaused ? 'bg-neutral-200 text-neutral-700' : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {isPaused ? 'Đã tạm dừng' : 'Đang nhận hồ sơ'}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono">Đăng: {job.postedTime}</span>
                      </div>
                      <h3 className="text-xs font-bold text-[#1B2C24] mt-1.5 leading-snug">{job.title}</h3>
                      <p className="text-[11px] text-neutral-500">{job.location.district}, {job.location.city} · {job.workType}</p>
                    </div>

                    <span className="text-xs font-bold text-[#2D4738] font-mono shrink-0">
                      {job.salaryRange}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-[#F5F1E8]">
                    <span className="text-[11px] text-[#4A7D5C] font-semibold flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {jobAppsCount} ứng viên đã nộp
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedJobFilter(job.id);
                          setActiveTab('review_applications');
                        }}
                        className="px-2.5 py-1 rounded bg-[#F5F1E8] hover:bg-[#EDE6D6] text-[#2D4738] text-[11px] font-semibold"
                      >
                        Xem ứng viên
                      </button>

                      <button
                        onClick={() => onToggleJobStatus(job.id)}
                        className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 ${
                          isPaused ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                        }`}
                      >
                        {isPaused ? <PlayCircle className="w-3 h-3" /> : <PauseCircle className="w-3 h-3" />}
                        <span>{isPaused ? 'Mở lại' : 'Tạm dừng'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: REVIEW APPLICATIONS */}
      {activeTab === 'review_applications' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#EDE6D6]">
            <div>
              <h2 className="text-sm font-bold text-[#1B2C24]">Duyệt hồ sơ ứng tuyển ({filteredApps.length})</h2>
              <p className="text-xs text-neutral-500">Xem hồ sơ CV, xếp lịch phỏng vấn và gửi phản hồi cho ứng viên</p>
            </div>

            {/* Filter selectors */}
            <div className="flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-[#DED3BD] text-xs bg-white text-[#1B2C24]"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="submitted">Mới nộp</option>
                <option value="reviewing">Đang xem xét</option>
                <option value="interview">Đã mời phỏng vấn</option>
                <option value="accepted">Đã trúng tuyển</option>
                <option value="rejected">Đã từ chối</option>
              </select>

              <select
                value={selectedJobFilter}
                onChange={(e) => setSelectedJobFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-[#DED3BD] text-xs bg-white text-[#1B2C24] max-w-[200px]"
              >
                <option value="all">Tất cả vị trí</option>
                {jobs.map((j) => (
                  <option key={j.id} value={j.id}>{j.title}</option>
                ))}
              </select>
            </div>
          </div>

          {filteredApps.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-xl border border-[#EDE6D6] space-y-2">
              <Users className="w-8 h-8 text-neutral-300 mx-auto" />
              <p className="text-xs font-bold text-neutral-600">Không tìm thấy hồ sơ ứng tuyển phù hợp bộ lọc.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredApps.map((app) => (
                <div key={app.id} className="bg-white p-5 rounded-2xl border border-[#EDE6D6] shadow-sm space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex items-start gap-3.5">
                      <div className="w-11 h-11 rounded-full bg-[#2D4738] text-white font-bold text-sm flex items-center justify-center shrink-0">
                        {app.candidateName ? app.candidateName.charAt(0) : 'U'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-[#1B2C24]">{app.candidateName || 'Ứng viên ẩn danh'}</h3>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              app.status === 'interview'
                                ? 'bg-amber-100 text-amber-800'
                                : app.status === 'accepted'
                                ? 'bg-emerald-100 text-emerald-800'
                                : app.status === 'rejected'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {app.statusText}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-[#385A45] mt-0.5">Ứng tuyển: {app.jobTitle}</p>
                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-neutral-500 mt-1">
                          {app.candidateEmail && (
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3 text-neutral-400" />
                              {app.candidateEmail}
                            </span>
                          )}
                          {app.candidatePhone && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-neutral-400" />
                              {app.candidatePhone}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-neutral-400" />
                            {app.appliedDate}
                          </span>
                        </div>
                        {app.candidateBio && (
                          <p className="text-[11px] text-neutral-600 mt-1.5 italic bg-[#FBF9F4] p-2 rounded-lg border border-[#EDE6D6]">
                            "{app.candidateBio}"
                          </p>
                        )}
                      </div>
                    </div>

                    {/* CV file button */}
                    <button
                      onClick={() => setViewingCVApp(app)}
                      className="px-3 py-1.5 rounded-xl border border-[#DED3BD] hover:bg-[#F5F1E8] text-xs font-semibold text-[#2D4738] flex items-center gap-1.5 self-start sm:self-auto"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Xem CV ({app.cvAttachedName})</span>
                    </button>
                  </div>

                  {/* Interview details if already scheduled */}
                  {app.status === 'interview' && app.interviewDate && (
                    <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-amber-900">
                        <Calendar className="w-3.5 h-3.5 text-amber-700" />
                        <span>Lịch phỏng vấn: {app.interviewDate}</span>
                        <span className="text-[10px] font-normal px-1.5 py-0.2 rounded bg-amber-200/60 ml-1">
                          {app.interviewFormat}
                        </span>
                      </div>
                      <p className="text-[11px] text-amber-800">Địa điểm/Link: {app.interviewLocation}</p>
                    </div>
                  )}

                  {/* Action Buttons Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#F5F1E8]">
                    <span className="text-[11px] text-neutral-400">
                      Ghi chú: {app.hrNotes || 'Chưa có ghi chú nội bộ'}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setInterviewApp(app)}
                        className="px-3 py-1.5 rounded-lg bg-[#2D4738] hover:bg-[#385A45] text-white text-xs font-semibold flex items-center gap-1 shadow-2xs"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Mời phỏng vấn</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedChatCandidate(app.candidateName || '');
                          setActiveTab('interview_messages');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#DED3BD] hover:bg-[#F5F1E8] text-[#1B2C24] text-xs font-semibold flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                        <span>Nhắn tin</span>
                      </button>

                      <button
                        onClick={() => onUpdateApplicationStatus(app.id, 'accepted', 'Hồ sơ đã được phê duyệt trúng tuyển.')}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold"
                      >
                        Trúng tuyển
                      </button>

                      <button
                        onClick={() => onUpdateApplicationStatus(app.id, 'rejected', 'Hồ sơ chưa phù hợp ở thời điểm hiện tại.')}
                        className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-semibold"
                      >
                        Từ chối
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: INTERVIEW MESSAGES */}
      {activeTab === 'interview_messages' && (
        <div className="bg-white rounded-2xl border border-[#EDE6D6] shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-3 min-h-[500px]">
          {/* Candidates conversation list */}
          <div className="border-r border-[#EDE6D6] p-4 bg-[#FBF9F4] space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D4738]">Danh sách ứng viên</h3>
            <div className="space-y-1.5">
              {applications.map((app) => {
                const name = app.candidateName || 'Ứng viên';
                const isSelected = selectedChatCandidate === name;
                return (
                  <div
                    key={app.id}
                    onClick={() => setSelectedChatCandidate(name)}
                    className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-center gap-2.5 ${
                      isSelected ? 'bg-[#2D4738] text-white shadow-2xs' : 'bg-white hover:bg-[#F5F1E8] text-[#1B2C24]'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center shrink-0 ${isSelected ? 'bg-white text-[#2D4738]' : 'bg-[#EDE6D6] text-[#2D4738]'}`}>
                      {name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold truncate">{name}</p>
                      <p className={`text-[10px] truncate ${isSelected ? 'text-emerald-200' : 'text-neutral-500'}`}>
                        {app.jobTitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chat composer & quick templates */}
          <div className="md:col-span-2 p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F5F1E8]">
                <div>
                  <h3 className="text-sm font-bold text-[#1B2C24]">
                    Trao đổi phỏng vấn với: <span className="text-[#2D4738]">{selectedChatCandidate || 'Chọn ứng viên'}</span>
                  </h3>
                  <p className="text-[11px] text-neutral-400">Gửi lời mời phỏng vấn trực tiếp, Google Meet hoặc yêu cầu bổ sung thông tin</p>
                </div>
              </div>

              {/* Fast Interview Template Buttons */}
              <div className="mt-4 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A7D5C] block">
                  Mẫu tin nhắn phỏng vấn nhanh (1 chạm để gửi):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => handleSendChat(`Chào bạn ${selectedChatCandidate}, Trung tâm ${user.companyName || 'Seoul Link'} trân trọng mời bạn tham dự buổi phỏng vấn trực tiếp vào 14:30 Thứ Năm tuần này tại văn phòng 142 Đinh Tiên Hoàng, Quận 1. Bạn vui lòng xác nhận nhé!`)}
                    className="p-2.5 rounded-xl border border-[#DED3BD] hover:border-[#385A45] hover:bg-[#FBF9F4] text-left transition-all"
                  >
                    <p className="font-bold text-[#1B2C24] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Mời PV trực tiếp tại văn phòng</span>
                    </p>
                    <p className="text-[10px] text-neutral-500 mt-1 line-clamp-1">Hẹn lúc 14:30 Thứ Năm tại văn phòng Q.1</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendChat(`Chào bạn ${selectedChatCandidate}, chúng tôi xin gửi bạn lời mời phỏng vấn Online qua Google Meet vào lúc 10:00 sáng Thứ Sáu. Link tham gia: https://meet.google.com/interview-${Date.now().toString().slice(-4)}`)}
                    className="p-2.5 rounded-xl border border-[#DED3BD] hover:border-[#385A45] hover:bg-[#FBF9F4] text-left transition-all"
                  >
                    <p className="font-bold text-[#1B2C24] flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-blue-700" />
                      <span>Mời PV Online (Google Meet)</span>
                    </p>
                    <p className="text-[10px] text-neutral-500 mt-1 line-clamp-1">Gửi kèm đường dẫn họp trực tuyến Google Meet</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendChat(`Chào bạn ${selectedChatCandidate}, hồ sơ của bạn rất tốt! Bạn vui lòng gửi thêm thông tin bảng điểm hoặc chứng chỉ ngoại ngữ liên quan để phòng nhân sự hoàn tất đánh giá nhé.`)}
                    className="p-2.5 rounded-xl border border-[#DED3BD] hover:border-[#385A45] hover:bg-[#FBF9F4] text-left transition-all"
                  >
                    <p className="font-bold text-[#1B2C24] flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-700" />
                      <span>Yêu cầu bổ sung chứng chỉ / CV</span>
                    </p>
                    <p className="text-[10px] text-neutral-500 mt-1 line-clamp-1">Yêu cầu bổ sung bảng điểm hoặc chứng chỉ</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendChat(`Chúc mừng bạn ${selectedChatCandidate}! Sau buổi phỏng vấn, ban lãnh đạo quyết định trúng tuyển bạn. Hẹn bạn vào Thứ Hai tuần sau đến làm thủ tục nhận việc nhé!`)}
                    className="p-2.5 rounded-xl border border-[#DED3BD] hover:border-[#385A45] hover:bg-[#FBF9F4] text-left transition-all"
                  >
                    <p className="font-bold text-[#1B2C24] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-700" />
                      <span>Thông báo kết quả trúng tuyển</span>
                    </p>
                    <p className="text-[10px] text-neutral-500 mt-1 line-clamp-1">Chúc mừng và hẹn ngày nhận việc</p>
                  </button>
                </div>
              </div>
            </div>

            {/* Message input */}
            <div className="space-y-2 pt-4 border-t border-[#F5F1E8]">
              <label className="text-xs font-semibold text-neutral-700 block">
                Soạn tin nhắn riêng cho {selectedChatCandidate}:
              </label>
              <div className="flex gap-2">
                <textarea
                  rows={3}
                  value={chatInputText}
                  onChange={(e) => setChatInputText(e.target.value)}
                  placeholder={`Nhập nội dung trao đổi hoặc dặn dò phỏng vấn gửi đến ${selectedChatCandidate}...`}
                  className="flex-1 p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                />
                <button
                  type="button"
                  onClick={() => handleSendChat()}
                  disabled={!chatInputText.trim() || !selectedChatCandidate}
                  className="px-4 bg-[#2D4738] hover:bg-[#385A45] disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm self-end h-10"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Gửi tin</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: POST JOB */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#DED3BD] overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 bg-[#1B2C24] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-300" />
                <h3 className="text-sm font-bold">Đăng bài tuyển dụng mới</h3>
              </div>
              <button onClick={() => setShowPostModal(false)} className="p-1 rounded-lg text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {postSuccess ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-[#1B2C24]">Đăng tin tuyển dụng thành công!</h4>
                <p className="text-xs text-neutral-500">Tin đã được kích hoạt và xuất hiện trên bảng tìm việc của ứng viên.</p>
              </div>
            ) : (
              <form onSubmit={handlePostSubmit} className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Tiêu đề công việc:</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Ví dụ: Trợ giảng tiếng Hàn Part-time / Nhân viên CSKH ca tối"
                    className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-neutral-700 block mb-1">Hình thức làm việc:</label>
                    <select
                      value={newWorkType}
                      onChange={(e) => setNewWorkType(e.target.value as WorkType)}
                      className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl"
                    >
                      <option value="Toàn thời gian">Toàn thời gian</option>
                      <option value="Bán thời gian (Part-time)">Bán thời gian (Part-time)</option>
                      <option value="Ca tối">Ca tối</option>
                      <option value="Làm việc từ xa (Remote)">Làm việc từ xa (Remote)</option>
                      <option value="Linh hoạt">Linh hoạt</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-neutral-700 block mb-1">Kinh nghiệm yêu cầu:</label>
                    <select
                      value={newExperience}
                      onChange={(e) => setNewExperience(e.target.value as ExperienceLevel)}
                      className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl"
                    >
                      <option value="Chưa có kinh nghiệm">Chưa có kinh nghiệm</option>
                      <option value="Dưới 1 năm">Dưới 1 năm</option>
                      <option value="1 - 3 năm">1 - 3 năm</option>
                      <option value="Trên 3 năm">Trên 3 năm</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-neutral-700 block mb-1">Mức lương tối thiểu (triệu VND):</label>
                    <input
                      type="number"
                      value={newSalaryMin}
                      onChange={(e) => setNewSalaryMin(Number(e.target.value))}
                      className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-neutral-700 block mb-1">Mức lương tối đa (triệu VND):</label>
                    <input
                      type="number"
                      value={newSalaryMax}
                      onChange={(e) => setNewSalaryMax(Number(e.target.value))}
                      className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-neutral-700 block mb-1">Khu vực / Quận:</label>
                    <select
                      value={newDistrict}
                      onChange={(e) => setNewDistrict(e.target.value)}
                      className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl"
                    >
                      {DISTRICTS_HCM.filter((d) => d !== 'Tất cả khu vực').map((dist) => (
                        <option key={dist} value={dist}>{dist}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-neutral-700 block mb-1">Địa chỉ chi tiết nơi làm việc:</label>
                    <input
                      type="text"
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Lịch làm việc / Ca làm:</label>
                  <input
                    type="text"
                    value={newSchedule}
                    onChange={(e) => setNewSchedule(e.target.value)}
                    className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Mô tả công việc:</label>
                  <textarea
                    rows={3}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Mô tả công việc chính hàng ngày..."
                    className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Yêu cầu ứng viên (mỗi yêu cầu 1 dòng):</label>
                  <textarea
                    rows={3}
                    value={newRequirements}
                    onChange={(e) => setNewRequirements(e.target.value)}
                    placeholder="Giao tiếp tiếng Hàn hoặc tiếng Anh&#10;Chăm chỉ, nhanh nhẹn&#10;Có máy tính cá nhân"
                    className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Quyền lợi & Phúc lợi (mỗi quyền lợi 1 dòng):</label>
                  <textarea
                    rows={2}
                    value={newBenefits}
                    onChange={(e) => setNewBenefits(e.target.value)}
                    placeholder="Lương thưởng theo năng lực&#10;Đào tạo chuyên sâu"
                    className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPostModal(false)}
                    className="px-4 py-2 rounded-xl border border-[#DED3BD] text-neutral-700 font-semibold"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#2D4738] hover:bg-[#385A45] text-white font-bold"
                  >
                    Xác nhận đăng bài tuyển dụng
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL: SCHEDULE INTERVIEW */}
      {interviewApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#DED3BD] overflow-hidden">
            <div className="px-6 py-4 bg-[#1B2C24] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-300" />
                <h3 className="text-sm font-bold">Mời phỏng vấn: {interviewApp.candidateName}</h3>
              </div>
              <button onClick={() => setInterviewApp(null)} className="p-1 rounded-lg text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Vị trí ứng tuyển:</label>
                <p className="font-bold text-[#2D4738]">{interviewApp.jobTitle}</p>
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Thời gian phỏng vấn:</label>
                <input
                  type="text"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Hình thức phỏng vấn:</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Trực tiếp tại văn phòng', 'Online Google Meet'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => {
                        setInterviewFormat(fmt);
                        if (fmt === 'Online Google Meet') {
                          setInterviewLocation('https://meet.google.com/interview-room-recruiter');
                        } else {
                          setInterviewLocation('Văn phòng tuyển dụng - 142 Đinh Tiên Hoàng, P. Đa Kao, Quận 1');
                        }
                      }}
                      className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                        interviewFormat === fmt ? 'bg-[#2D4738] text-white' : 'bg-white text-neutral-700 border-[#DED3BD]'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Địa điểm hoặc Link Google Meet:</label>
                <input
                  type="text"
                  value={interviewLocation}
                  onChange={(e) => setInterviewLocation(e.target.value)}
                  className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Lời nhắn / Dặn dò ứng viên:</label>
                <textarea
                  rows={3}
                  value={interviewNote}
                  onChange={(e) => setInterviewNote(e.target.value)}
                  className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl leading-relaxed"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setInterviewApp(null)}
                  className="px-4 py-2 rounded-xl border border-[#DED3BD] text-neutral-700 font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleSendInterview}
                  className="px-5 py-2 rounded-xl bg-[#2D4738] hover:bg-[#385A45] text-white font-bold flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Xác nhận gửi lời mời phỏng vấn</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: VIEW CANDIDATE CV */}
      {viewingCVApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#DED3BD] overflow-hidden">
            <div className="px-6 py-4 bg-[#1B2C24] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-300" />
                <h3 className="text-sm font-bold">Hồ sơ ứng viên: {viewingCVApp.candidateName}</h3>
              </div>
              <button onClick={() => setViewingCVApp(null)} className="p-1 rounded-lg text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-[#FBF9F4] border border-[#EDE6D6] space-y-2">
                <p><span className="font-semibold text-neutral-500">Họ và tên:</span> <span className="font-bold text-[#1B2C24]">{viewingCVApp.candidateName}</span></p>
                <p><span className="font-semibold text-neutral-500">Email:</span> {viewingCVApp.candidateEmail || 'Chưa cung cấp'}</p>
                <p><span className="font-semibold text-neutral-500">Số điện thoại:</span> {viewingCVApp.candidatePhone || 'Chưa cung cấp'}</p>
                <p><span className="font-semibold text-neutral-500">Vị trí ứng tuyển:</span> {viewingCVApp.jobTitle}</p>
                <p><span className="font-semibold text-neutral-500">Tệp CV đính kèm:</span> <span className="font-mono font-semibold text-[#2D4738]">{viewingCVApp.cvAttachedName}</span></p>
              </div>

              {viewingCVApp.candidateBio && (
                <div>
                  <h4 className="font-bold text-[#2D4738] mb-1">Tóm tắt năng lực & Mục tiêu nghề nghiệp:</h4>
                  <p className="text-neutral-600 bg-[#FAF8F2] p-3 rounded-xl border border-[#DED3BD] leading-relaxed">
                    {viewingCVApp.candidateBio}
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => {
                    setViewingCVApp(null);
                    setInterviewApp(viewingCVApp);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#2D4738] text-white font-bold"
                >
                  Mời phỏng vấn ứng viên này
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
