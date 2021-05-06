import { Record } from "./common"

const is_key_arg = (arg: string): boolean => /--.*/i.test(arg)
const key_arg_name = (arg: string): string => arg.slice(2)

export const get_args = () => {
  const aux = ([r, p]: [Record, string], n: string): [Record, string] => {
    const is_p_key = is_key_arg(p)
        , is_n_key = is_key_arg(n)

    if (p === "") {
      return [r, n]
    }

    if (is_p_key && (is_n_key || n === "")) {
      r[key_arg_name(p)] = true
      return [r, n]
    }

    if (is_p_key && !is_n_key) {
      r[key_arg_name(p)] = n
      return [r, ""]
    }

    return [r, p]
  }

  return aux(process.argv.slice(2).reduce(aux, [{}, ""]), "")[0]
}