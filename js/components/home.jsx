define([
	// './auth', './config',
	'react', 'jquery'], 
function(
	// Auth, Config,
	React, $) {

	var result = {};

	// var RouteHandler = Router.RouteHandler;


	result.Home = React.createClass({
		render: function() {
			return (
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<img style={{height: 50}} src="/img/logo.png" />
						</div>
					</div>
				</div>
			)
		}
	});




	return result;

});