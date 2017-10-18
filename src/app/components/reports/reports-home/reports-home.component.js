(function() {
  'use strict';

  angular
    .module('components.reports')
    .component('reports.home', {
      templateUrl: './reports-home.html',
      controller: ReportController
    }).config(Config);

  Config.$inject = ['$stateProvider'];
  function Config($stateProvider) {
    $stateProvider.state({
      name: 'reports.home',
      url: '/reports/home',
      component: 'reports.home'
    });
  }

  function ReportController() {
    var $ctrl = this;
  }

})();
