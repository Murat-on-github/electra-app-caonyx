
import React from "react";
import { TimePeriod } from "../types/finance";
import { cn } from "@/lib/utils";

interface TimePeriodSelectorProps {
  selectedPeriod: TimePeriod;
  onSelectPeriod: (period: TimePeriod) => void;
}

const TimePeriodSelector: React.FC<TimePeriodSelectorProps> = ({
  selectedPeriod,
  onSelectPeriod,
}) => {
  const periods: TimePeriod[] = ["1W", "1M", "6M", "1Y"];

  return (
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
      <button className="rounded-full px-3 py-1 bg-background text-muted-foreground hover:bg-secondary/50 text-xs">
        •••
      </button>
    </div>
  );
};

export default TimePeriodSelector;
