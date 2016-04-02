Meteor.publish('publicQuestions', function (data) {
	return Questions.find({"parentSessionId": data.sessid, "isPublic": true});
});

Meteor.publish('adminQuestions', function (data) {
	return Questions.find({"parentSessionId": data.sessid});
});

Meteor.publish('userQuestions', function (data) {
	return Questions.find({"parentSessionId": data.sessid, "authorId": data.authorId});
});



