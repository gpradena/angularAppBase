(function() {
    'use strict';

    angular.module('app.directive')
    .directive('menuLateralDirective', menuLateralDirective);

    menuLateralDirective.$inject = [ '$document', '$timeout' ];

    function menuLateralDirective($document, $timeout) {
      console.log('weaweawea');
      var directive = {
          restrict: 'A',
          link: link
      };
      return directive;
    }

    function link(scope, $element, attr) {

      $timeout(function() {
          var tid = setInterval( function () {
            if ( document.readyState !== 'complete' ) return;
            clearInterval( tid );



            var querySelector = document.querySelector.bind(document);

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

          }, 100 );
    });
  }
})();
