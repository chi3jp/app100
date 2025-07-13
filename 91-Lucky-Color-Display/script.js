document.addEventListener('DOMContentLoaded', () => {
    const luckyColorBoxEl = document.getElementById('lucky-color-box');
    const luckyColorNameEl = document.getElementById('lucky-color-name');
    const refreshBtn = document.getElementById('refresh-btn');

    const colors = [
        { name: '赤', hex: '#FF0000' },
        { name: '青', hex: '#0000FF' },
        { name: '緑', hex: '#008000' },
        { name: '黄', hex: '#FFFF00' },
        { name: '紫', hex: '#800080' },
        { name: 'オレンジ', hex: '#FFA500' },
        { name: 'ピンク', hex: '#FFC0CB' },
        { name: '水色', hex: '#ADD8E6' },
        { name: '茶色', hex: '#A52A2A' },
        { name: '灰色', hex: '#808080' },
    ];

    function getLuckyColor() {
        const today = new Date();
        const dayOfMonth = today.getDate();
        const month = today.getMonth(); // 0-11

        // 日付と月の組み合わせでランダム性を出す
        const seed = dayOfMonth + month;
        const randomIndex = seed % colors.length;

        return colors[randomIndex];
    }

    function displayLuckyColor() {
        const luckyColor = getLuckyColor();
        luckyColorBoxEl.style.backgroundColor = luckyColor.hex;
        luckyColorNameEl.textContent = luckyColor.name;
    }

    refreshBtn.addEventListener('click', displayLuckyColor);

    displayLuckyColor(); // Initial display
});