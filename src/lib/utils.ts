import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { DateTime } from 'luxon';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateWithAgo(date: string | Date): string {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInMs = now.getTime() - targetDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return 'today';
  } else if (diffInDays === 1) {
    return 'yesterday';
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  }
}

export function formatUrl(url: string | undefined | null): string {
  if (!url) {
    return '#';
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `https://${url}`;
}

/**
 * Format a date using Luxon. Default format is 'yyyy-MM-dd'.
 */
export function formatDateLuxon(date: string | Date | null, format: string = 'yyyy-MM-dd'): string {
  if (!date) return 'N/A';
  try {
    return DateTime.fromISO(new Date(date).toISOString()).toFormat(format);
  } catch {
    return 'N/A';
  }
}

export function sortByDateDesc<T>(arr: T[], getDate: (item: T) => string | Date): T[] {
  return arr.slice().sort((a, b) => {
    const dateA = DateTime.fromISO(new Date(getDate(a)).toISOString());
    const dateB = DateTime.fromISO(new Date(getDate(b)).toISOString());
    return dateB.toMillis() - dateA.toMillis();
  });
}

export function calculateAge(birthDate: Date, precise: boolean = false): string {
  const now = new Date();
  const birth = new Date(birthDate);

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  // Adjust for negative months/days
  if (days < 0) {
    months--;
    const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  if (precise) {
    return `${years} years ${months} months ${days} days old`;
  }

  return `${years} y/o`;
}
