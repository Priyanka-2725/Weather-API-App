const inputBox= document.querySelector(".input-box");
const searchBtn= document.querySelector("#searchBtn");
const weather_img = document.querySelector(".weather-image");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind-speed");
const locationNotFound = document.querySelector(".location-not-found");
const weatherBody= document.querySelector(".weather-body");
const feelslike = document.querySelector("#feels-like");
const pressure= document.querySelector("#pressure");


async function checkWeather(city) {
    
    const apiKey = "b72c9f5ca731d6e5f9614b573a87da10";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const weatherData = await fetch(`${url}`).then(response => response.json());

    console.log(weatherData);
    if(weatherData.cod==="404"){
        locationNotFound.style.display = "flex";
        weatherBody.style.display = "none";
        return;
    }
    locationNotFound.style.display = "none";
    weatherBody.style.display = "flex";
    temperature.innerHTML= `${Math.round(weatherData.main.temp - 273.15)}°C`;
    description.innerHTML= `${weatherData.weather[0].description}`;
    humidity.innerHTML= `${Math.round(weatherData.main.humidity)}%`;
    wind.innerHTML= `${Math.round(weatherData.wind.speed)}kmph`;
    pressure.innerHTML=`${Math.round(weatherData.main.pressure)}mbar`
    feelslike.innerHTML= `${Math.round(weatherData.main.feels_like - 273.15)}°C`;



    switch(weatherData.weather[0].main){
    case "Clouds":
        weather_img.src = "./images/cloud.png";
        document.body.style.background = "linear-gradient(to bottom, #bdc3c7, #2c3e50)";
        break;
    case "Clear":
        weather_img.src = "./images/clear.png";
        document.body.style.background = "linear-gradient(to bottom, #56ccf2, #2f80ed)";
        break;
    case "Rain":
        weather_img.src = "./images/rain.png";
        document.body.style.background = "linear-gradient(to bottom, #4b79a1, #283e51)";
        break;
    case "Mist":
        weather_img.src = "./images/mist.png";
        document.body.style.background = "linear-gradient(to bottom, #606c88, #3f4c6b)";
        break;
    case "Snow":
        weather_img.src = "./images/snow.png";
        document.body.style.background = "linear-gradient(to bottom, #e6dada, #274046)";
        break;
}


}

searchBtn.addEventListener("click", () => {
    checkWeather(inputBox.value);
});

inputBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter" && inputBox.value.trim() !== "") {
        checkWeather(inputBox.value);
    }
});