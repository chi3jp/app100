document.addEventListener('DOMContentLoaded', () => {
    const translateBtn = document.getElementById('translate-btn');
    const japanesePromptEl = document.getElementById('japanese-prompt');
    const apiKeyEl = document.getElementById('api-key');
    const resultArea = document.getElementById('result-area');

    translateBtn.addEventListener('click', async () => {
        const jpPrompt = japanesePromptEl.value.trim();
        const API_KEY = apiKeyEl.value.trim();

        if (!jpPrompt) {
            alert('日本語プロンプトを入力してください。');
            return;
        }

        if (!API_KEY) {
            alert('Google AI APIキーを入力してください。');
            return;
        }

        // モデル名を gemini-1.5-flash に変更
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

        resultArea.textContent = 'AIが翻訳しています...';
        translateBtn.disabled = true;

        try {
            const prompt = `以下の日本語のAI画像生成プロンプトを、英語のAI画像生成プロンプトに翻訳してください。翻訳結果のみを出力し、説明やコードブロックは含めないでください。\n\n日本語プロンプト: ${jpPrompt}`;

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
            translateBtn.disabled = false;
        }
    });
});