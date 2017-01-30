(function() {
    'use strict';

    angular.module('app.directives')
    .directive('menu', menuDirective);

    menuDirective.$inject = [ '$document', '$timeout' ];

    function menuDirective($document, $timeout) {
      var directive = {
          restrict: 'A',
          templateUrl: 'directives/menu/menu.tpl.html'
      };
      return directive;

      function link(scope, $element, attr) {

        $timeout(function() {
          var querySelector = $element.querySelector.bind(document);

          var nav     = document.querySelector('.menulateral');
          var btnIn   = document.querySelector('.text');
          var btnAc   = document.querySelector('.text-active');
          var wrapper = document.querySelector('.wrapper');

          var menu = document.getElementById("js-menu");

          //Toggle menu click
          querySelector('.btn-link').onclick = function () {

            nav.classList.toggle('nav-off-screen');

          };

          // Minify menu on menu_minifier click
          querySelector('#collapse_menu').onclick = function () {
            nav.classList.toggle('nav-xs');
            btnIn.classList.toggle('text-active');
            btnAc.classList.toggle('text-active');
          };

        });
      }
    }
})();
