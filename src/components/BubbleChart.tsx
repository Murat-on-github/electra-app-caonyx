
import React, { useEffect, useRef } from "react";
import {
  ScatterChart,
  Scatter,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ZAxis
} from "recharts";
import { SpendingData } from "@/types/finance";

interface BubbleChartProps {
  data: SpendingData;
}

const BubbleChart: React.FC<BubbleChartProps> = ({ data }) => {
  const isFirstRender = useRef(true);
  
  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  if (!data.dailySpending) return null;
  
  // Transform daily spending data into bubble chart format
  const bubbleData = data.dailySpending.map((day, index) => ({
    x: index,
    y: day.amount,
    z: day.amount > 0 ? Math.max(10, day.amount / 100) : 0, // Size based on amount
    name: day.date,
    amount: day.amount
  }));
  
  // Generate colors based on the amount - higher amounts are more vibrant
  const getColor = (amount: number) => {
    const maxAmount = Math.max(...data.dailySpending!.map(d => d.amount));
    const intensity = Math.min(1, amount / maxAmount);
    return `rgb(255, ${90 - intensity * 30}, ${175 - intensity * 100})`;
  };

  const formatXAxis = (value: number) => {
    if (data.dailySpending && value >= 0 && value < data.dailySpending.length) {
      return data.dailySpending[value].date;
    }
    return '';
  };

  const formatYAxis = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };

  return (
    <div className="mb-6" style={{ height: "200px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <XAxis 
            dataKey="x" 
            name="Day" 
            tickFormatter={formatXAxis}
            type="number"
            domain={[0, data.dailySpending.length - 1]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#8E8E93", fontSize: 10 }}
          />
          <YAxis 
            dataKey="y" 
            name="Amount" 
            tickFormatter={formatYAxis}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#8E8E93", fontSize: 10 }}
          />
          <ZAxis dataKey="z" range={[20, 80]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F1F1F",
              border: "none",
              borderRadius: "8px",
              color: "white",
            }}
            formatter={(value: any, name: string) => {
              if (name === "Amount") {
                return [`€${value}`, "Spent"];
              }
              return [value, name];
            }}
            labelFormatter={(value) => {
              if (typeof value === 'number' && data.dailySpending && value >= 0 && value < data.dailySpending.length) {
                return data.dailySpending[value].date;
              }
              return value;
            }}
          />
          <Scatter 
            name="Spending" 
            data={bubbleData} 
            fill="#FF5AAF"
            animationDuration={isFirstRender.current ? 0 : 1000}
          >
            {bubbleData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={getColor(entry.amount)}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BubbleChart;
