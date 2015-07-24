var app = angular.module('ixitLanding', [
  'flow',
  'ixitLanding.config'
  ]);


app.config([
  '$httpProvider',
  'flowFactoryProvider',
  'api_config',
  function($httpProvider, flowFactoryProvider, api_config) {

  $httpProvider.interceptors.push(['$q', 'api_config', '$rootScope', function ($q, api_config, $rootScope) {
      return {
          'request': function (config) {
            $rootScope.$broadcast('app:is-requesting', true);
             if (config.url.indexOf('/api/') > -1 ) {
                config.url = api_config.CONSUMER_API_URL + '' + config.url;
                return config || $q.when(config);
              } else {
               return config || $q.when(config);
              }
          },
          'response': function (resp) {
              $rootScope.$broadcast('app-is-requesting', false);
              // appBootStrap.isRequesting = false;
               return resp || $q.when(resp);
          },
          // optional method
         'responseError': function(response) {
            // do something on error
            if (response.status === 403 || response.status === 401) {
              $rootScope.$broadcast('auth:auth-login-required');
            }
            $rootScope.$broadcast('app:is-requesting', false);
            return $q.reject(response);
          },
          // optional method
         'requestError': function(response) {
            // do something on error
            $rootScope.$broadcast('app:is-requesting', false);
            return $q.reject(response);
          }

      };
  }]);


  $httpProvider.defaults.useXDomain = true;


}]);
app.controller('appCtrl', ['$scope', function ($scope) {
// console.log('message');
}]);

app.directive('overlayHeight', [function () {
  return {
    link: function (scope, ele) {
      var h = $(window).height();
      $(ele).height(h);
    }
  };
}]);