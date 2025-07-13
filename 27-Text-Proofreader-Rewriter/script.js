document.addEventListener('DOMContentLoaded', () => {
    const processBtn = document.getElementById('process-btn');
    const inputTextEl = document.getElementById('input-text');
    const actionTypeEl = document.getElementById('action-type');
    const apiKeyEl = document.getElementById('api-key');
    const resultArea = document.getElementById('result-area');

    processBtn.addEventListener('click', async () => {
        const textToProcess = inputTextEl.value.trim();
        const actionType = actionTypeEl.value;
        const API_KEY = apiKeyEl.value.trim();

        if (!textToProcess) {
            alert('文章を入力してください。');
            return;
        }

        if (!API_KEY) {
            alert('Google AI APIキーを入力してください。');
            return;
        }

        // モデル名を gemini-1.5-flash に変更
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

        resultArea.textContent = 'AIが処理しています...';
        processBtn.disabled = true;

        try {
            let prompt = '';
            switch (actionType) {
                case 'proofread':
                    prompt = `以下の文章を校正してください。誤字脱字、文法の誤り、不自然な表現を修正し、より自然で正確な文章にしてください。\n\n文章: ${textToProcess}`;
                    break;
                case 'rewrite':
                    prompt = `以下の文章を、元の意味を変えずに、より魅力的で読みやすいようにリライトしてください。\n\n文章: ${textToProcess}`;
                    break;
                case 'simplify':
                    prompt = `以下の文章を、小学生でも理解できるような平易な言葉遣いで書き直してください。専門用語は避け、分かりやすく説明してください。\n\n文章: ${textToProcess}`;
                    break;
                case 'formalize':
                    prompt = `以下の文章を、ビジネスシーンで使えるような丁寧な表現に書き直してください。\n\n文章: ${textToProcess}`;
                    break;
            }

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
            processBtn.disabled = false;
        }
    });
});