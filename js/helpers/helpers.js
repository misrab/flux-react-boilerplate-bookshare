define([
	'./config',
	'bootstrap', 'bootbox'
], 
function(
	Config,
	bootstrap, Bootbox
) {
	var result = {};

	var ajaxReq = function(type, url, data, cb) {
		// var that = this;


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
	result.ajaxReq = ajaxReq;

	// modelName e.g. 'users', 'todoItems'
	var removeFromState = function(that, modelName, fieldName, fieldValue) {
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
	var removeFromState = removeFromState;

	result.deleteItem = function(that, baseUrl, id, modelName) {
		// TODO confirmation modal
		Bootbox.confirm("Are you sure you want to remove this item?", function(result) {
			if (result===false) return;


			// TODO actually delete association
		  	// var url = Config.API_URL + "/users_readings/" + reading.id;
		  	// var data = { reading_id: reading.id || 0 };
		  	// console.log(url);
		  	ajaxReq('DELETE', baseUrl + id, {}, function(err, result) {
		  		console.log(err);
		  		// console.log(result);
		  	});


			// then remove from state
			removeFromState(that, modelName, 'id', id);
		});
	},


	// result.deleteReading = function(that, reading, e) {
	// 	// var that = this;

	// 	e.preventDefault();

	// 	// console.log(that.state.myReadings);

	// 	// TODO confirmation modal

	// 	// TODO actually delete association
	//   	var url = Config.API_URL + "/users_readings/" + reading.id;
	//   	// var data = { reading_id: reading.id || 0 };
	//   	// console.log(url);
	//   	result.ajaxReq('DELETE', url, {}, function(err, result) {
	//   		console.log(err);
	//   		// console.log(result);
	//   	});


	// 	var modelName = reading.is_book ? 'myReadings' : 'myArticles';
	// 	// then remove from state
	// 	result.removeFromState(that, modelName, 'id', reading.id);
	// };

	result.getImageCover = function(data) {
		var image_url;

		// console.log(data);

		if (!data.is_book) {
			image_url = data.image_url;
		} else {
			if (data.cover) {
				image_url = 'http://covers.openlibrary.org/b/id/'+data.cover+'-M.jpg';
			}
		}


		return image_url;
	};

	

	// console.log(Auth);
	result.toggleLoader = function() {
		$('.loader').toggle();
	},

	result.splitReadings = function(arr) {
		var books = [];
		var articles = [];
		
		try {
			for (var i=0; i < arr.length; i++) {
				if (arr[i].is_book) {
					books.push(arr[i]);
				} else {
					articles.push(arr[i]);
				}
			}

			return [books, articles];
		} catch(err) {
			return [[],[]];
		}	
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


	


	return result;
});