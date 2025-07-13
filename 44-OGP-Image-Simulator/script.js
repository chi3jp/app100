document.addEventListener('DOMContentLoaded', () => {
    const ogpImageURLEl = document.getElementById('ogp-image-url');
    const simulateBtn = document.getElementById('simulate-btn');
    const twitterImageEl = document.getElementById('twitter-image');
    const facebookImageEl = document.getElementById('facebook-image');

    function updatePreviews() {
        const imageUrl = ogpImageURLEl.value.trim();
        if (imageUrl) {
            twitterImageEl.src = imageUrl;
            facebookImageEl.src = imageUrl;
        } else {
            twitterImageEl.src = '';
            facebookImageEl.src = '';
        }
    }

    simulateBtn.addEventListener('click', updatePreviews);
    ogpImageURLEl.addEventListener('input', updatePreviews); // 入力時にリアルタイム更新

    // 初期表示
    updatePreviews();
});