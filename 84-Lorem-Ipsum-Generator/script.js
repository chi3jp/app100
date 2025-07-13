document.addEventListener('DOMContentLoaded', () => {
    const numParagraphsEl = document.getElementById('num-paragraphs');
    const generateBtn = document.getElementById('generate-btn');
    const generatedTextEl = document.getElementById('generated-text');
    const copyBtn = document.getElementById('copy-btn');

    const loremIpsumText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

    function generateLoremIpsum() {
        const numParagraphs = parseInt(numParagraphsEl.value, 10);
        let result = '';

        if (isNaN(numParagraphs) || numParagraphs < 1) {
            generatedTextEl.value = '有効な段落数を入力してください。';
            return;
        }

        for (let i = 0; i < numParagraphs; i++) {
            result += loremIpsumText + (i < numParagraphs - 1 ? '\n\n' : '');
        }
        generatedTextEl.value = result;
    }

    generateBtn.addEventListener('click', generateLoremIpsum);
    numParagraphsEl.addEventListener('input', generateLoremIpsum);

    copyBtn.addEventListener('click', () => {
        generatedTextEl.select();
        document.execCommand('copy');
        copyBtn.textContent = 'コピーしました！';
        setTimeout(() => {
            copyBtn.textContent = 'コピー';
        }, 2000);
    });

    generateLoremIpsum(); // Initial generation
});