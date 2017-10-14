(function() {
  'use strict';

  angular
    .module('components.about')
    .component('about', {
      templateUrl: './about.html',
      controller: AboutController
    }).config(Config);

  Config.$inject = ['$stateProvider'];

  function Config($stateProvider) {
    $stateProvider
      .state('about', {
        url: '/about',
        component: 'about'
      });
  }

  function AboutController() {
    var $ctrl = this;
  }

})();
