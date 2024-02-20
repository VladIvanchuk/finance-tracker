import "react-native-get-random-values";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface MonthContextValue {
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  selectedMonth: number;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  currentYear: number;
  currentMonthIndex: number;
}

export const MonthContext = createContext<MonthContextValue | undefined>(
  undefined
);

export const MonthProvider = ({ children }: { children: ReactNode }) => {
  const currentMonthIndex = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(currentMonthIndex);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const value: MonthContextValue = {
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    currentYear,
    currentMonthIndex,
  };

  return (
    <MonthContext.Provider value={value}>{children}</MonthContext.Provider>
  );
};

export default MonthContext;

export const useMonthContext = () => {
  const context = useContext(MonthContext);
  if (!context) {
    throw new Error("useMonthContext must be used within a MonthProvider");
  }
  return context;
};
