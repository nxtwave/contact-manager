(function() {
  'use strict';

  angular
    .module('components.home')
    .component('home', {
      templateUrl: './home.html',
      controller: HomeController
    }).config(Config);

  Config.$inject = ['$stateProvider'];

  function Config($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/reports-home',
        component: 'home'
      });
  }

  function HomeController() {
    var $ctrl = this;
  }

})();
