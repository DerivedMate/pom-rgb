export interface Record {
  [k: string]: unknown;
}

export const for_pairs = <T, K>(xs: T[], f: (a: T, b: T) => K): K[] =>
  xs.slice(1).map((a, i) => f(xs[i], a));
export const a_filter = <T>(
  xs: T[],
  f: (x: T) => Promise<Boolean>
): Promise<T[]> =>
  Promise.all(xs.map((x) => f(x).then((p) => ({ p, x }))))
    .then((ps) => ps.filter(({ p }) => p).map(({ x }) => x))
    .catch(() => []);
