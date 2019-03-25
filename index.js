var express = require("express");
var bodyParser = require("body-parser");


const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://test:test@sos-idqtq.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

var publicExpenditureEducations;

client.connect(err => {
  publicExpenditureEducations = client.db("sos1819").collection("public-expenditure-educations");
  console.log("Connected!");
});

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 8080;




app.get("/api/v1/public-expenditure-educations/loadInitialData", (req, res) => {

    var newPublicExpenditureEducations = [{

    country: "espania",
    year: "2015",
    educationExpense: "46241,5",
    educationExpensePub: "9,77",
    educationExpensePib: "4,28",
    healthExpenditurePerCapita: "977",
    var_: "-13,08",

}, {
    country: "alemania",
    year: "2015",
    educationExpense: "146754,1",
    educationExpensePub: "10,98",
    educationExpensePib: "4,81",
    healthExpenditurePerCapita: "1975",
    var_: "-16,16",

}, {
    country: "reino unido",
    year: "2016",
    educationExpense: "133190,4",
    educationExpensePub: "13,91",
    educationExpensePib: "5,54",
    healthExpenditurePerCapita: "2028",
    var_: "-10,36",

}, {
    country: "portugal",
    year: "2016",
    educationExpense: "133,4",
    educationExpensePub: "132,91",
    educationExpensePib: "52,54",
    healthExpenditurePerCapita: "228",
    var_: "-10,36",

}, {
    country: "belgica",
    year: "2016",
    educationExpense: "13313,4",
    educationExpensePub: "13,91",
    educationExpensePib: "5,54",
    healthExpenditurePerCapita: "28",
    var_: "-10,36",

}];

    newPublicExpenditureEducations.forEach((i) => {
        publicExpenditureEducations.insert(i)

    })
    res.sendStatus(200);
});



// --------------------------------------------   GET /api/v1/public-health-expenses -----------------------------------------------------

app.get("/api/v1/public-expenditure-educations", (req, res) => {

	publicExpenditureEducations.find({}).toArray( (err, publicExpenditureEducation) => {
	    
		if(err){
			
			res.sendStatus(500);
			
		}else{
			
			res.status(200).send(publicExpenditureEducation);
	
		}
	});
});




// --------------------------------------------   POST /api/v1/public-health-expenses -----------------------------------------------------

app.post("/api/v1/public-expenditure-educations", (req, res) => {

	var data =  req.body;
    
    publicExpenditureEducations.find({ "country": data["country"] }).toArray((err,newPEE )=>{
    	
    	if(err){  //Error interno del servidor
    		
			res.sendStatus(500);
			
		}else{
			
			if(newPEE.length > 0){ // Ya existe el recurso
				
				res.sendStatus(409);
			
			}else{
			
				if( data["country"] == "" || data["year"] == null || data["educationExpense"] == null || data["educationExpensePub"] == null
				|| data["educationExpensePib"] == null || data["healthExpenditurePerCapita"] == null || data["var_"] == null){
							
					res.sendStatus(400);	// //Miramos si existe algún error (ej: solicitud malformada, sintaxis errónea, etc)
							
				}else{		
   

					publicExpenditureEducations.insert(data, (err, newPEE ) =>{
				
						if(err){
							
							res.sendStatus(500);
							
						}else{
							
							res.sendStatus(201);
								
						}
					
					});
				}
					
				
				
			}
			
		}
    });
});

// -------------------------------------------- DELETE /api/v1/public-health-expenses  --------------------------------------------

app.delete("/api/v1/public-expenditure-educations", (req, res) => {

    publicExpenditureEducations.remove({},(err,publicExpenditureEducation )=>{
    	
    	if(err){
    		
			res.sendStatus(500);
			
		}else{
			
			res.sendStatus(200);
				
		}
    	
    });

    
});


//  -------------------------------------------- GET /api/v1/public-health-expenses/pablo  --------------------------------------------

app.get("/api/v1/public-expenditure-educations/:country", (req, res) => {
    var country = req.params.country;

	publicExpenditureEducations.find({"country":country}).toArray( (err, publicExpenditureEducation) => {
	    
		if(err){
			
			res.status(500).send({message: 'Error en la petición.'});
			
		}else{
			
			if(publicExpenditureEducation.length<1){
				
				res.sendStatus(404);
				
			}else{
				
				if(country != publicExpenditureEducation[0]["country"]){
					
					
					res.sendStatus(400);
					
				}else{
					
					res.status(200).send({publicExpenditureEducation});
					
				}
				
				
				
			}
		}
	});
});



//   --------------------------------------------PUT /api/v1/public-health-expenses/españa   --------------------------------------------

app.put("/api/v1/public-expenditure-educations/:country", (req, res) => {

    var country = req.params.country;
    var updateData = req.body;

    publicExpenditureEducations.find({"country": country}).toArray( (err, findPublicExpenditureEducation)=>{
    	
    	if(err){ //error interno del servidor
    		
    		res.sendStatus(500);
    		
    	}else{
    		
    		
    		if(findPublicExpenditureEducation.length==0){ //Miramos si existe el recurso
    			
    			res.sendStatus(404);
    			
    		}else{
    			
    			if(country != updateData.country){ //Miramos si existe algún error (ej: solicitud malformada, sintaxis errónea, etc)
    				
    				res.sendStatus(400);
    				
    			}else{
    			
	    			publicExpenditureEducations.update({"country":country}, updateData, (err, updatePEE) => {
	    				
	    				if(err){
	    				
	    					res.sendStatus(500);	
	    					
	    				}else{
	    					
	    					res.sendStatus(200);
	    				
	    				}
	    				
	    			});
    			
    			}
    			
    		}
    		
    	}
    
    });
   
	
});


//  --------------------------------------------  DELETE /api/v1/public-health-expenses/españa   --------------------------------------------

app.delete("/api/v1/public-expenditure-educations/:country", (req, res) => {

   var country = req.params.country;

    publicExpenditureEducations.find({"country":country}).toArray( (err, deletePublicExpenditureEducations)=>{
    	
    	if(err){
    		
    		res.status(500);
    		
    	}else{
    	
    		if(deletePublicExpenditureEducations.length<1){
    			
    			res.sendStatus(404);
    			
    		}else{
    			
    			publicExpenditureEducations.remove({"country":country});
    			res.sendStatus(200);
    		
    		}
    	}
    });

});


//   --------------------------------------------Métodos erróneos  --------------------------------------------

//   -------------------------------------------- PUT /api/v1/public-health-expenses (ERROR)   --------------------------------------------

app.put("/api/v1/public-expenditure-educations", (req, res) => {

    res.sendStatus(405);

});


//   -------------------------------------------- POST /api/v1/public-health-expenses (ERROR)   --------------------------------------------

app.post("/api/v1/public-expenditure-educations/:country", (req, res) => {

    res.sendStatus(405);

});

//----------------------------------------------------------------------------



app.listen(port, () => {

    console.log("Super server ready on port " + port);
});
