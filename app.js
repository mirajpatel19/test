var app = angular.module('myApp', []);

//Created service
app.service('myService', function () {
    this.myFunc = function (x) {
        return x;
    }
})




















// .config(function($routeProvider) {
//     $routeProvider
//         .when('/orders', {
//             templateUrl: 'orders.html',
//             controller: 'controllers.js'
//         })
//         .when('/picklist', {
//             templateUrl: 'picklist.html',
//             controller: 'controllers.js'
//         })
//         .when('/payroll', {
//             templateUrl: 'payroll.html',
//             controller: 'controllers.js'
//         })
//         .when('/setprices', {
//             templateUrl: 'setprices.html',
//             controller: 'controllers.js'
//         })
// })