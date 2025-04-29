
import React, { useEffect, useRef } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SpendingData } from "../types/finance";

interface SpendingChartProps {
  data: SpendingData;
}

const SpendingChart: React.FC<SpendingChartProps> = ({ data }) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  if (!data.dailySpending) return null;

  // Function to format large numbers with K for thousands
  const formatYAxis = (value: any) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };

  return (
    <div className="chart-container mb-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data.dailySpending}
          margin={{
            top: 5,
            right: 5,
            left: 0,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF5AAF" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FF5AAF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#8E8E93", fontSize: 10 }}
          />
          <YAxis
            tickFormatter={formatYAxis}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#8E8E93", fontSize: 10 }}
            width={30}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F1F1F",
              border: "none",
              borderRadius: "8px",
              color: "white",
            }}
            formatter={(value: number) => [`€${value}`, "Spent"]}
            labelFormatter={(value) => `${value}`}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#FF5AAF"
            strokeWidth={2}
            fill="url(#colorSpending)"
            animationDuration={isFirstRender.current ? 0 : 1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingChart;
