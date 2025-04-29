
import React, { useState } from "react";
import { ArrowLeft, LineChart, Circle } from "lucide-react";
import { TimePeriod } from "@/types/finance";
import { mockDataByPeriod } from "@/lib/mockData";
import SpendingOverview from "@/components/SpendingOverview";
import TimePeriodSelector from "@/components/TimePeriodSelector";
import CategoryBreakdown from "@/components/CategoryBreakdown";
import SpendingChart from "@/components/SpendingChart";
import BubbleChart from "@/components/BubbleChart";
import { cn } from "@/lib/utils";

// Chart type enum
type ChartType = "line" | "bubble";

const Index = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("1W");
  const [chartType, setChartType] = useState<ChartType>("line");
  const currentData = mockDataByPeriod[selectedPeriod];

  const handleTimePeriodChange = (period: TimePeriod) => {
    setSelectedPeriod(period);
  };

  const handleChartTypeChange = (type: ChartType) => {
    setChartType(type);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-md mx-auto p-4">
        <header className="flex items-center justify-between mb-6">
          <button className="p-2 rounded-full hover:bg-secondary/50">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex space-x-2">
            <button 
              className={cn(
                "p-2 rounded-full transition-colors", 
                chartType === "line" 
                  ? "bg-secondary text-foreground" 
                  : "hover:bg-secondary/50"
              )}
              onClick={() => handleChartTypeChange("line")}
              aria-label="Line Chart"
            >
              <LineChart className="w-5 h-5" />
            </button>
            <button 
              className={cn(
                "p-2 rounded-full transition-colors", 
                chartType === "bubble" 
                  ? "bg-secondary text-foreground" 
                  : "hover:bg-secondary/50"
              )}
              onClick={() => handleChartTypeChange("bubble")}
              aria-label="Bubble Chart"
            >
              <Circle className="w-5 h-5" />
            </button>
          </div>
        </header>

        <SpendingOverview data={currentData} />
        
        {currentData.dailySpending && currentData.dailySpending.length > 0 && (
          <>
            {chartType === "line" ? (
              <SpendingChart data={currentData} />
            ) : (
              <BubbleChart data={currentData} />
            )}
          </>
        )}

        <TimePeriodSelector
          selectedPeriod={selectedPeriod}
          onSelectPeriod={handleTimePeriodChange}
        />

        <CategoryBreakdown categories={currentData.categories} />
      </div>
    </div>
  );
};

export default Index;
