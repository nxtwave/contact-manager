(function() {
  'use strict';

  angular
    .module('common.layout')
    .component('header', {
      templateUrl: './header.html',
      controller: HeaderController
    });

  function HeaderController() {
    var $ctrl = this;
  }

})();
