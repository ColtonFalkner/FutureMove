$(document).ready(function() {
  var urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get("location"));
  var location = urlParams.has("location") ? urlParams.get("location") : "";
  var city = urlParams.has("city") ? urlParams.get("location") : "";
  var state = urlParams.has("state") ? urlParams.get("state") : "";
  var date = urlParams.has("date") ? urlParams.get("date") : "";
  console.log(date);
  var startDate = date + "T01:01:01Z";
  var endDate = date + "T23:00:00Z";
  console.log(startDate);
  console.log(endDate);

  var zip = urlParams.has("zip") ? urlParams.get("zip") : "";
  $("#startbtn").on("click", function(event) {
    event.preventDefault();

    location = $("#inputLocationCity")
      .val()
      .trim();
    city = location;
    state = $("#inputLocationState")
      .val()
      .trim();
    date = $("#inputDate")
      .val()
      .trim();
    zip = $("#zip-code")
      .val()
      .trim();

    if (state === "" || date === "" || city === "" || zip === "") {
      var inputError = $("<p>")
        .addClass("text-white")
        .text("All fields are required");
      $("#inputError").html(inputError);
    } else {
      // next page
      window.location.href = `results.html?location=${location}&city=${city}&zip=${zip}&date=${date}&state=${state}`;
    }
  });

  function displayCriteria() {
    $("#userLocation").html(city + ", " + state);
    $("#userZip").html(zip);
    $("#userDate").html(date);
  }
  displayCriteria();
  /////////////////////////////////////////////////////////////////////////////////////////
  function displayResultsWeather() {
    var APIKey = "fb772a8e17e69d4f1ba458da03f91b22";

    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?" +
      "q=" +
      location +
      "&units=imperial&appid=" +
      APIKey;

    //  OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log("-----WEATHER-----");

      var windMPH = Math.floor(response.wind.speed * 2.237);
      var tempF = Math.floor(response.main.temp);

      // Log in the console
      console.log("Temperature (F): " + tempF);
      console.log("Wind Speed: " + windMPH);
      console.log("Humidity: " + response.main.humidity + " %");

      var weatherDiv = $("<div>");
      var pTemp = $("<p>").append("Temperature: " + tempF + "F");
      var pWind = $("<p>").append("Wind Speed: " + windMPH + "mph");
      var pHumidity = $("<p>").append(
        "Humidity: " + response.main.humidity + "%"
      );

      weatherDiv.append(pTemp);
      weatherDiv.append(pWind);
      weatherDiv.append(pHumidity);
      $("#weatherResults").addClass("animated fadeIn")
      $("#weatherResults").append(weatherDiv);
    });
  }
  ////////////////////////////////////////////////////////////////////////

  function displayResultsFood() {
    var queryURL =
      "https://opentable.herokuapp.com/api/restaurants?city=" +
      city +
      "&state=" +
      state +
      "&per_page=5";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log("-----RESTAURANTS-----");

      var restaurants = response.restaurants;
      for (var i = 0; i < restaurants.length; i++) {
        console.log(response.restaurants[i].name);
        console.log(response.restaurants[i].address);
        console.log(response.restaurants[i].city);
        console.log(response.restaurants[i].phone);
        console.log(response.restaurants[i].reserve_url);

        var restCard = $("<div>").addClass("card");
        var pRestName = $("<h5>").addClass("card-title");
        pRestName.append(response.restaurants[i].name);

        var pRestAddress = $("<h6>").addClass("card-text");
        pRestAddress.append(
          response.restaurants[i].address + " , " + response.restaurants[i].city
        );

        var pRestPhone = $("<p>").addClass("card-text");
        pRestPhone.append(response.restaurants[i].phone);

        var pRestReserve = $(
          "<a href=" + response.restaurants[i].reserve_url + ">"
        )
          .addClass("btn btnbook btn-primary")
          .attr("id", "reserveBtn")
          .text("Reserve Now");

        restCard.append(pRestName);
        restCard.append(pRestAddress);
        restCard.append(pRestPhone);
        restCard.append(pRestReserve);
        $("#restResults").addClass("animated fadeIn")
        $("#restResults").append(restCard);
      }
    });
  }

  /////////////////////////Real Estate/////////////////////////////
  ////////////////////////////Listings/////////////////////////////
  function displayListings() {
    var propertySnapshot = {
      async: true,
      crossDomain: true,
      url:
        "https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/snapshot?postalcode=" + zip + "&minUniversalSize=1200&maxUniversalSize=1800",
      method: "GET",
      headers: {
        apikey: "0da31fe50c76d41e8f480520b54d9a17",
        accept: "application/json"
      }
    };
    $.ajax(propertySnapshot).done(function(response) {
      for (var i = 0; i < response.property.length; i++) {
        console.log(response.property[i].address.oneLine);
        console.log(response.property[i].building.rooms.bathstotal);
        console.log(response.property[i].building.rooms.beds);
        console.log(response.property[i].summary.propclass);
        // console.log(response.property[i].location.longitude);
        // console.log(response.property[i].location.latitude);

        var listCard = $("<div>").addClass("card");
        // google static would go here.
        // break into strings
        // https://maps.googleapis.com/maps/api/streetview?size=400x400&location=36.117517,-86.795829&fov=80&heading=70&pitch=0&key=AIzaSyD3AaKsnG30BuneEamtN6UHK7c4ngLaXug
        var long = response.property[i].location.longitude;
        console.log(long);
        var lat = response.property[i].location.latitude;
        console.log(lat);
        var listPic = $("<img>").attr(
          "src",
          "https://maps.googleapis.com/maps/api/streetview?size=400x200&location=" +
            lat +
            "," +
            long +
            "&fov=80&heading=70&pitch=0&key=AIzaSyD3AaKsnG30BuneEamtN6UHK7c4ngLaXug"
        );

        var listAddress = $("<h5>").addClass("card-title");
        listAddress.append(response.property[i].address.oneLine);

        var listBath = $("<h6>").addClass("card-title");
        listBath.append(
          "Bathrooms: " + response.property[i].building.rooms.bathstotal
        );

        var listRooms = $("<h6>").addClass("card-title");
        listRooms.append(
          "Bedrooms: " + response.property[i].building.rooms.beds
        );

        var listClass = $("<h6>").addClass("card-text");
        listClass.append(response.property[i].summary.propclass);

        listCard.append(listPic);
        listCard.append(listAddress);
        listCard.append(listRooms);
        listCard.append(listClass);
        listCard.append(listBath);
        listCard.append(listRooms);
       $("#listResults").addClass("animated fadeIn")
        $("#listResults").append(listCard);
      }
    });
  }

  


  

  displayListings();
  displayResultsWeather();
  displayResultsFood();
  // displayResultsNews();
});
