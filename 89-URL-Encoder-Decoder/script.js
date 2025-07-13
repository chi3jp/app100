document.addEventListener('DOMContentLoaded', () => {
    const inputTextEl = document.getElementById('input-text');
    const conversionTypeEl = document.getElementById('conversion-type');
    const processBtn = document.getElementById('process-btn');
    const outputTextEl = document.getElementById('output-text');
    const copyBtn = document.getElementById('copy-btn');

    function processUrl() {
        const text = inputTextEl.value.trim();
        const type = conversionTypeEl.value;
        let result = '';

        if (!text) {
            outputTextEl.value = '';
            return;
        }

        try {
            if (type === 'encode') {
                result = encodeURIComponent(text);
            } else if (type === 'decode') {
                result = decodeURIComponent(text);
            }
        } catch (e) {
            result = 'エラー: 無効なURLまたはテキストです。';
            console.error(e);
        }
        outputTextEl.value = result;
    }

    processBtn.addEventListener('click', processUrl);
    inputTextEl.addEventListener('input', processUrl);
    conversionTypeEl.addEventListener('change', processUrl);

    copyBtn.addEventListener('click', () => {
        outputTextEl.select();
        document.execCommand('copy');
        copyBtn.textContent = 'コピーしました！';
        setTimeout(() => {
            copyBtn.textContent = 'コピー';
        }, 2000);
    });

    // 初期テキスト
    inputTextEl.value = "https://example.com/?name=テスト&param=値";
    processUrl(); // Initial process
});