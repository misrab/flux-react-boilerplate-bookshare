define([
	// './auth', './config',
	'react', 'jquery', 'moment'], 
function(
	// Auth, Config,
	React, $, moment) {

	var result = {};


	var FeedItem = React.createClass({
		// componentDidMount() {
		//       var desc = $(React.findDOMNode(this)).find('.description');
		//       // console.log(desc.text());
		//       desc.dotdotdot();
		// },


		render: function() {
			var that = this;
			var data = that.props.data;
			if (!data) return null;


			// first limit number of words, then number of characters
			var description = data.description;
			if (
				data.description.length > 200
				|| data.description.split(" ").length > 50
				) {
				description = data.description.split(" ").slice(0, 50).join(" ").slice(0, 200) 
					+ "..."; // TODO maybe Read More
			}


			return (
				<div className="feed_item">
					{/* user and meta */}
					<div style={{backgroundColor: 'lightgrey', padding: '5px', margin: '5px 0'}}>
						<strong>{data.user.username}</strong> { moment(data.updatedAt).calendar().toLowerCase() }
					</div>

					{/* reading summary */}
					<div className="reading_summary" style={{display:'inline-block', margin: '0'}}>
						<div className="overflow_container">
							<strong>{data.reading.title}</strong>
							<object data={data.reading.image_url} type="image/png">
								<img src="img/logo_grey.png" />
							</object>
						</div>
					</div>

					<div className="" style={{width: '65%', display:'inline-block', verticalAlign: 'top', marginLeft:'10px', fontSize: '1.25em'}}>
						{/* actual post */}
						<div className="description">
							{ description }
						</div>
					</div>



				</div>
			)
		}

	});
	// result.FeedItem = FeedItem;


	result.PostViewer = React.createClass({
		render: function() {
			var that = this;
			var data = that.props.data;

			if (!data || !data.length) return <div>"No posts to show"</div>;

			return (
				<div>
					{
						data.map(function(v, i) {
							return <FeedItem data={v} key={i} />;
						})
					}
				</div>
			)
		}

	});


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
				<input type="text" placeholder={that.props.placeholder} name={that.props.name} className="form-control box" />
			)
		}
	});


	// parent should be relative
	// handler takes (data, event)
	var Cancel = React.createClass({
		render: function() {
			var that = this;

			if (!that.props.handler) return null;

			var styler = {
				position: 'absolute',
				top: '2px',
				right: '2px',
				cursor: 'pointer'
			};

			return (
				<span onClick={that.props.handler.bind(null, that.props.data)} style={styler} className="fa fa-times">
				</span>
			)
		}
	});
	result.Cancel = Cancel;


	/*
		Readings
	*/


	var ReadingSummary = React.createClass({
		
		render: function() {
			var that = this;

			var data = that.props.data;
			if (!data) return null;
			// <Shared.Cancel data={data} handler={that.props.deleteReading} />

			return (
				<div className="reading_summary">
					<div className="overflow_container">
						<strong>{data.title}</strong>

						<Cancel data={data} handler={that.props.deleteReading} />

						<object data={data.image_url} type="image/png">
							<img src="img/logo_grey.png" />
						</object>
					</div>

				</div>
			)
		}
	});
	result.ReadingSummary = ReadingSummary;


	// Readings master
	var ReadingViewer = React.createClass({
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
								{/*<Shared.Autocomplete sourceCallback={that.props.getBookSuggestions} selectCallback={that.props.addReading} data={that.props.suggestions} placeholder="Book title" name="new_book_title" />*/}

								{
									that.props.myReadings.length ? that.props.myReadings.map(function(v, i) {
										return <ReadingSummary deleteReading={that.props.deleteReading} data={v} key={i} />
									}) : "You don't have any books recorded. Try posting about one in your feed!"
								}
							</div>

							<div className="col-md-6">
								<h3 className="text-muted">Articles</h3>

								{/*<input type='text' placeholder='Url link' className='form-control box' />*/}
								{
									that.props.myArticles.length ? that.props.myArticles.map(function(v, i) {
										return <ReadingSummary deleteReading={that.props.deleteReading} data={v} key={i} />
									}) : "You don't have any articles recorded. Try posting about one in your feed!"
								}
							</div>
						</div>						
					</div>
				</div>
			)
		}
	});
	result.ReadingViewer = ReadingViewer;


	result.Readings = React.createClass({
		deleteReading: function(reading, e) {
			var that = this;

			e.preventDefault();

			// console.log(that.state.myReadings);

			// TODO confirmation modal

			// TODO actually delete

			// then remove from state
			Helpers.removeFromState(that, 'myReadings', 'id', reading.id);
		},

		getInitialState() {
		    return {
		        myReadings: [], // books
		        myArticles: []
		    };
		},


		render: function() {
			var that = this;

			return (
				<div className="container">
					<div className="row">
						<div className="col-md-12 big_space_top">
							<a href="#/app/home">
								<img style={{height: 50}} src="/img/logo.png" />
							</a>

							<a className="btn btn-default box pull-right" href="#/app/home">
								Feed
							</a>

							{/* body */}
							<ReadingViewer deleteReading={that.deleteReading} myReadings={that.state.myReadings} myArticles={that.state.myArticles} />
							

						</div>
					</div>
				</div>
			)
		}
	});




	return result;

});