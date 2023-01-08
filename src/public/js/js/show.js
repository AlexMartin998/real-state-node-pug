const messageForm = document.querySelector('#message-form');

messageForm?.addEventListener('submit', e => {
    const message = document.querySelector('#message').value.trim();
    if (!message || message.length < 9) {
        e.preventDefault();
        const errorBox = document.querySelector('#error');
        errorBox.classList.remove('hidden');
        errorBox.textContent =
            'El mensaje no puede estar vacio o ser muy corto.';
        return;
    }
});
