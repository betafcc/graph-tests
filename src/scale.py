from __future__ import annotations
from typing import Generic, TypeVar, Sequence, Callable, Any

from dataclasses import dataclass, replace

A = TypeVar("A")
B = TypeVar("B")


@dataclass(frozen=True, eq=True)
class BoundScale(Generic[A, B]):
    domain: Sequence[A]
    range: Sequence[B]
    call: Callable[[Sequence[A], Sequence[B], A], B]

    def __call__(self, x: A) -> B:
        # https://github.com/python/mypy/issues/708
        return self.call(self.domain, self.range, x)  # type: ignore


@dataclass(frozen=True, eq=True)
class UnboundScale(Generic[A, B]):
    call: Callable[[Sequence[A], Sequence[B], A], B]

    def domain(self, domain: Sequence[A]) -> DomainBoundScale[A, B]:
        return DomainBoundScale(domain, self.call)  # type: ignore

    def range(self, range: Sequence[A]) -> RangeBoundScale[A, B]:
        return RangeBoundScale(range, self.call)  # type: ignore


@dataclass(frozen=True, eq=True)
class DomainBoundScale(Generic[A, B]):
    domain: Sequence[A]
    call: Callable[[Sequence[A], Sequence[B], A], B]

    def range(self, range: Sequence[B]) -> BoundScale[A, B]:
        return BoundScale(self.domain, range, self.call)  # type: ignore


@dataclass(frozen=True, eq=True)
class RangeBoundScale(Generic[A, B]):
    range: Sequence[B]
    call: Callable[[Sequence[A], Sequence[B], A], B]

    def domain(self, domain: Sequence[A]) -> BoundScale[A, B]:
        return BoundScale(domain, self.range, self.call)  # type: ignore


def _(domain: Sequence[float], range: Sequence[float], x: float) -> float:
    xi, xf = domain
    yi, yf = range

    return yi + x * (yf - yi) / (xf - xi)


linear = UnboundScale(_)
