angular.module("userApp", ["ngRoute"])
.config(function($routeProvider) {
    $routeProvider
    .when("/home", {
        templateUrl : "home.html",
        controller : "mainController"
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
    .when("/profile", {
        templateUrl : "profile.html",
        controller: "profileController"
    })
    .when("/profile/:userId", {
        templateUrl : "profile.html",
        controller: "profileController"
    });
})
.controller("mainController", function($scope, cookieService){
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
.controller("loginController", function($scope, $http, $location){
    $scope.login = function login(){
        $http.post("/login", $scope.user)
        .then(function successCallback(res){
            document.cookie = "username="+res.data.user.username;
            document.cookie = "userid="+res.data.user._id;
            console.log(res.data.message);
            $location.url("/profile/" + res.data.user._id);
        }, function errorCallback(res){
            window.alert(res.data.message)
        })
    }
})
.controller("logoutController", function($timeout, $location){
    $timeout(function() {
        document.cookie = "username=";
        document.cookie = "userid=";
        $location.url('/home');
    }, 3000);

})
.controller("profileController", function($scope, $http, $routeParams, $location, cookieService){
    if (cookieService.getCookie("username")) {
        if (!$routeParams.userId) {
            console.log($location.url("/profile/" + cookieService.getCookie("userid")))
        }

        $http.get("/profile/"+cookieService.getCookie("userid"))
        .then(function successCallback(res){
            $scope.user = res.data.user 
        }, function errorCallback(res){
            console.log(res.data.message)
        })
    }
})
.factory('cookieService', function () {
    var service = {
        getCookie : getCookie
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
 
    return service;
  })