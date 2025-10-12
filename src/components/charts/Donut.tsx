import React from "react";

export default function DonutChart({ data, colors, size = 140, stroke = 14, center }: { data: { label: string; value: number }[]; colors?: string[]; size?: number; stroke?: number; center?: React.ReactNode; }) {
  const total = data.reduce((a, b) => a + b.value, 0) || 1;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div style={{ width: size, height: size }} className="relative">
      <svg viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
        {data.map((d, i) => {
          const frac = d.value / total;
          const dash = circumference * frac;
          const circle = (
            <circle
              key={i}
              cx={size/2}
              cy={size/2}
              r={radius}
              fill="none"
              stroke={colors?.[i % (colors?.length || 1)] || "#22c55e"}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
            />
          );
          offset += dash;
          return circle;
        })}
      </svg>
      <div className="absolute inset-0 grid place-items-center rotate-0">
        {center}
      </div>
    </div>
  );
}
