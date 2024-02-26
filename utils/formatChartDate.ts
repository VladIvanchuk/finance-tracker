export const formatChartDate = (date: Date, period: string): string => {
  if (period === "1W") {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  } else if (period === "All") {
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    return `${month} '${year}`;
  } else {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }
};
