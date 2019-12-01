$(document).ready(function () {

    var urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get("location"));
    var location = urlParams.has("location") ? urlParams.get("location") : "";
    var city = urlParams.has("city") ? urlParams.get("location") : "";
    var state = urlParams.has("state") ? urlParams.get("state") : "";
    var date = urlParams.has("date") ? urlParams.get("date") : "";
    console.log(date);
    var startDate = date + 'T01:01:01Z'
    var endDate = date + 'T23:00:00Z'
    console.log(startDate);
    console.log(endDate);

    var zip = urlParams.has("zip") ? urlParams.get("zip") : "";
    $("#startbtn").on("click", function (event) {
        event.preventDefault();

        location = $("#inputLocationCity").val().trim();
        city = location;
        state = $("#inputLocationState").val().trim();
        date = $("#inputDate").val().trim();
        zip = $('#zip-code').val().trim();

       
        if (state === '' || date === '' || city === '' || zip === '') {
            var inputError = $('<p>').addClass('text-white').text('All fields are required');
            $('#inputError').html(inputError);
        }
        else {
            // next page
            window.location.href = `results.html?location=${location}&city=${city}&zip=${zip}&date=${date}&state=${state}`;
        };
    });

   
    function displayCriteria() {
        $('#userLocation').html(city + ', ' + state);
        $("#userZip").html(zip);
        $("#userDate").html(date);
    }
    displayCriteria();
/////////////////////////////////////////////////////////////////////////////////////////
    function displayResultsWeather() {
        var APIKey = "fb772a8e17e69d4f1ba458da03f91b22";

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
            "q=" + location + "&units=imperial&appid=" + APIKey;

        //  OpenWeatherMap API
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            
            console.log('-----WEATHER-----')

            var windMPH = Math.floor(response.wind.speed * 2.237);
            var tempF = Math.floor(response.main.temp);

            // Log in the console
            console.log("Temperature (F): " + tempF);
            console.log("Wind Speed: " + windMPH);
            console.log("Humidity: " + response.main.humidity + ' %');

            var weatherDiv = $('<div>');
            var pTemp = $('<p>').append("Temperature: " + tempF + 'F');
            var pWind = $('<p>').append("Wind Speed: " + windMPH + 'mph');
            var pHumidity = $('<p>').append("Humidity: " + response.main.humidity + '%');

            weatherDiv.append(pTemp);
            weatherDiv.append(pWind);
            weatherDiv.append(pHumidity);
            $('#weatherResults').append(weatherDiv);
        });
    };
////////////////////////////////////////////////////////////////////////
   

    function displayResultsFood() {
        var queryURL = 'https://opentable.herokuapp.com/api/restaurants?city=' + city + '&state=' + state + '&per_page=5';
     
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
            console.log('-----RESTAURANTS-----')

            var restaurants = response.restaurants;
            for (var i = 0; i < restaurants.length; i++) {
                console.log(response.restaurants[i].name);
                console.log(response.restaurants[i].address);
                console.log(response.restaurants[i].city);
                console.log(response.restaurants[i].phone);
                console.log(response.restaurants[i].reserve_url);

                var restCard = $('<div>').addClass('card');
                var pRestName = $('<h5>').addClass('card-title');
                pRestName.append(response.restaurants[i].name);

                var pRestAddress = $('<h6>').addClass('card-text')
                pRestAddress.append(response.restaurants[i].address + ' , ' + response.restaurants[i].city);

                var pRestPhone = $('<p>').addClass('card-text');
                pRestPhone.append(response.restaurants[i].phone);

                var pRestReserve = $('<a href=' + response.restaurants[i].reserve_url + '>').addClass('btn btnbook btn-primary').attr('id', 'reserveBtn').text('Reserve Now')

                restCard.append(pRestName);
                restCard.append(pRestAddress);
                restCard.append(pRestPhone);
                restCard.append(pRestReserve);
                $('#restResults').append(restCard);
            }
        });
    };
////////////////////////////////////////////////////////////////////////////////////////

 function displayResultsNews() {
     // News
     // var city= "Nashville";
     // var state= "TN";

     var queryURL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=d70491ee3de24f4da475f3641036fcee?city=' + city + '&state=' + state + '&per_page=5';
    
    //  var APIKey = "e4fdc03b19msh486e9330a1b8009p1a019ejsn316a69f81941";
    // var queryURL = "https://newsapi.org/v2/top-headlines" +
    //     "q=" + location + "&units=imperial&appid=" + APIKey;

   
     $.ajax({
         url: queryURL,
         method: "GET"
     }).then(function (response) {
        
         console.log('-----News-----')
         var news = response.news;
         for (var i = 0; i < news.length; i++) {
             console.log(response.news[i].name);
             console.log(response.news[i].city);
             console.log(response.news[i].date);
    
             var newsCard = $('<div>').addClass('card');
             
             var pNewsName = $('<h5>').addClass('card-title');
                pNewsName.append(response.news[i].name);
            
             var pNewsAddress = $('<h5>').addClass('card-title');
             pRestAddress.append(response.news[i].address + ' , ' + response.news[i].city);
            //  pNewsName.append(response.news[i].city);

             var pNewsDate = $('<h6>').addClass('card-text')
             pNewsDate.append(response.news[i].date);

             newsCard.append(pNewsName);
             newsCard.append(pNewsAddress);
             newsCard.append(pNewsDate);

             $('#newsResults').append(newsCard);
         }

     });
 };


    displayResultsWeather();
    displayResultsFood();
    displayResultsNews();
   

});