document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const tagFilterContainer = document.getElementById('tag-filter-container');
    const appListContainer = document.getElementById('app-list-container');

    let activeTags = new Set();

    // カテゴリを抽出して表示
    function renderCategories() {
        const allCategories = new Set();
        appsData.forEach(app => {
            allCategories.add(app.category);
        });

        allCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    // 全てのタグを抽出して表示（折りたたみ機能付き）
    function renderTags() {
        const allTags = new Set();
        appsData.forEach(app => {
            app.tags.forEach(tag => allTags.add(tag));
        });

        tagFilterContainer.innerHTML = ''; // 既存のタグをクリア

        const details = document.createElement('details');
        const summary = document.createElement('summary');
        summary.textContent = 'キーワードで絞り込む';
        details.appendChild(summary);

        const tagButtonsDiv = document.createElement('div');
        tagButtonsDiv.className = 'tag-buttons-wrapper'; // スタイリング用のクラス

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
            tagButtonsDiv.appendChild(button);
        });
        details.appendChild(tagButtonsDiv);
        tagFilterContainer.appendChild(details);
    }

    // アプリをフィルタリングして表示
    function filterApps() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        appListContainer.innerHTML = '';

        const filteredApps = appsData.filter(app => {
            const matchesSearch = app.title.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategory === '' || app.category === selectedCategory;
            const matchesTags = activeTags.size === 0 || app.tags.some(tag => activeTags.has(tag));
            return matchesSearch && matchesCategory && matchesTags;
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
    categoryFilter.addEventListener('change', filterApps); // カテゴリ変更時のイベントリスナー

    renderCategories(); // カテゴリを初期表示
    renderTags();
    filterApps(); // 初期表示
});