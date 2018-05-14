function initMap() {
        var myLatlng = {lat: -25.363, lng: 131.044};

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: myLatlng
        });

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Click to zoom'
        });

        map.addListener('center_changed', function() {
          // 3 seconds after the center of the map has changed, pan back to the
          // marker.
          // window.setTimeout(function() {
          //   map.panTo(marker.getPosition());
          // }, 3000);
        });

        // image = './images/logo.png';
        // var beachMarker = new google.maps.Marker({
        //   position: {lat: -33.890, lng: 151.274},
        //   map: map,
        //   icon: image
        // });
        //////

        return map;
      }


var corts;
document.onload = function(){
  var map = initMap();

  corts = new Corts(map);

  for(var i=0;i<100;i++){
    var b = {
            north: -getRandomArbitrary(i*10, i*20),
            south: -getRandomArbitrary(i*10, i*20),
            east: getRandomArbitrary(i*10, i*20),
            west: getRandomArbitrary(i*10, i*20)
          }
      corts.addCort(b);
  }
}

var Corts = function(map){
  var self = this;
  this.map = map;
  this.curId = 0;

  this.arr = [];

  this.addCort = function(bounds){
    var rectangle = new google.maps.Rectangle({
          id: self.curId++,
          strokeColor: '#000000',
          strokeOpacity: 0.8,
          strokeWeight: 10,
          fillColor: '#ffffff',
          fillOpacity: 0.7,
          map: self.map,
          bounds: bounds
    });

    rectangle.addListener('click', function(e) {
          alert(this.id);
        });

    self.arr.push(rectangle);
  }


}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}