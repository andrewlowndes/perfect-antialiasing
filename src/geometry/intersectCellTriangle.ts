import type { Aabb } from '../interfaces/Aabb';
import type { Point } from '../interfaces/Point';
import type { Triangle } from '../interfaces/Triangle';
import { add, clamp2, scale } from '../maths/point';
import { timeAtPos } from '../maths/common';
import { sort } from '../maths/sort';

export const intersectCellTriangle = (triangle: Triangle, cell: Aabb): Array<Point> => {
    const points: Array<Point> = [];

    const t1 = timeAtPos(triangle.p1[0], triangle.e1[0], cell.min[0]);
    const t2 = timeAtPos(triangle.p1[0], triangle.e1[0], cell.max[0]);
    const t3 = timeAtPos(triangle.p1[1], triangle.e1[1], cell.min[1]);
    const t4 = timeAtPos(triangle.p1[1], triangle.e1[1], cell.max[1]);
    points.push(
        ...sort(t1, t2, t3, t4).map((t) => clamp2(add(triangle.p1, scale(triangle.e1, t)), cell.min, cell.max))
    );

    const t5 = timeAtPos(triangle.p2[0], triangle.e2[0], cell.min[0]);
    const t6 = timeAtPos(triangle.p2[0], triangle.e2[0], cell.max[0]);
    const t7 = timeAtPos(triangle.p2[1], triangle.e2[1], cell.min[1]);
    const t8 = timeAtPos(triangle.p2[1], triangle.e2[1], cell.max[1]);
    points.push(
        ...sort(t5, t6, t7, t8).map((t) => clamp2(add(triangle.p2, scale(triangle.e2, t)), cell.min, cell.max))
    );

    const t9 = timeAtPos(triangle.p3[0], triangle.e3[0], cell.min[0]);
    const t10 = timeAtPos(triangle.p3[0], triangle.e3[0], cell.max[0]);
    const t11 = timeAtPos(triangle.p3[1], triangle.e3[1], cell.min[1]);
    const t12 = timeAtPos(triangle.p3[1], triangle.e3[1], cell.max[1]);
    points.push(
        ...sort(t9, t10, t11, t12).map((t) => clamp2(add(triangle.p3, scale(triangle.e3, t)), cell.min, cell.max))
    );

    return points;
};
