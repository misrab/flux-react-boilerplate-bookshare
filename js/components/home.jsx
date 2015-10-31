define([
	// './auth', './config',
	'./shared',
	'react', 'jquery', 'jquery-ui'], 
function(
	// Auth, Config,
	Shared,
	React, $, jqueryUI) {

	var result = {};



	var ReadingSummary = React.createClass({
		
		render: function() {
			var that = this;

			var data = that.props.data;
			if (!data) return null;

			return (
				<div className="reading_summary">
					<strong>{data.title}</strong>

					<Shared.Cancel handler={that.props.deleteReading} />

					<object data={data.image_url} type="image/png">
						<img src="img/logo_grey.png" />
					</object>


				</div>
			)
		}
	});

	var Readings = React.createClass({
		

		render: function() {
			var that = this;

			return (
				<div className="my_panel">
					<div className="white_box"></div>

					<div className="padded">
						<h2>My Readings</h2>

						<div>
							<Shared.Autocomplete sourceCallback={that.props.getSuggestions} selectCallback={that.props.addReading} data={that.props.suggestions} placeholder="Book title..." name="new_book_title" />
						</div>

						<div>
							{
								that.props.myReadings.map(function(v, i) {
									return <ReadingSummary deleteReading={that.props.deleteReading} data={v} key={i} />
								})
							}
						</div>
					</div>
				</div>
			)
		}
	});

	var Friends = React.createClass({
		render: function() {
			return (
				<div className="my_panel">
					<div className="white_box"></div>

					<div className="padded">
						<h2>Friends</h2>
					</div>
				</div>
			)
		}
	});


	/*
		Exported
	*/

	result.Home = React.createClass({
		deleteReading: function(e) {
			var that = this;

			e.preventDefault();

			console.log('fds');
		},

		addReading: function(e, ui) {
			var that = this;

			e.preventDefault();
			// var item = ui.item;

			var reading = {title: 'fdsfsd', image_url: 'bbb'}; // item.value

			that.setState({
				myReadings: that.state.myReadings.concat([reading])
			});


			// clear the input
			// console.log($(e.target).val());
			$(e.target).val('');

		},

		getSuggestions: function(req, res) {
			var that = this;

			var mappedSuggestions = that.state.suggestions.map(function(v, i) {
				return { label: v.title, value: v.title };
			});

			res(mappedSuggestions);
		},

		getInitialState() {
		    return {
		        suggestions: [{id: 23, title:'aaaaa', image_url: 'imgggg'}],
		        myReadings: [] 
		    };
		},


		render: function() {
			var that = this;


			
			return (
				<div className="container">
					<div className="row">
						<div className="col-md-12 big_space_top">
							<a href="#">
								<img style={{height: 50}} src="/img/logo.png" />
							</a>


							{/* body */}
							<Readings myReadings={that.state.myReadings} getSuggestions={that.getSuggestions} addReading={that.addReading} deleteReading={that.deleteReading} />
							

							<Friends />

						</div>
					</div>
				</div>
			)
		}
	});




	return result;

});