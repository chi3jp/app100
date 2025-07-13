document.addEventListener('DOMContentLoaded', () => {
    const animationTypeEl = document.getElementById('animation-type');
    const durationEl = document.getElementById('duration');
    const delayEl = document.getElementById('delay');
    const iterationEl = document.getElementById('iteration');
    const timingFunctionEl = document.getElementById('timing-function');
    const animationBoxEl = document.getElementById('animation-box');
    const cssCodeEl = document.getElementById('css-code');
    const copyBtn = document.getElementById('copy-btn');

    function generateCss() {
        const type = animationTypeEl.value;
        const duration = durationEl.value;
        const delay = delayEl.value;
        const iteration = iterationEl.value;
        const timingFunction = timingFunctionEl.value;

        const animationName = type;
        const animationDuration = `${duration}s`;
        const animationDelay = `${delay}s`;
        const animationIterationCount = iteration === '0' ? 'infinite' : iteration;
        const animationTimingFunction = timingFunction;

        const css = `animation-name: ${animationName};
animation-duration: ${animationDuration};
animation-delay: ${animationDelay};
animation-iteration-count: ${animationIterationCount};
animation-timing-function: ${animationTimingFunction};
animation-fill-mode: forwards; /* アニメーション終了時の状態を維持 */`;

        animationBoxEl.style.cssText = css;
        cssCodeEl.value = `/* CSS */
.your-element {
    ${css}
}

/* Keyframes */
@keyframes ${animationName} {
    /* 定義はstyle.cssにあります */
}`; // Keyframesはstyle.cssに定義済み
    }

    animationTypeEl.addEventListener('change', generateCss);
    durationEl.addEventListener('input', generateCss);
    delayEl.addEventListener('input', generateCss);
    iterationEl.addEventListener('input', generateCss);
    timingFunctionEl.addEventListener('change', generateCss);

    copyBtn.addEventListener('click', () => {
        cssCodeEl.select();
        document.execCommand('copy');
        copyBtn.textContent = 'コピーしました！';
        setTimeout(() => {
            copyBtn.textContent = 'CSSコードをコピー';
        }, 2000);
    });

    generateCss(); // Initial generation
});