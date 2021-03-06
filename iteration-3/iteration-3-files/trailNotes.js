    // Used to add an infowindow to all the markers queried from the database.
    function bindInfoWindow(marker, map, infoWindow, html) {
      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
      });
    }
    /* Used to retrieve trail descriptions from user input and save them as well as
      the marker location in the database */
    function saveData() {
      var name = escape(document.getElementById("name").value);
      var description = escape(document.getElementById("description").value);
      var latlng = marker.getPosition();

      var url = "maps.php?name=" + name + "&description=" + description  + "&lat=" + latlng.lat() + "&lng=" + latlng.lng();

      downloadUrl(url, function(data, responseCode) {
        if (responseCode == 200 && data.length >= 1) {
          infowindow.close();
          window.alert("Location Added");
        }
      });
    }
    // fucntion when called performs an ajax request
    function downloadUrl1(url, callback) {
      var request = window.ActiveXObject ?
          new ActiveXObject('Microsoft.XMLHTTP') :
          new XMLHttpRequest;

      request.onreadystatechange = function() {
        if (request.readyState == 4) {
          request.onreadystatechange = doNothing;
          callback(request, request.status);
        }
      };

      request.open('GET', url, true);
      request.send(null);
    }

    function downloadUrl(url, callback) {
      var request = window.ActiveXObject ?
          new ActiveXObject('Microsoft.XMLHTTP') :
          new XMLHttpRequest;

      request.onreadystatechange = function() {
        if (request.readyState == 4) {
          request.onreadystatechange = doNothing;
          callback(request.responseText, request.status);
        }
      };

      request.open("GET", url, true);
      request.send(null);
    }

    function doNothing() {}
