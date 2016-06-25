var app = angular.module('kabaMangaApp');

app.controller('mangaListCtrl', ["$scope", "$http", "MangaService", function($scope, $http, MangaService) {

  $http.defaults.useXDomain = true;


  function grabManga() {
    $scope.manga = MangaService.getMangaListRange(0, 10);
    addGenreList($scope.manga);
  }


  function addGenreList(manga) {
    console.info("Adding Genres");
    for(var i = 0; i < manga.length; i++) {

      var currentManga = manga[i];
      var genres = "";
      angular.forEach(currentManga["c"], function(genre) {
        genres += genre + ", ";
      });


      //remove trailing commas from list.
      genres = genres.substring(0, genres.length -2);
      currentManga.genres = genres;
    }
  }

  grabManga();

}]);
