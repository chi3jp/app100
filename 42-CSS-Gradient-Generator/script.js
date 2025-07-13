document.addEventListener('DOMContentLoaded', () => {
    const color1El = document.getElementById('color1');
    const color2El = document.getElementById('color2');
    const directionEl = document.getElementById('direction');
    const directionValueEl = document.getElementById('direction-value');
    const previewBoxEl = document.getElementById('preview-box');
    const cssCodeEl = document.getElementById('css-code');
    const copyBtn = document.getElementById('copy-btn');

    function generateGradient() {
        const color1 = color1El.value;
        const color2 = color2El.value;
        const direction = directionEl.value;

        const gradientCss = `linear-gradient(${direction}deg, ${color1}, ${color2})`;

        previewBoxEl.style.background = gradientCss;
        cssCodeEl.value = `background: ${gradientCss};\nbackground: -webkit-${gradientCss};\nbackground: -moz-${gradientCss};`;
        directionValueEl.textContent = direction;
    }

    color1El.addEventListener('input', generateGradient);
    color2El.addEventListener('input', generateGradient);
    directionEl.addEventListener('input', generateGradient);

    copyBtn.addEventListener('click', () => {
        cssCodeEl.select();
        document.execCommand('copy');
        copyBtn.textContent = 'コピーしました！';
        setTimeout(() => {
            copyBtn.textContent = 'CSSコードをコピー';
        }, 2000);
    });

    generateGradient(); // Initial generation
});