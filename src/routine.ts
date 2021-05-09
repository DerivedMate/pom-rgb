import { Color } from "./color";
import { Option } from "./option";
import { Device } from "./device";

export class Routine {
  colors: Color[] = [];
  spacing: number = 500;
  devices: Device[] = []
  _running: boolean = false;
  _run_i: number = 0;
  _loop: Option<NodeJS.Timeout> = new Option(undefined);

  constructor(colors: Color[], devices: Device[], spacing: number) {
    this.colors = colors;
    this.spacing = spacing;
    this.devices = devices;
  }

  private loop() {
    if (this._running)
      Promise.all(this.devices.map(d => d.set_color(this.colors[this._run_i])))
        .then(() => {
          this._run_i = (this._run_i + 1) % this.colors.length;
        })
        .catch((e) => {
          console.dir(e);
          this._run_i = 0;
          this._running = false;
          this.stop();
        });
  }

  start() {
    this._running = true;
    this._loop = new Option(setInterval(this.loop.bind(this), this.spacing));
  }

  stop() {
    this._loop.map(clearInterval);
  }
}
