import { scaleLinear } from 'd3-scale'

// [minRadius, maxRadius] ->
// { line, columns, column } -> { cx, cy, r }

// //  -> r
// const r = (numberOfLines, maxRadius, minRadius) =>
//   d3
//     .scaleLinear()
//     .domain([0, numberOfLines - 1])
//     .range([maxRadius, minRadius])

// (numberOfNodes, width, maxRadius, minRadius, radiusDistance) => numberOfLines

export const grid = ({ totalNodes, width, marginAsRadiusRatio, maxRadius, minRadius }) => {
  const r = scaleLinear()
    .domain([0, totalLines({ width, marginAsRadiusRatio, maxRadius, minRadius, totalNodes }) - 1])
    .range([maxRadius, minRadius])

  return { r }
}

const fitWidth = ({ radius, margin, n }) => margin * (n + 1) + 2 * radius * n

const numberOfNodes = ({ width, margin, radius }) => Math.floor((width - margin) / (margin + 2 * radius))

const totalLines = ({ width, marginAsRadiusRatio, maxRadius, minRadius, totalNodes }) => {
  const radius = (maxRadius + minRadius) / 2

  return Math.ceil(totalNodes / numberOfNodes({ width, radius, margin: marginAsRadiusRatio * radius }))
}

interface GridProps {
  width: number
  length: number
  minRadius: number
  maxRadius: number
  marginRatio: number
}

class Grid {
  constructor(readonly props: GridProps) {}
}

interface RowProps {
  radius: number
  margin: number
}

class Row {
  constructor(readonly props: RowProps) {}

  extraMargin = (width: number) => {
    return width - this.minWidth(this.maxLength(width))
  }

  minWidth = (length: number) => {
    const { radius, margin } = this.props
    return margin * (length + 1) + 2 * radius * length
  }

  maxLength = (width: number) => {
    const { radius, margin } = this.props
    return Math.floor((width - margin) / (margin + 2 * radius))
  }

  positions = (props: { length: number } | { width: number }) => Cxs.from({ ...props, row: this })
}

class Cxs {
  static from(props: ({ row: Row } | RowProps) & ({ length: number } | { width: number })) {}
}

interface Penis {
  flow: 'normal' | 'reverse' | 'center'
  extraMargin: number
  margin: number
  radius: number
  length: number
}
