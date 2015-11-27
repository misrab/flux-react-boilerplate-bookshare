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
	  getCurrentUser: function(cb) {
	  	var that = this;
	  	var url = Config.API_URL + "/current_user";


	  	// console.log(atob(localStorage.token));

	  	Helpers.ajaxReq('GET', url, {}, cb);


	  // 	$.ajax({
			//   type: "GET",
		 //    beforeSend: function(xhr) { xhr.setRequestHeader("Authorization", "Basic " + that.getToken()); },
			//   url: url,
			//   contentType: 'application/json', 
			//   success: function(result) {
			//   	// console.log(result);
			//   	// if (!result) {
			//   	// 	delete localStorage.token;
			//   	// 	if (window.location.pathname!=="/") window.location.replace('/');
			//   	// }

			//   	cb(null, result);
			//   },
			//   error: function(err) {
			//   	console.log('error: ' + JSON.stringify(err));

			//   	// make sure logged out
			//   	// delete localStorage.token;
			//   	// if (window.location.pathname!=="/") window.location.replace('/');

			//   	cb(err);
			//   }
			// });

	  // 	cb(null, null);
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
