define([
	'../helpers/auth', '../helpers/config',
	'./shared', '../helpers/helpers',
	'react', 'jquery', 'jquery-ui', 'bootstrap-linkpreview'], 
function(
	Auth, Config,
	Shared, Helpers,
	React, $, jqueryUI) {

	/*
		Constants
	*/



	var result = {};


	/*
		Custom helpers
	*/

	var AutocompleteCustom = React.createClass({

		// returns if string is a url
		isUrl: function(s) {
			var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
   			return regexp.test(s);
		},

		shouldComponentUpdate: function(nextProps) {
		  return this.props.data !== nextProps.data;
		},

		componentDidMount: function() {
			var that = this;

			that.updateAutocomplete();


			var el = $(React.findDOMNode(that));

			// bind enter key
			// el.bind('keydown', function(event){
			// 	if(event.keyCode == 13) {
			// 		var str = el.val();

			// 		// if empty or not a url, ignore
			// 		if(str.length==0 || !that.isUrl(str)) {
			// 			event.preventDefault();
			// 			return false;
			// 		}

			// 		// TODO if not url, try adding the book
			// 		// (and handle if not in database)

					
			// 		// Get the link
			// 		// TODO also add after "handling" i.e. getting meta
			// 		that.props.handleLink(el);
			// 	}
			// });
		},

		componentWillUnmount: function() {
			var el = $(React.findDOMNode(this));

			el.autocomplete('destroy');
			// el.unbind('keydown');
		},

		componentDidUpdate: function() {
		  this.updateAutocomplete();
		},

		updateAutocomplete: function() {
		  var that = this;

		  // var data = that.props.data;
		  var selectCallback = that.props.selectCallback;
		  var sourceCallback = that.props.sourceCallback;

		  // if (!data) data = [];


		  $(React.findDOMNode(this)).autocomplete({
		  	source: sourceCallback,
		  	select: function(e, ui) {
		  		if (selectCallback) selectCallback(e, ui);
		  	},
		  	// get label instead of value
		  	focus: function(e, ui) {
		  		e.preventDefault();
		  		$(e.target).val(ui.item.label);
		  	},
		  	search: function(e, ui) {
		  		console.log('searching');
		  		var el = $(e.target);
		  		var str = el.val();

		  		// if it's a url try to load a 
		  		// preview instead
		  		if (that.isUrl(str)) {
		  			e.preventDefault();
		  			that.props.handleLink(el);
		  		}
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


	


	// var ArticleSummary = React.createClass({
	// 	render: function() {
	// 		var that = this;

	// 		var data = that.props.data;
	// 		if (!data) return null;

	// 		return (
	// 			<div className="reading_summary">
	// 				<strong>{data.title}</strong>

	// 				<Shared.Cancel data={data} handler={that.props.deleteReading} />

	// 				<object data={data.image_url} type="image/png">
	// 					<img src="img/logo_grey.png" />
	// 				</object>


	// 			</div>
	// 		)
	// 	}
	// });


	

	/*
		Feed
	*/




	// Feed master
	var Feed = React.createClass({
		componentDidMount: function() {
			var that = this;

	        // bind enter key
			// $(window).bind('keydown', function(event){
			// 	if (event.keyCode == 13) {
			// 		console.log('enter');
			// 	}
			// });
		},

		componentWillUnmount: function() {
			// $(window).unbind('keydown');
		},

		render: function() {
			var that = this;


			// console.log(that.props.deletePost)


			return (
				<div className="my_panel">
					<div className="white_box"></div>

					<div className="padded">
						<h2>Feed</h2>

						{/* status section */}
						
						<div className="row">
							<div className="col-md-5">
								<div id="new_post_panel" className="panel box padded">
									{/* preview */}
									<Shared.ReadingSummary data={that.props.previewReading} />


									<span className='force_text_left'>
										<AutocompleteCustom handleLink={that.props.handleLink} sourceCallback={that.props.getBookSuggestions} selectCallback={that.props.selectBook} data={that.props.suggestions} placeholder="Book title or article url" name="status_post_reading" />
										{/*<Shared.Autocomplete sourceCallback={null} selectCallback={null} data={[]} placeholder="Book title or article url" name="status_post_reading" />*/}
									</span>
									<textarea
										id="post_description"
										style={{resize:'none', height: '150px'}}
										placeholder="Thoughts on your recent reading?"
										className="form-control box small_space_top">
									</textarea>


									{
										// show buttons only if a reading preview
										// has been found
										that.props.previewReading ? (
											<div>
												<div onClick={that.props.addReading.bind(null, true)} className="btn btn-primary box half_width small_space_top">
													Private Note
												</div>
												<div id="postButton" onClick={that.props.addReading.bind(null, false)} className="btn btn-success box half_width small_space_top">
													Open Post
												</div>
											</div>
										) : null
										
									}
									

								</div>

							</div>
							<div className="col-md-7">
								<Shared.PostViewer deletePost={that.props.deletePost} currentUser={that.props.currentUser} feedSeeMoreLoading={that.props.feedSeeMoreLoading} feedSeeMore={that.props.feedSeeMore} data={that.props.posts} />
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
			// Helpers.deleteReading(that, reading, e);
			var that = this;
			e.preventDefault();

			// console.log(item); return;

			var baseUrl = Config.API_URL + "/users_readings/";
			var modelName = reading.is_book ? 'myReadings' : 'myArticles';
			Helpers.deleteItem(that, baseUrl, reading.id, modelName);
		},

		// deletePost: function(item, e) {
		// 	var that = this;
		// 	e.preventDefault();

		// 	// console.log(item); return;

		// 	var baseUrl = Config.API_URL + "/posts/";
		// 	Helpers.deleteItem(that, baseUrl, item.id, 'posts');
		// },

		selectBook: function(e, ui) {
			var that = this;
			e.preventDefault();

			// set the input as the label, not value
			$(e.target).val(ui.item.label);

			// turn the value into json
			var data = JSON.parse(ui.item.value);

			// console.log(data);

			// TEMP
			// TEMP functions
			// function getRandomInt(min, max) {
			//   return Math.floor(Math.random() * (max - min)) + min;
			// }
			// function makeid()
			// {
			//     var text = "";
			//     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

			//     for( var i=0; i < 5; i++ )
			//         text += possible.charAt(Math.floor(Math.random() * possible.length));

			//     return text;
			// }
			// var reading = { id: getRandomInt(1,1000), title: makeid(), image_url: 'http://theartmad.com/wp-content/uploads/2015/02/Cute-Monkeys-6.jpg'};

			// console.log(data);
			// return;

			// TODO
			that.setState({
				previewReading: data
			});

			// console.log('selectBook');
		},


		// this is actually when they post a post to their feed
		addReading: function(privateBool, e) {
			var that = this;

			e.preventDefault();


			function postReading(that, reading) {
				// post association
			  	var url = Config.API_URL + "/users_readings";
			  	var data = { reading_id: reading.id || 0 };
			  	Helpers.ajaxReq('POST', url, data, function(err, result) {
			  		if (err) console.log(err); // user could already be associated
			  		// console.log(result);
			  	});


				// add post to feed
				// get description
				// this is for the browser side
				var comment = $('#post_description').val() || "Was just reading";
				var post = {};
				post.comment = comment;
				post.reading = reading;
				post.user = that.state.currentUser;
				that.setState({
					posts: that.state.posts.concat([post])
				});

				// post actual post server side
				var postData = {};
				postData.comment = comment;
				postData.user_id = that.state.currentUser.id;
				postData.reading_id = reading.id;
				postData['private'] = privateBool;
				// console.log('posting post: ' + JSON.stringify(postData));
				Helpers.ajaxReq('POST', Config.API_URL + "/posts", postData, function(err, result) {
			  		console.log(err); // user could already be associated
			  		// console.log(result);
			  	});

				
				// decide if book or article and update appropriately
				var modelName = reading.is_book ? 'myReadings' : 'myArticles';


				var found = false;
				for (var i=0; i < that.state[modelName].length; i++) {
					if (reading.id === that.state[modelName][i].id) {
						found = true;
						break;
					}
				}
				if (!found) {
					var newState = that.state;
					newState[modelName] = that.state[modelName].concat([reading]);
					that.setState(newState);
				}





				// clear the inputs on success
				// also clear the previewReading
				that.setState({
					previewReading: null
				});
				$('#new_post_panel').find('input').val('');
				$('#new_post_panel').find('textarea').val('');

			}; // end of func postReading

			
			var reading = that.state.previewReading;



			// console.log(reading);

			// if there's no id assume it's an article
			// (TODO if we allow them to add a book not included, this 
			// assumption changes)
			// post the article first
			if (!reading.id) {
				reading['is_book'] = false;
				Helpers.ajaxReq('POST', Config.API_URL+'/readings', reading, function(err, result) {
					if (err) { return console.log('error creating new reading'); }
					var reading = result;
					that.setState({ previewReading: reading });
					postReading(that, reading);
					// console.log(result);
				});


			} else {
				// already a reading with an id in the db
				postReading(that, reading);

			}

		},


		getBookSuggestions: function(req, res) {
			var that = this;


	  		var url = Config.API_URL + "/readings_autocomplete?title=" + req.term;

	  		// console.log(url);

	  		$.ajax({
			  type: "GET",
		      beforeSend: function(xhr) { xhr.setRequestHeader("Authorization", "Basic " + Auth.getToken()); },
			  url: url,
			  contentType: 'application/json', 
			  success: function(result) {
			  	// console.log(result);

			  	if (!result) return res([]);



			  	var mappedSuggestions = result.map(function(v, i) {
					return { label:  v.title, value: JSON.stringify(v) };
				});
			  	res(mappedSuggestions);
			  },
			  error: function(err) {
			  	console.log('error: ' + JSON.stringify(err));
			  }
			});

			// var mappedSuggestions = that.state.suggestions.map(function(v, i) {
			// 	return { label: v.title, value: v.title };
			// });

			// res(mappedSuggestions);
		},

		handleLink: function(el) {
			var that = this;
			var url = el.val();

			console.log('handling ' + url);


			// assume this is coming as a post for now


			// 1. get title, image (for now)
			Helpers.ajaxReq("POST", Config.API_URL + "/link_preview", {url:url}, function(err, result) {
				if (err) {
					console.log('error: ' + JSON.stringify(err));
					return; // TODO say invalid
				}

				// CAREFUL if result format changes 
				// will need to convert to {title, description, image_url}
				// console.log(result);

				// make a preview
				that.setState({ previewReading: result });

				// console.log(result);
			});


		},



		feedSeeMore: function(e) {
			e.preventDefault();
			var that = this;

			that.setState({
				feedSeeMoreLoading: true
			});
			Helpers.ajaxReq('GET', Config.API_URL + '/feed/posts?offset=' + that.state.postOffset, {}, function(err, result) {
				that.setState({ feedSeeMoreLoading: false });

				// console.log(JSON.stringify(result));
				if (!result || !result.length) return;
				
				that.setState({
					posts: that.state.posts.concat(result),
					postOffset: that.state.postOffset + Config.POST_OFFSET_INCREMENT
				});
			});
		},


		deletePost: function(item, e) {
			var that = this;
			e.preventDefault();

			// console.log(item); return;

			var baseUrl = Config.API_URL + "/posts/";
			Helpers.deleteItem(that, baseUrl, item.id, 'posts');
		},


		

		/*
			React lifecycle
		*/


		getInitialState: function() {
		    return {
	    		currentUser: null,
		        suggestions: [{id: 23, title:'aaaaa', image_url: 'imgggg'}],
		        myReadings: [], // books
		        myArticles: [],
		        posts: [] // TODO listen over websocket
		        , readingPreview: null
		        , postOffset: Config.POST_OFFSET_INCREMENT
		        , feedSeeMoreLoading: false
		        // a preview of say an article
		        // with title etc
		        // , previewReading: { title:'ttttt', description: 'this is da thing', image_url: 'fdsfds' }
		    };
		},


		componentDidMount: function() {
			var that = this;

			// console.log(that.props.currentUser);
			Auth.getCurrentUser(that, function() {
				Shared.getReadingsState(that);
			});

			// get posts i.e. feed
			Helpers.ajaxReq('GET', Config.API_URL + '/feed/posts', {}, function(err, result) {
				if (err) {
					return console.log('error getting posts: ' + JSON.stringify(err));
				}
				// console.log(result);

				that.setState({ posts: result });
			});

			
		},






		render: function() {
			var that = this;

			// console.log(that.deletePost)

			
			return (
				<div className="container">
					<div className="row">
						<div className="col-md-12 big_space_top">
							<a href="#/app/home">
								<img style={{height: 50}} src="/img/logo.png" />
							</a>

							<a className="btn btn-default box pull-right" href="#/app/readings">
								My readings
							</a>

							{/* body */}
							<Feed deletePost={that.deletePost} currentUser={that.state.currentUser} feedSeeMoreLoading={that.state.feedSeeMoreLoading} feedSeeMore={that.feedSeeMore} previewReading={that.state.previewReading} posts={that.state.posts} getBookSuggestions={that.getBookSuggestions} addReading={that.addReading} selectBook={that.selectBook} handleLink={that.handleLink}  />


							<Shared.ReadingViewer deleteReading={that.deleteReading} myReadings={that.state.myReadings} myArticles={that.state.myArticles} />
							

							

						</div>
					</div>
				</div>
			)
		}
	});




	return result;

});