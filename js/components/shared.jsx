define([
	'../helpers/auth', '../helpers/config', '../helpers/helpers',
	'react', 'jquery', 'moment'], 
function(
	Auth, Config, Helpers,
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


			// console.log(data);
			// first limit number of words, then number of characters
			var comment = data.comment;
			if (
				data.comment.length > 200
				|| data.comment.split(" ").length > 50
				) {
				comment = data.comment.split(" ").slice(0, 50).join(" ").slice(0, 200) 
					+ "..."; // TODO maybe Read More
			}


			return (
				<div className="feed_item">
					{/* user and meta */}
					<div style={{backgroundColor: 'lightgrey', padding: '5px', margin: '5px 0'}}>
						<strong>{data.user.email}</strong> { moment(data.updatedAt).calendar().toLowerCase() }
					</div>

					{/* reading summary */}
					<ReadingSummary data={data.reading} />
					{/*
					<div className="reading_summary" style={{display:'inline-block', margin: '0'}}>
						<div className="overflow_container">
							<strong>{data.reading.title}</strong>
							<object data={data.reading.image_url} type="image/png">
								<img src="img/logo_grey.png" />
							</object>
						</div>
					</div>
					*/}

					<div className="" style={{width: '65%', display:'inline-block', verticalAlign: 'top', marginLeft:'10px', fontSize: '1.25em'}}>
						{/* actual post */}
						<div className="description">
							{ comment }
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


			var button;
			if (that.props.feedSeeMoreLoading) {
				button = <center>
					<img style={{height:'50px'}} src="img/loader.gif" />
				</center>;
			} else {
				button = <div style={{display:'block', position:'relative'}} className="btn btn-default text-center full_width box" onClick={that.props.feedSeeMore}>
					See more
				</div>;
			}
			

			if (!data || !data.length) return <div>"No posts to show"</div>;

			return (
				<div>
					{
						data.map(function(v, i) {
							return <FeedItem data={v} key={i} />;
						})
					}

					{ button }
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

			// decide on image url
			var image_url = Helpers.getImageCover(data);
			var title;
			if (!image_url) {
				title = <strong>{data.title}</strong>;
				image_url = "img/logo_grey.png";
			}

			// console.log(Helpers.getImageCover)

			return (
				<div className="reading_summary">
					<div className="overflow_container">
						{ title	}
						

						<Cancel data={data} handler={that.props.deleteReading} />

						<object data={image_url} type="image/png">
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
									that.props.myReadings && that.props.myReadings.length ? that.props.myReadings.map(function(v, i) {
										return <ReadingSummary deleteReading={that.props.deleteReading} data={v} key={i} />
									}) : "You don't have any books recorded. Try posting about one in your feed!"
								}
							</div>

							<div className="col-md-6">
								<h3 className="text-muted">Articles</h3>

								{/*<input type='text' placeholder='Url link' className='form-control box' />*/}
								{
									that.props.myArticles && that.props.myArticles.length ? that.props.myArticles.map(function(v, i) {
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




	result.getReadingsState = function(that) {
		// get user's readings
		Auth.getCurrentUser(function(err, user) {
			// first check user
			if (!user || err) {
				console.log('didnt get current user');
				Auth.logout();
				return;
			}
			// next get user's readings
			Helpers.ajaxReq('GET', Config.API_URL + '/users/'+ user.id +'/readings', {}, function(err, result) {
				if (!user || err) {
					console.log('didnt get readings');
					return;
				}

				// TODO split books and articles, or run 2 queries with ?is_book=
				var splitReadings = Helpers.splitReadings(result);


				that.setState({
					myReadings: splitReadings[0], // result
					myArticles: splitReadings[1],
					currentUser: user
				});
			});
		});
	};


	result.Readings = React.createClass({
		deleteReading: function(reading, e) {
			var that = this;
			Helpers.deleteReading(that, reading, e);
		},

		getInitialState: function() {
		    return {
		        myReadings: [], // books
		        myArticles: []
		    };
		},


		componentDidMount: function() {
			var that = this;
			result.getReadingsState(that);
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
							<ReadingViewer deleteReading={that.deleteReading} myReadings={that.props.myReadings} myArticles={that.props.myArticles} />
							

						</div>
					</div>
				</div>
			)
		}
	});




	return result;

});