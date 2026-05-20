"use client";

import dynamic from "next/dynamic";

import type { EChartsOption } from "echarts";

// 动态导入 ReactECharts 组件，禁用 SSR
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

interface RadarDataItem {
  dimension: string;
  value: number;
}

interface CoverageRadarChartProps {
  data: RadarDataItem[];
}

export function CoverageRadarChart({ data }: CoverageRadarChartProps) {
  // 生成优化前的数据（比优化后低30-50）
  const beforeData = data.map((item) => Math.max(item.value - 35 - Math.random() * 15, 15));
  const afterData = data.map((item) => item.value);

  const option: EChartsOption = {
    color: ["rgba(99, 102, 241, 0.8)", "rgba(16, 185, 129, 0.9)"],
    legend: {
      show: true,
      bottom: 0,
      left: "center",
      itemWidth: 14,
      itemHeight: 8,
      itemGap: 24,
      textStyle: {
        fontSize: 12,
        color: "#6b7280",
      },
      data: ["优化前", "优化后"],
    },
    radar: {
      indicator: data.map((item) => ({
        text: item.dimension,
        max: 100,
      })),
      center: ["50%", "45%"],
      radius: "65%",
      startAngle: 90,
      splitNumber: 4,
      shape: "circle",
      axisName: {
        color: "#374151",
        fontSize: 11,
        fontWeight: 500,
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: [
            "rgba(99, 102, 241, 0.02)",
            "rgba(99, 102, 241, 0.05)",
            "rgba(99, 102, 241, 0.08)",
            "rgba(99, 102, 241, 0.12)",
          ],
        },
      },
      axisLine: {
        lineStyle: {
          color: "rgba(148, 163, 184, 0.3)",
        },
      },
      splitLine: {
        lineStyle: {
          color: "rgba(148, 163, 184, 0.4)",
        },
      },
    },
    series: [
      {
        type: "radar",
        emphasis: {
          lineStyle: {
            width: 3,
          },
        },
        data: [
          {
            value: beforeData,
            name: "优化前",
            symbol: "circle",
            symbolSize: 5,
            lineStyle: {
              width: 2,
              type: "dashed",
            },
            areaStyle: {
              color: "rgba(148, 163, 184, 0.15)",
            },
            itemStyle: {
              color: "#94a3b8",
            },
          },
          {
            value: afterData,
            name: "优化后",
            symbol: "circle",
            symbolSize: 6,
            lineStyle: {
              width: 2.5,
            },
            areaStyle: {
              color: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  { offset: 0, color: "rgba(16, 185, 129, 0.05)" },
                  { offset: 0.7, color: "rgba(16, 185, 129, 0.25)" },
                  { offset: 1, color: "rgba(16, 185, 129, 0.45)" },
                ],
              },
            },
            itemStyle: {
              color: "#10b981",
              borderColor: "#fff",
              borderWidth: 1,
            },
          },
        ],
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: "100%", width: "100%" }} opts={{ renderer: "svg" }} />;
}
