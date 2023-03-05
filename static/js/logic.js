// Store our API endpoint inside url
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to query URL
d3.json(url, function(data) {
  // Once we get a response, send the data.features object to the markEarthquakes function
  markEarthquakes(data.features);
});

function markEarthquakes(earthquakeData) {

  var earthquakeMarkers = [];

  for (var i = 0; i < earthquakeData.length; i++) {

    var magnitude = earthquakeData[i].properties.mag
    var depth = earthquakeData[i].geometry.coordinates[2]
    var lat= earthquakeData[i].geometry.coordinates[1]
    var long = earthquakeData[i].geometry.coordinates[0]
    
    var color = "";
    if (depth < 0){
      color = "green"
    }
    else if (depth < 20) {
      color = "purple"
    }
    else if (depth < 40) {
      color = "blue"
    }
    else if (depth < 60) {
      color = "yellow"
    }
    else if (depth < 80) {
      color = "orange"
    }
    else {
      color = "red"
    }
    earthquakeMarkers.push(
      L.circle([lat,long], {
        stroke: false,
        fillOpacity: 0.5,
        color: "white",
        fillColor: color,
        radius: magnitude*100000
      }).bindPopup("<h3>Location: " + earthquakeData[i].properties.title +
          "</h3><hr><p> Depth: " + depth + "</p>" +
          "</h3><hr><p> Latitude: " + lat + "</p>" +
          "</h3><hr><p> Longitude: " + long + "</p>")
    )
  }

  var earthquakes = L.layerGroup(earthquakeMarkers)

  

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  // var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  //   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  //   tileSize: 512,
  //   maxZoom: 18,
  //   zoomOffset: -1,
  //   id: "mapbox/satellite-v10",
  //   accessToken: API_KEY
  // });

  var satellite= L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });

  var grayscale = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/outdoors-v11",
        accessToken: API_KEY
    });


  // Define baseMaps
  var baseMaps = {
    "Satellite": satellite,
    "Grayscale": grayscale,
    "Outdoors": outdoors
  };

  // Define overlays
  var overlayMaps = {
    "Earthquakes": earthquakes
    //"Fault Lines": plates
  };

  
  var myMap = L.map("map", {
    center: [
      33.753746,-84.386330
    ],
    zoom: 2,
    layers: [satellite, earthquakes]
  });

  
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  function legendColor(depth){
    if (depth < 0){
      return "green"
    }
    else if (depth < 20) {
      return "purple"
    }
    else if (depth < 40) {
      return "blue"
    }
    else if (depth < 60) {
      return "yellow"
    }
    else if (depth < 80) {
      return "orange"
    }
    else {
      return "red"
    }
  }
  
  // Define legend 
  var legend = L.control({
    position: "bottomright",
    fillColor: "white"
  });
  
  // Add legend to layer control
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    var depth = [0, 20, 40, 60, 80, 100];
    var labels = ["<0", "20-40", "40-60", "60-80", "80-100", "100+"];
    div.innerHTML = '<div>Depth (km)</div>';
    for (var i = 0; i < depth.length; i++){
      div.innerHTML += '<i style="background:' + legendColor(depth[i]) + '">&nbsp;&nbsp;&nbsp;&nbsp;</i>&nbsp;'+
                      labels[i] + '<br>';
    }
    return div;
  };
  // Add the legend to the map
  legend.addTo(myMap);
}



