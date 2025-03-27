import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhoneNumber(input: string) {
  // Remove all non-digit characters
  const digits = input.replace(/\D/g, '');

  // Extract the last 10 digits (assuming it's a US number with or without country code)
  const phone = digits.slice(-10);

  // Check if it's exactly 10 digits
  if (phone.length !== 10) {
    return 'Invalid number';
  }

  // Format the number
  const areaCode = phone.slice(0, 3);
  const centralOffice = phone.slice(3, 6);
  const lineNumber = phone.slice(6);

  return `(${areaCode}) ${centralOffice}-${lineNumber}`;
}