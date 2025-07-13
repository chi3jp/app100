document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const categorySelect = document.getElementById('category-select');
    const keywordList = document.getElementById('keyword-list');

    const categoryMap = {
        tech: 'テクノロジー',
        fashion: 'ファッション',
        gaming: 'ゲーム',
        food: 'グルメ',
    };

    async function fetchTrends(category) {
        const searchTerm = categoryMap[category] || '最新';
        // Google NewsのRSSフィードをJSON形式に変換してくれるサービスを利用
        const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(searchTerm)}&hl=ja&gl=JP&ceid=JP:ja`;
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

        // リストをクリアし、ローディング表示
        keywordList.innerHTML = '<li>データを取得中...</li>';

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // リストを再度クリア
            keywordList.innerHTML = '';

            if (data.status === 'ok' && data.items.length > 0) {
                data.items.slice(0, 10).forEach(item => { // 最新10件を表示
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = item.link;
                    a.textContent = item.title;
                    a.target = '_blank'; // 新しいタブで開く
                    li.appendChild(a);
                    keywordList.appendChild(li);
                });
            } else {
                keywordList.innerHTML = '<li>キーワードが見つかりませんでした。</li>';
            }
        } catch (error) {
            console.error('Error fetching trends:', error);
            keywordList.innerHTML = '<li>データの取得に失敗しました。時間をおいて再度お試しください。</li>';
        }
    }

    searchBtn.addEventListener('click', () => {
        const selectedCategory = categorySelect.value;
        fetchTrends(selectedCategory);
    });

    // 初期表示としてテクノロジーのトレンドを取得
    fetchTrends('tech');
});