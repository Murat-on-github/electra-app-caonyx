
import React, { useState } from "react";
import { TimePeriod } from "../types/finance";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TimePeriodSelectorProps {
  selectedPeriod: TimePeriod;
  onSelectPeriod: (period: TimePeriod) => void;
}

const TimePeriodSelector: React.FC<TimePeriodSelectorProps> = ({
  selectedPeriod,
  onSelectPeriod,
}) => {
  const periods: TimePeriod[] = ["1W", "1M", "6M", "1Y"];
  const [date, setDate] = useState<Date | undefined>(new Date());

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
      <Sheet>
        <SheetTrigger asChild>
          <button className="rounded-full px-3 py-1 bg-background text-muted-foreground hover:bg-secondary/50 text-xs">
            •••
          </button>
        </SheetTrigger>
        <SheetContent className="p-0 border-0 bg-black">
          <div className="flex flex-col h-full">
            <div className="px-4 py-6">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Select custom period</h2>
              <div className="bg-secondary/25 rounded-lg p-4">
                <div className="text-muted-foreground mb-2">
                  {date ? date.getDate() : "29"} Apr
                </div>
                <div className="flex justify-between items-center mb-4">
                  <button className="text-muted-foreground">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <div className="text-foreground font-medium">April 2025</div>
                  <button className="text-muted-foreground">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="bg-transparent border-0"
                  classNames={{
                    month: "space-y-4",
                    caption: "flex justify-center pt-1 relative items-center",
                    caption_label: "text-sm font-medium text-foreground",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                    row: "flex w-full mt-2",
                    cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                    day: cn(
                      "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
                    ),
                    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    day_today: "bg-accent text-accent-foreground",
                    day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                    day_disabled: "text-muted-foreground opacity-50",
                    day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                    day_hidden: "invisible",
                  }}
                />
              </div>
            </div>
            <div className="mt-auto p-4">
              <Button className="w-full bg-white text-black hover:bg-white/90 rounded-full py-6">
                Set period
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default TimePeriodSelector;
