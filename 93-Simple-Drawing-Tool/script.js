document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('drawing-canvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('color-picker');
    const lineWidthEl = document.getElementById('line-width');
    const lineWidthValueEl = document.getElementById('line-width-value');
    const clearBtn = document.getElementById('clear-btn');
    const downloadBtn = document.getElementById('download-btn');

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // 初期設定
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = lineWidthEl.value;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    function draw(e) {
        if (!isDrawing) return;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);

    colorPicker.addEventListener('input', (e) => {
        ctx.strokeStyle = e.target.value;
    });

    lineWidthEl.addEventListener('input', (e) => {
        ctx.lineWidth = e.target.value;
        lineWidthValueEl.textContent = e.target.value;
    });

    clearBtn.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'my-drawing.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});