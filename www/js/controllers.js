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
       // url: "http://192.168.52.27/ionic_api/login.php",
        url: "http://localhost/ionic_api/login.php",
        method:'post',
            data: {
                  pass: $scope.usr.pass,
                  email:$scope.usr.email
                 }
        }

      ).then(function(response){
        //$state.go('menu.avatar');
        ///console.log('res='+response.data.results);
        //$rootScope.usr.email1 == $scope.user_details.email;
    //create session
        if(response.data.results=='succese_login'){
          $scope.user_details = response.data.users;
          console.log('data='+response.data.users);
          sessionStorage.setItem('loggedin_code', $scope.user_details.teacher_code);
         // sessionStorage.setItem('loggedin_std_code', $scope.user_details.code);
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
    $scope.loggedin_std_code=sessionStorage.getItem('loggedin_std_code');
    $scope.loggedin_std_gro1= sessionStorage.getItem('loggedin_std_gro1');
    $scope.loggedin_std_gro2= sessionStorage.getItem('loggedin_std_gro2');
         console.log($scope.loggedin_std_gro1);

  //$http.get("http://127.0.0.1/ionic_api1/students/list_of_students/list_of_students.php")

//$http.get("http://127.0.0.1/ionic_chat/list_user.php")
$interval(function(){
     $http(
        {
        url: "http://localhost/ionic_api/students/list_of_students/list_of_students.php",
        //url: "http://202.29.228.250/ionic_api/login.php",
        method:'post',
            data: {
                  std_gro1:$scope.loggedin_std_gro1,
                  std_gro2:$scope.loggedin_std_gro2,
                  teacher_code:$scope.loggedin_code
                 }
        }

      )
 .then(function (response) {
      $scope.model_object = response.data.records;

     // sessionStorage.setItem('loggedin_std_code', $scope.model_object.code);
      //$scope.loggedin_std_code=sessionStorage.getItem('loggedin_std_code');
    //  console.log('m='+ response.data.records);

    });
    console.log("Trying to refresh");
},1000);
/*
  // I think this is very bad practice...but this is brute force to refresh model.

  $interval(function(){
    $http.get("http://127.0.0.1/ionic_api1/students/list_of_students/list_of_students.php")
      .then(function (response) {
        $scope.model_object = response.data.records;
        //console.log('name='+$scope.model_object)
      });
    console.log("Trying to refresh");
  },1000);
*/
$scope.logout=function(){
        delete sessionStorage.loggedin_code;
        delete sessionStorage.loggedin_std_gro1;
        delete sessionStorage.loggedin_std_gro2;
        delete sessionStorage.loggedin_status;


      //  console.log('Logoutctrl',sessionStorage.getItem('loggedin_id'));
/*
        $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });
        */
        $state.go('login', {}, {location: "replace", reload: true});
    };
})
.controller('updateStudentCtrl', function($scope, $http, $ionicHistory) {

  $scope.updateStudent = function(){
    $http.post("http://localhost/ionic/CRUD/update_student.php",
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

.controller('page6Ctrl', function($scope, $http,$state,$stateParams, $interval,$ionicHistory) {
    $scope.std_id=$stateParams.code_id;
    $scope.loggedin_code=sessionStorage.getItem('loggedin_code');
    $scope.loggedin_std_code=sessionStorage.getItem('loggedin_std_code');
    $scope.loggedin_std_gro1= sessionStorage.getItem('loggedin_std_gro1');
    $scope.loggedin_std_gro2= sessionStorage.getItem('loggedin_std_gro2');
        // console.log($scope.loggedin_std_gro1);

  //$http.get("http://127.0.0.1/ionic_api1/students/list_of_students/list_of_students.php")

//$http.get("http://127.0.0.1/ionic_chat/list_user.php")
$interval(function(){
     $http(
        {
        url: "http://localhost/ionic_api/students/list_of_students/list_of_students2.php",
        //url: "http://202.29.228.250/ionic_api/login.php",
        method:'post',
            data: {
                  std_gro1:$scope.loggedin_std_gro1,
                  std_gro2:$scope.loggedin_std_gro2,
                  std_code: $scope.std_id
                 }
        }

      )
 .then(function (response) {
      $scope.model_object = response.data.records;

     // sessionStorage.setItem('loggedin_std_code', $scope.model_object.code);
      //$scope.loggedin_std_code=sessionStorage.getItem('loggedin_std_code');
    //  console.log('m='+ response.data.records);

    });
    console.log("Trying to refresh");
},1000);
/*
  // I think this is very bad practice...but this is brute force to refresh model.

  $interval(function(){
    $http.get("http://127.0.0.1/ionic_api1/students/list_of_students/list_of_students.php")
      .then(function (response) {
        $scope.model_object = response.data.records;
        //console.log('name='+$scope.model_object)
      });
    console.log("Trying to refresh");
  },1000);
*/
$scope.logout=function(){
        delete sessionStorage.loggedin_code;
        delete sessionStorage.loggedin_std_gro1;
        delete sessionStorage.loggedin_std_gro2;
        delete sessionStorage.loggedin_status;


      //  console.log('Logoutctrl',sessionStorage.getItem('loggedin_id'));
/*
        $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });
        */
        $state.go('login', {}, {location: "replace", reload: true});
    };
})
.controller('updateStudentCtrl', function($scope, $http, $ionicHistory) {

  $scope.updateStudent = function(){
    $http.post("http://http://localhost/ionic/CRUD/update_student2.php",
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

.controller('page8Ctrl', ['$scope','$rootScope','$state','$stateParams','$http','$ionicPopup','$ionicModal',
function ($scope,$rootScope,$state,$stateParams,$http,$ionicPopup,$ionicModal) {

  $rootScope.std_id=$stateParams.code_id;
  $scope.usr={};
  ///sessionStorage.setItem('loggedin_name', $scope.user_details.name);
  //console.log(sessionStorage.getItem('loggedin_name'));

  $scope.input =function(){
    $http(
      {
        url: "http://localhost/ionic_api/inputhome.php",
        method:'post',
            data: {

                  as2: $scope.usr.as2,
                  as3: $scope.usr.as3,
                  as4: $scope.usr.as4,
                  as5: $scope.usr.as5,
                  as6: $scope.usr.as6,
                  as7: $scope.usr.as7,
                  as8: $scope.usr.as8,
                  as9: $scope.usr.as9,
                  as10: $scope.usr.as10,
                  as11: $scope.usr.as11,
                  as12: $scope.usr.as12,
                  year: $scope.usr.year,
                  std_code: $scope.std_id

                 }
        }
      ).then(function(response){
       console.log(response.data.results);
        if(response.data.results=='succese_signup'){
         $state.go('page5');
       }else{
         $state.go('page6');
       }
      },function(error){
        console.log(error);
      });


}
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
.controller('page0Ctrl', function($scope,$stateParams, $http,$state, $interval,$ionicHistory) {
    $scope.std_id=$stateParams.code_id;
    $scope.loggedin_code=sessionStorage.getItem('loggedin_code');
    $scope.loggedin_std_code=sessionStorage.getItem('loggedin_std_code');
    $scope.loggedin_std_gro1= sessionStorage.getItem('loggedin_std_gro1');
    $scope.loggedin_std_gro2= sessionStorage.getItem('loggedin_std_gro2');

         console.log($scope.loggedin_std_gro1);

  //$http.get("http://127.0.0.1/ionic_api1/students/list_of_students/list_of_students.php")

//$http.get("http://127.0.0.1/ionic_chat/list_user.php")
$interval(function(){
     $http(
        {
        url: "http://localhost/ionic_api/showhome.php",
        //url: "http://202.29.228.250/ionic_api/login.php",
        method:'post',
            data: {
                  std_gro1:$scope.loggedin_std_gro1,
                  std_gro2:$scope.loggedin_std_gro2,
                  std_code:$scope.std_id
                 }
        }

      )
 .then(function (response) {
      $scope.model_object = response.data.records;

     // sessionStorage.setItem('loggedin_std_code', $scope.model_object.code);
      //$scope.loggedin_std_code=sessionStorage.getItem('loggedin_std_code');
    //  console.log('m='+ response.data.records);

    });
    console.log("Trying to refresh");
},1000);
/*
  // I think this is very bad practice...but this is brute force to refresh model.

  $interval(function(){
    $http.get("http://127.0.0.1/ionic_api1/students/list_of_students/list_of_students.php")
      .then(function (response) {
        $scope.model_object = response.data.records;
        //console.log('name='+$scope.model_object)
      });
    console.log("Trying to refresh");
  },1000);
*/

$scope.logout=function(){
        delete sessionStorage.loggedin_code;
        delete sessionStorage.loggedin_std_gro1;
        delete sessionStorage.loggedin_std_gro2;
        delete sessionStorage.loggedin_status;


      //  console.log('Logoutctrl',sessionStorage.getItem('loggedin_id'));
/*
        $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });
        */
        $state.go('login', {}, {location: "replace", reload: true});
    };
})
.controller('updateStudentCtrl', function($scope, $http, $ionicHistory) {

  $scope.updateStudent = function(){
    $http.post("http://localhost/ionic_api/showhome.php",
      {
        'teacher_code':$scope.teacher_code,
        'std_code':$scope.std_code,
        'year':$scope.year,
        'gro':$scope.gro,
        'as2':$scope.as2,
        'as3':$scope.as3,
        'as4':$scope.as4,
        'as5':$scope.as5,
        'as6':$scope.as6,
        'as7':$scope.as7,
        'as8':$scope.as8,
        'as9':$scope.as9,
        'as10':$scope.as10,
        'as11':$scope.as11,
        'as12':$scope.as12,
        'picture':$scope.picture,
        'std_code':$scope.std_code,
        'teacher_code':$scope.teacher_code,
        'title':$scope.title,

      })
      .success(function(data){
        console.log("Data updated successfully");
      });
    $ionicHistory.goBack();
  }
})

.controller('signupCtrl', ['$scope','$rootScope','$state','$stateParams','$http','$ionicPopup','$ionicModal',
function ($scope,$rootScope,$state,$stateParams,$http,$ionicPopup,$ionicModal) {
  $scope.usr={};
  ///sessionStorage.setItem('loggedin_name', $scope.user_details.name);
  //console.log(sessionStorage.getItem('loggedin_name'));
  $scope.Signup =function(){
    $http(
      {
        url: "http://localhost/ionic_api/signup.php",
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
//angular.module('app')
.controller('cameraCtrl', function($scope,$stateParams, $state, $http, $cordovaCamera,$ionicHistory){
$scope.std_id=$stateParams.code_id;
/*
  $scope.post = function(topic)
  {
    topic['picture'] =$scope.imgURI;
    $http.post(SERVER.url+'/newtopic.php', {topic})
    .success(function(response){
      if(response=='success'){
        $state.go('tab.listview');
      }else{
        alert(response);
      }
    });
  }
  */
//
//$scope.addStudent = function(){
$scope.post = function(topic){

topic['picture'] =$scope.imgURI;
$scope.topic={};
//console.log(topic);
  $http.post("http://localhost/ionic_pic/newtopic.php",
    {
      'data':topic,
            message: $scope.topic.message,
            name: $scope.topic.name,
            title: $scope.topic.title,
            std_id:$scope.std_id
    })
    .success(function(status){
          if(status.status=='success'){
          $state.go('page6');
        }
    });
  $ionicHistory.goBack();
}
//
  $scope.btnCamera = function(){
      console.log('btnCamera');
      var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
    correctOrientation:true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      //var image = document.getElementById('myImage');
      $scope.imgURI = "data:image/jpeg;base64," + imageData;
      //image.src = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      // error
    });
    };

    $scope.btnGallery = function(){
      console.log('btnGallery');
      $scope.btnCamera = function(){
        console.log('btnCamera');
        var options = {
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 500,
        targetHeight: 500,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
      correctOrientation:true
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
        //var image = document.getElementById('myImage');
        $scope.imgURI = "data:image/jpeg;base64," + imageData;
        //image.src = "data:image/jpeg;base64," + imageData;
      }, function(err) {
        // error
      });
    };
  }

})
