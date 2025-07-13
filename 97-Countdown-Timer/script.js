document.addEventListener('DOMContentLoaded', () => {
    const eventNameEl = document.getElementById('event-name');
    const eventDateEl = document.getElementById('event-date');
    const countdownTextEl = document.getElementById('countdown-text');

    // 今年のクリスマスをデフォルトに設定
    const today = new Date();
    const christmas = new Date(today.getFullYear(), 11, 25); // 月は0から始まるため11
    eventDateEl.value = christmas.toISOString().split('T')[0];

    function updateCountdown() {
        const eventName = eventNameEl.value.trim();
        const eventDate = new Date(eventDateEl.value);

        if (!eventName || isNaN(eventDate.getTime())) {
            countdownTextEl.textContent = 'イベント名と日付を入力してください。';
            return;
        }

        const now = new Date().getTime();
        const distance = eventDate.getTime() - now;

        if (distance < 0) {
            countdownTextEl.textContent = `${eventName} は終了しました！`;
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownTextEl.textContent = `${eventName} まで残り: ${days}日 ${hours}時間 ${minutes}分 ${seconds}秒`;
    }

    eventNameEl.addEventListener('input', updateCountdown);
    eventDateEl.addEventListener('change', updateCountdown);

    setInterval(updateCountdown, 1000); // 1秒ごとに更新
    updateCountdown(); // Initial update
});