let tempDescription = document.querySelector(
  ".location__weather-icon-description"
);
let temperatureSection = document.querySelector(".temperature__official");
let tempDegree = document.querySelector(".temperature__degree");
let tempUnit = document.querySelector(".temperature__unit");
let sensoryTemp = document.querySelector(".temperature__sensory");
let locationTimezone = document.querySelector(".location__timezone");
let weatherIcon = document.querySelector(".location__weather-icon");

function init() {
  window.addEventListener("load", () => {
    let long; // longitude
    let lat; // latitude

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        long = position.coords.longitude;
        lat = position.coords.latitude;

        const API = "7684e69beaeac2fc8be04ccf56b61401";
        const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API}&units=metric`;

        console.log(URL); /*          */

        fetch(URL) // resolve, reject
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            console.log(data); /*          */
            const { temp: temperature } = data.main; // const temp = data.main.temp;
            const summary = data.weather[0].description;
            const city = data.name;
            const country = data.sys.country;
            const sensory = data.main.feels_like;

            // Set DOM Elements from the API
            tempDegree.textContent = `${Math.round(temperature)}°C`;
            tempDescription.textContent = summary;
            sensoryTemp.textContent = `(feels like ${Math.round(sensory)}°C)`;
            locationTimezone.textContent = `@ ${city}`;

            // Icon
            let icon = data.weather[0].icon;
            weatherIcon.src = `http://openweathermap.org/img/wn/${icon}.png`;

            // celsius to farenheit conversion
            let farenheit = (temperature * 9) / 5 + 32;
            let sensoryFarenheit = (sensory * 9) / 5 + 32;

            // Change temperature SI unit
            temperatureSection.addEventListener("click", () => {
              if (tempUnit.textContent === "°C") {
                tempUnit.textContent = "°F";
                tempDegree.textContent = Math.round(farenheit);
                sensoryTemp.textContent = `(feels like ${Math.round(
                  sensoryFarenheit
                )}°F)`;
              } else {
                tempUnit.textContent = "°C";
                tempDegree.textContent = Math.round(temperature);
                sensoryTemp.textContent = `(feels like ${Math.round(
                  sensory
                )}°C)`;
              }
            });
          });
      });
    }
  });
}

window.addEventListener("DOMContentLoaded", init);
