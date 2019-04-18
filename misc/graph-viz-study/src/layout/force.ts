import { forceSimulation, forceLink, forceManyBody, forceCenter } from 'd3-force'

export const force = async ({ nodes: _nodes, links: _links }, props = {}) => {
  const { center, tick } = { center: [0, 0], tick: 300, ...props }

  const [nodes, links] = [_nodes.map(d => Object.create(d)), _links.map(d => Object.create(d))]

  const simulation = forceSimulation(nodes)
    .force('link', forceLink(links).id(d => d.id))
    .force('charge', forceManyBody())
    .force('center', forceCenter(...center))

  simulation.stop()
  simulation.tick(tick)

  return { nodes, links }
}
