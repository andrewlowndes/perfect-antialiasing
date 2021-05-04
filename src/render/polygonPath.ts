import { Point } from "../interfaces/Point";

export const polygonPath = (g: CanvasRenderingContext2D, points: Array<Point>) => {
    if (!points || !points.length) {
      return;
    }
  
    const firstPoint = points[0];
    g.moveTo(firstPoint.x, g.canvas.height - firstPoint.y);
  
    for (let i = 1; i < points.length; i++) {
      const point = points[i];
      g.lineTo(point.x, g.canvas.height - point.y);
    }
  
    g.closePath();
};
