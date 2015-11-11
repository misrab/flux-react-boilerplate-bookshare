define([
	'react', 'react-router', 'jquery',
	'./basic', './home', './shared'
], 
function(React, Router, $,
	Basic, Home, Shared) {
	

	function mergeObj(obj1, obj2) {
		for (var attrname in obj2) { obj1[attrname] = obj2[attrname]; }
	}
	
	// final object to export all of folder
	var result = {};
	

	mergeObj(result, Basic);
  	mergeObj(result, Home);
  	mergeObj(result, Shared);


	return result;
});