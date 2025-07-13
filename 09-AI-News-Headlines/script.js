document.addEventListener('DOMContentLoaded', async () => {
    const headlineList = document.getElementById('headline-list');

    const rssFeeds = [
        'https://news.google.com/rss/search?q=AI&hl=ja&gl=JP&ceid=JP:ja', // Google News AI
        'https://news.google.com/rss/search?q=人工知能&hl=ja&gl=JP&ceid=JP:ja', // Google News 人工知能
        // 他のAI関連RSSフィードを追加することも可能
        // 例: 'https://www.itmedia.co.jp/news/subtop/ai/index.xml',
    ];

    headlineList.innerHTML = '<li>ニュースを読み込み中...</li>';

    try {
        let allItems = [];
        for (const feedUrl of rssFeeds) {
            const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
            const response = await fetch(apiUrl);
            if (!response.ok) {
                console.warn(`Failed to fetch RSS feed: ${feedUrl}, Status: ${response.status}`);
                continue;
            }
            const data = await response.json();
            if (data.status === 'ok' && data.items) {
                allItems = allItems.concat(data.items);
            }
        }

        // 重複を排除し、日付でソート
        const uniqueItems = Array.from(new Map(allItems.map(item => [item.link, item])).values());
        uniqueItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

        headlineList.innerHTML = ''; // Clear loading message

        if (uniqueItems.length > 0) {
            uniqueItems.slice(0, 20).forEach(item => { // 最新20件を表示
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = item.link;
                a.textContent = item.title;
                a.target = '_blank';

                const dateSpan = document.createElement('span');
                dateSpan.textContent = new Date(item.pubDate).toLocaleString();

                li.appendChild(a);
                li.appendChild(dateSpan);
                headlineList.appendChild(li);
            });
        } else {
            headlineList.innerHTML = '<li>ニュースが見つかりませんでした。</li>';
        }

    } catch (error) {
        console.error('Error fetching AI news:', error);
        headlineList.innerHTML = '<li>ニュースの取得に失敗しました。時間をおいて再度お試しください。</li>';
    }
});