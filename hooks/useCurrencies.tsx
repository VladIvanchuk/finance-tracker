import { baseCurrency } from "@/data/baseCurrency";
import { CurrencyType } from "@/types/TransactionTypes";

const useCurrencies = () => {
  async function fetchCurrencyRate(currency: CurrencyType) {
    const url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${currency}&json`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data[0].rate;
    } catch (error) {
      console.error("Failed to fetch currency rate:", error);
      return null;
    }
  }

  const convertToBaseCurrency = async (
    amount: number,
    currency: CurrencyType,
  ): Promise<number | null> => {
    if (currency === baseCurrency) return null;

    const rate = await fetchCurrencyRate(currency);

    return rate ? amount * rate : null;
  };

  const convertCurrencies = async (
    amount: number,
    fromCurrency: CurrencyType,
    toCurrency: CurrencyType,
  ): Promise<number | null> => {
    try {
      if (fromCurrency === "UAH") {
        const toCurrencyRateToUah = await fetchCurrencyRate(toCurrency);
        if (toCurrencyRateToUah) {
          return amount / toCurrencyRateToUah;
        } else {
          return null;
        }
      } else if (toCurrency === "UAH") {
        return await convertToBaseCurrency(amount, fromCurrency);
      } else {
        const fromCurrencyRateToUah = await fetchCurrencyRate(fromCurrency);
        const toCurrencyRateToUah = await fetchCurrencyRate(toCurrency);

        if (fromCurrencyRateToUah && toCurrencyRateToUah) {
          const amountInUah = amount * fromCurrencyRateToUah;
          const convertedAmount = amountInUah / toCurrencyRateToUah;

          return convertedAmount;
        } else {
          return null;
        }
      }
    } catch (error) {
      console.error("Error converting currencies:", error);
      return null;
    }
  };

  return { convertToBaseCurrency, convertCurrencies };
};

export default useCurrencies;
