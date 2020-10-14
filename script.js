// console.log("This works somehow")
// $(document).ready(function(){
//  // var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=3NpJ1uVjwoWQuFCsNAJuA0tJYZEfIGv9";
//  var numRecords;
//  var beginDate;
//  var endDate;
//  var articleCount = 0
//  var search;
//  var api_key = "3NpJ1uVjwoWQuFCsNAJuA0tJYZEfIGv9";
//  var title;
//  var author;
//  var pubDate;

//  $("#search-btn").on("click", function(e){
//      var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?"
//      e.preventDefault();
//  search = $("#search").val();
//  numRecords = $("#num-records").val();
//  startYr = $("#start-year").val();
//  endYr = $("#end-year").val();
//  url += '?' + $.param({
//        'api-key': api_key,
//        'q': search
//  });
//  if(startYr){
//      url += '&' + $.param({
//          'begin_date': startYr
//      });
//  }
//  if(endYr){
//      url += '&' + $.param({
//          'end_date': endYr
//      });
//  }
//  console.log(url);
//  $.ajax({
//  url: url,
//  method: "GET"
//  }).done(function(response) {
//      $("#articles-here").empty();
//      for(var i = 0; i < numRecords; i++){
//          console.log(response.response);
//      }
//  });
// });//End onclick
// $("#clear-button").on("click", function(){
//  $("#articles-here").empty();
// });
// });