(function() {
    'use strict';

    angular.module('app')
    .controller('analysisPeopleController', analysisPeopleController);

    analysisPeopleController.$inject = ['$state'];

    function analysisPeopleController($state){
        var vm = this;

        vm.init = init;
        vm.panelInteraction = panelInteraction;

        init();

         function init() {
           $('.panel1').width($('.panel1Container').width() - 22);
           $(window).resize(function () {
             $('.panel1').width($('.panel1Container').width() - 22);
           });
        }

        function panelInteraction() {
          console.log('click');
        }

    }

})();
