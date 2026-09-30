import React, { useEffect } from 'react';
import { BellRing, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language, NotificationItem } from '../types/job';

interface NotificationToastProps {
  notification: NotificationItem | null;
  onClose: () => void;
  onClick?: () => void;
  lang?: Language;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  notification,
  onClose,
  onClick,
  lang = 'vi',
}) => {
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      onClose();
    }, 6000);
    return () => clearTimeout(timer);
  }, [notification, onClose]);

  if (!notification) return null;

  const timeLabel = lang === 'ko' ? '방금 전' : lang === 'en' ? 'Just now' : 'Vừa xong';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#1B2C24] text-white p-4 rounded-2xl shadow-2xl border border-[#385A45] flex items-start gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-500/30">
        <Sparkles className="w-5 h-5 text-emerald-300" />
      </div>

      <div
        className="flex-1 min-w-0 cursor-pointer"
        onClick={() => {
          if (onClick) onClick();
          onClose();
        }}
      >
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-[#FAF8F2] truncate">{notification.title}</h4>
          <span className="text-[10px] text-[#9EBFB5]">{timeLabel}</span>
        </div>
        <p className="text-[11px] text-[#C7D9CC] mt-1 line-clamp-2 leading-relaxed">
          {notification.message}
        </p>
      </div>

      <button
        onClick={onClose}
        className="text-[#9EBFB5] hover:text-white p-1 rounded-lg hover:bg-white/10"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
