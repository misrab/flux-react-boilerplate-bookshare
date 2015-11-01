define([
	// './auth', './config',
	'./shared', '../helpers/helpers',
	'react', 'jquery', 'jquery-ui'], 
function(
	// Auth, Config,
	Shared, Helpers,
	React, $, jqueryUI) {

	var result = {};



	/*
		Readings
	*/

	var ReadingSummary = React.createClass({
		
		render: function() {
			var that = this;

			var data = that.props.data;
			if (!data) return null;

			return (
				<div className="reading_summary">
					<strong>{data.title}</strong>

					<Shared.Cancel data={data} handler={that.props.deleteReading} />

					<object data={data.image_url} type="image/png">
						<img src="img/logo_grey.png" />
					</object>


				</div>
			)
		}
	});


	// Readings master
	var Readings = React.createClass({
		render: function() {
			var that = this;

			return (
				<div className="my_panel">
					<div className="white_box"></div>

					<div className="padded">
						<h2>My Readings</h2>

						<div className="row">
							<div className="col-md-6">
								<h3 className="text-muted">Books</h3>
								<Shared.Autocomplete sourceCallback={that.props.getBookSuggestions} selectCallback={that.props.addReading} data={that.props.suggestions} placeholder="Book title" name="new_book_title" />

								{
									that.props.myReadings.map(function(v, i) {
										return <ReadingSummary deleteReading={that.props.deleteReading} data={v} key={i} />
									})
								}
							</div>

							<div className="col-md-6">
								<h3 className="text-muted">Articles</h3>

								<input type='text' placeholder='Url link' className='form-control box' />
								{/*
									that.props.myReadings.map(function(v, i) {
										return <ReadingSummary deleteReading={that.props.deleteReading} data={v} key={i} />
									})
								*/}
							</div>
						</div>						
					</div>
				</div>
			)
		}
	});

	/*
		Feed
	*/




	// Feed master
	var Feed = React.createClass({
		render: function() {
			return (
				<div className="my_panel">
					<div className="white_box"></div>

					<div className="padded">
						<h2>Feed</h2>

						{/* status section */}
						
						<div className="row">
							<div className="col-md-4">
								<span className='force_text_left'>
									<Shared.Autocomplete sourceCallback={null} selectCallback={null} data={[]} placeholder="Book title or article url" name="status_post_reading" />
								</span>
								<textarea
									placeholder="Thoughts on a recent reading?"
									className="form-control box small_space_top">
								</textarea>

							</div>
							<div className="col-md-8">
								
							</div>
						</div>
						


					</div>
				</div>
			)
		}
	});


	/*
		Exported
	*/

	result.Home = React.createClass({
		deleteReading: function(reading, e) {
			var that = this;

			e.preventDefault();

			// console.log(that.state.myReadings);

			// TODO confirmation modal

			// TODO actually delete

			// then remove from state
			Helpers.removeFromState(that, 'myReadings', 'id', reading.id);
		},

		addReading: function(e, ui) {
			var that = this;

			e.preventDefault();
			// var item = ui.item;

			// TEMP functions
			function getRandomInt(min, max) {
			  return Math.floor(Math.random() * (max - min)) + min;
			}
			function makeid()
			{
			    var text = "";
			    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

			    for( var i=0; i < 5; i++ )
			        text += possible.charAt(Math.floor(Math.random() * possible.length));

			    return text;
			}

			var reading = {id: getRandomInt(1,1000), title: makeid(), image_url: 'http://theartmad.com/wp-content/uploads/2015/02/Cute-Monkeys-6.jpg'}; // item.value

			that.setState({
				myReadings: that.state.myReadings.concat([reading])
			});


			// clear the input
			// console.log($(e.target).val());
			$(e.target).val('');

		},

		getBookSuggestions: function(req, res) {
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
							<Feed />


							<Readings myReadings={that.state.myReadings} getBookSuggestions={that.getBookSuggestions} addReading={that.addReading} deleteReading={that.deleteReading} />
							

							

						</div>
					</div>
				</div>
			)
		}
	});




	return result;

});