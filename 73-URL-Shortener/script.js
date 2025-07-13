document.addEventListener('DOMContentLoaded', () => {
    const shortenBtn = document.getElementById('shorten-btn');
    const longUrlEl = document.getElementById('long-url');
    const bitlyApiKeyEl = document.getElementById('bitly-api-key');
    const shortUrlEl = document.getElementById('short-url');
    const copyBtn = document.getElementById('copy-btn');

    shortenBtn.addEventListener('click', async () => {
        const longUrl = longUrlEl.value.trim();
        const API_KEY = bitlyApiKeyEl.value.trim();

        if (!longUrl) {
            alert('長いURLを入力してください。');
            return;
        }

        if (!API_KEY) {
            alert('Bitly APIキーを入力してください。');
            return;
        }

        // Bitly API v4
        const API_URL = 'https://api-ssl.bitly.com/v4/shorten';

        shortUrlEl.value = '短縮中...';
        shortenBtn.disabled = true;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    long_url: longUrl
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`APIエラー: ${response.status} - ${errorData.message || response.statusText}`);
            }

            const data = await response.json();
            if (data.link) {
                shortUrlEl.value = data.link;
            } else {
                shortUrlEl.value = '短縮に失敗しました。';
            }
        } catch (error) {
            console.error('Error shortening URL:', error);
            shortUrlEl.value = `エラー: ${error.message}`;
        } finally {
            shortenBtn.disabled = false;
        }
    });

    copyBtn.addEventListener('click', () => {
        shortUrlEl.select();
        document.execCommand('copy');
        copyBtn.textContent = 'コピーしました！';
        setTimeout(() => {
            copyBtn.textContent = 'コピー';
        }, 2000);
    });
});