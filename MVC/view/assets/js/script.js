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
                                        html += ' <img  class ="logo" src="view/assets/img/picto_pmr.png" alt=" places réservées pour personnes à mobilité réduite"> ';
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


let lati;
let longi;
let coords;
let radius;
let adressePostale;
let adresse = document.getElementById('adresse'),
    suggestions = document.getElementById('suggestions');



$(function () {

    // ------------------------------------Constante principales------------------------------------------
    const apiAdresse = 'https://api-adresse.data.gouv.fr/search/?q=';
    const apiAdressReverse = 'https://api-adresse.data.gouv.fr/reverse/';
    const apiDate1 = 'https://opendata.doubs.fr/api/records/1.0/search/';
    const apiDate2 = 'https://opendata.doubs.fr/api/records/1.0/search/';
    //----------------------------autocompletion de l'adresse avec API adresse data gouv------------------------------------
    (function () {

        let selectedResult = -1, // Permet de savoir quel résultat est sélectionné : -1 signifie "aucune sélection"
            previousRequest, // On stocke notre précédente requête dans cette variable
            previousValue = adresse.value; // On fait de même avec la précédente valeur

        function getResults(keywords) { // Effectue une requête et récupère les résultats

            var xhr = new XMLHttpRequest();
            xhr.open('GET', apiAdresse + encodeURIComponent(keywords));

            xhr.addEventListener('readystatechange', function () {
                if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                    let reponse = xhr.response;
                    reponse = JSON.parse(reponse);
                    reponse = reponse.features;
                    let reponse0 = reponse[0].properties.label;
                    let reponse1 = reponse[1].properties.label;
                    let reponse2 = reponse[2].properties.label;
                    
                    displayResults(reponses);

                }
            });
            if (keywords.length >= 2) {
                xhr.send(null);
            }
            return xhr;

        }

        function displayResults(reponses) { // Affiche les résultats d'une requête

            suggestions.style.display = reponses.length ? 'block' : 'none'; // On cache le conteneur si on n'a pas de résultats

            if (reponses.length) { // On ne modifie les résultats que si on en a obtenu


                var responseLen = reponses.length;

                suggestions.innerHTML = ''; // On vide les résultats

                for (var i = 0, li; i < responseLen; i++) {

                    li = suggestions.appendChild(document.createElement('li'));
                    li.innerHTML = reponses[i];

                    li.addEventListener('click', function (e) {
                        chooseResult(e.target);
                    });

                }

            }

        }

        function chooseResult(result) { // Choisi un des résultats d'une requête et gère tout ce qui y est attaché

            adresse.value = previousValue = result.innerHTML; // On change le contenu du champ de recherche et on enregistre en tant que précédente valeur
            suggestions.style.display = 'none'; // On cache les résultats
            result.className = ''; // On supprime l'effet de focus
            selectedResult = -1; // On remet la sélection à "zéro"
            adresse.focus(); // Si le résultat a été choisi par le biais d'un clique alors le focus est perdu, donc on le réattribue

        }

        adresse.addEventListener('keyup', function (e) {

            var lis = suggestions.getElementsByTagName('li');

            if (e.keyCode == 38 && selectedResult > -1) { // Si la touche pressée est la flèche "haut"

                lis[selectedResult--].className = '';

                if (selectedResult > -1) { // Cette condition évite une modification de childNodes[-1], qui n'existe pas, bien entendu
                    lis[selectedResult].className = 'result_focus';
                }

            } else if (e.keyCode == 40 && selectedResult < lis.length - 1) { // Si la touche pressée est la flèche "bas"

                suggestions.style.display = 'block'; // On affiche les résultats

                if (selectedResult > -1) { // Cette condition évite une modification de childNodes[-1], qui n'existe pas, bien entendu
                    lis[selectedResult].className = '';
                }

                lis[++selectedResult].className = 'result_focus';

            } else if (e.keyCode == 39 && selectedResult > -1) { // Si la touche pressée est "Entrée"

                chooseResult(lis[selectedResult]);

            } else if (adresse.value != previousValue) { // Si le contenu du champ de recherche a changé

                previousValue = adresse.value;

                if (previousRequest && previousRequest.readyState != XMLHttpRequest.DONE) {
                    previousRequest.abort(); // Si on a toujours une requête en cours, on l'arrête
                }

                previousRequest = getResults(previousValue); // On stocke la nouvelle requête

                selectedResult = -1; // On remet la sélection à "zéro" à chaque caractère écrit

            }

        });

    })();
    // ------------------------------------Appel API adresse data gouv lors du clic sur envoyer pour récupérer les coordonnées gps ----------------
    $("#envoyer").click(function (e) {
        e.preventDefault();
        // On récupère l'adresse 
        adressePostale = adresse.value;
        $('#final').html('');
        // On appelle la fonction getCoord    
        getCoord();
        return false;
    });


    // ------------------------------------Fonction localisation par adresse saisie---------------------------------- 
    // ------------------------------------Et ajout du marqueur de postion sur la map et envoie de requête sur opendata doubs-------------------------------------------------------------

    function getCoord() {
        $.ajax({
            type: 'GET',
            url: apiAdresse,
            timeout: 2000,
            data: {
                q: adressePostale
            },
            dataType: "json",
            success: function (reponse) {
                reponse = reponse.features; // On décompose la réponse pour trouver les éléments ciblés
                reponse = reponse[0];
                reponse = reponse.geometry;
                reponse = reponse.coordinates;
                lati = reponse[1]; // On récupère la lattitude
                longi = reponse[0]; // On récupère la longitude
                // On inverse lat et lng pour créer le marqueur
                reponse = [
                    lati,
                    longi
                ];
                // On crée le marqueur sur la map
                L.marker(reponse).addTo(mymap)
                    .bindPopup("Vous êtes ici " + adressePostale + '<br>latitude : ' + lati + '<br>longitude : ' + longi).openPopup();
                // On recentre la map
                mymap.setView(
                    reponse,
                    15,
                );
            }
        })
    }

})