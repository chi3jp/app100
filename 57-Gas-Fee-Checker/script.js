document.addEventListener('DOMContentLoaded', () => {
    const checkGasBtn = document.getElementById('check-gas-btn');
    const etherscanApiKeyEl = document.getElementById('etherscan-api-key');
    const standardGasEl = document.getElementById('standard-gas');
    const fastGasEl = document.getElementById('fast-gas');
    const fastestGasEl = document.getElementById('fastest-gas');

    checkGasBtn.addEventListener('click', async () => {
        const API_KEY = etherscanApiKeyEl.value.trim();

        if (!API_KEY) {
            alert('Etherscan APIキーを入力してください。');
            return;
        }

        const API_URL = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${API_KEY}`;

        standardGasEl.textContent = '取得中...';
        fastGasEl.textContent = '取得中...';
        fastestGasEl.textContent = '取得中...';
        checkGasBtn.disabled = true;

        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`APIエラー: ${response.status} - ${errorText}`);
            }
            const data = await response.json();

            if (data.status === '1' && data.message === 'OK') {
                standardGasEl.textContent = data.result.ProposeGasPrice;
                fastGasEl.textContent = data.result.FastGasPrice;
                fastestGasEl.textContent = data.result.FastestGasPrice;
            } else {
                throw new Error(`Etherscan APIからの応答エラー: ${data.message || '不明なエラー'}`);
            }
        } catch (error) {
            console.error('Error fetching gas prices:', error);
            standardGasEl.textContent = 'エラー';
            fastGasEl.textContent = 'エラー';
            fastestGasEl.textContent = 'エラー';
            alert(`ガス代の取得に失敗しました。APIキーが正しいか、または時間をおいて再度お試しください。\n詳細: ${error.message}`);
        } finally {
            checkGasBtn.disabled = false;
        }
    });
});