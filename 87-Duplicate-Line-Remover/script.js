document.addEventListener('DOMContentLoaded', () => {
    const inputTextEl = document.getElementById('input-text');
    const removeDuplicatesBtn = document.getElementById('remove-duplicates-btn');
    const outputTextEl = document.getElementById('output-text');
    const copyBtn = document.getElementById('copy-btn');

    function removeDuplicateLines() {
        const text = inputTextEl.value.trim();
        if (!text) {
            outputTextEl.value = '';
            return;
        }

        const lines = text.split(/\r\n|\r|\n/);
        const uniqueLines = [];
        const seen = new Set();

        lines.forEach(line => {
            const trimmedLine = line.trim();
            if (!seen.has(trimmedLine)) {
                uniqueLines.push(line); // 元の行を保持
                seen.add(trimmedLine);
            }
        });
        outputTextEl.value = uniqueLines.join('\n');
    }

    removeDuplicatesBtn.addEventListener('click', removeDuplicateLines);
    inputTextEl.addEventListener('input', removeDuplicateLines);

    copyBtn.addEventListener('click', () => {
        outputTextEl.select();
        document.execCommand('copy');
        copyBtn.textContent = 'コピーしました！';
        setTimeout(() => {
            copyBtn.textContent = 'コピー';
        }, 2000);
    });

    // 初期テキスト
    inputTextEl.value = "Apple\nBanana\nApple\nCherry\nBanana\nDate";
    removeDuplicateLines(); // Initial removal
});