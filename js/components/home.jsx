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



									<div id="postButton" onClick={that.props.addReading} className="btn btn-success box full_width small_space_top">
										Post
									</div>

								</div>

							</div>
							<div className="col-md-7">
								<Shared.PostViewer feedSeeMore={that.props.feedSeeMore} data={that.props.posts} />
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

			// TODO actually delete association
		  	var url = Config.API_URL + "/users_readings/" + reading.id;
		  	// var data = { reading_id: reading.id || 0 };
		  	console.log(url);
		  	Helpers.ajaxReq('DELETE', url, {}, function(err, result) {
		  		console.log(err);
		  		// console.log(result);
		  	});


			// then remove from state
			Helpers.removeFromState(that, 'myReadings', 'id', reading.id);
		},

		selectBook: function(e, ui) {
			var that = this;
			e.preventDefault();

			// set the input as the label, not value
			$(e.target).val(ui.item.label);

			// turn the value into json
			var data = JSON.parse(ui.item.value);

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

		addReading: function(e) {
			var that = this;

			e.preventDefault();
			// var item = ui.item;

			// var el = $(e.target);


			
			
			var reading = that.state.previewReading;
			// end TEMP

			// console.log(reading);
			// console.log(that.state.currentUser);
			// return;


			// post association
			var that = this;
		  	var url = Config.API_URL + "/users_readings";
		  	var data = { reading_id: reading.id || 0 };
		  	Helpers.ajaxReq('POST', url, data, function(err, result) {
		  		console.log(err); // user could already be associated
		  		// console.log(result);
		  	});
		  	// return;


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
			console.log('posting post: ' + JSON.stringify(postData));
			Helpers.ajaxReq('POST', Config.API_URL + "/posts", postData, function(err, result) {
		  		console.log(err); // user could already be associated
		  		console.log(result);
		  	});


			// only add if not in readings
			var found = false;
			for (var i=0; i < that.state.myReadings.length; i++) {
				if (reading.id === that.state.myReadings[i].id) {
					found = true;
					break;
				}
			}
			if (!found) {
				that.setState({
					myReadings: that.state.myReadings.concat([reading])
				});
			}


			// TODO clear the inputs on success
			// also clear the previewReading
			that.setState({
				previewReading: null
			});
			$('#new_post_panel').find('input').val('');
			$('#new_post_panel').find('textarea').val('');
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


			// 2. create the "reading"

			// 3. POST the reading

			// 4. add the post



			// var metaDesc = $.get(str, function (data) {
			// 	var MetaDescription = $(data).find('meta[name=description]').attr("content");
			// 	var Img_Src = $(data).find('link[rel=image_src]').attr("href");
			// 	console.log(MetaDescription);
			// 	console.log(Img_Src);
			// });
			
			// e.preventDefault();
			// var item = ui.item;

			// TODO post it

			// TEMP functions
			// function getRandomInt(min, max) {
			//   return Math.floor(Math.random() * (max - min)) + min;
			// }
			// var reading = {id: getRandomInt(1,1000), title: str, image_url: 'http://theartmad.com/wp-content/uploads/2015/02/Cute-Monkeys-6.jpg'}; // item.value


			// // console.log(reading); return;

			// that.setState({
			// 	myArticles: that.state.myArticles.concat([reading])
			// });


			// // clear the input
			// el.val('');

		},



		feedSeeMore: function(e) {
			e.preventDefault();
			var that = this;

			// console.log('see more...');

			// get more with offset and increment offset

			// ajaxReq = function(type, url, data, cb)
			Helpers.toggleLoader();
			Helpers.ajaxReq('GET', Config.API_URL + '/feed/posts?offset=' + that.state.postOffset, {}, function(err, result) {
				Helpers.toggleLoader();

				// console.log(JSON.stringify(result));
				if (!result || !result.length) return;
				
				that.setState({
					posts: that.state.posts.concat(result),
					postOffset: that.state.postOffset + Config.POST_OFFSET_INCREMENT
				});
			});
		},

		

		/*
			React lifecycle
		*/


		getInitialState: function() {
		    return {
		    	// the current post offset
		    	postOffset: Config.POST_OFFSET_INCREMENT,

		    	currentUser: null,
		        suggestions: [{id: 23, title:'aaaaa', image_url: 'imgggg'}],
		        myReadings: [], // books
		        myArticles: [],
		        posts: [], // TODO listen over websocket
		        // a preview of say an article
		        // with title etc
		        readingPreview: { title:'ttttt', description: 'this is da thing', image_url: 'fdsfds' }
		    };
		},


		componentDidMount: function() {
			var that = this;
		      // get books and articles
		      // Helpers.ajaxReq('GET', url, data, cb)


		      // get posts i.e. feed
		      Helpers.ajaxReq('GET', Config.API_URL + '/feed/posts', {}, function(err, result) {
				// console.log(JSON.stringify(result));

				that.setState({
					posts: result
				});
			  });


		      // get user's readings
		      Auth.getCurrentUser(function(err, user) {
		      	if (!user || err) {
		      		console.log('didnt get current user');
		      		return;
		      	}
				Helpers.ajaxReq('GET', Config.API_URL + '/users/'+ user.id +'/readings', {}, function(err, result) {
					if (!user || err) {
			      		console.log('didnt get readings');
			      		return;
			      	}
					that.setState({
						myReadings: result,
						currentUser: user
					});
				});
		      });

		   
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

							<a className="btn btn-default box pull-right" href="#/app/readings">
								My readings
							</a>

							{/* body */}
							<Feed feedSeeMore={that.feedSeeMore} previewReading={that.state.previewReading} posts={that.state.posts} getBookSuggestions={that.getBookSuggestions} addReading={that.addReading} selectBook={that.selectBook} handleLink={that.handleLink}  />


							<Shared.ReadingViewer deleteReading={that.deleteReading} myReadings={that.state.myReadings} myArticles={that.state.myArticles} />
							

							

						</div>
					</div>
				</div>
			)
		}
	});




	return result;

});