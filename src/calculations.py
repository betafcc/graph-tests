from src.non_content_area import Margin


def bundle_size(count: int, size: float, margin: float) -> float:
    return count * size + (count + 1) * margin
