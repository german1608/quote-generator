var firstTime = true;

function resizePage() {
  // Helps center the content vertically
  $('#entire-page').height($(window).height());
}

function getQuote() {
  // Get a random quote from forismatic API and change the colors and content of the page.
  $.getJSON('http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?', function(json) {
      var quote = json.quoteText, // quote content
          author = json.quoteAuthor ? json.quoteAuthor : "Anonymous", // quote author
          r = Math.floor(Math.random() * 150), // Colors for the page
          g = Math.floor(Math.random() * 150),
          b = Math.floor(Math.random() * 150),
          quoteText = `${quote}<br /><br /><span style="position: relative;bottom: .3rem;">-${author}</span>`; //content of the quote
      
      // First we fade out the blockquote
      $('blockquote').fadeOut(750, function() {

        // Then we change it's border and background color.
        $(this).css({
          'border-color': `rgb(${r}, ${g}, ${b})`, 
          'background-color': `rgba(${r}, ${g}, ${b}, .3)`
        })
        // Then we change the text 
        .html(quoteText);

        // We change the background-color of the button.
        $('button').css('background-color', `rgb(${r}, ${g}, ${b})`);

        // If is the first quote, the button will be hidden. We show it (to smooth start)
        if (firstTime) {
          firstTime = false;
          $('button').removeClass('hide');
        }

        // Finally, we fade in the blockquote
        $(this).fadeIn(750);
      });
  });
}

$(document).ready(function(){
  // resize the entire-page to make it ocupe the whole viewport. This helps
  // to center vertically the content
  resizePage();

  // Get quote at start
  getQuote();

  // Let the content be always centered in any screensize
  $(window).on('resize', resizePage);

  // Get the random quote and change the HTML/CSS
  $('#submit').on('click', getQuote);
});
