// Konfigurasi peta Google Maps
function initMap() {
    const jakarta = { lat: -6.2088, lng: 106.8456 };
    
    // Inisialisasi peta
    const map = new google.maps.Map(document.getElementById('map'), {
        center: jakarta,
        zoom: 12
    });

    // Ambil data cuaca dari BMKG
    fetch('https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-DKIJakarta.xml')
        .then(response => response.text())
        .then(data => parseXML(data))
        .catch(error => console.error('Error fetching BMKG data:', error));
}

// Parse XML dan tampilkan informasi cuaca
function parseXML(xml) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');
    
    const weatherInfo = xmlDoc.getElementsByTagName('data')[0].getElementsByTagName('forecast')[0];
    const description = weatherInfo.getElementsByTagName('description')[0].textContent;
    const temperature = weatherInfo.getElementsByTagName('temperature')[0].textContent;

    // Tampilkan informasi cuaca
    document.getElementById('weather-info').innerHTML = `
        <h2>Cuaca Jakarta</h2>
        <p>Deskripsi: ${description}</p>
        <p>Suhu: ${temperature} °C</p>
    `;
}

// Panggil fungsi untuk menginisialisasi peta saat halaman dimuat
window.onload = initMap;
