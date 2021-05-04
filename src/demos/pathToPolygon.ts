import { BoundingBox, Font, load } from "opentype.js";

import { Point } from "../interfaces/Point";
import { Triangle } from "../interfaces/Triangle";

import { pathToPoints } from "../geometry/pathToPoints";
import { pointsToPolygons } from "../geometry/pointsToPolygon";
import { plotLines } from "../render/plotLines";

const game = document.getElementById("game")! as HTMLCanvasElement;
const charSelect = document.getElementById("charSelect")! as HTMLSelectElement;
const svgPreview = document.getElementById("svgPreview")!;
const g = game.getContext("2d");

if (!g) {
  throw new Error('Could not get canvas graphics :(');
}

g.imageSmoothingEnabled = false;

const splitBoundary = -0.99;
const alphaChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

let font: Font;
let points: Array<Array<Point>> = [];
let polygons: Array<Array<Triangle>> = [];

const bindCharSelect = () => {
  charSelect.innerHTML = '';

  alphaChars.forEach((alphaChar) => {
    const charOption = document.createElement('option');
    charOption.value = alphaChar;
    charOption.textContent = alphaChar;
    charSelect.appendChild(charOption);
  });

  charSelect.addEventListener('change', () => {
    if (charSelect.value !== '') {
      loadChar(charSelect.value);
    } else {
      points = [];
      polygons = [];
      svgPreview.innerHTML = '';
    }
  });
}

const loadPath = (pathStr: string, aBounds: BoundingBox) => {
  const size = {
    x: Math.round(aBounds.x2 - aBounds.x1),
    y: Math.round(aBounds.y2 - aBounds.y1)
  };

  //create an avg for comparison
  svgPreview.innerHTML = '';
  const svgNs = "http://www.w3.org/2000/svg";
  const newSvg = document.createElementNS(svgNs, 'svg');
  newSvg.setAttributeNS(null, 'width', size.x.toString());
  newSvg.setAttributeNS(null, 'height', size.y.toString());
  newSvg.setAttributeNS(null, 'viewBox', [aBounds.x1, aBounds.y1, size.x, size.y].join(' '));
  const svgPath = document.createElementNS(svgNs, 'path');
  svgPath.setAttributeNS(null, 'd', pathStr);
  newSvg.appendChild(svgPath);
  svgPreview.appendChild(newSvg);

  //now convert our path to points and draw the outline using lines
  //note: could use aPath.commands so we don't need to parse again
  points = pathToPoints(pathStr, splitBoundary);
  polygons = pointsToPolygons(points);

  points.forEach(points => points.forEach(point => {
    point.x -= aBounds.x1;
    point.y = game.height - point.y + aBounds.y1;
  }));
}

const loadChar = (charToDraw: string) => {
  const fontSize = 1000;
  const aChar = font.charToGlyph(charToDraw);
  const aPath = aChar.getPath(0, 0, fontSize);

  loadPath(aPath.toPathData(5), aPath.getBoundingBox());
}

const draw = () => {
  g.clearRect(0, 0, game.width, game.height);

  g.fillStyle = "black";
  g.beginPath();
  points.forEach((pointList) => {
    plotLines(g, pointList);
  });
  g.stroke();

  //draw the converted polygon
  g.fillStyle = "black";
  polygons.forEach((polygon) => {
    polygon.forEach((triangle) => {
      //g.fillStyle = "rgb(" + triangle.colour.x + "," + triangle.colour.y + "," + triangle.colour.z + ")";
      g.beginPath();
      plotLines(g, triangle.points!);
      g.fill();
    });
  });

  requestAnimationFrame(draw);
}

const start = async () => {
  font = await load('./media/Timeless.ttf');

  bindCharSelect();
  loadChar('A');

  requestAnimationFrame(draw);
};

start();
