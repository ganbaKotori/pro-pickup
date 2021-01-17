const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    pid: {
        type: "String"
    },
    occupancy: {
        type: "Number"
    },
    max_occupancy: {
        type: "Number"
    },
});

const restaurant = mongoose.model("restaurant", restaurantSchema);
module.exports = restaurant;