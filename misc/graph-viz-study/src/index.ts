import * as d3 from 'd3'
import 'd3-selection-multi'

import * as util from './util'
import * as data from './data'
import * as layout from './layout'

Object.assign(window, util)
;(async () => {
  const { nodes, links } = await layout.force(await data.lesMiserables(), { center: [300, 300] })

  const svg = d3
    .select(document.body)
    .append('svg')
    .attrs({ viewBox: '0 0 600 600' })

  svg
    .append('g')
    .attrs({ stroke: '#999', 'stroke-weight': 2, 'stroke-opacity': 0.6 })
    .selectAll('line')
    .data(links)
    .join('line')
    .attrs({
      'stroke-width': d => Math.sqrt(d.value),
      x1: d => d.source.x,
      y1: d => d.source.y,
      x2: d => d.target.x,
      y2: d => d.target.y
    })

  svg
    .append('g')
    .attrs({ stroke: '#fff', 'stroke-width': 1.5 })
    .selectAll('circle')
    .data(nodes)
    .join('circle')
    .attrs({ r: 5, cx: d => d.x, cy: d => d.y })
})()
