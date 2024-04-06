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
    currency: CurrencyType
  ): Promise<number | null> => {
    if (currency === baseCurrency) return null;

    const rate = await fetchCurrencyRate(currency);
    return rate ? amount * rate : null;
  };

  return { convertToBaseCurrency };
};

export default useCurrencies;
