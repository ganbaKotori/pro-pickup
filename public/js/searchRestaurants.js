var currentlySelectedRestaurant;
var restaurantsFromQuery = [];

var searchRestaurant = function (query) {
  markerGroup.eachLayer(function(layer) { map.removeLayer(layer);});
  console.log(query);
  console.log(map.getCenter())
  $.post(
    "http://localhost:5000/api/restaurant/" + query, // url
    { lat: map.getCenter().lat,
    lng : map.getCenter().lng },
    function (data, textStatus, jqXHR) {
      console.log(data);
      restaurantsFromQuery = [];
      var restaurants = data.results;
      $(".blurBox").empty();
      $(".blurBox").append('<div class="list-group">');
      for (key in restaurants) {
        var name = restaurants[key].poi.name
        name = name.replace(/'/g, "\\'")
        var marker = L.marker([
          restaurants[key].position.lat,
          restaurants[key].position.lon,
        ]).addTo(markerGroup);
        var occupancy = restaurants[key].occupancy
          ? restaurants[key].occupancy
          : 0;
          var max_occupancy = restaurants[key].max_occupancy
          ? restaurants[key].max_occupancy
          : "10";
        $(".blurBox").append(
          "<hr/>" +
            "<a class='foo' onclick=\"showOppcupants('" +
            restaurants[key].id +
            "',[" +
            restaurants[key].position.lat +
            "," +
            restaurants[key].position.lon +
            "],'" +
            name + 
            '\')"><div class="d-flex w-100 justify-content-between foo">' +
            '<h5 class="mb-1">' +
            restaurants[key].poi.name +
            "</h5>" +
            "</div>" +
            '<p class="mb-1">' +
            restaurants[key].address.freeformAddress +
            "</p>" +
            '<b class="mb-1 foo">Occupants: ' +
            occupancy +
            " / " + max_occupancy + " </b>" +
            "</a><br/>"
        );
      }
      $(".blurBox").append("<div>");
    }
  );
};

//searchRestaurant("italian")

var showOppcupants = function (id, latlng, name) {
  map.setView([latlng[0], latlng[1]]);
  $.ajax({
    url:
      "http://localhost:5000/api/restaurant/id/" +
      id,
    type: "GET",
  }).done(function (data) {
    console.log(data);

    $(".pickup-box").empty();
    $(".pickup-box").append(
        '<div class="card border-success mb-3" style="max-width: 18rem;">' +
        '<div class="card-header"><b>' + name + '</b></div>' +
        '<div class="card-body text-success">' +
        '<h5 class="card-title">Occupancy: <span id="occupancy">' + data.result.occupancy +'</span> / ' + data.result.max_occupancy + '</h5>' +
        //'<p class="card-text">' + name + '</p>' +
        '<button type="button" class="btn btn-success btn-lg checkin-btn" onclick="checkIn(\'' +
        id +
        "')\" data-toggle='modal' data-target='#exampleModal'>Check In</button>" +
        //'<button type="button" class="btn btn-outline-danger" onclick="closePickupBox()">Done</button>' +
        '<button type="button" class="btn btn-outline-danger" onclick="checkOut(\'' +
        id +
        "')\">Done</button>" +
        "</div>" +
        "</div>"
    );
  });
};

var closePickupBox = function () {
  $(".pickup-box").empty();
};

var checkIn = function (id) {
  console.log(id);
  $.ajax({
    url: "http://localhost:5000/api/restaurant/check-in/" + id,
    type: "PUT",
  }).done(function (data) {
    console.log(data);
    $("#occupancy").text(data.occupants);
    //$(".pickup-box").empty();
    //showOppcupants(id, latlng, name)
  });

  var query = $("#query").val();
  searchRestaurant(query);
};

var checkOut = function (id) {
    console.log(id);
    $.ajax({
      url: "http://localhost:5000/api/restaurant/check-out/" + id,
      type: "PUT",
    }).done(function (data) {
      console.log(data);
      $("#occupancy").text(data.occupants);
      //$(".pickup-box").empty();
      //showOppcupants(id, latlng, name)
    });
  
    var query = $("#query").val();
    searchRestaurant(query);
  };
