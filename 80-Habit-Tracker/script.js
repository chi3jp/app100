document.addEventListener('DOMContentLoaded', () => {
    const newHabitEl = document.getElementById('new-habit');
    const addHabitBtn = document.getElementById('add-habit-btn');
    const habitListEl = document.getElementById('habit-list');

    let habits = JSON.parse(localStorage.getItem('habits')) || [];

    function saveHabits() {
        localStorage.setItem('habits', JSON.stringify(habits));
    }

    function renderHabits() {
        habitListEl.innerHTML = '';
        const today = new Date().toDateString();

        habits.forEach((habit, index) => {
            const li = document.createElement('li');
            li.dataset.index = index;

            const habitInfoDiv = document.createElement('div');
            habitInfoDiv.className = 'habit-info';
            habitInfoDiv.innerHTML = `<h3>${habit.name}</h3><p class="streak">連続記録: ${habit.streak}日</p>`;

            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'actions';

            const doneBtn = document.createElement('button');
            doneBtn.className = 'done-btn';
            doneBtn.textContent = '✓';
            if (habit.lastCompleted === today) {
                doneBtn.classList.add('checked');
            }
            doneBtn.addEventListener('click', () => {
                if (habit.lastCompleted !== today) {
                    habit.lastCompleted = today;
                    habit.streak = (habit.streak || 0) + 1;
                } else {
                    // 既にチェック済みの場合はチェックを外す（連続記録は減らさない）
                    habit.lastCompleted = null; // または前日の日付に戻すなど
                    habit.streak = Math.max(0, habit.streak - 1); // 連続記録を減らす
                }
                saveHabits();
                renderHabits();
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = '×';
            deleteBtn.addEventListener('click', () => {
                habits.splice(index, 1);
                saveHabits();
                renderHabits();
            });

            actionsDiv.appendChild(doneBtn);
            actionsDiv.appendChild(deleteBtn);
            li.appendChild(habitInfoDiv);
            li.appendChild(actionsDiv);
            habitListEl.appendChild(li);
        });
    }

    addHabitBtn.addEventListener('click', () => {
        const habitName = newHabitEl.value.trim();
        if (habitName) {
            habits.push({ name: habitName, streak: 0, lastCompleted: null });
            newHabitEl.value = '';
            saveHabits();
            renderHabits();
        }
    });

    newHabitEl.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addHabitBtn.click();
        }
    });

    renderHabits(); // Initial render
});