(() => {
    const changeStateBtns = document.querySelectorAll('.change-state');
    const token = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute('content');

    changeStateBtns.forEach(btn => {
        btn.addEventListener('click', async e => {
            const { propertyId: id } = e.target.dataset;

            try {
                const resp = await fetch(`/properties/state/${id}`, {
                    method: 'PUT',
                    headers: {
                        'CSRF-Token': token, // csrfSurf lo espera de esta forma
                    },
                });
                const { ok } = await resp.json();

                if (ok) {
                    if (e.target.classList.contains('bg-yellow-100')) {
                        e.target.classList.add(
                            'bg-green-100',
                            'text-green-800'
                        );
                        e.target.classList.remove(
                            'bg-yellow-100',
                            'text-yellow-800'
                        );
                        e.target.textContent = 'Publicado';
                    } else {
                        e.target.classList.remove(
                            'bg-green-100',
                            'text-green-800'
                        );
                        e.target.classList.add(
                            'bg-yellow-100',
                            'text-yellow-800'
                        );
                        e.target.textContent = 'No Publicado';
                    }
                }
            } catch (error) {
                console.log(error);
            }
        });
    });
})();
