(function() {
  'use strict';

  angular
    .module('common.layout')
    .component('header', {
      templateUrl: './header.html',
      controller: HeaderController
    });

  HeaderController.$inject = ['$rootScope'];

  function HeaderController($rootScope) {
    var $ctrl = this;

    $ctrl.searchTerm = undefined;

    $ctrl.onSearch = function(searchTerm) {
      $rootScope.$broadcast('SEARCH_EVENT', {searchTerm: searchTerm});
    };

  }

})();
