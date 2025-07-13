document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const tagFilterContainer = document.getElementById('tag-filter-container');
    const appListContainer = document.getElementById('app-list-container');

    let activeTags = new Set();

    // 全てのタグを抽出して表示
    function renderTags() {
        const allTags = new Set();
        appsData.forEach(app => {
            app.tags.forEach(tag => allTags.add(tag));
        });

        tagFilterContainer.innerHTML = '';
        allTags.forEach(tag => {
            const button = document.createElement('button');
            button.className = 'tag-button';
            button.textContent = tag;
            if (activeTags.has(tag)) {
                button.classList.add('active');
            }
            button.addEventListener('click', () => {
                if (activeTags.has(tag)) {
                    activeTags.delete(tag);
                } else {
                    activeTags.add(tag);
                }
                renderTags(); // タグの状態を更新
                filterApps();
            });
            tagFilterContainer.appendChild(button);
        });
    }

    // アプリをフィルタリングして表示
    function filterApps() {
        const searchTerm = searchInput.value.toLowerCase();
        appListContainer.innerHTML = '';

        const filteredApps = appsData.filter(app => {
            const matchesSearch = app.title.toLowerCase().includes(searchTerm);
            const matchesTags = activeTags.size === 0 || app.tags.some(tag => activeTags.has(tag));
            return matchesSearch && matchesTags;
        });

        if (filteredApps.length === 0) {
            appListContainer.innerHTML = '<p style="text-align: center;">該当するアプリが見つかりませんでした。</p>';
            return;
        }

        filteredApps.forEach(app => {
            const appCard = document.createElement('div');
            appCard.className = 'app-card';
            appCard.innerHTML = `
                <h2>${app.id}. ${app.title}</h2>
                <div class="tags">
                    ${app.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="../${app.path}" target="_blank">アプリを開く</a>
            `;
            appListContainer.appendChild(appCard);
        });
    }

    searchInput.addEventListener('input', filterApps);

    renderTags();
    filterApps(); // 初期表示
});