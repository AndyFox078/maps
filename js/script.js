var App = function(){
  var self = this;
  this.map = {};
  this.corts = {};
  this.drawCort = {};

  this.init = function(){
    self.map = initMap();
    self.corts = new Corts(self.map, self);
    self.drawCort = new DrawCort(self.map, self.corts);
  };


  this.init();

}

var app;

window.onload = function(){

  app = new App();

}