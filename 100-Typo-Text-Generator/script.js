document.addEventListener('DOMContentLoaded', () => {
    const inputTextEl = document.getElementById('input-text');
    const typoStrengthEl = document.getElementById('typo-strength');
    const typoStrengthValueEl = document.getElementById('typo-strength-value');
    const generateBtn = document.getElementById('generate-btn');
    const outputTextEl = document.getElementById('output-text');
    const copyBtn = document.getElementById('copy-btn');

    const keyboardLayout = {
        'q': 'qwased', 'w': 'wqeasd', 'e': 'ewrsdf', 'r': 'ertdfg', 't': 'tryfgh', 'y': 'ytughj', 'u': 'uyihjk', 'i': 'iuojkl', 'o': 'opkl;l', 'p': 'p;[l',
        'a': 'aqwszx', 's': 'swedcx', 'd': 'derfvc', 'f': 'frtgvb', 'g': 'gtnhbn', 'h': 'hyujnm', 'j': 'jkiolm', 'k': 'klo,m',
        'z': 'zasx', 'x': 'xzsdc', 'c': 'cvdfg', 'v': 'vbngf', 'b': 'bnhgy', 'n': 'nmjhu', 'm': 'm,kiu',
        // 数字と記号は簡易的に隣接キーを定義
        '1': 'q2w', '2': '1q3ws', '3': '2w4er', '4': '3e5rt', '5': '4r6ty', '6': '5t7yu', '7': '6y8ui', '8': '7u9io', '9': '8i0op', '0': '9o-p',
        ',': 'm.kl', '.': ',/l', '/': '.?;',
        // 大文字は小文字の隣接キーをそのまま利用
        'Q': 'QWASED', 'A': 'AQWSZX', // ...など
    };

    function getNearbyChar(char) {
        const lowerChar = char.toLowerCase();
        if (keyboardLayout[lowerChar]) {
            const nearby = keyboardLayout[lowerChar];
            return nearby[Math.floor(Math.random() * nearby.length)];
        }
        return char; // 隣接キーが定義されていない場合はそのまま
    }

    function generateTypoText() {
        const text = inputTextEl.value;
        const strength = parseInt(typoStrengthEl.value, 10);
        typoStrengthValueEl.textContent = strength;

        let typoText = '';
        for (let i = 0; i < text.length; i++) {
            let char = text[i];
            // 強さに応じて打ち間違いを発生させる確率を調整
            if (Math.random() * 10 < strength) {
                // 打ち間違いの種類をランダムに選択
                const typoType = Math.floor(Math.random() * 3);
                if (typoType === 0 && i < text.length - 1) { // 文字の入れ替え
                    typoText += text[i + 1];
                    typoText += char;
                    i++; // 次の文字はスキップ
                } else if (typoType === 1) { // 隣接キーへの打ち間違い
                    typoText += getNearbyChar(char);
                } else { // 文字の重複
                    typoText += char + char;
                }
            } else {
                typoText += char;
            }
        }
        outputTextEl.value = typoText;
    }

    generateBtn.addEventListener('click', generateTypoText);
    inputTextEl.addEventListener('input', generateTypoText);
    typoStrengthEl.addEventListener('input', generateTypoText);

    copyBtn.addEventListener('click', () => {
        outputTextEl.select();
        document.execCommand('copy');
        copyBtn.textContent = 'コピーしました！';
        setTimeout(() => {
            copyBtn.textContent = 'コピー';
        }, 2000);
    });

    // 初期テキスト
    inputTextEl.value = "こんにちは、これはテストの文章です。";
    generateTypoText(); // Initial generation
});