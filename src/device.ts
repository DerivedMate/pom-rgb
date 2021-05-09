import { Color, const_color } from "./color";
import { exec } from "child_process";
import { lookpath } from "lookpath";
import { a_filter } from "./common";

export class Device {
  constructor() {}

  static available(): Promise<boolean> {
    return Promise.resolve(false);
  }
  set_color(_color: Color): Promise<void> {
    return Promise.resolve();
  }
}

export class RivalMouse extends Device {
  static available() {
    return lookpath("rivalcfg").then(Boolean);
  }

  set_color(color: Color): Promise<void> {
    return new Promise((res, _rej) => {
      exec(`rivalcfg -c "${const_color(color)}"`, (_) => {
        res()
        // console.dir([color, out]);
        // if (err) rej({ error: err, message: out_err });
        // else res();
      });
    });
  }
}

export const all_devices: typeof Device[] = [RivalMouse];
export const get_devices = (): Promise<Device[]> =>
  a_filter(all_devices, (d) => d.available()).then(ds =>
    ds.map(d => new d())
  );
