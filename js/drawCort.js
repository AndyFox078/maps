var DrawCort = function(map, corts){
	var self = this;
	this.corts = corts;
	this.map = map;

	this.init = function(){
		self.map.addListener('dblclick', function(e){
			var posCenter = e.latLng;
			var posCenterStr = e.latLng.toString();
			console.log('dblClick on map: ', posCenterStr);
			var obj = {
		          strokeColor: '#ff0000',
		          strokeOpacity: 0.8,
		          strokeWeight: 10,
		          fillColor: '#ff0000',
		          fillOpacity: 0.5,
		          map: self.map,
		          bounds: {
		          	north: posCenter.lat() + 0.000025,
		            south: posCenter.lat() - 0.000025,
		            east: posCenter.lng() + 0.000025,
		            west: posCenter.lng() - 0.000025
		          }
		    }
		    console.log(obj);
		    self.corts.addCort(obj);
		});
	};

	this.init();
}