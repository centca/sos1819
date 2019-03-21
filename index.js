var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.post("/", (req, res) => {

    console.log("Hola");

});

//----------------------------------------------------------------------------


app.listen(port, () => {

    console.log("Super server ready on port " + port);
});