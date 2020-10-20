
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
  //fetch county name and state name
  var stateInfoURL =
    "http://ec2-54-147-141-158.compute-1.amazonaws.com/api/cities?city=" +
    cityName;

  $.ajax({
    url: stateInfoURL,
    method: "GET",
  }).then(function (response) {
    var stateName = response.state;
    var county = response.county;

    // function call to get covid details
    getCovidDataForCounty(stateName, county);
  });
}

/**
 * function to get covid details with state name and county name as parameters that we
 * received from the above API-URL
 * @param {*} stateName
 * @param {*} county
 */

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
        
        img = $("<img>");
        img.attr("src", response.data[0].images.fixed_height.url);
        resolved(img);
      });
  });
  // Performing an AJAX request with the queryURL
}

function getCovidDataForCounty(stateName, county) {
  // inserted county name in the url
  var diseaseAPi =
    "https://disease.sh/v3/covid-19/nyt/counties/" + county + "?lastdays=1";

  $.ajax({
    url: diseaseAPi,
    method: "GET",
  }).then(async function (response) {
    // covid response from all the county of the different states
    

    // for loop to find our stateName from the list of response that is returned
    for (i = 0; i < response.length; i++) {
      if (stateName === response[i].state) {
        
        //display the covid cases of te county that matches our state.
        console.log(
          "total cases " +
            response[i].cases +
            " , total deaths " +
            response[i].deaths +
            ", " +
            response[i].date
        );

        //calculate percentage mortality
        var mortality = response[i].deaths / response[i].cases;
        var mPercentage = Math.round(mortality * 100).toFixed(2);
        var status;

        if (mPercentage < 1) {
          
          status = "safe";
        } else if (mPercentage > 2) {
          
          status = "danger";
        } else {
          
          status = "maybe";
        }
        
        var gif = await getOurGif(status);
        
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
