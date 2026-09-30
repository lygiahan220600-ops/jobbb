import React from 'react';
import {
  Compass,
  Search,
  FileText,
  BookmarkCheck,
  Send,
  MessageSquare,
  User,
  Sparkles,
  Award,
  ChevronLeft,
  ChevronRight,
  LogOut,
  MapPin,
  Briefcase,
  Building,
  Users,
  Calendar,
  Layers,
  Repeat
} from 'lucide-react';
import { UserProfile, NavScreen, Language } from '../types/job';

interface SidebarProps {
  currentScreen: NavScreen;
  onNavigate: (screen: NavScreen) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  user: UserProfile;
  unreadMessagesCount: number;
  unreadNotificationsCount: number;
  activeApplicationsCount: number;
  savedJobsCount: number;
  onOpenAIFinder: () => void;
  onOpenAuth: () => void;
  onLogout?: () => void;
  onToggleRole?: () => void;
  lang?: Language;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  collapsed,
  onToggleCollapse,
  user,
  unreadMessagesCount,
  activeApplicationsCount,
  savedJobsCount,
  onOpenAIFinder,
  onOpenAuth,
  onLogout,
  onToggleRole,
  lang = 'vi',
}) => {
  const isRecruiter = user.role === 'recruiter';

  // Candidate Navigation Items
  const candidateNavItems = [
    {
      id: 'home' as NavScreen,
      label: 'Trang chủ',
      icon: Compass,
      badge: null,
    },
    {
      id: 'search' as NavScreen,
      label: 'Tìm việc làm',
      icon: Search,
      badge: null,
    },
    {
      id: 'applications' as NavScreen,
      label: 'Việc đã ứng tuyển',
      icon: Send,
      badge: activeApplicationsCount > 0 ? activeApplicationsCount : null,
    },
    {
      id: 'cv' as NavScreen,
      label: 'CV cá nhân',
      icon: FileText,
      badge: 'ATS',
      badgeColor: 'bg-[#385A45] text-white',
    },
    {
      id: 'saved' as NavScreen,
      label: 'Việc đã lưu',
      icon: BookmarkCheck,
      badge: savedJobsCount > 0 ? savedJobsCount : null,
    },
    {
      id: 'chat' as NavScreen,
      label: 'Chat nhà tuyển dụng',
      icon: MessageSquare,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : null,
      badgeColor: 'bg-emerald-600 text-white',
    },
    {
      id: 'test' as NavScreen,
      label: 'Test nghề nghiệp',
      icon: Award,
      badge: '10 Qs',
      badgeColor: 'bg-[#EDE6D6] text-[#2D4738]',
    },
    {
      id: 'profile' as NavScreen,
      label: 'Trang cá nhân',
      icon: User,
      badge: null,
    },
  ];

  // Recruiter Navigation Items
  const recruiterNavItems = [
    {
      id: 'recruiter_dashboard' as NavScreen,
      label: 'Bảng tin tuyển dụng',
      icon: Layers,
      badge: null,
    },
    {
      id: 'recruiter_jobs' as NavScreen,
      label: 'Đăng tin tuyển dụng',
      icon: Briefcase,
      badge: 'Mới',
      badgeColor: 'bg-emerald-600 text-white',
    },
    {
      id: 'recruiter_applications' as NavScreen,
      label: 'Duyệt hồ sơ ứng tuyển',
      icon: Users,
      badge: activeApplicationsCount > 0 ? activeApplicationsCount : null,
    },
    {
      id: 'recruiter_chat' as NavScreen,
      label: 'Tin nhắn phỏng vấn',
      icon: MessageSquare,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : null,
      badgeColor: 'bg-amber-600 text-white',
    },
    {
      id: 'recruiter_profile' as NavScreen,
      label: 'Hồ sơ doanh nghiệp',
      icon: Building,
      badge: null,
    },
  ];

  const currentNavItems = isRecruiter ? recruiterNavItems : candidateNavItems;

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-[#1B2C24] text-[#F5F1E8] transition-all duration-300 z-30 flex flex-col justify-between border-r border-[#2D4738] shadow-xl ${
        collapsed ? 'w-20' : 'w-64 lg:w-72'
      }`}
    >
      {/* Top Brand Zone */}
      <div>
        <div className="flex items-center justify-between px-5 h-20 border-b border-[#2D4738]">
          {!collapsed ? (
            <div
              className="flex items-center gap-3 overflow-hidden cursor-pointer"
              onClick={() => onNavigate(isRecruiter ? 'recruiter_dashboard' : 'home')}
            >
              <div className="w-10 h-10 rounded-xl bg-[#385A45] flex items-center justify-center text-white font-bold text-xl shadow-md border border-[#4F755D]/40 shrink-0">
                {isRecruiter ? <Building className="w-5 h-5 text-[#FAF8F2]" /> : <Briefcase className="w-5 h-5 text-[#FAF8F2]" />}
              </div>
              <div className="min-w-0">
                <h1 className="text-lg font-bold tracking-tight text-[#FAF8F2] flex items-center gap-1.5 truncate">
                  Job
                  <span className={`text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded text-[#EDE6D6] ${isRecruiter ? 'bg-amber-700' : 'bg-[#385A45]'}`}>
                    {isRecruiter ? 'Doanh nghiệp' : 'Tuyển dụng'}
                  </span>
                </h1>
                <p className="text-xs text-[#9EBFB5] truncate">
                  {isRecruiter ? 'Cổng Nhà Tuyển Dụng' : 'Nền tảng tìm kiếm việc làm'}
                </p>
              </div>
            </div>
          ) : (
            <div
              className="w-10 h-10 mx-auto rounded-xl bg-[#385A45] flex items-center justify-center text-white font-bold text-xl cursor-pointer shrink-0"
              onClick={() => onNavigate(isRecruiter ? 'recruiter_dashboard' : 'home')}
            >
              {isRecruiter ? <Building className="w-5 h-5 text-[#FAF8F2]" /> : <Briefcase className="w-5 h-5 text-[#FAF8F2]" />}
            </div>
          )}

          <button
            onClick={onToggleCollapse}
            aria-label="Thu gọn hoặc mở rộng menu"
            className="p-1.5 rounded-lg text-[#9EBFB5] hover:text-[#FAF8F2] hover:bg-[#2D4738] transition-colors"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Quick Role Switcher Banner */}
        <div className="px-3 pt-3 pb-1">
          <button
            onClick={onToggleRole}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl transition-all border text-xs font-semibold ${
              isRecruiter
                ? 'bg-amber-950/40 border-amber-800/60 text-amber-200 hover:bg-amber-900/50'
                : 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200 hover:bg-emerald-900/50'
            } ${collapsed ? 'justify-center' : ''}`}
            title={isRecruiter ? 'Chuyển sang chế độ Ứng viên' : 'Chuyển sang chế độ Nhà tuyển dụng'}
          >
            <Repeat className="w-3.5 h-3.5 shrink-0" />
            {!collapsed && (
              <span className="truncate">
                {isRecruiter ? '👉 Chế độ Ứng viên' : '👉 Chế độ Tuyển dụng'}
              </span>
            )}
          </button>
        </div>

        {/* AI Quick Callout Button (for Candidate) */}
        {!isRecruiter && (
          <div className="px-3 py-1">
            <button
              onClick={onOpenAIFinder}
              className={`w-full group flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#2D4738] hover:bg-[#385A45] text-[#FAF8F2] border border-[#4F755D]/50 shadow-2xs transition-all duration-200 ${
                collapsed ? 'justify-center' : ''
              }`}
              title="Tìm việc bằng AI thông minh"
            >
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              </div>
              {!collapsed && (
                <div className="text-left overflow-hidden">
                  <span className="text-xs font-semibold block text-[#FAF8F2]">Tìm việc bằng AI</span>
                </div>
              )}
            </button>
          </div>
        )}

        {/* Navigation items list */}
        <nav className="px-3 py-2 space-y-1 overflow-y-auto max-h-[calc(100vh-270px)]">
          {currentNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative ${
                  isActive
                    ? 'bg-[#385A45] text-white shadow-sm font-semibold'
                    : 'text-[#C7D9CC] hover:bg-[#2D4738]/70 hover:text-white'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isActive ? 'text-white' : 'text-[#9EBFB5] group-hover:text-white'
                  }`}
                />
                {!collapsed && (
                  <span className="truncate flex-1 text-left text-xs font-semibold">{item.label}</span>
                )}
                {!collapsed && item.badge !== null && (
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      item.badgeColor || 'bg-[#22372C] text-[#C7D9CC]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {collapsed && item.badge !== null && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Profile Section */}
      <div className="p-3 border-t border-[#2D4738] bg-[#16241D]">
        {!collapsed ? (
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#22372C] transition-colors">
            <div
              className="flex items-center gap-2.5 min-w-0 cursor-pointer flex-1"
              onClick={() => onNavigate(isRecruiter ? 'recruiter_profile' : 'profile')}
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.fullName || 'User'}
                  className="w-8 h-8 rounded-full object-cover border border-[#4F755D] shrink-0"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#2D4738] border border-[#4F755D] flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-emerald-300" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-[#FAF8F2] truncate">
                  {user.fullName || (isRecruiter ? 'Nhà tuyển dụng' : 'Chưa cập nhật tên')}
                </p>
                <p className="text-[10px] text-[#9EBFB5] truncate flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5 shrink-0" />
                  {user.district || 'TP.HCM'}
                </p>
              </div>
            </div>
            <button
              onClick={onLogout || onOpenAuth}
              title="Đăng xuất (Trở về mặc định trống)"
              className="p-1.5 rounded-lg text-[#9EBFB5] hover:text-white hover:bg-[#2D4738] transition-colors ml-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => onNavigate(isRecruiter ? 'recruiter_profile' : 'profile')}
              title={user.fullName || 'Hồ sơ'}
              className="p-1 rounded-full hover:ring-2 hover:ring-emerald-400 transition-all"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.fullName || 'User'}
                  className="w-7 h-7 rounded-full object-cover border border-[#4F755D]"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-[#2D4738] border border-[#4F755D] flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-emerald-300" />
                </div>
              )}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
export type { NavScreen };
