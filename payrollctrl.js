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