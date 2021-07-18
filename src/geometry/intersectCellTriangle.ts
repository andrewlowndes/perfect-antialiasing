import { Aabb } from "../interfaces/Aabb";
import { Point } from "../interfaces/Point";
import { Triangle } from "../interfaces/Triangle";
import { add, clamp2, scale } from "../maths/point";
import { timeAtPos } from "../maths/common";
import { sort } from "../maths/sort";

export const intersectCellTriangle = (triangle: Triangle, cell: Aabb): Array<Point> => {
    //return polygonclip(triangle.points, cell);
  
    //branch-less creation of the intersected points of the triangle within the pixel
    const points: Array<Point> = [];
  
    const t1 = timeAtPos(triangle.p1.x, triangle.e1.x, cell.min.x);
    const t2 = timeAtPos(triangle.p1.x, triangle.e1.x, cell.max.x);
    const t3 = timeAtPos(triangle.p1.y, triangle.e1.y, cell.min.y);
    const t4 = timeAtPos(triangle.p1.y, triangle.e1.y, cell.max.y);
    points.push(...sort(t1, t2, t3, t4).map(t => clamp2(add(triangle.p1, scale(triangle.e1, t)), cell.min, cell.max)));
  
    const t5 = timeAtPos(triangle.p2.x, triangle.e2.x, cell.min.x);
    const t6 = timeAtPos(triangle.p2.x, triangle.e2.x, cell.max.x);
    const t7 = timeAtPos(triangle.p2.y, triangle.e2.y, cell.min.y);
    const t8 = timeAtPos(triangle.p2.y, triangle.e2.y, cell.max.y);
    points.push(...sort(t5, t6, t7, t8).map(t => clamp2(add(triangle.p2, scale(triangle.e2, t)), cell.min, cell.max)));
  
    const t9 = timeAtPos(triangle.p3.x, triangle.e3.x, cell.min.x);
    const t10 = timeAtPos(triangle.p3.x, triangle.e3.x, cell.max.x);
    const t11 = timeAtPos(triangle.p3.y, triangle.e3.y, cell.min.y);
    const t12 = timeAtPos(triangle.p3.y, triangle.e3.y, cell.max.y);
    points.push(...sort(t9, t10, t11, t12).map(t => clamp2(add(triangle.p3, scale(triangle.e3, t)), cell.min, cell.max)));
  
    return points;
};
