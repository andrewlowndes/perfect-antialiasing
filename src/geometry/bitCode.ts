import { Aabb } from "../interfaces/Aabb";
import { Point } from "../interfaces/Point";

/**
 * bit code reflects the point position relative to the bbox:
 *         left  mid  right
 *    top  1001  1000  1010
 *    mid  0001  0000  0010
 * bottom  0101  0100  0110
*/
export const bitCode = (p: Point, bbox: Aabb): number => {
    let code = 0;
  
    if (p.x < bbox.min.x) code |= 1; // left
    else if (p.x > bbox.max.x) code |= 2; // right
  
    if (p.y < bbox.min.y) code |= 4; // bottom
    else if (p.y > bbox.max.y) code |= 8; // top
  
    return code;
};
