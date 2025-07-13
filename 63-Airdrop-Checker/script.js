document.addEventListener('DOMContentLoaded', () => {
    const checkAirdropBtn = document.getElementById('check-airdrop-btn');
    const airdropListEl = document.getElementById('airdrop-list');

    const dummyAirdrops = [
        {
            name: 'CryptoProject X Airdrop',
            description: '新規ユーザー向けに1000トークン配布！',
            date: '2024/08/01',
            link: '#'
        },
        {
            name: 'DeFi Protocol Y Airdrop',
            description: '特定のLP提供者向けにガバナンストークン配布。',
            date: '2024/07/25',
            link: '#'
        },
        {
            name: 'NFT Game Z Airdrop',
            description: 'ゲーム内アイテムのエアドロップイベント開催！',
            date: '2024/07/20',
            link: '#'
        },
    ];

    checkAirdropBtn.addEventListener('click', () => {
        airdropListEl.innerHTML = '<li>情報を取得中...</li>';
        checkAirdropBtn.disabled = true;

        setTimeout(() => {
            airdropListEl.innerHTML = '';
            if (dummyAirdrops.length > 0) {
                dummyAirdrops.forEach(airdrop => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <strong><a href="${airdrop.link}" target="_blank">${airdrop.name}</a></strong><br>
                        <span>${airdrop.description}</span><br>
                        <span>配布予定日: ${airdrop.date}</span>
                    `;
                    airdropListEl.appendChild(li);
                });
            } else {
                airdropListEl.innerHTML = '<li>現在、新しいエアドロップ情報はありません。</li>';
            }
            checkAirdropBtn.disabled = false;
        }, 1500); // 擬似的なロード時間
    });

    // 初期表示
    checkAirdropBtn.click();
});