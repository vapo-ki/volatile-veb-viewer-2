export function vertexShaderCode() {
    return `
    precision mediump float;
    attribute vec3 position;
    attribute vec3 color;
    varying vec3 vColor;

    uniform mat4 mvpMatrix;

    void main() {
        vColor = color;
        gl_Position = mvpMatrix * vec4(position, 1);
    }
    `
}