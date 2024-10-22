/**
 * Created by stephen on 6/26/2016.
 */
var app = angular.module('kabaMangaApp');

app.controller('mangaDetailCtrl', ["$scope", "$location", "$http", "MangaDetailService", "MangaChapterViewService",
  function($scope, $location,  $http, MangaDetailService, MangaChapterViewService) {

    $scope.detailManga = angular.copy(MangaDetailService.getManga());
    $scope.detailTitle = $scope.detailManga["t"];
    $scope.detailGenres = $scope.detailManga.genres;
    $scope.detailImage = 'https://cdn.mangaeden.com/mangasimg/' + $scope.detailManga['im'];
    $scope.detailCompleted = "Completed";
    $scope.detailOngoing = "Ongoing";

    $http.defaults.useXDomain = true;
    $http({
      method: 'GET',
      url: "https://www.mangaeden.com/api/manga/" + $scope.detailManga["i"]
    }).then(function success(res) {
      console.info("GOT DETAILS");
      $scope.detailManga = res.data;
      setDetails();
    });

    function setDetails() {
      $scope.detailAuthor = $scope.detailManga["author"];
      $scope.detailDescription = $scope.detailManga["description"];
      $scope.detailNumberOfChapers = $scope.detailManga["chapters"].length;
      $scope.detailChapters = $scope.detailManga["chapters"];
      $scope.detailStatus = $scope.detailManga["status"];

      $scope.detailStartDate = $scope.detailManga["created"];
      $scope.detailLastUpdate = $scope.detailManga["last_chapter_date"];
      $scope.detailStartDate = unixTimeToDate($scope.detailStartDate);
      $scope.detailLastUpdate = unixTimeToDate($scope.detailLastUpdate);
    }

    function unixTimeToDate(unixTime) {
      var time = moment.unix(unixTime);

      return moment(time).format("MM/DD/YYYY");
    }

    $scope.viewChapter = function viewChapter(chapter) {
      MangaChapterViewService.setChapter(chapter);
      $location.path("/app/chapter");
    };

  }]);
