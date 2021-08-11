import { vec2 } from 'gl-matrix';

import type { Point } from '../interfaces/Point';
import { EPSILON } from './common';

export const clamp2 = (a: Point, min: Point, max: Point) => {
    const out = vec2.clone(a);
    vec2.min(out, out, max);
    vec2.max(out, out, min);
    return out;
};
export const determinant2 = (p1: Point, p2: Point) => p1[0] * p2[1] - p1[1] * p2[0];
export const equals = vec2.equals;
export const scale = (p1: Point, a: number) => vec2.scale(vec2.create(), p1, a);
export const multiply = (p1: Point, p2: Point) => vec2.multiply(vec2.create(), p1, p2);
export const divide = (p1: Point, p2: Point) => vec2.divide(vec2.create(), p1, p2);
export const add = (p1: Point, p2: Point) => vec2.add(vec2.create(), p1, p2);
export const adds = (p1: Point, a: number) => vec2.fromValues(p1[0] + a, p1[1] + a);
export const sub = (p1: Point, p2: Point) => vec2.sub(vec2.create(), p1, p2);
export const floor = (p1: Point) => vec2.floor(vec2.create(), p1);
export const ceil = (p1: Point) => vec2.ceil(vec2.create(), p1);
export const abs = (p1: Point) => vec2.fromValues(Math.abs(p1[0]), Math.abs(p1[1]));
export const sign = (p1: Point) => vec2.fromValues(Math.sign(p1[0]), Math.sign(p1[1]));
export const dot = (p1: Point, p2: Point) => vec2.dot(p1, p2);
export const length = (p1: Point) => vec2.length(p1);
export const normalize = (p1: Point) => scale(p1, 1 / length(p1));
export const lerp2 = (a: Point, b: Point, t: number) => vec2.lerp(vec2.create(), a, b, t);

//warning: mutates a
export const toPrecision2 = (a: Point, amount: number) => {
    a[0] = parseFloat(a[0].toPrecision(amount));
    a[1] = parseFloat(a[1].toPrecision(amount));
    return a;
};

export const min2 = (...objs: Array<Point>) => {
    const [first, ...rest] = objs;
    const result = vec2.clone(first);

    rest.forEach((obj) => {
        vec2.min(result, result, obj);
    });

    return result;
};

export const max2 = (...objs: Array<Point>) => {
    const [first, ...rest] = objs;
    const result = vec2.clone(first);

    rest.forEach((obj) => {
        vec2.max(result, result, obj);
    });

    return result;
};

export const avg = (...objs: Array<Point>) => {
    const result = vec2.create();

    if (objs.length) {
        objs.forEach((obj) => {
            vec2.add(result, result, obj);
        });

        vec2.scale(result, result, 1 / objs.length);
    }

    return result;
};

export const inRange = (p1: Point, min: Point, max: Point) => {
    return !(p1[0] > max[0] || p1[0] < min[0] || p1[1] > max[1] || p1[1] < min[1]);
};

export const inside = (points: Point[], p: Point) => {
    let count = 0;
    let cur = points[points.length - 1];

    points.forEach((next) => {
        const p0 = cur[1] < next[1] ? cur : next;
        const p1 = cur[1] < next[1] ? next : cur;

        if (p0[1] < p[1] + EPSILON && p1[1] > p[1] + EPSILON) {
            if ((p1[0] - p0[0]) * (p[1] - p0[1]) > (p[0] - p0[0]) * (p1[1] - p0[1])) {
                count += 1;
            }
        }
        cur = next;
    });

    return count % 2 !== 0;
};
