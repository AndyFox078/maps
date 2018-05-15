var Corts = function(map, app){
  var self = this;
  this.map = map;
  this.curId = 0;
  this.app = app;

  this.arr = [];

  this.addCort = function(params){
    var rectangle = new google.maps.Rectangle(params);

    rectangle.addListener('click', function(e) {
        console.log(this);
        self.app.drawCort.currentItem = this;
        self.app.drawCort.drawInfoWindow('cort-info', this.posCenter);
    });

    self.arr.push(rectangle);

    return rectangle;
  }

  this.cancelLastAddingCort = function(){
    self.arr[self.arr.length - 1].setMap(null);
    delete self.arr[self.arr.length - 1];
  }

  this.setPropsToLastCort = function(props){
    for(var i in props){
      self.arr[self.arr.length - 1][i] = props[i];
    }
  }

}