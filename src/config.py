from typing import Callable, Union
from dataclasses import dataclass, replace

from src.util import Margin
from src.scale import UnboundScale
from src.flow import FlowAlgorithm


_Number = Union[int, float]


@dataclass(frozen=True)
class NodeConfig:
    min_radius: _Number
    max_radius: _Number
    radius: UnboundScale[_Number, _Number]
    margin: Callable[[_Number], Margin]


@dataclass(frozen=True)
class RowConfig:
    top_padding: _Number
    column_flow: FlowAlgorithm


@dataclass(frozen=True)
class GridConfig:
    line_flow: FlowAlgorithm


@dataclass(frozen=True)
class Config:
    node_config: NodeConfig
    row_config: RowConfig
    grid_config: GridConfig
