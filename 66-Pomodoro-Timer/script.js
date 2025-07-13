document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timer-display');
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resetBtn = document.getElementById('reset-btn');
    const workDurationInput = document.getElementById('work-duration');
    const breakDurationInput = document.getElementById('break-duration');

    let timerInterval;
    let timeLeft;
    let isWorking = true;
    let isPaused = false;

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function startTimer() {
        if (timerInterval) clearInterval(timerInterval);
        isPaused = false;
        startBtn.disabled = true;
        pauseBtn.disabled = false;

        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                // 音を鳴らすなど
                alert(isWorking ? '作業時間終了！休憩しましょう！' : '休憩時間終了！作業に戻りましょう！');
                isWorking = !isWorking;
                resetTimer();
                startTimer(); // 自動で次のタイマーを開始
            }
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(timerInterval);
        isPaused = true;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }

    function resetTimer() {
        clearInterval(timerInterval);
        isPaused = false;
        isWorking = true;
        timeLeft = parseInt(workDurationInput.value, 10) * 60;
        updateTimerDisplay();
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }

    // 初期設定
    workDurationInput.addEventListener('input', resetTimer);
    breakDurationInput.addEventListener('input', resetTimer);

    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);

    resetTimer(); // アプリ起動時に初期化
});