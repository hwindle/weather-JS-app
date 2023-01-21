/*** get location, from coords if given,  ***/
function getLocationDOM() {
  // Getting Geolocation data if device has this
  let latitude, longitude;
  const locationInput = document.querySelector('input#typed-location').value;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    });
    if (!locationInput) {
      return {
        lat: latitude,
        long: longitude
      };
    } else {
      return locationInput.toString();
    }
  } else {
    console.log('Geolocation is turned off, please use the location box');
    return locationInput.toString();
  }
}

function getWeather(location) {

}

// processWeather(parsed Json)

// setWeatherLocation(location)

// getWeatherLocation(location)

// previousWeatherData()