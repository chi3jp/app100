document.addEventListener('DOMContentLoaded', () => {
    const shapeTypeEl = document.getElementById('shape-type');
    const fillColorEl = document.getElementById('fill-color');
    const strokeColorEl = document.getElementById('stroke-color');
    const strokeWidthEl = document.getElementById('stroke-width');
    const strokeWidthValueEl = document.getElementById('stroke-width-value');
    const svgPreviewEl = document.getElementById('svg-preview');
    const svgCodeEl = document.getElementById('svg-code');
    const copyBtn = document.getElementById('copy-btn');

    function generateSvg() {
        const shapeType = shapeTypeEl.value;
        const fillColor = fillColorEl.value;
        const strokeColor = strokeColorEl.value;
        const strokeWidth = strokeWidthEl.value;

        let svgContent = '';
        let svgElement = null;

        switch (shapeType) {
            case 'circle':
                svgContent = `<circle cx="100" cy="100" r="80" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
                svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                svgElement.setAttribute('cx', '100');
                svgElement.setAttribute('cy', '100');
                svgElement.setAttribute('r', '80');
                break;
            case 'rect':
                svgContent = `<rect x="20" y="20" width="160" height="160" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
                svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                svgElement.setAttribute('x', '20');
                svgElement.setAttribute('y', '20');
                svgElement.setAttribute('width', '160');
                svgElement.setAttribute('height', '160');
                break;
            case 'ellipse':
                svgContent = `<ellipse cx="100" cy="100" rx="80" ry="50" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
                svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
                svgElement.setAttribute('cx', '100');
                svgElement.setAttribute('cy', '100');
                svgElement.setAttribute('rx', '80');
                svgElement.setAttribute('ry', '50');
                break;
            case 'line':
                svgContent = `<line x1="20" y1="20" x2="180" y2="180" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
                svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                svgElement.setAttribute('x1', '20');
                svgElement.setAttribute('y1', '20');
                svgElement.setAttribute('x2', '180');
                svgElement.setAttribute('y2', '180');
                break;
        }

        if (svgElement) {
            svgElement.setAttribute('fill', fillColor);
            svgElement.setAttribute('stroke', strokeColor);
            svgElement.setAttribute('stroke-width', strokeWidth);
        }

        const fullSvg = `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    ${svgContent}
</svg>`;

        svgPreviewEl.innerHTML = fullSvg;
        svgCodeEl.value = fullSvg;
        strokeWidthValueEl.textContent = strokeWidth;
    }

    shapeTypeEl.addEventListener('change', generateSvg);
    fillColorEl.addEventListener('input', generateSvg);
    strokeColorEl.addEventListener('input', generateSvg);
    strokeWidthEl.addEventListener('input', generateSvg);

    copyBtn.addEventListener('click', () => {
        svgCodeEl.select();
        document.execCommand('copy');
        copyBtn.textContent = 'コピーしました！';
        setTimeout(() => {
            copyBtn.textContent = 'SVGコードをコピー';
        }, 2000);
    });

    generateSvg(); // Initial generation
});