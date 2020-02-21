import { fetchAsText } from "./lib-net.js";

/**
 * 
 * @param {WebGLRenderingContext} gl 
 * @param {string} vertexShaderCode 
 */
export function createVertexShader(gl, vertexShaderCode) {
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderCode);
  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
    throw new Error(
      `Vertex shader failed to compile.  The error log is: ${
      gl.getShaderInfoLog(vertexShader)}`);
  return vertexShader;
}

/**
 * 
 * @param {WebGLRenderingContext} gl 
 * @param {string} vertexShaderCodePath
 */
export async function createVertexShaderFromPath(gl, vertexShaderCodePath) {
  const vertexShaderCode = await fetchAsText(vertexShaderCodePath);
  return createVertexShader(gl, vertexShaderCode);
}

/**
 * 
 * @param {WebGLRenderingContext} gl 
 * @param {string} fragmentShaderCode 
 */
export function createFragmentShader(gl, fragmentShaderCode) {
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderCode);
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))
    throw new Error(
      `Fragment shader failed to compile.  The error log is: ${
      gl.getShaderInfoLog(fragmentShader)}`);
  return fragmentShader;
}

/**
 * 
 * @param {WebGLRenderingContext} gl 
 * @param {string} fragmentShaderCodePath 
 */
export async function createFragmentShaderFromPath(gl, fragmentShaderCodePath) {
  const fragmentShaderCode = await fetchAsText(fragmentShaderCodePath);
  return createFragmentShader(gl, fragmentShaderCode);
}

/**
 * 
 * @param {WebGLRenderingContext} gl 
 * @param {string} vertexShaderCode 
 * @param {string} fragmentShaderCode 
 */
export function createProgram(gl, vertexShaderCode, fragmentShaderCode) {
  const vertexShader = createVertexShader(gl, vertexShaderCode);
  const fragmentShader = createFragmentShader(gl, fragmentShaderCode);

  return createProgramFromShaders(
    gl,
    vertexShader,
    fragmentShader,
  );
}

/**
 * 
 * @param {WebGLRenderingContext} gl 
 * @param {string} vertexShaderCodePath 
 * @param {string} fragmentShaderCodePath 
 */
export async function createProgramFromPaths(gl, vertexShaderCodePath, fragmentShaderCodePath) {
  const vertexShader = await createVertexShaderFromPath(gl, vertexShaderCodePath);
  const fragmentShader = await createVertexShaderFromPath(gl, fragmentShaderCodePath);

  return createProgramFromShaders(
    gl,
    vertexShader,
    fragmentShader,
  );
}

/**
 * 
 * @param {WebGLRenderingContext} gl 
 * @param {WebGLShader} vertexShader 
 * @param {WebGLShader} fragmentShader 
 */
export function createProgramFromShaders(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    throw new Error(
      `Shader program failed to link.  The error log is: ${
      gl.getProgramInfoLog(program)}`);

  return program;
}

