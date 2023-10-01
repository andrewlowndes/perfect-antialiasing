#version 300 es

precision highp float;

flat in vec4 bounds;
flat in vec2 vPrevPos;
flat in vec2 vPos;
flat in vec2 vNextPos;
flat in vec2 e1;
flat in vec2 e2;
flat in vec2 e3;

out vec4 outColor;

const float EPSILON = 0.000001;
const float PRECISION_SCALE = 1000.0;
const float TWO_PRECISION_SCALE_SQUARED = 2.0 * PRECISION_SCALE * PRECISION_SCALE;

vec4 sort(vec4 val) {
    float a = min(val.x, val.y);
    float b = max(val.x, val.y);
    float c = min(val.z, val.w);
    float d = max(val.z, val.w);

    float h = max(a, min(b, c));
    float i = min(d, max(b, c));

    return vec4(min(a, c), min(h, i), max(h, i), max(b, d));
}

int det2(ivec2 p1, ivec2 p2) {
  return (p1.x * p2.y) - (p1.y * p2.x);
}

ivec2 prepPoint(vec2 point, vec2 pixelMin, vec2 pixelMax) {
    //limit the precision by scaling the point to map to an int
    vec2 constrained_point = clamp(point, pixelMin, pixelMax);
    return ivec2(floor(constrained_point * PRECISION_SCALE));
}

float timeAtPos(float startPos, float dir, float newPos) {
    if(abs(dir) < EPSILON) {
        return 0.0;
    }

    return clamp((newPos - startPos) / dir, 0.0, 1.0);
}

void main(void) {
    vec2 pixelMin = floor(gl_FragCoord.xy);
    vec2 pixelMax = pixelMin + 1.0;

    if((vPos.x < pixelMin.x && vPrevPos.x < pixelMin.x && vNextPos.x < pixelMin.x) ||
        (vPos.x > pixelMax.x && vPrevPos.x > pixelMax.x && vNextPos.x > pixelMax.x) ||
        (vPos.y < pixelMin.y && vPrevPos.y < pixelMin.y && vNextPos.y < pixelMin.y) ||
        (vPos.y > pixelMax.y && vPrevPos.y > pixelMax.y && vNextPos.y > pixelMax.y)) {
        discard;
    }

    //remove conservative rasterisation overdraw
    if(pixelMax.x < bounds.x || pixelMax.y < bounds.y || pixelMin.x > bounds.z || pixelMin.y > bounds.w) {
        discard;
    }

    //intersect the triangle with the pixel bounds
    vec4 firstLineTs = sort(vec4(timeAtPos(vPrevPos.x, e1.x, pixelMin.x), timeAtPos(vPrevPos.x, e1.x, pixelMax.x), timeAtPos(vPrevPos.y, e1.y, pixelMin.y), timeAtPos(vPrevPos.y, e1.y, pixelMax.y)));

    ivec2 p1 = prepPoint(vPrevPos + e1 * firstLineTs.x, pixelMin, pixelMax);
    ivec2 p2 = prepPoint(vPrevPos + e1 * firstLineTs.y, pixelMin, pixelMax);
    ivec2 p3 = prepPoint(vPrevPos + e1 * firstLineTs.z, pixelMin, pixelMax);
    ivec2 p4 = prepPoint(vPrevPos + e1 * firstLineTs.w, pixelMin, pixelMax);

    vec4 secondLineTs = sort(vec4(timeAtPos(vPos.x, e2.x, pixelMin.x), timeAtPos(vPos.x, e2.x, pixelMax.x), timeAtPos(vPos.y, e2.y, pixelMin.y), timeAtPos(vPos.y, e2.y, pixelMax.y)));

    ivec2 p5 = prepPoint(vPos + e2 * secondLineTs.x, pixelMin, pixelMax);
    ivec2 p6 = prepPoint(vPos + e2 * secondLineTs.y, pixelMin, pixelMax);
    ivec2 p7 = prepPoint(vPos + e2 * secondLineTs.z, pixelMin, pixelMax);
    ivec2 p8 = prepPoint(vPos + e2 * secondLineTs.w, pixelMin, pixelMax);

    vec4 thirdLineTs = sort(vec4(timeAtPos(vNextPos.x, e3.x, pixelMin.x), timeAtPos(vNextPos.x, e3.x, pixelMax.x), timeAtPos(vNextPos.y, e3.y, pixelMin.y), timeAtPos(vNextPos.y, e3.y, pixelMax.y)));

    ivec2 p9 = prepPoint(vNextPos + e3 * thirdLineTs.x, pixelMin, pixelMax);
    ivec2 p10 = prepPoint(vNextPos + e3 * thirdLineTs.y, pixelMin, pixelMax);
    ivec2 p11 = prepPoint(vNextPos + e3 * thirdLineTs.z, pixelMin, pixelMax);
    ivec2 p12 = prepPoint(vNextPos + e3 * thirdLineTs.w, pixelMin, pixelMax);

    //compute the area under the formed polygon
    int polygonArea = (det2(p1, p2) + det2(p2, p3) + det2(p3, p4) + det2(p4, p5) +
        det2(p5, p6) + det2(p6, p7) + det2(p7, p8) + det2(p8, p9) +
        det2(p9, p10) + det2(p10, p11) + det2(p11, p12) + det2(p12, p1));

    float alphaAmount = clamp(float(abs(polygonArea)) / TWO_PRECISION_SCALE_SQUARED, 0.0, 1.0);
    outColor = vec4(1.0, 0.0, 0.0, alphaAmount);
}
