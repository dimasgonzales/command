const electron = require('electron')
// Module to control application life.
const app = electron.app

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

var appModule = (function () {
	function _init() {
		createWindow();
	}

	function createWindow () {
		// Create the browser window.
		var browserOptions = {width: 500, 
							height: 100, 
							frame:false,
							alwaysOnTop: true,
							transparent: true}

		mainWindow = new electron.BrowserWindow( browserOptions );

		// and load the index.html of the app.
		mainWindow.loadURL(`file://${__dirname}/index.html`)

		// Emitted when the window is closed.
		mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null
		})
	}

	return {
		init: _init
	}
})();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', appModule.init); 