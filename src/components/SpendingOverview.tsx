
import React from "react";
import { SpendingData } from "../types/finance";

interface SpendingOverviewProps {
  data: SpendingData;
}

const SpendingOverview: React.FC<SpendingOverviewProps> = ({ data }) => {
  // Calculate total percentage covered by categories for the progress ring
  const totalPercentage = Math.min(
    data.categories.reduce((total, category) => total + category.percentage, 0),
    100
  );

  const getPreviousPeriodChangeColor = () => {
    if (!data.previousPeriodChange) return "text-muted-foreground";
    return data.previousPeriodChange.isIncrease
      ? "text-finance-green"
      : "text-finance-pink";
  };

  // Create segments for the circular progress
  const createCircleSegments = () => {
    const segments = [];
    let startAngle = 0;
    
    data.categories.forEach((category, index) => {
      const segmentLength = (category.percentage / 100) * 100;
      
      segments.push(
        <circle
          key={category.id}
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke={`theme('colors.${category.color}')`}
          strokeWidth="8"
          strokeLinecap="round"
          className="circle-progress"
          strokeDasharray={`${segmentLength} ${100 - segmentLength}`}
          strokeDashoffset={-(startAngle * 100 / 100)}
          style={{
            stroke: `var(--tw-colors-${category.color.split('-')[1].toLowerCase()})`,
          }}
        />
      );
      
      startAngle += category.percentage / 100;
    });
    
    return segments;
  };

  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <div className="relative w-48 h-48 mb-2">
        {/* Gray background circle */}
        <svg className="w-full h-full progress-circle" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#333"
            strokeWidth="8"
          />
          {/* Colored segments */}
          {createCircleSegments()}
        </svg>
        
        {/* Text in the middle */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
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
