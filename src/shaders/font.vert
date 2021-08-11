uniform vec2 screenSize;
uniform float offset;
uniform mat4 modelViewProjection;

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

vec2 posToClipSpace(vec2 pos) {
    vec4 proj_pos = modelViewProjection * vec4(pos, 0.0, 1.0);
    return proj_pos.xy / proj_pos.w;
}

vec2 clipToScreenSpace(vec2 pos) {
    return screenSize.xy * (pos / 2.0 + 0.5);
}

void main(void) {
    vec2 clipPos = posToClipSpace(pos);
    vec2 clipNextPos = posToClipSpace(nextPos);
    vec2 clipPrevPos = posToClipSpace(prevPos);

    // determine a new vertex position such that it covers the neighbour pixel centers
    vec2 a = normalize(clipPos - clipPrevPos);
    vec2 b = normalize(clipPos - clipNextPos);
    float angle = sqrt((1.0 - dot(a, b)) / 2.0);

    vec2 vecPos;
    if (abs(angle) > delta) {
        vecPos = clipPos + normalize(a + b) * (offset / angle);
    } else {
        vecPos = clipPos;
    }

    //translate the position into screen space
    vec2 screenPos = clipToScreenSpace(clipPos);
    vec2 screenNextPos = clipToScreenSpace(clipNextPos);
    vec2 screenPrevPos = clipToScreenSpace(clipPrevPos);

    // compute a bounding box and pass to the fragment shader so we dont render outside the inflated triangle bounds
    bounds = vec4(
        min(min(screenPos, screenNextPos), screenPrevPos) - 0.5,
        max(max(screenPos, screenNextPos), screenPrevPos) + 0.5
    );

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
