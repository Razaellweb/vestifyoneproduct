import React from "react";

export default function Sparkline({ data, color = "#22c55e", width = 120, height = 36 }: { data: number[]; color?: string; width?: number; height?: number; }) {
  const max = Math.max(...data, 1);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * (width - 8) + 4;
    const y = height - (v / max) * (height - 8) - 4;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} aria-label="sparkline">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" />
    </svg>
  );
}
