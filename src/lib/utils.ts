/**
 * Formats a date string from "YYYY-MM" format to "Month, YYYY" format.
 * @param dateString - Date string in "YYYY-MM" format
 * @returns Formatted date string (e.g., "March, 2020")
 */
export function formatDate(dateString: string): string {
  const [year, month] = dateString.split("-");
  const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1);

  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}
