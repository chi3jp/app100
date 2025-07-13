document.addEventListener('DOMContentLoaded', () => {
    const inputTextEl = document.getElementById('input-text');
    const conversionTypeEl = document.getElementById('conversion-type');
    const convertBtn = document.getElementById('convert-btn');
    const outputTextEl = document.getElementById('output-text');
    const copyBtn = document.getElementById('copy-btn');

    function convertText() {
        const text = inputTextEl.value;
        const type = conversionTypeEl.value;
        let convertedText = '';

        switch (type) {
            case 'uppercase':
                convertedText = text.toUpperCase();
                break;
            case 'lowercase':
                convertedText = text.toLowerCase();
                break;
            case 'capitalize':
                convertedText = text.replace(/\b\w/g, char => char.toUpperCase());
                break;
            case 'togglecase':
                convertedText = text.split('').map(char => {
                    if (char === char.toUpperCase()) {
                        return char.toLowerCase();
                    } else {
                        return char.toUpperCase();
                    }
                }).join('');
                break;
            default:
                convertedText = text;
        }
        outputTextEl.value = convertedText;
    }

    convertBtn.addEventListener('click', convertText);
    inputTextEl.addEventListener('input', convertText);
    conversionTypeEl.addEventListener('change', convertText);

    copyBtn.addEventListener('click', () => {
        outputTextEl.select();
        document.execCommand('copy');
        copyBtn.textContent = 'コピーしました！';
        setTimeout(() => {
            copyBtn.textContent = 'コピー';
        }, 2000);
    });

    convertText(); // Initial conversion
});