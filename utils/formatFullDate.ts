export function formatFullDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };

  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
