SongBookMusic.prototype.open = function() {
	var musicMap = songbook.getConfiguration().getMusicMap();
	var music = musicMap.get(this.getNumber());
	var videoID = music.getYoutubeUrl();
	var winWidth = (screen.width/100)*75;
	var winHeight = (screen.height/100)*75;

	this.select();
	window.open("https://www.youtube.com/embed/"+videoID+"?autoplay=true", "ytvid", "width="+winWidth+",height="+winHeight);

	return this;
};

var SongBookPlaylist = {
	populateSongBookInfo: function() {
		window.songbook.getBookLogoElement().attr("title", songbook.getConfiguration().getFullName());
	},

	triggerPlayButton: function() {
		songbook.getElement().find("div.songbook-play-button a.play").click(function(){
			var musicMap = songbook.getConfiguration().getMusicMap();
			var music = musicMap.get(1);
			var videoID = music.getYoutubeUrl();
			var winWidth = (screen.width/100)*75;
			var winHeight = (screen.height/100)*75;

			songbook.getMusic(1).select();
			window.open("https://www.youtube.com/embed/"+videoID+"?autoplay=true", "ytvid", "width="+winWidth+",height="+winHeight);
			return false;
		});
	}
};
