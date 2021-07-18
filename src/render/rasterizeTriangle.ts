import { vec2 } from "gl-matrix";
import { Point } from "../interfaces/Point";
import { Scanline } from "../interfaces/Scanline";
import { traverse, TraverseOptions } from "./traverse";

export const rasterizeTriangle = (points: Array<Point>, opts: TraverseOptions, strokeCallback: (pos: Point) => void, fillCallback: (pos: Point) => void): Record<number, Scanline> => {
  const lines = [
    { from: points[0], to: points[1] },
    { from: points[1], to: points[2] },
    { from: points[2], to: points[0] }
  ];
  const scanlines: Record<number, Scanline> = {};
  const visitedCells = new Set();

  lines.forEach((line) => {
    traverse(line.from, line.to, opts, (pos) => {
      let scanline = scanlines[pos[1]];
      const cellIndex = pos[0] + ',' + pos[1];

      if (visitedCells.has(cellIndex)) {
        return;
      }

      if (!scanline) {
        scanline = { min: pos[0], max: pos[0] };
      } else {
        scanline.min = Math.min(scanline.min, pos[0]);
        scanline.max = Math.max(scanline.max, pos[0]);
      }

      scanlines[pos[1]] = scanline;

      strokeCallback(pos);
      visitedCells.add(cellIndex);
    });
  });

  const coord = vec2.create();

  for (let y in scanlines) {
    if (scanlines.hasOwnProperty(y)) {
      coord[1] = parseInt(y, 10);

      const scanline = scanlines[y];

      //run a callback for all of the blocks that are between our points and not a boundary
      for (coord[0] = scanline.min + 1; coord[0] < scanline.max; coord[0]++) {
        if (!visitedCells.has(coord[0] + ',' + coord[1])) {
          fillCallback(coord);
        }
      }
    }
  }

  return scanlines;
}