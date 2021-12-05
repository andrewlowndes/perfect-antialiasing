#version 300 es

uniform vec2 screenSize;
uniform mat4 modelViewProjection;

in vec3 pos;
in vec3 colour;
in vec3 prevPos;
in vec3 nextPos;

out vec3 vColour;

flat out vec4 bounds;
flat out vec2 vPrevPos;
flat out vec2 vPos;
flat out vec2 vNextPos;
flat out vec2 e1;
flat out vec2 e2;
flat out vec2 e3;

const float EPSILON = 0.0000001;

vec2 posToClipSpace(vec3 pos) {
    vec4 proj_pos = modelViewProjection * vec4(pos, 1.0);
    return proj_pos.xy / proj_pos.w;
}

vec2 clipToScreenSpace(vec2 pos) {
    return screenSize.xy * (pos / 2.0 + 0.5);
}

vec2 screenSpaceToClipSpace(vec2 pos) {
    return ((pos / screenSize.xy) - 0.5) * 2.0;
}

const float diagonalOffset = sqrt(2.0) / 2.0;

void main(void) {
    vec2 clipPos = posToClipSpace(pos);
    vec2 clipNextPos = posToClipSpace(nextPos);
    vec2 clipPrevPos = posToClipSpace(prevPos);

    vec2 screenPos = clipToScreenSpace(clipPos);
    vec2 screenNextPos = clipToScreenSpace(clipNextPos);
    vec2 screenPrevPos = clipToScreenSpace(clipPrevPos);

    // determine a new vertex position such that it covers the neighbour pixel centers
    vec2 a = normalize(screenPrevPos - screenPos);
    vec2 b = normalize(screenNextPos - screenPos);
    float angle = sqrt((1.0 - dot(a, b)) / 2.0);

    vec2 vecPos;
    if (abs(angle) > EPSILON) {
        vecPos = screenSpaceToClipSpace(screenPos - normalize(a + b) * diagonalOffset / angle);
    } else {
        vecPos = clipPos;
    }

    bounds = vec4(
        min(min(screenPos, screenNextPos), screenPrevPos) - 0.5,
        max(max(screenPos, screenNextPos), screenPrevPos) + 0.5
    );

    //translate the position into screen space
    vPrevPos = screenPrevPos;
    vPos = screenPos;
    vNextPos = screenNextPos;
    e1 = vPos - vPrevPos;
    e2 = vNextPos - vPos;
    e3 = vPrevPos - vNextPos;
    
    vColour = colour;
    gl_Position = vec4(vecPos, 0.0, 1.0);
}
