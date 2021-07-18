import { Point } from "../interfaces/Point";
import { add, dot, normalize, scale, sub } from "../maths/point";

import vertCode from '../shaders/conservative.vert';
import fragCode from '../shaders/conservative.frag';

const vertexSize = 2;

const vertices = new Float32Array([
  -0.75, -0.75,
  0.0, 0.75,
  //-0.5, -0.2,
  0.75, -0.75
]);

const nextPos = Float32Array.of(...vertices.slice(vertexSize), ...vertices.slice(0, vertexSize));;
const prevPos = Float32Array.of(...vertices.slice(vertices.length - vertexSize), ...vertices.slice(0, vertices.length - vertexSize));

const uv = new Float32Array([
  1.0, 0.0, 0.0,
  0.0, 1.0, 0.0,
  0.0, 0.0, 1.0
]);

const indices = new Uint16Array([0, 1, 2]);

const canvas = document.getElementById('canvas1') as HTMLCanvasElement;

const canvas2 = document.getElementById('canvas2') as HTMLCanvasElement;
const g = canvas2.getContext('2d');

if (!g) {
  throw new Error('Could not initialise graphics :(');
}

const pi2 = Math.PI * 2;
const canvasScale = canvas2.width / canvas.width;

const pixelOffset = canvasScale / 2;

const calculateOffsetPosition = (position: Point, prev: Point, next: Point, offset: number) => {
  const a = normalize(sub(position, prev));
  const b = normalize(sub(position, next));

  const outVector = normalize(add(a, b));
  const angle = Math.sqrt((1.0 - dot(a, b)) / 2.0);

  return add(position, scale(outVector, offset / angle));
};

const getX = (index: number) => Math.floor((vertices[indices[index] * vertexSize] / 2 + 0.5) * canvas2.width);
const getY = (index: number) => Math.floor(canvas2.height - (vertices[indices[index] * vertexSize + 1] / 2 + 0.5) * canvas2.height);

const draw2D = () => {
  g.clearRect(0, 0, canvas2.width, canvas2.height);

  //draw horizontal and vertical lines so we can see the pixel outlines
  g.strokeStyle = '#DDDDDD';
  for (let x = 0; x < canvas2.width; x += canvasScale) {
    g.beginPath();
    g.moveTo(Math.floor(x), 0);
    g.lineTo(Math.floor(x), canvas2.height);
    g.stroke();
  }

  for (let y = 0; y < canvas2.height; y += canvasScale) {
    g.beginPath();
    g.moveTo(0, Math.floor(y));
    g.lineTo(canvas2.width, Math.floor(y));
    g.stroke();
  }

  const p1 = { x: getX(0), y: getY(0) };
  const p2 = { x: getX(1), y: getY(1) };
  const p3 = { x: getX(2), y: getY(2) };

  //draw the main triangle
  g.strokeStyle = 'white';
  g.beginPath();
  g.moveTo(p1.x, p1.y);
  g.lineTo(p2.x, p2.y);
  g.lineTo(p3.x, p3.y);
  g.closePath();
  g.stroke();

  //calculate and plot a new projected curve so we can compare with the webgl rendered result
  /*
  const nextP1 = calculateOffsetPosition(p3, p1, p2, pixelOffset);
  const nextP2 = calculateOffsetPosition(p1, p2, p3, pixelOffset);
  const nextP3 = calculateOffsetPosition(p2, p3, p1, pixelOffset);

  g.strokeStyle = 'green';
  g.beginPath();
  g.moveTo(nextP1.x, nextP1.y);
  g.lineTo(nextP2.x, nextP2.y);
  g.lineTo(nextP3.x, nextP3.y);
  g.closePath();
  g.stroke();
  */

  //draw a dot at each inflated pixel center
  g.fillStyle = '#AAA';
  for (let x = canvasScale / 2; x < canvas2.width; x += canvasScale) {
    for (let y = canvasScale / 2; y < canvas2.height; y += canvasScale) {
      g.beginPath();
      g.arc(x, y, 1, 0, pi2);
      g.fill();
    }
  }

  //draw the handles
  g.fillStyle = 'blue';
  const radius = 1;
  const points = [p1, p2, p3];

  for (const point of points) {
    g.beginPath();
    g.arc(point.x, point.y, radius, 0, pi2);
    g.fill();
  }
};

const gl = canvas.getContext('webgl', { antialias: false });

if (!gl) {
  throw new Error('Could not initialise WebGL :(');
}

// Create an empty buffer object to store vertex buffer
const posBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);

const nextPosBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, nextPosBuffer);
gl.bufferData(gl.ARRAY_BUFFER, nextPos, gl.DYNAMIC_DRAW);

const prevPosBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, prevPosBuffer);
gl.bufferData(gl.ARRAY_BUFFER, prevPos, gl.DYNAMIC_DRAW);

const uvBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
gl.bufferData(gl.ARRAY_BUFFER, uv, gl.STATIC_DRAW);

const indexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

// Create a vertex shader object
const vertShader = gl.createShader(gl.VERTEX_SHADER)!;
gl.shaderSource(vertShader, vertCode);
gl.compileShader(vertShader);

if (String(gl.getShaderInfoLog(vertShader)).trim() !== '') {
  throw new Error(String(gl.getShaderInfoLog(vertShader)));
}

// Create fragment shader object
const fragShader = gl.createShader(gl.FRAGMENT_SHADER)!;
gl.shaderSource(fragShader, fragCode);
gl.compileShader(fragShader);

if (String(gl.getShaderInfoLog(fragShader)).trim() !== '') {
  throw new Error(String(gl.getShaderInfoLog(fragShader)));
}

// Create a shader program object to store
// the combined shader program
const shaderProgram = gl.createProgram()!;
gl.attachShader(shaderProgram, vertShader);
gl.attachShader(shaderProgram, fragShader);
gl.linkProgram(shaderProgram);

if (String(gl.getProgramInfoLog(shaderProgram)).trim() !== '') {
  throw new Error(String(gl.getProgramInfoLog(shaderProgram)));
}

// Use the combined shader program object
gl.useProgram(shaderProgram);

const posAttr = gl.getAttribLocation(shaderProgram, "pos");
gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
gl.vertexAttribPointer(posAttr, vertexSize, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(posAttr);

// need to duplicate the vertex buffers just to access the other triangle positions :(
const prevPosAttr = gl.getAttribLocation(shaderProgram, "prevPos");
gl.bindBuffer(gl.ARRAY_BUFFER, prevPosBuffer);
gl.vertexAttribPointer(prevPosAttr, vertexSize, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(prevPosAttr);

const nextPosAttr = gl.getAttribLocation(shaderProgram, "nextPos");
gl.bindBuffer(gl.ARRAY_BUFFER, nextPosBuffer);
gl.vertexAttribPointer(nextPosAttr, vertexSize, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(nextPosAttr);

const uvAttr = gl.getAttribLocation(shaderProgram, "uv");
gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
gl.vertexAttribPointer(uvAttr, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(uvAttr);

const offsetUniform = gl.getUniformLocation(shaderProgram, 'offset');
gl.uniform1f(offsetUniform, Math.sqrt(2) / canvas.width);

const screenSizeUniform = gl.getUniformLocation(shaderProgram, 'screenSize');
gl.uniform2fv(screenSizeUniform, [canvas.width, canvas.height]);

//init
gl.clearColor(1.0, 1.0, 1.0, 1.0);
gl.viewport(0, 0, canvas.width, canvas.height);
gl.enable(gl.DEPTH_TEST);

// draw
const drawGL = () => {
  gl.clear(gl.COLOR_BUFFER_BIT);

  //upload new position data
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, vertices);

  gl.bindBuffer(gl.ARRAY_BUFFER, nextPosBuffer);
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, nextPos);

  gl.bindBuffer(gl.ARRAY_BUFFER, prevPosBuffer);
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, prevPos);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
};

//animate the top vertex between -1 and 1 and trigger to redraw
const setVertexPosition = (index: number, pos: Point) => {
  const startIndex = index * vertexSize;
  vertices[startIndex] = pos.x;
  vertices[startIndex + 1] = pos.y;

  const prevPosStartIndex = (startIndex + vertexSize) % prevPos.length;
  prevPos[prevPosStartIndex] = pos.x;
  prevPos[prevPosStartIndex + 1] = pos.y;

  const nextPosStartIndex = (startIndex - vertexSize + nextPos.length) % nextPos.length;
  nextPos[nextPosStartIndex] = pos.x;
  nextPos[nextPosStartIndex + 1] = pos.y;
};

const p1Dir = { x: 1, y: 1 };
const p2Dir = { x: -1, y: -1 };
const p3Dir = { x: -1, y: -1 };
const newP1 = { x: vertices[0], y: vertices[1] };
const newP2 = { x: vertices[2], y: vertices[3] };
const newP3 = { x: vertices[4], y: vertices[5] };
const step = 0.001;

const animate = () => {
  newP1.x += step * p1Dir.x;
  newP1.y += step * p1Dir.y;
  if (Math.abs(newP1.x) > 1) p1Dir.x *= -1;
  if (Math.abs(newP1.y) > 1) p1Dir.y *= -1;
  setVertexPosition(0, newP1);

  newP2.x += step * p2Dir.x;
  newP2.y += step * p2Dir.y;
  if (Math.abs(newP2.x) > 1) p2Dir.x *= -1;
  if (Math.abs(newP2.y) > 1) p2Dir.y *= -1;
  setVertexPosition(1, newP2);

  newP3.x += step * p3Dir.x;
  newP3.y += step * p3Dir.y;
  if (Math.abs(newP3.x) > 1) p3Dir.x *= -1;
  if (Math.abs(newP3.y) > 1) p3Dir.y *= -1;
  setVertexPosition(2, newP3);

  draw2D();
  drawGL();
  requestAnimationFrame(animate);
};

animate();
