export class D3Graph<Id extends string | number, N extends { id: Id }, L extends { source: N['id']; target: N['id'] }> {
  constructor(readonly nodes: N[], readonly links: L[]) {}

  static create<Id extends string | number, N extends { id: Id }, L extends { source: N['id']; target: N['id'] }>({
    nodes,
    links
  }: {
    nodes: N[]
    links: L[]
  }) {
    return new D3Graph(nodes, links)
  }
}
