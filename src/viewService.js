function viewService() {
	var Github = require('./github'),
		constants = require('./constants'),
		chromeApi = require('./chrome'),
		API = {};

	function prepViewObjects(accessToken, successCallback){
		var viewObjects = [],
			prepped = 0,
			tokenObj = {},
			github = Github(accessToken);

		function isFinished(){
			prepped --; 
			if (prepped === 0)  {
				var viewObjectsToStore = {'viewObjects': viewObjects};
				chromeApi.set(viewObjectsToStore);
				successCallback(viewObjects);
			}
		}

		// todo check for plus one...
		// action needed
		function prepItemForView(notification, callback) {
			github.getPullRequest(notification.subject.url).then(function(pullRequest){ 
				if (pullRequest.state === 'open') {
					chromeApi.get('login', function(results){
						github.isPlusOneNeeded(pullRequest.comments_url, results.login).done(function(result){
							viewObjects.push({
								'notification': notification,
								'pullRequest': pullRequest,
								'commentInfo': result
							});
							isFinished(); 
						});
					});
				} else {
					isFinished();
				}
			}, function(){
				prepped--;
			});
		}

		github.getNotifications(true, 'mention').done(function( notifications ) {
			for(var i=0; i < notifications.length; i++){
	            if (notifications[i].reason === 'mention') {
	            	prepped++;
					prepItemForView(notifications[i]);
				}
			}
		});	
	}
	API.prepViewObjects = prepViewObjects; 



	return API;
}

module.exports = viewService(); 