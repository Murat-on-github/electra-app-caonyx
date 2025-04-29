
import React from "react";
import { SpendingData } from "../types/finance";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, ZAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { cn } from "@/lib/utils";

interface SpendingOverviewProps {
  data: SpendingData;
}

const SpendingOverview: React.FC<SpendingOverviewProps> = ({ data }) => {
  const getPreviousPeriodChangeColor = () => {
    if (!data.previousPeriodChange) return "text-muted-foreground";
    return data.previousPeriodChange.isIncrease
      ? "text-finance-green"
      : "text-finance-pink";
  };

  // Transform categories to bubble chart data format
  const bubbleData = data.categories.map((category, index) => {
    // Using index and category percentage to position bubbles
    // in a spaced-out formation
    const angle = (index / data.categories.length) * Math.PI * 2;
    const radius = category.percentage / 3;
    
    return {
      x: Math.cos(angle) * radius + 50, // Center at 50
      y: Math.sin(angle) * radius + 50, // Center at 50
      z: category.amount, // Bubble size based on amount
      name: category.name,
      color: category.color,
      icon: category.icon,
      amount: category.amount,
      percentage: category.percentage,
      transactions: category.transactions,
    };
  });

  // Create the config for chart colors
  const chartConfig = data.categories.reduce((config, category) => {
    return {
      ...config,
      [category.id]: {
        label: category.name,
        color: `var(--tw-colors-${category.color.split('-')[1]?.toLowerCase()})`,
      }
    };
  }, {});

  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <div className="relative w-full h-48 mb-2">
        <ChartContainer className="w-full h-full" config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              {/* Hide axes for cleaner look */}
              <XAxis type="number" dataKey="x" domain={[0, 100]} hide />
              <YAxis type="number" dataKey="y" domain={[0, 100]} hide />
              <ZAxis type="number" dataKey="z" range={[400, 2000]} />
              
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-md">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-4 h-4 rounded-full",
                            `bg-${data.color}`
                          )}></div>
                          <span className="font-medium">{data.name}</span>
                        </div>
                        <div className="mt-1 text-sm">
                          <div>€{data.amount.toLocaleString()}</div>
                          <div>{data.percentage}% of spending</div>
                          <div>{data.transactions} transaction{data.transactions !== 1 ? 's' : ''}</div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              
              {data.categories.map((category) => (
                <Scatter
                  key={category.id}
                  name={category.id}
                  data={bubbleData.filter(item => item.name === category.name)}
                  fill={`var(--tw-colors-${category.color.split('-')[1]?.toLowerCase()})`}
                  shape={(props) => {
                    const { cx, cy, r } = props;
                    const category = props.payload;
                    return (
                      <g>
                        <circle 
                          cx={cx} 
                          cy={cy} 
                          r={r} 
                          fill={`var(--tw-colors-${category.color.split('-')[1]?.toLowerCase()})`}
                          fillOpacity={0.8}
                          stroke={`var(--tw-colors-${category.color.split('-')[1]?.toLowerCase()})`}
                        />
                        <text 
                          x={cx} 
                          y={cy} 
                          textAnchor="middle" 
                          dominantBaseline="middle"
                          className="text-sm fill-background"
                        >
                          {category.icon}
                        </text>
                      </g>
                    );
                  }}
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
        
        {/* Text information overlay */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center p-2 bg-background/80 backdrop-blur-sm rounded-md">
          <p className="text-xs text-muted-foreground">Spent</p>
          <h1 className="text-3xl font-bold">€{data.totalSpent.toLocaleString()}</h1>
          <p className="text-xs text-muted-foreground mt-1">{data.timeFrame}</p>
          {data.previousPeriodChange && (
            <p className={`text-xs mt-1 ${getPreviousPeriodChangeColor()}`}>
              {data.previousPeriodChange.isIncrease ? "+" : "-"}€
              {data.previousPeriodChange.amount} · {data.timeFrame}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpendingOverview;
