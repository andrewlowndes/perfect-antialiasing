import { Triangle } from "../interfaces/Triangle";

import { aabb } from "../aabb/aabb";
import { intersectCellTriangle } from "../geometry/intersectCellTriangle";
import { polygonArea } from "../geometry/polygonArea";
import { polygonclip } from "../geometry/polygonclip";
import { clamp } from "../maths/common";
import { avg, ceil, floor, sub } from "../maths/point";
import { rasterizeTriangle } from "../render/rasterizeTriangle";

const p1 = { x: 60, y: 160 };
const p2 = { x: 150, y: 170 };
const p3 = { x: 250, y: 130 };

const triangle: Triangle = {
  p1,
  p2,
  p3,
  points: [p1, p2, p3],
  e1: sub(p2, p1),
  e2: sub(p3, p2),
  e3: sub(p1, p3)
};

triangle.center = avg(triangle.points!);

const game = document.getElementById("game") as HTMLCanvasElement;
const g = game.getContext("2d");

if (!g) {
  throw new Error('Could not get canvas graphics :(');
}

//intersect the triangle with the cell and produce a polygon
game.onmousemove = function(e) {
  const bounds = game.getBoundingClientRect();
  const mousePos = {
    x: e.pageX - bounds.left - document.documentElement.scrollLeft, 
    y: e.pageY - bounds.top - document.documentElement.scrollTop
  };

  const moveAmount = {
    x: mousePos.x - triangle.center!.x,
    y: mousePos.y - triangle.center!.y
  };

  triangle.center!.x = mousePos.x;
  triangle.center!.y = mousePos.y;        

  triangle.points!.forEach((point) => {
    point.x += moveAmount.x;
    point.y += moveAmount.y;
  });
}

const rotateAmount = 0.01;
const cosRotate = Math.cos(rotateAmount);
const sineRotate = Math.sin(rotateAmount);

const draw = () => {
  g.clearRect(0, 0, game.width, game.height);
  
  const imageData = g.getImageData(0, 0, game.width, game.height);
  const data = imageData.data;

  //lets rotate our triangle a little so we can appreciate the aliasing
  triangle.points!.forEach((point) => {
    const dx = point.x - triangle.center!.x;
    const dy = point.y - triangle.center!.y;

    point.x = triangle.center!.x + (dx * cosRotate) - (dy * sineRotate);
    point.y = triangle.center!.y + (dx * sineRotate) + (dy * cosRotate);
  });

  triangle.e1 = sub(triangle.p2, triangle.p1);
  triangle.e2 = sub(triangle.p3, triangle.p2);
  triangle.e3 = sub(triangle.p1, triangle.p3);
  
  const triangleAabb = aabb(triangle.points!);

  triangle.aabb = {
    min: floor(triangleAabb.min),
    max: ceil(triangleAabb.max)
  };

  //rasterise our triangle (conservatively) using a dda
  rasterizeTriangle(triangle.points!, {
      pos: { x: 0, y: 0 },
      cellSize: { x: 1, y: 1 }
  }, (boundaryCell) => {
    const cellBounds = {
      min: { x: boundaryCell.x, y: boundaryCell.y }, 
      size: { x: 1, y: 1 },  
      max: { x: boundaryCell.x + 1, y: boundaryCell.y + 1 }
    };

    const cellFillPolygon = intersectCellTriangle(triangle, cellBounds);
    
    const correctPolygon = polygonclip(triangle.points!, cellBounds);

    const correctAreaCoverage = clamp(Number(polygonArea(correctPolygon).toFixed(5)) / 1, 0, 1); //clamp due to rounding errors

    const areaCoverage = clamp(Number(polygonArea(cellFillPolygon).toFixed(5)), 0, 1);

    if (correctAreaCoverage !== areaCoverage) {
      console.error('Incorrect coverage', triangle.points);
    }

    const colour = Math.floor(areaCoverage * 255);
    const index = ((game.width * boundaryCell.y) + boundaryCell.x) * 4;

    data[index] = 0;
    data[index+1] = 0;
    data[index+2] = 0;
    data[index+3] = colour;
  }, (solidCell) => {
    const index = ((game.width * solidCell.y) + solidCell.x) * 4;

    data[index] = 0;
    data[index+1] = 0;
    data[index+2] = 0;
    data[index+3] = 255;
  });

  g.putImageData(imageData, 0, 0);

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
