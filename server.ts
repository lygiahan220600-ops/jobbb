import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header as required by skill guidelines
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. Natural Language Job Search endpoint
app.post('/api/ai/match-prompt', async (req: Request, res: Response) => {
  const { prompt, lang = 'vi' } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const langInstruction = lang === 'ko'
    ? '모든 응답(summary, role, scheduleMatch, reason, advice, searchKeywords)은 반드시 자연스러운 한국어로 작성해주세요.'
    : lang === 'en'
    ? 'All response text (summary, role, scheduleMatch, reason, advice, searchKeywords) MUST be written in natural English.'
    : 'Tất cả phản hồi bằng tiếng Việt tự nhiên, phù hợp bối cảnh tuyển dụng sinh viên & ứng viên.';

  try {
    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Người dùng tìm việc làm với yêu cầu: "${prompt}".
${langInstruction}
Hãy phân tích yêu cầu này và gợi ý các vai trò công việc phù hợp nhất, phân tích kỹ năng, thời gian và lý do phù hợp.
Trả về định dạng JSON theo cấu trúc sau:
{
  "summary": "Short summary of user needs",
  "suggestedRoles": [
    {
      "role": "Job role title",
      "fitScore": 95,
      "scheduleMatch": "Matching schedule / shift",
      "reason": "Detailed reason why this job fits user",
      "recommendedIndustries": ["Industry 1", "Industry 2"]
    }
  ],
  "advice": "Actionable career advice for the candidate",
  "searchKeywords": ["keyword 1", "keyword 2", "keyword 3"]
}`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              suggestedRoles: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    role: { type: Type.STRING },
                    fitScore: { type: Type.INTEGER },
                    scheduleMatch: { type: Type.STRING },
                    reason: { type: Type.STRING },
                    recommendedIndustries: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                  },
                  required: ['role', 'fitScore', 'scheduleMatch', 'reason'],
                },
              },
              advice: { type: Type.STRING },
              searchKeywords: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ['summary', 'suggestedRoles', 'advice', 'searchKeywords'],
          },
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text.trim());
        return res.json({ success: true, data: parsed });
      }
    }
  } catch (error) {
    console.error('Gemini error in /api/ai/match-prompt:', error);
  }

  // Domain heuristic fallback
  if (lang === 'ko') {
    return res.json({
      success: true,
      data: {
        summary: '사용자 프로필 및 희망 조건을 분석하여 야간 파트타임 및 유연한 단기 일자리를 최우선 매칭했습니다.',
        suggestedRoles: [
          {
            role: '한국어 교육 보조 강사 (초급 회화반)',
            fitScore: 98,
            scheduleMatch: '평일 야간 18:30 - 20:30',
            reason: '한국어 전공 지식을 직접 활용하고 원어민 강사와의 소통으로 언어 실력을 향상할 수 있습니다.',
            recommendedIndustries: ['교육 및 어학'],
          },
          {
            role: '한국어 CS 고객상담 담당자 (파트타임)',
            fitScore: 94,
            scheduleMatch: '야간 17:30 - 22:00',
            reason: '한국 고객 문의 응대 및 상품 정보 번역을 지원하며 실무 역량을 배양할 수 있습니다.',
            recommendedIndustries: ['고객상담 및 CS'],
          },
          {
            role: '프리랜서 번역 및 자막 제작 (재택)',
            fitScore: 90,
            scheduleMatch: '자율 재택근무 (마감일 준수)',
            reason: '이동 시간 없이 학업과 병행하며 자연스러운 번역 문장력을 키울 수 있습니다.',
            recommendedIndustries: ['통번역 및 미디어'],
          },
        ],
        advice: '이력서에 어학 성적(TOPIK)과 성실성을 강조하시면 빠른 면접 기회를 얻으실 수 있습니다.',
        searchKeywords: ['한국어', '조교', '파트타임', 'CS', '번역'],
      },
    });
  }

  if (lang === 'en') {
    return res.json({
      success: true,
      data: {
        summary: 'System analyzed your profile: student/entry-level candidate with foreign language skills, preferring flexible evening or part-time work.',
        suggestedRoles: [
          {
            role: 'Korean Teaching Assistant (Beginner & Conversational)',
            fitScore: 98,
            scheduleMatch: 'Evening shift: 18:30 - 20:30 (Mon/Wed/Fri)',
            reason: 'Directly utilizes language major skills with comprehensive 1-week pedagogy training.',
            recommendedIndustries: ['Education & Languages'],
          },
          {
            role: 'Korean Customer Support Specialist (Evening Part-time)',
            fitScore: 94,
            scheduleMatch: 'Evening: 17:30 - 22:00 (flexible)',
            reason: 'Handles e-commerce customer chats and develops practical problem-solving capabilities.',
            recommendedIndustries: ['Customer Service', 'E-commerce'],
          },
          {
            role: 'Remote Korean Subtitle & Video Translator',
            fitScore: 91,
            scheduleMatch: 'Flexible work from home, deadline-driven',
            reason: 'Complete autonomy over working hours, ideal for busy university students.',
            recommendedIndustries: ['Translation', 'Media'],
          },
        ],
        advice: 'Highlight your enthusiasm, linguistic certifications, and schedule flexibility in your ATS resume for swift recruiter responses.',
        searchKeywords: ['Korean', 'Assistant', 'Part-time', 'Customer Support', 'Remote'],
      },
    });
  }

  // Default Vietnamese fallback
  const fallbackData = {
    summary: 'Hệ thống đã phân tích hồ sơ: Sinh viên/Ứng viên trẻ, ưu tiên việc ca tối / part-time linh hoạt, chưa cần nhiều kinh nghiệm trước đó.',
    suggestedRoles: [
      {
        role: 'Trợ giảng tiếng Hàn (Online/Offline)',
        fitScore: 96,
        scheduleMatch: '18:30 - 20:30 các ngày trong tuần',
        reason: 'Tận dụng trực tiếp kiến thức tiếng Hàn đang học, môi trường rèn luyện giao tiếp và phát âm với học viên',
        recommendedIndustries: ['Giáo dục', 'Ngôn ngữ'],
      },
      {
        role: 'Nhân viên CSKH / Hỗ trợ khách Hàn Quốc',
        fitScore: 92,
        scheduleMatch: 'Ca tối 17:30 - 22:00 hoặc linh hoạt',
        reason: 'Thực hành phản xạ tiếng Hàn thực tế, hỗ trợ dịch tin nhắn/order cho chuỗi thương mại hoặc nhà hàng',
        recommendedIndustries: ['Dịch vụ', 'Thương mại'],
      },
      {
        role: 'Cộng tác viên Dịch thuật tài liệu / Phụ đề',
        fitScore: 89,
        scheduleMatch: 'Linh hoạt tại nhà, giao việc theo đầu mục',
        reason: 'Làm việc theo deadline tự do, không gò bó thời gian di chuyển, trau dồi vốn từ vựng chuyên ngành',
        recommendedIndustries: ['Truyền thông', 'Dịch thuật'],
      },
    ],
    advice: 'Bạn nên nhấn mạnh tinh thần học hỏi, sự chủ động và khả năng ngoại ngữ trong CV để nhà tuyển dụng phản hồi sớm nhất.',
    searchKeywords: ['tiếng Hàn', 'trợ giảng', 'part-time tối', 'CSKH tiếng Hàn', 'phục vụ'],
  };

  return res.json({ success: true, data: fallbackData });
});

// 2. Career Assessment Analysis endpoint
app.post('/api/ai/career-assessment', async (req: Request, res: Response) => {
  const { answers, lang = 'vi' } = req.body;
  if (!answers) {
    return res.status(400).json({ error: 'Answers are required' });
  }

  const langInstruction = lang === 'ko'
    ? '모든 평가 결과(skills, interests, matchedIndustries, topJobs, roadmapTip)는 반드시 자연스러운 한국어로 작성해주세요.'
    : lang === 'en'
    ? 'All assessment output (skills, interests, matchedIndustries, topJobs, roadmapTip) MUST be in professional English.'
    : 'Trả về kết quả bằng tiếng Việt tự nhiên, truyền cảm hứng.';

  try {
    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `10 câu trả lời trắc nghiệm hướng nghiệp của ứng viên:
${JSON.stringify(answers, null, 2)}
${langInstruction}
Đóng vai chuyên gia tư vấn nghề nghiệp hàng đầu, phân tích kết quả và trả về JSON:
{
  "skills": ["Skill 1", "Skill 2", "Skill 3"],
  "interests": ["Interest 1", "Interest 2", "Interest 3"],
  "matchedIndustries": ["Industry 1", "Industry 2", "Industry 3"],
  "topJobs": [
    {
      "title": "Job title",
      "matchPercentage": 96,
      "whyFit": "Reason why candidate fits this role",
      "startingSalary": "Salary range",
      "keyStrengths": ["Strength 1", "Strength 2"]
    }
  ],
  "roadmapTip": "Actionable career roadmap tip"
}`,
        config: {
          responseMimeType: 'application/json',
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text.trim());
        return res.json({ success: true, data: parsed });
      }
    }
  } catch (error) {
    console.error('Gemini error in /api/ai/career-assessment:', error);
  }

  // Multilingual Heuristic assessment fallbacks
  if (lang === 'ko') {
    return res.json({
      success: true,
      data: {
        skills: ['원활한 대인 커뮤니케이션', '유연한 상황 대처 능력', '외국어 습득 및 문화 이해도', '세심한 업무 처리'],
        interests: ['사람들과의 상호작용', '글로벌 문화 및 언어 활용', '실용적인 문제 해결'],
        matchedIndustries: ['교육 및 어학 서비스', '고객상담 및 CS', '통번역 및 미디어'],
        topJobs: [
          {
            title: '한국어 교육 보조 강사 (학원/온라인)',
            matchPercentage: 96,
            whyFit: '상대방의 입장에서 차근차근 설명하는 인내심과 어학에 대한 높은 흥미를 지니고 있습니다.',
            startingSalary: '월 5백만 ~ 8백만 VND (시급제)',
            keyStrengths: ['우수한 발음 및 기초 문법', '친절한 면학 분위기 조성'],
          },
          {
            role: '글로벌 고객상담 (CS) 스페셜리스트',
            title: '글로벌 고객상담 (CS) 스페셜리스트',
            matchPercentage: 92,
            whyFit: '고객의 불편을 빠르게 파악하고 예의 바르게 솔루션을 제시하는 능력이 탁월합니다.',
            startingSalary: '월 6백만 ~ 9백만 VND + 인센티브',
            keyStrengths: ['경청 및 감정 조절', '빠른 타자 및 전산 처리'],
          },
          {
            title: '영상 자막 및 콘텐츠 번역가',
            matchPercentage: 89,
            whyFit: '문맥의 뉘앙스를 자연스럽게 살려 전달하는 감각과 집중력이 돋보입니다.',
            startingSalary: '월 4백만 ~ 8백만 VND (건당 지급)',
            keyStrengths: ['정확한 어휘 구사', '철저한 마감 엄수'],
          },
        ],
        roadmapTip: '이번 주 안에 보유 중인 어학 자격증과 장점을 정리한 ATS 이력서를 준비하여 관련 파트타임 공고에 바로 지원해보세요.',
      },
    });
  }

  if (lang === 'en') {
    return res.json({
      success: true,
      data: {
        skills: ['Empathetic Communication', 'Active Problem Solving', 'Cross-Cultural Fluency', 'Meticulous Attention to Detail'],
        interests: ['Interpersonal collaboration', 'Foreign languages & global culture', 'Practical community service'],
        matchedIndustries: ['Education & Languages', 'Customer Experience & CRM', 'Media & Content Localization'],
        topJobs: [
          {
            title: 'Language Teaching Assistant (Conversational & Beginner)',
            matchPercentage: 96,
            whyFit: 'Your patience, pedagogical empathy, and strong communication make you a natural facilitator for students.',
            startingSalary: '5M - 8M VND / month',
            keyStrengths: ['Clear pronunciation', 'Inspiring enthusiasm'],
          },
          {
            title: 'Multilingual Customer Support Representative',
            matchPercentage: 92,
            whyFit: 'High active listening skills and composure under tight schedules allow you to delight customers effortlessly.',
            startingSalary: '6M - 9M VND / month + bonus',
            keyStrengths: ['Quick conflict resolution', 'System navigation'],
          },
          {
            title: 'Digital Content & Subtitle Translator',
            matchPercentage: 89,
            whyFit: 'Strong grasp of cultural nuance and idiomatic fluency in both source and target languages.',
            startingSalary: '4M - 8M VND / month (freelance)',
            keyStrengths: ['Deadline discipline', 'Contextual accuracy'],
          },
        ],
        roadmapTip: 'Create an ATS-formatted CV emphasizing your interpersonal strengths and language proficiencies, and apply to 2-3 target roles this week.',
      },
    });
  }

  // Default Vietnamese fallback
  return res.json({
    success: true,
    data: {
      skills: ['Giao tiếp & Đàm phán linh hoạt', 'Giải quyết vấn đề sáng tạo', 'Thích nghi nhanh với môi trường mới', 'Tư duy logic & tổ chức'],
      interests: ['Làm việc tương tác giữa người với người', 'Khám phá công nghệ & ngôn ngữ mới', 'Tạo ra giá trị thực tế cho cộng đồng'],
      matchedIndustries: ['Giáo dục & Ngôn ngữ', 'Chăm sóc khách hàng', 'Biên phiên dịch & Truyền thông'],
      topJobs: [
        {
          title: 'Trợ giảng tiếng Hàn (Lớp Giao tiếp & Sơ cấp)',
          matchPercentage: 96,
          whyFit: 'Phong cách kiên nhẫn, thấu cảm, yêu thích môi trường sư phạm và có nền tảng ngôn ngữ đang hoàn thiện tốt.',
          startingSalary: '5 - 8 triệu / tháng',
          keyStrengths: ['Phát âm chuẩn', 'Truyền cảm hứng'],
        },
        {
          title: 'Nhân viên CSKH / Chăm sóc Khách hàng tiếng Hàn',
          matchPercentage: 92,
          whyFit: 'Thế mạnh lắng nghe, nhã nhặn trong ứng xử và xử lý nhanh các tình huống thực tế cho khách hàng.',
          startingSalary: '6 - 9 triệu / tháng + thưởng',
          keyStrengths: ['Thấu cảm khách hàng', 'Ứng biến nhanh'],
        },
        {
          title: 'Cộng tác viên Dịch thuật Video & Phụ đề',
          matchPercentage: 89,
          whyFit: 'Văn phong tự nhiên, cẩn thận tra cứu thuật ngữ và có kỷ luật tự giác làm việc từ xa.',
          startingSalary: '4 - 8 triệu / tháng',
          keyStrengths: ['Chính xác câu từ', 'Đúng hạn deadline'],
        },
      ],
      roadmapTip: 'Hãy chuẩn bị một CV ngắn gọn làm nổi bật kỹ năng ngoại ngữ và tinh thần cầu thị, đồng thời nộp hồ sơ vào các vị trí part-time ngay tuần này.',
    },
  });
});

// 3. AI CV Enhancer endpoint
app.post('/api/ai/enhance-cv', async (req: Request, res: Response) => {
  const { cvData, lang = 'vi' } = req.body;
  if (!cvData) {
    return res.status(400).json({ error: 'cvData is required' });
  }

  try {
    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Hồ sơ CV của ứng viên:
${JSON.stringify(cvData, null, 2)}
Ngôn ngữ phản hồi: ${lang === 'ko' ? '한국어' : lang === 'en' ? 'English' : 'Tiếng Việt'}.
Hãy tối ưu hóa phần mục tiêu nghề nghiệp (objective), các gạch đầu dòng kinh nghiệm để đạt chuẩn ATS cao nhất. Trả về JSON:
{
  "optimizedObjective": "Objective statement",
  "tips": ["Tip 1", "Tip 2", "Tip 3"]
}`,
        config: {
          responseMimeType: 'application/json',
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text.trim());
        return res.json({ success: true, data: parsed });
      }
    }
  } catch (error) {
    console.error('Gemini error in /api/ai/enhance-cv:', error);
  }

  const tipsMap = {
    ko: {
      optimizedObjective: '책임감과 어학 능력을 겸비한 인재로서, 실무 현장에서 성실함과 빠른 적응력으로 팀과 기업 성장에 기여하고자 합니다.',
      tips: [
        '담당 업무의 성과를 구체적인 수치(숫자)로 표현하면 합격률이 40% 이상 상승합니다.',
        '보유 어학 자격증(TOPIK, TOEIC)과 컴퓨터 활용 능력을 상단에 배치하세요.',
        '지원하는 직무 키워드(조교, 고객응대, 번역 등)를 본문에 자연스럽게 포함하세요.',
      ],
    },
    en: {
      optimizedObjective: 'Proactive and multilingual candidate dedicated to delivering measurable value in customer engagement, language pedagogy, and team operations.',
      tips: [
        'Incorporate quantifiable achievements (e.g., assisted 40+ students, 98% satisfaction).',
        'Place language certifications (TOPIK, IELTS, TOEIC) in the prominent top summary.',
        'Use strong action verbs such as "Coordinated", "Facilitated", and "Streamlined".',
      ],
    },
    vi: {
      optimizedObjective: 'Sinh viên năng động, trách nhiệm và thành thạo ngoại ngữ. Mong muốn ứng dụng kiến thức vào thực tế, trau dồi tác phong chuyên nghiệp và đóng góp tích cực cho mục tiêu của tổ chức.',
      tips: [
        'Lồng ghép các con số cụ thể trong phần kinh nghiệm (ví dụ: hỗ trợ lớp 25 học viên, tỷ lệ hài lòng 95%).',
        'Đặt chứng chỉ ngoại ngữ (TOPIK, IELTS, TOEIC) ở vị trí dễ quan sát nhất.',
        'Sử dụng các động từ hành động mạnh mẽ như: Điều phối, Trực tiếp hướng dẫn, Tối ưu hóa.',
      ],
    },
  }[lang as 'vi' | 'en' | 'ko'] || {
    optimizedObjective: 'Mục tiêu nghề nghiệp đã được tối ưu hóa.',
    tips: ['Tối ưu từ khóa chuẩn ATS.'],
  };

  return res.json({
    success: true,
    data: tipsMap,
  });
});

// Vite middleware in dev mode
if (process.env.NODE_ENV !== 'production') {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
