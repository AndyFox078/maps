function initMap() {
    var myLatlng = {lat: 50.257290000348995, lng: 28.661773711863475};

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: myLatlng
    });

    return map;
}