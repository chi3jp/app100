document.addEventListener('DOMContentLoaded', () => {
    const inputTimeEl = document.getElementById('input-time');
    const inputDateEl = document.getElementById('input-date');
    const fromTimezoneEl = document.getElementById('from-timezone');
    const toTimezoneEl = document.getElementById('to-timezone');
    const convertBtn = document.getElementById('convert-btn');
    const resultTimeEl = document.getElementById('result-time');

    // タイムゾーンのリストを生成
    const timezones = Intl.supportedValuesOf('timeZone');
    timezones.forEach(tz => {
        const optionFrom = document.createElement('option');
        optionFrom.value = tz;
        optionFrom.textContent = tz;
        fromTimezoneEl.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = tz;
        optionTo.textContent = tz;
        toTimezoneEl.appendChild(optionTo);
    });

    // デフォルトで日本のタイムゾーンを選択
    fromTimezoneEl.value = 'Asia/Tokyo';
    toTimezoneEl.value = 'America/New_York';

    // 今日の日付をデフォルトで設定
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    inputDateEl.value = `${year}-${month}-${day}`;

    function convertTime() {
        const time = inputTimeEl.value;
        const date = inputDateEl.value;
        const fromTz = fromTimezoneEl.value;
        const toTz = toTimezoneEl.value;

        if (!time || !date) {
            resultTimeEl.textContent = '時間と日付を入力してください。';
            return;
        }

        try {
            // 入力された時間と日付、変換元タイムゾーンでDateオブジェクトを作成
            const dateTimeString = `${date}T${time}:00`;
            const fromDate = new Date(dateTimeString);

            // 変換元タイムゾーンでの時刻をUTCに変換
            const utcDate = new Date(fromDate.toLocaleString('en-US', { timeZone: fromTz }));

            // UTC時刻を変換先タイムゾーンで表示
            const options = {
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: '2-digit', minute: '2-digit', second: '2-digit',
                timeZoneName: 'short',
                timeZone: toTz
            };
            resultTimeEl.textContent = utcDate.toLocaleString('ja-JP', options);

        } catch (error) {
            console.error('Timezone conversion error:', error);
            resultTimeEl.textContent = '変換エラー: 入力内容を確認してください。';
        }
    }

    convertBtn.addEventListener('click', convertTime);
    inputTimeEl.addEventListener('input', convertTime);
    inputDateEl.addEventListener('input', convertTime);
    fromTimezoneEl.addEventListener('change', convertTime);
    toTimezoneEl.addEventListener('change', convertTime);

    convertTime(); // Initial conversion
});