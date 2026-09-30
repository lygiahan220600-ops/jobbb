export type UserRole = 'candidate' | 'recruiter';

export type CandidateNavScreen = 
  | 'home'
  | 'search'
  | 'applications'
  | 'cv'
  | 'saved'
  | 'chat'
  | 'test'
  | 'profile';

export type RecruiterNavScreen =
  | 'recruiter_dashboard'
  | 'recruiter_jobs'
  | 'recruiter_applications'
  | 'recruiter_chat'
  | 'recruiter_profile';

export type NavScreen = CandidateNavScreen | RecruiterNavScreen;
export type Currency = 'VND' | 'USD' | 'KRW';

export type WorkType = 
  | 'Tất cả'
  | 'Toàn thời gian'
  | 'Bán thời gian (Part-time)'
  | 'Ca tối'
  | 'Linh hoạt'
  | 'Làm việc từ xa (Remote)';

export type ExperienceLevel =
  | 'Tất cả'
  | 'Chưa có kinh nghiệm'
  | 'Dưới 1 năm'
  | '1 - 3 năm'
  | 'Trên 3 năm';

export type CompanyPhotoTag = 'office' | 'pantry' | 'team_building';

export interface CompanyPhoto {
  id: string;
  url: string;
  tag: CompanyPhotoTag;
  caption: {
    vi: string;
    en: string;
    ko: string;
  };
  dimensions?: string;
}

export interface HardSkillItem {
  name: string;
  level: string; // e.g., 'Cơ bản' | 'Trung cấp' | 'Thành thạo' or 'Basic' | 'Advanced'
  category?: string;
}

export interface LanguageCertItem {
  name: string; // 'TOPIK' | 'IELTS' | 'TOEIC'
  levelOrScore: string;
  mandatory: boolean;
}

export interface JobRequirementsStructured {
  hardSkills: HardSkillItem[];
  softSkills: string[];
  experience: {
    minYears: number;
    description: {
      vi: string;
      en: string;
      ko: string;
    };
  };
  qualifications: {
    educationLevel: string;
    major?: string;
    languageCertificates?: LanguageCertItem[];
    additionalNotes?: string[];
  };
}

export interface CandidatePreferences {
  workTypes: ('Toàn thời gian' | 'Bán thời gian (Part-time)' | 'Làm việc từ xa (Remote)' | 'Linh hoạt')[];
  desiredPositions: string[]; // max 3 positions
  expectedSalary: {
    min: number;
    max: number;
    currency: Currency;
  };
}

export interface Recruiter {
  id: string;
  name: string;
  position: string;
  avatar: string;
  online: boolean;
  phone?: string;
  email?: string;
}

export interface Job {
  id: string;
  title: string;
  titles?: {
    vi: string;
    en: string;
    ko: string;
  };
  company: string;
  companyLogo: string;
  location: {
    district: string;
    city: string;
    fullAddress: string;
  };
  distanceKm: number; // Khoảng cách từ vị trí người dùng
  salaryRange: string;
  salaryMin: number; // Triệu VND / tháng hoặc tương đương
  salaryMax: number;
  currency?: Currency;
  workType: WorkType;
  industry: string;
  experienceLevel: ExperienceLevel;
  scheduleDetails: string;
  description: string;
  descriptions?: {
    vi: string;
    en: string;
    ko: string;
  };
  requirements: string[];
  structuredRequirements?: JobRequirementsStructured;
  benefits: string[];
  companyPhotos?: CompanyPhoto[];
  postedTime: string;
  urgent?: boolean;
  hot?: boolean;
  status?: 'active' | 'paused';
  applicantCount?: number;
  matchScore?: number; // Điểm phù hợp tính toán cho ứng viên
  recruiter: Recruiter;
}

export type ApplicationStatus = 'submitted' | 'reviewing' | 'interview' | 'accepted' | 'rejected';

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  candidateName?: string;
  candidateEmail?: string;
  candidatePhone?: string;
  candidateAvatar?: string;
  candidateBio?: string;
  candidateMajor?: string;
  appliedDate: string;
  status: ApplicationStatus;
  statusText: string;
  interviewDate?: string;
  interviewFormat?: 'Online Google Meet' | 'Trực tiếp tại văn phòng';
  interviewLocation?: string;
  hrNotes?: string;
  cvAttachedName: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderType: 'user' | 'recruiter';
  senderName: string;
  text: string;
  timestamp: string;
  cvAttachment?: {
    name: string;
    size: string;
  };
}

export interface Conversation {
  id: string;
  recruiter: Recruiter;
  companyName: string;
  jobId: string;
  jobTitle: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  candidateId?: string;
  candidateName?: string;
  messages: ChatMessage[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'ai_match' | 'job_alert' | 'application_update' | 'message';
  timestamp: string;
  read: boolean;
  jobId?: string;
  relatedRole?: string;
}

export interface UserProfile {
  id: string;
  role?: UserRole;
  companyName?: string;
  recruiterPosition?: string;
  companyAddress?: string;
  companyWebsite?: string;
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  district: string;
  city: string;
  studentStatus: string;
  major: string;
  university: string;
  bio: string;
  skills: string[];
  languages: string[];
  preferredWorkTypes: string[];
  preferredSchedule: string;
  preferredSalary: string;
  preferredLocation: string;
  radiusKm: number;
  preferences?: CandidatePreferences;
}

export interface CVData {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  avatarUrl: string;
  objective: string;
  education: {
    school: string;
    major: string;
    period: string;
    gpa?: string;
    achievements?: string;
  }[];
  experience: {
    role: string;
    company: string;
    period: string;
    description: string;
  }[];
  skills: string[];
  languages: {
    language: string;
    proficiency: string;
  }[];
  certificates: string[];
  activities: string[];
}

export interface AssessmentOption {
  label: string;
  value: string;
  trait: string;
  scoreMap: Record<string, number>;
}

export interface AssessmentQuestion {
  id: number;
  question: string;
  scenario: string;
  options: AssessmentOption[];
}

export interface AssessmentResult {
  skills: string[];
  interests: string[];
  matchedIndustries: string[];
  topJobs: {
    title: string;
    matchPercentage: number;
    whyFit: string;
    startingSalary: string;
    keyStrengths: string[];
  }[];
  roadmapTip: string;
}
