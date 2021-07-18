import { load } from "opentype.js";
import { pathToPoints } from "../geometry/pathToPoints";
import { pointsToPolygons } from "../geometry/pointsToPolygon";

import vertCode from '../shaders/font.vert';
import fragCode from '../shaders/font.frag';

const vertexSize = 2;

let gl: WebGLRenderingContext;
let vertices: Float32Array;
let nextPos: Float32Array;
let prevPos: Float32Array;
let indexes: Float32Array;
let posBuffer: WebGLBuffer;
let nextPosBuffer: WebGLBuffer;
let prevPosBuffer: WebGLBuffer;
let indexBuffer: WebGLBuffer;

const loadGL = () => {
  const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
  gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false })!;

  const offset = Math.sqrt(2) / canvas.width;

  // Create an empty buffer object to store vertex buffer
  posBuffer = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  nextPosBuffer = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, nextPosBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, nextPos, gl.STATIC_DRAW);

  prevPosBuffer = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, prevPosBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, prevPos, gl.STATIC_DRAW);

  indexBuffer = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, indexes, gl.STATIC_DRAW);

  // Create a shader program
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

  //bind shader params
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

  const indexAttr = gl.getAttribLocation(shaderProgram, "index");
  gl.bindBuffer(gl.ARRAY_BUFFER, indexBuffer);
  gl.vertexAttribPointer(indexAttr, 1, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(indexAttr);

  const offsetUniform = gl.getUniformLocation(shaderProgram, 'offset');
  gl.uniform1f(offsetUniform, offset);

  const screenSizeUniform = gl.getUniformLocation(shaderProgram, 'screenSize');
  gl.uniform2fv(screenSizeUniform, [canvas.width, canvas.height]);

  //init
  gl.clearColor(0.0, 0.0, 0.0, 0.0);
  gl.viewport(0, 0, canvas.width, canvas.height);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE);
};

// draw
const drawGL = () => {
  gl.clear(gl.COLOR_BUFFER_BIT);

  //may as well use drawArrays here since the vertices has had to be duplicated
  gl.drawArrays(gl.TRIANGLES, 0, vertices.length / vertexSize);
  //gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

  requestAnimationFrame(drawGL);
};

const start = async () => {
  const font = await load('./media/Timeless.ttf');

  const fontSize = 128;
  const text = 'Test';

  const scale = 1.0 / fontSize;
  const offsetX = -1.0;
  const offsetY = -0.5 - scale;

  const splitBoundary = -0.99;
  const fontWidth = fontSize; //18;

  const myChars = font.stringToGlyphs(text);

  let charPos = 0;

  const currVertices: Array<number> = [];
  const nextVertices: Array<number> = [];
  const prevVertices: Array<number> = [];
  const indexesRaw: Array<number> = [];

  for (const myChar of myChars) {
    const aPath = myChar.getPath(charPos, 100, fontSize);
    const pointsGroups = pathToPoints(aPath.toPathData(5), splitBoundary);

    charPos += myChar.advanceWidth / 1000 * fontWidth;

    const charPolygons = pointsToPolygons(pointsGroups);

    //unfortunately we need to intepret each vertex individually in each triangle so we must duplicate the vertices
    for (const polygon of charPolygons) {
      for (const triangle of polygon) {
        const v1 = [triangle.p1[0] * scale + offsetX, 1.0 - triangle.p1[1] * scale + offsetY];
        const v2 = [triangle.p2[0] * scale + offsetX, 1.0 - triangle.p2[1] * scale + offsetY];
        const v3 = [triangle.p3[0] * scale + offsetX, 1.0 - triangle.p3[1] * scale + offsetY];

        currVertices.push(...v1, ...v2, ...v3);
        nextVertices.push(...v2, ...v3, ...v1);
        prevVertices.push(...v3, ...v1, ...v2);
        indexesRaw.push(0, 1, 2);
      }
    }
  }

  vertices = new Float32Array(currVertices);
  nextPos = new Float32Array(nextVertices);
  prevPos = new Float32Array(prevVertices);
  indexes = new Float32Array(indexesRaw);

  loadGL();
  drawGL();
}

start();