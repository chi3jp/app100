document.addEventListener('DOMContentLoaded', () => {
    const totalAmountEl = document.getElementById('total-amount');
    const numPeopleEl = document.getElementById('num-people');
    const calculateBtn = document.getElementById('calculate-btn');
    const perPersonAmountEl = document.getElementById('per-person-amount');

    function calculateSplit() {
        const totalAmount = parseFloat(totalAmountEl.value);
        const numPeople = parseInt(numPeopleEl.value, 10);

        if (isNaN(totalAmount) || totalAmount < 0) {
            perPersonAmountEl.textContent = '有効な合計金額を入力してください。';
            return;
        }
        if (isNaN(numPeople) || numPeople <= 0) {
            perPersonAmountEl.textContent = '有効な人数を入力してください。';
            return;
        }

        const amountPerPerson = totalAmount / numPeople;
        perPersonAmountEl.textContent = `${amountPerPerson.toFixed(2)} 円`;
    }

    calculateBtn.addEventListener('click', calculateSplit);
    totalAmountEl.addEventListener('input', calculateSplit);
    numPeopleEl.addEventListener('input', calculateSplit);

    calculateSplit(); // Initial calculation
});