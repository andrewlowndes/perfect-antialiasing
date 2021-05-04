import { Aabb } from "../interfaces/Aabb";
import { Point } from "../interfaces/Point";

export const aabb = (points: Array<Point>): Aabb => {
    const firstPoint = points[0];
    const min = { x: firstPoint.x, y: firstPoint.y };
    const max = { x: firstPoint.x, y: firstPoint.y };

    for (let i=1; i<points.length; i++) {
        const point = points[i];
        
        min.x = Math.min(min.x, point.x);
        min.y = Math.min(min.y, point.y);
        max.x = Math.max(max.x, point.x);
        max.y = Math.max(max.y, point.y);
    }

    return { min, max };
};
