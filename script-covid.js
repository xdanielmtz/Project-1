
var geoURL = "https://api.geocod.io/v1.6/geocode?q=atlanta&api_key=a3b545f33b7513f1aa5a508a505f7ba0f7f88f1";

$.ajax({
    url: geoURL,
    method: "GET",
  }).then(function(response){
    console.log(response);

    var stateCode = response.results[0].address_components.state;

    var county = response.results[0].address_components.county;
    var countyName = (county.split(" ")[0]);

    //get state name using state code
    var stateName = getStateName(stateCode);
    console.log(stateName);

    var diseaseAPi = "https://disease.sh/v3/covid-19/nyt/counties/"+countyName+"?lastdays=5";
  
    $.ajax({
        url: diseaseAPi,
        method: "GET",
      }).then(function(response){
          console.log(response);
        for(i=0;i<response.length;i++){
            if(stateName===response[i].state){
                console.log(response[i]);

            }
        }
      })
    
  });

  function getStateName(stateCode){
    for(i=0; i<stateArray.length;i++){
        if(stateCode===stateArray[i].stateCode){
            return stateArray[i].stateName;
            
        }

    }

  }
 


  

