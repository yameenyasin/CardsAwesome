(function () {
    'use strict';
    define(['app'], function (app) {

        var injectParams = ['$http'];

        var dataService = function ($http) {

            var baseUrl = "app/mock-data/",
                mockData, factory = {};

            /* Makes the call to API 
             * @params:
             * return
             */
            factory.fetchAll = function () {
                var api = baseUrl + 'recepies.json';
                return $http({
                        url: api,
                        method: "GET"

                    })
                    .then(function (response) {
                        mockData = response.data;
                        return mockData;
                    });
            };

            return factory;


        };

        dataService.$inject = injectParams;
        app.factory('dataService', dataService);
    });
}());
