import React, { useState, useEffect } from 'react';
import {
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Save,
  LogOut,
  CheckCircle2,
  Briefcase
} from 'lucide-react';
import { UserProfile, Language } from '../../types/job';
import { DISTRICTS_HCM } from '../../data/mockJobs';

interface RecruiterProfileViewProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  onOpenAuth: () => void;
  onLogout?: () => void;
  lang?: Language;
}

export const RecruiterProfileView: React.FC<RecruiterProfileViewProps> = ({
  user,
  onUpdateUser,
  onOpenAuth,
  onLogout,
  lang = 'vi',
}) => {
  const [formData, setFormData] = useState<UserProfile>(() => ({
    ...user,
    companyName: user.companyName || '',
    recruiterPosition: user.recruiterPosition || '',
    fullName: user.fullName || '',
    email: user.email || '',
    phone: user.phone || '',
    avatar: user.avatar || '',
    companyAddress: user.companyAddress || user.address || '',
    companyWebsite: user.companyWebsite || '',
    district: user.district || 'Quận 1',
    city: user.city || 'TP. Hồ Chí Minh',
    bio: user.bio || '',
  }));

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setFormData({
      ...user,
      companyName: user.companyName || '',
      recruiterPosition: user.recruiterPosition || '',
      fullName: user.fullName || '',
      email: user.email || '',
      phone: user.phone || '',
      avatar: user.avatar || '',
      companyAddress: user.companyAddress || user.address || '',
      companyWebsite: user.companyWebsite || '',
      district: user.district || 'Quận 1',
      city: user.city || 'TP. Hồ Chí Minh',
      bio: user.bio || '',
    });
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...formData,
      role: 'recruiter',
      address: formData.companyAddress || formData.address,
    };
    onUpdateUser(updated);
    try {
      localStorage.setItem('job_user_profile', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      {/* Recruiter Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-[#EDE6D6] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {formData.avatar ? (
            <img
              src={formData.avatar}
              alt={formData.fullName}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#2D4738]"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[#EDE6D6] border-2 border-dashed border-[#9EBFB5] flex flex-col items-center justify-center text-neutral-400">
              <Building className="w-7 h-7 text-[#4A7D5C]" />
              <span className="text-[9px] font-bold text-neutral-500 mt-0.5">Logo trống</span>
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#1B2C24]">
                {formData.companyName || 'Doanh nghiệp chưa cập nhật tên'}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                Nhà tuyển dụng
              </span>
            </div>
            <p className="text-xs font-semibold text-[#385A45]">
              {formData.fullName || 'Người liên hệ'} {formData.recruiterPosition ? `(${formData.recruiterPosition})` : ''}
            </p>
            <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#4A7D5C]" />
              {formData.district}, {formData.city}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={onLogout}
            className="px-4 py-2 rounded-xl border border-[#DED3BD] hover:bg-[#F5F1E8] text-[#1B2C24] text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Đăng xuất</span>
          </button>
          <button
            type="button"
            onClick={onOpenAuth}
            className="px-4 py-2 rounded-xl bg-[#2D4738] hover:bg-[#385A45] text-white text-xs font-semibold transition-colors"
          >
            Đổi tài khoản
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Thông tin doanh nghiệp & nhà tuyển dụng đã được lưu thành công!</span>
        </div>
      )}

      {/* Recruiter Edit Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-[#EDE6D6] shadow-sm space-y-6 text-xs">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D4738] border-b border-[#F5F1E8] pb-2 mb-4">
            1. Thông tin Doanh nghiệp & Cơ quan tuyển dụng
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-neutral-700 block mb-1">Tên Công ty / Đơn vị:</label>
              <input
                type="text"
                placeholder="Ví dụ: Trung tâm Ngoại ngữ Seoul Link..."
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
              />
            </div>
            <div>
              <label className="font-semibold text-neutral-700 block mb-1">Website công ty:</label>
              <input
                type="text"
                placeholder="https://company.vn"
                value={formData.companyWebsite}
                onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
              />
            </div>
            <div>
              <label className="font-semibold text-neutral-700 block mb-1">Quận / Khu vực:</label>
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl"
              >
                {DISTRICTS_HCM.filter((d) => d !== 'Tất cả khu vực').map((dist) => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-semibold text-neutral-700 block mb-1">Địa chỉ trụ sở văn phòng:</label>
              <input
                type="text"
                placeholder="Số nhà, tên đường, phường..."
                value={formData.companyAddress}
                onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
                className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D4738] border-b border-[#F5F1E8] pb-2 mb-4">
            2. Thông tin Người đại diện Tuyển dụng (HR)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-neutral-700 block mb-1">Họ và tên người phụ trách:</label>
              <input
                type="text"
                placeholder="Ví dụ: Ms. Park Min Young"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl"
              />
            </div>
            <div>
              <label className="font-semibold text-neutral-700 block mb-1">Chức vụ trong công ty:</label>
              <input
                type="text"
                placeholder="Ví dụ: Trưởng phòng Nhân sự / HR Specialist"
                value={formData.recruiterPosition}
                onChange={(e) => setFormData({ ...formData, recruiterPosition: e.target.value })}
                className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl"
              />
            </div>
            <div>
              <label className="font-semibold text-neutral-700 block mb-1">Email liên hệ tuyển dụng:</label>
              <input
                type="email"
                placeholder="hr@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl"
              />
            </div>
            <div>
              <label className="font-semibold text-neutral-700 block mb-1">Số điện thoại liên hệ:</label>
              <input
                type="tel"
                placeholder="0903 821 445"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-semibold text-neutral-700 block mb-1">
                Logo hoặc Ảnh đại diện công ty (URL hoặc để trống):
              </label>
              <input
                type="text"
                placeholder="Để trống hoặc dán link ảnh logo..."
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D4738] border-b border-[#F5F1E8] pb-2 mb-4">
            3. Giới thiệu tổng quan về Doanh nghiệp
          </h3>
          <textarea
            rows={4}
            placeholder="Mô tả văn hóa công ty, quy mô, phúc lợi và mục tiêu tuyển dụng..."
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-xl leading-relaxed"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-2.5 rounded-xl bg-[#2D4738] hover:bg-[#385A45] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Lưu thông tin nhà tuyển dụng</span>
          </button>
        </div>
      </form>
    </div>
  );
};
