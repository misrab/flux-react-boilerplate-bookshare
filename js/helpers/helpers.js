define([

], function() {
	var result = {};


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