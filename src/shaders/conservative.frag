precision highp float;

varying vec3 vUv;
varying vec4 bounds;

void main(void) {
  if (gl_FragCoord.x < bounds.x || gl_FragCoord.y < bounds.y || gl_FragCoord.x > bounds.z || gl_FragCoord.y > bounds.w) {
    discard;
  }

  gl_FragColor = vec4(vUv, 1.0);
}