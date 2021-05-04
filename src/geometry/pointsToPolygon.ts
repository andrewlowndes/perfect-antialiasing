import earcut from 'earcut';

import { Point } from "../interfaces/Point";
import { Triangle } from '../interfaces/Triangle';
import { Aabb } from '../interfaces/Aabb';

import { aabb } from "../aabb/aabb";
import { aabbContains } from "../aabb/aabbContains";
import { aabbIntersect } from "../aabb/aabbIntersect";
import { combineAabbs } from "../aabb/combineAabbs";
import { sub } from '../maths/common';
import { polygonAreaSigned } from "./polygonArea";

interface Group {
  points: Array<Point>;
  aabb: Aabb;
}

export const pointsToPolygons = (points: Array<Array<Point>>): Array<Array<Triangle>> => {
  let solidGroups: Array<Group> = [];
  let holeGroups: Array<Group> = [];

  points.forEach((pointsArr) => {
    const group = {
      points: pointsArr,
      aabb: aabb(pointsArr)
    };

    if (polygonAreaSigned(pointsArr) > 0) {
      solidGroups.push(group);
    } else {
      holeGroups.push(group);
    }
  });

  //swap the groups if there are only holes
  if (!solidGroups.length) {
    const temp = holeGroups;
    holeGroups = solidGroups;
    solidGroups = temp;
  } else if (holeGroups.length) {
    //determine wether the solid groups or the hole groups is on the outside - flip if needed to solid groups are on the outside
    const solidAabb = combineAabbs(solidGroups.map((group) => group.aabb))!;
    const holeAabb = combineAabbs(holeGroups.map((group) => group.aabb))!;

    if (aabbContains(holeAabb, solidAabb)) {
      const temp = holeGroups;
      holeGroups = solidGroups;
      solidGroups = temp;
    }
  }

  //nothing to render? - then we are done
  const polygons: Array<Array<Triangle>> = [];

  if (!solidGroups.length) {
    return polygons;
  }

  //we will create a polygon for each of the solid groups of points
  solidGroups.forEach((solidGroup) => {
    //convert into a format suitable for triangulation
    const vertexData: Array<number> = [];
    const holeIndices: Array<number> = [];
    const allPoints: Array<Point> = [];

    allPoints.push(...solidGroup.points);
    solidGroup.points.map((point) => {
      vertexData.push(point.x);
      vertexData.push(point.y);
    });

    holeGroups.filter((holeGroup) => aabbIntersect(holeGroup.aabb, solidGroup.aabb)).forEach((holeGroup) => {
      allPoints.push(...holeGroup.points);
      holeIndices.push(vertexData.length / 2);

      holeGroup.points.forEach((holePoint) => {
        vertexData.push(holePoint.x);
        vertexData.push(holePoint.y);
      });
    });

    const triangleIndices = earcut(vertexData, holeIndices);

    const triangles: Array<Triangle> = [];
    for (let i = 0; i < triangleIndices.length; i += 3) {
      let p1 = allPoints[triangleIndices[i]];
      const p2 = allPoints[triangleIndices[i + 1]];
      let p3 = allPoints[triangleIndices[i + 2]];

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
          z: Math.round(Math.random() * 255)
        }
      });
    }

    if (triangles.length) {
      polygons.push(triangles);
    }
  });

  return polygons;
};
