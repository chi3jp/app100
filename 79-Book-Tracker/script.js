document.addEventListener('DOMContentLoaded', () => {
    const bookTitleEl = document.getElementById('book-title');
    const bookNotesEl = document.getElementById('book-notes');
    const addBookBtn = document.getElementById('add-book-btn');
    const bookListEl = document.getElementById('book-list');

    let books = JSON.parse(localStorage.getItem('book-records')) || [];

    function saveBooks() {
        localStorage.setItem('book-records', JSON.stringify(books));
    }

    function renderBooks() {
        bookListEl.innerHTML = '';
        books.forEach((book, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${book.title}</h3>
                <p>${book.notes}</p>
                <button class="delete-btn" data-index="${index}">削除</button>
            `;
            bookListEl.appendChild(li);
        });

        // 削除ボタンにイベントリスナーを設定
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index, 10);
                books.splice(index, 1);
                saveBooks();
                renderBooks();
            });
        });
    }

    addBookBtn.addEventListener('click', () => {
        const title = bookTitleEl.value.trim();
        const notes = bookNotesEl.value.trim();

        if (!title) {
            alert('本のタイトルを入力してください。');
            return;
        }

        books.push({ title, notes });
        bookTitleEl.value = '';
        bookNotesEl.value = '';
        saveBooks();
        renderBooks();
    });

    renderBooks(); // Initial render
});