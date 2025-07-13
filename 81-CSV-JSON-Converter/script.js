document.addEventListener('DOMContentLoaded', () => {
    const inputDataEl = document.getElementById('input-data');
    const conversionTypeEl = document.getElementById('conversion-type');
    const convertBtn = document.getElementById('convert-btn');
    const outputDataEl = document.getElementById('output-data');

    function csvToJson(csv) {
        const lines = csv.split('\n');
        const headers = lines[0].split(',').map(header => header.trim());
        const result = [];

        for (let i = 1; i < lines.length; i++) {
            const obj = {};
            const currentline = lines[i].split(',').map(item => item.trim());

            if (currentline.length === headers.length) {
                for (let j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentline[j];
                }
                result.push(obj);
            }
        }
        return JSON.stringify(result, null, 2);
    }

    function jsonToCsv(json) {
        const data = JSON.parse(json);
        if (data.length === 0) return '';

        const headers = Object.keys(data[0]);
        const csvRows = [];

        csvRows.push(headers.join(',')); // ヘッダー行

        for (const row of data) {
            const values = headers.map(header => row[header]);
            csvRows.push(values.join(','));
        }
        return csvRows.join('\n');
    }

    convertBtn.addEventListener('click', () => {
        const inputData = inputDataEl.value.trim();
        const conversionType = conversionTypeEl.value;

        if (!inputData) {
            alert('データを入力してください。');
            return;
        }

        try {
            if (conversionType === 'csv-to-json') {
                outputDataEl.value = csvToJson(inputData);
            } else if (conversionType === 'json-to-csv') {
                outputDataEl.value = jsonToCsv(inputData);
            }
        } catch (error) {
            outputDataEl.value = `変換エラー: ${error.message}\n入力データ形式が正しいか確認してください。`;
            console.error('Conversion error:', error);
        }
    });
});