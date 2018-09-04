app.controller('pickListCtrl', function ($scope, $http) {
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
    };
});