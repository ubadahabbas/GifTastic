
        var buttons =$(".btns");
        var topics =['HTGAWM','Atypical','Stranger Things','Black Mirror','The Good Place','AHS','Family Guy','Mr.Robot','The handmaids Tale'];

        function renderButtons() {
             buttons.empty()
        for (var i=0; i<topics.length;i++){
            var newButton = $('<button>');
            newButton.addClass("btn btn-info btns");
            newButton.text(topics[i]);
            newButton.val(topics[i])
            newButton.attr("data-name",topics[i])
            buttons.append(newButton);
        
            }
        }
         renderButtons();


    function giphsTastic (x){
        var giphs = $("#giphs");
        giphs.empty();
        var clickedButton = x;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            clickedButton + "&api_key=RzMrz5WnZ5rpmi7ehin9gqvWkU0tbYcw";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            var results = response.data;
            console.log(results);
            for (var j=0; j<10; j++){
               
                var image=$("<img>");
                  image.addClass("styleme")
                  image.attr("src", results[j].images.fixed_height_still.url);
                  image.attr("animate",results[j].images.fixed_height.url);
                  image.attr("still",results[j].images.fixed_height_still.url);
                  giphs.append(image)
                  giphs.append('<p> Rating: ' +results[j].rating.toUpperCase() + '<p>');    
                  
            }

            $(giphs).on("click",".styleme", function (){
                var imageUrl = $(this).attr('src');
                var animate = $(this).attr('animate');
                var still = $(this).attr('still');
                if (imageUrl === still){
                    $(this).attr('src', animate);
                } else {
                    $(this).attr('src', still);
                }
         
         })
        
    })
};
    $(document).ready(function() {

        $("#add-button").on("click", function(){
            event.preventDefault();
            var userInput= $("#user-input").val().trim();
            topics.push(userInput);
            renderButtons (topics);
             $("#user-input").val("");
        });

    $(document).on("click", ".btns", function(){ 
      
        var x=$(this).val();
        console.log(x)
         giphsTastic(x);
    });
    });
