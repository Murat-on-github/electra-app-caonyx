
import React, { useEffect, useRef } from "react";
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
  amount: number;
}

const BubbleChart: React.FC<BubbleChartProps> = ({ data }) => {
  const isFirstRender = useRef(true);
  
  useEffect(() => {
    isFirstRender.current = false;
    console.log("BubbleChart data:", data);
    console.log("Categories:", data.categories);
  }, [data]);

  // Transform the category data into a format suitable for the bubble chart
  const bubbleData: BubbleData[] = [];
  
  // Place bubbles in different positions based on a simple algorithm
  const numCategories = data.categories.length;
  const angleStep = (Math.PI * 2) / numCategories;
  
  data.categories.forEach((category, index) => {
    // Calculate position in a circular layout
    const angle = angleStep * index;
    const radius = 30 + Math.random() * 15; // Vary the distance from center
    const x = Math.cos(angle) * radius + 50; // Center at x=50
    const y = Math.sin(angle) * radius + 50; // Center at y=50
    
    // Extract the color name for direct CSS variable usage
    let color;
    if (category.color === "finance-pink") color = "#FF5AAF";
    else if (category.color === "finance-blue") color = "#3B82F6";
    else if (category.color === "finance-green") color = "#10B981";
    else if (category.color === "finance-yellow") color = "#F59E0B";
    else color = "#FF5AAF"; // Default fallback
    
    bubbleData.push({
      x,
      y,
      z: Math.max(category.percentage * 160, 400), // Massively increased scaling factor and minimum size
      name: category.name,
      color,
      percentage: category.percentage,
      amount: category.amount
    });
  });

  // If no categories, show a placeholder bubble
  if (bubbleData.length === 0) {
    bubbleData.push({
      x: 50,
      y: 50,
      z: 400, // Significantly increased placeholder bubble size
      name: "No spending data",
      color: "#666",
      percentage: 0,
      amount: 0
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
          <ZAxis type="number" dataKey="z" range={[1000, 12000]} /> {/* Dramatically increased range for extremely large bubbles */}
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-secondary/80 p-2 rounded-md shadow-md border border-border/50">
                    <p className="font-medium text-sm">{data.name}</p>
                    <p className="text-xs">€{data.amount.toLocaleString()}</p>
                    <p className="text-xs">{data.percentage}%</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Scatter data={bubbleData} animationDuration={isFirstRender.current ? 0 : 1000}>
            {bubbleData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                fillOpacity={0.8}
                stroke={entry.color}
                strokeWidth={1}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BubbleChart;
