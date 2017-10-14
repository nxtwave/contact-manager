(function() {
  'use strict';

  angular
    .module('components.contacts')
    .component('contacts.list', {
      templateUrl: './contacts-list.html',
      controller: ContactsListController,
      bindings: {
        contacts: '<'
      }
    }).config(Config);

  Config.$inject = ['$stateProvider'];

  function Config($stateProvider) {
    $stateProvider
      .state({
        name: 'contacts.list',
        url: '/',
        component: 'contacts.list'
      });
  }

  ContactsListController.$inject = ['ContactsService'];

  function ContactsListController(ContactsService) {
    var $ctrl = this;

    $ctrl.$onInit = function() {
      ContactsService.getContacts().then(function(contacts) {
        $ctrl.contacts = contacts;
      });
    };

  }


})();
