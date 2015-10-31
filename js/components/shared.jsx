define([
	// './auth', './config',
	'react', 'jquery'], 
function(
	// Auth, Config,
	React, $) {

	var result = {};


	result.Autocomplete = React.createClass({

		shouldComponentUpdate: function(nextProps) {
		  return this.props.data !== nextProps.data;
		},

		componentDidMount: function() {
		  this.updateAutocomplete();
		},

		componentWillUnmount: function() {
		  $(React.findDOMNode(this)).autocomplete('destroy');
		},

		componentDidUpdate: function() {
		  this.updateAutocomplete();
		},

		updateAutocomplete: function() {
		  var that = this;

		  var data = that.props.data;
		  var selectCallback = that.props.selectCallback;
		  var sourceCallback = that.props.sourceCallback;

		  if (!data) data = [];


		  $(React.findDOMNode(this)).autocomplete({
		  	source: sourceCallback,
		  	select: function(e, ui) {
		  		if (selectCallback) selectCallback(e, ui);
		  	}
		  });
		},

		render: function() {
			var that = this;


			return (
				<input type="text" placeholder={that.props.placeholder} name={that.props.name} className="form-control text-center" />
			)
		}
	});


	// parent should be relative
	result.Cancel = React.createClass({
		render: function() {
			var that = this;

			var styler = {
				position: 'absolute',
				top: '5px',
				right: '5px',
				cursor: 'pointer'
			};

			return (
				<span onClick={that.props.handler} style={styler} className="fa fa-times">
				</span>
			)
		}
	});



	return result;

});