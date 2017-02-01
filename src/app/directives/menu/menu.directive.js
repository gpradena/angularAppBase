(function() {
    'use strict';

    angular.module('app.directive')
    .directive('menu', menuDirective);

    menuDirective.$inject = [ '$document', '$timeout' ];

    function menuDirective($document, $timeout) {
      var directive = {
          restrict: 'A',
          templateUrl: 'layout/menu/menu.tpl.html',
          link: link
      };
      return directive;
    }

    function link(scope, $element, attr) {

        _init();

        function _init(){
          var menu     = angular.element('.menulateral');
          var btnIn   = angular.element('.text');
          var btnAc   = angular.element('.text-active');

          //Toggle menu click
          angular.element('.btn-link').on('click', function () {
            $(menu).toggleClass('nav-off-screen');
          });

          // Minify menu on menu_minifier click
          angular.element('#collapse_menu').on('click', function () {
            $(menu).toggleClass('nav-xs');
            $(btnIn).toggleClass('text-active');
            $(btnAc).toggleClass('text-active');
          });

          _optionsMenu();
        }

        function _optionsMenu(){
          var filter = angular.element('.filter');
          var navLi = angular.element('.nav li');
          var navA = angular.element('.nav a');

          $(navLi).on('click', function(){
            $(navLi).removeClass('active');
            $(navA).removeClass('active');
            $(this).addClass('active');
            $(this).children().addClass('active');
          });

          $(filter).on('click', function(){
            if($(this).hasClass('op')){
              $(this).removeClass('op');
              $(this).addClass('cl');
            }else{
              $(this).removeClass('cl');
              $(this).addClass('op');
            }
          });

        }

  }
})();
