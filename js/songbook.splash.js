var SongBookSplash = {
  checkLoginRedirect: function() {
    var logged = SongBookWindowControls.getParameterByName("logged");
    var skipMenu = SongBookWindowControls.getParameterByName("skipmenu");
    var music = SongBookWindowControls.getParameterByName("music");
    if(music==null) music="1";

    if(logged=="1") {
      if(skipMenu=="true") {
        document.location.href="songbook.html?logged=1&music="+music;
      } else {
        document.location.href="home.html?logged=1";
      }
    }
  }
}

jQuery(window).on("load", function(){
  SongBookSplash.checkLoginRedirect();
});
