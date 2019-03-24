var express = require("express");
var bodyParser = require("body-parser");


const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://test:test@sos-idqtq.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

var publicHealthExpenses;

client.connect(err => {
  publicHealthExpenses = client.db("sos1819").collection("contacts");
  console.log("Connected!");
});

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 8080;


// GET /api/v1/public-health-expenses

app.get("/api/v1/public-health-expenses/:name", (req, res) => {
    var name = req.params.name;

	publicHealthExpenses.findById(name, (err, publicHealthExpense) => {
	    
		if(err){
			res.status(500).send({message: 'Error en la petición.'});
		}else{
			if(!publicHealthExpense){
				res.status(404).send({message: 'El artista no existe'});
			}else{
				res.status(200).send({publicHealthExpense});
			}
		}
	});
});

app.listen(port, () => {

    console.log("Super server ready on port " + port);
});
