class Element:
    def __init__(self, tag, *children, **attrs):
        self.tag = tag
        self.children = children
        self.attrs = attrs

    def __str__(self):
        attrs = " ".join(k.replace("_", "-") + f'="{v}"' for k, v in self.attrs.items())
        body = "".join(map(str, self.children))
        return f"<{self.tag} {attrs}>{body}</{self.tag}>"

    def _repr_html_(self):
        return str(self)
