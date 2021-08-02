import earcut from "earcut";
import { Point } from "../interfaces/Point";
import { Triangle } from "../interfaces/Triangle";
import { Aabb } from "../interfaces/Aabb";
import { aabb } from "../aabb/aabb";
import { inside, sub } from "../maths/point";
import { polygonAreaSigned } from "./polygonArea";

interface Group {
  points: Array<Point>;
  aabb: Aabb;
  area: number;
  children: Array<Group>;
}

export const pointsToPolygons = (
  points: Array<Array<Point>>
): Array<Array<Triangle>> => {
  let groups: Array<Group> = points.map((pointsArr) => ({
    points: pointsArr,
    aabb: aabb(...pointsArr),
    area: polygonAreaSigned(pointsArr),
    children: [],
  }));

  groups.sort((a, b) => Math.abs(b.area) - Math.abs(a.area));

  const root = [];

  for (let i = 0; i < groups.length; ++i) {
    let parent = null;
    for (let j = i - 1; j >= 0; --j) {
      if (
        inside(groups[j].points, groups[i].points[0]) &&
        groups[i].area * groups[j].area < 0
      ) {
        parent = groups[j];
        break;
      }
    }
    if (parent) {
      parent.children.push(groups[i]);
    } else {
      root.push(groups[i]);
    }
  }

  const polygons: Array<Array<Triangle>> = [];
  let triangles: Array<Triangle> = [];

  const process = (group: Group) => {
    const coords: number[] = [];
    const holes: number[] = [];
    const points: Point[] = [];

    group.points.forEach((point) => {
      coords.push(...point);
      points.push(point);
    });

    group.children.forEach((child) => {
      child.children.forEach(process);

      holes.push(coords.length / 2);
      child.points.forEach((point) => {
        coords.push(...point);
        points.push(point);
      });
    });

    const indices = earcut(coords, holes);

    for (let i = 0; i < indices.length; i += 3) {
      const p1 = points[indices[i + 0]];
      const p2 = points[indices[i + 1]];
      const p3 = points[indices[i + 2]];

      triangles.push({
        p1,
        p2,
        p3,
        e1: sub(p2, p1),
        e2: sub(p3, p2),
        e3: sub(p1, p3),
        points: [p1, p2, p3],
        colour: {
          x: Math.round(Math.random() * 255),
          y: Math.round(Math.random() * 255),
          z: Math.round(Math.random() * 255),
        },
      });
    }
  };

  root.forEach((group) => {
    process(group);
    polygons.push(triangles);
    triangles = [];
  });

  return polygons;
};
