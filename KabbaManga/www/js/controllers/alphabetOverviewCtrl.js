/** Created by stephen on 8/10/2016. */
var app = angular.module('kabaMangaApp');
app.controller('alphabetOverviewCtrl', ["$scope", "$location","MangaService", "AlphabetMangaService",
  function($scope, $location, MangaService, AlphabetMangaService ) {

  $scope.alphabet = [".", "#", "a", "b", "c", "d", "e", "f", "g", "h","i", "j", "k", "l", "m", "n", "o", "p", "q", "r",
    "s", "t","u", "v", "w", "x", "y", "z"];
  var _alphabet = MangaService.getMangaAlphabetList();

  $scope.viewTitlesForLetter = function viewTitlesForLetter(letter) {
    AlphabetMangaService.setAlphabetList(_alphabet[letter]);
    $location.path("/app/alphabetView/");
  }

}]);
