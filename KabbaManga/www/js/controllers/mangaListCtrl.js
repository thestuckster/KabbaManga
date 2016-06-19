var app = angular.module('kabaMangaApp');

app.controller('mangaListCtrl', ["$scope", "$http", function($scope, $http) {
  // allows CORS requests.
  $http.defaults.useXDomain = true;

  //setup scope objects.
  $scope.manga = [];

//get a list of manga
  $http({
    method: 'GET',
    url: "https://www.mangaeden.com/api/list/0/"
  }).then(function success(res) {

    var mangaList = res.data["manga"];
    for(var i = 0; i < 9; i++) {

      var currentManga = {};
      currentManga.title = mangaList[i]["t"];
      currentManga.image = mangaList[i]["im"]

      $scope.manga.push(currentManga);
    }
  });
}]);
