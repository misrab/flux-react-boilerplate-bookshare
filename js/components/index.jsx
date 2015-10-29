define([
  'react', 'react-router', 'jquery'
], 
function(
  React, Router, $) {
  

  function mergeObj(obj1, obj2) {
    for (var attrname in obj2) { obj1[attrname] = obj2[attrname]; }
  }
	
  // final object to export all of folder
  var result = {};
  
  // add components from other file in this folder
  // mergeObj(result, Basic);
  result.Index = React.createClass({
    getInitialState: function() {
      return {
        // currentUser: null
      };
    },


    // componentDidMount: function() {
    //   var that = this;


    //   // check current user
    //   var tokenencoded = Auth.getToken();
    //   var tokendecoded = atob(tokenencoded);
    //   var email = tokendecoded.split(":")[0].replace("@tripadvisor.com", "");

    //   // console.log(email);
    //   // if (["misrab", "njachowski", "sanver", "mfrahm", "hterveen", "icavusoglu"].indexOf(email) === -1) { 
    //   //  // redirect to auto for now
    //   //  window.location.replace("#/app/autobidding");
    //   // }


    //   // get the user
    //   Auth.getCurrentUser(function(err, user) {
    //     if (err) return console.log(JSON.stringify(err));

    //     that.setState({
    //       currentUser: user
    //     });
    //   });
      
    // },


    render: function() {
      var that = this;

      return (
        <div className="container">

          {/* Header */}
          <header id="top" className="header">
            <div className="text-vertical-center">
              <h1>
                <img style={{height: 50}} src="" />
                Jooba
              </h1>
              <h3>da buppa dooba doo</h3>


              <button style={{position:'absolute', top: '20px', right: '10%'}} className="btn btn-default" onClick={null}>
                Logout
              </button>

              <br />



             </div> {/* .text-vertical-center */}
          </header>
          {/* Footer */}
          <footer>
            <div className="container">
              <div className="row">
                <div className="col-lg-10 col-lg-offset-1 text-center">
                  <h4><strong>Jooba</strong>
                  </h4>
                  <p>Singapore</p>
                  <ul className="list-unstyled">
                    {/*                         <li><i class="fa fa-phone fa-fw"></i> (123) 456-7890</li>
   */}               <li>
                      <i className="fa fa-envelope-o fa-fw" />  <a href="mailto:name@example.com">faizullah.misrab@gmail.com</a>
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
                  <p className="text-muted">Copyright 2015</p>
                </div>
              </div>
            </div>
          </footer>

        </div>
      );
    }
  });
  


  return result;
});