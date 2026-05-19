"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Globe,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Loader2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  mediaOutlets,
  industryLabels,
  languageLabels,
  regionLabels,
  mediaTypeLabels,
  daRanges,
  priceRanges,
  type MediaOutlet,
  type MediaIndustry,
  type MediaLanguage,
  type MediaRegion,
  type MediaType,
} from "@/data/press-release";

export default function PressReleasePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedMediaType, setSelectedMediaType] = useState<string>("all");
  const [selectedDaRange, setSelectedDaRange] = useState<string>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [selectedLinkType, setSelectedLinkType] = useState<string>("all");
  const [selectedMediaIds, setSelectedMediaIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 筛选媒体
  const filteredMedia = useMemo(() => {
    return mediaOutlets.filter((media) => {
      // 搜索
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !media.name.toLowerCase().includes(query) &&
          !media.website.toLowerCase().includes(query) &&
          !media.description.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      // 行业
      if (selectedIndustry !== "all" && media.industry !== selectedIndustry) {
        return false;
      }

      // 语言
      if (selectedLanguage !== "all" && media.language !== selectedLanguage) {
        return false;
      }

      // 地区
      if (selectedRegion !== "all" && media.region !== selectedRegion) {
        return false;
      }

      // 媒体类型
      if (selectedMediaType !== "all" && media.mediaType !== selectedMediaType) {
        return false;
      }

      // DA 范围
      if (selectedDaRange !== "all") {
        const range = daRanges.find((r) => r.value === selectedDaRange);
        if (range && (media.da < range.min || media.da > range.max)) {
          return false;
        }
      }

      // 价格范围
      if (selectedPriceRange !== "all") {
        const range = priceRanges.find((r) => r.value === selectedPriceRange);
        if (range && (media.price < range.min || media.price > range.max)) {
          return false;
        }
      }

      // 链接支持
      if (selectedLinkType === "supports" && !media.supportsLink) {
        return false;
      }
      if (selectedLinkType === "no-link" && media.supportsLink) {
        return false;
      }

      return true;
    });
  }, [
    searchQuery,
    selectedIndustry,
    selectedLanguage,
    selectedRegion,
    selectedMediaType,
    selectedDaRange,
    selectedPriceRange,
    selectedLinkType,
  ]);

  // 计算总价
  const totalPrice = useMemo(() => {
    return selectedMediaIds.reduce((sum, id) => {
      const media = mediaOutlets.find((m) => m.id === id);
      return sum + (media?.price || 0);
    }, 0);
  }, [selectedMediaIds]);

  // 选中的媒体
  const selectedMedia = useMemo(() => {
    return mediaOutlets.filter((m) => selectedMediaIds.includes(m.id));
  }, [selectedMediaIds]);

  const handleSelectMedia = (mediaId: string, checked: boolean) => {
    if (checked) {
      setSelectedMediaIds((prev) => [...prev, mediaId]);
    } else {
      setSelectedMediaIds((prev) => prev.filter((id) => id !== mediaId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedMediaIds(filteredMedia.map((m) => m.id));
    } else {
      setSelectedMediaIds([]);
    }
  };

  const handleRemoveMedia = (mediaId: string) => {
    setSelectedMediaIds((prev) => prev.filter((id) => id !== mediaId));
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedIndustry("all");
    setSelectedLanguage("all");
    setSelectedRegion("all");
    setSelectedMediaType("all");
    setSelectedDaRange("all");
    setSelectedPriceRange("all");
    setSelectedLinkType("all");
  };

  const handleSubmit = async () => {
    if (selectedMediaIds.length === 0) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push("/dashboard/tasks");
  };

  const isAllSelected =
    filteredMedia.length > 0 &&
    filteredMedia.every((m) => selectedMediaIds.includes(m.id));

  const hasActiveFilters =
    selectedIndustry !== "all" ||
    selectedLanguage !== "all" ||
    selectedRegion !== "all" ||
    selectedMediaType !== "all" ||
    selectedDaRange !== "all" ||
    selectedPriceRange !== "all" ||
    selectedLinkType !== "all";

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">发稿服务</h1>
        <p className="text-muted-foreground">
          选择优质媒体发布新闻稿，提升品牌曝光和权威背书
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{mediaOutlets.length}</div>
            <p className="text-sm text-muted-foreground">合作媒体</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {Object.keys(industryLabels).length}
            </div>
            <p className="text-sm text-muted-foreground">行业覆盖</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {Object.keys(languageLabels).length}
            </div>
            <p className="text-sm text-muted-foreground">语言支持</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {mediaOutlets.filter((m) => m.da >= 80).length}
            </div>
            <p className="text-sm text-muted-foreground">DA 80+ 媒体</p>
          </CardContent>
        </Card>
      </div>

      {/* 筛选条件 - 简洁横向布局 */}
      <div className="bg-card rounded-lg border divide-y">
        {/* 行业 */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 py-3 px-4">
          <button
            onClick={() => setSelectedIndustry("all")}
            className={`text-sm px-3 py-1 rounded transition-colors ${
              selectedIndustry === "all"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            不限
          </button>
          {Object.entries(industryLabels).map(([value, label]) => (
            <button
              key={value}
              onClick={() => setSelectedIndustry(value)}
              className={`text-sm transition-colors ${
                selectedIndustry === value
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 媒体类型 */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 py-3 px-4">
          <button
            onClick={() => setSelectedMediaType("all")}
            className={`text-sm px-3 py-1 rounded transition-colors ${
              selectedMediaType === "all"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            不限
          </button>
          {Object.entries(mediaTypeLabels).map(([value, label]) => (
            <button
              key={value}
              onClick={() => setSelectedMediaType(value)}
              className={`text-sm transition-colors ${
                selectedMediaType === value
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 语言 */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 py-3 px-4">
          <button
            onClick={() => setSelectedLanguage("all")}
            className={`text-sm px-3 py-1 rounded transition-colors ${
              selectedLanguage === "all"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            不限
          </button>
          {Object.entries(languageLabels).map(([value, label]) => (
            <button
              key={value}
              onClick={() => setSelectedLanguage(value)}
              className={`text-sm transition-colors ${
                selectedLanguage === value
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 地区 */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 py-3 px-4">
          <button
            onClick={() => setSelectedRegion("all")}
            className={`text-sm px-3 py-1 rounded transition-colors ${
              selectedRegion === "all"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            不限
          </button>
          {Object.entries(regionLabels).map(([value, label]) => (
            <button
              key={value}
              onClick={() => setSelectedRegion(value)}
              className={`text-sm transition-colors ${
                selectedRegion === value
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 链接支持 */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 py-3 px-4">
          <button
            onClick={() => setSelectedLinkType("all")}
            className={`text-sm px-3 py-1 rounded transition-colors ${
              selectedLinkType === "all"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            不限
          </button>
          <button
            onClick={() => setSelectedLinkType("supports")}
            className={`text-sm transition-colors ${
              selectedLinkType === "supports"
                ? "text-primary font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            支持链接
          </button>
          <button
            onClick={() => setSelectedLinkType("no-link")}
            className={`text-sm transition-colors ${
              selectedLinkType === "no-link"
                ? "text-primary font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            不支持链接
          </button>
        </div>

        {/* 其他 */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-3 px-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm px-3 py-1 rounded bg-primary text-primary-foreground">其他</span>
            <Select
              value={selectedDaRange}
              onValueChange={setSelectedDaRange}
            >
              <SelectTrigger className="w-[110px] h-8 text-sm border-dashed">
                <SelectValue placeholder="DA 权重" />
              </SelectTrigger>
              <SelectContent>
                {daRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedPriceRange}
              onValueChange={setSelectedPriceRange}
            >
              <SelectTrigger className="w-[110px] h-8 text-sm border-dashed">
                <SelectValue placeholder="价格范围" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-muted-foreground hover:text-destructive transition-colors"
              >
                清除筛选
              </button>
            )}
          </div>
          {/* 搜索框 */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索媒体名称、网站或描述..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-8"
            />
          </div>
        </div>
      </div>

      {/* 媒体列表 */}
      <div className="space-y-4">
          {/* 结果统计和全选 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="select-all"
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                />
                <label htmlFor="select-all" className="text-sm cursor-pointer">
                  全选
                </label>
              </div>
              <span className="text-sm text-muted-foreground">
                共 {filteredMedia.length} 个媒体
              </span>
            </div>

            {/* 移动端已选提示 */}
            {selectedMediaIds.length > 0 && (
              <div className="lg:hidden text-sm">
                已选 {selectedMediaIds.length} 个，共 ${totalPrice.toLocaleString()}
              </div>
            )}
          </div>

          {/* 媒体列表 */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]"></TableHead>
                      <TableHead>媒体</TableHead>
                      <TableHead className="hidden md:table-cell">行业</TableHead>
                      <TableHead className="hidden sm:table-cell">语言</TableHead>
                      <TableHead>DA</TableHead>
                      <TableHead className="hidden lg:table-cell">月访问</TableHead>
                      <TableHead className="hidden md:table-cell">链接</TableHead>
                      <TableHead className="hidden lg:table-cell">发布时间</TableHead>
                      <TableHead className="text-right">价格</TableHead>
                      <TableHead className="w-[60px] text-right sticky right-0 bg-background">选择</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMedia.map((media) => (
                      <TableRow
                        key={media.id}
                        className={
                          selectedMediaIds.includes(media.id)
                            ? "bg-primary/5"
                            : ""
                        }
                      >
                        <TableCell>
                          <Checkbox
                            checked={selectedMediaIds.includes(media.id)}
                            onCheckedChange={(checked) =>
                              handleSelectMedia(media.id, checked as boolean)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                              <Globe className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium flex items-center gap-2">
                                {media.name}
                                {media.featured && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                                  >
                                    精选
                                  </Badge>
                                )}
                              </div>
                              <a
                                href={`https://${media.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                              >
                                {media.website}
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="outline">
                            {industryLabels[media.industry]}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {languageLabels[media.language]}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span
                              className={
                                media.da >= 90
                                  ? "text-green-600 font-semibold"
                                  : media.da >= 80
                                  ? "text-blue-600 font-medium"
                                  : media.da >= 70
                                  ? "text-amber-600"
                                  : ""
                              }
                            >
                              {media.da}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-muted-foreground">
                          {media.monthlyTraffic}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {media.supportsLink ? (
                            media.dofollow ? (
                              <Badge
                                variant="secondary"
                                className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                              >
                                Dofollow
                              </Badge>
                            ) : (
                              <Badge variant="outline">Nofollow</Badge>
                            )
                          ) : (
                            <Badge variant="outline" className="text-muted-foreground">
                              不支持
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-muted-foreground">
                          {media.turnaround}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          ${media.price}
                        </TableCell>
                        <TableCell className="text-right sticky right-0 bg-background">
                          <Checkbox
                            checked={selectedMediaIds.includes(media.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedMediaIds((prev) => [...prev, media.id]);
                              } else {
                                setSelectedMediaIds((prev) =>
                                  prev.filter((id) => id !== media.id)
                                );
                              }
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredMedia.length === 0 && (
                <div className="py-12 text-center text-muted-foreground">
                  <Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>没有找到符合条件的媒体</p>
                  <Button
                    variant="link"
                    onClick={clearFilters}
                    className="mt-2"
                  >
                    清除筛选条件
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      {/* 底部固定操作栏 */}
      {selectedMediaIds.length > 0 && (
        <div className="sticky bottom-0 bg-background border-t shadow-lg z-40 -mx-4 px-4 py-3 sm:-mx-6 sm:px-6">
          {/* 已选媒体名称 */}
          <div className="flex items-center gap-2 mb-2 overflow-x-auto pb-1">
            <span className="text-sm text-muted-foreground shrink-0">已选媒体：</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {selectedMedia.slice(0, 5).map((media) => (
                <Badge key={media.id} variant="secondary" className="shrink-0">
                  {media.name}
                </Badge>
              ))}
              {selectedMedia.length > 5 && (
                <Badge variant="outline" className="shrink-0">
                  +{selectedMedia.length - 5} 个
                </Badge>
              )}
            </div>
          </div>
          
          {/* 操作栏 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="font-medium">
                  已选择 {selectedMediaIds.length} 个媒体
                </span>
              </div>
              <div className="hidden sm:block text-muted-foreground">|</div>
              <div className="hidden sm:block">
                <span className="text-muted-foreground">总价：</span>
                <span className="text-xl font-bold text-primary ml-1">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setSelectedMediaIds([])}
              >
                清空
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    提交中...
                  </>
                ) : (
                  <>
                    提交订单
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
