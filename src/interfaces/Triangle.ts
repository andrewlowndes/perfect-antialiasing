import type { Aabb } from './Aabb';
import type { Point } from './Point';

export interface Triangle {
    p1: Point;
    p2: Point;
    p3: Point;

    //directions from each point to the next
    e1: Point;
    e2: Point;
    e3: Point;

    points?: Array<Point>;
    colour?: {
        x: number;
        y: number;
        z: number;
    };

    center?: Point;

    aabb?: Aabb;
}
