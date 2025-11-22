# 🌦️ Weather App
A modern, interactive **7-day weather forecast application** built with HTML, CSS, JavaScript, Leaflet Maps, Bootstrap, and multiple APIs. Beautiful animations, dynamic city images, and detailed weather metrics make this app both visually appealing and highly functional.

## 🏷️ Tech Stack Badges
<p align="left">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
  <img src="https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white">
</p>

## ✨ Features
### 🔍 Smart City Search
- Search weather for any city worldwide
- Clear search button resets to default city
- Smooth & instant UI updates

### 🌡️ Real-Time Weather Overview
- Current temperature
- Weather condition text
- Animated icon
- Chance of rain
- Live date & time (updates every second)

### 🖼️ Dynamic City Images
- City photo fetched automatically from Pixabay
- Smooth fade-in animation
- Loading spinner
- Fallback image included

### 📅 7-Day Forecast
- Day name
- Lucide weather icons
- Max / Min temperature

### 🌤️ Detailed Highlights Section
Includes:
- UV Index (with color-coded circular bar)
- Humidity + status
- Wind speed & direction
- Visibility
- Air Quality Index (EPA standard + status + dynamic icon)
- Sunrise & Sunset times with animated glowing icons

### 🗺️ Interactive Map
- Built with Leaflet.js
- Automatically centers on searched location
- Marker updates dynamically
- Smooth resizing and zooming

### 📱 Fully Responsive UI
- Mobile-first design
- Improved layout for smaller screens
- Glassmorphism panels
- Background video
- Smooth animations

## 📸 Screenshot
<img width="1902" height="910" alt="image" src="https://github.com/user-attachments/assets/3d5a8e69-cebf-4fb5-9479-2a5e2516a21f" />

---

## 🚀 Live Demo
👉 **[[Click here to view the live demo](https://sachinthaabeygunasekara.github.io/weather_application/)](#)**

## 📁 Project Structure
```
weather-app/
│
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   ├── images/
│   │   ├── side_image.png
│   │   └── no-image-available.jpg
│   └── videos/
│       └── background.mp4
├── index.html
└── README.md
```

## 🧠 Usage
- Enter a **city name** and press **Enter**
- View the full weather dashboard for that location
- Map will automatically reposition to the selected city
- Clear button resets search to **Colombo**

## 🛠️ Technologies Used
- HTML5 – Structure
- CSS3 – UI design, animation, responsiveness
- JavaScript (ES6+) – Logic, API handling, interactions
- Bootstrap 5 – Layout & components
- Leaflet.js + OpenStreetMap – Interactive map
- WeatherAPI – Weather + AQI data
- Pixabay API – Dynamic city images
- Lucide Icons – Vector weather icons

## 🔌 API Setup (Required)
### 1️⃣ WeatherAPI
- Create an account
- Generate API key
- Insert it into `app.js`:
```js
const API_KEY = "YOUR_WEATHER_API_KEY_HERE";
```
### 2️⃣ Pixabay API
- Create free key
- Insert it:
```js
const PIXABAY_KEY = "YOUR_PIXABAY_KEY_HERE";
```

## 🌱 Future Enhancements
- Hourly weather charts
- Dark/Light theme toggle
- Favorite cities
- Weather notifications
- Multi-language support
- Animated forecast icons

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Commit and push
4. Open a pull request

