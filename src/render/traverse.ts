import { vec2 } from "gl-matrix";
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

    if (Math.abs(dir[1]) < EPSILON) {
        for (let x = Math.min(cell[0], stop_cell[0]), maxX = Math.max(cell[0], stop_cell[0]); x <= maxX; x++) {
            cell[0] = x;
            if (cb(cell) === false) {
                return false;
            }
        }
        return;
    }

    if (Math.abs(dir[0]) < EPSILON) {
        for (let y = Math.min(cell[1], stop_cell[1]), maxY = Math.max(cell[1], stop_cell[1]); y <= maxY; y++) {
            cell[1] = y;
            if (cb(cell) === false) {
                return false;
            }
        }
        return;
    }

    const step = sign(dir);

    const t_delta = multiply(divide(step, dir), options.cellSize);
    const t_pos = divide(pos, options.cellSize);

    const t_max = vec2.fromValues(
        (step[0] > 0.0 ? t_delta[0] * negFract(t_pos[0]) : t_delta[0] * fract(t_pos[0])),
        (step[1] > 0.0 ? t_delta[1] * negFract(t_pos[1]) : t_delta[1] * fract(t_pos[1]))
    );

    while (true) {
        if (cb(cell) === false) {
            return false;
        }

        if (t_max[0] > 1.0 && t_max[1] > 1.0) {
            return;
        }

        if (t_max[0] < t_max[1]) {
            cell[0] += step[0];
            t_max[0] += t_delta[0];
        } else {
            cell[1] += step[1];
            t_max[1] += t_delta[1];
        }
    }
};
