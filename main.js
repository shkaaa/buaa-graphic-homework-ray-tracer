let gl, program;

//边界
const glBounds = [
    -2, 2,  // Upper left
    2, 2,   // Upper right
    -2, -2, // Lower left
    2, -2,  // Lower right
];

//变换角度
let alpha = 0;
//图形直接再着色器中绘制
function main() {
    const canvas = document.querySelector('canvas');
    gl = WebGLUtils.setupWebGL(canvas, undefined);
    if (!gl) {
        console.log("Failed to get the rendering context for WebGL");
        return;
    }
    program = initShaders(gl, 'vshader', 'fshader');
    gl.useProgram(program);
    gl.viewport(0, 0, canvas.width, canvas.height);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(glBounds), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(program, 'vPosition');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    requestAnimationFrame(render);
}

function render() {

    // 更改角度变化
    alpha = (alpha + 0.002) % 1;
    gl.uniform1f(gl.getUniformLocation(program, 'alpha'), alpha);

    // 设置场景
    gl.uniform1f(
        gl.getUniformLocation(program, 'img'),
        parseFloat(document.getElementById('image').value),
    );

    gl.uniform1f(
        gl.getUniformLocation(program, 'reflections'),
        parseFloat(document.getElementById('reflect').value),
    );

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(render);
}
