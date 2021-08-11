import type { Line } from '../interfaces/Line';
import type { LineEquation } from '../interfaces/LineEquation';
import { sub } from '../maths/point';

export const getLineEquation = (line: Line): LineEquation => {
    const direction = sub(line.p2, line.p1);

    const gradient = direction[1] / direction[0];
    const intersect = line.p1[1] - line.p1[0] * gradient;

    return {
        gradient,
        intersect
    };
};
