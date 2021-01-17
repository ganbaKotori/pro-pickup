
const Restaurant = require("../models/restaurant");
const express = require('express');
const app = express()
const axios = require('axios')

app.get('/:restaurant', (req, res) => {
    
    axios.get('https://api.tomtom.com/search/2/search/' + req.params.restaurant + '.json?countrySet=US&lat=34.840108&lon=-115.9668749&categorySet=7315&key=jnwGidcOyjITnIRR2AqJSl7XV9COZdyh')
  .then(async function (response) {
    // handle success
    console.log(response.data);
    let restaurants = response.data.results;

    for(var key in restaurants){
        var pid = restaurants[key].id
        const restaurant = await Restaurant.findOne({
            "pid": pid,
          });
        if(restaurant){
            console.log("restaurant found")
            console.log(restaurant)
            restaurants[key].occupancy = restaurant.occupancy
        } else {
            const newRestaurant = new Restaurant({"pid": pid, "occupancy" : 0, "max_occupancy:" : 25});
            newRestaurant
              .save()
              .then((results) => console.log(results))
              .catch((err) => {console.log(err);res.status(400).json("Error: " + err)});
        }
    }

    var updatedResponse = response.data
    updatedResponse.results = restaurants
    
    res.send(updatedResponse)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
  })


  app.put('/check-in/:id', async (req, res) => {
    const restaurant = await Restaurant.findOne({
        "pid": req.params.id,
      });
    
    if(restaurant){
        restaurant.occupancy += 1;
    }
    restaurant
      .save()
      .then((results) => {res.json("restaurant occupant count incremented")})
      .catch((err) => res.status(400).json("Error: " + err));
  })



  module.exports = app;
