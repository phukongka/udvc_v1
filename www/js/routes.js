angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



      .state('login', {
    url: '/page2',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('page5', {
    url: '/page5',
    templateUrl: 'templates/page5.html',
    controller: 'page5Ctrl'
  })

  .state('page66', {
    url: '/page6/:code_id',
    templateUrl: 'templates/page6.html',
    controller: 'page6Ctrl'
  })

  .state('page8', {
    url: '/page8/:code_id',
    templateUrl: 'templates/page8.html',
    controller: 'page8Ctrl'
  })

  .state('page9', {
    url: '/page9',
    templateUrl: 'templates/page9.html',
    controller: 'page9Ctrl'
  })

  .state('page', {
    url: '/page10',
    templateUrl: 'templates/page.html',
    controller: 'pageCtrl'
  })

  .state('page12', {
    url: '/page12',
    templateUrl: 'templates/page12.html',
    controller: 'page12Ctrl'
  })

  .state('signup', {
    url: '/page13',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('page0', {
    url: '/page0/:code_id',
    templateUrl: 'templates/page0.html',
    controller: 'page0Ctrl'
  })
  .state('page14', {
    url: '/page14/:code_id',
    templateUrl: 'templates/newtopic.html',
    controller: 'cameraCtrl'
  })

    .state('map', {
    url: '/map',
        templateUrl: 'templates/map.html',
        controller: 'MapCtrl'

  })

        .state('map2', {
    url: '/map2',
    templateUrl: 'templates/mapsExample.html',
    controller: 'mapsExampleCtrl'
  })


$urlRouterProvider.otherwise('/page2')



});
