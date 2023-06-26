import React, { useEffect } from "react";
import { mat4 } from "gl-matrix";
import { vertexShaderCode } from "./shader/vertex";
import { fragmentShaderCode } from './shader/fragment'
import "./Viewer.css";

function createCanvas() {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("id", "gl-canvas");
  canvas.setAttribute("width", "1920px");
  canvas.setAttribute("height", "1080px");

  return canvas;
}

function createBuffer(gl, data) {
  const buffer = gl.createBuffer(data);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

  return buffer;
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  return shader
}

function createProgram(gl, vertexData, colorData) {
  const positionBuffer = createBuffer(gl, vertexData);
  const colorBuffer = createBuffer(gl, colorData);

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderCode())
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderCode())

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  const positionLocation = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(positionLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

  const colorLocation = gl.getAttribLocation(program, "color");
  gl.enableVertexAttribArray(colorLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

  gl.useProgram(program);
  gl.enable(gl.DEPTH_TEST);

  return program
}

function randomColor() {
  {
    return [Math.random(), Math.random(), Math.random()];
  }
}

function getCanvas() {
  const canvas = createCanvas();
  const gl = canvas.getContext("webgl");

  // prettier-ignore
  const vertexData = [
        // Front
    0.5, 0.5, 0.5,
    0.5, -.5, 0.5,
    -.5, 0.5, 0.5,
    -.5, 0.5, 0.5,
    0.5, -.5, 0.5,
    -.5, -.5, 0.5,

    // Left
    -.5, 0.5, 0.5,
    -.5, -.5, 0.5,
    -.5, 0.5, -.5,
    -.5, 0.5, -.5,
    -.5, -.5, 0.5,
    -.5, -.5, -.5,

    // Back
    -.5, 0.5, -.5,
    -.5, -.5, -.5,
    0.5, 0.5, -.5,
    0.5, 0.5, -.5,
    -.5, -.5, -.5,
    0.5, -.5, -.5,

    // Right
    0.5, 0.5, -.5,
    0.5, -.5, -.5,
    0.5, 0.5, 0.5,
    0.5, 0.5, 0.5,
    0.5, -.5, 0.5,
    0.5, -.5, -.5,

    // Top
    0.5, 0.5, 0.5,
    0.5, 0.5, -.5,
    -.5, 0.5, 0.5,
    -.5, 0.5, 0.5,
    0.5, 0.5, -.5,
    -.5, 0.5, -.5,

    // Bottom
    0.5, -.5, 0.5,
    0.5, -.5, -.5,
    -.5, -.5, 0.5,
    -.5, -.5, 0.5,
    0.5, -.5, -.5,
    -.5, -.5, -.5,
    ];

  let colorData = [];
  for (let face = 0; face < 6; face++) {
    const faceColor = randomColor();
    for (let vertex = 0; vertex < 6; vertex++) {
      colorData.push(...faceColor);
    }
  }

  const program = createProgram(gl, vertexData, colorData)


  const uniformLocations = {
    mvpMatrix: gl.getUniformLocation(program, "mvpMatrix"),
  };

  const modelMatrix = mat4.create();
  const viewMatrix = mat4.create();
  const projectionMatrix = mat4.create();
  mat4.perspective(
    projectionMatrix,
    (75 * Math.PI) / 180, // vertical FOV (angle)
    canvas.width / canvas.height, // aspect ratio of canvas
    0.0001, // near cull
    10000 // far cull
  );

  const mvMatrix = mat4.create();
  const mvpMatrix = mat4.create();
  mat4.translate(modelMatrix, modelMatrix, [-1.5, 0, -2]);

  mat4.translate(viewMatrix, viewMatrix, [0.5, 0, 1]);
  mat4.invert(viewMatrix, viewMatrix);

  function animate() {
    requestAnimationFrame(animate);

    mat4.multiply(mvMatrix, viewMatrix, modelMatrix);
    mat4.multiply(mvpMatrix, projectionMatrix, mvMatrix);

    gl.uniformMatrix4fv(uniformLocations.mvpMatrix, false, mvpMatrix);
    gl.drawArrays(gl.TRIANGLES, 0, vertexData.length / 3);
  }

  animate();

  return canvas;
}

export default function Viewer() {
  useEffect(() => {
    const canvas = getCanvas();
    const container = document.getElementById("canvas-container");

    container.appendChild(canvas);
  }, []);

  return <div id="canvas-container"></div>;
}
