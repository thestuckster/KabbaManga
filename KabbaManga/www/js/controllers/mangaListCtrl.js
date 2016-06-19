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

    var dataList = res.data["manga"];
    for(var i = 0; i < 9; i++) {

      var genreList = dataList[i]["c"];
      var currentManga = {};
      currentManga.genres = "";

      buildManga(currentManga, dataList, genreList, i);

      $scope.manga.push(currentManga);
    }
  });

  function buildManga(currentManga, dataList, genreList, i) {
    buildTitleAndCover(currentManga, dataList, i);
    buildGenreList(currentManga, genreList);
  }

  function buildTitleAndCover(currentManga, dataList, i) {
    currentManga.title = dataList[i]["t"];
    currentManga.image = dataList[i]["im"];
  }

  function buildGenreList(currentManga, genreList) {
    angular.forEach(genreList, function(genre) {
      currentManga.genres += genre+", ";
    });
    //remove trailing comma.
    currentManga.genres = currentManga.genres.substring(0, currentManga.genres.length -2);
  }


}]);
