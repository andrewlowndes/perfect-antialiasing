import type { Point } from '../interfaces/Point';

export const plotLines = (g: CanvasRenderingContext2D, points: Array<Point>) => {
    const firstPoint = points[0];

    g.moveTo(firstPoint[0], g.canvas.height - firstPoint[1]);

    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        g.lineTo(point[0], g.canvas.height - point[1]);
    }
};
