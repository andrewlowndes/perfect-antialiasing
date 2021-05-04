import { Point } from "../interfaces/Point";

export const plotLines = (g: CanvasRenderingContext2D, points: Array<Point>) => {
    const firstPoint = points[0];

    g.moveTo(firstPoint.x, g.canvas.height - firstPoint.y);

    for (let i=0; i<points.length; i++) {
        const point = points[i];
        g.lineTo(point.x, g.canvas.height - point.y);
    }
};
