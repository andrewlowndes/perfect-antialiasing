import { vec2 } from 'gl-matrix';

import type { Triangle } from '../interfaces/Triangle';
import { aabb } from '../aabb/aabb';
import { polygonArea } from '../geometry/polygonArea';
import { clamp } from '../maths/common';
import { avg, ceil, floor, sub } from '../maths/point';
import { rasterise } from '../render/rasterise';
import { intersectCellTriangle } from '../geometry/intersectCellTriangle';

const p1 = vec2.fromValues(60, 160);
const p2 = vec2.fromValues(150, 170);
const p3 = vec2.fromValues(250, 130);

const triangle: Triangle = {
    p1,
    p2,
    p3,
    points: [p1, p2, p3],
    e1: sub(p2, p1),
    e2: sub(p3, p2),
    e3: sub(p1, p3)
};

triangle.center = avg(...triangle.points!);

const game = document.getElementById('game') as HTMLCanvasElement;
const g = game.getContext('2d');

if (!g) {
    throw new Error('Could not get canvas graphics :(');
}

//intersect the triangle with the cell and produce a polygon
game.onmousemove = function (e) {
    const bounds = game.getBoundingClientRect();
    const mousePos = vec2.fromValues(
        e.pageX - bounds.left - document.documentElement.scrollLeft,
        e.pageY - bounds.top - document.documentElement.scrollTop
    );

    const moveAmount = vec2.fromValues(mousePos[0] - triangle.center![0], mousePos[1] - triangle.center![1]);

    triangle.center![0] = mousePos[0];
    triangle.center![1] = mousePos[1];

    triangle.points!.forEach((point) => {
        point[0] += moveAmount[0];
        point[1] += moveAmount[1];
    });
};

const rotateAmount = 0.01;
const cosRotate = Math.cos(rotateAmount);
const sineRotate = Math.sin(rotateAmount);

const draw = () => {
    g.clearRect(0, 0, game.width, game.height);

    const imageData = g.getImageData(0, 0, game.width, game.height);
    const data = imageData.data;

    //lets rotate our triangle a little so we can appreciate the aliasing
    triangle.points!.forEach((point) => {
        const dx = point[0] - triangle.center![0];
        const dy = point[1] - triangle.center![1];

        point[0] = triangle.center![0] + dx * cosRotate - dy * sineRotate;
        point[1] = triangle.center![1] + dx * sineRotate + dy * cosRotate;
    });

    triangle.e1 = sub(triangle.p2, triangle.p1);
    triangle.e2 = sub(triangle.p3, triangle.p2);
    triangle.e3 = sub(triangle.p1, triangle.p3);

    const triangleAabb = aabb(...triangle.points!);

    triangle.aabb = {
        min: floor(triangleAabb.min),
        max: ceil(triangleAabb.max)
    };

    rasterise(triangle.points!, (minX, maxX, y, isInside) => {
        if (isInside) {
            let index = (game.width * y + minX) * 4;

            for (let x = minX; x <= maxX; x++, index += 4) {
                data[index] = 0;
                data[index + 1] = 0;
                data[index + 2] = 0;
                data[index + 3] = 255;
            }
        } else {
            const maxY = y + 1;
            let index = (game.width * y + minX) * 4;

            for (let x = minX; x <= maxX; x++, index += 4) {
                const cellFillPolygon = intersectCellTriangle(triangle, { min: [x, y], max: [x + 1, maxY] });

                const areaCoverage = clamp(polygonArea(cellFillPolygon), 0, 1);
                const alpha = areaCoverage * 255;

                data[index] = 0;
                data[index + 1] = 0;
                data[index + 2] = 0;
                data[index + 3] += alpha;
            }
        }
    });

    g.putImageData(imageData, 0, 0);

    requestAnimationFrame(draw);
};

requestAnimationFrame(draw);
