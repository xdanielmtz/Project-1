
function getCovidDetails(city) {
  var geoURL =
    "http://ec2-54-147-141-158.compute-1.amazonaws.com/api/cities?city=" +
    cityName;

  $.ajax({
    url: geoURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    var stateName = response.state;

    var county = response.county;

    getCovidDataForCounty(stateName, county);
  });
}

function getCovidDataForCounty(stateName, county) {
  // var diseaseAPi =
  //   "https://disease.sh/v3/covid-19/nyt/counties/" + county + "?lastdays=5";
  var diseaseAPi =
    "https://disease.sh/v3/covid-19/nyt/counties/" + county + "?lastdays=1";
  $.ajax({
    url: diseaseAPi,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    for (i = 0; i < response.length; i++) {
      if (stateName === response[i].state) {
        console.log(response[i]);
        console.log("total cases " + response[i].cases+" , total deaths "+ response[i].deaths);

        // displayCovidData();
      }
    }
  });
}


$("#select-artist").on("click", function(){
  var city = $("#user-destination").val();
  console.log(city);
  //fetch and display event information
  //fetch and display covid information of the city
  getCovidDetails("city");

});