//Fetch the weather data from the api
async function getWeatherData(location){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=3ebb383d3045c63bca80e19a42ae78c9`, {mode: 'cors'});

    const weatherData = await response.json();
    const newData = getCurrentWeather(weatherData);
    displayData(newData);
}

//Return an array of weather data we want
function getCurrentWeather(wData){
    const temp = wData.main.temp;
    const wind = wData.wind.speed;
    const feelsLike = wData.main.feels_like;
    const lowTemp = wData.main.temp_min;
    const highTemp = wData.main.temp_max;
    const condition = wData.weather[0].main;

    return [temp, wind, feelsLike, highTemp, lowTemp, condition];
    
}

//Add weather data to the screen
function displayData(data){
    const currentTemp = document.querySelector('.temp');
    const currentWind = document.querySelector('.wind');
    const todayHighTemp = document.querySelector('.high-temp');
    const todayLowTemp = document.querySelector('.low-temp');
    const feelsLikeTemp = document.querySelector('.feels-like');
    const conditions = document.querySelector('.conditions');

    conditions.innerHTML = data[5];
    currentTemp.innerHTML = Math.round(data[0]) + ' \u00B0F';
    feelsLikeTemp.innerHTML = 'Feels Like ' + Math.round(data[2]) + '\u00B0F'
    todayHighTemp.innerHTML = 'High: ' + Math.round(data[3]) + ' \u00B0F';
    todayLowTemp.innerHTML = 'Low: '+ Math.round(data[4]) + ' \u00B0F';
    currentWind.innerHTML = 'Wind: ' + Math.round(data[1]) + ' mph';
}

//Set the location
function setLocation(){
    const location = document.querySelector('.loc').value;
    const locationDisplay = document.querySelector('.location');

    locationDisplay.innerHTML = location;
    getWeatherData(location);

}

//Load default location for when the page first loads
function loadDefault(){
    getWeatherData('Denver');
}

//Add event listener for search function
function addEventListener(){
    const search = document.querySelector('.search');
    const clear = document.querySelector('.loc').value;

    search.addEventListener('click', function(){
        setLocation();
        document.querySelector('.loc').value = '';
     });
}

loadDefault();
addEventListener();

