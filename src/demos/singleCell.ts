import { vec2 } from 'gl-matrix';

import type { Point } from '../interfaces/Point';
import type { Triangle } from '../interfaces/Triangle';

import { polygonArea } from '../geometry/polygonArea';
import { clamp } from '../maths/common';
import { add, avg, scale, sub } from '../maths/point';
import { polygonPath } from '../render/polygonPath';
import { intersectCellTriangle } from '../geometry/intersectCellTriangle';

const p1 = vec2.fromValues(117.006649999999997, 155.76694999999998);
const p2 = vec2.fromValues(216.7078, 155.76);
const p3 = vec2.fromValues(216.7078, 255.42639999999997);

const triangle: Triangle = {
    p1,
    p2,
    p3,

    e1: sub(p2, p1),
    e2: sub(p3, p2),
    e3: sub(p1, p3)
};

triangle.points = [triangle.p1, triangle.p2, triangle.p3];

triangle.center = avg(...triangle.points);

interface Cell {
    min: Point;
    size: Point;
    max: Point;
}

const cellMin = vec2.fromValues(100, 50);
const cellSize = vec2.fromValues(250, 250);

const cell: Cell = {
    min: cellMin,
    size: cellSize,
    max: add(cellMin, cellSize)
};

const game = document.getElementById('game') as HTMLCanvasElement;
const g = game.getContext('2d');

if (!g) {
    throw new Error('No canvas :(');
}

const scaleAmount = 0.1;

//intersect the triangle with the cell and produce a polygon
let cellFillPolygon, areaCoverage, cellColour;

game.onwheel = function (e) {
    if (e.deltaY > 0) {
        vec2.scale(cell.size, cell.size, 1.0 - scaleAmount);
    } else if (e.deltaY < 0) {
        vec2.scale(cell.size, cell.size, 1.0 + scaleAmount);
    }

    const delta = scale(sub(cell.size, sub(cell.max, cell.min)), 0.5);

    vec2.subtract(cell.min, cell.min, delta);
    vec2.add(cell.max, cell.max, delta);

    return false;
};

game.onmousemove = function (e) {
    const bounds = game.getBoundingClientRect();
    const mousePos = vec2.fromValues(
        e.pageX - bounds.left - document.documentElement.scrollLeft,
        game.height - (e.pageY - bounds.top - document.documentElement.scrollTop)
    );

    const halfSize = scale(cell.size, 0.5);

    vec2.copy(cell.min, sub(mousePos, halfSize));
    vec2.copy(cell.max, add(mousePos, halfSize));
};

const rotateAmount = 0.01;

const cellArea = (cell: Cell) => cell.size[0] * cell.size[1];

const draw = () => {
    triangle.points!.forEach((point) => {
        vec2.rotate(point, point, triangle.center!, rotateAmount);
    });

    triangle.e1 = sub(triangle.p2, triangle.p1);
    triangle.e2 = sub(triangle.p3, triangle.p2);
    triangle.e3 = sub(triangle.p1, triangle.p3);

    cellFillPolygon = intersectCellTriangle(triangle, cell);
    areaCoverage = clamp(polygonArea(cellFillPolygon) / cellArea(cell), 0, 1); //clamp due to rounding errors
    cellColour = Math.floor((1.0 - areaCoverage) * 255);

    g.clearRect(0, 0, game.width, game.height);

    //fill in the cell using a greyscale based on the area coverage
    g.fillStyle = 'rgb(' + cellColour + ',' + cellColour + ',' + cellColour + ')';
    g.fillRect(cell.min[0], game.height - cell.min[1] - cell.size[1], cell.size[0], cell.size[1]);

    //draw our cell
    g.strokeStyle = 'green';
    g.strokeRect(cell.min[0], game.height - cell.min[1] - cell.size[1], cell.size[0], cell.size[1]);

    //draw our triangle
    g.strokeStyle = 'red';
    g.beginPath();
    polygonPath(g, [triangle.p1, triangle.p2, triangle.p3]);
    g.stroke();

    //draw our polygon
    g.strokeStyle = 'blue';
    g.beginPath();
    polygonPath(g, cellFillPolygon);
    g.stroke();

    requestAnimationFrame(draw);
};

requestAnimationFrame(draw);
