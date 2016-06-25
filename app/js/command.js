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
		$("#resultsWapper div").on("click", _dom_onMatchClick);


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
			else if (e.which === "38" || e.which == "40") {// up and down arrows
			
			}
			else if (e.which === "37" || e.which === "39") {// left and right arrows
				
			}
			else {
				_data_doSoftCommand(commandSubstring);
			}	
		}
		else{
			$("#resultsWrapper").html("");
		}
		
	}

	function _dom_onMatchClick(e) {
		var strCmd = $(e.target).data('command');
		_data_runCommand(strCmd);
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

	function _data_runCommand(command) {
		//TODO: execute command
	}

	function _data_doHardCommand(commandSubstring) {
		var runCmdnRgx = /\brun\b\w*"(.*)"/
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
		
		_data_commandOptions.Commands = [{command: "start nginx"}, {command: "stop nginx"}, {command: "reload nginx"},{command: "start nginx"}, {command: "stop nginx"}, {command: "reload nginx"},{command: "start nginx"}, {command: "stop nginx"}, {command: "reload nginx"},{command: "start nginx"}, {command: "stop nginx"}, {command: "reload nginx"},{command: "start nginx"}, {command: "stop nginx"}, {command: "reload nginx"},{command: "start nginx"}, {command: "stop nginx"}, {command: "reload nginx"},{command: "start nginx"}, {command: "stop nginx"}, {command: "reload nginx"},{command: "start nginx"}, {command: "stop nginx"}, {command: "reload nginx"},{command: "start nginx"}, {command: "stop nginx"}, {command: "reload nginx"},{command: "start nginx"}, {command: "stop nginx"}, {command: "reload nginx"},{command: "start nginx"}, {command: "stop nginx"}, {command: "reload nginx"},{command: "start nginx"}, {command: "stop nginx"}, {command: "reload nginx"}];
		
		var matchingCommands = [];
		_data_commandOptions.Commands.forEach(function (c, i){
			if(c.command.indexOf(commandSubstring) > -1 && matchingCommands.length < 5){
				matchingCommands.push(c);
			}
		})

		var html = mustache.render(commandMatchTemplate,{matches: matchingCommands, matchType: "Commands"});
		$("#resultsWrapper").html(html);
	}

	var _data_commandOptions = {
									"Options": {},
									"Commands": {}
								}
	var commandMatchTemplate = "<h2 style='margin:0;'>{{matchType}}</h2>"
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