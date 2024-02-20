export function formatFullDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
