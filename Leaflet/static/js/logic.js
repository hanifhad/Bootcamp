// This link gives us a list of all earthquakes no matter what their size is

URL_link = https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson

// Then we conduct a GET request
d3.json(URL_link, function(data) {
    // The data.features is then sent  to the createFeatures function
  createFeatures(data.features);
});
  // This designs the map features, specifically the tooltip functionality

function createFeatures(earthquakeData) {

  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  };

// Adds the features into the map

  createMap(earthquakes);

      // Creates Tooltips
      function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" +
            new Date(feature.properties.time) +
            "<br>Magnitude: " + feature.properties.mag + "</p>");
    };

// Designing the maps

function createMap(earthquakes) {

  // Define sat, outside and grayscale maps NOTE: You must provide your own API key.
  var outside_map = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

 
    // This defines the base maps 
    var base_maps = {
      "Dark Map": outside_map
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create a layer control
  L.control.layers(base_Maps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
});

  // Create our map, giving it the layers to display on load
  var myMap = L.map("map", {
    center: [
      40.00, -90.00
    ],
    zoom: 4,
    layers: [outside_map, earthquakes]
  });
 
  // Add the info legend to the map
  info.addTo(map);