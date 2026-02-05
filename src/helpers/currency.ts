type CurrencyOptions = {
  format?: boolean; // true = format, false = raw
  withSymbol?: boolean; // Rp
  decimals?: number; // default 0
};

export function formatIDR(
  value: number,
  { format = true, withSymbol = true, decimals = 0 }: CurrencyOptions = {},
) {
  if (!format) return value;

  const fixed = value.toFixed(decimals);
  const [int, dec] = fixed.split(".");

  const formattedInt = int.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const result = dec ? `${formattedInt}.${dec}` : formattedInt;

  return withSymbol ? `Rp ${result}` : result;
}

export function formatIDRLocale(
  value: number,
  { withSymbol = false, decimals = 2 }: CurrencyOptions = {},
) {
  return value.toLocaleString("id-ID", {
    style: withSymbol ? "currency" : "decimal",
    currency: "IDR",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// export function formattedCurrency(value: number) {
//   return value
//     .toLocaleString("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       maximumFractionDigits: 0,
//     })
//     .replace(/\u00A0/, "");
// }

/**
 *
 * @param arr
 * @param fn
 * @returns
 * example const grandTotal = sumBy(data, i => i.amount);
 */
export const sumBy = <T>(arr: T[] = [], fn: (item: T) => number) =>
  arr.reduce((a, b) => a + fn(b), 0);

export const sumNested = <T, U>(
  arr: T[] = [],
  getChildren: (item: T) => U[],
  getValue: (child: U) => number,
) =>
  arr.reduce(
    (total, item) =>
      total + getChildren(item).reduce((s, c) => s + getValue(c), 0),
    0,
  );
