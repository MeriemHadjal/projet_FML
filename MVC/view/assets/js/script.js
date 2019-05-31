var mymap = L.map('map').setView([47.0833300, 2.4000000], 5.45);

L.tileLayer('https://api.mapbox.com/styles/v1/niska/cjw20ghtr0ove1co13ss3x4ya/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibmlza2EiLCJhIjoiY2p3MXB4djQwMDE2eDQ0bzBucXJ6OXBuYyJ9.iXi5iGMj1Ea9FZdA2GDeBA', {
    maxZoom: 18,
    id: 'niska.v1',
    accessToken: 'pk.eyJ1Ijoibmlza2EiLCJhIjoiY2p3MXB4djQwMDE2eDQ0bzBucXJ6OXBuYyJ9.iXi5iGMj1Ea9FZdA2GDeBA'
}).addTo(mymap);







// var marker = L.icon({
//     iconUrl: "view/assets/img/blue_marker.png",
//     //     //     //shadowUrl: 'icon-shadow.png',
//     iconSize: [64, 64], // taille de l'icone
//     //     //     //shadowSize:   [50, 64], // taille de l'ombre
//     iconAnchor: [32, 64], // point de l'icone qui correspondra à la position du marker
//     //     //     //shadowAnchor: [32, 64],  // idem pour l'ombre
//     popupAnchor: [-3, -76] // point depuis lequel la popup doit s'ouvrir relativement à l'iconAnchor
// }).addTo(mymap);



// var marker = L.marker([48.5, 0.5], {
//     // icon: markerBlue
// }).addTo(mymap);

// // if ($allMarker = $bdd) {


// }

// var green = L.icon({
//     iconUrl: "view/assets/img/green_marker.png",
//     //shadowUrl: 'icon-shadow.png',
//     iconSize: [64, 64], // taille de l'icone
//     //shadowSize:   [50, 64], // taille de l'ombre
//     // iconAnchor: [32, 64], // point de l'icone qui correspondra à la position du marker
//     //shadowAnchor: [32, 64],  // idem pour l'ombre
//     // popupAnchor: [-3, -76] // point depuis lequel la popup doit s'ouvrir relativement à l'iconAnchor
// }) addTo(mymap);
//function currentLocation() {
latitude = "";
longitude = "";
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((function (position) {

        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        setTimeout(function () {

            fetch('https://nominatim.openstreetmap.org/reverse.php?format=json&lat=' + latitude + '&lon=' + longitude).then(function (response) {
                return response.json() //retour latitude longitude sous format json car le navigateur interroge le serveur (bdd) sur les coordonnées
            }).then(function (response) {
                if (response.address.country_code === "fr") { // 

                    var postcode = response.address.postcode; //on definit notre  variable postcode
                    var dept = postcode.substring(0, 2); // on veut les 2 premiers chiffres du codepostal
                    if (dept.length === 2) {
                        data = new FormData(); //creation nouvel objet formData
                        data.append("postcode", postcode); //ajoute à cet objet le postcode
                        fetch("/projet_FML/MVC/searchcode", { //requete pour extraire les codes postaux de la bdd via method post
                            method: "POST",
                            body: data
                        }).then(function (response) {
                            return response.json(); //retour e json
                        }).then(function (response) {
                            if (response.length > 0) { //dans la reponse si >0 caracteres boucle qui affiche marker + les infos suivantes necessaires a l'utilisateur
                                for (item of response) {
                                    marker = L.marker([item.latitude, item.longitude], {
                                        lieu: item.lieu,
                                        adresse: item.adresse,
                                        code_postal: item.code_postal,
                                        type_de_parking: item.type_de_parking,
                                        places: item.places,
                                        pmr: item.pmr,
                                        transport_public: item.transport_public,
                                        lumiere: item.lumiere,
                                        velo: item.velo,
                                    }).addTo(mymap);
                                    html = "<strong>Adresse : <br></strong>" + item.lieu + "<br>" + item.adresse + '<br>' + item.code_postal + '<br>' + item.ville + '<br>' +
                                        '<br><strong>Type de parking</strong>' + '<br>' + item.type_de_parking + '<br>' +
                                        "<strong>Services : <br></strong>";
                                    if (item.pmr === 1) {
                                        html += '<img  class ="logo" src="view/assets/img/picto_pmr.png" alt=" places réservées pour personnes à mobilité réduite">';
                                    }
                                    if (item.transport_public.length > 0) {
                                        html += ' <img class ="logo" src="view/assets/img/picto_bus.png" alt="transport public à proximité"><br> ';
                                    }


                                    // if (item.lumiere.length > 0) {
                                    //     html += '<img class ="logo" src="view/assets/img/picto_lumiere.png" alt="zone éclairée"><br>';
                                    // }

                                    if (item.velo.length > 0) {
                                        html += '<img class ="logo" src="view/assets/img/picto_velo.png" alt=" vélocité disponible"><br>';
                                    }

                                    marker.bindPopup(html).openPopup();
                                }
                            }
                        });
                    }
                }


            });
        }, 3000);

        // 

        // marker.bindPopup("Ma position :<br> Latitude : " + position.coords.latitude + ',<br>Longitude ' + position.coords.longitude).openPopup();
    }));
} else {
    alert("La géolocalisation n'est pas supportée par ce navigateur.");
}


function showPopup(e) {
    // L.popup()
    //     .setContent("<h6>adresse:" + e.target.options.adresse + "</h6>")
    //     .openOn(mymap);
    console.log("coucou");
}