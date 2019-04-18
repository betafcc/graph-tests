import * as math from '../math'
// width = padding + 2 * radius * length + (length + 1) * margin
// fitWidth = width - padding
// positions = { padding / 2 + nodeMargin + radius + (2 * radius + margin) * index | index <- [0, length) }

interface Row {
  width: number
  fitWidth: number
  padding: number // width - fitWidth
}

// export const columns = (o: {width: number, radius: number, margin: number}) =>

// (width / 2) + (2 * radius + margin) * index * (-1) ^ (index)

type FlowArgs = {
  normal: { x: number }
  center: { y: string }
  reversed: never
  'center-reversed': never
}

// export const position = (flow: Flow = 'normal') => ({ width, length, margin, radius, flow }) => {
//   return (n: number): number => {}
// }
