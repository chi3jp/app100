document.addEventListener('DOMContentLoaded', () => {
    const transcribeBtn = document.getElementById('transcribe-btn');
    const audioFileEl = document.getElementById('audio-file');
    const resultArea = document.getElementById('result-area');

    transcribeBtn.addEventListener('click', async () => {
        const file = audioFileEl.files[0];

        if (!file) {
            alert('音声ファイルを選択してください。');
            return;
        }

        resultArea.textContent = '文字起こし中...';
        transcribeBtn.disabled = true;

        // ここではダミーの文字起こし結果を返します。
        // 実際の文字起こしには、Google Cloud Speech-to-Text APIなどの利用が必要です。
        const dummyTranscription = `
[00:00:00] こんにちは、これはテストの音声です。
[00:00:03] このアプリは、音声ファイルを文字起こしするデモンストレーションです。
[00:00:07] 実際の機能には、クラウドAPIとの連携が必要です。
`;

        setTimeout(() => {
            resultArea.textContent = `ファイル名: ${file.name}\nサイズ: ${file.size} bytes\n\n${dummyTranscription}`;
            transcribeBtn.disabled = false;
        }, 2000); // 擬似的な処理時間
    });
});