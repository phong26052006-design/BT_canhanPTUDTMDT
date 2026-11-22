const stateButtons = document.querySelectorAll('.lab-controls button');
for (const button of stateButtons) {
    button.addEventListener('click', () => {
        const box = document.querySelector('.animation-stage .box');
        if (box && button.dataset.case !== '2') {
            box.style.animation = 'none';
            void box.offsetWidth;
            box.style.animation = '';
        }
        document.body.dataset.case = button.dataset.case;
        for (const option of stateButtons) {
            option.setAttribute('aria-pressed', String(option === button));
        }
    });
}

for (const button of document.querySelectorAll('[data-cart]')) {
    button.addEventListener('click', () => {
        document.querySelector('#lab-status').textContent = `Đã chọn ${button.dataset.cart} trong ví dụ Bootstrap.`;
    });
}
