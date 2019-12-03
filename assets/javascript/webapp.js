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
        "https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/snapshot?postalcode=37212&minUniversalSize=1200&maxUniversalSize=1800",
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
        console.log(response.property[i].location.longitude);
        console.log(response.property[i].location.latitude)

      
        var listCard = $("<div>").addClass("card");

        var listAddress = $("<h5>").addClass("card-title");
        listAddress.append(response.property[i].address.oneLine);

        var listBath = $("<h6>").addClass("card-title");
        listBath.append("Bathrooms: " + response.property[i].building.rooms.bathstotal);

        var listRooms = $("<h6>").addClass("card-title");
        listRooms.append("Bedrooms: " + response.property[i].building.rooms.beds);


        var listClass = $("<h6>").addClass("card-text");
        listClass.append(response.property[i].summary.propclass);

        listCard.append(listAddress);
        listCard.append(listRooms);
        listCard.append(listClass);
        listCard.append(listBath);
        listCard.append(listRooms);
        

        $("#listResults").append(listCard);

        
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////

  //  function displayResultsNews() {
  //      // News
  //      // var city= "Nashville";
  //      // var state= "TN";

  //     //  var queryURL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=d70491ee3de24f4da475f3641036fcee?city=' + city + '&state=' + state + '&per_page=5';

  //     //  var APIKey = "e4fdc03b19msh486e9330a1b8009p1a019ejsn316a69f81941";
  //     // var queryURL = "https://newsapi.org/v2/top-headlines" +
  //     //     "q=" + location + "&units=imperial&appid=" + APIKey;
  //     //NYT URL and KEY
  //     // var APIkey = "XkW2IzM4i0EL3Gyzv9MPMSBVFdJ95geE";
  //     // var queryURL = "https://api.nytimes.com/svc/topstories/v2/science.json?api-key=yourkey"

  //     var queryURL = 'https://api.nytimes.com/svc/topstories/v2/science.json?api-key=XkW2IzM4i0EL3Gyzv9MPMSBVFdJ95geE' + city + '&state=' + state + '&per_page=5';

  //      $.ajax({
  //          url: queryURL,
  //          method: "GET"
  //      }).then(function (response) {

  //          console.log('-----News-----')
  //          var news = response.news;
  //          for (var i = 0; i < news.length; i++) {
  //              console.log(response.news[i].name);
  //              console.log(response.news[i].city);
  //              console.log(response.news[i].date);

  //              var newsCard = $('<div>').addClass('card');

  //              var pNewsName = $('<h5>').addClass('card-title');
  //                 pNewsName.append(response.news[i].name);

  //              var pNewsAddress = $('<h5>').addClass('card-title');
  //              pRestAddress.append(response.news[i].address + ' , ' + response.news[i].city);
  //             //  pNewsName.append(response.news[i].city);

  //              var pNewsDate = $('<h6>').addClass('card-text')
  //              pNewsDate.append(response.news[i].date);

  //              newsCard.append(pNewsName);
  //              newsCard.append(pNewsAddress);
  //              newsCard.append(pNewsDate);

  //              $('#newsResults').append(newsCard);
  //          }

  //      });
  //  };
  ("@returns {string}");
  //URL for NYT API based on form inputs

  function buildQueryURL() {
    // queryURL is the url we'll use to query the API
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

    // Begin building an object to contain our API call's query parameters
    // Set the API key
    var queryParams = { "api-key": "R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M" };

    // Grab text the user typed into the search input, add to the queryParams object
    queryParams.q = $("#search-term")
      .val()
      .trim();

    // If the user provides a startYear, include it in the queryParams object
    var startYear = $("#start-year")
      .val()
      .trim();

    if (parseInt(startYear)) {
      queryParams.begin_date = startYear + "0101";
    }

    // If the user provides an endYear, include it in the queryParams object
    var endYear = $("#end-year")
      .val()
      .trim();

    if (parseInt(endYear)) {
      queryParams.end_date = endYear + "0101";
    }

    // Logging the URL so we have access to it for troubleshooting
    console.log("---------------\nURL: " + queryURL + "\n---------------");
    console.log(queryURL + $.param(queryParams));
    return queryURL + $.param(queryParams);
  }

  /**
   * takes API data (JSON/object) and turns it into elements on the page
   * @param {object} NYTData - object containing NYT API data
   */
  function updatePage(NYTData) {
    // Get from the form the number of results to display
    // API doesn't have a "limit" parameter, so we have to do this ourselves
    var numArticles = $("#article-count").val();

    // Log the NYTData to console, where it will show up as an object
    console.log(NYTData);
    console.log("------------------------------------");

    // Loop through and build elements for the defined number of articles
    for (var i = 0; i < numArticles; i++) {
      // Get specific article info for current index
      var article = NYTData.response.docs[i];

      // Increase the articleCount (track article # - starting at 1)
      var articleCount = i + 1;

      // Create the  list group to contain the articles and add the article content for each
      var $articleList = $("<ul>");
      $articleList.addClass("list-group");

      // Add the newly created element to the DOM
      $("#article-section").append($articleList);

      // If the article has a headline, log and append to $articleList
      var headline = article.headline;
      var $articleListItem = $("<li class='list-group-item articleHeadline'>");

      if (headline && headline.main) {
        console.log(headline.main);
        $articleListItem.append(
          "<span class='label label-primary'>" +
            articleCount +
            "</span>" +
            "<strong> " +
            headline.main +
            "</strong>"
        );
      }

      // If the article has a byline, log and append to $articleList
      var byline = article.byline;

      if (byline && byline.original) {
        console.log(byline.original);
        $articleListItem.append("<h5>" + byline.original + "</h5>");
      }

      // Log section, and append to document if exists
      var section = article.section_name;
      console.log(article.section_name);
      if (section) {
        $articleListItem.append("<h5>Section: " + section + "</h5>");
      }

      // Log published date, and append to document if exists
      var pubDate = article.pub_date;
      console.log(article.pub_date);
      if (pubDate) {
        $articleListItem.append("<h5>" + article.pub_date + "</h5>");
      }

      // Append and log url
      $articleListItem.append(
        "<a href='" + article.web_url + "'>" + article.web_url + "</a>"
      );
      console.log(article.web_url);

      // Append the article
      $articleList.append($articleListItem);
    }
  }

  // Function to empty out the articles
  function clear() {
    $("#article-section").empty();
  }

  // CLICK HANDLERS
  // ==========================================================

  // .on("click") function associated with the Search Button
  $("#run-search").on("click", function(event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();

    // Empty the region associated with the articles
    clear();

    // Build the query URL for the ajax request to the NYT API
    var queryURL = buildQueryURL();

    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(updatePage);
  });

  //  .on("click") function associated with the clear button
  $("#clear-all").on("click", clear);

  displayListings();
  displayResultsWeather();
  displayResultsFood();
  // displayResultsNews();
});
