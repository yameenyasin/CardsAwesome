require.config({
    baseUrl: 'app',
    urlArgs: 'v=1.0'
});

require(["config"], function () {
    // Kick off the application.
    require([
        'app',
        'scripts/services/RouteResolver',
        'scripts/services/config',
        'scripts/services/dataService',
        'scripts/controllers/HomeController',
        'scripts/directives/cardAwesome'
    ],
        function () {
            angular.bootstrap(document, ['CardsAwesome']);
        });
});
