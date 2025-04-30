
import React from "react";
import { Switch } from "@/components/ui/switch";
import { ToggleLeft, ToggleRight } from "lucide-react";

interface UnitSwitchProps {
  unit: "EUR" | "kWh";
  onUnitChange: (unit: "EUR" | "kWh") => void;
}

const UnitSwitch: React.FC<UnitSwitchProps> = ({ unit, onUnitChange }) => {
  const handleToggle = () => {
    onUnitChange(unit === "EUR" ? "kWh" : "EUR");
  };

  return (
    <div className="flex flex-col justify-center items-center bg-secondary/30 rounded-lg p-4 mr-2 h-full">
      <div className="flex items-center gap-2">
        <span className={`text-xs ${unit === "EUR" ? "text-foreground" : "text-muted-foreground"}`}>EUR</span>
        <div className="flex items-center relative">
          <Switch 
            checked={unit === "kWh"} 
            onCheckedChange={handleToggle}
          />
          {unit === "EUR" ? (
            <ToggleLeft className="absolute left-0 w-4 h-4 text-primary pointer-events-none" />
          ) : (
            <ToggleRight className="absolute right-0 w-4 h-4 text-primary pointer-events-none" />
          )}
        </div>
        <span className={`text-xs ${unit === "kWh" ? "text-foreground" : "text-muted-foreground"}`}>kWh</span>
      </div>
    </div>
  );
};

export default UnitSwitch;
