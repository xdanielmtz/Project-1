//One function to do it all:
function cityName() {
  $("#select-city").click(function (event) {
    event.preventDefault();
    var theCity = $("#user-destination").val();
    var APIKey = "h2gbHeoXuSGHYUHwer9Jy6S7mT5Sj8oP";
    var queryURL =
      "https://app.ticketmaster.com/discovery/v2/events.json?city=" +
      theCity +
      "&apikey=" +
      APIKey;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      
      document.getElementById("display-artist-name").innerHTML = "";
      for (i = 0; i < response._embedded.events.length; i++) {
        if (
          response._embedded.events[i].classifications[0].segment.name ===
          "Music"
        ) {
          var avbMusic = [response._embedded.events[i].name];
          var startDate = response._embedded.events[i].dates.start.localDate;
          var arenaName = response._embedded.events[i]._embedded.venues[0].name;
          var buyTickets = [response._embedded.events[i].url];
          var startDate = response._embedded.events[i].dates.start.localDate;
          
          $(document).on("click", "button", function () {
            window.location.href = buyTickets;
          });

          //Obtaining the Date and Time of event. Parsing the time to 12hr
          const timeString = response._embedded.events[i].dates.start.localTime;
          const timeString12hr = new Date(
            startDate + "T" + timeString + "Z"
          ).toLocaleTimeString(
            {},
            {
              timeZone: "UTC",
              hour12: true,
              hour: "numeric",
              minute: "numeric",
            }
          );

          var ul = document.createElement("ul");
          document.getElementById("display-artist-name").appendChild(ul);
          avbMusic.forEach(function (music) {
            
            var aTag = document.createElement("a");
            aTag.setAttribute("href", buyTickets[0]);
            var btn = document.createElement("button");
            btn.style.backgroundColor = "black";
            // $(btn).css("background-color", "rgb(38," + "77" + "," + "251" + ")");
            $(btn).css("color", "white");
            $(btn).css("border-radius", "8px");
            btn.innerHTML +=
              music +
              "  •  " +
              arenaName +
              "    •    " +
              startDate +
              " • " +
              timeString12hr;
            aTag.append(btn);
            ul.append(aTag);
          });
          
        }
      }
    });
  });
}

cityName();