"use client";

import { useState } from "react";

import {
  Activity,
  AlertTriangle,
  Bot,
  Brain,
  CheckCircle2,
  Clock,
  Code,
  Copy,
  Edit,
  ExternalLink,
  FileText,
  Globe,
  Image,
  MessageSquare,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Search,
  Settings,
  Sparkles,
  Trash2,
  TrendingUp,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

// AI 智能体数据
const aiAgents = [
  {
    id: "agent-content-writer",
    name: "内容撰写智能体",
    description: "根据关键词和要求自动生成高质量原创内容",
    type: "content",
    icon: FileText,
    status: "active",
    model: "GPT-4o",
    tasks: ["博客文章撰写", "客座文章撰写", "新闻稿撰写", "社交媒体文案"],
    stats: {
      todayCalls: 1256,
      avgLatency: "2.3s",
      successRate: 99.2,
      tokensUsed: 2450000,
      costToday: 48.5,
    },
    config: {
      temperature: 0.7,
      maxTokens: 4000,
      systemPrompt: "你是一个专业的SEO内容撰写专家...",
    },
  },
  {
    id: "agent-account-creator",
    name: "账号注册智能体",
    description: "自动完成各平台的账号注册流程",
    type: "automation",
    icon: Bot,
    status: "active",
    model: "Claude 3.5",
    tasks: ["博客账号注册", "论坛账号注册", "社交媒体注册", "验证码识别"],
    stats: {
      todayCalls: 328,
      avgLatency: "15.2s",
      successRate: 94.5,
      tokensUsed: 180000,
      costToday: 12.3,
    },
    config: {
      temperature: 0.3,
      maxTokens: 2000,
      systemPrompt: "你是一个自动化注册助手...",
    },
  },
  {
    id: "agent-publisher",
    name: "内容发布智能体",
    description: "自动登录平台并发布内容",
    type: "automation",
    icon: Globe,
    status: "active",
    model: "GPT-4o-mini",
    tasks: ["博客发布", "论坛发帖", "目录提交", "社交媒体发布"],
    stats: {
      todayCalls: 892,
      avgLatency: "8.5s",
      successRate: 96.8,
      tokensUsed: 420000,
      costToday: 8.4,
    },
    config: {
      temperature: 0.2,
      maxTokens: 1500,
      systemPrompt: "你是一个内容发布助手...",
    },
  },
  {
    id: "agent-link-verifier",
    name: "链接验证智能体",
    description: "验证发布链接有效性，检查外链是否成功",
    type: "verification",
    icon: CheckCircle2,
    status: "active",
    model: "GPT-4o-mini",
    tasks: ["链接有效性检查", "Dofollow验证", "锚文本验证", "页面索引检查"],
    stats: {
      todayCalls: 2105,
      avgLatency: "1.2s",
      successRate: 99.8,
      tokensUsed: 85000,
      costToday: 1.7,
    },
    config: {
      temperature: 0.1,
      maxTokens: 500,
      systemPrompt: "你是一个链接验证专家...",
    },
  },
  {
    id: "agent-keyword-analyzer",
    name: "关键词分析智能体",
    description: "分析关键词竞争度和优化建议",
    type: "analysis",
    icon: Brain,
    status: "active",
    model: "GPT-4o",
    tasks: ["关键词分析", "竞争对手分析", "内容策略建议", "SEO优化建议"],
    stats: {
      todayCalls: 156,
      avgLatency: "4.5s",
      successRate: 98.5,
      tokensUsed: 320000,
      costToday: 6.4,
    },
    config: {
      temperature: 0.5,
      maxTokens: 3000,
      systemPrompt: "你是一个SEO关键词分析专家...",
    },
  },
  {
    id: "agent-social-engagement",
    name: "社交互动智能体",
    description: "自动回复评论、维护帖子互动",
    type: "engagement",
    icon: MessageSquare,
    status: "paused",
    model: "Claude 3.5",
    tasks: ["评论回复", "私信回复", "帖子互动", "社区维护"],
    stats: {
      todayCalls: 0,
      avgLatency: "3.2s",
      successRate: 92.3,
      tokensUsed: 0,
      costToday: 0,
    },
    config: {
      temperature: 0.8,
      maxTokens: 800,
      systemPrompt: "你是一个友好的社交媒体互动助手...",
    },
  },
  {
    id: "agent-image-generator",
    name: "图片生成智能体",
    description: "为内容生成配图和封面图",
    type: "creative",
    icon: Image,
    status: "active",
    model: "DALL-E 3",
    tasks: ["博客配图", "社交媒体图片", "封面设计", "信息图表"],
    stats: {
      todayCalls: 89,
      avgLatency: "12.5s",
      successRate: 97.2,
      tokensUsed: 0,
      costToday: 17.8,
    },
    config: {
      quality: "hd",
      size: "1024x1024",
      style: "natural",
    },
  },
  {
    id: "agent-code-executor",
    name: "代码执行智能体",
    description: "执行自动化脚本和浏览器操作",
    type: "automation",
    icon: Code,
    status: "active",
    model: "Custom",
    tasks: ["浏览器自动化", "表单填写", "数据抓取", "API调用"],
    stats: {
      todayCalls: 1580,
      avgLatency: "5.8s",
      successRate: 95.5,
      tokensUsed: 0,
      costToday: 0,
    },
    config: {
      timeout: 30000,
      headless: true,
      proxy: true,
    },
  },
];

// 模型列表
const availableModels = [
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", costPer1k: 0.03 },
  { id: "gpt-4o-mini", name: "GPT-4o-mini", provider: "OpenAI", costPer1k: 0.002 },
  { id: "gpt-4-turbo", name: "GPT-4 Turbo", provider: "OpenAI", costPer1k: 0.01 },
  { id: "claude-3.5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic", costPer1k: 0.015 },
  { id: "claude-3-opus", name: "Claude 3 Opus", provider: "Anthropic", costPer1k: 0.075 },
  { id: "gemini-pro", name: "Gemini Pro", provider: "Google", costPer1k: 0.00125 },
  { id: "deepseek-v3", name: "DeepSeek V3", provider: "DeepSeek", costPer1k: 0.001 },
];

export default function AIAgentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<(typeof aiAgents)[0] | null>(null);

  const filteredAgents = aiAgents.filter((agent) => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || agent.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const agentTypes = [...new Set(aiAgents.map((a) => a.type))];
  const typeLabels: Record<string, string> = {
    content: "内容生成",
    automation: "自动化",
    verification: "验证检查",
    analysis: "数据分析",
    engagement: "互动维护",
    creative: "创意设计",
  };

  // 统计数据
  const totalCalls = aiAgents.reduce((acc, a) => acc + a.stats.todayCalls, 0);
  const totalCost = aiAgents.reduce((acc, a) => acc + a.stats.costToday, 0);
  const avgSuccessRate =
    aiAgents.filter((a) => a.stats.todayCalls > 0).reduce((acc, a) => acc + a.stats.successRate, 0) /
    aiAgents.filter((a) => a.stats.todayCalls > 0).length;
  const activeAgents = aiAgents.filter((a) => a.status === "active").length;

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">AI 智能体</h1>
          <p className="text-muted-foreground mt-1">配置和管理 AI 智能体，驱动自动化工作流</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          新建智能体
        </Button>
      </div>

      {/* 概览统计 */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">活跃智能体</p>
                <p className="text-2xl font-bold">
                  {activeAgents}/{aiAgents.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">今日调用</p>
                <p className="text-2xl font-bold">{totalCalls.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">平均成功率</p>
                <p className="text-2xl font-bold">{avgSuccessRate.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">今日成本</p>
                <p className="text-2xl font-bold">${totalCost.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 筛选 */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索智能体..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部类型</SelectItem>
            {agentTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {typeLabels[type] || type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 智能体列表 */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredAgents.map((agent) => {
          const IconComponent = agent.icon;
          return (
            <Card key={agent.id} className={agent.status === "paused" ? "opacity-60" : ""}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div
                      className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                        agent.status === "active" ? "bg-primary/10" : "bg-muted"
                      }`}
                    >
                      <IconComponent
                        className={`h-6 w-6 ${agent.status === "active" ? "text-primary" : "text-muted-foreground"}`}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{agent.name}</h3>
                        <Badge variant={agent.status === "active" ? "default" : "secondary"} className="text-xs">
                          {agent.status === "active" ? "运行中" : "已暂停"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{agent.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {agent.model}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {typeLabels[agent.type]}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedAgent(agent)}>
                        <Settings className="h-4 w-4 mr-2" />
                        配置参数
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Activity className="h-4 w-4 mr-2" />
                        查看日志
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        复制智能体
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {agent.status === "active" ? (
                        <DropdownMenuItem className="text-amber-600">
                          <Pause className="h-4 w-4 mr-2" />
                          暂停
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="text-green-600">
                          <Play className="h-4 w-4 mr-2" />
                          启动
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        删除
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* 任务标签 */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {agent.tasks.map((task, index) => (
                    <span key={index} className="px-2 py-0.5 bg-muted rounded text-xs">
                      {task}
                    </span>
                  ))}
                </div>

                {/* 统计数据 */}
                <div className="mt-4 pt-4 border-t grid grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-lg font-semibold">{agent.stats.todayCalls.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">今日调用</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{agent.stats.avgLatency}</p>
                    <p className="text-xs text-muted-foreground">平均延迟</p>
                  </div>
                  <div>
                    <p
                      className={`text-lg font-semibold ${
                        agent.stats.successRate >= 95
                          ? "text-green-600"
                          : agent.stats.successRate >= 90
                            ? "text-amber-600"
                            : "text-red-600"
                      }`}
                    >
                      {agent.stats.successRate}%
                    </p>
                    <p className="text-xs text-muted-foreground">成功率</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">${agent.stats.costToday.toFixed(1)}</p>
                    <p className="text-xs text-muted-foreground">今日成本</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 模型配置参考 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">可用模型</CardTitle>
          <CardDescription>支持的 AI 模型及成本参考</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>模型名称</TableHead>
                <TableHead>提供商</TableHead>
                <TableHead>成本 ($/1K tokens)</TableHead>
                <TableHead>推荐用途</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {availableModels.map((model) => (
                <TableRow key={model.id}>
                  <TableCell className="font-medium">{model.name}</TableCell>
                  <TableCell>{model.provider}</TableCell>
                  <TableCell>${model.costPer1k}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {model.id.includes("mini") || model.id.includes("gemini") || model.id.includes("deepseek")
                      ? "高频任务、简单生成"
                      : model.id.includes("opus")
                        ? "复杂推理、高质量内容"
                        : "通用任务、内容生成"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 配置弹窗 */}
      <Dialog open={!!selectedAgent} onOpenChange={() => setSelectedAgent(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>配置智能体: {selectedAgent?.name}</DialogTitle>
            <DialogDescription>{selectedAgent?.description}</DialogDescription>
          </DialogHeader>
          {selectedAgent && (
            <Tabs defaultValue="basic" className="mt-4">
              <TabsList>
                <TabsTrigger value="basic">基础配置</TabsTrigger>
                <TabsTrigger value="prompt">系统提示词</TabsTrigger>
                <TabsTrigger value="advanced">高级设置</TabsTrigger>
              </TabsList>
              <TabsContent value="basic" className="space-y-4 mt-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>智能体名称</Label>
                    <Input defaultValue={selectedAgent.name} />
                  </div>
                  <div className="grid gap-2">
                    <Label>描述</Label>
                    <Input defaultValue={selectedAgent.description} />
                  </div>
                  <div className="grid gap-2">
                    <Label>AI 模型</Label>
                    <Select defaultValue={selectedAgent.model.toLowerCase().replace(" ", "-")}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {availableModels.map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name} ({model.provider})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {"temperature" in selectedAgent.config && (
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label>Temperature</Label>
                        <span className="text-sm text-muted-foreground">{selectedAgent.config.temperature}</span>
                      </div>
                      <Slider defaultValue={[selectedAgent.config.temperature]} max={1} step={0.1} className="w-full" />
                      <p className="text-xs text-muted-foreground">较低值产出更确定性结果，较高值产出更多样化结果</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="prompt" className="space-y-4 mt-4">
                <div className="grid gap-2">
                  <Label>系统提示词</Label>
                  <Textarea
                    rows={12}
                    defaultValue={selectedAgent.config.systemPrompt || ""}
                    placeholder="输入系统提示词..."
                  />
                  <p className="text-xs text-muted-foreground">系统提示词定义了智能体的角色和行为规范</p>
                </div>
              </TabsContent>
              <TabsContent value="advanced" className="space-y-4 mt-4">
                <div className="grid gap-4">
                  {"maxTokens" in selectedAgent.config && (
                    <div className="grid gap-2">
                      <Label>最大 Tokens</Label>
                      <Input type="number" defaultValue={selectedAgent.config.maxTokens} />
                    </div>
                  )}
                  <div className="grid gap-2">
                    <Label>超时时间 (秒)</Label>
                    <Input type="number" defaultValue={30} />
                  </div>
                  <div className="grid gap-2">
                    <Label>重试次数</Label>
                    <Input type="number" defaultValue={3} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>启用日志记录</Label>
                      <p className="text-xs text-muted-foreground">记录所有调用的输入输出</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>启用成本限制</Label>
                      <p className="text-xs text-muted-foreground">超过每日预算时自动暂停</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedAgent(null)}>
              取消
            </Button>
            <Button onClick={() => setSelectedAgent(null)}>保存配置</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 新建智能体弹窗 */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>新建 AI 智能体</DialogTitle>
            <DialogDescription>创建一个新的 AI 智能体来执行自动化任务</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>智能体名称</Label>
              <Input placeholder="例如：客户支持智能体" />
            </div>
            <div className="grid gap-2">
              <Label>描述</Label>
              <Input placeholder="描述这个智能体的用途" />
            </div>
            <div className="grid gap-2">
              <Label>类型</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择类型" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(typeLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>AI 模型</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择模型" />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name} - ${model.costPer1k}/1K tokens
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>系统提示词</Label>
              <Textarea rows={4} placeholder="定义智能体的角色和行为规范..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              取消
            </Button>
            <Button onClick={() => setShowAddDialog(false)}>创建智能体</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
