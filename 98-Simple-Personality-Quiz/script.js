document.addEventListener('DOMContentLoaded', () => {
    const quizAreaEl = document.getElementById('quiz-area');
    const submitQuizBtn = document.getElementById('submit-quiz-btn');
    const resultTextEl = document.getElementById('result-text');

    const quizQuestions = [
        {
            question: 'あなたは新しい環境に身を置くとき、どのような気持ちになりますか？',
            options: [
                { text: 'ワクワクして、すぐに馴染もうとする', score: 2 },
                { text: '少し緊張するが、徐々に慣れていく', score: 1 },
                { text: '不安を感じ、なかなか打ち解けられない', score: 0 }
            ]
        },
        {
            question: '問題に直面したとき、どのように解決しようとしますか？',
            options: [
                { text: '論理的に分析し、計画を立てて実行する', score: 2 },
                { text: '直感を信じ、柔軟に対応する', score: 1 },
                { text: '誰かに相談し、助けを求める', score: 0 }
            ]
        },
        {
            question: '休日はどのように過ごすのが好きですか？',
            options: [
                { text: 'アクティブに外出して、新しい体験をする', score: 2 },
                { text: '家でゆっくり過ごし、趣味に没頭する', score: 1 },
                { text: '友人と会って、おしゃべりを楽しむ', score: 0 }
            ]
        },
        {
            question: '人とのコミュニケーションで大切にしていることは何ですか？',
            options: [
                { text: '自分の意見をはっきりと伝えること', score: 2 },
                { text: '相手の気持ちを理解し、共感すること', score: 1 },
                { text: '場の雰囲気を和ませること', score: 0 }
            ]
        }
    ];

    function renderQuiz() {
        quizAreaEl.innerHTML = '';
        quizQuestions.forEach((q, qIndex) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question-item';
            questionDiv.innerHTML = `<p>${qIndex + 1}. ${q.question}</p>`;

            q.options.forEach((option, oIndex) => {
                questionDiv.innerHTML += `
                    <label>
                        <input type="radio" name="question${qIndex}" value="${option.score}" required>
                        ${option.text}
                    </label>
                `;
            });
            quizAreaEl.appendChild(questionDiv);
        });
    }

    submitQuizBtn.addEventListener('click', () => {
        let totalScore = 0;
        let allAnswered = true;

        quizQuestions.forEach((q, qIndex) => {
            const selectedOption = document.querySelector(`input[name="question${qIndex}"]:checked`);
            if (selectedOption) {
                totalScore += parseInt(selectedOption.value, 10);
            } else {
                allAnswered = false;
            }
        });

        if (!allAnswered) {
            alert('すべての質問に回答してください。');
            return;
        }

        let result = '';
        if (totalScore >= 6) {
            result = 'あなたは「探求者タイプ」です。新しいことに挑戦し、論理的に物事を考えるのが得意です。';
        } else if (totalScore >= 3) {
            result = 'あなたは「調和者タイプ」です。バランス感覚に優れ、周囲との協調を大切にします。';
        } else {
            result = 'あなたは「感受性豊かタイプ」です。繊細で、人との繋がりや感情を重視します。';
        }
        resultTextEl.textContent = result;
    });

    renderQuiz();
});