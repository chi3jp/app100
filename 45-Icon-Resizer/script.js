document.addEventListener('DOMContentLoaded', () => {
    const uploadImageEl = document.getElementById('upload-image');
    const newWidthEl = document.getElementById('new-width');
    const newHeightEl = document.getElementById('new-height');
    const resizeBtn = document.getElementById('resize-btn');
    const previewCanvas = document.getElementById('preview-canvas');
    const ctx = previewCanvas.getContext('2d');

    let originalImage = null;

    uploadImageEl.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    originalImage = img;
                    drawPreview();
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    function drawPreview() {
        if (!originalImage) return;

        const newWidth = parseInt(newWidthEl.value, 10);
        const newHeight = parseInt(newHeightEl.value, 10);

        previewCanvas.width = newWidth;
        previewCanvas.height = newHeight;

        ctx.clearRect(0, 0, newWidth, newHeight);
        ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);
    }

    newWidthEl.addEventListener('input', drawPreview);
    newHeightEl.addEventListener('input', drawPreview);

    resizeBtn.addEventListener('click', () => {
        if (!originalImage) {
            alert('画像をアップロードしてください。');
            return;
        }

        const newWidth = parseInt(newWidthEl.value, 10);
        const newHeight = parseInt(newHeightEl.value, 10);

        // 新しいCanvasを作成してリサイズ後の画像を描画
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = newWidth;
        tempCanvas.height = newHeight;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.drawImage(originalImage, 0, 0, newWidth, newHeight);

        // ダウンロード
        const link = document.createElement('a');
        link.download = `resized_icon_${newWidth}x${newHeight}.png`;
        link.href = tempCanvas.toDataURL('image/png');
        link.click();
    });
});