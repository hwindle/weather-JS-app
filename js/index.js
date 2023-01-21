// import { getLocation, getWeather } from './data-functions';

/*** DOM functions ***/
/***
 * Create the HTML for the figure and temperatures
 * @returns a HTML fragment (a figure element)
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

/***
 * create Table HTML template with classes etc.
 * @returns a HTML fragment (one table)
 */
function createTable() {
  const table = document.createElement('table');
  table.setAttribute('class', 'table-sm details');
  const caption = document.createElement('caption');
  caption.setAttribute('class', 'weather-descr');
  table.appendChild(caption);
  // basic weather info
  table.innerHTML += `
    <tr>
      <th>Feels Like</th>
      <td class="feels-like-temp"></td>
    </tr>
    <tr>
      <th>Wind Speed</th>
      <td class="wind-speed"></td>
    </tr>
    <tr>
      <th>Wind Gusts</th>
      <td class="wind-gust"></td>
    </tr>`;
  const fullDetails = document.querySelector('#full-weather-view').checked;
  if (fullDetails) {
    // add more rows to the table
    table.innerHTML += `
    <tr>
      <th>Humidity</th>
      <td class="humidity">10</td>
    </tr>
    <tr>
      <th>Rain (inches)</th>
      <td class="rain-qty">1</td>
    </tr>
    <tr>
      <th>Sunrise</th>
      <td class="sunrise">8:00</td>
    </tr>
    <tr>
      <th>Sunset</th>
      <td class="sunset">16:30</td>
    </tr>`;
  }
  // return the HTML 
  return table;
}

// createOneDaySection(today)

// addToDOM (adds weather-one-day section to area (still a template))

// updateWeather(id, full) puts weather info in a card with html id

/*** Getting Geolocation data if device has this ***/

// Run these items when the app first starts
// create 6 days, first with today's class
console.dir(createTable());