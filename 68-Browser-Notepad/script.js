document.addEventListener('DOMContentLoaded', () => {
    const notepadEl = document.getElementById('notepad');

    // ローカルストレージからメモを読み込む
    const savedNote = localStorage.getItem('notepad-note');
    if (savedNote) {
        notepadEl.value = savedNote;
    }

    // メモが変更されたらローカルストレージに保存する
    notepadEl.addEventListener('input', () => {
        localStorage.setItem('notepad-note', notepadEl.value);
    });
});