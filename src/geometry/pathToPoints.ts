import { vec2 } from "gl-matrix";
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
        const currentPoint = vec2.create();

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
                        const nextPoint = vec2.fromValues(parseFloat(pathParts.shift()!), parseFloat(pathParts.shift()!));
                        
                        if (isRelative) {
                            vec2.add(nextPoint, nextPoint, currentPoint);
                        }

                        currentPolygon.push(nextPoint);
                        vec2.copy(currentPoint, nextPoint);
                    }
                    break;
                case 'h': //horizontalLineTo
                    while (pathParts.length) {
                        let nextX = parseFloat(pathParts.shift()!);
                        
                        if (isRelative) {
                            nextX += currentPoint[0];
                        }

                        currentPolygon.push(vec2.fromValues(nextX, currentPoint[1]));
                        currentPoint[0] = nextX;
                    }
                    break;
                case 'v': //verticalLineTo
                    while (pathParts.length) {
                        let nextY = parseFloat(pathParts.shift()!);
                        
                        if (isRelative) {
                            nextY += currentPoint[1];
                        }

                        currentPolygon.push(vec2.fromValues(currentPoint[0], nextY));
                        currentPoint[1] = nextY;
                    }
                    break;
                case 'z': //closePath
                    const firstPoint = currentPolygon[0];
                    currentPolygon.push(vec2.clone(firstPoint));
                    points.push(currentPolygon);
                    currentPolygon = [];
                    vec2.zero(currentPoint);
                    
                    break;
                case 'c': //cubic bezier
                    while (pathParts.length) {
                        const secondPoint = vec2.fromValues(parseFloat(pathParts.shift()!), parseFloat(pathParts.shift()!));
                        const thirdPoint = vec2.fromValues(parseFloat(pathParts.shift()!), parseFloat(pathParts.shift()!));
                        const fourthPoint = vec2.fromValues(parseFloat(pathParts.shift()!), parseFloat(pathParts.shift()!));
                        
                        if (isRelative) {
                            vec2.add(secondPoint, secondPoint, currentPoint);
                            vec2.add(thirdPoint, thirdPoint, currentPoint);
                            vec2.add(fourthPoint, fourthPoint, currentPoint);
                        }
                        
                        currentPolygon.push(...cubicBezierToPoints({
                            p1: currentPoint,
                            p2: secondPoint,
                            p3: thirdPoint,
                            p4: fourthPoint
                        }, splitBoundary));

                        vec2.copy(currentPoint, fourthPoint);
                    }
                    break;
                case 'q': //quadratic bezier
                    while (pathParts.length) {
                        const secondPoint = vec2.fromValues(parseFloat(pathParts.shift()!), parseFloat(pathParts.shift()!));
                        const thirdPoint = vec2.fromValues(parseFloat(pathParts.shift()!), parseFloat(pathParts.shift()!));
                        
                        if (isRelative) {
                            vec2.add(secondPoint, secondPoint, currentPoint);
                            vec2.add(thirdPoint, thirdPoint, currentPoint);
                        }
                        
                        currentPolygon.push(...quadraticBezierToPoints({
                            p1: currentPoint,
                            p2: secondPoint,
                            p3: thirdPoint
                        }, splitBoundary));

                        vec2.copy(currentPoint, thirdPoint);
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
