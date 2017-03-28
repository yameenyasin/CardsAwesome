(function () {
    'use strict';
    define(['app'], function (app) {

        var injectParams = ['$scope','config','dataService'];

        var HomeController = function ($scope,config,dataService) {
            var vm = this,                
                templateUrl = 'app/views/home.html';

            vm.appTitle = (config.APP_TITLE);
            vm.Recepie = "";
            
            var promise = dataService.fetchAll();
            promise.then(function (res) {
                console.log(res);
                vm.Recepie = res;
            });

        };

        HomeController.$inject = injectParams;

        //Loaded normally since the script is loaded upfront 
        app.controller('HomeController', HomeController);

    });
}());
