//cpu test of sorting four floats without branch conditions
export const sort = (t1: number, t2: number, t3: number, t4: number): [number, number, number, number] => {
    const a = Math.min(t1, t2);
    const b = Math.max(t1, t2);
    const c = Math.min(t3, t4);
    const d = Math.max(t3, t4);
    const e = Math.min(b, c);
    const f = Math.max(b, c);
    const h = Math.max(a, e);
    const i = Math.min(f, d);

    return [Math.min(a, e), Math.min(h, i), Math.max(h, i), Math.max(f, d)];
};
