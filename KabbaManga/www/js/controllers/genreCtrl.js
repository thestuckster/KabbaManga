var app = angular.module('kabaMangaApp');

app.controller('genreCtrl', ["$scope", "GenreFilterService", "MangaService", function($scope, GenreFilterService, MangaService){
  
  $scope.genreFilter = "";

  $scope.setGenre = function setGenre(genre){
    GenreFilterService.setGenre(genre);
  };
  

}]);
