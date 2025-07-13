document.addEventListener('DOMContentLoaded', () => {
    const appSelectEl = document.getElementById('app-select');
    const shortcutListEl = document.getElementById('shortcut-list');

    const shortcuts = {
        windows: [
            { action: 'コピー', key: 'Ctrl + C' },
            { action: '貼り付け', key: 'Ctrl + V' },
            { action: '切り取り', key: 'Ctrl + X' },
            { action: '元に戻す', key: 'Ctrl + Z' },
            { action: 'やり直し', key: 'Ctrl + Y' },
            { action: 'すべて選択', key: 'Ctrl + A' },
            { action: '保存', key: 'Ctrl + S' },
            { action: '検索', key: 'Ctrl + F' },
            { action: '新しいタブ', key: 'Ctrl + T' },
            { action: 'ウィンドウを閉じる', key: 'Alt + F4' },
        ],
        mac: [
            { action: 'コピー', key: '⌘ + C' },
            { action: '貼り付け', key: '⌘ + V' },
            { action: '切り取り', key: '⌘ + X' },
            { action: '元に戻す', key: '⌘ + Z' },
            { action: 'やり直し', key: '⇧ + ⌘ + Z' },
            { action: 'すべて選択', key: '⌘ + A' },
            { action: '保存', key: '⌘ + S' },
            { action: '検索', key: '⌘ + F' },
            { action: '新しいタブ', key: '⌘ + T' },
            { action: 'アプリケーションを終了', key: '⌘ + Q' },
        ],
        chrome: [
            { action: '新しいタブ', key: 'Ctrl + T (⌘ + T)' },
            { action: 'タブを閉じる', key: 'Ctrl + W (⌘ + W)' },
            { action: '履歴', key: 'Ctrl + H (⌘ + H)' },
            { action: 'ダウンロード', key: 'Ctrl + J (⌘ + J)' },
            { action: 'ブックマーク', key: 'Ctrl + D (⌘ + D)' },
        ],
        vscode: [
            { action: 'コマンドパレット', key: 'Ctrl + Shift + P (⌘ + Shift + P)' },
            { action: 'ファイルを開く', key: 'Ctrl + O (⌘ + O)' },
            { action: 'ファイルを保存', key: 'Ctrl + S (⌘ + S)' },
            { action: '検索', key: 'Ctrl + F (⌘ + F)' },
            { action: '置換', key: 'Ctrl + H (⌘ + H)' },
        ],
    };

    function displayShortcuts() {
        const selectedApp = appSelectEl.value;
        const appShortcuts = shortcuts[selectedApp] || [];

        shortcutListEl.innerHTML = '';
        if (appShortcuts.length > 0) {
            appShortcuts.forEach(shortcut => {
                const li = document.createElement('li');
                li.innerHTML = `<span>${shortcut.action}</span> <span class="key">${shortcut.key}</span>`;
                shortcutListEl.appendChild(li);
            });
        } else {
            shortcutListEl.innerHTML = '<li>ショートカットキーが見つかりませんでした。</li>';
        }
    }

    appSelectEl.addEventListener('change', displayShortcuts);

    displayShortcuts(); // Initial display
});