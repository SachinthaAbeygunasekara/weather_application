const API_KEY = "af9ad2b6af5a4a3bb55100414251611";
const PIXABAY_KEY = "53349822-c3cff7e738366084afc3f9a6e";
const DEFAULT_CITY_IMG = "assets/images/no-image-available.jpg";

function loadWeather(city) {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=yes`)
        .then(response => response.json())
        .then(data => {
            updateUI(data);
        })
        .catch(error => console.error("Error fetching weather:", error));
}

function updateUI(data) {

    document.getElementById("temperature").innerHTML =
        `${data.current.temp_c}°<sup>C</sup>`;

    document.getElementById("weatherIcon").src =
        "https:" + data.current.condition.icon;

    document.getElementById("conditionText").textContent =
        data.current.condition.text;

    document.getElementById("rainChance").textContent =
        `Rain — ${data.forecast.forecastday[0].day.daily_chance_of_rain}%`;

    document.getElementById("cityName").textContent =
        `${data.location.name}, ${data.location.country}`;

    updateCityImage(data.location.name);
    document.getElementById("cityName").textContent = `${data.location.name}, ${data.location.country}`;


    document.getElementById("uvIndex").textContent = data.current.uv;
    setProgress(data.current.uv);
    updateUVIcon(data.current.uv);
    document.getElementById("windSpeed").textContent = `${data.current.wind_kph} km/h`;
    document.getElementById("windDir").textContent = data.current.wind_dir;

    document.getElementById("humidity").textContent = `${data.current.humidity}%`;
    document.getElementById("visibility").textContent = `${data.current.vis_km} km`;

    document.getElementById("airQuality").textContent =
        data.current.air_quality["us-epa-index"];
    updateAQIcon(data.current.air_quality["us-epa-index"]);

    document.getElementById("airQualityStatus").textContent =
        getAirQualityStatus(data.current.air_quality["us-epa-index"]);
    updateAQIcon(getAirQualityStatus(data.current.air_quality["us-epa-index"]));


    document.getElementById("sunrise").textContent = data.forecast.forecastday[0].astro.sunrise;
    document.getElementById("sunset").textContent = data.forecast.forecastday[0].astro.sunset;

    data.forecast.forecastday.forEach((day, index) => {
        const i = index + 1;

        const date = new Date(day.date);
        const weekday = date.toLocaleDateString("en-US", { weekday: "short" });

        document.getElementById(`day${i}-name`).textContent = weekday;
        document.getElementById(`day${i}-icon`).innerHTML = `🌤️`;
        document.getElementById(`day${i}-temp`).textContent =
            `${day.day.maxtemp_c}° / ${day.day.mintemp_c}°`;
    });

    zoomToCountry(data.location.lat, data.location.lon, 10);
    addMarker(data.location.lat, data.location.lon, data.location.name);
}

function getAirQualityStatus(index) {
    switch (index) {
        case 1: return "Good";
        case 2: return "Moderate";
        case 3: return "Unhealthy for Sensitive";
        case 4: return "Unhealthy";
        case 5: return "Very Unhealthy";
        case 6: return "Hazardous";
        default: return "--";
    }
}

function updateUVIcon(uv) {
    const uvIcon = document.getElementById("icon-uv");

    uvIcon.classList.remove(
        "text-warning",
    );

    if (uv <= 2) {
        uvIcon.classList.add("text-success");
    }
    else if (uv <= 5) {
        uvIcon.classList.add("text-warning");
    }
    else if (uv <= 7) {
        uvIcon.classList.add("text-orange");
    }
    else {
        uvIcon.classList.add("text-danger");
    }
}


function updateAQIcon(aqStatus) {
    const icon = document.getElementById("icon-aq");

    let iconName = "alert-circle";
    let color = "gray";

    switch (aqStatus) {
        case "Good":
            iconName = "smile"; color = "green"; break;
        case "Moderate":
            iconName = "meh"; color = "yellow"; break;
        case "Unhealthy for Sensitive":
            iconName = "alert-triangle"; color = "orange"; break;
        case "Unhealthy":
            iconName = "frown"; color = "red"; break;
        case "Very Unhealthy":
            iconName = "x-circle"; color = "purple"; break;
        case "Hazardous":
            iconName = "skull"; color = "maroon"; break;
    }

    icon.style.color = color;
    icon.setAttribute("data-lucide", iconName);

    lucide.createIcons();
}

function setProgress(value) {
    const progressBar = document.querySelector('.progress-bar');

    const max = parseInt(progressBar.getAttribute('aria-valuemax'));
    const percentage = (value / max) * 100;

    progressBar.style.width = percentage + '%';
    progressBar.setAttribute('aria-valuenow', value);
}

async function updateCityImage(city) {
    const img = document.getElementById("cityImage");
    const loader = document.getElementById("cityImageLoader");

    loader.style.display = "block";
    img.classList.remove("loaded");

    const query = city.toLowerCase().replace(/ /g, "+");

    try {
        const response = await fetch(
            `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${query}&image_type=photo&orientation=horizontal`
        );

        const data = await response.json();

        let url = DEFAULT_CITY_IMG;

        if (data.hits && data.hits.length > 0) {
            url = data.hits[0].largeImageURL;
        }

        img.onload = () => {
            loader.style.display = "none";
            img.classList.add("loaded");
        };

        img.src = url;

    } catch (error) {
        console.error("Pixabay error:", error);

        img.onload = () => {
            loader.style.display = "none";
            img.classList.add("loaded");
        };

        img.src = DEFAULT_CITY_IMG;
    }
}

document.getElementById("searchInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        loadWeather(this.value);
        this.blur();
    }
});

document.getElementById("clearSearch").addEventListener("click", function () {
    document.getElementById("searchInput").value = "";
    loadWeather("Colombo");
});

function getLucideIcon(conditionText) {
    conditionText = conditionText.toLowerCase();

    if (conditionText.includes("sunny")) return "sun";
    if (conditionText.includes("clear")) return "moon";
    if (conditionText.includes("partly") || conditionText.includes("cloudy")) return "cloud-sun";
    if (conditionText.includes("cloud")) return "cloud";
    if (conditionText.includes("mist") || conditionText.includes("fog")) return "cloud-fog";
    if (conditionText.includes("thunder")) return "cloud-lightning";
    if (conditionText.includes("sleet")) return "cloud-snow";
    if (conditionText.includes("snow")) return "snowflake";
    if (conditionText.includes("rain") || conditionText.includes("drizzle")) {
        return "cloud-rain";
    }

    return "sun";
}

function updateForecastBoxes(data) {
    const forecastDays = data.forecast.forecastday;

    forecastDays.forEach((day, index) => {
        const i = index + 1;

        const dateObj = new Date(day.date);
        const weekday = dateObj.toLocaleDateString("en-US", { weekday: "short" });
        document.getElementById(`day${i}-name`).textContent = weekday;

        document.getElementById(`day${i}-temp`).textContent =
            `${day.day.maxtemp_c}° / ${day.day.mintemp_c}°`;

        const iconName = getLucideIcon(day.day.condition.text);

        document.getElementById(`day${i}-icon`).innerHTML =
            `<i data-lucide="${iconName}" class="w-8 h-8"></i>`;

        lucide.createIcons();
    });
}

const map = L.map('map', {
    zoomControl: true
}).setView([6.9271, 79.8612], 12); // Colombo center

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let currentMarker = L.marker([6.9271, 79.8612])
    .addTo(map)
    .bindPopup("Colombo");

function zoomToCountry(lat, lng, zoom = 6) {
    map.setView([lat, lng], zoom);
}

function addMarker(lat, lng, label = "Selected Location") {

    if (currentMarker) {
        map.removeLayer(currentMarker);
    }

    currentMarker = L.marker([lat, lng]).addTo(map).bindPopup(label);
}

setTimeout(() => {
    map.invalidateSize();
}, 300);

function updateDateTime() {
    const now = new Date();

    const weekday = now.toLocaleDateString('en-US', { weekday: 'long' });
    const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    });

    document.getElementById('currentDateTime').textContent = `${weekday}, ${time}`;
}

updateDateTime();
setInterval(updateDateTime, 1000);

window.onload = () => {
    loadWeather("Colombo");
};


function isZoomedOut() {
    try {
        if (window.devicePixelRatio && Math.abs(window.devicePixelRatio - 1) > 0.02) return true;

        if (window.outerWidth && window.innerWidth) {
            const ratio = window.outerWidth / window.innerWidth;
            if (Math.abs(ratio - 1) > 0.05) return true;
        }

        if (window.screen && window.innerWidth) {
            const ratio2 = window.screen.width / window.innerWidth;
            if (Math.abs(ratio2 - 1) > 0.05) return true;
        }
    } catch (e) { }

    return false;
}
