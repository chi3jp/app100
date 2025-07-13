document.addEventListener('DOMContentLoaded', () => {
    const text1El = document.getElementById('text1');
    const text2El = document.getElementById('text2');
    const compareBtn = document.getElementById('compare-btn');
    const diffOutputEl = document.getElementById('diff-output');

    compareBtn.addEventListener('click', () => {
        const text1 = text1El.value;
        const text2 = text2El.value;

        const diffs = Diff.diffChars(text1, text2);

        diffOutputEl.innerHTML = '';
        diffs.forEach(part => {
            const span = document.createElement('span');
            span.textContent = part.value;
            if (part.added) {
                span.classList.add('diff-added');
            } else if (part.removed) {
                span.classList.add('diff-removed');
            }
            diffOutputEl.appendChild(span);
        });
    });

    // 初期表示
    text1El.value = "これは元のテキストです。\n変更点があります。\n新しい行が追加されました。";
    text2El.value = "これは変更されたテキストです。\n変更点があります。\n新しい行が追加されました。\nさらに別の行も追加。";
    compareBtn.click();
});