document.addEventListener('DOMContentLoaded', () => {
    const baseColorInput = document.getElementById('base-color');
    const generateBtn = document.getElementById('generate-btn');
    const paletteContainer = document.getElementById('palette-container');

    // --- Color Conversion Helpers ---
    function hexToRgb(hex) {
        let r = 0, g = 0, b = 0;
        if (hex.length == 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        } else if (hex.length == 7) {
            r = parseInt(hex[1] + hex[2], 16);
            g = parseInt(hex[3] + hex[4], 16);
            b = parseInt(hex[5] + hex[6], 16);
        }
        return { r, g, b };
    }

    function rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max == min) {
            h = s = 0; // achromatic
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return { h: h * 360, s: s * 100, l: l * 100 };
    }

    function hslToRgb(h, s, l) {
        s /= 100; l /= 100;
        let c = (1 - Math.abs(2 * l - 1)) * s;
        let x = c * (1 - Math.abs((h / 60) % 2 - 1));
        let m = l - c / 2;
        let r = 0, g = 0, b = 0;
        if (0 <= h && h < 60) { r = c; g = x; b = 0; }
        else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
        else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
        else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
        else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
        else if (300 <= h && h < 360) { r = c; g = 0; b = x; }
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);
        return { r, g, b };
    }

    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    function generatePalettes() {
        const baseHex = baseColorInput.value;
        const baseRgb = hexToRgb(baseHex);
        const baseHsl = rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b);

        paletteContainer.innerHTML = ''; // Clear previous palettes

        // 1. Complementary (補色)
        const complementaryH = (baseHsl.h + 180) % 360;
        const complementaryColor = rgbToHex(...Object.values(hslToRgb(complementaryH, baseHsl.s, baseHsl.l)));
        createPalette('補色', [baseHex, complementaryColor]);

        // 2. Analogous (類似色)
        const analogousH1 = (baseHsl.h + 30) % 360;
        const analogousH2 = (baseHsl.h - 30 + 360) % 360;
        const analogousColor1 = rgbToHex(...Object.values(hslToRgb(analogousH1, baseHsl.s, baseHsl.l)));
        const analogousColor2 = rgbToHex(...Object.values(hslToRgb(analogousH2, baseHsl.s, baseHsl.l)));
        createPalette('類似色', [analogousColor2, baseHex, analogousColor1]);

        // 3. Triadic (トライアド)
        const triadicH1 = (baseHsl.h + 120) % 360;
        const triadicH2 = (baseHsl.h + 240) % 360;
        const triadicColor1 = rgbToHex(...Object.values(hslToRgb(triadicH1, baseHsl.s, baseHsl.l)));
        const triadicColor2 = rgbToHex(...Object.values(hslToRgb(triadicH2, baseHsl.s, baseHsl.l)));
        createPalette('トライアド', [baseHex, triadicColor1, triadicColor2]);

        // 4. Monochromatic (単色)
        const monoL1 = Math.min(100, baseHsl.l + 20);
        const monoL2 = Math.max(0, baseHsl.l - 20);
        const monoColor1 = rgbToHex(...Object.values(hslToRgb(baseHsl.h, baseHsl.s, monoL1)));
        const monoColor2 = rgbToHex(...Object.values(hslToRgb(baseHsl.h, baseHsl.s, monoL2)));
        createPalette('単色', [monoColor2, baseHex, monoColor1]);
    }

    function createPalette(name, colors) {
        const paletteDiv = document.createElement('div');
        paletteDiv.className = 'palette';

        const title = document.createElement('h3');
        title.textContent = name;
        paletteDiv.appendChild(title);

        const colorsDiv = document.createElement('div');
        colorsDiv.className = 'colors';

        colors.forEach(color => {
            const colorBox = document.createElement('div');
            colorBox.className = 'color-box';
            colorBox.style.backgroundColor = color;
            colorBox.textContent = color;
            colorBox.addEventListener('click', () => {
                navigator.clipboard.writeText(color);
                // Optional: Show feedback to user
            });
            colorsDiv.appendChild(colorBox);
        });

        paletteDiv.appendChild(colorsDiv);
        paletteContainer.appendChild(paletteDiv);
    }

    generateBtn.addEventListener('click', generatePalettes);

    // Initial generation
    generatePalettes();
});