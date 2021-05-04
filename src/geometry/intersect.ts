import { Aabb } from "../interfaces/Aabb";
import { Point } from "../interfaces/Point";

// intersect a segment against one of the 4 lines that make up the bbox
export const intersect = (a: Point, b: Point, edge: number, bbox: Aabb): Point | undefined => {
    if (edge & 8) { // top
      return {
        x: a.x + (b.x - a.x) * (bbox.max.y - a.y) / (b.y - a.y),
        y: bbox.max.y
      };
    }
  
    if (edge & 4) { // bottom
      return {
        x: a.x + (b.x - a.x) * (bbox.min.y - a.y) / (b.y - a.y),
        y: bbox.min.y
      };
    }
  
    if (edge & 2) { // right
      return {
        x: bbox.max.x,
        y: a.y + (b.y - a.y) * (bbox.max.x - a.x) / (b.x - a.x)
      };
    }
  
    if (edge & 1) { // left
      return {
        x: bbox.min.x,
        y: a.y + (b.y - a.y) * (bbox.min.x - a.x) / (b.x - a.x)
      };
    }
};
