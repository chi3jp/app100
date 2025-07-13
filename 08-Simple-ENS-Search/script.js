document.addEventListener('DOMContentLoaded', () => {
    const ensNameInput = document.getElementById('ens-name');
    const searchBtn = document.getElementById('search-btn');
    const infuraProjectIdEl = document.getElementById('infura-project-id');
    const resultArea = document.getElementById('result-area');

    let provider = null;

    function initializeProvider(projectId) {
        try {
            provider = new ethers.providers.InfuraProvider('mainnet', projectId);
            resultArea.className = '';
            resultArea.textContent = '';
        } catch (e) {
            resultArea.className = 'error';
            resultArea.textContent = 'エラー: ethers.jsの初期化に失敗しました。Infura Project IDを確認してください。';
            console.error(e);
            provider = null;
        }
    }

    // 初期化
    if (infuraProjectIdEl.value.trim()) {
        initializeProvider(infuraProjectIdEl.value.trim());
    }

    infuraProjectIdEl.addEventListener('input', () => {
        const projectId = infuraProjectIdEl.value.trim();
        if (projectId) {
            initializeProvider(projectId);
        } else {
            provider = null;
            resultArea.className = '';
            resultArea.textContent = '';
        }
    });

    searchBtn.addEventListener('click', async () => {
        const name = ensNameInput.value.trim();
        const projectId = infuraProjectIdEl.value.trim();

        if (!name) {
            resultArea.className = 'error';
            resultArea.textContent = '名前を入力してください。';
            return;
        }

        if (!projectId) {
            resultArea.className = 'error';
            resultArea.textContent = 'Infura Project IDを入力してください。';
            return;
        }

        if (!provider) {
            resultArea.className = 'error';
            resultArea.textContent = 'プロバイダーが初期化されていません。Infura Project IDを確認してください。';
            return;
        }

        const ensFullName = `${name}.eth`;
        resultArea.textContent = '検索中...';
        resultArea.className = '';

        try {
            const address = await provider.resolveName(ensFullName);

            if (address) {
                resultArea.className = 'unavailable';
                resultArea.textContent = `${ensFullName} は利用できません (所有者: ${address.substring(0, 6)}...${address.substring(address.length - 4)})`;
            } else {
                resultArea.className = 'available';
                resultArea.textContent = `${ensFullName} は利用可能です！`;
            }
        } catch (error) {
            console.error('ENS検索エラー:', error);
            resultArea.className = 'error';
            resultArea.textContent = `検索中にエラーが発生しました: ${error.message}`;
        }
    });
});