export const formatDate = (isoDate: string): string => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const date = new Date(isoDate);
  const dateToCompare = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  if (dateToCompare.getTime() === today.getTime()) {
    return "Today";
  } else if (dateToCompare.getTime() === yesterday.getTime()) {
    return "Yesterday";
  } else {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
    }).format(date);
  }
};
