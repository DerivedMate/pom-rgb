import { get_args } from "./args";
import { Routine } from "./routine";
import {for_pairs} from "./common"
import { get_devices } from "./device";
import { inter_color, parse_color } from "./color";
// import { firefox as browser } from "playwright";

const main = () => new Promise<boolean>(async (res, _) => {
  const devices = await get_devices()
  const args = get_args()
  console.dir(args)
  const target_colors = ["#0084ff", "#ff0000"]// ["#55CDFC", "#FFFFFF", "#F7A8B8"]
  const routine = new Routine(
      for_pairs(target_colors.concat([target_colors[0]])
        .map(parse_color)
        .map(o => o.get()), inter_color(40))
        .reduce((r, a) => r.concat(a), []),
        devices,
      200
    );

  routine.start()

  setTimeout(() => {
    routine.stop()
    // res(true)
  }, 5000)
  setTimeout(() => res(true), 10000)
  /*const inst = await browser.launch({
    headless: true
  });

  const page = await inst.newPage({
    colorScheme: 'dark',
  })

  await page.goto(args["url"] as string)
  await page.title().then(console.dir)

  await inst.close()*/
});
main()
  .then(() => {
    const def_color = "#E91E63"
  parse_color(def_color).with(c => get_devices().then(ds => ds.forEach(d => d.set_color(c))).then(() => process.exit(0)))
  })
  .catch((e) => {
    console.dir(e);
    process.exit(1);
  });

