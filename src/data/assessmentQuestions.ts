import { Language } from '../types/job';

export interface AssessmentOptionLocalized {
  label: string;
  value: string;
  trait: string;
  scoreMap: Record<string, number>;
}

export interface AssessmentQuestionLocalized {
  id: number;
  question: string;
  scenario: string;
  options: AssessmentOptionLocalized[];
}

interface AssessmentQuestionData {
  id: number;
  question: { vi: string; en: string; ko: string };
  scenario: { vi: string; en: string; ko: string };
  options: {
    label: { vi: string; en: string; ko: string };
    value: string;
    trait: { vi: string; en: string; ko: string };
    scoreMap: Record<string, number>;
  }[];
}

const RAW_QUESTIONS: AssessmentQuestionData[] = [
  {
    id: 1,
    question: {
      vi: 'Khi rảnh rỗi vào buổi tối hoặc cuối tuần, hoạt động nào khiến bạn cảm thấy hào hứng và tái tạo năng lượng nhất?',
      en: 'In your free evening or weekend time, which activity energizes and fulfills you the most?',
      ko: '저녁이나 주말 여가 시간에 당신에게 가장 활력과 보람을 주는 활동은 무엇인가요?',
    },
    scenario: {
      vi: 'Sở thích & Xu hướng nạp năng lượng',
      en: 'Recharging & Leisure Style',
      ko: '여가 성향 및 에너지 충전 스타일',
    },
    options: [
      {
        label: {
          vi: 'Gặp gỡ bạn bè, trò chuyện, giao lưu văn hóa hoặc khám phá các quán cà phê mới',
          en: 'Meeting friends, conversing, cultural exchanges, or discovering cozy cafes',
          ko: '친구들과의 대화, 문화 교류, 또는 새로운 카페 탐방 및 소통',
        },
        value: 'social_explore',
        trait: {
          vi: 'Giao tiếp & Dịch vụ xã hội',
          en: 'Social Communication & Service',
          ko: '대인 커뮤니케이션 및 서비스',
        },
        scoreMap: { 'Dịch vụ F&B & Bán lẻ': 3, 'Chăm sóc khách hàng': 3, 'Giáo dục & Ngôn ngữ': 2 },
      },
      {
        label: {
          vi: 'Học một ngoại ngữ mới, xem phim có phụ đề nước ngoài hoặc đọc sách tìm hiểu văn hóa',
          en: 'Learning a new foreign language, watching subtitled movies, or cultural reading',
          ko: '외국어 학습, 자막이 있는 외국 영화 감상, 해외 문화 관련 독서',
        },
        value: 'language_culture',
        trait: {
          vi: 'Ngoại ngữ & Khám phá tri thức',
          en: 'Linguistics & Knowledge Exploration',
          ko: '어학 및 글로벌 지식 탐구',
        },
        scoreMap: { 'Giáo dục & Ngôn ngữ': 4, 'Biên phiên dịch & Ngôn ngữ': 4, 'Chăm sóc khách hàng': 2 },
      },
      {
        label: {
          vi: 'Tự tay lập kế hoạch, viết lách, thiết kế hình ảnh hoặc dựng video ngắn trên điện thoại',
          en: 'Planning creative ideas, writing blogs, designing visuals, or editing short clips',
          ko: '아이디어 기획, 글쓰기, 숏폼 영상 제작 및 소셜 미디어 디자인',
        },
        value: 'creative_content',
        trait: {
          vi: 'Sáng tạo & Truyền thông',
          en: 'Creativity & Social Media',
          ko: '창의성 및 미디어 기획',
        },
        scoreMap: { 'Marketing & Truyền thông': 4, 'Biên phiên dịch & Ngôn ngữ': 2 },
      },
      {
        label: {
          vi: 'Tìm hiểu công nghệ, ứng dụng AI, tối ưu hóa máy tính hoặc giải các câu đố logic',
          en: 'Exploring tech tools, AI apps, system optimization, or solving logic puzzles',
          ko: 'IT 기술 탐색, AI 도구 활용, 시스템 최적화 및 논리 퍼즐 해결',
        },
        value: 'tech_logic',
        trait: {
          vi: 'Tư duy kỹ thuật & Hệ thống',
          en: 'Technical Mindset & Logic',
          ko: '기술적 사고 및 시스템 구축',
        },
        scoreMap: { 'Công nghệ thông tin': 4, 'Phân tích dữ liệu': 3 },
      },
    ],
  },
  {
    id: 2,
    question: {
      vi: 'Nếu được phân công một nhiệm vụ trong nhóm học tập hoặc dự án làm việc, bạn thường tự tin đảm nhận vai trò nào nhất?',
      en: 'When assigned a group project or team assignment, which role do you naturally excel at?',
      ko: '팀 프로젝트나 그룹 과제에서 당신이 가장 자신 있게 맡는 역할은 무엇인가요?',
    },
    scenario: {
      vi: 'Phong cách làm việc đội nhóm',
      en: 'Teamwork & Collaboration Role',
      ko: '팀워크 및 협업 역할 스타일',
    },
    options: [
      {
        label: {
          vi: 'Người kết nối, lắng nghe nhu cầu của các thành viên và thuyết trình ý tưởng trước mọi người',
          en: 'The connector who actively listens to members and presents ideas convincingly',
          ko: '팀원들의 의견을 조율하고 대중 앞에서 아이디어를 발표하는 커뮤니케이터',
        },
        value: 'communicator',
        trait: {
          vi: 'Thuyết phục & Truyền cảm hứng',
          en: 'Persuasion & Presentation',
          ko: '설득력 및 프레젠테이션',
        },
        scoreMap: { 'Giáo dục & Ngôn ngữ': 3, 'Chăm sóc khách hàng': 3, 'Dịch vụ F&B & Bán lẻ': 2 },
      },
      {
        label: {
          vi: 'Người cẩn thận biên soạn nội dung, kiểm tra câu chữ, dịch thuật hoặc tra cứu tài liệu',
          en: 'The meticulous researcher who refines copy, translates documents, and audits accuracy',
          ko: '자료를 철저히 조사하고 문서를 꼼꼼하게 검토/번역하는 리서처',
        },
        value: 'researcher',
        trait: {
          vi: 'Tỉ mỉ & Chi tiết chuẩn xác',
          en: 'Meticulous Research & Detail',
          ko: '정확성 및 세밀한 문서화',
        },
        scoreMap: { 'Biên phiên dịch & Ngôn ngữ': 4, 'Giáo dục & Ngôn ngữ': 2 },
      },
      {
        label: {
          vi: 'Người năng nổ lo hậu cần, sắp xếp công việc thực tế, xử lý nhanh các tình huống phát sinh',
          en: 'The energetic organizer managing logistics, coordination, and rapid troubleshooting',
          ko: '현장 실무를 총괄하고 돌발 상황에 기민하게 대처하는 오거나이저',
        },
        value: 'organizer',
        trait: {
          vi: 'Hành động nhanh & Vận hành',
          en: 'Action-Oriented Operations',
          ko: '실행력 및 현장 운영 관리',
        },
        scoreMap: { 'Dịch vụ F&B & Bán lẻ': 4, 'Hành chính & Nhân sự': 3 },
      },
      {
        label: {
          vi: 'Người xây dựng cấu trúc giải pháp, thiết kế trang trình chiếu hoặc viết code kỹ thuật',
          en: 'The builder architecting technical solutions, crafting slides, or writing clean code',
          ko: '솔루션 구조를 설계하고 기술 구현 또는 코딩을 담당하는 엔지니어',
        },
        value: 'builder',
        trait: {
          vi: 'Giải pháp kỹ thuật',
          en: 'Technical Solution Architecture',
          ko: '기술 솔루션 아키텍처',
        },
        scoreMap: { 'Công nghệ thông tin': 4, 'Marketing & Truyền thông': 2 },
      },
    ],
  },
  {
    id: 3,
    question: {
      vi: 'Khi gặp một vị khách hoặc người đối diện đang bối rối hoặc có thắc mắc khó, phản xạ đầu tiên của bạn là gì?',
      en: 'When encountering a confused or frustrated client/partner, what is your initial reflex?',
      ko: '당황하거나 불만을 가진 고객 또는 동료를 마주했을 때 당신의 첫 대처는 무엇인가요?',
    },
    scenario: {
      vi: 'Thấu cảm & Kỹ năng ứng xử',
      en: 'Empathy & Conflict Resolution',
      ko: '공감 능력 및 갈등 해결',
    },
    options: [
      {
        label: {
          vi: 'Kiên nhẫn lắng nghe hết câu chuyện, tươi cười và tìm cách hỗ trợ họ từng bước nhẹ nhàng',
          en: 'Patiently listen through, smile warmly, and guide them step-by-step with calm reassurance',
          ko: '끝까지 경청하며 미소와 함께 차근차근 해결 방안을 안내한다',
        },
        value: 'empathy_patient',
        trait: {
          vi: 'Thấu cảm cao & Kiên nhẫn',
          en: 'High Empathy & Patience',
          ko: '높은 공감력과 인내심',
        },
        scoreMap: { 'Chăm sóc khách hàng': 4, 'Giáo dục & Ngôn ngữ': 4, 'Dịch vụ F&B & Bán lẻ': 3 },
      },
      {
        label: {
          vi: 'Tra cứu thông tin chính xác từ tài liệu hoặc quy định rồi giải thích một cách gãy gọn',
          en: 'Look up official reference manuals or rules and articulate a clear, concise answer',
          ko: '규정 및 매뉴얼을 정확히 확인한 후 명확하고 간결하게 설명한다',
        },
        value: 'structured_clarity',
        trait: {
          vi: 'Tư duy logic & Minh bạch',
          en: 'Structured Logic & Precision',
          ko: '논리적 전달력과 명확성',
        },
        scoreMap: { 'Biên phiên dịch & Ngôn ngữ': 3, 'Chăm sóc khách hàng': 2 },
      },
      {
        label: {
          vi: 'Nhanh nhẹn đưa ra phương án thay thế thực tế ngay tức thì để khách không phải chờ đợi',
          en: 'Provide a swift practical alternative right away so they don\'t wait in discomfort',
          ko: '고객이 대기하지 않도록 즉각적인 실질 대안을 제시한다',
        },
        value: 'quick_solver',
        trait: {
          vi: 'Ứng biến tình huống',
          en: 'Agile Problem Solving',
          ko: '민첩한 임기응변',
        },
        scoreMap: { 'Dịch vụ F&B & Bán lẻ': 4, 'Chăm sóc khách hàng': 3 },
      },
      {
        label: {
          vi: 'Phân tích nguyên nhân gốc rễ và đề xuất cách cải tiến quy trình để lỗi không lặp lại',
          en: 'Analyze the underlying root cause and suggest workflow improvements to prevent recurrence',
          ko: '근본 원인을 분석하여 동일한 문제가 재발하지 않도록 프로세스 개선을 제안한다',
        },
        value: 'system_optimizer',
        trait: {
          vi: 'Phân tích hệ thống',
          en: 'Systemic Process Optimization',
          ko: '시스템 분석 및 프로세스 개선',
        },
        scoreMap: { 'Công nghệ thông tin': 3, 'Hành chính & Nhân sự': 3 },
      },
    ],
  },
  {
    id: 4,
    question: {
      vi: 'Môi trường làm việc lý tưởng trong mắt bạn có đặc điểm như thế nào?',
      en: 'What defines your ideal workplace environment?',
      ko: '당신이 가장 선호하는 이상적인 근무 환경은 어떤 모습인가요?',
    },
    scenario: {
      vi: 'Môi trường & Không gian làm việc',
      en: 'Workplace & Atmosphere Fit',
      ko: '근무 환경 및 분위기 적합성',
    },
    options: [
      {
        label: {
          vi: 'Năng động, nhiều cơ hội giao tiếp quốc tế với người nước ngoài (Hàn Quốc, Mỹ, v.v.)',
          en: 'Energetic, filled with opportunities to converse with international expats (Korean, English)',
          ko: '외국인(한국, 서구권 등)과 활발히 교류할 수 있는 글로벌하고 역동적인 환경',
        },
        value: 'global_dynamic',
        trait: {
          vi: 'Hội nhập quốc tế',
          en: 'Global Exposure',
          ko: '글로벌 교류 지향',
        },
        scoreMap: { 'Giáo dục & Ngôn ngữ': 4, 'Biên phiên dịch & Ngôn ngữ': 4, 'Chăm sóc khách hàng': 3 },
      },
      {
        label: {
          vi: 'Linh hoạt, chủ động thời gian, có thể làm việc online/từ xa tại nhà hoặc quán cà phê',
          en: 'Flexible, autonomous schedule with remote/hybrid work options from home or cafes',
          ko: '시간 자율성이 보장되며 재택 또는 카페에서 자유롭게 원격 근무가 가능한 환경',
        },
        value: 'flexible_remote',
        trait: {
          vi: 'Tự chủ & Linh hoạt',
          en: 'Autonomy & Flexibility',
          ko: '자율성 및 원격 근무',
        },
        scoreMap: { 'Biên phiên dịch & Ngôn ngữ': 4, 'Công nghệ thông tin': 3, 'Marketing & Truyền thông': 3 },
      },
      {
        label: {
          vi: 'Vui vẻ, đồng nghiệp trẻ trung thân thiện, cùng nhau hỗ trợ phục vụ khách hàng chu đáo',
          en: 'Friendly, youthful team spirit working side-by-side to deliver stellar hospitality',
          ko: '젊고 친절한 동료들과 서로 도우며 고객에게 훌륭한 서비스를 제공하는 환경',
        },
        value: 'service_teamwork',
        trait: {
          vi: 'Tinh thần đồng đội',
          en: 'Team Cohesion & Camaraderie',
          ko: '팀워크 및 협동심',
        },
        scoreMap: { 'Dịch vụ F&B & Bán lẻ': 4, 'Chăm sóc khách hàng': 3 },
      },
      {
        label: {
          vi: 'Chuyên nghiệp, đề cao tính sáng tạo, quy trình rõ ràng và có nhiều cơ hội thăng tiến',
          en: 'Professional, valuing innovation, clear career growth ladders, and structured mentorship',
          ko: '명확한 프로세스, 혁신 장려, 빠른 커리어 성장 기회가 보장되는 전문적인 환경',
        },
        value: 'structured_career',
        trait: {
          vi: 'Phát triển chuyên môn',
          en: 'Professional Progression',
          ko: '전문성 및 경력 개발',
        },
        scoreMap: { 'Công nghệ thông tin': 4, 'Hành chính & Nhân sự': 3 },
      },
    ],
  },
  {
    id: 5,
    question: {
      vi: 'Kỹ năng nào bạn cảm thấy mình làm tốt nhất và muốn tiếp tục trau dồi?',
      en: 'Which skill do you feel most proficient in and eager to sharpen further?',
      ko: '현재 가장 자신 있으며 앞으로 더욱 발전시키고 싶은 역량은 무엇인가요?',
    },
    scenario: {
      vi: 'Điểm mạnh năng lực cá nhân',
      en: 'Core Competency & Strength',
      ko: '핵심 역량 및 강점 분야',
    },
    options: [
      {
        label: {
          vi: 'Giao tiếp ngoại ngữ (tiếng Hàn hoặc tiếng Anh), truyền đạt kiến thức dễ hiểu',
          en: 'Foreign language fluency (Korean/English) and explaining concepts clearly',
          ko: '외국어 구사 능력(한국어/영어) 및 이해하기 쉬운 설명/전달력',
        },
        value: 'teaching_lang',
        trait: {
          vi: 'Truyền thụ tri thức',
          en: 'Knowledge Sharing',
          ko: '지식 전달 및 교수법',
        },
        scoreMap: { 'Giáo dục & Ngôn ngữ': 4, 'Biên phiên dịch & Ngôn ngữ': 3 },
      },
      {
        label: {
          vi: 'Lắng nghe, thấu hiểu tâm lý người khác và chăm sóc khách hàng tận tình',
          en: 'Active listening, reading emotional cues, and customer care dedication',
          ko: '경청, 고객 심리 파악 및 정성 어린 고객 케어',
        },
        value: 'customer_care',
        trait: {
          vi: 'Chăm sóc khách hàng',
          en: 'Client Care & Empathy',
          ko: '고객 응대 및 케어',
        },
        scoreMap: { 'Chăm sóc khách hàng': 4, 'Dịch vụ F&B & Bán lẻ': 3 },
      },
      {
        label: {
          vi: 'Bắt trend mạng xã hội, sáng tạo nội dung, chụp ảnh hoặc làm clip cuốn hút',
          en: 'Tracking social trends, creative copywriting, visual design, and viral short clips',
          ko: '소셜 트렌드 포착, 창의적인 카피라이팅 및 감각적인 영상 편집',
        },
        value: 'trend_creative',
        trait: {
          vi: 'Nội dung số',
          en: 'Digital Storytelling',
          ko: '디지털 콘텐츠 제작',
        },
        scoreMap: { 'Marketing & Truyền thông': 4, 'Biên phiên dịch & Ngôn ngữ': 2 },
      },
      {
        label: {
          vi: 'Tư duy logic, giải quyết lỗi kỹ thuật, làm việc thành thạo với phần mềm hoặc code',
          en: 'Logical reasoning, code debugging, and operating advanced software tools',
          ko: '논리적 문제 해결, 소프트웨어 활용 및 코드 디버깅',
        },
        value: 'coding_tech',
        trait: {
          vi: 'Công nghệ & Kỹ thuật',
          en: 'Technical Troubleshooting',
          ko: '소프트웨어 및 기술 구현',
        },
        scoreMap: { 'Công nghệ thông tin': 4, 'Hành chính & Nhân sự': 2 },
      },
    ],
  },
];

/**
 * Returns localized assessment questions for the given language
 */
export function getAssessmentQuestions(lang: Language = 'vi'): AssessmentQuestionLocalized[] {
  return RAW_QUESTIONS.map((q) => ({
    id: q.id,
    question: q.question[lang] || q.question.vi,
    scenario: q.scenario[lang] || q.scenario.vi,
    options: q.options.map((opt) => ({
      label: opt.label[lang] || opt.label.vi,
      value: opt.value,
      trait: opt.trait[lang] || opt.trait.vi,
      scoreMap: opt.scoreMap,
    })),
  }));
}

export const ASSESSMENT_QUESTIONS = getAssessmentQuestions('vi');
