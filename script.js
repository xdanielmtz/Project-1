
var ApiKey = "h2gbHeoXuSGHYUHwer9Jy6S7mT5Sj8oP"
var QueryURL = "https://app.ticketmaster.com/discovery/v2/events.json?city=atlanta&apikey=" + ApiKey
$.ajax({
    url: QueryURL,
    method: "GET"
}).then(function(response){
    console.log(response)
})

