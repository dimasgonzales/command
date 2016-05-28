var commandModule = (function() {
	function _init() {
		_dom_init();
		_data_init();
	}

	function _dom_init(){
		//set up event listeners
		document.querySelector("#inputWrapper input").addEventListener("keydown", _dom_onInputKeypress);
	}

	function _dom_onInputKeypress(e) {
		var commandSubstring = document.querySelector("#inputWrapper input").value;
		if(e.code === "Enter"){
			// TODO
			// _data_doDeepSearch(commandSubstring);
		}
		else {
			_data_doShallowSearch(commandSubstring);
		}
	}

	function _data_init() {
		_data_validateConfig();
	}

	// Check if the config file exists and import the options
	// Otherwise create the file with default options
	function _data_validateConfig() {
		
	}

	function _data_doDeepSearch(commandSubstring) {
		var runCmdnRgx = /\s*run\s*"(.*)"/
		var matches = commandSubstring.match(runCmdnRgx)
		if (!!matches) {
			//TODO:
			// 1. execute a shell command
			// 2. exit command app
		}
		else {
			_data_doShallowSearch(commandSubstring);
		}
	}

	function _data_doShallowSearch(commandSubstring) {
		
	}

	return {
		init: _init
	}
})();