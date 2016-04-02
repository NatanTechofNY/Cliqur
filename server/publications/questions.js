Meteor.publish('publicQuestions', function (data) {
	return Questions.find({"parentSessionId": data, "isPublic": true});
});

Meteor.publish('adminQuestions', function (data) {
	return Questions.find({"parentSessionId": data});
});

Meteor.publish('userQuestions', function (data) {
	return Questions.find({"parentSessionId": data.sessid, "authorId": data.authorId});
});



