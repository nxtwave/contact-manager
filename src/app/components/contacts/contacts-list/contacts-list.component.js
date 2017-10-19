(function() {
  'use strict';

  angular
    .module('components.contacts')
    .component('contacts.list', {
      templateUrl: './contacts-list.html',
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

  ContactsListController.$inject = ['$rootScope', 'Dataservice'];
  function ContactsListController($rootScope, Dataservice) {
    var $ctrl = this;

    // the list of contacts:
    $ctrl.contacts = undefined;

    $ctrl.searchTerm = undefined;

    $rootScope.$on('SEARCH_EVENT', function(event, data) {
      console.log('search', data.searchTerm);
      $ctrl.searchTerm = data.searchTerm
    });

    $ctrl.$onInit = function() {
      Dataservice.getContacts().then(function(contacts) {
        $ctrl.contacts = contacts.data;
      });
    };


  }

})();
