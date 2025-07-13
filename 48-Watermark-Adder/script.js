document.addEventListener('DOMContentLoaded', () => {
    const uploadImageEl = document.getElementById('upload-image');
    const watermarkTextEl = document.getElementById('watermark-text');
    const fontSizeEl = document.getElementById('font-size');
    const opacityEl = document.getElementById('opacity');
    const opacityValueEl = document.getElementById('opacity-value');
    const positionEl = document.getElementById('position');
    const addWatermarkBtn = document.getElementById('add-watermark-btn');
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
                    drawWatermarkedImage();
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    function drawWatermarkedImage() {
        if (!originalImage) return;

        previewCanvas.width = originalImage.width;
        previewCanvas.height = originalImage.height;

        ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
        ctx.drawImage(originalImage, 0, 0);

        const watermarkText = watermarkTextEl.value;
        const fontSize = fontSizeEl.value;
        const opacity = opacityEl.value;
        const position = positionEl.value;

        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`; // 黒色で透明度を適用
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        let x, y;

        switch (position) {
            case 'center':
                x = previewCanvas.width / 2;
                y = previewCanvas.height / 2;
                break;
            case 'top-left':
                x = fontSize;
                y = fontSize;
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                break;
            case 'top-right':
                x = previewCanvas.width - fontSize;
                y = fontSize;
                ctx.textAlign = 'right';
                ctx.textBaseline = 'top';
                break;
            case 'bottom-left':
                x = fontSize;
                y = previewCanvas.height - fontSize;
                ctx.textAlign = 'left';
                ctx.textBaseline = 'bottom';
                break;
            case 'bottom-right':
                x = previewCanvas.width - fontSize;
                y = previewCanvas.height - fontSize;
                ctx.textAlign = 'right';
                ctx.textBaseline = 'bottom';
                break;
        }

        ctx.fillText(watermarkText, x, y);
        opacityValueEl.textContent = opacity;
    }

    watermarkTextEl.addEventListener('input', drawWatermarkedImage);
    fontSizeEl.addEventListener('input', drawWatermarkedImage);
    opacityEl.addEventListener('input', drawWatermarkedImage);
    positionEl.addEventListener('change', drawWatermarkedImage);

    addWatermarkBtn.addEventListener('click', () => {
        if (!originalImage) {
            alert('画像をアップロードしてください。');
            return;
        }
        const link = document.createElement('a');
        link.download = 'watermarked_image.png';
        link.href = previewCanvas.toDataURL('image/png');
        link.click();
    });
});