import { vec2 } from 'gl-matrix';

import type { Point } from '../interfaces/Point';
import type { Triangle } from '../interfaces/Triangle';

import { polygonArea } from '../geometry/polygonArea';
import { clamp } from '../maths/common';
import { add, avg, scale, sub } from '../maths/point';
import { polygonPath } from '../render/polygonPath';
import { intersectCellTriangle } from '../geometry/intersectCellTriangle';

//helpers
const makeTriangle = (p1: Point, p2: Point, p3: Point): Triangle => ({
    p1,
    p2,
    p3,
    e1: sub(p2, p1),
    e2: sub(p3, p2),
    e3: sub(p1, p3),
    points: [p1, p2, p3],
    center: avg(p1, p2, p3)
});

const makeCell = (min: Point, size: Point): Cell => ({ min, size, max: add(min, size) });

const makeTest = (min: Point, size: Point, p1: Point, p2: Point, p3: Point, offset: Point = [0, 0]): [Cell, Triangle] => [
    makeCell(add(min, offset), size), 
    makeTriangle(add(p1, offset), add(p2, offset), add(p3, offset))
];

interface Cell {
    min: Point;
    size: Point;
    max: Point;
}

const scaleAmount = 0.1;
const rotateAmount = 0.01;

const tests: Array<[Cell, Triangle]> = [
    makeTest([100, 50], [50, 50], [717.01, 355.77], [816.7078, 355.76], [816.7078, 455.43]),
];

const cellStart: Point = [0, 0];
const cellSize: Point = [40, 40];
const cellSpacing: Point = [25, 25];

const triangleTests: Array<[Point, Point, Point]> = [
    [[-10, -10], [20, 30], [50, -10]], //two out, three sides
    [[-10, -10], [20, 10], [50, -10]], //two out, one side
    [[-10, -10], [20, 20], [50, -10]], //diagonals intersect
    [[-10, 0], [20, 0], [50, 0]], //degenerate, line
    [[10, -10], [20, 20], [30, -10]], //outside, one in
    [[10, 0], [20, 20], [30, 0]], //on edge, touch
    [[0, 0], [20, 20], [40, 0]], //on edge, corners
    [[-10, 0], [20, 20], [50, 0]], //on edge, overflow
    [[-10, 0], [20, 2], [50, 0]], //on edge, overflow, tight
    [[10, -20], [20, -20], [20, -10]], //outside, right-angle triangle
    [[10, 20], [20, 20], [20, 10]], //inside, right-angle triangle,
    [[0, 0], [0, 0], [0, 0]], //degenerate, point
    [[-10, 10], [20, 50], [50, 10]], ///center, three sides
    [[-10, 10], [20, 50], [45, -5]], ///four sides
];

const cellCenter = add(cellStart, scale(cellSize, 0.5));
const numRotations = 8;
const rotStep = Math.PI * 2.0 / numRotations;

triangleTests.forEach((triangleTest, triangleIndex) => {
    //create tests for each rotation of a triangle
    for (let rotateIndex=0; rotateIndex<numRotations; rotateIndex++) {
        const [p1, p2, p3] = triangleTest.map(p => vec2.rotate(vec2.create(), p, cellCenter, rotateIndex * rotStep));
        const offset: Point = [rotateIndex * (cellSize[0] + cellSpacing[0]) + cellSpacing[0], triangleIndex * (cellSize[1] + cellSpacing[1]) + cellSpacing[1]];
        tests.push(makeTest(cellStart, cellSize, p1, p2, p3, offset));
    }
});

const cell = tests[0][0];
const triangle = tests[0][1];

const game = document.getElementById('game') as HTMLCanvasElement;
const g = game.getContext('2d')!;

//allow the first test cell to be dragged and resized
game.onwheel = (e) => {
    vec2.scale(cell.size, cell.size, 1.0 + Math.sign(e.deltaY) * scaleAmount);
    const delta = scale(sub(cell.size, sub(cell.max, cell.min)), 0.5);
    vec2.subtract(cell.min, cell.min, delta);
    vec2.add(cell.max, cell.max, delta);

    return false;
};

game.onmousemove = (e) => {
    const bounds = game.getBoundingClientRect();
    const mousePos = vec2.fromValues(
        e.pageX - bounds.left - document.documentElement.scrollLeft,
        game.height - (e.pageY - bounds.top - document.documentElement.scrollTop)
    );

    const halfSize = scale(cell.size, 0.5);

    vec2.copy(cell.min, sub(mousePos, halfSize));
    vec2.copy(cell.max, add(mousePos, halfSize));
};

const draw = () => {
    g.clearRect(0, 0, game.width, game.height);

    //rotate the first triangle in demo
    triangle.points!.forEach((point) => {
        vec2.rotate(point, point, triangle.center!, rotateAmount);
    });

    triangle.e1 = sub(triangle.p2, triangle.p1);
    triangle.e2 = sub(triangle.p3, triangle.p2);
    triangle.e3 = sub(triangle.p1, triangle.p3);
    
    //draw all of our scenarios
    for (const [cell, triangle] of tests) {
        const cellFillPolygon = intersectCellTriangle(triangle, cell);
        const areaCoverage = clamp(polygonArea(cellFillPolygon) / (cell.size[0] * cell.size[1]), 0, 1);
        const cellColour = Math.floor((1.0 - areaCoverage) * 255);

        //fill in the cell using a greyscale based on the area coverage
        g.fillStyle = 'rgb(' + cellColour + ',' + cellColour + ',' + cellColour + ')';
        g.fillRect(cell.min[0], game.height - cell.min[1] - cell.size[1], cell.size[0], cell.size[1]);

        //draw our cell outline
        g.strokeStyle = 'green';
        g.strokeRect(cell.min[0], game.height - cell.min[1] - cell.size[1], cell.size[0], cell.size[1]);

        //draw our triangle
        g.strokeStyle = 'red';
        g.fillStyle = 'red';
        triangle.points!.forEach(point => {
            g.beginPath();
            g.arc(point[0], game.height - point[1], 0.5, 0, Math.PI*2);
            g.fill();
        });
        g.beginPath();
        polygonPath(g, [triangle.p1, triangle.p2, triangle.p3]);
        g.stroke();

        //draw our polygon
        g.strokeStyle = 'blue';
        g.fillStyle = 'blue';
        cellFillPolygon.forEach(point => {
            g.beginPath();
            g.arc(point[0], game.height - point[1], 0.5, 0, Math.PI*2);
            g.fill();
        });
        g.beginPath();
        polygonPath(g, cellFillPolygon);
        g.stroke();
    }

    requestAnimationFrame(draw);
};

requestAnimationFrame(draw);
