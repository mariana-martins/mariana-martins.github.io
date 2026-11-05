export interface ParsedValue {
  prefix: string;
  target: number;
  decimals: number;
  suffix: string;
}

/** "100 kB" -> 100 + " kB", "5.5:1" -> 5.5 + ":1"; null when there is no number to count */
export function parseCountValue(value: string): ParsedValue | null {
  const match = /^(\D*)(\d+(?:\.\d+)?)(.*)$/.exec(value);
  if (!match) {
    return null;
  }
  const [, prefix, number, suffix] = match;
  const target = Number(number);
  if (target === 0) {
    return null;
  }
  return {
    prefix,
    target,
    decimals: number.split('.')[1]?.length ?? 0,
    suffix,
  };
}

export function formatCountValue(parsed: ParsedValue, current: number): string {
  return `${parsed.prefix}${current.toFixed(parsed.decimals)}${parsed.suffix}`;
}
