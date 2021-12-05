#version 300 es

precision highp float;

in vec3 vUv;
flat in vec4 bounds;

out vec4 outColour;

void main(void) {
  if (gl_FragCoord.x < bounds.x || gl_FragCoord.y < bounds.y || gl_FragCoord.x > bounds.z || gl_FragCoord.y > bounds.w) {
    discard;
  }

  outColour = vec4(vUv, 1.0);
}
