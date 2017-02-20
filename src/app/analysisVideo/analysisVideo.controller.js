(function() {
    'use strict';

    angular.module('app')
    .controller('analysisVideoController', analysisVideoController);

    analysisVideoController.$inject = ['AnalysisVideoResource','$state','userSession'];

    function analysisVideoController(analysisVideoResource , $state, userSession){
        var _user = userSession.getUser();          
        var numPersona = 0;
        var vm = this;
        vm.user = _user;
        vm.analysisVideo = analysisVideo;
        vm.getAnnotation = getAnnotation;

        analysisVideo();        
        
        function anottationInspect(_videoName,_baseTime){
            var previousTime = -1;
            var currentTime = -1;
            var minimalInterVal = 0.2;
            var videoName = _videoName;
            var baseTime = _baseTime;  
            var delay = 1000;
            var auxTimer = 0;
            sleep();
            //loop infinito 
            function sleep() {
                setTimeout(function () { inspect(); }, delay);
            }

            function inspect() {     
                var cam = $("#cam1");
                currentTime = cam[0].currentTime;
                var proceeding = (currentTime - previousTime) > minimalInterVal ? true : false;
                    
                var currentInfo = {
                    VideoName: videoName,
                    BaseTime: baseTime,
                    CurrentTime: cam[0].currentTime,
                    IsConected: cam[0].isConnected,
                    Muted: cam[0].muted,
                    Paused: cam[0].paused,
                    Preload: cam[0].preloa,
                    Seeking: cam[0].seeking,
                    Proceeding: proceeding
                };
                
                if (proceeding && !cam[0].paused) {
                    getAnnotation(currentInfo);
                }
                previousTime = currentTime = cam[0].currentTime;
                sleep();
            }                        
        }

        function analysisVideo(videoName){
            analysisVideoResource.getVideo(videoName)
            .then(_sendVideo)
            .catch(_sendVideoError); 
        }

        function getAnnotation(json){
            analysisVideoResource.getAnnotation(json)
            .then(_drawResult)
            .catch(_sendAnnotationError); 
        }

        function _sendVideo(response){
            vm.videoSrc = response.data;
            anottationInspect(vm.videoSrc.VideoName,vm.videoSrc.BaseTime);
        }

        function _sendVideoError(){
        }

        function _sendAnnotationError(response){
            console.log(response);
        }

        function _sendAnnotation(response){
            vm.annotation = response;
            return response;
        }        

        function _drawResult(jsonResult){
            if(jsonResult.status == 200)
            {
                var container = document.getElementsByClassName("peopleInContainer")[0];
                var deserializeJson = JSON.parse(jsonResult.data);      
                console.log(jsonResult);
                console.log(deserializeJson);
                for (var i = 0; i < deserializeJson.length; i++)
                {

                    var element = deserializeJson[i];
                    console.log(element);
                    console.log(element);
                    var tagElement = _getTagResult(element.UrlImagen, element.Age, element.Smile, element.GenderValue, element.Date);
                    container.appendChild(tagElement);
                }
            }
        }
        
        function _getTagResult(srcImage, age, smile, gender, date) {
            numPersona += 1;
            console.log("flag6");
            //Creacion Imagen
            var imgContainerElement = document.createElement('div');
            imgContainerElement.className = 'col-xs-6';
            var imgElement = document.createElement('img');
            imgElement.className = 'img-responsive img-thumbnail';
            imgElement.src = srcImage;
            imgContainerElement.appendChild(imgElement);

            //Creacion Tituto
            var titleContainerElement = document.createElement('div');
            titleContainerElement.className = 'row peopleInTitle';
            var titleElement = document.createElement('span');
            titleElement.innerHTML = 'Persona ' + numPersona;
            titleContainerElement.appendChild(titleElement);

            //Creacion Edad
            var edadContainer = document.createElement('div');
            edadContainer.className = 'row';
            var edadLabel = document.createElement('label');
            edadLabel.innerHTML = 'Edad :';
            var edadSpan = document.createElement('span');
            edadSpan.innerHTML = age;
            edadContainer.appendChild(edadLabel);
            edadContainer.appendChild(edadSpan);

            //Creacion Sonrie
            var sonrieContainer = document.createElement('div');
            sonrieContainer.className = 'row';
            var sonrieLabel = document.createElement('label');
            sonrieLabel.innerHTML = 'Sonrie :';
            var sonrieSpan = document.createElement('span');
            sonrieSpan.innerHTML = smile;
            sonrieContainer.appendChild(sonrieLabel);
            sonrieContainer.appendChild(sonrieSpan);

            //Creacion Genero
            var generoContainer = document.createElement('div');
            generoContainer.className = 'row';
            var generoLabel = document.createElement('label');
            generoLabel.innerHTML = 'Genero :';
            var generoSpan = document.createElement('span');
            generoSpan.innerHTML = gender;
            generoContainer.appendChild(generoLabel);
            generoContainer.appendChild(generoSpan);

            //Creacion Date
            // var fechaContainer = document.createElement('div');
            // fechaContainer.className = 'row';
            // var fechaLabel = document.createElement('label');
            // fechaLabel.innerHTML = 'Fecha :';
            // var fechaSpan = document.createElement('span');
            // fechaSpan.innerHTML = date;
            // fechaContainer.appendChild(fechaLabel);
            // fechaContainer.appendChild(fechaSpan);

            //Creacion contenedor Descripciones
            var descContainerElement = document.createElement('div');
            descContainerElement.className = 'peopleInDesc';
            descContainerElement.appendChild(edadContainer);
            descContainerElement.appendChild(sonrieContainer);
            descContainerElement.appendChild(generoContainer);
            //descContainerElement.appendChild(fechaContainer);

            //Creacion contenedor informacion imagen
            var dataContainerElement = document.createElement('div');
            dataContainerElement.className = 'col-xs-6';
            dataContainerElement.appendChild(titleContainerElement);
            dataContainerElement.appendChild(descContainerElement);

            //Creacion contenedor principal
            var containerElement = document.createElement('div');
            containerElement.className = 'row peopleIn';
            containerElement.appendChild(imgContainerElement);
            containerElement.appendChild(dataContainerElement);

            return containerElement;
        }
    }

})();
