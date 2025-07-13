document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const characterTypeEl = document.getElementById('character-type');
    const genderEl = document.getElementById('gender');
    const originEl = document.getElementById('origin');
    const apiKeyEl = document.getElementById('api-key');
    const resultArea = document.getElementById('result-area');

    generateBtn.addEventListener('click', async () => {
        const type = characterTypeEl.value.trim();
        const gender = genderEl.value.trim();
        const origin = originEl.value.trim();
        const API_KEY = apiKeyEl.value.trim();

        if (!type) {
            alert('キャラクターのタイプを入力してください。');
            return;
        }

        if (!API_KEY) {
            alert('Google AI APIキーを入力してください。');
            return;
        }

        // モデル名を gemini-1.5-flash に変更
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

        resultArea.textContent = 'AIが名前を生成しています...';
        generateBtn.disabled = true;

        try {
            let prompt = `以下の情報に基づいて、ユニークなキャラクター名を10個提案してください。\n\n`;
            prompt += `キャラクターのタイプ: ${type}\n`;
            if (gender) {
                prompt += `性別: ${gender}\n`;
            }
            if (origin) {
                prompt += `起源・雰囲気: ${origin}\n`;
            }
            prompt += `\n提案する名前は、リスト形式で出力してください。`;

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