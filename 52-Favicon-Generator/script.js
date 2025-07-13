document.addEventListener('DOMContentLoaded', () => {
    const uploadImageEl = document.getElementById('upload-image');
    const generateBtn = document.getElementById('generate-btn');
    const previewCanvas = document.getElementById('preview-canvas');
    const ctx = previewCanvas.getContext('2d');

    const FAVICON_SIZE = 32; // Faviconの標準サイズ

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

        // プレビュー用のCanvasサイズを設定
        previewCanvas.width = FAVICON_SIZE;
        previewCanvas.height = FAVICON_SIZE;

        ctx.clearRect(0, 0, FAVICON_SIZE, FAVICON_SIZE);
        ctx.drawImage(originalImage, 0, 0, FAVICON_SIZE, FAVICON_SIZE);
    }

    generateBtn.addEventListener('click', () => {
        if (!originalImage) {
            alert('画像をアップロードしてください。');
            return;
        }

        // Favicon用のCanvasを作成
        const faviconCanvas = document.createElement('canvas');
        faviconCanvas.width = FAVICON_SIZE;
        faviconCanvas.height = FAVICON_SIZE;
        const faviconCtx = faviconCanvas.getContext('2d');

        // 画像をFaviconサイズに描画
        faviconCtx.drawImage(originalImage, 0, 0, FAVICON_SIZE, FAVICON_SIZE);

        // ダウンロード
        const link = document.createElement('a');
        link.download = 'favicon.png';
        link.href = faviconCanvas.toDataURL('image/png');
        link.click();
    });
});