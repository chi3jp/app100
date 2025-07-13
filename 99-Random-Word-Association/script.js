document.addEventListener('DOMContentLoaded', () => {
    const currentWordEl = document.getElementById('current-word');
    const associationInputEl = document.getElementById('association-input');
    const nextWordBtn = document.getElementById('next-word-btn');
    const submitAssociationBtn = document.getElementById('submit-association-btn');
    const associationListEl = document.getElementById('association-list');

    const words = [
        '空', '海', '山', '花', '夢', '光', '音', '風', '星', '雨',
        '猫', '犬', '鳥', '魚', '木', '石', '水', '火', '土', '月',
        '本', 'ペン', '紙', '時計', '窓', 'ドア', '道', '橋', '街', '家',
    ];

    let currentWord = '';
    let associations = JSON.parse(localStorage.getItem('word-associations')) || [];

    function saveAssociations() {
        localStorage.setItem('word-associations', JSON.stringify(associations));
    }

    function renderAssociations() {
        associationListEl.innerHTML = '';
        associations.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.word} → ${item.association}`; 
            associationListEl.appendChild(li);
        });
    }

    function displayRandomWord() {
        const randomIndex = Math.floor(Math.random() * words.length);
        currentWord = words[randomIndex];
        currentWordEl.textContent = currentWord;
        associationInputEl.value = '';
    }

    nextWordBtn.addEventListener('click', displayRandomWord);

    submitAssociationBtn.addEventListener('click', () => {
        const association = associationInputEl.value.trim();
        if (currentWord && association) {
            associations.push({ word: currentWord, association: association });
            saveAssociations();
            renderAssociations();
            displayRandomWord(); // 次の単語へ
        } else {
            alert('単語と連想を入力してください。');
        }
    });

    displayRandomWord(); // Initial display
    renderAssociations(); // Initial render
});