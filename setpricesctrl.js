app.controller('setPricesCtrl', function ($scope, $http) {
    console.log("inside setPricesCtrl function");
    var posting = $http({
        method: 'POST',
        url: '/setPrices'
    }).then(function (response) {
        $scope.orders = response.data;
    });

    $scope.addFunc = function () {
        console.log("Inside addFunc on setPrices.html");
        $http.post('/addPrices', {
            'saledate': $scope.saledate,
            'price': $scope.price
        })
        var newDate = new Date($scope.saledate);
        var day = newDate.getDate();
        var month = newDate.getMonth() + 1;
        var year = newDate.getFullYear();

        if (day < 10) {
            day = '0' + day
        }
        if (month < 10) {
            month = '0' + month
        }
        var newDate = month + '/' + day + '/' + year;
        $scope.orders.push({
            'saledate': newDate,
            'price': $scope.price
        });
        //Clearing form values.
        $scope.saledate = '';
        $scope.price = '';
    }

    $scope.deleteFunc = function (value, key) {
        console.log('Into deleteFunc to delete data on setPrices.html');
        $http.post('/deletePrice', {
            'id': value.id,
            'saledate': value.saledate
        })
        for (key in $scope.orders) {
            if ($scope.orders[key]['id'] == value.id) {
                console.log($scope.orders[key]);
                $scope.orders.splice(key, 1);
            }
        }
    }
});