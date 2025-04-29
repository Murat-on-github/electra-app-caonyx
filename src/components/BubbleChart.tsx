
import React from "react";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { SpendingData } from "../types/finance";

interface BubbleChartProps {
  data: SpendingData;
}

interface BubbleData {
  x: number;
  y: number;
  z: number;
  name: string;
  color: string;
  percentage: number;
}

const BubbleChart: React.FC<BubbleChartProps> = ({ data }) => {
  // Transform the category data into a format suitable for the bubble chart
  const bubbleData: BubbleData[] = [];
  
  // Place bubbles in different positions based on a simple algorithm
  const numCategories = data.categories.length;
  const angleStep = (Math.PI * 2) / numCategories;
  
  data.categories.forEach((category, index) => {
    // Calculate position in a circular layout
    const angle = angleStep * index;
    const radius = 40 + Math.random() * 20; // Vary the distance from center
    const x = Math.cos(angle) * radius + 50; // Center at x=50
    const y = Math.sin(angle) * radius + 50; // Center at y=50
    
    bubbleData.push({
      x,
      y,
      z: category.percentage * 5, // Size based on percentage
      name: category.name,
      color: `var(--tw-colors-${category.color.split('-')[1].toLowerCase()})`,
      percentage: category.percentage
    });
  });

  return (
    <div className="chart-container mb-4">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
        >
          {/* Empty axes for positioning */}
          <XAxis type="number" dataKey="x" domain={[0, 100]} hide />
          <YAxis type="number" dataKey="y" domain={[0, 100]} hide />
          <ZAxis type="number" dataKey="z" range={[50, 400]} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-secondary/80 p-2 rounded-md shadow-md border border-border/50">
                    <p className="font-medium text-sm">{data.name}</p>
                    <p className="text-xs">{data.percentage}%</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Scatter data={bubbleData} fill="#8884d8">
            {bubbleData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke={entry.color}
                strokeWidth={2}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BubbleChart;
