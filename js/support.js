$(document).ready(function() {
  if (Modernizr.localstorage) {
      console.log("Local storage is supported by this browser");
  }
  else {
    $('.message').text("Unfortunately your browser doesn't support local storage");
    $('.message').show();
  }
});