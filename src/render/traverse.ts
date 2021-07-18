import { Point } from "../interfaces/Point";
import { EPSILON, fract, negFract } from "../maths/common";
import { divide, floor, multiply, sign, sub } from "../maths/point";

export interface TraverseOptions {
    pos: Point;
    cellSize: Point;
}

export const traverse = (from: Point, to: Point, options: TraverseOptions, cb: (cellPos: Point) => boolean | void) => {
    const pos = sub(from, options.pos);
    const dir = sub(to, from);
    const cell = floor(divide(pos, options.cellSize));
    const stop_cell = floor(divide(sub(to, options.pos), options.cellSize));

    if (Math.abs(dir.y) < EPSILON) {
        for (let x = Math.min(cell.x, stop_cell.x), maxX = Math.max(cell.x, stop_cell.x); x <= maxX; x++) {
            cell.x = x;
            if (cb(cell) === false) {
                return false;
            }
        }
        return;
    }

    if (Math.abs(dir.x) < EPSILON) {
        for (let y = Math.min(cell.y, stop_cell.y), maxY = Math.max(cell.y, stop_cell.y); y <= maxY; y++) {
            cell.y = y;
            if (cb(cell) === false) {
                return false;
            }
        }
        return;
    }

    const step = sign(dir);

    const t_delta = multiply(divide(step, dir), options.cellSize);
    const t_pos = divide(pos, options.cellSize);

    const t_max = {
        x: (step.x > 0.0 ? t_delta.x * negFract(t_pos.x) : t_delta.x * fract(t_pos.x)),
        y: (step.y > 0.0 ? t_delta.y * negFract(t_pos.y) : t_delta.y * fract(t_pos.y))
    };

    while (true) {
        if (cb(cell) === false) {
            return false;
        }

        if (t_max.x > 1.0 && t_max.y > 1.0) {
            return;
        }

        if (t_max.x < t_max.y) {
            cell.x += step.x;
            t_max.x += t_delta.x;
        } else {
            cell.y += step.y;
            t_max.y += t_delta.y;
        }
    }
};
