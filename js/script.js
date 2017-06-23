function resizePage() {
  $('#entire-page').height($(window).height());
}

$(document).ready(function(){
  resizePage();
  $('#submit').on('click', function(){
    $.getJSON("https://api.forismatic.com/api/1.0/?", "method=getQuote&format=json&lang=en&jsonp=?", function(json) {
      var randomQuote = json[0];
      console.log(randomQuote);
      $('#quote').html(`${randomQuote.content}`);
    });
  });
});