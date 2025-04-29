
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
    
    // Extract the color name for direct CSS variable usage
    const colorPart = category.color.split('-')[1]?.toLowerCase();
    const color = colorPart ? `var(--finance-${colorPart})` : "#FF5AAF";
    
    bubbleData.push({
      x,
      y,
      z: Math.max(category.percentage * 5, 20), // Size based on percentage, minimum size of 20
      name: category.name,
      color,
      percentage: category.percentage
    });
  });

  // If no categories, show a placeholder bubble
  if (bubbleData.length === 0) {
    bubbleData.push({
      x: 50,
      y: 50,
      z: 30,
      name: "No spending data",
      color: "#666",
      percentage: 0
    });
  }

  return (
    <div className="chart-container mb-4" style={{ height: "250px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          {/* Invisible axes for positioning */}
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
          <Scatter data={bubbleData}>
            {bubbleData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                fillOpacity={0.7}
                stroke={entry.color}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BubbleChart;
