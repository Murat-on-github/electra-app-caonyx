
import React, { useState } from "react";
import { ArrowLeft, LineChart, Circle } from "lucide-react";
import { TimePeriod } from "@/types/finance";
import { mockDataByPeriod } from "@/lib/mockData";
import SpendingOverview from "@/components/SpendingOverview";
import TimePeriodSelector from "@/components/TimePeriodSelector";
import CategoryBreakdown from "@/components/CategoryBreakdown";
import SpendingChart from "@/components/SpendingChart";
import BubbleChart from "@/components/BubbleChart";
import UnitSwitch from "@/components/UnitSwitch";
import { cn } from "@/lib/utils";

// Chart type enum
type ChartType = "line" | "bubble";
type Unit = "EUR" | "kWh";

const Index = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("1W");
  const [chartType, setChartType] = useState<ChartType>("line");
  const [unit, setUnit] = useState<Unit>("EUR");
  const currentData = mockDataByPeriod[selectedPeriod];

  // Conversion factor (example: 1 EUR = 2 kWh)
  const conversionFactor = 2;

  // Convert data based on selected unit
  const convertData = (data: typeof currentData) => {
    if (unit === "EUR") return data;

    // Deep clone and convert the data
    const converted = JSON.parse(JSON.stringify(data));
    
    // Convert total spent
    converted.totalSpent = converted.totalSpent * conversionFactor;
    
    // Convert daily spending if it exists
    if (converted.dailySpending) {
      converted.dailySpending = converted.dailySpending.map((day: any) => ({
        ...day,
        amount: day.amount * conversionFactor
      }));
    }
    
    // Convert previous period change if it exists
    if (converted.previousPeriodChange) {
      converted.previousPeriodChange.amount = 
        converted.previousPeriodChange.amount * conversionFactor;
    }
    
    // Convert categories
    converted.categories = converted.categories.map((category: any) => ({
      ...category,
      amount: category.amount * conversionFactor
    }));
    
    return converted;
  };

  const displayData = convertData(currentData);

  const handleTimePeriodChange = (period: TimePeriod) => {
    setSelectedPeriod(period);
  };

  const handleChartTypeChange = (type: ChartType) => {
    setChartType(type);
  };

  const handleUnitChange = (newUnit: Unit) => {
    setUnit(newUnit);
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

        <div className="flex mb-6">
          <UnitSwitch unit={unit} onUnitChange={handleUnitChange} />
          <SpendingOverview data={displayData} unit={unit} />
        </div>
        
        <div style={{ height: "250px" }}>
          {chartType === "line" ? (
            <SpendingChart data={displayData} unit={unit} />
          ) : (
            <BubbleChart data={displayData} unit={unit} />
          )}
        </div>

        <TimePeriodSelector
          selectedPeriod={selectedPeriod}
          onSelectPeriod={handleTimePeriodChange}
        />

        <CategoryBreakdown categories={displayData.categories} unit={unit} />
      </div>
    </div>
  );
};

export default Index;
