const userLocation = document.getElementById("userLocation"),
      converter = document.getElementById("converter"),
      weatherIcon = document.querySelector(".weatherIcon"),
      temperature = document.querySelector(".temperature"),
      feelsLike = document.querySelector(".feelsLike"),
      description = document.querySelector(".description"),
      date = document.querySelector(".date"),
      city = document.querySelector(".city"),
      HValue = document.querySelector("#HValue"),
      WValue = document.querySelector("#WValue"),
      SRValue = document.querySelector("#SRValue"),
      SSValue = document.querySelector("#SSValue"),
      CValue = document.querySelector("#CValue"),
      UVValue = document.querySelector("#UVValue"),
      PValue = document.querySelector("#PValue"),
      Forecast = document.querySelector(".Forecast"),
      searchButton = document.getElementById("search-button");

const API_KEY = '0a2ef01eb1c7ea26f88f6df9052c2d53';
const container = document.querySelector('.container'); 

const getWeather = async (cityName, unit) => {
    const WEATHER_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=${unit}`;
    const FORECAST_ENDPOINT = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=${unit}`;

    try {
        const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(WEATHER_ENDPOINT),
            fetch(FORECAST_ENDPOINT)
        ]);

        if (!weatherResponse.ok || !forecastResponse.ok) throw new Error("⚠️ Oops! City not found. 🌍 Please check the city name and try again!");

        const [weatherData, forecastData] = await Promise.all([
            weatherResponse.json(),
            forecastResponse.json()
        ]);

        updateWeatherUI(weatherData);
        updateForecastUI(forecastData);
    } catch (error) {
        alert(error.message);
    }
};

const updateWeatherUI = (data) => {
    const weatherType = data.weather[0].main;

    weatherIcon.style.backgroundImage = `url(${getWeatherImage(weatherType)})`;

    container.style.backgroundImage = `url(${getBackgroundImage(weatherType)})`;
    container.style.backgroundSize = 'cover'; 
    container.style.backgroundPosition = 'center'; 

    temperature.textContent = `${Math.round(data.main.temp)}°`;
    feelsLike.textContent = `Feels like: ${Math.round(data.main.feels_like)}°`;
    description.textContent = data.weather[0].description;
    date.textContent = new Date().toLocaleDateString();
    city.textContent = data.name;
    HValue.textContent = `${data.main.humidity}%`;
    WValue.textContent = `${Math.round(data.wind.speed)} m/s`;
    SRValue.textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    SSValue.textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    CValue.textContent = `${data.clouds.all}%`;
    UVValue.textContent = 'N/A'; 
    PValue.textContent = `${data.main.pressure} hPa`;
};

const updateForecastUI = (data) => {
    Forecast.innerHTML = ''; 

    data.list.forEach(item => {
        const forecastDate = new Date(item.dt * 1000).toLocaleDateString();
        const weatherType = item.weather[0].main;
        const iconUrl = getWeatherImage(weatherType);
        const temperature = Math.round(item.main.temp);

        if (data.list.indexOf(item) % 8 === 0) { 
            const forecastItem = document.createElement('div');
            forecastItem.classList.add('forecast-item');
            forecastItem.innerHTML = `
                <img src="${iconUrl}" alt="${item.weather[0].description}">
                <h3>${forecastDate}</h3>
                <p>${item.weather[0].description}</p>
                <p>${temperature}°</p>
            `;
            Forecast.appendChild(forecastItem);
        }
    });
};


const getWeatherImage = (weatherType) => {
    const weatherImages = {
        'Clear': 'https://i.pinimg.com/564x/b6/49/f3/b649f3ce697bab0070739bbdc0f8da8b.jpg',
        'Clouds': 'https://i.pinimg.com/564x/c9/b7/4c/c9b74cdde95cccfe227fc34243fc881e.jpg',
        'Rain': 'https://i.pinimg.com/564x/35/3e/0a/353e0a15427cb35b02801525c93a3be0.jpg',
        'Snow': 'https://i.pinimg.com/564x/7a/0b/bf/7a0bbfc54919f61cac65fe48f2a9a639.jpg',
        'Thunderstorm': 'https://i.pinimg.com/564x/aa/cc/b4/aaccb4d977112ed5526a66d129b42e62.jpg',
        'Drizzle': 'https://i.pinimg.com/736x/e0/e0/9b/e0e09bd071563d5a6510c0ef25b71955.jpg',
        'Mist': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq2euiyfzgjgqyKyrVDGDA1Be-lLBDrM-qwA&s',
    };
    return weatherImages[weatherType] || 'https://i.pinimg.com/564x/55/2d/e0/552de0ca0380f4b7155550f111c5a52c.jpg'; 
};

const getBackgroundImage = (weatherType) => {
    const backgroundImages = {
        'Clear': 'https://i.pinimg.com/564x/b6/49/f3/b649f3ce697bab0070739bbdc0f8da8b.jpg',
        'Clouds': 'https://i.pinimg.com/564x/c9/b7/4c/c9b74cdde95cccfe227fc34243fc881e.jpg',
        'Rain': 'https://i.pinimg.com/564x/35/3e/0a/353e0a15427cb35b02801525c93a3be0.jpg',
        'Snow': 'https://i.pinimg.com/564x/7a/0b/bf/7a0bbfc54919f61cac65fe48f2a9a639.jpg',
        'Thunderstorm': 'https://i.pinimg.com/564x/aa/cc/b4/aaccb4d977112ed5526a66d129b42e62.jpg',
        'Drizzle': 'https://i.pinimg.com/736x/e0/e0/9b/e0e09bd071563d5a6510c0ef25b71955.jpg',
        'Mist': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq2euiyfzgjgqyKyrVDGDA1Be-lLBDrM-qwA&s',
    };
    return backgroundImages[weatherType] || 'https://i.pinimg.com/564x/55/2d/e0/552de0ca0380f4b7155550f111c5a52c.jpg'; 
};

searchButton.addEventListener('click', () => {
    const cityName = userLocation.value;
    const unit = converter.value;
    if (cityName) {
        getWeather(cityName, unit);
    }
});