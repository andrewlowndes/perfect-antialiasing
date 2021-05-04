import { Aabb } from "../interfaces/Aabb";
import { Point } from "../interfaces/Point";
import { intersect } from "./intersect";
import { bitCode } from "./bitCode";

// Sutherland-Hodgeman polygon clipping algorithm
export const polygonclip = (points: Array<Point>, bbox: Aabb): Array<Point> => {
    let result = new Array<Point>();
  
    // clip against each side of the clip rectangle
    for (let edge = 1; edge <= 8; edge *= 2) {
      result = [];
      let prev = points[points.length - 1];
      let prevInside = !(bitCode(prev, bbox) & edge);
  
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const inside = !(bitCode(p, bbox) & edge);
  
        // if segment goes through the clip window, add an intersection
        if (inside !== prevInside) {
          result.push(intersect(prev, p, edge, bbox)!);
        }
  
        if (inside) {
          result.push(p); // add a point if it's inside
        }
  
        prev = p;
        prevInside = inside;
      }
  
      points = result;
  
      if (!points.length) break;
    }
  
    return result;
};
