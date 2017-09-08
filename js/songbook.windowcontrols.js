var SongBookWindowControls = {
  element: null
};

SongBookWindowControls.CONTROLS = {

  "minimize": function() {

    if(window.ELECTRON!=undefined) {
      var remote = window.ELECTRON.remote;
      var focusedWindow = remote.BrowserWindow.getFocusedWindow();
      focusedWindow.minimize();
    }

    return false;
  },

  "maxres": function() {

    if(window.ELECTRON!=undefined) {
      var remote = window.ELECTRON.remote;
      var focusedWindow = remote.BrowserWindow.getFocusedWindow();
      var maxResButton = SongBookWindowControls.getMaxResButtonElement();

      if(focusedWindow.isMaximized()) {
        maxResButton.removeClass("restore");
        maxResButton.addClass("maximize");
        focusedWindow.unmaximize();
      } else {
        maxResButton.addClass("restore");
        maxResButton.removeClass("maximize");
        focusedWindow.maximize();
      }
    }

    return false;
  },

  "close": function() {
    if(window.ELECTRON!=undefined) {
      var remote = window.ELECTRON.remote;
      var focusedWindow = remote.BrowserWindow.getFocusedWindow();
      focusedWindow.close();
    }
    return false;
  },

  "focuslogin": function() {
    if(window.ELECTRON!=undefined) {
      var remote = window.ELECTRON.remote;
      var loginWindow = remote.BrowserWindow.fromId(2);
      if(loginWindow!=undefined && loginWindow!=null) {
        loginWindow.focus();
      }
    }

    return false;
  },

  "chooseAccount":  function() {
    if(window.ELECTRON!=undefined) {
      var remote = window.ELECTRON.remote;
      var path = window.ELECTRON_PATH;
      var mainWindow = remote.BrowserWindow.fromId(1);
      var BrowserWindow = remote.BrowserWindow;
      var accountWindow = new BrowserWindow({
        width: 450,
        height: 600,
        backgroundColor: '#fff',
        frame: false
      });

      SongBookWindowControls.getLoginDialogElement().show();
      accountWindow.loadURL('https://accounts.google.com/Logout');
      accountWindow.focus();
      var webContents = accountWindow.webContents;

      webContents.on("did-stop-loading", function(){
        var currentURL = webContents.getURL();
    		console.log(currentURL);

        if(!SongBookWindowControls.isLoginUrl(currentURL)) {
          console.log("fechar!");
    			mainWindow.reload();
          accountWindow.close();
        }
      });
    }

    return false;
  }

};

SongBookWindowControls.getElement = function() {
  return this.element;
};

SongBookWindowControls.getMinimizeButtonElement = function() {
  return this.getElement().find("a.button.minimize");
};

SongBookWindowControls.getMaxResButtonElement = function() {
  return this.getElement().find("a.button.max-res");
};

SongBookWindowControls.getCloseButtonElement = function() {
  return this.getElement().find("a.button.close");
};

SongBookWindowControls.getAccountSelectElement = function() {
  return this.getElement().find("span.account-select");
};

SongBookWindowControls.getLoginDialogElement = function() {
  return jQuery("div.login-dialog");
};

SongBookWindowControls.isLoginUrl = function(currentUrl) {
  var logoutUrl = "accounts.google.com/Logout";
  var youtubeLogoutUrl = "accounts.youtube.com/accounts/Logout";
  var googleBRLogoutUrl = "www.google.com.br/accounts/Logout";
  var googleEUALogoutUrl = "www.google.com/accounts/Logout";
  var googleAccountLoginUrl = "accounts.google.com/ServiceLogin";
  var wrongPasswordUrl = "accounts.google.com/signin/challenge/sl/password";
  var isLogin = false;

  if(currentUrl.indexOf(logoutUrl)>-1) isLogin = true;
  if(currentUrl.indexOf(youtubeLogoutUrl)>-1) isLogin = true;
  if(currentUrl.indexOf(googleBRLogoutUrl)>-1) isLogin = true;
  if(currentUrl.indexOf(googleEUALogoutUrl)>-1) isLogin = true;
  if(currentUrl.indexOf(googleAccountLoginUrl)>-1) isLogin = true;
  if(currentUrl.indexOf(wrongPasswordUrl)>-1) isLogin = true;

  return isLogin;
};

SongBookWindowControls.build = function() {
  this.element = jQuery("div.window-title-bar");
  var bodyElement = jQuery("body");


  this.getMinimizeButtonElement().click(SongBookWindowControls.CONTROLS["minimize"]);
  this.getMaxResButtonElement().click(SongBookWindowControls.CONTROLS["maxres"]);
  this.getCloseButtonElement().click(SongBookWindowControls.CONTROLS["close"]);
  this.getAccountSelectElement().click(SongBookWindowControls.CONTROLS["chooseAccount"]);

  if(window.ELECTRON!=undefined) {
    bodyElement.addClass("title-window");
    if(songbook.getParameterByName("logged")!="1") {
        this.getLoginDialogElement().show();
        this.getLoginDialogElement().click(SongBookWindowControls.CONTROLS["focuslogin"]);
    }
  }
};
