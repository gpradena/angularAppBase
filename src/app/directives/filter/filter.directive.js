(function() {
    'use strict';

    angular.module('app.directive')
    .directive('filter', filterDirective);

    filterDirective.$inject = [ '$document', '$timeout' ];

    function filterDirective($document, $timeout) {
      var directive = {
          restrict: 'A',
          templateUrl: 'layout/filter/filter.tpl.html',
          link: link
      };
      return directive;
    }

    function link(scope, $element, attr) {



  }
})();
