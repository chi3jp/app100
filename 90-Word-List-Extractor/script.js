document.addEventListener('DOMContentLoaded', () => {
    const inputTextEl = document.getElementById('input-text');
    const extractBtn = document.getElementById('extract-btn');
    const outputTextEl = document.getElementById('output-text');
    const copyBtn = document.getElementById('copy-btn');

    function extractWords() {
        const text = inputTextEl.value.trim();
        if (!text) {
            outputTextEl.value = '';
            return;
        }

        // 単語を抽出 (スペース、句読点などで分割)
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];

        // 重複を排除し、ソート
        const uniqueWords = [...new Set(words)].sort();

        outputTextEl.value = uniqueWords.join('\n');
    }

    extractBtn.addEventListener('click', extractWords);
    inputTextEl.addEventListener('input', extractWords);

    copyBtn.addEventListener('click', () => {
        outputTextEl.select();
        document.execCommand('copy');
        copyBtn.textContent = 'コピーしました！';
        setTimeout(() => {
            copyBtn.textContent = 'コピー';
        }, 2000);
    });

    // 初期テキスト
    inputTextEl.value = "Hello world. This is a test. Hello again, world!";
    extractWords(); // Initial extraction
});