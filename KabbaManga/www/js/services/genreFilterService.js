app.service('GenreFilterService', function() {
  this.genreFilter = "";

  this.setGenre = function setGenre(genre){
    
    this.genreFilter = genre;
  };

  this.getGenre = function getGenre(){
  	return this.genreFilter;
  	
  }
});