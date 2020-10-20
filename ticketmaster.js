var infoOne = $("#infoOne");
var infoTwo  = $("#infoTwo");
var infoThree = $("#infoFour");
var infoFive = $("#infoFive");
var infoSix = $("#infoSix");

 // Add images ----- var eventImg = (response._embedded.events[i].images[0].url)
// Add ticket limit ---- var ticketLimit = (response._embedded.events[0].accessibility.ticketLimit);
// Classification type ex: "Music", "sports" -----  // var classType = (response._embedded.events[i].classifications[0].segment.name);
// Event name ----  //    var eventName = (response._embedded.events[i].name); 
// Price name min and max ---- var maxPrice = (response._embedded.events[i].priceRanges[0].max) , var minPrice = (response._embedded.events[i].priceRanges[0].min)
// Ticket Limit ---- var ticketLimit = (response._embedded.events[i].ticketLimit.info)
// URL to buy tickets --- var buyTickets = (response._embedded.events[i].url)
// Arena name ---- var arenaName = (response._embedded.events[i]._embedded.venues[0].name)

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
            console.log(response);
            document.getElementById("display-artist-name").innerHTML = "";
            for (i = 0; i < response._embedded.events.length; i++){
                if(response._embedded.events[i].classifications[0].segment.name === "Music"){
                   var avbMusic = [response._embedded.events[i].name];
                   var startDate = (response._embedded.events[i].dates.start.localDate);
                   var arenaName = (response._embedded.events[i]._embedded.venues[0].name);


                    //Obtaining the Date and Time of event. Parsing the time to 12hr
                   const timeString = (response._embedded.events[i].dates.start.localTime)
                   const timeString12hr = new Date(startDate + "T" + timeString + 'Z')
                     .toLocaleTimeString({},
                       {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
                     );


                   var ul = document.createElement("ul");
                   document.getElementById("display-artist-name").appendChild(ul);
                   avbMusic.forEach(function(music){
                    var btn = document.createElement('button');
                    btn.style.backgroundColor = ("black");
                    // $(btn).css("background-color", "rgb(38," + "77" + "," + "251" + ")");
                    $(btn).css("color", "white");
                    $(btn).css("border-radius", "8px");
                    ul.appendChild(btn);
                    btn.innerHTML += music + "  •  " + arenaName + "    •    " + startDate + " • " + timeString12hr;
                   })
                    console.log(avbMusic);

                } 
            }

        })
        
    }
    

)}

cityName();

var count = localStorage.getItem("count");

// function cityFunction(){
//     $("#select-city").click(function(event){
//         event.preventDefault()
//         var theCity = $("#user-destination").val();
//         var APIKey = "h2gbHeoXuSGHYUHwer9Jy6S7mT5Sj8oP";
//         var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + theCity + "&apikey=" + APIKey
//         $.ajax({
//             url: queryURL,
//             method: "GET"
//         }).then(function(response){
//             console.log(response);
//             var ticketLimit = (response._embedded.events[0].accessibility.ticketLimit);
//             var eventName = (response._embedded.events[0].name)
//             var array = [response._embedded.events];
//             console.log(array);
//         })
//     })
// }

// cityFunction()