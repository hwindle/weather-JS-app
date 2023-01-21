/*** get location, from coords if given,  ***/
function getLocationDOM() {
  // Getting Geolocation data if device has this
  let latitude, longitude;
  const locationInput = document.querySelector('input#typed-location').value;
  console.log('Location line 6: ', locationInput);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    });
    if (!locationInput) {
      const locObject = {
        lat: latitude,
        long: longitude
      };
      setWeatherLocation(locObject);
      return locObject;
    } else {
      setWeatherLocation(locationInput.toString());
      return locationInput.toString();
    }
  } else {
    console.log('Geolocation is turned off, please use the location box');
    return locationInput.toString();
  }
}

/***
 * get the weather for a location, can be lat/long or a text string input
 * calls processWeather which returns an array of custom weather objects.
 * @param String|Object {lat: x, long: y}
 * @returns Array of objects
 */
function getWeather(location) {
  const apiKey = '9da4dada208801151c767e2a4ae64b2c';
  let latitude, longitude;
  // get lat and long for text location
  if (typeof(location) === 'string') {
    const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=` + apiKey;
    
    // fetch 
    fetch(geocodingUrl)
    .then((response) => {
      if (response.ok) {
        return response.JSON();
      }
    })
    .then((geocoding) => {
      latitude = geocoding[0].lat;
      longitude = geocoding[0].lon;
    })
    .catch((error) => {
      console.error('Geocoding fetch error: ', error);
    });
  } else {
    latitude = location.lat;
    longitude = location.long;
  }
  // get 6 day weather daily forecast
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=6&appid=${apiKey}`;
  fetch(forecastURL)
  .then((response) => {
    if (response.ok) {
      return response.JSON();
    } else {
      console.error('Weather response code: ', response.status);
    }
  })
  .then((weatherData) => {
    // parse JSON to an object
    // process elsewhere
    const processedWeatherArr = processWeather(JSON.parse(weatherData));
  })
  .catch((error) => {
    console.error('Weather forecast fetching error', error);
  });
  // set prevWeatherData here
  return processWeatherArr || [];
}

/***
 * Process the parsed JSON object from the weather API
 * @param Object data
 * @returns Array of objects, 6 elements (each element being a day)
 */
function processWeather(data) {
  console.dir(data);
}

/***
 * set the weather location in local storage
 * @params String|object {lat: x, long: y}
 */
function setWeatherLocation(location) {
  if (typeof(location) !== 'string') {
    localStorage.setItem('prevLocation', JSON.stringify(location));
  } else {
    localStorage.setItem('prevLocation', location);
  }
}

// returns weather location from localStorage
function getWeatherLocation() {
  const location = JSON.parse(localStorage.getItem('prevLocation'));
  return location;
}

// previousWeatherData()