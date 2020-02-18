//
//  initShaders.js
//

/**
 * 
 * @param {WebGLRenderingContext} gl 
 * @param {string} vertexShaderId 
 * @param {string} fragmentShaderId 
 */
export function initShaders(gl, vertexShaderId, fragmentShaderId) {
  var vertShdr;
  var fragShdr;

  /** @type {HTMLScriptElement} */
  let vertElem;

  // @ts-ignore
  vertElem = document.getElementById(vertexShaderId);
  if (!vertElem) {
    alert("Unable to load vertex shader " + vertexShaderId);
    return -1;
  }
  else {
    vertShdr = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShdr, vertElem.text);
    gl.compileShader(vertShdr);
    if (!gl.getShaderParameter(vertShdr, gl.COMPILE_STATUS)) {
      var msg = "Vertex shader failed to compile.  The error log is:"
        + "<pre>" + gl.getShaderInfoLog(vertShdr) + "</pre>";
      throw new Error(msg);
    }
  }

  var fragElem = document.getElementById(fragmentShaderId);
  if (!fragElem) {
    throw new Error("Unable to load vertex shader " + fragmentShaderId);
  }
  else {
    fragShdr = gl.createShader(gl.FRAGMENT_SHADER);
    // @ts-ignore
    gl.shaderSource(fragShdr, fragElem.text);
    gl.compileShader(fragShdr);
    if (!gl.getShaderParameter(fragShdr, gl.COMPILE_STATUS)) {
      const msg = "Fragment shader failed to compile.  The error log is:"
        + "<pre>" + gl.getShaderInfoLog(fragShdr) + "</pre>";
      throw new Error(msg);
    }
  }

  const program = gl.createProgram();
  gl.attachShader(program, vertShdr);
  gl.attachShader(program, fragShdr);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const msg = "Shader program failed to link.  The error log is:"
      + "<pre>" + gl.getProgramInfoLog(program) + "</pre>";
    throw new Error(msg);
  }

  return program;
}
