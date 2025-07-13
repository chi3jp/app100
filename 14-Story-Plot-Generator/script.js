document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const genreEl = document.getElementById('genre');
    const charactersEl = document.getElementById('characters');
    const settingEl = document.getElementById('setting');
    const keywordsEl = document.getElementById('keywords');
    const apiKeyEl = document.getElementById('api-key');
    const resultArea = document.getElementById('result-area');

    generateBtn.addEventListener('click', async () => {
        const genre = genreEl.value.trim();
        const characters = charactersEl.value.trim();
        const setting = settingEl.value.trim();
        const keywords = keywordsEl.value.trim();
        const API_KEY = apiKeyEl.value.trim();

        if (!genre || !characters || !setting) {
            alert('ジャンル、登場人物、舞台は必須項目です。');
            return;
        }

        if (!API_KEY) {
            alert('Google AI APIキーを入力してください。');
            return;
        }

        // モデル名を gemini-1.5-flash に変更
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

        resultArea.textContent = 'AIがプロットを生成しています...';
        generateBtn.disabled = true;

        try {
            let prompt = `以下の要素に基づいて、魅力的な物語のプロットを生成してください。\n\n`;
            prompt += `ジャンル: ${genre}\n`;
            prompt += `登場人物: ${characters}\n`;
            prompt += `舞台: ${setting}\n`;
            if (keywords) {
                prompt += `キーワード: ${keywords}\n`;
            }
            prompt += `\nプロットは、起承転結を意識し、具体的な展開と結末を含めてください。`;

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`APIエラー: ${response.status} - ${errorData.error.message}`);
            }

            const data = await response.json();
            const text = data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text;
            
            if (text) {
                resultArea.textContent = text;
            } else {
                resultArea.textContent = 'AIからの応答がありませんでした。APIキーが正しいか、または入力内容を変更して再度お試しください。';
            }

        } catch (error) {
            console.error('Error:', error);
            resultArea.textContent = `エラーが発生しました。(${error.message})\nコンソールで詳細を確認してください。`;
        } finally {
            generateBtn.disabled = false;
        }
    });
});