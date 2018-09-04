app.controller('orderCtrl', function ($scope, $http, myService, $rootScope) {
    $scope.date = ' ';

    //onload function
    $scope.onloadFun = function () {
        //alert(1);
        //$scope.fullOrder = 'hello';

        // //calling the function
        // $scope.fullOrder = myService.myFunc();
        // console.log('here is the service');
        // console.log($scope.fullOrder);

        //test
        test = myService.getOrder();
        console.log(test);
        console.log($rootScope.test, "TESTING ROOT SCOPE")
        console.log('hi');
    }

    var testing = function () {
        //alert(1);
        //$scope.fullOrder = 'hello';

        // //calling the function
        // $scope.fullOrder = myService.myFunc();
        // console.log('here is the service');
        // console.log($scope.fullOrder);

        //test
        var test2 = myService.getOrder();
        console.log(test2);
        console.log('hi again...');
    }
    setTimeout(testing(), 2000);


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