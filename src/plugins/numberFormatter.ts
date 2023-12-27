/**
 * Formats a number using the specified locale and options for decimal formatting.
 *
 * @param value - The number to be formatted.
 * @returns A string representing the formatted number.
 */
export function useNumberFormat(value: number): string {
  const formatNumber = new Intl.NumberFormat('id-ID', { style: 'decimal', maximumSignificantDigits: 2 }).format(value)
  return formatNumber
}

/**
 * Formats a number as currency using the specified locale and currency code.
 *
 * @param value - The number to be formatted as currency.
 * @returns A string representing the formatted currency.
 *
 */
export function useCurrencyFormat(value: number): string {
  const formatNumber = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
  return formatNumber
}
