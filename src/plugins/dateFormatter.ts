import dayjs from 'dayjs'

/**
 * Formats a given Date object using the dayjs library to a string in 'DD-MM-YYYY' format.
 * @param {Date} date - The Date object to be formatted.
 * @returns {string} - The formatted date string.
 */
export function useDateFormatter(date: Date): string {
  return dayjs(date).format('DD-MM-YYYY')
}
