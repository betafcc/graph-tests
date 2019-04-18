import { scaleLinear } from 'd3-scale'

export type Id = number | string | symbol
export type Node<T> = { id: Id } & T
export type Link<R> = { source: Id; target: Id } & R

export interface GridProps<T, R> {
  nodes: Node<T>[]
  links: Link<R>[]
}

type GridCalculate = {
  width: number
  height: number
}

class Grid<T, R> {
  constructor(readonly props: GridProps<T, R>) {}

  calculate() {}
}

// export const grid = Grid.fromD3Graph

// export const grid = async ({ nodes: _nodes, links: _links }, { columns, width, height }) => {
//   const xScale = scaleLinear()
//     .domain([0, columns])
//     .range([0, width])

//   const yScale = scaleLinear()
//     .domain([0, Math.ceil(_nodes.length / columns)])
//     .range([0, height])

//   const nodes = _nodes.map(d => Object.create(d))
//   const links = _links.map(d => Object.create(d))

//   const nodesLookup = {}
//   nodes.forEach((el, i) => {
//     el.x = xScale(i % columns)
//     el.y = yScale(Math.floor(i / columns))

//     nodesLookup[el.id] = el
//   })

//   links.forEach(el => {
//     el.source = nodesLookup[el.source]
//     el.target = nodesLookup[el.target]
//   })

//   return { nodes, links }
// }
