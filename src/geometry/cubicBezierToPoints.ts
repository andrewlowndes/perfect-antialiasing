import { vec2 } from "gl-matrix";
import { CubicBezier } from "../interfaces/CubicBezier";
import { Point } from "../interfaces/Point";
import { lerp } from "../maths/common";
import { dot, lerp2, normalize, sub } from "../maths/point";

export const cubicBezierToPoints = (bezier: CubicBezier, splitThreshold: number): Array<Point> => {
  const points = [vec2.clone(bezier.p1), vec2.clone(bezier.p4)];

  const cubicBezierSplit = (bezier: CubicBezier, min: number, max: number, insertIndex: number, first = false) => {
    const time = lerp(min, max, 0.5);
    const midLerp = lerp2(bezier.p2, bezier.p3, time);

    const pointOnCurve = lerp2(
      lerp2(
        lerp2(bezier.p1, bezier.p2, time),
        midLerp,
        time
      ),
      lerp2(
        midLerp,
        lerp2(bezier.p3, bezier.p4, time),
        time
      ),
      time
    );

    const prevPoint = points[insertIndex - 1];
    const nextPoint = points[insertIndex];

    points.splice(insertIndex, 0, pointOnCurve);

    if (dot(normalize(sub(prevPoint, pointOnCurve)), normalize(sub(nextPoint, pointOnCurve))) > splitThreshold || first) {
      cubicBezierSplit(bezier, time, max, insertIndex + 1);
      cubicBezierSplit(bezier, min, time, insertIndex);
    }
  }

  cubicBezierSplit(bezier, 0, 1, 1, true);

  return points;
};
