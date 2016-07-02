/**
 * Created by stephen on 6/26/2016.
 */
var app = angular.module('kabaMangaApp');

app.service("MangaDetailService", [function() {

  this.manga = {};

  /** Set the manga to pass to the detail view. **/
  this.setManga =  function setManga(manga) {
    this.manga = manga;
  };

  /** Return the manga to get details for. **/
  this.getManga = function getManga() {
    return this.manga;
  };

  /** Reset the data to an empty value. Keeps from passing data we don't want. **/
  this.clearData = function clearData() {
    this.manga = {};
  };

}]);
