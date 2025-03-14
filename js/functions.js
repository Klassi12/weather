const temp_span = document.querySelector('#temp');
const speed_span = document.querySelector('#speed');
const direction_span = document.querySelector('#direction');
const description_span = document.querySelector('#description');
const icon_img = document.querySelector('#icon');

const api_key = '922f66860acdbfd8583643392569b15f';
const url = 'https://api.openweathermap.org/data/2.5/weather?';
const icon_url = 'http://openweathermap.org/img/wn/';

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude.toFixed(3);
            const lng = position.coords.longitude.toFixed(3);
            document.querySelector('#lat').innerHTML = lat;
            document.querySelector('#lng').innerHTML = lng;
            getWeather(lat, lng);
        }, error => {
            alert("Error getting location: " + error.message);
        });
    } else {
        alert("Your browser does not support geolocation!");
    }
};

const getWeather = (lat, lng) => {
    const address = `${url}lat=${lat}&lon=${lng}&units=metric&appid=${api_key}`;
    axios.get(address)
        .then(response => {
            const json = response.data;
            temp_span.innerHTML = json.main.temp;
            speed_span.innerHTML = json.wind.speed;
            direction_span.innerHTML = json.wind.deg;
            description_span.innerHTML = json.weather[0].description;
            icon_img.src = `${icon_url}${json.weather[0].icon}@2x.png`;
        })
        .catch(error => {
            alert("Error getting weather data: " + error.message);
        });
};

getLocation();