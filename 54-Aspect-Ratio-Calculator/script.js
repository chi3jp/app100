document.addEventListener('DOMContentLoaded', () => {
    const widthEl = document.getElementById('width');
    const heightEl = document.getElementById('height');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultEl = document.getElementById('aspect-ratio-result');

    // 最大公約数を求める関数
    function gcd(a, b) {
        return b === 0 ? a : gcd(b, a % b);
    }

    function calculateAspectRatio() {
        const width = parseInt(widthEl.value, 10);
        const height = parseInt(heightEl.value, 10);

        if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
            resultEl.textContent = '有効な幅と高さを入力してください。';
            return;
        }

        const commonDivisor = gcd(width, height);
        const aspectRatioWidth = width / commonDivisor;
        const aspectRatioHeight = height / commonDivisor;

        resultEl.textContent = `${aspectRatioWidth}:${aspectRatioHeight}`;
    }

    calculateBtn.addEventListener('click', calculateAspectRatio);
    widthEl.addEventListener('input', calculateAspectRatio);
    heightEl.addEventListener('input', calculateAspectRatio);

    calculateAspectRatio(); // Initial calculation
});