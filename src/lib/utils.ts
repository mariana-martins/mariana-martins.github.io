/** "2020-03" -> "Mar 2020" */
export function formatDate(dateString: string): string {
  const [year, month] = dateString.split('-');
  const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1);

  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

/** "2 yr 5 mo", counting both end months; no end date means today */
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
