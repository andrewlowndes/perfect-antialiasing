import { CubicBezier } from "../interfaces/CubicBezier";
import { Point } from "../interfaces/Point";
import { dot, lerp, lerp2, normalize, sub } from "../maths/common";

export const cubicBezierToPoints = (bezier: CubicBezier, splitThreshold: number): Array<Point> => {
  const points = [{ x: bezier.p1.x, y: bezier.p1.y }, { x: bezier.p4.x, y: bezier.p4.y }];

  const cubicBezierSplit = (bezier: CubicBezier, min: number, max: number, insertIndex: number) => {
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

    if (dot(normalize(sub(prevPoint, pointOnCurve)), normalize(sub(nextPoint, pointOnCurve))) > splitThreshold) {
      cubicBezierSplit(bezier, time, max, insertIndex + 1);
      cubicBezierSplit(bezier, min, time, insertIndex);
    }
  }

  cubicBezierSplit(bezier, 0, 1, 1);

  return points;
};
