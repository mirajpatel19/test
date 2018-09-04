var app = angular.module('myApp', []);

app.config(function($routeProvider) {
    $routeProvider
        .when('/orders', {
            templateUrl: 'orders.html',
            controller: 'orderctrl.js'
        })
        .when('/picklist', {
            templateUrl: 'picklist.html',
            controller: 'picklistctrl.js'
        })
        .when('/payroll', {
            templateUrl: 'payroll.html',
            controller: 'payrollctrl.js'
        })
        .when('/setprices', {
            templateUrl: 'setprices.html',
            controller: 'setpricesctrl.js'
        })
})