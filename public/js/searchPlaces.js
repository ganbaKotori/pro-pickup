var searchRestaurant = function (query) {
  console.log(query);
  $.get(
    "http://localhost:5000/api/restaurant/" + query, // url
    { restaurant: query },
    function (data, textStatus, jqXHR) {
      // success callback
      console.log(data);
      var restaurants = data.results;
      $(".blurBox").empty();
      $(".blurBox").append('<div class="list-group">');
      for (key in restaurants) {
        var marker = L.marker([restaurants[key].position.lat,restaurants[key].position.lon]).addTo(map);
        //$(".blurBox").append("<p>" + restaurants[key].poi.name + "</p>")
        var address =
          restaurants[key].address.streetNumber +
          " " +
          restaurants[key].address.streetName;
        var occupancy = restaurants[key].occupancy
          ? restaurants[key].occupancy
          : 0;
        $(".blurBox").append(
          "<hr/>" +
            "<a onclick=\"showOppcupants('" +
            restaurants[key].id +
            "',[" +
            restaurants[key].position.lat +
            "," +
            restaurants[key].position.lon +
            '])"><div class="d-flex w-100 justify-content-between">' +
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
            "/25 </b>" +
            "<small>Donec id elit non mi porta.</small>" +
            "</a><br/>"
        );
      }
      $(".blurBox").append("<div>");
    }
  );
};

//searchRestaurant("italian")

var showOppcupants = function (id, latlng) {
  map.setView([latlng[0], latlng[1]]);
  $.ajax({
    url:
      "https://api.tomtom.com/search/2/poiDetails.json?key=jnwGidcOyjITnIRR2AqJSl7XV9COZdyh&id=" +
      id,
    type: "GET",
  }).done(function (data) {
    console.log(data);
  });
  $(".pickup-box").empty();
  $(".pickup-box").append(
    '<div class="card text-dark bg-transparent mb-3" style="max-width: 18rem;">' +
      '<div class="card-header ">Header<a href="#" class="card-link text-end" onclick="closePickupBox()">Close</a></div>' +
      '<img src="https://i.ytimg.com/vi/Wzh6OUYJX0c/maxresdefault.jpg" class="card-img-top" alt="...">' +
      '<div class="card-body">' +
      '<h5 class="card-title">' +
      id +
      "</h5>" +
      '<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card\'s content.</p>' +
      '<button type="button" class="btn btn-outline-danger" onclick="checkIn(\'' +
      id +
      "')\">Check In</button>" +
      "</div>" +
      "</div>"
  );
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
  });

  var query = $("#query").val();
  searchRestaurant(query);
};
