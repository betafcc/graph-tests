import * as d3 from 'd3'
import 'd3-selection-multi'
import svg from '@betafcc/svg'

import * as util from './util'

import './style.styl'

const url =
  'https://gist.githubusercontent.com/mbostock/4062045/raw/5916d145c8c048a6e3086915a6be464467391c62/miserables.json'

const chart = ({ nodes, links }) => svgNode => {
  const svg = d3.select(svgNode)

  const simulation = d3
    .forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id))
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(300, 300))

  simulation.tick(1)

  const link = svg
    .append('g')
    .attrs({ stroke: '#999', 'stroke-weight': 2, 'stroke-opacity': 0.6 })
    .selectAll('line')
    .data(links)
    .join('line')
    .attrs({ 'stroke-width': d => Math.sqrt(d.value) })

  const node = svg
    .append('g')
    .attrs({ stroke: '#fff', 'stroke-width': 1.5 })
    .selectAll('circle')
    .data(nodes)
    .join('circle')
    .attrs({ r: 5, fill: color })

  node.append('title').text(d => d.id)

  node.attrs({
    cx: d => d.x,
    cy: d => d.y
  })

  link.attrs({
    x1: d => d.source.x,
    y1: d => d.source.y,
    x2: d => d.target.x,
    y2: d => d.target.y
  })

  setTimeout(() => {
    simulation.tick(60)
    simulation.stop()

    link.transition(5000).attrs({
      x1: d => d.source.x,
      y1: d => d.source.y,
      x2: d => d.target.x,
      y2: d => d.target.y
    })

    node.transition(5000).attrs({
      cx: d => d.x,
      cy: d => d.y
    })
  }, 1000)
}

const color = (() => {
  const scale = d3.scaleOrdinal(d3.schemeCategory10)
  return ({ group }) => scale(group)
})()

async function main() {
  const data = await fetch(url).then(r => r.json())

  svg
    .attrs({ viewBox: '0 0 600 600' })
    .call(chart(data))
    .appendTo(document.body)
}

main()
