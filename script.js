function initMap() {
    const myLatLng = { lat: -6.2088, lng: 106.8456 }; // Ganti dengan koordinat lokasi Anda
    const map = new google.maps.Map(document.getElementById("map"), {
        center: myLatLng,
        zoom: 14, // Sesuaikan level zoom
    });
    new google.maps.Marker({
        position: myLatLng,
        map,
        title: "Lokasi Saya",
    });
}

