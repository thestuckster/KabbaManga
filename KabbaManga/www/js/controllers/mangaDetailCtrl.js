/**
 * Created by stephen on 6/26/2016.
 */
var app = angular.module('kabaMangaApp');

app.controller('mangaDetailCtrl', ["$scope", "$location", "$http", "MangaDetailService",
  function($scope, $location,  $http, MangaDetailService) {

    $scope.detailManga = angular.copy(MangaDetailService.getManga());
    $scope.detailTitle = $scope.detailManga["t"];

    $http.defaults.useXDomain = true;
    $http({
      method: 'GET',
      url: "https://www.mangaeden.com/api/manga/" + $scope.detailManga["i"]
    }).then(function success(res) {
      console.info("GOT DETAILS");
      $scope.detailManga = res.data;
    });


  }]);
