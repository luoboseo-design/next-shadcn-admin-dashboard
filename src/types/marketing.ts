// 营销智能体平台 - 核心类型定义

// ==================== 诊断相关 ====================

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
  createdAt: Date;
}

export interface AICitation {
  source: string;
  query: string;
  isReferenced: boolean;
  rank?: number;
}

// ==================== 平台相关 ====================

export type PlatformType = "blog" | "forum" | "news" | "social" | "directory" | "wiki";

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
  | "pending"      // 待处理
  | "analyzing"    // AI 分析中
  | "publishing"   // 发布中
  | "awaiting"     // 待验收
  | "completed"    // 已完成
  | "failed";      // 失败

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
  publishedAt?: Date;
  errorMessage?: string;
}

export interface BacklinkTask {
  id: string;
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
  pricing: TaskPricing;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  acceptedAt?: Date;
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
}

export interface DiagnosisFormData {
  url: string;
}
