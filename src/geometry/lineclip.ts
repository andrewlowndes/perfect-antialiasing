import { intersect } from "./intersect";
import { Aabb } from "../interfaces/Aabb";
import { Point } from "../interfaces/Point";
import { bitCode } from "./bitCode";

/**
 * Cohen-Sutherland line clipping algorithm, adapted to efficiently
 * handle polylines rather than just segments
 */
export const lineclip = (points: Array<Point>, bbox: Aabb, result: Array<Array<Point>>): Array<Array<Point>> => {
    const len = points.length;
    let codeA = bitCode(points[0], bbox);
    let part: Array<Point> = [];
    let codeB: number;
    let lastCode: number;
  
    if (!result) result = [];
  
    for (let i = 1; i < len; i++) {
      let a: Point = points[i - 1];
      let b: Point = points[i];
      codeB = lastCode = bitCode(b, bbox);
  
      while (true) {
        if (!(codeA | codeB)) { 
          // accept
          part.push(a);
  
          if (codeB !== lastCode) { 
            // segment went outside
            part.push(b);
  
            if (i < len - 1) { 
              // start a new line
              result.push(part);
              part = [];
            }
          } else if (i === len - 1) {
            part.push(b);
          }
          break;
        } else if (codeA & codeB) {
          // trivial reject
          break;
        } else if (codeA) {
          // a outside, intersect with clip edge
          a = intersect(a, b, codeA, bbox)!;
          codeA = bitCode(a, bbox);
        } else {
          // b outside
          b = intersect(a, b, codeB, bbox)!;
          codeB = bitCode(b, bbox);
        }
      }
  
      codeA = lastCode;
    }
  
    if (part.length) result.push(part);
  
    return result;
};
