angular.module('kabaMangaApp.controllers', [])



.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $location, $ionicSideMenuDelegate, $ImageCacheFactory, MangaService, GenreFilterService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.hasManga = false;
  var filterList = [];

  $http.defaults.useXDomain = true;
  $http({
    method: 'GET',
    url: "https://www.mangaeden.com/api/list/0/"
  }).then(function success(res) {
    console.info("GOT MANGAS");
    var manga = res.data["manga"];
    $scope.hasManga = true;

    MangaService.setManga(manga);
    MangaService.sortByPopularity();
    // MangaService.sortMangaByDefault();
    cachePopularCoverImages();
    $scope.genres = MangaService.genreList.sort();
  });

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

           for(var i = 0; i < mangaCards.length; i++){
            for(var genre in filterList ){
               if (!mangaCards[i].innerText.includes(filterList[genre])) {
                 GenreFilterService.hideManga(mangaCards[i]);
                 mangaCards[i].style.display = 'none';
                 break;
               }
               else{
                mangaCards[i].style.display = 'block';
              }
            }
          }

         });
       }
  });


  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

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

  function cachePopularCoverImages() {
    var urlsForCachedImages = [];
    var popularMangas = MangaService.getPopularManga(50);
    var i = popularMangas.length;

    while(i--) {
      var location = popularMangas[i]["im"];
      if(location != null) {
        urlsForCachedImages.push("https://cdn.mangaeden.com/mangasimg/" + location);
      }
    }

    $ImageCacheFactory.Cache(urlsForCachedImages);
  }
})

.controller('HomeCtrl', function($scope) {
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
