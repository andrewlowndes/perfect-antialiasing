import { vec2 } from "gl-matrix";
import { Aabb } from "../interfaces/Aabb";
import { Point } from "../interfaces/Point";

// intersect a segment against one of the 4 lines that make up the bbox
export const intersect = (a: Point, b: Point, edge: number, bbox: Aabb): Point | undefined => {
    if (edge & 8) { // top
      return vec2.fromValues(
        a[0] + (b[0] - a[0]) * (bbox.max[1] - a[1]) / (b[1] - a[1]),
        bbox.max[1]
      );
    }
  
    if (edge & 4) { // bottom
      return vec2.fromValues(
        a[0] + (b[0] - a[0]) * (bbox.min[1] - a[1]) / (b[1] - a[1]),
        bbox.min[1]
      );
    }
  
    if (edge & 2) { // right
      return vec2.fromValues(
        bbox.max[0],
        a[1] + (b[1] - a[1]) * (bbox.max[0] - a[0]) / (b[0] - a[0])
      );
    }
  
    if (edge & 1) { // left
      return vec2.fromValues(
        bbox.min[0],
        a[1] + (b[1] - a[1]) * (bbox.min[0] - a[0]) / (b[0] - a[0])
      );
    }
};
