(function() {
    'use strict';

    angular.module('app')
    .controller('analysisPeopleController', analysisPeopleController);

    analysisPeopleController.$inject = ['$state'];

    function analysisPeopleController($state){

        vm.init = init;
        vm.panelInteraction = panelInteraction;



    }

})();
