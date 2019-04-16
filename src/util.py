from dataclasses import dataclass


@dataclass(frozen=True)
class Margin:
    horizontal: int
    vertical: int
