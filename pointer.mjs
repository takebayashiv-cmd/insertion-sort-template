export class Pointer {
  constructor(x1, y1, x2, y2, arrowsize, color, markerId) {
    this.svgNS = "http://www.w3.org/2000/svg";

    this.pointerDefs = document.createElementNS(this.svgNS, "defs");
    this.arrow = document.createElementNS(this.svgNS, "marker");
    this.arrow.setAttribute("id", markerId);
    this.arrow.setAttribute("markerWidth", arrowsize);
    this.arrow.setAttribute("markerHeight", arrowsize);
    this.arrow.setAttribute("refX", arrowsize / 2);
    this.arrow.setAttribute("refY", arrowsize / 2);
    this.arrow.setAttribute("orient", "auto");

    const path = document.createElementNS(this.svgNS, "path");
    const d_val = `M 0 0 L ${arrowsize} ${arrowsize / 2} L 0 ${arrowsize} z`;
    path.setAttribute("d", d_val);
    path.setAttribute("fill", color);

    this.arrow.appendChild(path);
    this.pointerDefs.appendChild(this.arrow);

    this.line = document.createElementNS(this.svgNS, "line");
    this.line.setAttribute("x1", x1);
    this.line.setAttribute("y1", y1);
    this.line.setAttribute("x2", x2);
    this.line.setAttribute("y2", y2);
    this.line.setAttribute("stroke", color);
    this.line.setAttribute("stroke-width", 2);
    this.line.setAttribute("marker-end", `url(#${markerId})`);
  }

  draw(svg_area) {
    svg_area.appendChild(this.pointerDefs);
    svg_area.appendChild(this.line);
  }
}

class Line {
  constructor(x1, y1, x2, y2, color) {
    this.svgNS = "http://www.w3.org/2000/svg";
    this.line = document.createElementNS(this.svgNS, "line");
    this.line.setAttribute("x1", x1);
    this.line.setAttribute("y1", y1);
    this.line.setAttribute("x2", x2);
    this.line.setAttribute("y2", y2);
    this.line.setAttribute("stroke", color);
    this.line.setAttribute("stroke-width", 2);
  }
}

export class TwoHeadPointer {
  constructor(
    x1,
    y1,
    x2,
    y2,
    x3,
    y3,
    x4,
    y4,
    arrowsize,
    startcol,
    middlecol,
    endcol,
    startId,
    endId
  ) {
    this.svgNS = "http://www.w3.org/2000/svg";
    this.start = new Pointer(x1, y1, x2, y2, arrowsize, startcol, startId);
    this.middle = new Line(x1, y1, x3, y3, middlecol);
    this.end = new Pointer(x3, y3, x4, y4, arrowsize, endcol, endId);
  }

  draw(svg_area) {
    svg_area.appendChild(this.start.pointerDefs);
    svg_area.appendChild(this.end.pointerDefs);
    svg_area.appendChild(this.start.line);
    svg_area.appendChild(this.middle.line);
    svg_area.appendChild(this.end.line);
  }

  slideEnd(x) {
    console.log(this.end.line);
    this.end.line.setAttribute("x1", x);
    this.end.line.setAttribute("x2", x);
    this.middle.line.setAttribute("x2", x);
  }

  setVisible(bool) {
    if (bool === true) {
      this.start.line.setAttribute("visibility", "visible");
      this.middle.line.setAttribute("visibility", "visible");
      this.end.line.setAttribute("visibility", "visible");
    } else {
      this.start.line.setAttribute("visibility", "hidden");
      this.middle.line.setAttribute("visibility", "hidden");
      this.end.line.setAttribute("visibility", "hidden");
    }
  }
}
