const searchBoxFormElem = document.querySelector("#searchBoxForm");
const searchInputElem = document.querySelector("input[name='cityField']");
const searchButtonElem = document.getElementById("searchButton");
const resultsBoxElem = document.getElementById("results");

const API_KEY = "281475fb650b835c4e384500d6b9b7f3";

async function fetchWeather(city) {
  const urlParams = new URLSearchParams({
    q: city,
    appid: API_KEY,
  }).toString();

  const res = await window.fetch(
    `https://api.openweathermap.org/data/2.5/weather?${urlParams}`
  );
  const data = await res.json();

  return data;
}

function printResults(results) {
  const { name: cityName, sys, main, wind } = results;
  const { country } = sys;
  const { speed } = wind;
  const { humidity, temp, pressure, feels_like } = main;

  const data = [
    { label: "City name", value: `${cityName}, ${country}` },
    { label: "Temperature", value: `${temp} Kelvin` },
    { label: "Feels Like", value: `${feels_like} Kelvin` },
    { label: "Humidity", value: `${humidity}%` },
    { label: "Wind speed", value: `${speed} meter/sec` },
    { label: "Pressure", value: `${pressure}` },
  ];

  resultsBoxElem.classList.remove("hide");

  data.forEach((item) => {
    resultsBoxElem.innerHTML += `
    <div class="weather-item">
      <p class="item-title">${item.label}</p>
      <p class="item-body">${item.value}</p>
    </div>`;
  });
}

searchBoxFormElem.addEventListener("submit", async (event) => {
  event.preventDefault();

  resultsBoxElem.classList.add("hide");
  resultsBoxElem.innerHTML = "";

  const { value: city } = searchInputElem;

  if (!city) {
    return;
  }

  const data = await fetchWeather(city);

  printResults(data);
});
