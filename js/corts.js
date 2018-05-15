var Corts = function(map){
  var self = this;
  this.map = map;
  this.curId = 0;

  this.arr = [];

  this.addCort = function(params){
    var rectangle = new google.maps.Rectangle(params);

    rectangle.addListener('click', function(e) {
        console.log(this);
    });

    self.arr.push(rectangle);
  }

}