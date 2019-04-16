def plus_minus(n: int) -> int:
    """
    n | plus_minus(n)
    -----------------
    0 | 1
    1 | -1
    2 | 1
    3 | -1
    4 | 1
    5 | -1
    """
    return (-1) ** n


def zero_two(n: int) -> int:
    """
    n | zero_two(n)
    -----------------
    0 | 0
    1 | 2
    2 | 0
    3 | 2
    4 | 0
    5 | 2
    """
    return 1 - plus_minus(n)


def slow_count(n: int) -> int:
    """
    n | slow_count(n)
    -----------------
    0 | 0
    1 | 1
    2 | 1
    3 | 2
    4 | 2
    5 | 3
    """
    return int(n / 2 + zero_two(n) / 4)
