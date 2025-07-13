document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const resultText = document.getElementById('result-text');

    const listA = ['宇宙飛行士', '忍者', '侍', '魔法使い', '探偵', '海賊', '騎士', '錬金術師'];
    const listB = ['猫', '犬', 'パンダ', 'ユニコーン', 'ドラゴン', 'ロボット', 'スライム', '幽霊'];

    function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function generateKeyword() {
        const wordA = getRandomElement(listA);
        const wordB = getRandomElement(listB);
        
        resultText.textContent = `${wordA}の${wordB}`;
    }

    generateBtn.addEventListener('click', generateKeyword);

    // 初期表示
    generateKeyword();
});