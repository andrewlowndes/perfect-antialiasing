import { Point } from "../interfaces/Point";
import { Triangle } from "../interfaces/Triangle";

import { intersectCellTriangle } from "../geometry/intersectCellTriangle";
import { polygonArea } from "../geometry/polygonArea";
import { polygonclip } from "../geometry/polygonclip";
import { add, avg, clamp, sub } from "../maths/common";
import { polygonPath } from "../render/polygonPath";

const p1 = { x: 117.006649999999997, y: 155.76694999999998 };
const p2 = { x: 216.7078, y: 155.76 };
const p3 = { x: 216.7078, y: 255.42639999999997 };

const triangle: Triangle = {
  p1,
  p2,
  p3,

  e1: sub(p2, p1),
  e2: sub(p3, p2),
  e3: sub(p1, p3)
};

triangle.points = [triangle.p1, triangle.p2, triangle.p3];

triangle.center = avg(triangle.points);

interface Cell {
  min: Point;
  size: Point;
  max: Point;
}

const cellMin = { x: 100, y: 50 };
const cellSize = { x: 250, y: 250 };

const cell: Cell = {
  min: cellMin,
  size: cellSize,
  max: add(cellMin, cellSize)
};

const game = document.getElementById("game") as HTMLCanvasElement;
const g = game.getContext("2d");

if (!g) {
  throw new Error('No canvas :(');
}

const scaleAmount = 0.1;

//intersect the triangle with the cell and produce a polygon
let cellFillPolygon, areaCoverage, cellColour;

game.onwheel = function(e) {
  if (e.deltaY > 0 ) {
    cell.size.x *= (1.0 - scaleAmount);
    cell.size.y *= (1.0 - scaleAmount);
  } else if (e.deltaY < 0) {
    cell.size.x *= (1.0 + scaleAmount);
    cell.size.y *= (1.0 + scaleAmount);
  }
  
  const deltaWidth = (cell.size.x - (cell.max.x - cell.min.x)) / 2;
  const deltaHeight = (cell.size.y - (cell.max.y - cell.min.y)) / 2;
  
  cell.min.x -= deltaWidth;
  cell.min.y -= deltaHeight;
  cell.max.x += deltaWidth;
  cell.max.y += deltaHeight;

  return false;
};

game.onmousemove = function(e) {
  const bounds = game.getBoundingClientRect();
  const mousePos = {
    x: e.pageX - bounds.left - document.documentElement.scrollLeft, 
    y: game.height - (e.pageY - bounds.top - document.documentElement.scrollTop)
  };
  
  const halfWidth = cell.size.x / 2;
  const halfHeight = cell.size.y / 2;
  
  cell.min.x = mousePos.x - halfWidth;
  cell.min.y = mousePos.y - halfHeight;
  cell.max.x = mousePos.x + halfWidth;
  cell.max.y = mousePos.y + halfHeight;
}

const rotateAmount = 0.01;
const cosRotate = Math.cos(rotateAmount);
const sineRotate = Math.sin(rotateAmount);

const cellArea = (cell: Cell) => cell.size.x * cell.size.y;

const draw = () => {
  triangle.points!.forEach((point) => {
    const dx = point.x - triangle.center!.x;
    const dy = point.y - triangle.center!.y;

    point.x = triangle.center!.x + (dx * cosRotate) - (dy * sineRotate);
    point.y = triangle.center!.y + (dx * sineRotate) + (dy * cosRotate);
  });

  triangle.e1 = sub(triangle.p2, triangle.p1);
  triangle.e2 = sub(triangle.p3, triangle.p2);
  triangle.e3 = sub(triangle.p1, triangle.p3);
  
  cellFillPolygon = intersectCellTriangle(triangle, cell);
  areaCoverage = clamp(Number(polygonArea(cellFillPolygon).toFixed(5)) / cellArea(cell), 0, 1); //clamp due to rounding errors
  cellColour = Math.floor((1.0 - areaCoverage) * 255);

  const correctPolygon = polygonclip(triangle.points!, cell);
  const correctAreaCoverage = clamp(Number(polygonArea(correctPolygon).toFixed(5)) / cellArea(cell), 0, 1); //clamp due to rounding errors

  if (correctAreaCoverage!==areaCoverage) {
    console.error('Incorrect area, expected ' + correctAreaCoverage + ' but got ' + areaCoverage);
  }

  g.clearRect(0, 0, game.width, game.height);
  
  //fill in the cell using a greyscale based on the area coverage
  g.fillStyle = "rgb(" + cellColour + "," + cellColour  + "," + cellColour  + ")";
  g.fillRect(cell.min.x, game.height-cell.min.y-cell.size.y, cell.size.x, cell.size.y);
  
  //draw our cell
  g.strokeStyle = "green";
  g.strokeRect(cell.min.x, game.height-cell.min.y-cell.size.y, cell.size.x, cell.size.y);
  
  //draw our triangle
  g.strokeStyle = "red";
  g.beginPath();
  polygonPath(g, [triangle.p1, triangle.p2, triangle.p3]);
  g.stroke();
  
  //draw our polygon
  g.strokeStyle = "blue";
  g.beginPath();
  polygonPath(g, cellFillPolygon);
  g.stroke();
  
  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
