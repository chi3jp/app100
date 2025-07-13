document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const walletAddressEl = document.getElementById('wallet-address');
    const qrcodeContainer = document.getElementById('qrcode-container');

    function generateQrCode() {
        const address = walletAddressEl.value.trim();
        if (!address) {
            qrcodeContainer.innerHTML = 'ウォレットアドレスを入力してください。';
            return;
        }

        qrcodeContainer.innerHTML = ''; // Clear previous QR code
        new QRCode(qrcodeContainer, {
            text: address,
            width: 200,
            height: 200,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    }

    generateBtn.addEventListener('click', generateQrCode);
    walletAddressEl.addEventListener('input', generateQrCode); // 入力時にリアルタイム更新

    // 初期生成
    generateQrCode();
});