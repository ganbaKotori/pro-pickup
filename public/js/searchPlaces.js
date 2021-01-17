var currentlySelectedRestaurant;
var restaurantsFromQuery = [];

var searchRestaurant = function (query) {
  console.log(query);
  $.get(
    "http://localhost:5000/api/restaurant/" + query, // url
    { restaurant: query },
    function (data, textStatus, jqXHR) {
      // success callback
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
        ]).addTo(map);
        //$(".blurBox").append("<p>" + restaurants[key].poi.name + "</p>")
        var address =
          restaurants[key].address.streetNumber +
          " " +
          restaurants[key].address.streetName;
        var occupancy = restaurants[key].occupancy
          ? restaurants[key].occupancy
          : 0;
          var max_occupancy = restaurants[key].max_occupancy
          ? restaurants[key].max_occupancy
          : "10";
        $(".blurBox").append(
          "<hr/>" +
            "<a onclick=\"showOppcupants('" +
            restaurants[key].id +
            "',[" +
            restaurants[key].position.lat +
            "," +
            restaurants[key].position.lon +
            "],'" +
            name + 
            '\')"><div class="d-flex w-100 justify-content-between">' +
            '<h5 class="mb-1">' +
            restaurants[key].poi.name +
            "</h5>" +
            "<small>3 days ago</small>" +
            "</div>" +
            '<p class="mb-1">' +
            restaurants[key].address.freeformAddress +
            "</p>" +
            '<b class="mb-1">Occupants: ' +
            occupancy +
            " / " + max_occupancy + " </b>" +
            "<small>Donec id elit non mi porta.</small>" +
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
        "')\">Check In</button>" +
        '<button type="button" class="btn btn-outline-danger" onclick="closePickupBox()">Done</button>' +
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
