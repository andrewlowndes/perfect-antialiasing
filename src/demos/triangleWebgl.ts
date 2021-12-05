import { mat4 } from 'gl-matrix';
import { loadShader } from '../utils/loadShader';

import vertCode from '../shaders/triangle.vert';
import fragCode from '../shaders/triangle.frag';

let gl: WebGL2RenderingContext;

let viewMatrix: mat4;
let modelMatrix: mat4;
let projectionMatrix: mat4;
let modelViewMatrix: mat4;
let modelViewProjectionMatrix: mat4;

let modelViewProjectionUniform: WebGLUniformLocation;

const load = () => {
    const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
    gl = canvas.getContext('webgl2', { antialias: false, premultipliedAlpha: false })!;

    const vertices = new Float32Array([1, -1, 0, 0, 1, 0, -1, -1, 0]);
    const nextPos = new Float32Array([0, 1, 0, -1, -1, 0, 1, -1, 0]);
    const prevPos = new Float32Array([-1, -1, 0, 1, -1, 0, 0, 1, 0]);
    const colour = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    const indexes = new Float32Array([0, 1, 2]);

    // Create an empty buffer object to store vertex buffer
    const posBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const nextPosBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, nextPosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, nextPos, gl.STATIC_DRAW);

    const prevPosBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, prevPosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, prevPos, gl.STATIC_DRAW);

    const indexBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, indexes, gl.STATIC_DRAW);

    const colourBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, colourBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colour, gl.STATIC_DRAW);

    const shaderProgram = loadShader(gl, vertCode, fragCode);
    gl.useProgram(shaderProgram);

    const posAttr = gl.getAttribLocation(shaderProgram, 'pos');
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.vertexAttribPointer(posAttr, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posAttr);

    const colourAttr = gl.getAttribLocation(shaderProgram, 'colour');
    gl.bindBuffer(gl.ARRAY_BUFFER, colourBuffer);
    gl.vertexAttribPointer(colourAttr, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colourAttr);

    // need to duplicate the vertex buffers just to access the other triangle positions :(
    const prevPosAttr = gl.getAttribLocation(shaderProgram, 'prevPos');
    gl.bindBuffer(gl.ARRAY_BUFFER, prevPosBuffer);
    gl.vertexAttribPointer(prevPosAttr, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(prevPosAttr);

    const nextPosAttr = gl.getAttribLocation(shaderProgram, 'nextPos');
    gl.bindBuffer(gl.ARRAY_BUFFER, nextPosBuffer);
    gl.vertexAttribPointer(nextPosAttr, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(nextPosAttr);

    const screenSizeUniform = gl.getUniformLocation(shaderProgram, 'screenSize');
    gl.uniform2fv(screenSizeUniform, [canvas.width, canvas.height]);

    modelMatrix = mat4.create();

    viewMatrix = mat4.create();
    mat4.lookAt(viewMatrix, [0, 0, -5], [0, 0, 0], [0, 1, 0]);

    projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, (45.0 / 180) * Math.PI, canvas.width / canvas.height, 1, 100);

    modelViewMatrix = mat4.create();
    modelViewProjectionMatrix = mat4.create();

    mat4.multiply(modelViewMatrix, viewMatrix, modelMatrix);
    mat4.multiply(modelViewProjectionMatrix, projectionMatrix, modelViewMatrix);

    modelViewProjectionUniform = gl.getUniformLocation(shaderProgram, 'modelViewProjection')!;
    gl.uniformMatrix4fv(modelViewProjectionUniform, false, modelViewProjectionMatrix);

    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE);
};

const draw = () => {
    gl.clear(gl.COLOR_BUFFER_BIT);

    mat4.rotateY(modelMatrix, modelMatrix, 0.04 / Math.PI);

    mat4.multiply(modelViewMatrix, viewMatrix, modelMatrix);
    mat4.multiply(modelViewProjectionMatrix, projectionMatrix, modelViewMatrix);
    gl.uniformMatrix4fv(modelViewProjectionUniform, false, modelViewProjectionMatrix);

    gl.drawArrays(gl.TRIANGLES, 0, 3);

    requestAnimationFrame(draw);
};

const start = async () => {
    load();
    draw();
};

start();
