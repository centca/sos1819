var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
const MongoClient = require('mongodb').MongoClient;

var app = express();
var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, "public")));


//---------------------------------------Minipostman Juan Manuel Centeno -------------------------------------------

app.use('/public-expenditure-educations', express.static(path.join(__dirname, "public/public-expenditure-educations/views")));


// -------------------API REST Juan Manuel Centeno-----------------------

const uriJMCC = "mongodb+srv://test:test@sos-idqtq.mongodb.net/test?retryWrites=true";
const clientJMCC = new MongoClient(uriJMCC, { useNewUrlParser: true });

var publicExpenditureEducationsAPI = require("./publicExpenditureEducationsAPI/index.js");
var publicExpenditureEducations;

clientJMCC.connect(err => {
    publicExpenditureEducations = clientJMCC.db("sos1819").collection("public-expenditure-educations");

    publicExpenditureEducationsAPI.register(app, publicExpenditureEducations);
    console.log("Connected!");
});

//---------------------------------------------------------------------------



app.listen(port, () => {

    console.log("Super server ready on port " + port);
});
