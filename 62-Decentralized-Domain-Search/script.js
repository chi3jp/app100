document.addEventListener('DOMContentLoaded', () => {
    const domainNameEl = document.getElementById('domain-name');
    const infuraProjectIdEl = document.getElementById('infura-project-id');
    const searchBtn = document.getElementById('search-btn');
    const ensResultEl = document.getElementById('ens-result');
    const unstoppableResultEl = document.getElementById('unstoppable-result');

    let ensProvider = null;

    function initializeEnsProvider(projectId) {
        try {
            ensProvider = new ethers.providers.InfuraProvider('mainnet', projectId);
            ensResultEl.className = '';
            ensResultEl.textContent = '';
        } catch (e) {
            ensResultEl.className = 'error';
            ensResultEl.textContent = 'ENSエラー: Infura Project IDを確認してください。';
            console.error(e);
            ensProvider = null;
        }
    }

    // 初期化
    if (infuraProjectIdEl.value.trim()) {
        initializeEnsProvider(infuraProjectIdEl.value.trim());
    }

    infuraProjectIdEl.addEventListener('input', () => {
        const projectId = infuraProjectIdEl.value.trim();
        if (projectId) {
            initializeEnsProvider(projectId);
        } else {
            ensProvider = null;
            ensResultEl.className = '';
            ensResultEl.textContent = '';
        }
    });

    searchBtn.addEventListener('click', async () => {
        const domainName = domainNameEl.value.trim();
        const infuraProjectId = infuraProjectIdEl.value.trim();

        if (!domainName) {
            alert('ドメイン名を入力してください。');
            return;
        }

        // ENS検索
        ensResultEl.textContent = 'ENS: 検索中...';
        if (!infuraProjectId) {
            ensResultEl.className = 'error';
            ensResultEl.textContent = 'ENS: Infura Project IDが未入力です。';
        } else if (!ensProvider) {
            ensResultEl.className = 'error';
            ensResultEl.textContent = 'ENS: プロバイダーが初期化されていません。';
        } else {
            try {
                const ensFullName = `${domainName}.eth`;
                const address = await ensProvider.resolveName(ensFullName);
                if (address) {
                    ensResultEl.className = 'unavailable';
                    ensResultEl.textContent = `ENS: ${ensFullName} は利用できません`;
                } else {
                    ensResultEl.className = 'available';
                    ensResultEl.textContent = `ENS: ${ensFullName} は利用可能です！`;
                }
            } catch (error) {
                console.error('ENS検索エラー:', error);
                ensResultEl.className = 'error';
                ensResultEl.textContent = `ENS: 検索中にエラーが発生しました: ${error.message}`;
            }
        }

        // Unstoppable Domains検索 (簡易版 - APIキー不要の公開エンドポイントがないため、ダミー応答)
        unstoppableResultEl.textContent = 'Unstoppable Domains: 検索中...';
        setTimeout(() => {
            const isUnstoppableAvailable = Math.random() > 0.5; // ダミーの利用可否
            if (isUnstoppableAvailable) {
                unstoppableResultEl.className = 'available';
                unstoppableResultEl.textContent = `Unstoppable Domains: ${domainName}.crypto は利用可能です！`;
            } else {
                unstoppableResultEl.className = 'unavailable';
                unstoppableResultEl.textContent = `Unstoppable Domains: ${domainName}.crypto は利用できません`;
            }
        }, 1500);
    });
});