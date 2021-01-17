
var searchRestaurant = function (query){
    console.log(query)
    $.get('http://localhost:5000/api/restaurant/' + query,  // url
    {"restaurant": query},
      function (data, textStatus, jqXHR) {  // success callback
          console.log(data)
          var restaurants = data.results
          $(".blurBox").empty()
          $(".blurBox").append('<div class="list-group">')
          for(key in restaurants){
              //$(".blurBox").append("<p>" + restaurants[key].poi.name + "</p>")
              var address = restaurants[key].address.streetNumber + ' ' + restaurants[key].address.streetName;
              $(".blurBox").append(
                '<hr/>' +    
              '<a onclick="showOppcupants(\'' + restaurants[key].address.streetNumber + '\')"><div class="d-flex w-100 justify-content-between">' + 
              '<h5 class="mb-1">' + restaurants[key].poi.name + '</h5>' + 
              '<small>3 days ago</small>' + 
              '</div>' +
              '<p class="mb-1">' +  restaurants[key].address.freeformAddress + '</p>' +
              '<b class="mb-1">Occupants: 10/25 </b>' +
              '<small>Donec id elit non mi porta.</small>' +
              '</a><br/>'
              )
          }
          $(".blurBox").append('<div>')
    });
}

//searchRestaurant("italian")


var showOppcupants =function (name){
  //alert("this works")
  $(".pickup-box").empty()
  $(".pickup-box").append(name)
}

