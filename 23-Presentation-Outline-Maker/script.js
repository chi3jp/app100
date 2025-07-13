document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const presentationThemeEl = document.getElementById('presentation-theme');
    const targetAudienceEl = document.getElementById('target-audience');
    const apiKeyEl = document.getElementById('api-key');
    const resultArea = document.getElementById('result-area');

    generateBtn.addEventListener('click', async () => {
        const theme = presentationThemeEl.value.trim();
        const audience = targetAudienceEl.value.trim();
        const API_KEY = apiKeyEl.value.trim();

        if (!theme) {
            alert('プレゼンテーションのテーマを入力してください。');
            return;
        }

        if (!API_KEY) {
            alert('Google AI APIキーを入力してください。');
            return;
        }

        // モデル名を gemini-1.5-flash に変更
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

        resultArea.textContent = 'AIが構成案を生成しています...';
        generateBtn.disabled = true;

        try {
            let prompt = `以下のテーマとターゲット聴衆に基づいて、効果的なプレゼンテーションの構成案を提案してください。\n\n`;
            prompt += `テーマ: ${theme}\n`;
            if (audience) {
                prompt += `ターゲット聴衆: ${audience}\n`;
            }
            prompt += `\n構成案は、以下の要素を含めて具体的に記述してください。\n- タイトルスライド\n- 自己紹介\n- 導入（問題提起、聴衆の関心を引く）\n- 本論（主要なポイントを複数スライドに分割）\n- 質疑応答\n- まとめ\n- 感謝のスライド`;

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