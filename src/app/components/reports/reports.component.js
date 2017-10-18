(function() {
  'use strict';

  angular
    .module('components.reports')
    .component('reports', {
      templateUrl: './reports.html',
      controller: ReportsController
    }).config(Config);

  Config.$inject = ['$stateProvider'];
  function Config($stateProvider) {
    $stateProvider.state({
      name: 'reports',
      abstract: true,
      url: '/reports',
      component: 'reports'
    });
  }

  function ReportsController() {
    var $ctrl = this;
  }

})();
