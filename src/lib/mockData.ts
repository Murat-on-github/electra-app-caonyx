
import { SpendingData } from "../types/finance";

export const weekData: SpendingData = {
  totalSpent: 36,
  timeFrame: "This week",
  previousPeriodChange: {
    amount: 244,
    isIncrease: true,
  },
  categories: [
    {
      id: "cooking",
      name: "Cooking",
      icon: "🍽️",
      color: "finance-pink",
      transactions: 1,
      amount: 36,
      percentage: 100,
    },
  ],
  dailySpending: [
    { date: "Mon", amount: 0 },
    { date: "Tue", amount: 0 },
    { date: "Wed", amount: 0 },
    { date: "Thu", amount: 0 },
    { date: "Fri", amount: 0 },
    { date: "Sat", amount: 0 },
    { date: "Sun", amount: 36 },
  ],
};

export const monthData: SpendingData = {
  totalSpent: 3720,
  timeFrame: "This month",
  previousPeriodChange: {
    amount: 397,
    isIncrease: true,
  },
  categories: [
    {
      id: "heating",
      name: "Home Heating",
      icon: "🔥",
      color: "finance-blue",
      transactions: 2,
      amount: 1900,
      percentage: 51,
    },
    {
      id: "cooking",
      name: "Cooking",
      icon: "🍽️",
      color: "finance-pink",
      transactions: 9,
      amount: 351,
      percentage: 9,
    },
    {
      id: "water-heating",
      name: "Water Heating",
      icon: "⚕️",
      color: "finance-green",
      transactions: 1,
      amount: 300,
      percentage: 8,
    },
  ],
  dailySpending: [
    { date: "1", amount: 100 },
    { date: "6", amount: 300 },
    { date: "11", amount: 1200 },
    { date: "16", amount: 1500 },
    { date: "21", amount: 2000 },
    { date: "26", amount: 2500 },
    { date: "30", amount: 3720 },
  ],
};

export const sixMonthData: SpendingData = {
  totalSpent: 12276,
  timeFrame: "January - June",
  previousPeriodChange: {
    amount: 3102,
    isIncrease: false,
  },
  categories: [
    {
      id: "heating",
      name: "Home Heating",
      icon: "🔥",
      color: "finance-pink",
      transactions: 5,
      amount: 3853,
      percentage: 31,
    },
    {
      id: "cooling",
      name: "Home Cooling",
      icon: "❄️",
      color: "finance-yellow",
      transactions: 84,
      amount: 2829,
      percentage: 23,
    },
    {
      id: "groceries",
      name: "Groceries",
      icon: "🛒",
      color: "finance-green",
      transactions: 30,
      amount: 1044,
      percentage: 9,
    },
  ],
  dailySpending: [
    { date: "Jan", amount: 1000 },
    { date: "Feb", amount: 3000 },
    { date: "Mar", amount: 5000 },
    { date: "Apr", amount: 8000 },
    { date: "May", amount: 10000 },
    { date: "Jun", amount: 12276 },
  ],
};

export const yearData: SpendingData = {
  totalSpent: 12276,
  timeFrame: "This year",
  categories: [
    {
      id: "heating",
      name: "Home Heating",
      icon: "🔥",
      color: "finance-pink",
      transactions: 5,
      amount: 3853,
      percentage: 31,
    },
    {
      id: "cooling",
      name: "Home Cooling",
      icon: "❄️",
      color: "finance-yellow",
      transactions: 84,
      amount: 2829,
      percentage: 23,
    },
    {
      id: "groceries",
      name: "Groceries",
      icon: "🛒",
      color: "finance-green",
      transactions: 30,
      amount: 1044,
      percentage: 9,
    },
  ],
  dailySpending: [
    { date: "Jan", amount: 1000 },
    { date: "Mar", amount: 3000 },
    { date: "May", amount: 5000 },
    { date: "Aug", amount: 8000 },
    { date: "Oct", amount: 10000 },
    { date: "Dec", amount: 12276 },
  ],
};

export const mockDataByPeriod = {
  "1W": weekData,
  "1M": monthData,
  "6M": sixMonthData,
  "1Y": yearData,
};
