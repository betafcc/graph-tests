import * as React from 'react'
import * as d3 from 'd3'
import 'd3-selection-multi'

import * as data from './data'
import * as layout from './layout'

export default class App extends React.Component {
  simulation: d3.Simulation<{}, undefined>
  state = {
    nodes: [],
    links: []
  }

  componentDidMount = async () => {
    const { nodes, links } = await layout.force(await data.ego(100, 2, 2), { center: [300, 300] })

    this.setState({ links, nodes })
  }

  renderLink = ({ source, target }, i) => <line key={i} x1={source.x} y1={source.y} x2={target.x} y2={target.y} />

  renderNode = ({ x, y, group }, i) => <circle key={i} cx={x} cy={y} r={5} />

  render = () => (
    <svg viewBox='0 0 600 600'>
      <g stroke='#999' stroke-weight={2} strokeOpacity={0.6}>
        {this.state.links.map((el, i) => this.renderLink(el, i))}
      </g>
      <g stroke='#fff' strokeWidth={1.5}>
        {this.state.nodes.map((el, i) => this.renderNode(el, i))}
      </g>
    </svg>
  )
}
