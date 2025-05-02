
import React from "react";
import { Euro, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface UnitSwitchProps {
  unit: "EUR" | "kWh";
  onUnitChange: (unit: "EUR" | "kWh") => void;
}

const UnitSwitch: React.FC<UnitSwitchProps> = ({ unit, onUnitChange }) => {
  return (
    <div className="flex flex-col justify-between bg-secondary/30 rounded-lg p-4 mr-2 h-full">
      <button 
        className={cn(
          "p-2 rounded-full transition-colors", 
          unit === "EUR" 
            ? "bg-secondary text-foreground" 
            : "hover:bg-secondary/50"
        )}
        onClick={() => onUnitChange("EUR")}
        aria-label="Show in EUR"
      >
        <Euro className="w-4 h-4" />
      </button>
      <div className="flex-grow"></div>
      <button 
        className={cn(
          "p-2 rounded-full transition-colors", 
          unit === "kWh" 
            ? "bg-secondary text-foreground" 
            : "hover:bg-secondary/50"
        )}
        onClick={() => onUnitChange("kWh")}
        aria-label="Show in kWh"
      >
        <Zap className="w-4 h-4" />
      </button>
    </div>
  );
};

export default UnitSwitch;
