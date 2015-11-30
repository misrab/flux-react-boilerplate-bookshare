define([
	'./config', './helpers',
], function(Config, Helpers) {
	return {
	  // login (email, pass, cb) {
	  //   cb = arguments[arguments.length - 1];
	  //   if (localStorage.token) {
	  //     if (cb) cb(true);
	  //     this.onChange(true);
	  //     return;
	  //   }
	  //   pretendRequest(email, pass, (res) => {
	  //     if (res.authenticated) {
	  //       localStorage.token = res.token;
	  //       if (cb) cb(true);
	  //       this.onChange(true);
	  //     } else {
	  //       if (cb) cb(false);
	  //       this.onChange(false);
	  //     }
	  //   });
	  // },

	  // cb(err, user)
	  getCurrentUser: function(that, cb) {
	  	// var that = this;
	  	var url = Config.API_URL + "/current_user";

	  	// console.log(that);

	  	// console.log(atob(localStorage.token));

	  	Helpers.ajaxReq('GET', url, {}, function(err, result) {
			if (err || !result || !Object.keys(result).length) {
				console.log('Error getting current user: ' + JSON.stringify(err));
				if (cb) { cb(err, result); }
				return
			}
			
			// console.log(result);

			// set user
			localStorage.token = btoa(result.email + ":" + result.hash);
			that.setState({
				currentUser: result
			}, function() {
				if (cb) cb(err, result);
			});
		});
	  },


	  getToken: function() {
	  	return localStorage.token;
	  },


	  logout: function(e) {
			if (e) e.preventDefault();
			console.log('logout');

			delete localStorage.token;
			// TODO set state, location


			// console.log(data);
			// Auth.logout();
			// auto login for now
			// this.setState({ currentUser: null });
			window.location.replace("/");
		}
	 //  login: function(data, cb) {
	 //  	var url = Config.API_URL + "/user/login";
	 //  	$.ajax({
		//   type: "POST",
		//   url: url,
		//   contentType: 'application/json', 
	 //      data: JSON.stringify(data),
		//   success: function(result) {
		//   	// console.log(result); return;

		//   	localStorage.token = btoa(result.email + ":" + result.password);
		//   	cb();
		//   },
		//   error: cb
		// });
	 //  	// localStorage.token = "token";
	 //  	// if (cb) cb();
	 //  },

	 //  logout: function (e) {
	 //  	if (e) e.preventDefault();
	 //    delete localStorage.token;
	 //    // console.log("Logout out...");
	 //    window.location.replace("/");
	 //    // if (cb) cb();
	 //    // this.onChange(false);
	 //  },
	  
	  // loggedIn: function () {
	  //   return !!localStorage.token;
	  // },

	};
});
