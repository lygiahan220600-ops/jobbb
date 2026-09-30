import React, { useState } from 'react';
import {
  X,
  Lock,
  Mail,
  User,
  Phone,
  CheckCircle2,
  Sparkles,
  Briefcase,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Check,
  AlertCircle,
  HelpCircle,
  KeyRound,
  ArrowLeft,
  Building
} from 'lucide-react';
import { UserProfile, NotificationItem, Language } from '../types/job';
import { DEMO_CANDIDATE_PROFILE, DEMO_RECRUITER_PROFILE } from '../data/mockUserData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSelectUser: (user: UserProfile) => void;
  onAddNotification?: (notif: NotificationItem) => void;
  lang?: Language;
}

type AuthTab = 'login' | 'register' | 'forgot_password';
type SocialProvider = 'google' | 'facebook' | 'apple';

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSelectUser,
  onAddNotification,
  lang = 'vi',
}) => {
  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [accountType, setAccountType] = useState<'candidate' | 'recruiter'>('candidate');

  // Login form state
  const [loginEmail, setLoginEmail] = useState(currentUser.email || '');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regMajor, setRegMajor] = useState('');

  // Forgot password form state
  const [forgotEmail, setForgotEmail] = useState(currentUser.email);
  const [forgotSent, setForgotSent] = useState(false);

  // Social login loading/popup simulation state
  const [socialLoading, setSocialLoading] = useState<SocialProvider | null>(null);
  const [authSuccessMsg, setAuthSuccessMsg] = useState<string | null>(null);
  const [authErrorMsg, setAuthErrorMsg] = useState<string | null>(null);

  const L = {
    vi: {
      tagline: 'Nền tảng tuyển dụng & Việc làm',
      tabLogin: 'Đăng nhập',
      tabRegister: 'Đăng ký tài khoản',
      socialHeadingLogin: 'Đăng nhập nhanh với mạng xã hội:',
      socialHeadingReg: 'Đăng ký nhanh chỉ với 1 chạm:',
      continueGoogle: 'Tiếp tục với Google',
      orEmail: 'Hoặc bằng email',
      emailLabel: 'Email đăng nhập:',
      passwordLabel: 'Mật khẩu:',
      forgotPassLink: 'Quên mật khẩu?',
      rememberMe: 'Ghi nhớ đăng nhập',
      loginBtn: 'Đăng nhập vào Job',
      roleLabel: 'Bạn tham gia Job với tư cách:',
      roleCandidate: 'Ứng viên tìm việc',
      roleRecruiter: 'Nhà tuyển dụng',
      nameLabel: 'Họ và tên của bạn:',
      namePlaceholder: 'Ví dụ: Lý Gia Hân',
      emailRegLabel: 'Email:',
      phoneLabel: 'Số điện thoại:',
      majorLabelCandidate: 'Ngành học / Chuyên môn chính:',
      majorLabelRecruiter: 'Tên Công ty / Đơn vị tuyển dụng:',
      majorPlaceholderCandidate: 'Ví dụ: Ngôn ngữ Hàn Quốc, CNTT, Marketing...',
      majorPlaceholderRecruiter: 'Ví dụ: Công ty Cổ phần K-Vina Life',
      confirmPassLabel: 'Nhập lại mật khẩu:',
      minPassNotice: 'Tối thiểu 6 ký tự',
      confirmPassNotice: 'Xác nhận lại',
      agreeTermsText: 'Tôi đồng ý với Điều khoản sử dụng và Chính sách bảo mật của Job.',
      registerBtnCandidate: 'Tạo tài khoản Ứng viên',
      registerBtnRecruiter: 'Tạo tài khoản Nhà tuyển dụng',
      backToLogin: 'Quay lại Đăng nhập',
      forgotTitle: 'Khôi phục mật khẩu tài khoản',
      forgotDesc: 'Nhập địa chỉ email đăng ký, chúng tôi sẽ gửi liên kết để bạn thiết lập lại mật khẩu.',
      forgotBtn: 'Gửi liên kết đặt lại mật khẩu',
      forgotSentTitle: 'Đã gửi mã xác nhận!',
      forgotSentDesc: 'Vui lòng kiểm tra hộp thư đến (hoặc hòm thư rác/Spam) và làm theo hướng dẫn.',
      backLoginBtn: 'Trở lại màn hình Đăng nhập',
      sslNotice: 'Bảo mật chuẩn mã hóa SSL 256-bit của Job',
      errFillFields: 'Vui lòng nhập đầy đủ thông tin.',
      errShortPass: 'Mật khẩu phải có ít nhất 6 ký tự.',
      errMismatchPass: 'Mật khẩu xác nhận không khớp.',
      errAgreeTerms: 'Bạn cần đồng ý với Điều khoản sử dụng và Chính sách bảo mật.',
      errEmailInvalid: 'Vui lòng nhập địa chỉ email hợp lệ.',
      loginSuccess: 'Đăng nhập thành công qua',
      welcome: 'Chào mừng',
    },
    en: {
      tagline: 'Recruitment & Job Opportunity Platform',
      tabLogin: 'Sign In',
      tabRegister: 'Create Account',
      socialHeadingLogin: 'Fast sign-in with social accounts:',
      socialHeadingReg: 'Fast 1-click registration:',
      continueGoogle: 'Continue with Google',
      orEmail: 'Or continue with email',
      emailLabel: 'Email Address:',
      passwordLabel: 'Password:',
      forgotPassLink: 'Forgot password?',
      rememberMe: 'Remember me',
      loginBtn: 'Sign In to Job',
      roleLabel: 'Join Job platform as:',
      roleCandidate: 'Job Seeker',
      roleRecruiter: 'Employer / Recruiter',
      nameLabel: 'Full Name:',
      namePlaceholder: 'e.g. Alex Johnson',
      emailRegLabel: 'Email:',
      phoneLabel: 'Phone Number:',
      majorLabelCandidate: 'Field of Study / Specialization:',
      majorLabelRecruiter: 'Company / Organization Name:',
      majorPlaceholderCandidate: 'e.g. Korean Linguistics, Computer Science...',
      majorPlaceholderRecruiter: 'e.g. K-Vina Global Tech Ltd.',
      confirmPassLabel: 'Confirm Password:',
      minPassNotice: 'At least 6 characters',
      confirmPassNotice: 'Confirm password',
      agreeTermsText: 'I agree to the Terms of Service and Privacy Policy of Job.',
      registerBtnCandidate: 'Create Candidate Account',
      registerBtnRecruiter: 'Create Recruiter Account',
      backToLogin: 'Back to Sign In',
      forgotTitle: 'Reset Account Password',
      forgotDesc: 'Enter your registered email address to receive secure instructions to reset your password.',
      forgotBtn: 'Send Password Reset Link',
      forgotSentTitle: 'Reset Instructions Sent!',
      forgotSentDesc: 'Please check your email inbox (including Spam folder) and follow the instructions.',
      backLoginBtn: 'Return to Sign In',
      sslNotice: 'Protected by Job 256-bit SSL encryption',
      errFillFields: 'Please fill in all required fields.',
      errShortPass: 'Password must be at least 6 characters.',
      errMismatchPass: 'Passwords do not match.',
      errAgreeTerms: 'You must agree to the Terms of Service and Privacy Policy.',
      errEmailInvalid: 'Please enter a valid email address.',
      loginSuccess: 'Successfully signed in via',
      welcome: 'Welcome',
    },
    ko: {
      tagline: '글로벌 채용 및 일자리 매칭 플랫폼',
      tabLogin: '로그인',
      tabRegister: '회원가입',
      socialHeadingLogin: '소셜 계정으로 빠른 로그인:',
      socialHeadingReg: '원클릭 간편 회원가입:',
      continueGoogle: 'Google 계정으로 계속하기',
      orEmail: '또는 이메일로 이용',
      emailLabel: '로그인 이메일:',
      passwordLabel: '비밀번호:',
      forgotPassLink: '비밀번호 찾기',
      rememberMe: '로그인 상태 유지',
      loginBtn: 'Job 플랫폼 로그인',
      roleLabel: '회원 유형을 선택하세요:',
      roleCandidate: '일자리 구직자',
      roleRecruiter: '기업 채용담당자',
      nameLabel: '성명 (Full Name):',
      namePlaceholder: '예: 홍길동',
      emailRegLabel: '이메일 주소:',
      phoneLabel: '연락처 (전화번호):',
      majorLabelCandidate: '전공 또는 주요 희망 직무:',
      majorLabelRecruiter: '기업명 / 채용 부서명:',
      majorPlaceholderCandidate: '예: 한국어 전공, IT/개발, 고객상담...',
      majorPlaceholderRecruiter: '예: (주)케이비나 글로벌',
      confirmPassLabel: '비밀번호 확인:',
      minPassNotice: '최소 6자 이상',
      confirmPassNotice: '비밀번호 재입력',
      agreeTermsText: 'Job 플랫폼 이용약관 및 개인정보 처리방침에 동의합니다.',
      registerBtnCandidate: '구직자 계정 생성',
      registerBtnRecruiter: '기업 회원가입',
      backToLogin: '로그인 화면으로 돌아가기',
      forgotTitle: '계정 비밀번호 재설정',
      forgotDesc: '가입하신 이메일 주소를 입력하시면 비밀번호를 재설정할 수 있는 안내 메일을 보내드립니다.',
      forgotBtn: '비밀번호 재설정 링크 발송',
      forgotSentTitle: '인증 메일 발송 완료!',
      forgotSentDesc: '수신함(스팸함 포함)을 확인하시고 메일 내 안내 링크를 클릭해주세요.',
      backLoginBtn: '로그인으로 돌아가기',
      sslNotice: '256비트 SSL 표준 암호화 적용으로 안전하게 보호됩니다',
      errFillFields: '모든 필수 항목을 입력해주세요.',
      errShortPass: '비밀번호는 최소 6자 이상이어야 합니다.',
      errMismatchPass: '비밀번호 확인이 일치하지 않습니다.',
      errAgreeTerms: '이용약관 및 개인정보 처리방침 동의가 필요합니다.',
      errEmailInvalid: '유효한 이메일 주소를 입력해주세요.',
      loginSuccess: '다음 계정으로 성공적으로 로그인되었습니다:',
      welcome: '환영합니다',
    },
  }[lang];

  if (!isOpen) return null;

  const triggerLoginSuccess = (userObj: UserProfile, providerName: string) => {
    setAuthSuccessMsg(`${L.loginSuccess} ${providerName}! ${L.welcome} ${userObj.fullName}.`);
    onSelectUser(userObj);

    if (onAddNotification) {
      onAddNotification({
        id: `notif-auth-${Date.now()}`,
        title: lang === 'ko' ? `${providerName} 계정 로그인 완료` : lang === 'en' ? `Signed in with ${providerName}` : `Đăng nhập thành công với ${providerName}`,
        message: lang === 'ko' ? `${userObj.fullName} 님 환영합니다!` : lang === 'en' ? `Welcome back, ${userObj.fullName}!` : `Chào mừng ${userObj.fullName} đã quay trở lại Job!`,
        type: 'message',
        timestamp: lang === 'ko' ? '방금 전' : lang === 'en' ? 'Just now' : 'Vừa xong',
        read: false,
      });
    }

    setTimeout(() => {
      setAuthSuccessMsg(null);
      onClose();
    }, 1200);
  };

  // 1. Social Login Handlers
  const handleSocialLogin = (provider: SocialProvider) => {
    setSocialLoading(provider);
    setAuthErrorMsg(null);

    setTimeout(() => {
      setSocialLoading(null);

      if (provider === 'google') {
        const googleUser: UserProfile = {
          id: `google-${Date.now()}`,
          fullName: 'Lý Gia Hân',
          email: 'lygiahan220600@gmail.com',
          phone: '0909 112 233',
          avatar: '/src/assets/images/avatar_candidate_1790732866935.jpg',
          address: 'Quận 1, TP. Hồ Chí Minh',
          district: 'Quận 1',
          city: 'TP. Hồ Chí Minh',
          studentStatus: 'Cử nhân Ngôn ngữ & Kinh doanh',
          major: 'Tiếng Hàn & Thương mại Quốc tế',
          university: 'Đại học Quốc gia TP.HCM',
          bio: 'Tài khoản đăng nhập bảo mật qua Google. Tìm kiếm cơ hội việc làm linh hoạt ca tối hoặc bán thời gian.',
          skills: ['Tiếng Hàn giao tiếp', 'Tiếng Anh B2', 'Chăm sóc khách hàng', 'Dịch thuật', 'Tin học văn phòng'],
          languages: ['Tiếng Việt', 'Tiếng Hàn (TOPIK 3)', 'Tiếng Anh'],
          preferredWorkTypes: ['Bán thời gian (Part-time)', 'Ca tối', 'Linh hoạt'],
          preferredSchedule: 'Buổi tối từ 18:00 các ngày trong tuần',
          preferredSalary: '6 - 10 triệu / tháng',
          preferredLocation: 'Quận 1, Quận 3, Bình Thạnh',
          radiusKm: 5,
        };
        triggerLoginSuccess(googleUser, 'Google');
      } else if (provider === 'facebook') {
        const fbUser: UserProfile = {
          id: `fb-${Date.now()}`,
          fullName: 'Lý Gia Hân',
          email: 'lygiahan220600@gmail.com',
          phone: '0909 112 233',
          avatar: '/src/assets/images/avatar_candidate_1790732866935.jpg',
          address: '180 Hai Bà Trưng, Quận 1',
          district: 'Quận 1',
          city: 'TP. Hồ Chí Minh',
          studentStatus: 'Sinh viên',
          major: 'Ngôn ngữ & Thương mại',
          university: 'Trường ĐH Khoa học Xã hội & Nhân văn',
          bio: 'Tài khoản kết nối nhanh từ Facebook.',
          skills: ['Tiếng Hàn giao tiếp', 'Phục vụ F&B', 'Giao tiếp khách hàng'],
          languages: ['Tiếng Việt', 'Tiếng Hàn'],
          preferredWorkTypes: ['Bán thời gian (Part-time)', 'Ca tối'],
          preferredSchedule: 'Ca tối 18:00 - 22:00',
          preferredSalary: '25.000 - 35.000 đ/giờ',
          preferredLocation: 'Quận 1',
          radiusKm: 3,
        };
        triggerLoginSuccess(fbUser, 'Facebook');
      } else {
        const appleUser: UserProfile = {
          id: `apple-${Date.now()}`,
          fullName: 'Lý Gia Hân',
          email: 'lygiahan220600@gmail.com',
          phone: '0909 112 233',
          avatar: '/src/assets/images/avatar_candidate_1790732866935.jpg',
          address: 'Quận 1, TP. Hồ Chí Minh',
          district: 'Quận 1',
          city: 'TP. Hồ Chí Minh',
          studentStatus: 'Cử nhân',
          major: 'Ngôn ngữ Hàn',
          university: 'ĐH Quốc Gia',
          bio: 'Tài khoản Apple ID bảo mật.',
          skills: ['Tiếng Hàn', 'Tiếng Anh'],
          languages: ['Tiếng Việt', 'Tiếng Hàn'],
          preferredWorkTypes: ['Bán thời gian (Part-time)'],
          preferredSchedule: 'Linh hoạt',
          preferredSalary: 'Thỏa thuận',
          preferredLocation: 'Quận 1',
          radiusKm: 5,
        };
        triggerLoginSuccess(appleUser, 'Apple ID');
      }
    }, 800);
  };

  // 2. Email Login Submit
  const handleEmailLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthErrorMsg(null);

    if (!loginEmail || !loginPassword) {
      setAuthErrorMsg(L.errFillFields);
      return;
    }

    if (loginPassword.length < 6) {
      setAuthErrorMsg(L.errShortPass);
      return;
    }

    const matchedUser: UserProfile = {
      ...currentUser,
      role: accountType,
      email: loginEmail,
      fullName: currentUser.fullName || (accountType === 'recruiter' ? 'Nhà tuyển dụng' : 'Ứng viên'),
      companyName: accountType === 'recruiter' ? (currentUser.companyName || 'Doanh nghiệp Tuyển dụng') : undefined,
      recruiterPosition: accountType === 'recruiter' ? 'HR Manager' : undefined,
    };

    triggerLoginSuccess(matchedUser, accountType === 'recruiter' ? 'Nhà tuyển dụng' : 'Ứng viên');
  };

  // 3. Register Submit
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthErrorMsg(null);

    if (!regName.trim() || !regEmail.trim()) {
      setAuthErrorMsg(L.errFillFields);
      return;
    }
    if (!regEmail.includes('@')) {
      setAuthErrorMsg(L.errEmailInvalid);
      return;
    }
    if (regPassword.length < 6) {
      setAuthErrorMsg(L.errShortPass);
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setAuthErrorMsg(L.errMismatchPass);
      return;
    }
    if (!agreeTerms) {
      setAuthErrorMsg(L.errAgreeTerms);
      return;
    }

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      role: accountType,
      fullName: regName,
      email: regEmail,
      phone: regPhone || '',
      avatar: '', // Blank avatar by default as requested
      companyName: accountType === 'recruiter' ? (regMajor || 'Doanh nghiệp Tuyển dụng') : undefined,
      recruiterPosition: accountType === 'recruiter' ? 'Trưởng phòng Nhân sự' : undefined,
      address: 'Quận 1, TP. Hồ Chí Minh',
      district: 'Quận 1',
      city: 'TP. Hồ Chí Minh',
      studentStatus: accountType === 'candidate' ? 'Ứng viên tìm việc' : 'Nhà tuyển dụng',
      major: regMajor || (accountType === 'candidate' ? 'Ngôn ngữ & Thương mại' : 'Quản trị Nhân sự'),
      university: accountType === 'candidate' ? 'Đại học Quốc gia TP.HCM' : 'Đại học Kinh Tế',
      bio: accountType === 'candidate'
        ? `Tài khoản ứng viên mới đăng ký trên nền tảng Job.`
        : `Tài khoản Nhà tuyển dụng / Doanh nghiệp trên Job.`,
      skills: accountType === 'candidate' ? ['Giao tiếp tốt', 'Nhiệt huyết'] : ['Tuyển dụng', 'Phỏng vấn'],
      languages: ['Tiếng Việt', 'Tiếng Anh'],
      preferredWorkTypes: ['Bán thời gian (Part-time)', 'Ca tối', 'Toàn thời gian'],
      preferredSchedule: 'Linh hoạt',
      preferredSalary: 'Thỏa thuận',
      preferredLocation: 'TP. Hồ Chí Minh',
      radiusKm: 5,
    };

    setAuthSuccessMsg(lang === 'ko' ? '회원가입이 완료되었습니다!' : lang === 'en' ? 'Account created successfully!' : 'Đăng ký tài khoản thành công!');
    onSelectUser(newUser);

    if (onAddNotification) {
      onAddNotification({
        id: `notif-reg-${Date.now()}`,
        title: lang === 'ko' ? 'Job 가입을 환영합니다' : lang === 'en' ? 'Welcome to Job' : 'Chào mừng bạn đến với Job',
        message: `${newUser.fullName} (${newUser.email})`,
        type: 'message',
        timestamp: lang === 'ko' ? '방금 전' : lang === 'en' ? 'Just now' : 'Vừa xong',
        read: false,
      });
    }

    setTimeout(() => {
      setAuthSuccessMsg(null);
      onClose();
    }, 1300);
  };

  // 4. Forgot Password Submit
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      setAuthErrorMsg(L.errEmailInvalid);
      return;
    }
    setForgotSent(true);
    setAuthErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF8F2] w-full max-w-md rounded-2xl shadow-2xl border border-[#DED3BD] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Brand Header */}
        <div className="px-6 py-4 bg-[#1B2C24] text-white flex items-center justify-between border-b border-[#2D4738]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#385A45] flex items-center justify-center text-white border border-[#4F755D]/50 shadow-sm">
              <Briefcase className="w-4 h-4 text-[#FAF8F2]" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight text-[#FAF8F2] flex items-center gap-1.5">
                Job
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-[#385A45] text-[#EDE6D6]">
                  Career
                </span>
              </h3>
              <p className="text-[11px] text-[#9EBFB5]">{L.tagline}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9EBFB5] hover:text-white hover:bg-[#2D4738] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher: Login vs Register */}
        {activeTab !== 'forgot_password' && (
          <div className="flex border-b border-[#EDE6D6] bg-white text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setAuthErrorMsg(null);
              }}
              className={`flex-1 py-3 text-center border-b-2 transition-all ${
                activeTab === 'login'
                  ? 'border-[#2D4738] text-[#2D4738] bg-[#FBF9F4]'
                  : 'border-transparent text-neutral-500 hover:text-[#1B2C24]'
              }`}
            >
              {L.tabLogin}
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setAuthErrorMsg(null);
              }}
              className={`flex-1 py-3 text-center border-b-2 transition-all ${
                activeTab === 'register'
                  ? 'border-[#2D4738] text-[#2D4738] bg-[#FBF9F4]'
                  : 'border-transparent text-neutral-500 hover:text-[#1B2C24]'
              }`}
            >
              {L.tabRegister}
            </button>
          </div>
        )}

        {/* Modal Body with smooth scrolling */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
          {/* Success Banner */}
          {authSuccessMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{authSuccessMsg}</span>
            </div>
          )}

          {/* Error Banner */}
          {authErrorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{authErrorMsg}</span>
            </div>
          )}

          {/* DUAL ROLE SELECTOR & FAST DEMO LOGIN */}
          {activeTab !== 'forgot_password' && (
            <div className="p-3 rounded-2xl bg-[#EDE6D6]/70 border border-[#DED3BD] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#2D4738]">
                  Chọn đối tượng:
                </span>
                <span className="text-[10px] text-[#4A7D5C] font-semibold">
                  {accountType === 'candidate' ? 'Chế độ Ứng viên' : 'Chế độ Nhà tuyển dụng'}
                </span>
              </div>

              {/* 2 Role Choice Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAccountType('candidate')}
                  className={`py-2 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                    accountType === 'candidate'
                      ? 'bg-[#2D4738] text-white shadow-sm'
                      : 'bg-white text-neutral-600 hover:text-[#1B2C24] border border-[#DED3BD]'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Ứng viên tìm việc</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAccountType('recruiter')}
                  className={`py-2 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                    accountType === 'recruiter'
                      ? 'bg-[#2D4738] text-white shadow-sm'
                      : 'bg-white text-neutral-600 hover:text-[#1B2C24] border border-[#DED3BD]'
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>Nhà tuyển dụng</span>
                </button>
              </div>

              {/* Quick Demo 1-Click Login */}
              <div className="pt-2 border-t border-[#DED3BD]/70 space-y-1.5">
                <button
                  type="button"
                  onClick={() => triggerLoginSuccess(DEMO_CANDIDATE_PROFILE, 'Demo Ứng viên')}
                  className="w-full py-1.5 px-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-[11px] font-semibold flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <User className="w-3 h-3 text-emerald-600" />
                    <span>Đăng nhập thử: <b>Ứng viên (Demo)</b></span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-emerald-600" />
                </button>
                <button
                  type="button"
                  onClick={() => triggerLoginSuccess(DEMO_RECRUITER_PROFILE, 'Demo Nhà tuyển dụng')}
                  className="w-full py-1.5 px-2.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-[11px] font-semibold flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Building className="w-3 h-3 text-amber-600" />
                    <span>Đăng nhập thử: <b>Nhà tuyển dụng (Demo)</b></span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-amber-600" />
                </button>
              </div>
            </div>
          )}

          {/* 1. SOCIAL SIGN IN BUTTONS */}
          {activeTab !== 'forgot_password' && (
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A7D5C] block">
                {activeTab === 'login' ? L.socialHeadingLogin : L.socialHeadingReg}
              </span>

              {/* Google Button */}
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                disabled={socialLoading !== null}
                className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-50 text-[#1B2C24] font-semibold text-xs border border-[#DED3BD] hover:border-[#9EBFB5] shadow-sm hover:shadow transition-all disabled:opacity-60"
              >
                {socialLoading === 'google' ? (
                  <div className="w-4 h-4 border-2 border-neutral-300 border-t-[#2D4738] rounded-full animate-spin" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                )}
                <span>{L.continueGoogle}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                {/* Facebook Button */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('facebook')}
                  disabled={socialLoading !== null}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-semibold text-xs shadow-sm hover:shadow transition-all disabled:opacity-60"
                >
                  {socialLoading === 'facebook' ? (
                    <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  )}
                  <span>Facebook</span>
                </button>

                {/* Apple Button */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('apple')}
                  disabled={socialLoading !== null}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-black hover:bg-neutral-900 text-white font-semibold text-xs shadow-sm hover:shadow transition-all disabled:opacity-60"
                >
                  {socialLoading === 'apple' ? (
                    <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.64 1.36-.57.65-1.06 1.72-.93 2.74 1 .08 2.03-.5 2.65-1.25z" />
                    </svg>
                  )}
                  <span>Apple ID</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative py-2 flex items-center justify-center">
                <div className="border-t border-[#DED3BD] w-full" />
                <span className="bg-[#FAF8F2] px-2 text-[10px] uppercase font-bold text-neutral-400 absolute">
                  {L.orEmail}
                </span>
              </div>
            </div>
          )}

          {/* 2. FORM: LOGIN */}
          {activeTab === 'login' && (
            <form onSubmit={handleEmailLoginSubmit} className="space-y-3.5">
              <div>
                <label className="font-semibold text-neutral-700 block mb-1">{L.emailLabel}</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-semibold text-neutral-700">{L.passwordLabel}</label>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('forgot_password');
                      setAuthErrorMsg(null);
                    }}
                    className="text-[11px] text-[#385A45] hover:underline font-medium"
                  >
                    {L.forgotPassLink}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 bg-white border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-neutral-400 hover:text-neutral-600 absolute right-2.5 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-neutral-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-[#2D4738] focus:ring-[#2D4738]"
                  />
                  <span>{L.rememberMe}</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#2D4738] hover:bg-[#385A45] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <span>{L.loginBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* 3. FORM: REGISTER */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              {/* Role Picker */}
              <div>
                <label className="font-semibold text-neutral-700 block mb-1">{L.roleLabel}</label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-[#F5F1E8] rounded-xl">
                  <button
                    type="button"
                    onClick={() => setAccountType('candidate')}
                    className={`py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
                      accountType === 'candidate'
                        ? 'bg-white text-[#2D4738] shadow-sm'
                        : 'text-neutral-600 hover:text-[#1B2C24]'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>{L.roleCandidate}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccountType('recruiter')}
                    className={`py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
                      accountType === 'recruiter'
                        ? 'bg-[#2D4738] text-white shadow-sm'
                        : 'text-neutral-600 hover:text-[#1B2C24]'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{L.roleRecruiter}</span>
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="font-semibold text-neutral-700 block mb-1">{L.nameLabel}</label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                    placeholder={L.namePlaceholder}
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">{L.emailRegLabel}</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">{L.phoneLabel}</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                      placeholder="0983 214 789"
                    />
                  </div>
                </div>
              </div>

              {/* Major or Company */}
              <div>
                <label className="font-semibold text-neutral-700 block mb-1">
                  {accountType === 'candidate' ? L.majorLabelCandidate : L.majorLabelRecruiter}
                </label>
                <input
                  type="text"
                  value={regMajor}
                  onChange={(e) => setRegMajor(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                  placeholder={accountType === 'candidate' ? L.majorPlaceholderCandidate : L.majorPlaceholderRecruiter}
                />
              </div>

              {/* Password & Confirm */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">{L.passwordLabel}</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 bg-white border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                      placeholder={L.minPassNotice}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1 text-neutral-400 hover:text-neutral-600 absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">{L.confirmPassLabel}</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 bg-white border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                      placeholder={L.confirmPassNotice}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="p-1 text-neutral-400 hover:text-neutral-600 absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Agree terms */}
              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer text-[11px] text-neutral-600 leading-tight">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded text-[#2D4738] focus:ring-[#2D4738]"
                  />
                  <span>{L.agreeTermsText}</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#2D4738] hover:bg-[#385A45] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 mt-2"
              >
                <span>{accountType === 'candidate' ? L.registerBtnCandidate : L.registerBtnRecruiter}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* 4. FORGOT PASSWORD */}
          {activeTab === 'forgot_password' && (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('login');
                  setForgotSent(false);
                  setAuthErrorMsg(null);
                }}
                className="flex items-center gap-1 text-xs text-[#385A45] font-semibold hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{L.backToLogin}</span>
              </button>

              <div className="text-center space-y-1">
                <div className="w-10 h-10 rounded-full bg-[#EDE6D6] text-[#2D4738] flex items-center justify-center mx-auto mb-2">
                  <KeyRound className="w-5 h-5 text-[#385A45]" />
                </div>
                <h4 className="text-sm font-bold text-[#1B2C24]">{L.forgotTitle}</h4>
                <p className="text-neutral-500 text-xs leading-relaxed max-w-xs mx-auto">
                  {L.forgotDesc}
                </p>
              </div>

              {forgotSent ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center space-y-2">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600 mx-auto" />
                  <p className="font-bold text-xs">{L.forgotSentTitle}</p>
                  <p className="text-[11px] text-neutral-600">
                    {L.forgotSentDesc} ({forgotEmail})
                  </p>
                  <button
                    onClick={() => {
                      setActiveTab('login');
                      setForgotSent(false);
                    }}
                    className="mt-2 px-4 py-1.5 rounded-lg bg-[#2D4738] text-white text-xs font-semibold"
                  >
                    {L.backLoginBtn}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-3">
                  <div>
                    <label className="font-semibold text-neutral-700 block mb-1">{L.emailLabel}</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                        placeholder="name@example.com"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#2D4738] hover:bg-[#385A45] text-white font-bold text-xs shadow-md transition-all"
                  >
                    {L.forgotBtn}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-2.5 bg-[#F5F1E8] border-t border-[#DED3BD] text-center text-[11px] text-neutral-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>{L.sslNotice}</span>
        </div>
      </div>
    </div>
  );
};
