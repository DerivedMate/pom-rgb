import { Option } from "./option";
import { exec } from "child_process"

type Color = [number, number, number];

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

  export class Routine {
    colors : Color[] = []
    spacing: number = 500
    _running: boolean = false
    _run_i : number = 0
    _loop : Option<NodeJS.Timeout> = new Option(undefined)

    constructor(colors: Color[], spacing: number) {
      this.colors = colors
      this.spacing = spacing
    }

    static change_color(color: Color): Promise<boolean> {
      return new Promise((res, rej) => {
        exec(`rivalcfg -c "${const_color(color)}"`, (err, out, out_err) => {
          console.dir([color, out])
          if (err) rej({error: err, message: out_err})
          else res(true)
        })
      })
    }

    private loop() {
      if (this._running)
        Routine.change_color(this.colors[this._run_i % this.colors.length])
          .then(() => {
            this._run_i += 1
          })
          .catch(e => {
            console.dir(e)
            this._run_i = 0
            this._running = false
            this.stop()
          })
    }

    start() {
      this._running = true
      this._loop = new Option(setInterval(this.loop.bind(this), this.spacing))
    }

    stop() {
      this._loop.map(clearTimeout)
    }
  }