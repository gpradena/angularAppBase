(function() {
    'use strict';

    angular.module('app')
    .factory('AnalysisVideoResource', AnalysisVideoResource);

    AnalysisVideoResource.$inject = ['$http', 'constants'];

    function AnalysisVideoResource($http, constants) {
        var _urlVideo = constants.API_URL + 'videoanalytics/video';
        var _urlAnnotation = constants.API_URL + 'videoanalytics/annotation';

        var resource = {
            getVideo: getVideo,
            getAnnotation: getAnnotation
        };

        return resource;

        function getVideo(videoName) {
            var video = {
                videoName: videoName,
            };
            return $http.post(_urlVideo, video);
        }

        function getAnnotation(currentInfo) {
            return $http.post(_urlAnnotation, currentInfo);
        }
    }
})();
