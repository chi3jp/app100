document.addEventListener('DOMContentLoaded', () => {
    const newGoalInput = document.getElementById('new-goal');
    const addGoalBtn = document.getElementById('add-goal-btn');
    const goalList = document.getElementById('goal-list');

    let goals = JSON.parse(localStorage.getItem('goals')) || [];

    function saveGoals() {
        localStorage.setItem('goals', JSON.stringify(goals));
    }

    function renderGoals() {
        goalList.innerHTML = '';
        goals.forEach((goal, index) => {
            const li = document.createElement('li');
            li.className = goal.completed ? 'completed' : '';
            li.dataset.index = index;

            const span = document.createElement('span');
            span.textContent = goal.text;
            span.addEventListener('click', () => {
                goals[index].completed = !goals[index].completed;
                saveGoals();
                renderGoals();
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '×';
            deleteBtn.addEventListener('click', () => {
                goals.splice(index, 1);
                saveGoals();
                renderGoals();
            });

            li.appendChild(span);
            li.appendChild(deleteBtn);
            goalList.appendChild(li);
        });
    }

    addGoalBtn.addEventListener('click', () => {
        const text = newGoalInput.value.trim();
        if (text) {
            goals.push({ text, completed: false });
            newGoalInput.value = '';
            saveGoals();
            renderGoals();
        }
    });

    newGoalInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addGoalBtn.click();
        }
    });

    renderGoals();
});