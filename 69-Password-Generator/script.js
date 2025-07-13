document.addEventListener('DOMContentLoaded', () => {
    const lengthEl = document.getElementById('password-length');
    const includeUppercaseEl = document.getElementById('include-uppercase');
    const includeLowercaseEl = document.getElementById('include-lowercase');
    const includeNumbersEl = document.getElementById('include-numbers');
    const includeSymbolsEl = document.getElementById('include-symbols');
    const generateBtn = document.getElementById('generate-btn');
    const generatedPasswordEl = document.getElementById('generated-password');
    const copyBtn = document.getElementById('copy-btn');

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    function generatePassword() {
        const length = parseInt(lengthEl.value, 10);
        let characters = '';
        let password = '';

        if (includeUppercaseEl.checked) characters += uppercaseChars;
        if (includeLowercaseEl.checked) characters += lowercaseChars;
        if (includeNumbersEl.checked) characters += numberChars;
        if (includeSymbolsEl.checked) characters += symbolChars;

        if (characters.length === 0) {
            generatedPasswordEl.value = 'オプションを選択してください';
            return;
        }

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }

        generatedPasswordEl.value = password;
    }

    generateBtn.addEventListener('click', generatePassword);
    lengthEl.addEventListener('input', generatePassword);
    includeUppercaseEl.addEventListener('change', generatePassword);
    includeLowercaseEl.addEventListener('change', generatePassword);
    includeNumbersEl.addEventListener('change', generatePassword);
    includeSymbolsEl.addEventListener('change', generatePassword);

    copyBtn.addEventListener('click', () => {
        generatedPasswordEl.select();
        document.execCommand('copy');
        copyBtn.textContent = 'コピーしました！';
        setTimeout(() => {
            copyBtn.textContent = 'コピー';
        }, 2000);
    });

    generatePassword(); // Initial generation
});