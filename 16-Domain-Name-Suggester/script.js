document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const keywordsEl = document.getElementById('keywords');
    const tldEl = document.getElementById('tld');
    const apiKeyEl = document.getElementById('api-key');
    const resultArea = document.getElementById('result-area');

    generateBtn.addEventListener('click', async () => {
        const keywords = keywordsEl.value.trim();
        const tld = tldEl.value.trim();
        const API_KEY = apiKeyEl.value.trim();

        if (!keywords) {
            alert('キーワードまたはコンセプトを入力してください。');
            return;
        }

        if (!API_KEY) {
            alert('Google AI APIキーを入力してください。');
            return;
        }

        // モデル名を gemini-1.5-flash に変更
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

        resultArea.textContent = 'AIがドメイン名のアイデアを生成しています...';
        generateBtn.disabled = true;

        try {
            let prompt = `以下のキーワードまたはコンセプトに基づいて、ユニークで覚えやすいドメイン名のアイデアを10個提案してください。\n\n`;
            prompt += `キーワード/コンセプト: ${keywords}\n`;
            if (tld) {
                prompt += `希望するTLD: ${tld}\n`;
            }
            prompt += `\n提案するドメイン名は、リスト形式で出力してください。`;

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