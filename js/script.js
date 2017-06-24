var firstTime = true;

function resizePage() {
  // Helps center the content vertically
  $('#entire-page').height($(window).height());
}

function getQuote() {
  var quote, author, quoteText,
      // Colors for the page
      r = Math.floor(Math.random() * 150),
      g = Math.floor(Math.random() * 150),
      b = Math.floor(Math.random() * 150),
      tweetURL = `https://twitter.com/share?text=`, tweetContent;
  // Get a random quote from forismatic API and change the colors and content of the page.
  $.getJSON('https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?', function(json) {
      quote = json.quoteText; // quote content
      author = json.quoteAuthor ? json.quoteAuthor : "Anonymous";
      quoteText = `${quote}<br /><br /><span style="position: relative;bottom: .3rem;">-${author}</span>`; //content of the quote
      tweetContent = `"${quote}" -${author}`; // Content of the tweet
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

        // Set the link for the tweet
        $('.twitter-share-button').attr('href', tweetURL + encodeURIComponent(tweetContent));
        // console.log(tweetURL + encodeURIComponent(tweetContent + " codepen.io/german1608/full/pwrrNm/"));
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
