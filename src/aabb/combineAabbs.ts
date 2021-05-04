import { Aabb } from "../interfaces/Aabb";
import { max2, min2 } from "../maths/common";

export const combineAabbs = (aabbs: Array<Aabb>): Aabb | undefined => {
    if (!aabbs.length) {
        return;
    }

    const firstAabb = aabbs[0];
    const combined = {
        min: firstAabb.min,
        max: firstAabb.max
    };

    for (let i = 1; i < aabbs.length; i++) {
        const aabb = aabbs[i];

        combined.min = min2(combined.min, aabb.min);
        combined.max = max2(combined.max, aabb.max);
    }

    return combined;
};
