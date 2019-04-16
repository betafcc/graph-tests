from operator import itemgetter

import networkx as nx


class Ego:
    def __init__(self, n, m, radius):
        self.n = n
        self.m = m
        self.radius = radius
        self.network = nx.generators.barabasi_albert_graph(n, m)
        self.target = max(self.network.degree(), key=itemgetter(1))[0]
        self.G = nx.ego_graph(self.network, self.target, radius=self.radius)

    def _ipython_display_(self):
        pos = nx.spring_layout(self.G)
        nx.draw(self.G, pos, node_color="b", node_size=50, with_labels=False)
        # Draw ego as large and red
        nx.draw_networkx_nodes(
            self.G, pos, nodelist=[self.target], node_size=300, node_color="r"
        )


def to_d3dict(G):
    return {
        "nodes": [{"id": n} for n in G.nodes],
        "links": [{"source": s, "target": t} for (s, t) in G.edges],
    }


def ego_json(n, m, radius):
    return to_d3dict(Ego(n, m, radius).G)


if __name__ == "__main__":
    print("Starting server at localhost:8000")
    print("Try: `curl localhost:8000/?n=100&m=2&r=2`")
    from sanic import Sanic
    from sanic.response import json
    from sanic_cors import CORS

    app = Sanic()
    CORS(app)

    @app.route("/")
    async def root(request):
        n = int(request.args.get("n", "1000"))
        m = int(request.args.get("m", "2"))
        r = int(request.args.get("r", "1"))

        return json(ego_json(n, m, r))

    app.run(host="localhost", port=8000, debug=True)
