export const count = (start: number, step: number, length: number): number[] =>
  Array.from(new Array(length), (_, i) => start + i * step)

export const orderByCenterDistance = <T>(arr: T[]): T[] =>
  arr
    .map<[number, T]>((el, i) => [Math.abs(arr.length / 2 - i), el])
    .sort((a, b) => a[0] - b[0])
    .map(([_, el]) => el)
