document.addEventListener('DOMContentLoaded', () => {
    const player1LifeEl = document.getElementById('player1-life');
    const player2LifeEl = document.getElementById('player2-life');
    const resetAllBtn = document.getElementById('reset-all-btn');

    let player1Life = 8000;
    let player2Life = 8000;

    function updateLifeDisplay() {
        player1LifeEl.textContent = player1Life;
        player2LifeEl.textContent = player2Life;
    }

    document.querySelectorAll('.minus-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const player = e.target.dataset.player;
            const input = document.querySelector(`.life-input[data-player="${player}"]`);
            const value = parseInt(input.value, 10);
            if (player === '1') {
                player1Life -= value;
            } else {
                player2Life -= value;
            }
            updateLifeDisplay();
        });
    });

    document.querySelectorAll('.plus-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const player = e.target.dataset.player;
            const input = document.querySelector(`.life-input[data-player="${player}"]`);
            const value = parseInt(input.value, 10);
            if (player === '1') {
                player1Life += value;
            } else {
                player2Life += value;
            }
            updateLifeDisplay();
        });
    });

    resetAllBtn.addEventListener('click', () => {
        player1Life = 8000;
        player2Life = 8000;
        updateLifeDisplay();
    });

    updateLifeDisplay(); // Initial display
});