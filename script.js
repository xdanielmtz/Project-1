console.log("hello world");

/**
 * register click event on the search button.
 * Find the covid details for the entered city name.
 */

$("#select-city").click(function (event) {
  event.preventDefault();
  var theCity = $("#user-destination").val();

  getCovidDetails(theCity);
});

/**
 * Function to first fetch the county name and state name.
 * And we will use that county name to find the covid cases of the city.
 * Since there are many counties in different state with same name,
 * covid API will give us multiple responses.
 * Then we will compare our state name with the state name of the covid response
 * The retrieved covid details are then rendered (displayed) on the html
 * @param {*} cityName
 */

function getCovidDetails(cityName) {
  console.log("City name passed " + cityName);

  //fetch county name and state name from geoLocationUrl
  var geoLocationUrl =
    "https://api.geocod.io/v1.6/geocode?q=" +
    cityName +
    "&api_key=a3b545f33b7513f1aa5a508a505f7ba0f7f88f1";

  $.ajax({
    url: geoLocationUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    
     //County name was returned as "xyz county". Since we just need just the county we used split().
    var countyWithAddWord = response.results[0].address_components.county;
    console.log("county name from response " + countyWithAddWord);
    var county = countyWithAddWord.split(" ");
    console.log("county name without additional word " + county[0]);


   //retrieved state code
    var stateCode = response.results[0].address_components.state;
    console.log("state code from response " + stateCode);

    // API call to receive list of state with state-code 
    $.ajax({
      url:
        "https://raw.githubusercontent.com/arpita-sahakar/state-name/main/state-info.json",
      method: "GET",
    }).then(function (response) {
      var listOfStateNameWithCode = JSON.parse(response);

      /**
       * for loop to check which state-code from response matches our state-code. 
       * The one with the match,pick the state name
       */
      for (i = 0; i < listOfStateNameWithCode.length; i++) {
        if (stateCode === listOfStateNameWithCode[i].stateCode) {
          var stateName = listOfStateNameWithCode[i].stateName;
          console.log("stateName after ajax call" + stateName);


          // function call to get covid details of city using the state-nam & county name that we retrieved
          getCovidDataForCounty(stateName, county[0]);
        }
      }
    });
  });
}





/**
 * function to get covid details with state name and county name as parameters that we
 * received from the above API-URL
 * @param {*} stateName
 * @param {*} county
 */
function getCovidDataForCounty(stateName, county) {
  // inserted county name in the url
  var diseaseAPi =
    "https://disease.sh/v3/covid-19/nyt/counties/" + county + "?lastdays=1";

  $.ajax({
    url: diseaseAPi,
    method: "GET",
  }).then(async function (response) {
    // covid response from all the county of the different states
    console.log(response);

    // for loop to find our stateName from the list of response that is returned
    for (i = 0; i < response.length; i++) {
      if (stateName === response[i].state) {
        console.log(response[i]);

        //display the covid cases of the county that matches our state.
        console.log(
          "total cases " +
            response[i].cases +
            " , total deaths " +
            response[i].deaths +
            ", " +
            response[i].date
        );

          // calculateMortalityPercentage(stateName, county);
        //calculate percentage mortality
        var mortality = response[i].deaths / response[i].cases;
        var mPercentage = Math.round(mortality * 100).toFixed(2);
        var status;

        if (mPercentage < 1) {
          console.log("safe");
          // $("#recommended")= "Safe";
          status = "safe";
        } else if (mPercentage > 2) {
          console.log("danger");
          // "$("#recommended")= "danger";
          status = "danger";
        } else {
          console.log("maybe");
          status = "maybe";
        }
        console.log(status);
        console.log(mortality);
        console.log(mPercentage);

        var gif = await getOurGif(status);
        console.log("gif", gif);
        // displayCovidData();
        var theCity = $("#user-destination").val();
        $("#covidCity").text(theCity);
        $("#covidDate").text("(" + response[i].date + ")");
        $("#activeCases").text(response[i].cases);
        $("#deaths").text(response[i].deaths);
        $("#mortality").text(mPercentage + "%");
        $("#display-gif").append(gif);
      }
    }
  });
}


function getOurGif(str) {
  // Constructing a queryURL using data covid
  var apiKey = "n7cEZesxhqbz9GB5KiFEaznV05w1o02B";
  //   var apiKey2 = "dc6zaTOxFJmzC"
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    str +
    "&api_key=" +
    apiKey +
    "&limit=2";

  return new Promise((resolved) => {
    $.ajax({
      url: queryURL,
      method: "GET",
    })
      // After data comes back from the request
      .then(function (response) {
        console.log(queryURL);
        console.log(response);
        img = $("<img>");
        img.attr("src", response.data[0].images.fixed_height.url);
        resolved(img);
      });
  });
  // Performing an AJAX request with the queryURL
}

function calculateMortalityPercentage(stateName, county){
  
}