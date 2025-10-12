import React from "react";

export default function AreaChart({ data, stroke = "#22c55e", height = 140, className = "", id = "area" }: { data: { label: string; value: number }[]; stroke?: string; height?: number; className?: string; id?: string; }) {
  const width = 400; // responsive wrapper should handle sizing
  const max = Math.max(...data.map(d => d.value), 1);
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * (width - 24) + 12;
    const y = height - (d.value / max) * (height - 24) - 12;
    return `${x},${y}`;
  }).join(" ");

  const path = `M12,${height-12} L ${points} L ${width-12},${height-12} Z`;
  const fill = `url(#${id}-grad)`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} role="img" aria-label="Area chart">
      <defs>
        <linearGradient id={`${id}-grad`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.4" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={path} fill={fill} stroke="none" />
      <polyline points={points} fill="none" stroke={stroke} strokeWidth="2" />
    </svg>
  );
}
