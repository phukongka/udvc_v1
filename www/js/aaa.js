angular.module('app.controllers', [])
  
.controller('loginCtrl', ['$scope','$state' ,'$stateParams','$http','$ionicPopup','$ionicHistory','$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$state,$stateParams,$http,$ionicPopup,$ionicHistory,$rootScope) {
  $scope.usr={};
	//console.log($scope.loggedin_name=sessionStorage.getItem('loggedin_name'));
	if($scope.loggedin_name=sessionStorage.getItem('loggedin_name')!=null){
$state.go('page5');
	};
 //$rootScope.user.email1 ="";
  $scope.doLogin =function(){
    $http(
      {
        url: "http://127.0.0.1/ionic_api1/login.php",
        method:'post',
            data: {
                  pass: $scope.usr.pass,
                  email:$scope.usr.email
                 }
      }

      ).then(function(response){
        //$state.go('page55');
         console.log('res='+response.data.results);
        //$rootScope.usr.email1 == $scope.user_details.email;
		//create session
        if(response.data.results=='succese_login'){
          $scope.user_details = response.data.users;
          sessionStorage.setItem('loggedin_code', $scope.user_details.teacher_code);
          sessionStorage.setItem('loggedin_std_gro1', $scope.user_details.std_gro1);
          sessionStorage.setItem('loggedin_std_gro2', $scope.user_details.std_gro2);
         //console.log($scope.user_details.name);
		    //$rootScope.usr_email == $scope.user_details.email;

         $state.go('page5');
       }else{
         $state.go('page');
       }
/*
       //
       $ionicHistory.nextViewOptions({
                 disableAnimate: true,
                 disableBack: true
               });
               lastView = $ionicHistory.backView();
               console.log('Last View',lastView);
               if(lastView.stateId=="checkOut"){ $state.go('checkOut', {}, {location: "replace", reload: true}); }
               else{$state.go('menu.avatar', {}, {location: "replace", reload: true});}
       //
*/
      },function(error){
       // console.log(response.data.results);
        var alertPopup = $ionicPopup.alert({
						title: 'Login failed!',
						template: 'Please check your credentials!'
					});
      });


  }
  }])
   
.controller('login2Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('page5Ctrl', function($scope, $http,$state, $interval,$ionicHistory) {
  
    $scope.loggedin_code=sessionStorage.getItem('loggedin_code');
    $scope.loggedin_std_gro1= sessionStorage.getItem('loggedin_std_gro1');
    $scope.loggedin_std_gro2= sessionStorage.getItem('loggedin_std_gro2');
         console.log($scope.loggedin_std_gro1);

  //$http.get("http://127.0.0.1/ionic_api1/students/list_of_students/list_of_students.php")

//$http.get("http://127.0.0.1/ionic_chat/list_user.php")
$interval(function(){
     $http(
        {
        url: "http://127.0.0.1/ionic_api1/students/list_of_students/list_of_students.php",
        //url: "http://202.29.228.250/ionic_api/login.php",
        method:'post',
            data: {
                  std_gro1:$scope.loggedin_std_gro1,
                  std_gro2:$scope.loggedin_std_gro2
                
                 }
        }

      )

 .then(function (response) {
      $scope.model_object = response.data.records;
    });
})

  // I think this is very bad practice...but this is brute force to refresh model.
  /*
  $interval(function(){
    $http.get("http://127.0.0.1/ionic_api1/students/list_of_students/list_of_students.php")
      .then(function (response) {
        $scope.model_object = response.data.records;
        //console.log('name='+$scope.model_object)
      });
    console.log("Trying to refresh");
  },1000);
*/

})
.controller('updateStudentCtrl', function($scope, $http, $ionicHistory) {

  $scope.updateStudent = function(){
    $http.post("http://127.0.0.1/ionic1/CRUD/update_student.php",
      {
        'code':$scope.code,
        'name':$scope.name,
        'gro':$scope.gro,
        'tell1':$scope.tell1,
        'birt':$scope.birt,
        'depwork':$scope.depwork,
        'pin_id':$scope.pin_id,
      })
      .success(function(data){
        console.log("Data updated successfully");
      });
    $ionicHistory.goBack();
  }
})
   
.controller('page6Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('page8Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('page9Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('pageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('page12Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('signupCtrl', ['$scope','$rootScope','$state','$stateParams','$http','$ionicPopup','$ionicModal',
function ($scope,$rootScope,$state,$stateParams,$http,$ionicPopup,$ionicModal) {
  $scope.usr={};
	///sessionStorage.setItem('loggedin_name', $scope.user_details.name);
	//console.log(sessionStorage.getItem('loggedin_name'));
  $scope.Signup =function(){
    $http(
      {
        url: "http://192.168.52.145/ionic_api/signup.php",
        method:'post',
            data: {
                  pass: $scope.usr.pass,
                  name: $scope.usr.name,
                  email:$scope.usr.email
                 }
        }
      ).then(function(response){
       console.log(response.data.results);
        if(response.data.results=='succese_signup'){
         $state.go('login');
       }else{
         $state.go('page5');
       }
      },function(error){
        console.log(error);
      });


}
}])