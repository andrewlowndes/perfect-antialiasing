import { vec2 } from 'gl-matrix';

import type { Point } from '../interfaces/Point';

import vertCode from '../shaders/conservative.vert';
import fragCode from '../shaders/conservative.frag';

const vertexSize = 2;

const vertices = new Float32Array([
    -0.75, -0.75, 0.0, 0.75,
    //-0.5, -0.2,
    0.75, -0.75
]);

const nextPos = Float32Array.of(...vertices.slice(vertexSize), ...vertices.slice(0, vertexSize));
const prevPos = Float32Array.of(
    ...vertices.slice(vertices.length - vertexSize),
    ...vertices.slice(0, vertices.length - vertexSize)
);

const uv = new Float32Array([1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0]);

const indices = new Uint16Array([0, 1, 2]);

const canvas = document.getElementById('canvas1') as HTMLCanvasElement;

const canvas2 = document.getElementById('canvas2') as HTMLCanvasElement;
const g = canvas2.getContext('2d');

if (!g) {
    throw new Error('Could not initialise graphics :(');
}

const pi2 = Math.PI * 2;
const canvasScale = canvas2.width / canvas.width;

const getX = (index: number) => Math.floor((vertices[indices[index] * vertexSize] / 2 + 0.5) * canvas2.width);
const getY = (index: number) =>
    Math.floor(canvas2.height - (vertices[indices[index] * vertexSize + 1] / 2 + 0.5) * canvas2.height);

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

    const p1 = vec2.fromValues(getX(0), getY(0));
    const p2 = vec2.fromValues(getX(1), getY(1));
    const p3 = vec2.fromValues(getX(2), getY(2));

    //draw the main triangle
    g.strokeStyle = 'white';
    g.beginPath();
    g.moveTo(p1[0], p1[1]);
    g.lineTo(p2[0], p2[1]);
    g.lineTo(p3[0], p3[1]);
    g.closePath();
    g.stroke();

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
        g.arc(point[0], point[1], radius, 0, pi2);
        g.fill();
    }
};

const gl = canvas.getContext('webgl2', { antialias: false });

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

const uvAttr = gl.getAttribLocation(shaderProgram, 'uv');
gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
gl.vertexAttribPointer(uvAttr, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(uvAttr);

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

    gl.drawArrays(gl.TRIANGLES, 0, 3);
};

//animate the top vertex between -1 and 1 and trigger to redraw
const setVertexPosition = (index: number, pos: Point) => {
    const startIndex = index * vertexSize;
    vertices[startIndex] = pos[0];
    vertices[startIndex + 1] = pos[1];

    const prevPosStartIndex = (startIndex + vertexSize) % prevPos.length;
    prevPos[prevPosStartIndex] = pos[0];
    prevPos[prevPosStartIndex + 1] = pos[1];

    const nextPosStartIndex = (startIndex - vertexSize + nextPos.length) % nextPos.length;
    nextPos[nextPosStartIndex] = pos[0];
    nextPos[nextPosStartIndex + 1] = pos[1];
};

const p1Dir = vec2.fromValues(1, 1);
const p2Dir = vec2.fromValues(-1, -1);
const p3Dir = vec2.fromValues(-1, -1);
const newP1 = vec2.fromValues(vertices[0], vertices[1]);
const newP2 = vec2.fromValues(vertices[2], vertices[3]);
const newP3 = vec2.fromValues(vertices[4], vertices[5]);
const step = 0.001;

const animate = () => {
    newP1[0] += step * p1Dir[0];
    newP1[1] += step * p1Dir[1];
    if (Math.abs(newP1[0]) > 1) p1Dir[0] *= -1;
    if (Math.abs(newP1[1]) > 1) p1Dir[1] *= -1;
    setVertexPosition(0, newP1);

    newP2[0] += step * p2Dir[0];
    newP2[1] += step * p2Dir[1];
    if (Math.abs(newP2[0]) > 1) p2Dir[0] *= -1;
    if (Math.abs(newP2[1]) > 1) p2Dir[1] *= -1;
    setVertexPosition(1, newP2);

    newP3[0] += step * p3Dir[0];
    newP3[1] += step * p3Dir[1];
    if (Math.abs(newP3[0]) > 1) p3Dir[0] *= -1;
    if (Math.abs(newP3[1]) > 1) p3Dir[1] *= -1;
    setVertexPosition(2, newP3);

    draw2D();
    drawGL();
    requestAnimationFrame(animate);
};

animate();
