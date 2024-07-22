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
        .then(data => {
            console.log('XML Data:', data); // Debug: Tampilkan XML yang diterima
            parseXML(data);
        })
        .catch(error => console.error('Error fetching BMKG data:', error));
}

// Parse XML dan tampilkan informasi cuaca
function parseXML(xml) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');
    
    // Debug: Tampilkan seluruh elemen data untuk memeriksa struktur XML
    console.log('Parsed XML:', xmlDoc);
    
    // Ambil elemen parameter suhu maksimum
    const tmaxParameter = xmlDoc.querySelector('parameter[id="tmax"]');
    const humaxParameter = xmlDoc.querySelector('parameter[id="humax"]');
    
    if (tmaxParameter && humaxParameter) {
        // Ambil timerange untuk tanggal hari ini
        const todayDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        
        const tmax = tmaxParameter.querySelector(`timerange[type="daily"][day="${todayDate}"] > value[unit="C"]`);
        const humax = humaxParameter.querySelector(`timerange[type="daily"][day="${todayDate}"] > value`);
        
        // Tampilkan informasi cuaca
        const tmaxValue = tmax ? tmax.textContent : 'N/A';
        const humaxValue = humax ? humax.textContent : 'N/A';
        
        document.getElementById('weather-info').innerHTML = `
            <h2>Cuaca Jakarta</h2>
            <p>Suhu Maksimum: ${tmaxValue} °C</p>
            <p>Kelembapan Maksimum: ${humaxValue} %</p>
        `;
    } else {
        console.error('Parameter tmax or humax not found');
    }
}
