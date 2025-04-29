
import React from "react";
import { SpendingData } from "../types/finance";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, ZAxis } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
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

  // Transform categories to bubble chart data format with fixed coordinates
  const bubbleData = data.categories.map((category, index) => {
    // Create a grid layout for bubbles
    const rows = Math.ceil(Math.sqrt(data.categories.length));
    const col = index % rows;
    const row = Math.floor(index / rows);
    
    // Calculate positions based on grid
    const x = (col * 25) + 25; // Spread across x-axis
    const y = (row * 25) + 25; // Spread across y-axis
    
    return {
      x: x,
      y: y,
      z: category.amount / 200, // Scale down amount for appropriate bubble size
      name: category.name,
      color: category.color,
      icon: category.icon,
      amount: category.amount,
      percentage: category.percentage,
      transactions: category.transactions,
    };
  });

  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <div className="relative w-full h-48 mb-2">
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 10, bottom: 60, left: 10 }}>
              {/* Fixed domain for consistent positioning */}
              <XAxis type="number" dataKey="x" domain={[0, 100]} hide />
              <YAxis type="number" dataKey="y" domain={[0, 100]} hide />
              <ZAxis type="number" dataKey="z" range={[30, 60]} /> {/* Control bubble size */}
              
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-md">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full bg-${data.color.split('-')[1]?.toLowerCase()}`}></div>
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
                  name={category.name}
                  data={bubbleData.filter(item => item.name === category.name)}
                  fill={`var(--finance-${category.color.split('-')[1]?.toLowerCase()}`}
                  fillOpacity={0.8}
                >
                  {bubbleData
                    .filter(item => item.name === category.name)
                    .map((entry, index) => {
                      const categoryColor = category.color.split('-')[1]?.toLowerCase();
                      // Apply direct color values instead of CSS variables for better compatibility
                      const fillColor = categoryColor === 'blue' ? '#1EAEDB' : 
                                        categoryColor === 'green' ? '#2ecc71' :
                                        categoryColor === 'pink' ? '#D946EF' :
                                        categoryColor === 'purple' ? '#9b87f5' :
                                        categoryColor === 'orange' ? '#F97316' : '#33C3F0';
                      
                      return (
                        <circle
                          key={`${category.id}-${index}`}
                          cx={entry.x}
                          cy={entry.y}
                          r={entry.z}
                          fill={fillColor}
                          stroke={fillColor}
                          strokeWidth={1}
                          className="cursor-pointer"
                        >
                        </circle>
                      );
                    })}
                </Scatter>
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        
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
