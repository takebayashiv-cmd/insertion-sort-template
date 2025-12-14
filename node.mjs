export class Node {
  constructor(x, y, width, height, label, id) {
    this.svgNS = "http://www.w3.org/2000/svg";

    this.g = document.createElementNS(this.svgNS, "g");
    this.g.id = id;
    this.g.setAttribute("transform", `translate(${x}, ${y})`);
    this.g.setAttribute("data-x", x);
    this.g.setAttribute("data-y", y);

    this.rect = document.createElementNS(this.svgNS, "rect");
    this.rect.setAttribute("x", 0);
    this.rect.setAttribute("y", 0);
    this.rect.setAttribute("width", width);
    this.rect.setAttribute("height", height);
    this.rect.setAttribute("fill", "#eeeeee");
    this.rect.setAttribute("stroke", "black");
    this.rect.setAttribute("stroke-width", 2);

    this.text = document.createElementNS(this.svgNS, "text");
    this.text.setAttribute("x", width / 2);
    this.text.setAttribute("y", height / 2);
    this.text.setAttribute("text-anchor", "middle");
    this.text.setAttribute("dominant-baseline", "middle");
    this.text.setAttribute("fill", "black");
    this.text.textContent = label;

    this.g.appendChild(this.rect);
    this.g.appendChild(this.text);
  }

  draw(svg_area) {
    svg_area.appendChild(this.g);
  }

  highlight(color) {
    this.rect.setAttribute("stroke", color);
  }

  async bounce() {
    const x1 = Number(this.g.getAttribute("data-x"));
    const y1 = Number(this.g.getAttribute("data-y"));
    await this.moveTo(x1, y1 - 25, 400);
    await this.moveTo(x1, y1, 400);
  }

  moveTo(endX, endY, duration) {
    return new Promise((resolve) => {
      let startTime = null;
      const startX = Number(this.g.getAttribute("data-x"));
      const startY = Number(this.g.getAttribute("data-y"));
      let currentX = startX;
      let currentY = startY;

      const step = (timestamp) => {
        if (startTime === null) {
          startTime = timestamp;
        }
        let progress = Math.min((timestamp - startTime) / duration, 1);

        currentX = startX + (endX - startX) * progress;
        currentY = startY + (endY - startY) * progress;

        this.g.setAttribute("transform", `translate(${currentX}, ${currentY})`);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          this.g.setAttribute("data-x", endX);
          this.g.setAttribute("data-y", endY);
          //console.log('this.g', this.g);
          resolve(); // animation is done
        }
      };
      requestAnimationFrame(step);
    });
  }

  swap(nd, duration) {
    return new Promise((resolve) => {
      let startTime = null;
      const x1 = Number(this.g.getAttribute("data-x"));
      const y1 = Number(this.g.getAttribute("data-y"));
      const x2 = Number(nd.g.getAttribute("data-x"));
      const y2 = Number(nd.g.getAttribute("data-y"));
      let currentX1 = x1;
      let currentY1 = y1;
      let currentX2 = x2;
      let currentY2 = y2;
      const endX1 = x2;
      const endY1 = y2;
      const endX2 = x1;
      const endY2 = y1;

      const step = (timestamp) => {
        if (startTime === null) {
          startTime = timestamp;
        }
        let progress = Math.min((timestamp - startTime) / duration, 1);

        currentX1 = x1 + (x2 - x1) * progress;
        currentY1 = y1 + (y2 - y1) * progress;
        currentX2 = x2 + (x1 - x2) * progress;
        currentY2 = y2 + (y1 - y2) * progress;

        this.g.setAttribute(
          "transform",
          `translate(${currentX1}, ${currentY1})`
        );
        nd.g.setAttribute("transform", `translate(${currentX2}, ${currentY2})`);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          this.g.setAttribute("data-x", x2);
          this.g.setAttribute("data-y", y2);
          nd.g.setAttribute("data-x", x1);
          nd.g.setAttribute("data-y", y1);
          resolve();
        }
      };
      requestAnimationFrame(step);
    });
  }
}
