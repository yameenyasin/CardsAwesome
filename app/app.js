(function () {
    'use strict';
    define(['scripts/services/RouteResolver',
            'angular',
            'angular-route',

           ], function () {

        var app = angular.module('CardsAwesome', ['ngRoute','routeResolverServices']);

        app.config(['$routeProvider', 'routeResolverProvider', '$controllerProvider',
                    '$compileProvider', '$filterProvider', '$provide', '$httpProvider',
                    
        function ($routeProvider, routeResolverProvider, $controllerProvider,
                $compileProvider, $filterProvider, $provide, $httpProvider) {
            
                //$httpProvider.interceptors.push('httpInterceptor');

                //Change default views and controllers directory using the following:
                //routeResolverProvider.routeConfig.setBaseDirectories('/app/views', '/app/controllers');

                console.log("app configuration");
            
                app.register = {
                    controller: $controllerProvider.register,
                    directive: $compileProvider.directive,
                    filter: $filterProvider.register,
                    factory: $provide.factory,
                    service: $provide.service
                };
            
                //Define routes - controllers will be loaded dynamically
                var route = routeResolverProvider.route;

                $routeProvider
                    .when('/home', route.resolve('Home','','vm'))
                    .when('/home/:cardId', route.resolve('Home','','vm'))
                    .otherwise({
                        redirectTo: '/home'
                    });

    }]);

        return app;
    });
}());
