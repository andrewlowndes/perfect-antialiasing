import { quadraticBezierToPoints } from "../geometry/quadraticBezierToPoints";
import { plotLines } from "../render/plotLines";

const game = document.getElementById("game") as HTMLCanvasElement;
const g = game.getContext("2d");

if (!g) {
  throw new Error('Could not get canvas graphics :(');
}

const beziers = [
  {
    p1: { x: 10, y: 10 },
    p2: { x: 10, y: 100 },
    p3: { x: 100, y: 10 }
  },
  {
    p1: { x: 110, y: 10 },
    p2: { x: 200, y: 100 },
    p3: { x: 200, y: 10 }
  },
  {
    p1: { x: 210, y: 10 },
    p2: { x: 260, y: 100 },
    p3: { x: 300, y: 10 }
  },
  {
    p1: { x: 310, y: 10 },
    p2: { x: 360, y: 50 },
    p3: { x: 400, y: 10 }
  },
  {
    p1: { x: 450, y: 10 },
    p2: { x: 410, y: 100 },
    p3: { x: 460, y: 10 }
  },
  {
    p1: { x: 550, y: 10 },
    p2: { x: 600, y: 100 },
    p3: { x: 560, y: 10 }
  },
  {
    p1: { x: 610, y: 10 },
    p2: { x: 650, y: 10 },
    p3: { x: 700, y: 10 }
  },
  //
  {
    p1: { x: 10, y: 200 },
    p2: { x: 10, y: 110 },
    p3: { x: 100, y: 200 }
  },
  {
    p1: { x: 110, y: 200 },
    p2: { x: 200, y: 110 },
    p3: { x: 200, y: 200 }
  },
  {
    p1: { x: 210, y: 200 },
    p2: { x: 260, y: 110 },
    p3: { x: 300, y: 200 }
  },
  {
    p1: { x: 310, y: 200 },
    p2: { x: 360, y: 150 },
    p3: { x: 400, y: 200 }
  },
  {
    p1: { x: 450, y: 200 },
    p2: { x: 410, y: 110 },
    p3: { x: 460, y: 200 }
  },
  {
    p1: { x: 550, y: 200 },
    p2: { x: 600, y: 110 },
    p3: { x: 560, y: 200 }
  },
  {
    p1: { x: 610, y: 110 },
    p2: { x: 650, y: 110 },
    p3: { x: 700, y: 110 }
  },
];

const splitBoundary = -0.99;

const draw = () => {
  g.clearRect(0, 0, game.width, game.height);

  for (let bezier of beziers) {
    //draw the curve triangle
    g.setLineDash([1, 2]);
    g.strokeStyle = "blue";
    g.beginPath();
    plotLines(g, [bezier.p1, bezier.p2, bezier.p3]);
    g.stroke();

    //draw our real bezier curve
    /*
    g.strokeStyle = "red";
    g.beginPath();
    g.moveTo(bezier.p1.x, game.height - bezier.p1.y);
    g.quadraticCurveTo(bezier.p2.x, game.height - bezier.p2.y, bezier.p3.x, game.height - bezier.p3.y);
    g.stroke();
    */

    //create and draw the new 'curve' that consists of lines
    const bezierLines = quadraticBezierToPoints(bezier, splitBoundary);
    
    g.setLineDash([]);
    g.strokeStyle = "green";
    g.beginPath();
    plotLines(g, bezierLines);
    g.stroke();
  }
};

requestAnimationFrame(draw);
