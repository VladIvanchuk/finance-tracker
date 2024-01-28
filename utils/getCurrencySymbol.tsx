export function getCurrencySymbol(currency: "USD" | "UAH" | "EUR") {
  switch (currency) {
    case "USD":
      return "$";
    case "UAH":
      return "₴";
    case "EUR":
      return "€";
  }
}
