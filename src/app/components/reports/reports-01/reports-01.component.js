(function() {
  'use strict';

  angular
    .module('components.reports')
    .component('reports.01', {
      templateUrl: './reports-01.html',
      controller: ReportController
    }).config(Config);

  Config.$inject = ['$stateProvider'];
  function Config($stateProvider) {
    $stateProvider.state({
      name: 'reports.01',
      url: '/reports/01',
      component: 'reports.01'
    });
  }

  function ReportController() {
    var $ctrl = this;
  }

})();
