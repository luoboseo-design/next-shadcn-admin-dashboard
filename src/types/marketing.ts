// 营销智能体平台 - 核心类型定义

// ==================== 诊断相关 ====================

export type DiagnosisMode = "seo" | "geo";

export type IssueSeverity = "critical" | "warning" | "info";

export interface DiagnosisIssue {
  id: string;
  title: string;
  description: string;
  severity: IssueSeverity;
  category: "seo" | "geo" | "technical" | "content";
}

export interface ServiceRecommendation {
  id: string;
  serviceType: "backlinks" | "geo" | "social-media" | "intelligence";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  estimatedImpact: string;
}

export interface DiagnosisReport {
  id: string;
  url: string;
  mode: DiagnosisMode;
  seoScore: number;
  geoScore: number;
  technicalScore: number;
  contentScore: number;
  overallScore: number;
  businessType: string;
  targetAudience: string[];
  issues: DiagnosisIssue[];
  recommendations: ServiceRecommendation[];
  aiCitations: AICitation[];
  // SEO 专属字段
  seoAudit?: SEOAuditResult;
  // GEO 专属字段
  geoAudit?: GEOAuditResult;
  createdAt: Date;
}

// SEO 审计结果
export interface SEOAuditResult {
  titleTag: AuditItem;
  metaDescription: AuditItem;
  headerStructure: AuditItem;
  contentQuality: AuditItem;
  keywordUsage: AuditItem;
  internalLinks: AuditItem;
  images: AuditItem;
  technicalOnPage: AuditItem;
  coreWebVitals: {
    lcp: number; // Largest Contentful Paint
    inp: number; // Interaction to Next Paint
    cls: number; // Cumulative Layout Shift
  };
}

// GEO 审计结果
export interface GEOAuditResult {
  citationReadiness: AuditItem;
  quotableContent: AuditItem;
  factualDensity: AuditItem;
  sourceAttribution: AuditItem;
  structuredContent: AuditItem;
  entityOptimization: AuditItem;
  aiEngineVisibility: {
    chatgpt: AIEngineStatus;
    perplexity: AIEngineStatus;
    claude: AIEngineStatus;
    gemini: AIEngineStatus;
  };
}

export interface AuditItem {
  score: number; // 0-10
  status: "pass" | "warning" | "fail";
  findings: string[];
  recommendations: string[];
}

export interface AIEngineStatus {
  isIndexed: boolean;
  citationCount: number;
  visibility: "high" | "medium" | "low" | "none";
  sampleQueries: string[];
}

export interface AICitation {
  source: string;
  query: string;
  isReferenced: boolean;
  rank?: number;
}

// ==================== 平台相关 ====================

export type PlatformType = "blog" | "forum" | "news" | "social" | "directory" | "wiki" | "profile" | "custom";

export interface Platform {
  id: string;
  name: string;
  url: string;
  type: PlatformType;
  domainAuthority: number;
  monthlyTraffic: string;
  language: string;
  acceptsDofollow: boolean;
  averagePublishTime: string;
  category: string;
}

// ==================== 任务相关 ====================

export type TaskStatus =
  | "pending" // 待处理
  | "running" // 运行中
  | "completed"; // 已完成

export type PublishResultStatus = "success" | "pending" | "failed";

export interface AccountInfo {
  username: string;
  password: string;
  email?: string;
}

export interface PublishResult {
  id: string;
  platformId: string;
  platformName: string;
  platformUrl: string;
  publishUrl: string;
  status: PublishResultStatus;
  title: string;
  anchorText: string;
  accountInfo?: AccountInfo;
  publishedAt?: Date | null;
  errorMessage?: string;
  dr?: number;
}

export type TaskType = "backlink" | "guest_post";

export interface BacklinkTask {
  id: string;
  name?: string;
  targetUrl: string;
  keywords: string[];
  anchorTexts: string[];
  quantity: number;
  platformTypes: PlatformType[];
  status: TaskStatus;
  progress: number;
  currentStep: string;
  publishResults: PublishResult[];
  totalPlatforms: number;
  completedPlatforms: number;
  successRate: number;
  avgDa?: number;
  taskType?: TaskType;
  // 客座文章特有字段
  articleTitle?: string;
  targetSite?: string;
  wordCount?: number;
  totalViews?: number;
  pricing: TaskPricing;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface TaskPricing {
  packageName: string;
  quantity: number;
  pricePerLink: number;
  totalPrice: number;
  currency: string;
}

// ==================== 服务套餐 ====================

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  quantity: number;
  pricePerLink: number;
  totalPrice: number;
  features: string[];
  recommended?: boolean;
  discount?: number;
}

// ==================== 用户相关 ====================

export interface UserStats {
  totalTasks: number;
  completedTasks: number;
  totalLinks: number;
  successfulLinks: number;
  pendingTasks: number;
  totalSpent: number;
}

// ==================== 表单相关 ====================

export interface CreateTaskFormData {
  targetUrl: string;
  keywords: string;
  anchorTexts: string;
  quantity: number;
  platformTypes: PlatformType[];
  packageId: string;
  customRequirements?: string;
}

export interface DiagnosisFormData {
  url: string;
}
