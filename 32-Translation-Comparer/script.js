document.addEventListener('DOMContentLoaded', () => {
    const translateBtn = document.getElementById('translate-btn');
    const inputTextEl = document.getElementById('input-text');
    const targetLangEl = document.getElementById('target-lang');
    const googleResultEl = document.getElementById('google-translate-result');
    const deeplResultEl = document.getElementById('deepl-translate-result');

    const dummyTranslations = {
        en: {
            google: "This is a sample translation by Google Translate.",
            deepl: "This is a sample translation by DeepL."
        },
        zh: {
            google: "这是谷歌翻译的示例翻译。",
            deepl: "这是DeepL的示例翻译。"
        },
        ko: {
            google: "이것은 구글 번역의 샘플 번역입니다.",
            deepl: "이것은 DeepL의 샘플 번역입니다."
        }
    };

    translateBtn.addEventListener('click', () => {
        const textToTranslate = inputTextEl.value.trim();
        const targetLang = targetLangEl.value;

        if (!textToTranslate) {
            alert('翻訳したい文章を入力してください。');
            return;
        }

        googleResultEl.value = '翻訳中...';
        deeplResultEl.value = '翻訳中...';
        translateBtn.disabled = true;

        setTimeout(() => {
            const translation = dummyTranslations[targetLang] || dummyTranslations.en;
            googleResultEl.value = translation.google;
            deeplResultEl.value = translation.deepl;
            translateBtn.disabled = false;
        }, 1500); // 擬似的な翻訳時間
    });
});