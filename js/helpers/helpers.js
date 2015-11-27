define([
], function() {
	var result = {};


	// console.log(Auth);
	result.toggleLoader = function() {
		$('.loader').toggle();
	},


	result.ajaxReq = function(type, url, data, cb) {
		var that = this;

		$.ajax({
			type: type,
			beforeSend: function(xhr) { xhr.setRequestHeader("Authorization", "Basic " + localStorage.token); },
			url: url,
			data: JSON.stringify(data),
			contentType: 'application/json', 
			success: function(result) {
				cb(null, result);
			},
			error: function(err) {
				console.log('error: ' + JSON.stringify(err));
				cb(err);
			}
		});
	};


	result.showAlert = function(msg, type) {
		var str = '.alert-' + type;
		var el = $(str);

		el.html(msg);

		el.slideDown();
		setTimeout(function() {
			el.slideUp();
		}, 5000);

		// scroll to top
		// document.body.scrollTop = document.documentElement.scrollTop = 0;
	};


	// modelName e.g. 'users', 'todoItems'
	result.removeFromState = function(that, modelName, fieldName, fieldValue) {
		var items = that.state[modelName];
		var index = -1;
		for (var i=0; i < items.length; i++) {
			// console.log(items[i][fieldName]);
			// console.log(fieldValue);
			if (items[i][fieldName] === fieldValue) {
				index = i;
				break;
			}
		}
		// console.log(index);
		if (index===-1) return;

		// update items
		var newItems = items.slice();
		newItems.splice(index, 1);
		var newState = {};
		newState[modelName] = newItems;

		// update state
		that.setState(newState);
	};	


	return result;
});