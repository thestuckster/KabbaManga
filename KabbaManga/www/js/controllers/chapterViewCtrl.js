/**
 * Created by stephen on 7/1/2016.
 */

var app = angular.module('kabaMangaApp');

app.controller('chapterViewCtrl', ["$scope", "$location", "$http", "MangaChapterViewService",
  function($scope, $location,  $http, MangaChapterViewService) {


    $scope.viewManga = MangaChapterViewService.getChapter();
    $scope.chapterPages = [];

    $http.defaults.useXDomain = true;
    $http({
      method: 'GET',
      url: "https://www.mangaeden.com/api/chapter/" + $scope.viewManga[3]
    }).then(function success(res) {

      $scope.chapterPages = res.data["images"];
      $scope.chapterPages = $scope.chapterPages.reverse();
    });

    $scope.options = {
      loop: false,
      effect: 'flip',
      speed: 20
    };

    $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
      // data.slider is the instance of Swiper
      $scope.slider = data.slider;
    });

    $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
      console.log('Slide change is beginning');
    });

    $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
      // note: the indexes are 0-based
      $scope.activeIndex = data.activeIndex;
      $scope.previousIndex = data.previousIndex;
    });

  }]);
