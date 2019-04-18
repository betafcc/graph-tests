import * as d3 from 'd3'

export const barabasiAlbert = (n, attachmentStrenght) => {
  const nodes = [{ id: 0, degree: 0 }]
  const links: { source: number; target: number }[] = []
  for (let i = 1; i < n; i++) {
    // Preferentially attach node to existing nodes
    // with high degree
    const indices = d3.range(0, i)

    // We weight which node to attach to by the node's degree
    const weights = nodes.map(d => (nodes.length == 1 ? 1 : d.degree)).map(d => Math.pow(d, attachmentStrenght))

    const attachmentNode = weightedRandom(indices, weights)
    // Add the link
    links.push({ source: i, target: attachmentNode })
    nodes[attachmentNode].degree += 1

    // Add the new node
    nodes.push({ id: i, degree: 1 })
  }

  return { nodes, links }
}

export const weightedRandom = (x, weights) => {
  const weightSum = d3.sum(weights)
  const normalizedWeights = weights.map(d => d / weightSum)

  let r = Math.random()
  for (let i = 0; i < x.length; i++) {
    if (r < normalizedWeights[i]) {
      return x[i]
    } else {
      r -= normalizedWeights[i]
    }
  }
}

export const objectScaleLinear = <T extends PropertyKey>(
  domain: Record<T, any> = {} as any,
  range: Record<T, any> = {} as any
) => {
  const scales = Object.entries(domain)
    .filter(([k, v]) => range[k])
    .map(
      ([k, v]) =>
        [
          k,
          d3
            .scaleLinear()
            .domain(v)
            .range(range[k])
        ] as [T, d3.ScaleLinear<any, any>]
    )

  const api = (obj: Record<T, any>) => scales.reduce((acc, [k, v]) => ({ ...acc, [k]: v(obj[k]) }), {})

  Object.defineProperty(api, 'scales', { get: () => scales.reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {}) })

  api.domain = <U extends PropertyKey>(domain: Record<U, any>) =>
    objectScaleLinear(domain, (range as any) as Record<U, any>)

  api.range = <U extends PropertyKey>(range: Record<U, any>) =>
    objectScaleLinear((domain as any) as Record<U, any>, range)

  return api
}
