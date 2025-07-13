document.addEventListener('DOMContentLoaded', () => {
    const markdownInputEl = document.getElementById('markdown-input');
    const previewOutputEl = document.getElementById('preview-output');

    function updatePreview() {
        const markdownText = markdownInputEl.value;
        previewOutputEl.innerHTML = marked.parse(markdownText);
    }

    markdownInputEl.addEventListener('input', updatePreview);

    updatePreview(); // Initial preview
});