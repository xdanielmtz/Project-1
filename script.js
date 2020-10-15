




function cityName(){
    $("#select-city").click(function(event){
        event.preventDefault()
        var theCity = $("#user-destination").val();
        var APIKey = "h2gbHeoXuSGHYUHwer9Jy6S7mT5Sj8oP";
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + theCity + "&apikey=" + APIKey
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response)
        })
        
    }
    



)}

cityName();