var markerGroup = L.layerGroup().addTo(map);

//adds custom HTML directly into the map
L.control
  .custom({
    position: "topright",
    content:
      '<form class="form-inline search-bar">' +
      '<div class="form-group mx-sm-3 mb-2">' +
      '<label for="inputPassword2" class="sr-only">Look for Restaurants</label>' +
      '<input type="text" class="form-control" id="query" placeholder="Look for Restaurants">' +
      "</div>" +
      '<button type="button" class="btn btn-success mb-2 btn-lg" id="btnSubmitModal">Search</button>' +
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
    content: "<img class='logo' src='./img/logo.png'>",
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
    content: '<div class="pickup-box"><div>',
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


$('.foo').click(function() {
  $(this).addClass('red') // add class to clicked element
    .siblings() // get siblings
    .removeClass('red'); // remove class from sibling elements 
});