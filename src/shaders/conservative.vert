uniform vec2 screenSize;
uniform float offset;

attribute vec2 pos;
attribute vec2 prevPos;
attribute vec2 nextPos;
attribute vec3 uv;

varying vec3 vUv;
varying vec4 bounds;

void main(void) {
    // determine a new vertex position such that it covers the neighbour pixel centers
    vec2 a = normalize(pos - prevPos);
    vec2 b = normalize(pos - nextPos);
    float angle = sqrt((1.0 - dot(a, b)) / 2.0);

    vec2 vecPos = pos + normalize(a + b) * (offset / angle);

    // compute a bounding box and pass to the fragment shader so we don't render outside the inflated triangle bounds
    bounds = screenSize.xyxy * (vec4(min(min(pos, prevPos), nextPos), max(max(pos, prevPos), nextPos)) / 2.0 + 0.5) + vec4(-0.5, -0.5, 0.5, 0.5);

    // TODO: offset the uv so it is still inline with the original triangle position?
    vUv = uv;

    gl_Position = vec4(vecPos, 0.0, 1.0);
}