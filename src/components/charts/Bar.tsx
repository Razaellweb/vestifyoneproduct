import React from "react";

export default function BarChart({ data, colors, height = 140, className = "" }: { data: { label: string; value: number }[]; colors?: string[]; height?: number; className?: string; }) {
  const width = 400;
  const max = Math.max(...data.map(d => d.value), 1);
  const barW = (width - 24) / data.length;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} role="img" aria-label="Bar chart">
      {data.map((d, i) => {
        const h = (d.value / max) * (height - 24);
        const x = 12 + i * barW + 4;
        const y = height - 12 - h;
        const color = colors?.[i % (colors?.length || 1)] || "#22c55e";
        return <rect key={i} x={x} y={y} width={barW - 8} height={h} rx={6} fill={color} />
      })}
    </svg>
  );
}
