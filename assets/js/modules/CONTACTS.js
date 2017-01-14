export default {
  init() {
    this.initMap();
  },

  initMap() {
    $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyC1mu5p7L3KMHnWQXTk4LTWR3BSiaQtdW8&callback=initMap").done(function () {
      const mapId = $('#map');
      const dataLat = parseFloat(mapId.attr('data-center-lat'));
      const dataLng = parseFloat(mapId.attr('data-center-lng'));
      const zoom = parseInt(mapId.attr('data-zoom'));
      const pin = mapId.attr('data-marker');
      const center = {lat: dataLat, lng: dataLng};

      var map = new google.maps.Map(document.getElementById("map"), {
        zoom: zoom,
        center: center,
        scrollwheel: false,
        draggable: true,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.TOP_RIGHT
        },
        panControl: false,
        mapTypeControl: false,
        streetViewControl: false
      });

      var marker = new google.maps.Marker({
        position: center,
        map: map,
        icon: pin,
        title: "my place"
      });
    });
  }
}