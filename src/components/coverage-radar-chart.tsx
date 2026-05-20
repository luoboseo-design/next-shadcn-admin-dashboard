"use client";

import dynamic from "next/dynamic";

// 动态导入 Radar 组件，禁用 SSR
const Radar = dynamic(
  () => import("@ant-design/plots").then((mod) => mod.Radar),
  { ssr: false }
);

interface RadarDataItem {
  dimension: string;
  value: number;
}

interface CoverageRadarChartProps {
  data: RadarDataItem[];
}

export function CoverageRadarChart({ data }: CoverageRadarChartProps) {
  // 转换数据格式为 ant-design/plots 需要的格式
  const chartData = data.flatMap((item) => [
    { item: item.dimension, type: "优化前", score: Math.max(item.value - 35, 15) },
    { item: item.dimension, type: "优化后", score: item.value },
  ]);

  const config = {
    data: chartData,
    xField: "item",
    yField: "score",
    colorField: "type",
    shapeField: "smooth",
    area: {
      style: {
        fillOpacity: 0.4,
      },
    },
    scale: {
      x: { padding: 0.5, align: 0 },
      y: { tickCount: 5, domainMax: 100 },
    },
    axis: {
      x: {
        grid: true,
        gridLineWidth: 1,
        tick: false,
        gridLineDash: [0, 0],
        line: false,
        labelFontSize: 11,
      },
      y: {
        zIndex: 1,
        title: false,
        gridConnect: "line",
        gridLineWidth: 1,
        gridLineDash: [0, 0],
        label: false,
      },
    },
    style: {
      lineWidth: 2,
    },
    point: {
      shapeField: "point",
      sizeField: 3,
    },
    color: ["#d1d5db", "#2563eb"],
    legend: {
      position: "bottom",
      itemName: {
        style: {
          fontSize: 11,
        },
      },
    },
  };

  return <Radar {...config} />;
}
