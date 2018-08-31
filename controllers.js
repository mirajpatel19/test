app.controller('orderCtrl', function ($scope, $http) {
    $scope.date = ' ';

    // $scope.filter = myService.style();
    $scope.send = function () {
        console.log("inside send function with date: ");
        console.log($scope.data.date);

        $http.post('/orders', {
                'date': $scope.data.date
            })
            .then(function (response) {
                $scope.orders = response.data;
                $scope.sortField = 'userid';
                $scope.reverse = true;
            })
    }

    $scope.deleteFunc = function (value, key) {
        console.log('Into deleteFunc to delete data on orders.html with Id, index: ');
        console.log(value, key);

        $http.post('/deleteOrder', {
            'id': value
        })
        for (key in $scope.orders) {
            if ($scope.orders[key]['id'] == value) {
                console.log($scope.orders[key]);
                $scope.orders.splice(key, 1);
            }
        }
    }

    $scope.addFunc = function () {
        console.log('Into addFunc to add data on orders.html: ');

        $http.post('/addOrder', {
                'userid': $scope.userid,
                'empnum': $scope.empnum,
                'fname': $scope.fname,
                'lname': $scope.lname,
                'saledate': $scope.saledate,
                'variety': $scope.variety,
                'style': $scope.style,
                'size': $scope.size,
                'qty': $scope.qty,
                'pounds': $scope.pounds
            })
            .then(function (response) {
                $scope.idData = response.data;
                console.log("into response for addFunc: ");

                $scope.orders.push({
                    'id': $scope.idData[0].id,
                    'userid': $scope.userid,
                    'empnum': $scope.empnum,
                    'fname': $scope.fname,
                    'lname': $scope.lname,
                    'saledate': $scope.saledate,
                    'variety': $scope.variety,
                    'style': $scope.style,
                    'size': $scope.size,
                    'qty': $scope.qty,
                    'pounds': $scope.pounds
                });

                //Clearing form values
                $scope.userid = '';
                $scope.empnum = '';
                $scope.fname = '';
                $scope.lname = '';
                $scope.saledate = '';
                $scope.variety = '';
                $scope.style = '';
                $scope.size = '';
                $scope.qty = '';
                $scope.pounds = '';
            });
    }
});


app.controller('pickListCtrl', function ($scope, $http, myService) {
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

            //calling the service, inject myService into the function!.
            $scope.getOrder = function (index) {
                $scope.fullOrder = $scope.orders[index];
                console.log($scope.fullOrder);
                $scope.num = myService.myFunc($scope.fullOrder);
                //// TODO: send the data to orderlist for filter.
            };

            $scope.sortField = 'userid';
            $scope.reverse = true;
        })
    }
});


app.controller('payRollCtrl', function ($scope, $http) {
    $scope.date = ' ';

    $scope.send = function () {
        console.log("inside send function for payroll.html");

        var posting = $http({
            method: 'POST',
            url: '/payRoll',
            data: {
                'date': $scope.data.date,
            }
        }).then(function (response) {
            $scope.orders = response.data;
            $scope.sortField = 'userid';
            $scope.reverse = true;
        })
    }
});


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