"use client";

import { useState } from "react";

import { Bell, CreditCard, Globe, Mail, MessageSquare, RotateCcw, Save, Settings, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">系统配置</h1>
          <p className="text-muted-foreground mt-1">管理系统全局设置和参数</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            重置
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "保存中..." : "保存配置"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">
            <Settings className="h-4 w-4 mr-2" />
            基本设置
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="h-4 w-4 mr-2" />
            邮件配置
          </TabsTrigger>
          <TabsTrigger value="sms">
            <MessageSquare className="h-4 w-4 mr-2" />
            短信配置
          </TabsTrigger>
          <TabsTrigger value="payment">
            <CreditCard className="h-4 w-4 mr-2" />
            支付配置
          </TabsTrigger>
          <TabsTrigger value="notification">
            <Bell className="h-4 w-4 mr-2" />
            通知设置
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            安全设置
          </TabsTrigger>
        </TabsList>

        {/* 基本设置 */}
        <TabsContent value="general">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>网站信息</CardTitle>
                <CardDescription>配置网站基本信息</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>网站名称</Label>
                    <Input defaultValue="营销智能体" />
                  </div>
                  <div className="space-y-2">
                    <Label>网站域名</Label>
                    <Input defaultValue="https://example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>网站描述</Label>
                  <Textarea defaultValue="一站式AI营销自动化平台，提供SEO、GEO、社交媒体、新闻发稿等服务" rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>联系邮箱</Label>
                    <Input defaultValue="support@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>联系电话</Label>
                    <Input defaultValue="+86 400-xxx-xxxx" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>区域设置</CardTitle>
                <CardDescription>配置系统语言和时区</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>默认语言</Label>
                    <Select defaultValue="zh-CN">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zh-CN">简体中文</SelectItem>
                        <SelectItem value="en-US">English</SelectItem>
                        <SelectItem value="ja-JP">日本語</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>时区</Label>
                    <Select defaultValue="Asia/Shanghai">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Shanghai">中国标准时间 (UTC+8)</SelectItem>
                        <SelectItem value="America/New_York">美国东部时间</SelectItem>
                        <SelectItem value="Europe/London">伦敦时间</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>货币单位</Label>
                    <Select defaultValue="USD">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">美元 (USD)</SelectItem>
                        <SelectItem value="CNY">人民币 (CNY)</SelectItem>
                        <SelectItem value="EUR">欧元 (EUR)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>功能开关</CardTitle>
                <CardDescription>控制系统功能模块</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">用户注册</p>
                    <p className="text-sm text-muted-foreground">允许新用户注册账号</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">邮箱验证</p>
                    <p className="text-sm text-muted-foreground">注册时需要验证邮箱</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">维护模式</p>
                    <p className="text-sm text-muted-foreground">开启后用户端显示维护页面</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">调试模式</p>
                    <p className="text-sm text-muted-foreground">显示详细错误信息（生产环境请关闭）</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 邮件配置 */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>SMTP 邮件服务</CardTitle>
              <CardDescription>配置系统邮件发送服务</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>邮件服务商</Label>
                  <Select defaultValue="custom">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sendgrid">SendGrid</SelectItem>
                      <SelectItem value="mailgun">Mailgun</SelectItem>
                      <SelectItem value="ses">Amazon SES</SelectItem>
                      <SelectItem value="resend">Resend</SelectItem>
                      <SelectItem value="custom">自定义 SMTP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>发件人名称</Label>
                  <Input defaultValue="营销智能体" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>SMTP 服务器</Label>
                  <Input placeholder="smtp.example.com" />
                </div>
                <div className="space-y-2">
                  <Label>SMTP 端口</Label>
                  <Input placeholder="587" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>SMTP 用户名</Label>
                  <Input placeholder="your-email@example.com" />
                </div>
                <div className="space-y-2">
                  <Label>SMTP 密码</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-2">
                  <Switch id="smtp-ssl" defaultChecked />
                  <Label htmlFor="smtp-ssl">启用 SSL/TLS</Label>
                </div>
                <Button variant="outline">发送测试邮件</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 短信配置 */}
        <TabsContent value="sms">
          <Card>
            <CardHeader>
              <CardTitle>短信服务</CardTitle>
              <CardDescription>配置短信验证码和通知服务</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>短信服务商</Label>
                  <Select defaultValue="aliyun">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aliyun">阿里云短信</SelectItem>
                      <SelectItem value="tencent">腾讯云短信</SelectItem>
                      <SelectItem value="twilio">Twilio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>短信签名</Label>
                  <Input placeholder="【营销智能体】" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Access Key ID</Label>
                  <Input placeholder="LTAI5t..." />
                </div>
                <div className="space-y-2">
                  <Label>Access Key Secret</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>验证码模板ID</Label>
                <Input placeholder="SMS_123456789" />
              </div>
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-2">
                  <Switch id="sms-enabled" defaultChecked />
                  <Label htmlFor="sms-enabled">启用短信服务</Label>
                </div>
                <Button variant="outline">发送测试短信</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 支付配置 */}
        <TabsContent value="payment">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Stripe 支付</CardTitle>
                <CardDescription>配置 Stripe 在线支付</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">启用 Stripe</p>
                    <p className="text-sm text-muted-foreground">支持信用卡、Apple Pay、Google Pay</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Publishable Key</Label>
                    <Input placeholder="pk_live_..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Secret Key</Label>
                    <Input type="password" placeholder="sk_live_..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Webhook Secret</Label>
                  <Input type="password" placeholder="whsec_..." />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>支付宝</CardTitle>
                <CardDescription>配置支付宝支付</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">启用支付宝</p>
                    <p className="text-sm text-muted-foreground">支持扫码支付、网页支付</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>App ID</Label>
                    <Input placeholder="2021..." />
                  </div>
                  <div className="space-y-2">
                    <Label>商户私钥</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>充值设置</CardTitle>
                <CardDescription>配置用户充值选项</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>最低充值金额</Label>
                    <Input type="number" defaultValue="100" />
                  </div>
                  <div className="space-y-2">
                    <Label>最高充值金额</Label>
                    <Input type="number" defaultValue="100000" />
                  </div>
                  <div className="space-y-2">
                    <Label>充值手续费 (%)</Label>
                    <Input type="number" defaultValue="0" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 通知设置 */}
        <TabsContent value="notification">
          <Card>
            <CardHeader>
              <CardTitle>通知配置</CardTitle>
              <CardDescription>配置系统通知发送规则</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">用户通知</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">订单状态变更</p>
                      <p className="text-xs text-muted-foreground">订单开始执行、完成时通知用户</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Switch id="order-email" defaultChecked />
                        <Label htmlFor="order-email" className="text-sm">
                          邮件
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch id="order-sms" />
                        <Label htmlFor="order-sms" className="text-sm">
                          短信
                        </Label>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">余额变动</p>
                      <p className="text-xs text-muted-foreground">充值成功、消费扣款时通知</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Switch id="balance-email" defaultChecked />
                        <Label htmlFor="balance-email" className="text-sm">
                          邮件
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch id="balance-sms" />
                        <Label htmlFor="balance-sms" className="text-sm">
                          短信
                        </Label>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">余额不足预警</p>
                      <p className="text-xs text-muted-foreground">余额低于阈值时提醒充值</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Switch id="low-balance-email" defaultChecked />
                        <Label htmlFor="low-balance-email" className="text-sm">
                          邮件
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch id="low-balance-sms" defaultChecked />
                        <Label htmlFor="low-balance-sms" className="text-sm">
                          短信
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">管理员通知</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">新订单通知</p>
                      <p className="text-xs text-muted-foreground">有新订单时通知管理员</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">工作流异常</p>
                      <p className="text-xs text-muted-foreground">工作流执行失败时告警</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">资源不足</p>
                      <p className="text-xs text-muted-foreground">账号池或资源不足时告警</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 安全设置 */}
        <TabsContent value="security">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>登录安全</CardTitle>
                <CardDescription>配置用户登录安全策略</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>登录失败锁定次数</Label>
                    <Input type="number" defaultValue="5" />
                  </div>
                  <div className="space-y-2">
                    <Label>锁定时长（分钟）</Label>
                    <Input type="number" defaultValue="30" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Session 有效期（小时）</Label>
                    <Input type="number" defaultValue="24" />
                  </div>
                  <div className="space-y-2">
                    <Label>密码最小长度</Label>
                    <Input type="number" defaultValue="8" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">强制双因素认证</p>
                    <p className="text-sm text-muted-foreground">管理员登录需要二次验证</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">IP 白名单</p>
                    <p className="text-sm text-muted-foreground">限制管理后台访问IP</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API 安全</CardTitle>
                <CardDescription>配置 API 访问安全策略</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>API 限流（次/分钟）</Label>
                    <Input type="number" defaultValue="60" />
                  </div>
                  <div className="space-y-2">
                    <Label>Token 有效期（天）</Label>
                    <Input type="number" defaultValue="30" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">启用 CORS</p>
                    <p className="text-sm text-muted-foreground">允许跨域请求</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>允许的域名（每行一个）</Label>
                  <Textarea placeholder="https://example.com&#10;https://app.example.com" rows={3} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
