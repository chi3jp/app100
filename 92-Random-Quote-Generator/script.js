document.addEventListener('DOMContentLoaded', () => {
    const quoteTextEl = document.getElementById('quote-text');
    const quoteAuthorEl = document.getElementById('quote-author');
    const newQuoteBtn = document.getElementById('new-quote-btn');

    const quotes = [
        { text: '為せば成る、為さねば成らぬ何事も。', author: '上杉鷹山' },
        { text: '人間は考える葦である。', author: 'ブレーズ・パスカル' },
        { text: '我思う、ゆえに我あり。', author: 'ルネ・デカルト' },
        { text: '幸福は、常に手の中にある。', author: 'アリストテレス' },
        { text: '人生は自転車に乗るのと似ている。倒れないようにするには、走り続けなければならない。', author: 'アルベルト・アインシュタイン' },
        { text: '成功は、失敗を恐れないことから始まる。', author: 'ウォルト・ディズニー' },
        { text: '夢を追うことをやめない限り、夢は逃げない。', author: 'ウォルト・ディズニー' },
        { text: '最も強い者が生き残るのではなく、最も賢い者が生き残るのでもない。変化できる者が生き残るのだ。', author: 'チャールズ・ダーウィン' },
        { text: '未来を予測する最善の方法は、それを創造することだ。', author: 'アラン・ケイ' },
        { text: '人生とは、今日という日の連続である。', author: '相田みつを' },
    ];

    function displayRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        quoteTextEl.textContent = `「${randomQuote.text}」`;
        quoteAuthorEl.textContent = `- ${randomQuote.author}`;
    }

    newQuoteBtn.addEventListener('click', displayRandomQuote);

    displayRandomQuote(); // Initial display
});