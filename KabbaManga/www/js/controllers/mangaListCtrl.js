var app = angular.module('kabaMangaApp');

app.controller('mangaListCtrl', ["$scope", "$http", function($scope, $http) {

  // allows CORS requests.
  $http.defaults.useXDomain = true;
  $scope.manga = [];

//get a list of manga
  $http({
    method: 'GET',
    url: "https://www.mangaeden.com/api/list/0/"
  }).then(function success(res) {

    for(var i = 0; i < 50; i++) {
      var mangaList = res.data["manga"][i];
      $scope.manga.push(mangaList["t"]);
    }
    console.log($scope.manga);
  });

}]);
