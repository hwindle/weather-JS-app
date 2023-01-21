//import { getLocationDOM, getWeather } from './data-functions';

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
      <span class="day-temp"></span>
      <span class="night-temp"></span>
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
  // create tbody to add trs to
  let tbodyElement = document.createElement('tbody');
  // basic weather info
  tbodyElement.innerHTML = `
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
    tbodyElement.innerHTML += `
    <tr>
      <th>Humidity</th>
      <td class="humidity"></td>
    </tr>
    <tr>
      <th>Rain (inches)</th>
      <td class="rain-qty"></td>
    </tr>
    <tr>
      <th>Sunrise</th>
      <td class="sunrise"></td>
    </tr>
    <tr>
      <th>Sunset</th>
      <td class="sunset"></td>
    </tr>`;
  }
  // put the body of the table with the rows in the table
  table.append(tbodyElement);
  // return the HTML 
  return table;
}

/***
 * Add the figure and table to a HTML element: 
 * section.weather-one-day
 * if today is set, add a todays-weather class, otherwise
 * add the forecast-weather class
 * @returns a HTML fragment for one day of weather (section)
 */
function createOneDaySection(today, index) {
  // article HTML bit
  const article = document.createElement('article');
  const iconArea = createFigure();
  const detailsTable = createTable();
  article.classList.add('weather-info');
  article.append(iconArea);
  article.append(detailsTable);
  // date heading
  const dateH3 = document.createElement('h3');
  dateH3.classList.add('date');
  // div with today/forecast class
  const innerDiv = document.createElement('div');
  if (today) {
    innerDiv.classList.add('todays-weather');
  } else {
    innerDiv.classList.add('forecast-weather');
  }
  innerDiv.append(dateH3);
  innerDiv.append(article);
  // containing section element
  const outerSection = document.createElement('section');
  outerSection.setAttribute('class', 'weather-one-day');
  outerSection.setAttribute('id', 'day-' + index.toString());
  outerSection.append(innerDiv);
  // return the section
  return outerSection;
}

// addToDOM (adds weather-one-day section to area (still a template))
function addToDOM(element) {
  const container = document.querySelector('main#forecast-area');
  container.append(element);
}

// updateAllWeather(location) puts weather info into the DOM
function updateAllWeather(location) {
  const weather = getWeather(location);
}


// Run these items when the app first starts

window.addEventListener('load', () => {
  
  // create 6 days, first with today's class
  // the number of days of weather forecast to get
  const forecastDaysLen = 6;
  let daySection = '';
  for (let i = 0; i < forecastDaysLen; i++) {
    if (i === 0) {
      daySection = createOneDaySection(true, i);
      addToDOM(daySection);
    } else {
      daySection = createOneDaySection(false, i);
      addToDOM(daySection);
    }
  }
});

// add button event listener
const getWeatherBtn = document.querySelector('#find-weather');
getWeatherBtn.addEventListener('click', () => {
  const location = getLocationDOM();
  updateAllWeather(location);
  //console.log(location);
});

