export type Args<T> = T extends (...args: infer U) => any ? U : never
export type Arg<T, I extends number> = Args<T>[I]

export const normal = ({
  padding,
  margin,
  radius
}: {
  padding: number
  margin: number
  radius: number
}) => (n: number) => padding + margin + radius + n * (2 * radius + margin)

export const reversed = ({
  width,
  ...args
}: Arg<typeof normal, 0> & {
  width: number
}) => (n: number) => width - normal(args)(n)
