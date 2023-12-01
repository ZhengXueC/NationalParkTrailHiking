
const {calculateDistance} = require('./myFunctions'); // Adjust the import path as needed


describe('calculateDistance function', () => {
  test('Calculates distance between two known points', () => {
    // Coordinates of two known points for testing
    const lat1 = 40.7128; 
    const lon1 = -74.0060; 
    const lat2 = 34.0522; 
    const lon2 = -118.2437; 

   
    const expectedDistance = 3935.74; 

   
    const calculatedDistance = calculateDistance(lat1, lon1, lat2, lon2);

   
    const delta = 10; 
    expect(calculatedDistance).toBeCloseTo(expectedDistance, 1); 
  });
});

//const { fetchWeatherAndAirQuality } = require('./myFunctions');

// describe('Your Test Suite', () => {
//   test('Fetch weather and air quality data for a location', async () => {
//     const latitude = 45.5088;
//     const longitude = -73.5616;

//     const result = await fetchWeatherAndAirQuality(latitude, longitude);
//     expect(result).toHaveProperty('temperature');
//     expect(result).toHaveProperty('weatherCondition');
    
//   });
// });

const { getTemperatureFromAPI } = require('./myFunctions');
const { getWeatherConditionFromAPI } = require('./myFunctions');
describe('Weather API Tests', () => {
  test('Temperature retrieved from API is in Kelvin', async () => {
      const temperature = await getTemperatureFromAPI(45.5088, -73.5616); // New York's latitude and longitude
      expect(temperature).toEqual(expect.any(Number));
      expect(temperature).toBeGreaterThanOrEqual(0); // Assuming temperatures can't be negative (in Kelvin)
  });

  test('Weather condition retrieved from API is a string', async () => {
      const weatherCondition = await getWeatherConditionFromAPI(45.5088, -73.5616); // New York's latitude and longitude
      expect(typeof weatherCondition).toBe('string');
  });
});
const { getAQIFromAPI } = require('./myFunctions');
const { getAQHICategoryFromAPI } = require('./myFunctions');
describe('Air Quality API Tests', () => {
  test('AQI value retrieved from API is an integer', async () => {
    
    const aqhiData = await getAQIFromAPI(45.5088, -73.5616);

    if (aqhiData) {
        aqhiData.forEach(item => {
            if (item.aqi) {
                expect(Number.isInteger(item.aqi)).toBe(true);
            } else {
                console.error('AQI value not found in the response.');
            }
        });
    } 
    
});

  test('AQHI category retrieved from API is in JSON format', async () => {
      const aqhiCategory = await getAQHICategoryFromAPI(45.5088, -73.5616); 
      expect(aqhiCategory).toEqual(expect.any(Object));
  });
});



