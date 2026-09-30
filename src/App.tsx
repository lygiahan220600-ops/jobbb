import React, { useState } from 'react';
import { Sidebar, NavScreen } from './components/Sidebar';
import { Header } from './components/Header';
import { HomeView } from './components/views/HomeView';
import { JobSearchView } from './components/views/JobSearchView';
import { ApplicationsView } from './components/views/ApplicationsView';
import { CVBuilderView } from './components/views/CVBuilderView';
import { SavedJobsView } from './components/views/SavedJobsView';
import { ChatView } from './components/views/ChatView';
import { CareerTestView } from './components/views/CareerTestView';
import { ProfileView } from './components/views/ProfileView';
import { RecruiterDashboardView } from './components/recruiter/RecruiterDashboardView';
import { RecruiterProfileView } from './components/recruiter/RecruiterProfileView';
import { AIFinderModal } from './components/AIFinderModal';
import { JobDetailModal } from './components/JobDetailModal';
import { AuthModal } from './components/AuthModal';
import { NotificationToast } from './components/NotificationToast';

import { Job, UserProfile, CVData, Application, Conversation, NotificationItem, Language, Currency } from './types/job';
import { INITIAL_JOBS } from './data/mockJobs';
import {
  DEFAULT_EMPTY_PROFILE,
  DEFAULT_EMPTY_CV,
  INITIAL_APPLICATIONS,
  INITIAL_CONVERSATIONS,
  INITIAL_NOTIFICATIONS
} from './data/mockUserData';

export default function App() {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<NavScreen>('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [lang, setLang] = useState<Language>('vi');
  const [currency, setCurrency] = useState<Currency>('VND');

  // App Data State: Jobs, UserProfile, Applications, Conversations
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);

  // User Profile: Default is completely empty with empty avatar so user can edit. When logging out, it returns to empty.
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('job_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Clear old test accounts with hardcoded names if present
        if (
          parsed.fullName === 'Nguyễn Thu Uyên' ||
          parsed.fullName === 'Lý Gia Hân' ||
          parsed.email === 'lygiahan220600@gmail.com' ||
          parsed.email?.includes('thuuyen')
        ) {
          localStorage.removeItem('job_user_profile');
          return DEFAULT_EMPTY_PROFILE;
        }
        return {
          ...DEFAULT_EMPTY_PROFILE,
          ...parsed,
          avatar: parsed.avatar || '',
        };
      }
    } catch (e) {
      console.error('Error loading saved user profile:', e);
    }
    return DEFAULT_EMPTY_PROFILE;
  });

  const [cvData, setCvData] = useState<CVData>(() => {
    try {
      const saved = localStorage.getItem('job_user_cv');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_EMPTY_CV;
  });

  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set(['job-1', 'job-3']));

  // Search query in Header
  const [globalSearch, setGlobalSearch] = useState('');

  // Modals State
  const [isAIFinderOpen, setIsAIFinderOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedJobForDetail, setSelectedJobForDetail] = useState<Job | null>(null);

  // Floating Toast State
  const [activeToast, setActiveToast] = useState<NotificationItem | null>(null);

  // Screen titles localized
  const screenTitlesMap: Record<Language, Record<NavScreen, string>> = {
    vi: {
      home: 'Trang chủ',
      search: 'Tìm kiếm việc làm',
      applications: 'Theo dõi hồ sơ ứng tuyển',
      cv: 'CV cá nhân & Chuẩn ATS',
      saved: 'Việc làm đã lưu',
      chat: 'Trao đổi với nhà tuyển dụng',
      test: 'Trắc nghiệm định hướng nghề nghiệp',
      profile: 'Trang cá nhân ứng viên',
      recruiter_dashboard: 'Bảng tin tuyển dụng & Tổng quan',
      recruiter_jobs: 'Đăng tin & Quản lý việc làm',
      recruiter_applications: 'Duyệt hồ sơ & Ứng viên',
      recruiter_chat: 'Tin nhắn & Phỏng vấn',
      recruiter_profile: 'Hồ sơ Doanh nghiệp',
    },
    en: {
      home: 'Home',
      search: 'Search Jobs & Openings',
      applications: 'Application Tracker',
      cv: 'ATS Resume Builder',
      saved: 'Saved Jobs',
      chat: 'Recruiter Chat',
      test: 'Career Orientation Quiz',
      profile: 'Candidate Profile',
      recruiter_dashboard: 'Recruitment Dashboard',
      recruiter_jobs: 'Manage Job Postings',
      recruiter_applications: 'Review Applications',
      recruiter_chat: 'Interview Messenger',
      recruiter_profile: 'Company Profile',
    },
    ko: {
      home: '홈',
      search: '일자리 검색 및 필터',
      applications: '지원 현황 관리',
      cv: 'ATS 이력서 관리',
      saved: '스크랩한 공고',
      chat: '채용담당자 대화',
      test: '진로 적성 검사',
      profile: '내 프로필 설정',
      recruiter_dashboard: '기업 채용 대시보드',
      recruiter_jobs: '채용공고 등록 및 관리',
      recruiter_applications: '지원자 서류 심사',
      recruiter_chat: '면접 메시지 발송',
      recruiter_profile: '기업 정보 설정',
    },
  };

  const currentScreenTitle = screenTitlesMap[lang][currentScreen] || screenTitlesMap.vi[currentScreen] || 'Job Tuyển dụng';

  // 1. Toggle Bookmark / Save Job
  const handleToggleSave = (jobId: string) => {
    setSavedJobIds((prev) => {
      const next = new Set(prev);
      if (next.has(jobId)) {
        next.delete(jobId);
      } else {
        next.add(jobId);
      }
      return next;
    });
  };

  // 2. Add In-App Notification & Trigger Toast
  const handleAddNotification = (notif: NotificationItem) => {
    setNotifications((prev) => [notif, ...prev]);
    setActiveToast(notif);
  };

  // 3. Apply to Job Handler (Candidate action)
  const handleApplyJob = (job: Job, cvName: string, coverNote: string) => {
    const candidateDisplayName = user.fullName || 'Ứng viên mới';
    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      companyName: job.company,
      companyLogo: job.companyLogo,
      candidateName: candidateDisplayName,
      candidateEmail: user.email || 'ungvien@email.com',
      candidatePhone: user.phone || '0901 234 567',
      candidateAvatar: user.avatar || '',
      candidateMajor: user.major || 'Đại học / Chuyên môn',
      candidateBio: coverNote || user.bio || 'Mong muốn được cống hiến cho công ty.',
      appliedDate: new Date().toLocaleDateString('vi-VN'),
      status: 'submitted',
      statusText: 'Đã ứng tuyển',
      hrNotes: `Ứng viên đã nộp CV "${cvName}". Lời nhắn: "${coverNote}"`,
      cvAttachedName: cvName,
      updatedAt: 'Vừa xong',
    };

    setApplications((prev) => [newApp, ...prev]);

    // Send confirmation notification
    const confNotif: NotificationItem = {
      id: `notif-app-${Date.now()}`,
      title: `Ứng tuyển thành công: ${job.title}`,
      message: `Hồ sơ của bạn đã được chuyển đến bộ phận nhân sự của ${job.company}. Bạn có thể theo dõi tiến độ trong mục Theo dõi hồ sơ.`,
      type: 'application_update',
      timestamp: 'Vừa xong',
      read: false,
      jobId: job.id,
    };
    handleAddNotification(confNotif);
  };

  // 4. Send Chat Message to Recruiter Handler
  const handleSendMessage = (
    convId: string,
    text: string,
    attachment?: { name: string; size: string }
  ) => {
    const senderName = user.fullName || 'Ứng viên';
    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: user.id,
      senderType: 'user' as const,
      senderName,
      text,
      timestamp: 'Vừa xong',
      cvAttachment: attachment,
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === convId) {
          return {
            ...c,
            lastMessage: text,
            lastMessageTime: 'Vừa xong',
            messages: [...c.messages, newMessage],
          };
        }
        return c;
      })
    );

    // Simulated Smart Employer Auto-Reply after 1.5 seconds
    setTimeout(() => {
      const activeConv = conversations.find((c) => c.id === convId);
      if (!activeConv) return;

      const replyText = attachment
        ? `Cảm ơn ${senderName} đã gửi CV! Phòng Tuyển dụng ${activeConv.companyName} đã tiếp nhận và sẽ liên hệ xếp lịch phỏng vấn sớm nhất.`
        : `Chào ${senderName}, bộ phận tuyển dụng đã nhận được tin nhắn của bạn và sẽ phản hồi trong thời gian sớm nhất!`;

      const recruiterReply = {
        id: `msg-rep-${Date.now()}`,
        senderId: activeConv.recruiter.id,
        senderType: 'recruiter' as const,
        senderName: activeConv.recruiter.name,
        text: replyText,
        timestamp: 'Vừa xong',
      };

      setConversations((latest) =>
        latest.map((c) => {
          if (c.id === convId) {
            return {
              ...c,
              lastMessage: replyText,
              lastMessageTime: 'Vừa xong',
              messages: [...c.messages, recruiterReply],
            };
          }
          return c;
        })
      );

      handleAddNotification({
        id: `notif-chat-${Date.now()}`,
        title: `Tin nhắn mới từ ${activeConv.recruiter.name}`,
        message: replyText,
        type: 'message',
        timestamp: 'Vừa xong',
        read: false,
      });
    }, 1500);
  };

  // 5. Start Chat with Job's Recruiter
  const handleStartChatWithJob = (job: Job) => {
    let conv = conversations.find((c) => c.jobId === job.id || c.recruiter.id === job.recruiter.id);
    const candidateName = user.fullName || 'Ứng viên';
    if (!conv) {
      conv = {
        id: `conv-${Date.now()}`,
        recruiter: job.recruiter,
        companyName: job.company,
        jobId: job.id,
        jobTitle: job.title,
        candidateName,
        lastMessage: `Xin chào! Tôi quan tâm đến vị trí ${job.title}`,
        lastMessageTime: 'Vừa xong',
        unreadCount: 0,
        messages: [
          {
            id: `msg-init-${Date.now()}`,
            senderId: user.id,
            senderType: 'user',
            senderName: candidateName,
            text: `Chào anh/chị phụ trách tuyển dụng tại ${job.company}, em là ${candidateName}. Em rất quan tâm đến vị trí "${job.title}" và muốn trao đổi thêm về lịch làm việc ạ.`,
            timestamp: 'Vừa xong',
          },
        ],
      };
      setConversations((prev) => [conv!, ...prev]);
    }
    setCurrentScreen('chat');
  };

  // Check if current user has already applied to a job
  const hasUserApplied = (jobId: string) => {
    return applications.some((app) => app.jobId === jobId);
  };

  // 6. Handle User Profile Updates & Persistence
  const handleUpdateUserProfile = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    try {
      localStorage.setItem('job_user_profile', JSON.stringify(updatedUser));
    } catch (e) {
      console.error('Failed to save user profile to localStorage:', e);
    }
  };

  // 7. Handle User Logout: Return to completely empty default profile and empty avatar!
  const handleLogout = () => {
    setUser(DEFAULT_EMPTY_PROFILE);
    try {
      localStorage.removeItem('job_user_profile');
      localStorage.removeItem('job_user_cv');
    } catch (e) {
      console.error(e);
    }
    setCvData(DEFAULT_EMPTY_CV);
    setCurrentScreen('home');
    handleAddNotification({
      id: `notif-logout-${Date.now()}`,
      title: 'Đã đăng xuất',
      message: 'Tài khoản đã đăng xuất. Toàn bộ thông tin cá nhân và ảnh đại diện đã trở về trạng thái trống mặc định.',
      type: 'message',
      timestamp: 'Vừa xong',
      read: false,
    });
  };

  // 8. Handle Role Switch (Ứng viên <-> Nhà tuyển dụng)
  const handleToggleRole = () => {
    const isCurrentlyRecruiter = user.role === 'recruiter';
    const nextRole = isCurrentlyRecruiter ? 'candidate' : 'recruiter';

    const updatedUser: UserProfile = {
      ...user,
      role: nextRole,
    };

    handleUpdateUserProfile(updatedUser);

    if (nextRole === 'recruiter') {
      setCurrentScreen('recruiter_dashboard');
      handleAddNotification({
        id: `notif-role-${Date.now()}`,
        title: 'Chuyển sang giao diện Nhà tuyển dụng',
        message: 'Bạn đang ở cổng Doanh nghiệp với các tính năng đăng bài, duyệt hồ sơ và gửi tin nhắn phỏng vấn.',
        type: 'job_alert',
        timestamp: 'Vừa xong',
        read: false,
      });
    } else {
      setCurrentScreen('home');
      handleAddNotification({
        id: `notif-role-${Date.now()}`,
        title: 'Chuyển sang giao diện Ứng viên',
        message: 'Bạn đang ở giao diện tìm kiếm việc làm, tạo CV và theo dõi đơn ứng tuyển.',
        type: 'job_alert',
        timestamp: 'Vừa xong',
        read: false,
      });
    }
  };

  // 9. Recruiter Feature: Post New Job
  const handlePostJob = (jobData: Partial<Job>) => {
    const newJob: Job = {
      id: `job-${Date.now()}`,
      title: jobData.title || 'Vị trí mới',
      company: jobData.company || user.companyName || 'Công ty Tuyển dụng',
      companyLogo: jobData.companyLogo || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=120&auto=format&fit=crop&q=80',
      location: jobData.location || {
        district: user.district || 'Quận 1',
        city: 'TP. Hồ Chí Minh',
        fullAddress: user.companyAddress || '142 Đinh Tiên Hoàng, Quận 1',
      },
      distanceKm: 1.5,
      salaryRange: jobData.salaryRange || '8 - 15 triệu',
      salaryMin: jobData.salaryMin || 8,
      salaryMax: jobData.salaryMax || 15,
      currency: 'VND',
      workType: jobData.workType || 'Toàn thời gian',
      industry: jobData.industry || 'Dịch vụ & Ngôn ngữ',
      experienceLevel: jobData.experienceLevel || 'Chưa có kinh nghiệm',
      scheduleDetails: jobData.scheduleDetails || 'Linh hoạt ca làm',
      description: jobData.description || 'Tuyển dụng nhân sự nhiệt tình, có trách nhiệm.',
      requirements: jobData.requirements || ['Giao tiếp tốt', 'Nhiệt tình'],
      benefits: jobData.benefits || ['Lương thưởng cạnh tranh', 'Môi trường chuyên nghiệp'],
      postedTime: 'Vừa xong',
      status: 'active',
      applicantCount: 0,
      urgent: true,
      recruiter: {
        id: user.id || 'rec-01',
        name: user.fullName || 'Phòng Tuyển dụng',
        position: user.recruiterPosition || 'Trưởng phòng Nhân sự',
        avatar: user.avatar || '',
        online: true,
        email: user.email || 'hr@company.com',
        phone: user.phone || '0903 821 445',
      },
    };

    setJobs((prev) => [newJob, ...prev]);

    handleAddNotification({
      id: `notif-job-posted-${Date.now()}`,
      title: 'Đăng tin tuyển dụng thành công!',
      message: `Tin tuyển dụng "${newJob.title}" đã được duyệt và đang hiển thị cho các ứng viên.`,
      type: 'job_alert',
      timestamp: 'Vừa xong',
      read: false,
      jobId: newJob.id,
    });
  };

  // 10. Recruiter Feature: Toggle Job Active / Paused Status
  const handleToggleJobStatus = (jobId: string) => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id === jobId) {
          const nextStatus = j.status === 'paused' ? 'active' : 'paused';
          return { ...j, status: nextStatus };
        }
        return j;
      })
    );
  };

  // 11. Recruiter Feature: Update Application Status & Schedule Interview
  const handleUpdateApplicationStatus = (
    appId: string,
    status: Application['status'],
    notes?: string,
    interviewDetails?: { date: string; format: 'Online Google Meet' | 'Trực tiếp tại văn phòng'; location: string }
  ) => {
    const statusLabels: Record<Application['status'], string> = {
      submitted: 'Mới nộp',
      reviewing: 'Đang xem xét',
      interview: 'Đã mời phỏng vấn',
      accepted: 'Đã trúng tuyển',
      rejected: 'Đã từ chối',
    };

    setApplications((prev) =>
      prev.map((a) => {
        if (a.id === appId) {
          return {
            ...a,
            status,
            statusText: statusLabels[status],
            hrNotes: notes || a.hrNotes,
            interviewDate: interviewDetails?.date || a.interviewDate,
            interviewFormat: interviewDetails?.format || a.interviewFormat,
            interviewLocation: interviewDetails?.location || a.interviewLocation,
            updatedAt: 'Vừa xong',
          };
        }
        return a;
      })
    );

    handleAddNotification({
      id: `notif-status-${Date.now()}`,
      title: `Cập nhật trạng thái hồ sơ`,
      message: `Đã cập nhật trạng thái hồ sơ thành "${statusLabels[status]}"`,
      type: 'application_update',
      timestamp: 'Vừa xong',
      read: false,
    });
  };

  // 12. Recruiter Feature: Send Interview Message to Candidate
  const handleSendMessageToCandidate = (candidateName: string, text: string, jobId?: string) => {
    const senderName = user.fullName || user.companyName || 'Phòng Nhân sự';
    const newMsg = {
      id: `rec-msg-${Date.now()}`,
      senderId: user.id || 'rec-01',
      senderType: 'recruiter' as const,
      senderName,
      text,
      timestamp: 'Vừa xong',
    };

    // Find conversation or create one
    const existing = conversations.find((c) => c.candidateName === candidateName);
    if (existing) {
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === existing.id) {
            return {
              ...c,
              lastMessage: text,
              lastMessageTime: 'Vừa xong',
              messages: [...c.messages, newMsg],
            };
          }
          return c;
        })
      );
    } else {
      const newConv: Conversation = {
        id: `conv-rec-${Date.now()}`,
        recruiter: {
          id: user.id || 'rec-01',
          name: senderName,
          position: user.recruiterPosition || 'Trưởng phòng Nhân sự',
          avatar: user.avatar || '',
          online: true,
          email: user.email || 'hr@company.com',
          phone: user.phone || '0903 821 445',
        },
        companyName: user.companyName || 'Seoul Link',
        jobId: jobId || 'job-1',
        jobTitle: 'Trao đổi phỏng vấn',
        candidateName,
        lastMessage: text,
        lastMessageTime: 'Vừa xong',
        unreadCount: 0,
        messages: [newMsg],
      };
      setConversations((prev) => [newConv, ...prev]);
    }
  };

  const unreadMessagesCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1B2C24] flex">
      {/* 1. Left Vertical Sidebar Navigation */}
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        user={user}
        unreadMessagesCount={unreadMessagesCount}
        unreadNotificationsCount={unreadNotificationsCount}
        activeApplicationsCount={applications.length}
        savedJobsCount={savedJobIds.size}
        onOpenAIFinder={() => setIsAIFinderOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onToggleRole={handleToggleRole}
        lang={lang}
      />

      {/* 2. Right Workspace Content Area */}
      <div
        className={`flex-1 transition-all duration-300 min-w-0 flex flex-col min-h-screen ${
          sidebarCollapsed ? 'ml-20' : 'ml-64 lg:ml-72'
        }`}
      >
        {/* Top Header */}
        <Header
          currentScreen={currentScreen}
          screenTitle={currentScreenTitle}
          user={user}
          notifications={notifications}
          onOpenAIFinder={() => setIsAIFinderOpen(true)}
          onNavigate={(screen) => setCurrentScreen(screen)}
          onSelectJobId={(id) => {
            const j = jobs.find((item) => item.id === id);
            if (j) setSelectedJobForDetail(j);
          }}
          onMarkNotificationsRead={() => {
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
          }}
          onOpenAuth={() => setIsAuthOpen(true)}
          searchQuery={globalSearch}
          onSearchChange={(q) => {
            setGlobalSearch(q);
            if (currentScreen !== 'search' && q.trim().length > 0) {
              setCurrentScreen('search');
            }
          }}
          lang={lang}
          onLanguageChange={setLang}
          currency={currency}
          onCurrencyChange={setCurrency}
        />

        {/* Main Work Area View Router */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {/* CANDIDATE VIEWS */}
          {currentScreen === 'home' && (
            <HomeView
              jobs={jobs}
              user={user}
              savedJobIds={savedJobIds}
              onToggleSave={handleToggleSave}
              onSelectJob={(job) => setSelectedJobForDetail(job)}
              onStartChat={handleStartChatWithJob}
              onNavigate={(screen) => setCurrentScreen(screen)}
              onOpenAIFinder={() => setIsAIFinderOpen(true)}
              onUpdateRadius={(rad) => handleUpdateUserProfile({ ...user, radiusKm: rad })}
              lang={lang}
              currency={currency}
            />
          )}

          {currentScreen === 'search' && (
            <JobSearchView
              jobs={jobs}
              savedJobIds={savedJobIds}
              onToggleSave={handleToggleSave}
              onSelectJob={(job) => setSelectedJobForDetail(job)}
              onStartChat={handleStartChatWithJob}
              searchQuery={globalSearch}
              onSearchChange={setGlobalSearch}
              user={user}
              onUpdateUser={handleUpdateUserProfile}
              lang={lang}
              currency={currency}
              onCurrencyChange={setCurrency}
            />
          )}

          {currentScreen === 'applications' && (
            <ApplicationsView
              applications={applications}
              jobs={jobs}
              onSelectJob={(job) => setSelectedJobForDetail(job)}
              onStartChat={handleStartChatWithJob}
              lang={lang}
            />
          )}

          {currentScreen === 'cv' && (
            <CVBuilderView
              cvData={cvData}
              onUpdateCV={setCvData}
              user={user}
              lang={lang}
            />
          )}

          {currentScreen === 'saved' && (
            <SavedJobsView
              jobs={jobs}
              savedJobIds={savedJobIds}
              onToggleSave={handleToggleSave}
              onSelectJob={(job) => setSelectedJobForDetail(job)}
              onStartChat={handleStartChatWithJob}
              onNavigate={(screen) => setCurrentScreen(screen)}
              lang={lang}
              currency={currency}
            />
          )}

          {currentScreen === 'chat' && (
            <ChatView
              conversations={conversations}
              onSendMessage={handleSendMessage}
              jobs={jobs}
              onSelectJob={(job) => setSelectedJobForDetail(job)}
              user={user}
              lang={lang}
            />
          )}

          {currentScreen === 'test' && (
            <CareerTestView
              jobs={jobs}
              onSelectJob={(job) => setSelectedJobForDetail(job)}
              onStartChat={handleStartChatWithJob}
              lang={lang}
              currency={currency}
            />
          )}

          {currentScreen === 'profile' && (
            <ProfileView
              user={user}
              onUpdateUser={handleUpdateUserProfile}
              onOpenAuth={() => setIsAuthOpen(true)}
              onLogout={handleLogout}
              lang={lang}
            />
          )}

          {/* RECRUITER VIEWS */}
          {(currentScreen === 'recruiter_dashboard' ||
            currentScreen === 'recruiter_jobs' ||
            currentScreen === 'recruiter_applications' ||
            currentScreen === 'recruiter_chat') && (
            <RecruiterDashboardView
              jobs={jobs}
              applications={applications}
              conversations={conversations}
              user={user}
              onPostJob={handlePostJob}
              onToggleJobStatus={handleToggleJobStatus}
              onUpdateApplicationStatus={handleUpdateApplicationStatus}
              onSendMessageToCandidate={handleSendMessageToCandidate}
              onNavigateToCandidateChat={(convId) => {
                setCurrentScreen('recruiter_chat');
              }}
              lang={lang}
            />
          )}

          {currentScreen === 'recruiter_profile' && (
            <RecruiterProfileView
              user={user}
              onUpdateUser={handleUpdateUserProfile}
              onOpenAuth={() => setIsAuthOpen(true)}
              onLogout={handleLogout}
              lang={lang}
            />
          )}
        </main>
      </div>

      {/* 3. Global AI Natural Language Job Matcher Modal */}
      <AIFinderModal
        isOpen={isAIFinderOpen}
        onClose={() => setIsAIFinderOpen(false)}
        jobs={jobs}
        onSelectJob={(job) => setSelectedJobForDetail(job)}
        onAddNotification={handleAddNotification}
        lang={lang}
      />

      {/* 4. Global Job Details & Application Modal */}
      <JobDetailModal
        job={selectedJobForDetail}
        isOpen={selectedJobForDetail !== null}
        onClose={() => setSelectedJobForDetail(null)}
        isSaved={selectedJobForDetail ? savedJobIds.has(selectedJobForDetail.id) : false}
        onToggleSave={handleToggleSave}
        hasApplied={selectedJobForDetail ? hasUserApplied(selectedJobForDetail.id) : false}
        onApplyJob={handleApplyJob}
        onStartChat={handleStartChatWithJob}
        user={user}
        lang={lang}
        defaultCurrency={currency}
      />

      {/* 5. Fast Authentication & Profile Switcher Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={user}
        onAddNotification={handleAddNotification}
        onSelectUser={(u) => {
          handleUpdateUserProfile(u);
          if (u.role === 'recruiter') {
            setCurrentScreen('recruiter_dashboard');
          } else {
            setCurrentScreen('home');
          }
        }}
        lang={lang}
      />

      {/* 6. Floating Instant Notification Toast */}
      <NotificationToast
        notification={activeToast}
        onClose={() => setActiveToast(null)}
        lang={lang}
        onClick={() => {
          if (activeToast?.type === 'application_update') {
            setCurrentScreen(user.role === 'recruiter' ? 'recruiter_applications' : 'applications');
          } else if (activeToast?.type === 'message') {
            setCurrentScreen(user.role === 'recruiter' ? 'recruiter_chat' : 'chat');
          } else if (activeToast?.jobId) {
            const j = jobs.find((item) => item.id === activeToast.jobId);
            if (j) setSelectedJobForDetail(j);
          }
        }}
      />
    </div>
  );
}
