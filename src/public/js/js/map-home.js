/* eslint-disable no-undef */
(() => {
    const lat = -0.176701;
    const lng = -78.4815577;
    const map = L.map('map-home').setView([lat, lng], 16);

    const categoriesSelect = document.querySelector('#categories');
    const pricesSelect = document.querySelector('#prices');

    let markers = new L.FeatureGroup().addTo(map);
    let properties = [];

    // Filters
    const filters = { category: 0, price: 0 };

    // Provider
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Filtering
    categoriesSelect.addEventListener('change', e => {
        const categoryId = +e.target.value;
        filters.category = categoryId;

        // categoryId > 0 && getFilteredProperties();
        getFilteredProperties();
    });
    pricesSelect.addEventListener('change', e => {
        filters.price = +e.target.value;

        getFilteredProperties();
    });

    const getProperties = async () => {
        try {
            const url = '/api/v1/properties';
            const resp = await fetch(url);
            const { properties: propertiesData } = await resp.json();
            properties = propertiesData;
            properties.length && showProperties(properties);
        } catch (error) {
            console.log(error);
        }
    };
    getProperties();

    const showProperties = properties => {
        markers.clearLayers();

        properties.forEach(
            ({ id, lat, lng, title, image, price, category }) => {
                const marker = new L.marker([lat, lng], {
                    autoPan: true,
                })
                    .addTo(map)
                    .bindPopup(
                        `
                        <p class="text-indigo-600 font-bold">${category?.name}</p>
                        <h1 class="text-xs font-extrabold uppercase mb-3">${title}</h1>
                        <img src="/uploads/${image}" alt="Imagen de la propiedad ${title}"/>
                        <p class="text-gray-600 font-bold">${price?.name}</p>
                        <a href="/properties/${id}" class="text-btn-popup bg-indigo-600 block p-2 text-center font-bold uppercase text-white" >Ver Propiedad</a>
                        `
                    );

                markers.addLayer(marker);
            }
        );
    };

    const getFilteredProperties = () => {
        const result = properties
            .filter(p =>
                filters.category ? +p.category_id === +filters.category : p
            )
            .filter(fp =>
                filters.price ? +fp.price_id === +filters.price : fp
            );

        showProperties(result);
    };
})();
