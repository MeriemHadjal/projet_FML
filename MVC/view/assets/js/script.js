mapboxgl.accessToken = 'pk.eyJ1Ijoibmlza2EiLCJhIjoiY2p3MXB4djQwMDE2eDQ0bzBucXJ6OXBuYyJ9.iXi5iGMj1Ea9FZdA2GDeBA';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/niska/cjw20ghtr0ove1co13ss3x4ya',
    center: [-71.020000, 42.362400],
    zoom: 10.0
});

var mymap = L.map('map').setView([5 47.0833300, 2.4000000], 5.45);

// L.tileLayer('https://api.mapbox.com/styles/v1/niska/cjw20ghtr0ove1co13ss3x4ya/wmts?access_token=pk.eyJ1Ijoibmlza2EiLCJhIjoiY2p3MXB4djQwMDE2eDQ0bzBucXJ6OXBuYyJ9.iXi5iGMj1Ea9FZdA2GDeBA', {

//     maxZoom: 18,
//     // id: 'mapbox.streets',
//     accessToken: 'pk.eyJ1Ijoibmlza2EiLCJhIjoiY2p3MXB4djQwMDE2eDQ0bzBucXJ6OXBuYyJ9.iXi5iGMj1Ea9FZdA2GDeBA'
// }).addTo(mymap); 

L.tileLayer('https://api.mapbox.com/styles/v1/niska/cjw20ghtr0ove1co13ss3x4ya/wmts?access_token=pk.eyJ1Ijoibmlza2EiLCJhIjoiY2p3MXB4djQwMDE2eDQ0bzBucXJ6OXBuYyJ9.iXi5iGMj1Ea9FZdA2GDeBA', {

    maxZoom: 18,
    id: 'niska',
    accessToken: 'pk.eyJ1Ijoibmlza2EiLCJhIjoiY2p3MXB4djQwMDE2eDQ0bzBucXJ6OXBuYyJ9.iXi5iGMj1Ea9FZdA2GDeBA'
}).addTo(mymap);