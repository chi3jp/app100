document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const inputDataEl = document.getElementById('input-data');
    const qrcodeContainer = document.getElementById('qrcode-container');

    function generateQrCode() {
        const data = inputDataEl.value.trim();
        if (!data) {
            qrcodeContainer.innerHTML = 'QRコードにしたいテキストまたはURLを入力してください。';
            return;
        }

        qrcodeContainer.innerHTML = ''; // Clear previous QR code
        new QRCode(qrcodeContainer, {
            text: data,
            width: 200,
            height: 200,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    }

    generateBtn.addEventListener('click', generateQrCode);
    inputDataEl.addEventListener('input', generateQrCode); // 入力時にリアルタイム更新

    // 初期生成
    generateQrCode();
});