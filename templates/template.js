angular.module('templateStore.templates',['ngRoute'])

    .config(['$routeProvider', function($routeProvider){
        $routeProvider.
        when('/templates', {
            templateUrl: 'templates/templates.html',
            controller: 'TemplatesCtrl'
        }).
        when('/templates/:templateId', {
            templateUrl: 'templates/template-details.html',
            controller: 'TemplateDetailsCtrl'
        })
    }])

    .controller('TemplatesCtrl', ['$scope', '$http', function($scope, $http){
        $http.get('json/templates.json').success(function(data){
            $scope.template = data;
        });
    }])

    .controller('TemplateDetailsCtrl', ['$scope', '$routeParams', '$http', '$filter', function($scope, $routeParams, $http, $filter){
        var templateId = $routeParams.templateId;
        $http.get('json/templates.json').success(function(data){
            $scope.template = $filter('filter')(data, function(d){
                return d.category.Name == templateId;
            });
            $scope.mainImage1 = $scope.template.img.obj0;
            $scope.mainImage2 = $scope.template.img.obj1;
            $scope.mainImage3 = $scope.template.img.obj2;
            $scope.mainImage4 = $scope.template.img.obj3;
            $scope.mainImage5 = $scope.template.img.obj4;
            $scope.mainImage6 = $scope.template.img.obj5;
            $scope.mainImage7 = $scope.template.img.obj6;
            $scope.mainImage8 = $scope.template.img.obj7;
            $scope.mainImage9 = $scope.template.img.obj8;
            $scope.mainImage10 = $scope.template.img.obj9;
            $scope.mainImage11 = $scope.template.img.obj10;
            $scope.mainImage12 = $scope.template.img.obj11;
            $scope.mainImage13 = $scope.template.img.obj12;
            $scope.mainImage14 = $scope.template.img.obj13;
            $scope.mainImage15 = $scope.template.img.obj14;



        });

        $scope.setImage = function(image){
            $scope.mainImage1 = image.obj0;
            $scope.mainImage2 = image.obj1;
            $scope.mainImage3 = image.obj2;
            $scope.mainImage4 = image.obj3;
            $scope.mainImage5 = image.obj4;
            $scope.mainImage6 = image.obj5;
            $scope.mainImage7 = image.obj6;
            $scope.mainImage8 = image.obj7;
            $scope.mainImage9 = image.obj8;
            $scope.mainImage10 = image.obj9;
            $scope.mainImage11 = image.obj10;
            $scope.mainImage12 = image.obj11;
            $scope.mainImage13 = image.obj12;
            $scope.mainImage14 = image.obj13;
            $scope.mainImage15 = image.obj14;

        }

    }]);