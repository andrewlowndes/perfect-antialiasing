import { Point } from "../interfaces/Point";

export const polygonPath = (g: CanvasRenderingContext2D, points: Array<Point>) => {
    if (!points || !points.length) {
      return;
    }
  
    const firstPoint = points[0];
    g.moveTo(firstPoint[0], g.canvas.height - firstPoint[1]);
  
    for (let i = 1; i < points.length; i++) {
      const point = points[i];
      g.lineTo(point[0], g.canvas.height - point[1]);
    }
  
    g.closePath();
};
