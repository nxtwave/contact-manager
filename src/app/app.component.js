(function() {
  'use strict';

  angular
    .module('app')
    .component('app', {
      templateUrl: './app.html'
    }).config(Config);

  Config.$inject = ['$stateProvider'];

  function Config($stateProvider) {
    $stateProvider
      .state('app', {
        redirectTo: 'home',
        url: '',
        component: 'app'
      });
  }


})();
