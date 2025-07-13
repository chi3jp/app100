document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const headingFontPreviewEl = document.getElementById('heading-font-preview');
    const bodyFontPreviewEl = document.getElementById('body-font-preview');
    const headingFontNameEl = document.getElementById('heading-font-name');
    const bodyFontNameEl = document.getElementById('body-font-name');

    const fontPairs = [
        { heading: 'Noto Sans JP', body: 'Roboto' },
        { heading: 'Montserrat', body: 'Open Sans' },
        { heading: 'Lato', body: 'Noto Sans JP' },
        { heading: 'Roboto', body: 'Open Sans' },
        { heading: 'Open Sans', body: 'Lato' },
    ];

    function applyFontPair() {
        const randomIndex = Math.floor(Math.random() * fontPairs.length);
        const selectedPair = fontPairs[randomIndex];

        headingFontPreviewEl.style.fontFamily = `'${selectedPair.heading}', sans-serif`;
        bodyFontPreviewEl.style.fontFamily = `'${selectedPair.body}', sans-serif`;

        headingFontNameEl.textContent = selectedPair.heading;
        bodyFontNameEl.textContent = selectedPair.body;
    }

    generateBtn.addEventListener('click', applyFontPair);

    applyFontPair(); // Initial application
});