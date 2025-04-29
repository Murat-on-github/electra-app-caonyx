
export interface ExpenseCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  transactions: number;
  amount: number;
  percentage: number;
}

export interface SpendingData {
  totalSpent: number;
  timeFrame: string;
  categories: ExpenseCategory[];
  previousPeriodChange?: {
    amount: number;
    isIncrease: boolean;
  };
  dailySpending?: { date: string; amount: number }[];
}

export type TimePeriod = '1W' | '1M' | '6M' | '1Y' | 'custom';

export interface DateRange {
  from: Date | undefined;
  to?: Date | undefined;
}
