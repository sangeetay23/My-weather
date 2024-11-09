## Weather App Documentation

This documentation describes the files and code for a simple weather application. 

**Files:**

* **weather.html:** The main HTML file that defines the structure of the application.
* **weather.js:** The JavaScript file that handles user input, fetches weather data from the OpenWeatherMap API, and displays the information.
* **weather.css:** The CSS file that styles the application's appearance.

**Explanation:**

**1. weather.html:**

* **DOCTYPE declaration:** Specifies the document type as HTML5.
* **`<html lang="en">`:** Defines the HTML document, setting the language to English.
* **`<head>`:**
    * **`<meta charset="UTF-8">`:** Sets the character encoding to UTF-8 for proper display of various characters.
    * **`<meta name="viewport" content="width=device-width, initial-scale=1.0">`:** Defines the viewport meta tag, ensuring the page is responsive across devices.
    * **`<title>Weather App</title>`:** Sets the title of the HTML document, which appears in the browser tab.
    * **`<link rel="stylesheet" href="weather.css">`:** Links the external stylesheet (weather.css) for styling the page.
* **`<body>`:**
    * **`<div class="container">`:** A container element to group the main content of the application.
        * **`<h1>Weather App</h1>`:** The heading for the application.
        * **`<input id="int" type="text" placeholder="Enter city name">`:** An input field for the user to enter a city name.
        * **`<button id="btn">Get Weather</button>`:** A button that triggers the weather data retrieval process.
        * **`<div id="result"></div>`:** A div element where the weather information will be displayed.
    * **`<script src="weather.js"></script>`:** Links the external JavaScript file (weather.js) for functionality.

**2. weather.js:**

* **`const apikey = "0a2ef01eb1c7ea26f88f6df9052c2d53";`:** Defines the API key for accessing the OpenWeatherMap API. **Please replace this with your own API key from OpenWeatherMap.**
* **`const btn = document.getElementById("btn");`:**  Gets a reference to the "Get Weather" button.
* **`const input = document.getElementById("int");`:** Gets a reference to the input field for city name.
* **`const result = document.getElementById("result");`:** Gets a reference to the div element for displaying the weather information.
* **`btn.addEventListener("click", () => { ... });`:** Adds an event listener to the button. When clicked, it triggers the function inside.
    * **`const city = input.value.trim();`:** Gets the city name from the input field and removes any leading/trailing spaces.
    * **`if (city) { ... } else { ... }`:** Checks if the city input is not empty. 
        * If the city name is valid, it calls `getWeather(city)` to fetch weather data.
        * If the city name is empty, it displays an error message in `result`.
* **`async function getWeather(city) { ... }`:** This function is responsible for fetching weather data using the OpenWeatherMap API.
    * **`const response = await fetch( ... );`:** Makes a network request to the API using the city name and API key. 
    * **`if (!response.ok) { ... }`:** Checks if the request was successful. If not, it throws an error.
    * **`const data = await response.json();`:** Parses the response data into a JavaScript object.
    * **`displayWeather(data);`:** Calls the `displayWeather` function to present the data in a readable format.
    * **`catch (error) { ... }`:** Handles any errors that might occur during the fetch process.
* **`function displayWeather(data) { ... }`:**  Takes the weather data and displays it in the `result` div. 
    * **`const weatherDescription = data.weather[0].main;`:** Gets the main weather description (e.g., "Clear", "Clouds", etc.).
    * **`document.body.style.backgroundImage = ...;`:** Sets the background image of the body element based on the weather description.
    * **`result.innerHTML = ...;`:** Populates the `result` div with the weather information, including city name, temperature, description, and humidity.
* **`const getBackgroundImage = (weatherType) => { ... }`:** This function maps weather descriptions to corresponding background image URLs.

**3. weather.css:**

* **`body { ... }`:** Styles the body of the page.
    * **`font-family: 'Poppins', sans-serif;`:** Sets the default font to "Poppins".
    * **`background-image: ...;`:** Sets a default background image.
    * **`background-size: cover;`:** Ensures the background image covers the entire page.
    * **`text-align: center;`:** Centers the text content.
    * **`padding: 50px;`:** Adds padding to the body.
    * **`justify-content: center;`:** Centers the container horizontally.
    * **`display: flex;`:** Enables flexbox layout.
* **`.container { ... }`:** Styles the main container.
    * **`background-color: rgba(142, 231, 231, 0.4);`:** Sets the background color with a semi-transparent effect.
    * **`border: none;`:** Removes the default border.
    * **`border-radius: 12px;`:** Adds rounded corners.
    * **`height: 500px;`:** Sets the height of the container.
    * **`width: 500px;`:** Sets the width of the container.
    * **`box-shadow: 0 6px 15px rgba(148, 41, 41, 0.1);`:** Adds a shadow effect.
    * **`padding: 20px;`:** Adds padding to the container.
* **`#int { ... }`:** Styles the input field.
* **`#btn { ... }`:** Styles the button.
* **`#result { ... }`:** Styles the div where weather information is displayed.
* **`@media (max-width: 765px) { ... }` and `@media (max-width: 480px) { ... }`:** These are media queries that adjust the styling for different screen sizes, ensuring responsiveness.

**To run the application:**

1. Make sure you have a web browser.
2. Open `weather.html` in your browser.
3. Enter a city name in the input field and click the "Get Weather" button.
4. The weather information for the entered city will be displayed.

**To customize:**

* **Change the default background image:** Modify the `background-image` property in the `body` styles in `weather.css`.
* **Add more weather conditions to the `getBackgroundImage` function:** Add more weather descriptions and corresponding images to the `backgroundImages` object.
* **Modify the CSS:** Adjust colors, fonts, padding, etc. to personalize the look and feel.
* **Update the API key:** Replace the placeholder API key in `weather.js` with your own key from OpenWeatherMap.

This documentation should help you understand the structure and functionality of the weather app. Feel free to modify and enhance it further to suit your needs.
