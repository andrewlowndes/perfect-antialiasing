import type { Point } from './Point';

export interface Circle {
    pos: Point;
    radius: number;
    radiusSquared: number;
    halfRadiusSquared: number;
    area: number;
}
