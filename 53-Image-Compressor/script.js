document.addEventListener('DOMContentLoaded', () => {
    const uploadImageEl = document.getElementById('upload-image');
    const qualityEl = document.getElementById('quality');
    const qualityValueEl = document.getElementById('quality-value');
    const compressBtn = document.getElementById('compress-btn');
    const previewCanvas = document.getElementById('preview-canvas');
    const ctx = previewCanvas.getContext('2d');
    const originalSizeEl = document.getElementById('original-size');
    const compressedSizeEl = document.getElementById('compressed-size');

    let originalImage = null;
    let originalFileSize = 0;

    uploadImageEl.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            originalFileSize = file.size;
            originalSizeEl.textContent = (originalFileSize / 1024).toFixed(2);

            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    originalImage = img;
                    drawAndCompress();
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    function drawAndCompress() {
        if (!originalImage) return;

        previewCanvas.width = originalImage.width;
        previewCanvas.height = originalImage.height;

        ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
        ctx.drawImage(originalImage, 0, 0);

        const quality = parseFloat(qualityEl.value);
        qualityValueEl.textContent = quality;

        // 圧縮後のサイズを計算
        const compressedDataUrl = previewCanvas.toDataURL('image/jpeg', quality);
        const compressedFileSize = Math.round((compressedDataUrl.length * 0.75) / 1024); // Base64 to bytes
        compressedSizeEl.textContent = compressedFileSize.toFixed(2);
    }

    qualityEl.addEventListener('input', drawAndCompress);

    compressBtn.addEventListener('click', () => {
        if (!originalImage) {
            alert('画像をアップロードしてください。');
            return;
        }

        const quality = parseFloat(qualityEl.value);
        const link = document.createElement('a');
        link.download = 'compressed_image.jpg';
        link.href = previewCanvas.toDataURL('image/jpeg', quality);
        link.click();
    });
});