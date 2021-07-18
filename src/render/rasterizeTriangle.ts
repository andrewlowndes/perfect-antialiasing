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
      let scanline = scanlines[pos.y];
      const cellIndex = pos.x + ',' + pos.y;

      if (visitedCells.has(cellIndex)) {
        return;
      }

      if (!scanline) {
        scanline = { min: pos.x, max: pos.x };
      } else {
        scanline.min = Math.min(scanline.min, pos.x);
        scanline.max = Math.max(scanline.max, pos.x);
      }

      scanlines[pos.y] = scanline;

      strokeCallback(pos);
      visitedCells.add(cellIndex);
    });
  });

  const coord = { x: 0, y: 0 };
  for (let y in scanlines) {
    if (scanlines.hasOwnProperty(y)) {
      coord.y = parseInt(y, 10);

      const scanline = scanlines[y];

      //run a callback for all of the blocks that are between our points and not a boundary
      for (coord.x = scanline.min + 1; coord.x < scanline.max; coord.x++) {
        if (!visitedCells.has(coord.x + ',' + coord.y)) {
          fillCallback(coord);
        }
      }
    }
  }

  return scanlines;
}