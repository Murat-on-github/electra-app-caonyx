
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "@/types/finance";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { format } from "date-fns";

interface CustomPeriodSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSetPeriod: (range: DateRange) => void;
}

const CustomPeriodSelector: React.FC<CustomPeriodSelectorProps> = ({
  open,
  onOpenChange,
  onSetPeriod,
}) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

  const handleSetPeriod = () => {
    if (selectedDate) {
      const range: DateRange = {
        from: selectedDate,
      };
      onSetPeriod(range);
      onOpenChange(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col justify-between" side="bottom">
        <SheetHeader>
          <SheetTitle className="text-left">Select custom period</SheetTitle>
        </SheetHeader>
        <div className="flex justify-center py-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="bg-background rounded-md border-none pointer-events-auto"
            showOutsideDays={true}
          />
        </div>
        <div className="mt-auto pt-4">
          <Button 
            className="w-full py-6 rounded-full text-md font-medium"
            disabled={!selectedDate} 
            onClick={handleSetPeriod}
          >
            Set period
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CustomPeriodSelector;
