var app = angular.module('myApp', []);
console.log(app.controller(), "  APPLICATION MODULE")
console.log(angular.module('myApp')._invokeQueue, "  CONTROLLERS?? ");
// //Created service
// app.service('myService', function () {
//     this.myFunc = function (myOrders) {
//         return myOrders;
//     }
// })

//test
app.service('myService', function($rootScope) {
    const obj = {};
    console.log('inside myService');

    fillOrder = function(myOrders) {
        obj.myOrderService = myOrders;
        console.log('filling the order');
        console.log($rootScope.myOrderService);
    }

    getOrder = function() {
        console.log('into getOrder function');
        console.log(obj.myOrderService);
        return obj.myOrderService;
    }

    return {
        fillOrder : fillOrder,
        getOrder : getOrder
    }
});



















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