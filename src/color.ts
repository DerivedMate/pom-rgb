import { Option } from "./option";

export type Color = [number, number, number];

export const parse_color = (c: string): Option<Color> => {
  if (!/^#[\d\w]{6}$/i.test(c)) return new Option(undefined);

  return new Option(
    [...c.slice(1)].reduce(
      ([r, p]: [number[], string], n: string): [number[], string] =>
        (p + n).length === 2 
          ? [[...r, parseInt(p + n, 16)], ""] 
          : [r, p + n],
      [[], ""]
    )[0]
  );
};

export const const_color = (c: Color): string => 
  `#${c.reduce((r, a) => r + a.toString(16).padStart(2, "0"), "")}`

export const inter_color = (detail: number) => (c0: Color, c1: Color): Color[] => {
  const ds = c0.map((cc0, i) => c1[i] - cc0)
  return new Array(detail).fill(0)
    .map((_, i) => 
      ds.map((d, j) => c0[j] + d/detail*i)
        .map(Math.floor)
    ) as Color[]
}