/**
 * ```
n: 0, 1, 2, 3, 4, 5
plusMinus(n): 1, -1, 1, -1, 1, -1```
 */
export function plusMinus(n: number): number {
  return (-1) ** n
}

/**
 * ```
n: 0, 1, 2, 3, 4, 5
zeroTwo(n): 0, 2, 0, 2, 0, 2```
 */
export function zeroTwo(n: number): number {
  return 1 - plusMinus(n)
}

/**
 * ```
n: 0, 1, 2, 3, 4, 5
slowCount(n): 0, 1, 1, 2, 2, 3```
 */
export function slowCount(n: number): number {
  return n / 2 + zeroTwo(n) / 4
}
