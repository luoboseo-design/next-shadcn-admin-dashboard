"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  Minus,
  ShoppingCart,
  ArrowRight,
  Loader2,
  X,
  MessageCircle,
  Heart,
  Users,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import {
  socialServices,
  platformLabels,
  serviceTypeLabels,
  qualityLabels,
  type SocialPlatform,
  type ServiceType,
  type SocialService,
} from "@/data/social-media";

// 服务类型图标
const serviceTypeIcons: Record<ServiceType, React.ReactNode> = {
  post: <FileText className="h-4 w-4" />,
  comment: <MessageCircle className="h-4 w-4" />,
  like: <Heart className="h-4 w-4" />,
  follower: <Users className="h-4 w-4" />,
};

// 购物车项
interface CartItem {
  serviceId: string;
  quantity: number;
}

export default function SocialMediaPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [selectedServiceType, setSelectedServiceType] = useState<string>("all");
  const [selectedQuality, setSelectedQuality] = useState<string>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 筛选服务
  const filteredServices = useMemo(() => {
    return socialServices.filter((service) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !service.name.toLowerCase().includes(query) &&
          !service.description.toLowerCase().includes(query)
        ) {
          return false;
        }
      }
      if (selectedPlatform !== "all" && service.platform !== selectedPlatform) {
        return false;
      }
      if (selectedServiceType !== "all" && service.serviceType !== selectedServiceType) {
        return false;
      }
      if (selectedQuality !== "all" && service.quality !== selectedQuality) {
        return false;
      }
      return true;
    });
  }, [searchQuery, selectedPlatform, selectedServiceType, selectedQuality]);

  // 按平台分组
  const groupedServices = useMemo(() => {
    const groups: Record<SocialPlatform, SocialService[]> = {
      reddit: [],
      instagram: [],
      x: [],
    };
    filteredServices.forEach((service) => {
      groups[service.platform].push(service);
    });
    return groups;
  }, [filteredServices]);

  // 统计数据
  const stats = useMemo(() => {
    return {
      totalServices: socialServices.length,
      platforms: Object.keys(platformLabels).length,
      cartItems: cart.reduce((sum, item) => sum + item.quantity, 0),
      cartTotal: cart.reduce((sum, item) => {
        const service = socialServices.find((s) => s.id === item.serviceId);
        return sum + (service ? service.price * item.quantity : 0);
      }, 0),
    };
  }, [cart]);

  // 获取数量
  const getQuantity = (serviceId: string, minQuantity: number) => {
    return quantities[serviceId] || minQuantity;
  };

  // 更新数量
  const updateQuantity = (serviceId: string, value: number, min: number, max: number) => {
    const newValue = Math.max(min, Math.min(max, value));
    setQuantities((prev) => ({ ...prev, [serviceId]: newValue }));
  };

  // 添加到购物车
  const addToCart = (service: SocialService) => {
    const quantity = getQuantity(service.id, service.minQuantity);
    setCart((prev) => {
      const existing = prev.find((item) => item.serviceId === service.id);
      if (existing) {
        return prev.map((item) =>
          item.serviceId === service.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { serviceId: service.id, quantity }];
    });
  };

  // 从购物车移除
  const removeFromCart = (serviceId: string) => {
    setCart((prev) => prev.filter((item) => item.serviceId !== serviceId));
  };

  // 清空筛选
  const clearFilters = () => {
    setSelectedPlatform("all");
    setSelectedServiceType("all");
    setSelectedQuality("all");
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedPlatform !== "all" ||
    selectedServiceType !== "all" ||
    selectedQuality !== "all" ||
    searchQuery !== "";

  // 提交订单
  const handleSubmitOrder = async () => {
    if (cart.length === 0) return;
    setIsSubmitting(true);
    // 模拟提交
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    router.push("/dashboard/orders/create?type=social");
  };

  // 获取平台样式
  const getPlatformStyle = (platform: SocialPlatform) => {
    switch (platform) {
      case "reddit":
        return "bg-orange-500 text-white";
      case "instagram":
        return "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white";
      case "x":
        return "bg-black text-white";
      default:
        return "bg-muted";
    }
  };

  // 获取质量标签样式
  const getQualityStyle = (quality: string) => {
    switch (quality) {
      case "elite":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "premium":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold">社交媒体</h1>
        <p className="text-muted-foreground mt-1">
          提升社交媒体影响力，增加品牌曝光和用户互动
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{stats.totalServices}</div>
            <p className="text-sm text-muted-foreground">服务套餐</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{stats.platforms}</div>
            <p className="text-sm text-muted-foreground">覆盖平台</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">4</div>
            <p className="text-sm text-muted-foreground">服务类型</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">24h</div>
            <p className="text-sm text-muted-foreground">最快交付</p>
          </CardContent>
        </Card>
      </div>

      {/* 筛选条件 */}
      <div className="bg-card rounded-lg border divide-y">
        {/* 平台 */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 py-3 px-4">
          <button
            onClick={() => setSelectedPlatform("all")}
            className={`text-sm px-3 py-1 rounded transition-colors ${
              selectedPlatform === "all"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            全部平台
          </button>
          {Object.entries(platformLabels).map(([value, label]) => (
            <button
              key={value}
              onClick={() => setSelectedPlatform(value)}
              className={`text-sm transition-colors ${
                selectedPlatform === value
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 服务类型 */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 py-3 px-4">
          <button
            onClick={() => setSelectedServiceType("all")}
            className={`text-sm px-3 py-1 rounded transition-colors ${
              selectedServiceType === "all"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            全部类型
          </button>
          {Object.entries(serviceTypeLabels).map(([value, label]) => (
            <button
              key={value}
              onClick={() => setSelectedServiceType(value)}
              className={`text-sm transition-colors ${
                selectedServiceType === value
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 质量等级 */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 py-3 px-4">
          <button
            onClick={() => setSelectedQuality("all")}
            className={`text-sm px-3 py-1 rounded transition-colors ${
              selectedQuality === "all"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            全部等级
          </button>
          {Object.entries(qualityLabels).map(([value, label]) => (
            <button
              key={value}
              onClick={() => setSelectedQuality(value)}
              className={`text-sm transition-colors ${
                selectedQuality === value
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 其他 + 搜索 */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-3 px-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm px-3 py-1 rounded bg-primary text-primary-foreground">其他</span>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-muted-foreground hover:text-destructive transition-colors"
              >
                清除筛选
              </button>
            )}
          </div>
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索服务名称或描述..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-8"
            />
          </div>
        </div>
      </div>

      {/* 服务列表 */}
      <div className="space-y-8">
        {(["reddit", "instagram", "x"] as SocialPlatform[]).map((platform) => {
          const services = groupedServices[platform];
          if (services.length === 0) return null;

          return (
            <div key={platform} className="space-y-4">
              {/* 平台标题 */}
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded text-sm font-medium ${getPlatformStyle(platform)}`}>
                  {platformLabels[platform]}
                </span>
                <span className="text-sm text-muted-foreground">{services.length} 个服务</span>
              </div>

              {/* 服务卡片网格 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {services.map((service) => (
                  <Card key={service.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-4 space-y-3">
                      {/* 头部 */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">
                            {serviceTypeIcons[service.serviceType]}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {serviceTypeLabels[service.serviceType]}
                          </span>
                        </div>
                        <Badge variant="outline" className={getQualityStyle(service.quality)}>
                          {qualityLabels[service.quality]}
                        </Badge>
                      </div>

                      {/* 名称和描述 */}
                      <div>
                        <h3 className="font-medium text-sm">{service.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {service.description}
                        </p>
                      </div>

                      {/* 特性 */}
                      <div className="flex flex-wrap gap-1">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-muted px-1.5 py-0.5 rounded"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* 价格和交付 */}
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <span className="text-lg font-bold text-primary">${service.price}</span>
                          <span className="text-muted-foreground">/{service.unit}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{service.turnaround}</span>
                      </div>

                      {/* 数量和添加 */}
                      <div className="flex items-center gap-2 pt-2 border-t">
                        <div className="flex items-center border rounded">
                          <button
                            onClick={() =>
                              updateQuantity(
                                service.id,
                                getQuantity(service.id, service.minQuantity) - service.minQuantity,
                                service.minQuantity,
                                service.maxQuantity
                              )
                            }
                            className="p-1 hover:bg-muted"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <input
                            type="number"
                            value={getQuantity(service.id, service.minQuantity)}
                            onChange={(e) =>
                              updateQuantity(
                                service.id,
                                parseInt(e.target.value) || service.minQuantity,
                                service.minQuantity,
                                service.maxQuantity
                              )
                            }
                            className="w-12 text-center text-sm border-x py-1 bg-transparent"
                          />
                          <button
                            onClick={() =>
                              updateQuantity(
                                service.id,
                                getQuantity(service.id, service.minQuantity) + service.minQuantity,
                                service.minQuantity,
                                service.maxQuantity
                              )
                            }
                            className="p-1 hover:bg-muted"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <Button
                          size="sm"
                          className="flex-1 h-8"
                          onClick={() => addToCart(service)}
                        >
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          加入
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">没有找到符合条件的服务</p>
            <Button variant="link" onClick={clearFilters}>
              清除筛选条件
            </Button>
          </div>
        )}
      </div>

      {/* 购物车浮动栏 */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <Card className="shadow-lg border-primary">
            <CardContent className="p-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  <span className="font-medium">{cart.length} 个服务</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  共 {stats.cartItems} 项
                </div>
                <div className="font-bold text-lg">
                  ${stats.cartTotal.toLocaleString()}
                </div>
                <Button onClick={handleSubmitOrder} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      提交中...
                    </>
                  ) : (
                    <>
                      提交订单
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
                <button
                  onClick={() => setCart([])}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
