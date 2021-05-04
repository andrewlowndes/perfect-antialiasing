import { Aabb } from "../interfaces/Aabb";

export const aabbContains = (aabb1: Aabb, aabb2: Aabb): boolean => {
    return aabb1.min.x <= aabb2.min.x && aabb1.min.y <= aabb2.min.y && aabb1.max.x >= aabb2.max.x && aabb1.max.y >= aabb2.max.y;
};
