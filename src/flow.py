from __future__ import annotations
from typing import Callable
from dataclasses import dataclass

from .mathtools import slow_count, plus_minus


@dataclass(frozen=True, eq=True)
class FlowAlgorithm:
    call: Callable[[int, int], int]

    def length(self, length: int) -> BoundFlowAlgorithm:
        return BoundFlowAlgorithm(length, self.call)  # type: ignore


@dataclass(frozen=True, eq=True)
class BoundFlowAlgorithm:
    length: int
    call: Callable[[int, int], int]

    def __call__(self, x: int) -> int:
        return self.call(self.length, x)  # type: ignore


normal = FlowAlgorithm(lambda length, x: int(x))

reversed = FlowAlgorithm(lambda length, x: normal.length(length)(length - 1 - x))

center = FlowAlgorithm(
    lambda length, x: normal.length(length)(
        (length - 1) // 2 - slow_count(x) * plus_minus(x)
    )
)

center_reversed = FlowAlgorithm(
    lambda length, x: normal.length(length)(
        (length) // 2 + slow_count(x) * plus_minus(x)
    )
)
