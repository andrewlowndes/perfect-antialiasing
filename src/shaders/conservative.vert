#version 300 es

uniform vec2 screenSize;

in vec3 uv;
in vec2 pos;
in vec2 prevPos;
in vec2 nextPos;

out vec3 vUv;
flat out vec4 bounds;

const float EPSILON = 0.0000001;

vec2 clipToScreenSpace(vec2 pos) {
    return screenSize.xy * (pos / 2.0 + 0.5);
}

vec2 screenSpaceToClipSpace(vec2 pos) {
    return ((pos / screenSize.xy) - 0.5) * 2.0;
}

const float diagonalOffset = sqrt(2.0) / 2.0;

void main(void) {
    vec2 screenPos = clipToScreenSpace(pos);
    vec2 screenNextPos = clipToScreenSpace(nextPos);
    vec2 screenPrevPos = clipToScreenSpace(prevPos);
    
    // determine a new vertex position such that it covers the neighbour pixel centers
    vec2 a = normalize(screenPrevPos - screenPos);
    vec2 b = normalize(screenNextPos - screenPos);
    float angle = sqrt((1.0 - dot(a, b)) / 2.0);
    
    vec2 vecPos;
    if (abs(angle) > EPSILON) {
        vecPos = screenSpaceToClipSpace(screenPos - normalize(a + b) * diagonalOffset / angle);
    } else {
        vecPos = pos;
    }

    bounds = vec4(
        min(min(screenPos, screenNextPos), screenPrevPos) - 0.5,
        max(max(screenPos, screenNextPos), screenPrevPos) + 0.5
    );

    // TODO: offset the uv so it is still inline with the original triangle position?
    vUv = uv;

    gl_Position = vec4(vecPos, 0.0, 1.0);
}
