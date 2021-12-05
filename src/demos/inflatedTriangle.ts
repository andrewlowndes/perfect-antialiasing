import { vec2 } from 'gl-matrix';

import type { Triangle } from '../interfaces/Triangle';
import { add,  avg, dot, max2, min2, normalize, scale, sub } from '../maths/point';
import { polygonPath } from '../render/polygonPath';

const inflateAmountDom = document.getElementById('inflateAmount') as HTMLInputElement;
const game = document.getElementById('game') as HTMLCanvasElement;
const g = game.getContext('2d')!;

const p1 = vec2.fromValues(217.00664, 255.7669);
const p2 = vec2.fromValues(416.7078, 255.76);
const p3 = vec2.fromValues(416.7078, 455.4263);

const triangle: Triangle = {
    p1,
    p2,
    p3,

    e1: sub(p2, p1),
    e2: sub(p3, p2),
    e3: sub(p1, p3),

    points: [p1, p2, p3]
};

triangle.center = avg(...triangle.points!);

let inflateAmount = 20;

inflateAmountDom.value = inflateAmount.toString();

inflateAmountDom.oninput = () => {
    inflateAmount = parseFloat(inflateAmountDom.value);
};

game.onmousemove = function (e) {
    const bounds = game.getBoundingClientRect();
    const mousePos = vec2.fromValues(
        e.pageX - bounds.left - document.documentElement.scrollLeft,
        game.height - (e.pageY - bounds.top - document.documentElement.scrollTop)
    );

    vec2.copy(triangle.p2, mousePos);
};

const rotateAmount = 0.01;

const draw = () => {
    vec2.rotate(triangle.p1, triangle.p1, triangle.center!, rotateAmount);
    triangle.center = avg(...triangle.points!);

    triangle.e1 = sub(triangle.p2, triangle.p1);
    triangle.e2 = sub(triangle.p3, triangle.p2);
    triangle.e3 = sub(triangle.p1, triangle.p3);

    //inflate each triangle vertex by an amount
    const inflatedPoints = [
        [triangle.p1, triangle.p2, triangle.p3],
        [triangle.p2, triangle.p3, triangle.p1],
        [triangle.p3, triangle.p1, triangle.p2]
    ].map(([prevPoint, point, nextPoint]) => {
        const a = normalize(sub(prevPoint, point));
        const b = normalize(sub(nextPoint, point));

        const normal = scale(normalize(add(a, b)), -1);
        const angle = Math.sqrt((1.0 - dot(a, b)) / 2.0);

        return add(point, scale(normal, inflateAmount / angle));
    });


    g.clearRect(0, 0, game.width, game.height);

    //draw the original triangle
    g.strokeStyle = 'red';
    g.beginPath();
    polygonPath(g, triangle.points!);
    g.stroke();

    //draw our inflated triangle
    g.strokeStyle = 'green';
    g.beginPath();
    polygonPath(g, inflatedPoints);
    g.stroke();

    //draw a bounding box round the new shape
    const minPos = min2(...triangle.points!);
    const maxPos = max2(...triangle.points!);

    g.strokeStyle = 'blue';
    g.strokeRect(minPos[0] - inflateAmount, g.canvas.height - maxPos[1] - inflateAmount, maxPos[0] - minPos[0] + inflateAmount*2, maxPos[1] - minPos[1] + inflateAmount*2);


    //draw some balls on the vertices for verification
    g.strokeStyle = 'orange';
    g.beginPath();
    g.arc(triangle.p1[0], g.canvas.height - triangle.p1[1], inflateAmount, 0, Math.PI*2);
    g.stroke();

    g.beginPath();
    g.arc(triangle.p2[0], g.canvas.height - triangle.p2[1], inflateAmount, 0, Math.PI*2);
    g.stroke();

    g.beginPath();
    g.arc(triangle.p3[0], g.canvas.height - triangle.p3[1], inflateAmount, 0, Math.PI*2);
    g.stroke();
    
    requestAnimationFrame(draw);
};

requestAnimationFrame(draw);
