/**
 * Created by stephen on 7/24/2016.
 */

var app = angular.module('kabaMangaApp');

app.controller('alphabetListCtrl', ["$scope", "$location", "MangaService", "AlphabetMangaService",
  function($scope, $location, MangaService, AlphabetMangaService) {

  $scope.alphabetListManga = MangaService.getMangaAlphabetList();
  sortManga();


  $scope.goToList = function goToList(letter) {
    AlphabetMangaService.setAlphabetList(letter);
    $location.path("/app/alphabetMangaList");
  };

  function sortManga() {
    for(var letter in $scope.alphabetListManga) {
      sortByTitle(letter);
    }
  }

  function sortByTitle(currentLetterList) {
    currentLetterList = currentLetterList.sort(function (a, b) {
      return (a["t"] > b["t"]) ? 1 : ((a["t"] < b["t"]) ? -1 : 0);
    });
  }
  }]);
