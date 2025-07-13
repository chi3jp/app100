document.addEventListener('DOMContentLoaded', () => {
    const startDateEl = document.getElementById('start-date');
    const endDateEl = document.getElementById('end-date');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDaysEl = document.getElementById('result-days');

    // 今日の日付をデフォルトで設定
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    startDateEl.value = `${year}-${month}-${day}`;
    endDateEl.value = `${year}-${month}-${day}`;

    function calculateDays() {
        const startDate = new Date(startDateEl.value);
        const endDate = new Date(endDateEl.value);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            resultDaysEl.textContent = '有効な日付を入力してください。';
            return;
        }

        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        resultDaysEl.textContent = `${diffDays} 日`;
    }

    calculateBtn.addEventListener('click', calculateDays);
    startDateEl.addEventListener('change', calculateDays);
    endDateEl.addEventListener('change', calculateDays);

    calculateDays(); // Initial calculation
});