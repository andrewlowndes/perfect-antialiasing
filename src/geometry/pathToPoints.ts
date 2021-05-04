import { Point } from "../interfaces/Point";
import { cubicBezierToPoints } from "./cubicBezierToPoints";
import { quadraticBezierToPoints } from "./quadraticBezierToPoints";

const blockRegexp = /(?=[astvzqmhlc])/gi;
const valuesRegexp = /(-?[0-9]*\.?[0-9]+)(?:e[-+]?\d+)?/ig;

export const pathToPoints = (pathStr: string, splitBoundary: number): Array<Array<Point>> => {
    const pathBlocks = pathStr.split(blockRegexp);

    const points: Array<Array<Point>> = [];

    if (pathBlocks.length) {
        let currentPolygon: Array<Point> = [];
        const currentPoint = { x: 0, y: 0 };

        while (pathBlocks.length) {
            const block = pathBlocks.shift();

            if (!block?.length) {
                continue;
            }

            const pathParts = block.substring(1).match(valuesRegexp) || [];

            const nextCommand = block[0];
            const normalisedCommand = nextCommand.toLowerCase();
            const isRelative = nextCommand === normalisedCommand;

            switch (normalisedCommand) {
                case 'l': //lineTo
                case 'm': //moveTo
                    while (pathParts.length) {
                        const nextPoint = { x: parseFloat(pathParts.shift()!), y: parseFloat(pathParts.shift()!) };
                        
                        if (isRelative) {
                            nextPoint.x += currentPoint.x;
                            nextPoint.y += currentPoint.y;
                        }

                        currentPolygon.push(nextPoint);
                        currentPoint.x = nextPoint.x;
                        currentPoint.y = nextPoint.y;
                    }
                    break;
                case 'h': //horizontalLineTo
                    while (pathParts.length) {
                        let nextX = parseFloat(pathParts.shift()!);
                        
                        if (isRelative) {
                            nextX += currentPoint.x;
                        }

                        currentPolygon.push({ x: nextX, y: currentPoint.y });
                        currentPoint.x = nextX;
                    }
                    break;
                case 'v': //verticalLineTo
                    while (pathParts.length) {
                        let nextY = parseFloat(pathParts.shift()!);
                        
                        if (isRelative) {
                            nextY += currentPoint.y;
                        }

                        currentPolygon.push({ x: currentPoint.x, y: nextY });
                        currentPoint.y = nextY;
                    }
                    break;
                case 'z': //closePath
                    const firstPoint = currentPolygon[0];
                    currentPolygon.push({ x: firstPoint.x, y: firstPoint.y });
                    points.push(currentPolygon);
                    currentPolygon = [];
                    currentPoint.x = 0;
                    currentPoint.y = 0;
                    
                    break;
                case 'c': //cubic bezier
                    while (pathParts.length) {
                        const secondPoint = { x: parseFloat(pathParts.shift()!), y: parseFloat(pathParts.shift()!) },
                            thirdPoint = { x: parseFloat(pathParts.shift()!), y: parseFloat(pathParts.shift()!) },
                            fourthPoint = { x: parseFloat(pathParts.shift()!), y: parseFloat(pathParts.shift()!) };
                        
                        if (isRelative) {
                            secondPoint.x += currentPoint.x;
                            secondPoint.y += currentPoint.y;
                            thirdPoint.x += currentPoint.x;
                            thirdPoint.y += currentPoint.y;
                            fourthPoint.x += currentPoint.x;
                            fourthPoint.y += currentPoint.y;
                        }
                        
                        currentPolygon.push(...cubicBezierToPoints({
                            p1: currentPoint,
                            p2: secondPoint,
                            p3: thirdPoint,
                            p4: fourthPoint
                        }, splitBoundary));

                        currentPoint.x = fourthPoint.x;
                        currentPoint.y = fourthPoint.y;
                    }
                    break;
                case 'q': //quadratic bezier
                    while (pathParts.length) {
                        const secondPoint = { x: parseFloat(pathParts.shift()!), y: parseFloat(pathParts.shift()!) },
                            thirdPoint = { x: parseFloat(pathParts.shift()!), y: parseFloat(pathParts.shift()!) };
                        
                        if (isRelative) {
                            secondPoint.x += currentPoint.x;
                            secondPoint.y += currentPoint.y;
                            thirdPoint.x += currentPoint.x;
                            thirdPoint.y += currentPoint.y;
                        }
                        
                        currentPolygon.push(...quadraticBezierToPoints({
                            p1: currentPoint,
                            p2: secondPoint,
                            p3: thirdPoint
                        }, splitBoundary));

                        currentPoint.x = thirdPoint.x;
                        currentPoint.y = thirdPoint.y;
                    }
                    break;
                case 's': //cubic bezier (shortcut)
                case 't': //quadratic bezier (shortcut)
                case 'a': //arc (skip)
                    console.log(normalisedCommand + ' is not implemented');
                    break;
            }
        }

        if (currentPolygon.length) {
            points.push(currentPolygon);
        }
    }

    //calculate the aabb based on the points
    return points;
};
