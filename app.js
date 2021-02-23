const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
  const city =req.body.cityName;
  console.log("Post request recieved");
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid={YOUR API KEY}&units=metric";
    https.get(url,function(response){


      response.on("data",function(data){
        const weatherData = JSON.parse(data);
        const t = weatherData.main.temp
        const desc = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        res.write("<h1 style='text-align: center'>The temperature in " + city + " is " + t + " degrees Celsius.</h1>");
        res.write("<div style='text-align: center'><img src=" + imgURL + "></div>");
        res.write("<p style='text-align: center'>The weather is "+desc+"</p>");

        res.send();

      });

    });
});

app.listen(3000,function(){
  console.log("server is running on port 3000");
});
