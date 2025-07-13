document.addEventListener('DOMContentLoaded', () => {
    const rollBtn = document.getElementById('roll-btn');
    const diceResultEl = document.getElementById('dice-result');

    function rollDice() {
        const randomNumber = Math.floor(Math.random() * 6) + 1; // 1から6の乱数
        diceResultEl.textContent = randomNumber;
    }

    rollBtn.addEventListener('click', rollDice);

    rollDice(); // Initial roll
});