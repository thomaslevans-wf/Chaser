/** @jsx React.DOM */
var Login = require('./login'),
    React = require('react'),
    Router = require('react-router'),
    Link = Router.Link,
    DefaultRoute = Router.DefaultRoute,
    Route = Router.Route,
    RouteHandler = Router.RouteHandler,
    chromeApi = require('../chrome'),
    AtMentions = require('./atMentions'),
    MyPullRequests = require('./myPullRequests'),
    Header = require('./header');


var Shell = React.createClass({
  componentDidMount: function() {
    chromeApi.get('viewObjects', function(results) {
      if (!results.viewObjects) {
        chromeApi.get(constants.githubTokenKey, function(results) {
          if (results[constants.githubTokenKey]) {
            viewService.prepViewObjects(results[constants.githubTokenKey], fireItUp);
          } else {
            Login.start();
          }
        });
      } 
    });
  },

  render: function () {
    return (<div>
        <Header/>
        <RouteHandler/>
      </div>
    );
  }

});

var routes = (
  <Route name="app" path="/" handler={Shell}>
    <DefaultRoute handler={AtMentions} />
    <Route name="atMentions" handler={AtMentions}/>
    <Route name="myPullRequests" handler={MyPullRequests}/>
  </Route>
);

Router.run(routes, function (Handler) {
  // Handler.render?
  React.render(<Handler/>, document.getElementById('app'));
});

module.exports = Shell;