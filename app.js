
//const fetch = require('node-fetch');
// Instead of require, utilize dynamic import
import('node-fetch').then(({ default: fetch }) => {
  // Your code that uses fetch
}).catch(err => {
  console.error('Failed to import node-fetch:', err);
});
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'views')));

app.use(session({
   resave: false,
   saveUninitialized: true,
   secret: 'SECRET' 
 }));

 const nationalParks = [
  { id:1,name: 'Terra Nova National Park', lat: 48.566077, lng: -53.899241, link: 'https://www.google.ca/maps/@48.5660767,-53.8992407,3a,75y,47.15h,92.84t/data=!3m7!1e1!3m5!1sYEt-oMgOVpddEDNPIDBk8g!2e0!6s%2F%2Fgeo2.ggpht.com%2Fcbk%3Fpanoid%3DYEt-oMgOVpddEDNPIDBk8g%26output%3Dthumbnail%26cb_client%3Dmaps_sv.tactile.gps%26thumb%3D2%26w%3D203%26h%3D100%26yaw%3D85.21347%26pitch%3D0%26thumbfov%3D100!7i13312!8i6656?shorturl=1' },
  { id:2,name: 'Gros Morne National Park', lat: 49.782267, lng: -57.843721, link: 'https://www.google.com/maps/place/Gros+Morne+National+Park/@49.782255,-57.843679,3a,75y,204.68h,90t/data=!3m5!1e1!3m3!1soghnIIQP0B4o4eCuHjNDWw!2e0!3e5!4m2!3m1!1s0x4b7945201ccf6bef:0x65756a633d913976' },
  { id:3,name: 'Torngat Mountains National Park', lat: 58.507055, lng: -62.976602, link: 'https://www.google.com/maps/@58.507055,-62.976602,3a,75y,137.02h,82.98t/data=!3m5!1e1!3m3!1sHXPmj1OWtIt2uDSSQPrwnQ!2e0!3e5' },
  { id:4,name: 'Cape Breton Highlands National Park', lat: 46.807916, lng: -60.760754, link: 'https://www.google.com/maps/place/Cape+Breton+Highlands+National+Park/@46.807921,-60.760782,3a,75y,191h,90t/data=!3m5!1e1!3m3!1s9xUMYfVR8ER6RL0dLJqZJA!2e0!3e5!4m2!3m1!1s0x4b6703aed8386e5f:0x553f94c3cb08c2d3' },
  { id:5,name: 'Sable Island National Park', lat: 43.934892, lng: -59.887499, link: 'https://www.google.com/maps/@43.9348915,-59.8874989,3a,75y,110.48h,78.75t/data=!3m6!1e1!3m4!1s20EnNPIeNuUhuwKr-sieKA!2e0!7i13312!8i6656' },
  {id:6, name: 'Prince Edward Island National Park', lat: 46.446973, lng: -62.708018, link: 'https://www.google.com/maps/@46.4469732,-62.7080176,3a,75y,326.1h,82.9t/data=!3m6!1e1!3m4!1sNpJHXKEdtPi92pDyG8jdVA!2e0!7i13312!8i6656!6m1!1e1' },
  { id:7,name: 'Kouchibouguac National Park', lat: 46.814232, lng: -64.950533, link: 'https://www.google.com/maps/place/Kouchibouguac+National+Park/@46.814261,-64.95054,3a,75y,260h,90t/data=!3m5!1e1!3m3!1shc-3RxeDhTzGdpMmH2_sMg!2e0!3e5!4m2!3m1!1s0x4ca1b70aa5ecfc09:0xeab90566e8c7347d' },
  { id:8,name: 'La Mauricie National Park', lat: 46.751607, lng: -72.809344, link: 'https://www.google.com/maps/place/La+Mauricie+National+Park/@46.75164,-72.809474,3a,75y,209h,90t/data=!3m5!1e1!3m3!1sJVtK3SD9a_Xah_P0vE5E1Q!2e0!3e5!4m2!3m1!1s0x4cc6601508e27c69:0x1beff94da23f47a9' },
  { id:9,name: 'Forillon National Park', lat: 48.751169, lng: -64.161095, link: 'https://www.google.com/maps/@48.7511685,-64.1610954,3a,75y,209.99h,87.72t/data=!3m6!1e1!3m4!1s_XG6FLiWpzZ2NDZBUYuakg!2e0!7i13312!8i6656' },
  { id:10,name: 'Mingan Archipelago National Park Reserve', lat: 50.208539, lng: -63.730441, link: 'https://www.google.com/maps/@50.2085342,-63.7303317,3a,75y,25.53h,89.53t/data=!3m6!1e1!3m4!1sVXP2NI7IHRc4wVzHV_XVHg!2e0!7i13312!8i6656' },
  { id:11,name: 'Saguenay St. Lawrence Marine Park', lat: 48.319587, lng: -69.412354, link: 'https://www.google.com/maps/@48.3195865,-69.412354,3a,75y,165.47h,73.57t/data=!3m7!1e1!3m5!1sKtcQO2bt0QNZkVG109CXRg!2e0!6s%2F%2Fgeo1.ggpht.com%2Fcbk%3Fpanoid%3DKtcQO2bt0QNZkVG109CXRg%26output%3Dthumbnail%26cb_client%3Dmaps_sv.tactile.gps%26thumb%3D2%26w%3D203%26h%3D100%26yaw%3D159.05243%26pitch%3D0!7i13312!8i6656' },
  { id:12,name: 'Bruce Peninsula National Park', lat: 45.245004, lng: -81.521102, link: 'https://www.google.com/maps/place/Bruce+Peninsula+National+Park/@45.245033,-81.5211,3a,75y,115h,90t/data=!3m5!1e1!3m3!1sH0ywnVJEbq6I1rc9oj9Myw!2e0!3e5!4m2!3m1!1s0x4d2d04f37e5af157:0x1c4af969a2bda9b6' },
  { id:13,name: 'Georgian Bay Islands National Park', lat: 44.852632, lng: -79.864518, link: 'https://www.google.com/maps/place/Beausoleil+Island,+Georgian+Bay,+ON,+Canada/@44.852629,-79.864486,3a,75y,357h,90t/data=!3m5!1e1!3m3!1sRTkALagOl-WH_NP-9HESQA!2e0!3e5!4m2!3m1!1s0x4d2ae712e45d5495:0xb90e46e1dd919bd8' },
  { id:14,name: 'Point Pelee National Park', lat: 41.965577, lng: -82.521152, link: 'https://www.google.com/maps/place/Lake+Pond,+Point+Pelee+National+Park,+Leamington,+ON+N0P,+Canada/@41.965595,-82.521077,3a,75y,128h,90t/data=!3m5!1e1!3m3!1sC7yPA6R7fnUMOBfPTMcU6Q!2e0!3e5!4m2!3m1!1s0x883a95a41799478b:0x1991010693c68684' },
  { id:15,name: 'Thousand Islands National Park', lat: 44.343363, lng: -76.050827, link: 'https://www.google.com/maps/place/Thousand+Islands+National+Park/@44.341701,-76.050051,3a,75y,339.39h,90t/data=!3m5!1e1!3m3!1s7z1ML9JMH-49wO1kN1G_Kw!2e0!3e5!4m2!3m1!1s0x4ccd43c1009181db:0x637a9bca8552e4a1' },
  { id:16,name: 'Fathom Five National Marine Park', lat: 45.298894, lng: -81.617029, link: 'https://www.google.com/maps/@45.298894,-81.6170289,3a,75y,93.6h,76.82t/data=!3m6!1e1!3m4!1sS0OpilC1qenBXQchnS668w!2e0!7i13312!8i6656' },
  { id:17,name: 'Georgian Bay Islands National Park', lat: 44.981681, lng: -80.024045, link: 'https://www.google.com/maps/@44.9816518,-80.0240392,3a,75y,46.37h,90.84t/data=!3m6!1e1!3m4!1sZXSkq-wRBGpHzYDEwRwNNA!2e0!7i13312!8i6656' },
  { id:18,name: 'Pukaskwa National Park', lat: 48.579255, lng: -86.256616, link: 'https://www.google.com/maps/@48.5792552,-86.2566164,3a,75y,90t/data=!3m6!1e1!3m4!1syNJZHsN05lZ3jt5ulp5BEw!2e0!7i13312!8i6656' },
  { id:19,name: 'Riding Mountain National Park', lat: 50.659412, lng: -99.971552, link: 'https://www.google.com/maps/place/Riding+Mountain+National+Park+of+Canada/@50.659107,-99.971465,3a,75y,22.44h,90t/data=!3m5!1e1!3m3!1sFdG_aE6qKASyYrm3b7oWAA!2e0!3e5!4m2!3m1!1s0x52e67a8803769739:0x3b8d86523e27db93' },
  { id:20,name: 'Wapusk National Park', lat: 58.662008, lng: -93.190604, link: 'https://www.google.com/maps/place/Wapusk+National+Park/@58.775521,-93.6581635,3a,75y,276.27h,87.72t/data=!3m5!1e1!3m3!1skLA0RugdRRfPkr6jKxVFWg!7i13312!8i6656' },
  { id:21,name: 'Grasslands National Park', lat: 49.145241, lng: -107.509272, link: 'https://www.google.com/maps/place/Grasslands+National+Park+of+Canada/@49.145231,-107.509476,3a,75y,180h,90t/data=!3m5!1e1!3m3!1sslireW-jJkGRrrfeXJq5jg!2e0!3e5!4m2!3m1!1s0x53164ad886aeca51:0x2189afbee4652b5e' },
  { id:22,name: 'Prince Albert National Park', lat: 53.933048, lng: -106.074361, link: 'https://www.google.com/maps/place/Prince+Albert+National+Park/@53.932958,-106.074421,3a,75y,111h,90t/data=!3m5!1e1!3m3!1s_H4m9ppqLWxmlRnjqYZhCA!2e0!3e5!4m2!3m1!1s0x5300ec6fd814dadf:0x23327f71c06029d6' },
  { id:23,name: 'Banff National Park', lat: 51.417289, lng: -116.223255, link: 'https://www.google.com/maps/@51.2005185,-115.537143,3a,75y,10h,95.7t/data=!3m6!1e1!3m4!1s863juTY8RtmwFsRgoT9YqQ!2e0!7i13312!8i6656' },
  { id:24,name: 'Elk Island National Park', lat: 53.594539, lng: -112.834881, link: 'https://www.google.com/maps/place/Elk+Island+National+Park/@53.594444,-112.834847,3a,75y,72h,90t/data=!3m5!1e1!3m3!1slaijAs7Ov30Tu7BfiGRh9Q!2e0!3e5!4m2!3m1!1s0x53a0687323433ebf:0x23f0ebaeca812a6d' },
  { id:25,name: 'Jasper National Park', lat: 52.664193, lng: -117.884085, link: 'https://www.google.com/maps/place/Athabasca+Falls/@52.664565,-117.884038,3a,75y,92.75h,72.06t/data=!3m5!1e1!3m3!1sxqjLGkJlg0GG100WYMJs8A!2e0!3e5!4m2!3m1!1s0x5382cd9199a9831f:0x92bd3ba3cc08040e' },
  { id:26,name: 'Waterton Lakes National Park', lat: 49.083333, lng: -113.916667, link: 'https://www.google.com/maps/place/Waterton+Lakes+National+Park/@49.098868,-113.951786,3a,75y,325h,90t/data=!3m5!1e1!3m3!1sAlkwwU36IsTR-WjbdN2sHg!2e0!3e5!4m2!3m1!1s0x536f43118b9149bf:0xdf601e775403581c' },
  { id:27,name: 'Wood Buffalo National Park', lat: 59.537000, lng: -112.230270, link: 'https://www.google.com/maps/@59.537,-112.230271,3a,75y,299.5h,86.34t/data=!3m5!1e1!3m3!1sSoj422WuiGs-ntZM7kLxeQ!2e0!3e5' },
  { id:28,name: 'West Coast Trail - Pacific Rim National Park Reserve', lat: 48.570980, lng: -124.616740, link: 'https://www.google.ca/maps/@48.57098,-124.6167397,3a,77.2y,136.71h,93.54t/data=!3m6!1e1!3m4!1ssaKpn-k3qcJKBkwTzHoNEQ!2e0!7i13312!8i6656' },
  { id:29,name: 'Kootenay National Park', lat: 50.635776, lng: -116.043318, link: 'https://www.google.com/maps/place/Kootenay+National+Park/@50.635759,-116.043297,3a,75y,43h,90t/data=!3m5!1e1!3m3!1sAZABjWUuehbwLqFr4D4DNA!2e0!3e5!4m2!3m1!1s0x537a0626e97efffd:0x4e9a48210c259e69' },
  { id:30,name: 'Glacier National Park', lat: 51.335289, lng: -117.529760, link: 'https://www.google.com/maps/place/Glacier+National+Park/@51.24722,-117.62306,3a,75y,221h,90t/data=!3m5!1e1!3m3!1s16Ru2FW8naGCRstGdOk1Mg!2e0!3e5!4m2!3m1!1s0x53790828aa7efe7f:0x5ded72d0c6f3733b' },
  { id:31,name: 'Gulf Islands National Park Reserve', lat: 48.773845, lng: -123.171623, link: 'https://www.google.com/maps/place/Gulf+Islands+National+Park+Reserve/@48.77383,-123.171598,3a,75y,239h,90t/data=!3m5!1e1!3m3!1scskNcVbUlUIOPBKm3N6pgQ!2e0!3e5!4m2!3m1!1s0x548f60549d1de333:0x4390e2519cd01186' },
  { id:32,name: 'Mount Revelstoke National Park', lat: 51.045837, lng: -118.139934, link: 'https://www.google.com/maps/place/Mt+Revelstoke,+Columbia-Shuswap+B,+BC+V0E,+Canada/@51.045832,-118.139896,3a,75y,203.6h,90t/data=!3m5!1e1!3m3!1sGb8rLfpUTb2IJjgTqXVLQg!2e0!3e5!4m2!3m1!1s0x5379398e1342270b:0xa2a45ca0d05bc161' },
  { id:33,name: 'Pacific Rim National Park Reserve', lat: 48.892061, lng: -125.377342, link: 'https://www.google.com/maps/place/Broken+Group,+Pacific+Rim+National+Park+Reserve,+British+Columbia,+Canada/@48.89205,-125.377313,3a,75y,28h,90t/data=!3m5!1e1!3m3!1ssnQ0CPtyj7VQwiC7pbgIYQ!2e0!3e5!4m2!3m1!1s0x548913cba413b3fd:0xe4c6c8dd18e4e972' },
  { id:34,name: 'Yoho National Park', lat: 51.499297, lng: -116.484480, link: 'https://www.google.com/maps/place/Yoho+National+Park/@51.499276,-116.484449,3a,75y,39h,90t/data=!3m5!1e1!3m3!1sXGkOt1Ejn-ZVeinLRigaiw!2e0!3e5!4m2!3m1!1s0x5379de3b21491053:0xf29ce9dbd88f6f75' },
  { id:35,name: 'Gwaii Haanas National Park Reserve', lat: 52.766320, lng: -131.615940, link: 'https://www.google.com/maps/@52.7663198,-131.6159404,3a,75y,90t/data=!3m6!1e1!3m4!1sYCdVGw_IFQ5oQ7bnyTU0ZA!2e0!7i13312!8i6656' },
  { id:36,name: 'Auyuittuq National Park', lat: 67.017315, lng: -64.680860, link: 'https://www.google.com/maps/@67.017315,-64.68086,3a,75y,5.21h,84.62t/data=!3m5!1e1!3m3!1sv2Xo2Rhqa-kFtlCnZxUzbg!2e0!3e5' },
  { id:37,name: 'Quttinirpaaq National Park', lat: 81.365418, lng: -77.093143, link: 'https://goo.gl/maps/zHWygDjNovS2' },
  { id:38,name: 'Náátsįhch oh National Park Reserve', lat: 62.920251, lng: -129.689909, link: 'https://www.google.ca/maps/@62.9202514,-129.6899091,3a,90y,200.12h,93.53t/data=!3m6!1e1!3m4!1sidtTNqzaj0JEumjK_aDsyw!2e0!7i13312!8i6656' },
  { id:39,name: 'Nahanni National Park Reserve', lat: 61.5971, lng: -125.8522, link: 'https://www.google.ca/maps/@62.107982,-127.6616076,3a,65.4y,145.69h,102.41t/data=!3m7!1e1!3m5!1socNfuV50W1kfMjnDmbmSdQ!2e0!6s%2F%2Fgeo1.ggpht.com%2Fcbk%3Fpanoid%3DocNfuV50W1kfMjnDmbmSdQ%26output%3Dthumbnail%26cb_client%3Dmaps_sv.tactile.gps%26thumb%3D2%26w%3D203%26h%3D100%26yaw%3D143.76436%26pitch%3D0%26thumbfov%3D100!7i13312!8i6656' },
  { id:40,name: 'Tuktut Nogait National Park', lat: 69.136417, lng: -122.883148, link: 'https://www.google.com/maps/@69.136417,-122.883148,3a,75y,31.73h,75.58t/data=!3m5!1e1!3m3!1sLUImtbKFAJZoVJBJUz08oA!2e0!3e5' },
  { id:41,name: 'Wood Buffalo National Park', lat: 59.537000, lng: -112.230270, link: 'https://www.google.com/maps/@59.537,-112.230271,3a,75y,299.5h,86.34t/data=!3m5!1e1!3m3!1sSoj422WuiGs-ntZM7kLxeQ!2e0!3e5' },
  { id:42,name: 'Aulavik National Park', lat: 73.848275, lng: -119.917249, link: 'https://www.google.com/maps/place/Aulavik+National+Park/@73.8482586,-119.9174948,3a,60y,192.96h,81.92t/data=!3m6!1e1!3m4!1srdqrQmBCV1csD6kUngvYrw!2e0!7i13312!8i6656!4m5!3m4!1s0x51a51e7caafa1141:0x7790dfefc55415ab!8m2!3d73.6019491!4d-119.4042402!6m1!1e1' },
  { id:43,name: 'Ivvavik National Park', lat: 69.182339, lng: -140.208209, link: 'https://www.google.com/maps/@69.182339,-140.208209,3a,75y,254.96h,77.33t/data=!3m5!1e1!3m3!1s9mfyG9bihrFPaDHmztoMVA!2e0!3e5' },
  { id:44,name: 'Kluane National Park and Reserve', lat: 61.023804, lng: -138.508608, link: 'https://www.google.com/maps/@61.0238282,-138.5085854,3a,75y,90t/data=!3m6!1e1!3m4!1sDI4DIQeYT7hBUULMYmfp4A!2e0!7i13312!8i6656' }

]
async function getWeather(latitude, longitude) {
  const apiWeatherKey = '90c98836fd653fffdc75eec71574d690';
  const apiWeatherUrl = 'https://api.openweathermap.org/data/2.5/onecall';
  const exclude = 'hourly,daily';

  return fetch(`${apiWeatherUrl}?lat=${latitude}&lon=${longitude}&exclude=${exclude}&units=metric&appid=${apiWeatherKey}`)
    .then(response => response.json())
    .then(data => {
      const temperature = data.current.temp;
      const weatherCondition = data.current.weather[0].main;

      return { temperature, weatherCondition };
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      return { temperature: null, weatherCondition: null };
    });
}

// Placeholder function for fetching air quality based on latitude and longitude
async function getAQI(latitude, longitude) {
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

  return fetch(`${APIUrl}?key=${APIKey}`, requestOptions)
    .then(response => response.json())
    .then(data => {
      const aqhiData = data.indexes.find(index => index.code === 'can_ec');

      if (aqhiData) {
        const aqi = aqhiData.aqi;
        const category = aqhiData.category;

        return { aqi, category };
      } else {
        console.error('AQHI (CA) data not found in the response.');
        return { aqi: null, category: null };
      }
    })
    .catch(error => {
      console.error('Error fetching AQI data:', error);
      return { aqi: null, category: null };
    });
}

// Define the endpoint for getting weather and AQI data for each park
app.get('/api/:id/weather', (req, res) => {
  const parkId = parseInt(req.params.id);
  const selectedPark = nationalParks.find(park => park.id === parkId);

  if (!selectedPark) {
    return res.status(404).json({ error: 'Park not found' });
  }

  // Promise to get both weather and AQI data
  Promise.all([getWeather(selectedPark.lat, selectedPark.lng), getAQI(selectedPark.lat, selectedPark.lng)])
    .then(([weatherData, aqiData]) => {
      const parkData = {
        ...selectedPark,
        temperature: weatherData.temperature,
        weatherCondition: weatherData.weatherCondition,
        AQI: aqiData.aqi,
        AQICategory: aqiData.category
      };

      res.json(parkData);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to fetch weather and AQI data' });
    });
});


app.get('/api', (req, res) => {
  //res.json(nationalParks);
  // Retrieve weather and AQI data for each park
  const parkDataPromises = nationalParks.map(park => {
    return Promise.all([
      getWeather(park.lat, park.lng),
      getAQI(park.lat, park.lng)
    ]).then(([weatherData, aqiData]) => {
      return {
        ...park,
        temperature: weatherData.temperature,
        weatherCondition: weatherData.weatherCondition,
        AQI: aqiData.aqi,
        AQICategory: aqiData.category
      };
    }).catch(error => {
      return {
        ...park,
        temperature: null,
        weatherCondition: null,
        AQI: null,
        AQICategory: null
      };
    });
  
});
Promise.all(parkDataPromises)
.then(parksWithWeather => {
  res.json(parksWithWeather); // Respond with the array of parks and their weather data
})
.catch(error => {
  res.status(500).json({ error: 'Failed to fetch weather and AQI data for parks' });
});
});
app.get('/api/:id', (req, res) => {
  const parkId = parseInt(req.params.id); // Extract the park ID from the URL
  const selectedPark = nationalParks.find(park => park.id === parkId);

  if (selectedPark) {
    res.json(selectedPark); // If the park is found, respond with the park's details
  } else {
    res.status(404).json({ error: 'Park not found' }); // If park not found, respond with an error
  }
});
app.get('/api/:id/:property', function(req, res) {
  const parkId = parseInt(req.params.id);
  const property = req.params.property;

  const park = nationalParks.find(park => park.id === parkId);

  if (!park) {
    return res.status(404).send('Park not found');
  }

  // Check if the requested property exists in the park object
  if (park.hasOwnProperty(property)) {
    // Return the value of the requested property for the park
    res.send(`${property}: ${park[property]}`);
  } else {
    res.status(404).send('Property not found');
  }
});


app.get('/api/:id/weather', async (req, res) => {
  const parkId = parseInt(req.params.id);
  const selectedPark = nationalParks.find(park => park.id === parkId);

  if (!selectedPark) {
    return res.status(404).json({ error: 'Park not found' });
  }

  const weather = await getWeather(selectedPark.lat, selectedPark.lng);

  if (weather) {
    res.json({ park: selectedPark, weather });
  } else {
    res.status(500).json({ error: 'Weather data not available' });
  }
});

app.get('/api/:id/airquality', async (req, res) => {
  const parkId = parseInt(req.params.id);
  const selectedPark = nationalParks.find(park => park.id === parkId);

  if (!selectedPark) {
    return res.status(404).json({ error: 'Park not found' });
  }

  const airQuality = await getAQI(selectedPark.lat, selectedPark.lng);

  if (airQuality) {
    res.json({ park: selectedPark, airQuality });
  } else {
    res.status(500).json({ error: 'Air quality data not available' });
  }
});








 app.get('/', function(req, res) {
   res.render('auth');
 });

 app.get('/locationinputwithAQI', function(req, res) {
   res.render('locationinputwithAQI');
 });

 app.get('/aboutus', function(req, res) {
   res.render('aboutus');
 });

 app.get('/activitySelection', function(req, res) {
   res.render('activitySelection');
 });

 app.get('/terminology', function(req, res) {
   res.render('terminology');
 });

 app.get('/ParkDetail', function(req, res) {
   res.render('ParkDetail');
 });

 app.get('/ParkRecommendations', function(req, res) {
   res.render('ParkRecommendations');
 });

 app.get('/notification&alert', function(req, res) {
   res.render('notification&alert');
 });

 app.get('/404', (req, res) => res.send("error logging in"));

const port = process.env.PORT || 3000;
app.listen(port , () => console.log('App listening on port ' + port));

/*  PASSPORT SETUP  */

const passport = require('passport');
var userProfile;
app.use(passport.initialize());
app.use(passport.session());

app.get('/profile', (req, res) => {
   if (req.isAuthenticated()) {
       res.render('profile', userProfile);
   } else {
       res.redirect('/auth/google'); // Redirect to the login page if the user is not authenticated
   }
});

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/*  Google AUTH  */

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '767612949971-2lraobislu9m3qh542rq5tga04hvm2q3.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://54.210.72.99.nip.io/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {

   userProfile = {
       id: profile.id,
       displayName: profile.displayName,
       profileImageURL: profile.photos[0].value, // Use the correct property for the profile image URL
       emails: profile.emails, // Include the user's email
       
   };
   return done(null, userProfile);
}
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/404' }),
  function(req, res) {

    // Successful authentication, redirect success.

    res.redirect('/profile');
  });
  
  
