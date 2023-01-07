/* eslint-disable no-undef */
(() => {
    const lat = -0.176701;
    const lng = -78.4815577;
    const map = L.map('map-home').setView([lat, lng], 16);

    // Provider

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
})();
