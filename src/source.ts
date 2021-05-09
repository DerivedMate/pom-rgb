/*
import { Option } from "./option";

export class Source<T, E, Event> {
  #promises: Promise<T>[] = []

  publish(promise: Promise<T>) {
    this.#promises.unshift(promise)
  }

  async *gen() {
    while (true) 
      if (this.#promises) {
        const p =  await this.#promises.pop()
        if (p !== undefined) 
          yield p
      }
  }
}
*/