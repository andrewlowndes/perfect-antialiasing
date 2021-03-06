import { vec2 } from 'gl-matrix';

import type { Point } from '../interfaces/Point';
import type { QuadraticBezier } from '../interfaces/QuadraticBezier';
import { lerp } from '../maths/common';
import { dot, lerp2, normalize, sub } from '../maths/point';

export const quadraticBezierToPoints = (bezier: QuadraticBezier, splitBoundary: number): Array<Point> => {
    const points = [vec2.clone(bezier.p1), vec2.clone(bezier.p3)];

    const quadraticBezierSplit = (bezier: QuadraticBezier, min: number, max: number, insertIndex: number) => {
        const time = lerp(min, max, 0.5);

        const pointOnCurve = lerp2(lerp2(bezier.p1, bezier.p2, time), lerp2(bezier.p2, bezier.p3, time), time);

        const prevPoint = points[insertIndex - 1];
        const nextPoint = points[insertIndex];

        points.splice(insertIndex, 0, pointOnCurve);

        if (dot(normalize(sub(prevPoint, pointOnCurve)), normalize(sub(nextPoint, pointOnCurve))) > splitBoundary) {
            quadraticBezierSplit(bezier, time, max, insertIndex + 1);
            quadraticBezierSplit(bezier, min, time, insertIndex);
        }
    };

    quadraticBezierSplit(bezier, 0, 1, 1);

    return points;
};
