import React, { useState } from 'react';
import {
  Bell,
  Search,
  Sparkles,
  MapPin,
  CheckCircle2,
  Clock,
  Briefcase,
  ChevronDown,
  Globe,
  DollarSign,
  User,
  Building
} from 'lucide-react';
import { Currency, Language, NotificationItem, UserProfile } from '../types/job';
import { NavScreen } from './Sidebar';
import { TRANSLATIONS } from '../utils/i18n';

interface HeaderProps {
  currentScreen: NavScreen;
  screenTitle: string;
  user: UserProfile;
  notifications: NotificationItem[];
  onOpenAIFinder: () => void;
  onNavigate: (screen: NavScreen) => void;
  onSelectJobId?: (jobId: string) => void;
  onMarkNotificationsRead: () => void;
  onOpenAuth: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  lang?: Language;
  onLanguageChange?: (lang: Language) => void;
  currency?: Currency;
  onCurrencyChange?: (c: Currency) => void;
}

export const Header: React.FC<HeaderProps> = ({
  screenTitle,
  user,
  notifications,
  onOpenAIFinder,
  onNavigate,
  onSelectJobId,
  onMarkNotificationsRead,
  onOpenAuth,
  searchQuery,
  onSearchChange,
  lang = 'vi',
  onLanguageChange,
  currency = 'VND',
  onCurrencyChange,
}) => {
  const t = TRANSLATIONS[lang];
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (item: NotificationItem) => {
    setShowNotifications(false);
    if (item.jobId && onSelectJobId) {
      onSelectJobId(item.jobId);
    } else if (item.type === 'application_update') {
      onNavigate('applications');
    } else if (item.type === 'message') {
      onNavigate('chat');
    }
  };

  const languages = [
    { code: 'vi' as Language, label: 'Tiếng Việt', short: 'VI', flag: '🇻🇳' },
    { code: 'en' as Language, label: 'English', short: 'EN', flag: '🇺🇸' },
    { code: 'ko' as Language, label: '한국어', short: 'KO', flag: '🇰🇷' },
  ];

  return (
    <header className="sticky top-0 z-20 h-16 bg-[#FBF9F4]/90 backdrop-blur-md border-b border-[#EDE6D6] px-6 flex items-center justify-between transition-all">
      {/* Zone 1: Contextual Title & Search quick bar */}
      <div className="flex items-center gap-6">
        <div>
          <h2 className="text-base font-bold text-[#1B2C24] tracking-tight">{screenTitle}</h2>
          <p className="text-xs text-[#4A7D5C] hidden sm:flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            {lang === 'ko' ? '내 위치:' : lang === 'en' ? 'Location:' : 'Vị trí:'} {user.district}, {user.city} · {user.radiusKm} km
          </p>
        </div>

        {/* Global Quick Search Input */}
        <div className="relative hidden md:block w-72 lg:w-88">
          <Search className="w-4 h-4 text-[#4A7D5C] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => {
              onSearchChange(e.target.value);
              // Auto route to search view if not already there
              if (screenTitle !== 'Tìm kiếm việc làm' && screenTitle !== 'Search Jobs' && screenTitle !== '일자리 검색') {
                onNavigate('search');
              }
            }}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-[#F5F1E8] hover:bg-white focus:bg-white text-[#1B2C24] placeholder-[#6F9C7F] border border-[#DED3BD] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#385A45] focus:border-[#385A45] transition-all"
          />
        </div>
      </div>

      {/* Zone 2: Language Switcher + Currency + AI Finder + Notifications + Auth */}
      <div className="flex items-center gap-2.5">
        {/* Multilingual Selector Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-[#DED3BD] hover:bg-[#F5F1E8] text-xs font-semibold text-[#1B2C24] transition-all shadow-2xs"
            title="Đổi ngôn ngữ giao diện (VI / EN / KO)"
          >
            <Globe className="w-3.5 h-3.5 text-[#385A45]" />
            <span>{languages.find((l) => l.code === lang)?.short}</span>
            <ChevronDown className={`w-3 h-3 text-neutral-500 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-1.5 w-40 bg-white rounded-xl shadow-lg border border-[#DED3BD] py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-100">
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => {
                    if (onLanguageChange) onLanguageChange(l.code);
                    setShowLangMenu(false);
                  }}
                  className={`w-full px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                    lang === l.code
                      ? 'bg-[#F2F6F3] text-[#2D4738] font-bold'
                      : 'text-neutral-700 hover:bg-[#FBF9F4]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </span>
                  {lang === l.code && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Currency Switcher */}
        {onCurrencyChange && (
          <div className="hidden lg:flex items-center bg-[#F5F1E8] p-0.5 rounded-lg border border-[#DED3BD]">
            {(['VND', 'USD', 'KRW'] as Currency[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => onCurrencyChange(c)}
                className={`px-2 py-1 text-[11px] font-bold rounded-md transition-all ${
                  currency === c
                    ? 'bg-[#2D4738] text-white shadow-2xs'
                    : 'text-neutral-600 hover:text-[#1B2C24]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {/* AI Quick Button */}
        <button
          onClick={onOpenAIFinder}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2D4738] hover:bg-[#385A45] text-white text-xs font-semibold shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
          <span className="hidden sm:inline">
            {lang === 'ko' ? 'AI 매칭' : lang === 'en' ? 'AI Match' : 'Tìm việc bằng AI'}
          </span>
          <span className="sm:hidden">AI</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (!showNotifications && unreadCount > 0) {
                onMarkNotificationsRead();
              }
            }}
            className="relative p-2 rounded-lg text-[#2D4738] hover:bg-[#EDE6D6] transition-colors"
            title="Thông báo"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center font-mono">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-[#DED3BD] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-[#F5F1E8] flex items-center justify-between">
                <span className="text-xs font-bold text-[#1B2C24]">
                  {lang === 'ko' ? '알림' : lang === 'en' ? 'Notifications' : 'Thông báo mới'} ({notifications.length})
                </span>
                <button
                  onClick={onMarkNotificationsRead}
                  className="text-[11px] text-[#4A7D5C] hover:text-[#2D4738] font-medium"
                >
                  {lang === 'ko' ? '모두 읽음' : lang === 'en' ? 'Mark all read' : 'Đánh dấu đã đọc'}
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-[#F5F1E8]">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-neutral-400">
                    {lang === 'ko' ? '알림이 없습니다' : lang === 'en' ? 'No notifications' : 'Chưa có thông báo nào'}
                  </div>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleNotificationClick(item)}
                      className={`p-3.5 hover:bg-[#FBF9F4] cursor-pointer transition-colors flex items-start gap-3 ${
                        !item.read ? 'bg-[#F2F6F3]/50' : ''
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-[#EDE6D6] text-[#2D4738] shrink-0 mt-0.5">
                        {item.type === 'ai_match' && <Sparkles className="w-4 h-4 text-emerald-700" />}
                        {item.type === 'job_alert' && <Briefcase className="w-4 h-4 text-[#385A45]" />}
                        {item.type === 'application_update' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                        {item.type === 'message' && <Clock className="w-4 h-4 text-amber-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#1B2C24] leading-snug">{item.title}</p>
                        <p className="text-[11px] text-[#4A7D5C] mt-0.5 leading-relaxed line-clamp-2">
                          {item.message}
                        </p>
                        <span className="text-[10px] text-neutral-400 mt-1 block font-mono">{item.timestamp}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Role Badge */}
        <span className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          user.role === 'recruiter' ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
        }`}>
          {user.role === 'recruiter' ? <Building className="w-3 h-3" /> : <User className="w-3 h-3" />}
          <span>{user.role === 'recruiter' ? 'Nhà tuyển dụng' : 'Ứng viên'}</span>
        </span>

        {/* Login / Register Quick Action */}
        <button
          onClick={onOpenAuth}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EDE6D6] hover:bg-[#DED3BD] text-[#2D4738] text-xs font-semibold transition-colors"
        >
          <span>{user.fullName ? (lang === 'ko' ? '계정 전환' : lang === 'en' ? 'Switch' : 'Đổi tài khoản') : (lang === 'ko' ? '로그인' : lang === 'en' ? 'Login' : 'Đăng nhập')}</span>
        </button>

        {/* User Avatar & Fast Profile Switcher */}
        <div
          onClick={() => onNavigate(user.role === 'recruiter' ? 'recruiter_profile' : 'profile')}
          className="flex items-center gap-2 pl-2 border-l border-[#DED3BD] cursor-pointer hover:opacity-80 transition-opacity"
          title="Xem trang cá nhân"
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.fullName || 'User'}
              className="w-8 h-8 rounded-full object-cover border border-[#385A45]"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#EDE6D6] border border-[#385A45] flex items-center justify-center text-[#2D4738]">
              <User className="w-4 h-4" />
            </div>
          )}
          <span className="text-xs font-semibold text-[#1B2C24] hidden md:inline truncate max-w-[120px]">
            {user.fullName || (user.role === 'recruiter' ? 'Nhà tuyển dụng' : 'Chưa cập nhật')}
          </span>
        </div>
      </div>
    </header>
  );
};
