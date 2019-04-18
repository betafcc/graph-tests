export const range = function*(start: number, stop?: number, step = 1): IterableIterator<number> {
  if (stop === undefined) yield* range(0, start, step)
  else for (let n = start; n < stop; n += step) yield n
}

export const count = function*(start = 0, step = 1) {
  let i = start
  while (true) {
    yield i
    i += step
  }
}

export const take = function*<T>(n: number, it: Iterable<T>) {
  if (n > 0) {
    for (const el of it) {
      yield el
      n = n - 1
      if (n <= 0) break
    }
  }
}

export const iterate = function*<T>(f: (x: T) => T, x: T) {
  while (true) {
    yield x
    x = f(x)
  }
}
