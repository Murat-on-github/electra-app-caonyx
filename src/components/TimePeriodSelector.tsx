
import React, { useState } from "react";
import { DateRange, TimePeriod } from "../types/finance";
import { cn } from "@/lib/utils";
import CustomPeriodSelector from "./CustomPeriodSelector";
import { format } from "date-fns";

interface TimePeriodSelectorProps {
  selectedPeriod: TimePeriod;
  onSelectPeriod: (period: TimePeriod) => void;
  onSelectCustomRange?: (range: DateRange) => void;
}

const TimePeriodSelector: React.FC<TimePeriodSelectorProps> = ({
  selectedPeriod,
  onSelectPeriod,
  onSelectCustomRange,
}) => {
  const [isCustomSelectorOpen, setIsCustomSelectorOpen] = useState(false);
  const periods: TimePeriod[] = ["1W", "1M", "6M", "1Y"];

  const handleCustomPeriodSelect = (range: DateRange) => {
    if (onSelectCustomRange) {
      onSelectCustomRange(range);
    }
    onSelectPeriod("custom");
  };

  return (
    <>
      <div className="flex space-x-2 mb-4">
        {periods.map((period) => (
          <button
            key={period}
            className={cn(
              "rounded-full px-4 py-1 text-xs font-medium transition-colors",
              selectedPeriod === period
                ? "bg-secondary text-foreground"
                : "bg-background text-muted-foreground hover:bg-secondary/50"
            )}
            onClick={() => onSelectPeriod(period)}
          >
            {period}
          </button>
        ))}
        <button 
          className={cn(
            "rounded-full px-3 py-1 text-xs transition-colors",
            selectedPeriod === "custom"
              ? "bg-secondary text-foreground"
              : "bg-background text-muted-foreground hover:bg-secondary/50"
          )}
          onClick={() => setIsCustomSelectorOpen(true)}
        >
          •••
        </button>
      </div>

      <CustomPeriodSelector
        open={isCustomSelectorOpen}
        onOpenChange={setIsCustomSelectorOpen}
        onSetPeriod={handleCustomPeriodSelect}
      />
    </>
  );
};

export default TimePeriodSelector;
