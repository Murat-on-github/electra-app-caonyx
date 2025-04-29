
import React, { useState } from "react";
import { ArrowLeft, ChartLine, BarChart3, ScatterChart } from "lucide-react";
import { TimePeriod } from "@/types/finance";
import { mockDataByPeriod } from "@/lib/mockData";
import SpendingOverview from "@/components/SpendingOverview";
import TimePeriodSelector from "@/components/TimePeriodSelector";
import CategoryBreakdown from "@/components/CategoryBreakdown";
import SpendingChart from "@/components/SpendingChart";
import BubbleChart from "@/components/BubbleChart";

type ChartType = "line" | "bar" | "bubble";

const Index = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("1W");
  const [activeChart, setActiveChart] = useState<ChartType>("line");
  const currentData = mockDataByPeriod[selectedPeriod];

  const handleTimePeriodChange = (period: TimePeriod) => {
    setSelectedPeriod(period);
  };

  const renderChart = () => {
    if (!currentData.dailySpending || currentData.dailySpending.length === 0) {
      return null;
    }

    switch (activeChart) {
      case "bubble":
        return <BubbleChart data={currentData} />;
      case "bar":
        // Future implementation for bar chart
        return <SpendingChart data={currentData} />;
      case "line":
      default:
        return <SpendingChart data={currentData} />;
    }
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
              className={`p-2 rounded-full ${activeChart === 'line' ? 'bg-secondary' : 'hover:bg-secondary/50'}`}
              onClick={() => setActiveChart("line")}
            >
              <ChartLine className="w-5 h-5" />
            </button>
            <button 
              className={`p-2 rounded-full ${activeChart === 'bar' ? 'bg-secondary' : 'hover:bg-secondary/50'}`}
              onClick={() => setActiveChart("bar")}
            >
              <BarChart3 className="w-5 h-5" />
            </button>
            <button 
              className={`p-2 rounded-full ${activeChart === 'bubble' ? 'bg-secondary' : 'hover:bg-secondary/50'}`}
              onClick={() => setActiveChart("bubble")}
            >
              <ScatterChart className="w-5 h-5" />
            </button>
          </div>
        </header>

        <SpendingOverview data={currentData} />
        
        {renderChart()}

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
