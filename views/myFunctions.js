function calculateDistance(lat1, lon1, lat2, lon2) {
  // Radius of the Earth in kilometers
  const earthRadius = 6371;

  // Convert latitude and longitude from degrees to radians
  const radLat1 = (Math.PI * lat1) / 180;
  const radLon1 = (Math.PI * lon1) / 180;
  const radLat2 = (Math.PI * lat2) / 180;
  const radLon2 = (Math.PI * lon2) / 180;

  // Haversine formula
  const deltaLat = radLat2 - radLat1;
  const deltaLon = radLon2 - radLon1;
  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(deltaLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance; // Distance in kilometers
}


// async function fetchWeatherAndAirQuality(latitude, longitude) {
  
//       const apiWeatherKey = '90c98836fd653fffdc75eec71574d690';
//       const apiWeatherUrl = 'https://api.openweathermap.org/data/2.5/onecall';
//       const exclude = 'hourly,daily';

//       const weatherResponse = await fetch(`${apiWeatherUrl}?lat=${latitude}&lon=${longitude}&exclude=${exclude}&units=metric&appid=${apiWeatherKey}`);
//       const weatherData = await weatherResponse.json();

//       const temperature = weatherData.current.temp;
//       const weatherCondition = weatherData.current.weather[0].main;

//       const APIKey = 'AIzaSyAW3HP12wogacoXgkcjuOhr51X1NGevdYs';
//       const APIUrl = 'https://airquality.googleapis.com/v1/currentConditions:lookup';

//       const requestData = {
//           universalAqi: true,
//           location: {
//               latitude: latitude,
//               longitude: longitude,
//           },
//           extraComputations: ["LOCAL_AQI"],
//           languageCode: "en"
//       };

//       const requestOptions = {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(requestData),
//       };

//       const aqhiResponse = await fetch(`${APIUrl}?key=${APIKey}`, requestOptions);
//       const aqhiData = await aqhiResponse.json();

//       const aqhi = aqhiData.indexes.find(index => index.code === 'can_ec');

//       return { temperature, weatherCondition, aqhi };
 
// }


async function getTemperatureFromAPI(latitude, longitude) {
  const apiWeatherKey = '90c98836fd653fffdc75eec71574d690';
  const apiWeatherUrl = 'https://api.openweathermap.org/data/2.5/onecall';
  const exclude = 'hourly,daily';

  const weatherResponse = await fetch(`${apiWeatherUrl}?lat=${latitude}&lon=${longitude}&exclude=${exclude}&units=metric&appid=${apiWeatherKey}`);
  const weatherData = await weatherResponse.json();

  return weatherData.current.temp;
}

async function getWeatherConditionFromAPI(latitude, longitude) {
  const apiWeatherKey = '90c98836fd653fffdc75eec71574d690';
  const apiWeatherUrl = 'https://api.openweathermap.org/data/2.5/onecall';
  const exclude = 'hourly,daily';

  const weatherResponse = await fetch(`${apiWeatherUrl}?lat=${latitude}&lon=${longitude}&exclude=${exclude}&units=metric&appid=${apiWeatherKey}`);
  const weatherData = await weatherResponse.json();

  return weatherData.current.weather[0].main;
}



async function getAQHICategoryFromAPI(latitude, longitude) {
  const APIKey = 'AIzaSyAW3HP12wogacoXgkcjuOhr51X1NGevdYs';
  const APIUrl = 'https://airquality.googleapis.com/v1/currentConditions:lookup';

  const requestData = {
      universalAqi: true,
      location: {
          latitude: latitude,
          longitude: longitude,
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

  const aqhiResponse = await fetch(`${APIUrl}?key=${APIKey}`, requestOptions);
  const aqhiData = await aqhiResponse.json();

  return aqhiData.category || {};
}

async function getAQIFromAPI(latitude, longitude) {
 
      const APIKey = 'AIzaSyAW3HP12wogacoXgkcjuOhr51X1NGevdYs'; // Replace with your API key
      const APIUrl = 'https://airquality.googleapis.com/v1/currentConditions:lookup';

      const requestData = {
          universalAqi: true,
          location: {
              latitude: latitude,
              longitude: longitude,
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

      const response = await fetch(`${APIUrl}?key=${APIKey}`, requestOptions);

      

      const data = await response.json();
      console.log('Received data:', data); 

      // Access the AQHI (CA) data
      const aqhiData = data.indexes.find(index => index.code === 'can_ec');

      
}


module.exports ={ calculateDistance,
  // fetchWeatherAndAirQuality,
  getTemperatureFromAPI,
  getWeatherConditionFromAPI,
  getAQIFromAPI,
  getAQHICategoryFromAPI,
  
 };