/**
 * register click event on the search button.
 * Find the covid details for the entered city name.
 */

$("#select-artist").click(function (event) {
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
    console.log(response);

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
function getCovidDataForCounty(stateName, county) {
  // inserted county name in the url
  var diseaseAPi =
    "https://disease.sh/v3/covid-19/nyt/counties/" + county + "?lastdays=1";

  $.ajax({
    url: diseaseAPi,
    method: "GET",
  }).then(function (response) {
    // covid response from all the county of the different states
    console.log(response);

    // for loop to find our stateName from the list of response that is returned
    for (i = 0; i < response.length; i++) {
      if (stateName === response[i].state) {
        console.log(response[i]);

        //display the covid cases of te county that matches our state.
        console.log(
          "total cases " +
            response[i].cases +
            " , total deaths " +
            response[i].deaths
        );

        // displayCovidData();
      }
    }
  });
}
