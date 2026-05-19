"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  Globe,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Loader2,
  X,
  SlidersHorizontal,
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
  CardHeader,
  CardTitle,
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  mediaOutlets,
  industryLabels,
  languageLabels,
  regionLabels,
  daRanges,
  priceRanges,
  type MediaOutlet,
  type MediaIndustry,
  type MediaLanguage,
  type MediaRegion,
} from "@/data/press-release";

export default function PressReleasePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedDaRange, setSelectedDaRange] = useState<string>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [dofollowOnly, setDofollowOnly] = useState(false);
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

      // Dofollow
      if (dofollowOnly && !media.dofollow) {
        return false;
      }

      return true;
    });
  }, [
    searchQuery,
    selectedIndustry,
    selectedLanguage,
    selectedRegion,
    selectedDaRange,
    selectedPriceRange,
    dofollowOnly,
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
    setSelectedDaRange("all");
    setSelectedPriceRange("all");
    setDofollowOnly(false);
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
    selectedDaRange !== "all" ||
    selectedPriceRange !== "all" ||
    dofollowOnly;

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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 左侧筛选器 - 桌面端 */}
        <div className="hidden lg:block space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <Filter className="h-4 w-4" />
                筛选条件
              </CardTitle>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                >
                  清除筛选
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 行业 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">行业</label>
                <Select
                  value={selectedIndustry}
                  onValueChange={setSelectedIndustry}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择行业" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部行业</SelectItem>
                    {Object.entries(industryLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 语言 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">语言</label>
                <Select
                  value={selectedLanguage}
                  onValueChange={setSelectedLanguage}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择语言" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部语言</SelectItem>
                    {Object.entries(languageLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 地区 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">地区</label>
                <Select
                  value={selectedRegion}
                  onValueChange={setSelectedRegion}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择地区" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部地区</SelectItem>
                    {Object.entries(regionLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* DA 范围 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">DA 权重</label>
                <Select
                  value={selectedDaRange}
                  onValueChange={setSelectedDaRange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择 DA 范围" />
                  </SelectTrigger>
                  <SelectContent>
                    {daRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 价格范围 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">价格范围</label>
                <Select
                  value={selectedPriceRange}
                  onValueChange={setSelectedPriceRange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择价格范围" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Dofollow */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="dofollow"
                  checked={dofollowOnly}
                  onCheckedChange={(checked) =>
                    setDofollowOnly(checked as boolean)
                  }
                />
                <label htmlFor="dofollow" className="text-sm cursor-pointer">
                  仅显示 Dofollow 链接
                </label>
              </div>
            </CardContent>
          </Card>

          {/* 已选媒体 */}
          {selectedMediaIds.length > 0 && (
            <Card className="border-primary">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  已选媒体 ({selectedMediaIds.length})
                </CardTitle>
                <CardDescription>
                  总价：
                  <span className="text-lg font-bold text-primary ml-1">
                    ${totalPrice.toLocaleString()}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 max-h-[300px] overflow-y-auto">
                {selectedMedia.map((media) => (
                  <div
                    key={media.id}
                    className="flex items-center justify-between text-sm p-2 rounded-md bg-muted/50"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{media.name}</div>
                      <div className="text-muted-foreground text-xs">
                        ${media.price}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => handleRemoveMedia(media.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* 右侧列表 */}
        <div className="lg:col-span-3 space-y-4">
          {/* 搜索和移动端筛选 */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索媒体名称、网站或描述..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* 移动端筛选按钮 */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle>筛选条件</SheetTitle>
                  <SheetDescription>设置筛选条件找到合适的媒体</SheetDescription>
                </SheetHeader>
                <div className="space-y-4 mt-6">
                  {/* 移动端筛选器内容 - 与桌面端相同 */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">行业</label>
                    <Select
                      value={selectedIndustry}
                      onValueChange={setSelectedIndustry}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择行业" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部行业</SelectItem>
                        {Object.entries(industryLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">语言</label>
                    <Select
                      value={selectedLanguage}
                      onValueChange={setSelectedLanguage}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择语言" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部语言</SelectItem>
                        {Object.entries(languageLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">DA 权重</label>
                    <Select
                      value={selectedDaRange}
                      onValueChange={setSelectedDaRange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择 DA 范围" />
                      </SelectTrigger>
                      <SelectContent>
                        {daRanges.map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="dofollow-mobile"
                      checked={dofollowOnly}
                      onCheckedChange={(checked) =>
                        setDofollowOnly(checked as boolean)
                      }
                    />
                    <label
                      htmlFor="dofollow-mobile"
                      className="text-sm cursor-pointer"
                    >
                      仅显示 Dofollow 链接
                    </label>
                  </div>
                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={clearFilters}
                    >
                      清除所有筛选
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

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
                          {media.dofollow ? (
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            >
                              Dofollow
                            </Badge>
                          ) : (
                            <Badge variant="outline">Nofollow</Badge>
                          )}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-muted-foreground">
                          {media.turnaround}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          ${media.price}
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
      </div>

      {/* 底部固定操作栏 */}
      {selectedMediaIds.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 shadow-lg z-50">
          <div className="container mx-auto flex items-center justify-between max-w-7xl">
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

      {/* 底部占位 */}
      {selectedMediaIds.length > 0 && <div className="h-20" />}
    </div>
  );
}
