from typing import Union, List
from dataclasses import dataclass

from .flow import FlowAlgorithm
from .scale import RangeBoundScale
from .non_content_area import Margin


Id = Union[int, str]


@dataclass(frozen=True, eq=True)
class Node:
    id: Id


@dataclass(frozen=True, eq=True)
class Link:
    source: Id
    target: Id


@dataclass(frozen=True, eq=True)
class Graph:
    nodes: List[Node]
    links: List[Link]


@dataclass(frozen=True, eq=True)
class Config:
    width: float
    link_width: float
    link_margin: Margin

    node_radius: RangeBoundScale[int, float]
    node_margin: RangeBoundScale[int, Margin]
    label_font_size: RangeBoundScale[int, float]
    label_height: RangeBoundScale[int, float]

    row_flow: FlowAlgorithm
    column_flow: FlowAlgorithm
