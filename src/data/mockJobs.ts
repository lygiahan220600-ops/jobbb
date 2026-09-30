import { Job } from '../types/job';

// High-fidelity generated image paths for company environments
const OFFICE_PHOTO_1 = '/src/assets/images/company_modern_office_1790735338668.jpg';
const PANTRY_PHOTO_1 = '/src/assets/images/company_pantry_lounge_1790735349480.jpg';
const TEAM_BUILDING_PHOTO_1 = '/src/assets/images/company_team_building_1790735360546.jpg';
const TECH_OFFICE_PHOTO = '/src/assets/images/vietnam_tech_office_1790732879386.jpg';
const WORKSPACE_HERO_PHOTO = '/src/assets/images/hero_job_workspace_1790732853663.jpg';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Trợ giảng tiếng Hàn (Lớp Giao tiếp & Sơ cấp)',
    titles: {
      vi: 'Trợ giảng tiếng Hàn (Lớp Giao tiếp & Sơ cấp)',
      en: 'Korean Teaching Assistant (Basic & Conversational)',
      ko: '한국어 교육 보조 강사 (기초 및 회화반)',
    },
    company: 'Trung tâm Ngoại ngữ Seoul Link',
    companyLogo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=120&auto=format&fit=crop&q=80',
    location: {
      district: 'Quận 1',
      city: 'TP. Hồ Chí Minh',
      fullAddress: '142 Đinh Tiên Hoàng, Phường Đa Kao, Quận 1, TP. HCM',
    },
    distanceKm: 1.2,
    salaryRange: '45.000đ - 65.000đ / giờ (5 - 8 triệu / tháng)',
    salaryMin: 5,
    salaryMax: 8,
    currency: 'VND',
    workType: 'Bán thời gian (Part-time)',
    industry: 'Giáo dục & Ngôn ngữ',
    experienceLevel: 'Chưa có kinh nghiệm',
    scheduleDetails: 'Ca tối: 18:30 - 20:30 (Thứ 2, 4, 6 hoặc Thứ 3, 5, 7)',
    description: 'Hỗ trợ giáo viên bản xứ Hàn Quốc quản lý lớp học sơ cấp, hướng dẫn học viên luyện phát âm chuẩn, chấm bài tập về nhà và tạo không khí học tập sôi nổi.',
    descriptions: {
      vi: 'Hỗ trợ giáo viên bản xứ Hàn Quốc quản lý lớp học sơ cấp, hướng dẫn học viên luyện phát âm chuẩn, chấm bài tập về nhà và tạo không khí học tập sôi nổi.',
      en: 'Support native Korean teachers with beginner classrooms, facilitate accurate pronunciation drills, mark assignments, and foster an engaging communicative learning atmosphere.',
      ko: '한국인 원어민 강사의 기초 회화 수업을 보조하고, 수강생 발음 교정, 과제 채점 및 활기찬 면학 분위기 조성을 담당합니다.',
    },
    requirements: [
      'Sinh viên chuyên ngành tiếng Hàn từ năm 2 trở lên hoặc có chứng chỉ TOPIK 3/4',
      'Phát âm chuẩn, giao tiếp vui vẻ, kiên nhẫn với học viên mới bắt đầu',
      'Chưa cần kinh nghiệm giảng dạy trước đó, trung tâm sẽ đào tạo phương pháp sư phạm 1 tuần',
      'Đúng giờ và có tinh thần trách nhiệm với lớp học',
    ],
    structuredRequirements: {
      hardSkills: [
        { name: 'Tiếng Hàn giao tiếp', level: 'Trung cấp (TOPIK 3-4)', category: 'Language' },
        { name: 'Phát âm chuẩn & Ngữ pháp sơ cấp', level: 'Thành thạo', category: 'Pedagogy' },
        { name: 'Tin học văn phòng cơ bản (Canva/PPT)', level: 'Cơ bản', category: 'Software' },
      ],
      softSkills: [
        'Kỹ năng sư phạm & Kiên nhẫn',
        'Giao tiếp truyền cảm hứng',
        'Quản lý thời gian & Đúng giờ',
        'Làm việc nhóm với giáo viên bản xứ',
      ],
      experience: {
        minYears: 0,
        description: {
          vi: 'Chấp nhận sinh viên chưa có kinh nghiệm giảng dạy, được đào tạo bài bản 1 tuần',
          en: 'No prior teaching experience required; comprehensive 1-week pedagogical training provided',
          ko: '강의 경력 무관 (수습 1주일간 교수법 집중 트레이닝 제공)',
        },
      },
      qualifications: {
        educationLevel: 'Sinh viên năm 2 trở lên (Đại học/Cao đẳng)',
        major: 'Ngôn ngữ Hàn, Đông phương học, Thương mại quốc tế',
        languageCertificates: [
          { name: 'TOPIK', levelOrScore: 'Cấp độ 3 trở lên (Level 3+)', mandatory: true },
        ],
      },
    },
    benefits: [
      'Môi trường giao tiếp 100% với giáo viên người Hàn, tăng phản xạ nhanh chóng',
      'Học bổng giảm 70% các khóa luyện thi TOPIK nâng cao tại trung tâm',
      'Hỗ trợ dấu mộc thực tập tốt nghiệp khi có nhu cầu',
      'Thưởng chuyên cần và thưởng đánh giá hài lòng từ học viên mỗi khóa',
    ],
    companyPhotos: [
      {
        id: 'photo-1-1',
        url: OFFICE_PHOTO_1,
        tag: 'office',
        caption: {
          vi: 'Không gian phòng học và khu vực làm việc của trợ giảng hiện đại, ánh sáng tự nhiên',
          en: 'Modern bright classroom and assistant workspace with ergonomic setup',
          ko: '채광이 좋은 현대적인 강의실 및 조교 전용 업무 공간',
        },
      },
      {
        id: 'photo-1-2',
        url: PANTRY_PHOTO_1,
        tag: 'pantry',
        caption: {
          vi: 'Khu pantry đồ uống và cà phê phục vụ miễn phí cho giảng viên và nhân viên',
          en: 'Cozy pantry with complimentary espresso machine and refreshments',
          ko: '강사진과 직원을 위한 무료 커피 머신 및 휴게 스낵 바',
        },
      },
      {
        id: 'photo-1-3',
        url: TEAM_BUILDING_PHOTO_1,
        tag: 'team_building',
        caption: {
          vi: 'Chuyến dã ngoại giao lưu văn hóa Việt - Hàn hàng năm cùng đội ngũ giáo viên',
          en: 'Annual Korea-Vietnam cultural retreat with faculty and staff',
          ko: '한-베 교원 및 조교진 연례 문화 교류 워크숍',
        },
      },
    ],
    postedTime: 'Vừa xong',
    urgent: true,
    hot: true,
    matchScore: 98,
    recruiter: {
      id: 'rec-1',
      name: 'Ms. Park Min Young',
      position: 'Trưởng phòng Đào tạo & Tuyển dụng',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      online: true,
      email: 'recruitment@seoullink.edu.vn',
      phone: '0903 821 445',
    },
  },
  {
    id: 'job-2',
    title: 'Nhân viên CSKH / Chăm sóc Khách hàng tiếng Hàn (Part-time Ca tối)',
    titles: {
      vi: 'Nhân viên CSKH / Chăm sóc Khách hàng tiếng Hàn (Part-time Ca tối)',
      en: 'Korean Customer Support Specialist (Evening Part-time)',
      ko: '한국어 고객상담/CS 담당자 (야간 파트타임)',
    },
    company: 'Công ty Cổ phần Thương mại K-Vina Life',
    companyLogo: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=120&auto=format&fit=crop&q=80',
    location: {
      district: 'Quận Bình Thạnh',
      city: 'TP. Hồ Chí Minh',
      fullAddress: '56 Điện Biên Phủ, Phường 25, Quận Bình Thạnh, TP. HCM',
    },
    distanceKm: 2.4,
    salaryRange: '6 - 9 triệu / tháng + Hoa hồng thưởng',
    salaryMin: 6,
    salaryMax: 9,
    currency: 'VND',
    workType: 'Ca tối',
    industry: 'Chăm sóc khách hàng',
    experienceLevel: 'Chưa có kinh nghiệm',
    scheduleDetails: 'Ca tối: 17:30 - 22:00 (Nghỉ 1 ngày trong tuần tự chọn)',
    description: 'Trực tổng đài tin nhắn, fanpage và hotline giải đáp thông tin đơn hàng mỹ phẩm & thời trang Hàn Quốc cho khách hàng. Hỗ trợ dịch thông tin sản phẩm từ hãng.',
    descriptions: {
      vi: 'Trực tổng đài tin nhắn, fanpage và hotline giải đáp thông tin đơn hàng mỹ phẩm & thời trang Hàn Quốc cho khách hàng. Hỗ trợ dịch thông tin sản phẩm từ hãng.',
      en: 'Handle chat channels, social media inquiries, and hotline support for Korean cosmetics and lifestyle orders. Assist in translating product specifications.',
      ko: '한국 코스메틱/라이프스타일 브랜드 고객 문의 채팅 응대, 주문 확인 및 제품 정보 국문/베트남어 번역 지원.',
    },
    requirements: [
      'Giao tiếp tiếng Hàn cơ bản đến khá (tương đương TOPIK 2-3 trở lên), gõ máy tính tiếng Hàn tốt',
      'Thái độ nhã nhặn, giọng nói dễ nghe, thấu hiểu tâm lý khách hàng',
      'Chấp nhận sinh viên chưa có kinh nghiệm, ưu tiên sinh viên năm 2, 3 năng động',
    ],
    structuredRequirements: {
      hardSkills: [
        { name: 'Đánh máy tiếng Hàn (한글 타자)', level: 'Thành thạo (300+ wpm)', category: 'Typing' },
        { name: 'Tiếng Hàn giao tiếp', level: 'TOPIK 3 trở lên', category: 'Language' },
        { name: 'Sử dụng hệ thống CRM/Chatbot', level: 'Cơ bản', category: 'Software' },
      ],
      softSkills: [
        'Kỹ năng lắng nghe & Xử lý tình huống',
        'Thái độ nhã nhặn, lịch sự',
        'Kiểm soát cảm xúc dưới áp lực',
      ],
      experience: {
        minYears: 0,
        description: {
          vi: 'Không yêu cầu kinh nghiệm, có hướng dẫn chi tiết quy trình xử lý khi bắt đầu',
          en: 'Entry level, full on-the-job procedural onboarding provided',
          ko: '경력 무관 (초기 3일간 업무 매뉴얼 및 응대 가이드 교육 제공)',
        },
      },
      qualifications: {
        educationLevel: 'Cao đẳng / Đại học (hoặc đang là sinh viên)',
        languageCertificates: [
          { name: 'TOPIK', levelOrScore: 'TOPIK 2-3 trở lên', mandatory: false },
        ],
      },
    },
    benefits: [
      'Thưởng KPI theo tỷ lệ phản hồi và chốt đơn tích cực (1 - 3 triệu/tháng)',
      'Phụ cấp tiền ăn tối và gửi xe miễn phí tại tòa nhà',
      'Được tiếp xúc trực tiếp quy trình thương mại điện tử chuyên nghiệp',
      'Cơ hội lên vị trí Chuyên viên CSKH Full-time sau khi tốt nghiệp',
    ],
    companyPhotos: [
      {
        id: 'photo-2-1',
        url: TECH_OFFICE_PHOTO,
        tag: 'office',
        caption: {
          vi: 'Văn phòng làm việc mở, trang bị máy tính và tai nghe chống ồn chuyên dụng',
          en: 'Open-concept workspace equipped with noise-cancelling headsets and dual screens',
          ko: '노이즈 캔슬링 헤드셋과 듀얼 모니터가 구비된 쾌적한 CS 센터',
        },
      },
      {
        id: 'photo-2-2',
        url: PANTRY_PHOTO_1,
        tag: 'pantry',
        caption: {
          vi: 'Phòng nghỉ ca tối với quầy trà bánh và ghế sofa thư giãn',
          en: 'Evening break lounge with complimentary teas and comfy sofas',
          ko: '야간 근무자를 위한 아늑한 다과실 및 릴랙스 소파 존',
        },
      },
      {
        id: 'photo-2-3',
        url: TEAM_BUILDING_PHOTO_1,
        tag: 'team_building',
        caption: {
          vi: 'Hoạt động tiệc sinh nhật hàng tháng và giao lưu nội bộ phòng CSKH',
          en: 'Monthly birthday celebrations and team dinners',
          ko: '매월 정기 생일 축하 파티 및 팀 회식',
        },
      },
    ],
    postedTime: '2 giờ trước',
    urgent: true,
    hot: true,
    matchScore: 94,
    recruiter: {
      id: 'rec-2',
      name: 'Anh Trần Quốc Bảo',
      position: 'HR Manager - K-Vina',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      online: true,
      email: 'baotran@k-vina.vn',
      phone: '0912 345 678',
    },
  },
  {
    id: 'job-3',
    title: 'Cộng tác viên Dịch thuật tiếng Hàn (Tài liệu / Video / Phụ đề)',
    titles: {
      vi: 'Cộng tác viên Dịch thuật tiếng Hàn (Tài liệu / Video / Phụ đề)',
      en: 'Freelance Korean Translator (Docs / Subtitles / Video Content)',
      ko: '한국어 프리랜서 번역가 (문서 / 영상 자막 / 콘텐츠)',
    },
    company: 'Công ty Truyền thông Hallyu Waves Media',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    location: {
      district: 'Quận 3',
      city: 'TP. Hồ Chí Minh',
      fullAddress: '215 Võ Thị Sáu, Phường Võ Thị Sáu, Quận 3, TP. HCM',
    },
    distanceKm: 2.1,
    salaryRange: '4 - 8 triệu / tháng (Tính theo sản phẩm & khối lượng từ)',
    salaryMin: 4,
    salaryMax: 8,
    currency: 'VND',
    workType: 'Làm việc từ xa (Remote)',
    industry: 'Biên phiên dịch & Ngôn ngữ',
    experienceLevel: 'Chưa có kinh nghiệm',
    scheduleDetails: 'Thời gian hoàn toàn tự do tại nhà, chỉ cần đảm bảo deadline',
    description: 'Biên dịch các đoạn video ngắn, tin tức giải trí, bài viết văn hóa và tài liệu giới thiệu sản phẩm từ tiếng Hàn sang tiếng Việt mạch lạc, tự nhiên.',
    descriptions: {
      vi: 'Biên dịch các đoạn video ngắn, tin tức giải trí, bài viết văn hóa và tài liệu giới thiệu sản phẩm từ tiếng Hàn sang tiếng Việt mạch lạc, tự nhiên.',
      en: 'Translate short-form entertainment videos, cultural essays, and product catalogs from Korean into natural, engaging Vietnamese.',
      ko: '숏폼 영상 자막, 엔터테인먼트 뉴스, 문화 칼럼 및 홍보 카탈로그 한-베 전문 번역 작업.',
    },
    requirements: [
      'Khả năng đọc hiểu tiếng Hàn tốt, văn phong tiếng Việt trôi chảy, linh hoạt',
      'Có máy tính cá nhân kết nối Internet ổn định',
      'Đúng hạn và cẩn thận trong việc tra cứu thuật ngữ mới',
    ],
    structuredRequirements: {
      hardSkills: [
        { name: 'Đọc hiểu & Biên dịch tiếng Hàn', level: 'TOPIK 4-5', category: 'Translation' },
        { name: 'Văn phong tiếng Việt linh hoạt', level: 'Thành thạo', category: 'Writing' },
        { name: 'Công cụ làm phụ đề (Aegisub/CapCut)', level: 'Cơ bản', category: 'Software' },
      ],
      softSkills: [
        'Kỷ luật tự giác làm việc từ xa',
        'Tỉ mỉ, cẩn thận từng câu chữ',
        'Quản lý thời gian và tôn trọng deadline',
      ],
      experience: {
        minYears: 0,
        description: {
          vi: 'Không bắt buộc số năm kinh nghiệm, đánh giá qua bài test dịch thử 200 từ online',
          en: 'No years requirement; candidate assessed via a quick 200-word translation trial',
          ko: '경력 연수 무관 (온라인 200단어 샘플 번역 테스트로 역량 평가)',
        },
      },
      qualifications: {
        educationLevel: 'Sinh viên hoặc cử nhân các ngành ngôn ngữ/báo chí',
        languageCertificates: [
          { name: 'TOPIK', levelOrScore: 'TOPIK 4 trở lên', mandatory: false },
        ],
      },
    },
    benefits: [
      'Chủ động 100% thời gian, cực kỳ phù hợp với lịch học bận rộn của sinh viên',
      'Thanh toán nhuận bút minh bạch vào ngày 05 hàng tháng',
      'Được biên tập viên kỳ cựu sửa bài và nâng cao kỹ năng hành văn',
    ],
    companyPhotos: [
      {
        id: 'photo-3-1',
        url: WORKSPACE_HERO_PHOTO,
        tag: 'office',
        caption: {
          vi: 'Văn phòng truyền thông sáng tạo tại Quận 3 với không gian ghi hình và dựng video',
          en: 'Creative studio office in District 3 with dedicated editing suites',
          ko: '영상 편집실과 스튜디오가 완비된 3군 크리에이티브 미디어 오피스',
        },
      },
      {
        id: 'photo-3-2',
        url: PANTRY_PHOTO_1,
        tag: 'pantry',
        caption: {
          vi: 'Khu vực quầy bar đồ ăn vặt và không gian trao đổi kịch bản',
          en: 'Snack bar and brainstorm lounge for collaborative script reviews',
          ko: '스낵바와 자유로운 대본 기획이 가능한 브레인스토밍 라운지',
        },
      },
      {
        id: 'photo-3-3',
        url: TEAM_BUILDING_PHOTO_1,
        tag: 'team_building',
        caption: {
          vi: 'Workshop thường niên nâng cao kỹ năng chuyển ngữ video cùng các chuyên gia',
          en: 'Annual media subtitling masterclass and team outing',
          ko: '영상 번역 전문가 초청 연례 마스터클래스 및 워크숍',
        },
      },
    ],
    postedTime: '5 giờ trước',
    urgent: false,
    hot: true,
    matchScore: 91,
    recruiter: {
      id: 'rec-3',
      name: 'Chị Đặng Thảo Linh',
      position: 'Biên tập viên trưởng',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      online: false,
      email: 'thaolinh@hallyumedia.com',
    },
  },
  {
    id: 'job-6',
    title: 'Thực tập sinh / Junior Frontend React Developer',
    titles: {
      vi: 'Thực tập sinh / Junior Frontend React Developer',
      en: 'Frontend React Developer (Intern / Junior)',
      ko: '프론트엔드 React 개발자 (인턴 / 주니어)',
    },
    company: 'FPT Software & Digital Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=120&auto=format&fit=crop&q=80',
    location: {
      district: 'TP. Thủ Đức',
      city: 'TP. Hồ Chí Minh',
      fullAddress: 'Khu Công Nghệ Cao, Xa lộ Hà Nội, TP. Thủ Đức, TP. HCM',
    },
    distanceKm: 8.5,
    salaryRange: '8 - 14 triệu / tháng',
    salaryMin: 8,
    salaryMax: 14,
    currency: 'VND',
    workType: 'Toàn thời gian',
    industry: 'Công nghệ thông tin',
    experienceLevel: 'Dưới 1 năm',
    scheduleDetails: 'Thứ 2 - Thứ 6: 08:30 - 17:30 (Hybrid 2 ngày remote)',
    description: 'Tham gia xây dựng giao diện ứng dụng web hiện đại với React, TypeScript và Tailwind CSS. Phối hợp với team UI/UX và Backend hoàn thiện các tính năng cốt lõi.',
    descriptions: {
      vi: 'Tham gia xây dựng giao diện ứng dụng web hiện đại với React, TypeScript và Tailwind CSS. Phối hợp với team UI/UX và Backend hoàn thiện các tính năng cốt lõi.',
      en: 'Build modern responsive web applications using React, TypeScript, and Tailwind CSS. Collaborate with UI/UX and backend engineers on core features.',
      ko: 'React, TypeScript, Tailwind CSS 기반의 모던 웹 애플리케이션 프론트엔드 개발 및 UI/UX, 백엔드 팀 협업.',
    },
    requirements: [
      'Nắm chắc kiến thức HTML5, CSS3, JavaScript ES6+, React Hooks',
      'Có sản phẩm demo cá nhân hoặc đồ án tốt nghiệp bằng React/TypeScript',
      'Tinh thần ham học hỏi công nghệ mới, tư duy giải thuật tốt',
    ],
    structuredRequirements: {
      hardSkills: [
        { name: 'React & TypeScript', level: 'Trung cấp (Intermediate)', category: 'Frontend' },
        { name: 'Tailwind CSS / HTML5 / CSS3', level: 'Thành thạo', category: 'Styling' },
        { name: 'Git & GitHub Workflow', level: 'Cơ bản', category: 'DevTools' },
        { name: 'RESTful API Integration', level: 'Trung cấp', category: 'Networking' },
      ],
      softSkills: [
        'Tư duy giải quyết vấn đề (Problem Solving)',
        'Giao tiếp kỹ thuật & Code Review',
        'Chủ động nghiên cứu tài liệu kỹ thuật',
      ],
      experience: {
        minYears: 0.5,
        description: {
          vi: 'Dưới 1 năm kinh nghiệm hoặc có đồ án tốt nghiệp / pet-project xuất sắc',
          en: 'Less than 1 year or demonstrated portfolio / GitHub repositories',
          ko: '경력 1년 미만 또는 탄탄한 깃허브 포트폴리오/졸업 프로젝트 보유자',
        },
      },
      qualifications: {
        educationLevel: 'Cử nhân CNTT, Kỹ thuật Phần mềm hoặc Khoa học Máy tính',
        languageCertificates: [
          { name: 'IELTS / TOEIC', levelOrScore: 'TOEIC 650+ hoặc tương đương', mandatory: false },
        ],
      },
    },
    benefits: [
      'Mentor 1:1 từ Senior Tech Lead kèm cặp suốt quá trình làm việc',
      'Xét tăng lương 6 tháng/lần, phụ cấp ăn trưa và chứng chỉ quốc tế',
      'Môi trường campus công nghệ xanh với sân bóng rổ, phòng gym',
    ],
    companyPhotos: [
      {
        id: 'photo-6-1',
        url: TECH_OFFICE_PHOTO,
        tag: 'office',
        caption: {
          vi: 'Campus công nghệ với khu vực lập trình hiện đại và phòng họp kính cách âm',
          en: 'Tech campus development hall with soundproof meeting pods',
          ko: '방음 미팅 부스와 최신 개발 환경이 갖춰진 테크 캠퍼스 오피스',
        },
      },
      {
        id: 'photo-6-2',
        url: PANTRY_PHOTO_1,
        tag: 'pantry',
        caption: {
          vi: 'Khu vực Pantry giải trí với máy pha cà phê, bàn bi-lắc và thức ăn nhẹ',
          en: 'Spacious cafeteria lounge with foosball table and specialty coffee',
          ko: '에스프레소 머신과 푸스볼 게임대가 있는 사내 복지 팬트리',
        },
      },
      {
        id: 'photo-6-3',
        url: TEAM_BUILDING_PHOTO_1,
        tag: 'team_building',
        caption: {
          vi: 'Đội ngũ kỹ sư phần mềm tham gia ngày hội thể thao FPT Tech Day',
          en: 'Engineering department at the annual tech championship and sports festival',
          ko: '연례 소프트웨어 엔지니어링 챔피언십 및 테크 데이 축제',
        },
      },
    ],
    postedTime: '1 ngày trước',
    urgent: false,
    hot: true,
    matchScore: 82,
    recruiter: {
      id: 'rec-6',
      name: 'Anh Nguyễn Hoàng Nam',
      position: 'Talent Acquisition Partner',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80',
      online: true,
      email: 'namnh@fsoft.com.vn',
    },
  },
  {
    id: 'job-7',
    title: 'Nhân viên Sáng tạo Nội dung / Content Creator TikTok & Fanpage',
    titles: {
      vi: 'Nhân viên Sáng tạo Nội dung / Content Creator TikTok & Fanpage',
      en: 'Content Creator & Social Media Marketer (TikTok & Facebook)',
      ko: '콘텐츠 크리에이터 / SNS 마케터 (틱톡 및 소셜 미디어)',
    },
    company: 'GenZ Agency & Media Hub',
    companyLogo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=120&auto=format&fit=crop&q=80',
    location: {
      district: 'Quận 10',
      city: 'TP. Hồ Chí Minh',
      fullAddress: '382 Ba Tháng Hai, Phường 12, Quận 10, TP. HCM',
    },
    distanceKm: 3.2,
    salaryRange: '5 - 9 triệu / tháng (Part-time hoặc Full-time)',
    salaryMin: 5,
    salaryMax: 9,
    currency: 'VND',
    workType: 'Linh hoạt',
    industry: 'Marketing & Truyền thông',
    experienceLevel: 'Chưa có kinh nghiệm',
    scheduleDetails: 'Linh hoạt lên văn phòng 3 buổi/tuần, còn lại làm online',
    description: 'Lên kịch bản video ngắn, bắt trend TikTok, viết caption bán hàng hấp dẫn và hỗ trợ quay dựng video đơn giản bằng điện thoại / CapCut.',
    descriptions: {
      vi: 'Lên kịch bản video ngắn, bắt trend TikTok, viết caption bán hàng hấp dẫn và hỗ trợ quay dựng video đơn giản bằng điện thoại / CapCut.',
      en: 'Script viral short-form videos, capitalize on TikTok trends, craft engaging social copy, and produce video edits using CapCut.',
      ko: '틱톡 트렌드 기반 숏폼 영상 기획 및 대본 작성, SNS 홍보 카피라이팅, CapCut 영상 편집.',
    },
    requirements: [
      'Thích lướt mạng xã hội, nhạy bén với xu hướng thịnh hành của giới trẻ',
      'Văn phong dí dỏm, tự nhiên, không sáo rỗng',
      'Có mắt thẩm mỹ tốt, biết dùng Canva / CapCut cơ bản',
    ],
    structuredRequirements: {
      hardSkills: [
        { name: 'Kịch bản Video ngắn & TikTok Viral', level: 'Trung cấp', category: 'Creative' },
        { name: 'CapCut & Premiere cơ bản', level: 'Cơ bản', category: 'Editing' },
        { name: 'Thiết kế Canva / Typography', level: 'Trung cấp', category: 'Design' },
      ],
      softSkills: [
        'Nhạy cảm với xu hướng thị trường (Trend-hunting)',
        'Sáng tạo không rập khuôn',
        'Làm việc nhóm và tinh thần trách nhiệm',
      ],
      experience: {
        minYears: 0,
        description: {
          vi: 'Không yêu cầu kinh nghiệm, ưu tiên ứng viên có tài khoản TikTok cá nhân active',
          en: 'No experience needed; active personal TikTok or creative portfolio preferred',
          ko: '경력 무관 (개인 SNS 채널 운영 경험자 또는 끼가 넘치는 지원자 환영)',
        },
      },
      qualifications: {
        educationLevel: 'Sinh viên hoặc vừa tốt nghiệp Cao đẳng / Đại học',
      },
    },
    benefits: [
      'Được tiếp cận kho tài liệu đào tạo marketing thực chiến hàng đầu',
      'Môi trường làm việc trẻ trung 9x - GenZ cực kỳ vui vẻ',
      'Trà sữa và bánh ngọt miễn phí trong phòng pantry',
    ],
    companyPhotos: [
      {
        id: 'photo-7-1',
        url: WORKSPACE_HERO_PHOTO,
        tag: 'office',
        caption: {
          vi: 'Studio sáng tạo nội dung với hệ thống đèn livestream chuyên nghiệp',
          en: 'Content creation studio equipped with professional ring lights',
          ko: '전문 라이브 조명과 촬영 장비가 갖춰진 크리에이티브 스튜디오',
        },
      },
      {
        id: 'photo-7-2',
        url: PANTRY_PHOTO_1,
        tag: 'pantry',
        caption: {
          vi: 'Quầy bánh ngọt và tủ lạnh trà sữa luôn đầy ắp mỗi ngày',
          en: 'Milk tea and snack bar restocked daily for high creative energy',
          ko: '아이디어 회의를 지원하는 무제한 밀크티 및 간식 냉장고',
        },
      },
      {
        id: 'photo-7-3',
        url: TEAM_BUILDING_PHOTO_1,
        tag: 'team_building',
        caption: {
          vi: 'Team Agency dã ngoại cắm trại và chụp lookbook thời trang',
          en: 'Creative agency camping trip and fashion editorial shoot',
          ko: '트렌디한 감성의 야외 캠핑 워크숍 및 룩북 촬영',
        },
      },
    ],
    postedTime: '4 giờ trước',
    urgent: false,
    hot: false,
    matchScore: 88,
    recruiter: {
      id: 'rec-7',
      name: 'Chị Lê Ngọc Hân',
      position: 'Creative Director',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
      online: true,
      email: 'hanle@genzagency.vn',
    },
  },
  {
    id: 'job-4',
    title: 'Nhân viên Phục vụ Ca tối (Nhà hàng Ẩm thực Hàn Quốc Hanok)',
    titles: {
      vi: 'Nhân viên Phục vụ Ca tối (Nhà hàng Ẩm thực Hàn Quốc Hanok)',
      en: 'Evening Service Crew (Hanok Korean Restaurant)',
      ko: '저녁 서빙 직원 (한옥 한국 전통 식당)',
    },
    company: 'Chuỗi Nhà hàng Hanok BBQ & Bistro',
    companyLogo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=120&auto=format&fit=crop&q=80',
    location: {
      district: 'Quận 1',
      city: 'TP. Hồ Chí Minh',
      fullAddress: '28 Lê Thánh Tôn, Bến Nghé, Quận 1, TP. HCM',
    },
    distanceKm: 0.8,
    salaryRange: '32.000đ - 42.000đ / giờ + Tip tiền mặt hằng ngày',
    salaryMin: 4.5,
    salaryMax: 7,
    currency: 'VND',
    workType: 'Ca tối',
    industry: 'Dịch vụ F&B & Bán lẻ',
    experienceLevel: 'Chưa có kinh nghiệm',
    scheduleDetails: 'Ca tối: 18:00 - 23:00 (Được đăng ký lịch làm linh hoạt theo tuần)',
    description: 'Đón tiếp thực khách (nhiều khách Hàn Quốc và chuyên gia nước ngoài), giới thiệu thực đơn, order món, phục vụ đồ ăn và giữ vệ sinh khu vực bàn tiệc.',
    descriptions: {
      vi: 'Đón tiếp thực khách (nhiều khách Hàn Quốc và chuyên gia nước ngoài), giới thiệu thực đơn, order món, phục vụ đồ ăn và giữ vệ sinh khu vực bàn tiệc.',
      en: 'Welcome diners (predominantly Korean expats and tourists), present menus, take orders, and ensure exemplary table hospitality.',
      ko: '한국인 고객 및 외국인 고객 환대, 메뉴 안내, 주문 접수 및 홀 서빙 관리.',
    },
    requirements: [
      'Nhanh nhẹn, trung thực, có thái độ phục vụ khách hàng lịch thiệp',
      'Ưu tiên bạn biết chào hỏi tiếng Hàn cơ bản (được cộng thêm phụ cấp ngoại ngữ 500k/tháng)',
      'Không yêu cầu kinh nghiệm phục vụ, được quản lý hướng dẫn tận tình ngày đầu',
    ],
    structuredRequirements: {
      hardSkills: [
        { name: 'Giao tiếp tiếng Hàn chào hỏi cơ bản', level: 'Sơ cấp', category: 'Language' },
        { name: 'Sử dụng máy tính tiền POS / Tablet order', level: 'Cơ bản', category: 'POS' },
      ],
      softSkills: [
        'Tác phong lịch thiệp, chu đáo',
        'Nhanh nhẹn trong giờ cao điểm',
        'Thật thà, trung thực và sạch sẽ',
      ],
      experience: {
        minYears: 0,
        description: {
          vi: 'Không yêu cầu kinh nghiệm, quản lý trực tiếp hướng dẫn chu đáo',
          en: 'No prior service experience needed; on-the-floor coaching provided',
          ko: '식당 서빙 경험 무관 (신규 입사자 친절 교육)',
        },
      },
      qualifications: {
        educationLevel: 'Học sinh, sinh viên các trường tại TP.HCM',
      },
    },
    benefits: [
      'Bao ăn 1 bữa cơm tối ngon miệng tại nhà hàng',
      'Tiền tip chia đều mỗi ngày theo ca làm việc (trung bình 30k - 60k/ca)',
      'Môi trường giao lưu quốc tế trẻ trung, đồng nghiệp thân thiện hỗ trợ nhau',
    ],
    companyPhotos: [
      {
        id: 'photo-4-1',
        url: OFFICE_PHOTO_1,
        tag: 'office',
        caption: {
          vi: 'Không gian nhà hàng sang trọng mang đậm nét kiến trúc truyền thống Hàn Quốc',
          en: 'Traditional Hanok-inspired dining hall and service counters',
          ko: '한국 전통 한옥 양식의 정갈하고 고급스러운 홀 인테리어',
        },
      },
      {
        id: 'photo-4-2',
        url: PANTRY_PHOTO_1,
        tag: 'pantry',
        caption: {
          vi: 'Phòng ăn và nghỉ ngơi riêng biệt dành cho nhân viên sau ca phục vụ',
          en: 'Dedicated employee dining room with hot meal provisions',
          ko: '직원 전용 식사 공간 및 휴게 탈의실',
        },
      },
      {
        id: 'photo-4-3',
        url: TEAM_BUILDING_PHOTO_1,
        tag: 'team_building',
        caption: {
          vi: 'Đội ngũ nhân viên nhà hàng sum vầy trong tiệc liên hoan cuối năm',
          en: 'Hanok restaurant team year-end banquet and award night',
          ko: '한옥 레스토랑 전 직원 송년 감사 파티',
        },
      },
    ],
    postedTime: '1 ngày trước',
    urgent: true,
    hot: false,
    matchScore: 85,
    recruiter: {
      id: 'rec-4',
      name: 'Anh Kim Min Jae & QL Tuấn Anh',
      position: 'Quản lý vận hành nhà hàng',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      online: true,
      email: 'hanok.recruitment@gmail.com',
      phone: '0988 776 554',
    },
  },
];

export const CITIES_LIST = [
  'Tất cả thành phố',
  'TP. Hồ Chí Minh',
  'Hà Nội',
  'Đà Nẵng',
  'Seoul (Hàn Quốc)',
  'Làm việc từ xa (Remote)',
];

export const DISTRICTS_HCM = [
  'Tất cả khu vực',
  'Quận 1',
  'Quận 3',
  'Quận Bình Thạnh',
  'Quận 10',
  'Quận Phú Nhuận',
  'TP. Thủ Đức',
  'Quận 7',
  'Quận Tân Bình',
  'Quận Gò Vấp',
  'Gangnam-gu (Seoul)',
  'Mapo-gu (Seoul)',
];

export const INDUSTRIES_LIST = [
  'Tất cả ngành nghề',
  'Giáo dục & Ngôn ngữ',
  'Chăm sóc khách hàng',
  'Biên phiên dịch & Ngôn ngữ',
  'Dịch vụ F&B & Bán lẻ',
  'Công nghệ thông tin',
  'Marketing & Truyền thông',
  'Hành chính & Nhân sự',
];

export const WORK_TYPES_LIST: Job['workType'][] = [
  'Tất cả',
  'Bán thời gian (Part-time)',
  'Ca tối',
  'Linh hoạt',
  'Toàn thời gian',
  'Làm việc từ xa (Remote)',
];

export const SALARY_RANGES = [
  { label: 'Tất cả mức lương', min: 0, max: 999 },
  { label: 'Dưới 5 triệu / tháng', min: 0, max: 5 },
  { label: '5 - 10 triệu / tháng', min: 5, max: 10 },
  { label: '10 - 20 triệu / tháng', min: 10, max: 20 },
  { label: 'Trên 20 triệu / tháng', min: 20, max: 999 },
];
