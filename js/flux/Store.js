define([
	'flux-react', './actions'], 
function(
	flux, actions
) {

	return flux.createStore({
	  messages: [],
	  actions: [
		actions.addMessage
	  ],
	  addMessage: function (message) {
		this.messages.push(message);
		this.emitChange();
	  },
	  exports: {
		getMessages: function () {
		  return this.messages;
		}
	  }
	});


});