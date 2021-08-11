import type { Point } from '../interfaces/Point';
import { determinant2 } from '../maths/point';

export const polygonAreaSigned = (points: Array<Point>): number => {
    if (!points.length) {
        return 0;
    }

    const lastIndex = points.length - 1;
    let area = 0;

    for (let i = 0; i < lastIndex; i++) {
        area += determinant2(points[i], points[i + 1]);
    }

    area += determinant2(points[lastIndex], points[0]);

    return area / 2;
};

export const polygonArea = (points: Array<Point>): number => {
    return Math.abs(polygonAreaSigned(points));
};
