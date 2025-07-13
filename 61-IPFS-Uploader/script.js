document.addEventListener('DOMContentLoaded', () => {
    const uploadFileEl = document.getElementById('upload-file');
    const pinataApiKeyEl = document.getElementById('pinata-api-key');
    const pinataSecretApiKeyEl = document.getElementById('pinata-secret-api-key');
    const uploadBtn = document.getElementById('upload-btn');
    const cidResultEl = document.getElementById('cid-result');
    const gatewayLinkEl = document.getElementById('gateway-link');

    uploadBtn.addEventListener('click', async () => {
        const file = uploadFileEl.files[0];
        const pinataApiKey = pinataApiKeyEl.value.trim();
        const pinataSecretApiKey = pinataSecretApiKeyEl.value.trim();

        if (!file) {
            alert('ファイルを選択してください。');
            return;
        }

        if (!pinataApiKey || !pinataSecretApiKey) {
            alert('Pinata APIキーとSecret APIキーを入力してください。');
            return;
        }

        cidResultEl.textContent = 'アップロード中...';
        gatewayLinkEl.style.display = 'none';
        uploadBtn.disabled = true;

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
                method: 'POST',
                headers: {
                    'pinata_api_key': pinataApiKey,
                    'pinata_secret_api_key': pinataSecretApiKey,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Pinata APIエラー: ${response.status} - ${errorData.error ? errorData.error.details : response.statusText}`);
            }

            const data = await response.json();
            const cid = data.IpfsHash;
            const gatewayUrl = `https://ipfs.io/ipfs/${cid}`;

            cidResultEl.textContent = cid;
            gatewayLinkEl.href = gatewayUrl;
            gatewayLinkEl.style.display = 'block';

        } catch (error) {
            console.error('Error uploading to IPFS:', error);
            cidResultEl.textContent = `エラーが発生しました。(${error.message})\nAPIキーが正しいか、またはファイルを確認してください。`;
        } finally {
            uploadBtn.disabled = false;
        }
    });
});