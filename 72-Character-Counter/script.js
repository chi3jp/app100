document.addEventListener('DOMContentLoaded', () => {
    const inputTextEl = document.getElementById('input-text');
    const charCountEl = document.getElementById('char-count');
    const wordCountEl = document.getElementById('word-count');
    const lineCountEl = document.getElementById('line-count');

    function updateCounts() {
        const text = inputTextEl.value;

        // 文字数
        charCountEl.textContent = text.length;

        // 単語数 (スペースで区切られた単語をカウント)
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        wordCountEl.textContent = words.length;

        // 行数
        const lines = text.split(/\r\n|\r|\n/).filter(line => line.trim().length > 0);
        lineCountEl.textContent = lines.length;
    }

    inputTextEl.addEventListener('input', updateCounts);

    updateCounts(); // Initial count
});