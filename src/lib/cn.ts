import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** clsx for conditionals, then tailwind-merge so later classes win */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
