document.addEventListener('DOMContentLoaded', () => {
    const subjectEl = document.getElementById('subject');
    const styleEl = document.getElementById('style');
    const lightingEl = document.getElementById('lighting');
    const detailsEl = document.getElementById('details');
    const paramsEl = document.getElementById('params');
    const resultPromptEl = document.getElementById('result-prompt');
    const copyBtn = document.getElementById('copy-btn');

    const formElements = [subjectEl, styleEl, lightingEl, detailsEl, paramsEl];

    function generatePrompt() {
        const parts = [
            subjectEl.value.trim(),
            styleEl.value.trim(),
            lightingEl.value.trim(),
            detailsEl.value.trim(),
        ].filter(p => p.length > 0); // 空の要素をフィルタリング

        let prompt = parts.join(', ');
        const params = paramsEl.value.trim();

        if (params) {
            prompt += ` ${params}`;
        }

        resultPromptEl.value = prompt;
    }

    formElements.forEach(el => {
        el.addEventListener('input', generatePrompt);
    });

    copyBtn.addEventListener('click', () => {
        if (resultPromptEl.value) {
            navigator.clipboard.writeText(resultPromptEl.value)
                .then(() => {
                    copyBtn.textContent = 'コピーしました！';
                    setTimeout(() => {
                        copyBtn.textContent = 'プロンプトをコピー';
                    }, 2000);
                })
                .catch(err => {
                    console.error('コピーに失敗しました', err);
                    alert('コピーに失敗しました。');
                });
        }
    });

    // 初期表示
    generatePrompt();
});