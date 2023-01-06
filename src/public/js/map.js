/* eslint-disable no-undef */

(function () {
    // maps/@-0.176701,-78.4815577,3a,75y,151.98h,85.24t/   <- google maps
    const lat = +document.querySelector('#lat').value || -0.176701;
    const lng = +document.querySelector('#lng').value || -78.4815577;
    const mapa = L.map('map').setView([lat, lng], 16);

    // Provider & Geocoder
    const geocodeService = L.esri.Geocoding.geocodeService();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapa);

    // Pin
    marker = new L.marker([lat, lng], {
        draggable: true,
        autoPan: true,
    }).addTo(mapa);

    // TODO: Refactor
    const position = marker.getLatLng();
    geocodeService
        .reverse()
        .latlng(position, 13)
        .run(function (error, result) {
            // fill hidden inputs
            let street = document.querySelector('.street');
            street.textContent =
                street.textContent || (result?.address?.Address ?? '');
            // document.querySelector('.street').textContent = result?.address?.Address ?? '';
        });

    marker.on('moveend', function (e) {
        marker = e.target;
        const position = marker.getLatLng();

        // center map when releasing the pin
        mapa.panTo(new L.LatLng(position.lat, position.lng));

        // get streets info when releasing the pin: https://leafletjs.com/examples/quick-start/
        geocodeService
            .reverse()
            .latlng(position, 13)
            .run(function (error, result) {
                marker.bindPopup(result.address.LongLabel).openPopup();

                // fill hidden inputs
                document.querySelector('.street').textContent =
                    result?.address?.Address ?? '';
                document.querySelector('#street').value =
                    result?.address?.Address ?? '';
                document.querySelector('#lat').value =
                    result?.latlng?.lat ?? '';
                document.querySelector('#lng').value =
                    result?.latlng?.lng ?? '';
            });
    });
})();
