define([
	// './auth', './config',
	'./shared', '../helpers/helpers',
	'react', 'jquery', 'jquery-ui', 'bootstrap-linkpreview'], 
function(
	// Auth, Config,
	Shared, Helpers,
	React, $, jqueryUI) {

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

		  var data = that.props.data;
		  var selectCallback = that.props.selectCallback;
		  var sourceCallback = that.props.sourceCallback;

		  if (!data) data = [];


		  $(React.findDOMNode(this)).autocomplete({
		  	source: sourceCallback,
		  	select: function(e, ui) {
		  		if (selectCallback) selectCallback(e, ui);
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
								<div className="panel box padded">
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
								<Shared.PostViewer data={that.props.posts} />
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

		selectBook: function(e, ui) {
			var that = this;
			e.preventDefault();

			// TEMP
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
			var reading = { id: getRandomInt(1,1000), title: makeid(), image_url: 'http://theartmad.com/wp-content/uploads/2015/02/Cute-Monkeys-6.jpg'};


			// TODO
			that.setState({
				previewReading: reading
			});

			console.log('selectBook');
		},

		addReading: function(e) {
			var that = this;

			e.preventDefault();
			// var item = ui.item;

			// var el = $(e.target);


			
			
			var reading = that.state.previewReading;
			// end TEMP


			// TODO post it



			// add post to feed
			// get description
			var description = $('#post_description').val() || "Was just reading";
			// console.log(description);
			// reading['description'] = description;

			// console.log(reading);


			var post = {};
			post.description = description;
			post.reading = reading;
			post.user = { username: 'box da builder' };

			that.setState({
				posts: that.state.posts.concat([post])
			});



			// TODO only add if not in readings
			that.setState({
				myReadings: that.state.myReadings.concat([reading])
			});


			// TODO clear the inputs on success
			// also clear the previewReading
		},


		getBookSuggestions: function(req, res) {
			var that = this;

			var mappedSuggestions = that.state.suggestions.map(function(v, i) {
				return { label: v.title, value: v.title };
			});

			res(mappedSuggestions);
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

		getInitialState: function() {
		    return {
		        suggestions: [{id: 23, title:'aaaaa', image_url: 'imgggg'}],
		        myReadings: [], // books
		        myArticles: [],
		        posts: [
	        		{
	        			id: 32,
	        			
	        			reading: {id: 23, title:'aaaaa', image_url: 'imgggg'},
	        			user: { username: "Bob the builder" },

	        			description: 'lalalalfklds;f;dsfsdkfldskfld;skgfladgkjfdlgjdfklgjkfdljgksfdlgjfdskgjfdsl;gjkfdljgdfksjg;sdfjgkfdljgkdfsjgdf;jgfdkjgk;dfsjgkfdl;bjnfkblnfsdb;fmsbkfs;f;dsfsdkfldskfld;skgfladgkjfdlgjdfklgjkfdljgksfdlgjfdskgjfdsl;gjkfdljgdfksjg;sdfjgkfdljgkdfsjgdf;jgfdkjgk;dfsjgkfdl;bjnfkblnfsdb;fmsbkfs;f;dsfsdkfldskfld;skgfladgkjfdlgjdfklgjkfdljgksfdlgjfdskgjfdsl;gjkfdljgdfksjg;sdfjgkfdljgkdfsjgdf;jgfdkjgk;dfsjgkfdl;bjnfkblnfsdb;fmsbkfs;f;dsfsdkfldskfld;skgfladgkjfdlgjdfklgjkfdljgksfdlgjfdskgjfdsl;gjkfdljgdfksjg;sdfjgkfdljgkdfsjgdf;jgfdkjgk;dfsjgkfdl;bjnfkblnfsdb;fmsbkfs;f;dsfsdkfldskfld;skgfladgkjfdlgjdfklgjkfdljgksfdlgjfdskgjfdsl;gjkfdljgdfksjg;sdfjgkfdljgkdfsjgdf;jgfdkjgk;dfsjgkfdl;bjnfkblnfsdb;fmsbkfs;f;dsfsdkfldskfld;skgfladgkjfdlgjdfklgjkfdljgksfdlgjfdskgjfdsl;gjkfdljgdfksjg;sdfjgkfdljgkdfsjgdf;jgfdkjgk;dfsjgkfdl;bjnfkblnfsdb;fmsbkfs;f;dsfsdkfldskfld;skgfladgkjfdlgjdfklgjkfdljgksfdlgjfdskgjfdsl;gjkfdljgdfksjg;sdfjgkfdljgkdfsjgdf;jgfdkjgk;dfsjgkfdl;bjnfkblnfsdb;fmsbkfs;laa',



	        			updatedAt: new Date()
	        		}
		        ], // TODO get initial and listen over websocket
		        // a preview of say an article
		        // with title etc
		        readingPreview: { title:'ttttt', description: 'this is da thing', image_url: 'fdsfds' }
		    };
		},

		/*
			React lifecycle
		*/



		componentDidMount: function() {
		      // get books and articles
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

							<a className="btn btn-default box pull-right" href="#/app/readings">
								My readings
							</a>

							{/* body */}
							<Feed previewReading={that.state.previewReading} posts={that.state.posts} getBookSuggestions={that.getBookSuggestions} addReading={that.addReading} selectBook={that.selectBook} handleLink={that.handleLink}  />


							<Shared.ReadingViewer deleteReading={that.deleteReading} myReadings={that.state.myReadings} myArticles={that.state.myArticles} />
							

							

						</div>
					</div>
				</div>
			)
		}
	});




	return result;

});