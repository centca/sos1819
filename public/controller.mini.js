/* global angular */

    angular
        .module("ContactsApp")
        .controller("MainCtrl",["$scope","$http", function ($scope,$http){
            
            var API = "/api/v1/contacts";
            console.log("Main controller initialzed----!:" )
            
            debugger;
            refresh();
            function refresh(){
            
                $http.get(API).then(function(res){
                    
                    console.log("Data Received:" + JSON.stringify(res,null,2));
                    $scope.contacts = res.data;
                    
                    debugger;
                    
                    
                });
            
            }
            
            $scope.addContact= function(){
                
                var newAddContact = $scope.newAddContact; 
                
                debugger;
                
                $http.post(API, newAddContact).then(function(res){
                
                    console.log("Data Received:" + res.data);
                    refresh();
                    debugger;
                
                
            });
            
            
            $scope.deleteContact= function(name){
                
                var newAddContact = $scope.newAddContact; 
                
                debugger;
                
                $http.post(API, newAddContact).then(function(res){
                
                    console.log("Data Received:" + res.data);
                    refresh();
                    debugger;
                
                
            });
            
            
            
        }}]);