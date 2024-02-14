const apiKey = "ad93ec9d6bcf5c35eec3b3f597b82047";
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const btn = document.getElementById("btn");

// event listener for the button
btn.addEventListener("click", () => {
  //storingt the city name to variable
  const city = document.querySelector(".search input");
  // check the value is empty
  if (city.value == "") {
    alert("Enter a city name");
  } else {
    checkWeather(city.value);
  }
});

// function to get the weather

async function checkWeather(city) {
  //api request using fetch
  const response = await fetch(url + city + `&appid=${apiKey}`);
  //checking the response code  if 200 valid response/404 not found
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    document.querySelector(".error").style.display = "none";
    console.log(response);

    //parsing the json data to js object
    const data = await response.json();
    console.log(data);
    // updating the UI according to the data received
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";

    document.querySelector(".main").innerHTML = data.weather[0].main;
    const condition = data.weather[0].main;
    const img = document.querySelector(".weather img");
    // updating img according to weather condition
    if (condition == "Clouds") {
      img.src = "img/img/img/clouds.png";
    } else if (condition == "Haze") {
      img.src = "img/img/img/haze.png";
    } else if (condition == "Drizzle") {
      img.src = "img/img/img/drizzle.png";
    } else if (condition == "Rain") {
      img.src = "img/img/img/rain.png";
    } else if (condition == "Snow") {
      img.src = "img/img/img/snow.png";
    } else if (condition == "Clear") {
      img.src = "img/img/img/clear.png";
    } else if (condition == "Mist") {
      img.src = "img/img/img/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
  }
}
