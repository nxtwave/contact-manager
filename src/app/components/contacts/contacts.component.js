(function() {
  'use strict';

  angular
    .module('components.contacts')
    .component('contacts', {
      templateUrl: './contacts.html',
      controller: ContactsController
    }).config(Config);

  Config.$inject = ['$stateProvider'];

  function Config($stateProvider) {
    $stateProvider
      .state({
        name: 'contacts',
        abstract: true,
        url: '/contacts',
        component: 'contacts'
      });
  }

  function ContactsController() {
    var $ctrl = this;
  }

})();

