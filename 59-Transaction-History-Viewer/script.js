document.addEventListener('DOMContentLoaded', () => {
    const checkHistoryBtn = document.getElementById('check-history-btn');
    const ethAddressEl = document.getElementById('eth-address');
    const etherscanApiKeyEl = document.getElementById('etherscan-api-key');
    const transactionListEl = document.getElementById('transaction-list');

    checkHistoryBtn.addEventListener('click', async () => {
        const address = ethAddressEl.value.trim();
        const API_KEY = etherscanApiKeyEl.value.trim();

        if (!address) {
            alert('Ethereumアドレスを入力してください。');
            return;
        }

        if (!API_KEY) {
            alert('Etherscan APIキーを入力してください。');
            return;
        }

        const API_URL = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${API_KEY}`;

        transactionListEl.innerHTML = '<li>履歴を読み込み中...</li>';
        checkHistoryBtn.disabled = true;

        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`APIエラー: ${response.status} - ${errorText}`);
            }
            const data = await response.json();

            transactionListEl.innerHTML = ''; // Clear loading message

            if (data.status === '1' && data.result && data.result.length > 0) {
                data.result.slice(0, 10).forEach(tx => { // 最新10件を表示
                    const li = document.createElement('li');
                    const txHashLink = `https://etherscan.io/tx/${tx.hash}`;
                    const fromAddressLink = `https://etherscan.io/address/${tx.from}`;
                    const toAddressLink = `https://etherscan.io/address/${tx.to}`;

                    li.innerHTML = `
                        <span><strong>TxHash:</strong> <a href="${txHashLink}" target="_blank">${tx.hash.substring(0, 10)}...</a></span>
                        <span><strong>From:</strong> <a href="${fromAddressLink}" target="_blank">${tx.from.substring(0, 10)}...</a></span>
                        <span><strong>To:</strong> <a href="${toAddressLink}" target="_blank">${tx.to.substring(0, 10)}...</a></span>
                        <span><strong>Value:</strong> ${ethers.utils.formatEther(tx.value)} ETH</span>
                        <span><strong>Gas Used:</strong> ${tx.gasUsed}</span>
                        <span><strong>Date:</strong> ${new Date(tx.timeStamp * 1000).toLocaleString()}</span>
                    `;
                    transactionListEl.appendChild(li);
                });
            } else {
                transactionListEl.innerHTML = '<li>トランザクション履歴が見つかりませんでした。</li>';
            }
        } catch (error) {
            console.error('Error fetching transaction history:', error);
            transactionListEl.innerHTML = `<li>エラーが発生しました。(${error.message})\nAPIキーが正しいか、またはアドレスを確認してください。</li>`;
        } finally {
            checkHistoryBtn.disabled = false;
        }
    });
});