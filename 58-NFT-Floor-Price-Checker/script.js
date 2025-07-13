document.addEventListener('DOMContentLoaded', () => {
    const checkPriceBtn = document.getElementById('check-price-btn');
    const collectionSlugEl = document.getElementById('collection-slug');
    const floorPriceResultEl = document.getElementById('floor-price-result');

    checkPriceBtn.addEventListener('click', async () => {
        const slug = collectionSlugEl.value.trim();

        if (!slug) {
            alert('コレクションスラッグを入力してください。');
            return;
        }

        // OpenSea API (V1) - APIキー不要だがレート制限あり
        const API_URL = `https://api.opensea.io/api/v1/collection/${slug}/stats`;

        floorPriceResultEl.textContent = '取得中...';
        checkPriceBtn.disabled = true;

        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`APIエラー: ${response.status} - ${errorData.errors ? JSON.stringify(errorData.errors) : response.statusText}`);
            }
            const data = await response.json();

            if (data.stats && data.stats.floor_price) {
                floorPriceResultEl.textContent = `${data.stats.floor_price} ETH`;
            } else {
                floorPriceResultEl.textContent = 'フロア価格が見つかりませんでした。スラッグが正しいか確認してください。';
            }
        } catch (error) {
            console.error('Error fetching floor price:', error);
            floorPriceResultEl.textContent = `エラーが発生しました。(${error.message})\nコンソールで詳細を確認してください。`;
        } finally {
            checkPriceBtn.disabled = false;
        }
    });
});