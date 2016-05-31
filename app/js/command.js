// Dependancies
const fs = require('fs'); 
const mustache = require('mustache')
const $ = require('jquery');


var commandModule = (function() {
	function _init() {
		_dom_init();
		_data_init();
	}

	function _dom_init(){
		//set up event listeners
		$("#inputWrapper input").on("keyup", _dom_onInputKeypress);

		//set the focus to be on the input element
		$("#inputWrapper input").focus()
	}

	function _dom_onInputKeypress(e) {
		var commandSubstring = $("#inputWrapper input").val();

		if(!!commandSubstring) {
			if(e.which === "13"){ // if keypress was enter
				// TODO
				// _data_doHardCommand(commandSubstring);
			}
			else {
				_data_doSoftCommand(commandSubstring);
			}	
		}
		else{
			$("#resultsWrapper").html("");
		}
		
	}

	function _data_init() {
		_data_validateConfig();
	}

	function _data_validateConfig() {
		
		fs.stat('commandConfig.json', function(err, stats) { 
			if (stats && stats.isFile()) { // read in values from config and overwrite the defaul config values
				fs.readFile('commandConfig.json', 'utf8', function (err, data) {
					if (err) {
						throw err;	
					}

					$.extend(_data_commandOptions, JSON.parse(data));

				});
			}
			else { // write default values to commandConfig.json
				fs.writeFile("commandConfig.json", JSON.stringify(_data_commandOptions), function(err) {
					if(err) {
						throw err;
					}

					console.log("The file was saved!");
				}); 
			}
		}); 
	}

	function _data_doHardCommand(commandSubstring) {
		var runCmdnRgx = /\s*run\s*"(.*)"/
		var matches = commandSubstring.match(runCmdnRgx)
		if (!!matches) {
			//TODO:
			// 1. execute a shell command
			// 2. exit command app
		}
		else {
			_data_doSoftCommand(commandSubstring);
		}
	}

	function _data_doSoftCommand(commandSubstring) {
		// var matchingCommands = [];
		// _data_commandOptions.Commands.forEach(function (c, i){
		// 	if(c.command.indexOf(commandSubstring) > -1){
		// 		matchingCommands.push(c);
		// 	}
		// })

		// var html = mustache.render(matchesTemplate,{matches: matchingCommands});

		// For testing purposes only
		// TODO: remove
		var matchingCommands = [{command: "start nginx"}, {command: "stop nginx"}, {command: "reload nginx"},{command: "start nginx"}, {command: "stop nginx"}, {command: "reload nginx"},{command: "start nginx"}, {command: "stop nginx"}, {command: "reload nginx"},{command: "start nginx"}, {command: "stop nginx"}, {command: "reload nginx"},{command: "start nginx"}, {command: "stop nginx"}, {command: "reload nginx"},{command: "start nginx"}, {command: "stop nginx"}, {command: "reload nginx"},{command: "start nginx"}, {command: "stop nginx"}, {command: "reload nginx"},{command: "start nginx"}, {command: "stop nginx"}, {command: "reload nginx"},{command: "start nginx"}, {command: "stop nginx"}, {command: "reload nginx"},{command: "start nginx"}, {command: "stop nginx"}, {command: "reload nginx"},{command: "start nginx"}, {command: "stop nginx"}, {command: "reload nginx"},{command: "start nginx"}, {command: "stop nginx"}, {command: "reload nginx"}];
		var html = mustache.render(matchesTemplate,{matches: matchingCommands, matchType: "Commands"});
		// TODO: remove

		if(!!html) {
			$("#resultsWrapper").html(html).append(html);
		}
	}

	var _data_commandOptions = {
									"Options": {},
									"Commands": {}
								}
	var matchesTemplate = "<h2>{{matchType}}</h2>"
			+"{{#matches}}"
				+"<div class='matchedCommand' data-command='{{command}}'>"
					+"{{command}}"
				+"</div>"
				+"<hr class='matchesDivider'>" 
			+ "{{/matches}}";

	return {
		init: _init
	}
})();