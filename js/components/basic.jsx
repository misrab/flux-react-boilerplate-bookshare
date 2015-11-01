
define([
	// './auth', './config',
	'react', 'react-router', 'jquery'], 
function(
	// Auth, Config,
	React, Router, $) {

	var result = {};

	var RouteHandler = Router.RouteHandler;


	var Facebook = React.createClass({
		render: function() {
		  return (
			<div style={{display:'inline-block', margin: '0 10px'}}>
			  <button className={ this.props.class ? this.props.class : 'facebook-login'} onClick={ this.handleClick }>
				  { this.props.callToAction ? this.props.callToAction : "Login with Facebook"}
			  </button>
			  <div id="fb-root"></div>
			</div>
		  )
		},

		componentDidMount: function() {

		  window.fbAsyncInit = function() {
			FB.init({
			  appId      : this.props.appId || '',
			  xfbml      : this.props.xfbml || false,
			  version    : 'v2.3'
			});

			if ( this.props.autoLoad ) {

			  FB.getLoginStatus(function(response) {
				this.checkLoginState(response);
			  }.bind(this));

			}

		  }.bind(this);

		  // Load the SDK asynchronously
		  (function(d, s, id){
		   var js, fjs = d.getElementsByTagName(s)[0];
		   if (d.getElementById(id)) {return;}
		   js = d.createElement(s); js.id = id;
		   js.src = "//connect.facebook.net/pt_BR/sdk.js";
		   fjs.parentNode.insertBefore(js, fjs);
		 }(document, 'script', 'facebook-jssdk'));
		},

		responseApi: function( authResponse ) {
		  FB.api('/me', function(response) {

			response.status = 'connected';
			response.accessToken = authResponse.accessToken;
			response.expiresIn = authResponse.expiresIn;
			response.signedRequest = authResponse.signedRequest;

			if ( this.props.loginHandler ) {
			  this.props.loginHandler( response );
			}


		  }.bind(this));
		},

		checkLoginState: function(response) {
		  if (response.authResponse) {

			this.responseApi(response.authResponse);

		  } else {

			if ( this.props.loginHandler ) {
			  this.props.loginHandler( { status: response.status } );
			}

		  }
		},

		handleClick: function() {
		  var valueScope = this.props.scope || 'public_profile, email, user_birthday';

		  FB.login(this.checkLoginState, { scope: valueScope });
		}
	});



	/*
		App
	*/
	result.App = React.createClass({
		getInitialState: function () {
			return {
				// loggedIn: Auth.loggedIn()
			};
		},

		componentDidMount: function() {
		},

		// loginHandler: function(data) {
		// 	var that = this;

		// 	// auto login for now
		// 	Auth.login(data, function(err) {
		// 	if (err) {
		// 		var alert = $('.alert-danger').slideDown();
		// 		setTimeout(function() {
		// 			alert.slideUp();
		// 		}, 3000);
		// 		return console.log("Error logging in: " + JSON.stringify(err));
		// 	}

		// 	// else set logged in
		// 	that.setState({ loggedIn: true });
		// 	});

		// },

		// logoutHandler: function() {
		// 	// console.log(data);

		// 	// auto login for now
		// 	// this.setState({ loggedIn: false });
		// 	// window.location.replace("/");
		// },
		

		render: function () {
			var that = this;

			return (
				<div className="App container">
					<div className="loader">
						<img src="img/loader.gif" />
					</div>


					<RouteHandler />


					{/* Footer */}
					<footer>
						<div className="container">
							<div className="row">
								<div className="col-lg-12 text-center">
									<hr />

									<h4>
										<strong>Words for Thought</strong>
									</h4>
									
									{/*
									<p>Singapore</p>
									<ul className="list-unstyled">
										<li>
											<i className="fa fa-envelope-o fa-fw" />
											<a href="mailto:name@example.com">faizullah.misrab@gmail.com</a>
										</li>
									</ul>
									<br />
									<ul className="list-inline">
										<li>
											<a href="#"><i className="fa fa-facebook fa-fw fa-3x" /></a>
										</li>
										<li>
											<a href="#"><i className="fa fa-twitter fa-fw fa-3x" /></a>
										</li>
										<li>
											<a href="#"><i className="fa fa-dribbble fa-fw fa-3x" /></a>
										</li>
									</ul>
									*/}
									<p className="text-muted">Copyright 2015</p>
								</div>
							</div>
						</div>
					</footer>



				</div>
			);
		}
	});

	
	/*
		PublicFeed
	*/
	var FeedItem = React.createClass({

		componentDidMount: function() {
			var that = this;

			var el = $(React.findDOMNode(that));


			setTimeout(function() {
				el.slideDown();
			}, 500);
		},

		render: function() {
			var that = this;

			return (
				<div className="feed_item">
					hi
				</div>
			);
		}
	}); 


	var PublicFeed = React.createClass({
		getInitialState: function() {
			return {
				feedItems: [23]
			};
		},

		

		render: function() {
			var that = this;

			//  setTimeout(function() {
		 //     	// var lala =that.state.feedItems.slice();
		 //     	// lala.unshift(22);

			// 	that.setState({
			// 		feedItems: [22].concat(that.state.feedItems)
			// 	});
			// }, 5000); 

			return (
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							{
								that.state.feedItems.reverse().map(function(v, i) {
									return <FeedItem key={i} />
								})
							}
						</div>
					</div>
				</div>
			);
		}
	});

	result.SidebarView = React.createClass({
		  toggleMenu: function(e) {
	          e.preventDefault();
	          $('#sidebar-wrapper').toggleClass('active');
	      },

	      getInitialState: function() {
					return {
						// currentUser: null
					};
				},
	      componentDidMount: function() {
	      	// get current user
	      	var that = this;


	      	// check current user
	      	// var tokenencoded = Auth.getToken();
	      	// var tokendecoded = atob(tokenencoded);
	      	// var email = tokendecoded.split(":")[0].replace("@tripadvisor.com", "");
	      	// // get the user
	      	// Auth.getCurrentUser(function(err, user) {
	      	// 	if (err) return console.log(JSON.stringify(err));

	      	// 	that.setState({
	      	// 		currentUser: user
	      	// 	});
	      	// });
	      	
	 

	      	
	      	// handle 401
			// 	$.ajax({
			// 		type: 'GET',
			// beforeSend: function(xhr) { xhr.setRequestHeader("Authorization", "Basic " + Auth.getToken()); },
			// 		url: Config.ROOT_API_URL,
			// 		error: function(httpObj, textStatus) {
			// 			if (httpObj.status===401) {
			// 				return Auth.logout();
			// 				console.log("Invalid credentials, logging out...");
			// 			}
			// 		}
			// 	});
	      },

	      render: function() {
	      	var that = this;

	      	// var wikiClick = function(e) {
	      	// 	e.preventDefault();
	      	// 	console.log("e");
	      	// 	window.location.href = "/#/app/wiki";
	      	// };

	        return (
	          <div className="container">
	            <a onClick={this.toggleMenu} id="menu-toggle" href="#" className="btn btn-dark btn-lg toggle"><i className="fa fa-bars" /></a>
	            <nav id="sidebar-wrapper">
	              <ul className="sidebar-nav">
	                <a onClick={this.toggleMenu} id="menu-close" href="#" className="btn btn-light btn-lg pull-right toggle"><i className="fa fa-times" /></a>
	                <li className="sidebar-brand">
	                  <a href="#top" onClick="">
	                  </a>
	                </li>
	      
	                <li>
	                  <a href="#" className="sidebar_item" onClick={null}>
	                    Logout
	                  </a>
	                </li>
	              </ul>
	            </nav>


	            <RouteHandler/>
	          </div>
	        );
	      }
	    })

	/*
		Index
	*/
	result.Index = React.createClass({
		resultFacebookLogin: function(response) {
			console.log( response );
		},


		getInitialState: function() {
			return {
				// currentUser: null
			};
		},

		render: function() {
			var that = this;

			return (
				<div className="container">

					{/* Header */}
					<header id="top" className="header">
						<div className="text-center">
							<h1 className="big_space_top">
								<img style={{height: 50}} src="/img/logo.png" />
								Words for Thought
							</h1>
							<h3>You are what you read</h3>


							
							<div className="pull-right big_space_top">
								<Facebook
									appId="912474842172888"
									class="facebook-login"
									scope="public_profile, email, user_birthday"
									loginHandler={ that.resultFacebookLogin } />
								<a href="#/app/home" className="btn btn-default box">
									Home (temp)
								</a>
							</div>

						 </div> {/*  */}
					</header>




					{/* Body */}
					<PublicFeed />



				</div>
			);
		}
	});


	return result;

});