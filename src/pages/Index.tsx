
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { TimePeriod } from "@/types/finance";
import { mockDataByPeriod } from "@/lib/mockData";
import SpendingOverview from "@/components/SpendingOverview";
import TimePeriodSelector from "@/components/TimePeriodSelector";
import CategoryBreakdown from "@/components/CategoryBreakdown";
import SpendingChart from "@/components/SpendingChart";

const Index = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("1W");
  const currentData = mockDataByPeriod[selectedPeriod];

  const handleTimePeriodChange = (period: TimePeriod) => {
    setSelectedPeriod(period);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-md mx-auto p-4">
        <header className="flex items-center justify-between mb-6">
          <button className="p-2 rounded-full hover:bg-secondary/50">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex space-x-2">
            <button className="p-2 rounded-full hover:bg-secondary/50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                />
              </svg>
            </button>
            <button className="p-2 rounded-full hover:bg-secondary/50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </button>
            <button className="p-2 rounded-full hover:bg-secondary/50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </header>

        <SpendingOverview data={currentData} />
        
        {currentData.dailySpending && currentData.dailySpending.length > 0 && (
          <SpendingChart data={currentData} />
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
