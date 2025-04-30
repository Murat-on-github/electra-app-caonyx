import React from "react";
import { SpendingData } from "../types/finance";
import { cn } from "@/lib/utils";
interface SpendingOverviewProps {
  data: SpendingData;
}
const SpendingOverview: React.FC<SpendingOverviewProps> = ({
  data
}) => {
  // Calculate total percentage covered by categories for the progress indicators
  const totalPercentage = Math.min(data.categories.reduce((total, category) => total + category.percentage, 0), 100);
  const getPreviousPeriodChangeColor = () => {
    if (!data.previousPeriodChange) return "text-muted-foreground";
    return data.previousPeriodChange.isIncrease ? "text-finance-green" : "text-finance-pink";
  };

  // Helper function to get the actual color based on the color string
  const getCategoryColor = (colorString: string) => {
    const colorName = colorString.split('-')[1]?.toLowerCase();
    return colorName ? `bg-finance-${colorName}` : "bg-gray-500";
  };
  return <div className="mb-6 bg-secondary/30 rounded-lg p-4">
      <div className="flex items-center justify-between">
        {/* Left section - Total spent */}
        <div className="flex flex-col">
          <p className="text-xs text-muted-foreground">Consumption</p>
          <h2 className="text-2xl font-bold">€{data.totalSpent.toLocaleString()}</h2>
          <p className="text-xs text-muted-foreground">{data.timeFrame}</p>
        </div>

        {/* Middle section - Previous period change */}
        {data.previousPeriodChange && <div className="flex flex-col items-center">
            <p className={`text-sm ${getPreviousPeriodChangeColor()}`}>
              {data.previousPeriodChange.isIncrease ? "+" : "-"}€
              {data.previousPeriodChange.amount.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">vs previous</p>
          </div>}

        {/* Right section - Category indicators */}
        <div className="flex items-center space-x-1">
          {data.categories.slice(0, 3).map(category => <div key={category.id} className="flex flex-col items-center">
              <div className={cn("w-3 h-3 rounded-full mb-1", getCategoryColor(category.color))}></div>
              <p className="text-[10px] text-muted-foreground">{category.percentage}%</p>
            </div>)}
          {data.categories.length > 3 && <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full mb-1 bg-muted"></div>
              <p className="text-[10px] text-muted-foreground">+{data.categories.length - 3}</p>
            </div>}
        </div>
      </div>
    </div>;
};
export default SpendingOverview;