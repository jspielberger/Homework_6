$(document).ready(function() {

    function convertkelvin(temp) {
        let farenheit = (temp - 273.15) * 1.80 + 32;
        return farenheit.toFixed(2);
    }


    let citylist = JSON.parse(localStorage.getItem('citylist')) || [];
    let today = $("#today")
    let forecast = $('#forecast')
///creating an ajax call for the current weather
    function displayWeatherInfo(x) {
//if(x){return x}else{return $('#search-value').val().trim()}
        let cityname =  x ? x : $('#search-value').val().trim();
        let queryURL =  `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=ff08eb5d4213f782c579bf4227c2f56d`;

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(res) {
            citylist.push(cityname);
            localStorage.setItem('citylist', JSON.stringify(citylist));
            console.log(citylist)
            console.log(res.name);
            let windspeed = res.wind.speed + " mph wind";
            let city = res.name;
            let humidity = res.main.humidity + "% humidity"
            console.log(windspeed);
            console.log(humidity);

            let faren = convertkelvin(res.main.temp) + " degrees farenheit"
            console.log(faren);
            let currenttemp = $('<h1>').text(faren);
            today.append(currenttemp);
            $.ajax({
                url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=ff08eb5d4213f782c579bf4227c2f56d`,
                method: "GET"
            }).then(function(response) {
                console.log(response);
            })


        renderCityButtons();

        }
    )}


// /****-----AJAX for forecast------>*****/












   $(document).on("click", ".btn-primary", displayWeatherInfo);
  
   function renderCityButtons() {
    $(".list-group").empty();

    // Deleting the citylist prior to adding new citylist
    // (this is necessary otherwise you will have repeat buttons)

    // Looping through the array of citylist
    for (var i = 0; i < citylist.length; i++) {

      // Then dynamicaly generating buttons for each city in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      let a = $("<button>");
      // Adding a class of movie-btn to our button
      // Adding a data-attribute
      a.attr("data-name", citylist[i]);
      // Providing the initial button text
      a.text(citylist[i]);
      // Adding the button to the buttons-view div
      $(".list-group").prepend(a);
    }
  }
renderCityButtons()
  




// https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=64ecd4e2b1daf24893c7fe8f010611d5

// let cityname = response.name;




//   // This function handles events where a city button is clicked
  $(document).on("click", 'button', function(event) {
    event.preventDefault();
    if($(this).attr('data-name')) {

     
    // This line grabs the input from the textbox
    displayWeatherInfo($(this).attr('data-name'));
    }
  });


});

  // Adding a click event listener to all elements with a class of "movie-btn"
 

//   //**need to  */

//   // Calling the renderButtons function to display the initial buttons
//   renderButtons();
// </script>
