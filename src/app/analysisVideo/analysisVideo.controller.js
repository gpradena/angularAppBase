(function() {
    'use strict';

    angular.module('app.analysisVideo').controller('analysisVideoController', analysisVideoController);


    function analysisVideoController(){


            _init();

             function _init() {
               $('.affix').width($('.affix').parent().width() - 22);
               $(window).resize(function () {
                 $('.affix').width($('.affix').parent().width() - 22);
               });
            }
      }

})();
