document.addEventListener('DOMContentLoaded', () => {
    const inputTextEl = document.getElementById('input-text');
    const sortTypeEl = document.getElementById('sort-type');
    const sortBtn = document.getElementById('sort-btn');
    const outputTextEl = document.getElementById('output-text');
    const copyBtn = document.getElementById('copy-btn');

    function sortText() {
        const text = inputTextEl.value.trim();
        if (!text) {
            outputTextEl.value = '';
            return;
        }

        let lines = text.split(/\r\n|\r|\n/);

        const sortType = sortTypeEl.value;

        switch (sortType) {
            case 'alphabetical-asc':
                lines.sort((a, b) => a.localeCompare(b));
                break;
            case 'alphabetical-desc':
                lines.sort((a, b) => b.localeCompare(a));
                break;
            case 'length-asc':
                lines.sort((a, b) => a.length - b.length);
                break;
            case 'length-desc':
                lines.sort((a, b) => b.length - a.length);
                break;
            case 'random':
                lines.sort(() => Math.random() - 0.5);
                break;
        }
        outputTextEl.value = lines.join('\n');
    }

    sortBtn.addEventListener('click', sortText);
    inputTextEl.addEventListener('input', sortText);
    sortTypeEl.addEventListener('change', sortText);

    copyBtn.addEventListener('click', () => {
        outputTextEl.select();
        document.execCommand('copy');
        copyBtn.textContent = 'コピーしました！';
        setTimeout(() => {
            copyBtn.textContent = 'コピー';
        }, 2000);
    });

    // 初期テキスト
    inputTextEl.value = "Apple\nBanana\nCherry\nDate\nElderberry";
    sortText(); // Initial sort
});