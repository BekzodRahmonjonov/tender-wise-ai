// Mock data for MosTender platform

export interface Tender {
  id: string;
  source: string;
  title: string;
  buyer: string;
  category: string[];
  budget: number;
  currency: string;
  deadline: string;
  published_at: string;
  requirements: string[];
  documents: {
    name: string;
    url: string;
    size_mb: number;
  }[];
  ai_insights: {
    keywords: string[];
    summary: string;
    confidence: number;
    fit_score: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  plan: 'free' | 'pro' | 'premium';
  categories: string[];
  telegram: {
    connected: boolean;
    username?: string;
  };
  locale: 'uz' | 'ru' | 'en';
}

export const mockTenders: Tender[] = [
  {
    id: "tndr_001",
    source: "TenderZone",
    title: "Technical IT Support Services",
    buyer: "Republic of Uzbekistan Ministry of Digital Technologies",
    category: ["IT Services", "Technical Support"],
    budget: 350000000,
    currency: "UZS",
    deadline: "2025-09-15T18:00:00Z",
    published_at: "2025-09-01T09:00:00Z",
    requirements: [
      "Minimum 3 years of experience in IT support",
      "Knowledge of server administration and monitoring",
      "Familiarity with ISO/IEC 27001 standards",
      "24/7 technical support capability"
    ],
    documents: [
      {
        name: "Technical Specification.pdf",
        url: "/mock/docs/tt_001.pdf",
        size_mb: 2.4
      },
      {
        name: "Terms of Reference.pdf",
        url: "/mock/docs/tor_001.pdf",
        size_mb: 1.8
      }
    ],
    ai_insights: {
      keywords: ["DevOps", "SLA", "Monitoring", "Infrastructure"],
      summary: "Large-scale IT support project requiring 24/7 monitoring, SLA compliance, and infrastructure management expertise.",
      confidence: 0.92,
      fit_score: 84
    }
  },
  {
    id: "tndr_002",
    source: "GovTender",
    title: "Educational Platform Development",
    buyer: "Ministry of Public Education",
    category: ["Software Development", "Education"],
    budget: 280000000,
    currency: "UZS",
    deadline: "2025-09-20T15:00:00Z",
    published_at: "2025-08-28T10:30:00Z",
    requirements: [
      "Experience with educational technology platforms",
      "Modern web development frameworks",
      "Multi-language support implementation",
      "Mobile-responsive design"
    ],
    documents: [
      {
        name: "Project Requirements.pdf",
        url: "/mock/docs/edu_002.pdf",
        size_mb: 3.1
      }
    ],
    ai_insights: {
      keywords: ["React", "Mobile", "Education", "Multi-language"],
      summary: "Modern educational platform requiring responsive design, multi-language support, and advanced user experience.",
      confidence: 0.88,
      fit_score: 76
    }
  },
  {
    id: "tndr_003",
    source: "TenderZone",
    title: "Healthcare Management System",
    buyer: "Republican Specialized Scientific and Practical Medical Center",
    category: ["Healthcare", "Software Development"],
    budget: 450000000,
    currency: "UZS",
    deadline: "2025-10-01T17:00:00Z",
    published_at: "2025-08-30T14:20:00Z",
    requirements: [
      "HIPAA compliance knowledge",
      "Database management expertise",
      "Integration with medical equipment",
      "Data security and encryption"
    ],
    documents: [
      {
        name: "Medical System Specs.pdf",
        url: "/mock/docs/med_003.pdf",
        size_mb: 4.2
      },
      {
        name: "Security Requirements.pdf",
        url: "/mock/docs/sec_003.pdf",
        size_mb: 1.9
      }
    ],
    ai_insights: {
      keywords: ["HIPAA", "Database", "Security", "Medical"],
      summary: "Complex healthcare system requiring strict compliance, data security, and integration capabilities.",
      confidence: 0.95,
      fit_score: 92
    }
  }
];

export const mockUser: User = {
  id: "usr_123",
  name: "Bekzod Akbarov",
  email: "bekzod@example.com",
  role: "user",
  plan: "free",
  categories: ["IT Services", "Software Development"],
  telegram: {
    connected: false
  },
  locale: "uz"
};

export const categories = [
  "IT Services",
  "Software Development", 
  "Healthcare",
  "Education",
  "Construction",
  "Marketing",
  "Consulting",
  "Technical Support",
  "Web Development",
  "Mobile Development"
];

export const sources = [
  "TenderZone",
  "GovTender", 
  "UzTender",
  "E-Tender"
];