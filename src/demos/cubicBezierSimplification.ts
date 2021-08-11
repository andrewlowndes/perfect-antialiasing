import { vec2 } from 'gl-matrix';
import { cubicBezierToPoints } from '../geometry/cubicBezierToPoints';
import { plotLines } from '../render/plotLines';

const game = document.getElementById('game') as HTMLCanvasElement;
const g = game.getContext('2d');

if (!g) {
    throw new Error('Could not get canvas');
}

const p1 = vec2.fromValues(40, 40);
const p2 = vec2.fromValues(100, 240);
const p3 = vec2.fromValues(300, 80);
const p4 = vec2.fromValues(260, 380);

const bezier = {
    p1,
    p2,
    p3,
    p4,
    points: [p1, p2, p3, p4]
};

const splitThreshold = -0.99;
const bezierLines = cubicBezierToPoints(bezier, splitThreshold);

const draw = () => {
    g.clearRect(0, 0, game.width, game.height);

    //draw the curve triangle
    g.strokeStyle = 'blue';
    g.beginPath();
    plotLines(g, bezier.points);
    g.stroke();

    //draw our bezier curve
    /*
  g.strokeStyle = "red";
  g.beginPath();
  g.moveTo(bezier.p1[0], game.height - bezier.p1[1]);
  g.bezierCurveTo(bezier.p2[0], game.height - bezier.p2[1], bezier.p3[0], game.height - bezier.p3[1], bezier.p4[0], game.height - bezier.p4[1]);
  g.stroke();
  */

    //draw the new 'curve' that consists of lines
    g.strokeStyle = 'green';
    g.beginPath();
    plotLines(g, bezierLines);
    g.stroke();

    requestAnimationFrame(draw);
};

requestAnimationFrame(draw);
