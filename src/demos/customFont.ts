import { Font, load } from 'opentype.js';

import type { Point } from '../interfaces/Point';
import type { Triangle } from '../interfaces/Triangle';

import { pathToPoints } from '../geometry/pathToPoints';
import { pointsToPolygons } from '../geometry/pointsToPolygon';
import { polygonArea } from '../geometry/polygonArea';
import { sub } from '../maths/point';
import { rasterise } from '../render/rasterise';
import { intersectCellTriangle } from '../geometry/intersectCellTriangle';
import { clamp } from '../maths/common';

const game = document.getElementById('game') as HTMLCanvasElement;
const game2 = document.getElementById('game2') as HTMLCanvasElement;
const zoomInput = document.getElementById('zoomInput') as HTMLInputElement;
const textString = document.getElementById('textString') as HTMLInputElement;
const xPosition = document.getElementById('xPosition') as HTMLInputElement;
const yPosition = document.getElementById('yPosition') as HTMLInputElement;
const g = game.getContext('2d');
const g2 = game2.getContext('2d', { alpha: true });

if (!g || !g2) {
    throw new Error('Could not get canvas graphics :(');
}

g.imageSmoothingEnabled = false;
g2.imageSmoothingQuality = 'high';
g2.imageSmoothingEnabled = true;

let font: Font;
const polygons: Array<Array<Triangle>> = [];
const allPoints: Array<Array<Point>> = [];

let scaler = parseFloat(zoomInput.value);
const fontSize = 52;
let xPos = 0;
let yPos = 0;
const fontName = 'Timeless Regular';
let text = textString.value;

const splitBoundary = -0.99;
const fontWidth = fontSize; //18;

xPosition.addEventListener('input', () => {
    xPos = parseFloat(xPosition.value);
    requestAnimationFrame(draw);
});

yPosition.addEventListener('input', () => {
    yPos = parseFloat(yPosition.value);
    requestAnimationFrame(draw);
});

textString.addEventListener('input', () => {
    text = textString.value;
    loadChars();
});

zoomInput.addEventListener('input', () => {
    scaler = parseFloat(zoomInput.value);
    requestAnimationFrame(draw);
});

const originalPointPos = new Map<Point, Point>();

const loadChars = () => {
    const myChars = font.stringToGlyphs(text);

    polygons.length = 0;
    allPoints.length = 0;
    let charPos = 0;

    myChars.forEach((myChar) => {
        const aPath = myChar.getPath(charPos, 100, fontSize);
        const points = pathToPoints(aPath.toPathData(5), splitBoundary);

        charPos += ((myChar.advanceWidth || 0) / 1000) * fontWidth;

        const charPolygons = pointsToPolygons(points);

        allPoints.push(...points);
        polygons.push(...charPolygons);
    });

    originalPointPos.clear();

    allPoints.forEach((points) =>
        points.forEach((point) => {
            originalPointPos.set(point, {
                ...point
            });
        })
    );

    requestAnimationFrame(draw);
};

const draw = () => {
    g.clearRect(0, 0, game.width, game.height);

    allPoints.forEach((points) =>
        points.forEach((point) => {
            const originalPosition = originalPointPos.get(point)!;
            point[0] = originalPosition[0] * scaler + xPos;
            point[1] = originalPosition[1] * scaler + yPos;
        })
    );

    const imageData = g.getImageData(0, 0, game.width, game.height);
    const data = imageData.data;

    polygons.forEach((polygon) => {
        polygon.forEach((triangle) => {
            triangle.e1 = sub(triangle.p2, triangle.p1);
            triangle.e2 = sub(triangle.p3, triangle.p2);
            triangle.e3 = sub(triangle.p1, triangle.p3);

            rasterise(triangle.points!, (minX, maxX, y, isInside) => {
                let index = (game.width * y + minX) * 4;

                if (isInside) {
                    for (let x = minX; x <= maxX; x++, index += 4) {
                        data[index] = 0;
                        data[index + 1] = 0;
                        data[index + 2] = 0;
                        data[index + 3] = 255;
                    }
                } else {
                    const maxY = y + 1;

                    for (let x = minX; x <= maxX; x++, index += 4) {
                        const cellFillPolygon = intersectCellTriangle(triangle, { min: [x, y], max: [x + 1, maxY] });
                        const coverage = clamp(polygonArea(cellFillPolygon), 0, 1);

                        data[index] = 0;
                        data[index + 1] = 0;
                        data[index + 2] = 0;
                        data[index + 3] = Math.min(data[index + 3] + Math.floor(coverage * 255), 255);
                    }
                }
            });
        });
    });

    g.putImageData(imageData, 0, 0);

    //draw cpu rendering text as a side-by-side comparison
    g2.clearRect(0, 0, game2.width, game2.height);

    g2.fillStyle = 'black';
    g2.font = fontSize * scaler + 'px ' + fontName;
    g2.fillText(text, xPos, scaler * 100 + yPos);
};

const start = async () => {
    font = await load('./media/Timeless.ttf');
    loadChars();
};

start();
