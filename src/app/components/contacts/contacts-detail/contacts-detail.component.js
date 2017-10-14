(function() {
  'use strict';

  angular
    .module('components.contacts')
    .component('contacts.detail', {
      templateUrl: './contacts-detail.html',
      controller: ContactsDetailController,
      bindings: {
        contact: '<',
        states: '<'
      }
    }).config(Config);

  Config.$inject = ['$stateProvider'];

  function Config($stateProvider) {
    $stateProvider
      .state({
        name: 'contacts.detail',
        url: '/contact/{contactId}',
        component: 'contacts.detail',
        resolve: {
          contact: ContactResolver,
          states: StatesResolver
        }
      });
  }

  ContactResolver.$inject = ['$transition$', 'ContactsService'];

  function ContactResolver($transition$, ContactsService) {
    return ContactsService.getContact($transition$.params().contactId);
  }

  StatesResolver.$inject = ['$transition$', 'ContactsService'];

  function StatesResolver($transition$, ContactsService) {
    return ContactsService.getStates();
  }

  ContactsDetailController.$inject = ['$state'];

  function ContactsDetailController($state) {
    var $ctrl = this;

    $ctrl.$onInit = function() {

    };

    $ctrl.cancel = function() {
      $state.go('contacts.list');
    }

  }

})();
