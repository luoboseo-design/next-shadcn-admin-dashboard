"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { mockPlatforms, platformTypeLabels, getPlatformsByType } from "@/data/mock-platforms";
import type { PlatformType } from "@/types/marketing";

export function PlatformStats() {
  const platformTypes: PlatformType[] = ["blog", "forum", "news", "social", "directory", "wiki"];

  // 计算统计数据
  const totalPlatforms = mockPlatforms.length;
  const avgDA = Math.round(
    mockPlatforms.reduce((sum, p) => sum + p.domainAuthority, 0) / totalPlatforms
  );
  const dofollowCount = mockPlatforms.filter((p) => p.acceptsDofollow).length;

  return (
    <div className="space-y-6">
      {/* 总览统计 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-primary">{totalPlatforms}</div>
            <div className="text-sm text-muted-foreground">可用平台</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-primary">{avgDA}</div>
            <div className="text-sm text-muted-foreground">平均 DA</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-primary">
              {Math.round((dofollowCount / totalPlatforms) * 100)}%
            </div>
            <div className="text-sm text-muted-foreground">Dofollow 比例</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-primary">6</div>
            <div className="text-sm text-muted-foreground">平台类型</div>
          </CardContent>
        </Card>
      </div>

      {/* 按类型统计 */}
      <Card>
        <CardHeader>
          <CardTitle>平台类型分布</CardTitle>
          <CardDescription>
            我们整合了 {totalPlatforms} 个高质量平台，覆盖多种类型
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {platformTypes.map((type) => {
              const platforms = getPlatformsByType(type);
              const count = platforms.length;
              const percentage = Math.round((count / totalPlatforms) * 100);
              const typeAvgDA = Math.round(
                platforms.reduce((sum, p) => sum + p.domainAuthority, 0) / count
              );

              return (
                <div key={type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{platformTypeLabels[type]}</span>
                      <Badge variant="secondary">{count} 个</Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      平均 DA: {typeAvgDA}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 热门平台示例 */}
      <Card>
        <CardHeader>
          <CardTitle>部分合作平台</CardTitle>
          <CardDescription>展示部分高质量合作平台</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {mockPlatforms.slice(0, 18).map((platform) => (
              <div
                key={platform.id}
                className="p-3 rounded-lg border bg-muted/30 text-center"
              >
                <div className="font-medium text-sm truncate" title={platform.name}>
                  {platform.name}
                </div>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    DA {platform.domainAuthority}
                  </Badge>
                  {platform.acceptsDofollow && (
                    <Badge variant="secondary" className="text-xs">
                      Dofollow
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            还有 {totalPlatforms - 18} 个平台...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
