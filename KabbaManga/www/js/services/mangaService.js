/**
 * Created by stephen on 6/25/2016.
 */

var app = angular.module('kabaMangaApp');

app.service("MangaService", [function() {

  this.manga = [];
  this.mangaAlphabet = {};
  this.genreList = [];
  

  /** sorts manga list alphabetically by title **/
  this.sortByTitle = function sortByTitle() {
    this.manga = this.manga.sort(function(a,b) {
      return (a["t"] > b["t"]) ? 1 : ((a["t"] < b["t"]) ? -1 : 0);
    });
  };


  /** sorts manga into a big ass json by starting letter and shit **/
  this.sortMangaIntoAlphabet = function sortMangeIntoAlphabet() {

    //StackOverflow says this is the fastest loop and since there's 16k manga, why the fuck not?
    var i = this.manga.length;
    while(i--) {

      var currentTitle = this.manga[i]["t"];
      var startingCharacter = currentTitle.charAt(0).toLowerCase();
      var currentMangaGenres = this.manga[i]["c"];


      if(this.mangaAlphabet.hasOwnProperty(startingCharacter)) {
        this.mangaAlphabet[startingCharacter].push(currentTitle);

      } else {
        this.mangaAlphabet[startingCharacter] = [];
        this.mangaAlphabet[startingCharacter].push(currentTitle);

      }

      for(var genre in currentMangaGenres){
        if(!this.genreList.includes(currentMangaGenres[genre])){
          this.genreList.push(currentMangaGenres[genre]);
        }
      }
      
    }
      
  };

  /** Returns a list of manga that start with a given letter **/ 
  this.getMangaByStartingLetter = function getMangaByStartingLetter(startingLetter) {
    return this.mangaAlphabet[startingLetter];
  };

  /** Sets manga list when manga is returned from API **/
  this.setManga = function setManga(manga) {
    this.manga = manga;
  };

  /** returns the entire manga list. **/
  this.getMangaList = function getMangaList() {
    return this.manga;
  };


  /** returns a range of index values from manga list **/
  this.getMangaListRange = function getMangaListRange(start, end) {

    var copy = [];
    for(var i = start; i < end; i++) {
      copy.push(this.manga[i]);
    }

    return copy;
  };


}]);
