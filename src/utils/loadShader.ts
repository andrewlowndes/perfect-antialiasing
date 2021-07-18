
export const loadShader = (gl: WebGLRenderingContext | WebGL2RenderingContext, vertCode: string, fragCode: string) => {
  const vertShader = gl.createShader(gl.VERTEX_SHADER)!;
  gl.shaderSource(vertShader, vertCode);
  gl.compileShader(vertShader);

  if (String(gl.getShaderInfoLog(vertShader)).trim() !== '') {
    throw new Error(String(gl.getShaderInfoLog(vertShader)));
  }

  const fragShader = gl.createShader(gl.FRAGMENT_SHADER)!;
  gl.shaderSource(fragShader, fragCode);
  gl.compileShader(fragShader);

  if (String(gl.getShaderInfoLog(fragShader)).trim() !== '') {
    throw new Error(String(gl.getShaderInfoLog(fragShader)));
  }

  const shaderProgram = gl.createProgram()!;
  gl.attachShader(shaderProgram, vertShader);
  gl.attachShader(shaderProgram, fragShader);
  gl.linkProgram(shaderProgram);

  if (String(gl.getProgramInfoLog(shaderProgram)).trim() !== '') {
    throw new Error(String(gl.getProgramInfoLog(shaderProgram)));
  }

  return shaderProgram;
};