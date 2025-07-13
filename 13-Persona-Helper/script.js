document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const targetInfoEl = document.getElementById('target-info');
    const apiKeyEl = document.getElementById('api-key');
    const resultArea = document.getElementById('result-area');

    generateBtn.addEventListener('click', async () => {
        const info = targetInfoEl.value.trim();
        const API_KEY = apiKeyEl.value.trim();

        if (!info) {
            alert('ターゲット層の情報を入力してください。');
            return;
        }

        if (!API_KEY) {
            alert('Google AI APIキーを入力してください。');
            return;
        }

        // モデル名を gemini-1.5-flash に変更
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

        resultArea.textContent = 'AIがペルソナを生成しています...';
        generateBtn.disabled = true;

        try {
            const prompt = `以下の情報に基づいて、詳細なペルソナを生成してください。\n\n情報: ${info}\n\nペルソナの項目:\n- 名前\n- 年齢\n- 職業\n- 居住地\n- 家族構成\n- 性格\n- 趣味・関心\n- 悩み・課題\n- 目標・願望\n- 情報収集源（SNS、メディアなど）\n- 購買行動\n\nこれらの項目を具体的に記述してください。`;

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