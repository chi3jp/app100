document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const uploadImageEl = document.getElementById('upload-image');
    const resultArea = document.getElementById('result-area');

    searchBtn.addEventListener('click', async () => {
        const file = uploadImageEl.files[0];

        if (!file) {
            alert('画像ファイルを選択してください。');
            return;
        }

        resultArea.innerHTML = '類似画像を検索中...';
        searchBtn.disabled = true;

        // ここではダミーの類似画像検索結果を返します。
        // 実際の類似画像検索には、Google Cloud Vision APIなどの利用が必要です。
        const dummyImages = [
            'https://via.placeholder.com/100/FF0000/FFFFFF?text=Image1',
            'https://via.placeholder.com/100/00FF00/FFFFFF?text=Image2',
            'https://via.placeholder.com/100/0000FF/FFFFFF?text=Image3',
        ];

        setTimeout(() => {
            resultArea.innerHTML = '';
            if (dummyImages.length > 0) {
                dummyImages.forEach(src => {
                    const img = document.createElement('img');
                    img.src = src;
                    img.className = 'result-image';
                    resultArea.appendChild(img);
                });
            } else {
                resultArea.textContent = '類似画像は見つかりませんでした。';
            }
            searchBtn.disabled = false;
        }, 2000); // 擬似的な処理時間
    });
});