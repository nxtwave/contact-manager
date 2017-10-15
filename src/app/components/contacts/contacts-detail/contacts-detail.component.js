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

  ContactResolver.$inject = ['$transition$', 'Dataservice'];
  function ContactResolver($transition$, Dataservice) {
    return Dataservice.getContact($transition$.params().contactId).then(function(contact) {
      return contact.data;
    });
  }

  StatesResolver.$inject = ['$transition$', 'Dataservice'];
  function StatesResolver($transition$, Dataservice) {
    return Dataservice.getStates();
  }

  ContactsDetailController.$inject = ['$state', 'Dataservice'];
  function ContactsDetailController($state, Dataservice) {
    var $ctrl = this;

    /**
     * Component changes handler
     * @param changes the updated binding values
     */
    $ctrl.$onChanges = function(changes) {
      if (changes.contact && changes.contact.currentValue) {
        $ctrl.contact = Object.assign({}, changes.contact.currentValue);
      }

      if (changes.states && changes.states.currentValue) {
        $ctrl.states = Object.assign({}, changes.states.currentValue);
      }
    };

    /**
     * form submit handler, updates database through service
     */
    $ctrl.onSubmit = function() {
      Dataservice.updateContact($ctrl.contact._id, $ctrl.contact).then(function() {
          $state.go('contacts.list');
        }).catch(function(error) {
          console.log('error', error);
        });
    };

    /**
     * Cancel button handler
     */
    $ctrl.cancel = function() {
      $state.go('contacts.list');
    };

  }

})();
