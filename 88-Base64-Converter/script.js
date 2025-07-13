document.addEventListener('DOMContentLoaded', () => {
    const inputTextEl = document.getElementById('input-text');
    const conversionTypeEl = document.getElementById('conversion-type');
    const processBtn = document.getElementById('process-btn');
    const outputTextEl = document.getElementById('output-text');
    const copyBtn = document.getElementById('copy-btn');

    function processText() {
        const text = inputTextEl.value.trim();
        const type = conversionTypeEl.value;
        let result = '';

        if (!text) {
            outputTextEl.value = '';
            return;
        }

        try {
            if (type === 'encode') {
                result = btoa(unescape(encodeURIComponent(text)));
            } else if (type === 'decode') {
                result = decodeURIComponent(escape(atob(text)));
            }
        } catch (e) {
            result = 'エラー: 無効なBase64文字列です。またはエンコード/デコードに失敗しました。';
            console.error(e);
        }
        outputTextEl.value = result;
    }

    processBtn.addEventListener('click', processText);
    inputTextEl.addEventListener('input', processText);
    conversionTypeEl.addEventListener('change', processText);

    copyBtn.addEventListener('click', () => {
        outputTextEl.select();
        document.execCommand('copy');
        copyBtn.textContent = 'コピーしました！';
        setTimeout(() => {
            copyBtn.textContent = 'コピー';
        }, 2000);
    });

    // 初期テキスト
    inputTextEl.value = "Hello, World!";
    processText(); // Initial process
});