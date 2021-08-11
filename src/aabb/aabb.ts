import { Aabb } from '../interfaces/Aabb';
import { Point } from '../interfaces/Point';
import { max2, min2 } from '../maths/point';

export const aabb = (...points: Array<Point>): Aabb => {
    return {
        min: min2(...points),
        max: max2(...points)
    };
};
