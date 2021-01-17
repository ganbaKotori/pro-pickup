const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');
var twilio = require("twilio");
const restaurantRoute = require("./routes/restaurant");

var client = new twilio(
  "AC9aef209d713633a5a55ba6d0939e73a2",
  "a58f3400b6d3b84b7ee3b25233ff23f7"
);

// Send the text message.
/*client.messages.create({
  to: '+15625837458', 
  from: '+13342588426',
  body: 'Hello from Twilio!'
});*/

const uri = "mongodb+srv://alex:alex@cluster0.lvnnn.mongodb.net/pro-pickup?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true }).then(() => {
  const app = express();
  app.use(cors());
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb" }));
  app.use(express.json());

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use("/api/restaurant", restaurantRoute);
  app.listen(5000, () => {
    console.log("Connected to pro-pickup mongodb on port 5000");
  });
});
