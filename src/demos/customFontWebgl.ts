import { load } from 'opentype.js';
import { mat4, vec3 } from 'gl-matrix';

import { pathToPoints } from '../geometry/pathToPoints';
import { pointsToPolygons } from '../geometry/pointsToPolygon';
import { subscribeDrag } from '../utils/subscribeDrag';

import vertCode from '../shaders/font.vert';
import fragCode from '../shaders/font.frag';

const vertexSize = 2;

let canvas: HTMLCanvasElement;
let gl: WebGLRenderingContext;
let vertices: Float32Array;
let nextPos: Float32Array;
let prevPos: Float32Array;
let posBuffer: WebGLBuffer;
let shaderProgram: WebGLShader;
let nextPosBuffer: WebGLBuffer;
let prevPosBuffer: WebGLBuffer;
let modelViewProjectionUniform: WebGLUniformLocation;
let screenSizeUniform: WebGLUniformLocation;

const translate = vec3.fromValues(0, 0, 0);
const scale = vec3.fromValues(20, 20, 1);

const modelMatrix = mat4.create();
const viewMatrix = mat4.create();
const modelViewMatrix = mat4.create();
const projectionMatrix = mat4.create();
const modelViewProjectionMatrix = mat4.create();

const resize = () => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.useProgram(shaderProgram);
    gl.uniform2fv(screenSizeUniform, [canvas.width, canvas.height]);
};

const loadGL = () => {
    canvas = document.getElementById('canvas1') as HTMLCanvasElement;
    gl = canvas.getContext('webgl2', { antialias: false, premultipliedAlpha: false })!;

    //allow the graph to be zoomed and moved using the mouse
    canvas.addEventListener('wheel', (e: WheelEvent) => {
        e.preventDefault();
        scale[0] *= e.deltaY < 0 ? 2.0 : 0.5;
        scale[1] = scale[0];
    });

    subscribeDrag({
        elem: canvas,
        ondrag: (delta) => {
            translate[0] += delta.x;
            translate[1] += delta.y;
        }
    });

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

    shaderProgram = gl.createProgram()!;
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);

    if (String(gl.getProgramInfoLog(shaderProgram)).trim() !== '') {
        throw new Error(String(gl.getProgramInfoLog(shaderProgram)));
    }

    //bind shader params
    gl.useProgram(shaderProgram);

    const posAttr = gl.getAttribLocation(shaderProgram, 'pos');
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.vertexAttribPointer(posAttr, vertexSize, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posAttr);

    // need to duplicate the vertex buffers just to access the other triangle positions :(
    const prevPosAttr = gl.getAttribLocation(shaderProgram, 'prevPos');
    gl.bindBuffer(gl.ARRAY_BUFFER, prevPosBuffer);
    gl.vertexAttribPointer(prevPosAttr, vertexSize, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(prevPosAttr);

    const nextPosAttr = gl.getAttribLocation(shaderProgram, 'nextPos');
    gl.bindBuffer(gl.ARRAY_BUFFER, nextPosBuffer);
    gl.vertexAttribPointer(nextPosAttr, vertexSize, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(nextPosAttr);

    screenSizeUniform = gl.getUniformLocation(shaderProgram, 'screenSize')!;
    modelViewProjectionUniform = gl.getUniformLocation(shaderProgram, 'modelViewProjection')!;

    //init
    gl.clearColor(0.0, 0.0, 0.0, 0.0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE);
};

// draw
const drawGL = () => {
    gl.clear(gl.COLOR_BUFFER_BIT);

    mat4.identity(modelMatrix);
    mat4.scale(modelMatrix, modelMatrix, [1, -1, 1]);
    mat4.translate(modelMatrix, modelMatrix, translate);
    mat4.scale(modelMatrix, modelMatrix, scale);
    mat4.translate(modelMatrix, modelMatrix, [-10, 0, 0]);

    //mat4.lookAt(viewMatrix, [0, 0, 1], [0, 0, 0], [0, 1, 0]);
    //mat4.invert(viewMatrix, viewMatrix);

    const halfWidth = canvas.width / 2;
    const halfHeight = canvas.height / 2;
    mat4.ortho(projectionMatrix, -halfWidth, halfWidth, -halfHeight, halfHeight, 0, 10000);

    mat4.multiply(modelViewMatrix, viewMatrix, modelMatrix);
    mat4.multiply(modelViewProjectionMatrix, projectionMatrix, modelViewMatrix);

    gl.useProgram(shaderProgram);

    gl.uniformMatrix4fv(modelViewProjectionUniform, false, modelViewProjectionMatrix);

    //may as well use drawArrays here since the vertices have had to be duplicated
    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / vertexSize);

    requestAnimationFrame(drawGL);
};

const start = async () => {
    const font = await load('./media/Timeless.ttf');
    const splitBoundary = -0.99;
    const fontSize = 12;
    const text = 'Test';

    const myChars = font.stringToGlyphs(text);

    let charPos = 0;

    const currVertices: Array<number> = [];
    const nextVertices: Array<number> = [];
    const prevVertices: Array<number> = [];

    for (const myChar of myChars) {
        const aPath = myChar.getPath(charPos, 0, fontSize);
        const pointsGroups = pathToPoints(aPath.toPathData(3), splitBoundary);

        charPos += (myChar.advanceWidth / 1000) * fontSize;

        const charPolygons = pointsToPolygons(pointsGroups);

        //unfortunately we need to intepret each vertex individually in each triangle so we must duplicate the vertices
        for (const polygon of charPolygons) {
            for (const { p1, p2, p3 } of polygon) {
                currVertices.push(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
                nextVertices.push(p2[0], p2[1], p3[0], p3[1], p1[0], p1[1]);
                prevVertices.push(p3[0], p3[1], p1[0], p1[1], p2[0], p2[1]);
            }
        }
    }

    vertices = new Float32Array(currVertices);
    nextPos = new Float32Array(nextVertices);
    prevPos = new Float32Array(prevVertices);

    loadGL();
    window.onresize = resize;
    resize();
    drawGL();
};

start();
