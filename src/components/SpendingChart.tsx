import React from "react";
import { SpendingData } from "@/types/finance";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface SpendingChartProps {
  data: SpendingData;
}

const SpendingChart: React.FC<SpendingChartProps> = ({ data }) => {
  if (!data.dailySpending || data.dailySpending.length === 0) {
    return null;
  }

  const chartData = data.dailySpending.map((item) => ({
    name: item.date,
    amount: item.amount,
  }));

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium mb-2">Spending Trend</h3>
      <div className="chart-container bg-background rounded-lg p-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => {
                // Show abbreviated day names
                const date = new Date(value);
                return date.toLocaleDateString(undefined, {
                  weekday: "short",
                });
              }}
            />
            <YAxis
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => {
                // Format currency values
                return `$${value}`;
              }}
            />
            <Tooltip
              formatter={formatter}
              labelFormatter={(label) => {
                const date = new Date(label);
                return date.toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                });
              }}
              contentStyle={{
                backgroundColor: "hsl(240 10% 3.9%)",
                border: "1px solid hsl(240 3.7% 15.9%)",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
              }}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="hsl(217.2 91.2% 59.8%)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const formatter = (value: any): string => {
  if (typeof value === 'number') {
    return `$${value}`;
  }
  return String(value);
};

export default SpendingChart;
