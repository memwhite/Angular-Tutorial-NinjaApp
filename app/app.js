//The module for the entire application you can see it calls the ngRoute and ngAnimate libraries
var myNinjaApp = angular.module('myNinjaApp', ['ngRoute', 'ngAnimate']);

//config does things before everything loads
myNinjaApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

//this is needed to help set up pretty URLs
$locationProvider.html5Mode(true);

//These are all the routes to different views
  $routeProvider
    .when('/home', {
      templateUrl:'views/home.html',
      controller: 'NinjaController'
    })
    .when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'ContactController'
    })
    .when('/contact-success', {
      templateUrl: 'views/contact-success.html',
      controller: 'ContactController'
    })
    .when('/directory', {
      templateUrl: 'views/directory.html',
      controller: 'NinjaController'
    }).otherwise({
      redirectTo: '/home'
    });

}]);

//this function picks a ninja at random to display on the home page
myNinjaApp.directive('randomNinja', [function(){

  return {
    restrict: 'E', // the E stands for Element
    scope: {
      ninjas: '=',
      title: '='
    },
    templateUrl: 'views/random.html',
    transclude: true,
    replace: true,
    controller: function($scope){
      $scope.random = Math.floor(Math.random() * 4); //this picks a random number which in
    }                                                 //turn helps pick the random ninja
  };

}]);

//Ninja Controller controls the home and directory views
myNinjaApp.controller("NinjaController", ['$scope', '$http', function($scope, $http){

//this removes a ninja from the list one at a time when you click on the x
  $scope.removeNinja = function(ninja){
    var removedNinja = $scope.ninjas.indexOf(ninja);
    $scope.ninjas.splice(removedNinja, 1);
  };
//this is the object model for adding new ninjas to the list
  $scope.addNinja = function(){
    $scope.ninjas.push({
    name: $scope.newninja.name,
    belt: $scope.newninja.belt,
    rate: parseInt($scope.newninja.rate),
    available: true
    });

    $scope.newninja.name = "";
    $scope.newninja.belt = "";
    $scope.newninja.rate = "";
  };
  //this is the function that removes all the ninjas in the list when you click on the Remove Ninjas link
  $scope.removeAll = function(){
    $scope.ninjas = [];
  };
//this is getting data from the ninja.json file
  $http.get('data/ninjas.json').success(function(data){
    $scope.ninjas = data;
  });

}]);
  //this is the function that sends you to the contact-success view after you push submit on the contact view
myNinjaApp.controller('ContactController', ['$scope', '$location', function($scope, $location){

  $scope.sendMessage = function(){
    $location.path('/contact-success')
  };

}])
