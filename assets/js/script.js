const searchBtn = document.getElementById('search');

searchBtn.addEventListener('click', getRecipes);

function getRecipes(query) {
    $.ajax({
        url: "https://api.spoonacular.com/recipes/search?apiKey=d03a24375b30427a863ee13274b2ca29&number=6&query=" + query,
        success: function(res) {
            
            // Clear the output element
             document.getElementById("output").innerHTML = "";
             
             // Loop through the results and create a div for each recipe
             for (let i = 0; i < res.results.length; i++) {
                let recipe = res.results[i];
                let recipeDiv = document.createElement("div");
                recipeDiv.innerHTML = "<h1>" + recipe.title + "</h1><br><img src='" + res.baseUri + recipe.image + "' width='400'/><br> ready in " + recipe.readyInMinutes + " minutes" + "<br><a href='" + recipe.sourceUrl +"'>Link to recipe</a>";
                document.getElementById("output").appendChild(recipeDiv);
            }
        }
    });
}


// function getrecepe(query){
//     $.ajax({
//         url:"https://api.spoonacular.com/recipes/search?apiKey=d03a24375b30427a863ee13274b2ca29&number=1&query="+query,
//         success: function(res){
//                 document.getElementById("output").innerHTML = "<h1>" + res.results[0].title + "</h1><br><img src='" + res.baseUri + res.results[0].image + "' width='400'/><br> ready in " + res.results[0].readyInMinutes + " minutes" + "<br><a href='" + res.results[0].sourceUrl +"'>Link to recipe</a>";
//         }
//     })
// }

