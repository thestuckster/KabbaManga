/**
 * Created by stephen on 6/25/2016.
 */

var app = angular.module('kabaMangaApp');

app.service("MangaService", [function() {

  this.manga = [];

  /** sorts manga list alphabetically by title **/
  this.sortByTitle = function sortByTitle() {
    this.manga = this.manga.sort(function(a,b) {
      return (a["t"] > b["t"]) ? 1 : ((a["t"] < b["t"]) ? -1 : 0);
    });
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
