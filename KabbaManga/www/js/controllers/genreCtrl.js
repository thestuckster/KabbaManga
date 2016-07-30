var app = angular.module('kabaMangaApp');

app.controller('genreCtrl', ["$scope", "GenreFilterService", "MangaService", function($scope, GenreFilterService, MangaService){
  
  $scope.genreFilter = "";
  $scope.favList = GenreFilterService.favoriteManga;

  $scope.setGenre = function setGenre(genre){
    GenreFilterService.setGenre(genre);
  };

  $scope.addToFavList = function addToFavList(manga){
    if($scope.favList.includes(manga)){
      var index = $scope.favList.indexOf(manga);
      $scope.favList.splice(index, 1);
    }else{
      $scope.favList.push(manga);
    }
  };

  $scope.inFavList = function inFavList(manga){
    if($scope.favList.includes(manga)){
      return true;
    }
    return false;
  }
  

}]);
