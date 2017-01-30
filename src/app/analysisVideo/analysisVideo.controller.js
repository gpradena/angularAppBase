(function() {
    'use strict';

    angular.module('app')
    .controller('analysisVideoController', analysisVideoController);

    analysisVideoController.$inject = ['$state'];

    function analysisVideoController($state){
        var vm = this;

        vm.panelInteraction = panelInteraction;

        _resizePanel();

         function _resizePanel() {
           $('.panel1').width($('.panel1Container').width() - 22);
           $(window).resize(function () {
             $('.panel1').width($('.panel1Container').width() - 22);
           });
        }

        function panelInteraction(e) {

          if($(e).hasClass('active')){
            $(e).removeClass('active');
            $('.panel1Container').removeClass('col-md-6');
            $('.panel1Container').addClass('col-md-9');
            $('.panel3Container').hide();
            _resizePanel();
          }else{
            $(e).addClass('active');
            $('.panel1Container').removeClass('col-md-9');
            $('.panel1Container').addClass('col-md-6');
            $('.panel3Container').show();
            _resizePanel();
          }

        }

    }

})();
