
require(['./components/index', 'react', 'react-router', 'jquery'], 
function(Components, React, Router, $) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".

    
    var Route = Router.Route;
    var DefaultRoute = Router.DefaultRoute;
    var NotFoundRoute = Router.NotFoundRoute;
    
    var Link = Router.Link;
    
    // <DefaultRoute handler={Components.Auto} />
    // <NotFoundRoute handler={Components.NotFound} />
    var routes = (
      <Route path="/" handler={Components.App}>
        <Route name="home" path="home" handler={Components.Home} />

        
        <DefaultRoute handler={Components.Index} />
        <NotFoundRoute handler={Components.NotFound} />
      </Route>
    );
    

    // <Route name="login" path="login" handler={Components.Login} />
    //     <Route name="logout" path="logout" handler={Components.Logout} />

    //     <Route path="app/" handler={Components.SidebarView}>
    //       {/*<Route name="reporting" path="reporting" handler={Components.Reporting} />
    //       <Route name="history" path="reporting/history/:id" handler={Components.ReportingHistory} />*/}
          
    //       <Route name="autobidding" path="autobidding" handler={Components.Auto}/>
    //       <Route name="autoProviderGroup" path="autobidding/:provider/:group" handler={Components.AutoProviderGroup} />

          
    //       <Route name="reports" path="reports" handler={Components.Reports} />
    //       <Route name="reportsProviderGroup" path="reports/:provider/:group" handler={Components.ReportsProviderGroup} />

        
    //       <Route name="managed" path="managed" handler={Components.Managed} />
    //       <Route name="managedProviderGroup" path="managed/:provider/:group" handler={Components.ManagedProviderGroup} />

    //       <Route name="info" path="info" handler={Components.Info} />
    //       <Route name="infoStatus" path="info/status" handler={Components.InfoStatus} />


    //       <Route name="kopiOverall" path="kopi" handler={Components.KopiOverall} />
    //       <Route name="kopi" path="kopi/:title" handler={Components.Kopi} />
    //     </Route>
    // <Route name="wiki" path="wiki" handler={Components.Wiki} />
    // <Route name="state" path="state/:abbr" handler={State}/>

    Router.run(routes, function (Handler) {
      React.render(<Handler/>, document.body);
    });
});