<input id="search"><button onclick="getrecepe(document.getElementById('search').value)">Search</button>
<div id="output"></div>
<a href="sourceLink"></a>
<script>
    function getrecepe(query){
        $.ajax({
            url:"https://api.spoonacular.com/recipes/search?apiKey=d03a24375b30427a863ee13274b2ca29&number=1&query="+query,
            success: function(res){
                    document.getElementById("output").innerHTML = "<h1>" + res.results[0].title + "</h1><br><img src='" + res.baseUri + res.results[0].image + "' width='400'/><br> ready in " + res.results[0].readyInMinutes + " minutes" + "<br><a href='" + res.results[0].sourceUrl +"'>Link to recipe</a>";
            }
        })
        }
</script>