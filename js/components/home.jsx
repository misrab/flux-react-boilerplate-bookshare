define([
	// './auth', './config',
	// '../flux/Store', '../flux/actions',
	'react', 'jquery'], 
function(
	// Auth, Config,
	// Store, actions,
	React, $) {

	var result = {};

	// var RouteHandler = Router.RouteHandler;

	var App = React.createClass({
	  getInitialState: function () {
		return {
		  messages: Store.getMessages(),
		  newMessage: ''
		};
	  },
	  componentWillMount: function () {
		Store.addChangeListener(this.changeState);
	  },
	  componentWillUnmount: function () {
		Store.removeChangeListener(this.changeState);
	  },
	  changeState: function () {
		this.setState({
		  messages: Store.getMessages()
		});
	  },
	  addMessage: function (event) {
		event.preventDefault();
		var input = this.refs.newMessage.getDOMNode();
		actions.addMessage(input.value);
		this.setState({
		  newMessage: ''
		});
	  },
	  updateNewMessage: function (event) {
		this.setState({
		  newMessage: event.target.value
		});
	  },
	  renderMessages: function (message) {
		return (
		  <div>{message}</div>
		);
	  },
		render: function() {
			return (
				<div>
			{this.state.messages.map(this.renderMessages)}
			<form onSubmit={this.addMessage}>
			  <input ref="newMessage" type="text" value={this.state.newMessage} onChange={this.updateNewMessage}/>
			</form>
		  </div>
			);
		}
		
	});


	result.Home = React.createClass({
		render: function() {
			return (
				<div className="container">
					<div className="row">
						<div className="col-md-12 big_space_top">
							<img style={{height: 50}} src="/img/logo.png" />
						</div>
					</div>
				</div>
			)
		}
	});




	return result;

});