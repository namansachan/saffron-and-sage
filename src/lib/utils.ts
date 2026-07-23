export function formatPrice(n: number): string {
  return '₹' + n.toLocaleString('en-IN');
}

export function classNames(...c: (string | false | null | undefined)[]): string {
  return c.filter(Boolean).join(' ');
}
