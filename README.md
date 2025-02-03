# Weather WebApp

A responsive weather application that displays current weather data using the OpenWeatherMap API.

## Local Testing:
- Just open index.html in browser

## Live Production Link
- 

## Features
- City-based weather search
- Geolocation support
- Temperature unit toggle (°C/°F)
- Responsive design
- Error handling
- Weather icons display

## Technologies Used
- HTML5
- CSS3 (Flexbox, Media Queries)
- JavaScript (ES6+)
- OpenWeatherMap API

## Installation & Usage

1. **Get API Key:**
   - Register at [OpenWeatherMap](https://home.openweathermap.org/users/sign_up)
   - Get your API key from the dashboard

2. **Configure API:**
   - Open `script.js`
   - Replace `'YOUR_API_KEY_HERE'` with your actual API key

3. **Run Locally:**
   - Open `index.html` in a web browser
   - Allow location access if using geolocation feature

## Approach & Challenges

**Implementation Approach:**
1. Used XMLHttpRequest wrapped in Promises for API calls
2. Implemented responsive layout using CSS Flexbox and media queries
3. Added error handling for both user input and API errors
4. Implemented temperature conversion client-side for unit toggle
5. Structured code for maintainability and readability

**Challenges & Solutions:**
1. **API Integration:**
   - Challenge: Handling different response formats
   - Solution: Implemented comprehensive error checking

2. **Unit Conversion:**
   - Challenge: Maintaining state between unit changes
   - Solution: Stored original Celsius value in data attribute

3. **Geolocation:**
   - Challenge: Handling permission denials
   - Solution: Added fallback error messages

4. **Responsive Design:**
   - Challenge: Mobile-friendly layout
   - Solution: Used media queries and flexible units

