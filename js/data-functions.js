/*** get location, from coords if given,  ***/
function getLocationDOM() {
  // Getting Geolocation data if device has this
  let latitude, longitude;
  const locationInput = document.querySelector('input#typed-location').value;
  console.log('Location line 6: ', locationInput);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    });
    if (!locationInput) {
      const locObject = {
        lat: latitude,
        long: longitude,
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
  const forecastEndpoint =
    baseURL + 'forecast.json' + searchParams + '&days=6' + '&aqi=no&alerts=no';
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
      const dataArr = processWeather(weatherData);
      updateAllWeather(dataArr);
    })
    .catch((error) => {
      console.error('Weather forecast fetching error', error);
    });
}

/***
 * Process the parsed JSON object from the weather API
 * @param Object data
 * @returns Array of objects, 6 elements (each element being a day)
 */
function processWeather(data) {
  let daysArray = [];
  data.forecast.forecastday.map((day) => {
      let { sunrise, sunset } = day.astro;
      let { icon, text: descr } = day.day.condition;
      let { maxtemp_c, mintemp_c, maxwind_mph, avghumidity, totalprecip_in } =
        day.day;
      // put items in object
      let oneDayObject = {
        icon: icon,
        dayTemp: maxtemp_c,
        nightTemp: mintemp_c,
        description: descr,
        feelsLike: (maxtemp_c - 2).toFixed(2),
        windSpeed: (maxwind_mph - 2).toFixed(2),
        windGust: maxwind_mph,
        humidity: avghumidity,
        rainQty: totalprecip_in,
        sunrise: sunrise,
        sunset: sunset,
      };
      // put data in array
      daysArray.push(oneDayObject);
    });
  // return array
  return daysArray;
}

/***
 * set the weather location in local storage
 * @params String|object {lat: x, long: y}
 */
function setWeatherLocation(location) {
  if (typeof location !== 'string') {
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
