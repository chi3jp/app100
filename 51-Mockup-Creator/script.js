document.addEventListener('DOMContentLoaded', () => {
    const bgColorEl = document.getElementById('bg-color');
    const textColorEl = document.getElementById('text-color');
    const mockupTextEl = document.getElementById('mockup-text');
    const fontSizeEl = document.getElementById('font-size');
    const generateBtn = document.getElementById('generate-btn');
    const mockupCanvas = document.getElementById('mockup-canvas');
    const ctx = mockupCanvas.getContext('2d');

    // Canvasの初期サイズ
    mockupCanvas.width = 600;
    mockupCanvas.height = 400;

    function drawMockup() {
        const bgColor = bgColorEl.value;
        const textColor = textColorEl.value;
        const text = mockupTextEl.value;
        const fontSize = fontSizeEl.value;

        // 背景を描画
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, mockupCanvas.width, mockupCanvas.height);

        // テキストを描画
        ctx.fillStyle = textColor;
        ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, mockupCanvas.width / 2, mockupCanvas.height / 2);
    }

    bgColorEl.addEventListener('input', drawMockup);
    textColorEl.addEventListener('input', drawMockup);
    mockupTextEl.addEventListener('input', drawMockup);
    fontSizeEl.addEventListener('input', drawMockup);

    generateBtn.addEventListener('click', () => {
        drawMockup(); // 最新の状態で描画
        const link = document.createElement('a');
        link.download = 'mockup.png';
        link.href = mockupCanvas.toDataURL('image/png');
        link.click();
    });

    drawMockup(); // Initial draw
});