angular.module('app')

.controller('MapCtrl',['$scope', '$ionicLoading','$http',
	function($scope, $ionicLoading,$http) {

	$scope.mapCreated = function(map) {

    $scope.map = map;
  };

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
	  //console.log(pos.coords.latitude,pos.coords.longitude);
	  //
console.log(pos.coords.longitude);
	  //var add_latitude =console.log(pos.coords.latitude);
	  //var add_longtitude ="";
	  var request = $http({

                method: "post",
                url: "http://203.172.179.44/5932040005/add_map.php",
                data: {
          add_latitude  :pos.coords.latitude,
          add_longtitude:pos.coords.longitude
          //std_name: $scope.user.name,
          //email: $scope.user.email

        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

        });
        request.success(function (res) {
                $scope.message =res;
             console.log('',res);
        if($scope.message==false){
            $scope.showAlertFail();
        }
        /*
        else{
            $scope.showAlertSuccess();
           //$state.go('main.tab1');
        }
*/
         });



      $scope.loading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };
}])
//
