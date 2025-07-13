document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const searchQueryEl = document.getElementById('search-query');
    const etherscanApiKeyEl = document.getElementById('etherscan-api-key');
    const resultArea = document.getElementById('result-area');

    searchBtn.addEventListener('click', async () => {
        const query = searchQueryEl.value.trim();
        const API_KEY = etherscanApiKeyEl.value.trim();

        if (!query) {
            alert('ブロック番号またはTxハッシュを入力してください。');
            return;
        }

        if (!API_KEY) {
            alert('Etherscan APIキーを入力してください。');
            return;
        }

        resultArea.textContent = '検索中...';
        searchBtn.disabled = true;

        try {
            let apiUrl = '';
            let resultText = '';

            if (query.startsWith('0x') && query.length === 66) { // Tx Hash
                apiUrl = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${query}&apikey=${API_KEY}`;
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (data.result) {
                    resultText = `
Tx Hash: ${data.result.hash}
Block Number: ${parseInt(data.result.blockNumber, 16)}
From: ${data.result.from}
To: ${data.result.to}
Value: ${parseInt(data.result.value, 16) / 1e18} ETH
Gas Price: ${parseInt(data.result.gasPrice, 16) / 1e9} Gwei
`;
                } else {
                    resultText = 'トランザクションが見つかりませんでした。';
                }
            } else if (!isNaN(query)) { // Block Number
                apiUrl = `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=${parseInt(query).toString(16)}&boolean=true&apikey=${API_KEY}`;
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (data.result) {
                    resultText = `
Block Number: ${parseInt(data.result.number, 16)}
Timestamp: ${new Date(parseInt(data.result.timestamp, 16) * 1000).toLocaleString()}
Miner: ${data.result.miner}
Transactions: ${data.result.transactions.length}
Gas Used: ${parseInt(data.result.gasUsed, 16)}
`;
                } else {
                    resultText = 'ブロックが見つかりませんでした。';
                }
            } else {
                resultText = '無効な入力です。ブロック番号またはTxハッシュを入力してください。';
            }
            resultArea.textContent = resultText;

        } catch (error) {
            console.error('Error fetching blockchain data:', error);
            resultArea.textContent = `エラーが発生しました。(${error.message})\nAPIキーが正しいか、または入力内容を確認してください。`;
        } finally {
            searchBtn.disabled = false;
        }
    });
});