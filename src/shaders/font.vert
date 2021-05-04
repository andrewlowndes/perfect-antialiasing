uniform vec2 screenSize;
uniform float offset;

attribute float index;
attribute vec2 pos;
attribute vec2 prevPos;
attribute vec2 nextPos;

varying vec4 bounds;

varying vec2 vPrevPos;
varying vec2 vPos;
varying vec2 vNextPos;
varying vec2 e1;
varying vec2 e2;
varying vec2 e3;

const float delta = 0.0000001;

void main(void) {
    // determine a new vertex position such that it covers the neighbour pixel centers
    vec2 a = normalize(pos - prevPos);
    vec2 b = normalize(pos - nextPos);
    float angle = sqrt((1.0 - dot(a, b)) / 2.0);

    vec2 vecPos;
    if (abs(angle) > delta) {
        vecPos = pos + normalize(a + b) * (offset / angle);
    } else {
        vecPos = pos;
    }

    // compute a bounding box and pass to the fragment shader so we dont render outside the inflated triangle bounds
    bounds = screenSize.xyxy * (vec4(min(min(pos, prevPos), nextPos), max(max(pos, prevPos), nextPos)) / 2.0 + 0.5) + vec4(-0.5, -0.5, 0.5, 0.5);

    //translate the position into screen space
    vec2 screenPos = screenSize.xy * (pos / 2.0 + 0.5);
    vec2 screenPrevPos = screenSize.xy * (prevPos / 2.0 + 0.5);
    vec2 screenNextPos = screenSize.xy * (nextPos / 2.0 + 0.5);
    
    //prevent interpolation by ensuring the same positions are sent each vertex in the same triangle
    if (int(index) == 0) {
        vPrevPos = screenPos;
        vPos = screenNextPos;
        vNextPos = screenPrevPos;
    } else if (int(index) == 1) {
        vPrevPos = screenPrevPos;
        vPos = screenPos;
        vNextPos = screenNextPos;
    } else {
        vPrevPos = screenNextPos;
        vPos = screenPrevPos;
        vNextPos = screenPos;
    }
    
    e1 = vPos - vPrevPos;
    e2 = vNextPos - vPos;
    e3 = vPrevPos - vNextPos;

    gl_Position = vec4(vecPos, 0.0, 1.0);
}
