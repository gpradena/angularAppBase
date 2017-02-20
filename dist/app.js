(function() {
    'use strict';

    angular.module('app', [
      'ui.router',
      'base64',
      'app-tpl',
      'app.directive',
      'app.dashboard',
      'app.analysisVideo',
      'app.analysisPeople'
    ])
    .config(Config);

    Config.$inject = ['$urlRouterProvider','$stateProvider', '$locationProvider'];

    function Config($urlRouterProvider, $stateProvider, $locationProvider) {
      $urlRouterProvider.otherwise('/');

      $stateProvider
      .state('login', {
          url: '/',
          views: {
              'app-view': {
                  templateUrl: 'login/login.tpl.html',
                  controller: 'LoginController as vm'
              }
          }
      })
      .state('app', {
          views: {
              'app-view': {
                  templateUrl: 'layout/main/main.tpl.html'
              },
              'header@app': {
                  templateUrl: 'layout/header/header.tpl.html',
                  controller: 'HeaderController as vm'
              }
              /*'menu@app': {
                  templateUrl: 'layout/menu/menu.tpl.html'
              },
              'filter@app': {
                  templateUrl: 'layout/filter/filter.tpl.html'
              }*/
          }
      })
      .state('logout', {
            url: '/logout',
            views: {
                'app-view': { controller: 'LogoutController' }
            }
        });

    }

})();

(function() {
    'use strict';

    angular.module('app.analysisPeople', [])
    .config(Config);

    Config.$inject = ['$stateProvider'];

    function Config($stateProvider) {
        $stateProvider.state('app.analysisPeople', {
            url: '/analysisPeople',
            views: {
                'content@app': {
                    templateUrl: 'analysisPeople/analysisPeople.tpl.html',
                    controller: 'analysisPeopleController as vm'
                }
            }
        });
    }
})();

(function() {
    'use strict';

    angular.module('app.analysisVideo', [])
    .config(Config);

    Config.$inject = ['$stateProvider'];

    function Config($stateProvider) {
        $stateProvider.state('app.analysisVideo', {
            url: '/analysisVideo',
            views: {
                'content@app': {
                    templateUrl: 'analysisVideo/analysisVideo.tpl.html',
                    controller: 'analysisVideoController as vm'
                }
            }
        });
    }
})();

(function() {
    'use strict';

    angular.module('app.directive', []);
})();

(function() {
    'use strict';

    angular.module('app.dashboard', [])
    .config(Config);

    Config.$inject = ['$stateProvider'];

    function Config($stateProvider) {
        $stateProvider.state('app.dashboard', {
            url: '/dashboard',
            views: {
                'content@app': {
                    templateUrl: 'dashboard/dashboard.tpl.html',
                    controller: 'dashboardController as vm'
                }
            }
        });
    }
})();

(function() {
    'use strict';

    angular.module('app')
    .controller('analysisPeopleController', analysisPeopleController);

    analysisPeopleController.$inject = ['$state'];

    function analysisPeopleController($state){


    }

})();

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


(function() {
    'use strict';

    angular
    .module('app')
    .factory('constants', Constants);

    Constants.$inject = ['$location'];

    function Constants($location) {
        var baseURL = 'http://localhost:8081/api/';
        //var baseURL = $location.$$absUrl.split('#')[0] + 'api/';
        //var baseURL = 'http://192.168.0.3:49886/api/';
        //var baseURL = 'http://localhost:49886/api/';
        //var baseURL = 'http://192.168.0.100:8080/api/';
        var factory = {
            API_URL: baseURL
        };

        return factory;
    }
})();

(function() {
    'use strict';

    angular.module('app.dashboard').controller('dashboardController', dashboardController);


    function dashboardController(){


            _init();

             function _init() {

            }
      }

})();

(function(){
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = [ 'LoginResource', '$state', 'userSession'];

  function LoginController(loginResource, $state, userSession) {
        var _ADMIN = 1;
        var vm = this;
        
        vm.form = {};
        vm.error = {};
        vm.user = {};
        vm.login = login;
        vm.isNotPossibleTryToLogin = isNotPossibleTryToLogin;

        function login() {
            loginResource.validate(vm.user.username, vm.user.password)
            .then(_validUserCredentials)
            .catch(_invalidUserCredentials);            
        }

        function _validUserCredentials(response) {
            var user = response.data;
            var credential = {
                username: vm.user.username,
                password: vm.user.password,
                userTypeId: user.TipoUsuario
            };
            userSession.save(credential);
            if(_isAdmin(user)) {
                $state.go('app.analysisVideo');
                //$state.go('administration.users');                
            } else {
                $state.go('analyst.user.assignments');
            }
        }

        function _isAdmin(user) {
            return user.IdTipoUsuario === _ADMIN;
        }

        function _invalidUserCredentials(response) {
            vm.error = response.data;
            vm.form.password.$error = { invalidLogin: true };
        }

        function isNotPossibleTryToLogin() {
            return !_isPossibleTryToLogin();
        }

        function _isPossibleTryToLogin() {
            return vm.form.$valid && vm.form.$dirty;
        }
    }
})();

(function() {
    'use strict';

    angular.module('app')
    .controller('LogoutController', LogoutController);

    LogoutController.$inject = [ '$state', 'userSession'];

    function LogoutController($state, userSession) {
        userSession.clean();
        $state.go('app.login');
    }

})();

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

(function() {
    'use strict';

    angular.module('app')
    .factory('FilterResource', FilterResource);

    FilterResource.$inject = ['$http', 'constants'];

    function FilterResource($http, constants) {
        //var _url = constants.API_URL + 'login';
        var url = window.location.href;
        console.log(url);
        var resource = {
            validate: validate
        };

        return resource;

        function updateSearch(location,camara,dateFrom,dateUntil) {
            var search = {
                Location: location,
                Camara: camara,
                DateFrom: dateFrom,
                DateUntil: dateUntil
            };
            //return $http.post(_url, credential);
        }
    }
})();

(function() {
    'use strict';

    angular.module('app')
    .factory('LoginResource', LoginResource);

    LoginResource.$inject = ['$http', 'constants'];

    function LoginResource($http, constants) {
        var _url = constants.API_URL + 'login';

        var resource = {
            validate: validate
        };

        return resource;

        function validate(username, password) {
            var credential = {
                username: username,
                password: password
            };
            return $http.post(_url, credential);
        }
    }
})();

(function() {
    'use strict';

    angular.module('app')
    .factory('UserResource', UserResource);

    UserResource.$inject = ['$http', 'constants'];

    function UserResource($http, constants) {
        var _url = constants.API_URL + 'users';
        var resource = {
            findOne: findOne,
            find: find,
            create: create,
            update: update,
            remove: remove,
            findAnalysts: findAnalysts,
            resetPassword: resetPassword
        };
        return resource;

        function findOne(username) {
            return $http.get(_url+'/'+username);
        }

        function find(filter) {
            return $http.get(_url, { params: filter });
        }

        function create(user) {
            return $http.post(_url, user);
        }

        function update(user) {
            return $http.put(_url+'/'+user.Username, user);
        }

        function remove(username) {
            return $http.delete(_url+'/'+username);
        }

        function findAnalysts(query) {
            var url = constants.API_URL + 'analysts';
            var params = { query: query };

            return $http.get(url, { params: params });
        }

        function resetPassword(email) {
            var url = constants.API_URL + 'reset-password';
            var data = { Email: email };

            return $http.post(url, data);
        }
    }
})();

(function() {
    'use strict';

    angular.module('app')
    .factory('interceptor', Interceptor)
    .config(['$httpProvider', function($httpProvider) {
		$httpProvider.interceptors.push('interceptor');
	}]);

    Interceptor.$inject = ['$injector', '$q', 'userSession'];

    function Interceptor($injector, $q, userSession) {
        var interceptor = {
            request: request,
            responseError: responseError
        };
        return interceptor;

        function request(config) {
            var credentials = userSession.getCredentials();

            if(credentials)
                config.headers.Authorization = 'Basic ' + credentials;
            return config;
        }

        function responseError(rejection) {
            var $state = $injector.get('$state');

            if(rejection.status === 401 && $state.current.name !== 'login')
                $state.go('logout');
            
            return $q.reject(rejection);
        }
    }
})();

(function() {
    'use strict';

    angular.module('app')
    .factory('userSession', UserSession);

    UserSession.$inject = ['$base64'];

    function UserSession($base64) {
    //function UserSession() {
        var _token = 'TOKEN';
        var _userData = 'USER-DATA';
        var service = {
            save: save,
            clean: clean,
            getUser: getUser,
            getCredentials: getCredentials
        };
        return service;

        function save(user) {
            var credentials;

            if(angular.isDefined(user.password)) {
                credentials = $base64.encode(user.username + ':' + user.password);
                window.localStorage.setItem(_token, credentials);
            }

            delete user.password;
            window.localStorage.setItem(_userData, JSON.stringify(user));
        }

        function clean() {
            window.localStorage.clear();
        }

        function getUser() {
            return JSON.parse(window.localStorage.getItem(_userData));
        }

        function getCredentials() {
            return window.localStorage.getItem(_token);
        }
    }    
})();

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

(function() {
    'use strict';

    angular.module('app.directive')
    .directive('panel', panelDirective);

    panelDirective.$inject = [ '$document', '$timeout' ];

    function panelDirective($document, $timeout) {
      var directive = {
          restrict: 'A',
          link: link
      };
      return directive;
    }

    function link(scope, $element, attr) {


      _layout();

      function _layout(){

        angular.element('.peopleIn').on('click', function() {
          if($(this).hasClass('active')){
            $(this).removeClass('active');
            $('.panel1Container').removeClass('col-md-6');
            $('.panel1Container').addClass('col-md-9');
            $('.panel3Container').hide(400);
          }else{
            $('.peopleIn').removeClass('active');
            $('.videoIn').removeClass('active');
            $(this).addClass('active');
            $('.panel1Container').removeClass('col-md-9');
            $('.panel1Container').addClass('col-md-6');
            $('.panel3Container').show(400);
          }
        });

        angular.element('.videoIn').on('click', function() {
          if($(this).hasClass('active')){
            $(this).removeClass('active');
          }else{
            $('.videoIn').removeClass('active');
            $(this).addClass('active');
          }
        });

      }



  }
})();

(function(){
  'use strict';

  angular
    .module('app')
    .controller('FilterController', FilterController);

  FilterController.$inject = ['FilterResource','$state', 'userSession'];

  function FilterController(filterResource, $state, userSession) {
        // var vm = this;
        // var url = window.location.href;

        // vm.filters = {};
        // vm.filter = filter;

        // function filter() {
        // console.log("url");
        // console.log(url);
        //     filterResource.updateSearch(vm.filters.location, vm.filters.camara, vm.filters.fechaDesde, vm.filters.fechaHasta)
        //     .then()
        //     .catch();            
        // }
    }
})();

(function(){
  'use strict';

  angular
    .module('app')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$state', 'userSession'];

  function HeaderController($state, userSession) {        
        var vm = this;
        vm.user = userSession.getUser();
        console.log(vm.user);
        // vm.logout = logout;

        // function logout(){
        //     $state.go("logout");
        // }
    }
})();
