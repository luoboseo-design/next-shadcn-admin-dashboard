import { NextRequest, NextResponse } from "next/server";

// 网站分析API - 基于网页内容分析业务类型
export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // 1. 抓取网站内容
    const websiteData = await fetchWebsiteContent(url);

    // 2. 基于内容分析业务类型
    const analysis = analyzeBusinessType(url, websiteData);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Website analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze website" },
      { status: 500 }
    );
  }
}

interface WebsiteData {
  title: string;
  description: string;
  keywords: string;
  h1s: string[];
  h2s: string[];
  bodyText: string;
}

// 抓取网站内容
async function fetchWebsiteContent(url: string): Promise<WebsiteData> {
  try {
    const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;
    
    const response = await fetch(normalizedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; SEOBot/1.0)",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const html = await response.text();
    
    // 提取关键内容
    const title = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() || "";
    const description = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)?.[1] || 
                        html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i)?.[1] || "";
    const keywords = html.match(/<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']+)["']/i)?.[1] || "";
    const h1s = Array.from(html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi))
      .map(m => m[1].replace(/<[^>]+>/g, '').trim())
      .filter(Boolean)
      .slice(0, 5);
    const h2s = Array.from(html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi))
      .map(m => m[1].replace(/<[^>]+>/g, '').trim())
      .filter(Boolean)
      .slice(0, 10);
    
    // 提取正文文本
    const bodyText = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, "")
      .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 5000);

    return { title, description, keywords, h1s, h2s, bodyText };
  } catch (error) {
    console.error("Fetch error:", error);
    return { title: "", description: "", keywords: "", h1s: [], h2s: [], bodyText: "" };
  }
}

// 基于内容分析业务类型
function analyzeBusinessType(url: string, data: WebsiteData) {
  const domain = url.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0];
  const brandGuess = domain.split(".")[0];
  const allContent = `${data.title} ${data.description} ${data.keywords} ${data.h1s.join(" ")} ${data.h2s.join(" ")} ${data.bodyText}`.toLowerCase();
  
  // 语言检测
  const hasChinese = /[\u4e00-\u9fa5]/.test(allContent);
  const language = hasChinese ? "中文" : "英文";
  const country = hasChinese ? "中国" : "全球";

  // 行业关键词匹配
  const industryPatterns: Array<{ industry: string; businessModel: string; keywords: string[]; competitors: string[] }> = [
    {
      industry: "AI API 中转服务",
      businessModel: "API 代理/中转",
      keywords: ["api", "中转", "代理", "openai", "gpt", "claude", "gemini", "chatgpt", "ai接口", "人工智能", "大模型", "llm", "token", "调用", "key", "密钥"],
      competitors: ["OpenRouter", "Together AI", "Replicate"],
    },
    {
      industry: "AI 服务平台",
      businessModel: "SaaS 订阅制",
      keywords: ["ai助手", "智能助手", "chatbot", "聊天机器人", "机器学习", "深度学习", "ai写作", "ai绘画"],
      competitors: ["OpenAI", "Anthropic", "Google AI"],
    },
    {
      industry: "电子商务",
      businessModel: "电商平台",
      keywords: ["购物", "商城", "下单", "购买", "加入购物车", "结账", "商品", "店铺", "卖家"],
      competitors: ["淘宝", "京东", "拼多多"],
    },
    {
      industry: "SaaS 软件服务",
      businessModel: "订阅制/按需付费",
      keywords: ["saas", "软件", "管理系统", "crm", "erp", "协作", "团队", "企业版", "专业版"],
      competitors: ["Salesforce", "飞书", "钉钉"],
    },
    {
      industry: "内容/媒体平台",
      businessModel: "内容平台",
      keywords: ["文章", "博客", "新闻", "资讯", "阅读", "订阅", "作者", "编辑"],
      competitors: ["知乎", "微信公众号", "Medium"],
    },
    {
      industry: "教育培训",
      businessModel: "在线教育",
      keywords: ["课程", "学习", "培训", "教程", "学员", "老师", "在线课", "直播课"],
      competitors: ["得到", "网易公开课", "Coursera"],
    },
    {
      industry: "金融科技",
      businessModel: "金融服务",
      keywords: ["支付", "贷款", "理财", "投资", "银行", "保险", "基金", "股票"],
      competitors: ["支付宝", "微信支付", "Stripe"],
    },
    {
      industry: "云服务/开发工具",
      businessModel: "云服务",
      keywords: ["云", "服务器", "部署", "hosting", "cdn", "开发者", "api文档", "sdk"],
      competitors: ["阿里云", "腾讯云", "Vercel"],
    },
    {
      industry: "SEO/营销服务",
      businessModel: "营销服务",
      keywords: ["seo", "优化", "排名", "外链", "流量", "关键词", "营销", "推广"],
      competitors: ["Ahrefs", "SEMrush", "Moz"],
    },
  ];

  // 匹配行业
  let bestMatch = {
    industry: "综合服务",
    businessModel: "企业服务",
    competitors: ["行业领先者A", "行业领先者B", "行业领先者C"],
    score: 0,
  };

  for (const pattern of industryPatterns) {
    const matchCount = pattern.keywords.filter(kw => allContent.includes(kw)).length;
    if (matchCount > bestMatch.score) {
      bestMatch = {
        industry: pattern.industry,
        businessModel: pattern.businessModel,
        competitors: pattern.competitors,
        score: matchCount,
      };
    }
  }

  // 提取品牌名称
  let brandName = brandGuess.charAt(0).toUpperCase() + brandGuess.slice(1);
  // 尝试从title中提取更好的品牌名
  if (data.title) {
    const titleParts = data.title.split(/[-|—_·]/);
    if (titleParts.length > 0) {
      const firstPart = titleParts[0].trim();
      if (firstPart.length > 0 && firstPart.length < 20) {
        brandName = firstPart;
      }
    }
  }

  // 生成核心产品描述
  let coreProducts = data.description?.slice(0, 100) || `${brandName}服务`;
  if (coreProducts.length > 80) {
    coreProducts = coreProducts.slice(0, 80) + "...";
  }

  // 生成目标客户
  const targetCustomers = hasChinese 
    ? (bestMatch.industry.includes("API") || bestMatch.industry.includes("开发") 
        ? "开发者、技术团队、AI应用开发商" 
        : "企业用户、个人用户")
    : "Global developers and businesses";

  // 生成关键词建议
  const suggestedKeywords = [
    brandName,
    `${brandName}怎么样`,
    `${brandName}官网`,
    `${brandName}价格`,
    `${brandName}评测`,
  ];

  return {
    brandName,
    language,
    country,
    industry: bestMatch.industry,
    businessModel: bestMatch.businessModel,
    coreProducts,
    targetCustomers,
    competitors: bestMatch.competitors,
    suggestedKeywords,
  };
}
