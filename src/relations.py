from toolz import curried, pipe


def chart_width(main_area_width, side_area_width):
    return main_area_width + side_area_width


def chart_height(main_area_height):
    return main_area_height


def main_area_height(row_count, row_height):
    return sum(map(row_height, range(row_count)))


def row_height(row_upper_area_height, row_main_area_height):
    return row_upper_area_height + row_main_area_height


def row_main_area_height(radius, row_main_area_vertical_padding):
    return 2 * radius + 2 * row_main_area_vertical_padding
