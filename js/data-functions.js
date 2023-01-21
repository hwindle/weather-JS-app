/*** get location, from coords if given,  ***/
function getLocationDOM() {
  // Getting Geolocation data if device has this
  let latitude, longitude;
  const locationInput = document.querySelector('input#typed-location').value;
  //console.log('Location line 6: ', locationInput);
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
  const apiKey = '4c05f41df20f474bb47154635232101';
  const baseURL = 'http://api.weatherapi.com/v1/';
  let searchParams = `?key=${apiKey}`;
  if (location.lat) {
    searchParams += `&q=${location.lat},${location.long}`;
  } else {
    searchParams += `&q=${location}`;
  }
  // get 6 day weather daily forecast
  const forecastEndpoint = baseURL + 'forecast.json' + searchParams + '&days=6' + '&aqi=no&alerts=no';
  fetch(forecastEndpoint)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      console.error('Weather response code: ', response.status);
    }
  })
  .then((weatherData) => {
    // parse JSON to an object
    // process elsewhere
    const processedWeatherArr = processWeather(weatherData);
  })
  .catch((error) => {
    console.error('Weather forecast fetching error', error);
  });
  // set prevWeatherData here
  return processWeatherArr;
}

/***
 * Process the parsed JSON object from the weather API
 * @param Object data
 * @returns Array of objects, 6 elements (each element being a day)
 */
function processWeather(data) {
  //console.dir(data);
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