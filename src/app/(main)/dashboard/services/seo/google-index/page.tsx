"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { 
  Zap, 
  Plus, 
  Trash2, 
  ArrowRight, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Info,
  Upload
} from "lucide-react";
import { cn } from "@/lib/utils";

const PRICE_PER_URL = 0.1;

export default function GoogleIndexPage() {
  const [mode, setMode] = useState<"single" | "batch">("single");
  const [singleUrl, setSingleUrl] = useState("");
  const [batchUrls, setBatchUrls] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 处理文件导入
  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        // 如果当前已有内容，追加新内容
        if (batchUrls.trim()) {
          setBatchUrls(batchUrls.trim() + "\n" + content.trim());
        } else {
          setBatchUrls(content.trim());
        }
      }
    };
    reader.readAsText(file);
    // 清空input以便可以重复选择同一文件
    e.target.value = "";
  };

  // 解析批量URL
  const parsedUrls = useMemo(() => {
    if (mode === "single") {
      return singleUrl.trim() ? [singleUrl.trim()] : [];
    }
    return batchUrls
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url.length > 0);
  }, [mode, singleUrl, batchUrls]);

  // 验证URL
  const validateUrl = (url: string): boolean => {
    try {
      const urlToTest = url.startsWith("http") ? url : `https://${url}`;
      new URL(urlToTest);
      return true;
    } catch {
      return false;
    }
  };

  // 统计有效和无效URL
  const urlStats = useMemo(() => {
    const valid = parsedUrls.filter(validateUrl);
    const invalid = parsedUrls.filter((url) => !validateUrl(url));
    return { valid, invalid, total: parsedUrls.length };
  }, [parsedUrls]);

  // 计算价格
  const totalPrice = urlStats.valid.length * PRICE_PER_URL;

  const handleSubmit = async () => {
    if (urlStats.valid.length === 0) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    // 重置表单
    setSingleUrl("");
    setBatchUrls("");
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Zap className="h-6 w-6 text-amber-500" />
          Google 秒收
        </h1>
        <p className="text-muted-foreground mt-1">
          快速提交 URL 到 Google 索引，加速网页收录
        </p>
      </div>

      {/* 主要内容 */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* 左侧：输入区域 */}
        <Card>
          <CardHeader>
            <CardTitle>提交 URL</CardTitle>
            <CardDescription>
              输入需要快速收录的网页地址，支持单条或批量提交
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 模式切换 */}
            <Tabs value={mode} onValueChange={(v) => setMode(v as "single" | "batch")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="single" className="gap-2">
                  <Plus className="h-4 w-4" />
                  单条提交
                </TabsTrigger>
                <TabsTrigger value="batch" className="gap-2">
                  <FileText className="h-4 w-4" />
                  批量提交
                </TabsTrigger>
              </TabsList>

              <TabsContent value="single" className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="single-url">网页 URL</Label>
                  <Input
                    id="single-url"
                    placeholder="https://example.com/page"
                    value={singleUrl}
                    onChange={(e) => setSingleUrl(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    输入完整的网页地址，包含 https:// 或 http://
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="batch" className="mt-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="batch-urls">批量 URL（每行一个）</Label>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept=".txt"
                        onChange={handleFileImport}
                        className="hidden"
                      />
                      <span className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors">
                        <Upload className="h-4 w-4" />
                        导入 TXT
                      </span>
                    </label>
                  </div>
                  <Textarea
                    id="batch-urls"
                    placeholder={`https://example.com/page1\nhttps://example.com/page2\nhttps://example.com/page3`}
                    value={batchUrls}
                    onChange={(e) => setBatchUrls(e.target.value)}
                    rows={10}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    每行输入一个 URL，支持批量导入
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            {/* URL 验证状态 */}
            {parsedUrls.length > 0 && (
              <div className="rounded-lg border p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">URL 解析结果</span>
                  <span className="font-medium">{urlStats.total} 条</span>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-green-600 dark:text-green-400">
                      有效: {urlStats.valid.length}
                    </span>
                  </div>
                  {urlStats.invalid.length > 0 && (
                    <div className="flex items-center gap-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span className="text-red-600 dark:text-red-400">
                        无效: {urlStats.invalid.length}
                      </span>
                    </div>
                  )}
                </div>

                {/* 显示无效URL列表 */}
                {urlStats.invalid.length > 0 && (
                  <div className="mt-2 p-3 bg-red-50 dark:bg-red-950/20 rounded-md">
                    <p className="text-xs text-red-600 dark:text-red-400 font-medium mb-1">
                      以下 URL 格式无效：
                    </p>
                    <ul className="text-xs text-red-500 space-y-0.5">
                      {urlStats.invalid.slice(0, 3).map((url, i) => (
                        <li key={i} className="truncate">{url}</li>
                      ))}
                      {urlStats.invalid.length > 3 && (
                        <li>...还有 {urlStats.invalid.length - 3} 条</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* 提示信息 */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Google 秒收服务通过 Google Indexing API 快速提交您的网页。</p>
                <p>通常在提交后 24-48 小时内完成索引。</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 右侧：价格计算 */}
        <div className="space-y-6">
          {/* 价格卡片 */}
          <Card>
            <CardHeader>
              <CardTitle>费用明细</CardTitle>
              <CardDescription>实时计算提交费用</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 单价 */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">单价</span>
                <span className="font-medium">${PRICE_PER_URL.toFixed(2)} / 条</span>
              </div>

              {/* 数量 */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">有效 URL 数量</span>
                <span className="font-medium">{urlStats.valid.length} 条</span>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">总计</span>
                  <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 套餐推荐 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">批量优惠</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <PackageItem 
                count={100} 
                price={8} 
                originalPrice={10}
                isActive={urlStats.valid.length >= 100}
              />
              <PackageItem 
                count={500} 
                price={35} 
                originalPrice={50}
                isActive={urlStats.valid.length >= 500}
              />
              <PackageItem 
                count={1000} 
                price={60} 
                originalPrice={100}
                isActive={urlStats.valid.length >= 1000}
              />
            </CardContent>
          </Card>

          {/* 提交按钮 */}
          <Button
            size="lg"
            className="w-full gap-2"
            onClick={handleSubmit}
            disabled={isSubmitting || urlStats.valid.length === 0}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                提交中...
              </>
            ) : (
              <>
                立即提交
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>

          {urlStats.valid.length === 0 && (
            <p className="text-xs text-muted-foreground text-center">
              请输入至少一个有效的 URL
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// 套餐项组件
function PackageItem({
  count,
  price,
  originalPrice,
  isActive,
}: {
  count: number;
  price: number;
  originalPrice: number;
  isActive: boolean;
}) {
  const discount = Math.round((1 - price / originalPrice) * 100);

  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 rounded-lg border transition-all",
        isActive ? "border-primary bg-primary/5" : "border-border"
      )}
    >
      <div>
        <div className="font-medium">{count} 条</div>
        <div className="text-xs text-muted-foreground">
          <span className="line-through">${originalPrice}</span>
          <span className="ml-2 text-green-600 dark:text-green-400">省 {discount}%</span>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold">${price}</div>
        <div className="text-xs text-muted-foreground">
          ${(price / count).toFixed(3)}/条
        </div>
      </div>
    </div>
  );
}
