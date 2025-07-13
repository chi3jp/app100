document.addEventListener('DOMContentLoaded', () => {
    const analyzeBtn = document.getElementById('analyze-btn');
    const inputTextEl = document.getElementById('input-text');
    const apiKeyEl = document.getElementById('api-key');
    const resultArea = document.getElementById('result-area');

    analyzeBtn.addEventListener('click', async () => {
        const textToAnalyze = inputTextEl.value.trim();
        const API_KEY = apiKeyEl.value.trim();

        if (!textToAnalyze) {
            alert('分析したい文章を入力してください。');
            return;
        }

        if (!API_KEY) {
            alert('Google AI APIキーを入力してください。');
            return;
        }

        // モデル名を gemini-1.5-flash に変更
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

        resultArea.textContent = 'AIが感情を分析しています...';
        analyzeBtn.disabled = true;

        try {
            const prompt = `以下の文章の感情を分析し、ポジティブ、ネガティブ、またはニュートラルのいずれかで評価してください。また、その理由も簡潔に述べてください。\n\n文章: ${textToAnalyze}`;

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
            analyzeBtn.disabled = false;
        }
    });
});