var onEachFeature = function (feature, layer) {
    popUpFeature(feature, layer);
  };
  
  function highlightFeature(evt) {
    var feature = evt.target;
    feature.setStyle(highlightStyle);
    if (!L.Browser.ie && !L.Browser.opera) {
      feature.bringToFront();
    }
  }
  
  var markers2 = L.markerClusterGroup();
  map.addLayer(markers2);
  
  
  function resetHighlight(evt) {
    statesLayer.resetStyle(evt.target);
  }
  
  function popUpFeature(feature, layer) {
    var popupText =
      "Yo, I'm a <b>" + feature.properties.party + "</b> y'all!<br>";
    layer.bindPopup(popupText);
    //console.log(feature.geometry.coordinates[0][0])
    //var coordinates = feature.geometry.coordinates[0][0][100]
    //console.log(coordinates)
  
  
  
    let latlngs = [];
        if (feature.geometry.type == "MultiPolygon") {
          latlngs.push(feature.geometry.coordinates[0][0]);
          if (feature.geometry.coordinates[1]) {
            latlngs.push(feature.geometry.coordinates[1][0]);
          }
          for (key in latlngs) {
            for (var key2 in latlngs[key]) {
              latlngs[key][key2] = latlngs[key][key2].reverse();
            }
          }
        } else {
          latlngs.push(feature.geometry.coordinates[0]);
          if (feature.geometry.coordinates[1]) {
            latlngs.push(feature.geometry.coordinates[1]);
          }
          for (key in latlngs) {
            for (var key2 in latlngs[key]) {
              latlngs[key][key2] = latlngs[key][key2].reverse();
            }
          }
        }
  
        var wildFirePolygon = L.polygon(latlngs, { color: "red" }).bindPopup(
          "<div><b><h5>" +
            layer.feature.properties.IncidentName +
            "</h5><h6/>Entry Created: " +
            time_convert(layer.feature.properties.CreateDate) +
            "</h6><h6/>Updated: " +
            time_convert(layer.feature.properties.DateCurrent) +
            "</h6></b></div>"
        );
        var wildFirePolygonCenter = wildFirePolygon.getBounds().getCenter();
        console.log(wildFirePolygonCenter)
        //var littleton = L.marker([wildFirePolygonCenter.lat,wildFirePolygonCenter.lng]).bindPopup('This is Littleton, CO.')
        //littleton.addTo(map)
        markers2.addLayer(L.marker([wildFirePolygonCenter.lat,wildFirePolygonCenter.lng]));
  }
  
  function zoomToFeature(evt) {
    fitBounds(evt.target.getBounds());
  }
  
  async function getCovidData() {
    var fl2 = await L.esri
      .featureLayer({
        url:
          "https://services9.arcgis.com/6Hv9AANartyT7fJW/arcgis/rest/services/USCounties_cases_V1/FeatureServer/0",
        onEachFeature: onEachFeature,
        style: { color: 'blue', weight: 0, fillOpacity: 0, stroke: false, opacity: 0 }
      })
      .addTo(map);
  
  }
  
  getCovidData();
  
  function time_convert(timestamp) {
    var dt = new Date(timestamp);
    return dt.toLocaleString();
  }
  