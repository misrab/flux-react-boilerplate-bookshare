define([
	'react', 'react-router', 'jquery',
	'./basic', './home'
], 
function(React, Router, $,
	Basic, Home) {
	

	function mergeObj(obj1, obj2) {
		for (var attrname in obj2) { obj1[attrname] = obj2[attrname]; }
	}
	
	// final object to export all of folder
	var result = {};
	

	mergeObj(result, Basic);
  mergeObj(result, Home);


	return result;
});