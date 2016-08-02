angular.module('kabaMangaApp.controllers', [])
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $location, $ionicSideMenuDelegate, $ImageCacheFactory, MangaService, GenreFilterService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // ######## $SCOPE ###########
  $scope.hasManga = false;
  $scope.showGenreFilter = function showGenreFilter(){
    var showFilter = false;
    if($location.path() == '/app/mangaList'){
      showFilter = true;
    }
    return showFilter;
  };

  $scope.addGenre = function addGenre(genre){
    if(this.test){
      GenreFilterService.addGenreToList(genre);
      return;

    }
    GenreFilterService.removeGenreFilter(genre);
  };

  $scope.$watch(function () {
      return $ionicSideMenuDelegate.isOpenRight();
    },
    function (isRightOpen) {
      if (!isRightOpen){
        angular.element(document).ready(function () {
          var mangaCards = document.getElementsByClassName("card");

          filterList = GenreFilterService.getGenreFilterList();
          if(filterList.length === 0 && GenreFilterService.getHiddenMangaListSize() > 0){
            var hiddenCards = GenreFilterService.getHiddenMangaList();
            for(var i = 0; i < hiddenCards.length; i++){
              hiddenCards[i].style.display = 'block';
            }
            return;
          }

          for(var j = 0; j < mangaCards.length; j++){
            for(var genre in filterList ){
              if (!mangaCards[j].innerText.includes(filterList[genre])) {
                GenreFilterService.hideManga(mangaCards[j]);
                mangaCards[j].style.display = 'none';
                break;
              }
              else{
                mangaCards[j].style.display = 'block';
              }
            }
          }

        });
      }

  // Form data for the login modal
  $scope.loginData = {};
  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  // ####### MANGA GETTING / SETTING/ SORTING ########

  var filterList = [];
  $http.defaults.useXDomain = true;
  $http({
    method: 'GET',
    url: "https://www.mangaeden.com/api/list/0/"
  }).then(function success(res) {
    var manga = res.data["manga"];
    $scope.hasManga = true;

    setAndSortManga(manga);
    cachePopularCoverImages(50);
  });

  function setAndSortManga(manga) {
    MangaService.setManga(manga);
    MangaService.sortByPopularity();
    MangaService.sortMangaByDefault();
    $scope.genres = MangaService.genreList.sort();
  }

  function cachePopularCoverImages(numberOfImages) {
    var urlsForCachedImages = [];
    var popularMangas = MangaService.getPopularManga(numberOfImages);
    var i = popularMangas.length;

    while(i--) {
      var location = popularMangas[i]["im"];
      if(location != null) {
        urlsForCachedImages.push("https://cdn.mangaeden.com/mangasimg/" + location);
      }
    }

    $ImageCacheFactory.Cache(urlsForCachedImages);
  }
  });



  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
})


.controller('HomeCtrl', function($scope) {
  //TODO: uneeded.
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})


.controller('PlaylistCtrl', function($scope, $stateParams) {
});
