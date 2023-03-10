const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
let searchKey;
searchBtn.addEventListener('click', getRecipes);

// / get meal list that matches with the ingredients
function getRecipes() {
  let searchInputTxt = document.getElementById('search-input').value.trim();
  console.log(searchInputTxt.length);
  fetch(`https://api.spoonacular.com/recipes/search?apiKey=d03a24375b30427a863ee13274b2ca29&number=6&query=${searchInputTxt}`)
  .then(response=>response.json())
  .then(data => {
    let html = " ";
    if(data.results.length > 0){
      data.results.forEach(results => {
        html += `
        <div class="meal-item" data-id = "${results.id}">
           <div class="meal-name">
           <h3>${results.title}</h3>
         </div>
         <div class="meal-img">
           <img id="image-element"/>
           <img src = "https://spoonacular.com/recipeImages/${results.id}-480x360.jpg" alt="food">
         </div>
         <div class="meal-name">
           <h3>Time: ${results.readyInMinutes} minutes</h3>
         </div>
         <div class="meal-numPeople">
           <h3>No.serving: ${results.servings}</h3>
         </div>
         <div class="meal-link" >
           <button id="recipe-btn" onclick="window.open('${results.sourceUrl}', '_blank');">Get Recipe</button>
         </div>
        </div>
        `;
        });
      mealList.classList.remove('notFound');

      mealList.innerHTML = html;
      
      // Create a new array for the search results
      let searchResults = data.results;

      // Generate a unique key for the search results
      let searchKey = Date.now();

      // Save the search results to local storage using the unique key
      localStorage.setItem(searchKey, JSON.stringify(searchResults));

      // Display the search results on the page
      displayLastSearchResult(searchResults);

    } else {
        html = "Sorry, we didn't find any meal!";
        mealList.classList.add('notFound');
        mealList.innerHTML = html;
    }
  });
}

function displayLastSearchResult() {
  // Retrieve the keys for the saved searches from local storage
  let searchKeys = Object.keys(localStorage);

  // Sort the searchKeys array in descending order
  searchKeys.sort((a, b) => b - a);

  // Get the three most recent search keys
  let recentSearchKeys = searchKeys.slice(0, 3);

  // Retrieve the search results for the first key in the recentSearchKeys array
  let searchResults;
  if (localStorage.getItem(recentSearchKeys[0]) !== null && localStorage.getItem(recentSearchKeys[0]) !== undefined) {
    searchResults = JSON.parse(localStorage.getItem(recentSearchKeys[0]));
  } else {
    searchResults = null;
  }
  // Get the first result from the search results
  let result = searchResults[0];

  // Create a new element to hold the search result
  let resultElement = document.createElement("div");
  resultElement.classList.add("search-result");

  // Add the search result to the element
  resultElement.innerHTML = `
    <h2>Your Previous Search</h3>
    <h3>${result.title}</h3>
    <img src="https://spoonacular.com/recipeImages/${result.id}-480x360.jpg" alt="Food image">
    <p>Time: ${result.readyInMinutes} minutes</p>
    <p>No.serving: ${result.servings}</p>
    <button onclick="window.open('${result.sourceUrl}', '_blank');">Get Recipe</button>
  `;

  // Add the element to the page
  document.getElementById("search-results").appendChild(resultElement);
}

// Display the search results on the page
displayLastSearchResult();


var weatherButtonEl = document.querySelector('#weather-btn');

weatherButtonEl.addEventListener('click', function() {
  modal.style.display = 'block';  
});

function openModalAndShowData(modalId, apiUrl) {
  // Get a reference to the modal element
  modal = document.getElementById(modalId);

  // Show the modal
  modal.style.display = "none";

  // Get the data from the API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Get a reference to the element where you want to display the data
      weatherContainer = modal.querySelector(".weather-content");
    

      // Clear any existing content in the data container
      weatherContainer.innerHTML = "";

      // Convert the temperature from kelvin to degrees Celsius
      var tempInCelsius = data.main.temp - 273.15;
      var tempInCelsiusRounded = tempInCelsius.toFixed(1);

      // Append the data to the data container
      weatherContainer.innerHTML = `<p>Description: ${data.weather[0].description}</p><p> Temperature: ${tempInCelsiusRounded }\u00B0C</p>`;
   });
}
      
openModalAndShowData("weatherModal", "https://api.openweathermap.org/data/2.5/weather?appid=87958847951be2c7b9a53baa9876f938&q=Sydney");

// Close the modal when the close button is clicked
var closeButtons = document.querySelectorAll(".close");
closeButtons.forEach(button => {
  button.addEventListener("click", () => {
    modal.style.display = "none";
  });
});

// Close the modal when the user clicks outside of the modal
window.addEventListener("click", event => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});