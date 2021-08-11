import type { LineEquation } from '../interfaces/LineEquation';

export const solveLineX = (equation: LineEquation, y: number) => {
    return (y - equation.intersect) / equation.gradient;
};
