$.ajax({
  url:
    "https://data.lacity.org/resource/63jg-8b9z.json?$where=date_occ%20between%20%272015-01-10T12:00:00%27%20and%20%272018-01-10T14:00:00%27",
  type: "GET",
  data: {
    $limit: 10,
    $$app_token: "a2kvHD9X0ctQWM262zde4wxEz",
  },
}).done(function (data) {
  //alert("Retrieved " + data.length + " records from the dataset!");
  console.log(data);
  addCrimeMarkers(data);
});

function addCrimeMarkers(data) {
  for (var key in data) {
    var marker = new L.circleMarker([data[key].lat, data[key].lon], {
      radius: 5,
      color: "#F0F0F0",
      stroke: true,
      fill: true,
      fillColor: "#FF0000",
      fillOpacity: 1,
    }).bindPopup(
      "<table class='table table-bordered table-striped table-hover'>" +
        "<tr><th>area</th><th>" +
        data[key].area +
        "</th><tr>" +
        "<tr><th>area name</th><th>" +
        data[key].area_name +
        "</th><tr>" +
        "<tr><th>date_occ</th><th>" +
        data[key].date_occ +
        "</th><tr>" +
        "<tr><th>location</th><th>" +
        data[key].location +
        "</th><tr>" +
        "<tr><th>crm_cd_desc</th><th>" +
        data[key].crm_cd_desc +
        "</th><tr>" +
        "</table>"
    );
    map.addLayer(marker);
  }
}

$(document).ready(function () {});

//adds custom HTML directly into the map
L.control
  .custom({
    position: "topright",
    content:
      '<form class="form-inline search-bar">' +
      '<div class="form-group mx-sm-3 mb-2">' +
      '<label for="inputPassword2" class="sr-only">Look for Restaurants</label>' +
      '<input type="text" class="form-control"  id="query" placeholder="Look for Restaurants">' +
      "</div>" +
      '<button type="button" class="btn btn-success mb-2" id="btnSubmitModal">Search</button>' +
      "</form>" +
      '<div class="blurBox"><div>',
    style: {
      width: "325px",
      padding: "0px 0 0 0",
      cursor: "pointer",
    },
    events: {
      click: function (data) {
        //$("#event").text("Select an Event");
      },

      contextmenu: function (data) {
        console.log("wrapper div element contextmenu");
        console.log(data);
      },
    },
  })
  .addTo(map);

//adds custom HTML directly into the map
L.control
  .custom({
    position: "topleft",
    content: "<h1>Food App<h1>",
    style: {
      margin: "5px",
      padding: "0px 0 0 0",
      cursor: "pointer",
    },
    events: {
      click: function (data) {
        //$("#event").text("Select an Event");
      },

      contextmenu: function (data) {
        console.log("wrapper div element contextmenu");
        console.log(data);
      },
    },
  })
  .addTo(map);

L.control
  .zoom({
    position: "topleft",
  })
  .addTo(map);

L.control
  .custom({
    position: "bottomleft",
    content: '<div class="pickup-box">pick up food<div>',
    style: {
      margin: "5px",
      padding: "0px 0 0 0",
      cursor: "pointer",
    },
    events: {
      click: function (data) {
        //$("#event").text("Select an Event");
      },

      contextmenu: function (data) {
        console.log("wrapper div element contextmenu");
        console.log(data);
      },
    },
  })
  .addTo(map);

$("#btnSubmitModal").click(function () {
  //alert("hey");
  console.log($("#query").val());
  var query = $("#query").val();
  searchRestaurant(query);
});
