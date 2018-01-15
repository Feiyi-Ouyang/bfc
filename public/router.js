angular.module("userApp", ["ngRoute"])
.config(function($routeProvider) {
    $routeProvider
    .when("/home", {
        templateUrl : "home.html",
    })
    .when("/register", {
        templateUrl : "register.html",
        controller: "registerController"
    })
    .when("/login", {
        templateUrl : "login.html",
        controller: "loginController"
    })
    .when("/logout", {
        templateUrl : "logout.html",
        controller: "logoutController"
    })
    .when("/profile/:userId", {
        templateUrl : "profile.html",
        controller: "profileController"
    });
})
.controller("registerController", function($scope, $http, $location){
    $scope.register = function register(){
        $http.post("/register", $scope.user)
        .then(function successCallback(res){
            console.log(res.data.message)
            $location.url("/login");
        }, function errorCallback(res){
            console.log(res.data.message)
        })
    };
})
.controller("loginController", function($scope, $http, $location, $rootScope){
    $scope.login = function login(){
        $http.post("/login", $scope.user)
        .then(function successCallback(res){
            console.log(res.data.message);
            $rootScope.currentUser = true;
            $location.url("/profile/" + res.data.user._id);
        }, function errorCallback(res){
            window.alert(res.data.message)
            location.reload();
        })
    }
})
.controller("logoutController", function($timeout, $location, $rootScope){
    $timeout(function() {
        $rootScope.currentUser = false;
        $location.path('/home');
    }, 3000);

})
.controller("profileController", function($scope, $http, $rootScope, $routeParams){
    if ($rootScope.currentUser) {
        $http.get("/profile/"+$routeParams.userId)
        .then(function successCallback(res){
            $scope.user = res.data.user 
        }, function errorCallback(res){
            console.log(res.data.message)
        })
    }
});