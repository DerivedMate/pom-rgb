import { get_args } from "./args";
import { inter_color, parse_color, Routine } from "./lights";
import {for_pairs} from "./common"
// import { firefox as browser } from "playwright";

const main = () => new Promise<boolean>(async (res, _) => {
  const args = get_args()
  console.dir(args)
  const target_colors = ["#0084ff", "#ff0000"]// ["#55CDFC", "#FFFFFF", "#F7A8B8"]
  const routine = new Routine(
      for_pairs(target_colors.concat([target_colors[0]])
        .map(parse_color)
        .map(o => o.get()), inter_color(50))
        .reduce((r, a) => r.concat(a), []),
      150
    );

  routine.start()

  setTimeout(() => {
    routine.stop()
    res(true)
  }, 10000)
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
  parse_color(def_color).with(c => Routine.change_color(c).then(() => process.exit(0)))
  })
  .catch((e) => {
    console.dir(e);
    process.exit(1);
  });

