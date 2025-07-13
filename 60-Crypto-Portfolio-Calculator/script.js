document.addEventListener('DOMContentLoaded', () => {
    const cryptoSelectEl = document.getElementById('crypto-select');
    const amountEl = document.getElementById('amount');
    const calculateBtn = document.getElementById('calculate-btn');
    const portfolioValueEl = document.getElementById('portfolio-value');

    calculateBtn.addEventListener('click', async () => {
        const cryptoId = cryptoSelectEl.value;
        const amount = parseFloat(amountEl.value);

        if (isNaN(amount) || amount <= 0) {
            alert('有効な数量を入力してください。');
            return;
        }

        // CoinGecko API (APIキー不要だがレート制限あり)
        const API_URL = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd`;

        portfolioValueEl.textContent = '計算中...';
        calculateBtn.disabled = true;

        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`APIエラー: ${response.status} - ${errorText}`);
            }
            const data = await response.json();

            if (data[cryptoId] && data[cryptoId].usd) {
                const priceUsd = data[cryptoId].usd;
                const totalValue = amount * priceUsd;
                portfolioValueEl.textContent = `$${totalValue.toFixed(2)}`;
            } else {
                portfolioValueEl.textContent = '価格情報が見つかりませんでした。';
            }
        } catch (error) {
            console.error('Error fetching crypto price:', error);
            portfolioValueEl.textContent = `エラーが発生しました。(${error.message})\n時間をおいて再度お試しください。`;
        } finally {
            calculateBtn.disabled = false;
        }
    });

    // 初期計算
    calculateBtn.click();
});