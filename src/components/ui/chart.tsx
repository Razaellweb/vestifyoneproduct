"use client";
import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";

const THEMES = { light: "", dark: ".dark" } as const;
export type ChartConfig = { [k in string]: { label?: React.ReactNode; icon?: React.ComponentType } & ({ color?: string; theme?: never } | { color?: never; theme: Record<keyof typeof THEMES, string> }) };

type ChartContextProps = { config: ChartConfig };
const ChartContext = React.createContext<ChartContextProps | null>(null);
function useChart() { const context = React.useContext(ChartContext); if (!context) { throw new Error("useChart must be used within a <ChartContainer />"); } return context; }

function ChartContainer({ id, className, children, config, ...props }: React.ComponentProps<"div"> & { config: ChartConfig; children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"] }) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;
  return (
    <ChartContext.Provider value={{ config }}>
      <div data-slot="chart" data-chart={chartId} className={cn("[&_.recharts-cartesian-axis-tick_text]:fill-[var(--muted)] [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-[var(--border)]/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-[var(--border)] [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-[var(--border)] [&_.recharts-radial-bar-background-sector]:fill-[var(--muted)] [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-[var(--muted)] [&_.recharts-reference-line_[stroke='#ccc']]:stroke-[var(--border)] flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden", className)} {...props}>
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([, c]) => c.theme || c.color);
  if (!colorConfig.length) return null;
  return (
    <style dangerouslySetInnerHTML={{ __html: Object.entries(THEMES).map(([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, itemConfig]) => { const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color; return color ? `  --color-${key}: ${color};` : null; }).join("\n")}
}
`).join("\n") }} />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;
function ChartTooltipContent({ active, payload, className, indicator = "dot", hideLabel = false, hideIndicator = false, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey, ...rest }: React.ComponentProps<typeof RechartsPrimitive.Tooltip> & React.ComponentProps<"div"> & { hideLabel?: boolean; hideIndicator?: boolean; indicator?: "line" | "dot" | "dashed"; nameKey?: string; labelKey?: string }) {
  const { config } = useChart();
  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) return null;
    const [item] = payload;
    const key = `${labelKey || (item as any)?.dataKey || (item as any)?.name || "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item as any, key);
    const value = !labelKey && typeof label === "string" ? (config as any)[label as any]?.label || label : itemConfig?.label;
    if (labelFormatter) { return (<div className={cn("font-medium", labelClassName)}>{labelFormatter(value, payload)}</div>); }
    if (!value) return null;
    return <div className={cn("font-medium", labelClassName)}>{value}</div>;
  }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);
  if (!active || !payload?.length) return null;
  const nestLabel = payload.length === 1 && indicator !== "dot";
  return (
    <div className={cn("border border-[var(--border)]/50 bg-[var(--card)] grid min-w-[8rem] items-start gap-1.5 rounded-lg px-2.5 py-1.5 text-xs shadow-xl", className)} {...rest}>
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey || (item as any).name || (item as any).dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item as any, key);
          const indicatorColor = color || (item as any).payload.fill || (item as any).color;          
          return (
            <div key={(item as any).dataKey} className={cn("[&>svg]:text-[var(--muted)] flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5", indicator === "dot" && "items-center")}>              
              {formatter && (item as any)?.value !== undefined && (item as any).name ? (
                formatter((item as any).value, (item as any).name, item as any, index, (item as any).payload)
              ) : (
                <>
                  {!hideIndicator && (<div className={cn("shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)", { "h-2.5 w-2.5": indicator === "dot", "w-1": indicator === "line", "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed", "my-0.5": nestLabel && indicator === "dashed", })} style={{ "--color-bg": indicatorColor as any, "--color-border": indicatorColor as any } as React.CSSProperties} />)}
                  <div className={cn("flex flex-1 justify-between leading-none", nestLabel ? "items-end" : "items-center")}>                    
                    <div className="grid gap-1.5">
                      {nestLabel ? tooltipLabel : null}
                      <span className="text-[var(--muted)]">{itemConfig?.label || (item as any).name}</span>
                    </div>
                    {(item as any).value && (<span className="text-[var(--fg)] font-mono font-medium tabular-nums">{Number((item as any).value).toLocaleString()}</span>)}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const ChartLegend = RechartsPrimitive.Legend;
function ChartLegendContent({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey, ...rest }: React.ComponentProps<"div"> & Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & { hideIcon?: boolean; nameKey?: string }) {
  const { config } = useChart();
  if (!payload?.length) return null;
  return (
    <div className={cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className)} {...rest}>
      {payload.map((item) => {
        const key = `${nameKey || (item as any).dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item as any, key);
        return (
          <div key={(item as any).value} className={cn("[&>svg]:text-[var(--muted)] flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3")}>            
            {!hideIcon ? (<div className="h-2 w-2 shrink-0 rounded-[2px]" style={{ backgroundColor: (item as any).color }} />) : null}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
}

function getPayloadConfigFromPayload(config: ChartConfig, payload: any, key: string) {
  if (typeof payload !== "object" || payload === null) return undefined;
  const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : undefined;
  let configLabelKey: string = key;
  if (key in payload && typeof (payload as any)[key] === "string") { configLabelKey = (payload as any)[key] as string; }
  else if (payloadPayload && key in payloadPayload && typeof (payloadPayload as any)[key] === "string") { configLabelKey = (payloadPayload as any)[key] as string; }
  return configLabelKey in config ? (config as any)[configLabelKey] : (config as any)[key as any];
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle };
