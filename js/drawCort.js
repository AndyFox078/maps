var DrawCort = function(map, corts){
	var self = this;
	this.corts = corts;
	this.map = map;
	this.currentItem;
	this.infowindow;

	this.init = function(){
		self.map.addListener('dblclick', function(e){
			var posCenter = e.latLng;
			var posCenterStr = e.latLng.toString();
			var color = "#B71C1C"
			console.log('dblClick on map: ', posCenterStr);
			var obj = {
		          strokeColor: color,
		          strokeOpacity: 0.8,
		          strokeWeight: 10,
		          fillColor: color,
		          fillOpacity: 0.5,
		          map: self.map,
		          posCenter: posCenter,
		          bounds: {
		          	north: posCenter.lat() + 0.00001865,
		            south: posCenter.lat() - 0.00001865,
		            east: posCenter.lng() + 0.000025,
		            west: posCenter.lng() - 0.000025
		          }
		    }
		    console.log(obj);
		    self.drawInfoWindow('add-form', posCenter);
		    self.corts.addCort(obj);
		});
	};

	this.getInfoWindow = function(type, content){
		var contentString = '<div class="content" id="' + type + '">'+
            content +
            '</div>';

            return contentString;

	}

	this.drawInfoWindow = function(type, latLng){
		typeof self.infowindow != 'undefined' ? self.infowindow.close() : false;
		if(type == 'add-form'){
			var content = '<h4 class="info-window-title">Add new cort</h4>' + 
  			'<div class="form-group">' +
  			'<select name="type" class="form-control type">' +
			'<option value="1">Type 1</option>' +
			'<option value="2">Type 2</option>' +
			'<option value="3">Type 3</option>' +
			'</select>' +
  			'</div>' + 
  			'<div class="form-group">' +
    		'<input type="text" name="name" class="form-control name" placeholder="name">' +
  			'</div>' + 
  			'<button class="btn btn-danger cancel">Cancel</button> ' + 
			'<button class="btn btn-primary submit">Submit</button>';

		}else if(type == 'cort-info'){
			var content = '<h4 class="info-window-title">Cort <span class="cort-name"></span></h4>'+
			'<div class="alert alert-success cort-info">' + 'Free' + '</div>';
		}

		 self.infowindow = new google.maps.InfoWindow({
          content: self.getInfoWindow(type, content),
          position: latLng
        });

		self.infowindow.open(self.map);

		if(type == 'add-form'){
			// add events listeners
			setTimeout(function(){
				var cont = document.getElementById('add-form');

				cont.getElementsByClassName('cancel')[0].addEventListener('click', function(){
					self.infowindow.close();
					self.corts.cancelLastAddingCort();
				});

				cont.getElementsByClassName('submit')[0].addEventListener('click', function(){
					var name = this.parentElement.getElementsByClassName('name')[0].value;
					console.log(name);
					if(name.length < 5){
						// warning, little letters in name form
					}
					// send data to server, check response id and inject id to rectange object; After that infowindow.close();
					self.corts.setPropsToLastCort({
						"id": "value from server",
						"name": name
					});
					self.infowindow.close(); // after send data; 
					self.drawCortList();
				});
			}, 100);	
		}else if(type == 'cort-info'){
			var cont = document.getElementById('cort-info');
			cont.getElementsByClassName('cort-name')[0].innerHTML = self.currentItem.name;
		}
	}

	this.drawCortList = function(){
		var html = '<ul class="list-group cort-list">';
		var cortList = self.corts.arr;
		for(var i in cortList){
			html += '<li class="list-group-item" data-item="' + i + '">' +
			cortList[i].name +
			'</li>';
		}
		html += '</ul>';

		document.getElementsByClassName('left-column')[0].getElementsByClassName('content')[0].innerHTML = html;
		var li = document.getElementsByClassName('left-column')[0].getElementsByClassName('content')[0].getElementsByTagName('li');
		console.log(li);
		for(var i in li){
			li[i].onclick = function(){
				var item = this.getAttribute('data-item');
				var latLng = self.corts.arr[item].posCenter;
				self.currentItem = self.corts.arr[item];
				self.drawInfoWindow('cort-info', latLng);
				console.log(latLng);
				self.map.setCenter(latLng);
				self.map.setZoom(16);
			}
			li[i].onmouseover = function(){
				this.className += ' active';
			}

			li[i].onmouseout = function(){
				this.className = new String(this.className).split(' active')[0];
			}
		}
	}

	this.init();
}