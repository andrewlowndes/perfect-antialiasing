import { Aabb } from "../interfaces/Aabb";

export const aabbIntersect = (aabb1: Aabb, aabb2: Aabb): boolean => {
    return aabb2.min[0] <= aabb1.max[0] && aabb2.max[0] >= aabb1.min[0] && aabb2.min[1] <= aabb1.max[1] && aabb2.max[1] >= aabb1.min[1];
};
