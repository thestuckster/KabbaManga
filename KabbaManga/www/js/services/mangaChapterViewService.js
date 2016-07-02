/**
 * Created by stephen on 7/1/2016.
 */

app.service("MangaChapterViewService", [function() {

  this.chapter = {};

  /** Set the manga to pass to the detail view. **/
  this.setChapter =  function setChapter(chapter) {
    this.chapter = chapter;
  };

  /** Return the manga to get details for. **/
  this.getChapter = function getChapter() {
    return this.chapter;
  };

  /** Reset the data to an empty value. Keeps from passing data we don't want. **/
  this.clearData = function clearData() {
    this.chapter = {};
  };

}]);
