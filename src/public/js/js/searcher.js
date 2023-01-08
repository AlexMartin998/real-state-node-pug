const form = document.querySelector('#form-search');

form.addEventListener('submit', e => {
    if (!document.querySelector('#query').value.trim())
        return e.preventDefault();
});

export const getAllCookies = () =>
    document.cookie.split(';').reduce(
        (ac, str) =>
            Object.assign(ac, {
                [str.split('=')[0].trim()]: str.split('=')[1],
            }),
        {}
    );

const { auth } = getAllCookies();

if (auth) document.querySelector('#no-auth').style = 'display: none';
else document.querySelector('.is-auth').style = 'display: none';
