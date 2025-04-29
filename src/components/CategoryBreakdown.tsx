import React from "react";
import { ExpenseCategory } from "../types/finance";
import { cn } from "@/lib/utils";
import { ResponsiveContainer, ScatterChart, Scatter, Tooltip, Cell } from "recharts";

interface CategoryBreakdownProps {
  categories: ExpenseCategory[];
}

const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({ categories }) => {
  // Transform categories into bubble chart data
  const bubbleData = categories.map(cat => ({
    name: cat.name,
    value: cat.amount,
    icon: cat.icon,
    color: cat.color,
    transactions: cat.transactions,
    percentage: cat.percentage,
    x: Math.random() * 100, // Random positioning for x
    y: Math.random() * 100, // Random positioning for y
    z: cat.amount / 100,    // Size based on amount
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border p-2 rounded-md shadow-md">
          <div className="flex items-center gap-2">
            <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", `bg-${data.color}`)}>
              <span>{data.icon}</span>
            </div>
            <span className="font-medium">{data.name}</span>
          </div>
          <div className="mt-1 text-sm">
            <p>€{data.value.toLocaleString()}</p>
            <p>{data.percentage}% of spending</p>
            <p>{data.transactions} transaction{data.transactions !== 1 ? 's' : ''}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-sm font-medium">By Category</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <button className="text-sm text-finance-blue">Manage</button>
      </div>

      <div className="w-full h-[250px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <Tooltip content={<CustomTooltip />} />
            <Scatter data={bubbleData} shape="circle">
              {bubbleData.map((entry, index) => {
                let color;
                switch (entry.color) {
                  case 'finance-blue':
                    color = '#3b82f6';
                    break;
                  case 'finance-pink':
                    color = '#FF5AAF';
                    break;
                  case 'finance-green':
                    color = '#22c55e';
                    break;
                  case 'finance-yellow':
                    color = '#eab308';
                    break;
                  default:
                    color = '#9b87f5';
                }

                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={color}
                    fillOpacity={0.7}
                    stroke={color}
                    strokeWidth={1}
                  />
                );
              })}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Keep the list view as a fallback/addition */}
      <div className="space-y-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between py-2"
          >
            <div className="flex items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-lg mr-3",
                  `bg-${category.color}`
                )}
              >
                <span className="text-sm">{category.icon}</span>
              </div>
              <div>
                <p className="font-medium text-sm">{category.name}</p>
                <p className="text-xs text-muted-foreground">
                  {category.transactions} transaction
                  {category.transactions !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-sm">-€{category.amount.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{category.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBreakdown;
