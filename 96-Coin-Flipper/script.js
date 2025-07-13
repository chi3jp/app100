document.addEventListener('DOMContentLoaded', () => {
    const flipBtn = document.getElementById('flip-btn');
    const coinResultEl = document.getElementById('coin-result');

    function flipCoin() {
        const randomNumber = Math.random(); // 0から1の乱数
        if (randomNumber < 0.5) {
            coinResultEl.textContent = '表';
        } else {
            coinResultEl.textContent = '裏';
        }
    }

    flipBtn.addEventListener('click', flipCoin);

    flipCoin(); // Initial flip
});