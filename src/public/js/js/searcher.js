const form = document.querySelector('#form-search');

form.addEventListener('submit', e => {
    if (!document.querySelector('#query').value.trim())
        return e.preventDefault();
});
