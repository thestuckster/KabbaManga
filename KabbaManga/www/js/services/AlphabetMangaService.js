/**
 * Created by stephen on 7/24/2016.
 */

var app = angular.module('kabaMangaApp');

app.service("AlphabetMangaService", [function() {

  this.alphaList = [];

  /** Set the alphabet list. **/
  this.setAlphabetList = function(letter) {
    this.alphaList = letter;
  };

  /** Get the list of manga to display for the choosen letter **/
  this.getAlphabetList = function getAlphabetList() {
    return this.alphaList;
  };

  /** Reset the alphabet list to prevent data crossover. **/
  this.clearAlphabetList = function clearAlphabetList() {
    this.alphaList = [];
  }

}]);
