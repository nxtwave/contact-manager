(function() {
  'use strict';

  angular
    .module('components.contacts')
    .component('contacts.list', {
      templateUrl: './contacts-list-cards.html',
      controller: ContactsListController
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

  ContactsListController.$inject = ['Dataservice'];
  function ContactsListController(Dataservice) {
    var $ctrl = this;

    // the list of contacts:
    $ctrl.contacts = undefined;

    $ctrl.$onInit = function() {
      Dataservice.getContacts().then(function(contacts) {
        $ctrl.contacts = contacts.data;
      });
    };

  }

})();
