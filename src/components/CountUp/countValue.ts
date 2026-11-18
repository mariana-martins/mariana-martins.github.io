export interface ParsedValue {
  prefix: string;
  target: number;
  decimals: number;
  grouped: boolean;
  suffix: string;
}

/** "100 kB" -> 100 + " kB", "5.5:1" -> 5.5 + ":1", "1,287" -> 1287 grouped; null when there is no number to count */
export function parseCountValue(value: string): ParsedValue | null {
  const match = /^(\D*)(\d{1,3}(?:,\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?)(.*)$/.exec(
    value,
  );
  if (!match) {
    return null;
  }
  const [, prefix, number, suffix] = match;
  const target = Number(number.replace(/,/g, ''));
  if (target === 0) {
    return null;
  }
  return {
    prefix,
    target,
    decimals: number.split('.')[1]?.length ?? 0,
    grouped: number.includes(','),
    suffix,
  };
}

function groupThousands(number: string): string {
  const [whole, fraction] = number.split('.');
  const groupedWhole = whole.replace(/\B(?=(\d{3})+$)/g, ',');
  return fraction === undefined ? groupedWhole : `${groupedWhole}.${fraction}`;
}

export function formatCountValue(parsed: ParsedValue, current: number): string {
  const number = current.toFixed(parsed.decimals);
  return `${parsed.prefix}${parsed.grouped ? groupThousands(number) : number}${parsed.suffix}`;
}
