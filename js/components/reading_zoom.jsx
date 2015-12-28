define([
	'../helpers/auth', '../helpers/config', '../helpers/helpers', './shared',
	'react', 'jquery', 'moment'], 
function(
	Auth, Config, Helpers, Shared,
	React, $, moment) {

	var result = {};



	/*
		Master componenet
	*/

	result.ReadingZoom = React.createClass({

		// also in home.jsx
		deletePost: function(item, e) {
			var that = this;
			e.preventDefault();

			// console.log(item); return;

			var baseUrl = Config.API_URL + "/posts/";
			Helpers.deleteItem(that, baseUrl, item.id, 'posts');
		},





		getInitialState: function() {
		    return {
		    	currentUser: null,
		    	reading: null,
		    	posts: []
		    };
		},


		componentDidMount: function() {
			// return;

			var that = this;
			Auth.getCurrentUser(that, function(err, user) {
				// get user_id's posts for this reading_id
				if (err || !user) {
					console.log('err getting user: ' + JSON.stringify(err));
					return;
				}


				// TODO offset when many...
				Helpers.ajaxReq('GET', Config.API_URL + '/posts?user_id='+user.id+'&reading_id='+that.props.params.id, {}, function(err, result) {
					// console.log(result);

					// that.setState({ feedSeeMoreLoading: false });
					if (!result || !result.length) return;

					// TODO find more elegant way around 
					// delete button control
					// add current user as user for each post
					for (var i=0; i < result.length; i++) {
						result[i].user = user;
					}


					that.setState({
						posts: result
					});
				});
			});

			// get the reading
			var id = that.props.params.id;
			var url = Config.API_URL + '/readings/' + id;
			Helpers.ajaxReq('GET', url, {}, function(err, result) {
				if (err) {
					console.log('error getting reading: ' + JSON.stringify(err));
					return;
				}

				that.setState({
					reading: result
				});
			});
		},


		render: function() {
			var that = this;

			var reading = that.state.reading;
			if (!reading) return null;
			var image_url = Helpers.getImageCover(reading) || "img/logo_grey.png";


			return (
				<div className="container">
					<div className="row">
						<div className="col-md-12 big_space_top">
							<a href="#/app/home">
								<img style={{height: 50}} src="/img/logo.png" />
							</a>

							<a className="btn btn-default box pull-right" href="#/app/readings">
								My Readings
							</a>
							<a className="btn btn-default box pull-right left_right_margin" href="#/app/home">
								Feed
							</a>



							{/* body */}
							<div className="my_panel">
								<div className="white_box"></div>

								<div className="padded">
									{/* row for aesthetic reasons */}
									<div className="row">
										<div className="col-md-3">
											<h2>{ reading.title }</h2>
										</div>
										<div className="col-md-9"></div>
									</div>
									
									{/* status section */}
									
									<div className="row">
										<div className="col-md-3">
									
											<object style={{'width': '100%'}} data={image_url} type="image/png">
												<img src="img/logo_grey.png" />
											</object>

											<p>{ reading.description }</p>
										</div>
										<div className="col-md-9">
											{/* new post */}
											<textarea
												id="post_description"
												style={{resize:'none', height: '150px', marginBottom: '15px'}}
												placeholder="Thoughts on your recent reading?"
												className="form-control box small_space_top">
											</textarea>


											{/* existing posts */}
											<Shared.PostViewer deletePost={that.deletePost} currentUser={that.state.currentUser} data={that.state.posts} />

										</div>
									</div>
								</div>
							</div>				
							{/* end body */}



						</div>
					</div>
				</div>
			)
		}
	});


	return result;

});