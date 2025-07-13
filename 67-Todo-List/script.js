document.addEventListener('DOMContentLoaded', () => {
    const newTodoInput = document.getElementById('new-todo');
    const addTodoBtn = document.getElementById('add-todo-btn');
    const todoList = document.getElementById('todo-list');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = todo.completed ? 'completed' : '';
            li.dataset.index = index;

            const span = document.createElement('span');
            span.textContent = todo.text;
            span.addEventListener('click', () => {
                todos[index].completed = !todos[index].completed;
                saveTodos();
                renderTodos();
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '×';
            deleteBtn.addEventListener('click', () => {
                todos.splice(index, 1);
                saveTodos();
                renderTodos();
            });

            li.appendChild(span);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        });
    }

    addTodoBtn.addEventListener('click', () => {
        const text = newTodoInput.value.trim();
        if (text) {
            todos.push({ text, completed: false });
            newTodoInput.value = '';
            saveTodos();
            renderTodos();
        }
    });

    newTodoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodoBtn.click();
        }
    });

    renderTodos();
});