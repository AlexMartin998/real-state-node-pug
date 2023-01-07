/* eslint-disable no-undef */
(() => {
    const lat = document.querySelector('#lat').textContent;
    const lng = document.querySelector('#lng').textContent;
    const address = document.querySelector('#address').textContent;
    const map = L.map('map').setView([lat, lng], 16);

    // Map provider
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Pin
    L.marker([lat, lng]).addTo(map).bindPopup(address);
})();
