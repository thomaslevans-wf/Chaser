/** @jsx React.DOM */
var React = require('react/addons'),
	PullRequest = require('./pullRequest'),
    github = require('../github'),
    constants = require('../constants'),
    viewService = require('../viewService'),
    chromeApi = require('../chrome'),
    Reflux = require('reflux');

var Header = React.createClass({

    getInitialState: function () {
        return {
            'userLogin': '',
        };
    },

    componentDidMount: function() {
        var that = this;
        chromeApi.get(constants.userKey, function(results) {
            that.setState({'userLogin': results.login});
        }); 
    },

    refreshList: function(){
        Actions.refresh();
    },
    
    /* jshint ignore:start */
    render: function () {
        return <div className='header'>
            <div className='col-xs-4'>
                <div className='refresh-btn'>
                    <small className='refresh-btn'>
                        <em>{this.state.userLogin}</em>
                    </small>
                </div>
            </div>
            <div className='col-xs-4 text-center'>
                <img className="text-center github-title" src="src/images/github.png"/>
            </div>
            <div className='col-xs-4'>
                <button className="btn btn-default btn-xs pull-right refresh-btn" onClick={this.refreshList}>
                    <span className="glyphicon glyphicon-refresh"></span>
                </button>
            </div>
        </div>
    }
    /* jshint ignore:end */

});


module.exports = Header;