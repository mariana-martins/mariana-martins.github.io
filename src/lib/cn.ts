import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines clsx and tailwind-merge for optimal class handling.
 * - clsx: Handles conditional classes, arrays, and objects
 * - twMerge: Resolves Tailwind CSS conflicts (e.g., 'p-4 p-6' → 'p-6')
 *
 * @example
 * cn('p-4', 'p-6') // 'p-6'
 * cn('text-red-500', isActive && 'text-blue-500') // conditional
 * cn(['flex', 'items-center'], 'gap-4') // arrays
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
