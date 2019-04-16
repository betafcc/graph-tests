from typing import TypeVar, Type
from dataclasses import dataclass


N = TypeVar("N", bound="NonContentArea")


@dataclass(frozen=True, eq=True)
class NonContentArea:
    top: float
    right: float
    bottom: float
    left: float

    @classmethod
    def create(cls: Type[N], *args: float) -> N:
        length = len(args)

        if length == 1:
            all = args[0]
            return cls(all, all, all, all)
        elif length == 2:
            vertical, horizontal = args
            return cls(vertical, horizontal, vertical, horizontal)
        elif length == 3:
            top, horizontal, bottom = args
            return cls(top, horizontal, bottom, horizontal)
        elif length == 4:
            return cls(*args)
        else:
            raise TypeError("Invalid number of arguments")


@dataclass(frozen=True, eq=True)
class Margin(NonContentArea):
    pass


@dataclass(frozen=True, eq=True)
class Padding(NonContentArea):
    pass
