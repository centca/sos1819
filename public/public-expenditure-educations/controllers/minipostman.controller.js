/* global angular $scope $routeParams */
var app = angular.module("MiniPostmanApp");

app.controller("MainCtrl", ["$scope","$http", function ($scope,$http){
    
    var emptyResponse = {datos: "NONE", status: "NONE"};
    
    $scope.model = {
        
        update : "/espania/2015"
        
    }
    
    $scope.consulta = "/espania"
    $scope.consultaPut = "/espania/2015"
    $scope.deleteRecurso = "/espania/2015"
    
    //modelo para el post
    
    $scope.data ={
               country: "espania",
                year: 2015,
                educationExpense: 46241.5,
                educationExpensePub: 9.77,
                educationExpensePib: 4.28,
                healthExpenditurePerCapita: 977,
                var_: -13.08,
            };
    
    $scope.dataput ={
               country: "espania",
                year: 2015,
                educationExpense: 46241.5,
                educationExpensePub: 9.77,
                educationExpensePib: 4.28,
                healthExpenditurePerCapita: 977,
                var_: -13.08,
            };
    
    
    
    console.log("MainCtrl initialized!");
    
    $scope.url = "/api/v1/public-expenditure-educations";
                
    $scope.inicial = function (){
        
        $http.get($scope.url+"/loadInitialData").then(function (res){
            
            $scope.dataInicial = { status: JSON.stringify(res.status,null,2)};
            
        }).catch(function(res){
            
            $scope.dataInicial = { status: JSON.stringify(res.status,null,2)};
            
        });
    }
    
    
    $scope.getList = function (){
        
        $http.get($scope.url).then(function (res){
            
            $scope.getLista = { status: JSON.stringify(res.status,null,2),
                                   datos:  JSON.stringify(res.data,null,2)   
                                };
            
        }).catch(function(res){
            
            $scope.getLista = { status: JSON.stringify(res.status,null,2),
                                   datos:  JSON.stringify(res.data,null,2)   
                                };
            
        });
    }
    
    $scope.get = function (id){
        
        $http.get($scope.url+id).then(function (res){
            
            
            $scope.getConsulta = { status: JSON.stringify(res.status,null,2),
                                   datos:  JSON.stringify(res.data ,null,2)   
                                };
            
        }).catch(function(res){
            
          $scope.getConsulta = { status: JSON.stringify(res.status,null,2),
                                   datos:  JSON.stringify(res.data,null,2)   
                                };
            
        });
    }
    
    
    
    $scope.post = function (data){
        $http.post($scope.url,  $scope.data).then(function (res){
            
      
            $scope.postRespuesta = { status: JSON.stringify(res.status,null,2),
                                   datos:  JSON.stringify(res.data ,null,2)   
                                };
            
        }).catch(function(res){
            
            $scope.postRespuesta = { status: JSON.stringify(res.status,null,2),
                                   datos:  JSON.stringify(res.data,null,2)   
                                };
            
        });
    }
    
    
    $scope.put = function (id){
        
        $http.put($scope.url + id,  $scope.dataput).then(function (res){
            
            
            $scope.putRespuesta = { status: JSON.stringify(res.status,null,2),
                                   datos:  JSON.stringify(res.data ,null,2)   
                                };
            
        }).catch(function(res){
            
            $scope.putRespuesta = { status: JSON.stringify(res.status,null,2),
                                   datos:  JSON.stringify(res.data,null,2)   
                                };
            
        });
    }
    
    
     $scope.deleteAll = function (){
        
        $http.delete($scope.url).then(function (res){
           
            
            $scope.deleteRespuesta = { status: JSON.stringify(res.status,null,2),
                                   datos:  JSON.stringify(res.data ,null,2)   
                                };
            
        }).catch(function(res){
            
            $scope.deleteRespuesta = { status: JSON.stringify(res.status,null,2),
                                   datos:  JSON.stringify(res,null,2)   
                                };
            
        });
    }
    
    
    $scope.deleteR = function (id){
        
        $http.delete($scope.url+id).then(function (res){
           
            
            $scope.deleteRecRespuesta = { status: JSON.stringify(res.status,null,2),
                                   datos:  JSON.stringify(res.data ,null,2)   
                                };
            
        }).catch(function(res){
            
            $scope.deleteRecRespuesta = { status: JSON.stringify(res.status,null,2),
                                   datos:  JSON.stringify(res.data,null,2)   
                                };
            
        });
    }
    
    
    
    
    $scope.postConf = function (id){
        
        $http.post($scope.url+id).then(function (res){
           
            
            $scope.postRecRespuesta = { status: JSON.stringify(res.status,null,2),
                                   datos:  JSON.stringify(res.data ,null,2)   
                                };
            
        }).catch(function(res){
            
            $scope.postRecRespuesta = { status: JSON.stringify(res.status,null,2),
                                   datos:  JSON.stringify(res.data,null,2)   
                                };
            
        });
    }
    
    
    $scope.putConf = function (){
        
        $http.put($scope.url).then(function (res){
           
            
            $scope.putConfcRespuesta = { status: JSON.stringify(res.status,null,2),
                                   datos:  JSON.stringify(res.data ,null,2)   
                                };
            
        }).catch(function(res){
            
            $scope.putConfcRespuesta = { status: JSON.stringify(res.status,null,2),
                                   datos:  JSON.stringify(res.data,null,2)   
                                };
            
        });
    }
    
   
}]);