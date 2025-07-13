document.addEventListener('DOMContentLoaded', () => {
    const uploadImageEl = document.getElementById('upload-image');
    const extractBtn = document.getElementById('extract-btn');
    const paletteDisplayEl = document.getElementById('palette-display');
    const imageCanvas = document.getElementById('image-canvas');
    const ctx = imageCanvas.getContext('2d');

    extractBtn.addEventListener('click', () => {
        const file = uploadImageEl.files[0];
        if (!file) {
            alert('画像ファイルを選択してください。');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                imageCanvas.width = img.width;
                imageCanvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);

                const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
                const colors = {};

                // ピクセルデータをサンプリングして色をカウント
                // 処理負荷軽減のため、間隔を空けてサンプリング
                const sampleStep = 10; 
                for (let i = 0; i < imageData.length; i += 4 * sampleStep) {
                    const r = imageData[i];
                    const g = imageData[i + 1];
                    const b = imageData[i + 2];
                    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
                    colors[hex] = (colors[hex] || 0) + 1;
                }

                // 出現頻度でソートし、上位の色を取得
                const sortedColors = Object.entries(colors).sort(([, countA], [, countB]) => countB - countA);
                const topColors = sortedColors.slice(0, 5); // 上位5色を表示

                paletteDisplayEl.innerHTML = '';
                if (topColors.length > 0) {
                    topColors.forEach(([hexColor, count]) => {
                        const colorBox = document.createElement('div');
                        colorBox.className = 'color-box';
                        colorBox.style.backgroundColor = hexColor;
                        colorBox.textContent = hexColor;
                        colorBox.title = `出現回数: ${count}`;
                        colorBox.addEventListener('click', () => {
                            navigator.clipboard.writeText(hexColor);
                            alert(`${hexColor} をコピーしました！`);
                        });
                        paletteDisplayEl.appendChild(colorBox);
                    });
                } else {
                    paletteDisplayEl.textContent = '色を抽出できませんでした。';
                }
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
});