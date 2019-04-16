from __future__ import annotations
from itertools import chain
from dataclasses import dataclass, replace, field

import src.flow
from src.util import Margin
from src.config import RowConfig, NodeConfig
from src.vis import Element
from src.flow import BoundFlowAlgorithm


@dataclass(frozen=True)
class Row:
    width: float
    node_radius: float
    node_margin: float
    flow: BoundFlowAlgorithm

    column_count: int
    fit_width: float
    horizontal_padding: float

    @classmethod
    def create(
        cls, width: float, node_radius: float, node_margin: float, flow: str
    ) -> Row:
        _column_count = column_count(width, node_margin, node_radius)
        _fit_width = fit_width(_column_count, node_margin, node_radius)
        _horizontal_padding = horizontal_padding(width, node_margin, node_radius)

        return Row(
            width,
            node_radius,
            node_margin,
            getattr(src.flow, flow).length(_column_count),
            _column_count,
            _fit_width,
            _horizontal_padding,
        )

    def cx(self, i):
        return (
            self.horizontal_padding
            + self.node_margin
            + self.node_radius
            + i * 2 * self.node_radius
            + i * self.node_margin
        )

    def _ipython_display_(self):
        from IPython.display import display

        height = 2 * self.node_radius + 2 * self.node_margin
        cy = height / 2
        r = self.node_radius

        display(
            Element(
                "svg",
                *chain.from_iterable(
                    (
                        Element(
                            "circle",
                            cx=self.cx(i),
                            cy=cy,
                            r=r,
                            fill="none",
                            stroke_width="2",
                            stroke="black",
                        ),
                        Element(
                            "text",
                            str(i),
                            x=self.cx(self.flow(i)),
                            y=cy,
                            text_anchor="middle",
                            alignment_baseline="central",
                        ),
                    )
                    for i in range(self.column_count)
                ),
                width=self.width,
                heigth=height,
                style=f"border: 1px solid black; height: {height}; width: {self.width};",
            )
        )


def column_count(width, node_margin, node_radius):
    return (width - node_margin) // (node_margin + 2 * node_radius)


def fit_width(column_count, node_margin, node_radius):
    return node_margin * (column_count + 1) + 2 * node_radius * column_count


def horizontal_padding(width, node_margin, node_radius):
    return 0.5 * (
        width
        - fit_width(
            column_count(width, node_margin, node_radius), node_margin, node_radius
        )
    )
