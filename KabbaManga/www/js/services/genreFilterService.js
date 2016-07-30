app.service('GenreFilterService', function($location) {
  this.genreFilter = "";
  this.genreFilterList = [];
  this.hiddenMangaList = [];
  this.favoriteManga = [];


  this.setGenre = function setGenre(genre){
    this.genreFilter = genre;
  };

  this.getGenre = function getGenre(){
  	return this.genreFilter;
  	
  };

  this.addGenreToList = function addGenreToList(genre){
  	this.genreFilterList.push(genre);
  };

  this.getGenreFilterList = function getFilterGenreList(){
  	return this.genreFilterList;
  };

  this.removeGenreFilter = function removeFilterGenre(genre){
  	var index = this.hiddenMangaList.indexOf(genre);
  	this.genreFilterList.splice(index, 1);
  };

  this.hideManga = function hideManga(mangaCard){
  	this.hiddenMangaList.push(mangaCard);
  };

  this.getHiddenMangaListSize = function getHiddenMangaListSize(){
  	return this.hiddenMangaList.length;
  }

  this.getHiddenMangaList = function getHiddenMangaList(){
  	return this.hiddenMangaList;
  }

  this.clearHiddenMangaList = function clearHiddenMangaList(){
  	this.hiddenMangaList = [];
  };
});