import { Currency, Language } from '../types/job';

// Exchange rates relative to 1 USD
export const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1,
  VND: 25000,
  KRW: 1350,
};

/**
 * Convert an amount from one currency to another
 */
export function convertCurrency(
  amount: number,
  from: Currency,
  to: Currency
): number {
  if (from === to) return amount;
  // Convert from origin to USD, then from USD to target
  const inUSD = amount / EXCHANGE_RATES[from];
  return inUSD * EXCHANGE_RATES[to];
}

/**
 * Format salary range given min and max in Million VND (the base unit used in mock jobs)
 */
export function formatSalaryRange(
  minVndMillion: number,
  maxVndMillion: number,
  targetCurrency: Currency,
  lang: Language = 'vi'
): string {
  const minVnd = minVndMillion * 1_000_000;
  const maxVnd = maxVndMillion * 1_000_000;

  if (targetCurrency === 'VND') {
    if (lang === 'ko') {
      return `${minVndMillion}백만 ~ ${maxVndMillion}백만 VND / 월`;
    }
    if (lang === 'en') {
      return `${minVndMillion}M - ${maxVndMillion}M VND / mo`;
    }
    return `${minVndMillion} - ${maxVndMillion} triệu VND / tháng`;
  }

  if (targetCurrency === 'USD') {
    const minUSD = Math.round(convertCurrency(minVnd, 'VND', 'USD'));
    const maxUSD = Math.round(convertCurrency(maxVnd, 'VND', 'USD'));
    if (lang === 'ko') {
      return `$${minUSD.toLocaleString()} ~ $${maxUSD.toLocaleString()} USD / 월`;
    }
    if (lang === 'en') {
      return `$${minUSD.toLocaleString()} - $${maxUSD.toLocaleString()} USD / mo`;
    }
    return `$${minUSD.toLocaleString()} - $${maxUSD.toLocaleString()} USD / tháng`;
  }

  // KRW
  const minKRW = Math.round(convertCurrency(minVnd, 'VND', 'KRW') / 10_000) * 10_000;
  const maxKRW = Math.round(convertCurrency(maxVnd, 'VND', 'KRW') / 10_000) * 10_000;
  const minTenThousand = Math.round(minKRW / 10_000);
  const maxTenThousand = Math.round(maxKRW / 10_000);

  if (lang === 'ko') {
    return `${minTenThousand}만 ~ ${maxTenThousand}만 KRW / 월`;
  }
  if (lang === 'en') {
    return `${minKRW.toLocaleString()} - ${maxKRW.toLocaleString()} KRW / mo`;
  }
  return `${minKRW.toLocaleString()} - ${maxKRW.toLocaleString()} KRW / tháng`;
}

/**
 * Format a single numeric amount in target currency
 */
export function formatCurrencyAmount(
  amount: number,
  currency: Currency,
  lang: Language = 'vi'
): string {
  if (currency === 'VND') {
    if (amount >= 1_000_000) {
      const millions = amount / 1_000_000;
      if (lang === 'ko') return `${millions}백만 VND`;
      if (lang === 'en') return `${millions}M VND`;
      return `${millions} triệu VND`;
    }
    return `${amount.toLocaleString()} VND`;
  }
  if (currency === 'USD') {
    return `$${amount.toLocaleString()} USD`;
  }
  if (currency === 'KRW') {
    if (amount >= 10_000) {
      const man = Math.round(amount / 10_000);
      if (lang === 'ko') return `${man}만 KRW`;
    }
    return `${amount.toLocaleString()} KRW`;
  }
  return `${amount} ${currency}`;
}
