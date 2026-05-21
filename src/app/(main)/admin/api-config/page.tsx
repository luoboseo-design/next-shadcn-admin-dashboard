"use client";

import { useState } from "react";

import {
  Bot,
  CheckCircle2,
  Cloud,
  Code,
  Copy,
  Database,
  Eye,
  EyeOff,
  Globe,
  Image,
  Key,
  MessageSquare,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Shield,
  Trash2,
  XCircle,
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// AI 模型 API 配置
const aiApis = [
  {
    id: "openai",
    name: "OpenAI",
    icon: Bot,
    models: ["GPT-4o", "GPT-4o-mini", "GPT-4-Turbo", "o1-preview"],
    status: "active",
    apiKey: "sk-proj-...xxxx",
    monthlyUsage: 2450.8,
    monthlyLimit: 5000,
    lastUsed: "2分钟前",
  },
  {
    id: "anthropic",
    name: "Anthropic",
    icon: Bot,
    models: ["Claude 3.5 Sonnet", "Claude 3 Opus", "Claude 3 Haiku"],
    status: "active",
    apiKey: "sk-ant-...xxxx",
    monthlyUsage: 1280.5,
    monthlyLimit: 3000,
    lastUsed: "5分钟前",
  },
  {
    id: "google",
    name: "Google AI",
    icon: Bot,
    models: ["Gemini 2.0 Pro", "Gemini 1.5 Flash"],
    status: "active",
    apiKey: "AIza...xxxx",
    monthlyUsage: 450.2,
    monthlyLimit: 2000,
    lastUsed: "1小时前",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    icon: Bot,
    models: ["DeepSeek V3", "DeepSeek Coder"],
    status: "active",
    apiKey: "sk-...xxxx",
    monthlyUsage: 180.0,
    monthlyLimit: 1000,
    lastUsed: "30分钟前",
  },
  {
    id: "qwen",
    name: "通义千问",
    icon: Bot,
    models: ["Qwen-Max", "Qwen-Plus", "Qwen-Turbo"],
    status: "inactive",
    apiKey: "",
    monthlyUsage: 0,
    monthlyLimit: 1000,
    lastUsed: "-",
  },
];

// 第三方服务 API
const serviceApis = [
  {
    id: "browserless",
    name: "Browserless",
    description: "无头浏览器自动化服务",
    icon: Globe,
    status: "active",
    apiKey: "br_...xxxx",
    monthlyUsage: 85000,
    monthlyLimit: 100000,
    unit: "请求",
  },
  {
    id: "2captcha",
    name: "2Captcha",
    description: "验证码识别服务",
    icon: Shield,
    status: "active",
    apiKey: "xxx...xxxx",
    monthlyUsage: 12500,
    monthlyLimit: 50000,
    unit: "次",
  },
  {
    id: "proxy",
    name: "代理服务",
    description: "IP 代理池服务",
    icon: Cloud,
    status: "active",
    apiKey: "proxy_...xxxx",
    monthlyUsage: 45,
    monthlyLimit: 100,
    unit: "GB",
  },
  {
    id: "ahrefs",
    name: "Ahrefs",
    description: "SEO 数据分析",
    icon: Database,
    status: "active",
    apiKey: "ahrefs_...xxxx",
    monthlyUsage: 8500,
    monthlyLimit: 10000,
    unit: "查询",
  },
  {
    id: "semrush",
    name: "SEMrush",
    description: "关键词研究工具",
    icon: Database,
    status: "inactive",
    apiKey: "",
    monthlyUsage: 0,
    monthlyLimit: 10000,
    unit: "查询",
  },
];

// 图片/媒体 API
const mediaApis = [
  {
    id: "stability",
    name: "Stability AI",
    description: "AI 图片生成",
    icon: Image,
    status: "active",
    apiKey: "sk-...xxxx",
    monthlyUsage: 5200,
    monthlyLimit: 10000,
    unit: "张",
  },
  {
    id: "midjourney",
    name: "Midjourney",
    description: "高质量图片生成",
    icon: Image,
    status: "active",
    apiKey: "mj_...xxxx",
    monthlyUsage: 800,
    monthlyLimit: 2000,
    unit: "张",
  },
  {
    id: "cloudinary",
    name: "Cloudinary",
    description: "图片存储和处理",
    icon: Cloud,
    status: "active",
    apiKey: "cloudinary://...",
    monthlyUsage: 25,
    monthlyLimit: 100,
    unit: "GB",
  },
];

// Webhook 配置
const webhooks = [
  {
    id: "wh-1",
    name: "订单完成通知",
    url: "https://api.example.com/webhooks/order-complete",
    events: ["order.completed", "order.failed"],
    status: "active",
    lastTriggered: "10分钟前",
    successRate: 99.5,
  },
  {
    id: "wh-2",
    name: "用户注册通知",
    url: "https://api.example.com/webhooks/user-register",
    events: ["user.created"],
    status: "active",
    lastTriggered: "1小时前",
    successRate: 100,
  },
  {
    id: "wh-3",
    name: "余额变动通知",
    url: "https://api.example.com/webhooks/balance",
    events: ["balance.recharge", "balance.deduct"],
    status: "inactive",
    lastTriggered: "-",
    successRate: 0,
  },
];

export default function ApiConfigPage() {
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState("");

  const toggleShowKey = (id: string) => {
    setShowKey((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">API 配置</h1>
          <p className="text-muted-foreground mt-1">管理第三方 API 密钥和服务配置</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              添加 API
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>添加 API 配置</DialogTitle>
              <DialogDescription>配置新的第三方 API 服务</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>服务类型</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择服务类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai">AI 模型</SelectItem>
                    <SelectItem value="service">第三方服务</SelectItem>
                    <SelectItem value="media">图片/媒体</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>服务名称</Label>
                <Input placeholder="例如：OpenAI" />
              </div>
              <div className="space-y-2">
                <Label>API Key</Label>
                <Input type="password" placeholder="sk-..." />
              </div>
              <div className="space-y-2">
                <Label>月度限额</Label>
                <Input type="number" placeholder="5000" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">取消</Button>
              <Button>保存</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* 使用概览 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">$4,361.50</div>
            <p className="text-sm text-muted-foreground">本月 AI 消费</p>
            <Progress value={72} className="mt-2 h-1" />
            <p className="text-xs text-muted-foreground mt-1">已用 72% 预算</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">142,500</div>
            <p className="text-sm text-muted-foreground">本月 API 调用</p>
            <Progress value={58} className="mt-2 h-1" />
            <p className="text-xs text-muted-foreground mt-1">较上月 +23%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">99.2%</div>
            <p className="text-sm text-muted-foreground">API 成功率</p>
            <div className="flex items-center gap-1 mt-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-600">所有服务正常</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">12</div>
            <p className="text-sm text-muted-foreground">已配置 API</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                10 活跃
              </Badge>
              <Badge variant="outline" className="text-xs">
                2 停用
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="ai" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ai">
            <Bot className="h-4 w-4 mr-2" />
            AI 模型
          </TabsTrigger>
          <TabsTrigger value="service">
            <Code className="h-4 w-4 mr-2" />
            第三方服务
          </TabsTrigger>
          <TabsTrigger value="media">
            <Image className="h-4 w-4 mr-2" />
            图片/媒体
          </TabsTrigger>
          <TabsTrigger value="webhook">
            <MessageSquare className="h-4 w-4 mr-2" />
            Webhook
          </TabsTrigger>
        </TabsList>

        {/* AI 模型 API */}
        <TabsContent value="ai" className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索 AI 服务..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4">
            {aiApis.map((api) => (
              <Card key={api.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div
                        className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                          api.status === "active" ? "bg-green-100 dark:bg-green-900/30" : "bg-muted"
                        }`}
                      >
                        <api.icon
                          className={`h-6 w-6 ${
                            api.status === "active" ? "text-green-600 dark:text-green-400" : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{api.name}</h3>
                          {api.status === "active" ? (
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                              已启用
                            </Badge>
                          ) : (
                            <Badge variant="secondary">未配置</Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {api.models.map((model) => (
                            <Badge key={model} variant="outline" className="text-xs">
                              {model}
                            </Badge>
                          ))}
                        </div>
                        {api.status === "active" && (
                          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                            <span>本月消费: ${api.monthlyUsage.toFixed(2)}</span>
                            <span>限额: ${api.monthlyLimit}</span>
                            <span>最后使用: {api.lastUsed}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {api.status === "active" && (
                        <div className="flex items-center gap-2 mr-4">
                          <div className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-md">
                            <Key className="h-4 w-4 text-muted-foreground" />
                            <code className="text-sm">{showKey[api.id] ? api.apiKey : "••••••••••••"}</code>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => toggleShowKey(api.id)}
                            >
                              {showKey[api.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyKey(api.apiKey)}>
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )}
                      <Switch checked={api.status === "active"} />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Key className="h-4 w-4 mr-2" />
                            修改 API Key
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            测试连接
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            删除配置
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  {api.status === "active" && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">月度使用量</span>
                        <span>{((api.monthlyUsage / api.monthlyLimit) * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={(api.monthlyUsage / api.monthlyLimit) * 100} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 第三方服务 API */}
        <TabsContent value="service" className="space-y-4">
          <div className="grid gap-4">
            {serviceApis.map((api) => (
              <Card key={api.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div
                        className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                          api.status === "active" ? "bg-blue-100 dark:bg-blue-900/30" : "bg-muted"
                        }`}
                      >
                        <api.icon
                          className={`h-6 w-6 ${
                            api.status === "active" ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{api.name}</h3>
                          {api.status === "active" ? (
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                              已启用
                            </Badge>
                          ) : (
                            <Badge variant="secondary">未配置</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{api.description}</p>
                        {api.status === "active" && (
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span>
                              已用: {api.monthlyUsage.toLocaleString()} {api.unit}
                            </span>
                            <span>
                              限额: {api.monthlyLimit.toLocaleString()} {api.unit}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={api.status === "active"} />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Key className="h-4 w-4 mr-2" />
                            修改配置
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            测试连接
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            删除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  {api.status === "active" && (
                    <div className="mt-4">
                      <Progress value={(api.monthlyUsage / api.monthlyLimit) * 100} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 图片/媒体 API */}
        <TabsContent value="media" className="space-y-4">
          <div className="grid gap-4">
            {mediaApis.map((api) => (
              <Card key={api.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div
                        className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                          api.status === "active" ? "bg-purple-100 dark:bg-purple-900/30" : "bg-muted"
                        }`}
                      >
                        <api.icon
                          className={`h-6 w-6 ${
                            api.status === "active" ? "text-purple-600 dark:text-purple-400" : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{api.name}</h3>
                          {api.status === "active" ? (
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                              已启用
                            </Badge>
                          ) : (
                            <Badge variant="secondary">未配置</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{api.description}</p>
                        {api.status === "active" && (
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span>
                              已用: {api.monthlyUsage.toLocaleString()} {api.unit}
                            </span>
                            <span>
                              限额: {api.monthlyLimit.toLocaleString()} {api.unit}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={api.status === "active"} />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Key className="h-4 w-4 mr-2" />
                            修改配置
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            测试连接
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            删除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  {api.status === "active" && (
                    <div className="mt-4">
                      <Progress value={(api.monthlyUsage / api.monthlyLimit) * 100} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Webhook 配置 */}
        <TabsContent value="webhook" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">配置 Webhook 接收系统事件通知</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  添加 Webhook
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>添加 Webhook</DialogTitle>
                  <DialogDescription>配置新的 Webhook 端点</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>名称</Label>
                    <Input placeholder="订单通知" />
                  </div>
                  <div className="space-y-2">
                    <Label>URL</Label>
                    <Input placeholder="https://api.example.com/webhook" />
                  </div>
                  <div className="space-y-2">
                    <Label>触发事件</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择事件" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="order.created">订单创建</SelectItem>
                        <SelectItem value="order.completed">订单完成</SelectItem>
                        <SelectItem value="order.failed">订单失败</SelectItem>
                        <SelectItem value="user.created">用户注册</SelectItem>
                        <SelectItem value="balance.recharge">余额充值</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Secret（可选）</Label>
                    <Input type="password" placeholder="用于验证请求签名" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">取消</Button>
                  <Button>保存</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {webhooks.map((webhook) => (
              <Card key={webhook.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div
                        className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          webhook.status === "active" ? "bg-green-100 dark:bg-green-900/30" : "bg-muted"
                        }`}
                      >
                        {webhook.status === "active" ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                        ) : (
                          <XCircle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{webhook.name}</h3>
                          {webhook.status === "active" ? (
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                              活跃
                            </Badge>
                          ) : (
                            <Badge variant="secondary">停用</Badge>
                          )}
                        </div>
                        <code className="text-sm text-muted-foreground mt-1 block">{webhook.url}</code>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {webhook.events.map((event) => (
                            <Badge key={event} variant="outline" className="text-xs">
                              {event}
                            </Badge>
                          ))}
                        </div>
                        {webhook.status === "active" && (
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span>最后触发: {webhook.lastTriggered}</span>
                            <span>成功率: {webhook.successRate}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={webhook.status === "active"} />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Key className="h-4 w-4 mr-2" />
                            编辑
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            测试发送
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            删除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
