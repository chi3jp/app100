document.addEventListener('DOMContentLoaded', () => {
    const valueEl = document.getElementById('value');
    const fromUnitEl = document.getElementById('from-unit');
    const toUnitEl = document.getElementById('to-unit');
    const convertBtn = document.getElementById('convert-btn');
    const resultValueEl = document.getElementById('result-value');

    const conversionRates = {
        // 長さ (全てメートル基準)
        meter: 1,
        kilometer: 1000,
        mile: 1609.34,
        foot: 0.3048,
        // 重さ (全てグラム基準)
        gram: 1,
        kilogram: 1000,
        pound: 453.592,
    };

    function convertUnit() {
        const value = parseFloat(valueEl.value);
        const fromUnit = fromUnitEl.value;
        const toUnit = toUnitEl.value;

        if (isNaN(value)) {
            resultValueEl.textContent = '有効な数値を入力してください。';
            return;
        }

        if (!conversionRates[fromUnit] || !conversionRates[toUnit]) {
            resultValueEl.textContent = '無効な単位が選択されています。';
            return;
        }

        // 変換元を基準単位に変換
        const valueInBaseUnit = value * conversionRates[fromUnit];

        // 基準単位から変換先に変換
        const convertedValue = valueInBaseUnit / conversionRates[toUnit];

        resultValueEl.textContent = `${convertedValue.toFixed(4)} ${toUnitEl.options[toUnitEl.selectedIndex].text.split(' ')[0]}`;
    }

    convertBtn.addEventListener('click', convertUnit);
    valueEl.addEventListener('input', convertUnit);
    fromUnitEl.addEventListener('change', convertUnit);
    toUnitEl.addEventListener('change', convertUnit);

    convertUnit(); // Initial conversion
});