var map;
  var userlat;
  var userlng;
  var service;
  var infoWindows=[];
  
  function showSelectedParks() {
    const selectedValue = document.getElementById('numberOfParks').value;

    if (selectedValue === 'all') {
        displayAllParks();
    } else {
        displayLimitedParks(parseInt(selectedValue));
    }
}

function displayLimitedParks(num) {
    if (userlat && userlng) {
        // Sort parks by distance
        nationalParks.forEach(park => {
            park.distance = calculateDistance(userlat, userlng, park.lat, park.lng);
        });

        // Sort parks by distance
        nationalParks.sort((a, b) => a.distance - b.distance);

        // Get the top nearest parks based on the user selection
        const nearestParks = nationalParks.slice(0, num);

        // Clear existing markers
        clearMarkers();

        // Display markers for the selected number of nearest parks
        nearestParks.forEach(park => {
            addMarker(park);
        });
    } else {
        alert('Please select a location to display the nearest parks.');
    }
}

function displayAllParks() {
    if (userlat && userlng) {
        // Clear existing markers
        clearMarkers();

        // Display markers for all parks
        nationalParks.forEach(park => {
            addMarker(park);
        });
    } else {
        alert('Please select a location to display the nearest parks.');
    }
}

  
  function initialize() {
    var pyrmont = new google.maps.LatLng(45.630001, -73.519997);
    map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 7
    });
  
    var input = document.getElementById('searchTextField');
    let autocomplete = new google.maps.places.Autocomplete(input);
  
    autocomplete.bindTo('bounds', map);
  
    var searchMarker = null; 
  
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      let place = autocomplete.getPlace();
  
      if (place.geometry) {
        userlat = place.geometry.location.lat();
        userlng = place.geometry.location.lng();
        console.log('Latitude: ' + userlat);
        console.log('Longitude: ' + userlng);
  
        // Clear the previous search marker, if it exists
        if (searchMarker) {
          searchMarker.setMap(null);
        }
  
        // Create a marker for the searched location
        searchMarker = new google.maps.Marker({
          position: place.geometry.location,
          map: map,
          title: place.name
        });
        // Center the map on the searched location
        map.setCenter(place.geometry.location);
  
        // Calculate distances to national parks and sort by distance
        nationalParks.forEach(park => {
          park.distance = calculateDistance(userlat, userlng, park.lat, park.lng);
        });
  
        // Sort parks by distance
        nationalParks.sort((a, b) => a.distance - b.distance);
  
        // Get the top 3 nearest parks
        const nearestParks = nationalParks.slice(0, 3);
        for (let i = 0; i < 3; i++) {
          console.log(nearestParks[i].name);
        }

        
        // Clear existing markers
        clearMarkers();
  
        // Display markers for the nearest 3 parks
        nearestParks.forEach(park => {
          addMarker(park);
        });
      }
    });
  }
    
  // Define national parks data
  const nationalParks = [
    { name: 'Terra Nova National Park', lat: 48.566077, lng: -53.899241 },
    { name: 'Gros Morne National Park', lat: 49.782267, lng: -57.843721 },
    { name: 'Torngat Mountains National Park', lat: 58.507055, lng:  -62.976602 },
    { name: 'Cape Breton Highlands National Park', lat:46.807916 , lng:-60.760754  },
    { name: 'Sable Island National Park', lat:43.934892 , lng: -59.887499 },
    { name: 'Prince Edward Island National Park', lat: 46.446973, lng:-62.708018  },
    { name: 'Kouchibouguac National Park', lat:46.814232 , lng:-64.950533  },
    { name: 'La Mauricie National Park', lat:46.751607 , lng: -72.809344 },
    { name: 'Forillon National Park', lat:48.751169 , lng: -64.161095 },
    { name: 'Mingan Archipelago National Park Reserve', lat:50.208539 , lng: -63.730441 },
    { name: 'Saguenay St. Lawrence Marine Park', lat:48.319587 , lng:-69.412354  },
    { name: 'Bruce Peninsula National Park', lat:45.245004 , lng: -81.521102 },
    { name: 'Georgian Bay Islands National Park', lat:44.852632 , lng:-79.864518  },
    { name: 'Point Pelee National Park', lat:41.965577 , lng:-82.521152  },
    { name: 'Thousand Islands National Park', lat:44.343363 , lng:-76.050827  },
    { name: 'Fathom Five National Marine Park', lat: 45.298894, lng: -81.617029 },
    { name: 'Georgian Bay Islands National Park', lat:44.981681 , lng: -80.024045 },
    { name: 'Pukaskwa National Park', lat: 48.579255, lng: -86.256616 },
    { name: 'Riding Mountain National Park', lat:50.659412 , lng: -99.971552 },
    { name: 'Wapusk National Park', lat:58.662008 , lng:-93.190604  },
    { name: 'Grasslands National Park', lat:49.145241 , lng:-107.509272  },
    { name: 'Prince Albert National Park', lat:53.933048 , lng:-106.074361  },
    { name: 'Banff National Park', lat: 51.417289, lng: -116.223255 },
    { name: 'Elk Island National Park', lat:53.594539 , lng:-112.834881  },
    { name: 'Jasper National Park', lat:52.664193 , lng: -117.884085 },
    { name: 'Waterton Lakes National Park', lat:49.083333 , lng: -113.916667 },
    { name: 'Wood Buffalo National Park', lat:59.537000 , lng: -112.230270 },
    { name: 'West Coast Trail - Pacific Rim National Park Reserve', lat:48.570980 , lng:-124.616740  },
    { name: 'Kootenay National Park', lat:50.635776 , lng: -116.043318 },
    { name: 'Glacier National Park', lat:51.335289 , lng: -117.529760 },
    { name: 'Gulf Islands National Park Reserve', lat:48.773845 , lng: -123.171623 },
    { name: 'Mount Revelstoke National Park', lat:51.045837 , lng: -118.139934 },
    { name: 'Pacific Rim National Park Reserve', lat: 48.892061, lng: -125.377342 },
    { name: 'Yoho National Park', lat:51.499297 , lng: -116.484480 },
    { name: 'Gwaii Haanas National Park Reserve', lat: 52.766320, lng: -131.615940 },
    { name: 'Auyuittuq National Park', lat:67.017315 , lng: -64.680860 },
    { name: 'Quttinirpaaq National Park', lat:81.365418 , lng:-77.093143  },
    { name: 'Náátsįhch oh National Park Reserve', lat:62.920251 , lng: -129.689909 },
    { name: 'Nahanni National Park Reserve', lat:61.5971 , lng:-125.8522  },
    { name: 'Tuktut Nogait National Park', lat:69.136417 , lng: -122.883148 },
    { name: 'Wood Buffalo National Park', lat:59.537000 , lng:-112.230270  },
    { name: 'Aulavik National Park', lat:73.848275 , lng:-119.917249  },
    { name: 'Ivvavik National Park', lat: 69.182339, lng: -140.208209 },
    { name: 'Kluane National Park and Reserve', lat:61.023804 , lng: -138.508608 }
  
  ];
    var markers = [];
    function calculateBackgroundColor(aqi) {
  if (aqi <= 3) {
    return '<div style="color:black;background-color: rgb(109, 205, 114);">';
  } else if (aqi >3 && aqi <= 6) {
    return '<div style="color:black;background-color: rgb(230, 192, 121);">';
  } else if (aqi >6 && aqi <= 10) {
    return 'background-color: rgb(231, 119, 122);';
  } else {
    return 'background-color: rgb(85, 17, 17);';
  }
}
    function addMarker(park) {
      var marker = new google.maps.Marker({
        position: { lat: park.lat, lng: park.lng },
        map: map,
        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        title: park.name
      });
  
      markers.push(marker);

      function fetchAQHIData(park) {
  const apiKey = 'AIzaSyAW3HP12wogacoXgkcjuOhr51X1NGevdYs'; // Replace with your API key
  const apiUrl = 'https://airquality.googleapis.com/v1/currentConditions:lookup';
  const requestData = {
    universalAqi: true,
    location: {
      latitude: park.lat,
      longitude: park.lng
    },
    extraComputations: ["LOCAL_AQI"],
    languageCode: "en"
  };
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  };

  fetch(`${apiUrl}?key=${apiKey}`, requestOptions)
    .then(response => response.json())
    .then(data => {
      const aqhiData = data.indexes.find(index => index.code === 'can_ec');

      if (aqhiData) {
        
        const aqic = parseFloat(aqhiData.aqi);
        
        const backgroundColor = calculateBackgroundColor(aqic);
        console.log(backgroundColor);
        infoWindow.setContent(backgroundColor+contentString );
        const aqhiAqiDiv = document.getElementById('aqhiAqi');
        aqhiAqiDiv.innerHTML = `<strong>AQHI (CA) AQI:</strong> ${aqhiData.aqi}`;

        

        const aqhiCategoryDiv = document.getElementById('aqhiCategory');
        aqhiCategoryDiv.innerHTML = `<strong>Health Risk:</strong> ${aqhiData.category}`;
      } else {
        console.error('AQHI (CA) data not found in the response.');
      }
    })
    .catch(error => {
      console.error(error);
    });
}

  
     // Create a link to view park data on another page
const parkDataLink = document.createElement('a');
parkDataLink.href = `/ParkDetail?parkName=${encodeURIComponent(park.name)}&parkDistance=${park.distance.toFixed(2)}&parkLat=${park.lat}&parkLng=${park.lng}`;
parkDataLink.textContent = 'View Park Details';

  var contentString = 
   '<h3>' + park.name + '</h3>' +
   '<p>Distance: ' + park.distance.toFixed(2) + ' km</p>' +
   '<div id="aqhiAqi">AQHI (CA) AQI:</div>' +
   '<div id="aqhiCategory">AQHI (CA) Category:</div>';
  
  // Append the link to the info window content
  contentString += '<div>';
  contentString += parkDataLink.outerHTML; // Convert the link element to HTML
  contentString += '</div>';

    
      var infoWindow = new google.maps.InfoWindow({
        content: contentString
      });
    
      infoWindows.push(infoWindow);
    
     marker.addListener('click', function () {
  infoWindows.forEach(iw => iw.close());
  infoWindow.open(map, marker);
  fetchAQHIData(park,infoWindow);

});

    }
   
    function clearMarkers() {
      markers.forEach(marker => {
        marker.setMap(null);
      });
      markers = [];
    
      infoWindows.forEach(iw => {
        iw.close();
      });
      infoWindows = [];
    }
    
  
  google.maps.event.addDomListener(window, 'load', initialize);

 