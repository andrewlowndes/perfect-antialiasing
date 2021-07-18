import { Point } from "../interfaces/Point";
import { clamp, lerp } from "./common";

export const clamp2 = (a: Point, min: Point, max: Point) => ({ x: clamp(a.x, min.x, max.x), y: clamp(a.y, min.y, max.y) });
export const determinant2 = (p1: Point, p2: Point) => (p1.x * p2.y) - (p1.y * p2.x);
export const equals = (a: Point, b: Point) => a.x === b.x && a.y === b.y;
export const scale = (p1: Point, a: number) => ({ x: a * p1.x, y: a * p1.y });
export const multiply = (p1: Point, p2: Point) => ({ x: p2.x * p1.x, y: p2.y * p1.y });
export const divide = (p1: Point, p2: Point) => ({ x: p1.x / p2.x, y: p1.y / p2.y });
export const add = (p1: Point, p2: Point) => ({ x: p1.x + p2.x, y: p1.y + p2.y });
export const adds = (p1: Point, a: number) => ({ x: p1.x + a, y: p1.y + a });
export const sub = (p1: Point, p2: Point) => ({ x: p1.x - p2.x, y: p1.y - p2.y });
export const floor = (p1: Point) => ({ x: Math.floor(p1.x), y: Math.floor(p1.y) });
export const ceil = (p1: Point) => ({ x: Math.ceil(p1.x), y: Math.ceil(p1.y) });
export const abs = (p1: Point) => ({ x: Math.abs(p1.x), y: Math.abs(p1.y) });
export const sign = (p1: Point) => ({ x: Math.sign(p1.x), y: Math.sign(p1.y) });
export const dot = (p1: Point, p2: Point) => p1.x * p2.x + p1.y * p2.y;
export const equal = (p1: Point, p2: Point) => p1.x == p2.x && p1.y == p2.y;
export const length = (p1: Point) => Math.sqrt(p1.x * p1.x + p1.y * p1.y);
export const normalize = (p1: Point) => scale(p1, 1 / length(p1));
export const lerp2 = (a: Point, b: Point, t: number) => ({ x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) });

//warning: mutates a
export const toPrecision2 = (a: Point, amount: number) => {
  a.x = parseFloat(a.x.toPrecision(amount));
  a.y = parseFloat(a.y.toPrecision(amount));
  return a;
};

export const min2 = (obj: Point, ...objs: Array<Point>) => {
  const result: Point = {
    x: obj.x,
    y: obj.y
  };

  objs.forEach((obj) => {
    result.x = Math.min(result.x, obj.x);
    result.y = Math.min(result.y, obj.y);
  });

  return result;
};

export const max2 = (obj: Point, ...objs: Array<Point>) => {
  const result: Point = {
    x: obj.x,
    y: obj.y
  };

  objs.forEach((obj) => {
    result.x = Math.max(result.x, obj.x);
    result.y = Math.max(result.y, obj.y);
  });

  return result;
};

export const avg = (arr: Array<Point>) => {
  const sum = arr.reduce<Point>((acc, item) => {
    acc.x += item.x;
    acc.y += item.y;
    return acc;
  }, { x: 0, y: 0 });

  sum.x /= arr.length;
  sum.y /= arr.length;

  return sum;
};

export const inRange = (p1: Point, min: Point, max: Point) => {
  return !(p1.x > max.x || p1.x < min.x || p1.y > max.y || p1.y < min.y);
};
