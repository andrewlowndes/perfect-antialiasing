import { quadraticBezierToPoints } from "../geometry/quadraticBezierToPoints";
import { plotLines } from "../render/plotLines";

const game = document.getElementById("game") as HTMLCanvasElement;
const g = game.getContext("2d");

if (!g) {
  throw new Error('Could not get canvas graphics :(');
}

const p1 = { x: 40, y: 40 };
const p2 = { x: 200, y: 140 };
const p3 = { x: 300, y: 80 };

const bezier = {
  p1,
  p2,
  p3,
  points: [p1, p2, p3]
};

const splitBoundary = -0.99;
const bezierLines = quadraticBezierToPoints(bezier, splitBoundary);

const draw = () => {
  g.clearRect(0, 0, game.width, game.height);

  //draw the curve triangle
  g.strokeStyle = "blue";
  g.beginPath();
  plotLines(g, bezier.points);
  g.closePath();
  g.stroke();

  //draw our bezier curve
  /*g.strokeStyle = "red";
  g.beginPath();
  g.moveTo(bezier.p1.x, game.height - bezier.p1.y);
  g.quadraticCurveTo(bezier.p2.x, game.height - bezier.p2.y, bezier.p3.x, game.height - bezier.p3.y);
  g.stroke();*/

  //draw the new 'curve' that consists of lines
  g.strokeStyle = "green";
  g.beginPath();
  plotLines(g, bezierLines);
  g.stroke();

  requestAnimationFrame(draw);
};

requestAnimationFrame(draw);
