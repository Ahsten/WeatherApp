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

    return [temp, wind, feelsLike, highTemp, lowTemp];
    
}

//Add weather data to the screen
function displayData(data){
    const currentTemp = document.querySelector('.temp');
    const currentWind = document.querySelector('.wind');
    const todayHighTemp = document.querySelector('.high-temp');
    const todayLowTemp = document.querySelector('.low-temp');
    const feelsLikeTemp = document.querySelector('.feels-like');

    currentTemp.innerHTML += data[0] + ' \u00B0F';
    feelsLikeTemp.innerHTML += 'Feels Like ' + data[2] + '\u00B0F'
    todayHighTemp.innerHTML += 'High: ' + data[3] + ' \u00B0F';
    todayLowTemp.innerHTML += 'Low: '+ data[4] + ' \u00B0F';
    currentWind.innerHTML += 'Wind: ' + data[1] + ' mph';
}



getWeatherData('Denver');

