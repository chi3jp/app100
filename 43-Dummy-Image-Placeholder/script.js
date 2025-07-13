document.addEventListener('DOMContentLoaded', () => {
    const widthEl = document.getElementById('width');
    const heightEl = document.getElementById('height');
    const bgColorEl = document.getElementById('bg-color');
    const textColorEl = document.getElementById('text-color');
    const textEl = document.getElementById('text');
    const imagePreviewEl = document.getElementById('image-preview');
    const imageUrlEl = document.getElementById('image-url');
    const copyBtn = document.getElementById('copy-btn');

    function generatePlaceholderImage() {
        const width = widthEl.value || 300;
        const height = heightEl.value || 200;
        const bgColor = bgColorEl.value.replace('#', '');
        const textColor = textColorEl.value.replace('#', '');
        const text = encodeURIComponent(textEl.value.trim() || `${width}x${height}`);

        // placehold.co を利用
        const imageUrl = `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${text}`;
        
        imagePreviewEl.src = imageUrl;
        imageUrlEl.value = imageUrl;
    }

    widthEl.addEventListener('input', generatePlaceholderImage);
    heightEl.addEventListener('input', generatePlaceholderImage);
    bgColorEl.addEventListener('input', generatePlaceholderImage);
    textColorEl.addEventListener('input', generatePlaceholderImage);
    textEl.addEventListener('input', generatePlaceholderImage);

    copyBtn.addEventListener('click', () => {
        imageUrlEl.select();
        document.execCommand('copy');
        copyBtn.textContent = 'コピーしました！';
        setTimeout(() => {
            copyBtn.textContent = 'URLをコピー';
        }, 2000);
    });

    generatePlaceholderImage(); // Initial generation
});