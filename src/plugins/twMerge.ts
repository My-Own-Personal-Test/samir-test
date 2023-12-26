import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines multiple class values using clsx and tailwind-merge utility functions.
 * This function is designed to work with TypeScript.
 *
 * @param inputs - Class values to be combined.
 * @returns A string representing the combined class values.
 */
export function cn(...inputs: ClassValue[]) {
  // Combine class values using clsx and tailwind-merge
  return twMerge(clsx(inputs))
}
