var app = angular.module('kabaMangaApp');

app.controller('mangaListCtrl', ["$scope", "$timeout","$location", "$http", "MangaService", "MangaDetailService", "GenreFilterService",
                function($scope, $timeout, $location,  $http, MangaService, MangaDetailService, GenreFilterService) {

  $http.defaults.useXDomain = true;
  $scope.genreFilter = GenreFilterService.getGenre();

  $scope.goToDetailView = function goToDetailView(mangaToDetail) {
    MangaDetailService.setManga(mangaToDetail);
    $location.path("/app/detail");
  };

  function grabManga() {
    MangaService.sortByTitle();
    $scope.manga = MangaService.getPopularManga(50);

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
