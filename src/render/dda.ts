import { Point } from "../interfaces/Point";
import { abs, add, adds, divide, equal, floor, inRange, multiply, normalize, sign, sub } from "../maths/common";

export interface DdaOptions {
    pos: Point;
    cellSize: Point;
    maxSteps: number;
    min: Point;
    max: Point;
}

export const dda = (p1: Point, p2: Point, opts: DdaOptions, cb: (cellPos: Point) => boolean | void) => {
    const dir = normalize(sub(p2, p1));
    const relativePos = sub(p1, opts.pos);
    const cellPos = floor(divide(relativePos, opts.cellSize));
    const tDelta = abs(divide(opts.cellSize, dir));
    const step = sign(dir);
    const distToClosestCell = multiply(opts.cellSize, add(cellPos, sign(adds(step, 1))));
    const tMax = divide(sub(distToClosestCell, relativePos), dir);
    const stopCell = floor(divide(sub(p2, opts.pos), opts.cellSize));
    
    for (let i = 0; i < opts.maxSteps; i++) {
        if (opts.min && opts.max && !inRange(cellPos, opts.min, opts.max)) {
            return true;
        }
        if (cb(cellPos) === false) {
            return false;
        }
        if (equal(stopCell, cellPos)) {
            return true;
        }
        if (tMax.x < tMax.y) {
            tMax.x += tDelta.x;
            cellPos.x += step.x;
        }
        else {
            tMax.y += tDelta.y;
            cellPos.y += step.y;
        }
    }
    return true;
};
