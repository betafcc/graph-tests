import * as itertools from './itertools'

Object.assign(window, itertools)

// import * as d3 from 'd3'
// import 'd3-selection-multi'

// import * as data from './data'

// async function main() {
//   const { nodes, links } = await data.lesMiserables()

//   const svg = d3
//     .select(document.body)
//     .append('svg')
//     .attrs({
//       viewBox: '0 0 100 100'
//     })

//   const grid = scaleGrid({ width: 100, height: 100, columns: 5, rows: Math.floor(nodes.length / 5) })

//   nodes.forEach((el, i) => {
//     el.x = grid.x(i % 5)
//     el.y = grid.y(Math.floor(i / 5))
//   })

//   svg
//     .append('g')
//     .selectAll('circle')
//     .data(nodes)
//     .join('circle')
//     .attrs({
//       cx: d => d.x + 3,
//       cy: d => d.y + 3,
//       r: 3,
//       fill: 'red'
//     })
// }

// const scaleGrid = ({ rows, columns, width, height }) => ({
//   x: d3
//     .scaleLinear()
//     .domain([0, columns])
//     .range([0, width]),
//   y: d3
//     .scaleLinear()
//     .domain([0, rows])
//     .range([0, height])
// })

// main()
