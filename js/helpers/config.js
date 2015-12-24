define([

], function() {
	var result = {};


	var root = window.location.href.indexOf("localhost") !== -1 ? 'localhost' : 'ec2-54-169-118-16.ap-southeast-1.compute.amazonaws.com';

	result.API_URL = 'http://'+root+':8000/api/v1';

	// for the 'see more' button on the feed
	result.POST_OFFSET_INCREMENT = 10;  // mirrored on server

	return result;
});