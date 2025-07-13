document.addEventListener('DOMContentLoaded', () => {
    const brainstormTopicEl = document.getElementById('brainstorm-topic');
    const newIdeaEl = document.getElementById('new-idea');
    const addIdeaBtn = document.getElementById('add-idea-btn');
    const ideaListEl = document.getElementById('idea-list');
    const clearAllBtn = document.getElementById('clear-all-btn');

    let ideas = JSON.parse(localStorage.getItem('brainstorm-ideas')) || [];

    function saveIdeas() {
        localStorage.setItem('brainstorm-ideas', JSON.stringify(ideas));
    }

    function renderIdeas() {
        ideaListEl.innerHTML = '';
        ideas.forEach((idea, index) => {
            const li = document.createElement('li');
            li.textContent = idea;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '×';
            deleteBtn.addEventListener('click', () => {
                ideas.splice(index, 1);
                saveIdeas();
                renderIdeas();
            });

            li.appendChild(deleteBtn);
            ideaListEl.appendChild(li);
        });
    }

    addIdeaBtn.addEventListener('click', () => {
        const ideaText = newIdeaEl.value.trim();
        if (ideaText) {
            ideas.push(ideaText);
            newIdeaEl.value = '';
            saveIdeas();
            renderIdeas();
        }
    });

    newIdeaEl.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addIdeaBtn.click();
        }
    });

    clearAllBtn.addEventListener('click', () => {
        if (confirm('すべてのアイデアを削除してもよろしいですか？')) {
            ideas = [];
            saveIdeas();
            renderIdeas();
        }
    });

    renderIdeas(); // Initial render
});