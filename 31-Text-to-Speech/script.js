document.addEventListener('DOMContentLoaded', () => {
    const playBtn = document.getElementById('play-btn');
    const stopBtn = document.getElementById('stop-btn');
    const inputTextEl = document.getElementById('input-text');
    const voiceSelect = document.getElementById('voice-select');

    let synth = window.speechSynthesis;
    let voices = [];

    function populateVoiceList() {
        voices = synth.getVoices().sort((a, b) => {
            const langA = a.lang.toLowerCase();
            const langB = b.lang.toLowerCase();
            if (langA < langB) return -1;
            if (langA > langB) return 1;
            return 0;
        });
        voiceSelect.innerHTML = '';
        voices.forEach(voice => {
            const option = document.createElement('option');
            option.textContent = `${voice.name} (${voice.lang})`;
            option.setAttribute('data-lang', voice.lang);
            option.setAttribute('data-name', voice.name);
            if (voice.lang === 'ja-JP') { // 日本語をデフォルトで選択
                option.selected = true;
            }
            voiceSelect.appendChild(option);
        });
    }

    populateVoiceList();
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = populateVoiceList;
    }

    playBtn.addEventListener('click', () => {
        if (synth.speaking) {
            console.error('speechSynthesis.speaking');
            return;
        }
        if (inputTextEl.value !== '') {
            const utterThis = new SpeechSynthesisUtterance(inputTextEl.value);
            const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
            for (let i = 0; i < voices.length; i++) {
                if (voices[i].name === selectedOption) {
                    utterThis.voice = voices[i];
                    break;
                }
            }
            utterThis.onend = function (event) {
                console.log('SpeechSynthesisUtterance.onend');
                playBtn.disabled = false;
                stopBtn.disabled = true;
            };
            utterThis.onerror = function (event) {
                console.error('SpeechSynthesisUtterance.onerror', event);
                playBtn.disabled = false;
                stopBtn.disabled = true;
            };
            synth.speak(utterThis);
            playBtn.disabled = true;
            stopBtn.disabled = false;
        } else {
            alert('読み上げたい文章を入力してください。');
        }
    });

    stopBtn.addEventListener('click', () => {
        synth.cancel();
        playBtn.disabled = false;
        stopBtn.disabled = true;
    });
});