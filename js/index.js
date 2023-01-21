import { getLocation, getWeather } from './data-functions';

/*** DOM functions ***/
/***
 * Create the HTML for the figure and temperatures
 * @returns a HTML fragment
 */
function createFigure() {
  const figure = document.createElement('figure');
  figure.innerHTML = `<img
    class="img-fluid rounded-circle todays-w-img"
    src=""
    alt="weather-icon" />
    <figcaption class="temps-area">
      <span class="day-temp">3</span>
      <span class="night-temp">-4</span>
    </figcaption>`;
  // return the weather icon area
  return figure;
}

// createTable

// createOneDaySection

// addToDOM (adds weather-one-day section to area (still a template))

// updateWeather(id, full) puts weather info in a card with html id

/*** Getting Geolocation data if device has this ***/

// Run these items when the app first starts