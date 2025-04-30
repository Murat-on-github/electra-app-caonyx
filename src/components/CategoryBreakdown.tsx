import React from "react";
import { ExpenseCategory } from "../types/finance";
import { cn } from "@/lib/utils";
interface CategoryBreakdownProps {
  categories: ExpenseCategory[];
}
const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({
  categories
}) => {
  return <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-sm font-medium">By Category</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <button className="text-sm text-finance-blue">Manage</button>
      </div>

      <div className="space-y-3">
        {categories.map(category => <div key={category.id} className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-lg mr-3", `bg-${category.color}`)}>
                <span className="text-sm">{category.icon}</span>
              </div>
              <div>
                <p className="font-medium text-sm">{category.name}</p>
                <p className="text-xs text-muted-foreground">
                  {category.transactions} transaction
                  {category.transactions !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-sm">-€{category.amount.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{category.percentage}%</p>
            </div>
          </div>)}
      </div>
    </div>;
};
export default CategoryBreakdown;