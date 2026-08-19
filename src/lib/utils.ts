/**
 * Formats a date string from "YYYY-MM" format to "Mon YYYY" format.
 * @param dateString - Date string in "YYYY-MM" format
 * @returns Formatted date string (e.g., "Mar 2020")
 */
export function formatDate(dateString: string): string {
  const [year, month] = dateString.split('-');
  const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1);

  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Formats the distance between two "YYYY-MM" dates as a human readable
 * duration, inclusive of both the start and the end month.
 * @param startDate - Start date in "YYYY-MM" format
 * @param endDate - End date in "YYYY-MM" format, omitted for an ongoing period
 * @returns Formatted duration (e.g., "2 yr 5 mo", "3 yr", "8 mo")
 */
export function formatDuration(startDate: string, endDate?: string): string {
  const [startYear, startMonth] = startDate.split('-').map(Number);

  let endYear: number;
  let endMonth: number;

  if (endDate) {
    [endYear, endMonth] = endDate.split('-').map(Number);
  } else {
    const now = new Date();
    endYear = now.getFullYear();
    endMonth = now.getMonth() + 1;
  }

  const totalMonths = Math.max(
    1,
    (endYear - startYear) * 12 + (endMonth - startMonth) + 1,
  );
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0) {
    return `${months} mo`;
  }
  if (months === 0) {
    return `${years} yr`;
  }

  return `${years} yr ${months} mo`;
}
