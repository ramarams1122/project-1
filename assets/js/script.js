const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
// const imageFile = results.data;
// const imageElement = document.getElementById('meal-image');
// const reader = new FileReader();


searchBtn.addEventListener('click', getRecipes);

// function getRecipes(query) {
//     $.ajax({
//         url: "https://api.spoonacular.com/recipes/search?apiKey=d03a24375b30427a863ee13274b2ca29&number=6&query=" + query,
//         success: function(res) {
            
//             // Clear the output element
//              document.getElementById("output").innerHTML = "";
             
//              // Loop through the results and create a div for each recipe
//              for (let i = 0; i < res.results.length; i++) {
//                 let recipe = res.results[i];
//                 let recipeDiv = document.createElement("div");
//                 recipeDiv.innerHTML = "<h1>" + recipe.title + "</h1><br><img src='" + res.baseUri + recipe.image + "' width='400'/><br> ready in " + recipe.readyInMinutes + " minutes" + "<br><a href='" + recipe.sourceUrl +"'>Link to recipe</a>";
//                 document.getElementById("output").appendChild(recipeDiv);
//             }
//         }
//     });
// }

// $(document).ready(function() {
//     const searchBtn = document.getElementById('search');
  
//     searchBtn.addEventListener('click', function getRecipe(query) {
//       console.log("button clicked");
  
//       $.ajax({
//         url: "https://api.spoonacular.com/recipes/search?apiKey=d03a24375b30427a863ee13274b2ca29&number=6&query=" + query,
//         success: function(res) {
//           // Clear the output element
//           document.getElementById("output").innerHTML = "";
  
//           // Loop through the results and create a div for each recipe
//           for (let i = 0; i < res.results.length; i++) {
//             let recipe = res.results[i];
//             let recipeDiv = document.createElement("div");
//             recipeDiv.innerHTML = "<h1>" + recipe.title + "</h1><br><img src='" + res.baseUri + recipe.image + "' width='400'/><br> ready in " + recipe.readyInMinutes + " minutes" + "<br><a href='" + recipe.sourceUrl +"'>Link to recipe</a>";
//             document.getElementById("output").appendChild(recipeDiv);
//           }
//         }
//       });
//     });
// });


// $(document).ready(searchBtn.addEventListener('click', function getRecipe(query) {
    
//     console.log("button clicked");

//     $.ajax({
//         url: "https://api.spoonacular.com/recipes/search?apiKey=d03a24375b30427a863ee13274b2ca29&number=6&query=" + query,
//         success: function(res) {
//             // Clear the output element
//              document.getElementById("output").innerHTML = "";
             
//              // Loop through the results and create a div for each recipe
//              for (let i = 0; i < res.results.length; i++) {
//                 let recipe = res.results[i];
//                 let recipeDiv = document.createElement("div");
//                 recipeDiv.innerHTML = "<h1>" + recipe.title + "</h1><br><img src='" + res.baseUri + recipe.image + "' width='400'/><br> ready in " + recipe.readyInMinutes + " minutes" + "<br><a href='" + recipe.sourceUrl +"'>Link to recipe</a>";
//                 document.getElementById("output").appendChild(recipeDiv);
//             }
//         }
// });
// }))


// function getrecepe(query){
//     $.ajax({
//         url:"https://api.spoonacular.com/recipes/search?apiKey=d03a24375b30427a863ee13274b2ca29&number=1&query="+query,
//         success: function(res){
//                 document.getElementById("output").innerHTML ="<h1>"+res.results[0].title+"</h1><br><img src='"+res.baseUri+res.results[0].image+"'width='400'/><br> ready in "+res.results[0].readyInMinutes+" minutes"+"<br><a href='"+res.results[0].sourceUrl+"'>Link to recipe</a>";
//         }
//     })
// }

// / get meal list that matches with the ingredients
function getRecipes() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    console.log(searchInputTxt.length);
    fetch(`https://api.spoonacular.com/recipes/search?apiKey=d03a24375b30427a863ee13274b2ca29&number=6&query=${searchInputTxt}`)
    .then(response=>response.json())
    .then(data => {
        let html = " ";
        if(data.results){
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
                        <div class=class="meal-numPeople">
                            <h3>No.serving: ${results.servings}</h3>
                        </div>
                        <div class="meal-link">
                            <button onclick="window.open('${results.sourceUrl}', '_blank');">Get Recipe</button>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    })
}

function openModalAndShowData(modalid, apiUrl) {
    // Get a reference to the modal element
    const modal = document.getElementById("weatherModal");
    
    // Show the modal
    $(modal).modal("show");
    
    // Get the data from the API
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Get a reference to the element where you want to display the data
        const weatherContainer = modal.querySelector(".weather-content");
    
        // Clear any existing content in the data container
        weatherContainer.innerHTML = "";
    
        // Append the data to the data container
        weatherContainer.innerHTML = `<p>Description: ${data.weather[0].description}</p><p>Temperature: ${data.main.temp}</p>`;
      });
  }
  
  openModalAndShowData("weatherModal", "https://api.openweathermap.org/data/2.5/weather?appid=87958847951be2c7b9a53baa9876f938&q=Sydney");
  