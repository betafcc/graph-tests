import operator
from itertools import count, chain

from toolz import curried, pipe

from src import row
from src.node import NodeConfig


def row_count(width, margin_function, radius_scale, node_count):
    return pipe(
        count(1),  # possible row_counts
        curried.filter(
            lambda row_count: node_count
            <= node_count(width, margin_function, radius_scale, row_count)
        ),  # filter by row_counts that will fit node_count
        next,  # get first
    )


def node_count(width, margin_function, radius_scale, row_count):
    return pipe(
        range(row_count),  # line numbers
        curried.map(radius_scale.domain([0, row_count])),  # radius for that line
        curried.map(
            lambda radius: row.column_count(
                width, margin_function(radius)["horizontal"], radius
            )
        ),  # length of that row
        sum,  # total
    )


class Grid:
    def __init__(self, width, node_config: NodeConfig, node_count: int):
        self.width = width
        self.node_config = node_config
        self.node_count = node_count

        self.row_count = row_count(
            self.width,
            self.node_config.margin_function,
            self.node_config.radius_scale,
            self.node_count,
        )

        self.radius_scale = self.node_config.radius_scale.domain([0, self.row_count])

        self.rows = pipe(
            range(self.row_count),
            curried.map(self.bound_radius_scale),
            curried.map(lambda radius: row.Row(width, margin_ratio * radius, radius)),
            list,
        )
        self.coordinates_lookup = pipe(
            self.rows,
            operator.attrgetter("length"),
            curried.accumulate(operator.add),
            lambda it: chain([0], it),
            curried.sliding_window(2),
            curried.map(lambda t: range(*t)),
            list,
        )

    def coordinates(self, index: int):
        assert index in range(
            0, self.node_count
        ), "can only give coordinates for indexes in [0, node_count)"

        return pipe(
            enumerate(self.coordinates_lookup),
            curried.filter(lambda t: index in t[1]),
            next,
            lambda t: (t[0], t[1].index(index)),
        )
