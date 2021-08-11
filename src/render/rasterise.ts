import type { Line } from '../interfaces/Line';
import type { LineEquation } from '../interfaces/LineEquation';
import type { Point } from '../interfaces/Point';
import { clamp } from '../maths/common';
import { solveLineX } from '../line/solveLineX';
import { max2, min2 } from '../maths/point';
import { getLineEquation } from '../line/getLineEquation';

interface LineRange {
    pStart: Point;
    pEnd: Point;
    xRange: Point;
    equation: LineEquation;
}

const getLineRange = (line: Line): LineRange => {
    let pStart: Point;
    let pEnd: Point;

    if (line.p1[1] < line.p2[1]) {
        pStart = line.p1;
        pEnd = line.p2;
    } else if (line.p1[1] > line.p2[1]) {
        pStart = line.p2;
        pEnd = line.p1;
    } else if (line.p1[0] < line.p2[0]) {
        pStart = line.p1;
        pEnd = line.p2;
    } else {
        pStart = line.p2;
        pEnd = line.p1;
    }

    return {
        pStart,
        pEnd,
        xRange: [Math.min(line.p1[0], line.p2[0]), Math.max(line.p1[0], line.p2[0])],
        equation: getLineEquation(line)
    };
};

export const rasterise = (
    points: Array<Point>,
    callback: (minX: number, maxX: number, y: number, isInside: boolean) => void
) => {
    const lines = [
        { p1: points[0], p2: points[1] },
        { p1: points[1], p2: points[2] },
        { p1: points[2], p2: points[0] }
    ];

    const minPos = min2(...points);
    const maxPos = max2(...points);

    const lineRanges = [getLineRange(lines[0]), getLineRange(lines[1]), getLineRange(lines[2])];

    let prevY = Math.floor(minPos[1]);
    const maxY = Math.ceil(maxPos[1]);

    if (maxY - prevY < 1) {
        callback(Math.floor(minPos[0]), Math.floor(maxPos[0]), prevY, false);
        return;
    }

    for (let y = prevY + 1; y <= maxY; y++) {
        //we just need to get four numbers, the outer min and max and inner min and max values
        const range = [-1, -1, -1, -1];

        for (let i = 0; i < 3; i++) {
            const line = lineRanges[i];

            if (line.pEnd[1] >= prevY && line.pStart[1] <= y) {
                let fromX = solveLineX(line.equation, prevY);

                if (isFinite(fromX)) {
                    fromX = clamp(fromX, line.xRange[0], line.xRange[1]);
                } else {
                    fromX = line.pStart[0];
                }

                fromX = Math.floor(fromX);

                let toX = solveLineX(line.equation, y);

                if (isFinite(toX)) {
                    toX = clamp(toX, line.xRange[0], line.xRange[1]);
                } else {
                    toX = line.pEnd[0];
                }
                toX = Math.floor(toX);

                const xRange = [Math.min(fromX, toX), Math.max(fromX, toX)];

                if (range[0] < 0) {
                    //first entry
                    range[0] = xRange[0];
                    range[1] = xRange[1];
                } else if (
                    (xRange[0] <= range[1]! + 1 && xRange[0] >= range[0] - 1) ||
                    (xRange[1] <= range[1]! + 1 && xRange[1] >= range[0] - 1)
                ) {
                    //extends the first entry
                    range[0] = Math.min(range[0], xRange[0]);
                    range[1] = Math.max(range[1], xRange[1]);
                } else if (range[2] < 0) {
                    //must be a new second range, determine if we need to swap or not to keep them ordered
                    if (xRange[0] > range[1]) {
                        range[2] = xRange[0];
                        range[3] = xRange[1];
                    } else {
                        range[2] = range[0];
                        range[3] = range[1];
                        range[0] = xRange[0];
                        range[1] = xRange[1];
                    }
                } else {
                    //extends the second range
                    range[2] = Math.min(range[2], xRange[0]);
                    range[3] = Math.max(range[3], xRange[1]);
                }
            }
        }

        //we have an inside
        if (range[2] > range[1]) {
            callback(range[0], range[1], prevY, false);
            callback(range[1] + 1, range[2] - 1, prevY, true);
            callback(range[2], range[3], prevY, false);
        } else {
            callback(range[0], Math.max(range[1], range[3]), prevY, false);
        }

        prevY = y;
    }
};
