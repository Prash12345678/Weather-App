const API_KEY = '43bef95fe0457e751a1865eaa9e3fdb6';

const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherCard = document.querySelector('.weather-card');
const errorMessage = document.getElementById('errorMessage');
const cityName = document.getElementById('cityName');
const countryCode = document.getElementById('countryCode');
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const feelsLike = document.getElementById('feelsLike');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const pressure = document.getElementById('pressure');
const visibility = document.getElementById('visibility');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const geolocationBtn = document.getElementById('geolocationBtn');
const unitToggle = document.getElementById('unitToggle');

let isCelsius = true;

function formatTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

function getWeatherData(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(xhr.status === 404 ? 'City not found' : 'Error fetching data');
            }
        };
        xhr.onerror = () => reject('Network error');
        xhr.send();
    });
}

function updateWeatherUI(data) {
    cityName.textContent = data.name;
    countryCode.textContent = data.sys.country;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    
    const tempCelsius = Math.round(data.main.temp);
    temperature.textContent = `${tempCelsius}°C`;
    temperature.dataset.celsius = tempCelsius;
    
    feelsLike.textContent = `Feels like ${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind: ${data.wind.speed} m/s`;
    pressure.textContent = `Pressure: ${data.main.pressure} hPa`;
    visibility.textContent = `Visibility: ${(data.visibility / 1000).toFixed(1)} km`;
    
    sunrise.textContent = `Sunrise: ${formatTime(data.sys.sunrise)}`;
    sunset.textContent = `Sunset: ${formatTime(data.sys.sunset)}`;
    
    weatherCard.classList.remove('hidden');
    errorMessage.classList.add('hidden');
}

function toggleTemperatureUnit() {
    isCelsius = !isCelsius;
    unitToggle.textContent = isCelsius ? 'Switch to °F' : 'Switch to °C';
    const tempCelsius = parseFloat(temperature.dataset.celsius);
    
    if (isCelsius) {
        temperature.textContent = `${tempCelsius}°C`;
        feelsLike.textContent = `Feels like ${Math.round(data.main.feels_like)}°C`;
    } else {
        temperature.textContent = `${Math.round(tempCelsius * 9/5 + 32)}°F`;
        feelsLike.textContent = `Feels like ${Math.round(data.main.feels_like * 9/5 + 32)}°F`;
    }
}

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (!city) return;

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const data = await getWeatherData(url);
        updateWeatherUI(data);
    } catch (error) {
        showError(error);
    }
});

geolocationBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
        showError('Geolocation not supported');
        return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
            const data = await getWeatherData(url);
            updateWeatherUI(data);
        } catch (error) {
            showError(error);
        }
    }, () => showError('Location access denied'));
});

unitToggle.addEventListener('click', toggleTemperatureUnit);

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    weatherCard.classList.add('hidden');
}