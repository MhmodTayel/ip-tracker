let button = document.querySelector(".btnSearch");

const ipValue = document.querySelector(".valueIp");
const countryValue = document.querySelector(".valueCountry");
const utcValue = document.querySelector(".valueUtc");
const ispValue = document.querySelector(".valueIsp");

//const mapDiv = document.querySelector("#map");

function getInputValue(){
    let ipInput = document.querySelector("#ipaddress").value;
    const key = 'at_wuvOQ7NKYsA7ReFthDnzqtIvnKo9C';
    const url = 'https://geo.ipify.org/api/v1?apiKey='+key+'&ipAddress=';

    urlUpdated = url + ipInput

    //console.log(ipInput);
    //console.log(urlUpdated);

    fetch(urlUpdated)
        .then(response => response.json())
        .then(response => updateValues(response))
        //.then(response => createMap(response))
        .catch(

        error => console.log(error)

        );
}

function updateValues(response){
    console.log(response);
    ipValue.innerHTML = response.ip;
    //console.log(response.ip);

    countryValue.innerHTML = response.location.country+", "+response.location.region+", "+response.location.city+", "+response.location.postalCode;
    //console.log(response.location.country+", "+response.location.region+", "+response.location.city+", "+response.location.postalCode);

    utcValue.innerHTML = "UTC"+response.location.timezone;
    //console.log("UTC"+response.location.timezone);

    ispValue.innerHTML = response.isp;
    //console.log(response.isp);

    createMap(response);
}

function createMap(response) {

    let latitude = response.location.lat
    let longitude = response.location.lng
    console.log("lat: " + latitude + ", lng: " + longitude)

    mapboxgl.accessToken = 'pk.eyJ1IjoibWJlbGx5ZG8iLCJhIjoiY2tqb2E1anFmMGx2djJ2bzhpeDRkdHFyayJ9.DEAvUgh9QjI7vbAWdxHeaw';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mbellydo/ckjoa9yng3mlm19oa7kf5o3cs', // stylesheet location
        center: [longitude, latitude], // starting position [lng, lat]
        zoom: 5 // starting zoom
    });
    var marker = new mapboxgl.Marker({
        color: "#FFFFFF",
        draggable: true
        }).setLngLat([longitude, latitude])
        .addTo(map);
    map.addControl(new mapboxgl.NavigationControl());

    //Add map view styles
    var layerList = document.getElementById('menu');
    var inputs = layerList.getElementsByTagName('input');

    function switchLayer(layer) {
        var layerId = layer.target.id;
        map.setStyle('mapbox://styles/mapbox/' + layerId);
    }

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].onclick = switchLayer;
    }
}

