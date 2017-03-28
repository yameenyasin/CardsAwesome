(function () {
    'use strict';
    define(['app'], function (app) {

        var injectParams = ['$rootScope'];

        var cardAwesome = function ($rootScope) {
            return {
                scope:{
                    data:"="
                },
                replace:true,
                templateUrl: '/app/scripts/directives/templates/card-awesome.html',
                link: function($scope, element, attrs){
                    var image_url = $scope.data.image_url;
                    
                    element.children().css({
                        'background': 'url(' + image_url +')',
                        'background-repeat':'no-repeat',
                        'background-size': '100% 100%'
                    });
                    
                    element.bind('mouseenter', function(e) {
                       element.children().children().eq(0).removeClass('hidden');
                    });
                    
                    element.bind('mouseleave', function(e) {
                       element.children().children().eq(0).addClass('hidden');
                    });
                }
              };
        };

        cardAwesome.$inject = injectParams;

        //Loaded normally since the script is loaded upfront 
        app.directive('cardAwesome', cardAwesome);

    });
}());