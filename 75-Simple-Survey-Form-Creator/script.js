document.addEventListener('DOMContentLoaded', () => {
    const questionTextEl = document.getElementById('question-text');
    const questionTypeEl = document.getElementById('question-type');
    const optionsGroupEl = document.getElementById('options-group');
    const optionsTextEl = document.getElementById('options-text');
    const addQuestionBtn = document.getElementById('add-question-btn');
    const surveyFormPreviewEl = document.getElementById('survey-form-preview');
    const htmlCodeEl = document.getElementById('html-code');
    const copyBtn = document.getElementById('copy-btn');

    let questions = [];

    questionTypeEl.addEventListener('change', () => {
        if (questionTypeEl.value === 'radio' || questionTypeEl.value === 'checkbox') {
            optionsGroupEl.style.display = 'block';
        } else {
            optionsGroupEl.style.display = 'none';
        }
    });

    function renderForm() {
        surveyFormPreviewEl.innerHTML = '';
        let generatedHtml = '';

        questions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question-item';
            questionDiv.innerHTML = `<label>${index + 1}. ${q.text}</label>`;
            generatedHtml += `<div class="question-item">
    <label>${index + 1}. ${q.text}</label>\n`;

            if (q.type === 'text') {
                questionDiv.innerHTML += `<input type="text" placeholder="回答を入力してください">`;
                generatedHtml += `    <input type="text" placeholder="回答を入力してください">\n`;
            } else if (q.type === 'radio') {
                const optionsDiv = document.createElement('div');
                optionsDiv.className = 'options';
                q.options.forEach(option => {
                    optionsDiv.innerHTML += `
                        <input type="radio" name="q${index}" value="${option}" id="q${index}-${option}">
                        <label for="q${index}-${option}">${option}</label>
                    `;
                    generatedHtml += `    <input type="radio" name="q${index}" value="${option}" id="q${index}-${option}">
    <label for="q${index}-${option}">${option}</label>\n`;
                });
                questionDiv.appendChild(optionsDiv);
            } else if (q.type === 'checkbox') {
                const optionsDiv = document.createElement('div');
                optionsDiv.className = 'options';
                q.options.forEach(option => {
                    optionsDiv.innerHTML += `
                        <input type="checkbox" name="q${index}" value="${option}" id="q${index}-${option}">
                        <label for="q${index}-${option}">${option}</label>
                    `;
                    generatedHtml += `    <input type="checkbox" name="q${index}" value="${option}" id="q${index}-${option}">
    <label for="q${index}-${option}">${option}</label>\n`;
                });
                questionDiv.appendChild(optionsDiv);
            }
            surveyFormPreviewEl.appendChild(questionDiv);
            generatedHtml += `</div>\n`;
        });
        htmlCodeEl.value = generatedHtml;
    }

    addQuestionBtn.addEventListener('click', () => {
        const questionText = questionTextEl.value.trim();
        const questionType = questionTypeEl.value;
        const optionsText = optionsTextEl.value.trim();

        if (!questionText) {
            alert('質問を入力してください。');
            return;
        }

        let options = [];
        if (questionType === 'radio' || questionType === 'checkbox') {
            if (!optionsText) {
                alert('選択肢を入力してください。');
                return;
            }
            options = optionsText.split(',').map(opt => opt.trim()).filter(opt => opt.length > 0);
            if (options.length === 0) {
                alert('有効な選択肢を入力してください。');
                return;
            }
        }

        questions.push({ text: questionText, type: questionType, options: options });
        questionTextEl.value = '';
        optionsTextEl.value = '';
        optionsGroupEl.style.display = 'none';
        renderForm();
    });

    copyBtn.addEventListener('click', () => {
        htmlCodeEl.select();
        document.execCommand('copy');
        copyBtn.textContent = 'コピーしました！';
        setTimeout(() => {
            copyBtn.textContent = 'HTMLコードをコピー';
        }, 2000);
    });

    renderForm(); // Initial render
});