app.controller('pickListCtrl', function ($scope, $http, myService, $rootScope) {
    // //calling the service, inject myService into the function!.
    // $scope.num = myService.myFunc(10);

    $scope.date = ' ';

    $scope.send = function () {
        console.log("inside send function");
        console.log($scope.data.date);

        var posting = $http({
            method: 'POST',
            url: '/picklist',
            data: {
                'date': $scope.data.date
            }
        }).then(function (response) {
            $scope.orders = response.data;
            console.log($scope.orders);
            $scope.sortField = 'userid';
            $scope.reverse = true;
        })
    }

    $scope.getOrder = function (value, key) {
        console.log(value, key);
        console.log('test');
        $scope.fullOrder = $scope.orders[key];
        console.log($scope.fullOrder);

        // //calling the service, inject myService into the function!.
        // $scope.fullOrder = myService.myFunc($scope.fullOrder);
        // console.log('here is the service');
        // console.log($scope.fullOrder);
        //// TODO: send the data to orderlist for filter.

        //test
        //$scope.senduser = function($scope.fullOrder)
        $rootScope.test = 7000; 
        myService.fillOrder($scope.fullOrder);
        $scope.test = myService.getOrder();
    };

});