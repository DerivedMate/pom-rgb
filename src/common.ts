export interface Record {
  [k: string]: unknown
}

export const for_pairs = <T, K>(xs: T[], f: (a: T, b: T) => K): K[] => xs.slice(1).map((a, i) => f(xs[i], a))