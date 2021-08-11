import { vec2 } from 'gl-matrix';
import { quadraticBezierToPoints } from '../geometry/quadraticBezierToPoints';
import { plotLines } from '../render/plotLines';

const game = document.getElementById('game') as HTMLCanvasElement;
const g = game.getContext('2d');

if (!g) {
    throw new Error('Could not get canvas graphics :(');
}

const beziers = [
    {
        p1: vec2.fromValues(10, 10),
        p2: vec2.fromValues(10, 100),
        p3: vec2.fromValues(100, 10)
    },
    {
        p1: vec2.fromValues(110, 10),
        p2: vec2.fromValues(200, 100),
        p3: vec2.fromValues(200, 10)
    },
    {
        p1: vec2.fromValues(210, 10),
        p2: vec2.fromValues(260, 100),
        p3: vec2.fromValues(300, 10)
    },
    {
        p1: vec2.fromValues(310, 10),
        p2: vec2.fromValues(360, 50),
        p3: vec2.fromValues(400, 10)
    },
    {
        p1: vec2.fromValues(450, 10),
        p2: vec2.fromValues(410, 100),
        p3: vec2.fromValues(460, 10)
    },
    {
        p1: vec2.fromValues(550, 10),
        p2: vec2.fromValues(600, 100),
        p3: vec2.fromValues(560, 10)
    },
    {
        p1: vec2.fromValues(610, 10),
        p2: vec2.fromValues(650, 10),
        p3: vec2.fromValues(700, 10)
    },
    //
    {
        p1: vec2.fromValues(10, 200),
        p2: vec2.fromValues(10, 110),
        p3: vec2.fromValues(100, 200)
    },
    {
        p1: vec2.fromValues(110, 200),
        p2: vec2.fromValues(200, 110),
        p3: vec2.fromValues(200, 200)
    },
    {
        p1: vec2.fromValues(210, 200),
        p2: vec2.fromValues(260, 110),
        p3: vec2.fromValues(300, 200)
    },
    {
        p1: vec2.fromValues(310, 200),
        p2: vec2.fromValues(360, 150),
        p3: vec2.fromValues(400, 200)
    },
    {
        p1: vec2.fromValues(450, 200),
        p2: vec2.fromValues(410, 110),
        p3: vec2.fromValues(460, 200)
    },
    {
        p1: vec2.fromValues(550, 200),
        p2: vec2.fromValues(600, 110),
        p3: vec2.fromValues(560, 200)
    },
    {
        p1: vec2.fromValues(610, 110),
        p2: vec2.fromValues(650, 110),
        p3: vec2.fromValues(700, 110)
    }
];

const splitBoundary = -0.99;

const draw = () => {
    g.clearRect(0, 0, game.width, game.height);

    for (const bezier of beziers) {
        //draw the curve triangle
        g.setLineDash([1, 2]);
        g.strokeStyle = 'blue';
        g.beginPath();
        plotLines(g, [bezier.p1, bezier.p2, bezier.p3]);
        g.stroke();

        //draw our real bezier curve
        /*
    g.strokeStyle = "red";
    g.beginPath();
    g.moveTo(bezier.p1[0], game.height - bezier.p1[1]);
    g.quadraticCurveTo(bezier.p2[0], game.height - bezier.p2[1], bezier.p3[0], game.height - bezier.p3[1]);
    g.stroke();
    */

        //create and draw the new 'curve' that consists of lines
        const bezierLines = quadraticBezierToPoints(bezier, splitBoundary);

        g.setLineDash([]);
        g.strokeStyle = 'green';
        g.beginPath();
        plotLines(g, bezierLines);
        g.stroke();
    }
};

requestAnimationFrame(draw);
