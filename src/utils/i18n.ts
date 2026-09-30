import { Language, Currency, Job } from '../types/job';

export interface TranslationDictionary {
  // Navigation & Sidebar
  home: string;
  searchJobs: string;
  applications: string;
  cvBuilder: string;
  savedJobs: string;
  messages: string;
  careerTest: string;
  profile: string;
  brandTitle: string;
  brandBadge: string;
  brandTagline: string;
  logoutBtn: string;
  switchAccountBtn: string;

  // Search & Filter Module
  searchPlaceholder: string;
  searchBtn: string;
  keywordLabel: string;
  keywordHelper: string;
  salaryFilterTitle: string;
  minSalary: string;
  maxSalary: string;
  currencyLabel: string;
  locationFilterTitle: string;
  cityLabel: string;
  districtLabel: string;
  radiusLabel: string;
  radiusKm: string;
  currentLocation: string;
  usingCurrentLocation: string;
  workTypeTitle: string;
  industryTitle: string;
  resetFilters: string;
  resultsCount: string;
  sortBy: string;
  sortBestMatch: string;
  sortDistance: string;
  sortSalaryHigh: string;
  sortRecent: string;

  // Company Images & Environment Module
  companyPhotosTitle: string;
  companyPhotosSubtitle: string;
  tagAll: string;
  tagOffice: string;
  tagPantry: string;
  tagTeamBuilding: string;
  viewSlider: string;
  viewGrid: string;
  zoomPhoto: string;
  closeLightbox: string;
  prevPhoto: string;
  nextPhoto: string;
  photoCount: string;

  // Job Requirements Module
  jobRequirementsTitle: string;
  hardSkillsTitle: string;
  softSkillsTitle: string;
  experienceAndDegreeTitle: string;
  minExperience: string;
  years: string;
  noExperienceNeeded: string;
  educationLevel: string;
  languageCertificates: string;
  requiredCertificate: string;
  candidateFitBreakdown: string;
  matchedScore: string;
  matchedItems: string;
  missingItems: string;

  // Candidate Preferences Module
  candidatePreferencesTitle: string;
  candidatePreferencesSubtitle: string;
  prefWorkTypes: string;
  prefDesiredPositions: string;
  maxPositionsHint: string;
  prefExpectedSalary: string;
  applyPreferencesFilter: string;
  preferencesSaved: string;
  positionsLimitReached: string;

  // HomeView
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  aiSearchLabel: string;
  aiSearchPlaceholder: string;
  aiSearchBtn: string;
  statsJobs: string;
  statsCompanies: string;
  statsMatchRate: string;
  quickCategoriesTitle: string;
  nearbyRadiusTitle: string;
  recommendedTitle: string;
  viewAllJobs: string;
  whyChooseTitle: string;
  whyCard1Title: string;
  whyCard1Desc: string;
  whyCard2Title: string;
  whyCard2Desc: string;
  whyCard3Title: string;
  whyCard3Desc: string;
  jobsAroundYou: string;
  viewMoreJobs: string;

  // ApplicationsView
  appTitle: string;
  appSubtitle: string;
  tabAll: string;
  tabSubmitted: string;
  tabReviewing: string;
  tabInterview: string;
  tabAccepted: string;
  tabRejected: string;
  emptyAppsTitle: string;
  emptyAppsDesc: string;
  interviewDetails: string;
  hrNotesLabel: string;
  appliedDateLabel: string;
  cvAttachedLabel: string;

  // SavedJobsView
  savedTitle: string;
  savedSubtitle: string;
  emptySavedTitle: string;
  emptySavedDesc: string;
  exploreJobsBtn: string;

  // ChatView
  chatTitle: string;
  chatSubtitle: string;
  chatPlaceholder: string;
  sendBtn: string;
  attachCVBtn: string;
  onlineStatus: string;
  offlineStatus: string;
  selectChatHint: string;
  searchRecruiterPlaceholder: string;

  // CVBuilderView
  cvBuilderTitle: string;
  cvBuilderSubtitle: string;
  downloadPdf: string;
  personalInfo: string;
  careerObjective: string;
  workExperience: string;
  educationSection: string;
  skillsCertificates: string;
  languagesSection: string;
  atsStandardBadge: string;
  fullNameLabel: string;
  phoneLabel: string;
  emailLabel: string;
  addressLabel: string;

  // CareerTestView
  testTitle: string;
  testSubtitle: string;
  nextQuestion: string;
  prevQuestion: string;
  viewResult: string;
  retakeTest: string;
  questionOf: string;
  matchedJobsTitle: string;

  // AuthModal
  authTitle: string;
  authSubtitle: string;
  switchCandidate: string;
  continueGoogle: string;
  continueEmail: string;
  orDivider: string;
  closeAuth: string;

  // General & Cards
  applyNow: string;
  applied: string;
  saveJob: string;
  saved: string;
  chatWithRecruiter: string;
  fullTime: string;
  partTime: string;
  remote: string;
  hybrid: string;
  nightShift: string;
  distanceFromYou: string;
  officePhotosCount: string;
  scheduleDetailsLabel: string;
  viewDetails: string;
  justNow: string;
  hoursAgo: string;
  daysAgo: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  vi: {
    // Navigation & Sidebar
    home: 'Trang chủ',
    searchJobs: 'Tìm việc làm',
    applications: 'Hồ sơ ứng tuyển',
    cvBuilder: 'Tạo CV ATS',
    savedJobs: 'Việc đã lưu',
    messages: 'Tin nhắn',
    careerTest: 'Trắc nghiệm nghề nghiệp',
    profile: 'Hồ sơ cá nhân',
    brandTitle: 'Job',
    brandBadge: 'Tuyển dụng',
    brandTagline: 'Nền tảng tuyển dụng & Việc làm',
    logoutBtn: 'Đăng xuất',
    switchAccountBtn: 'Đổi tài khoản',

    // Search & Filter Module
    searchPlaceholder: 'Tìm kiếm việc làm, kỹ năng, vị trí công ty...',
    searchBtn: 'Tìm kiếm',
    keywordLabel: 'Từ khóa tìm kiếm',
    keywordHelper: 'Hỗ trợ tìm kiếm chéo đa ngôn ngữ Việt - Anh - Hàn',
    salaryFilterTitle: 'Khoảng lương kỳ vọng',
    minSalary: 'Lương tối thiểu',
    maxSalary: 'Lương tối đa',
    currencyLabel: 'Đơn vị tiền tệ',
    locationFilterTitle: 'Vị trí & Bán kính',
    cityLabel: 'Tỉnh / Thành phố',
    districtLabel: 'Quận / Huyện',
    radiusLabel: 'Bán kính tìm kiếm',
    radiusKm: 'km quanh vị trí',
    currentLocation: 'Vị trí hiện tại của bạn',
    usingCurrentLocation: 'Đang định vị quanh bạn',
    workTypeTitle: 'Hình thức làm việc',
    industryTitle: 'Ngành nghề',
    resetFilters: 'Xóa bộ lọc',
    resultsCount: 'việc làm phù hợp',
    sortBy: 'Sắp xếp theo',
    sortBestMatch: 'Phù hợp nhất',
    sortDistance: 'Gần tôi nhất',
    sortSalaryHigh: 'Lương cao nhất',
    sortRecent: 'Mới đăng',

    // Company Images & Environment Module
    companyPhotosTitle: 'Hình ảnh & Môi trường làm việc',
    companyPhotosSubtitle: 'Khám phá văn phòng thực tế, khu nghỉ ngơi và hoạt động đội ngũ',
    tagAll: 'Tất cả ảnh',
    tagOffice: 'Phòng làm việc (Office)',
    tagPantry: 'Khu vực giải trí (Pantry)',
    tagTeamBuilding: 'Hoạt động tập thể (Team Building)',
    viewSlider: 'Dạng trượt (Slider)',
    viewGrid: 'Dạng lưới (Grid)',
    zoomPhoto: 'Phóng to xem chi tiết',
    closeLightbox: 'Đóng',
    prevPhoto: 'Ảnh trước',
    nextPhoto: 'Ảnh tiếp theo',
    photoCount: 'Ảnh',

    // Job Requirements Module
    jobRequirementsTitle: 'Yêu cầu của nhà tuyển dụng',
    hardSkillsTitle: 'Kỹ năng chuyên môn (Hard Skills)',
    softSkillsTitle: 'Kỹ năng mềm (Soft Skills)',
    experienceAndDegreeTitle: 'Kinh nghiệm & Bằng cấp',
    minExperience: 'Kinh nghiệm tối thiểu',
    years: 'năm',
    noExperienceNeeded: 'Chấp nhận chưa có kinh nghiệm',
    educationLevel: 'Trình độ học vấn',
    languageCertificates: 'Chứng chỉ ngoại ngữ yêu cầu',
    requiredCertificate: 'Bắt buộc',
    candidateFitBreakdown: 'Mức độ tương thích với hồ sơ của bạn',
    matchedScore: 'Độ phù hợp',
    matchedItems: 'Kỹ năng & tiêu chí bạn đã đáp ứng',
    missingItems: 'Kỹ năng đang cần bổ sung thêm',

    // Candidate Preferences Module
    candidatePreferencesTitle: 'Nhu cầu tìm việc của ứng viên',
    candidatePreferencesSubtitle: 'Tùy chỉnh mong muốn nghề nghiệp để nhận gợi ý việc làm chính xác nhất',
    prefWorkTypes: 'Hình thức làm việc mong muốn',
    prefDesiredPositions: 'Vị trí / Ngành nghề ưu tiên (Tối đa 3)',
    maxPositionsHint: 'Bạn chỉ có thể chọn tối đa 3 vị trí ưu tiên',
    prefExpectedSalary: 'Mức lương kỳ vọng',
    applyPreferencesFilter: 'Lọc việc làm theo mong muốn của tôi',
    preferencesSaved: 'Đã lưu mong muốn tìm việc thành công!',
    positionsLimitReached: 'Đã đạt giới hạn tối đa 3 vị trí ưu tiên',

    // HomeView
    heroBadge: 'Nền tảng Tuyển dụng & Hướng nghiệp thế hệ mới',
    heroTitle: 'Tìm việc làm phù hợp nhất với năng lực & lịch trình của bạn.',
    heroSubtitle: 'Được trang bị AI thông minh giúp gợi ý công việc dựa trên ngành học, ca làm tối, part-time và khoảng cách gần bạn nhất tại',
    aiSearchLabel: 'Mô tả nhu cầu bằng ngôn ngữ tự nhiên:',
    aiSearchPlaceholder: 'Ví dụ: "Tìm việc trợ giảng tiếng Hàn ca tối gần Quận 1, lương trên 6 triệu"...',
    aiSearchBtn: 'Tìm với AI',
    statsJobs: '1.200+ Việc làm',
    statsCompanies: '450+ Doanh nghiệp',
    statsMatchRate: '98% Độ phù hợp',
    quickCategoriesTitle: 'Khám phá theo ngành nghề phổ biến',
    nearbyRadiusTitle: 'Gợi ý việc làm theo bán kính quanh bạn',
    recommendedTitle: 'Việc làm nổi bật & Đề xuất AI',
    viewAllJobs: 'Xem tất cả việc làm',
    whyChooseTitle: 'Tại sao nên tìm việc trên nền tảng?',
    whyCard1Title: 'Định vị khoảng cách chính xác',
    whyCard1Desc: 'Tìm việc làm gần chỗ ở hoặc trường học của bạn chỉ trong vài km tiện di chuyển.',
    whyCard2Title: 'Chuẩn ATS & Đa ngôn ngữ',
    whyCard2Desc: 'Tự động tạo CV chuẩn quốc tế và kết nối việc làm với các doanh nghiệp Hàn Quốc & Toàn cầu.',
    whyCard3Title: 'Kết nối trực tiếp HR',
    whyCard3Desc: 'Nhắn tin trao đổi ngay với người tuyển dụng, nhận phản hồi nhanh chóng trong vài giờ.',
    jobsAroundYou: 'Việc làm quanh bạn',
    viewMoreJobs: 'Xem thêm việc làm',

    // ApplicationsView
    appTitle: 'Theo dõi hồ sơ ứng tuyển',
    appSubtitle: 'Quản lý tiến độ tất cả các vị trí bạn đã nộp đơn xin việc',
    tabAll: 'Tất cả',
    tabSubmitted: 'Chờ xét duyệt',
    tabReviewing: 'Đang xem xét',
    tabInterview: 'Mời phỏng vấn',
    tabAccepted: 'Trúng tuyển',
    tabRejected: 'Chưa phù hợp',
    emptyAppsTitle: 'Bạn chưa nộp hồ sơ ứng tuyển nào',
    emptyAppsDesc: 'Hãy khám phá các vị trí tuyển dụng phù hợp và nộp hồ sơ để bắt đầu hành trình sự nghiệp.',
    interviewDetails: 'Thông tin phỏng vấn:',
    hrNotesLabel: 'Ghi chú từ HR:',
    appliedDateLabel: 'Ngày ứng tuyển:',
    cvAttachedLabel: 'CV đã nộp:',

    // SavedJobsView
    savedTitle: 'Việc làm đã lưu',
    savedSubtitle: 'Danh sách các cơ hội nghề nghiệp bạn đang quan tâm và theo dõi',
    emptySavedTitle: 'Bạn chưa lưu công việc nào',
    emptySavedDesc: 'Nhấn vào biểu tượng bookmark trên các tin tuyển dụng để lưu lại và ứng tuyển sau.',
    exploreJobsBtn: 'Khám phá việc làm ngay',

    // ChatView
    chatTitle: 'Tin nhắn với nhà tuyển dụng',
    chatSubtitle: 'Trao đổi trực tiếp và nhận phản hồi nhanh từ phòng nhân sự doanh nghiệp',
    chatPlaceholder: 'Nhập tin nhắn trao đổi với nhà tuyển dụng...',
    sendBtn: 'Gửi',
    attachCVBtn: 'Gửi CV nhanh',
    onlineStatus: 'Đang hoạt động',
    offlineStatus: 'Ngoại tuyến',
    selectChatHint: 'Chọn một cuộc hội thoại từ danh sách bên trái để bắt đầu trao đổi',
    searchRecruiterPlaceholder: 'Tìm cuộc hội thoại, tên công ty...',

    // CVBuilderView
    cvBuilderTitle: 'Tạo & Quản lý CV Chuẩn ATS',
    cvBuilderSubtitle: 'Tự động định dạng chuẩn quốc tế, hỗ trợ hiển thị tiếng Việt, Anh và Hàn',
    downloadPdf: 'Tải CV (In PDF)',
    personalInfo: '1. Thông tin cá nhân',
    careerObjective: '2. Mục tiêu nghề nghiệp',
    workExperience: '3. Kinh nghiệm làm việc',
    educationSection: '4. Học vấn & Bằng cấp',
    skillsCertificates: '5. Kỹ năng & Chứng chỉ',
    languagesSection: '6. Trình độ ngoại ngữ',
    atsStandardBadge: 'Chuẩn ATS Quốc tế',
    fullNameLabel: 'Họ và tên:',
    phoneLabel: 'Số điện thoại:',
    emailLabel: 'Email:',
    addressLabel: 'Địa chỉ:',

    // CareerTestView
    testTitle: 'Trắc nghiệm Định hướng Nghề nghiệp',
    testSubtitle: '10 câu hỏi tình huống thực tế giúp khám phá điểm mạnh, tính cách và công việc phù hợp nhất',
    nextQuestion: 'Câu tiếp theo',
    prevQuestion: 'Câu trước',
    viewResult: 'Xem kết quả phân tích',
    retakeTest: 'Làm lại bài kiểm tra',
    questionOf: 'Câu hỏi',
    matchedJobsTitle: 'Top công việc phù hợp nhất với bạn',

    // AuthModal
    authTitle: 'Đăng nhập / Đăng ký tài khoản',
    authSubtitle: 'Đăng nhập để lưu việc làm, nộp CV và nhắn tin trực tiếp với nhà tuyển dụng',
    switchCandidate: 'Chọn nhanh hồ sơ ứng viên mẫu:',
    continueGoogle: 'Tiếp tục với Google',
    continueEmail: 'Đăng nhập với Email',
    orDivider: 'hoặc',
    closeAuth: 'Đóng',

    // General & Cards
    applyNow: 'Ứng tuyển ngay',
    applied: 'Đã nộp đơn',
    saveJob: 'Lưu việc',
    saved: 'Đã lưu',
    chatWithRecruiter: 'Nhắn tin HR',
    fullTime: 'Toàn thời gian',
    partTime: 'Bán thời gian',
    remote: 'Làm việc từ xa',
    hybrid: 'Linh hoạt (Hybrid)',
    nightShift: 'Ca tối',
    distanceFromYou: 'từ vị trí của bạn',
    officePhotosCount: 'ảnh văn phòng',
    scheduleDetailsLabel: 'Lịch làm việc:',
    viewDetails: 'Chi tiết',
    justNow: 'Vừa xong',
    hoursAgo: 'giờ trước',
    daysAgo: 'ngày trước',
  },
  en: {
    // Navigation & Sidebar
    home: 'Home',
    searchJobs: 'Search Jobs',
    applications: 'Applications',
    cvBuilder: 'ATS Resume Builder',
    savedJobs: 'Saved Jobs',
    messages: 'Messages',
    careerTest: 'Career Quiz',
    profile: 'My Profile',
    brandTitle: 'Job',
    brandBadge: 'Careers',
    brandTagline: 'Recruitment & Job Platform',
    logoutBtn: 'Log Out',
    switchAccountBtn: 'Switch Account',

    // Search & Filter Module
    searchPlaceholder: 'Search jobs, skills, company location...',
    searchBtn: 'Search',
    keywordLabel: 'Keyword Search',
    keywordHelper: 'Supports cross-lingual search across Vietnamese - English - Korean',
    salaryFilterTitle: 'Expected Salary Range',
    minSalary: 'Min Salary',
    maxSalary: 'Max Salary',
    currencyLabel: 'Currency',
    locationFilterTitle: 'Location & Radius',
    cityLabel: 'Province / City',
    districtLabel: 'District / County',
    radiusLabel: 'Search Radius',
    radiusKm: 'km around location',
    currentLocation: 'Your current location',
    usingCurrentLocation: 'Locating around you',
    workTypeTitle: 'Work Arrangement',
    industryTitle: 'Industry',
    resetFilters: 'Reset Filters',
    resultsCount: 'matching jobs',
    sortBy: 'Sort by',
    sortBestMatch: 'Best Match',
    sortDistance: 'Nearest to Me',
    sortSalaryHigh: 'Highest Salary',
    sortRecent: 'Recently Posted',

    // Company Images & Environment Module
    companyPhotosTitle: 'Company Images & Work Environment',
    companyPhotosSubtitle: 'Explore real office spaces, pantry lounges, and team building moments',
    tagAll: 'All Photos',
    tagOffice: 'Office Spaces',
    tagPantry: 'Pantry & Lounge',
    tagTeamBuilding: 'Team Building & Activities',
    viewSlider: 'Slider View',
    viewGrid: 'Grid View',
    zoomPhoto: 'Click to zoom in (Lightbox)',
    closeLightbox: 'Close',
    prevPhoto: 'Previous Photo',
    nextPhoto: 'Next Photo',
    photoCount: 'Photo',

    // Job Requirements Module
    jobRequirementsTitle: 'Job Requirements & Qualifications',
    hardSkillsTitle: 'Hard & Technical Skills',
    softSkillsTitle: 'Soft Skills & Mindset',
    experienceAndDegreeTitle: 'Experience & Qualifications',
    minExperience: 'Minimum Experience',
    years: 'years',
    noExperienceNeeded: 'No experience required',
    educationLevel: 'Education Level',
    languageCertificates: 'Required Language Certificates',
    requiredCertificate: 'Mandatory',
    candidateFitBreakdown: 'Compatibility with your Profile',
    matchedScore: 'Match Score',
    matchedItems: 'Skills & qualifications you match',
    missingItems: 'Recommended skills to develop',

    // Candidate Preferences Module
    candidatePreferencesTitle: 'Candidate Career Preferences',
    candidatePreferencesSubtitle: 'Set your career expectations to receive curated job matches',
    prefWorkTypes: 'Preferred Work Arrangements',
    prefDesiredPositions: 'Target Roles & Industries (Max 3)',
    maxPositionsHint: 'You can choose up to 3 priority positions',
    prefExpectedSalary: 'Expected Salary',
    applyPreferencesFilter: 'Filter jobs matching my preferences',
    preferencesSaved: 'Career preferences updated successfully!',
    positionsLimitReached: 'Maximum 3 target positions reached',

    // HomeView
    heroBadge: 'Next-Gen Recruitment & Career Platform',
    heroTitle: 'Find the job that best fits your skills & schedule.',
    heroSubtitle: 'Powered by intelligent AI suggesting jobs based on your major, evening shifts, part-time, and closest distance in',
    aiSearchLabel: 'Describe what you need in natural language:',
    aiSearchPlaceholder: 'E.g., "Find an evening Korean teaching assistant near District 1, salary above $300"...',
    aiSearchBtn: 'Search with AI',
    statsJobs: '1,200+ Jobs',
    statsCompanies: '450+ Companies',
    statsMatchRate: '98% Match Rate',
    quickCategoriesTitle: 'Explore by Popular Industries',
    nearbyRadiusTitle: 'Job Recommendations by Radius',
    recommendedTitle: 'Featured Jobs & AI Recommendations',
    viewAllJobs: 'View All Jobs',
    whyChooseTitle: 'Why Choose Our Platform?',
    whyCard1Title: 'Precise Distance Radar',
    whyCard1Desc: 'Find jobs within a few kilometers of your apartment or university campus for an easy commute.',
    whyCard2Title: 'ATS Standards & Multilingual',
    whyCard2Desc: 'Automatically generate globally formatted resumes and connect with Korean & international firms.',
    whyCard3Title: 'Direct HR Communication',
    whyCard3Desc: 'Chat directly with recruiters and receive prompt feedback within hours.',
    jobsAroundYou: 'Jobs Around You',
    viewMoreJobs: 'View More Jobs',

    // ApplicationsView
    appTitle: 'Application Tracker',
    appSubtitle: 'Monitor your progress across all positions you have applied to',
    tabAll: 'All',
    tabSubmitted: 'Submitted',
    tabReviewing: 'Under Review',
    tabInterview: 'Interviewing',
    tabAccepted: 'Accepted',
    tabRejected: 'Declined',
    emptyAppsTitle: 'No job applications submitted yet',
    emptyAppsDesc: 'Discover suitable openings and apply today to kickstart your career.',
    interviewDetails: 'Interview Details:',
    hrNotesLabel: 'Notes from HR:',
    appliedDateLabel: 'Applied Date:',
    cvAttachedLabel: 'Submitted CV:',

    // SavedJobsView
    savedTitle: 'Saved Jobs',
    savedSubtitle: 'List of career opportunities you bookmarked for later review',
    emptySavedTitle: 'No saved jobs yet',
    emptySavedDesc: 'Click the bookmark icon on any job card to save it for easy access later.',
    exploreJobsBtn: 'Explore Jobs Now',

    // ChatView
    chatTitle: 'Recruiter Chat',
    chatSubtitle: 'Connect directly with HR teams and get swift hiring updates',
    chatPlaceholder: 'Type a message to the hiring manager...',
    sendBtn: 'Send',
    attachCVBtn: 'Quick Send CV',
    onlineStatus: 'Active now',
    offlineStatus: 'Offline',
    selectChatHint: 'Select a conversation from the left to start messaging',
    searchRecruiterPlaceholder: 'Search conversations, companies...',

    // CVBuilderView
    cvBuilderTitle: 'ATS Resume Builder & Manager',
    cvBuilderSubtitle: 'Internationally formatted resume supporting Vietnamese, English, and Korean',
    downloadPdf: 'Download CV (Print PDF)',
    personalInfo: '1. Personal Information',
    careerObjective: '2. Career Objective',
    workExperience: '3. Work Experience',
    educationSection: '4. Education & Degree',
    skillsCertificates: '5. Skills & Certifications',
    languagesSection: '6. Language Proficiencies',
    atsStandardBadge: 'International ATS Standard',
    fullNameLabel: 'Full Name:',
    phoneLabel: 'Phone Number:',
    emailLabel: 'Email:',
    addressLabel: 'Address:',

    // CareerTestView
    testTitle: 'Career Orientation Assessment',
    testSubtitle: '10 real-world situational questions to uncover your strengths, work style, and ideal career path',
    nextQuestion: 'Next Question',
    prevQuestion: 'Previous Question',
    viewResult: 'View Assessment Results',
    retakeTest: 'Retake Assessment',
    questionOf: 'Question',
    matchedJobsTitle: 'Top Career Matches for You',

    // AuthModal
    authTitle: 'Sign In / Register Account',
    authSubtitle: 'Log in to bookmark jobs, submit your ATS resume, and chat directly with employers',
    switchCandidate: 'Quick switch demo candidate:',
    continueGoogle: 'Continue with Google',
    continueEmail: 'Continue with Email',
    orDivider: 'or',
    closeAuth: 'Close',

    // General & Cards
    applyNow: 'Apply Now',
    applied: 'Applied',
    saveJob: 'Save',
    saved: 'Saved',
    chatWithRecruiter: 'Chat with HR',
    fullTime: 'Full-time',
    partTime: 'Part-time',
    remote: 'Remote',
    hybrid: 'Hybrid',
    nightShift: 'Night Shift',
    distanceFromYou: 'from your location',
    officePhotosCount: 'office photos',
    scheduleDetailsLabel: 'Schedule:',
    viewDetails: 'Details',
    justNow: 'Just now',
    hoursAgo: 'hours ago',
    daysAgo: 'days ago',
  },
  ko: {
    // Navigation & Sidebar
    home: '홈',
    searchJobs: '일자리 검색',
    applications: '지원 현황',
    cvBuilder: 'ATS 이력서 생성',
    savedJobs: '저장한 공고',
    messages: '메시지',
    careerTest: '진로 적성 검사',
    profile: '내 프로필',
    brandTitle: 'Job',
    brandBadge: '채용',
    brandTagline: '채용 및 구직 플랫폼',
    logoutBtn: '로그아웃',
    switchAccountBtn: '계정 전환',

    // Search & Filter Module
    searchPlaceholder: '직무, 급여, 회사 위치, 전문 기술 검색...',
    searchBtn: '검색',
    keywordLabel: '키워드 검색',
    keywordHelper: '한국어 - 영어 - 베트남어 다국어 상호 검색 자동 지원',
    salaryFilterTitle: '희망 급여 범위',
    minSalary: '최소 급여',
    maxSalary: '최대 급여',
    currencyLabel: '통화 단위',
    locationFilterTitle: '근무 위치 및 반경',
    cityLabel: '도시 / 성(Province)',
    districtLabel: '구 / 군(District)',
    radiusLabel: '검색 반경',
    radiusKm: 'km 반경 내',
    currentLocation: '현재 내 위치',
    usingCurrentLocation: '현재 위치 기반 검색 중',
    workTypeTitle: '근무 형태',
    industryTitle: '산업 분야',
    resetFilters: '필터 초기화',
    resultsCount: '개의 일치하는 채용공고',
    sortBy: '정렬 기준',
    sortBestMatch: '적합도 높은 순',
    sortDistance: '거리 가까운 순',
    sortSalaryHigh: '급여 높은 순',
    sortRecent: '최신 등록 순',

    // Company Images & Environment Module
    companyPhotosTitle: '회사 사진 및 근무 환경',
    companyPhotosSubtitle: '실제 사무실 공간, 휴게실(Pantry), 팀 빌딩 활동 사진을 확인하세요',
    tagAll: '전체 사진',
    tagOffice: '사무실 (Office)',
    tagPantry: '휴게실/팬트리 (Pantry)',
    tagTeamBuilding: '팀 빌딩 활동 (Team Building)',
    viewSlider: '슬라이더 보기 (Slider)',
    viewGrid: '그리드 보기 (Grid)',
    zoomPhoto: '라이트박스 확대 보기',
    closeLightbox: '닫기',
    prevPhoto: '이전 사진',
    nextPhoto: '다음 사진',
    photoCount: '사진',

    // Job Requirements Module
    jobRequirementsTitle: '채용 요건 및 자격 기준',
    hardSkillsTitle: '전문 기술 (Hard Skills)',
    softSkillsTitle: '소프트 스킬 (Soft Skills)',
    experienceAndDegreeTitle: '경력 및 학력 요건',
    minExperience: '최소 요구 경력',
    years: '년',
    noExperienceNeeded: '경력 무관 (신입 환영)',
    educationLevel: '최종 학력',
    languageCertificates: '어학 자격증 요건',
    requiredCertificate: '필수 제출',
    candidateFitBreakdown: '내 프로필과의 적합도 분석',
    matchedScore: '매칭 적합도',
    matchedItems: '보유 중인 일치 요건',
    missingItems: '추가 개발 권장 기술',

    // Candidate Preferences Module
    candidatePreferencesTitle: '구직자 희망 조건 (Candidate Preferences)',
    candidatePreferencesSubtitle: '희망 직무와 급여 조건을 설정하여 맞춤형 공고를 받아보세요',
    prefWorkTypes: '희망 근무 형태',
    prefDesiredPositions: '희망 직무/포지션 (최대 3개)',
    maxPositionsHint: '최대 3개 포지션까지만 선택하실 수 있습니다',
    prefExpectedSalary: '희망 급여',
    applyPreferencesFilter: '내 희망 조건으로 공고 필터링',
    preferencesSaved: '희망 조건이 성공적으로 저장되었습니다!',
    positionsLimitReached: '최대 3개 희망 직무가 이미 선택되었습니다',

    // HomeView
    heroBadge: '차세대 스마트 채용 & 진로 탐색 플랫폼',
    heroTitle: '당신의 역량과 일정에 가장 알맞은 일자리를 찾아보세요.',
    heroSubtitle: '전공, 야간 교대, 파트타임 및 가장 가까운 거리를 기반으로 맞춤 일자리를 추천하는 스마트 AI 탑재 -',
    aiSearchLabel: '자연어로 원하는 조건을 입력하세요:',
    aiSearchPlaceholder: '예: "1군 근처 저녁 한국어 조교 알바, 월급 300달러 이상"...',
    aiSearchBtn: 'AI로 검색',
    statsJobs: '1,200+ 개 채용공고',
    statsCompanies: '450+ 개 파트너 기업',
    statsMatchRate: '98% 매칭 만족도',
    quickCategoriesTitle: '인기 직무 분야별 탐색',
    nearbyRadiusTitle: '내 주변 반경별 맞춤 일자리',
    recommendedTitle: 'AI 추천 및 주목할 만한 채용공고',
    viewAllJobs: '전체 채용공고 보기',
    whyChooseTitle: '왜 본 플랫폼을 선택해야 할까요?',
    whyCard1Title: '정확한 거리 기반 레이더',
    whyCard1Desc: '거주지나 대학교 캠퍼스에서 수 km 이내의 편리한 통근 일자리를 빠르게 검색합니다.',
    whyCard2Title: 'ATS 표준 및 다국어 지원',
    whyCard2Desc: '국제 표준 규격 이력서를 자동 생성하고 한국 기업 및 글로벌 기업과 원활하게 연결합니다.',
    whyCard3Title: '채용담당자 1:1 직접 소통',
    whyCard3Desc: '인사담당자와 메신저로 실시간 질의응답을 진행하고 신속한 지원 결과를 확인하세요.',
    jobsAroundYou: '내 주변 추천 일자리',
    viewMoreJobs: '채용공고 더보기',

    // ApplicationsView
    appTitle: '지원 현황 관리',
    appSubtitle: '내가 입사 지원한 모든 채용공고의 전형 진행 상태를 확인하세요',
    tabAll: '전체',
    tabSubmitted: '서류 접수',
    tabReviewing: '서류 검토 중',
    tabInterview: '면접 제안',
    tabAccepted: '최종 합격',
    tabRejected: '불합격',
    emptyAppsTitle: '아직 지원한 채용공고가 없습니다',
    emptyAppsDesc: '나에게 꼭 맞는 채용공고를 탐색하고 첫 지원서를 제출해보세요.',
    interviewDetails: '면접 안내 사항:',
    hrNotesLabel: '인사팀 전달 사항:',
    appliedDateLabel: '지원 일자:',
    cvAttachedLabel: '제출한 이력서:',

    // SavedJobsView
    savedTitle: '저장한 공고 (스크랩)',
    savedSubtitle: '관심 등록하고 스크랩한 채용공고 보관함입니다',
    emptySavedTitle: '스크랩한 공고가 없습니다',
    emptySavedDesc: '채용공고 카드의 북마크 아이콘을 눌러 저장하고 나중에 지원해보세요.',
    exploreJobsBtn: '채용공고 탐색하러 가기',

    // ChatView
    chatTitle: '채용담당자 대화 (메시지)',
    chatSubtitle: '기업 인사팀과 1:1로 직접 소통하고 빠른 채용 안내를 받으세요',
    chatPlaceholder: '채용담당자에게 보낼 메시지를 입력하세요...',
    sendBtn: '전송',
    attachCVBtn: '이력서 바로 전송',
    onlineStatus: '접속 중',
    offlineStatus: '오프라인',
    selectChatHint: '좌측 대화 목록에서 기업을 선택하여 채팅을 시작하세요',
    searchRecruiterPlaceholder: '대화방 또는 회사명 검색...',

    // CVBuilderView
    cvBuilderTitle: 'ATS 표준 이력서 생성 및 관리',
    cvBuilderSubtitle: '베트남어, 영어, 한국어를 모두 지원하는 글로벌 표준 양식',
    downloadPdf: '이력서 다운로드 (PDF 인쇄)',
    personalInfo: '1. 기본 인적사항',
    careerObjective: '2. 희망 직무 및 목표',
    workExperience: '3. 주요 경력 사항',
    educationSection: '4. 학력 및 전공',
    skillsCertificates: '5. 보유 기술 및 자격증',
    languagesSection: '6. 어학 능력 (외국어)',
    atsStandardBadge: '국제 표준 ATS 호환',
    fullNameLabel: '성명:',
    phoneLabel: '연락처:',
    emailLabel: '이메일:',
    addressLabel: '주소지:',

    // CareerTestView
    testTitle: '진로 적성 및 성향 검사',
    testSubtitle: '10가지 실제 상황 질문을 통해 나의 강점과 가장 잘 맞는 최적의 직무를 추천받으세요',
    nextQuestion: '다음 문항',
    prevQuestion: '이전 문항',
    viewResult: '분석 결과 확인하기',
    retakeTest: '검사 다시하기',
    questionOf: '질문',
    matchedJobsTitle: '나에게 가장 잘 맞는 추천 직무 TOP',

    // AuthModal
    authTitle: '로그인 / 회원가입',
    authSubtitle: '공고 스크랩, 이력서 제출 및 채용담당자 채팅을 이용해보세요',
    switchCandidate: '체험용 샘플 지원자 빠른 전환:',
    continueGoogle: 'Google 계정으로 계속',
    continueEmail: '이메일로 로그인',
    orDivider: '또는',
    closeAuth: '닫기',

    // General & Cards
    applyNow: '즉시 지원',
    applied: '지원 완료',
    saveJob: '스크랩',
    saved: '스크랩됨',
    chatWithRecruiter: '인사담당자 채팅',
    fullTime: '풀타임 (Full-time)',
    partTime: '파트타임 (Part-time)',
    remote: '재택근무 (Remote)',
    hybrid: '하이브리드 (Hybrid)',
    nightShift: '야간 근무',
    distanceFromYou: '거리',
    officePhotosCount: '장의 사무실 사진',
    scheduleDetailsLabel: '근무 일정:',
    viewDetails: '상세보기',
    justNow: '방금 전',
    hoursAgo: '시간 전',
    daysAgo: '일 전',
  },
};

/**
 * Localized dictionary for industries
 */
export const LOCALIZED_INDUSTRIES: Record<string, Record<Language, string>> = {
  'Tất cả ngành nghề': {
    vi: 'Tất cả ngành nghề',
    en: 'All Industries',
    ko: '전체 산업 분야',
  },
  'Giáo dục & Ngôn ngữ': {
    vi: 'Giáo dục & Ngôn ngữ',
    en: 'Education & Languages',
    ko: '교육 및 어학',
  },
  'Chăm sóc khách hàng': {
    vi: 'Chăm sóc khách hàng',
    en: 'Customer Support (CS)',
    ko: '고객상담 및 CS',
  },
  'Biên phiên dịch & Ngôn ngữ': {
    vi: 'Biên phiên dịch & Ngôn ngữ',
    en: 'Translation & Interpretation',
    ko: '통번역 및 언어',
  },
  'Dịch vụ F&B & Bán lẻ': {
    vi: 'Dịch vụ F&B & Bán lẻ',
    en: 'F&B & Retail Services',
    ko: '식음료(F&B) 및 유통',
  },
  'Công nghệ thông tin': {
    vi: 'Công nghệ thông tin (IT)',
    en: 'Information Technology (IT)',
    ko: '정보기술 (IT/소프트웨어)',
  },
  'Marketing & Truyền thông': {
    vi: 'Marketing & Truyền thông',
    en: 'Marketing & Media',
    ko: '마케팅 및 미디어',
  },
  'Hành chính & Nhân sự': {
    vi: 'Hành chính & Nhân sự',
    en: 'Administration & HR',
    ko: '경영지원 및 인사(HR)',
  },
};

/**
 * Localized dictionary for work types
 */
export const LOCALIZED_WORK_TYPES: Record<string, Record<Language, string>> = {
  'Tất cả': {
    vi: 'Tất cả hình thức',
    en: 'All Arrangements',
    ko: '전체 근무 형태',
  },
  'Toàn thời gian': {
    vi: 'Toàn thời gian (Full-time)',
    en: 'Full-time',
    ko: '풀타임 (정규/계약)',
  },
  'Bán thời gian (Part-time)': {
    vi: 'Bán thời gian (Part-time)',
    en: 'Part-time',
    ko: '파트타임 (알바)',
  },
  'Ca tối': {
    vi: 'Ca tối',
    en: 'Evening Shift',
    ko: '야간/저녁 교대',
  },
  'Linh hoạt': {
    vi: 'Linh hoạt (Hybrid)',
    en: 'Flexible (Hybrid)',
    ko: '탄력근무 (하이브리드)',
  },
  'Làm việc từ xa (Remote)': {
    vi: 'Làm việc từ xa (Remote)',
    en: 'Remote (Work from Home)',
    ko: '재택근무 (원격근무)',
  },
};

/**
 * Localized dictionary for cities
 */
export const LOCALIZED_CITIES: Record<string, Record<Language, string>> = {
  'Tất cả thành phố': {
    vi: 'Tất cả thành phố',
    en: 'All Cities',
    ko: '전체 도시',
  },
  'TP. Hồ Chí Minh': {
    vi: 'TP. Hồ Chí Minh',
    en: 'Ho Chi Minh City',
    ko: '호치민시',
  },
  'Hà Nội': {
    vi: 'Hà Nội',
    en: 'Hanoi',
    ko: '하노이',
  },
  'Đà Nẵng': {
    vi: 'Đà Nẵng',
    en: 'Da Nang',
    ko: '다낭',
  },
  'Seoul (Hàn Quốc)': {
    vi: 'Seoul (Hàn Quốc)',
    en: 'Seoul (South Korea)',
    ko: '서울 (대한민국)',
  },
  'Làm việc từ xa (Remote)': {
    vi: 'Làm việc từ xa (Remote)',
    en: 'Remote (Global)',
    ko: '재택/원격 (전역)',
  },
};

/**
 * Helper to get localized job strings safely
 */
export function getLocalizedJobTitle(job: Job, lang: Language): string {
  if (job.titles && job.titles[lang]) {
    return job.titles[lang];
  }
  return job.title;
}

export function getLocalizedJobDescription(job: Job, lang: Language): string {
  if (job.descriptions && job.descriptions[lang]) {
    return job.descriptions[lang];
  }
  return job.description;
}

export function getLocalizedWorkType(workType: string, lang: Language): string {
  return LOCALIZED_WORK_TYPES[workType]?.[lang] || workType;
}

export function getLocalizedIndustry(industry: string, lang: Language): string {
  return LOCALIZED_INDUSTRIES[industry]?.[lang] || industry;
}

export function getLocalizedPostedTime(time: string, lang: Language): string {
  if (time.includes('Vừa xong') || time.toLowerCase().includes('just now')) {
    return TRANSLATIONS[lang].justNow;
  }
  if (time.includes('giờ trước') || time.includes('hours ago')) {
    const num = time.replace(/\D/g, '') || '2';
    return lang === 'ko' ? `${num}${TRANSLATIONS[lang].hoursAgo}` : `${num} ${TRANSLATIONS[lang].hoursAgo}`;
  }
  if (time.includes('ngày trước') || time.includes('days ago')) {
    const num = time.replace(/\D/g, '') || '1';
    return lang === 'ko' ? `${num}${TRANSLATIONS[lang].daysAgo}` : `${num} ${TRANSLATIONS[lang].daysAgo}`;
  }
  return time;
}

/**
 * Cross-lingual synonym groups:
 * If user queries any word in a group, all other related words in KO, EN, VI are matched!
 */
export const SYNONYM_GROUPS: string[][] = [
  // 1. Tech & Developer
  [
    'developer', 'lập trình viên', 'lập trình', 'dev', 'frontend', 'backend',
    'react', 'it', 'công nghệ', 'công nghệ thông tin', 'software', 'engineer',
    '개발자', '개발', '프론트엔드', '백엔드', '소프트웨어', '프로그래머', '엔지니어'
  ],
  // 2. Korean Language & Education
  [
    'korean', 'tiếng hàn', 'trợ giảng', 'giáo dục', 'topik', 'ngoại ngữ', 'sư phạm',
    '한국어', '한국', '강사', '튜터', '교육', '토픽', '어학', '한국어 강사', '조교'
  ],
  // 3. Customer Service
  [
    'cskh', 'chăm sóc khách hàng', 'customer service', 'support', 'tư vấn', 'tổng đài',
    '고객센터', '상담', '고객 지원', 'cs', '고객 서비스'
  ],
  // 4. Translation & Interpretation
  [
    'dịch thuật', 'biên dịch', 'phiên dịch', 'translator', 'translation', 'interpreter',
    'dịch', 'phụ đề', '번역', '통역', '통번역', '번역가', '통역사'
  ],
  // 5. Sales & Business
  [
    'kinh doanh', 'bán hàng', 'sales', 'nhân viên kinh doanh', 'telesales', 'thu ngân',
    'quầy', 'bán lẻ', 'retail', '영업', '판매', '세일즈', '매장 관리'
  ],
  // 6. Marketing & Media
  [
    'marketing', 'truyền thông', 'content', 'sáng tạo', 'tiktok', 'media', 'quảng cáo',
    '마케팅', '콘텐츠', '기획', '미디어', '홍보', 'sns'
  ],
  // 7. Food & Beverage / Restaurant
  [
    'phục vụ', 'barista', 'nhà hàng', 'waiter', 'service', 'f&b', 'bồi bàn', 'pha chế',
    'ẩm thực', '서빙', '바리스타', '레스토랑', '식음료', '카페'
  ],
  // 8. Design & Creative
  [
    'thiết kế', 'designer', 'ui/ux', 'graphic', 'đồ họa', 'canva',
    '디자인', '디자이너', '그래픽'
  ],
  // 9. Internship & Entry Level
  [
    'thực tập', 'thực tập sinh', 'intern', 'internship', 'trainee', 'junior',
    'mới bắt đầu', 'chưa có kinh nghiệm', '인턴', '실습생', '주니어', '신입'
  ],
  // 10. Part-time & Night Shift
  [
    'part-time', 'bán thời gian', 'ca tối', 'linh hoạt', 'part time',
    '파트타임', '알바', '아르바이트', '야간', '시간제'
  ],
  // 11. Remote
  [
    'remote', 'từ xa', 'tại nhà', 'work from home', 'wfh', '재택', '재택근무', '원격'
  ],
];

/**
 * Expand a user query with all cross-lingual equivalents
 */
export function getExpandedSearchTerms(query: string): string[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];

  const terms = new Set<string>([clean]);
  const words = clean.split(/\s+/).filter(Boolean);

  for (const group of SYNONYM_GROUPS) {
    const matchesGroup = group.some((keyword) => {
      return clean.includes(keyword) || keyword.includes(clean) || words.some((w) => keyword.includes(w));
    });

    if (matchesGroup) {
      group.forEach((item) => terms.add(item));
    }
  }

  return Array.from(terms);
}
