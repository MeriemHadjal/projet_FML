var mymap = L.map('map').setView([47.0833300, 2.4000000], 5.45);

L.tileLayer('https://api.mapbox.com/styles/v1/niska/cjw20ghtr0ove1co13ss3x4ya/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibmlza2EiLCJhIjoiY2p3MXB4djQwMDE2eDQ0bzBucXJ6OXBuYyJ9.iXi5iGMj1Ea9FZdA2GDeBA', {
    maxZoom: 18,
    id: 'niska.v1',
    accessToken: 'pk.eyJ1Ijoibmlza2EiLCJhIjoiY2p3MXB4djQwMDE2eDQ0bzBucXJ6OXBuYyJ9.iXi5iGMj1Ea9FZdA2GDeBA'
}).addTo(mymap);